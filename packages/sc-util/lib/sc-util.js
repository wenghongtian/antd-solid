let w = {};
const p = [], x = (e) => {
  p.push(e);
};
function D(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    const n = p.reduce(
      (i, r) => r(i ?? "", "warning"),
      t
    );
    n && console.error(`Warning: ${n}`);
  }
}
function L(e, t) {
  if (process.env.NODE_ENV !== "production" && !e && console !== void 0) {
    const n = p.reduce(
      (i, r) => r(i ?? "", "note"),
      t
    );
    n && console.warn(`Note: ${n}`);
  }
}
function W() {
  w = {};
}
function A(e, t, n) {
  !t && !w[n] && (e(!1, n), w[n] = !0);
}
function d(e, t) {
  A(D, e, t);
}
function j(e, t) {
  A(L, e, t);
}
d.preMessage = x;
d.resetWarned = W;
d.noteOnce = j;
function $(e, t, n = !1) {
  const i = /* @__PURE__ */ new Set();
  function r(c, o, u = 1) {
    const s = i.has(c);
    if (d(!s, "Warning: There may be circular references"), s)
      return !1;
    if (c === o)
      return !0;
    if (n && u > 1)
      return !1;
    i.add(c);
    const h = u + 1;
    if (Array.isArray(c)) {
      if (!Array.isArray(o) || c.length !== o.length)
        return !1;
      for (let f = 0; f < c.length; f++)
        if (!r(c[f], o[f], h))
          return !1;
      return !0;
    }
    if (c && o && typeof c == "object" && typeof o == "object") {
      const f = Object.keys(c);
      return f.length !== Object.keys(o).length ? !1 : f.every((y) => r(c[y], o[y], h));
    }
    return !1;
  }
  return r(e, t);
}
function E() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
function b(e, t) {
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
const m = "data-rc-order", F = "rc-util-key", a = /* @__PURE__ */ new Map();
function C({ mark: e } = {}) {
  return e ? e.startsWith("data-") ? e : `data-${e}` : F;
}
function l(e) {
  return e.attachTo ? e.attachTo : document.querySelector("head") || document.body;
}
function I(e) {
  return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function M(e) {
  return Array.from((a.get(e) || e).children).filter(
    (t) => t.tagName === "STYLE"
  );
}
function v(e, t = {}) {
  if (!E())
    return null;
  const { csp: n, prepend: i } = t, r = document.createElement("style");
  r.setAttribute(m, I(i)), n != null && n.nonce && (r.nonce = n == null ? void 0 : n.nonce), r.innerHTML = e;
  const c = l(t), { firstChild: o } = c;
  if (i) {
    if (i === "queue") {
      const u = M(c).filter(
        (s) => ["prepend", "prependQueue"].includes(s.getAttribute(m))
      );
      if (u.length)
        return c.insertBefore(r, u[u.length - 1].nextSibling), r;
    }
    c.insertBefore(r, o);
  } else
    c.appendChild(r);
  return r;
}
function N(e, t = {}) {
  const n = l(t);
  return M(n).find((i) => i.getAttribute(C(t)) === e);
}
function B(e, t = {}) {
  const n = N(e, t);
  n && l(t).removeChild(n);
}
function _(e, t) {
  const n = a.get(e);
  if (!n || !b(document, n)) {
    const i = v("", t), { parentNode: r } = i;
    a.set(e, r), e.removeChild(i);
  }
}
function K() {
  a.clear();
}
function P(e, t, n = {}) {
  var o, u, s;
  const i = l(n);
  _(i, n);
  const r = N(t, n);
  if (r)
    return (o = n.csp) != null && o.nonce && r.nonce !== ((u = n.csp) == null ? void 0 : u.nonce) && (r.nonce = (s = n.csp) == null ? void 0 : s.nonce), r.innerHTML !== e && (r.innerHTML = e), r;
  const c = v(e, n);
  return c.setAttribute(C(n), t), c;
}
let O = (e) => +setTimeout(e, 16), T = (e) => clearTimeout(e);
typeof window < "u" && "requestAnimationFrame" in window && (O = (e) => window.requestAnimationFrame(e), T = (e) => window.cancelAnimationFrame(e));
let S = 0;
const g = /* @__PURE__ */ new Map();
function q(e) {
  g.delete(e);
}
const H = (e, t = 1) => {
  S += 1;
  const n = S;
  function i(r) {
    if (r === 0)
      q(n), e();
    else {
      const c = O(() => {
        i(r - 1);
      });
      g.set(n, c);
    }
  }
  return i(t), n;
};
H.cancel = (e) => {
  const t = g.get(e);
  return q(t), T(t);
};
const R = (e) => {
  if (E() && window.document.documentElement) {
    const t = Array.isArray(e) ? e : [e], { documentElement: n } = window.document;
    return t.some((i) => i in n.style);
  }
  return !1;
}, U = (e, t) => {
  if (!R(e))
    return !1;
  const n = document.createElement("div"), i = n.style[e];
  return n.style[e] = t, n.style[e] !== i;
};
function Q(e, t) {
  return !Array.isArray(e) && t !== void 0 ? U(e, t) : R(e);
}
export {
  A as call,
  E as canUseDom,
  K as clearContainerCache,
  b as contains,
  v as injectCSS,
  $ as isEqual,
  Q as isStyleSupport,
  L as note,
  j as noteOnce,
  x as preMessage,
  H as raf,
  B as removeCSS,
  W as resetWarned,
  P as updateCSS,
  d as warning,
  d as warningOnce
};
