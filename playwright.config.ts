import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './e2e',
    timeout: 60_000,
    expect: { timeout: 10_000 },
    workers: 1,   // tests share a server — run serially
    use: {
        baseURL: 'http://localhost:8080',
        headless: false,
        launchOptions: {
            args: [
                '--use-fake-ui-for-media-stream',      // auto-grant mic/camera permission
                '--use-fake-device-for-media-stream',  // use fake mic/camera device
            ],
        },
    },
})
