let h = {};
const g = [],
  m = (e) => {
    g.push(e);
  };
function M(e, t) {
  if (process.env.NODE_ENV !== 'production' && !e && console !== void 0) {
    const n = g.reduce((i, r) => r(i ?? '', 'warning'), t);
    n && console.error(`Warning: ${n}`);
  }
}
function O(e, t) {
  if (process.env.NODE_ENV !== 'production' && !e && console !== void 0) {
    const n = g.reduce((i, r) => r(i ?? '', 'note'), t);
    n && console.warn(`Note: ${n}`);
  }
}
function v() {
  h = {};
}
function N(e, t, n) {
  !t && !h[n] && (e(!1, n), (h[n] = !0));
}
function l(e, t) {
  N(M, e, t);
}
function T(e, t) {
  N(O, e, t);
}
l.preMessage = m;
l.resetWarned = v;
l.noteOnce = T;
function L(e, t, n = !1) {
  const i = /* @__PURE__ */ new Set();
  function r(c, o, u = 1) {
    const s = i.has(c);
    if ((l(!s, 'Warning: There may be circular references'), s)) return !1;
    if (c === o) return !0;
    if (n && u > 1) return !1;
    i.add(c);
    const y = u + 1;
    if (Array.isArray(c)) {
      if (!Array.isArray(o) || c.length !== o.length) return !1;
      for (let f = 0; f < c.length; f++) if (!r(c[f], o[f], y)) return !1;
      return !0;
    }
    if (c && o && typeof c == 'object' && typeof o == 'object') {
      const f = Object.keys(c);
      return f.length !== Object.keys(o).length ? !1 : f.every((p) => r(c[p], o[p], y));
    }
    return !1;
  }
  return r(e, t);
}
function x() {
  return !!(typeof window < 'u' && window.document && window.document.createElement);
}
function W(e, t) {
  if (!e) return !1;
  if (e.contains) return e.contains(t);
  let n = t;
  for (; n; ) {
    if (n === e) return !0;
    n = n.parentNode;
  }
  return !1;
}
const w = 'data-rc-order',
  j = 'rc-util-key',
  a = /* @__PURE__ */ new Map();
function S({ mark: e } = {}) {
  return e ? (e.startsWith('data-') ? e : `data-${e}`) : j;
}
function d(e) {
  return e.attachTo ? e.attachTo : document.querySelector('head') || document.body;
}
function q(e) {
  return e === 'queue' ? 'prependQueue' : e ? 'prepend' : 'append';
}
function C(e) {
  return Array.from((a.get(e) || e).children).filter((t) => t.tagName === 'STYLE');
}
function E(e, t = {}) {
  if (!x()) return null;
  const { csp: n, prepend: i } = t,
    r = document.createElement('style');
  r.setAttribute(w, q(i)),
    n != null && n.nonce && (r.nonce = n == null ? void 0 : n.nonce),
    (r.innerHTML = e);
  const c = d(t),
    { firstChild: o } = c;
  if (i) {
    if (i === 'queue') {
      const u = C(c).filter((s) => ['prepend', 'prependQueue'].includes(s.getAttribute(w)));
      if (u.length) return c.insertBefore(r, u[u.length - 1].nextSibling), r;
    }
    c.insertBefore(r, o);
  } else c.appendChild(r);
  return r;
}
function A(e, t = {}) {
  const n = d(t);
  return C(n).find((i) => i.getAttribute(S(t)) === e);
}
function R(e, t = {}) {
  const n = A(e, t);
  n && d(t).removeChild(n);
}
function D(e, t) {
  const n = a.get(e);
  if (!n || !W(document, n)) {
    const i = E('', t),
      { parentNode: r } = i;
    a.set(e, r), e.removeChild(i);
  }
}
function b() {
  a.clear();
}
function _(e, t, n = {}) {
  var o, u, s;
  const i = d(n);
  D(i, n);
  const r = A(t, n);
  if (r)
    return (
      (o = n.csp) != null &&
        o.nonce &&
        r.nonce !== ((u = n.csp) == null ? void 0 : u.nonce) &&
        (r.nonce = (s = n.csp) == null ? void 0 : s.nonce),
      r.innerHTML !== e && (r.innerHTML = e),
      r
    );
  const c = E(e, n);
  return c.setAttribute(S(n), t), c;
}
export {
  x as canUseDom,
  b as clearContainerCache,
  W as contains,
  E as injectCSS,
  L as isEqual,
  R as removeCSS,
  _ as updateCSS,
  l as warning,
};
