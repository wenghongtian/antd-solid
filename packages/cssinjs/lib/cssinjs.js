var Rt = Object.defineProperty;
var Bt = (e, t, n) => t in e ? Rt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var N = (e, t, n) => (Bt(e, typeof t != "symbol" ? t + "" : t, n), n);
function Ke(e) {
  for (var t = 0, n, r = 0, o = e.length; o >= 4; ++r, o -= 4)
    n = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, n = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= /* k >>> r: */
    n >>> 24, t = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (o) {
    case 3:
      t ^= (e.charCodeAt(r + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(r + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(r) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
const jt = (e, t) => e === t, ie = Symbol("solid-proxy"), ce = {
  equals: jt
};
let ft = ht;
const B = 1, le = 2, Mt = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var k = null;
let xe = null, x = null, $ = null, O = null, ge = 0;
function Xe(e, t) {
  t = t ? Object.assign({}, ce, t) : ce;
  const n = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, r = (o) => (typeof o == "function" && (o = o(n.value)), dt(n, o));
  return [ut.bind(n), r];
}
function U(e, t, n) {
  const r = Ve(e, t, !1, B);
  J(r);
}
function Qe(e, t, n) {
  ft = Ut;
  const r = Ve(e, t, !1, B), o = Je && Fe(k, Je.id);
  o && (r.suspense = o), (!n || !n.render) && (r.user = !0), O ? O.push(r) : J(r);
}
function L(e, t, n) {
  n = n ? Object.assign({}, ce, n) : ce;
  const r = Ve(e, t, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, J(r), ut.bind(r);
}
function me(e) {
  if (x === null)
    return e();
  const t = x;
  x = null;
  try {
    return e();
  } finally {
    x = t;
  }
}
function Dt(e) {
  return k === null || (k.cleanups === null ? k.cleanups = [e] : k.cleanups.push(e)), e;
}
function Wt(e, t) {
  const n = Symbol("context");
  return {
    id: n,
    Provider: Ft(n),
    defaultValue: e
  };
}
function be(e) {
  let t;
  return (t = Fe(k, e.id)) !== void 0 ? t : e.defaultValue;
}
function Ht(e) {
  const t = L(e), n = L(() => _e(t()));
  return n.toArray = () => {
    const r = n();
    return Array.isArray(r) ? r : r != null ? [r] : [];
  }, n;
}
let Je;
function ut() {
  if (this.sources && this.state)
    if (this.state === B)
      J(this);
    else {
      const e = $;
      $ = null, ye(() => fe(this), !1), $ = e;
    }
  if (x) {
    const e = this.observers ? this.observers.length : 0;
    x.sources ? (x.sources.push(this), x.sourceSlots.push(e)) : (x.sources = [this], x.sourceSlots = [e]), this.observers ? (this.observers.push(x), this.observerSlots.push(x.sources.length - 1)) : (this.observers = [x], this.observerSlots = [x.sources.length - 1]);
  }
  return this.value;
}
function dt(e, t, n) {
  let r = e.value;
  return (!e.comparator || !e.comparator(r, t)) && (e.value = t, e.observers && e.observers.length && ye(() => {
    for (let o = 0; o < e.observers.length; o += 1) {
      const s = e.observers[o], c = xe && xe.running;
      c && xe.disposed.has(s), (c ? !s.tState : !s.state) && (s.pure ? $.push(s) : O.push(s), s.observers && pt(s)), c || (s.state = B);
    }
    if ($.length > 1e6)
      throw $ = [], new Error();
  }, !1)), t;
}
function J(e) {
  if (!e.fn)
    return;
  Ue(e);
  const t = k, n = x, r = ge;
  x = k = e, Kt(e, e.value, r), x = n, k = t;
}
function Kt(e, t, n) {
  let r;
  try {
    r = e.fn(t);
  } catch (o) {
    return e.pure && (e.state = B, e.owned && e.owned.forEach(Ue), e.owned = null), e.updatedAt = n + 1, gt(o);
  }
  (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? dt(e, r) : e.value = r, e.updatedAt = n);
}
function Ve(e, t, n, r = B, o) {
  const s = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: k,
    context: null,
    pure: n
  };
  return k === null || k !== Mt && (k.owned ? k.owned.push(s) : k.owned = [s]), s;
}
function ae(e) {
  if (e.state === 0)
    return;
  if (e.state === le)
    return fe(e);
  if (e.suspense && me(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < ge); )
    e.state && t.push(e);
  for (let n = t.length - 1; n >= 0; n--)
    if (e = t[n], e.state === B)
      J(e);
    else if (e.state === le) {
      const r = $;
      $ = null, ye(() => fe(e, t[0]), !1), $ = r;
    }
}
function ye(e, t) {
  if ($)
    return e();
  let n = !1;
  t || ($ = []), O ? n = !0 : O = [], ge++;
  try {
    const r = e();
    return Vt(n), r;
  } catch (r) {
    n || (O = null), $ = null, gt(r);
  }
}
function Vt(e) {
  if ($ && (ht($), $ = null), e)
    return;
  const t = O;
  O = null, t.length && ye(() => ft(t), !1);
}
function ht(e) {
  for (let t = 0; t < e.length; t++)
    ae(e[t]);
}
function Ut(e) {
  let t, n = 0;
  for (t = 0; t < e.length; t++) {
    const r = e[t];
    r.user ? e[n++] = r : ae(r);
  }
  for (t = 0; t < n; t++)
    ae(e[t]);
}
function fe(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const r = e.sources[n];
    if (r.sources) {
      const o = r.state;
      o === B ? r !== t && (!r.updatedAt || r.updatedAt < ge) && ae(r) : o === le && fe(r, t);
    }
  }
}
function pt(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state || (n.state = le, n.pure ? $.push(n) : O.push(n), n.observers && pt(n));
  }
}
function Ue(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(), r = e.sourceSlots.pop(), o = n.observers;
      if (o && o.length) {
        const s = o.pop(), c = n.observerSlots.pop();
        r < o.length && (s.sourceSlots[c] = r, o[r] = s, n.observerSlots[r] = c);
      }
    }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--)
      Ue(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function gt(e) {
  throw e;
}
function Fe(e, t) {
  return e ? e.context && e.context[t] !== void 0 ? e.context[t] : Fe(e.owner, t) : void 0;
}
function _e(e) {
  if (typeof e == "function" && !e.length)
    return _e(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const r = _e(e[n]);
      Array.isArray(r) ? t.push.apply(t, r) : t.push(r);
    }
    return t;
  }
  return e;
}
function Ft(e, t) {
  return function(r) {
    let o;
    return U(() => o = me(() => (k.context = {
      [e]: r.value
    }, Ht(() => r.children))), void 0), o;
  };
}
let Gt = !1;
function mt(e, t) {
  return me(() => e(t || {}));
}
function ee() {
  return !0;
}
const Pe = {
  get(e, t, n) {
    return t === ie ? n : e.get(t);
  },
  has(e, t) {
    return t === ie ? !0 : e.has(t);
  },
  set: ee,
  deleteProperty: ee,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: ee,
      deleteProperty: ee
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Te(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function zt() {
  for (let e = 0, t = this.length; e < t; ++e) {
    const n = this[e]();
    if (n !== void 0)
      return n;
  }
}
function qt(...e) {
  let t = !1;
  for (let s = 0; s < e.length; s++) {
    const c = e[s];
    t = t || !!c && ie in c, e[s] = typeof c == "function" ? (t = !0, L(c)) : c;
  }
  if (t)
    return new Proxy({
      get(s) {
        for (let c = e.length - 1; c >= 0; c--) {
          const i = Te(e[c])[s];
          if (i !== void 0)
            return i;
        }
      },
      has(s) {
        for (let c = e.length - 1; c >= 0; c--)
          if (s in Te(e[c]))
            return !0;
        return !1;
      },
      keys() {
        const s = [];
        for (let c = 0; c < e.length; c++)
          s.push(...Object.keys(Te(e[c])));
        return [...new Set(s)];
      }
    }, Pe);
  const n = {}, r = {};
  let o = !1;
  for (let s = e.length - 1; s >= 0; s--) {
    const c = e[s];
    if (!c)
      continue;
    const i = Object.getOwnPropertyNames(c);
    o = o || s !== 0 && !!i.length;
    for (let l = 0, u = i.length; l < u; l++) {
      const f = i[l];
      if (!(f === "__proto__" || f === "constructor"))
        if (f in n) {
          const a = r[f], d = Object.getOwnPropertyDescriptor(c, f);
          a ? d.get ? a.push(d.get.bind(c)) : d.value !== void 0 && a.push(() => d.value) : n[f] === void 0 && (n[f] = d.value);
        } else {
          const a = Object.getOwnPropertyDescriptor(c, f);
          a.get ? Object.defineProperty(n, f, {
            enumerable: !0,
            configurable: !0,
            get: zt.bind(r[f] = [a.get.bind(c)])
          }) : n[f] = a.value;
        }
    }
  }
  return n;
}
function Yt(e, ...t) {
  if (ie in e) {
    const o = new Set(t.length > 1 ? t.flat() : t[0]), s = t.map((c) => new Proxy({
      get(i) {
        return c.includes(i) ? e[i] : void 0;
      },
      has(i) {
        return c.includes(i) && i in e;
      },
      keys() {
        return c.filter((i) => i in e);
      }
    }, Pe));
    return s.push(new Proxy({
      get(c) {
        return o.has(c) ? void 0 : e[c];
      },
      has(c) {
        return o.has(c) ? !1 : c in e;
      },
      keys() {
        return Object.keys(e).filter((c) => !o.has(c));
      }
    }, Pe)), s;
  }
  const n = {}, r = t.map(() => ({}));
  for (const o of Object.getOwnPropertyNames(e)) {
    const s = Object.getOwnPropertyDescriptor(e, o), c = !s.get && !s.set && s.enumerable && s.writable && s.configurable;
    let i = !1, l = 0;
    for (const u of t)
      u.includes(o) && (i = !0, c ? r[l][o] = s.value : Object.defineProperty(r[l], o, s)), ++l;
    i || (c ? n[o] = s.value : Object.defineProperty(n, o, s));
  }
  return [...r, n];
}
const Xt = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"], Qt = /* @__PURE__ */ new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...Xt]), Jt = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]), Zt = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
}), en = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  class: "className",
  formnovalidate: {
    $: "formNoValidate",
    BUTTON: 1,
    INPUT: 1
  },
  ismap: {
    $: "isMap",
    IMG: 1
  },
  nomodule: {
    $: "noModule",
    SCRIPT: 1
  },
  playsinline: {
    $: "playsInline",
    VIDEO: 1
  },
  readonly: {
    $: "readOnly",
    INPUT: 1,
    TEXTAREA: 1
  }
});
function tn(e, t) {
  const n = en[e];
  return typeof n == "object" ? n[t] ? n.$ : void 0 : n;
}
const nn = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]), rn = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
function on(e, t, n) {
  let r = n.length, o = t.length, s = r, c = 0, i = 0, l = t[o - 1].nextSibling, u = null;
  for (; c < o || i < s; ) {
    if (t[c] === n[i]) {
      c++, i++;
      continue;
    }
    for (; t[o - 1] === n[s - 1]; )
      o--, s--;
    if (o === c) {
      const f = s < r ? i ? n[i - 1].nextSibling : n[s - i] : l;
      for (; i < s; )
        e.insertBefore(n[i++], f);
    } else if (s === i)
      for (; c < o; )
        (!u || !u.has(t[c])) && t[c].remove(), c++;
    else if (t[c] === n[s - 1] && n[i] === t[o - 1]) {
      const f = t[--o].nextSibling;
      e.insertBefore(n[i++], t[c++].nextSibling), e.insertBefore(n[--s], f), t[o] = n[s];
    } else {
      if (!u) {
        u = /* @__PURE__ */ new Map();
        let a = i;
        for (; a < s; )
          u.set(n[a], a++);
      }
      const f = u.get(t[c]);
      if (f != null)
        if (i < f && f < s) {
          let a = c, d = 1, m;
          for (; ++a < o && a < s && !((m = u.get(t[a])) == null || m !== f + d); )
            d++;
          if (d > f - i) {
            const S = t[c];
            for (; i < f; )
              e.insertBefore(n[i++], S);
          } else
            e.replaceChild(n[i++], t[c++]);
        } else
          c++;
      else
        t[c++].remove();
    }
  }
}
const Ze = "_$DX_DELEGATE";
function sn(e, t, n) {
  let r;
  const o = () => {
    const c = document.createElement("template");
    return c.innerHTML = e, n ? c.content.firstChild.firstChild : c.content.firstChild;
  }, s = t ? () => me(() => document.importNode(r || (r = o()), !0)) : () => (r || (r = o())).cloneNode(!0);
  return s.cloneNode = s, s;
}
function cn(e, t = window.document) {
  const n = t[Ze] || (t[Ze] = /* @__PURE__ */ new Set());
  for (let r = 0, o = e.length; r < o; r++) {
    const s = e[r];
    n.has(s) || (n.add(s), t.addEventListener(s, mn));
  }
}
function ve(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function ln(e, t, n, r) {
  r == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r);
}
function an(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function fn(e, t, n, r) {
  if (r)
    Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
  else if (Array.isArray(n)) {
    const o = n[0];
    e.addEventListener(t, n[0] = (s) => o.call(e, n[1], s));
  } else
    e.addEventListener(t, n);
}
function un(e, t, n = {}) {
  const r = Object.keys(t || {}), o = Object.keys(n);
  let s, c;
  for (s = 0, c = o.length; s < c; s++) {
    const i = o[s];
    !i || i === "undefined" || t[i] || (et(e, i, !1), delete n[i]);
  }
  for (s = 0, c = r.length; s < c; s++) {
    const i = r[s], l = !!t[i];
    !i || i === "undefined" || n[i] === l || !l || (et(e, i, !0), n[i] = l);
  }
  return n;
}
function dn(e, t, n) {
  if (!t)
    return n ? ve(e, "style") : t;
  const r = e.style;
  if (typeof t == "string")
    return r.cssText = t;
  typeof n == "string" && (r.cssText = n = void 0), n || (n = {}), t || (t = {});
  let o, s;
  for (s in n)
    t[s] == null && r.removeProperty(s), delete n[s];
  for (s in t)
    o = t[s], o !== n[s] && (r.setProperty(s, o), n[s] = o);
  return n;
}
function hn(e, t = {}, n, r) {
  const o = {};
  return r || U(() => o.children = ue(e, t.children, o.children)), U(() => t.ref && t.ref(e)), U(() => pn(e, t, n, !0, o, !0)), o;
}
function pn(e, t, n, r, o = {}, s = !1) {
  t || (t = {});
  for (const c in o)
    if (!(c in t)) {
      if (c === "children")
        continue;
      o[c] = tt(e, c, null, o[c], n, s);
    }
  for (const c in t) {
    if (c === "children") {
      r || ue(e, t.children);
      continue;
    }
    const i = t[c];
    o[c] = tt(e, c, i, o[c], n, s);
  }
}
function gn(e) {
  return e.toLowerCase().replace(/-([a-z])/g, (t, n) => n.toUpperCase());
}
function et(e, t, n) {
  const r = t.trim().split(/\s+/);
  for (let o = 0, s = r.length; o < s; o++)
    e.classList.toggle(r[o], n);
}
function tt(e, t, n, r, o, s) {
  let c, i, l, u, f;
  if (t === "style")
    return dn(e, n, r);
  if (t === "classList")
    return un(e, n, r);
  if (n === r)
    return r;
  if (t === "ref")
    s || n(e);
  else if (t.slice(0, 3) === "on:") {
    const a = t.slice(3);
    r && e.removeEventListener(a, r), n && e.addEventListener(a, n);
  } else if (t.slice(0, 10) === "oncapture:") {
    const a = t.slice(10);
    r && e.removeEventListener(a, r, !0), n && e.addEventListener(a, n, !0);
  } else if (t.slice(0, 2) === "on") {
    const a = t.slice(2).toLowerCase(), d = nn.has(a);
    if (!d && r) {
      const m = Array.isArray(r) ? r[0] : r;
      e.removeEventListener(a, m);
    }
    (d || n) && (fn(e, a, n, d), d && cn([a]));
  } else if (t.slice(0, 5) === "attr:")
    ve(e, t.slice(5), n);
  else if ((f = t.slice(0, 5) === "prop:") || (l = Jt.has(t)) || !o && ((u = tn(t, e.tagName)) || (i = Qt.has(t))) || (c = e.nodeName.includes("-")))
    f && (t = t.slice(5), i = !0), t === "class" || t === "className" ? an(e, n) : c && !i && !l ? e[gn(t)] = n : e[u || t] = n;
  else {
    const a = o && t.indexOf(":") > -1 && rn[t.split(":")[0]];
    a ? ln(e, a, t, n) : ve(e, Zt[t] || t, n);
  }
  return n;
}
function mn(e) {
  const t = `$$${e.type}`;
  let n = e.composedPath && e.composedPath()[0] || e.target;
  for (e.target !== n && Object.defineProperty(e, "target", {
    configurable: !0,
    value: n
  }), Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return n || document;
    }
  }); n; ) {
    const r = n[t];
    if (r && !n.disabled) {
      const o = n[`${t}Data`];
      if (o !== void 0 ? r.call(n, o, e) : r.call(n, e), e.cancelBubble)
        return;
    }
    n = n._$host || n.parentNode || n.host;
  }
}
function ue(e, t, n, r, o) {
  for (; typeof n == "function"; )
    n = n();
  if (t === n)
    return n;
  const s = typeof t, c = r !== void 0;
  if (e = c && n[0] && n[0].parentNode || e, s === "string" || s === "number")
    if (s === "number" && (t = t.toString()), c) {
      let i = n[0];
      i && i.nodeType === 3 ? i.data = t : i = document.createTextNode(t), n = H(e, n, r, i);
    } else
      n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t;
  else if (t == null || s === "boolean")
    n = H(e, n, r);
  else {
    if (s === "function")
      return U(() => {
        let i = t();
        for (; typeof i == "function"; )
          i = i();
        n = ue(e, i, n, r);
      }), () => n;
    if (Array.isArray(t)) {
      const i = [], l = n && Array.isArray(n);
      if (Oe(i, t, n, o))
        return U(() => n = ue(e, i, n, r, !0)), () => n;
      if (i.length === 0) {
        if (n = H(e, n, r), c)
          return n;
      } else
        l ? n.length === 0 ? nt(e, i, r) : on(e, n, i) : (n && H(e), nt(e, i));
      n = i;
    } else if (t.nodeType) {
      if (Array.isArray(n)) {
        if (c)
          return n = H(e, n, r, t);
        H(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      n = t;
    } else
      console.warn("Unrecognized value. Skipped inserting", t);
  }
  return n;
}
function Oe(e, t, n, r) {
  let o = !1;
  for (let s = 0, c = t.length; s < c; s++) {
    let i = t[s], l = n && n[s], u;
    if (!(i == null || i === !0 || i === !1))
      if ((u = typeof i) == "object" && i.nodeType)
        e.push(i);
      else if (Array.isArray(i))
        o = Oe(e, i, l) || o;
      else if (u === "function")
        if (r) {
          for (; typeof i == "function"; )
            i = i();
          o = Oe(e, Array.isArray(i) ? i : [i], Array.isArray(l) ? l : [l]) || o;
        } else
          e.push(i), o = !0;
      else {
        const f = String(i);
        l && l.nodeType === 3 && l.data === f ? e.push(l) : e.push(document.createTextNode(f));
      }
  }
  return o;
}
function nt(e, t, n = null) {
  for (let r = 0, o = t.length; r < o; r++)
    e.insertBefore(t[r], n);
}
function H(e, t, n, r) {
  if (n === void 0)
    return e.textContent = "";
  const o = r || document.createTextNode("");
  if (t.length) {
    let s = !1;
    for (let c = t.length - 1; c >= 0; c--) {
      const i = t[c];
      if (o !== i) {
        const l = i.parentNode === e;
        !s && !c ? l ? e.replaceChild(o, i) : e.insertBefore(o, n) : l && i.remove();
      } else
        s = !0;
    }
  } else
    e.insertBefore(o, n);
  return [o];
}
class bn {
  constructor(t) {
    N(this, "instanceId");
    /** @private Internal cache map. Do not access this directly */
    N(this, "cache", /* @__PURE__ */ new Map());
    this.instanceId = t;
  }
  get(t) {
    return this.cache.get(t.join("%")) || null;
  }
  update(t, n) {
    const r = t.join("%"), o = this.cache.get(r), s = n(o);
    s === null ? this.cache.delete(r) : this.cache.set(r, s);
  }
}
const de = "data-token-hash", M = "data-css-hash", yn = "data-dev-cache-path", V = "__cssinjs_instance__";
function bt() {
  const e = Math.random().toString(12).slice(2);
  if (typeof document < "u" && document.head && document.body) {
    const t = document.body.querySelectorAll(`style[${M}]`) || [], {
      firstChild: n
    } = document.head;
    Array.from(t).forEach((o) => {
      o[V] = o[V] || e, o[V] === e && document.head.insertBefore(o, n);
    });
    const r = {};
    Array.from(document.querySelectorAll(`style[${M}]`)).forEach((o) => {
      var c;
      const s = o.getAttribute(M);
      r[s] ? o[V] === e && ((c = o.parentNode) == null || c.removeChild(o)) : r[s] = !0;
    });
  }
  return new bn(e);
}
const Y = Wt(L(() => ({
  hashPriority: "low",
  cache: bt(),
  defaultCache: !0
}))), mr = (e) => {
  const [t, n] = Yt(e, ["children"]), r = be(Y), o = {
    ...r()
  }, s = L(() => {
    Object.keys(n).forEach((i) => {
      const l = n[i];
      n[i] !== void 0 && (o[i] = l);
    });
    const {
      cache: c
    } = n;
    return o.cache = o.cache || bt(), o.defaultCache = !c && r().defaultCache, o;
  });
  return mt(Y.Provider, {
    value: s,
    get children() {
      return t.children;
    }
  });
};
let Ie = {};
const Ge = [], Sn = (e) => {
  Ge.push(e);
};
function wn(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    const n = Ge.reduce(
      (r, o) => o(r ?? "", "warning"),
      t
    );
    n && console.error(`Warning: ${n}`);
  }
}
function Cn(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    const n = Ge.reduce(
      (r, o) => o(r ?? "", "note"),
      t
    );
    n && console.warn(`Note: ${n}`);
  }
}
function En() {
  Ie = {};
}
function yt(e, t, n) {
  !t && !Ie[n] && (e(!1, n), Ie[n] = !0);
}
function Z(e, t) {
  yt(wn, e, t);
}
function An(e, t) {
  yt(Cn, e, t);
}
Z.preMessage = Sn;
Z.resetWarned = En;
Z.noteOnce = An;
function ze() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
function xn(e, t) {
  if (!e)
    return !1;
  if (e.contains)
    return e.contains(t);
  let n = t;
  for (; n; ) {
    if (n === e)
      return !0;
    n = n.parentNode;
  }
  return !1;
}
const rt = "data-rc-order", Tn = "rc-util-key", Re = /* @__PURE__ */ new Map();
function St({ mark: e } = {}) {
  return e ? e.startsWith("data-") ? e : `data-${e}` : Tn;
}
function Se(e) {
  return e.attachTo ? e.attachTo : document.querySelector("head") || document.body;
}
function kn(e) {
  return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function wt(e) {
  return Array.from((Re.get(e) || e).children).filter(
    (t) => t.tagName === "STYLE"
  );
}
function Ct(e, t = {}) {
  if (!ze())
    return null;
  const { csp: n, prepend: r } = t, o = document.createElement("style");
  o.setAttribute(rt, kn(r)), n != null && n.nonce && (o.nonce = n == null ? void 0 : n.nonce), o.innerHTML = e;
  const s = Se(t), { firstChild: c } = s;
  if (r) {
    if (r === "queue") {
      const i = wt(s).filter(
        (l) => ["prepend", "prependQueue"].includes(l.getAttribute(rt))
      );
      if (i.length)
        return s.insertBefore(o, i[i.length - 1].nextSibling), o;
    }
    s.insertBefore(o, c);
  } else
    s.appendChild(o);
  return o;
}
function Et(e, t = {}) {
  const n = Se(t);
  return wt(n).find((r) => r.getAttribute(St(t)) === e);
}
function At(e, t = {}) {
  const n = Et(e, t);
  n && Se(t).removeChild(n);
}
function $n(e, t) {
  const n = Re.get(e);
  if (!n || !xn(document, n)) {
    const r = Ct("", t), { parentNode: o } = r;
    Re.set(e, o), e.removeChild(r);
  }
}
function Be(e, t, n = {}) {
  var r, o, s;
  const c = Se(n);
  $n(c, n);
  const i = Et(t, n);
  if (i)
    return (r = n.csp) != null && r.nonce && i.nonce !== ((o = n.csp) == null ? void 0 : o.nonce) && (i.nonce = (s = n.csp) == null ? void 0 : s.nonce), i.innerHTML !== e && (i.innerHTML = e), i;
  const l = Ct(e, n);
  return l.setAttribute(St(n), t), l;
}
function he(e) {
  let t = "";
  return Object.keys(e).forEach((n) => {
    const r = e[n];
    t += n, r && typeof r == "object" ? t += he(r) : t += r;
  }), t;
}
function Nn(e, t) {
  return Ke(`${t}_${he(e)}`);
}
const q = `layer-${Date.now()}-${Math.random()}`.replace(/\./g, ""), xt = "903px";
function Ln(e, t) {
  var n;
  if (ze()) {
    Be(e, q);
    const r = document.createElement("div");
    r.style.position = "fixed", r.style.left = "0", r.style.top = "0", t == null || t(r), document.body.appendChild(r), process.env.NODE_ENV !== "production" && (r.innerHTML = "Test", r.style.zIndex = "9999999");
    const o = getComputedStyle(r).width === xt;
    return (n = r.parentNode) == null || n.removeChild(r), At(q), o;
  }
  return !1;
}
let ke;
function _n() {
  return ke === void 0 && (ke = Ln(
    `@layer ${q} { .${q} { width: ${xt}!important; } }`,
    (e) => {
      e.className = q;
    }
  )), ke;
}
function Pn() {
  return !1;
}
let je = !1;
function vn() {
  return je;
}
const On = process.env.NODE_ENV === "production" ? Pn : vn;
if (process.env.NODE_ENV !== "production" && typeof module < "u" && module && module.hot) {
  const e = window;
  if (typeof e.webpackHotUpdate == "function") {
    const t = e.webpackHotUpdate;
    e.webpackHotUpdate = (...n) => (je = !0, setTimeout(() => {
      je = !1;
    }, 0), t(...n));
  }
}
function Tt(e, t, n, r) {
  const o = be(Y), s = L(() => o().cache), [c, i] = Xe([e, ...t()]), [l, u] = Xe(s().get(c())[1]);
  Qe(() => {
    i([e, ...t()]);
  });
  const f = On();
  return Qe(() => {
    s().update(c(), (a) => {
      const [d = 0, m] = a || [];
      let S = m;
      process.env.NODE_ENV !== "production" && m && f && (r == null || r(S, f), S = null);
      const T = S || n();
      return [d + 1, T];
    }), u(s().get(c())[1]);
  }), Dt(() => {
    s().update(c(), (a) => {
      const [d = 0, m] = a || [];
      return d - 1 === 0 ? (r == null || r(m, !1), null) : [d - 1, m];
    });
  }), l;
}
const ot = {}, In = process.env.NODE_ENV !== "production" ? "css-dev-only-do-not-override" : "css", j = /* @__PURE__ */ new Map();
function Rn(e) {
  j.set(e, (j.get(e) || 0) + 1);
}
function Bn(e, t) {
  typeof document < "u" && document.querySelectorAll(`style[${de}="${e}"]`).forEach((r) => {
    var o;
    r[V] === t && ((o = r.parentNode) == null || o.removeChild(r));
  });
}
function jn(e, t) {
  j.set(e, (j.get(e) || 0) - 1);
  const n = Array.from(j.keys()), r = n.filter((o) => (j.get(o) || 0) <= 0);
  r.length < n.length && r.forEach((o) => {
    Bn(o, t), j.delete(o);
  });
}
const Mn = (e, t, n, r) => {
  let s = {
    ...n.getDerivativeToken(e),
    ...t
  };
  return r && (s = r(s)), s;
};
function br(e, t, n = L(() => ({}))) {
  const r = be(Y), o = L(() => Object.assign({}, ...t())), s = L(() => he(o())), c = L(() => he(n().override || ot));
  return Tt("token", L(() => [n().salt || "", e().id, s(), c()]), () => {
    const {
      override: l = ot,
      formatToken: u,
      salt: f
    } = n(), a = Mn(o(), l, e(), u), d = Nn(a, f || "");
    a._tokenKey = d, Rn(d);
    const m = `${In}-${Ke(d)}`;
    return a._hashId = m, [a, m];
  }, (l) => {
    jn(l[0]._tokenKey, r().cache.instanceId);
  });
}
var kt = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, $t = "comm", Nt = "rule", Lt = "decl", Dn = "@import", Wn = "@keyframes", Hn = "@layer", Kn = Math.abs, qe = String.fromCharCode;
function _t(e) {
  return e.trim();
}
function re(e, t, n) {
  return e.replace(t, n);
}
function Vn(e, t) {
  return e.indexOf(t);
}
function X(e, t) {
  return e.charCodeAt(t) | 0;
}
function Q(e, t, n) {
  return e.slice(t, n);
}
function I(e) {
  return e.length;
}
function Pt(e) {
  return e.length;
}
function te(e, t) {
  return t.push(e), e;
}
var we = 1, F = 1, vt = 0, P = 0, E = 0, G = "";
function Ye(e, t, n, r, o, s, c) {
  return { value: e, root: t, parent: n, type: r, props: o, children: s, line: we, column: F, length: c, return: "" };
}
function Un() {
  return E;
}
function Fn() {
  return E = P > 0 ? X(G, --P) : 0, F--, E === 10 && (F = 1, we--), E;
}
function v() {
  return E = P < vt ? X(G, P++) : 0, F++, E === 10 && (F = 1, we++), E;
}
function D() {
  return X(G, P);
}
function oe() {
  return P;
}
function Ce(e, t) {
  return Q(G, e, t);
}
function Me(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function Gn(e) {
  return we = F = 1, vt = I(G = e), P = 0, [];
}
function zn(e) {
  return G = "", e;
}
function $e(e) {
  return _t(Ce(P - 1, De(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function qn(e) {
  for (; (E = D()) && E < 33; )
    v();
  return Me(e) > 2 || Me(E) > 3 ? "" : " ";
}
function Yn(e, t) {
  for (; --t && v() && !(E < 48 || E > 102 || E > 57 && E < 65 || E > 70 && E < 97); )
    ;
  return Ce(e, oe() + (t < 6 && D() == 32 && v() == 32));
}
function De(e) {
  for (; v(); )
    switch (E) {
      case e:
        return P;
      case 34:
      case 39:
        e !== 34 && e !== 39 && De(E);
        break;
      case 40:
        e === 41 && De(e);
        break;
      case 92:
        v();
        break;
    }
  return P;
}
function Xn(e, t) {
  for (; v() && e + E !== 47 + 10; )
    if (e + E === 42 + 42 && D() === 47)
      break;
  return "/*" + Ce(t, P - 1) + "*" + qe(e === 47 ? e : v());
}
function Qn(e) {
  for (; !Me(D()); )
    v();
  return Ce(e, P);
}
function Jn(e) {
  return zn(se("", null, null, null, [""], e = Gn(e), 0, [0], e));
}
function se(e, t, n, r, o, s, c, i, l) {
  for (var u = 0, f = 0, a = c, d = 0, m = 0, S = 0, T = 1, A = 1, g = 1, b = 0, w = "", p = o, C = s, y = r, h = w; A; )
    switch (S = b, b = v()) {
      case 40:
        if (S != 108 && X(h, a - 1) == 58) {
          Vn(h += re($e(b), "&", "&\f"), "&\f") != -1 && (g = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        h += $e(b);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        h += qn(S);
        break;
      case 92:
        h += Yn(oe() - 1, 7);
        continue;
      case 47:
        switch (D()) {
          case 42:
          case 47:
            te(Zn(Xn(v(), oe()), t, n), l);
            break;
          default:
            h += "/";
        }
        break;
      case 123 * T:
        i[u++] = I(h) * g;
      case 125 * T:
      case 59:
      case 0:
        switch (b) {
          case 0:
          case 125:
            A = 0;
          case 59 + f:
            g == -1 && (h = re(h, /\f/g, "")), m > 0 && I(h) - a && te(m > 32 ? it(h + ";", r, n, a - 1) : it(re(h, " ", "") + ";", r, n, a - 2), l);
            break;
          case 59:
            h += ";";
          default:
            if (te(y = st(h, t, n, u, f, o, i, w, p = [], C = [], a), s), b === 123)
              if (f === 0)
                se(h, t, y, y, p, s, a, i, C);
              else
                switch (d === 99 && X(h, 3) === 110 ? 100 : d) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    se(e, y, y, r && te(st(e, y, y, 0, 0, o, i, w, o, p = [], a), C), o, C, a, i, r ? p : C);
                    break;
                  default:
                    se(h, y, y, y, [""], C, 0, i, C);
                }
        }
        u = f = m = 0, T = g = 1, w = h = "", a = c;
        break;
      case 58:
        a = 1 + I(h), m = S;
      default:
        if (T < 1) {
          if (b == 123)
            --T;
          else if (b == 125 && T++ == 0 && Fn() == 125)
            continue;
        }
        switch (h += qe(b), b * T) {
          case 38:
            g = f > 0 ? 1 : (h += "\f", -1);
            break;
          case 44:
            i[u++] = (I(h) - 1) * g, g = 1;
            break;
          case 64:
            D() === 45 && (h += $e(v())), d = D(), f = a = I(w = h += Qn(oe())), b++;
            break;
          case 45:
            S === 45 && I(h) == 2 && (T = 0);
        }
    }
  return s;
}
function st(e, t, n, r, o, s, c, i, l, u, f) {
  for (var a = o - 1, d = o === 0 ? s : [""], m = Pt(d), S = 0, T = 0, A = 0; S < r; ++S)
    for (var g = 0, b = Q(e, a + 1, a = Kn(T = c[S])), w = e; g < m; ++g)
      (w = _t(T > 0 ? d[g] + " " + b : re(b, /&\f/g, d[g]))) && (l[A++] = w);
  return Ye(e, t, n, o === 0 ? Nt : i, l, u, f);
}
function Zn(e, t, n) {
  return Ye(e, t, n, $t, qe(Un()), Q(e, 2, -2), 0);
}
function it(e, t, n, r) {
  return Ye(e, t, n, Lt, Q(e, 0, r), Q(e, r + 1, -1), r);
}
function We(e, t) {
  for (var n = "", r = Pt(e), o = 0; o < r; o++)
    n += t(e[o], o, e, t) || "";
  return n;
}
function er(e, t, n, r) {
  switch (e.type) {
    case Hn:
      if (e.children.length)
        break;
    case Dn:
    case Lt:
      return e.return = e.return || e.value;
    case $t:
      return "";
    case Wn:
      return e.return = e.value + "{" + We(e.children, r) + "}";
    case Nt:
      e.value = e.props.join(",");
  }
  return I(n = We(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
function R(e, t) {
  const { path: n, parentSelectors: r } = t;
  Z(
    !1,
    `[Ant Design CSS-in-JS] ${n ? `Error in ${n}: ` : ""}${e}${r.length ? ` Selector: ${r.join(" | ")}` : ""}`
  );
}
const tr = (e, t, n) => {
  if (e === "content") {
    const r = /(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
    (typeof t != "string" || ["normal", "none", "initial", "inherit", "unset"].indexOf(t) === -1 && !r.test(t) && (t.charAt(0) !== t.charAt(t.length - 1) || t.charAt(0) !== '"' && t.charAt(0) !== "'")) && R(
      `You seem to be using a value for 'content' without quotes, try replacing it with \`content: '"${t}"'\`.`,
      n
    );
  }
}, nr = (e, t, n) => {
  e === "animation" && n.hashId && t !== "none" && R(
    `You seem to be using hashed animation '${t}', in which case 'animationName' with Keyframe as value is recommended.`,
    n
  );
};
function rr(e) {
  var r;
  return (((r = e.match(/:not\(([^)]*)\)/)) == null ? void 0 : r[1]) || "").split(/(\[[^[]*])|(?=[.#])/).filter((o) => o).length > 1;
}
function or(e) {
  return e.parentSelectors.reduce((t, n) => t ? n.includes("&") ? n.replace(/&/g, t) : `${t} ${n}` : n, "");
}
const yr = (e, t, n) => {
  const o = or(n).match(/:not\([^)]*\)/g) || [];
  o.length > 0 && o.some(rr) && R("Concat ':not' selector not support in legacy browsers.", n);
}, Sr = (e, t, n) => {
  switch (e) {
    case "marginLeft":
    case "marginRight":
    case "paddingLeft":
    case "paddingRight":
    case "left":
    case "right":
    case "borderLeft":
    case "borderLeftWidth":
    case "borderLeftStyle":
    case "borderLeftColor":
    case "borderRight":
    case "borderRightWidth":
    case "borderRightStyle":
    case "borderRightColor":
    case "borderTopLeftRadius":
    case "borderTopRightRadius":
    case "borderBottomLeftRadius":
    case "borderBottomRightRadius":
      R(
        `You seem to be using non-logical property '${e}' which is not compatible with RTL mode. Please use logical properties and values instead. For more information: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties.`,
        n
      );
      return;
    case "margin":
    case "padding":
    case "borderWidth":
    case "borderStyle":
      if (typeof t == "string") {
        const r = t.split(" ").map((o) => o.trim());
        r.length === 4 && r[1] !== r[3] && R(
          `You seem to be using '${e}' property with different left ${e} and right ${e}, which is not compatible with RTL mode. Please use logical properties and values instead. For more information: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties.`,
          n
        );
      }
      return;
    case "clear":
    case "textAlign":
      (t === "left" || t === "right") && R(
        `You seem to be using non-logical value '${t}' of ${e}, which is not compatible with RTL mode. Please use logical properties and values instead. For more information: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties.`,
        n
      );
      return;
    case "borderRadius":
      typeof t == "string" && t.split("/").map((s) => s.trim()).reduce((s, c) => {
        if (s)
          return s;
        const i = c.split(" ").map((l) => l.trim());
        return i.length >= 2 && i[0] !== i[1] || i.length === 3 && i[1] !== i[2] || i.length === 4 && i[2] !== i[3] ? !0 : s;
      }, !1) && R(
        `You seem to be using non-logical value '${t}' of ${e}, which is not compatible with RTL mode. Please use logical properties and values instead. For more information: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties.`,
        n
      );
      return;
  }
}, wr = (e, t, n) => {
  n.parentSelectors.some((r) => r.split(",").some((s) => s.split("&").length > 2)) && R("Should not use more than one `&` in a selector.", n);
}, sr = /* @__PURE__ */ sn("<style>"), ct = ze(), Ot = "_skip_check_", It = "_multi_value_";
function lt(e) {
  return We(Jn(e), er).replace(/\{%%%\:[^;];}/g, ";");
}
function ir(e) {
  return typeof e == "object" && e && (Ot in e || It in e);
}
function cr(e, t, n) {
  if (!t)
    return e;
  const r = `.${t}`, o = n === "low" ? `:where(${r})` : r;
  return e.split(",").map((c) => {
    var f;
    const i = c.trim().split(/\s+/);
    let l = i[0] || "";
    const u = ((f = l.match(/^\w+/)) == null ? void 0 : f[0]) || "";
    return l = `${u}${o}${l.slice(u.length)}`, [l, ...i.slice(1)].join(" ");
  }).join(",");
}
const He = (e, t = {}, {
  root: n,
  injectHash: r,
  parentSelectors: o
} = {
  root: !0,
  parentSelectors: []
}) => {
  const {
    hashId: s,
    layer: c,
    path: i,
    hashPriority: l,
    transformers: u = [],
    linters: f = []
  } = t;
  let a = "", d = {};
  function m(A) {
    const g = A.getName(s);
    if (!d[g]) {
      const [b] = He(A.style, t, {
        root: !1,
        parentSelectors: o
      });
      d[g] = `@keyframes ${A.getName(s)}${b}`;
    }
  }
  function S(A, g = []) {
    return A.forEach((b) => {
      Array.isArray(b) ? S(b, g) : b && g.push(b);
    }), g;
  }
  if (S(Array.isArray(e) ? e : [e]).forEach((A) => {
    const g = typeof A == "string" && !n ? {} : A;
    if (typeof g == "string")
      a += `${g}
`;
    else if (g._keyframe)
      m(g);
    else {
      const b = u.reduce((w, p) => {
        var C;
        return ((C = p == null ? void 0 : p.visit) == null ? void 0 : C.call(p, w)) || w;
      }, g);
      Object.keys(b).forEach((w) => {
        const p = b[w];
        if (typeof p == "object" && p && (w !== "animationName" || !p._keyframe) && !ir(p)) {
          let C = !1, y = w.trim(), h = !1;
          (n || r) && s ? y.startsWith("@") ? C = !0 : y = cr(w, s, l) : n && !s && (y === "&" || y === "") && (y = "", h = !0);
          const [_, Ee] = He(p, t, {
            root: h,
            injectHash: C,
            parentSelectors: [...o, y]
          });
          d = {
            ...d,
            ...Ee
          }, a += `${y}${_}`;
        } else {
          let C = function(h, _) {
            process.env.NODE_ENV !== "production" && (typeof p != "object" || !(p != null && p[Ot])) && [tr, nr, ...f].forEach((Ae) => Ae(h, _, {
              path: i,
              hashId: s,
              parentSelectors: o
            }));
            const Ee = h.replace(/[A-Z]/g, (Ae) => `-${Ae.toLowerCase()}`);
            let W = _;
            !kt[h] && typeof W == "number" && W !== 0 && (W = `${W}px`), h === "animationName" && (_ != null && _._keyframe) && (m(_), W = _.getName(s)), a += `${Ee}:${W};`;
          };
          const y = (p == null ? void 0 : p.value) ?? p;
          typeof p == "object" && (p != null && p[It]) && Array.isArray(y) ? y.forEach((h) => {
            C(w, h);
          }) : C(w, y);
        }
      });
    }
  }), !n)
    a = `{${a}}`;
  else if (c && _n()) {
    const A = c.split(",");
    a = `@layer ${A[A.length - 1].trim()} {${a}}`, A.length > 1 && (a = `@layer ${c}{%%%:%}${a}`);
  }
  return [a, d];
};
function lr(e, t) {
  return Ke(`${e.join("%")}${t}`);
}
function ar() {
  return null;
}
function Cr(e, t) {
  const n = be(Y), r = L(() => e().token._tokenKey), o = L(() => [r(), ...e().path]);
  let s = ct;
  process.env.NODE_ENV !== "production" && n().mock !== void 0 && (s = n().mock === "client");
  const c = Tt(
    "style",
    o,
    // Create cache if needed
    () => {
      const i = t(), {
        hashId: l,
        layer: u,
        path: f,
        nonce: a
      } = e(), {
        hashPriority: d,
        transformers: m,
        linters: S,
        container: T,
        cache: A
      } = n(), [g, b] = He(i, {
        hashId: l,
        hashPriority: d,
        layer: u,
        path: f.join("-"),
        transformers: m,
        linters: S
      }), w = lt(g), p = lr(o(), w);
      if (s) {
        const C = {
          mark: M,
          prepend: "queue",
          attachTo: T
        }, y = typeof a == "function" ? a() : a;
        y && (C.csp = {
          nonce: y
        });
        const h = Be(w, p, C);
        h[V] = A.instanceId, h.setAttribute(de, r()), process.env.NODE_ENV !== "production" && h.setAttribute(yn, o().join("|")), Object.keys(b).forEach((_) => {
          Be(lt(b[_]), `_effect-${_}`, C);
        });
      }
      return [w, r(), p];
    },
    // Remove cache if no need
    ([, , i], l) => {
      const {
        autoClear: u
      } = n();
      (l || u) && ct && At(i, {
        mark: M
      });
    }
  );
  return (i) => {
    let l;
    const {
      ssrInline: u,
      defaultCache: f
    } = n();
    if (!u || s || !f)
      l = mt(ar, {});
    else {
      const [a, d, m] = c();
      l = (() => {
        const S = sr();
        return hn(S, qt({
          [de]: a,
          [M]: d
        }, {
          innerHTML: m
        }), !1, !1), S;
      })();
    }
    return [l, i];
  };
}
function Er(e, t = !1) {
  const n = Array.from(e.cache.keys()).filter((o) => o.startsWith("style%"));
  let r = "";
  return n.forEach((o) => {
    const [s, c, i] = e.cache.get(o)[1];
    r += t ? s : `<style ${de}="${c}" ${M}="${i}">${s}</style>`;
  }), r;
}
class Ar {
  constructor(t, n) {
    N(this, "name");
    N(this, "style");
    N(this, "_keyframe", !0);
    this.name = t, this.style = n;
  }
  getName(t = "") {
    return t ? `${t}-${this.name}` : this.name;
  }
}
function fr(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
const pe = class {
  constructor() {
    N(this, "cache");
    N(this, "keys");
    N(this, "cacheCallTimes");
    this.cache = /* @__PURE__ */ new Map(), this.keys = [], this.cacheCallTimes = 0;
  }
  size() {
    return this.keys.length;
  }
  internalGet(t, n = !1) {
    let r = { map: this.cache };
    return t.forEach((o) => {
      var s;
      r ? r = (s = r == null ? void 0 : r.map) == null ? void 0 : s.get(o) : r = void 0;
    }), r != null && r.value && n && (r.value[1] = this.cacheCallTimes++), r == null ? void 0 : r.value;
  }
  get(t) {
    var n;
    return (n = this.internalGet(t, !0)) == null ? void 0 : n[0];
  }
  has(t) {
    return !!this.internalGet(t);
  }
  set(t, n) {
    if (!this.has(t)) {
      if (this.size() + 1 > pe.MAX_CACHE_SIZE + pe.MAX_CACHE_OFFSET) {
        const [o] = this.keys.reduce(
          (s, c) => {
            const [, i] = s;
            return this.internalGet(c)[1] < i ? [c, this.internalGet(c)[1]] : s;
          },
          [this.keys[0], this.cacheCallTimes]
        );
        this.delete(o);
      }
      this.keys.push(t);
    }
    let r = this.cache;
    t.forEach((o, s) => {
      if (s === t.length - 1)
        r.set(o, { value: [n, this.cacheCallTimes++] });
      else {
        const c = r.get(o);
        c ? c.map || (c.map = /* @__PURE__ */ new Map()) : r.set(o, { map: /* @__PURE__ */ new Map() }), r = r.get(o).map;
      }
    });
  }
  deleteByPath(t, n) {
    var s;
    const r = t.get(n[0]);
    if (n.length === 1)
      return r.map ? t.set(n[0], { map: r.map }) : t.delete(n[0]), (s = r.value) == null ? void 0 : s[0];
    const o = this.deleteByPath(r.map, n.slice(1));
    return (!r.map || r.map.size === 0) && !r.value && t.delete(n[0]), o;
  }
  delete(t) {
    if (this.has(t))
      return this.keys = this.keys.filter((n) => !fr(n, t)), this.deleteByPath(this.cache, t);
  }
};
let z = pe;
N(z, "MAX_CACHE_SIZE", 20), N(z, "MAX_CACHE_OFFSET", 5);
let at = 0;
class ur {
  constructor(t) {
    N(this, "derivatives");
    N(this, "id");
    this.derivatives = Array.isArray(t) ? t : [t], this.id = at, t.length === 0 && Z(
      t.length > 0,
      "[Ant Design CSS-in-JS] Theme should have at least one derivative function."
    ), at += 1;
  }
  getDerivativeToken(t) {
    return this.derivatives.reduce(
      (n, r) => r(t, n),
      void 0
    );
  }
}
const Ne = new z();
function xr(e) {
  const t = Array.isArray(e) ? e : [e];
  return Ne.has(t) || Ne.set(t, new ur(t)), Ne.get(t);
}
function dr(e) {
  if (typeof e == "number")
    return [[e], !1];
  const t = String(e).trim(), n = t.match(/(.*)(!important)/), r = (n ? n[1] : t).trim().split(/\s+/);
  let o = "", s = 0;
  return [
    r.reduce((c, i) => (i.includes("(") ? (o += i, s += i.split("(").length - 1) : i.includes(")") ? (o += i, s -= i.split(")").length - 1, s === 0 && (c.push(o), o = "")) : s > 0 ? o += i : c.push(i), c), []),
    !!n
  ];
}
function K(e) {
  return e.notSplit = !0, e;
}
const hr = {
  // Inset
  inset: ["top", "right", "bottom", "left"],
  insetBlock: ["top", "bottom"],
  insetBlockStart: ["top"],
  insetBlockEnd: ["bottom"],
  insetInline: ["left", "right"],
  insetInlineStart: ["left"],
  insetInlineEnd: ["right"],
  // Margin
  marginBlock: ["marginTop", "marginBottom"],
  marginBlockStart: ["marginTop"],
  marginBlockEnd: ["marginBottom"],
  marginInline: ["marginLeft", "marginRight"],
  marginInlineStart: ["marginLeft"],
  marginInlineEnd: ["marginRight"],
  // Padding
  paddingBlock: ["paddingTop", "paddingBottom"],
  paddingBlockStart: ["paddingTop"],
  paddingBlockEnd: ["paddingBottom"],
  paddingInline: ["paddingLeft", "paddingRight"],
  paddingInlineStart: ["paddingLeft"],
  paddingInlineEnd: ["paddingRight"],
  // Border
  borderBlock: K(["borderTop", "borderBottom"]),
  borderBlockStart: K(["borderTop"]),
  borderBlockEnd: K(["borderBottom"]),
  borderInline: K(["borderLeft", "borderRight"]),
  borderInlineStart: K(["borderLeft"]),
  borderInlineEnd: K(["borderRight"]),
  // Border width
  borderBlockWidth: ["borderTopWidth", "borderBottomWidth"],
  borderBlockStartWidth: ["borderTopWidth"],
  borderBlockEndWidth: ["borderBottomWidth"],
  borderInlineWidth: ["borderLeftWidth", "borderRightWidth"],
  borderInlineStartWidth: ["borderLeftWidth"],
  borderInlineEndWidth: ["borderRightWidth"],
  // Border style
  borderBlockStyle: ["borderTopStyle", "borderBottomStyle"],
  borderBlockStartStyle: ["borderTopStyle"],
  borderBlockEndStyle: ["borderBottomStyle"],
  borderInlineStyle: ["borderLeftStyle", "borderRightStyle"],
  borderInlineStartStyle: ["borderLeftStyle"],
  borderInlineEndStyle: ["borderRightStyle"],
  // Border color
  borderBlockColor: ["borderTopColor", "borderBottomColor"],
  borderBlockStartColor: ["borderTopColor"],
  borderBlockEndColor: ["borderBottomColor"],
  borderInlineColor: ["borderLeftColor", "borderRightColor"],
  borderInlineStartColor: ["borderLeftColor"],
  borderInlineEndColor: ["borderRightColor"],
  // Border radius
  borderStartStartRadius: ["borderTopLeftRadius"],
  borderStartEndRadius: ["borderTopRightRadius"],
  borderEndStartRadius: ["borderBottomLeftRadius"],
  borderEndEndRadius: ["borderBottomRightRadius"]
};
function ne(e, t) {
  let n = e;
  return t && (n = `${n} !important`), { _skip_check_: !0, value: n };
}
const Tr = {
  visit: (e) => {
    const t = {};
    return Object.keys(e).forEach((n) => {
      const r = e[n], o = hr[n];
      if (o && (typeof r == "number" || typeof r == "string")) {
        const [s, c] = dr(r);
        o.length && o.notSplit ? o.forEach((i) => {
          t[i] = ne(r, c);
        }) : o.length === 1 ? t[o[0]] = ne(r, c) : o.length === 2 ? o.forEach((i, l) => {
          t[i] = ne(s[l] ?? s[0], c);
        }) : o.length === 4 ? o.forEach((i, l) => {
          t[i] = ne(
            s[l] ?? s[l - 2] ?? s[0],
            c
          );
        }) : t[n] = r;
      } else
        t[n] = r;
    }), t;
  }
}, Le = /url\([^)]+\)|var\([^)]+\)|(\d*\.?\d+)px/g;
function pr(e, t) {
  const n = Math.pow(10, t + 1), r = Math.floor(e * n);
  return Math.round(r / 10) * 10 / n;
}
const kr = (e = {}) => {
  const { rootValue: t = 16, precision: n = 5, mediaQuery: r = !1 } = e, o = (c, i) => {
    if (!i)
      return c;
    const l = parseFloat(i);
    return l <= 1 ? c : `${pr(l / t, n)}rem`;
  };
  return { visit: (c) => {
    const i = { ...c };
    return Object.entries(c).forEach(([l, u]) => {
      if (typeof u == "string" && u.includes("px")) {
        const a = u.replace(Le, o);
        i[l] = a;
      }
      !kt[l] && typeof u == "number" && u !== 0 && (i[l] = `${u}px`.replace(Le, o));
      const f = l.trim();
      if (f.startsWith("@") && f.includes("px") && r) {
        const a = l.replace(Le, o);
        i[a] = i[l], delete i[l];
      }
    }), i;
  } };
};
export {
  Ar as Keyframes,
  mr as StyleProvider,
  ur as Theme,
  bt as createCache,
  xr as createTheme,
  Er as extractStyle,
  Mn as getComputedToken,
  Tr as legacyLogicalPropertiesTransformer,
  yr as legacyNotSelectorLinter,
  Sr as logicalPropertiesLinter,
  wr as parentSelectorLinter,
  kr as px2remTransformer,
  br as useCacheToken,
  Cr as useStyleRegister
};
