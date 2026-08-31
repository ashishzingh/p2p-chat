import { test, expect, Browser, BrowserContext, Page } from '@playwright/test'
import { chromium } from '@playwright/test'

// ── Constants ─────────────────────────────────────────────────────────────────

const BASE = 'http://localhost:8080'
// Remote peer tiles have IDs like "pip-tile-<uuid>"; pip-local is the local tile
const PEER_TILES = '.pip-tile:not(#pip-local)'
const BROWSER_ARGS = [
    '--use-fake-ui-for-media-stream',
    '--use-fake-device-for-media-stream',
]

// ── Helpers ───────────────────────────────────────────────────────────────────

async function joinRoom(browser: Browser, name: string, room: string): Promise<{ ctx: BrowserContext; page: Page }> {
    const ctx = await browser.newContext({ permissions: ['camera', 'microphone'] })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/#${room}`)
    await page.fill('#name-input', name)
    await page.click('#join-btn')
    // Accept either "Waiting for peer…" or "Connected" — they connect fast in tests
    await expect(page.locator('#status-text')).toHaveText(/Waiting for peer|Connected/, { timeout: 10_000 })
    return { ctx, page }
}

async function waitForPeerTile(page: Page, count: number) {
    await expect(page.locator(PEER_TILES)).toHaveCount(count, { timeout: 15_000 })
}

async function clickMic(page: Page) { await page.click('#toggle-audio') }
async function clickCam(page: Page) { await page.click('#toggle-video') }

/** "Mute" → mic active+unmuted. "Unmute" → mic active+muted */
async function audioLabel(page: Page): Promise<string> {
    return (await page.locator('#audio-label').textContent())?.trim() ?? ''
}

/** Mic button has 'active' class when muted */
async function isMicBtnActive(page: Page): Promise<boolean> {
    return (await page.locator('#toggle-audio').getAttribute('class') ?? '').includes('active')
}

async function isCamOn(page: Page): Promise<boolean> {
    return (await page.locator('#toggle-video').getAttribute('class') ?? '').includes('active')
}

async function peerHasCam(observer: Page, tileIndex = 0): Promise<boolean> {
    return (await observer.locator(PEER_TILES).nth(tileIndex).getAttribute('class') ?? '').includes('cam-on')
}

async function peerIsMuted(observer: Page, tileIndex = 0): Promise<boolean> {
    return (await observer.locator(PEER_TILES).nth(tileIndex).getAttribute('class') ?? '').includes('peer-muted')
}

// ── 2-peer tests ──────────────────────────────────────────────────────────────

test.describe('2-peer mic/camera tests', () => {
    let browser: Browser
    let p1: Page, p2: Page
    let ctx1: BrowserContext, ctx2: BrowserContext

    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: true, args: BROWSER_ARGS })
    })
    test.afterAll(async () => { await browser.close() })

    test.beforeEach(async () => {
        const room = `pw-2p-${Date.now()}`
        ;({ ctx: ctx1, page: p1 } = await joinRoom(browser, 'Alice', room))
        ;({ ctx: ctx2, page: p2 } = await joinRoom(browser, 'Bob',   room))
        await waitForPeerTile(p1, 1)
        await waitForPeerTile(p2, 1)
    })
    test.afterEach(async () => { await ctx1.close(); await ctx2.close() })

    // ── Mic tests ─────────────────────────────────────────────────────────────

    test('mic works without camera — first click acquires stream', async () => {
        expect(await isCamOn(p1)).toBe(false)  // camera is off

        await clickMic(p1)                     // click 1: acquire mic stream (unmuted)
        await p1.waitForTimeout(1500)
        expect(await isMicBtnActive(p1)).toBe(false)  // not active = unmuted

        await clickMic(p1)                     // click 2: mute (proves stream was acquired)
        await p1.waitForTimeout(500)
        expect(await isMicBtnActive(p1)).toBe(true)   // active = muted ✅ stream acquired
        expect(await audioLabel(p1)).toBe('Unmute')

        expect(await isCamOn(p1)).toBe(false)  // camera still off
        console.log('✅ Mic works without camera')
    })

    test('mute/unmute cycles correctly', async () => {
        await clickMic(p1)                     // enable mic
        await p1.waitForTimeout(1500)

        await clickMic(p1)                     // mute
        await p1.waitForTimeout(500)
        expect(await audioLabel(p1)).toBe('Unmute')
        expect(await isMicBtnActive(p1)).toBe(true)

        await clickMic(p1)                     // unmute
        await p1.waitForTimeout(500)
        expect(await audioLabel(p1)).toBe('Mute')
        expect(await isMicBtnActive(p1)).toBe(false)
        console.log('✅ Mute/unmute cycles correctly')
    })

    test('peer tile shows muted badge when peer mutes', async () => {
        await clickMic(p1); await p1.waitForTimeout(1500)  // enable
        await clickMic(p1); await p1.waitForTimeout(1000)  // mute
        expect(await peerIsMuted(p2, 0)).toBe(true)
        console.log('✅ Mute badge visible to peer')
    })

    test('peer tile clears muted badge when peer unmutes', async () => {
        await clickMic(p1); await p1.waitForTimeout(1500)  // enable
        await clickMic(p1); await p1.waitForTimeout(500)   // mute
        await clickMic(p1); await p1.waitForTimeout(1000)  // unmute
        expect(await peerIsMuted(p2, 0)).toBe(false)
        console.log('✅ Mute badge cleared after unmute')
    })

    // ── Camera tests ──────────────────────────────────────────────────────────

    test('camera on shows cam-on on peer tile', async () => {
        await clickCam(p1); await p1.waitForTimeout(2000)
        expect(await peerHasCam(p2, 0)).toBe(true)
        console.log('✅ Camera on reflected in peer tile')
    })

    test('camera off removes cam-on from peer tile', async () => {
        await clickCam(p1); await p1.waitForTimeout(1500)
        await clickCam(p1); await p1.waitForTimeout(1500)
        expect(await peerHasCam(p2, 0)).toBe(false)
        console.log('✅ Camera off reflected in peer tile')
    })

    test('turning camera off does NOT kill mic', async () => {
        await clickMic(p1); await p1.waitForTimeout(1500)  // enable mic
        await clickCam(p1); await p1.waitForTimeout(1000)  // cam on
        await clickCam(p1); await p1.waitForTimeout(1000)  // cam off

        // Mic should still work: click again should mute (not re-request getUserMedia)
        await clickMic(p1); await p1.waitForTimeout(500)   // mute
        expect(await audioLabel(p1)).toBe('Unmute')        // proves mic stream still alive
        expect(await isCamOn(p1)).toBe(false)
        console.log('✅ Mic survives camera off')
    })

    test('camera button active state correct', async () => {
        expect(await isCamOn(p1)).toBe(false)

        await clickCam(p1); await p1.waitForTimeout(500)
        expect(await isCamOn(p1)).toBe(true)

        await clickCam(p1); await p1.waitForTimeout(500)
        expect(await isCamOn(p1)).toBe(false)
        console.log('✅ Camera button state correct')
    })
})

// ── 4-peer tests ──────────────────────────────────────────────────────────────

test.describe('4-peer combinations', () => {
    let browser: Browser
    let pages: Page[]
    let contexts: BrowserContext[]

    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: true, args: BROWSER_ARGS })
    })
    test.afterAll(async () => { await browser.close() })

    test.beforeEach(async () => {
        const room = `pw-4p-${Date.now()}`
        pages = []; contexts = []
        for (const name of ['Alice', 'Bob', 'Carol', 'Dave']) {
            const { ctx, page } = await joinRoom(browser, name, room)
            pages.push(page); contexts.push(ctx)
            await page.waitForTimeout(300)
        }
        for (const p of pages) await waitForPeerTile(p, 3)
    })
    test.afterEach(async () => { for (const c of contexts) await c.close() })

    test('all 4 peers can enable and mute mic independently', async () => {
        // Enable mic on all 4
        for (const p of pages) { await clickMic(p); await p.waitForTimeout(1200) }

        // Mute all — proves each got a stream
        for (const p of pages) { await clickMic(p); await p.waitForTimeout(400) }
        for (const p of pages) {
            expect(await audioLabel(p)).toBe('Unmute')  // each peer is muted
        }
        console.log('✅ All 4 peers independently acquired and muted mic')
    })

    test('mute on one peer shows on all others', async () => {
        await clickMic(pages[0]); await pages[0].waitForTimeout(1500)  // enable
        await clickMic(pages[0]); await pages[0].waitForTimeout(1000)  // mute

        for (let i = 1; i < 4; i++) {
            const tiles = pages[i].locator(PEER_TILES)
            const count = await tiles.count()
            let foundMuted = false
            for (let t = 0; t < count; t++) {
                if ((await tiles.nth(t).getAttribute('class') ?? '').includes('peer-muted')) {
                    foundMuted = true; break
                }
            }
            expect(foundMuted, `Page ${i+1} should see a muted tile`).toBe(true)
        }
        console.log('✅ Mute visible to all 3 other peers')
    })

    test('camera on one peer shows on all others', async () => {
        await clickCam(pages[0]); await pages[0].waitForTimeout(2000)

        for (let i = 1; i < 4; i++) {
            const n = await pages[i].locator(`${PEER_TILES}.cam-on`).count()
            expect(n, `Page ${i+1} should see cam-on tile`).toBeGreaterThan(0)
        }
        console.log('✅ Camera visible to all 3 other peers')
    })
})
