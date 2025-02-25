/*!
 * vue-router v3.0.2
 * (c) 2018 Evan You
 * @license MIT
 */
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.VueRouter = e()
}(this, function() {
    "use strict";

    function l(t) {
        return -1 < Object.prototype.toString.call(t).indexOf("Error")
    }

    function k(t, e) {
        for (var r in e) t[r] = e[r];
        return t
    }
    var i = {
        name: "RouterView",
        functional: !0,
        props: {
            name: {
                type: String,
                default: "default"
            }
        },
        render: function(t, e) {
            var r = e.props,
                n = e.children,
                o = e.parent,
                i = e.data;
            i.routerView = !0;
            for (var a = o.$createElement, u = r.name, c = o.$route, s = o._routerViewCache || (o._routerViewCache = {}), p = 0, f = !1; o && o._routerRoot !== o;) o.$vnode && o.$vnode.data.routerView && p++, o._inactive && (f = !0), o = o.$parent;
            if (i.routerViewDepth = p, f) return a(s[u], i, n);
            var h = c.matched[p];
            if (!h) return s[u] = null, a();
            var l = s[u] = h.components[u];
            i.registerRouteInstance = function(t, e) {
                var r = h.instances[u];
                (e && r !== t || !e && r === t) && (h.instances[u] = e)
            }, (i.hook || (i.hook = {})).prepatch = function(t, e) {
                h.instances[u] = e.componentInstance
            };
            var d = i.props = function(t, e) {
                switch (typeof e) {
                    case "undefined":
                        return;
                    case "object":
                        return e;
                    case "function":
                        return e(t);
                    case "boolean":
                        return e ? t.params : void 0
                }
            }(c, h.props && h.props[u]);
            if (d) {
                d = i.props = k({}, d);
                var y = i.attrs = i.attrs || {};
                for (var v in d) l.props && v in l.props || (y[v] = d[v], delete d[v])
            }
            return a(l, i, n)
        }
    };
    var e = /[!'()*]/g,
        r = function(t) {
            return "%" + t.charCodeAt(0).toString(16)
        },
        n = /%2C/g,
        o = function(t) {
            return encodeURIComponent(t).replace(e, r).replace(n, ",")
        },
        a = decodeURIComponent;

    function h(t) {
        var o = {};
        return (t = t.trim().replace(/^(\?|#|&)/, "")) && t.split("&").forEach(function(t) {
            var e = t.replace(/\+/g, " ").split("="),
                r = a(e.shift()),
                n = 0 < e.length ? a(e.join("=")) : null;
            void 0 === o[r] ? o[r] = n : Array.isArray(o[r]) ? o[r].push(n) : o[r] = [o[r], n]
        }), o
    }

    function u(n) {
        var t = n ? Object.keys(n).map(function(e) {
            var t = n[e];
            if (void 0 === t) return "";
            if (null === t) return o(e);
            if (Array.isArray(t)) {
                var r = [];
                return t.forEach(function(t) {
                    void 0 !== t && (null === t ? r.push(o(e)) : r.push(o(e) + "=" + o(t)))
                }), r.join("&")
            }
            return o(e) + "=" + o(t)
        }).filter(function(t) {
            return 0 < t.length
        }).join("&") : null;
        return t ? "?" + t : ""
    }
    var R = /\/?$/;

    function E(t, e, r, n) {
        var o = n && n.options.stringifyQuery,
            i = e.query || {};
        try {
            i = c(i)
        } catch (t) {}
        var a = {
            name: e.name || t && t.name,
            meta: t && t.meta || {},
            path: e.path || "/",
            hash: e.hash || "",
            query: i,
            params: e.params || {},
            fullPath: p(e, o),
            matched: t ? function(t) {
                var e = [];
                for (; t;) e.unshift(t), t = t.parent;
                return e
            }(t) : []
        };
        return r && (a.redirectedFrom = p(r, o)), Object.freeze(a)
    }

    function c(t) {
        if (Array.isArray(t)) return t.map(c);
        if (t && "object" == typeof t) {
            var e = {};
            for (var r in t) e[r] = c(t[r]);
            return e
        }
        return t
    }
    var s = E(null, {
        path: "/"
    });

    function p(t, e) {
        var r = t.path,
            n = t.query;
        void 0 === n && (n = {});
        var o = t.hash;
        return void 0 === o && (o = ""), (r || "/") + (e || u)(n) + o
    }

    function O(t, e) {
        return e === s ? t === e : !!e && (t.path && e.path ? t.path.replace(R, "") === e.path.replace(R, "") && t.hash === e.hash && f(t.query, e.query) : !(!t.name || !e.name) && (t.name === e.name && t.hash === e.hash && f(t.query, e.query) && f(t.params, e.params)))
    }

    function f(n, o) {
        if (void 0 === n && (n = {}), void 0 === o && (o = {}), !n || !o) return n === o;
        var t = Object.keys(n),
            e = Object.keys(o);
        return t.length === e.length && t.every(function(t) {
            var e = n[t],
                r = o[t];
            return "object" == typeof e && "object" == typeof r ? f(e, r) : String(e) === String(r)
        })
    }
    var d, t = [String, Object],
        y = [String, Array],
        v = {
            name: "RouterLink",
            props: {
                to: {
                    type: t,
                    required: !0
                },
                tag: {
                    type: String,
                    default: "a"
                },
                exact: Boolean,
                append: Boolean,
                replace: Boolean,
                activeClass: String,
                exactActiveClass: String,
                event: {
                    type: y,
                    default: "click"
                }
            },
            render: function(t) {
                var e, r, n = this,
                    o = this.$router,
                    i = this.$route,
                    a = o.resolve(this.to, i, this.append),
                    u = a.location,
                    c = a.route,
                    s = a.href,
                    p = {},
                    f = o.options.linkActiveClass,
                    h = o.options.linkExactActiveClass,
                    l = null == f ? "router-link-active" : f,
                    d = null == h ? "router-link-exact-active" : h,
                    y = null == this.activeClass ? l : this.activeClass,
                    v = null == this.exactActiveClass ? d : this.exactActiveClass,
                    m = u.path ? E(null, u, null, o) : c;
                p[v] = O(i, m), p[y] = this.exact ? p[v] : (r = m, 0 === (e = i).path.replace(R, "/").indexOf(r.path.replace(R, "/")) && (!r.hash || e.hash === r.hash) && function(t, e) {
                    for (var r in e)
                        if (!(r in t)) return !1;
                    return !0
                }(e.query, r.query));
                var g = function(t) {
                        C(t) && (n.replace ? o.replace(u) : o.push(u))
                    },
                    b = {
                        click: C
                    };
                Array.isArray(this.event) ? this.event.forEach(function(t) {
                    b[t] = g
                }) : b[this.event] = g;
                var w = {
                    class: p
                };
                if ("a" === this.tag) w.on = b, w.attrs = {
                    href: s
                };
                else {
                    var x = function t(e) {
                        if (e)
                            for (var r, n = 0; n < e.length; n++) {
                                if ("a" === (r = e[n]).tag) return r;
                                if (r.children && (r = t(r.children))) return r
                            }
                    }(this.$slots.default);
                    if (x) x.isStatic = !1, (x.data = k({}, x.data)).on = b, (x.data.attrs = k({}, x.data.attrs)).href = s;
                    else w.on = b
                }
                return t(this.tag, w, this.$slots.default)
            }
        };

    function C(t) {
        if (!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey || t.defaultPrevented || void 0 !== t.button && 0 !== t.button)) {
            if (t.currentTarget && t.currentTarget.getAttribute) {
                var e = t.currentTarget.getAttribute("target");
                if (/\b_blank\b/i.test(e)) return
            }
            return t.preventDefault && t.preventDefault(), !0
        }
    }
    var m = "undefined" != typeof window;

    function g(t, e, r) {
        var n = t.charAt(0);
        if ("/" === n) return t;
        if ("?" === n || "#" === n) return e + t;
        var o = e.split("/");
        r && o[o.length - 1] || o.pop();
        for (var i = t.replace(/^\//, "").split("/"), a = 0; a < i.length; a++) {
            var u = i[a];
            ".." === u ? o.pop() : "." !== u && o.push(u)
        }
        return "" !== o[0] && o.unshift(""), o.join("/")
    }

    function b(t) {
        return t.replace(/\/\//g, "/")
    }
    var w = Array.isArray || function(t) {
            return "[object Array]" == Object.prototype.toString.call(t)
        },
        x = V,
        j = $,
        A = function(t, e) {
            return q($(t, e))
        },
        _ = q,
        T = M,
        S = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"), "g");

    function $(t, e) {
        for (var r, n, o = [], i = 0, a = 0, u = "", c = e && e.delimiter || "/"; null != (r = S.exec(t));) {
            var s = r[0],
                p = r[1],
                f = r.index;
            if (u += t.slice(a, f), a = f + s.length, p) u += p[1];
            else {
                var h = t[a],
                    l = r[2],
                    d = r[3],
                    y = r[4],
                    v = r[5],
                    m = r[6],
                    g = r[7];
                u && (o.push(u), u = "");
                var b = null != l && null != h && h !== l,
                    w = "+" === m || "*" === m,
                    x = "?" === m || "*" === m,
                    k = r[2] || c,
                    R = y || v;
                o.push({
                    name: d || i++,
                    prefix: l || "",
                    delimiter: k,
                    optional: x,
                    repeat: w,
                    partial: b,
                    asterisk: !!g,
                    pattern: R ? (n = R, n.replace(/([=!:$\/()])/g, "\\$1")) : g ? ".*" : "[^" + P(k) + "]+?"
                })
            }
        }
        return a < t.length && (u += t.substr(a)), u && o.push(u), o
    }

    function L(t) {
        return encodeURI(t).replace(/[\/?#]/g, function(t) {
            return "%" + t.charCodeAt(0).toString(16).toUpperCase()
        })
    }

    function q(p) {
        for (var f = new Array(p.length), t = 0; t < p.length; t++) "object" == typeof p[t] && (f[t] = new RegExp("^(?:" + p[t].pattern + ")$"));
        return function(t, e) {
            for (var r = "", n = t || {}, o = (e || {}).pretty ? L : encodeURIComponent, i = 0; i < p.length; i++) {
                var a = p[i];
                if ("string" != typeof a) {
                    var u, c = n[a.name];
                    if (null == c) {
                        if (a.optional) {
                            a.partial && (r += a.prefix);
                            continue
                        }
                        throw new TypeError('Expected "' + a.name + '" to be defined')
                    }
                    if (w(c)) {
                        if (!a.repeat) throw new TypeError('Expected "' + a.name + '" to not repeat, but received `' + JSON.stringify(c) + "`");
                        if (0 === c.length) {
                            if (a.optional) continue;
                            throw new TypeError('Expected "' + a.name + '" to not be empty')
                        }
                        for (var s = 0; s < c.length; s++) {
                            if (u = o(c[s]), !f[i].test(u)) throw new TypeError('Expected all "' + a.name + '" to match "' + a.pattern + '", but received `' + JSON.stringify(u) + "`");
                            r += (0 === s ? a.prefix : a.delimiter) + u
                        }
                    } else {
                        if (u = a.asterisk ? encodeURI(c).replace(/[?#]/g, function(t) {
                                return "%" + t.charCodeAt(0).toString(16).toUpperCase()
                            }) : o(c), !f[i].test(u)) throw new TypeError('Expected "' + a.name + '" to match "' + a.pattern + '", but received "' + u + '"');
                        r += a.prefix + u
                    }
                } else r += a
            }
            return r
        }
    }

    function P(t) {
        return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1")
    }

    function U(t, e) {
        return t.keys = e, t
    }

    function I(t) {
        return t.sensitive ? "" : "i"
    }

    function M(t, e, r) {
        w(e) || (r = e || r, e = []);
        for (var n = (r = r || {}).strict, o = !1 !== r.end, i = "", a = 0; a < t.length; a++) {
            var u = t[a];
            if ("string" == typeof u) i += P(u);
            else {
                var c = P(u.prefix),
                    s = "(?:" + u.pattern + ")";
                e.push(u), u.repeat && (s += "(?:" + c + s + ")*"), i += s = u.optional ? u.partial ? c + "(" + s + ")?" : "(?:" + c + "(" + s + "))?" : c + "(" + s + ")"
            }
        }
        var p = P(r.delimiter || "/"),
            f = i.slice(-p.length) === p;
        return n || (i = (f ? i.slice(0, -p.length) : i) + "(?:" + p + "(?=$))?"), i += o ? "$" : n && f ? "" : "(?=" + p + "|$)", U(new RegExp("^" + i, I(r)), e)
    }

    function V(t, e, r) {
        return w(e) || (r = e || r, e = []), r = r || {}, t instanceof RegExp ? function(t, e) {
            var r = t.source.match(/\((?!\?)/g);
            if (r)
                for (var n = 0; n < r.length; n++) e.push({
                    name: n,
                    prefix: null,
                    delimiter: null,
                    optional: !1,
                    repeat: !1,
                    partial: !1,
                    asterisk: !1,
                    pattern: null
                });
            return U(t, e)
        }(t, e) : w(t) ? function(t, e, r) {
            for (var n = [], o = 0; o < t.length; o++) n.push(V(t[o], e, r).source);
            return U(new RegExp("(?:" + n.join("|") + ")", I(r)), e)
        }(t, e, r) : (n = e, M($(t, o = r), n, o));
        var n, o
    }
    x.parse = j, x.compile = A, x.tokensToFunction = _, x.tokensToRegExp = T;
    var B = Object.create(null);

    function H(t, e, r) {
        try {
            return (B[t] || (B[t] = x.compile(t)))(e || {}, {
                pretty: !0
            })
        } catch (t) {
            return ""
        }
    }

    function z(t, e, r, n) {
        var o = e || [],
            i = r || Object.create(null),
            a = n || Object.create(null);
        t.forEach(function(t) {
            ! function r(n, o, i, a, u, c) {
                var t = a.path;
                var e = a.name;
                var s = a.pathToRegexpOptions || {};
                var p = function(t, e, r) {
                    r || (t = t.replace(/\/$/, ""));
                    if ("/" === t[0]) return t;
                    if (null == e) return t;
                    return b(e.path + "/" + t)
                }(t, u, s.strict);
                "boolean" == typeof a.caseSensitive && (s.sensitive = a.caseSensitive);
                var f = {
                    path: p,
                    regex: (h = p, l = s, x(h, [], l)),
                    components: a.components || {
                        default: a.component
                    },
                    instances: {},
                    name: e,
                    parent: u,
                    matchAs: c,
                    redirect: a.redirect,
                    beforeEnter: a.beforeEnter,
                    meta: a.meta || {},
                    props: null == a.props ? {} : a.components ? a.props : {
                        default: a.props
                    }
                };
                var h, l;
                a.children && a.children.forEach(function(t) {
                    var e = c ? b(c + "/" + t.path) : void 0;
                    r(n, o, i, t, f, e)
                });
                if (void 0 !== a.alias) {
                    var d = Array.isArray(a.alias) ? a.alias : [a.alias];
                    d.forEach(function(t) {
                        var e = {
                            path: t,
                            children: a.children
                        };
                        r(n, o, i, e, u, f.path || "/")
                    })
                }
                o[f.path] || (n.push(f.path), o[f.path] = f);
                e && (i[e] || (i[e] = f))
            }(o, i, a, t)
        });
        for (var u = 0, c = o.length; u < c; u++) "*" === o[u] && (o.push(o.splice(u, 1)[0]), c--, u--);
        return {
            pathList: o,
            pathMap: i,
            nameMap: a
        }
    }

    function D(t, e, r, n) {
        var o = "string" == typeof t ? {
            path: t
        } : t;
        if (o.name || o._normalized) return o;
        if (!o.path && o.params && e) {
            (o = k({}, o))._normalized = !0;
            var i = k(k({}, e.params), o.params);
            if (e.name) o.name = e.name, o.params = i;
            else if (e.matched.length) {
                var a = e.matched[e.matched.length - 1].path;
                o.path = H(a, i, e.path)
            }
            return o
        }
        var u = function(t) {
                var e = "",
                    r = "",
                    n = t.indexOf("#");
                0 <= n && (e = t.slice(n), t = t.slice(0, n));
                var o = t.indexOf("?");
                return 0 <= o && (r = t.slice(o + 1), t = t.slice(0, o)), {
                    path: t,
                    query: r,
                    hash: e
                }
            }(o.path || ""),
            c = e && e.path || "/",
            s = u.path ? g(u.path, c, r || o.append) : c,
            p = function(t, e, r) {
                void 0 === e && (e = {});
                var n, o = r || h;
                try {
                    n = o(t || "")
                } catch (t) {
                    n = {}
                }
                for (var i in e) n[i] = e[i];
                return n
            }(u.query, o.query, n && n.options.parseQuery),
            f = o.hash || u.hash;
        return f && "#" !== f.charAt(0) && (f = "#" + f), {
            _normalized: !0,
            path: s,
            query: p,
            hash: f
        }
    }

    function F(t, h) {
        var e = z(t),
            f = e.pathList,
            l = e.pathMap,
            d = e.nameMap;

        function y(t, e, r) {
            var n = D(t, e, !1, h),
                o = n.name;
            if (o) {
                var i = d[o];
                if (!i) return v(null, n);
                var a = i.regex.keys.filter(function(t) {
                    return !t.optional
                }).map(function(t) {
                    return t.name
                });
                if ("object" != typeof n.params && (n.params = {}), e && "object" == typeof e.params)
                    for (var u in e.params) !(u in n.params) && -1 < a.indexOf(u) && (n.params[u] = e.params[u]);
                if (i) return n.path = H(i.path, n.params), v(i, n, r)
            } else if (n.path) {
                n.params = {};
                for (var c = 0; c < f.length; c++) {
                    var s = f[c],
                        p = l[s];
                    if (K(p.regex, n.path, n.params)) return v(p, n, r)
                }
            }
            return v(null, n)
        }

        function n(t, e) {
            var r = t.redirect,
                n = "function" == typeof r ? r(E(t, e, null, h)) : r;
            if ("string" == typeof n && (n = {
                    path: n
                }), !n || "object" != typeof n) return v(null, e);
            var o, i = n,
                a = i.name,
                u = i.path,
                c = e.query,
                s = e.hash,
                p = e.params;
            if (c = i.hasOwnProperty("query") ? i.query : c, s = i.hasOwnProperty("hash") ? i.hash : s, p = i.hasOwnProperty("params") ? i.params : p, a) {
                d[a];
                return y({
                    _normalized: !0,
                    name: a,
                    query: c,
                    hash: s,
                    params: p
                }, void 0, e)
            }
            if (u) {
                var f = g(u, (o = t).parent ? o.parent.path : "/", !0);
                return y({
                    _normalized: !0,
                    path: H(f, p),
                    query: c,
                    hash: s
                }, void 0, e)
            }
            return v(null, e)
        }

        function v(t, e, r) {
            return t && t.redirect ? n(t, r || e) : t && t.matchAs ? function(t, e, r) {
                var n = y({
                    _normalized: !0,
                    path: H(r, e.params)
                });
                if (n) {
                    var o = n.matched,
                        i = o[o.length - 1];
                    return e.params = n.params, v(i, e)
                }
                return v(null, e)
            }(0, e, t.matchAs) : E(t, e, r, h)
        }
        return {
            match: y,
            addRoutes: function(t) {
                z(t, f, l, d)
            }
        }
    }

    function K(t, e, r) {
        var n = e.match(t);
        if (!n) return !1;
        if (!r) return !0;
        for (var o = 1, i = n.length; o < i; ++o) {
            var a = t.keys[o - 1],
                u = "string" == typeof n[o] ? decodeURIComponent(n[o]) : n[o];
            a && (r[a.name || "pathMatch"] = u)
        }
        return !0
    }
    var J = Object.create(null);

    function N() {
        window.history.replaceState({
            key: it()
        }, "", window.location.href.replace(window.location.origin, "")), window.addEventListener("popstate", function(t) {
            var e;
            X(), t.state && t.state.key && (e = t.state.key, nt = e)
        })
    }

    function Q(r, n, o, i) {
        if (r.app) {
            var a = r.options.scrollBehavior;
            a && r.app.$nextTick(function() {
                var e = function() {
                        var t = it();
                        if (t) return J[t]
                    }(),
                    t = a.call(r, n, o, i ? e : null);
                t && ("function" == typeof t.then ? t.then(function(t) {
                    Z(t, e)
                }).catch(function(t) {}) : Z(t, e))
            })
        }
    }

    function X() {
        var t = it();
        t && (J[t] = {
            x: window.pageXOffset,
            y: window.pageYOffset
        })
    }

    function Y(t) {
        return G(t.x) || G(t.y)
    }

    function W(t) {
        return {
            x: G(t.x) ? t.x : window.pageXOffset,
            y: G(t.y) ? t.y : window.pageYOffset
        }
    }

    function G(t) {
        return "number" == typeof t
    }

    function Z(t, e) {
        var r, n, o, i, a, u = "object" == typeof t;
        if (u && "string" == typeof t.selector) {
            var c = document.querySelector(t.selector);
            if (c) {
                var s = t.offset && "object" == typeof t.offset ? t.offset : {};
                s = {
                    x: G((a = s).x) ? a.x : 0,
                    y: G(a.y) ? a.y : 0
                }, r = c, n = s, o = document.documentElement.getBoundingClientRect(), e = {
                    x: (i = r.getBoundingClientRect()).left - o.left - n.x,
                    y: i.top - o.top - n.y
                }
            } else Y(t) && (e = W(t))
        } else u && Y(t) && (e = W(t));
        e && window.scrollTo(e.x, e.y)
    }
    var tt, et = m && ((-1 === (tt = window.navigator.userAgent).indexOf("Android 2.") && -1 === tt.indexOf("Android 4.0") || -1 === tt.indexOf("Mobile Safari") || -1 !== tt.indexOf("Chrome") || -1 !== tt.indexOf("Windows Phone")) && window.history && "pushState" in window.history),
        rt = m && window.performance && window.performance.now ? window.performance : Date,
        nt = ot();

    function ot() {
        return rt.now().toFixed(3)
    }

    function it() {
        return nt
    }

    function at(e, r) {
        X();
        var t = window.history;
        try {
            r ? t.replaceState({
                key: nt
            }, "", e) : (nt = ot(), t.pushState({
                key: nt
            }, "", e))
        } catch (t) {
            window.location[r ? "replace" : "assign"](e)
        }
    }

    function ut(t) {
        at(t, !0)
    }

    function ct(e, r, n) {
        var o = function(t) {
            t >= e.length ? n() : e[t] ? r(e[t], function() {
                o(t + 1)
            }) : o(t + 1)
        };
        o(0)
    }

    function st(r) {
        return function(t, e, c) {
            var s = !1,
                p = 0,
                f = null;
            pt(r, function(r, t, n, o) {
                if ("function" == typeof r && void 0 === r.cid) {
                    s = !0, p++;
                    var e, i = lt(function(t) {
                            var e;
                            ((e = t).__esModule || ht && "Module" === e[Symbol.toStringTag]) && (t = t.default), r.resolved = "function" == typeof t ? t : d.extend(t), n.components[o] = t, --p <= 0 && c()
                        }),
                        a = lt(function(t) {
                            var e = "Failed to resolve async component " + o + ": " + t;
                            f || (f = l(t) ? t : new Error(e), c(f))
                        });
                    try {
                        e = r(i, a)
                    } catch (t) {
                        a(t)
                    }
                    if (e)
                        if ("function" == typeof e.then) e.then(i, a);
                        else {
                            var u = e.component;
                            u && "function" == typeof u.then && u.then(i, a)
                        }
                }
            }), s || c()
        }
    }

    function pt(t, r) {
        return ft(t.map(function(e) {
            return Object.keys(e.components).map(function(t) {
                return r(e.components[t], e.instances[t], e, t)
            })
        }))
    }

    function ft(t) {
        return Array.prototype.concat.apply([], t)
    }
    var ht = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag;

    function lt(r) {
        var n = !1;
        return function() {
            for (var t = [], e = arguments.length; e--;) t[e] = arguments[e];
            if (!n) return n = !0, r.apply(this, t)
        }
    }
    var dt = function(t, e) {
        this.router = t, this.base = function(t) {
            if (!t)
                if (m) {
                    var e = document.querySelector("base");
                    t = (t = e && e.getAttribute("href") || "/").replace(/^https?:\/\/[^\/]+/, "")
                } else t = "/";
            "/" !== t.charAt(0) && (t = "/" + t);
            return t.replace(/\/$/, "")
        }(e), this.current = s, this.pending = null, this.ready = !1, this.readyCbs = [], this.readyErrorCbs = [], this.errorCbs = []
    };

    function yt(t, i, a, e) {
        var r = pt(t, function(t, e, r, n) {
            var o = function(t, e) {
                "function" != typeof t && (t = d.extend(t));
                return t.options[e]
            }(t, i);
            if (o) return Array.isArray(o) ? o.map(function(t) {
                return a(t, e, r, n)
            }) : a(o, e, r, n)
        });
        return ft(e ? r.reverse() : r)
    }

    function vt(t, e) {
        if (e) return function() {
            return t.apply(e, arguments)
        }
    }
    dt.prototype.listen = function(t) {
        this.cb = t
    }, dt.prototype.onReady = function(t, e) {
        this.ready ? t() : (this.readyCbs.push(t), e && this.readyErrorCbs.push(e))
    }, dt.prototype.onError = function(t) {
        this.errorCbs.push(t)
    }, dt.prototype.transitionTo = function(t, e, r) {
        var n = this,
            o = this.router.match(t, this.current);
        this.confirmTransition(o, function() {
            n.updateRoute(o), e && e(o), n.ensureURL(), n.ready || (n.ready = !0, n.readyCbs.forEach(function(t) {
                t(o)
            }))
        }, function(e) {
            r && r(e), e && !n.ready && (n.ready = !0, n.readyErrorCbs.forEach(function(t) {
                t(e)
            }))
        })
    }, dt.prototype.confirmTransition = function(r, e, t) {
        var n = this,
            o = this.current,
            i = function(e) {
                l(e) && (n.errorCbs.length ? n.errorCbs.forEach(function(t) {
                    t(e)
                }) : console.error(e)), t && t(e)
            };
        if (O(r, o) && r.matched.length === o.matched.length) return this.ensureURL(), i();
        var a = function(t, e) {
                var r, n = Math.max(t.length, e.length);
                for (r = 0; r < n && t[r] === e[r]; r++);
                return {
                    updated: e.slice(0, r),
                    activated: e.slice(r),
                    deactivated: t.slice(r)
                }
            }(this.current.matched, r.matched),
            u = a.updated,
            c = a.deactivated,
            f = a.activated,
            s = [].concat(yt(c, "beforeRouteLeave", vt, !0), this.router.beforeHooks, yt(u, "beforeRouteUpdate", vt), f.map(function(t) {
                return t.beforeEnter
            }), st(f));
        this.pending = r;
        var h = function(t, e) {
            if (n.pending !== r) return i();
            try {
                t(r, o, function(t) {
                    !1 === t || l(t) ? (n.ensureURL(!0), i(t)) : "string" == typeof t || "object" == typeof t && ("string" == typeof t.path || "string" == typeof t.name) ? (i(), "object" == typeof t && t.replace ? n.replace(t) : n.push(t)) : e(t)
                })
            } catch (t) {
                i(t)
            }
        };
        ct(s, h, function() {
            var s, p, t = [];
            ct((s = t, p = function() {
                return n.current === r
            }, yt(f, "beforeRouteEnter", function(t, e, r, n) {
                return o = t, i = r, a = n, u = s, c = p,
                    function(t, e, r) {
                        return o(t, e, function(t) {
                            r(t), "function" == typeof t && u.push(function() {
                                ! function t(e, r, n, o) {
                                    r[n] && !r[n]._isBeingDestroyed ? e(r[n]) : o() && setTimeout(function() {
                                        t(e, r, n, o)
                                    }, 16)
                                }(t, i.instances, a, c)
                            })
                        })
                    };
                var o, i, a, u, c
            })).concat(n.router.resolveHooks), h, function() {
                if (n.pending !== r) return i();
                n.pending = null, e(r), n.router.app && n.router.app.$nextTick(function() {
                    t.forEach(function(t) {
                        t()
                    })
                })
            })
        })
    }, dt.prototype.updateRoute = function(e) {
        var r = this.current;
        this.current = e, this.cb && this.cb(e), this.router.afterHooks.forEach(function(t) {
            t && t(e, r)
        })
    };
    var mt = function(r) {
        function t(n, t) {
            var o = this;
            r.call(this, n, t);
            var e = n.options.scrollBehavior,
                i = et && e;
            i && N();
            var a = gt(this.base);
            window.addEventListener("popstate", function(t) {
                var e = o.current,
                    r = gt(o.base);
                o.current === s && r === a || o.transitionTo(r, function(t) {
                    i && Q(n, t, e, !0)
                })
            })
        }
        return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype.go = function(t) {
            window.history.go(t)
        }, t.prototype.push = function(t, e, r) {
            var n = this,
                o = this.current;
            this.transitionTo(t, function(t) {
                at(b(n.base + t.fullPath)), Q(n.router, t, o, !1), e && e(t)
            }, r)
        }, t.prototype.replace = function(t, e, r) {
            var n = this,
                o = this.current;
            this.transitionTo(t, function(t) {
                ut(b(n.base + t.fullPath)), Q(n.router, t, o, !1), e && e(t)
            }, r)
        }, t.prototype.ensureURL = function(t) {
            if (gt(this.base) !== this.current.fullPath) {
                var e = b(this.base + this.current.fullPath);
                t ? at(e) : ut(e)
            }
        }, t.prototype.getCurrentLocation = function() {
            return gt(this.base)
        }, t
    }(dt);

    function gt(t) {
        var e = decodeURI(window.location.pathname);
        return t && 0 === e.indexOf(t) && (e = e.slice(t.length)), (e || "/") + window.location.search + window.location.hash
    }
    var bt = function(n) {
        function t(t, e, r) {
            n.call(this, t, e), r && function(t) {
                var e = gt(t);
                if (!/^\/#/.test(e)) return window.location.replace(b(t + "/#" + e)), !0
            }(this.base) || wt()
        }
        return n && (t.__proto__ = n), ((t.prototype = Object.create(n && n.prototype)).constructor = t).prototype.setupListeners = function() {
            var r = this,
                t = this.router.options.scrollBehavior,
                n = et && t;
            n && N(), window.addEventListener(et ? "popstate" : "hashchange", function() {
                var e = r.current;
                wt() && r.transitionTo(xt(), function(t) {
                    n && Q(r.router, t, e, !0), et || Et(t.fullPath)
                })
            })
        }, t.prototype.push = function(t, e, r) {
            var n = this,
                o = this.current;
            this.transitionTo(t, function(t) {
                Rt(t.fullPath), Q(n.router, t, o, !1), e && e(t)
            }, r)
        }, t.prototype.replace = function(t, e, r) {
            var n = this,
                o = this.current;
            this.transitionTo(t, function(t) {
                Et(t.fullPath), Q(n.router, t, o, !1), e && e(t)
            }, r)
        }, t.prototype.go = function(t) {
            window.history.go(t)
        }, t.prototype.ensureURL = function(t) {
            var e = this.current.fullPath;
            xt() !== e && (t ? Rt(e) : Et(e))
        }, t.prototype.getCurrentLocation = function() {
            return xt()
        }, t
    }(dt);

    function wt() {
        var t = xt();
        return "/" === t.charAt(0) || (Et("/" + t), !1)
    }

    function xt() {
        var t = window.location.href,
            e = t.indexOf("#");
        return -1 === e ? "" : decodeURI(t.slice(e + 1))
    }

    function kt(t) {
        var e = window.location.href,
            r = e.indexOf("#");
        return (0 <= r ? e.slice(0, r) : e) + "#" + t
    }

    function Rt(t) {
        et ? at(kt(t)) : window.location.hash = t
    }

    function Et(t) {
        et ? ut(kt(t)) : window.location.replace(kt(t))
    }
    var Ot = function(r) {
            function t(t, e) {
                r.call(this, t, e), this.stack = [], this.index = -1
            }
            return r && (t.__proto__ = r), ((t.prototype = Object.create(r && r.prototype)).constructor = t).prototype.push = function(t, e, r) {
                var n = this;
                this.transitionTo(t, function(t) {
                    n.stack = n.stack.slice(0, n.index + 1).concat(t), n.index++, e && e(t)
                }, r)
            }, t.prototype.replace = function(t, e, r) {
                var n = this;
                this.transitionTo(t, function(t) {
                    n.stack = n.stack.slice(0, n.index).concat(t), e && e(t)
                }, r)
            }, t.prototype.go = function(t) {
                var e = this,
                    r = this.index + t;
                if (!(r < 0 || r >= this.stack.length)) {
                    var n = this.stack[r];
                    this.confirmTransition(n, function() {
                        e.index = r, e.updateRoute(n)
                    })
                }
            }, t.prototype.getCurrentLocation = function() {
                var t = this.stack[this.stack.length - 1];
                return t ? t.fullPath : "/"
            }, t.prototype.ensureURL = function() {}, t
        }(dt),
        Ct = function(t) {
            void 0 === t && (t = {}), this.app = null, this.apps = [], this.options = t, this.beforeHooks = [], this.resolveHooks = [], this.afterHooks = [], this.matcher = F(t.routes || [], this);
            var e = t.mode || "hash";
            switch (this.fallback = "history" === e && !et && !1 !== t.fallback, this.fallback && (e = "hash"), m || (e = "abstract"), this.mode = e) {
                case "history":
                    this.history = new mt(this, t.base);
                    break;
                case "hash":
                    this.history = new bt(this, t.base, this.fallback);
                    break;
                case "abstract":
                    this.history = new Ot(this, t.base)
            }
        },
        jt = {
            currentRoute: {
                configurable: !0
            }
        };

    function At(e, r) {
        return e.push(r),
            function() {
                var t = e.indexOf(r); - 1 < t && e.splice(t, 1)
            }
    }
    return Ct.prototype.match = function(t, e, r) {
        return this.matcher.match(t, e, r)
    }, jt.currentRoute.get = function() {
        return this.history && this.history.current
    }, Ct.prototype.init = function(t) {
        var r = this;
        if (this.apps.push(t), !this.app) {
            this.app = t;
            var e = this.history;
            if (e instanceof mt) e.transitionTo(e.getCurrentLocation());
            else if (e instanceof bt) {
                var n = function() {
                    e.setupListeners()
                };
                e.transitionTo(e.getCurrentLocation(), n, n)
            }
            e.listen(function(e) {
                r.apps.forEach(function(t) {
                    t._route = e
                })
            })
        }
    }, Ct.prototype.beforeEach = function(t) {
        return At(this.beforeHooks, t)
    }, Ct.prototype.beforeResolve = function(t) {
        return At(this.resolveHooks, t)
    }, Ct.prototype.afterEach = function(t) {
        return At(this.afterHooks, t)
    }, Ct.prototype.onReady = function(t, e) {
        this.history.onReady(t, e)
    }, Ct.prototype.onError = function(t) {
        this.history.onError(t)
    }, Ct.prototype.push = function(t, e, r) {
        this.history.push(t, e, r)
    }, Ct.prototype.replace = function(t, e, r) {
        this.history.replace(t, e, r)
    }, Ct.prototype.go = function(t) {
        this.history.go(t)
    }, Ct.prototype.back = function() {
        this.go(-1)
    }, Ct.prototype.forward = function() {
        this.go(1)
    }, Ct.prototype.getMatchedComponents = function(t) {
        var e = t ? t.matched ? t : this.resolve(t).route : this.currentRoute;
        return e ? [].concat.apply([], e.matched.map(function(e) {
            return Object.keys(e.components).map(function(t) {
                return e.components[t]
            })
        })) : []
    }, Ct.prototype.resolve = function(t, e, r) {
        var n, o, i, a, u = D(t, e || this.history.current, r, this),
            c = this.match(u, e),
            s = c.redirectedFrom || c.fullPath,
            p = this.history.base;
        return {
            location: u,
            route: c,
            href: (n = p, o = s, i = this.mode, a = "hash" === i ? "#" + o : o, n ? b(n + "/" + a) : a),
            normalizedTo: u,
            resolved: c
        }
    }, Ct.prototype.addRoutes = function(t) {
        this.matcher.addRoutes(t), this.history.current !== s && this.history.transitionTo(this.history.getCurrentLocation())
    }, Object.defineProperties(Ct.prototype, jt), Ct.install = function t(e) {
        if (!t.installed || d !== e) {
            t.installed = !0;
            var n = function(t) {
                    return void 0 !== t
                },
                r = function(t, e) {
                    var r = t.$options._parentVnode;
                    n(r) && n(r = r.data) && n(r = r.registerRouteInstance) && r(t, e)
                };
            (d = e).mixin({
                beforeCreate: function() {
                    n(this.$options.router) ? ((this._routerRoot = this)._router = this.$options.router, this._router.init(this), e.util.defineReactive(this, "_route", this._router.history.current)) : this._routerRoot = this.$parent && this.$parent._routerRoot || this, r(this, this)
                },
                destroyed: function() {
                    r(this)
                }
            }), Object.defineProperty(e.prototype, "$router", {
                get: function() {
                    return this._routerRoot._router
                }
            }), Object.defineProperty(e.prototype, "$route", {
                get: function() {
                    return this._routerRoot._route
                }
            }), e.component("RouterView", i), e.component("RouterLink", v);
            var o = e.config.optionMergeStrategies;
            o.beforeRouteEnter = o.beforeRouteLeave = o.beforeRouteUpdate = o.created
        }
    }, Ct.version = "3.0.2", m && window.Vue && window.Vue.use(Ct), Ct
});
