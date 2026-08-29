let uo = [], qh = [];
(() => {
  let n = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,1n,9,16,o,,x,1i,3,,i,,7,a,2,t,3,1k,,,7,2,2,2,3,9,,a,2,q,,2,3,1k,,,5,4,2,2,3,3,,u,2,3,,b,3,1k,,,8,,3,,3,k,2,m,6,,3,1k,,,7,2,2,2,3,7,3,a,2,u,,1n,5,3,3,,4,9,,14,5,1j,,,7,,3,,4,7,2,b,2,t,3,1k,,,7,,3,,4,7,2,b,2,f,,c,4,1j,2,,7,,3,,4,9,,a,2,t,3,1y,,4,6,,,,8,i,2,1p,,,8,c,8,2q,,,a,b,7,21,2,r,,,,,,4,2,1d,k,,2,5,b,,10,9,,2u,b,,6,n,4,4,3,g,4,d,,,3,6,,f,,jj,3,qa,4,s,3,t,2,u,2,1s,w,9,,19,3,,,39,2,y,,3a,c,4,c,63,5,1l,a,,,,,2,o,2,,1c,1a,2,c,k,5,1b,h,12,9,c,3,u,d,1k,e,1c,k,48,3,,l,4,,6,,2,3,5i,1s,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,n,5,4,,2b,2,1e,i,q,i,d,,12,8,p,d,18,4,1b,e,10,,1v,e,c,,8,2,1a,,1f,,,3,2,2,5,2,,,15,5,5,2,6k,8,,2,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,1t,5,8t,2,25,6,1y,b,1d,4,3e,3,1h,f,15,,2,2,a,4,19,b,7,,1p,3,10,e,g,2,18,,c,3,1c,e,8,4,,2,2k,c,6,,2,,4d,c,l,4,1j,2,,7,2,2,2,3,9,,a,2,2,7,3,5,1v,9,,,2,,,4,,5,,,e,2,2a,i,n,,29,k,6j,7,2,9,r,2,2a,h,2y,d,2t,3,2,a,74,f,6t,6,,2,2,4,,,,2,3x,7,2,7,3,,s,a,14,7,,4,8,,9,b,1a,g,5i,8,5j,8,,8,2a,m,,e,3e,6,3,,,2,,7,,,1u,5,,2,,5,9n,4,9,2,,,1c,7,3,5,n,,44l,,6,f,8ug,i,1xc,5,1n,7,t4,,,1j,7,4,29,,b,2,f57,2,3mp,1a,2,n,f2,5,3,6,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,2s,,4g,7,af,,1p,4,e4,4,72,2,6r,,2,,7,2,5,,d6,7,31,7,240,5".split(",").map((e) => e ? parseInt(e, 36) : 1);
  for (let e = 0, t = 0; e < n.length; e++)
    (e % 2 ? qh : uo).push(t = t + n[e]);
})();
function Sd(n) {
  if (n < 768) return !1;
  for (let e = 0, t = uo.length; ; ) {
    let i = e + t >> 1;
    if (n < uo[i]) t = i;
    else if (n >= qh[i]) e = i + 1;
    else return !0;
    if (e == t) return !1;
  }
}
function Xa(n) {
  return n >= 127462 && n <= 127487;
}
const ba = 8205;
function xd(n, e, t = !0, i = !0) {
  return (t ? Vh : Xd)(n, e, i);
}
function Vh(n, e, t) {
  if (e == n.length) return e;
  e && zh(n.charCodeAt(e)) && Ch(n.charCodeAt(e - 1)) && e--;
  let i = Tr(n, e);
  for (e += ya(i); e < n.length; ) {
    let s = Tr(n, e);
    if (i == ba || s == ba || t && Sd(s))
      e += ya(s), i = s;
    else if (Xa(s)) {
      let r = 0, o = e - 2;
      for (; o >= 0 && Xa(Tr(n, o)); )
        r++, o -= 2;
      if (r % 2 == 0) break;
      e += 2;
    } else
      break;
  }
  return e;
}
function Xd(n, e, t) {
  for (; e > 1; ) {
    let i = Vh(n, e - 2, t);
    if (i < e) return i;
    e--;
  }
  return 0;
}
function Tr(n, e) {
  let t = n.charCodeAt(e);
  if (!Ch(t) || e + 1 == n.length) return t;
  let i = n.charCodeAt(e + 1);
  return zh(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
}
function zh(n) {
  return n >= 56320 && n < 57344;
}
function Ch(n) {
  return n >= 55296 && n < 56320;
}
function ya(n) {
  return n < 65536 ? 1 : 2;
}
class j {
  /**
  Get the line description around the given position.
  */
  lineAt(e) {
    if (e < 0 || e > this.length)
      throw new RangeError(`Invalid position ${e} in document of length ${this.length}`);
    return this.lineInner(e, !1, 1, 0);
  }
  /**
  Get the description for the given (1-based) line number.
  */
  line(e) {
    if (e < 1 || e > this.lines)
      throw new RangeError(`Invalid line number ${e} in ${this.lines}-line document`);
    return this.lineInner(e, !0, 1, 0);
  }
  /**
  Replace a range of the text with the given content.
  */
  replace(e, t, i) {
    [e, t] = qi(this, e, t);
    let s = [];
    return this.decompose(
      0,
      e,
      s,
      2
      /* Open.To */
    ), i.length && i.decompose(
      0,
      i.length,
      s,
      3
      /* Open.To */
    ), this.decompose(
      t,
      this.length,
      s,
      1
      /* Open.From */
    ), ht.from(s, this.length - (t - e) + i.length);
  }
  /**
  Append another document to this one.
  */
  append(e) {
    return this.replace(this.length, this.length, e);
  }
  /**
  Retrieve the text between the given points.
  */
  slice(e, t = this.length) {
    [e, t] = qi(this, e, t);
    let i = [];
    return this.decompose(e, t, i, 0), ht.from(i, t - e);
  }
  /**
  Test whether this text is equal to another instance.
  */
  eq(e) {
    if (e == this)
      return !0;
    if (e.length != this.length || e.lines != this.lines)
      return !1;
    let t = this.scanIdentical(e, 1), i = this.length - this.scanIdentical(e, -1), s = new On(this), r = new On(e);
    for (let o = t, O = t; ; ) {
      if (s.next(o), r.next(o), o = 0, s.lineBreak != r.lineBreak || s.done != r.done || s.value != r.value)
        return !1;
      if (O += s.value.length, s.done || O >= i)
        return !0;
    }
  }
  /**
  Iterate over the text. When `dir` is `-1`, iteration happens
  from end to start. This will return lines and the breaks between
  them as separate strings.
  */
  iter(e = 1) {
    return new On(this, e);
  }
  /**
  Iterate over a range of the text. When `from` > `to`, the
  iterator will run in reverse.
  */
  iterRange(e, t = this.length) {
    return new Wh(this, e, t);
  }
  /**
  Return a cursor that iterates over the given range of lines,
  _without_ returning the line breaks between, and yielding empty
  strings for empty lines.
  
  When `from` and `to` are given, they should be 1-based line numbers.
  */
  iterLines(e, t) {
    let i;
    if (e == null)
      i = this.iter();
    else {
      t == null && (t = this.lines + 1);
      let s = this.line(e).from;
      i = this.iterRange(s, Math.max(s, t == this.lines + 1 ? this.length : t <= 1 ? 0 : this.line(t - 1).to));
    }
    return new jh(i);
  }
  /**
  Return the document as a string, using newline characters to
  separate lines.
  */
  toString() {
    return this.sliceString(0);
  }
  /**
  Convert the document to an array of lines (which can be
  deserialized again via [`Text.of`](https://codemirror.net/6/docs/ref/#state.Text^of)).
  */
  toJSON() {
    let e = [];
    return this.flatten(e), e;
  }
  /**
  @internal
  */
  constructor() {
  }
  /**
  Create a `Text` instance for the given array of lines.
  */
  static of(e) {
    if (e.length == 0)
      throw new RangeError("A document must have at least one line");
    return e.length == 1 && !e[0] ? j.empty : e.length <= 32 ? new J(e) : ht.from(J.split(e, []));
  }
}
class J extends j {
  constructor(e, t = bd(e)) {
    super(), this.text = e, this.length = t;
  }
  get lines() {
    return this.text.length;
  }
  get children() {
    return null;
  }
  lineInner(e, t, i, s) {
    for (let r = 0; ; r++) {
      let o = this.text[r], O = s + o.length;
      if ((t ? i : O) >= e)
        return new yd(s, O, i, o);
      s = O + 1, i++;
    }
  }
  decompose(e, t, i, s) {
    let r = e <= 0 && t >= this.length ? this : new J(wa(this.text, e, t), Math.min(t, this.length) - Math.max(0, e));
    if (s & 1) {
      let o = i.pop(), O = Qs(r.text, o.text.slice(), 0, r.length);
      if (O.length <= 32)
        i.push(new J(O, o.length + r.length));
      else {
        let a = O.length >> 1;
        i.push(new J(O.slice(0, a)), new J(O.slice(a)));
      }
    } else
      i.push(r);
  }
  replace(e, t, i) {
    if (!(i instanceof J))
      return super.replace(e, t, i);
    [e, t] = qi(this, e, t);
    let s = Qs(this.text, Qs(i.text, wa(this.text, 0, e)), t), r = this.length + i.length - (t - e);
    return s.length <= 32 ? new J(s, r) : ht.from(J.split(s, []), r);
  }
  sliceString(e, t = this.length, i = `
`) {
    [e, t] = qi(this, e, t);
    let s = "";
    for (let r = 0, o = 0; r <= t && o < this.text.length; o++) {
      let O = this.text[o], a = r + O.length;
      r > e && o && (s += i), e < a && t > r && (s += O.slice(Math.max(0, e - r), t - r)), r = a + 1;
    }
    return s;
  }
  flatten(e) {
    for (let t of this.text)
      e.push(t);
  }
  scanIdentical() {
    return 0;
  }
  static split(e, t) {
    let i = [], s = -1;
    for (let r of e)
      i.push(r), s += r.length + 1, i.length == 32 && (t.push(new J(i, s)), i = [], s = -1);
    return s > -1 && t.push(new J(i, s)), t;
  }
}
class ht extends j {
  constructor(e, t) {
    super(), this.children = e, this.length = t, this.lines = 0;
    for (let i of e)
      this.lines += i.lines;
  }
  lineInner(e, t, i, s) {
    for (let r = 0; ; r++) {
      let o = this.children[r], O = s + o.length, a = i + o.lines - 1;
      if ((t ? a : O) >= e)
        return o.lineInner(e, t, i, s);
      s = O + 1, i = a + 1;
    }
  }
  decompose(e, t, i, s) {
    for (let r = 0, o = 0; o <= t && r < this.children.length; r++) {
      let O = this.children[r], a = o + O.length;
      if (e <= a && t >= o) {
        let l = s & ((o <= e ? 1 : 0) | (a >= t ? 2 : 0));
        o >= e && a <= t && !l ? i.push(O) : O.decompose(e - o, t - o, i, l);
      }
      o = a + 1;
    }
  }
  replace(e, t, i) {
    if ([e, t] = qi(this, e, t), i.lines < this.lines)
      for (let s = 0, r = 0; s < this.children.length; s++) {
        let o = this.children[s], O = r + o.length;
        if (e >= r && t <= O) {
          let a = o.replace(e - r, t - r, i), l = this.lines - o.lines + a.lines;
          if (a.lines < l >> 4 && a.lines > l >> 6) {
            let h = this.children.slice();
            return h[s] = a, new ht(h, this.length - (t - e) + i.length);
          }
          return super.replace(r, O, a);
        }
        r = O + 1;
      }
    return super.replace(e, t, i);
  }
  sliceString(e, t = this.length, i = `
`) {
    [e, t] = qi(this, e, t);
    let s = "";
    for (let r = 0, o = 0; r < this.children.length && o <= t; r++) {
      let O = this.children[r], a = o + O.length;
      o > e && r && (s += i), e < a && t > o && (s += O.sliceString(e - o, t - o, i)), o = a + 1;
    }
    return s;
  }
  flatten(e) {
    for (let t of this.children)
      t.flatten(e);
  }
  scanIdentical(e, t) {
    if (!(e instanceof ht))
      return 0;
    let i = 0, [s, r, o, O] = t > 0 ? [0, 0, this.children.length, e.children.length] : [this.children.length - 1, e.children.length - 1, -1, -1];
    for (; ; s += t, r += t) {
      if (s == o || r == O)
        return i;
      let a = this.children[s], l = e.children[r];
      if (a != l)
        return i + a.scanIdentical(l, t);
      i += a.length + 1;
    }
  }
  static from(e, t = e.reduce((i, s) => i + s.length + 1, -1)) {
    let i = 0;
    for (let u of e)
      i += u.lines;
    if (i < 32) {
      let u = [];
      for (let d of e)
        d.flatten(u);
      return new J(u, t);
    }
    let s = Math.max(
      32,
      i >> 5
      /* Tree.BranchShift */
    ), r = s << 1, o = s >> 1, O = [], a = 0, l = -1, h = [];
    function c(u) {
      let d;
      if (u.lines > r && u instanceof ht)
        for (let m of u.children)
          c(m);
      else u.lines > o && (a > o || !a) ? (f(), O.push(u)) : u instanceof J && a && (d = h[h.length - 1]) instanceof J && u.lines + d.lines <= 32 ? (a += u.lines, l += u.length + 1, h[h.length - 1] = new J(d.text.concat(u.text), d.length + 1 + u.length)) : (a + u.lines > s && f(), a += u.lines, l += u.length + 1, h.push(u));
    }
    function f() {
      a != 0 && (O.push(h.length == 1 ? h[0] : ht.from(h, l)), l = -1, a = h.length = 0);
    }
    for (let u of e)
      c(u);
    return f(), O.length == 1 ? O[0] : new ht(O, t);
  }
}
j.empty = /* @__PURE__ */ new J([""], 0);
function bd(n) {
  let e = -1;
  for (let t of n)
    e += t.length + 1;
  return e;
}
function Qs(n, e, t = 0, i = 1e9) {
  for (let s = 0, r = 0, o = !0; r < n.length && s <= i; r++) {
    let O = n[r], a = s + O.length;
    a >= t && (a > i && (O = O.slice(0, i - s)), s < t && (O = O.slice(t - s)), o ? (e[e.length - 1] += O, o = !1) : e.push(O)), s = a + 1;
  }
  return e;
}
function wa(n, e, t) {
  return Qs(n, [""], e, t);
}
class On {
  constructor(e, t = 1) {
    this.dir = t, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [e], this.offsets = [t > 0 ? 1 : (e instanceof J ? e.text.length : e.children.length) << 1];
  }
  nextInner(e, t) {
    for (this.done = this.lineBreak = !1; ; ) {
      let i = this.nodes.length - 1, s = this.nodes[i], r = this.offsets[i], o = r >> 1, O = s instanceof J ? s.text.length : s.children.length;
      if (o == (t > 0 ? O : 0)) {
        if (i == 0)
          return this.done = !0, this.value = "", this;
        t > 0 && this.offsets[i - 1]++, this.nodes.pop(), this.offsets.pop();
      } else if ((r & 1) == (t > 0 ? 0 : 1)) {
        if (this.offsets[i] += t, e == 0)
          return this.lineBreak = !0, this.value = `
`, this;
        e--;
      } else if (s instanceof J) {
        let a = s.text[o + (t < 0 ? -1 : 0)];
        if (this.offsets[i] += t, a.length > Math.max(0, e))
          return this.value = e == 0 ? a : t > 0 ? a.slice(e) : a.slice(0, a.length - e), this;
        e -= a.length;
      } else {
        let a = s.children[o + (t < 0 ? -1 : 0)];
        e > a.length ? (e -= a.length, this.offsets[i] += t) : (t < 0 && this.offsets[i]--, this.nodes.push(a), this.offsets.push(t > 0 ? 1 : (a instanceof J ? a.text.length : a.children.length) << 1));
      }
    }
  }
  next(e = 0) {
    return e < 0 && (this.nextInner(-e, -this.dir), e = this.value.length), this.nextInner(e, this.dir);
  }
}
class Wh {
  constructor(e, t, i) {
    this.value = "", this.done = !1, this.cursor = new On(e, t > i ? -1 : 1), this.pos = t > i ? e.length : 0, this.from = Math.min(t, i), this.to = Math.max(t, i);
  }
  nextInner(e, t) {
    if (t < 0 ? this.pos <= this.from : this.pos >= this.to)
      return this.value = "", this.done = !0, this;
    e += Math.max(0, t < 0 ? this.pos - this.to : this.from - this.pos);
    let i = t < 0 ? this.pos - this.from : this.to - this.pos;
    e > i && (e = i), i -= e;
    let { value: s } = this.cursor.next(e);
    return this.pos += (s.length + e) * t, this.value = s.length <= i ? s : t < 0 ? s.slice(s.length - i) : s.slice(0, i), this.done = !this.value, this;
  }
  next(e = 0) {
    return e < 0 ? e = Math.max(e, this.from - this.pos) : e > 0 && (e = Math.min(e, this.to - this.pos)), this.nextInner(e, this.cursor.dir);
  }
  get lineBreak() {
    return this.cursor.lineBreak && this.value != "";
  }
}
class jh {
  constructor(e) {
    this.inner = e, this.afterBreak = !0, this.value = "", this.done = !1;
  }
  next(e = 0) {
    let { done: t, lineBreak: i, value: s } = this.inner.next(e);
    return t && this.afterBreak ? (this.value = "", this.afterBreak = !1) : t ? (this.done = !0, this.value = "") : i ? this.afterBreak ? this.value = "" : (this.afterBreak = !0, this.next()) : (this.value = s, this.afterBreak = !1), this;
  }
  get lineBreak() {
    return !1;
  }
}
typeof Symbol < "u" && (j.prototype[Symbol.iterator] = function() {
  return this.iter();
}, On.prototype[Symbol.iterator] = Wh.prototype[Symbol.iterator] = jh.prototype[Symbol.iterator] = function() {
  return this;
});
class yd {
  /**
  @internal
  */
  constructor(e, t, i, s) {
    this.from = e, this.to = t, this.number = i, this.text = s;
  }
  /**
  The length of the line (not including any line break after it).
  */
  get length() {
    return this.to - this.from;
  }
}
function qi(n, e, t) {
  return e = Math.max(0, Math.min(n.length, e)), [e, Math.max(e, Math.min(n.length, t))];
}
function le(n, e, t = !0, i = !0) {
  return xd(n, e, t, i);
}
function wd(n) {
  return n >= 56320 && n < 57344;
}
function kd(n) {
  return n >= 55296 && n < 56320;
}
function ke(n, e) {
  let t = n.charCodeAt(e);
  if (!kd(t) || e + 1 == n.length)
    return t;
  let i = n.charCodeAt(e + 1);
  return wd(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
}
function $O(n) {
  return n <= 65535 ? String.fromCharCode(n) : (n -= 65536, String.fromCharCode((n >> 10) + 55296, (n & 1023) + 56320));
}
function ct(n) {
  return n < 65536 ? 1 : 2;
}
const po = /\r\n?|\n/;
var de = /* @__PURE__ */ function(n) {
  return n[n.Simple = 0] = "Simple", n[n.TrackDel = 1] = "TrackDel", n[n.TrackBefore = 2] = "TrackBefore", n[n.TrackAfter = 3] = "TrackAfter", n;
}(de || (de = {}));
class gt {
  // Sections are encoded as pairs of integers. The first is the
  // length in the current document, and the second is -1 for
  // unaffected sections, and the length of the replacement content
  // otherwise. So an insertion would be (0, n>0), a deletion (n>0,
  // 0), and a replacement two positive numbers.
  /**
  @internal
  */
  constructor(e) {
    this.sections = e;
  }
  /**
  The length of the document before the change.
  */
  get length() {
    let e = 0;
    for (let t = 0; t < this.sections.length; t += 2)
      e += this.sections[t];
    return e;
  }
  /**
  The length of the document after the change.
  */
  get newLength() {
    let e = 0;
    for (let t = 0; t < this.sections.length; t += 2) {
      let i = this.sections[t + 1];
      e += i < 0 ? this.sections[t] : i;
    }
    return e;
  }
  /**
  False when there are actual changes in this set.
  */
  get empty() {
    return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
  }
  /**
  Iterate over the unchanged parts left by these changes. `posA`
  provides the position of the range in the old document, `posB`
  the new position in the changed document.
  */
  iterGaps(e) {
    for (let t = 0, i = 0, s = 0; t < this.sections.length; ) {
      let r = this.sections[t++], o = this.sections[t++];
      o < 0 ? (e(i, s, r), s += r) : s += o, i += r;
    }
  }
  /**
  Iterate over the ranges changed by these changes. (See
  [`ChangeSet.iterChanges`](https://codemirror.net/6/docs/ref/#state.ChangeSet.iterChanges) for a
  variant that also provides you with the inserted text.)
  `fromA`/`toA` provides the extent of the change in the starting
  document, `fromB`/`toB` the extent of the replacement in the
  changed document.
  
  When `individual` is true, adjacent changes (which are kept
  separate for [position mapping](https://codemirror.net/6/docs/ref/#state.ChangeDesc.mapPos)) are
  reported separately.
  */
  iterChangedRanges(e, t = !1) {
    mo(this, e, t);
  }
  /**
  Get a description of the inverted form of these changes.
  */
  get invertedDesc() {
    let e = [];
    for (let t = 0; t < this.sections.length; ) {
      let i = this.sections[t++], s = this.sections[t++];
      s < 0 ? e.push(i, s) : e.push(s, i);
    }
    return new gt(e);
  }
  /**
  Compute the combined effect of applying another set of changes
  after this one. The length of the document after this set should
  match the length before `other`.
  */
  composeDesc(e) {
    return this.empty ? e : e.empty ? this : Ah(this, e);
  }
  /**
  Map this description, which should start with the same document
  as `other`, over another set of changes, so that it can be
  applied after it. When `before` is true, map as if the changes
  in `this` happened before the ones in `other`.
  */
  mapDesc(e, t = !1) {
    return e.empty ? this : go(this, e, t);
  }
  mapPos(e, t = -1, i = de.Simple) {
    let s = 0, r = 0;
    for (let o = 0; o < this.sections.length; ) {
      let O = this.sections[o++], a = this.sections[o++], l = s + O;
      if (a < 0) {
        if (l > e)
          return r + (e - s);
        r += O;
      } else {
        if (i != de.Simple && l >= e && (i == de.TrackDel && s < e && l > e || i == de.TrackBefore && s < e || i == de.TrackAfter && l > e))
          return null;
        if (l > e || l == e && t < 0 && !O)
          return e == s || t < 0 ? r : r + a;
        r += a;
      }
      s = l;
    }
    if (e > s)
      throw new RangeError(`Position ${e} is out of range for changeset of length ${s}`);
    return r;
  }
  /**
  Check whether these changes touch a given range. When one of the
  changes entirely covers the range, the string `"cover"` is
  returned.
  */
  touchesRange(e, t = e) {
    for (let i = 0, s = 0; i < this.sections.length && s <= t; ) {
      let r = this.sections[i++], o = this.sections[i++], O = s + r;
      if (o >= 0 && s <= t && O >= e)
        return s < e && O > t ? "cover" : !0;
      s = O;
    }
    return !1;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 0; t < this.sections.length; ) {
      let i = this.sections[t++], s = this.sections[t++];
      e += (e ? " " : "") + i + (s >= 0 ? ":" + s : "");
    }
    return e;
  }
  /**
  Serialize this change desc to a JSON-representable value.
  */
  toJSON() {
    return this.sections;
  }
  /**
  Create a change desc from its JSON representation (as produced
  by [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeDesc.toJSON).
  */
  static fromJSON(e) {
    if (!Array.isArray(e) || e.length % 2 || e.some((t) => typeof t != "number"))
      throw new RangeError("Invalid JSON representation of ChangeDesc");
    return new gt(e);
  }
  /**
  @internal
  */
  static create(e) {
    return new gt(e);
  }
}
class se extends gt {
  constructor(e, t) {
    super(e), this.inserted = t;
  }
  /**
  Apply the changes to a document, returning the modified
  document.
  */
  apply(e) {
    if (this.length != e.length)
      throw new RangeError("Applying change set to a document with the wrong length");
    return mo(this, (t, i, s, r, o) => e = e.replace(s, s + (i - t), o), !1), e;
  }
  mapDesc(e, t = !1) {
    return go(this, e, t, !0);
  }
  /**
  Given the document as it existed _before_ the changes, return a
  change set that represents the inverse of this set, which could
  be used to go from the document created by the changes back to
  the document as it existed before the changes.
  */
  invert(e) {
    let t = this.sections.slice(), i = [];
    for (let s = 0, r = 0; s < t.length; s += 2) {
      let o = t[s], O = t[s + 1];
      if (O >= 0) {
        t[s] = O, t[s + 1] = o;
        let a = s >> 1;
        for (; i.length < a; )
          i.push(j.empty);
        i.push(o ? e.slice(r, r + o) : j.empty);
      }
      r += o;
    }
    return new se(t, i);
  }
  /**
  Combine two subsequent change sets into a single set. `other`
  must start in the document produced by `this`. If `this` goes
  `docA` → `docB` and `other` represents `docB` → `docC`, the
  returned value will represent the change `docA` → `docC`.
  */
  compose(e) {
    return this.empty ? e : e.empty ? this : Ah(this, e, !0);
  }
  /**
  Given another change set starting in the same document, maps this
  change set over the other, producing a new change set that can be
  applied to the document produced by applying `other`. When
  `before` is `true`, order changes as if `this` comes before
  `other`, otherwise (the default) treat `other` as coming first.
  
  Given two changes `A` and `B`, `A.compose(B.map(A))` and
  `B.compose(A.map(B, true))` will produce the same document. This
  provides a basic form of [operational
  transformation](https://en.wikipedia.org/wiki/Operational_transformation),
  and can be used for collaborative editing.
  */
  map(e, t = !1) {
    return e.empty ? this : go(this, e, t, !0);
  }
  /**
  Iterate over the changed ranges in the document, calling `f` for
  each, with the range in the original document (`fromA`-`toA`)
  and the range that replaces it in the new document
  (`fromB`-`toB`).
  
  When `individual` is true, adjacent changes are reported
  separately.
  */
  iterChanges(e, t = !1) {
    mo(this, e, t);
  }
  /**
  Get a [change description](https://codemirror.net/6/docs/ref/#state.ChangeDesc) for this change
  set.
  */
  get desc() {
    return gt.create(this.sections);
  }
  /**
  @internal
  */
  filter(e) {
    let t = [], i = [], s = [], r = new mn(this);
    e: for (let o = 0, O = 0; ; ) {
      let a = o == e.length ? 1e9 : e[o++];
      for (; O < a || O == a && r.len == 0; ) {
        if (r.done)
          break e;
        let h = Math.min(r.len, a - O);
        ge(s, h, -1);
        let c = r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0;
        ge(t, h, c), c > 0 && qt(i, t, r.text), r.forward(h), O += h;
      }
      let l = e[o++];
      for (; O < l; ) {
        if (r.done)
          break e;
        let h = Math.min(r.len, l - O);
        ge(t, h, -1), ge(s, h, r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0), r.forward(h), O += h;
      }
    }
    return {
      changes: new se(t, i),
      filtered: gt.create(s)
    };
  }
  /**
  Serialize this change set to a JSON-representable value.
  */
  toJSON() {
    let e = [];
    for (let t = 0; t < this.sections.length; t += 2) {
      let i = this.sections[t], s = this.sections[t + 1];
      s < 0 ? e.push(i) : s == 0 ? e.push([i]) : e.push([i].concat(this.inserted[t >> 1].toJSON()));
    }
    return e;
  }
  /**
  Create a change set for the given changes, for a document of the
  given length, using `lineSep` as line separator.
  */
  static of(e, t, i) {
    let s = [], r = [], o = 0, O = null;
    function a(h = !1) {
      if (!h && !s.length)
        return;
      o < t && ge(s, t - o, -1);
      let c = new se(s, r);
      O = O ? O.compose(c.map(O)) : c, s = [], r = [], o = 0;
    }
    function l(h) {
      if (Array.isArray(h))
        for (let c of h)
          l(c);
      else if (h instanceof se) {
        if (h.length != t)
          throw new RangeError(`Mismatched change set length (got ${h.length}, expected ${t})`);
        a(), O = O ? O.compose(h.map(O)) : h;
      } else {
        let { from: c, to: f = c, insert: u } = h;
        if (c > f || c < 0 || f > t)
          throw new RangeError(`Invalid change range ${c} to ${f} (in doc of length ${t})`);
        let d = u ? typeof u == "string" ? j.of(u.split(i || po)) : u : j.empty, m = d.length;
        if (c == f && m == 0)
          return;
        c < o && a(), c > o && ge(s, c - o, -1), ge(s, f - c, m), qt(r, s, d), o = f;
      }
    }
    return l(e), a(!O), O;
  }
  /**
  Create an empty changeset of the given length.
  */
  static empty(e) {
    return new se(e ? [e, -1] : [], []);
  }
  /**
  Create a changeset from its JSON representation (as produced by
  [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeSet.toJSON).
  */
  static fromJSON(e) {
    if (!Array.isArray(e))
      throw new RangeError("Invalid JSON representation of ChangeSet");
    let t = [], i = [];
    for (let s = 0; s < e.length; s++) {
      let r = e[s];
      if (typeof r == "number")
        t.push(r, -1);
      else {
        if (!Array.isArray(r) || typeof r[0] != "number" || r.some((o, O) => O && typeof o != "string"))
          throw new RangeError("Invalid JSON representation of ChangeSet");
        if (r.length == 1)
          t.push(r[0], 0);
        else {
          for (; i.length < s; )
            i.push(j.empty);
          i[s] = j.of(r.slice(1)), t.push(r[0], i[s].length);
        }
      }
    }
    return new se(t, i);
  }
  /**
  @internal
  */
  static createSet(e, t) {
    return new se(e, t);
  }
}
function ge(n, e, t, i = !1) {
  if (e == 0 && t <= 0)
    return;
  let s = n.length - 2;
  s >= 0 && t <= 0 && t == n[s + 1] ? n[s] += e : s >= 0 && e == 0 && n[s] == 0 ? n[s + 1] += t : i ? (n[s] += e, n[s + 1] += t) : n.push(e, t);
}
function qt(n, e, t) {
  if (t.length == 0)
    return;
  let i = e.length - 2 >> 1;
  if (i < n.length)
    n[n.length - 1] = n[n.length - 1].append(t);
  else {
    for (; n.length < i; )
      n.push(j.empty);
    n.push(t);
  }
}
function mo(n, e, t) {
  let i = n.inserted;
  for (let s = 0, r = 0, o = 0; o < n.sections.length; ) {
    let O = n.sections[o++], a = n.sections[o++];
    if (a < 0)
      s += O, r += O;
    else {
      let l = s, h = r, c = j.empty;
      for (; l += O, h += a, a && i && (c = c.append(i[o - 2 >> 1])), !(t || o == n.sections.length || n.sections[o + 1] < 0); )
        O = n.sections[o++], a = n.sections[o++];
      e(s, l, r, h, c), s = l, r = h;
    }
  }
}
function go(n, e, t, i = !1) {
  let s = [], r = i ? [] : null, o = new mn(n), O = new mn(e);
  for (let a = -1; ; ) {
    if (o.done && O.len || O.done && o.len)
      throw new Error("Mismatched change set lengths");
    if (o.ins == -1 && O.ins == -1) {
      let l = Math.min(o.len, O.len);
      ge(s, l, -1), o.forward(l), O.forward(l);
    } else if (O.ins >= 0 && (o.ins < 0 || a == o.i || o.off == 0 && (O.len < o.len || O.len == o.len && !t))) {
      let l = O.len;
      for (ge(s, O.ins, -1); l; ) {
        let h = Math.min(o.len, l);
        o.ins >= 0 && a < o.i && o.len <= h && (ge(s, 0, o.ins), r && qt(r, s, o.text), a = o.i), o.forward(h), l -= h;
      }
      O.next();
    } else if (o.ins >= 0) {
      let l = 0, h = o.len;
      for (; h; )
        if (O.ins == -1) {
          let c = Math.min(h, O.len);
          l += c, h -= c, O.forward(c);
        } else if (O.ins == 0 && O.len < h)
          h -= O.len, O.next();
        else
          break;
      ge(s, l, a < o.i ? o.ins : 0), r && a < o.i && qt(r, s, o.text), a = o.i, o.forward(o.len - h);
    } else {
      if (o.done && O.done)
        return r ? se.createSet(s, r) : gt.create(s);
      throw new Error("Mismatched change set lengths");
    }
  }
}
function Ah(n, e, t = !1) {
  let i = [], s = t ? [] : null, r = new mn(n), o = new mn(e);
  for (let O = !1; ; ) {
    if (r.done && o.done)
      return s ? se.createSet(i, s) : gt.create(i);
    if (r.ins == 0)
      ge(i, r.len, 0, O), r.next();
    else if (o.len == 0 && !o.done)
      ge(i, 0, o.ins, O), s && qt(s, i, o.text), o.next();
    else {
      if (r.done || o.done)
        throw new Error("Mismatched change set lengths");
      {
        let a = Math.min(r.len2, o.len), l = i.length;
        if (r.ins == -1) {
          let h = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
          ge(i, a, h, O), s && h && qt(s, i, o.text);
        } else o.ins == -1 ? (ge(i, r.off ? 0 : r.len, a, O), s && qt(s, i, r.textBit(a))) : (ge(i, r.off ? 0 : r.len, o.off ? 0 : o.ins, O), s && !o.off && qt(s, i, o.text));
        O = (r.ins > a || o.ins >= 0 && o.len > a) && (O || i.length > l), r.forward2(a), o.forward(a);
      }
    }
  }
}
class mn {
  constructor(e) {
    this.set = e, this.i = 0, this.next();
  }
  next() {
    let { sections: e } = this.set;
    this.i < e.length ? (this.len = e[this.i++], this.ins = e[this.i++]) : (this.len = 0, this.ins = -2), this.off = 0;
  }
  get done() {
    return this.ins == -2;
  }
  get len2() {
    return this.ins < 0 ? this.len : this.ins;
  }
  get text() {
    let { inserted: e } = this.set, t = this.i - 2 >> 1;
    return t >= e.length ? j.empty : e[t];
  }
  textBit(e) {
    let { inserted: t } = this.set, i = this.i - 2 >> 1;
    return i >= t.length && !e ? j.empty : t[i].slice(this.off, e == null ? void 0 : this.off + e);
  }
  forward(e) {
    e == this.len ? this.next() : (this.len -= e, this.off += e);
  }
  forward2(e) {
    this.ins == -1 ? this.forward(e) : e == this.ins ? this.next() : (this.ins -= e, this.off += e);
  }
}
class Yt {
  constructor(e, t, i, s) {
    this.from = e, this.to = t, this.flags = i, this.goalColumn = s;
  }
  /**
  The anchor of the range—the side that doesn't move when you
  extend it.
  */
  get anchor() {
    return this.flags & 32 ? this.to : this.from;
  }
  /**
  The head of the range, which is moved when the range is
  [extended](https://codemirror.net/6/docs/ref/#state.SelectionRange.extend).
  */
  get head() {
    return this.flags & 32 ? this.from : this.to;
  }
  /**
  True when `anchor` and `head` are at the same position.
  */
  get empty() {
    return this.from == this.to;
  }
  /**
  If this is a cursor that is explicitly associated with the
  character on one of its sides, this returns the side. -1 means
  the character before its position, 1 the character after, and 0
  means no association.
  */
  get assoc() {
    return this.flags & 8 ? -1 : this.flags & 16 ? 1 : 0;
  }
  /**
  A flag that, when set, makes some selection-extending commands
  treat the range's head and anchor as exchangeable, so that for
  example Shift-ArrowUp will make the lower side of the selection
  the anchor, even if that was the head before. Used to implement
  MacOS-style undirectional selections.
  */
  get undirectional() {
    return (this.flags & 64) > 0;
  }
  /**
  The bidirectional text level associated with this cursor, if
  any.
  */
  get bidiLevel() {
    let e = this.flags & 7;
    return e == 7 ? null : e;
  }
  /**
  Map this range through a change, producing a valid range in the
  updated document.
  */
  map(e, t = -1) {
    let i, s;
    return this.empty ? i = s = e.mapPos(this.from, t) : (i = e.mapPos(this.from, 1), s = e.mapPos(this.to, -1)), i == this.from && s == this.to ? this : new Yt(i, s, this.flags, this.goalColumn);
  }
  /**
  Extend this range to cover at least `from` to `to`.
  */
  extend(e, t = e, i = 0) {
    if (e <= this.anchor && t >= this.anchor)
      return $.range(e, t, void 0, void 0, i);
    let s = Math.abs(e - this.anchor) > Math.abs(t - this.anchor) ? e : t;
    return $.range(this.anchor, s, void 0, void 0, i);
  }
  /**
  Compare this range to another range.
  */
  eq(e, t = !1) {
    return this.anchor == e.anchor && this.head == e.head && this.goalColumn == e.goalColumn && (!t || !this.empty || this.assoc == e.assoc);
  }
  /**
  Return a JSON-serializable object representing the range.
  */
  toJSON() {
    return { anchor: this.anchor, head: this.head };
  }
  /**
  Convert a JSON representation of a range to a `SelectionRange`
  instance.
  */
  static fromJSON(e) {
    if (!e || typeof e.anchor != "number" || typeof e.head != "number")
      throw new RangeError("Invalid JSON representation for SelectionRange");
    return $.range(e.anchor, e.head);
  }
  /**
  @internal
  */
  static create(e, t, i, s) {
    return new Yt(e, t, i, s);
  }
}
class $ {
  constructor(e, t) {
    this.ranges = e, this.mainIndex = t;
  }
  /**
  Map a selection through a change. Used to adjust the selection
  position for changes.
  */
  map(e, t = -1) {
    return e.empty ? this : $.create(this.ranges.map((i) => i.map(e, t)), this.mainIndex);
  }
  /**
  Compare this selection to another selection. By default, ranges
  are compared only by position. When `includeAssoc` is true,
  cursor ranges must also have the same
  [`assoc`](https://codemirror.net/6/docs/ref/#state.SelectionRange.assoc) value.
  */
  eq(e, t = !1) {
    if (this.ranges.length != e.ranges.length || this.mainIndex != e.mainIndex)
      return !1;
    for (let i = 0; i < this.ranges.length; i++)
      if (!this.ranges[i].eq(e.ranges[i], t))
        return !1;
    return !0;
  }
  /**
  Get the primary selection range. Usually, you should make sure
  your code applies to _all_ ranges, by using methods like
  [`changeByRange`](https://codemirror.net/6/docs/ref/#state.EditorState.changeByRange).
  */
  get main() {
    return this.ranges[this.mainIndex];
  }
  /**
  Make sure the selection only has one range. Returns a selection
  holding only the main range from this selection.
  */
  asSingle() {
    return this.ranges.length == 1 ? this : new $([this.main], 0);
  }
  /**
  Extend this selection with an extra range.
  */
  addRange(e, t = !0) {
    return $.create([e].concat(this.ranges), t ? 0 : this.mainIndex + 1);
  }
  /**
  Replace a given range with another range, and then normalize the
  selection to merge and sort ranges if necessary.
  */
  replaceRange(e, t = this.mainIndex) {
    let i = this.ranges.slice();
    return i[t] = e, $.create(i, this.mainIndex);
  }
  /**
  Convert this selection to an object that can be serialized to
  JSON.
  */
  toJSON() {
    return { ranges: this.ranges.map((e) => e.toJSON()), main: this.mainIndex };
  }
  /**
  Create a selection from a JSON representation.
  */
  static fromJSON(e) {
    if (!e || !Array.isArray(e.ranges) || typeof e.main != "number" || e.main >= e.ranges.length)
      throw new RangeError("Invalid JSON representation for EditorSelection");
    return new $(e.ranges.map((t) => Yt.fromJSON(t)), e.main);
  }
  /**
  Create a selection holding a single range.
  */
  static single(e, t = e) {
    return new $([$.range(e, t)], 0);
  }
  /**
  Sort and merge the given set of ranges, creating a valid
  selection.
  */
  static create(e, t = 0) {
    if (e.length == 0)
      throw new RangeError("A selection needs at least one range");
    for (let i = 0, s = 0; s < e.length; s++) {
      let r = e[s];
      if (r.empty ? r.from <= i : r.from < i)
        return $.normalized(e.slice(), t);
      i = r.to;
    }
    return new $(e, t);
  }
  /**
  Create a cursor selection range at the given position. You can
  safely ignore the optional arguments in most situations.
  */
  static cursor(e, t = 0, i, s) {
    return Yt.create(e, e, (t == 0 ? 0 : t < 0 ? 8 : 16) | (i == null ? 7 : Math.min(6, i)), s);
  }
  /**
  Create a selection range.
  */
  static range(e, t, i, s, r) {
    let o = s == null ? 7 : Math.min(6, s);
    return !r && e != t && (r = t < e ? 1 : -1), r && (o |= r < 0 ? 8 : 16), t < e ? Yt.create(t, e, o | 32, i) : Yt.create(e, t, o, i);
  }
  /**
  Create an [undirectional](https://codemirror.net/6/docs/ref/#state.SelectionRange.undirectional)
  selection range.
  */
  static undirectionalRange(e, t) {
    return Yt.create(e, t, 64, void 0);
  }
  /**
  @internal
  */
  static normalized(e, t = 0) {
    let i = e[t];
    e.sort((s, r) => s.from - r.from), t = e.indexOf(i);
    for (let s = 1; s < e.length; s++) {
      let r = e[s], o = e[s - 1];
      if (r.empty ? r.from <= o.to : r.from < o.to) {
        let O = o.from, a = Math.max(r.to, o.to);
        s <= t && t--, e.splice(--s, 2, r.anchor > r.head ? $.range(a, O) : $.range(O, a));
      }
    }
    return new $(e, t);
  }
}
function Eh(n, e) {
  for (let t of n.ranges)
    if (t.to > e)
      throw new RangeError("Selection points outside of document");
}
let PO = 0;
class v {
  constructor(e, t, i, s, r) {
    this.combine = e, this.compareInput = t, this.compare = i, this.isStatic = s, this.id = PO++, this.default = e([]), this.extensions = typeof r == "function" ? r(this) : r;
  }
  /**
  Returns a facet reader for this facet, which can be used to
  [read](https://codemirror.net/6/docs/ref/#state.EditorState.facet) it but not to define values for it.
  */
  get reader() {
    return this;
  }
  /**
  Define a new facet.
  */
  static define(e = {}) {
    return new v(e.combine || ((t) => t), e.compareInput || ((t, i) => t === i), e.compare || (e.combine ? (t, i) => t === i : SO), !!e.static, e.enables);
  }
  /**
  Returns an extension that adds the given value to this facet.
  */
  of(e) {
    return new $s([], this, 0, e);
  }
  /**
  Create an extension that computes a value for the facet from a
  state. You must take care to declare the parts of the state that
  this value depends on, since your function is only called again
  for a new state when one of those parts changed.
  
  In cases where your value depends only on a single field, you'll
  want to use the [`from`](https://codemirror.net/6/docs/ref/#state.Facet.from) method instead.
  */
  compute(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new $s(e, this, 1, t);
  }
  /**
  Create an extension that computes zero or more values for this
  facet from a state.
  */
  computeN(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new $s(e, this, 2, t);
  }
  from(e, t) {
    return t || (t = (i) => i), this.compute([e], (i) => t(i.field(e)));
  }
}
function SO(n, e) {
  return n == e || n.length == e.length && n.every((t, i) => t === e[i]);
}
class $s {
  constructor(e, t, i, s) {
    this.dependencies = e, this.facet = t, this.type = i, this.value = s, this.id = PO++;
  }
  dynamicSlot(e) {
    var t;
    let i = this.value, s = this.facet.compareInput, r = this.id, o = e[r] >> 1, O = this.type == 2, a = !1, l = !1, h = [];
    for (let c of this.dependencies)
      c == "doc" ? a = !0 : c == "selection" ? l = !0 : ((t = e[c.id]) !== null && t !== void 0 ? t : 1) & 1 || h.push(e[c.id]);
    return {
      create(c) {
        return c.values[o] = i(c), 1;
      },
      update(c, f) {
        if (a && f.docChanged || l && (f.docChanged || f.selection) || Qo(c, h)) {
          let u = i(c);
          if (O ? !ka(u, c.values[o], s) : !s(u, c.values[o]))
            return c.values[o] = u, 1;
        }
        return 0;
      },
      reconfigure: (c, f) => {
        let u, d = f.config.address[r];
        if (d != null) {
          let m = vs(f, d);
          if (this.dependencies.every((g) => g instanceof v ? f.facet(g) === c.facet(g) : g instanceof me ? f.field(g, !1) == c.field(g, !1) : !0) || (O ? ka(u = i(c), m, s) : s(u = i(c), m)))
            return c.values[o] = m, 0;
        } else
          u = i(c);
        return c.values[o] = u, 1;
      }
    };
  }
  get extension() {
    return this;
  }
}
function ka(n, e, t) {
  if (n.length != e.length)
    return !1;
  for (let i = 0; i < n.length; i++)
    if (!t(n[i], e[i]))
      return !1;
  return !0;
}
function Qo(n, e) {
  let t = !1;
  for (let i of e)
    an(n, i) & 1 && (t = !0);
  return t;
}
function Zd(n, e, t) {
  let i = t.map((a) => n[a.id]), s = t.map((a) => a.type), r = i.filter((a) => !(a & 1)), o = n[e.id] >> 1;
  function O(a) {
    let l = [];
    for (let h = 0; h < i.length; h++) {
      let c = vs(a, i[h]);
      if (s[h] == 2)
        for (let f of c)
          l.push(f);
      else
        l.push(c);
    }
    return e.combine(l);
  }
  return {
    create(a) {
      for (let l of i)
        an(a, l);
      return a.values[o] = O(a), 1;
    },
    update(a, l) {
      if (!Qo(a, r))
        return 0;
      let h = O(a);
      return e.compare(h, a.values[o]) ? 0 : (a.values[o] = h, 1);
    },
    reconfigure(a, l) {
      let h = Qo(a, i), c = l.config.facets[e.id], f = l.facet(e);
      if (c && !h && SO(t, c))
        return a.values[o] = f, 0;
      let u = O(a);
      return e.compare(u, f) ? (a.values[o] = f, 0) : (a.values[o] = u, 1);
    }
  };
}
const In = /* @__PURE__ */ v.define({ static: !0 });
class me {
  constructor(e, t, i, s, r) {
    this.id = e, this.createF = t, this.updateF = i, this.compareF = s, this.spec = r, this.provides = void 0;
  }
  /**
  Define a state field.
  */
  static define(e) {
    let t = new me(PO++, e.create, e.update, e.compare || ((i, s) => i === s), e);
    return e.provide && (t.provides = e.provide(t)), t;
  }
  create(e) {
    let t = e.facet(In).find((i) => i.field == this);
    return ((t == null ? void 0 : t.create) || this.createF)(e);
  }
  /**
  @internal
  */
  slot(e) {
    let t = e[this.id] >> 1;
    return {
      create: (i) => (i.values[t] = this.create(i), 1),
      update: (i, s) => {
        let r = i.values[t], o = this.updateF(r, s);
        return this.compareF(r, o) ? 0 : (i.values[t] = o, 1);
      },
      reconfigure: (i, s) => {
        let r = i.facet(In), o = s.facet(In), O;
        return (O = r.find((a) => a.field == this)) && O != o.find((a) => a.field == this) ? (i.values[t] = O.create(i), 1) : s.config.address[this.id] != null ? (i.values[t] = s.field(this), 0) : (i.values[t] = this.create(i), 1);
      }
    };
  }
  /**
  Returns an extension that enables this field and overrides the
  way it is initialized. Can be useful when you need to provide a
  non-default starting value for the field.
  */
  init(e) {
    return [this, In.of({ field: this, create: e })];
  }
  /**
  State field instances can be used as
  [`Extension`](https://codemirror.net/6/docs/ref/#state.Extension) values to enable the field in a
  given state.
  */
  get extension() {
    return this;
  }
}
const Jt = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
function Fi(n) {
  return (e) => new Mh(e, n);
}
const It = {
  /**
  The highest precedence level, for extensions that should end up
  near the start of the precedence ordering.
  */
  highest: /* @__PURE__ */ Fi(Jt.highest),
  /**
  A higher-than-default precedence, for extensions that should
  come before those with default precedence.
  */
  high: /* @__PURE__ */ Fi(Jt.high),
  /**
  The default precedence, which is also used for extensions
  without an explicit precedence.
  */
  default: /* @__PURE__ */ Fi(Jt.default),
  /**
  A lower-than-default precedence.
  */
  low: /* @__PURE__ */ Fi(Jt.low),
  /**
  The lowest precedence level. Meant for things that should end up
  near the end of the extension order.
  */
  lowest: /* @__PURE__ */ Fi(Jt.lowest)
};
class Mh {
  constructor(e, t) {
    this.inner = e, this.prec = t;
  }
  get extension() {
    return this;
  }
}
class Vn {
  /**
  Create an instance of this compartment to add to your [state
  configuration](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions).
  */
  of(e) {
    return new $o(this, e);
  }
  /**
  Create an [effect](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) that
  reconfigures this compartment.
  */
  reconfigure(e) {
    return Vn.reconfigure.of({ compartment: this, extension: e });
  }
  /**
  Get the current content of the compartment in the state, or
  `undefined` if it isn't present.
  */
  get(e) {
    return e.config.compartments.get(this);
  }
}
class $o {
  constructor(e, t) {
    this.compartment = e, this.inner = t;
  }
  get extension() {
    return this;
  }
}
class Zs {
  constructor(e, t, i, s, r, o) {
    for (this.base = e, this.compartments = t, this.dynamicSlots = i, this.address = s, this.staticValues = r, this.facets = o, this.statusTemplate = []; this.statusTemplate.length < i.length; )
      this.statusTemplate.push(
        0
        /* SlotStatus.Unresolved */
      );
  }
  staticFacet(e) {
    let t = this.address[e.id];
    return t == null ? e.default : this.staticValues[t >> 1];
  }
  static resolve(e, t, i) {
    let s = [], r = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ new Map();
    for (let f of vd(e, t, o))
      f instanceof me ? s.push(f) : (r[f.facet.id] || (r[f.facet.id] = [])).push(f);
    let O = /* @__PURE__ */ Object.create(null), a = [], l = [];
    for (let f of s)
      O[f.id] = l.length << 1, l.push((u) => f.slot(u));
    let h = i == null ? void 0 : i.config.facets;
    for (let f in r) {
      let u = r[f], d = u[0].facet, m = h && h[f] || [];
      if (u.every(
        (g) => g.type == 0
        /* Provider.Static */
      ))
        if (O[d.id] = a.length << 1 | 1, SO(m, u))
          a.push(i.facet(d));
        else {
          let g = d.combine(u.map((Q) => Q.value));
          a.push(i && d.compare(g, i.facet(d)) ? i.facet(d) : g);
        }
      else {
        for (let g of u)
          g.type == 0 ? (O[g.id] = a.length << 1 | 1, a.push(g.value)) : (O[g.id] = l.length << 1, l.push((Q) => g.dynamicSlot(Q)));
        O[d.id] = l.length << 1, l.push((g) => Zd(g, d, u));
      }
    }
    let c = l.map((f) => f(O));
    return new Zs(e, o, c, O, a, r);
  }
}
function vd(n, e, t) {
  let i = [[], [], [], [], []], s = /* @__PURE__ */ new Map();
  function r(o, O) {
    let a = s.get(o);
    if (a != null) {
      if (a <= O)
        return;
      let l = i[a].indexOf(o);
      l > -1 && i[a].splice(l, 1), o instanceof $o && t.delete(o.compartment);
    }
    if (s.set(o, O), Array.isArray(o))
      for (let l of o)
        r(l, O);
    else if (o instanceof $o) {
      if (t.has(o.compartment))
        throw new RangeError("Duplicate use of compartment in extensions");
      let l = e.get(o.compartment) || o.inner;
      t.set(o.compartment, l), r(l, O);
    } else if (o instanceof Mh)
      r(o.inner, o.prec);
    else if (o instanceof me)
      i[O].push(o), o.provides && r(o.provides, O);
    else if (o instanceof $s)
      i[O].push(o), o.facet.extensions && r(o.facet.extensions, Jt.default);
    else {
      let l = o.extension;
      if (!l)
        throw new Error(`Unrecognized extension value in extension set (${o}).`);
      if (l == o)
        throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
      r(l, O);
    }
  }
  return r(n, Jt.default), i.reduce((o, O) => o.concat(O));
}
function an(n, e) {
  if (e & 1)
    return 2;
  let t = e >> 1, i = n.status[t];
  if (i == 4)
    throw new Error("Cyclic dependency between fields and/or facets");
  if (i & 2)
    return i;
  n.status[t] = 4;
  let s = n.computeSlot(n, n.config.dynamicSlots[t]);
  return n.status[t] = 2 | s;
}
function vs(n, e) {
  return e & 1 ? n.config.staticValues[e >> 1] : n.values[e >> 1];
}
const Gh = /* @__PURE__ */ v.define(), Po = /* @__PURE__ */ v.define({
  combine: (n) => n.some((e) => e),
  static: !0
}), Lh = /* @__PURE__ */ v.define({
  combine: (n) => n.length ? n[0] : void 0,
  static: !0
}), Dh = /* @__PURE__ */ v.define(), Ih = /* @__PURE__ */ v.define(), Bh = /* @__PURE__ */ v.define(), Nh = /* @__PURE__ */ v.define({
  combine: (n) => n.length ? n[0] : !1
});
class vt {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  /**
  Define a new type of annotation.
  */
  static define() {
    return new Td();
  }
}
class Td {
  /**
  Create an instance of this annotation.
  */
  of(e) {
    return new vt(this, e);
  }
}
class Ud {
  /**
  @internal
  */
  constructor(e) {
    this.map = e;
  }
  /**
  Create a [state effect](https://codemirror.net/6/docs/ref/#state.StateEffect) instance of this
  type.
  */
  of(e) {
    return new q(this, e);
  }
}
class q {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  /**
  Map this effect through a position mapping. Will return
  `undefined` when that ends up deleting the effect.
  */
  map(e) {
    let t = this.type.map(this.value, e);
    return t === void 0 ? void 0 : t == this.value ? this : new q(this.type, t);
  }
  /**
  Tells you whether this effect object is of a given
  [type](https://codemirror.net/6/docs/ref/#state.StateEffectType).
  */
  is(e) {
    return this.type == e;
  }
  /**
  Define a new effect type. The type parameter indicates the type
  of values that his effect holds. It should be a type that
  doesn't include `undefined`, since that is used in
  [mapping](https://codemirror.net/6/docs/ref/#state.StateEffect.map) to indicate that an effect is
  removed.
  */
  static define(e = {}) {
    return new Ud(e.map || ((t) => t));
  }
  /**
  Map an array of effects through a change set.
  */
  static mapEffects(e, t) {
    if (!e.length)
      return e;
    let i = [];
    for (let s of e) {
      let r = s.map(t);
      r && i.push(r);
    }
    return i;
  }
}
q.reconfigure = /* @__PURE__ */ q.define();
q.appendConfig = /* @__PURE__ */ q.define();
class ne {
  constructor(e, t, i, s, r, o) {
    this.startState = e, this.changes = t, this.selection = i, this.effects = s, this.annotations = r, this.scrollIntoView = o, this._doc = null, this._state = null, i && Eh(i, t.newLength), r.some((O) => O.type == ne.time) || (this.annotations = r.concat(ne.time.of(Date.now())));
  }
  /**
  @internal
  */
  static create(e, t, i, s, r, o) {
    return new ne(e, t, i, s, r, o);
  }
  /**
  The new document produced by the transaction. Contrary to
  [`.state`](https://codemirror.net/6/docs/ref/#state.Transaction.state)`.doc`, accessing this won't
  force the entire new state to be computed right away, so it is
  recommended that [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) use this getter
  when they need to look at the new document.
  */
  get newDoc() {
    return this._doc || (this._doc = this.changes.apply(this.startState.doc));
  }
  /**
  The new selection produced by the transaction. If
  [`this.selection`](https://codemirror.net/6/docs/ref/#state.Transaction.selection) is undefined,
  this will [map](https://codemirror.net/6/docs/ref/#state.EditorSelection.map) the start state's
  current selection through the changes made by the transaction.
  */
  get newSelection() {
    return this.selection || this.startState.selection.map(this.changes);
  }
  /**
  The new state created by the transaction. Computed on demand
  (but retained for subsequent access), so it is recommended not to
  access it in [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) when possible.
  */
  get state() {
    return this._state || this.startState.applyTransaction(this), this._state;
  }
  /**
  Get the value of the given annotation type, if any.
  */
  annotation(e) {
    for (let t of this.annotations)
      if (t.type == e)
        return t.value;
  }
  /**
  Indicates whether the transaction changed the document.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Indicates whether this transaction reconfigures the state
  (through a [configuration compartment](https://codemirror.net/6/docs/ref/#state.Compartment) or
  with a top-level configuration
  [effect](https://codemirror.net/6/docs/ref/#state.StateEffect^reconfigure).
  */
  get reconfigured() {
    return this.startState.config != this.state.config;
  }
  /**
  Returns true if the transaction has a [user
  event](https://codemirror.net/6/docs/ref/#state.Transaction^userEvent) annotation that is equal to
  or more specific than `event`. For example, if the transaction
  has `"select.pointer"` as user event, `"select"` and
  `"select.pointer"` will match it.
  */
  isUserEvent(e) {
    let t = this.annotation(ne.userEvent);
    return !!(t && (t == e || t.length > e.length && t.slice(0, e.length) == e && t[e.length] == "."));
  }
}
ne.time = /* @__PURE__ */ vt.define();
ne.userEvent = /* @__PURE__ */ vt.define();
ne.addToHistory = /* @__PURE__ */ vt.define();
ne.remote = /* @__PURE__ */ vt.define();
function Yd(n, e) {
  let t = [];
  for (let i = 0, s = 0; ; ) {
    let r, o;
    if (i < n.length && (s == e.length || e[s] >= n[i]))
      r = n[i++], o = n[i++];
    else if (s < e.length)
      r = e[s++], o = e[s++];
    else
      return t;
    !t.length || t[t.length - 1] < r ? t.push(r, o) : t[t.length - 1] < o && (t[t.length - 1] = o);
  }
}
function Fh(n, e, t) {
  var i;
  let s, r, o;
  return t ? (s = e.changes, r = se.empty(e.changes.length), o = n.changes.compose(e.changes)) : (s = e.changes.map(n.changes), r = n.changes.mapDesc(e.changes, !0), o = n.changes.compose(s)), {
    changes: o,
    selection: e.selection ? e.selection.map(r) : (i = n.selection) === null || i === void 0 ? void 0 : i.map(s),
    effects: q.mapEffects(n.effects, s).concat(q.mapEffects(e.effects, r)),
    annotations: n.annotations.length ? n.annotations.concat(e.annotations) : e.annotations,
    scrollIntoView: n.scrollIntoView || e.scrollIntoView
  };
}
function So(n, e, t) {
  let i = e.selection, s = wi(e.annotations);
  return e.userEvent && (s = s.concat(ne.userEvent.of(e.userEvent))), {
    changes: e.changes instanceof se ? e.changes : se.of(e.changes || [], t, n.facet(Lh)),
    selection: i && (i instanceof $ ? i : $.single(i.anchor, i.head)),
    effects: wi(e.effects),
    annotations: s,
    scrollIntoView: !!e.scrollIntoView
  };
}
function Hh(n, e, t) {
  let i = So(n, e.length ? e[0] : {}, n.doc.length);
  e.length && e[0].filter === !1 && (t = !1);
  for (let r = 1; r < e.length; r++) {
    e[r].filter === !1 && (t = !1);
    let o = !!e[r].sequential;
    i = Fh(i, So(n, e[r], o ? i.changes.newLength : n.doc.length), o);
  }
  let s = ne.create(n, i.changes, i.selection, i.effects, i.annotations, i.scrollIntoView);
  return _d(t ? Rd(s) : s);
}
function Rd(n) {
  let e = n.startState, t = !0;
  for (let s of e.facet(Dh)) {
    let r = s(n);
    if (r === !1) {
      t = !1;
      break;
    }
    Array.isArray(r) && (t = t === !0 ? r : Yd(t, r));
  }
  if (t !== !0) {
    let s, r;
    if (t === !1)
      r = n.changes.invertedDesc, s = se.empty(e.doc.length);
    else {
      let o = n.changes.filter(t);
      s = o.changes, r = o.filtered.mapDesc(o.changes).invertedDesc;
    }
    n = ne.create(e, s, n.selection && n.selection.map(r), q.mapEffects(n.effects, r), n.annotations, n.scrollIntoView);
  }
  let i = e.facet(Ih);
  for (let s = i.length - 1; s >= 0; s--) {
    let r = i[s](n);
    r instanceof ne ? n = r : Array.isArray(r) && r.length == 1 && r[0] instanceof ne ? n = r[0] : n = Hh(e, wi(r), !1);
  }
  return n;
}
function _d(n) {
  let e = n.startState, t = e.facet(Bh), i = n;
  for (let s = t.length - 1; s >= 0; s--) {
    let r = t[s](n);
    r && Object.keys(r).length && (i = Fh(i, So(e, r, n.changes.newLength), !0));
  }
  return i == n ? n : ne.create(e, n.changes, n.selection, i.effects, i.annotations, i.scrollIntoView);
}
const qd = [];
function wi(n) {
  return n == null ? qd : Array.isArray(n) ? n : [n];
}
var F = /* @__PURE__ */ function(n) {
  return n[n.Word = 0] = "Word", n[n.Space = 1] = "Space", n[n.Other = 2] = "Other", n;
}(F || (F = {}));
const Vd = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
let xo;
try {
  xo = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch {
}
function zd(n) {
  if (xo)
    return xo.test(n);
  for (let e = 0; e < n.length; e++) {
    let t = n[e];
    if (/\w/.test(t) || t > "" && (t.toUpperCase() != t.toLowerCase() || Vd.test(t)))
      return !0;
  }
  return !1;
}
function Cd(n) {
  return (e) => {
    if (!/\S/.test(e))
      return F.Space;
    if (zd(e))
      return F.Word;
    for (let t = 0; t < n.length; t++)
      if (e.indexOf(n[t]) > -1)
        return F.Word;
    return F.Other;
  };
}
class A {
  constructor(e, t, i, s, r, o) {
    this.config = e, this.doc = t, this.selection = i, this.values = s, this.status = e.statusTemplate.slice(), this.computeSlot = r, o && (o._state = this);
    for (let O = 0; O < this.config.dynamicSlots.length; O++)
      an(this, O << 1);
    this.computeSlot = null;
  }
  field(e, t = !0) {
    let i = this.config.address[e.id];
    if (i == null) {
      if (t)
        throw new RangeError("Field is not present in this state");
      return;
    }
    return an(this, i), vs(this, i);
  }
  /**
  Create a [transaction](https://codemirror.net/6/docs/ref/#state.Transaction) that updates this
  state. Any number of [transaction specs](https://codemirror.net/6/docs/ref/#state.TransactionSpec)
  can be passed. Unless
  [`sequential`](https://codemirror.net/6/docs/ref/#state.TransactionSpec.sequential) is set, the
  [changes](https://codemirror.net/6/docs/ref/#state.TransactionSpec.changes) (if any) of each spec
  are assumed to start in the _current_ document (not the document
  produced by previous specs), and its
  [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection) and
  [effects](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) are assumed to refer
  to the document created by its _own_ changes. The resulting
  transaction contains the combined effect of all the different
  specs. For [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection), later
  specs take precedence over earlier ones.
  */
  update(...e) {
    return Hh(this, e, !0);
  }
  /**
  @internal
  */
  applyTransaction(e) {
    let t = this.config, { base: i, compartments: s } = t;
    for (let O of e.effects)
      O.is(Vn.reconfigure) ? (t && (s = /* @__PURE__ */ new Map(), t.compartments.forEach((a, l) => s.set(l, a)), t = null), s.set(O.value.compartment, O.value.extension)) : O.is(q.reconfigure) ? (t = null, i = O.value) : O.is(q.appendConfig) && (t = null, i = wi(i).concat(O.value));
    let r;
    t ? r = e.startState.values.slice() : (t = Zs.resolve(i, s, this), r = new A(t, this.doc, this.selection, t.dynamicSlots.map(() => null), (a, l) => l.reconfigure(a, this), null).values);
    let o = e.startState.facet(Po) ? e.newSelection : e.newSelection.asSingle();
    new A(t, e.newDoc, o, r, (O, a) => a.update(O, e), e);
  }
  /**
  Create a [transaction spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec) that
  replaces every selection range with the given content.
  */
  replaceSelection(e) {
    return typeof e == "string" && (e = this.toText(e)), this.changeByRange((t) => ({
      changes: { from: t.from, to: t.to, insert: e },
      range: $.cursor(t.from + e.length)
    }));
  }
  /**
  Create a set of changes and a new selection by running the given
  function for each range in the active selection. The function
  can return an optional set of changes (in the coordinate space
  of the start document), plus an updated range (in the coordinate
  space of the document produced by the call's own changes). This
  method will merge all the changes and ranges into a single
  changeset and selection, and return it as a [transaction
  spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec), which can be passed to
  [`update`](https://codemirror.net/6/docs/ref/#state.EditorState.update).
  */
  changeByRange(e) {
    let t = this.selection, i = e(t.ranges[0]), s = this.changes(i.changes), r = [i.range], o = wi(i.effects);
    for (let O = 1; O < t.ranges.length; O++) {
      let a = e(t.ranges[O]), l = this.changes(a.changes), h = l.map(s);
      for (let f = 0; f < O; f++)
        r[f] = r[f].map(h);
      let c = s.mapDesc(l, !0);
      r.push(a.range.map(c)), s = s.compose(h), o = q.mapEffects(o, h).concat(q.mapEffects(wi(a.effects), c));
    }
    return {
      changes: s,
      selection: $.create(r, t.mainIndex),
      effects: o
    };
  }
  /**
  Create a [change set](https://codemirror.net/6/docs/ref/#state.ChangeSet) from the given change
  description, taking the state's document length and line
  separator into account.
  */
  changes(e = []) {
    return e instanceof se ? e : se.of(e, this.doc.length, this.facet(A.lineSeparator));
  }
  /**
  Using the state's [line
  separator](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator), create a
  [`Text`](https://codemirror.net/6/docs/ref/#state.Text) instance from the given string.
  */
  toText(e) {
    return j.of(e.split(this.facet(A.lineSeparator) || po));
  }
  /**
  Return the given range of the document as a string.
  */
  sliceDoc(e = 0, t = this.doc.length) {
    return this.doc.sliceString(e, t, this.lineBreak);
  }
  /**
  Get the value of a state [facet](https://codemirror.net/6/docs/ref/#state.Facet).
  */
  facet(e) {
    let t = this.config.address[e.id];
    return t == null ? e.default : (an(this, t), vs(this, t));
  }
  /**
  Convert this state to a JSON-serializable object. When custom
  fields should be serialized, you can pass them in as an object
  mapping property names (in the resulting object, which should
  not use `doc` or `selection`) to fields.
  */
  toJSON(e) {
    let t = {
      doc: this.sliceDoc(),
      selection: this.selection.toJSON()
    };
    if (e)
      for (let i in e) {
        let s = e[i];
        s instanceof me && this.config.address[s.id] != null && (t[i] = s.spec.toJSON(this.field(e[i]), this));
      }
    return t;
  }
  /**
  Deserialize a state from its JSON representation. When custom
  fields should be deserialized, pass the same object you passed
  to [`toJSON`](https://codemirror.net/6/docs/ref/#state.EditorState.toJSON) when serializing as
  third argument.
  */
  static fromJSON(e, t = {}, i) {
    if (!e || typeof e.doc != "string")
      throw new RangeError("Invalid JSON representation for EditorState");
    let s = [];
    if (i) {
      for (let r in i)
        if (Object.prototype.hasOwnProperty.call(e, r)) {
          let o = i[r], O = e[r];
          s.push(o.init((a) => o.spec.fromJSON(O, a)));
        }
    }
    return A.create({
      doc: e.doc,
      selection: $.fromJSON(e.selection),
      extensions: t.extensions ? s.concat([t.extensions]) : s
    });
  }
  /**
  Create a new state. You'll usually only need this when
  initializing an editor—updated states are created by applying
  transactions.
  */
  static create(e = {}) {
    let t = Zs.resolve(e.extensions || [], /* @__PURE__ */ new Map()), i = e.doc instanceof j ? e.doc : j.of((e.doc || "").split(t.staticFacet(A.lineSeparator) || po)), s = e.selection ? e.selection instanceof $ ? e.selection : $.single(e.selection.anchor, e.selection.head) : $.single(0);
    return Eh(s, i.length), t.staticFacet(Po) || (s = s.asSingle()), new A(t, i, s, t.dynamicSlots.map(() => null), (r, o) => o.create(r), null);
  }
  /**
  The size (in columns) of a tab in the document, determined by
  the [`tabSize`](https://codemirror.net/6/docs/ref/#state.EditorState^tabSize) facet.
  */
  get tabSize() {
    return this.facet(A.tabSize);
  }
  /**
  Get the proper [line-break](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator)
  string for this state.
  */
  get lineBreak() {
    return this.facet(A.lineSeparator) || `
`;
  }
  /**
  Returns true when the editor is
  [configured](https://codemirror.net/6/docs/ref/#state.EditorState^readOnly) to be read-only.
  */
  get readOnly() {
    return this.facet(Nh);
  }
  /**
  Look up a translation for the given phrase (via the
  [`phrases`](https://codemirror.net/6/docs/ref/#state.EditorState^phrases) facet), or return the
  original string if no translation is found.
  
  If additional arguments are passed, they will be inserted in
  place of markers like `$1` (for the first value) and `$2`, etc.
  A single `$` is equivalent to `$1`, and `$$` will produce a
  literal dollar sign.
  */
  phrase(e, ...t) {
    for (let i of this.facet(A.phrases))
      if (Object.prototype.hasOwnProperty.call(i, e)) {
        e = i[e];
        break;
      }
    return t.length && (e = e.replace(/\$(\$|\d*)/g, (i, s) => {
      if (s == "$")
        return "$";
      let r = +(s || 1);
      return !r || r > t.length ? i : t[r - 1];
    })), e;
  }
  /**
  Find the values for a given language data field, provided by the
  the [`languageData`](https://codemirror.net/6/docs/ref/#state.EditorState^languageData) facet.
  
  Examples of language data fields are...
  
  - [`"commentTokens"`](https://codemirror.net/6/docs/ref/#commands.CommentTokens) for specifying
    comment syntax.
  - [`"autocomplete"`](https://codemirror.net/6/docs/ref/#autocomplete.autocompletion^config.override)
    for providing language-specific completion sources.
  - [`"wordChars"`](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) for adding
    characters that should be considered part of words in this
    language.
  - [`"closeBrackets"`](https://codemirror.net/6/docs/ref/#autocomplete.CloseBracketConfig) controls
    bracket closing behavior.
  */
  languageDataAt(e, t, i = -1) {
    let s = [];
    for (let r of this.facet(Gh))
      for (let o of r(this, t, i))
        Object.prototype.hasOwnProperty.call(o, e) && s.push(o[e]);
    return s;
  }
  /**
  Return a function that can categorize strings (expected to
  represent a single [grapheme cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak))
  into one of:
  
   - Word (contains an alphanumeric character or a character
     explicitly listed in the local language's `"wordChars"`
     language data, which should be a string)
   - Space (contains only whitespace)
   - Other (anything else)
  */
  charCategorizer(e) {
    let t = this.languageDataAt("wordChars", e);
    return Cd(t.length ? t[0] : "");
  }
  /**
  Find the word at the given position, meaning the range
  containing all [word](https://codemirror.net/6/docs/ref/#state.CharCategory.Word) characters
  around it. If no word characters are adjacent to the position,
  this returns null.
  */
  wordAt(e) {
    let { text: t, from: i, length: s } = this.doc.lineAt(e), r = this.charCategorizer(e), o = e - i, O = e - i;
    for (; o > 0; ) {
      let a = le(t, o, !1);
      if (r(t.slice(a, o)) != F.Word)
        break;
      o = a;
    }
    for (; O < s; ) {
      let a = le(t, O);
      if (r(t.slice(O, a)) != F.Word)
        break;
      O = a;
    }
    return o == O ? null : $.range(o + i, O + i);
  }
}
A.allowMultipleSelections = Po;
A.tabSize = /* @__PURE__ */ v.define({
  combine: (n) => n.length ? n[0] : 4
});
A.lineSeparator = Lh;
A.readOnly = Nh;
A.phrases = /* @__PURE__ */ v.define({
  compare(n, e) {
    let t = Object.keys(n), i = Object.keys(e);
    return t.length == i.length && t.every((s) => n[s] == e[s]);
  }
});
A.languageData = Gh;
A.changeFilter = Dh;
A.transactionFilter = Ih;
A.transactionExtender = Bh;
Vn.reconfigure = /* @__PURE__ */ q.define();
function $t(n, e, t = {}) {
  let i = {};
  for (let s of n)
    for (let r of Object.keys(s)) {
      let o = s[r], O = i[r];
      if (O === void 0)
        i[r] = o;
      else if (!(O === o || o === void 0)) if (Object.hasOwnProperty.call(t, r))
        i[r] = t[r](O, o);
      else
        throw new Error("Config merge conflict for field " + r);
    }
  for (let s in e)
    i[s] === void 0 && (i[s] = e[s]);
  return i;
}
class jt {
  /**
  Compare this value with another value. Used when comparing
  rangesets. The default implementation compares by identity.
  Unless you are only creating a fixed number of unique instances
  of your value type, it is a good idea to implement this
  properly.
  */
  eq(e) {
    return this == e;
  }
  /**
  Create a [range](https://codemirror.net/6/docs/ref/#state.Range) with this value.
  */
  range(e, t = e) {
    return Xo.create(e, t, this);
  }
}
jt.prototype.startSide = jt.prototype.endSide = 0;
jt.prototype.point = !1;
jt.prototype.mapMode = de.TrackDel;
function xO(n, e) {
  return n == e || n.constructor == e.constructor && n.eq(e);
}
let Xo = class Kh {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.value = i;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new Kh(e, t, i);
  }
};
function bo(n, e) {
  return n.from - e.from || n.value.startSide - e.value.startSide;
}
class XO {
  constructor(e, t, i, s) {
    this.from = e, this.to = t, this.value = i, this.maxPoint = s;
  }
  get length() {
    return this.to[this.to.length - 1];
  }
  // Find the index of the given position and side. Use the ranges'
  // `from` pos when `end == false`, `to` when `end == true`.
  findIndex(e, t, i, s = 0) {
    let r = i ? this.to : this.from;
    for (let o = s, O = r.length; ; ) {
      if (o == O)
        return o;
      let a = o + O >> 1, l = r[a] - e || (i ? this.value[a].endSide : this.value[a].startSide) - t;
      if (a == o)
        return l >= 0 ? o : O;
      l >= 0 ? O = a : o = a + 1;
    }
  }
  between(e, t, i, s) {
    for (let r = this.findIndex(t, -1e9, !0), o = this.findIndex(i, 1e9, !1, r); r < o; r++)
      if (s(this.from[r] + e, this.to[r] + e, this.value[r]) === !1)
        return !1;
  }
  map(e, t) {
    let i = [], s = [], r = [], o = -1, O = -1;
    for (let a = 0; a < this.value.length; a++) {
      let l = this.value[a], h = this.from[a] + e, c = this.to[a] + e, f, u;
      if (h == c) {
        let d = t.mapPos(h, l.startSide, l.mapMode);
        if (d == null || (f = u = d, l.startSide != l.endSide && (u = t.mapPos(h, l.endSide), u < f)))
          continue;
      } else if (f = t.mapPos(h, l.startSide), u = t.mapPos(c, l.endSide), f > u || f == u && l.startSide > 0 && l.endSide <= 0)
        continue;
      (u - f || l.endSide - l.startSide) < 0 || (o < 0 && (o = f), l.point && (O = Math.max(O, u - f)), i.push(l), s.push(f - o), r.push(u - o));
    }
    return { mapped: i.length ? new XO(s, r, i, O) : null, pos: o };
  }
}
class C {
  constructor(e, t, i, s) {
    this.chunkPos = e, this.chunk = t, this.nextLayer = i, this.maxPoint = s;
  }
  /**
  @internal
  */
  static create(e, t, i, s) {
    return new C(e, t, i, s);
  }
  /**
  @internal
  */
  get length() {
    let e = this.chunk.length - 1;
    return e < 0 ? 0 : Math.max(this.chunkEnd(e), this.nextLayer.length);
  }
  /**
  The number of ranges in the set.
  */
  get size() {
    if (this.isEmpty)
      return 0;
    let e = this.nextLayer.size;
    for (let t of this.chunk)
      e += t.value.length;
    return e;
  }
  /**
  @internal
  */
  chunkEnd(e) {
    return this.chunkPos[e] + this.chunk[e].length;
  }
  /**
  Update the range set, optionally adding new ranges or filtering
  out existing ones.
  
  (Note: The type parameter is just there as a kludge to work
  around TypeScript variance issues that prevented `RangeSet<X>`
  from being a subtype of `RangeSet<Y>` when `X` is a subtype of
  `Y`.)
  */
  update(e) {
    let { add: t = [], sort: i = !1, filterFrom: s = 0, filterTo: r = this.length } = e, o = e.filter;
    if (t.length == 0 && !o)
      return this;
    if (i && (t = t.slice().sort(bo)), this.isEmpty)
      return t.length ? C.of(t) : this;
    let O = new Jh(this, null, -1).goto(0), a = 0, l = [], h = new wt();
    for (; O.value || a < t.length; )
      if (a < t.length && (O.from - t[a].from || O.startSide - t[a].value.startSide) >= 0) {
        let c = t[a++];
        h.addInner(c.from, c.to, c.value) || l.push(c);
      } else O.rangeIndex == 1 && O.chunkIndex < this.chunk.length && (a == t.length || this.chunkEnd(O.chunkIndex) < t[a].from) && (!o || s > this.chunkEnd(O.chunkIndex) || r < this.chunkPos[O.chunkIndex]) && h.addChunk(this.chunkPos[O.chunkIndex], this.chunk[O.chunkIndex]) ? O.nextChunk() : ((!o || s > O.to || r < O.from || o(O.from, O.to, O.value)) && (h.addInner(O.from, O.to, O.value) || l.push(Xo.create(O.from, O.to, O.value))), O.next());
    return h.finishInner(this.nextLayer.isEmpty && !l.length ? C.empty : this.nextLayer.update({ add: l, filter: o, filterFrom: s, filterTo: r }));
  }
  /**
  Map this range set through a set of changes, return the new set.
  */
  map(e) {
    if (e.empty || this.isEmpty)
      return this;
    let t = [], i = [], s = -1;
    for (let o = 0; o < this.chunk.length; o++) {
      let O = this.chunkPos[o], a = this.chunk[o], l = e.touchesRange(O, O + a.length);
      if (l === !1)
        s = Math.max(s, a.maxPoint), t.push(a), i.push(e.mapPos(O));
      else if (l === !0) {
        let { mapped: h, pos: c } = a.map(O, e);
        h && (s = Math.max(s, h.maxPoint), t.push(h), i.push(c));
      }
    }
    let r = this.nextLayer.map(e);
    return t.length == 0 ? r : new C(i, t, r || C.empty, s);
  }
  /**
  Iterate over the ranges that touch the region `from` to `to`,
  calling `f` for each. There is no guarantee that the ranges will
  be reported in any specific order. When the callback returns
  `false`, iteration stops.
  */
  between(e, t, i) {
    if (!this.isEmpty) {
      for (let s = 0; s < this.chunk.length; s++) {
        let r = this.chunkPos[s], o = this.chunk[s];
        if (t >= r && e <= r + o.length && o.between(r, e - r, t - r, i) === !1)
          return;
      }
      this.nextLayer.between(e, t, i);
    }
  }
  /**
  Iterate over the ranges in this set, in order, including all
  ranges that end at or after `from`.
  */
  iter(e = 0) {
    return gn.from([this]).goto(e);
  }
  /**
  @internal
  */
  get isEmpty() {
    return this.nextLayer == this;
  }
  /**
  Iterate over the ranges in a collection of sets, in order,
  starting from `from`.
  */
  static iter(e, t = 0) {
    return gn.from(e).goto(t);
  }
  /**
  Iterate over two groups of sets, calling methods on `comparator`
  to notify it of possible differences.
  */
  static compare(e, t, i, s, r = -1) {
    let o = e.filter((c) => c.maxPoint > 0 || !c.isEmpty && c.maxPoint >= r), O = t.filter((c) => c.maxPoint > 0 || !c.isEmpty && c.maxPoint >= r), a = Za(o, O, i), l = new Hi(o, a, r), h = new Hi(O, a, r);
    i.iterGaps((c, f, u) => va(l, c, h, f, u, s)), i.empty && i.length == 0 && va(l, 0, h, 0, 0, s);
  }
  /**
  Compare the contents of two groups of range sets, returning true
  if they are equivalent in the given range.
  */
  static eq(e, t, i = 0, s) {
    s == null && (s = 999999999);
    let r = e.filter((h) => !h.isEmpty && t.indexOf(h) < 0), o = t.filter((h) => !h.isEmpty && e.indexOf(h) < 0);
    if (r.length != o.length)
      return !1;
    if (!r.length)
      return !0;
    let O = Za(r, o), a = new Hi(r, O, 0).goto(i), l = new Hi(o, O, 0).goto(i);
    for (; ; ) {
      if (a.to != l.to || !yo(a.active, l.active) || a.point && (!l.point || !xO(a.point, l.point)))
        return !1;
      if (a.to > s)
        return !0;
      a.next(), l.next();
    }
  }
  /**
  Iterate over a group of range sets at the same time, notifying
  the iterator about the ranges covering every given piece of
  content. Returns the open count (see
  [`SpanIterator.span`](https://codemirror.net/6/docs/ref/#state.SpanIterator.span)) at the end
  of the iteration.
  */
  static spans(e, t, i, s, r = -1) {
    let o = new Hi(e, null, r).goto(t), O = t, a = o.openStart;
    for (; ; ) {
      let l = Math.min(o.to, i);
      if (o.point) {
        let h = o.activeForPoint(o.to), c = o.pointFrom < t ? h.length + 1 : o.point.startSide < 0 ? h.length : Math.min(h.length, a);
        s.point(O, l, o.point, h, c, o.pointRank), a = Math.min(o.openEnd(l), h.length);
      } else l > O && (s.span(O, l, o.active, a), a = o.openEnd(l));
      if (o.to > i)
        return a + (o.point && o.to > i ? 1 : 0);
      O = o.to, o.next();
    }
  }
  /**
  Create a range set for the given range or array of ranges. By
  default, this expects the ranges to be _sorted_ (by start
  position and, if two start at the same position,
  `value.startSide`). You can pass `true` as second argument to
  cause the method to sort them.
  */
  static of(e, t = !1) {
    let i = new wt();
    for (let s of e instanceof Xo ? [e] : t ? Wd(e) : e)
      i.add(s.from, s.to, s.value);
    return i.finish();
  }
  /**
  Join an array of range sets into a single set.
  */
  static join(e) {
    if (!e.length)
      return C.empty;
    let t = e[e.length - 1];
    for (let i = e.length - 2; i >= 0; i--)
      for (let s = e[i]; s != C.empty; s = s.nextLayer)
        t = new C(s.chunkPos, s.chunk, t, Math.max(s.maxPoint, t.maxPoint));
    return t;
  }
}
C.empty = /* @__PURE__ */ new C([], [], null, -1);
function Wd(n) {
  if (n.length > 1)
    for (let e = n[0], t = 1; t < n.length; t++) {
      let i = n[t];
      if (bo(e, i) > 0)
        return n.slice().sort(bo);
      e = i;
    }
  return n;
}
C.empty.nextLayer = C.empty;
class wt {
  finishChunk(e) {
    this.chunks.push(new XO(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, e && (this.from = [], this.to = [], this.value = []);
  }
  /**
  Create an empty builder.
  */
  constructor() {
    this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null;
  }
  /**
  Add a range. Ranges should be added in sorted (by `from` and
  `value.startSide`) order.
  */
  add(e, t, i) {
    this.addInner(e, t, i) || (this.nextLayer || (this.nextLayer = new wt())).add(e, t, i);
  }
  /**
  @internal
  */
  addInner(e, t, i) {
    let s = e - this.lastTo || i.startSide - this.last.endSide;
    if (s <= 0 && (e - this.lastFrom || i.startSide - this.last.startSide) < 0)
      throw new Error("Ranges must be added sorted by `from` position and `startSide`");
    return s < 0 ? !1 : (this.from.length == 250 && this.finishChunk(!0), this.chunkStart < 0 && (this.chunkStart = e), this.from.push(e - this.chunkStart), this.to.push(t - this.chunkStart), this.last = i, this.lastFrom = e, this.lastTo = t, this.value.push(i), i.point && (this.maxPoint = Math.max(this.maxPoint, t - e)), !0);
  }
  /**
  @internal
  */
  addChunk(e, t) {
    if ((e - this.lastTo || t.value[0].startSide - this.last.endSide) < 0)
      return !1;
    this.from.length && this.finishChunk(!0), this.setMaxPoint = Math.max(this.setMaxPoint, t.maxPoint), this.chunks.push(t), this.chunkPos.push(e);
    let i = t.value.length - 1;
    return this.last = t.value[i], this.lastFrom = t.from[i] + e, this.lastTo = t.to[i] + e, !0;
  }
  /**
  Finish the range set. Returns the new set. The builder can't be
  used anymore after this has been called.
  */
  finish() {
    return this.finishInner(C.empty);
  }
  /**
  @internal
  */
  finishInner(e) {
    if (this.from.length && this.finishChunk(!1), this.chunks.length == 0)
      return e;
    let t = C.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(e) : e, this.setMaxPoint);
    return this.from = null, t;
  }
}
function Za(n, e, t) {
  let i = /* @__PURE__ */ new Map();
  for (let r of n)
    for (let o = 0; o < r.chunk.length; o++)
      r.chunk[o].maxPoint <= 0 && i.set(r.chunk[o], r.chunkPos[o]);
  let s = /* @__PURE__ */ new Set();
  for (let r of e)
    for (let o = 0; o < r.chunk.length; o++) {
      let O = i.get(r.chunk[o]);
      O != null && (t ? t.mapPos(O) : O) == r.chunkPos[o] && !(t != null && t.touchesRange(O, O + r.chunk[o].length)) && s.add(r.chunk[o]);
    }
  return s;
}
class Jh {
  constructor(e, t, i, s = 0) {
    this.layer = e, this.skip = t, this.minPoint = i, this.rank = s;
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  get endSide() {
    return this.value ? this.value.endSide : 0;
  }
  goto(e, t = -1e9) {
    return this.chunkIndex = this.rangeIndex = 0, this.gotoInner(e, t, !1), this;
  }
  gotoInner(e, t, i) {
    for (; this.chunkIndex < this.layer.chunk.length; ) {
      let s = this.layer.chunk[this.chunkIndex];
      if (!(this.skip && this.skip.has(s) || this.layer.chunkEnd(this.chunkIndex) < e || s.maxPoint < this.minPoint))
        break;
      this.chunkIndex++, i = !1;
    }
    if (this.chunkIndex < this.layer.chunk.length) {
      let s = this.layer.chunk[this.chunkIndex].findIndex(e - this.layer.chunkPos[this.chunkIndex], t, !0);
      (!i || this.rangeIndex < s) && this.setRangeIndex(s);
    }
    this.next();
  }
  forward(e, t) {
    (this.to - e || this.endSide - t) < 0 && this.gotoInner(e, t, !0);
  }
  next() {
    for (; ; )
      if (this.chunkIndex == this.layer.chunk.length) {
        this.from = this.to = 1e9, this.value = null;
        break;
      } else {
        let e = this.layer.chunkPos[this.chunkIndex], t = this.layer.chunk[this.chunkIndex], i = e + t.from[this.rangeIndex];
        if (this.from = i, this.to = e + t.to[this.rangeIndex], this.value = t.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint)
          break;
      }
  }
  setRangeIndex(e) {
    if (e == this.layer.chunk[this.chunkIndex].value.length) {
      if (this.chunkIndex++, this.skip)
        for (; this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]); )
          this.chunkIndex++;
      this.rangeIndex = 0;
    } else
      this.rangeIndex = e;
  }
  nextChunk() {
    this.chunkIndex++, this.rangeIndex = 0, this.next();
  }
  compare(e) {
    return this.from - e.from || this.startSide - e.startSide || this.rank - e.rank || this.to - e.to || this.endSide - e.endSide;
  }
}
class gn {
  constructor(e) {
    this.heap = e;
  }
  static from(e, t = null, i = -1) {
    let s = [];
    for (let r = 0; r < e.length; r++)
      for (let o = e[r]; !o.isEmpty; o = o.nextLayer)
        o.maxPoint >= i && s.push(new Jh(o, t, i, r));
    return s.length == 1 ? s[0] : new gn(s);
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  goto(e, t = -1e9) {
    for (let i of this.heap)
      i.goto(e, t);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      Ur(this.heap, i);
    return this.next(), this;
  }
  forward(e, t) {
    for (let i of this.heap)
      i.forward(e, t);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      Ur(this.heap, i);
    (this.to - e || this.value.endSide - t) < 0 && this.next();
  }
  next() {
    if (this.heap.length == 0)
      this.from = this.to = 1e9, this.value = null, this.rank = -1;
    else {
      let e = this.heap[0];
      this.from = e.from, this.to = e.to, this.value = e.value, this.rank = e.rank, e.value && e.next(), Ur(this.heap, 0);
    }
  }
}
function Ur(n, e) {
  for (let t = n[e]; ; ) {
    let i = (e << 1) + 1;
    if (i >= n.length)
      break;
    let s = n[i];
    if (i + 1 < n.length && s.compare(n[i + 1]) >= 0 && (s = n[i + 1], i++), t.compare(s) < 0)
      break;
    n[i] = t, n[e] = s, e = i;
  }
}
class Hi {
  constructor(e, t, i) {
    this.minPoint = i, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = gn.from(e, t, i);
  }
  goto(e, t = -1e9) {
    return this.cursor.goto(e, t), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = e, this.endSide = t, this.openStart = -1, this.next(), this;
  }
  forward(e, t) {
    for (; this.minActive > -1 && (this.activeTo[this.minActive] - e || this.active[this.minActive].endSide - t) < 0; )
      this.removeActive(this.minActive);
    this.cursor.forward(e, t);
  }
  removeActive(e) {
    Bn(this.active, e), Bn(this.activeTo, e), Bn(this.activeRank, e), this.minActive = Ta(this.active, this.activeTo);
  }
  addActive(e) {
    let t = 0, { value: i, to: s, rank: r } = this.cursor;
    for (; t < this.activeRank.length && (r - this.activeRank[t] || s - this.activeTo[t]) > 0; )
      t++;
    Nn(this.active, t, i), Nn(this.activeTo, t, s), Nn(this.activeRank, t, r), e && Nn(e, t, this.cursor.from), this.minActive = Ta(this.active, this.activeTo);
  }
  // After calling this, if `this.point` != null, the next range is a
  // point. Otherwise, it's a regular range, covered by `this.active`.
  next() {
    let e = this.to, t = this.point;
    this.point = null;
    let i = this.openStart < 0 ? [] : null;
    for (; ; ) {
      let s = this.minActive;
      if (s > -1 && (this.activeTo[s] - this.cursor.from || this.active[s].endSide - this.cursor.startSide) < 0) {
        if (this.activeTo[s] > e) {
          this.to = this.activeTo[s], this.endSide = this.active[s].endSide;
          break;
        }
        this.removeActive(s), i && Bn(i, s);
      } else if (this.cursor.value)
        if (this.cursor.from > e) {
          this.to = this.cursor.from, this.endSide = this.cursor.startSide;
          break;
        } else {
          let r = this.cursor.value;
          if (!r.point)
            this.addActive(i), this.cursor.next();
          else if (t && this.cursor.to == this.to && this.cursor.from < this.cursor.to)
            this.cursor.next();
          else {
            this.point = r, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = r.endSide, this.cursor.next(), this.forward(this.to, this.endSide);
            break;
          }
        }
      else {
        this.to = this.endSide = 1e9;
        break;
      }
    }
    if (i) {
      this.openStart = 0;
      for (let s = i.length - 1; s >= 0 && i[s] < e; s--)
        this.openStart++;
    }
  }
  activeForPoint(e) {
    if (!this.active.length)
      return this.active;
    let t = [];
    for (let i = this.active.length - 1; i >= 0 && !(this.activeRank[i] < this.pointRank); i--)
      (this.activeTo[i] > e || this.activeTo[i] == e && this.active[i].endSide >= this.point.endSide) && t.push(this.active[i]);
    return t.reverse();
  }
  openEnd(e) {
    let t = 0;
    for (let i = this.activeTo.length - 1; i >= 0 && this.activeTo[i] > e; i--)
      t++;
    return t;
  }
}
function va(n, e, t, i, s, r) {
  n.goto(e), t.goto(i);
  let o = i + s, O = i, a = i - e, l = !!r.boundChange;
  for (let h = !1; ; ) {
    let c = n.to + a - t.to, f = c || n.endSide - t.endSide, u = f < 0 ? n.to + a : t.to, d = Math.min(u, o);
    if (n.point || t.point ? (n.point && t.point && xO(n.point, t.point) && yo(n.activeForPoint(n.to), t.activeForPoint(t.to)) || r.comparePoint(O, d, n.point, t.point), h = !1) : (h && r.boundChange(O), d > O && !yo(n.active, t.active) && r.compareRange(O, d, n.active, t.active), l && d < o && (c || n.openEnd(u) != t.openEnd(u)) && (h = !0)), u > o)
      break;
    O = u, f <= 0 && n.next(), f >= 0 && t.next();
  }
}
function yo(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (n[t] != e[t] && !xO(n[t], e[t]))
      return !1;
  return !0;
}
function Bn(n, e) {
  for (let t = e, i = n.length - 1; t < i; t++)
    n[t] = n[t + 1];
  n.pop();
}
function Nn(n, e, t) {
  for (let i = n.length - 1; i >= e; i--)
    n[i + 1] = n[i];
  n[e] = t;
}
function Ta(n, e) {
  let t = -1, i = 1e9;
  for (let s = 0; s < e.length; s++)
    (e[s] - i || n[s].endSide - n[t].endSide) < 0 && (t = s, i = e[s]);
  return t;
}
function Di(n, e, t = n.length) {
  let i = 0;
  for (let s = 0; s < t && s < n.length; )
    n.charCodeAt(s) == 9 ? (i += e - i % e, s++) : (i++, s = le(n, s));
  return i;
}
function wo(n, e, t, i) {
  for (let s = 0, r = 0; ; ) {
    if (r >= e)
      return s;
    if (s == n.length)
      break;
    r += n.charCodeAt(s) == 9 ? t - r % t : 1, s = le(n, s);
  }
  return i === !0 ? -1 : n.length;
}
const ko = "ͼ", Ua = typeof Symbol > "u" ? "__" + ko : Symbol.for(ko), Zo = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"), Ya = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {};
class At {
  // :: (Object<Style>, ?{finish: ?(string) → string})
  // Create a style module from the given spec.
  //
  // When `finish` is given, it is called on regular (non-`@`)
  // selectors (after `&` expansion) to compute the final selector.
  constructor(e, t) {
    this.rules = [];
    let { finish: i } = t || {};
    function s(o) {
      return /^@/.test(o) ? [o] : o.split(/,\s*/);
    }
    function r(o, O, a, l) {
      let h = [], c = /^@(\w+)\b/.exec(o[0]), f = c && c[1] == "keyframes";
      if (c && O == null) return a.push(o[0] + ";");
      for (let u in O) {
        let d = O[u];
        if (/&/.test(u))
          r(
            u.split(/,\s*/).map((m) => o.map((g) => m.replace(/&/, g))).reduce((m, g) => m.concat(g)),
            d,
            a
          );
        else if (d && typeof d == "object") {
          if (!c) throw new RangeError("The value of a property (" + u + ") should be a primitive value.");
          r(s(u), d, h, f);
        } else d != null && h.push(u.replace(/_.*/, "").replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()) + ": " + d + ";");
      }
      (h.length || f) && a.push((i && !c && !l ? o.map(i) : o).join(", ") + " {" + h.join(" ") + "}");
    }
    for (let o in e) r(s(o), e[o], this.rules);
  }
  // :: () → string
  // Returns a string containing the module's CSS rules.
  getRules() {
    return this.rules.join(`
`);
  }
  // :: () → string
  // Generate a new unique CSS class name.
  static newName() {
    let e = Ya[Ua] || 1;
    return Ya[Ua] = e + 1, ko + e.toString(36);
  }
  // :: (union<Document, ShadowRoot>, union<[StyleModule], StyleModule>, ?{nonce: ?string})
  //
  // Mount the given set of modules in the given DOM root, which ensures
  // that the CSS rules defined by the module are available in that
  // context.
  //
  // Rules are only added to the document once per root.
  //
  // Rule order will follow the order of the modules, so that rules from
  // modules later in the array take precedence of those from earlier
  // modules. If you call this function multiple times for the same root
  // in a way that changes the order of already mounted modules, the old
  // order will be changed.
  //
  // If a Content Security Policy nonce is provided, it is added to
  // the `<style>` tag generated by the library.
  static mount(e, t, i) {
    let s = e[Zo], r = i && i.nonce;
    s ? r && s.setNonce(r) : s = new jd(e, r), s.mount(Array.isArray(t) ? t : [t], e);
  }
}
let Ra = /* @__PURE__ */ new Map();
class jd {
  constructor(e, t) {
    let i = e.ownerDocument || e, s = i.defaultView;
    if (!e.head && e.adoptedStyleSheets && s.CSSStyleSheet) {
      let r = Ra.get(i);
      if (r) return e[Zo] = r;
      this.sheet = new s.CSSStyleSheet(), Ra.set(i, this);
    } else
      this.styleTag = i.createElement("style"), t && this.styleTag.setAttribute("nonce", t);
    this.modules = [], e[Zo] = this;
  }
  mount(e, t) {
    let i = this.sheet, s = 0, r = 0;
    for (let o = 0; o < e.length; o++) {
      let O = e[o], a = this.modules.indexOf(O);
      if (a < r && a > -1 && (this.modules.splice(a, 1), r--, a = -1), a == -1) {
        if (this.modules.splice(r++, 0, O), i) for (let l = 0; l < O.rules.length; l++)
          i.insertRule(O.rules[l], s++);
      } else {
        for (; r < a; ) s += this.modules[r++].rules.length;
        s += O.rules.length, r++;
      }
    }
    if (i)
      t.adoptedStyleSheets.indexOf(this.sheet) < 0 && (t.adoptedStyleSheets = [this.sheet, ...t.adoptedStyleSheets]);
    else {
      let o = "";
      for (let a = 0; a < this.modules.length; a++)
        o += this.modules[a].getRules() + `
`;
      this.styleTag.textContent = o;
      let O = t.head || t;
      this.styleTag.parentNode != O && O.insertBefore(this.styleTag, O.firstChild);
    }
  }
  setNonce(e) {
    this.styleTag && this.styleTag.getAttribute("nonce") != e && this.styleTag.setAttribute("nonce", e);
  }
}
var Et = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, Qn = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, Ad = typeof navigator < "u" && /Mac/.test(navigator.platform), Ed = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var ue = 0; ue < 10; ue++) Et[48 + ue] = Et[96 + ue] = String(ue);
for (var ue = 1; ue <= 24; ue++) Et[ue + 111] = "F" + ue;
for (var ue = 65; ue <= 90; ue++)
  Et[ue] = String.fromCharCode(ue + 32), Qn[ue] = String.fromCharCode(ue);
for (var Yr in Et) Qn.hasOwnProperty(Yr) || (Qn[Yr] = Et[Yr]);
function Md(n) {
  var e = Ad && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || Ed && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? Qn : Et)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
function G() {
  var n = arguments[0];
  typeof n == "string" && (n = document.createElement(n));
  var e = 1, t = arguments[1];
  if (t && typeof t == "object" && t.nodeType == null && !Array.isArray(t)) {
    for (var i in t) if (Object.prototype.hasOwnProperty.call(t, i)) {
      var s = t[i];
      typeof s == "string" ? n.setAttribute(i, s) : s != null && (n[i] = s);
    }
    e++;
  }
  for (; e < arguments.length; e++) ec(n, arguments[e]);
  return n;
}
function ec(n, e) {
  if (typeof e == "string")
    n.appendChild(document.createTextNode(e));
  else if (e != null) if (e.nodeType != null)
    n.appendChild(e);
  else if (Array.isArray(e))
    for (var t = 0; t < e.length; t++) ec(n, e[t]);
  else
    throw new RangeError("Unsupported child node: " + e);
}
let Xe = typeof navigator < "u" ? navigator : { userAgent: "", vendor: "", platform: "" }, vo = typeof document < "u" ? document : { documentElement: { style: {} } };
const To = /* @__PURE__ */ /Edge\/(\d+)/.exec(Xe.userAgent), tc = /* @__PURE__ */ /MSIE \d/.test(Xe.userAgent), Uo = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Xe.userAgent), lr = !!(tc || Uo || To), _a = !lr && /* @__PURE__ */ /gecko\/(\d+)/i.test(Xe.userAgent), Rr = !lr && /* @__PURE__ */ /Chrome\/(\d+)/.exec(Xe.userAgent), qa = "webkitFontSmoothing" in vo.documentElement.style, Yo = !lr && /* @__PURE__ */ /Apple Computer/.test(Xe.vendor), Va = Yo && (/* @__PURE__ */ /Mobile\/\w+/.test(Xe.userAgent) || Xe.maxTouchPoints > 2);
var k = {
  mac: Va || /* @__PURE__ */ /Mac/.test(Xe.platform),
  windows: /* @__PURE__ */ /Win/.test(Xe.platform),
  linux: /* @__PURE__ */ /Linux|X11/.test(Xe.platform),
  ie: lr,
  ie_version: tc ? vo.documentMode || 6 : Uo ? +Uo[1] : To ? +To[1] : 0,
  gecko: _a,
  gecko_version: _a ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(Xe.userAgent) || [0, 0])[1] : 0,
  chrome: !!Rr,
  chrome_version: Rr ? +Rr[1] : 0,
  ios: Va,
  android: /* @__PURE__ */ /Android\b/.test(Xe.userAgent),
  webkit: qa,
  webkit_version: qa ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(Xe.userAgent) || [0, 0])[1] : 0,
  safari: Yo,
  safari_version: Yo ? +(/* @__PURE__ */ /\bVersion\/(\d+(\.\d+)?)/.exec(Xe.userAgent) || [0, 0])[1] : 0,
  tabSize: vo.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
};
function bO(n, e) {
  for (let t in n)
    t == "class" && e.class ? e.class += " " + n.class : t == "style" && e.style ? e.style += ";" + n.style : e[t] = n[t];
  return e;
}
const Ts = /* @__PURE__ */ Object.create(null);
function yO(n, e, t) {
  if (n == e)
    return !0;
  n || (n = Ts), e || (e = Ts);
  let i = Object.keys(n), s = Object.keys(e);
  if (i.length - 0 != s.length - 0)
    return !1;
  for (let r of i)
    if (r != t && (s.indexOf(r) == -1 || n[r] !== e[r]))
      return !1;
  return !0;
}
function Gd(n, e) {
  for (let t = n.attributes.length - 1; t >= 0; t--) {
    let i = n.attributes[t].name;
    e[i] == null && n.removeAttribute(i);
  }
  for (let t in e) {
    let i = e[t];
    t == "style" ? n.style.cssText = i : n.getAttribute(t) != i && n.setAttribute(t, i);
  }
}
function za(n, e, t) {
  let i = !1;
  if (e)
    for (let s in e)
      t && s in t || (i = !0, s == "style" ? n.style.cssText = "" : n.removeAttribute(s));
  if (t)
    for (let s in t)
      e && e[s] == t[s] || (i = !0, s == "style" ? n.style.cssText = t[s] : n.setAttribute(s, t[s]));
  return i;
}
function Ld(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t = 0; t < n.attributes.length; t++) {
    let i = n.attributes[t];
    e[i.name] = i.value;
  }
  return e;
}
class Pt {
  /**
  Compare this instance to another instance of the same type.
  (TypeScript can't express this, but only instances of the same
  specific class will be passed to this method.) This is used to
  avoid redrawing widgets when they are replaced by a new
  decoration of the same type. The default implementation just
  returns `false`, which will cause new instances of the widget to
  always be redrawn.
  */
  eq(e) {
    return !1;
  }
  /**
  Update a DOM element created by a widget of the same type (but
  different, non-`eq` content) to reflect this widget. May return
  true to indicate that it could update, false to indicate it
  couldn't (in which case the widget will be redrawn). The default
  implementation just returns false.
  */
  updateDOM(e, t, i) {
    return !1;
  }
  /**
  @internal
  */
  compare(e) {
    return this == e || this.constructor == e.constructor && this.eq(e);
  }
  /**
  The estimated height this widget will have, to be used when
  estimating the height of content that hasn't been drawn. May
  return -1 to indicate you don't know. The default implementation
  returns -1.
  */
  get estimatedHeight() {
    return -1;
  }
  /**
  For inline widgets that are displayed inline (as opposed to
  `inline-block`) and introduce line breaks (through `<br>` tags
  or textual newlines), this must indicate the amount of line
  breaks they introduce. Defaults to 0.
  */
  get lineBreaks() {
    return 0;
  }
  /**
  Can be used to configure which kinds of events inside the widget
  should be ignored by the editor. The default is to ignore all
  events.
  */
  ignoreEvent(e) {
    return !0;
  }
  /**
  Override the way screen coordinates for positions at/in the
  widget are found. `pos` will be the offset into the widget, and
  `side` the side of the position that is being queried—less than
  zero for before, greater than zero for after, and zero for
  directly at that position.
  */
  coordsAt(e, t, i) {
    return null;
  }
  /**
  @internal
  */
  get isHidden() {
    return !1;
  }
  /**
  @internal
  */
  get editable() {
    return !1;
  }
  /**
  This is called when the an instance of the widget is removed
  from the editor view.
  */
  destroy(e) {
  }
}
var pe = /* @__PURE__ */ function(n) {
  return n[n.Text = 0] = "Text", n[n.WidgetBefore = 1] = "WidgetBefore", n[n.WidgetAfter = 2] = "WidgetAfter", n[n.WidgetRange = 3] = "WidgetRange", n;
}(pe || (pe = {}));
class Y extends jt {
  constructor(e, t, i, s) {
    super(), this.startSide = e, this.endSide = t, this.widget = i, this.spec = s;
  }
  /**
  @internal
  */
  get heightRelevant() {
    return !1;
  }
  /**
  Create a mark decoration, which influences the styling of the
  content in its range. Nested mark decorations will cause nested
  DOM elements to be created. Nesting order is determined by
  precedence of the [facet](https://codemirror.net/6/docs/ref/#view.EditorView^decorations), with
  the higher-precedence decorations creating the inner DOM nodes.
  Such elements are split on line boundaries and on the boundaries
  of lower-precedence decorations.
  */
  static mark(e) {
    return new zn(e);
  }
  /**
  Create a widget decoration, which displays a DOM element at the
  given position.
  */
  static widget(e) {
    let t = Math.max(-1e4, Math.min(1e4, e.side || 0)), i = !!e.block;
    return t += i && !e.inlineOrder ? t > 0 ? 3e8 : -4e8 : t > 0 ? 1e8 : -1e8, new li(e, t, t, i, e.widget || null, !1);
  }
  /**
  Create a replace decoration which replaces the given range with
  a widget, or simply hides it.
  */
  static replace(e) {
    let t = !!e.block, i, s;
    if (e.isBlockGap)
      i = -5e8, s = 4e8;
    else {
      let { start: r, end: o } = ic(e, t);
      i = (r ? t ? -3e8 : -1 : 5e8) - 1, s = (o ? t ? 2e8 : 1 : -6e8) + 1;
    }
    return new li(e, i, s, t, e.widget || null, !0);
  }
  /**
  Create a line decoration, which can add DOM attributes to the
  line starting at the given position.
  */
  static line(e) {
    return new Cn(e);
  }
  /**
  Build a [`DecorationSet`](https://codemirror.net/6/docs/ref/#view.DecorationSet) from the given
  decorated range or ranges. If the ranges aren't already sorted,
  pass `true` for `sort` to make the library sort them for you.
  */
  static set(e, t = !1) {
    return C.of(e, t);
  }
  /**
  @internal
  */
  hasHeight() {
    return this.widget ? this.widget.estimatedHeight > -1 : !1;
  }
}
Y.none = C.empty;
class zn extends Y {
  constructor(e) {
    let { start: t, end: i } = ic(e);
    super(t ? -1 : 5e8, i ? 1 : -6e8, null, e), this.tagName = e.tagName || "span", this.attrs = e.class && e.attributes ? bO(e.attributes, { class: e.class }) : e.class ? { class: e.class } : e.attributes || Ts;
  }
  eq(e) {
    return this == e || e instanceof zn && this.tagName == e.tagName && yO(this.attrs, e.attrs);
  }
  range(e, t = e) {
    if (e >= t)
      throw new RangeError("Mark decorations may not be empty");
    return super.range(e, t);
  }
}
zn.prototype.point = !1;
class Cn extends Y {
  constructor(e) {
    super(-2e8, -2e8, null, e);
  }
  eq(e) {
    return e instanceof Cn && this.spec.class == e.spec.class && yO(this.spec.attributes, e.spec.attributes);
  }
  range(e, t = e) {
    if (t != e)
      throw new RangeError("Line decoration ranges must be zero-length");
    return super.range(e, t);
  }
}
Cn.prototype.mapMode = de.TrackBefore;
Cn.prototype.point = !0;
class li extends Y {
  constructor(e, t, i, s, r, o) {
    super(t, i, r, e), this.block = s, this.isReplace = o, this.mapMode = s ? t <= 0 ? de.TrackBefore : de.TrackAfter : de.TrackDel;
  }
  // Only relevant when this.block == true
  get type() {
    return this.startSide != this.endSide ? pe.WidgetRange : this.startSide <= 0 ? pe.WidgetBefore : pe.WidgetAfter;
  }
  get heightRelevant() {
    return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
  }
  eq(e) {
    return e instanceof li && Dd(this.widget, e.widget) && this.block == e.block && this.startSide == e.startSide && this.endSide == e.endSide;
  }
  range(e, t = e) {
    if (this.isReplace && (e > t || e == t && this.startSide > 0 && this.endSide <= 0))
      throw new RangeError("Invalid range for replacement decoration");
    if (!this.isReplace && t != e)
      throw new RangeError("Widget decorations can only have zero-length ranges");
    return super.range(e, t);
  }
}
li.prototype.point = !0;
function ic(n, e = !1) {
  let { inclusiveStart: t, inclusiveEnd: i } = n;
  return t == null && (t = n.inclusive), i == null && (i = n.inclusive), { start: t ?? e, end: i ?? e };
}
function Dd(n, e) {
  return n == e || !!(n && e && n.compare(e));
}
function ki(n, e, t, i = 0) {
  let s = t.length - 1;
  s >= 0 && t[s] + i >= n ? t[s] = Math.max(t[s], e) : t.push(n, e);
}
class $n extends jt {
  constructor(e, t, i) {
    super(), this.tagName = e, this.attributes = t, this.rank = i;
  }
  eq(e) {
    return e == this || e instanceof $n && this.tagName == e.tagName && yO(this.attributes, e.attributes);
  }
  /**
  Create a block wrapper object with the given tag name and
  attributes.
  */
  static create(e) {
    return new $n(e.tagName, e.attributes || Ts, e.rank == null ? 50 : Math.max(0, Math.min(e.rank, 100)));
  }
  /**
  Create a range set from the given block wrapper ranges.
  */
  static set(e, t = !1) {
    return C.of(e, t);
  }
}
$n.prototype.startSide = $n.prototype.endSide = -1;
function Pn(n) {
  let e;
  return n.nodeType == 11 ? e = n.getSelection ? n : n.ownerDocument : e = n, e.getSelection();
}
function Ro(n, e) {
  return e ? n == e || n.contains(e.nodeType != 1 ? e.parentNode : e) : !1;
}
function ln(n, e) {
  if (!e.anchorNode)
    return !1;
  try {
    return Ro(n, e.anchorNode);
  } catch {
    return !1;
  }
}
function Ps(n) {
  return n.nodeType == 3 ? Sn(n, 0, n.nodeValue.length).getClientRects() : n.nodeType == 1 ? n.getClientRects() : [];
}
function hn(n, e, t, i) {
  return t ? Ca(n, e, t, i, -1) || Ca(n, e, t, i, 1) : !1;
}
function Mt(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}
function Us(n) {
  return n.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(n.nodeName);
}
function Ca(n, e, t, i, s) {
  for (; ; ) {
    if (n == t && e == i)
      return !0;
    if (e == (s < 0 ? 0 : kt(n))) {
      if (n.nodeName == "DIV")
        return !1;
      let r = n.parentNode;
      if (!r || r.nodeType != 1)
        return !1;
      e = Mt(n) + (s < 0 ? 0 : 1), n = r;
    } else if (n.nodeType == 1) {
      if (n = n.childNodes[e + (s < 0 ? -1 : 0)], n.nodeType == 1 && n.contentEditable == "false")
        return !1;
      e = s < 0 ? kt(n) : 0;
    } else
      return !1;
  }
}
function kt(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Ys(n, e) {
  let { left: t, right: i } = n;
  if (t == i)
    return n;
  let s = e ? t : i;
  return { left: s, right: s, top: n.top, bottom: n.bottom };
}
function Id(n) {
  let e = n.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: n.innerWidth,
    top: 0,
    bottom: n.innerHeight
  };
}
function nc(n, e) {
  let t = e.width / n.offsetWidth, i = e.height / n.offsetHeight;
  return (t > 0.995 && t < 1.005 || !isFinite(t) || Math.abs(e.width - n.offsetWidth) < 1) && (t = 1), (i > 0.995 && i < 1.005 || !isFinite(i) || Math.abs(e.height - n.offsetHeight) < 1) && (i = 1), { scaleX: t, scaleY: i };
}
function Bd(n, e, t, i, s, r, o, O) {
  let a = n.ownerDocument, l = a.defaultView || window;
  for (let h = n, c = !1; h && !c; )
    if (h.nodeType == 1) {
      let f, u = h == a.body, d = 1, m = 1;
      if (u)
        f = Id(l);
      else {
        if (/^(fixed|sticky)$/.test(getComputedStyle(h).position) && (c = !0), h.scrollHeight <= h.clientHeight && h.scrollWidth <= h.clientWidth) {
          h = h.assignedSlot || h.parentNode;
          continue;
        }
        let x = h.getBoundingClientRect();
        ({ scaleX: d, scaleY: m } = nc(h, x)), f = {
          left: x.left,
          right: x.left + h.clientWidth * d,
          top: x.top,
          bottom: x.top + h.clientHeight * m
        };
      }
      let g = 0, Q = 0;
      if (s == "nearest")
        e.top < f.top + o ? (Q = e.top - (f.top + o), t > 0 && e.bottom > f.bottom + Q && (Q = e.bottom - f.bottom + o)) : e.bottom > f.bottom - o && (Q = e.bottom - f.bottom + o, t < 0 && e.top - Q < f.top && (Q = e.top - (f.top + o)));
      else {
        let x = e.bottom - e.top, S = f.bottom - f.top;
        Q = (s == "center" && x <= S ? e.top + x / 2 - S / 2 : s == "start" || s == "center" && t < 0 ? e.top - o : e.bottom - S + o) - f.top;
      }
      if (i == "nearest" ? e.left < f.left + r ? (g = e.left - (f.left + r), t > 0 && e.right > f.right + g && (g = e.right - f.right + r)) : e.right > f.right - r && (g = e.right - f.right + r, t < 0 && e.left < f.left + g && (g = e.left - (f.left + r))) : g = (i == "center" ? e.left + (e.right - e.left) / 2 - (f.right - f.left) / 2 : i == "start" == O ? e.left - r : e.right - (f.right - f.left) + r) - f.left, g || Q)
        if (u)
          l.scrollBy(g, Q);
        else {
          let x = 0, S = 0;
          if (Q) {
            let T = h.scrollTop;
            h.scrollTop += Q / m, S = (h.scrollTop - T) * m;
          }
          if (g) {
            let T = h.scrollLeft;
            h.scrollLeft += g / d, x = (h.scrollLeft - T) * d;
          }
          e = {
            left: e.left - x,
            top: e.top - S,
            right: e.right - x,
            bottom: e.bottom - S
          }, x && Math.abs(x - g) < 1 && (i = "nearest"), S && Math.abs(S - Q) < 1 && (s = "nearest");
        }
      if (u)
        break;
      (e.top < f.top || e.bottom > f.bottom || e.left < f.left || e.right > f.right) && (e = {
        left: Math.max(e.left, f.left),
        right: Math.min(e.right, f.right),
        top: Math.max(e.top, f.top),
        bottom: Math.min(e.bottom, f.bottom)
      }), h = h.assignedSlot || h.parentNode;
    } else if (h.nodeType == 11)
      h = h.host;
    else
      break;
}
function sc(n, e = !0) {
  let t = n.ownerDocument, i = null, s = null;
  for (let r = n.parentNode; r && !(r == t.body || (!e || i) && s); )
    if (r.nodeType == 1)
      !s && r.scrollHeight > r.clientHeight && (s = r), e && !i && r.scrollWidth > r.clientWidth && (i = r), r = r.assignedSlot || r.parentNode;
    else if (r.nodeType == 11)
      r = r.host;
    else
      break;
  return { x: i, y: s };
}
class Nd {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  eq(e) {
    return this.anchorNode == e.anchorNode && this.anchorOffset == e.anchorOffset && this.focusNode == e.focusNode && this.focusOffset == e.focusOffset;
  }
  setRange(e) {
    let { anchorNode: t, focusNode: i } = e;
    this.set(t, Math.min(e.anchorOffset, t ? kt(t) : 0), i, Math.min(e.focusOffset, i ? kt(i) : 0));
  }
  set(e, t, i, s) {
    this.anchorNode = e, this.anchorOffset = t, this.focusNode = i, this.focusOffset = s;
  }
}
function rc(n) {
  let e = [];
  for (let t = n; t; t = t.nodeType == 11 ? t.host : t.parentNode)
    t.nodeType == 1 && e.push({ node: t, left: t.scrollLeft, top: t.scrollTop });
  return e;
}
function oc(n, e = !0) {
  for (let { node: t, left: i, top: s } of n)
    e && t.scrollTop != s && (t.scrollTop = s), t.scrollLeft != i && (t.scrollLeft = i);
}
let Kt = null;
k.safari && k.safari_version >= 26 && (Kt = !1);
function Oc(n) {
  if (n.setActive)
    return n.setActive();
  if (Kt)
    return n.focus(Kt);
  let e = rc(n);
  n.focus(Kt == null ? {
    get preventScroll() {
      return Kt = { preventScroll: !0 }, !0;
    }
  } : void 0), Kt || (Kt = !1, oc(e));
}
let Wa;
function Sn(n, e, t = e) {
  let i = Wa || (Wa = document.createRange());
  return i.setEnd(n, t), i.setStart(n, e), i;
}
function Zi(n, e, t, i) {
  let s = { key: e, code: e, keyCode: t, which: t, cancelable: !0 };
  i && ({ altKey: s.altKey, ctrlKey: s.ctrlKey, shiftKey: s.shiftKey, metaKey: s.metaKey } = i);
  let r = new KeyboardEvent("keydown", s);
  r.synthetic = !0, n.dispatchEvent(r);
  let o = new KeyboardEvent("keyup", s);
  return o.synthetic = !0, n.dispatchEvent(o), r.defaultPrevented || o.defaultPrevented;
}
function Fd(n) {
  for (; n; ) {
    if (n && (n.nodeType == 9 || n.nodeType == 11 && n.host))
      return n;
    n = n.assignedSlot || n.parentNode;
  }
  return null;
}
function Hd(n, e) {
  let t = e.focusNode, i = e.focusOffset;
  if (!t || e.anchorNode != t || e.anchorOffset != i)
    return !1;
  for (i = Math.min(i, kt(t)); ; )
    if (i) {
      if (t.nodeType != 1)
        return !1;
      let s = t.childNodes[i - 1];
      s.contentEditable == "false" ? i-- : (t = s, i = kt(t));
    } else {
      if (t == n)
        return !0;
      i = Mt(t), t = t.parentNode;
    }
}
function ac(n) {
  return n instanceof Window ? n.pageYOffset > Math.max(0, n.document.documentElement.scrollHeight - n.innerHeight - 4) : n.scrollTop > Math.max(1, n.scrollHeight - n.clientHeight - 4);
}
function lc(n, e) {
  for (let t = n, i = e; ; ) {
    if (t.nodeType == 3 && i > 0)
      return { node: t, offset: i };
    if (t.nodeType == 1 && i > 0) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[i - 1], i = kt(t);
    } else if (t.parentNode && !Us(t))
      i = Mt(t), t = t.parentNode;
    else
      return null;
  }
}
function hc(n, e) {
  for (let t = n, i = e; ; ) {
    if (t.nodeType == 3 && i < t.nodeValue.length)
      return { node: t, offset: i };
    if (t.nodeType == 1 && i < t.childNodes.length) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[i], i = 0;
    } else if (t.parentNode && !Us(t))
      i = Mt(t) + 1, t = t.parentNode;
    else
      return null;
  }
}
class Ne {
  constructor(e, t, i = !0) {
    this.node = e, this.offset = t, this.precise = i;
  }
  static before(e, t) {
    return new Ne(e.parentNode, Mt(e), t);
  }
  static after(e, t) {
    return new Ne(e.parentNode, Mt(e) + 1, t);
  }
}
var I = /* @__PURE__ */ function(n) {
  return n[n.LTR = 0] = "LTR", n[n.RTL = 1] = "RTL", n;
}(I || (I = {}));
const hi = I.LTR, wO = I.RTL;
function cc(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    e.push(1 << +n[t]);
  return e;
}
const Kd = /* @__PURE__ */ cc("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), Jd = /* @__PURE__ */ cc("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), _o = /* @__PURE__ */ Object.create(null), st = [];
for (let n of ["()", "[]", "{}"]) {
  let e = /* @__PURE__ */ n.charCodeAt(0), t = /* @__PURE__ */ n.charCodeAt(1);
  _o[e] = t, _o[t] = -e;
}
function fc(n) {
  return n <= 247 ? Kd[n] : 1424 <= n && n <= 1524 ? 2 : 1536 <= n && n <= 1785 ? Jd[n - 1536] : 1774 <= n && n <= 2220 ? 4 : 8192 <= n && n <= 8204 ? 256 : 64336 <= n && n <= 65023 ? 4 : 1;
}
const ep = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
class ut {
  /**
  The direction of this span.
  */
  get dir() {
    return this.level % 2 ? wO : hi;
  }
  /**
  @internal
  */
  constructor(e, t, i) {
    this.from = e, this.to = t, this.level = i;
  }
  /**
  @internal
  */
  side(e, t) {
    return this.dir == t == e ? this.to : this.from;
  }
  /**
  @internal
  */
  forward(e, t) {
    return e == (this.dir == t);
  }
  /**
  @internal
  */
  static find(e, t, i, s) {
    let r = -1;
    for (let o = 0; o < e.length; o++) {
      let O = e[o];
      if (O.from <= t && O.to >= t) {
        if (O.level == i)
          return o;
        (r < 0 || (s != 0 ? s < 0 ? O.from < t : O.to > t : e[r].level > O.level)) && (r = o);
      }
    }
    if (r < 0)
      throw new RangeError("Index out of range");
    return r;
  }
}
function uc(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++) {
    let i = n[t], s = e[t];
    if (i.from != s.from || i.to != s.to || i.direction != s.direction || !uc(i.inner, s.inner))
      return !1;
  }
  return !0;
}
const D = [];
function tp(n, e, t, i, s) {
  for (let r = 0; r <= i.length; r++) {
    let o = r ? i[r - 1].to : e, O = r < i.length ? i[r].from : t, a = r ? 256 : s;
    for (let l = o, h = a, c = a; l < O; l++) {
      let f = fc(n.charCodeAt(l));
      f == 512 ? f = h : f == 8 && c == 4 && (f = 16), D[l] = f == 4 ? 2 : f, f & 7 && (c = f), h = f;
    }
    for (let l = o, h = a, c = a; l < O; l++) {
      let f = D[l];
      if (f == 128)
        l < O - 1 && h == D[l + 1] && h & 24 ? f = D[l] = h : D[l] = 256;
      else if (f == 64) {
        let u = l + 1;
        for (; u < O && D[u] == 64; )
          u++;
        let d = l && h == 8 || u < t && D[u] == 8 ? c == 1 ? 1 : 8 : 256;
        for (let m = l; m < u; m++)
          D[m] = d;
        l = u - 1;
      } else f == 8 && c == 1 && (D[l] = 1);
      h = f, f & 7 && (c = f);
    }
  }
}
function ip(n, e, t, i, s) {
  let r = s == 1 ? 2 : 1;
  for (let o = 0, O = 0, a = 0; o <= i.length; o++) {
    let l = o ? i[o - 1].to : e, h = o < i.length ? i[o].from : t;
    for (let c = l, f, u, d; c < h; c++)
      if (u = _o[f = n.charCodeAt(c)])
        if (u < 0) {
          for (let m = O - 3; m >= 0; m -= 3)
            if (st[m + 1] == -u) {
              let g = st[m + 2], Q = g & 2 ? s : g & 4 ? g & 1 ? r : s : 0;
              Q && (D[c] = D[st[m]] = Q), O = m;
              break;
            }
        } else {
          if (st.length == 189)
            break;
          st[O++] = c, st[O++] = f, st[O++] = a;
        }
      else if ((d = D[c]) == 2 || d == 1) {
        let m = d == s;
        a = m ? 0 : 1;
        for (let g = O - 3; g >= 0; g -= 3) {
          let Q = st[g + 2];
          if (Q & 2)
            break;
          if (m)
            st[g + 2] |= 2;
          else {
            if (Q & 4)
              break;
            st[g + 2] |= 4;
          }
        }
      }
  }
}
function np(n, e, t, i) {
  for (let s = 0, r = i; s <= t.length; s++) {
    let o = s ? t[s - 1].to : n, O = s < t.length ? t[s].from : e;
    for (let a = o; a < O; ) {
      let l = D[a];
      if (l == 256) {
        let h = a + 1;
        for (; ; )
          if (h == O) {
            if (s == t.length)
              break;
            h = t[s++].to, O = s < t.length ? t[s].from : e;
          } else if (D[h] == 256)
            h++;
          else
            break;
        let c = r == 1, f = (h < e ? D[h] : i) == 1, u = c == f ? c ? 1 : 2 : i;
        for (let d = h, m = s, g = m ? t[m - 1].to : n; d > a; )
          d == g && (d = t[--m].from, g = m ? t[m - 1].to : n), D[--d] = u;
        a = h;
      } else
        r = l, a++;
    }
  }
}
function qo(n, e, t, i, s, r, o) {
  let O = i % 2 ? 2 : 1;
  if (i % 2 == s % 2)
    for (let a = e, l = 0; a < t; ) {
      let h = !0, c = !1;
      if (l == r.length || a < r[l].from) {
        let m = D[a];
        m != O && (h = !1, c = m == 16);
      }
      let f = !h && O == 1 ? [] : null, u = h ? i : i + 1, d = a;
      e: for (; ; )
        if (l < r.length && d == r[l].from) {
          if (c)
            break e;
          let m = r[l];
          if (!h)
            for (let g = m.to, Q = l + 1; ; ) {
              if (g == t)
                break e;
              if (Q < r.length && r[Q].from == g)
                g = r[Q++].to;
              else {
                if (D[g] == O)
                  break e;
                break;
              }
            }
          if (l++, f)
            f.push(m);
          else {
            m.from > a && o.push(new ut(a, m.from, u));
            let g = m.direction == hi != !(u % 2);
            Vo(n, g ? i + 1 : i, s, m.inner, m.from, m.to, o), a = m.to;
          }
          d = m.to;
        } else {
          if (d == t || (h ? D[d] != O : D[d] == O))
            break;
          d++;
        }
      f ? qo(n, a, d, i + 1, s, f, o) : a < d && o.push(new ut(a, d, u)), a = d;
    }
  else
    for (let a = t, l = r.length; a > e; ) {
      let h = !0, c = !1;
      if (!l || a > r[l - 1].to) {
        let m = D[a - 1];
        m != O && (h = !1, c = m == 16);
      }
      let f = !h && O == 1 ? [] : null, u = h ? i : i + 1, d = a;
      e: for (; ; )
        if (l && d == r[l - 1].to) {
          if (c)
            break e;
          let m = r[--l];
          if (!h)
            for (let g = m.from, Q = l; ; ) {
              if (g == e)
                break e;
              if (Q && r[Q - 1].to == g)
                g = r[--Q].from;
              else {
                if (D[g - 1] == O)
                  break e;
                break;
              }
            }
          if (f)
            f.push(m);
          else {
            m.to < a && o.push(new ut(m.to, a, u));
            let g = m.direction == hi != !(u % 2);
            Vo(n, g ? i + 1 : i, s, m.inner, m.from, m.to, o), a = m.from;
          }
          d = m.from;
        } else {
          if (d == e || (h ? D[d - 1] != O : D[d - 1] == O))
            break;
          d--;
        }
      f ? qo(n, d, a, i + 1, s, f, o) : d < a && o.push(new ut(d, a, u)), a = d;
    }
}
function Vo(n, e, t, i, s, r, o) {
  let O = e % 2 ? 2 : 1;
  tp(n, s, r, i, O), ip(n, s, r, i, O), np(s, r, i, O), qo(n, s, r, e, t, i, o);
}
function sp(n, e, t) {
  if (!n)
    return [new ut(0, 0, e == wO ? 1 : 0)];
  if (e == hi && !t.length && !ep.test(n))
    return dc(n.length);
  if (t.length)
    for (; n.length > D.length; )
      D[D.length] = 256;
  let i = [], s = e == hi ? 0 : 1;
  return Vo(n, s, s, t, 0, n.length, i), i;
}
function dc(n) {
  return [new ut(0, n, 0)];
}
let pc = "";
function rp(n, e, t, i, s) {
  var r;
  let o = i.head - n.from, O = ut.find(e, o, (r = i.bidiLevel) !== null && r !== void 0 ? r : -1, i.assoc), a = e[O], l = a.side(s, t);
  if (o == l) {
    let f = O += s ? 1 : -1;
    if (f < 0 || f >= e.length)
      return null;
    a = e[O = f], o = a.side(!s, t), l = a.side(s, t);
  }
  let h = le(n.text, o, a.forward(s, t));
  (h < a.from || h > a.to) && (h = l), pc = n.text.slice(Math.min(o, h), Math.max(o, h));
  let c = O == (s ? e.length - 1 : 0) ? null : e[O + (s ? 1 : -1)];
  return c && h == l && c.level + (s ? 0 : 1) < a.level ? $.cursor(c.side(!s, t) + n.from, c.forward(s, t) ? 1 : -1, c.level) : $.cursor(h + n.from, a.forward(s, t) ? -1 : 1, a.level);
}
function op(n, e, t) {
  for (let i = e; i < t; i++) {
    let s = fc(n.charCodeAt(i));
    if (s == 1)
      return hi;
    if (s == 2 || s == 4)
      return wO;
  }
  return hi;
}
const mc = /* @__PURE__ */ v.define(), gc = /* @__PURE__ */ v.define(), Qc = /* @__PURE__ */ v.define(), $c = /* @__PURE__ */ v.define(), zo = /* @__PURE__ */ v.define(), Pc = /* @__PURE__ */ v.define(), Sc = /* @__PURE__ */ v.define(), kO = /* @__PURE__ */ v.define(), ZO = /* @__PURE__ */ v.define(), xc = /* @__PURE__ */ v.define({
  combine: (n) => n.some((e) => e)
}), Xc = /* @__PURE__ */ v.define({
  combine: (n) => n.some((e) => e)
}), bc = /* @__PURE__ */ v.define();
class vi {
  constructor(e, t, i, s, r, o = !1) {
    this.range = e, this.y = t, this.x = i, this.yMargin = s, this.xMargin = r, this.isSnapshot = o;
  }
  map(e) {
    return e.empty ? this : new vi(this.range.map(e), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
  clip(e) {
    return this.range.to <= e.doc.length ? this : new vi($.cursor(e.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
}
const Fn = /* @__PURE__ */ q.define({ map: (n, e) => n.map(e) }), yc = /* @__PURE__ */ q.define();
function Te(n, e, t) {
  let i = n.facet($c);
  i.length ? i[0](e) : window.onerror && window.onerror(String(e), t, void 0, void 0, e) || (t ? console.error(t + ":", e) : console.error(e));
}
const Xt = /* @__PURE__ */ v.define({ combine: (n) => n.length ? n[0] : !0 });
let Op = 0;
const Pi = /* @__PURE__ */ v.define({
  combine(n) {
    return n.filter((e, t) => {
      for (let i = 0; i < t; i++)
        if (n[i].plugin == e.plugin)
          return !1;
      return !0;
    });
  }
});
class ie {
  constructor(e, t, i, s, r) {
    this.id = e, this.create = t, this.domEventHandlers = i, this.domEventObservers = s, this.baseExtensions = r(this), this.extension = this.baseExtensions.concat(Pi.of({ plugin: this, arg: void 0 }));
  }
  /**
  Create an extension for this plugin with the given argument.
  */
  of(e) {
    return this.baseExtensions.concat(Pi.of({ plugin: this, arg: e }));
  }
  /**
  Define a plugin from a constructor function that creates the
  plugin's value, given an editor view.
  */
  static define(e, t) {
    const { eventHandlers: i, eventObservers: s, provide: r, decorations: o } = t || {};
    return new ie(Op++, e, i, s, (O) => {
      let a = [];
      return o && a.push(hr.of((l) => {
        let h = l.plugin(O);
        return h ? o(h) : Y.none;
      })), r && a.push(r(O)), a;
    });
  }
  /**
  Create a plugin for a class whose constructor takes a single
  editor view as argument.
  */
  static fromClass(e, t) {
    return ie.define((i, s) => new e(i, s), t);
  }
}
class _r {
  constructor(e) {
    this.spec = e, this.mustUpdate = null, this.value = null;
  }
  get plugin() {
    return this.spec && this.spec.plugin;
  }
  update(e) {
    if (this.value) {
      if (this.mustUpdate) {
        let t = this.mustUpdate;
        if (this.mustUpdate = null, this.value.update)
          try {
            this.value.update(t);
          } catch (i) {
            if (Te(t.state, i, "CodeMirror plugin crashed"), this.value.destroy)
              try {
                this.value.destroy();
              } catch {
              }
            this.deactivate();
          }
      }
    } else if (this.spec)
      try {
        this.value = this.spec.plugin.create(e, this.spec.arg);
      } catch (t) {
        Te(e.state, t, "CodeMirror plugin crashed"), this.deactivate();
      }
    return this;
  }
  destroy(e) {
    var t;
    if (!((t = this.value) === null || t === void 0) && t.destroy)
      try {
        this.value.destroy();
      } catch (i) {
        Te(e.state, i, "CodeMirror plugin crashed");
      }
  }
  deactivate() {
    this.spec = this.value = null;
  }
}
const wc = /* @__PURE__ */ v.define(), vO = /* @__PURE__ */ v.define(), hr = /* @__PURE__ */ v.define(), kc = /* @__PURE__ */ v.define(), TO = /* @__PURE__ */ v.define(), Wn = /* @__PURE__ */ v.define(), Zc = /* @__PURE__ */ v.define();
function ja(n, e) {
  let t = n.state.facet(Zc);
  if (!t.length)
    return t;
  let i = t.map((r) => r instanceof Function ? r(n) : r), s = [];
  return C.spans(i, e.from, e.to, {
    point() {
    },
    span(r, o, O, a) {
      let l = r - e.from, h = o - e.from, c = s;
      for (let f = O.length - 1; f >= 0; f--, a--) {
        let u = O[f].spec.bidiIsolate, d;
        if (u == null && (u = op(e.text, l, h)), a > 0 && c.length && (d = c[c.length - 1]).to == l && d.direction == u)
          d.to = h, c = d.inner;
        else {
          let m = { from: l, to: h, direction: u, inner: [] };
          c.push(m), c = m.inner;
        }
      }
    }
  }), s;
}
const vc = /* @__PURE__ */ v.define();
function UO(n) {
  let e = 0, t = 0, i = 0, s = 0;
  for (let r of n.state.facet(vc)) {
    let o = r(n);
    o && (o.left != null && (e = Math.max(e, o.left)), o.right != null && (t = Math.max(t, o.right)), o.top != null && (i = Math.max(i, o.top)), o.bottom != null && (s = Math.max(s, o.bottom)));
  }
  return { left: e, right: t, top: i, bottom: s };
}
const nn = /* @__PURE__ */ v.define();
class Me {
  constructor(e, t, i, s) {
    this.fromA = e, this.toA = t, this.fromB = i, this.toB = s;
  }
  join(e) {
    return new Me(Math.min(this.fromA, e.fromA), Math.max(this.toA, e.toA), Math.min(this.fromB, e.fromB), Math.max(this.toB, e.toB));
  }
  addToSet(e) {
    let t = e.length, i = this;
    for (; t > 0; t--) {
      let s = e[t - 1];
      if (!(s.fromA > i.toA)) {
        if (s.toA < i.fromA)
          break;
        i = i.join(s), e.splice(t - 1, 1);
      }
    }
    return e.splice(t, 0, i), e;
  }
  // Extend a set to cover all the content in `ranges`, which is a
  // flat array with each pair of numbers representing fromB/toB
  // positions. These pairs are generated in unchanged ranges, so the
  // offset between doc A and doc B is the same for their start and
  // end points.
  static extendWithRanges(e, t) {
    if (t.length == 0)
      return e;
    let i = [];
    for (let s = 0, r = 0, o = 0; ; ) {
      let O = s < e.length ? e[s].fromB : 1e9, a = r < t.length ? t[r] : 1e9, l = Math.min(O, a);
      if (l == 1e9)
        break;
      let h = l + o, c = l, f = h;
      for (; ; )
        if (r < t.length && t[r] <= c) {
          let u = t[r + 1];
          r += 2, c = Math.max(c, u);
          for (let d = s; d < e.length && e[d].fromB <= c; d++)
            o = e[d].toA - e[d].toB;
          f = Math.max(f, u + o);
        } else if (s < e.length && e[s].fromB <= c) {
          let u = e[s++];
          c = Math.max(c, u.toB), f = Math.max(f, u.toA), o = u.toA - u.toB;
        } else
          break;
      i.push(new Me(h, f, l, c));
    }
    return i;
  }
}
class Rs {
  constructor(e, t, i) {
    this.view = e, this.state = t, this.transactions = i, this.flags = 0, this.startState = e.state, this.changes = se.empty(this.startState.doc.length);
    for (let r of i)
      this.changes = this.changes.compose(r.changes);
    let s = [];
    this.changes.iterChangedRanges((r, o, O, a) => s.push(new Me(r, o, O, a))), this.changedRanges = s;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new Rs(e, t, i);
  }
  /**
  Tells you whether the [viewport](https://codemirror.net/6/docs/ref/#view.EditorView.viewport) or
  [visible ranges](https://codemirror.net/6/docs/ref/#view.EditorView.visibleRanges) changed in this
  update.
  */
  get viewportChanged() {
    return (this.flags & 4) > 0;
  }
  /**
  Returns true when
  [`viewportChanged`](https://codemirror.net/6/docs/ref/#view.ViewUpdate.viewportChanged) is true
  and the viewport change is not just the result of mapping it in
  response to document changes.
  */
  get viewportMoved() {
    return (this.flags & 8) > 0;
  }
  /**
  Indicates whether the height of a block element in the editor
  changed in this update.
  */
  get heightChanged() {
    return (this.flags & 2) > 0;
  }
  /**
  Returns true when the document was modified or the size of the
  editor, or elements within the editor, changed.
  */
  get geometryChanged() {
    return this.docChanged || (this.flags & 18) > 0;
  }
  /**
  True when this update indicates a focus change.
  */
  get focusChanged() {
    return (this.flags & 1) > 0;
  }
  /**
  Whether the document changed in this update.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Whether the selection was explicitly set in this update.
  */
  get selectionSet() {
    return this.transactions.some((e) => e.selection);
  }
  /**
  @internal
  */
  get empty() {
    return this.flags == 0 && this.transactions.length == 0;
  }
}
const ap = [];
class K {
  constructor(e, t, i = 0) {
    this.dom = e, this.length = t, this.flags = i, this.parent = null, e.cmTile = this;
  }
  get breakAfter() {
    return this.flags & 1;
  }
  get children() {
    return ap;
  }
  isWidget() {
    return !1;
  }
  get isHidden() {
    return !1;
  }
  isComposite() {
    return !1;
  }
  isLine() {
    return !1;
  }
  isText() {
    return !1;
  }
  isBlock() {
    return !1;
  }
  get domAttrs() {
    return null;
  }
  sync(e) {
    if (this.flags |= 2, this.flags & 4) {
      this.flags &= -5;
      let t = this.domAttrs;
      t && Gd(this.dom, t);
    }
  }
  toString() {
    return this.constructor.name + (this.children.length ? `(${this.children})` : "") + (this.breakAfter ? "#" : "");
  }
  destroy() {
    this.parent = null;
  }
  setDOM(e) {
    this.dom = e, e.cmTile = this;
  }
  get posAtStart() {
    return this.parent ? this.parent.posBefore(this) : 0;
  }
  get posAtEnd() {
    return this.posAtStart + this.length;
  }
  posBefore(e, t = this.posAtStart) {
    let i = t;
    for (let s of this.children) {
      if (s == e)
        return i;
      i += s.length + s.breakAfter;
    }
    throw new RangeError("Invalid child in posBefore");
  }
  posAfter(e) {
    return this.posBefore(e) + e.length;
  }
  covers(e) {
    return !0;
  }
  coordsIn(e, t, i) {
    return null;
  }
  domPosFor(e, t) {
    let i = Mt(this.dom), s = this.length ? e > 0 : t > 0;
    return new Ne(this.parent.dom, i + (s ? 1 : 0), e == 0 || e == this.length);
  }
  markDirty(e) {
    this.flags &= -3, e && (this.flags |= 4), this.parent && this.parent.flags & 2 && this.parent.markDirty(!1);
  }
  get overrideDOMText() {
    return null;
  }
  get root() {
    for (let e = this; e; e = e.parent)
      if (e instanceof fr)
        return e;
    return null;
  }
  static get(e) {
    return e.cmTile;
  }
}
class cr extends K {
  constructor(e) {
    super(e, 0), this._children = [];
  }
  isComposite() {
    return !0;
  }
  get children() {
    return this._children;
  }
  get lastChild() {
    return this.children.length ? this.children[this.children.length - 1] : null;
  }
  append(e) {
    this.children.push(e), e.parent = this;
  }
  sync(e) {
    if (this.flags & 2)
      return;
    super.sync(e);
    let t = this.dom, i = null, s, r = (e == null ? void 0 : e.node) == t ? e : null, o = 0;
    for (let O of this.children) {
      if (O.sync(e), o += O.length + O.breakAfter, s = i ? i.nextSibling : t.firstChild, r && s != O.dom && (r.written = !0), O.dom.parentNode == t)
        for (; s && s != O.dom; )
          s = Aa(s);
      else
        t.insertBefore(O.dom, s);
      i = O.dom;
    }
    for (s = i ? i.nextSibling : t.firstChild, r && s && (r.written = !0); s; )
      s = Aa(s);
    this.length = o;
  }
}
function Aa(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class fr extends cr {
  constructor(e, t) {
    super(t), this.view = e;
  }
  owns(e) {
    for (; e; e = e.parent)
      if (e == this)
        return !0;
    return !1;
  }
  isBlock() {
    return !0;
  }
  nearest(e) {
    for (; ; ) {
      if (!e)
        return null;
      let t = K.get(e);
      if (t && this.owns(t))
        return t;
      e = e.parentNode;
    }
  }
  blockTiles(e) {
    for (let t = [], i = this, s = 0, r = 0; ; )
      if (s == i.children.length) {
        if (!t.length)
          return;
        i = i.parent, i.breakAfter && r++, s = t.pop();
      } else {
        let o = i.children[s++];
        if (o instanceof bt)
          t.push(s), i = o, s = 0;
        else {
          let O = r + o.length, a = e(o, r);
          if (a !== void 0)
            return a;
          r = O + o.breakAfter;
        }
      }
  }
  // Find the block at the given position. If side < -1, make sure to
  // stay before block widgets at that position, if side > 1, after
  // such widgets (used for selection drawing, which needs to be able
  // to get coordinates for positions that aren't valid cursor positions).
  resolveBlock(e, t) {
    let i, s = -1, r, o = -1;
    if (this.blockTiles((O, a) => {
      let l = a + O.length;
      if (e >= a && e <= l) {
        if (O.isWidget() && t >= -1 && t <= 1) {
          if (O.flags & 32)
            return !0;
          O.flags & 16 && (i = void 0);
        }
        (a < e || e == l && (t < -1 ? O.length : O.covers(1))) && (!i || !O.isWidget() && i.isWidget()) && (i = O, s = e - a), (l > e || e == a && (t > 1 ? O.length : O.covers(-1))) && (!r || !O.isWidget() && r.isWidget()) && (r = O, o = e - a);
      }
    }), !i && !r)
      throw new Error("No tile at position " + e);
    return i && t < 0 || !r ? { tile: i, offset: s } : { tile: r, offset: o };
  }
}
class bt extends cr {
  constructor(e, t) {
    super(e), this.wrapper = t;
  }
  isBlock() {
    return !0;
  }
  covers(e) {
    return this.children.length ? e < 0 ? this.children[0].covers(-1) : this.lastChild.covers(1) : !1;
  }
  get domAttrs() {
    return this.wrapper.attributes;
  }
  static of(e, t) {
    let i = new bt(t || document.createElement(e.tagName), e);
    return t || (i.flags |= 4), i;
  }
}
class Vi extends cr {
  constructor(e, t) {
    super(e), this.attrs = t;
  }
  isLine() {
    return !0;
  }
  static start(e, t, i) {
    let s = new Vi(t || document.createElement("div"), e);
    return (!t || !i) && (s.flags |= 4), s;
  }
  get domAttrs() {
    return this.attrs;
  }
  // Find the tile associated with a given position in this line.
  // Side -2/2 is handled specially, in that it allows the position
  // returned to be before (-2) or after (2) widgets that would always
  // be after/before a cursor position.
  resolveInline(e, t, i) {
    let s = null, r = -1, o = null, O = -1;
    function a(h, c) {
      for (let f = 0, u = 0; f < h.children.length && u <= c; f++) {
        let d = h.children[f], m = u + d.length;
        m >= c && (d.isComposite() ? a(d, c - u) : (!o || o.isHidden && (t > 0 && !(o.flags & 32) || i && hp(o, d))) && (m > c || d.flags & 32 && t <= 1) ? (o = d, O = c - u) : (u < c || d.flags & 16 && !d.isHidden && t >= -1) && (s = d, r = c - u)), u = m;
      }
    }
    a(this, e);
    let l = (t < 0 ? s : o) || s || o;
    return l ? { tile: l, offset: l == s ? r : O } : null;
  }
  coordsIn(e, t, i) {
    let s = this.resolveInline(e, t, !0);
    return s ? s.tile.coordsIn(Math.max(0, s.offset), t, i) : lp(this);
  }
  domIn(e, t) {
    let i = this.resolveInline(e, t);
    if (i) {
      let { tile: s, offset: r } = i;
      if (this.dom.contains(s.dom))
        return s.isText() ? new Ne(s.dom, Math.min(s.dom.nodeValue.length, r)) : s.domPosFor(r, s.flags & 16 ? 1 : s.flags & 32 ? -1 : t);
      let o = i.tile.parent, O = !1;
      for (let a of o.children) {
        if (O)
          return new Ne(a.dom, 0);
        a == i.tile && (O = !0);
      }
    }
    return new Ne(this.dom, 0);
  }
}
function lp(n) {
  let e = n.dom.lastChild;
  if (!e)
    return n.dom.getBoundingClientRect();
  let t = Ps(e);
  return t[t.length - 1] || null;
}
function hp(n, e) {
  let t = n.coordsIn(0, 1), i = e.coordsIn(0, 1);
  return t && i && i.top < t.bottom;
}
class ve extends cr {
  constructor(e, t) {
    super(e), this.mark = t;
  }
  get domAttrs() {
    return this.mark.attrs;
  }
  static of(e, t) {
    let i = new ve(t || document.createElement(e.tagName), e);
    return t || (i.flags |= 4), i;
  }
}
class ti extends K {
  constructor(e, t) {
    super(e, t.length), this.text = t;
  }
  sync(e) {
    this.flags & 2 || (super.sync(e), this.dom.nodeValue != this.text && (e && e.node == this.dom && (e.written = !0), this.dom.nodeValue = this.text));
  }
  isText() {
    return !0;
  }
  toString() {
    return JSON.stringify(this.text);
  }
  coordsIn(e, t, i) {
    let s = this.dom.nodeValue.length;
    e > s && (e = s);
    let r = e, o = e, O = 0;
    e == 0 && t < 0 || e == s && t >= 0 ? k.chrome || k.gecko || (e ? (r--, O = 1) : o < s && (o++, O = -1)) : t < 0 ? r-- : o < s && o++;
    let a = Sn(this.dom, r, o).getClientRects();
    if (!a.length)
      return null;
    let l = a[(O ? O < 0 : t >= 0) ? 0 : a.length - 1];
    return k.safari && !O && l.width == 0 && (l = Array.prototype.find.call(a, (h) => h.width) || l), i == null ? l : Ys(l, (O ? O > 0 : t < 0) == i);
  }
  static of(e, t) {
    let i = new ti(t || document.createTextNode(e), e);
    return t || (i.flags |= 2), i;
  }
}
class ci extends K {
  constructor(e, t, i, s) {
    super(e, t, s), this.widget = i;
  }
  isWidget() {
    return !0;
  }
  get isHidden() {
    return this.widget.isHidden;
  }
  covers(e) {
    return this.flags & 48 ? !1 : (this.flags & (e < 0 ? 64 : 128)) > 0;
  }
  coordsIn(e, t) {
    return this.coordsInWidget(e, t, !1);
  }
  coordsInWidget(e, t, i) {
    let s = this.widget.coordsAt(this.dom, e, t);
    if (s)
      return s;
    if (i)
      return Ys(this.dom.getBoundingClientRect(), this.length ? e == 0 : t <= 0);
    {
      let r = this.dom.getClientRects(), o = null;
      if (!r.length)
        return null;
      let O = this.flags & 16 ? !0 : this.flags & 32 ? !1 : e > 0;
      for (let a = O ? r.length - 1 : 0; o = r[a], !(e > 0 ? a == 0 : a == r.length - 1 || o.top < o.bottom); a += O ? -1 : 1)
        ;
      return Ys(o, !O);
    }
  }
  get overrideDOMText() {
    if (!this.length)
      return j.empty;
    let { root: e } = this;
    if (!e)
      return j.empty;
    let t = this.posAtStart;
    return e.view.state.doc.slice(t, t + this.length);
  }
  destroy() {
    super.destroy(), this.widget.destroy(this.dom);
  }
  static of(e, t, i, s, r) {
    return r || (r = e.toDOM(t), e.editable || (r.contentEditable = "false")), new ci(r, i, e, s);
  }
}
class _s extends K {
  constructor(e) {
    let t = document.createElement("img");
    t.className = "cm-widgetBuffer", t.setAttribute("aria-hidden", "true"), super(t, 0, e);
  }
  get isHidden() {
    return !0;
  }
  get overrideDOMText() {
    return j.empty;
  }
  coordsIn(e, t, i) {
    let s = this.dom.getBoundingClientRect();
    return i == null ? s : Ys(s, t > 0 == i);
  }
}
class cp {
  constructor(e) {
    this.index = 0, this.beforeBreak = !1, this.parents = [], this.tile = e;
  }
  // Advance by the given distance. If side is -1, stop leaving or
  // entering tiles, or skipping zero-length tiles, once the distance
  // has been traversed. When side is 1, leave, enter, or skip
  // everything at the end position.
  advance(e, t, i) {
    let { tile: s, index: r, beforeBreak: o, parents: O } = this;
    for (; e || t > 0; )
      if (s.isComposite())
        if (o) {
          if (!e)
            break;
          i && i.break(), e--, o = !1;
        } else if (r == s.children.length) {
          if (!e && !O.length)
            break;
          i && i.leave(s), o = !!s.breakAfter, { tile: s, index: r } = O.pop(), r++;
        } else {
          let a = s.children[r], l = a.breakAfter;
          (t > 0 ? a.length <= e : a.length < e) && (!i || i.skip(a, 0, a.length) !== !1 || !a.isComposite) ? (o = !!l, r++, e -= a.length) : (O.push({ tile: s, index: r }), s = a, r = 0, i && a.isComposite() && i.enter(a));
        }
      else {
        let a = s.length;
        if (r < a && e) {
          let l = Math.min(e, a - r);
          i && i.skip(s, r, r + l), e -= l, r += l;
        }
        if (r == a)
          o = !!s.breakAfter, { tile: s, index: r } = O.pop(), r++;
        else if (!e)
          break;
      }
    return this.tile = s, this.index = r, this.beforeBreak = o, this;
  }
  get root() {
    return this.parents.length ? this.parents[0].tile : this.tile;
  }
}
class fp {
  constructor(e, t, i, s) {
    this.from = e, this.to = t, this.wrapper = i, this.rank = s;
  }
}
class up {
  constructor(e, t, i) {
    this.cache = e, this.root = t, this.blockWrappers = i, this.curLine = null, this.lastBlock = null, this.afterWidget = null, this.pos = 0, this.wrappers = [], this.wrapperPos = 0;
  }
  addText(e, t, i, s) {
    var r;
    this.flushBuffer();
    let o = this.ensureMarks(t, i), O = o.lastChild;
    if (O && O.isText() && !(O.flags & 8) && O.length + e.length < 512) {
      this.cache.reused.set(
        O,
        2
        /* Reused.DOM */
      );
      let a = o.children[o.children.length - 1] = new ti(O.dom, O.text + e);
      a.parent = o;
    } else
      o.append(s || ti.of(e, (r = this.cache.find(ti)) === null || r === void 0 ? void 0 : r.dom));
    this.pos += e.length, this.afterWidget = null;
  }
  addComposition(e, t) {
    let i = this.curLine;
    i.dom != t.line.dom && (i.setDOM(this.cache.reused.has(t.line) ? qr(t.line.dom) : t.line.dom), this.cache.reused.set(
      t.line,
      2
      /* Reused.DOM */
    ));
    let s = i;
    for (let O = t.marks.length - 1; O >= 0; O--) {
      let a = t.marks[O], l = s.lastChild;
      if (l instanceof ve && l.mark.eq(a.mark))
        l.dom != a.dom && l.setDOM(qr(a.dom)), s = l;
      else {
        if (this.cache.reused.get(a)) {
          let c = K.get(a.dom);
          c && c.setDOM(qr(a.dom));
        }
        let h = ve.of(a.mark, a.dom);
        s.append(h), s = h;
      }
      this.cache.reused.set(
        a,
        2
        /* Reused.DOM */
      );
    }
    let r = K.get(e.text);
    r && this.cache.reused.set(
      r,
      2
      /* Reused.DOM */
    );
    let o = new ti(e.text, e.text.nodeValue);
    o.flags |= 8, this.pos = e.range.toB, s.append(o);
  }
  addInlineWidget(e, t, i) {
    let s = this.afterWidget && e.flags & 48 && (this.afterWidget.flags & 48) == (e.flags & 48);
    s || this.flushBuffer();
    let r = this.ensureMarks(t, i);
    !s && !(e.flags & 16) && r.append(this.getBuffer(1)), r.append(e), this.pos += e.length, this.afterWidget = e;
  }
  addMark(e, t, i) {
    this.flushBuffer(), this.ensureMarks(t, i).append(e), this.pos += e.length, this.afterWidget = null;
  }
  addBlockWidget(e) {
    this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
  }
  continueWidget(e) {
    let t = this.afterWidget || this.lastBlock;
    t.length += e, this.pos += e;
  }
  addLineStart(e, t) {
    var i;
    e || (e = Tc);
    let s = Vi.start(e, t || ((i = this.cache.find(Vi)) === null || i === void 0 ? void 0 : i.dom), !!t);
    this.getBlockPos().append(this.lastBlock = this.curLine = s);
  }
  addLine(e) {
    this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
  }
  addBreak() {
    this.lastBlock.flags |= 1, this.endLine(), this.pos++;
  }
  addLineStartIfNotCovered(e) {
    this.blockPosCovered() || this.addLineStart(e);
  }
  ensureLine(e) {
    this.curLine || this.addLineStart(e);
  }
  ensureMarks(e, t) {
    var i;
    let s = this.curLine;
    for (let r = e.length - 1; r >= 0; r--) {
      let o = e[r], O;
      if (t > 0 && (O = s.lastChild) && O instanceof ve && O.mark.eq(o))
        s = O, t--;
      else {
        let a = ve.of(o, (i = this.cache.find(ve, (l) => l.mark.eq(o))) === null || i === void 0 ? void 0 : i.dom);
        s.append(a), s = a, t = 0;
      }
    }
    return s;
  }
  endLine() {
    if (this.curLine) {
      this.flushBuffer();
      let e = this.curLine.lastChild;
      (!e || !Ea(this.curLine, !1) || e.dom.nodeName != "BR" && e.isWidget() && !(k.ios && Ea(this.curLine, !0))) && this.curLine.append(this.cache.findWidget(
        Vr,
        0,
        32
        /* TileFlag.After */
      ) || new ci(
        Vr.toDOM(),
        0,
        Vr,
        32
        /* TileFlag.After */
      )), this.curLine = this.afterWidget = null;
    }
  }
  updateBlockWrappers() {
    this.wrapperPos > this.pos + 1e4 && (this.blockWrappers.goto(this.pos), this.wrappers.length = 0);
    for (let e = this.wrappers.length - 1; e >= 0; e--)
      this.wrappers[e].to < this.pos && this.wrappers.splice(e, 1);
    for (let e = this.blockWrappers; e.value && e.from <= this.pos; e.next())
      if (e.to >= this.pos) {
        let t = e.rank * 102 + e.value.rank, i = new fp(e.from, e.to, e.value, t), s = this.wrappers.length;
        for (; s > 0 && (this.wrappers[s - 1].rank - i.rank || this.wrappers[s - 1].to - i.to) < 0; )
          s--;
        this.wrappers.splice(s, 0, i);
      }
    this.wrapperPos = this.pos;
  }
  getBlockPos() {
    var e;
    this.updateBlockWrappers();
    let t = this.root;
    for (let i of this.wrappers) {
      let s = t.lastChild;
      if (i.from < this.pos && s instanceof bt && s.wrapper.eq(i.wrapper))
        t = s;
      else {
        let r = bt.of(i.wrapper, (e = this.cache.find(bt, (o) => o.wrapper.eq(i.wrapper))) === null || e === void 0 ? void 0 : e.dom);
        t.append(r), t = r;
      }
    }
    return t;
  }
  blockPosCovered() {
    let e = this.lastBlock;
    return e != null && !e.breakAfter && (!e.isWidget() || (e.flags & 160) > 0);
  }
  getBuffer(e) {
    let t = 2 | (e < 0 ? 16 : 32), i = this.cache.find(
      _s,
      void 0,
      1
      /* Reused.Full */
    );
    return i && (i.flags = t), i || new _s(t);
  }
  flushBuffer() {
    this.afterWidget && !(this.afterWidget.flags & 32) && (this.afterWidget.parent.append(this.getBuffer(-1)), this.afterWidget = null);
  }
}
class dp {
  constructor(e) {
    this.skipCount = 0, this.text = "", this.textOff = 0, this.cursor = e.iter();
  }
  skip(e) {
    this.textOff + e <= this.text.length ? this.textOff += e : (this.skipCount += e - (this.text.length - this.textOff), this.text = "", this.textOff = 0);
  }
  next(e) {
    if (this.textOff == this.text.length) {
      let { value: s, lineBreak: r, done: o } = this.cursor.next(this.skipCount);
      if (this.skipCount = 0, o)
        throw new Error("Ran out of text content when drawing inline views");
      this.text = s;
      let O = this.textOff = Math.min(e, s.length);
      return r ? null : s.slice(0, O);
    }
    let t = Math.min(this.text.length, this.textOff + e), i = this.text.slice(this.textOff, t);
    return this.textOff = t, i;
  }
}
const qs = [ci, Vi, ti, ve, _s, bt, fr];
for (let n = 0; n < qs.length; n++)
  qs[n].bucket = n;
class pp {
  constructor(e) {
    this.view = e, this.buckets = qs.map(() => []), this.index = qs.map(() => 0), this.reused = /* @__PURE__ */ new Map();
  }
  // Put a tile in the cache.
  add(e) {
    let t = e.constructor.bucket, i = this.buckets[t];
    i.length < 6 ? i.push(e) : i[
      this.index[t] = (this.index[t] + 1) % 6
      /* C.Bucket */
    ] = e;
  }
  find(e, t, i = 2) {
    let s = e.bucket, r = this.buckets[s], o = this.index[s];
    for (let O = 0; O < r.length; O++) {
      let a = (O + o) % r.length, l = r[a];
      if ((!t || t(l)) && !this.reused.has(l))
        return r.splice(a, 1), a < o && this.index[s]--, this.reused.set(l, i), l;
    }
    return null;
  }
  findWidget(e, t, i) {
    let s = this.buckets[0];
    if (s.length)
      for (let r = 0, o = 0; ; r++) {
        if (r == s.length) {
          if (o)
            return null;
          o = 1, r = 0;
        }
        let O = s[r];
        if (!this.reused.has(O) && (o == 0 ? O.widget.compare(e) : O.widget.constructor == e.constructor && e.updateDOM(O.dom, this.view, O.widget)))
          return s.splice(r, 1), r < this.index[0] && this.index[0]--, O.widget == e && O.length == t && (O.flags & 497) == i ? (this.reused.set(
            O,
            1
            /* Reused.Full */
          ), O) : (this.reused.set(
            O,
            2
            /* Reused.DOM */
          ), new ci(O.dom, t, e, O.flags & -498 | i));
      }
  }
  reuse(e) {
    return this.reused.set(
      e,
      1
      /* Reused.Full */
    ), e;
  }
  maybeReuse(e, t = 2) {
    if (!this.reused.has(e))
      return this.reused.set(e, t), e.dom;
  }
  clear() {
    for (let e = 0; e < this.buckets.length; e++)
      this.buckets[e].length = this.index[e] = 0;
  }
}
class mp {
  constructor(e, t, i, s, r) {
    this.view = e, this.decorations = s, this.disallowBlockEffectsFor = r, this.openWidget = !1, this.openMarks = 0, this.cache = new pp(e), this.text = new dp(e.state.doc), this.builder = new up(this.cache, new fr(e, e.contentDOM), C.iter(i)), this.cache.reused.set(
      t,
      2
      /* Reused.DOM */
    ), this.old = new cp(t), this.reuseWalker = {
      skip: (o, O, a) => {
        if (this.cache.add(o), o.isComposite())
          return !1;
      },
      enter: (o) => this.cache.add(o),
      leave: () => {
      },
      break: () => {
      }
    };
  }
  run(e, t) {
    let i = t && this.getCompositionContext(t.text);
    for (let s = 0, r = 0, o = 0; ; ) {
      let O = o < e.length ? e[o++] : null, a = O ? O.fromA : this.old.root.length;
      if (a > s) {
        let l = a - s;
        this.preserve(l, !o, !O), s = a, r += l;
      }
      if (!O)
        break;
      t && O.fromA <= t.range.fromA && O.toA >= t.range.toA ? (this.forward(O.fromA, t.range.fromA, t.range.fromA < t.range.toA ? 1 : -1), this.emit(r, t.range.fromB), this.builder.flushBuffer(), this.cache.clear(), this.builder.addComposition(t, i), this.text.skip(t.range.toB - t.range.fromB), this.forward(t.range.fromA, O.toA), this.emit(t.range.toB, O.toB)) : (this.forward(O.fromA, O.toA), this.emit(r, O.toB)), r = O.toB, s = O.toA;
    }
    return this.builder.curLine && this.builder.endLine(), this.builder.root;
  }
  preserve(e, t, i) {
    let s = $p(this.old), r = this.openMarks;
    this.old.advance(e, i ? 1 : -1, {
      skip: (o, O, a) => {
        if (o.isWidget())
          if (this.openWidget)
            this.builder.continueWidget(a - O);
          else {
            let l = a > 0 || O < o.length ? ci.of(o.widget, this.view, a - O, o.flags & 496, this.cache.maybeReuse(o)) : this.cache.reuse(o);
            l.flags & 256 ? (l.flags &= -2, this.builder.addBlockWidget(l)) : (this.builder.ensureLine(null), this.builder.addInlineWidget(l, s, r), r = s.length);
          }
        else if (o.isText())
          this.builder.ensureLine(null), !O && a == o.length && !this.cache.reused.has(o) ? this.builder.addText(o.text, s, r, this.cache.reuse(o)) : (this.cache.add(o), this.builder.addText(o.text.slice(O, a), s, r)), r = s.length;
        else if (o.isLine())
          o.flags &= -2, this.cache.reused.set(
            o,
            1
            /* Reused.Full */
          ), this.builder.addLine(o);
        else if (o instanceof _s)
          this.cache.add(o);
        else if (o instanceof ve)
          this.builder.ensureLine(null), this.builder.addMark(o, s, r), this.cache.reused.set(
            o,
            1
            /* Reused.Full */
          ), r = s.length;
        else
          return !1;
        this.openWidget = !1;
      },
      enter: (o) => {
        o.isLine() ? this.builder.addLineStart(o.attrs, this.cache.maybeReuse(o)) : (this.cache.add(o), o instanceof ve && s.unshift(o.mark)), this.openWidget = !1;
      },
      leave: (o) => {
        o.isLine() ? s.length && (s.length = r = 0) : o instanceof ve && (s.shift(), r = Math.min(r, s.length));
      },
      break: () => {
        this.builder.addBreak(), this.openWidget = !1;
      }
    }), this.text.skip(e);
  }
  emit(e, t) {
    let i = null, s = this.builder, r = -1, o = C.spans(this.decorations, e, t, {
      point: (O, a, l, h, c, f) => {
        if (l instanceof li) {
          if (this.disallowBlockEffectsFor[f]) {
            if (l.block)
              throw new RangeError("Block decorations may not be specified via plugins");
            if (a > this.view.state.doc.lineAt(O).to)
              throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
          }
          if (r = h.length, c > h.length)
            s.continueWidget(a - O);
          else {
            let u = l.widget || (l.block ? zi.block : zi.inline), d = gp(l), m = this.cache.findWidget(u, a - O, d) || ci.of(u, this.view, a - O, d);
            l.block ? (l.startSide > 0 && s.addLineStartIfNotCovered(i), s.addBlockWidget(m)) : (s.ensureLine(i), s.addInlineWidget(m, h, c));
          }
          i = null;
        } else
          i = Qp(i, l);
        a > O && this.text.skip(a - O);
      },
      span: (O, a, l, h) => {
        for (let c = O; c < a; ) {
          let f = this.text.next(Math.min(512, a - c));
          f == null ? (s.addLineStartIfNotCovered(i), s.addBreak(), c++) : (s.ensureLine(i), s.addText(f, l, c == O ? h : l.length), c += f.length), i = null;
        }
        r = l.length;
      }
    });
    r > -1 && (this.openWidget = o > r), this.openWidget || s.addLineStartIfNotCovered(i), this.openMarks = o;
  }
  forward(e, t, i = 1) {
    t - e <= 10 ? this.old.advance(t - e, i, this.reuseWalker) : (this.old.advance(5, -1, this.reuseWalker), this.old.advance(t - e - 10, -1), this.old.advance(5, i, this.reuseWalker));
  }
  getCompositionContext(e) {
    let t = [], i = null;
    for (let s = e.parentNode; ; s = s.parentNode) {
      let r = K.get(s);
      if (s == this.view.contentDOM)
        break;
      r instanceof ve ? t.push(r) : r != null && r.isLine() ? i = r : r instanceof bt || (s.nodeName == "DIV" && !i && s != this.view.contentDOM ? i = new Vi(s, Tc) : i || t.push(ve.of(new zn({ tagName: s.nodeName.toLowerCase(), attributes: Ld(s) }), s)));
    }
    return { line: i, marks: t };
  }
}
function Ea(n, e) {
  let t = (i) => {
    for (let s of i.children)
      if ((e ? s.isText() : s.length) || t(s))
        return !0;
    return !1;
  };
  return t(n);
}
function gp(n) {
  let e = n.isReplace ? (n.startSide < 0 ? 64 : 0) | (n.endSide > 0 ? 128 : 0) : n.startSide > 0 ? 32 : 16;
  return n.block && (e |= 256), e;
}
const Tc = { class: "cm-line" };
function Qp(n, e) {
  let t = e.spec.attributes, i = e.spec.class;
  return !t && !i || (n || (n = { class: "cm-line" }), t && bO(t, n), i && (n.class += " " + i)), n;
}
function $p(n) {
  let e = [];
  for (let t = n.parents.length; t > 1; t--) {
    let i = t == n.parents.length ? n.tile : n.parents[t].tile;
    i instanceof ve && e.push(i.mark);
  }
  return e;
}
function qr(n) {
  let e = K.get(n);
  return e && e.setDOM(n.cloneNode()), n;
}
class zi extends Pt {
  constructor(e) {
    super(), this.tag = e;
  }
  eq(e) {
    return e.tag == this.tag;
  }
  toDOM() {
    return document.createElement(this.tag);
  }
  updateDOM(e) {
    return e.nodeName.toLowerCase() == this.tag;
  }
  get isHidden() {
    return !0;
  }
}
zi.inline = /* @__PURE__ */ new zi("span");
zi.block = /* @__PURE__ */ new zi("div");
const Vr = /* @__PURE__ */ new class extends Pt {
  toDOM() {
    return document.createElement("br");
  }
  get isHidden() {
    return !0;
  }
  get editable() {
    return !0;
  }
}();
class Ma {
  constructor(e) {
    this.view = e, this.decorations = [], this.blockWrappers = [], this.dynamicDecorationMap = [!1], this.domChanged = null, this.hasComposition = null, this.editContextFormatting = Y.none, this.lastCompositionAfterCursor = !1, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.updateDeco(), this.tile = new fr(e, e.contentDOM), this.updateInner([new Me(0, 0, 0, e.state.doc.length)], null);
  }
  // Update the document view to a given state.
  update(e) {
    var t;
    let i = e.changedRanges;
    this.minWidth > 0 && i.length && (i.every(({ fromA: h, toA: c }) => c < this.minWidthFrom || h > this.minWidthTo) ? (this.minWidthFrom = e.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = e.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(e);
    let s = -1;
    this.view.inputState.composing >= 0 && !this.view.observer.editContext && (!((t = this.domChanged) === null || t === void 0) && t.newSel ? s = this.domChanged.newSel.head : !Zp(e.changes, this.hasComposition) && !e.selectionSet && (s = e.state.selection.main.head));
    let r = s > -1 ? Sp(this.view, e.changes, s) : null;
    if (this.domChanged = null, this.hasComposition) {
      let { from: h, to: c } = this.hasComposition;
      i = new Me(h, c, e.changes.mapPos(h, -1), e.changes.mapPos(c, 1)).addToSet(i.slice());
    }
    this.hasComposition = r ? { from: r.range.fromB, to: r.range.toB } : null, (k.ie || k.chrome) && !r && e && e.state.doc.lines != e.startState.doc.lines && (this.forceSelection = !0);
    let o = this.decorations, O = this.blockWrappers;
    this.updateDeco();
    let a = bp(o, this.decorations, e.changes);
    a.length && (i = Me.extendWithRanges(i, a));
    let l = wp(O, this.blockWrappers, e.changes);
    return l.length && (i = Me.extendWithRanges(i, l)), r && !i.some((h) => h.fromA <= r.range.fromA && h.toA >= r.range.toA) && (i = r.range.addToSet(i.slice())), this.tile.flags & 2 && i.length == 0 ? !1 : (this.updateInner(i, r), e.transactions.length && (this.lastUpdate = Date.now()), !0);
  }
  // Used by update and the constructor do perform the actual DOM
  // update
  updateInner(e, t) {
    this.view.viewState.mustMeasureContent = !0;
    let { observer: i } = this.view;
    i.ignore(() => {
      if (t || e.length) {
        let o = this.tile, O = new mp(this.view, o, this.blockWrappers, this.decorations, this.dynamicDecorationMap);
        t && K.get(t.text) && O.cache.reused.set(
          K.get(t.text),
          2
          /* Reused.DOM */
        ), this.tile = O.run(e, t), Co(o, O.cache.reused);
      }
      this.tile.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.tile.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
      let r = k.chrome || k.ios ? { node: i.selectionRange.focusNode, written: !1 } : void 0;
      this.tile.sync(r), r && (r.written || i.selectionRange.focusNode != r.node || !this.tile.dom.contains(r.node)) && (this.forceSelection = !0), this.tile.dom.style.height = "";
    });
    let s = [];
    if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
      for (let r of this.tile.children)
        r.isWidget() && r.widget instanceof zr && s.push(r.dom);
    i.updateGaps(s);
  }
  updateEditContextFormatting(e) {
    this.editContextFormatting = this.editContextFormatting.map(e.changes);
    for (let t of e.transactions)
      for (let i of t.effects)
        i.is(yc) && (this.editContextFormatting = i.value);
  }
  // Sync the DOM selection to this.state.selection
  updateSelection(e = !1, t = !1) {
    (e || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
    let { dom: i } = this.tile, s = this.view.root.activeElement, r = s == i, o = !r && !(this.view.state.facet(Xt) || i.tabIndex > -1) && ln(i, this.view.observer.selectionRange) && !(s && i.contains(s));
    if (!(r || t || o))
      return;
    let O = this.forceSelection;
    this.forceSelection = !1;
    let a = this.view.state.selection.main, l, h;
    if (a.empty ? h = l = this.inlineDOMNearPos(a.anchor, a.assoc || 1) : (h = this.inlineDOMNearPos(a.head, a.head == a.from ? 1 : -1), l = this.inlineDOMNearPos(a.anchor, a.anchor == a.from ? 1 : -1)), k.gecko && a.empty && !this.hasComposition && Pp(l)) {
      let f = document.createTextNode("");
      this.view.observer.ignore(() => l.node.insertBefore(f, l.node.childNodes[l.offset] || null)), l = h = new Ne(f, 0), O = !0;
    }
    let c = this.view.observer.selectionRange;
    (O || !c.focusNode || (!hn(l.node, l.offset, c.anchorNode, c.anchorOffset) || !hn(h.node, h.offset, c.focusNode, c.focusOffset)) && !this.suppressWidgetCursorChange(c, a)) && (this.view.observer.ignore(() => {
      k.android && k.chrome && i.contains(c.focusNode) && kp(c.focusNode, i) && (i.blur(), i.focus({ preventScroll: !0 }));
      let f = Pn(this.view.root);
      if (f) if (a.empty) {
        if (k.gecko) {
          let u = xp(l.node, l.offset);
          if (u && u != 3) {
            let d = (u == 1 ? lc : hc)(l.node, l.offset);
            d && (l = new Ne(d.node, d.offset));
          }
        }
        f.collapse(l.node, l.offset), a.bidiLevel != null && f.caretBidiLevel !== void 0 && (f.caretBidiLevel = a.bidiLevel);
      } else if (f.extend) {
        f.collapse(l.node, l.offset);
        try {
          f.extend(h.node, h.offset);
        } catch {
        }
      } else {
        let u = document.createRange();
        a.anchor > a.head && ([l, h] = [h, l]), u.setEnd(h.node, h.offset), u.setStart(l.node, l.offset), f.removeAllRanges(), f.addRange(u);
      }
      o && this.view.root.activeElement == i && (i.blur(), s && s.focus());
    }), this.view.observer.setSelectionRange(l, h)), this.impreciseAnchor = l.precise ? null : new Ne(c.anchorNode, c.anchorOffset), this.impreciseHead = h.precise ? null : new Ne(c.focusNode, c.focusOffset);
  }
  // If a zero-length widget is inserted next to the cursor during
  // composition, avoid moving it across it and disrupting the
  // composition.
  suppressWidgetCursorChange(e, t) {
    return this.hasComposition && t.empty && hn(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset) && this.posFromDOM(e.focusNode, e.focusOffset) == t.head;
  }
  enforceCursorAssoc() {
    if (this.hasComposition)
      return;
    let { view: e } = this, t = e.state.selection.main, i = Pn(e.root), { anchorNode: s, anchorOffset: r } = e.observer.selectionRange;
    if (!i || !t.empty || !t.assoc || !i.modify)
      return;
    let o = this.lineAt(t.head, t.assoc);
    if (!o)
      return;
    let O = o.posAtStart;
    if (t.head == O || t.head == O + o.length)
      return;
    let a = this.coordsAt(t.head, -1), l = this.coordsAt(t.head, 1);
    if (!a || !l || a.bottom > l.top)
      return;
    let h = this.domAtPos(t.head + t.assoc, t.assoc);
    i.collapse(h.node, h.offset), i.modify("move", t.assoc < 0 ? "forward" : "backward", "lineboundary"), e.observer.readSelectionRange();
    let c = e.observer.selectionRange;
    e.docView.posFromDOM(c.anchorNode, c.anchorOffset) != t.from && i.collapse(s, r);
  }
  posFromDOM(e, t) {
    let i = this.tile.nearest(e);
    if (!i)
      return this.tile.dom.compareDocumentPosition(e) & 2 ? 0 : this.view.state.doc.length;
    let s = i.posAtStart;
    if (i.isComposite()) {
      let r;
      if (e == i.dom)
        r = i.dom.childNodes[t];
      else {
        let o = kt(e) == 0 ? 0 : t == 0 ? -1 : 1;
        for (; ; ) {
          let O = e.parentNode;
          if (O == i.dom)
            break;
          o == 0 && O.firstChild != O.lastChild && (e == O.firstChild ? o = -1 : o = 1), e = O;
        }
        o < 0 ? r = e : r = e.nextSibling;
      }
      if (r == i.dom.firstChild)
        return s;
      for (; r && !K.get(r); )
        r = r.nextSibling;
      if (!r)
        return s + i.length;
      for (let o = 0, O = s; ; o++) {
        let a = i.children[o];
        if (a.dom == r)
          return O;
        O += a.length + a.breakAfter;
      }
    } else return i.isText() ? e == i.dom ? s + t : s + (t ? i.length : 0) : s;
  }
  domAtPos(e, t) {
    let { tile: i, offset: s } = this.tile.resolveBlock(e, t);
    return i.isWidget() ? i.domPosFor(s, t) : i.domIn(s, t);
  }
  inlineDOMNearPos(e, t) {
    let i, s = -1, r = !1, o, O = -1, a = !1;
    return this.tile.blockTiles((l, h) => {
      if (l.isWidget()) {
        if (l.flags & 32 && h >= e)
          return !0;
        l.flags & 16 && (r = !0);
      } else {
        let c = h + l.length;
        if (h <= e && (i = l, s = e - h, r = c < e), c >= e && !o && (o = l, O = e - h, a = h > e), h > e && o)
          return !0;
      }
    }), !i && !o ? this.domAtPos(e, t) : (r && o ? i = null : a && i && (o = null), i && t < 0 || !o ? i.domIn(s, t) : o.domIn(O, t));
  }
  // Get the coord of the element at the given side of the given
  // position. If rtl is given, flatten it using that text direction.
  coordsAt(e, t, i) {
    let { tile: s, offset: r } = this.tile.resolveBlock(e, t);
    return s.isWidget() ? s.widget instanceof zr ? null : s.coordsInWidget(r, t, !0) : s.coordsIn(r, t, i);
  }
  lineAt(e, t) {
    let { tile: i } = this.tile.resolveBlock(e, t);
    return i.isLine() ? i : null;
  }
  coordsForChar(e) {
    let { tile: t, offset: i } = this.tile.resolveBlock(e, 1);
    if (!t.isLine())
      return null;
    function s(r, o) {
      if (r.isComposite())
        for (let O of r.children) {
          if (O.length >= o) {
            let a = s(O, o);
            if (a)
              return a;
          }
          if (o -= O.length, o < 0)
            break;
        }
      else if (r.isText() && o < r.length) {
        let O = le(r.text, o);
        if (O == o)
          return null;
        let a = Sn(r.dom, o, O).getClientRects();
        for (let l = 0; l < a.length; l++) {
          let h = a[l];
          if (l == a.length - 1 || h.top < h.bottom && h.left < h.right)
            return h;
        }
      }
      return null;
    }
    return s(t, i);
  }
  measureVisibleLineHeights(e) {
    let t = [], { from: i, to: s } = e, r = this.view.contentDOM.clientWidth, o = r > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, O = -1, a = this.view.textDirection == I.LTR, l = 0, h = (c, f, u) => {
      for (let d = 0; d < c.children.length && !(f > s); d++) {
        let m = c.children[d], g = f + m.length, Q = m.dom.getBoundingClientRect(), { height: x } = Q;
        if (u && !d && (l += Q.top - u.top), m instanceof bt)
          g > i && h(m, f, Q);
        else if (f >= i && (l > 0 && t.push(-l), t.push(x + l), l = 0, o)) {
          let S = m.dom.lastChild, T = S ? Ps(S) : [];
          if (T.length) {
            let X = T[T.length - 1], b = a ? X.right - Q.left : Q.right - X.left;
            b > O && (O = b, this.minWidth = r, this.minWidthFrom = f, this.minWidthTo = g);
          }
        }
        u && d == c.children.length - 1 && (l += u.bottom - Q.bottom), f = g + m.breakAfter;
      }
    };
    return h(this.tile, 0, null), t;
  }
  textDirectionAt(e) {
    let { tile: t } = this.tile.resolveBlock(e, 1);
    return getComputedStyle(t.dom).direction == "rtl" ? I.RTL : I.LTR;
  }
  measureTextSize() {
    let e = this.tile.blockTiles((o) => {
      if (o.isLine() && o.children.length && o.length <= 20) {
        let O = 0, a;
        for (let l of o.children) {
          if (!l.isText() || /[^ -~]/.test(l.text))
            return;
          let h = Ps(l.dom);
          if (h.length != 1)
            return;
          O += h[0].width, a = h[0].height;
        }
        if (O)
          return {
            lineHeight: o.dom.getBoundingClientRect().height,
            charWidth: O / o.length,
            textHeight: a
          };
      }
    });
    if (e)
      return e;
    let t = document.createElement("div"), i, s, r;
    return t.className = "cm-line", t.style.width = "99999px", t.style.position = "absolute", t.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
      this.tile.dom.appendChild(t);
      let o = Ps(t.firstChild)[0];
      i = t.getBoundingClientRect().height, s = o && o.width ? o.width / 27 : 7, r = o && o.height ? o.height : i, t.remove();
    }), { lineHeight: i, charWidth: s, textHeight: r };
  }
  computeBlockGapDeco() {
    let e = [], t = this.view.viewState;
    for (let i = 0, s = 0; ; s++) {
      let r = s == t.viewports.length ? null : t.viewports[s], o = r ? r.from - 1 : this.view.state.doc.length;
      if (o > i) {
        let O = (t.lineBlockAt(o).bottom - t.lineBlockAt(i).top) / this.view.scaleY;
        e.push(Y.replace({
          widget: new zr(O),
          block: !0,
          inclusive: !0,
          isBlockGap: !0
        }).range(i, o));
      }
      if (!r)
        break;
      i = r.to + 1;
    }
    return Y.set(e);
  }
  updateDeco() {
    let e = 1, t = this.view.state.facet(hr).map((r) => (this.dynamicDecorationMap[e++] = typeof r == "function") ? r(this.view) : r), i = !1, s = this.view.state.facet(TO).map((r, o) => {
      let O = typeof r == "function";
      return O && (i = !0), O ? r(this.view) : r;
    });
    for (s.length && (this.dynamicDecorationMap[e++] = i, t.push(C.join(s))), this.decorations = [
      this.editContextFormatting,
      ...t,
      this.computeBlockGapDeco(),
      this.view.viewState.lineGapDeco
    ]; e < this.decorations.length; )
      this.dynamicDecorationMap[e++] = !1;
    this.blockWrappers = this.view.state.facet(kc).map((r) => typeof r == "function" ? r(this.view) : r);
  }
  scrollIntoView(e) {
    if (e.isSnapshot) {
      let l = this.view.viewState.lineBlockAt(e.range.head);
      this.view.scrollDOM.scrollTop = l.top - e.yMargin, this.view.scrollDOM.scrollLeft = e.xMargin;
      return;
    }
    for (let l of this.view.state.facet(bc))
      try {
        if (l(this.view, e.range, e))
          return !0;
      } catch (h) {
        Te(this.view.state, h, "scroll handler");
      }
    let { range: t } = e, i = this.coordsAt(t.head, t.assoc || (t.head > t.anchor ? -1 : 1)), s;
    if (!i)
      return;
    !t.empty && (s = this.coordsAt(t.anchor, t.anchor > t.head ? -1 : 1)) && (i = {
      left: Math.min(i.left, s.left),
      top: Math.min(i.top, s.top),
      right: Math.max(i.right, s.right),
      bottom: Math.max(i.bottom, s.bottom)
    });
    let r = UO(this.view), o = {
      left: i.left - r.left,
      top: i.top - r.top,
      right: i.right + r.right,
      bottom: i.bottom + r.bottom
    }, { offsetWidth: O, offsetHeight: a } = this.view.scrollDOM;
    if (Bd(this.view.scrollDOM, o, t.head < t.anchor ? -1 : 1, e.x, e.y, Math.max(Math.min(e.xMargin, O), -O), Math.max(Math.min(e.yMargin, a), -a), this.view.textDirection == I.LTR), window.visualViewport && window.innerHeight - window.visualViewport.height > 1 && (i.top > window.visualViewport.offsetTop + window.visualViewport.height || i.bottom < window.visualViewport.offsetTop)) {
      let l = this.view.docView.lineAt(t.head, 1);
      if (l) {
        let h = rc(l.dom);
        l.dom.scrollIntoView({ block: "nearest" }), oc(h, !1);
      }
    }
  }
  lineHasWidget(e) {
    let t = (i) => i.isWidget() || i.children.some(t);
    return t(this.tile.resolveBlock(e, 1).tile);
  }
  destroy() {
    Co(this.tile);
  }
}
function Co(n, e) {
  let t = e == null ? void 0 : e.get(n);
  if (t != 1) {
    t == null && n.destroy();
    for (let i of n.children)
      Co(i, e);
  }
}
function Pp(n) {
  return n.node.nodeType == 1 && n.node.firstChild && (n.offset == 0 || n.node.childNodes[n.offset - 1].contentEditable == "false") && (n.offset == n.node.childNodes.length || n.node.childNodes[n.offset].contentEditable == "false");
}
function Uc(n, e) {
  let t = n.observer.selectionRange;
  if (!t.focusNode)
    return null;
  let i = lc(t.focusNode, t.focusOffset), s = hc(t.focusNode, t.focusOffset), r = i || s;
  if (s && i && s.node != i.node) {
    let O = K.get(s.node);
    if (!O || O.isText() && O.text != s.node.nodeValue)
      r = s;
    else if (n.docView.lastCompositionAfterCursor) {
      let a = K.get(i.node);
      !a || a.isText() && a.text != i.node.nodeValue || (r = s);
    }
  }
  if (n.docView.lastCompositionAfterCursor = r != i, !r)
    return null;
  let o = e - r.offset;
  return { from: o, to: o + r.node.nodeValue.length, node: r.node };
}
function Sp(n, e, t) {
  let i = Uc(n, t);
  if (!i)
    return null;
  let { node: s, from: r, to: o } = i, O = s.nodeValue;
  if (/[\n\r]/.test(O) || n.state.doc.sliceString(i.from, i.to) != O)
    return null;
  let a = e.invertedDesc;
  return { range: new Me(a.mapPos(r), a.mapPos(o), r, o), text: s };
}
function xp(n, e) {
  return n.nodeType != 1 ? 0 : (e && n.childNodes[e - 1].contentEditable == "false" ? 1 : 0) | (e < n.childNodes.length && n.childNodes[e].contentEditable == "false" ? 2 : 0);
}
let Xp = class {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    ki(e, t, this.changes);
  }
  comparePoint(e, t) {
    ki(e, t, this.changes);
  }
  boundChange(e) {
    ki(e, e, this.changes);
  }
};
function bp(n, e, t) {
  let i = new Xp();
  return C.compare(n, e, t, i), i.changes;
}
class yp {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    ki(e, t, this.changes);
  }
  comparePoint() {
  }
  boundChange(e) {
    ki(e, e, this.changes);
  }
}
function wp(n, e, t) {
  let i = new yp();
  return C.compare(n, e, t, i), i.changes;
}
function kp(n, e) {
  for (let t = n; t && t != e; t = t.assignedSlot || t.parentNode)
    if (t.nodeType == 1 && t.contentEditable == "false")
      return !0;
  return !1;
}
function Zp(n, e) {
  let t = !1;
  return e && n.iterChangedRanges((i, s) => {
    i < e.to && s > e.from && (t = !0);
  }), t;
}
class zr extends Pt {
  constructor(e) {
    super(), this.height = e;
  }
  toDOM() {
    let e = document.createElement("div");
    return e.className = "cm-gap", this.updateDOM(e), e;
  }
  eq(e) {
    return e.height == this.height;
  }
  updateDOM(e) {
    return e.style.height = this.height + "px", !0;
  }
  get editable() {
    return !0;
  }
  get estimatedHeight() {
    return this.height;
  }
  ignoreEvent() {
    return !1;
  }
}
function vp(n, e, t = 1) {
  let i = n.charCategorizer(e), s = n.doc.lineAt(e), r = e - s.from;
  if (s.length == 0)
    return $.cursor(e);
  r == 0 ? t = 1 : r == s.length && (t = -1);
  let o = r, O = r;
  t < 0 ? o = le(s.text, r, !1) : O = le(s.text, r);
  let a = i(s.text.slice(o, O));
  for (; o > 0; ) {
    let l = le(s.text, o, !1);
    if (i(s.text.slice(l, o)) != a)
      break;
    o = l;
  }
  for (; O < s.length; ) {
    let l = le(s.text, O);
    if (i(s.text.slice(O, l)) != a)
      break;
    O = l;
  }
  return $.undirectionalRange(o + s.from, O + s.from);
}
function Tp(n, e, t, i, s) {
  let r = Math.round((i - e.left) * n.defaultCharacterWidth);
  if (n.lineWrapping && t.height > n.defaultLineHeight * 1.5) {
    let O = n.viewState.heightOracle.textHeight, a = Math.floor((s - t.top - (n.defaultLineHeight - O) * 0.5) / O);
    r += a * n.viewState.heightOracle.lineLength;
  }
  let o = n.state.sliceDoc(t.from, t.to);
  return t.from + wo(o, r, n.state.tabSize);
}
function Wo(n, e, t) {
  let i = n.lineBlockAt(e);
  if (Array.isArray(i.type)) {
    let s;
    for (let r of i.type) {
      if (r.from > e)
        break;
      if (!(r.to < e)) {
        if (r.from < e && r.to > e)
          return r;
        (!s || r.type == pe.Text && (s.type != r.type || (t < 0 ? r.from < e : r.to > e))) && (s = r);
      }
    }
    return s || i;
  }
  return i;
}
function Up(n, e, t, i) {
  let s = Wo(n, e.head, e.assoc || -1), r = !i || s.type != pe.Text || !(n.lineWrapping || s.widgetLineBreaks) ? null : n.coordsAtPos(e.assoc < 0 && e.head > s.from ? e.head - 1 : e.head);
  if (r) {
    let o = n.dom.getBoundingClientRect(), O = n.textDirectionAt(s.from), a = n.posAtCoords({
      x: t == (O == I.LTR) ? o.right - 1 : o.left + 1,
      y: (r.top + r.bottom) / 2
    });
    if (a != null)
      return $.cursor(a, t ? -1 : 1);
  }
  return $.cursor(t ? s.to : s.from, t ? -1 : 1);
}
function Ga(n, e, t, i) {
  let s = n.state.doc.lineAt(e.head), r = n.bidiSpans(s), o = n.textDirectionAt(s.from);
  for (let O = e, a = null; ; ) {
    let l = rp(s, r, o, O, t), h = pc;
    if (!l) {
      if (s.number == (t ? n.state.doc.lines : 1))
        return O;
      h = `
`, s = n.state.doc.line(s.number + (t ? 1 : -1)), r = n.bidiSpans(s), l = n.visualLineSide(s, !t);
    }
    if (a) {
      if (!a(h))
        return O;
    } else {
      if (!i)
        return l;
      a = i(h);
    }
    O = l;
  }
}
function Yp(n, e, t) {
  let i = n.state.charCategorizer(e), s = i(t);
  return (r) => {
    let o = i(r);
    return s == F.Space && (s = o), s == o;
  };
}
function Rp(n, e, t, i) {
  let s = e.head, r = t ? 1 : -1;
  if (s == (t ? n.state.doc.length : 0))
    return $.cursor(s, e.assoc);
  let o = e.goalColumn, O, a = n.contentDOM.getBoundingClientRect(), l = n.coordsAtPos(s, e.assoc || ((e.empty ? t : e.head == e.from) ? 1 : -1)), h = n.documentTop;
  if (l)
    o == null && (o = l.left - a.left), O = r < 0 ? l.top : l.bottom;
  else {
    let d = n.viewState.lineBlockAt(s);
    o == null && (o = Math.min(a.right - a.left, n.defaultCharacterWidth * (s - d.from))), O = (r < 0 ? d.top : d.bottom) + h;
  }
  let c = a.left + o, f = n.viewState.heightOracle.textHeight >> 1, u = i ?? f;
  for (let d = 0; ; d += f) {
    let m = O + (u + d) * r, g = jo(n, { x: c, y: m }, !1, r);
    if (t ? m > a.bottom : m < a.top)
      return $.cursor(g.pos, g.assoc);
    let Q = n.coordsAtPos(g.pos, g.assoc), x = Q ? (Q.top + Q.bottom) / 2 : 0;
    if (!Q || (t ? x > O : x < O))
      return $.cursor(g.pos, g.assoc, void 0, o);
  }
}
function cn(n, e, t) {
  for (; ; ) {
    let i = 0;
    for (let s of n)
      s.between(e - 1, e + 1, (r, o, O) => {
        if (e > r && e < o) {
          let a = i || t || (e - r < o - e ? -1 : 1);
          e = a < 0 ? r : o, i = a;
        }
      });
    if (!i)
      return e;
  }
}
function Yc(n, e) {
  let t = null;
  for (let i = 0; i < e.ranges.length; i++) {
    let s = e.ranges[i], r = null;
    if (s.empty) {
      let o = cn(n, s.from, 0);
      o != s.from && (r = $.cursor(o, -1));
    } else {
      let o = cn(n, s.from, -1), O = cn(n, s.to, 1);
      (o != s.from || O != s.to) && (s.undirectional ? r = $.undirectionalRange(s.from, s.to) : r = $.range(s.from == s.anchor ? o : O, s.from == s.head ? o : O));
    }
    r && (t || (t = e.ranges.slice()), t[i] = r);
  }
  return t ? $.create(t, e.mainIndex) : e;
}
function Cr(n, e, t) {
  let i = cn(n.state.facet(Wn).map((s) => s(n)), t.from, e.head > t.from ? -1 : 1);
  return i == t.from ? t : $.cursor(i, i < t.from ? 1 : -1);
}
class ft {
  constructor(e, t) {
    this.pos = e, this.assoc = t;
  }
}
function jo(n, e, t, i) {
  let s = n.contentDOM.getBoundingClientRect(), r = s.top + n.viewState.paddingTop, { x: o, y: O } = e, a = O - r, l;
  for (; ; ) {
    if (a < 0)
      return new ft(0, 1);
    if (a > n.viewState.docHeight)
      return new ft(n.state.doc.length, -1);
    if (l = n.elementAtHeight(a), i == null)
      break;
    if (l.type == pe.Text) {
      if (i < 0 ? l.to < n.viewport.from : l.from > n.viewport.to)
        break;
      let f = n.docView.coordsAt(i < 0 ? l.from : l.to, i > 0 ? -1 : 1);
      if (f && (i < 0 ? f.top <= a + r : f.bottom >= a + r))
        break;
    }
    let c = n.viewState.heightOracle.textHeight / 2;
    a = i > 0 ? l.bottom + c : l.top - c;
  }
  if (n.viewport.from >= l.to || n.viewport.to <= l.from) {
    if (t)
      return null;
    if (l.type == pe.Text) {
      let c = Tp(n, s, l, o, O);
      return new ft(c, c == l.from ? 1 : -1);
    }
  }
  if (l.type != pe.Text)
    return a < (l.top + l.bottom) / 2 ? new ft(l.from, 1) : new ft(l.to, -1);
  let h = n.docView.lineAt(l.from, 2);
  return (!h || h.length != l.length) && (h = n.docView.lineAt(l.from, -2)), new _p(n, o, O, n.textDirectionAt(l.from)).scanTile(h, l.from);
}
class _p {
  constructor(e, t, i, s) {
    this.view = e, this.x = t, this.y = i, this.baseDir = s, this.line = null, this.spans = null;
  }
  bidiSpansAt(e) {
    return (!this.line || this.line.from > e || this.line.to < e) && (this.line = this.view.state.doc.lineAt(e), this.spans = this.view.bidiSpans(this.line)), this;
  }
  baseDirAt(e, t) {
    let { line: i, spans: s } = this.bidiSpansAt(e);
    return s[ut.find(s, e - i.from, -1, t)].level == this.baseDir;
  }
  dirAt(e, t) {
    let { line: i, spans: s } = this.bidiSpansAt(e);
    return s[ut.find(s, e - i.from, -1, t)].dir;
  }
  // Used to short-circuit bidi tests for content with a uniform direction
  bidiIn(e, t) {
    let { spans: i, line: s } = this.bidiSpansAt(e);
    return i.length > 1 || i.length && (i[0].level != this.baseDir || i[0].to + s.from < t);
  }
  // Scan through the rectangles for the content of a tile with inline
  // content, looking for one that overlaps the queried position
  // vertically and is closest horizontally. The caller is responsible
  // for dividing its content into N pieces, and pass an array with
  // N+1 positions (including the position after the last piece). For
  // a text tile, these will be character clusters, for a composite
  // tile, these will be child tiles.
  scan(e, t, i = !1) {
    let s = 0, r = e.length - 1, o = /* @__PURE__ */ new Set(), O = this.bidiIn(e[0], e[r]), a, l, h = -1, c = 1e9, f;
    e: for (; s < r; ) {
      let d = r - s, m = s + r >> 1;
      t: if (o.has(m)) {
        for (let x = 1; x < d; x++) {
          let S = m + x;
          if (S >= r && (S -= d), !o.has(S)) {
            m = S;
            break t;
          }
        }
        break e;
      }
      o.add(m);
      let g = t(m), Q = 0;
      if (g)
        for (let x = 0; x < g.length; x++) {
          let S = g[x];
          if (!(S.width == 0 && g.length > 1))
            if (S.bottom < this.y)
              (!a || a.bottom < S.bottom) && (a = S), Q = 1;
            else if (S.top > this.y)
              (!l || l.top > S.top) && (l = S), Q = -1;
            else {
              let T = S.left > this.x ? this.x - S.left : S.right < this.x ? this.x - S.right : 0, X = Math.abs(T);
              X < c && (h = m, c = X, f = S), T && (Q = T < 0 == (this.baseDir == I.LTR) ? -1 : 1);
            }
        }
      Q == -1 && (!O || this.baseDirAt(e[m], 1)) ? r = m : Q == 1 && (!O || this.baseDirAt(e[m + 1], -1)) && (s = m + 1);
    }
    if (!f) {
      if (!l && !a)
        return { i: e[0], after: !1 };
      let d = a && (!l || this.y - a.bottom < l.top - this.y) ? a : l;
      return this.y = (d.top + d.bottom) / 2, this.scan(e, t, !0);
    }
    if (c && !i) {
      let { top: d, bottom: m } = f;
      if (a && a.bottom > (d + d + m) / 3)
        return this.y = a.bottom - 1, this.scan(e, t, !0);
      if (l && l.top < (d + m + m) / 3)
        return this.y = l.top + 1, this.scan(e, t, !0);
    }
    let u = (O ? this.dirAt(e[h], 1) : this.baseDir) == I.LTR;
    return {
      i: h,
      // Test whether x is closes to the start or end of this element
      after: this.x > (f.left + f.right) / 2 == u
    };
  }
  scanText(e, t) {
    let i = [];
    for (let r = 0; r < e.length; r = le(e.text, r))
      i.push(t + r);
    i.push(t + e.length);
    let s = this.scan(i, (r) => {
      let o = i[r] - t, O = i[r + 1] - t;
      return Sn(e.dom, o, O).getClientRects();
    });
    return s.after ? new ft(i[s.i + 1], -1) : new ft(i[s.i], 1);
  }
  scanTile(e, t) {
    if (!e.length)
      return new ft(t, 1);
    if (e.children.length == 1) {
      let O = e.children[0];
      if (O.isText())
        return this.scanText(O, t);
      if (O.isComposite())
        return this.scanTile(O, t);
    }
    let i = [t];
    for (let O = 0, a = t; O < e.children.length; O++)
      i.push(a += e.children[O].length);
    let s = this.scan(i, (O) => {
      let a = e.children[O];
      return a.flags & 48 ? null : (a.dom.nodeType == 1 ? a.dom : Sn(a.dom, 0, a.length)).getClientRects();
    }), r = e.children[s.i], o = i[s.i];
    return r.isText() ? this.scanText(r, o) : r.isComposite() ? this.scanTile(r, o) : s.after ? new ft(i[s.i + 1], -1) : new ft(o, 1);
  }
}
const gi = "￿";
class qp {
  constructor(e, t) {
    this.points = e, this.view = t, this.text = "", this.lineSeparator = t.state.facet(A.lineSeparator);
  }
  append(e) {
    this.text += e;
  }
  lineBreak() {
    this.text += gi;
  }
  readRange(e, t) {
    if (!e)
      return this;
    let i = e.parentNode;
    for (let s = e; ; ) {
      this.findPointBefore(i, s);
      let r = this.text.length;
      this.readNode(s);
      let o = K.get(s), O = s.nextSibling;
      if (O == t) {
        o != null && o.breakAfter && !O && i != this.view.contentDOM && this.lineBreak();
        break;
      }
      let a = K.get(O);
      (o && a ? o.breakAfter : (o ? o.breakAfter : Us(s)) || Us(O) && (s.nodeName != "BR" || o != null && o.isWidget()) && this.text.length > r) && !zp(O, t) && this.lineBreak(), s = O;
    }
    return this.findPointBefore(i, t), this;
  }
  readTextNode(e) {
    let t = e.nodeValue;
    for (let i of this.points)
      i.node == e && (i.pos = this.text.length + Math.min(i.offset, t.length));
    for (let i = 0, s = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
      let r = -1, o = 1, O;
      if (this.lineSeparator ? (r = t.indexOf(this.lineSeparator, i), o = this.lineSeparator.length) : (O = s.exec(t)) && (r = O.index, o = O[0].length), this.append(t.slice(i, r < 0 ? t.length : r)), r < 0)
        break;
      if (this.lineBreak(), o > 1)
        for (let a of this.points)
          a.node == e && a.pos > this.text.length && (a.pos -= o - 1);
      i = r + o;
    }
  }
  readNode(e) {
    let t = K.get(e), i = t && t.overrideDOMText;
    if (i != null) {
      this.findPointInside(e, i.length);
      for (let s = i.iter(); !s.next().done; )
        s.lineBreak ? this.lineBreak() : this.append(s.value);
    } else e.nodeType == 3 ? this.readTextNode(e) : e.nodeName == "BR" ? e.nextSibling && this.lineBreak() : e.nodeType == 1 && this.readRange(e.firstChild, null);
  }
  findPointBefore(e, t) {
    for (let i of this.points)
      i.node == e && e.childNodes[i.offset] == t && (i.pos = this.text.length);
  }
  findPointInside(e, t) {
    for (let i of this.points)
      (e.nodeType == 3 ? i.node == e : e.contains(i.node)) && (i.pos = this.text.length + (Vp(e, i.node, i.offset) ? t : 0));
  }
}
function Vp(n, e, t) {
  for (; ; ) {
    if (!e || t < kt(e))
      return !1;
    if (e == n)
      return !0;
    t = Mt(e) + 1, e = e.parentNode;
  }
}
function zp(n, e) {
  let t;
  for (; !(n == e || !n); n = n.nextSibling) {
    let i = K.get(n);
    if (!(i != null && i.isWidget()))
      return !1;
    i && (t || (t = [])).push(i);
  }
  if (t)
    for (let i of t) {
      let s = i.overrideDOMText;
      if (s != null && s.length)
        return !1;
    }
  return !0;
}
class La {
  constructor(e, t) {
    this.node = e, this.offset = t, this.pos = -1;
  }
}
class Cp {
  constructor(e, t, i, s) {
    this.typeOver = s, this.bounds = null, this.text = "", this.domChanged = t > -1;
    let { impreciseHead: r, impreciseAnchor: o } = e.docView, O = e.state.selection;
    if (e.state.readOnly && t > -1)
      this.newSel = null;
    else if (t > -1 && (this.bounds = Rc(e.docView.tile, t, i, 0))) {
      let a = r || o ? [] : jp(e), l = new qp(a, e);
      l.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = l.text, this.newSel = Ap(a, this.bounds.from);
    } else {
      let a = e.observer.selectionRange, l = r && r.node == a.focusNode && r.offset == a.focusOffset || !Ro(e.contentDOM, a.focusNode) ? O.main.head : e.docView.posFromDOM(a.focusNode, a.focusOffset), h = o && o.node == a.anchorNode && o.offset == a.anchorOffset || !Ro(e.contentDOM, a.anchorNode) ? O.main.anchor : e.docView.posFromDOM(a.anchorNode, a.anchorOffset), c = e.viewport;
      if ((k.ios || k.chrome) && l != h && Math.min(l, h) <= O.main.from && Math.max(l, h) >= O.main.to && (c.from > 0 || c.to < e.state.doc.length)) {
        let f = Math.min(l, h), u = Math.max(l, h), d = c.from - f, m = c.to - u;
        (d == 0 || d == 1 || f == 0) && (m == 0 || m == -1 || u == e.state.doc.length) && (l = 0, h = e.state.doc.length);
      }
      if (e.inputState.composing > -1 && O.ranges.length > 1)
        this.newSel = O.replaceRange($.range(h, l));
      else if (e.lineWrapping && h == l && !(O.main.empty && O.main.head == l) && e.inputState.lastTouchTime > Date.now() - 100) {
        let f = e.coordsAtPos(l, -1), u = 0;
        f && (u = e.inputState.lastTouchY <= f.bottom ? -1 : 1), this.newSel = $.create([$.cursor(l, u)]);
      } else
        this.newSel = $.single(h, l);
    }
  }
}
function Rc(n, e, t, i) {
  if (n.isComposite()) {
    let s = -1, r = -1, o = -1, O = -1;
    for (let a = 0, l = i, h = i; a < n.children.length; a++) {
      let c = n.children[a], f = l + c.length;
      if (l < e && f > t)
        return Rc(c, e, t, l);
      if (f >= e && s == -1 && (s = a, r = l), l > t && c.dom.parentNode == n.dom) {
        o = a, O = h;
        break;
      }
      h = f, l = f + c.breakAfter;
    }
    return {
      from: r,
      to: O < 0 ? i + n.length : O,
      startDOM: (s ? n.children[s - 1].dom.nextSibling : null) || n.dom.firstChild,
      endDOM: o < n.children.length && o >= 0 ? n.children[o].dom : null
    };
  } else return n.isText() ? { from: i, to: i + n.length, startDOM: n.dom, endDOM: n.dom.nextSibling } : null;
}
function _c(n, e) {
  let t, { newSel: i } = e, { state: s } = n, r = s.selection.main, o = n.inputState.lastKeyTime > Date.now() - 100 ? n.inputState.lastKeyCode : -1;
  if (e.bounds) {
    let { from: O, to: a } = e.bounds, l = r.from, h = null;
    (o === 8 || k.android && e.text.length < a - O) && (l = r.to, h = "end");
    let c = s.doc.sliceString(O, a, gi), f, u;
    !r.empty && r.from >= O && r.to <= a && (e.typeOver || c != e.text) && c.slice(0, r.from - O) == e.text.slice(0, r.from - O) && c.slice(r.to - O) == e.text.slice(f = e.text.length - (c.length - (r.to - O))) ? t = {
      from: r.from,
      to: r.to,
      insert: j.of(e.text.slice(r.from - O, f).split(gi))
    } : (u = qc(c, e.text, l - O, h)) && (k.chrome && o == 13 && u.toB == u.from + 2 && e.text.slice(u.from, u.toB) == gi + gi && u.toB--, t = {
      from: O + u.from,
      to: O + u.toA,
      insert: j.of(e.text.slice(u.from, u.toB).split(gi))
    });
  } else i && (!n.hasFocus && s.facet(Xt) || Vs(i, r)) && (i = null);
  if (!t && !i)
    return !1;
  if ((k.mac || k.android) && t && t.from == t.to && t.from == r.head - 1 && /^\. ?$/.test(t.insert.toString()) && n.contentDOM.getAttribute("autocorrect") == "off" ? (i && t.insert.length == 2 && (i = $.single(i.main.anchor - 1, i.main.head - 1)), t = { from: t.from, to: t.to, insert: j.of([t.insert.toString().replace(".", " ")]) }) : s.doc.lineAt(r.from).to < r.to && n.docView.lineHasWidget(r.to) && n.inputState.insertingTextAt > Date.now() - 50 ? t = {
    from: r.from,
    to: r.to,
    insert: s.toText(n.inputState.insertingText)
  } : k.chrome && t && t.from == t.to && t.from == r.head && t.insert.toString() == `
 ` && n.lineWrapping && (i && (i = $.single(i.main.anchor - 1, i.main.head - 1)), t = { from: r.from, to: r.to, insert: j.of([" "]) }), t)
    return YO(n, t, i, o);
  if (i && !Vs(i, r)) {
    let O = !1, a = "select";
    return n.inputState.lastSelectionTime > Date.now() - 50 && (n.inputState.lastSelectionOrigin == "select" && (O = !0), a = n.inputState.lastSelectionOrigin, a == "select.pointer" && (i = Yc(s.facet(Wn).map((l) => l(n)), i))), n.dispatch({ selection: i, scrollIntoView: O, userEvent: a }), !0;
  } else
    return !1;
}
function YO(n, e, t, i = -1) {
  if (k.ios && n.inputState.flushIOSKey(e))
    return !0;
  let s = n.state.selection.main;
  if (k.android && (e.to == s.to && // GBoard will sometimes remove a space it just inserted
  // after a completion when you press enter
  (e.from == s.from || e.from == s.from - 1 && n.state.sliceDoc(e.from, s.from) == " ") && e.insert.length == 1 && e.insert.lines == 2 && Zi(n.contentDOM, "Enter", 13) || (e.from == s.from - 1 && e.to == s.to && e.insert.length == 0 || i == 8 && e.insert.length < e.to - e.from && e.to > s.head) && Zi(n.contentDOM, "Backspace", 8) || e.from == s.from && e.to == s.to + 1 && e.insert.length == 0 && Zi(n.contentDOM, "Delete", 46)))
    return !0;
  let r = e.insert.toString();
  n.inputState.composing >= 0 && n.inputState.composing++;
  let o, O = () => o || (o = Wp(n, e, t));
  return n.state.facet(Pc).some((a) => a(n, e.from, e.to, r, O)) || n.dispatch(O()), !0;
}
function Wp(n, e, t) {
  let i, s = n.state, r = s.selection.main, o = -1;
  if (e.from == e.to && e.from < r.from || e.from > r.to) {
    let a = e.from < r.from ? -1 : 1, l = a < 0 ? r.from : r.to, h = cn(s.facet(Wn).map((c) => c(n)), l, a);
    e.from == h && (o = h);
  }
  if (o > -1)
    i = {
      changes: e,
      selection: $.cursor(e.from + e.insert.length, -1)
    };
  else if (e.from >= r.from && e.to <= r.to && e.to - e.from >= (r.to - r.from) / 3 && (!t || t.main.empty && t.main.from == e.from + e.insert.length) && n.inputState.composing < 0) {
    let a = r.from < e.from ? s.sliceDoc(r.from, e.from) : "", l = r.to > e.to ? s.sliceDoc(e.to, r.to) : "";
    i = s.replaceSelection(n.state.toText(a + e.insert.sliceString(0, void 0, n.state.lineBreak) + l));
  } else {
    let a = s.changes(e), l = t && t.main.to <= a.newLength ? t.main : void 0;
    if (s.selection.ranges.length > 1 && (n.inputState.composing >= 0 || n.inputState.compositionPendingChange) && e.to <= r.to + 10 && e.to >= r.to - 10) {
      let h = n.state.sliceDoc(e.from, e.to), c, f = t && Uc(n, t.main.head);
      if (f) {
        let d = e.insert.length - (e.to - e.from);
        c = { from: f.from, to: f.to - d };
      } else
        c = n.state.doc.lineAt(r.head);
      let u = r.to - e.to;
      i = s.changeByRange((d) => {
        if (d.from == r.from && d.to == r.to)
          return { changes: a, range: l || d.map(a) };
        let m = d.to - u, g = m - h.length;
        if (n.state.sliceDoc(g, m) != h || // Unfortunately, there's no way to make multiple
        // changes in the same node work without aborting
        // composition, so cursors in the composition range are
        // ignored.
        m >= c.from && g <= c.to)
          return { range: d };
        let Q = s.changes({ from: g, to: m, insert: e.insert }), x = d.to - r.to;
        return {
          changes: Q,
          range: l ? $.range(Math.max(0, l.anchor + x), Math.max(0, l.head + x)) : d.map(Q)
        };
      });
    } else
      i = {
        changes: a,
        selection: l && s.selection.replaceRange(l)
      };
  }
  let O = "input.type";
  return (n.composing || n.inputState.compositionPendingChange && n.inputState.compositionEndedAt > Date.now() - 50) && (n.inputState.compositionPendingChange = !1, O += ".compose", n.inputState.compositionFirstChange && (O += ".start", n.inputState.compositionFirstChange = !1)), s.update(i, { userEvent: O, scrollIntoView: !0 });
}
function qc(n, e, t, i) {
  let s = Math.min(n.length, e.length), r = 0;
  for (; r < s && n.charCodeAt(r) == e.charCodeAt(r); )
    r++;
  if (r == s && n.length == e.length)
    return null;
  let o = n.length, O = e.length;
  for (; o > 0 && O > 0 && n.charCodeAt(o - 1) == e.charCodeAt(O - 1); )
    o--, O--;
  if (i == "end") {
    let a = Math.max(0, r - Math.min(o, O));
    t -= o + a - r;
  }
  if (o < r && n.length < e.length) {
    let a = t <= r && t >= o ? r - t : 0;
    r -= a, O = r + (O - o), o = r;
  } else if (O < r) {
    let a = t <= r && t >= O ? r - t : 0;
    r -= a, o = r + (o - O), O = r;
  }
  return { from: r, toA: o, toB: O };
}
function jp(n) {
  let e = [];
  if (n.root.activeElement != n.contentDOM)
    return e;
  let { anchorNode: t, anchorOffset: i, focusNode: s, focusOffset: r } = n.observer.selectionRange;
  return t && (e.push(new La(t, i)), (s != t || r != i) && e.push(new La(s, r))), e;
}
function Ap(n, e) {
  if (n.length == 0)
    return null;
  let t = n[0].pos, i = n.length == 2 ? n[1].pos : t;
  return t > -1 && i > -1 ? $.single(t + e, i + e) : null;
}
function Vs(n, e) {
  return e.head == n.main.head && e.anchor == n.main.anchor;
}
class Ep {
  setSelectionOrigin(e) {
    this.lastSelectionOrigin = e, this.lastSelectionTime = Date.now();
  }
  constructor(e) {
    this.view = e, this.lastKeyCode = 0, this.lastKeyTime = 0, this.touchActive = !1, this.lastTouchTime = 0, this.lastTouchX = 0, this.lastTouchY = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.lastWheelEvent = 0, this.pendingIOSKey = void 0, this.lastIOSMomentumScroll = 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = /* @__PURE__ */ Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = !1, this.compositionPendingChange = !1, this.insertingText = "", this.insertingTextAt = 0, this.mouseSelection = null, this.draggedContent = null, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = e.hasFocus, k.safari && e.contentDOM.addEventListener("input", () => null), k.gecko && sm(e.contentDOM.ownerDocument);
  }
  handleEvent(e) {
    !Hp(this.view, e) || this.ignoreDuringComposition(e) || e.type == "keydown" && this.keydown(e) || (this.view.updateState != 0 ? Promise.resolve().then(() => this.runHandlers(e.type, e)) : this.runHandlers(e.type, e));
  }
  runHandlers(e, t) {
    let i = this.handlers[e];
    if (i) {
      for (let s of i.observers)
        s(this.view, t);
      for (let s of i.handlers) {
        if (t.defaultPrevented)
          break;
        if (s(this.view, t)) {
          t.preventDefault();
          break;
        }
      }
    }
  }
  ensureHandlers(e) {
    let t = Gp(e), i = this.handlers, s = this.view.contentDOM;
    for (let r in t)
      if (r != "scroll") {
        let o = !t[r].handlers.length, O = i[r];
        O && o != !O.handlers.length && (s.removeEventListener(r, this.handleEvent), O = null), O || s.addEventListener(r, this.handleEvent, { passive: o });
      }
    for (let r in i)
      r != "scroll" && !t[r] && s.removeEventListener(r, this.handleEvent);
    this.handlers = t;
  }
  keydown(e) {
    if (this.lastKeyCode = e.keyCode, this.lastKeyTime = Date.now(), e.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode))
      return !0;
    if (this.tabFocusMode > 0 && e.keyCode != 27 && zc.indexOf(e.keyCode) < 0 && (this.tabFocusMode = -1), k.android && k.chrome && !e.synthetic && (e.keyCode == 13 || e.keyCode == 8))
      return this.view.observer.delayAndroidKey(e.key, e.keyCode), !0;
    if (k.ios && !e.synthetic && !e.altKey && !e.metaKey && (Vc.some((t) => t.keyCode == e.keyCode) && !e.ctrlKey || Lp.indexOf(e.key) > -1 && e.ctrlKey)) {
      let t = { ctrlKey: e.ctrlKey, altKey: e.altKey, metaKey: e.metaKey, shiftKey: e.shiftKey };
      return t.shiftKey && k.ios && !/^(off|none)$/.test(this.view.contentDOM.autocapitalize) && Mp(this.view.win) && (t.shiftKey = !1), this.pendingIOSKey = { key: e.key, keyCode: e.keyCode, mods: t }, setTimeout(() => this.flushIOSKey(), 250), !0;
    }
    return e.keyCode != 229 && this.view.observer.forceFlush(), !1;
  }
  flushIOSKey(e) {
    let t = this.pendingIOSKey;
    return !t || t.key == "Enter" && e && e.from < e.to && /^\S+$/.test(e.insert.toString()) ? !1 : (this.pendingIOSKey = void 0, Zi(this.view.contentDOM, t.key, t.keyCode, t.mods));
  }
  ignoreDuringComposition(e) {
    return !/^key/.test(e.type) || e.synthetic ? !1 : this.composing > 0 ? !0 : k.safari && !k.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = !1, !0) : !1;
  }
  startMouseSelection(e) {
    this.mouseSelection && this.mouseSelection.destroy(), this.mouseSelection = e;
  }
  update(e) {
    this.view.observer.update(e), this.mouseSelection && this.mouseSelection.update(e), this.draggedContent && e.docChanged && (this.draggedContent = this.draggedContent.map(e.changes)), e.transactions.length && (this.lastKeyCode = this.lastSelectionTime = 0);
  }
  destroy() {
    this.mouseSelection && this.mouseSelection.destroy();
  }
}
function Mp(n) {
  return n.visualViewport ? n.visualViewport.height * n.visualViewport.scale / n.document.documentElement.clientHeight < 0.85 : !1;
}
function Da(n, e) {
  return (t, i) => {
    try {
      return e.call(n, i, t);
    } catch (s) {
      Te(t.state, s);
    }
  };
}
function Gp(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(i) {
    return e[i] || (e[i] = { observers: [], handlers: [] });
  }
  for (let i of n) {
    let s = i.spec, r = s && s.plugin.domEventHandlers, o = s && s.plugin.domEventObservers;
    if (r)
      for (let O in r) {
        let a = r[O];
        a && t(O).handlers.push(Da(i.value, a));
      }
    if (o)
      for (let O in o) {
        let a = o[O];
        a && t(O).observers.push(Da(i.value, a));
      }
  }
  for (let i in Je)
    t(i).handlers.push(Je[i]);
  for (let i in ye)
    t(i).observers.push(ye[i]);
  return e;
}
const Vc = [
  { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
  { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
  { key: "Enter", keyCode: 13, inputType: "insertLineBreak" },
  { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
], Lp = "dthko", zc = [16, 17, 18, 20, 91, 92, 224, 225], Hn = 6;
function Kn(n) {
  return Math.max(0, n) * 0.7 + 8;
}
function Dp(n, e) {
  return Math.max(Math.abs(n.clientX - e.clientX), Math.abs(n.clientY - e.clientY));
}
class Ip {
  constructor(e, t, i, s) {
    this.view = e, this.startEvent = t, this.style = i, this.mustSelect = s, this.scrollSpeed = { x: 0, y: 0 }, this.scrolling = -1, this.lastEvent = t, this.scrollParents = sc(e.contentDOM), this.atoms = e.state.facet(Wn).map((o) => o(e));
    let r = e.contentDOM.ownerDocument;
    r.addEventListener("mousemove", this.move = this.move.bind(this)), r.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = t.shiftKey, this.multiple = e.state.facet(A.allowMultipleSelections) && Bp(e, t), this.dragging = Fp(e, t) && jc(t) == 1 ? null : !1;
  }
  start(e) {
    this.dragging === !1 && this.select(e);
  }
  move(e) {
    if (e.buttons == 0)
      return this.destroy();
    if (this.dragging || this.dragging == null && Dp(this.startEvent, e) < 10)
      return;
    this.select(this.lastEvent = e);
    let t = 0, i = 0, s = 0, r = 0, o = this.view.win.innerWidth, O = this.view.win.innerHeight;
    this.scrollParents.x && ({ left: s, right: o } = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({ top: r, bottom: O } = this.scrollParents.y.getBoundingClientRect());
    let a = UO(this.view);
    e.clientX - a.left <= s + Hn ? t = -Kn(s - e.clientX) : e.clientX + a.right >= o - Hn && (t = Kn(e.clientX - o)), e.clientY - a.top <= r + Hn ? i = -Kn(r - e.clientY) : e.clientY + a.bottom >= O - Hn && (i = Kn(e.clientY - O)), this.setScrollSpeed(t, i);
  }
  up(e) {
    this.dragging == null && this.select(this.lastEvent), this.dragging || e.preventDefault(), this.destroy();
  }
  destroy() {
    this.setScrollSpeed(0, 0);
    let e = this.view.contentDOM.ownerDocument;
    e.removeEventListener("mousemove", this.move), e.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = this.view.inputState.draggedContent = null;
  }
  setScrollSpeed(e, t) {
    this.scrollSpeed = { x: e, y: t }, e || t ? this.scrolling < 0 && (this.scrolling = setInterval(() => this.scroll(), 50)) : this.scrolling > -1 && (clearInterval(this.scrolling), this.scrolling = -1);
  }
  scroll() {
    let { x: e, y: t } = this.scrollSpeed;
    e && this.scrollParents.x && (this.scrollParents.x.scrollLeft += e, e = 0), t && this.scrollParents.y && (this.scrollParents.y.scrollTop += t, t = 0), (e || t) && this.view.win.scrollBy(e, t), this.dragging === !1 && this.select(this.lastEvent);
  }
  select(e) {
    let { view: t } = this, i = Yc(this.atoms, this.style.get(e, this.extend, this.multiple));
    (this.mustSelect || !i.eq(t.state.selection, this.dragging === !1)) && this.view.dispatch({
      selection: i,
      userEvent: "select.pointer"
    }), this.mustSelect = !1;
  }
  update(e) {
    e.transactions.some((t) => t.isUserEvent("input.type")) ? this.destroy() : this.style.update(e) && setTimeout(() => this.select(this.lastEvent), 20);
  }
}
function Bp(n, e) {
  let t = n.state.facet(mc);
  return t.length ? t[0](e) : k.mac ? e.metaKey : e.ctrlKey;
}
function Np(n, e) {
  let t = n.state.facet(gc);
  return t.length ? t[0](e) : k.mac ? !e.altKey : !e.ctrlKey;
}
function Fp(n, e) {
  let { main: t } = n.state.selection;
  if (t.empty)
    return !1;
  let i = Pn(n.root);
  if (!i || i.rangeCount == 0)
    return !0;
  let s = i.getRangeAt(0).getClientRects();
  for (let r = 0; r < s.length; r++) {
    let o = s[r];
    if (o.left <= e.clientX && o.right >= e.clientX && o.top <= e.clientY && o.bottom >= e.clientY)
      return !0;
  }
  return !1;
}
function Hp(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target, i; t != n.contentDOM; t = t.parentNode)
    if (!t || t.nodeType == 11 || (i = K.get(t)) && i.isWidget() && !i.isHidden && i.widget.ignoreEvent(e))
      return !1;
  return !0;
}
const Je = /* @__PURE__ */ Object.create(null), ye = /* @__PURE__ */ Object.create(null), Cc = k.ie && k.ie_version < 15 || k.ios && k.webkit_version < 604;
function Kp(n) {
  let e = n.dom.parentNode;
  if (!e)
    return;
  let t = e.appendChild(document.createElement("textarea"));
  t.style.cssText = "position: fixed; left: -10000px; top: 10px", t.focus(), setTimeout(() => {
    n.focus(), t.remove(), Wc(n, t.value);
  }, 50);
}
function ur(n, e, t) {
  for (let i of n.facet(e))
    t = i(t, n);
  return t;
}
function Wc(n, e) {
  e = ur(n.state, kO, e);
  let { state: t } = n, i, s = 1, r = t.toText(e), o = r.lines == t.selection.ranges.length;
  if (Ao != null && t.selection.ranges.every((a) => a.empty) && Ao == r.toString()) {
    let a = -1;
    i = t.changeByRange((l) => {
      let h = t.doc.lineAt(l.from);
      if (h.from == a)
        return { range: l };
      a = h.from;
      let c = t.toText((o ? r.line(s++).text : e) + t.lineBreak);
      return {
        changes: { from: h.from, insert: c },
        range: $.cursor(l.from + c.length)
      };
    });
  } else o ? i = t.changeByRange((a) => {
    let l = r.line(s++);
    return {
      changes: { from: a.from, to: a.to, insert: l.text },
      range: $.cursor(a.from + l.length)
    };
  }) : i = t.replaceSelection(r);
  n.dispatch(i, {
    userEvent: "input.paste",
    scrollIntoView: !0
  });
}
ye.scroll = (n) => {
  let e = n.inputState;
  e.lastScrollTop = n.scrollDOM.scrollTop, e.lastScrollLeft = n.scrollDOM.scrollLeft, k.ios && !e.touchActive && (e.lastIOSMomentumScroll = Date.now());
};
ye.wheel = ye.mousewheel = (n) => {
  n.inputState.lastWheelEvent = Date.now();
};
Je.keydown = (n, e) => (n.inputState.setSelectionOrigin("select"), e.keyCode == 27 && n.inputState.tabFocusMode != 0 && (n.inputState.tabFocusMode = Date.now() + 2e3), !1);
ye.touchstart = (n, e) => {
  let t = n.inputState, i = e.targetTouches[0];
  t.touchActive = !0, t.lastTouchTime = Date.now(), i && (t.lastTouchX = i.clientX, t.lastTouchY = i.clientY), t.setSelectionOrigin("select.pointer");
};
ye.touchmove = (n) => {
  n.inputState.setSelectionOrigin("select.pointer");
};
ye.touchend = (n, e) => {
  n.inputState.touchActive = !1;
};
Je.mousedown = (n, e) => {
  if (n.observer.flush(), n.inputState.lastTouchTime > Date.now() - 2e3)
    return !1;
  let t = null;
  for (let i of n.state.facet(Qc))
    if (t = i(n, e), t)
      break;
  if (!t && e.button == 0 && (t = em(n, e)), t) {
    let i = !n.hasFocus;
    n.inputState.startMouseSelection(new Ip(n, e, t, i)), i && n.observer.ignore(() => {
      Oc(n.contentDOM);
      let r = n.root.activeElement;
      r && !r.contains(n.contentDOM) && r.blur();
    });
    let s = n.inputState.mouseSelection;
    if (s)
      return s.start(e), s.dragging === !1;
  } else
    n.inputState.setSelectionOrigin("select.pointer");
  return !1;
};
function Ia(n, e, t, i) {
  if (i == 1)
    return $.cursor(e, t);
  if (i == 2)
    return vp(n.state, e, t);
  {
    let s = n.docView.lineAt(e, t), r = n.state.doc.lineAt(s ? s.posAtEnd : e), o = s ? s.posAtStart : r.from, O = s ? s.posAtEnd : r.to;
    return O < n.state.doc.length && O == r.to && O++, $.undirectionalRange(o, O);
  }
}
const Jp = k.ie && k.ie_version <= 11;
let Ba = null, Na = 0, Fa = 0;
function jc(n) {
  if (!Jp)
    return n.detail;
  let e = Ba, t = Fa;
  return Ba = n, Fa = Date.now(), Na = !e || t > Date.now() - 400 && Math.abs(e.clientX - n.clientX) < 2 && Math.abs(e.clientY - n.clientY) < 2 ? (Na + 1) % 3 : 1;
}
function em(n, e) {
  let t = n.posAndSideAtCoords({ x: e.clientX, y: e.clientY }, !1), i = jc(e), s = n.state.selection;
  return {
    update(r) {
      r.docChanged && (t.pos = r.changes.mapPos(t.pos), s = s.map(r.changes));
    },
    get(r, o, O) {
      let a = n.posAndSideAtCoords({ x: r.clientX, y: r.clientY }, !1), l, h = Ia(n, a.pos, a.assoc, i);
      if (t.pos != a.pos && !o) {
        let c = Ia(n, t.pos, t.assoc, i), f = Math.min(c.from, h.from), u = Math.max(c.to, h.to);
        h = f < h.from ? $.range(f, u, h.assoc) : $.range(u, f, h.assoc);
      }
      return o ? s.replaceRange(s.main.extend(h.from, h.to, h.assoc)) : O && i == 1 && s.ranges.length > 1 && (l = tm(s, a.pos)) ? l : O ? s.addRange(h) : $.create([h]);
    }
  };
}
function tm(n, e) {
  for (let t = 0; t < n.ranges.length; t++) {
    let { from: i, to: s } = n.ranges[t];
    if (i <= e && s >= e)
      return $.create(n.ranges.slice(0, t).concat(n.ranges.slice(t + 1)), n.mainIndex == t ? 0 : n.mainIndex - (n.mainIndex > t ? 1 : 0));
  }
  return null;
}
Je.dragstart = (n, e) => {
  let { selection: { main: t } } = n.state;
  if (e.target.draggable) {
    let s = n.docView.tile.nearest(e.target);
    if (s && s.isWidget()) {
      let r = s.posAtStart, o = r + s.length;
      (r >= t.to || o <= t.from) && (t = $.undirectionalRange(r, o));
    }
  }
  let { inputState: i } = n;
  return i.mouseSelection && (i.mouseSelection.dragging = !0), i.draggedContent = t, e.dataTransfer && (e.dataTransfer.setData("Text", ur(n.state, ZO, n.state.sliceDoc(t.from, t.to))), e.dataTransfer.effectAllowed = "copyMove"), !1;
};
Je.dragend = (n) => (n.inputState.draggedContent = null, !1);
function Ha(n, e, t, i) {
  if (t = ur(n.state, kO, t), !t)
    return;
  let s = n.posAtCoords({ x: e.clientX, y: e.clientY }, !1), { draggedContent: r } = n.inputState, o = i && r && Np(n, e) ? { from: r.from, to: r.to } : null, O = { from: s, insert: t }, a = n.state.changes(o ? [o, O] : O);
  n.focus(), n.dispatch({
    changes: a,
    selection: { anchor: a.mapPos(s, -1), head: a.mapPos(s, 1) },
    userEvent: o ? "move.drop" : "input.drop"
  }), n.inputState.draggedContent = null;
}
Je.drop = (n, e) => {
  if (!e.dataTransfer)
    return !1;
  if (n.state.readOnly)
    return !0;
  let t = e.dataTransfer.files;
  if (t && t.length) {
    let i = Array(t.length), s = 0, r = () => {
      ++s == t.length && Ha(n, e, i.filter((o) => o != null).join(n.state.lineBreak), !1);
    };
    for (let o = 0; o < t.length; o++) {
      let O = new FileReader();
      O.onerror = r, O.onload = () => {
        /[\x00-\x08\x0e-\x1f]{2}/.test(O.result) || (i[o] = O.result), r();
      }, O.readAsText(t[o]);
    }
    return !0;
  } else {
    let i = e.dataTransfer.getData("Text");
    if (i)
      return Ha(n, e, i, !0), !0;
  }
  return !1;
};
Je.paste = (n, e) => {
  if (n.state.readOnly)
    return !0;
  n.observer.flush();
  let t = Cc ? null : e.clipboardData;
  return t ? (Wc(n, t.getData("text/plain") || t.getData("text/uri-list")), !0) : (Kp(n), !1);
};
function im(n, e) {
  let t = n.dom.parentNode;
  if (!t)
    return;
  let i = t.appendChild(document.createElement("textarea"));
  i.style.cssText = "position: fixed; left: -10000px; top: 10px", i.value = e, i.focus(), i.selectionEnd = e.length, i.selectionStart = 0, setTimeout(() => {
    i.remove(), n.focus();
  }, 50);
}
function nm(n) {
  let e = [], t = [], i = !1;
  for (let s of n.selection.ranges)
    s.empty || (e.push(n.sliceDoc(s.from, s.to)), t.push(s));
  if (!e.length) {
    let s = -1;
    for (let { from: r } of n.selection.ranges) {
      let o = n.doc.lineAt(r);
      o.number > s && (e.push(o.text), t.push({ from: o.from, to: Math.min(n.doc.length, o.to + 1) })), s = o.number;
    }
    i = !0;
  }
  return { text: ur(n, ZO, e.join(n.lineBreak)), ranges: t, linewise: i };
}
let Ao = null;
Je.copy = Je.cut = (n, e) => {
  if (!ln(n.contentDOM, n.observer.selectionRange))
    return !1;
  let { text: t, ranges: i, linewise: s } = nm(n.state);
  if (!t && !s)
    return !1;
  Ao = s ? t : null, e.type == "cut" && !n.state.readOnly && n.dispatch({
    changes: i,
    scrollIntoView: !0,
    userEvent: "delete.cut"
  });
  let r = Cc ? null : e.clipboardData;
  return r ? (r.clearData(), r.setData("text/plain", t), !0) : (im(n, t), !1);
};
const Ac = /* @__PURE__ */ vt.define();
function Ec(n, e) {
  let t = [];
  for (let i of n.facet(Sc)) {
    let s = i(n, e);
    s && t.push(s);
  }
  return t.length ? n.update({ effects: t, annotations: Ac.of(!0) }) : null;
}
function Mc(n) {
  setTimeout(() => {
    let e = n.hasFocus;
    if (e != n.inputState.notifiedFocused) {
      let t = Ec(n.state, e);
      t ? n.dispatch(t) : n.update([]);
    }
  }, 10);
}
ye.focus = (n) => {
  n.inputState.lastFocusTime = Date.now(), !n.scrollDOM.scrollTop && (n.inputState.lastScrollTop || n.inputState.lastScrollLeft) && (n.scrollDOM.scrollTop = n.inputState.lastScrollTop, n.scrollDOM.scrollLeft = n.inputState.lastScrollLeft), Mc(n);
};
ye.blur = (n) => {
  n.observer.clearSelectionRange(), Mc(n);
};
ye.compositionstart = ye.compositionupdate = (n) => {
  n.observer.editContext || (n.inputState.compositionFirstChange == null && (n.inputState.compositionFirstChange = !0), n.inputState.composing < 0 && (n.inputState.composing = 0));
};
ye.compositionend = (n) => {
  n.observer.editContext || (n.inputState.composing = -1, n.inputState.compositionEndedAt = Date.now(), n.inputState.compositionPendingKey = !0, n.inputState.compositionPendingChange = n.observer.pendingRecords().length > 0, n.inputState.compositionFirstChange = null, k.chrome && k.android ? n.observer.flushSoon() : n.inputState.compositionPendingChange ? Promise.resolve().then(() => n.observer.flush()) : setTimeout(() => {
    n.inputState.composing < 0 && n.docView.hasComposition && n.update([]);
  }, 50));
};
ye.contextmenu = (n) => {
  n.inputState.lastContextMenu = Date.now();
};
Je.beforeinput = (n, e) => {
  var t, i;
  if ((e.inputType == "insertText" || e.inputType == "insertCompositionText") && (n.inputState.insertingText = e.data, n.inputState.insertingTextAt = Date.now()), e.inputType == "insertReplacementText" && n.observer.editContext) {
    let r = (t = e.dataTransfer) === null || t === void 0 ? void 0 : t.getData("text/plain"), o = e.getTargetRanges();
    if (r && o.length) {
      let O = o[0], a = n.posAtDOM(O.startContainer, O.startOffset), l = n.posAtDOM(O.endContainer, O.endOffset);
      return YO(n, { from: a, to: l, insert: n.state.toText(r) }, null), !0;
    }
  }
  let s;
  if (k.chrome && k.android && (s = Vc.find((r) => r.inputType == e.inputType)) && (n.observer.delayAndroidKey(s.key, s.keyCode), s.key == "Backspace" || s.key == "Delete")) {
    let r = ((i = window.visualViewport) === null || i === void 0 ? void 0 : i.height) || 0;
    setTimeout(() => {
      var o;
      (((o = window.visualViewport) === null || o === void 0 ? void 0 : o.height) || 0) > r + 10 && n.hasFocus && (n.contentDOM.blur(), n.focus());
    }, 100);
  }
  return k.ios && e.inputType == "deleteContentForward" && n.observer.flushSoon(), k.safari && e.inputType == "insertText" && n.inputState.composing >= 0 && setTimeout(() => ye.compositionend(n, e), 20), !1;
};
const Ka = /* @__PURE__ */ new Set();
function sm(n) {
  Ka.has(n) || (Ka.add(n), n.addEventListener("copy", () => {
  }), n.addEventListener("cut", () => {
  }));
}
const Ja = ["pre-wrap", "normal", "pre-line", "break-spaces"];
let Ci = !1;
function el() {
  Ci = !1;
}
class rm {
  constructor(e) {
    this.lineWrapping = e, this.doc = j.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30;
  }
  heightForGap(e, t) {
    let i = this.doc.lineAt(t).number - this.doc.lineAt(e).number + 1;
    return this.lineWrapping && (i += Math.max(0, Math.ceil((t - e - i * this.lineLength * 0.5) / this.lineLength))), this.lineHeight * i;
  }
  heightForLine(e) {
    return this.lineWrapping ? (1 + Math.max(0, Math.ceil((e - this.lineLength) / Math.max(1, this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
  }
  setDoc(e) {
    return this.doc = e, this;
  }
  mustRefreshForWrapping(e) {
    return Ja.indexOf(e) > -1 != this.lineWrapping;
  }
  mustRefreshForHeights(e) {
    let t = !1;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      s < 0 ? i++ : this.heightSamples[Math.floor(s * 10)] || (t = !0, this.heightSamples[Math.floor(s * 10)] = !0);
    }
    return t;
  }
  refresh(e, t, i, s, r, o) {
    let O = Ja.indexOf(e) > -1, a = Math.abs(t - this.lineHeight) > 0.3 || this.lineWrapping != O;
    if (this.lineWrapping = O, this.lineHeight = t, this.charWidth = i, this.textHeight = s, this.lineLength = r, a) {
      this.heightSamples = {};
      for (let l = 0; l < o.length; l++) {
        let h = o[l];
        h < 0 ? l++ : this.heightSamples[Math.floor(h * 10)] = !0;
      }
    }
    return a;
  }
}
class om {
  constructor(e, t) {
    this.from = e, this.heights = t, this.index = 0;
  }
  get more() {
    return this.index < this.heights.length;
  }
}
class Ie {
  /**
  @internal
  */
  constructor(e, t, i, s, r) {
    this.from = e, this.length = t, this.top = i, this.height = s, this._content = r;
  }
  /**
  The type of element this is. When querying lines, this may be
  an array of all the blocks that make up the line.
  */
  get type() {
    return typeof this._content == "number" ? pe.Text : Array.isArray(this._content) ? this._content : this._content.type;
  }
  /**
  The end of the element as a document position.
  */
  get to() {
    return this.from + this.length;
  }
  /**
  The bottom position of the element.
  */
  get bottom() {
    return this.top + this.height;
  }
  /**
  If this is a widget block, this will return the widget
  associated with it.
  */
  get widget() {
    return this._content instanceof li ? this._content.widget : null;
  }
  /**
  If this is a textblock, this holds the number of line breaks
  that appear in widgets inside the block.
  */
  get widgetLineBreaks() {
    return typeof this._content == "number" ? this._content : 0;
  }
  /**
  @internal
  */
  join(e) {
    let t = (Array.isArray(this._content) ? this._content : [this]).concat(Array.isArray(e._content) ? e._content : [e]);
    return new Ie(this.from, this.length + e.length, this.top, this.height + e.height, t);
  }
}
var N = /* @__PURE__ */ function(n) {
  return n[n.ByPos = 0] = "ByPos", n[n.ByHeight = 1] = "ByHeight", n[n.ByPosNoHeight = 2] = "ByPosNoHeight", n;
}(N || (N = {}));
const Ss = 1e-3;
class be {
  constructor(e, t, i = 2) {
    this.length = e, this.height = t, this.flags = i;
  }
  get outdated() {
    return (this.flags & 2) > 0;
  }
  set outdated(e) {
    this.flags = (e ? 2 : 0) | this.flags & -3;
  }
  setHeight(e) {
    this.height != e && (Math.abs(this.height - e) > Ss && (Ci = !0), this.height = e);
  }
  // Base case is to replace a leaf node, which simply builds a tree
  // from the new nodes and returns that (HeightMapBranch and
  // HeightMapGap override this to actually use from/to)
  replace(e, t, i) {
    return be.of(i);
  }
  // Again, these are base cases, and are overridden for branch and gap nodes.
  decomposeLeft(e, t) {
    t.push(this);
  }
  decomposeRight(e, t) {
    t.push(this);
  }
  applyChanges(e, t, i, s) {
    let r = this, o = i.doc;
    for (let O = s.length - 1; O >= 0; O--) {
      let { fromA: a, toA: l, fromB: h, toB: c } = s[O], f = r.lineAt(a, N.ByPosNoHeight, i.setDoc(t), 0, 0), u = f.to >= l ? f : r.lineAt(l, N.ByPosNoHeight, i, 0, 0);
      for (c += u.to - l, l = u.to; O > 0 && f.from <= s[O - 1].toA; )
        a = s[O - 1].fromA, h = s[O - 1].fromB, O--, a < f.from && (f = r.lineAt(a, N.ByPosNoHeight, i, 0, 0));
      h += f.from - a, a = f.from;
      let d = RO.build(i.setDoc(o), e, h, c);
      r = zs(r, r.replace(a, l, d));
    }
    return r.updateHeight(i, 0);
  }
  static empty() {
    return new ze(0, 0, 0);
  }
  // nodes uses null values to indicate the position of line breaks.
  // There are never line breaks at the start or end of the array, or
  // two line breaks next to each other, and the array isn't allowed
  // to be empty (same restrictions as return value from the builder).
  static of(e) {
    if (e.length == 1)
      return e[0];
    let t = 0, i = e.length, s = 0, r = 0;
    for (; ; )
      if (t == i)
        if (s > r * 2) {
          let O = e[t - 1];
          O.break ? e.splice(--t, 1, O.left, null, O.right) : e.splice(--t, 1, O.left, O.right), i += 1 + O.break, s -= O.size;
        } else if (r > s * 2) {
          let O = e[i];
          O.break ? e.splice(i, 1, O.left, null, O.right) : e.splice(i, 1, O.left, O.right), i += 2 + O.break, r -= O.size;
        } else
          break;
      else if (s < r) {
        let O = e[t++];
        O && (s += O.size);
      } else {
        let O = e[--i];
        O && (r += O.size);
      }
    let o = 0;
    return e[t - 1] == null ? (o = 1, t--) : e[t] == null && (o = 1, i++), new am(be.of(e.slice(0, t)), o, be.of(e.slice(i)));
  }
}
function zs(n, e) {
  return n == e ? n : (n.constructor != e.constructor && (Ci = !0), e);
}
be.prototype.size = 1;
const Om = /* @__PURE__ */ Y.replace({});
class Gc extends be {
  constructor(e, t, i) {
    super(e, t), this.deco = i, this.spaceAbove = 0;
  }
  mainBlock(e, t) {
    return new Ie(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.deco || 0);
  }
  blockAt(e, t, i, s) {
    return this.spaceAbove && e < i + this.spaceAbove ? new Ie(s, 0, i, this.spaceAbove, Om) : this.mainBlock(i, s);
  }
  lineAt(e, t, i, s, r) {
    let o = this.mainBlock(s, r);
    return this.spaceAbove ? this.blockAt(0, i, s, r).join(o) : o;
  }
  forEachLine(e, t, i, s, r, o) {
    e <= r + this.length && t >= r && o(this.lineAt(0, N.ByPos, i, s, r));
  }
  setMeasuredHeight(e) {
    let t = e.heights[e.index++];
    t < 0 ? (this.spaceAbove = -t, t = e.heights[e.index++]) : this.spaceAbove = 0, this.setHeight(t);
  }
  updateHeight(e, t = 0, i = !1, s) {
    return s && s.from <= t && s.more && this.setMeasuredHeight(s), this.outdated = !1, this;
  }
  toString() {
    return `block(${this.length})`;
  }
}
class ze extends Gc {
  constructor(e, t, i) {
    super(e, t, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0, this.spaceAbove = i;
  }
  mainBlock(e, t) {
    return new Ie(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.breaks);
  }
  replace(e, t, i) {
    let s = i[0];
    return i.length == 1 && (s instanceof ze || s instanceof ce && s.flags & 4) && Math.abs(this.length - s.length) < 10 ? (s instanceof ce ? s = new ze(s.length, this.height, this.spaceAbove) : s.height = this.height, this.outdated || (s.outdated = !1), s) : be.of(i);
  }
  updateHeight(e, t = 0, i = !1, s) {
    return s && s.from <= t && s.more ? this.setMeasuredHeight(s) : (i || this.outdated) && (this.spaceAbove = 0, this.setHeight(Math.max(this.widgetHeight, e.heightForLine(this.length - this.collapsed)) + this.breaks * e.lineHeight)), this.outdated = !1, this;
  }
  toString() {
    return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
  }
}
class ce extends be {
  constructor(e) {
    super(e, 0);
  }
  heightMetrics(e, t) {
    let i = e.doc.lineAt(t).number, s = e.doc.lineAt(t + this.length).number, r = s - i + 1, o, O = 0;
    if (e.lineWrapping) {
      let a = Math.min(this.height, e.lineHeight * r);
      o = a / r, this.length > r + 1 && (O = (this.height - a) / (this.length - r - 1));
    } else
      o = this.height / r;
    return { firstLine: i, lastLine: s, perLine: o, perChar: O };
  }
  blockAt(e, t, i, s) {
    let { firstLine: r, lastLine: o, perLine: O, perChar: a } = this.heightMetrics(t, s);
    if (t.lineWrapping) {
      let l = s + (e < t.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (e - i) / this.height)) * this.length)), h = t.doc.lineAt(l), c = O + h.length * a, f = Math.max(i, e - c / 2);
      return new Ie(h.from, h.length, f, c, 0);
    } else {
      let l = Math.max(0, Math.min(o - r, Math.floor((e - i) / O))), { from: h, length: c } = t.doc.line(r + l);
      return new Ie(h, c, i + O * l, O, 0);
    }
  }
  lineAt(e, t, i, s, r) {
    if (t == N.ByHeight)
      return this.blockAt(e, i, s, r);
    if (t == N.ByPosNoHeight) {
      let { from: u, to: d } = i.doc.lineAt(e);
      return new Ie(u, d - u, 0, 0, 0);
    }
    let { firstLine: o, perLine: O, perChar: a } = this.heightMetrics(i, r), l = i.doc.lineAt(e), h = O + l.length * a, c = l.number - o, f = s + O * c + a * (l.from - r - c);
    return new Ie(l.from, l.length, Math.max(s, Math.min(f, s + this.height - h)), h, 0);
  }
  forEachLine(e, t, i, s, r, o) {
    e = Math.max(e, r), t = Math.min(t, r + this.length);
    let { firstLine: O, perLine: a, perChar: l } = this.heightMetrics(i, r);
    for (let h = e, c = s; h <= t; ) {
      let f = i.doc.lineAt(h);
      if (h == e) {
        let d = f.number - O;
        c += a * d + l * (e - r - d);
      }
      let u = a + l * f.length;
      o(new Ie(f.from, f.length, c, u, 0)), c += u, h = f.to + 1;
    }
  }
  replace(e, t, i) {
    let s = this.length - t;
    if (s > 0) {
      let r = i[i.length - 1];
      r instanceof ce ? i[i.length - 1] = new ce(r.length + s) : i.push(null, new ce(s - 1));
    }
    if (e > 0) {
      let r = i[0];
      r instanceof ce ? i[0] = new ce(e + r.length) : i.unshift(new ce(e - 1), null);
    }
    return be.of(i);
  }
  decomposeLeft(e, t) {
    t.push(new ce(e - 1), null);
  }
  decomposeRight(e, t) {
    t.push(null, new ce(this.length - e - 1));
  }
  updateHeight(e, t = 0, i = !1, s) {
    let r = t + this.length;
    if (s && s.from <= t + this.length && s.more) {
      let o = [], O = Math.max(t, s.from), a = -1;
      for (s.from > t && o.push(new ce(s.from - t - 1).updateHeight(e, t)); O <= r && s.more; ) {
        let h = e.doc.lineAt(O).length;
        o.length && o.push(null);
        let c = s.heights[s.index++], f = 0;
        c < 0 && (f = -c, c = s.heights[s.index++]), a == -1 ? a = c : Math.abs(c - a) >= Ss && (a = -2);
        let u = new ze(h, c, f);
        u.outdated = !1, o.push(u), O += h + 1;
      }
      O <= r && o.push(null, new ce(r - O).updateHeight(e, O));
      let l = be.of(o);
      return (a < 0 || Math.abs(l.height - this.height) >= Ss || Math.abs(a - this.heightMetrics(e, t).perLine) >= Ss) && (Ci = !0), zs(this, l);
    } else (i || this.outdated) && (this.setHeight(e.heightForGap(t, t + this.length)), this.outdated = !1);
    return this;
  }
  toString() {
    return `gap(${this.length})`;
  }
}
class am extends be {
  constructor(e, t, i) {
    super(e.length + t + i.length, e.height + i.height, t | (e.outdated || i.outdated ? 2 : 0)), this.left = e, this.right = i, this.size = e.size + i.size;
  }
  get break() {
    return this.flags & 1;
  }
  blockAt(e, t, i, s) {
    let r = i + this.left.height;
    return e < r ? this.left.blockAt(e, t, i, s) : this.right.blockAt(e, t, r, s + this.left.length + this.break);
  }
  lineAt(e, t, i, s, r) {
    let o = s + this.left.height, O = r + this.left.length + this.break, a = t == N.ByHeight ? e < o : e < O, l = a ? this.left.lineAt(e, t, i, s, r) : this.right.lineAt(e, t, i, o, O);
    if (this.break || (a ? l.to < O : l.from > O))
      return l;
    let h = t == N.ByPosNoHeight ? N.ByPosNoHeight : N.ByPos;
    return a ? l.join(this.right.lineAt(O, h, i, o, O)) : this.left.lineAt(O, h, i, s, r).join(l);
  }
  forEachLine(e, t, i, s, r, o) {
    let O = s + this.left.height, a = r + this.left.length + this.break;
    if (this.break)
      e < a && this.left.forEachLine(e, t, i, s, r, o), t >= a && this.right.forEachLine(e, t, i, O, a, o);
    else {
      let l = this.lineAt(a, N.ByPos, i, s, r);
      e < l.from && this.left.forEachLine(e, l.from - 1, i, s, r, o), l.to >= e && l.from <= t && o(l), t > l.to && this.right.forEachLine(l.to + 1, t, i, O, a, o);
    }
  }
  replace(e, t, i) {
    let s = this.left.length + this.break;
    if (t < s)
      return this.balanced(this.left.replace(e, t, i), this.right);
    if (e > this.left.length)
      return this.balanced(this.left, this.right.replace(e - s, t - s, i));
    let r = [];
    e > 0 && this.decomposeLeft(e, r);
    let o = r.length;
    for (let O of i)
      r.push(O);
    if (e > 0 && tl(r, o - 1), t < this.length) {
      let O = r.length;
      this.decomposeRight(t, r), tl(r, O);
    }
    return be.of(r);
  }
  decomposeLeft(e, t) {
    let i = this.left.length;
    if (e <= i)
      return this.left.decomposeLeft(e, t);
    t.push(this.left), this.break && (i++, e >= i && t.push(null)), e > i && this.right.decomposeLeft(e - i, t);
  }
  decomposeRight(e, t) {
    let i = this.left.length, s = i + this.break;
    if (e >= s)
      return this.right.decomposeRight(e - s, t);
    e < i && this.left.decomposeRight(e, t), this.break && e < s && t.push(null), t.push(this.right);
  }
  balanced(e, t) {
    return e.size > 2 * t.size || t.size > 2 * e.size ? be.of(this.break ? [e, null, t] : [e, t]) : (this.left = zs(this.left, e), this.right = zs(this.right, t), this.setHeight(e.height + t.height), this.outdated = e.outdated || t.outdated, this.size = e.size + t.size, this.length = e.length + this.break + t.length, this);
  }
  updateHeight(e, t = 0, i = !1, s) {
    let { left: r, right: o } = this, O = t + r.length + this.break, a = null;
    return s && s.from <= t + r.length && s.more ? a = r = r.updateHeight(e, t, i, s) : r.updateHeight(e, t, i), s && s.from <= O + o.length && s.more ? a = o = o.updateHeight(e, O, i, s) : o.updateHeight(e, O, i), a ? this.balanced(r, o) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
  }
  toString() {
    return this.left + (this.break ? " " : "-") + this.right;
  }
}
function tl(n, e) {
  let t, i;
  n[e] == null && (t = n[e - 1]) instanceof ce && (i = n[e + 1]) instanceof ce && n.splice(e - 1, 3, new ce(t.length + 1 + i.length));
}
const lm = 5;
class RO {
  constructor(e, t) {
    this.pos = e, this.oracle = t, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = e;
  }
  get isCovered() {
    return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
  }
  span(e, t) {
    if (this.lineStart > -1) {
      let i = Math.min(t, this.lineEnd), s = this.nodes[this.nodes.length - 1];
      s instanceof ze ? s.length += i - this.pos : (i > this.pos || !this.isCovered) && this.nodes.push(new ze(i - this.pos, -1, 0)), this.writtenTo = i, t > i && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
    }
    this.pos = t;
  }
  point(e, t, i) {
    if (e < t || i.heightRelevant) {
      let s = i.widget ? i.widget.estimatedHeight : 0, r = i.widget ? i.widget.lineBreaks : 0;
      s < 0 && (s = this.oracle.lineHeight);
      let o = t - e;
      i.block ? this.addBlock(new Gc(o, s, i)) : (o || r || s >= lm) && this.addLineDeco(s, r, o);
    } else t > e && this.span(e, t);
    this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
  }
  enterLine() {
    if (this.lineStart > -1)
      return;
    let { from: e, to: t } = this.oracle.doc.lineAt(this.pos);
    this.lineStart = e, this.lineEnd = t, this.writtenTo < e && ((this.writtenTo < e - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, e - 1)), this.nodes.push(null)), this.pos > e && this.nodes.push(new ze(this.pos - e, -1, 0)), this.writtenTo = this.pos;
  }
  blankContent(e, t) {
    let i = new ce(t - e);
    return this.oracle.doc.lineAt(e).to == t && (i.flags |= 4), i;
  }
  ensureLine() {
    this.enterLine();
    let e = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
    if (e instanceof ze)
      return e;
    let t = new ze(0, -1, 0);
    return this.nodes.push(t), t;
  }
  addBlock(e) {
    this.enterLine();
    let t = e.deco;
    t && t.startSide > 0 && !this.isCovered && this.ensureLine(), this.nodes.push(e), this.writtenTo = this.pos = this.pos + e.length, t && t.endSide > 0 && (this.covering = e);
  }
  addLineDeco(e, t, i) {
    let s = this.ensureLine();
    s.length += i, s.collapsed += i, s.widgetHeight = Math.max(s.widgetHeight, e), s.breaks += t, this.writtenTo = this.pos = this.pos + i;
  }
  finish(e) {
    let t = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
    this.lineStart > -1 && !(t instanceof ze) && !this.isCovered ? this.nodes.push(new ze(0, -1, 0)) : (this.writtenTo < this.pos || t == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
    let i = e;
    for (let s of this.nodes)
      s instanceof ze && s.updateHeight(this.oracle, i), i += s ? s.length : 1;
    return this.nodes;
  }
  // Always called with a region that on both sides either stretches
  // to a line break or the end of the document.
  // The returned array uses null to indicate line breaks, but never
  // starts or ends in a line break, or has multiple line breaks next
  // to each other.
  static build(e, t, i, s) {
    let r = new RO(i, e);
    return C.spans(t, i, s, r, 0), r.finish(i);
  }
}
function hm(n, e, t) {
  let i = new cm();
  return C.compare(n, e, t, i, 0), i.changes;
}
class cm {
  constructor() {
    this.changes = [];
  }
  compareRange() {
  }
  comparePoint(e, t, i, s) {
    (e < t || i && i.heightRelevant || s && s.heightRelevant) && ki(e, t, this.changes, 5);
  }
}
function fm(n, e) {
  let t = n.getBoundingClientRect(), i = n.ownerDocument, s = i.defaultView || window, r = Math.max(0, t.left), o = Math.min(s.innerWidth, t.right), O = Math.max(0, t.top), a = Math.min(s.innerHeight, t.bottom);
  for (let l = n.parentNode; l && l != i.body; )
    if (l.nodeType == 1) {
      let h = l, c = window.getComputedStyle(h);
      if ((h.scrollHeight > h.clientHeight || h.scrollWidth > h.clientWidth) && c.overflow != "visible") {
        let f = h.getBoundingClientRect();
        r = Math.max(r, f.left), o = Math.min(o, f.right), O = Math.max(O, f.top), a = Math.min(l == n.parentNode ? s.innerHeight : a, f.bottom);
      }
      l = c.position == "absolute" || c.position == "fixed" ? h.offsetParent : h.parentNode;
    } else if (l.nodeType == 11)
      l = l.host;
    else
      break;
  return {
    left: r - t.left,
    right: Math.max(r, o) - t.left,
    top: O - (t.top + e),
    bottom: Math.max(O, a) - (t.top + e)
  };
}
function um(n) {
  let e = n.getBoundingClientRect(), t = n.ownerDocument.defaultView || window;
  return e.left < t.innerWidth && e.right > 0 && e.top < t.innerHeight && e.bottom > 0;
}
function dm(n, e) {
  let t = n.getBoundingClientRect();
  return {
    left: 0,
    right: t.right - t.left,
    top: e,
    bottom: t.bottom - (t.top + e)
  };
}
class Wr {
  constructor(e, t, i, s) {
    this.from = e, this.to = t, this.size = i, this.displaySize = s;
  }
  static same(e, t) {
    if (e.length != t.length)
      return !1;
    for (let i = 0; i < e.length; i++) {
      let s = e[i], r = t[i];
      if (s.from != r.from || s.to != r.to || s.size != r.size)
        return !1;
    }
    return !0;
  }
  draw(e, t) {
    return Y.replace({
      widget: new pm(this.displaySize * (t ? e.scaleY : e.scaleX), t)
    }).range(this.from, this.to);
  }
}
class pm extends Pt {
  constructor(e, t) {
    super(), this.size = e, this.vertical = t;
  }
  eq(e) {
    return e.size == this.size && e.vertical == this.vertical;
  }
  toDOM() {
    let e = document.createElement("div");
    return this.vertical ? e.style.height = this.size + "px" : (e.style.width = this.size + "px", e.style.height = "2px", e.style.display = "inline-block"), e;
  }
  get estimatedHeight() {
    return this.vertical ? this.size : -1;
  }
}
class il {
  constructor(e, t) {
    this.view = e, this.state = t, this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 }, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scaleX = 1, this.scaleY = 1, this.scrollOffset = 0, this.scrolledToBottom = !1, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = nl, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = I.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
    let i = t.facet(vO).some((s) => typeof s != "function" && s.class == "cm-lineWrapping");
    this.heightOracle = new rm(i), this.stateDeco = sl(t), this.heightMap = be.empty().applyChanges(this.stateDeco, j.empty, this.heightOracle.setDoc(t.doc), [new Me(0, 0, 0, t.doc.length)]);
    for (let s = 0; s < 2 && (this.viewport = this.getViewport(0, null), !!this.updateForViewport()); s++)
      ;
    this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = Y.set(this.lineGaps.map((s) => s.draw(this, !1))), this.scrollParent = e.scrollDOM, this.computeVisibleRanges();
  }
  updateForViewport() {
    let e = [this.viewport], { main: t } = this.state.selection;
    for (let i = 0; i <= 1; i++) {
      let s = i ? t.head : t.anchor;
      if (!e.some(({ from: r, to: o }) => s >= r && s <= o)) {
        let { from: r, to: o } = this.lineBlockAt(s);
        e.push(new Jn(r, o));
      }
    }
    return this.viewports = e.sort((i, s) => i.from - s.from), this.updateScaler();
  }
  updateScaler() {
    let e = this.scaler;
    return this.scaler = this.heightMap.height <= 7e6 ? nl : new _O(this.heightOracle, this.heightMap, this.viewports), e.eq(this.scaler) ? 0 : 2;
  }
  updateViewportLines() {
    this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (e) => {
      this.viewportLines.push(sn(e, this.scaler));
    });
  }
  update(e, t = null) {
    this.state = e.state;
    let i = this.stateDeco;
    this.stateDeco = sl(this.state);
    let s = e.changedRanges, r = Me.extendWithRanges(s, hm(i, this.stateDeco, e ? e.changes : se.empty(this.state.doc.length))), o = this.heightMap.height, O = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollOffset);
    el(), this.heightMap = this.heightMap.applyChanges(this.stateDeco, e.startState.doc, this.heightOracle.setDoc(this.state.doc), r), (this.heightMap.height != o || Ci) && (e.flags |= 2), O ? (this.scrollAnchorPos = e.changes.mapPos(O.from, -1), this.scrollAnchorHeight = O.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = o);
    let a = r.length ? this.mapViewport(this.viewport, e.changes) : this.viewport;
    (t && (t.range.head < a.from || t.range.head > a.to) || !this.viewportIsAppropriate(a)) && (a = this.getViewport(0, t));
    let l = a.from != this.viewport.from || a.to != this.viewport.to;
    this.viewport = a, e.flags |= this.updateForViewport(), (l || !e.changes.empty || e.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, e.changes))), e.flags |= this.computeVisibleRanges(e.changes), t && (this.scrollTarget = t), !this.mustEnforceCursorAssoc && (e.selectionSet || e.focusChanged) && e.view.lineWrapping && e.state.selection.main.empty && e.state.selection.main.assoc && !e.state.facet(Xc) && (this.mustEnforceCursorAssoc = !0);
  }
  measure() {
    let { view: e } = this, t = e.contentDOM, i = window.getComputedStyle(t), s = this.heightOracle, r = i.whiteSpace;
    this.defaultTextDirection = i.direction == "rtl" ? I.RTL : I.LTR;
    let o = this.heightOracle.mustRefreshForWrapping(r) || this.mustMeasureContent === "refresh", O = t.getBoundingClientRect(), a = o || this.mustMeasureContent || this.contentDOMHeight != O.height;
    this.contentDOMHeight = O.height, this.mustMeasureContent = !1;
    let l = 0, h = 0;
    if (O.width && O.height) {
      let { scaleX: X, scaleY: b } = nc(t, O);
      (X > 5e-3 && Math.abs(this.scaleX - X) > 5e-3 || b > 5e-3 && Math.abs(this.scaleY - b) > 5e-3) && (this.scaleX = X, this.scaleY = b, l |= 16, o = a = !0);
    }
    let c = (parseInt(i.paddingTop) || 0) * this.scaleY, f = (parseInt(i.paddingBottom) || 0) * this.scaleY;
    (this.paddingTop != c || this.paddingBottom != f) && (this.paddingTop = c, this.paddingBottom = f, l |= 18), this.editorWidth != e.scrollDOM.clientWidth && (s.lineWrapping && (a = !0), this.editorWidth = e.scrollDOM.clientWidth, l |= 16);
    let u = sc(this.view.contentDOM, !1).y;
    u != this.scrollParent && (this.scrollParent = u, this.scrollAnchorHeight = -1, this.scrollOffset = 0);
    let d = this.getScrollOffset();
    this.scrollOffset != d && (this.scrollAnchorHeight = -1, this.scrollOffset = d), this.scrolledToBottom = ac(this.scrollParent || e.win);
    let m = (this.printing ? dm : fm)(t, this.paddingTop), g = m.top - this.pixelViewport.top, Q = m.bottom - this.pixelViewport.bottom;
    this.pixelViewport = m;
    let x = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
    if (x != this.inView && (this.inView = x, x && (a = !0)), !this.inView && !this.scrollTarget && !um(e.dom))
      return 0;
    let S = O.width;
    if ((this.contentDOMWidth != S || this.editorHeight != e.scrollDOM.clientHeight) && (this.contentDOMWidth = O.width, this.editorHeight = e.scrollDOM.clientHeight, l |= 16), a) {
      let X = e.docView.measureVisibleLineHeights(this.viewport);
      if (s.mustRefreshForHeights(X) && (o = !0), o || s.lineWrapping && Math.abs(S - this.contentDOMWidth) > s.charWidth) {
        let { lineHeight: b, charWidth: y, textHeight: _ } = e.docView.measureTextSize();
        o = b > 0 && s.refresh(r, b, y, _, Math.max(5, S / y), X), o && (e.docView.minWidth = 0, l |= 16);
      }
      g > 0 && Q > 0 ? h = Math.max(g, Q) : g < 0 && Q < 0 && (h = Math.min(g, Q)), el();
      for (let b of this.viewports) {
        let y = b.from == this.viewport.from ? X : e.docView.measureVisibleLineHeights(b);
        this.heightMap = (o ? be.empty().applyChanges(this.stateDeco, j.empty, this.heightOracle, [new Me(0, 0, 0, e.state.doc.length)]) : this.heightMap).updateHeight(s, 0, o, new om(b.from, y));
      }
      Ci && (l |= 2);
    }
    let T = !this.viewportIsAppropriate(this.viewport, h) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
    return T && (l & 2 && (l |= this.updateScaler()), this.viewport = this.getViewport(h, this.scrollTarget), l |= this.updateForViewport()), (l & 2 || T) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(o ? [] : this.lineGaps, e)), l |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, e.docView.enforceCursorAssoc()), l;
  }
  get visibleTop() {
    return this.scaler.fromDOM(this.pixelViewport.top);
  }
  get visibleBottom() {
    return this.scaler.fromDOM(this.pixelViewport.bottom);
  }
  getViewport(e, t) {
    let i = 0.5 - Math.max(-0.5, Math.min(0.5, e / 1e3 / 2)), s = this.heightMap, r = this.heightOracle, { visibleTop: o, visibleBottom: O } = this, a = new Jn(s.lineAt(o - i * 1e3, N.ByHeight, r, 0, 0).from, s.lineAt(O + (1 - i) * 1e3, N.ByHeight, r, 0, 0).to);
    if (t) {
      let { head: l } = t.range;
      if (l < a.from || l > a.to) {
        let h = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), c = s.lineAt(l, N.ByPos, r, 0, 0), f;
        t.y == "center" ? f = (c.top + c.bottom) / 2 - h / 2 : t.y == "start" || t.y == "nearest" && l < a.from ? f = c.top : f = c.bottom - h, a = new Jn(s.lineAt(f - 1e3 / 2, N.ByHeight, r, 0, 0).from, s.lineAt(f + h + 1e3 / 2, N.ByHeight, r, 0, 0).to);
      }
    }
    return a;
  }
  mapViewport(e, t) {
    let i = t.mapPos(e.from, -1), s = t.mapPos(e.to, 1);
    return new Jn(this.heightMap.lineAt(i, N.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(s, N.ByPos, this.heightOracle, 0, 0).to);
  }
  // Checks if a given viewport covers the visible part of the
  // document and not too much beyond that.
  viewportIsAppropriate({ from: e, to: t }, i = 0) {
    if (!this.inView)
      return !0;
    let { top: s } = this.heightMap.lineAt(e, N.ByPos, this.heightOracle, 0, 0), { bottom: r } = this.heightMap.lineAt(t, N.ByPos, this.heightOracle, 0, 0), { visibleTop: o, visibleBottom: O } = this;
    return (e == 0 || s <= o - Math.max(10, Math.min(
      -i,
      250
      /* VP.MaxCoverMargin */
    ))) && (t == this.state.doc.length || r >= O + Math.max(10, Math.min(
      i,
      250
      /* VP.MaxCoverMargin */
    ))) && s > o - 2 * 1e3 && r < O + 2 * 1e3;
  }
  mapLineGaps(e, t) {
    if (!e.length || t.empty)
      return e;
    let i = [];
    for (let s of e)
      t.touchesRange(s.from, s.to) || i.push(new Wr(t.mapPos(s.from), t.mapPos(s.to), s.size, s.displaySize));
    return i;
  }
  // Computes positions in the viewport where the start or end of a
  // line should be hidden, trying to reuse existing line gaps when
  // appropriate to avoid unneccesary redraws.
  // Uses crude character-counting for the positioning and sizing,
  // since actual DOM coordinates aren't always available and
  // predictable. Relies on generous margins (see LG.Margin) to hide
  // the artifacts this might produce from the user.
  ensureLineGaps(e, t) {
    let i = this.heightOracle.lineWrapping, s = i ? 1e4 : 2e3, r = s >> 1, o = s << 1;
    if (this.defaultTextDirection != I.LTR && !i)
      return [];
    let O = [], a = (h, c, f, u) => {
      if (c - h < r)
        return;
      let d = this.state.selection.main, m = [d.from];
      d.empty || m.push(d.to);
      for (let Q of m)
        if (Q > h && Q < c) {
          a(h, Q - 10, f, u), a(Q + 10, c, f, u);
          return;
        }
      let g = gm(e, (Q) => Q.from >= f.from && Q.to <= f.to && Math.abs(Q.from - h) < r && Math.abs(Q.to - c) < r && !m.some((x) => Q.from < x && Q.to > x));
      if (!g) {
        if (c < f.to && t && i && t.visibleRanges.some((S) => S.from <= c && S.to >= c)) {
          let S = t.moveToLineBoundary($.cursor(c), !1, !0).head;
          S > h && (c = S);
        }
        let Q = this.gapSize(f, h, c, u), x = i || Q < 2e6 ? Q : 2e6;
        g = new Wr(h, c, Q, x);
      }
      O.push(g);
    }, l = (h) => {
      if (h.length < o || h.type != pe.Text)
        return;
      let c = mm(h.from, h.to, this.stateDeco);
      if (c.total < o)
        return;
      let f = this.scrollTarget ? this.scrollTarget.range.head : null, u, d;
      if (i) {
        let m = s / this.heightOracle.lineLength * this.heightOracle.lineHeight, g, Q;
        if (f != null) {
          let x = ts(c, f), S = ((this.visibleBottom - this.visibleTop) / 2 + m) / h.height;
          g = x - S, Q = x + S;
        } else
          g = (this.visibleTop - h.top - m) / h.height, Q = (this.visibleBottom - h.top + m) / h.height;
        u = es(c, g), d = es(c, Q);
      } else {
        let m = c.total * this.heightOracle.charWidth, g = s * this.heightOracle.charWidth, Q = 0;
        if (m > 2e6)
          for (let b of e)
            b.from >= h.from && b.from < h.to && b.size != b.displaySize && b.from * this.heightOracle.charWidth + Q < this.pixelViewport.left && (Q = b.size - b.displaySize);
        let x = this.pixelViewport.left + Q, S = this.pixelViewport.right + Q, T, X;
        if (f != null) {
          let b = ts(c, f), y = ((S - x) / 2 + g) / m;
          T = b - y, X = b + y;
        } else
          T = (x - g) / m, X = (S + g) / m;
        u = es(c, T), d = es(c, X);
      }
      u > h.from && a(h.from, u, h, c), d < h.to && a(d, h.to, h, c);
    };
    for (let h of this.viewportLines)
      Array.isArray(h.type) ? h.type.forEach(l) : l(h);
    return O;
  }
  gapSize(e, t, i, s) {
    let r = ts(s, i) - ts(s, t);
    return this.heightOracle.lineWrapping ? e.height * r : s.total * this.heightOracle.charWidth * r;
  }
  updateLineGaps(e) {
    Wr.same(e, this.lineGaps) || (this.lineGaps = e, this.lineGapDeco = Y.set(e.map((t) => t.draw(this, this.heightOracle.lineWrapping))));
  }
  computeVisibleRanges(e) {
    let t = this.stateDeco;
    this.lineGaps.length && (t = t.concat(this.lineGapDeco));
    let i = [];
    C.spans(t, this.viewport.from, this.viewport.to, {
      span(r, o) {
        i.push({ from: r, to: o });
      },
      point() {
      }
    }, 20);
    let s = 0;
    if (i.length != this.visibleRanges.length)
      s = 12;
    else
      for (let r = 0; r < i.length && !(s & 8); r++) {
        let o = this.visibleRanges[r], O = i[r];
        (o.from != O.from || o.to != O.to) && (s |= 4, e && e.mapPos(o.from, -1) == O.from && e.mapPos(o.to, 1) == O.to || (s |= 8));
      }
    return this.visibleRanges = i, s;
  }
  lineBlockAt(e) {
    return e >= this.viewport.from && e <= this.viewport.to && this.viewportLines.find((t) => t.from <= e && t.to >= e) || sn(this.heightMap.lineAt(e, N.ByPos, this.heightOracle, 0, 0), this.scaler);
  }
  lineBlockAtHeight(e) {
    return e >= this.viewportLines[0].top && e <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((t) => t.top <= e && t.bottom >= e) || sn(this.heightMap.lineAt(this.scaler.fromDOM(e), N.ByHeight, this.heightOracle, 0, 0), this.scaler);
  }
  getScrollOffset() {
    return (this.scrollParent == this.view.scrollDOM ? this.scrollParent.scrollTop : (this.scrollParent ? this.scrollParent.getBoundingClientRect().top : 0) - this.view.contentDOM.getBoundingClientRect().top) * this.scaleY;
  }
  scrollAnchorAt(e) {
    let t = this.lineBlockAtHeight(e + 8);
    return t.from >= this.viewport.from || this.viewportLines[0].top - e > 200 ? t : this.viewportLines[0];
  }
  elementAtHeight(e) {
    return sn(this.heightMap.blockAt(this.scaler.fromDOM(e), this.heightOracle, 0, 0), this.scaler);
  }
  get docHeight() {
    return this.scaler.toDOM(this.heightMap.height);
  }
  get contentHeight() {
    return this.docHeight + this.paddingTop + this.paddingBottom;
  }
}
class Jn {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
function mm(n, e, t) {
  let i = [], s = n, r = 0;
  return C.spans(t, n, e, {
    span() {
    },
    point(o, O) {
      o > s && (i.push({ from: s, to: o }), r += o - s), s = O;
    }
  }, 20), s < e && (i.push({ from: s, to: e }), r += e - s), { total: r, ranges: i };
}
function es({ total: n, ranges: e }, t) {
  if (t <= 0)
    return e[0].from;
  if (t >= 1)
    return e[e.length - 1].to;
  let i = Math.floor(n * t);
  for (let s = 0; ; s++) {
    let { from: r, to: o } = e[s], O = o - r;
    if (i <= O)
      return r + i;
    i -= O;
  }
}
function ts(n, e) {
  let t = 0;
  for (let { from: i, to: s } of n.ranges) {
    if (e <= s) {
      t += e - i;
      break;
    }
    t += s - i;
  }
  return t / n.total;
}
function gm(n, e) {
  for (let t of n)
    if (e(t))
      return t;
}
const nl = {
  toDOM(n) {
    return n;
  },
  fromDOM(n) {
    return n;
  },
  scale: 1,
  eq(n) {
    return n == this;
  }
};
function sl(n) {
  let e = n.facet(hr).filter((i) => typeof i != "function"), t = n.facet(TO).filter((i) => typeof i != "function");
  return t.length && e.push(C.join(t)), e;
}
class _O {
  constructor(e, t, i) {
    let s = 0, r = 0, o = 0;
    this.viewports = i.map(({ from: O, to: a }) => {
      let l = t.lineAt(O, N.ByPos, e, 0, 0).top, h = t.lineAt(a, N.ByPos, e, 0, 0).bottom;
      return s += h - l, { from: O, to: a, top: l, bottom: h, domTop: 0, domBottom: 0 };
    }), this.scale = (7e6 - s) / (t.height - s);
    for (let O of this.viewports)
      O.domTop = o + (O.top - r) * this.scale, o = O.domBottom = O.domTop + (O.bottom - O.top), r = O.bottom;
  }
  toDOM(e) {
    for (let t = 0, i = 0, s = 0; ; t++) {
      let r = t < this.viewports.length ? this.viewports[t] : null;
      if (!r || e < r.top)
        return s + (e - i) * this.scale;
      if (e <= r.bottom)
        return r.domTop + (e - r.top);
      i = r.bottom, s = r.domBottom;
    }
  }
  fromDOM(e) {
    for (let t = 0, i = 0, s = 0; ; t++) {
      let r = t < this.viewports.length ? this.viewports[t] : null;
      if (!r || e < r.domTop)
        return i + (e - s) / this.scale;
      if (e <= r.domBottom)
        return r.top + (e - r.domTop);
      i = r.bottom, s = r.domBottom;
    }
  }
  eq(e) {
    return e instanceof _O ? this.scale == e.scale && this.viewports.length == e.viewports.length && this.viewports.every((t, i) => t.from == e.viewports[i].from && t.to == e.viewports[i].to) : !1;
  }
}
function sn(n, e) {
  if (e.scale == 1)
    return n;
  let t = e.toDOM(n.top), i = e.toDOM(n.bottom);
  return new Ie(n.from, n.length, t, i - t, Array.isArray(n._content) ? n._content.map((s) => sn(s, e)) : n._content);
}
const is = /* @__PURE__ */ v.define({ combine: (n) => n.join(" ") }), Eo = /* @__PURE__ */ v.define({ combine: (n) => n.indexOf(!0) > -1 }), Mo = /* @__PURE__ */ At.newName(), Lc = /* @__PURE__ */ At.newName(), Dc = /* @__PURE__ */ At.newName(), Ic = { "&light": "." + Lc, "&dark": "." + Dc };
function Go(n, e, t) {
  return new At(e, {
    finish(i) {
      return /&/.test(i) ? i.replace(/&\w*/, (s) => {
        if (s == "&")
          return n;
        if (!t || !t[s])
          throw new RangeError(`Unsupported selector: ${s}`);
        return t[s];
      }) : n + " " + i;
    }
  });
}
const Qm = /* @__PURE__ */ Go("." + Mo, {
  "&": {
    position: "relative !important",
    boxSizing: "border-box",
    "&.cm-focused": {
      // Provide a simple default outline to make sure a focused
      // editor is visually distinct. Can't leave the default behavior
      // because that will apply to the content element, which is
      // inside the scrollable container and doesn't include the
      // gutters. We also can't use an 'auto' outline, since those
      // are, for some reason, drawn behind the element content, which
      // will cause things like the active line background to cover
      // the outline (#297).
      outline: "1px dotted #212121"
    },
    display: "flex !important",
    flexDirection: "column"
  },
  ".cm-scroller": {
    display: "flex !important",
    alignItems: "flex-start !important",
    fontFamily: "monospace",
    lineHeight: 1.4,
    height: "100%",
    overflowX: "auto",
    position: "relative",
    zIndex: 0,
    overflowAnchor: "none"
  },
  ".cm-content": {
    margin: 0,
    flexGrow: 2,
    flexShrink: 0,
    display: "block",
    whiteSpace: "pre",
    wordWrap: "normal",
    // Issue #456
    boxSizing: "border-box",
    minHeight: "100%",
    padding: "4px 0",
    outline: "none",
    "&[contenteditable=true]": {
      WebkitUserModify: "read-write-plaintext-only"
    }
  },
  ".cm-lineWrapping": {
    whiteSpace_fallback: "pre-wrap",
    // For IE
    whiteSpace: "break-spaces",
    wordBreak: "break-word",
    // For Safari, which doesn't support overflow-wrap: anywhere
    overflowWrap: "anywhere",
    flexShrink: 1
  },
  "&light .cm-content": { caretColor: "black" },
  "&dark .cm-content": { caretColor: "white" },
  ".cm-line": {
    display: "block",
    padding: "0 2px 0 6px"
  },
  ".cm-layer": {
    userSelect: "none",
    // #1708
    position: "absolute",
    left: 0,
    top: 0,
    contain: "size style",
    "& > *": {
      position: "absolute"
    }
  },
  "&light .cm-selectionBackground": {
    background: "#d9d9d9"
  },
  "&dark .cm-selectionBackground": {
    background: "#222"
  },
  "&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#d7d4f0"
  },
  "&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#233"
  },
  ".cm-cursorLayer": {
    pointerEvents: "none"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer": {
    animation: "steps(1) cm-blink 1.2s infinite"
  },
  // Two animations defined so that we can switch between them to
  // restart the animation without forcing another style
  // recomputation.
  "@keyframes cm-blink": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  "@keyframes cm-blink2": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  ".cm-cursor, .cm-dropCursor": {
    borderLeft: "1.2px solid black",
    marginLeft: "-0.6px",
    pointerEvents: "none"
  },
  ".cm-cursor": {
    display: "none"
  },
  "&dark .cm-cursor": {
    borderLeftColor: "#ddd"
  },
  ".cm-selectionHandle": {
    backgroundColor: "currentColor",
    width: "1.5px"
  },
  ".cm-selectionHandle-start::before, .cm-selectionHandle-end::before": {
    content: '""',
    backgroundColor: "inherit",
    borderRadius: "50%",
    width: "8px",
    height: "8px",
    position: "absolute",
    left: "-3.25px"
  },
  ".cm-selectionHandle-start::before": { top: "-8px" },
  ".cm-selectionHandle-end::before": { bottom: "-8px" },
  ".cm-dropCursor": {
    position: "absolute"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor": {
    display: "block"
  },
  ".cm-iso": {
    unicodeBidi: "isolate"
  },
  ".cm-announced": {
    position: "fixed",
    top: "-10000px"
  },
  "@media print": {
    ".cm-announced": { display: "none" }
  },
  "&light .cm-activeLine": { backgroundColor: "#cceeff44" },
  "&dark .cm-activeLine": { backgroundColor: "#99eeff33" },
  "&light .cm-specialChar": { color: "red" },
  "&dark .cm-specialChar": { color: "#f78" },
  ".cm-gutters": {
    flexShrink: 0,
    display: "flex",
    height: "100%",
    boxSizing: "border-box",
    zIndex: 200
  },
  ".cm-gutters-before": { insetInlineStart: 0 },
  ".cm-gutters-after": { insetInlineEnd: 0 },
  "&light .cm-gutters": {
    backgroundColor: "#f5f5f5",
    color: "#6c6c6c",
    border: "0px solid #ddd",
    "&.cm-gutters-before": { borderRightWidth: "1px" },
    "&.cm-gutters-after": { borderLeftWidth: "1px" }
  },
  "&dark .cm-gutters": {
    backgroundColor: "#333338",
    color: "#ccc"
  },
  ".cm-gutter": {
    display: "flex !important",
    // Necessary -- prevents margin collapsing
    flexDirection: "column",
    flexShrink: 0,
    boxSizing: "border-box",
    minHeight: "100%",
    overflow: "hidden"
  },
  ".cm-gutterElement": {
    boxSizing: "border-box"
  },
  ".cm-lineNumbers .cm-gutterElement": {
    padding: "0 3px 0 5px",
    minWidth: "20px",
    textAlign: "right",
    whiteSpace: "nowrap"
  },
  "&light .cm-activeLineGutter": {
    backgroundColor: "#e2f2ff"
  },
  "&dark .cm-activeLineGutter": {
    backgroundColor: "#222227"
  },
  ".cm-panels": {
    boxSizing: "border-box",
    position: "sticky",
    left: 0,
    right: 0,
    zIndex: 300
  },
  "&light .cm-panels": {
    backgroundColor: "#f5f5f5",
    color: "black"
  },
  ".cm-panels-top": { top: "0" },
  ".cm-panels-bottom": { bottom: "0" },
  "&light .cm-panels-top": {
    borderBottom: "1px solid #ddd"
  },
  "&light .cm-panels-bottom": {
    borderTop: "1px solid #ddd"
  },
  "&dark .cm-panels": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-dialog": {
    padding: "2px 19px 4px 6px",
    position: "relative",
    "& label": { fontSize: "80%" }
  },
  ".cm-dialog-close": {
    position: "absolute",
    top: "3px",
    right: "4px",
    backgroundColor: "inherit",
    border: "none",
    font: "inherit",
    fontSize: "14px",
    padding: "0"
  },
  ".cm-tab": {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "bottom"
  },
  ".cm-widgetBuffer": {
    verticalAlign: "text-top",
    height: "1em",
    width: 0,
    display: "inline"
  },
  ".cm-placeholder": {
    color: "#888",
    display: "inline-block",
    verticalAlign: "top",
    userSelect: "none"
  },
  ".cm-highlightSpace": {
    backgroundImage: "radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",
    backgroundPosition: "center"
  },
  ".cm-highlightTab": {
    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,
    backgroundSize: "auto 100%",
    backgroundPosition: "right 90%",
    backgroundRepeat: "no-repeat"
  },
  ".cm-trailingSpace": {
    backgroundColor: "#ff332255"
  },
  ".cm-button": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    padding: ".2em 1em",
    borderRadius: "1px"
  },
  "&light .cm-button": {
    backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
    }
  },
  "&dark .cm-button": {
    backgroundImage: "linear-gradient(#393939, #111)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#111, #333)"
    }
  },
  ".cm-textfield": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    border: "1px solid silver",
    padding: ".2em .5em"
  },
  "&light .cm-textfield": {
    backgroundColor: "white"
  },
  "&dark .cm-textfield": {
    border: "1px solid #555",
    backgroundColor: "inherit"
  }
}, Ic), $m = {
  childList: !0,
  characterData: !0,
  subtree: !0,
  attributes: !0,
  characterDataOldValue: !0
}, jr = k.ie && k.ie_version <= 11;
class Pm {
  constructor(e) {
    this.view = e, this.active = !1, this.editContext = null, this.selectionRange = new Nd(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = e.contentDOM, this.observer = new MutationObserver((t) => {
      for (let i of t)
        this.queue.push(i);
      (k.ie && k.ie_version <= 11 || k.ios && e.composing) && t.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), window.EditContext && k.android && e.constructor.EDIT_CONTEXT !== !1 && // Chrome <126 doesn't support inverted selections in edit context (#1392)
    !(k.chrome && k.chrome_version < 126) && (this.editContext = new xm(e), e.state.facet(Xt) && (e.contentDOM.editContext = this.editContext.editContext)), jr && (this.onCharData = (t) => {
      this.queue.push({
        target: t.target,
        type: "characterData",
        oldValue: t.prevValue
      }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this), this.onResize = this.onResize.bind(this), this.onPrint = this.onPrint.bind(this), this.onScroll = this.onScroll.bind(this), window.matchMedia && (this.printQuery = window.matchMedia("print")), typeof ResizeObserver == "function" && (this.resizeScroll = new ResizeObserver(() => {
      var t;
      ((t = this.view.docView) === null || t === void 0 ? void 0 : t.lastUpdate) < Date.now() - 75 && this.onResize();
    }), this.resizeScroll.observe(e.scrollDOM)), this.addWindowListeners(this.win = e.win), this.start(), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver((t) => {
      this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), t.length > 0 && t[t.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")));
    }, { threshold: [0, 1e-3] }), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver((t) => {
      t.length > 0 && t[t.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"));
    }, {})), this.listenForScroll(), this.readSelectionRange();
  }
  onScrollChanged(e) {
    this.view.inputState.runHandlers("scroll", e), this.intersecting && this.view.measure();
  }
  onScroll(e) {
    this.intersecting && this.flush(!1), this.editContext && this.view.requestMeasure(this.editContext.measureReq), this.onScrollChanged(e);
  }
  onResize() {
    this.resizeTimeout < 0 && (this.resizeTimeout = setTimeout(() => {
      this.resizeTimeout = -1, this.view.requestMeasure();
    }, 50));
  }
  onPrint(e) {
    (e.type == "change" || !e.type) && !e.matches || (this.view.viewState.printing = !0, this.view.measure(), setTimeout(() => {
      this.view.viewState.printing = !1, this.view.requestMeasure();
    }, 500));
  }
  updateGaps(e) {
    if (this.gapIntersection && (e.length != this.gaps.length || this.gaps.some((t, i) => t != e[i]))) {
      this.gapIntersection.disconnect();
      for (let t of e)
        this.gapIntersection.observe(t);
      this.gaps = e;
    }
  }
  onSelectionChange(e) {
    let t = this.selectionChanged;
    if (!this.readSelectionRange() || this.delayedAndroidKey)
      return;
    let { view: i } = this, s = this.selectionRange;
    if (i.state.facet(Xt) ? i.root.activeElement != this.dom : !ln(this.dom, s))
      return;
    let r = s.anchorNode && i.docView.tile.nearest(s.anchorNode);
    if (r && r.isWidget() && r.widget.ignoreEvent(e)) {
      t || (this.selectionChanged = !1);
      return;
    }
    (k.ie && k.ie_version <= 11 || k.android && k.chrome) && !i.state.selection.main.empty && // (Selection.isCollapsed isn't reliable on IE)
    s.focusNode && hn(s.focusNode, s.focusOffset, s.anchorNode, s.anchorOffset) ? this.flushSoon() : this.flush(!1);
  }
  readSelectionRange() {
    let { view: e } = this, t = Pn(e.root);
    if (!t)
      return !1;
    let i = k.safari && e.root.nodeType == 11 && e.root.activeElement == this.dom && Sm(this.view, t) || t;
    if (!i || this.selectionRange.eq(i))
      return !1;
    let s = ln(this.dom, i);
    return s && !this.selectionChanged && e.inputState.lastFocusTime > Date.now() - 200 && e.inputState.lastTouchTime < Date.now() - 300 && Hd(this.dom, i) ? (this.view.inputState.lastFocusTime = 0, e.docView.updateSelection(), !1) : (this.selectionRange.setRange(i), s && (this.selectionChanged = !0), !0);
  }
  setSelectionRange(e, t) {
    this.selectionRange.set(e.node, e.offset, t.node, t.offset), this.selectionChanged = !1;
  }
  clearSelectionRange() {
    this.selectionRange.set(null, 0, null, 0);
  }
  listenForScroll() {
    this.parentCheck = -1;
    let e = 0, t = null;
    for (let i = this.dom; i; )
      if (i.nodeType == 1)
        !t && e < this.scrollTargets.length && this.scrollTargets[e] == i ? e++ : t || (t = this.scrollTargets.slice(0, e)), t && t.push(i), i = i.assignedSlot || i.parentNode;
      else if (i.nodeType == 11)
        i = i.host;
      else
        break;
    if (e < this.scrollTargets.length && !t && (t = this.scrollTargets.slice(0, e)), t) {
      for (let i of this.scrollTargets)
        i.removeEventListener("scroll", this.onScroll);
      for (let i of this.scrollTargets = t)
        i.addEventListener("scroll", this.onScroll);
    }
  }
  ignore(e) {
    if (!this.active)
      return e();
    try {
      return this.stop(), e();
    } finally {
      this.start(), this.clear();
    }
  }
  start() {
    this.active || (this.observer.observe(this.dom, $m), jr && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = !0);
  }
  stop() {
    this.active && (this.active = !1, this.observer.disconnect(), jr && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
  }
  // Throw away any pending changes
  clear() {
    this.processRecords(), this.queue.length = 0, this.selectionChanged = !1;
  }
  // Chrome Android, especially in combination with GBoard, not only
  // doesn't reliably fire regular key events, but also often
  // surrounds the effect of enter or backspace with a bunch of
  // composition events that, when interrupted, cause text duplication
  // or other kinds of corruption. This hack makes the editor back off
  // from handling DOM changes for a moment when such a key is
  // detected (via beforeinput or keydown), and then tries to flush
  // them or, if that has no effect, dispatches the given key.
  delayAndroidKey(e, t) {
    var i;
    if (!this.delayedAndroidKey) {
      let s = () => {
        let r = this.delayedAndroidKey;
        r && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = r.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && r.force && Zi(this.dom, r.key, r.keyCode));
      };
      this.flushingAndroidKey = this.view.win.requestAnimationFrame(s);
    }
    (!this.delayedAndroidKey || e == "Enter") && (this.delayedAndroidKey = {
      key: e,
      keyCode: t,
      // Only run the key handler when no changes are detected if
      // this isn't coming right after another change, in which case
      // it is probably part of a weird chain of updates, and should
      // be ignored if it returns the DOM to its previous state.
      force: this.lastChange < Date.now() - 50 || !!(!((i = this.delayedAndroidKey) === null || i === void 0) && i.force)
    });
  }
  clearDelayedAndroidKey() {
    this.win.cancelAnimationFrame(this.flushingAndroidKey), this.delayedAndroidKey = null, this.flushingAndroidKey = -1;
  }
  flushSoon() {
    this.delayedFlush < 0 && (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
      this.delayedFlush = -1, this.flush();
    }));
  }
  forceFlush() {
    this.delayedFlush >= 0 && (this.view.win.cancelAnimationFrame(this.delayedFlush), this.delayedFlush = -1), this.flush();
  }
  pendingRecords() {
    for (let e of this.observer.takeRecords())
      this.queue.push(e);
    return this.queue;
  }
  processRecords() {
    let e = this.pendingRecords();
    e.length && (this.queue = []);
    let t = -1, i = -1, s = !1;
    for (let r of e) {
      let o = this.readMutation(r);
      o && (o.typeOver && (s = !0), t == -1 ? { from: t, to: i } = o : (t = Math.min(o.from, t), i = Math.max(o.to, i)));
    }
    return { from: t, to: i, typeOver: s };
  }
  readChange() {
    let { from: e, to: t, typeOver: i } = this.processRecords(), s = this.selectionChanged && ln(this.dom, this.selectionRange);
    if (e < 0 && !s)
      return null;
    e > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1;
    let r = new Cp(this.view, e, t, i);
    return this.view.docView.domChanged = { newSel: r.newSel ? r.newSel.main : null }, r;
  }
  // Apply pending changes, if any
  flush(e = !0) {
    if (this.delayedFlush >= 0 || this.delayedAndroidKey)
      return !1;
    e && this.readSelectionRange();
    let t = this.readChange();
    if (!t)
      return this.view.requestMeasure(), !1;
    let i = this.view.state, s = _c(this.view, t);
    return this.view.state == i && (t.domChanged || t.newSel && !Vs(this.view.state.selection, t.newSel.main)) && this.view.update([]), s;
  }
  readMutation(e) {
    let t = this.view.docView.tile.nearest(e.target);
    if (!t || t.isWidget())
      return null;
    if (t.markDirty(e.type == "attributes"), e.type == "childList") {
      let i = rl(t, e.previousSibling || e.target.previousSibling, -1), s = rl(t, e.nextSibling || e.target.nextSibling, 1);
      return {
        from: i ? t.posAfter(i) : t.posAtStart,
        to: s ? t.posBefore(s) : t.posAtEnd,
        typeOver: !1
      };
    } else return e.type == "characterData" ? { from: t.posAtStart, to: t.posAtEnd, typeOver: e.target.nodeValue == e.oldValue } : null;
  }
  setWindow(e) {
    e != this.win && (this.removeWindowListeners(this.win), this.win = e, this.addWindowListeners(this.win));
  }
  addWindowListeners(e) {
    e.addEventListener("resize", this.onResize), this.printQuery ? this.printQuery.addEventListener ? this.printQuery.addEventListener("change", this.onPrint) : this.printQuery.addListener(this.onPrint) : e.addEventListener("beforeprint", this.onPrint), e.addEventListener("scroll", this.onScroll), e.document.addEventListener("selectionchange", this.onSelectionChange);
  }
  removeWindowListeners(e) {
    e.removeEventListener("scroll", this.onScroll), e.removeEventListener("resize", this.onResize), this.printQuery ? this.printQuery.removeEventListener ? this.printQuery.removeEventListener("change", this.onPrint) : this.printQuery.removeListener(this.onPrint) : e.removeEventListener("beforeprint", this.onPrint), e.document.removeEventListener("selectionchange", this.onSelectionChange);
  }
  update(e) {
    this.editContext && (this.editContext.update(e), e.startState.facet(Xt) != e.state.facet(Xt) && (e.view.contentDOM.editContext = e.state.facet(Xt) ? this.editContext.editContext : null));
  }
  destroy() {
    var e, t, i;
    this.stop(), (e = this.intersection) === null || e === void 0 || e.disconnect(), (t = this.gapIntersection) === null || t === void 0 || t.disconnect(), (i = this.resizeScroll) === null || i === void 0 || i.disconnect();
    for (let s of this.scrollTargets)
      s.removeEventListener("scroll", this.onScroll);
    this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
  }
}
function rl(n, e, t) {
  for (; e; ) {
    let i = K.get(e);
    if (i && i.parent == n)
      return i;
    let s = e.parentNode;
    e = s != n.dom ? s : t > 0 ? e.nextSibling : e.previousSibling;
  }
  return null;
}
function ol(n, e) {
  let t = e.startContainer, i = e.startOffset, s = e.endContainer, r = e.endOffset, o = n.docView.domAtPos(n.state.selection.main.anchor, 1);
  return hn(o.node, o.offset, s, r) && ([t, i, s, r] = [s, r, t, i]), { anchorNode: t, anchorOffset: i, focusNode: s, focusOffset: r };
}
function Sm(n, e) {
  if (e.getComposedRanges) {
    let s = e.getComposedRanges(n.root)[0];
    if (s)
      return ol(n, s);
  }
  let t = null;
  function i(s) {
    s.preventDefault(), s.stopImmediatePropagation(), t = s.getTargetRanges()[0];
  }
  return n.contentDOM.addEventListener("beforeinput", i, !0), n.dom.ownerDocument.execCommand("indent"), n.contentDOM.removeEventListener("beforeinput", i, !0), t ? ol(n, t) : null;
}
class xm {
  constructor(e) {
    this.from = 0, this.to = 0, this.pendingContextChange = null, this.handlers = /* @__PURE__ */ Object.create(null), this.composing = null, this.resetRange(e.state);
    let t = this.editContext = new window.EditContext({
      text: e.state.doc.sliceString(this.from, this.to),
      selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, e.state.selection.main.anchor))),
      selectionEnd: this.toContextPos(e.state.selection.main.head)
    });
    this.handlers.textupdate = (i) => {
      let s = e.state.selection.main, { anchor: r, head: o } = s, O = this.toEditorPos(i.updateRangeStart), a = this.toEditorPos(i.updateRangeEnd);
      e.inputState.composing >= 0 && !this.composing && (this.composing = { contextBase: i.updateRangeStart, editorBase: O, drifted: !1 });
      let l = a - O > i.text.length;
      O == this.from && r < this.from ? O = r : a == this.to && r > this.to && (a = r);
      let h = qc(e.state.sliceDoc(O, a), i.text, (l ? s.from : s.to) - O, l ? "end" : null);
      if (!h) {
        let f = $.single(this.toEditorPos(i.selectionStart), this.toEditorPos(i.selectionEnd));
        Vs(f, s) || e.dispatch({ selection: f, userEvent: "select" });
        return;
      }
      let c = {
        from: h.from + O,
        to: h.toA + O,
        insert: j.of(i.text.slice(h.from, h.toB).split(`
`))
      };
      if ((k.mac || k.android) && c.from == o - 1 && /^\. ?$/.test(i.text) && e.contentDOM.getAttribute("autocorrect") == "off" && (c = { from: O, to: a, insert: j.of([i.text.replace(".", " ")]) }), this.pendingContextChange = c, !e.state.readOnly) {
        let f = this.to - this.from + (c.to - c.from + c.insert.length);
        YO(e, c, $.single(this.toEditorPos(i.selectionStart, f), this.toEditorPos(i.selectionEnd, f)));
      }
      this.pendingContextChange && (this.revertPending(e.state), this.setSelection(e.state)), c.from < c.to && !c.insert.length && e.inputState.composing >= 0 && !/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0, i.updateRangeStart - 1), Math.min(t.text.length, i.updateRangeStart + 1))) && this.handlers.compositionend(i);
    }, this.handlers.characterboundsupdate = (i) => {
      let s = [], r = null;
      for (let o = this.toEditorPos(i.rangeStart), O = this.toEditorPos(i.rangeEnd); o < O; o++) {
        let a = e.coordsForChar(o);
        r = a && new DOMRect(a.left, a.top, a.right - a.left, a.bottom - a.top) || r || new DOMRect(), s.push(r);
      }
      t.updateCharacterBounds(i.rangeStart, s);
    }, this.handlers.textformatupdate = (i) => {
      let s = [];
      for (let r of i.getTextFormats()) {
        let o = r.underlineStyle, O = r.underlineThickness;
        if (!/none/i.test(o) && !/none/i.test(O)) {
          let a = this.toEditorPos(r.rangeStart), l = this.toEditorPos(r.rangeEnd);
          if (a < l) {
            let h = `text-decoration: underline ${/^[a-z]/.test(o) ? o + " " : o == "Dashed" ? "dashed " : o == "Squiggle" ? "wavy " : ""}${/thin/i.test(O) ? 1 : 2}px`;
            s.push(Y.mark({ attributes: { style: h } }).range(a, l));
          }
        }
      }
      e.dispatch({ effects: yc.of(Y.set(s)) });
    }, this.handlers.compositionstart = () => {
      e.inputState.composing < 0 && (e.inputState.composing = 0, e.inputState.compositionFirstChange = !0);
    }, this.handlers.compositionend = () => {
      if (e.inputState.composing = -1, e.inputState.compositionFirstChange = null, this.composing) {
        let { drifted: i } = this.composing;
        this.composing = null, i && this.reset(e.state);
      }
    };
    for (let i in this.handlers)
      t.addEventListener(i, this.handlers[i]);
    this.measureReq = { read: (i) => {
      let s = Pn(i.root);
      s && s.rangeCount && this.editContext.updateSelectionBounds(s.getRangeAt(0).getBoundingClientRect());
    } };
  }
  applyEdits(e) {
    let t = 0, i = !1, s = this.pendingContextChange;
    return e.changes.iterChanges((r, o, O, a, l) => {
      if (i)
        return;
      let h = l.length - (o - r);
      if (s && o >= s.to)
        if (s.from == r && s.to == o && s.insert.eq(l)) {
          s = this.pendingContextChange = null, t += h, this.to += h;
          return;
        } else
          s = null, this.revertPending(e.state);
      if (r += t, o += t, o <= this.from)
        this.from += h, this.to += h;
      else if (r < this.to) {
        if (r < this.from || o > this.to || this.to - this.from + l.length > 3e4) {
          i = !0;
          return;
        }
        this.editContext.updateText(this.toContextPos(r), this.toContextPos(o), l.toString()), this.to += h;
      }
      t += h;
    }), s && !i && this.revertPending(e.state), !i;
  }
  update(e) {
    let t = this.pendingContextChange, i = e.startState.selection.main;
    this.composing && (this.composing.drifted || !e.changes.touchesRange(i.from, i.to) && e.transactions.some((s) => !s.isUserEvent("input.type") && s.changes.touchesRange(this.from, this.to))) ? (this.composing.drifted = !0, this.composing.editorBase = e.changes.mapPos(this.composing.editorBase)) : !this.applyEdits(e) || !this.rangeIsValid(e.state) ? (this.pendingContextChange = null, this.reset(e.state)) : (e.docChanged || e.selectionSet || t) && this.setSelection(e.state), (e.geometryChanged || e.docChanged || e.selectionSet) && e.view.requestMeasure(this.measureReq);
  }
  resetRange(e) {
    let { head: t } = e.selection.main;
    this.from = Math.max(
      0,
      t - 1e4
      /* CxVp.Margin */
    ), this.to = Math.min(
      e.doc.length,
      t + 1e4
      /* CxVp.Margin */
    );
  }
  reset(e) {
    this.resetRange(e), this.editContext.updateText(0, this.editContext.text.length, e.doc.sliceString(this.from, this.to)), this.setSelection(e);
  }
  revertPending(e) {
    let t = this.pendingContextChange;
    this.pendingContextChange = null, this.editContext.updateText(this.toContextPos(t.from), this.toContextPos(t.from + t.insert.length), e.doc.sliceString(t.from, t.to));
  }
  setSelection(e) {
    let { main: t } = e.selection, i = this.toContextPos(Math.max(this.from, Math.min(this.to, t.anchor))), s = this.toContextPos(t.head);
    (this.editContext.selectionStart != i || this.editContext.selectionEnd != s) && this.editContext.updateSelection(i, s);
  }
  rangeIsValid(e) {
    let { head: t } = e.selection.main;
    return !(this.from > 0 && t - this.from < 500 || this.to < e.doc.length && this.to - t < 500 || this.to - this.from > 1e4 * 3);
  }
  toEditorPos(e, t = this.to - this.from) {
    e = Math.min(e, t);
    let i = this.composing;
    return i && i.drifted ? i.editorBase + (e - i.contextBase) : e + this.from;
  }
  toContextPos(e) {
    let t = this.composing;
    return t && t.drifted ? t.contextBase + (e - t.editorBase) : e - this.from;
  }
  destroy() {
    for (let e in this.handlers)
      this.editContext.removeEventListener(e, this.handlers[e]);
  }
}
class Z {
  /**
  The current editor state.
  */
  get state() {
    return this.viewState.state;
  }
  /**
  To be able to display large documents without consuming too much
  memory or overloading the browser, CodeMirror only draws the
  code that is visible (plus a margin around it) to the DOM. This
  property tells you the extent of the current drawn viewport, in
  document positions.
  */
  get viewport() {
    return this.viewState.viewport;
  }
  /**
  When there are, for example, large collapsed ranges in the
  viewport, its size can be a lot bigger than the actual visible
  content. Thus, if you are doing something like styling the
  content in the viewport, it is preferable to only do so for
  these ranges, which are the subset of the viewport that is
  actually drawn.
  */
  get visibleRanges() {
    return this.viewState.visibleRanges;
  }
  /**
  Returns false when the editor is entirely scrolled out of view
  or otherwise hidden.
  */
  get inView() {
    return this.viewState.inView;
  }
  /**
  Indicates whether the user is currently composing text via
  [IME](https://en.wikipedia.org/wiki/Input_method), and at least
  one change has been made in the current composition.
  */
  get composing() {
    return !!this.inputState && this.inputState.composing > 0;
  }
  /**
  Indicates whether the user is currently in composing state. Note
  that on some platforms, like Android, this will be the case a
  lot, since just putting the cursor on a word starts a
  composition there.
  */
  get compositionStarted() {
    return !!this.inputState && this.inputState.composing >= 0;
  }
  /**
  The document or shadow root that the view lives in.
  */
  get root() {
    return this._root;
  }
  /**
  @internal
  */
  get win() {
    return this.dom.ownerDocument.defaultView || window;
  }
  /**
  Construct a new view. You'll want to either provide a `parent`
  option, or put `view.dom` into your document after creating a
  view, so that the user can see the editor.
  */
  constructor(e = {}) {
    var t;
    this.plugins = [], this.pluginMap = /* @__PURE__ */ new Map(), this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = !1, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.className = "cm-announced", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), e.parent && e.parent.appendChild(this.dom);
    let { dispatch: i } = e;
    this.dispatchTransactions = e.dispatchTransactions || i && ((s) => s.forEach((r) => i(r, this))) || ((s) => this.update(s)), this.dispatch = this.dispatch.bind(this), this._root = e.root || Fd(e.parent) || document, this.viewState = new il(this, e.state || A.create(e)), e.scrollTo && e.scrollTo.is(Fn) && (this.viewState.scrollTarget = e.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet(Pi).map((s) => new _r(s));
    for (let s of this.plugins)
      s.update(this);
    this.observer = new Pm(this), this.inputState = new Ep(this), this.inputState.ensureHandlers(this.plugins), this.docView = new Ma(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), !((t = document.fonts) === null || t === void 0) && t.ready && document.fonts.ready.then(() => {
      this.viewState.mustMeasureContent = "refresh", this.requestMeasure();
    });
  }
  dispatch(...e) {
    let t = e.length == 1 && e[0] instanceof ne ? e : e.length == 1 && Array.isArray(e[0]) ? e[0] : [this.state.update(...e)];
    this.dispatchTransactions(t, this);
  }
  /**
  Update the view for the given array of transactions. This will
  update the visible document and selection to match the state
  produced by the transactions, and notify view plugins of the
  change. You should usually call
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead, which uses this
  as a primitive.
  */
  update(e) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
    let t = !1, i = !1, s, r = this.state;
    for (let f of e) {
      if (f.startState != r)
        throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
      r = f.state;
    }
    if (this.destroyed) {
      this.viewState.state = r;
      return;
    }
    let o = this.hasFocus, O = 0, a = null;
    e.some((f) => f.annotation(Ac)) ? (this.inputState.notifiedFocused = o, O = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, a = Ec(r, o), a || (O = 1));
    let l = this.observer.delayedAndroidKey, h = null;
    if (l ? (this.observer.clearDelayedAndroidKey(), h = this.observer.readChange(), (h && !this.state.doc.eq(r.doc) || !this.state.selection.eq(r.selection)) && (h = null)) : this.observer.clear(), r.facet(A.phrases) != this.state.facet(A.phrases))
      return this.setState(r);
    s = Rs.create(this, r, e), s.flags |= O;
    let c = this.viewState.scrollTarget;
    try {
      this.updateState = 2;
      for (let f of e) {
        if (c && (c = c.map(f.changes)), f.scrollIntoView) {
          let { main: u } = f.state.selection, { x: d, y: m } = this.state.facet(Z.cursorScrollMargin);
          c = new vi(u.empty ? u : $.cursor(u.head, u.head > u.anchor ? -1 : 1), "nearest", "nearest", m, d);
        }
        for (let u of f.effects)
          u.is(Fn) && (c = u.value.clip(this.state));
      }
      this.viewState.update(s, c), this.bidiCache = Cs.update(this.bidiCache, s.changes), s.empty || (this.updatePlugins(s), this.inputState.update(s)), t = this.docView.update(s), this.state.facet(nn) != this.styleModules && this.mountStyles(), i = this.updateAttrs(), this.showAnnouncements(e), this.docView.updateSelection(t, e.some((f) => f.isUserEvent("select.pointer")));
    } finally {
      this.updateState = 0;
    }
    if (s.startState.facet(is) != s.state.facet(is) && (this.viewState.mustMeasureContent = !0), (t || i || c || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), t && this.docViewUpdate(), !s.empty)
      for (let f of this.state.facet(zo))
        try {
          f(s);
        } catch (u) {
          Te(this.state, u, "update listener");
        }
    (a || h) && Promise.resolve().then(() => {
      a && this.state == a.startState && this.dispatch(a), h && !_c(this, h) && l.force && Zi(this.contentDOM, l.key, l.keyCode);
    });
  }
  /**
  Reset the view to the given state. (This will cause the entire
  document to be redrawn and all view plugins to be reinitialized,
  so you should probably only use it when the new state isn't
  derived from the old state. Otherwise, use
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead.)
  */
  setState(e) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
    if (this.destroyed) {
      this.viewState.state = e;
      return;
    }
    this.updateState = 2;
    let t = this.hasFocus;
    try {
      for (let i of this.plugins)
        i.destroy(this);
      this.viewState = new il(this, e), this.plugins = e.facet(Pi).map((i) => new _r(i)), this.pluginMap.clear();
      for (let i of this.plugins)
        i.update(this);
      this.docView.destroy(), this.docView = new Ma(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
    } finally {
      this.updateState = 0;
    }
    t && this.focus(), this.requestMeasure();
  }
  updatePlugins(e) {
    let t = e.startState.facet(Pi), i = e.state.facet(Pi);
    if (t != i) {
      let s = [];
      for (let r of i) {
        let o = t.indexOf(r);
        if (o < 0)
          s.push(new _r(r));
        else {
          let O = this.plugins[o];
          O.mustUpdate = e, s.push(O);
        }
      }
      for (let r of this.plugins)
        r.mustUpdate != e && r.destroy(this);
      this.plugins = s, this.pluginMap.clear();
    } else
      for (let s of this.plugins)
        s.mustUpdate = e;
    for (let s = 0; s < this.plugins.length; s++)
      this.plugins[s].update(this);
    t != i && this.inputState.ensureHandlers(this.plugins);
  }
  docViewUpdate() {
    for (let e of this.plugins) {
      let t = e.value;
      if (t && t.docViewUpdate)
        try {
          t.docViewUpdate(this);
        } catch (i) {
          Te(this.state, i, "doc view update listener");
        }
    }
  }
  /**
  @internal
  */
  measure(e = !0) {
    if (this.destroyed)
      return;
    if (this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.observer.delayedAndroidKey) {
      this.measureScheduled = -1, this.requestMeasure();
      return;
    }
    this.measureScheduled = 0, e && this.observer.forceFlush();
    let t = null, i = this.viewState.scrollParent, s = this.viewState.getScrollOffset(), { scrollAnchorPos: r, scrollAnchorHeight: o } = this.viewState;
    Math.abs(s - this.viewState.scrollOffset) > 1 && (o = -1), this.viewState.scrollAnchorHeight = -1;
    try {
      for (let O = 0; ; O++) {
        if (o < 0)
          if (ac(i || this.win))
            r = -1, o = this.viewState.heightMap.height;
          else {
            let u = this.viewState.scrollAnchorAt(s);
            r = u.from, o = u.top;
          }
        this.updateState = 1;
        let a = this.viewState.measure();
        if (!a && !this.measureRequests.length && this.viewState.scrollTarget == null)
          break;
        if (O > 5) {
          console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
          break;
        }
        let l = [];
        a & 4 || ([this.measureRequests, l] = [l, this.measureRequests]);
        let h = l.map((u) => {
          try {
            return u.read(this);
          } catch (d) {
            return Te(this.state, d), Ol;
          }
        }), c = Rs.create(this, this.state, []), f = !1;
        c.flags |= a, t ? t.flags |= a : t = c, this.updateState = 2, c.empty || (this.updatePlugins(c), this.inputState.update(c), this.updateAttrs(), f = this.docView.update(c), f && this.docViewUpdate());
        for (let u = 0; u < l.length; u++)
          if (h[u] != Ol)
            try {
              let d = l[u];
              d.write && d.write(h[u], this);
            } catch (d) {
              Te(this.state, d);
            }
        if (f && this.docView.updateSelection(!0), !c.viewportChanged && this.measureRequests.length == 0) {
          if (this.viewState.editorHeight)
            if (this.viewState.scrollTarget) {
              this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, o = -1;
              continue;
            } else {
              let d = ((r < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(r).top) - o) / this.scaleY;
              if ((d > 1 || d < -1) && !(k.ios && this.inputState.lastIOSMomentumScroll > Date.now() - 100) && (i == this.scrollDOM || this.hasFocus || Math.max(this.inputState.lastWheelEvent, this.inputState.lastTouchTime) > Date.now() - 100)) {
                s = s + d, i ? r < 0 ? i.scrollTop = i.scrollHeight : i.scrollTop += d : this.win.scrollBy(0, d), o = -1;
                continue;
              }
            }
          break;
        }
      }
    } finally {
      this.updateState = 0, this.measureScheduled = -1;
    }
    if (t && !t.empty)
      for (let O of this.state.facet(zo))
        O(t);
  }
  /**
  Get the CSS classes for the currently active editor themes.
  */
  get themeClasses() {
    return Mo + " " + (this.state.facet(Eo) ? Dc : Lc) + " " + this.state.facet(is);
  }
  updateAttrs() {
    let e = al(this, wc, {
      class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
    }), t = {
      spellcheck: "false",
      autocorrect: "off",
      autocapitalize: "off",
      writingsuggestions: "false",
      translate: "no",
      contenteditable: this.state.facet(Xt) ? "true" : "false",
      class: "cm-content",
      style: `${k.tabSize}: ${this.state.tabSize}`,
      role: "textbox",
      "aria-multiline": "true"
    };
    this.state.readOnly && (t["aria-readonly"] = "true"), al(this, vO, t);
    let i = this.observer.ignore(() => {
      let s = za(this.contentDOM, this.contentAttrs, t), r = za(this.dom, this.editorAttrs, e);
      return s || r;
    });
    return this.editorAttrs = e, this.contentAttrs = t, i;
  }
  showAnnouncements(e) {
    let t = !0;
    for (let i of e)
      for (let s of i.effects)
        if (s.is(Z.announce)) {
          t && (this.announceDOM.textContent = ""), t = !1;
          let r = this.announceDOM.appendChild(document.createElement("div"));
          r.textContent = s.value;
        }
  }
  mountStyles() {
    this.styleModules = this.state.facet(nn);
    let e = this.state.facet(Z.cspNonce);
    At.mount(this.root, this.styleModules.concat(Qm).reverse(), e ? { nonce: e } : void 0);
  }
  readMeasured() {
    if (this.updateState == 2)
      throw new Error("Reading the editor layout isn't allowed during an update");
    this.updateState == 0 && this.measureScheduled > -1 && this.measure(!1);
  }
  /**
  Schedule a layout measurement, optionally providing callbacks to
  do custom DOM measuring followed by a DOM write phase. Using
  this is preferable reading DOM layout directly from, for
  example, an event handler, because it'll make sure measuring and
  drawing done by other components is synchronized, avoiding
  unnecessary DOM layout computations.
  */
  requestMeasure(e) {
    if (this.measureScheduled < 0 && (this.measureScheduled = this.win.requestAnimationFrame(() => this.measure())), e) {
      if (this.measureRequests.indexOf(e) > -1)
        return;
      if (e.key != null) {
        for (let t = 0; t < this.measureRequests.length; t++)
          if (this.measureRequests[t].key === e.key) {
            this.measureRequests[t] = e;
            return;
          }
      }
      this.measureRequests.push(e);
    }
  }
  /**
  Get the value of a specific plugin, if present. Note that
  plugins that crash can be dropped from a view, so even when you
  know you registered a given plugin, it is recommended to check
  the return value of this method.
  */
  plugin(e) {
    let t = this.pluginMap.get(e);
    return (t === void 0 || t && t.plugin != e) && this.pluginMap.set(e, t = this.plugins.find((i) => i.plugin == e) || null), t && t.update(this).value;
  }
  /**
  The top position of the document, in screen coordinates. This
  may be negative when the editor is scrolled down. Points
  directly to the top of the first line, not above the padding.
  */
  get documentTop() {
    return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
  }
  /**
  Reports the padding above and below the document.
  */
  get documentPadding() {
    return { top: this.viewState.paddingTop, bottom: this.viewState.paddingBottom };
  }
  /**
  If the editor is transformed with CSS, this provides the scale
  along the X axis. Otherwise, it will just be 1. Note that
  transforms other than translation and scaling are not supported.
  */
  get scaleX() {
    return this.viewState.scaleX;
  }
  /**
  Provide the CSS transformed scale along the Y axis.
  */
  get scaleY() {
    return this.viewState.scaleY;
  }
  /**
  Find the text line or block widget at the given vertical
  position (which is interpreted as relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop)).
  */
  elementAtHeight(e) {
    return this.readMeasured(), this.viewState.elementAtHeight(e);
  }
  /**
  Find the line block (see
  [`lineBlockAt`](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt)) at the given
  height, again interpreted relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop).
  */
  lineBlockAtHeight(e) {
    return this.readMeasured(), this.viewState.lineBlockAtHeight(e);
  }
  /**
  Get the extent and vertical position of all [line
  blocks](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) in the viewport. Positions
  are relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop);
  */
  get viewportLineBlocks() {
    return this.viewState.viewportLines;
  }
  /**
  Find the line block around the given document position. A line
  block is a range delimited on both sides by either a
  non-[hidden](https://codemirror.net/6/docs/ref/#view.Decoration^replace) line break, or the
  start/end of the document. It will usually just hold a line of
  text, but may be broken into multiple textblocks by block
  widgets.
  */
  lineBlockAt(e) {
    return this.viewState.lineBlockAt(e);
  }
  /**
  The editor's total content height.
  */
  get contentHeight() {
    return this.viewState.contentHeight;
  }
  /**
  Move a cursor position by [grapheme
  cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak). `forward` determines whether
  the motion is away from the line start, or towards it. In
  bidirectional text, the line is traversed in visual order, using
  the editor's [text direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection).
  When the start position was the last one on the line, the
  returned position will be across the line break. If there is no
  further line, the original position is returned.
  
  By default, this method moves over a single cluster. The
  optional `by` argument can be used to move across more. It will
  be called with the first cluster as argument, and should return
  a predicate that determines, for each subsequent cluster,
  whether it should also be moved over.
  */
  moveByChar(e, t, i) {
    return Cr(this, e, Ga(this, e, t, i));
  }
  /**
  Move a cursor position across the next group of either
  [letters](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) or non-letter
  non-whitespace characters.
  */
  moveByGroup(e, t) {
    return Cr(this, e, Ga(this, e, t, (i) => Yp(this, e.head, i)));
  }
  /**
  Get the cursor position visually at the start or end of a line.
  Note that this may differ from the _logical_ position at its
  start or end (which is simply at `line.from`/`line.to`) if text
  at the start or end goes against the line's base text direction.
  */
  visualLineSide(e, t) {
    let i = this.bidiSpans(e), s = this.textDirectionAt(e.from), r = i[t ? i.length - 1 : 0];
    return $.cursor(r.side(t, s) + e.from, r.forward(!t, s) ? 1 : -1);
  }
  /**
  Move to the next line boundary in the given direction. If
  `includeWrap` is true, line wrapping is on, and there is a
  further wrap point on the current line, the wrap point will be
  returned. Otherwise this function will return the start or end
  of the line.
  */
  moveToLineBoundary(e, t, i = !0) {
    return Up(this, e, t, i);
  }
  /**
  Move a cursor position vertically. When `distance` isn't given,
  it defaults to moving to the next line (including wrapped
  lines). Otherwise, `distance` should provide a positive distance
  in pixels.
  
  When `start` has a
  [`goalColumn`](https://codemirror.net/6/docs/ref/#state.SelectionRange.goalColumn), the vertical
  motion will use that as a target horizontal position. Otherwise,
  the cursor's own horizontal position is used. The returned
  cursor will have its goal column set to whichever column was
  used.
  */
  moveVertically(e, t, i) {
    return Cr(this, e, Rp(this, e, t, i));
  }
  /**
  Find the DOM parent node and offset (child offset if `node` is
  an element, character offset when it is a text node) at the
  given document position.
  
  Note that for positions that aren't currently in
  `visibleRanges`, the resulting DOM position isn't necessarily
  meaningful (it may just point before or after a placeholder
  element).
  */
  domAtPos(e, t = 1) {
    return this.docView.domAtPos(e, t);
  }
  /**
  Find the document position at the given DOM node. Can be useful
  for associating positions with DOM events. Will raise an error
  when `node` isn't part of the editor content.
  */
  posAtDOM(e, t = 0) {
    return this.docView.posFromDOM(e, t);
  }
  posAtCoords(e, t = !0) {
    this.readMeasured();
    let i = jo(this, e, t);
    return i && i.pos;
  }
  posAndSideAtCoords(e, t = !0) {
    return this.readMeasured(), jo(this, e, t);
  }
  /**
  Get the screen coordinates at the given document position.
  `side` determines whether the coordinates are based on the
  element before (-1) or after (1) the position (if no element is
  available on the given side, the method will transparently use
  another strategy to get reasonable coordinates).
  */
  coordsAtPos(e, t = 1) {
    this.readMeasured();
    let i = this.state.doc.lineAt(e), s = this.bidiSpans(i), r = s[ut.find(s, e - i.from, -1, t)];
    return this.docView.coordsAt(e, t, r.dir == I.RTL);
  }
  /**
  Return the rectangle around a given character. If `pos` does not
  point in front of a character that is in the viewport and
  rendered (i.e. not replaced, not a line break), this will return
  null. For space characters that are a line wrap point, this will
  return the position before the line break.
  */
  coordsForChar(e) {
    return this.readMeasured(), this.docView.coordsForChar(e);
  }
  /**
  The default width of a character in the editor. May not
  accurately reflect the width of all characters (given variable
  width fonts or styling of invididual ranges).
  */
  get defaultCharacterWidth() {
    return this.viewState.heightOracle.charWidth;
  }
  /**
  The default height of a line in the editor. May not be accurate
  for all lines.
  */
  get defaultLineHeight() {
    return this.viewState.heightOracle.lineHeight;
  }
  /**
  The text direction
  ([`direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)
  CSS property) of the editor's content element.
  */
  get textDirection() {
    return this.viewState.defaultTextDirection;
  }
  /**
  Find the text direction of the block at the given position, as
  assigned by CSS. If
  [`perLineTextDirection`](https://codemirror.net/6/docs/ref/#view.EditorView^perLineTextDirection)
  isn't enabled, or the given position is outside of the viewport,
  this will always return the same as
  [`textDirection`](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection). Note that
  this may trigger a DOM layout.
  */
  textDirectionAt(e) {
    return !this.state.facet(xc) || e < this.viewport.from || e > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(e));
  }
  /**
  Whether this editor [wraps lines](https://codemirror.net/6/docs/ref/#view.EditorView.lineWrapping)
  (as determined by the
  [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
  CSS property of its content element).
  */
  get lineWrapping() {
    return this.viewState.heightOracle.lineWrapping;
  }
  /**
  Returns the bidirectional text structure of the given line
  (which should be in the current document) as an array of span
  objects. The order of these spans matches the [text
  direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection)—if that is
  left-to-right, the leftmost spans come first, otherwise the
  rightmost spans come first.
  */
  bidiSpans(e) {
    if (e.length > Xm)
      return dc(e.length);
    let t = this.textDirectionAt(e.from), i;
    for (let r of this.bidiCache)
      if (r.from == e.from && r.dir == t && (r.fresh || uc(r.isolates, i = ja(this, e))))
        return r.order;
    i || (i = ja(this, e));
    let s = sp(e.text, t, i);
    return this.bidiCache.push(new Cs(e.from, e.to, t, i, !0, s)), s;
  }
  /**
  Check whether the editor has focus.
  */
  get hasFocus() {
    var e;
    return (this.dom.ownerDocument.hasFocus() || k.safari && ((e = this.inputState) === null || e === void 0 ? void 0 : e.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
  }
  /**
  Put focus on the editor.
  */
  focus() {
    this.observer.ignore(() => {
      Oc(this.contentDOM), this.docView.updateSelection();
    });
  }
  /**
  Update the [root](https://codemirror.net/6/docs/ref/##view.EditorViewConfig.root) in which the editor lives. This is only
  necessary when moving the editor's existing DOM to a new window or shadow root.
  */
  setRoot(e) {
    this._root != e && (this._root = e, this.observer.setWindow((e.nodeType == 9 ? e : e.ownerDocument).defaultView || window), this.mountStyles());
  }
  /**
  Clean up this editor view, removing its element from the
  document, unregistering event handlers, and notifying
  plugins. The view instance can no longer be used after
  calling this.
  */
  destroy() {
    this.root.activeElement == this.contentDOM && this.contentDOM.blur();
    for (let e of this.plugins)
      e.destroy(this);
    this.plugins = [], this.inputState.destroy(), this.docView.destroy(), this.dom.remove(), this.observer.destroy(), this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.destroyed = !0;
  }
  /**
  Returns an effect that can be
  [added](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) to a transaction to
  cause it to scroll the given position or range into view.
  */
  static scrollIntoView(e, t = {}) {
    var i, s, r, o;
    return Fn.of(new vi(typeof e == "number" ? $.cursor(e) : e, (i = t.y) !== null && i !== void 0 ? i : "nearest", (s = t.x) !== null && s !== void 0 ? s : "nearest", (r = t.yMargin) !== null && r !== void 0 ? r : 5, (o = t.xMargin) !== null && o !== void 0 ? o : 5));
  }
  /**
  Return an effect that resets the editor to its current (at the
  time this method was called) scroll position. Note that this
  only affects the editor's own scrollable element, not parents.
  See also
  [`EditorViewConfig.scrollTo`](https://codemirror.net/6/docs/ref/#view.EditorViewConfig.scrollTo).
  
  The effect should be used with a document identical to the one
  it was created for. Failing to do so is not an error, but may
  not scroll to the expected position. You can
  [map](https://codemirror.net/6/docs/ref/#state.StateEffect.map) the effect to account for changes.
  */
  scrollSnapshot() {
    let { scrollTop: e, scrollLeft: t } = this.scrollDOM, i = this.viewState.scrollAnchorAt(e);
    return Fn.of(new vi($.cursor(i.from), "start", "start", i.top - e, t, !0));
  }
  /**
  Enable or disable tab-focus mode, which disables key bindings
  for Tab and Shift-Tab, letting the browser's default
  focus-changing behavior go through instead. This is useful to
  prevent trapping keyboard users in your editor.
  
  Without argument, this toggles the mode. With a boolean, it
  enables (true) or disables it (false). Given a number, it
  temporarily enables the mode until that number of milliseconds
  have passed or another non-Tab key is pressed.
  */
  setTabFocusMode(e) {
    e == null ? this.inputState.tabFocusMode = this.inputState.tabFocusMode < 0 ? 0 : -1 : typeof e == "boolean" ? this.inputState.tabFocusMode = e ? 0 : -1 : this.inputState.tabFocusMode != 0 && (this.inputState.tabFocusMode = Date.now() + e);
  }
  /**
  Returns an extension that can be used to add DOM event handlers.
  The value should be an object mapping event names to handler
  functions. For any given event, such functions are ordered by
  extension precedence, and the first handler to return true will
  be assumed to have handled that event, and no other handlers or
  built-in behavior will be activated for it. These are registered
  on the [content element](https://codemirror.net/6/docs/ref/#view.EditorView.contentDOM), except
  for `scroll` handlers, which will be called any time the
  editor's [scroll element](https://codemirror.net/6/docs/ref/#view.EditorView.scrollDOM) or one of
  its parent nodes is scrolled.
  */
  static domEventHandlers(e) {
    return ie.define(() => ({}), { eventHandlers: e });
  }
  /**
  Create an extension that registers DOM event observers. Contrary
  to event [handlers](https://codemirror.net/6/docs/ref/#view.EditorView^domEventHandlers),
  observers can't be prevented from running by a higher-precedence
  handler returning true. They also don't prevent other handlers
  and observers from running when they return true, and should not
  call `preventDefault`.
  */
  static domEventObservers(e) {
    return ie.define(() => ({}), { eventObservers: e });
  }
  /**
  Create a theme extension. The first argument can be a
  [`style-mod`](https://code.haverbeke.berlin/marijn/style-mod#documentation)
  style spec providing the styles for the theme. These will be
  prefixed with a generated class for the style.
  
  Because the selectors will be prefixed with a scope class, rule
  that directly match the editor's [wrapper
  element](https://codemirror.net/6/docs/ref/#view.EditorView.dom)—to which the scope class will be
  added—need to be explicitly differentiated by adding an `&` to
  the selector for that element—for example
  `&.cm-focused`.
  
  When `dark` is set to true, the theme will be marked as dark,
  which will cause the `&dark` rules from [base
  themes](https://codemirror.net/6/docs/ref/#view.EditorView^baseTheme) to be used (as opposed to
  `&light` when a light theme is active).
  */
  static theme(e, t) {
    let i = At.newName(), s = [is.of(i), nn.of(Go(`.${i}`, e))];
    return t && t.dark && s.push(Eo.of(!0)), s;
  }
  /**
  Create an extension that adds styles to the base theme. Like
  with [`theme`](https://codemirror.net/6/docs/ref/#view.EditorView^theme), use `&` to indicate the
  place of the editor wrapper element when directly targeting
  that. You can also use `&dark` or `&light` instead to only
  target editors with a dark or light theme.
  */
  static baseTheme(e) {
    return It.lowest(nn.of(Go("." + Mo, e, Ic)));
  }
  /**
  Retrieve an editor view instance from the view's DOM
  representation.
  */
  static findFromDOM(e) {
    var t;
    let i = e.querySelector(".cm-content"), s = i && K.get(i) || K.get(e);
    return ((t = s == null ? void 0 : s.root) === null || t === void 0 ? void 0 : t.view) || null;
  }
}
Z.styleModule = nn;
Z.inputHandler = Pc;
Z.clipboardInputFilter = kO;
Z.clipboardOutputFilter = ZO;
Z.scrollHandler = bc;
Z.focusChangeEffect = Sc;
Z.perLineTextDirection = xc;
Z.exceptionSink = $c;
Z.updateListener = zo;
Z.editable = Xt;
Z.mouseSelectionStyle = Qc;
Z.dragMovesSelection = gc;
Z.clickAddsSelectionRange = mc;
Z.decorations = hr;
Z.blockWrappers = kc;
Z.outerDecorations = TO;
Z.atomicRanges = Wn;
Z.bidiIsolatedRanges = Zc;
Z.cursorScrollMargin = /* @__PURE__ */ v.define({
  combine: (n) => {
    let e = 5, t = 5;
    for (let i of n)
      typeof i == "number" ? e = t = i : { x: e, y: t } = i;
    return { x: e, y: t };
  }
});
Z.scrollMargins = vc;
Z.darkTheme = Eo;
Z.cspNonce = /* @__PURE__ */ v.define({ combine: (n) => n.length ? n[0] : "" });
Z.contentAttributes = vO;
Z.editorAttributes = wc;
Z.lineWrapping = /* @__PURE__ */ Z.contentAttributes.of({ class: "cm-lineWrapping" });
Z.announce = /* @__PURE__ */ q.define();
const Xm = 4096, Ol = {};
class Cs {
  constructor(e, t, i, s, r, o) {
    this.from = e, this.to = t, this.dir = i, this.isolates = s, this.fresh = r, this.order = o;
  }
  static update(e, t) {
    if (t.empty && !e.some((r) => r.fresh))
      return e;
    let i = [], s = e.length ? e[e.length - 1].dir : I.LTR;
    for (let r = Math.max(0, e.length - 10); r < e.length; r++) {
      let o = e[r];
      o.dir == s && !t.touchesRange(o.from, o.to) && i.push(new Cs(t.mapPos(o.from, 1), t.mapPos(o.to, -1), o.dir, o.isolates, !1, o.order));
    }
    return i;
  }
}
function al(n, e, t) {
  for (let i = n.state.facet(e), s = i.length - 1; s >= 0; s--) {
    let r = i[s], o = typeof r == "function" ? r(n) : r;
    o && bO(o, t);
  }
  return t;
}
const bm = k.mac ? "mac" : k.windows ? "win" : k.linux ? "linux" : "key";
function ym(n, e) {
  const t = n.split(/-(?!$)/);
  let i = t[t.length - 1];
  i == "Space" && (i = " ");
  let s, r, o, O;
  for (let a = 0; a < t.length - 1; ++a) {
    const l = t[a];
    if (/^(cmd|meta|m)$/i.test(l))
      O = !0;
    else if (/^a(lt)?$/i.test(l))
      s = !0;
    else if (/^(c|ctrl|control)$/i.test(l))
      r = !0;
    else if (/^s(hift)?$/i.test(l))
      o = !0;
    else if (/^mod$/i.test(l))
      e == "mac" ? O = !0 : r = !0;
    else
      throw new Error("Unrecognized modifier name: " + l);
  }
  return s && (i = "Alt-" + i), r && (i = "Ctrl-" + i), O && (i = "Meta-" + i), o && (i = "Shift-" + i), i;
}
function ns(n, e, t) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t !== !1 && e.shiftKey && (n = "Shift-" + n), n;
}
const wm = /* @__PURE__ */ It.default(/* @__PURE__ */ Z.domEventHandlers({
  keydown(n, e) {
    return Nc(Bc(e.state), n, e, "editor");
  }
})), dr = /* @__PURE__ */ v.define({ enables: wm }), ll = /* @__PURE__ */ new WeakMap();
function Bc(n) {
  let e = n.facet(dr), t = ll.get(e);
  return t || ll.set(e, t = vm(e.reduce((i, s) => i.concat(s), []))), t;
}
function km(n, e, t) {
  return Nc(Bc(n.state), e, n, t);
}
let Rt = null;
const Zm = 4e3;
function vm(n, e = bm) {
  let t = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), s = (o, O) => {
    let a = i[o];
    if (a == null)
      i[o] = O;
    else if (a != O)
      throw new Error("Key binding " + o + " is used both as a regular binding and as a multi-stroke prefix");
  }, r = (o, O, a, l, h) => {
    var c, f;
    let u = t[o] || (t[o] = /* @__PURE__ */ Object.create(null)), d = O.split(/ (?!$)/).map((Q) => ym(Q, e));
    for (let Q = 1; Q < d.length; Q++) {
      let x = d.slice(0, Q).join(" ");
      s(x, !0), u[x] || (u[x] = {
        preventDefault: !0,
        stopPropagation: !1,
        run: [(S) => {
          let T = Rt = { view: S, prefix: x, scope: o };
          return setTimeout(() => {
            Rt == T && (Rt = null);
          }, Zm), !0;
        }]
      });
    }
    let m = d.join(" ");
    s(m, !1);
    let g = u[m] || (u[m] = {
      preventDefault: !1,
      stopPropagation: !1,
      run: ((f = (c = u._any) === null || c === void 0 ? void 0 : c.run) === null || f === void 0 ? void 0 : f.slice()) || []
    });
    a && g.run.push(a), l && (g.preventDefault = !0), h && (g.stopPropagation = !0);
  };
  for (let o of n) {
    let O = o.scope ? o.scope.split(" ") : ["editor"];
    if (o.any)
      for (let l of O) {
        let h = t[l] || (t[l] = /* @__PURE__ */ Object.create(null));
        h._any || (h._any = { preventDefault: !1, stopPropagation: !1, run: [] });
        let { any: c } = o;
        for (let f in h)
          h[f].run.push((u) => c(u, Lo));
      }
    let a = o[e] || o.key;
    if (a)
      for (let l of O)
        r(l, a, o.run, o.preventDefault, o.stopPropagation), o.shift && r(l, "Shift-" + a, o.shift, o.preventDefault, o.stopPropagation);
  }
  return t;
}
let Lo = null;
function Nc(n, e, t, i) {
  Lo = e;
  let s = Md(e), r = ke(s, 0), o = ct(r) == s.length && s != " ", O = "", a = !1, l = !1, h = !1;
  Rt && Rt.view == t && Rt.scope == i && (O = Rt.prefix + " ", zc.indexOf(e.keyCode) < 0 && (l = !0, Rt = null));
  let c = /* @__PURE__ */ new Set(), f = (g) => {
    if (g) {
      for (let Q of g.run)
        if (!c.has(Q) && (c.add(Q), Q(t)))
          return g.stopPropagation && (h = !0), !0;
      g.preventDefault && (g.stopPropagation && (h = !0), l = !0);
    }
    return !1;
  }, u = n[i], d, m;
  return u && (f(u[O + ns(s, e, !o)]) ? a = !0 : o && (e.altKey || e.metaKey || e.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
  !(k.windows && e.ctrlKey && e.altKey) && // Alt-combinations on macOS tend to be typed characters
  !(k.mac && e.altKey && !(e.ctrlKey || e.metaKey)) && (d = Et[e.keyCode]) && d != s ? (f(u[O + ns(d, e, !0)]) || e.shiftKey && (m = Qn[e.keyCode]) != s && m != d && f(u[O + ns(m, e, !1)])) && (a = !0) : o && e.shiftKey && f(u[O + ns(s, e, !0)]) && (a = !0), !a && f(u._any) && (a = !0)), l && (a = !0), a && h && e.stopPropagation(), Lo = null, a;
}
class si {
  /**
  Create a marker with the given class and dimensions. If `width`
  is null, the DOM element will get no width style.
  */
  constructor(e, t, i, s, r) {
    this.className = e, this.left = t, this.top = i, this.width = s, this.height = r;
  }
  draw() {
    let e = document.createElement("div");
    return e.className = this.className, this.adjust(e), e;
  }
  update(e, t) {
    return t.className != this.className ? !1 : (this.adjust(e), !0);
  }
  adjust(e) {
    e.style.left = this.left + "px", e.style.top = this.top + "px", this.width != null && (e.style.width = this.width + "px"), e.style.height = this.height + "px";
  }
  eq(e) {
    return this.left == e.left && this.top == e.top && this.width == e.width && this.height == e.height && this.className == e.className;
  }
  /**
  Create a set of rectangles for the given selection range,
  assigning them theclass`className`. Will create a single
  rectangle for empty ranges, and a set of selection-style
  rectangles covering the range's content (in a bidi-aware
  way) for non-empty ones.
  */
  static forRange(e, t, i) {
    if (i.empty) {
      let s = e.coordsAtPos(i.head, i.assoc || 1);
      if (!s)
        return [];
      let r = Fc(e);
      return [new si(t, s.left - r.left, s.top - r.top, null, s.bottom - s.top)];
    } else
      return Tm(e, t, i);
  }
}
function Fc(n) {
  let e = n.scrollDOM.getBoundingClientRect();
  return { left: (n.textDirection == I.LTR ? e.left : e.right - n.scrollDOM.clientWidth * n.scaleX) - n.scrollDOM.scrollLeft * n.scaleX, top: e.top - n.scrollDOM.scrollTop * n.scaleY };
}
function hl(n, e, t, i) {
  let s = n.coordsAtPos(e, t * 2);
  if (!s)
    return i;
  let r = n.dom.getBoundingClientRect(), o = (s.top + s.bottom) / 2, O = n.posAtCoords({ x: r.left + 1, y: o }), a = n.posAtCoords({ x: r.right - 1, y: o });
  return O == null || a == null ? i : { from: Math.max(i.from, Math.min(O, a)), to: Math.min(i.to, Math.max(O, a)) };
}
function Tm(n, e, t) {
  if (t.to <= n.viewport.from || t.from >= n.viewport.to)
    return [];
  let i = Math.max(t.from, n.viewport.from), s = Math.min(t.to, n.viewport.to), r = n.textDirection == I.LTR, o = n.contentDOM, O = o.getBoundingClientRect(), a = Fc(n), l = o.querySelector(".cm-line"), h = l && window.getComputedStyle(l), c = O.left + (h ? parseInt(h.paddingLeft) + Math.min(0, parseInt(h.textIndent)) : 0), f = O.right - (h ? parseInt(h.paddingRight) : 0), u = Wo(n, i, 1), d = Wo(n, s, -1), m = u.type == pe.Text ? u : null, g = d.type == pe.Text ? d : null;
  if (m && (n.lineWrapping || u.widgetLineBreaks) && (m = hl(n, i, 1, m)), g && (n.lineWrapping || d.widgetLineBreaks) && (g = hl(n, s, -1, g)), m && g && m.from == g.from && m.to == g.to)
    return x(S(t.from, t.to, m));
  {
    let X = m ? S(t.from, null, m) : T(u, !1), b = g ? S(null, t.to, g) : T(d, !0), y = [];
    return (m || u).to < (g || d).from - (m && g ? 1 : 0) || u.widgetLineBreaks > 1 && X.bottom + n.defaultLineHeight / 2 < b.top ? y.push(Q(c, X.bottom, f, b.top)) : X.bottom < b.top && n.elementAtHeight((X.bottom + b.top) / 2).type == pe.Text && (X.bottom = b.top = (X.bottom + b.top) / 2), x(X).concat(y).concat(x(b));
  }
  function Q(X, b, y, _) {
    return new si(e, X - a.left, b - a.top, Math.max(0, y - X), _ - b);
  }
  function x({ top: X, bottom: b, horizontal: y }) {
    let _ = [];
    for (let W = 0; W < y.length; W += 2)
      _.push(Q(y[W], X, y[W + 1], b));
    return _;
  }
  function S(X, b, y) {
    let _ = 1e9, W = -1e9, L = [];
    function z(E, B, xe, _e, it) {
      let he = n.coordsAtPos(E, E == y.to ? -2 : 2), We = n.coordsAtPos(xe, xe == y.from ? 2 : -2);
      !he || !We || (_ = Math.min(he.top, We.top, _), W = Math.max(he.bottom, We.bottom, W), it == I.LTR ? L.push(r && B ? c : he.left, r && _e ? f : We.right) : L.push(!r && _e ? c : We.left, !r && B ? f : he.right));
    }
    let R = X ?? y.from, M = b ?? y.to;
    for (let E of n.visibleRanges)
      if (E.to > R && E.from < M)
        for (let B = Math.max(E.from, R), xe = Math.min(E.to, M); ; ) {
          let _e = n.state.doc.lineAt(B);
          for (let it of n.bidiSpans(_e)) {
            let he = it.from + _e.from, We = it.to + _e.from;
            if (he >= xe)
              break;
            We > B && z(Math.max(he, B), X == null && he <= R, Math.min(We, xe), b == null && We >= M, it.dir);
          }
          if (B = _e.to + 1, B >= xe)
            break;
        }
    return L.length == 0 && z(R, X == null, M, b == null, n.textDirection), { top: _, bottom: W, horizontal: L };
  }
  function T(X, b) {
    let y = O.top + (b ? X.top : X.bottom);
    return { top: y, bottom: y, horizontal: [] };
  }
}
function Um(n, e) {
  return n.constructor == e.constructor && n.eq(e);
}
class Ym {
  constructor(e, t) {
    this.view = e, this.layer = t, this.drawn = [], this.scaleX = 1, this.scaleY = 1, this.measureReq = { read: this.measure.bind(this), write: this.draw.bind(this) }, this.dom = e.scrollDOM.appendChild(document.createElement("div")), this.dom.classList.add("cm-layer"), t.above && this.dom.classList.add("cm-layer-above"), t.class && this.dom.classList.add(t.class), this.scale(), this.dom.setAttribute("aria-hidden", "true"), this.setOrder(e.state), e.requestMeasure(this.measureReq), t.mount && t.mount(this.dom, e);
  }
  update(e) {
    e.startState.facet(xs) != e.state.facet(xs) && this.setOrder(e.state), (this.layer.update(e, this.dom) || e.geometryChanged) && (this.scale(), e.view.requestMeasure(this.measureReq));
  }
  docViewUpdate(e) {
    this.layer.updateOnDocViewUpdate !== !1 && e.requestMeasure(this.measureReq);
  }
  setOrder(e) {
    let t = 0, i = e.facet(xs);
    for (; t < i.length && i[t] != this.layer; )
      t++;
    this.dom.style.zIndex = String((this.layer.above ? 150 : -1) - t);
  }
  measure() {
    return this.layer.markers(this.view);
  }
  scale() {
    let { scaleX: e, scaleY: t } = this.view;
    (e != this.scaleX || t != this.scaleY) && (this.scaleX = e, this.scaleY = t, this.dom.style.transform = `scale(${1 / e}, ${1 / t})`);
  }
  draw(e) {
    if (e.length != this.drawn.length || e.some((t, i) => !Um(t, this.drawn[i]))) {
      let t = this.dom.firstChild, i = 0;
      for (let s of e)
        s.update && t && s.constructor && this.drawn[i].constructor && s.update(t, this.drawn[i]) ? (t = t.nextSibling, i++) : this.dom.insertBefore(s.draw(), t);
      for (; t; ) {
        let s = t.nextSibling;
        t.remove(), t = s;
      }
      this.drawn = e, k.webkit && (this.dom.style.display = this.dom.firstChild ? "" : "none");
    }
  }
  destroy() {
    this.layer.destroy && this.layer.destroy(this.dom, this.view), this.dom.remove();
  }
}
const xs = /* @__PURE__ */ v.define();
function Hc(n) {
  return [
    ie.define((e) => new Ym(e, n)),
    xs.of(n)
  ];
}
const Wi = /* @__PURE__ */ v.define({
  combine(n) {
    return $t(n, {
      cursorBlinkRate: 1200,
      drawRangeCursor: !0,
      iosSelectionHandles: !0
    }, {
      cursorBlinkRate: (e, t) => Math.min(e, t),
      drawRangeCursor: (e, t) => e || t
    });
  }
});
function Rm(n = {}) {
  return [
    Wi.of(n),
    _m,
    qm,
    zm,
    Xc.of(!0)
  ];
}
function Kc(n) {
  return n.startState.facet(Wi) != n.state.facet(Wi);
}
const _m = /* @__PURE__ */ Hc({
  above: !0,
  markers(n) {
    let { state: e } = n, t = e.facet(Wi), i = [];
    for (let s of e.selection.ranges) {
      let r = s == e.selection.main;
      if (s.empty || t.drawRangeCursor && !(r && k.ios && t.iosSelectionHandles)) {
        let o = r ? "cm-cursor cm-cursor-primary" : "cm-cursor cm-cursor-secondary", O = s.empty ? s : $.cursor(s.head, s.assoc);
        for (let a of si.forRange(n, o, O))
          i.push(a);
      }
    }
    return i;
  },
  update(n, e) {
    n.transactions.some((i) => i.selection) && (e.style.animationName = e.style.animationName == "cm-blink" ? "cm-blink2" : "cm-blink");
    let t = Kc(n);
    return t && cl(n.state, e), n.docChanged || n.selectionSet || t;
  },
  mount(n, e) {
    cl(e.state, n);
  },
  class: "cm-cursorLayer"
});
function cl(n, e) {
  e.style.animationDuration = n.facet(Wi).cursorBlinkRate + "ms";
}
const qm = /* @__PURE__ */ Hc({
  above: !1,
  markers(n) {
    let e = [], { main: t, ranges: i } = n.state.selection;
    for (let s of i)
      if (!s.empty)
        for (let r of si.forRange(n, "cm-selectionBackground", s))
          e.push(r);
    if (k.ios && !t.empty && n.state.facet(Wi).iosSelectionHandles) {
      for (let s of si.forRange(n, "cm-selectionHandle cm-selectionHandle-start", $.cursor(t.from, 1)))
        e.push(s);
      for (let s of si.forRange(n, "cm-selectionHandle cm-selectionHandle-end", $.cursor(t.to, 1)))
        e.push(s);
    }
    return e;
  },
  update(n, e) {
    return n.docChanged || n.selectionSet || n.viewportChanged || Kc(n);
  },
  class: "cm-selectionLayer"
}), Vm = k.gecko && k.gecko_version == 153 ? "#ffffff01" : "transparent", zm = /* @__PURE__ */ It.highest(/* @__PURE__ */ Z.theme({
  ".cm-line": {
    "& ::selection, &::selection": { backgroundColor: `${Vm} !important` },
    caretColor: "transparent !important"
  },
  ".cm-content": {
    caretColor: "transparent !important",
    "& :focus": {
      caretColor: "initial !important",
      "&::selection, & ::selection": {
        backgroundColor: "Highlight !important"
      }
    }
  }
})), Jc = /* @__PURE__ */ q.define({
  map(n, e) {
    return n == null ? null : e.mapPos(n);
  }
}), rn = /* @__PURE__ */ me.define({
  create() {
    return null;
  },
  update(n, e) {
    return n != null && (n = e.changes.mapPos(n)), e.effects.reduce((t, i) => i.is(Jc) ? i.value : t, n);
  }
}), Cm = /* @__PURE__ */ ie.fromClass(class {
  constructor(n) {
    this.view = n, this.cursor = null, this.measureReq = { read: this.readPos.bind(this), write: this.drawCursor.bind(this) };
  }
  update(n) {
    var e;
    let t = n.state.field(rn);
    t == null ? this.cursor != null && ((e = this.cursor) === null || e === void 0 || e.remove(), this.cursor = null) : (this.cursor || (this.cursor = this.view.scrollDOM.appendChild(document.createElement("div")), this.cursor.className = "cm-dropCursor"), (n.startState.field(rn) != t || n.docChanged || n.geometryChanged) && this.view.requestMeasure(this.measureReq));
  }
  readPos() {
    let { view: n } = this, e = n.state.field(rn), t = e != null && n.coordsAtPos(e);
    if (!t)
      return null;
    let i = n.scrollDOM.getBoundingClientRect();
    return {
      left: t.left - i.left + n.scrollDOM.scrollLeft * n.scaleX,
      top: t.top - i.top + n.scrollDOM.scrollTop * n.scaleY,
      height: t.bottom - t.top
    };
  }
  drawCursor(n) {
    if (this.cursor) {
      let { scaleX: e, scaleY: t } = this.view;
      n ? (this.cursor.style.left = n.left / e + "px", this.cursor.style.top = n.top / t + "px", this.cursor.style.height = n.height / t + "px") : this.cursor.style.left = "-100000px";
    }
  }
  destroy() {
    this.cursor && this.cursor.remove();
  }
  setDropPos(n) {
    this.view.state.field(rn) != n && this.view.dispatch({ effects: Jc.of(n) });
  }
}, {
  eventObservers: {
    dragover(n) {
      this.setDropPos(this.view.posAtCoords({ x: n.clientX, y: n.clientY }));
    },
    dragleave(n) {
      (n.target == this.view.contentDOM || !this.view.contentDOM.contains(n.relatedTarget)) && this.setDropPos(null);
    },
    dragend() {
      this.setDropPos(null);
    },
    drop() {
      this.setDropPos(null);
    }
  }
});
function Wm() {
  return [rn, Cm];
}
function fl(n, e, t, i, s) {
  e.lastIndex = 0;
  for (let r = n.iterRange(t, i), o = t, O; !r.next().done; o += r.value.length)
    if (!r.lineBreak)
      for (; O = e.exec(r.value); )
        s(o + O.index, O);
}
function jm(n, e) {
  let t = n.visibleRanges;
  if (t.length == 1 && t[0].from == n.viewport.from && t[0].to == n.viewport.to)
    return t;
  let i = [];
  for (let { from: s, to: r } of t)
    s = Math.max(n.state.doc.lineAt(s).from, s - e), r = Math.min(n.state.doc.lineAt(r).to, r + e), i.length && i[i.length - 1].to >= s ? i[i.length - 1].to = r : i.push({ from: s, to: r });
  return i;
}
class Am {
  /**
  Create a decorator.
  */
  constructor(e) {
    const { regexp: t, decoration: i, decorate: s, boundary: r, maxLength: o = 1e3 } = e;
    if (!t.global)
      throw new RangeError("The regular expression given to MatchDecorator should have its 'g' flag set");
    if (this.regexp = t, s)
      this.addMatch = (O, a, l, h) => s(h, l, l + O[0].length, O, a);
    else if (typeof i == "function")
      this.addMatch = (O, a, l, h) => {
        let c = i(O, a, l);
        c && h(l, l + O[0].length, c);
      };
    else if (i)
      this.addMatch = (O, a, l, h) => h(l, l + O[0].length, i);
    else
      throw new RangeError("Either 'decorate' or 'decoration' should be provided to MatchDecorator");
    this.boundary = r, this.maxLength = o;
  }
  /**
  Compute the full set of decorations for matches in the given
  view's viewport. You'll want to call this when initializing your
  plugin.
  */
  createDeco(e) {
    let t = new wt(), i = t.add.bind(t);
    for (let { from: s, to: r } of jm(e, this.maxLength))
      fl(e.state.doc, this.regexp, s, r, (o, O) => this.addMatch(O, e, o, i));
    return t.finish();
  }
  /**
  Update a set of decorations for a view update. `deco` _must_ be
  the set of decorations produced by _this_ `MatchDecorator` for
  the view state before the update.
  */
  updateDeco(e, t) {
    let i = 1e9, s = -1;
    return e.docChanged && e.changes.iterChanges((r, o, O, a) => {
      a >= e.view.viewport.from && O <= e.view.viewport.to && (i = Math.min(O, i), s = Math.max(a, s));
    }), e.viewportMoved || s - i > 1e3 ? this.createDeco(e.view) : s > -1 ? this.updateRange(e.view, t.map(e.changes), i, s) : t;
  }
  updateRange(e, t, i, s) {
    for (let r of e.visibleRanges) {
      let o = Math.max(r.from, i), O = Math.min(r.to, s);
      if (O >= o) {
        let a = e.state.doc.lineAt(o), l = a.to < O ? e.state.doc.lineAt(O) : a, h = Math.max(r.from, a.from), c = Math.min(r.to, l.to);
        if (this.boundary) {
          for (; o > a.from; o--)
            if (this.boundary.test(a.text[o - 1 - a.from])) {
              h = o;
              break;
            }
          for (; O < l.to; O++)
            if (this.boundary.test(l.text[O - l.from])) {
              c = O;
              break;
            }
        }
        let f = [], u, d = (m, g, Q) => f.push(Q.range(m, g));
        if (a == l)
          for (this.regexp.lastIndex = h - a.from; (u = this.regexp.exec(a.text)) && u.index < c - a.from; )
            this.addMatch(u, e, u.index + a.from, d);
        else
          fl(e.state.doc, this.regexp, h, c, (m, g) => this.addMatch(g, e, m, d));
        t = t.update({ filterFrom: h, filterTo: c, filter: (m, g) => m < h || g > c, add: f });
      }
    }
    return t;
  }
}
const Do = /x/.unicode != null ? "gu" : "g", Em = /* @__PURE__ */ new RegExp(`[\0-\b
--­؜​‎‏\u2028\u2029‭‮⁦⁧⁩\uFEFF￹-￼]`, Do), Mm = {
  0: "null",
  7: "bell",
  8: "backspace",
  10: "newline",
  11: "vertical tab",
  13: "carriage return",
  27: "escape",
  8203: "zero width space",
  8204: "zero width non-joiner",
  8205: "zero width joiner",
  8206: "left-to-right mark",
  8207: "right-to-left mark",
  8232: "line separator",
  8237: "left-to-right override",
  8238: "right-to-left override",
  8294: "left-to-right isolate",
  8295: "right-to-left isolate",
  8297: "pop directional isolate",
  8233: "paragraph separator",
  65279: "zero width no-break space",
  65532: "object replacement"
};
let Ar = null;
function Gm() {
  var n;
  if (Ar == null && typeof document < "u" && document.body) {
    let e = document.body.style;
    Ar = ((n = e.tabSize) !== null && n !== void 0 ? n : e.MozTabSize) != null;
  }
  return Ar || !1;
}
const Xs = /* @__PURE__ */ v.define({
  combine(n) {
    let e = $t(n, {
      render: null,
      specialChars: Em,
      addSpecialChars: null
    });
    return (e.replaceTabs = !Gm()) && (e.specialChars = new RegExp("	|" + e.specialChars.source, Do)), e.addSpecialChars && (e.specialChars = new RegExp(e.specialChars.source + "|" + e.addSpecialChars.source, Do)), e;
  }
});
function Lm(n = {}) {
  return [Xs.of(n), Dm()];
}
let ul = null;
function Dm() {
  return ul || (ul = ie.fromClass(class {
    constructor(n) {
      this.view = n, this.decorations = Y.none, this.decorationCache = /* @__PURE__ */ Object.create(null), this.decorator = this.makeDecorator(n.state.facet(Xs)), this.decorations = this.decorator.createDeco(n);
    }
    makeDecorator(n) {
      return new Am({
        regexp: n.specialChars,
        decoration: (e, t, i) => {
          let { doc: s } = t.state, r = ke(e[0], 0);
          if (r == 9) {
            let o = s.lineAt(i), O = t.state.tabSize, a = Di(o.text, O, i - o.from);
            return Y.replace({
              widget: new Fm((O - a % O) * this.view.defaultCharacterWidth / this.view.scaleX)
            });
          }
          return this.decorationCache[r] || (this.decorationCache[r] = Y.replace({ widget: new Nm(n, r) }));
        },
        boundary: n.replaceTabs ? void 0 : /[^]/
      });
    }
    update(n) {
      let e = n.state.facet(Xs);
      n.startState.facet(Xs) != e ? (this.decorator = this.makeDecorator(e), this.decorations = this.decorator.createDeco(n.view)) : this.decorations = this.decorator.updateDeco(n, this.decorations);
    }
  }, {
    decorations: (n) => n.decorations
  }));
}
const Im = "•";
function Bm(n) {
  return n >= 32 ? Im : n == 10 ? "␤" : String.fromCharCode(9216 + n);
}
class Nm extends Pt {
  constructor(e, t) {
    super(), this.options = e, this.code = t;
  }
  eq(e) {
    return e.code == this.code;
  }
  toDOM(e) {
    let t = Bm(this.code), i = e.state.phrase("Control character") + " " + (Mm[this.code] || "0x" + this.code.toString(16)), s = this.options.render && this.options.render(this.code, i, t);
    if (s)
      return s;
    let r = document.createElement("span");
    return r.textContent = t, r.title = i, r.setAttribute("aria-label", i), r.className = "cm-specialChar", r;
  }
  ignoreEvent() {
    return !1;
  }
}
class Fm extends Pt {
  constructor(e) {
    super(), this.width = e;
  }
  eq(e) {
    return e.width == this.width;
  }
  toDOM() {
    let e = document.createElement("span");
    return e.textContent = "	", e.className = "cm-tab", e.style.width = this.width + "px", e;
  }
  ignoreEvent() {
    return !1;
  }
}
function Hm() {
  return Jm;
}
const Km = /* @__PURE__ */ Y.line({ class: "cm-activeLine" }), Jm = /* @__PURE__ */ ie.fromClass(class {
  constructor(n) {
    this.decorations = this.getDeco(n);
  }
  update(n) {
    (n.docChanged || n.selectionSet) && (this.decorations = this.getDeco(n.view));
  }
  getDeco(n) {
    let e = -1, t = [];
    for (let i of n.state.selection.ranges) {
      let s = n.lineBlockAt(i.head);
      s.from > e && (t.push(Km.range(s.from)), e = s.from);
    }
    return Y.set(t);
  }
}, {
  decorations: (n) => n.decorations
}), Io = 2e3;
function eg(n, e, t) {
  let i = Math.min(e.line, t.line), s = Math.max(e.line, t.line), r = [];
  if (e.off > Io || t.off > Io || e.col < 0 || t.col < 0) {
    let o = Math.min(e.off, t.off), O = Math.max(e.off, t.off);
    for (let a = i; a <= s; a++) {
      let l = n.doc.line(a);
      l.length <= O && r.push($.range(l.from + o, l.to + O));
    }
  } else {
    let o = Math.min(e.col, t.col), O = Math.max(e.col, t.col);
    for (let a = i; a <= s; a++) {
      let l = n.doc.line(a), h = wo(l.text, o, n.tabSize, !0);
      if (h < 0)
        r.push($.cursor(l.to));
      else {
        let c = wo(l.text, O, n.tabSize);
        r.push($.range(l.from + h, l.from + c));
      }
    }
  }
  return r;
}
function tg(n, e) {
  let t = n.coordsAtPos(n.viewport.from);
  return t ? Math.round(Math.abs((t.left - e) / n.defaultCharacterWidth)) : -1;
}
function dl(n, e) {
  let t = n.posAtCoords({ x: e.clientX, y: e.clientY }, !1), i = n.state.doc.lineAt(t), s = t - i.from, r = s > Io ? -1 : s == i.length ? tg(n, e.clientX) : Di(i.text, n.state.tabSize, t - i.from);
  return { line: i.number, col: r, off: s };
}
function ig(n, e) {
  let t = dl(n, e), i = n.state.selection;
  return t ? {
    update(s) {
      if (s.docChanged) {
        let r = s.changes.mapPos(s.startState.doc.line(t.line).from), o = s.state.doc.lineAt(r);
        t = { line: o.number, col: t.col, off: Math.min(t.off, o.length) }, i = i.map(s.changes);
      }
    },
    get(s, r, o) {
      let O = dl(n, s);
      if (!O)
        return i;
      let a = eg(n.state, t, O);
      return a.length ? o ? $.create(a.concat(i.ranges)) : $.create(a) : i;
    }
  } : null;
}
function ng(n) {
  let e = (t) => t.altKey && t.button == 0;
  return Z.mouseSelectionStyle.of((t, i) => e(i) ? ig(t, i) : null);
}
const sg = {
  Alt: [18, (n) => !!n.altKey],
  Control: [17, (n) => !!n.ctrlKey],
  Shift: [16, (n) => !!n.shiftKey],
  Meta: [91, (n) => !!n.metaKey]
}, rg = { style: "cursor: crosshair" };
function og(n = {}) {
  let [e, t] = sg[n.key || "Alt"], i = ie.fromClass(class {
    constructor(s) {
      this.view = s, this.isDown = !1;
    }
    set(s) {
      this.isDown != s && (this.isDown = s, this.view.update([]));
    }
  }, {
    eventObservers: {
      keydown(s) {
        this.set(s.keyCode == e || t(s));
      },
      keyup(s) {
        (s.keyCode == e || !t(s)) && this.set(!1);
      },
      mousemove(s) {
        this.set(t(s));
      }
    }
  });
  return [
    i,
    Z.contentAttributes.of((s) => {
      var r;
      return !((r = s.plugin(i)) === null || r === void 0) && r.isDown ? rg : null;
    })
  ];
}
const ss = "-10000px";
class ef {
  constructor(e, t, i, s) {
    this.facet = t, this.createTooltipView = i, this.removeTooltipView = s, this.input = e.state.facet(t), this.tooltips = this.input.filter((o) => o);
    let r = null;
    this.tooltipViews = this.tooltips.map((o) => r = i(o, r));
  }
  update(e, t) {
    var i;
    let s = e.state.facet(this.facet), r = s.filter((a) => a);
    if (s === this.input) {
      for (let a of this.tooltipViews)
        a.update && a.update(e);
      return !1;
    }
    let o = [], O = t ? [] : null;
    for (let a = 0; a < r.length; a++) {
      let l = r[a], h = -1;
      if (l) {
        for (let c = 0; c < this.tooltips.length; c++) {
          let f = this.tooltips[c];
          f && f.create == l.create && (h = c);
        }
        if (h < 0)
          o[a] = this.createTooltipView(l, a ? o[a - 1] : null), O && (O[a] = !!l.above);
        else {
          let c = o[a] = this.tooltipViews[h];
          O && (O[a] = t[h]), c.update && c.update(e);
        }
      }
    }
    for (let a of this.tooltipViews)
      o.indexOf(a) < 0 && (this.removeTooltipView(a), (i = a.destroy) === null || i === void 0 || i.call(a));
    return t && (O.forEach((a, l) => t[l] = a), t.length = O.length), this.input = s, this.tooltips = r, this.tooltipViews = o, !0;
  }
}
function Og(n) {
  let e = n.dom.ownerDocument.documentElement;
  return { top: 0, left: 0, bottom: e.clientHeight, right: e.clientWidth };
}
const Er = /* @__PURE__ */ v.define({
  combine: (n) => {
    var e, t, i;
    return {
      position: k.ios ? "absolute" : ((e = n.find((s) => s.position)) === null || e === void 0 ? void 0 : e.position) || "fixed",
      parent: ((t = n.find((s) => s.parent)) === null || t === void 0 ? void 0 : t.parent) || null,
      tooltipSpace: ((i = n.find((s) => s.tooltipSpace)) === null || i === void 0 ? void 0 : i.tooltipSpace) || Og
    };
  }
}), pl = /* @__PURE__ */ new WeakMap(), qO = /* @__PURE__ */ ie.fromClass(class {
  constructor(n) {
    this.view = n, this.above = [], this.inView = !0, this.madeAbsolute = !1, this.lastTransaction = 0, this.measureTimeout = -1;
    let e = n.state.facet(Er);
    this.position = e.position, this.parent = e.parent, this.classes = n.themeClasses, this.createContainer(), this.measureReq = { read: this.readMeasure.bind(this), write: this.writeMeasure.bind(this), key: this }, this.resizeObserver = typeof ResizeObserver == "function" ? new ResizeObserver(() => this.measureSoon()) : null, this.manager = new ef(n, VO, (t, i) => this.createTooltip(t, i), (t) => {
      this.resizeObserver && this.resizeObserver.unobserve(t.dom), t.dom.remove();
    }), this.above = this.manager.tooltips.map((t) => !!t.above), this.intersectionObserver = typeof IntersectionObserver == "function" ? new IntersectionObserver((t) => {
      Date.now() > this.lastTransaction - 50 && t.length > 0 && t[t.length - 1].intersectionRatio < 1 && this.measureSoon();
    }, { threshold: [1] }) : null, this.observeIntersection(), n.win.addEventListener("resize", this.measureSoon = this.measureSoon.bind(this)), this.maybeMeasure();
  }
  createContainer() {
    this.parent ? (this.container = document.createElement("div"), this.container.style.position = "relative", this.container.className = this.view.themeClasses, this.parent.appendChild(this.container)) : this.container = this.view.dom;
  }
  observeIntersection() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      for (let n of this.manager.tooltipViews)
        this.intersectionObserver.observe(n.dom);
    }
  }
  measureSoon() {
    this.measureTimeout < 0 && (this.measureTimeout = setTimeout(() => {
      this.measureTimeout = -1, this.maybeMeasure();
    }, 50));
  }
  update(n) {
    n.transactions.length && (this.lastTransaction = Date.now());
    let e = this.manager.update(n, this.above);
    e && this.observeIntersection();
    let t = e || n.geometryChanged, i = n.state.facet(Er);
    if (i.position != this.position && !this.madeAbsolute) {
      this.position = i.position;
      for (let s of this.manager.tooltipViews)
        s.dom.style.position = this.position;
      t = !0;
    }
    if (i.parent != this.parent) {
      this.parent && this.container.remove(), this.parent = i.parent, this.createContainer();
      for (let s of this.manager.tooltipViews)
        this.container.appendChild(s.dom);
      t = !0;
    } else this.parent && this.view.themeClasses != this.classes && (this.classes = this.container.className = this.view.themeClasses);
    t && this.maybeMeasure();
  }
  createTooltip(n, e) {
    let t = n.create(this.view), i = e ? e.dom : null;
    if (t.dom.classList.add("cm-tooltip"), n.arrow && !t.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")) {
      let s = document.createElement("div");
      s.className = "cm-tooltip-arrow", t.dom.appendChild(s);
    }
    return t.dom.style.position = this.position, t.dom.style.top = ss, t.dom.style.left = "0px", this.container.insertBefore(t.dom, i), t.mount && t.mount(this.view), this.resizeObserver && this.resizeObserver.observe(t.dom), t;
  }
  destroy() {
    var n, e, t;
    this.view.win.removeEventListener("resize", this.measureSoon);
    for (let i of this.manager.tooltipViews)
      i.dom.remove(), (n = i.destroy) === null || n === void 0 || n.call(i);
    this.parent && this.container.remove(), (e = this.resizeObserver) === null || e === void 0 || e.disconnect(), (t = this.intersectionObserver) === null || t === void 0 || t.disconnect(), clearTimeout(this.measureTimeout);
  }
  readMeasure() {
    let n = 1, e = 1, t = !1;
    if (this.position == "fixed" && this.manager.tooltipViews.length) {
      let { dom: r } = this.manager.tooltipViews[0];
      if (k.safari) {
        let o = r.getBoundingClientRect();
        t = Math.abs(o.top + 1e4) > 1 || Math.abs(o.left) > 1;
      } else
        t = !!r.offsetParent && r.offsetParent != this.container.ownerDocument.body;
    }
    if (t || this.position == "absolute")
      if (this.parent) {
        let r = this.parent.getBoundingClientRect();
        r.width && r.height && (n = r.width / this.parent.offsetWidth, e = r.height / this.parent.offsetHeight);
      } else
        ({ scaleX: n, scaleY: e } = this.view.viewState);
    let i = this.view.scrollDOM.getBoundingClientRect(), s = UO(this.view);
    return {
      visible: {
        left: i.left + s.left,
        top: i.top + s.top,
        right: i.right - s.right,
        bottom: i.bottom - s.bottom
      },
      parent: this.parent ? this.container.getBoundingClientRect() : this.view.dom.getBoundingClientRect(),
      pos: this.manager.tooltips.map((r, o) => {
        let O = this.manager.tooltipViews[o];
        return O.getCoords ? O.getCoords(r.pos) : this.view.coordsAtPos(r.pos);
      }),
      size: this.manager.tooltipViews.map(({ dom: r }) => r.getBoundingClientRect()),
      space: this.view.state.facet(Er).tooltipSpace(this.view),
      scaleX: n,
      scaleY: e,
      makeAbsolute: t
    };
  }
  writeMeasure(n) {
    var e;
    if (n.makeAbsolute) {
      this.madeAbsolute = !0, this.position = "absolute";
      for (let O of this.manager.tooltipViews)
        O.dom.style.position = "absolute";
    }
    let { visible: t, space: i, scaleX: s, scaleY: r } = n, o = [];
    for (let O = 0; O < this.manager.tooltips.length; O++) {
      let a = this.manager.tooltips[O], l = this.manager.tooltipViews[O], { dom: h } = l, c = n.pos[O], f = n.size[O];
      if (!c || a.clip !== !1 && (c.bottom <= Math.max(t.top, i.top) || c.top >= Math.min(t.bottom, i.bottom) || c.right < Math.max(t.left, i.left) - 0.1 || c.left > Math.min(t.right, i.right) + 0.1)) {
        h.style.top = ss;
        continue;
      }
      let u = a.arrow ? l.dom.querySelector(".cm-tooltip-arrow") : null, d = u ? 7 : 0, m = f.right - f.left, g = (e = pl.get(l)) !== null && e !== void 0 ? e : f.bottom - f.top, Q = l.offset || lg, x = this.view.textDirection == I.LTR, S = f.width > i.right - i.left ? x ? i.left : i.right - f.width : x ? Math.max(i.left, Math.min(c.left - (u ? 14 : 0) + Q.x, i.right - m)) : Math.min(Math.max(i.left, c.left - m + (u ? 14 : 0) - Q.x), i.right - m), T = this.above[O];
      !a.strictSide && (T ? c.top - g - d - Q.y < i.top : c.bottom + g + d + Q.y > i.bottom) && T == i.bottom - c.bottom > c.top - i.top && (T = this.above[O] = !T);
      let X = (T ? c.top - i.top : i.bottom - c.bottom) - d;
      if (X < g && l.resize !== !1) {
        if (X < this.view.defaultLineHeight) {
          h.style.top = ss;
          continue;
        }
        pl.set(l, g), h.style.height = (g = X) / r + "px";
      } else h.style.height && (h.style.height = "");
      let b = T ? c.top - g - d - Q.y : c.bottom + d + Q.y, y = S + m;
      if (l.overlap !== !0)
        for (let _ of o)
          _.left < y && _.right > S && _.top < b + g && _.bottom > b && (b = T ? _.top - g - 2 - d : _.bottom + d + 2);
      if (this.position == "absolute" ? (h.style.top = (b - n.parent.top) / r + "px", ml(h, (S - n.parent.left) / s)) : (h.style.top = b / r + "px", ml(h, S / s)), u) {
        let _ = c.left + (x ? Q.x : -Q.x) - (S + 14 - 7);
        u.style.left = _ / s + "px";
      }
      l.overlap !== !0 && o.push({ left: S, top: b, right: y, bottom: b + g }), h.classList.toggle("cm-tooltip-above", T), h.classList.toggle("cm-tooltip-below", !T), l.positioned && l.positioned(n.space);
    }
  }
  maybeMeasure() {
    if (this.manager.tooltips.length && (this.view.inView && this.view.requestMeasure(this.measureReq), this.inView != this.view.inView && (this.inView = this.view.inView, !this.inView)))
      for (let n of this.manager.tooltipViews)
        n.dom.style.top = ss;
  }
}, {
  eventObservers: {
    scroll() {
      this.maybeMeasure();
    }
  }
});
function ml(n, e) {
  let t = parseInt(n.style.left, 10);
  (isNaN(t) || Math.abs(e - t) > 1) && (n.style.left = e + "px");
}
const ag = /* @__PURE__ */ Z.baseTheme({
  ".cm-tooltip": {
    zIndex: 500,
    boxSizing: "border-box"
  },
  "&light .cm-tooltip": {
    border: "1px solid #bbb",
    backgroundColor: "#f5f5f5"
  },
  "&light .cm-tooltip-section:not(:first-child)": {
    borderTop: "1px solid #bbb"
  },
  "&dark .cm-tooltip": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-tooltip-arrow": {
    height: "7px",
    width: `${7 * 2}px`,
    position: "absolute",
    zIndex: -1,
    overflow: "hidden",
    "&:before, &:after": {
      content: "''",
      position: "absolute",
      width: 0,
      height: 0,
      borderLeft: "7px solid transparent",
      borderRight: "7px solid transparent"
    },
    ".cm-tooltip-above &": {
      bottom: "-7px",
      "&:before": {
        borderTop: "7px solid #bbb"
      },
      "&:after": {
        borderTop: "7px solid #f5f5f5",
        bottom: "1px"
      }
    },
    ".cm-tooltip-below &": {
      top: "-7px",
      "&:before": {
        borderBottom: "7px solid #bbb"
      },
      "&:after": {
        borderBottom: "7px solid #f5f5f5",
        top: "1px"
      }
    }
  },
  "&dark .cm-tooltip .cm-tooltip-arrow": {
    "&:before": {
      borderTopColor: "#333338",
      borderBottomColor: "#333338"
    },
    "&:after": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    }
  }
}), lg = { x: 0, y: 0 }, VO = /* @__PURE__ */ v.define({
  enables: [qO, ag]
}), Ws = /* @__PURE__ */ v.define({
  combine: (n) => n.reduce((e, t) => e.concat(t), [])
});
class pr {
  // Needs to be static so that host tooltip instances always match
  static create(e) {
    return new pr(e);
  }
  constructor(e) {
    this.view = e, this.mounted = !1, this.dom = document.createElement("div"), this.dom.classList.add("cm-tooltip-hover"), this.manager = new ef(e, Ws, (t, i) => this.createHostedView(t, i), (t) => t.dom.remove());
  }
  createHostedView(e, t) {
    let i = e.create(this.view);
    return i.dom.classList.add("cm-tooltip-section"), this.dom.insertBefore(i.dom, t ? t.dom.nextSibling : this.dom.firstChild), this.mounted && i.mount && i.mount(this.view), i;
  }
  mount(e) {
    for (let t of this.manager.tooltipViews)
      t.mount && t.mount(e);
    this.mounted = !0;
  }
  positioned(e) {
    for (let t of this.manager.tooltipViews)
      t.positioned && t.positioned(e);
  }
  update(e) {
    this.manager.update(e);
  }
  destroy() {
    var e;
    for (let t of this.manager.tooltipViews)
      (e = t.destroy) === null || e === void 0 || e.call(t);
  }
  passProp(e) {
    let t;
    for (let i of this.manager.tooltipViews) {
      let s = i[e];
      if (s !== void 0) {
        if (t === void 0)
          t = s;
        else if (t !== s)
          return;
      }
    }
    return t;
  }
  get offset() {
    return this.passProp("offset");
  }
  get getCoords() {
    return this.passProp("getCoords");
  }
  get overlap() {
    return this.passProp("overlap");
  }
  get resize() {
    return this.passProp("resize");
  }
}
const hg = /* @__PURE__ */ VO.compute([Ws], (n) => {
  let e = n.facet(Ws);
  return e.length === 0 ? null : {
    pos: Math.min(...e.map((t) => t.pos)),
    end: Math.max(...e.map((t) => {
      var i;
      return (i = t.end) !== null && i !== void 0 ? i : t.pos;
    })),
    create: pr.create,
    above: e[0].above,
    arrow: e.some((t) => t.arrow)
  };
}), tf = /* @__PURE__ */ v.define();
class cg {
  constructor(e, t, i, s, r, o) {
    this.view = e, this.source = t, this.field = i, this.locked = s, this.setHover = r, this.hoverTime = o, this.hoverTimeout = -1, this.restartTimeout = -1, this.pending = null, this.lastMove = { x: 0, y: 0, target: e.dom, time: 0 }, this.checkHover = this.checkHover.bind(this), e.dom.addEventListener("mouseleave", this.mouseleave = this.mouseleave.bind(this)), e.dom.addEventListener("mousemove", this.mousemove = this.mousemove.bind(this));
  }
  update(e) {
    this.pending && (this.pending = null, clearTimeout(this.restartTimeout), this.restartTimeout = setTimeout(() => this.startHover(), 20));
  }
  get active() {
    return this.view.state.field(this.field);
  }
  checkHover() {
    if (this.hoverTimeout = -1, this.active.length)
      return;
    let e = Date.now() - this.lastMove.time;
    e < this.hoverTime ? this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime - e) : this.startHover();
  }
  startHover() {
    clearTimeout(this.restartTimeout);
    let { view: e, lastMove: t } = this, i = e.docView.tile.nearest(t.target);
    if (!i)
      return;
    let s, r = 1;
    if (i.isWidget())
      s = i.posAtStart;
    else {
      if (s = e.posAtCoords(t), s == null)
        return;
      let o = e.coordsAtPos(s);
      if (!o || t.y < o.top || t.y > o.bottom || t.x < o.left - e.defaultCharacterWidth || t.x > o.right + e.defaultCharacterWidth)
        return;
      let O = e.bidiSpans(e.state.doc.lineAt(s)).find((l) => l.from <= s && l.to >= s), a = O && O.dir == I.RTL ? -1 : 1;
      r = t.x < o.left ? -a : a;
    }
    this.activateHover(e, s, r);
  }
  activateHover(e, t, i, s) {
    let r = this.source(e, t, i), o = (O) => {
      if (O && !(Array.isArray(O) && !O.length)) {
        let a = Array.isArray(O) ? O : [O];
        s && this.locked.set(a, s), e.dispatch({ effects: this.setHover.of(a) });
      }
    };
    if (r && "then" in r) {
      let O = this.pending = { pos: t };
      r.then((a) => {
        this.pending == O && (this.pending = null, o(a));
      }, (a) => Te(e.state, a, "hover tooltip"));
    } else
      o(r);
  }
  get tooltip() {
    let e = this.view.plugin(qO), t = e ? e.manager.tooltips.findIndex((i) => i.create == pr.create) : -1;
    return t > -1 ? e.manager.tooltipViews[t] : null;
  }
  mousemove(e) {
    var t, i;
    this.lastMove = { x: e.clientX, y: e.clientY, target: e.target, time: Date.now() }, this.hoverTimeout < 0 && (this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime));
    let { active: s, tooltip: r } = this;
    if (s.length && !this.locked.has(s) && r && !fg(r.dom, e) || this.pending) {
      let { pos: o } = s[0] || this.pending, O = (i = (t = s[0]) === null || t === void 0 ? void 0 : t.end) !== null && i !== void 0 ? i : o;
      (o == O ? this.view.posAtCoords(this.lastMove) != o : !ug(this.view, o, O, e.clientX, e.clientY)) && (this.view.dispatch({ effects: this.setHover.of([]) }), this.pending = null);
    }
  }
  mouseleave(e) {
    clearTimeout(this.hoverTimeout), this.hoverTimeout = -1;
    let { active: t } = this;
    if (t.length && !this.locked.has(t)) {
      let { tooltip: i } = this;
      i && i.dom.contains(e.relatedTarget) ? this.watchTooltipLeave(i.dom) : this.view.dispatch({ effects: this.setHover.of([]) });
    }
  }
  watchTooltipLeave(e) {
    let t = (i) => {
      e.removeEventListener("mouseleave", t);
      let { active: s } = this;
      s.length && !this.locked.has(s) && !this.view.dom.contains(i.relatedTarget) && this.view.dispatch({ effects: this.setHover.of([]) });
    };
    e.addEventListener("mouseleave", t);
  }
  destroy() {
    clearTimeout(this.hoverTimeout), clearTimeout(this.restartTimeout), this.view.dom.removeEventListener("mouseleave", this.mouseleave), this.view.dom.removeEventListener("mousemove", this.mousemove);
  }
}
const rs = 4;
function fg(n, e) {
  let { left: t, right: i, top: s, bottom: r } = n.getBoundingClientRect(), o;
  if (o = n.querySelector(".cm-tooltip-arrow")) {
    let O = o.getBoundingClientRect();
    s = Math.min(O.top, s), r = Math.max(O.bottom, r);
  }
  return e.clientX >= t - rs && e.clientX <= i + rs && e.clientY >= s - rs && e.clientY <= r + rs;
}
function ug(n, e, t, i, s, r) {
  let o = n.scrollDOM.getBoundingClientRect(), O = n.documentTop + n.documentPadding.top + n.contentHeight;
  if (o.left > i || o.right < i || o.top > s || Math.min(o.bottom, O) < s)
    return !1;
  let a = n.posAtCoords({ x: i, y: s }, !1);
  return a >= e && a <= t;
}
function dg(n, e = {}) {
  let t = q.define(), i = /* @__PURE__ */ new WeakMap(), s = me.define({
    create() {
      return [];
    },
    update(o, O) {
      let a = i.get(o);
      if (o.length && (e.hideOnChange && (O.docChanged || O.selection) ? o = [] : a && a(O) ? o = [] : e.hideOn && (o = o.filter((l) => !e.hideOn(O, l)))), O.docChanged && o.length) {
        let l = [];
        for (let h of o) {
          let c = O.changes.mapPos(h.pos, -1, de.TrackDel);
          if (c != null) {
            let f = Object.assign(/* @__PURE__ */ Object.create(null), h);
            f.pos = c, f.end != null && (f.end = O.changes.mapPos(f.end)), l.push(f);
          }
        }
        o = l;
      }
      for (let l of O.effects)
        l.is(t) && (o = l.value, a = void 0), (l.is(mg) && !l.value || l.value == s) && (o = []);
      return o.length && a && i.set(o, a), o;
    },
    provide: (o) => Ws.from(o)
  });
  const r = ie.define((o) => new cg(
    o,
    n,
    s,
    i,
    t,
    e.hoverTime || 300
    /* Hover.Time */
  ));
  return {
    active: s,
    extension: [
      s,
      r,
      tf.of(r),
      hg
    ]
  };
}
function pg(n, e, t, i = {}) {
  var s;
  let r = n.state.facet(tf).map((o) => n.plugin(o)).filter((o) => !!o);
  if (i.tooltip && i.tooltip.active) {
    let o = r.find((O) => O.field == i.tooltip.active);
    o && (r = [o]);
  }
  for (let o of r)
    o.activateHover(n, e, t, (s = i.until) !== null && s !== void 0 ? s : () => !1);
}
function nf(n, e) {
  let t = n.plugin(qO);
  if (!t)
    return null;
  let i = t.manager.tooltips.indexOf(e);
  return i < 0 ? null : t.manager.tooltipViews[i];
}
const mg = /* @__PURE__ */ q.define(), gl = /* @__PURE__ */ v.define({
  combine(n) {
    let e, t;
    for (let i of n)
      e = e || i.topContainer, t = t || i.bottomContainer;
    return { topContainer: e, bottomContainer: t };
  }
});
function zO(n, e) {
  let t = n.plugin(sf), i = t ? t.specs.indexOf(e) : -1;
  return i > -1 ? t.panels[i] : null;
}
const sf = /* @__PURE__ */ ie.fromClass(class {
  constructor(n) {
    this.input = n.state.facet(xn), this.specs = this.input.filter((t) => t), this.panels = this.specs.map((t) => t(n));
    let e = n.state.facet(gl);
    this.top = new os(n, !0, e.topContainer), this.bottom = new os(n, !1, e.bottomContainer), this.top.sync(this.panels.filter((t) => t.top)), this.bottom.sync(this.panels.filter((t) => !t.top));
    for (let t of this.panels)
      t.dom.classList.add("cm-panel"), t.mount && t.mount();
  }
  update(n) {
    let e = n.state.facet(gl);
    this.top.container != e.topContainer && (this.top.sync([]), this.top = new os(n.view, !0, e.topContainer)), this.bottom.container != e.bottomContainer && (this.bottom.sync([]), this.bottom = new os(n.view, !1, e.bottomContainer)), this.top.syncClasses(), this.bottom.syncClasses();
    let t = n.state.facet(xn);
    if (t != this.input) {
      let i = t.filter((a) => a), s = [], r = [], o = [], O = [];
      for (let a of i) {
        let l = this.specs.indexOf(a), h;
        l < 0 ? (h = a(n.view), O.push(h)) : (h = this.panels[l], h.update && h.update(n)), s.push(h), (h.top ? r : o).push(h);
      }
      this.specs = i, this.panels = s, this.top.sync(r), this.bottom.sync(o);
      for (let a of O)
        a.dom.classList.add("cm-panel"), a.mount && a.mount();
    } else
      for (let i of this.panels)
        i.update && i.update(n);
  }
  destroy() {
    this.top.sync([]), this.bottom.sync([]);
  }
}, {
  provide: (n) => Z.scrollMargins.of((e) => {
    let t = e.plugin(n);
    return t && { top: t.top.scrollMargin(), bottom: t.bottom.scrollMargin() };
  })
});
class os {
  constructor(e, t, i) {
    this.view = e, this.top = t, this.container = i, this.dom = void 0, this.classes = "", this.panels = [], this.syncClasses();
  }
  sync(e) {
    for (let t of this.panels)
      t.destroy && e.indexOf(t) < 0 && t.destroy();
    this.panels = e, this.syncDOM();
  }
  syncDOM() {
    if (this.panels.length == 0) {
      this.dom && (this.dom.remove(), this.dom = void 0);
      return;
    }
    if (!this.dom) {
      this.dom = document.createElement("div"), this.dom.className = this.top ? "cm-panels cm-panels-top" : "cm-panels cm-panels-bottom";
      let t = this.container || this.view.dom;
      t.insertBefore(this.dom, this.top ? t.firstChild : null);
    }
    let e = this.dom.firstChild;
    for (let t of this.panels)
      if (t.dom.parentNode == this.dom) {
        for (; e != t.dom; )
          e = Ql(e);
        e = e.nextSibling;
      } else
        this.dom.insertBefore(t.dom, e);
    for (; e; )
      e = Ql(e);
  }
  scrollMargin() {
    return !this.dom || this.container ? 0 : Math.max(0, this.top ? this.dom.getBoundingClientRect().bottom - Math.max(0, this.view.scrollDOM.getBoundingClientRect().top) : Math.min(innerHeight, this.view.scrollDOM.getBoundingClientRect().bottom) - this.dom.getBoundingClientRect().top);
  }
  syncClasses() {
    if (!(!this.container || this.classes == this.view.themeClasses)) {
      for (let e of this.classes.split(" "))
        e && this.container.classList.remove(e);
      for (let e of (this.classes = this.view.themeClasses).split(" "))
        e && this.container.classList.add(e);
    }
  }
}
function Ql(n) {
  let e = n.nextSibling;
  return n.remove(), e;
}
const xn = /* @__PURE__ */ v.define({
  enables: sf
});
function gg(n, e) {
  let t, i = new Promise((o) => t = o), s = (o) => Qg(o, e, t);
  n.state.field(Mr, !1) ? n.dispatch({ effects: rf.of(s) }) : n.dispatch({ effects: q.appendConfig.of(Mr.init(() => [s])) });
  let r = of.of(s);
  return { close: r, result: i.then((o) => ((n.win.queueMicrotask || ((a) => n.win.setTimeout(a, 10)))(() => {
    n.state.field(Mr).indexOf(s) > -1 && n.dispatch({ effects: r });
  }), o)) };
}
const Mr = /* @__PURE__ */ me.define({
  create() {
    return [];
  },
  update(n, e) {
    for (let t of e.effects)
      t.is(rf) ? n = [t.value].concat(n) : t.is(of) && (n = n.filter((i) => i != t.value));
    return n;
  },
  provide: (n) => xn.computeN([n], (e) => e.field(n))
}), rf = /* @__PURE__ */ q.define(), of = /* @__PURE__ */ q.define();
function Qg(n, e, t) {
  let i = e.content ? e.content(n, () => o(null)) : null;
  if (!i) {
    if (i = G("form"), e.input) {
      let O = G("input", e.input);
      /^(text|password|number|email|tel|url)$/.test(O.type) && O.classList.add("cm-textfield"), O.name || (O.name = "input"), i.appendChild(G("label", (e.label || "") + ": ", O));
    } else
      i.appendChild(document.createTextNode(e.label || ""));
    i.appendChild(document.createTextNode(" ")), i.appendChild(G("button", { class: "cm-button", type: "submit" }, e.submitLabel || "OK"));
  }
  let s = i.nodeName == "FORM" ? [i] : i.querySelectorAll("form");
  for (let O = 0; O < s.length; O++) {
    let a = s[O];
    a.addEventListener("keydown", (l) => {
      l.keyCode == 27 ? (l.preventDefault(), o(null)) : l.keyCode == 13 && (l.preventDefault(), o(a));
    }), a.addEventListener("submit", (l) => {
      l.preventDefault(), o(a);
    });
  }
  let r = G("div", i, G("button", {
    onclick: () => o(null),
    "aria-label": n.state.phrase("close"),
    class: "cm-dialog-close",
    type: "button"
  }, ["×"]));
  e.class && (r.className = e.class), r.classList.add("cm-dialog");
  function o(O) {
    r.contains(r.ownerDocument.activeElement) && n.focus(), t(O);
  }
  return {
    dom: r,
    top: e.top,
    mount: () => {
      if (e.focus) {
        let O;
        typeof e.focus == "string" ? O = i.querySelector(e.focus) : O = i.querySelector("input") || i.querySelector("button"), O && "select" in O ? O.select() : O && "focus" in O && O.focus();
      }
    }
  };
}
class Zt extends jt {
  /**
  @internal
  */
  compare(e) {
    return this == e || this.constructor == e.constructor && this.eq(e);
  }
  /**
  Compare this marker to another marker of the same type.
  */
  eq(e) {
    return !1;
  }
  /**
  Called if the marker has a `toDOM` method and its representation
  was removed from a gutter.
  */
  destroy(e) {
  }
}
Zt.prototype.elementClass = "";
Zt.prototype.toDOM = void 0;
Zt.prototype.mapMode = de.TrackBefore;
Zt.prototype.startSide = Zt.prototype.endSide = -1;
Zt.prototype.point = !0;
const bs = /* @__PURE__ */ v.define(), $g = /* @__PURE__ */ v.define(), Pg = {
  class: "",
  renderEmptyElements: !1,
  elementStyle: "",
  markers: () => C.empty,
  lineMarker: () => null,
  widgetMarker: () => null,
  lineMarkerChange: null,
  initialSpacer: null,
  updateSpacer: null,
  domEventHandlers: {},
  side: "before"
}, fn = /* @__PURE__ */ v.define();
function Sg(n) {
  return [Of(), fn.of({ ...Pg, ...n })];
}
const $l = /* @__PURE__ */ v.define({
  combine: (n) => n.some((e) => e)
});
function Of(n) {
  return [
    xg
  ];
}
const xg = /* @__PURE__ */ ie.fromClass(class {
  constructor(n) {
    this.view = n, this.domAfter = null, this.prevViewport = n.viewport, this.dom = document.createElement("div"), this.dom.className = "cm-gutters cm-gutters-before", this.dom.setAttribute("aria-hidden", "true"), this.dom.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.gutters = n.state.facet(fn).map((e) => new Sl(n, e)), this.fixed = !n.state.facet($l);
    for (let e of this.gutters)
      e.config.side == "after" ? this.getDOMAfter().appendChild(e.dom) : this.dom.appendChild(e.dom);
    this.fixed && (this.dom.style.position = "sticky"), this.syncGutters(!1), n.scrollDOM.insertBefore(this.dom, n.contentDOM);
  }
  getDOMAfter() {
    return this.domAfter || (this.domAfter = document.createElement("div"), this.domAfter.className = "cm-gutters cm-gutters-after", this.domAfter.setAttribute("aria-hidden", "true"), this.domAfter.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.domAfter.style.position = this.fixed ? "sticky" : "", this.view.scrollDOM.appendChild(this.domAfter)), this.domAfter;
  }
  update(n) {
    if (this.updateGutters(n)) {
      let e = this.prevViewport, t = n.view.viewport, i = Math.min(e.to, t.to) - Math.max(e.from, t.from);
      this.syncGutters(i < (t.to - t.from) * 0.8);
    }
    if (n.geometryChanged) {
      let e = this.view.contentHeight / this.view.scaleY + "px";
      this.dom.style.minHeight = e, this.domAfter && (this.domAfter.style.minHeight = e);
    }
    this.view.state.facet($l) != !this.fixed && (this.fixed = !this.fixed, this.dom.style.position = this.fixed ? "sticky" : "", this.domAfter && (this.domAfter.style.position = this.fixed ? "sticky" : "")), this.prevViewport = n.view.viewport;
  }
  syncGutters(n) {
    let e = this.dom.nextSibling;
    n && (this.dom.remove(), this.domAfter && this.domAfter.remove());
    let t = C.iter(this.view.state.facet(bs), this.view.viewport.from), i = [], s = this.gutters.map((r) => new Xg(r, this.view.viewport, -this.view.documentPadding.top));
    for (let r of this.view.viewportLineBlocks)
      if (i.length && (i = []), Array.isArray(r.type)) {
        let o = !0;
        for (let O of r.type)
          if (O.type == pe.Text && o) {
            Bo(t, i, O.from);
            for (let a of s)
              a.line(this.view, O, i);
            o = !1;
          } else if (O.widget)
            for (let a of s)
              a.widget(this.view, O);
      } else if (r.type == pe.Text) {
        Bo(t, i, r.from);
        for (let o of s)
          o.line(this.view, r, i);
      } else if (r.widget)
        for (let o of s)
          o.widget(this.view, r);
    for (let r of s)
      r.finish();
    n && (this.view.scrollDOM.insertBefore(this.dom, e), this.domAfter && this.view.scrollDOM.appendChild(this.domAfter));
  }
  updateGutters(n) {
    let e = n.startState.facet(fn), t = n.state.facet(fn), i = n.docChanged || n.heightChanged || n.viewportChanged || !C.eq(n.startState.facet(bs), n.state.facet(bs), n.view.viewport.from, n.view.viewport.to);
    if (e == t)
      for (let s of this.gutters)
        s.update(n) && (i = !0);
    else {
      i = !0;
      let s = [];
      for (let r of t) {
        let o = e.indexOf(r);
        o < 0 ? s.push(new Sl(this.view, r)) : (this.gutters[o].update(n), s.push(this.gutters[o]));
      }
      for (let r of this.gutters)
        r.dom.remove(), s.indexOf(r) < 0 && r.destroy();
      for (let r of s)
        r.config.side == "after" ? this.getDOMAfter().appendChild(r.dom) : this.dom.appendChild(r.dom);
      this.gutters = s;
    }
    return i;
  }
  destroy() {
    for (let n of this.gutters)
      n.destroy();
    this.dom.remove(), this.domAfter && this.domAfter.remove();
  }
}, {
  provide: (n) => Z.scrollMargins.of((e) => {
    let t = e.plugin(n);
    if (!t || t.gutters.length == 0 || !t.fixed)
      return null;
    let i = t.dom.offsetWidth * e.scaleX, s = t.domAfter ? t.domAfter.offsetWidth * e.scaleX : 0;
    return e.textDirection == I.LTR ? { left: i, right: s } : { right: i, left: s };
  })
});
function Pl(n) {
  return Array.isArray(n) ? n : [n];
}
function Bo(n, e, t) {
  for (; n.value && n.from <= t; )
    n.from == t && e.push(n.value), n.next();
}
class Xg {
  constructor(e, t, i) {
    this.gutter = e, this.height = i, this.i = 0, this.cursor = C.iter(e.markers, t.from);
  }
  addElement(e, t, i) {
    let { gutter: s } = this, r = (t.top - this.height) / e.scaleY, o = t.height / e.scaleY;
    if (this.i == s.elements.length) {
      let O = new af(e, o, r, i);
      s.elements.push(O), s.dom.appendChild(O.dom);
    } else
      s.elements[this.i].update(e, o, r, i);
    this.height = t.bottom, this.i++;
  }
  line(e, t, i) {
    let s = [];
    Bo(this.cursor, s, t.from), i.length && (s = s.concat(i));
    let r = this.gutter.config.lineMarker(e, t, s);
    r && s.unshift(r);
    let o = this.gutter;
    s.length == 0 && !o.config.renderEmptyElements || this.addElement(e, t, s);
  }
  widget(e, t) {
    let i = this.gutter.config.widgetMarker(e, t.widget, t), s = i ? [i] : null;
    for (let r of e.state.facet($g)) {
      let o = r(e, t.widget, t);
      o && (s || (s = [])).push(o);
    }
    s && this.addElement(e, t, s);
  }
  finish() {
    let e = this.gutter;
    for (; e.elements.length > this.i; ) {
      let t = e.elements.pop();
      e.dom.removeChild(t.dom), t.destroy();
    }
  }
}
class Sl {
  constructor(e, t) {
    this.view = e, this.config = t, this.elements = [], this.spacer = null, this.dom = document.createElement("div"), this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");
    for (let i in t.domEventHandlers)
      this.dom.addEventListener(i, (s) => {
        let r = s.target, o;
        if (r != this.dom && this.dom.contains(r)) {
          for (; r.parentNode != this.dom; )
            r = r.parentNode;
          let a = r.getBoundingClientRect();
          o = (a.top + a.bottom) / 2;
        } else
          o = s.clientY;
        let O = e.lineBlockAtHeight(o - e.documentTop);
        t.domEventHandlers[i](e, O, s) && s.preventDefault();
      });
    this.markers = Pl(t.markers(e)), t.initialSpacer && (this.spacer = new af(e, 0, 0, [t.initialSpacer(e)]), this.dom.appendChild(this.spacer.dom), this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none");
  }
  update(e) {
    let t = this.markers;
    if (this.markers = Pl(this.config.markers(e.view)), this.spacer && this.config.updateSpacer) {
      let s = this.config.updateSpacer(this.spacer.markers[0], e);
      s != this.spacer.markers[0] && this.spacer.update(e.view, 0, 0, [s]);
    }
    let i = e.view.viewport;
    return !C.eq(this.markers, t, i.from, i.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(e) : !1);
  }
  destroy() {
    for (let e of this.elements)
      e.destroy();
  }
}
class af {
  constructor(e, t, i, s) {
    this.height = -1, this.above = 0, this.markers = [], this.dom = document.createElement("div"), this.dom.className = "cm-gutterElement", this.update(e, t, i, s);
  }
  update(e, t, i, s) {
    this.height != t && (this.height = t, this.dom.style.height = t + "px"), this.above != i && (this.dom.style.marginTop = (this.above = i) ? i + "px" : ""), bg(this.markers, s) || this.setMarkers(e, s);
  }
  setMarkers(e, t) {
    let i = "cm-gutterElement", s = this.dom.firstChild;
    for (let r = 0, o = 0; ; ) {
      let O = o, a = r < t.length ? t[r++] : null, l = !1;
      if (a) {
        let h = a.elementClass;
        h && (i += " " + h);
        for (let c = o; c < this.markers.length; c++)
          if (this.markers[c].compare(a)) {
            O = c, l = !0;
            break;
          }
      } else
        O = this.markers.length;
      for (; o < O; ) {
        let h = this.markers[o++];
        if (h.toDOM) {
          h.destroy(s);
          let c = s.nextSibling;
          s.remove(), s = c;
        }
      }
      if (!a)
        break;
      a.toDOM && (l ? s = s.nextSibling : this.dom.insertBefore(a.toDOM(e), s)), l && o++;
    }
    this.dom.className = i, this.markers = t;
  }
  destroy() {
    this.setMarkers(null, []);
  }
}
function bg(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].compare(e[t]))
      return !1;
  return !0;
}
const yg = /* @__PURE__ */ v.define(), wg = /* @__PURE__ */ v.define(), Si = /* @__PURE__ */ v.define({
  combine(n) {
    return $t(n, { formatNumber: String, domEventHandlers: {} }, {
      domEventHandlers(e, t) {
        let i = Object.assign({}, e);
        for (let s in t) {
          let r = i[s], o = t[s];
          i[s] = r ? (O, a, l) => r(O, a, l) || o(O, a, l) : o;
        }
        return i;
      }
    });
  }
});
class Gr extends Zt {
  constructor(e) {
    super(), this.number = e;
  }
  eq(e) {
    return this.number == e.number;
  }
  toDOM() {
    return document.createTextNode(this.number);
  }
}
function Lr(n, e) {
  return n.state.facet(Si).formatNumber(e, n.state);
}
const kg = /* @__PURE__ */ fn.compute([Si], (n) => ({
  class: "cm-lineNumbers",
  renderEmptyElements: !1,
  markers(e) {
    return e.state.facet(yg);
  },
  lineMarker(e, t, i) {
    return i.some((s) => s.toDOM) ? null : new Gr(Lr(e, e.state.doc.lineAt(t.from).number));
  },
  widgetMarker: (e, t, i) => {
    for (let s of e.state.facet(wg)) {
      let r = s(e, t, i);
      if (r)
        return r;
    }
    return null;
  },
  lineMarkerChange: (e) => e.startState.facet(Si) != e.state.facet(Si),
  initialSpacer(e) {
    return new Gr(Lr(e, xl(e.state.doc.lines)));
  },
  updateSpacer(e, t) {
    let i = Lr(t.view, xl(t.view.state.doc.lines));
    return i == e.number ? e : new Gr(i);
  },
  domEventHandlers: n.facet(Si).domEventHandlers,
  side: "before"
}));
function Zg(n = {}) {
  return [
    Si.of(n),
    Of(),
    kg
  ];
}
function xl(n) {
  let e = 9;
  for (; e < n; )
    e = e * 10 + 9;
  return e;
}
const vg = /* @__PURE__ */ new class extends Zt {
  constructor() {
    super(...arguments), this.elementClass = "cm-activeLineGutter";
  }
}(), Tg = /* @__PURE__ */ bs.compute(["selection"], (n) => {
  let e = [], t = -1;
  for (let i of n.selection.ranges) {
    let s = n.doc.lineAt(i.head).from;
    s > t && (t = s, e.push(vg.range(s)));
  }
  return C.of(e);
});
function Ug() {
  return Tg;
}
const lf = 1024;
let Yg = 0;
class Dr {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
class V {
  /**
  Create a new node prop type.
  */
  constructor(e = {}) {
    this.id = Yg++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
      throw new Error("This node type doesn't define a deserialize function");
    }), this.combine = e.combine || null;
  }
  /**
  This is meant to be used with
  [`NodeSet.extend`](#common.NodeSet.extend) or
  [`LRParser.configure`](#lr.ParserConfig.props) to compute
  prop values for each node type in the set. Takes a [match
  object](#common.NodeType^match) or function that returns undefined
  if the node type doesn't get this prop, and the prop's value if
  it does.
  */
  add(e) {
    if (this.perNode)
      throw new RangeError("Can't add per-node props to node types");
    return typeof e != "function" && (e = Re.match(e)), (t) => {
      let i = e(t);
      return i === void 0 ? null : [this, i];
    };
  }
}
V.closedBy = new V({ deserialize: (n) => n.split(" ") });
V.openedBy = new V({ deserialize: (n) => n.split(" ") });
V.group = new V({ deserialize: (n) => n.split(" ") });
V.isolate = new V({ deserialize: (n) => {
  if (n && n != "rtl" && n != "ltr" && n != "auto")
    throw new RangeError("Invalid value for isolate: " + n);
  return n || "auto";
} });
V.contextHash = new V({ perNode: !0 });
V.lookAhead = new V({ perNode: !0 });
V.mounted = new V({ perNode: !0 });
class un {
  constructor(e, t, i, s = !1) {
    this.tree = e, this.overlay = t, this.parser = i, this.bracketed = s;
  }
  /**
  @internal
  */
  static get(e) {
    return e && e.props && e.props[V.mounted.id];
  }
}
const Rg = /* @__PURE__ */ Object.create(null);
class Re {
  /**
  @internal
  */
  constructor(e, t, i, s = 0) {
    this.name = e, this.props = t, this.id = i, this.flags = s;
  }
  /**
  Define a node type.
  */
  static define(e) {
    let t = e.props && e.props.length ? /* @__PURE__ */ Object.create(null) : Rg, i = (e.top ? 1 : 0) | (e.skipped ? 2 : 0) | (e.error ? 4 : 0) | (e.name == null ? 8 : 0), s = new Re(e.name || "", t, e.id, i);
    if (e.props) {
      for (let r of e.props)
        if (Array.isArray(r) || (r = r(s)), r) {
          if (r[0].perNode)
            throw new RangeError("Can't store a per-node prop on a node type");
          t[r[0].id] = r[1];
        }
    }
    return s;
  }
  /**
  Retrieves a node prop for this type. Will return `undefined` if
  the prop isn't present on this node.
  */
  prop(e) {
    return this.props[e.id];
  }
  /**
  True when this is the top node of a grammar.
  */
  get isTop() {
    return (this.flags & 1) > 0;
  }
  /**
  True when this node is produced by a skip rule.
  */
  get isSkipped() {
    return (this.flags & 2) > 0;
  }
  /**
  Indicates whether this is an error node.
  */
  get isError() {
    return (this.flags & 4) > 0;
  }
  /**
  When true, this node type doesn't correspond to a user-declared
  named node, for example because it is used to cache repetition.
  */
  get isAnonymous() {
    return (this.flags & 8) > 0;
  }
  /**
  Returns true when this node's name or one of its
  [groups](#common.NodeProp^group) matches the given string.
  */
  is(e) {
    if (typeof e == "string") {
      if (this.name == e)
        return !0;
      let t = this.prop(V.group);
      return t ? t.indexOf(e) > -1 : !1;
    }
    return this.id == e;
  }
  /**
  Create a function from node types to arbitrary values by
  specifying an object whose property names are node or
  [group](#common.NodeProp^group) names. Often useful with
  [`NodeProp.add`](#common.NodeProp.add). You can put multiple
  names, separated by spaces, in a single property name to map
  multiple node names to a single value.
  */
  static match(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e)
      for (let s of i.split(" "))
        t[s] = e[i];
    return (i) => {
      for (let s = i.prop(V.group), r = -1; r < (s ? s.length : 0); r++) {
        let o = t[r < 0 ? i.name : s[r]];
        if (o)
          return o;
      }
    };
  }
}
Re.none = new Re(
  "",
  /* @__PURE__ */ Object.create(null),
  0,
  8
  /* NodeFlag.Anonymous */
);
class CO {
  /**
  Create a set with the given types. The `id` property of each
  type should correspond to its position within the array.
  */
  constructor(e) {
    this.types = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].id != t)
        throw new RangeError("Node type ids should correspond to array positions when creating a node set");
  }
  /**
  Create a copy of this set with some node properties added. The
  arguments to this method can be created with
  [`NodeProp.add`](#common.NodeProp.add).
  */
  extend(...e) {
    let t = [];
    for (let i of this.types) {
      let s = null;
      for (let r of e) {
        let o = r(i);
        if (o) {
          s || (s = Object.assign({}, i.props));
          let O = o[1], a = o[0];
          a.combine && a.id in s && (O = a.combine(s[a.id], O)), s[a.id] = O;
        }
      }
      t.push(s ? new Re(i.name, s, i.id, i.flags) : i);
    }
    return new CO(t);
  }
}
const Os = /* @__PURE__ */ new WeakMap(), Xl = /* @__PURE__ */ new WeakMap();
var H;
(function(n) {
  n[n.ExcludeBuffers = 1] = "ExcludeBuffers", n[n.IncludeAnonymous = 2] = "IncludeAnonymous", n[n.IgnoreMounts = 4] = "IgnoreMounts", n[n.IgnoreOverlays = 8] = "IgnoreOverlays", n[n.EnterBracketed = 16] = "EnterBracketed";
})(H || (H = {}));
class te {
  /**
  Construct a new tree. See also [`Tree.build`](#common.Tree^build).
  */
  constructor(e, t, i, s, r) {
    if (this.type = e, this.children = t, this.positions = i, this.length = s, this.props = null, r && r.length) {
      this.props = /* @__PURE__ */ Object.create(null);
      for (let [o, O] of r)
        this.props[typeof o == "number" ? o : o.id] = O;
    }
  }
  /**
  @internal
  */
  toString() {
    let e = un.get(this);
    if (e && !e.overlay)
      return e.tree.toString();
    let t = "";
    for (let i of this.children) {
      let s = i.toString();
      s && (t && (t += ","), t += s);
    }
    return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (t.length ? "(" + t + ")" : "") : t;
  }
  /**
  Get a [tree cursor](#common.TreeCursor) positioned at the top of
  the tree. Mode can be used to [control](#common.IterMode) which
  nodes the cursor visits.
  */
  cursor(e = 0) {
    return new Fo(this.topNode, e);
  }
  /**
  Get a [tree cursor](#common.TreeCursor) pointing into this tree
  at the given position and side (see
  [`moveTo`](#common.TreeCursor.moveTo).
  */
  cursorAt(e, t = 0, i = 0) {
    let s = Os.get(this) || this.topNode, r = new Fo(s);
    return r.moveTo(e, t), Os.set(this, r._tree), r;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) object for the top of the
  tree.
  */
  get topNode() {
    return new Ye(this, 0, 0, null);
  }
  /**
  Get the [syntax node](#common.SyntaxNode) at the given position.
  If `side` is -1, this will move into nodes that end at the
  position. If 1, it'll move into nodes that start at the
  position. With 0, it'll only enter nodes that cover the position
  from both sides.
  
  Note that this will not enter
  [overlays](#common.MountedTree.overlay), and you often want
  [`resolveInner`](#common.Tree.resolveInner) instead.
  */
  resolve(e, t = 0) {
    let i = Xn(Os.get(this) || this.topNode, e, t, !1);
    return Os.set(this, i), i;
  }
  /**
  Like [`resolve`](#common.Tree.resolve), but will enter
  [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
  pointing into the innermost overlaid tree at the given position
  (with parent links going through all parent structure, including
  the host trees).
  */
  resolveInner(e, t = 0) {
    let i = Xn(Xl.get(this) || this.topNode, e, t, !0);
    return Xl.set(this, i), i;
  }
  /**
  In some situations, it can be useful to iterate through all
  nodes around a position, including those in overlays that don't
  directly cover the position. This method gives you an iterator
  that will produce all nodes, from small to big, around the given
  position.
  */
  resolveStack(e, t = 0) {
    return Vg(this, e, t);
  }
  /**
  Iterate over the tree and its children, calling `enter` for any
  node that touches the `from`/`to` region (if given) before
  running over such a node's children, and `leave` (if given) when
  leaving the node. When `enter` returns `false`, that node will
  not have its children iterated over (or `leave` called).
  */
  iterate(e) {
    let { enter: t, leave: i, from: s = 0, to: r = this.length } = e, o = e.mode || 0, O = (o & H.IncludeAnonymous) > 0;
    for (let a = this.cursor(o | H.IncludeAnonymous); ; ) {
      let l = !1;
      if (a.from <= r && a.to >= s && (!O && a.type.isAnonymous || t(a) !== !1)) {
        if (a.firstChild())
          continue;
        l = !0;
      }
      for (; l && i && (O || !a.type.isAnonymous) && i(a), !a.nextSibling(); ) {
        if (!a.parent())
          return;
        l = !0;
      }
    }
  }
  /**
  Get the value of the given [node prop](#common.NodeProp) for this
  node. Works with both per-node and per-type props.
  */
  prop(e) {
    return e.perNode ? this.props ? this.props[e.id] : void 0 : this.type.prop(e);
  }
  /**
  Returns the node's [per-node props](#common.NodeProp.perNode) in a
  format that can be passed to the [`Tree`](#common.Tree)
  constructor.
  */
  get propValues() {
    let e = [];
    if (this.props)
      for (let t in this.props)
        e.push([+t, this.props[t]]);
    return e;
  }
  /**
  Balance the direct children of this tree, producing a copy of
  which may have children grouped into subtrees with type
  [`NodeType.none`](#common.NodeType^none).
  */
  balance(e = {}) {
    return this.children.length <= 8 ? this : AO(Re.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, i, s) => new te(this.type, t, i, s, this.propValues), e.makeTree || ((t, i, s) => new te(Re.none, t, i, s)));
  }
  /**
  Build a tree from a postfix-ordered buffer of node information,
  or a cursor over such a buffer.
  */
  static build(e) {
    return zg(e);
  }
}
te.empty = new te(Re.none, [], [], 0);
class WO {
  constructor(e, t) {
    this.buffer = e, this.index = t;
  }
  get id() {
    return this.buffer[this.index - 4];
  }
  get start() {
    return this.buffer[this.index - 3];
  }
  get end() {
    return this.buffer[this.index - 2];
  }
  get size() {
    return this.buffer[this.index - 1];
  }
  get pos() {
    return this.index;
  }
  next() {
    this.index -= 4;
  }
  fork() {
    return new WO(this.buffer, this.index);
  }
}
class Gt {
  /**
  Create a tree buffer.
  */
  constructor(e, t, i) {
    this.buffer = e, this.length = t, this.set = i;
  }
  /**
  @internal
  */
  get type() {
    return Re.none;
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    for (let t = 0; t < this.buffer.length; )
      e.push(this.childString(t)), t = this.buffer[t + 3];
    return e.join(",");
  }
  /**
  @internal
  */
  childString(e) {
    let t = this.buffer[e], i = this.buffer[e + 3], s = this.set.types[t], r = s.name;
    if (/\W/.test(r) && !s.isError && (r = JSON.stringify(r)), e += 4, i == e)
      return r;
    let o = [];
    for (; e < i; )
      o.push(this.childString(e)), e = this.buffer[e + 3];
    return r + "(" + o.join(",") + ")";
  }
  /**
  @internal
  */
  findChild(e, t, i, s, r) {
    let { buffer: o } = this, O = -1;
    for (let a = e; a != t && !(hf(r, s, o[a + 1], o[a + 2]) && (O = a, i > 0)); a = o[a + 3])
      ;
    return O;
  }
  /**
  @internal
  */
  slice(e, t, i) {
    let s = this.buffer, r = new Uint16Array(t - e), o = 0;
    for (let O = e, a = 0; O < t; ) {
      r[a++] = s[O++], r[a++] = s[O++] - i;
      let l = r[a++] = s[O++] - i;
      r[a++] = s[O++] - e, o = Math.max(o, l);
    }
    return new Gt(r, o, this.set);
  }
}
function hf(n, e, t, i) {
  switch (n) {
    case -2:
      return t < e;
    case -1:
      return i >= e && t < e;
    case 0:
      return t < e && i > e;
    case 1:
      return t <= e && i > e;
    case 2:
      return i > e;
    case 4:
      return !0;
  }
}
function Xn(n, e, t, i) {
  for (var s; n.from == n.to || (t < 1 ? n.from >= e : n.from > e) || (t > -1 ? n.to <= e : n.to < e); ) {
    let o = !i && n instanceof Ye && n.index < 0 ? null : n.parent;
    if (!o)
      return n;
    n = o;
  }
  let r = i ? 0 : H.IgnoreOverlays;
  if (i)
    for (let o = n, O = o.parent; O; o = O, O = o.parent)
      o instanceof Ye && o.index < 0 && ((s = O.enter(e, t, r)) === null || s === void 0 ? void 0 : s.from) != o.from && (n = O);
  for (; ; ) {
    let o = n.enter(e, t, r);
    if (!o)
      return n;
    n = o;
  }
}
class cf {
  cursor(e = 0) {
    return new Fo(this, e);
  }
  getChild(e, t = null, i = null) {
    let s = bl(this, e, t, i);
    return s.length ? s[0] : null;
  }
  getChildren(e, t = null, i = null) {
    return bl(this, e, t, i);
  }
  resolve(e, t = 0) {
    return Xn(this, e, t, !1);
  }
  resolveInner(e, t = 0) {
    return Xn(this, e, t, !0);
  }
  matchContext(e) {
    return No(this.parent, e);
  }
  enterUnfinishedNodesBefore(e) {
    let t = this.childBefore(e), i = this;
    for (; t; ) {
      let s = t.lastChild;
      if (!s || s.to != t.to)
        break;
      s.type.isError && s.from == s.to ? (i = t, t = s.prevSibling) : t = s;
    }
    return i;
  }
  get node() {
    return this;
  }
  get next() {
    return this.parent;
  }
}
class Ye extends cf {
  constructor(e, t, i, s) {
    super(), this._tree = e, this.from = t, this.index = i, this._parent = s;
  }
  get type() {
    return this._tree.type;
  }
  get name() {
    return this._tree.type.name;
  }
  get to() {
    return this.from + this._tree.length;
  }
  nextChild(e, t, i, s, r = 0) {
    for (let o = this; ; ) {
      for (let { children: O, positions: a } = o._tree, l = t > 0 ? O.length : -1; e != l; e += t) {
        let h = O[e], c = a[e] + o.from, f;
        if (!(!(r & H.EnterBracketed && h instanceof te && (f = un.get(h)) && !f.overlay && f.bracketed && i >= c && i <= c + h.length) && !hf(s, i, c, c + h.length))) {
          if (h instanceof Gt) {
            if (r & H.ExcludeBuffers)
              continue;
            let u = h.findChild(0, h.buffer.length, t, i - c, s);
            if (u > -1)
              return new dt(new _g(o, h, e, c), null, u);
          } else if (r & H.IncludeAnonymous || !h.type.isAnonymous || jO(h)) {
            let u;
            if (!(r & H.IgnoreMounts) && (u = un.get(h)) && !u.overlay)
              return new Ye(u.tree, c, e, o);
            let d = new Ye(h, c, e, o);
            return r & H.IncludeAnonymous || !d.type.isAnonymous ? d : d.nextChild(t < 0 ? h.children.length - 1 : 0, t, i, s, r);
          }
        }
      }
      if (r & H.IncludeAnonymous || !o.type.isAnonymous || (o.index >= 0 ? e = o.index + t : e = t < 0 ? -1 : o._parent._tree.children.length, o = o._parent, !o))
        return null;
    }
  }
  get firstChild() {
    return this.nextChild(
      0,
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(e) {
    return this.nextChild(
      0,
      1,
      e,
      2
      /* Side.After */
    );
  }
  childBefore(e) {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  prop(e) {
    return this._tree.prop(e);
  }
  enter(e, t, i = 0) {
    let s;
    if (!(i & H.IgnoreOverlays) && (s = un.get(this._tree)) && s.overlay) {
      let r = e - this.from, o = i & H.EnterBracketed && s.bracketed;
      for (let { from: O, to: a } of s.overlay)
        if ((t > 0 || o ? O <= r : O < r) && (t < 0 || o ? a >= r : a > r))
          return new Ye(s.tree, s.overlay[0].from + this.from, -1, this);
    }
    return this.nextChild(0, 1, e, t, i);
  }
  nextSignificantParent() {
    let e = this;
    for (; e.type.isAnonymous && e._parent; )
      e = e._parent;
    return e;
  }
  get parent() {
    return this._parent ? this._parent.nextSignificantParent() : null;
  }
  get nextSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index + 1,
      1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get prevSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get tree() {
    return this._tree;
  }
  toTree() {
    return this._tree;
  }
  /**
  @internal
  */
  toString() {
    return this._tree.toString();
  }
}
function bl(n, e, t, i) {
  let s = n.cursor(), r = [];
  if (!s.firstChild())
    return r;
  if (t != null) {
    for (let o = !1; !o; )
      if (o = s.type.is(t), !s.nextSibling())
        return r;
  }
  for (; ; ) {
    if (i != null && s.type.is(i))
      return r;
    if (s.type.is(e) && r.push(s.node), !s.nextSibling())
      return i == null ? r : [];
  }
}
function No(n, e, t = e.length - 1) {
  for (let i = n; t >= 0; i = i.parent) {
    if (!i)
      return !1;
    if (!i.type.isAnonymous) {
      if (e[t] && e[t] != i.name)
        return !1;
      t--;
    }
  }
  return !0;
}
class _g {
  constructor(e, t, i, s) {
    this.parent = e, this.buffer = t, this.index = i, this.start = s;
  }
}
class dt extends cf {
  get name() {
    return this.type.name;
  }
  get from() {
    return this.context.start + this.context.buffer.buffer[this.index + 1];
  }
  get to() {
    return this.context.start + this.context.buffer.buffer[this.index + 2];
  }
  constructor(e, t, i) {
    super(), this.context = e, this._parent = t, this.index = i, this.type = e.buffer.set.types[e.buffer.buffer[i]];
  }
  child(e, t, i) {
    let { buffer: s } = this.context, r = s.findChild(this.index + 4, s.buffer[this.index + 3], e, t - this.context.start, i);
    return r < 0 ? null : new dt(this.context, this, r);
  }
  get firstChild() {
    return this.child(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.child(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(e) {
    return this.child(
      1,
      e,
      2
      /* Side.After */
    );
  }
  childBefore(e) {
    return this.child(
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  prop(e) {
    return this.type.prop(e);
  }
  enter(e, t, i = 0) {
    if (i & H.ExcludeBuffers)
      return null;
    let { buffer: s } = this.context, r = s.findChild(this.index + 4, s.buffer[this.index + 3], t > 0 ? 1 : -1, e - this.context.start, t);
    return r < 0 ? null : new dt(this.context, this, r);
  }
  get parent() {
    return this._parent || this.context.parent.nextSignificantParent();
  }
  externalSibling(e) {
    return this._parent ? null : this.context.parent.nextChild(
      this.context.index + e,
      e,
      0,
      4
      /* Side.DontCare */
    );
  }
  get nextSibling() {
    let { buffer: e } = this.context, t = e.buffer[this.index + 3];
    return t < (this._parent ? e.buffer[this._parent.index + 3] : e.buffer.length) ? new dt(this.context, this._parent, t) : this.externalSibling(1);
  }
  get prevSibling() {
    let { buffer: e } = this.context, t = this._parent ? this._parent.index + 4 : 0;
    return this.index == t ? this.externalSibling(-1) : new dt(this.context, this._parent, e.findChild(
      t,
      this.index,
      -1,
      0,
      4
      /* Side.DontCare */
    ));
  }
  get tree() {
    return null;
  }
  toTree() {
    let e = [], t = [], { buffer: i } = this.context, s = this.index + 4, r = i.buffer[this.index + 3];
    if (r > s) {
      let o = i.buffer[this.index + 1];
      e.push(i.slice(s, r, o)), t.push(0);
    }
    return new te(this.type, e, t, this.to - this.from);
  }
  /**
  @internal
  */
  toString() {
    return this.context.buffer.childString(this.index);
  }
}
function ff(n) {
  if (!n.length)
    return null;
  let e = 0, t = n[0];
  for (let r = 1; r < n.length; r++) {
    let o = n[r];
    (o.from > t.from || o.to < t.to) && (t = o, e = r);
  }
  let i = t instanceof Ye && t.index < 0 ? null : t.parent, s = n.slice();
  return i ? s[e] = i : s.splice(e, 1), new qg(s, t);
}
class qg {
  constructor(e, t) {
    this.heads = e, this.node = t;
  }
  get next() {
    return ff(this.heads);
  }
}
function Vg(n, e, t) {
  let i = n.resolveInner(e, t), s = null;
  for (let r = i instanceof Ye ? i : i.context.parent; r; r = r.parent)
    if (r.index < 0) {
      let o = r.parent;
      (s || (s = [i])).push(o.resolve(e, t)), r = o;
    } else {
      let o = un.get(r.tree);
      if (o && o.overlay && o.overlay[0].from <= e && o.overlay[o.overlay.length - 1].to >= e) {
        let O = new Ye(o.tree, o.overlay[0].from + r.from, -1, r);
        (s || (s = [i])).push(Xn(O, e, t, !1));
      }
    }
  return s ? ff(s) : i;
}
class Fo {
  /**
  Shorthand for `.type.name`.
  */
  get name() {
    return this.type.name;
  }
  /**
  @internal
  */
  constructor(e, t = 0) {
    if (this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, this.mode = t & ~H.EnterBracketed, e instanceof Ye)
      this.yieldNode(e);
    else {
      this._tree = e.context.parent, this.buffer = e.context;
      for (let i = e._parent; i; i = i._parent)
        this.stack.unshift(i.index);
      this.bufferNode = e, this.yieldBuf(e.index);
    }
  }
  yieldNode(e) {
    return e ? (this._tree = e, this.type = e.type, this.from = e.from, this.to = e.to, !0) : !1;
  }
  yieldBuf(e, t) {
    this.index = e;
    let { start: i, buffer: s } = this.buffer;
    return this.type = t || s.set.types[s.buffer[e]], this.from = i + s.buffer[e + 1], this.to = i + s.buffer[e + 2], !0;
  }
  /**
  @internal
  */
  yield(e) {
    return e ? e instanceof Ye ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : !1;
  }
  /**
  @internal
  */
  toString() {
    return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
  }
  /**
  @internal
  */
  enterChild(e, t, i) {
    if (!this.buffer)
      return this.yield(this._tree.nextChild(e < 0 ? this._tree._tree.children.length - 1 : 0, e, t, i, this.mode));
    let { buffer: s } = this.buffer, r = s.findChild(this.index + 4, s.buffer[this.index + 3], e, t - this.buffer.start, i);
    return r < 0 ? !1 : (this.stack.push(this.index), this.yieldBuf(r));
  }
  /**
  Move the cursor to this node's first child. When this returns
  false, the node has no child, and the cursor has not been moved.
  */
  firstChild() {
    return this.enterChild(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /**
  Move the cursor to this node's last child.
  */
  lastChild() {
    return this.enterChild(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /**
  Move the cursor to the first child that ends after `pos`.
  */
  childAfter(e) {
    return this.enterChild(
      1,
      e,
      2
      /* Side.After */
    );
  }
  /**
  Move to the last child that starts before `pos`.
  */
  childBefore(e) {
    return this.enterChild(
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  /**
  Move the cursor to the child around `pos`. If side is -1 the
  child may end at that position, when 1 it may start there. This
  will also enter [overlaid](#common.MountedTree.overlay)
  [mounted](#common.NodeProp^mounted) trees unless `overlays` is
  set to false.
  */
  enter(e, t, i = this.mode) {
    return this.buffer ? i & H.ExcludeBuffers ? !1 : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, i));
  }
  /**
  Move to the node's parent node, if this isn't the top node.
  */
  parent() {
    if (!this.buffer)
      return this.yieldNode(this.mode & H.IncludeAnonymous ? this._tree._parent : this._tree.parent);
    if (this.stack.length)
      return this.yieldBuf(this.stack.pop());
    let e = this.mode & H.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
    return this.buffer = null, this.yieldNode(e);
  }
  /**
  @internal
  */
  sibling(e) {
    if (!this.buffer)
      return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + e, e, 0, 4, this.mode)) : !1;
    let { buffer: t } = this.buffer, i = this.stack.length - 1;
    if (e < 0) {
      let s = i < 0 ? 0 : this.stack[i] + 4;
      if (this.index != s)
        return this.yieldBuf(t.findChild(
          s,
          this.index,
          -1,
          0,
          4
          /* Side.DontCare */
        ));
    } else {
      let s = t.buffer[this.index + 3];
      if (s < (i < 0 ? t.buffer.length : t.buffer[this.stack[i] + 3]))
        return this.yieldBuf(s);
    }
    return i < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + e, e, 0, 4, this.mode)) : !1;
  }
  /**
  Move to this node's next sibling, if any.
  */
  nextSibling() {
    return this.sibling(1);
  }
  /**
  Move to this node's previous sibling, if any.
  */
  prevSibling() {
    return this.sibling(-1);
  }
  atLastNode(e) {
    let t, i, { buffer: s } = this;
    if (s) {
      if (e > 0) {
        if (this.index < s.buffer.buffer.length)
          return !1;
      } else
        for (let r = 0; r < this.index; r++)
          if (s.buffer.buffer[r + 3] < this.index)
            return !1;
      ({ index: t, parent: i } = s);
    } else
      ({ index: t, _parent: i } = this._tree);
    for (; i; { index: t, _parent: i } = i)
      if (t > -1)
        for (let r = t + e, o = e < 0 ? -1 : i._tree.children.length; r != o; r += e) {
          let O = i._tree.children[r];
          if (this.mode & H.IncludeAnonymous || O instanceof Gt || !O.type.isAnonymous || jO(O))
            return !1;
        }
    return !0;
  }
  move(e, t) {
    if (t && this.enterChild(
      e,
      0,
      4
      /* Side.DontCare */
    ))
      return !0;
    for (; ; ) {
      if (this.sibling(e))
        return !0;
      if (this.atLastNode(e) || !this.parent())
        return !1;
    }
  }
  /**
  Move to the next node in a
  [pre-order](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR)
  traversal, going from a node to its first child or, if the
  current node is empty or `enter` is false, its next sibling or
  the next sibling of the first parent node that has one.
  */
  next(e = !0) {
    return this.move(1, e);
  }
  /**
  Move to the next node in a last-to-first pre-order traversal. A
  node is followed by its last child or, if it has none, its
  previous sibling or the previous sibling of the first parent
  node that has one.
  */
  prev(e = !0) {
    return this.move(-1, e);
  }
  /**
  Move the cursor to the innermost node that covers `pos`. If
  `side` is -1, it will enter nodes that end at `pos`. If it is 1,
  it will enter nodes that start at `pos`.
  */
  moveTo(e, t = 0) {
    for (; (this.from == this.to || (t < 1 ? this.from >= e : this.from > e) || (t > -1 ? this.to <= e : this.to < e)) && this.parent(); )
      ;
    for (; this.enterChild(1, e, t); )
      ;
    return this;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) at the cursor's current
  position.
  */
  get node() {
    if (!this.buffer)
      return this._tree;
    let e = this.bufferNode, t = null, i = 0;
    if (e && e.context == this.buffer)
      e: for (let s = this.index, r = this.stack.length; r >= 0; ) {
        for (let o = e; o; o = o._parent)
          if (o.index == s) {
            if (s == this.index)
              return o;
            t = o, i = r + 1;
            break e;
          }
        s = this.stack[--r];
      }
    for (let s = i; s < this.stack.length; s++)
      t = new dt(this.buffer, t, this.stack[s]);
    return this.bufferNode = new dt(this.buffer, t, this.index);
  }
  /**
  Get the [tree](#common.Tree) that represents the current node, if
  any. Will return null when the node is in a [tree
  buffer](#common.TreeBuffer).
  */
  get tree() {
    return this.buffer ? null : this._tree._tree;
  }
  /**
  Iterate over the current node and all its descendants, calling
  `enter` when entering a node and `leave`, if given, when leaving
  one. When `enter` returns `false`, any children of that node are
  skipped, and `leave` isn't called for it.
  */
  iterate(e, t) {
    for (let i = 0; ; ) {
      let s = !1;
      if (this.type.isAnonymous || e(this) !== !1) {
        if (this.firstChild()) {
          i++;
          continue;
        }
        this.type.isAnonymous || (s = !0);
      }
      for (; ; ) {
        if (s && t && t(this), s = this.type.isAnonymous, !i)
          return;
        if (this.nextSibling())
          break;
        this.parent(), i--, s = !0;
      }
    }
  }
  /**
  Test whether the current node matches a given context—a sequence
  of direct parent node names. Empty strings in the context array
  are treated as wildcards.
  */
  matchContext(e) {
    if (!this.buffer)
      return No(this.node.parent, e);
    let { buffer: t } = this.buffer, { types: i } = t.set;
    for (let s = e.length - 1, r = this.stack.length - 1; s >= 0; r--) {
      if (r < 0)
        return No(this._tree, e, s);
      let o = i[t.buffer[this.stack[r]]];
      if (!o.isAnonymous) {
        if (e[s] && e[s] != o.name)
          return !1;
        s--;
      }
    }
    return !0;
  }
}
function jO(n) {
  return n.children.some((e) => e instanceof Gt || !e.type.isAnonymous || jO(e));
}
function zg(n) {
  var e;
  let { buffer: t, nodeSet: i, maxBufferLength: s = lf, reused: r = [], minRepeatType: o = i.types.length } = n, O = Array.isArray(t) ? new WO(t, t.length) : t, a = i.types, l = 0, h = 0;
  function c(X, b, y, _, W, L) {
    let { id: z, start: R, end: M, size: E } = O, B = h, xe = l;
    if (E < 0)
      if (O.next(), E == -1) {
        let St = r[z];
        y.push(St), _.push(R - X);
        return;
      } else if (E == -3) {
        l = z;
        return;
      } else if (E == -4) {
        h = z;
        return;
      } else
        throw new RangeError(`Unrecognized record size: ${E}`);
    let _e = a[z], it, he, We = R - X;
    if (M - R <= s && (he = g(O.pos - b, W))) {
      let St = new Uint16Array(he.size - he.skip), je = O.pos - he.size, nt = St.length;
      for (; O.pos > je; )
        nt = Q(he.start, St, nt);
      it = new Gt(St, M - he.start, i), We = he.start - X;
    } else {
      let St = O.pos - E;
      O.next();
      let je = [], nt = [], Nt = z >= o ? z : -1, pi = 0, Dn = M;
      for (; O.pos > St; )
        Nt >= 0 && O.id == Nt && O.size >= 0 ? (O.end <= Dn - s && (d(je, nt, R, pi, O.end, Dn, Nt, B, xe), pi = je.length, Dn = O.end), O.next()) : L > 2500 ? f(R, St, je, nt) : c(R, St, je, nt, Nt, L + 1);
      if (Nt >= 0 && pi > 0 && pi < je.length && d(je, nt, R, pi, R, Dn, Nt, B, xe), je.reverse(), nt.reverse(), Nt > -1 && pi > 0) {
        let xa = u(_e, xe);
        it = AO(_e, je, nt, 0, je.length, 0, M - R, xa, xa);
      } else
        it = m(_e, je, nt, M - R, B - M, xe);
    }
    y.push(it), _.push(We);
  }
  function f(X, b, y, _) {
    let W = [], L = 0, z = -1;
    for (; O.pos > b; ) {
      let { id: R, start: M, end: E, size: B } = O;
      if (B > 4)
        O.next();
      else {
        if (z > -1 && M < z)
          break;
        z < 0 && (z = E - s), W.push(R, M, E), L++, O.next();
      }
    }
    if (L) {
      let R = new Uint16Array(L * 4), M = W[W.length - 2];
      for (let E = W.length - 3, B = 0; E >= 0; E -= 3)
        R[B++] = W[E], R[B++] = W[E + 1] - M, R[B++] = W[E + 2] - M, R[B++] = B;
      y.push(new Gt(R, W[2] - M, i)), _.push(M - X);
    }
  }
  function u(X, b) {
    return (y, _, W) => {
      let L = 0, z = y.length - 1, R, M;
      if (z >= 0 && (R = y[z]) instanceof te) {
        if (!z && R.type == X && R.length == W)
          return R;
        (M = R.prop(V.lookAhead)) && (L = _[z] + R.length + M);
      }
      return m(X, y, _, W, L, b);
    };
  }
  function d(X, b, y, _, W, L, z, R, M) {
    let E = [], B = [];
    for (; X.length > _; )
      E.push(X.pop()), B.push(b.pop() + y - W);
    X.push(m(i.types[z], E, B, L - W, R - L, M)), b.push(W - y);
  }
  function m(X, b, y, _, W, L, z) {
    if (L) {
      let R = [V.contextHash, L];
      z = z ? [R].concat(z) : [R];
    }
    if (W > 25) {
      let R = [V.lookAhead, W];
      z = z ? [R].concat(z) : [R];
    }
    return new te(X, b, y, _, z);
  }
  function g(X, b) {
    let y = O.fork(), _ = 0, W = 0, L = 0, z = y.end - s, R = { size: 0, start: 0, skip: 0 };
    e: for (let M = y.pos - X; y.pos > M; ) {
      let E = y.size;
      if (y.id == b && E >= 0) {
        R.size = _, R.start = W, R.skip = L, L += 4, _ += 4, y.next();
        continue;
      }
      let B = y.pos - E;
      if (E < 0 || B < M || y.start < z)
        break;
      let xe = y.id >= o ? 4 : 0, _e = y.start;
      for (y.next(); y.pos > B; ) {
        if (y.size < 0)
          if (y.size == -3 || y.size == -4)
            xe += 4;
          else
            break e;
        else y.id >= o && (xe += 4);
        y.next();
      }
      W = _e, _ += E, L += xe;
    }
    return (b < 0 || _ == X) && (R.size = _, R.start = W, R.skip = L), R.size > 4 ? R : void 0;
  }
  function Q(X, b, y) {
    let { id: _, start: W, end: L, size: z } = O;
    if (O.next(), z >= 0 && _ < o) {
      let R = y;
      if (z > 4) {
        let M = O.pos - (z - 4);
        for (; O.pos > M; )
          y = Q(X, b, y);
      }
      b[--y] = R, b[--y] = L - X, b[--y] = W - X, b[--y] = _;
    } else z == -3 ? l = _ : z == -4 && (h = _);
    return y;
  }
  let x = [], S = [];
  for (; O.pos > 0; )
    c(n.start || 0, n.bufferStart || 0, x, S, -1, 0);
  let T = (e = n.length) !== null && e !== void 0 ? e : x.length ? S[0] + x[0].length : 0;
  return new te(a[n.topID], x.reverse(), S.reverse(), T);
}
const yl = /* @__PURE__ */ new WeakMap();
function ys(n, e) {
  if (!n.isAnonymous || e instanceof Gt || e.type != n)
    return 1;
  let t = yl.get(e);
  if (t == null) {
    t = 1;
    for (let i of e.children) {
      if (i.type != n || !(i instanceof te)) {
        t = 1;
        break;
      }
      t += ys(n, i);
    }
    yl.set(e, t);
  }
  return t;
}
function AO(n, e, t, i, s, r, o, O, a) {
  let l = 0;
  for (let d = i; d < s; d++)
    l += ys(n, e[d]);
  let h = Math.ceil(
    l * 1.5 / 8
    /* Balance.BranchFactor */
  ), c = [], f = [];
  function u(d, m, g, Q, x) {
    for (let S = g; S < Q; ) {
      let T = S, X = m[S], b = ys(n, d[S]);
      for (S++; S < Q; S++) {
        let y = ys(n, d[S]);
        if (b + y >= h)
          break;
        b += y;
      }
      if (S == T + 1) {
        if (b > h) {
          let y = d[T];
          u(y.children, y.positions, 0, y.children.length, m[T] + x);
          continue;
        }
        c.push(d[T]);
      } else {
        let y = m[S - 1] + d[S - 1].length - X;
        c.push(AO(n, d, m, T, S, X, y, null, a));
      }
      f.push(X + x - r);
    }
  }
  return u(e, t, i, s, 0), (O || a)(c, f, o);
}
class Cg {
  constructor() {
    this.map = /* @__PURE__ */ new WeakMap();
  }
  setBuffer(e, t, i) {
    let s = this.map.get(e);
    s || this.map.set(e, s = /* @__PURE__ */ new Map()), s.set(t, i);
  }
  getBuffer(e, t) {
    let i = this.map.get(e);
    return i && i.get(t);
  }
  /**
  Set the value for this syntax node.
  */
  set(e, t) {
    e instanceof dt ? this.setBuffer(e.context.buffer, e.index, t) : e instanceof Ye && this.map.set(e.tree, t);
  }
  /**
  Retrieve value for this syntax node, if it exists in the map.
  */
  get(e) {
    return e instanceof dt ? this.getBuffer(e.context.buffer, e.index) : e instanceof Ye ? this.map.get(e.tree) : void 0;
  }
  /**
  Set the value for the node that a cursor currently points to.
  */
  cursorSet(e, t) {
    e.buffer ? this.setBuffer(e.buffer.buffer, e.index, t) : this.map.set(e.tree, t);
  }
  /**
  Retrieve the value for the node that a cursor currently points
  to.
  */
  cursorGet(e) {
    return e.buffer ? this.getBuffer(e.buffer.buffer, e.index) : this.map.get(e.tree);
  }
}
class ri {
  /**
  Construct a tree fragment. You'll usually want to use
  [`addTree`](#common.TreeFragment^addTree) and
  [`applyChanges`](#common.TreeFragment^applyChanges) instead of
  calling this directly.
  */
  constructor(e, t, i, s, r = !1, o = !1) {
    this.from = e, this.to = t, this.tree = i, this.offset = s, this.open = (r ? 1 : 0) | (o ? 2 : 0);
  }
  /**
  Whether the start of the fragment represents the start of a
  parse, or the end of a change. (In the second case, it may not
  be safe to reuse some nodes at the start, depending on the
  parsing algorithm.)
  */
  get openStart() {
    return (this.open & 1) > 0;
  }
  /**
  Whether the end of the fragment represents the end of a
  full-document parse, or the start of a change.
  */
  get openEnd() {
    return (this.open & 2) > 0;
  }
  /**
  Create a set of fragments from a freshly parsed tree, or update
  an existing set of fragments by replacing the ones that overlap
  with a tree with content from the new tree. When `partial` is
  true, the parse is treated as incomplete, and the resulting
  fragment has [`openEnd`](#common.TreeFragment.openEnd) set to
  true.
  */
  static addTree(e, t = [], i = !1) {
    let s = [new ri(0, e.length, e, 0, !1, i)];
    for (let r of t)
      r.to > e.length && s.push(r);
    return s;
  }
  /**
  Apply a set of edits to an array of fragments, removing or
  splitting fragments as necessary to remove edited ranges, and
  adjusting offsets for fragments that moved.
  */
  static applyChanges(e, t, i = 128) {
    if (!t.length)
      return e;
    let s = [], r = 1, o = e.length ? e[0] : null;
    for (let O = 0, a = 0, l = 0; ; O++) {
      let h = O < t.length ? t[O] : null, c = h ? h.fromA : 1e9;
      if (c - a >= i)
        for (; o && o.from < c; ) {
          let f = o;
          if (a >= f.from || c <= f.to || l) {
            let u = Math.max(f.from, a) - l, d = Math.min(f.to, c) - l;
            f = u >= d ? null : new ri(u, d, f.tree, f.offset + l, O > 0, !!h);
          }
          if (f && s.push(f), o.to > c)
            break;
          o = r < e.length ? e[r++] : null;
        }
      if (!h)
        break;
      a = h.toA, l = h.toA - h.toB;
    }
    return s;
  }
}
class uf {
  /**
  Start a parse, returning a [partial parse](#common.PartialParse)
  object. [`fragments`](#common.TreeFragment) can be passed in to
  make the parse incremental.
  
  By default, the entire input is parsed. You can pass `ranges`,
  which should be a sorted array of non-empty, non-overlapping
  ranges, to parse only those ranges. The tree returned in that
  case will start at `ranges[0].from`.
  */
  startParse(e, t, i) {
    return typeof e == "string" && (e = new Wg(e)), i = i ? i.length ? i.map((s) => new Dr(s.from, s.to)) : [new Dr(0, 0)] : [new Dr(0, e.length)], this.createParse(e, t || [], i);
  }
  /**
  Run a full parse, returning the resulting tree.
  */
  parse(e, t, i) {
    let s = this.startParse(e, t, i);
    for (; ; ) {
      let r = s.advance();
      if (r)
        return r;
    }
  }
}
class Wg {
  constructor(e) {
    this.string = e;
  }
  get length() {
    return this.string.length;
  }
  chunk(e) {
    return this.string.slice(e);
  }
  get lineChunks() {
    return !1;
  }
  read(e, t) {
    return this.string.slice(e, t);
  }
}
new V({ perNode: !0 });
let jg = 0;
class Ee {
  /**
  @internal
  */
  constructor(e, t, i, s) {
    this.name = e, this.set = t, this.base = i, this.modified = s, this.id = jg++;
  }
  toString() {
    let { name: e } = this;
    for (let t of this.modified)
      t.name && (e = `${t.name}(${e})`);
    return e;
  }
  static define(e, t) {
    let i = typeof e == "string" ? e : "?";
    if (e instanceof Ee && (t = e), t != null && t.base)
      throw new Error("Can not derive from a modified tag");
    let s = new Ee(i, [], null, []);
    if (s.set.push(s), t)
      for (let r of t.set)
        s.set.push(r);
    return s;
  }
  /**
  Define a tag _modifier_, which is a function that, given a tag,
  will return a tag that is a subtag of the original. Applying the
  same modifier to a twice tag will return the same value (`m1(t1)
  == m1(t1)`) and applying multiple modifiers will, regardless or
  order, produce the same tag (`m1(m2(t1)) == m2(m1(t1))`).
  
  When multiple modifiers are applied to a given base tag, each
  smaller set of modifiers is registered as a parent, so that for
  example `m1(m2(m3(t1)))` is a subtype of `m1(m2(t1))`,
  `m1(m3(t1)`, and so on.
  */
  static defineModifier(e) {
    let t = new js(e);
    return (i) => i.modified.indexOf(t) > -1 ? i : js.get(i.base || i, i.modified.concat(t).sort((s, r) => s.id - r.id));
  }
}
let Ag = 0;
class js {
  constructor(e) {
    this.name = e, this.instances = [], this.id = Ag++;
  }
  static get(e, t) {
    if (!t.length)
      return e;
    let i = t[0].instances.find((O) => O.base == e && Eg(t, O.modified));
    if (i)
      return i;
    let s = [], r = new Ee(e.name, s, e, t);
    for (let O of t)
      O.instances.push(r);
    let o = Mg(t);
    for (let O of e.set)
      if (!O.modified.length)
        for (let a of o)
          s.push(js.get(O, a));
    return r;
  }
}
function Eg(n, e) {
  return n.length == e.length && n.every((t, i) => t == e[i]);
}
function Mg(n) {
  let e = [[]];
  for (let t = 0; t < n.length; t++)
    for (let i = 0, s = e.length; i < s; i++)
      e.push(e[i].concat(n[t]));
  return e.sort((t, i) => i.length - t.length);
}
function mr(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let i = n[t];
    Array.isArray(i) || (i = [i]);
    for (let s of t.split(" "))
      if (s) {
        let r = [], o = 2, O = s;
        for (let c = 0; ; ) {
          if (O == "..." && c > 0 && c + 3 == s.length) {
            o = 1;
            break;
          }
          let f = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(O);
          if (!f)
            throw new RangeError("Invalid path: " + s);
          if (r.push(f[0] == "*" ? "" : f[0][0] == '"' ? JSON.parse(f[0]) : f[0]), c += f[0].length, c == s.length)
            break;
          let u = s[c++];
          if (c == s.length && u == "!") {
            o = 0;
            break;
          }
          if (u != "/")
            throw new RangeError("Invalid path: " + s);
          O = s.slice(c);
        }
        let a = r.length - 1, l = r[a];
        if (!l)
          throw new RangeError("Invalid path: " + s);
        let h = new bn(i, o, a > 0 ? r.slice(0, a) : null);
        e[l] = h.sort(e[l]);
      }
  }
  return df.add(e);
}
const df = new V({
  combine(n, e) {
    let t, i, s;
    for (; n || e; ) {
      if (!n || e && n.depth >= e.depth ? (s = e, e = e.next) : (s = n, n = n.next), t && t.mode == s.mode && !s.context && !t.context)
        continue;
      let r = new bn(s.tags, s.mode, s.context);
      t ? t.next = r : i = r, t = r;
    }
    return i;
  }
});
class bn {
  constructor(e, t, i, s) {
    this.tags = e, this.mode = t, this.context = i, this.next = s;
  }
  get opaque() {
    return this.mode == 0;
  }
  get inherit() {
    return this.mode == 1;
  }
  sort(e) {
    return !e || e.depth < this.depth ? (this.next = e, this) : (e.next = this.sort(e.next), e);
  }
  get depth() {
    return this.context ? this.context.length : 0;
  }
}
bn.empty = new bn([], 2, null);
function pf(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r of n)
    if (!Array.isArray(r.tag))
      t[r.tag.id] = r.class;
    else
      for (let o of r.tag)
        t[o.id] = r.class;
  let { scope: i, all: s = null } = e || {};
  return {
    style: (r) => {
      let o = s;
      for (let O of r)
        for (let a of O.set) {
          let l = t[a.id];
          if (l) {
            o = o ? o + " " + l : l;
            break;
          }
        }
      return o;
    },
    scope: i
  };
}
function Gg(n, e) {
  let t = null;
  for (let i of n) {
    let s = i.style(e);
    s && (t = t ? t + " " + s : s);
  }
  return t;
}
function Lg(n, e, t, i = 0, s = n.length) {
  let r = new Dg(i, Array.isArray(e) ? e : [e], t);
  r.highlightRange(n.cursor(), i, s, "", r.highlighters), r.flush(s);
}
class Dg {
  constructor(e, t, i) {
    this.at = e, this.highlighters = t, this.span = i, this.class = "";
  }
  startSpan(e, t) {
    t != this.class && (this.flush(e), e > this.at && (this.at = e), this.class = t);
  }
  flush(e) {
    e > this.at && this.class && this.span(this.at, e, this.class);
  }
  highlightRange(e, t, i, s, r) {
    let { type: o, from: O, to: a } = e;
    if (O >= i || a <= t)
      return;
    o.isTop && (r = this.highlighters.filter((u) => !u.scope || u.scope(o)));
    let l = s, h = Ig(e) || bn.empty, c = Gg(r, h.tags);
    if (c && (l && (l += " "), l += c, h.mode == 1 && (s += (s ? " " : "") + c)), this.startSpan(Math.max(t, O), l), h.opaque)
      return;
    let f = e.tree && e.tree.prop(V.mounted);
    if (f && f.overlay) {
      let u = e.node.enter(f.overlay[0].from + O, 1), d = this.highlighters.filter((g) => !g.scope || g.scope(f.tree.type)), m = e.firstChild();
      for (let g = 0, Q = O; ; g++) {
        let x = g < f.overlay.length ? f.overlay[g] : null, S = x ? x.from + O : a, T = Math.max(t, Q), X = Math.min(i, S);
        if (T < X && m)
          for (; e.from < X && (this.highlightRange(e, T, X, s, r), this.startSpan(Math.min(X, e.to), l), !(e.to >= S || !e.nextSibling())); )
            ;
        if (!x || S > i)
          break;
        Q = x.to + O, Q > t && (this.highlightRange(u.cursor(), Math.max(t, x.from + O), Math.min(i, Q), "", d), this.startSpan(Math.min(i, Q), l));
      }
      m && e.parent();
    } else if (e.firstChild()) {
      f && (s = "");
      do
        if (!(e.to <= t)) {
          if (e.from >= i)
            break;
          this.highlightRange(e, t, i, s, r), this.startSpan(Math.min(i, e.to), l);
        }
      while (e.nextSibling());
      e.parent();
    }
  }
}
function Ig(n) {
  let e = n.type.prop(df);
  for (; e && e.context && !n.matchContext(e.context); )
    e = e.next;
  return e || null;
}
const w = Ee.define, as = w(), Tt = w(), wl = w(Tt), kl = w(Tt), Ut = w(), ls = w(Ut), Ir = w(Ut), Ot = w(), Ft = w(Ot), rt = w(), ot = w(), Ho = w(), Ki = w(Ho), hs = w(), p = {
  /**
  A comment.
  */
  comment: as,
  /**
  A line [comment](#highlight.tags.comment).
  */
  lineComment: w(as),
  /**
  A block [comment](#highlight.tags.comment).
  */
  blockComment: w(as),
  /**
  A documentation [comment](#highlight.tags.comment).
  */
  docComment: w(as),
  /**
  Any kind of identifier.
  */
  name: Tt,
  /**
  The [name](#highlight.tags.name) of a variable.
  */
  variableName: w(Tt),
  /**
  A type [name](#highlight.tags.name).
  */
  typeName: wl,
  /**
  A tag name (subtag of [`typeName`](#highlight.tags.typeName)).
  */
  tagName: w(wl),
  /**
  A property or field [name](#highlight.tags.name).
  */
  propertyName: kl,
  /**
  An attribute name (subtag of [`propertyName`](#highlight.tags.propertyName)).
  */
  attributeName: w(kl),
  /**
  The [name](#highlight.tags.name) of a class.
  */
  className: w(Tt),
  /**
  A label [name](#highlight.tags.name).
  */
  labelName: w(Tt),
  /**
  A namespace [name](#highlight.tags.name).
  */
  namespace: w(Tt),
  /**
  The [name](#highlight.tags.name) of a macro.
  */
  macroName: w(Tt),
  /**
  A literal value.
  */
  literal: Ut,
  /**
  A string [literal](#highlight.tags.literal).
  */
  string: ls,
  /**
  A documentation [string](#highlight.tags.string).
  */
  docString: w(ls),
  /**
  A character literal (subtag of [string](#highlight.tags.string)).
  */
  character: w(ls),
  /**
  An attribute value (subtag of [string](#highlight.tags.string)).
  */
  attributeValue: w(ls),
  /**
  A number [literal](#highlight.tags.literal).
  */
  number: Ir,
  /**
  An integer [number](#highlight.tags.number) literal.
  */
  integer: w(Ir),
  /**
  A floating-point [number](#highlight.tags.number) literal.
  */
  float: w(Ir),
  /**
  A boolean [literal](#highlight.tags.literal).
  */
  bool: w(Ut),
  /**
  Regular expression [literal](#highlight.tags.literal).
  */
  regexp: w(Ut),
  /**
  An escape [literal](#highlight.tags.literal), for example a
  backslash escape in a string.
  */
  escape: w(Ut),
  /**
  A color [literal](#highlight.tags.literal).
  */
  color: w(Ut),
  /**
  A URL [literal](#highlight.tags.literal).
  */
  url: w(Ut),
  /**
  A language keyword.
  */
  keyword: rt,
  /**
  The [keyword](#highlight.tags.keyword) for the self or this
  object.
  */
  self: w(rt),
  /**
  The [keyword](#highlight.tags.keyword) for null.
  */
  null: w(rt),
  /**
  A [keyword](#highlight.tags.keyword) denoting some atomic value.
  */
  atom: w(rt),
  /**
  A [keyword](#highlight.tags.keyword) that represents a unit.
  */
  unit: w(rt),
  /**
  A modifier [keyword](#highlight.tags.keyword).
  */
  modifier: w(rt),
  /**
  A [keyword](#highlight.tags.keyword) that acts as an operator.
  */
  operatorKeyword: w(rt),
  /**
  A control-flow related [keyword](#highlight.tags.keyword).
  */
  controlKeyword: w(rt),
  /**
  A [keyword](#highlight.tags.keyword) that defines something.
  */
  definitionKeyword: w(rt),
  /**
  A [keyword](#highlight.tags.keyword) related to defining or
  interfacing with modules.
  */
  moduleKeyword: w(rt),
  /**
  An operator.
  */
  operator: ot,
  /**
  An [operator](#highlight.tags.operator) that dereferences something.
  */
  derefOperator: w(ot),
  /**
  Arithmetic-related [operator](#highlight.tags.operator).
  */
  arithmeticOperator: w(ot),
  /**
  Logical [operator](#highlight.tags.operator).
  */
  logicOperator: w(ot),
  /**
  Bit [operator](#highlight.tags.operator).
  */
  bitwiseOperator: w(ot),
  /**
  Comparison [operator](#highlight.tags.operator).
  */
  compareOperator: w(ot),
  /**
  [Operator](#highlight.tags.operator) that updates its operand.
  */
  updateOperator: w(ot),
  /**
  [Operator](#highlight.tags.operator) that defines something.
  */
  definitionOperator: w(ot),
  /**
  Type-related [operator](#highlight.tags.operator).
  */
  typeOperator: w(ot),
  /**
  Control-flow [operator](#highlight.tags.operator).
  */
  controlOperator: w(ot),
  /**
  Program or markup punctuation.
  */
  punctuation: Ho,
  /**
  [Punctuation](#highlight.tags.punctuation) that separates
  things.
  */
  separator: w(Ho),
  /**
  Bracket-style [punctuation](#highlight.tags.punctuation).
  */
  bracket: Ki,
  /**
  Angle [brackets](#highlight.tags.bracket) (usually `<` and `>`
  tokens).
  */
  angleBracket: w(Ki),
  /**
  Square [brackets](#highlight.tags.bracket) (usually `[` and `]`
  tokens).
  */
  squareBracket: w(Ki),
  /**
  Parentheses (usually `(` and `)` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  paren: w(Ki),
  /**
  Braces (usually `{` and `}` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  brace: w(Ki),
  /**
  Content, for example plain text in XML or markup documents.
  */
  content: Ot,
  /**
  [Content](#highlight.tags.content) that represents a heading.
  */
  heading: Ft,
  /**
  A level 1 [heading](#highlight.tags.heading).
  */
  heading1: w(Ft),
  /**
  A level 2 [heading](#highlight.tags.heading).
  */
  heading2: w(Ft),
  /**
  A level 3 [heading](#highlight.tags.heading).
  */
  heading3: w(Ft),
  /**
  A level 4 [heading](#highlight.tags.heading).
  */
  heading4: w(Ft),
  /**
  A level 5 [heading](#highlight.tags.heading).
  */
  heading5: w(Ft),
  /**
  A level 6 [heading](#highlight.tags.heading).
  */
  heading6: w(Ft),
  /**
  A prose [content](#highlight.tags.content) separator (such as a horizontal rule).
  */
  contentSeparator: w(Ot),
  /**
  [Content](#highlight.tags.content) that represents a list.
  */
  list: w(Ot),
  /**
  [Content](#highlight.tags.content) that represents a quote.
  */
  quote: w(Ot),
  /**
  [Content](#highlight.tags.content) that is emphasized.
  */
  emphasis: w(Ot),
  /**
  [Content](#highlight.tags.content) that is styled strong.
  */
  strong: w(Ot),
  /**
  [Content](#highlight.tags.content) that is part of a link.
  */
  link: w(Ot),
  /**
  [Content](#highlight.tags.content) that is styled as code or
  monospace.
  */
  monospace: w(Ot),
  /**
  [Content](#highlight.tags.content) that has a strike-through
  style.
  */
  strikethrough: w(Ot),
  /**
  Inserted text in a change-tracking format.
  */
  inserted: w(),
  /**
  Deleted text.
  */
  deleted: w(),
  /**
  Changed text.
  */
  changed: w(),
  /**
  An invalid or unsyntactic element.
  */
  invalid: w(),
  /**
  Metadata or meta-instruction.
  */
  meta: hs,
  /**
  [Metadata](#highlight.tags.meta) that applies to the entire
  document.
  */
  documentMeta: w(hs),
  /**
  [Metadata](#highlight.tags.meta) that annotates or adds
  attributes to a given syntactic element.
  */
  annotation: w(hs),
  /**
  Processing instruction or preprocessor directive. Subtag of
  [meta](#highlight.tags.meta).
  */
  processingInstruction: w(hs),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that a
  given element is being defined. Expected to be used with the
  various [name](#highlight.tags.name) tags.
  */
  definition: Ee.defineModifier("definition"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that
  something is constant. Mostly expected to be used with
  [variable names](#highlight.tags.variableName).
  */
  constant: Ee.defineModifier("constant"),
  /**
  [Modifier](#highlight.Tag^defineModifier) used to indicate that
  a [variable](#highlight.tags.variableName) or [property
  name](#highlight.tags.propertyName) is being called or defined
  as a function.
  */
  function: Ee.defineModifier("function"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that can be applied to
  [names](#highlight.tags.name) to indicate that they belong to
  the language's standard environment.
  */
  standard: Ee.defineModifier("standard"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates a given
  [names](#highlight.tags.name) is local to some scope.
  */
  local: Ee.defineModifier("local"),
  /**
  A generic variant [modifier](#highlight.Tag^defineModifier) that
  can be used to tag language-specific alternative variants of
  some common tag. It is recommended for themes to define special
  forms of at least the [string](#highlight.tags.string) and
  [variable name](#highlight.tags.variableName) tags, since those
  come up a lot.
  */
  special: Ee.defineModifier("special")
};
for (let n in p) {
  let e = p[n];
  e instanceof Ee && (e.name = n);
}
pf([
  { tag: p.link, class: "tok-link" },
  { tag: p.heading, class: "tok-heading" },
  { tag: p.emphasis, class: "tok-emphasis" },
  { tag: p.strong, class: "tok-strong" },
  { tag: p.keyword, class: "tok-keyword" },
  { tag: p.atom, class: "tok-atom" },
  { tag: p.bool, class: "tok-bool" },
  { tag: p.url, class: "tok-url" },
  { tag: p.labelName, class: "tok-labelName" },
  { tag: p.inserted, class: "tok-inserted" },
  { tag: p.deleted, class: "tok-deleted" },
  { tag: p.literal, class: "tok-literal" },
  { tag: p.string, class: "tok-string" },
  { tag: p.number, class: "tok-number" },
  { tag: [p.regexp, p.escape, p.special(p.string)], class: "tok-string2" },
  { tag: p.variableName, class: "tok-variableName" },
  { tag: p.local(p.variableName), class: "tok-variableName tok-local" },
  { tag: p.definition(p.variableName), class: "tok-variableName tok-definition" },
  { tag: p.special(p.variableName), class: "tok-variableName2" },
  { tag: p.definition(p.propertyName), class: "tok-propertyName tok-definition" },
  { tag: p.typeName, class: "tok-typeName" },
  { tag: p.namespace, class: "tok-namespace" },
  { tag: p.className, class: "tok-className" },
  { tag: p.macroName, class: "tok-macroName" },
  { tag: p.propertyName, class: "tok-propertyName" },
  { tag: p.operator, class: "tok-operator" },
  { tag: p.comment, class: "tok-comment" },
  { tag: p.meta, class: "tok-meta" },
  { tag: p.invalid, class: "tok-invalid" },
  { tag: p.punctuation, class: "tok-punctuation" }
]);
var Br;
const xi = /* @__PURE__ */ new V();
function mf(n) {
  return v.define({
    combine: n ? (e) => e.concat(n) : void 0
  });
}
const EO = /* @__PURE__ */ new V();
class Fe {
  /**
  Construct a language object. If you need to invoke this
  directly, first define a data facet with
  [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet), and then
  configure your parser to [attach](https://codemirror.net/6/docs/ref/#language.languageDataProp) it
  to the language's outer syntax node.
  */
  constructor(e, t, i = [], s = "") {
    this.data = e, this.name = s, A.prototype.hasOwnProperty("tree") || Object.defineProperty(A.prototype, "tree", { get() {
      return oe(this);
    } }), this.parser = t, this.extension = [
      Lt.of(this),
      A.languageData.of((r, o, O) => {
        let a = Zl(r, o, O), l = a.type.prop(xi);
        if (!l)
          return [];
        let h = r.facet(l), c = a.type.prop(EO);
        if (c) {
          let f = a.resolve(o - a.from, O);
          for (let u of c)
            if (u.test(f, r)) {
              let d = r.facet(u.facet);
              return u.type == "replace" ? d : d.concat(h);
            }
        }
        return h;
      })
    ].concat(i);
  }
  /**
  Query whether this language is active at the given position.
  */
  isActiveAt(e, t, i = -1) {
    return Zl(e, t, i).type.prop(xi) == this.data;
  }
  /**
  Find the document regions that were parsed using this language.
  The returned regions will _include_ any nested languages rooted
  in this language, when those exist.
  */
  findRegions(e) {
    let t = e.facet(Lt);
    if ((t == null ? void 0 : t.data) == this.data)
      return [{ from: 0, to: e.doc.length }];
    if (!t || !t.allowsNesting)
      return [];
    let i = [], s = (r, o) => {
      if (r.prop(xi) == this.data) {
        i.push({ from: o, to: o + r.length });
        return;
      }
      let O = r.prop(V.mounted);
      if (O) {
        if (O.tree.prop(xi) == this.data) {
          if (O.overlay)
            for (let a of O.overlay)
              i.push({ from: a.from + o, to: a.to + o });
          else
            i.push({ from: o, to: o + r.length });
          return;
        } else if (O.overlay) {
          let a = i.length;
          if (s(O.tree, O.overlay[0].from + o), i.length > a)
            return;
        }
      }
      for (let a = 0; a < r.children.length; a++) {
        let l = r.children[a];
        l instanceof te && s(l, r.positions[a] + o);
      }
    };
    return s(oe(e), 0), i;
  }
  /**
  Indicates whether this language allows nested languages. The
  default implementation returns true.
  */
  get allowsNesting() {
    return !0;
  }
}
Fe.setState = /* @__PURE__ */ q.define();
function Zl(n, e, t) {
  let i = n.facet(Lt), s = oe(n).topNode;
  if (!i || i.allowsNesting)
    for (let r = s; r; r = r.enter(e, t, H.ExcludeBuffers | H.EnterBracketed))
      r.type.isTop && (s = r);
  return s;
}
class ji extends Fe {
  constructor(e, t, i) {
    super(e, t, [], i), this.parser = t;
  }
  /**
  Define a language from a parser.
  */
  static define(e) {
    let t = mf(e.languageData);
    return new ji(t, e.parser.configure({
      props: [xi.add((i) => i.isTop ? t : void 0)]
    }), e.name);
  }
  /**
  Create a new instance of this language with a reconfigured
  version of its parser and optionally a new name.
  */
  configure(e, t) {
    return new ji(this.data, this.parser.configure(e), t || this.name);
  }
  get allowsNesting() {
    return this.parser.hasWrappers();
  }
}
function oe(n) {
  let e = n.field(Fe.state, !1);
  return e ? e.tree : te.empty;
}
class Bg {
  /**
  Create an input object for the given document.
  */
  constructor(e) {
    this.doc = e, this.cursorPos = 0, this.string = "", this.cursor = e.iter();
  }
  get length() {
    return this.doc.length;
  }
  syncTo(e) {
    return this.string = this.cursor.next(e - this.cursorPos).value, this.cursorPos = e + this.string.length, this.cursorPos - this.string.length;
  }
  chunk(e) {
    return this.syncTo(e), this.string;
  }
  get lineChunks() {
    return !0;
  }
  read(e, t) {
    let i = this.cursorPos - this.string.length;
    return e < i || t >= this.cursorPos ? this.doc.sliceString(e, t) : this.string.slice(e - i, t - i);
  }
}
let Ji = null;
class As {
  constructor(e, t, i = [], s, r, o, O, a) {
    this.parser = e, this.state = t, this.fragments = i, this.tree = s, this.treeLen = r, this.viewport = o, this.skipped = O, this.scheduleOn = a, this.parse = null, this.tempSkipped = [];
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new As(e, t, [], te.empty, 0, i, [], null);
  }
  startParse() {
    return this.parser.startParse(new Bg(this.state.doc), this.fragments);
  }
  /**
  @internal
  */
  work(e, t) {
    return t != null && t >= this.state.doc.length && (t = void 0), this.tree != te.empty && this.isDone(t ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
      var i;
      if (typeof e == "number") {
        let s = Date.now() + e;
        e = () => Date.now() > s;
      }
      for (this.parse || (this.parse = this.startParse()), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t); ; ) {
        let s = this.parse.advance();
        if (s)
          if (this.fragments = this.withoutTempSkipped(ri.addTree(s, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (i = this.parse.stoppedAt) !== null && i !== void 0 ? i : this.state.doc.length, this.tree = s, this.parse = null, this.treeLen < (t ?? this.state.doc.length))
            this.parse = this.startParse();
          else
            return !0;
        if (e())
          return !1;
      }
    });
  }
  /**
  @internal
  */
  takeTree() {
    let e, t;
    this.parse && (e = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > e) && this.parse.stopAt(e), this.withContext(() => {
      for (; !(t = this.parse.advance()); )
        ;
    }), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(ri.addTree(this.tree, this.fragments, !0)), this.parse = null);
  }
  withContext(e) {
    let t = Ji;
    Ji = this;
    try {
      return e();
    } finally {
      Ji = t;
    }
  }
  withoutTempSkipped(e) {
    for (let t; t = this.tempSkipped.pop(); )
      e = vl(e, t.from, t.to);
    return e;
  }
  /**
  @internal
  */
  changes(e, t) {
    let { fragments: i, tree: s, treeLen: r, viewport: o, skipped: O } = this;
    if (this.takeTree(), !e.empty) {
      let a = [];
      if (e.iterChangedRanges((l, h, c, f) => a.push({ fromA: l, toA: h, fromB: c, toB: f })), i = ri.applyChanges(i, a), s = te.empty, r = 0, o = { from: e.mapPos(o.from, -1), to: e.mapPos(o.to, 1) }, this.skipped.length) {
        O = [];
        for (let l of this.skipped) {
          let h = e.mapPos(l.from, 1), c = e.mapPos(l.to, -1);
          h < c && O.push({ from: h, to: c });
        }
      }
    }
    return new As(this.parser, t, i, s, r, o, O, this.scheduleOn);
  }
  /**
  @internal
  */
  updateViewport(e) {
    if (this.viewport.from == e.from && this.viewport.to == e.to)
      return !1;
    this.viewport = e;
    let t = this.skipped.length;
    for (let i = 0; i < this.skipped.length; i++) {
      let { from: s, to: r } = this.skipped[i];
      s < e.to && r > e.from && (this.fragments = vl(this.fragments, s, r), this.skipped.splice(i--, 1));
    }
    return this.skipped.length >= t ? !1 : (this.reset(), !0);
  }
  /**
  @internal
  */
  reset() {
    this.parse && (this.takeTree(), this.parse = null);
  }
  /**
  Notify the parse scheduler that the given region was skipped
  because it wasn't in view, and the parse should be restarted
  when it comes into view.
  */
  skipUntilInView(e, t) {
    this.skipped.push({ from: e, to: t });
  }
  /**
  Returns a parser intended to be used as placeholder when
  asynchronously loading a nested parser. It'll skip its input and
  mark it as not-really-parsed, so that the next update will parse
  it again.
  
  When `until` is given, a reparse will be scheduled when that
  promise resolves.
  */
  static getSkippingParser(e) {
    return new class extends uf {
      createParse(t, i, s) {
        let r = s[0].from, o = s[s.length - 1].to;
        return {
          parsedPos: r,
          advance() {
            let a = Ji;
            if (a) {
              for (let l of s)
                a.tempSkipped.push(l);
              e && (a.scheduleOn = a.scheduleOn ? Promise.all([a.scheduleOn, e]) : e);
            }
            return this.parsedPos = o, new te(Re.none, [], [], o - r);
          },
          stoppedAt: null,
          stopAt() {
          }
        };
      }
    }();
  }
  /**
  @internal
  */
  isDone(e) {
    e = Math.min(e, this.state.doc.length);
    let t = this.fragments;
    return this.treeLen >= e && t.length && t[0].from == 0 && t[0].to >= e;
  }
  /**
  Get the context for the current parse, or `null` if no editor
  parse is in progress.
  */
  static get() {
    return Ji;
  }
}
function vl(n, e, t) {
  return ri.applyChanges(n, [{ fromA: e, toA: t, fromB: e, toB: t }]);
}
class Ai {
  constructor(e) {
    this.context = e, this.tree = e.tree;
  }
  apply(e) {
    if (!e.docChanged && this.tree == this.context.tree)
      return this;
    let t = this.context.changes(e.changes, e.state), i = this.context.treeLen == e.startState.doc.length ? void 0 : Math.max(e.changes.mapPos(this.context.treeLen), t.viewport.to);
    return t.work(20, i) || t.takeTree(), new Ai(t);
  }
  static init(e) {
    let t = Math.min(3e3, e.doc.length), i = As.create(e.facet(Lt).parser, e, { from: 0, to: t });
    return i.work(20, t) || i.takeTree(), new Ai(i);
  }
}
Fe.state = /* @__PURE__ */ me.define({
  create: Ai.init,
  update(n, e) {
    for (let t of e.effects)
      if (t.is(Fe.setState))
        return t.value;
    return e.startState.facet(Lt) != e.state.facet(Lt) ? Ai.init(e.state) : n.apply(e);
  }
});
let gf = (n) => {
  let e = setTimeout(
    () => n(),
    500
    /* Work.MaxPause */
  );
  return () => clearTimeout(e);
};
typeof requestIdleCallback < "u" && (gf = (n) => {
  let e = -1, t = setTimeout(
    () => {
      e = requestIdleCallback(n, {
        timeout: 400
        /* Work.MinPause */
      });
    },
    100
    /* Work.MinPause */
  );
  return () => e < 0 ? clearTimeout(t) : cancelIdleCallback(e);
});
const Nr = typeof navigator < "u" && (!((Br = navigator.scheduling) === null || Br === void 0) && Br.isInputPending) ? () => navigator.scheduling.isInputPending() : null, Ng = /* @__PURE__ */ ie.fromClass(class {
  constructor(e) {
    this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
  }
  update(e) {
    let t = this.view.state.field(Fe.state).context;
    (t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), (e.docChanged || e.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
  }
  scheduleWork() {
    if (this.working)
      return;
    let { state: e } = this.view, t = e.field(Fe.state);
    (t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = gf(this.work));
  }
  work(e) {
    this.working = null;
    let t = Date.now();
    if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0)
      return;
    let { state: i, viewport: { to: s } } = this.view, r = i.field(Fe.state);
    if (r.tree == r.context.tree && r.context.isDone(
      s + 1e5
      /* Work.MaxParseAhead */
    ))
      return;
    let o = Date.now() + Math.min(this.chunkBudget, 100, e && !Nr ? Math.max(25, e.timeRemaining() - 5) : 1e9), O = r.context.treeLen < s && i.doc.length > s + 1e3, a = r.context.work(() => Nr && Nr() || Date.now() > o, s + (O ? 0 : 1e5));
    this.chunkBudget -= Date.now() - t, (a || this.chunkBudget <= 0) && (r.context.takeTree(), this.view.dispatch({ effects: Fe.setState.of(new Ai(r.context)) })), this.chunkBudget > 0 && !(a && !O) && this.scheduleWork(), this.checkAsyncSchedule(r.context);
  }
  checkAsyncSchedule(e) {
    e.scheduleOn && (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch((t) => Te(this.view.state, t)).then(() => this.workScheduled--), e.scheduleOn = null);
  }
  destroy() {
    this.working && this.working();
  }
  isWorking() {
    return !!(this.working || this.workScheduled > 0);
  }
}, {
  eventHandlers: { focus() {
    this.scheduleWork();
  } }
}), Lt = /* @__PURE__ */ v.define({
  combine(n) {
    return n.length ? n[0] : null;
  },
  enables: (n) => [
    Fe.state,
    Ng,
    Z.contentAttributes.compute([n], (e) => {
      let t = e.facet(n);
      return t && t.name ? { "data-language": t.name } : {};
    })
  ]
});
class MO {
  /**
  Create a language support object.
  */
  constructor(e, t = []) {
    this.language = e, this.support = t, this.extension = [e, t];
  }
}
const Fg = /* @__PURE__ */ v.define(), gr = /* @__PURE__ */ v.define({
  combine: (n) => {
    if (!n.length)
      return "  ";
    let e = n[0];
    if (!e || /\S/.test(e) || Array.from(e).some((t) => t != e[0]))
      throw new Error("Invalid indent unit: " + JSON.stringify(n[0]));
    return e;
  }
});
function Es(n) {
  let e = n.facet(gr);
  return e.charCodeAt(0) == 9 ? n.tabSize * e.length : e.length;
}
function yn(n, e) {
  let t = "", i = n.tabSize, s = n.facet(gr)[0];
  if (s == "	") {
    for (; e >= i; )
      t += "	", e -= i;
    s = " ";
  }
  for (let r = 0; r < e; r++)
    t += s;
  return t;
}
function GO(n, e) {
  n instanceof A && (n = new Qr(n));
  for (let i of n.state.facet(Fg)) {
    let s = i(n, e);
    if (s !== void 0)
      return s;
  }
  let t = oe(n.state);
  return t.length >= e ? Hg(n, t, e) : null;
}
class Qr {
  /**
  Create an indent context.
  */
  constructor(e, t = {}) {
    this.state = e, this.options = t, this.unit = Es(e);
  }
  /**
  Get a description of the line at the given position, taking
  [simulated line
  breaks](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  into account. If there is such a break at `pos`, the `bias`
  argument determines whether the part of the line line before or
  after the break is used.
  */
  lineAt(e, t = 1) {
    let i = this.state.doc.lineAt(e), { simulateBreak: s, simulateDoubleBreak: r } = this.options;
    return s != null && s >= i.from && s <= i.to ? r && s == e ? { text: "", from: e } : (t < 0 ? s < e : s <= e) ? { text: i.text.slice(s - i.from), from: s } : { text: i.text.slice(0, s - i.from), from: i.from } : i;
  }
  /**
  Get the text directly after `pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  textAfterPos(e, t = 1) {
    if (this.options.simulateDoubleBreak && e == this.options.simulateBreak)
      return "";
    let { text: i, from: s } = this.lineAt(e, t);
    return i.slice(e - s, Math.min(i.length, e + 100 - s));
  }
  /**
  Find the column for the given position.
  */
  column(e, t = 1) {
    let { text: i, from: s } = this.lineAt(e, t), r = this.countColumn(i, e - s), o = this.options.overrideIndentation ? this.options.overrideIndentation(s) : -1;
    return o > -1 && (r += o - this.countColumn(i, i.search(/\S|$/))), r;
  }
  /**
  Find the column position (taking tabs into account) of the given
  position in the given string.
  */
  countColumn(e, t = e.length) {
    return Di(e, this.state.tabSize, t);
  }
  /**
  Find the indentation column of the line at the given point.
  */
  lineIndent(e, t = 1) {
    let { text: i, from: s } = this.lineAt(e, t), r = this.options.overrideIndentation;
    if (r) {
      let o = r(s);
      if (o > -1)
        return o;
    }
    return this.countColumn(i, i.search(/\S|$/));
  }
  /**
  Returns the [simulated line
  break](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  for this context, if any.
  */
  get simulatedBreak() {
    return this.options.simulateBreak || null;
  }
}
const $r = /* @__PURE__ */ new V();
function Hg(n, e, t) {
  let i = e.resolveStack(t), s = e.resolveInner(t, -1).resolve(t, 0).enterUnfinishedNodesBefore(t);
  if (s != i.node) {
    let r = [];
    for (let o = s; o && !(o.from < i.node.from || o.to > i.node.to || o.from == i.node.from && o.type == i.node.type); o = o.parent)
      r.push(o);
    for (let o = r.length - 1; o >= 0; o--)
      i = { node: r[o], next: i };
  }
  return Qf(i, n, t);
}
function Qf(n, e, t) {
  for (let i = n; i; i = i.next) {
    let s = Jg(i.node);
    if (s)
      return s(LO.create(e, t, i));
  }
  return 0;
}
function Kg(n) {
  return n.pos == n.options.simulateBreak && n.options.simulateDoubleBreak;
}
function Jg(n) {
  let e = n.type.prop($r);
  if (e)
    return e;
  let t = n.firstChild, i;
  if (t && (i = t.type.prop(V.closedBy))) {
    let s = n.lastChild, r = s && i.indexOf(s.name) > -1;
    return (o) => $f(o, !0, 1, void 0, r && !Kg(o) ? s.from : void 0);
  }
  return n.parent == null ? eQ : null;
}
function eQ() {
  return 0;
}
class LO extends Qr {
  constructor(e, t, i) {
    super(e.state, e.options), this.base = e, this.pos = t, this.context = i;
  }
  /**
  The syntax tree node to which the indentation strategy
  applies.
  */
  get node() {
    return this.context.node;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new LO(e, t, i);
  }
  /**
  Get the text directly after `this.pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  get textAfter() {
    return this.textAfterPos(this.pos);
  }
  /**
  Get the indentation at the reference line for `this.node`, which
  is the line on which it starts, unless there is a node that is
  _not_ a parent of this node covering the start of that line. If
  so, the line at the start of that node is tried, again skipping
  on if it is covered by another such node.
  */
  get baseIndent() {
    return this.baseIndentFor(this.node);
  }
  /**
  Get the indentation for the reference line of the given node
  (see [`baseIndent`](https://codemirror.net/6/docs/ref/#language.TreeIndentContext.baseIndent)).
  */
  baseIndentFor(e) {
    let t = this.state.doc.lineAt(e.from);
    for (; ; ) {
      let i = e.resolve(t.from);
      for (; i.parent && i.parent.from == i.from; )
        i = i.parent;
      if (tQ(i, e))
        break;
      t = this.state.doc.lineAt(i.from);
    }
    return this.lineIndent(t.from);
  }
  /**
  Continue looking for indentations in the node's parent nodes,
  and return the result of that.
  */
  continue() {
    return Qf(this.context.next, this.base, this.pos);
  }
}
function tQ(n, e) {
  for (let t = e; t; t = t.parent)
    if (n == t)
      return !0;
  return !1;
}
function iQ(n) {
  let e = n.node, t = e.childAfter(e.from), i = e.lastChild;
  if (!t)
    return null;
  let s = n.options.simulateBreak, r = n.state.doc.lineAt(t.from), o = s == null || s <= r.from ? r.to : Math.min(r.to, s);
  for (let O = t.to; ; ) {
    let a = e.childAfter(O);
    if (!a || a == i)
      return null;
    if (!a.type.isSkipped) {
      if (a.from >= o)
        return null;
      let l = /^ */.exec(r.text.slice(t.to - r.from))[0].length;
      return { from: t.from, to: t.to + l };
    }
    O = a.to;
  }
}
function DO({ closing: n, align: e = !0, units: t = 1 }) {
  return (i) => $f(i, e, t, n);
}
function $f(n, e, t, i, s) {
  let r = n.textAfter, o = r.match(/^\s*/)[0].length, O = i && r.slice(o, o + i.length) == i || s == n.pos + o, a = e ? iQ(n) : null;
  return a ? O ? n.column(a.from) : n.column(a.to) : n.baseIndent + (O ? 0 : n.unit * t);
}
const IO = (n) => n.baseIndent;
function yt({ except: n, units: e = 1 } = {}) {
  return (t) => {
    let i = n && n.test(t.textAfter);
    return t.baseIndent + (i ? 0 : e * t.unit);
  };
}
const nQ = 200;
function sQ() {
  return A.transactionFilter.of((n) => {
    if (!n.docChanged || !n.isUserEvent("input.type") && !n.isUserEvent("input.complete"))
      return n;
    let e = n.startState.languageDataAt("indentOnInput", n.startState.selection.main.head);
    if (!e.length)
      return n;
    let t = n.newDoc, { head: i } = n.newSelection.main, s = t.lineAt(i);
    if (i > s.from + nQ)
      return n;
    let r = t.sliceString(s.from, i);
    if (!e.some((l) => l.test(r)))
      return n;
    let { state: o } = n, O = -1, a = [];
    for (let { head: l } of o.selection.ranges) {
      let h = o.doc.lineAt(l);
      if (h.from == O)
        continue;
      O = h.from;
      let c = GO(o, h.from);
      if (c == null)
        continue;
      let f = /^\s*/.exec(h.text)[0], u = yn(o, c);
      f != u && a.push({ from: h.from, to: h.from + f.length, insert: u });
    }
    return a.length ? [n, { changes: a, sequential: !0 }] : n;
  });
}
const rQ = /* @__PURE__ */ v.define(), Pr = /* @__PURE__ */ new V();
function BO(n) {
  let e = n.firstChild, t = n.lastChild;
  return e && e.to < t.from ? { from: e.to, to: t.type.isError ? n.to : t.from } : null;
}
function oQ(n, e, t) {
  let i = oe(n);
  if (i.length < t)
    return null;
  let s = i.resolveStack(t, 1), r = null;
  for (let o = s; o; o = o.next) {
    let O = o.node;
    if (O.to <= t || O.from > t)
      continue;
    if (r && O.from < e)
      break;
    let a = O.type.prop(Pr);
    if (a && (O.to < i.length - 50 || i.length == n.doc.length || !OQ(O))) {
      let l = a(O, n);
      l && l.from <= t && l.from >= e && l.to > t && (r = l);
    }
  }
  return r;
}
function OQ(n) {
  let e = n.lastChild;
  return e && e.to == n.to && e.type.isError;
}
function Ms(n, e, t) {
  for (let i of n.facet(rQ)) {
    let s = i(n, e, t);
    if (s)
      return s;
  }
  return oQ(n, e, t);
}
function Pf(n, e) {
  let t = e.mapPos(n.from, 1), i = e.mapPos(n.to, -1);
  return t >= i ? void 0 : { from: t, to: i };
}
const Sr = /* @__PURE__ */ q.define({ map: Pf }), jn = /* @__PURE__ */ q.define({ map: Pf });
function Sf(n) {
  let e = [];
  for (let { head: t } of n.state.selection.ranges)
    e.some((i) => i.from <= t && i.to >= t) || e.push(n.lineBlockAt(t));
  return e;
}
const fi = /* @__PURE__ */ me.define({
  create() {
    return Y.none;
  },
  update(n, e) {
    e.isUserEvent("delete") && e.changes.iterChangedRanges((i, s) => n = Tl(n, i, s)), n = n.map(e.changes);
    let t = [];
    for (let i of e.effects)
      i.is(Sr) && !aQ(n, i.value.from, i.value.to) ? t.push(i.value) : i.is(jn) && (n = n.update({
        filter: (s, r) => i.value.from != s || i.value.to != r,
        filterFrom: i.value.from,
        filterTo: i.value.to
      }));
    if (t.length) {
      let { preparePlaceholder: i } = e.state.facet(bf), s = t.map((r) => (i ? Y.replace({ widget: new pQ(i(e.state, r)) }) : Ul).range(r.from, r.to));
      n = n.update({ add: s });
    }
    return e.selection && (n = Tl(n, e.selection.main.head)), n;
  },
  provide: (n) => Z.decorations.from(n),
  toJSON(n, e) {
    let t = [];
    return n.between(0, e.doc.length, (i, s) => {
      t.push(i, s);
    }), t;
  },
  fromJSON(n) {
    if (!Array.isArray(n) || n.length % 2)
      throw new RangeError("Invalid JSON for fold state");
    let e = [];
    for (let t = 0; t < n.length; ) {
      let i = n[t++], s = n[t++];
      if (typeof i != "number" || typeof s != "number")
        throw new RangeError("Invalid JSON for fold state");
      e.push(Ul.range(i, s));
    }
    return Y.set(e, !0);
  }
});
function Tl(n, e, t = e) {
  let i = !1;
  return n.between(e, t, (s, r) => {
    s < t && r > e && (i = !0);
  }), i ? n.update({
    filterFrom: e,
    filterTo: t,
    filter: (s, r) => s >= t || r <= e
  }) : n;
}
function Gs(n, e, t) {
  var i;
  let s = null;
  return (i = n.field(fi, !1)) === null || i === void 0 || i.between(e, t, (r, o) => {
    (!s || s.from > r) && (s = { from: r, to: o });
  }), s;
}
function aQ(n, e, t) {
  let i = !1;
  return n.between(e, e, (s, r) => {
    s == e && r == t && (i = !0);
  }), i;
}
function xf(n, e) {
  return n.field(fi, !1) ? e : e.concat(q.appendConfig.of(yf()));
}
const lQ = (n) => {
  for (let e of Sf(n)) {
    let t = Ms(n.state, e.from, e.to);
    if (t)
      return n.dispatch({ effects: xf(n.state, [Sr.of(t), Xf(n, t)]) }), !0;
  }
  return !1;
}, hQ = (n) => {
  if (!n.state.field(fi, !1))
    return !1;
  let e = [];
  for (let t of Sf(n)) {
    let i = Gs(n.state, t.from, t.to);
    i && e.push(jn.of(i), Xf(n, i, !1));
  }
  return e.length && n.dispatch({ effects: e }), e.length > 0;
};
function Xf(n, e, t = !0) {
  let i = n.state.doc.lineAt(e.from).number, s = n.state.doc.lineAt(e.to).number;
  return Z.announce.of(`${n.state.phrase(t ? "Folded lines" : "Unfolded lines")} ${i} ${n.state.phrase("to")} ${s}.`);
}
const cQ = (n) => {
  let { state: e } = n, t = [];
  for (let i = 0; i < e.doc.length; ) {
    let s = n.lineBlockAt(i), r = Ms(e, s.from, s.to);
    r && t.push(Sr.of(r)), i = (r ? n.lineBlockAt(r.to) : s).to + 1;
  }
  return t.length && n.dispatch({ effects: xf(n.state, t) }), !!t.length;
}, fQ = (n) => {
  let e = n.state.field(fi, !1);
  if (!e || !e.size)
    return !1;
  let t = [];
  return e.between(0, n.state.doc.length, (i, s) => {
    t.push(jn.of({ from: i, to: s }));
  }), n.dispatch({ effects: t }), !0;
}, uQ = [
  { key: "Ctrl-Shift-[", mac: "Cmd-Alt-[", run: lQ },
  { key: "Ctrl-Shift-]", mac: "Cmd-Alt-]", run: hQ },
  { key: "Ctrl-Alt-[", run: cQ },
  { key: "Ctrl-Alt-]", run: fQ }
], dQ = {
  placeholderDOM: null,
  preparePlaceholder: null,
  placeholderText: "…"
}, bf = /* @__PURE__ */ v.define({
  combine(n) {
    return $t(n, dQ);
  }
});
function yf(n) {
  return [fi, QQ];
}
function wf(n, e) {
  let { state: t } = n, i = t.facet(bf), s = (o) => {
    let O = n.lineBlockAt(n.posAtDOM(o.target)), a = Gs(n.state, O.from, O.to);
    a && n.dispatch({ effects: jn.of(a) }), o.preventDefault();
  };
  if (i.placeholderDOM)
    return i.placeholderDOM(n, s, e);
  let r = document.createElement("span");
  return r.textContent = i.placeholderText, r.setAttribute("aria-label", t.phrase("folded code")), r.title = t.phrase("unfold"), r.className = "cm-foldPlaceholder", r.onclick = s, r;
}
const Ul = /* @__PURE__ */ Y.replace({ widget: /* @__PURE__ */ new class extends Pt {
  toDOM(n) {
    return wf(n, null);
  }
}() });
class pQ extends Pt {
  constructor(e) {
    super(), this.value = e;
  }
  eq(e) {
    return this.value == e.value;
  }
  toDOM(e) {
    return wf(e, this.value);
  }
}
const mQ = {
  openText: "⌄",
  closedText: "›",
  markerDOM: null,
  domEventHandlers: {},
  foldingChanged: () => !1
};
class Fr extends Zt {
  constructor(e, t) {
    super(), this.config = e, this.open = t;
  }
  eq(e) {
    return this.config == e.config && this.open == e.open;
  }
  toDOM(e) {
    if (this.config.markerDOM)
      return this.config.markerDOM(this.open);
    let t = document.createElement("span");
    return t.textContent = this.open ? this.config.openText : this.config.closedText, t.title = e.state.phrase(this.open ? "Fold line" : "Unfold line"), t;
  }
}
function gQ(n = {}) {
  let e = { ...mQ, ...n }, t = new Fr(e, !0), i = new Fr(e, !1), s = ie.fromClass(class {
    constructor(o) {
      this.from = o.viewport.from, this.markers = this.buildMarkers(o);
    }
    update(o) {
      (o.docChanged || o.viewportChanged || o.startState.facet(Lt) != o.state.facet(Lt) || o.startState.field(fi, !1) != o.state.field(fi, !1) || oe(o.startState) != oe(o.state) || e.foldingChanged(o)) && (this.markers = this.buildMarkers(o.view));
    }
    buildMarkers(o) {
      let O = new wt();
      for (let a of o.viewportLineBlocks) {
        let l = Gs(o.state, a.from, a.to) ? i : Ms(o.state, a.from, a.to) ? t : null;
        l && O.add(a.from, a.from, l);
      }
      return O.finish();
    }
  }), { domEventHandlers: r } = e;
  return [
    s,
    Sg({
      class: "cm-foldGutter",
      markers(o) {
        var O;
        return ((O = o.plugin(s)) === null || O === void 0 ? void 0 : O.markers) || C.empty;
      },
      initialSpacer() {
        return new Fr(e, !1);
      },
      domEventHandlers: {
        ...r,
        click: (o, O, a) => {
          if (r.click && r.click(o, O, a))
            return !0;
          let l = Gs(o.state, O.from, O.to);
          if (l)
            return o.dispatch({ effects: jn.of(l) }), !0;
          let h = Ms(o.state, O.from, O.to);
          return h ? (o.dispatch({ effects: Sr.of(h) }), !0) : !1;
        }
      }
    }),
    yf()
  ];
}
const QQ = /* @__PURE__ */ Z.baseTheme({
  ".cm-foldPlaceholder": {
    backgroundColor: "#eee",
    border: "1px solid #ddd",
    color: "#888",
    borderRadius: ".2em",
    margin: "0 1px",
    padding: "0 1px",
    cursor: "pointer"
  },
  ".cm-foldGutter span": {
    padding: "0 1px",
    cursor: "pointer"
  }
});
class An {
  constructor(e, t) {
    this.specs = e;
    let i;
    function s(O) {
      let a = At.newName();
      return (i || (i = /* @__PURE__ */ Object.create(null)))["." + a] = O, a;
    }
    const r = typeof t.all == "string" ? t.all : t.all ? s(t.all) : void 0, o = t.scope;
    this.scope = o instanceof Fe ? (O) => O.prop(xi) == o.data : o ? (O) => O == o : void 0, this.style = pf(e.map((O) => ({
      tag: O.tag,
      class: O.class || s(Object.assign({}, O, { tag: null }))
    })), {
      all: r
    }).style, this.module = i ? new At(i) : null, this.themeType = t.themeType;
  }
  /**
  Create a highlighter style that associates the given styles to
  the given tags. The specs must be objects that hold a style tag
  or array of tags in their `tag` property, and either a single
  `class` property providing a static CSS class (for highlighter
  that rely on external styling), or a
  [`style-mod`](https://code.haverbeke.berlin/marijn/style-mod#documentation)-style
  set of CSS properties (which define the styling for those tags).
  
  The CSS rules created for a highlighter will be emitted in the
  order of the spec's properties. That means that for elements that
  have multiple tags associated with them, styles defined further
  down in the list will have a higher CSS precedence than styles
  defined earlier.
  */
  static define(e, t) {
    return new An(e, t || {});
  }
}
const Ko = /* @__PURE__ */ v.define(), kf = /* @__PURE__ */ v.define({
  combine(n) {
    return n.length ? [n[0]] : null;
  }
});
function Hr(n) {
  let e = n.facet(Ko);
  return e.length ? e : n.facet(kf);
}
function Zf(n, e) {
  let t = [PQ], i;
  return n instanceof An && (n.module && t.push(Z.styleModule.of(n.module)), i = n.themeType), e != null && e.fallback ? t.push(kf.of(n)) : i ? t.push(Ko.computeN([Z.darkTheme], (s) => s.facet(Z.darkTheme) == (i == "dark") ? [n] : [])) : t.push(Ko.of(n)), t;
}
class $Q {
  constructor(e) {
    this.markCache = /* @__PURE__ */ Object.create(null), this.tree = oe(e.state), this.decorations = this.buildDeco(e, Hr(e.state)), this.decoratedTo = e.viewport.to;
  }
  update(e) {
    let t = oe(e.state), i = Hr(e.state), s = i != Hr(e.startState), { viewport: r } = e.view, o = e.changes.mapPos(this.decoratedTo, 1);
    t.length < r.to && !s && t.type == this.tree.type && o >= r.to ? (this.decorations = this.decorations.map(e.changes), this.decoratedTo = o) : (t != this.tree || e.viewportChanged || s) && (this.tree = t, this.decorations = this.buildDeco(e.view, i), this.decoratedTo = r.to);
  }
  buildDeco(e, t) {
    if (!t || !this.tree.length)
      return Y.none;
    let i = new wt();
    for (let { from: s, to: r } of e.visibleRanges)
      Lg(this.tree, t, (o, O, a) => {
        i.add(o, O, this.markCache[a] || (this.markCache[a] = Y.mark({ class: a })));
      }, s, r);
    return i.finish();
  }
}
const PQ = /* @__PURE__ */ It.high(/* @__PURE__ */ ie.fromClass($Q, {
  decorations: (n) => n.decorations
})), SQ = /* @__PURE__ */ An.define([
  {
    tag: p.meta,
    color: "#404740"
  },
  {
    tag: p.link,
    textDecoration: "underline"
  },
  {
    tag: p.heading,
    textDecoration: "underline",
    fontWeight: "bold"
  },
  {
    tag: p.emphasis,
    fontStyle: "italic"
  },
  {
    tag: p.strong,
    fontWeight: "bold"
  },
  {
    tag: p.strikethrough,
    textDecoration: "line-through"
  },
  {
    tag: p.keyword,
    color: "#708"
  },
  {
    tag: [p.atom, p.bool, p.url, p.contentSeparator, p.labelName],
    color: "#219"
  },
  {
    tag: [p.literal, p.inserted],
    color: "#164"
  },
  {
    tag: [p.string, p.deleted],
    color: "#a11"
  },
  {
    tag: [p.regexp, p.escape, /* @__PURE__ */ p.special(p.string)],
    color: "#e40"
  },
  {
    tag: /* @__PURE__ */ p.definition(p.variableName),
    color: "#00f"
  },
  {
    tag: /* @__PURE__ */ p.local(p.variableName),
    color: "#30a"
  },
  {
    tag: [p.typeName, p.namespace],
    color: "#085"
  },
  {
    tag: p.className,
    color: "#167"
  },
  {
    tag: [/* @__PURE__ */ p.special(p.variableName), p.macroName],
    color: "#256"
  },
  {
    tag: /* @__PURE__ */ p.definition(p.propertyName),
    color: "#00c"
  },
  {
    tag: p.comment,
    color: "#940"
  },
  {
    tag: p.invalid,
    color: "#f00"
  }
]), xQ = /* @__PURE__ */ Z.baseTheme({
  "&.cm-focused .cm-matchingBracket": { backgroundColor: "#328c8252" },
  "&.cm-focused .cm-nonmatchingBracket": { backgroundColor: "#bb555544" }
}), vf = 1e4, Tf = "()[]{}", Uf = /* @__PURE__ */ v.define({
  combine(n) {
    return $t(n, {
      afterCursor: !0,
      brackets: Tf,
      maxScanDistance: vf,
      renderMatch: yQ
    });
  }
}), XQ = /* @__PURE__ */ Y.mark({ class: "cm-matchingBracket" }), bQ = /* @__PURE__ */ Y.mark({ class: "cm-nonmatchingBracket" });
function yQ(n) {
  let e = [], t = n.matched ? XQ : bQ;
  return e.push(t.range(n.start.from, n.start.to)), n.end && e.push(t.range(n.end.from, n.end.to)), e;
}
function Yl(n) {
  let e = [], t = n.facet(Uf);
  for (let i of n.selection.ranges) {
    if (!i.empty)
      continue;
    let s = pt(n, i.head, -1, t) || i.head > 0 && pt(n, i.head - 1, 1, t) || t.afterCursor && (pt(n, i.head, 1, t) || i.head < n.doc.length && pt(n, i.head + 1, -1, t));
    s && (e = e.concat(t.renderMatch(s, n)));
  }
  return Y.set(e, !0);
}
const wQ = /* @__PURE__ */ ie.fromClass(class {
  constructor(n) {
    this.paused = !1, this.decorations = Yl(n.state);
  }
  update(n) {
    (n.docChanged || n.selectionSet || this.paused) && (n.view.composing ? (this.decorations = this.decorations.map(n.changes), this.paused = !0) : (this.decorations = Yl(n.state), this.paused = !1));
  }
}, {
  decorations: (n) => n.decorations
}), kQ = [
  wQ,
  xQ
];
function ZQ(n = {}) {
  return [Uf.of(n), kQ];
}
const vQ = /* @__PURE__ */ new V();
function Jo(n, e, t) {
  let i = n.prop(e < 0 ? V.openedBy : V.closedBy);
  if (i)
    return i;
  if (n.name.length == 1) {
    let s = t.indexOf(n.name);
    if (s > -1 && s % 2 == (e < 0 ? 1 : 0))
      return [t[s + e]];
  }
  return null;
}
function eO(n) {
  let e = n.type.prop(vQ);
  return e ? e(n.node) : n;
}
function pt(n, e, t, i = {}) {
  let s = i.maxScanDistance || vf, r = i.brackets || Tf, o = oe(n), O = o.resolveInner(e, t);
  for (let a = O; a; a = a.parent) {
    let l = Jo(a.type, t, r);
    if (l && a.from < a.to) {
      let h = eO(a);
      if (h && (t > 0 ? e >= h.from && e < h.to : e > h.from && e <= h.to))
        return TQ(n, e, t, a, h, l, r);
    }
  }
  return UQ(n, e, t, o, O.type, s, r);
}
function TQ(n, e, t, i, s, r, o) {
  let O = i.parent, a = { from: s.from, to: s.to }, l = 0, h = O == null ? void 0 : O.cursor();
  if (h && (t < 0 ? h.childBefore(i.from) : h.childAfter(i.to)))
    do
      if (t < 0 ? h.to <= i.from : h.from >= i.to) {
        if (l == 0 && r.indexOf(h.type.name) > -1 && h.from < h.to) {
          let c = eO(h);
          return { start: a, end: c ? { from: c.from, to: c.to } : void 0, matched: !0 };
        } else if (Jo(h.type, t, o))
          l++;
        else if (Jo(h.type, -t, o)) {
          if (l == 0) {
            let c = eO(h);
            return {
              start: a,
              end: c && c.from < c.to ? { from: c.from, to: c.to } : void 0,
              matched: !1
            };
          }
          l--;
        }
      }
    while (t < 0 ? h.prevSibling() : h.nextSibling());
  return { start: a, matched: !1 };
}
function UQ(n, e, t, i, s, r, o) {
  if (t < 0 ? !e : e == n.doc.length)
    return null;
  let O = t < 0 ? n.sliceDoc(e - 1, e) : n.sliceDoc(e, e + 1), a = o.indexOf(O);
  if (a < 0 || a % 2 == 0 != t > 0)
    return null;
  let l = { from: t < 0 ? e - 1 : e, to: t > 0 ? e + 1 : e }, h = n.doc.iterRange(e, t > 0 ? n.doc.length : 0), c = 0;
  for (let f = 0; !h.next().done && f <= r; ) {
    let u = h.value;
    t < 0 && (f += u.length);
    let d = e + f * t;
    for (let m = t > 0 ? 0 : u.length - 1, g = t > 0 ? u.length : -1; m != g; m += t) {
      let Q = o.indexOf(u[m]);
      if (!(Q < 0 || i.resolveInner(d + m, 1).type != s))
        if (Q % 2 == 0 == t > 0)
          c++;
        else {
          if (c == 1)
            return { start: l, end: { from: d + m, to: d + m + 1 }, matched: Q >> 1 == a >> 1 };
          c--;
        }
    }
    t > 0 && (f += u.length);
  }
  return h.done ? { start: l, matched: !1 } : null;
}
const YQ = /* @__PURE__ */ Object.create(null), Rl = [Re.none], _l = [], ql = /* @__PURE__ */ Object.create(null), RQ = /* @__PURE__ */ Object.create(null);
for (let [n, e] of [
  ["variable", "variableName"],
  ["variable-2", "variableName.special"],
  ["string-2", "string.special"],
  ["def", "variableName.definition"],
  ["tag", "tagName"],
  ["attribute", "attributeName"],
  ["type", "typeName"],
  ["builtin", "variableName.standard"],
  ["qualifier", "modifier"],
  ["error", "invalid"],
  ["header", "heading"],
  ["property", "propertyName"]
])
  RQ[n] = /* @__PURE__ */ _Q(YQ, e);
function Kr(n, e) {
  _l.indexOf(n) > -1 || (_l.push(n), console.warn(e));
}
function _Q(n, e) {
  let t = [];
  for (let O of e.split(" ")) {
    let a = [];
    for (let l of O.split(".")) {
      let h = n[l] || p[l];
      h ? typeof h == "function" ? a.length ? a = a.map(h) : Kr(l, `Modifier ${l} used at start of tag`) : a.length ? Kr(l, `Tag ${l} used as modifier`) : a = Array.isArray(h) ? h : [h] : Kr(l, `Unknown highlighting tag ${l}`);
    }
    for (let l of a)
      t.push(l);
  }
  if (!t.length)
    return 0;
  let i = e.replace(/ /g, "_"), s = i + " " + t.map((O) => O.id), r = ql[s];
  if (r)
    return r.id;
  let o = ql[s] = Re.define({
    id: Rl.length,
    name: i,
    props: [mr({ [i]: t })]
  });
  return Rl.push(o), o.id;
}
I.RTL, I.LTR;
const qQ = (n) => {
  let { state: e } = n, t = e.doc.lineAt(e.selection.main.from), i = FO(n.state, t.from);
  return i.line ? VQ(n) : i.block ? CQ(n) : !1;
};
function NO(n, e) {
  return ({ state: t, dispatch: i }) => {
    if (t.readOnly)
      return !1;
    let s = n(e, t);
    return s ? (i(t.update(s)), !0) : !1;
  };
}
const VQ = /* @__PURE__ */ NO(
  AQ,
  0
  /* CommentOption.Toggle */
), zQ = /* @__PURE__ */ NO(
  Yf,
  0
  /* CommentOption.Toggle */
), CQ = /* @__PURE__ */ NO(
  (n, e) => Yf(n, e, jQ(e)),
  0
  /* CommentOption.Toggle */
);
function FO(n, e) {
  let t = n.languageDataAt("commentTokens", e, 1);
  return t.length ? t[0] : {};
}
const en = 50;
function WQ(n, { open: e, close: t }, i, s) {
  let r = n.sliceDoc(i - en, i), o = n.sliceDoc(s, s + en), O = /\s*$/.exec(r)[0].length, a = /^\s*/.exec(o)[0].length, l = r.length - O;
  if (r.slice(l - e.length, l) == e && o.slice(a, a + t.length) == t)
    return {
      open: { pos: i - O, margin: O && 1 },
      close: { pos: s + a, margin: a && 1 }
    };
  let h, c;
  s - i <= 2 * en ? h = c = n.sliceDoc(i, s) : (h = n.sliceDoc(i, i + en), c = n.sliceDoc(s - en, s));
  let f = /^\s*/.exec(h)[0].length, u = /\s*$/.exec(c)[0].length, d = c.length - u - t.length;
  return h.slice(f, f + e.length) == e && c.slice(d, d + t.length) == t ? {
    open: {
      pos: i + f + e.length,
      margin: /\s/.test(h.charAt(f + e.length)) ? 1 : 0
    },
    close: {
      pos: s - u - t.length,
      margin: /\s/.test(c.charAt(d - 1)) ? 1 : 0
    }
  } : null;
}
function jQ(n) {
  let e = [];
  for (let t of n.selection.ranges) {
    let i = n.doc.lineAt(t.from), s = t.to <= i.to ? i : n.doc.lineAt(t.to);
    s.from > i.from && s.from == t.to && (s = t.to == i.to + 1 ? i : n.doc.lineAt(t.to - 1));
    let r = e.length - 1;
    r >= 0 && e[r].to > i.from ? e[r].to = s.to : e.push({ from: i.from + /^\s*/.exec(i.text)[0].length, to: s.to });
  }
  return e;
}
function Yf(n, e, t = e.selection.ranges) {
  let i = t.map((r) => FO(e, r.from).block);
  if (!i.every((r) => r))
    return null;
  let s = t.map((r, o) => WQ(e, i[o], r.from, r.to));
  if (n != 2 && !s.every((r) => r))
    return { changes: e.changes(t.map((r, o) => s[o] ? [] : [{ from: r.from, insert: i[o].open + " " }, { from: r.to, insert: " " + i[o].close }])) };
  if (n != 1 && s.some((r) => r)) {
    let r = [];
    for (let o = 0, O; o < s.length; o++)
      if (O = s[o]) {
        let a = i[o], { open: l, close: h } = O;
        r.push({ from: l.pos - a.open.length, to: l.pos + l.margin }, { from: h.pos - h.margin, to: h.pos + a.close.length });
      }
    return { changes: r };
  }
  return null;
}
function AQ(n, e, t = e.selection.ranges) {
  let i = [], s = -1;
  e: for (let { from: r, to: o } of t) {
    let O = i.length, a = 1e9, l;
    for (let h = r; h <= o; ) {
      let c = e.doc.lineAt(h);
      if (l == null && (l = FO(e, c.from).line, !l))
        continue e;
      if (c.from > s && (r == o || o > c.from)) {
        s = c.from;
        let f = /^\s*/.exec(c.text)[0].length, u = f == c.length, d = c.text.slice(f, f + l.length) == l ? f : -1;
        f < c.text.length && f < a && (a = f), i.push({ line: c, comment: d, token: l, indent: f, empty: u, single: !1 });
      }
      h = c.to + 1;
    }
    if (a < 1e9)
      for (let h = O; h < i.length; h++)
        i[h].indent < i[h].line.text.length && (i[h].indent = a);
    i.length == O + 1 && (i[O].single = !0);
  }
  if (n != 2 && i.some((r) => r.comment < 0 && (!r.empty || r.single))) {
    let r = [];
    for (let { line: O, token: a, indent: l, empty: h, single: c } of i)
      (c || !h) && r.push({ from: O.from + l, insert: a + " " });
    let o = e.changes(r);
    return { changes: o, selection: e.selection.map(o, 1) };
  } else if (n != 1 && i.some((r) => r.comment >= 0)) {
    let r = [];
    for (let { line: o, comment: O, token: a } of i)
      if (O >= 0) {
        let l = o.from + O, h = l + a.length;
        o.text[h - o.from] == " " && h++, r.push({ from: l, to: h });
      }
    return { changes: r };
  }
  return null;
}
const tO = /* @__PURE__ */ vt.define(), EQ = /* @__PURE__ */ vt.define(), MQ = /* @__PURE__ */ v.define(), Rf = /* @__PURE__ */ v.define({
  combine(n) {
    return $t(n, {
      minDepth: 100,
      newGroupDelay: 500,
      joinToEvent: (e, t) => t
    }, {
      minDepth: Math.max,
      newGroupDelay: Math.min,
      joinToEvent: (e, t) => (i, s) => e(i, s) || t(i, s)
    });
  }
}), _f = /* @__PURE__ */ me.define({
  create() {
    return mt.empty;
  },
  update(n, e) {
    let t = e.state.facet(Rf), i = e.annotation(tO);
    if (i) {
      let a = Ue.fromTransaction(e, i.selection), l = i.side, h = l == 0 ? n.undone : n.done;
      return a ? h = Ls(h, h.length, t.minDepth, a) : h = zf(h, e.startState.selection), new mt(l == 0 ? i.rest : h, l == 0 ? h : i.rest);
    }
    let s = e.annotation(EQ);
    if ((s == "full" || s == "before") && (n = n.isolate()), e.annotation(ne.addToHistory) === !1)
      return e.changes.empty ? n : n.addMapping(e.changes.desc);
    let r = Ue.fromTransaction(e), o = e.annotation(ne.time), O = e.annotation(ne.userEvent);
    return r ? n = n.addChanges(r, o, O, t, e) : e.selection && (n = n.addSelection(e.startState.selection, o, O, t.newGroupDelay)), (s == "full" || s == "after") && (n = n.isolate()), n;
  },
  toJSON(n) {
    return { done: n.done.map((e) => e.toJSON()), undone: n.undone.map((e) => e.toJSON()) };
  },
  fromJSON(n) {
    return new mt(n.done.map(Ue.fromJSON), n.undone.map(Ue.fromJSON));
  }
});
function GQ(n = {}) {
  return [
    _f,
    Rf.of(n),
    Z.domEventHandlers({
      beforeinput(e, t) {
        let i = e.inputType == "historyUndo" ? qf : e.inputType == "historyRedo" ? iO : null;
        return i ? (e.preventDefault(), i(t)) : !1;
      }
    })
  ];
}
function xr(n, e) {
  return function({ state: t, dispatch: i }) {
    if (!e && t.readOnly)
      return !1;
    let s = t.field(_f, !1);
    if (!s)
      return !1;
    let r = s.pop(n, t, e);
    return r ? (i(r), !0) : !1;
  };
}
const qf = /* @__PURE__ */ xr(0, !1), iO = /* @__PURE__ */ xr(1, !1), LQ = /* @__PURE__ */ xr(0, !0), DQ = /* @__PURE__ */ xr(1, !0);
class Ue {
  constructor(e, t, i, s, r) {
    this.changes = e, this.effects = t, this.mapped = i, this.startSelection = s, this.selectionsAfter = r;
  }
  setSelAfter(e) {
    return new Ue(this.changes, this.effects, this.mapped, this.startSelection, e);
  }
  toJSON() {
    var e, t, i;
    return {
      changes: (e = this.changes) === null || e === void 0 ? void 0 : e.toJSON(),
      mapped: (t = this.mapped) === null || t === void 0 ? void 0 : t.toJSON(),
      startSelection: (i = this.startSelection) === null || i === void 0 ? void 0 : i.toJSON(),
      selectionsAfter: this.selectionsAfter.map((s) => s.toJSON())
    };
  }
  static fromJSON(e) {
    return new Ue(e.changes && se.fromJSON(e.changes), [], e.mapped && gt.fromJSON(e.mapped), e.startSelection && $.fromJSON(e.startSelection), e.selectionsAfter.map($.fromJSON));
  }
  // This does not check `addToHistory` and such, it assumes the
  // transaction needs to be converted to an item. Returns null when
  // there are no changes or effects in the transaction.
  static fromTransaction(e, t) {
    let i = Ge;
    for (let s of e.startState.facet(MQ)) {
      let r = s(e);
      r.length && (i = i.concat(r));
    }
    return !i.length && e.changes.empty ? null : new Ue(e.changes.invert(e.startState.doc), i, void 0, t || e.startState.selection, Ge);
  }
  static selection(e) {
    return new Ue(void 0, Ge, void 0, void 0, e);
  }
}
function Ls(n, e, t, i) {
  let s = e + 1 > t + 20 ? e - t - 1 : 0, r = n.slice(s, e);
  return r.push(i), r;
}
function IQ(n, e) {
  let t = [], i = !1;
  return n.iterChangedRanges((s, r) => t.push(s, r)), e.iterChangedRanges((s, r, o, O) => {
    for (let a = 0; a < t.length; ) {
      let l = t[a++], h = t[a++];
      O >= l && o <= h && (i = !0);
    }
  }), i;
}
function BQ(n, e) {
  return n.ranges.length == e.ranges.length && n.ranges.filter((t, i) => t.empty != e.ranges[i].empty).length === 0;
}
function Vf(n, e) {
  return n.length ? e.length ? n.concat(e) : n : e;
}
const Ge = [], NQ = 200;
function zf(n, e) {
  if (n.length) {
    let t = n[n.length - 1], i = t.selectionsAfter.slice(Math.max(0, t.selectionsAfter.length - NQ));
    return i.length && i[i.length - 1].eq(e) ? n : (i.push(e), Ls(n, n.length - 1, 1e9, t.setSelAfter(i)));
  } else
    return [Ue.selection([e])];
}
function FQ(n) {
  let e = n[n.length - 1], t = n.slice();
  return t[n.length - 1] = e.setSelAfter(e.selectionsAfter.slice(0, e.selectionsAfter.length - 1)), t;
}
function Jr(n, e) {
  if (!n.length)
    return n;
  let t = n.length, i = Ge;
  for (; t; ) {
    let s = HQ(n[t - 1], e, i);
    if (s.changes && !s.changes.empty || s.effects.length) {
      let r = n.slice(0, t);
      return r[t - 1] = s, r;
    } else
      e = s.mapped, t--, i = s.selectionsAfter;
  }
  return i.length ? [Ue.selection(i)] : Ge;
}
function HQ(n, e, t) {
  let i = Vf(n.selectionsAfter.length ? n.selectionsAfter.map((O) => O.map(e)) : Ge, t);
  if (!n.changes)
    return Ue.selection(i);
  let s = n.changes.map(e), r = e.mapDesc(n.changes, !0), o = n.mapped ? n.mapped.composeDesc(r) : r;
  return new Ue(s, q.mapEffects(n.effects, e), o, n.startSelection.map(r), i);
}
const KQ = /^(input\.type|delete)($|\.)/;
class mt {
  constructor(e, t, i = 0, s = void 0) {
    this.done = e, this.undone = t, this.prevTime = i, this.prevUserEvent = s;
  }
  isolate() {
    return this.prevTime ? new mt(this.done, this.undone) : this;
  }
  addChanges(e, t, i, s, r) {
    let o = this.done, O = o[o.length - 1];
    return O && O.changes && !O.changes.empty && e.changes && (!i || KQ.test(i)) && (!O.selectionsAfter.length && t - this.prevTime < s.newGroupDelay && s.joinToEvent(r, IQ(O.changes, e.changes)) || // For compose (but not compose.start) events, always join with previous event
    i == "input.type.compose") ? o = Ls(o, o.length - 1, s.minDepth, new Ue(e.changes.compose(O.changes), Vf(q.mapEffects(e.effects, O.changes), O.effects), O.mapped, O.startSelection, Ge)) : o = Ls(o, o.length, s.minDepth, e), new mt(o, Ge, t, i);
  }
  addSelection(e, t, i, s) {
    let r = this.done.length ? this.done[this.done.length - 1].selectionsAfter : Ge;
    return r.length > 0 && t - this.prevTime < s && i == this.prevUserEvent && i && /^select($|\.)/.test(i) && BQ(r[r.length - 1], e) ? this : new mt(zf(this.done, e), this.undone, t, i);
  }
  addMapping(e) {
    return new mt(Jr(this.done, e), Jr(this.undone, e), this.prevTime, this.prevUserEvent);
  }
  pop(e, t, i) {
    let s = e == 0 ? this.done : this.undone;
    if (s.length == 0)
      return null;
    let r = s[s.length - 1], o = r.selectionsAfter[0] || (r.startSelection ? r.startSelection.map(r.changes.invertedDesc, 1) : t.selection);
    if (i && r.selectionsAfter.length)
      return t.update({
        selection: r.selectionsAfter[r.selectionsAfter.length - 1],
        annotations: tO.of({ side: e, rest: FQ(s), selection: o }),
        userEvent: e == 0 ? "select.undo" : "select.redo",
        scrollIntoView: !0
      });
    if (r.changes) {
      let O = s.length == 1 ? Ge : s.slice(0, s.length - 1);
      return r.mapped && (O = Jr(O, r.mapped)), t.update({
        changes: r.changes,
        selection: r.startSelection,
        effects: r.effects,
        annotations: tO.of({ side: e, rest: O, selection: o }),
        filter: !1,
        userEvent: e == 0 ? "undo" : "redo",
        scrollIntoView: !0
      });
    } else
      return null;
  }
}
mt.empty = /* @__PURE__ */ new mt(Ge, Ge);
const JQ = [
  { key: "Mod-z", run: qf, preventDefault: !0 },
  { key: "Mod-y", mac: "Mod-Shift-z", run: iO, preventDefault: !0 },
  { linux: "Ctrl-Shift-z", run: iO, preventDefault: !0 },
  { key: "Mod-u", run: LQ, preventDefault: !0 },
  { key: "Alt-u", mac: "Mod-Shift-u", run: DQ, preventDefault: !0 }
];
function Ii(n, e) {
  return $.create(n.ranges.map(e), n.mainIndex);
}
function et(n, e) {
  return n.update({ selection: e, scrollIntoView: !0, userEvent: "select" });
}
function tt({ state: n, dispatch: e }, t) {
  let i = Ii(n.selection, t);
  return i.eq(n.selection, !0) ? !1 : (e(et(n, i)), !0);
}
function Xr(n, e) {
  return $.cursor(e ? n.to : n.from);
}
function Cf(n, e) {
  return tt(n, (t) => t.empty ? n.moveByChar(t, e) : Xr(t, e));
}
function Se(n) {
  return n.textDirectionAt(n.state.selection.main.head) == I.LTR;
}
const Wf = (n) => Cf(n, !Se(n)), jf = (n) => Cf(n, Se(n));
function Af(n, e) {
  return tt(n, (t) => t.empty ? n.moveByGroup(t, e) : Xr(t, e));
}
const e$ = (n) => Af(n, !Se(n)), t$ = (n) => Af(n, Se(n));
function i$(n, e, t) {
  if (e.type.prop(t))
    return !0;
  let i = e.to - e.from;
  return i && (i > 2 || /[^\s,.;:]/.test(n.sliceDoc(e.from, e.to))) || e.firstChild;
}
function br(n, e, t) {
  let i = oe(n).resolveInner(e.head), s = t ? V.closedBy : V.openedBy;
  for (let a = e.head; ; ) {
    let l = t ? i.childAfter(a) : i.childBefore(a);
    if (!l)
      break;
    i$(n, l, s) ? i = l : a = t ? l.to : l.from;
  }
  let r = i.type.prop(s), o, O;
  return r && (o = t ? pt(n, i.from, 1) : pt(n, i.to, -1)) && o.matched ? O = t ? o.end.to : o.end.from : O = t ? i.to : i.from, $.cursor(O, t ? -1 : 1);
}
const n$ = (n) => tt(n, (e) => br(n.state, e, !Se(n))), s$ = (n) => tt(n, (e) => br(n.state, e, Se(n)));
function Ef(n, e) {
  return tt(n, (t) => {
    if (!t.empty)
      return Xr(t, e);
    let i = n.moveVertically(t, e);
    return i.head != t.head ? i : n.moveToLineBoundary(t, e);
  });
}
const Mf = (n) => Ef(n, !1), Gf = (n) => Ef(n, !0);
function Lf(n) {
  let e = n.scrollDOM.clientHeight < n.scrollDOM.scrollHeight - 2, t = 0, i = 0, s;
  if (e) {
    for (let r of n.state.facet(Z.scrollMargins)) {
      let o = r(n);
      o != null && o.top && (t = Math.max(o == null ? void 0 : o.top, t)), o != null && o.bottom && (i = Math.max(o == null ? void 0 : o.bottom, i));
    }
    s = n.scrollDOM.clientHeight - t - i;
  } else
    s = (n.dom.ownerDocument.defaultView || window).innerHeight;
  return {
    marginTop: t,
    marginBottom: i,
    selfScroll: e,
    height: Math.max(n.defaultLineHeight, s - 5)
  };
}
function Df(n, e) {
  let t = Lf(n), { state: i } = n, s = Ii(i.selection, (o) => o.empty ? n.moveVertically(o, e, t.height) : Xr(o, e));
  if (s.eq(i.selection))
    return !1;
  let r;
  if (t.selfScroll) {
    let o = n.coordsAtPos(i.selection.main.head), O = n.scrollDOM.getBoundingClientRect(), a = O.top + t.marginTop, l = O.bottom - t.marginBottom;
    o && o.top > a && o.bottom < l && (r = Z.scrollIntoView(s.main.head, { y: "start", yMargin: o.top - a }));
  }
  return n.dispatch(et(i, s), { effects: r }), !0;
}
const Vl = (n) => Df(n, !1), nO = (n) => Df(n, !0);
function Bt(n, e, t) {
  let i = n.lineBlockAt(e.head), s = n.moveToLineBoundary(e, t);
  if (s.head == e.head && s.head != (t ? i.to : i.from) && (s = n.moveToLineBoundary(e, t, !1)), !t && s.head == i.from && i.length) {
    let r = /^\s*/.exec(n.state.sliceDoc(i.from, Math.min(i.from + 100, i.to)))[0].length;
    r && e.head != i.from + r && (s = $.cursor(i.from + r));
  }
  return s;
}
const r$ = (n) => tt(n, (e) => Bt(n, e, !0)), o$ = (n) => tt(n, (e) => Bt(n, e, !1)), O$ = (n) => tt(n, (e) => Bt(n, e, !Se(n))), a$ = (n) => tt(n, (e) => Bt(n, e, Se(n))), l$ = (n) => tt(n, (e) => $.cursor(n.lineBlockAt(e.head).from, 1)), h$ = (n) => tt(n, (e) => $.cursor(n.lineBlockAt(e.head).to, -1));
function c$(n, e, t) {
  let i = !1, s = Ii(n.selection, (r) => {
    let o = pt(n, r.head, -1) || pt(n, r.head, 1) || r.head > 0 && pt(n, r.head - 1, 1) || r.head < n.doc.length && pt(n, r.head + 1, -1);
    if (!o || !o.end)
      return r;
    i = !0;
    let O = o.start.from == r.head ? o.end.to : o.end.from;
    return $.cursor(O);
  });
  return i ? (e(et(n, s)), !0) : !1;
}
const f$ = ({ state: n, dispatch: e }) => c$(n, e);
function De(n, e, t) {
  let i = Ii(n.state.selection, (s) => {
    s.undirectional && s.head >= s.anchor != e && (s = $.range(s.head, s.anchor));
    let r = t(s);
    return $.range(s.anchor, r.head, r.goalColumn, r.bidiLevel || void 0, r.assoc);
  });
  return i.eq(n.state.selection) ? !1 : (n.dispatch(et(n.state, i)), !0);
}
function If(n, e) {
  return De(n, e, (t) => n.moveByChar(t, e));
}
const Bf = (n) => If(n, !Se(n)), Nf = (n) => If(n, Se(n));
function Ff(n, e) {
  return De(n, e, (t) => n.moveByGroup(t, e));
}
const u$ = (n) => Ff(n, !Se(n)), d$ = (n) => Ff(n, Se(n)), p$ = (n) => {
  let e = !Se(n);
  return De(n, e, (t) => br(n.state, t, e));
}, m$ = (n) => {
  let e = Se(n);
  return De(n, e, (t) => br(n.state, t, e));
};
function Hf(n, e) {
  return De(n, e, (t) => n.moveVertically(t, e));
}
const Kf = (n) => Hf(n, !1), Jf = (n) => Hf(n, !0);
function eu(n, e) {
  return De(n, e, (t) => n.moveVertically(t, e, Lf(n).height));
}
const zl = (n) => eu(n, !1), Cl = (n) => eu(n, !0), g$ = (n) => De(n, !0, (e) => Bt(n, e, !0)), Q$ = (n) => De(n, !1, (e) => Bt(n, e, !1)), $$ = (n) => {
  let e = !Se(n);
  return De(n, e, (t) => Bt(n, t, e));
}, P$ = (n) => {
  let e = Se(n);
  return De(n, e, (t) => Bt(n, t, e));
}, S$ = (n) => De(n, !1, (e) => $.cursor(n.lineBlockAt(e.head).from)), x$ = (n) => De(n, !0, (e) => $.cursor(n.lineBlockAt(e.head).to)), Wl = ({ state: n, dispatch: e }) => (e(et(n, { anchor: 0 })), !0), jl = ({ state: n, dispatch: e }) => (e(et(n, { anchor: n.doc.length })), !0), Al = ({ state: n, dispatch: e }) => (e(et(n, { anchor: n.selection.main.anchor, head: 0 })), !0), El = ({ state: n, dispatch: e }) => (e(et(n, { anchor: n.selection.main.anchor, head: n.doc.length })), !0), X$ = ({ state: n, dispatch: e }) => (e(n.update({ selection: { anchor: 0, head: n.doc.length }, userEvent: "select" })), !0), b$ = ({ state: n, dispatch: e }) => {
  let t = yr(n).map(({ from: i, to: s }) => $.undirectionalRange(i, Math.min(s + 1, n.doc.length)));
  return e(n.update({ selection: $.create(t), userEvent: "select" })), !0;
}, y$ = ({ state: n, dispatch: e }) => {
  let t = Ii(n.selection, (i) => {
    let s = oe(n), r = s.resolveStack(i.from, 1);
    if (i.empty) {
      let o = s.resolveStack(i.from, -1);
      o.node.from >= r.node.from && o.node.to <= r.node.to && (r = o);
    }
    for (let o = r; o; o = o.next) {
      let { node: O } = o;
      if ((O.from < i.from && O.to >= i.to || O.to > i.to && O.from <= i.from) && o.next)
        return $.undirectionalRange(O.from, O.to);
    }
    return i;
  });
  return t.eq(n.selection) ? !1 : (e(et(n, t)), !0);
};
function tu(n, e) {
  let { state: t } = n, i = t.selection, s = t.selection.ranges.slice();
  for (let r of t.selection.ranges) {
    let o = t.doc.lineAt(r.head);
    if (e ? o.to < n.state.doc.length : o.from > 0)
      for (let O = r; ; ) {
        let a = n.moveVertically(O, e);
        if (a.head < o.from || a.head > o.to) {
          s.some((l) => l.head == a.head) || s.push(a);
          break;
        } else {
          if (a.head == O.head)
            break;
          O = a;
        }
      }
  }
  return s.length == i.ranges.length ? !1 : (n.dispatch(et(t, $.create(s, s.length - 1))), !0);
}
const w$ = (n) => tu(n, !1), k$ = (n) => tu(n, !0), Z$ = ({ state: n, dispatch: e }) => {
  let t = n.selection, i = null;
  return t.ranges.length > 1 ? i = $.create([t.main]) : t.main.empty || (i = $.create([$.cursor(t.main.head)])), i ? (e(et(n, i)), !0) : !1;
};
function En(n, e) {
  if (n.state.readOnly)
    return !1;
  let t = "delete.selection", { state: i } = n, s = i.changeByRange((r) => {
    let { from: o, to: O } = r;
    if (o == O) {
      let a = e(r);
      a < o ? (t = "delete.backward", a = cs(n, a, !1)) : a > o && (t = "delete.forward", a = cs(n, a, !0)), o = Math.min(o, a), O = Math.max(O, a);
    } else
      o = cs(n, o, !1), O = cs(n, O, !0);
    return o == O ? { range: r } : { changes: { from: o, to: O }, range: $.cursor(o, o < r.head ? -1 : 1) };
  });
  return s.changes.empty ? !1 : (n.dispatch(i.update(s, {
    scrollIntoView: !0,
    userEvent: t,
    effects: t == "delete.selection" ? Z.announce.of(i.phrase("Selection deleted")) : void 0
  })), !0);
}
function cs(n, e, t) {
  if (n instanceof Z)
    for (let i of n.state.facet(Z.atomicRanges).map((s) => s(n)))
      i.between(e, e, (s, r) => {
        s < e && r > e && (e = t ? r : s);
      });
  return e;
}
const iu = (n, e, t) => En(n, (i) => {
  let s = i.from, { state: r } = n, o = r.doc.lineAt(s), O, a;
  if (t && !e && s > o.from && s < o.from + 200 && !/[^ \t]/.test(O = o.text.slice(0, s - o.from))) {
    if (O[O.length - 1] == "	")
      return s - 1;
    let l = Di(O, r.tabSize), h = l % Es(r) || Es(r);
    for (let c = 0; c < h && O[O.length - 1 - c] == " "; c++)
      s--;
    a = s;
  } else
    a = le(o.text, s - o.from, e, e) + o.from, a == s && o.number != (e ? r.doc.lines : 1) ? a += e ? 1 : -1 : !e && /[\ufe00-\ufe0f]/.test(o.text.slice(a - o.from, s - o.from)) && (a = le(o.text, a - o.from, !1, !1) + o.from);
  return a;
}), sO = (n) => iu(n, !1, !0), nu = (n) => iu(n, !0, !1), su = (n, e) => En(n, (t) => {
  let i = t.head, { state: s } = n, r = s.doc.lineAt(i), o = s.charCategorizer(i);
  for (let O = null; ; ) {
    if (i == (e ? r.to : r.from)) {
      i == t.head && r.number != (e ? s.doc.lines : 1) && (i += e ? 1 : -1);
      break;
    }
    let a = le(r.text, i - r.from, e) + r.from, l = r.text.slice(Math.min(i, a) - r.from, Math.max(i, a) - r.from), h = o(l);
    if (O != null && h != O)
      break;
    (l != " " || i != t.head) && (O = h), i = a;
  }
  return i;
}), ru = (n) => su(n, !1), v$ = (n) => su(n, !0), T$ = (n) => En(n, (e) => {
  let t = n.lineBlockAt(e.head).to;
  return e.head < t ? t : Math.min(n.state.doc.length, e.head + 1);
}), U$ = (n) => En(n, (e) => {
  let t = n.moveToLineBoundary(e, !1).head;
  return e.head > t ? t : Math.max(0, e.head - 1);
}), Y$ = (n) => En(n, (e) => {
  let t = n.moveToLineBoundary(e, !0).head;
  return e.head < t ? t : Math.min(n.state.doc.length, e.head + 1);
}), R$ = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = n.changeByRange((i) => ({
    changes: { from: i.from, to: i.to, insert: j.of(["", ""]) },
    range: $.cursor(i.from)
  }));
  return e(n.update(t, { scrollIntoView: !0, userEvent: "input" })), !0;
}, _$ = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = n.changeByRange((i) => {
    if (!i.empty || i.from == 0 || i.from == n.doc.length)
      return { range: i };
    let s = i.from, r = n.doc.lineAt(s), o = s == r.from ? s - 1 : le(r.text, s - r.from, !1) + r.from, O = s == r.to ? s + 1 : le(r.text, s - r.from, !0) + r.from;
    return {
      changes: { from: o, to: O, insert: n.doc.slice(s, O).append(n.doc.slice(o, s)) },
      range: $.cursor(O)
    };
  });
  return t.changes.empty ? !1 : (e(n.update(t, { scrollIntoView: !0, userEvent: "move.character" })), !0);
};
function yr(n) {
  let e = [], t = -1;
  for (let i of n.selection.ranges) {
    let s = n.doc.lineAt(i.from), r = n.doc.lineAt(i.to);
    if (!i.empty && i.to == r.from && (r = n.doc.lineAt(i.to - 1)), t >= s.number) {
      let o = e[e.length - 1];
      o.to = r.to, o.ranges.push(i);
    } else
      e.push({ from: s.from, to: r.to, ranges: [i] });
    t = r.number + 1;
  }
  return e;
}
function ou(n, e, t) {
  if (n.readOnly)
    return !1;
  let i = [], s = [];
  for (let r of yr(n)) {
    if (t ? r.to == n.doc.length : r.from == 0)
      continue;
    let o = n.doc.lineAt(t ? r.to + 1 : r.from - 1), O = o.length + 1;
    if (t) {
      i.push({ from: r.to, to: o.to }, { from: r.from, insert: o.text + n.lineBreak });
      for (let a of r.ranges)
        s.push($.range(Math.min(n.doc.length, a.anchor + O), Math.min(n.doc.length, a.head + O)));
    } else {
      i.push({ from: o.from, to: r.from }, { from: r.to, insert: n.lineBreak + o.text });
      for (let a of r.ranges)
        s.push($.range(a.anchor - O, a.head - O));
    }
  }
  return i.length ? (e(n.update({
    changes: i,
    scrollIntoView: !0,
    selection: $.create(s, n.selection.mainIndex),
    userEvent: "move.line"
  })), !0) : !1;
}
const q$ = ({ state: n, dispatch: e }) => ou(n, e, !1), V$ = ({ state: n, dispatch: e }) => ou(n, e, !0);
function Ou(n, e, t) {
  if (n.readOnly)
    return !1;
  let i = [];
  for (let r of yr(n))
    t ? i.push({ from: r.from, insert: n.doc.slice(r.from, r.to) + n.lineBreak }) : i.push({ from: r.to, insert: n.lineBreak + n.doc.slice(r.from, r.to) });
  let s = n.changes(i);
  return e(n.update({
    changes: s,
    selection: n.selection.map(s, t ? 1 : -1),
    scrollIntoView: !0,
    userEvent: "input.copyline"
  })), !0;
}
const z$ = ({ state: n, dispatch: e }) => Ou(n, e, !1), C$ = ({ state: n, dispatch: e }) => Ou(n, e, !0), W$ = (n) => {
  if (n.state.readOnly)
    return !1;
  let { state: e } = n, t = e.changes(yr(e).map(({ from: s, to: r }) => (s > 0 ? s-- : r < e.doc.length && r++, { from: s, to: r }))), i = Ii(e.selection, (s) => {
    let r;
    if (n.lineWrapping) {
      let o = n.lineBlockAt(s.head), O = n.coordsAtPos(s.head, s.assoc || 1);
      O && (r = o.bottom + n.documentTop - O.bottom + n.defaultLineHeight / 2);
    }
    return n.moveVertically(s, !0, r);
  }).map(t);
  return n.dispatch({ changes: t, selection: i, scrollIntoView: !0, userEvent: "delete.line" }), !0;
};
function j$(n, e) {
  if (/\(\)|\[\]|\{\}/.test(n.sliceDoc(e - 1, e + 1)))
    return { from: e, to: e };
  let t = oe(n).resolveInner(e), i = t.childBefore(e), s = t.childAfter(e), r;
  return i && s && i.to <= e && s.from >= e && (r = i.type.prop(V.closedBy)) && r.indexOf(s.name) > -1 && n.doc.lineAt(i.to).from == n.doc.lineAt(s.from).from && !/\S/.test(n.sliceDoc(i.to, s.from)) ? { from: i.to, to: s.from } : null;
}
const Ml = /* @__PURE__ */ au(!1), A$ = /* @__PURE__ */ au(!0);
function au(n) {
  return ({ state: e, dispatch: t }) => {
    if (e.readOnly)
      return !1;
    let i = e.changeByRange((s) => {
      let { from: r, to: o } = s, O = e.doc.lineAt(r), a = !n && r == o && j$(e, r);
      n && (r = o = (o <= O.to ? O : e.doc.lineAt(o)).to);
      let l = new Qr(e, { simulateBreak: r, simulateDoubleBreak: !!a }), h = GO(l, r);
      for (h == null && (h = Di(/^\s*/.exec(e.doc.lineAt(r).text)[0], e.tabSize)); o < O.to && /\s/.test(O.text[o - O.from]); )
        o++;
      a ? { from: r, to: o } = a : r > O.from && r < O.from + 100 && !/\S/.test(O.text.slice(0, r)) && (r = O.from);
      let c = ["", yn(e, h)];
      return a && c.push(yn(e, l.lineIndent(O.from, -1))), {
        changes: { from: r, to: o, insert: j.of(c) },
        range: $.cursor(r + 1 + c[1].length)
      };
    });
    return t(e.update(i, { scrollIntoView: !0, userEvent: "input" })), !0;
  };
}
function HO(n, e) {
  let t = -1;
  return n.changeByRange((i) => {
    let s = [];
    for (let o = i.from; o <= i.to; ) {
      let O = n.doc.lineAt(o);
      O.number > t && (i.empty || i.to > O.from) && (e(O, s, i), t = O.number), o = O.to + 1;
    }
    let r = n.changes(s);
    return {
      changes: s,
      range: $.range(r.mapPos(i.anchor, 1), r.mapPos(i.head, 1))
    };
  });
}
const E$ = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = /* @__PURE__ */ Object.create(null), i = new Qr(n, { overrideIndentation: (r) => {
    let o = t[r];
    return o ?? -1;
  } }), s = HO(n, (r, o, O) => {
    let a = GO(i, r.from);
    if (a == null)
      return;
    /\S/.test(r.text) || (a = 0);
    let l = /^\s*/.exec(r.text)[0], h = yn(n, a);
    (l != h || O.from < r.from + l.length) && (t[r.from] = a, o.push({ from: r.from, to: r.from + l.length, insert: h }));
  });
  return s.changes.empty || e(n.update(s, { userEvent: "indent" })), !0;
}, M$ = ({ state: n, dispatch: e }) => n.readOnly ? !1 : (e(n.update(HO(n, (t, i) => {
  i.push({ from: t.from, insert: n.facet(gr) });
}), { userEvent: "input.indent" })), !0), G$ = ({ state: n, dispatch: e }) => n.readOnly ? !1 : (e(n.update(HO(n, (t, i) => {
  let s = /^\s*/.exec(t.text)[0];
  if (!s)
    return;
  let r = Di(s, n.tabSize), o = 0, O = yn(n, Math.max(0, r - Es(n)));
  for (; o < s.length && o < O.length && s.charCodeAt(o) == O.charCodeAt(o); )
    o++;
  i.push({ from: t.from + o, to: t.from + s.length, insert: O.slice(o) });
}), { userEvent: "delete.dedent" })), !0), L$ = (n) => (n.setTabFocusMode(), !0), D$ = [
  { key: "Ctrl-b", run: Wf, shift: Bf, preventDefault: !0 },
  { key: "Ctrl-f", run: jf, shift: Nf },
  { key: "Ctrl-p", run: Mf, shift: Kf },
  { key: "Ctrl-n", run: Gf, shift: Jf },
  { key: "Ctrl-a", run: l$, shift: S$ },
  { key: "Ctrl-e", run: h$, shift: x$ },
  { key: "Ctrl-d", run: nu },
  { key: "Ctrl-h", run: sO },
  { key: "Ctrl-k", run: T$ },
  { key: "Ctrl-Alt-h", run: ru },
  { key: "Ctrl-o", run: R$ },
  { key: "Ctrl-t", run: _$ },
  { key: "Ctrl-v", run: nO }
], I$ = /* @__PURE__ */ [
  { key: "ArrowLeft", run: Wf, shift: Bf, preventDefault: !0 },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: e$, shift: u$, preventDefault: !0 },
  { mac: "Cmd-ArrowLeft", run: O$, shift: $$, preventDefault: !0 },
  { key: "ArrowRight", run: jf, shift: Nf, preventDefault: !0 },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: t$, shift: d$, preventDefault: !0 },
  { mac: "Cmd-ArrowRight", run: a$, shift: P$, preventDefault: !0 },
  { key: "ArrowUp", run: Mf, shift: Kf, preventDefault: !0 },
  { mac: "Cmd-ArrowUp", run: Wl, shift: Al },
  { mac: "Ctrl-ArrowUp", run: Vl, shift: zl },
  { key: "ArrowDown", run: Gf, shift: Jf, preventDefault: !0 },
  { mac: "Cmd-ArrowDown", run: jl, shift: El },
  { mac: "Ctrl-ArrowDown", run: nO, shift: Cl },
  { key: "PageUp", run: Vl, shift: zl },
  { key: "PageDown", run: nO, shift: Cl },
  { key: "Home", run: o$, shift: Q$, preventDefault: !0 },
  { key: "Mod-Home", run: Wl, shift: Al },
  { key: "End", run: r$, shift: g$, preventDefault: !0 },
  { key: "Mod-End", run: jl, shift: El },
  { key: "Enter", run: Ml, shift: Ml },
  { key: "Mod-a", run: X$ },
  { key: "Backspace", run: sO, shift: sO, preventDefault: !0 },
  { key: "Delete", run: nu, preventDefault: !0 },
  { key: "Mod-Backspace", mac: "Alt-Backspace", run: ru, preventDefault: !0 },
  { key: "Mod-Delete", mac: "Alt-Delete", run: v$, preventDefault: !0 },
  { mac: "Mod-Backspace", run: U$, preventDefault: !0 },
  { mac: "Mod-Delete", run: Y$, preventDefault: !0 }
].concat(/* @__PURE__ */ D$.map((n) => ({ mac: n.key, run: n.run, shift: n.shift }))), B$ = /* @__PURE__ */ [
  { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: n$, shift: p$ },
  { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: s$, shift: m$ },
  { key: "Alt-ArrowUp", run: q$ },
  { key: "Shift-Alt-ArrowUp", run: z$ },
  { key: "Alt-ArrowDown", run: V$ },
  { key: "Shift-Alt-ArrowDown", run: C$ },
  { key: "Mod-Alt-ArrowUp", run: w$ },
  { key: "Mod-Alt-ArrowDown", run: k$ },
  { key: "Escape", run: Z$ },
  { key: "Mod-Enter", run: A$ },
  { key: "Alt-l", mac: "Ctrl-l", run: b$ },
  { key: "Mod-i", run: y$, preventDefault: !0 },
  { key: "Mod-[", run: G$ },
  { key: "Mod-]", run: M$ },
  { key: "Mod-Alt-\\", run: E$ },
  { key: "Shift-Mod-k", run: W$ },
  { key: "Shift-Mod-\\", run: f$ },
  { key: "Mod-/", run: qQ },
  { key: "Alt-A", mac: "Ctrl-A", run: zQ },
  { key: "Ctrl-m", mac: "Shift-Alt-m", run: L$ }
].concat(I$), Gl = typeof String.prototype.normalize == "function" ? (n) => n.normalize("NFKD") : (n) => n;
class Ei {
  /**
  Create a text cursor. The query is the search string, `from` to
  `to` provides the region to search.
  
  When `normalize` is given, it will be called, on both the query
  string and the content it is matched against, before comparing.
  You can, for example, create a case-insensitive search by
  passing `s => s.toLowerCase()`.
  
  Text is always normalized with
  [`.normalize("NFKD")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
  (when supported).
  */
  constructor(e, t, i = 0, s = e.length, r, o) {
    this.test = o, this.value = { from: 0, to: 0, precise: !1 }, this.done = !1, this.matches = [], this.buffer = "", this.bufferPos = 0, this.iter = e.iterRange(i, s), this.bufferStart = i, this.normalize = r ? (O) => r(Gl(O)) : Gl, this.query = this.normalize(t);
  }
  peek() {
    if (this.bufferPos == this.buffer.length) {
      if (this.bufferStart += this.buffer.length, this.iter.next(), this.iter.done)
        return -1;
      this.bufferPos = 0, this.buffer = this.iter.value;
    }
    return ke(this.buffer, this.bufferPos);
  }
  /**
  Look for the next match. Updates the iterator's
  [`value`](https://codemirror.net/6/docs/ref/#search.SearchCursor.value) and
  [`done`](https://codemirror.net/6/docs/ref/#search.SearchCursor.done) properties. Should be called
  at least once before using the cursor.
  */
  next() {
    for (; this.matches.length; )
      this.matches.pop();
    return this.nextOverlapping();
  }
  /**
  The `next` method will ignore matches that partially overlap a
  previous match. This method behaves like `next`, but includes
  such matches.
  */
  nextOverlapping() {
    for (; ; ) {
      let e = this.peek();
      if (e < 0)
        return this.done = !0, this;
      let t = $O(e), i = this.bufferStart + this.bufferPos;
      this.bufferPos += ct(e);
      let s = this.normalize(t);
      if (s.length)
        for (let r = 0, o = i, O = !0; ; r++) {
          let a = s.charCodeAt(r), l = this.match(a, o, O, this.bufferPos + this.bufferStart, r == s.length - 1);
          if (l)
            return this.value = l, this;
          if (r == s.length - 1)
            break;
          O && r < t.length && t.charCodeAt(r) == a ? o++ : O = !1;
        }
    }
  }
  match(e, t, i, s, r) {
    let o = null;
    for (let O = 0; O < this.matches.length; ) {
      let a = this.matches[O], l = !1;
      this.query.charCodeAt(a.index) == e && (a.index == this.query.length - 1 ? o = { from: a.from, to: s, precise: r && a.precise } : (a.index++, l = !0)), l ? O++ : this.matches.splice(O, 1);
    }
    return this.query.charCodeAt(0) == e && (this.query.length == 1 ? o = { from: t, to: s, precise: i && r } : this.matches.push({ from: t, index: 1, precise: i })), o && this.test && !this.test(o.from, o.to, this.buffer, this.bufferStart) && (o = null), o;
  }
}
typeof Symbol < "u" && (Ei.prototype[Symbol.iterator] = function() {
  return this;
});
const lu = { from: -1, to: -1, match: /* @__PURE__ */ /.*/.exec(""), precise: !0 }, KO = "gm" + (/x/.unicode == null ? "" : "u");
class hu {
  /**
  Create a cursor that will search the given range in the given
  document. `query` should be the raw pattern (as you'd pass it to
  `new RegExp`).
  */
  constructor(e, t, i, s = 0, r = e.length) {
    if (this.text = e, this.to = r, this.curLine = "", this.done = !1, this.value = lu, /\\[sWDnr]|\n|\r|\[\^/.test(t))
      return new cu(e, t, i, s, r);
    this.re = new RegExp(t, KO + (i != null && i.ignoreCase ? "i" : "")), this.test = i == null ? void 0 : i.test, this.iter = e.iter();
    let o = e.lineAt(s);
    this.curLineStart = o.from, this.matchPos = Ds(e, s), this.getLine(this.curLineStart);
  }
  getLine(e) {
    this.iter.next(e), this.iter.lineBreak ? this.curLine = "" : (this.curLine = this.iter.value, this.curLineStart + this.curLine.length > this.to && (this.curLine = this.curLine.slice(0, this.to - this.curLineStart)), this.iter.next());
  }
  nextLine() {
    this.curLineStart = this.curLineStart + this.curLine.length + 1, this.curLineStart > this.to ? this.curLine = "" : this.getLine(0);
  }
  /**
  Move to the next match, if there is one.
  */
  next() {
    for (let e = this.matchPos - this.curLineStart; ; ) {
      this.re.lastIndex = e;
      let t = this.matchPos <= this.to && this.re.exec(this.curLine);
      if (t) {
        let i = this.curLineStart + t.index, s = i + t[0].length;
        if (this.matchPos = Ds(this.text, s + (i == s ? 1 : 0)), i == this.curLineStart + this.curLine.length && this.nextLine(), (i < s || i > this.value.to) && (!this.test || this.test(i, s, t)))
          return this.value = { from: i, to: s, precise: !0, match: t }, this;
        e = this.matchPos - this.curLineStart;
      } else if (this.curLineStart + this.curLine.length < this.to)
        this.nextLine(), e = 0;
      else
        return this.done = !0, this;
    }
  }
}
const eo = /* @__PURE__ */ new WeakMap();
class Ti {
  constructor(e, t) {
    this.from = e, this.text = t;
  }
  get to() {
    return this.from + this.text.length;
  }
  static get(e, t, i) {
    let s = eo.get(e);
    if (!s || s.from >= i || s.to <= t) {
      let O = new Ti(t, e.sliceString(t, i));
      return eo.set(e, O), O;
    }
    if (s.from == t && s.to == i)
      return s;
    let { text: r, from: o } = s;
    return o > t && (r = e.sliceString(t, o) + r, o = t), s.to < i && (r += e.sliceString(s.to, i)), eo.set(e, new Ti(o, r)), new Ti(t, r.slice(t - o, i - o));
  }
}
class cu {
  constructor(e, t, i, s, r) {
    this.text = e, this.to = r, this.done = !1, this.value = lu, this.matchPos = Ds(e, s), this.re = new RegExp(t, KO + (i != null && i.ignoreCase ? "i" : "")), this.test = i == null ? void 0 : i.test, this.flat = Ti.get(e, s, this.chunkEnd(
      s + 5e3
      /* Chunk.Base */
    ));
  }
  chunkEnd(e) {
    return e >= this.to ? this.to : this.text.lineAt(e).to;
  }
  next() {
    for (; ; ) {
      let e = this.re.lastIndex = this.matchPos - this.flat.from, t = this.re.exec(this.flat.text);
      if (t && !t[0] && t.index == e && (this.re.lastIndex = e + 1, t = this.re.exec(this.flat.text)), t) {
        let i = this.flat.from + t.index, s = i + t[0].length;
        if ((this.flat.to >= this.to || t.index + t[0].length <= this.flat.text.length - 10) && (!this.test || this.test(i, s, t)))
          return this.value = { from: i, to: s, precise: !0, match: t }, this.matchPos = Ds(this.text, s + (i == s ? 1 : 0)), this;
      }
      if (this.flat.to == this.to)
        return this.done = !0, this;
      this.flat = Ti.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
    }
  }
}
typeof Symbol < "u" && (hu.prototype[Symbol.iterator] = cu.prototype[Symbol.iterator] = function() {
  return this;
});
function N$(n) {
  try {
    return new RegExp(n, KO), !0;
  } catch {
    return !1;
  }
}
function Ds(n, e) {
  if (e >= n.length)
    return e;
  let t = n.lineAt(e), i;
  for (; e < t.to && (i = t.text.charCodeAt(e - t.from)) >= 56320 && i < 57344; )
    e++;
  return e;
}
const F$ = (n) => {
  let { state: e } = n, t = String(e.doc.lineAt(n.state.selection.main.head).number), { close: i, result: s } = gg(n, {
    label: e.phrase("Go to line"),
    input: { type: "text", name: "line", value: t },
    focus: !0,
    submitLabel: e.phrase("go")
  });
  return s.then((r) => {
    let o = r && /^([+-])?(\d+)?(:\d+)?(%)?$/.exec(r.elements.line.value);
    if (!o) {
      n.dispatch({ effects: i });
      return;
    }
    let O = e.doc.lineAt(e.selection.main.head), [, a, l, h, c] = o, f = h ? +h.slice(1) : 0, u = l ? +l : O.number;
    if (l && c) {
      let g = u / 100;
      a && (g = g * (a == "-" ? -1 : 1) + O.number / e.doc.lines), u = Math.round(e.doc.lines * g);
    } else l && a && (u = u * (a == "-" ? -1 : 1) + O.number);
    let d = e.doc.line(Math.max(1, Math.min(e.doc.lines, u))), m = $.cursor(d.from + Math.max(0, Math.min(f, d.length)));
    n.dispatch({
      effects: [i, Z.scrollIntoView(m.from, { y: "center" })],
      selection: m
    });
  }), !0;
}, H$ = {
  highlightWordAroundCursor: !1,
  minSelectionLength: 1,
  maxMatches: 100,
  wholeWords: !1
}, K$ = /* @__PURE__ */ v.define({
  combine(n) {
    return $t(n, H$, {
      highlightWordAroundCursor: (e, t) => e || t,
      minSelectionLength: Math.min,
      maxMatches: Math.min
    });
  }
});
function J$(n) {
  return [sP, nP];
}
const eP = /* @__PURE__ */ Y.mark({ class: "cm-selectionMatch" }), tP = /* @__PURE__ */ Y.mark({ class: "cm-selectionMatch cm-selectionMatch-main" });
function Ll(n, e, t, i) {
  return (t == 0 || n(e.sliceDoc(t - 1, t)) != F.Word) && (i == e.doc.length || n(e.sliceDoc(i, i + 1)) != F.Word);
}
function iP(n, e, t, i) {
  return n(e.sliceDoc(t, t + 1)) == F.Word && n(e.sliceDoc(i - 1, i)) == F.Word;
}
const nP = /* @__PURE__ */ ie.fromClass(class {
  constructor(n) {
    this.decorations = this.getDeco(n);
  }
  update(n) {
    (n.selectionSet || n.docChanged || n.viewportChanged) && (this.decorations = this.getDeco(n.view));
  }
  getDeco(n) {
    let e = n.state.facet(K$), { state: t } = n, i = t.selection;
    if (i.ranges.length > 1)
      return Y.none;
    let s = i.main, r, o = null;
    if (s.empty) {
      if (!e.highlightWordAroundCursor)
        return Y.none;
      let a = t.wordAt(s.head);
      if (!a)
        return Y.none;
      o = t.charCategorizer(s.head), r = t.sliceDoc(a.from, a.to);
    } else {
      let a = s.to - s.from;
      if (a < e.minSelectionLength || a > 200)
        return Y.none;
      if (e.wholeWords) {
        if (r = t.sliceDoc(s.from, s.to), o = t.charCategorizer(s.head), !(Ll(o, t, s.from, s.to) && iP(o, t, s.from, s.to)))
          return Y.none;
      } else if (r = t.sliceDoc(s.from, s.to), !r)
        return Y.none;
    }
    let O = [];
    for (let a of n.visibleRanges) {
      let l = new Ei(t.doc, r, a.from, a.to);
      for (; !l.next().done; ) {
        let { from: h, to: c } = l.value;
        if ((!o || Ll(o, t, h, c)) && (s.empty && h <= s.from && c >= s.to ? O.push(tP.range(h, c)) : (h >= s.to || c <= s.from) && O.push(eP.range(h, c)), O.length > e.maxMatches))
          return Y.none;
      }
    }
    return Y.set(O);
  }
}, {
  decorations: (n) => n.decorations
}), sP = /* @__PURE__ */ Z.baseTheme({
  ".cm-selectionMatch": { backgroundColor: "#99ff7780" },
  ".cm-searchMatch .cm-selectionMatch": { backgroundColor: "transparent" }
}), rP = ({ state: n, dispatch: e }) => {
  let { selection: t } = n, i = $.create(t.ranges.map((s) => n.wordAt(s.head) || $.cursor(s.head)), t.mainIndex);
  return i.eq(t) ? !1 : (e(n.update({ selection: i })), !0);
};
function oP(n, e) {
  let { main: t, ranges: i } = n.selection, s = n.wordAt(t.head), r = s && s.from == t.from && s.to == t.to;
  for (let o = !1, O = new Ei(n.doc, e, i[i.length - 1].to); ; )
    if (O.next(), O.done) {
      if (o)
        return null;
      O = new Ei(n.doc, e, 0, Math.max(0, i[i.length - 1].from - 1)), o = !0;
    } else {
      if (o && i.some((a) => a.from == O.value.from))
        continue;
      if (r) {
        let a = n.wordAt(O.value.from);
        if (!a || a.from != O.value.from || a.to != O.value.to)
          continue;
      }
      return O.value;
    }
}
const OP = ({ state: n, dispatch: e }) => {
  let { ranges: t } = n.selection;
  if (t.some((r) => r.from === r.to))
    return rP({ state: n, dispatch: e });
  let i = n.sliceDoc(t[0].from, t[0].to);
  if (n.selection.ranges.some((r) => n.sliceDoc(r.from, r.to) != i))
    return !1;
  let s = oP(n, i);
  return s ? (e(n.update({
    selection: n.selection.addRange($.range(s.from, s.to), !1),
    effects: Z.scrollIntoView(s.to)
  })), !0) : !1;
}, Bi = /* @__PURE__ */ v.define({
  combine(n) {
    return $t(n, {
      top: !1,
      caseSensitive: !1,
      literal: !1,
      regexp: !1,
      wholeWord: !1,
      createPanel: (e) => new SP(e),
      scrollToMatch: (e) => Z.scrollIntoView(e)
    });
  }
});
class fu {
  /**
  Create a query object.
  */
  constructor(e) {
    this.search = e.search, this.caseSensitive = !!e.caseSensitive, this.literal = !!e.literal, this.regexp = !!e.regexp, this.replace = e.replace || "", this.valid = !!this.search && (!this.regexp || N$(this.search)), this.unquoted = this.unquote(this.search), this.wholeWord = !!e.wholeWord, this.test = e.test;
  }
  /**
  @internal
  */
  unquote(e) {
    return this.literal ? e : e.replace(/\\([nrt\\])/g, (t, i) => i == "n" ? `
` : i == "r" ? "\r" : i == "t" ? "	" : "\\");
  }
  /**
  Compare this query to another query.
  */
  eq(e) {
    return this.search == e.search && this.replace == e.replace && this.caseSensitive == e.caseSensitive && this.regexp == e.regexp && this.wholeWord == e.wholeWord && this.test == e.test;
  }
  /**
  @internal
  */
  create() {
    return this.regexp ? new uP(this) : new hP(this);
  }
  /**
  Get a search cursor for this query, searching through the given
  range in the given state.
  */
  getCursor(e, t = 0, i) {
    let s = e.doc ? e : A.create({ doc: e });
    return i == null && (i = s.doc.length), this.regexp ? $i(this, s, t, i) : Qi(this, s, t, i);
  }
}
class uu {
  constructor(e) {
    this.spec = e;
  }
}
function aP(n, e, t) {
  return (i, s, r, o) => {
    if (t && !t(i, s, r, o))
      return !1;
    let O = i >= o && s <= o + r.length ? r.slice(i - o, s - o) : e.doc.sliceString(i, s);
    return n(O, e, i, s);
  };
}
function Qi(n, e, t, i) {
  let s;
  return n.wholeWord && (s = lP(e.doc, e.charCategorizer(e.selection.main.head))), n.test && (s = aP(n.test, e, s)), new Ei(e.doc, n.unquoted, t, i, n.caseSensitive ? void 0 : (r) => r.toLowerCase(), s);
}
function lP(n, e) {
  return (t, i, s, r) => ((r > t || r + s.length < i) && (r = Math.max(0, t - 2), s = n.sliceString(r, Math.min(n.length, i + 2))), (e(Is(s, t - r)) != F.Word || e(Bs(s, t - r)) != F.Word) && (e(Bs(s, i - r)) != F.Word || e(Is(s, i - r)) != F.Word));
}
class hP extends uu {
  constructor(e) {
    super(e);
  }
  nextMatch(e, t, i) {
    let s = Qi(this.spec, e, i, e.doc.length).nextOverlapping();
    if (s.done) {
      let r = Math.min(e.doc.length, t + this.spec.unquoted.length);
      s = Qi(this.spec, e, 0, r).nextOverlapping();
    }
    return s.done || s.value.from == t && s.value.to == i ? null : s.value;
  }
  // Searching in reverse is, rather than implementing an inverted search
  // cursor, done by scanning chunk after chunk forward.
  prevMatchInRange(e, t, i) {
    for (let s = i; ; ) {
      let r = Math.max(t, s - 1e4 - this.spec.unquoted.length), o = Qi(this.spec, e, r, s), O = null;
      for (; !o.nextOverlapping().done; )
        O = o.value;
      if (O)
        return O;
      if (r == t)
        return null;
      s -= 1e4;
    }
  }
  prevMatch(e, t, i) {
    let s = this.prevMatchInRange(e, 0, t);
    return s || (s = this.prevMatchInRange(e, Math.max(0, i - this.spec.unquoted.length), e.doc.length)), s && (s.from != t || s.to != i) ? s : null;
  }
  getReplacement(e) {
    return this.spec.unquote(this.spec.replace);
  }
  matchAll(e, t) {
    let i = Qi(this.spec, e, 0, e.doc.length), s = [];
    for (; !i.next().done; ) {
      if (s.length >= t)
        return null;
      s.push(i.value);
    }
    return s;
  }
  highlight(e, t, i, s) {
    let r = Qi(this.spec, e, Math.max(0, t - this.spec.unquoted.length), Math.min(i + this.spec.unquoted.length, e.doc.length));
    for (; !r.next().done; )
      s(r.value.from, r.value.to);
  }
}
function cP(n, e, t) {
  return (i, s, r) => (!t || t(i, s, r)) && n(r[0], e, i, s);
}
function $i(n, e, t, i) {
  let s;
  return n.wholeWord && (s = fP(e.charCategorizer(e.selection.main.head))), n.test && (s = cP(n.test, e, s)), new hu(e.doc, n.search, { ignoreCase: !n.caseSensitive, test: s }, t, i);
}
function Is(n, e) {
  return n.slice(le(n, e, !1), e);
}
function Bs(n, e) {
  return n.slice(e, le(n, e));
}
function fP(n) {
  return (e, t, i) => !i[0].length || (n(Is(i.input, i.index)) != F.Word || n(Bs(i.input, i.index)) != F.Word) && (n(Bs(i.input, i.index + i[0].length)) != F.Word || n(Is(i.input, i.index + i[0].length)) != F.Word);
}
class uP extends uu {
  nextMatch(e, t, i) {
    let s = $i(this.spec, e, i, e.doc.length).next();
    return s.done && (s = $i(this.spec, e, 0, t).next()), s.done ? null : s.value;
  }
  prevMatchInRange(e, t, i) {
    for (let s = 1; ; s++) {
      let r = Math.max(
        t,
        i - s * 1e4
        /* FindPrev.ChunkSize */
      ), o = $i(this.spec, e, r, i), O = null;
      for (; !o.next().done; )
        O = o.value;
      if (O && (r == t || O.from > r + 10))
        return O;
      if (r == t)
        return null;
    }
  }
  prevMatch(e, t, i) {
    return this.prevMatchInRange(e, 0, t) || this.prevMatchInRange(e, i, e.doc.length);
  }
  getReplacement(e) {
    return this.spec.unquote(this.spec.replace).replace(/\$([$&]|\d+)/g, (t, i) => {
      if (i == "&")
        return e.match[0];
      if (i == "$")
        return "$";
      for (let s = i.length; s > 0; s--) {
        let r = +i.slice(0, s);
        if (r > 0 && r < e.match.length)
          return e.match[r] + i.slice(s);
      }
      return t;
    });
  }
  matchAll(e, t) {
    let i = $i(this.spec, e, 0, e.doc.length), s = [];
    for (; !i.next().done; ) {
      if (s.length >= t)
        return null;
      s.push(i.value);
    }
    return s;
  }
  highlight(e, t, i, s) {
    let r = $i(this.spec, e, Math.max(
      0,
      t - 250
      /* RegExp.HighlightMargin */
    ), Math.min(i + 250, e.doc.length));
    for (; !r.next().done; )
      s(r.value.from, r.value.to);
  }
}
const wn = /* @__PURE__ */ q.define(), JO = /* @__PURE__ */ q.define(), Ct = /* @__PURE__ */ me.define({
  create(n) {
    return new to(rO(n).create(), null);
  },
  update(n, e) {
    for (let t of e.effects)
      t.is(wn) ? n = new to(t.value.create(), n.panel) : t.is(JO) && (n = new to(n.query, t.value ? ea : null));
    return n;
  },
  provide: (n) => xn.from(n, (e) => e.panel)
});
class to {
  constructor(e, t) {
    this.query = e, this.panel = t;
  }
}
const dP = /* @__PURE__ */ Y.mark({ class: "cm-searchMatch" }), pP = /* @__PURE__ */ Y.mark({ class: "cm-searchMatch cm-searchMatch-selected" }), mP = /* @__PURE__ */ ie.fromClass(class {
  constructor(n) {
    this.view = n, this.decorations = this.highlight(n.state.field(Ct));
  }
  update(n) {
    let e = n.state.field(Ct);
    (e != n.startState.field(Ct) || n.docChanged || n.selectionSet || n.viewportChanged) && (this.decorations = this.highlight(e));
  }
  highlight({ query: n, panel: e }) {
    if (!e || !n.spec.valid)
      return Y.none;
    let { view: t } = this, i = new wt();
    for (let s = 0, r = t.visibleRanges, o = r.length; s < o; s++) {
      let { from: O, to: a } = r[s];
      for (; s < o - 1 && a > r[s + 1].from - 2 * 250; )
        a = r[++s].to;
      n.highlight(t.state, O, a, (l, h) => {
        let c = t.state.selection.ranges.some((f) => f.from == l && f.to == h);
        i.add(l, h, c ? pP : dP);
      });
    }
    return i.finish();
  }
}, {
  decorations: (n) => n.decorations
});
function Mn(n) {
  return (e) => {
    let t = e.state.field(Ct, !1);
    return t && t.query.spec.valid ? n(e, t) : mu(e);
  };
}
const Ns = /* @__PURE__ */ Mn((n, { query: e }) => {
  let { to: t } = n.state.selection.main, i = e.nextMatch(n.state, t, t);
  if (!i)
    return !1;
  let s = $.single(i.from, i.to), r = n.state.facet(Bi);
  return n.dispatch({
    selection: s,
    effects: [ta(n, i), r.scrollToMatch(s.main, n)],
    userEvent: "select.search"
  }), pu(n), !0;
}), Fs = /* @__PURE__ */ Mn((n, { query: e }) => {
  let { state: t } = n, { from: i } = t.selection.main, s = e.prevMatch(t, i, i);
  if (!s)
    return !1;
  let r = $.single(s.from, s.to), o = n.state.facet(Bi);
  return n.dispatch({
    selection: r,
    effects: [ta(n, s), o.scrollToMatch(r.main, n)],
    userEvent: "select.search"
  }), pu(n), !0;
}), gP = /* @__PURE__ */ Mn((n, { query: e }) => {
  let t = e.matchAll(n.state, 1e3);
  return !t || !t.length ? !1 : (n.dispatch({
    selection: $.create(t.map((i) => $.range(i.from, i.to))),
    userEvent: "select.search.matches"
  }), !0);
}), QP = ({ state: n, dispatch: e }) => {
  let t = n.selection;
  if (t.ranges.length > 1 || t.main.empty)
    return !1;
  let { from: i, to: s } = t.main, r = [], o = 0;
  for (let O = new Ei(n.doc, n.sliceDoc(i, s)); !O.next().done; ) {
    if (r.length > 1e3)
      return !1;
    O.value.from == i && (o = r.length), r.push($.range(O.value.from, O.value.to));
  }
  return e(n.update({
    selection: $.create(r, o),
    userEvent: "select.search.matches"
  })), !0;
}, Dl = /* @__PURE__ */ Mn((n, { query: e }) => {
  let { state: t } = n, { from: i, to: s } = t.selection.main;
  if (t.readOnly)
    return !1;
  let r = e.nextMatch(t, i, i);
  if (!r)
    return !1;
  let o = r, O = [], a, l, h = [];
  o.precise ? o.from == i && o.to == s && (l = t.toText(e.getReplacement(o)), O.push({ from: o.from, to: o.to, insert: l }), o = e.nextMatch(t, o.from, o.to), h.push(Z.announce.of(t.phrase("replaced match on line $", t.doc.lineAt(i).number) + "."))) : o = e.nextMatch(t, o.from, o.to);
  let c = n.state.changes(O);
  return o && (a = $.single(o.from, o.to).map(c), h.push(ta(n, o)), h.push(t.facet(Bi).scrollToMatch(a.main, n))), n.dispatch({
    changes: c,
    selection: a,
    effects: h,
    userEvent: "input.replace"
  }), !0;
}), $P = /* @__PURE__ */ Mn((n, { query: e }) => {
  if (n.state.readOnly)
    return !1;
  let t = [];
  for (let s of e.matchAll(n.state, 1e9)) {
    let { from: r, to: o, precise: O } = s;
    O && t.push({ from: r, to: o, insert: e.getReplacement(s) });
  }
  if (!t.length)
    return !1;
  let i = n.state.phrase("replaced $ matches", t.length) + ".";
  return n.dispatch({
    changes: t,
    effects: Z.announce.of(i),
    userEvent: "input.replace.all"
  }), !0;
});
function ea(n) {
  return n.state.facet(Bi).createPanel(n);
}
function rO(n, e) {
  var t, i, s, r, o;
  let O = n.selection.main, a = O.empty || O.to > O.from + 100 ? "" : n.sliceDoc(O.from, O.to);
  if (e && !a)
    return e;
  let l = n.facet(Bi);
  return new fu({
    search: ((t = e == null ? void 0 : e.literal) !== null && t !== void 0 ? t : l.literal) ? a : a.replace(/\n/g, "\\n"),
    caseSensitive: (i = e == null ? void 0 : e.caseSensitive) !== null && i !== void 0 ? i : l.caseSensitive,
    literal: (s = e == null ? void 0 : e.literal) !== null && s !== void 0 ? s : l.literal,
    regexp: (r = e == null ? void 0 : e.regexp) !== null && r !== void 0 ? r : l.regexp,
    wholeWord: (o = e == null ? void 0 : e.wholeWord) !== null && o !== void 0 ? o : l.wholeWord
  });
}
function du(n) {
  let e = zO(n, ea);
  return e && e.dom.querySelector("[main-field]");
}
function pu(n) {
  let e = du(n);
  e && e == n.root.activeElement && e.select();
}
const mu = (n) => {
  let e = n.state.field(Ct, !1);
  if (e && e.panel) {
    let t = du(n);
    if (t && t != n.root.activeElement) {
      let i = rO(n.state, e.query.spec);
      i.valid && n.dispatch({ effects: wn.of(i) }), t.focus(), t.select();
    }
  } else
    n.dispatch({ effects: [
      JO.of(!0),
      e ? wn.of(rO(n.state, e.query.spec)) : q.appendConfig.of(XP)
    ] });
  return !0;
}, gu = (n) => {
  let e = n.state.field(Ct, !1);
  if (!e || !e.panel)
    return !1;
  let t = zO(n, ea);
  return t && t.dom.contains(n.root.activeElement) && n.focus(), n.dispatch({ effects: JO.of(!1) }), !0;
}, PP = [
  { key: "Mod-f", run: mu, scope: "editor search-panel" },
  { key: "F3", run: Ns, shift: Fs, scope: "editor search-panel", preventDefault: !0 },
  { key: "Mod-g", run: Ns, shift: Fs, scope: "editor search-panel", preventDefault: !0 },
  { key: "Escape", run: gu, scope: "editor search-panel" },
  { key: "Mod-Shift-l", run: QP },
  { key: "Mod-Alt-g", run: F$ },
  { key: "Mod-d", run: OP, preventDefault: !0 }
];
class SP {
  constructor(e) {
    this.view = e;
    let t = this.query = e.state.field(Ct).query.spec;
    this.commit = this.commit.bind(this), this.searchField = G("input", {
      value: t.search,
      placeholder: qe(e, "Find"),
      "aria-label": qe(e, "Find"),
      class: "cm-textfield",
      name: "search",
      form: "",
      "main-field": "true",
      onchange: this.commit,
      onkeyup: this.commit
    }), this.replaceField = G("input", {
      value: t.replace,
      placeholder: qe(e, "Replace"),
      "aria-label": qe(e, "Replace"),
      class: "cm-textfield",
      name: "replace",
      form: "",
      onchange: this.commit,
      onkeyup: this.commit
    }), this.caseField = G("input", {
      type: "checkbox",
      name: "case",
      form: "",
      checked: t.caseSensitive,
      onchange: this.commit
    }), this.reField = G("input", {
      type: "checkbox",
      name: "re",
      form: "",
      checked: t.regexp,
      onchange: this.commit
    }), this.wordField = G("input", {
      type: "checkbox",
      name: "word",
      form: "",
      checked: t.wholeWord,
      onchange: this.commit
    });
    function i(s, r, o) {
      return G("button", { class: "cm-button", name: s, onclick: r, type: "button" }, o);
    }
    this.dom = G("div", { onkeydown: (s) => this.keydown(s), class: "cm-search" }, [
      this.searchField,
      i("next", () => Ns(e), [qe(e, "next")]),
      i("prev", () => Fs(e), [qe(e, "previous")]),
      i("select", () => gP(e), [qe(e, "all")]),
      G("label", null, [this.caseField, qe(e, "match case")]),
      G("label", null, [this.reField, qe(e, "regexp")]),
      G("label", null, [this.wordField, qe(e, "by word")]),
      ...e.state.readOnly ? [] : [
        G("br"),
        this.replaceField,
        i("replace", () => Dl(e), [qe(e, "replace")]),
        i("replaceAll", () => $P(e), [qe(e, "replace all")])
      ],
      G("button", {
        name: "close",
        onclick: () => gu(e),
        "aria-label": qe(e, "close"),
        type: "button"
      }, ["×"])
    ]);
  }
  commit() {
    let e = new fu({
      search: this.searchField.value,
      caseSensitive: this.caseField.checked,
      regexp: this.reField.checked,
      wholeWord: this.wordField.checked,
      replace: this.replaceField.value
    });
    e.eq(this.query) || (this.query = e, this.view.dispatch({ effects: wn.of(e) }));
  }
  keydown(e) {
    km(this.view, e, "search-panel") ? e.preventDefault() : e.keyCode == 13 && e.target == this.searchField ? (e.preventDefault(), (e.shiftKey ? Fs : Ns)(this.view)) : e.keyCode == 13 && e.target == this.replaceField && (e.preventDefault(), Dl(this.view));
  }
  update(e) {
    for (let t of e.transactions)
      for (let i of t.effects)
        i.is(wn) && !i.value.eq(this.query) && this.setQuery(i.value);
  }
  setQuery(e) {
    this.query = e, this.searchField.value = e.search, this.replaceField.value = e.replace, this.caseField.checked = e.caseSensitive, this.reField.checked = e.regexp, this.wordField.checked = e.wholeWord;
  }
  mount() {
    this.searchField.select();
  }
  get pos() {
    return 80;
  }
  get top() {
    return this.view.state.facet(Bi).top;
  }
}
function qe(n, e) {
  return n.state.phrase(e);
}
const fs = 30, us = /[\s\.,:;?!]/;
function ta(n, { from: e, to: t }) {
  let i = n.state.doc.lineAt(e), s = n.state.doc.lineAt(t).to, r = Math.max(i.from, e - fs), o = Math.min(s, t + fs), O = n.state.sliceDoc(r, o);
  if (r != i.from) {
    for (let a = 0; a < fs; a++)
      if (!us.test(O[a + 1]) && us.test(O[a])) {
        O = O.slice(a);
        break;
      }
  }
  if (o != s) {
    for (let a = O.length - 1; a > O.length - fs; a--)
      if (!us.test(O[a - 1]) && us.test(O[a])) {
        O = O.slice(0, a);
        break;
      }
  }
  return Z.announce.of(`${n.state.phrase("current match")}. ${O} ${n.state.phrase("on line")} ${i.number}.`);
}
const xP = /* @__PURE__ */ Z.baseTheme({
  ".cm-panel.cm-search": {
    padding: "2px 6px 4px",
    position: "relative",
    "& [name=close]": {
      position: "absolute",
      top: "0",
      right: "4px",
      backgroundColor: "inherit",
      border: "none",
      font: "inherit",
      padding: 0,
      margin: 0
    },
    "& input, & button, & label": {
      margin: ".2em .6em .2em 0"
    },
    "& input[type=checkbox]": {
      marginRight: ".2em"
    },
    "& label": {
      fontSize: "80%",
      whiteSpace: "pre"
    }
  },
  "&light .cm-searchMatch": { backgroundColor: "#ffff0054" },
  "&dark .cm-searchMatch": { backgroundColor: "#00ffff8a" },
  "&light .cm-searchMatch-selected": { backgroundColor: "#ff6a0054" },
  "&dark .cm-searchMatch-selected": { backgroundColor: "#ff00ff8a" }
}), XP = [
  Ct,
  /* @__PURE__ */ It.low(mP),
  xP
];
class Qu {
  /**
  Create a new completion context. (Mostly useful for testing
  completion sources—in the editor, the extension will create
  these for you.)
  */
  constructor(e, t, i, s) {
    this.state = e, this.pos = t, this.explicit = i, this.view = s, this.abortListeners = [], this.abortOnDocChange = !1;
  }
  /**
  Get the extent, content, and (if there is a token) type of the
  token before `this.pos`.
  */
  tokenBefore(e) {
    let t = oe(this.state).resolveInner(this.pos, -1);
    for (; t && e.indexOf(t.name) < 0; )
      t = t.parent;
    return t ? {
      from: t.from,
      to: this.pos,
      text: this.state.sliceDoc(t.from, this.pos),
      type: t.type
    } : null;
  }
  /**
  Get the match of the given expression directly before the
  cursor.
  */
  matchBefore(e) {
    let t = this.state.doc.lineAt(this.pos), i = Math.max(t.from, this.pos - 250), s = t.text.slice(i - t.from, this.pos - t.from), r = s.search(Pu(e, !1));
    return r < 0 ? null : { from: i + r, to: this.pos, text: s.slice(r) };
  }
  /**
  Yields true when the query has been aborted. Can be useful in
  asynchronous queries to avoid doing work that will be ignored.
  */
  get aborted() {
    return this.abortListeners == null;
  }
  /**
  Allows you to register abort handlers, which will be called when
  the query is
  [aborted](https://codemirror.net/6/docs/ref/#autocomplete.CompletionContext.aborted).
  
  By default, running queries will not be aborted for regular
  typing or backspacing, on the assumption that they are likely to
  return a result with a
  [`validFor`](https://codemirror.net/6/docs/ref/#autocomplete.CompletionResult.validFor) field that
  allows the result to be used after all. Passing `onDocChange:
  true` will cause this query to be aborted for any document
  change.
  */
  addEventListener(e, t, i) {
    e == "abort" && this.abortListeners && (this.abortListeners.push(t), i && i.onDocChange && (this.abortOnDocChange = !0));
  }
}
function Il(n) {
  let e = Object.keys(n).join(""), t = /\w/.test(e);
  return t && (e = e.replace(/\w/g, "")), `[${t ? "\\w" : ""}${e.replace(/[^\w\s]/g, "\\$&")}]`;
}
function bP(n) {
  let e = /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
  for (let { label: s } of n) {
    e[s[0]] = !0;
    for (let r = 1; r < s.length; r++)
      t[s[r]] = !0;
  }
  let i = Il(e) + Il(t) + "*$";
  return [new RegExp("^" + i), new RegExp(i)];
}
function $u(n) {
  let e = n.map((s) => typeof s == "string" ? { label: s } : s), [t, i] = e.every((s) => /^\w+$/.test(s.label)) ? [/\w*$/, /\w+$/] : bP(e);
  return (s) => {
    let r = s.matchBefore(i);
    return r || s.explicit ? { from: r ? r.from : s.pos, options: e, validFor: t } : null;
  };
}
function yP(n, e) {
  return (t) => {
    for (let i = oe(t.state).resolveInner(t.pos, -1); i; i = i.parent) {
      if (n.indexOf(i.name) > -1)
        return null;
      if (i.type.isTop)
        break;
    }
    return e(t);
  };
}
class Bl {
  constructor(e, t, i, s) {
    this.completion = e, this.source = t, this.match = i, this.score = s;
  }
}
function oi(n) {
  return n.selection.main.from;
}
function Pu(n, e) {
  var t;
  let { source: i } = n, s = e && i[0] != "^", r = i[i.length - 1] != "$";
  return !s && !r ? n : new RegExp(`${s ? "^" : ""}(?:${i})${r ? "$" : ""}`, (t = n.flags) !== null && t !== void 0 ? t : n.ignoreCase ? "i" : "");
}
const ia = /* @__PURE__ */ vt.define();
function wP(n, e, t, i) {
  let { main: s } = n.selection, r = t - s.from, o = i - s.from;
  return {
    ...n.changeByRange((O) => {
      if (O != s && t != i && n.sliceDoc(O.from + r, O.from + o) != n.sliceDoc(t, i))
        return { range: O };
      let a = n.toText(e);
      return {
        changes: { from: O.from + r, to: i == s.from ? O.to : O.from + o, insert: a },
        range: $.cursor(O.from + r + a.length)
      };
    }),
    scrollIntoView: !0,
    userEvent: "input.complete"
  };
}
const Nl = /* @__PURE__ */ new WeakMap();
function kP(n) {
  if (!Array.isArray(n))
    return n;
  let e = Nl.get(n);
  return e || Nl.set(n, e = $u(n)), e;
}
const Hs = /* @__PURE__ */ q.define(), kn = /* @__PURE__ */ q.define();
class ZP {
  constructor(e) {
    this.pattern = e, this.chars = [], this.folded = [], this.any = [], this.precise = [], this.byWord = [], this.score = 0, this.matched = [];
    for (let t = 0; t < e.length; ) {
      let i = ke(e, t), s = ct(i);
      this.chars.push(i);
      let r = e.slice(t, t + s), o = r.toUpperCase();
      this.folded.push(ke(o == r ? r.toLowerCase() : o, 0)), t += s;
    }
    this.astral = e.length != this.chars.length;
  }
  ret(e, t) {
    return this.score = e, this.matched = t, this;
  }
  // Matches a given word (completion) against the pattern (input).
  // Will return a boolean indicating whether there was a match and,
  // on success, set `this.score` to the score, `this.matched` to an
  // array of `from, to` pairs indicating the matched parts of `word`.
  //
  // The score is a number that is more negative the worse the match
  // is. See `Penalty` above.
  match(e) {
    if (this.pattern.length == 0)
      return this.ret(-100, []);
    if (e.length < this.pattern.length)
      return null;
    let { chars: t, folded: i, any: s, precise: r, byWord: o } = this;
    if (t.length == 1) {
      let x = ke(e, 0), S = ct(x), T = S == e.length ? 0 : -100;
      if (x != t[0]) if (x == i[0])
        T += -200;
      else
        return null;
      return this.ret(T, [0, S]);
    }
    let O = e.indexOf(this.pattern);
    if (O == 0)
      return this.ret(e.length == this.pattern.length ? 0 : -100, [0, this.pattern.length]);
    let a = t.length, l = 0;
    if (O < 0) {
      for (let x = 0, S = Math.min(e.length, 200); x < S && l < a; ) {
        let T = ke(e, x);
        (T == t[l] || T == i[l]) && (s[l++] = x), x += ct(T);
      }
      if (l < a)
        return null;
    }
    let h = 0, c = 0, f = !1, u = 0, d = -1, m = -1, g = /[a-z]/.test(e), Q = !0;
    for (let x = 0, S = Math.min(e.length, 200), T = 0; x < S && c < a; ) {
      let X = ke(e, x);
      O < 0 && (h < a && X == t[h] && (r[h++] = x), u < a && (X == t[u] || X == i[u] ? (u == 0 && (d = x), m = x + 1, u++) : u = 0));
      let b, y = X < 255 ? X >= 48 && X <= 57 || X >= 97 && X <= 122 ? 2 : X >= 65 && X <= 90 ? 1 : 0 : (b = $O(X)) != b.toLowerCase() ? 1 : b != b.toUpperCase() ? 2 : 0;
      (!x || y == 1 && g || T == 0 && y != 0) && (t[c] == X || i[c] == X && (f = !0) ? o[c++] = x : o.length && (Q = !1)), T = y, x += ct(X);
    }
    return c == a && o[0] == 0 && Q ? this.result(-100 + (f ? -200 : 0), o, e) : u == a && d == 0 ? this.ret(-200 - e.length + (m == e.length ? 0 : -100), [0, m]) : O > -1 ? this.ret(-700 - e.length, [O, O + this.pattern.length]) : u == a ? this.ret(-900 - e.length, [d, m]) : c == a ? this.result(-100 + (f ? -200 : 0) + -700 + (Q ? 0 : -1100), o, e) : t.length == 2 ? null : this.result((s[0] ? -700 : 0) + -200 + -1100, s, e);
  }
  result(e, t, i) {
    let s = [], r = 0;
    for (let o of t) {
      let O = o + (this.astral ? ct(ke(i, o)) : 1);
      r && s[r - 1] == o ? s[r - 1] = O : (s[r++] = o, s[r++] = O);
    }
    return this.ret(e - i.length, s);
  }
}
class vP {
  constructor(e) {
    this.pattern = e, this.matched = [], this.score = 0, this.folded = e.toLowerCase();
  }
  match(e) {
    if (e.length < this.pattern.length)
      return null;
    let t = e.slice(0, this.pattern.length), i = t == this.pattern ? 0 : t.toLowerCase() == this.folded ? -200 : null;
    return i == null ? null : (this.matched = [0, t.length], this.score = i + (e.length == this.pattern.length ? 0 : -100), this);
  }
}
const Oe = /* @__PURE__ */ v.define({
  combine(n) {
    return $t(n, {
      activateOnTyping: !0,
      activateOnCompletion: () => !1,
      activateOnTypingDelay: 100,
      selectOnOpen: !0,
      override: null,
      closeOnBlur: !0,
      maxRenderedOptions: 100,
      defaultKeymap: !0,
      tooltipClass: () => "",
      optionClass: () => "",
      aboveCursor: !1,
      icons: !0,
      addToOptions: [],
      positionInfo: TP,
      filterStrict: !1,
      compareCompletions: (e, t) => (e.sortText || e.label).localeCompare(t.sortText || t.label),
      interactionDelay: 75,
      updateSyncTime: 100
    }, {
      defaultKeymap: (e, t) => e && t,
      closeOnBlur: (e, t) => e && t,
      icons: (e, t) => e && t,
      tooltipClass: (e, t) => (i) => Fl(e(i), t(i)),
      optionClass: (e, t) => (i) => Fl(e(i), t(i)),
      addToOptions: (e, t) => e.concat(t),
      filterStrict: (e, t) => e || t
    });
  }
});
function Fl(n, e) {
  return n ? e ? n + " " + e : n : e;
}
function TP(n, e, t, i, s, r) {
  let o = n.textDirection == I.RTL, O = o, a = !1, l = "top", h, c, f = e.left - s.left, u = s.right - e.right, d = i.right - i.left, m = i.bottom - i.top;
  if (O && f < Math.min(d, u) ? O = !1 : !O && u < Math.min(d, f) && (O = !0), d <= (O ? f : u))
    h = Math.max(s.top, Math.min(t.top, s.bottom - m)) - e.top, c = Math.min(400, O ? f : u);
  else {
    a = !0, c = Math.min(
      400,
      (o ? e.right : s.right - e.left) - 30
      /* Info.Margin */
    );
    let x = s.bottom - e.bottom;
    x >= m || x > e.top ? h = t.bottom - e.top : (l = "bottom", h = e.bottom - t.top);
  }
  let g = (e.bottom - e.top) / r.offsetHeight, Q = (e.right - e.left) / r.offsetWidth;
  return {
    style: `${l}: ${h / g}px; max-width: ${c / Q}px`,
    class: "cm-completionInfo-" + (a ? o ? "left-narrow" : "right-narrow" : O ? "left" : "right")
  };
}
const na = /* @__PURE__ */ q.define();
function UP(n) {
  let e = n.addToOptions.slice();
  return n.icons && e.push({
    render(t) {
      let i = document.createElement("div");
      return i.classList.add("cm-completionIcon"), t.type && i.classList.add(...t.type.split(/\s+/g).map((s) => "cm-completionIcon-" + s)), i.setAttribute("aria-hidden", "true"), i;
    },
    position: 20
  }), e.push({
    render(t, i, s, r) {
      let o = document.createElement("span");
      o.className = "cm-completionLabel";
      let O = t.displayLabel || t.label, a = 0;
      for (let l = 0; l < r.length; ) {
        let h = r[l++], c = r[l++];
        h > a && o.appendChild(document.createTextNode(O.slice(a, h)));
        let f = o.appendChild(document.createElement("span"));
        f.appendChild(document.createTextNode(O.slice(h, c))), f.className = "cm-completionMatchedText", a = c;
      }
      return a < O.length && o.appendChild(document.createTextNode(O.slice(a))), o;
    },
    position: 50
  }, {
    render(t) {
      if (!t.detail)
        return null;
      let i = document.createElement("span");
      return i.className = "cm-completionDetail", i.textContent = t.detail, i;
    },
    position: 80
  }), e.sort((t, i) => t.position - i.position).map((t) => t.render);
}
function io(n, e, t) {
  if (n <= t)
    return { from: 0, to: n };
  if (e < 0 && (e = 0), e <= n >> 1) {
    let s = Math.floor(e / t);
    return { from: s * t, to: (s + 1) * t };
  }
  let i = Math.ceil((n - e) / t);
  return { from: n - i * t, to: n - (i - 1) * t };
}
class YP {
  constructor(e, t, i) {
    this.view = e, this.stateField = t, this.applyCompletion = i, this.info = null, this.infoDestroy = null, this.placeInfoReq = {
      read: () => this.measureInfo(),
      write: (a) => this.placeInfo(a),
      key: this
    }, this.space = null, this.currentClass = "";
    let s = e.state.field(t), { options: r, selected: o } = s.open, O = e.state.facet(Oe);
    this.optionContent = UP(O), this.optionClass = O.optionClass, this.tooltipClass = O.tooltipClass, this.range = io(r.length, o, O.maxRenderedOptions), this.dom = document.createElement("div"), this.dom.className = "cm-tooltip-autocomplete", this.updateTooltipClass(e.state), this.dom.addEventListener("mousedown", (a) => {
      let { options: l } = e.state.field(t).open;
      for (let h = a.target, c; h && h != this.dom; h = h.parentNode)
        if (h.nodeName == "LI" && (c = /-(\d+)$/.exec(h.id)) && +c[1] < l.length) {
          this.applyCompletion(e, l[+c[1]]), a.preventDefault();
          return;
        }
      if (a.target == this.list) {
        let h = this.list.classList.contains("cm-completionListIncompleteTop") && a.clientY < this.list.firstChild.getBoundingClientRect().top ? this.range.from - 1 : this.list.classList.contains("cm-completionListIncompleteBottom") && a.clientY > this.list.lastChild.getBoundingClientRect().bottom ? this.range.to : null;
        h != null && (e.dispatch({ effects: na.of(h) }), a.preventDefault());
      }
    }), this.dom.addEventListener("focusout", (a) => {
      let l = e.state.field(this.stateField, !1);
      l && l.tooltip && e.state.facet(Oe).closeOnBlur && a.relatedTarget != e.contentDOM && e.dispatch({ effects: kn.of(null) });
    }), this.showOptions(r, s.id);
  }
  mount() {
    this.updateSel();
  }
  showOptions(e, t) {
    this.list && this.list.remove(), this.list = this.dom.appendChild(this.createListBox(e, t, this.range)), this.list.addEventListener("scroll", () => {
      this.info && this.view.requestMeasure(this.placeInfoReq);
    });
  }
  update(e) {
    var t;
    let i = e.state.field(this.stateField), s = e.startState.field(this.stateField);
    if (this.updateTooltipClass(e.state), i != s) {
      let { options: r, selected: o, disabled: O } = i.open;
      (!s.open || s.open.options != r) && (this.range = io(r.length, o, e.state.facet(Oe).maxRenderedOptions), this.showOptions(r, i.id)), this.updateSel(), O != ((t = s.open) === null || t === void 0 ? void 0 : t.disabled) && this.dom.classList.toggle("cm-tooltip-autocomplete-disabled", !!O);
    }
  }
  updateTooltipClass(e) {
    let t = this.tooltipClass(e);
    if (t != this.currentClass) {
      for (let i of this.currentClass.split(" "))
        i && this.dom.classList.remove(i);
      for (let i of t.split(" "))
        i && this.dom.classList.add(i);
      this.currentClass = t;
    }
  }
  positioned(e) {
    this.space = e, this.info && this.view.requestMeasure(this.placeInfoReq);
  }
  updateSel() {
    let e = this.view.state.field(this.stateField), t = e.open;
    (t.selected > -1 && t.selected < this.range.from || t.selected >= this.range.to) && (this.range = io(t.options.length, t.selected, this.view.state.facet(Oe).maxRenderedOptions), this.showOptions(t.options, e.id));
    let i = this.updateSelectedOption(t.selected);
    if (i) {
      this.destroyInfo();
      let { completion: s } = t.options[t.selected], { info: r } = s;
      if (!r)
        return;
      let o = typeof r == "string" ? document.createTextNode(r) : r(s);
      if (!o)
        return;
      "then" in o ? o.then((O) => {
        O && this.view.state.field(this.stateField, !1) == e && this.addInfoPane(O, s);
      }).catch((O) => Te(this.view.state, O, "completion info")) : (this.addInfoPane(o, s), i.setAttribute("aria-describedby", this.info.id));
    }
  }
  addInfoPane(e, t) {
    this.destroyInfo();
    let i = this.info = document.createElement("div");
    if (i.className = "cm-tooltip cm-completionInfo", i.id = "cm-completionInfo-" + Math.floor(Math.random() * 65535).toString(16), e.nodeType != null)
      i.appendChild(e), this.infoDestroy = null;
    else {
      let { dom: s, destroy: r } = e;
      i.appendChild(s), this.infoDestroy = r || null;
    }
    this.dom.appendChild(i), this.view.requestMeasure(this.placeInfoReq);
  }
  updateSelectedOption(e) {
    let t = null;
    for (let i = this.list.firstChild, s = this.range.from; i; i = i.nextSibling, s++)
      i.nodeName != "LI" || !i.id ? s-- : s == e ? i.hasAttribute("aria-selected") || (i.setAttribute("aria-selected", "true"), t = i) : i.hasAttribute("aria-selected") && (i.removeAttribute("aria-selected"), i.removeAttribute("aria-describedby"));
    return t && _P(this.list, t), t;
  }
  measureInfo() {
    let e = this.dom.querySelector("[aria-selected]");
    if (!e || !this.info)
      return null;
    let t = this.dom.getBoundingClientRect(), i = this.info.getBoundingClientRect(), s = e.getBoundingClientRect(), r = this.space;
    if (!r) {
      let o = this.dom.ownerDocument.documentElement;
      r = { left: 0, top: 0, right: o.clientWidth, bottom: o.clientHeight };
    }
    return s.top > Math.min(r.bottom, t.bottom) - 10 || s.bottom < Math.max(r.top, t.top) + 10 ? null : this.view.state.facet(Oe).positionInfo(this.view, t, s, i, r, this.dom);
  }
  placeInfo(e) {
    this.info && (e ? (e.style && (this.info.style.cssText = e.style), this.info.className = "cm-tooltip cm-completionInfo " + (e.class || "")) : this.info.style.cssText = "top: -1e6px");
  }
  createListBox(e, t, i) {
    const s = document.createElement("ul");
    s.id = t, s.setAttribute("role", "listbox"), s.setAttribute("aria-expanded", "true"), s.setAttribute("aria-label", this.view.state.phrase("Completions")), s.addEventListener("mousedown", (o) => {
      o.target == s && o.preventDefault();
    });
    let r = null;
    for (let o = i.from; o < i.to; o++) {
      let { completion: O, match: a } = e[o], { section: l } = O;
      if (l) {
        let f = typeof l == "string" ? l : l.name;
        if (f != r && (o > i.from || i.from == 0))
          if (r = f, typeof l != "string" && l.header)
            s.appendChild(l.header(l));
          else {
            let u = s.appendChild(document.createElement("completion-section"));
            u.textContent = f;
          }
      }
      const h = s.appendChild(document.createElement("li"));
      h.id = t + "-" + o, h.setAttribute("role", "option");
      let c = this.optionClass(O);
      c && (h.className = c);
      for (let f of this.optionContent) {
        let u = f(O, this.view.state, this.view, a);
        u && h.appendChild(u);
      }
    }
    return i.from && s.classList.add("cm-completionListIncompleteTop"), i.to < e.length && s.classList.add("cm-completionListIncompleteBottom"), s;
  }
  destroyInfo() {
    this.info && (this.infoDestroy && this.infoDestroy(), this.info.remove(), this.info = null);
  }
  destroy() {
    this.destroyInfo();
  }
}
function RP(n, e) {
  return (t) => new YP(t, n, e);
}
function _P(n, e) {
  let t = n.getBoundingClientRect(), i = e.getBoundingClientRect(), s = t.height / n.offsetHeight;
  i.top < t.top ? n.scrollTop -= (t.top - i.top) / s : i.bottom > t.bottom && (n.scrollTop += (i.bottom - t.bottom) / s);
}
function Hl(n) {
  return (n.boost || 0) * 100 + (n.apply ? 10 : 0) + (n.info ? 5 : 0) + (n.type ? 1 : 0);
}
function qP(n, e) {
  let t = [], i = null, s = null, r = (h) => {
    t.push(h);
    let { section: c } = h.completion;
    if (c) {
      i || (i = []);
      let f = typeof c == "string" ? c : c.name;
      i.some((u) => u.name == f) || i.push(typeof c == "string" ? { name: f } : c);
    }
  }, o = e.facet(Oe);
  for (let h of n)
    if (h.hasResult()) {
      let c = h.result.getMatch;
      if (h.result.filter === !1)
        for (let f of h.result.options)
          r(new Bl(f, h.source, c ? c(f) : [], 1e9 - t.length));
      else {
        let f = e.sliceDoc(h.from, h.to), u, d = o.filterStrict ? new vP(f) : new ZP(f);
        for (let m of h.result.options)
          if (u = d.match(m.label)) {
            let g = m.displayLabel ? c ? c(m, u.matched) : [] : u.matched, Q = u.score + (m.boost || 0);
            if (r(new Bl(m, h.source, g, Q)), typeof m.section == "object" && m.section.rank === "dynamic") {
              let { name: x } = m.section;
              s || (s = /* @__PURE__ */ Object.create(null)), s[x] = Math.max(Q, s[x] || -1e9);
            }
          }
      }
    }
  if (i) {
    let h = /* @__PURE__ */ Object.create(null), c = 0, f = (u, d) => (u.rank === "dynamic" && d.rank === "dynamic" ? s[d.name] - s[u.name] : 0) || (typeof u.rank == "number" ? u.rank : 1e9) - (typeof d.rank == "number" ? d.rank : 1e9) || (u.name < d.name ? -1 : 1);
    for (let u of i.sort(f))
      c -= 1e5, h[u.name] = c;
    for (let u of t) {
      let { section: d } = u.completion;
      d && (u.score += h[typeof d == "string" ? d : d.name]);
    }
  }
  let O = [], a = null, l = o.compareCompletions;
  for (let h of t.sort((c, f) => f.score - c.score || l(c.completion, f.completion))) {
    let c = h.completion;
    !a || a.label != c.label || a.detail != c.detail || a.type != null && c.type != null && a.type != c.type || a.apply != c.apply || a.boost != c.boost ? O.push(h) : Hl(h.completion) > Hl(a) && (O[O.length - 1] = h), a = h.completion;
  }
  return O;
}
class Xi {
  constructor(e, t, i, s, r, o) {
    this.options = e, this.attrs = t, this.tooltip = i, this.timestamp = s, this.selected = r, this.disabled = o;
  }
  setSelected(e, t) {
    return e == this.selected || e >= this.options.length ? this : new Xi(this.options, Kl(t, e), this.tooltip, this.timestamp, e, this.disabled);
  }
  static build(e, t, i, s, r, o) {
    if (s && !o && e.some((l) => l.isPending))
      return s.setDisabled();
    let O = qP(e, t);
    if (!O.length)
      return s && e.some((l) => l.isPending) ? s.setDisabled() : null;
    let a = t.facet(Oe).selectOnOpen ? 0 : -1;
    if (s && s.selected != a && s.selected != -1) {
      let l = s.options[s.selected].completion;
      for (let h = 0; h < O.length; h++)
        if (O[h].completion == l) {
          a = h;
          break;
        }
    }
    return new Xi(O, Kl(i, a), {
      pos: e.reduce((l, h) => h.hasResult() ? Math.min(l, h.from) : l, 1e8),
      create: AP,
      above: r.aboveCursor
    }, s ? s.timestamp : Date.now(), a, !1);
  }
  map(e) {
    return new Xi(this.options, this.attrs, { ...this.tooltip, pos: e.mapPos(this.tooltip.pos) }, this.timestamp, this.selected, this.disabled);
  }
  setDisabled() {
    return new Xi(this.options, this.attrs, this.tooltip, this.timestamp, this.selected, !0);
  }
}
class Ks {
  constructor(e, t, i) {
    this.active = e, this.id = t, this.open = i;
  }
  static start() {
    return new Ks(WP, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
  }
  update(e) {
    let { state: t } = e, i = t.facet(Oe), r = (i.override || t.languageDataAt("autocomplete", oi(t)).map(kP)).map((a) => (this.active.find((h) => h.source == a) || new Le(
      a,
      this.active.some(
        (h) => h.state != 0
        /* State.Inactive */
      ) ? 1 : 0
      /* State.Inactive */
    )).update(e, i));
    r.length == this.active.length && r.every((a, l) => a == this.active[l]) && (r = this.active);
    let o = this.open, O = e.effects.some((a) => a.is(sa));
    o && e.docChanged && (o = o.map(e.changes)), e.selection || r.some((a) => a.hasResult() && e.changes.touchesRange(a.from, a.to)) || !VP(r, this.active) || O ? o = Xi.build(r, t, this.id, o, i, O) : o && o.disabled && !r.some((a) => a.isPending) && (o = null), !o && r.every((a) => !a.isPending) && r.some((a) => a.hasResult()) && (r = r.map((a) => a.hasResult() ? new Le(
      a.source,
      0
      /* State.Inactive */
    ) : a));
    for (let a of e.effects)
      a.is(na) && (o = o && o.setSelected(a.value, this.id));
    return r == this.active && o == this.open ? this : new Ks(r, this.id, o);
  }
  get tooltip() {
    return this.open ? this.open.tooltip : null;
  }
  get attrs() {
    return this.open ? this.open.attrs : this.active.length ? zP : CP;
  }
}
function VP(n, e) {
  if (n == e)
    return !0;
  for (let t = 0, i = 0; ; ) {
    for (; t < n.length && !n[t].hasResult(); )
      t++;
    for (; i < e.length && !e[i].hasResult(); )
      i++;
    let s = t == n.length, r = i == e.length;
    if (s || r)
      return s == r;
    if (n[t++].result != e[i++].result)
      return !1;
  }
}
const zP = {
  "aria-autocomplete": "list"
}, CP = {};
function Kl(n, e) {
  let t = {
    "aria-autocomplete": "list",
    "aria-haspopup": "listbox",
    "aria-controls": n
  };
  return e > -1 && (t["aria-activedescendant"] = n + "-" + e), t;
}
const WP = [];
function Su(n, e) {
  if (n.isUserEvent("input.complete")) {
    let i = n.annotation(ia);
    if (i && e.activateOnCompletion(i))
      return 12;
  }
  let t = n.isUserEvent("input.type");
  return t && e.activateOnTyping ? 5 : t ? 1 : n.isUserEvent("delete.backward") ? 2 : n.selection ? 8 : n.docChanged ? 16 : 0;
}
class Le {
  constructor(e, t, i = !1) {
    this.source = e, this.state = t, this.explicit = i;
  }
  hasResult() {
    return !1;
  }
  get isPending() {
    return this.state == 1;
  }
  update(e, t) {
    let i = Su(e, t), s = this;
    (i & 8 || i & 16 && this.touches(e)) && (s = new Le(
      s.source,
      0
      /* State.Inactive */
    )), i & 4 && s.state == 0 && (s = new Le(
      this.source,
      1
      /* State.Pending */
    )), s = s.updateFor(e, i);
    for (let r of e.effects)
      if (r.is(Hs))
        s = new Le(s.source, 1, r.value);
      else if (r.is(kn))
        s = new Le(
          s.source,
          0
          /* State.Inactive */
        );
      else if (r.is(sa))
        for (let o of r.value)
          o.source == s.source && (s = o);
    return s;
  }
  updateFor(e, t) {
    return this.map(e.changes);
  }
  map(e) {
    return this;
  }
  touches(e) {
    return e.changes.touchesRange(oi(e.state));
  }
}
class Ui extends Le {
  constructor(e, t, i, s, r, o) {
    super(e, 3, t), this.limit = i, this.result = s, this.from = r, this.to = o;
  }
  hasResult() {
    return !0;
  }
  updateFor(e, t) {
    var i;
    if (!(t & 3))
      return this.map(e.changes);
    let s = this.result;
    s.map && !e.changes.empty && (s = s.map(s, e.changes));
    let r = e.changes.mapPos(this.from), o = e.changes.mapPos(this.to, 1), O = oi(e.state);
    if (O > o || !s || t & 2 && (oi(e.startState) == this.from || O < this.limit))
      return new Le(
        this.source,
        t & 4 ? 1 : 0
        /* State.Inactive */
      );
    let a = e.changes.mapPos(this.limit);
    return jP(s.validFor, e.state, r, o) ? new Ui(this.source, this.explicit, a, s, r, o) : s.update && (s = s.update(s, r, o, new Qu(e.state, O, !1))) ? new Ui(this.source, this.explicit, a, s, s.from, (i = s.to) !== null && i !== void 0 ? i : oi(e.state)) : new Le(this.source, 1, this.explicit);
  }
  map(e) {
    if (e.empty)
      return this;
    let t = this.result.map ? this.result.map(this.result, e) : this.result;
    return t ? new Ui(this.source, this.explicit, e.mapPos(this.limit), t, e.mapPos(this.from), e.mapPos(this.to, 1)) : new Le(
      this.source,
      0
      /* State.Inactive */
    );
  }
  touches(e) {
    return e.changes.touchesRange(this.from, this.to);
  }
}
function jP(n, e, t, i) {
  if (!n)
    return !1;
  let s = e.sliceDoc(t, i);
  return typeof n == "function" ? n(s, t, i, e) : Pu(n, !0).test(s);
}
const sa = /* @__PURE__ */ q.define({
  map(n, e) {
    return n.map((t) => t.map(e));
  }
}), Ze = /* @__PURE__ */ me.define({
  create() {
    return Ks.start();
  },
  update(n, e) {
    return n.update(e);
  },
  provide: (n) => [
    VO.from(n, (e) => e.tooltip),
    Z.contentAttributes.from(n, (e) => e.attrs)
  ]
});
function ra(n, e) {
  const t = e.completion.apply || e.completion.label;
  let i = n.state.field(Ze).active.find((s) => s.source == e.source);
  return i instanceof Ui ? (typeof t == "string" ? n.dispatch({
    ...wP(n.state, t, i.from, i.to),
    annotations: ia.of(e.completion)
  }) : t(n, e.completion, i.from, i.to), !0) : !1;
}
const AP = /* @__PURE__ */ RP(Ze, ra);
function ds(n, e = "option") {
  return (t) => {
    let i = t.state.field(Ze, !1);
    if (!i || !i.open || i.open.disabled || Date.now() - i.open.timestamp < t.state.facet(Oe).interactionDelay)
      return !1;
    let s = 1, r;
    e == "page" && (r = nf(t, i.open.tooltip)) && (s = Math.max(2, Math.floor(r.dom.offsetHeight / r.dom.querySelector("li").offsetHeight) - 1));
    let { length: o } = i.open.options, O = i.open.selected > -1 ? i.open.selected + s * (n ? 1 : -1) : n ? 0 : o - 1;
    return O < 0 ? O = e == "page" ? 0 : o - 1 : O >= o && (O = e == "page" ? o - 1 : 0), t.dispatch({ effects: na.of(O) }), !0;
  };
}
const EP = (n) => {
  let e = n.state.field(Ze, !1);
  return n.state.readOnly || !e || !e.open || e.open.selected < 0 || e.open.disabled || Date.now() - e.open.timestamp < n.state.facet(Oe).interactionDelay ? !1 : ra(n, e.open.options[e.open.selected]);
}, no = (n) => n.state.field(Ze, !1) ? (n.dispatch({ effects: Hs.of(!0) }), !0) : !1, MP = (n) => {
  let e = n.state.field(Ze, !1);
  return !e || !e.active.some(
    (t) => t.state != 0
    /* State.Inactive */
  ) ? !1 : (n.dispatch({ effects: kn.of(null) }), !0);
};
class GP {
  constructor(e, t) {
    this.active = e, this.context = t, this.time = Date.now(), this.updates = [], this.done = void 0;
  }
}
const LP = 50, DP = 1e3, IP = /* @__PURE__ */ ie.fromClass(class {
  constructor(n) {
    this.view = n, this.debounceUpdate = -1, this.running = [], this.debounceAccept = -1, this.pendingStart = !1, this.composing = 0;
    for (let e of n.state.field(Ze).active)
      e.isPending && this.startQuery(e);
  }
  update(n) {
    let e = n.state.field(Ze), t = n.state.facet(Oe);
    if (!n.selectionSet && !n.docChanged && n.startState.field(Ze) == e)
      return;
    let i = n.transactions.some((r) => {
      let o = Su(r, t);
      return o & 8 || (r.selection || r.docChanged) && !(o & 3);
    });
    for (let r = 0; r < this.running.length; r++) {
      let o = this.running[r];
      if (i || o.context.abortOnDocChange && n.docChanged || o.updates.length + n.transactions.length > LP && Date.now() - o.time > DP) {
        for (let O of o.context.abortListeners)
          try {
            O();
          } catch (a) {
            Te(this.view.state, a);
          }
        o.context.abortListeners = null, this.running.splice(r--, 1);
      } else
        o.updates.push(...n.transactions);
    }
    this.debounceUpdate > -1 && clearTimeout(this.debounceUpdate), n.transactions.some((r) => r.effects.some((o) => o.is(Hs))) && (this.pendingStart = !0);
    let s = this.pendingStart ? 50 : t.activateOnTypingDelay;
    if (this.debounceUpdate = e.active.some((r) => r.isPending && !this.running.some((o) => o.active.source == r.source)) ? setTimeout(() => this.startUpdate(), s) : -1, this.composing != 0)
      for (let r of n.transactions)
        r.isUserEvent("input.type") ? this.composing = 2 : this.composing == 2 && r.selection && (this.composing = 3);
  }
  startUpdate() {
    this.debounceUpdate = -1, this.pendingStart = !1;
    let { state: n } = this.view, e = n.field(Ze);
    for (let t of e.active)
      t.isPending && !this.running.some((i) => i.active.source == t.source) && this.startQuery(t);
    this.running.length && e.open && e.open.disabled && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(Oe).updateSyncTime));
  }
  startQuery(n) {
    let { state: e } = this.view, t = oi(e), i = new Qu(e, t, n.explicit, this.view), s = new GP(n, i);
    this.running.push(s), Promise.resolve(n.source(i)).then((r) => {
      s.context.aborted || (s.done = r || null, this.scheduleAccept());
    }, (r) => {
      this.view.dispatch({ effects: kn.of(null) }), Te(this.view.state, r);
    });
  }
  scheduleAccept() {
    this.running.every((n) => n.done !== void 0) ? this.accept() : this.debounceAccept < 0 && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(Oe).updateSyncTime));
  }
  // For each finished query in this.running, try to create a result
  // or, if appropriate, restart the query.
  accept() {
    var n;
    this.debounceAccept > -1 && clearTimeout(this.debounceAccept), this.debounceAccept = -1;
    let e = [], t = this.view.state.facet(Oe), i = this.view.state.field(Ze);
    for (let s = 0; s < this.running.length; s++) {
      let r = this.running[s];
      if (r.done === void 0)
        continue;
      if (this.running.splice(s--, 1), r.done) {
        let O = oi(r.updates.length ? r.updates[0].startState : this.view.state), a = Math.min(O, r.done.from + (r.active.explicit ? 0 : 1)), l = new Ui(r.active.source, r.active.explicit, a, r.done, r.done.from, (n = r.done.to) !== null && n !== void 0 ? n : O);
        for (let h of r.updates)
          l = l.update(h, t);
        if (l.hasResult()) {
          e.push(l);
          continue;
        }
      }
      let o = i.active.find((O) => O.source == r.active.source);
      if (o && o.isPending)
        if (r.done == null) {
          let O = new Le(
            r.active.source,
            0
            /* State.Inactive */
          );
          for (let a of r.updates)
            O = O.update(a, t);
          O.isPending || e.push(O);
        } else
          this.startQuery(o);
    }
    (e.length || i.open && i.open.disabled) && this.view.dispatch({ effects: sa.of(e) });
  }
}, {
  eventHandlers: {
    blur(n) {
      let e = this.view.state.field(Ze, !1);
      if (e && e.tooltip && this.view.state.facet(Oe).closeOnBlur) {
        let t = e.open && nf(this.view, e.open.tooltip);
        (!t || !t.dom.contains(n.relatedTarget)) && setTimeout(() => this.view.dispatch({ effects: kn.of(null) }), 10);
      }
    },
    compositionstart() {
      this.composing = 1;
    },
    compositionend() {
      this.composing == 3 && setTimeout(() => this.view.dispatch({ effects: Hs.of(!1) }), 20), this.composing = 0;
    }
  }
}), BP = typeof navigator == "object" && /* @__PURE__ */ /Win/.test(navigator.platform), NP = /* @__PURE__ */ It.highest(/* @__PURE__ */ Z.domEventHandlers({
  keydown(n, e) {
    let t = e.state.field(Ze, !1);
    if (!t || !t.open || t.open.disabled || t.open.selected < 0 || n.key.length > 1 || n.ctrlKey && !(BP && n.altKey) || n.metaKey)
      return !1;
    let i = t.open.options[t.open.selected], s = t.active.find((o) => o.source == i.source), r = i.completion.commitCharacters || s.result.commitCharacters;
    return r && r.indexOf(n.key) > -1 && ra(e, i), !1;
  }
})), xu = /* @__PURE__ */ Z.baseTheme({
  ".cm-tooltip.cm-tooltip-autocomplete": {
    "& > ul": {
      fontFamily: "monospace",
      whiteSpace: "nowrap",
      overflow: "hidden auto",
      maxWidth_fallback: "700px",
      maxWidth: "min(700px, 95vw)",
      minWidth: "250px",
      maxHeight: "10em",
      height: "100%",
      listStyle: "none",
      margin: 0,
      padding: 0,
      "& > li, & > completion-section": {
        padding: "1px 3px",
        lineHeight: 1.2
      },
      "& > li": {
        overflowX: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer"
      },
      "& > completion-section": {
        display: "list-item",
        borderBottom: "1px solid silver",
        paddingLeft: "0.5em",
        opacity: 0.7
      }
    }
  },
  "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#17c",
    color: "white"
  },
  "&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#777"
  },
  "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#347",
    color: "white"
  },
  "&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#444"
  },
  ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
    content: '"···"',
    opacity: 0.5,
    display: "block",
    textAlign: "center",
    cursor: "pointer"
  },
  ".cm-tooltip.cm-completionInfo": {
    position: "absolute",
    padding: "3px 9px",
    width: "max-content",
    maxWidth: "400px",
    boxSizing: "border-box",
    whiteSpace: "pre-line"
  },
  ".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
  ".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
  ".cm-completionInfo.cm-completionInfo-left-narrow": { right: "30px" },
  ".cm-completionInfo.cm-completionInfo-right-narrow": { left: "30px" },
  "&light .cm-snippetField": { backgroundColor: "#00000022" },
  "&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
  ".cm-snippetFieldPosition": {
    verticalAlign: "text-top",
    width: 0,
    height: "1.15em",
    display: "inline-block",
    margin: "0 -0.7px -.7em",
    borderLeft: "1.4px dotted #888"
  },
  ".cm-completionMatchedText": {
    textDecoration: "underline"
  },
  ".cm-completionDetail": {
    marginLeft: "0.5em",
    fontStyle: "italic"
  },
  ".cm-completionIcon": {
    fontSize: "90%",
    width: ".8em",
    display: "inline-block",
    textAlign: "center",
    paddingRight: ".6em",
    opacity: "0.6",
    boxSizing: "content-box"
  },
  ".cm-completionIcon-function, .cm-completionIcon-method": {
    "&:after": { content: "'ƒ'" }
  },
  ".cm-completionIcon-class": {
    "&:after": { content: "'○'" }
  },
  ".cm-completionIcon-interface": {
    "&:after": { content: "'◌'" }
  },
  ".cm-completionIcon-variable": {
    "&:after": { content: "'𝑥'" }
  },
  ".cm-completionIcon-constant": {
    "&:after": { content: "'𝐶'" }
  },
  ".cm-completionIcon-type": {
    "&:after": { content: "'𝑡'" }
  },
  ".cm-completionIcon-enum": {
    "&:after": { content: "'∪'" }
  },
  ".cm-completionIcon-property": {
    "&:after": { content: "'□'" }
  },
  ".cm-completionIcon-keyword": {
    "&:after": { content: "'🔑︎'" }
    // Disable emoji rendering
  },
  ".cm-completionIcon-namespace": {
    "&:after": { content: "'▢'" }
  },
  ".cm-completionIcon-text": {
    "&:after": { content: "'abc'", fontSize: "50%", verticalAlign: "middle" }
  }
});
class FP {
  constructor(e, t, i, s) {
    this.field = e, this.line = t, this.from = i, this.to = s;
  }
}
class oa {
  constructor(e, t, i) {
    this.field = e, this.from = t, this.to = i;
  }
  map(e) {
    let t = e.mapPos(this.from, -1, de.TrackDel), i = e.mapPos(this.to, 1, de.TrackDel);
    return t == null || i == null ? null : new oa(this.field, t, i);
  }
}
class Oa {
  constructor(e, t) {
    this.lines = e, this.fieldPositions = t;
  }
  instantiate(e, t) {
    let i = [], s = [t], r = e.doc.lineAt(t), o = /^\s*/.exec(r.text)[0];
    for (let a of this.lines) {
      if (i.length) {
        let l = o, h = /^\t*/.exec(a)[0].length;
        for (let c = 0; c < h; c++)
          l += e.facet(gr);
        s.push(t + l.length - h), a = l + a.slice(h);
      }
      i.push(a), t += a.length + 1;
    }
    let O = this.fieldPositions.map((a) => new oa(a.field, s[a.line] + a.from, s[a.line] + a.to));
    return { text: i, ranges: O };
  }
  static parse(e) {
    let t = [], i = [], s = [], r;
    for (let o of e.split(/\r\n?|\n/)) {
      for (; r = /[#$]\{(?:(\d+)(?::([^{}]*))?|((?:\\[{}]|[^{}])*))\}/.exec(o); ) {
        let O = r[1] ? +r[1] : null, a = r[2] || r[3] || "", l = -1;
        O === 0 && (O = 1e9);
        let h = a.replace(/\\[{}]/g, (c) => c[1]);
        for (let c = 0; c < t.length; c++)
          (O != null ? t[c].seq == O : h && t[c].name == h) && (l = c);
        if (l < 0) {
          let c = 0;
          for (; c < t.length && (O == null || t[c].seq != null && t[c].seq < O); )
            c++;
          t.splice(c, 0, { seq: O, name: h }), l = c;
          for (let f of s)
            f.field >= l && f.field++;
        }
        for (let c of s)
          if (c.line == i.length && c.from > r.index) {
            let f = r[2] ? 3 + (r[1] || "").length : 2;
            c.from -= f, c.to -= f;
          }
        s.push(new FP(l, i.length, r.index, r.index + h.length)), o = o.slice(0, r.index) + a + o.slice(r.index + r[0].length);
      }
      o = o.replace(/\\([{}])/g, (O, a, l) => {
        for (let h of s)
          h.line == i.length && h.from > l && (h.from--, h.to--);
        return a;
      }), i.push(o);
    }
    return new Oa(i, s);
  }
}
let HP = /* @__PURE__ */ Y.widget({ widget: /* @__PURE__ */ new class extends Pt {
  toDOM() {
    let n = document.createElement("span");
    return n.className = "cm-snippetFieldPosition", n;
  }
  ignoreEvent() {
    return !1;
  }
}() }), KP = /* @__PURE__ */ Y.mark({ class: "cm-snippetField" });
class Ni {
  constructor(e, t) {
    this.ranges = e, this.active = t, this.deco = Y.set(e.map((i) => (i.from == i.to ? HP : KP).range(i.from, i.to)), !0);
  }
  map(e) {
    let t = [];
    for (let i of this.ranges) {
      let s = i.map(e);
      if (!s)
        return null;
      t.push(s);
    }
    return new Ni(t, this.active);
  }
  selectionInsideField(e) {
    return e.ranges.every((t) => this.ranges.some((i) => i.field == this.active && i.from <= t.from && i.to >= t.to));
  }
}
const Gn = /* @__PURE__ */ q.define({
  map(n, e) {
    return n && n.map(e);
  }
}), JP = /* @__PURE__ */ q.define(), Zn = /* @__PURE__ */ me.define({
  create() {
    return null;
  },
  update(n, e) {
    for (let t of e.effects) {
      if (t.is(Gn))
        return t.value;
      if (t.is(JP) && n)
        return new Ni(n.ranges, t.value);
    }
    return n && e.docChanged && (n = n.map(e.changes)), n && e.selection && !n.selectionInsideField(e.selection) && (n = null), n;
  },
  provide: (n) => Z.decorations.from(n, (e) => e ? e.deco : Y.none)
});
function aa(n, e) {
  return $.create(n.filter((t) => t.field == e).map((t) => $.range(t.from, t.to)));
}
function eS(n) {
  let e = Oa.parse(n);
  return (t, i, s, r) => {
    let { text: o, ranges: O } = e.instantiate(t.state, s), { main: a } = t.state.selection, l = {
      changes: { from: s, to: r == a.from ? a.to : r, insert: j.of(o) },
      scrollIntoView: !0,
      annotations: i ? [ia.of(i), ne.userEvent.of("input.complete")] : void 0
    };
    if (O.length && (l.selection = aa(O, 0)), O.some((h) => h.field > 0)) {
      let h = new Ni(O, 0), c = l.effects = [Gn.of(h)];
      t.state.field(Zn, !1) === void 0 && c.push(q.appendConfig.of([Zn, rS, oS, xu]));
    }
    t.dispatch(t.state.update(l));
  };
}
function Xu(n) {
  return ({ state: e, dispatch: t }) => {
    let i = e.field(Zn, !1);
    if (!i || n < 0 && i.active == 0)
      return !1;
    let s = i.active + n, r = n > 0 && !i.ranges.some((o) => o.field == s + n);
    return t(e.update({
      selection: aa(i.ranges, s),
      effects: Gn.of(r ? null : new Ni(i.ranges, s)),
      scrollIntoView: !0
    })), !0;
  };
}
const tS = ({ state: n, dispatch: e }) => n.field(Zn, !1) ? (e(n.update({ effects: Gn.of(null) })), !0) : !1, iS = /* @__PURE__ */ Xu(1), nS = /* @__PURE__ */ Xu(-1), sS = [
  { key: "Tab", run: iS, shift: nS },
  { key: "Escape", run: tS }
], Jl = /* @__PURE__ */ v.define({
  combine(n) {
    return n.length ? n[0] : sS;
  }
}), rS = /* @__PURE__ */ It.highest(/* @__PURE__ */ dr.compute([Jl], (n) => n.facet(Jl)));
function we(n, e) {
  return { ...e, apply: eS(n) };
}
const oS = /* @__PURE__ */ Z.domEventHandlers({
  mousedown(n, e) {
    let t = e.state.field(Zn, !1), i;
    if (!t || (i = e.posAtCoords({ x: n.clientX, y: n.clientY })) == null)
      return !1;
    let s = t.ranges.find((r) => r.from <= i && r.to >= i);
    return !s || s.field == t.active ? !1 : (e.dispatch({
      selection: aa(t.ranges, s.field),
      effects: Gn.of(t.ranges.some((r) => r.field > s.field) ? new Ni(t.ranges, s.field) : null),
      scrollIntoView: !0
    }), !0);
  }
}), vn = {
  brackets: ["(", "[", "{", "'", '"'],
  before: ")]}:;>",
  stringPrefixes: []
}, ii = /* @__PURE__ */ q.define({
  map(n, e) {
    let t = e.mapPos(n, -1, de.TrackAfter);
    return t ?? void 0;
  }
}), la = /* @__PURE__ */ new class extends jt {
}();
la.startSide = 1;
la.endSide = -1;
const bu = /* @__PURE__ */ me.define({
  create() {
    return C.empty;
  },
  update(n, e) {
    if (n = n.map(e.changes), e.selection) {
      let t = e.state.doc.lineAt(e.selection.main.head);
      n = n.update({ filter: (i) => i >= t.from && i <= t.to });
    }
    for (let t of e.effects)
      t.is(ii) && (n = n.update({ add: [la.range(t.value, t.value + 1)] }));
    return n;
  }
});
function OS() {
  return [lS, bu];
}
const so = "()[]{}<>«»»«［］｛｝";
function yu(n) {
  for (let e = 0; e < so.length; e += 2)
    if (so.charCodeAt(e) == n)
      return so.charAt(e + 1);
  return $O(n < 128 ? n : n + 1);
}
function wu(n, e) {
  return n.languageDataAt("closeBrackets", e)[0] || vn;
}
const aS = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), lS = /* @__PURE__ */ Z.inputHandler.of((n, e, t, i) => {
  if ((aS ? n.composing : n.compositionStarted) || n.state.readOnly)
    return !1;
  let s = n.state.selection.main;
  if (i.length > 2 || i.length == 2 && ct(ke(i, 0)) == 1 || e != s.from || t != s.to)
    return !1;
  let r = fS(n.state, i);
  return r ? (n.dispatch(r), !0) : !1;
}), hS = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let i = wu(n, n.selection.main.head).brackets || vn.brackets, s = null, r = n.changeByRange((o) => {
    if (o.empty) {
      let O = uS(n.doc, o.head);
      for (let a of i)
        if (a == O && wr(n.doc, o.head) == yu(ke(a, 0)))
          return {
            changes: { from: o.head - a.length, to: o.head + a.length },
            range: $.cursor(o.head - a.length)
          };
    }
    return { range: s = o };
  });
  return s || e(n.update(r, { scrollIntoView: !0, userEvent: "delete.backward" })), !s;
}, cS = [
  { key: "Backspace", run: hS }
];
function fS(n, e) {
  let t = wu(n, n.selection.main.head), i = t.brackets || vn.brackets;
  for (let s of i) {
    let r = yu(ke(s, 0));
    if (e == s)
      return r == s ? mS(n, s, i.indexOf(s + s + s) > -1, t) : dS(n, s, r, t.before || vn.before);
    if (e == r && ku(n, n.selection.main.from))
      return pS(n, s, r);
  }
  return null;
}
function ku(n, e) {
  let t = !1;
  return n.field(bu).between(0, n.doc.length, (i) => {
    i == e && (t = !0);
  }), t;
}
function wr(n, e) {
  let t = n.sliceString(e, e + 2);
  return t.slice(0, ct(ke(t, 0)));
}
function uS(n, e) {
  let t = n.sliceString(e - 2, e);
  return ct(ke(t, 0)) == t.length ? t : t.slice(1);
}
function dS(n, e, t, i) {
  let s = null, r = n.changeByRange((o) => {
    if (!o.empty)
      return {
        changes: [{ insert: e, from: o.from }, { insert: t, from: o.to }],
        effects: ii.of(o.to + e.length),
        range: $.range(o.anchor + e.length, o.head + e.length)
      };
    let O = wr(n.doc, o.head);
    return !O || /\s/.test(O) || i.indexOf(O) > -1 ? {
      changes: { insert: e + t, from: o.head },
      effects: ii.of(o.head + e.length),
      range: $.cursor(o.head + e.length)
    } : { range: s = o };
  });
  return s ? null : n.update(r, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function pS(n, e, t) {
  let i = null, s = n.changeByRange((r) => r.empty && wr(n.doc, r.head) == t ? {
    changes: { from: r.head, to: r.head + t.length, insert: t },
    range: $.cursor(r.head + t.length)
  } : i = { range: r });
  return i ? null : n.update(s, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function mS(n, e, t, i) {
  let s = i.stringPrefixes || vn.stringPrefixes, r = null, o = n.changeByRange((O) => {
    if (!O.empty)
      return {
        changes: [{ insert: e, from: O.from }, { insert: e, from: O.to }],
        effects: ii.of(O.to + e.length),
        range: $.range(O.anchor + e.length, O.head + e.length)
      };
    let a = O.head, l = wr(n.doc, a), h;
    if (l == e) {
      if (eh(n, a))
        return {
          changes: { insert: e + e, from: a },
          effects: ii.of(a + e.length),
          range: $.cursor(a + e.length)
        };
      if (ku(n, a)) {
        let f = t && n.sliceDoc(a, a + e.length * 3) == e + e + e ? e + e + e : e;
        return {
          changes: { from: a, to: a + f.length, insert: f },
          range: $.cursor(a + f.length)
        };
      }
    } else {
      if (t && n.sliceDoc(a - 2 * e.length, a) == e + e && (h = th(n, a - 2 * e.length, s)) > -1 && eh(n, h))
        return {
          changes: { insert: e + e + e + e, from: a },
          effects: ii.of(a + e.length),
          range: $.cursor(a + e.length)
        };
      if (n.charCategorizer(a)(l) != F.Word && th(n, a, s) > -1 && !gS(n, a, e, s))
        return {
          changes: { insert: e + e, from: a },
          effects: ii.of(a + e.length),
          range: $.cursor(a + e.length)
        };
    }
    return { range: r = O };
  });
  return r ? null : n.update(o, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function eh(n, e) {
  let t = oe(n).resolveInner(e + 1);
  return t.parent && t.from == e;
}
function gS(n, e, t, i) {
  let s = oe(n).resolveInner(e, -1), r = i.reduce((o, O) => Math.max(o, O.length), 0);
  for (let o = 0; o < 5; o++) {
    let O = n.sliceDoc(s.from, Math.min(s.to, s.from + t.length + r)), a = O.indexOf(t);
    if (!a || a > -1 && i.indexOf(O.slice(0, a)) > -1) {
      let h = s.firstChild;
      for (; h && h.from == s.from && h.to - h.from > t.length + a; ) {
        if (n.sliceDoc(h.to - t.length, h.to) == t)
          return !1;
        h = h.firstChild;
      }
      return !0;
    }
    let l = s.to == e && s.parent;
    if (!l)
      break;
    s = l;
  }
  return !1;
}
function th(n, e, t) {
  let i = n.charCategorizer(e);
  if (i(n.sliceDoc(e - 1, e)) != F.Word)
    return e;
  for (let s of t) {
    let r = e - s.length;
    if (n.sliceDoc(r, e) == s && i(n.sliceDoc(r - 1, r)) != F.Word)
      return r;
  }
  return -1;
}
function QS(n = {}) {
  return [
    NP,
    Ze,
    Oe.of(n),
    IP,
    $S,
    xu
  ];
}
const Zu = [
  { key: "Ctrl-Space", run: no },
  { mac: "Alt-`", run: no },
  { mac: "Alt-i", run: no },
  { key: "Escape", run: MP },
  { key: "ArrowDown", run: /* @__PURE__ */ ds(!0) },
  { key: "ArrowUp", run: /* @__PURE__ */ ds(!1) },
  { key: "PageDown", run: /* @__PURE__ */ ds(!0, "page") },
  { key: "PageUp", run: /* @__PURE__ */ ds(!1, "page") },
  { key: "Enter", run: EP }
], $S = /* @__PURE__ */ It.highest(/* @__PURE__ */ dr.computeN([Oe], (n) => n.facet(Oe).defaultKeymap ? [Zu] : []));
class ih {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.diagnostic = i;
  }
}
class ei {
  constructor(e, t, i) {
    this.diagnostics = e, this.panel = t, this.selected = i;
  }
  static init(e, t, i) {
    let s = i.facet(Tn).markerFilter;
    s && (e = s(e, i));
    let r = e.slice().sort((u, d) => u.from - d.from || u.to - d.to), o = new wt(), O = [], a = 0, l = i.doc.iter(), h = 0, c = i.doc.length;
    for (let u = 0; ; ) {
      let d = u == r.length ? null : r[u];
      if (!d && !O.length)
        break;
      let m, g;
      if (O.length)
        m = a, g = O.reduce((S, T) => Math.min(S, T.to), d && d.from > m ? d.from : 1e8);
      else {
        if (m = d.from, m > c)
          break;
        g = d.to, O.push(d), u++;
      }
      for (; u < r.length; ) {
        let S = r[u];
        if (S.from == m && (S.to > S.from || S.to == m))
          O.push(S), u++, g = Math.min(S.to, g);
        else {
          g = Math.min(S.from, g);
          break;
        }
      }
      g = Math.min(g, c);
      let Q = !1;
      if (O.some((S) => S.from == m && (S.to == g || g == c)) && (Q = m == g, !Q && g - m < 10)) {
        let S = m - (h + l.value.length);
        S > 0 && (l.next(S), h = m);
        for (let T = m; ; ) {
          if (T >= g) {
            Q = !0;
            break;
          }
          if (!l.lineBreak && h + l.value.length > T)
            break;
          T = h + l.value.length, h += l.value.length, l.next();
        }
      }
      let x = YS(O);
      if (Q)
        o.add(m, m, Y.widget({
          widget: new ZS(x),
          diagnostics: O.slice()
        }));
      else {
        let S = O.reduce((T, X) => X.markClass ? T + " " + X.markClass : T, "");
        o.add(m, g, Y.mark({
          class: "cm-lintRange cm-lintRange-" + x + S,
          diagnostics: O.slice(),
          inclusiveEnd: O.some((T) => T.to > g)
        }));
      }
      if (a = g, a == c)
        break;
      for (let S = 0; S < O.length; S++)
        O[S].to <= a && O.splice(S--, 1);
    }
    let f = o.finish();
    return new ei(f, t, Dt(f));
  }
}
function Dt(n, e = null, t = 0) {
  let i = null;
  return n.between(t, 1e9, (s, r, { spec: o }) => {
    if (!(e && o.diagnostics.indexOf(e) < 0))
      if (!i)
        i = new ih(s, r, e || o.diagnostics[0]);
      else {
        if (o.diagnostics.indexOf(i.diagnostic) < 0)
          return !1;
        i = new ih(i.from, r, i.diagnostic);
      }
  }), i;
}
function PS(n, e) {
  let t = e.pos, i = e.end || t, s = n.state.facet(Tn).hideOn(n, t, i);
  if (s != null)
    return s;
  let r = n.startState.doc.lineAt(e.pos);
  return !!(n.effects.some((o) => o.is(vu)) || n.changes.touchesRange(r.from, Math.max(r.to, i)));
}
function SS(n, e) {
  return n.field(Ce, !1) ? e : e.concat(q.appendConfig.of(RS));
}
const vu = /* @__PURE__ */ q.define(), ha = /* @__PURE__ */ q.define(), Tu = /* @__PURE__ */ q.define(), Ce = /* @__PURE__ */ me.define({
  create() {
    return new ei(Y.none, null, null);
  },
  update(n, e) {
    if (e.docChanged && n.diagnostics.size) {
      let t = n.diagnostics.map(e.changes), i = null, s = n.panel;
      if (n.selected) {
        let r = e.changes.mapPos(n.selected.from, 1);
        i = Dt(t, n.selected.diagnostic, r) || Dt(t, null, r);
      }
      !t.size && s && e.state.facet(Tn).autoPanel && (s = null), n = new ei(t, s, i);
    }
    for (let t of e.effects)
      if (t.is(vu)) {
        let i = e.state.facet(Tn).autoPanel ? t.value.length ? Un.open : null : n.panel;
        n = ei.init(t.value, i, e.state);
      } else t.is(ha) ? n = new ei(n.diagnostics, t.value ? Un.open : null, n.selected) : t.is(Tu) && (n = new ei(n.diagnostics, n.panel, t.value));
    return n;
  },
  provide: (n) => [
    xn.from(n, (e) => e.panel),
    Z.decorations.from(n, (e) => e.diagnostics)
  ]
}), xS = /* @__PURE__ */ Y.mark({ class: "cm-lintRange cm-lintRange-active" });
function XS(n, e, t) {
  let { diagnostics: i } = n.state.field(Ce), s, r = -1, o = -1;
  i.between(e - (t < 0 ? 1 : 0), e + (t > 0 ? 1 : 0), (a, l, { spec: h }) => {
    if (e >= a && e <= l && (a == l || (e > a || t > 0) && (e < l || t < 0)))
      return s = h.diagnostics, r = a, o = l, !1;
  });
  let O = n.state.facet(Tn).tooltipFilter;
  return s && O && (s = O(s, n.state)), s ? {
    pos: r,
    end: o,
    above: !0,
    create() {
      return { dom: bS(n, s) };
    }
  } : null;
}
function bS(n, e) {
  return G("ul", { class: "cm-tooltip-lint" }, e.map((t) => Yu(n, t, !1)));
}
const yS = (n) => {
  let e = n.state.field(Ce, !1);
  (!e || !e.panel) && n.dispatch({ effects: SS(n.state, [ha.of(!0)]) });
  let t = zO(n, Un.open);
  return t && t.dom.querySelector(".cm-panel-lint ul").focus(), !0;
}, nh = (n) => {
  let e = n.state.field(Ce, !1);
  return !e || !e.panel ? !1 : (n.dispatch({ effects: ha.of(!1) }), !0);
}, wS = (n) => {
  let e = n.state.field(Ce, !1);
  if (!e)
    return !1;
  let t = n.state.selection.main, i = Dt(e.diagnostics, null, t.to + 1);
  return !i && (i = Dt(e.diagnostics, null, 0), !i || i.from == t.from && i.to == t.to) ? !1 : (n.dispatch({ selection: { anchor: i.from, head: i.to }, scrollIntoView: !0 }), pg(n, i.from, 1, {
    tooltip: Ru,
    until: (s) => s.docChanged || s.newSelection.main.head < i.from || s.newSelection.main.head > i.to
  }), !0);
}, kS = [
  { key: "Mod-Shift-m", run: yS, preventDefault: !0 },
  { key: "F8", run: wS }
], Tn = /* @__PURE__ */ v.define({
  combine(n) {
    return {
      sources: n.map((e) => e.source).filter((e) => e != null),
      ...$t(n.map((e) => e.config), {
        delay: 750,
        markerFilter: null,
        tooltipFilter: null,
        needsRefresh: null,
        hideOn: () => null
      }, {
        delay: Math.max,
        markerFilter: sh,
        tooltipFilter: sh,
        needsRefresh: (e, t) => e ? t ? (i) => e(i) || t(i) : e : t,
        hideOn: (e, t) => e ? t ? (i, s, r) => e(i, s, r) || t(i, s, r) : e : t,
        autoPanel: (e, t) => e || t
      })
    };
  }
});
function sh(n, e) {
  return n ? e ? (t, i) => e(n(t, i), i) : n : e;
}
function Uu(n) {
  let e = [];
  if (n)
    e: for (let { name: t } of n) {
      for (let i = 0; i < t.length; i++) {
        let s = t[i];
        if (/[a-zA-Z]/.test(s) && !e.some((r) => r.toLowerCase() == s.toLowerCase())) {
          e.push(s);
          continue e;
        }
      }
      e.push("");
    }
  return e;
}
function Yu(n, e, t) {
  var i;
  let s = t ? Uu(e.actions) : [];
  return G("li", { class: "cm-diagnostic cm-diagnostic-" + e.severity }, G("span", { class: "cm-diagnosticText" }, e.renderMessage ? e.renderMessage(n) : e.message), (i = e.actions) === null || i === void 0 ? void 0 : i.map((r, o) => {
    let O = !1, a = (u) => {
      if (u.preventDefault(), O)
        return;
      O = !0;
      let d = Dt(n.state.field(Ce).diagnostics, e);
      d && r.apply(n, d.from, d.to);
    }, { name: l } = r, h = s[o] ? l.indexOf(s[o]) : -1, c = h < 0 ? l : [
      l.slice(0, h),
      G("u", l.slice(h, h + 1)),
      l.slice(h + 1)
    ], f = r.markClass ? " " + r.markClass : "";
    return G("button", {
      type: "button",
      class: "cm-diagnosticAction" + f,
      onclick: a,
      onmousedown: a,
      "aria-label": ` Action: ${l}${h < 0 ? "" : ` (access key "${s[o]})"`}.`
    }, c);
  }), e.source && G("div", { class: "cm-diagnosticSource" }, e.source));
}
class ZS extends Pt {
  constructor(e) {
    super(), this.sev = e;
  }
  eq(e) {
    return e.sev == this.sev;
  }
  toDOM() {
    return G("span", { class: "cm-lintPoint cm-lintPoint-" + this.sev });
  }
}
class rh {
  constructor(e, t) {
    this.diagnostic = t, this.id = "item_" + Math.floor(Math.random() * 4294967295).toString(16), this.dom = Yu(e, t, !0), this.dom.id = this.id, this.dom.setAttribute("role", "option");
  }
}
class Un {
  constructor(e) {
    this.view = e, this.items = [];
    let t = (s) => {
      if (!(s.ctrlKey || s.altKey || s.metaKey)) {
        if (s.keyCode == 27)
          nh(this.view), this.view.focus();
        else if (s.keyCode == 38 || s.keyCode == 33)
          this.moveSelection((this.selectedIndex - 1 + this.items.length) % this.items.length);
        else if (s.keyCode == 40 || s.keyCode == 34)
          this.moveSelection((this.selectedIndex + 1) % this.items.length);
        else if (s.keyCode == 36)
          this.moveSelection(0);
        else if (s.keyCode == 35)
          this.moveSelection(this.items.length - 1);
        else if (s.keyCode == 13)
          this.view.focus();
        else if (s.keyCode >= 65 && s.keyCode <= 90 && this.selectedIndex >= 0) {
          let { diagnostic: r } = this.items[this.selectedIndex], o = Uu(r.actions);
          for (let O = 0; O < o.length; O++)
            if (o[O].toUpperCase().charCodeAt(0) == s.keyCode) {
              let a = Dt(this.view.state.field(Ce).diagnostics, r);
              a && r.actions[O].apply(e, a.from, a.to);
            }
        } else
          return;
        s.preventDefault();
      }
    }, i = (s) => {
      for (let r = 0; r < this.items.length; r++)
        this.items[r].dom.contains(s.target) && this.moveSelection(r);
    };
    this.list = G("ul", {
      tabIndex: 0,
      role: "listbox",
      "aria-label": this.view.state.phrase("Diagnostics"),
      onkeydown: t,
      onclick: i
    }), this.dom = G("div", { class: "cm-panel-lint" }, this.list, G("button", {
      type: "button",
      name: "close",
      "aria-label": this.view.state.phrase("close"),
      onclick: () => nh(this.view)
    }, "×")), this.update();
  }
  get selectedIndex() {
    let e = this.view.state.field(Ce).selected;
    if (!e)
      return -1;
    for (let t = 0; t < this.items.length; t++)
      if (this.items[t].diagnostic == e.diagnostic)
        return t;
    return -1;
  }
  update() {
    let { diagnostics: e, selected: t } = this.view.state.field(Ce), i = 0, s = !1, r = null, o = /* @__PURE__ */ new Set();
    for (e.between(0, this.view.state.doc.length, (O, a, { spec: l }) => {
      for (let h of l.diagnostics) {
        if (o.has(h))
          continue;
        o.add(h);
        let c = -1, f;
        for (let u = i; u < this.items.length; u++)
          if (this.items[u].diagnostic == h) {
            c = u;
            break;
          }
        c < 0 ? (f = new rh(this.view, h), this.items.splice(i, 0, f), s = !0) : (f = this.items[c], c > i && (this.items.splice(i, c - i), s = !0)), t && f.diagnostic == t.diagnostic ? f.dom.hasAttribute("aria-selected") || (f.dom.setAttribute("aria-selected", "true"), r = f) : f.dom.hasAttribute("aria-selected") && f.dom.removeAttribute("aria-selected"), i++;
      }
    }); i < this.items.length && !(this.items.length == 1 && this.items[0].diagnostic.from < 0); )
      s = !0, this.items.pop();
    this.items.length == 0 && (this.items.push(new rh(this.view, {
      from: -1,
      to: -1,
      severity: "info",
      message: this.view.state.phrase("No diagnostics")
    })), s = !0), r ? (this.list.setAttribute("aria-activedescendant", r.id), this.view.requestMeasure({
      key: this,
      read: () => ({ sel: r.dom.getBoundingClientRect(), panel: this.list.getBoundingClientRect() }),
      write: ({ sel: O, panel: a }) => {
        let l = a.height / this.list.offsetHeight;
        O.top < a.top ? this.list.scrollTop -= (a.top - O.top) / l : O.bottom > a.bottom && (this.list.scrollTop += (O.bottom - a.bottom) / l);
      }
    })) : this.selectedIndex < 0 && this.list.removeAttribute("aria-activedescendant"), s && this.sync();
  }
  sync() {
    let e = this.list.firstChild;
    function t() {
      let i = e;
      e = i.nextSibling, i.remove();
    }
    for (let i of this.items)
      if (i.dom.parentNode == this.list) {
        for (; e != i.dom; )
          t();
        e = i.dom.nextSibling;
      } else
        this.list.insertBefore(i.dom, e);
    for (; e; )
      t();
  }
  moveSelection(e) {
    if (this.selectedIndex < 0)
      return;
    let t = this.view.state.field(Ce), i = Dt(t.diagnostics, this.items[e].diagnostic);
    i && this.view.dispatch({
      selection: { anchor: i.from, head: i.to },
      scrollIntoView: !0,
      effects: Tu.of(i)
    });
  }
  static open(e) {
    return new Un(e);
  }
}
function vS(n, e = 'viewBox="0 0 40 40"') {
  return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${e}>${encodeURIComponent(n)}</svg>')`;
}
function ps(n) {
  return vS(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${n}" fill="none" stroke-width=".7"/>`, 'width="6" height="3"');
}
const TS = /* @__PURE__ */ Z.baseTheme({
  ".cm-diagnostic": {
    padding: "3px 6px 3px 8px",
    marginLeft: "-1px",
    display: "block",
    whiteSpace: "pre-wrap"
  },
  ".cm-diagnostic-error": { borderLeft: "5px solid #d11" },
  ".cm-diagnostic-warning": { borderLeft: "5px solid orange" },
  ".cm-diagnostic-info": { borderLeft: "5px solid #999" },
  ".cm-diagnostic-hint": { borderLeft: "5px solid #66d" },
  ".cm-diagnosticAction": {
    font: "inherit",
    border: "none",
    padding: "2px 4px",
    backgroundColor: "#444",
    color: "white",
    borderRadius: "3px",
    marginLeft: "8px",
    cursor: "pointer"
  },
  ".cm-diagnosticSource": {
    fontSize: "70%",
    opacity: 0.7
  },
  ".cm-lintRange": {
    backgroundPosition: "left bottom",
    backgroundRepeat: "repeat-x",
    paddingBottom: "0.7px"
  },
  ".cm-lintRange-error": { backgroundImage: /* @__PURE__ */ ps("#f11") },
  ".cm-lintRange-warning": { backgroundImage: /* @__PURE__ */ ps("orange") },
  ".cm-lintRange-info": { backgroundImage: /* @__PURE__ */ ps("#999") },
  ".cm-lintRange-hint": { backgroundImage: /* @__PURE__ */ ps("#66d") },
  ".cm-lintRange-active": { backgroundColor: "#ffdd9980" },
  ".cm-tooltip-lint": {
    padding: 0,
    margin: 0
  },
  ".cm-lintPoint": {
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "-2px",
      borderLeft: "3px solid transparent",
      borderRight: "3px solid transparent",
      borderBottom: "4px solid #d11"
    }
  },
  ".cm-lintPoint-warning": {
    "&:after": { borderBottomColor: "orange" }
  },
  ".cm-lintPoint-info": {
    "&:after": { borderBottomColor: "#999" }
  },
  ".cm-lintPoint-hint": {
    "&:after": { borderBottomColor: "#66d" }
  },
  ".cm-panel.cm-panel-lint": {
    position: "relative",
    "& ul": {
      maxHeight: "100px",
      overflowY: "auto",
      "& [aria-selected]": {
        backgroundColor: "#ddd",
        "& u": { textDecoration: "underline" }
      },
      "&:focus [aria-selected]": {
        background_fallback: "#bdf",
        backgroundColor: "Highlight",
        color_fallback: "white",
        color: "HighlightText"
      },
      "& u": { textDecoration: "none" },
      padding: 0,
      margin: 0
    },
    "& [name=close]": {
      position: "absolute",
      top: "0",
      right: "2px",
      background: "inherit",
      border: "none",
      font: "inherit",
      padding: 0,
      margin: 0
    }
  },
  "&dark .cm-lintRange-active": { backgroundColor: "#86714a80" },
  "&dark .cm-panel.cm-panel-lint ul": {
    "& [aria-selected]": {
      backgroundColor: "#2e343e"
    }
  }
});
function US(n) {
  return n == "error" ? 4 : n == "warning" ? 3 : n == "info" ? 2 : 1;
}
function YS(n) {
  let e = "hint", t = 1;
  for (let i of n) {
    let s = US(i.severity);
    s > t && (t = s, e = i.severity);
  }
  return e;
}
const Ru = /* @__PURE__ */ dg(XS, { hideOn: PS }), RS = [
  Ce,
  /* @__PURE__ */ Z.decorations.compute([Ce], (n) => {
    let { selected: e, panel: t } = n.field(Ce);
    return !e || !t || e.from == e.to ? Y.none : Y.set([
      xS.range(e.from, e.to)
    ]);
  }),
  Ru,
  TS
], _S = [
  Zg(),
  Ug(),
  Lm(),
  GQ(),
  gQ(),
  Rm(),
  Wm(),
  A.allowMultipleSelections.of(!0),
  sQ(),
  Zf(SQ, { fallback: !0 }),
  ZQ(),
  OS(),
  QS(),
  ng(),
  og(),
  Hm(),
  J$(),
  dr.of([
    ...cS,
    ...B$,
    ...PP,
    ...JQ,
    ...uQ,
    ...Zu,
    ...kS
  ])
];
class Js {
  /**
  @internal
  */
  constructor(e, t, i, s, r, o, O, a, l, h = 0, c) {
    this.p = e, this.stack = t, this.state = i, this.reducePos = s, this.pos = r, this.score = o, this.buffer = O, this.bufferBase = a, this.curContext = l, this.lookAhead = h, this.parent = c;
  }
  /**
  @internal
  */
  toString() {
    return `[${this.stack.filter((e, t) => t % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
  }
  // Start an empty stack
  /**
  @internal
  */
  static start(e, t, i = 0) {
    let s = e.parser.context;
    return new Js(e, [], t, i, i, 0, [], 0, s ? new oh(s, s.start) : null, 0, null);
  }
  /**
  The stack's current [context](#lr.ContextTracker) value, if
  any. Its type will depend on the context tracker's type
  parameter, or it will be `null` if there is no context
  tracker.
  */
  get context() {
    return this.curContext ? this.curContext.context : null;
  }
  // Push a state onto the stack, tracking its start position as well
  // as the buffer base at that point.
  /**
  @internal
  */
  pushState(e, t) {
    this.stack.push(this.state, t, this.bufferBase + this.buffer.length), this.state = e;
  }
  // Apply a reduce action
  /**
  @internal
  */
  reduce(e) {
    var t;
    let i = e >> 19, s = e & 65535, { parser: r } = this.p, o = this.reducePos < this.pos - 25 && this.setLookAhead(this.pos), O = r.dynamicPrecedence(s);
    if (O && (this.score += O), i == 0) {
      s < r.minRepeatTerm && this.reducePos < this.pos && (this.reducePos = this.pos), this.pushState(r.getGoto(this.state, s, !0), this.reducePos), s < r.minRepeatTerm && this.storeNode(s, this.reducePos, this.reducePos, o ? 8 : 4, !0), this.reduceContext(s, this.reducePos);
      return;
    }
    let a = this.stack.length - (i - 1) * 3 - (e & 262144 ? 6 : 0), l = a ? this.stack[a - 2] : this.p.ranges[0].from;
    s < r.minRepeatTerm && l == this.reducePos && this.reducePos < this.pos && (this.reducePos = this.pos);
    let h = this.reducePos - l;
    h >= 2e3 && !(!((t = this.p.parser.nodeSet.types[s]) === null || t === void 0) && t.isAnonymous) && (l == this.p.lastBigReductionStart ? (this.p.bigReductionCount++, this.p.lastBigReductionSize = h) : this.p.lastBigReductionSize < h && (this.p.bigReductionCount = 1, this.p.lastBigReductionStart = l, this.p.lastBigReductionSize = h));
    let c = a ? this.stack[a - 1] : 0, f = this.bufferBase + this.buffer.length - c;
    if (s < r.minRepeatTerm || e & 131072) {
      let u = r.stateFlag(
        this.state,
        1
        /* StateFlag.Skipped */
      ) ? this.pos : this.reducePos;
      this.storeNode(s, l, u, f + 4, !0);
    }
    if (e & 262144)
      this.state = this.stack[a];
    else {
      let u = this.stack[a - 3];
      this.state = r.getGoto(u, s, !0);
    }
    for (; this.stack.length > a; )
      this.stack.pop();
    this.reduceContext(s, l);
  }
  // Shift a value into the buffer
  /**
  @internal
  */
  storeNode(e, t, i, s = 4, r = !1) {
    if (e == 0 && (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
      let o = this.buffer.length;
      if (o > 0 && this.buffer[o - 4] == 0 && this.buffer[o - 1] > -1) {
        if (t == i)
          return;
        if (this.buffer[o - 2] >= t) {
          this.buffer[o - 2] = i;
          return;
        }
      }
    }
    if (!r || this.pos == i)
      this.buffer.push(e, t, i, s);
    else {
      let o = this.buffer.length;
      if (o > 0 && (this.buffer[o - 4] != 0 || this.buffer[o - 1] < 0)) {
        let O = !1;
        for (let a = o; a > 0 && this.buffer[a - 2] > i; a -= 4)
          if (this.buffer[a - 1] >= 0) {
            O = !0;
            break;
          }
        if (O)
          for (; o > 0 && this.buffer[o - 2] > i; )
            this.buffer[o] = this.buffer[o - 4], this.buffer[o + 1] = this.buffer[o - 3], this.buffer[o + 2] = this.buffer[o - 2], this.buffer[o + 3] = this.buffer[o - 1], o -= 4, s > 4 && (s -= 4);
      }
      this.buffer[o] = e, this.buffer[o + 1] = t, this.buffer[o + 2] = i, this.buffer[o + 3] = s;
    }
  }
  // Apply a shift action
  /**
  @internal
  */
  shift(e, t, i, s) {
    if (e & 131072)
      this.pushState(e & 65535, this.pos);
    else if (e & 262144)
      this.pos = s, this.shiftContext(t, i), t <= this.p.parser.maxNode && this.buffer.push(t, i, s, 4);
    else {
      let r = e, { parser: o } = this.p;
      this.pos = s;
      let O = o.stateFlag(
        r,
        1
        /* StateFlag.Skipped */
      );
      !O && (s > i || t <= o.maxNode) && (this.reducePos = s), this.pushState(r, O ? i : Math.min(i, this.reducePos)), this.shiftContext(t, i), t <= o.maxNode && this.buffer.push(t, i, s, 4);
    }
  }
  // Apply an action
  /**
  @internal
  */
  apply(e, t, i, s) {
    e & 65536 ? this.reduce(e) : this.shift(e, t, i, s);
  }
  // Add a prebuilt (reused) node into the buffer.
  /**
  @internal
  */
  useNode(e, t) {
    let i = this.p.reused.length - 1;
    (i < 0 || this.p.reused[i] != e) && (this.p.reused.push(e), i++);
    let s = this.pos;
    this.reducePos = this.pos = s + e.length, this.pushState(t, s), this.buffer.push(
      i,
      s,
      this.reducePos,
      -1
      /* size == -1 means this is a reused value */
    ), this.curContext && this.updateContext(this.curContext.tracker.reuse(this.curContext.context, e, this, this.p.stream.reset(this.pos - e.length)));
  }
  // Split the stack. Due to the buffer sharing and the fact
  // that `this.stack` tends to stay quite shallow, this isn't very
  // expensive.
  /**
  @internal
  */
  split() {
    let e = this, t = e.buffer.length;
    for (t && e.buffer[t - 4] == 0 && (t -= 4); t > 0 && e.buffer[t - 2] > e.reducePos; )
      t -= 4;
    let i = e.buffer.slice(t), s = e.bufferBase + t;
    for (; e && s == e.bufferBase; )
      e = e.parent;
    return new Js(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, i, s, this.curContext, this.lookAhead, e);
  }
  // Try to recover from an error by 'deleting' (ignoring) one token.
  /**
  @internal
  */
  recoverByDelete(e, t) {
    let i = e <= this.p.parser.maxNode;
    i && this.storeNode(e, this.pos, t, 4), this.storeNode(0, this.pos, t, i ? 8 : 4), this.pos = this.reducePos = t, this.score -= 190;
  }
  /**
  Check if the given term would be able to be shifted (optionally
  after some reductions) on this stack. This can be useful for
  external tokenizers that want to make sure they only provide a
  given token when it applies.
  */
  canShift(e) {
    for (let t = new qS(this); ; ) {
      let i = this.p.parser.stateSlot(
        t.state,
        4
        /* ParseState.DefaultReduce */
      ) || this.p.parser.hasAction(t.state, e);
      if (i == 0)
        return !1;
      if (!(i & 65536))
        return !0;
      t.reduce(i);
    }
  }
  // Apply up to Recover.MaxNext recovery actions that conceptually
  // inserts some missing token or rule.
  /**
  @internal
  */
  recoverByInsert(e) {
    if (this.stack.length >= 300)
      return [];
    let t = this.p.parser.nextStates(this.state);
    if (t.length > 8 || this.stack.length >= 120) {
      let s = [];
      for (let r = 0, o; r < t.length; r += 2)
        (o = t[r + 1]) != this.state && this.p.parser.hasAction(o, e) && s.push(t[r], o);
      if (this.stack.length < 120)
        for (let r = 0; s.length < 8 && r < t.length; r += 2) {
          let o = t[r + 1];
          s.some((O, a) => a & 1 && O == o) || s.push(t[r], o);
        }
      t = s;
    }
    let i = [];
    for (let s = 0; s < t.length && i.length < 4; s += 2) {
      let r = t[s + 1];
      if (r == this.state)
        continue;
      let o = this.split();
      o.pushState(r, this.pos), o.storeNode(0, o.pos, o.pos, 4, !0), o.shiftContext(t[s], this.pos), o.reducePos = this.pos, o.score -= 200, i.push(o);
    }
    return i;
  }
  // Force a reduce, if possible. Return false if that can't
  // be done.
  /**
  @internal
  */
  forceReduce() {
    let { parser: e } = this.p, t = e.stateSlot(
      this.state,
      5
      /* ParseState.ForcedReduce */
    );
    if (!(t & 65536))
      return !1;
    if (!e.validAction(this.state, t)) {
      let i = t >> 19, s = t & 65535, r = this.stack.length - i * 3;
      if (r < 0 || e.getGoto(this.stack[r], s, !1) < 0) {
        let o = this.findForcedReduction();
        if (o == null)
          return !1;
        t = o;
      }
      this.storeNode(0, this.pos, this.pos, 4, !0), this.score -= 100;
    }
    return this.reducePos = this.pos, this.reduce(t), !0;
  }
  /**
  Try to scan through the automaton to find some kind of reduction
  that can be applied. Used when the regular ForcedReduce field
  isn't a valid action. @internal
  */
  findForcedReduction() {
    let { parser: e } = this.p, t = [], i = (s, r) => {
      if (!t.includes(s))
        return t.push(s), e.allActions(s, (o) => {
          if (!(o & 393216)) if (o & 65536) {
            let O = (o >> 19) - r;
            if (O > 1) {
              let a = o & 65535, l = this.stack.length - O * 3;
              if (l >= 0 && e.getGoto(this.stack[l], a, !1) >= 0)
                return O << 19 | 65536 | a;
            }
          } else {
            let O = i(o, r + 1);
            if (O != null)
              return O;
          }
        });
    };
    return i(this.state, 0);
  }
  /**
  @internal
  */
  forceAll() {
    for (; !this.p.parser.stateFlag(
      this.state,
      2
      /* StateFlag.Accepting */
    ); )
      if (!this.forceReduce()) {
        this.storeNode(0, this.pos, this.pos, 4, !0);
        break;
      }
    return this;
  }
  /**
  Check whether this state has no further actions (assumed to be a direct descendant of the
  top state, since any other states must be able to continue
  somehow). @internal
  */
  get deadEnd() {
    if (this.stack.length != 3)
      return !1;
    let { parser: e } = this.p;
    return e.data[e.stateSlot(
      this.state,
      1
      /* ParseState.Actions */
    )] == 65535 && !e.stateSlot(
      this.state,
      4
      /* ParseState.DefaultReduce */
    );
  }
  /**
  Restart the stack (put it back in its start state). Only safe
  when this.stack.length == 3 (state is directly below the top
  state). @internal
  */
  restart() {
    this.storeNode(0, this.pos, this.pos, 4, !0), this.state = this.stack[0], this.stack.length = 0;
  }
  /**
  @internal
  */
  sameState(e) {
    if (this.state != e.state || this.stack.length != e.stack.length)
      return !1;
    for (let t = 0; t < this.stack.length; t += 3)
      if (this.stack[t] != e.stack[t])
        return !1;
    return !0;
  }
  /**
  Get the parser used by this stack.
  */
  get parser() {
    return this.p.parser;
  }
  /**
  Test whether a given dialect (by numeric ID, as exported from
  the terms file) is enabled.
  */
  dialectEnabled(e) {
    return this.p.parser.dialect.flags[e];
  }
  shiftContext(e, t) {
    this.curContext && this.updateContext(this.curContext.tracker.shift(this.curContext.context, e, this, this.p.stream.reset(t)));
  }
  reduceContext(e, t) {
    this.curContext && this.updateContext(this.curContext.tracker.reduce(this.curContext.context, e, this, this.p.stream.reset(t)));
  }
  /**
  @internal
  */
  emitContext() {
    let e = this.buffer.length - 1;
    (e < 0 || this.buffer[e] != -3) && this.buffer.push(this.curContext.hash, this.pos, this.pos, -3);
  }
  /**
  @internal
  */
  emitLookAhead() {
    let e = this.buffer.length - 1;
    (e < 0 || this.buffer[e] != -4) && this.buffer.push(this.lookAhead, this.pos, this.pos, -4);
  }
  updateContext(e) {
    if (e != this.curContext.context) {
      let t = new oh(this.curContext.tracker, e);
      t.hash != this.curContext.hash && this.emitContext(), this.curContext = t;
    }
  }
  /**
  @internal
  */
  setLookAhead(e) {
    return e <= this.lookAhead ? !1 : (this.emitLookAhead(), this.lookAhead = e, !0);
  }
  /**
  @internal
  */
  close() {
    this.curContext && this.curContext.tracker.strict && this.emitContext(), this.lookAhead > 0 && this.emitLookAhead();
  }
}
class oh {
  constructor(e, t) {
    this.tracker = e, this.context = t, this.hash = e.strict ? e.hash(t) : 0;
  }
}
class qS {
  constructor(e) {
    this.start = e, this.state = e.state, this.stack = e.stack, this.base = this.stack.length;
  }
  reduce(e) {
    let t = e & 65535, i = e >> 19;
    i == 0 ? (this.stack == this.start.stack && (this.stack = this.stack.slice()), this.stack.push(this.state, 0, 0), this.base += 3) : this.base -= (i - 1) * 3;
    let s = this.start.p.parser.getGoto(this.stack[this.base - 3], t, !0);
    this.state = s;
  }
}
class er {
  constructor(e, t, i) {
    this.stack = e, this.pos = t, this.index = i, this.buffer = e.buffer, this.index == 0 && this.maybeNext();
  }
  static create(e, t = e.bufferBase + e.buffer.length) {
    return new er(e, t, t - e.bufferBase);
  }
  maybeNext() {
    let e = this.stack.parent;
    e != null && (this.index = this.stack.bufferBase - e.bufferBase, this.stack = e, this.buffer = e.buffer);
  }
  get id() {
    return this.buffer[this.index - 4];
  }
  get start() {
    return this.buffer[this.index - 3];
  }
  get end() {
    return this.buffer[this.index - 2];
  }
  get size() {
    return this.buffer[this.index - 1];
  }
  next() {
    this.index -= 4, this.pos -= 4, this.index == 0 && this.maybeNext();
  }
  fork() {
    return new er(this.stack, this.pos, this.index);
  }
}
function on(n, e = Uint16Array) {
  if (typeof n != "string")
    return n;
  let t = null;
  for (let i = 0, s = 0; i < n.length; ) {
    let r = 0;
    for (; ; ) {
      let o = n.charCodeAt(i++), O = !1;
      if (o == 126) {
        r = 65535;
        break;
      }
      o >= 92 && o--, o >= 34 && o--;
      let a = o - 32;
      if (a >= 46 && (a -= 46, O = !0), r += a, O)
        break;
      r *= 46;
    }
    t ? t[s++] = r : t = new e(r);
  }
  return t;
}
class ws {
  constructor() {
    this.start = -1, this.value = -1, this.end = -1, this.extended = -1, this.lookAhead = 0, this.mask = 0, this.context = 0;
  }
}
const Oh = new ws();
class VS {
  /**
  @internal
  */
  constructor(e, t) {
    this.input = e, this.ranges = t, this.chunk = "", this.chunkOff = 0, this.chunk2 = "", this.chunk2Pos = 0, this.next = -1, this.token = Oh, this.rangeIndex = 0, this.pos = this.chunkPos = t[0].from, this.range = t[0], this.end = t[t.length - 1].to, this.readNext();
  }
  /**
  @internal
  */
  resolveOffset(e, t) {
    let i = this.range, s = this.rangeIndex, r = this.pos + e;
    for (; r < i.from; ) {
      if (!s)
        return null;
      let o = this.ranges[--s];
      r -= i.from - o.to, i = o;
    }
    for (; t < 0 ? r > i.to : r >= i.to; ) {
      if (s == this.ranges.length - 1)
        return null;
      let o = this.ranges[++s];
      r += o.from - i.to, i = o;
    }
    return r;
  }
  /**
  @internal
  */
  clipPos(e) {
    if (e >= this.range.from && e < this.range.to)
      return e;
    for (let t of this.ranges)
      if (t.to > e)
        return Math.max(e, t.from);
    return this.end;
  }
  /**
  Look at a code unit near the stream position. `.peek(0)` equals
  `.next`, `.peek(-1)` gives you the previous character, and so
  on.
  
  Note that looking around during tokenizing creates dependencies
  on potentially far-away content, which may reduce the
  effectiveness incremental parsing—when looking forward—or even
  cause invalid reparses when looking backward more than 25 code
  units, since the library does not track lookbehind.
  */
  peek(e) {
    let t = this.chunkOff + e, i, s;
    if (t >= 0 && t < this.chunk.length)
      i = this.pos + e, s = this.chunk.charCodeAt(t);
    else {
      let r = this.resolveOffset(e, 1);
      if (r == null)
        return -1;
      if (i = r, i >= this.chunk2Pos && i < this.chunk2Pos + this.chunk2.length)
        s = this.chunk2.charCodeAt(i - this.chunk2Pos);
      else {
        let o = this.rangeIndex, O = this.range;
        for (; O.to <= i; )
          O = this.ranges[++o];
        this.chunk2 = this.input.chunk(this.chunk2Pos = i), i + this.chunk2.length > O.to && (this.chunk2 = this.chunk2.slice(0, O.to - i)), s = this.chunk2.charCodeAt(0);
      }
    }
    return i >= this.token.lookAhead && (this.token.lookAhead = i + 1), s;
  }
  /**
  Accept a token. By default, the end of the token is set to the
  current stream position, but you can pass an offset (relative to
  the stream position) to change that.
  */
  acceptToken(e, t = 0) {
    let i = t ? this.resolveOffset(t, -1) : this.pos;
    if (i == null || i < this.token.start)
      throw new RangeError("Token end out of bounds");
    this.token.value = e, this.token.end = i;
  }
  /**
  Accept a token ending at a specific given position.
  */
  acceptTokenTo(e, t) {
    this.token.value = e, this.token.end = t;
  }
  getChunk() {
    if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
      let { chunk: e, chunkPos: t } = this;
      this.chunk = this.chunk2, this.chunkPos = this.chunk2Pos, this.chunk2 = e, this.chunk2Pos = t, this.chunkOff = this.pos - this.chunkPos;
    } else {
      this.chunk2 = this.chunk, this.chunk2Pos = this.chunkPos;
      let e = this.input.chunk(this.pos), t = this.pos + e.length;
      this.chunk = t > this.range.to ? e.slice(0, this.range.to - this.pos) : e, this.chunkPos = this.pos, this.chunkOff = 0;
    }
  }
  readNext() {
    return this.chunkOff >= this.chunk.length && (this.getChunk(), this.chunkOff == this.chunk.length) ? this.next = -1 : this.next = this.chunk.charCodeAt(this.chunkOff);
  }
  /**
  Move the stream forward N (defaults to 1) code units. Returns
  the new value of [`next`](#lr.InputStream.next).
  */
  advance(e = 1) {
    for (this.chunkOff += e; this.pos + e >= this.range.to; ) {
      if (this.rangeIndex == this.ranges.length - 1)
        return this.setDone();
      e -= this.range.to - this.pos, this.range = this.ranges[++this.rangeIndex], this.pos = this.range.from;
    }
    return this.pos += e, this.pos >= this.token.lookAhead && (this.token.lookAhead = this.pos + 1), this.readNext();
  }
  setDone() {
    return this.pos = this.chunkPos = this.end, this.range = this.ranges[this.rangeIndex = this.ranges.length - 1], this.chunk = "", this.next = -1;
  }
  /**
  @internal
  */
  reset(e, t) {
    if (t ? (this.token = t, t.start = e, t.lookAhead = e + 1, t.value = t.extended = -1) : this.token = Oh, this.pos != e) {
      if (this.pos = e, e == this.end)
        return this.setDone(), this;
      for (; e < this.range.from; )
        this.range = this.ranges[--this.rangeIndex];
      for (; e >= this.range.to; )
        this.range = this.ranges[++this.rangeIndex];
      e >= this.chunkPos && e < this.chunkPos + this.chunk.length ? this.chunkOff = e - this.chunkPos : (this.chunk = "", this.chunkOff = 0), this.readNext();
    }
    return this;
  }
  /**
  @internal
  */
  read(e, t) {
    if (e >= this.chunkPos && t <= this.chunkPos + this.chunk.length)
      return this.chunk.slice(e - this.chunkPos, t - this.chunkPos);
    if (e >= this.chunk2Pos && t <= this.chunk2Pos + this.chunk2.length)
      return this.chunk2.slice(e - this.chunk2Pos, t - this.chunk2Pos);
    if (e >= this.range.from && t <= this.range.to)
      return this.input.read(e, t);
    let i = "";
    for (let s of this.ranges) {
      if (s.from >= t)
        break;
      s.to > e && (i += this.input.read(Math.max(s.from, e), Math.min(s.to, t)));
    }
    return i;
  }
}
class Yi {
  constructor(e, t) {
    this.data = e, this.id = t;
  }
  token(e, t) {
    let { parser: i } = t.p;
    _u(this.data, e, t, this.id, i.data, i.tokenPrecTable);
  }
}
Yi.prototype.contextual = Yi.prototype.fallback = Yi.prototype.extend = !1;
class tr {
  constructor(e, t, i) {
    this.precTable = t, this.elseToken = i, this.data = typeof e == "string" ? on(e) : e;
  }
  token(e, t) {
    let i = e.pos, s = 0;
    for (; ; ) {
      let r = e.next < 0, o = e.resolveOffset(1, 1);
      if (_u(this.data, e, t, 0, this.data, this.precTable), e.token.value > -1)
        break;
      if (this.elseToken == null)
        return;
      if (r || s++, o == null)
        break;
      e.reset(o, e.token);
    }
    s && (e.reset(i, e.token), e.acceptToken(this.elseToken, s));
  }
}
tr.prototype.contextual = Yi.prototype.fallback = Yi.prototype.extend = !1;
class di {
  /**
  Create a tokenizer. The first argument is the function that,
  given an input stream, scans for the types of tokens it
  recognizes at the stream's position, and calls
  [`acceptToken`](#lr.InputStream.acceptToken) when it finds
  one.
  */
  constructor(e, t = {}) {
    this.token = e, this.contextual = !!t.contextual, this.fallback = !!t.fallback, this.extend = !!t.extend;
  }
}
function _u(n, e, t, i, s, r) {
  let o = 0, O = 1 << i, { dialect: a } = t.p.parser;
  e: for (; O & n[o]; ) {
    let l = n[o + 1];
    for (let u = o + 3; u < l; u += 2)
      if ((n[u + 1] & O) > 0) {
        let d = n[u];
        if (a.allows(d) && (e.token.value == -1 || e.token.value == d || zS(d, e.token.value, s, r))) {
          e.acceptToken(d);
          break;
        }
      }
    let h = e.next, c = 0, f = n[o + 2];
    if (e.next < 0 && f > c && n[l + f * 3 - 3] == 65535) {
      o = n[l + f * 3 - 1];
      continue e;
    }
    for (; c < f; ) {
      let u = c + f >> 1, d = l + u + (u << 1), m = n[d], g = n[d + 1] || 65536;
      if (h < m)
        f = u;
      else if (h >= g)
        c = u + 1;
      else {
        o = n[d + 2], e.advance();
        continue e;
      }
    }
    break;
  }
}
function ah(n, e, t) {
  for (let i = e, s; (s = n[i]) != 65535; i++)
    if (s == t)
      return i - e;
  return -1;
}
function zS(n, e, t, i) {
  let s = ah(t, i, e);
  return s < 0 || ah(t, i, n) < s;
}
const Ve = typeof process < "u" && process.env && /\bparse\b/.test(process.env.LOG);
let ro = null;
function lh(n, e, t) {
  let i = n.cursor(H.IncludeAnonymous);
  for (i.moveTo(e); ; )
    if (!(t < 0 ? i.childBefore(e) : i.childAfter(e)))
      for (; ; ) {
        if ((t < 0 ? i.to < e : i.from > e) && !i.type.isError)
          return t < 0 ? Math.max(0, Math.min(
            i.to - 1,
            e - 25
            /* Lookahead.Margin */
          )) : Math.min(n.length, Math.max(
            i.from + 1,
            e + 25
            /* Lookahead.Margin */
          ));
        if (t < 0 ? i.prevSibling() : i.nextSibling())
          break;
        if (!i.parent())
          return t < 0 ? 0 : n.length;
      }
}
class CS {
  constructor(e, t) {
    this.fragments = e, this.nodeSet = t, this.i = 0, this.fragment = null, this.safeFrom = -1, this.safeTo = -1, this.trees = [], this.start = [], this.index = [], this.nextFragment();
  }
  nextFragment() {
    let e = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
    if (e) {
      for (this.safeFrom = e.openStart ? lh(e.tree, e.from + e.offset, 1) - e.offset : e.from, this.safeTo = e.openEnd ? lh(e.tree, e.to + e.offset, -1) - e.offset : e.to; this.trees.length; )
        this.trees.pop(), this.start.pop(), this.index.pop();
      this.trees.push(e.tree), this.start.push(-e.offset), this.index.push(0), this.nextStart = this.safeFrom;
    } else
      this.nextStart = 1e9;
  }
  // `pos` must be >= any previously given `pos` for this cursor
  nodeAt(e) {
    if (e < this.nextStart)
      return null;
    for (; this.fragment && this.safeTo <= e; )
      this.nextFragment();
    if (!this.fragment)
      return null;
    for (; ; ) {
      let t = this.trees.length - 1;
      if (t < 0)
        return this.nextFragment(), null;
      let i = this.trees[t], s = this.index[t];
      if (s == i.children.length) {
        this.trees.pop(), this.start.pop(), this.index.pop();
        continue;
      }
      let r = i.children[s], o = this.start[t] + i.positions[s];
      if (o > e)
        return this.nextStart = o, null;
      if (r instanceof te) {
        if (o == e) {
          if (o < this.safeFrom)
            return null;
          let O = o + r.length;
          if (O <= this.safeTo) {
            let a = r.prop(V.lookAhead);
            if (!a || O + a < this.fragment.to)
              return r;
          }
        }
        this.index[t]++, o + r.length >= Math.max(this.safeFrom, e) && (this.trees.push(r), this.start.push(o), this.index.push(0));
      } else
        this.index[t]++, this.nextStart = o + r.length;
    }
  }
}
class WS {
  constructor(e, t) {
    this.stream = t, this.tokens = [], this.mainToken = null, this.actions = [], this.tokens = e.tokenizers.map((i) => new ws());
  }
  getActions(e) {
    let t = 0, i = null, { parser: s } = e.p, { tokenizers: r } = s, o = s.stateSlot(
      e.state,
      3
      /* ParseState.TokenizerMask */
    ), O = e.curContext ? e.curContext.hash : 0, a = 0;
    for (let l = 0; l < r.length; l++) {
      if (!(1 << l & o))
        continue;
      let h = r[l], c = this.tokens[l];
      if (!(i && !h.fallback) && ((h.contextual || c.start != e.pos || c.mask != o || c.context != O) && (this.updateCachedToken(c, h, e), c.mask = o, c.context = O), c.lookAhead > c.end + 25 && (a = Math.max(c.lookAhead, a)), c.value != 0)) {
        let f = t;
        if (c.extended > -1 && (t = this.addActions(e, c.extended, c.end, t)), t = this.addActions(e, c.value, c.end, t), !h.extend && (i = c, t > f))
          break;
      }
    }
    for (; this.actions.length > t; )
      this.actions.pop();
    return a && e.setLookAhead(a), !i && e.pos == this.stream.end && (i = new ws(), i.value = e.p.parser.eofTerm, i.start = i.end = e.pos, t = this.addActions(e, i.value, i.end, t)), this.mainToken = i, this.actions;
  }
  getMainToken(e) {
    if (this.mainToken)
      return this.mainToken;
    let t = new ws(), { pos: i, p: s } = e;
    return t.start = i, t.end = Math.min(i + 1, s.stream.end), t.value = i == s.stream.end ? s.parser.eofTerm : 0, t;
  }
  updateCachedToken(e, t, i) {
    let s = this.stream.clipPos(i.pos);
    if (t.token(this.stream.reset(s, e), i), e.value > -1) {
      let { parser: r } = i.p;
      for (let o = 0; o < r.specialized.length; o++)
        if (r.specialized[o] == e.value) {
          let O = r.specializers[o](this.stream.read(e.start, e.end), i);
          if (O >= 0 && i.p.parser.dialect.allows(O >> 1)) {
            O & 1 ? e.extended = O >> 1 : e.value = O >> 1;
            break;
          }
        }
    } else
      e.value = 0, e.end = this.stream.clipPos(s + 1);
  }
  putAction(e, t, i, s) {
    for (let r = 0; r < s; r += 3)
      if (this.actions[r] == e)
        return s;
    return this.actions[s++] = e, this.actions[s++] = t, this.actions[s++] = i, s;
  }
  addActions(e, t, i, s) {
    let { state: r } = e, { parser: o } = e.p, { data: O } = o;
    for (let a = 0; a < 2; a++)
      for (let l = o.stateSlot(
        r,
        a ? 2 : 1
        /* ParseState.Actions */
      ); ; l += 3) {
        if (O[l] == 65535)
          if (O[l + 1] == 1)
            l = xt(O, l + 2);
          else {
            s == 0 && O[l + 1] == 2 && (s = this.putAction(xt(O, l + 2), t, i, s));
            break;
          }
        O[l] == t && (s = this.putAction(xt(O, l + 1), t, i, s));
      }
    return s;
  }
}
class jS {
  constructor(e, t, i, s) {
    this.parser = e, this.input = t, this.ranges = s, this.recovering = 0, this.nextStackID = 9812, this.minStackPos = 0, this.reused = [], this.stoppedAt = null, this.lastBigReductionStart = -1, this.lastBigReductionSize = 0, this.bigReductionCount = 0, this.stream = new VS(t, s), this.tokens = new WS(e, this.stream), this.topTerm = e.top[1];
    let { from: r } = s[0];
    this.stacks = [Js.start(this, e.top[0], r)], this.fragments = i.length && this.stream.end - r > e.bufferLength * 4 ? new CS(i, e.nodeSet) : null;
  }
  get parsedPos() {
    return this.minStackPos;
  }
  // Move the parser forward. This will process all parse stacks at
  // `this.pos` and try to advance them to a further position. If no
  // stack for such a position is found, it'll start error-recovery.
  //
  // When the parse is finished, this will return a syntax tree. When
  // not, it returns `null`.
  advance() {
    let e = this.stacks, t = this.minStackPos, i = this.stacks = [], s, r;
    if (this.bigReductionCount > 300 && e.length == 1) {
      let [o] = e;
      for (; o.forceReduce() && o.stack.length && o.stack[o.stack.length - 2] >= this.lastBigReductionStart; )
        ;
      this.bigReductionCount = this.lastBigReductionSize = 0;
    }
    for (let o = 0; o < e.length; o++) {
      let O = e[o];
      for (; ; ) {
        if (this.tokens.mainToken = null, O.pos > t)
          i.push(O);
        else {
          if (this.advanceStack(O, i, e))
            continue;
          {
            s || (s = [], r = []), s.push(O);
            let a = this.tokens.getMainToken(O);
            r.push(a.value, a.end);
          }
        }
        break;
      }
    }
    if (!i.length) {
      let o = s && MS(s);
      if (o)
        return Ve && console.log("Finish with " + this.stackID(o)), this.stackToTree(o);
      if (this.parser.strict)
        throw Ve && s && console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none")), new SyntaxError("No parse at " + t);
      this.recovering || (this.recovering = 5);
    }
    if (this.recovering && s) {
      let o = this.stoppedAt != null && s[0].pos > this.stoppedAt ? s[0] : this.runRecovery(s, r, i);
      if (o)
        return Ve && console.log("Force-finish " + this.stackID(o)), this.stackToTree(o.forceAll());
    }
    if (this.recovering) {
      let o = this.recovering == 1 ? 1 : this.recovering * 3;
      if (i.length > o)
        for (i.sort((O, a) => a.score - O.score); i.length > o; )
          i.pop();
      i.some((O) => O.reducePos > t) && this.recovering--;
    } else if (i.length > 1) {
      e: for (let o = 0; o < i.length - 1; o++) {
        let O = i[o];
        for (let a = o + 1; a < i.length; a++) {
          let l = i[a];
          if (O.sameState(l) || O.buffer.length > 500 && l.buffer.length > 500)
            if ((O.score - l.score || O.buffer.length - l.buffer.length) > 0)
              i.splice(a--, 1);
            else {
              i.splice(o--, 1);
              continue e;
            }
        }
      }
      i.length > 12 && (i.sort((o, O) => O.score - o.score), i.splice(
        12,
        i.length - 12
        /* Rec.MaxStackCount */
      ));
    }
    this.minStackPos = i[0].pos;
    for (let o = 1; o < i.length; o++)
      i[o].pos < this.minStackPos && (this.minStackPos = i[o].pos);
    return null;
  }
  stopAt(e) {
    if (this.stoppedAt != null && this.stoppedAt < e)
      throw new RangeError("Can't move stoppedAt forward");
    this.stoppedAt = e;
  }
  // Returns an updated version of the given stack, or null if the
  // stack can't advance normally. When `split` and `stacks` are
  // given, stacks split off by ambiguous operations will be pushed to
  // `split`, or added to `stacks` if they move `pos` forward.
  advanceStack(e, t, i) {
    let s = e.pos, { parser: r } = this, o = Ve ? this.stackID(e) + " -> " : "";
    if (this.stoppedAt != null && s > this.stoppedAt)
      return e.forceReduce() ? e : null;
    if (this.fragments) {
      let l = e.curContext && e.curContext.tracker.strict, h = l ? e.curContext.hash : 0;
      for (let c = this.fragments.nodeAt(s); c; ) {
        let f = this.parser.nodeSet.types[c.type.id] == c.type ? r.getGoto(e.state, c.type.id) : -1;
        if (f > -1 && c.length && (!l || (c.prop(V.contextHash) || 0) == h))
          return e.useNode(c, f), Ve && console.log(o + this.stackID(e) + ` (via reuse of ${r.getName(c.type.id)})`), !0;
        if (!(c instanceof te) || c.children.length == 0 || c.positions[0] > 0)
          break;
        let u = c.children[0];
        if (u instanceof te && c.positions[0] == 0)
          c = u;
        else
          break;
      }
    }
    let O = r.stateSlot(
      e.state,
      4
      /* ParseState.DefaultReduce */
    );
    if (O > 0)
      return e.reduce(O), Ve && console.log(o + this.stackID(e) + ` (via always-reduce ${r.getName(
        O & 65535
        /* Action.ValueMask */
      )})`), !0;
    if (e.stack.length >= 8400)
      for (; e.stack.length > 6e3 && e.forceReduce(); )
        ;
    let a = this.tokens.getActions(e);
    for (let l = 0; l < a.length; ) {
      let h = a[l++], c = a[l++], f = a[l++], u = l == a.length || !i, d = u ? e : e.split(), m = this.tokens.mainToken;
      if (d.apply(h, c, m ? m.start : d.pos, f), Ve && console.log(o + this.stackID(d) + ` (via ${h & 65536 ? `reduce of ${r.getName(
        h & 65535
        /* Action.ValueMask */
      )}` : "shift"} for ${r.getName(c)} @ ${s}${d == e ? "" : ", split"})`), u)
        return !0;
      d.pos > s ? t.push(d) : i.push(d);
    }
    return !1;
  }
  // Advance a given stack forward as far as it will go. Returns the
  // (possibly updated) stack if it got stuck, or null if it moved
  // forward and was given to `pushStackDedup`.
  advanceFully(e, t) {
    let i = e.pos;
    for (; ; ) {
      if (!this.advanceStack(e, null, null))
        return !1;
      if (e.pos > i)
        return hh(e, t), !0;
    }
  }
  runRecovery(e, t, i) {
    let s = null, r = !1;
    for (let o = 0; o < e.length; o++) {
      let O = e[o], a = t[o << 1], l = t[(o << 1) + 1], h = Ve ? this.stackID(O) + " -> " : "";
      if (O.deadEnd && (r || (r = !0, O.restart(), Ve && console.log(h + this.stackID(O) + " (restarted)"), this.advanceFully(O, i))))
        continue;
      let c = O.split(), f = h;
      for (let u = 0; u < 10 && c.forceReduce() && (Ve && console.log(f + this.stackID(c) + " (via force-reduce)"), !this.advanceFully(c, i)); u++)
        Ve && (f = this.stackID(c) + " -> ");
      for (let u of O.recoverByInsert(a))
        Ve && console.log(h + this.stackID(u) + " (via recover-insert)"), this.advanceFully(u, i);
      this.stream.end > O.pos ? (l == O.pos && (l++, a = 0), O.recoverByDelete(a, l), Ve && console.log(h + this.stackID(O) + ` (via recover-delete ${this.parser.getName(a)})`), hh(O, i)) : (!s || s.score < c.score) && (s = c);
    }
    return s;
  }
  // Convert the stack's buffer to a syntax tree.
  stackToTree(e) {
    return e.close(), te.build({
      buffer: er.create(e),
      nodeSet: this.parser.nodeSet,
      topID: this.topTerm,
      maxBufferLength: this.parser.bufferLength,
      reused: this.reused,
      start: this.ranges[0].from,
      length: e.pos - this.ranges[0].from,
      minRepeatType: this.parser.minRepeatTerm
    });
  }
  stackID(e) {
    let t = (ro || (ro = /* @__PURE__ */ new WeakMap())).get(e);
    return t || ro.set(e, t = String.fromCodePoint(this.nextStackID++)), t + e;
  }
}
function hh(n, e) {
  for (let t = 0; t < e.length; t++) {
    let i = e[t];
    if (i.pos == n.pos && i.sameState(n)) {
      e[t].score < n.score && (e[t] = n);
      return;
    }
  }
  e.push(n);
}
class AS {
  constructor(e, t, i) {
    this.source = e, this.flags = t, this.disabled = i;
  }
  allows(e) {
    return !this.disabled || this.disabled[e] == 0;
  }
}
const oo = (n) => n;
class ES {
  /**
  Define a context tracker.
  */
  constructor(e) {
    this.start = e.start, this.shift = e.shift || oo, this.reduce = e.reduce || oo, this.reuse = e.reuse || oo, this.hash = e.hash || (() => 0), this.strict = e.strict !== !1;
  }
}
class Mi extends uf {
  /**
  @internal
  */
  constructor(e) {
    if (super(), this.wrappers = [], e.version != 14)
      throw new RangeError(`Parser version (${e.version}) doesn't match runtime version (14)`);
    let t = e.nodeNames.split(" ");
    this.minRepeatTerm = t.length;
    for (let O = 0; O < e.repeatNodeCount; O++)
      t.push("");
    let i = Object.keys(e.topRules).map((O) => e.topRules[O][1]), s = [];
    for (let O = 0; O < t.length; O++)
      s.push([]);
    function r(O, a, l) {
      s[O].push([a, a.deserialize(String(l))]);
    }
    if (e.nodeProps)
      for (let O of e.nodeProps) {
        let a = O[0];
        typeof a == "string" && (a = V[a]);
        for (let l = 1; l < O.length; ) {
          let h = O[l++];
          if (h >= 0)
            r(h, a, O[l++]);
          else {
            let c = O[l + -h];
            for (let f = -h; f > 0; f--)
              r(O[l++], a, c);
            l++;
          }
        }
      }
    this.nodeSet = new CO(t.map((O, a) => Re.define({
      name: a >= this.minRepeatTerm ? void 0 : O,
      id: a,
      props: s[a],
      top: i.indexOf(a) > -1,
      error: a == 0,
      skipped: e.skippedNodes && e.skippedNodes.indexOf(a) > -1
    }))), e.propSources && (this.nodeSet = this.nodeSet.extend(...e.propSources)), this.strict = !1, this.bufferLength = lf;
    let o = on(e.tokenData);
    this.context = e.context, this.specializerSpecs = e.specialized || [], this.specialized = new Uint16Array(this.specializerSpecs.length);
    for (let O = 0; O < this.specializerSpecs.length; O++)
      this.specialized[O] = this.specializerSpecs[O].term;
    this.specializers = this.specializerSpecs.map(ch), this.states = on(e.states, Uint32Array), this.data = on(e.stateData), this.goto = on(e.goto), this.maxTerm = e.maxTerm, this.tokenizers = e.tokenizers.map((O) => typeof O == "number" ? new Yi(o, O) : O), this.topRules = e.topRules, this.dialects = e.dialects || {}, this.dynamicPrecedences = e.dynamicPrecedences || null, this.tokenPrecTable = e.tokenPrec, this.termNames = e.termNames || null, this.maxNode = this.nodeSet.types.length - 1, this.dialect = this.parseDialect(), this.top = this.topRules[Object.keys(this.topRules)[0]];
  }
  createParse(e, t, i) {
    let s = new jS(this, e, t, i);
    for (let r of this.wrappers)
      s = r(s, e, t, i);
    return s;
  }
  /**
  Get a goto table entry @internal
  */
  getGoto(e, t, i = !1) {
    let s = this.goto;
    if (t >= s[0])
      return -1;
    for (let r = s[t + 1]; ; ) {
      let o = s[r++], O = o & 1, a = s[r++];
      if (O && i)
        return a;
      for (let l = r + (o >> 1); r < l; r++)
        if (s[r] == e)
          return a;
      if (O)
        return -1;
    }
  }
  /**
  Check if this state has an action for a given terminal @internal
  */
  hasAction(e, t) {
    let i = this.data;
    for (let s = 0; s < 2; s++)
      for (let r = this.stateSlot(
        e,
        s ? 2 : 1
        /* ParseState.Actions */
      ), o; ; r += 3) {
        if ((o = i[r]) == 65535)
          if (i[r + 1] == 1)
            o = i[r = xt(i, r + 2)];
          else {
            if (i[r + 1] == 2)
              return xt(i, r + 2);
            break;
          }
        if (o == t || o == 0)
          return xt(i, r + 1);
      }
    return 0;
  }
  /**
  @internal
  */
  stateSlot(e, t) {
    return this.states[e * 6 + t];
  }
  /**
  @internal
  */
  stateFlag(e, t) {
    return (this.stateSlot(
      e,
      0
      /* ParseState.Flags */
    ) & t) > 0;
  }
  /**
  @internal
  */
  validAction(e, t) {
    return !!this.allActions(e, (i) => i == t ? !0 : null);
  }
  /**
  @internal
  */
  allActions(e, t) {
    let i = this.stateSlot(
      e,
      4
      /* ParseState.DefaultReduce */
    ), s = i ? t(i) : void 0;
    for (let r = this.stateSlot(
      e,
      1
      /* ParseState.Actions */
    ); s == null; r += 3) {
      if (this.data[r] == 65535)
        if (this.data[r + 1] == 1)
          r = xt(this.data, r + 2);
        else
          break;
      s = t(xt(this.data, r + 1));
    }
    return s;
  }
  /**
  Get the states that can follow this one through shift actions or
  goto jumps. @internal
  */
  nextStates(e) {
    let t = [];
    for (let i = this.stateSlot(
      e,
      1
      /* ParseState.Actions */
    ); ; i += 3) {
      if (this.data[i] == 65535)
        if (this.data[i + 1] == 1)
          i = xt(this.data, i + 2);
        else
          break;
      if (!(this.data[i + 2] & 1)) {
        let s = this.data[i + 1];
        t.some((r, o) => o & 1 && r == s) || t.push(this.data[i], s);
      }
    }
    return t;
  }
  /**
  Configure the parser. Returns a new parser instance that has the
  given settings modified. Settings not provided in `config` are
  kept from the original parser.
  */
  configure(e) {
    let t = Object.assign(Object.create(Mi.prototype), this);
    if (e.props && (t.nodeSet = this.nodeSet.extend(...e.props)), e.top) {
      let i = this.topRules[e.top];
      if (!i)
        throw new RangeError(`Invalid top rule name ${e.top}`);
      t.top = i;
    }
    return e.tokenizers && (t.tokenizers = this.tokenizers.map((i) => {
      let s = e.tokenizers.find((r) => r.from == i);
      return s ? s.to : i;
    })), e.specializers && (t.specializers = this.specializers.slice(), t.specializerSpecs = this.specializerSpecs.map((i, s) => {
      let r = e.specializers.find((O) => O.from == i.external);
      if (!r)
        return i;
      let o = Object.assign(Object.assign({}, i), { external: r.to });
      return t.specializers[s] = ch(o), o;
    })), e.contextTracker && (t.context = e.contextTracker), e.dialect && (t.dialect = this.parseDialect(e.dialect)), e.strict != null && (t.strict = e.strict), e.wrap && (t.wrappers = t.wrappers.concat(e.wrap)), e.bufferLength != null && (t.bufferLength = e.bufferLength), t;
  }
  /**
  Tells you whether any [parse wrappers](#lr.ParserConfig.wrap)
  are registered for this parser.
  */
  hasWrappers() {
    return this.wrappers.length > 0;
  }
  /**
  Returns the name associated with a given term. This will only
  work for all terms when the parser was generated with the
  `--names` option. By default, only the names of tagged terms are
  stored.
  */
  getName(e) {
    return this.termNames ? this.termNames[e] : String(e <= this.maxNode && this.nodeSet.types[e].name || e);
  }
  /**
  The eof term id is always allocated directly after the node
  types. @internal
  */
  get eofTerm() {
    return this.maxNode + 1;
  }
  /**
  The type of top node produced by the parser.
  */
  get topNode() {
    return this.nodeSet.types[this.top[1]];
  }
  /**
  @internal
  */
  dynamicPrecedence(e) {
    let t = this.dynamicPrecedences;
    return t == null ? 0 : t[e] || 0;
  }
  /**
  @internal
  */
  parseDialect(e) {
    let t = Object.keys(this.dialects), i = t.map(() => !1);
    if (e)
      for (let r of e.split(" ")) {
        let o = t.indexOf(r);
        o >= 0 && (i[o] = !0);
      }
    let s = null;
    for (let r = 0; r < t.length; r++)
      if (!i[r])
        for (let o = this.dialects[t[r]], O; (O = this.data[o++]) != 65535; )
          (s || (s = new Uint8Array(this.maxTerm + 1)))[O] = 1;
    return new AS(e, i, s);
  }
  /**
  Used by the output of the parser generator. Not available to
  user code. @hide
  */
  static deserialize(e) {
    return new Mi(e);
  }
}
function xt(n, e) {
  return n[e] | n[e + 1] << 16;
}
function MS(n) {
  let e = null;
  for (let t of n) {
    let i = t.p.stoppedAt;
    (t.pos == t.p.stream.end || i != null && t.pos > i) && t.p.parser.stateFlag(
      t.state,
      2
      /* StateFlag.Accepting */
    ) && (!e || e.score < t.score) && (e = t);
  }
  return e;
}
function ch(n) {
  if (n.external) {
    let e = n.extend ? 1 : 0;
    return (t, i) => n.external(t, i) << 1 | e;
  }
  return n.get;
}
const GS = 316, LS = 317, fh = 1, DS = 2, IS = 3, BS = 4, NS = 318, FS = 320, HS = 321, KS = 5, JS = 6, e0 = 0, oO = [
  9,
  10,
  11,
  12,
  13,
  32,
  133,
  160,
  5760,
  8192,
  8193,
  8194,
  8195,
  8196,
  8197,
  8198,
  8199,
  8200,
  8201,
  8202,
  8232,
  8233,
  8239,
  8287,
  12288
], qu = 125, t0 = 59, OO = 47, i0 = 42, n0 = 43, s0 = 45, r0 = 60, o0 = 44, O0 = 63, a0 = 46, l0 = 91, h0 = new ES({
  start: !1,
  shift(n, e) {
    return e == KS || e == JS || e == FS ? n : e == HS;
  },
  strict: !1
}), c0 = new di((n, e) => {
  let { next: t } = n;
  (t == qu || t == -1 || e.context) && n.acceptToken(NS);
}, { contextual: !0, fallback: !0 }), f0 = new di((n, e) => {
  let { next: t } = n, i;
  oO.indexOf(t) > -1 || t == OO && ((i = n.peek(1)) == OO || i == i0) || t != qu && t != t0 && t != -1 && !e.context && n.acceptToken(GS);
}, { contextual: !0 }), u0 = new di((n, e) => {
  n.next == l0 && !e.context && n.acceptToken(LS);
}, { contextual: !0 }), d0 = new di((n, e) => {
  let { next: t } = n;
  if (t == n0 || t == s0) {
    if (n.advance(), t == n.next) {
      n.advance();
      let i = !e.context && e.canShift(fh);
      n.acceptToken(i ? fh : DS);
    }
  } else t == O0 && n.peek(1) == a0 && (n.advance(), n.advance(), (n.next < 48 || n.next > 57) && n.acceptToken(IS));
}, { contextual: !0 });
function Oo(n, e) {
  return n >= 65 && n <= 90 || n >= 97 && n <= 122 || n == 95 || n >= 192 || !e && n >= 48 && n <= 57;
}
const p0 = new di((n, e) => {
  if (n.next != r0 || !e.dialectEnabled(e0) || (n.advance(), n.next == OO)) return;
  let t = 0;
  for (; oO.indexOf(n.next) > -1; )
    n.advance(), t++;
  if (Oo(n.next, !0)) {
    for (n.advance(), t++; Oo(n.next, !1); )
      n.advance(), t++;
    for (; oO.indexOf(n.next) > -1; )
      n.advance(), t++;
    if (n.next == o0) return;
    for (let i = 0; ; i++) {
      if (i == 7) {
        if (!Oo(n.next, !0)) return;
        break;
      }
      if (n.next != "extends".charCodeAt(i)) break;
      n.advance(), t++;
    }
  }
  n.acceptToken(BS, -t);
}), m0 = mr({
  "get set async static": p.modifier,
  "for while do if else switch try catch finally return throw break continue default case defer": p.controlKeyword,
  "in of await yield void typeof delete instanceof as satisfies": p.operatorKeyword,
  "let var const using function class extends": p.definitionKeyword,
  "import export from": p.moduleKeyword,
  "with debugger new": p.keyword,
  TemplateString: p.special(p.string),
  super: p.atom,
  BooleanLiteral: p.bool,
  this: p.self,
  null: p.null,
  Star: p.modifier,
  VariableName: p.variableName,
  "CallExpression/VariableName TaggedTemplateExpression/VariableName": p.function(p.variableName),
  VariableDefinition: p.definition(p.variableName),
  Label: p.labelName,
  PropertyName: p.propertyName,
  PrivatePropertyName: p.special(p.propertyName),
  "CallExpression/MemberExpression/PropertyName": p.function(p.propertyName),
  "FunctionDeclaration/VariableDefinition": p.function(p.definition(p.variableName)),
  "ClassDeclaration/VariableDefinition": p.definition(p.className),
  "NewExpression/VariableName": p.className,
  PropertyDefinition: p.definition(p.propertyName),
  PrivatePropertyDefinition: p.definition(p.special(p.propertyName)),
  UpdateOp: p.updateOperator,
  "LineComment Hashbang": p.lineComment,
  BlockComment: p.blockComment,
  Number: p.number,
  String: p.string,
  Escape: p.escape,
  ArithOp: p.arithmeticOperator,
  LogicOp: p.logicOperator,
  BitOp: p.bitwiseOperator,
  CompareOp: p.compareOperator,
  RegExp: p.regexp,
  Equals: p.definitionOperator,
  Arrow: p.function(p.punctuation),
  ": Spread": p.punctuation,
  "( )": p.paren,
  "[ ]": p.squareBracket,
  "{ }": p.brace,
  "InterpolationStart InterpolationEnd": p.special(p.brace),
  ".": p.derefOperator,
  ", ;": p.separator,
  "@": p.meta,
  TypeName: p.typeName,
  TypeDefinition: p.definition(p.typeName),
  "type enum interface implements namespace module declare": p.definitionKeyword,
  "abstract global Privacy readonly override": p.modifier,
  "is keyof unique infer asserts": p.operatorKeyword,
  JSXAttributeValue: p.attributeValue,
  JSXText: p.content,
  "JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag": p.angleBracket,
  "JSXIdentifier JSXNameSpacedName": p.tagName,
  "JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName": p.attributeName,
  "JSXBuiltin/JSXIdentifier": p.standard(p.tagName)
}), g0 = { __proto__: null, export: 20, as: 25, from: 33, default: 36, async: 41, function: 42, in: 52, out: 55, const: 56, extends: 60, this: 64, true: 72, false: 72, null: 84, void: 88, typeof: 92, super: 108, new: 142, delete: 154, yield: 163, await: 167, class: 172, public: 235, private: 235, protected: 235, readonly: 237, instanceof: 256, satisfies: 259, import: 292, keyof: 349, unique: 353, infer: 359, asserts: 395, is: 397, abstract: 417, implements: 419, type: 421, let: 424, var: 426, using: 429, interface: 435, enum: 439, namespace: 445, module: 447, declare: 451, global: 455, defer: 471, for: 476, of: 485, while: 488, with: 492, do: 496, if: 500, else: 502, switch: 506, case: 512, try: 518, catch: 522, finally: 526, return: 530, throw: 534, break: 538, continue: 542, debugger: 546 }, Q0 = { __proto__: null, async: 129, get: 131, set: 133, declare: 195, public: 197, private: 197, protected: 197, static: 199, abstract: 201, override: 203, readonly: 209, accessor: 211, new: 401 }, $0 = { __proto__: null, "<": 193 }, P0 = Mi.deserialize({
  version: 14,
  states: "$F|Q%TQlOOO%[QlOOO'_QpOOP(lO`OOO*zQ!0MxO'#CiO+RO#tO'#CjO+aO&jO'#CjO+oO#@ItO'#DaO.QQlO'#DgO.bQlO'#DrO%[QlO'#DzO0fQlO'#ESOOQ!0Lf'#E['#E[O1PQ`O'#EXOOQO'#Ep'#EpOOQO'#Il'#IlO1XQ`O'#GsO1dQ`O'#EoO1iQ`O'#EoO3hQ!0MxO'#JrO6[Q!0MxO'#JsO6uQ`O'#F]O6zQ,UO'#FtOOQ!0Lf'#Ff'#FfO7VO7dO'#FfO9XQMhO'#F|O9`Q`O'#F{OOQ!0Lf'#Js'#JsOOQ!0Lb'#Jr'#JrO9eQ`O'#GwOOQ['#K_'#K_O9pQ`O'#IYO9uQ!0LrO'#IZOOQ['#J`'#J`OOQ['#I_'#I_Q`QlOOQ`QlOOO9}Q!L^O'#DvO:UQlO'#EOO:]QlO'#EQO9kQ`O'#GsO:dQMhO'#CoO:rQ`O'#EnO:}Q`O'#EyO;hQMhO'#FeO;xQ`O'#GsOOQO'#K`'#K`O;}Q`O'#K`O<]Q`O'#G{O<]Q`O'#G|O<]Q`O'#HOO9kQ`O'#HRO=SQ`O'#HUO>kQ`O'#CeO>{Q`O'#HcO?TQ`O'#HiO?TQ`O'#HkO`QlO'#HmO?TQ`O'#HoO?TQ`O'#HrO?YQ`O'#HxO?_Q!0LsO'#IOO%[QlO'#IQO?jQ!0LsO'#ISO?uQ!0LsO'#IUO9uQ!0LrO'#IWO@QQ!0MxO'#CiOASQpO'#DlQOQ`OOO%[QlO'#EQOAjQ`O'#ETO:dQMhO'#EnOAuQ`O'#EnOBQQ!bO'#FeOOQ['#Cg'#CgOOQ!0Lb'#Dq'#DqOOQ!0Lb'#Jv'#JvO%[QlO'#JvOOQO'#Jy'#JyOOQO'#Ih'#IhOCQQpO'#EgOOQ!0Lb'#Ef'#EfOOQ!0Lb'#J}'#J}OC|Q!0MSO'#EgODWQpO'#EWOOQO'#Jx'#JxODlQpO'#JyOEyQpO'#EWODWQpO'#EgPFWO&2DjO'#CbPOOO)CD})CD}OOOO'#I`'#I`OFcO#tO,59UOOQ!0Lh,59U,59UOOOO'#Ia'#IaOFqO&jO,59UOGPQ!L^O'#DcOOOO'#Ic'#IcOGWO#@ItO,59{OOQ!0Lf,59{,59{OGfQlO'#IdOGyQ`O'#JtOIxQ!fO'#JtO+}QlO'#JtOJPQ`O,5:ROJgQ`O'#EpOJtQ`O'#KTOKPQ`O'#KSOKPQ`O'#KSOKXQ`O,5;^OK^Q`O'#KROOQ!0Ln,5:^,5:^OKeQlO,5:^OMcQ!0MxO,5:fONSQ`O,5:nONmQ!0LrO'#KQONtQ`O'#KPO9eQ`O'#KPO! YQ`O'#KPO! bQ`O,5;]O! gQ`O'#KPO!#lQ!fO'#JsOOQ!0Lh'#Ci'#CiO%[QlO'#ESO!$[Q!fO,5:sOOQS'#Jz'#JzOOQO-E<j-E<jO9kQ`O,5=_O!$rQ`O,5=_O!$wQlO,5;ZO!&zQMhO'#EkO!(eQ`O,5;ZO!(jQlO'#DyO!(tQpO,5;dO!(|QpO,5;dO%[QlO,5;dOOQ['#FT'#FTOOQ['#FV'#FVO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eOOQ['#FZ'#FZO!)[QlO,5;tOOQ!0Lf,5;y,5;yOOQ!0Lf,5;z,5;zOOQ!0Lf,5;|,5;|O%[QlO'#IpO!+_Q!0LrO,5<iO%[QlO,5;eO!&zQMhO,5;eO!+|QMhO,5;eO!-nQMhO'#E^O%[QlO,5;wOOQ!0Lf,5;{,5;{O!-uQ,UO'#FjO!.rQ,UO'#KXO!.^Q,UO'#KXO!.yQ,UO'#KXOOQO'#KX'#KXO!/_Q,UO,5<SOOOW,5<`,5<`O!/pQlO'#FvOOOW'#Io'#IoO7VO7dO,5<QO!/wQ,UO'#FxOOQ!0Lf,5<Q,5<QO!0hQ$IUO'#CyOOQ!0Lh'#C}'#C}O!0{O#@ItO'#DRO!1iQMjO,5<eO!1pQ`O,5<hO!3YQ(CWO'#GXO!3jQ`O'#GYO!3oQ`O'#GYO!5_Q(CWO'#G^O!6dQpO'#GbOOQO'#Gn'#GnO!,TQMhO'#GmOOQO'#Gp'#GpO!,TQMhO'#GoO!7VQ$IUO'#JlOOQ!0Lh'#Jl'#JlO!7aQ`O'#JkO!7oQ`O'#JjO!7wQ`O'#CuOOQ!0Lh'#C{'#C{O!8YQ`O'#C}OOQ!0Lh'#DV'#DVOOQ!0Lh'#DX'#DXO!8_Q`O,5<eO1SQ`O'#DZO!,TQMhO'#GPO!,TQMhO'#GRO!8gQ`O'#GTO!8lQ`O'#GUO!3oQ`O'#G[O!,TQMhO'#GaO<]Q`O'#JkO!8qQ`O'#EqO!9`Q`O,5<gOOQ!0Lb'#Cr'#CrO!9hQ`O'#ErO!:bQpO'#EsOOQ!0Lb'#KR'#KRO!:iQ!0LrO'#KaO9uQ!0LrO,5=cO`QlO,5>tOOQ['#Jh'#JhOOQ[,5>u,5>uOOQ[-E<]-E<]O!<hQ!0MxO,5:bO!:]QpO,5:`O!?RQ!0MxO,5:jO%[QlO,5:jO!AiQ!0MxO,5:lOOQO,5@z,5@zO!BYQMhO,5=_O!BhQ!0LrO'#JiO9`Q`O'#JiO!ByQ!0LrO,59ZO!CUQpO,59ZO!C^QMhO,59ZO:dQMhO,59ZO!CiQ`O,5;ZO!CqQ`O'#HbO!DVQ`O'#KdO%[QlO,5;}O!:]QpO,5<PO!D_Q`O,5=zO!DdQ`O,5=zO!DiQ`O,5=zO!DwQ`O,5=zO9uQ!0LrO,5=zO<]Q`O,5=jOOQO'#Cy'#CyO!EOQpO,5=gO!EWQMhO,5=hO!EcQ`O,5=jO!EhQ!bO,5=mO!EpQ`O'#K`O?YQ`O'#HWO9kQ`O'#HYO!EuQ`O'#HYO:dQMhO'#H[O!EzQ`O'#H[OOQ[,5=p,5=pO!FPQ`O'#H]O!FbQ`O'#CoO!FgQ`O,59PO!FqQ`O,59PO!HvQlO,59POOQ[,59P,59PO!IWQ!0LrO,59PO%[QlO,59PO!KcQlO'#HeOOQ['#Hf'#HfOOQ['#Hg'#HgO`QlO,5=}O!KyQ`O,5=}O`QlO,5>TO`QlO,5>VO!LOQ`O,5>XO`QlO,5>ZO!LTQ`O,5>^O!LYQlO,5>dOOQ[,5>j,5>jO%[QlO,5>jO9uQ!0LrO,5>lOOQ[,5>n,5>nO#!dQ`O,5>nOOQ[,5>p,5>pO#!dQ`O,5>pOOQ[,5>r,5>rO##QQpO'#D_O%[QlO'#JvO##sQpO'#JvO##}QpO'#DmO#$`QpO'#DmO#&qQlO'#DmO#&xQ`O'#JuO#'QQ`O,5:WO#'VQ`O'#EtO#'eQ`O'#KUO#'mQ`O,5;_O#'rQpO'#DmO#(PQpO'#EVOOQ!0Lf,5:o,5:oO%[QlO,5:oO#(WQ`O,5:oO?YQ`O,5;YO!CUQpO,5;YO!C^QMhO,5;YO:dQMhO,5;YO#(`Q`O,5@bO#(eQ07dO,5:sOOQO-E<f-E<fO#)kQ!0MSO,5;RODWQpO,5:rO#)uQpO,5:rODWQpO,5;RO!ByQ!0LrO,5:rOOQ!0Lb'#Ej'#EjOOQO,5;R,5;RO%[QlO,5;RO#*SQ!0LrO,5;RO#*_Q!0LrO,5;RO!CUQpO,5:rOOQO,5;X,5;XO#*mQ!0LrO,5;RPOOO'#I^'#I^P#+RO&2DjO,58|POOO,58|,58|OOOO-E<^-E<^OOQ!0Lh1G.p1G.pOOOO-E<_-E<_OOOO,59},59}O#+^Q!bO,59}OOOO-E<a-E<aOOQ!0Lf1G/g1G/gO#+cQ!fO,5?OO+}QlO,5?OOOQO,5?U,5?UO#+mQlO'#IdOOQO-E<b-E<bO#+zQ`O,5@`O#,SQ!fO,5@`O#,ZQ`O,5@nOOQ!0Lf1G/m1G/mO%[QlO,5@oO#,cQ`O'#IjOOQO-E<h-E<hO#,ZQ`O,5@nOOQ!0Lb1G0x1G0xOOQ!0Ln1G/x1G/xOOQ!0Ln1G0Y1G0YO%[QlO,5@lO#,wQ!0LrO,5@lO#-YQ!0LrO,5@lO#-aQ`O,5@kO9eQ`O,5@kO#-iQ`O,5@kO#-wQ`O'#ImO#-aQ`O,5@kOOQ!0Lb1G0w1G0wO!(tQpO,5:uO!)PQpO,5:uOOQS,5:w,5:wO#.iQdO,5:wO#.qQMhO1G2yO9kQ`O1G2yOOQ!0Lf1G0u1G0uO#/PQ!0MxO1G0uO#0UQ!0MvO,5;VOOQ!0Lh'#GW'#GWO#0rQ!0MzO'#JlO!$wQlO1G0uO#2}Q!fO'#JwO%[QlO'#JwO#3XQ`O,5:eOOQ!0Lh'#D_'#D_OOQ!0Lf1G1O1G1OO%[QlO1G1OOOQ!0Lf1G1f1G1fO#3^Q`O1G1OO#5rQ!0MxO1G1PO#5yQ!0MxO1G1PO#8aQ!0MxO1G1PO#8hQ!0MxO1G1PO#;OQ!0MxO1G1PO#=fQ!0MxO1G1PO#=mQ!0MxO1G1PO#=tQ!0MxO1G1PO#@[Q!0MxO1G1PO#@cQ!0MxO1G1PO#BpQ?MtO'#CiO#DkQ?MtO1G1`O#DrQ?MtO'#JsO#EVQ!0MxO,5?[OOQ!0Lb-E<n-E<nO#GdQ!0MxO1G1PO#HaQ!0MzO1G1POOQ!0Lf1G1P1G1PO#IdQMjO'#J|O#InQ`O,5:xO#IsQ!0MxO1G1cO#JgQ,UO,5<WO#JoQ,UO,5<XO#JwQ,UO'#FoO#K`Q`O'#FnOOQO'#KY'#KYOOQO'#In'#InO#KeQ,UO1G1nOOQ!0Lf1G1n1G1nOOOW1G1y1G1yO#KvQ?MtO'#JrO#LQQ`O,5<bO!)[QlO,5<bOOOW-E<m-E<mOOQ!0Lf1G1l1G1lO#LVQpO'#KXOOQ!0Lf,5<d,5<dO#L_QpO,5<dO#LdQMhO'#DTOOOO'#Ib'#IbO#LkO#@ItO,59mOOQ!0Lh,59m,59mO%[QlO1G2PO!8lQ`O'#IrO#LvQ`O,5<zOOQ!0Lh,5<w,5<wO!,TQMhO'#IuO#MdQMjO,5=XO!,TQMhO'#IwO#NVQMjO,5=ZO!&zQMhO,5=]OOQO1G2S1G2SO#NaQ!dO'#CrO#NtQ(CWO'#ErO$ |QpO'#GbO$!dQ!dO,5<sO$!kQ`O'#K[O9eQ`O'#K[O$!yQ`O,5<uO$#aQ!dO'#C{O!,TQMhO,5<tO$#kQ`O'#GZO$$PQ`O,5<tO$$UQ!dO'#GWO$$cQ!dO'#K]O$$mQ`O'#K]O!&zQMhO'#K]O$$rQ`O,5<xO$$wQlO'#JvO$%RQpO'#GcO#$`QpO'#GcO$%dQ`O'#GgO!3oQ`O'#GkO$%iQ!0LrO'#ItO$%tQpO,5<|OOQ!0Lp,5<|,5<|O$%{QpO'#GcO$&YQpO'#GdO$&kQpO'#GdO$&pQMjO,5=XO$'QQMjO,5=ZOOQ!0Lh,5=^,5=^O!,TQMhO,5@VO!,TQMhO,5@VO$'bQ`O'#IyO$'vQ`O,5@UO$(OQ`O,59aOOQ!0Lh,59i,59iO$(TQ`O,5@VO$)TQ$IYO,59uOOQ!0Lh'#Jp'#JpO$)vQMjO,5<kO$*iQMjO,5<mO@zQ`O,5<oOOQ!0Lh,5<p,5<pO$*sQ`O,5<vO$*xQMjO,5<{O$+YQ`O'#KPO!$wQlO1G2RO$+_Q`O1G2RO9eQ`O'#KSO9eQ`O'#EtO%[QlO'#EtO9eQ`O'#I{O$+dQ!0LrO,5@{OOQ[1G2}1G2}OOQ[1G4`1G4`OOQ!0Lf1G/|1G/|OOQ!0Lf1G/z1G/zO$-fQ!0MxO1G0UOOQ[1G2y1G2yO!&zQMhO1G2yO%[QlO1G2yO#.tQ`O1G2yO$/jQMhO'#EkOOQ!0Lb,5@T,5@TO$/wQ!0LrO,5@TOOQ[1G.u1G.uO!ByQ!0LrO1G.uO!CUQpO1G.uO!C^QMhO1G.uO$0YQ`O1G0uO$0_Q`O'#CiO$0jQ`O'#KeO$0rQ`O,5=|O$0wQ`O'#KeO$0|Q`O'#KeO$1[Q`O'#JRO$1jQ`O,5AOO$1rQ!fO1G1iOOQ!0Lf1G1k1G1kO9kQ`O1G3fO@zQ`O1G3fO$1yQ`O1G3fO$2OQ`O1G3fO!DiQ`O1G3fO9uQ!0LrO1G3fOOQ[1G3f1G3fO!EcQ`O1G3UO!&zQMhO1G3RO$2TQ`O1G3ROOQ[1G3S1G3SO!&zQMhO1G3SO$2YQ`O1G3SO$2bQpO'#HQOOQ[1G3U1G3UO!6_QpO'#I}O!EhQ!bO1G3XOOQ[1G3X1G3XOOQ[,5=r,5=rO$2jQMhO,5=tO9kQ`O,5=tO$%dQ`O,5=vO9`Q`O,5=vO!CUQpO,5=vO!C^QMhO,5=vO:dQMhO,5=vO$2xQ`O'#KcO$3TQ`O,5=wOOQ[1G.k1G.kO$3YQ!0LrO1G.kO@zQ`O1G.kO$3eQ`O1G.kO9uQ!0LrO1G.kO$5mQ!fO,5AQO$5zQ`O,5AQO9eQ`O,5AQO$6VQlO,5>PO$6^Q`O,5>POOQ[1G3i1G3iO`QlO1G3iOOQ[1G3o1G3oOOQ[1G3q1G3qO?TQ`O1G3sO$6cQlO1G3uO$:gQlO'#HtOOQ[1G3x1G3xO$:tQ`O'#HzO?YQ`O'#H|OOQ[1G4O1G4OO$:|QlO1G4OO9uQ!0LrO1G4UOOQ[1G4W1G4WOOQ!0Lb'#G_'#G_O9uQ!0LrO1G4YO9uQ!0LrO1G4[O$?TQ`O,5@bO!)[QlO,5;`O9eQ`O,5;`O?YQ`O,5:XO!)[QlO,5:XO!CUQpO,5:XO$?YQ?MtO,5:XOOQO,5;`,5;`O$?dQpO'#IeO$?zQ`O,5@aOOQ!0Lf1G/r1G/rO$@SQpO'#IkO$@^Q`O,5@pOOQ!0Lb1G0y1G0yO#$`QpO,5:XOOQO'#Ig'#IgO$@fQpO,5:qOOQ!0Ln,5:q,5:qO#(ZQ`O1G0ZOOQ!0Lf1G0Z1G0ZO%[QlO1G0ZOOQ!0Lf1G0t1G0tO?YQ`O1G0tO!CUQpO1G0tO!C^QMhO1G0tOOQ!0Lb1G5|1G5|O!ByQ!0LrO1G0^OOQO1G0m1G0mO%[QlO1G0mO$@mQ!0LrO1G0mO$@xQ!0LrO1G0mO!CUQpO1G0^ODWQpO1G0^O$AWQ!0LrO1G0mOOQO1G0^1G0^O$AlQ!0MxO1G0mPOOO-E<[-E<[POOO1G.h1G.hOOOO1G/i1G/iO$AvQ!bO,5<iO$BOQ!fO1G4jOOQO1G4p1G4pO%[QlO,5?OO$BYQ`O1G5zO$BbQ`O1G6YO$BjQ!fO1G6ZO9eQ`O,5?UO$BtQ!0MxO1G6WO%[QlO1G6WO$CUQ!0LrO1G6WO$CgQ`O1G6VO$CgQ`O1G6VO9eQ`O1G6VO$CoQ`O,5?XO9eQ`O,5?XOOQO,5?X,5?XO$DTQ`O,5?XO$+YQ`O,5?XOOQO-E<k-E<kOOQS1G0a1G0aOOQS1G0c1G0cO#.lQ`O1G0cOOQ[7+(e7+(eO!&zQMhO7+(eO%[QlO7+(eO$DcQ`O7+(eO$DnQMhO7+(eO$D|Q!0MzO,5=XO$GXQ!0MzO,5=ZO$IdQ!0MzO,5=XO$KuQ!0MzO,5=ZO$NWQ!0MzO,59uO%!]Q!0MzO,5<kO%$hQ!0MzO,5<mO%&sQ!0MzO,5<{OOQ!0Lf7+&a7+&aO%)UQ!0MxO7+&aO%)xQlO'#IfO%*VQ`O,5@cO%*_Q!fO,5@cOOQ!0Lf1G0P1G0PO%*iQ`O7+&jOOQ!0Lf7+&j7+&jO%*nQ?MtO,5:fO%[QlO7+&zO%*xQ?MtO,5:bO%+VQ?MtO,5:jO%+aQ?MtO,5:lO%+kQMhO'#IiO%+uQ`O,5@hOOQ!0Lh1G0d1G0dOOQO1G1r1G1rOOQO1G1s1G1sO%+}Q!jO,5<ZO!)[QlO,5<YOOQO-E<l-E<lOOQ!0Lf7+'Y7+'YOOOW7+'e7+'eOOOW1G1|1G1|O%,YQ`O1G1|OOQ!0Lf1G2O1G2OOOOO,59o,59oO%,_Q!dO,59oOOOO-E<`-E<`OOQ!0Lh1G/X1G/XO%,fQ!0MxO7+'kOOQ!0Lh,5?^,5?^O%-YQMhO1G2fP%-aQ`O'#IrPOQ!0Lh-E<p-E<pO%-}QMjO,5?aOOQ!0Lh-E<s-E<sO%.pQMjO,5?cOOQ!0Lh-E<u-E<uO%.zQ!dO1G2wO%/RQ!dO'#CrO%/iQMhO'#KSO$$wQlO'#JvOOQ!0Lh1G2_1G2_O%/sQ`O'#IqO%0[Q`O,5@vO%0[Q`O,5@vO%0dQ`O,5@vO%0oQ`O,5@vOOQO1G2a1G2aO%0}QMjO1G2`O$+YQ`O'#K[O!,TQMhO1G2`O%1_Q(CWO'#IsO%1lQ`O,5@wO!&zQMhO,5@wO%1tQ!dO,5@wOOQ!0Lh1G2d1G2dO%4UQ!fO'#CiO%4`Q`O,5=POOQ!0Lb,5<},5<}O%4hQpO,5<}OOQ!0Lb,5=O,5=OOCwQ`O,5<}O%4sQpO,5<}OOQ!0Lb,5=R,5=RO$+YQ`O,5=VOOQO,5?`,5?`OOQO-E<r-E<rOOQ!0Lp1G2h1G2hO#$`QpO,5<}O$$wQlO,5=PO%5RQ`O,5=OO%5^QpO,5=OO!,TQMhO'#IuO%6WQMjO1G2sO!,TQMhO'#IwO%6yQMjO1G2uO%7TQMjO1G5qO%7_QMjO1G5qOOQO,5?e,5?eOOQO-E<w-E<wOOQO1G.{1G.{O!,TQMhO1G5qO!,TQMhO1G5qO!:]QpO,59wO%[QlO,59wOOQ!0Lh,5<j,5<jO%7lQ`O1G2ZO!,TQMhO1G2bO%7qQ!0MxO7+'mOOQ!0Lf7+'m7+'mO!$wQlO7+'mO%8eQ`O,5;`OOQ!0Lb,5?g,5?gOOQ!0Lb-E<y-E<yO%8jQ!dO'#K^O#(ZQ`O7+(eO4UQ!fO7+(eO$DfQ`O7+(eO%8tQ!0MvO'#CiO%9XQ!0MvO,5=SO%9lQ`O,5=SO%9tQ`O,5=SOOQ!0Lb1G5o1G5oOOQ[7+$a7+$aO!ByQ!0LrO7+$aO!CUQpO7+$aO!$wQlO7+&aO%9yQ`O'#JQO%:bQ`O,5APOOQO1G3h1G3hO9kQ`O,5APO%:bQ`O,5APO%:jQ`O,5APOOQO,5?m,5?mOOQO-E=P-E=POOQ!0Lf7+'T7+'TO%:oQ`O7+)QO9uQ!0LrO7+)QO9kQ`O7+)QO@zQ`O7+)QO%:tQ`O7+)QOOQ[7+)Q7+)QOOQ[7+(p7+(pO%:yQ!0MvO7+(mO!&zQMhO7+(mO!E^Q`O7+(nOOQ[7+(n7+(nO!&zQMhO7+(nO%;TQ`O'#KbO%;`Q`O,5=lOOQO,5?i,5?iOOQO-E<{-E<{OOQ[7+(s7+(sO%<rQpO'#HZOOQ[1G3`1G3`O!&zQMhO1G3`O%[QlO1G3`O%<yQ`O1G3`O%=UQMhO1G3`O9uQ!0LrO1G3bO$%dQ`O1G3bO9`Q`O1G3bO!CUQpO1G3bO!C^QMhO1G3bO%=dQ`O'#JPO%=xQ`O,5@}O%>QQpO,5@}OOQ!0Lb1G3c1G3cOOQ[7+$V7+$VO@zQ`O7+$VO9uQ!0LrO7+$VO%>]Q`O7+$VO%[QlO1G6lO%[QlO1G6mO%>bQ!0LrO1G6lO%>lQlO1G3kO%>sQ`O1G3kO%>xQlO1G3kOOQ[7+)T7+)TO9uQ!0LrO7+)_O`QlO7+)aOOQ['#Kh'#KhOOQ['#JS'#JSO%?PQlO,5>`OOQ[,5>`,5>`O%[QlO'#HuO%?^Q`O'#HwOOQ[,5>f,5>fO9eQ`O,5>fOOQ[,5>h,5>hOOQ[7+)j7+)jOOQ[7+)p7+)pOOQ[7+)t7+)tOOQ[7+)v7+)vO%?cQpO1G5|O%?}Q?MtO1G0zO%@XQ`O1G0zOOQO1G/s1G/sO%@dQ?MtO1G/sO?YQ`O1G/sO!)[QlO'#DmOOQO,5?P,5?POOQO-E<c-E<cOOQO,5?V,5?VOOQO-E<i-E<iO!CUQpO1G/sOOQO-E<e-E<eOOQ!0Ln1G0]1G0]OOQ!0Lf7+%u7+%uO#(ZQ`O7+%uOOQ!0Lf7+&`7+&`O?YQ`O7+&`O!CUQpO7+&`OOQO7+%x7+%xO$AlQ!0MxO7+&XOOQO7+&X7+&XO%[QlO7+&XO%@nQ!0LrO7+&XO!ByQ!0LrO7+%xO!CUQpO7+%xO%@yQ!0LrO7+&XO%AXQ!0MxO7++rO%[QlO7++rO%AiQ`O7++qO%AiQ`O7++qOOQO1G4s1G4sO9eQ`O1G4sO%AqQ`O1G4sOOQS7+%}7+%}O#(ZQ`O<<LPO4UQ!fO<<LPO%BPQ`O<<LPOOQ[<<LP<<LPO!&zQMhO<<LPO%[QlO<<LPO%BXQ`O<<LPO%BdQ!0MzO,5?aO%DoQ!0MzO,5?cO%FzQ!0MzO1G2`O%I]Q!0MzO1G2sO%KhQ!0MzO1G2uO%MsQ!fO,5?QO%[QlO,5?QOOQO-E<d-E<dO%M}Q`O1G5}OOQ!0Lf<<JU<<JUO%NVQ?MtO1G0uO&!^Q?MtO1G1PO&!eQ?MtO1G1PO&$fQ?MtO1G1PO&$mQ?MtO1G1PO&&nQ?MtO1G1PO&(oQ?MtO1G1PO&(vQ?MtO1G1PO&(}Q?MtO1G1PO&+OQ?MtO1G1PO&+VQ?MtO1G1PO&+^Q!0MxO<<JfO&-UQ?MtO1G1PO&.RQ?MvO1G1PO&/UQ?MvO'#JlO&1[Q?MtO1G1cO&1iQ?MtO1G0UO&1sQMjO,5?TOOQO-E<g-E<gO!)[QlO'#FqOOQO'#KZ'#KZOOQO1G1u1G1uO&1}Q`O1G1tO&2SQ?MtO,5?[OOOW7+'h7+'hOOOO1G/Z1G/ZO&2^Q!dO1G4xOOQ!0Lh7+(Q7+(QP!&zQMhO,5?^O!,TQMhO7+(cO&2eQ`O,5?]O9eQ`O,5?]O$+YQ`O,5?]OOQO-E<o-E<oO&2sQ`O1G6bO&2sQ`O1G6bO&2{Q`O1G6bO&3WQMjO7+'zO&3hQ!dO,5?_O&3rQ`O,5?_O!&zQMhO,5?_OOQO-E<q-E<qO&3wQ!dO1G6cO&4RQ`O1G6cO&4ZQ`O1G2kO!&zQMhO1G2kOOQ!0Lb1G2i1G2iOOQ!0Lb1G2j1G2jO%4hQpO1G2iO!CUQpO1G2iOCwQ`O1G2iOOQ!0Lb1G2q1G2qO&4`QpO1G2iO&4nQ`O1G2kO$+YQ`O1G2jOCwQ`O1G2jO$$wQlO1G2kO&4vQ`O1G2jO&5jQMjO,5?aOOQ!0Lh-E<t-E<tO&6]QMjO,5?cOOQ!0Lh-E<v-E<vO!,TQMhO7++]O&6gQMjO7++]O&6qQMjO7++]OOQ!0Lh1G/c1G/cO&7OQ`O1G/cOOQ!0Lh7+'u7+'uO&7TQMjO7+'|O&7eQ!0MxO<<KXOOQ!0Lf<<KX<<KXO&8XQ`O1G0zO!&zQMhO'#IzO&8^Q`O,5@xO&:`Q!fO<<LPO!&zQMhO1G2nO&:gQ!0LrO1G2nOOQ[<<G{<<G{O!ByQ!0LrO<<G{O&:xQ!0MxO<<I{OOQ!0Lf<<I{<<I{OOQO,5?l,5?lO&;lQ`O,5?lO&;qQ`O,5?lOOQO-E=O-E=OO&<PQ`O1G6kO&<PQ`O1G6kO9kQ`O1G6kO@zQ`O<<LlOOQ[<<Ll<<LlO&<XQ`O<<LlO9uQ!0LrO<<LlO9kQ`O<<LlOOQ[<<LX<<LXO%:yQ!0MvO<<LXOOQ[<<LY<<LYO!E^Q`O<<LYO&<^QpO'#I|O&<iQ`O,5@|O!)[QlO,5@|OOQ[1G3W1G3WOOQO'#JO'#JOO9uQ!0LrO'#JOO&<qQpO,5=uOOQ[,5=u,5=uO&<xQpO'#EgO&=PQpO'#GeO&=UQ`O7+(zO&=ZQ`O7+(zOOQ[7+(z7+(zO!&zQMhO7+(zO%[QlO7+(zO&=cQ`O7+(zOOQ[7+(|7+(|O9uQ!0LrO7+(|O$%dQ`O7+(|O9`Q`O7+(|O!CUQpO7+(|O&=nQ`O,5?kOOQO-E<}-E<}OOQO'#H^'#H^O&=yQ`O1G6iO9uQ!0LrO<<GqOOQ[<<Gq<<GqO@zQ`O<<GqO&>RQ`O7+,WO&>WQ`O7+,XO%[QlO7+,WO%[QlO7+,XOOQ[7+)V7+)VO&>]Q`O7+)VO&>bQlO7+)VO&>iQ`O7+)VOOQ[<<Ly<<LyOOQ[<<L{<<L{OOQ[-E=Q-E=QOOQ[1G3z1G3zO&>nQ`O,5>aOOQ[,5>c,5>cO&>sQ`O1G4QO9eQ`O7+&fO!)[QlO7+&fOOQO7+%_7+%_O&>xQ?MtO1G6ZO?YQ`O7+%_OOQ!0Lf<<Ia<<IaOOQ!0Lf<<Iz<<IzO?YQ`O<<IzOOQO<<Is<<IsO$AlQ!0MxO<<IsO%[QlO<<IsOOQO<<Id<<IdO!ByQ!0LrO<<IdO&?SQ!0LrO<<IsO&?_Q!0MxO<= ^O&?oQ`O<= ]OOQO7+*_7+*_O9eQ`O7+*_OOQ[ANAkANAkO&?wQ!fOANAkO!&zQMhOANAkO#(ZQ`OANAkO4UQ!fOANAkO&@OQ`OANAkO%[QlOANAkO&@WQ!0MzO7+'zO&BiQ!0MzO,5?aO&DtQ!0MzO,5?cO&GPQ!0MzO7+'|O&IbQ!fO1G4lO&IlQ?MtO7+&aO&KpQ?MvO,5=XO&MwQ?MvO,5=ZO&NXQ?MvO,5=XO&NiQ?MvO,5=ZO&NyQ?MvO,59uO'#PQ?MvO,5<kO'%SQ?MvO,5<mO''hQ?MvO,5<{O')^Q?MtO7+'kO')kQ?MtO7+'mO')xQ`O,5<]OOQO7+'`7+'`OOQ!0Lh7+*d7+*dO')}QMjO<<K}OOQO1G4w1G4wO'*UQ`O1G4wO'*aQ`O1G4wO'*oQ`O7++|O'*oQ`O7++|O!&zQMhO1G4yO'*wQ!dO1G4yO'+RQ`O7++}O'+ZQ`O7+(VO'+fQ!dO7+(VOOQ!0Lb7+(T7+(TOOQ!0Lb7+(U7+(UO!CUQpO7+(TOCwQ`O7+(TO'+pQ`O7+(VO!&zQMhO7+(VO$+YQ`O7+(UO'+uQ`O7+(VOCwQ`O7+(UO'+}QMjO<<NwO!,TQMhO<<NwOOQ!0Lh7+$}7+$}O',XQ!dO,5?fOOQO-E<x-E<xO',cQ!0MvO7+(YO!&zQMhO7+(YOOQ[AN=gAN=gO9kQ`O1G5WOOQO1G5W1G5WO',sQ`O1G5WO',xQ`O7+,VO',xQ`O7+,VO9uQ!0LrOANBWO@zQ`OANBWOOQ[ANBWANBWO'-QQ`OANBWOOQ[ANAsANAsOOQ[ANAtANAtO'-VQ`O,5?hOOQO-E<z-E<zO'-bQ?MtO1G6hOOQO,5?j,5?jOOQO-E<|-E<|OOQ[1G3a1G3aO'-lQ`O,5=POOQ[<<Lf<<LfO!&zQMhO<<LfO&=UQ`O<<LfO'-qQ`O<<LfO%[QlO<<LfOOQ[<<Lh<<LhO9uQ!0LrO<<LhO$%dQ`O<<LhO9`Q`O<<LhO'-yQpO1G5VO'.UQ`O7+,TOOQ[AN=]AN=]O9uQ!0LrOAN=]OOQ[<= r<= rOOQ[<= s<= sO'.^Q`O<= rO'.cQ`O<= sOOQ[<<Lq<<LqO'.hQ`O<<LqO'.mQlO<<LqOOQ[1G3{1G3{O?YQ`O7+)lO'.tQ`O<<JQO'/PQ?MtO<<JQOOQO<<Hy<<HyOOQ!0LfAN?fAN?fOOQOAN?_AN?_O$AlQ!0MxOAN?_OOQOAN?OAN?OO%[QlOAN?_OOQO<<My<<MyOOQ[G27VG27VO!&zQMhOG27VO#(ZQ`OG27VO'/ZQ!fOG27VO4UQ!fOG27VO'/bQ`OG27VO'/jQ?MtO<<JfO'/wQ?MvO1G2`O'1mQ?MvO,5?aO'3pQ?MvO,5?cO'5sQ?MvO1G2sO'7vQ?MvO1G2uO'9yQ?MtO<<KXO':WQ?MtO<<I{OOQO1G1w1G1wO!,TQMhOANAiOOQO7+*c7+*cO':eQ`O7+*cO':pQ`O<= hO':xQ!dO7+*eOOQ!0Lb<<Kq<<KqO$+YQ`O<<KqOCwQ`O<<KqO';SQ`O<<KqO!&zQMhO<<KqOOQ!0Lb<<Ko<<KoO!CUQpO<<KoO';_Q!dO<<KqOOQ!0Lb<<Kp<<KpO';iQ`O<<KqO!&zQMhO<<KqO$+YQ`O<<KpO';nQMjOANDcO';xQ!0MvO<<KtOOQO7+*r7+*rO9kQ`O7+*rO'<YQ`O<= qOOQ[G27rG27rO9uQ!0LrOG27rO@zQ`OG27rO!)[QlO1G5SO'<bQ`O7+,SO'<jQ`O1G2kO&=UQ`OANBQOOQ[ANBQANBQO!&zQMhOANBQO'<oQ`OANBQOOQ[ANBSANBSO9uQ!0LrOANBSO$%dQ`OANBSOOQO'#H_'#H_OOQO7+*q7+*qOOQ[G22wG22wOOQ[ANE^ANE^OOQ[ANE_ANE_OOQ[ANB]ANB]O'<wQ`OANB]OOQ[<<MW<<MWO!)[QlOAN?lOOQOG24yG24yO$AlQ!0MxOG24yO#(ZQ`OLD,qOOQ[LD,qLD,qO!&zQMhOLD,qO'<|Q!fOLD,qO'=TQ?MvO7+'zO'>yQ?MvO,5?aO'@|Q?MvO,5?cO'CPQ?MvO7+'|O'DuQMjOG27TOOQO<<M}<<M}OOQ!0LbANA]ANA]O$+YQ`OANA]OCwQ`OANA]O'EVQ!dOANA]OOQ!0LbANAZANAZO'E^Q`OANA]O!&zQMhOANA]O'EiQ!dOANA]OOQ!0LbANA[ANA[OOQO<<N^<<N^OOQ[LD-^LD-^O9uQ!0LrOLD-^O'EsQ?MtO7+*nOOQO'#Gf'#GfOOQ[G27lG27lO&=UQ`OG27lO!&zQMhOG27lOOQ[G27nG27nO9uQ!0LrOG27nOOQ[G27wG27wO'E}Q?MtOG25WOOQOLD*eLD*eOOQ[!$(!]!$(!]O#(ZQ`O!$(!]O!&zQMhO!$(!]O'FXQ!0MzOG27TOOQ!0LbG26wG26wO$+YQ`OG26wO'HjQ`OG26wOCwQ`OG26wO'HuQ!dOG26wO!&zQMhOG26wOOQ[!$(!x!$(!xOOQ[LD-WLD-WO&=UQ`OLD-WOOQ[LD-YLD-YOOQ[!)9Ew!)9EwO#(ZQ`O!)9EwOOQ!0LbLD,cLD,cO$+YQ`OLD,cOCwQ`OLD,cO'H|Q`OLD,cO'IXQ!dOLD,cOOQ[!$(!r!$(!rOOQ[!.K;c!.K;cO'I`Q?MvOG27TOOQ!0Lb!$( }!$( }O$+YQ`O!$( }OCwQ`O!$( }O'KUQ`O!$( }OOQ!0Lb!)9Ei!)9EiO$+YQ`O!)9EiOCwQ`O!)9EiOOQ!0Lb!.K;T!.K;TO$+YQ`O!.K;TOOQ!0Lb!4/0o!4/0oO!)[QlO'#DzO1PQ`O'#EXO'KaQ!fO'#JrO'KhQ!L^O'#DvO'KoQlO'#EOO'KvQ!fO'#CiO'N^Q!fO'#CiO!)[QlO'#EQO'NnQlO,5;ZO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO'#IpO(!qQ`O,5<iO!)[QlO,5;eO(!yQMhO,5;eO($dQMhO,5;eO!)[QlO,5;wO!&zQMhO'#GmO(!yQMhO'#GmO!&zQMhO'#GoO(!yQMhO'#GoO1SQ`O'#DZO1SQ`O'#DZO!&zQMhO'#GPO(!yQMhO'#GPO!&zQMhO'#GRO(!yQMhO'#GRO!&zQMhO'#GaO(!yQMhO'#GaO!)[QlO,5:jO($kQpO'#D_O($uQpO'#JvO!)[QlO,5@oO'NnQlO1G0uO(%PQ?MtO'#CiO!)[QlO1G2PO!&zQMhO'#IuO(!yQMhO'#IuO!&zQMhO'#IwO(!yQMhO'#IwO(%ZQ!dO'#CrO!&zQMhO,5<tO(!yQMhO,5<tO'NnQlO1G2RO!)[QlO7+&zO!&zQMhO1G2`O(!yQMhO1G2`O!&zQMhO'#IuO(!yQMhO'#IuO!&zQMhO'#IwO(!yQMhO'#IwO!&zQMhO1G2bO(!yQMhO1G2bO'NnQlO7+'mO'NnQlO7+&aO!&zQMhOANAiO(!yQMhOANAiO(%nQ`O'#EoO(%sQ`O'#EoO(%{Q`O'#F]O(&QQ`O'#EyO(&VQ`O'#KTO(&bQ`O'#KRO(&mQ`O,5;ZO(&rQMjO,5<eO(&yQ`O'#GYO('OQ`O'#GYO('TQ`O,5<eO(']Q`O,5<gO('eQ`O,5;ZO('mQ?MtO1G1`O('tQ`O,5<tO('yQ`O,5<tO((OQ`O,5<vO((TQ`O,5<vO((YQ`O1G2RO((_Q`O1G0uO((dQMjO<<K}O((kQMjO<<K}O((rQMhO'#F|O9`Q`O'#F{OAuQ`O'#EnO!)[QlO,5;tO!3oQ`O'#GYO!3oQ`O'#GYO!3oQ`O'#G[O!3oQ`O'#G[O!,TQMhO7+(cO!,TQMhO7+(cO%.zQ!dO1G2wO%.zQ!dO1G2wO!&zQMhO,5=]O!&zQMhO,5=]",
  stateData: "()x~O'|OS'}OSTOS(ORQ~OPYOQYOSfOY!VOaqOdzOeyOl!POpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!uwO!xxO!|]O$W|O$niO%h}O%j!QO%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO%y!UO&W!WO&^!XO&`!YO&b!ZO&d![O&g!]O&m!^O&s!_O&u!`O&w!aO&y!bO&{!cO(TSO(VTO(YUO(aVO(o[O~OWtO~P`OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oa!wOs!nO!S!oO!b!yO!c!vO!d!vO!|<VO#T!pO#U!pO#V!xO#W!pO#X!pO#[!zO#]!zO(U!lO(VTO(YUO(e!mO(o!sO~O(O!{O~OP]XR]X[]Xa]Xj]Xr]X!Q]X!S]X!]]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X'z]X(a]X(r]X(y]X(z]X~O!g%RX~P(qO_!}O(V#PO(W!}O(X#PO~O_#QO(X#PO(Y#PO(Z#QO~Ox#SO!U#TO(b#TO(c#VO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T<ZO(VTO(YUO(aVO(o[O~O![#ZO!]#WO!Y(hP!Y(vP~P+}O!^#cO~P`OPYOQYOSfOd!jOe!iOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(VTO(YUO(aVO(o[O~Op#mO![#iO!|]O#i#lO#j#iO(T<[O!k(sP~P.iO!l#oO(T#nO~O!x#sO!|]O%h#tO~O#k#uO~O!g#vO#k#uO~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!]$_O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~Oa(fX'z(fX'w(fX!k(fX!Y(fX!_(fX%i(fX!g(fX~P1qO#S$dO#`$eO$Q$eOP(gXR(gX[(gXj(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX!_(gX%i(gX~Oa(gX'z(gX'w(gX!Y(gX!k(gXv(gX!g(gX~P4UO#`$eO~O$]$hO$_$gO$f$mO~OSfO!_$nO$i$oO$k$qO~Oh%VOj%dOk%dOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#j%cO$W%`O$t%^O$v%_O$y%aO(T$sO(VTO(YUO(a$uO(y$}O(z%POg(^P~Ol%[O~P7eO!l%eO~O!S%hO!_%iO(T%gO~O!g%mO~Oa%nO'z%nO~O!Q%rO~P%[O(U!lO~P%[O%n%vO~P%[Oh%VO!l%eO(T%gO(U!lO~Oe%}O!l%eO(T%gO~Oj$RO~O!_&PO(T%gO(U!lO(VTO(YUO`)WP~O!Q&SO!l&RO%j&VO&T&WO~P;SO!x#sO~O%s&YO!S)SX!_)SX(T)SX~O(T&ZO~Ol!PO!u&`O%j!QO%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO~Od&eOe&dO!x&bO%h&cO%{&aO~P<bOd&hOeyOl!PO!_&gO!u&`O!xxO!|]O%h}O%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO%y!UO~Ob&kO#`&nO%j&iO(U!lO~P=gO!l&oO!u&sO~O!l#oO~O!_XO~Oa%nO'x&{O'z%nO~Oa%nO'x'OO'z%nO~Oa%nO'x'QO'z%nO~O'w]X!Y]Xv]X!k]X&[]X!_]X%i]X!g]X~P(qO!b'_O!c'WO!d'WO(U!lO(VTO(YUO~Os'UO!S'TO!['XO(e'SO!^(iP!^(xP~P@nOn'bO!_'`O(T%gO~Oe'gO!l%eO(T%gO~O!Q&SO!l&RO~Os!nO!S!oO!|<VO#T!pO#U!pO#W!pO#X!pO(U!lO(VTO(YUO(e!mO(o!sO~O!b'mO!c'lO!d'lO#V!pO#['nO#]'nO~PBYOa%nOh%VO!g#vO!l%eO'z%nO(r'pO~O!p'tO#`'rO~PChOs!nO!S!oO(VTO(YUO(e!mO(o!sO~O!_XOs(mX!S(mX!b(mX!c(mX!d(mX!|(mX#T(mX#U(mX#V(mX#W(mX#X(mX#[(mX#](mX(U(mX(V(mX(Y(mX(e(mX(o(mX~O!c'lO!d'lO(U!lO~PDWO(P'xO(Q'xO(R'zO~O_!}O(V'|O(W!}O(X'|O~O_#QO(X'|O(Y'|O(Z#QO~Ov(OO~P%[Ox#SO!U#TO(b#TO(c(RO~O![(TO!Y'WX!Y'^X!]'WX!]'^X~P+}O!](VO!Y(hX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!](VO!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~O!Y(hX~PHRO!Y([O~O!Y(uX!](uX!g(uX!k(uX(r(uX~O#`(uX#k#dX!^(uX~PJUO#`(]O!Y(wX!](wX~O!](^O!Y(vX~O!Y(aO~O#`$eO~PJUO!^(bO~P`OR#zO!Q#yO!S#{O!l#xO(aVOP!na[!naj!nar!na!]!na!p!na#R!na#n!na#o!na#p!na#q!na#r!na#s!na#t!na#u!na#v!na#x!na#z!na#{!na(r!na(y!na(z!na~Oa!na'z!na'w!na!Y!na!k!nav!na!_!na%i!na!g!na~PKlO!k(cO~O!g#vO#`(dO(r'pO!](tXa(tX'z(tX~O!k(tX~PNXO!S%hO!_%iO!|]O#i(iO#j(hO(T%gO~O!](jO!k(sX~O!k(lO~O!S%hO!_%iO#j(hO(T%gO~OP(gXR(gX[(gXj(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX~O!g#vO!k(gX~P! uOR(nO!Q(mO!l#xO#S$dO!|!{a!S!{a~O!x!{a%h!{a!_!{a#i!{a#j!{a(T!{a~P!#vO!x(rO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~O#k(xO~O![(zO!k(kP~P%[O(e(|O(o[O~O!S)OO!l#xO(e(|O(o[O~OP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_!eO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(T)]O(VTO(YUO(aVO(o[O~O!]$_Oa$qa'z$qa'w$qa!k$qa!Y$qa!_$qa%i$qa!g$qa~Ol)dO~P!&zOh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#j%cO$W%`O$t%^O$v%_O$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~Og(pP~P!,TO!Q)iO!g)hO!_$^X$Z$^X$]$^X$_$^X$f$^X~O!g)hO!_({X$Z({X$]({X$_({X$f({X~O!Q)iO~P!.^O!Q)iO!_({X$Z({X$]({X$_({X$f({X~O!_)kO$Z)oO$])jO$_)jO$f)pO~O![)sO~P!)[O$]$hO$_$gO$f)wO~On$zX!Q$zX#S$zX'y$zX(y$zX(z$zX~OgmXg$zXnmX!]mX#`mX~P!0SOx)yO(b)zO(c)|O~On*VO!Q*OO'y*PO(y$}O(z%PO~Og)}O~P!1WOg*WO~Oh%VOr%XOs$tOt$tOz%YO|%ZO!O<sO!S*YO!_*ZO!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(VTO(YUO(a$uO(y$}O(z%PO~Op*`O![*^O(T*XO!k)OP~P!1uO#k*aO~O!l*bO~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(T*dO(VTO(YUO(a$uO(y$}O(z%PO~O![*gO!Y)PP~P!3tOr*sOs!nO!S*iO!b*qO!c*kO!d*kO!l*bO#[*rO%`*mO(U!lO(VTO(YUO(e!mO~O!^*pO~P!5iO#S$dOn(`X!Q(`X'y(`X(y(`X(z(`X!](`X#`(`X~Og(`X$O(`X~P!6kOn*xO#`*wOg(_X!](_X~O!]*yOg(^X~Oj%dOk%dOl%dO(T&ZOg(^P~Os*|O~Og)}O(T&ZO~O!l+SO~O(T(vO~Op+WO!S%hO![#iO!_%iO!|]O#i#lO#j#iO(T%gO!k(sP~O!g#vO#k+XO~O!S%hO![+ZO!](^O!_%iO(T%gO!Y(vP~Os'[O!S+]O![+[O(VTO(YUO(e(|O~O!^(xP~P!9|O!]+^Oa)TX'z)TX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~Oa!ja!]!ja'z!ja'w!ja!Y!ja!k!jav!ja!_!ja%i!ja!g!ja~P!:tOR#zO!Q#yO!S#{O!l#xO(aVOP!ra[!raj!rar!ra!]!ra!p!ra#R!ra#n!ra#o!ra#p!ra#q!ra#r!ra#s!ra#t!ra#u!ra#v!ra#x!ra#z!ra#{!ra(r!ra(y!ra(z!ra~Oa!ra'z!ra'w!ra!Y!ra!k!rav!ra!_!ra%i!ra!g!ra~P!=[OR#zO!Q#yO!S#{O!l#xO(aVOP!ta[!taj!tar!ta!]!ta!p!ta#R!ta#n!ta#o!ta#p!ta#q!ta#r!ta#s!ta#t!ta#u!ta#v!ta#x!ta#z!ta#{!ta(r!ta(y!ta(z!ta~Oa!ta'z!ta'w!ta!Y!ta!k!tav!ta!_!ta%i!ta!g!ta~P!?rOh%VOn+gO!_'`O%i+fO~O!g+iOa(]X!_(]X'z(]X!](]X~Oa%nO!_XO'z%nO~Oh%VO!l%eO~Oh%VO!l%eO(T%gO~O!g#vO#k(xO~Ob+tO%j+uO(T+qO(VTO(YUO!^)XP~O!]+vO`)WX~O[+zO~O`+{O~O!_&PO(T%gO(U!lO`)WP~O%j,OO~P;SOh%VO#`,SO~Oh%VOn,VO!_$|O~O!_,XO~O!Q,ZO!_XO~O%n%vO~O!x,`O~Oe,eO~Ob,fO(T#nO(VTO(YUO!^)VP~Oe%}O~O%j!QO(T&ZO~P=gO[,kO`,jO~OPYOQYOSfOdzOeyOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!iuO!lZO!oYO!pYO!qYO!svO!xxO!|]O$niO%h}O(VTO(YUO(aVO(o[O~O!_!eO!u!gO$W!kO(T!dO~P!FyO`,jOa%nO'z%nO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oa,pOl!OO!uwO%l!OO%m!OO%n!OO~P!IcO!l&oO~O&^,vO~O!_,xO~O&o,zO&q,{OP&laQ&laS&laY&laa&lad&lae&lal&lap&lar&las&lat&laz&la|&la!O&la!S&la!W&la!X&la!_&la!i&la!l&la!o&la!p&la!q&la!s&la!u&la!x&la!|&la$W&la$n&la%h&la%j&la%l&la%m&la%n&la%q&la%s&la%v&la%w&la%y&la&W&la&^&la&`&la&b&la&d&la&g&la&m&la&s&la&u&la&w&la&y&la&{&la'w&la(T&la(V&la(Y&la(a&la(o&la!^&la&e&lab&la&j&la~O(T-QO~Oh!eX!]!RX!^!RX!g!RX!g!eX!l!eX#`!RX~O!]!eX!^!eX~P#!iO!g-VO#`-UOh(jX!]#hX!^#hX!g(jX!l(jX~O!](jX!^(jX~P##[Oh%VO!g-XO!l%eO!]!aX!^!aX~Os!nO!S!oO(VTO(YUO(e!mO~OP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_!eO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(VTO(YUO(aVO(o[O~O(T=QO~P#$qO!]-]O!^(iX~O!^-_O~O!g-VO#`-UO!]#hX!^#hX~O!]-`O!^(xX~O!^-bO~O!c-cO!d-cO(U!lO~P#$`O!^-fO~P'_On-iO!_'`O~O!Y-nO~Os!{a!b!{a!c!{a!d!{a#T!{a#U!{a#V!{a#W!{a#X!{a#[!{a#]!{a(U!{a(V!{a(Y!{a(e!{a(o!{a~P!#vO!p-sO#`-qO~PChO!c-uO!d-uO(U!lO~PDWOa%nO#`-qO'z%nO~Oa%nO!g#vO#`-qO'z%nO~Oa%nO!g#vO!p-sO#`-qO'z%nO(r'pO~O(P'xO(Q'xO(R-zO~Ov-{O~O!Y'Wa!]'Wa~P!:tO![.PO!Y'WX!]'WX~P%[O!](VO!Y(ha~O!Y(ha~PHRO!](^O!Y(va~O!S%hO![.TO!_%iO(T%gO!Y'^X!]'^X~O#`.VO!](ta!k(taa(ta'z(ta~O!g#vO~P#,wO!](jO!k(sa~O!S%hO!_%iO#j.ZO(T%gO~Op.`O!S%hO![.]O!_%iO!|]O#i._O#j.]O(T%gO!]'aX!k'aX~OR.dO!l#xO~Oh%VOn.gO!_'`O%i.fO~Oa#ci!]#ci'z#ci'w#ci!Y#ci!k#civ#ci!_#ci%i#ci!g#ci~P!:tOn>]O!Q*OO'y*PO(y$}O(z%PO~O#k#_aa#_a#`#_a'z#_a!]#_a!k#_a!_#_a!Y#_a~P#/sO#k(`XP(`XR(`X[(`Xa(`Xj(`Xr(`X!S(`X!l(`X!p(`X#R(`X#n(`X#o(`X#p(`X#q(`X#r(`X#s(`X#t(`X#u(`X#v(`X#x(`X#z(`X#{(`X'z(`X(a(`X(r(`X!k(`X!Y(`X'w(`Xv(`X!_(`X%i(`X!g(`X~P!6kO!].tO!k(kX~P!:tO!k.wO~O!Y.yO~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(aVO[#mia#mij#mir#mi!]#mi#R#mi#o#mi#p#mi#q#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#n#mi~P#3cO#n$OO~P#3cOP$[OR#zOr$aO!Q#yO!S#{O!l#xO!p$[O#n$OO#o$PO#p$PO#q$PO(aVO[#mia#mij#mi!]#mi#R#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#r#mi~P#6QO#r$QO~P#6QOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO(aVOa#mi!]#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#v#mi~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO(aVO(z#}Oa#mi!]#mi#z#mi#{#mi'z#mi(r#mi(y#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#x$UO~P#;VO#x#mi~P#;VO#v$SO~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO(aVO(y#|O(z#}Oa#mi!]#mi#{#mi'z#mi(r#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#z#mi~P#={O#z$WO~P#={OP]XR]X[]Xj]Xr]X!Q]X!S]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X!]]X!^]X~O$O]X~P#@jOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO#x<eO#z<gO#{<hO(aVO(r$YO(y#|O(z#}O~O$O.{O~P#BwO#S$dO#`<nO$Q<nO$O(gX!^(gX~P! uOa'da!]'da'z'da'w'da!k'da!Y'dav'da!_'da%i'da!g'da~P!:tO[#mia#mij#mir#mi!]#mi#R#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#n$OO#o$PO#p$PO#q$PO(aVO(y#mi(z#mi~P#EyOn>]O!Q*OO'y*PO(y$}O(z%POP#miR#mi!S#mi!l#mi!p#mi#n#mi#o#mi#p#mi#q#mi(a#mi~P#EyO!]/POg(pX~P!1WOg/RO~Oa$Pi!]$Pi'z$Pi'w$Pi!Y$Pi!k$Piv$Pi!_$Pi%i$Pi!g$Pi~P!:tO$]/SO$_/SO~O$]/TO$_/TO~O!g)hO#`/UO!_$cX$Z$cX$]$cX$_$cX$f$cX~O![/VO~O!_)kO$Z/XO$])jO$_)jO$f/YO~O!]<iO!^(fX~P#BwO!^/ZO~O!g)hO$f({X~O$f/]O~Ov/^O~P!&zOx)yO(b)zO(c/aO~O!S/dO~O(y$}On%aa!Q%aa'y%aa(z%aa!]%aa#`%aa~Og%aa$O%aa~P#L{O(z%POn%ca!Q%ca'y%ca(y%ca!]%ca#`%ca~Og%ca$O%ca~P#MnO!]fX!gfX!kfX!k$zX(rfX~P!0SOp%WO![/mO!](^O(T/lO!Y(vP!Y)PP~P!1uOr*sO!b*qO!c*kO!d*kO!l*bO#[*rO%`*mO(U!lO(VTO(YUO~Os<}O!S/nO![+[O!^*pO(e<|O!^(xP~P$ [O!k/oO~P#/sO!]/pO!g#vO(r'pO!k)OX~O!k/uO~OnoX!QoX'yoX(yoX(zoX~O!g#vO!koX~P$#OOp/wO!S%hO![*^O!_%iO(T%gO!k)OP~O#k/xO~O!Y$zX!]$zX!g%RX~P!0SO!]/yO!Y)PX~P#/sO!g/{O~O!Y/}O~OpkO(T0OO~P.iOh%VOr0TO!g#vO!l%eO(r'pO~O!g+iO~Oa%nO!]0XO'z%nO~O!^0ZO~P!5iO!c0[O!d0[O(U!lO~P#$`Os!nO!S0]O(VTO(YUO(e!mO~O#[0_O~Og%aa!]%aa#`%aa$O%aa~P!1WOg%ca!]%ca#`%ca$O%ca~P!1WOj%dOk%dOl%dO(T&ZOg'mX!]'mX~O!]*yOg(^a~Og0hO~On0jO#`0iOg(_a!](_a~OR0kO!Q0kO!S0lO#S$dOn}a'y}a(y}a(z}a!]}a#`}a~Og}a$O}a~P$(cO!Q*OO'y*POn$sa(y$sa(z$sa!]$sa#`$sa~Og$sa$O$sa~P$)_O!Q*OO'y*POn$ua(y$ua(z$ua!]$ua#`$ua~Og$ua$O$ua~P$*QO#k0oO~Og%Ta!]%Ta#`%Ta$O%Ta~P!1WO!g#vO~O#k0rO~O!]+^Oa)Ta'z)Ta~OR#zO!Q#yO!S#{O!l#xO(aVOP!ri[!rij!rir!ri!]!ri!p!ri#R!ri#n!ri#o!ri#p!ri#q!ri#r!ri#s!ri#t!ri#u!ri#v!ri#x!ri#z!ri#{!ri(r!ri(y!ri(z!ri~Oa!ri'z!ri'w!ri!Y!ri!k!riv!ri!_!ri%i!ri!g!ri~P$+oOh%VOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(VTO(YUO(a$uO(y$}O(z%PO~Op0{O%]0|O(T0zO~P$.VO!g+iOa(]a!_(]a'z(]a!](]a~O#k1SO~O[]X!]fX!^fX~O!]1TO!^)XX~O!^1VO~O[1WO~Ob1YO(T+qO(VTO(YUO~O!_&PO(T%gO`'uX!]'uX~O!]+vO`)Wa~O!k1]O~P!:tO[1`O~O`1aO~O#`1fO~On1iO!_$|O~O(e(|O!^)UP~Oh%VOn1rO!_1oO%i1qO~O[1|O!]1zO!^)VX~O!^1}O~O`2POa%nO'z%nO~O(T#nO(VTO(YUO~O#S$dO#`$eO$Q$eOP(gXR(gX[(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX~Oj2SO&[2TOa(gX~P$3pOj2SO#`$eO&[2TO~Oa2VO~P%[Oa2XO~O&e2[OP&ciQ&ciS&ciY&cia&cid&cie&cil&cip&cir&cis&cit&ciz&ci|&ci!O&ci!S&ci!W&ci!X&ci!_&ci!i&ci!l&ci!o&ci!p&ci!q&ci!s&ci!u&ci!x&ci!|&ci$W&ci$n&ci%h&ci%j&ci%l&ci%m&ci%n&ci%q&ci%s&ci%v&ci%w&ci%y&ci&W&ci&^&ci&`&ci&b&ci&d&ci&g&ci&m&ci&s&ci&u&ci&w&ci&y&ci&{&ci'w&ci(T&ci(V&ci(Y&ci(a&ci(o&ci!^&cib&ci&j&ci~Ob2bO!^2`O&j2aO~P`O!_XO!l2dO~O&q,{OP&liQ&liS&liY&lia&lid&lie&lil&lip&lir&lis&lit&liz&li|&li!O&li!S&li!W&li!X&li!_&li!i&li!l&li!o&li!p&li!q&li!s&li!u&li!x&li!|&li$W&li$n&li%h&li%j&li%l&li%m&li%n&li%q&li%s&li%v&li%w&li%y&li&W&li&^&li&`&li&b&li&d&li&g&li&m&li&s&li&u&li&w&li&y&li&{&li'w&li(T&li(V&li(Y&li(a&li(o&li!^&li&e&lib&li&j&li~O!Y2jO~O!]!aa!^!aa~P#BwOs!nO!S!oO![2pO(e!mO!]'XX!^'XX~P@nO!]-]O!^(ia~O!]'_X!^'_X~P!9|O!]-`O!^(xa~O!^2wO~P'_Oa%nO#`3QO'z%nO~Oa%nO!g#vO#`3QO'z%nO~Oa%nO!g#vO!p3UO#`3QO'z%nO(r'pO~Oa%nO'z%nO~P!:tO!]$_Ov$qa~O!Y'Wi!]'Wi~P!:tO!](VO!Y(hi~O!](^O!Y(vi~O!Y(wi!](wi~P!:tO!](ti!k(tia(ti'z(ti~P!:tO#`3WO!](ti!k(tia(ti'z(ti~O!](jO!k(si~O!S%hO!_%iO!|]O#i3]O#j3[O(T%gO~O!S%hO!_%iO#j3[O(T%gO~On3dO!_'`O%i3cO~Oh%VOn3dO!_'`O%i3cO~O#k%aaP%aaR%aa[%aaa%aaj%aar%aa!S%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa'z%aa(a%aa(r%aa!k%aa!Y%aa'w%aav%aa!_%aa%i%aa!g%aa~P#L{O#k%caP%caR%ca[%caa%caj%car%ca!S%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca'z%ca(a%ca(r%ca!k%ca!Y%ca'w%cav%ca!_%ca%i%ca!g%ca~P#MnO#k%aaP%aaR%aa[%aaa%aaj%aar%aa!S%aa!]%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa'z%aa(a%aa(r%aa!k%aa!Y%aa'w%aa#`%aav%aa!_%aa%i%aa!g%aa~P#/sO#k%caP%caR%ca[%caa%caj%car%ca!S%ca!]%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca'z%ca(a%ca(r%ca!k%ca!Y%ca'w%ca#`%cav%ca!_%ca%i%ca!g%ca~P#/sO#k}aP}a[}aa}aj}ar}a!l}a!p}a#R}a#n}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#x}a#z}a#{}a'z}a(a}a(r}a!k}a!Y}a'w}av}a!_}a%i}a!g}a~P$(cO#k$saP$saR$sa[$saa$saj$sar$sa!S$sa!l$sa!p$sa#R$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#t$sa#u$sa#v$sa#x$sa#z$sa#{$sa'z$sa(a$sa(r$sa!k$sa!Y$sa'w$sav$sa!_$sa%i$sa!g$sa~P$)_O#k$uaP$uaR$ua[$uaa$uaj$uar$ua!S$ua!l$ua!p$ua#R$ua#n$ua#o$ua#p$ua#q$ua#r$ua#s$ua#t$ua#u$ua#v$ua#x$ua#z$ua#{$ua'z$ua(a$ua(r$ua!k$ua!Y$ua'w$uav$ua!_$ua%i$ua!g$ua~P$*QO#k%TaP%TaR%Ta[%Taa%Taj%Tar%Ta!S%Ta!]%Ta!l%Ta!p%Ta#R%Ta#n%Ta#o%Ta#p%Ta#q%Ta#r%Ta#s%Ta#t%Ta#u%Ta#v%Ta#x%Ta#z%Ta#{%Ta'z%Ta(a%Ta(r%Ta!k%Ta!Y%Ta'w%Ta#`%Tav%Ta!_%Ta%i%Ta!g%Ta~P#/sOa#cq!]#cq'z#cq'w#cq!Y#cq!k#cqv#cq!_#cq%i#cq!g#cq~P!:tO![3lO!]'YX!k'YX~P%[O!].tO!k(ka~O!].tO!k(ka~P!:tO!Y3oO~O$O!na!^!na~PKlO$O!ja!]!ja!^!ja~P#BwO$O!ra!^!ra~P!=[O$O!ta!^!ta~P!?rOg']X!]']X~P!,TO!]/POg(pa~OSfO!_4TO$d4UO~O!^4YO~Ov4ZO~P#/sOa$mq!]$mq'z$mq'w$mq!Y$mq!k$mqv$mq!_$mq%i$mq!g$mq~P!:tO!Y4]O~P!&zO!S4^O~O!Q*OO'y*PO(z%POn'ia(y'ia!]'ia#`'ia~Og'ia$O'ia~P%-fO!Q*OO'y*POn'ka(y'ka(z'ka!]'ka#`'ka~Og'ka$O'ka~P%.XO(r$YO~P#/sO!YfX!Y$zX!]fX!]$zX!g%RX#`fX~P!0SOp%WO(T=WO~P!1uOp4bO!S%hO![4aO!_%iO(T%gO!]'eX!k'eX~O!]/pO!k)Oa~O!]/pO!g#vO!k)Oa~O!]/pO!g#vO(r'pO!k)Oa~Og$|i!]$|i#`$|i$O$|i~P!1WO![4jO!Y'gX!]'gX~P!3tO!]/yO!Y)Pa~O!]/yO!Y)Pa~P#/sOP]XR]X[]Xj]Xr]X!Q]X!S]X!Y]X!]]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X~Oj%YX!g%YX~P%2OOj4oO!g#vO~Oh%VO!g#vO!l%eO~Oh%VOr4tO!l%eO(r'pO~Or4yO!g#vO(r'pO~Os!nO!S4zO(VTO(YUO(e!mO~O(y$}On%ai!Q%ai'y%ai(z%ai!]%ai#`%ai~Og%ai$O%ai~P%5oO(z%POn%ci!Q%ci'y%ci(y%ci!]%ci#`%ci~Og%ci$O%ci~P%6bOg(_i!](_i~P!1WO#`5QOg(_i!](_i~P!1WO!k5VO~Oa$oq!]$oq'z$oq'w$oq!Y$oq!k$oqv$oq!_$oq%i$oq!g$oq~P!:tO!Y5ZO~O!]5[O!_)QX~P#/sOa$zX!_$zX%^]X'z$zX!]$zX~P!0SO%^5_OaoX!_oX'zoX!]oX~P$#OOp5`O(T#nO~O%^5_O~Ob5fO%j5gO(T+qO(VTO(YUO!]'tX!^'tX~O!]1TO!^)Xa~O[5kO~O`5lO~O[5pO~Oa%nO'z%nO~P#/sO!]5uO#`5wO!^)UX~O!^5xO~Or6OOs!nO!S*iO!b!yO!c!vO!d!vO!|<VO#T!pO#U!pO#V!pO#W!pO#X!pO#[5}O#]!zO(U!lO(VTO(YUO(e!mO(o!sO~O!^5|O~P%;eOn6TO!_1oO%i6SO~Oh%VOn6TO!_1oO%i6SO~Ob6[O(T#nO(VTO(YUO!]'sX!^'sX~O!]1zO!^)Va~O(VTO(YUO(e6^O~O`6bO~Oj6eO&[6fO~PNXO!k6gO~P%[Oa6iO~Oa6iO~P%[Ob2bO!^6nO&j2aO~P`O!g6pO~O!g6rOh(ji!](ji!^(ji!g(ji!l(jir(ji(r(ji~O!]#hi!^#hi~P#BwO#`6sO!]#hi!^#hi~O!]!ai!^!ai~P#BwOa%nO#`6|O'z%nO~Oa%nO!g#vO#`6|O'z%nO~O!](tq!k(tqa(tq'z(tq~P!:tO!](jO!k(sq~O!S%hO!_%iO#j7TO(T%gO~O!_'`O%i7WO~On7[O!_'`O%i7WO~O#k'iaP'iaR'ia['iaa'iaj'iar'ia!S'ia!l'ia!p'ia#R'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#v'ia#x'ia#z'ia#{'ia'z'ia(a'ia(r'ia!k'ia!Y'ia'w'iav'ia!_'ia%i'ia!g'ia~P%-fO#k'kaP'kaR'ka['kaa'kaj'kar'ka!S'ka!l'ka!p'ka#R'ka#n'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#x'ka#z'ka#{'ka'z'ka(a'ka(r'ka!k'ka!Y'ka'w'kav'ka!_'ka%i'ka!g'ka~P%.XO#k$|iP$|iR$|i[$|ia$|ij$|ir$|i!S$|i!]$|i!l$|i!p$|i#R$|i#n$|i#o$|i#p$|i#q$|i#r$|i#s$|i#t$|i#u$|i#v$|i#x$|i#z$|i#{$|i'z$|i(a$|i(r$|i!k$|i!Y$|i'w$|i#`$|iv$|i!_$|i%i$|i!g$|i~P#/sO#k%aiP%aiR%ai[%aia%aij%air%ai!S%ai!l%ai!p%ai#R%ai#n%ai#o%ai#p%ai#q%ai#r%ai#s%ai#t%ai#u%ai#v%ai#x%ai#z%ai#{%ai'z%ai(a%ai(r%ai!k%ai!Y%ai'w%aiv%ai!_%ai%i%ai!g%ai~P%5oO#k%ciP%ciR%ci[%cia%cij%cir%ci!S%ci!l%ci!p%ci#R%ci#n%ci#o%ci#p%ci#q%ci#r%ci#s%ci#t%ci#u%ci#v%ci#x%ci#z%ci#{%ci'z%ci(a%ci(r%ci!k%ci!Y%ci'w%civ%ci!_%ci%i%ci!g%ci~P%6bO!]'Ya!k'Ya~P!:tO!].tO!k(ki~O$O#ci!]#ci!^#ci~P#BwOP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(aVO[#mij#mir#mi#R#mi#o#mi#p#mi#q#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#n#mi~P%NdO#n<_O~P%NdOP$[OR#zOr<kO!Q#yO!S#{O!l#xO!p$[O#n<_O#o<`O#p<`O#q<`O(aVO[#mij#mi#R#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#r#mi~P&!lO#r<aO~P&!lOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO(aVO#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#v#mi~P&$tOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO(aVO(z#}O#z#mi#{#mi$O#mi(r#mi(y#mi!]#mi!^#mi~O#x<eO~P&&uO#x#mi~P&&uO#v<cO~P&$tOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO#x<eO(aVO(y#|O(z#}O#{#mi$O#mi(r#mi!]#mi!^#mi~O#z#mi~P&)UO#z<gO~P&)UOa#|y!]#|y'z#|y'w#|y!Y#|y!k#|yv#|y!_#|y%i#|y!g#|y~P!:tO[#mij#mir#mi#R#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi!]#mi!^#mi~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#n<_O#o<`O#p<`O#q<`O(aVO(y#mi(z#mi~P&,QOn>^O!Q*OO'y*PO(y$}O(z%POP#miR#mi!S#mi!l#mi!p#mi#n#mi#o#mi#p#mi#q#mi(a#mi~P&,QO#S$dOP(`XR(`X[(`Xj(`Xn(`Xr(`X!Q(`X!S(`X!l(`X!p(`X#R(`X#n(`X#o(`X#p(`X#q(`X#r(`X#s(`X#t(`X#u(`X#v(`X#x(`X#z(`X#{(`X$O(`X'y(`X(a(`X(r(`X(y(`X(z(`X!](`X!^(`X~O$O$Pi!]$Pi!^$Pi~P#BwO$O!ri!^!ri~P$+oOg']a!]']a~P!1WO!^7nO~O!]'da!^'da~P#BwO!Y7oO~P#/sO!g#vO(r'pO!]'ea!k'ea~O!]/pO!k)Oi~O!]/pO!g#vO!k)Oi~Og$|q!]$|q#`$|q$O$|q~P!1WO!Y'ga!]'ga~P#/sO!g7vO~O!]/yO!Y)Pi~P#/sO!]/yO!Y)Pi~O!Y7yO~Oh%VOr8OO!l%eO(r'pO~Oj8QO!g#vO~Or8TO!g#vO(r'pO~O!Q*OO'y*PO(z%POn'ja(y'ja!]'ja#`'ja~Og'ja$O'ja~P&5RO!Q*OO'y*POn'la(y'la(z'la!]'la#`'la~Og'la$O'la~P&5tOg(_q!](_q~P!1WO#`8VOg(_q!](_q~P!1WO!Y8WO~Og%Oq!]%Oq#`%Oq$O%Oq~P!1WOa$oy!]$oy'z$oy'w$oy!Y$oy!k$oyv$oy!_$oy%i$oy!g$oy~P!:tO!g6rO~O!]5[O!_)Qa~O!_'`OP$TaR$Ta[$Taj$Tar$Ta!Q$Ta!S$Ta!]$Ta!l$Ta!p$Ta#R$Ta#n$Ta#o$Ta#p$Ta#q$Ta#r$Ta#s$Ta#t$Ta#u$Ta#v$Ta#x$Ta#z$Ta#{$Ta(a$Ta(r$Ta(y$Ta(z$Ta~O%i7WO~P&8fO%^8[Oa%[i!_%[i'z%[i!]%[i~Oa#cy!]#cy'z#cy'w#cy!Y#cy!k#cyv#cy!_#cy%i#cy!g#cy~P!:tO[8^O~Ob8`O(T+qO(VTO(YUO~O!]1TO!^)Xi~O`8dO~O(e(|O!]'pX!^'pX~O!]5uO!^)Ua~O!^8nO~P%;eO(o!sO~P$&YO#[8oO~O!_1oO~O!_1oO%i8qO~On8tO!_1oO%i8qO~O[8yO!]'sa!^'sa~O!]1zO!^)Vi~O!k8}O~O!k9OO~O!k9RO~O!k9RO~P%[Oa9TO~O!g9UO~O!k9VO~O!](wi!^(wi~P#BwOa%nO#`9_O'z%nO~O!](ty!k(tya(ty'z(ty~P!:tO!](jO!k(sy~O%i9bO~P&8fO!_'`O%i9bO~O#k$|qP$|qR$|q[$|qa$|qj$|qr$|q!S$|q!]$|q!l$|q!p$|q#R$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#t$|q#u$|q#v$|q#x$|q#z$|q#{$|q'z$|q(a$|q(r$|q!k$|q!Y$|q'w$|q#`$|qv$|q!_$|q%i$|q!g$|q~P#/sO#k'jaP'jaR'ja['jaa'jaj'jar'ja!S'ja!l'ja!p'ja#R'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#x'ja#z'ja#{'ja'z'ja(a'ja(r'ja!k'ja!Y'ja'w'jav'ja!_'ja%i'ja!g'ja~P&5RO#k'laP'laR'la['laa'laj'lar'la!S'la!l'la!p'la#R'la#n'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#x'la#z'la#{'la'z'la(a'la(r'la!k'la!Y'la'w'lav'la!_'la%i'la!g'la~P&5tO#k%OqP%OqR%Oq[%Oqa%Oqj%Oqr%Oq!S%Oq!]%Oq!l%Oq!p%Oq#R%Oq#n%Oq#o%Oq#p%Oq#q%Oq#r%Oq#s%Oq#t%Oq#u%Oq#v%Oq#x%Oq#z%Oq#{%Oq'z%Oq(a%Oq(r%Oq!k%Oq!Y%Oq'w%Oq#`%Oqv%Oq!_%Oq%i%Oq!g%Oq~P#/sO!]'Yi!k'Yi~P!:tO$O#cq!]#cq!^#cq~P#BwO(y$}OP%aaR%aa[%aaj%aar%aa!S%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa$O%aa(a%aa(r%aa!]%aa!^%aa~On%aa!Q%aa'y%aa(z%aa~P&IyO(z%POP%caR%ca[%caj%car%ca!S%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca$O%ca(a%ca(r%ca!]%ca!^%ca~On%ca!Q%ca'y%ca(y%ca~P&LQOn>^O!Q*OO'y*PO(z%PO~P&IyOn>^O!Q*OO'y*PO(y$}O~P&LQOR0kO!Q0kO!S0lO#S$dOP}a[}aj}an}ar}a!l}a!p}a#R}a#n}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#x}a#z}a#{}a$O}a'y}a(a}a(r}a(y}a(z}a!]}a!^}a~O!Q*OO'y*POP$saR$sa[$saj$san$sar$sa!S$sa!l$sa!p$sa#R$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#t$sa#u$sa#v$sa#x$sa#z$sa#{$sa$O$sa(a$sa(r$sa(y$sa(z$sa!]$sa!^$sa~O!Q*OO'y*POP$uaR$ua[$uaj$uan$uar$ua!S$ua!l$ua!p$ua#R$ua#n$ua#o$ua#p$ua#q$ua#r$ua#s$ua#t$ua#u$ua#v$ua#x$ua#z$ua#{$ua$O$ua(a$ua(r$ua(y$ua(z$ua!]$ua!^$ua~On>^O!Q*OO'y*PO(y$}O(z%PO~OP%TaR%Ta[%Taj%Tar%Ta!S%Ta!l%Ta!p%Ta#R%Ta#n%Ta#o%Ta#p%Ta#q%Ta#r%Ta#s%Ta#t%Ta#u%Ta#v%Ta#x%Ta#z%Ta#{%Ta$O%Ta(a%Ta(r%Ta!]%Ta!^%Ta~P''VO$O$mq!]$mq!^$mq~P#BwO$O$oq!]$oq!^$oq~P#BwO!^9oO~O$O9pO~P!1WO!g#vO!]'ei!k'ei~O!g#vO(r'pO!]'ei!k'ei~O!]/pO!k)Oq~O!Y'gi!]'gi~P#/sO!]/yO!Y)Pq~Or9wO!g#vO(r'pO~O[9yO!Y9xO~P#/sO!Y9xO~Oj:PO!g#vO~Og(_y!](_y~P!1WO!]'na!_'na~P#/sOa%[q!_%[q'z%[q!]%[q~P#/sO[:UO~O!]1TO!^)Xq~O`:YO~O#`:ZO!]'pa!^'pa~O!]5uO!^)Ui~P#BwO!S:]O~O!_1oO%i:`O~O(VTO(YUO(e:eO~O!]1zO!^)Vq~O!k:hO~O!k:iO~O!k:jO~O!k:jO~P%[O#`:mO!]#hy!^#hy~O!]#hy!^#hy~P#BwO%i:rO~P&8fO!_'`O%i:rO~O$O#|y!]#|y!^#|y~P#BwOP$|iR$|i[$|ij$|ir$|i!S$|i!l$|i!p$|i#R$|i#n$|i#o$|i#p$|i#q$|i#r$|i#s$|i#t$|i#u$|i#v$|i#x$|i#z$|i#{$|i$O$|i(a$|i(r$|i!]$|i!^$|i~P''VO!Q*OO'y*PO(z%POP'iaR'ia['iaj'ian'iar'ia!S'ia!l'ia!p'ia#R'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#v'ia#x'ia#z'ia#{'ia$O'ia(a'ia(r'ia(y'ia!]'ia!^'ia~O!Q*OO'y*POP'kaR'ka['kaj'kan'kar'ka!S'ka!l'ka!p'ka#R'ka#n'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#x'ka#z'ka#{'ka$O'ka(a'ka(r'ka(y'ka(z'ka!]'ka!^'ka~O(y$}OP%aiR%ai[%aij%ain%air%ai!Q%ai!S%ai!l%ai!p%ai#R%ai#n%ai#o%ai#p%ai#q%ai#r%ai#s%ai#t%ai#u%ai#v%ai#x%ai#z%ai#{%ai$O%ai'y%ai(a%ai(r%ai(z%ai!]%ai!^%ai~O(z%POP%ciR%ci[%cij%cin%cir%ci!Q%ci!S%ci!l%ci!p%ci#R%ci#n%ci#o%ci#p%ci#q%ci#r%ci#s%ci#t%ci#u%ci#v%ci#x%ci#z%ci#{%ci$O%ci'y%ci(a%ci(r%ci(y%ci!]%ci!^%ci~O$O$oy!]$oy!^$oy~P#BwO$O#cy!]#cy!^#cy~P#BwO!g#vO!]'eq!k'eq~O!]/pO!k)Oy~O!Y'gq!]'gq~P#/sOr:|O!g#vO(r'pO~O[;QO!Y;PO~P#/sO!Y;PO~Og(_!R!](_!R~P!1WOa%[y!_%[y'z%[y!]%[y~P#/sO!]1TO!^)Xy~O!]5uO!^)Uq~O(T;XO~O!_1oO%i;[O~O!k;_O~O%i;dO~P&8fOP$|qR$|q[$|qj$|qr$|q!S$|q!l$|q!p$|q#R$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#t$|q#u$|q#v$|q#x$|q#z$|q#{$|q$O$|q(a$|q(r$|q!]$|q!^$|q~P''VO!Q*OO'y*PO(z%POP'jaR'ja['jaj'jan'jar'ja!S'ja!l'ja!p'ja#R'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#x'ja#z'ja#{'ja$O'ja(a'ja(r'ja(y'ja!]'ja!^'ja~O!Q*OO'y*POP'laR'la['laj'lan'lar'la!S'la!l'la!p'la#R'la#n'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#x'la#z'la#{'la$O'la(a'la(r'la(y'la(z'la!]'la!^'la~OP%OqR%Oq[%Oqj%Oqr%Oq!S%Oq!l%Oq!p%Oq#R%Oq#n%Oq#o%Oq#p%Oq#q%Oq#r%Oq#s%Oq#t%Oq#u%Oq#v%Oq#x%Oq#z%Oq#{%Oq$O%Oq(a%Oq(r%Oq!]%Oq!^%Oq~P''VOg%e!Z!]%e!Z#`%e!Z$O%e!Z~P!1WO!Y;hO~P#/sOr;iO!g#vO(r'pO~O[;kO!Y;hO~P#/sO!]'pq!^'pq~P#BwO!]#h!Z!^#h!Z~P#BwO#k%e!ZP%e!ZR%e!Z[%e!Za%e!Zj%e!Zr%e!Z!S%e!Z!]%e!Z!l%e!Z!p%e!Z#R%e!Z#n%e!Z#o%e!Z#p%e!Z#q%e!Z#r%e!Z#s%e!Z#t%e!Z#u%e!Z#v%e!Z#x%e!Z#z%e!Z#{%e!Z'z%e!Z(a%e!Z(r%e!Z!k%e!Z!Y%e!Z'w%e!Z#`%e!Zv%e!Z!_%e!Z%i%e!Z!g%e!Z~P#/sOr;tO!g#vO(r'pO~O!Y;uO~P#/sOr;|O!g#vO(r'pO~O!Y;}O~P#/sOP%e!ZR%e!Z[%e!Zj%e!Zr%e!Z!S%e!Z!l%e!Z!p%e!Z#R%e!Z#n%e!Z#o%e!Z#p%e!Z#q%e!Z#r%e!Z#s%e!Z#t%e!Z#u%e!Z#v%e!Z#x%e!Z#z%e!Z#{%e!Z$O%e!Z(a%e!Z(r%e!Z!]%e!Z!^%e!Z~P''VOr<QO!g#vO(r'pO~Ov(fX~P1qO!Q%rO~P!)[O(U!lO~P!)[O!YfX!]fX#`fX~P%2OOP]XR]X[]Xj]Xr]X!Q]X!S]X!]]X!]fX!l]X!p]X#R]X#S]X#`]X#`fX#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X~O!gfX!k]X!kfX(rfX~P'LTOP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_XO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(T)]O(VTO(YUO(aVO(o[O~O!]<iO!^$qa~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<tO!S${O!_$|O!i>WO!l$xO#j<zO$W%`O$t<vO$v<xO$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~Ol)dO~P(!yOr!eX(r!eX~P#!iOr(jX(r(jX~P##[O!^]X!^fX~P'LTO!YfX!Y$zX!]fX!]$zX#`fX~P!0SO#k<^O~O!g#vO#k<^O~O#`<nO~Oj<bO~O#`=OO!](wX!^(wX~O#`<nO!](uX!^(uX~O#k=PO~Og=RO~P!1WO#k=XO~O#k=YO~Og=RO(T&ZO~O!g#vO#k=ZO~O!g#vO#k=PO~O$O=[O~P#BwO#k=]O~O#k=^O~O#k=cO~O#k=dO~O#k=eO~O#k=fO~O$O=gO~P!1WO$O=hO~P!1WOl=sO~P7eOk#S#T#U#W#X#[#i#j#u$n$t$v$y%]%^%h%i%j%q%s%v%w%y%{~(OT#o!X'|(U#ps#n#qr!Q'}$]'}(T$_(e~",
  goto: "$9Y)]PPPPPP)^PP)aP)rP+W/]PPPP6mPP7TPP=QPPP@tPA^PA^PPPA^PCfPA^PA^PA^PCjPCoPD^PIWPPPI[PPPPI[L_PPPLeMVPI[PI[PP! eI[PPPI[PI[P!#lI[P!'S!(X!(bP!)U!)Y!)U!,gPPPPPPP!-W!(XPP!-h!/YP!2iI[I[!2n!5z!:h!:h!>gPPP!>oI[PPPPPPPPP!BOP!C]PPI[!DnPI[PI[I[I[I[I[PI[!FQP!I[P!LbP!Lf!Lp!Lt!LtP!IXP!Lx!LxP#!OP#!SI[PI[#!Y#%_CjA^PA^PA^A^P#&lA^A^#)OA^#+vA^#.SA^A^#.r#1W#1W#1]#1f#1W#1qPP#1WPA^#2ZA^#6YA^A^6mPPP#:_PPP#:x#:xP#:xP#;`#:xPP#;fP#;]P#;]#;y#;]#<e#<k#<n)aP#<q)aP#<z#<z#<zP)aP)aP)aP)aPP)aP#=Q#=TP#=T)aP#=XP#=[P)aP)aP)aP)aP)aP)a)aPP#=b#=h#=s#=y#>P#>V#>]#>k#>q#>{#?R#?]#?c#?s#?y#@k#@}#AT#AZ#Ai#BO#Cs#DR#DY#Et#FS#Gt#HS#HY#H`#Hf#Hp#Hv#H|#IW#Ij#IpPPPPPPPPPPP#IvPPPPPPP#Jk#Mx$ b$ i$ qPPP$']P$'f$*_$0x$0{$1O$1}$2Q$2X$2aP$2g$2jP$3W$3[$4S$5b$5g$5}PP$6S$6Y$6^$6a$6e$6i$7e$7|$8e$8i$8l$8o$8y$8|$9Q$9UR!|RoqOXst!Z#d%m&r&t&u&w,s,x2[2_Y!vQ'`-e1o5{Q%tvQ%|yQ&T|Q&j!VS'W!e-]Q'f!iS'l!r!yU*k$|*Z*oQ+o%}S+|&V&WQ,d&dQ-c'_Q-m'gQ-u'mQ0[*qQ1b,OQ1y,eR<{<Y%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+],p,s,x-i-q.P.V.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3l4z6T6e6f6i6|8t9T9_S#q]<V!r)_$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SU+P%]<s<tQ+t&PQ,f&gQ,m&oQ0x+gQ0}+iQ1Y+uQ2R,kQ3`.gQ5`0|Q5f1TQ6[1zQ7Y3dQ8`5gR9e7['QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S!S!nQ!r!v!y!z$|'W'_'`'l'm'n*k*o*q*r-]-c-e-u0[0_1o5{5}%[$ti#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^Q&X|Q'U!eS'[%i-`Q+t&PQ,P&WQ,f&gQ0n+SQ1Y+uQ1_+{Q2Q,jQ2R,kQ5f1TQ5o1aQ6[1zQ6_1|Q6`2PQ8`5gQ8c5lQ8|6bQ:X8dQ:f8yQ;V:YR<}*ZrnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_R,h&k&z^OPXYstuvwz!Z!`!g!j!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'b'r(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>R>S[#]WZ#W#Z'X(T!b%jm#h#i#l$x%e%h(^(h(i(j*Y*^*b+Z+[+^,o-V.T.Z.[.]._/m/p2d3[3]4a6r7TQ%wxQ%{yW&Q|&V&W,OQ&_!TQ'c!hQ'e!iQ(q#sS+n%|%}Q+r&PQ,_&bQ,c&dS-l'f'gQ.i(rQ1R+oQ1X+uQ1Z+vQ1^+zQ1t,`S1x,d,eQ2|-mQ5e1TQ5i1WQ5n1`Q6Z1yQ8_5gQ8b5kQ8f5pQ:T8^R;T:U!U$zi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y!^%yy!i!u%{%|%}'V'e'f'g'k'u*j+n+o-Y-l-m-t0R0U1R2u2|3T4r4s4v7}9{Q+h%wQ,T&[Q,W&]Q,b&dQ.h(qQ1s,_U1w,c,d,eQ3e.iQ6U1tS6Y1x1yQ8x6Z#f>T#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^o>U<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hW%Ti%V*y>PS&[!Q&iQ&]!RQ&^!SU*}%[%d=sR,R&Y%]%Si#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^T)z$u){V+P%]<s<tW'[!e%i*Z-`S(}#y#zQ+c%rQ+y&SS.b(m(nQ1j,XQ5T0kR8i5u'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S$i$^c#Y#e%q%s%u(S(Y(t(y)R)S)T)U)V)W)X)Y)Z)[)^)`)b)g)q+d+x-Z-x-}.S.U.s.v.z.|.}/O/b0p2k2n3O3V3k3p3q3r3s3t3u3v3w3x3y3z3{3|4P4Q4X5X5c6u6{7Q7a7b7k7l8k9X9]9g9m9n:o;W;`<W=vT#TV#U'RkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ'Y!eR2q-]!W!nQ!e!r!v!y!z$|'W'_'`'l'm'n*Z*k*o*q*r-]-c-e-u0[0_1o5{5}R1l,ZnqOXst!Z#d%m&r&t&u&w,s,x2[2_Q&y!^Q'v!xS(s#u<^Q+l%zQ,]&_Q,^&aQ-j'dQ-w'oS.r(x=PS0q+X=ZQ1P+mQ1n,[Q2c,zQ2e,{Q2m-WQ2z-kQ2}-oS5Y0r=eQ5a1QS5d1S=fQ6t2oQ6x2{Q6}3SQ8]5bQ9Y6vQ9Z6yQ9^7OR:l9V$d$]c#Y#e%s%u(S(Y(t(y)R)S)T)U)V)W)X)Y)Z)[)^)`)b)g)q+d+x-Z-x-}.S.U.s.v.z.}/O/b0p2k2n3O3V3k3p3q3r3s3t3u3v3w3x3y3z3{3|4P4Q4X5X5c6u6{7Q7a7b7k7l8k9X9]9g9m9n:o;W;`<W=vS(o#p'iQ)P#zS+b%q.|S.c(n(pR3^.d'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SS#q]<VQ&t!XQ&u!YQ&w![Q&x!]R2Z,vQ'a!hQ+e%wQ-h'cS.e(q+hQ2x-gW3b.h.i0w0yQ6w2yW7U3_3a3e5^U9a7V7X7ZU:q9c9d9fS;b:p:sQ;p;cR;x;qU!wQ'`-eT5y1o5{!Q_OXZ`st!V!Z#d#h%e%m&i&k&r&t&u&w(j,s,x.[2[2_]!pQ!r'`-e1o5{T#q]<V%^{OPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_S(}#y#zS.b(m(n!s=l$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SU$fd)_,mS(p#p'iU*v%R(w4OU0m+O.n7gQ5^0xQ7V3`Q9d7YR:s9em!tQ!r!v!y!z'`'l'm'n-e-u1o5{5}Q't!uS(f#g2US-s'k'wQ/s*]Q0R*jQ3U-vQ4f/tQ4r0TQ4s0UQ4x0^Q7r4`S7}4t4vS8R4y4{Q9r7sQ9v7yQ9{8OQ:Q8TS:{9w9xS;g:|;PS;s;h;iS;{;t;uS<P;|;}R<S<QQ#wbQ's!uS(e#g2US(g#m+WQ+Y%fQ+j%xQ+p&OU-r'k't'wQ.W(fU/r*]*`/wQ0S*jQ0V*lQ1O+kQ1u,aS3R-s-vQ3Z.`S4e/s/tQ4n0PS4q0R0^Q4u0WQ6W1vQ7P3US7q4`4bQ7u4fU7|4r4x4{Q8P4wQ8v6XS9q7r7sQ9u7yQ9}8RQ:O8SQ:c8wQ:y9rS:z9v9xQ;S:QQ;^:dS;f:{;PS;r;g;hS;z;s;uS<O;{;}Q<R<PQ<T<SQ=o=jQ={=tR=|=uV!wQ'`-e%^aOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_S#wz!j!r=i$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SR=o>R%^bOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_Q%fj!^%xy!i!u%{%|%}'V'e'f'g'k'u*j+n+o-Y-l-m-t0R0U1R2u2|3T4r4s4v7}9{S&Oz!jQ+k%yQ,a&dW1v,b,c,d,eU6X1w1x1yS8w6Y6ZQ:d8x!r=j$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ=t>QR=u>R%QeOPXYstuvw!Z!`!g!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_Y#bWZ#W#Z(T!b%jm#h#i#l$x%e%h(^(h(i(j*Y*^*b+Z+[+^,o-V.T.Z.[.]._/m/p2d3[3]4a6r7TQ,n&o!p=k$Z$n)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SR=n'XU']!e%i*ZR2s-`%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+],p,s,x-i-q.P.V.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3l4z6T6e6f6i6|8t9T9_!r)_$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ,m&oQ0x+gQ3`.gQ7Y3dR9e7[!b$Tc#Y%q(S(Y(t(y)Z)[)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<W!P<d)^)q-Z.|2k2n3p3y3z4P4X6u7b7k7l8k9X9g9m9n;W;`=v!f$Vc#Y%q(S(Y(t(y)W)X)Z)[)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<W!T<f)^)q-Z.|2k2n3p3v3w3y3z4P4X6u7b7k7l8k9X9g9m9n;W;`=v!^$Zc#Y%q(S(Y(t(y)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<WQ4_/kz>S)^)q-Z.|2k2n3p4P4X6u7b7k7l8k9X9g9m9n;W;`=vQ>X>ZR>Y>['QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SS$oh$pR4U/U'XgOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/U/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>ST$kf$qQ$ifS)j$l)nR)v$qT$jf$qT)l$l)n'XhOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/U/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>ST$oh$pQ$rhR)u$p%^jOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_!s>Q$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S#glOPXZst!Z!`!o#S#d#o#{$n%m&k&n&o&r&t&u&w&{'T'b)O)s*i+]+g,p,s,x-i.g/V/n0]0l1r2S2T2V2X2[2_2a3d4T4z6T6e6f6i7[8t9T!U%Ri$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y#f(w#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^Q+T%aQ/c*Oo4O<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!U$yi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>YQ*c$zU*l$|*Z*oQ+U%bQ0W*m#f=q#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n=r<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hQ=w>TQ=x>UQ=y>VR=z>W!U%Ri$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y#f(w#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^o4O<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hnoOXst!Z#d%m&r&t&u&w,s,x2[2_S*f${*YQ-R'OQ-S'QR4i/y%[%Si#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^Q,U&]Q1h,WQ5s1gR8h5tV*n$|*Z*oU*n$|*Z*oT5z1o5{S0P*i/nQ4w0]T8S4z:]Q+j%xQ0V*lQ1O+kQ1u,aQ6W1vQ8v6XQ:c8wR;^:d!U%Oi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Yx*R$v)e*S*u+V/v0d0e4R4g5R5S5W7p8U:R:x=p=}>OS0`*t0a#f<o#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n<p<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!d=S(u)c*[*e.j.m.q/_/k/|0v1e3h4[4h4l5r7]7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[`=T3}7c7f7j9h:t:w;yS=_.l3iT=`7e9k!U%Qi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y|*T$v)e*U*t+V/g/v0d0e4R4g4|5R5S5W7p8U:R:x=p=}>OS0b*u0c#f<q#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n<r<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!h=U(u)c*[*e.k.l.q/_/k/|0v1e3f3h4[4h4l5r7]7^7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[d=V3}7d7e7j9h9i:t:u:w;yS=a.m3jT=b7f9lrnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_Q&f!UR,p&ornOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_R&f!UQ,Y&^R1d,RsnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_Q1p,_S6R1s1tU8p6P6Q6US:_8r8sS;Y:^:aQ;m;ZR;w;nQ&m!VR,i&iR6_1|R:f8yW&Q|&V&W,OR1Z+vQ&r!WR,s&sR,y&xT2],x2_R,}&yQ,|&yR2f,}Q'y!{R-y'ySsOtQ#dXT%ps#dQ#OTR'{#OQ#RUR'}#RQ){$uR/`){Q#UVR(Q#UQ#XWU(W#X(X.QQ(X#YR.Q(YQ-^'YR2r-^Q.u(yS3m.u3nR3n.vQ-e'`R2v-eY!rQ'`-e1o5{R'j!rQ/Q)eR4S/QU#_W%h*YU(_#_(`.RQ(`#`R.R(ZQ-a']R2t-at`OXst!V!Z#d%m&i&k&r&t&u&w,s,x2[2_S#hZ%eU#r`#h.[R.[(jQ(k#jQ.X(gW.a(k.X3X7RQ3X.YR7R3YQ)n$lR/W)nQ$phR)t$pQ$`cU)a$`-|<jQ-|<WR<j)qQ/q*]W4c/q4d7t9sU4d/r/s/tS7t4e4fR9s7u$e*Q$v(u)c)e*[*e*t*u+Q+R+V.l.m.o.p.q/_/g/i/k/v/|0d0e0v1e3f3g3h3}4R4[4g4h4l4|5O5R5S5W5r7]7^7_7`7e7f7h7i7j7p7w7z8U8X8Z9h9i9j9t9|:R:S:t:u:v:w:x:};R;e;j;v;y=p=}>O>Z>[Q/z*eU4k/z4m7xQ4m/|R7x4lS*o$|*ZR0Y*ox*S$v)e*t*u+V/v0d0e4R4g5R5S5W7p8U:R:x=p=}>O!d.j(u)c*[*e.l.m.q/_/k/|0v1e3h4[4h4l5r7]7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[U/h*S.j7ca7c3}7e7f7j9h:t:w;yQ0a*tQ3i.lU4}0a3i9kR9k7e|*U$v)e*t*u+V/g/v0d0e4R4g4|5R5S5W7p8U:R:x=p=}>O!h.k(u)c*[*e.l.m.q/_/k/|0v1e3f3h4[4h4l5r7]7^7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[U/j*U.k7de7d3}7e7f7j9h9i:t:u:w;yQ0c*uQ3j.mU5P0c3j9lR9l7fQ*z%UR0g*zQ5]0vR8Y5]Q+_%kR0u+_Q5v1jS8j5v:[R:[8kQ,[&_R1m,[Q5{1oR8m5{Q1{,fS6]1{8zR8z6_Q1U+rW5h1U5j8a:VQ5j1XQ8a5iR:V8bQ+w&QR1[+wQ2_,xR6m2_YrOXst#dQ&v!ZQ+a%mQ,r&rQ,t&tQ,u&uQ,w&wQ2Y,sS2],x2_R6l2[Q%opQ&z!_Q&}!aQ'P!bQ'R!cQ'q!uQ+`%lQ+l%zQ,Q&XQ,h&mQ-P&|W-p'k's't'wQ-w'oQ0X*nQ1P+mQ1c,PS2O,i,lQ2g-OQ2h-RQ2i-SQ2}-oW3P-r-s-v-xQ5a1QQ5m1_Q5q1eQ6V1uQ6a2QQ6k2ZU6z3O3R3UQ6}3SQ8]5bQ8e5oQ8g5rQ8l5zQ8u6WQ8{6`S9[6{7PQ9^7OQ:W8cQ:b8vQ:g8|Q:n9]Q;U:XQ;]:cQ;a:oQ;l;VR;o;^Q%zyQ'd!iQ'o!uU+m%{%|%}Q-W'VU-k'e'f'gS-o'k'uQ0Q*jS1Q+n+oQ2o-YS2{-l-mQ3S-tS4p0R0UQ5b1RQ6v2uQ6y2|Q7O3TU7{4r4s4vQ9z7}R;O9{S$wi>PR*{%VU%Ui%V>PR0f*yQ$viS(u#v+iS)c$b$cQ)e$dQ*[$xS*e${*YQ*t%OQ*u%QQ+Q%^Q+R%_Q+V%cQ.l<oQ.m<qQ.o<uQ.p<wQ.q<yQ/_)yQ/g*RQ/i*TQ/k*VQ/v*aS/|*g/mQ0d*wQ0e*xl0v+f,V.f1i1q3c6S7W8q9b:`:r;[;dQ1e,SQ3f=SQ3g=UQ3h=XS3}<l<mQ4R/PS4[/d4^Q4g/xQ4h/yQ4l/{Q4|0`Q5O0bQ5R0iQ5S0jQ5W0oQ5r1fQ7]=]Q7^=_Q7_=aQ7`=cQ7e<pQ7f<rQ7h<vQ7i<xQ7j<zQ7p4_Q7w4jQ7z4oQ8U5QQ8X5[Q8Z5_Q9h=YQ9i=TQ9j=VQ9t7vQ9|8QQ:R8VQ:S8[Q:t=^Q:u=`Q:v=bQ:w=dQ:x9pQ:}9yQ;R:PQ;e=gQ;j;QQ;v;kQ;y=hQ=p>PQ=}>XQ>O>YQ>Z>]R>[>^Q+O%]Q.n<sR7g<tnpOXst!Z#d%m&r&t&u&w,s,x2[2_Q!fPS#fZ#oQ&|!`W'h!o*i0]4zQ(P#SQ)Q#{Q)r$nS,l&k&nQ,q&oQ-O&{S-T'T/nQ-g'bQ.x)OQ/[)sQ0s+]Q0y+gQ2W,pQ2y-iQ3a.gQ4W/VQ5U0lQ6Q1rQ6c2SQ6d2TQ6h2VQ6j2XQ6o2aQ7Z3dQ7m4TQ8s6TQ9P6eQ9Q6fQ9S6iQ9f7[Q:a8tR:k9T#[cOPXZst!Z!`!o#d#o#{%m&k&n&o&r&t&u&w&{'T'b)O*i+]+g,p,s,x-i.g/n0]0l1r2S2T2V2X2[2_2a3d4z6T6e6f6i7[8t9TQ#YWQ#eYQ%quQ%svS%uw!gS(S#W(VQ(Y#ZQ(t#uQ(y#xQ)R$OQ)S$PQ)T$QQ)U$RQ)V$SQ)W$TQ)X$UQ)Y$VQ)Z$WQ)[$XQ)^$ZQ)`$_Q)b$aQ)g$eW)q$n)s/V4TQ+d%tQ+x&RS-Z'X2pQ-x'rS-}(T.PQ.S(]Q.U(dQ.s(xQ.v(zQ.z<UQ.|<XQ.}<YQ/O<]Q/b)}Q0p+XQ2k-UQ2n-XQ3O-qQ3V.VQ3k.tQ3p<^Q3q<_Q3r<`Q3s<aQ3t<bQ3u<cQ3v<dQ3w<eQ3x<fQ3y<gQ3z<hQ3{.{Q3|<kQ4P<nQ4Q<{Q4X<iQ5X0rQ5c1SQ6u=OQ6{3QQ7Q3WQ7a3lQ7b=PQ7k=RQ7l=ZQ8k5wQ9X6sQ9]6|Q9g=[Q9m=eQ9n=fQ:o9_Q;W:ZQ;`:mQ<W#SR=v>SR#[WR'Z!el!tQ!r!v!y!z'`'l'm'n-e-u1o5{5}S'V!e-]U*j$|*Z*oS-Y'W'_S0U*k*qQ0^*rQ2u-cQ4v0[R4{0_R({#xQ!fQT-d'`-e]!qQ!r'`-e1o5{Q#p]R'i<VR)f$dY!uQ'`-e1o5{Q'k!rS'u!v!yS'w!z5}S-t'l'mQ-v'nR3T-uT#kZ%eS#jZ%eS%km,oU(g#h#i#lS.Y(h(iQ.^(jQ0t+^Q3Y.ZU3Z.[.]._S7S3[3]R9`7Td#^W#W#Z%h(T(^*Y+Z.T/mr#gZm#h#i#l%e(h(i(j+^.Z.[.]._3[3]7TS*]$x*bQ/t*^Q2U,oQ2l-VQ4`/pQ6q2dQ7s4aQ9W6rT=m'X+[V#aW%h*YU#`W%h*YS(U#W(^U(Z#Z+Z/mS-['X+[T.O(T.TV'^!e%i*ZQ$lfR)x$qT)m$l)nR4V/UT*_$x*bT*h${*YQ0w+fQ1g,VQ3_.fQ5t1iQ6P1qQ7X3cQ8r6SQ9c7WQ:^8qQ:p9bQ;Z:`Q;c:rQ;n;[R;q;dnqOXst!Z#d%m&r&t&u&w,s,x2[2_Q&l!VR,h&itmOXst!U!V!Z#d%m&i&r&t&u&w,s,x2[2_R,o&oT%lm,oR1k,XR,g&gQ&U|S+}&V&WR1^,OR+s&PT&p!W&sT&q!W&sT2^,x2_",
  nodeNames: "⚠ ArithOp ArithOp ?. JSXStartTag LineComment BlockComment Script Hashbang ExportDeclaration export Star as VariableName String Escape from ; default FunctionDeclaration async function VariableDefinition > < TypeParamList in out const TypeDefinition extends ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation InterpolationStart NullType null VoidType void TypeofType typeof MemberExpression . PropertyName [ TemplateString Escape Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewTarget new NewExpression ) ( ArgList UnaryExpression delete LogicOp BitOp YieldExpression yield AwaitExpression await ParenthesizedExpression ClassExpression class ClassBody MethodDeclaration Decorator @ MemberExpression PrivatePropertyName CallExpression TypeArgList CompareOp < declare Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression InstantiationExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast < ArrowFunction TypeParamList SequenceExpression InstantiationExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate asserts is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var using TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration defer ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement SingleExpression SingleClassItem",
  maxTerm: 380,
  context: h0,
  nodeProps: [
    ["isolate", -8, 5, 6, 14, 37, 39, 51, 53, 55, ""],
    ["group", -26, 9, 17, 19, 68, 207, 211, 215, 216, 218, 221, 224, 234, 237, 243, 245, 247, 249, 252, 258, 264, 266, 268, 270, 272, 274, 275, "Statement", -34, 13, 14, 32, 35, 36, 42, 51, 54, 55, 57, 62, 70, 72, 76, 80, 82, 84, 85, 110, 111, 120, 121, 136, 139, 141, 142, 143, 144, 145, 147, 148, 167, 169, 171, "Expression", -23, 31, 33, 37, 41, 43, 45, 173, 175, 177, 178, 180, 181, 182, 184, 185, 186, 188, 189, 190, 201, 203, 205, 206, "Type", -3, 88, 103, 109, "ClassItem"],
    ["openedBy", 23, "<", 38, "InterpolationStart", 56, "[", 60, "{", 73, "(", 160, "JSXStartCloseTag"],
    ["closedBy", -2, 24, 168, ">", 40, "InterpolationEnd", 50, "]", 61, "}", 74, ")", 165, "JSXEndTag"]
  ],
  propSources: [m0],
  skippedNodes: [0, 5, 6, 278],
  repeatNodeCount: 37,
  tokenData: "$Fq07[R!bOX%ZXY+gYZ-yZ[+g[]%Z]^.c^p%Zpq+gqr/mrs3cst:_tuEruvJSvwLkwx! Yxy!'iyz!(sz{!)}{|!,q|}!.O}!O!,q!O!P!/Y!P!Q!9j!Q!R#:O!R![#<_![!]#I_!]!^#Jk!^!_#Ku!_!`$![!`!a$$v!a!b$*T!b!c$,r!c!}Er!}#O$-|#O#P$/W#P#Q$4o#Q#R$5y#R#SEr#S#T$7W#T#o$8b#o#p$<r#p#q$=h#q#r$>x#r#s$@U#s$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$I|Er$I|$I}$Dk$I}$JO$Dk$JO$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr(n%d_$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&j&hT$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c&j&zP;=`<%l&c'|'U]$i&j(Z!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!b(SU(Z!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!b(iP;=`<%l'}'|(oP;=`<%l&}'[(y]$i&j(WpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rp)wU(WpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)rp*^P;=`<%l)r'[*dP;=`<%l(r#S*nX(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g#S+^P;=`<%l*g(n+dP;=`<%l%Z07[+rq$i&j(Wp(Z!b'|0/lOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p$f%Z$f$g+g$g#BY%Z#BY#BZ+g#BZ$IS%Z$IS$I_+g$I_$JT%Z$JT$JU+g$JU$KV%Z$KV$KW+g$KW&FU%Z&FU&FV+g&FV;'S%Z;'S;=`+a<%l?HT%Z?HT?HU+g?HUO%Z07[.ST(X#S$i&j'}0/lO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c07[.n_$i&j(Wp(Z!b'}0/lOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)3p/x`$i&j!p),Q(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW1V`#v(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`2X!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW2d_#v(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At3l_(V':f$i&j(Z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k(^4r_$i&j(Z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k&z5vX$i&jOr5qrs6cs!^5q!^!_6y!_#o5q#o#p6y#p;'S5q;'S;=`7h<%lO5q&z6jT$d`$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c`6|TOr6yrs7]s;'S6y;'S;=`7b<%lO6y`7bO$d``7eP;=`<%l6y&z7kP;=`<%l5q(^7w]$d`$i&j(Z!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!r8uZ(Z!bOY8pYZ6yZr8prs9hsw8pwx6yx#O8p#O#P6y#P;'S8p;'S;=`:R<%lO8p!r9oU$d`(Z!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!r:UP;=`<%l8p(^:[P;=`<%l4k%9[:hh$i&j(Wp(Z!bOY%ZYZ&cZq%Zqr<Srs&}st%ZtuCruw%Zwx(rx!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr(r<__WS$i&j(Wp(Z!bOY<SYZ&cZr<Srs=^sw<Swx@nx!^<S!^!_Bm!_#O<S#O#P>`#P#o<S#o#pBm#p;'S<S;'S;=`Cl<%lO<S(Q=g]WS$i&j(Z!bOY=^YZ&cZw=^wx>`x!^=^!^!_?q!_#O=^#O#P>`#P#o=^#o#p?q#p;'S=^;'S;=`@h<%lO=^&n>gXWS$i&jOY>`YZ&cZ!^>`!^!_?S!_#o>`#o#p?S#p;'S>`;'S;=`?k<%lO>`S?XSWSOY?SZ;'S?S;'S;=`?e<%lO?SS?hP;=`<%l?S&n?nP;=`<%l>`!f?xWWS(Z!bOY?qZw?qwx?Sx#O?q#O#P?S#P;'S?q;'S;=`@b<%lO?q!f@eP;=`<%l?q(Q@kP;=`<%l=^'`@w]WS$i&j(WpOY@nYZ&cZr@nrs>`s!^@n!^!_Ap!_#O@n#O#P>`#P#o@n#o#pAp#p;'S@n;'S;=`Bg<%lO@ntAwWWS(WpOYApZrAprs?Ss#OAp#O#P?S#P;'SAp;'S;=`Ba<%lOAptBdP;=`<%lAp'`BjP;=`<%l@n#WBvYWS(Wp(Z!bOYBmZrBmrs?qswBmwxApx#OBm#O#P?S#P;'SBm;'S;=`Cf<%lOBm#WCiP;=`<%lBm(rCoP;=`<%l<S%9[C}i$i&j(o%1l(Wp(Z!bOY%ZYZ&cZr%Zrs&}st%ZtuCruw%Zwx(rx!Q%Z!Q![Cr![!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr%9[EoP;=`<%lCr07[FRk$i&j(Wp(Z!b$]#t(T,2j(e$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr+dHRk$i&j(Wp(Z!b$]#tOY%ZYZ&cZr%Zrs&}st%ZtuGvuw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Gv![!^%Z!^!_*g!_!c%Z!c!}Gv!}#O%Z#O#P&c#P#R%Z#R#SGv#S#T%Z#T#oGv#o#p*g#p$g%Z$g;'SGv;'S;=`Iv<%lOGv+dIyP;=`<%lGv07[JPP;=`<%lEr(KWJ_`$i&j(Wp(Z!b#p(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWKl_$i&j$Q(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,#xLva(z+JY$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sv%ZvwM{wx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWNW`$i&j#z(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At! c_(Y';W$i&j(WpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b'l!!i_$i&j(WpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b&z!#mX$i&jOw!#hwx6cx!^!#h!^!_!$Y!_#o!#h#o#p!$Y#p;'S!#h;'S;=`!$r<%lO!#h`!$]TOw!$Ywx7]x;'S!$Y;'S;=`!$l<%lO!$Y`!$oP;=`<%l!$Y&z!$uP;=`<%l!#h'l!%R]$d`$i&j(WpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r!Q!&PZ(WpOY!%zYZ!$YZr!%zrs!$Ysw!%zwx!&rx#O!%z#O#P!$Y#P;'S!%z;'S;=`!']<%lO!%z!Q!&yU$d`(WpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)r!Q!'`P;=`<%l!%z'l!'fP;=`<%l!!b/5|!'t_!l/.^$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#&U!)O_!k!Lf$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z-!n!*[b$i&j(Wp(Z!b(U%&f#q(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rxz%Zz{!+d{!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW!+o`$i&j(Wp(Z!b#n(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;x!,|`$i&j(Wp(Z!br+4YOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,$U!.Z_!]+Jf$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!/ec$i&j(Wp(Z!b!Q.2^OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!0p!P!Q%Z!Q![!3Y![!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!0ya$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!2O!P!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!2Z_![!L^$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!3eg$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!3Y![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S!3Y#S#X%Z#X#Y!4|#Y#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!5Vg$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx{%Z{|!6n|}%Z}!O!6n!O!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!6wc$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!8_c$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!9uf$i&j(Wp(Z!b#o(ChOY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcxz!;Zz{#-}{!P!;Z!P!Q#/d!Q!^!;Z!^!_#(i!_!`#7S!`!a#8i!a!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z?O!;fb$i&j(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z>^!<w`$i&j(Z!b!X7`OY!<nYZ&cZw!<nwx!=yx!P!<n!P!Q!Eq!Q!^!<n!^!_!Gr!_!}!<n!}#O!KS#O#P!Dy#P#o!<n#o#p!Gr#p;'S!<n;'S;=`!L]<%lO!<n<z!>Q^$i&j!X7`OY!=yYZ&cZ!P!=y!P!Q!>|!Q!^!=y!^!_!@c!_!}!=y!}#O!CW#O#P!Dy#P#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!?Td$i&j!X7`O!^&c!_#W&c#W#X!>|#X#Z&c#Z#[!>|#[#]&c#]#^!>|#^#a&c#a#b!>|#b#g&c#g#h!>|#h#i&c#i#j!>|#j#k!>|#k#m&c#m#n!>|#n#o&c#p;'S&c;'S;=`&w<%lO&c7`!@hX!X7`OY!@cZ!P!@c!P!Q!AT!Q!}!@c!}#O!Ar#O#P!Bq#P;'S!@c;'S;=`!CQ<%lO!@c7`!AYW!X7`#W#X!AT#Z#[!AT#]#^!AT#a#b!AT#g#h!AT#i#j!AT#j#k!AT#m#n!AT7`!AuVOY!ArZ#O!Ar#O#P!B[#P#Q!@c#Q;'S!Ar;'S;=`!Bk<%lO!Ar7`!B_SOY!ArZ;'S!Ar;'S;=`!Bk<%lO!Ar7`!BnP;=`<%l!Ar7`!BtSOY!@cZ;'S!@c;'S;=`!CQ<%lO!@c7`!CTP;=`<%l!@c<z!C][$i&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#O!CW#O#P!DR#P#Q!=y#Q#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DWX$i&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DvP;=`<%l!CW<z!EOX$i&jOY!=yYZ&cZ!^!=y!^!_!@c!_#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!EnP;=`<%l!=y>^!Ezl$i&j(Z!b!X7`OY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#W&}#W#X!Eq#X#Z&}#Z#[!Eq#[#]&}#]#^!Eq#^#a&}#a#b!Eq#b#g&}#g#h!Eq#h#i&}#i#j!Eq#j#k!Eq#k#m&}#m#n!Eq#n#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}8r!GyZ(Z!b!X7`OY!GrZw!Grwx!@cx!P!Gr!P!Q!Hl!Q!}!Gr!}#O!JU#O#P!Bq#P;'S!Gr;'S;=`!J|<%lO!Gr8r!Hse(Z!b!X7`OY'}Zw'}x#O'}#P#W'}#W#X!Hl#X#Z'}#Z#[!Hl#[#]'}#]#^!Hl#^#a'}#a#b!Hl#b#g'}#g#h!Hl#h#i'}#i#j!Hl#j#k!Hl#k#m'}#m#n!Hl#n;'S'};'S;=`(f<%lO'}8r!JZX(Z!bOY!JUZw!JUwx!Arx#O!JU#O#P!B[#P#Q!Gr#Q;'S!JU;'S;=`!Jv<%lO!JU8r!JyP;=`<%l!JU8r!KPP;=`<%l!Gr>^!KZ^$i&j(Z!bOY!KSYZ&cZw!KSwx!CWx!^!KS!^!_!JU!_#O!KS#O#P!DR#P#Q!<n#Q#o!KS#o#p!JU#p;'S!KS;'S;=`!LV<%lO!KS>^!LYP;=`<%l!KS>^!L`P;=`<%l!<n=l!Ll`$i&j(Wp!X7`OY!LcYZ&cZr!Lcrs!=ys!P!Lc!P!Q!Mn!Q!^!Lc!^!_# o!_!}!Lc!}#O#%P#O#P!Dy#P#o!Lc#o#p# o#p;'S!Lc;'S;=`#&Y<%lO!Lc=l!Mwl$i&j(Wp!X7`OY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#W(r#W#X!Mn#X#Z(r#Z#[!Mn#[#](r#]#^!Mn#^#a(r#a#b!Mn#b#g(r#g#h!Mn#h#i(r#i#j!Mn#j#k!Mn#k#m(r#m#n!Mn#n#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r8Q# vZ(Wp!X7`OY# oZr# ors!@cs!P# o!P!Q#!i!Q!}# o!}#O#$R#O#P!Bq#P;'S# o;'S;=`#$y<%lO# o8Q#!pe(Wp!X7`OY)rZr)rs#O)r#P#W)r#W#X#!i#X#Z)r#Z#[#!i#[#])r#]#^#!i#^#a)r#a#b#!i#b#g)r#g#h#!i#h#i)r#i#j#!i#j#k#!i#k#m)r#m#n#!i#n;'S)r;'S;=`*Z<%lO)r8Q#$WX(WpOY#$RZr#$Rrs!Ars#O#$R#O#P!B[#P#Q# o#Q;'S#$R;'S;=`#$s<%lO#$R8Q#$vP;=`<%l#$R8Q#$|P;=`<%l# o=l#%W^$i&j(WpOY#%PYZ&cZr#%Prs!CWs!^#%P!^!_#$R!_#O#%P#O#P!DR#P#Q!Lc#Q#o#%P#o#p#$R#p;'S#%P;'S;=`#&S<%lO#%P=l#&VP;=`<%l#%P=l#&]P;=`<%l!Lc?O#&kn$i&j(Wp(Z!b!X7`OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#W%Z#W#X#&`#X#Z%Z#Z#[#&`#[#]%Z#]#^#&`#^#a%Z#a#b#&`#b#g%Z#g#h#&`#h#i%Z#i#j#&`#j#k#&`#k#m%Z#m#n#&`#n#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z9d#(r](Wp(Z!b!X7`OY#(iZr#(irs!Grsw#(iwx# ox!P#(i!P!Q#)k!Q!}#(i!}#O#+`#O#P!Bq#P;'S#(i;'S;=`#,`<%lO#(i9d#)th(Wp(Z!b!X7`OY*gZr*grs'}sw*gwx)rx#O*g#P#W*g#W#X#)k#X#Z*g#Z#[#)k#[#]*g#]#^#)k#^#a*g#a#b#)k#b#g*g#g#h#)k#h#i*g#i#j#)k#j#k#)k#k#m*g#m#n#)k#n;'S*g;'S;=`+Z<%lO*g9d#+gZ(Wp(Z!bOY#+`Zr#+`rs!JUsw#+`wx#$Rx#O#+`#O#P!B[#P#Q#(i#Q;'S#+`;'S;=`#,Y<%lO#+`9d#,]P;=`<%l#+`9d#,cP;=`<%l#(i?O#,o`$i&j(Wp(Z!bOY#,fYZ&cZr#,frs!KSsw#,fwx#%Px!^#,f!^!_#+`!_#O#,f#O#P!DR#P#Q!;Z#Q#o#,f#o#p#+`#p;'S#,f;'S;=`#-q<%lO#,f?O#-tP;=`<%l#,f?O#-zP;=`<%l!;Z07[#.[b$i&j(Wp(Z!b(O0/l!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z07[#/o_$i&j(Wp(Z!bT0/lOY#/dYZ&cZr#/drs#0nsw#/dwx#4Ox!^#/d!^!_#5}!_#O#/d#O#P#1p#P#o#/d#o#p#5}#p;'S#/d;'S;=`#6|<%lO#/d06j#0w]$i&j(Z!bT0/lOY#0nYZ&cZw#0nwx#1px!^#0n!^!_#3R!_#O#0n#O#P#1p#P#o#0n#o#p#3R#p;'S#0n;'S;=`#3x<%lO#0n05W#1wX$i&jT0/lOY#1pYZ&cZ!^#1p!^!_#2d!_#o#1p#o#p#2d#p;'S#1p;'S;=`#2{<%lO#1p0/l#2iST0/lOY#2dZ;'S#2d;'S;=`#2u<%lO#2d0/l#2xP;=`<%l#2d05W#3OP;=`<%l#1p01O#3YW(Z!bT0/lOY#3RZw#3Rwx#2dx#O#3R#O#P#2d#P;'S#3R;'S;=`#3r<%lO#3R01O#3uP;=`<%l#3R06j#3{P;=`<%l#0n05x#4X]$i&j(WpT0/lOY#4OYZ&cZr#4Ors#1ps!^#4O!^!_#5Q!_#O#4O#O#P#1p#P#o#4O#o#p#5Q#p;'S#4O;'S;=`#5w<%lO#4O00^#5XW(WpT0/lOY#5QZr#5Qrs#2ds#O#5Q#O#P#2d#P;'S#5Q;'S;=`#5q<%lO#5Q00^#5tP;=`<%l#5Q05x#5zP;=`<%l#4O01p#6WY(Wp(Z!bT0/lOY#5}Zr#5}rs#3Rsw#5}wx#5Qx#O#5}#O#P#2d#P;'S#5};'S;=`#6v<%lO#5}01p#6yP;=`<%l#5}07[#7PP;=`<%l#/d)3h#7ab$i&j$Q(Ch(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;ZAt#8vb$Z#t$i&j(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z'Ad#:Zp$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#U%Z#U#V#?i#V#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#d#Bq#d#l%Z#l#m#Es#m#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#<jk$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#>j_$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#?rd$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#A]f$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Bzc$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Dbe$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#E|g$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Gpi$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x#Il_!g$b$i&j$O)Lv(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)[#Jv_al$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f#LS^h#)`#R-<U(Wp(Z!b$n7`OY*gZr*grs'}sw*gwx)rx!P*g!P!Q#MO!Q!^*g!^!_#Mt!_!`$ f!`#O*g#P;'S*g;'S;=`+Z<%lO*g(n#MXX$k&j(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El#M}Z#r(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx!_*g!_!`#Np!`#O*g#P;'S*g;'S;=`+Z<%lO*g(El#NyX$Q(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El$ oX#s(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g*)x$!ga#`*!Y$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`!a$#l!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(K[$#w_#k(Cl$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x$%Vag!*r#s(Ch$f#|$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`$&[!`!a$'f!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$&g_#s(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$'qa#r(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`!a$(v!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$)R`#r(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(Kd$*`a(r(Ct$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!a%Z!a!b$+e!b#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$+p`$i&j#{(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#`$,}_!|$Ip$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f$.X_!S0,v$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(n$/]Z$i&jO!^$0O!^!_$0f!_#i$0O#i#j$0k#j#l$0O#l#m$2^#m#o$0O#o#p$0f#p;'S$0O;'S;=`$4i<%lO$0O(n$0VT_#S$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#S$0kO_#S(n$0p[$i&jO!Q&c!Q![$1f![!^&c!_!c&c!c!i$1f!i#T&c#T#Z$1f#Z#o&c#o#p$3|#p;'S&c;'S;=`&w<%lO&c(n$1kZ$i&jO!Q&c!Q![$2^![!^&c!_!c&c!c!i$2^!i#T&c#T#Z$2^#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$2cZ$i&jO!Q&c!Q![$3U![!^&c!_!c&c!c!i$3U!i#T&c#T#Z$3U#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$3ZZ$i&jO!Q&c!Q![$0O![!^&c!_!c&c!c!i$0O!i#T&c#T#Z$0O#Z#o&c#p;'S&c;'S;=`&w<%lO&c#S$4PR!Q![$4Y!c!i$4Y#T#Z$4Y#S$4]S!Q![$4Y!c!i$4Y#T#Z$4Y#q#r$0f(n$4lP;=`<%l$0O#1[$4z_!Y#)l$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$6U`#x(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;p$7c_$i&j(Wp(Z!b(a+4QOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$8qk$i&j(Wp(Z!b(T,2j$_#t(e$I[OY%ZYZ&cZr%Zrs&}st%Ztu$8buw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$8b![!^%Z!^!_*g!_!c%Z!c!}$8b!}#O%Z#O#P&c#P#R%Z#R#S$8b#S#T%Z#T#o$8b#o#p*g#p$g%Z$g;'S$8b;'S;=`$<l<%lO$8b+d$:qk$i&j(Wp(Z!b$_#tOY%ZYZ&cZr%Zrs&}st%Ztu$:fuw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$:f![!^%Z!^!_*g!_!c%Z!c!}$:f!}#O%Z#O#P&c#P#R%Z#R#S$:f#S#T%Z#T#o$:f#o#p*g#p$g%Z$g;'S$:f;'S;=`$<f<%lO$:f+d$<iP;=`<%l$:f07[$<oP;=`<%l$8b#Jf$<{X!_#Hb(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g,#x$=sa(y+JY$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p#q$+e#q;'S%Z;'S;=`+a<%lO%Z)>v$?V_!^(CdvBr$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z?O$@a_!q7`$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$Aq|$i&j(Wp(Z!b'|0/l$]#t(T,2j(e$I[OX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr07[$D|k$i&j(Wp(Z!b'}0/l$]#t(T,2j(e$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr",
  tokenizers: [f0, u0, d0, p0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, c0, new tr("$S~RRtu[#O#Pg#S#T#|~_P#o#pb~gOx~~jVO#i!P#i#j!U#j#l!P#l#m!q#m;'S!P;'S;=`#v<%lO!P~!UO!U~~!XS!Q![!e!c!i!e#T#Z!e#o#p#Z~!hR!Q![!q!c!i!q#T#Z!q~!tR!Q![!}!c!i!}#T#Z!}~#QR!Q![!P!c!i!P#T#Z!P~#^R!Q![#g!c!i#g#T#Z#g~#jS!Q![#g!c!i#g#T#Z#g#q#r!P~#yP;=`<%l!P~$RO(c~~", 141, 340), new tr("j~RQYZXz{^~^O(Q~~aP!P!Qd~iO(R~~", 25, 323)],
  topRules: { Script: [0, 7], SingleExpression: [1, 276], SingleClassItem: [2, 277] },
  dialects: { jsx: 0, ts: 15175 },
  dynamicPrecedences: { 80: 1, 82: 1, 94: 1, 169: 1, 199: 1 },
  specialized: [{ term: 327, get: (n) => g0[n] || -1 }, { term: 343, get: (n) => Q0[n] || -1 }, { term: 95, get: (n) => $0[n] || -1 }],
  tokenPrec: 15201
}), Vu = [
  /* @__PURE__ */ we("function ${name}(${params}) {\n	${}\n}", {
    label: "function",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ we("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ we("for (let ${name} of ${collection}) {\n	${}\n}", {
    label: "for",
    detail: "of loop",
    type: "keyword"
  }),
  /* @__PURE__ */ we("do {\n	${}\n} while (${})", {
    label: "do",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ we("while (${}) {\n	${}\n}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ we(`try {
	\${}
} catch (\${error}) {
	\${}
}`, {
    label: "try",
    detail: "/ catch block",
    type: "keyword"
  }),
  /* @__PURE__ */ we("if (${}) {\n	${}\n}", {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  /* @__PURE__ */ we(`if (\${}) {
	\${}
} else {
	\${}
}`, {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  /* @__PURE__ */ we(`class \${name} {
	constructor(\${params}) {
		\${}
	}
}`, {
    label: "class",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ we('import {${names}} from "${module}"\n${}', {
    label: "import",
    detail: "named",
    type: "keyword"
  }),
  /* @__PURE__ */ we('import ${name} from "${module}"\n${}', {
    label: "import",
    detail: "default",
    type: "keyword"
  })
], S0 = /* @__PURE__ */ Vu.concat([
  /* @__PURE__ */ we("interface ${name} {\n	${}\n}", {
    label: "interface",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ we("type ${name} = ${type}", {
    label: "type",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ we("enum ${name} {\n	${}\n}", {
    label: "enum",
    detail: "definition",
    type: "keyword"
  })
]), uh = /* @__PURE__ */ new Cg(), zu = /* @__PURE__ */ new Set([
  "Script",
  "Block",
  "FunctionExpression",
  "FunctionDeclaration",
  "ArrowFunction",
  "MethodDeclaration",
  "ForStatement"
]);
function tn(n) {
  return (e, t) => {
    let i = e.node.getChild("VariableDefinition");
    return i && t(i, n), !0;
  };
}
const x0 = ["FunctionDeclaration"], X0 = {
  FunctionDeclaration: /* @__PURE__ */ tn("function"),
  ClassDeclaration: /* @__PURE__ */ tn("class"),
  ClassExpression: () => !0,
  EnumDeclaration: /* @__PURE__ */ tn("constant"),
  TypeAliasDeclaration: /* @__PURE__ */ tn("type"),
  NamespaceDeclaration: /* @__PURE__ */ tn("namespace"),
  VariableDefinition(n, e) {
    n.matchContext(x0) || e(n, "variable");
  },
  TypeDefinition(n, e) {
    e(n, "type");
  },
  __proto__: null
};
function Cu(n, e) {
  let t = uh.get(e);
  if (t)
    return t;
  let i = [], s = !0;
  function r(o, O) {
    let a = n.sliceString(o.from, o.to);
    i.push({ label: a, type: O });
  }
  return e.cursor(H.IncludeAnonymous).iterate((o) => {
    if (s)
      s = !1;
    else if (o.name) {
      let O = X0[o.name];
      if (O && O(o, r) || zu.has(o.name))
        return !1;
    } else if (o.to - o.from > 8192) {
      for (let O of Cu(n, o.node))
        i.push(O);
      return !1;
    }
  }), uh.set(e, i), i;
}
const dh = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/, Wu = [
  "TemplateString",
  "String",
  "RegExp",
  "LineComment",
  "BlockComment",
  "VariableDefinition",
  "TypeDefinition",
  "Label",
  "PropertyDefinition",
  "PropertyName",
  "PrivatePropertyDefinition",
  "PrivatePropertyName",
  "JSXText",
  "JSXAttributeValue",
  "JSXOpenTag",
  "JSXCloseTag",
  "JSXSelfClosingTag",
  ".",
  "?."
];
function b0(n) {
  let e = oe(n.state).resolveInner(n.pos, -1);
  if (Wu.indexOf(e.name) > -1)
    return null;
  let t = e.name == "VariableName" || e.to - e.from < 20 && dh.test(n.state.sliceDoc(e.from, e.to));
  if (!t && !n.explicit)
    return null;
  let i = [];
  for (let s = e; s; s = s.parent)
    zu.has(s.name) && (i = i.concat(Cu(n.state.doc, s)));
  return {
    options: i,
    from: t ? e.from : n.pos,
    validFor: dh
  };
}
const Oi = /* @__PURE__ */ ji.define({
  name: "javascript",
  parser: /* @__PURE__ */ P0.configure({
    props: [
      /* @__PURE__ */ $r.add({
        IfStatement: /* @__PURE__ */ yt({ except: /^\s*({|else\b)/ }),
        TryStatement: /* @__PURE__ */ yt({ except: /^\s*({|catch\b|finally\b)/ }),
        LabeledStatement: IO,
        SwitchBody: (n) => {
          let e = n.textAfter, t = /^\s*\}/.test(e), i = /^\s*(case|default)\b/.test(e);
          return n.baseIndent + (t ? 0 : i ? 1 : 2) * n.unit;
        },
        Block: /* @__PURE__ */ DO({ closing: "}" }),
        ArrowFunction: (n) => n.baseIndent + n.unit,
        "TemplateString BlockComment": () => null,
        "Statement Property": /* @__PURE__ */ yt({ except: /^\s*{/ }),
        JSXElement(n) {
          let e = /^\s*<\//.test(n.textAfter);
          return n.lineIndent(n.node.from) + (e ? 0 : n.unit);
        },
        JSXEscape(n) {
          let e = /\s*\}/.test(n.textAfter);
          return n.lineIndent(n.node.from) + (e ? 0 : n.unit);
        },
        "JSXOpenTag JSXSelfClosingTag"(n) {
          return n.column(n.node.from) + n.unit;
        }
      }),
      /* @__PURE__ */ Pr.add({
        "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": BO,
        BlockComment(n) {
          return { from: n.from + 2, to: n.to - 2 };
        },
        JSXElement(n) {
          let e = n.firstChild;
          if (!e || e.name == "JSXSelfClosingTag")
            return null;
          let t = n.lastChild;
          return { from: e.to, to: t.type.isError ? n.to : t.from };
        },
        "JSXSelfClosingTag JSXOpenTag"(n) {
          var e;
          let t = (e = n.firstChild) === null || e === void 0 ? void 0 : e.nextSibling, i = n.lastChild;
          return !t || t.type.isError ? null : { from: t.to, to: i.type.isError ? n.to : i.from };
        }
      })
    ]
  }),
  languageData: {
    closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
    wordChars: "$"
  }
}), ju = {
  test: (n) => /^JSX/.test(n.name),
  facet: /* @__PURE__ */ mf({ commentTokens: { block: { open: "{/*", close: "*/}" } } })
}, y0 = /* @__PURE__ */ Oi.configure({ dialect: "ts" }, "typescript"), w0 = /* @__PURE__ */ Oi.configure({
  dialect: "jsx",
  props: [/* @__PURE__ */ EO.add((n) => n.isTop ? [ju] : void 0)]
}), k0 = /* @__PURE__ */ Oi.configure({
  dialect: "jsx ts",
  props: [/* @__PURE__ */ EO.add((n) => n.isTop ? [ju] : void 0)]
}, "typescript");
let Au = (n) => ({ label: n, type: "keyword" });
const Eu = /* @__PURE__ */ "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(Au), Z0 = /* @__PURE__ */ Eu.concat(/* @__PURE__ */ ["declare", "implements", "private", "protected", "public"].map(Au));
function ca(n = {}) {
  let e = n.jsx ? n.typescript ? k0 : w0 : n.typescript ? y0 : Oi, t = n.typescript ? S0.concat(Z0) : Vu.concat(Eu);
  return new MO(e, [
    Oi.data.of({
      autocomplete: yP(Wu, $u(t))
    }),
    Oi.data.of({
      autocomplete: b0
    }),
    n.jsx ? U0 : []
  ]);
}
function v0(n) {
  for (; ; ) {
    if (n.name == "JSXOpenTag" || n.name == "JSXSelfClosingTag" || n.name == "JSXFragmentTag")
      return n;
    if (n.name == "JSXEscape" || !n.parent)
      return null;
    n = n.parent;
  }
}
function ph(n, e, t = n.length) {
  for (let i = e == null ? void 0 : e.firstChild; i; i = i.nextSibling)
    if (i.name == "JSXIdentifier" || i.name == "JSXBuiltin" || i.name == "JSXNamespacedName" || i.name == "JSXMemberExpression")
      return n.sliceString(i.from, Math.min(i.to, t));
  return "";
}
const T0 = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), U0 = /* @__PURE__ */ Z.inputHandler.of((n, e, t, i, s) => {
  if ((T0 ? n.composing : n.compositionStarted) || n.state.readOnly || e != t || i != ">" && i != "/" || !Oi.isActiveAt(n.state, e, -1))
    return !1;
  let r = s(), { state: o } = r, O = o.changeByRange((a) => {
    var l;
    let { head: h } = a, c = oe(o).resolveInner(h - 1, -1), f;
    if (c.name == "JSXStartTag" && (c = c.parent), !(o.doc.sliceString(h - 1, h) != i || c.name == "JSXAttributeValue" && c.to > h)) {
      if (i == ">" && c.name == "JSXFragmentTag")
        return { range: a, changes: { from: h, insert: "</>" } };
      if (i == "/" && c.name == "JSXStartCloseTag") {
        let u = c.parent, d = u.parent;
        if (d && u.from == h - 2 && ((f = ph(o.doc, d.firstChild, h)) || ((l = d.firstChild) === null || l === void 0 ? void 0 : l.name) == "JSXFragmentTag")) {
          let m = `${f}>`;
          return { range: $.cursor(h + m.length, -1), changes: { from: h, insert: m } };
        }
      } else if (i == ">") {
        let u = v0(c);
        if (u && u.name == "JSXOpenTag" && !/^\/?>|^<\//.test(o.doc.sliceString(h, h + 2)) && (f = ph(o.doc, u, h)))
          return { range: a, changes: { from: h, insert: `</${f}>` } };
      }
    }
    return { range: a };
  });
  return O.changes.empty ? !1 : (n.dispatch([
    r,
    o.update(O, { userEvent: "input.complete", scrollIntoView: !0 })
  ]), !0);
}), Y0 = mr({
  null: p.null,
  instanceof: p.operatorKeyword,
  this: p.self,
  "new super assert open to with void": p.keyword,
  "class interface extends implements enum var": p.definitionKeyword,
  "module package import": p.moduleKeyword,
  "switch while for if else case default do break continue return try catch finally throw": p.controlKeyword,
  "requires exports opens uses provides public private protected static transitive abstract final strictfp synchronized native transient volatile throws": p.modifier,
  IntegerLiteral: p.integer,
  FloatingPointLiteral: p.float,
  "StringLiteral TextBlock": p.string,
  CharacterLiteral: p.character,
  LineComment: p.lineComment,
  BlockComment: p.blockComment,
  BooleanLiteral: p.bool,
  PrimitiveType: p.standard(p.typeName),
  TypeName: p.typeName,
  Identifier: p.variableName,
  "MethodName/Identifier": p.function(p.variableName),
  Definition: p.definition(p.variableName),
  ArithOp: p.arithmeticOperator,
  LogicOp: p.logicOperator,
  BitOp: p.bitwiseOperator,
  CompareOp: p.compareOperator,
  AssignOp: p.definitionOperator,
  UpdateOp: p.updateOperator,
  Asterisk: p.punctuation,
  Label: p.labelName,
  "( )": p.paren,
  "[ ]": p.squareBracket,
  "{ }": p.brace,
  ".": p.derefOperator,
  ", ;": p.separator
}), R0 = { __proto__: null, true: 34, false: 34, null: 42, void: 46, byte: 48, short: 48, int: 48, long: 48, char: 48, float: 48, double: 48, boolean: 48, extends: 62, super: 64, class: 76, this: 78, new: 84, public: 100, protected: 102, private: 104, abstract: 106, static: 108, final: 110, strictfp: 112, default: 114, synchronized: 116, native: 118, transient: 120, volatile: 122, throws: 150, implements: 160, interface: 166, enum: 176, instanceof: 238, open: 267, module: 269, requires: 274, transitive: 276, exports: 278, to: 280, opens: 282, uses: 284, provides: 286, with: 288, package: 292, import: 296, if: 308, else: 310, while: 314, for: 318, var: 325, assert: 332, switch: 336, case: 342, do: 346, break: 350, continue: 354, return: 358, throw: 364, try: 368, catch: 372, finally: 380 }, _0 = Mi.deserialize({
  version: 14,
  states: "##jQ]QPOOQ$wQPOOO(bQQO'#H^O*iQQO'#CbOOQO'#Cb'#CbO*pQPO'#CaO*xOSO'#CpOOQO'#Hc'#HcOOQO'#Cu'#CuO,eQPO'#D_O-OQQO'#HmOOQO'#Hm'#HmO/gQQO'#HhO/nQQO'#HhOOQO'#Hh'#HhOOQO'#Hg'#HgO1rQPO'#DUO2PQPO'#GnO4wQPO'#D_O5OQPO'#DzO*pQPO'#E[O5qQPO'#E[OOQO'#DV'#DVO7SQQO'#HaO9^QQO'#EeO9eQPO'#EdO9jQPO'#EfOOQO'#Hb'#HbO7jQQO'#HbO:pQQO'#FhO:wQPO'#ExO:|QPO'#E}O:|QPO'#FPOOQO'#Ha'#HaOOQO'#HY'#HYOOQO'#Gh'#GhOOQO'#HX'#HXO<^QPO'#FiOOQO'#HW'#HWOOQO'#Gg'#GgQ]QPOOOOQO'#Hs'#HsO<cQPO'#HsO<hQPO'#D{O<hQPO'#EVO<hQPO'#EQO<pQPO'#HpO=RQQO'#EfO*pQPO'#C`O=ZQPO'#C`O*pQPO'#FcO=`QPO'#FeO=kQPO'#FkO=kQPO'#FnO<hQPO'#FsO=pQPO'#FpO:|QPO'#FwO=kQPO'#FyO]QPO'#GOO=uQPO'#GQO>QQPO'#GSO>]QPO'#GUO=kQPO'#GWO:|QPO'#GXO>dQPO'#GZO?QQQO'#HiO?mQQO'#CuO?tQPO'#HxO@SQPO'#D_O@rQPO'#DpO?wQPO'#DqO@|QPO'#HxOA_QPO'#DpOAgQPO'#IROAlQPO'#E`OOQO'#Hr'#HrOOQO'#Gm'#GmQ$wQPOOOAtQPO'#HsOOQO'#H^'#H^OCsQQO,58{OOQO'#H['#H[OOOO'#Gi'#GiOEfOSO,59[OOQO,59[,59[OOQO'#Hi'#HiOFVQPO,59eOGXQPO,59yOOQO-E:f-E:fO*pQPO,58zOG{QPO,58zO*pQPO,5;}OHQQPO'#DQOHVQPO'#DQOOQO'#Gk'#GkOIVQQO,59jOOQO'#Dm'#DmOJqQPO'#HuOJ{QPO'#DlOKZQPO'#HtOKcQPO,5<_OKhQPO,59^OLRQPO'#CxOOQO,59c,59cOLYQPO,59bOLeQQO'#H^ONgQQO'#CbO!!iQPO'#D_O!#nQQO'#HmO!$OQQO,59pO!$VQPO'#DvO!$eQPO'#H|O!$mQPO,5:`O!$rQPO,5:`O!%YQPO,5;nO!%eQPO'#ITO!%pQPO,5;eO!%uQPO,5=YOOQO-E:l-E:lOOQO,5:f,5:fO!']QPO,5:fO!'dQPO,5:vO?tQPO,5<_O*pQPO,5:vO<hQPO,5:gO<hQPO,5:qO<hQPO,5:lO<hQPO,5<_O!'zQPO,59qO:|QPO,5:}O!(RQPO,5;QO:|QPO,59TO!(aQPO'#DXOOQO,5;O,5;OOOQO'#El'#ElOOQO'#Eo'#EoO:|QPO,5;UO:|QPO,5;UO:|QPO,5;UO:|QPO,5;UO:|QPO,5;UO:|QPO,5;UO:|QPO,5;UO:|QPO,5;UO:|QPO,5;UO:|QPO,5;fOOQO,5;i,5;iOOQO,5<S,5<SO!(hQPO,5;bO!(yQPO,5;dO!(hQPO'#CyO!)QQQO'#HmO!)`QQO,5;kO]QPO,5<TOOQO-E:e-E:eOOQO,5>_,5>_O!*sQPO,5:gO!+RQPO,5:qO!+ZQPO,5:lO!+fQPO,5>[O!$VQPO,5>[O!'iQPO,59UO!+qQQO,58zO!+yQQO,5;}O!,RQQO,5<PO*pQPO,5<PO:|QPO'#DUO]QPO,5<VO]QPO,5<YO!,ZQPO'#FrO]QPO,5<[O]QPO,5<aO!,kQQO,5<cO!,uQPO,5<eO!,zQPO,5<jOOQO'#Fj'#FjOOQO,5<l,5<lO!-PQPO,5<lOOQO,5<n,5<nO!-UQPO,5<nO!-ZQQO,5<pOOQO,5<p,5<pO>gQPO,5<rO!-bQQO,5<sO!-iQPO'#GdO!.oQPO,5<uO>gQPO,5<}O!2mQPO,59jO!2zQPO'#HuO!3RQPO,59xO!3WQPO,5>dO?tQPO,59xO!3cQPO,5:[OAlQPO,5:zO!3kQPO'#DrO?wQPO'#DrO!3vQPO'#HyO!4OQPO,5:]O?tQPO,5>dO!(hQPO,5>dOAgQPO,5>mOOQO,5:[,5:[O!$rQPO'#DtOOQO,5>m,5>mO!4TQPO'#EaOOQO,5:z,5:zO!7UQPO,5:zO!(hQPO'#DxOOQO-E:k-E:kOOQO,5:y,5:yO*pQPO,58}O!7ZQPO'#ChOOQO1G.k1G.kOOOO-E:g-E:gOOQO1G.v1G.vO!+qQQO1G.fO*pQPO1G.fO!7eQQO1G1iOOQO,59l,59lO!7mQPO,59lOOQO-E:i-E:iO!7rQPO,5>aO!8ZQPO,5:WO<hQPO'#GpO!8bQPO,5>`OOQO1G1y1G1yOOQO1G.x1G.xO!8{QPO'#CyO!9kQPO'#HmO!9uQPO'#CzO!:TQPO'#HlO!:]QPO,59dOOQO1G.|1G.|OLYQPO1G.|O!:sQPO,59eO!;QQQO'#H^O!;cQQO'#CbOOQO,5:b,5:bO<hQPO,5:cOOQO,5:a,5:aO!;tQQO,5:aOOQO1G/[1G/[O!;yQPO,5:bO!<[QPO'#GsO!<oQPO,5>hOOQO1G/z1G/zO!<wQPO'#DvO!=YQPO1G/zO!(hQPO'#GqO!=_QPO1G1YO:|QPO1G1YO<hQPO'#GyO!=gQPO,5>oOOQO1G1P1G1POOQO1G0Q1G0QO!=oQPO'#E]OOQO1G0b1G0bO!>`QPO1G1yO!'dQPO1G0bO!*sQPO1G0RO!+RQPO1G0]O!+ZQPO1G0WOOQO1G/]1G/]O!>eQQO1G.pO9eQPO1G0jO*pQPO1G0jO<pQPO'#HpO!@[QQO1G.pOOQO1G.p1G.pO!@aQQO1G0iOOQO1G0l1G0lO!@hQPO1G0lO!@sQQO1G.oO!AZQQO'#HqO!AhQPO,59sO!BzQQO1G0pO!DfQQO1G0pO!DmQQO1G0pO!FUQQO1G0pO!F]QQO1G0pO!GbQQO1G0pO!I]QQO1G0pO!IdQQO1G0pO!IkQQO1G0pO!IuQQO1G1QO!I|QQO'#HmOOQO1G0|1G0|O!KSQQO1G1OOOQO1G1O1G1OOOQO1G1o1G1oO!KjQPO'#D[O!(hQPO'#D|O!(hQPO'#D}OOQO1G0R1G0RO!KqQPO1G0RO!KvQPO1G0RO!LOQPO1G0RO!LZQPO'#EXOOQO1G0]1G0]O!LnQPO1G0]O!LsQPO'#ETO!(hQPO'#ESOOQO1G0W1G0WO!MmQPO1G0WO!MrQPO1G0WO!MzQPO'#EhO!NRQPO'#EhOOQO'#Gx'#GxO!NZQQO1G0mO# }QQO1G3vO9eQPO1G3vO#$PQPO'#FXOOQO1G.f1G.fOOQO1G1i1G1iO#$WQPO1G1kOOQO1G1k1G1kO#$cQQO1G1kO#$kQPO1G1qOOQO1G1t1G1tO+QQPO'#D_O-OQQO,5<bO#(cQPO,5<bO#(tQPO,5<^O#({QPO,5<^OOQO1G1v1G1vOOQO1G1{1G1{OOQO1G1}1G1}O:|QPO1G1}O#,oQPO'#F{OOQO1G2P1G2PO=kQPO1G2UOOQO1G2W1G2WOOQO1G2Y1G2YOOQO1G2[1G2[OOQO1G2^1G2^OOQO1G2_1G2_O#,vQQO'#H^O#-aQQO'#CbO-OQQO'#HmO#-zQQOOO#.hQQO'#EeO#.VQQO'#HbO!$VQPO'#GeO#.oQPO,5=OOOQO'#HQ'#HQO#.wQPO1G2aO#2uQPO'#G]O>gQPO'#GaOOQO1G2a1G2aO#2zQPO1G2iO#6xQPO,5>gOOQO1G/d1G/dOOQO1G4O1G4OO#7ZQPO1G/dOOQO1G/v1G/vOOQO1G0f1G0fO!7UQPO1G0fOOQO,5:^,5:^O!(hQPO'#DsO#7`QPO,5:^O?wQPO'#GrO#7kQPO,5>eOOQO1G/w1G/wOAgQPO'#H{O#7sQPO1G4OO?tQPO1G4OOOQO1G4X1G4XO!#YQPO'#DvO!!iQPO'#D_OOQO,5:{,5:{O#8OQPO,5:{O#8OQPO,5:{O#8VQQO'#HaO#9hQQO'#HbO#9rQQO'#EbO#9}QPO'#EbO#:VQPO'#IOOOQO,5:d,5:dOOQO1G.i1G.iO#:bQQO'#EeO#:rQQO'#H`O#;SQPO'#FTOOQO'#H`'#H`O#;^QPO'#H`O#;{QPO'#IWO#<TQPO,59SOOQO7+$Q7+$QO!+qQQO7+$QOOQO7+'T7+'TOOQO1G/W1G/WO#<YQPO'#DoO#<dQQO'#HvOOQO'#Hv'#HvOOQO1G/r1G/rOOQO,5=[,5=[OOQO-E:n-E:nO#<tQWO,58{O#<{QPO,59fOOQO,59f,59fO!(hQPO'#HoOKmQPO'#GjO#=ZQPO,5>WOOQO1G/O1G/OOOQO7+$h7+$hOOQO1G/{1G/{O#=cQQO1G/{OOQO1G/}1G/}O#=hQPO1G/{OOQO1G/|1G/|O<hQPO1G/}OOQO,5=_,5=_OOQO-E:q-E:qOOQO7+%f7+%fOOQO,5=],5=]OOQO-E:o-E:oO:|QPO7+&tOOQO7+&t7+&tOOQO,5=e,5=eOOQO-E:w-E:wO#=mQPO'#EUO#={QPO'#EUOOQO'#Gw'#GwO#>dQPO,5:wOOQO,5:w,5:wOOQO7+'e7+'eOOQO7+%|7+%|OOQO7+%m7+%mO!KqQPO7+%mO!KvQPO7+%mO!LOQPO7+%mOOQO7+%w7+%wO!LnQPO7+%wOOQO7+%r7+%rO!MmQPO7+%rO!MrQPO7+%rOOQO7+&U7+&UOOQO'#Ee'#EeO9eQPO7+&UO9eQPO,5>[O#?TQPO7+$[OOQO7+&T7+&TOOQO7+&W7+&WO:|QPO'#GlO#?cQPO,5>]OOQO1G/_1G/_O:|QPO7+&lO#?nQQO,59eO#@tQPO,59vOOQO,59v,59vOOQO,5:h,5:hOOQO'#EP'#EPOOQO,5:i,5:iO#@{QPO'#EYO<hQPO'#EYO#A^QPO'#IPO#AiQPO,5:sO?tQPO'#HxO!(hQPO'#HxO#AqQPO'#DpOOQO'#Gu'#GuO#AxQPO,5:oOOQO,5:o,5:oOOQO,5:n,5:nOOQO,5;S,5;SO#BrQQO,5;SO#ByQPO,5;SOOQO-E:v-E:vOOQO7+&X7+&XOOQO7+)b7+)bO#CQQQO7+)bOOQO'#G|'#G|O#DqQPO,5;sOOQO,5;s,5;sO#DxQPO'#FYO*pQPO'#FYO*pQPO'#FYO*pQPO'#FYO#EWQPO7+'VO#E]QPO7+'VOOQO7+'V7+'VO]QPO7+']O#EhQPO1G1|O?tQPO1G1|O#EvQQO1G1xO!(aQPO1G1xO#E}QPO1G1xO#FUQQO7+'iOOQO'#HP'#HPO#F]QPO,5<gOOQO,5<g,5<gO#FdQPO'#HsO:|QPO'#F|O#FlQPO7+'pO#FqQPO,5=PO?tQPO,5=PO#FvQPO1G2jO#HPQPO1G2jOOQO1G2j1G2jOOQO-E;O-E;OOOQO7+'{7+'{O!<[QPO'#G_O>gQPO,5<wOOQO,5<{,5<{O#HXQPO7+(TOOQO7+(T7+(TO#LVQPO1G4ROOQO7+%O7+%OOOQO7+&Q7+&QO#LhQPO,5:_OOQO1G/x1G/xOOQO,5=^,5=^OOQO-E:p-E:pOOQO7+)j7+)jO#LsQPO7+)jO!:bQPO,5:aOOQO1G0g1G0gO#MOQPO1G0gO#MVQPO,59qO#MkQPO,5:|O9eQPO,5:|O!(hQPO'#GtO#MpQPO,5>jO#M{QPO,59TO#NSQPO'#IVO#N[QPO,5;oO*pQPO'#G{O#NaQPO,5>rOOQO1G.n1G.nOOQO<<Gl<<GlO#NiQPO'#HwO#NqQPO,5:ZOOQO1G/Q1G/QOOQO,5>Z,5>ZOOQO,5=U,5=UOOQO-E:h-E:hO#NvQPO7+%gOOQO7+%g7+%gOOQO7+%i7+%iOOQO<<J`<<J`O$ ^QPO'#H^O$ eQPO'#CbO$ lQPO,5:pO$ qQPO,5:xO#=mQPO,5:pOOQO-E:u-E:uOOQO1G0c1G0cOOQO<<IX<<IXO!KqQPO<<IXO!KvQPO<<IXOOQO<<Ic<<IcOOQO<<I^<<I^O!MmQPO<<I^OOQO<<Ip<<IpO$ vQQO<<GvO9eQPO<<IpO*pQPO<<IpOOQO<<Gv<<GvO$#mQQO,5=WOOQO-E:j-E:jO$#zQQO<<JWOOQO1G/b1G/bOOQO,5:t,5:tO$$bQPO,5:tO$$pQPO,5:tO$%RQPO'#GvO$%iQPO,5>kO$%tQPO'#EZOOQO1G0_1G0_O$%{QPO1G0_O?tQPO,5:pOOQO-E:s-E:sOOQO1G0Z1G0ZOOQO1G0n1G0nO$&QQQO1G0nOOQO<<L|<<L|OOQO-E:z-E:zOOQO1G1_1G1_O$&XQQO,5;tOOQO'#G}'#G}O#DxQPO,5;tOOQO'#IX'#IXO$&aQQO,5;tO$&rQQO,5;tOOQO<<Jq<<JqO$&zQPO<<JqOOQO<<Jw<<JwO:|QPO7+'hO$'PQPO7+'hO!(aQPO7+'dO$'_QPO7+'dO$'dQQO7+'dOOQO<<KT<<KTOOQO-E:}-E:}OOQO1G2R1G2ROOQO,5<h,5<hO$'kQQO,5<hOOQO<<K[<<K[O:|QPO1G2kO$'rQPO1G2kOOQO,5=n,5=nOOQO7+(U7+(UO$'wQPO7+(UOOQO-E;Q-E;QO$)fQWO'#HhO$)QQWO'#HhO$)mQPO'#G`O<hQPO,5<yO!$VQPO,5<yOOQO1G2c1G2cOOQO<<Ko<<KoO$*OQPO1G/yOOQO<<MU<<MUOOQO7+&R7+&RO$*ZQPO1G0jO$*fQQO1G0hOOQO1G0h1G0hO$*nQPO1G0hOOQO,5=`,5=`OOQO-E:r-E:rO$*sQQO1G.oOOQO1G1[1G1[O$*}QPO'#GzO$+[QPO,5>qOOQO1G1Z1G1ZO$+dQPO'#FUOOQO,5=g,5=gOOQO-E:y-E:yO$+iQPO'#GoO$+vQPO,5>cOOQO1G/u1G/uOOQO<<IR<<IROOQO1G0[1G0[O$,OQPO1G0dO$,TQPO1G0[O$,YQPO1G0dOOQOAN>sAN>sO!KqQPOAN>sOOQOAN>xAN>xOOQOAN?[AN?[O9eQPOAN?[OOQO1G0`1G0`O$,_QPO1G0`OOQO,5=b,5=bOOQO-E:t-E:tO$,mQPO,5:uOOQO7+%y7+%yOOQO7+&Y7+&YOOQO1G1`1G1`O$,tQQO1G1`OOQO-E:{-E:{O$,|QQO'#IYO$,wQPO1G1`O$&gQPO1G1`O*pQPO1G1`OOQOAN@]AN@]O$-XQQO<<KSO:|QPO<<KSO$-`QPO<<KOOOQO<<KO<<KOO!(aQPO<<KOOOQO1G2S1G2SO$-eQQO7+(VO:|QPO7+(VOOQO<<Kp<<KpP!-iQPO'#HSO!$VQPO'#HRO$-oQPO,5<zO$-zQPO1G2eO<hQPO1G2eO9eQPO7+&SO$.PQPO7+&SOOQO7+&S7+&SOOQO,5=f,5=fOOQO-E:x-E:xO#M{QPO,5;pOOQO,5=Z,5=ZOOQO-E:m-E:mO$.UQPO7+&OOOQO7+%v7+%vO$.dQPO7+&OOOQOG24_G24_OOQOG24vG24vOOQO7+%z7+%zOOQO7+&z7+&zO*pQPO'#HOO$.iQPO,5>tO$.qQPO7+&zO$.vQQO'#IZOOQOAN@nAN@nO$/RQQOAN@nOOQOAN@jAN@jO$/YQPOAN@jO$/_QQO<<KqO$/iQPO,5=mOOQO-E;P-E;POOQO7+(P7+(PO$/zQPO7+(PO$0PQPO<<InOOQO<<In<<InO$0UQPO<<IjOOQO<<Ij<<IjO#M{QPO<<IjO$0UQPO<<IjO$0dQQO,5=jOOQO-E:|-E:|OOQO<<Jf<<JfO$0oQPO,5>uOOQOG26YG26YOOQOG26UG26UOOQO<<Kk<<KkOOQOAN?YAN?YOOQOAN?UAN?UO#M{QPOAN?UO$0wQPOAN?UO$0|QPOAN?UO$1[QPOG24pOOQOG24pG24pO#M{QPOG24pOOQOLD*[LD*[O$1aQPOLD*[OOQO!$'Mv!$'MvO*pQPO'#CaO$1fQQO'#H^O$1yQQO'#CbO!(hQPO'#Cy",
  stateData: "$2i~OPOSQOS%yOS~OZ`O_VO`VOaVObVOcVOeVOg^Oh^Op!POv{OwkOz!OO}cO!PvO!SyO!TyO!UyO!VyO!WyO!XyO!YyO!ZzO![!`O!]yO!^yO!_yO!u}O!z|O#fpO#roO#tpO#upO#y!RO#z!QO$W!SO$Y!TO$`!UO$c!VO$e!XO$h!WO$l!YO$n!ZO$s![O$u!]O$w!^O$y!_O$|!aO%O!bO%}TO&PRO&RQO&XUO&tdO~Og^Oh^Ov{O}cO!P!mO!SyO!TyO!UyO!VyO!W!pO!XyO!YyO!ZzO!]yO!^yO!_yO!u}O!z|O%}TO&P!cO&R!dO&_!hO&tdO~OWiXW&QXZ&QXuiXu&QX!P&QX!b&QX#]&QX#_&QX#a&QX#b&QX#d&QX#e&QX#f&QX#g&QX#h&QX#i&QX#k&QX#o&QX#r&QX%}iX&PiX&RiX&^&QX&_iX&_&QX&n&QX&viX&v&QX&x!aX~O#p$^X~P&bOWUXW&]XZUXuUXu&]X!PUX!bUX#]UX#_UX#aUX#bUX#dUX#eUX#fUX#gUX#hUX#iUX#kUX#oUX#rUX%}&]X&P&]X&R&]X&^UX&_UX&_&]X&nUX&vUX&v&]X&x!aX~O#p$^X~P(iO&PSO&R!qO~O&W!vO&Y!tO~Og^Oh^O!SyO!TyO!UyO!VyO!WyO!XyO!YyO!ZzO!]yO!^yO!_yO%}TO&P!wO&RWOg!RXh!RX$h!RX&P!RX&R!RX~O#y!|O#z!{O$W!}Ov!RX!u!RX!z!RX&t!RX~P+QOW#XOu#OO%}TO&P#SO&R#SO&v&aX~OW#[Ou&[X%}&[X&P&[X&R&[X&v&[XY&[Xw&[X&n&[X&q&[XZ&[Xq&[X&^&[X!P&[X#_&[X#a&[X#b&[X#d&[X#e&[X#f&[X#g&[X#h&[X#i&[X#k&[X#o&[X#r&[X}&[X!r&[X#p&[Xs&[X|&[X~O&_#YO~P-dO&_&[X~P-dOZ`O_VO`VOaVObVOcVOeVOg^Oh^Op!POwkOz!OO!SyO!TyO!UyO!VyO!WyO!XyO!YyO!ZzO!]yO!^yO!_yO#fpO#roO#tpO#upO%}TO&XUO~O&P#^O&R#]OY&pP~P/uO%}TOg%bXh%bXv%bX!S%bX!T%bX!U%bX!V%bX!W%bX!X%bX!Y%bX!Z%bX!]%bX!^%bX!_%bX!u%bX!z%bX$h%bX&P%bX&R%bX&t%bX&_%bX~O!SyO!TyO!UyO!VyO!WyO!XyO!YyO!ZzO!]yO!^yO!_yOg!RXh!RXv!RX!u!RX!z!RX&P!RX&R!RX&t!RX&_!RX~O$h!RX~P3gO|#kO~P]Og^Oh^Ov#pO!u#rO!z#qO&P!wO&RWO&t#oO~O$h#sO~P5VOu#uO&v#vO!P&TX#_&TX#a&TX#b&TX#d&TX#e&TX#f&TX#g&TX#h&TX#i&TX#k&TX#o&TX#r&TX&^&TX&_&TX&n&TX~OW#tOY&TX#p&TXs&TXq&TX|&TX~P5xO!b#wO#]#wOW&UXu&UX!P&UX#_&UX#a&UX#b&UX#d&UX#e&UX#f&UX#g&UX#h&UX#i&UX#k&UX#o&UX#r&UX&^&UX&_&UX&n&UX&v&UXY&UX#p&UXs&UXq&UX|&UX~OZ#XX~P7jOZ#xO~O&v#vO~O#_#|O#a#}O#b$OO#d$QO#e$RO#f$SO#g$TO#h$UO#i$UO#k$YO#o$VO#r$WO&^#zO&_#zO&n#{O~O!P$XO~P9oO&x$ZO~OZ`O_VO`VOaVObVOcVOeVOg^Oh^Op!POwkOz!OO#fpO#roO#tpO#upO%}TO&P0qO&R0pO&XUO~O#p$_O~O![$aO~O&P#SO&R#SO~Og^Oh^O&P!wO&RWO&_#YO~OW$gO&v#vO~O#z!{O~O!W$kO&PSO&R!qO~OZ$lO~OZ$oO~O!P$vO&P$uO&R$uO~O!P$xO&P$uO&R$uO~O!P${O~P:|OZ%OO}cO~OW&]Xu&]X%}&]X&P&]X&R&]X&_&]X~OZ!aX~P>lOWiXuiX%}iX&PiX&RiX&_iX~OZ!aX~P?XOu#OO%}TO&P#SO&R#SO~O%}TO~P3gOg^Oh^Ov#pO!u#rO!z#qO&_!hO&t#oO~O&P!cO&R!dO~P@ZOg^Oh^O%}TO&P!cO&R!dO~O}cO!P%aO~OZ%bO~O}%dO!m%gO~O}cOg&gXh&gXv&gX!S&gX!T&gX!U&gX!V&gX!W&gX!X&gX!Y&gX!Z&gX!]&gX!^&gX!_&gX!u&gX!z&gX%}&gX&P&gX&R&gX&_&gX&t&gX~OW%jOZ%kOgTahTa%}Ta&PTa&RTa~OvTa!STa!TTa!UTa!VTa!WTa!XTa!YTa!ZTa!]Ta!^Ta!_Ta!uTa!zTa#yTa#zTa$WTa$hTa&tTa&_TauTaYTaqTa|Ta!PTa~PC[O&W%nO&Y!tO~Ou#OO%}TOqma&^maYma&nma!Pma~O&vma}ma!rma~PEnO!SyO!TyO!UyO!VyO!WyO!XyO!YyO!ZzO!]yO!^yO!_yO~Og!Rah!Rav!Ra!u!Ra!z!Ra$h!Ra&P!Ra&R!Ra&t!Ra&_!Ra~PFdO#z%pO~Os%rO~Ou%sO%}TO~Ou#OO%}ra&Pra&Rra&vraYrawra&nra&qra!Pra&^raqra~OWra#_ra#ara#bra#dra#era#fra#gra#hra#ira#kra#ora#rra&_ra#prasra|ra~PH_Ou#OO%}TOq&iX!P&iX!b&iX~OY&iX#p&iX~PJ`O!b%vOq!`X!P!`XY!`X~Oq%wO!P&hX~O!P%yO~Ov%zO~Og^Oh^O%}0oO&P!wO&RWO&b%}O~O&^&`P~PKmO%}TO&P!wO&RWO~OW&QXYiXY!aXY&QXZ&QXq!aXu&QXwiX!b&QX#]&QX#_&QX#a&QX#b&QX#d&QX#e&QX#f&QX#g&QX#h&QX#i&QX#k&QX#o&QX#r&QX&^&QX&_&QX&niX&n&QX&qiX&viX&v&QX&x!aX~P?XOWUXYUXY!aXY&]XZUXq!aXuUXw&]X!bUX#]UX#_UX#aUX#bUX#dUX#eUX#fUX#gUX#hUX#iUX#kUX#oUX#rUX&^UX&_UX&nUX&n&]X&q&]X&vUX&v&]X&x!aX~P>lOg^Oh^O%}TO&P!wO&RWOg!RXh!RX&P!RX&R!RX~PFdOu#OOw&XO%}TO&P&UO&R&TO&q&WO~OW#XOY&aX&n&aX&v&aX~P!#YOY&ZO~P9oOg^Oh^O&P!wO&RWO~Oq&]OY&pX~OY&_O~Og^Oh^O%}TO&P!wO&RWOY&pP~PFdOY&dO&n&bO&v#vO~Oq&eO&x$ZOY&wX~OY&gO~O%}TOg%bah%bav%ba!S%ba!T%ba!U%ba!V%ba!W%ba!X%ba!Y%ba!Z%ba!]%ba!^%ba!_%ba!u%ba!z%ba$h%ba&P%ba&R%ba&t%ba&_%ba~O|&hO~P]O}&iO~Op&uOw&vO&PSO&R!qO&_#YO~Oz&tO~P!'iOz&xO&PSO&R!qO&_#YO~OY&eP~P:|Og^Oh^O%}TO&P!wO&RWO~O}cO~P:|OW#XOu#OO%}TO&v&aX~O#r$WO!P#sa#_#sa#a#sa#b#sa#d#sa#e#sa#f#sa#g#sa#h#sa#i#sa#k#sa#o#sa&^#sa&_#sa&n#saY#sa#p#sas#saq#sa|#sa~Oo'_O}'^O!r'`O&_!hO~O}'eO!r'`O~Oo'iO}'hO&_!hO~OZ#xOu'mO%}TO~OW%jO}'sO~OW%jO!P'uO~OW'vO!P'wO~O$h!WO&P0qO&R0pO!P&eP~P/uO!P(SO#p(TO~P9oO}(UO~O$c(WO~O!P(XO~O!P(YO~O!P(ZO~P9oO!P(]O~P9oOZ$lO_VO`VOaVObVOcVOeVOg^Oh^Op!POwkOz!OO%}TO&P(_O&R(^O&XUO~PFdO%Q(hO%U(iOZ$}a_$}a`$}aa$}ab$}ac$}ae$}ag$}ah$}ap$}av$}aw$}az$}a}$}a!P$}a!S$}a!T$}a!U$}a!V$}a!W$}a!X$}a!Y$}a!Z$}a![$}a!]$}a!^$}a!_$}a!u$}a!z$}a#f$}a#r$}a#t$}a#u$}a#y$}a#z$}a$W$}a$Y$}a$`$}a$c$}a$e$}a$h$}a$l$}a$n$}a$s$}a$u$}a$w$}a$y$}a$|$}a%O$}a%w$}a%}$}a&P$}a&R$}a&X$}a&t$}a|$}a$a$}a$q$}a~O}ra!rra'Ora~PH_OZ%bO~PJ`O!P(mO~O!m%gO}&la!P&la~O}cO!P(pO~Oo(tOq!fX&^!fX~Oq(vO&^&mX~O&^(xO~OZ`O_VO`VOaVObVOcVOeVOg^Oh^Op)UOv{Ow)TOz!OO|)PO}cO!PvO![!`O!u}O!z|O#fpO#roO#tpO#upO#y!RO#z!QO$W!SO$Y!TO$`!UO$c!VO$e!XO$h!WO$l!YO$n!ZO$s![O$u!]O$w!^O$y!_O$|!aO%O!bO%}TO&PRO&RQO&XUO&_#YO&tdO~PFdO}%dO~O})]OY&zP~P:|OW%jO!P)dO~Os)eO~Ou#OO%}TOq&ia!P&ia!b&iaY&ia#p&ia~O})fO~P:|Oq%wO!P&ha~Og^Oh^O%}0oO&P!wO&RWO~O&b)mO~P!8jOu#OO%}TOq&aX&^&aXY&aX&n&aX!P&aX~O}&aX!r&aX~P!9SOo)oOp)oOqnX&^nX~Oq)pO&^&`X~O&^)rO~Ou#OOw)tO%}TO&PSO&R!qO~OYma&nma&vma~P!:bOW&QXY!aXq!aXu!aX%}!aX~OWUXY!aXq!aXu!aX%}!aX~OW)wO~Ou#OO%}TO&P#SO&R#SO&q)yO~Og^Oh^O%}TO&P!wO&RWO~PFdOq&]OY&pa~Ou#OO%}TO&P#SO&R#SO&q&WO~OY)|O~OY*PO&n&bO~Oq&eOY&wa~Og^Oh^Ov{O|*XO!u}O%}TO&P!wO&RWO&tdO~PFdO!P*YO~OW^iZ#XXu^i!P^i!b^i#]^i#_^i#a^i#b^i#d^i#e^i#f^i#g^i#h^i#i^i#k^i#o^i#r^i&^^i&_^i&n^i&v^iY^i#p^is^iq^i|^i~OW*iO~Os*jO~P9oOz*kO&PSO&R!qO~O!P]iY]i#p]is]iq]i|]i~P9oOq*lOY&eX!P&eX~P9oOY*nO~O#f$SO#g$TO#k$YO#r$WO!P#^i#_#^i#a#^i#b#^i#d#^i#e#^i#o#^i&^#^i&_#^i&n#^iY#^i#p#^is#^iq#^i|#^i~O#h$UO#i$UO~P!AmO#_#|O#d$QO#e$RO#f$SO#g$TO#h$UO#i$UO#k$YO#r$WO&^#zO&_#zO&n#{O!P#^i#b#^i#o#^iY#^i#p#^is#^iq#^i|#^i~O#a#^i~P!CUO#a#}O~P!CUO#_#|O#f$SO#g$TO#h$UO#i$UO#k$YO#r$WO&^#zO&_#zO!P#^i#a#^i#b#^i#d#^i#e#^i#o#^iY#^i#p#^is#^iq#^i|#^i~O&n#^i~P!DtO&n#{O~P!DtO#f$SO#g$TO#k$YO#r$WO!P#^i#a#^i#b#^i#e#^i#o#^iY#^i#p#^is#^iq#^i|#^i~O#_#|O#d$QO#h$UO#i$UO&^#zO&_#zO&n#{O~P!FdO#k$YO#r$WO!P#^i#_#^i#a#^i#b#^i#d#^i#e#^i#f#^i#h#^i#i#^i#o#^i&^#^i&_#^i&n#^iY#^i#p#^is#^iq#^i|#^i~O#g$TO~P!G{O#g#^i~P!G{O#h#^i#i#^i~P!AmO#p*oO~P9oO#_&aX#a&aX#b&aX#d&aX#e&aX#f&aX#g&aX#h&aX#i&aX#k&aX#o&aX#r&aX&_&aX#p&aXs&aX|&aX~P!9SO!P#liY#li#p#lis#liq#li|#li~P9oO|*rO~P$wO}'^O~O}'^O!r'`O~Oo'_O}'^O!r'`O~O%}TO&P#SO&R#SO|&sP!P&sP~PFdO}'eO~Og^Oh^Ov{O|+PO!P*}O!u}O!z|O%}TO&P!wO&RWO&_!hO&tdO~PFdO}'hO~Oo'iO}'hO~Os+RO~P:|Ou+TO%}TO~Ou'mO})fO%}TOW#Zi!P#Zi#_#Zi#a#Zi#b#Zi#d#Zi#e#Zi#f#Zi#g#Zi#h#Zi#i#Zi#k#Zi#o#Zi#r#Zi&^#Zi&_#Zi&n#Zi&v#ZiY#Zi#p#Zis#Ziq#Zi|#Zi~O}'^OW&diu&di!P&di#_&di#a&di#b&di#d&di#e&di#f&di#g&di#h&di#i&di#k&di#o&di#r&di&^&di&_&di&n&di&v&diY&di#p&dis&diq&di|&di~O#}+]O$P+^O$R+^O$S+_O$T+`O~O|+[O~P##nO$Z+aO&PSO&R!qO~OW+bO!P+cO~O$a+dOZ$_i_$_i`$_ia$_ib$_ic$_ie$_ig$_ih$_ip$_iv$_iw$_iz$_i}$_i!P$_i!S$_i!T$_i!U$_i!V$_i!W$_i!X$_i!Y$_i!Z$_i![$_i!]$_i!^$_i!_$_i!u$_i!z$_i#f$_i#r$_i#t$_i#u$_i#y$_i#z$_i$W$_i$Y$_i$`$_i$c$_i$e$_i$h$_i$l$_i$n$_i$s$_i$u$_i$w$_i$y$_i$|$_i%O$_i%w$_i%}$_i&P$_i&R$_i&X$_i&t$_i|$_i$q$_i~Og^Oh^O$h#sO&P!wO&RWO~O!P+hO~P:|O!P+iO~OZ`O_VO`VOaVObVOcVOeVOg^Oh^Op!POv{OwkOz!OO}cO!PvO!SyO!TyO!UyO!VyO!WyO!XyO!YyO!Z+nO![!`O!]yO!^yO!_yO!u}O!z|O#fpO#roO#tpO#upO#y!RO#z!QO$W!SO$Y!TO$`!UO$c!VO$e!XO$h!WO$l!YO$n!ZO$q+oO$s![O$u!]O$w!^O$y!_O$|!aO%O!bO%}TO&PRO&RQO&XUO&tdO~O|+mO~P#)QOW&QXY&QXZ&QXu&QX!P&QX&viX&v&QX~P?XOWUXYUXZUXuUX!PUX&vUX&v&]X~P>lOW#tOu#uO&v#vO~OW&UXY%XXu&UX!P%XX&v&UX~OZ#XX~P#.VOY+uO!P+sO~O%Q(hO%U(iOZ$}i_$}i`$}ia$}ib$}ic$}ie$}ig$}ih$}ip$}iv$}iw$}iz$}i}$}i!P$}i!S$}i!T$}i!U$}i!V$}i!W$}i!X$}i!Y$}i!Z$}i![$}i!]$}i!^$}i!_$}i!u$}i!z$}i#f$}i#r$}i#t$}i#u$}i#y$}i#z$}i$W$}i$Y$}i$`$}i$c$}i$e$}i$h$}i$l$}i$n$}i$s$}i$u$}i$w$}i$y$}i$|$}i%O$}i%w$}i%}$}i&P$}i&R$}i&X$}i&t$}i|$}i$a$}i$q$}i~OZ+xO~O%Q(hO%U(iOZ%Vi_%Vi`%Via%Vib%Vic%Vie%Vig%Vih%Vip%Viv%Viw%Viz%Vi}%Vi!P%Vi!S%Vi!T%Vi!U%Vi!V%Vi!W%Vi!X%Vi!Y%Vi!Z%Vi![%Vi!]%Vi!^%Vi!_%Vi!u%Vi!z%Vi#f%Vi#r%Vi#t%Vi#u%Vi#y%Vi#z%Vi$W%Vi$Y%Vi$`%Vi$c%Vi$e%Vi$h%Vi$l%Vi$n%Vi$s%Vi$u%Vi$w%Vi$y%Vi$|%Vi%O%Vi%w%Vi%}%Vi&P%Vi&R%Vi&X%Vi&t%Vi|%Vi$a%Vi$q%Vi~Ou#OO%}TO}&oa!P&oa!m&oa~O!P,OO~Oo(tOq!fa&^!fa~Oq(vO&^&ma~O!m%gO}&li!P&li~O|,XO~P]OW,ZO~P5xOW&UXu&UX#_&UX#a&UX#b&UX#d&UX#e&UX#f&UX#g&UX#h&UX#i&UX#k&UX#o&UX#r&UX&^&UX&_&UX&n&UX&v&UX~OZ#xO!P&UX~P#8^OW$gOZ#xO&v#vO~Op,]Ow,]O~Oq,^O}&rX!P&rX~O!b,`O#]#wOY&UXZ#XX~P#8^OY&SXq&SX|&SX!P&SX~P9oO})]O|&yP~P:|OY&SXg%[Xh%[X%}%[X&P%[X&R%[Xq&SX|&SX!P&SX~Oq,cOY&zX~OY,eO~O})fO|&kP~P:|Oq&jX!P&jX|&jXY&jX~P9oO&bTa~PC[Oo)oOp)oOqna&^na~Oq)pO&^&`a~OW,mO~Ow,nO~Ou#OO%}TO&P,rO&R,qO~Og^Oh^Ov#pO!u#rO&P!wO&RWO&t#oO~Og^Oh^Ov{O|,wO!u}O%}TO&P!wO&RWO&tdO~PFdOw-SO&PSO&R!qO&_#YO~Oq*lOY&ea!P&ea~O#_ma#ama#bma#dma#ema#fma#gma#hma#ima#kma#oma#rma&_ma#pmasma|ma~PEnO|-WO~P$wOZ#xO}'^Oq!|X|!|X!P!|X~Oq-[O|&sX!P&sX~O|-_O!P-^O~O&_!hO~P5VOg^Oh^Ov{O|-cO!P*}O!u}O!z|O%}TO&P!wO&RWO&_!hO&tdO~PFdOs-dO~P9oOs-dO~P:|O}'^OW&dqu&dq!P&dq#_&dq#a&dq#b&dq#d&dq#e&dq#f&dq#g&dq#h&dq#i&dq#k&dq#o&dq#r&dq&^&dq&_&dq&n&dq&v&dqY&dq#p&dqs&dqq&dq|&dq~O|-hO~P##nO!W-lO$O-lO&PSO&R!qO~O!P-oO~O$Z-pO&PSO&R!qO~O!b%vO#p-rOq!`X!P!`X~O!P-tO~P9oO!P-tO~P:|O!P-wO~P9oO|-yO~P#)QO![$aO#p-zO~O!P-|O~O!b-}O~OY.QOZ$lO_VO`VOaVObVOcVOeVOg^Oh^Op!POwkOz!OO%}TO&P(_O&R(^O&XUO~PFdOY.QO!P.RO~O%Q(hO%U(iOZ%Vq_%Vq`%Vqa%Vqb%Vqc%Vqe%Vqg%Vqh%Vqp%Vqv%Vqw%Vqz%Vq}%Vq!P%Vq!S%Vq!T%Vq!U%Vq!V%Vq!W%Vq!X%Vq!Y%Vq!Z%Vq![%Vq!]%Vq!^%Vq!_%Vq!u%Vq!z%Vq#f%Vq#r%Vq#t%Vq#u%Vq#y%Vq#z%Vq$W%Vq$Y%Vq$`%Vq$c%Vq$e%Vq$h%Vq$l%Vq$n%Vq$s%Vq$u%Vq$w%Vq$y%Vq$|%Vq%O%Vq%w%Vq%}%Vq&P%Vq&R%Vq&X%Vq&t%Vq|%Vq$a%Vq$q%Vq~Ou#OO%}TO}&oi!P&oi!m&oi~O&n&bOq!ga&^!ga~O!m%gO}&lq!P&lq~O|.^O~P]Op.`Ow&vOz&tO&PSO&R!qO&_#YO~O!P.aO~Oq,^O}&ra!P&ra~O})]O~P:|Oq.gO|&yX~O|.iO~Oq,cOY&za~Oq.mO|&kX~O|.oO~Ow.pO~Oq!aXu!aX!P!aX!b!aX%}!aX~OZ&QX~P#N{OZUX~P#N{O!P.qO~OZ.rO~OW^yZ#XXu^y!P^y!b^y#]^y#_^y#a^y#b^y#d^y#e^y#f^y#g^y#h^y#i^y#k^y#o^y#r^y&^^y&_^y&n^y&v^yY^y#p^ys^yq^y|^y~OY%`aq%`a!P%`a~P9oO!P#nyY#ny#p#nys#nyq#ny|#ny~P9oO}'^Oq!|a|!|a!P!|a~OZ#xO}'^Oq!|a|!|a!P!|a~O%}TO&P#SO&R#SOq%jX|%jX!P%jX~PFdOq-[O|&sa!P&sa~O|!}X~P$wO|/PO~Os/QO~P9oOW%jO!P/RO~OW%jO$Q/WO&PSO&R!qO!P&|P~OW%jO$U/XO~O!P/YO~O!b%vO#p/[Oq!`X!P!`X~OY/^O~O!P/_O~P9oO#p/`O~P9oO!b/bO~OY/cOZ$lO_VO`VOaVObVOcVOeVOg^Oh^Op!POwkOz!OO%}TO&P(_O&R(^O&XUO~PFdOW#[Ou&[X%}&[X&P&[X&R&[X'O&[X~O&_#YO~P$)QOu#OO%}TO'O/eO&P%SX&R%SX~O&n&bOq!gi&^!gi~Op/iO&PSO&R!qO~OW*iOZ#xO~O!P/kO~OY&SXq&SX~P9oO})]Oq%nX|%nX~P:|Oq.gO|&ya~O!b/nO~O})fOq%cX|%cX~P:|Oq.mO|&ka~OY/qO~O!P/rO~OZ/sO~O}'^Oq!|i|!|i!P!|i~O|!}a~P$wOW%jO!P/wO~OW%jOq/xO!P&|X~OY/|O~P9oOY0OO~OY%Xq!P%Xq~P9oO'O/eO&P%Sa&R%Sa~OY0TO~O!P0WO~Ou#OO!P0YO!Z0ZO%}TO~OY0[O~Oq/xO!P&|a~O!P0_O~OW%jOq/xO!P&}X~OY0aO~P9oOY0bO~OY%Xy!P%Xy~P9oOu#OO%}TO&P%ua&R%ua'O%ua~OY0cO~O!P0dO~Ou#OO!P0eO!Z0fO%}TO~OW%jOq%ra!P%ra~Oq/xO!P&}a~O!P0jO~Ou#OO!P0jO!Z0kO%}TO~O!P0lO~O!P0nO~O#p&QXY&QXs&QXq&QX|&QX~P&bO#pUXYUXsUXqUX|UX~P(iO`Q_P#g%y&P&Xc&X~",
  goto: "#+S'OPPPP'P'd*x.OP'dPP.d.h0PPPPPP1nP3ZPP4v7l:[<z=d?[PPP?bPA{PPPBu3ZPDqPPElPFcFkPPPPPPPPPPPPGvH_PKjKrLOLjLpLvNiNmNmNuP! U!!^!#R!#]P!#r!!^P!#x!$S!!y!$cP!%S!%^!%d!!^!%g!%mFcFc!%q!%{!&O3Z!'m3Z3Z!)iP.hP!)mPP!*_PPPPPP.hP.h!+O.hPP.hP.hPP.h!,g!,qPP!,w!-QPPPPPPPP'PP'PPP!-U!-U!-i!-UPP!-UP!-UP!.S!.VP!-U!.m!-UP!-UP!.p!.sP!-UP!-UP!-UP!-UP!-U!-UP!-UP!.wP!.}!/Q!/WP!-U!/d!/gP!/o!0R!4T!4Z!4a!5g!5m!5{!7R!7X!7_!7i!7o!7u!7{!8R!8X!8_!8e!8k!8q!8w!8}!9T!9_!9e!9o!9uPPP!9{!-U!:pP!>WP!?[P!Ap!BW!E]3ZPPP!F|!Jm!MaPP#!P#!SP#$`#$f#&V#&f#&n#'p#(Y#)T#)^#)a#)oP#)r#*OP#*V#*^P#*aP#*lP#*o#*r#*u#*y#+PstOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,Y'urOPXY`acopx!Y![!_!a!e!f!h!i!o!x#P#T#Y#[#_#`#e#i#l#n#u#w#x#|#}$O$P$Q$R$S$T$U$V$Y$Z$[$]$_$e$l$m$n$o$p$q%O%S%V%Z%^%_%b%d%g%k%u%v%{%|&R&S&[&]&`&b&d&i'X'^'_'`'e'h'i'm'n'p'{'|(O(T(U(`(l(t(v({(})O)Q)R)])f)o)p*P*T*W*l*o*p*q*z*{+O+T+d+f+h+i+l+o+r+s+x+},W,Y,^,`,u-[-^-a-r-t-}.R.V.g.m/O/[/_/b/d/n/q0R0X0Z0[0f0h0k0r#xhO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%d%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o,Y,`-r-t-}.g.m/[/_/b/n0Z0f0kt!sT!Q!S!T!{!}$k%p+]+^+_+`-k-m/W/X/x0oQ#mdS&Y#`(}Q&l#oU&q#t$g,ZQ&x#vW(b%O+s.R/dU)Y%j'v+bQ)Z%kS)u&S,WU*f&s-R._Q*k&yQ,t*TQ-P*iQ.j,cR.t,uu!sT!Q!S!T!{!}$k%p+]+^+_+`-k-m/W/X/x0oT%l!r)l#{qO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o,Y,`-r-t-}.g.m/[/_/b/n0Z0f0k#zlO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o,Y,`-r-t-}.g.m/[/_/b/n0Z0f0kX(c%O+s.R/d$TVO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%O%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o+s,Y,`-r-t-}.R.g.m/[/_/b/d/n0Z0f0k$TkO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%O%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o+s,Y,`-r-t-}.R.g.m/[/_/b/d/n0Z0f0k&O[OPX`ceopx!O!Y![!_!a!g!i!o#Y#_#b#e#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Y$Z$[$_$f$l$m$n$o$p$q%O%_%b%d%g%k%v%{&]&b&d&i&t'^'_'`'h'i'm'{'}(O(T(U(d(t)O)Q)R)])f)o)p*P*U*W*l*o*q*{*|+O+T+d+h+i+l+o+s,Y,^,`-^-r-t-}.R.g.m/O/[/_/b/d/n0Z0f0k0rQ&Q#[Q)s&RV.T+x.X/e&O[OPX`ceopx!O!Y![!_!a!g!i!o#Y#_#b#e#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Y$Z$[$_$f$l$m$n$o$p$q%O%_%b%d%g%k%v%{&]&b&d&i&t'^'_'`'h'i'm'{'}(O(T(U(d(t)O)Q)R)])f)o)p*P*U*W*l*o*q*{*|+O+T+d+h+i+l+o+s,Y,^,`-^-r-t-}.R.g.m/O/[/_/b/d/n0Z0f0k0rV.T+x.X/e&O]OPX`ceopx!O!Y![!_!a!g!i!o#Y#_#b#e#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Y$Z$[$_$f$l$m$n$o$p$q%O%_%b%d%g%k%v%{&]&b&d&i&t'^'_'`'h'i'm'{'}(O(T(U(d(t)O)Q)R)])f)o)p*P*U*W*l*o*q*{*|+O+T+d+h+i+l+o+s,Y,^,`-^-r-t-}.R.g.m/O/[/_/b/d/n0Z0f0k0rV.U+x.X/eS#Z[.TS$f!O&tS&s#t$gQ&y#vQ)V%dQ-R*iR._,Z$kZO`copx!Y![!_!a#Y#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Y$Z$_$l$m$n$o$p$q%O%d%g%k%v&b&d'_'`'i'm(O(T(U(t)Q)R)])f)o)p*P*l*o+T+d+h+i+l+o+s,Y,^,`-r-t-}.R.g.m/[/_/b/d/n0Z0f0kQ&O#YR,k)p&P_OPX`ceopx!Y![!_!a!g!i!o#Y#_#b#e#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Y$Z$[$_$l$m$n$o$p$q%O%_%b%d%g%k%v%{&]&b&d&i'^'_'`'h'i'm'{'}(O(T(U(d(t)O)Q)R)])f)o)p*P*U*W*l*o*q*{*|+O+T+d+h+i+l+o+s+x,Y,^,`-^-r-t-}.R.X.g.m/O/[/_/b/d/e/n0Z0f0k0r!o#QY!e!x#R#T#`#n$]%R%S%V%^%u%|&S&[&`'X'|(`(l({(}*T*p*z+f+r+},W,u-a.V/q0R0X0[0h$SkO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%O%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o+s,Y,`-r-t-}.R.g.m/[/_/b/d/n0Z0f0kQ$m!UQ$n!VQ$s!ZQ$|!`R+p(WQ#yiS'q$e*hQ*e&rQ+X'rS,[)T)UQ-O*gQ-Y*vQ.b,]Q.x-QQ.{-ZQ/j.`Q/u.yR0V/iQ'a$bW*[&m'b'c'dQ+W'qU,x*]*^*_Q-X*vQ-f+XS.u,y,zS.z-Y-ZQ/t.vR/v.{]!mP!o'^*q-^/OreOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,Y[!gP!o'^*q-^/OW#b`#e%b&]Q'}$oW(d%O+s.R/dS*U&i*WS*w'e-[S*|'h+OR.X+xh#VY!W!e#n#s%V'|*T*z+f,u-aQ)j%wQ)v&WR,o)y#xnOcopx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o,Y,`-r-t-}.g.m/[/_/b/n0Z0f0k^!kP!g!o'^*q-^/Ov#TY!W#`#n#s%w&W&[&`'|(`(})y*T+f+r,u.W/hQ#g`Q$b{Q$c|Q$d}W%S!e%V*z-aS%Y!h(vQ%`!iQ&m#pQ&n#qQ&o#rQ(u%ZS(y%^({Q*R&eS*v'e-[R-Z*wU)h%v)f.mR+V'p[!mP!o'^*q-^/OT*}'h+O^!iP!g!o'^*q-^/OQ'd$bQ'l$dQ*_&mQ*d&oV*{'h*|+OQ%[!hR,S(vQ(s%YR,R(u#znO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o,Y,`-r-t-}.g.m/[/_/b/n0Z0f0kQ%c!kS(l%S(yR(|%`T#e`%bU#c`#e%bR)z&]Q%f!lQ(n%UQ(r%XQ,U(zR.],VrvOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,Y[!mP!o'^*q-^/OQ%P!bQ%a!jQ%i!pQ'[$ZQ([$|Q(k%QQ(p%WQ+z(iR.Y+yrtOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,Y[!mP!o'^*q-^/OS*V&i*WT*}'h+OQ'c$bS*^&m'dR,z*_Q'b$bQ'g$cU*]&m'c'dQ*a&nS,y*^*_R.v,zQ*u'`R+Q'iQ'k$dS*c&o'lR,}*dQ'j$dU*b&o'k'lS,|*c*dR.w,}rtOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,Y[!mP!o'^*q-^/OT*}'h+OQ'f$cS*`&n'gR,{*aQ*x'eR.|-[R-`*yQ&j#mR*Z&lT*V&i*WQ%e!lS(q%X%fR,P(rR)R%dWk%O+s.R/d#{lO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o,Y,`-r-t-}.g.m/[/_/b/n0Z0f0k$SiO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%O%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o+s,Y,`-r-t-}.R.g.m/[/_/b/d/n0Z0f0kU&r#t$g,ZS*g&s._Q-Q*iR.y-RT'o$e'p!_#|m#a$r$z$}&w&z&{'O'P'Q'R'S'W'Z)[)g+S+g+j-T-V-e-v-{.e/Z/a/}0Q!]$Pm#a$r$z$}&w&z&{'O'P'R'S'W'Z)[)g+S+g+j-T-V-e-v-{.e/Z/a/}0Q#{nO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o,Y,`-r-t-}.g.m/[/_/b/n0Z0f0ka)^%k)],`.g/n0Z0f0kQ)`%kR.k,cQ't$hQ)b%oR,f)cT+Y's+ZsvOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,YruOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,YQ$w!]R$y!^R$p!XrvOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,YR(O$oR$q!XR(V$sT+k(U+lX(f%P(g(k+{R+y(hQ.W+xR/h.XQ(j%PQ+w(gQ+|(kR.Z+{R%Q!bQ(e%OV.P+s.R/dQxOQ#lcW$`x#l)Q,YQ)Q%dR,Y)RrXOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,Yn!fP!o#e&]&i'^'e'h*W*q+O+x-[-^/Ol!zX!f#P#_#i$[%Z%_%{&R'n'{)O0r!j#PY!e!x#T#`#n$]%S%V%^%u%|&S&[&`'X'|(`(l({(}*T*p*z+f+r+},W,u-a.V/q0R0X0[0hQ#_`Q#ia#d$[op!Y!_!a#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$l%g%k%v&b&d'_'`'i'm(O(T(t)])f)o*P*l*o+T+h+i+o,^,`-r-t-}.g.m/[/_/b/n0Z0f0kS%Z!h(vS%_!i*{S%{#Y)pQ&R#[S'n$e'pY'{$o%O+s.R/dQ)O%bR0r$YQ!uUR%m!uQ)q&OR,l)q^#RY#`$]'X'|(`*px%R!e!x#n%V%^%|&S&[&`({(}*T*z+f+r,W,u-a.V0R[%t#R%R%u+}0X0hS%u#T%SQ+}(lQ0X/qR0h0[Q*m&{R-U*mQ!oPU%h!o*q/OQ*q'^R/O-^!pbOP`cx![!o#e#l$_$m$n$o$p$q%O%b%d&]&i'^'e'h(U)Q)R*W*q+O+d+l+s+x,Y-[-^.R/O/dY!yX!f#_'{)OT#jb!yQ.n,gR/p.nQ%x#VR)k%xQ&c#fS*O&c.[R.[,QQ(w%[R,T(wQ&^#cR){&^Q,_)WR.d,_Q+O'hR-b+OQ-]*xR.}-]Q*W&iR,v*WQ'p$eR+U'pQ&f#gR*S&fQ.h,aR/m.hQ,d)`R.l,dQ+Z'sR-g+ZQ-k+]R/T-kQ/y/US0^/y0`R0`/{Q+l(UR-x+lQ(g%PS+v(g+{R+{(kQ/f.VR0S/fQ+t(eR.S+t`wOcx#l%d)Q)R,YQ$t![Q']$_Q'y$mQ'z$nQ(Q$pQ(R$qS+k(U+lR-q+d'dsOPXY`acopx!Y![!_!a!e!f!h!i!o!x#P#T#Y#[#_#`#e#i#l#n#u#w#x#|#}$O$P$Q$R$S$T$U$V$Y$Z$[$]$_$e$l$m$n$o$p$q%O%S%V%Z%^%_%b%d%g%u%v%{%|&R&S&[&]&`&b&d&i'X'^'_'`'e'h'i'm'n'p'{'|(O(T(U(`(l(t(v({(})O)Q)R)f)o)p*P*T*W*l*o*p*q*z*{+O+T+d+f+h+i+l+o+r+s+x+},W,Y,^,u-[-^-a-r-t-}.R.V.m/O/[/_/b/d/q0R0X0[0h0ra)_%k)],`.g/n0Z0f0kQ!rTQ$h!QQ$i!SQ$j!TQ%o!{Q%q!}Q'x$kQ)c%pQ)l0oS-i+]+_Q-m+^Q-n+`Q/S-kS/U-m/WQ/{/XR0]/x%uSOT`cdopx!Q!S!T!Y![!_!a!{!}#`#l#o#t#u#v#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$g$k$l$m$n$o$p$q%O%d%j%k%p%v&S&d&s&y'm'v(O(T(U(})Q)R)])f*P*T*i*l*o+T+]+^+_+`+b+d+h+i+l+o+s,W,Y,Z,`,c,u-R-k-m-r-t-}.R._.g.m/W/X/[/_/b/d/n/x0Z0f0k0oQ)a%kQ,a)]S.f,`/nQ/l.gQ0g0ZQ0i0fR0m0krmOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,YS#a`$lQ$WoQ$^pQ$r!YQ$z!_Q$}!aQ&w#uQ&z#wY&{#x$o+h-t/_Q&}#|Q'O#}Q'P$OQ'Q$PQ'R$QQ'S$RQ'T$SQ'U$TQ'V$UQ'W$VQ'Z$Z^)[%k)].g/n0Z0f0kU)g%v)f.mQ*Q&dQ+S'mQ+g(OQ+j(TQ,p*PQ-T*lQ-V*oQ-e+TQ-v+iQ-{+oQ.e,`Q/Z-rQ/a-}Q/}/[R0Q/b#xgO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o,Y,`-r-t-}.g.m/[/_/b/n0Z0f0kW(a%O+s.R/dR)S%drYOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,Y[!eP!o'^*q-^/OW!xX$[%{'{Q#``Q#ne#S$]op!Y!_!a#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$l%k%v&d'm(O(T)])f*P*l*o+T+h+i+o,`-r-t-}.g.m/[/_/b/n0Z0f0kQ%V!gS%^!i*{d%|#Y%g&b'_'`'i(t)o)p,^Q&S#_Q&[#bS&`#e&]Q'X$YQ'|$oW(`%O+s.R/dQ({%_Q(}%bS*T&i*WQ*p0rS*z'h+OQ+f'}Q+r(dQ,W)OQ,u*UQ-a*|S.V+x.XR0R/e&O_OPX`ceopx!Y![!_!a!g!i!o#Y#_#b#e#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Y$Z$[$_$l$m$n$o$p$q%O%_%b%d%g%k%v%{&]&b&d&i'^'_'`'h'i'm'{'}(O(T(U(d(t)O)Q)R)])f)o)p*P*U*W*l*o*q*{*|+O+T+d+h+i+l+o+s+x,Y,^,`-^-r-t-}.R.X.g.m/O/[/_/b/d/e/n0Z0f0k0rQ$e!OQ'r$fR*h&t&ZWOPX`ceopx!O!Y![!_!a!g!i!o#Y#[#_#b#e#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Y$Z$[$_$f$l$m$n$o$p$q%O%_%b%d%g%k%v%{&R&]&b&d&i&t'^'_'`'h'i'm'{'}(O(T(U(d(t)O)Q)R)])f)o)p*P*U*W*l*o*q*{*|+O+T+d+h+i+l+o+s+x,Y,^,`-^-r-t-}.R.X.g.m/O/[/_/b/d/e/n0Z0f0k0rR&P#Y$QjOcopx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%O%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o+s,Y,`-r-t-}.R.g.m/[/_/b/d/n0Z0f0kQ#f`Q&O#YQ'Y$YU)W%g'`'iQ)}&bQ*s'_Q,Q(tQ,j)oQ,k)pR.c,^Q)n%}R,i)m$SfO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%O%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o+s,Y,`-r-t-}.R.g.m/[/_/b/d/n0Z0f0kT&p#t,ZQ&|#xQ(P$oQ-u+hQ/]-tR0P/_]!nP!o'^*q-^/O#PaOPX`bcx![!f!o!y#_#e#l$_$m$n$o$p$q%O%b%d&]&i'^'e'h'{(U)O)Q)R*W*q+O+d+l+s+x,Y-[-^.R/O/dU#WY!W'|Q%T!eU&k#n#s+fQ(o%VS,s*T*zT.s,u-aj#UY!W!e#n#s%V%w&W)y*T*z,u-aU&V#`&`(}Q)x&[Q+e'|Q+q(`Q-s+fQ.O+rQ/g.WR0U/hQ)i%vQ,g)fR/o.mR,h)f`!jP!o'^'h*q+O-^/OT%W!g*|R%]!hW%U!e%V*z-aQ(z%^R,V({S#d`%bR&a#eQ)X%gT*t'`'iR*y'e[!lP!o'^*q-^/OR%X!gR#h`R,b)]R)a%kT-j+]-kQ/V-mR/z/WR/z/X",
  nodeNames: "⚠ LineComment BlockComment Program ModuleDeclaration MarkerAnnotation Identifier ScopedIdentifier . Annotation ) ( AnnotationArgumentList AssignmentExpression FieldAccess IntegerLiteral FloatingPointLiteral BooleanLiteral CharacterLiteral StringLiteral TextBlock null ClassLiteral void PrimitiveType TypeName ScopedTypeName GenericType TypeArguments AnnotatedType Wildcard extends super , ArrayType ] Dimension [ class this ParenthesizedExpression ObjectCreationExpression new ArgumentList } { ClassBody ; FieldDeclaration Modifiers public protected private abstract static final strictfp default synchronized native transient volatile VariableDeclarator Definition AssignOp ArrayInitializer MethodDeclaration TypeParameters TypeParameter TypeBound FormalParameters ReceiverParameter FormalParameter SpreadParameter Throws throws Block ClassDeclaration Superclass SuperInterfaces implements InterfaceTypeList InterfaceDeclaration interface ExtendsInterfaces InterfaceBody ConstantDeclaration EnumDeclaration enum EnumBody EnumConstant EnumBodyDeclarations AnnotationTypeDeclaration AnnotationTypeBody AnnotationTypeElementDeclaration StaticInitializer ConstructorDeclaration ConstructorBody ExplicitConstructorInvocation ArrayAccess MethodInvocation MethodName MethodReference ArrayCreationExpression Dimension AssignOp BinaryExpression CompareOp CompareOp LogicOp LogicOp BitOp BitOp BitOp ArithOp ArithOp ArithOp BitOp InstanceofExpression instanceof LambdaExpression InferredParameters TernaryExpression LogicOp : UpdateExpression UpdateOp UnaryExpression LogicOp BitOp CastExpression ElementValueArrayInitializer ElementValuePair open module ModuleBody ModuleDirective requires transitive exports to opens uses provides with PackageDeclaration package ImportDeclaration import Asterisk ExpressionStatement LabeledStatement Label IfStatement if else WhileStatement while ForStatement for ForSpec LocalVariableDeclaration var EnhancedForStatement ForSpec AssertStatement assert SwitchStatement switch SwitchBlock SwitchLabel case DoStatement do BreakStatement break ContinueStatement continue ReturnStatement return SynchronizedStatement ThrowStatement throw TryStatement try CatchClause catch CatchFormalParameter CatchType FinallyClause finally TryWithResourcesStatement ResourceSpecification Resource ClassContent",
  maxTerm: 276,
  nodeProps: [
    ["isolate", -4, 1, 2, 18, 19, ""],
    ["group", -26, 4, 47, 76, 77, 82, 87, 92, 145, 147, 150, 151, 153, 156, 158, 161, 163, 165, 167, 172, 174, 176, 178, 180, 181, 183, 191, "Statement", -25, 6, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 39, 40, 41, 99, 100, 102, 103, 106, 118, 120, 122, 125, 127, 130, "Expression", -7, 23, 24, 25, 26, 27, 29, 34, "Type"],
    ["openedBy", 10, "(", 44, "{"],
    ["closedBy", 11, ")", 45, "}"]
  ],
  propSources: [Y0],
  skippedNodes: [0, 1, 2],
  repeatNodeCount: 28,
  tokenData: "#'f_R!_OX%QXY'fYZ)bZ^'f^p%Qpq'fqr*|rs,^st%Qtu4euv5zvw7[wx8rxyAZyzAwz{Be{|CZ|}Dq}!OE_!O!PFx!P!Q! r!Q!R!,h!R![!0`![!]!>p!]!^!@Q!^!_!@n!_!`!BX!`!a!B{!a!b!Di!b!c!EX!c!}!LT!}#O!Mj#O#P%Q#P#Q!NW#Q#R!Nt#R#S4e#S#T%Q#T#o4e#o#p# h#p#q#!U#q#r##n#r#s#$[#s#y%Q#y#z'f#z$f%Q$f$g'f$g#BY4e#BY#BZ#$x#BZ$IS4e$IS$I_#$x$I_$I|4e$I|$JO#$x$JO$JT4e$JT$JU#$x$JU$KV4e$KV$KW#$x$KW&FU4e&FU&FV#$x&FV;'S4e;'S;=`5t<%lO4eS%VV&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QS%qO&YSS%tVOY&ZYZ%lZr&Zrs&ys;'S&Z;'S;=`'`<%lO&ZS&^VOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QS&vP;=`<%l%QS&|UOY&ZYZ%lZr&Zs;'S&Z;'S;=`'`<%lO&ZS'cP;=`<%l&Z_'mk&YS%yZOX%QXY'fYZ)bZ^'f^p%Qpq'fqr%Qrs%qs#y%Q#y#z'f#z$f%Q$f$g'f$g#BY%Q#BY#BZ'f#BZ$IS%Q$IS$I_'f$I_$I|%Q$I|$JO'f$JO$JT%Q$JT$JU'f$JU$KV%Q$KV$KW'f$KW&FU%Q&FU&FV'f&FV;'S%Q;'S;=`&s<%lO%Q_)iY&YS%yZX^*Xpq*X#y#z*X$f$g*X#BY#BZ*X$IS$I_*X$I|$JO*X$JT$JU*X$KV$KW*X&FU&FV*XZ*^Y%yZX^*Xpq*X#y#z*X$f$g*X#BY#BZ*X$IS$I_*X$I|$JO*X$JT$JU*X$KV$KW*X&FU&FV*XV+TX#tP&YSOY%QYZ%lZr%Qrs%qs!_%Q!_!`+p!`;'S%Q;'S;=`&s<%lO%QU+wV#_Q&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QT,aXOY,|YZ%lZr,|rs3Ys#O,|#O#P2d#P;'S,|;'S;=`3S<%lO,|T-PXOY-lYZ%lZr-lrs.^s#O-l#O#P.x#P;'S-l;'S;=`2|<%lO-lT-qX&YSOY-lYZ%lZr-lrs.^s#O-l#O#P.x#P;'S-l;'S;=`2|<%lO-lT.cVcPOY&ZYZ%lZr&Zrs&ys;'S&Z;'S;=`'`<%lO&ZT.}V&YSOY-lYZ/dZr-lrs1]s;'S-l;'S;=`2|<%lO-lT/iW&YSOY0RZr0Rrs0ns#O0R#O#P0s#P;'S0R;'S;=`1V<%lO0RP0UWOY0RZr0Rrs0ns#O0R#O#P0s#P;'S0R;'S;=`1V<%lO0RP0sOcPP0vTOY0RYZ0RZ;'S0R;'S;=`1V<%lO0RP1YP;=`<%l0RT1`XOY,|YZ%lZr,|rs1{s#O,|#O#P2d#P;'S,|;'S;=`3S<%lO,|T2QUcPOY&ZYZ%lZr&Zs;'S&Z;'S;=`'`<%lO&ZT2gVOY-lYZ/dZr-lrs1]s;'S-l;'S;=`2|<%lO-lT3PP;=`<%l-lT3VP;=`<%l,|T3_VcPOY&ZYZ%lZr&Zrs3ts;'S&Z;'S;=`'`<%lO&ZT3yR&WSXY4SYZ4`pq4SP4VRXY4SYZ4`pq4SP4eO&XP_4lb&YS&PZOY%QYZ%lZr%Qrs%qst%Qtu4eu!Q%Q!Q![4e![!c%Q!c!}4e!}#R%Q#R#S4e#S#T%Q#T#o4e#o$g%Q$g;'S4e;'S;=`5t<%lO4e_5wP;=`<%l4eU6RX#hQ&YSOY%QYZ%lZr%Qrs%qs!_%Q!_!`6n!`;'S%Q;'S;=`&s<%lO%QU6uV#]Q&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QV7cZ&nR&YSOY%QYZ%lZr%Qrs%qsv%Qvw8Uw!_%Q!_!`6n!`;'S%Q;'S;=`&s<%lO%QU8]V#aQ&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QT8wZ&YSOY9jYZ%lZr9jrs:xsw9jwx%Qx#O9j#O#P<S#P;'S9j;'S;=`AT<%lO9jT9oX&YSOY%QYZ%lZr%Qrs%qsw%Qwx:[x;'S%Q;'S;=`&s<%lO%QT:cVbP&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QT:{XOY&ZYZ%lZr&Zrs&ysw&Zwx;hx;'S&Z;'S;=`'`<%lO&ZT;mVbPOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QT<XZ&YSOY<zYZ%lZr<zrs=rsw<zwx9jx#O<z#O#P9j#P;'S<z;'S;=`?^<%lO<zT=PZ&YSOY<zYZ%lZr<zrs=rsw<zwx:[x#O<z#O#P%Q#P;'S<z;'S;=`?^<%lO<zT=uZOY>hYZ%lZr>hrs?dsw>hwx;hx#O>h#O#P&Z#P;'S>h;'S;=`@}<%lO>hT>kZOY<zYZ%lZr<zrs=rsw<zwx:[x#O<z#O#P%Q#P;'S<z;'S;=`?^<%lO<zT?aP;=`<%l<zT?gZOY>hYZ%lZr>hrs@Ysw>hwx;hx#O>h#O#P&Z#P;'S>h;'S;=`@}<%lO>hP@]VOY@YZw@Ywx@rx#O@Y#P;'S@Y;'S;=`@w<%lO@YP@wObPP@zP;=`<%l@YTAQP;=`<%l>hTAWP;=`<%l9j_AbVZZ&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QVBOVYR&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QVBnX$ZP&YS#gQOY%QYZ%lZr%Qrs%qs!_%Q!_!`6n!`;'S%Q;'S;=`&s<%lO%QVCbZ#fR&YSOY%QYZ%lZr%Qrs%qs{%Q{|DT|!_%Q!_!`6n!`;'S%Q;'S;=`&s<%lO%QVD[V#rR&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QVDxVqR&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QVEf[#fR&YSOY%QYZ%lZr%Qrs%qs}%Q}!ODT!O!_%Q!_!`6n!`!aF[!a;'S%Q;'S;=`&s<%lO%QVFcV&xR&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%Q_GPZWY&YSOY%QYZ%lZr%Qrs%qs!O%Q!O!PGr!P!Q%Q!Q![IQ![;'S%Q;'S;=`&s<%lO%QVGwX&YSOY%QYZ%lZr%Qrs%qs!O%Q!O!PHd!P;'S%Q;'S;=`&s<%lO%QVHkV&qR&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QTIXc&YS`POY%QYZ%lZr%Qrs%qs!Q%Q!Q![IQ![!f%Q!f!gJd!g!hKQ!h!iJd!i#R%Q#R#SNz#S#W%Q#W#XJd#X#YKQ#Y#ZJd#Z;'S%Q;'S;=`&s<%lO%QTJkV&YS`POY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QTKV]&YSOY%QYZ%lZr%Qrs%qs{%Q{|LO|}%Q}!OLO!O!Q%Q!Q![Lp![;'S%Q;'S;=`&s<%lO%QTLTX&YSOY%QYZ%lZr%Qrs%qs!Q%Q!Q![Lp![;'S%Q;'S;=`&s<%lO%QTLwc&YS`POY%QYZ%lZr%Qrs%qs!Q%Q!Q![Lp![!f%Q!f!gJd!g!h%Q!h!iJd!i#R%Q#R#SNS#S#W%Q#W#XJd#X#Y%Q#Y#ZJd#Z;'S%Q;'S;=`&s<%lO%QTNXZ&YSOY%QYZ%lZr%Qrs%qs!Q%Q!Q![Lp![#R%Q#R#SNS#S;'S%Q;'S;=`&s<%lO%QT! PZ&YSOY%QYZ%lZr%Qrs%qs!Q%Q!Q![IQ![#R%Q#R#SNz#S;'S%Q;'S;=`&s<%lO%Q_! y]&YS#gQOY%QYZ%lZr%Qrs%qsz%Qz{!!r{!P%Q!P!Q!)e!Q!_%Q!_!`6n!`;'S%Q;'S;=`&s<%lO%Q_!!wX&YSOY!!rYZ!#dZr!!rrs!%Psz!!rz{!&_{;'S!!r;'S;=`!'s<%lO!!r_!#iT&YSOz!#xz{!$[{;'S!#x;'S;=`!$y<%lO!#xZ!#{TOz!#xz{!$[{;'S!#x;'S;=`!$y<%lO!#xZ!$_VOz!#xz{!$[{!P!#x!P!Q!$t!Q;'S!#x;'S;=`!$y<%lO!#xZ!$yOQZZ!$|P;=`<%l!#x_!%SXOY!%oYZ!#dZr!%ors!'ysz!%oz{!(i{;'S!%o;'S;=`!)_<%lO!%o_!%rXOY!!rYZ!#dZr!!rrs!%Psz!!rz{!&_{;'S!!r;'S;=`!'s<%lO!!r_!&dZ&YSOY!!rYZ!#dZr!!rrs!%Psz!!rz{!&_{!P!!r!P!Q!'V!Q;'S!!r;'S;=`!'s<%lO!!r_!'^V&YSQZOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%Q_!'vP;=`<%l!!r_!'|XOY!%oYZ!#dZr!%ors!#xsz!%oz{!(i{;'S!%o;'S;=`!)_<%lO!%o_!(lZOY!!rYZ!#dZr!!rrs!%Psz!!rz{!&_{!P!!r!P!Q!'V!Q;'S!!r;'S;=`!'s<%lO!!r_!)bP;=`<%l!%o_!)lV&YSPZOY!)eYZ%lZr!)ers!*Rs;'S!)e;'S;=`!+X<%lO!)e_!*WVPZOY!*mYZ%lZr!*mrs!+_s;'S!*m;'S;=`!,b<%lO!*m_!*rVPZOY!)eYZ%lZr!)ers!*Rs;'S!)e;'S;=`!+X<%lO!)e_!+[P;=`<%l!)e_!+dVPZOY!*mYZ%lZr!*mrs!+ys;'S!*m;'S;=`!,b<%lO!*mZ!,OSPZOY!+yZ;'S!+y;'S;=`!,[<%lO!+yZ!,_P;=`<%l!+y_!,eP;=`<%l!*mT!,ou&YS_POY%QYZ%lZr%Qrs%qs!O%Q!O!P!/S!P!Q%Q!Q![!0`![!d%Q!d!e!3j!e!f%Q!f!gJd!g!hKQ!h!iJd!i!n%Q!n!o!2U!o!q%Q!q!r!5h!r!z%Q!z!{!7`!{#R%Q#R#S!2r#S#U%Q#U#V!3j#V#W%Q#W#XJd#X#YKQ#Y#ZJd#Z#`%Q#`#a!2U#a#c%Q#c#d!5h#d#l%Q#l#m!7`#m;'S%Q;'S;=`&s<%lO%QT!/Za&YS`POY%QYZ%lZr%Qrs%qs!Q%Q!Q![IQ![!f%Q!f!gJd!g!hKQ!h!iJd!i#W%Q#W#XJd#X#YKQ#Y#ZJd#Z;'S%Q;'S;=`&s<%lO%QT!0gi&YS_POY%QYZ%lZr%Qrs%qs!O%Q!O!P!/S!P!Q%Q!Q![!0`![!f%Q!f!gJd!g!hKQ!h!iJd!i!n%Q!n!o!2U!o#R%Q#R#S!2r#S#W%Q#W#XJd#X#YKQ#Y#ZJd#Z#`%Q#`#a!2U#a;'S%Q;'S;=`&s<%lO%QT!2]V&YS_POY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QT!2wZ&YSOY%QYZ%lZr%Qrs%qs!Q%Q!Q![!0`![#R%Q#R#S!2r#S;'S%Q;'S;=`&s<%lO%QT!3oY&YSOY%QYZ%lZr%Qrs%qs!Q%Q!Q!R!4_!R!S!4_!S;'S%Q;'S;=`&s<%lO%QT!4f`&YS_POY%QYZ%lZr%Qrs%qs!Q%Q!Q!R!4_!R!S!4_!S!n%Q!n!o!2U!o#R%Q#R#S!3j#S#`%Q#`#a!2U#a;'S%Q;'S;=`&s<%lO%QT!5mX&YSOY%QYZ%lZr%Qrs%qs!Q%Q!Q!Y!6Y!Y;'S%Q;'S;=`&s<%lO%QT!6a_&YS_POY%QYZ%lZr%Qrs%qs!Q%Q!Q!Y!6Y!Y!n%Q!n!o!2U!o#R%Q#R#S!5h#S#`%Q#`#a!2U#a;'S%Q;'S;=`&s<%lO%QT!7e_&YSOY%QYZ%lZr%Qrs%qs!O%Q!O!P!8d!P!Q%Q!Q![!:r![!c%Q!c!i!:r!i#T%Q#T#Z!:r#Z;'S%Q;'S;=`&s<%lO%QT!8i]&YSOY%QYZ%lZr%Qrs%qs!Q%Q!Q![!9b![!c%Q!c!i!9b!i#T%Q#T#Z!9b#Z;'S%Q;'S;=`&s<%lO%QT!9gc&YSOY%QYZ%lZr%Qrs%qs!Q%Q!Q![!9b![!c%Q!c!i!9b!i!r%Q!r!sKQ!s#R%Q#R#S!8d#S#T%Q#T#Z!9b#Z#d%Q#d#eKQ#e;'S%Q;'S;=`&s<%lO%QT!:yi&YS_POY%QYZ%lZr%Qrs%qs!O%Q!O!P!<h!P!Q%Q!Q![!:r![!c%Q!c!i!:r!i!n%Q!n!o!2U!o!r%Q!r!sKQ!s#R%Q#R#S!=r#S#T%Q#T#Z!:r#Z#`%Q#`#a!2U#a#d%Q#d#eKQ#e;'S%Q;'S;=`&s<%lO%QT!<ma&YSOY%QYZ%lZr%Qrs%qs!Q%Q!Q![!9b![!c%Q!c!i!9b!i!r%Q!r!sKQ!s#T%Q#T#Z!9b#Z#d%Q#d#eKQ#e;'S%Q;'S;=`&s<%lO%QT!=w]&YSOY%QYZ%lZr%Qrs%qs!Q%Q!Q![!:r![!c%Q!c!i!:r!i#T%Q#T#Z!:r#Z;'S%Q;'S;=`&s<%lO%QV!>wX#pR&YSOY%QYZ%lZr%Qrs%qs![%Q![!]!?d!];'S%Q;'S;=`&s<%lO%QV!?kV&vR&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QV!@XV!PR&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%Q_!@uY&_Z&YSOY%QYZ%lZr%Qrs%qs!^%Q!^!_!Ae!_!`+p!`;'S%Q;'S;=`&s<%lO%QU!AlX#iQ&YSOY%QYZ%lZr%Qrs%qs!_%Q!_!`6n!`;'S%Q;'S;=`&s<%lO%QV!B`X!bR&YSOY%QYZ%lZr%Qrs%qs!_%Q!_!`+p!`;'S%Q;'S;=`&s<%lO%QV!CSY&^R&YSOY%QYZ%lZr%Qrs%qs!_%Q!_!`+p!`!a!Cr!a;'S%Q;'S;=`&s<%lO%QU!CyY#iQ&YSOY%QYZ%lZr%Qrs%qs!_%Q!_!`6n!`!a!Ae!a;'S%Q;'S;=`&s<%lO%Q_!DrV&bX#oQ&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%Q_!E`X%}Z&YSOY%QYZ%lZr%Qrs%qs#]%Q#]#^!E{#^;'S%Q;'S;=`&s<%lO%QV!FQX&YSOY%QYZ%lZr%Qrs%qs#b%Q#b#c!Fm#c;'S%Q;'S;=`&s<%lO%QV!FrX&YSOY%QYZ%lZr%Qrs%qs#h%Q#h#i!G_#i;'S%Q;'S;=`&s<%lO%QV!GdX&YSOY%QYZ%lZr%Qrs%qs#X%Q#X#Y!HP#Y;'S%Q;'S;=`&s<%lO%QV!HUX&YSOY%QYZ%lZr%Qrs%qs#f%Q#f#g!Hq#g;'S%Q;'S;=`&s<%lO%QV!HvX&YSOY%QYZ%lZr%Qrs%qs#Y%Q#Y#Z!Ic#Z;'S%Q;'S;=`&s<%lO%QV!IhX&YSOY%QYZ%lZr%Qrs%qs#T%Q#T#U!JT#U;'S%Q;'S;=`&s<%lO%QV!JYX&YSOY%QYZ%lZr%Qrs%qs#V%Q#V#W!Ju#W;'S%Q;'S;=`&s<%lO%QV!JzX&YSOY%QYZ%lZr%Qrs%qs#X%Q#X#Y!Kg#Y;'S%Q;'S;=`&s<%lO%QV!KnV&tR&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%Q_!L[b&RZ&YSOY%QYZ%lZr%Qrs%qst%Qtu!LTu!Q%Q!Q![!LT![!c%Q!c!}!LT!}#R%Q#R#S!LT#S#T%Q#T#o!LT#o$g%Q$g;'S!LT;'S;=`!Md<%lO!LT_!MgP;=`<%l!LT_!MqVuZ&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QV!N_VsR&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QU!N{X#eQ&YSOY%QYZ%lZr%Qrs%qs!_%Q!_!`6n!`;'S%Q;'S;=`&s<%lO%QV# oV}R&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%Q_#!_Z'OX#dQ&YSOY%QYZ%lZr%Qrs%qs!_%Q!_!`6n!`#p%Q#p#q##Q#q;'S%Q;'S;=`&s<%lO%QU##XV#bQ&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QV##uV|R&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QT#$cV#uP&YSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%Q_#%Ru&YS%yZ&PZOX%QXY'fYZ)bZ^'f^p%Qpq'fqr%Qrs%qst%Qtu4eu!Q%Q!Q![4e![!c%Q!c!}4e!}#R%Q#R#S4e#S#T%Q#T#o4e#o#y%Q#y#z'f#z$f%Q$f$g'f$g#BY4e#BY#BZ#$x#BZ$IS4e$IS$I_#$x$I_$I|4e$I|$JO#$x$JO$JT4e$JT$JU#$x$JU$KV4e$KV$KW#$x$KW&FU4e&FU&FV#$x&FV;'S4e;'S;=`5t<%lO4e",
  tokenizers: [0, 1, 2, 3],
  topRules: { Program: [0, 3], ClassContent: [1, 194] },
  dynamicPrecedences: { 27: 1, 232: -1, 243: -1 },
  specialized: [{ term: 231, get: (n) => R0[n] || -1 }],
  tokenPrec: 7144
}), q0 = /* @__PURE__ */ ji.define({
  name: "java",
  parser: /* @__PURE__ */ _0.configure({
    props: [
      /* @__PURE__ */ $r.add({
        IfStatement: /* @__PURE__ */ yt({ except: /^\s*({|else\b)/ }),
        TryStatement: /* @__PURE__ */ yt({ except: /^\s*({|catch|finally)\b/ }),
        LabeledStatement: IO,
        SwitchBlock: (n) => {
          let e = n.textAfter, t = /^\s*\}/.test(e), i = /^\s*(case|default)\b/.test(e);
          return n.baseIndent + (t ? 0 : i ? 1 : 2) * n.unit;
        },
        Block: /* @__PURE__ */ DO({ closing: "}" }),
        BlockComment: () => null,
        Statement: /* @__PURE__ */ yt({ except: /^{/ })
      }),
      /* @__PURE__ */ Pr.add({
        "Block SwitchBlock ClassBody ElementValueArrayInitializer ModuleBody EnumBody ConstructorBody InterfaceBody ArrayInitializer": BO,
        BlockComment(n) {
          return { from: n.from + 2, to: n.to - 2 };
        }
      })
    ]
  }),
  languageData: {
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*(?:case |default:|\{|\})$/
  }
});
function V0() {
  return new MO(q0);
}
const mh = 1, z0 = 2, C0 = 3, W0 = 82, j0 = 76, A0 = 117, E0 = 85, M0 = 97, G0 = 122, L0 = 65, D0 = 90, I0 = 95, aO = 48, gh = 34, B0 = 40, Qh = 41, N0 = 32, $h = 62, F0 = new di((n) => {
  if (n.next == j0 || n.next == E0 ? n.advance() : n.next == A0 && (n.advance(), n.next == aO + 8 && n.advance()), n.next != W0 || (n.advance(), n.next != gh)) return;
  n.advance();
  let e = "";
  for (; n.next != B0; ) {
    if (n.next == N0 || n.next <= 13 || n.next == Qh) return;
    e += String.fromCharCode(n.next), n.advance();
  }
  for (n.advance(); ; ) {
    if (n.next < 0)
      return n.acceptToken(mh);
    if (n.next == Qh) {
      let t = !0;
      for (let i = 0; t && i < e.length; i++)
        n.peek(i + 1) != e.charCodeAt(i) && (t = !1);
      if (t && n.peek(e.length + 1) == gh)
        return n.acceptToken(mh, 2 + e.length);
    }
    n.advance();
  }
}), H0 = new di((n) => {
  if (n.next == $h)
    n.peek(1) == $h && n.acceptToken(z0, 1);
  else {
    let e = !1, t = 0;
    for (; ; t++) {
      if (n.next >= L0 && n.next <= D0) e = !0;
      else {
        if (n.next >= M0 && n.next <= G0) return;
        if (n.next != I0 && !(n.next >= aO && n.next <= aO + 9)) break;
      }
      n.advance();
    }
    e && t > 1 && n.acceptToken(C0);
  }
}, { extend: !0 }), K0 = mr({
  "typedef struct union enum class typename decltype auto template operator friend noexcept namespace using requires concept import export module __attribute__ __declspec __based": p.definitionKeyword,
  "extern MsCallModifier MsPointerModifier extern static register thread_local inline const volatile restrict _Atomic mutable constexpr constinit consteval virtual explicit VirtualSpecifier Access": p.modifier,
  "if else switch for while do case default return break continue goto throw try catch": p.controlKeyword,
  "co_return co_yield co_await": p.controlKeyword,
  "new sizeof delete static_assert": p.operatorKeyword,
  "NULL nullptr": p.null,
  this: p.self,
  "True False": p.bool,
  "TypeSize PrimitiveType": p.standard(p.typeName),
  TypeIdentifier: p.typeName,
  FieldIdentifier: p.propertyName,
  "CallExpression/FieldExpression/FieldIdentifier": p.function(p.propertyName),
  "ModuleName/Identifier": p.namespace,
  PartitionName: p.labelName,
  StatementIdentifier: p.labelName,
  "Identifier DestructorName": p.variableName,
  "CallExpression/Identifier": p.function(p.variableName),
  "CallExpression/ScopedIdentifier/Identifier": p.function(p.variableName),
  "FunctionDeclarator/Identifier FunctionDeclarator/DestructorName": p.function(p.definition(p.variableName)),
  NamespaceIdentifier: p.namespace,
  OperatorName: p.operator,
  ArithOp: p.arithmeticOperator,
  LogicOp: p.logicOperator,
  BitOp: p.bitwiseOperator,
  CompareOp: p.compareOperator,
  AssignOp: p.definitionOperator,
  UpdateOp: p.updateOperator,
  LineComment: p.lineComment,
  BlockComment: p.blockComment,
  Number: p.number,
  String: p.string,
  "RawString SystemLibString": p.special(p.string),
  CharLiteral: p.character,
  EscapeSequence: p.escape,
  "UserDefinedLiteral/Identifier": p.literal,
  PreprocArg: p.meta,
  "PreprocDirectiveName #include #ifdef #ifndef #if #define #else #endif #elif": p.processingInstruction,
  MacroName: p.special(p.name),
  "( )": p.paren,
  "[ ]": p.squareBracket,
  "{ }": p.brace,
  "< >": p.angleBracket,
  ". ->": p.derefOperator,
  ", ;": p.separator
}), J0 = { __proto__: null, bool: 36, char: 36, int: 36, float: 36, double: 36, void: 36, size_t: 36, ssize_t: 36, intptr_t: 36, uintptr_t: 36, charptr_t: 36, int8_t: 36, int16_t: 36, int32_t: 36, int64_t: 36, uint8_t: 36, uint16_t: 36, uint32_t: 36, uint64_t: 36, char8_t: 36, char16_t: 36, char32_t: 36, char64_t: 36, const: 70, volatile: 72, restrict: 74, _Atomic: 76, mutable: 78, constexpr: 80, constinit: 82, consteval: 84, struct: 88, __declspec: 92, final: 148, override: 148, public: 152, private: 152, protected: 152, virtual: 154, extern: 160, static: 162, register: 164, inline: 166, thread_local: 168, __attribute__: 172, __based: 178, __restrict: 180, __uptr: 180, __sptr: 180, _unaligned: 180, __unaligned: 180, noexcept: 194, requires: 198, TRUE: 798, true: 798, FALSE: 800, false: 800, typename: 218, class: 220, template: 234, throw: 248, __cdecl: 256, __clrcall: 256, __stdcall: 256, __fastcall: 256, __thiscall: 256, __vectorcall: 256, try: 260, catch: 264, export: 282, import: 286, case: 296, default: 298, if: 308, else: 314, switch: 318, do: 322, while: 324, for: 330, return: 334, break: 338, continue: 342, goto: 346, co_return: 350, co_yield: 354, using: 362, typedef: 366, namespace: 380, new: 398, delete: 400, co_await: 402, concept: 406, enum: 410, static_assert: 414, friend: 422, union: 424, explicit: 430, operator: 444, module: 456, signed: 518, unsigned: 518, long: 518, short: 518, decltype: 528, auto: 530, sizeof: 566, NULL: 572, nullptr: 586, this: 588 }, ex = { __proto__: null, "<": 767 }, tx = { __proto__: null, ">": 135 }, ix = { __proto__: null, operator: 388, new: 576, delete: 582 }, nx = Mi.deserialize({
  version: 14,
  states: "$<[Q!QQVOOP'gOUOOO([OWO'#CdO,UQUO'#CgO,`QUO'#FjO-vQbO'#CxO.XQUO'#CxO0WQUO'#KaO0_QUO'#CwO0jOpO'#DvO0rQ!dO'#D]OOQR'#JP'#JPO5[QVO'#GUO5iQUO'#JWOOQQ'#JW'#JWO8}QUO'#KtO<hQUO'#KtO?OQVO'#E^O?`QUO'#E^OOQQ'#Ed'#EdOOQQ'#Ee'#EeO?eQVO'#EfO@[QVO'#EiOBXQUO'#FPOByQUO'#FhOOQR'#Fj'#FjOCOQUO'#FjOOQR'#LX'#LXOOQR'#LW'#LWOEWQVO'#KWOF{QUO'#L_OGYQUO'#KxOGnQUO'#L_OH`QUO'#LaOOQR'#HU'#HUOOQR'#HV'#HVOOQR'#HW'#HWOOQR'#LT'#LTOOQR'#J`'#J`Q!QQVOOOHnQVO'#FOOIZQUO'#EhOIbQUOOOK^QVO'#HgOKnQUO'#HgONYQUO'#KxONdQUO'#KxOOQQ'#Kx'#KxO!!bQUO'#KxOOQQ'#Js'#JsO!!oQUO'#HxOOQQ'#Ka'#KaO!&aQUO'#KaO!&}QUO'#KWO!(}QVO'#I]O!(}QVO'#I`OCTQUO'#KWOOQQ'#Ip'#IpOOQQ'#KW'#KWO!-QQUO'#KaOOQR'#K`'#K`O!-XQUO'#DZO!/pQUO'#KuOOQQ'#Ku'#KuO!/wQUO'#KuO!0OQUO'#ETO!0TQUO'#EWO!0YQUO'#FRO8}QUO'#FPO!QQVO'#F^O!0_Q#vO'#F`O!0jQUO'#FkO!0rQUO'#FpO!0wQVO'#FrO!0rQUO'#FuO!3vQUO'#FvO!3{QVO'#FxO!4VQUO'#FzO!4[QUO'#F|O!4aQUO'#GOO!4fQVO'#GQO!(}QVO'#GSO!4mQUO'#GpO!4{QUO'#GYO!(}QVO'#FeO!6YQUO'#FeO!6_QVO'#G`O!6fQUO'#GaO!6qQUO'#GnO!6vQUO'#GrO!6{QUO'#GzO!7mQ&lO'#HiO!:pQUO'#GuO!;QQUO'#HXO!;]QUO'#HZO!;eQUO'#DXO!;eQUO'#HuO!;eQUO'#HvO!;|QUO'#HwO!<_QUO'#H|O!=SQUO'#H}O!>xQVO'#IbO!(}QVO'#IdO!?SQUO'#IgO!?ZQVO'#IjP!AQO!LQO'#CaP!A]{,UO'#CbP!6q{,UO'#CbP!Ah{7[O'#CbP!6q{,UO'#CbP!Am{,UO'#CbP!AxOSO'#IzPOOO)CEp)CEpOOOO'#I}'#I}O!BSOWO,59OOOQR,59O,59OO!(}QVO,59VOOQQ,59X,59XOOQR'#Do'#DoO!(}QVO,5;ROOQR,5<U,5<UO!B_QUO,59ZO!(}QVO,5>qOOQR'#IX'#IXOOQR'#IY'#IYOOQR'#IZ'#IZOOQR'#I['#I[O!(}QVO,5>rO!(}QVO,5>rO!(}QVO,5>rO!(}QVO,5>rO!(}QVO,5>rO!(}QVO,5>rO!(}QVO,5>rO!(}QVO,5>rO!(}QVO,5>rO!(}QVO,5>rO!D^QVO,5>zOOQQ,5?W,5?WO!FPQVO'#CjO!IxQUO'#CzOOQQ,59d,59dOOQQ,59c,59cOOQQ,5<},5<}O!JVQ&lO,5=mO!?SQUO,5?RO!LyQVO,5?UO!MQQbO,59dO!M]QVO'#FYOOQQ,5?P,5?PO!MmQVO,59WO!MtO`O,5:bO!MyQbO'#D^O!N[QbO'#KeO!NjQbO,59wO!NrQbO'#CxO# TQUO'#CxO# YQUO'#KaO# dQUO'#CwOOQR-E<}-E<}O# oQUO,5AvO# vQVO'#EfO@[QVO'#EiOBXQUO,5;kOOQR,5<p,5<pO#$oQUO'#KWO#$vQUO'#KWO!(}QVO'#IUO8}QUO,5;kO#%ZQ&lO'#HiO#(bQUO'#CtO#+VQbO'#CxO#+[QUO'#CwO#.xQUO'#KaOOQQ-E=U-E=UO#1]QUO,5A`O#1gQUO'#KaO#1qQUO,5A`OOQR,5Av,5AvOOQQ,5>l,5>lO#3uQUO'#CgO#4kQUO,5>pO#6^QUO'#IeOOQR'#JO'#JOO#6fQUO,5:xO#7SQUO,5:xO#7sQUO,5:xO#8hQUO'#CuO!0TQUO'#CmOOQQ'#JX'#JXO#7SQUO,5:xO#8pQUO,5;QO!4{QUO'#DOO#9yQUO,5;QO#:OQUO,5>QO#;[QUO'#DOO#;rQUO,5>{O#;wQUO'#LOO#=QQUO,5;TO#=YQVO,5;TO#=dQUO,5;TOOQQ,5;T,5;TO#?]QUO'#LdO#?dQUO,5>UO#?iQbO'#CxO#?tQUO'#GcO#?yQUO'#E^O#@jQUO,5;kO#ARQUO'#LUO#AZQUO,5;rOKnQUO'#HfOBXQUO'#HgO#A`QUO'#KxO!6qQUO'#HjO#BWQUO'#CuO!0wQVO,5<SOOQQ'#Cg'#CgOOQR'#Jj'#JjO#B]QVO,5=`OOQQ,5?Z,5?ZO#DfQbO'#CxO#DqQUO'#GcOOQQ'#Jk'#JkOOQQ-E=i-E=iOGYQUO,5AyOGnQUO,5AyO#DvQUO,5A{O#ERQUO'#G|OOQR,5Ay,5AyO#DvQUO,5AyO#E^QUO'#HOO#EfQUO,5A{OOQR,5A{,5A{OOQR,5A|,5A|O#EtQVO,5A|OOQR-E=^-E=^O#GnQVO,5;jOOQR,5;j,5;jO#IoQUO'#EjO#JtQUO'#EwO#KkQVO'#ExO#M}QUO'#EvO#NVQUO'#EyO$ UQUO'#EzOOQQ'#LR'#LRO$ {QUO,5;SO$#RQUO'#EvOOQQ,5;S,5;SO$$OQUO,5;SO$%qQUO,5:yO$([QVO,5>PO$(fQUO'#E[O$(sQUO,5>ROOQQ,5>S,5>SO$,aQVO'#C|OOQQ-E=q-E=qOOQQ,5>d,5>dOOQQ,59a,59aO$,kQUO,5>wO$.kQUO,5>zO!6qQUO,59uO$/OQUO,5;qO$/]QUO,5<{O!0TQUO,5:oOOQQ,5:r,5:rO$/hQUO,5;mO$/mQUO'#KtOBXQUO,5;kOOQR,5;x,5;xO$0^QUO'#FbO$0lQUO'#FbO$0qQUO,5;zO$4[QVO'#FmO!0wQVO,5<VO!0rQUO,5<VO!0YQUO,5<[O$4cQVO'#GUO$7_QUO,5<^O!0wQVO,5<aO$:uQVO,5<bO$;SQUO,5<dOOQR,5<d,5<dO$<]QUO,5<dOOQR,5<f,5<fOOQR,5<h,5<hOOQQ'#Fi'#FiO$<bQUO,5<jO$<gQUO,5<lOOQR,5<l,5<lO$=mQUO,5<nO$>sQUO'#L^O$>{QUO,5<rO$?WQUO,5=[O$?]QUO,5=[O!4{QUO,5<tO$?eQUO,5<tO$?yQUO,5<PO$APQVO,5<PO$CbQUO,5<zOOQR,5<z,5<zOOQR,5<{,5<{O$?]QUO,5<{O$DhQUO,5<{O$DsQUO,5=YO!(}QVO,5=^O!(}QVO,5=fO#NsQUO,5=mOOQQ,5>T,5>TO$FxQUO,5>TO$GSQUO,5>TO$GXQUO,5>TO$G^QUO,5>TO!6qQUO,5>TO$I[QUO'#KaO$IcQUO,5=oO$InQUO,5=aOKnQUO,5=oO$JhQUO,5=sOOQR,5=s,5=sO$JpQUO,5=sO$L{QVO'#H[OOQQ,5=u,5=uO!;`QUO,5=uO%#vQUO'#KqO%#}QUO'#KbO%$cQUO'#KqO%$mQUO'#DyO%%OQUO'#D|O%'{QUO'#KbOOQQ'#Kb'#KbO%)nQUO'#KbO%#}QUO'#KbO%)sQUO'#KbOOQQ,59s,59sOOQQ,5>a,5>aOOQQ,5>b,5>bO%){QUO'#HzO%*TQUO,5>cOOQQ,5>c,5>cO%-oQUO,5>cO%-zQUO,5>hO%1fQVO,5>iO%1mQUO,5>|O# vQVO'#EfO%4sQUO,5>|OOQQ,5>|,5>|O%5dQUO,5?OO%7hQUO,5?RO!<_QUO,5?RO%9dQUO,5?UO%=PQVO,5?UPOOO'#I|'#I|P%=WO!LQO,58{POOO,58{,58{P!Am{,UO,58|P%=c{,UO,58|P%=q{7[O,58|PO{O'#Jw'#JwP%>S{,UO'#LkPOOO'#Lk'#LkP%>Y{,UO'#LkPOOO,58|,58|POOO,5?f,5?fP%>_OSO,5?fOOOO-E<{-E<{OOQR1G.j1G.jO%>fQUO1G.qO%?lQUO1G0mOOQQ1G0m1G0mO%@xQUO'#CpO%CXQbO'#CxO%CdQUO'#CsO%CiQUO'#CsO%CnQUO1G.uO#BWQUO'#CrOOQQ1G.u1G.uO%EqQUO1G4]O%FwQUO1G4^O%HjQUO1G4^O%J]QUO1G4^O%LOQUO1G4^O%MqQUO1G4^O& dQUO1G4^O&#VQUO1G4^O&$xQUO1G4^O&&kQUO1G4^O&(^QUO1G4^O&*PQUO1G4^O&+rQUO'#KVO&,{QUO'#KVO&-TQUO,59UOOQQ,5=P,5=PO&/]QUO,5=PO&/gQUO,5=PO&/lQUO,5=PO&/qQUO,5=PO!6qQUO,5=PO#NsQUO1G3XO&/{QUO1G4mO!<_QUO1G4mO&1wQUO1G4pO&3jQVO1G4pOOQQ1G/O1G/OOOQQ1G.}1G.}OOQQ1G2i1G2iO!JVQ&lO1G3XO&3qQUO'#LVO@[QVO'#EiO&4zQUO'#F]OOQQ'#Jb'#JbO&5PQUO'#FZO&5[QUO'#LVO&5dQUO,5;tO&5iQUO1G.rOOQQ1G.r1G.rOOQR1G/|1G/|O&7[Q!dO'#JQO&7aQbO,59xO&9rQ!eO'#D`O&9yQ!dO'#JSO&:OQbO,5APO&:OQbO,5APOOQR1G/c1G/cO&:ZQbO1G/cO&:`Q&lO'#GeO&;^QbO,59dOOQR1G7b1G7bO#@jQUO1G1VO&;iQUO1G1^OBXQUO1G1VO&=zQUO'#CzO#+VQbO,59dO&AmQUO1G6zOOQR-E<|-E<|O&CPQUO1G0dO#6fQUO1G0dOOQQ-E=V-E=VO#7SQUO1G0dOOQQ1G0l1G0lO&CtQUO,59jOOQQ1G3l1G3lO&D[QUO,59jO&DrQUO,59jO!MmQVO1G4gO!(}QVO'#JZO&E^QUO,5AjOOQQ1G0o1G0oO!(}QVO1G0oO!6qQUO'#JpO&EfQUO,5BOOOQQ1G3p1G3pOOQR1G1V1G1VO&IcQVO'#FOO!MmQVO,5;sOOQQ,5;s,5;sOBXQUO'#JdO&K_QUO,5ApO&KgQVO'#E[OOQR1G1^1G1^O&NUQUO'#LdOOQR1G1n1G1nOOQR-E=h-E=hOOQR1G7e1G7eO#DvQUO1G7eOGYQUO1G7eO#DvQUO1G7gOOQR1G7g1G7gO&N^QUO'#G}O&NfQUO'#L`OOQQ,5=h,5=hO&NtQUO,5=jO&NyQUO,5=kOOQR1G7h1G7hO#EtQVO1G7hO' OQUO1G7hO'!UQVO,5=kOOQR1G1U1G1UO$/UQUO'#E]O'!zQUO'#E]OOQQ'#LQ'#LQO'#eQUO'#LPO'#pQUO,5;UO'#xQUO'#ElO'$]QUO'#ElO'$pQUO'#EtOOQQ'#J]'#J]O'$uQUO,5;cO'%lQUO,5;cO'&gQUO,5;dO''mQVO,5;dOOQQ,5;d,5;dO''wQVO,5;dO''mQVO,5;dO'(OQUO,5;bO'({QUO,5;eO')WQUO'#KwO')`QUO,5:vO')eQUO,5;fOOQQ1G0n1G0nOOQQ'#J^'#J^O'(OQUO,5;bO!4{QUO'#E}OOQQ,5;b,5;bO'*`QUO'#E`O',YQUO'#E{OHuQUO1G0nO',_QUO'#EbOOQQ'#JY'#JYO'-wQUO'#KyOOQQ'#Ky'#KyO'.qQUO1G0eO'/iQUO1G3kO'0oQVO1G3kOOQQ1G3k1G3kO'0yQVO1G3kO'1QQUO'#LgO'2^QUO'#K_O'2lQUO'#K^O'2wQUO,59hO'3PQUO1G/aO'3UQUO'#FPOOQR1G1]1G1]OOQR1G2g1G2gO$?]QUO1G2gO'3`QUO1G2gO'3kQUO1G0ZOOQR'#Ja'#JaO'3pQVO1G1XO'9iQUO'#FTO'9nQUO1G1VO!6qQUO'#JeO'9|QUO,5;|O$0lQUO,5;|OOQQ'#Fc'#FcOOQQ,5;|,5;|O':[QUO1G1fOOQR1G1f1G1fO':dQUO,5<XO$/UQUO'#FWOBXQUO'#FWO':kQUO,5<XO!(}QVO,5<XO':sQUO,5<XO':xQVO1G1qO!0wQVO1G1qOOQR1G1v1G1vO'@hQUO1G1xOOQR1G1{1G1{O'@mQUO1G1|OBXQUO1G2]O'AvQVO1G1|O'D[QUO1G1|O'DaQUO'#GWO8}QUO1G2]OOQR1G2O1G2OOOQR1G2U1G2UOOQR1G2W1G2WOOQR1G2Y1G2YO$?]QUO'#JiO'DfQUO,5AxO'DnQUO1G2^O!4{QUO1G2^OOQR1G2v1G2vO'DvQUO1G2vO$?eQUO1G2`OOQQ'#Cv'#CvO'D{QUO'#G[O'EvQUO'#G[O'E{QUO'#LYO'FZQUO'#G_OOQQ'#LZ'#LZO'FiQUO1G2`O'FnQVO1G1kO'IPQVO'#GUOBXQUO'#FWOOQR'#Jf'#JfO'FnQVO1G1kO'IZQUO'#FvOOQR1G2f1G2fO'I`QUO1G2gO'IeQUO'#JhO'3`QUO1G2gO!(}QVO1G2tO'ImQUO1G2xO'JvQUO1G3QO'K|QUO1G3XOOQQ1G3o1G3oO'LbQUO1G3oOOQR1G3Z1G3ZO'LgQUO'#KaO'3UQUO'#L[OGnQUO'#L_OOQR'#Gy'#GyO#DvQUO'#LaOOQR'#HQ'#HQO'LqQUO'#GvO'$pQUO'#GuOOQR1G2{1G2{O'MnQUO1G2{O'NeQUO1G3ZO'NpQUO1G3_O'NuQUO1G3_OOQR1G3_1G3_O'N}QUO'#H]OOQR'#H]'#H]O(!WQUO'#H]O!(}QVO'#H`O!(}QVO'#H_OOQR'#Lc'#LcO(!]QUO'#LcOOQR'#Jm'#JmO(!bQVO,5=vOOQQ,5=v,5=vO(!iQUO'#H^O(!qQUO'#HZOOQQ1G3a1G3aO(!{QUO,5@|OOQQ,5@|,5@|O%)nQUO,5@|O%)sQUO,5@|O%$mQUO,5:eO(&jQUO'#KrO(&xQUO'#KrOOQQ,5:e,5:eOOQQ'#JT'#JTO('TQUO'#D}O('_QUO'#KxOGnQUO'#L_O((ZQUO'#D}OOQQ'#Hp'#HpOOQQ'#Hr'#HrOOQQ'#Hs'#HsOOQQ'#Ks'#KsOOQQ'#JV'#JVO((eQUO,5:hOOQQ,5:h,5:hO()bQUO'#L_O()oQUO'#HtO(*VQUO,5@|O(*^QUO'#H{O(*iQUO'#LfO(*qQUO,5>fO(*vQUO'#LeOOQQ1G3}1G3}O(.mQUO1G3}O(.tQUO1G3}O(.{QUO1G4TO(0RQUO1G4TO(0WQUO,5BUO!6qQUO1G4hO!(}QVO'#IiOOQQ1G4m1G4mO(0]QUO1G4mO(2`QVO1G4pPOOO-E<z-E<zPOOO1G.g1G.gPOOO1G.h1G.hP!Am{,UO1G.hP(4`QUO'#LmP(4k{7[O1G.hPO{O-E=u-E=uPOOO,5BV,5BVP(4y{,UO,5BVPOOO1G5Q1G5QO!(}QVO7+$]O(5OQUO'#CzOOQQ,59_,59_O(5ZQbO,59dO(5fQbO,59_OOQQ,59^,59^OOQQ7+)w7+)wO!MmQVO'#JvO(5qQUO,5@qOOQQ1G.p1G.pOOQQ1G2k1G2kO(5yQUO1G2kO(6OQUO7+(sOOQQ7+*X7+*XO(8dQUO7+*XO(8kQUO7+*XO(2`QVO7+*[O#NsQUO7+(sO(8xQVO'#JcO(9]QUO,5AqO(9eQUO,5;vOOQQ'#Cp'#CpOOQQ,5;w,5;wO!(}QVO'#F[OOQQ-E=`-E=`O!MmQVO,5;uOOQQ1G1`1G1`OOQQ,5?l,5?lOOQQ-E=O-E=OOOQR'#Dg'#DgOOQR'#Di'#DiOOQR'#Dl'#DlO(:nQ!eO'#KfO(:uQMkO'#KfO(:|Q!eO'#KfOOQR'#Kf'#KfOOQR'#JR'#JRO(;TQ!eO,59zOOQQ,59z,59zO(;[QbO,5?nOOQQ-E=Q-E=QO(;jQbO1G6kOOQR7+$}7+$}OOQR7+&q7+&qOOQR7+&x7+&xO'9nQUO7+&qO(;uQUO7+&OO#6fQUO7+&OO(<jQUO1G/UO(=QQUO1G/UO(=lQUO7+*ROOQQ7+*V7+*VO(?_QUO,5?uOOQQ-E=X-E=XO(@hQUO7+&ZOOQQ,5@[,5@[OOQQ-E=n-E=nO(@mQUO'#LVO@[QVO'#EiO(AyQUO1G1_OOQQ1G1_1G1_O(CSQUO,5@OOOQQ,5@O,5@OOOQQ-E=b-E=bO(ChQUO'#KwOOQR7+-P7+-PO#DvQUO7+-POOQR7+-R7+-RO(CuQUO,5=iO#ERQUO'#JlO(DWQUO,5AzOOQR1G3U1G3UOOQR1G3V1G3VO(DfQUO7+-SOOQR7+-S7+-SO(F^QUO,5:wO(G{QUO'#EwO!(}QVO,5;VO(HnQUO,5:wO(HxQUO'#EpO(IZQUO'#EzOOQQ,5;Z,5;ZO#KkQVO'#ExO(IqQUO,5:wO(IxQUO'#EyO#GuQUO'#J[O(KbQUO,5AkOOQQ1G0p1G0pO(KmQUO,5;WO!<_QUO,5;^O(LWQUO,5;_O(LfQUO,5;WO(NxQUO,5;`OOQQ-E=Z-E=ZO) QQUO1G0}OOQQ1G1O1G1OO) {QUO1G1OO)#RQVO1G1OO)#YQVO1G1OO)#dQUO1G0|OOQQ1G0|1G0|OOQQ1G1P1G1PO)$aQUO'#JqO)$kQUO,5AcOOQQ1G0b1G0bOOQQ-E=[-E=[O)$sQUO,5;iO!<_QUO,5;iO)%pQVO,5:zO)%wQUO,5;gO$ {QUO7+&YOOQQ7+&Y7+&YO!(}QVO'#EfO)&OQUO,5:|OOQQ'#Kz'#KzOOQQ-E=W-E=WOOQQ,5Ae,5AeOOQQ'#Jn'#JnO))sQUO7+&PPOQQ7+&P7+&POOQQ7+)V7+)VO)*kQUO7+)VO)+qQVO7+)VOOQQ,5>m,5>mO$)hQVO'#JuO)+xQUO,5@xOOQQ1G/S1G/SOOQQ7+${7+${O),TQUO7+(RO),YQUO7+(ROOQR7+(R7+(RO$?]QUO7+(ROOQQ7+%u7+%uOOQR-E=_-E=_O!0YQUO,5;oOOQQ,5@P,5@POOQQ-E=c-E=cO$0lQUO1G1hOOQQ1G1h1G1hOOQR7+'Q7+'QOOQR1G1s1G1sOBXQUO,5;rO),vQUO,5<YO),}QUO1G1sO).WQUO1G1sO!0wQVO7+']O).]QVO7+']O)3{QUO7+'dO)4QQVO7+'hO)6fQUO7+'wO)6pQUO7+'hO)7vQVO7+'hOKnQUO7+'wO$?OQUO,5<rOOQQ,5@T,5@TOOQQ-E=g-E=gO!4{QUO7+'xO)7}QUO7+'xOOQR7+(b7+(bO)8SQUO7+'zO)8XQUO,5<vO'D{QUO,5<vO)9PQUO,5<vO'D{QUO,5<vOOQQ,5<w,5<wO)9bQVO,5<xO'FZQUO'#JgO)9lQUO,5AtO)9tQUO,5<yOOQR7+'z7+'zO):PQVO7+'VO)6iQUO'#LUOOQR-E=d-E=dO)<bQVO,5<bOOQQ,5@S,5@SO!6qQUO,5@SOOQQ-E=f-E=fO)>yQUO7+(`O)@PQUO7+(dO)@UQVO7+(dOOQQ7+(l7+(lOOQQ7+)Z7+)ZO)@^QUO'#KqO)@hQUO'#KqOOQR,5=b,5=bO)@uQUO,5=bO!;eQUO,5=bO!;eQUO,5=bO!;eQUO,5=bOOQR7+(g7+(gOOQR7+(u7+(uOOQR7+(y7+(yOOQR,5=w,5=wO)@zQUO,5=zO)BQQUO,5=yOOQR,5A},5A}OOQR-E=k-E=kOOQQ1G3b1G3bO)CWQUO,5=xO)C]QVO'#EfOOQQ1G6h1G6hO%)nQUO1G6hO%)sQUO1G6hOOQQ1G0P1G0POOQQ-E=R-E=RO)EtQUO,5A^O(&jQUO'#JUO)FPQUO,5A^O)FPQUO,5A^O)FXQUO,5:iO8}QUO,5:iOOQQ,5>],5>]O)FcQUO,5AyO)FjQUO'#EVO)GtQUO'#EVO)H_QUO,5:iO)HiQUO'#HlO)HiQUO'#HmOOQQ'#Kv'#KvO)IWQUO'#KvO!(}QVO'#HnOOQQ,5:i,5:iO)IxQUO,5:iO!MmQVO,5:iOOQQ-E=T-E=TOOQQ1G0S1G0SOOQQ,5>`,5>`O)I}QUO1G6hO!(}QVO,5>gO)MlQUO'#JtO)MwQUO,5BQOOQQ1G4Q1G4QO)NPQUO,5BPOOQQ,5BP,5BPOOQQ7+)i7+)iO*#nQUO7+)iOOQQ7+)o7+)oO*(mQVO1G7pO**oQUO7+*SO**tQUO,5?TO*+zQUO7+*[POOO7+$S7+$SP*-mQUO'#LnP*-uQUO,5BXP!Am{,UO7+$SPOOO1G7q1G7qO*-zQUO<<GwOOQQ1G.y1G.yOOQQ'#IT'#ITO*/mQUO,5@bOOQQ,5@b,5@bOOQQ-E=t-E=tOOQQ7+(V7+(VOOQQ<<Ms<<MsO*0vQUO<<MsO*2yQUO<<MvO*4lQUO<<L_O*5QQUO,5?}OOQQ,5?},5?}OOQQ-E=a-E=aOOQQ1G1b1G1bO*6ZQUO,5;vO*7aQUO1G1aOOQQ1G1a1G1aOOQR,5AQ,5AQO*8jQ!eO,5AQO*8qQMkO,5AQO*8xQ!eO,5AQOOQR-E=P-E=POOQQ1G/f1G/fO*9PQ!eO'#DwOOQQ1G5Y1G5YOOQR<<J]<<J]O*9WQUO<<IjO*9{QUO7+$pOOQQ<<Iu<<IuO(8xQVO,5;ROOQR<=!k<=!kOOQQ1G3T1G3TOOQQ,5@W,5@WOOQQ-E=j-E=jOOQR<=!n<=!nO*:xQUO1G0cO*;PQUO'#EzO*;aQUO1G0cO*;hQUO'#JOO*=OQUO1G0qO!(}QVO1G0qOOQQ,5;[,5;[OOQQ,5;],5;]OOQQ,5?v,5?vOOQQ-E=Y-E=YO!<_QUO1G0xO*>_QUO1G0xOOQQ1G0y1G0yO*>pQUO'#ElOOQQ1G0z1G0zOOQQ7+&j7+&jO*?UQUO7+&jO*@[QVO7+&jOOQQ7+&h7+&hOOQQ,5@],5@]OOQQ-E=o-E=oO*AWQUO1G1TO*AbQUO1G1TO*A{QUO1G0fOOQQ1G0f1G0fO*CRQUO'#LSO*CZQUO1G1ROOQQ<<It<<ItOOQQ'#Hb'#HbO',_QUO,5={OOQQ'#Hd'#HdO',_QUO,5=}OOQQ-E=l-E=lPOQQ<<Ik<<IkPOQQ-E=m-E=mOOQQ<<Lq<<LqO*C`QUO'#LiO*DlQUO'#LhOOQQ,5@a,5@aOOQQ-E=s-E=sOOQR<<Km<<KmO$?]QUO<<KmO*DzQUO<<KmOOQR1G1Z1G1ZOOQQ7+'S7+'SO!MmQVO1G1tO*EPQUO1G1tOOQR7+'_7+'_OOQR<<Jw<<JwO!0wQVO<<JwOOQR<<KO<<KOO*E[QUO<<KSO*FbQVO<<KSOKnQUO<<KcO!MmQVO<<KcO*FiQUO<<KSO!0wQVO<<KSO*GrQUO<<KSO*GwQUO<<KcO*HSQUO<<KdOOQR<<Kd<<KdOOQR<<Kf<<KfO*HXQUO1G2bO)8XQUO1G2bO'D{QUO1G2bO*HjQUO1G2dO*IpQVO1G2dOOQQ1G2d1G2dO*IzQVO1G2dO*JRQUO,5@ROOQQ-E=e-E=eOOQQ1G2e1G2eO*JaQUO1G1|O*KjQVO1G1|O*KqQUO1G1|OOQQ1G5n1G5nOOQR<<Kz<<KzOOQR<<LO<<LOO*KvQVO<<LOO*LRQUO<<LOOOQR1G2|1G2|O*LWQUO1G2|O*L_QUO1G3eOOQR1G3d1G3dOOQQ7+,S7+,SO%)nQUO7+,SO*LjQUO1G6xO*LjQUO1G6xO(&jQUO,5?pO*LrQUO,5?pOOQQ-E=S-E=SO*L}QUO1G0TOOQQ1G0T1G0TO*MXQUO1G0TO!MmQVO1G0TO*M^QUO1G0TOOQQ1G3w1G3wO*MhQUO,5:qO)FjQUO,5:qO*NUQUO,5:qO)FjQUO,5:qO$$TQUO,5:uO*NsQVO,5>VO)HiQUO'#JrO*N}QUO1G0TO+ `QVO1G0TOOQQ1G3u1G3uO+ gQUO,5>WO+ rQUO,5>XO+!aQUO,5>YO+#gQUO1G0TO%)sQUO7+,SO+$mQUO1G4ROOQQ,5@`,5@`OOQQ-E=r-E=rOOQQ<<MT<<MTOOQQ<<Mn<<MnO+%vQUO1G4oP+'yQUO'#JxP+(RQUO,5BYPO{O1G7s1G7sPOOO<<Gn<<GnOOQQANC_ANC_OOQR1G6l1G6lO+(ZQ!eO,5:cOOQQ,5:c,5:cO+(bQUO1G0mO+)nQUO7+&]O+*}QUO7+&dO++`QUO,5;WOOQQ<<JU<<JUO++nQUO7+&oOOQQ7+&Q7+&QO!4{QUO'#J_O+,iQUO,5AnOOQQ7+&m7+&mOOQQ1G3g1G3gO+,qQUO1G3iOOQQ,5>n,5>nO+0fQUOANAXOOQRANAXANAXO+0kQUO7+'`OOQRAN@cAN@cO+1wQVOAN@nO+2OQUOAN@nO!0wQVOAN@nO+3XQUOAN@nO+3^QUOAN@}O+3iQUOAN@}O+4oQUOAN@}OOQRAN@nAN@nO!MmQVOAN@}OOQRANAOANAOO+4tQUO7+'|O)8XQUO7+'|OOQQ7+(O7+(OO+5VQUO7+(OO+6]QVO7+(OO+6dQVO7+'hO+6kQUOANAjOOQR7+(h7+(hOOQR7+)P7+)PO+6pQUO7+)PO+6uQUO7+)POOQQ<= n<= nO+6}QUO7+,dO+7VQUO1G5[OOQQ1G5[1G5[O+7bQUO7+%oOOQQ7+%o7+%oO+7sQUO7+%oO+ `QVO7+%oOOQQ7+)a7+)aO+7xQUO7+%oO+9OQUO7+%oO!MmQVO7+%oO+9YQUO1G0]O*MhQUO1G0]O)FjQUO1G0]OOQQ1G0a1G0aO+9wQUO1G3qO+:}QVO1G3qOOQQ1G3q1G3qO+;XQVO1G3qO+;`QUO,5@^OOQQ-E=p-E=pOOQQ1G3r1G3rO%)nQUO<= nOOQQ7+*Z7+*ZPOQQ,5@d,5@dPOQQ-E=v-E=vOOQQ1G/}1G/}OOQQ,5?y,5?yOOQQ-E=]-E=]OOQRG26sG26sO+;wQUOG26YO!0wQVOG26YO+=QQUOG26YOOQRG26YG26YO!MmQVOG26iO!0wQVOG26iO+=VQUOG26iO+>]QUOG26iO+>bQUO<<KhOOQQ<<Kj<<KjOOQRG27UG27UOOQR<<Lk<<LkO+>sQUO<<LkOOQQ7+*v7+*vOOQQ<<IZ<<IZO+>xQUO<<IZO!MmQVO<<IZO+>}QUO<<IZO+@TQUO<<IZO+ `QVO<<IZOOQQ<<L{<<L{O+@fQUO7+%wO*MhQUO7+%wOOQQ7+)]7+)]O+ATQUO7+)]O+BZQVO7+)]OOQQANEYANEYO!0wQVOLD+tOOQRLD+tLD+tO+BbQUOLD,TO+ChQUOLD,TOOQRLD,TLD,TO!0wQVOLD,TOOQRANBVANBVOOQQAN>uAN>uO+CmQUOAN>uO+DsQUOAN>uO!MmQVOAN>uO+DxQUO<<IcOOQQ<<Lw<<LwOOQR!$( `!$( `O!0wQVO!$( oOOQR!$( o!$( oOOQQG24aG24aO+EgQUOG24aO+FmQUOG24aOOQR!)9EZ!)9EZOOQQLD){LD){O+FrQUO'#CgO(gQUO'#CgO+JoQUO'#CzO+M`QUO'#CzO!FZQUO'#CzO+NXQUO'#CzO+NlQUO'#CzO,$_QUO'#CzO,$oQUO'#CzO,$}QUO'#CzO,%[QbO,59dO,%gQbO,59dO,%rQbO,59dO,%}QbO'#CxO,&`QbO'#CxO,&qQbO'#CxO,'SQUO'#CgO,)gQUO'#CgO,)tQUO'#CgO,,lQUO'#CgO,/oQUO'#CgO,0PQUO'#CgO,1uQUO'#CgO,4uQUO'#CgO,5SQUO'#CgO,5^QUO,5:xO#?yQUO,5:xO#?yQUO,5:xO#=iQUO'#LdO,5zQbO'#CxO,6VQbO'#CxO,6bQbO'#CxO,6mQbO'#CxO#7SQUO'#E^O,6xQUO'#E^O,8VQUO'#HgO,8wQbO'#CxO,9SQbO'#CxO,9_QUO'#CwO,9dQUO'#CwO,9iQUO'#CpO,9wQbO,59dO,:SQbO,59dO,:_QbO,59dO,:jQbO,59dO,:uQbO,59dO,;QQbO,59dO,;]QbO,59dO,5^QUO1G0dO,;hQUO1G0dO#?yQUO1G0dO,6xQUO1G0dO,=uQUO'#KaO,>VQUO'#CzO,>eQbO,59dO,5^QUO7+&OO,;hQUO7+&OO,>pQUO'#EwO,?cQUO'#EzO,@SQUO'#E^O,@XQUO'#GcO,@^QUO'#CwO,@cQUO'#CxO,@hQUO'#CxO,@mQUO'#GcO,@rQUO'#CwO,@wQUO'#KaO,AeQUO'#KaO,AoQUO'#CwO,AzQUO'#CwO,BVQUO'#CwO,;hQUO,5:xO,6xQUO,5:xO,6xQUO,5:xO,BbQUO'#KaO,BuQbO'#CxO,CQQUO'#CsO,CVQUO'#E^",
  stateData: ",C{~O(pOSSOSRPQVPQ'ePQ'gPQ'hPQ'iPQ'jPQ'kPQ'lPQ'mPQ(qPQ~O*cOS~OPmO]eOb!]Oe!POmTOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!O!_O!TxO!VfO!X!XO!Y!WO!i!YO!opO!r!`O!s!aO!t!aO!u!bO!v!aO!x!cO!{!dO#V#QO#a#VO#b#TO#i#OO#p!xO#t!fO#v!eO$R!gO$T!hO$Y!vO$Z!wO$`!iO$e!jO$g!kO$h!lO$k!mO$m!nO$o!oO$q!pO$s!qO$u!rO$w!sO${!tO$}!uO%U!yO%_#ZO%`#[O%a#YO%c!zO%e#UO%g!{O%l#SO%o!|O%v!}O%|#PO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(xRO)WYO)ZaO)]|O)^{O)`iO)a!ZO)cXO)ocO)pdO~OR#cOV#^O'e#_O'g#`O'h#aO'i#aO'j#bO'k#bO'l#`O'm#`O(q#]O~OX#eO(u#gO(w#eO~O]ZX]jXejXmhXqZXqjXsjXtjXujXvjXwjXxjXyjXzjX!OjX!TjX!VZX!VjX!XZX!YZX![ZX!^ZX!_ZX!aZX!bZX!eZX!fZX!gZX!hZX!rjX!sjX!tjX!ujX!vjX!xjX!{jX%vjX&rjX&sjX(xjX({ZX(|$]X(}ZX)OZX)ZZX)ZjX)[ZX)]ZX)]jX)^ZX)^jX)_ZX)`ZX)aZX)qZX~O)`jX!UZX~P(gO]$PO!V#nO!X#}O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO(}#mO)O#mO)Z#oO)[#qO)]#pO)^#rO)_#jO)`#lO)a$OO~Oe$TO%Y$UO'[$VO'_$WO)P$QO~Om$XO~O!T$YO])TXe)TXs)TXt)TXu)TXv)TXw)TXx)TXy)TXz)TX!O)TX!V)TX!r)TX!s)TX!t)TX!u)TX!v)TX!x)TX!{)TX%v)TX&r)TX&s)TX(x)TX)Z)TX)])TX)^)TX)`)TX~Om$XO~P.^Om$XO!g$[O)q$[O~OX$]O)d$]O~O!R$^O)V)XP)a)XP~OPmO]$gOb!]Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!O!_O!TxO!V$hO!X!XO!Y!WO!i!YO!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO#V#QO#a#VO#b#TO#v!eO$Y!vO$Z!wO$`!iO$e!jO$g!kO$h!lO$k!mO$m!nO$o!oO$q!pO$s!qO$u!rO$w!sO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO)WYO)Z$mO)^$mO)`iO)a!ZO)cXO)ocO)pdO~Om$aO#t$nO(xRO~P0}O](_Xb'zXe(_Xm'zXm(_Xs'zXs(_Xt'zXt(_Xu'zXu(_Xv'zXv(_Xw'zXw(_Xx'zXx(_Xy'zXy(_Xz'zXz(_X|'zX!O'zX!V(_X!o(_X!r'zX!r(_X!s'zX!s(_X!t'zX!t(_X!u'zX!u(_X!v'zX!v(_X!x'zX!x(_X!{(_X#a'zX#b'zX%e'zX%l'zX%o(_X%v(_X&m'zX&r'zX&s'zX(x'zX(x(_X)Z(_X)](_X)^(_X~Ob!TOm$qOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!O!_O!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO#a#VO#b#TO%e#UO%l#SO&m!RO&r#WO&s!TO(x$pO~Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!O!_O!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO&r#WO&s$yO])hXe)hXm)hX!V)hX!{)hX%v)hX(x)hX)Z)hX)])hX)^)hX~O)`$xO~P:qOPmO]eOe!POs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!VfO!X!XO!Y!WO!i!YO!{!dO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO)ZaO)]|O)^{O)a!ZO)cXO)ocO)pdO~Ob%SOm;UO!|%TO(x$zO~P<oO)Z%UO~Ob!]Om$aO|#RO#a#VO#b#TO%e#UO%l#SO&m!RO&r#WO&s!TO(x;XO~P<oOPmO]$gOb%SOm;UO!V$hO!W%aO!X!XO!Y!WO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)Z$mO)^%_O)a!ZO)cXO)ocO)pdO)q%^O~O]%jOe!POm%dO!V%mO!{!dO%v$oO(x;YO)Z%fO)]%kO)^%kO~O(|%oO~O)`#lO~O(x%pO](zX!V(zX!X(zX!Y(zX![(zX!^(zX!_(zX!a(zX!b(zX!e(zX!f(zX!h(zX({(zX(}(zX)O(zX)Z(zX)[(zX)](zX)^(zX)_(zX)`(zX)a(zX!g(zX)q(zX[(zX!W(zX(|(zX!U(zXQ(zX!d(zX~OP%qO(vQO~PCTO]%jOe!POs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!V%mO!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO!{!dO%o!|O%v!}O)Z;jO)]|O)^|O~Om%tO!o%yO(x$zO~PEbO!TxO#v!eO(|%{O)q&OO])lX!V)lX~O]%jOe!POm%tO!V%mO!{!dO%v!}O(x$zO)Z;jO)]|O)^|O~O!TxO#v!eO)`&RO)q&SO~O!U&VO~P!QO]&[O!TxO!V&YO)Z&XO)]&]O)^&]O~Oq&WO~PHuO]&eO!V&dO~OPmO]eOe!PO!VfO!X!XO!Y!WO!i!YO!{!dO#V#QO%_#ZO%`#[O%a#YO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO)ZaO)]|O)^{O)a!ZO)cXO)ocO)pdO~Ob%SOm;UO%v$oO(x$zO~PIjO]%jOe!POm;fO!V%mO!{!dO%v$oO(x$zO)Z;jO)]|O)^|O~Oq&hO](zX])lX!V(zX!V)lX!X(zX!Y(zX![(zX!^(zX!_(zX!a(zX!b(zX!e(zX!f(zX!h(zX({(zX(}(zX)O(zX)Z(zX)[(zX)](zX)^(zX)_(zX)`(zX)a(zX[(zX[)lX!U(zX~O!g$[O)q$[O~PL`O!g(zX)q(zX~PL`O](zX!V(zX!X(zX!Y(zX![(zX!^(zX!_(zX!a(zX!b(zX!e(zX!f(zX!h(zX({(zX(}(zX)O(zX)Z(zX)[(zX)](zX)^(zX)_(zX)`(zX)a(zX!g(zX)q(zX[(zX!U(zX~O])lX!V)lX[)lX~PNnOb&jO&m!RO]&lXe&lXm&lXs&lXt&lXu&lXv&lXw&lXx&lXy&lXz&lX!O&lX!V&lX!r&lX!s&lX!t&lX!u&lX!v&lX!x&lX!{&lX%v&lX&r&lX&s&lX(x&lX)Z&lX)]&lX)^&lX)`&lX[&lX!T&lX!X&lX!Y&lX![&lX!^&lX!_&lX!a&lX!b&lX!e&lX!f&lX!h&lX({&lX(}&lX)O&lX)[&lX)_&lX)a&lX!g&lX)q&lX!W&lXQ&lX!d&lX(|&lX!U&lX#v&lX~Oq&hOm)TX[)TXQ)TX!d)TX!h)TX)a)TX)q)TX~P.^O!g$[O)q$[O](zX!V(zX!X(zX!Y(zX![(zX!^(zX!_(zX!a(zX!b(zX!e(zX!f(zX!h(zX({(zX(}(zX)O(zX)Z(zX)[(zX)](zX)^(zX)_(zX)`(zX)a(zX[(zX!W(zX(|(zX!U(zXQ(zX!d(zX~OPmO]$gOb%SOm;UO!V$hO!X!XO!Y!WO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)Z$mO)^$mO)a!ZO)cXO)ocO)pdO~O])TXe)TXm)TXs)TXt)TXu)TXv)TXw)TXx)TXy)TXz)TX!O)TX!V)TX!r)TX!s)TX!t)TX!u)TX!v)TX!x)TX!{)TX%v)TX&r)TX&s)TX(x)TX)Z)TX)])TX)^)TX)`)TX[)TXQ)TX!d)TX!h)TX)a)TX)q)TX~O]$PO~P!*tO]&nO~O])iXb)iXe)iXm)iXs)iXt)iXu)iXv)iXw)iXx)iXy)iXz)iX|)iX!O)iX!V)iX!o)iX!r)iX!s)iX!t)iX!u)iX!v)iX!x)iX!{)iX#a)iX#b)iX%e)iX%l)iX%o)iX%v)iX&m)iX&r)iX&s)iX(x)iX)Z)iX)])iX)^)iX~O(vQO~P!-^O%U&pO~P!-^O]&qO~O]$PO~O!TxO~O$W&yO(x%pO(|&xO~O]&zOx&|O~O]&zO~OPmO]$gOb%SOm;UO!TxO!V$hO!X!XO!Y!WO!i!YO#V#QO#p!xO#v!eO$Y!vO$Z!wO$`!iO$e!jO$g!kO$h!lO$k!mO$m!nO$o!oO$q!pO$s!qO$u!rO$w!sO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x:wO)WYO)Z$mO)^$mO)`iO)a!ZO)cXO)ocO)pdO~O]'RO~O!T$YO)`'TO~P!(}O)`'VO~O)`'WO~O(x'XO~O)`'[O~P!(}Om;hO%U'aO%e'aO(x;ZO~Ob!TOm$qOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO#a#VO#b#TO%e#UO%l#SO&m!RO&r#WO&s!TO(x$pO~O(|'eO~O)`'gO~P!(}O!TxO(x%pO)q'iO~O(x%pO~O]'lO~O]'mOe%nXm%nX!V%nX!{%nX%v%nX(x%nX)Z%nX)]%nX)^%nX~O]'qO!V'rO!X'oO!g'oO%Z'oO%['oO%]'oO%^'oO%_'sO%`'sO%a'oO)O'pO)q'oO*P'tO~P8}O]%jOb!TOe!POs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!O!_O!V%mO!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO!{!dO#a#VO#b#TO%e#UO%l#SO&m!RO&r#WO&s!TO)Z;jO)]|O)^|O~Om;iOq&WO%v$oO(x;[O~P!8mO(x%pO(|'yO)`'zO~O]&eO!T'|O~Om$qO!O!_O!T(TO!l(YO(x$pO(|(SO)WYO~Om$qO|(aO!T(^O#b(aO(x$pO~Ob!TOm$qO|#RO#a#VO#b#TO%e#UO%l#SO&m!RO&r#WO&s!TO(x$pO~O](cO~OPmOb%SOm;UO!V$hO!X!XO!Y!WO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)Z$mO)^$mO)cXO)ocO)pdO~O](eO)a(fO~P!=XO]$PO~P!<_OPmO]$gOb%SOm;UO!V(lO!X!XO!Y!WO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)Z$mO)^$mO)a!ZO)cXO)ocO)pdO~O(r(mO(s(mO(t(oO~OY(pO(vQO(x%pO~O'f(pO~OS(vO(q#]O*`(uO~O]$PO(p(yO~Q'nXX#eO(u({O(w#eO~Oe)VOm)QO&r#WO(x)PO~O!Y'Sa!['Sa!^'Sa!_'Sa!a'Sa!b'Sa!e'Sa!f'Sa!h'Sa({'Sa)Z'Sa)['Sa)]'Sa)^'Sa)_'Sa)`'Sa)a'Sa!g'Sa)q'Sa['Sa!W'Sa(|'Sa!U'SaQ'Sa!d'Sa~OPmOb%SOm;UO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)cXO)ocO)pdO]'Sa!V'Sa!X'Sa(}'Sa)O'Sa~P!BmO!T$YO[(yP~P!(}O]oX]%WXeoXmnXqoXq%WXsoXtoXuoXvoXwoXxoXyoXzoX!OoX!ToX!VoX!V%WX!X%WX!Y%WX![%WX!^%WX!_%WX!a%WX!b%WX!e%WX!f%WX!gnX!h%WX!roX!soX!toX!uoX!voX!xoX!{oX%voX&roX&soX(xoX({%WX(}%WX)O%WX)ZoX)Z%WX)[%WX)]oX)]%WX)^oX)^%WX)_%WX)`%WX)a%WX)qnX[%WX~O)`oX[oX!U%WX~P!FZO])iO!V)jO!X)gO!g)gO%Z)gO%[)gO%])gO%^)gO%_)kO%`)kO%a)gO)O)hO)q)gO*P)lO~P8}OPmO]$gOb%SOm;UO!X!XO!Y!WO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)Z$mO)^$mO)a!ZO)cXO)ocO)pdO~O!V)qO~P!KVOe)tO%Y)uO)P$QO~O!T$YO!V)wO(})xO!U)yP~P!KVO!T$YO~P!(}O)b*PO~Om*QO]!QX!h!QX)V!QX)a!QX~O]*SO!h*TO)V)XX)a)XX~O)V*WO)a*XO~Oe$TO%Y*YO'[$VO'_$WO)P$QO~Om*ZO~Om*ZO[)TX~P.^Om*ZO!g$[O)q$[O~O)`*[O~P:qOPmO]$gOb!]Om$aOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!V$hO!X!XO!Y!WO!i!YO#V#QO#a#VO#b#TO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x;XO)Z$mO)^$mO)a!ZO)cXO)ocO)pdO~Oq&hO~P!&}Oq&hO!W(zX(|(zXQ(zX!d(zX~PNnO]'qO!V'rO!X'oO!g'oO%Z'oO%['oO%]'oO%^'oO%_'sO%`'sO%a'oO)O'pO)q'oO*P'tO~O]jXejXmhXqjXsjXtjXujXvjXwjXxjXyjXzjX!OjX!VjX!rjX!sjX!tjX!ujX!vjX!xjX!{jX%vjX&rjX&sjX(xjX)ZjX)]jX)^jX!TjX!hjX)ajX)qjX[jX~O!ljX(|jX)`jX!XjX!YjX![jX!^jX!_jX!ajX!bjX!ejX!fjX({jX(}jX)OjX)[jX)_jX!gjX!WjXQjX!djX!UjX#vjX#TjX#VjX#pjXbjX|jX!ojX#ajX#bjX#ijX#tjX${jX%cjX%ejX%kjX%ljX%ojX&mjX)WjX~P#&XO)P*`O~Om*aO~O])TXe)TXs)TXt)TXu)TXv)TXw)TXx)TXy)TXz)TX!O)TX!V)TX!r)TX!s)TX!t)TX!u)TX!v)TX!x)TX!{)TX%v)TX&r)TX&s)TX(x)TX)Z)TX)])TX)^)TX)`)TX!T)TX!X)TX!Y)TX![)TX!^)TX!_)TX!a)TX!b)TX!e)TX!f)TX!h)TX({)TX(})TX)O)TX)[)TX)_)TX)a)TX!g)TX)q)TX[)TX!W)TXQ)TX!d)TX(|)TX!U)TX#v)TX~Om*aO~P#+aOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!O!_O!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO])hae)ham)ha!V)ha!{)ha%v)ha(x)ha)Z)ha)])ha)^)haQ)ha!d)ha!h)ha)a)ha)q)ha[)ha!T)ha(|)ha)`)ha~O&r#WO&s$yO~P#/POq&hOm)TX~P#+aO&r)ha~P#/PO]ZXmhXqZXqjX!TjX!VZX!XZX!YZX![ZX!^ZX!_ZX!aZX!bZX!eZX!fZX!gZX!hZX({ZX(}ZX)OZX)ZZX)[ZX)]ZX)^ZX)_ZX)`ZX)aZX)qZX[ZX~O!WZX(|ZX!UZXQZX!dZX~P#1xO]$PO!V#nO!X#}O(}#mO)O#mO~O!Y&xa![&xa!^&xa!_&xa!a&xa!b&xa!e&xa!f&xa!g&xa!h&xa({&xa)Z&xa)[&xa)]&xa)^&xa)_&xa)`&xa)a&xa)q&xa[&xa!W&xa(|&xa!U&xaQ&xa!d&xa~P#4YOm;rO!T$YO~Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O~PKnOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!|%TO~PKnO]&eO!V&dO[#Qa!T#Qa!h#Qa#v#Qa)`#Qa)q#QaQ#Qa!d#Qa(|#Qa~Oq&hO!T$YO~O[*hO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[*hO~O[*jO]&eO!V&dO~O]&[Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!V&YO&r#WO&s$yO)Z&XO)]&]O)^&]O~O[rXQrX!drX!hrX)arX)`rX~P#:ZO[*mO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h*nO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!W)rX~P#4YO!W*pO!h*qO~O!W*pO!h*qO~P!(}O!W*pO~Oq&hO!g$[O!h*rO)q$[O](zX!V(zX!W(zX!W*WX!X(zX!Y(zX![(zX!^(zX!_(zX!a(zX!b(zX!e(zX!f(zX({(zX(}(zX)O(zX)Z(zX)[(zX)](zX)^(zX)_(zX)a(zX~O!h(zX~P#=iO!W*tO~Oe$TO%Y*YO)P:|O~Om;uO~Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!|%TO~PBXO]*{O!T*vO!V&dO!h*yO#v!eO)q*wO)`)xX~O!h*yO)`)xX~O)`*|O~Oq&hO])lX!T)lX!V)lX!h)lX#v)lX)`)lX)q)lX[)lXQ)lX!d)lX(|)lX~Oq&hO~OP%qO(vQO]%ha!V%ha!X%ha!Y%ha![%ha!^%ha!_%ha!a%ha!b%ha!e%ha!f%ha!h%ha(x%ha({%ha(}%ha)O%ha)Z%ha)[%ha)]%ha)^%ha)_%ha)`%ha)a%ha!g%ha)q%ha[%ha!W%ha(|%ha!U%haQ%ha!d%ha~Oe$TO%Y$UO)P:yO~Om;RO~O!TxO#v!eO)q&OO~Om<fO&r#WO(x;qO~O$Z+YO%`+ZO~O!TxO#v!eO)`+[O)q+]O~OPmO]$gOb%SOm;UO!V$hO!X!XO!Y!WO!i!YO#V#QO$Z+YO%_#ZO%`+_O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)Z$mO)^$mO)a!ZO)cXO)ocO)pdO~O!U+`O~P!QOb!TOm$qOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!O!_O!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO#a+fO#b+gO#i+hO%e#UO%l#SO&m!RO&r#WO&s!TO(x$pO)WYO~OQ)sP!d)sP~P#GuO]&[Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!V&YO)Z&XO)]&]O)^&]O~O[#kX!T#kX#v#kX)`#kX)q#kXQ#kX!d#kX!h#kX)a#kX!x#kX(|#kX~P#IyOPmO]$gOb%SOm;UOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!V$hO!W+nO!X!XO!Y!WO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)Z+oO)^$mO)a!ZO)cXO)ocO)pdO~O]&eO!V+pO~O]&[O!V&YO)WYO)Z&XO)]&]O)^&]O)a+sO[)kP~P8}O]&[O!V&YO)Z&XO)]&]O)^&]O~O[#nX!T#nX#v#nX)`#nX)q#nXQ#nX!d#nX!h#nX)a#nX!x#nX(|#nX~P#NsO!TxO])uX!V)uX~Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O#T+{O#p+|O)O+yO)]+wO)^+wO~O]#jX!T#jX!V#jX[#jX#v#jX)`#jX)q#jXQ#jX!d#jX!h#jX)a#jX!x#jX(|#jX~P$!WO#V,OO~Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!l,PO#T+{O#V,OO#p+|O)O+yO)],PO)^,PO])mP!T)mP!V)mP#v)mP(|)mP)q)mP[)mP!h)mP)`)mP~O!x)mPQ)mP!d)mP~P$$TOPmO]$gOb%SOm;UOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!V$hO!X!XO!Y!WO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)^$mO)a!ZO)cXO)ocO)pdO~O!W,VO)Z,WO~P$&OO)WYO)a+sO[)kP~P8}O]&eO!V&dO[&Za!T&Za!h&Za#v&Za)`&Za)q&ZaQ&Za!d&Za(|&Za~OPmO]$gOb!]Om;WOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!V$hO!X!XO!Y!WO!i!YO#V#QO#a#VO#b#TO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x;]O)Z$mO)^$mO)a!ZO)cXO)ocO)pdO~OQ)QP!d)QP~P$)hO]$PO!V#nO(}#mO)O#mO!X'Pa!Y'Pa!['Pa!^'Pa!_'Pa!a'Pa!b'Pa!e'Pa!f'Pa!h'Pa({'Pa)Z'Pa)['Pa)]'Pa)^'Pa)_'Pa)`'Pa)a'Pa!g'Pa)q'Pa['Pa!W'Pa(|'Pa!U'PaQ'Pa!d'Pa~O]$PO!V#nO!X#}O(}#mO)O#mO~P!BmO!TxO#t!fO)WYO~P8}O!TxO(x%pO)q,aO~O#x,fO~OQ)hX!d)hX!h)hX)a)hX)q)hX[)hX!T)hX(|)hX)`)hX~P:qO(|,jO(},hO)W$UX)`$UX~O(x,kO~O)WYO)`,nO~OPmO]$gOb!]Om;VOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!O!_O!V$hO!X!XO!Y!WO!i!YO!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO#V#QO#a#VO#b#TO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO)WYO)Z$mO)^$mO)`iO)a!ZO)cXO)ocO)pdO~O(x;^O~P$0yOPmO]$gOb%SOm;UO!TxO!V$hO!X!XO!Y!WO!i!YO#V#QO#v!eO$Y!vO$Z!wO$`!iO$e!jO$g!kO$h!lO$k!mO$m!nO$o!oO$q!pO$s!qO$u!rO$w!sO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x:wO)WYO)Z$mO)^$mO)`iO)a!ZO)cXO)ocO)pdO~O$h,xO~OPmO]$gOb!]Om;VOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!O!_O!V$hO!X!XO!Y!WO!i!YO!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO#V#QO#a#VO#b#TO$}!uO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO)WYO)Z$mO)^$mO)a!ZO)cXO)ocO)pdO~O${-OO(x;XO)`,|O~P$7dO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`-QO)a$OO~P#4YO)`-QO~O)`-RO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`-SO)a$OO~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`-TO)a$OO~P#4YO!h-UO)`*QX~Oq&hO)WYO)q-XO~O)`-YO~Om;hO(x;ZO~O]-aO!{!dO&r#WO&s$yO(x-]O)Z-^O~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO(|-dO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!TxO$`!iO$e!jO$g!kO$h!lO$k-iO$m!nO$o!oO$q!pO$s!qO$u!rO$w!sO$}!uO(x:xOe$Xa!o$Xa!{$Xa#i$Xa#p$Xa#t$Xa#v$Xa$R$Xa$T$Xa$Y$Xa$Z$Xa${$Xa%U$Xa%c$Xa%g$Xa%o$Xa%|$Xa(m$Xa)]$Xa!U$Xa$c$Xa~P$0yO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`-jO)a$OO~P#4YOm-lO!TxO)q,aO~O)q-nO~O]&]a!X&]a!Y&]a![&]a!^&]a!_&]a!a&]a!b&]a!e&]a!f&]a!h&]a({&]a(}&]a)O&]a)[&]a)]&]a)^&]a)_&]a)`&]a)a&]a!g&]a)q&]a[&]a!W&]a!T&]a#v&]a(|&]a!U&]aQ&]a!d&]a~O)Z-rO!V&]a~P$DxO[-rO~O!W-rO~O!V-sO)Z&]a~P$DxO])TXe)TXs)TXt)TXu)TXv)TXw)TXx)TXy)TXz)TX!O)TX!V)TX!r)TX!s)TX!t)TX!u)TX!v)TX!x)TX!{)TX%v)TX&r)TX&s)TX(x)TX)Z)TX)])TX)^)TX~Om;xO~P$GhO]&eO!V&dO)`-tO~Om;mO!o-wO#V,OO#i-|O#t!fO${-OO%c!zO%k-{O%o!|O%v!}O(x;aO)WYO~P!8mO!n.QO(x,kO~O)WYO)`.SO~OPmO]$gOb%SOm;UO!T.XO!V$hO!X!XO!Y!WO!i!YO#V.`O#a._O%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)O.WO)Z$mO)^$mO)`.UO)a!ZO)cXO)ocO)pdO~O!U.^O~P$JxO])eXe)eXs)eXt)eXu)eXv)eXw)eXx)eXy)eXz)eX!O)eX!T)eX!V)eX!l)eX!r)eX!s)eX!t)eX!u)eX!v)eX!x)eX!{)eX%v)eX&r)eX&s)eX(x)eX(|)eX)Z)eX)])eX)^)eX)`)eX[)eX!h)eX)a)eX!X)eX!Y)eX![)eX!^)eX!_)eX!a)eX!b)eX!e)eX!f)eX({)eX(})eX)O)eX)[)eX)_)eX!g)eX)q)eX!W)eXQ)eX!d)eX#T)eX#V)eX#p)eX#v)eXb)eX|)eX!o)eX#a)eX#b)eX#i)eX#t)eX${)eX%c)eX%e)eX%k)eX%l)eX%o)eX&m)eX)W)eX!U)eX~Om*aO~P$MSOm$qO!T(TO!l.eO(x$pO(|(SO)WYO~Oq&hOm)eX~P$MSOm$qO!n.jO!o.jO(x$pO)WYO~Om;nO!U.uO!n.wO!o.vO#i-|O${!tO$}!uO%g!{O%k-{O%o!|O%v!}O(x;`O)WYO~P!8mO!T(TO!l.eO(|(SO])UXe)UXm)UXs)UXt)UXu)UXv)UXw)UXx)UXy)UXz)UX!O)UX!V)UX!r)UX!s)UX!t)UX!u)UX!v)UX!x)UX!{)UX%v)UX&r)UX&s)UX(x)UX)Z)UX)])UX)^)UX~O)`)UX[)UX!X)UX!Y)UX![)UX!^)UX!_)UX!a)UX!b)UX!e)UX!f)UX!h)UX({)UX(})UX)O)UX)[)UX)_)UX)a)UX!g)UX)q)UX!W)UXQ)UX!d)UX!U)UX#v)UX~P%%{O!T(TO~O!T(TO(|(SO~O(x%pO!U*YP~O!T(^O(|.|O]&kae&kam&kas&kat&kau&kav&kaw&kax&kay&kaz&ka!O&ka!V&ka!r&ka!s&ka!t&ka!u&ka!v&ka!x&ka!{&ka%v&ka&r&ka&s&ka(x&ka)Z&ka)]&ka)^&ka)`&ka[&ka!X&ka!Y&ka![&ka!^&ka!_&ka!a&ka!b&ka!e&ka!f&ka!h&ka({&ka(}&ka)O&ka)[&ka)_&ka)a&ka!g&ka)q&ka!W&kaQ&ka!d&ka!U&ka#v&ka~Om$qO!T(^O(x$pO~O&r#WO&s$yO]&pae&pam&pas&pat&pau&pav&paw&pax&pay&paz&pa!O&pa!V&pa!r&pa!s&pa!t&pa!u&pa!v&pa!x&pa!{&pa%v&pa(x&pa)Z&pa)]&pa)^&pa)`&pa[&pa!T&pa!X&pa!Y&pa![&pa!^&pa!_&pa!a&pa!b&pa!e&pa!f&pa!h&pa({&pa(}&pa)O&pa)[&pa)_&pa)a&pa!g&pa)q&pa!W&paQ&pa!d&pa(|&pa!U&pa#v&pa~O&s/RO~P!(}O!Y#sO![#tO!f#|O)Z#oO!^'Ua!_'Ua!a'Ua!b'Ua!e'Ua!h'Ua({'Ua)['Ua)]'Ua)^'Ua)_'Ua)`'Ua)a'Ua!g'Ua)q'Ua['Ua!W'Ua(|'Ua!U'UaQ'Ua!d'Ua~P#4YO!V'dX!X'dX!Y'dX!['dX!^'dX!_'dX!a'dX!b'dX!e'dX!f'dX!h'dX({'dX(}'dX)O'dX)Z'dX)['dX)]'dX)^'dX)_'dX)a'dX['dX~O]/TO)`'dX!g'dX)q'dX!W'dX(|'dX!U'dXQ'dX!d'dX~P%3`O!Y#sO![#tO!f#|O)Z#oO!^'Wa!_'Wa!a'Wa!b'Wa!e'Wa!h'Wa({'Wa)['Wa)]'Wa)^'Wa)_'Wa)`'Wa)a'Wa!g'Wa)q'Wa['Wa!W'Wa(|'Wa!U'WaQ'Wa!d'Wa~P#4YO]$PO!T$YO!V/UO&r#WO&s$yO~O!X'Za!Y'Za!['Za!^'Za!_'Za!a'Za!b'Za!e'Za!f'Za!h'Za({'Za(}'Za)O'Za)Z'Za)['Za)]'Za)^'Za)_'Za)`'Za)a'Za!g'Za)q'Za['Za!W'Za(|'Za!U'ZaQ'Za!d'Za~P%7VO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!h'^a)`'^a!g'^a)q'^a['^a!W'^a(|'^a!U'^aQ'^a!d'^a~P#4YOPmO]$gOb%SOm;UO!V$hO!X!XO!Y!WO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)Z$mO)^%_O)a!ZO)cXO)ocO)pdO)q%^O~O!W/XO~P%;VO(r(mO(s(mO(t/ZO~OS(vO]$PO(q#]O*`(uO~OS(vO]/^O'f/]O(q#]O*`(uO~OS/bO(q#]O*`/aO~O]$PO~Q'na!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO(|/dO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO)`#Zi[#Zi~P#4YO]dXmhXqdXqjX!VdX!XdX!YdX![dX!^dX!_dX!adX!bdX!edX!fdX!gdX!hdX({dX(}dX)OdX)ZdX)[dX)]dX)^dX)_dX)`dX)adX)qdX[dX!WdX(|dX!TdX#vdX!UdXQdX!ddX~Oe/fO%Y*YO)P/eO~Om/gO~Om/hO~Oq&hO]ci!Vci!Xci!Yci![ci!^ci!_ci!aci!bci!eci!fci!gci!hci({ci(}ci)Oci)Zci)[ci)]ci)^ci)_ci)`ci)aci)qci[ci!Wci(|ci!UciQci!dci~O!W/jO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO![#tO)Z#oO!Y&zi!^&zi!_&zi!a&zi!b&zi!e&zi!f&zi!h&zi({&zi)[&zi)]&zi)^&zi)_&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y&zi![&zi!^&zi!_&zi!a&zi!b&zi!e&zi!f&zi!h&zi({&zi)Z&zi)[&zi)]&zi)^&zi)_&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O)Z#oO)^#rO)_#jO!h&zi({&zi)[&zi)]&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O)Z#oO)]#pO)^#rO)_#jO!h&zi({&zi)[&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO!_#xO!a#zO!b#{O!e#{O!f#|O)Z#oO)^#rO)_#jO!^&zi!h&zi({&zi)[&zi)]&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO!a#zO!b#{O!e#{O!f#|O)Z#oO)^#rO)_#jO!^&zi!_&zi!h&zi({&zi)[&zi)]&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO!a#zO!b#{O!e#{O!f#|O)Z#oO)_#jO!^&zi!_&zi!h&zi({&zi)[&zi)]&zi)^&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO!b#{O!e#{O!f#|O)Z#oO)_#jO!^&zi!_&zi!a&zi!h&zi({&zi)[&zi)]&zi)^&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO!f#|O)Z#oO!^&zi!_&zi!a&zi!b&zi!e&zi!h&zi({&zi)[&zi)]&zi)^&zi)_&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO)Z#oO!^&zi!_&zi!a&zi!b&zi!e&zi!f&zi!h&zi({&zi)[&zi)]&zi)^&zi)_&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O)Z#oO)[#qO)]#pO)^#rO)_#jO!h&zi({&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h/kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO[(yX~P#4YO!h/kO[(yX~O[/mO~O]%Xaq%Xa!X%Xa!Y%Xa![%Xa!^%Xa!_%Xa!a%Xa!b%Xa!e%Xa!f%Xa!h%Xa({%Xa(}%Xa)O%Xa)[%Xa)]%Xa)^%Xa)_%Xa)`%Xa)a%Xa!g%Xa)q%Xa[%Xa!W%Xa!T%Xa#v%Xa(|%Xa!U%XaQ%Xa!d%Xa~O)Z/nO!V%Xa~P&-YO[/nO~O!W/nO~O!V/oO)Z%Xa~P&-YO!X'Zi!Y'Zi!['Zi!^'Zi!_'Zi!a'Zi!b'Zi!e'Zi!f'Zi!h'Zi({'Zi(}'Zi)O'Zi)Z'Zi)['Zi)]'Zi)^'Zi)_'Zi)`'Zi)a'Zi!g'Zi)q'Zi['Zi!W'Zi(|'Zi!U'ZiQ'Zi!d'Zi~P%7VO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!h'^i)`'^i!g'^i)q'^i['^i!W'^i(|'^i!U'^iQ'^i!d'^i~P#4YO!W/tO~P%;VO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h/vO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!U)yX~P#4YO(x/yO~O!V/{O(})xO)q/}O~O!h/vO!U)yX~O!U0OO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!h`i({`i)``i!g`i)q`i[`i!W`i(|`i!U`iQ`i!d`i~P#4YO!R0PO~Om*QO]!Qa!h!Qa)V!Qa)a!Qa~OP0XO]0WOm0XO!R0XO!T0UO!V0VO!X0XO!Y0XO![0XO!^0XO!_0XO!a0XO!b0XO!e0XO!f0XO!g0XO!h0XO!i0XO(vQO(|0XO(}0XO)O0XO)Z0RO)[0SO)]0SO)^0TO)_#jO)`0XO)a0XO)cXO~O[0[O~P&7rO!R$^O~O!h*TO)V)Xa)a)Xa~O)V0`O~O])iO!V)jO!X)gO!g)gO%Z)gO%[)gO%])gO%^)gO%_)kO%`)kO%a)gO)O)hO)q)gO*P)lO~Oe)tO%Y*YO)P$QO~O)`0bO~O]oXeoXmnXqoXsoXtoXuoXvoXwoXxoXyoXzoX!OoX!VoX!roX!soX!toX!uoX!voX!xoX!{oX%voX&roX&soX(xoX)ZoX)]oX)^oX!ToX!hoX)aoX[oXQoX!doX~O!loX(|oX)`oX!XoX!YoX![oX!^oX!_oX!aoX!boX!eoX!foX({oX(}oX)OoX)[oX)_oX!goX)qoX!WoX!UoX#voX#ToX#VoX#poXboX|oX!ooX#aoX#boX#ioX#toX${oX%coX%eoX%koX%loX%ooX&moX)WoX~P&;nOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!O!_O!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO~O])hie)him)hi!V)hi!{)hi%v)hi(x)hi)Z)hi)])hi)^)hiQ)hi!d)hi!h)hi)a)hi)q)hi[)hi!T)hi&r)hi(|)hi)`)hi~P&@lO]&eO!V&dO[#Qi!T#Qi!h#Qi#v#Qi)`#Qi)q#QiQ#Qi!d#Qi(|#Qi~O[raQra!dra!hra)ara)`ra~P#:ZO[raQra!dra!hra)ara)`ra~P#IyO]&eO!V+pO[raQra!dra!hra)ara)`ra~O!h*nO!W)ra~O!h*rO!W*Wa~OPmOb!]Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!O!_O!X!XO!Y!WO!i!YO!s!aO!t!aO!v!aO!x!cO#V#QO#a#VO#b#TO#v!eO$Y!vO$Z!wO$`!iO$e!jO$g!kO$h!lO$k!mO$m!nO$o!oO$q!pO$s!qO$u!rO$w!sO%_#ZO%`#[O%a#YO%e#UO%l#SO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO)WYO)`iO)a!ZO)cXO)ocO)pdO~O]eOe!POmTO!T*vO!U&VO!V0pO!opO!r!`O!u!bO!{!dO#i#OO#p!xO#t!fO$R!gO$T!hO${!tO$}!uO%U!yO%c!zO%g!{O%o!|O%v!}O%|#PO(xRO(})xO)ZaO)]|O)^{O~P&EnO!h*yO)`)xa~OPmO]$gOb!]Om;WO|#RO!T$YO!V$hO!X!XO!Y!WO!i!YO#V#QO#a#VO#b#TO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x;_O)WYO)Z$mO)^$mO)a0vO)cXO)ocO)pdO[(yP[)kP~P&@lO!h*rO!W*WX~O]$PO!T$YO~O!h0{O!T*SX#v*SX)q*SX~O)`0}O~O)`1OO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`1QO)a$OO~P#4YO)`1OO~P!?ZO]1[Oe!POm%dO!V1YO!{!dO%v$oO(x$zO)Z1SO)a1VO~O)]1WO)^1WO)q1TOQ#PX!d#PX!h#PX[#PX~P'!]O!h1]OQ)sX!d)sX~OQ1_O!d1_O~O)a1bO)q1aOQ#`X!d#`X!h#`X~P!<_O)a1bO)q1aOQ#`X!d#`X!h#`X~P!;eOq&WO~O[#ka!T#ka#v#ka)`#ka)q#kaQ#ka!d#ka!h#ka)a#ka!x#ka(|#ka~P#IyO]&eO!V+pO[#ka!T#ka#v#ka)`#ka)q#kaQ#ka!d#ka!h#ka)a#ka!x#ka(|#ka~O!W1gO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!W1gO)Z1iO~P$&OO!W1gO~P!(}O]#ja!T#ja!V#ja[#ja#v#ja)`#ja)q#jaQ#ja!d#ja!h#ja)a#ja!x#ja(|#ja~P$!WO[1mO]&eO!V+pO~O!h1nO[)kX~O[1pO~O]&eO!V+pO[#na!T#na#v#na)`#na)q#naQ#na!d#na!h#na)a#na!x#na(|#na~O]1tOs#SXt#SXu#SXv#SXw#SXx#SXy#SXz#SX!T#SX!V#SX#T#SX#p#SX)O#SX)]#SX)^#SX!l#SX!x#SX#V#SX#v#SX(|#SX)q#SX[#SX!h#SX)`#SXQ#SX!d#SX)a#SX~O]1uO~O]1xOm$qO!V$hO#V#QO(x$pO)ocO)pdO~Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!l,PO#T+{O#V,OO#p+|O)O+yO)],PO)^,PO~O])mX!T)mX!V)mX!x)mX#v)mX(|)mX)q)mX[)mX!h)mX)`)mXQ)mX!d)mX~P',vO!x!cO]#Ri!T#Ri!V#Ri#v#Ri(|#Ri)q#Ri[#Ri!h#Ri)`#RiQ#Ri!d#Ri~O!W2QO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!W2QO)Z2SO~P$&OO!W2QO~P!(}O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OOQ*ZX!d*ZX!h*ZX~P#4YO)a2TOQ)RX!d)RX!h)RX~O!h2UOQ)QX!d)QX~OQ2WO!d2WO~O[2XO~O#t$nO)WYO~P8}Om-lO!TxO)q2]O~O[2^O~O#x,fOP#ui]#uib#uie#uim#uis#uit#uiu#uiv#uiw#uix#uiy#uiz#ui|#ui!O#ui!T#ui!V#ui!X#ui!Y#ui!i#ui!o#ui!r#ui!s#ui!t#ui!u#ui!v#ui!x#ui!{#ui#V#ui#a#ui#b#ui#i#ui#p#ui#t#ui#v#ui$R#ui$T#ui$Y#ui$Z#ui$`#ui$e#ui$g#ui$h#ui$k#ui$m#ui$o#ui$q#ui$s#ui$u#ui$w#ui${#ui$}#ui%U#ui%_#ui%`#ui%a#ui%c#ui%e#ui%g#ui%l#ui%o#ui%v#ui%|#ui&m#ui&r#ui&s#ui'Q#ui'R#ui'V#ui'Y#ui'a#ui'b#ui(m#ui(v#ui(x#ui)W#ui)Z#ui)]#ui)^#ui)`#ui)a#ui)c#ui)o#ui)p#ui!U#ui$c#ui!n#ui%k#ui~O]&eO~O]&eO!TxO!V&dO#v!eO~O(|2cO(},hO)W$Ua)`$Ua~O)WYO)`2eO~O[2fO~P,`O[2fO)`#lO~O[2fO~O$c2kOP$_i]$_ib$_ie$_im$_is$_it$_iu$_iv$_iw$_ix$_iy$_iz$_i|$_i!O$_i!T$_i!V$_i!X$_i!Y$_i!i$_i!o$_i!r$_i!s$_i!t$_i!u$_i!v$_i!x$_i!{$_i#V$_i#a$_i#b$_i#i$_i#p$_i#t$_i#v$_i$R$_i$T$_i$Y$_i$Z$_i$`$_i$e$_i$g$_i$h$_i$k$_i$m$_i$o$_i$q$_i$s$_i$u$_i$w$_i${$_i$}$_i%U$_i%_$_i%`$_i%a$_i%c$_i%e$_i%g$_i%l$_i%o$_i%v$_i%|$_i&m$_i&r$_i&s$_i'Q$_i'R$_i'V$_i'Y$_i'a$_i'b$_i(m$_i(v$_i(x$_i)W$_i)Z$_i)]$_i)^$_i)`$_i)a$_i)c$_i)o$_i)p$_i!U$_i~O]1xO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`2nO)a$OO~P#4YOPmO]$gOb!]Om;VO|#RO!V$hO!X!XO!Y!WO!i!YO#V#QO#a#VO#b#TO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x;XO)Z$mO)^$mO)`2qO)a!ZO)cXO)ocO)pdO~P&@lO)`2nO~O(x-]O~O!h-UO)`*Qa~O)WYO)q2vO~O)`2xO~O]-aOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!{!dO!|%TO(x-]O)Z-^O~O)Z2}O~O]&eO!V3PO!h3QO)`)|X~O]-aO!{!dO(x-]O)Z-^O~O)`3TO~O!TxO$`!iO$e!jO$g!kO$h!lO$k-iO$m!nO$o!oO$q!pO$s!qO$u!rO$w!sO$}!uO(x:xOe$Xi!o$Xi!{$Xi#i$Xi#p$Xi#t$Xi#v$Xi$R$Xi$T$Xi$Y$Xi$Z$Xi${$Xi%U$Xi%c$Xi%g$Xi%o$Xi%|$Xi(m$Xi)]$Xi!U$Xi$c$Xi~P$0yOm;VO(x:xO~P0}O]3XO~O)`2[O~O!u3ZO(x%pO~O[3^O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h3_O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[3`O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO]&eO!V+pO!T%ui#v%ui)`%ui)q%ui~O!W3aO~Om;TO)`)TX~P$GhOb!TOm$qO|3gO#a#VO#b3fO#t!fO%e#UO%l3hO&m!RO&r#WO&s!TO(x$pO)WYO~P&@lOm;mO!o-wO#i-|O#t!fO${-OO%c!zO%k-{O%o!|O%v!}O(x;aO)WYO~P!8mO]&eO!V&dO)`3jO~O)`3kO~O)WYO)`3kO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`3lO)a$OO~P#4YO)`3lO~O)`3oO~O!U3qO~P$JxOm$qO(x$pO~O]3sO!T'|O~P',bO!T(TO!l3vO(|(SO])Uae)Uam)Uas)Uat)Uau)Uav)Uaw)Uax)Uay)Uaz)Ua!O)Ua!V)Ua!r)Ua!s)Ua!t)Ua!u)Ua!v)Ua!x)Ua!{)Ua%v)Ua&r)Ua&s)Ua(x)Ua)Z)Ua)])Ua)^)Ua)`)Ua[)Ua!X)Ua!Y)Ua![)Ua!^)Ua!_)Ua!a)Ua!b)Ua!e)Ua!f)Ua!h)Ua({)Ua(})Ua)O)Ua)[)Ua)_)Ua)a)Ua!g)Ua)q)Ua!W)UaQ)Ua!d)Ua!U)Ua#v)Ua~Om$qO!n.jO!o.jO(x$pO~O!h3zO)a3|O!T)fX~O!o4OO)WYO~P8}O)`4PO~PGYO]4UOm)QO!T$YO!{!dO%v$oO&r#WO(x)PO(|4YO)Z4RO)]4VO)^4VO~O)`4ZO)q4]O~P('fOm;nO!U4_O!n.wO!o.vO#i-|O${!tO$}!uO%g!{O%k-{O%o!|O%v!}O(x;`O)WYO~P!8mOm;nO%v!}O(x;`O~P!8mO(|4`O~Om$qO!T(TO(x$pO(|(SO)WYO~O!l3vO~P()tO)q4bO!U&oX!h&oX~O!h4cO!U*YX~O!U4eO~Ob4gOm$qO&m!RO(x$pO~O!T(^O]&kie&kim&kis&kit&kiu&kiv&kiw&kix&kiy&kiz&ki!O&ki!V&ki!r&ki!s&ki!t&ki!u&ki!v&ki!x&ki!{&ki%v&ki&r&ki&s&ki(x&ki)Z&ki)]&ki)^&ki)`&ki[&ki!X&ki!Y&ki![&ki!^&ki!_&ki!a&ki!b&ki!e&ki!f&ki!h&ki({&ki(}&ki)O&ki)[&ki)_&ki)a&ki!g&ki)q&ki!W&kiQ&ki!d&ki!U&ki#v&ki~O(|&ki~P(+UO(|.|O~P(+UO[4jO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[4jO~O[4kO~O]$PO!T$YO!V'Zi!X'Zi!Y'Zi!['Zi!^'Zi!_'Zi!a'Zi!b'Zi!e'Zi!f'Zi!h'Zi({'Zi(}'Zi)O'Zi)Z'Zi)['Zi)]'Zi)^'Zi)_'Zi)`'Zi)a'Zi!g'Zi)q'Zi['Zi!W'Zi(|'Zi!U'ZiQ'Zi!d'Zi~OPmOb%SOm;UO!X!XO!Y!WO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)a!ZO)cXO)ocO)pdO]#]aq#]a!T#]a!V#]a)Z#]a)]#]a)^#]a~O(x%pO)a4pO[*bP~OS(vO'f4rO(q#]O*`(uO~O*`4sO~OmnXqoXq&wX~Oe4uO%Y*YO)P/eO~Oe4uO%Y*YO)P4vO~O!h/kO[(ya~O!W4zO~O]&eO!V+pO!T%uq#v%uq)`%uq)q%uq~O]$PO!T$YO!X'Zq!Y'Zq!['Zq!^'Zq!_'Zq!a'Zq!b'Zq!e'Zq!f'Zq!h'Zq({'Zq(}'Zq)O'Zq)Z'Zq)['Zq)]'Zq)^'Zq)_'Zq)`'Zq)a'Zq!g'Zq)q'Zq['Zq!W'Zq(|'Zq!U'ZqQ'Zq!d'Zq~O!V'Zq~P(6dO!V/UO&r#WO&s$yO~P(6dO!T$YO!V)wO(})xO!U(VX!h(VX~P!KVO!h/vO!U)ya~O!W5SO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h*nO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!U5WO~P&7rO!W5WO~P&7rO[5WO~P&7rO[5]O~P&7rO]5^O!h'va)V'va)a'va~O!h*TO)V)Xi)a)Xi~O]&eO!V&dO[#Qq!T#Qq!h#Qq#v#Qq)`#Qq)q#QqQ#Qq!d#Qq(|#Qq~O[riQri!dri!hri)ari)`ri~P#IyO]&eO!V+pO[riQri!dri!hri)ari)`ri~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!h'Tq)`'Tq!g'Tq)q'Tq['Tq!W'Tq(|'Tq!U'TqQ'Tq!d'Tq~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!W'}a!h'}a~P#4YO!W5cO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h5dO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`#lO)a$OO!U)yX~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!h#{i)`#{i~P#4YO]*{O!T$YO!V&dO)q*wO!h(Wa)`(Wa~O!h1nO[)kX]'dX~P%3`O)a5fO!T%qa!h%qa#v%qa)q%qa~O!h0{O!T*Sa#v*Sa)q*Sa~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`5iO)a$OO~P#4YO]1[Oe!POm;fO!V1YO!{!dO%v$oO(x$zO)Z<SO)]5kO)^5kO~OQ#Pa!d#Pa!h#Pa[#Pa~P(ElO]1[Oe!POs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!V1YO!{!dO!|%TO%v$oO(x$zOQ#kX!d#kX!h#kX[#kX~Om%dO)Z1SO)]<TO)^<TO~P(FnO]&eOQ#Pa!d#Pa!h#Pa[#Pa~O!V&dO)q5oO~P(H]O(x%pOQ#dX!d#dX!h#dX[#dX~O)]<TO)^<TOQ#nX!d#nX!h#nX[#nX~P'!]O!V+pO~P(H]O]1[Ob!TOe!POm;gO|#RO!V1YO!{!dO#a#VO#b#TO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO(x;[O)WYO)Z<SO)]5kO)^5kO)a+sO[)kP~P&@lO!h1]OQ)sa!d)sa~Oq&hO)q5tOQ#`am)TX!d#`a!h#`a)a)TX~P$GhO(x-]OQ#ga!d#ga!h#ga~Oq&hO)q5tOQ#`a])eXe)eXm)eXs)eXt)eXu)eXv)eXw)eXx)eXy)eXz)eX!O)eX!T)eX!V)eX!d#`a!h#`a!l)eX!r)eX!s)eX!t)eX!u)eX!v)eX!x)eX!{)eX%v)eX&r)eX&s)eX(x)eX(|)eX)Z)eX)])eX)^)eX)a)eX~O#a5wO#b5wO~O]&eO!V+pO[#ki!T#ki#v#ki)`#ki)q#kiQ#ki!d#ki!h#ki)a#ki!x#ki(|#ki~O!W5yO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!W5yO~P!(}O!W5yO)Z5{O~P$&OO]#ji!T#ji!V#ji[#ji#v#ji)`#ji)q#jiQ#ji!d#ji!h#ji)a#ji!x#ji(|#ji~P$!WO)WYO)a5}O~P8}O!h1nO[)ka~O&r#WO&s$yO!T#qa!x#qa#v#qa(|#qa)q#qa[#qa!h#qa)`#qaQ#qa!d#qa)a#qa~P#NsO[6SO~P!(}O[)vP~P!4{O)[6YO)]6WO]#Ua!T#Ua!V#Ua)Z#Ua)^#Uas#Uat#Uau#Uav#Uaw#Uax#Uay#Uaz#Ua!l#Ua!x#Ua#T#Ua#V#Ua#p#Ua#v#Ua(|#Ua)O#Ua)q#Uab#Uae#Uam#Ua|#Ua!O#Ua!o#Ua!r#Ua!s#Ua!t#Ua!u#Ua!v#Ua!{#Ua#a#Ua#b#Ua#i#Ua#t#Ua${#Ua%c#Ua%e#Ua%k#Ua%l#Ua%o#Ua%v#Ua&m#Ua&r#Ua&s#Ua(x#Ua)W#Ua)`#Ua[#Ua!h#UaQ#Ua!d#Ua~O!x!cO]#Rq!T#Rq!V#Rq#v#Rq(|#Rq)q#Rq[#Rq!h#Rq)`#RqQ#Rq!d#Rq~O!W6_O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!W6_O~P!(}O!h2UOQ)Qa!d)Qa~O)`6dO~Om-lO!TxO)q6eO~O]*{O!T$YO!V&dO!h*yO)`)xX~O)q6iO~P),eO[6kO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[6kO~O$c6mOP$_q]$_qb$_qe$_qm$_qs$_qt$_qu$_qv$_qw$_qx$_qy$_qz$_q|$_q!O$_q!T$_q!V$_q!X$_q!Y$_q!i$_q!o$_q!r$_q!s$_q!t$_q!u$_q!v$_q!x$_q!{$_q#V$_q#a$_q#b$_q#i$_q#p$_q#t$_q#v$_q$R$_q$T$_q$Y$_q$Z$_q$`$_q$e$_q$g$_q$h$_q$k$_q$m$_q$o$_q$q$_q$s$_q$u$_q$w$_q${$_q$}$_q%U$_q%_$_q%`$_q%a$_q%c$_q%e$_q%g$_q%l$_q%o$_q%v$_q%|$_q&m$_q&r$_q&s$_q'Q$_q'R$_q'V$_q'Y$_q'a$_q'b$_q(m$_q(v$_q(x$_q)W$_q)Z$_q)]$_q)^$_q)`$_q)a$_q)c$_q)o$_q)p$_q!U$_q~O)`6nO~OPmO]$gOb!]Om;VO|#RO!V$hO!X!XO!Y!WO!i!YO#V#QO#a#VO#b#TO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x;XO)Z$mO)^$mO)`6pO)a!ZO)cXO)ocO)pdO~P&@lO(|6rO)q*wO~P),eO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`6pO)a$OO~P#4YO[6tO~P!(}O)`6xO~O)`6yO~O]-aOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!{!dO(x-]O)Z-^O~O]&eO!V3PO!h%Oa)`%Oa[%Oa~O!W7PO)Z7QO~P$&OO!h3QO)`)|a~O[7TO]&eO!V3PO~O!TxO$`!iO$e!jO$g!kO$h!lO$k-iO$m!nO$o!oO$q!pO$s!qO$u!rO$w!sO$}!uO(x:xOe$Xq!o$Xq!{$Xq#i$Xq#p$Xq#t$Xq#v$Xq$R$Xq$T$Xq$Y$Xq$Z$Xq${$Xq%U$Xq%c$Xq%g$Xq%o$Xq%|$Xq(m$Xq)]$Xq!U$Xq$c$Xq~P$0yOPmO]$gOb!]Om;VO|#RO!V$hO!X!XO!Y!WO!i!YO#V#QO#a#VO#b#TO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x;XO)WYO)Z$mO)^$mO)`7VO)a!ZO)cXO)ocO)pdO~P&@lO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`7YO)a$OO~P#4YO)`7ZO~OP7[O(vQO~Om*aO)`)eX~P$GhOq&hOm)TX)`)eX~P$GhO)`7^O~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO)`&Sa~P#4YO!U7`O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO)`7aO~OPmO]$gOb!]Om;WO|#RO!V$hO!X!XO!Y!WO!i!YO#V#QO#a#VO#b#TO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x;_O)WYO)Z$mO)^$mO)a0vO)cXO)ocO)pdO[)kP~P&@lO!h3zO)a7eO!T)fa~O!h3zO!T)fa~O)`7jO)q7lO~P('fO)`7nO~PGYO]4UOm)QOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!{!dO!|%TO%v$oO&r#WO(x)PO)Z4RO)]4VO)^4VO~O)Z7rO~O]&eO!T*vO!V7tO!h7uO#v!eO(|4YO~O)`7jO)q7wO~P)GyO]4UOm)QO!{!dO%v$oO&r#WO(x)PO)Z4RO)]4VO)^4VO~Oq&hO])jX!T)jX!V)jX!h)jX#v)jX(|)jX)`)jX)q)jX[)jX~O)`7jO~O!T(TO!l7}O(|(SO])Uie)Uim)Uis)Uit)Uiu)Uiv)Uiw)Uix)Uiy)Uiz)Ui!O)Ui!V)Ui!r)Ui!s)Ui!t)Ui!u)Ui!v)Ui!x)Ui!{)Ui%v)Ui&r)Ui&s)Ui(x)Ui)Z)Ui)])Ui)^)Ui)`)Ui[)Ui!X)Ui!Y)Ui![)Ui!^)Ui!_)Ui!a)Ui!b)Ui!e)Ui!f)Ui!h)Ui({)Ui(})Ui)O)Ui)[)Ui)_)Ui)a)Ui!g)Ui)q)Ui!W)UiQ)Ui!d)Ui!U)Ui#v)Ui~O(x%pO!U(hX!h(hX~O!h4cO!U*Ya~Oq&hO]*Xae*Xam*Xas*Xat*Xau*Xav*Xaw*Xax*Xay*Xaz*Xa!O*Xa!T*Xa!V*Xa!r*Xa!s*Xa!t*Xa!u*Xa!v*Xa!x*Xa!{*Xa%v*Xa&r*Xa&s*Xa(x*Xa)Z*Xa)]*Xa)^*Xa)`*Xa[*Xa!X*Xa!Y*Xa![*Xa!^*Xa!_*Xa!a*Xa!b*Xa!e*Xa!f*Xa!h*Xa({*Xa(}*Xa)O*Xa)[*Xa)_*Xa)a*Xa!g*Xa)q*Xa!W*XaQ*Xa!d*Xa(|*Xa!U*Xa#v*Xa~O!T(^O]&kqe&kqm&kqs&kqt&kqu&kqv&kqw&kqx&kqy&kqz&kq!O&kq!V&kq!r&kq!s&kq!t&kq!u&kq!v&kq!x&kq!{&kq%v&kq&r&kq&s&kq(x&kq)Z&kq)]&kq)^&kq)`&kq[&kq!X&kq!Y&kq![&kq!^&kq!_&kq!a&kq!b&kq!e&kq!f&kq!h&kq({&kq(}&kq)O&kq)[&kq)_&kq)a&kq!g&kq)q&kq!W&kqQ&kq!d&kq(|&kq!U&kq#v&kq~OPmOb%SOm;UO!T$YO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)cXO)ocO)pdO~O]*^i!V*^i!X*^i!Y*^i![*^i!^*^i!_*^i!a*^i!b*^i!e*^i!f*^i!h*^i({*^i(}*^i)O*^i)Z*^i)[*^i)]*^i)^*^i)_*^i)`*^i)a*^i!g*^i)q*^i[*^i!W*^i(|*^i!U*^iQ*^i!d*^i~P*'YO[8SO~O!W8TO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!h'^q)`'^q!g'^q)q'^q['^q!W'^q(|'^q!U'^qQ'^q!d'^q~P#4YO!h8UO[*bX~O[8WO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!h_y)`_y!g_y)q_y[_y!W_y(|_y!U_yQ_y!d_y~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO[(ja!h(ja~P#4YO]$PO!T$YO!V'Zy!X'Zy!Y'Zy!['Zy!^'Zy!_'Zy!a'Zy!b'Zy!e'Zy!f'Zy!h'Zy({'Zy(}'Zy)O'Zy)Z'Zy)['Zy)]'Zy)^'Zy)_'Zy)`'Zy)a'Zy!g'Zy)q'Zy['Zy!W'Zy(|'Zy!U'ZyQ'Zy!d'Zy~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!h'^y)`'^y!g'^y)q'^y['^y!W'^y(|'^y!U'^yQ'^y!d'^y~P#4YO]&eO!V+pO!T%uy#v%uy)`%uy)q%uy~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!U(Va!h(Va~P#4YO!W5SO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!U#}i!h#}i~P#4YO!U8ZO~P&7rO!W8ZO~P&7rO[8ZO~P&7rO[8]O~P&7rO]&eO!V&dO[#Qy!T#Qy!h#Qy#v#Qy)`#Qy)q#QyQ#Qy!d#Qy(|#Qy~O]&eO!V+pO[rqQrq!drq!hrq)arq)`rq~O]&eOQ#Pi!d#Pi!h#Pi[#Pi~O!V+pO~P*:gOQ#nX!d#nX!h#nX[#nX~P(ElO!V&dO~P*:gOQ(PX](PXe'rXm'rXs(PXt(PXu(PXv(PXw(PXx(PXy(PXz(PX!V(PX!d(PX!h(PX!{'rX%v'rX(x'rX)Z(PX)](PX)^(PX[(PX~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OOQ#_i!d#_i!h#_i[#_i~P#4YO&r#WO&s$yOQ#fi!d#fi!h#fi~O(x-]O)a1bO)q1aOQ#`X!d#`X!h#`X~O!W8bO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!W8bO~P!(}O!T#qi!x#qi#v#qi(|#qi)q#qi[#qi!h#qi)`#qiQ#qi!d#qi)a#qi~O]&eO!V+pO~P*@cO]&[O!V&YO&r#WO&s$yO)Z&XO)]&]O)^&]O~P*@cO[8dO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!h8eO[)vX~O[8gO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OOQ*]X!d*]X!h*]X~P#4YO)a8jOQ*[X!d*[X!h*[X~O)`8lO~O[$bi!h#{a)`#{a~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`8oO)a$OO~P#4YO[8qO~P!(}O[8qO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[8qO~O]&eO!V&dO(|8wO~O)`8xO~O]&eO!V3PO!h%Oi)`%Oi[%Oi~O!W8{O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!W8{O)Z8}O~P$&OO!W8{O~P!(}O]&eO!V3PO!h(Za)`(Za~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`9OO)a$OO~P#4YO)`2qO~P!(}O)`9OO~OP%qO[9PO(vQO~O[9PO~O)`9QO~P%%{O#T9TO)O.WO)`9RO~O!h3zO!T)fi~O)a9XO!T'xa!h'xa~O)`9ZO)q9]O~P)GyO)`9ZO~O)`9ZO)q9aO~P('fOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O~P)HiO]&eO!V7tO!T!ya!h!ya#v!ya(|!ya)`!ya)q!ya[!ya~O!W9hO)Z9iO~P$&OO!T$YO!h7uO(|4YO)`9ZO)q9aO~O!T$YO~P#EtO[9lO]&eO!V7tO~O]&eO!V7tO!T&aa!h&aa#v&aa(|&aa)`&aa)q&aa[&aa~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO)`&ba~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`9ZO)a$OO~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!U&oi!h&oi~P#4YO!V/UO]']i!T']i!X']i!Y']i![']i!^']i!_']i!a']i!b']i!e']i!f']i!h']i({']i(}']i)O']i)Z']i)[']i)]']i)^']i)_']i)`']i)a']i!g']i)q']i[']i!W']i(|']i!U']iQ']i!d']i~O(x%pO)a9oO~O!h8UO[*ba~O[9qO~P&7rO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!U(Va)`#Zi~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OOQ#_q!d#_q!h#_q[#_q~P#4YO&r#WO&s$yOQ#fq!d#fq!h#fq~O)q5tOQ#`a!d#`a!h#`a~O]&eO!V+pO!T#qq!x#qq#v#qq(|#qq)q#qq[#qq!h#qq)`#qqQ#qq!d#qq)a#qq~O!h8eO[)va~O)]6WO]&Vi!T&Vi!V&Vi)Z&Vi)[&Vi)^&Vis&Vit&Viu&Viv&Viw&Vix&Viy&Viz&Vi!l&Vi!x&Vi#T&Vi#V&Vi#p&Vi#v&Vi(|&Vi)O&Vi)q&Vib&Vie&Vim&Vi|&Vi!O&Vi!o&Vi!r&Vi!s&Vi!t&Vi!u&Vi!v&Vi!{&Vi#a&Vi#b&Vi#i&Vi#t&Vi${&Vi%c&Vi%e&Vi%k&Vi%l&Vi%o&Vi%v&Vi&m&Vi&r&Vi&s&Vi(x&Vi)W&Vi)`&Vi[&Vi!h&ViQ&Vi!d&Vi~O)`9tO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO[$bq!h#{i)`#{i~P#4YO[9vO~P!(}O[9vO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[9vO~O]&eO!V&dO(|9yO~O[9zO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[9zO~O]&eO!V3PO!h%Oq)`%Oq[%Oq~O!W:OO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!W:OO~P!(}O)`6pO~P!(}O)`:PO~O)`:QO~O)O.WO)`:QO~O!h3zO!T)fq~O)a:SO!T'xi!h'xi~O!T$YO!h7uO(|4YO)`:TO)q:VO~O)`:TO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`:TO)a$OO~P#4YO)`:TO)q:YO~P)GyO]&eO!V7tO!T!yi!h!yi#v!yi(|!yi)`!yi)q!yi[!yi~O!W:^O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!W:^O)Z:`O~P$&OO!W:^O~P!(}O]&eO!V7tO!T(fa!h(fa(|(fa)`(fa)q(fa~O[:bO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[:bO~O[:gO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[:gO~O]&eO!V3PO!h%Oy)`%Oy[%Oy~O)`:hO~O)`:iO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`:iO)a$OO~P#4YO!T$YO!h7uO(|4YO)`:iO)q:lO~O]&eO!V7tO!T!yq!h!yq#v!yq(|!yq)`!yq)q!yq[!yq~O!W:nO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!W:nO~P!(}O[:pO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[:pO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`:rO)a$OO~P#4YO)`:rO~O]&eO!V7tO!T!yy!h!yy#v!yy(|!yy)`!yy)q!yy[!yy~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`:vO)a$OO~P#4YO)`:vO~O]ZXmhXqZXqjX!TjX!VZX!XZX!YZX![ZX!^ZX!_ZX!aZX!bZX!eZX!fZX!gZX!hZX({ZX(|$]X(}ZX)OZX)ZZX)[ZX)]ZX)^ZX)_ZX)`ZX)aZX)qZX~O]%WXmnXqoXq%WX!ToX!V%WX!X%WX!Y%WX![%WX!^%WX!_%WX!a%WX!b%WX!e%WX!f%WX!gnX!h%WX({%WX(}%WX)O%WX)Z%WX)[%WX)]%WX)^%WX)_%WX)a%WX)qnX[%WXQ%WX!d%WX~O)`%WX!W%WX(|%WX!U%WX~P+HoO]oX]%WXeoXmnXqoXq%WXsoXtoXuoXvoXwoXxoXyoXzoX!OoX!VoX!V%WX!roX!soX!toX!uoX!voX!xoX!{oX%voX&roX&soX(xoX)ZoX)]oX)^oX[oX[%WX!hoX)aoX~O)`oX)qoX~P+KPO]%WXmnXqoXq%WX!V%WX!h%WXQ%WX!d%WX[%WX~O!T%WX#v%WX)`%WX)q%WX(|%WX~P+MjOQoXQ%WX!ToX!X%WX!Y%WX![%WX!^%WX!_%WX!a%WX!b%WX!doX!d%WX!e%WX!f%WX!gnX!h%WX({%WX(}%WX)O%WX)Z%WX)[%WX)]%WX)^%WX)_%WX)a%WX)qnX~P+KPO]oX]%WXmnXqoXq%WXsoXtoXuoXvoXwoXxoXyoXzoX!OoX!V%WX!roX!soX!toX!uoX!voX!xoX!{oX%voX&roX&soX(xoX)ZoX)]oX)^oX~O!ToX(|oX)`oX)qoX~P,!bOmnXqoX!h%WX)`%WX~OeoX!VoX)`%WX~P,!bOe)tO%Y)uO)P:yO~Oe)tO%Y)uO)P;OO~Oe)tO%Y)uO)P:zO~Oe$TO%Y*YO'[$VO'_$WO)P:yO~Oe$TO%Y*YO'[$VO'_$WO)P:{O~Oe$TO%Y*YO'[$VO'_$WO)P:}O~O[jX]jXsjXtjXujXvjXwjXxjXyjXzjX!VjX&rjX&sjX)ZjX)]jX)^jXejX!OjX!rjX!sjX!tjX!ujX!vjX!xjX!{jX%vjX(xjX~P#1xO]ZXmhXqZXqjX!VZX!hZX)`ZX)qZX~O!TZX#vZX(|ZX~P,({OmhXqjX!hZX)WjX)`ZX)qjX~O]ZX]jXejXmhXqZXqjXsjXtjXujXvjXwjXxjXyjXzjX!OjX!VZX!VjX!rjX!sjX!tjX!ujX!vjX!xjX!{jX%vjX&rjX&sjX(xjX)ZjX)]jX)^jX[ZX[jX!hjX)ajX)qjX~O)`ZX~P,*YO]ZX]jXmhXqZXqjXsjXtjXujXvjXwjXxjXyjXzjX!TjX!VZX!VjX!XZX!YZX![ZX!^ZX!_ZX!aZX!bZX!eZX!fZX!gZX!hZX!hjX&rjX&sjX({ZX(}ZX)OZX)ZZX)ZjX)[ZX)]ZX)]jX)^ZX)^jX)_ZX)aZX)ajX)qZX~OQZXQjX!dZX!djX~P,,sO]jXejXsjXtjXujXvjXwjXxjXyjXzjX!OjX!VjX!rjX!sjX!tjX!ujX!vjX!xjX!{jX%vjX&rjX&sjX(xjX)ZjX)]jX)^jX~P#1xO[ZX[jXejX!OjX!rjX!sjX!tjX!ujX!vjX!xjX!{jX%vjX(xjX)qjX~P,,sO]ZX]jXmhXqZXqjXsjXtjXujXvjXwjXxjXyjXzjX!OjX!VZX!rjX!sjX!tjX!ujX!vjX!xjX!{jX%vjX&rjX&sjX(xjX)ZjX)]jX)^jX)`jX~O!TjX(|jX)qjX~P,2uOejX!VjX~P,2uOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O~PBXOe$TO%Y*YO)P:yO~Oe$TO%Y*YO)P:zO~Oe$TO%Y*YO)P;PO~Oe$TO%Y*YO)P;QO~O]%jOe!POm%dOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!V%mO!{!dO!|%TO%v$oO(x$zO)Z;kO)];lO)^;lO~O]%jOe!POm%dO!V%mO!{!dO%v$oO(x$zO)Z;kO)];lO)^;lO~Oe$TO%Y$UO)P:zO~Oe$TO%Y$UO)P;OO~Om;TO~Om;SO~O]dXmhXqjX!TdX~Oe)tO%Y*YO)P:yO~Oe)tO%Y*YO)P:zO~Oe)tO%Y*YO)P:{O~Oe)tO%Y*YO)P:|O~Oe)tO%Y*YO)P:}O~Oe)tO%Y*YO)P;PO~Oe)tO%Y*YO)P;QO~Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O~P,8VO])TXs)TXt)TXu)TXv)TXw)TXx)TXy)TXz)TX!O)TX!r)TX!s)TX!t)TX!u)TX!v)TX!x)TX!{)TX%v)TX&r)TX&s)TX(x)TX)Z)TX)])TX)^)TX)q)TX~Om;SO!T)TX(|)TX)`)TX~P,<UO]&wXmnXqoX!T&wX~Oe4uO%Y*YO)P<OO~Om;fO)Z<SO)]5kO)^5kO~P(FnOe!POm%dO!{!dO%v$oO(x$zO~O]1[O!V1YO)Z1SO)]<TO)^<TOQ#nX!d#nX!h#nX[#nX~P,?QO)Z;dO~Om;rO~Om;sO~Om;tO~Om;vO~Om;wO~Om;xO~Om;vO!T$YOQ)TX!d)TX!h)TX)a)TX[)TX)q)TX~P$GhOm;tO!T$YO~P$GhOm;rO!g$[O)q$[O~Om;tO!g$[O)q$[O~Om;vO!g$[O)q$[O~Om;sO[)TX!h)TX)a)TX)q)TX~P$GhOe/fO%Y*YO)P<OO~Om<PO~O)Z<dO~OV'e'h'i'g(v)c!R(xS(q%Z!Y!['je%[!i'R!f]'f*c'k(}!^!_'l'm'l~",
  goto: "%8g*cPPPPP*d*qP*tPP.jPP5P8Q8Q;[P;[>fP?P?c?wFpMq!&v!-_P!4Y!4}!5rP!6^PPPPPPPP!6wP!8aP!9r!;[P!;bPPPPPP!;eP!;ePP!;ePP!;qPPPPPP!=s!AZP!A^PP!Az!BoPPPPP!BsP?S!DUPP?S!F]!H^!Hl!JR!KrP!K}P!L^!L^# n#$}#&e#)q#,{!H^#-VPP!H^#-^#-d#-V#-V#-gP#-k#.Y#.Y#.Y#.Y!KrP#.s#/U#1kP#2PP#3lP#3p#3x#4m#4x#7W#7`#7`#3pP#3pP#7g#7mP#7wPP#8d#9R#9s#8dP#:e#:qP#8dP#8dPP#8d#8dP#8dP#8dP#8dP#8dP#8dP#8dP#:t#7w#;bP#;wP#<^#<^#<^#<^#<k#3pP#=R#BO#BmPPPPPPPP#CeP#CsP#CsP#DP#G^#;mPP#Cm#GpP#HT#H`#Hf#Hf#Cm#I[P#3p#3p#3p#3p#3pP!L^#Iv#I}#I}#I}#JR# h#J]# h#Ja!Hl!Hl!Hl#Jd#N|!Hl?S?S?S$%u!Bo!Bo!Bo!Bo!Bo!Bo!6w!6w!6w$&YP$'u$(T!6w$(ZPP!6w$*i$*l#C[$*o;[8Q$-u$/p$1a$3P8QPP8Q$4s8QP8Q8QP8QP$7y8QP8QPP8Q$8VPPPPPPPPP*qP$;_$;e$;k$>S$@Y$@`$@v$AQ$A]$Al$Ar$CQ$DP$DW$D_$De$Dm$Dw$D}$EY$E`$Ei$Eq$E|$FS$F^$Fd$Fn$Ft$F{$G[$Gb$GhP$Gn$Gv$G}$H]$Iy$JP$JV$J^$JjPPPPPPPPPPPP$Jp$JtPPPPP%#v$*i%#y%'R%)ZPP%)h%)kPPPPPPPPPP%)w%*z%+Q%+U%,{%.Y%.{%/S%1c%1iPPP%1s%2O%2R%2X%3`%3c%3m%3w%3{%5P%5r%5x#CeP%6c%6i%6y%6|%7^%7j%7n%7t%7z$*i$*l$*l%7}%8QP%8a%8dQ#dPa(s#b(p(q(r(t/]/_4rR#dP'`mO[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pU%qm%r7[Q&o!`Q(p#^d0X*S0U0V0W0Z5X5Y5Z5^8[R7[3_b}Oaewx{!g&U*v&v$k[!W!X!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}1T1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pS%bf0p#d%lgnp|#O$i%O%P%U%f%j%k%y&u'w'x(T*_*e*g*y+b,q,{-f-w.O.m.t.v0e1R1S1W1[2g2r5k6q;b;c;d;j;k;l;y;z;{;|<Q<R<S<T<b<c<dS%sm!YS&w!h#PS'^!t'aQ'j!yQ'k!zQ(p#aQ(q#^Q(r#_Q*}%mQ,]&nQ,b&pQ-k'iQ-r'tS.y(^4cQ/n)lQ0m*rQ2Y,aQ2a,hQ2t-UQ3Y-lQ4l/TQ4p/^Q5p1VQ6f2]Q7X3ZQ8k6eQ9o8UR;e1Y$|#iS!]${%S%V%]&l&m'S'Z']'d'f(d(h(k(|(})W)X)Y)Z)[)])^)_)`)a)b)c)d)p)v)}+^+l,T,X,o,z-o-p.T/Q/x0h0j0o0q1P1h2R2i2p3]3m3n4m4n4t4w4}5P5T5U5n5z6R6`6o6s6}7U7{7|8O8^8_8m8p8t8|9_9f9u9{:W:_:d:j:sQ&r!dQ(j#ZQ(x#cQ)o$V[*x%g*]0s2h2o3VQ,c&qQ/V(iQ/](qQ/c(yS/q)n/WQ0z+VS4{/r/sR8Y4|'a![O[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:p'a!VO[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pQ)T#mS+V%{0{Q/z)xk4X.n3}4R4U4V7m7o7p7r7u9c9d:]Q)V#mk4W.n3}4R4U4V7m7o7p7r7u9c9d:]l)U#m.n3}4R4U4V7m7o7p7r7u9c9d:]T+V%{0{[UOwx!g&U*vW$b[e$g(e#l$r_!f!u!}#R#S#T#U#V#Z$U$V$n%W&W&[&e&o'b(Q(S(X(a(j)o)u+a+f+g+y,O,^,p-P-X-v-{._.`.f.g.k.x.|1]1a1n1s1u2v3f3g3h3z4O5t6X6Z7f8e![%eg$i%f%k&u*_*y+b,q,{-f1S1W2g;b;c;d;k;l;y;z;{;|<Q<R<T<b<c<dY%unp%y-w.ml)R#m.n3}4R4U4V7m7o7p7r7u9c9d:]S;o'w.OU;p(T.t.v&|<Vaf{|!W!X!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$h$m%O%P%U%_%j%o&S&Y&d&{'O'Q'l'm'x'|(c(l)q)w*e*g*m*n*q*w+]+_+m+o+p,U,W,s,v-n.W.X.]/U/X/d/k/t/v/{/}0e0p1R1T1Y1i1j1t1x2S2k2q2r3P4Y4]4b4k5d5k5o5{6i6m6p6q6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:p;j<SQ<W1[d<X&z'R'e,|-d-e-h2n3U3XW<Y&h*{2U3s^<Z!t'a'i,a-U2]6eQ<[#OT<g%{0{[VOwx!g&U*vW$c[e$g(eQ$r.|!j$s_!f!u!}#V#Z$U$V$n%W&W&[&e&o'b(j)o)u+a+f+y,^,p-P-X-v.k1]1a1n1s1u2v4O5t8e&^$|af{!W!X!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$h$m%_%o&S&Y&d&{'O'Q'l'm'|(c(l)q)w*m*n*q*w+]+_+m+o+p,U,W,s,v-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2k2q3P4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:p![%eg$i%f%k&u*_*y+b,q,{-f1S1W2g;b;c;d;k;l;y;z;{;|<Q<R<T<b<c<dY%unp%y-w.mQ'u#O|(P#R#S#T#U(Q(S(X(a+g,O._.`.f.g.x3f3g3h3z6X6Z7fl)R#m.n3}4R4U4V7m7o7p7r7u9c9d:]S-u'w.OQ3b-{U;}(T.t.vn<V|%O%P%U%j'x*e*g0e1R2r5k6q;j<S^<Z!t'a'i,a-U2]6eW<]&h*{2U3sd<^&z'R'e,|-d-e-h2n3U3XQ<e1[T<g%{0{!Q!UO[ewx!g$g&U&h&z'R'e(e*v*{,|-d-e-h2U2n3U3X3s!v$v_!f!u!}#O#V#Z$U$V$n%W&W&[&e&o'b'w(T(j)o)u+a+y,^,p-P-X-v.O.k.t.v1[1]1a1n1s1u2v4O5t8e&^%Raf{!W!X!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$h$m%_%o&S&Y&d&{'O'Q'l'm'|(c(l)q)w*m*n*q*w+]+_+m+o+p,U,W,s,v-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2k2q3P4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:p$S%ngnp|#m$i%O%P%U%f%j%k%y%{&u'a'i'x*_*e*g*y+b,a,q,{-U-f-w.m.n0e0{1R1S1W2]2g2r3}4R4U4V5k6e6q7m7o7p7r7u9c9d:];b;c;d;j;k;l;y;z;{;|<Q<R<S<T<b<c<dQ'_!tz(R#R#S#T#U(Q(S(X(a,O._.`.f.g.x3f3g3h3z6X6Z7ff-b'c-[-^-a2z2{2}3Q6{6|8zQ1`+fQ1c+gQ2s-OQ3c-{Q4f.|Q5v1bR8a5w!Q!UO[ewx!g$g&U&h&z'R'e(e*v*{,|-d-e-h2U2n3U3X3s!x$v_!f!u!}#O#V#Z$U$V$n%W&W&[&e&o'b'w(T(j)o)u+a+f+y,^,p-P-X-v.O.k.t.v1[1]1a1n1s1u2v4O5t8e&^%Raf{!W!X!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$h$m%_%o&S&Y&d&{'O'Q'l'm'|(c(l)q)w*m*n*q*w+]+_+m+o+p,U,W,s,v-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2k2q3P4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:p$U%ngnp|!t#m$i%O%P%U%f%j%k%y%{&u'a'i'x*_*e*g*y+b,a,q,{-U-f-w.m.n0e0{1R1S1W2]2g2r3}4R4U4V5k6e6q7m7o7p7r7u9c9d:];b;c;d;j;k;l;y;z;{;|<Q<R<S<T<b<c<d|(R#R#S#T#U(Q(S(X(a+g,O._.`.f.g.x3f3g3h3z6X6Z7fQ3c-{R4f.|[WOwx!g&U*vW$d[e$g(e#l$r_!f!u!}#R#S#T#U#V#Z$U$V$n%W&W&[&e&o'b(Q(S(X(a(j)o)u+a+f+g+y,O,^,p-P-X-v-{._.`.f.g.k.x.|1]1a1n1s1u2v3f3g3h3z4O5t6X6Z7f8e![%eg$i%f%k&u*_*y+b,q,{-f1S1W2g;b;c;d;k;l;y;z;{;|<Q<R<T<b<c<dY%unp%y-w.ml)R#m.n3}4R4U4V7m7o7p7r7u9c9d:]S;o'w.OU;p(T.t.vn<V|%O%P%U%j'x*e*g0e1R2r5k6q;j<SQ<W1[^<Z!t'a'i,a-U2]6eQ<[#O&^<_af{!W!X!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$h$m%_%o&S&Y&d&{'O'Q'l'm'|(c(l)q)w*m*n*q*w+]+_+m+o+p,U,W,s,v-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2k2q3P4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pd<`&z'R'e,|-d-e-h2n3U3XW<a&h*{2U3sT<g%{0{p$RT$a$q%d%t)Q;U;V;W;f;g;h;i;m;n<fo)r$X*Z*a/g;R;S;T;r;s;t;u;v;w;x<Pp$ST$a$q%d%t)Q;U;V;W;f;g;h;i;m;n<fo)s$X*Z*a/g;R;S;T;r;s;t;u;v;w;x<P^&g}!O$k$l%b%l;ed&k!U$v%R%n'_(R1`1c3c4fV/i)T)U4XS%[e$gQ,Y&hQ/S(eQ2w-XQ6T1uQ6a2UQ6w2vR9r8e#}!TO[_ewx!f!g!u!}#O#V#Z$U$V$g$n%W&U&W&[&e&h&o&z'R'b'e'w(T(e(j)o)u*v*{+a+f+y,^,p,|-P-X-d-e-h-v-{.O.k.t.v1[1]1a1n1s1u2U2n2v3U3X3s4O5t8e#[^O[_`wx!f!g!}#O$U$f$n$u$w&U&W&[&e&o&t&z'R'e'w(T)u*b*v*{+a,^,p,|-P-d-e-h-v-{.O.k.t.v1[1]1n2n3U3X3s4O_(X#R#S#T+g3f3g3h#}ZO[wx!g!k#R#S#T%o&U&W&[&e&o&y&z&{'O'Q'R'_'e'w'{(Q(S(T(X*v*{+a+g,^,m,p,v-W-d-e-h-v-{.O.R.f.k.t.x1[1]1n2k2s3U3X3f3g3h3s6m6t8q9v9z:b:g:pQ$_YR0]*TR*V$_e0X*S0U0V0W0Z5X5Y5Z5^8[$f#{S%V%]'S'Z']'d'f(k(|(})W)Z)[)])^)_)`)c)d)p)v)}+^+l,T,X,o,z-o-p.T/Q/x0h0j0o0q1P1h2R2i2p3]3m3n4m4n4t4w4}5P5T5U5n5z6R6`6o6s6}7U7{7|8O8^8_8m8p8t8|9_9f9u9{:W:_:d:j:se0X*S0U0V0W0Z5X5Y5Z5^8['`!YO[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pe0X*S0U0V0W0Z5X5Y5Z5^8[R5_0]^(W#R#S#T+g3f3g3hY.d(Q(U(X(Y7_U3u.b.e.xS7c3v4aR9m7}^(V#R#S#T+g3f3g3h[.c(Q(U(W(X(Y7_W3t.b.d.e.xU7b3u3v4aS9U7c7}R:a9mT.r(T.td]Owx!g&U'w(T*v.O.t!v^[_`!f!}#O$U$f$n$u$w&W&[&e&o&t&z'R'e)u*b*{+a,^,p,|-P-d-e-h-v-{.k.v1[1]1n2n3U3X3s4OQ%vnT1},S2O!jbOaenpwx{|!g#O%O%P%U%j%y&U'w'x(T*e*g*v-w.O.m.t.v0e1R1[2r5k6q;j<Sf-_'c-[-^-a2z2{2}3Q6{6|8zj4S.n3}4R4U4V7m7o7p7r7u9c9d:]r<Ug$i%f%k&u*_*y,q,{-f2g;b;c;d;y;{<Qi<h+b1S1W;k;l;z;|<R<T<b<c<d!O&`y%Z&X&[&]'n)m*i*k+b+j+}/u0f1R1S1W1[1r5k6Q<S<Tz&cz%Q%Y%g&f'v*]*d,g.P0c0d0s1U2h2o3V5a5l6v8sS(O#Q.`n+q&Z*l+k+r+u-q/p0g1Z1f5O5b5j6P8cQ2`,f^3O-`2|3S6z7R8y9}e7s4T7i7q7y7z9`9b9j:[:mS+c&W1]Y+s&[&e*{1[3sR5}1n#w!POaegnpwx{|!g#O$i%O%P%U%f%j%k%y&U&u'w'x(T*_*e*g*v*y+b,q,{-f-w.O.m.t.v0e1R1S1W1[2g2r5k6q;b;c;d;j;k;l;y;z;{;|<Q<R<S<T<b<c<d`oOwx!g&U'w*v.O#U!Paeg{|#O$i%O%P%U%f%j%k&u'x*_*e*g*y+b,q,{-f0e1R1S1W1[2g2r5k6q;b;c;d;j;k;l;y;z;{;|<Q<R<S<T<b<c<dU%xnp-wQ+S%yS.l(T.tT4Q.m.vW+w&`+q+x1kV,P&c,Q7sQ+}&bU,P&c,Q7sQ.O'wT.Z'|.]'`![O[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pX1z,O.`6X6Z'W!VO[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/d/k/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pW1z,O.`6X6ZR2m,x!WjO[wx!g!k%o&U&{'O'Q'e*v,v-d-e-h2k3U6m6t8q9v9z:b:g:pY%Xe$g(e1x3sQ'U!nS)O#k5dQ,r&zQ,}'RS.V'|.]Q2j,sQ6u2qQ7W3XQ8r6pR9w8o'W![O[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/d/k/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pX1z,O.`6X6Z'ayO[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,O,U,W,s,v,|-d-e-h-n.W.X.].`/U/d/k/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b5d5o5{6X6Z6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pQ&byS'w#O-|R1d+hS+c&W1]R5x1dQ1X+bR5q1WR1X+bT+c&W1]z&^%Z&X&[&]'n)m*i*k+b+j/u0f1R1S1W1[1r5k6Q<S<TQ&_yR1v+}!P&^y%Z&X&[&]'n)m*i*k+b+j+}/u0f1R1S1W1[1r5k6Q<S<TQ+z&`S,R&c7sS1l+q+xQ1|,QR5|1k!WkO[wx!g!k%o&U&{'O'Q'e*v,v-d-e-h2k3U6m6t8q9v9z:b:g:pS%|o.lS&Qq-yQ&ayQ&s!eQ'h!yQ*u%gU+Q%x%}4QS+U%z&PQ+v&_Q,_&oS,`&p'jQ,w&}S0a*],gS0w+R+SQ0y+TQ1w+}S2[,b-mQ5`0cQ5e0xQ6V1vQ6d2ZQ6g2`Q7x4TQ9^7iR:Z9`[uOwx!g&U*vQ,_&oQ-}'wQ3d-{R3i.OxlOwx!g!k%o&U&{'Q*v,v2k6m6t8q9v9z:b:g:pU$j['O-eS%|o.lS&Qq-yQ*u%gU+Q%x%}4QS+U%z&PS0a*],gS0w+R+SQ0y+TQ5`0cQ5e0xQ7x4TQ9^7iR:Z9`T,d&s,e]uOwx!g&U*v[uOwx!g&U*vQ,_&oQ,s&zQ,|'RW-g'e-d-h3UQ-}'wQ3d-{Q3i.OR7V3X[%hg$i,q,{-f2gR0t*y^$ZV!U$c$|%R<]<^Q'U!nS)e$P*{S){$Y*vQ*O$[Y*x%g*]0s2o3VQ/V(iS/q)n/WS0i*m4kS0r*w6iQ0z+VQ4[.nQ4x/kS4{/r/sS5Q/v5dQ5V/}Q6j2hU7k3}4T4]Q8Y4|Q8u6rY9[7i7l7m7v7wQ9|8wW:U9Y9]9`9aQ:e9yU:k:V:X:YR:t:lS){$Y*vT5Q/v5dZ)y$Y)z*v/v5dQ&y!hR'{#PS,l&x'yQ2d,jR6h2cxlOwx!g!k%o&U&{'Q*v,v2k6m6t8q9v9z:b:g:pV$j['O-e!XkO[wx!g!k%o&U&{'O'Q'e*v,v-d-e-h2k3U6m6t8q9v9z:b:g:p!WhO[wx!g!k%o&U&{'O'Q'e*v,v-d-e-h2k3U6m6t8q9v9z:b:g:pR'Y!q!WkO[wx!g!k%o&U&{'O'Q'e*v,v-d-e-h2k3U6m6t8q9v9z:b:g:pR,s&zQ&{!iQ&}!jQ'Q!lR,v&|R,t&zxlOwx!g!k%o&U&{'Q*v,v2k6m6t8q9v9z:b:g:pX-g'e-d-h3U[uOwx!g&U*vQ-P'RQ-}'wS.r(T.tR3i.O[uOwx!g&U*vQ-P'RW-g'e-d-h3UT.r(T.tg-b'c-[-^-a2z2{2}3Q6{6|8zylOwx!g!k%o&U&{'Q*v,v2k6m6t8q9v9z:b:g:pb!OOaewx{!g&U*v&|$l[f!W!X!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:p#d%lgnp|#O$i%O%P%U%f%j%k%y&u'w'x(T*_*e*g*y+b,q,{-f-w.O.m.t.v0e1R1S1W1[2g2r5k6q;b;c;d;j;k;l;y;z;{;|<Q<R<S<T<b<c<dS'^!t'aQ-k'iQ2Y,aQ2t-UQ6f2]R8k6ej$TT$a%d%t;U;V;W;f;g;h;i;m;ni)t$X*Z;R;S;T;r;s;t;u;v;w;xj$TT$a%d%t;U;V;W;f;g;h;i;m;nh)t$X*Z;R;S;T;r;s;t;u;v;w;xS/f)Q<fV4u/g/h<P[uOwx!g&U*vQ-}'wR3i.O[uOwx!g&U*vT.r(T.t'`!YO[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pR7]3_[uOwx!g&U*vQ-}'wS.r(T.tR3i.O[pOwx!g&U*vQ%ynS-w'w.OT.m(T.tS%}o.lS+R%x4QR0x+SQ+W%{R5g0{S%|o.lS&Qq-yU+Q%x%}4QS+U%z&PS0w+R+SQ0y+TQ5e0xQ7x4TQ9^7iR:Z9``qOwx!g&U(T*v.tS%zn-wU&Pp.m.vQ+T%yT-y'w.OS'}#Q.`R.a(OT.Y'|.]S.Z'|.]Q9S7`R:R9TT6X1y8iR6Z1y#d!Pgnp|#O$i%O%P%U%f%j%k%y&u'w'x(T*_*e*g*y+b,q,{-f-w.O.m.t.v0e1R1S1W1[2g2r5k6q;b;c;d;j;k;l;y;z;{;|<Q<R<S<T<b<c<db!QOaewx{!g&U*v&}![[f!W!X!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:p#d!Pgnp|#O$i%O%P%U%f%j%k%y&u'w'x(T*_*e*g*y+b,q,{-f-w.O.m.t.v0e1R1S1W1[2g2r5k6q;b;c;d;j;k;l;y;z;{;|<Q<R<S<T<b<c<db!QOaewx{!g&U*v&|![[f!W!X!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pk4W.n3}4R4U4V7m7o7p7r7u9c9d:]Q4[.nS7k3}4TU9[7i7m7vS:U9Y9`R:k:X#|!TO[_ewx!f!g!u!}#O#V#Z$U$V$g$n%W&U&W&[&e&h&o&z'R'b'e'w(T(e(j)o)u*v*{+a+f+y,^,p,|-P-X-d-e-h-v-{.O.k.t.v1[1]1a1n1s1u2U2n2v3U3X3s4O5t8eR4g.|Q(`#US.}(_(aS4h/O/PR8R4iQ.z(^R8P4c#|!TO[_ewx!f!g!u!}#O#V#Z$U$V$g$n%W&U&W&[&e&h&o&z'R'b'e'w(T(e(j)o)u*v*{+a+f+y,^,p,|-P-X-d-e-h-v-{.O.k.t.v1[1]1a1n1s1u2U2n2v3U3X3s4O5t8ep$y`$f$u%Z&t'c(b(i)n*i-[/s1r5u6Q8`q)S#m%{.n0{3}4R4U4V7m7o7p7r7u9c9d:]R,Z&hR6b2U'X!VO[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/d/k/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:p$q#tS%V%]'S'Z']'d'f(d(h(k(|(})W)X)Z)[)])^)_)`)a)b)c)d)p)v)}+^+l,T,X,o,z-o-p.T/Q/x0h0j0o0q1P1h2R2i2p3]3m3n4m4n4t4w4}5P5T5U5n5z6R6`6o6s6}7U7{7|8O8^8_8m8p8t8|9_9f9u9{:W:_:d:j:s$]#uS%V%]'S'Z']'d'f(k(|(})W)[)c)d)p)v)}+^+l,T,X,o,z-o-p.T/Q/x0h0j0o0q1P1h2R2i2p3]3m3n4m4n4t4w4}5P5T5U5n5z6R6`6o6s6}7U7{7|8O8^8_8m8p8t8|9_9f9u9{:W:_:d:j:s$Z#vS%V%]'S'Z']'d'f(k(|(})W)c)d)p)v)}+^+l,T,X,o,z-o-p.T/Q/x0h0j0o0q1P1h2R2i2p3]3m3n4m4n4t4w4}5P5T5U5n5z6R6`6o6s6}7U7{7|8O8^8_8m8p8t8|9_9f9u9{:W:_:d:j:s$c#yS%V%]'S'Z']'d'f(k(|(})W)Z)[)])^)c)d)p)v)}+^+l,T,X,o,z-o-p.T/Q/x0h0j0o0q1P1h2R2i2p3]3m3n4m4n4t4w4}5P5T5U5n5z6R6`6o6s6}7U7{7|8O8^8_8m8p8t8|9_9f9u9{:W:_:d:j:s'X![O[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/d/k/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pQ/W(iQ/r)nQ4|/sR9n8T']![O[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pQ(n#]R/Y(nQ#fQR(z#fU%Oa;j<Sb%We$g&h(e-X1u2U2v8eQ'b!u!Q*c%O%W'b*e*k+m,U0e0f1j2z6{7O7o8z9c9g:];b;y;z<Q<R<bS*e%P%UQ*k%ZS+m&Y1YQ,U&dQ0e*gQ0f*iQ1j+pQ2z-^S6{2{2}Q7O3PQ7o4RQ8z6|S9c7p7rQ9g7tQ:]9dQ;b%fS;y;c;dS;z<c<dQ<Q;{Q<R;|T<b1S;k[[Owx!g&U*vl$e['O(Q+a,^,m,p-W-e-v.R.f.k.xl'O!k%o&{'Q,v2k6m6t8q9v9z:b:g:p^(Q#R#S#T+g3f3g3h`+a&W&[&e*{1[1]1n3sS,^&o-{Q,m&yU,p&z'R3XS-W'_2sW-e'e-d-h3US-v'w.OQ.R'{Q.f(SS.k(T.tR.x(XQ*R$^R0Q*RQ0Z*SQ5X0UQ5Y0VQ5Z0WY5[0Z5X5Y5Z8[R8[5^Q*U$_S0^*U0_R0_*VS.g(S.fS3x.g7fR7f3zQ3{.hS7d3y3|U7h3{7d9VR9V7eQ.t(TR4^.t!|_O[wx!f!g!}#O$U$n&U&W&[&e&o&z'R'e'w(T)u*v*{+a,^,p,|-P-d-e-h-v-{.O.k.t.v1[1]1n2n3U3X3s4OU$t_$w*bU$w`$f&tR*b$uU%Pa;j<Sd*f%P*g2{6|7p9d;c;{;|<cQ*g%UQ2{-^Q6|2}Q7p4RQ9d7rQ;c%fQ;{;dQ;|<dT<c1S;kS,Q&c7sR1{,QS*o%]/xR0k*oQ1^+dR5s1^U+j&X1S<SR1e+jQ+x&`Q1k+qT1q+x1kQ8f6TR9s8fQwOS&Tw&UT&Ux*vQ,e&sR2_,eW)z$Y*v/v5dR/|)zU/w)v){0oR5R/w[*z%g%h*]2h2o3VR0u*zQ,i&wR2b,iQ-h'eQ3U-dT3W-h3UQ3R-`R7S3RQ-m'jQ2Z,bT3[-m2ZQ-V'^R2u-VS%rm7[R+P%rdnOwx!g&U'w(T*v.O.tR%wnQ0|+WR5h0|Q.]'|R3p.]Q2O,SR6[2OU*s%b*};eR0n*sS1o+s0vR6O1oQ7v4TQ9Y7iU9k7v9Y:XR:X9`$O!SO[_ewx!f!g!u!}#O#V#Z$U$V$g$n%W&U&W&[&e&h&o&z'R'b'e'w(T(e(j)o)u*v*{+a+f+y,^,p,|-P-X-d-e-h-v-{.O.k.t.v.|1[1]1a1n1s1u2U2n2v3U3X3s4O5t8eR&i!SQ4d.zR8Q4dQ2V,ZR6c2VS/l)d)eR4y/l^(t#b(p(q(r/]/_4rR/`(tQ8V4pR9p8VT)f$P*{!USO[wx!g!k%o&U&{'O'Q'e,v-d-e-h2k3U6m6t8q9v9z:b:g:pj${a{$m%_+o,W1i2S5{7Q8}9i:`Y%Ve$g(e1x3sY%]f$h(l)q*qQ&l!WQ&m!XQ'S!nQ'Z!rQ']!sQ'd!vQ'f!xQ(d#XQ(h#YS(k#[+_Q(|#hQ(}#kQ)W#nQ)X#sQ)Y#tQ)Z#uQ)[#vQ)]#wQ)^#xQ)_#yQ)`#zQ)a#{Q)b#|Q)c#}S)d$P*{Q)p$WQ)v$YQ)}$[Q+^&SS+l&Y1YQ,T&dQ,X&hQ,o&zQ,z'RQ-o'lQ-p'mS.T'|.]Q/Q(cS/x)w0pS0h*m4kQ0j*nQ0o*vQ0q*wQ1P+]S1h+m+pQ2R,UQ2i,sS2p,|7VQ3]-nQ3m.WQ3n.XQ4m/UQ4n/XQ4t/dQ4w/kQ4}/tQ5P/vQ5T/{Q5U/}Q5n1TQ5z1jQ6R1tQ6`2US6o2n9OQ6s2qQ6}3PQ7U3XQ7{4YQ7|4]Q8O4bQ8^5dQ8_5oQ8m6iQ8p6pQ8t6rQ8|7OS9_7l7wQ9f7tQ9u8oQ9{8wS:W9]9aQ:_9gQ:d9yS:j:V:YR:s:lR,[&hd]Owx!g&U'w(T*v.O.t!v^[_`!f!}#O$U$f$n$u$w&W&[&e&o&t&z'R'e)u*b*{+a,^,p,|-P-d-e-h-v-{.k.v1[1]1n2n3U3X3s4O#r$}ae!u$g%O%P%U%W%Z%f&Y&d&h'b(e*e*g*i*k+m+p,U-X-^0e0f1Y1j1u2U2v2z2{2}3P4R6{6|7O7o7p7r7t8e8z9c9d9g:];b;c;d;j;k;y;z;{;|<Q<R<b<c<dQ%vnS+i&X+jW+w&`+q+x1kU,P&c,Q7sQ1s+yT5m1S<S``Owx!g&U'w*v.OS$f[-vQ$u_b%Ze$g&h(e-X1u2U2v8e!h&t!f!}#O$U$n&W&[&e&o&z'R'e(T)u*{+a,^,p,|-P-d-e-h-{.k.t.v1[1]1n2n3U3X3s4OQ'c!uS(b#V+fQ(i#ZS)n$V(jQ*i%WQ-['bQ/s)oQ1r+yQ5u1aQ6Q1sR8`5tS(Z#R3gS([#S3hV(]#T+g3fR$`Ye0Y*S0U0V0W0Z5X5Y5Z5^8[W(U#R#S#T+gQ(_#US.b(Q(XS.h(S.fQ/P(aW1z,O.`6X6ZQ3e-{Q3r._Q3y.gQ4a.xU7_3f3g3hQ7g3zR9W7fQ.i(SR3w.fT.s(T.tdgOwx!g&U&o'w*v-{.OU$i[,^-vQ&u!fQ'n!}Q'x#OQ)m$UQ*_$n`+b&W&[&e*{1[1]1n3sQ,q&zQ,{'RY-f'e-d-h3U3XS.n(T.tQ/u)uQ1R+aS2g,p-eS2r,|-PS3}.k.vQ6q2nR7m4Od]Owx!g&U'w(T*v.O.t!v^[_`!f!}#O$U$f$n$u$w&W&[&e&o&t&z'R'e)u*b*{+a,^,p,|-P-d-e-h-v-{.k.v1[1]1n2n3U3X3s4OR%vnQ4T.nQ7i3}Q7q4RQ7y4UQ7z4VQ9`7mU9b7o7p7rQ9j7uS:[9c9dR:m:]Z+t&[&e*{1[3spzOnpwx!g%y&U'w(T*v-w.O.m.t.v[%Qa%f1S;j;k<SU%Ye%j1[Q%gg^&f{|%k1W5k;l<TQ'v#OQ*]$ib*d%O%P%U;b;c;d<b<c<dQ,g&uQ.P'xQ0c*_[0d*e*g;y;z;{;|Q0s*yQ1U+bQ2h,qQ2o,{S3V-f2gU5a0e<Q<RQ5l1RQ6v2rR8s6qQ,S&cR9e7sS1y,O.`Q8h6XR8i6Z[%`f$h(l)q)w0pR0l*qR+e&WQ+d&WR5r1]S&Zy+}Q*l%ZU+k&X1S<SS+r&[1[W+u&]1W5k<TQ-q'nQ/p)mS0g*i*kQ1Z+bQ1f+jQ5O/uQ5b0fQ5j1RQ6P1rR8c6QR6U1uYvOwx&U*vR&v!gW%ig,q,{-fT*^$i2gT)|$Y*v[uOwx!g&U*vQ'P!kQ+O%oQ,u&{Q,y'QQ2l,vQ6l2kQ8n6mQ8v6tQ9x8qQ:c9vQ:f9zQ:o:bQ:q:gR:u:pxlOwx!g!k%o&U&{'Q*v,v2k6m6t8q9v9z:b:g:pU$j['O-eX-g'e-d-h3UQ-c'cR2y-[S-`'c-[Q2|-^Q3S-aU6z2z2{2}Q7R3QS8y6{6|R9}8zQ'`!tR-Z'a[rOwx!g&U*vS-x'w.OT.o(T.tR+X%{[sOwx!g&U*vS-z'w.OT.p(T.t[tOwx!g&U*vT.q(T.tT.['|.]X%cf%m0p1YQ/O(_R4i/PR.{(^R(g#XQ(w#bU/[(p(q(rS4o/]/_R8X4rR/_(rR4q/^",
  nodeNames: "⚠ RawString > MacroName LineComment BlockComment PreprocDirective #include String EscapeSequence SystemLibString Identifier ) ( ArgumentList ConditionalExpression AssignmentExpression CallExpression PrimitiveType FieldExpression FieldIdentifier DestructorName TemplateMethod ScopedFieldIdentifier NamespaceIdentifier TemplateType TypeIdentifier ScopedTypeIdentifier ScopedNamespaceIdentifier :: NamespaceIdentifier TypeIdentifier TemplateArgumentList < TypeDescriptor const volatile restrict _Atomic mutable constexpr constinit consteval StructSpecifier struct MsDeclspecModifier __declspec Attribute AttributeName Identifier AttributeArgs { } [ ] UpdateOp ArithOp ArithOp ArithOp LogicOp BitOp BitOp BitOp CompareOp CompareOp CompareOp > CompareOp BitOp UpdateOp , Number CharLiteral AttributeArgs VirtualSpecifier BaseClassClause Access virtual FieldDeclarationList FieldDeclaration extern static register inline thread_local AttributeSpecifier __attribute__ PointerDeclarator MsBasedModifier __based MsPointerModifier FunctionDeclarator ParameterList ParameterDeclaration PointerDeclarator FunctionDeclarator Noexcept noexcept RequiresClause requires True False ParenthesizedExpression CommaExpression LambdaExpression LambdaCaptureSpecifier TemplateParameterList OptionalParameterDeclaration TypeParameterDeclaration typename class VariadicParameterDeclaration VariadicDeclarator ReferenceDeclarator OptionalTypeParameterDeclaration VariadicTypeParameterDeclaration TemplateTemplateParameterDeclaration template AbstractFunctionDeclarator AbstractPointerDeclarator AbstractArrayDeclarator AbstractParenthesizedDeclarator AbstractReferenceDeclarator ThrowSpecifier throw TrailingReturnType CompoundStatement FunctionDefinition MsCallModifier TryStatement try CatchClause catch LinkageSpecification Declaration InitDeclarator InitializerList InitializerPair SubscriptDesignator FieldDesignator ExportDeclaration export ImportDeclaration import ModuleName PartitionName HeaderName CaseStatement case default LabeledStatement StatementIdentifier ExpressionStatement IfStatement if ConditionClause Declaration else SwitchStatement switch DoStatement do while WhileStatement ForStatement for ReturnStatement return BreakStatement break ContinueStatement continue GotoStatement goto CoReturnStatement co_return CoYieldStatement co_yield AttributeStatement ForRangeLoop AliasDeclaration using TypeDefinition typedef PointerDeclarator FunctionDeclarator ArrayDeclarator ParenthesizedDeclarator ThrowStatement NamespaceDefinition namespace ScopedIdentifier Identifier OperatorName operator ArithOp BitOp CompareOp LogicOp new delete co_await ConceptDefinition concept UsingDeclaration enum StaticAssertDeclaration static_assert ConcatenatedString TemplateDeclaration FriendDeclaration friend union FunctionDefinition ExplicitFunctionSpecifier explicit FieldInitializerList FieldInitializer DefaultMethodClause DeleteMethodClause FunctionDefinition OperatorCast operator TemplateInstantiation FunctionDefinition FunctionDefinition Declaration ModuleDeclaration module RequiresExpression RequirementList SimpleRequirement TypeRequirement CompoundRequirement ReturnTypeRequirement ConstraintConjuction LogicOp ConstraintDisjunction LogicOp ArrayDeclarator ParenthesizedDeclarator ReferenceDeclarator TemplateFunction OperatorName StructuredBindingDeclarator ArrayDeclarator ParenthesizedDeclarator ReferenceDeclarator BitfieldClause FunctionDefinition FunctionDefinition Declaration FunctionDefinition Declaration AccessSpecifier UnionSpecifier ClassSpecifier EnumSpecifier SizedTypeSpecifier TypeSize EnumeratorList Enumerator DependentType Decltype decltype auto PlaceholderTypeSpecifier ParameterPackExpansion ParameterPackExpansion FieldIdentifier PointerExpression SubscriptExpression BinaryExpression ArithOp LogicOp LogicOp BitOp UnaryExpression LogicOp BitOp UpdateExpression CastExpression SizeofExpression sizeof CoAwaitExpression CompoundLiteralExpression NULL NewExpression new NewDeclarator DeleteExpression delete ParameterPackExpansion nullptr this UserDefinedLiteral ParamPack #define PreprocArg #if #ifdef #ifndef #else #endif #elif PreprocDirectiveName Macro Program",
  maxTerm: 433,
  nodeProps: [
    ["group", -35, 1, 8, 11, 15, 16, 17, 19, 71, 72, 100, 101, 102, 104, 191, 208, 229, 242, 243, 270, 271, 272, 277, 280, 281, 282, 284, 285, 286, 287, 290, 292, 293, 294, 295, 296, "Expression", -13, 18, 25, 26, 27, 43, 255, 256, 257, 258, 262, 263, 265, 266, "Type", -19, 126, 129, 147, 150, 152, 153, 158, 160, 163, 164, 166, 168, 170, 172, 174, 176, 178, 179, 188, "Statement"],
    ["isolate", -4, 4, 5, 8, 10, ""],
    ["openedBy", 12, "(", 52, "{", 54, "["],
    ["closedBy", 13, ")", 51, "}", 53, "]"]
  ],
  propSources: [K0],
  skippedNodes: [0, 3, 4, 5, 6, 7, 10, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 308, 349, 350],
  repeatNodeCount: 43,
  tokenData: "&AbMfR!UOX$eXY/]YZ5gZ]$e]^1g^p$epq/]qr5}rs8Zst:Ttu$euv!AWvw!Cbwx!Eqxy!Flyz!Gmz{!Hn{|!Iw|}!LX}!O!MY!O!P# m!P!Q#8a!Q!R#@T!R![$'k![!]$@f!]!^$Bn!^!_$Co!_!`%C`!`!a%Dg!a!b%HP!b!c$e!c!n%IQ!n!o%Jl!o!w%IQ!w!x%Jl!x!}%IQ!}#O%Mx#O#P& }#P#Q&3[#Q#R&5a#R#S%IQ#S#T$e#T#i%IQ#i#j&6j#j#o%IQ#o#p&8[#p#q&9]#q#r&;o#r#s&<p#s;'S$e;'S;=`/V<%lO$e,j$n[)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$e,f%kY)d`'f,UOY%dZw%dwx&Zx!P%d!P!Q(z!Q#O%d#O#P'b#P;'S%d;'S;=`*g<%lO%d,U&`W'f,UOY&ZZ!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z,U&{TOz&Z{!P&Z!Q;'S&Z;'S;=`'[<%lO&Z,U'_P;=`<%l&Z,U'gZ'f,UOY&ZYZ&ZZ]&Z]^(Y^!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z,U(_X'f,UOY&ZYZ&ZZ!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z,f)P])d`OY%dYZ&ZZw%dwx&Zxz%dz{)x{!P%d!P!Q)x!Q#O%d#O#P&Z#P;'S%d;'S;=`*g<%lO%d`)}U)d`OY)xZw)xx#O)x#P;'S)x;'S;=`*a<%lO)x`*dP;=`<%l)x,f*jP;=`<%l%d,Y*tY(wS'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q#O*m#O#P'b#P;'S*m;'S;=`-P<%lO*m,Y+i](wSOY*mYZ&ZZr*mrs&Zsz*mz{,b{!P*m!P!Q,b!Q#O*m#O#P&Z#P;'S*m;'S;=`-P<%lO*mS,gU(wSOY,bZr,bs#O,b#P;'S,b;'S;=`,y<%lO,bS,|P;=`<%l,b,Y-SP;=`<%l*m,j-^_)d`(wSOY$eYZ&ZZr$ers%dsw$ewx*mxz$ez{.]{!P$e!P!Q.]!Q#O$e#O#P&Z#P;'S$e;'S;=`/V<%lO$ed.dX)d`(wSOY.]Zr.]rs)xsw.]wx,bx#O.]#P;'S.];'S;=`/P<%lO.]d/SP;=`<%l.],j/YP;=`<%l$eMf/jb)d`(wS(p<`'f,U*c1pOX$eXY/]YZ0rZ]$e]^1g^p$epq/]qr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P2z#P;'S$e;'S;=`/V<%lO$e<`0wT(p<`XY0rYZ0r]^0rpq0r#O#P1W<`1ZQYZ0r]^1a<`1dPYZ0rGz1rb)d`(wS(p<`'f,UOX$eXY1gYZ0rZ]$e]^1g^p$epq1gqr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P2z#P;'S$e;'S;=`/V<%lO$eGf3PZ'f,UOY&ZYZ3rZ]&Z]^4u^!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&ZGf3y^(p<`'f,UOX&ZXY3rYZ0rZ]&Z]^3r^p&Zpq3rq!P&Z!P!Q&x!Q#O&Z#O#P2z#P;'S&Z;'S;=`'[<%lO&ZGf4zX'f,UOY&ZYZ3rZ!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&ZMQ5nT*`1p(p<`XY0rYZ0r]^0rpq0r#O#P1WF`6[^%^#t'QQ)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!_$e!_!`7W!`#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`7e[%]#t!a8O)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eKz8f[)d`(uS(v=j'f,UOY%dZr%drs9[sw%dwx&Zx!P%d!P!Q(z!Q#O%d#O#P'b#P;'S%d;'S;=`*g<%lO%d/[9eY*P#t)d`'f,UOY%dZw%dwx&Zx!P%d!P!Q(z!Q#O%d#O#P'b#P;'S%d;'S;=`*g<%lO%dGz:^h)d`(wS'f,UOX$eXY:TZp$epq:Tqr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!c$e!c!};x!}#O$e#O#P'b#P#T$e#T#W;x#W#X=`#X#YFz#Y#];x#]#^!)O#^#o;x#o;'S$e;'S;=`/V<%lO$eGz<Tc)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#o;x#o;'S$e;'S;=`/V<%lO$eGz=ke)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#X;x#X#Y>|#Y#o;x#o;'S$e;'S;=`/V<%lO$eGz?Xe)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#Y;x#Y#Z@j#Z#o;x#o;'S$e;'S;=`/V<%lO$eGz@ue)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#];x#]#^BW#^#o;x#o;'S$e;'S;=`/V<%lO$eGzBce)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#b;x#b#cCt#c#o;x#o;'S$e;'S;=`/V<%lO$eGzDPe)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#X;x#X#YEb#Y#o;x#o;'S$e;'S;=`/V<%lO$eGzEoc)d`(wS'e<`'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#o;x#o;'S$e;'S;=`/V<%lO$eGzGVg)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#`;x#`#aHn#a#b;x#b#c!!n#c#o;x#o;'S$e;'S;=`/V<%lO$eGzHyg)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#];x#]#^Jb#^#g;x#g#hMh#h#o;x#o;'S$e;'S;=`/V<%lO$eGzJme)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#Y;x#Y#ZLO#Z#o;x#o;'S$e;'S;=`/V<%lO$eGzL]c)d`(wS'f,U'l<`'m<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#o;x#o;'S$e;'S;=`/V<%lO$eGzMse)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#X;x#X#Y! U#Y#o;x#o;'S$e;'S;=`/V<%lO$eGz! cc)d`(wS'j<`'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#o;x#o;'S$e;'S;=`/V<%lO$eGz!!ye)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#W;x#W#X!$[#X#o;x#o;'S$e;'S;=`/V<%lO$eGz!$ge)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#];x#]#^!%x#^#o;x#o;'S$e;'S;=`/V<%lO$eGz!&Te)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#Y;x#Y#Z!'f#Z#o;x#o;'S$e;'S;=`/V<%lO$eGz!'sc)d`(wS'f,U'k<`'m<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#o;x#o;'S$e;'S;=`/V<%lO$eGz!)Zg)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#Y;x#Y#Z!*r#Z#b;x#b#c!7l#c#o;x#o;'S$e;'S;=`/V<%lO$eGz!+Pg)d`(wS'g<`'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#W;x#W#X!,h#X#b;x#b#c!1[#c#o;x#o;'S$e;'S;=`/V<%lO$eGz!,se)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#X;x#X#Y!.U#Y#o;x#o;'S$e;'S;=`/V<%lO$eGz!.ae)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#Y;x#Y#Z!/r#Z#o;x#o;'S$e;'S;=`/V<%lO$eGz!0Pc)d`(wS'h<`'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#o;x#o;'S$e;'S;=`/V<%lO$eGz!1ge)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#W;x#W#X!2x#X#o;x#o;'S$e;'S;=`/V<%lO$eGz!3Te)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#X;x#X#Y!4f#Y#o;x#o;'S$e;'S;=`/V<%lO$eGz!4qe)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#Y;x#Y#Z!6S#Z#o;x#o;'S$e;'S;=`/V<%lO$eGz!6ac)d`(wS'i<`'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#o;x#o;'S$e;'S;=`/V<%lO$eGz!7we)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#V;x#V#W!9Y#W#o;x#o;'S$e;'S;=`/V<%lO$eGz!9ee)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#`;x#`#a!:v#a#o;x#o;'S$e;'S;=`/V<%lO$eGz!;Re)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#i;x#i#j!<d#j#o;x#o;'S$e;'S;=`/V<%lO$eGz!<oe)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#W;x#W#X!>Q#X#o;x#o;'S$e;'S;=`/V<%lO$eGz!>]e)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#X;x#X#Y!?n#Y#o;x#o;'S$e;'S;=`/V<%lO$eGz!?{c)d`(wSV<`'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#o;x#o;'S$e;'S;=`/V<%lO$eF`!Ae^)d`(wS%Z#t![8O'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!_$e!_!`!Ba!`#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`!Bl[!g:t)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`!Co_)^8O)d`(wS%[#t'f,UOY$eZr$ers%dsv$evw!Dnwx*mx!P$e!P!Q-V!Q!_$e!_!`!Ba!`#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`!D{[)]8O%^#t)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCb!E|Y)bW(wS)c8O'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q#O*m#O#P'b#P;'S*m;'S;=`-P<%lO*mLS!Fw[)d`(wS]Kn'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$e-^!Gx[[r)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`!H{^)Z8O)d`(wS%Z#t'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!_$e!_!`!Ba!`#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`!JU`)d`(wS%Z#t!Y8O'f,UOY$eZr$ers%dsw$ewx*mx{$e{|!KW|!P$e!P!Q-V!Q!_$e!_!`!Ba!`#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`!Kc[)d`!X:t(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCr!Ld[!h8W)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`!Mga)d`(wS%Z#t!Y8O'f,UOY$eZr$ers%dsw$ewx*mx}$e}!O!KW!O!P$e!P!Q-V!Q!_$e!_!`!Ba!`!a!Nl!a#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`!Nw[)O:t)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCr# x^)d`(wS'f,U(}8OOY$eZr$ers%dsw$ewx*mx!O$e!O!P#!t!P!Q-V!Q![#$w![#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCr#!}])d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!O$e!O!P##v!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCr#$R[)a8W)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCj#%So)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx#'Tx!P$e!P!Q-V!Q![#$w![!g$e!g!h#1O!h!i#6j!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#X$e#X#Y#1O#Y#Z#6j#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eCY#'[Z(wS'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q![#'}![#O*m#O#P'b#P;'S*m;'S;=`-P<%lO*mCY#(Wo(wS!i8O'f,UOY*mZr*mrs&Zsw*mwx#'Tx!P*m!P!Q+d!Q![#'}![!g*m!g!h#*X!h!i#/a!i!n*m!n!o#/a!o!r*m!r!s#*X!s!w*m!w!x#/a!x#O*m#O#P'b#P#X*m#X#Y#*X#Y#Z#/a#Z#`*m#`#a#/a#a#d*m#d#e#*X#e#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCY#*bm(wS!i8O'f,UOY*mZr*mrs&Zs{*m{|#,]|}*m}!O#,]!O!P*m!P!Q+d!Q![#-c![!c*m!c!h#-c!h!i#-c!i!n*m!n!o#/a!o!w*m!w!x#/a!x#O*m#O#P'b#P#T*m#T#Y#-c#Y#Z#-c#Z#`*m#`#a#/a#a#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCY#,d_(wS'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q![#-c![!c*m!c!i#-c!i#O*m#O#P'b#P#T*m#T#Z#-c#Z;'S*m;'S;=`-P<%lO*mCY#-lk(wS!i8O'f,UOY*mZr*mrs&Zsw*mwx#,]x!P*m!P!Q+d!Q![#-c![!c*m!c!h#-c!h!i#-c!i!n*m!n!o#/a!o!w*m!w!x#/a!x#O*m#O#P'b#P#T*m#T#Y#-c#Y#Z#-c#Z#`*m#`#a#/a#a#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCY#/jf(wS!i8O'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q!h*m!h!i#/a!i!n*m!n!o#/a!o!w*m!w!x#/a!x#O*m#O#P'b#P#Y*m#Y#Z#/a#Z#`*m#`#a#/a#a#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCj#1Zo)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx*mx{$e{|#3[|}$e}!O#3[!O!P$e!P!Q-V!Q![#4j![!c$e!c!h#4j!h!i#4j!i!n$e!n!o#6j!o!w$e!w!x#6j!x#O$e#O#P'b#P#T$e#T#Y#4j#Y#Z#4j#Z#`$e#`#a#6j#a#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eCj#3ea)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![#4j![!c$e!c!i#4j!i#O$e#O#P'b#P#T$e#T#Z#4j#Z;'S$e;'S;=`/V<%lO$eCj#4uk)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx#,]x!P$e!P!Q-V!Q![#4j![!c$e!c!h#4j!h!i#4j!i!n$e!n!o#6j!o!w$e!w!x#6j!x#O$e#O#P'b#P#T$e#T#Y#4j#Y#Z#4j#Z#`$e#`#a#6j#a#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eCj#6uh)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!h$e!h!i#6j!i!n$e!n!o#6j!o!w$e!w!x#6j!x#O$e#O#P'b#P#Y$e#Y#Z#6j#Z#`$e#`#a#6j#a#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eMf#8la)d`(wS%Z#t![8OOY$eYZ&ZZr$ers%dsw$ewx*mxz$ez{#9q{!P$e!P!Q#:g!Q!_$e!_!`!Ba!`#O$e#O#P&Z#P;'S$e;'S;=`/V<%lO$eMf#9zX)d`(wS(qMQOY.]Zr.]rs)xsw.]wx,bx#O.]#P;'S.];'S;=`/P<%lO.]Mf#:pY)d`(wSSMQOY#:gZr#:grs#;`sw#:gwx#?Wx#O#:g#O#P#<h#P;'S#:g;'S;=`#?}<%lO#:gMb#;gW)d`SMQOY#;`Zw#;`wx#<Px#O#;`#O#P#<h#P;'S#;`;'S;=`#?Q<%lO#;`MQ#<UUSMQOY#<PZ#O#<P#O#P#<h#P;'S#<P;'S;=`#>z<%lO#<PMQ#<mUSMQOY#<PZ#O#<P#O#P#=P#P;'S#<P;'S;=`#>z<%lO#<PMQ#=UYSMQOY#<PZ#O#<P#O#P#=P#P#b#<P#b#c#<P#c#f#<P#f#g#=t#g;'S#<P;'S;=`#>z<%lO#<PMQ#=yUSMQOY#<PZ#O#<P#O#P#>]#P;'S#<P;'S;=`#>z<%lO#<PMQ#>bWSMQOY#<PZ#O#<P#O#P#=P#P#b#<P#b#c#<P#c;'S#<P;'S;=`#>z<%lO#<PMQ#>}P;=`<%l#<PMb#?TP;=`<%l#;`MU#?_W(wSSMQOY#?WZr#?Wrs#<Ps#O#?W#O#P#<h#P;'S#?W;'S;=`#?w<%lO#?WMU#?zP;=`<%l#?WMf#@QP;=`<%l#:gCj#@`t)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx#Bpx!O$e!O!P#NV!P!Q-V!Q![$'k![!g$e!g!h#1O!h!i#6j!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#U$e#U#V$)z#V#X$e#X#Y#1O#Y#Z#6j#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j#l$e#l#m$<_#m;'S$e;'S;=`/V<%lO$eCY#BwZ(wS'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q![#Cj![#O*m#O#P'b#P;'S*m;'S;=`-P<%lO*mCY#Csp(wS!i8O'f,UOY*mZr*mrs&Zsw*mwx#Bpx!O*m!O!P#Ew!P!Q+d!Q![#Cj![!g*m!g!h#*X!h!i#/a!i!n*m!n!o#/a!o!r*m!r!s#*X!s!w*m!w!x#/a!x#O*m#O#P'b#P#X*m#X#Y#*X#Y#Z#/a#Z#`*m#`#a#/a#a#d*m#d#e#*X#e#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCY#FQo(wS!i8O'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q![#HR![!c*m!c!g#HR!g!h#Ki!h!i#HR!i!n*m!n!o#/a!o!r*m!r!s#*X!s!w*m!w!x#/a!x#O*m#O#P'b#P#T*m#T#X#HR#X#Y#Ki#Y#Z#HR#Z#`*m#`#a#/a#a#d*m#d#e#*X#e#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCY#H[q(wS!i8O'f,UOY*mZr*mrs&Zsw*mwx#Jcx!P*m!P!Q+d!Q![#HR![!c*m!c!g#HR!g!h#Ki!h!i#HR!i!n*m!n!o#/a!o!r*m!r!s#*X!s!w*m!w!x#/a!x#O*m#O#P'b#P#T*m#T#X#HR#X#Y#Ki#Y#Z#HR#Z#`*m#`#a#/a#a#d*m#d#e#*X#e#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCY#Jj_(wS'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q![#HR![!c*m!c!i#HR!i#O*m#O#P'b#P#T*m#T#Z#HR#Z;'S*m;'S;=`-P<%lO*mCY#Kru(wS!i8O'f,UOY*mZr*mrs&Zsw*mwx#Jcx{*m{|#,]|}*m}!O#,]!O!P*m!P!Q+d!Q![#HR![!c*m!c!g#HR!g!h#Ki!h!i#HR!i!n*m!n!o#/a!o!r*m!r!s#*X!s!w*m!w!x#/a!x#O*m#O#P'b#P#T*m#T#X#HR#X#Y#Ki#Y#Z#HR#Z#`*m#`#a#/a#a#d*m#d#e#*X#e#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCj#Nbq)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![$!i![!c$e!c!g$!i!g!h$${!h!i$!i!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#T$e#T#X$!i#X#Y$${#Y#Z$!i#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eCj$!tq)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx#Jcx!P$e!P!Q-V!Q![$!i![!c$e!c!g$!i!g!h$${!h!i$!i!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#T$e#T#X$!i#X#Y$${#Y#Z$!i#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eCj$%Wu)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx#Jcx{$e{|#3[|}$e}!O#3[!O!P$e!P!Q-V!Q![$!i![!c$e!c!g$!i!g!h$${!h!i$!i!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#T$e#T#X$!i#X#Y$${#Y#Z$!i#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eCj$'vp)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx#Bpx!O$e!O!P#NV!P!Q-V!Q![$'k![!g$e!g!h#1O!h!i#6j!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#X$e#X#Y#1O#Y#Z#6j#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eCj$*T_)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!O$e!O!P$+S!P!Q-V!Q!R$,U!R![$'k![#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCj$+]])d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![#$w![#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCj$,at)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx#Bpx!O$e!O!P#NV!P!Q-V!Q![$'k![!g$e!g!h#1O!h!i#6j!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#U$e#U#V$.q#V#X$e#X#Y#1O#Y#Z#6j#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j#l$e#l#m$/s#m;'S$e;'S;=`/V<%lO$eCj$.z])d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![$'k![#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCj$/|a)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![$1R![!c$e!c!i$1R!i#O$e#O#P'b#P#T$e#T#Z$1R#Z;'S$e;'S;=`/V<%lO$eCj$1^r)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx$3hx!O$e!O!P#NV!P!Q-V!Q![$1R![!c$e!c!g$1R!g!h$9o!h!i$1R!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#T$e#T#X$1R#X#Y$9o#Y#Z$1R#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eCY$3o_(wS'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q![$4n![!c*m!c!i$4n!i#O*m#O#P'b#P#T*m#T#Z$4n#Z;'S*m;'S;=`-P<%lO*mCY$4wr(wS!i8O'f,UOY*mZr*mrs&Zsw*mwx$3hx!O*m!O!P#Ew!P!Q+d!Q![$4n![!c*m!c!g$4n!g!h$7R!h!i$4n!i!n*m!n!o#/a!o!r*m!r!s#*X!s!w*m!w!x#/a!x#O*m#O#P'b#P#T*m#T#X$4n#X#Y$7R#Y#Z$4n#Z#`*m#`#a#/a#a#d*m#d#e#*X#e#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCY$7[u(wS!i8O'f,UOY*mZr*mrs&Zsw*mwx$3hx{*m{|#,]|}*m}!O#,]!O!P#Ew!P!Q+d!Q![$4n![!c*m!c!g$4n!g!h$7R!h!i$4n!i!n*m!n!o#/a!o!r*m!r!s#*X!s!w*m!w!x#/a!x#O*m#O#P'b#P#T*m#T#X$4n#X#Y$7R#Y#Z$4n#Z#`*m#`#a#/a#a#d*m#d#e#*X#e#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCj$9zu)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx$3hx{$e{|#3[|}$e}!O#3[!O!P#NV!P!Q-V!Q![$1R![!c$e!c!g$1R!g!h$9o!h!i$1R!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#T$e#T#X$1R#X#Y$9o#Y#Z$1R#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eCj$<hc)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!O$e!O!P$+S!P!Q-V!Q!R$=s!R![$1R![!c$e!c!i$1R!i#O$e#O#P'b#P#T$e#T#Z$1R#Z;'S$e;'S;=`/V<%lO$eCj$>Ov)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx$3hx!O$e!O!P#NV!P!Q-V!Q![$1R![!c$e!c!g$1R!g!h$9o!h!i$1R!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#T$e#T#U$1R#U#V$1R#V#X$1R#X#Y$9o#Y#Z$1R#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j#l$e#l#m$/s#m;'S$e;'S;=`/V<%lO$eGz$@q^(|9b)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![$e![!]$Am!]#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eFh$Ax[m:|)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCj$By[)`8O)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eM^$C|aq8O%]#t)d`(wS'f,UOY$ERYZ$FZZr$ERrs$Fxsw$ERwx%4^x!P$ER!P!Q%8|!Q!^$ER!^!_%=a!_!`%?z!`!a%B_!a#O$ER#O#P%.w#P;'S$ER;'S;=`%=Z<%lO$ER3h$E[_)d`(wS'f,UOY$ERYZ$FZZr$ERrs$Fxsw$ERwx%4^x!P$ER!P!Q%8|!Q!`$ER!`!a%<W!a#O$ER#O#P%.w#P;'S$ER;'S;=`%=Z<%lO$ER!b$F^TO!`$FZ!`!a$Fm!a;'S$FZ;'S;=`$Fr<%lO$FZ!b$FrO$W!b!b$FuP;=`<%l$FZ3d$GP])d`'f,UOY$FxYZ$FZZw$Fxwx$Gxx!P$Fx!P!Q%0n!Q!`$Fx!`!a%3]!a#O$Fx#O#P%.w#P;'S$Fx;'S;=`%4W<%lO$Fx3S$G}Z'f,UOY$GxYZ$FZZ!P$Gx!P!Q$Hp!Q!`$Gx!`!a%$S!a#O$Gx#O#P%.w#P;'S$Gx;'S;=`%0h<%lO$Gx3S$Hs]OY$GxYZ$IlZz$Gxz{$Mo{!P$Gx!P!Q$Mo!Q!`$Gx!`!a%$S!a#O$Gx#O#P%$u#P;'S$Gx;'S;=`%0h<%lO$Gx-h$IqZ'f,UOY$IlYZ$FZZ!P$Il!P!Q$Jd!Q!`$Il!`!a$KS!a#O$Il#O#P$Ky#P;'S$Il;'S;=`$Ks<%lO$Il-h$JgXOz$Ilz{$FZ{!P$Il!P!Q$FZ!Q!`$Il!`!a$KS!a;'S$Il;'S;=`$Ks<%lO$Il-h$KZW$W!b'f,UOY&ZZ!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z-h$KvP;=`<%l$Il-h$LO]'f,UOY$IlYZ$IlZ]$Il]^$Lw^!P$Il!P!Q$Jd!Q!`$Il!`!a$KS!a#O$Il#O#P$Ky#P;'S$Il;'S;=`$Ks<%lO$Il-h$L|Z'f,UOY$IlYZ$IlZ!P$Il!P!Q$Jd!Q!`$Il!`!a$KS!a#O$Il#O#P$Ky#P;'S$Il;'S;=`$Ks<%lO$Il'|$MrXOY$MoYZ$FZZ!`$Mo!`!a$N_!a#O$Mo#O#P$Nf#P;'S$Mo;'S;=`%#|<%lO$Mo'|$NfO$W!bY&j'|$NiUO!`$Mo!`!a$N{!a;'S$Mo;'S;=`%#^;=`<%l% j<%lO$Mo'|% QW$W!bOY% jZ!`% j!`!a%!V!a#O% j#O#P%![#P;'S% j;'S;=`%#W<%lO% j&j% mWOY% jZ!`% j!`!a%!V!a#O% j#O#P%![#P;'S% j;'S;=`%#W<%lO% j&j%![OY&j&j%!_RO;'S% j;'S;=`%!h;=`O% j&j%!kXOY% jZ!`% j!`!a%!V!a#O% j#O#P%![#P;'S% j;'S;=`%#W;=`<%l% j<%lO% j&j%#ZP;=`<%l% j'|%#aXOY% jZ!`% j!`!a%!V!a#O% j#O#P%![#P;'S% j;'S;=`%#W;=`<%l$Mo<%lO% j'|%$PP;=`<%l$Mo3S%$]W$W!bY&j'f,UOY&ZZ!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z3S%$z['f,UOY$GxYZ$MoZ!P$Gx!P!Q$Hp!Q!`$Gx!`!a%%p!a#O$Gx#O#P%-R#P;'S$Gx;'S;=`%/x;=`<%l% j<%lO$Gx3S%%wY$W!b'f,UOY%&gZ!P%&g!P!Q%'[!Q!`%&g!`!a%(W!a#O%&g#O#P%+b#P;'S%&g;'S;=`%,{<%lO%&g1p%&lY'f,UOY%&gZ!P%&g!P!Q%'[!Q!`%&g!`!a%(W!a#O%&g#O#P%+b#P;'S%&g;'S;=`%,{<%lO%&g1p%'_]OY%&gYZ&ZZz%&gz{% j{!P%&g!P!Q% j!Q!`%&g!`!a%(W!a#O%&g#O#P%(w#P;'S%&g;'S;=`%,{<%lO%&g1p%(_WY&j'f,UOY&ZZ!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z1p%(|Y'f,UOY%&gYZ% jZ!P%&g!P!Q%'[!Q#O%&g#O#P%)l#P;'S%&g;'S;=`%,];=`<%l% j<%lO%&g1p%)q]'f,UOY%&gYZ&ZZ]%&g]^%*j^!P%&g!P!Q%'[!Q!`%&g!`!a%(W!a#O%&g#O#P%+b#P;'S%&g;'S;=`%,{<%lO%&g1p%*oZ'f,UOY%&gYZ&ZZ!P%&g!P!Q%'[!Q!`%&g!`!a%(W!a#O%&g#O#P%+b#P;'S%&g;'S;=`%,{<%lO%&g1p%+g['f,UOY%&gYZ%&gZ]%&g]^%*j^!P%&g!P!Q%'[!Q#O%&g#O#P%)l#P;'S%&g;'S;=`%,];=`<%l% j<%lO%&g1p%,`XOY% jZ!`% j!`!a%!V!a#O% j#O#P%![#P;'S% j;'S;=`%#W;=`<%l%&g<%lO% j1p%-OP;=`<%l%&g3S%-W]'f,UOY$GxYZ$IlZ]$Gx]^%.P^!P$Gx!P!Q$Hp!Q!`$Gx!`!a%$S!a#O$Gx#O#P%.w#P;'S$Gx;'S;=`%0h<%lO$Gx3S%.UZ'f,UOY$GxYZ$IlZ!P$Gx!P!Q$Hp!Q!`$Gx!`!a%$S!a#O$Gx#O#P%.w#P;'S$Gx;'S;=`%0h<%lO$Gx3S%.|^'f,UOY$GxYZ$GxZ]$Gx]^%.P^!P$Gx!P!Q$Hp!Q!`$Gx!`!a%%p!a#O$Gx#O#P%-R#P;'S$Gx;'S;=`%/x;=`<%l% j<%lO$Gx3S%/{XOY% jZ!`% j!`!a%!V!a#O% j#O#P%![#P;'S% j;'S;=`%#W;=`<%l$Gx<%lO% j3S%0kP;=`<%l$Gx3d%0s_)d`OY$FxYZ$IlZw$Fxwx$Gxxz$Fxz{%1r{!P$Fx!P!Q%1r!Q!`$Fx!`!a%3]!a#O$Fx#O#P%$u#P;'S$Fx;'S;=`%4W<%lO$Fx(^%1wZ)d`OY%1rYZ$FZZw%1rwx$Mox!`%1r!`!a%2j!a#O%1r#O#P$Nf#P;'S%1r;'S;=`%3V<%lO%1r(^%2sU$W!bY&j)d`OY)xZw)xx#O)x#P;'S)x;'S;=`*a<%lO)x(^%3YP;=`<%l%1r3d%3hY$W!bY&j)d`'f,UOY%dZw%dwx&Zx!P%d!P!Q(z!Q#O%d#O#P'b#P;'S%d;'S;=`*g<%lO%d3d%4ZP;=`<%l$Fx3W%4e](wS'f,UOY%4^YZ$FZZr%4^rs$Gxs!P%4^!P!Q%5^!Q!`%4^!`!a%7{!a#O%4^#O#P%.w#P;'S%4^;'S;=`%8v<%lO%4^3W%5c_(wSOY%4^YZ$IlZr%4^rs$Gxsz%4^z{%6b{!P%4^!P!Q%6b!Q!`%4^!`!a%7{!a#O%4^#O#P%$u#P;'S%4^;'S;=`%8v<%lO%4^(Q%6gZ(wSOY%6bYZ$FZZr%6brs$Mos!`%6b!`!a%7Y!a#O%6b#O#P$Nf#P;'S%6b;'S;=`%7u<%lO%6b(Q%7cU$W!bY&j(wSOY,bZr,bs#O,b#P;'S,b;'S;=`,y<%lO,b(Q%7xP;=`<%l%6b3W%8WY$W!bY&j(wS'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q#O*m#O#P'b#P;'S*m;'S;=`-P<%lO*m3W%8yP;=`<%l%4^3h%9Ta)d`(wSOY$ERYZ$IlZr$ERrs$Fxsw$ERwx%4^xz$ERz{%:Y{!P$ER!P!Q%:Y!Q!`$ER!`!a%<W!a#O$ER#O#P%$u#P;'S$ER;'S;=`%=Z<%lO$ER(b%:a])d`(wSOY%:YYZ$FZZr%:Yrs%1rsw%:Ywx%6bx!`%:Y!`!a%;Y!a#O%:Y#O#P$Nf#P;'S%:Y;'S;=`%<Q<%lO%:Y(b%;eX$W!bY&j)d`(wSOY.]Zr.]rs)xsw.]wx,bx#O.]#P;'S.];'S;=`/P<%lO.](b%<TP;=`<%l%:Y3h%<e[$W!bY&j)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$e3h%=^P;=`<%l$ERM^%=n`)d`(wS%[#t!f8O'f,UOY$ERYZ$FZZr$ERrs$Fxsw$ERwx%4^x!P$ER!P!Q%8|!Q!_$ER!_!`%>p!`!a%<W!a#O$ER#O#P%.w#P;'S$ER;'S;=`%=Z<%lO$ERM^%>{_!g:t)d`(wS'f,UOY$ERYZ$FZZr$ERrs$Fxsw$ERwx%4^x!P$ER!P!Q%8|!Q!`$ER!`!a%<W!a#O$ER#O#P%.w#P;'S$ER;'S;=`%=Z<%lO$ERM^%@X_%]#t!b8O)d`(wS'f,UOY$ERYZ$FZZr$ERrs$Fxsw$ERwx%4^x!P$ER!P!Q%8|!Q!`$ER!`!a%AW!a#O$ER#O#P%.w#P;'S$ER;'S;=`%=Z<%lO$ERM^%Ai[%]#t!b8O$W!bY&j)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$e2U%Bj[Y&j)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`%Ck^)q#v)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!_$e!_!`7W!`#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`%Dt_%]#t)d`(wS!d8O'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!_$e!_!`%Es!`!a%Fv!a#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`%FQ[%]#t!b8O)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`%GT^)d`(wS%[#t!f8O'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!_$e!_!`!Ba!`#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$e,l%H[[({Q)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eMf%Iac)d`)PW(wS!R7|(x*t'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![%IQ![!c$e!c!}%IQ!}#O$e#O#P'b#P#R$e#R#S%IQ#S#T$e#T#o%IQ#o;'S$e;'S;=`/V<%lO$eMf%J{c)d`)PW(wS!R7|(x*t'f,UOY$eZr$ers%LWsw$ewx%MPx!P$e!P!Q-V!Q![%IQ![!c$e!c!}%IQ!}#O$e#O#P'b#P#R$e#R#S%IQ#S#T$e#T#o%IQ#o;'S$e;'S;=`/V<%lO$eIQ%LaY)d`(v=j'f,UOY%dZw%dwx&Zx!P%d!P!Q(z!Q#O%d#O#P'b#P;'S%d;'S;=`*g<%lO%dCY%MYY(wS)c8O'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q#O*m#O#P'b#P;'S*m;'S;=`-P<%lO*mF`%NT]!V:t)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!}$e!}#O%N|#O#P'b#P;'S$e;'S;=`/V<%lO$e,l& X[)WQ)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eGz&!Sb'f,UOY&#[YZ&#{Z]&#[]^&%Q^!P&#[!P!Q&%t!Q![&&Y![!w&#[!w!x&'p!x#O&#[#O#P&/`#P#i&#[#i#j&+h#j#l&#[#l#m&0Y#m;'S&#[;'S;=`&3U<%lO&#[,j&#cWXd'f,UOY&ZZ!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&ZGz&$U^Xd(p<`'f,UOX&ZXY3rYZ0rZ]&Z]^3r^p&Zpq3rq!P&Z!P!Q&x!Q#O&Z#O#P2z#P;'S&Z;'S;=`'[<%lO&ZGz&%XXXd'f,UOY&ZYZ3rZ!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z,j&%yTXdOz&Z{!P&Z!Q;'S&Z;'S;=`'[<%lO&Z,j&&aXXd'f,UOY&ZZ!P&Z!P!Q&x!Q![&&|![#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z,j&'TXXd'f,UOY&ZZ!P&Z!P!Q&x!Q![&#[![#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z,j&'u]'f,UOY&ZZ!P&Z!P!Q&x!Q![&(n![!c&Z!c!i&(n!i#O&Z#O#P'b#P#T&Z#T#Z&(n#Z;'S&Z;'S;=`'[<%lO&Z,j&(s]'f,UOY&ZZ!P&Z!P!Q&x!Q![&)l![!c&Z!c!i&)l!i#O&Z#O#P'b#P#T&Z#T#Z&)l#Z;'S&Z;'S;=`'[<%lO&Z,j&)q]'f,UOY&ZZ!P&Z!P!Q&x!Q![&*j![!c&Z!c!i&*j!i#O&Z#O#P'b#P#T&Z#T#Z&*j#Z;'S&Z;'S;=`'[<%lO&Z,j&*o]'f,UOY&ZZ!P&Z!P!Q&x!Q![&+h![!c&Z!c!i&+h!i#O&Z#O#P'b#P#T&Z#T#Z&+h#Z;'S&Z;'S;=`'[<%lO&Z,j&+m]'f,UOY&ZZ!P&Z!P!Q&x!Q![&,f![!c&Z!c!i&,f!i#O&Z#O#P'b#P#T&Z#T#Z&,f#Z;'S&Z;'S;=`'[<%lO&Z,j&,k]'f,UOY&ZZ!P&Z!P!Q&x!Q![&-d![!c&Z!c!i&-d!i#O&Z#O#P'b#P#T&Z#T#Z&-d#Z;'S&Z;'S;=`'[<%lO&Z,j&-i]'f,UOY&ZZ!P&Z!P!Q&x!Q![&.b![!c&Z!c!i&.b!i#O&Z#O#P'b#P#T&Z#T#Z&.b#Z;'S&Z;'S;=`'[<%lO&Z,j&.g]'f,UOY&ZZ!P&Z!P!Q&x!Q![&#[![!c&Z!c!i&#[!i#O&Z#O#P'b#P#T&Z#T#Z&#[#Z;'S&Z;'S;=`'[<%lO&Z,j&/gZXd'f,UOY&ZYZ&ZZ]&Z]^(Y^!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z,j&0_]'f,UOY&ZZ!P&Z!P!Q&x!Q![&1W![!c&Z!c!i&1W!i#O&Z#O#P'b#P#T&Z#T#Z&1W#Z;'S&Z;'S;=`'[<%lO&Z,j&1]]'f,UOY&ZZ!P&Z!P!Q&x!Q![&2U![!c&Z!c!i&2U!i#O&Z#O#P'b#P#T&Z#T#Z&2U#Z;'S&Z;'S;=`'[<%lO&Z,j&2]]Xd'f,UOY&ZZ!P&Z!P!Q&x!Q![&2U![!c&Z!c!i&2U!i#O&Z#O#P'b#P#T&Z#T#Z&2U#Z;'S&Z;'S;=`'[<%lO&Z,j&3XP;=`<%l&#[Cr&3g]!W7^)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P#Q&4`#Q;'S$e;'S;=`/V<%lO$e-d&4k[)Vx)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`&5n^)d`(wS%[#t'f,U!_8OOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!_$e!_!`!Ba!`#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eMf&6ye)d`)PW(wS!R7|(x*t'f,UOY$eZr$ers%LWsw$ewx%MPx!P$e!P!Q-V!Q!Y%IQ!Y!Z%Jl!Z![%IQ![!c$e!c!}%IQ!}#O$e#O#P'b#P#R$e#R#S%IQ#S#T$e#T#o%IQ#o;'S$e;'S;=`/V<%lO$eCj&8g[!T8O)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`&9j`)d`(wS%[#t'f,U!^8OOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!_$e!_!`!Ba!`#O$e#O#P'b#P#p$e#p#q&:l#q;'S$e;'S;=`/V<%lO$eF`&:y[)[8O%^#t)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$e-^&;z[!Ur)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$e/j&<}e)d`(wS%[#t'RQ'f,UOX$eXY&>`Zp$epq&>`qr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!c$e!c!}&?z!}#O$e#O#P'b#P#R$e#R#S&?z#S#T$e#T#o&?z#o;'S$e;'S;=`/V<%lO$e,t&>ie)d`(wS'f,UOX$eXY&>`Zp$epq&>`qr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!c$e!c!}&?z!}#O$e#O#P'b#P#R$e#R#S&?z#S#T$e#T#o&?z#o;'S$e;'S;=`/V<%lO$e,t&@Vc)d`(wSeY'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![&?z![!c$e!c!}&?z!}#O$e#O#P'b#P#R$e#R#S&?z#S#T$e#T#o&?z#o;'S$e;'S;=`/V<%lO$e",
  tokenizers: [F0, H0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, new tr("j~RQYZXz{^~^O(s~~aP!P!Qd~iO(t~~", 25, 356)],
  topRules: { Program: [0, 307] },
  dynamicPrecedences: { 17: 1, 65: 1, 87: 1, 94: 1, 119: 1, 184: 1, 187: -10, 240: -10, 241: 1, 244: -1, 246: -10, 247: 1, 262: -1, 267: 2, 268: 2, 306: -10, 371: 3, 425: 1, 426: 3, 427: 1, 428: 1 },
  specialized: [{ term: 362, get: (n) => J0[n] || -1 }, { term: 33, get: (n) => ex[n] || -1 }, { term: 66, get: (n) => tx[n] || -1 }, { term: 369, get: (n) => ix[n] || -1 }],
  tokenPrec: 24852
}), sx = /* @__PURE__ */ ji.define({
  name: "cpp",
  parser: /* @__PURE__ */ nx.configure({
    props: [
      /* @__PURE__ */ $r.add({
        IfStatement: /* @__PURE__ */ yt({ except: /^\s*({|else\b)/ }),
        TryStatement: /* @__PURE__ */ yt({ except: /^\s*({|catch)\b/ }),
        LabeledStatement: IO,
        CaseStatement: (n) => n.baseIndent + n.unit,
        BlockComment: () => null,
        CompoundStatement: /* @__PURE__ */ DO({ closing: "}" }),
        Statement: /* @__PURE__ */ yt({ except: /^{/ })
      }),
      /* @__PURE__ */ Pr.add({
        "DeclarationList CompoundStatement EnumeratorList FieldDeclarationList InitializerList": BO,
        BlockComment(n) {
          return { from: n.from + 2, to: n.to - 2 };
        }
      })
    ]
  }),
  languageData: {
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*(?:case |default:|\{|\})$/,
    closeBrackets: { stringPrefixes: ["L", "u", "U", "u8", "LR", "UR", "uR", "u8R", "R"] }
  }
});
function Ph() {
  return new MO(sx);
}
const rx = "#e5c07b", Sh = "#e06c75", ox = "#56b6c2", Ox = "#ffffff", ks = "#abb2bf", lO = "#7d8799", ax = "#61afef", lx = "#98c379", xh = "#d19a66", hx = "#c678dd", cx = "#21252b", Xh = "#2c313a", bh = "#282c34", ao = "#353a42", fx = "#3E4451", yh = "#528bff", ux = /* @__PURE__ */ Z.theme({
  "&": {
    color: ks,
    backgroundColor: bh
  },
  ".cm-content": {
    caretColor: yh
  },
  ".cm-cursor, .cm-dropCursor": { borderLeftColor: yh },
  "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: fx },
  ".cm-panels": { backgroundColor: cx, color: ks },
  ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
  ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
  ".cm-searchMatch": {
    backgroundColor: "#72a1ff59",
    outline: "1px solid #457dff"
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: "#6199ff2f"
  },
  ".cm-activeLine": { backgroundColor: "#6699ff0b" },
  ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: "#bad0f847"
  },
  ".cm-gutters": {
    backgroundColor: bh,
    color: lO,
    border: "none"
  },
  ".cm-activeLineGutter": {
    backgroundColor: Xh
  },
  ".cm-foldPlaceholder": {
    backgroundColor: "transparent",
    border: "none",
    color: "#ddd"
  },
  ".cm-tooltip": {
    border: "none",
    backgroundColor: ao
  },
  ".cm-tooltip .cm-tooltip-arrow:before": {
    borderTopColor: "transparent",
    borderBottomColor: "transparent"
  },
  ".cm-tooltip .cm-tooltip-arrow:after": {
    borderTopColor: ao,
    borderBottomColor: ao
  },
  ".cm-tooltip-autocomplete": {
    "& > ul > li[aria-selected]": {
      backgroundColor: Xh,
      color: ks
    }
  }
}, { dark: !0 }), dx = /* @__PURE__ */ An.define([
  {
    tag: p.keyword,
    color: hx
  },
  {
    tag: [p.name, p.deleted, p.character, p.propertyName, p.macroName],
    color: Sh
  },
  {
    tag: [/* @__PURE__ */ p.function(p.variableName), p.labelName],
    color: ax
  },
  {
    tag: [p.color, /* @__PURE__ */ p.constant(p.name), /* @__PURE__ */ p.standard(p.name)],
    color: xh
  },
  {
    tag: [/* @__PURE__ */ p.definition(p.name), p.separator],
    color: ks
  },
  {
    tag: [p.typeName, p.className, p.number, p.changed, p.annotation, p.modifier, p.self, p.namespace],
    color: rx
  },
  {
    tag: [p.operator, p.operatorKeyword, p.url, p.escape, p.regexp, p.link, /* @__PURE__ */ p.special(p.string)],
    color: ox
  },
  {
    tag: [p.meta, p.comment],
    color: lO
  },
  {
    tag: p.strong,
    fontWeight: "bold"
  },
  {
    tag: p.emphasis,
    fontStyle: "italic"
  },
  {
    tag: p.strikethrough,
    textDecoration: "line-through"
  },
  {
    tag: p.link,
    color: lO,
    textDecoration: "underline"
  },
  {
    tag: p.heading,
    fontWeight: "bold",
    color: Sh
  },
  {
    tag: [p.atom, p.bool, /* @__PURE__ */ p.special(p.variableName)],
    color: xh
  },
  {
    tag: [p.processingInstruction, p.string, p.inserted],
    color: lx
  },
  {
    tag: p.invalid,
    color: Ox
  }
]), px = [ux, /* @__PURE__ */ Zf(dx)];
let hO = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" }
  ]
};
const mx = "#a78bfa", wh = "#38bdf8", Mu = {
  js: `function solve(arr) {
  return arr;
}

console.log(solve([1, 2, 3]));`,
  java: `class Solution {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
  c: `#include <stdio.h>

int main() {
    printf("Hello World\\n");
    return 0;
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World" << endl;
    return 0;
}`
};
let fa = "";
const gx = location.protocol === "https:" ? "wss" : "ws", Qx = `${gx}://${location.host}/signal`, $x = document.getElementById("status-dot"), Px = document.getElementById("status-text"), bi = document.getElementById("messages"), Gi = document.getElementById("msg"), kr = document.getElementById("send"), Sx = document.getElementById("local-label"), P = {
  localCandidates: [],
  iceState: "new",
  gatheringState: "new",
  dcState: "closed",
  wsConnected: !1,
  rtt: -1,
  bytesSent: 0,
  bytesReceived: 0,
  pairLocalType: "",
  pairRemoteType: "",
  iceCheckingStart: 0,
  turnConfigured: !1,
  // set from 'joined' message if server sent turn credentials
  turnHost: "",
  // extracted from turn URL for display
  forceRelay: !1
  // iceTransportPolicy: 'relay' — set from server config
};
function Gu() {
  P.localCandidates = [], P.iceState = "new", P.gatheringState = "new", P.dcState = "closed", P.rtt = -1, P.bytesSent = 0, P.bytesReceived = 0, P.pairLocalType = "", P.pairRemoteType = "", P.iceCheckingStart = 0, Ke();
}
function ir(n) {
  return n < 1024 ? `${n} B` : n < 1048576 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1048576).toFixed(2)} MB`;
}
function Lu() {
  if (!P.wsConnected)
    return { text: `🔴 Cannot reach signaling server.
Check internet connection. If on VPN try disabling it.`, cls: "error" };
  const n = P.iceState, e = P.localCandidates.filter((i) => i.type === "srflx").length, t = P.localCandidates.filter((i) => i.type === "relay").length;
  if (n === "connected" || n === "completed") {
    const i = P.pairLocalType;
    return i === "relay" ? { text: `⚠️ Relaying via TURN (${P.turnHost}).
Direct P2P failed on this network — symmetric NAT or firewall detected. All traffic is routed through the TURN server. Connection is stable but latency will be higher than direct P2P.`, cls: "warn" } : i === "host" ? { text: `✅ Direct connection on the same local network — optimal.${P.turnConfigured ? `
TURN is on standby but not needed.` : ""}`, cls: "ok" } : { text: `✅ Direct peer-to-peer connection over the internet — optimal.${P.turnConfigured ? `
TURN is on standby but not needed.` : ""}`, cls: "ok" };
  }
  if (n === "failed")
    return P.forceRelay ? { text: `🔴 Force Relay ON — TURN relay failed.
${P.turnHost} did not establish a relay connection. Likely causes:
1. Free-tier TURN servers often block actual relay — check your plan
2. UDP port 3478 may be blocked on this network (TCP may still work)
3. Wrong credentials — verify username/password in /boss panel
4. TURN server down or overloaded
Tip: turn off Force Relay in /boss to fall back to direct P2P.`, cls: "error" } : P.turnConfigured && t === 0 ? { text: `🔴 ICE failed — TURN server unreachable.
${P.turnHost} did not respond or rejected credentials.
Check: host/username/password in Railway env vars, firewall rules on the TURN server, UDP port 3478 open.`, cls: "error" } : e === 0 ? { text: `🔴 STUN blocked — UDP to external servers is firewalled.
ICE could not discover a public IP. Ask the other person to:
1. Switch to mobile hotspot
2. Disable VPN / corporate proxy
3. Try a different network
Long-term fix: configure a TURN server (already supported — enable via admin API).`, cls: "error" } : { text: `🔴 Symmetric NAT detected.
STUN resolved a public IP but the router assigns a different port per destination — direct P2P failed.${P.turnConfigured ? `
TURN (${P.turnHost}) was configured but also failed — check server reachability.` : `
Fix: enable the TURN server via the admin API.`}`, cls: "error" };
  if (n === "disconnected")
    return { text: `⚠️ Connection dropped — attempting to recover.
If this persists the network is unstable.`, cls: "warn" };
  if (n === "checking") {
    const i = P.iceCheckingStart ? (Date.now() - P.iceCheckingStart) / 1e3 : 0;
    return i > 20 ? { text: `⚠️ Still checking after ${Math.round(i)}s — unusually long.
Network may be heavily firewalled. Try mobile hotspot.`, cls: "warn" } : { text: "⏳ Negotiating connection — trying candidate pairs…", cls: "warn" };
  }
  return { text: "⏳ Waiting for the other person to join.", cls: "warn" };
}
function Ke() {
  const n = document.getElementById("d-ws-dot"), e = document.getElementById("d-ws-val");
  n.className = `health-dot ${P.wsConnected ? "ok" : "error"}`, e.textContent = P.wsConnected ? "Connected" : "Disconnected";
  const t = document.getElementById("d-ice-dot"), i = document.getElementById("d-ice-val"), s = {
    new: "",
    checking: "warn",
    connected: "ok",
    completed: "ok",
    disconnected: "warn",
    failed: "error",
    closed: ""
  };
  t.className = `health-dot ${s[P.iceState] ?? ""}`;
  const r = {
    host: "local network",
    srflx: "direct P2P",
    prflx: "direct P2P",
    relay: "via TURN relay"
  };
  let o = P.iceState;
  (P.iceState === "connected" || P.iceState === "completed") && P.pairLocalType && (o += ` — ${r[P.pairLocalType] ?? P.pairLocalType}`, P.rtt >= 0 && (o += `, ${P.rtt}ms RTT`)), i.textContent = o;
  const O = document.getElementById("d-dc-dot"), a = document.getElementById("d-dc-val"), l = { open: "ok", connecting: "warn", closing: "warn", closed: "" };
  O.className = `health-dot ${l[P.dcState] ?? ""}`, a.textContent = P.dcState;
  const { text: h, cls: c } = Lu(), f = document.getElementById("diag-box");
  f.textContent = h, f.className = `diag-box ${c}`;
  const u = { host: 0, srflx: 0, relay: 0, prflx: 0 };
  P.localCandidates.forEach((X) => {
    X.type in u && u[X.type]++;
  });
  const d = (X, b, y) => {
    const _ = document.getElementById(X);
    _.textContent = String(b), _.className = `cand-count${b === 0 ? " zero" : ""}${y && b === 0 && P.iceState === "failed" ? " alarm" : ""}`;
  };
  d("d-host-count", u.host, !1), d("d-srflx-count", u.srflx, !0), d("d-relay-count", u.relay, P.turnConfigured);
  const m = document.getElementById("d-relay-hint");
  if (m)
    if (P.turnConfigured) {
      const X = P.forceRelay ? " · FORCE RELAY ON" : "";
      P.pairLocalType === "relay" ? m.textContent = `Relaying via ${P.turnHost} — TURN active${X}` : u.relay > 0 ? m.textContent = `TURN (${P.turnHost}) ready — ${u.relay} relay candidate${u.relay > 1 ? "s" : ""} gathered${X}` : P.iceState === "failed" ? m.textContent = `TURN relay failed — ${P.turnHost} unreachable or credentials rejected${X}` : m.textContent = `TURN configured (${P.turnHost}) — gathering...${X}`;
    } else
      m.textContent = "No TURN server configured — direct P2P only";
  const g = document.getElementById("d-turn-dot"), Q = document.getElementById("d-turn-val");
  g && Q && (P.turnConfigured ? P.pairLocalType === "relay" ? (g.className = "health-dot ok", Q.textContent = `Active — routing via ${P.turnHost}`) : u.relay > 0 ? (g.className = "health-dot ok", Q.textContent = `Standby — ${P.turnHost} reachable`) : P.iceState === "failed" ? (g.className = "health-dot error", Q.textContent = `Unreachable — ${P.turnHost} did not respond`) : (g.className = "health-dot warn", Q.textContent = `Configured (${P.turnHost}) — waiting for ICE`) : (g.className = "health-dot", Q.textContent = "Not configured")), document.getElementById("d-rtt").textContent = P.rtt >= 0 ? `${P.rtt} ms` : "—", document.getElementById("d-sent").textContent = P.bytesSent > 0 ? ir(P.bytesSent) : "—", document.getElementById("d-recv").textContent = P.bytesReceived > 0 ? ir(P.bytesReceived) : "—", document.getElementById("d-gathering").textContent = P.gatheringState;
  const x = P.pairLocalType && P.pairRemoteType ? `${P.pairLocalType} ↔ ${P.pairRemoteType}` : "—";
  document.getElementById("d-pair").textContent = x;
  const S = document.getElementById("d-turn-server");
  S && (S.textContent = P.turnConfigured ? P.turnHost : "None");
  const T = document.getElementById("turn-badge");
  T.style.display = P.pairLocalType === "relay" ? "flex" : "none";
}
async function nr() {
  var e, t;
  const n = ((e = [...ee.values()].find(
    (i) => i.pc.iceConnectionState === "connected" || i.pc.iceConnectionState === "completed"
  )) == null ? void 0 : e.pc) ?? ((t = ee.values().next().value) == null ? void 0 : t.pc);
  if (!n) {
    Ke();
    return;
  }
  try {
    const i = await n.getStats(), s = /* @__PURE__ */ new Map();
    let r = null;
    if (i.forEach((o) => {
      const O = o;
      (o.type === "local-candidate" || o.type === "remote-candidate") && s.set(o.id, o), o.type === "candidate-pair" && O.nominated === !0 && (r = o);
    }), r) {
      const o = r, O = s.get(o.localCandidateId), a = s.get(o.remoteCandidateId);
      P.rtt = o.currentRoundTripTime != null ? Math.round(o.currentRoundTripTime * 1e3) : -1, P.bytesSent = o.bytesSent ?? 0, P.bytesReceived = o.bytesReceived ?? 0, P.pairLocalType = (O == null ? void 0 : O.candidateType) ?? "", P.pairRemoteType = (a == null ? void 0 : a.candidateType) ?? "";
    }
  } catch {
  }
  Ke();
}
let dn = null;
function Du() {
  dn || (nr(), dn = setInterval(nr, 2e3));
}
function ua() {
  dn && (clearInterval(dn), dn = null);
}
document.getElementById("copy-report-btn").addEventListener("click", () => {
  const n = { host: 0, srflx: 0, relay: 0 };
  P.localCandidates.forEach((s) => {
    s.type in n && n[s.type]++;
  });
  const { text: e } = Lu(), t = P.turnConfigured ? `TURN server:      ${P.turnHost}${P.pairLocalType === "relay" ? " (active — relaying traffic)" : n.relay > 0 ? " (standby — reachable)" : P.iceState === "failed" ? " (relay FAILED — unreachable or wrong credentials)" : " (configured — gathering...)"}${P.forceRelay ? " [FORCE RELAY]" : ""}` : "TURN server:      Not configured", i = [
    "── Interview Room Diagnostic Report ──",
    `Room: ${fa || "(not joined)"}`,
    `Time: ${(/* @__PURE__ */ new Date()).toLocaleTimeString()}`,
    "",
    `Signaling server: ${P.wsConnected ? "Connected" : "Disconnected"}`,
    `ICE state:        ${P.iceState}`,
    `Data channel:     ${P.dcState}`,
    `ICE gathering:    ${P.gatheringState}`,
    t,
    "",
    "ICE Candidates gathered (local):",
    `  Host  (local IP):  ${n.host}${P.forceRelay && n.host === 0 ? "  ← not gathered (force relay mode)" : ""}`,
    `  STUN  (public IP): ${n.srflx}${P.forceRelay && n.srflx === 0 ? "  ← not gathered (force relay mode)" : n.srflx === 0 ? "  ← UDP may be blocked" : ""}`,
    `  TURN  (relay):     ${n.relay}${n.relay === 0 && !P.turnConfigured ? "  ← no TURN server configured" : n.relay === 0 && P.forceRelay ? "  ← TURN server unreachable or rejected credentials" : n.relay === 0 && P.turnConfigured ? "  ← TURN server may be unreachable" : ""}`,
    "",
    P.rtt >= 0 ? `RTT:              ${P.rtt} ms` : "",
    P.pairLocalType ? `Active path:      ${P.pairLocalType} ↔ ${P.pairRemoteType}` : "",
    P.bytesSent > 0 ? `Bytes sent:       ${ir(P.bytesSent)}` : "",
    P.bytesReceived > 0 ? `Bytes received:   ${ir(P.bytesReceived)}` : "",
    "",
    `Diagnosis: ${e.replace(/^[🔴✅⚠️⏳]\s*/, "")}`,
    "",
    `Browser: ${navigator.userAgent}`
  ].filter((s) => s !== "").join(`
`);
  navigator.clipboard.writeText(i).then(() => {
    const s = document.getElementById("copy-report-btn"), r = s.textContent;
    s.textContent = "✓ Copied to clipboard", setTimeout(() => {
      s.textContent = r;
    }, 2e3);
  });
});
document.getElementById("refresh-stats").addEventListener("click", nr);
let da = "You";
const Iu = document.getElementById("home-screen"), xx = document.getElementById("create-room-btn"), cO = document.getElementById("join-code-input"), Bu = document.getElementById("join-code-btn");
function Xx() {
  const n = ["swift", "bold", "calm", "bright", "deep", "sharp", "clean", "brave", "quick", "cool"], e = ["eagle", "tiger", "river", "falcon", "storm", "pine", "coast", "cliff", "grove", "peak"], t = Math.floor(Math.random() * 9e3 + 1e3), i = (s) => s[Math.floor(Math.random() * s.length)];
  return `${i(n)}-${i(e)}-${t}`;
}
function pa(n) {
  fa = n, location.hash = n, document.getElementById("room-name").textContent = n, bx.textContent = n, Iu.style.display = "none", fO.classList.add("visible"), Yn.focus();
}
xx.addEventListener("click", () => pa(Xx()));
Bu.addEventListener("click", () => {
  const n = cO.value.trim().replace(/^#/, "");
  n && pa(n);
});
cO.addEventListener("keydown", (n) => {
  n.key === "Enter" && cO.value.trim() && Bu.click();
});
const fO = document.getElementById("join-screen"), bx = document.getElementById("join-room-display"), Yn = document.getElementById("name-input"), sr = document.getElementById("join-btn"), ms = document.getElementById("copy-link-btn");
Yn.addEventListener("input", () => {
  sr.disabled = Yn.value.trim().length === 0;
});
Yn.addEventListener("keydown", (n) => {
  n.key === "Enter" && !sr.disabled && sr.click();
});
ms.addEventListener("click", () => {
  navigator.clipboard.writeText(location.href).then(() => {
    const n = ms.textContent;
    ms.textContent = "✓ Copied!", setTimeout(() => {
      ms.textContent = n;
    }, 2e3);
  });
});
sr.addEventListener("click", () => {
  const n = Yn.value.trim();
  if (!n) return;
  da = n, Sx.textContent = n;
  const e = document.getElementById("local-avatar");
  e && (e.textContent = n[0].toUpperCase()), fO.classList.add("hiding"), setTimeout(() => {
    fO.style.display = "none", dd();
  }, 260);
});
const kh = location.hash.slice(1).trim();
kh ? pa(kh) : Iu.style.display = "flex";
const uO = {
  batman: { icon: "🦇", cls: "batman" },
  superman: { icon: "🦸", cls: "superman" },
  spiderman: { icon: "🕷️", cls: "spiderman" }
}, yx = ["light", "batman", "superman", "spiderman"], ma = document.getElementById("theme-picker"), wx = document.getElementById("theme-icon");
function Nu(n) {
  document.body.classList.remove(...yx);
  const e = uO[n].cls;
  e && document.body.classList.add(e), wx.textContent = uO[n].icon, document.querySelectorAll(".theme-option").forEach((t) => {
    const i = t, s = i.dataset.theme === n;
    i.classList.toggle("active", s);
    let r = i.querySelector(".tcheck");
    s && !r ? (r = document.createElement("span"), r.className = "tcheck", r.textContent = "✓", i.appendChild(r)) : !s && r && r.remove();
  }), localStorage.setItem("theme", n);
}
const Zh = localStorage.getItem("theme");
Nu(Zh in uO ? Zh : "batman");
document.getElementById("theme-picker-btn").addEventListener("click", (n) => {
  ma.classList.toggle("open"), n.stopPropagation();
});
document.querySelectorAll(".theme-option").forEach((n) => {
  n.addEventListener("click", (e) => {
    Nu(n.dataset.theme), ma.classList.remove("open"), e.stopPropagation();
  });
});
document.addEventListener("click", () => ma.classList.remove("open"));
function Li(n, e) {
  Px.textContent = n, $x.className = e;
}
function ui(n, e) {
  var t;
  if (n === "system") {
    const i = document.createElement("div");
    i.className = "system-msg", i.textContent = e, bi.appendChild(i);
  } else {
    const i = document.createElement("div");
    i.className = `bubble ${n === "you" ? "you" : "peer"}`;
    const s = document.createElement("div");
    s.className = "who", s.textContent = n === "you" ? da : n, i.appendChild(s), i.appendChild(document.createTextNode(e)), bi.appendChild(i);
  }
  if (bi.scrollTop = bi.scrollHeight, n !== "you" && n !== "system") {
    const i = document.getElementById("chat-drawer");
    i && !i.classList.contains("open") && ((t = document.getElementById("chat-notif")) == null || t.classList.add("show"));
  }
}
function kx() {
  try {
    const n = new AudioContext(), e = n.createOscillator(), t = n.createGain();
    e.connect(t), t.connect(n.destination), e.type = "sine", e.frequency.setValueAtTime(880, n.currentTime), t.gain.setValueAtTime(0.25, n.currentTime), t.gain.exponentialRampToValueAtTime(1e-4, n.currentTime + 0.6), e.start(n.currentTime), e.stop(n.currentTime + 0.6);
  } catch {
  }
}
let Qt = "js";
const Fu = new Vn();
let Rn = !1, lo = null;
const Zx = {
  js: ca(),
  java: V0(),
  c: Ph(),
  cpp: Ph()
}, $e = new Z({
  state: A.create({
    doc: Mu.js,
    extensions: [
      _S,
      px,
      Fu.of(ca()),
      Z.updateListener.of((n) => {
        !n.docChanged || Rn || (lo && clearTimeout(lo), lo = setTimeout(() => {
          Pe({ source: "code", content: $e.state.doc.toString(), lang: Qt });
        }, 250));
      })
    ]
  }),
  parent: document.getElementById("editor")
});
function vx(n, e) {
  e !== Qt && Hu(e, !1), Rn = !0;
  const t = $e.state.selection;
  $e.dispatch({
    changes: { from: 0, to: $e.state.doc.length, insert: n },
    selection: { anchor: Math.min(t.main.anchor, n.length) }
  }), Rn = !1;
}
function Hu(n, e = !0) {
  Qt = n, document.querySelectorAll(".lang-btn").forEach((t) => t.classList.toggle("active", t.dataset.lang === n)), $e.dispatch({ effects: Fu.reconfigure(Zx[n] || ca()) }), Rn = !0, $e.dispatch({ changes: { from: 0, to: $e.state.doc.length, insert: Mu[n] || "" } }), Rn = !1, e && Pe({ source: "code", content: $e.state.doc.toString(), lang: n });
}
document.querySelectorAll(".lang-btn[data-lang]").forEach((n) => {
  n.addEventListener("click", () => Hu(n.dataset.lang));
});
const Ht = document.getElementById("run-btn"), Ku = document.getElementById("output-text"), rr = document.getElementById("output-badge"), Tx = document.getElementById("clear-output-btn");
function pn(n, e = !1, t = !1) {
  Ku.textContent = n, rr.textContent = e ? "error" : t ? "info" : "ok", rr.className = `badge ${e ? "err" : t ? "info" : "ok"}`;
}
const Ux = "https://wandbox.org/api/compile.json";
async function Yx(n, e) {
  let t, i;
  e === "java" ? t = "openjdk-head" : e === "c" ? (t = "gcc-head", i = "-x c") : t = "gcc-head";
  const s = e === "java" ? (() => {
    const f = n.match(/(?:public\s+)?class\s+(\w+)/);
    return f ? `${f[1]}.java` : "Main.java";
  })() : void 0, r = { compiler: t, code: n };
  i && (r["compiler-option-raw"] = i), s && (r.filename = s);
  const o = await fetch(Ux, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(r)
  });
  if (!o.ok) throw new Error(`Wandbox returned ${o.status}`);
  const O = await o.json(), a = (O.program_output ?? "").trimEnd(), l = (O.program_error ?? "").trimEnd(), h = (O.compiler_error ?? "").trimEnd();
  let c = "";
  return a && (c += a), l && (c += (c ? `
` : "") + `STDERR:
${l}`), h && (c += (c ? `
` : "") + `Compile error:
${h}`), c || (c = O.status === "0" ? "(no output)" : `Exited with status ${O.status}`), { output: c, isError: O.status !== "0" || !!h };
}
Tx.addEventListener("click", () => {
  Ku.textContent = "// Click ▶ Run to execute", rr.textContent = "ready", rr.className = "badge info";
});
const Rx = { js: "js", java: "java", c: "c", cpp: "cpp" };
document.getElementById("copy-code-btn").addEventListener("click", () => {
  navigator.clipboard.writeText($e.state.doc.toString()).then(() => {
    const n = document.getElementById("copy-code-btn"), e = n.textContent;
    n.textContent = "✓ Copied", setTimeout(() => {
      n.textContent = e;
    }, 2e3);
  });
});
document.getElementById("download-code-btn").addEventListener("click", () => {
  const n = $e.state.doc.toString(), e = Rx[Qt] ?? "txt", t = new Blob([n], { type: "text/plain" }), i = URL.createObjectURL(t), s = document.createElement("a");
  s.href = i, s.download = `solution.${e}`, s.click(), URL.revokeObjectURL(i);
});
async function _x(n, e) {
  if (e === "js") {
    const s = await import("https://esm.sh/prettier@3/standalone"), r = await import("https://esm.sh/prettier@3/plugins/babel"), o = await import("https://esm.sh/prettier@3/plugins/estree");
    return s.format(n, {
      parser: "babel",
      plugins: [r, o],
      printWidth: 100,
      tabWidth: 4,
      semi: !0,
      singleQuote: !0
    });
  }
  if (e === "java") {
    const { format: s } = await import("./standalone-C_GEhJUP.mjs"), { default: r } = await import("./index-Ck2TFYWR.mjs");
    return await s(n, {
      parser: "java",
      plugins: [r],
      printWidth: 100,
      tabWidth: 4
    });
  }
  const t = e === "c" ? "file.c" : "file.cpp", i = await import("./clang-format-vite-A5EoXY-R.mjs");
  return await i.default(), i.format(n, t);
}
document.getElementById("format-btn").addEventListener("click", async () => {
  const n = document.getElementById("format-btn"), e = n.textContent;
  n.textContent = "⏳…", n.disabled = !0;
  try {
    const t = $e.state.doc.toString(), i = await _x(t, Qt), s = $e.state.selection;
    $e.dispatch({
      changes: { from: 0, to: $e.state.doc.length, insert: i },
      selection: { anchor: Math.min(s.main.anchor, i.length) }
    }), Pe({ source: "code", content: i, lang: Qt }), n.textContent = "✓ Done", setTimeout(() => {
      n.textContent = e, n.disabled = !1;
    }, 1200);
  } catch (t) {
    console.error("[format]", t), pn(`Format failed (${Qt}): ${(t == null ? void 0 : t.message) ?? t}`, !1, !0), n.textContent = "✕ Error", setTimeout(() => {
      n.textContent = e, n.disabled = !1;
    }, 2500);
  }
});
const qx = document.getElementById("code-output-wrap"), at = document.getElementById("resize-handle"), lt = document.getElementById("output-section");
let Vt = !1;
document.getElementById("orient-btn").addEventListener("click", () => {
  Vt = !Vt, qx.classList.toggle("horizontal", Vt);
  const n = document.getElementById("orient-btn");
  n.textContent = Vt ? "↕ Layout" : "⇄ Layout";
});
at.addEventListener("mousedown", (n) => {
  n.preventDefault(), at.classList.add("dragging");
  const e = n.clientX, t = n.clientY, i = Vt ? lt.offsetWidth : lt.offsetHeight, s = (o) => {
    if (Vt) {
      const O = e - o.clientX, a = Math.max(80, Math.min(i + O, window.innerWidth * 0.7));
      lt.style.width = `${a}px`, lt.style.height = "auto";
    } else {
      const O = t - o.clientY, a = Math.max(60, Math.min(i + O, window.innerHeight * 0.7));
      lt.style.height = `${a}px`, lt.style.width = "auto";
    }
  }, r = () => {
    at.classList.remove("dragging"), window.removeEventListener("mousemove", s), window.removeEventListener("mouseup", r);
  };
  window.addEventListener("mousemove", s), window.addEventListener("mouseup", r);
});
at.addEventListener("touchstart", (n) => {
  n.preventDefault();
  const e = n.touches[0], t = e.clientX, i = e.clientY, s = Vt ? lt.offsetWidth : lt.offsetHeight, r = (O) => {
    const a = O.touches[0];
    if (Vt) {
      const l = Math.max(80, Math.min(s + (t - a.clientX), window.innerWidth * 0.7));
      lt.style.width = `${l}px`;
    } else {
      const l = Math.max(60, Math.min(s + (i - a.clientY), window.innerHeight * 0.7));
      lt.style.height = `${l}px`;
    }
  }, o = () => {
    at.classList.remove("dragging"), at.removeEventListener("touchmove", r), at.removeEventListener("touchend", o);
  };
  at.classList.add("dragging"), at.addEventListener("touchmove", r, { passive: !1 }), at.addEventListener("touchend", o);
}, { passive: !1 });
document.getElementById("disconnect-btn").addEventListener("click", () => {
  if (confirm("Leave this session? You will be taken back to the home screen.")) {
    if (Ae)
      try {
        Ae.close();
      } catch {
      }
    ud(), fe == null || fe.getTracks().forEach((n) => n.stop()), fe = null, location.href = "/";
  }
});
const Ju = document.getElementById("problem-section"), ai = document.getElementById("problem-editor");
document.getElementById("problem-header").addEventListener("click", () => {
  Ju.classList.toggle("collapsed");
});
let ho = null, dO = !1;
ai.addEventListener("input", () => {
  dO || (ho && clearTimeout(ho), ho = setTimeout(() => {
    Pe({ source: "problem", content: ai.value });
  }, 250));
});
function Vx(n) {
  dO = !0;
  const e = ai.selectionStart;
  ai.value = n;
  try {
    ai.setSelectionRange(Math.min(e, n.length), Math.min(e, n.length));
  } catch {
  }
  dO = !1, Ju.classList.remove("collapsed");
}
Ht.addEventListener("click", async () => {
  const n = $e.state.doc.toString();
  if (Ht.classList.add("running"), Ht.textContent = "⏳ Running…", Ht.disabled = !0, Qt === "js") {
    const e = [], t = console.log, i = console.error, s = console.warn, r = (a) => (...l) => {
      e.push(a + l.map(
        (h) => h === null ? "null" : h === void 0 ? "undefined" : typeof h == "object" ? JSON.stringify(h, null, 2) : String(h)
      ).join(" "));
    };
    console.log = r(""), console.error = r("ERROR: "), console.warn = r("WARN:  ");
    let o = !1;
    try {
      new Function(n)();
    } catch (a) {
      e.push(`Runtime Error: ${a instanceof Error ? a.message : String(a)}`), o = !0;
    } finally {
      console.log = t, console.error = i, console.warn = s;
    }
    const O = e.length > 0 ? e.join(`
`) : "(no output)";
    pn(O, o), Pe({ source: "code-output", output: O });
  } else
    try {
      const { output: e, isError: t } = await Yx(n, Qt);
      pn(e, t), Pe({ source: "code-output", output: e });
    } catch (e) {
      const t = `Could not reach Wandbox.
${e instanceof Error ? e.message : String(e)}`;
      pn(t, !0), Pe({ source: "code-output", output: t });
    }
  Ht.classList.remove("running"), Ht.textContent = "▶ Run", Ht.disabled = !1;
});
const re = document.getElementById("whiteboard"), U = re.getContext("2d"), zx = document.getElementById("whiteboard-wrap");
let ae = "pen", zt = 2.5, yi = !1, He = mx, or = !1, Ri = 0, _i = 0, _n = 0, qn = 0, Zr = !1, Qe = [], Be = [], ni = null;
document.addEventListener("keydown", (n) => {
  n.key === "Shift" && (Zr = !0);
});
document.addEventListener("keyup", (n) => {
  n.key === "Shift" && (Zr = !1);
});
function ed() {
  const n = re.getBoundingClientRect();
  n.width === 0 || n.height === 0 || (re.width = Math.floor(n.width), re.height = Math.floor(n.height), Wt());
}
function Wt() {
  U.clearRect(0, 0, re.width, re.height), Qe.forEach(vr);
}
function vr(n) {
  switch (U.save(), n.type) {
    case "pen": {
      if (n.points.length < 2) break;
      n.erasing ? (U.globalCompositeOperation = "destination-out", U.lineWidth = Math.max(20, n.width * 5), U.strokeStyle = "rgba(0,0,0,1)") : (U.globalCompositeOperation = "source-over", U.lineWidth = n.width, U.strokeStyle = n.color), U.lineCap = "round", U.lineJoin = "round", U.beginPath(), U.moveTo(n.points[0].x, n.points[0].y);
      for (let e = 1; e < n.points.length; e++) U.lineTo(n.points[e].x, n.points[e].y);
      U.stroke();
      break;
    }
    case "line": {
      U.strokeStyle = n.color, U.lineWidth = n.width, U.lineCap = "round", U.beginPath(), U.moveTo(n.x1, n.y1), U.lineTo(n.x2, n.y2), U.stroke();
      break;
    }
    case "rect": {
      U.strokeStyle = n.color, U.fillStyle = n.color, U.lineWidth = n.width, n.filled ? U.fillRect(n.x, n.y, n.w, n.h) : U.strokeRect(n.x, n.y, n.w, n.h);
      break;
    }
    case "ellipse": {
      U.strokeStyle = n.color, U.fillStyle = n.color, U.lineWidth = n.width, U.beginPath(), U.ellipse(n.cx, n.cy, Math.max(1, Math.abs(n.rx)), Math.max(1, Math.abs(n.ry)), 0, 0, 2 * Math.PI), n.filled ? U.fill() : U.stroke();
      break;
    }
    case "arrow": {
      const e = Math.atan2(n.y2 - n.y1, n.x2 - n.x1), t = Math.max(12, n.width * 5);
      U.strokeStyle = n.color, U.fillStyle = n.color, U.lineWidth = n.width, U.lineCap = "round", U.beginPath(), U.moveTo(n.x1, n.y1), U.lineTo(n.x2, n.y2), U.stroke(), U.beginPath(), U.moveTo(n.x2, n.y2), U.lineTo(n.x2 - t * Math.cos(e - Math.PI / 6), n.y2 - t * Math.sin(e - Math.PI / 6)), U.lineTo(n.x2 - t * Math.cos(e + Math.PI / 6), n.y2 - t * Math.sin(e + Math.PI / 6)), U.closePath(), U.fill();
      break;
    }
    case "text": {
      U.fillStyle = n.color, U.font = `${n.fontSize}px -apple-system, BlinkMacSystemFont, sans-serif`, U.textBaseline = "top", n.text.split(`
`).forEach((e, t) => U.fillText(e, n.x, n.y + t * n.fontSize * 1.3));
      break;
    }
  }
  U.restore();
}
function td(n, e, t, i, s, r, o = zt) {
  U.save(), r ? (U.globalCompositeOperation = "destination-out", U.lineWidth = Math.max(20, o * 5), U.strokeStyle = "rgba(0,0,0,1)") : (U.globalCompositeOperation = "source-over", U.lineWidth = o, U.strokeStyle = s), U.lineCap = "round", U.lineJoin = "round", U.beginPath(), U.moveTo(n, e), U.lineTo(t, i), U.stroke(), U.restore();
}
function ga(n) {
  const e = re.getBoundingClientRect();
  return { x: n.clientX - e.left, y: n.clientY - e.top };
}
function id(n, e, t, i) {
  const s = Math.atan2(i - e, t - n), r = Math.round(s / (Math.PI / 4)) * (Math.PI / 4), o = Math.hypot(t - n, i - e);
  return { x: n + o * Math.cos(r), y: e + o * Math.sin(r) };
}
function nd(n, e, t, i) {
  switch (ae) {
    case "line":
      return { type: "line", color: He, width: zt, x1: n, y1: e, x2: t, y2: i };
    case "arrow":
      return { type: "arrow", color: He, width: zt, x1: n, y1: e, x2: t, y2: i };
    case "rect":
      return {
        type: "rect",
        color: He,
        width: zt,
        filled: yi,
        x: Math.min(n, t),
        y: Math.min(e, i),
        w: Math.abs(t - n),
        h: Math.abs(i - e)
      };
    case "ellipse":
      return {
        type: "ellipse",
        color: He,
        width: zt,
        filled: yi,
        cx: (n + t) / 2,
        cy: (e + i) / 2,
        rx: Math.abs(t - n) / 2,
        ry: Math.abs(i - e) / 2
      };
    default:
      return null;
  }
}
re.addEventListener("mousedown", (n) => {
  if (ae === "text") return;
  or = !0, Be = [];
  const e = ga(n);
  _n = e.x, qn = e.y, Ri = e.x, _i = e.y, ae === "pen" || ae === "eraser" ? ni = { type: "pen", color: He, erasing: ae === "eraser", width: zt, points: [e] } : ni = null;
});
re.addEventListener("mousemove", (n) => {
  if (!or) return;
  const { x: e, y: t } = ga(n);
  if (ae === "pen" || ae === "eraser") {
    const i = ni;
    if (!i) return;
    i.points.push({ x: e, y: t });
    const s = ae === "eraser";
    td(Ri, _i, e, t, He, s), Pe({ source: "diagram", op: "line", x1: Ri, y1: _i, x2: e, y2: t, erasing: s, width: zt });
  } else {
    const s = (ae === "line" || ae === "arrow") && Zr ? id(_n, qn, e, t) : { x: e, y: t };
    Wt();
    const r = nd(_n, qn, s.x, s.y);
    r && vr(r);
  }
  Ri = e, _i = t;
});
function sd() {
  if (or)
    if (or = !1, ae === "pen" || ae === "eraser") {
      if (!ni) return;
      Qe.push(ni), Pe({ source: "diagram", op: "stroke-complete", stroke: ni }), ni = null;
    } else {
      const e = (ae === "line" || ae === "arrow") && Zr ? id(_n, qn, Ri, _i) : { x: Ri, y: _i }, t = nd(_n, qn, e.x, e.y);
      t && (Qe.push(t), Wt(), Pe({ source: "diagram", op: "stroke-complete", stroke: t }));
    }
}
re.addEventListener("mouseup", sd);
re.addEventListener("mouseleave", sd);
re.addEventListener("click", (n) => {
  if (ae !== "text") return;
  const e = ga(n), t = document.createElement("textarea");
  t.rows = 1, t.style.cssText = [
    "position:absolute",
    `left:${e.x}px`,
    `top:${e.y - 2}px`,
    "min-width:80px",
    `max-width:${re.width - e.x - 12}px`,
    "background:transparent",
    `border:1.5px dashed ${He}`,
    "border-radius:3px",
    "outline:none",
    `color:${He}`,
    "font:16px -apple-system,BlinkMacSystemFont,sans-serif",
    "line-height:1.3",
    "resize:none",
    "padding:2px 5px",
    "z-index:20",
    "overflow:hidden"
  ].join(";"), zx.appendChild(t), t.focus();
  const i = () => {
    const s = t.value.trim();
    if (t.remove(), !s) return;
    Be = [];
    const r = { type: "text", color: He, fontSize: 16, x: e.x, y: e.y, text: s };
    Qe.push(r), vr(r), Pe({ source: "diagram", op: "stroke-complete", stroke: r });
  };
  t.addEventListener("keydown", (s) => {
    if (s.key === "Escape") {
      t.remove();
      return;
    }
    if (s.key === "Enter" && !s.shiftKey) {
      s.preventDefault(), i();
      return;
    }
    setTimeout(() => {
      t.style.height = "auto", t.style.height = t.scrollHeight + "px";
    }, 0);
  }), t.addEventListener("blur", i);
});
function rd() {
  Qe.length !== 0 && (Be.push(Qe.pop()), Wt(), Pe({ source: "diagram", op: "undo" }));
}
function od() {
  Be.length !== 0 && (Qe.push(Be.pop()), Wt(), Pe({ source: "diagram", op: "redo" }));
}
document.getElementById("undo-btn").addEventListener("click", rd);
document.getElementById("redo-btn").addEventListener("click", od);
document.addEventListener("keydown", (n) => {
  document.querySelector("#tab-diagram.active") && ((n.ctrlKey || n.metaKey) && n.key === "z" && !n.shiftKey && (n.preventDefault(), rd()), (n.ctrlKey || n.metaKey) && (n.key === "y" || n.key === "z" && n.shiftKey) && (n.preventDefault(), od()));
});
const Cx = {
  pen: "crosshair",
  eraser: "cell",
  line: "crosshair",
  rect: "crosshair",
  ellipse: "crosshair",
  arrow: "crosshair",
  text: "text"
};
function Qa(n) {
  ae = n, re.style.cursor = Cx[n], ["pen", "eraser", "line", "rect", "ellipse", "arrow", "text"].forEach((e) => {
    var t;
    return (t = document.getElementById(`tool-${e}`)) == null ? void 0 : t.classList.toggle("active", e === n);
  });
}
["pen", "eraser", "line", "rect", "ellipse", "arrow", "text"].forEach((n) => {
  var e;
  return (e = document.getElementById(`tool-${n}`)) == null ? void 0 : e.addEventListener("click", () => Qa(n));
});
const co = document.getElementById("tool-fill-toggle");
co.addEventListener("click", () => {
  yi = !yi, co.classList.toggle("active", yi), co.textContent = yi ? "◆ Fill" : "◇ Fill";
});
document.querySelectorAll(".width-btn").forEach((n) => {
  n.addEventListener("click", () => {
    zt = parseFloat(n.dataset.width), document.querySelectorAll(".width-btn").forEach((e) => e.classList.remove("active")), n.classList.add("active");
  });
});
document.querySelectorAll(".swatch").forEach((n) => {
  n.addEventListener("click", () => {
    He = n.dataset.color, ae === "eraser" && Qa("pen"), document.querySelectorAll(".swatch").forEach((e) => e.classList.remove("active")), n.classList.add("active");
  });
});
const vh = document.getElementById("custom-color");
vh.addEventListener("input", () => {
  He = vh.value, ae === "eraser" && Qa("pen"), document.querySelectorAll(".swatch").forEach((n) => n.classList.remove("active"));
});
document.getElementById("clear-canvas").addEventListener("click", () => {
  Qe = [], Be = [], U.clearRect(0, 0, re.width, re.height), Pe({ source: "diagram", op: "clear" });
});
document.getElementById("save-canvas-btn").addEventListener("click", () => {
  const n = re.toDataURL("image/png"), e = document.createElement("a");
  e.href = n, e.download = "whiteboard.png", e.click();
});
function Wx(n) {
  switch (n.op) {
    case "line":
      td(n.x1, n.y1, n.x2, n.y2, wh, n.erasing, n.width);
      break;
    case "stroke-complete": {
      const e = n.stroke.type === "pen" ? { ...n.stroke, color: wh } : n.stroke;
      Qe.push(e), e.type !== "pen" && vr(e);
      break;
    }
    case "undo":
      Qe.length > 0 && (Be.push(Qe.pop()), Wt());
      break;
    case "redo":
      Be.length > 0 && (Qe.push(Be.pop()), Wt());
      break;
    case "full-sync":
      Qe = n.strokes, Be = [], Wt();
      break;
    case "clear":
      Qe = [], Be = [], U.clearRect(0, 0, re.width, re.height);
      break;
  }
}
document.querySelectorAll(".tab").forEach((n) => {
  n.addEventListener("click", () => {
    const e = n.dataset.tab;
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active")), document.querySelectorAll(".tab-panel").forEach((t) => t.classList.remove("active")), n.classList.add("active"), document.getElementById(`tab-${e}`).classList.add("active"), e === "diagram" && requestAnimationFrame(ed), e === "network" && nr();
  });
});
window.addEventListener("resize", () => {
  document.querySelector("#tab-diagram.active") && ed();
});
let fe = null, Od = !1;
const Th = document.getElementById("local-video"), pO = document.getElementById("toggle-video"), Or = document.getElementById("toggle-audio"), mO = document.getElementById("pip-cam-btn"), ar = document.getElementById("pip-mic-btn");
function Uh(n) {
  pO.textContent = n ? "📹" : "📷", pO.classList.toggle("active", n), mO.textContent = n ? "📹" : "📷", mO.classList.toggle("off", !n), document.getElementById("pip-local").classList.toggle("cam-on", n);
  const e = n;
  Or.disabled = !e, ar.disabled = !e;
}
function ad(n) {
  Od = n, Or.textContent = n ? "🔇" : "🎤", Or.classList.toggle("active", n), ar.textContent = n ? "🔇" : "🎤", ar.classList.toggle("off", n);
}
async function ld() {
  if (fe)
    fe.getTracks().forEach((n) => n.stop()), fe = null, Th.srcObject = null, Uh(!1);
  else
    try {
      fe = await navigator.mediaDevices.getUserMedia({ video: !0, audio: !0 }), Th.srcObject = fe, Uh(!0), ad(!1);
      for (const { pc: n } of ee.values())
        if (n.connectionState !== "closed")
          for (const e of fe.getTracks()) {
            const t = n.getSenders().find((i) => {
              var s;
              return ((s = i.track) == null ? void 0 : s.kind) === e.kind;
            });
            t ? await t.replaceTrack(e) : n.addTrack(e, fe);
          }
    } catch {
      ui("system", "Camera/mic access denied");
    }
}
function hd() {
  if (!fe) return;
  const n = fe.getAudioTracks().some((e) => e.enabled);
  fe.getAudioTracks().forEach((e) => {
    e.enabled = !n;
  }), ad(n), Pe({ source: "mic-state", muted: n });
}
pO.addEventListener("click", ld);
Or.addEventListener("click", hd);
mO.addEventListener("click", ld);
ar.addEventListener("click", hd);
const ee = /* @__PURE__ */ new Map();
let cd = "";
const Yh = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" }
  ]
};
function Pe(n) {
  const e = JSON.stringify(n);
  for (const { dc: t } of ee.values())
    (t == null ? void 0 : t.readyState) === "open" && t.send(e);
}
function jx(n, e) {
  var s;
  const t = JSON.parse(n), i = ee.get(e);
  if (t.source === "hello") {
    if (i) {
      i.name = t.name;
      const r = document.getElementById(`pip-name-${e}`);
      r && (r.textContent = t.name);
      const o = document.getElementById(`pip-avatar-${e}`);
      o && (o.textContent = t.name[0].toUpperCase());
    }
    return;
  }
  if (t.source === "chat") return ui((i == null ? void 0 : i.name) ?? "Peer", t.text);
  if (t.source === "code") return vx(t.content, t.lang);
  if (t.source === "code-output") return pn(t.output, t.output.startsWith("ERROR"), t.output.startsWith("⚠️"));
  if (t.source === "diagram") return Wx(t);
  if (t.source === "problem") return Vx(t.content);
  if (t.source === "mic-state") {
    (s = document.getElementById(`pip-tile-${e}`)) == null || s.classList.toggle("peer-muted", t.muted);
    return;
  }
}
function Rh(n, e) {
  const t = ee.get(e);
  t && (t.dc = n), n.onopen = () => {
    Gi.disabled = !1, kr.disabled = !1, Li("Connected", "connected"), n.send(JSON.stringify({ source: "hello", name: da })), n.send(JSON.stringify({ source: "mic-state", muted: Od })), t != null && t.isExisting && (n.send(JSON.stringify({ source: "code", content: $e.state.doc.toString(), lang: Qt })), ai.value && n.send(JSON.stringify({ source: "problem", content: ai.value })), Qe.length > 0 && n.send(JSON.stringify({ source: "diagram", op: "full-sync", strokes: Qe }))), ui("system", `${(t == null ? void 0 : t.name) || "Peer"} connected`), P.dcState = "open", Ke(), Du();
  }, n.onclose = () => {
    [...ee.values()].some((s) => {
      var r;
      return ((r = s.dc) == null ? void 0 : r.readyState) === "open";
    }) || (P.dcState = "closed", ua(), Ke());
  }, n.onmessage = (i) => jx(i.data, e);
}
function Ax(n) {
  const e = document.createElement("div");
  e.className = "pip-tile", e.id = `pip-tile-${n}`;
  const t = document.createElement("video");
  t.autoplay = !0, t.playsInline = !0, e.appendChild(t);
  const i = document.createElement("div");
  i.className = "pip-no-cam";
  const s = document.createElement("div");
  s.className = "pip-avatar", s.id = `pip-avatar-${n}`, s.textContent = "P", i.appendChild(s), e.appendChild(i);
  const r = document.createElement("div");
  r.className = "pip-mute-badge", r.textContent = "🔇", e.appendChild(r);
  const o = document.createElement("div");
  return o.className = "pip-name-bar", o.id = `pip-name-${n}`, o.textContent = "Peer", e.appendChild(o), document.getElementById("pip-tiles").appendChild(e), { tileEl: e, videoEl: t };
}
function fo(n, e = !1) {
  if (ee.has(n)) return;
  let t;
  try {
    t = new RTCPeerConnection(hO);
  } catch {
    console.warn("RTCPeerConnection failed with TURN config, retrying STUN-only"), hO = Yh, P.turnConfigured = !1, t = new RTCPeerConnection(Yh);
  }
  const { tileEl: i, videoEl: s } = Ax(n), r = { pc: t, dc: null, name: "Peer", pending: [], tileEl: i, videoEl: s, isExisting: e };
  if (ee.set(n, r), t.onicecandidate = ({ candidate: o }) => {
    o && (Ae.send(JSON.stringify({ type: "candidate", to: n, candidate: o })), P.localCandidates.push({ type: o.type ?? "unknown", protocol: o.protocol ?? "unknown" }), Ke());
  }, t.oniceconnectionstatechange = () => {
    const o = [...ee.values()].map((a) => a.pc.iceConnectionState), O = o.includes("connected") || o.includes("completed") ? "connected" : o.includes("checking") ? "checking" : o.includes("disconnected") ? "disconnected" : o.includes("failed") ? "failed" : "new";
    P.iceState = O, O === "checking" && !P.iceCheckingStart && (P.iceCheckingStart = Date.now()), O !== "checking" && (P.iceCheckingStart = 0), (O === "connected" || O === "completed") && Du(), O === "failed" && (P.forceRelay ? Li("TURN relay failed — check server credentials", "error") : Li("Connection failed — check Network tab", "error")), Ke();
  }, t.onicegatheringchange = () => {
    P.gatheringState = t.iceGatheringState, Ke();
  }, t.ontrack = (o) => {
    s.srcObject || (s.srcObject = new MediaStream()), s.srcObject.addTrack(o.track), i.classList.add("cam-on");
  }, t.ondatachannel = (o) => Rh(o.channel, n), t.onconnectionstatechange = () => {
    (t.connectionState === "disconnected" || t.connectionState === "failed") && ui("system", `${r.name || "Peer"} lost connection`);
  }, fe && fe.getTracks().forEach((o) => t.addTrack(o, fe)), cd < n) {
    const o = t.createDataChannel("main");
    Rh(o, n), t.onnegotiationneeded = async () => {
      try {
        await t.setLocalDescription(), Ae.send(JSON.stringify({ type: "offer", to: n, sdp: t.localDescription }));
      } catch (O) {
        console.warn("offer failed", O);
      }
    };
  }
}
function fd(n) {
  const e = ee.get(n);
  if (e) {
    try {
      e.pc.close();
    } catch {
    }
    e.tileEl.remove(), ee.delete(n), ee.size === 0 && (Gi.disabled = !0, kr.disabled = !0, Li("Waiting for peer…", "waiting"), ua(), Gu());
  }
}
function ud() {
  for (const n of [...ee.keys()]) fd(n);
  ee.clear(), Gi.disabled = !0, kr.disabled = !0, ua(), Gu();
}
let Ae, gs = 1e3, mi = null;
function dd() {
  Ae = new WebSocket(Qx), Ae.onopen = () => {
    gs = 1e3, mi && clearInterval(mi), mi = setInterval(() => {
      Ae.readyState === WebSocket.OPEN && Ae.send(JSON.stringify({ type: "ping" }));
    }, 25e3), Ae.send(JSON.stringify({ type: "join", room: fa })), Li("Waiting for peer…", "waiting"), P.wsConnected = !0, Ke();
  }, Ae.onmessage = async ({ data: n }) => {
    var t;
    const e = JSON.parse(n);
    if (e.type !== "pong") {
      if (e.type === "joined") {
        if (cd = e.myId, (t = e.turn) != null && t.urls) {
          const i = e.turn.urls[0].match(/turn:([^:?/]+)/);
          P.turnConfigured = !0, P.turnHost = i ? i[1] : "configured", P.forceRelay = !!e.turn.forceRelay, hO = {
            iceTransportPolicy: e.turn.forceRelay ? "relay" : "all",
            iceServers: [
              { urls: "stun:stun.l.google.com:19302" },
              { urls: "stun:stun1.l.google.com:19302" },
              { urls: e.turn.urls, username: e.turn.username, credential: e.turn.credential }
            ]
          }, Ke();
        }
        for (const i of e.peers)
          fo(i);
        return;
      }
      if (e.type === "peer-joined") {
        kx(), ui("system", "Someone joined the room"), fo(e.peerId, !0);
        return;
      }
      if (e.type === "peer-left") {
        const i = ee.get(e.peerId);
        ui("system", `${(i == null ? void 0 : i.name) || "Peer"} left the room`), fd(e.peerId);
        return;
      }
      if (e.type === "offer") {
        const i = e.from;
        ee.has(i) || fo(i);
        const s = ee.get(i);
        await s.pc.setRemoteDescription(new RTCSessionDescription(e.sdp)), s.pending.splice(0).forEach((o) => s.pc.addIceCandidate(new RTCIceCandidate(o)).catch(() => {
        }));
        const r = await s.pc.createAnswer();
        await s.pc.setLocalDescription(r), Ae.send(JSON.stringify({ type: "answer", to: i, sdp: s.pc.localDescription }));
        return;
      }
      if (e.type === "answer") {
        const i = ee.get(e.from);
        (i == null ? void 0 : i.pc.signalingState) === "have-local-offer" && (await i.pc.setRemoteDescription(new RTCSessionDescription(e.sdp)), i.pending.splice(0).forEach((s) => i.pc.addIceCandidate(new RTCIceCandidate(s)).catch(() => {
        })));
        return;
      }
      if (e.type === "candidate") {
        const i = ee.get(e.from);
        if (!i) return;
        i.pc.remoteDescription ? i.pc.addIceCandidate(new RTCIceCandidate(e.candidate)).catch(() => {
        }) : i.pending.push(e.candidate);
        return;
      }
    }
  }, Ae.onclose = () => {
    mi && (clearInterval(mi), mi = null), P.wsConnected = !1, ud(), Li("Reconnecting…", "error"), Ke(), setTimeout(() => {
      gs = Math.min(gs * 2, 16e3), dd();
    }, gs);
  };
}
function pd() {
  const n = Gi.value.trim();
  !n || ![...ee.values()].some((t) => {
    var i;
    return ((i = t.dc) == null ? void 0 : i.readyState) === "open";
  }) || (Pe({ source: "chat", text: n }), ui("you", n), Gi.value = "");
}
kr.addEventListener("click", pd);
Gi.addEventListener("keydown", (n) => {
  n.key === "Enter" && pd();
});
const $a = document.getElementById("chat-drawer"), Pa = document.getElementById("chat-backdrop");
function Ex() {
  var n;
  $a.classList.add("open"), Pa.classList.add("visible"), (n = document.getElementById("chat-notif")) == null || n.classList.remove("show"), bi.scrollTop = bi.scrollHeight;
}
function Sa() {
  $a.classList.remove("open"), Pa.classList.remove("visible");
}
document.getElementById("chat-toggle-btn").addEventListener("click", () => {
  $a.classList.contains("open") ? Sa() : Ex();
});
document.getElementById("close-chat-btn").addEventListener("click", Sa);
Pa.addEventListener("click", Sa);
const _t = document.getElementById("pip-container"), md = document.getElementById("pip-handle"), _h = document.getElementById("pip-collapse-btn");
let Ln = !1, gd = 0, Qd = 0, gO = 0, QO = 0;
function $d(n, e) {
  Ln = !0, gd = n, Qd = e;
  const t = _t.getBoundingClientRect();
  gO = t.left, QO = t.top, _t.style.right = "auto", _t.style.bottom = "auto", _t.style.left = `${gO}px`, _t.style.top = `${QO}px`;
}
function Pd(n, e) {
  Ln && (_t.style.left = `${Math.max(0, gO + n - gd)}px`, _t.style.top = `${Math.max(0, QO + e - Qd)}px`);
}
md.addEventListener("mousedown", (n) => {
  n.target.closest("#pip-collapse-btn") || ($d(n.clientX, n.clientY), n.preventDefault());
});
document.addEventListener("mousemove", (n) => Pd(n.clientX, n.clientY));
document.addEventListener("mouseup", () => {
  Ln = !1;
});
md.addEventListener("touchstart", (n) => {
  n.target.closest("#pip-collapse-btn") || ($d(n.touches[0].clientX, n.touches[0].clientY), n.preventDefault());
}, { passive: !1 });
document.addEventListener("touchmove", (n) => {
  Ln && Pd(n.touches[0].clientX, n.touches[0].clientY);
}, { passive: !0 });
document.addEventListener("touchend", () => {
  Ln = !1;
});
_h.addEventListener("click", () => {
  const n = _t.classList.toggle("collapsed");
  _h.textContent = n ? "+" : "−";
});
