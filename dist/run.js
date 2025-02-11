/*!
 * @architect Mark Jivko <mark@oglama.com>
 * @copyright © 2024-2025 Oglama https://oglama.com
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Mg = Object.defineProperty;
var ul = e => {
    throw TypeError(e);
};
var Bg = (e, t, r) => (t in e ? Mg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r));
var g = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var b = (e, t, r) => Bg(e, typeof t != "symbol" ? t + "" : t, r),
    cl = (e, t, r) => t.has(e) || ul("Cannot " + r);
var v = (e, t, r) => (cl(e, t, "read from private field"), r ? r.call(e) : t.get(e)),
    z = (e, t, r) =>
        t.has(e) ? ul("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r),
    re = (e, t, r, n) => (cl(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
var bn = g(Vt => {
    "use strict";
    Object.defineProperty(Vt, "__esModule", { value: !0 });
    Vt.CancellationError = Vt.CancellationToken = void 0;
    var Hg = require("events"),
        po = class extends Hg.EventEmitter {
            get cancelled() {
                return this._cancelled || (this._parent != null && this._parent.cancelled);
            }
            set parent(t) {
                this.removeParentCancelHandler(),
                    (this._parent = t),
                    (this.parentCancelHandler = () => this.cancel()),
                    this._parent.onCancel(this.parentCancelHandler);
            }
            constructor(t) {
                super(),
                    (this.parentCancelHandler = null),
                    (this._parent = null),
                    (this._cancelled = !1),
                    t != null && (this.parent = t);
            }
            cancel() {
                (this._cancelled = !0), this.emit("cancel");
            }
            onCancel(t) {
                this.cancelled ? t() : this.once("cancel", t);
            }
            createPromise(t) {
                if (this.cancelled) return Promise.reject(new Nr());
                let r = () => {
                        if (n != null)
                            try {
                                this.removeListener("cancel", n), (n = null);
                            } catch {}
                    },
                    n = null;
                return new Promise((i, o) => {
                    let s = null;
                    if (
                        ((n = () => {
                            try {
                                s != null && (s(), (s = null));
                            } finally {
                                o(new Nr());
                            }
                        }),
                        this.cancelled)
                    ) {
                        n();
                        return;
                    }
                    this.onCancel(n),
                        t(i, o, a => {
                            s = a;
                        });
                })
                    .then(i => (r(), i))
                    .catch(i => {
                        throw (r(), i);
                    });
            }
            removeParentCancelHandler() {
                let t = this._parent;
                t != null &&
                    this.parentCancelHandler != null &&
                    (t.removeListener("cancel", this.parentCancelHandler), (this.parentCancelHandler = null));
            }
            dispose() {
                try {
                    this.removeParentCancelHandler();
                } finally {
                    this.removeAllListeners(), (this._parent = null);
                }
            }
        };
    Vt.CancellationToken = po;
    var Nr = class extends Error {
        constructor() {
            super("cancelled");
        }
    };
    Vt.CancellationError = Nr;
});
var hl = g((wx, fl) => {
    var Yt = 1e3,
        zt = Yt * 60,
        Xt = zt * 60,
        Ct = Xt * 24,
        jg = Ct * 7,
        Wg = Ct * 365.25;
    fl.exports = function (e, t) {
        t = t || {};
        var r = typeof e;
        if (r === "string" && e.length > 0) return Gg(e);
        if (r === "number" && isFinite(e)) return t.long ? Yg(e) : Vg(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
    };
    function Gg(e) {
        if (((e = String(e)), !(e.length > 100))) {
            var t =
                /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                    e
                );
            if (t) {
                var r = parseFloat(t[1]),
                    n = (t[2] || "ms").toLowerCase();
                switch (n) {
                    case "years":
                    case "year":
                    case "yrs":
                    case "yr":
                    case "y":
                        return r * Wg;
                    case "weeks":
                    case "week":
                    case "w":
                        return r * jg;
                    case "days":
                    case "day":
                    case "d":
                        return r * Ct;
                    case "hours":
                    case "hour":
                    case "hrs":
                    case "hr":
                    case "h":
                        return r * Xt;
                    case "minutes":
                    case "minute":
                    case "mins":
                    case "min":
                    case "m":
                        return r * zt;
                    case "seconds":
                    case "second":
                    case "secs":
                    case "sec":
                    case "s":
                        return r * Yt;
                    case "milliseconds":
                    case "millisecond":
                    case "msecs":
                    case "msec":
                    case "ms":
                        return r;
                    default:
                        return;
                }
            }
        }
    }
    function Vg(e) {
        var t = Math.abs(e);
        return t >= Ct
            ? Math.round(e / Ct) + "d"
            : t >= Xt
            ? Math.round(e / Xt) + "h"
            : t >= zt
            ? Math.round(e / zt) + "m"
            : t >= Yt
            ? Math.round(e / Yt) + "s"
            : e + "ms";
    }
    function Yg(e) {
        var t = Math.abs(e);
        return t >= Ct
            ? On(e, t, Ct, "day")
            : t >= Xt
            ? On(e, t, Xt, "hour")
            : t >= zt
            ? On(e, t, zt, "minute")
            : t >= Yt
            ? On(e, t, Yt, "second")
            : e + " ms";
    }
    function On(e, t, r, n) {
        var i = t >= r * 1.5;
        return Math.round(e / r) + " " + n + (i ? "s" : "");
    }
});
var mo = g((yx, dl) => {
    function zg(e) {
        (r.debug = r),
            (r.default = r),
            (r.coerce = l),
            (r.disable = s),
            (r.enable = i),
            (r.enabled = a),
            (r.humanize = hl()),
            (r.destroy = d),
            Object.keys(e).forEach(c => {
                r[c] = e[c];
            }),
            (r.names = []),
            (r.skips = []),
            (r.formatters = {});
        function t(c) {
            let f = 0;
            for (let m = 0; m < c.length; m++) (f = (f << 5) - f + c.charCodeAt(m)), (f |= 0);
            return r.colors[Math.abs(f) % r.colors.length];
        }
        r.selectColor = t;
        function r(c) {
            let f,
                m = null,
                p,
                E;
            function _(...A) {
                if (!_.enabled) return;
                let T = _,
                    C = Number(new Date()),
                    N = C - (f || C);
                (T.diff = N),
                    (T.prev = f),
                    (T.curr = C),
                    (f = C),
                    (A[0] = r.coerce(A[0])),
                    typeof A[0] != "string" && A.unshift("%O");
                let L = 0;
                (A[0] = A[0].replace(/%([a-zA-Z%])/g, (Y, fe) => {
                    if (Y === "%%") return "%";
                    L++;
                    let y = r.formatters[fe];
                    if (typeof y == "function") {
                        let P = A[L];
                        (Y = y.call(T, P)), A.splice(L, 1), L--;
                    }
                    return Y;
                })),
                    r.formatArgs.call(T, A),
                    (T.log || r.log).apply(T, A);
            }
            return (
                (_.namespace = c),
                (_.useColors = r.useColors()),
                (_.color = r.selectColor(c)),
                (_.extend = n),
                (_.destroy = r.destroy),
                Object.defineProperty(_, "enabled", {
                    enumerable: !0,
                    configurable: !1,
                    get: () => (m !== null ? m : (p !== r.namespaces && ((p = r.namespaces), (E = r.enabled(c))), E)),
                    set: A => {
                        m = A;
                    }
                }),
                typeof r.init == "function" && r.init(_),
                _
            );
        }
        function n(c, f) {
            let m = r(this.namespace + (typeof f > "u" ? ":" : f) + c);
            return (m.log = this.log), m;
        }
        function i(c) {
            r.save(c), (r.namespaces = c), (r.names = []), (r.skips = []);
            let f = (typeof c == "string" ? c : "").trim().replace(" ", ",").split(",").filter(Boolean);
            for (let m of f) m[0] === "-" ? r.skips.push(m.slice(1)) : r.names.push(m);
        }
        function o(c, f) {
            let m = 0,
                p = 0,
                E = -1,
                _ = 0;
            for (; m < c.length; )
                if (p < f.length && (f[p] === c[m] || f[p] === "*")) f[p] === "*" ? ((E = p), (_ = m), p++) : (m++, p++);
                else if (E !== -1) (p = E + 1), _++, (m = _);
                else return !1;
            for (; p < f.length && f[p] === "*"; ) p++;
            return p === f.length;
        }
        function s() {
            let c = [...r.names, ...r.skips.map(f => "-" + f)].join(",");
            return r.enable(""), c;
        }
        function a(c) {
            for (let f of r.skips) if (o(c, f)) return !1;
            for (let f of r.names) if (o(c, f)) return !0;
            return !1;
        }
        function l(c) {
            return c instanceof Error ? c.stack || c.message : c;
        }
        function d() {
            console.warn(
                "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
            );
        }
        return r.enable(r.load()), r;
    }
    dl.exports = zg;
});
var pl = g((De, xn) => {
    De.formatArgs = Jg;
    De.save = Kg;
    De.load = Qg;
    De.useColors = Xg;
    De.storage = Zg();
    De.destroy = (() => {
        let e = !1;
        return () => {
            e ||
                ((e = !0),
                console.warn(
                    "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
                ));
        };
    })();
    De.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
    ];
    function Xg() {
        if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return !0;
        if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
            return !1;
        let e;
        return (
            (typeof document < "u" &&
                document.documentElement &&
                document.documentElement.style &&
                document.documentElement.style.WebkitAppearance) ||
            (typeof window < "u" &&
                window.console &&
                (window.console.firebug || (window.console.exception && window.console.table))) ||
            (typeof navigator < "u" &&
                navigator.userAgent &&
                (e = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) &&
                parseInt(e[1], 10) >= 31) ||
            (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        );
    }
    function Jg(e) {
        if (
            ((e[0] =
                (this.useColors ? "%c" : "") +
                this.namespace +
                (this.useColors ? " %c" : " ") +
                e[0] +
                (this.useColors ? "%c " : " ") +
                "+" +
                xn.exports.humanize(this.diff)),
            !this.useColors)
        )
            return;
        let t = "color: " + this.color;
        e.splice(1, 0, t, "color: inherit");
        let r = 0,
            n = 0;
        e[0].replace(/%[a-zA-Z%]/g, i => {
            i !== "%%" && (r++, i === "%c" && (n = r));
        }),
            e.splice(n, 0, t);
    }
    De.log = console.debug || console.log || (() => {});
    function Kg(e) {
        try {
            e ? De.storage.setItem("debug", e) : De.storage.removeItem("debug");
        } catch {}
    }
    function Qg() {
        let e;
        try {
            e = De.storage.getItem("debug");
        } catch {}
        return !e && typeof process < "u" && "env" in process && (e = process.env.DEBUG), e;
    }
    function Zg() {
        try {
            return localStorage;
        } catch {}
    }
    xn.exports = mo()(De);
    var { formatters: e0 } = xn.exports;
    e0.j = function (e) {
        try {
            return JSON.stringify(e);
        } catch (t) {
            return "[UnexpectedJSONParseError]: " + t.message;
        }
    };
});
var gl = g((Ex, ml) => {
    "use strict";
    ml.exports = (e, t = process.argv) => {
        let r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--",
            n = t.indexOf(r + e),
            i = t.indexOf("--");
        return n !== -1 && (i === -1 || n < i);
    };
});
var El = g((_x, yl) => {
    "use strict";
    var t0 = require("os"),
        wl = require("tty"),
        Le = gl(),
        { env: ae } = process,
        ot;
    Le("no-color") || Le("no-colors") || Le("color=false") || Le("color=never")
        ? (ot = 0)
        : (Le("color") || Le("colors") || Le("color=true") || Le("color=always")) && (ot = 1);
    "FORCE_COLOR" in ae &&
        (ae.FORCE_COLOR === "true"
            ? (ot = 1)
            : ae.FORCE_COLOR === "false"
            ? (ot = 0)
            : (ot = ae.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(ae.FORCE_COLOR, 10), 3)));
    function go(e) {
        return e === 0 ? !1 : { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 };
    }
    function wo(e, t) {
        if (ot === 0) return 0;
        if (Le("color=16m") || Le("color=full") || Le("color=truecolor")) return 3;
        if (Le("color=256")) return 2;
        if (e && !t && ot === void 0) return 0;
        let r = ot || 0;
        if (ae.TERM === "dumb") return r;
        if (process.platform === "win32") {
            let n = t0.release().split(".");
            return Number(n[0]) >= 10 && Number(n[2]) >= 10586 ? (Number(n[2]) >= 14931 ? 3 : 2) : 1;
        }
        if ("CI" in ae)
            return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some(n => n in ae) ||
                ae.CI_NAME === "codeship"
                ? 1
                : r;
        if ("TEAMCITY_VERSION" in ae) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(ae.TEAMCITY_VERSION) ? 1 : 0;
        if (ae.COLORTERM === "truecolor") return 3;
        if ("TERM_PROGRAM" in ae) {
            let n = parseInt((ae.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
            switch (ae.TERM_PROGRAM) {
                case "iTerm.app":
                    return n >= 3 ? 3 : 2;
                case "Apple_Terminal":
                    return 2;
            }
        }
        return /-256(color)?$/i.test(ae.TERM)
            ? 2
            : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(ae.TERM) || "COLORTERM" in ae
            ? 1
            : r;
    }
    function r0(e) {
        let t = wo(e, e && e.isTTY);
        return go(t);
    }
    yl.exports = { supportsColor: r0, stdout: go(wo(!0, wl.isatty(1))), stderr: go(wo(!0, wl.isatty(2))) };
});
var vl = g((le, Nn) => {
    var n0 = require("tty"),
        In = require("util");
    le.init = c0;
    le.log = a0;
    le.formatArgs = o0;
    le.save = l0;
    le.load = u0;
    le.useColors = i0;
    le.destroy = In.deprecate(() => {},
    "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    le.colors = [6, 2, 3, 4, 5, 1];
    try {
        let e = El();
        e &&
            (e.stderr || e).level >= 2 &&
            (le.colors = [
                20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81,
                92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170,
                171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215,
                220, 221
            ]);
    } catch {}
    le.inspectOpts = Object.keys(process.env)
        .filter(e => /^debug_/i.test(e))
        .reduce((e, t) => {
            let r = t
                    .substring(6)
                    .toLowerCase()
                    .replace(/_([a-z])/g, (i, o) => o.toUpperCase()),
                n = process.env[t];
            return (
                /^(yes|on|true|enabled)$/i.test(n)
                    ? (n = !0)
                    : /^(no|off|false|disabled)$/i.test(n)
                    ? (n = !1)
                    : n === "null"
                    ? (n = null)
                    : (n = Number(n)),
                (e[r] = n),
                e
            );
        }, {});
    function i0() {
        return "colors" in le.inspectOpts ? !!le.inspectOpts.colors : n0.isatty(process.stderr.fd);
    }
    function o0(e) {
        let { namespace: t, useColors: r } = this;
        if (r) {
            let n = this.color,
                i = "\x1B[3" + (n < 8 ? n : "8;5;" + n),
                o = "  ".concat(i, ";1m").concat(t, " \x1B[0m");
            (e[0] = o + e[0].split("\n").join("\n" + o)), e.push(i + "m+" + Nn.exports.humanize(this.diff) + "\x1B[0m");
        } else e[0] = s0() + t + " " + e[0];
    }
    function s0() {
        return le.inspectOpts.hideDate ? "" : new Date().toISOString() + " ";
    }
    function a0(...e) {
        return process.stderr.write(In.formatWithOptions(le.inspectOpts, ...e) + "\n");
    }
    function l0(e) {
        e ? (process.env.DEBUG = e) : delete process.env.DEBUG;
    }
    function u0() {
        return process.env.DEBUG;
    }
    function c0(e) {
        e.inspectOpts = {};
        let t = Object.keys(le.inspectOpts);
        for (let r = 0; r < t.length; r++) e.inspectOpts[t[r]] = le.inspectOpts[t[r]];
    }
    Nn.exports = mo()(le);
    var { formatters: _l } = Nn.exports;
    _l.o = function (e) {
        return (
            (this.inspectOpts.colors = this.useColors),
            In.inspect(e, this.inspectOpts)
                .split("\n")
                .map(t => t.trim())
                .join(" ")
        );
    };
    _l.O = function (e) {
        return (this.inspectOpts.colors = this.useColors), In.inspect(e, this.inspectOpts);
    };
});
var Al = g((vx, yo) => {
    typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs
        ? (yo.exports = pl())
        : (yo.exports = vl());
});
var Rr = g(Eo => {
    "use strict";
    Object.defineProperty(Eo, "__esModule", { value: !0 });
    Eo.newError = f0;
    function f0(e, t) {
        let r = new Error(e);
        return (r.code = t), r;
    }
});
var vo = g(Rn => {
    "use strict";
    Object.defineProperty(Rn, "__esModule", { value: !0 });
    Rn.ProgressCallbackTransform = void 0;
    var h0 = require("stream"),
        _o = class extends h0.Transform {
            constructor(t, r, n) {
                super(),
                    (this.total = t),
                    (this.cancellationToken = r),
                    (this.onProgress = n),
                    (this.start = Date.now()),
                    (this.transferred = 0),
                    (this.delta = 0),
                    (this.nextUpdate = this.start + 1e3);
            }
            _transform(t, r, n) {
                if (this.cancellationToken.cancelled) {
                    n(new Error("cancelled"), null);
                    return;
                }
                (this.transferred += t.length), (this.delta += t.length);
                let i = Date.now();
                i >= this.nextUpdate &&
                    this.transferred !== this.total &&
                    ((this.nextUpdate = i + 1e3),
                    this.onProgress({
                        total: this.total,
                        delta: this.delta,
                        transferred: this.transferred,
                        percent: (this.transferred / this.total) * 100,
                        bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
                    }),
                    (this.delta = 0)),
                    n(null, t);
            }
            _flush(t) {
                if (this.cancellationToken.cancelled) {
                    t(new Error("cancelled"));
                    return;
                }
                this.onProgress({
                    total: this.total,
                    delta: this.delta,
                    transferred: this.total,
                    percent: 100,
                    bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
                }),
                    (this.delta = 0),
                    t(null);
            }
        };
    Rn.ProgressCallbackTransform = _o;
});
var bl = g(Ee => {
    "use strict";
    Object.defineProperty(Ee, "__esModule", { value: !0 });
    Ee.DigestTransform = Ee.HttpExecutor = Ee.HttpError = void 0;
    Ee.createHttpError = Ao;
    Ee.parseJson = _0;
    Ee.configureRequestOptionsFromUrl = Tl;
    Ee.configureRequestUrl = Co;
    Ee.safeGetHeader = Jt;
    Ee.configureRequestOptions = Pn;
    Ee.safeStringifyJson = Dn;
    var d0 = require("crypto"),
        p0 = Al(),
        m0 = require("fs"),
        g0 = require("stream"),
        Cl = require("url"),
        w0 = bn(),
        Sl = Rr(),
        y0 = vo(),
        Pr = (0, p0.default)("electron-builder");
    function Ao(e, t = null) {
        return new Dr(
            e.statusCode || -1,
            "".concat(e.statusCode, " ").concat(e.statusMessage) +
                (t == null ? "" : "\n" + JSON.stringify(t, null, "  ")) +
                "\nHeaders: " +
                Dn(e.headers),
            t
        );
    }
    var E0 = new Map([
            [429, "Too many requests"],
            [400, "Bad request"],
            [403, "Forbidden"],
            [404, "Not found"],
            [405, "Method not allowed"],
            [406, "Not acceptable"],
            [408, "Request timeout"],
            [413, "Request entity too large"],
            [500, "Internal server error"],
            [502, "Bad gateway"],
            [503, "Service unavailable"],
            [504, "Gateway timeout"],
            [505, "HTTP version not supported"]
        ]),
        Dr = class extends Error {
            constructor(t, r = "HTTP error: ".concat(E0.get(t) || t), n = null) {
                super(r),
                    (this.statusCode = t),
                    (this.description = n),
                    (this.name = "HttpError"),
                    (this.code = "HTTP_ERROR_".concat(t));
            }
            isServerError() {
                return this.statusCode >= 500 && this.statusCode <= 599;
            }
        };
    Ee.HttpError = Dr;
    function _0(e) {
        return e.then(t => (t == null || t.length === 0 ? null : JSON.parse(t)));
    }
    var So = class e {
        constructor() {
            this.maxRedirects = 10;
        }
        request(t, r = new w0.CancellationToken(), n) {
            Pn(t);
            let i = n == null ? void 0 : JSON.stringify(n),
                o = i ? Buffer.from(i) : void 0;
            if (o != null) {
                Pr(i);
                let { headers: s, ...a } = t;
                t = { method: "post", headers: { "Content-Type": "application/json", "Content-Length": o.length, ...s }, ...a };
            }
            return this.doApiRequest(t, r, s => s.end(o));
        }
        doApiRequest(t, r, n, i = 0) {
            return (
                Pr.enabled && Pr("Request: ".concat(Dn(t))),
                r.createPromise((o, s, a) => {
                    let l = this.createRequest(t, d => {
                        try {
                            this.handleResponse(d, t, r, o, s, i, n);
                        } catch (c) {
                            s(c);
                        }
                    });
                    this.addErrorAndTimeoutHandlers(l, s, t.timeout),
                        this.addRedirectHandlers(l, t, s, i, d => {
                            this.doApiRequest(d, r, n, i).then(o).catch(s);
                        }),
                        n(l, s),
                        a(() => l.abort());
                })
            );
        }
        addRedirectHandlers(t, r, n, i, o) {}
        addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
            this.addTimeOutHandler(t, r, n),
                t.on("error", r),
                t.on("aborted", () => {
                    r(new Error("Request has been aborted by the server"));
                });
        }
        handleResponse(t, r, n, i, o, s, a) {
            var l;
            if (
                (Pr.enabled &&
                    Pr("Response: ".concat(t.statusCode, " ").concat(t.statusMessage, ", request options: ").concat(Dn(r))),
                t.statusCode === 404)
            ) {
                o(
                    Ao(
                        t,
                        "method: "
                            .concat(r.method || "GET", " url: ")
                            .concat(r.protocol || "https:", "//")
                            .concat(r.hostname)
                            .concat(r.port ? ":".concat(r.port) : "")
                            .concat(
                                r.path,
                                "\n\nPlease double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.\n"
                            )
                    )
                );
                return;
            } else if (t.statusCode === 204) {
                i();
                return;
            }
            let d = (l = t.statusCode) !== null && l !== void 0 ? l : 0,
                c = d >= 300 && d < 400,
                f = Jt(t, "location");
            if (c && f != null) {
                if (s > this.maxRedirects) {
                    o(this.createMaxRedirectError());
                    return;
                }
                this.doApiRequest(e.prepareRedirectUrlOptions(f, r), n, a, s).then(i).catch(o);
                return;
            }
            t.setEncoding("utf8");
            let m = "";
            t.on("error", o),
                t.on("data", p => (m += p)),
                t.on("end", () => {
                    try {
                        if (t.statusCode != null && t.statusCode >= 400) {
                            let p = Jt(t, "content-type"),
                                E =
                                    p != null &&
                                    (Array.isArray(p) ? p.find(_ => _.includes("json")) != null : p.includes("json"));
                            o(
                                Ao(
                                    t,
                                    "method: "
                                        .concat(r.method || "GET", " url: ")
                                        .concat(r.protocol || "https:", "//")
                                        .concat(r.hostname)
                                        .concat(r.port ? ":".concat(r.port) : "")
                                        .concat(r.path, "\n\n          Data:\n          ")
                                        .concat(E ? JSON.stringify(JSON.parse(m)) : m, "\n          ")
                                )
                            );
                        } else i(m.length === 0 ? null : m);
                    } catch (p) {
                        o(p);
                    }
                });
        }
        async downloadToBuffer(t, r) {
            return await r.cancellationToken.createPromise((n, i, o) => {
                let s = [],
                    a = { headers: r.headers || void 0, redirect: "manual" };
                Co(t, a),
                    Pn(a),
                    this.doDownload(
                        a,
                        {
                            destination: null,
                            options: r,
                            onCancel: o,
                            callback: l => {
                                l == null ? n(Buffer.concat(s)) : i(l);
                            },
                            responseHandler: (l, d) => {
                                let c = 0;
                                l.on("data", f => {
                                    if (((c += f.length), c > 524288e3)) {
                                        d(new Error("Maximum allowed size is 500 MB"));
                                        return;
                                    }
                                    s.push(f);
                                }),
                                    l.on("end", () => {
                                        d(null);
                                    });
                            }
                        },
                        0
                    );
            });
        }
        doDownload(t, r, n) {
            let i = this.createRequest(t, o => {
                if (o.statusCode >= 400) {
                    r.callback(
                        new Error(
                            'Cannot download "'
                                .concat(t.protocol || "https:", "//")
                                .concat(t.hostname)
                                .concat(t.path, '", status ')
                                .concat(o.statusCode, ": ")
                                .concat(o.statusMessage)
                        )
                    );
                    return;
                }
                o.on("error", r.callback);
                let s = Jt(o, "location");
                if (s != null) {
                    n < this.maxRedirects
                        ? this.doDownload(e.prepareRedirectUrlOptions(s, t), r, n++)
                        : r.callback(this.createMaxRedirectError());
                    return;
                }
                r.responseHandler == null ? A0(r, o) : r.responseHandler(o, r.callback);
            });
            this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout),
                this.addRedirectHandlers(i, t, r.callback, n, o => {
                    this.doDownload(o, r, n++);
                }),
                i.end();
        }
        createMaxRedirectError() {
            return new Error("Too many redirects (> ".concat(this.maxRedirects, ")"));
        }
        addTimeOutHandler(t, r, n) {
            t.on("socket", i => {
                i.setTimeout(n, () => {
                    t.abort(), r(new Error("Request timed out"));
                });
            });
        }
        static prepareRedirectUrlOptions(t, r) {
            let n = Tl(t, { ...r }),
                i = n.headers;
            if (i?.authorization) {
                let o = new Cl.URL(t);
                (o.hostname.endsWith(".amazonaws.com") || o.searchParams.has("X-Amz-Credential")) && delete i.authorization;
            }
            return n;
        }
        static retryOnServerError(t, r = 3) {
            for (let n = 0; ; n++)
                try {
                    return t();
                } catch (i) {
                    if (n < r && ((i instanceof Dr && i.isServerError()) || i.code === "EPIPE")) continue;
                    throw i;
                }
        }
    };
    Ee.HttpExecutor = So;
    function Tl(e, t) {
        let r = Pn(t);
        return Co(new Cl.URL(e), r), r;
    }
    function Co(e, t) {
        (t.protocol = e.protocol),
            (t.hostname = e.hostname),
            e.port ? (t.port = e.port) : t.port && delete t.port,
            (t.path = e.pathname + e.search);
    }
    var Fr = class extends g0.Transform {
        get actual() {
            return this._actual;
        }
        constructor(t, r = "sha512", n = "base64") {
            super(),
                (this.expected = t),
                (this.algorithm = r),
                (this.encoding = n),
                (this._actual = null),
                (this.isValidateOnEnd = !0),
                (this.digester = (0, d0.createHash)(r));
        }
        _transform(t, r, n) {
            this.digester.update(t), n(null, t);
        }
        _flush(t) {
            if (((this._actual = this.digester.digest(this.encoding)), this.isValidateOnEnd))
                try {
                    this.validate();
                } catch (r) {
                    t(r);
                    return;
                }
            t(null);
        }
        validate() {
            if (this._actual == null) throw (0, Sl.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
            if (this._actual !== this.expected)
                throw (0, Sl.newError)(
                    ""
                        .concat(this.algorithm, " checksum mismatch, expected ")
                        .concat(this.expected, ", got ")
                        .concat(this._actual),
                    "ERR_CHECKSUM_MISMATCH"
                );
            return null;
        }
    };
    Ee.DigestTransform = Fr;
    function v0(e, t, r) {
        return e != null && t != null && e !== t
            ? (r(new Error("checksum mismatch: expected ".concat(t, " but got ").concat(e, " (X-Checksum-Sha2 header)"))), !1)
            : !0;
    }
    function Jt(e, t) {
        let r = e.headers[t];
        return r == null ? null : Array.isArray(r) ? (r.length === 0 ? null : r[r.length - 1]) : r;
    }
    function A0(e, t) {
        if (!v0(Jt(t, "X-Checksum-Sha2"), e.options.sha2, e.callback)) return;
        let r = [];
        if (e.options.onProgress != null) {
            let s = Jt(t, "content-length");
            s != null &&
                r.push(new y0.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
        }
        let n = e.options.sha512;
        n != null
            ? r.push(
                  new Fr(
                      n,
                      "sha512",
                      n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64"
                  )
              )
            : e.options.sha2 != null && r.push(new Fr(e.options.sha2, "sha256", "hex"));
        let i = (0, m0.createWriteStream)(e.destination);
        r.push(i);
        let o = t;
        for (let s of r)
            s.on("error", a => {
                i.close(), e.options.cancellationToken.cancelled || e.callback(a);
            }),
                (o = o.pipe(s));
        i.on("finish", () => {
            i.close(e.callback);
        });
    }
    function Pn(e, t, r) {
        r != null && (e.method = r), (e.headers = { ...e.headers });
        let n = e.headers;
        return (
            t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : "token ".concat(t)),
            n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"),
            (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"),
            e.protocol == null && process.versions.electron != null && (e.protocol = "https:"),
            e
        );
    }
    function Dn(e, t) {
        return JSON.stringify(
            e,
            (r, n) =>
                r.endsWith("Authorization") ||
                r.endsWith("authorization") ||
                r.endsWith("Password") ||
                r.endsWith("PASSWORD") ||
                r.endsWith("Token") ||
                r.includes("password") ||
                r.includes("token") ||
                (t != null && t.has(r))
                    ? "<stripped sensitive data>"
                    : n,
            2
        );
    }
});
var xl = g(Fn => {
    "use strict";
    Object.defineProperty(Fn, "__esModule", { value: !0 });
    Fn.githubUrl = S0;
    Fn.getS3LikeProviderBaseUrl = C0;
    function S0(e, t = "github.com") {
        return "".concat(e.protocol || "https", "://").concat(e.host || t);
    }
    function C0(e) {
        let t = e.provider;
        if (t === "s3") return T0(e);
        if (t === "spaces") return b0(e);
        throw new Error("Not supported provider: ".concat(t));
    }
    function T0(e) {
        let t;
        if (e.accelerate == !0) t = "https://".concat(e.bucket, ".s3-accelerate.amazonaws.com");
        else if (e.endpoint != null) t = "".concat(e.endpoint, "/").concat(e.bucket);
        else if (e.bucket.includes(".")) {
            if (e.region == null) throw new Error('Bucket name "'.concat(e.bucket, '" includes a dot, but S3 region is missing'));
            e.region === "us-east-1"
                ? (t = "https://s3.amazonaws.com/".concat(e.bucket))
                : (t = "https://s3-".concat(e.region, ".amazonaws.com/").concat(e.bucket));
        } else
            e.region === "cn-north-1"
                ? (t = "https://".concat(e.bucket, ".s3.").concat(e.region, ".amazonaws.com.cn"))
                : (t = "https://".concat(e.bucket, ".s3.amazonaws.com"));
        return Ol(t, e.path);
    }
    function Ol(e, t) {
        return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), (e += t)), e;
    }
    function b0(e) {
        if (e.name == null) throw new Error("name is missing");
        if (e.region == null) throw new Error("region is missing");
        return Ol("https://".concat(e.name, ".").concat(e.region, ".digitaloceanspaces.com"), e.path);
    }
});
var Il = g(To => {
    "use strict";
    Object.defineProperty(To, "__esModule", { value: !0 });
    To.parseDn = O0;
    function O0(e) {
        let t = !1,
            r = null,
            n = "",
            i = 0;
        e = e.trim();
        let o = new Map();
        for (let s = 0; s <= e.length; s++) {
            if (s === e.length) {
                r !== null && o.set(r, n);
                break;
            }
            let a = e[s];
            if (t) {
                if (a === '"') {
                    t = !1;
                    continue;
                }
            } else {
                if (a === '"') {
                    t = !0;
                    continue;
                }
                if (a === "\\") {
                    s++;
                    let l = parseInt(e.slice(s, s + 2), 16);
                    Number.isNaN(l) ? (n += e[s]) : (s++, (n += String.fromCharCode(l)));
                    continue;
                }
                if (r === null && a === "=") {
                    (r = n), (n = "");
                    continue;
                }
                if (a === "," || a === ";" || a === "+") {
                    r !== null && o.set(r, n), (r = null), (n = "");
                    continue;
                }
            }
            if (a === " " && !t) {
                if (n.length === 0) continue;
                if (s > i) {
                    let l = s;
                    for (; e[l] === " "; ) l++;
                    i = l;
                }
                if (
                    i >= e.length ||
                    e[i] === "," ||
                    e[i] === ";" ||
                    (r === null && e[i] === "=") ||
                    (r !== null && e[i] === "+")
                ) {
                    s = i - 1;
                    continue;
                }
            }
            n += a;
        }
        return o;
    }
});
var Fl = g(Kt => {
    "use strict";
    Object.defineProperty(Kt, "__esModule", { value: !0 });
    Kt.nil = Kt.UUID = void 0;
    var Pl = require("crypto"),
        Dl = Rr(),
        x0 = "options.name must be either a string or a Buffer",
        Nl = (0, Pl.randomBytes)(16);
    Nl[0] = Nl[0] | 1;
    var qn = {},
        k = [];
    for (let e = 0; e < 256; e++) {
        let t = (e + 256).toString(16).substr(1);
        (qn[t] = e), (k[e] = t);
    }
    var Tt = class e {
        constructor(t) {
            (this.ascii = null), (this.binary = null);
            let r = e.check(t);
            if (!r) throw new Error("not a UUID");
            (this.version = r.version), r.format === "ascii" ? (this.ascii = t) : (this.binary = t);
        }
        static v5(t, r) {
            return I0(t, "sha1", 80, r);
        }
        toString() {
            return this.ascii == null && (this.ascii = N0(this.binary)), this.ascii;
        }
        inspect() {
            return "UUID v".concat(this.version, " ").concat(this.toString());
        }
        static check(t, r = 0) {
            if (typeof t == "string")
                return (
                    (t = t.toLowerCase()),
                    /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t)
                        ? t === "00000000-0000-0000-0000-000000000000"
                            ? { version: void 0, variant: "nil", format: "ascii" }
                            : {
                                  version: (qn[t[14] + t[15]] & 240) >> 4,
                                  variant: Rl((qn[t[19] + t[20]] & 224) >> 5),
                                  format: "ascii"
                              }
                        : !1
                );
            if (Buffer.isBuffer(t)) {
                if (t.length < r + 16) return !1;
                let n = 0;
                for (; n < 16 && t[r + n] === 0; n++);
                return n === 16
                    ? { version: void 0, variant: "nil", format: "binary" }
                    : { version: (t[r + 6] & 240) >> 4, variant: Rl((t[r + 8] & 224) >> 5), format: "binary" };
            }
            throw (0, Dl.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
        }
        static parse(t) {
            let r = Buffer.allocUnsafe(16),
                n = 0;
            for (let i = 0; i < 16; i++) (r[i] = qn[t[n++] + t[n++]]), (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
            return r;
        }
    };
    Kt.UUID = Tt;
    Tt.OID = Tt.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
    function Rl(e) {
        switch (e) {
            case 0:
            case 1:
            case 3:
                return "ncs";
            case 4:
            case 5:
                return "rfc4122";
            case 6:
                return "microsoft";
            default:
                return "future";
        }
    }
    var qr;
    (function (e) {
        (e[(e.ASCII = 0)] = "ASCII"), (e[(e.BINARY = 1)] = "BINARY"), (e[(e.OBJECT = 2)] = "OBJECT");
    })(qr || (qr = {}));
    function I0(e, t, r, n, i = qr.ASCII) {
        let o = (0, Pl.createHash)(t);
        if (typeof e != "string" && !Buffer.isBuffer(e)) throw (0, Dl.newError)(x0, "ERR_INVALID_UUID_NAME");
        o.update(n), o.update(e);
        let a = o.digest(),
            l;
        switch (i) {
            case qr.BINARY:
                (a[6] = (a[6] & 15) | r), (a[8] = (a[8] & 63) | 128), (l = a);
                break;
            case qr.OBJECT:
                (a[6] = (a[6] & 15) | r), (a[8] = (a[8] & 63) | 128), (l = new Tt(a));
                break;
            default:
                l =
                    k[a[0]] +
                    k[a[1]] +
                    k[a[2]] +
                    k[a[3]] +
                    "-" +
                    k[a[4]] +
                    k[a[5]] +
                    "-" +
                    k[(a[6] & 15) | r] +
                    k[a[7]] +
                    "-" +
                    k[(a[8] & 63) | 128] +
                    k[a[9]] +
                    "-" +
                    k[a[10]] +
                    k[a[11]] +
                    k[a[12]] +
                    k[a[13]] +
                    k[a[14]] +
                    k[a[15]];
                break;
        }
        return l;
    }
    function N0(e) {
        return (
            k[e[0]] +
            k[e[1]] +
            k[e[2]] +
            k[e[3]] +
            "-" +
            k[e[4]] +
            k[e[5]] +
            "-" +
            k[e[6]] +
            k[e[7]] +
            "-" +
            k[e[8]] +
            k[e[9]] +
            "-" +
            k[e[10]] +
            k[e[11]] +
            k[e[12]] +
            k[e[13]] +
            k[e[14]] +
            k[e[15]]
        );
    }
    Kt.nil = new Tt("00000000-0000-0000-0000-000000000000");
});
var ql = g(Ln => {
    (function (e) {
        (e.parser = function (h, u) {
            return new r(h, u);
        }),
            (e.SAXParser = r),
            (e.SAXStream = d),
            (e.createStream = l),
            (e.MAX_BUFFER_LENGTH = 64 * 1024);
        var t = [
            "comment",
            "sgmlDecl",
            "textNode",
            "tagName",
            "doctype",
            "procInstName",
            "procInstBody",
            "entity",
            "attribName",
            "attribValue",
            "cdata",
            "script"
        ];
        e.EVENTS = [
            "text",
            "processinginstruction",
            "sgmldeclaration",
            "doctype",
            "comment",
            "opentagstart",
            "attribute",
            "opentag",
            "closetag",
            "opencdata",
            "cdata",
            "closecdata",
            "error",
            "end",
            "ready",
            "script",
            "opennamespace",
            "closenamespace"
        ];
        function r(h, u) {
            if (!(this instanceof r)) return new r(h, u);
            var S = this;
            i(S),
                (S.q = S.c = ""),
                (S.bufferCheckPosition = e.MAX_BUFFER_LENGTH),
                (S.opt = u || {}),
                (S.opt.lowercase = S.opt.lowercase || S.opt.lowercasetags),
                (S.looseCase = S.opt.lowercase ? "toLowerCase" : "toUpperCase"),
                (S.tags = []),
                (S.closed = S.closedRoot = S.sawRoot = !1),
                (S.tag = S.error = null),
                (S.strict = !!h),
                (S.noscript = !!(h || S.opt.noscript)),
                (S.state = y.BEGIN),
                (S.strictEntities = S.opt.strictEntities),
                (S.ENTITIES = S.strictEntities ? Object.create(e.XML_ENTITIES) : Object.create(e.ENTITIES)),
                (S.attribList = []),
                S.opt.xmlns && (S.ns = Object.create(E)),
                S.opt.unquotedAttributeValues === void 0 && (S.opt.unquotedAttributeValues = !h),
                (S.trackPosition = S.opt.position !== !1),
                S.trackPosition && (S.position = S.line = S.column = 0),
                U(S, "onready");
        }
        Object.create ||
            (Object.create = function (h) {
                function u() {}
                u.prototype = h;
                var S = new u();
                return S;
            }),
            Object.keys ||
                (Object.keys = function (h) {
                    var u = [];
                    for (var S in h) h.hasOwnProperty(S) && u.push(S);
                    return u;
                });
        function n(h) {
            for (var u = Math.max(e.MAX_BUFFER_LENGTH, 10), S = 0, w = 0, B = t.length; w < B; w++) {
                var oe = h[t[w]].length;
                if (oe > u)
                    switch (t[w]) {
                        case "textNode":
                            Q(h);
                            break;
                        case "cdata":
                            R(h, "oncdata", h.cdata), (h.cdata = "");
                            break;
                        case "script":
                            R(h, "onscript", h.script), (h.script = "");
                            break;
                        default:
                            K(h, "Max buffer length exceeded: " + t[w]);
                    }
                S = Math.max(S, oe);
            }
            var se = e.MAX_BUFFER_LENGTH - S;
            h.bufferCheckPosition = se + h.position;
        }
        function i(h) {
            for (var u = 0, S = t.length; u < S; u++) h[t[u]] = "";
        }
        function o(h) {
            Q(h),
                h.cdata !== "" && (R(h, "oncdata", h.cdata), (h.cdata = "")),
                h.script !== "" && (R(h, "onscript", h.script), (h.script = ""));
        }
        r.prototype = {
            end: function () {
                G(this);
            },
            write: $g,
            resume: function () {
                return (this.error = null), this;
            },
            close: function () {
                return this.write(null);
            },
            flush: function () {
                o(this);
            }
        };
        var s;
        try {
            s = require("stream").Stream;
        } catch {
            s = function () {};
        }
        s || (s = function () {});
        var a = e.EVENTS.filter(function (h) {
            return h !== "error" && h !== "end";
        });
        function l(h, u) {
            return new d(h, u);
        }
        function d(h, u) {
            if (!(this instanceof d)) return new d(h, u);
            s.apply(this), (this._parser = new r(h, u)), (this.writable = !0), (this.readable = !0);
            var S = this;
            (this._parser.onend = function () {
                S.emit("end");
            }),
                (this._parser.onerror = function (w) {
                    S.emit("error", w), (S._parser.error = null);
                }),
                (this._decoder = null),
                a.forEach(function (w) {
                    Object.defineProperty(S, "on" + w, {
                        get: function () {
                            return S._parser["on" + w];
                        },
                        set: function (B) {
                            if (!B) return S.removeAllListeners(w), (S._parser["on" + w] = B), B;
                            S.on(w, B);
                        },
                        enumerable: !0,
                        configurable: !1
                    });
                });
        }
        (d.prototype = Object.create(s.prototype, { constructor: { value: d } })),
            (d.prototype.write = function (h) {
                if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(h)) {
                    if (!this._decoder) {
                        var u = require("string_decoder").StringDecoder;
                        this._decoder = new u("utf8");
                    }
                    h = this._decoder.write(h);
                }
                return this._parser.write(h.toString()), this.emit("data", h), !0;
            }),
            (d.prototype.end = function (h) {
                return h && h.length && this.write(h), this._parser.end(), !0;
            }),
            (d.prototype.on = function (h, u) {
                var S = this;
                return (
                    !S._parser["on" + h] &&
                        a.indexOf(h) !== -1 &&
                        (S._parser["on" + h] = function () {
                            var w = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
                            w.splice(0, 0, h), S.emit.apply(S, w);
                        }),
                    s.prototype.on.call(S, h, u)
                );
            });
        var c = "[CDATA[",
            f = "DOCTYPE",
            m = "http://www.w3.org/XML/1998/namespace",
            p = "http://www.w3.org/2000/xmlns/",
            E = { xml: m, xmlns: p },
            _ =
                /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
            A =
                /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/,
            T =
                /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
            C =
                /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
        function N(h) {
            return h === " " || h === "\n" || h === "\r" || h === "	";
        }
        function L(h) {
            return h === '"' || h === "'";
        }
        function qe(h) {
            return h === ">" || N(h);
        }
        function Y(h, u) {
            return h.test(u);
        }
        function fe(h, u) {
            return !Y(h, u);
        }
        var y = 0;
        (e.STATE = {
            BEGIN: y++,
            BEGIN_WHITESPACE: y++,
            TEXT: y++,
            TEXT_ENTITY: y++,
            OPEN_WAKA: y++,
            SGML_DECL: y++,
            SGML_DECL_QUOTED: y++,
            DOCTYPE: y++,
            DOCTYPE_QUOTED: y++,
            DOCTYPE_DTD: y++,
            DOCTYPE_DTD_QUOTED: y++,
            COMMENT_STARTING: y++,
            COMMENT: y++,
            COMMENT_ENDING: y++,
            COMMENT_ENDED: y++,
            CDATA: y++,
            CDATA_ENDING: y++,
            CDATA_ENDING_2: y++,
            PROC_INST: y++,
            PROC_INST_BODY: y++,
            PROC_INST_ENDING: y++,
            OPEN_TAG: y++,
            OPEN_TAG_SLASH: y++,
            ATTRIB: y++,
            ATTRIB_NAME: y++,
            ATTRIB_NAME_SAW_WHITE: y++,
            ATTRIB_VALUE: y++,
            ATTRIB_VALUE_QUOTED: y++,
            ATTRIB_VALUE_CLOSED: y++,
            ATTRIB_VALUE_UNQUOTED: y++,
            ATTRIB_VALUE_ENTITY_Q: y++,
            ATTRIB_VALUE_ENTITY_U: y++,
            CLOSE_TAG: y++,
            CLOSE_TAG_SAW_WHITE: y++,
            SCRIPT: y++,
            SCRIPT_ENDING: y++
        }),
            (e.XML_ENTITIES = { amp: "&", gt: ">", lt: "<", quot: '"', apos: "'" }),
            (e.ENTITIES = {
                amp: "&",
                gt: ">",
                lt: "<",
                quot: '"',
                apos: "'",
                AElig: 198,
                Aacute: 193,
                Acirc: 194,
                Agrave: 192,
                Aring: 197,
                Atilde: 195,
                Auml: 196,
                Ccedil: 199,
                ETH: 208,
                Eacute: 201,
                Ecirc: 202,
                Egrave: 200,
                Euml: 203,
                Iacute: 205,
                Icirc: 206,
                Igrave: 204,
                Iuml: 207,
                Ntilde: 209,
                Oacute: 211,
                Ocirc: 212,
                Ograve: 210,
                Oslash: 216,
                Otilde: 213,
                Ouml: 214,
                THORN: 222,
                Uacute: 218,
                Ucirc: 219,
                Ugrave: 217,
                Uuml: 220,
                Yacute: 221,
                aacute: 225,
                acirc: 226,
                aelig: 230,
                agrave: 224,
                aring: 229,
                atilde: 227,
                auml: 228,
                ccedil: 231,
                eacute: 233,
                ecirc: 234,
                egrave: 232,
                eth: 240,
                euml: 235,
                iacute: 237,
                icirc: 238,
                igrave: 236,
                iuml: 239,
                ntilde: 241,
                oacute: 243,
                ocirc: 244,
                ograve: 242,
                oslash: 248,
                otilde: 245,
                ouml: 246,
                szlig: 223,
                thorn: 254,
                uacute: 250,
                ucirc: 251,
                ugrave: 249,
                uuml: 252,
                yacute: 253,
                yuml: 255,
                copy: 169,
                reg: 174,
                nbsp: 160,
                iexcl: 161,
                cent: 162,
                pound: 163,
                curren: 164,
                yen: 165,
                brvbar: 166,
                sect: 167,
                uml: 168,
                ordf: 170,
                laquo: 171,
                not: 172,
                shy: 173,
                macr: 175,
                deg: 176,
                plusmn: 177,
                sup1: 185,
                sup2: 178,
                sup3: 179,
                acute: 180,
                micro: 181,
                para: 182,
                middot: 183,
                cedil: 184,
                ordm: 186,
                raquo: 187,
                frac14: 188,
                frac12: 189,
                frac34: 190,
                iquest: 191,
                times: 215,
                divide: 247,
                OElig: 338,
                oelig: 339,
                Scaron: 352,
                scaron: 353,
                Yuml: 376,
                fnof: 402,
                circ: 710,
                tilde: 732,
                Alpha: 913,
                Beta: 914,
                Gamma: 915,
                Delta: 916,
                Epsilon: 917,
                Zeta: 918,
                Eta: 919,
                Theta: 920,
                Iota: 921,
                Kappa: 922,
                Lambda: 923,
                Mu: 924,
                Nu: 925,
                Xi: 926,
                Omicron: 927,
                Pi: 928,
                Rho: 929,
                Sigma: 931,
                Tau: 932,
                Upsilon: 933,
                Phi: 934,
                Chi: 935,
                Psi: 936,
                Omega: 937,
                alpha: 945,
                beta: 946,
                gamma: 947,
                delta: 948,
                epsilon: 949,
                zeta: 950,
                eta: 951,
                theta: 952,
                iota: 953,
                kappa: 954,
                lambda: 955,
                mu: 956,
                nu: 957,
                xi: 958,
                omicron: 959,
                pi: 960,
                rho: 961,
                sigmaf: 962,
                sigma: 963,
                tau: 964,
                upsilon: 965,
                phi: 966,
                chi: 967,
                psi: 968,
                omega: 969,
                thetasym: 977,
                upsih: 978,
                piv: 982,
                ensp: 8194,
                emsp: 8195,
                thinsp: 8201,
                zwnj: 8204,
                zwj: 8205,
                lrm: 8206,
                rlm: 8207,
                ndash: 8211,
                mdash: 8212,
                lsquo: 8216,
                rsquo: 8217,
                sbquo: 8218,
                ldquo: 8220,
                rdquo: 8221,
                bdquo: 8222,
                dagger: 8224,
                Dagger: 8225,
                bull: 8226,
                hellip: 8230,
                permil: 8240,
                prime: 8242,
                Prime: 8243,
                lsaquo: 8249,
                rsaquo: 8250,
                oline: 8254,
                frasl: 8260,
                euro: 8364,
                image: 8465,
                weierp: 8472,
                real: 8476,
                trade: 8482,
                alefsym: 8501,
                larr: 8592,
                uarr: 8593,
                rarr: 8594,
                darr: 8595,
                harr: 8596,
                crarr: 8629,
                lArr: 8656,
                uArr: 8657,
                rArr: 8658,
                dArr: 8659,
                hArr: 8660,
                forall: 8704,
                part: 8706,
                exist: 8707,
                empty: 8709,
                nabla: 8711,
                isin: 8712,
                notin: 8713,
                ni: 8715,
                prod: 8719,
                sum: 8721,
                minus: 8722,
                lowast: 8727,
                radic: 8730,
                prop: 8733,
                infin: 8734,
                ang: 8736,
                and: 8743,
                or: 8744,
                cap: 8745,
                cup: 8746,
                int: 8747,
                there4: 8756,
                sim: 8764,
                cong: 8773,
                asymp: 8776,
                ne: 8800,
                equiv: 8801,
                le: 8804,
                ge: 8805,
                sub: 8834,
                sup: 8835,
                nsub: 8836,
                sube: 8838,
                supe: 8839,
                oplus: 8853,
                otimes: 8855,
                perp: 8869,
                sdot: 8901,
                lceil: 8968,
                rceil: 8969,
                lfloor: 8970,
                rfloor: 8971,
                lang: 9001,
                rang: 9002,
                loz: 9674,
                spades: 9824,
                clubs: 9827,
                hearts: 9829,
                diams: 9830
            }),
            Object.keys(e.ENTITIES).forEach(function (h) {
                var u = e.ENTITIES[h],
                    S = typeof u == "number" ? String.fromCharCode(u) : u;
                e.ENTITIES[h] = S;
            });
        for (var P in e.STATE) e.STATE[e.STATE[P]] = P;
        y = e.STATE;
        function U(h, u, S) {
            h[u] && h[u](S);
        }
        function R(h, u, S) {
            h.textNode && Q(h), U(h, u, S);
        }
        function Q(h) {
            (h.textNode = ne(h.opt, h.textNode)), h.textNode && U(h, "ontext", h.textNode), (h.textNode = "");
        }
        function ne(h, u) {
            return h.trim && (u = u.trim()), h.normalize && (u = u.replace(/\s+/g, " ")), u;
        }
        function K(h, u) {
            return (
                Q(h),
                h.trackPosition && (u += "\nLine: " + h.line + "\nColumn: " + h.column + "\nChar: " + h.c),
                (u = new Error(u)),
                (h.error = u),
                U(h, "onerror", u),
                h
            );
        }
        function G(h) {
            return (
                h.sawRoot && !h.closedRoot && F(h, "Unclosed root tag"),
                h.state !== y.BEGIN && h.state !== y.BEGIN_WHITESPACE && h.state !== y.TEXT && K(h, "Unexpected end"),
                Q(h),
                (h.c = ""),
                (h.closed = !0),
                U(h, "onend"),
                r.call(h, h.strict, h.opt),
                h
            );
        }
        function F(h, u) {
            if (typeof h != "object" || !(h instanceof r)) throw new Error("bad call to strictFail");
            h.strict && K(h, u);
        }
        function H(h) {
            h.strict || (h.tagName = h.tagName[h.looseCase]());
            var u = h.tags[h.tags.length - 1] || h,
                S = (h.tag = { name: h.tagName, attributes: {} });
            h.opt.xmlns && (S.ns = u.ns), (h.attribList.length = 0), R(h, "onopentagstart", S);
        }
        function te(h, u) {
            var S = h.indexOf(":"),
                w = S < 0 ? ["", h] : h.split(":"),
                B = w[0],
                oe = w[1];
            return u && h === "xmlns" && ((B = "xmlns"), (oe = "")), { prefix: B, local: oe };
        }
        function j(h) {
            if (
                (h.strict || (h.attribName = h.attribName[h.looseCase]()),
                h.attribList.indexOf(h.attribName) !== -1 || h.tag.attributes.hasOwnProperty(h.attribName))
            ) {
                h.attribName = h.attribValue = "";
                return;
            }
            if (h.opt.xmlns) {
                var u = te(h.attribName, !0),
                    S = u.prefix,
                    w = u.local;
                if (S === "xmlns")
                    if (w === "xml" && h.attribValue !== m)
                        F(h, "xml: prefix must be bound to " + m + "\nActual: " + h.attribValue);
                    else if (w === "xmlns" && h.attribValue !== p)
                        F(h, "xmlns: prefix must be bound to " + p + "\nActual: " + h.attribValue);
                    else {
                        var B = h.tag,
                            oe = h.tags[h.tags.length - 1] || h;
                        B.ns === oe.ns && (B.ns = Object.create(oe.ns)), (B.ns[w] = h.attribValue);
                    }
                h.attribList.push([h.attribName, h.attribValue]);
            } else
                (h.tag.attributes[h.attribName] = h.attribValue),
                    R(h, "onattribute", { name: h.attribName, value: h.attribValue });
            h.attribName = h.attribValue = "";
        }
        function it(h, u) {
            if (h.opt.xmlns) {
                var S = h.tag,
                    w = te(h.tagName);
                (S.prefix = w.prefix),
                    (S.local = w.local),
                    (S.uri = S.ns[w.prefix] || ""),
                    S.prefix && !S.uri && (F(h, "Unbound namespace prefix: " + JSON.stringify(h.tagName)), (S.uri = w.prefix));
                var B = h.tags[h.tags.length - 1] || h;
                S.ns &&
                    B.ns !== S.ns &&
                    Object.keys(S.ns).forEach(function (ll) {
                        R(h, "onopennamespace", { prefix: ll, uri: S.ns[ll] });
                    });
                for (var oe = 0, se = h.attribList.length; oe < se; oe++) {
                    var be = h.attribList[oe],
                        Oe = be[0],
                        Gt = be[1],
                        he = te(Oe, !0),
                        Ke = he.prefix,
                        kg = he.local,
                        al = Ke === "" ? "" : S.ns[Ke] || "",
                        ho = { name: Oe, value: Gt, prefix: Ke, local: kg, uri: al };
                    Ke && Ke !== "xmlns" && !al && (F(h, "Unbound namespace prefix: " + JSON.stringify(Ke)), (ho.uri = Ke)),
                        (h.tag.attributes[Oe] = ho),
                        R(h, "onattribute", ho);
                }
                h.attribList.length = 0;
            }
            (h.tag.isSelfClosing = !!u),
                (h.sawRoot = !0),
                h.tags.push(h.tag),
                R(h, "onopentag", h.tag),
                u ||
                    (!h.noscript && h.tagName.toLowerCase() === "script" ? (h.state = y.SCRIPT) : (h.state = y.TEXT),
                    (h.tag = null),
                    (h.tagName = "")),
                (h.attribName = h.attribValue = ""),
                (h.attribList.length = 0);
        }
        function fo(h) {
            if (!h.tagName) {
                F(h, "Weird empty close tag."), (h.textNode += "</>"), (h.state = y.TEXT);
                return;
            }
            if (h.script) {
                if (h.tagName !== "script") {
                    (h.script += "</" + h.tagName + ">"), (h.tagName = ""), (h.state = y.SCRIPT);
                    return;
                }
                R(h, "onscript", h.script), (h.script = "");
            }
            var u = h.tags.length,
                S = h.tagName;
            h.strict || (S = S[h.looseCase]());
            for (var w = S; u--; ) {
                var B = h.tags[u];
                if (B.name !== w) F(h, "Unexpected close tag");
                else break;
            }
            if (u < 0) {
                F(h, "Unmatched closing tag: " + h.tagName), (h.textNode += "</" + h.tagName + ">"), (h.state = y.TEXT);
                return;
            }
            h.tagName = S;
            for (var oe = h.tags.length; oe-- > u; ) {
                var se = (h.tag = h.tags.pop());
                (h.tagName = h.tag.name), R(h, "onclosetag", h.tagName);
                var be = {};
                for (var Oe in se.ns) be[Oe] = se.ns[Oe];
                var Gt = h.tags[h.tags.length - 1] || h;
                h.opt.xmlns &&
                    se.ns !== Gt.ns &&
                    Object.keys(se.ns).forEach(function (he) {
                        var Ke = se.ns[he];
                        R(h, "onclosenamespace", { prefix: he, uri: Ke });
                    });
            }
            u === 0 && (h.closedRoot = !0),
                (h.tagName = h.attribValue = h.attribName = ""),
                (h.attribList.length = 0),
                (h.state = y.TEXT);
        }
        function Ug(h) {
            var u = h.entity,
                S = u.toLowerCase(),
                w,
                B = "";
            return h.ENTITIES[u]
                ? h.ENTITIES[u]
                : h.ENTITIES[S]
                ? h.ENTITIES[S]
                : ((u = S),
                  u.charAt(0) === "#" &&
                      (u.charAt(1) === "x"
                          ? ((u = u.slice(2)), (w = parseInt(u, 16)), (B = w.toString(16)))
                          : ((u = u.slice(1)), (w = parseInt(u, 10)), (B = w.toString(10)))),
                  (u = u.replace(/^0+/, "")),
                  isNaN(w) || B.toLowerCase() !== u
                      ? (F(h, "Invalid character entity"), "&" + h.entity + ";")
                      : String.fromCodePoint(w));
        }
        function ol(h, u) {
            u === "<"
                ? ((h.state = y.OPEN_WAKA), (h.startTagPosition = h.position))
                : N(u) || (F(h, "Non-whitespace before first tag."), (h.textNode = u), (h.state = y.TEXT));
        }
        function sl(h, u) {
            var S = "";
            return u < h.length && (S = h.charAt(u)), S;
        }
        function $g(h) {
            var u = this;
            if (this.error) throw this.error;
            if (u.closed) return K(u, "Cannot write after close. Assign an onready handler.");
            if (h === null) return G(u);
            typeof h == "object" && (h = h.toString());
            for (var S = 0, w = ""; (w = sl(h, S++)), (u.c = w), !!w; )
                switch ((u.trackPosition && (u.position++, w === "\n" ? (u.line++, (u.column = 0)) : u.column++), u.state)) {
                    case y.BEGIN:
                        if (((u.state = y.BEGIN_WHITESPACE), w === "\uFEFF")) continue;
                        ol(u, w);
                        continue;
                    case y.BEGIN_WHITESPACE:
                        ol(u, w);
                        continue;
                    case y.TEXT:
                        if (u.sawRoot && !u.closedRoot) {
                            for (var B = S - 1; w && w !== "<" && w !== "&"; )
                                (w = sl(h, S++)),
                                    w && u.trackPosition && (u.position++, w === "\n" ? (u.line++, (u.column = 0)) : u.column++);
                            u.textNode += h.substring(B, S - 1);
                        }
                        w === "<" && !(u.sawRoot && u.closedRoot && !u.strict)
                            ? ((u.state = y.OPEN_WAKA), (u.startTagPosition = u.position))
                            : (!N(w) && (!u.sawRoot || u.closedRoot) && F(u, "Text data outside of root node."),
                              w === "&" ? (u.state = y.TEXT_ENTITY) : (u.textNode += w));
                        continue;
                    case y.SCRIPT:
                        w === "<" ? (u.state = y.SCRIPT_ENDING) : (u.script += w);
                        continue;
                    case y.SCRIPT_ENDING:
                        w === "/" ? (u.state = y.CLOSE_TAG) : ((u.script += "<" + w), (u.state = y.SCRIPT));
                        continue;
                    case y.OPEN_WAKA:
                        if (w === "!") (u.state = y.SGML_DECL), (u.sgmlDecl = "");
                        else if (!N(w))
                            if (Y(_, w)) (u.state = y.OPEN_TAG), (u.tagName = w);
                            else if (w === "/") (u.state = y.CLOSE_TAG), (u.tagName = "");
                            else if (w === "?") (u.state = y.PROC_INST), (u.procInstName = u.procInstBody = "");
                            else {
                                if ((F(u, "Unencoded <"), u.startTagPosition + 1 < u.position)) {
                                    var oe = u.position - u.startTagPosition;
                                    w = new Array(oe).join(" ") + w;
                                }
                                (u.textNode += "<" + w), (u.state = y.TEXT);
                            }
                        continue;
                    case y.SGML_DECL:
                        if (u.sgmlDecl + w === "--") {
                            (u.state = y.COMMENT), (u.comment = ""), (u.sgmlDecl = "");
                            continue;
                        }
                        u.doctype && u.doctype !== !0 && u.sgmlDecl
                            ? ((u.state = y.DOCTYPE_DTD), (u.doctype += "<!" + u.sgmlDecl + w), (u.sgmlDecl = ""))
                            : (u.sgmlDecl + w).toUpperCase() === c
                            ? (R(u, "onopencdata"), (u.state = y.CDATA), (u.sgmlDecl = ""), (u.cdata = ""))
                            : (u.sgmlDecl + w).toUpperCase() === f
                            ? ((u.state = y.DOCTYPE),
                              (u.doctype || u.sawRoot) && F(u, "Inappropriately located doctype declaration"),
                              (u.doctype = ""),
                              (u.sgmlDecl = ""))
                            : w === ">"
                            ? (R(u, "onsgmldeclaration", u.sgmlDecl), (u.sgmlDecl = ""), (u.state = y.TEXT))
                            : (L(w) && (u.state = y.SGML_DECL_QUOTED), (u.sgmlDecl += w));
                        continue;
                    case y.SGML_DECL_QUOTED:
                        w === u.q && ((u.state = y.SGML_DECL), (u.q = "")), (u.sgmlDecl += w);
                        continue;
                    case y.DOCTYPE:
                        w === ">"
                            ? ((u.state = y.TEXT), R(u, "ondoctype", u.doctype), (u.doctype = !0))
                            : ((u.doctype += w),
                              w === "[" ? (u.state = y.DOCTYPE_DTD) : L(w) && ((u.state = y.DOCTYPE_QUOTED), (u.q = w)));
                        continue;
                    case y.DOCTYPE_QUOTED:
                        (u.doctype += w), w === u.q && ((u.q = ""), (u.state = y.DOCTYPE));
                        continue;
                    case y.DOCTYPE_DTD:
                        w === "]"
                            ? ((u.doctype += w), (u.state = y.DOCTYPE))
                            : w === "<"
                            ? ((u.state = y.OPEN_WAKA), (u.startTagPosition = u.position))
                            : L(w)
                            ? ((u.doctype += w), (u.state = y.DOCTYPE_DTD_QUOTED), (u.q = w))
                            : (u.doctype += w);
                        continue;
                    case y.DOCTYPE_DTD_QUOTED:
                        (u.doctype += w), w === u.q && ((u.state = y.DOCTYPE_DTD), (u.q = ""));
                        continue;
                    case y.COMMENT:
                        w === "-" ? (u.state = y.COMMENT_ENDING) : (u.comment += w);
                        continue;
                    case y.COMMENT_ENDING:
                        w === "-"
                            ? ((u.state = y.COMMENT_ENDED),
                              (u.comment = ne(u.opt, u.comment)),
                              u.comment && R(u, "oncomment", u.comment),
                              (u.comment = ""))
                            : ((u.comment += "-" + w), (u.state = y.COMMENT));
                        continue;
                    case y.COMMENT_ENDED:
                        w !== ">"
                            ? (F(u, "Malformed comment"), (u.comment += "--" + w), (u.state = y.COMMENT))
                            : u.doctype && u.doctype !== !0
                            ? (u.state = y.DOCTYPE_DTD)
                            : (u.state = y.TEXT);
                        continue;
                    case y.CDATA:
                        w === "]" ? (u.state = y.CDATA_ENDING) : (u.cdata += w);
                        continue;
                    case y.CDATA_ENDING:
                        w === "]" ? (u.state = y.CDATA_ENDING_2) : ((u.cdata += "]" + w), (u.state = y.CDATA));
                        continue;
                    case y.CDATA_ENDING_2:
                        w === ">"
                            ? (u.cdata && R(u, "oncdata", u.cdata), R(u, "onclosecdata"), (u.cdata = ""), (u.state = y.TEXT))
                            : w === "]"
                            ? (u.cdata += "]")
                            : ((u.cdata += "]]" + w), (u.state = y.CDATA));
                        continue;
                    case y.PROC_INST:
                        w === "?" ? (u.state = y.PROC_INST_ENDING) : N(w) ? (u.state = y.PROC_INST_BODY) : (u.procInstName += w);
                        continue;
                    case y.PROC_INST_BODY:
                        if (!u.procInstBody && N(w)) continue;
                        w === "?" ? (u.state = y.PROC_INST_ENDING) : (u.procInstBody += w);
                        continue;
                    case y.PROC_INST_ENDING:
                        w === ">"
                            ? (R(u, "onprocessinginstruction", { name: u.procInstName, body: u.procInstBody }),
                              (u.procInstName = u.procInstBody = ""),
                              (u.state = y.TEXT))
                            : ((u.procInstBody += "?" + w), (u.state = y.PROC_INST_BODY));
                        continue;
                    case y.OPEN_TAG:
                        Y(A, w)
                            ? (u.tagName += w)
                            : (H(u),
                              w === ">"
                                  ? it(u)
                                  : w === "/"
                                  ? (u.state = y.OPEN_TAG_SLASH)
                                  : (N(w) || F(u, "Invalid character in tag name"), (u.state = y.ATTRIB)));
                        continue;
                    case y.OPEN_TAG_SLASH:
                        w === ">"
                            ? (it(u, !0), fo(u))
                            : (F(u, "Forward-slash in opening tag not followed by >"), (u.state = y.ATTRIB));
                        continue;
                    case y.ATTRIB:
                        if (N(w)) continue;
                        w === ">"
                            ? it(u)
                            : w === "/"
                            ? (u.state = y.OPEN_TAG_SLASH)
                            : Y(_, w)
                            ? ((u.attribName = w), (u.attribValue = ""), (u.state = y.ATTRIB_NAME))
                            : F(u, "Invalid attribute name");
                        continue;
                    case y.ATTRIB_NAME:
                        w === "="
                            ? (u.state = y.ATTRIB_VALUE)
                            : w === ">"
                            ? (F(u, "Attribute without value"), (u.attribValue = u.attribName), j(u), it(u))
                            : N(w)
                            ? (u.state = y.ATTRIB_NAME_SAW_WHITE)
                            : Y(A, w)
                            ? (u.attribName += w)
                            : F(u, "Invalid attribute name");
                        continue;
                    case y.ATTRIB_NAME_SAW_WHITE:
                        if (w === "=") u.state = y.ATTRIB_VALUE;
                        else {
                            if (N(w)) continue;
                            F(u, "Attribute without value"),
                                (u.tag.attributes[u.attribName] = ""),
                                (u.attribValue = ""),
                                R(u, "onattribute", { name: u.attribName, value: "" }),
                                (u.attribName = ""),
                                w === ">"
                                    ? it(u)
                                    : Y(_, w)
                                    ? ((u.attribName = w), (u.state = y.ATTRIB_NAME))
                                    : (F(u, "Invalid attribute name"), (u.state = y.ATTRIB));
                        }
                        continue;
                    case y.ATTRIB_VALUE:
                        if (N(w)) continue;
                        L(w)
                            ? ((u.q = w), (u.state = y.ATTRIB_VALUE_QUOTED))
                            : (u.opt.unquotedAttributeValues || K(u, "Unquoted attribute value"),
                              (u.state = y.ATTRIB_VALUE_UNQUOTED),
                              (u.attribValue = w));
                        continue;
                    case y.ATTRIB_VALUE_QUOTED:
                        if (w !== u.q) {
                            w === "&" ? (u.state = y.ATTRIB_VALUE_ENTITY_Q) : (u.attribValue += w);
                            continue;
                        }
                        j(u), (u.q = ""), (u.state = y.ATTRIB_VALUE_CLOSED);
                        continue;
                    case y.ATTRIB_VALUE_CLOSED:
                        N(w)
                            ? (u.state = y.ATTRIB)
                            : w === ">"
                            ? it(u)
                            : w === "/"
                            ? (u.state = y.OPEN_TAG_SLASH)
                            : Y(_, w)
                            ? (F(u, "No whitespace between attributes"),
                              (u.attribName = w),
                              (u.attribValue = ""),
                              (u.state = y.ATTRIB_NAME))
                            : F(u, "Invalid attribute name");
                        continue;
                    case y.ATTRIB_VALUE_UNQUOTED:
                        if (!qe(w)) {
                            w === "&" ? (u.state = y.ATTRIB_VALUE_ENTITY_U) : (u.attribValue += w);
                            continue;
                        }
                        j(u), w === ">" ? it(u) : (u.state = y.ATTRIB);
                        continue;
                    case y.CLOSE_TAG:
                        if (u.tagName)
                            w === ">"
                                ? fo(u)
                                : Y(A, w)
                                ? (u.tagName += w)
                                : u.script
                                ? ((u.script += "</" + u.tagName), (u.tagName = ""), (u.state = y.SCRIPT))
                                : (N(w) || F(u, "Invalid tagname in closing tag"), (u.state = y.CLOSE_TAG_SAW_WHITE));
                        else {
                            if (N(w)) continue;
                            fe(_, w)
                                ? u.script
                                    ? ((u.script += "</" + w), (u.state = y.SCRIPT))
                                    : F(u, "Invalid tagname in closing tag.")
                                : (u.tagName = w);
                        }
                        continue;
                    case y.CLOSE_TAG_SAW_WHITE:
                        if (N(w)) continue;
                        w === ">" ? fo(u) : F(u, "Invalid characters in closing tag");
                        continue;
                    case y.TEXT_ENTITY:
                    case y.ATTRIB_VALUE_ENTITY_Q:
                    case y.ATTRIB_VALUE_ENTITY_U:
                        var se, be;
                        switch (u.state) {
                            case y.TEXT_ENTITY:
                                (se = y.TEXT), (be = "textNode");
                                break;
                            case y.ATTRIB_VALUE_ENTITY_Q:
                                (se = y.ATTRIB_VALUE_QUOTED), (be = "attribValue");
                                break;
                            case y.ATTRIB_VALUE_ENTITY_U:
                                (se = y.ATTRIB_VALUE_UNQUOTED), (be = "attribValue");
                                break;
                        }
                        if (w === ";") {
                            var Oe = Ug(u);
                            u.opt.unparsedEntities && !Object.values(e.XML_ENTITIES).includes(Oe)
                                ? ((u.entity = ""), (u.state = se), u.write(Oe))
                                : ((u[be] += Oe), (u.entity = ""), (u.state = se));
                        } else
                            Y(u.entity.length ? C : T, w)
                                ? (u.entity += w)
                                : (F(u, "Invalid character in entity name"),
                                  (u[be] += "&" + u.entity + w),
                                  (u.entity = ""),
                                  (u.state = se));
                        continue;
                    default:
                        throw new Error(u, "Unknown state: " + u.state);
                }
            return u.position >= u.bufferCheckPosition && n(u), u;
        }
        String.fromCodePoint ||
            (function () {
                var h = String.fromCharCode,
                    u = Math.floor,
                    S = function () {
                        var w = 16384,
                            B = [],
                            oe,
                            se,
                            be = -1,
                            Oe = arguments.length;
                        if (!Oe) return "";
                        for (var Gt = ""; ++be < Oe; ) {
                            var he = Number(arguments[be]);
                            if (!isFinite(he) || he < 0 || he > 1114111 || u(he) !== he)
                                throw RangeError("Invalid code point: " + he);
                            he <= 65535
                                ? B.push(he)
                                : ((he -= 65536), (oe = (he >> 10) + 55296), (se = (he % 1024) + 56320), B.push(oe, se)),
                                (be + 1 === Oe || B.length > w) && ((Gt += h.apply(null, B)), (B.length = 0));
                        }
                        return Gt;
                    };
                Object.defineProperty
                    ? Object.defineProperty(String, "fromCodePoint", { value: S, configurable: !0, writable: !0 })
                    : (String.fromCodePoint = S);
            })();
    })(typeof Ln > "u" ? (Ln.sax = {}) : Ln);
});
var Ul = g(Lr => {
    "use strict";
    Object.defineProperty(Lr, "__esModule", { value: !0 });
    Lr.XElement = void 0;
    Lr.parseXml = F0;
    var R0 = ql(),
        Un = Rr(),
        $n = class {
            constructor(t) {
                if (
                    ((this.name = t),
                    (this.value = ""),
                    (this.attributes = null),
                    (this.isCData = !1),
                    (this.elements = null),
                    !t)
                )
                    throw (0, Un.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
                if (!D0(t)) throw (0, Un.newError)("Invalid element name: ".concat(t), "ERR_XML_ELEMENT_INVALID_NAME");
            }
            attribute(t) {
                let r = this.attributes === null ? null : this.attributes[t];
                if (r == null) throw (0, Un.newError)('No attribute "'.concat(t, '"'), "ERR_XML_MISSED_ATTRIBUTE");
                return r;
            }
            removeAttribute(t) {
                this.attributes !== null && delete this.attributes[t];
            }
            element(t, r = !1, n = null) {
                let i = this.elementOrNull(t, r);
                if (i === null) throw (0, Un.newError)(n || 'No element "'.concat(t, '"'), "ERR_XML_MISSED_ELEMENT");
                return i;
            }
            elementOrNull(t, r = !1) {
                if (this.elements === null) return null;
                for (let n of this.elements) if (Ll(n, t, r)) return n;
                return null;
            }
            getElements(t, r = !1) {
                return this.elements === null ? [] : this.elements.filter(n => Ll(n, t, r));
            }
            elementValueOrEmpty(t, r = !1) {
                let n = this.elementOrNull(t, r);
                return n === null ? "" : n.value;
            }
        };
    Lr.XElement = $n;
    var P0 = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
    function D0(e) {
        return P0.test(e);
    }
    function Ll(e, t, r) {
        let n = e.name;
        return n === t || (r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase());
    }
    function F0(e) {
        let t = null,
            r = R0.parser(!0, {}),
            n = [];
        return (
            (r.onopentag = i => {
                let o = new $n(i.name);
                if (((o.attributes = i.attributes), t === null)) t = o;
                else {
                    let s = n[n.length - 1];
                    s.elements == null && (s.elements = []), s.elements.push(o);
                }
                n.push(o);
            }),
            (r.onclosetag = () => {
                n.pop();
            }),
            (r.ontext = i => {
                n.length > 0 && (n[n.length - 1].value = i);
            }),
            (r.oncdata = i => {
                let o = n[n.length - 1];
                (o.value = i), (o.isCData = !0);
            }),
            (r.onerror = i => {
                throw i;
            }),
            r.write(e),
            t
        );
    }
});
var kl = g(kn => {
    "use strict";
    Object.defineProperty(kn, "__esModule", { value: !0 });
    kn.MemoLazy = void 0;
    var bo = class {
        constructor(t, r) {
            (this.selector = t), (this.creator = r), (this.selected = void 0), (this._value = void 0);
        }
        get hasValue() {
            return this._value !== void 0;
        }
        get value() {
            let t = this.selector();
            if (this._value !== void 0 && $l(this.selected, t)) return this._value;
            this.selected = t;
            let r = this.creator(t);
            return (this.value = r), r;
        }
        set value(t) {
            this._value = t;
        }
    };
    kn.MemoLazy = bo;
    function $l(e, t) {
        if (typeof e == "object" && e !== null && typeof t == "object" && t !== null) {
            let i = Object.keys(e),
                o = Object.keys(t);
            return i.length === o.length && i.every(s => $l(e[s], t[s]));
        }
        return e === t;
    }
});
var Bl = g(Oo => {
    "use strict";
    Object.defineProperty(Oo, "__esModule", { value: !0 });
    Oo.retry = Ml;
    var q0 = bn();
    async function Ml(e, t, r, n = 0, i = 0, o) {
        var s;
        let a = new q0.CancellationToken();
        try {
            return await e();
        } catch (l) {
            if ((!((s = o?.(l)) !== null && s !== void 0) || s) && t > 0 && !a.cancelled)
                return await new Promise(d => setTimeout(d, r + n * i)), await Ml(e, t - 1, r, n, i + 1, o);
            throw l;
        }
    }
});
var ue = g(D => {
    "use strict";
    Object.defineProperty(D, "__esModule", { value: !0 });
    D.CURRENT_APP_PACKAGE_FILE_NAME =
        D.CURRENT_APP_INSTALLER_FILE_NAME =
        D.retry =
        D.MemoLazy =
        D.newError =
        D.XElement =
        D.parseXml =
        D.ProgressCallbackTransform =
        D.UUID =
        D.parseDn =
        D.githubUrl =
        D.getS3LikeProviderBaseUrl =
        D.configureRequestUrl =
        D.parseJson =
        D.safeStringifyJson =
        D.configureRequestOptionsFromUrl =
        D.configureRequestOptions =
        D.safeGetHeader =
        D.DigestTransform =
        D.HttpExecutor =
        D.createHttpError =
        D.HttpError =
        D.CancellationError =
        D.CancellationToken =
            void 0;
    D.asArray = H0;
    var Hl = bn();
    Object.defineProperty(D, "CancellationToken", {
        enumerable: !0,
        get: function () {
            return Hl.CancellationToken;
        }
    });
    Object.defineProperty(D, "CancellationError", {
        enumerable: !0,
        get: function () {
            return Hl.CancellationError;
        }
    });
    var Ge = bl();
    Object.defineProperty(D, "HttpError", {
        enumerable: !0,
        get: function () {
            return Ge.HttpError;
        }
    });
    Object.defineProperty(D, "createHttpError", {
        enumerable: !0,
        get: function () {
            return Ge.createHttpError;
        }
    });
    Object.defineProperty(D, "HttpExecutor", {
        enumerable: !0,
        get: function () {
            return Ge.HttpExecutor;
        }
    });
    Object.defineProperty(D, "DigestTransform", {
        enumerable: !0,
        get: function () {
            return Ge.DigestTransform;
        }
    });
    Object.defineProperty(D, "safeGetHeader", {
        enumerable: !0,
        get: function () {
            return Ge.safeGetHeader;
        }
    });
    Object.defineProperty(D, "configureRequestOptions", {
        enumerable: !0,
        get: function () {
            return Ge.configureRequestOptions;
        }
    });
    Object.defineProperty(D, "configureRequestOptionsFromUrl", {
        enumerable: !0,
        get: function () {
            return Ge.configureRequestOptionsFromUrl;
        }
    });
    Object.defineProperty(D, "safeStringifyJson", {
        enumerable: !0,
        get: function () {
            return Ge.safeStringifyJson;
        }
    });
    Object.defineProperty(D, "parseJson", {
        enumerable: !0,
        get: function () {
            return Ge.parseJson;
        }
    });
    Object.defineProperty(D, "configureRequestUrl", {
        enumerable: !0,
        get: function () {
            return Ge.configureRequestUrl;
        }
    });
    var jl = xl();
    Object.defineProperty(D, "getS3LikeProviderBaseUrl", {
        enumerable: !0,
        get: function () {
            return jl.getS3LikeProviderBaseUrl;
        }
    });
    Object.defineProperty(D, "githubUrl", {
        enumerable: !0,
        get: function () {
            return jl.githubUrl;
        }
    });
    var L0 = Il();
    Object.defineProperty(D, "parseDn", {
        enumerable: !0,
        get: function () {
            return L0.parseDn;
        }
    });
    var U0 = Fl();
    Object.defineProperty(D, "UUID", {
        enumerable: !0,
        get: function () {
            return U0.UUID;
        }
    });
    var $0 = vo();
    Object.defineProperty(D, "ProgressCallbackTransform", {
        enumerable: !0,
        get: function () {
            return $0.ProgressCallbackTransform;
        }
    });
    var Wl = Ul();
    Object.defineProperty(D, "parseXml", {
        enumerable: !0,
        get: function () {
            return Wl.parseXml;
        }
    });
    Object.defineProperty(D, "XElement", {
        enumerable: !0,
        get: function () {
            return Wl.XElement;
        }
    });
    var k0 = Rr();
    Object.defineProperty(D, "newError", {
        enumerable: !0,
        get: function () {
            return k0.newError;
        }
    });
    var M0 = kl();
    Object.defineProperty(D, "MemoLazy", {
        enumerable: !0,
        get: function () {
            return M0.MemoLazy;
        }
    });
    var B0 = Bl();
    Object.defineProperty(D, "retry", {
        enumerable: !0,
        get: function () {
            return B0.retry;
        }
    });
    D.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe";
    D.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function H0(e) {
        return e == null ? [] : Array.isArray(e) ? e : [e];
    }
});
var xe = g(xo => {
    "use strict";
    xo.fromCallback = function (e) {
        return Object.defineProperty(
            function (...t) {
                if (typeof t[t.length - 1] == "function") e.apply(this, t);
                else
                    return new Promise((r, n) => {
                        t.push((i, o) => (i != null ? n(i) : r(o))), e.apply(this, t);
                    });
            },
            "name",
            { value: e.name }
        );
    };
    xo.fromPromise = function (e) {
        return Object.defineProperty(
            function (...t) {
                let r = t[t.length - 1];
                if (typeof r != "function") return e.apply(this, t);
                t.pop(), e.apply(this, t).then(n => r(null, n), r);
            },
            "name",
            { value: e.name }
        );
    };
});
var Vl = g((Fx, Gl) => {
    var st = require("constants"),
        j0 = process.cwd,
        Mn = null,
        W0 = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function () {
        return Mn || (Mn = j0.call(process)), Mn;
    };
    try {
        process.cwd();
    } catch {}
    typeof process.chdir == "function" &&
        ((Io = process.chdir),
        (process.chdir = function (e) {
            (Mn = null), Io.call(process, e);
        }),
        Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Io));
    var Io;
    Gl.exports = G0;
    function G0(e) {
        st.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e),
            e.lutimes || r(e),
            (e.chown = o(e.chown)),
            (e.fchown = o(e.fchown)),
            (e.lchown = o(e.lchown)),
            (e.chmod = n(e.chmod)),
            (e.fchmod = n(e.fchmod)),
            (e.lchmod = n(e.lchmod)),
            (e.chownSync = s(e.chownSync)),
            (e.fchownSync = s(e.fchownSync)),
            (e.lchownSync = s(e.lchownSync)),
            (e.chmodSync = i(e.chmodSync)),
            (e.fchmodSync = i(e.fchmodSync)),
            (e.lchmodSync = i(e.lchmodSync)),
            (e.stat = a(e.stat)),
            (e.fstat = a(e.fstat)),
            (e.lstat = a(e.lstat)),
            (e.statSync = l(e.statSync)),
            (e.fstatSync = l(e.fstatSync)),
            (e.lstatSync = l(e.lstatSync)),
            e.chmod &&
                !e.lchmod &&
                ((e.lchmod = function (c, f, m) {
                    m && process.nextTick(m);
                }),
                (e.lchmodSync = function () {})),
            e.chown &&
                !e.lchown &&
                ((e.lchown = function (c, f, m, p) {
                    p && process.nextTick(p);
                }),
                (e.lchownSync = function () {})),
            W0 === "win32" &&
                (e.rename =
                    typeof e.rename != "function"
                        ? e.rename
                        : (function (c) {
                              function f(m, p, E) {
                                  var _ = Date.now(),
                                      A = 0;
                                  c(m, p, function T(C) {
                                      if (
                                          C &&
                                          (C.code === "EACCES" || C.code === "EPERM" || C.code === "EBUSY") &&
                                          Date.now() - _ < 6e4
                                      ) {
                                          setTimeout(function () {
                                              e.stat(p, function (N, L) {
                                                  N && N.code === "ENOENT" ? c(m, p, T) : E(C);
                                              });
                                          }, A),
                                              A < 100 && (A += 10);
                                          return;
                                      }
                                      E && E(C);
                                  });
                              }
                              return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
                          })(e.rename)),
            (e.read =
                typeof e.read != "function"
                    ? e.read
                    : (function (c) {
                          function f(m, p, E, _, A, T) {
                              var C;
                              if (T && typeof T == "function") {
                                  var N = 0;
                                  C = function (L, qe, Y) {
                                      if (L && L.code === "EAGAIN" && N < 10) return N++, c.call(e, m, p, E, _, A, C);
                                      T.apply(this, arguments);
                                  };
                              }
                              return c.call(e, m, p, E, _, A, C);
                          }
                          return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
                      })(e.read)),
            (e.readSync =
                typeof e.readSync != "function"
                    ? e.readSync
                    : (function (c) {
                          return function (f, m, p, E, _) {
                              for (var A = 0; ; )
                                  try {
                                      return c.call(e, f, m, p, E, _);
                                  } catch (T) {
                                      if (T.code === "EAGAIN" && A < 10) {
                                          A++;
                                          continue;
                                      }
                                      throw T;
                                  }
                          };
                      })(e.readSync));
        function t(c) {
            (c.lchmod = function (f, m, p) {
                c.open(f, st.O_WRONLY | st.O_SYMLINK, m, function (E, _) {
                    if (E) {
                        p && p(E);
                        return;
                    }
                    c.fchmod(_, m, function (A) {
                        c.close(_, function (T) {
                            p && p(A || T);
                        });
                    });
                });
            }),
                (c.lchmodSync = function (f, m) {
                    var p = c.openSync(f, st.O_WRONLY | st.O_SYMLINK, m),
                        E = !0,
                        _;
                    try {
                        (_ = c.fchmodSync(p, m)), (E = !1);
                    } finally {
                        if (E)
                            try {
                                c.closeSync(p);
                            } catch {}
                        else c.closeSync(p);
                    }
                    return _;
                });
        }
        function r(c) {
            st.hasOwnProperty("O_SYMLINK") && c.futimes
                ? ((c.lutimes = function (f, m, p, E) {
                      c.open(f, st.O_SYMLINK, function (_, A) {
                          if (_) {
                              E && E(_);
                              return;
                          }
                          c.futimes(A, m, p, function (T) {
                              c.close(A, function (C) {
                                  E && E(T || C);
                              });
                          });
                      });
                  }),
                  (c.lutimesSync = function (f, m, p) {
                      var E = c.openSync(f, st.O_SYMLINK),
                          _,
                          A = !0;
                      try {
                          (_ = c.futimesSync(E, m, p)), (A = !1);
                      } finally {
                          if (A)
                              try {
                                  c.closeSync(E);
                              } catch {}
                          else c.closeSync(E);
                      }
                      return _;
                  }))
                : c.futimes &&
                  ((c.lutimes = function (f, m, p, E) {
                      E && process.nextTick(E);
                  }),
                  (c.lutimesSync = function () {}));
        }
        function n(c) {
            return (
                c &&
                function (f, m, p) {
                    return c.call(e, f, m, function (E) {
                        d(E) && (E = null), p && p.apply(this, arguments);
                    });
                }
            );
        }
        function i(c) {
            return (
                c &&
                function (f, m) {
                    try {
                        return c.call(e, f, m);
                    } catch (p) {
                        if (!d(p)) throw p;
                    }
                }
            );
        }
        function o(c) {
            return (
                c &&
                function (f, m, p, E) {
                    return c.call(e, f, m, p, function (_) {
                        d(_) && (_ = null), E && E.apply(this, arguments);
                    });
                }
            );
        }
        function s(c) {
            return (
                c &&
                function (f, m, p) {
                    try {
                        return c.call(e, f, m, p);
                    } catch (E) {
                        if (!d(E)) throw E;
                    }
                }
            );
        }
        function a(c) {
            return (
                c &&
                function (f, m, p) {
                    typeof m == "function" && ((p = m), (m = null));
                    function E(_, A) {
                        A && (A.uid < 0 && (A.uid += 4294967296), A.gid < 0 && (A.gid += 4294967296)),
                            p && p.apply(this, arguments);
                    }
                    return m ? c.call(e, f, m, E) : c.call(e, f, E);
                }
            );
        }
        function l(c) {
            return (
                c &&
                function (f, m) {
                    var p = m ? c.call(e, f, m) : c.call(e, f);
                    return p && (p.uid < 0 && (p.uid += 4294967296), p.gid < 0 && (p.gid += 4294967296)), p;
                }
            );
        }
        function d(c) {
            if (!c || c.code === "ENOSYS") return !0;
            var f = !process.getuid || process.getuid() !== 0;
            return !!(f && (c.code === "EINVAL" || c.code === "EPERM"));
        }
    }
});
var Xl = g((qx, zl) => {
    var Yl = require("stream").Stream;
    zl.exports = V0;
    function V0(e) {
        return { ReadStream: t, WriteStream: r };
        function t(n, i) {
            if (!(this instanceof t)) return new t(n, i);
            Yl.call(this);
            var o = this;
            (this.path = n),
                (this.fd = null),
                (this.readable = !0),
                (this.paused = !1),
                (this.flags = "r"),
                (this.mode = 438),
                (this.bufferSize = 64 * 1024),
                (i = i || {});
            for (var s = Object.keys(i), a = 0, l = s.length; a < l; a++) {
                var d = s[a];
                this[d] = i[d];
            }
            if ((this.encoding && this.setEncoding(this.encoding), this.start !== void 0)) {
                if (typeof this.start != "number") throw TypeError("start must be a Number");
                if (this.end === void 0) this.end = 1 / 0;
                else if (typeof this.end != "number") throw TypeError("end must be a Number");
                if (this.start > this.end) throw new Error("start must be <= end");
                this.pos = this.start;
            }
            if (this.fd !== null) {
                process.nextTick(function () {
                    o._read();
                });
                return;
            }
            e.open(this.path, this.flags, this.mode, function (c, f) {
                if (c) {
                    o.emit("error", c), (o.readable = !1);
                    return;
                }
                (o.fd = f), o.emit("open", f), o._read();
            });
        }
        function r(n, i) {
            if (!(this instanceof r)) return new r(n, i);
            Yl.call(this),
                (this.path = n),
                (this.fd = null),
                (this.writable = !0),
                (this.flags = "w"),
                (this.encoding = "binary"),
                (this.mode = 438),
                (this.bytesWritten = 0),
                (i = i || {});
            for (var o = Object.keys(i), s = 0, a = o.length; s < a; s++) {
                var l = o[s];
                this[l] = i[l];
            }
            if (this.start !== void 0) {
                if (typeof this.start != "number") throw TypeError("start must be a Number");
                if (this.start < 0) throw new Error("start must be >= zero");
                this.pos = this.start;
            }
            (this.busy = !1),
                (this._queue = []),
                this.fd === null &&
                    ((this._open = e.open),
                    this._queue.push([this._open, this.path, this.flags, this.mode, void 0]),
                    this.flush());
        }
    }
});
var Kl = g((Lx, Jl) => {
    "use strict";
    Jl.exports = z0;
    var Y0 =
        Object.getPrototypeOf ||
        function (e) {
            return e.__proto__;
        };
    function z0(e) {
        if (e === null || typeof e != "object") return e;
        if (e instanceof Object) var t = { __proto__: Y0(e) };
        else var t = Object.create(null);
        return (
            Object.getOwnPropertyNames(e).forEach(function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
            }),
            t
        );
    }
});
var _e = g((Ux, Po) => {
    var Z = require("fs"),
        X0 = Vl(),
        J0 = Xl(),
        K0 = Kl(),
        Bn = require("util"),
        de,
        jn;
    typeof Symbol == "function" && typeof Symbol.for == "function"
        ? ((de = Symbol.for("graceful-fs.queue")), (jn = Symbol.for("graceful-fs.previous")))
        : ((de = "___graceful-fs.queue"), (jn = "___graceful-fs.previous"));
    function Q0() {}
    function eu(e, t) {
        Object.defineProperty(e, de, {
            get: function () {
                return t;
            }
        });
    }
    var bt = Q0;
    Bn.debuglog
        ? (bt = Bn.debuglog("gfs4"))
        : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
          (bt = function () {
              var e = Bn.format.apply(Bn, arguments);
              (e = "GFS4: " + e.split(/\n/).join("\nGFS4: ")), console.error(e);
          });
    Z[de] ||
        ((Ql = global[de] || []),
        eu(Z, Ql),
        (Z.close = (function (e) {
            function t(r, n) {
                return e.call(Z, r, function (i) {
                    i || Zl(), typeof n == "function" && n.apply(this, arguments);
                });
            }
            return Object.defineProperty(t, jn, { value: e }), t;
        })(Z.close)),
        (Z.closeSync = (function (e) {
            function t(r) {
                e.apply(Z, arguments), Zl();
            }
            return Object.defineProperty(t, jn, { value: e }), t;
        })(Z.closeSync)),
        /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
            process.on("exit", function () {
                bt(Z[de]), require("assert").equal(Z[de].length, 0);
            }));
    var Ql;
    global[de] || eu(global, Z[de]);
    Po.exports = No(K0(Z));
    process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !Z.__patched && ((Po.exports = No(Z)), (Z.__patched = !0));
    function No(e) {
        X0(e), (e.gracefulify = No), (e.createReadStream = qe), (e.createWriteStream = Y);
        var t = e.readFile;
        e.readFile = r;
        function r(P, U, R) {
            return typeof U == "function" && ((R = U), (U = null)), Q(P, U, R);
            function Q(ne, K, G, F) {
                return t(ne, K, function (H) {
                    H && (H.code === "EMFILE" || H.code === "ENFILE")
                        ? Qt([Q, [ne, K, G], H, F || Date.now(), Date.now()])
                        : typeof G == "function" && G.apply(this, arguments);
                });
            }
        }
        var n = e.writeFile;
        e.writeFile = i;
        function i(P, U, R, Q) {
            return typeof R == "function" && ((Q = R), (R = null)), ne(P, U, R, Q);
            function ne(K, G, F, H, te) {
                return n(K, G, F, function (j) {
                    j && (j.code === "EMFILE" || j.code === "ENFILE")
                        ? Qt([ne, [K, G, F, H], j, te || Date.now(), Date.now()])
                        : typeof H == "function" && H.apply(this, arguments);
                });
            }
        }
        var o = e.appendFile;
        o && (e.appendFile = s);
        function s(P, U, R, Q) {
            return typeof R == "function" && ((Q = R), (R = null)), ne(P, U, R, Q);
            function ne(K, G, F, H, te) {
                return o(K, G, F, function (j) {
                    j && (j.code === "EMFILE" || j.code === "ENFILE")
                        ? Qt([ne, [K, G, F, H], j, te || Date.now(), Date.now()])
                        : typeof H == "function" && H.apply(this, arguments);
                });
            }
        }
        var a = e.copyFile;
        a && (e.copyFile = l);
        function l(P, U, R, Q) {
            return typeof R == "function" && ((Q = R), (R = 0)), ne(P, U, R, Q);
            function ne(K, G, F, H, te) {
                return a(K, G, F, function (j) {
                    j && (j.code === "EMFILE" || j.code === "ENFILE")
                        ? Qt([ne, [K, G, F, H], j, te || Date.now(), Date.now()])
                        : typeof H == "function" && H.apply(this, arguments);
                });
            }
        }
        var d = e.readdir;
        e.readdir = f;
        var c = /^v[0-5]\./;
        function f(P, U, R) {
            typeof U == "function" && ((R = U), (U = null));
            var Q = c.test(process.version)
                ? function (G, F, H, te) {
                      return d(G, ne(G, F, H, te));
                  }
                : function (G, F, H, te) {
                      return d(G, F, ne(G, F, H, te));
                  };
            return Q(P, U, R);
            function ne(K, G, F, H) {
                return function (te, j) {
                    te && (te.code === "EMFILE" || te.code === "ENFILE")
                        ? Qt([Q, [K, G, F], te, H || Date.now(), Date.now()])
                        : (j && j.sort && j.sort(), typeof F == "function" && F.call(this, te, j));
                };
            }
        }
        if (process.version.substr(0, 4) === "v0.8") {
            var m = J0(e);
            (T = m.ReadStream), (N = m.WriteStream);
        }
        var p = e.ReadStream;
        p && ((T.prototype = Object.create(p.prototype)), (T.prototype.open = C));
        var E = e.WriteStream;
        E && ((N.prototype = Object.create(E.prototype)), (N.prototype.open = L)),
            Object.defineProperty(e, "ReadStream", {
                get: function () {
                    return T;
                },
                set: function (P) {
                    T = P;
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e, "WriteStream", {
                get: function () {
                    return N;
                },
                set: function (P) {
                    N = P;
                },
                enumerable: !0,
                configurable: !0
            });
        var _ = T;
        Object.defineProperty(e, "FileReadStream", {
            get: function () {
                return _;
            },
            set: function (P) {
                _ = P;
            },
            enumerable: !0,
            configurable: !0
        });
        var A = N;
        Object.defineProperty(e, "FileWriteStream", {
            get: function () {
                return A;
            },
            set: function (P) {
                A = P;
            },
            enumerable: !0,
            configurable: !0
        });
        function T(P, U) {
            return this instanceof T ? (p.apply(this, arguments), this) : T.apply(Object.create(T.prototype), arguments);
        }
        function C() {
            var P = this;
            y(P.path, P.flags, P.mode, function (U, R) {
                U ? (P.autoClose && P.destroy(), P.emit("error", U)) : ((P.fd = R), P.emit("open", R), P.read());
            });
        }
        function N(P, U) {
            return this instanceof N ? (E.apply(this, arguments), this) : N.apply(Object.create(N.prototype), arguments);
        }
        function L() {
            var P = this;
            y(P.path, P.flags, P.mode, function (U, R) {
                U ? (P.destroy(), P.emit("error", U)) : ((P.fd = R), P.emit("open", R));
            });
        }
        function qe(P, U) {
            return new e.ReadStream(P, U);
        }
        function Y(P, U) {
            return new e.WriteStream(P, U);
        }
        var fe = e.open;
        e.open = y;
        function y(P, U, R, Q) {
            return typeof R == "function" && ((Q = R), (R = null)), ne(P, U, R, Q);
            function ne(K, G, F, H, te) {
                return fe(K, G, F, function (j, it) {
                    j && (j.code === "EMFILE" || j.code === "ENFILE")
                        ? Qt([ne, [K, G, F, H], j, te || Date.now(), Date.now()])
                        : typeof H == "function" && H.apply(this, arguments);
                });
            }
        }
        return e;
    }
    function Qt(e) {
        bt("ENQUEUE", e[0].name, e[1]), Z[de].push(e), Ro();
    }
    var Hn;
    function Zl() {
        for (var e = Date.now(), t = 0; t < Z[de].length; ++t) Z[de][t].length > 2 && ((Z[de][t][3] = e), (Z[de][t][4] = e));
        Ro();
    }
    function Ro() {
        if ((clearTimeout(Hn), (Hn = void 0), Z[de].length !== 0)) {
            var e = Z[de].shift(),
                t = e[0],
                r = e[1],
                n = e[2],
                i = e[3],
                o = e[4];
            if (i === void 0) bt("RETRY", t.name, r), t.apply(null, r);
            else if (Date.now() - i >= 6e4) {
                bt("TIMEOUT", t.name, r);
                var s = r.pop();
                typeof s == "function" && s.call(null, n);
            } else {
                var a = Date.now() - o,
                    l = Math.max(o - i, 1),
                    d = Math.min(l * 1.2, 100);
                a >= d ? (bt("RETRY", t.name, r), t.apply(null, r.concat([i]))) : Z[de].push(e);
            }
            Hn === void 0 && (Hn = setTimeout(Ro, 0));
        }
    }
});
var Ot = g(at => {
    "use strict";
    var tu = xe().fromCallback,
        Ie = _e(),
        Z0 = [
            "access",
            "appendFile",
            "chmod",
            "chown",
            "close",
            "copyFile",
            "fchmod",
            "fchown",
            "fdatasync",
            "fstat",
            "fsync",
            "ftruncate",
            "futimes",
            "lchmod",
            "lchown",
            "link",
            "lstat",
            "mkdir",
            "mkdtemp",
            "open",
            "opendir",
            "readdir",
            "readFile",
            "readlink",
            "realpath",
            "rename",
            "rm",
            "rmdir",
            "stat",
            "symlink",
            "truncate",
            "unlink",
            "utimes",
            "writeFile"
        ].filter(e => typeof Ie[e] == "function");
    Object.assign(at, Ie);
    Z0.forEach(e => {
        at[e] = tu(Ie[e]);
    });
    at.exists = function (e, t) {
        return typeof t == "function" ? Ie.exists(e, t) : new Promise(r => Ie.exists(e, r));
    };
    at.read = function (e, t, r, n, i, o) {
        return typeof o == "function"
            ? Ie.read(e, t, r, n, i, o)
            : new Promise((s, a) => {
                  Ie.read(e, t, r, n, i, (l, d, c) => {
                      if (l) return a(l);
                      s({ bytesRead: d, buffer: c });
                  });
              });
    };
    at.write = function (e, t, ...r) {
        return typeof r[r.length - 1] == "function"
            ? Ie.write(e, t, ...r)
            : new Promise((n, i) => {
                  Ie.write(e, t, ...r, (o, s, a) => {
                      if (o) return i(o);
                      n({ bytesWritten: s, buffer: a });
                  });
              });
    };
    typeof Ie.writev == "function" &&
        (at.writev = function (e, t, ...r) {
            return typeof r[r.length - 1] == "function"
                ? Ie.writev(e, t, ...r)
                : new Promise((n, i) => {
                      Ie.writev(e, t, ...r, (o, s, a) => {
                          if (o) return i(o);
                          n({ bytesWritten: s, buffers: a });
                      });
                  });
        });
    typeof Ie.realpath.native == "function"
        ? (at.realpath.native = tu(Ie.realpath.native))
        : process.emitWarning(
              "fs.realpath.native is not a function. Is fs being monkey-patched?",
              "Warning",
              "fs-extra-WARN0003"
          );
});
var nu = g((kx, ru) => {
    "use strict";
    var ew = require("path");
    ru.exports.checkPath = function (t) {
        if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(ew.parse(t).root, ""))) {
            let n = new Error("Path contains invalid characters: ".concat(t));
            throw ((n.code = "EINVAL"), n);
        }
    };
});
var au = g((Mx, Do) => {
    "use strict";
    var iu = Ot(),
        { checkPath: ou } = nu(),
        su = e => {
            let t = { mode: 511 };
            return typeof e == "number" ? e : { ...t, ...e }.mode;
        };
    Do.exports.makeDir = async (e, t) => (ou(e), iu.mkdir(e, { mode: su(t), recursive: !0 }));
    Do.exports.makeDirSync = (e, t) => (ou(e), iu.mkdirSync(e, { mode: su(t), recursive: !0 }));
});
var He = g((Bx, lu) => {
    "use strict";
    var tw = xe().fromPromise,
        { makeDir: rw, makeDirSync: Fo } = au(),
        qo = tw(rw);
    lu.exports = { mkdirs: qo, mkdirsSync: Fo, mkdirp: qo, mkdirpSync: Fo, ensureDir: qo, ensureDirSync: Fo };
});
var lt = g((Hx, cu) => {
    "use strict";
    var nw = xe().fromPromise,
        uu = Ot();
    function iw(e) {
        return uu
            .access(e)
            .then(() => !0)
            .catch(() => !1);
    }
    cu.exports = { pathExists: nw(iw), pathExistsSync: uu.existsSync };
});
var Lo = g((jx, fu) => {
    "use strict";
    var Zt = _e();
    function ow(e, t, r, n) {
        Zt.open(e, "r+", (i, o) => {
            if (i) return n(i);
            Zt.futimes(o, t, r, s => {
                Zt.close(o, a => {
                    n && n(s || a);
                });
            });
        });
    }
    function sw(e, t, r) {
        let n = Zt.openSync(e, "r+");
        return Zt.futimesSync(n, t, r), Zt.closeSync(n);
    }
    fu.exports = { utimesMillis: ow, utimesMillisSync: sw };
});
var xt = g((Wx, pu) => {
    "use strict";
    var er = Ot(),
        ce = require("path"),
        aw = require("util");
    function lw(e, t, r) {
        let n = r.dereference ? i => er.stat(i, { bigint: !0 }) : i => er.lstat(i, { bigint: !0 });
        return Promise.all([
            n(e),
            n(t).catch(i => {
                if (i.code === "ENOENT") return null;
                throw i;
            })
        ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
    }
    function uw(e, t, r) {
        let n,
            i = r.dereference ? s => er.statSync(s, { bigint: !0 }) : s => er.lstatSync(s, { bigint: !0 }),
            o = i(e);
        try {
            n = i(t);
        } catch (s) {
            if (s.code === "ENOENT") return { srcStat: o, destStat: null };
            throw s;
        }
        return { srcStat: o, destStat: n };
    }
    function cw(e, t, r, n, i) {
        aw.callbackify(lw)(e, t, n, (o, s) => {
            if (o) return i(o);
            let { srcStat: a, destStat: l } = s;
            if (l) {
                if (Ur(a, l)) {
                    let d = ce.basename(e),
                        c = ce.basename(t);
                    return r === "move" && d !== c && d.toLowerCase() === c.toLowerCase()
                        ? i(null, { srcStat: a, destStat: l, isChangingCase: !0 })
                        : i(new Error("Source and destination must not be the same."));
                }
                if (a.isDirectory() && !l.isDirectory())
                    return i(new Error("Cannot overwrite non-directory '".concat(t, "' with directory '").concat(e, "'.")));
                if (!a.isDirectory() && l.isDirectory())
                    return i(new Error("Cannot overwrite directory '".concat(t, "' with non-directory '").concat(e, "'.")));
            }
            return a.isDirectory() && Uo(e, t) ? i(new Error(Wn(e, t, r))) : i(null, { srcStat: a, destStat: l });
        });
    }
    function fw(e, t, r, n) {
        let { srcStat: i, destStat: o } = uw(e, t, n);
        if (o) {
            if (Ur(i, o)) {
                let s = ce.basename(e),
                    a = ce.basename(t);
                if (r === "move" && s !== a && s.toLowerCase() === a.toLowerCase())
                    return { srcStat: i, destStat: o, isChangingCase: !0 };
                throw new Error("Source and destination must not be the same.");
            }
            if (i.isDirectory() && !o.isDirectory())
                throw new Error("Cannot overwrite non-directory '".concat(t, "' with directory '").concat(e, "'."));
            if (!i.isDirectory() && o.isDirectory())
                throw new Error("Cannot overwrite directory '".concat(t, "' with non-directory '").concat(e, "'."));
        }
        if (i.isDirectory() && Uo(e, t)) throw new Error(Wn(e, t, r));
        return { srcStat: i, destStat: o };
    }
    function hu(e, t, r, n, i) {
        let o = ce.resolve(ce.dirname(e)),
            s = ce.resolve(ce.dirname(r));
        if (s === o || s === ce.parse(s).root) return i();
        er.stat(s, { bigint: !0 }, (a, l) =>
            a ? (a.code === "ENOENT" ? i() : i(a)) : Ur(t, l) ? i(new Error(Wn(e, r, n))) : hu(e, t, s, n, i)
        );
    }
    function du(e, t, r, n) {
        let i = ce.resolve(ce.dirname(e)),
            o = ce.resolve(ce.dirname(r));
        if (o === i || o === ce.parse(o).root) return;
        let s;
        try {
            s = er.statSync(o, { bigint: !0 });
        } catch (a) {
            if (a.code === "ENOENT") return;
            throw a;
        }
        if (Ur(t, s)) throw new Error(Wn(e, r, n));
        return du(e, t, o, n);
    }
    function Ur(e, t) {
        return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
    }
    function Uo(e, t) {
        let r = ce
                .resolve(e)
                .split(ce.sep)
                .filter(i => i),
            n = ce
                .resolve(t)
                .split(ce.sep)
                .filter(i => i);
        return r.reduce((i, o, s) => i && n[s] === o, !0);
    }
    function Wn(e, t, r) {
        return "Cannot ".concat(r, " '").concat(e, "' to a subdirectory of itself, '").concat(t, "'.");
    }
    pu.exports = {
        checkPaths: cw,
        checkPathsSync: fw,
        checkParentPaths: hu,
        checkParentPathsSync: du,
        isSrcSubdir: Uo,
        areIdentical: Ur
    };
});
var Au = g((Gx, vu) => {
    "use strict";
    var Ne = _e(),
        $r = require("path"),
        hw = He().mkdirs,
        dw = lt().pathExists,
        pw = Lo().utimesMillis,
        kr = xt();
    function mw(e, t, r, n) {
        typeof r == "function" && !n ? ((n = r), (r = {})) : typeof r == "function" && (r = { filter: r }),
            (n = n || function () {}),
            (r = r || {}),
            (r.clobber = "clobber" in r ? !!r.clobber : !0),
            (r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber),
            r.preserveTimestamps &&
                process.arch === "ia32" &&
                process.emitWarning(
                    "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
                    "Warning",
                    "fs-extra-WARN0001"
                ),
            kr.checkPaths(e, t, "copy", r, (i, o) => {
                if (i) return n(i);
                let { srcStat: s, destStat: a } = o;
                kr.checkParentPaths(e, s, t, "copy", l => (l ? n(l) : r.filter ? wu(mu, a, e, t, r, n) : mu(a, e, t, r, n)));
            });
    }
    function mu(e, t, r, n, i) {
        let o = $r.dirname(r);
        dw(o, (s, a) => {
            if (s) return i(s);
            if (a) return Gn(e, t, r, n, i);
            hw(o, l => (l ? i(l) : Gn(e, t, r, n, i)));
        });
    }
    function wu(e, t, r, n, i, o) {
        Promise.resolve(i.filter(r, n)).then(
            s => (s ? e(t, r, n, i, o) : o()),
            s => o(s)
        );
    }
    function gw(e, t, r, n, i) {
        return n.filter ? wu(Gn, e, t, r, n, i) : Gn(e, t, r, n, i);
    }
    function Gn(e, t, r, n, i) {
        (n.dereference ? Ne.stat : Ne.lstat)(t, (s, a) =>
            s
                ? i(s)
                : a.isDirectory()
                ? Sw(a, e, t, r, n, i)
                : a.isFile() || a.isCharacterDevice() || a.isBlockDevice()
                ? ww(a, e, t, r, n, i)
                : a.isSymbolicLink()
                ? bw(e, t, r, n, i)
                : a.isSocket()
                ? i(new Error("Cannot copy a socket file: ".concat(t)))
                : a.isFIFO()
                ? i(new Error("Cannot copy a FIFO pipe: ".concat(t)))
                : i(new Error("Unknown file: ".concat(t)))
        );
    }
    function ww(e, t, r, n, i, o) {
        return t ? yw(e, r, n, i, o) : yu(e, r, n, i, o);
    }
    function yw(e, t, r, n, i) {
        if (n.overwrite) Ne.unlink(r, o => (o ? i(o) : yu(e, t, r, n, i)));
        else return n.errorOnExist ? i(new Error("'".concat(r, "' already exists"))) : i();
    }
    function yu(e, t, r, n, i) {
        Ne.copyFile(t, r, o => (o ? i(o) : n.preserveTimestamps ? Ew(e.mode, t, r, i) : Vn(r, e.mode, i)));
    }
    function Ew(e, t, r, n) {
        return _w(e) ? vw(r, e, i => (i ? n(i) : gu(e, t, r, n))) : gu(e, t, r, n);
    }
    function _w(e) {
        return (e & 128) === 0;
    }
    function vw(e, t, r) {
        return Vn(e, t | 128, r);
    }
    function gu(e, t, r, n) {
        Aw(t, r, i => (i ? n(i) : Vn(r, e, n)));
    }
    function Vn(e, t, r) {
        return Ne.chmod(e, t, r);
    }
    function Aw(e, t, r) {
        Ne.stat(e, (n, i) => (n ? r(n) : pw(t, i.atime, i.mtime, r)));
    }
    function Sw(e, t, r, n, i, o) {
        return t ? Eu(r, n, i, o) : Cw(e.mode, r, n, i, o);
    }
    function Cw(e, t, r, n, i) {
        Ne.mkdir(r, o => {
            if (o) return i(o);
            Eu(t, r, n, s => (s ? i(s) : Vn(r, e, i)));
        });
    }
    function Eu(e, t, r, n) {
        Ne.readdir(e, (i, o) => (i ? n(i) : _u(o, e, t, r, n)));
    }
    function _u(e, t, r, n, i) {
        let o = e.pop();
        return o ? Tw(e, o, t, r, n, i) : i();
    }
    function Tw(e, t, r, n, i, o) {
        let s = $r.join(r, t),
            a = $r.join(n, t);
        kr.checkPaths(s, a, "copy", i, (l, d) => {
            if (l) return o(l);
            let { destStat: c } = d;
            gw(c, s, a, i, f => (f ? o(f) : _u(e, r, n, i, o)));
        });
    }
    function bw(e, t, r, n, i) {
        Ne.readlink(t, (o, s) => {
            if (o) return i(o);
            if ((n.dereference && (s = $r.resolve(process.cwd(), s)), e))
                Ne.readlink(r, (a, l) =>
                    a
                        ? a.code === "EINVAL" || a.code === "UNKNOWN"
                            ? Ne.symlink(s, r, i)
                            : i(a)
                        : (n.dereference && (l = $r.resolve(process.cwd(), l)),
                          kr.isSrcSubdir(s, l)
                              ? i(new Error("Cannot copy '".concat(s, "' to a subdirectory of itself, '").concat(l, "'.")))
                              : e.isDirectory() && kr.isSrcSubdir(l, s)
                              ? i(new Error("Cannot overwrite '".concat(l, "' with '").concat(s, "'.")))
                              : Ow(s, r, i))
                );
            else return Ne.symlink(s, r, i);
        });
    }
    function Ow(e, t, r) {
        Ne.unlink(t, n => (n ? r(n) : Ne.symlink(e, t, r)));
    }
    vu.exports = mw;
});
var Ou = g((Vx, bu) => {
    "use strict";
    var pe = _e(),
        Mr = require("path"),
        xw = He().mkdirsSync,
        Iw = Lo().utimesMillisSync,
        Br = xt();
    function Nw(e, t, r) {
        typeof r == "function" && (r = { filter: r }),
            (r = r || {}),
            (r.clobber = "clobber" in r ? !!r.clobber : !0),
            (r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber),
            r.preserveTimestamps &&
                process.arch === "ia32" &&
                process.emitWarning(
                    "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
                    "Warning",
                    "fs-extra-WARN0002"
                );
        let { srcStat: n, destStat: i } = Br.checkPathsSync(e, t, "copy", r);
        return Br.checkParentPathsSync(e, n, t, "copy"), Rw(i, e, t, r);
    }
    function Rw(e, t, r, n) {
        if (n.filter && !n.filter(t, r)) return;
        let i = Mr.dirname(r);
        return pe.existsSync(i) || xw(i), Su(e, t, r, n);
    }
    function Pw(e, t, r, n) {
        if (!(n.filter && !n.filter(t, r))) return Su(e, t, r, n);
    }
    function Su(e, t, r, n) {
        let o = (n.dereference ? pe.statSync : pe.lstatSync)(t);
        if (o.isDirectory()) return kw(o, e, t, r, n);
        if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return Dw(o, e, t, r, n);
        if (o.isSymbolicLink()) return Hw(e, t, r, n);
        throw o.isSocket()
            ? new Error("Cannot copy a socket file: ".concat(t))
            : o.isFIFO()
            ? new Error("Cannot copy a FIFO pipe: ".concat(t))
            : new Error("Unknown file: ".concat(t));
    }
    function Dw(e, t, r, n, i) {
        return t ? Fw(e, r, n, i) : Cu(e, r, n, i);
    }
    function Fw(e, t, r, n) {
        if (n.overwrite) return pe.unlinkSync(r), Cu(e, t, r, n);
        if (n.errorOnExist) throw new Error("'".concat(r, "' already exists"));
    }
    function Cu(e, t, r, n) {
        return pe.copyFileSync(t, r), n.preserveTimestamps && qw(e.mode, t, r), $o(r, e.mode);
    }
    function qw(e, t, r) {
        return Lw(e) && Uw(r, e), $w(t, r);
    }
    function Lw(e) {
        return (e & 128) === 0;
    }
    function Uw(e, t) {
        return $o(e, t | 128);
    }
    function $o(e, t) {
        return pe.chmodSync(e, t);
    }
    function $w(e, t) {
        let r = pe.statSync(e);
        return Iw(t, r.atime, r.mtime);
    }
    function kw(e, t, r, n, i) {
        return t ? Tu(r, n, i) : Mw(e.mode, r, n, i);
    }
    function Mw(e, t, r, n) {
        return pe.mkdirSync(r), Tu(t, r, n), $o(r, e);
    }
    function Tu(e, t, r) {
        pe.readdirSync(e).forEach(n => Bw(n, e, t, r));
    }
    function Bw(e, t, r, n) {
        let i = Mr.join(t, e),
            o = Mr.join(r, e),
            { destStat: s } = Br.checkPathsSync(i, o, "copy", n);
        return Pw(s, i, o, n);
    }
    function Hw(e, t, r, n) {
        let i = pe.readlinkSync(t);
        if ((n.dereference && (i = Mr.resolve(process.cwd(), i)), e)) {
            let o;
            try {
                o = pe.readlinkSync(r);
            } catch (s) {
                if (s.code === "EINVAL" || s.code === "UNKNOWN") return pe.symlinkSync(i, r);
                throw s;
            }
            if ((n.dereference && (o = Mr.resolve(process.cwd(), o)), Br.isSrcSubdir(i, o)))
                throw new Error("Cannot copy '".concat(i, "' to a subdirectory of itself, '").concat(o, "'."));
            if (pe.statSync(r).isDirectory() && Br.isSrcSubdir(o, i))
                throw new Error("Cannot overwrite '".concat(o, "' with '").concat(i, "'."));
            return jw(i, r);
        } else return pe.symlinkSync(i, r);
    }
    function jw(e, t) {
        return pe.unlinkSync(t), pe.symlinkSync(e, t);
    }
    bu.exports = Nw;
});
var Yn = g((Yx, xu) => {
    "use strict";
    var Ww = xe().fromCallback;
    xu.exports = { copy: Ww(Au()), copySync: Ou() };
});
var Uu = g((zx, Lu) => {
    "use strict";
    var Iu = _e(),
        Du = require("path"),
        W = require("assert"),
        Hr = process.platform === "win32";
    function Fu(e) {
        ["unlink", "chmod", "stat", "lstat", "rmdir", "readdir"].forEach(r => {
            (e[r] = e[r] || Iu[r]), (r = r + "Sync"), (e[r] = e[r] || Iu[r]);
        }),
            (e.maxBusyTries = e.maxBusyTries || 3);
    }
    function ko(e, t, r) {
        let n = 0;
        typeof t == "function" && ((r = t), (t = {})),
            W(e, "rimraf: missing path"),
            W.strictEqual(typeof e, "string", "rimraf: path should be a string"),
            W.strictEqual(typeof r, "function", "rimraf: callback function required"),
            W(t, "rimraf: invalid options argument provided"),
            W.strictEqual(typeof t, "object", "rimraf: options should be object"),
            Fu(t),
            Nu(e, t, function i(o) {
                if (o) {
                    if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && n < t.maxBusyTries) {
                        n++;
                        let s = n * 100;
                        return setTimeout(() => Nu(e, t, i), s);
                    }
                    o.code === "ENOENT" && (o = null);
                }
                r(o);
            });
    }
    function Nu(e, t, r) {
        W(e),
            W(t),
            W(typeof r == "function"),
            t.lstat(e, (n, i) => {
                if (n && n.code === "ENOENT") return r(null);
                if (n && n.code === "EPERM" && Hr) return Ru(e, t, n, r);
                if (i && i.isDirectory()) return zn(e, t, n, r);
                t.unlink(e, o => {
                    if (o) {
                        if (o.code === "ENOENT") return r(null);
                        if (o.code === "EPERM") return Hr ? Ru(e, t, o, r) : zn(e, t, o, r);
                        if (o.code === "EISDIR") return zn(e, t, o, r);
                    }
                    return r(o);
                });
            });
    }
    function Ru(e, t, r, n) {
        W(e),
            W(t),
            W(typeof n == "function"),
            t.chmod(e, 438, i => {
                i
                    ? n(i.code === "ENOENT" ? null : r)
                    : t.stat(e, (o, s) => {
                          o ? n(o.code === "ENOENT" ? null : r) : s.isDirectory() ? zn(e, t, r, n) : t.unlink(e, n);
                      });
            });
    }
    function Pu(e, t, r) {
        let n;
        W(e), W(t);
        try {
            t.chmodSync(e, 438);
        } catch (i) {
            if (i.code === "ENOENT") return;
            throw r;
        }
        try {
            n = t.statSync(e);
        } catch (i) {
            if (i.code === "ENOENT") return;
            throw r;
        }
        n.isDirectory() ? Xn(e, t, r) : t.unlinkSync(e);
    }
    function zn(e, t, r, n) {
        W(e),
            W(t),
            W(typeof n == "function"),
            t.rmdir(e, i => {
                i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM")
                    ? Gw(e, t, n)
                    : i && i.code === "ENOTDIR"
                    ? n(r)
                    : n(i);
            });
    }
    function Gw(e, t, r) {
        W(e),
            W(t),
            W(typeof r == "function"),
            t.readdir(e, (n, i) => {
                if (n) return r(n);
                let o = i.length,
                    s;
                if (o === 0) return t.rmdir(e, r);
                i.forEach(a => {
                    ko(Du.join(e, a), t, l => {
                        if (!s) {
                            if (l) return r((s = l));
                            --o === 0 && t.rmdir(e, r);
                        }
                    });
                });
            });
    }
    function qu(e, t) {
        let r;
        (t = t || {}),
            Fu(t),
            W(e, "rimraf: missing path"),
            W.strictEqual(typeof e, "string", "rimraf: path should be a string"),
            W(t, "rimraf: missing options"),
            W.strictEqual(typeof t, "object", "rimraf: options should be object");
        try {
            r = t.lstatSync(e);
        } catch (n) {
            if (n.code === "ENOENT") return;
            n.code === "EPERM" && Hr && Pu(e, t, n);
        }
        try {
            r && r.isDirectory() ? Xn(e, t, null) : t.unlinkSync(e);
        } catch (n) {
            if (n.code === "ENOENT") return;
            if (n.code === "EPERM") return Hr ? Pu(e, t, n) : Xn(e, t, n);
            if (n.code !== "EISDIR") throw n;
            Xn(e, t, n);
        }
    }
    function Xn(e, t, r) {
        W(e), W(t);
        try {
            t.rmdirSync(e);
        } catch (n) {
            if (n.code === "ENOTDIR") throw r;
            if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM") Vw(e, t);
            else if (n.code !== "ENOENT") throw n;
        }
    }
    function Vw(e, t) {
        if ((W(e), W(t), t.readdirSync(e).forEach(r => qu(Du.join(e, r), t)), Hr)) {
            let r = Date.now();
            do
                try {
                    return t.rmdirSync(e, t);
                } catch {}
            while (Date.now() - r < 500);
        } else return t.rmdirSync(e, t);
    }
    Lu.exports = ko;
    ko.sync = qu;
});
var jr = g((Xx, ku) => {
    "use strict";
    var Jn = _e(),
        Yw = xe().fromCallback,
        $u = Uu();
    function zw(e, t) {
        if (Jn.rm) return Jn.rm(e, { recursive: !0, force: !0 }, t);
        $u(e, t);
    }
    function Xw(e) {
        if (Jn.rmSync) return Jn.rmSync(e, { recursive: !0, force: !0 });
        $u.sync(e);
    }
    ku.exports = { remove: Yw(zw), removeSync: Xw };
});
var Yu = g((Jx, Vu) => {
    "use strict";
    var Jw = xe().fromPromise,
        Hu = Ot(),
        ju = require("path"),
        Wu = He(),
        Gu = jr(),
        Mu = Jw(async function (t) {
            let r;
            try {
                r = await Hu.readdir(t);
            } catch {
                return Wu.mkdirs(t);
            }
            return Promise.all(r.map(n => Gu.remove(ju.join(t, n))));
        });
    function Bu(e) {
        let t;
        try {
            t = Hu.readdirSync(e);
        } catch {
            return Wu.mkdirsSync(e);
        }
        t.forEach(r => {
            (r = ju.join(e, r)), Gu.removeSync(r);
        });
    }
    Vu.exports = { emptyDirSync: Bu, emptydirSync: Bu, emptyDir: Mu, emptydir: Mu };
});
var Ku = g((Kx, Ju) => {
    "use strict";
    var Kw = xe().fromCallback,
        zu = require("path"),
        ut = _e(),
        Xu = He();
    function Qw(e, t) {
        function r() {
            ut.writeFile(e, "", n => {
                if (n) return t(n);
                t();
            });
        }
        ut.stat(e, (n, i) => {
            if (!n && i.isFile()) return t();
            let o = zu.dirname(e);
            ut.stat(o, (s, a) => {
                if (s)
                    return s.code === "ENOENT"
                        ? Xu.mkdirs(o, l => {
                              if (l) return t(l);
                              r();
                          })
                        : t(s);
                a.isDirectory()
                    ? r()
                    : ut.readdir(o, l => {
                          if (l) return t(l);
                      });
            });
        });
    }
    function Zw(e) {
        let t;
        try {
            t = ut.statSync(e);
        } catch {}
        if (t && t.isFile()) return;
        let r = zu.dirname(e);
        try {
            ut.statSync(r).isDirectory() || ut.readdirSync(r);
        } catch (n) {
            if (n && n.code === "ENOENT") Xu.mkdirsSync(r);
            else throw n;
        }
        ut.writeFileSync(e, "");
    }
    Ju.exports = { createFile: Kw(Qw), createFileSync: Zw };
});
var rc = g((Qx, tc) => {
    "use strict";
    var ey = xe().fromCallback,
        Qu = require("path"),
        ct = _e(),
        Zu = He(),
        ty = lt().pathExists,
        { areIdentical: ec } = xt();
    function ry(e, t, r) {
        function n(i, o) {
            ct.link(i, o, s => {
                if (s) return r(s);
                r(null);
            });
        }
        ct.lstat(t, (i, o) => {
            ct.lstat(e, (s, a) => {
                if (s) return (s.message = s.message.replace("lstat", "ensureLink")), r(s);
                if (o && ec(a, o)) return r(null);
                let l = Qu.dirname(t);
                ty(l, (d, c) => {
                    if (d) return r(d);
                    if (c) return n(e, t);
                    Zu.mkdirs(l, f => {
                        if (f) return r(f);
                        n(e, t);
                    });
                });
            });
        });
    }
    function ny(e, t) {
        let r;
        try {
            r = ct.lstatSync(t);
        } catch {}
        try {
            let o = ct.lstatSync(e);
            if (r && ec(o, r)) return;
        } catch (o) {
            throw ((o.message = o.message.replace("lstat", "ensureLink")), o);
        }
        let n = Qu.dirname(t);
        return ct.existsSync(n) || Zu.mkdirsSync(n), ct.linkSync(e, t);
    }
    tc.exports = { createLink: ey(ry), createLinkSync: ny };
});
var ic = g((Zx, nc) => {
    "use strict";
    var ft = require("path"),
        Wr = _e(),
        iy = lt().pathExists;
    function oy(e, t, r) {
        if (ft.isAbsolute(e))
            return Wr.lstat(e, n =>
                n ? ((n.message = n.message.replace("lstat", "ensureSymlink")), r(n)) : r(null, { toCwd: e, toDst: e })
            );
        {
            let n = ft.dirname(t),
                i = ft.join(n, e);
            return iy(i, (o, s) =>
                o
                    ? r(o)
                    : s
                    ? r(null, { toCwd: i, toDst: e })
                    : Wr.lstat(e, a =>
                          a
                              ? ((a.message = a.message.replace("lstat", "ensureSymlink")), r(a))
                              : r(null, { toCwd: e, toDst: ft.relative(n, e) })
                      )
            );
        }
    }
    function sy(e, t) {
        let r;
        if (ft.isAbsolute(e)) {
            if (((r = Wr.existsSync(e)), !r)) throw new Error("absolute srcpath does not exist");
            return { toCwd: e, toDst: e };
        } else {
            let n = ft.dirname(t),
                i = ft.join(n, e);
            if (((r = Wr.existsSync(i)), r)) return { toCwd: i, toDst: e };
            if (((r = Wr.existsSync(e)), !r)) throw new Error("relative srcpath does not exist");
            return { toCwd: e, toDst: ft.relative(n, e) };
        }
    }
    nc.exports = { symlinkPaths: oy, symlinkPathsSync: sy };
});
var ac = g((eI, sc) => {
    "use strict";
    var oc = _e();
    function ay(e, t, r) {
        if (((r = typeof t == "function" ? t : r), (t = typeof t == "function" ? !1 : t), t)) return r(null, t);
        oc.lstat(e, (n, i) => {
            if (n) return r(null, "file");
            (t = i && i.isDirectory() ? "dir" : "file"), r(null, t);
        });
    }
    function ly(e, t) {
        let r;
        if (t) return t;
        try {
            r = oc.lstatSync(e);
        } catch {
            return "file";
        }
        return r && r.isDirectory() ? "dir" : "file";
    }
    sc.exports = { symlinkType: ay, symlinkTypeSync: ly };
});
var mc = g((tI, pc) => {
    "use strict";
    var uy = xe().fromCallback,
        uc = require("path"),
        je = Ot(),
        cc = He(),
        cy = cc.mkdirs,
        fy = cc.mkdirsSync,
        fc = ic(),
        hy = fc.symlinkPaths,
        dy = fc.symlinkPathsSync,
        hc = ac(),
        py = hc.symlinkType,
        my = hc.symlinkTypeSync,
        gy = lt().pathExists,
        { areIdentical: dc } = xt();
    function wy(e, t, r, n) {
        (n = typeof r == "function" ? r : n),
            (r = typeof r == "function" ? !1 : r),
            je.lstat(t, (i, o) => {
                !i && o.isSymbolicLink()
                    ? Promise.all([je.stat(e), je.stat(t)]).then(([s, a]) => {
                          if (dc(s, a)) return n(null);
                          lc(e, t, r, n);
                      })
                    : lc(e, t, r, n);
            });
    }
    function lc(e, t, r, n) {
        hy(e, t, (i, o) => {
            if (i) return n(i);
            (e = o.toDst),
                py(o.toCwd, r, (s, a) => {
                    if (s) return n(s);
                    let l = uc.dirname(t);
                    gy(l, (d, c) => {
                        if (d) return n(d);
                        if (c) return je.symlink(e, t, a, n);
                        cy(l, f => {
                            if (f) return n(f);
                            je.symlink(e, t, a, n);
                        });
                    });
                });
        });
    }
    function yy(e, t, r) {
        let n;
        try {
            n = je.lstatSync(t);
        } catch {}
        if (n && n.isSymbolicLink()) {
            let a = je.statSync(e),
                l = je.statSync(t);
            if (dc(a, l)) return;
        }
        let i = dy(e, t);
        (e = i.toDst), (r = my(i.toCwd, r));
        let o = uc.dirname(t);
        return je.existsSync(o) || fy(o), je.symlinkSync(e, t, r);
    }
    pc.exports = { createSymlink: uy(wy), createSymlinkSync: yy };
});
var Sc = g((rI, Ac) => {
    "use strict";
    var { createFile: gc, createFileSync: wc } = Ku(),
        { createLink: yc, createLinkSync: Ec } = rc(),
        { createSymlink: _c, createSymlinkSync: vc } = mc();
    Ac.exports = {
        createFile: gc,
        createFileSync: wc,
        ensureFile: gc,
        ensureFileSync: wc,
        createLink: yc,
        createLinkSync: Ec,
        ensureLink: yc,
        ensureLinkSync: Ec,
        createSymlink: _c,
        createSymlinkSync: vc,
        ensureSymlink: _c,
        ensureSymlinkSync: vc
    };
});
var Kn = g((nI, Cc) => {
    function Ey(e, { EOL: t = "\n", finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
        let o = r ? t : "";
        return JSON.stringify(e, n, i).replace(/\n/g, t) + o;
    }
    function _y(e) {
        return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
    }
    Cc.exports = { stringify: Ey, stripBom: _y };
});
var xc = g((iI, Oc) => {
    var tr;
    try {
        tr = _e();
    } catch {
        tr = require("fs");
    }
    var Qn = xe(),
        { stringify: Tc, stripBom: bc } = Kn();
    async function vy(e, t = {}) {
        typeof t == "string" && (t = { encoding: t });
        let r = t.fs || tr,
            n = "throws" in t ? t.throws : !0,
            i = await Qn.fromCallback(r.readFile)(e, t);
        i = bc(i);
        let o;
        try {
            o = JSON.parse(i, t ? t.reviver : null);
        } catch (s) {
            if (n) throw ((s.message = "".concat(e, ": ").concat(s.message)), s);
            return null;
        }
        return o;
    }
    var Ay = Qn.fromPromise(vy);
    function Sy(e, t = {}) {
        typeof t == "string" && (t = { encoding: t });
        let r = t.fs || tr,
            n = "throws" in t ? t.throws : !0;
        try {
            let i = r.readFileSync(e, t);
            return (i = bc(i)), JSON.parse(i, t.reviver);
        } catch (i) {
            if (n) throw ((i.message = "".concat(e, ": ").concat(i.message)), i);
            return null;
        }
    }
    async function Cy(e, t, r = {}) {
        let n = r.fs || tr,
            i = Tc(t, r);
        await Qn.fromCallback(n.writeFile)(e, i, r);
    }
    var Ty = Qn.fromPromise(Cy);
    function by(e, t, r = {}) {
        let n = r.fs || tr,
            i = Tc(t, r);
        return n.writeFileSync(e, i, r);
    }
    var Oy = { readFile: Ay, readFileSync: Sy, writeFile: Ty, writeFileSync: by };
    Oc.exports = Oy;
});
var Nc = g((oI, Ic) => {
    "use strict";
    var Zn = xc();
    Ic.exports = {
        readJson: Zn.readFile,
        readJsonSync: Zn.readFileSync,
        writeJson: Zn.writeFile,
        writeJsonSync: Zn.writeFileSync
    };
});
var ei = g((sI, Dc) => {
    "use strict";
    var xy = xe().fromCallback,
        Gr = _e(),
        Rc = require("path"),
        Pc = He(),
        Iy = lt().pathExists;
    function Ny(e, t, r, n) {
        typeof r == "function" && ((n = r), (r = "utf8"));
        let i = Rc.dirname(e);
        Iy(i, (o, s) => {
            if (o) return n(o);
            if (s) return Gr.writeFile(e, t, r, n);
            Pc.mkdirs(i, a => {
                if (a) return n(a);
                Gr.writeFile(e, t, r, n);
            });
        });
    }
    function Ry(e, ...t) {
        let r = Rc.dirname(e);
        if (Gr.existsSync(r)) return Gr.writeFileSync(e, ...t);
        Pc.mkdirsSync(r), Gr.writeFileSync(e, ...t);
    }
    Dc.exports = { outputFile: xy(Ny), outputFileSync: Ry };
});
var qc = g((aI, Fc) => {
    "use strict";
    var { stringify: Py } = Kn(),
        { outputFile: Dy } = ei();
    async function Fy(e, t, r = {}) {
        let n = Py(t, r);
        await Dy(e, n, r);
    }
    Fc.exports = Fy;
});
var Uc = g((lI, Lc) => {
    "use strict";
    var { stringify: qy } = Kn(),
        { outputFileSync: Ly } = ei();
    function Uy(e, t, r) {
        let n = qy(t, r);
        Ly(e, n, r);
    }
    Lc.exports = Uy;
});
var kc = g((uI, $c) => {
    "use strict";
    var $y = xe().fromPromise,
        ve = Nc();
    ve.outputJson = $y(qc());
    ve.outputJsonSync = Uc();
    ve.outputJSON = ve.outputJson;
    ve.outputJSONSync = ve.outputJsonSync;
    ve.writeJSON = ve.writeJson;
    ve.writeJSONSync = ve.writeJsonSync;
    ve.readJSON = ve.readJson;
    ve.readJSONSync = ve.readJsonSync;
    $c.exports = ve;
});
var Wc = g((cI, jc) => {
    "use strict";
    var ky = _e(),
        Bo = require("path"),
        My = Yn().copy,
        Hc = jr().remove,
        By = He().mkdirp,
        Hy = lt().pathExists,
        Mc = xt();
    function jy(e, t, r, n) {
        typeof r == "function" && ((n = r), (r = {})), (r = r || {});
        let i = r.overwrite || r.clobber || !1;
        Mc.checkPaths(e, t, "move", r, (o, s) => {
            if (o) return n(o);
            let { srcStat: a, isChangingCase: l = !1 } = s;
            Mc.checkParentPaths(e, a, t, "move", d => {
                if (d) return n(d);
                if (Wy(t)) return Bc(e, t, i, l, n);
                By(Bo.dirname(t), c => (c ? n(c) : Bc(e, t, i, l, n)));
            });
        });
    }
    function Wy(e) {
        let t = Bo.dirname(e);
        return Bo.parse(t).root === t;
    }
    function Bc(e, t, r, n, i) {
        if (n) return Mo(e, t, r, i);
        if (r) return Hc(t, o => (o ? i(o) : Mo(e, t, r, i)));
        Hy(t, (o, s) => (o ? i(o) : s ? i(new Error("dest already exists.")) : Mo(e, t, r, i)));
    }
    function Mo(e, t, r, n) {
        ky.rename(e, t, i => (i ? (i.code !== "EXDEV" ? n(i) : Gy(e, t, r, n)) : n()));
    }
    function Gy(e, t, r, n) {
        My(e, t, { overwrite: r, errorOnExist: !0 }, o => (o ? n(o) : Hc(e, n)));
    }
    jc.exports = jy;
});
var Xc = g((fI, zc) => {
    "use strict";
    var Vc = _e(),
        jo = require("path"),
        Vy = Yn().copySync,
        Yc = jr().removeSync,
        Yy = He().mkdirpSync,
        Gc = xt();
    function zy(e, t, r) {
        r = r || {};
        let n = r.overwrite || r.clobber || !1,
            { srcStat: i, isChangingCase: o = !1 } = Gc.checkPathsSync(e, t, "move", r);
        return Gc.checkParentPathsSync(e, i, t, "move"), Xy(t) || Yy(jo.dirname(t)), Jy(e, t, n, o);
    }
    function Xy(e) {
        let t = jo.dirname(e);
        return jo.parse(t).root === t;
    }
    function Jy(e, t, r, n) {
        if (n) return Ho(e, t, r);
        if (r) return Yc(t), Ho(e, t, r);
        if (Vc.existsSync(t)) throw new Error("dest already exists.");
        return Ho(e, t, r);
    }
    function Ho(e, t, r) {
        try {
            Vc.renameSync(e, t);
        } catch (n) {
            if (n.code !== "EXDEV") throw n;
            return Ky(e, t, r);
        }
    }
    function Ky(e, t, r) {
        return Vy(e, t, { overwrite: r, errorOnExist: !0 }), Yc(e);
    }
    zc.exports = zy;
});
var Kc = g((hI, Jc) => {
    "use strict";
    var Qy = xe().fromCallback;
    Jc.exports = { move: Qy(Wc()), moveSync: Xc() };
});
var Qe = g((dI, Qc) => {
    "use strict";
    Qc.exports = { ...Ot(), ...Yn(), ...Yu(), ...Sc(), ...kc(), ...He(), ...Kc(), ...ei(), ...lt(), ...jr() };
});
var rr = g((pI, It) => {
    "use strict";
    function Zc(e) {
        return typeof e > "u" || e === null;
    }
    function Zy(e) {
        return typeof e == "object" && e !== null;
    }
    function eE(e) {
        return Array.isArray(e) ? e : Zc(e) ? [] : [e];
    }
    function tE(e, t) {
        var r, n, i, o;
        if (t) for (o = Object.keys(t), r = 0, n = o.length; r < n; r += 1) (i = o[r]), (e[i] = t[i]);
        return e;
    }
    function rE(e, t) {
        var r = "",
            n;
        for (n = 0; n < t; n += 1) r += e;
        return r;
    }
    function nE(e) {
        return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
    }
    It.exports.isNothing = Zc;
    It.exports.isObject = Zy;
    It.exports.toArray = eE;
    It.exports.repeat = rE;
    It.exports.isNegativeZero = nE;
    It.exports.extend = tE;
});
var nr = g((mI, tf) => {
    "use strict";
    function ef(e, t) {
        var r = "",
            n = e.reason || "(unknown reason)";
        return e.mark
            ? (e.mark.name && (r += 'in "' + e.mark.name + '" '),
              (r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")"),
              !t && e.mark.snippet && (r += "\n\n" + e.mark.snippet),
              n + " " + r)
            : n;
    }
    function Vr(e, t) {
        Error.call(this),
            (this.name = "YAMLException"),
            (this.reason = e),
            (this.mark = t),
            (this.message = ef(this, !1)),
            Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : (this.stack = new Error().stack || "");
    }
    Vr.prototype = Object.create(Error.prototype);
    Vr.prototype.constructor = Vr;
    Vr.prototype.toString = function (t) {
        return this.name + ": " + ef(this, t);
    };
    tf.exports = Vr;
});
var nf = g((gI, rf) => {
    "use strict";
    var Yr = rr();
    function Wo(e, t, r, n, i) {
        var o = "",
            s = "",
            a = Math.floor(i / 2) - 1;
        return (
            n - t > a && ((o = " ... "), (t = n - a + o.length)),
            r - n > a && ((s = " ..."), (r = n + a - s.length)),
            { str: o + e.slice(t, r).replace(/\t/g, "\u2192") + s, pos: n - t + o.length }
        );
    }
    function Go(e, t) {
        return Yr.repeat(" ", t - e.length) + e;
    }
    function iE(e, t) {
        if (((t = Object.create(t || null)), !e.buffer)) return null;
        t.maxLength || (t.maxLength = 79),
            typeof t.indent != "number" && (t.indent = 1),
            typeof t.linesBefore != "number" && (t.linesBefore = 3),
            typeof t.linesAfter != "number" && (t.linesAfter = 2);
        for (var r = /\r?\n|\r|\0/g, n = [0], i = [], o, s = -1; (o = r.exec(e.buffer)); )
            i.push(o.index), n.push(o.index + o[0].length), e.position <= o.index && s < 0 && (s = n.length - 2);
        s < 0 && (s = n.length - 1);
        var a = "",
            l,
            d,
            c = Math.min(e.line + t.linesAfter, i.length).toString().length,
            f = t.maxLength - (t.indent + c + 3);
        for (l = 1; l <= t.linesBefore && !(s - l < 0); l++)
            (d = Wo(e.buffer, n[s - l], i[s - l], e.position - (n[s] - n[s - l]), f)),
                (a = Yr.repeat(" ", t.indent) + Go((e.line - l + 1).toString(), c) + " | " + d.str + "\n" + a);
        for (
            d = Wo(e.buffer, n[s], i[s], e.position, f),
                a += Yr.repeat(" ", t.indent) + Go((e.line + 1).toString(), c) + " | " + d.str + "\n",
                a += Yr.repeat("-", t.indent + c + 3 + d.pos) + "^\n",
                l = 1;
            l <= t.linesAfter && !(s + l >= i.length);
            l++
        )
            (d = Wo(e.buffer, n[s + l], i[s + l], e.position - (n[s] - n[s + l]), f)),
                (a += Yr.repeat(" ", t.indent) + Go((e.line + l + 1).toString(), c) + " | " + d.str + "\n");
        return a.replace(/\n$/, "");
    }
    rf.exports = iE;
});
var me = g((wI, sf) => {
    "use strict";
    var of = nr(),
        oE = [
            "kind",
            "multi",
            "resolve",
            "construct",
            "instanceOf",
            "predicate",
            "represent",
            "representName",
            "defaultStyle",
            "styleAliases"
        ],
        sE = ["scalar", "sequence", "mapping"];
    function aE(e) {
        var t = {};
        return (
            e !== null &&
                Object.keys(e).forEach(function (r) {
                    e[r].forEach(function (n) {
                        t[String(n)] = r;
                    });
                }),
            t
        );
    }
    function lE(e, t) {
        if (
            ((t = t || {}),
            Object.keys(t).forEach(function (r) {
                if (oE.indexOf(r) === -1)
                    throw new of('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
            }),
            (this.options = t),
            (this.tag = e),
            (this.kind = t.kind || null),
            (this.resolve =
                t.resolve ||
                function () {
                    return !0;
                }),
            (this.construct =
                t.construct ||
                function (r) {
                    return r;
                }),
            (this.instanceOf = t.instanceOf || null),
            (this.predicate = t.predicate || null),
            (this.represent = t.represent || null),
            (this.representName = t.representName || null),
            (this.defaultStyle = t.defaultStyle || null),
            (this.multi = t.multi || !1),
            (this.styleAliases = aE(t.styleAliases || null)),
            sE.indexOf(this.kind) === -1)
        )
            throw new of('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
    }
    sf.exports = lE;
});
var zo = g((yI, lf) => {
    "use strict";
    var zr = nr(),
        Vo = me();
    function af(e, t) {
        var r = [];
        return (
            e[t].forEach(function (n) {
                var i = r.length;
                r.forEach(function (o, s) {
                    o.tag === n.tag && o.kind === n.kind && o.multi === n.multi && (i = s);
                }),
                    (r[i] = n);
            }),
            r
        );
    }
    function uE() {
        var e = {
                scalar: {},
                sequence: {},
                mapping: {},
                fallback: {},
                multi: { scalar: [], sequence: [], mapping: [], fallback: [] }
            },
            t,
            r;
        function n(i) {
            i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : (e[i.kind][i.tag] = e.fallback[i.tag] = i);
        }
        for (t = 0, r = arguments.length; t < r; t += 1) arguments[t].forEach(n);
        return e;
    }
    function Yo(e) {
        return this.extend(e);
    }
    Yo.prototype.extend = function (t) {
        var r = [],
            n = [];
        if (t instanceof Vo) n.push(t);
        else if (Array.isArray(t)) n = n.concat(t);
        else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
            t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
        else
            throw new zr(
                "Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })"
            );
        r.forEach(function (o) {
            if (!(o instanceof Vo))
                throw new zr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
            if (o.loadKind && o.loadKind !== "scalar")
                throw new zr(
                    "There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported."
                );
            if (o.multi)
                throw new zr(
                    "There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit."
                );
        }),
            n.forEach(function (o) {
                if (!(o instanceof Vo))
                    throw new zr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
            });
        var i = Object.create(Yo.prototype);
        return (
            (i.implicit = (this.implicit || []).concat(r)),
            (i.explicit = (this.explicit || []).concat(n)),
            (i.compiledImplicit = af(i, "implicit")),
            (i.compiledExplicit = af(i, "explicit")),
            (i.compiledTypeMap = uE(i.compiledImplicit, i.compiledExplicit)),
            i
        );
    };
    lf.exports = Yo;
});
var Xo = g((EI, uf) => {
    "use strict";
    var cE = me();
    uf.exports = new cE("tag:yaml.org,2002:str", {
        kind: "scalar",
        construct: function (e) {
            return e !== null ? e : "";
        }
    });
});
var Jo = g((_I, cf) => {
    "use strict";
    var fE = me();
    cf.exports = new fE("tag:yaml.org,2002:seq", {
        kind: "sequence",
        construct: function (e) {
            return e !== null ? e : [];
        }
    });
});
var Ko = g((vI, ff) => {
    "use strict";
    var hE = me();
    ff.exports = new hE("tag:yaml.org,2002:map", {
        kind: "mapping",
        construct: function (e) {
            return e !== null ? e : {};
        }
    });
});
var Qo = g((AI, hf) => {
    "use strict";
    var dE = zo();
    hf.exports = new dE({ explicit: [Xo(), Jo(), Ko()] });
});
var Zo = g((SI, df) => {
    "use strict";
    var pE = me();
    function mE(e) {
        if (e === null) return !0;
        var t = e.length;
        return (t === 1 && e === "~") || (t === 4 && (e === "null" || e === "Null" || e === "NULL"));
    }
    function gE() {
        return null;
    }
    function wE(e) {
        return e === null;
    }
    df.exports = new pE("tag:yaml.org,2002:null", {
        kind: "scalar",
        resolve: mE,
        construct: gE,
        predicate: wE,
        represent: {
            canonical: function () {
                return "~";
            },
            lowercase: function () {
                return "null";
            },
            uppercase: function () {
                return "NULL";
            },
            camelcase: function () {
                return "Null";
            },
            empty: function () {
                return "";
            }
        },
        defaultStyle: "lowercase"
    });
});
var es = g((CI, pf) => {
    "use strict";
    var yE = me();
    function EE(e) {
        if (e === null) return !1;
        var t = e.length;
        return (
            (t === 4 && (e === "true" || e === "True" || e === "TRUE")) ||
            (t === 5 && (e === "false" || e === "False" || e === "FALSE"))
        );
    }
    function _E(e) {
        return e === "true" || e === "True" || e === "TRUE";
    }
    function vE(e) {
        return Object.prototype.toString.call(e) === "[object Boolean]";
    }
    pf.exports = new yE("tag:yaml.org,2002:bool", {
        kind: "scalar",
        resolve: EE,
        construct: _E,
        predicate: vE,
        represent: {
            lowercase: function (e) {
                return e ? "true" : "false";
            },
            uppercase: function (e) {
                return e ? "TRUE" : "FALSE";
            },
            camelcase: function (e) {
                return e ? "True" : "False";
            }
        },
        defaultStyle: "lowercase"
    });
});
var ts = g((TI, mf) => {
    "use strict";
    var AE = rr(),
        SE = me();
    function CE(e) {
        return (48 <= e && e <= 57) || (65 <= e && e <= 70) || (97 <= e && e <= 102);
    }
    function TE(e) {
        return 48 <= e && e <= 55;
    }
    function bE(e) {
        return 48 <= e && e <= 57;
    }
    function OE(e) {
        if (e === null) return !1;
        var t = e.length,
            r = 0,
            n = !1,
            i;
        if (!t) return !1;
        if (((i = e[r]), (i === "-" || i === "+") && (i = e[++r]), i === "0")) {
            if (r + 1 === t) return !0;
            if (((i = e[++r]), i === "b")) {
                for (r++; r < t; r++)
                    if (((i = e[r]), i !== "_")) {
                        if (i !== "0" && i !== "1") return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
            if (i === "x") {
                for (r++; r < t; r++)
                    if (((i = e[r]), i !== "_")) {
                        if (!CE(e.charCodeAt(r))) return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
            if (i === "o") {
                for (r++; r < t; r++)
                    if (((i = e[r]), i !== "_")) {
                        if (!TE(e.charCodeAt(r))) return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
        }
        if (i === "_") return !1;
        for (; r < t; r++)
            if (((i = e[r]), i !== "_")) {
                if (!bE(e.charCodeAt(r))) return !1;
                n = !0;
            }
        return !(!n || i === "_");
    }
    function xE(e) {
        var t = e,
            r = 1,
            n;
        if (
            (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")),
            (n = t[0]),
            (n === "-" || n === "+") && (n === "-" && (r = -1), (t = t.slice(1)), (n = t[0])),
            t === "0")
        )
            return 0;
        if (n === "0") {
            if (t[1] === "b") return r * parseInt(t.slice(2), 2);
            if (t[1] === "x") return r * parseInt(t.slice(2), 16);
            if (t[1] === "o") return r * parseInt(t.slice(2), 8);
        }
        return r * parseInt(t, 10);
    }
    function IE(e) {
        return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !AE.isNegativeZero(e);
    }
    mf.exports = new SE("tag:yaml.org,2002:int", {
        kind: "scalar",
        resolve: OE,
        construct: xE,
        predicate: IE,
        represent: {
            binary: function (e) {
                return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
            },
            octal: function (e) {
                return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
            },
            decimal: function (e) {
                return e.toString(10);
            },
            hexadecimal: function (e) {
                return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
            }
        },
        defaultStyle: "decimal",
        styleAliases: { binary: [2, "bin"], octal: [8, "oct"], decimal: [10, "dec"], hexadecimal: [16, "hex"] }
    });
});
var rs = g((bI, wf) => {
    "use strict";
    var gf = rr(),
        NE = me(),
        RE = new RegExp(
            "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
        );
    function PE(e) {
        return !(e === null || !RE.test(e) || e[e.length - 1] === "_");
    }
    function DE(e) {
        var t, r;
        return (
            (t = e.replace(/_/g, "").toLowerCase()),
            (r = t[0] === "-" ? -1 : 1),
            "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)),
            t === ".inf"
                ? r === 1
                    ? Number.POSITIVE_INFINITY
                    : Number.NEGATIVE_INFINITY
                : t === ".nan"
                ? NaN
                : r * parseFloat(t, 10)
        );
    }
    var FE = /^[-+]?[0-9]+e/;
    function qE(e, t) {
        var r;
        if (isNaN(e))
            switch (t) {
                case "lowercase":
                    return ".nan";
                case "uppercase":
                    return ".NAN";
                case "camelcase":
                    return ".NaN";
            }
        else if (Number.POSITIVE_INFINITY === e)
            switch (t) {
                case "lowercase":
                    return ".inf";
                case "uppercase":
                    return ".INF";
                case "camelcase":
                    return ".Inf";
            }
        else if (Number.NEGATIVE_INFINITY === e)
            switch (t) {
                case "lowercase":
                    return "-.inf";
                case "uppercase":
                    return "-.INF";
                case "camelcase":
                    return "-.Inf";
            }
        else if (gf.isNegativeZero(e)) return "-0.0";
        return (r = e.toString(10)), FE.test(r) ? r.replace("e", ".e") : r;
    }
    function LE(e) {
        return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || gf.isNegativeZero(e));
    }
    wf.exports = new NE("tag:yaml.org,2002:float", {
        kind: "scalar",
        resolve: PE,
        construct: DE,
        predicate: LE,
        represent: qE,
        defaultStyle: "lowercase"
    });
});
var ns = g((OI, yf) => {
    "use strict";
    yf.exports = Qo().extend({ implicit: [Zo(), es(), ts(), rs()] });
});
var is = g((xI, Ef) => {
    "use strict";
    Ef.exports = ns();
});
var os = g((II, Af) => {
    "use strict";
    var UE = me(),
        _f = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),
        vf = new RegExp(
            "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
        );
    function $E(e) {
        return e === null ? !1 : _f.exec(e) !== null || vf.exec(e) !== null;
    }
    function kE(e) {
        var t,
            r,
            n,
            i,
            o,
            s,
            a,
            l = 0,
            d = null,
            c,
            f,
            m;
        if (((t = _f.exec(e)), t === null && (t = vf.exec(e)), t === null)) throw new Error("Date resolve error");
        if (((r = +t[1]), (n = +t[2] - 1), (i = +t[3]), !t[4])) return new Date(Date.UTC(r, n, i));
        if (((o = +t[4]), (s = +t[5]), (a = +t[6]), t[7])) {
            for (l = t[7].slice(0, 3); l.length < 3; ) l += "0";
            l = +l;
        }
        return (
            t[9] && ((c = +t[10]), (f = +(t[11] || 0)), (d = (c * 60 + f) * 6e4), t[9] === "-" && (d = -d)),
            (m = new Date(Date.UTC(r, n, i, o, s, a, l))),
            d && m.setTime(m.getTime() - d),
            m
        );
    }
    function ME(e) {
        return e.toISOString();
    }
    Af.exports = new UE("tag:yaml.org,2002:timestamp", {
        kind: "scalar",
        resolve: $E,
        construct: kE,
        instanceOf: Date,
        represent: ME
    });
});
var ss = g((NI, Sf) => {
    "use strict";
    var BE = me();
    function HE(e) {
        return e === "<<" || e === null;
    }
    Sf.exports = new BE("tag:yaml.org,2002:merge", { kind: "scalar", resolve: HE });
});
var ls = g((RI, Cf) => {
    "use strict";
    var jE = me(),
        as = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function WE(e) {
        if (e === null) return !1;
        var t,
            r,
            n = 0,
            i = e.length,
            o = as;
        for (r = 0; r < i; r++)
            if (((t = o.indexOf(e.charAt(r))), !(t > 64))) {
                if (t < 0) return !1;
                n += 6;
            }
        return n % 8 === 0;
    }
    function GE(e) {
        var t,
            r,
            n = e.replace(/[\r\n=]/g, ""),
            i = n.length,
            o = as,
            s = 0,
            a = [];
        for (t = 0; t < i; t++)
            t % 4 === 0 && t && (a.push((s >> 16) & 255), a.push((s >> 8) & 255), a.push(s & 255)),
                (s = (s << 6) | o.indexOf(n.charAt(t)));
        return (
            (r = (i % 4) * 6),
            r === 0
                ? (a.push((s >> 16) & 255), a.push((s >> 8) & 255), a.push(s & 255))
                : r === 18
                ? (a.push((s >> 10) & 255), a.push((s >> 2) & 255))
                : r === 12 && a.push((s >> 4) & 255),
            new Uint8Array(a)
        );
    }
    function VE(e) {
        var t = "",
            r = 0,
            n,
            i,
            o = e.length,
            s = as;
        for (n = 0; n < o; n++)
            n % 3 === 0 && n && ((t += s[(r >> 18) & 63]), (t += s[(r >> 12) & 63]), (t += s[(r >> 6) & 63]), (t += s[r & 63])),
                (r = (r << 8) + e[n]);
        return (
            (i = o % 3),
            i === 0
                ? ((t += s[(r >> 18) & 63]), (t += s[(r >> 12) & 63]), (t += s[(r >> 6) & 63]), (t += s[r & 63]))
                : i === 2
                ? ((t += s[(r >> 10) & 63]), (t += s[(r >> 4) & 63]), (t += s[(r << 2) & 63]), (t += s[64]))
                : i === 1 && ((t += s[(r >> 2) & 63]), (t += s[(r << 4) & 63]), (t += s[64]), (t += s[64])),
            t
        );
    }
    function YE(e) {
        return Object.prototype.toString.call(e) === "[object Uint8Array]";
    }
    Cf.exports = new jE("tag:yaml.org,2002:binary", { kind: "scalar", resolve: WE, construct: GE, predicate: YE, represent: VE });
});
var us = g((PI, Tf) => {
    "use strict";
    var zE = me(),
        XE = Object.prototype.hasOwnProperty,
        JE = Object.prototype.toString;
    function KE(e) {
        if (e === null) return !0;
        var t = [],
            r,
            n,
            i,
            o,
            s,
            a = e;
        for (r = 0, n = a.length; r < n; r += 1) {
            if (((i = a[r]), (s = !1), JE.call(i) !== "[object Object]")) return !1;
            for (o in i)
                if (XE.call(i, o))
                    if (!s) s = !0;
                    else return !1;
            if (!s) return !1;
            if (t.indexOf(o) === -1) t.push(o);
            else return !1;
        }
        return !0;
    }
    function QE(e) {
        return e !== null ? e : [];
    }
    Tf.exports = new zE("tag:yaml.org,2002:omap", { kind: "sequence", resolve: KE, construct: QE });
});
var cs = g((DI, bf) => {
    "use strict";
    var ZE = me(),
        e_ = Object.prototype.toString;
    function t_(e) {
        if (e === null) return !0;
        var t,
            r,
            n,
            i,
            o,
            s = e;
        for (o = new Array(s.length), t = 0, r = s.length; t < r; t += 1) {
            if (((n = s[t]), e_.call(n) !== "[object Object]" || ((i = Object.keys(n)), i.length !== 1))) return !1;
            o[t] = [i[0], n[i[0]]];
        }
        return !0;
    }
    function r_(e) {
        if (e === null) return [];
        var t,
            r,
            n,
            i,
            o,
            s = e;
        for (o = new Array(s.length), t = 0, r = s.length; t < r; t += 1)
            (n = s[t]), (i = Object.keys(n)), (o[t] = [i[0], n[i[0]]]);
        return o;
    }
    bf.exports = new ZE("tag:yaml.org,2002:pairs", { kind: "sequence", resolve: t_, construct: r_ });
});
var fs = g((FI, Of) => {
    "use strict";
    var n_ = me(),
        i_ = Object.prototype.hasOwnProperty;
    function o_(e) {
        if (e === null) return !0;
        var t,
            r = e;
        for (t in r) if (i_.call(r, t) && r[t] !== null) return !1;
        return !0;
    }
    function s_(e) {
        return e !== null ? e : {};
    }
    Of.exports = new n_("tag:yaml.org,2002:set", { kind: "mapping", resolve: o_, construct: s_ });
});
var ti = g((qI, xf) => {
    "use strict";
    xf.exports = is().extend({ implicit: [os(), ss()], explicit: [ls(), us(), cs(), fs()] });
});
var Wf = g((LI, ms) => {
    "use strict";
    var Rt = rr(),
        qf = nr(),
        a_ = nf(),
        l_ = ti(),
        dt = Object.prototype.hasOwnProperty,
        ri = 1,
        Lf = 2,
        Uf = 3,
        ni = 4,
        hs = 1,
        u_ = 2,
        If = 3,
        c_ =
            /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
        f_ = /[\x85\u2028\u2029]/,
        h_ = /[,\[\]\{\}]/,
        $f = /^(?:!|!!|![a-z\-]+!)$/i,
        kf = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function Nf(e) {
        return Object.prototype.toString.call(e);
    }
    function Ve(e) {
        return e === 10 || e === 13;
    }
    function Pt(e) {
        return e === 9 || e === 32;
    }
    function Re(e) {
        return e === 9 || e === 32 || e === 10 || e === 13;
    }
    function ir(e) {
        return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
    }
    function d_(e) {
        var t;
        return 48 <= e && e <= 57 ? e - 48 : ((t = e | 32), 97 <= t && t <= 102 ? t - 97 + 10 : -1);
    }
    function p_(e) {
        return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
    }
    function m_(e) {
        return 48 <= e && e <= 57 ? e - 48 : -1;
    }
    function Rf(e) {
        return e === 48
            ? "\0"
            : e === 97
            ? "\x07"
            : e === 98
            ? "\b"
            : e === 116 || e === 9
            ? "	"
            : e === 110
            ? "\n"
            : e === 118
            ? "\v"
            : e === 102
            ? "\f"
            : e === 114
            ? "\r"
            : e === 101
            ? "\x1B"
            : e === 32
            ? " "
            : e === 34
            ? '"'
            : e === 47
            ? "/"
            : e === 92
            ? "\\"
            : e === 78
            ? "\x85"
            : e === 95
            ? "\xA0"
            : e === 76
            ? "\u2028"
            : e === 80
            ? "\u2029"
            : "";
    }
    function g_(e) {
        return e <= 65535
            ? String.fromCharCode(e)
            : String.fromCharCode(((e - 65536) >> 10) + 55296, ((e - 65536) & 1023) + 56320);
    }
    var Mf = new Array(256),
        Bf = new Array(256);
    for (Nt = 0; Nt < 256; Nt++) (Mf[Nt] = Rf(Nt) ? 1 : 0), (Bf[Nt] = Rf(Nt));
    var Nt;
    function w_(e, t) {
        (this.input = e),
            (this.filename = t.filename || null),
            (this.schema = t.schema || l_),
            (this.onWarning = t.onWarning || null),
            (this.legacy = t.legacy || !1),
            (this.json = t.json || !1),
            (this.listener = t.listener || null),
            (this.implicitTypes = this.schema.compiledImplicit),
            (this.typeMap = this.schema.compiledTypeMap),
            (this.length = e.length),
            (this.position = 0),
            (this.line = 0),
            (this.lineStart = 0),
            (this.lineIndent = 0),
            (this.firstTabInLine = -1),
            (this.documents = []);
    }
    function Hf(e, t) {
        var r = {
            name: e.filename,
            buffer: e.input.slice(0, -1),
            position: e.position,
            line: e.line,
            column: e.position - e.lineStart
        };
        return (r.snippet = a_(r)), new qf(t, r);
    }
    function I(e, t) {
        throw Hf(e, t);
    }
    function ii(e, t) {
        e.onWarning && e.onWarning.call(null, Hf(e, t));
    }
    var Pf = {
        YAML: function (t, r, n) {
            var i, o, s;
            t.version !== null && I(t, "duplication of %YAML directive"),
                n.length !== 1 && I(t, "YAML directive accepts exactly one argument"),
                (i = /^([0-9]+)\.([0-9]+)$/.exec(n[0])),
                i === null && I(t, "ill-formed argument of the YAML directive"),
                (o = parseInt(i[1], 10)),
                (s = parseInt(i[2], 10)),
                o !== 1 && I(t, "unacceptable YAML version of the document"),
                (t.version = n[0]),
                (t.checkLineBreaks = s < 2),
                s !== 1 && s !== 2 && ii(t, "unsupported YAML version of the document");
        },
        TAG: function (t, r, n) {
            var i, o;
            n.length !== 2 && I(t, "TAG directive accepts exactly two arguments"),
                (i = n[0]),
                (o = n[1]),
                $f.test(i) || I(t, "ill-formed tag handle (first argument) of the TAG directive"),
                dt.call(t.tagMap, i) && I(t, 'there is a previously declared suffix for "' + i + '" tag handle'),
                kf.test(o) || I(t, "ill-formed tag prefix (second argument) of the TAG directive");
            try {
                o = decodeURIComponent(o);
            } catch {
                I(t, "tag prefix is malformed: " + o);
            }
            t.tagMap[i] = o;
        }
    };
    function ht(e, t, r, n) {
        var i, o, s, a;
        if (t < r) {
            if (((a = e.input.slice(t, r)), n))
                for (i = 0, o = a.length; i < o; i += 1)
                    (s = a.charCodeAt(i)), s === 9 || (32 <= s && s <= 1114111) || I(e, "expected valid JSON character");
            else c_.test(a) && I(e, "the stream contains non-printable characters");
            e.result += a;
        }
    }
    function Df(e, t, r, n) {
        var i, o, s, a;
        for (
            Rt.isObject(r) || I(e, "cannot merge mappings; the provided source object is unacceptable"),
                i = Object.keys(r),
                s = 0,
                a = i.length;
            s < a;
            s += 1
        )
            (o = i[s]), dt.call(t, o) || ((t[o] = r[o]), (n[o] = !0));
    }
    function or(e, t, r, n, i, o, s, a, l) {
        var d, c;
        if (Array.isArray(i))
            for (i = Array.prototype.slice.call(i), d = 0, c = i.length; d < c; d += 1)
                Array.isArray(i[d]) && I(e, "nested arrays are not supported inside keys"),
                    typeof i == "object" && Nf(i[d]) === "[object Object]" && (i[d] = "[object Object]");
        if (
            (typeof i == "object" && Nf(i) === "[object Object]" && (i = "[object Object]"),
            (i = String(i)),
            t === null && (t = {}),
            n === "tag:yaml.org,2002:merge")
        )
            if (Array.isArray(o)) for (d = 0, c = o.length; d < c; d += 1) Df(e, t, o[d], r);
            else Df(e, t, o, r);
        else
            !e.json &&
                !dt.call(r, i) &&
                dt.call(t, i) &&
                ((e.line = s || e.line),
                (e.lineStart = a || e.lineStart),
                (e.position = l || e.position),
                I(e, "duplicated mapping key")),
                i === "__proto__"
                    ? Object.defineProperty(t, i, { configurable: !0, enumerable: !0, writable: !0, value: o })
                    : (t[i] = o),
                delete r[i];
        return t;
    }
    function ds(e) {
        var t;
        (t = e.input.charCodeAt(e.position)),
            t === 10
                ? e.position++
                : t === 13
                ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++)
                : I(e, "a line break is expected"),
            (e.line += 1),
            (e.lineStart = e.position),
            (e.firstTabInLine = -1);
    }
    function ie(e, t, r) {
        for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
            for (; Pt(i); )
                i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), (i = e.input.charCodeAt(++e.position));
            if (t && i === 35)
                do i = e.input.charCodeAt(++e.position);
                while (i !== 10 && i !== 13 && i !== 0);
            if (Ve(i))
                for (ds(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
                    e.lineIndent++, (i = e.input.charCodeAt(++e.position));
            else break;
        }
        return r !== -1 && n !== 0 && e.lineIndent < r && ii(e, "deficient indentation"), n;
    }
    function oi(e) {
        var t = e.position,
            r;
        return (
            (r = e.input.charCodeAt(t)),
            !!(
                (r === 45 || r === 46) &&
                r === e.input.charCodeAt(t + 1) &&
                r === e.input.charCodeAt(t + 2) &&
                ((t += 3), (r = e.input.charCodeAt(t)), r === 0 || Re(r))
            )
        );
    }
    function ps(e, t) {
        t === 1 ? (e.result += " ") : t > 1 && (e.result += Rt.repeat("\n", t - 1));
    }
    function y_(e, t, r) {
        var n,
            i,
            o,
            s,
            a,
            l,
            d,
            c,
            f = e.kind,
            m = e.result,
            p;
        if (
            ((p = e.input.charCodeAt(e.position)),
            Re(p) ||
                ir(p) ||
                p === 35 ||
                p === 38 ||
                p === 42 ||
                p === 33 ||
                p === 124 ||
                p === 62 ||
                p === 39 ||
                p === 34 ||
                p === 37 ||
                p === 64 ||
                p === 96 ||
                ((p === 63 || p === 45) && ((i = e.input.charCodeAt(e.position + 1)), Re(i) || (r && ir(i)))))
        )
            return !1;
        for (e.kind = "scalar", e.result = "", o = s = e.position, a = !1; p !== 0; ) {
            if (p === 58) {
                if (((i = e.input.charCodeAt(e.position + 1)), Re(i) || (r && ir(i)))) break;
            } else if (p === 35) {
                if (((n = e.input.charCodeAt(e.position - 1)), Re(n))) break;
            } else {
                if ((e.position === e.lineStart && oi(e)) || (r && ir(p))) break;
                if (Ve(p))
                    if (((l = e.line), (d = e.lineStart), (c = e.lineIndent), ie(e, !1, -1), e.lineIndent >= t)) {
                        (a = !0), (p = e.input.charCodeAt(e.position));
                        continue;
                    } else {
                        (e.position = s), (e.line = l), (e.lineStart = d), (e.lineIndent = c);
                        break;
                    }
            }
            a && (ht(e, o, s, !1), ps(e, e.line - l), (o = s = e.position), (a = !1)),
                Pt(p) || (s = e.position + 1),
                (p = e.input.charCodeAt(++e.position));
        }
        return ht(e, o, s, !1), e.result ? !0 : ((e.kind = f), (e.result = m), !1);
    }
    function E_(e, t) {
        var r, n, i;
        if (((r = e.input.charCodeAt(e.position)), r !== 39)) return !1;
        for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
            if (r === 39)
                if ((ht(e, n, e.position, !0), (r = e.input.charCodeAt(++e.position)), r === 39))
                    (n = e.position), e.position++, (i = e.position);
                else return !0;
            else
                Ve(r)
                    ? (ht(e, n, i, !0), ps(e, ie(e, !1, t)), (n = i = e.position))
                    : e.position === e.lineStart && oi(e)
                    ? I(e, "unexpected end of the document within a single quoted scalar")
                    : (e.position++, (i = e.position));
        I(e, "unexpected end of the stream within a single quoted scalar");
    }
    function __(e, t) {
        var r, n, i, o, s, a;
        if (((a = e.input.charCodeAt(e.position)), a !== 34)) return !1;
        for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (a = e.input.charCodeAt(e.position)) !== 0; ) {
            if (a === 34) return ht(e, r, e.position, !0), e.position++, !0;
            if (a === 92) {
                if ((ht(e, r, e.position, !0), (a = e.input.charCodeAt(++e.position)), Ve(a))) ie(e, !1, t);
                else if (a < 256 && Mf[a]) (e.result += Bf[a]), e.position++;
                else if ((s = p_(a)) > 0) {
                    for (i = s, o = 0; i > 0; i--)
                        (a = e.input.charCodeAt(++e.position)),
                            (s = d_(a)) >= 0 ? (o = (o << 4) + s) : I(e, "expected hexadecimal character");
                    (e.result += g_(o)), e.position++;
                } else I(e, "unknown escape sequence");
                r = n = e.position;
            } else
                Ve(a)
                    ? (ht(e, r, n, !0), ps(e, ie(e, !1, t)), (r = n = e.position))
                    : e.position === e.lineStart && oi(e)
                    ? I(e, "unexpected end of the document within a double quoted scalar")
                    : (e.position++, (n = e.position));
        }
        I(e, "unexpected end of the stream within a double quoted scalar");
    }
    function v_(e, t) {
        var r = !0,
            n,
            i,
            o,
            s = e.tag,
            a,
            l = e.anchor,
            d,
            c,
            f,
            m,
            p,
            E = Object.create(null),
            _,
            A,
            T,
            C;
        if (((C = e.input.charCodeAt(e.position)), C === 91)) (c = 93), (p = !1), (a = []);
        else if (C === 123) (c = 125), (p = !0), (a = {});
        else return !1;
        for (e.anchor !== null && (e.anchorMap[e.anchor] = a), C = e.input.charCodeAt(++e.position); C !== 0; ) {
            if ((ie(e, !0, t), (C = e.input.charCodeAt(e.position)), C === c))
                return e.position++, (e.tag = s), (e.anchor = l), (e.kind = p ? "mapping" : "sequence"), (e.result = a), !0;
            r
                ? C === 44 && I(e, "expected the node content, but found ','")
                : I(e, "missed comma between flow collection entries"),
                (A = _ = T = null),
                (f = m = !1),
                C === 63 && ((d = e.input.charCodeAt(e.position + 1)), Re(d) && ((f = m = !0), e.position++, ie(e, !0, t))),
                (n = e.line),
                (i = e.lineStart),
                (o = e.position),
                sr(e, t, ri, !1, !0),
                (A = e.tag),
                (_ = e.result),
                ie(e, !0, t),
                (C = e.input.charCodeAt(e.position)),
                (m || e.line === n) &&
                    C === 58 &&
                    ((f = !0), (C = e.input.charCodeAt(++e.position)), ie(e, !0, t), sr(e, t, ri, !1, !0), (T = e.result)),
                p ? or(e, a, E, A, _, T, n, i, o) : f ? a.push(or(e, null, E, A, _, T, n, i, o)) : a.push(_),
                ie(e, !0, t),
                (C = e.input.charCodeAt(e.position)),
                C === 44 ? ((r = !0), (C = e.input.charCodeAt(++e.position))) : (r = !1);
        }
        I(e, "unexpected end of the stream within a flow collection");
    }
    function A_(e, t) {
        var r,
            n,
            i = hs,
            o = !1,
            s = !1,
            a = t,
            l = 0,
            d = !1,
            c,
            f;
        if (((f = e.input.charCodeAt(e.position)), f === 124)) n = !1;
        else if (f === 62) n = !0;
        else return !1;
        for (e.kind = "scalar", e.result = ""; f !== 0; )
            if (((f = e.input.charCodeAt(++e.position)), f === 43 || f === 45))
                hs === i ? (i = f === 43 ? If : u_) : I(e, "repeat of a chomping mode identifier");
            else if ((c = m_(f)) >= 0)
                c === 0
                    ? I(e, "bad explicit indentation width of a block scalar; it cannot be less than one")
                    : s
                    ? I(e, "repeat of an indentation width identifier")
                    : ((a = t + c - 1), (s = !0));
            else break;
        if (Pt(f)) {
            do f = e.input.charCodeAt(++e.position);
            while (Pt(f));
            if (f === 35)
                do f = e.input.charCodeAt(++e.position);
                while (!Ve(f) && f !== 0);
        }
        for (; f !== 0; ) {
            for (ds(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!s || e.lineIndent < a) && f === 32; )
                e.lineIndent++, (f = e.input.charCodeAt(++e.position));
            if ((!s && e.lineIndent > a && (a = e.lineIndent), Ve(f))) {
                l++;
                continue;
            }
            if (e.lineIndent < a) {
                i === If ? (e.result += Rt.repeat("\n", o ? 1 + l : l)) : i === hs && o && (e.result += "\n");
                break;
            }
            for (
                n
                    ? Pt(f)
                        ? ((d = !0), (e.result += Rt.repeat("\n", o ? 1 + l : l)))
                        : d
                        ? ((d = !1), (e.result += Rt.repeat("\n", l + 1)))
                        : l === 0
                        ? o && (e.result += " ")
                        : (e.result += Rt.repeat("\n", l))
                    : (e.result += Rt.repeat("\n", o ? 1 + l : l)),
                    o = !0,
                    s = !0,
                    l = 0,
                    r = e.position;
                !Ve(f) && f !== 0;

            )
                f = e.input.charCodeAt(++e.position);
            ht(e, r, e.position, !1);
        }
        return !0;
    }
    function Ff(e, t) {
        var r,
            n = e.tag,
            i = e.anchor,
            o = [],
            s,
            a = !1,
            l;
        if (e.firstTabInLine !== -1) return !1;
        for (
            e.anchor !== null && (e.anchorMap[e.anchor] = o), l = e.input.charCodeAt(e.position);
            l !== 0 &&
            (e.firstTabInLine !== -1 && ((e.position = e.firstTabInLine), I(e, "tab characters must not be used in indentation")),
            !(l !== 45 || ((s = e.input.charCodeAt(e.position + 1)), !Re(s))));

        ) {
            if (((a = !0), e.position++, ie(e, !0, -1) && e.lineIndent <= t)) {
                o.push(null), (l = e.input.charCodeAt(e.position));
                continue;
            }
            if (
                ((r = e.line),
                sr(e, t, Uf, !1, !0),
                o.push(e.result),
                ie(e, !0, -1),
                (l = e.input.charCodeAt(e.position)),
                (e.line === r || e.lineIndent > t) && l !== 0)
            )
                I(e, "bad indentation of a sequence entry");
            else if (e.lineIndent < t) break;
        }
        return a ? ((e.tag = n), (e.anchor = i), (e.kind = "sequence"), (e.result = o), !0) : !1;
    }
    function S_(e, t, r) {
        var n,
            i,
            o,
            s,
            a,
            l,
            d = e.tag,
            c = e.anchor,
            f = {},
            m = Object.create(null),
            p = null,
            E = null,
            _ = null,
            A = !1,
            T = !1,
            C;
        if (e.firstTabInLine !== -1) return !1;
        for (e.anchor !== null && (e.anchorMap[e.anchor] = f), C = e.input.charCodeAt(e.position); C !== 0; ) {
            if (
                (!A &&
                    e.firstTabInLine !== -1 &&
                    ((e.position = e.firstTabInLine), I(e, "tab characters must not be used in indentation")),
                (n = e.input.charCodeAt(e.position + 1)),
                (o = e.line),
                (C === 63 || C === 58) && Re(n))
            )
                C === 63
                    ? (A && (or(e, f, m, p, E, null, s, a, l), (p = E = _ = null)), (T = !0), (A = !0), (i = !0))
                    : A
                    ? ((A = !1), (i = !0))
                    : I(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),
                    (e.position += 1),
                    (C = n);
            else {
                if (((s = e.line), (a = e.lineStart), (l = e.position), !sr(e, r, Lf, !1, !0))) break;
                if (e.line === o) {
                    for (C = e.input.charCodeAt(e.position); Pt(C); ) C = e.input.charCodeAt(++e.position);
                    if (C === 58)
                        (C = e.input.charCodeAt(++e.position)),
                            Re(C) ||
                                I(e, "a whitespace character is expected after the key-value separator within a block mapping"),
                            A && (or(e, f, m, p, E, null, s, a, l), (p = E = _ = null)),
                            (T = !0),
                            (A = !1),
                            (i = !1),
                            (p = e.tag),
                            (E = e.result);
                    else if (T) I(e, "can not read an implicit mapping pair; a colon is missed");
                    else return (e.tag = d), (e.anchor = c), !0;
                } else if (T) I(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
                else return (e.tag = d), (e.anchor = c), !0;
            }
            if (
                ((e.line === o || e.lineIndent > t) &&
                    (A && ((s = e.line), (a = e.lineStart), (l = e.position)),
                    sr(e, t, ni, !0, i) && (A ? (E = e.result) : (_ = e.result)),
                    A || (or(e, f, m, p, E, _, s, a, l), (p = E = _ = null)),
                    ie(e, !0, -1),
                    (C = e.input.charCodeAt(e.position))),
                (e.line === o || e.lineIndent > t) && C !== 0)
            )
                I(e, "bad indentation of a mapping entry");
            else if (e.lineIndent < t) break;
        }
        return A && or(e, f, m, p, E, null, s, a, l), T && ((e.tag = d), (e.anchor = c), (e.kind = "mapping"), (e.result = f)), T;
    }
    function C_(e) {
        var t,
            r = !1,
            n = !1,
            i,
            o,
            s;
        if (((s = e.input.charCodeAt(e.position)), s !== 33)) return !1;
        if (
            (e.tag !== null && I(e, "duplication of a tag property"),
            (s = e.input.charCodeAt(++e.position)),
            s === 60
                ? ((r = !0), (s = e.input.charCodeAt(++e.position)))
                : s === 33
                ? ((n = !0), (i = "!!"), (s = e.input.charCodeAt(++e.position)))
                : (i = "!"),
            (t = e.position),
            r)
        ) {
            do s = e.input.charCodeAt(++e.position);
            while (s !== 0 && s !== 62);
            e.position < e.length
                ? ((o = e.input.slice(t, e.position)), (s = e.input.charCodeAt(++e.position)))
                : I(e, "unexpected end of the stream within a verbatim tag");
        } else {
            for (; s !== 0 && !Re(s); )
                s === 33 &&
                    (n
                        ? I(e, "tag suffix cannot contain exclamation marks")
                        : ((i = e.input.slice(t - 1, e.position + 1)),
                          $f.test(i) || I(e, "named tag handle cannot contain such characters"),
                          (n = !0),
                          (t = e.position + 1))),
                    (s = e.input.charCodeAt(++e.position));
            (o = e.input.slice(t, e.position)), h_.test(o) && I(e, "tag suffix cannot contain flow indicator characters");
        }
        o && !kf.test(o) && I(e, "tag name cannot contain such characters: " + o);
        try {
            o = decodeURIComponent(o);
        } catch {
            I(e, "tag name is malformed: " + o);
        }
        return (
            r
                ? (e.tag = o)
                : dt.call(e.tagMap, i)
                ? (e.tag = e.tagMap[i] + o)
                : i === "!"
                ? (e.tag = "!" + o)
                : i === "!!"
                ? (e.tag = "tag:yaml.org,2002:" + o)
                : I(e, 'undeclared tag handle "' + i + '"'),
            !0
        );
    }
    function T_(e) {
        var t, r;
        if (((r = e.input.charCodeAt(e.position)), r !== 38)) return !1;
        for (
            e.anchor !== null && I(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position;
            r !== 0 && !Re(r) && !ir(r);

        )
            r = e.input.charCodeAt(++e.position);
        return (
            e.position === t && I(e, "name of an anchor node must contain at least one character"),
            (e.anchor = e.input.slice(t, e.position)),
            !0
        );
    }
    function b_(e) {
        var t, r, n;
        if (((n = e.input.charCodeAt(e.position)), n !== 42)) return !1;
        for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !Re(n) && !ir(n); )
            n = e.input.charCodeAt(++e.position);
        return (
            e.position === t && I(e, "name of an alias node must contain at least one character"),
            (r = e.input.slice(t, e.position)),
            dt.call(e.anchorMap, r) || I(e, 'unidentified alias "' + r + '"'),
            (e.result = e.anchorMap[r]),
            ie(e, !0, -1),
            !0
        );
    }
    function sr(e, t, r, n, i) {
        var o,
            s,
            a,
            l = 1,
            d = !1,
            c = !1,
            f,
            m,
            p,
            E,
            _,
            A;
        if (
            (e.listener !== null && e.listener("open", e),
            (e.tag = null),
            (e.anchor = null),
            (e.kind = null),
            (e.result = null),
            (o = s = a = ni === r || Uf === r),
            n &&
                ie(e, !0, -1) &&
                ((d = !0), e.lineIndent > t ? (l = 1) : e.lineIndent === t ? (l = 0) : e.lineIndent < t && (l = -1)),
            l === 1)
        )
            for (; C_(e) || T_(e); )
                ie(e, !0, -1)
                    ? ((d = !0),
                      (a = o),
                      e.lineIndent > t ? (l = 1) : e.lineIndent === t ? (l = 0) : e.lineIndent < t && (l = -1))
                    : (a = !1);
        if (
            (a && (a = d || i),
            (l === 1 || ni === r) &&
                (ri === r || Lf === r ? (_ = t) : (_ = t + 1),
                (A = e.position - e.lineStart),
                l === 1
                    ? (a && (Ff(e, A) || S_(e, A, _))) || v_(e, _)
                        ? (c = !0)
                        : ((s && A_(e, _)) || E_(e, _) || __(e, _)
                              ? (c = !0)
                              : b_(e)
                              ? ((c = !0),
                                (e.tag !== null || e.anchor !== null) && I(e, "alias node should not have any properties"))
                              : y_(e, _, ri === r) && ((c = !0), e.tag === null && (e.tag = "?")),
                          e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
                    : l === 0 && (c = a && Ff(e, A))),
            e.tag === null)
        )
            e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        else if (e.tag === "?") {
            for (
                e.result !== null &&
                    e.kind !== "scalar" &&
                    I(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'),
                    f = 0,
                    m = e.implicitTypes.length;
                f < m;
                f += 1
            )
                if (((E = e.implicitTypes[f]), E.resolve(e.result))) {
                    (e.result = E.construct(e.result)), (e.tag = E.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
                    break;
                }
        } else if (e.tag !== "!") {
            if (dt.call(e.typeMap[e.kind || "fallback"], e.tag)) E = e.typeMap[e.kind || "fallback"][e.tag];
            else
                for (E = null, p = e.typeMap.multi[e.kind || "fallback"], f = 0, m = p.length; f < m; f += 1)
                    if (e.tag.slice(0, p[f].tag.length) === p[f].tag) {
                        E = p[f];
                        break;
                    }
            E || I(e, "unknown tag !<" + e.tag + ">"),
                e.result !== null &&
                    E.kind !== e.kind &&
                    I(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + E.kind + '", not "' + e.kind + '"'),
                E.resolve(e.result, e.tag)
                    ? ((e.result = E.construct(e.result, e.tag)), e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
                    : I(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
        }
        return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || c;
    }
    function O_(e) {
        var t = e.position,
            r,
            n,
            i,
            o = !1,
            s;
        for (
            e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = Object.create(null), e.anchorMap = Object.create(null);
            (s = e.input.charCodeAt(e.position)) !== 0 &&
            (ie(e, !0, -1), (s = e.input.charCodeAt(e.position)), !(e.lineIndent > 0 || s !== 37));

        ) {
            for (o = !0, s = e.input.charCodeAt(++e.position), r = e.position; s !== 0 && !Re(s); )
                s = e.input.charCodeAt(++e.position);
            for (
                n = e.input.slice(r, e.position),
                    i = [],
                    n.length < 1 && I(e, "directive name must not be less than one character in length");
                s !== 0;

            ) {
                for (; Pt(s); ) s = e.input.charCodeAt(++e.position);
                if (s === 35) {
                    do s = e.input.charCodeAt(++e.position);
                    while (s !== 0 && !Ve(s));
                    break;
                }
                if (Ve(s)) break;
                for (r = e.position; s !== 0 && !Re(s); ) s = e.input.charCodeAt(++e.position);
                i.push(e.input.slice(r, e.position));
            }
            s !== 0 && ds(e), dt.call(Pf, n) ? Pf[n](e, n, i) : ii(e, 'unknown document directive "' + n + '"');
        }
        if (
            (ie(e, !0, -1),
            e.lineIndent === 0 &&
            e.input.charCodeAt(e.position) === 45 &&
            e.input.charCodeAt(e.position + 1) === 45 &&
            e.input.charCodeAt(e.position + 2) === 45
                ? ((e.position += 3), ie(e, !0, -1))
                : o && I(e, "directives end mark is expected"),
            sr(e, e.lineIndent - 1, ni, !1, !0),
            ie(e, !0, -1),
            e.checkLineBreaks &&
                f_.test(e.input.slice(t, e.position)) &&
                ii(e, "non-ASCII line breaks are interpreted as content"),
            e.documents.push(e.result),
            e.position === e.lineStart && oi(e))
        ) {
            e.input.charCodeAt(e.position) === 46 && ((e.position += 3), ie(e, !0, -1));
            return;
        }
        if (e.position < e.length - 1) I(e, "end of the stream or a document separator is expected");
        else return;
    }
    function jf(e, t) {
        (e = String(e)),
            (t = t || {}),
            e.length !== 0 &&
                (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += "\n"),
                e.charCodeAt(0) === 65279 && (e = e.slice(1)));
        var r = new w_(e, t),
            n = e.indexOf("\0");
        for (
            n !== -1 && ((r.position = n), I(r, "null byte is not allowed in input")), r.input += "\0";
            r.input.charCodeAt(r.position) === 32;

        )
            (r.lineIndent += 1), (r.position += 1);
        for (; r.position < r.length - 1; ) O_(r);
        return r.documents;
    }
    function x_(e, t, r) {
        t !== null && typeof t == "object" && typeof r > "u" && ((r = t), (t = null));
        var n = jf(e, r);
        if (typeof t != "function") return n;
        for (var i = 0, o = n.length; i < o; i += 1) t(n[i]);
    }
    function I_(e, t) {
        var r = jf(e, t);
        if (r.length !== 0) {
            if (r.length === 1) return r[0];
            throw new qf("expected a single document in the stream, but found more");
        }
    }
    ms.exports.loadAll = x_;
    ms.exports.load = I_;
});
var fh = g((UI, ch) => {
    "use strict";
    var li = rr(),
        Zr = nr(),
        N_ = ti(),
        Zf = Object.prototype.toString,
        eh = Object.prototype.hasOwnProperty,
        _s = 65279,
        R_ = 9,
        Jr = 10,
        P_ = 13,
        D_ = 32,
        F_ = 33,
        q_ = 34,
        gs = 35,
        L_ = 37,
        U_ = 38,
        $_ = 39,
        k_ = 42,
        th = 44,
        M_ = 45,
        si = 58,
        B_ = 61,
        H_ = 62,
        j_ = 63,
        W_ = 64,
        rh = 91,
        nh = 93,
        G_ = 96,
        ih = 123,
        V_ = 124,
        oh = 125,
        ge = {};
    ge[0] = "\\0";
    ge[7] = "\\a";
    ge[8] = "\\b";
    ge[9] = "\\t";
    ge[10] = "\\n";
    ge[11] = "\\v";
    ge[12] = "\\f";
    ge[13] = "\\r";
    ge[27] = "\\e";
    ge[34] = '\\"';
    ge[92] = "\\\\";
    ge[133] = "\\N";
    ge[160] = "\\_";
    ge[8232] = "\\L";
    ge[8233] = "\\P";
    var Y_ = ["y", "Y", "yes", "Yes", "YES", "on", "On", "ON", "n", "N", "no", "No", "NO", "off", "Off", "OFF"],
        z_ = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
    function X_(e, t) {
        var r, n, i, o, s, a, l;
        if (t === null) return {};
        for (r = {}, n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
            (s = n[i]),
                (a = String(t[s])),
                s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2)),
                (l = e.compiledTypeMap.fallback[s]),
                l && eh.call(l.styleAliases, a) && (a = l.styleAliases[a]),
                (r[s] = a);
        return r;
    }
    function J_(e) {
        var t, r, n;
        if (((t = e.toString(16).toUpperCase()), e <= 255)) (r = "x"), (n = 2);
        else if (e <= 65535) (r = "u"), (n = 4);
        else if (e <= 4294967295) (r = "U"), (n = 8);
        else throw new Zr("code point within a string may not be greater than 0xFFFFFFFF");
        return "\\" + r + li.repeat("0", n - t.length) + t;
    }
    var K_ = 1,
        Kr = 2;
    function Q_(e) {
        (this.schema = e.schema || N_),
            (this.indent = Math.max(1, e.indent || 2)),
            (this.noArrayIndent = e.noArrayIndent || !1),
            (this.skipInvalid = e.skipInvalid || !1),
            (this.flowLevel = li.isNothing(e.flowLevel) ? -1 : e.flowLevel),
            (this.styleMap = X_(this.schema, e.styles || null)),
            (this.sortKeys = e.sortKeys || !1),
            (this.lineWidth = e.lineWidth || 80),
            (this.noRefs = e.noRefs || !1),
            (this.noCompatMode = e.noCompatMode || !1),
            (this.condenseFlow = e.condenseFlow || !1),
            (this.quotingType = e.quotingType === '"' ? Kr : K_),
            (this.forceQuotes = e.forceQuotes || !1),
            (this.replacer = typeof e.replacer == "function" ? e.replacer : null),
            (this.implicitTypes = this.schema.compiledImplicit),
            (this.explicitTypes = this.schema.compiledExplicit),
            (this.tag = null),
            (this.result = ""),
            (this.duplicates = []),
            (this.usedDuplicates = null);
    }
    function Gf(e, t) {
        for (var r = li.repeat(" ", t), n = 0, i = -1, o = "", s, a = e.length; n < a; )
            (i = e.indexOf("\n", n)),
                i === -1 ? ((s = e.slice(n)), (n = a)) : ((s = e.slice(n, i + 1)), (n = i + 1)),
                s.length && s !== "\n" && (o += r),
                (o += s);
        return o;
    }
    function ws(e, t) {
        return "\n" + li.repeat(" ", e.indent * t);
    }
    function Z_(e, t) {
        var r, n, i;
        for (r = 0, n = e.implicitTypes.length; r < n; r += 1) if (((i = e.implicitTypes[r]), i.resolve(t))) return !0;
        return !1;
    }
    function ai(e) {
        return e === D_ || e === R_;
    }
    function Qr(e) {
        return (
            (32 <= e && e <= 126) ||
            (161 <= e && e <= 55295 && e !== 8232 && e !== 8233) ||
            (57344 <= e && e <= 65533 && e !== _s) ||
            (65536 <= e && e <= 1114111)
        );
    }
    function Vf(e) {
        return Qr(e) && e !== _s && e !== P_ && e !== Jr;
    }
    function Yf(e, t, r) {
        var n = Vf(e),
            i = n && !ai(e);
        return (
            ((r ? n : n && e !== th && e !== rh && e !== nh && e !== ih && e !== oh) && e !== gs && !(t === si && !i)) ||
            (Vf(t) && !ai(t) && e === gs) ||
            (t === si && i)
        );
    }
    function ev(e) {
        return (
            Qr(e) &&
            e !== _s &&
            !ai(e) &&
            e !== M_ &&
            e !== j_ &&
            e !== si &&
            e !== th &&
            e !== rh &&
            e !== nh &&
            e !== ih &&
            e !== oh &&
            e !== gs &&
            e !== U_ &&
            e !== k_ &&
            e !== F_ &&
            e !== V_ &&
            e !== B_ &&
            e !== H_ &&
            e !== $_ &&
            e !== q_ &&
            e !== L_ &&
            e !== W_ &&
            e !== G_
        );
    }
    function tv(e) {
        return !ai(e) && e !== si;
    }
    function Xr(e, t) {
        var r = e.charCodeAt(t),
            n;
        return r >= 55296 && r <= 56319 && t + 1 < e.length && ((n = e.charCodeAt(t + 1)), n >= 56320 && n <= 57343)
            ? (r - 55296) * 1024 + n - 56320 + 65536
            : r;
    }
    function sh(e) {
        var t = /^\n* /;
        return t.test(e);
    }
    var ah = 1,
        ys = 2,
        lh = 3,
        uh = 4,
        ar = 5;
    function rv(e, t, r, n, i, o, s, a) {
        var l,
            d = 0,
            c = null,
            f = !1,
            m = !1,
            p = n !== -1,
            E = -1,
            _ = ev(Xr(e, 0)) && tv(Xr(e, e.length - 1));
        if (t || s)
            for (l = 0; l < e.length; d >= 65536 ? (l += 2) : l++) {
                if (((d = Xr(e, l)), !Qr(d))) return ar;
                (_ = _ && Yf(d, c, a)), (c = d);
            }
        else {
            for (l = 0; l < e.length; d >= 65536 ? (l += 2) : l++) {
                if (((d = Xr(e, l)), d === Jr)) (f = !0), p && ((m = m || (l - E - 1 > n && e[E + 1] !== " ")), (E = l));
                else if (!Qr(d)) return ar;
                (_ = _ && Yf(d, c, a)), (c = d);
            }
            m = m || (p && l - E - 1 > n && e[E + 1] !== " ");
        }
        return !f && !m
            ? _ && !s && !i(e)
                ? ah
                : o === Kr
                ? ar
                : ys
            : r > 9 && sh(e)
            ? ar
            : s
            ? o === Kr
                ? ar
                : ys
            : m
            ? uh
            : lh;
    }
    function nv(e, t, r, n, i) {
        e.dump = (function () {
            if (t.length === 0) return e.quotingType === Kr ? '""' : "''";
            if (!e.noCompatMode && (Y_.indexOf(t) !== -1 || z_.test(t)))
                return e.quotingType === Kr ? '"' + t + '"' : "'" + t + "'";
            var o = e.indent * Math.max(1, r),
                s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o),
                a = n || (e.flowLevel > -1 && r >= e.flowLevel);
            function l(d) {
                return Z_(e, d);
            }
            switch (rv(t, a, e.indent, s, l, e.quotingType, e.forceQuotes && !n, i)) {
                case ah:
                    return t;
                case ys:
                    return "'" + t.replace(/'/g, "''") + "'";
                case lh:
                    return "|" + zf(t, e.indent) + Xf(Gf(t, o));
                case uh:
                    return ">" + zf(t, e.indent) + Xf(Gf(iv(t, s), o));
                case ar:
                    return '"' + ov(t, s) + '"';
                default:
                    throw new Zr("impossible error: invalid scalar style");
            }
        })();
    }
    function zf(e, t) {
        var r = sh(e) ? String(t) : "",
            n = e[e.length - 1] === "\n",
            i = n && (e[e.length - 2] === "\n" || e === "\n"),
            o = i ? "+" : n ? "" : "-";
        return r + o + "\n";
    }
    function Xf(e) {
        return e[e.length - 1] === "\n" ? e.slice(0, -1) : e;
    }
    function iv(e, t) {
        for (
            var r = /(\n+)([^\n]*)/g,
                n = (function () {
                    var d = e.indexOf("\n");
                    return (d = d !== -1 ? d : e.length), (r.lastIndex = d), Jf(e.slice(0, d), t);
                })(),
                i = e[0] === "\n" || e[0] === " ",
                o,
                s;
            (s = r.exec(e));

        ) {
            var a = s[1],
                l = s[2];
            (o = l[0] === " "), (n += a + (!i && !o && l !== "" ? "\n" : "") + Jf(l, t)), (i = o);
        }
        return n;
    }
    function Jf(e, t) {
        if (e === "" || e[0] === " ") return e;
        for (var r = / [^ ]/g, n, i = 0, o, s = 0, a = 0, l = ""; (n = r.exec(e)); )
            (a = n.index), a - i > t && ((o = s > i ? s : a), (l += "\n" + e.slice(i, o)), (i = o + 1)), (s = a);
        return (
            (l += "\n"), e.length - i > t && s > i ? (l += e.slice(i, s) + "\n" + e.slice(s + 1)) : (l += e.slice(i)), l.slice(1)
        );
    }
    function ov(e) {
        for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? (i += 2) : i++)
            (r = Xr(e, i)), (n = ge[r]), !n && Qr(r) ? ((t += e[i]), r >= 65536 && (t += e[i + 1])) : (t += n || J_(r));
        return t;
    }
    function sv(e, t, r) {
        var n = "",
            i = e.tag,
            o,
            s,
            a;
        for (o = 0, s = r.length; o < s; o += 1)
            (a = r[o]),
                e.replacer && (a = e.replacer.call(r, String(o), a)),
                (Ze(e, t, a, !1, !1) || (typeof a > "u" && Ze(e, t, null, !1, !1))) &&
                    (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), (n += e.dump));
        (e.tag = i), (e.dump = "[" + n + "]");
    }
    function Kf(e, t, r, n) {
        var i = "",
            o = e.tag,
            s,
            a,
            l;
        for (s = 0, a = r.length; s < a; s += 1)
            (l = r[s]),
                e.replacer && (l = e.replacer.call(r, String(s), l)),
                (Ze(e, t + 1, l, !0, !0, !1, !0) || (typeof l > "u" && Ze(e, t + 1, null, !0, !0, !1, !0))) &&
                    ((!n || i !== "") && (i += ws(e, t)),
                    e.dump && Jr === e.dump.charCodeAt(0) ? (i += "-") : (i += "- "),
                    (i += e.dump));
        (e.tag = o), (e.dump = i || "[]");
    }
    function av(e, t, r) {
        var n = "",
            i = e.tag,
            o = Object.keys(r),
            s,
            a,
            l,
            d,
            c;
        for (s = 0, a = o.length; s < a; s += 1)
            (c = ""),
                n !== "" && (c += ", "),
                e.condenseFlow && (c += '"'),
                (l = o[s]),
                (d = r[l]),
                e.replacer && (d = e.replacer.call(r, l, d)),
                Ze(e, t, l, !1, !1) &&
                    (e.dump.length > 1024 && (c += "? "),
                    (c += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " ")),
                    Ze(e, t, d, !1, !1) && ((c += e.dump), (n += c)));
        (e.tag = i), (e.dump = "{" + n + "}");
    }
    function lv(e, t, r, n) {
        var i = "",
            o = e.tag,
            s = Object.keys(r),
            a,
            l,
            d,
            c,
            f,
            m;
        if (e.sortKeys === !0) s.sort();
        else if (typeof e.sortKeys == "function") s.sort(e.sortKeys);
        else if (e.sortKeys) throw new Zr("sortKeys must be a boolean or a function");
        for (a = 0, l = s.length; a < l; a += 1)
            (m = ""),
                (!n || i !== "") && (m += ws(e, t)),
                (d = s[a]),
                (c = r[d]),
                e.replacer && (c = e.replacer.call(r, d, c)),
                Ze(e, t + 1, d, !0, !0, !0) &&
                    ((f = (e.tag !== null && e.tag !== "?") || (e.dump && e.dump.length > 1024)),
                    f && (e.dump && Jr === e.dump.charCodeAt(0) ? (m += "?") : (m += "? ")),
                    (m += e.dump),
                    f && (m += ws(e, t)),
                    Ze(e, t + 1, c, !0, f) &&
                        (e.dump && Jr === e.dump.charCodeAt(0) ? (m += ":") : (m += ": "), (m += e.dump), (i += m)));
        (e.tag = o), (e.dump = i || "{}");
    }
    function Qf(e, t, r) {
        var n, i, o, s, a, l;
        for (i = r ? e.explicitTypes : e.implicitTypes, o = 0, s = i.length; o < s; o += 1)
            if (
                ((a = i[o]),
                (a.instanceOf || a.predicate) &&
                    (!a.instanceOf || (typeof t == "object" && t instanceof a.instanceOf)) &&
                    (!a.predicate || a.predicate(t)))
            ) {
                if (
                    (r ? (a.multi && a.representName ? (e.tag = a.representName(t)) : (e.tag = a.tag)) : (e.tag = "?"),
                    a.represent)
                ) {
                    if (((l = e.styleMap[a.tag] || a.defaultStyle), Zf.call(a.represent) === "[object Function]"))
                        n = a.represent(t, l);
                    else if (eh.call(a.represent, l)) n = a.represent[l](t, l);
                    else throw new Zr("!<" + a.tag + '> tag resolver accepts not "' + l + '" style');
                    e.dump = n;
                }
                return !0;
            }
        return !1;
    }
    function Ze(e, t, r, n, i, o, s) {
        (e.tag = null), (e.dump = r), Qf(e, r, !1) || Qf(e, r, !0);
        var a = Zf.call(e.dump),
            l = n,
            d;
        n && (n = e.flowLevel < 0 || e.flowLevel > t);
        var c = a === "[object Object]" || a === "[object Array]",
            f,
            m;
        if (
            (c && ((f = e.duplicates.indexOf(r)), (m = f !== -1)),
            ((e.tag !== null && e.tag !== "?") || m || (e.indent !== 2 && t > 0)) && (i = !1),
            m && e.usedDuplicates[f])
        )
            e.dump = "*ref_" + f;
        else {
            if ((c && m && !e.usedDuplicates[f] && (e.usedDuplicates[f] = !0), a === "[object Object]"))
                n && Object.keys(e.dump).length !== 0
                    ? (lv(e, t, e.dump, i), m && (e.dump = "&ref_" + f + e.dump))
                    : (av(e, t, e.dump), m && (e.dump = "&ref_" + f + " " + e.dump));
            else if (a === "[object Array]")
                n && e.dump.length !== 0
                    ? (e.noArrayIndent && !s && t > 0 ? Kf(e, t - 1, e.dump, i) : Kf(e, t, e.dump, i),
                      m && (e.dump = "&ref_" + f + e.dump))
                    : (sv(e, t, e.dump), m && (e.dump = "&ref_" + f + " " + e.dump));
            else if (a === "[object String]") e.tag !== "?" && nv(e, e.dump, t, o, l);
            else {
                if (a === "[object Undefined]") return !1;
                if (e.skipInvalid) return !1;
                throw new Zr("unacceptable kind of an object to dump " + a);
            }
            e.tag !== null &&
                e.tag !== "?" &&
                ((d = encodeURI(e.tag[0] === "!" ? e.tag.slice(1) : e.tag).replace(/!/g, "%21")),
                e.tag[0] === "!"
                    ? (d = "!" + d)
                    : d.slice(0, 18) === "tag:yaml.org,2002:"
                    ? (d = "!!" + d.slice(18))
                    : (d = "!<" + d + ">"),
                (e.dump = d + " " + e.dump));
        }
        return !0;
    }
    function uv(e, t) {
        var r = [],
            n = [],
            i,
            o;
        for (Es(e, r, n), i = 0, o = n.length; i < o; i += 1) t.duplicates.push(r[n[i]]);
        t.usedDuplicates = new Array(o);
    }
    function Es(e, t, r) {
        var n, i, o;
        if (e !== null && typeof e == "object")
            if (((i = t.indexOf(e)), i !== -1)) r.indexOf(i) === -1 && r.push(i);
            else if ((t.push(e), Array.isArray(e))) for (i = 0, o = e.length; i < o; i += 1) Es(e[i], t, r);
            else for (n = Object.keys(e), i = 0, o = n.length; i < o; i += 1) Es(e[n[i]], t, r);
    }
    function cv(e, t) {
        t = t || {};
        var r = new Q_(t);
        r.noRefs || uv(e, r);
        var n = e;
        return r.replacer && (n = r.replacer.call({ "": n }, "", n)), Ze(r, 0, n, !0, !0) ? r.dump + "\n" : "";
    }
    ch.exports.dump = cv;
});
var ui = g(($I, Ae) => {
    "use strict";
    var hh = Wf(),
        fv = fh();
    function vs(e, t) {
        return function () {
            throw new Error(
                "Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default."
            );
        };
    }
    Ae.exports.Type = me();
    Ae.exports.Schema = zo();
    Ae.exports.FAILSAFE_SCHEMA = Qo();
    Ae.exports.JSON_SCHEMA = ns();
    Ae.exports.CORE_SCHEMA = is();
    Ae.exports.DEFAULT_SCHEMA = ti();
    Ae.exports.load = hh.load;
    Ae.exports.loadAll = hh.loadAll;
    Ae.exports.dump = fv.dump;
    Ae.exports.YAMLException = nr();
    Ae.exports.types = {
        binary: ls(),
        float: rs(),
        map: Ko(),
        null: Zo(),
        pairs: cs(),
        set: fs(),
        timestamp: os(),
        bool: es(),
        int: ts(),
        merge: ss(),
        omap: us(),
        seq: Jo(),
        str: Xo()
    };
    Ae.exports.safeLoad = vs("safeLoad", "load");
    Ae.exports.safeLoadAll = vs("safeLoadAll", "loadAll");
    Ae.exports.safeDump = vs("safeDump", "dump");
});
var dh = g(ci => {
    "use strict";
    Object.defineProperty(ci, "__esModule", { value: !0 });
    ci.Lazy = void 0;
    var As = class {
        constructor(t) {
            (this._value = null), (this.creator = t);
        }
        get hasValue() {
            return this.creator == null;
        }
        get value() {
            if (this.creator == null) return this._value;
            let t = this.creator();
            return (this.value = t), t;
        }
        set value(t) {
            (this._value = t), (this.creator = null);
        }
    };
    ci.Lazy = As;
});
var en = g((MI, ph) => {
    var hv = "2.0.0",
        dv = Number.MAX_SAFE_INTEGER || 9007199254740991,
        pv = 16,
        mv = 250,
        gv = ["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"];
    ph.exports = {
        MAX_LENGTH: 256,
        MAX_SAFE_COMPONENT_LENGTH: pv,
        MAX_SAFE_BUILD_LENGTH: mv,
        MAX_SAFE_INTEGER: dv,
        RELEASE_TYPES: gv,
        SEMVER_SPEC_VERSION: hv,
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2
    };
});
var tn = g((BI, mh) => {
    var wv =
        typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)
            ? (...e) => console.error("SEMVER", ...e)
            : () => {};
    mh.exports = wv;
});
var lr = g((Ye, gh) => {
    var { MAX_SAFE_COMPONENT_LENGTH: Ss, MAX_SAFE_BUILD_LENGTH: yv, MAX_LENGTH: Ev } = en(),
        _v = tn();
    Ye = gh.exports = {};
    var vv = (Ye.re = []),
        Av = (Ye.safeRe = []),
        O = (Ye.src = []),
        Sv = (Ye.safeSrc = []),
        x = (Ye.t = {}),
        Cv = 0,
        Cs = "[a-zA-Z0-9-]",
        Tv = [
            ["\\s", 1],
            ["\\d", Ev],
            [Cs, yv]
        ],
        bv = e => {
            for (let [t, r] of Tv)
                e = e
                    .split("".concat(t, "*"))
                    .join("".concat(t, "{0,").concat(r, "}"))
                    .split("".concat(t, "+"))
                    .join("".concat(t, "{1,").concat(r, "}"));
            return e;
        },
        q = (e, t, r) => {
            let n = bv(t),
                i = Cv++;
            _v(e, i, t),
                (x[e] = i),
                (O[i] = t),
                (Sv[i] = n),
                (vv[i] = new RegExp(t, r ? "g" : void 0)),
                (Av[i] = new RegExp(n, r ? "g" : void 0));
        };
    q("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    q("NUMERICIDENTIFIERLOOSE", "\\d+");
    q("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-]".concat(Cs, "*"));
    q(
        "MAINVERSION",
        "(".concat(O[x.NUMERICIDENTIFIER], ")\\.") +
            "(".concat(O[x.NUMERICIDENTIFIER], ")\\.") +
            "(".concat(O[x.NUMERICIDENTIFIER], ")")
    );
    q(
        "MAINVERSIONLOOSE",
        "(".concat(O[x.NUMERICIDENTIFIERLOOSE], ")\\.") +
            "(".concat(O[x.NUMERICIDENTIFIERLOOSE], ")\\.") +
            "(".concat(O[x.NUMERICIDENTIFIERLOOSE], ")")
    );
    q("PRERELEASEIDENTIFIER", "(?:".concat(O[x.NUMERICIDENTIFIER], "|").concat(O[x.NONNUMERICIDENTIFIER], ")"));
    q("PRERELEASEIDENTIFIERLOOSE", "(?:".concat(O[x.NUMERICIDENTIFIERLOOSE], "|").concat(O[x.NONNUMERICIDENTIFIER], ")"));
    q("PRERELEASE", "(?:-(".concat(O[x.PRERELEASEIDENTIFIER], "(?:\\.").concat(O[x.PRERELEASEIDENTIFIER], ")*))"));
    q(
        "PRERELEASELOOSE",
        "(?:-?(".concat(O[x.PRERELEASEIDENTIFIERLOOSE], "(?:\\.").concat(O[x.PRERELEASEIDENTIFIERLOOSE], ")*))")
    );
    q("BUILDIDENTIFIER", "".concat(Cs, "+"));
    q("BUILD", "(?:\\+(".concat(O[x.BUILDIDENTIFIER], "(?:\\.").concat(O[x.BUILDIDENTIFIER], ")*))"));
    q("FULLPLAIN", "v?".concat(O[x.MAINVERSION]).concat(O[x.PRERELEASE], "?").concat(O[x.BUILD], "?"));
    q("FULL", "^".concat(O[x.FULLPLAIN], "$"));
    q("LOOSEPLAIN", "[v=\\s]*".concat(O[x.MAINVERSIONLOOSE]).concat(O[x.PRERELEASELOOSE], "?").concat(O[x.BUILD], "?"));
    q("LOOSE", "^".concat(O[x.LOOSEPLAIN], "$"));
    q("GTLT", "((?:<|>)?=?)");
    q("XRANGEIDENTIFIERLOOSE", "".concat(O[x.NUMERICIDENTIFIERLOOSE], "|x|X|\\*"));
    q("XRANGEIDENTIFIER", "".concat(O[x.NUMERICIDENTIFIER], "|x|X|\\*"));
    q(
        "XRANGEPLAIN",
        "[v=\\s]*(".concat(O[x.XRANGEIDENTIFIER], ")") +
            "(?:\\.(".concat(O[x.XRANGEIDENTIFIER], ")") +
            "(?:\\.(".concat(O[x.XRANGEIDENTIFIER], ")") +
            "(?:".concat(O[x.PRERELEASE], ")?").concat(O[x.BUILD], "?") +
            ")?)?"
    );
    q(
        "XRANGEPLAINLOOSE",
        "[v=\\s]*(".concat(O[x.XRANGEIDENTIFIERLOOSE], ")") +
            "(?:\\.(".concat(O[x.XRANGEIDENTIFIERLOOSE], ")") +
            "(?:\\.(".concat(O[x.XRANGEIDENTIFIERLOOSE], ")") +
            "(?:".concat(O[x.PRERELEASELOOSE], ")?").concat(O[x.BUILD], "?") +
            ")?)?"
    );
    q("XRANGE", "^".concat(O[x.GTLT], "\\s*").concat(O[x.XRANGEPLAIN], "$"));
    q("XRANGELOOSE", "^".concat(O[x.GTLT], "\\s*").concat(O[x.XRANGEPLAINLOOSE], "$"));
    q(
        "COERCEPLAIN",
        "(^|[^\\d])(\\d{1,".concat(Ss, "})") + "(?:\\.(\\d{1,".concat(Ss, "}))?") + "(?:\\.(\\d{1,".concat(Ss, "}))?")
    );
    q("COERCE", "".concat(O[x.COERCEPLAIN], "(?:$|[^\\d])"));
    q("COERCEFULL", O[x.COERCEPLAIN] + "(?:".concat(O[x.PRERELEASE], ")?") + "(?:".concat(O[x.BUILD], ")?") + "(?:$|[^\\d])");
    q("COERCERTL", O[x.COERCE], !0);
    q("COERCERTLFULL", O[x.COERCEFULL], !0);
    q("LONETILDE", "(?:~>?)");
    q("TILDETRIM", "(\\s*)".concat(O[x.LONETILDE], "\\s+"), !0);
    Ye.tildeTrimReplace = "$1~";
    q("TILDE", "^".concat(O[x.LONETILDE]).concat(O[x.XRANGEPLAIN], "$"));
    q("TILDELOOSE", "^".concat(O[x.LONETILDE]).concat(O[x.XRANGEPLAINLOOSE], "$"));
    q("LONECARET", "(?:\\^)");
    q("CARETTRIM", "(\\s*)".concat(O[x.LONECARET], "\\s+"), !0);
    Ye.caretTrimReplace = "$1^";
    q("CARET", "^".concat(O[x.LONECARET]).concat(O[x.XRANGEPLAIN], "$"));
    q("CARETLOOSE", "^".concat(O[x.LONECARET]).concat(O[x.XRANGEPLAINLOOSE], "$"));
    q("COMPARATORLOOSE", "^".concat(O[x.GTLT], "\\s*(").concat(O[x.LOOSEPLAIN], ")$|^$"));
    q("COMPARATOR", "^".concat(O[x.GTLT], "\\s*(").concat(O[x.FULLPLAIN], ")$|^$"));
    q("COMPARATORTRIM", "(\\s*)".concat(O[x.GTLT], "\\s*(").concat(O[x.LOOSEPLAIN], "|").concat(O[x.XRANGEPLAIN], ")"), !0);
    Ye.comparatorTrimReplace = "$1$2$3";
    q("HYPHENRANGE", "^\\s*(".concat(O[x.XRANGEPLAIN], ")") + "\\s+-\\s+" + "(".concat(O[x.XRANGEPLAIN], ")") + "\\s*$");
    q(
        "HYPHENRANGELOOSE",
        "^\\s*(".concat(O[x.XRANGEPLAINLOOSE], ")") + "\\s+-\\s+" + "(".concat(O[x.XRANGEPLAINLOOSE], ")") + "\\s*$"
    );
    q("STAR", "(<|>)?=?\\s*\\*");
    q("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    q("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
});
var fi = g((HI, wh) => {
    var Ov = Object.freeze({ loose: !0 }),
        xv = Object.freeze({}),
        Iv = e => (e ? (typeof e != "object" ? Ov : e) : xv);
    wh.exports = Iv;
});
var Ts = g((jI, _h) => {
    var yh = /^[0-9]+$/,
        Eh = (e, t) => {
            let r = yh.test(e),
                n = yh.test(t);
            return r && n && ((e = +e), (t = +t)), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
        },
        Nv = (e, t) => Eh(t, e);
    _h.exports = { compareIdentifiers: Eh, rcompareIdentifiers: Nv };
});
var we = g((WI, Ch) => {
    var hi = tn(),
        { MAX_LENGTH: vh, MAX_SAFE_INTEGER: di } = en(),
        { safeRe: Ah, safeSrc: Sh, t: pi } = lr(),
        Rv = fi(),
        { compareIdentifiers: ur } = Ts(),
        bs = class e {
            constructor(t, r) {
                if (((r = Rv(r)), t instanceof e)) {
                    if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease) return t;
                    t = t.version;
                } else if (typeof t != "string")
                    throw new TypeError('Invalid version. Must be a string. Got type "'.concat(typeof t, '".'));
                if (t.length > vh) throw new TypeError("version is longer than ".concat(vh, " characters"));
                hi("SemVer", t, r),
                    (this.options = r),
                    (this.loose = !!r.loose),
                    (this.includePrerelease = !!r.includePrerelease);
                let n = t.trim().match(r.loose ? Ah[pi.LOOSE] : Ah[pi.FULL]);
                if (!n) throw new TypeError("Invalid Version: ".concat(t));
                if (
                    ((this.raw = t),
                    (this.major = +n[1]),
                    (this.minor = +n[2]),
                    (this.patch = +n[3]),
                    this.major > di || this.major < 0)
                )
                    throw new TypeError("Invalid major version");
                if (this.minor > di || this.minor < 0) throw new TypeError("Invalid minor version");
                if (this.patch > di || this.patch < 0) throw new TypeError("Invalid patch version");
                n[4]
                    ? (this.prerelease = n[4].split(".").map(i => {
                          if (/^[0-9]+$/.test(i)) {
                              let o = +i;
                              if (o >= 0 && o < di) return o;
                          }
                          return i;
                      }))
                    : (this.prerelease = []),
                    (this.build = n[5] ? n[5].split(".") : []),
                    this.format();
            }
            format() {
                return (
                    (this.version = "".concat(this.major, ".").concat(this.minor, ".").concat(this.patch)),
                    this.prerelease.length && (this.version += "-".concat(this.prerelease.join("."))),
                    this.version
                );
            }
            toString() {
                return this.version;
            }
            compare(t) {
                if ((hi("SemVer.compare", this.version, this.options, t), !(t instanceof e))) {
                    if (typeof t == "string" && t === this.version) return 0;
                    t = new e(t, this.options);
                }
                return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
            }
            compareMain(t) {
                return (
                    t instanceof e || (t = new e(t, this.options)),
                    ur(this.major, t.major) || ur(this.minor, t.minor) || ur(this.patch, t.patch)
                );
            }
            comparePre(t) {
                if ((t instanceof e || (t = new e(t, this.options)), this.prerelease.length && !t.prerelease.length)) return -1;
                if (!this.prerelease.length && t.prerelease.length) return 1;
                if (!this.prerelease.length && !t.prerelease.length) return 0;
                let r = 0;
                do {
                    let n = this.prerelease[r],
                        i = t.prerelease[r];
                    if ((hi("prerelease compare", r, n, i), n === void 0 && i === void 0)) return 0;
                    if (i === void 0) return 1;
                    if (n === void 0) return -1;
                    if (n === i) continue;
                    return ur(n, i);
                } while (++r);
            }
            compareBuild(t) {
                t instanceof e || (t = new e(t, this.options));
                let r = 0;
                do {
                    let n = this.build[r],
                        i = t.build[r];
                    if ((hi("build compare", r, n, i), n === void 0 && i === void 0)) return 0;
                    if (i === void 0) return 1;
                    if (n === void 0) return -1;
                    if (n === i) continue;
                    return ur(n, i);
                } while (++r);
            }
            inc(t, r, n) {
                if (t.startsWith("pre")) {
                    if (!r && n === !1) throw new Error("invalid increment argument: identifier is empty");
                    if (r) {
                        let i = new RegExp("^".concat(this.options.loose ? Sh[pi.PRERELEASELOOSE] : Sh[pi.PRERELEASE], "$")),
                            o = "-".concat(r).match(i);
                        if (!o || o[1] !== r) throw new Error("invalid identifier: ".concat(r));
                    }
                }
                switch (t) {
                    case "premajor":
                        (this.prerelease.length = 0), (this.patch = 0), (this.minor = 0), this.major++, this.inc("pre", r, n);
                        break;
                    case "preminor":
                        (this.prerelease.length = 0), (this.patch = 0), this.minor++, this.inc("pre", r, n);
                        break;
                    case "prepatch":
                        (this.prerelease.length = 0), this.inc("patch", r, n), this.inc("pre", r, n);
                        break;
                    case "prerelease":
                        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
                        break;
                    case "release":
                        if (this.prerelease.length === 0) throw new Error("version ".concat(this.raw, " is not a prerelease"));
                        this.prerelease.length = 0;
                        break;
                    case "major":
                        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++,
                            (this.minor = 0),
                            (this.patch = 0),
                            (this.prerelease = []);
                        break;
                    case "minor":
                        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++,
                            (this.patch = 0),
                            (this.prerelease = []);
                        break;
                    case "patch":
                        this.prerelease.length === 0 && this.patch++, (this.prerelease = []);
                        break;
                    case "pre": {
                        let i = Number(n) ? 1 : 0;
                        if (this.prerelease.length === 0) this.prerelease = [i];
                        else {
                            let o = this.prerelease.length;
                            for (; --o >= 0; ) typeof this.prerelease[o] == "number" && (this.prerelease[o]++, (o = -2));
                            if (o === -1) {
                                if (r === this.prerelease.join(".") && n === !1)
                                    throw new Error("invalid increment argument: identifier already exists");
                                this.prerelease.push(i);
                            }
                        }
                        if (r) {
                            let o = [r, i];
                            n === !1 && (o = [r]),
                                ur(this.prerelease[0], r) === 0
                                    ? isNaN(this.prerelease[1]) && (this.prerelease = o)
                                    : (this.prerelease = o);
                        }
                        break;
                    }
                    default:
                        throw new Error("invalid increment argument: ".concat(t));
                }
                return (this.raw = this.format()), this.build.length && (this.raw += "+".concat(this.build.join("."))), this;
            }
        };
    Ch.exports = bs;
});
var Dt = g((GI, bh) => {
    var Th = we(),
        Pv = (e, t, r = !1) => {
            if (e instanceof Th) return e;
            try {
                return new Th(e, t);
            } catch (n) {
                if (!r) return null;
                throw n;
            }
        };
    bh.exports = Pv;
});
var xh = g((VI, Oh) => {
    var Dv = Dt(),
        Fv = (e, t) => {
            let r = Dv(e, t);
            return r ? r.version : null;
        };
    Oh.exports = Fv;
});
var Nh = g((YI, Ih) => {
    var qv = Dt(),
        Lv = (e, t) => {
            let r = qv(e.trim().replace(/^[=v]+/, ""), t);
            return r ? r.version : null;
        };
    Ih.exports = Lv;
});
var Dh = g((zI, Ph) => {
    var Rh = we(),
        Uv = (e, t, r, n, i) => {
            typeof r == "string" && ((i = n), (n = r), (r = void 0));
            try {
                return new Rh(e instanceof Rh ? e.version : e, r).inc(t, n, i).version;
            } catch {
                return null;
            }
        };
    Ph.exports = Uv;
});
var Lh = g((XI, qh) => {
    var Fh = Dt(),
        $v = (e, t) => {
            let r = Fh(e, null, !0),
                n = Fh(t, null, !0),
                i = r.compare(n);
            if (i === 0) return null;
            let o = i > 0,
                s = o ? r : n,
                a = o ? n : r,
                l = !!s.prerelease.length;
            if (!!a.prerelease.length && !l) {
                if (!a.patch && !a.minor) return "major";
                if (a.compareMain(s) === 0) return a.minor && !a.patch ? "minor" : "patch";
            }
            let c = l ? "pre" : "";
            return r.major !== n.major
                ? c + "major"
                : r.minor !== n.minor
                ? c + "minor"
                : r.patch !== n.patch
                ? c + "patch"
                : "prerelease";
        };
    qh.exports = $v;
});
var $h = g((JI, Uh) => {
    var kv = we(),
        Mv = (e, t) => new kv(e, t).major;
    Uh.exports = Mv;
});
var Mh = g((KI, kh) => {
    var Bv = we(),
        Hv = (e, t) => new Bv(e, t).minor;
    kh.exports = Hv;
});
var Hh = g((QI, Bh) => {
    var jv = we(),
        Wv = (e, t) => new jv(e, t).patch;
    Bh.exports = Wv;
});
var Wh = g((ZI, jh) => {
    var Gv = Dt(),
        Vv = (e, t) => {
            let r = Gv(e, t);
            return r && r.prerelease.length ? r.prerelease : null;
        };
    jh.exports = Vv;
});
var Ue = g((eN, Vh) => {
    var Gh = we(),
        Yv = (e, t, r) => new Gh(e, r).compare(new Gh(t, r));
    Vh.exports = Yv;
});
var zh = g((tN, Yh) => {
    var zv = Ue(),
        Xv = (e, t, r) => zv(t, e, r);
    Yh.exports = Xv;
});
var Jh = g((rN, Xh) => {
    var Jv = Ue(),
        Kv = (e, t) => Jv(e, t, !0);
    Xh.exports = Kv;
});
var mi = g((nN, Qh) => {
    var Kh = we(),
        Qv = (e, t, r) => {
            let n = new Kh(e, r),
                i = new Kh(t, r);
            return n.compare(i) || n.compareBuild(i);
        };
    Qh.exports = Qv;
});
var ed = g((iN, Zh) => {
    var Zv = mi(),
        eA = (e, t) => e.sort((r, n) => Zv(r, n, t));
    Zh.exports = eA;
});
var rd = g((oN, td) => {
    var tA = mi(),
        rA = (e, t) => e.sort((r, n) => tA(n, r, t));
    td.exports = rA;
});
var rn = g((sN, nd) => {
    var nA = Ue(),
        iA = (e, t, r) => nA(e, t, r) > 0;
    nd.exports = iA;
});
var gi = g((aN, id) => {
    var oA = Ue(),
        sA = (e, t, r) => oA(e, t, r) < 0;
    id.exports = sA;
});
var Os = g((lN, od) => {
    var aA = Ue(),
        lA = (e, t, r) => aA(e, t, r) === 0;
    od.exports = lA;
});
var xs = g((uN, sd) => {
    var uA = Ue(),
        cA = (e, t, r) => uA(e, t, r) !== 0;
    sd.exports = cA;
});
var wi = g((cN, ad) => {
    var fA = Ue(),
        hA = (e, t, r) => fA(e, t, r) >= 0;
    ad.exports = hA;
});
var yi = g((fN, ld) => {
    var dA = Ue(),
        pA = (e, t, r) => dA(e, t, r) <= 0;
    ld.exports = pA;
});
var Is = g((hN, ud) => {
    var mA = Os(),
        gA = xs(),
        wA = rn(),
        yA = wi(),
        EA = gi(),
        _A = yi(),
        vA = (e, t, r, n) => {
            switch (t) {
                case "===":
                    return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
                case "!==":
                    return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
                case "":
                case "=":
                case "==":
                    return mA(e, r, n);
                case "!=":
                    return gA(e, r, n);
                case ">":
                    return wA(e, r, n);
                case ">=":
                    return yA(e, r, n);
                case "<":
                    return EA(e, r, n);
                case "<=":
                    return _A(e, r, n);
                default:
                    throw new TypeError("Invalid operator: ".concat(t));
            }
        };
    ud.exports = vA;
});
var fd = g((dN, cd) => {
    var AA = we(),
        SA = Dt(),
        { safeRe: Ei, t: _i } = lr(),
        CA = (e, t) => {
            if (e instanceof AA) return e;
            if ((typeof e == "number" && (e = String(e)), typeof e != "string")) return null;
            t = t || {};
            let r = null;
            if (!t.rtl) r = e.match(t.includePrerelease ? Ei[_i.COERCEFULL] : Ei[_i.COERCE]);
            else {
                let l = t.includePrerelease ? Ei[_i.COERCERTLFULL] : Ei[_i.COERCERTL],
                    d;
                for (; (d = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
                    (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d),
                        (l.lastIndex = d.index + d[1].length + d[2].length);
                l.lastIndex = -1;
            }
            if (r === null) return null;
            let n = r[2],
                i = r[3] || "0",
                o = r[4] || "0",
                s = t.includePrerelease && r[5] ? "-".concat(r[5]) : "",
                a = t.includePrerelease && r[6] ? "+".concat(r[6]) : "";
            return SA("".concat(n, ".").concat(i, ".").concat(o).concat(s).concat(a), t);
        };
    cd.exports = CA;
});
var dd = g((pN, hd) => {
    var Ns = class {
        constructor() {
            (this.max = 1e3), (this.map = new Map());
        }
        get(t) {
            let r = this.map.get(t);
            if (r !== void 0) return this.map.delete(t), this.map.set(t, r), r;
        }
        delete(t) {
            return this.map.delete(t);
        }
        set(t, r) {
            if (!this.delete(t) && r !== void 0) {
                if (this.map.size >= this.max) {
                    let i = this.map.keys().next().value;
                    this.delete(i);
                }
                this.map.set(t, r);
            }
            return this;
        }
    };
    hd.exports = Ns;
});
var $e = g((mN, wd) => {
    var TA = /\s+/g,
        Rs = class e {
            constructor(t, r) {
                if (((r = OA(r)), t instanceof e))
                    return t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease ? t : new e(t.raw, r);
                if (t instanceof Ps) return (this.raw = t.value), (this.set = [[t]]), (this.formatted = void 0), this;
                if (
                    ((this.options = r),
                    (this.loose = !!r.loose),
                    (this.includePrerelease = !!r.includePrerelease),
                    (this.raw = t.trim().replace(TA, " ")),
                    (this.set = this.raw
                        .split("||")
                        .map(n => this.parseRange(n.trim()))
                        .filter(n => n.length)),
                    !this.set.length)
                )
                    throw new TypeError("Invalid SemVer Range: ".concat(this.raw));
                if (this.set.length > 1) {
                    let n = this.set[0];
                    if (((this.set = this.set.filter(i => !md(i[0]))), this.set.length === 0)) this.set = [n];
                    else if (this.set.length > 1) {
                        for (let i of this.set)
                            if (i.length === 1 && FA(i[0])) {
                                this.set = [i];
                                break;
                            }
                    }
                }
                this.formatted = void 0;
            }
            get range() {
                if (this.formatted === void 0) {
                    this.formatted = "";
                    for (let t = 0; t < this.set.length; t++) {
                        t > 0 && (this.formatted += "||");
                        let r = this.set[t];
                        for (let n = 0; n < r.length; n++)
                            n > 0 && (this.formatted += " "), (this.formatted += r[n].toString().trim());
                    }
                }
                return this.formatted;
            }
            format() {
                return this.range;
            }
            toString() {
                return this.range;
            }
            parseRange(t) {
                let n = ((this.options.includePrerelease && PA) | (this.options.loose && DA)) + ":" + t,
                    i = pd.get(n);
                if (i) return i;
                let o = this.options.loose,
                    s = o ? Pe[Se.HYPHENRANGELOOSE] : Pe[Se.HYPHENRANGE];
                (t = t.replace(s, WA(this.options.includePrerelease))),
                    X("hyphen replace", t),
                    (t = t.replace(Pe[Se.COMPARATORTRIM], IA)),
                    X("comparator trim", t),
                    (t = t.replace(Pe[Se.TILDETRIM], NA)),
                    X("tilde trim", t),
                    (t = t.replace(Pe[Se.CARETTRIM], RA)),
                    X("caret trim", t);
                let a = t
                    .split(" ")
                    .map(f => qA(f, this.options))
                    .join(" ")
                    .split(/\s+/)
                    .map(f => jA(f, this.options));
                o && (a = a.filter(f => (X("loose invalid filter", f, this.options), !!f.match(Pe[Se.COMPARATORLOOSE])))),
                    X("range list", a);
                let l = new Map(),
                    d = a.map(f => new Ps(f, this.options));
                for (let f of d) {
                    if (md(f)) return [f];
                    l.set(f.value, f);
                }
                l.size > 1 && l.has("") && l.delete("");
                let c = [...l.values()];
                return pd.set(n, c), c;
            }
            intersects(t, r) {
                if (!(t instanceof e)) throw new TypeError("a Range is required");
                return this.set.some(
                    n => gd(n, r) && t.set.some(i => gd(i, r) && n.every(o => i.every(s => o.intersects(s, r))))
                );
            }
            test(t) {
                if (!t) return !1;
                if (typeof t == "string")
                    try {
                        t = new xA(t, this.options);
                    } catch {
                        return !1;
                    }
                for (let r = 0; r < this.set.length; r++) if (GA(this.set[r], t, this.options)) return !0;
                return !1;
            }
        };
    wd.exports = Rs;
    var bA = dd(),
        pd = new bA(),
        OA = fi(),
        Ps = nn(),
        X = tn(),
        xA = we(),
        { safeRe: Pe, t: Se, comparatorTrimReplace: IA, tildeTrimReplace: NA, caretTrimReplace: RA } = lr(),
        { FLAG_INCLUDE_PRERELEASE: PA, FLAG_LOOSE: DA } = en(),
        md = e => e.value === "<0.0.0-0",
        FA = e => e.value === "",
        gd = (e, t) => {
            let r = !0,
                n = e.slice(),
                i = n.pop();
            for (; r && n.length; ) (r = n.every(o => i.intersects(o, t))), (i = n.pop());
            return r;
        },
        qA = (e, t) => (
            X("comp", e, t),
            (e = $A(e, t)),
            X("caret", e),
            (e = LA(e, t)),
            X("tildes", e),
            (e = MA(e, t)),
            X("xrange", e),
            (e = HA(e, t)),
            X("stars", e),
            e
        ),
        Ce = e => !e || e.toLowerCase() === "x" || e === "*",
        LA = (e, t) =>
            e
                .trim()
                .split(/\s+/)
                .map(r => UA(r, t))
                .join(" "),
        UA = (e, t) => {
            let r = t.loose ? Pe[Se.TILDELOOSE] : Pe[Se.TILDE];
            return e.replace(r, (n, i, o, s, a) => {
                X("tilde", e, n, i, o, s, a);
                let l;
                return (
                    Ce(i)
                        ? (l = "")
                        : Ce(o)
                        ? (l = ">=".concat(i, ".0.0 <").concat(+i + 1, ".0.0-0"))
                        : Ce(s)
                        ? (l = ">="
                              .concat(i, ".")
                              .concat(o, ".0 <")
                              .concat(i, ".")
                              .concat(+o + 1, ".0-0"))
                        : a
                        ? (X("replaceTilde pr", a),
                          (l = ">="
                              .concat(i, ".")
                              .concat(o, ".")
                              .concat(s, "-")
                              .concat(a, " <")
                              .concat(i, ".")
                              .concat(+o + 1, ".0-0")))
                        : (l = ">="
                              .concat(i, ".")
                              .concat(o, ".")
                              .concat(s, " <")
                              .concat(i, ".")
                              .concat(+o + 1, ".0-0")),
                    X("tilde return", l),
                    l
                );
            });
        },
        $A = (e, t) =>
            e
                .trim()
                .split(/\s+/)
                .map(r => kA(r, t))
                .join(" "),
        kA = (e, t) => {
            X("caret", e, t);
            let r = t.loose ? Pe[Se.CARETLOOSE] : Pe[Se.CARET],
                n = t.includePrerelease ? "-0" : "";
            return e.replace(r, (i, o, s, a, l) => {
                X("caret", e, i, o, s, a, l);
                let d;
                return (
                    Ce(o)
                        ? (d = "")
                        : Ce(s)
                        ? (d = ">="
                              .concat(o, ".0.0")
                              .concat(n, " <")
                              .concat(+o + 1, ".0.0-0"))
                        : Ce(a)
                        ? o === "0"
                            ? (d = ">="
                                  .concat(o, ".")
                                  .concat(s, ".0")
                                  .concat(n, " <")
                                  .concat(o, ".")
                                  .concat(+s + 1, ".0-0"))
                            : (d = ">="
                                  .concat(o, ".")
                                  .concat(s, ".0")
                                  .concat(n, " <")
                                  .concat(+o + 1, ".0.0-0"))
                        : l
                        ? (X("replaceCaret pr", l),
                          o === "0"
                              ? s === "0"
                                  ? (d = ">="
                                        .concat(o, ".")
                                        .concat(s, ".")
                                        .concat(a, "-")
                                        .concat(l, " <")
                                        .concat(o, ".")
                                        .concat(s, ".")
                                        .concat(+a + 1, "-0"))
                                  : (d = ">="
                                        .concat(o, ".")
                                        .concat(s, ".")
                                        .concat(a, "-")
                                        .concat(l, " <")
                                        .concat(o, ".")
                                        .concat(+s + 1, ".0-0"))
                              : (d = ">="
                                    .concat(o, ".")
                                    .concat(s, ".")
                                    .concat(a, "-")
                                    .concat(l, " <")
                                    .concat(+o + 1, ".0.0-0")))
                        : (X("no pr"),
                          o === "0"
                              ? s === "0"
                                  ? (d = ">="
                                        .concat(o, ".")
                                        .concat(s, ".")
                                        .concat(a)
                                        .concat(n, " <")
                                        .concat(o, ".")
                                        .concat(s, ".")
                                        .concat(+a + 1, "-0"))
                                  : (d = ">="
                                        .concat(o, ".")
                                        .concat(s, ".")
                                        .concat(a)
                                        .concat(n, " <")
                                        .concat(o, ".")
                                        .concat(+s + 1, ".0-0"))
                              : (d = ">="
                                    .concat(o, ".")
                                    .concat(s, ".")
                                    .concat(a, " <")
                                    .concat(+o + 1, ".0.0-0"))),
                    X("caret return", d),
                    d
                );
            });
        },
        MA = (e, t) => (
            X("replaceXRanges", e, t),
            e
                .split(/\s+/)
                .map(r => BA(r, t))
                .join(" ")
        ),
        BA = (e, t) => {
            e = e.trim();
            let r = t.loose ? Pe[Se.XRANGELOOSE] : Pe[Se.XRANGE];
            return e.replace(r, (n, i, o, s, a, l) => {
                X("xRange", e, n, i, o, s, a, l);
                let d = Ce(o),
                    c = d || Ce(s),
                    f = c || Ce(a),
                    m = f;
                return (
                    i === "=" && m && (i = ""),
                    (l = t.includePrerelease ? "-0" : ""),
                    d
                        ? i === ">" || i === "<"
                            ? (n = "<0.0.0-0")
                            : (n = "*")
                        : i && m
                        ? (c && (s = 0),
                          (a = 0),
                          i === ">"
                              ? ((i = ">="), c ? ((o = +o + 1), (s = 0), (a = 0)) : ((s = +s + 1), (a = 0)))
                              : i === "<=" && ((i = "<"), c ? (o = +o + 1) : (s = +s + 1)),
                          i === "<" && (l = "-0"),
                          (n = ""
                              .concat(i + o, ".")
                              .concat(s, ".")
                              .concat(a)
                              .concat(l)))
                        : c
                        ? (n = ">="
                              .concat(o, ".0.0")
                              .concat(l, " <")
                              .concat(+o + 1, ".0.0-0"))
                        : f &&
                          (n = ">="
                              .concat(o, ".")
                              .concat(s, ".0")
                              .concat(l, " <")
                              .concat(o, ".")
                              .concat(+s + 1, ".0-0")),
                    X("xRange return", n),
                    n
                );
            });
        },
        HA = (e, t) => (X("replaceStars", e, t), e.trim().replace(Pe[Se.STAR], "")),
        jA = (e, t) => (X("replaceGTE0", e, t), e.trim().replace(Pe[t.includePrerelease ? Se.GTE0PRE : Se.GTE0], "")),
        WA = e => (t, r, n, i, o, s, a, l, d, c, f, m) => (
            Ce(n)
                ? (r = "")
                : Ce(i)
                ? (r = ">=".concat(n, ".0.0").concat(e ? "-0" : ""))
                : Ce(o)
                ? (r = ">="
                      .concat(n, ".")
                      .concat(i, ".0")
                      .concat(e ? "-0" : ""))
                : s
                ? (r = ">=".concat(r))
                : (r = ">=".concat(r).concat(e ? "-0" : "")),
            Ce(d)
                ? (l = "")
                : Ce(c)
                ? (l = "<".concat(+d + 1, ".0.0-0"))
                : Ce(f)
                ? (l = "<".concat(d, ".").concat(+c + 1, ".0-0"))
                : m
                ? (l = "<=".concat(d, ".").concat(c, ".").concat(f, "-").concat(m))
                : e
                ? (l = "<"
                      .concat(d, ".")
                      .concat(c, ".")
                      .concat(+f + 1, "-0"))
                : (l = "<=".concat(l)),
            "".concat(r, " ").concat(l).trim()
        ),
        GA = (e, t, r) => {
            for (let n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
            if (t.prerelease.length && !r.includePrerelease) {
                for (let n = 0; n < e.length; n++)
                    if ((X(e[n].semver), e[n].semver !== Ps.ANY && e[n].semver.prerelease.length > 0)) {
                        let i = e[n].semver;
                        if (i.major === t.major && i.minor === t.minor && i.patch === t.patch) return !0;
                    }
                return !1;
            }
            return !0;
        };
});
var nn = g((gN, Sd) => {
    var on = Symbol("SemVer ANY"),
        qs = class e {
            static get ANY() {
                return on;
            }
            constructor(t, r) {
                if (((r = yd(r)), t instanceof e)) {
                    if (t.loose === !!r.loose) return t;
                    t = t.value;
                }
                (t = t.trim().split(/\s+/).join(" ")),
                    Fs("comparator", t, r),
                    (this.options = r),
                    (this.loose = !!r.loose),
                    this.parse(t),
                    this.semver === on ? (this.value = "") : (this.value = this.operator + this.semver.version),
                    Fs("comp", this);
            }
            parse(t) {
                let r = this.options.loose ? Ed[_d.COMPARATORLOOSE] : Ed[_d.COMPARATOR],
                    n = t.match(r);
                if (!n) throw new TypeError("Invalid comparator: ".concat(t));
                (this.operator = n[1] !== void 0 ? n[1] : ""),
                    this.operator === "=" && (this.operator = ""),
                    n[2] ? (this.semver = new vd(n[2], this.options.loose)) : (this.semver = on);
            }
            toString() {
                return this.value;
            }
            test(t) {
                if ((Fs("Comparator.test", t, this.options.loose), this.semver === on || t === on)) return !0;
                if (typeof t == "string")
                    try {
                        t = new vd(t, this.options);
                    } catch {
                        return !1;
                    }
                return Ds(t, this.operator, this.semver, this.options);
            }
            intersects(t, r) {
                if (!(t instanceof e)) throw new TypeError("a Comparator is required");
                return this.operator === ""
                    ? this.value === ""
                        ? !0
                        : new Ad(t.value, r).test(this.value)
                    : t.operator === ""
                    ? t.value === ""
                        ? !0
                        : new Ad(this.value, r).test(t.semver)
                    : ((r = yd(r)),
                      (r.includePrerelease && (this.value === "<0.0.0-0" || t.value === "<0.0.0-0")) ||
                      (!r.includePrerelease && (this.value.startsWith("<0.0.0") || t.value.startsWith("<0.0.0")))
                          ? !1
                          : !!(
                                (this.operator.startsWith(">") && t.operator.startsWith(">")) ||
                                (this.operator.startsWith("<") && t.operator.startsWith("<")) ||
                                (this.semver.version === t.semver.version &&
                                    this.operator.includes("=") &&
                                    t.operator.includes("=")) ||
                                (Ds(this.semver, "<", t.semver, r) &&
                                    this.operator.startsWith(">") &&
                                    t.operator.startsWith("<")) ||
                                (Ds(this.semver, ">", t.semver, r) && this.operator.startsWith("<") && t.operator.startsWith(">"))
                            ));
            }
        };
    Sd.exports = qs;
    var yd = fi(),
        { safeRe: Ed, t: _d } = lr(),
        Ds = Is(),
        Fs = tn(),
        vd = we(),
        Ad = $e();
});
var sn = g((wN, Cd) => {
    var VA = $e(),
        YA = (e, t, r) => {
            try {
                t = new VA(t, r);
            } catch {
                return !1;
            }
            return t.test(e);
        };
    Cd.exports = YA;
});
var bd = g((yN, Td) => {
    var zA = $e(),
        XA = (e, t) =>
            new zA(e, t).set.map(r =>
                r
                    .map(n => n.value)
                    .join(" ")
                    .trim()
                    .split(" ")
            );
    Td.exports = XA;
});
var xd = g((EN, Od) => {
    var JA = we(),
        KA = $e(),
        QA = (e, t, r) => {
            let n = null,
                i = null,
                o = null;
            try {
                o = new KA(t, r);
            } catch {
                return null;
            }
            return (
                e.forEach(s => {
                    o.test(s) && (!n || i.compare(s) === -1) && ((n = s), (i = new JA(n, r)));
                }),
                n
            );
        };
    Od.exports = QA;
});
var Nd = g((_N, Id) => {
    var ZA = we(),
        eS = $e(),
        tS = (e, t, r) => {
            let n = null,
                i = null,
                o = null;
            try {
                o = new eS(t, r);
            } catch {
                return null;
            }
            return (
                e.forEach(s => {
                    o.test(s) && (!n || i.compare(s) === 1) && ((n = s), (i = new ZA(n, r)));
                }),
                n
            );
        };
    Id.exports = tS;
});
var Dd = g((vN, Pd) => {
    var Ls = we(),
        rS = $e(),
        Rd = rn(),
        nS = (e, t) => {
            e = new rS(e, t);
            let r = new Ls("0.0.0");
            if (e.test(r) || ((r = new Ls("0.0.0-0")), e.test(r))) return r;
            r = null;
            for (let n = 0; n < e.set.length; ++n) {
                let i = e.set[n],
                    o = null;
                i.forEach(s => {
                    let a = new Ls(s.semver.version);
                    switch (s.operator) {
                        case ">":
                            a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), (a.raw = a.format());
                        case "":
                        case ">=":
                            (!o || Rd(a, o)) && (o = a);
                            break;
                        case "<":
                        case "<=":
                            break;
                        default:
                            throw new Error("Unexpected operation: ".concat(s.operator));
                    }
                }),
                    o && (!r || Rd(r, o)) && (r = o);
            }
            return r && e.test(r) ? r : null;
        };
    Pd.exports = nS;
});
var qd = g((AN, Fd) => {
    var iS = $e(),
        oS = (e, t) => {
            try {
                return new iS(e, t).range || "*";
            } catch {
                return null;
            }
        };
    Fd.exports = oS;
});
var vi = g((SN, kd) => {
    var sS = we(),
        $d = nn(),
        { ANY: aS } = $d,
        lS = $e(),
        uS = sn(),
        Ld = rn(),
        Ud = gi(),
        cS = yi(),
        fS = wi(),
        hS = (e, t, r, n) => {
            (e = new sS(e, n)), (t = new lS(t, n));
            let i, o, s, a, l;
            switch (r) {
                case ">":
                    (i = Ld), (o = cS), (s = Ud), (a = ">"), (l = ">=");
                    break;
                case "<":
                    (i = Ud), (o = fS), (s = Ld), (a = "<"), (l = "<=");
                    break;
                default:
                    throw new TypeError('Must provide a hilo val of "<" or ">"');
            }
            if (uS(e, t, n)) return !1;
            for (let d = 0; d < t.set.length; ++d) {
                let c = t.set[d],
                    f = null,
                    m = null;
                if (
                    (c.forEach(p => {
                        p.semver === aS && (p = new $d(">=0.0.0")),
                            (f = f || p),
                            (m = m || p),
                            i(p.semver, f.semver, n) ? (f = p) : s(p.semver, m.semver, n) && (m = p);
                    }),
                    f.operator === a || f.operator === l || ((!m.operator || m.operator === a) && o(e, m.semver)))
                )
                    return !1;
                if (m.operator === l && s(e, m.semver)) return !1;
            }
            return !0;
        };
    kd.exports = hS;
});
var Bd = g((CN, Md) => {
    var dS = vi(),
        pS = (e, t, r) => dS(e, t, ">", r);
    Md.exports = pS;
});
var jd = g((TN, Hd) => {
    var mS = vi(),
        gS = (e, t, r) => mS(e, t, "<", r);
    Hd.exports = gS;
});
var Vd = g((bN, Gd) => {
    var Wd = $e(),
        wS = (e, t, r) => ((e = new Wd(e, r)), (t = new Wd(t, r)), e.intersects(t, r));
    Gd.exports = wS;
});
var zd = g((ON, Yd) => {
    var yS = sn(),
        ES = Ue();
    Yd.exports = (e, t, r) => {
        let n = [],
            i = null,
            o = null,
            s = e.sort((c, f) => ES(c, f, r));
        for (let c of s) yS(c, t, r) ? ((o = c), i || (i = c)) : (o && n.push([i, o]), (o = null), (i = null));
        i && n.push([i, null]);
        let a = [];
        for (let [c, f] of n)
            c === f
                ? a.push(c)
                : !f && c === s[0]
                ? a.push("*")
                : f
                ? c === s[0]
                    ? a.push("<=".concat(f))
                    : a.push("".concat(c, " - ").concat(f))
                : a.push(">=".concat(c));
        let l = a.join(" || "),
            d = typeof t.raw == "string" ? t.raw : String(t);
        return l.length < d.length ? l : t;
    };
});
var ep = g((xN, Zd) => {
    var Xd = $e(),
        $s = nn(),
        { ANY: Us } = $s,
        an = sn(),
        ks = Ue(),
        _S = (e, t, r = {}) => {
            if (e === t) return !0;
            (e = new Xd(e, r)), (t = new Xd(t, r));
            let n = !1;
            e: for (let i of e.set) {
                for (let o of t.set) {
                    let s = AS(i, o, r);
                    if (((n = n || s !== null), s)) continue e;
                }
                if (n) return !1;
            }
            return !0;
        },
        vS = [new $s(">=0.0.0-0")],
        Jd = [new $s(">=0.0.0")],
        AS = (e, t, r) => {
            if (e === t) return !0;
            if (e.length === 1 && e[0].semver === Us) {
                if (t.length === 1 && t[0].semver === Us) return !0;
                r.includePrerelease ? (e = vS) : (e = Jd);
            }
            if (t.length === 1 && t[0].semver === Us) {
                if (r.includePrerelease) return !0;
                t = Jd;
            }
            let n = new Set(),
                i,
                o;
            for (let p of e)
                p.operator === ">" || p.operator === ">="
                    ? (i = Kd(i, p, r))
                    : p.operator === "<" || p.operator === "<="
                    ? (o = Qd(o, p, r))
                    : n.add(p.semver);
            if (n.size > 1) return null;
            let s;
            if (i && o) {
                if (((s = ks(i.semver, o.semver, r)), s > 0)) return null;
                if (s === 0 && (i.operator !== ">=" || o.operator !== "<=")) return null;
            }
            for (let p of n) {
                if ((i && !an(p, String(i), r)) || (o && !an(p, String(o), r))) return null;
                for (let E of t) if (!an(p, String(E), r)) return !1;
                return !0;
            }
            let a,
                l,
                d,
                c,
                f = o && !r.includePrerelease && o.semver.prerelease.length ? o.semver : !1,
                m = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
            f && f.prerelease.length === 1 && o.operator === "<" && f.prerelease[0] === 0 && (f = !1);
            for (let p of t) {
                if (
                    ((c = c || p.operator === ">" || p.operator === ">="),
                    (d = d || p.operator === "<" || p.operator === "<="),
                    i)
                ) {
                    if (
                        (m &&
                            p.semver.prerelease &&
                            p.semver.prerelease.length &&
                            p.semver.major === m.major &&
                            p.semver.minor === m.minor &&
                            p.semver.patch === m.patch &&
                            (m = !1),
                        p.operator === ">" || p.operator === ">=")
                    ) {
                        if (((a = Kd(i, p, r)), a === p && a !== i)) return !1;
                    } else if (i.operator === ">=" && !an(i.semver, String(p), r)) return !1;
                }
                if (o) {
                    if (
                        (f &&
                            p.semver.prerelease &&
                            p.semver.prerelease.length &&
                            p.semver.major === f.major &&
                            p.semver.minor === f.minor &&
                            p.semver.patch === f.patch &&
                            (f = !1),
                        p.operator === "<" || p.operator === "<=")
                    ) {
                        if (((l = Qd(o, p, r)), l === p && l !== o)) return !1;
                    } else if (o.operator === "<=" && !an(o.semver, String(p), r)) return !1;
                }
                if (!p.operator && (o || i) && s !== 0) return !1;
            }
            return !((i && d && !o && s !== 0) || (o && c && !i && s !== 0) || m || f);
        },
        Kd = (e, t, r) => {
            if (!e) return t;
            let n = ks(e.semver, t.semver, r);
            return n > 0 ? e : n < 0 || (t.operator === ">" && e.operator === ">=") ? t : e;
        },
        Qd = (e, t, r) => {
            if (!e) return t;
            let n = ks(e.semver, t.semver, r);
            return n < 0 ? e : n > 0 || (t.operator === "<" && e.operator === "<=") ? t : e;
        };
    Zd.exports = _S;
});
var Bs = g((IN, np) => {
    var Ms = lr(),
        tp = en(),
        SS = we(),
        rp = Ts(),
        CS = Dt(),
        TS = xh(),
        bS = Nh(),
        OS = Dh(),
        xS = Lh(),
        IS = $h(),
        NS = Mh(),
        RS = Hh(),
        PS = Wh(),
        DS = Ue(),
        FS = zh(),
        qS = Jh(),
        LS = mi(),
        US = ed(),
        $S = rd(),
        kS = rn(),
        MS = gi(),
        BS = Os(),
        HS = xs(),
        jS = wi(),
        WS = yi(),
        GS = Is(),
        VS = fd(),
        YS = nn(),
        zS = $e(),
        XS = sn(),
        JS = bd(),
        KS = xd(),
        QS = Nd(),
        ZS = Dd(),
        eC = qd(),
        tC = vi(),
        rC = Bd(),
        nC = jd(),
        iC = Vd(),
        oC = zd(),
        sC = ep();
    np.exports = {
        parse: CS,
        valid: TS,
        clean: bS,
        inc: OS,
        diff: xS,
        major: IS,
        minor: NS,
        patch: RS,
        prerelease: PS,
        compare: DS,
        rcompare: FS,
        compareLoose: qS,
        compareBuild: LS,
        sort: US,
        rsort: $S,
        gt: kS,
        lt: MS,
        eq: BS,
        neq: HS,
        gte: jS,
        lte: WS,
        cmp: GS,
        coerce: VS,
        Comparator: YS,
        Range: zS,
        satisfies: XS,
        toComparators: JS,
        maxSatisfying: KS,
        minSatisfying: QS,
        minVersion: ZS,
        validRange: eC,
        outside: tC,
        gtr: rC,
        ltr: nC,
        intersects: iC,
        simplifyRange: oC,
        subset: sC,
        SemVer: SS,
        re: Ms.re,
        src: Ms.src,
        tokens: Ms.t,
        SEMVER_SPEC_VERSION: tp.SEMVER_SPEC_VERSION,
        RELEASE_TYPES: tp.RELEASE_TYPES,
        compareIdentifiers: rp.compareIdentifiers,
        rcompareIdentifiers: rp.rcompareIdentifiers
    };
});
var $p = g((ln, fr) => {
    var aC = 200,
        Qs = "__lodash_hash_undefined__",
        Ii = 1,
        mp = 2,
        gp = 9007199254740991,
        Ai = "[object Arguments]",
        Gs = "[object Array]",
        lC = "[object AsyncFunction]",
        wp = "[object Boolean]",
        yp = "[object Date]",
        Ep = "[object Error]",
        _p = "[object Function]",
        uC = "[object GeneratorFunction]",
        Si = "[object Map]",
        vp = "[object Number]",
        cC = "[object Null]",
        cr = "[object Object]",
        ip = "[object Promise]",
        fC = "[object Proxy]",
        Ap = "[object RegExp]",
        Ci = "[object Set]",
        Sp = "[object String]",
        hC = "[object Symbol]",
        dC = "[object Undefined]",
        Vs = "[object WeakMap]",
        Cp = "[object ArrayBuffer]",
        Ti = "[object DataView]",
        pC = "[object Float32Array]",
        mC = "[object Float64Array]",
        gC = "[object Int8Array]",
        wC = "[object Int16Array]",
        yC = "[object Int32Array]",
        EC = "[object Uint8Array]",
        _C = "[object Uint8ClampedArray]",
        vC = "[object Uint16Array]",
        AC = "[object Uint32Array]",
        SC = /[\\^$.*+?()[\]{}|]/g,
        CC = /^\[object .+?Constructor\]$/,
        TC = /^(?:0|[1-9]\d*)$/,
        J = {};
    J[pC] = J[mC] = J[gC] = J[wC] = J[yC] = J[EC] = J[_C] = J[vC] = J[AC] = !0;
    J[Ai] = J[Gs] = J[Cp] = J[wp] = J[Ti] = J[yp] = J[Ep] = J[_p] = J[Si] = J[vp] = J[cr] = J[Ap] = J[Ci] = J[Sp] = J[Vs] = !1;
    var Tp = typeof global == "object" && global && global.Object === Object && global,
        bC = typeof self == "object" && self && self.Object === Object && self,
        et = Tp || bC || Function("return this")(),
        bp = typeof ln == "object" && ln && !ln.nodeType && ln,
        op = bp && typeof fr == "object" && fr && !fr.nodeType && fr,
        Op = op && op.exports === bp,
        Hs = Op && Tp.process,
        sp = (function () {
            try {
                return Hs && Hs.binding && Hs.binding("util");
            } catch {}
        })(),
        ap = sp && sp.isTypedArray;
    function OC(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
            var s = e[r];
            t(s, r, e) && (o[i++] = s);
        }
        return o;
    }
    function xC(e, t) {
        for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
        return e;
    }
    function IC(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length; ++r < n; ) if (t(e[r], r, e)) return !0;
        return !1;
    }
    function NC(e, t) {
        for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
        return n;
    }
    function RC(e) {
        return function (t) {
            return e(t);
        };
    }
    function PC(e, t) {
        return e.has(t);
    }
    function DC(e, t) {
        return e?.[t];
    }
    function FC(e) {
        var t = -1,
            r = Array(e.size);
        return (
            e.forEach(function (n, i) {
                r[++t] = [i, n];
            }),
            r
        );
    }
    function qC(e, t) {
        return function (r) {
            return e(t(r));
        };
    }
    function LC(e) {
        var t = -1,
            r = Array(e.size);
        return (
            e.forEach(function (n) {
                r[++t] = n;
            }),
            r
        );
    }
    var UC = Array.prototype,
        $C = Function.prototype,
        Ni = Object.prototype,
        js = et["__core-js_shared__"],
        xp = $C.toString,
        ze = Ni.hasOwnProperty,
        lp = (function () {
            var e = /[^.]+$/.exec((js && js.keys && js.keys.IE_PROTO) || "");
            return e ? "Symbol(src)_1." + e : "";
        })(),
        Ip = Ni.toString,
        kC = RegExp(
            "^" +
                xp
                    .call(ze)
                    .replace(SC, "\\$&")
                    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") +
                "$"
        ),
        up = Op ? et.Buffer : void 0,
        bi = et.Symbol,
        cp = et.Uint8Array,
        Np = Ni.propertyIsEnumerable,
        MC = UC.splice,
        Ft = bi ? bi.toStringTag : void 0,
        fp = Object.getOwnPropertySymbols,
        BC = up ? up.isBuffer : void 0,
        HC = qC(Object.keys, Object),
        Ys = hr(et, "DataView"),
        un = hr(et, "Map"),
        zs = hr(et, "Promise"),
        Xs = hr(et, "Set"),
        Js = hr(et, "WeakMap"),
        cn = hr(Object, "create"),
        jC = Ut(Ys),
        WC = Ut(un),
        GC = Ut(zs),
        VC = Ut(Xs),
        YC = Ut(Js),
        hp = bi ? bi.prototype : void 0,
        Ws = hp ? hp.valueOf : void 0;
    function qt(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function zC() {
        (this.__data__ = cn ? cn(null) : {}), (this.size = 0);
    }
    function XC(e) {
        var t = this.has(e) && delete this.__data__[e];
        return (this.size -= t ? 1 : 0), t;
    }
    function JC(e) {
        var t = this.__data__;
        if (cn) {
            var r = t[e];
            return r === Qs ? void 0 : r;
        }
        return ze.call(t, e) ? t[e] : void 0;
    }
    function KC(e) {
        var t = this.__data__;
        return cn ? t[e] !== void 0 : ze.call(t, e);
    }
    function QC(e, t) {
        var r = this.__data__;
        return (this.size += this.has(e) ? 0 : 1), (r[e] = cn && t === void 0 ? Qs : t), this;
    }
    qt.prototype.clear = zC;
    qt.prototype.delete = XC;
    qt.prototype.get = JC;
    qt.prototype.has = KC;
    qt.prototype.set = QC;
    function tt(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function ZC() {
        (this.__data__ = []), (this.size = 0);
    }
    function eT(e) {
        var t = this.__data__,
            r = Ri(t, e);
        if (r < 0) return !1;
        var n = t.length - 1;
        return r == n ? t.pop() : MC.call(t, r, 1), --this.size, !0;
    }
    function tT(e) {
        var t = this.__data__,
            r = Ri(t, e);
        return r < 0 ? void 0 : t[r][1];
    }
    function rT(e) {
        return Ri(this.__data__, e) > -1;
    }
    function nT(e, t) {
        var r = this.__data__,
            n = Ri(r, e);
        return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    tt.prototype.clear = ZC;
    tt.prototype.delete = eT;
    tt.prototype.get = tT;
    tt.prototype.has = rT;
    tt.prototype.set = nT;
    function Lt(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function iT() {
        (this.size = 0), (this.__data__ = { hash: new qt(), map: new (un || tt)(), string: new qt() });
    }
    function oT(e) {
        var t = Pi(this, e).delete(e);
        return (this.size -= t ? 1 : 0), t;
    }
    function sT(e) {
        return Pi(this, e).get(e);
    }
    function aT(e) {
        return Pi(this, e).has(e);
    }
    function lT(e, t) {
        var r = Pi(this, e),
            n = r.size;
        return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    Lt.prototype.clear = iT;
    Lt.prototype.delete = oT;
    Lt.prototype.get = sT;
    Lt.prototype.has = aT;
    Lt.prototype.set = lT;
    function Oi(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.__data__ = new Lt(); ++t < r; ) this.add(e[t]);
    }
    function uT(e) {
        return this.__data__.set(e, Qs), this;
    }
    function cT(e) {
        return this.__data__.has(e);
    }
    Oi.prototype.add = Oi.prototype.push = uT;
    Oi.prototype.has = cT;
    function mt(e) {
        var t = (this.__data__ = new tt(e));
        this.size = t.size;
    }
    function fT() {
        (this.__data__ = new tt()), (this.size = 0);
    }
    function hT(e) {
        var t = this.__data__,
            r = t.delete(e);
        return (this.size = t.size), r;
    }
    function dT(e) {
        return this.__data__.get(e);
    }
    function pT(e) {
        return this.__data__.has(e);
    }
    function mT(e, t) {
        var r = this.__data__;
        if (r instanceof tt) {
            var n = r.__data__;
            if (!un || n.length < aC - 1) return n.push([e, t]), (this.size = ++r.size), this;
            r = this.__data__ = new Lt(n);
        }
        return r.set(e, t), (this.size = r.size), this;
    }
    mt.prototype.clear = fT;
    mt.prototype.delete = hT;
    mt.prototype.get = dT;
    mt.prototype.has = pT;
    mt.prototype.set = mT;
    function gT(e, t) {
        var r = xi(e),
            n = !r && RT(e),
            i = !r && !n && Ks(e),
            o = !r && !n && !i && Up(e),
            s = r || n || i || o,
            a = s ? NC(e.length, String) : [],
            l = a.length;
        for (var d in e)
            (t || ze.call(e, d)) &&
                !(
                    s &&
                    (d == "length" ||
                        (i && (d == "offset" || d == "parent")) ||
                        (o && (d == "buffer" || d == "byteLength" || d == "byteOffset")) ||
                        bT(d, l))
                ) &&
                a.push(d);
        return a;
    }
    function Ri(e, t) {
        for (var r = e.length; r--; ) if (Dp(e[r][0], t)) return r;
        return -1;
    }
    function wT(e, t, r) {
        var n = t(e);
        return xi(e) ? n : xC(n, r(e));
    }
    function hn(e) {
        return e == null ? (e === void 0 ? dC : cC) : Ft && Ft in Object(e) ? CT(e) : NT(e);
    }
    function dp(e) {
        return fn(e) && hn(e) == Ai;
    }
    function Rp(e, t, r, n, i) {
        return e === t ? !0 : e == null || t == null || (!fn(e) && !fn(t)) ? e !== e && t !== t : yT(e, t, r, n, Rp, i);
    }
    function yT(e, t, r, n, i, o) {
        var s = xi(e),
            a = xi(t),
            l = s ? Gs : pt(e),
            d = a ? Gs : pt(t);
        (l = l == Ai ? cr : l), (d = d == Ai ? cr : d);
        var c = l == cr,
            f = d == cr,
            m = l == d;
        if (m && Ks(e)) {
            if (!Ks(t)) return !1;
            (s = !0), (c = !1);
        }
        if (m && !c) return o || (o = new mt()), s || Up(e) ? Pp(e, t, r, n, i, o) : AT(e, t, l, r, n, i, o);
        if (!(r & Ii)) {
            var p = c && ze.call(e, "__wrapped__"),
                E = f && ze.call(t, "__wrapped__");
            if (p || E) {
                var _ = p ? e.value() : e,
                    A = E ? t.value() : t;
                return o || (o = new mt()), i(_, A, r, n, o);
            }
        }
        return m ? (o || (o = new mt()), ST(e, t, r, n, i, o)) : !1;
    }
    function ET(e) {
        if (!Lp(e) || xT(e)) return !1;
        var t = Fp(e) ? kC : CC;
        return t.test(Ut(e));
    }
    function _T(e) {
        return fn(e) && qp(e.length) && !!J[hn(e)];
    }
    function vT(e) {
        if (!IT(e)) return HC(e);
        var t = [];
        for (var r in Object(e)) ze.call(e, r) && r != "constructor" && t.push(r);
        return t;
    }
    function Pp(e, t, r, n, i, o) {
        var s = r & Ii,
            a = e.length,
            l = t.length;
        if (a != l && !(s && l > a)) return !1;
        var d = o.get(e);
        if (d && o.get(t)) return d == t;
        var c = -1,
            f = !0,
            m = r & mp ? new Oi() : void 0;
        for (o.set(e, t), o.set(t, e); ++c < a; ) {
            var p = e[c],
                E = t[c];
            if (n) var _ = s ? n(E, p, c, t, e, o) : n(p, E, c, e, t, o);
            if (_ !== void 0) {
                if (_) continue;
                f = !1;
                break;
            }
            if (m) {
                if (
                    !IC(t, function (A, T) {
                        if (!PC(m, T) && (p === A || i(p, A, r, n, o))) return m.push(T);
                    })
                ) {
                    f = !1;
                    break;
                }
            } else if (!(p === E || i(p, E, r, n, o))) {
                f = !1;
                break;
            }
        }
        return o.delete(e), o.delete(t), f;
    }
    function AT(e, t, r, n, i, o, s) {
        switch (r) {
            case Ti:
                if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
                (e = e.buffer), (t = t.buffer);
            case Cp:
                return !(e.byteLength != t.byteLength || !o(new cp(e), new cp(t)));
            case wp:
            case yp:
            case vp:
                return Dp(+e, +t);
            case Ep:
                return e.name == t.name && e.message == t.message;
            case Ap:
            case Sp:
                return e == t + "";
            case Si:
                var a = FC;
            case Ci:
                var l = n & Ii;
                if ((a || (a = LC), e.size != t.size && !l)) return !1;
                var d = s.get(e);
                if (d) return d == t;
                (n |= mp), s.set(e, t);
                var c = Pp(a(e), a(t), n, i, o, s);
                return s.delete(e), c;
            case hC:
                if (Ws) return Ws.call(e) == Ws.call(t);
        }
        return !1;
    }
    function ST(e, t, r, n, i, o) {
        var s = r & Ii,
            a = pp(e),
            l = a.length,
            d = pp(t),
            c = d.length;
        if (l != c && !s) return !1;
        for (var f = l; f--; ) {
            var m = a[f];
            if (!(s ? m in t : ze.call(t, m))) return !1;
        }
        var p = o.get(e);
        if (p && o.get(t)) return p == t;
        var E = !0;
        o.set(e, t), o.set(t, e);
        for (var _ = s; ++f < l; ) {
            m = a[f];
            var A = e[m],
                T = t[m];
            if (n) var C = s ? n(T, A, m, t, e, o) : n(A, T, m, e, t, o);
            if (!(C === void 0 ? A === T || i(A, T, r, n, o) : C)) {
                E = !1;
                break;
            }
            _ || (_ = m == "constructor");
        }
        if (E && !_) {
            var N = e.constructor,
                L = t.constructor;
            N != L &&
                "constructor" in e &&
                "constructor" in t &&
                !(typeof N == "function" && N instanceof N && typeof L == "function" && L instanceof L) &&
                (E = !1);
        }
        return o.delete(e), o.delete(t), E;
    }
    function pp(e) {
        return wT(e, FT, TT);
    }
    function Pi(e, t) {
        var r = e.__data__;
        return OT(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    function hr(e, t) {
        var r = DC(e, t);
        return ET(r) ? r : void 0;
    }
    function CT(e) {
        var t = ze.call(e, Ft),
            r = e[Ft];
        try {
            e[Ft] = void 0;
            var n = !0;
        } catch {}
        var i = Ip.call(e);
        return n && (t ? (e[Ft] = r) : delete e[Ft]), i;
    }
    var TT = fp
            ? function (e) {
                  return e == null
                      ? []
                      : ((e = Object(e)),
                        OC(fp(e), function (t) {
                            return Np.call(e, t);
                        }));
              }
            : qT,
        pt = hn;
    ((Ys && pt(new Ys(new ArrayBuffer(1))) != Ti) ||
        (un && pt(new un()) != Si) ||
        (zs && pt(zs.resolve()) != ip) ||
        (Xs && pt(new Xs()) != Ci) ||
        (Js && pt(new Js()) != Vs)) &&
        (pt = function (e) {
            var t = hn(e),
                r = t == cr ? e.constructor : void 0,
                n = r ? Ut(r) : "";
            if (n)
                switch (n) {
                    case jC:
                        return Ti;
                    case WC:
                        return Si;
                    case GC:
                        return ip;
                    case VC:
                        return Ci;
                    case YC:
                        return Vs;
                }
            return t;
        });
    function bT(e, t) {
        return (t = t ?? gp), !!t && (typeof e == "number" || TC.test(e)) && e > -1 && e % 1 == 0 && e < t;
    }
    function OT(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
    }
    function xT(e) {
        return !!lp && lp in e;
    }
    function IT(e) {
        var t = e && e.constructor,
            r = (typeof t == "function" && t.prototype) || Ni;
        return e === r;
    }
    function NT(e) {
        return Ip.call(e);
    }
    function Ut(e) {
        if (e != null) {
            try {
                return xp.call(e);
            } catch {}
            try {
                return e + "";
            } catch {}
        }
        return "";
    }
    function Dp(e, t) {
        return e === t || (e !== e && t !== t);
    }
    var RT = dp(
            (function () {
                return arguments;
            })()
        )
            ? dp
            : function (e) {
                  return fn(e) && ze.call(e, "callee") && !Np.call(e, "callee");
              },
        xi = Array.isArray;
    function PT(e) {
        return e != null && qp(e.length) && !Fp(e);
    }
    var Ks = BC || LT;
    function DT(e, t) {
        return Rp(e, t);
    }
    function Fp(e) {
        if (!Lp(e)) return !1;
        var t = hn(e);
        return t == _p || t == uC || t == lC || t == fC;
    }
    function qp(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= gp;
    }
    function Lp(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
    }
    function fn(e) {
        return e != null && typeof e == "object";
    }
    var Up = ap ? RC(ap) : _T;
    function FT(e) {
        return PT(e) ? gT(e) : vT(e);
    }
    function qT() {
        return [];
    }
    function LT() {
        return !1;
    }
    fr.exports = DT;
});
var Mp = g(pn => {
    "use strict";
    Object.defineProperty(pn, "__esModule", { value: !0 });
    pn.DownloadedUpdateHelper = void 0;
    pn.createTempUpdateFile = MT;
    var UT = require("crypto"),
        $T = require("fs"),
        kp = $p(),
        $t = Qe(),
        dn = require("path"),
        Zs = class {
            constructor(t) {
                (this.cacheDir = t),
                    (this._file = null),
                    (this._packageFile = null),
                    (this.versionInfo = null),
                    (this.fileInfo = null),
                    (this._downloadedFileInfo = null);
            }
            get downloadedFileInfo() {
                return this._downloadedFileInfo;
            }
            get file() {
                return this._file;
            }
            get packageFile() {
                return this._packageFile;
            }
            get cacheDirForPendingUpdate() {
                return dn.join(this.cacheDir, "pending");
            }
            async validateDownloadedPath(t, r, n, i) {
                if (this.versionInfo != null && this.file === t && this.fileInfo != null)
                    return kp(this.versionInfo, r) && kp(this.fileInfo.info, n.info) && (await (0, $t.pathExists)(t)) ? t : null;
                let o = await this.getValidCachedUpdateFile(n, i);
                return o === null
                    ? null
                    : (i.info("Update has already been downloaded to ".concat(t, ").")), (this._file = o), o);
            }
            async setDownloadedFile(t, r, n, i, o, s) {
                (this._file = t),
                    (this._packageFile = r),
                    (this.versionInfo = n),
                    (this.fileInfo = i),
                    (this._downloadedFileInfo = {
                        fileName: o,
                        sha512: i.info.sha512,
                        isAdminRightsRequired: i.info.isAdminRightsRequired === !0
                    }),
                    s && (await (0, $t.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo));
            }
            async clear() {
                (this._file = null),
                    (this._packageFile = null),
                    (this.versionInfo = null),
                    (this.fileInfo = null),
                    await this.cleanCacheDirForPendingUpdate();
            }
            async cleanCacheDirForPendingUpdate() {
                try {
                    await (0, $t.emptyDir)(this.cacheDirForPendingUpdate);
                } catch {}
            }
            async getValidCachedUpdateFile(t, r) {
                let n = this.getUpdateInfoFile();
                if (!(await (0, $t.pathExists)(n))) return null;
                let o;
                try {
                    o = await (0, $t.readJson)(n);
                } catch (d) {
                    let c = "No cached update info available";
                    return (
                        d.code !== "ENOENT" &&
                            (await this.cleanCacheDirForPendingUpdate(), (c += " (error on read: ".concat(d.message, ")"))),
                        r.info(c),
                        null
                    );
                }
                if (!(o?.fileName !== null))
                    return (
                        r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"),
                        await this.cleanCacheDirForPendingUpdate(),
                        null
                    );
                if (t.info.sha512 !== o.sha512)
                    return (
                        r.info(
                            "Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: "
                                .concat(o.sha512, ", expected: ")
                                .concat(t.info.sha512, ". Directory for cached update will be cleaned")
                        ),
                        await this.cleanCacheDirForPendingUpdate(),
                        null
                    );
                let a = dn.join(this.cacheDirForPendingUpdate, o.fileName);
                if (!(await (0, $t.pathExists)(a))) return r.info("Cached update file doesn't exist"), null;
                let l = await kT(a);
                return t.info.sha512 !== l
                    ? (r.warn(
                          "Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: "
                              .concat(l, ", expected: ")
                              .concat(t.info.sha512)
                      ),
                      await this.cleanCacheDirForPendingUpdate(),
                      null)
                    : ((this._downloadedFileInfo = o), a);
            }
            getUpdateInfoFile() {
                return dn.join(this.cacheDirForPendingUpdate, "update-info.json");
            }
        };
    pn.DownloadedUpdateHelper = Zs;
    function kT(e, t = "sha512", r = "base64", n) {
        return new Promise((i, o) => {
            let s = (0, UT.createHash)(t);
            s.on("error", o).setEncoding(r),
                (0, $T.createReadStream)(e, { ...n, highWaterMark: 1024 * 1024 })
                    .on("error", o)
                    .on("end", () => {
                        s.end(), i(s.read());
                    })
                    .pipe(s, { end: !1 });
        });
    }
    async function MT(e, t, r) {
        let n = 0,
            i = dn.join(t, e);
        for (let o = 0; o < 3; o++)
            try {
                return await (0, $t.unlink)(i), i;
            } catch (s) {
                if (s.code === "ENOENT") return i;
                r.warn("Error on remove temp update file: ".concat(s)), (i = dn.join(t, "".concat(n++, "-").concat(e)));
            }
        return i;
    }
});
var Bp = g(ta => {
    "use strict";
    Object.defineProperty(ta, "__esModule", { value: !0 });
    ta.getAppCacheDir = HT;
    var ea = require("path"),
        BT = require("os");
    function HT() {
        let e = (0, BT.homedir)(),
            t;
        return (
            process.platform === "win32"
                ? (t = process.env.LOCALAPPDATA || ea.join(e, "AppData", "Local"))
                : process.platform === "darwin"
                ? (t = ea.join(e, "Library", "Caches"))
                : (t = process.env.XDG_CACHE_HOME || ea.join(e, ".cache")),
            t
        );
    }
});
var jp = g(Di => {
    "use strict";
    Object.defineProperty(Di, "__esModule", { value: !0 });
    Di.ElectronAppAdapter = void 0;
    var Hp = require("path"),
        jT = Bp(),
        ra = class {
            constructor(t = require("electron").app) {
                this.app = t;
            }
            whenReady() {
                return this.app.whenReady();
            }
            get version() {
                return this.app.getVersion();
            }
            get name() {
                return this.app.getName();
            }
            get isPackaged() {
                return this.app.isPackaged === !0;
            }
            get appUpdateConfigPath() {
                return this.isPackaged
                    ? Hp.join(process.resourcesPath, "app-update.yml")
                    : Hp.join(this.app.getAppPath(), "dev-app-update.yml");
            }
            get userDataPath() {
                return this.app.getPath("userData");
            }
            get baseCachePath() {
                return (0, jT.getAppCacheDir)();
            }
            quit() {
                this.app.quit();
            }
            relaunch() {
                this.app.relaunch();
            }
            onQuit(t) {
                this.app.once("quit", (r, n) => t(n));
            }
        };
    Di.ElectronAppAdapter = ra;
});
var Gp = g(gt => {
    "use strict";
    Object.defineProperty(gt, "__esModule", { value: !0 });
    gt.ElectronHttpExecutor = gt.NET_SESSION_NAME = void 0;
    gt.getNetSession = Wp;
    var Fi = ue();
    gt.NET_SESSION_NAME = "electron-updater";
    function Wp() {
        return require("electron").session.fromPartition(gt.NET_SESSION_NAME, { cache: !1 });
    }
    var na = class extends Fi.HttpExecutor {
        constructor(t) {
            super(), (this.proxyLoginCallback = t), (this.cachedSession = null);
        }
        async download(t, r, n) {
            return await n.cancellationToken.createPromise((i, o, s) => {
                let a = { headers: n.headers || void 0, redirect: "manual" };
                (0, Fi.configureRequestUrl)(t, a),
                    (0, Fi.configureRequestOptions)(a),
                    this.doDownload(
                        a,
                        {
                            destination: r,
                            options: n,
                            onCancel: s,
                            callback: l => {
                                l == null ? i(r) : o(l);
                            },
                            responseHandler: null
                        },
                        0
                    );
            });
        }
        createRequest(t, r) {
            t.headers && t.headers.Host && ((t.host = t.headers.Host), delete t.headers.Host),
                this.cachedSession == null && (this.cachedSession = Wp());
            let n = require("electron").net.request({ ...t, session: this.cachedSession });
            return n.on("response", r), this.proxyLoginCallback != null && n.on("login", this.proxyLoginCallback), n;
        }
        addRedirectHandlers(t, r, n, i, o) {
            t.on("redirect", (s, a, l) => {
                t.abort(),
                    i > this.maxRedirects ? n(this.createMaxRedirectError()) : o(Fi.HttpExecutor.prepareRedirectUrlOptions(l, r));
            });
        }
    };
    gt.ElectronHttpExecutor = na;
});
var Kp = g((FN, Jp) => {
    var WT = 1 / 0,
        GT = "[object Symbol]",
        Xp = /[\\^$.*+?()[\]{}|]/g,
        VT = RegExp(Xp.source),
        YT = typeof global == "object" && global && global.Object === Object && global,
        zT = typeof self == "object" && self && self.Object === Object && self,
        XT = YT || zT || Function("return this")(),
        JT = Object.prototype,
        KT = JT.toString,
        Vp = XT.Symbol,
        Yp = Vp ? Vp.prototype : void 0,
        zp = Yp ? Yp.toString : void 0;
    function QT(e) {
        if (typeof e == "string") return e;
        if (eb(e)) return zp ? zp.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -WT ? "-0" : t;
    }
    function ZT(e) {
        return !!e && typeof e == "object";
    }
    function eb(e) {
        return typeof e == "symbol" || (ZT(e) && KT.call(e) == GT);
    }
    function tb(e) {
        return e == null ? "" : QT(e);
    }
    function rb(e) {
        return (e = tb(e)), e && VT.test(e) ? e.replace(Xp, "\\$&") : e;
    }
    Jp.exports = rb;
});
var wt = g(dr => {
    "use strict";
    Object.defineProperty(dr, "__esModule", { value: !0 });
    dr.newBaseUrl = ib;
    dr.newUrlFromBase = ia;
    dr.getChannelFilename = ob;
    dr.blockmapFiles = sb;
    var Qp = require("url"),
        nb = Kp();
    function ib(e) {
        let t = new Qp.URL(e);
        return t.pathname.endsWith("/") || (t.pathname += "/"), t;
    }
    function ia(e, t, r = !1) {
        let n = new Qp.URL(e, t),
            i = t.search;
        return i != null && i.length !== 0 ? (n.search = i) : r && (n.search = "noCache=".concat(Date.now().toString(32))), n;
    }
    function ob(e) {
        return "".concat(e, ".yml");
    }
    function sb(e, t, r) {
        let n = ia("".concat(e.pathname, ".blockmap"), e);
        return [ia("".concat(e.pathname.replace(new RegExp(nb(r), "g"), t), ".blockmap"), e), n];
    }
});
var ke = g(Et => {
    "use strict";
    Object.defineProperty(Et, "__esModule", { value: !0 });
    Et.Provider = void 0;
    Et.findFile = lb;
    Et.parseUpdateInfo = ub;
    Et.getFileList = em;
    Et.resolveFiles = cb;
    var yt = ue(),
        ab = ui(),
        Zp = wt(),
        oa = class {
            constructor(t) {
                (this.runtimeOptions = t), (this.requestHeaders = null), (this.executor = t.executor);
            }
            get isUseMultipleRangeRequest() {
                return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
            }
            getChannelFilePrefix() {
                if (this.runtimeOptions.platform === "linux") {
                    let t = process.env.TEST_UPDATER_ARCH || process.arch;
                    return "-linux" + (t === "x64" ? "" : "-".concat(t));
                } else return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
            }
            getDefaultChannelName() {
                return this.getCustomChannelName("latest");
            }
            getCustomChannelName(t) {
                return "".concat(t).concat(this.getChannelFilePrefix());
            }
            get fileExtraDownloadHeaders() {
                return null;
            }
            setRequestHeaders(t) {
                this.requestHeaders = t;
            }
            httpRequest(t, r, n) {
                return this.executor.request(this.createRequestOptions(t, r), n);
            }
            createRequestOptions(t, r) {
                let n = {};
                return (
                    this.requestHeaders == null
                        ? r != null && (n.headers = r)
                        : (n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }),
                    (0, yt.configureRequestUrl)(t, n),
                    n
                );
            }
        };
    Et.Provider = oa;
    function lb(e, t, r) {
        if (e.length === 0) throw (0, yt.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
        let n = e.find(i => i.url.pathname.toLowerCase().endsWith(".".concat(t)));
        return n ?? (r == null ? e[0] : e.find(i => !r.some(o => i.url.pathname.toLowerCase().endsWith(".".concat(o)))));
    }
    function ub(e, t, r) {
        if (e == null)
            throw (0, yt.newError)(
                "Cannot parse update info from ".concat(t, " in the latest release artifacts (").concat(r, "): rawData: null"),
                "ERR_UPDATER_INVALID_UPDATE_INFO"
            );
        let n;
        try {
            n = (0, ab.load)(e);
        } catch (i) {
            throw (0, yt.newError)(
                "Cannot parse update info from "
                    .concat(t, " in the latest release artifacts (")
                    .concat(r, "): ")
                    .concat(i.stack || i.message, ", rawData: ")
                    .concat(e),
                "ERR_UPDATER_INVALID_UPDATE_INFO"
            );
        }
        return n;
    }
    function em(e) {
        let t = e.files;
        if (t != null && t.length > 0) return t;
        if (e.path != null) return [{ url: e.path, sha2: e.sha2, sha512: e.sha512 }];
        throw (0, yt.newError)("No files provided: ".concat((0, yt.safeStringifyJson)(e)), "ERR_UPDATER_NO_FILES_PROVIDED");
    }
    function cb(e, t, r = n => n) {
        let i = em(e).map(a => {
                if (a.sha2 == null && a.sha512 == null)
                    throw (0, yt.newError)(
                        "Update info doesn't contain nor sha256 neither sha512 checksum: ".concat((0, yt.safeStringifyJson)(a)),
                        "ERR_UPDATER_NO_CHECKSUM"
                    );
                return { url: (0, Zp.newUrlFromBase)(r(a.url), t), info: a };
            }),
            o = e.packages,
            s = o == null ? null : o[process.arch] || o.ia32;
        return s != null && (i[0].packageInfo = { ...s, path: (0, Zp.newUrlFromBase)(r(s.path), t).href }), i;
    }
});
var ua = g(qi => {
    "use strict";
    Object.defineProperty(qi, "__esModule", { value: !0 });
    qi.GenericProvider = void 0;
    var tm = ue(),
        sa = wt(),
        aa = ke(),
        la = class extends aa.Provider {
            constructor(t, r, n) {
                super(n),
                    (this.configuration = t),
                    (this.updater = r),
                    (this.baseUrl = (0, sa.newBaseUrl)(this.configuration.url));
            }
            get channel() {
                let t = this.updater.channel || this.configuration.channel;
                return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
            }
            async getLatestVersion() {
                let t = (0, sa.getChannelFilename)(this.channel),
                    r = (0, sa.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
                for (let n = 0; ; n++)
                    try {
                        return (0, aa.parseUpdateInfo)(await this.httpRequest(r), t, r);
                    } catch (i) {
                        if (i instanceof tm.HttpError && i.statusCode === 404)
                            throw (0, tm.newError)(
                                'Cannot find channel "'.concat(t, '" update info: ').concat(i.stack || i.message),
                                "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                            );
                        if (i.code === "ECONNREFUSED" && n < 3) {
                            await new Promise((o, s) => {
                                try {
                                    setTimeout(o, 1e3 * n);
                                } catch (a) {
                                    s(a);
                                }
                            });
                            continue;
                        }
                        throw i;
                    }
            }
            resolveFiles(t) {
                return (0, aa.resolveFiles)(t, this.baseUrl);
            }
        };
    qi.GenericProvider = la;
});
var nm = g(Li => {
    "use strict";
    Object.defineProperty(Li, "__esModule", { value: !0 });
    Li.BitbucketProvider = void 0;
    var rm = ue(),
        ca = wt(),
        fa = ke(),
        ha = class extends fa.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }), (this.configuration = t), (this.updater = r);
                let { owner: i, slug: o } = t;
                this.baseUrl = (0, ca.newBaseUrl)(
                    "https://api.bitbucket.org/2.0/repositories/".concat(i, "/").concat(o, "/downloads")
                );
            }
            get channel() {
                return this.updater.channel || this.configuration.channel || "latest";
            }
            async getLatestVersion() {
                let t = new rm.CancellationToken(),
                    r = (0, ca.getChannelFilename)(this.getCustomChannelName(this.channel)),
                    n = (0, ca.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
                try {
                    let i = await this.httpRequest(n, void 0, t);
                    return (0, fa.parseUpdateInfo)(i, r, n);
                } catch (i) {
                    throw (0, rm.newError)(
                        "Unable to find latest version on "
                            .concat(this.toString(), ", please ensure release exists: ")
                            .concat(i.stack || i.message),
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            resolveFiles(t) {
                return (0, fa.resolveFiles)(t, this.baseUrl);
            }
            toString() {
                let { owner: t, slug: r } = this.configuration;
                return "Bitbucket (owner: ".concat(t, ", slug: ").concat(r, ", channel: ").concat(this.channel, ")");
            }
        };
    Li.BitbucketProvider = ha;
});
var ga = g(kt => {
    "use strict";
    Object.defineProperty(kt, "__esModule", { value: !0 });
    kt.GitHubProvider = kt.BaseGitHubProvider = void 0;
    kt.computeReleaseNotes = om;
    var rt = ue(),
        pr = Bs(),
        fb = require("url"),
        mr = wt(),
        pa = ke(),
        da = /\/tag\/([^/]+)$/,
        Ui = class extends pa.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }),
                    (this.options = t),
                    (this.baseUrl = (0, mr.newBaseUrl)((0, rt.githubUrl)(t, r)));
                let i = r === "github.com" ? "api.github.com" : r;
                this.baseApiUrl = (0, mr.newBaseUrl)((0, rt.githubUrl)(t, i));
            }
            computeGithubBasePath(t) {
                let r = this.options.host;
                return r && !["github.com", "api.github.com"].includes(r) ? "/api/v3".concat(t) : t;
            }
        };
    kt.BaseGitHubProvider = Ui;
    var ma = class extends Ui {
        constructor(t, r, n) {
            super(t, "github.com", n), (this.options = t), (this.updater = r);
        }
        get channel() {
            let t = this.updater.channel || this.options.channel;
            return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
        }
        async getLatestVersion() {
            var t, r, n, i, o;
            let s = new rt.CancellationToken(),
                a = await this.httpRequest(
                    (0, mr.newUrlFromBase)("".concat(this.basePath, ".atom"), this.baseUrl),
                    { accept: "application/xml, application/atom+xml, text/xml, */*" },
                    s
                ),
                l = (0, rt.parseXml)(a),
                d = l.element("entry", !1, "No published versions on GitHub"),
                c = null;
            try {
                if (this.updater.allowPrerelease) {
                    let A =
                        ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) ||
                        ((r = pr.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) ||
                        null;
                    if (A === null) c = da.exec(d.element("link").attribute("href"))[1];
                    else
                        for (let T of l.getElements("entry")) {
                            let C = da.exec(T.element("link").attribute("href"));
                            if (C === null) continue;
                            let N = C[1],
                                L = ((n = pr.prerelease(N)) === null || n === void 0 ? void 0 : n[0]) || null,
                                qe = !A || ["alpha", "beta"].includes(A),
                                Y = L !== null && !["alpha", "beta"].includes(String(L));
                            if (qe && !Y && !(A === "beta" && L === "alpha")) {
                                c = N;
                                break;
                            }
                            if (L && L === A) {
                                c = N;
                                break;
                            }
                        }
                } else {
                    c = await this.getLatestTagName(s);
                    for (let A of l.getElements("entry"))
                        if (da.exec(A.element("link").attribute("href"))[1] === c) {
                            d = A;
                            break;
                        }
                }
            } catch (A) {
                throw (0, rt.newError)(
                    "Cannot parse releases feed: ".concat(A.stack || A.message, ",\nXML:\n").concat(a),
                    "ERR_UPDATER_INVALID_RELEASE_FEED"
                );
            }
            if (c == null) throw (0, rt.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
            let f,
                m = "",
                p = "",
                E = async A => {
                    (m = (0, mr.getChannelFilename)(A)),
                        (p = (0, mr.newUrlFromBase)(this.getBaseDownloadPath(String(c), m), this.baseUrl));
                    let T = this.createRequestOptions(p);
                    try {
                        return await this.executor.request(T, s);
                    } catch (C) {
                        throw C instanceof rt.HttpError && C.statusCode === 404
                            ? (0, rt.newError)(
                                  "Cannot find "
                                      .concat(m, " in the latest release artifacts (")
                                      .concat(p, "): ")
                                      .concat(C.stack || C.message),
                                  "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                              )
                            : C;
                    }
                };
            try {
                let A = this.channel;
                this.updater.allowPrerelease &&
                    !((i = pr.prerelease(c)) === null || i === void 0) &&
                    i[0] &&
                    (A = this.getCustomChannelName(String((o = pr.prerelease(c)) === null || o === void 0 ? void 0 : o[0]))),
                    (f = await E(A));
            } catch (A) {
                if (this.updater.allowPrerelease) f = await E(this.getDefaultChannelName());
                else throw A;
            }
            let _ = (0, pa.parseUpdateInfo)(f, m, p);
            return (
                _.releaseName == null && (_.releaseName = d.elementValueOrEmpty("title")),
                _.releaseNotes == null && (_.releaseNotes = om(this.updater.currentVersion, this.updater.fullChangelog, l, d)),
                { tag: c, ..._ }
            );
        }
        async getLatestTagName(t) {
            let r = this.options,
                n =
                    r.host == null || r.host === "github.com"
                        ? (0, mr.newUrlFromBase)("".concat(this.basePath, "/latest"), this.baseUrl)
                        : new fb.URL(
                              "".concat(
                                  this.computeGithubBasePath("/repos/".concat(r.owner, "/").concat(r.repo, "/releases")),
                                  "/latest"
                              ),
                              this.baseApiUrl
                          );
            try {
                let i = await this.httpRequest(n, { Accept: "application/json" }, t);
                return i == null ? null : JSON.parse(i).tag_name;
            } catch (i) {
                throw (0, rt.newError)(
                    "Unable to find latest version on GitHub ("
                        .concat(n, "), please ensure a production release exists: ")
                        .concat(i.stack || i.message),
                    "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                );
            }
        }
        get basePath() {
            return "/".concat(this.options.owner, "/").concat(this.options.repo, "/releases");
        }
        resolveFiles(t) {
            return (0, pa.resolveFiles)(t, this.baseUrl, r => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
        }
        getBaseDownloadPath(t, r) {
            return "".concat(this.basePath, "/download/").concat(t, "/").concat(r);
        }
    };
    kt.GitHubProvider = ma;
    function im(e) {
        let t = e.elementValueOrEmpty("content");
        return t === "No content." ? "" : t;
    }
    function om(e, t, r, n) {
        if (!t) return im(n);
        let i = [];
        for (let o of r.getElements("entry")) {
            let s = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
            pr.lt(e, s) && i.push({ version: s, note: im(o) });
        }
        return i.sort((o, s) => pr.rcompare(o.version, s.version));
    }
});
var am = g($i => {
    "use strict";
    Object.defineProperty($i, "__esModule", { value: !0 });
    $i.KeygenProvider = void 0;
    var sm = ue(),
        wa = wt(),
        ya = ke(),
        Ea = class extends ya.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }),
                    (this.configuration = t),
                    (this.updater = r),
                    (this.baseUrl = (0, wa.newBaseUrl)(
                        "https://api.keygen.sh/v1/accounts/"
                            .concat(this.configuration.account, "/artifacts?product=")
                            .concat(this.configuration.product)
                    ));
            }
            get channel() {
                return this.updater.channel || this.configuration.channel || "stable";
            }
            async getLatestVersion() {
                let t = new sm.CancellationToken(),
                    r = (0, wa.getChannelFilename)(this.getCustomChannelName(this.channel)),
                    n = (0, wa.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
                try {
                    let i = await this.httpRequest(n, { "Accept": "application/vnd.api+json", "Keygen-Version": "1.1" }, t);
                    return (0, ya.parseUpdateInfo)(i, r, n);
                } catch (i) {
                    throw (0, sm.newError)(
                        "Unable to find latest version on "
                            .concat(this.toString(), ", please ensure release exists: ")
                            .concat(i.stack || i.message),
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            resolveFiles(t) {
                return (0, ya.resolveFiles)(t, this.baseUrl);
            }
            toString() {
                let { account: t, product: r, platform: n } = this.configuration;
                return "Keygen (account: "
                    .concat(t, ", product: ")
                    .concat(r, ", platform: ")
                    .concat(n, ", channel: ")
                    .concat(this.channel, ")");
            }
        };
    $i.KeygenProvider = Ea;
});
var cm = g(ki => {
    "use strict";
    Object.defineProperty(ki, "__esModule", { value: !0 });
    ki.PrivateGitHubProvider = void 0;
    var gr = ue(),
        hb = ui(),
        db = require("path"),
        lm = require("url"),
        um = wt(),
        pb = ga(),
        mb = ke(),
        _a = class extends pb.BaseGitHubProvider {
            constructor(t, r, n, i) {
                super(t, "api.github.com", i), (this.updater = r), (this.token = n);
            }
            createRequestOptions(t, r) {
                let n = super.createRequestOptions(t, r);
                return (n.redirect = "manual"), n;
            }
            async getLatestVersion() {
                let t = new gr.CancellationToken(),
                    r = (0, um.getChannelFilename)(this.getDefaultChannelName()),
                    n = await this.getLatestVersionInfo(t),
                    i = n.assets.find(a => a.name === r);
                if (i == null)
                    throw (0, gr.newError)(
                        "Cannot find ".concat(r, " in the release ").concat(n.html_url || n.name),
                        "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                    );
                let o = new lm.URL(i.url),
                    s;
                try {
                    s = (0, hb.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
                } catch (a) {
                    throw a instanceof gr.HttpError && a.statusCode === 404
                        ? (0, gr.newError)(
                              "Cannot find "
                                  .concat(r, " in the latest release artifacts (")
                                  .concat(o, "): ")
                                  .concat(a.stack || a.message),
                              "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                          )
                        : a;
                }
                return (s.assets = n.assets), s;
            }
            get fileExtraDownloadHeaders() {
                return this.configureHeaders("application/octet-stream");
            }
            configureHeaders(t) {
                return { accept: t, authorization: "token ".concat(this.token) };
            }
            async getLatestVersionInfo(t) {
                let r = this.updater.allowPrerelease,
                    n = this.basePath;
                r || (n = "".concat(n, "/latest"));
                let i = (0, um.newUrlFromBase)(n, this.baseUrl);
                try {
                    let o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
                    return r ? o.find(s => s.prerelease) || o[0] : o;
                } catch (o) {
                    throw (0, gr.newError)(
                        "Unable to find latest version on GitHub ("
                            .concat(i, "), please ensure a production release exists: ")
                            .concat(o.stack || o.message),
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            get basePath() {
                return this.computeGithubBasePath(
                    "/repos/".concat(this.options.owner, "/").concat(this.options.repo, "/releases")
                );
            }
            resolveFiles(t) {
                return (0, mb.getFileList)(t).map(r => {
                    let n = db.posix.basename(r.url).replace(/ /g, "-"),
                        i = t.assets.find(o => o != null && o.name === n);
                    if (i == null)
                        throw (0, gr.newError)(
                            'Cannot find asset "'.concat(n, '" in: ').concat(JSON.stringify(t.assets, null, 2)),
                            "ERR_UPDATER_ASSET_NOT_FOUND"
                        );
                    return { url: new lm.URL(i.url), info: r };
                });
            }
        };
    ki.PrivateGitHubProvider = _a;
});
var dm = g(Bi => {
    "use strict";
    Object.defineProperty(Bi, "__esModule", { value: !0 });
    Bi.isUrlProbablySupportMultiRangeRequests = hm;
    Bi.createClient = _b;
    var Mi = ue(),
        gb = nm(),
        fm = ua(),
        wb = ga(),
        yb = am(),
        Eb = cm();
    function hm(e) {
        return !e.includes("s3.amazonaws.com");
    }
    function _b(e, t, r) {
        if (typeof e == "string")
            throw (0, Mi.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        let n = e.provider;
        switch (n) {
            case "github": {
                let i = e,
                    o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
                return o == null ? new wb.GitHubProvider(i, t, r) : new Eb.PrivateGitHubProvider(i, t, o, r);
            }
            case "bitbucket":
                return new gb.BitbucketProvider(e, t, r);
            case "keygen":
                return new yb.KeygenProvider(e, t, r);
            case "s3":
            case "spaces":
                return new fm.GenericProvider(
                    { provider: "generic", url: (0, Mi.getS3LikeProviderBaseUrl)(e), channel: e.channel || null },
                    t,
                    { ...r, isUseMultipleRangeRequest: !1 }
                );
            case "generic": {
                let i = e;
                return new fm.GenericProvider(i, t, {
                    ...r,
                    isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && hm(i.url)
                });
            }
            case "custom": {
                let i = e,
                    o = i.updateProvider;
                if (!o) throw (0, Mi.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
                return new o(i, t, r);
            }
            default:
                throw (0, Mi.newError)("Unsupported provider: ".concat(n), "ERR_UPDATER_UNSUPPORTED_PROVIDER");
        }
    }
});
var Hi = g(mn => {
    "use strict";
    Object.defineProperty(mn, "__esModule", { value: !0 });
    mn.OperationKind = void 0;
    mn.computeOperations = vb;
    var Mt;
    (function (e) {
        (e[(e.COPY = 0)] = "COPY"), (e[(e.DOWNLOAD = 1)] = "DOWNLOAD");
    })(Mt || (mn.OperationKind = Mt = {}));
    function vb(e, t, r) {
        let n = mm(e.files),
            i = mm(t.files),
            o = null,
            s = t.files[0],
            a = [],
            l = s.name,
            d = n.get(l);
        if (d == null) throw new Error("no file ".concat(l, " in old blockmap"));
        let c = i.get(l),
            f = 0,
            { checksumToOffset: m, checksumToOldSize: p } = Sb(n.get(l), d.offset, r),
            E = s.offset;
        for (let _ = 0; _ < c.checksums.length; E += c.sizes[_], _++) {
            let A = c.sizes[_],
                T = c.checksums[_],
                C = m.get(T);
            C != null &&
                p.get(T) !== A &&
                (r.warn(
                    'Checksum ("'.concat(T, '") matches, but size differs (old: ').concat(p.get(T), ", new: ").concat(A, ")")
                ),
                (C = void 0)),
                C === void 0
                    ? (f++,
                      o != null && o.kind === Mt.DOWNLOAD && o.end === E
                          ? (o.end += A)
                          : ((o = { kind: Mt.DOWNLOAD, start: E, end: E + A }), pm(o, a, T, _)))
                    : o != null && o.kind === Mt.COPY && o.end === C
                    ? (o.end += A)
                    : ((o = { kind: Mt.COPY, start: C, end: C + A }), pm(o, a, T, _));
        }
        return f > 0 && r.info("File".concat(s.name === "file" ? "" : " " + s.name, " has ").concat(f, " changed blocks")), a;
    }
    var Ab = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
    function pm(e, t, r, n) {
        if (Ab && t.length !== 0) {
            let i = t[t.length - 1];
            if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
                let o = [i.start, i.end, e.start, e.end].reduce((s, a) => (s < a ? s : a));
                throw new Error(
                    "operation (block index: "
                        .concat(n, ", checksum: ")
                        .concat(r, ", kind: ")
                        .concat(Mt[e.kind], ") overlaps previous operation (checksum: ")
                        .concat(r, "):\n") +
                        "abs: ".concat(i.start, " until ").concat(i.end, " and ").concat(e.start, " until ").concat(e.end, "\n") +
                        "rel: "
                            .concat(i.start - o, " until ")
                            .concat(i.end - o, " and ")
                            .concat(e.start - o, " until ")
                            .concat(e.end - o)
                );
            }
        }
        t.push(e);
    }
    function Sb(e, t, r) {
        let n = new Map(),
            i = new Map(),
            o = t;
        for (let s = 0; s < e.checksums.length; s++) {
            let a = e.checksums[s],
                l = e.sizes[s],
                d = i.get(a);
            if (d === void 0) n.set(a, o), i.set(a, l);
            else if (r.debug != null) {
                let c = d === l ? "(same size)" : "(size: ".concat(d, ", this size: ").concat(l, ")");
                r.debug(
                    ""
                        .concat(a, " duplicated in blockmap ")
                        .concat(
                            c,
                            ", it doesn't lead to broken differential downloader, just corresponding block will be skipped)"
                        )
                );
            }
            o += l;
        }
        return { checksumToOffset: n, checksumToOldSize: i };
    }
    function mm(e) {
        let t = new Map();
        for (let r of e) t.set(r.name, r);
        return t;
    }
});
var Aa = g(gn => {
    "use strict";
    Object.defineProperty(gn, "__esModule", { value: !0 });
    gn.DataSplitter = void 0;
    gn.copyData = wm;
    var ji = ue(),
        Cb = require("fs"),
        Tb = require("stream"),
        bb = Hi(),
        gm = Buffer.from("\r\n\r\n"),
        _t;
    (function (e) {
        (e[(e.INIT = 0)] = "INIT"), (e[(e.HEADER = 1)] = "HEADER"), (e[(e.BODY = 2)] = "BODY");
    })(_t || (_t = {}));
    function wm(e, t, r, n, i) {
        let o = (0, Cb.createReadStream)("", { fd: r, autoClose: !1, start: e.start, end: e.end - 1 });
        o.on("error", n), o.once("end", i), o.pipe(t, { end: !1 });
    }
    var va = class extends Tb.Writable {
        constructor(t, r, n, i, o, s) {
            super(),
                (this.out = t),
                (this.options = r),
                (this.partIndexToTaskIndex = n),
                (this.partIndexToLength = o),
                (this.finishHandler = s),
                (this.partIndex = -1),
                (this.headerListBuffer = null),
                (this.readState = _t.INIT),
                (this.ignoreByteCount = 0),
                (this.remainingPartDataCount = 0),
                (this.actualPartLength = 0),
                (this.boundaryLength = i.length + 4),
                (this.ignoreByteCount = this.boundaryLength - 2);
        }
        get isFinished() {
            return this.partIndex === this.partIndexToLength.length;
        }
        _write(t, r, n) {
            if (this.isFinished) {
                console.error("Trailing ignored data: ".concat(t.length, " bytes"));
                return;
            }
            this.handleData(t).then(n).catch(n);
        }
        async handleData(t) {
            let r = 0;
            if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
                throw (0, ji.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
            if (this.ignoreByteCount > 0) {
                let n = Math.min(this.ignoreByteCount, t.length);
                (this.ignoreByteCount -= n), (r = n);
            } else if (this.remainingPartDataCount > 0) {
                let n = Math.min(this.remainingPartDataCount, t.length);
                (this.remainingPartDataCount -= n), await this.processPartData(t, 0, n), (r = n);
            }
            if (r !== t.length) {
                if (this.readState === _t.HEADER) {
                    let n = this.searchHeaderListEnd(t, r);
                    if (n === -1) return;
                    (r = n), (this.readState = _t.BODY), (this.headerListBuffer = null);
                }
                for (;;) {
                    if (this.readState === _t.BODY) this.readState = _t.INIT;
                    else {
                        this.partIndex++;
                        let s = this.partIndexToTaskIndex.get(this.partIndex);
                        if (s == null)
                            if (this.isFinished) s = this.options.end;
                            else throw (0, ji.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
                        let a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
                        if (a < s) await this.copyExistingData(a, s);
                        else if (a > s)
                            throw (0, ji.newError)(
                                "prevTaskIndex must be < taskIndex",
                                "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED"
                            );
                        if (this.isFinished) {
                            this.onPartEnd(), this.finishHandler();
                            return;
                        }
                        if (((r = this.searchHeaderListEnd(t, r)), r === -1)) {
                            this.readState = _t.HEADER;
                            return;
                        }
                    }
                    let n = this.partIndexToLength[this.partIndex],
                        i = r + n,
                        o = Math.min(i, t.length);
                    if (
                        (await this.processPartStarted(t, r, o),
                        (this.remainingPartDataCount = n - (o - r)),
                        this.remainingPartDataCount > 0)
                    )
                        return;
                    if (((r = i + this.boundaryLength), r >= t.length)) {
                        this.ignoreByteCount = this.boundaryLength - (t.length - i);
                        return;
                    }
                }
            }
        }
        copyExistingData(t, r) {
            return new Promise((n, i) => {
                let o = () => {
                    if (t === r) {
                        n();
                        return;
                    }
                    let s = this.options.tasks[t];
                    if (s.kind !== bb.OperationKind.COPY) {
                        i(new Error("Task kind must be COPY"));
                        return;
                    }
                    wm(s, this.out, this.options.oldFileFd, i, () => {
                        t++, o();
                    });
                };
                o();
            });
        }
        searchHeaderListEnd(t, r) {
            let n = t.indexOf(gm, r);
            if (n !== -1) return n + gm.length;
            let i = r === 0 ? t : t.slice(r);
            return (
                this.headerListBuffer == null
                    ? (this.headerListBuffer = i)
                    : (this.headerListBuffer = Buffer.concat([this.headerListBuffer, i])),
                -1
            );
        }
        onPartEnd() {
            let t = this.partIndexToLength[this.partIndex - 1];
            if (this.actualPartLength !== t)
                throw (0, ji.newError)(
                    "Expected length: ".concat(t, " differs from actual: ").concat(this.actualPartLength),
                    "ERR_DATA_SPLITTER_LENGTH_MISMATCH"
                );
            this.actualPartLength = 0;
        }
        processPartStarted(t, r, n) {
            return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
        }
        processPartData(t, r, n) {
            this.actualPartLength += n - r;
            let i = this.out;
            return i.write(r === 0 && t.length === n ? t : t.slice(r, n))
                ? Promise.resolve()
                : new Promise((o, s) => {
                      i.on("error", s),
                          i.once("drain", () => {
                              i.removeListener("error", s), o();
                          });
                  });
        }
    };
    gn.DataSplitter = va;
});
var _m = g(Wi => {
    "use strict";
    Object.defineProperty(Wi, "__esModule", { value: !0 });
    Wi.executeTasksUsingMultipleRangeRequests = Ob;
    Wi.checkIsRangesSupported = Ca;
    var Sa = ue(),
        ym = Aa(),
        Em = Hi();
    function Ob(e, t, r, n, i) {
        let o = s => {
            if (s >= t.length) {
                e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
                return;
            }
            let a = s + 1e3;
            xb(e, { tasks: t, start: s, end: Math.min(t.length, a), oldFileFd: n }, r, () => o(a), i);
        };
        return o;
    }
    function xb(e, t, r, n, i) {
        let o = "bytes=",
            s = 0,
            a = new Map(),
            l = [];
        for (let f = t.start; f < t.end; f++) {
            let m = t.tasks[f];
            m.kind === Em.OperationKind.DOWNLOAD &&
                ((o += "".concat(m.start, "-").concat(m.end - 1, ", ")), a.set(s, f), s++, l.push(m.end - m.start));
        }
        if (s <= 1) {
            let f = m => {
                if (m >= t.end) {
                    n();
                    return;
                }
                let p = t.tasks[m++];
                if (p.kind === Em.OperationKind.COPY) (0, ym.copyData)(p, r, t.oldFileFd, i, () => f(m));
                else {
                    let E = e.createRequestOptions();
                    E.headers.Range = "bytes=".concat(p.start, "-").concat(p.end - 1);
                    let _ = e.httpExecutor.createRequest(E, A => {
                        Ca(A, i) && (A.pipe(r, { end: !1 }), A.once("end", () => f(m)));
                    });
                    e.httpExecutor.addErrorAndTimeoutHandlers(_, i), _.end();
                }
            };
            f(t.start);
            return;
        }
        let d = e.createRequestOptions();
        d.headers.Range = o.substring(0, o.length - 2);
        let c = e.httpExecutor.createRequest(d, f => {
            if (!Ca(f, i)) return;
            let m = (0, Sa.safeGetHeader)(f, "content-type"),
                p = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(m);
            if (p == null) {
                i(new Error('Content-Type "multipart/byteranges" is expected, but got "'.concat(m, '"')));
                return;
            }
            let E = new ym.DataSplitter(r, t, a, p[1] || p[2], l, n);
            E.on("error", i),
                f.pipe(E),
                f.on("end", () => {
                    setTimeout(() => {
                        c.abort(), i(new Error("Response ends without calling any handlers"));
                    }, 1e4);
                });
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(c, i), c.end();
    }
    function Ca(e, t) {
        if (e.statusCode >= 400) return t((0, Sa.createHttpError)(e)), !1;
        if (e.statusCode !== 206) {
            let r = (0, Sa.safeGetHeader)(e, "accept-ranges");
            if (r == null || r === "none")
                return t(new Error("Server doesn't support Accept-Ranges (response code ".concat(e.statusCode, ")"))), !1;
        }
        return !0;
    }
});
var vm = g(Gi => {
    "use strict";
    Object.defineProperty(Gi, "__esModule", { value: !0 });
    Gi.ProgressDifferentialDownloadCallbackTransform = void 0;
    var Ib = require("stream"),
        wr;
    (function (e) {
        (e[(e.COPY = 0)] = "COPY"), (e[(e.DOWNLOAD = 1)] = "DOWNLOAD");
    })(wr || (wr = {}));
    var Ta = class extends Ib.Transform {
        constructor(t, r, n) {
            super(),
                (this.progressDifferentialDownloadInfo = t),
                (this.cancellationToken = r),
                (this.onProgress = n),
                (this.start = Date.now()),
                (this.transferred = 0),
                (this.delta = 0),
                (this.expectedBytes = 0),
                (this.index = 0),
                (this.operationType = wr.COPY),
                (this.nextUpdate = this.start + 1e3);
        }
        _transform(t, r, n) {
            if (this.cancellationToken.cancelled) {
                n(new Error("cancelled"), null);
                return;
            }
            if (this.operationType == wr.COPY) {
                n(null, t);
                return;
            }
            (this.transferred += t.length), (this.delta += t.length);
            let i = Date.now();
            i >= this.nextUpdate &&
                this.transferred !== this.expectedBytes &&
                this.transferred !== this.progressDifferentialDownloadInfo.grandTotal &&
                ((this.nextUpdate = i + 1e3),
                this.onProgress({
                    total: this.progressDifferentialDownloadInfo.grandTotal,
                    delta: this.delta,
                    transferred: this.transferred,
                    percent: (this.transferred / this.progressDifferentialDownloadInfo.grandTotal) * 100,
                    bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
                }),
                (this.delta = 0)),
                n(null, t);
        }
        beginFileCopy() {
            this.operationType = wr.COPY;
        }
        beginRangeDownload() {
            (this.operationType = wr.DOWNLOAD),
                (this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++]);
        }
        endRangeDownload() {
            this.transferred !== this.progressDifferentialDownloadInfo.grandTotal &&
                this.onProgress({
                    total: this.progressDifferentialDownloadInfo.grandTotal,
                    delta: this.delta,
                    transferred: this.transferred,
                    percent: (this.transferred / this.progressDifferentialDownloadInfo.grandTotal) * 100,
                    bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
                });
        }
        _flush(t) {
            if (this.cancellationToken.cancelled) {
                t(new Error("cancelled"));
                return;
            }
            this.onProgress({
                total: this.progressDifferentialDownloadInfo.grandTotal,
                delta: this.delta,
                transferred: this.transferred,
                percent: 100,
                bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
            }),
                (this.delta = 0),
                (this.transferred = 0),
                t(null);
        }
    };
    Gi.ProgressDifferentialDownloadCallbackTransform = Ta;
});
var xa = g(Yi => {
    "use strict";
    Object.defineProperty(Yi, "__esModule", { value: !0 });
    Yi.DifferentialDownloader = void 0;
    var wn = ue(),
        ba = Qe(),
        Nb = require("fs"),
        Rb = Aa(),
        Pb = require("url"),
        Vi = Hi(),
        Am = _m(),
        Db = vm(),
        Oa = class {
            constructor(t, r, n) {
                (this.blockAwareFileInfo = t),
                    (this.httpExecutor = r),
                    (this.options = n),
                    (this.fileMetadataBuffer = null),
                    (this.logger = n.logger);
            }
            createRequestOptions() {
                let t = { headers: { ...this.options.requestHeaders, accept: "*/*" } };
                return (0, wn.configureRequestUrl)(this.options.newUrl, t), (0, wn.configureRequestOptions)(t), t;
            }
            doDownload(t, r) {
                if (t.version !== r.version)
                    throw new Error(
                        "version is different (".concat(t.version, " - ").concat(r.version, "), full download is required")
                    );
                let n = this.logger,
                    i = (0, Vi.computeOperations)(t, r, n);
                n.debug != null && n.debug(JSON.stringify(i, null, 2));
                let o = 0,
                    s = 0;
                for (let l of i) {
                    let d = l.end - l.start;
                    l.kind === Vi.OperationKind.DOWNLOAD ? (o += d) : (s += d);
                }
                let a = this.blockAwareFileInfo.size;
                if (o + s + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== a)
                    throw new Error(
                        "Internal error, size mismatch: downloadSize: "
                            .concat(o, ", copySize: ")
                            .concat(s, ", newSize: ")
                            .concat(a)
                    );
                return (
                    n.info(
                        "Full: "
                            .concat(Sm(a), ", To download: ")
                            .concat(Sm(o), " (")
                            .concat(Math.round(o / (a / 100)), "%)")
                    ),
                    this.downloadFile(i)
                );
            }
            downloadFile(t) {
                let r = [],
                    n = () =>
                        Promise.all(
                            r.map(i =>
                                (0, ba.close)(i.descriptor).catch(o => {
                                    this.logger.error('cannot close file "'.concat(i.path, '": ').concat(o));
                                })
                            )
                        );
                return this.doDownloadFile(t, r)
                    .then(n)
                    .catch(i =>
                        n()
                            .catch(o => {
                                try {
                                    this.logger.error("cannot close files: ".concat(o));
                                } catch (s) {
                                    try {
                                        console.error(s);
                                    } catch {}
                                }
                                throw i;
                            })
                            .then(() => {
                                throw i;
                            })
                    );
            }
            async doDownloadFile(t, r) {
                let n = await (0, ba.open)(this.options.oldFile, "r");
                r.push({ descriptor: n, path: this.options.oldFile });
                let i = await (0, ba.open)(this.options.newFile, "w");
                r.push({ descriptor: i, path: this.options.newFile });
                let o = (0, Nb.createWriteStream)(this.options.newFile, { fd: i });
                await new Promise((s, a) => {
                    let l = [],
                        d;
                    if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
                        let T = [],
                            C = 0;
                        for (let L of t)
                            L.kind === Vi.OperationKind.DOWNLOAD && (T.push(L.end - L.start), (C += L.end - L.start));
                        let N = { expectedByteCounts: T, grandTotal: C };
                        (d = new Db.ProgressDifferentialDownloadCallbackTransform(
                            N,
                            this.options.cancellationToken,
                            this.options.onProgress
                        )),
                            l.push(d);
                    }
                    let c = new wn.DigestTransform(this.blockAwareFileInfo.sha512);
                    (c.isValidateOnEnd = !1),
                        l.push(c),
                        o.on("finish", () => {
                            o.close(() => {
                                r.splice(1, 1);
                                try {
                                    c.validate();
                                } catch (T) {
                                    a(T);
                                    return;
                                }
                                s(void 0);
                            });
                        }),
                        l.push(o);
                    let f = null;
                    for (let T of l) T.on("error", a), f == null ? (f = T) : (f = f.pipe(T));
                    let m = l[0],
                        p;
                    if (this.options.isUseMultipleRangeRequest) {
                        (p = (0, Am.executeTasksUsingMultipleRangeRequests)(this, t, m, n, a)), p(0);
                        return;
                    }
                    let E = 0,
                        _ = null;
                    this.logger.info("Differential download: ".concat(this.options.newUrl));
                    let A = this.createRequestOptions();
                    (A.redirect = "manual"),
                        (p = T => {
                            var C, N;
                            if (T >= t.length) {
                                this.fileMetadataBuffer != null && m.write(this.fileMetadataBuffer), m.end();
                                return;
                            }
                            let L = t[T++];
                            if (L.kind === Vi.OperationKind.COPY) {
                                d && d.beginFileCopy(), (0, Rb.copyData)(L, m, n, a, () => p(T));
                                return;
                            }
                            let qe = "bytes=".concat(L.start, "-").concat(L.end - 1);
                            (A.headers.range = qe),
                                (N = (C = this.logger) === null || C === void 0 ? void 0 : C.debug) === null ||
                                    N === void 0 ||
                                    N.call(C, "download range: ".concat(qe)),
                                d && d.beginRangeDownload();
                            let Y = this.httpExecutor.createRequest(A, fe => {
                                fe.on("error", a),
                                    fe.on("aborted", () => {
                                        a(new Error("response has been aborted by the server"));
                                    }),
                                    fe.statusCode >= 400 && a((0, wn.createHttpError)(fe)),
                                    fe.pipe(m, { end: !1 }),
                                    fe.once("end", () => {
                                        d && d.endRangeDownload(), ++E === 100 ? ((E = 0), setTimeout(() => p(T), 1e3)) : p(T);
                                    });
                            });
                            Y.on("redirect", (fe, y, P) => {
                                this.logger.info("Redirect to ".concat(Fb(P))),
                                    (_ = P),
                                    (0, wn.configureRequestUrl)(new Pb.URL(_), A),
                                    Y.followRedirect();
                            }),
                                this.httpExecutor.addErrorAndTimeoutHandlers(Y, a),
                                Y.end();
                        }),
                        p(0);
                });
            }
            async readRemoteBytes(t, r) {
                let n = Buffer.allocUnsafe(r + 1 - t),
                    i = this.createRequestOptions();
                i.headers.range = "bytes=".concat(t, "-").concat(r);
                let o = 0;
                if (
                    (await this.request(i, s => {
                        s.copy(n, o), (o += s.length);
                    }),
                    o !== n.length)
                )
                    throw new Error("Received data length ".concat(o, " is not equal to expected ").concat(n.length));
                return n;
            }
            request(t, r) {
                return new Promise((n, i) => {
                    let o = this.httpExecutor.createRequest(t, s => {
                        (0, Am.checkIsRangesSupported)(s, i) &&
                            (s.on("error", i),
                            s.on("aborted", () => {
                                i(new Error("response has been aborted by the server"));
                            }),
                            s.on("data", r),
                            s.on("end", () => n()));
                    });
                    this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
                });
            }
        };
    Yi.DifferentialDownloader = Oa;
    function Sm(e, t = " KB") {
        return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
    }
    function Fb(e) {
        let t = e.indexOf("?");
        return t < 0 ? e : e.substring(0, t);
    }
});
var Cm = g(zi => {
    "use strict";
    Object.defineProperty(zi, "__esModule", { value: !0 });
    zi.GenericDifferentialDownloader = void 0;
    var qb = xa(),
        Ia = class extends qb.DifferentialDownloader {
            download(t, r) {
                return this.doDownload(t, r);
            }
        };
    zi.GenericDifferentialDownloader = Ia;
});
var Ji = g(_r => {
    "use strict";
    Object.defineProperty(_r, "__esModule", { value: !0 });
    _r.NoOpLogger = _r.AppUpdater = void 0;
    var Te = ue(),
        Lb = require("crypto"),
        Ub = require("os"),
        $b = require("events"),
        yr = Qe(),
        kb = ui(),
        Na = dh(),
        Bt = require("path"),
        Ht = Bs(),
        Tm = Mp(),
        Mb = jp(),
        bm = Gp(),
        Bb = ua(),
        Er = jt(),
        Ra = dm(),
        Hb = require("zlib"),
        jb = wt(),
        Wb = Cm(),
        Pa = class e extends $b.EventEmitter {
            get channel() {
                return this._channel;
            }
            set channel(t) {
                if (this._channel != null) {
                    if (typeof t != "string")
                        throw (0, Te.newError)("Channel must be a string, but got: ".concat(t), "ERR_UPDATER_INVALID_CHANNEL");
                    if (t.length === 0)
                        throw (0, Te.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
                }
                (this._channel = t), (this.allowDowngrade = !0);
            }
            addAuthHeader(t) {
                this.requestHeaders = Object.assign({}, this.requestHeaders, { authorization: t });
            }
            get netSession() {
                return (0, bm.getNetSession)();
            }
            get logger() {
                return this._logger;
            }
            set logger(t) {
                this._logger = t ?? new Xi();
            }
            set updateConfigPath(t) {
                (this.clientPromise = null),
                    (this._appUpdateConfigPath = t),
                    (this.configOnDisk = new Na.Lazy(() => this.loadUpdateConfig()));
            }
            constructor(t, r) {
                super(),
                    (this.autoDownload = !0),
                    (this.autoInstallOnAppQuit = !0),
                    (this.autoRunAppAfterInstall = !0),
                    (this.allowPrerelease = !1),
                    (this.fullChangelog = !1),
                    (this.allowDowngrade = !1),
                    (this.disableWebInstaller = !1),
                    (this.disableDifferentialDownload = !1),
                    (this.forceDevUpdateConfig = !1),
                    (this._channel = null),
                    (this.downloadedUpdateHelper = null),
                    (this.requestHeaders = null),
                    (this._logger = console),
                    (this.signals = new Er.UpdaterSignal(this)),
                    (this._appUpdateConfigPath = null),
                    (this.clientPromise = null),
                    (this.stagingUserIdPromise = new Na.Lazy(() => this.getOrCreateStagingUserId())),
                    (this.configOnDisk = new Na.Lazy(() => this.loadUpdateConfig())),
                    (this.checkForUpdatesPromise = null),
                    (this.downloadPromise = null),
                    (this.updateInfoAndProvider = null),
                    (this._testOnlyOptions = null),
                    this.on("error", o => {
                        this._logger.error("Error: ".concat(o.stack || o.message));
                    }),
                    r == null
                        ? ((this.app = new Mb.ElectronAppAdapter()),
                          (this.httpExecutor = new bm.ElectronHttpExecutor((o, s) => this.emit("login", o, s))))
                        : ((this.app = r), (this.httpExecutor = null));
                let n = this.app.version,
                    i = (0, Ht.parse)(n);
                if (i == null)
                    throw (0, Te.newError)(
                        'App version is not a valid semver version: "'.concat(n, '"'),
                        "ERR_UPDATER_INVALID_VERSION"
                    );
                (this.currentVersion = i),
                    (this.allowPrerelease = Gb(i)),
                    t != null &&
                        (this.setFeedURL(t),
                        typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
            }
            getFeedURL() {
                return "Deprecated. Do not use it.";
            }
            setFeedURL(t) {
                let r = this.createProviderRuntimeOptions(),
                    n;
                typeof t == "string"
                    ? (n = new Bb.GenericProvider({ provider: "generic", url: t }, this, {
                          ...r,
                          isUseMultipleRangeRequest: (0, Ra.isUrlProbablySupportMultiRangeRequests)(t)
                      }))
                    : (n = (0, Ra.createClient)(t, this, r)),
                    (this.clientPromise = Promise.resolve(n));
            }
            checkForUpdates() {
                if (!this.isUpdaterActive()) return Promise.resolve(null);
                let t = this.checkForUpdatesPromise;
                if (t != null) return this._logger.info("Checking for update (already in progress)"), t;
                let r = () => (this.checkForUpdatesPromise = null);
                return (
                    this._logger.info("Checking for update"),
                    (t = this.doCheckForUpdates()
                        .then(n => (r(), n))
                        .catch(n => {
                            throw (r(), this.emit("error", n, "Cannot check for updates: ".concat((n.stack || n).toString())), n);
                        })),
                    (this.checkForUpdatesPromise = t),
                    t
                );
            }
            isUpdaterActive() {
                return this.app.isPackaged || this.forceDevUpdateConfig
                    ? !0
                    : (this._logger.info(
                          "Skip checkForUpdates because application is not packed and dev update config is not forced"
                      ),
                      !1);
            }
            checkForUpdatesAndNotify(t) {
                return this.checkForUpdates().then(r =>
                    r?.downloadPromise
                        ? (r.downloadPromise.then(() => {
                              let n = e.formatDownloadNotification(r.updateInfo.version, this.app.name, t);
                              new (require("electron").Notification)(n).show();
                          }),
                          r)
                        : (this._logger.debug != null &&
                              this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"),
                          r)
                );
            }
            static formatDownloadNotification(t, r, n) {
                return (
                    n == null &&
                        (n = {
                            title: "A new update is ready to install",
                            body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
                        }),
                    (n = {
                        title: n.title.replace("{appName}", r).replace("{version}", t),
                        body: n.body.replace("{appName}", r).replace("{version}", t)
                    }),
                    n
                );
            }
            async isStagingMatch(t) {
                let r = t.stagingPercentage,
                    n = r;
                if (n == null) return !0;
                if (((n = parseInt(n, 10)), isNaN(n))) return this._logger.warn("Staging percentage is NaN: ".concat(r)), !0;
                n = n / 100;
                let i = await this.stagingUserIdPromise.value,
                    s = Te.UUID.parse(i).readUInt32BE(12) / 4294967295;
                return (
                    this._logger.info("Staging percentage: ".concat(n, ", percentage: ").concat(s, ", user id: ").concat(i)),
                    s < n
                );
            }
            computeFinalHeaders(t) {
                return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
            }
            async isUpdateAvailable(t) {
                let r = (0, Ht.parse)(t.version);
                if (r == null)
                    throw (0, Te.newError)(
                        'This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "'.concat(
                            t.version,
                            '"'
                        ),
                        "ERR_UPDATER_INVALID_VERSION"
                    );
                let n = this.currentVersion;
                if ((0, Ht.eq)(r, n)) return !1;
                let i = t?.minimumSystemVersion,
                    o = (0, Ub.release)();
                if (i)
                    try {
                        if ((0, Ht.lt)(o, i))
                            return (
                                this._logger.info(
                                    "Current OS version "
                                        .concat(o, " is less than the minimum OS version required ")
                                        .concat(i, " for version ")
                                        .concat(o)
                                ),
                                !1
                            );
                    } catch (d) {
                        this._logger.warn(
                            "Failed to compare current OS version("
                                .concat(o, ") with minimum OS version(")
                                .concat(i, "): ")
                                .concat((d.message || d).toString())
                        );
                    }
                if (!(await this.isStagingMatch(t))) return !1;
                let a = (0, Ht.gt)(r, n),
                    l = (0, Ht.lt)(r, n);
                return a ? !0 : this.allowDowngrade && l;
            }
            async getUpdateInfoAndProvider() {
                await this.app.whenReady(),
                    this.clientPromise == null &&
                        (this.clientPromise = this.configOnDisk.value.then(n =>
                            (0, Ra.createClient)(n, this, this.createProviderRuntimeOptions())
                        ));
                let t = await this.clientPromise,
                    r = await this.stagingUserIdPromise.value;
                return (
                    t.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": r })),
                    { info: await t.getLatestVersion(), provider: t }
                );
            }
            createProviderRuntimeOptions() {
                return {
                    isUseMultipleRangeRequest: !0,
                    platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
                    executor: this.httpExecutor
                };
            }
            async doCheckForUpdates() {
                this.emit("checking-for-update");
                let t = await this.getUpdateInfoAndProvider(),
                    r = t.info;
                if (!(await this.isUpdateAvailable(r)))
                    return (
                        this._logger.info(
                            "Update for version "
                                .concat(this.currentVersion.format(), " is not available (latest version: ")
                                .concat(r.version, ", downgrade is ")
                                .concat(this.allowDowngrade ? "allowed" : "disallowed", ").")
                        ),
                        this.emit("update-not-available", r),
                        { versionInfo: r, updateInfo: r }
                    );
                (this.updateInfoAndProvider = t), this.onUpdateAvailable(r);
                let n = new Te.CancellationToken();
                return {
                    versionInfo: r,
                    updateInfo: r,
                    cancellationToken: n,
                    downloadPromise: this.autoDownload ? this.downloadUpdate(n) : null
                };
            }
            onUpdateAvailable(t) {
                this._logger.info(
                    "Found version ".concat(t.version, " (url: ").concat(
                        (0, Te.asArray)(t.files)
                            .map(r => r.url)
                            .join(", "),
                        ")"
                    )
                ),
                    this.emit("update-available", t);
            }
            downloadUpdate(t = new Te.CancellationToken()) {
                let r = this.updateInfoAndProvider;
                if (r == null) {
                    let i = new Error("Please check update first");
                    return this.dispatchError(i), Promise.reject(i);
                }
                if (this.downloadPromise != null)
                    return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
                this._logger.info(
                    "Downloading update from ".concat(
                        (0, Te.asArray)(r.info.files)
                            .map(i => i.url)
                            .join(", ")
                    )
                );
                let n = i => {
                    if (!(i instanceof Te.CancellationError))
                        try {
                            this.dispatchError(i);
                        } catch (o) {
                            this._logger.warn("Cannot dispatch error event: ".concat(o.stack || o));
                        }
                    return i;
                };
                return (
                    (this.downloadPromise = this.doDownloadUpdate({
                        updateInfoAndProvider: r,
                        requestHeaders: this.computeRequestHeaders(r.provider),
                        cancellationToken: t,
                        disableWebInstaller: this.disableWebInstaller,
                        disableDifferentialDownload: this.disableDifferentialDownload
                    })
                        .catch(i => {
                            throw n(i);
                        })
                        .finally(() => {
                            this.downloadPromise = null;
                        })),
                    this.downloadPromise
                );
            }
            dispatchError(t) {
                this.emit("error", t, (t.stack || t).toString());
            }
            dispatchUpdateDownloaded(t) {
                this.emit(Er.UPDATE_DOWNLOADED, t);
            }
            async loadUpdateConfig() {
                return (
                    this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath),
                    (0, kb.load)(await (0, yr.readFile)(this._appUpdateConfigPath, "utf-8"))
                );
            }
            computeRequestHeaders(t) {
                let r = t.fileExtraDownloadHeaders;
                if (r != null) {
                    let n = this.requestHeaders;
                    return n == null ? r : { ...r, ...n };
                }
                return this.computeFinalHeaders({ accept: "*/*" });
            }
            async getOrCreateStagingUserId() {
                let t = Bt.join(this.app.userDataPath, ".updaterId");
                try {
                    let n = await (0, yr.readFile)(t, "utf-8");
                    if (Te.UUID.check(n)) return n;
                    this._logger.warn("Staging user id file exists, but content was invalid: ".concat(n));
                } catch (n) {
                    n.code !== "ENOENT" && this._logger.warn("Couldn't read staging user ID, creating a blank one: ".concat(n));
                }
                let r = Te.UUID.v5((0, Lb.randomBytes)(4096), Te.UUID.OID);
                this._logger.info("Generated new staging user ID: ".concat(r));
                try {
                    await (0, yr.outputFile)(t, r);
                } catch (n) {
                    this._logger.warn("Couldn't write out staging user ID: ".concat(n));
                }
                return r;
            }
            get isAddNoCacheQuery() {
                let t = this.requestHeaders;
                if (t == null) return !0;
                for (let r of Object.keys(t)) {
                    let n = r.toLowerCase();
                    if (n === "authorization" || n === "private-token") return !1;
                }
                return !0;
            }
            async getOrCreateDownloadHelper() {
                let t = this.downloadedUpdateHelper;
                if (t == null) {
                    let r = (await this.configOnDisk.value).updaterCacheDirName,
                        n = this._logger;
                    r == null &&
                        n.error(
                            "updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?"
                        );
                    let i = Bt.join(this.app.baseCachePath, r || this.app.name);
                    n.debug != null && n.debug("updater cache dir: ".concat(i)),
                        (t = new Tm.DownloadedUpdateHelper(i)),
                        (this.downloadedUpdateHelper = t);
                }
                return t;
            }
            async executeDownload(t) {
                let r = t.fileInfo,
                    n = {
                        headers: t.downloadUpdateOptions.requestHeaders,
                        cancellationToken: t.downloadUpdateOptions.cancellationToken,
                        sha2: r.info.sha2,
                        sha512: r.info.sha512
                    };
                this.listenerCount(Er.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = C => this.emit(Er.DOWNLOAD_PROGRESS, C));
                let i = t.downloadUpdateOptions.updateInfoAndProvider.info,
                    o = i.version,
                    s = r.packageInfo;
                function a() {
                    let C = decodeURIComponent(t.fileInfo.url.pathname);
                    return C.endsWith(".".concat(t.fileExtension)) ? Bt.basename(C) : t.fileInfo.info.url;
                }
                let l = await this.getOrCreateDownloadHelper(),
                    d = l.cacheDirForPendingUpdate;
                await (0, yr.mkdir)(d, { recursive: !0 });
                let c = a(),
                    f = Bt.join(d, c),
                    m = s == null ? null : Bt.join(d, "package-".concat(o).concat(Bt.extname(s.path) || ".7z")),
                    p = async C => (
                        await l.setDownloadedFile(f, m, i, r, c, C),
                        await t.done({ ...i, downloadedFile: f }),
                        m == null ? [f] : [f, m]
                    ),
                    E = this._logger,
                    _ = await l.validateDownloadedPath(f, i, r, E);
                if (_ != null) return (f = _), await p(!1);
                let A = async () => (await l.clear().catch(() => {}), await (0, yr.unlink)(f).catch(() => {})),
                    T = await (0, Tm.createTempUpdateFile)("temp-".concat(c), d, E);
                try {
                    await t.task(T, n, m, A),
                        await (0, Te.retry)(
                            () => (0, yr.rename)(T, f),
                            60,
                            500,
                            0,
                            0,
                            C => C instanceof Error && /^EBUSY:/.test(C.message)
                        );
                } catch (C) {
                    throw (
                        (await A(),
                        C instanceof Te.CancellationError && (E.info("cancelled"), this.emit("update-cancelled", i)),
                        C)
                    );
                }
                return E.info("New version ".concat(o, " has been downloaded to ").concat(f)), await p(!0);
            }
            async differentialDownloadInstaller(t, r, n, i, o) {
                try {
                    if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload) return !0;
                    let s = (0, jb.blockmapFiles)(t.url, this.app.version, r.updateInfoAndProvider.info.version);
                    this._logger.info('Download block maps (old: "'.concat(s[0], '", new: ').concat(s[1], ")"));
                    let a = async c => {
                            let f = await this.httpExecutor.downloadToBuffer(c, {
                                headers: r.requestHeaders,
                                cancellationToken: r.cancellationToken
                            });
                            if (f == null || f.length === 0) throw new Error('Blockmap "'.concat(c.href, '" is empty'));
                            try {
                                return JSON.parse((0, Hb.gunzipSync)(f).toString());
                            } catch (m) {
                                throw new Error('Cannot parse blockmap "'.concat(c.href, '", error: ').concat(m));
                            }
                        },
                        l = {
                            newUrl: t.url,
                            oldFile: Bt.join(this.downloadedUpdateHelper.cacheDir, o),
                            logger: this._logger,
                            newFile: n,
                            isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
                            requestHeaders: r.requestHeaders,
                            cancellationToken: r.cancellationToken
                        };
                    this.listenerCount(Er.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = c => this.emit(Er.DOWNLOAD_PROGRESS, c));
                    let d = await Promise.all(s.map(c => a(c)));
                    return await new Wb.GenericDifferentialDownloader(t.info, this.httpExecutor, l).download(d[0], d[1]), !1;
                } catch (s) {
                    if (
                        (this._logger.error("Cannot download differentially, fallback to full download: ".concat(s.stack || s)),
                        this._testOnlyOptions != null)
                    )
                        throw s;
                    return !0;
                }
            }
        };
    _r.AppUpdater = Pa;
    function Gb(e) {
        let t = (0, Ht.prerelease)(e);
        return t != null && t.length > 0;
    }
    var Xi = class {
        info(t) {}
        warn(t) {}
        error(t) {}
    };
    _r.NoOpLogger = Xi;
});
var vr = g(Ki => {
    "use strict";
    Object.defineProperty(Ki, "__esModule", { value: !0 });
    Ki.BaseUpdater = void 0;
    var Om = require("child_process"),
        Vb = Ji(),
        Da = class extends Vb.AppUpdater {
            constructor(t, r) {
                super(t, r), (this.quitAndInstallCalled = !1), (this.quitHandlerAdded = !1);
            }
            quitAndInstall(t = !1, r = !1) {
                this._logger.info("Install on explicit quitAndInstall"),
                    this.install(t, t ? r : this.autoRunAppAfterInstall)
                        ? setImmediate(() => {
                              require("electron").autoUpdater.emit("before-quit-for-update"), this.app.quit();
                          })
                        : (this.quitAndInstallCalled = !1);
            }
            executeDownload(t) {
                return super.executeDownload({
                    ...t,
                    done: r => (this.dispatchUpdateDownloaded(r), this.addQuitHandler(), Promise.resolve())
                });
            }
            install(t = !1, r = !1) {
                if (this.quitAndInstallCalled)
                    return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
                let n = this.downloadedUpdateHelper,
                    i = n && n.file ? (process.platform === "linux" ? n.file.replace(/ /g, "\\ ") : n.file) : null,
                    o = n == null ? null : n.downloadedFileInfo;
                if (i == null || o == null)
                    return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
                this.quitAndInstallCalled = !0;
                try {
                    return (
                        this._logger.info("Install: isSilent: ".concat(t, ", isForceRunAfter: ").concat(r)),
                        this.doInstall({
                            installerPath: i,
                            isSilent: t,
                            isForceRunAfter: r,
                            isAdminRightsRequired: o.isAdminRightsRequired
                        })
                    );
                } catch (s) {
                    return this.dispatchError(s), !1;
                }
            }
            addQuitHandler() {
                this.quitHandlerAdded ||
                    !this.autoInstallOnAppQuit ||
                    ((this.quitHandlerAdded = !0),
                    this.app.onQuit(t => {
                        if (this.quitAndInstallCalled) {
                            this._logger.info("Update installer has already been triggered. Quitting application.");
                            return;
                        }
                        if (!this.autoInstallOnAppQuit) {
                            this._logger.info(
                                "Update will not be installed on quit because autoInstallOnAppQuit is set to false."
                            );
                            return;
                        }
                        if (t !== 0) {
                            this._logger.info(
                                "Update will be not installed on quit because application is quitting with exit code ".concat(t)
                            );
                            return;
                        }
                        this._logger.info("Auto install update on quit"), this.install(!0, !1);
                    }));
            }
            wrapSudo() {
                let { name: t } = this.app,
                    r = '"'.concat(t, ' would like to update"'),
                    n = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"),
                    i = [n];
                return (
                    /kdesudo/i.test(n)
                        ? (i.push("--comment", r), i.push("-c"))
                        : /gksudo/i.test(n)
                        ? i.push("--message", r)
                        : /pkexec/i.test(n) && i.push("--disable-internal-agent"),
                    i.join(" ")
                );
            }
            spawnSyncLog(t, r = [], n = {}) {
                return (
                    this._logger.info("Executing: ".concat(t, " with args: ").concat(r)),
                    (0, Om.spawnSync)(t, r, { env: { ...process.env, ...n }, encoding: "utf-8", shell: !0 }).stdout.trim()
                );
            }
            async spawnLog(t, r = [], n = void 0, i = "ignore") {
                return (
                    this._logger.info("Executing: ".concat(t, " with args: ").concat(r)),
                    new Promise((o, s) => {
                        try {
                            let a = { stdio: i, env: n, detached: !0 },
                                l = (0, Om.spawn)(t, r, a);
                            l.on("error", d => {
                                s(d);
                            }),
                                l.unref(),
                                l.pid !== void 0 && o(!0);
                        } catch (a) {
                            s(a);
                        }
                    })
                );
            }
        };
    Ki.BaseUpdater = Da;
});
var qa = g(Qi => {
    "use strict";
    Object.defineProperty(Qi, "__esModule", { value: !0 });
    Qi.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
    var Ar = Qe(),
        Yb = xa(),
        zb = require("zlib"),
        Fa = class extends Yb.DifferentialDownloader {
            async download() {
                let t = this.blockAwareFileInfo,
                    r = t.size,
                    n = r - (t.blockMapSize + 4);
                this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
                let i = xm(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
                await this.doDownload(await Xb(this.options.oldFile), i);
            }
        };
    Qi.FileWithEmbeddedBlockMapDifferentialDownloader = Fa;
    function xm(e) {
        return JSON.parse((0, zb.inflateRawSync)(e).toString());
    }
    async function Xb(e) {
        let t = await (0, Ar.open)(e, "r");
        try {
            let r = (await (0, Ar.fstat)(t)).size,
                n = Buffer.allocUnsafe(4);
            await (0, Ar.read)(t, n, 0, n.length, r - n.length);
            let i = Buffer.allocUnsafe(n.readUInt32BE(0));
            return await (0, Ar.read)(t, i, 0, i.length, r - n.length - i.length), await (0, Ar.close)(t), xm(i);
        } catch (r) {
            throw (await (0, Ar.close)(t), r);
        }
    }
});
var Ua = g(Zi => {
    "use strict";
    Object.defineProperty(Zi, "__esModule", { value: !0 });
    Zi.AppImageUpdater = void 0;
    var Im = ue(),
        Nm = require("child_process"),
        Jb = Qe(),
        Kb = require("fs"),
        yn = require("path"),
        Qb = vr(),
        Zb = qa(),
        Rm = jt(),
        eO = ke(),
        La = class extends Qb.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            isUpdaterActive() {
                return process.env.APPIMAGE == null
                    ? (process.env.SNAP == null
                          ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage")
                          : this._logger.info("SNAP env is defined, updater is disabled"),
                      !1)
                    : super.isUpdaterActive();
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, eO.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
                return this.executeDownload({
                    fileExtension: "AppImage",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, o) => {
                        let s = process.env.APPIMAGE;
                        if (s == null) throw (0, Im.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
                        let a = !1;
                        try {
                            let l = {
                                newUrl: n.url,
                                oldFile: s,
                                logger: this._logger,
                                newFile: i,
                                isUseMultipleRangeRequest: r.isUseMultipleRangeRequest,
                                requestHeaders: t.requestHeaders,
                                cancellationToken: t.cancellationToken
                            };
                            this.listenerCount(Rm.DOWNLOAD_PROGRESS) > 0 &&
                                (l.onProgress = d => this.emit(Rm.DOWNLOAD_PROGRESS, d)),
                                await new Zb.FileWithEmbeddedBlockMapDifferentialDownloader(
                                    n.info,
                                    this.httpExecutor,
                                    l
                                ).download();
                        } catch (l) {
                            this._logger.error(
                                "Cannot download differentially, fallback to full download: ".concat(l.stack || l)
                            ),
                                (a = process.platform === "linux");
                        }
                        a && (await this.httpExecutor.download(n.url, i, o)), await (0, Jb.chmod)(i, 493);
                    }
                });
            }
            doInstall(t) {
                let r = process.env.APPIMAGE;
                if (r == null) throw (0, Im.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
                (0, Kb.unlinkSync)(r);
                let n,
                    i = yn.basename(r);
                yn.basename(t.installerPath) === i || !/\d+\.\d+\.\d+/.test(i)
                    ? (n = r)
                    : (n = yn.join(yn.dirname(r), yn.basename(t.installerPath))),
                    (0, Nm.execFileSync)("mv", ["-f", t.installerPath, n]),
                    n !== r && this.emit("appimage-filename-updated", n);
                let o = { ...process.env, APPIMAGE_SILENT_INSTALL: "true" };
                return (
                    t.isForceRunAfter
                        ? this.spawnLog(n, [], o)
                        : ((o.APPIMAGE_EXIT_AFTER_INSTALL = "true"), (0, Nm.execFileSync)(n, [], { env: o })),
                    !0
                );
            }
        };
    Zi.AppImageUpdater = La;
});
var ka = g(eo => {
    "use strict";
    Object.defineProperty(eo, "__esModule", { value: !0 });
    eo.DebUpdater = void 0;
    var tO = vr(),
        Pm = jt(),
        rO = ke(),
        $a = class extends tO.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, rO.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
                return this.executeDownload({
                    fileExtension: "deb",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, o) => {
                        this.listenerCount(Pm.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = s => this.emit(Pm.DOWNLOAD_PROGRESS, s)),
                            await this.httpExecutor.download(n.url, i, o);
                    }
                });
            }
            doInstall(t) {
                let r = this.wrapSudo(),
                    n = /pkexec/i.test(r) ? "" : '"',
                    i = ["dpkg", "-i", t.installerPath, "||", "apt-get", "install", "-f", "-y"];
                return (
                    this.spawnSyncLog(r, ["".concat(n, "/bin/bash"), "-c", "'".concat(i.join(" "), "'").concat(n)]),
                    t.isForceRunAfter && this.app.relaunch(),
                    !0
                );
            }
        };
    eo.DebUpdater = $a;
});
var Ba = g(to => {
    "use strict";
    Object.defineProperty(to, "__esModule", { value: !0 });
    to.RpmUpdater = void 0;
    var nO = vr(),
        Dm = jt(),
        iO = ke(),
        Ma = class extends nO.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, iO.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
                return this.executeDownload({
                    fileExtension: "rpm",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, o) => {
                        this.listenerCount(Dm.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = s => this.emit(Dm.DOWNLOAD_PROGRESS, s)),
                            await this.httpExecutor.download(n.url, i, o);
                    }
                });
            }
            doInstall(t) {
                let r = t.installerPath,
                    n = this.wrapSudo(),
                    i = /pkexec/i.test(n) ? "" : '"',
                    o = this.spawnSyncLog("which zypper"),
                    s;
                return (
                    o
                        ? (s = [o, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", r])
                        : (s = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", r]),
                    this.spawnSyncLog(n, ["".concat(i, "/bin/bash"), "-c", "'".concat(s.join(" "), "'").concat(i)]),
                    t.isForceRunAfter && this.app.relaunch(),
                    !0
                );
            }
        };
    to.RpmUpdater = Ma;
});
var ja = g(ro => {
    "use strict";
    Object.defineProperty(ro, "__esModule", { value: !0 });
    ro.MacUpdater = void 0;
    var Fm = ue(),
        qm = Qe(),
        Lm = require("fs"),
        Um = require("path"),
        oO = require("http"),
        sO = Ji(),
        aO = ke(),
        $m = require("child_process"),
        km = require("crypto"),
        Ha = class extends sO.AppUpdater {
            constructor(t, r) {
                super(t, r),
                    (this.nativeUpdater = require("electron").autoUpdater),
                    (this.squirrelDownloadedUpdate = !1),
                    this.nativeUpdater.on("error", n => {
                        this._logger.warn(n), this.emit("error", n);
                    }),
                    this.nativeUpdater.on("update-downloaded", () => {
                        (this.squirrelDownloadedUpdate = !0), this.debug("nativeUpdater.update-downloaded");
                    });
            }
            debug(t) {
                this._logger.debug != null && this._logger.debug(t);
            }
            closeServerIfExists() {
                this.server &&
                    (this.debug("Closing proxy server"),
                    this.server.close(t => {
                        t &&
                            this.debug(
                                "proxy server wasn't already open, probably attempted closing again as a safety check before quit"
                            );
                    }));
            }
            async doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info),
                    n = this._logger,
                    i = "sysctl.proc_translated",
                    o = !1;
                try {
                    this.debug("Checking for macOS Rosetta environment"),
                        (o = (0, $m.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes("".concat(i, ": 1"))),
                        n.info("Checked for macOS Rosetta environment (isRosetta=".concat(o, ")"));
                } catch (f) {
                    n.warn("sysctl shell command to check for macOS Rosetta environment failed: ".concat(f));
                }
                let s = !1;
                try {
                    this.debug("Checking for arm64 in uname");
                    let m = (0, $m.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
                    n.info("Checked 'uname -a': arm64=".concat(m)), (s = s || m);
                } catch (f) {
                    n.warn("uname shell command to check for arm64 failed: ".concat(f));
                }
                s = s || process.arch === "arm64" || o;
                let a = f => {
                    var m;
                    return (
                        f.url.pathname.includes("arm64") ||
                        ((m = f.info.url) === null || m === void 0 ? void 0 : m.includes("arm64"))
                    );
                };
                s && r.some(a) ? (r = r.filter(f => s === a(f))) : (r = r.filter(f => !a(f)));
                let l = (0, aO.findFile)(r, "zip", ["pkg", "dmg"]);
                if (l == null)
                    throw (0, Fm.newError)(
                        "ZIP file not provided: ".concat((0, Fm.safeStringifyJson)(r)),
                        "ERR_UPDATER_ZIP_FILE_NOT_FOUND"
                    );
                let d = t.updateInfoAndProvider.provider,
                    c = "update.zip";
                return this.executeDownload({
                    fileExtension: "zip",
                    fileInfo: l,
                    downloadUpdateOptions: t,
                    task: async (f, m) => {
                        let p = Um.join(this.downloadedUpdateHelper.cacheDir, c),
                            E = () =>
                                (0, qm.pathExistsSync)(p)
                                    ? !t.disableDifferentialDownload
                                    : (n.info(
                                          "Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"
                                      ),
                                      !1),
                            _ = !0;
                        E() && (_ = await this.differentialDownloadInstaller(l, t, f, d, c)),
                            _ && (await this.httpExecutor.download(l.url, f, m));
                    },
                    done: f => {
                        if (!t.disableDifferentialDownload)
                            try {
                                let m = Um.join(this.downloadedUpdateHelper.cacheDir, c);
                                (0, Lm.copyFileSync)(f.downloadedFile, m);
                            } catch (m) {
                                this._logger.warn(
                                    "Unable to copy file for caching for future differential downloads: ".concat(m.message)
                                );
                            }
                        return this.updateDownloaded(l, f);
                    }
                });
            }
            async updateDownloaded(t, r) {
                var n;
                let i = r.downloadedFile,
                    o = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, qm.stat)(i)).size,
                    s = this._logger,
                    a = "fileToProxy=".concat(t.url.href);
                this.closeServerIfExists(),
                    this.debug("Creating proxy server for native Squirrel.Mac (".concat(a, ")")),
                    (this.server = (0, oO.createServer)()),
                    this.debug("Proxy server for native Squirrel.Mac is created (".concat(a, ")")),
                    this.server.on("close", () => {
                        s.info("Proxy server for native Squirrel.Mac is closed (".concat(a, ")"));
                    });
                let l = d => {
                    let c = d.address();
                    return typeof c == "string" ? c : "http://127.0.0.1:".concat(c?.port);
                };
                return await new Promise((d, c) => {
                    let f = (0, km.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"),
                        m = Buffer.from("autoupdater:".concat(f), "ascii"),
                        p = "/".concat((0, km.randomBytes)(64).toString("hex"), ".zip");
                    this.server.on("request", (E, _) => {
                        let A = E.url;
                        if ((s.info("".concat(A, " requested")), A === "/")) {
                            if (!E.headers.authorization || E.headers.authorization.indexOf("Basic ") === -1) {
                                (_.statusCode = 401),
                                    (_.statusMessage = "Invalid Authentication Credentials"),
                                    _.end(),
                                    s.warn("No authenthication info");
                                return;
                            }
                            let N = E.headers.authorization.split(" ")[1],
                                L = Buffer.from(N, "base64").toString("ascii"),
                                [qe, Y] = L.split(":");
                            if (qe !== "autoupdater" || Y !== f) {
                                (_.statusCode = 401),
                                    (_.statusMessage = "Invalid Authentication Credentials"),
                                    _.end(),
                                    s.warn("Invalid authenthication credentials");
                                return;
                            }
                            let fe = Buffer.from('{ "url": "'.concat(l(this.server)).concat(p, '" }'));
                            _.writeHead(200, { "Content-Type": "application/json", "Content-Length": fe.length }), _.end(fe);
                            return;
                        }
                        if (!A.startsWith(p)) {
                            s.warn("".concat(A, " requested, but not supported")), _.writeHead(404), _.end();
                            return;
                        }
                        s.info("".concat(p, " requested by Squirrel.Mac, pipe ").concat(i));
                        let T = !1;
                        _.on("finish", () => {
                            T || (this.nativeUpdater.removeListener("error", c), d([]));
                        });
                        let C = (0, Lm.createReadStream)(i);
                        C.on("error", N => {
                            try {
                                _.end();
                            } catch (L) {
                                s.warn("cannot end response: ".concat(L));
                            }
                            (T = !0),
                                this.nativeUpdater.removeListener("error", c),
                                c(new Error('Cannot pipe "'.concat(i, '": ').concat(N)));
                        }),
                            _.writeHead(200, { "Content-Type": "application/zip", "Content-Length": o }),
                            C.pipe(_);
                    }),
                        this.debug("Proxy server for native Squirrel.Mac is starting to listen (".concat(a, ")")),
                        this.server.listen(0, "127.0.0.1", () => {
                            this.debug(
                                "Proxy server for native Squirrel.Mac is listening (address="
                                    .concat(l(this.server), ", ")
                                    .concat(a, ")")
                            ),
                                this.nativeUpdater.setFeedURL({
                                    url: l(this.server),
                                    headers: {
                                        "Cache-Control": "no-cache",
                                        "Authorization": "Basic ".concat(m.toString("base64"))
                                    }
                                }),
                                this.dispatchUpdateDownloaded(r),
                                this.autoInstallOnAppQuit
                                    ? (this.nativeUpdater.once("error", c), this.nativeUpdater.checkForUpdates())
                                    : d([]);
                        });
                });
            }
            quitAndInstall() {
                this.squirrelDownloadedUpdate
                    ? (this.nativeUpdater.quitAndInstall(), this.closeServerIfExists())
                    : (this.nativeUpdater.on("update-downloaded", () => {
                          this.nativeUpdater.quitAndInstall(), this.closeServerIfExists();
                      }),
                      this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
            }
        };
    ro.MacUpdater = Ha;
});
var jm = g(Ga => {
    "use strict";
    Object.defineProperty(Ga, "__esModule", { value: !0 });
    Ga.verifySignature = uO;
    var Mm = ue(),
        Hm = require("child_process"),
        lO = require("os"),
        Bm = require("path");
    function uO(e, t, r) {
        return new Promise((n, i) => {
            let o = t.replace(/'/g, "''");
            r.info("Verifying signature ".concat(o)),
                (0, Hm.execFile)(
                    'set "PSModulePath=" & chcp 65001 >NUL & powershell.exe',
                    [
                        "-NoProfile",
                        "-NonInteractive",
                        "-InputFormat",
                        "None",
                        "-Command",
                        "\"Get-AuthenticodeSignature -LiteralPath '".concat(o, "' | ConvertTo-Json -Compress\"")
                    ],
                    { shell: !0, timeout: 20 * 1e3 },
                    (s, a, l) => {
                        var d;
                        try {
                            if (s != null || l) {
                                Wa(r, s, l, i), n(null);
                                return;
                            }
                            let c = cO(a);
                            if (c.Status === 0) {
                                try {
                                    let E = Bm.normalize(c.Path),
                                        _ = Bm.normalize(t);
                                    if ((r.info("LiteralPath: ".concat(E, ". Update Path: ").concat(_)), E !== _)) {
                                        Wa(r, new Error("LiteralPath of ".concat(E, " is different than ").concat(_)), l, i),
                                            n(null);
                                        return;
                                    }
                                } catch (E) {
                                    r.warn(
                                        "Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ".concat(
                                            (d = E.message) !== null && d !== void 0 ? d : E.stack
                                        )
                                    );
                                }
                                let m = (0, Mm.parseDn)(c.SignerCertificate.Subject),
                                    p = !1;
                                for (let E of e) {
                                    let _ = (0, Mm.parseDn)(E);
                                    if (
                                        (_.size
                                            ? (p = Array.from(_.keys()).every(T => _.get(T) === m.get(T)))
                                            : E === m.get("CN") &&
                                              (r.warn(
                                                  "Signature validated using only CN ".concat(
                                                      E,
                                                      ". Please add your full Distinguished Name (DN) to publisherNames configuration"
                                                  )
                                              ),
                                              (p = !0)),
                                        p)
                                    ) {
                                        n(null);
                                        return;
                                    }
                                }
                            }
                            let f =
                                "publisherNames: ".concat(e.join(" | "), ", raw info: ") +
                                JSON.stringify(c, (m, p) => (m === "RawData" ? void 0 : p), 2);
                            r.warn("Sign verification failed, installer signed with incorrect certificate: ".concat(f)), n(f);
                        } catch (c) {
                            Wa(r, c, null, i), n(null);
                            return;
                        }
                    }
                );
        });
    }
    function cO(e) {
        let t = JSON.parse(e);
        delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
        let r = t.SignerCertificate;
        return (
            r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName),
            t
        );
    }
    function Wa(e, t, r, n) {
        if (fO()) {
            e.warn(
                "Cannot execute Get-AuthenticodeSignature: ".concat(
                    t || r,
                    ". Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher."
                )
            );
            return;
        }
        try {
            (0, Hm.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], {
                timeout: 10 * 1e3
            });
        } catch (i) {
            e.warn(
                "Cannot execute ConvertTo-Json: ".concat(
                    i.message,
                    ". Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher."
                )
            );
            return;
        }
        t != null && n(t),
            r &&
                n(
                    new Error(
                        "Cannot execute Get-AuthenticodeSignature, stderr: ".concat(
                            r,
                            ". Failing signature validation due to unknown stderr."
                        )
                    )
                );
    }
    function fO() {
        let e = lO.release();
        return e.startsWith("6.") && !e.startsWith("6.3");
    }
});
var Ya = g(io => {
    "use strict";
    Object.defineProperty(io, "__esModule", { value: !0 });
    io.NsisUpdater = void 0;
    var no = ue(),
        Wm = require("path"),
        hO = vr(),
        dO = qa(),
        Gm = jt(),
        pO = ke(),
        mO = Qe(),
        gO = jm(),
        Vm = require("url"),
        Va = class extends hO.BaseUpdater {
            constructor(t, r) {
                super(t, r), (this._verifyUpdateCodeSignature = (n, i) => (0, gO.verifySignature)(n, i, this._logger));
            }
            get verifyUpdateCodeSignature() {
                return this._verifyUpdateCodeSignature;
            }
            set verifyUpdateCodeSignature(t) {
                t && (this._verifyUpdateCodeSignature = t);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, pO.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
                return this.executeDownload({
                    fileExtension: "exe",
                    downloadUpdateOptions: t,
                    fileInfo: n,
                    task: async (i, o, s, a) => {
                        let l = n.packageInfo,
                            d = l != null && s != null;
                        if (d && t.disableWebInstaller)
                            throw (0, no.newError)(
                                "Unable to download new version ".concat(
                                    t.updateInfoAndProvider.info.version,
                                    ". Web Installers are disabled"
                                ),
                                "ERR_UPDATER_WEB_INSTALLER_DISABLED"
                            );
                        !d &&
                            !t.disableWebInstaller &&
                            this._logger.warn(
                                "disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."
                            ),
                            (d ||
                                t.disableDifferentialDownload ||
                                (await this.differentialDownloadInstaller(n, t, i, r, no.CURRENT_APP_INSTALLER_FILE_NAME))) &&
                                (await this.httpExecutor.download(n.url, i, o));
                        let c = await this.verifySignature(i);
                        if (c != null)
                            throw (
                                (await a(),
                                (0, no.newError)(
                                    "New version "
                                        .concat(t.updateInfoAndProvider.info.version, " is not signed by the application owner: ")
                                        .concat(c),
                                    "ERR_UPDATER_INVALID_SIGNATURE"
                                ))
                            );
                        if (d && (await this.differentialDownloadWebPackage(t, l, s, r)))
                            try {
                                await this.httpExecutor.download(new Vm.URL(l.path), s, {
                                    headers: t.requestHeaders,
                                    cancellationToken: t.cancellationToken,
                                    sha512: l.sha512
                                });
                            } catch (f) {
                                try {
                                    await (0, mO.unlink)(s);
                                } catch {}
                                throw f;
                            }
                    }
                });
            }
            async verifySignature(t) {
                let r;
                try {
                    if (((r = (await this.configOnDisk.value).publisherName), r == null)) return null;
                } catch (n) {
                    if (n.code === "ENOENT") return null;
                    throw n;
                }
                return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], t);
            }
            doInstall(t) {
                let r = ["--updated"];
                t.isSilent && r.push("/S"),
                    t.isForceRunAfter && r.push("--force-run"),
                    this.installDirectory && r.push("/D=".concat(this.installDirectory));
                let n = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
                n != null && r.push("--package-file=".concat(n));
                let i = () => {
                    this.spawnLog(Wm.join(process.resourcesPath, "elevate.exe"), [t.installerPath].concat(r)).catch(o =>
                        this.dispatchError(o)
                    );
                };
                return t.isAdminRightsRequired
                    ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), i(), !0)
                    : (this.spawnLog(t.installerPath, r).catch(o => {
                          let s = o.code;
                          this._logger.info(
                              "Cannot run installer: error code: "
                                  .concat(s, ', error message: "')
                                  .concat(
                                      o.message,
                                      '", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT'
                                  )
                          ),
                              s === "UNKNOWN" || s === "EACCES"
                                  ? i()
                                  : s === "ENOENT"
                                  ? require("electron")
                                        .shell.openPath(t.installerPath)
                                        .catch(a => this.dispatchError(a))
                                  : this.dispatchError(o);
                      }),
                      !0);
            }
            async differentialDownloadWebPackage(t, r, n, i) {
                if (r.blockMapSize == null) return !0;
                try {
                    let o = {
                        newUrl: new Vm.URL(r.path),
                        oldFile: Wm.join(this.downloadedUpdateHelper.cacheDir, no.CURRENT_APP_PACKAGE_FILE_NAME),
                        logger: this._logger,
                        newFile: n,
                        requestHeaders: this.requestHeaders,
                        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
                        cancellationToken: t.cancellationToken
                    };
                    this.listenerCount(Gm.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = s => this.emit(Gm.DOWNLOAD_PROGRESS, s)),
                        await new dO.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, o).download();
                } catch (o) {
                    return (
                        this._logger.error("Cannot download differentially, fallback to full download: ".concat(o.stack || o)),
                        process.platform === "win32"
                    );
                }
                return !1;
            }
        };
    io.NsisUpdater = Va;
});
var jt = g(M => {
    "use strict";
    Object.defineProperty(M, "__esModule", { value: !0 });
    M.UpdaterSignal =
        M.UPDATE_DOWNLOADED =
        M.DOWNLOAD_PROGRESS =
        M.NsisUpdater =
        M.MacUpdater =
        M.RpmUpdater =
        M.DebUpdater =
        M.AppImageUpdater =
        M.Provider =
        M.CancellationToken =
        M.NoOpLogger =
        M.AppUpdater =
        M.BaseUpdater =
            void 0;
    var wO = ue();
    Object.defineProperty(M, "CancellationToken", {
        enumerable: !0,
        get: function () {
            return wO.CancellationToken;
        }
    });
    var Ym = Qe(),
        yO = require("path"),
        EO = vr();
    Object.defineProperty(M, "BaseUpdater", {
        enumerable: !0,
        get: function () {
            return EO.BaseUpdater;
        }
    });
    var zm = Ji();
    Object.defineProperty(M, "AppUpdater", {
        enumerable: !0,
        get: function () {
            return zm.AppUpdater;
        }
    });
    Object.defineProperty(M, "NoOpLogger", {
        enumerable: !0,
        get: function () {
            return zm.NoOpLogger;
        }
    });
    var _O = ke();
    Object.defineProperty(M, "Provider", {
        enumerable: !0,
        get: function () {
            return _O.Provider;
        }
    });
    var vO = Ua();
    Object.defineProperty(M, "AppImageUpdater", {
        enumerable: !0,
        get: function () {
            return vO.AppImageUpdater;
        }
    });
    var AO = ka();
    Object.defineProperty(M, "DebUpdater", {
        enumerable: !0,
        get: function () {
            return AO.DebUpdater;
        }
    });
    var SO = Ba();
    Object.defineProperty(M, "RpmUpdater", {
        enumerable: !0,
        get: function () {
            return SO.RpmUpdater;
        }
    });
    var CO = ja();
    Object.defineProperty(M, "MacUpdater", {
        enumerable: !0,
        get: function () {
            return CO.MacUpdater;
        }
    });
    var TO = Ya();
    Object.defineProperty(M, "NsisUpdater", {
        enumerable: !0,
        get: function () {
            return TO.NsisUpdater;
        }
    });
    var vt;
    function bO() {
        if (process.platform === "win32") vt = new (Ya().NsisUpdater)();
        else if (process.platform === "darwin") vt = new (ja().MacUpdater)();
        else {
            vt = new (Ua().AppImageUpdater)();
            try {
                let e = yO.join(process.resourcesPath, "package-type");
                if (!(0, Ym.existsSync)(e)) return vt;
                console.info("Checking for beta autoupdate feature for deb/rpm distributions");
                let t = (0, Ym.readFileSync)(e).toString().trim();
                switch ((console.info("Found package-type:", t), t)) {
                    case "deb":
                        vt = new (ka().DebUpdater)();
                        break;
                    case "rpm":
                        vt = new (Ba().RpmUpdater)();
                        break;
                    default:
                        break;
                }
            } catch (e) {
                console.warn(
                    "Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder",
                    e.message
                );
            }
        }
        return vt;
    }
    Object.defineProperty(M, "autoUpdater", { enumerable: !0, get: () => vt || bO() });
    M.DOWNLOAD_PROGRESS = "download-progress";
    M.UPDATE_DOWNLOADED = "update-downloaded";
    var za = class {
        constructor(t) {
            this.emitter = t;
        }
        login(t) {
            oo(this.emitter, "login", t);
        }
        progress(t) {
            oo(this.emitter, M.DOWNLOAD_PROGRESS, t);
        }
        updateDownloaded(t) {
            oo(this.emitter, M.UPDATE_DOWNLOADED, t);
        }
        updateCancelled(t) {
            oo(this.emitter, "update-cancelled", t);
        }
    };
    M.UpdaterSignal = za;
    var OO = !1;
    function oo(e, t, r) {
        OO
            ? e.on(t, (...n) => {
                  console.log("%s %s", t, n), r(...n);
              })
            : e.on(t, r);
    }
});
var so = g((sR, Xm) => {
    var En;
    Xm.exports = ((En = class {}), b(En, "WINDOWS", "win32"), b(En, "MACOS", "darwin"), b(En, "LINUX", "linux"), En);
});
var At = g((uR, Jm) => {
    Jm.exports = class {
        constructor(t) {
            b(this, "_oglama");
            this._oglama = t;
        }
    };
});
var Qm = g((hR, Km) => {
    var xO = require("path"),
        IO = At();
    Km.exports = class extends IO {
        async start() {
            let t = xO.join(this._oglama.rootPath, "res", "index.html"),
                r = { extraHeaders: "pragma: no-cache" };
            this._oglama.mainWindow().loadFile(t, r),
                this._oglama.mainLoginWindow().loadFile(t, r),
                this._oglama.mainWindow().hide(),
                this._oglama.mainLoginWindow().show();
        }
    };
});
var eg = g((pR, Zm) => {
    var NO = At();
    Zm.exports = class extends NO {
        getMainMinWidth() {
            return 1200;
        }
        getMainMinHeight() {
            return 650;
        }
        getMainLoginWidth() {
            return 512;
        }
        getMainLoginHeight() {
            return 512;
        }
        getPort() {
            return 7199;
        }
    };
});
var ng = g((gR, rg) => {
    var RO = At(),
        tg = require("fs");
    rg.exports = class extends RO {
        isFile(t) {
            let r = !1;
            try {
                r = tg.statSync(t).isFile();
            } catch {}
            return r;
        }
        readJSON(t) {
            let r = null,
                n = this.readFile(t);
            return n && (r = this._oglama.utils.parseJSON(n)), r;
        }
        readFile(t) {
            let r = null;
            try {
                let n = tg.readFileSync(t);
                r = Buffer.isBuffer(n) ? n.toString() : n;
            } catch (n) {
                this._oglama.log.error("file:readFile", t, n);
            }
            return r;
        }
    };
});
var og = g((yR, ig) => {
    var PO = At();
    ig.exports = class extends PO {
        error() {
            console.error("%coglama-error", "color:red", ...arguments);
        }
        info() {
            console.info("%coglama-info", "color:lightblue", ...arguments);
        }
    };
});
var ag = g((_R, sg) => {
    var DO = At(),
        FO = require("querystring");
    sg.exports = class extends DO {
        isJSON(t) {
            return typeof t == "string" && (t.charAt(0) == "{" || t.charAt(0) == "[");
        }
        isObject(t) {
            return typeof t == "object" && t !== null;
        }
        parseJSON(t) {
            let r = null;
            if (t !== null && this.isJSON(t))
                try {
                    t.content && (t = t.content), (r = JSON.parse(t));
                } catch (n) {
                    this._oglama.log.error("utils:parseJSON", n);
                }
            return r;
        }
        formatJSON(t, r) {
            typeof r > "u" && (r = null);
            let n = null;
            if (this.isObject(t)) {
                t.content && (t = t.content);
                try {
                    n = JSON.stringify(t, null, r);
                } catch (i) {
                    this._oglama.log.error("utils:formatJSON", i);
                }
            }
            return n;
        }
        mergeObjects(...t) {
            let r = this.isObject,
                n = this.mergeObjects;
            return t.reduce(
                (i, o) => (
                    Object.keys(o).forEach(s => {
                        let a = i[s],
                            l = o[s];
                        do {
                            if (Array.isArray(a) && Array.isArray(l)) {
                                i[s] = a.concat(...l);
                                break;
                            }
                            if (r(a) && r(l)) {
                                i[s] = n(a, l);
                                break;
                            }
                        } while (!1);
                        i[s] = l;
                    }),
                    i
                ),
                {}
            );
        }
        urlFormat(t) {
            let r = null;
            do {
                if (!this.isObject(t)) break;
                let n = (t.protocol || "http") + "://";
                if (t.host) n += t.host;
                else if (t.hostname) (n += t.hostname), t.port && (n += ":" + t.port);
                else break;
                if (t.pathname) {
                    n = n.replace(/\/+$/, "");
                    let i = t.pathname.replace(/^\/+/, "");
                    n += "/" + i;
                }
                r = t.query ? n + "?" + FO.stringify(t.query) : n;
            } while (!1);
            return r;
        }
    };
});
var ug = g((AR, lg) => {
    var qO = At(),
        ao = require("fs"),
        lo = require("path"),
        LO = require("http"),
        Xa;
    lg.exports =
        ((Xa = class extends qO {
            start() {
                if (this.constructor._instance === null) {
                    let t = lo.join(this._oglama.rootPath, "ssg"),
                        r = this._oglama.config.getPort();
                    this.constructor._instance = new Promise((n, i) => {
                        if (this._oglama.devMode) {
                            n(null);
                            return;
                        }
                        try {
                            let o = LO.createServer((s, a) => {
                                let l = ".empty";
                                try {
                                    let c = new URL(s.url, "http://0.0.0.0");
                                    l = decodeURIComponent(c.pathname).replace(/^\/+|\/+$/g, "");
                                } catch {}
                                let d = lo.join(t, l);
                                ao.statSync(d, { throwIfNoEntry: !1 })?.isDirectory() && (d = lo.join(d, "index.html")),
                                    ao.access(d, ao.constants.F_OK, c => {
                                        if (c) {
                                            a.writeHead(404, { "Content-Type": "text/plain" }), a.end("Not Found: ".concat(c));
                                            return;
                                        }
                                        ao.readFile(d, (f, m) => {
                                            if (f) {
                                                a.writeHead(500, { "Content-Type": "text/plain" }),
                                                    a.end("Internal Server Error: ".concat(f));
                                                return;
                                            }
                                            let p = lo.extname(d),
                                                E =
                                                    {
                                                        ".json": "application/json",
                                                        ".woff2": "font/woff2",
                                                        ".html": "text/html",
                                                        ".js": "text/javascript",
                                                        ".txt": "text/plain",
                                                        ".css": "text/css",
                                                        ".ico": "image/x-icon",
                                                        ".jpg": "image/jpeg",
                                                        ".png": "image/png",
                                                        ".gif": "image/gif",
                                                        ".svg": "image/svg+xml"
                                                    }[p] || "application/octet-stream";
                                            a.writeHead(200, { "Content-Type": E }), a.end(m);
                                        });
                                    });
                            });
                            o.listen(r, () => {
                                this._oglama.log.info("webserver:start", "Listening on port ".concat(r)), n(o);
                            });
                        } catch (o) {
                            this._oglama.log.error("webserver:start", o), i(o);
                        }
                    });
                }
                return this.constructor._instance;
            }
        }),
        b(Xa, "_instance", null),
        Xa);
});
var Sr = g((TR, cg) => {
    var UO = At(),
        { ipcMain: $O } = require("electron");
    cg.exports = class extends UO {
        constructor(t) {
            super(t);
        }
        _register(t) {
            if (typeof t == "string")
                for (let r of Object.getOwnPropertyNames(this)) {
                    if (["_", "#"].includes(r[0] || typeof this[r] != "function")) continue;
                    let n = this[r];
                    $O.handle("ipc:".concat(t, ":").concat(r), async (i, ...o) => {
                        let s = null;
                        try {
                            s = typeof n == "function" ? await n(...o) : null;
                        } catch (a) {
                            this._oglama.devMode && console.debug(a), (s = a);
                        }
                        return s;
                    });
                }
        }
    };
});
var dg = g((OR, hg) => {
    var { execSync: Ja } = require("child_process"),
        kO = Sr(),
        ye = so(),
        Cr,
        Tr,
        br,
        St,
        fg;
    hg.exports =
        ((fg = class extends kO {
            constructor(r) {
                super(r);
                z(this, Cr, null);
                z(this, Tr, null);
                z(this, br, null);
                z(this, St, null);
                b(this, "getOS", () => {
                    if (typeof v(this, St) != "string")
                        switch (process.platform) {
                            case ye.MACOS:
                                re(this, St, "macos");
                                break;
                            case ye.WINDOWS:
                                re(this, St, "windows");
                                break;
                            case ye.LINUX:
                                re(this, St, "linux");
                                break;
                        }
                    return v(this, St);
                });
                b(this, "getName", () => {
                    if (typeof v(this, Tr) != "string") {
                        let r = null;
                        switch (process.platform) {
                            case ye.MACOS:
                                r = "echo $(scutil --get LocalHostName).local";
                                break;
                            case ye.WINDOWS:
                            case ye.LINUX:
                                r = "hostname";
                                break;
                        }
                        if (r !== null)
                            try {
                                let n = Ja(r).toString();
                                re(this, Tr, n.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (n) {
                                this._oglama.devMode && console.warn("Device Name", "".concat(n));
                            }
                    }
                    return v(this, Tr);
                });
                b(this, "getUUID", () => {
                    if (typeof v(this, Cr) != "string") {
                        let r = null,
                            n =
                                process.arch === "ia32" && process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432")
                                    ? "%windir%\\sysnative\\cmd.exe /c %windir%\\System32"
                                    : "%windir%\\System32";
                        switch (process.platform) {
                            case ye.MACOS:
                                r = "ioreg -rd1 -c IOPlatformExpertDevice";
                                break;
                            case ye.WINDOWS:
                                r =
                                    "".concat(n, "\\REG.exe") +
                                    " QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid";
                                break;
                            case ye.LINUX:
                                r = "( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :";
                                break;
                        }
                        if (r !== null)
                            try {
                                let i = Ja(r).toString();
                                switch (process.platform) {
                                    case ye.MACOS:
                                        i = i.replace(/^.*?\bIOPlatformUUID"\s*=\s*"(.*?)".*$/gs, "$1");
                                        break;
                                    case ye.WINDOWS:
                                        i = i.split("REG_SZ")[1];
                                        break;
                                }
                                re(this, Cr, i.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (i) {
                                this._oglama.devMode && console.warn("Device UUID", "".concat(i));
                            }
                    }
                    return v(this, Cr);
                });
                b(this, "getSerialNumber", () => {
                    if (typeof v(this, br) != "string") {
                        let r = null;
                        switch (process.platform) {
                            case ye.MACOS:
                                r = "ioreg -l | grep IOPlatformSerialNumber";
                                break;
                            case ye.WINDOWS:
                                r = "wmic bios get SerialNumber";
                                break;
                            case ye.LINUX:
                                r = 'lsblk -o UUID -n /dev/sda* | grep -v "^$" | grep -vE "^.{,20}$" | sed -n 1p';
                                break;
                        }
                        if (r !== null)
                            try {
                                let n = Ja(r).toString();
                                switch (process.platform) {
                                    case ye.MACOS:
                                        n = n.replace(/^.*?\bIOPlatformSerialNumber"\s*=\s*"(.*?)".*$/gs, "$1");
                                        break;
                                    case ye.WINDOWS:
                                        n = n.split("SerialNumber")[1];
                                        break;
                                }
                                re(this, br, n.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (n) {
                                this._oglama.devMode && console.warn("Device Serial Number", "".concat(n));
                            }
                    }
                    return v(this, br);
                });
                b(this, "setPostAuth", r => this._oglama.setPostAuth(!!r));
                b(this, "getPostAuth", () => this._oglama.getPostAuth());
                this._register("device");
            }
        }),
        (Cr = new WeakMap()),
        (Tr = new WeakMap()),
        (br = new WeakMap()),
        (St = new WeakMap()),
        fg);
});
var Or = g((IR, pg) => {
    var We;
    pg.exports =
        ((We = class {
            static getSourceChannelName(t) {
                return "".concat(We.WINDOW_SOURCE, "/").concat(t);
            }
            static getTargetChannelName(t) {
                return "".concat(We.WINDOW_TARGET, "/").concat(t);
            }
        }),
        b(We, "WINDOW_MAIN", "@main"),
        b(We, "WINDOW_MAIN_LOGIN", "@main/login"),
        b(We, "WINDOW_SOURCE", "@source"),
        b(We, "WINDOW_TARGET", "@target"),
        We);
});
var _g = g((PR, Eg) => {
    var { ipcMain: mg, session: MO, BrowserWindow: gg } = require("electron"),
        wg = require("path"),
        BO = Sr(),
        HO = Or(),
        V,
        nt,
        yg;
    Eg.exports =
        ((yg = class extends BO {
            constructor(r) {
                super(r);
                z(this, V, {});
                z(this, nt, {});
                b(this, "list", () => Object.keys(v(this, V)));
                b(this, "closeAll", () => {
                    let r = Object.keys(v(this, V)).length > 0;
                    for (let n of Object.keys(v(this, V))) this.close(n);
                    return r;
                });
                b(this, "open", r => {
                    let n = !1;
                    do {
                        if (typeof r != "string" || !r.length) break;
                        if (typeof v(this, V)[r] < "u") {
                            typeof v(this, V)[r]?.webContents?.focus == "function" && v(this, V)[r].webContents.focus();
                            break;
                        }
                        v(this, V)[r] = new gg({
                            show: !1,
                            minWidth: 512,
                            minHeight: 512,
                            width: 800,
                            height: 600,
                            icon: wg.join(this._oglama.rootPath, "res/icons/icon.png"),
                            resizable: !0,
                            fullscreenable: !1,
                            titleBarStyle: "default",
                            title: "Agent Source Code",
                            useContentSize: !0,
                            autoHideMenuBar: !0,
                            backgroundColor: "#000",
                            webPreferences: {
                                backgroundThrottling: !1,
                                imageAnimationPolicy: "noAnimation",
                                spellcheck: !1,
                                preload: wg.join(this._oglama.rootPath, "lib/preloader/entry/source.js"),
                                nodeIntegration: !0,
                                devTools: this._oglama.devMode,
                                session: MO.defaultSession,
                                cache: !1,
                                webSecurity: !1,
                                allowRunningInsecureContent: !0,
                                additionalArguments: ["--agent-id=".concat(r)]
                            }
                        });
                        let i = HO.getSourceChannelName(r);
                        (v(this, nt)[r] = {
                            channel: i,
                            listener: (o, ...s) => {
                                this._oglama.devMode && console.log("\u{1F3F9} ".concat(i), JSON.stringify(s)),
                                    s.length >= 3 && v(this, V)[r].webContents.send(i, s);
                            }
                        }),
                            mg.on(v(this, nt)[r].channel, v(this, nt)[r].listener),
                            this._oglama.devMode &&
                                v(this, V)[r].webContents.on("context-menu", (o, s) => {
                                    o.preventDefault(), v(this, V)[r].webContents.openDevTools({ mode: "right" });
                                }),
                            v(this, V)[r].setMenu(null),
                            v(this, V)[r].on("closed", () => {
                                mg.off(v(this, nt)[r].channel, v(this, nt)[r].listener),
                                    delete v(this, nt)[r],
                                    delete v(this, V)[r];
                            }),
                            v(this, V)[r].webContents.on("did-finish-load", () => {
                                v(this, V)[r].show(), v(this, V)[r].webContents.focus();
                            }),
                            v(this, V)[r].loadURL("http://localhost:".concat(this._oglama.config.getPort(), "/source-code/")),
                            (n = !0);
                    } while (!1);
                    return n;
                });
                b(this, "close", r => {
                    let n = !1;
                    return typeof v(this, V)[r]?.destroy == "function" && (v(this, V)[r].destroy(), (n = !0)), n;
                });
                b(this, "webContents", async (r, n, i) => {
                    if (
                        (this._oglama.devMode &&
                            console.log("ipc.source.webContents", JSON.stringify({ agentId: r, methodName: n, methodArgs: i })),
                        typeof r != "string" || !r.length)
                    )
                        throw new Error("Invalid Agent ID");
                    if (!(v(this, V)[r] instanceof gg)) throw new Error("Invalid Agent ID");
                    if (typeof n != "string" || typeof v(this, V)[r].webContents[n] != "function")
                        throw new Error("Invalid source webContents method: ".concat(n));
                    return (
                        n === "loadURL" && (v(this, V)[r].metadata.loaded = !0),
                        Array.isArray(i) || (i = []),
                        await v(this, V)[r].webContents[n](...i)
                    );
                });
                this._register("source");
            }
        }),
        (V = new WeakMap()),
        (nt = new WeakMap()),
        yg);
});
var Cg = g((qR, Sg) => {
    var { ipcMain: vg, BrowserView: xr } = require("electron"),
        Ag = require("path"),
        Ka = so(),
        jO = Sr(),
        WO = Or(),
        _n,
        vn,
        An,
        Sn,
        $,
        Xe,
        Je,
        Wt;
    Sg.exports =
        ((_n = class extends jO {
            constructor(r) {
                super(r);
                z(this, vn);
                z(this, An);
                z(this, Sn, "");
                z(this, $, {});
                z(this, Xe, {});
                z(this, Je, "");
                b(this, "setWindowSize", (r, n) => {
                    re(this, vn, r), re(this, An, n), v(this, Wt).call(this);
                });
                b(this, "list", () => Object.keys(v(this, $)));
                b(this, "removeAll", () => {
                    let r = Object.keys(v(this, $)).length > 0;
                    for (let n of Object.keys(v(this, $))) this.remove(n);
                    return r;
                });
                b(this, "add", (r, n, i = !1) => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid Agent ID");
                    if (typeof n != "string" || !n.match(/^https?:\/\//gi)) throw new Error("Invalid target URL");
                    if (v(this, $)[r] instanceof xr) return !1;
                    let o = new xr({
                        width: this._oglama.config.getMainMinWidth() - this.constructor.MARGIN_LEFT,
                        height:
                            this._oglama.config.getMainMinHeight() -
                            (this.constructor.MARGIN_TOP + this.constructor.MARGIN_BOTTOM),
                        resizable: !1,
                        backgroundColor: "#333",
                        transparent: !0,
                        webPreferences: {
                            backgroundThrottling: !1,
                            imageAnimationPolicy: "noAnimation",
                            spellcheck: !1,
                            preload: Ag.join(this._oglama.rootPath, "lib/preloader/entry/target.js"),
                            nodeIntegration: !0,
                            devTools: !0,
                            partition: "persist:target-".concat(r),
                            cache: !1,
                            additionalArguments: ["--agent-id=".concat(r)]
                        }
                    });
                    (o.metadata = { targetUrl: n, loaded: !1 }),
                        o.webContents.once("ready-to-show", () => o.webContents.setZoomFactor(1)),
                        o.webContents.on("dom-ready", () => o.webContents.focus()),
                        o.webContents.setUserAgent(v(this, Sn)),
                        o.webContents.setZoomLevel(0),
                        o.webContents.setAudioMuted(!0),
                        o.webContents.loadFile(Ag.join(this._oglama.rootPath, "res", "index.html"), {
                            extraHeaders: "pragma: no-cache"
                        }),
                        this._oglama.mainWindow().addBrowserView(o),
                        this._oglama.main.view instanceof xr &&
                            (this._oglama.mainWindow().removeBrowserView(this._oglama.main.view),
                            this._oglama.mainWindow().addBrowserView(this._oglama.main.view)),
                        (v(this, $)[r] = o);
                    let s = WO.getTargetChannelName(r);
                    return (
                        (v(this, Xe)[r] = {
                            channel: s,
                            listener: (a, ...l) => {
                                this._oglama.devMode && console.log("\u{1F3AF} ".concat(s), JSON.stringify(l)),
                                    l.length >= 3 && o.webContents.send(s, l);
                            }
                        }),
                        vg.on(v(this, Xe)[r].channel, v(this, Xe)[r].listener),
                        i ? this.select(r) : v(this, Wt).call(this),
                        !0
                    );
                });
                b(this, "remove", r => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid Agent ID");
                    if (!(v(this, $)[r] instanceof xr) || typeof v(this, Xe)[r] > "u") return !1;
                    vg.off(v(this, Xe)[r].channel, v(this, Xe)[r].listener), delete v(this, Xe)[r];
                    try {
                        this._oglama.mainWindow().removeBrowserView(v(this, $)[r]);
                    } catch {}
                    try {
                        v(this, $)[r].webContents.destroy();
                    } catch {}
                    return delete v(this, $)[r], r === v(this, Je) && re(this, Je, ""), v(this, Wt).call(this), !0;
                });
                b(this, "select", r => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid Agent ID");
                    if (v(this, $)[r] instanceof xr && v(this, Je) !== r) {
                        re(this, Je, r),
                            v(this, $)[r].metadata.loaded ||
                                ((v(this, $)[r].metadata.loaded = !0),
                                v(this, $)[r].webContents.loadURL(v(this, $)[r].metadata.targetUrl));
                        let n = {};
                        for (let i of Object.keys(v(this, $)).filter(o => o !== r)) n[i] = v(this, $)[i];
                        return (
                            (n[r] = v(this, $)[r]),
                            re(this, $, n),
                            this._oglama.mainWindow().removeBrowserView(v(this, $)[r]),
                            this._oglama.mainWindow().removeBrowserView(this._oglama.main.view),
                            this._oglama.main.onTop
                                ? (this._oglama.mainWindow().addBrowserView(v(this, $)[r]),
                                  this._oglama.mainWindow().addBrowserView(this._oglama.main.view),
                                  this._oglama.main.view.webContents.focus())
                                : (this._oglama.mainWindow().addBrowserView(this._oglama.main.view),
                                  this._oglama.mainWindow().addBrowserView(v(this, $)[r]),
                                  v(this, $)[r].webContents.focus()),
                            v(this, Wt).call(this),
                            !0
                        );
                    }
                    return !1;
                });
                b(this, "getSelected", () => v(this, Je));
                b(this, "openDevTools", r => {
                    let n = !1;
                    do {
                        if (typeof r != "string" || !r.length || typeof v(this, $)[r]?.webContents?.openDevTools != "function")
                            break;
                        v(this, $)[r].webContents.openDevTools({ mode: "detach" }), (n = !0);
                    } while (!1);
                    return n;
                });
                b(this, "getTargets", () => v(this, $));
                b(this, "webContents", async (r, n, i) => {
                    if (
                        (this._oglama.devMode &&
                            console.log("ipc.target.webContents", JSON.stringify({ agentId: r, methodName: n, methodArgs: i })),
                        typeof r != "string" || !r.length)
                    )
                        throw new Error("Invalid Agent ID");
                    if (!(v(this, $)[r] instanceof xr)) throw new Error("Invalid Agent ID");
                    if (typeof n != "string" || typeof v(this, $)[r].webContents[n] != "function")
                        throw new Error("Invalid target webContents method: ".concat(n));
                    return (
                        n === "loadURL" && (v(this, $)[r].metadata.loaded = !0),
                        Array.isArray(i) || (i = []),
                        await v(this, $)[r].webContents[n](...i)
                    );
                });
                z(this, Wt, () => {
                    if (!Object.keys(v(this, $)).length) return;
                    let r = v(this, vn) - this.constructor.MARGIN_LEFT,
                        n = v(this, An) - (this.constructor.MARGIN_TOP + this.constructor.MARGIN_BOTTOM);
                    for (let i of Object.keys(v(this, $))) {
                        let o = i === v(this, Je) ? this.constructor.MARGIN_LEFT : 100 - r,
                            s = i === v(this, Je) ? this.constructor.MARGIN_TOP : 50 - n;
                        v(this, $)[i].setBounds({ x: o, y: s, width: r, height: n });
                    }
                });
                let n = "";
                switch (process.platform) {
                    case Ka.MACOS:
                        n = "(Macintosh; Intel Mac OS X 13_3)";
                        break;
                    case Ka.WINDOWS:
                        n = "(Windows NT 10.0; Win64; x64)";
                        break;
                    case Ka.LINUX:
                        n = "(X11; Linux x86_64)";
                        break;
                }
                re(this, Sn, "Mozilla/5.0 ".concat(n, " AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")),
                    this._register("target");
            }
        }),
        (vn = new WeakMap()),
        (An = new WeakMap()),
        (Sn = new WeakMap()),
        ($ = new WeakMap()),
        (Xe = new WeakMap()),
        (Je = new WeakMap()),
        (Wt = new WeakMap()),
        b(_n, "MARGIN_LEFT", 250),
        b(_n, "MARGIN_TOP", 50),
        b(_n, "MARGIN_BOTTOM", 50),
        _n);
});
var Og = g(($R, bg) => {
    var { session: GO, shell: VO, ipcMain: YO, BrowserView: Qa } = require("electron"),
        zO = require("path"),
        XO = Sr(),
        Za = Or(),
        uo,
        Tg;
    bg.exports =
        ((Tg = class extends XO {
            constructor(r) {
                super(r);
                b(this, "windowWidth");
                b(this, "windowHeight");
                b(this, "view", null);
                b(this, "darkMode", !0);
                z(this, uo, () =>
                    this.view instanceof Qa
                        ? (this.view.setBounds({ x: 0, y: 0, width: this.windowWidth, height: this.windowHeight }), !0)
                        : !1
                );
                b(this, "init", () =>
                    this.view instanceof Qa
                        ? !1
                        : ((this.windowWidth = this._oglama.config.getMainLoginWidth()),
                          (this.windowHeight = this._oglama.config.getMainLoginHeight()),
                          (this.view = new Qa({
                              width: this.windowWidth,
                              height: this.windowHeight,
                              resizable: !1,
                              backgroundColor: "#00000000",
                              transparent: !0,
                              webPreferences: {
                                  backgroundThrottling: !1,
                                  imageAnimationPolicy: "noAnimation",
                                  spellcheck: !1,
                                  preload: zO.join(this._oglama.rootPath, "lib/preloader/entry/main.js"),
                                  nodeIntegration: !0,
                                  devTools: this._oglama.devMode,
                                  session: GO.defaultSession,
                                  cache: !1,
                                  webSecurity: !1,
                                  allowRunningInsecureContent: !0,
                                  additionalArguments: ["--win-type=main/login"]
                              }
                          })),
                          this.view.webContents.on("ready-to-show", () => this.view.webContents.setZoomFactor(1)),
                          this.view.webContents.setZoomLevel(0),
                          this.view.webContents.setAudioMuted(!1),
                          this.view.webContents.loadURL("http://localhost:".concat(this._oglama.config.getPort(), "/login/")),
                          this.view.webContents.on("dom-ready", () => this.view.webContents.focus()),
                          this._oglama.devMode &&
                              this.view.webContents.on("context-menu", (r, n) => {
                                  r.preventDefault(), this.view.webContents.openDevTools({ mode: "detach" });
                              }),
                          YO.on(Za.WINDOW_MAIN_LOGIN, (r, ...n) => {
                              this._oglama.devMode && console.log("\u{1F3E0} ".concat(Za.WINDOW_MAIN_LOGIN), JSON.stringify(n)),
                                  n.length >= 3 && this.view.webContents.send(Za.WINDOW_MAIN_LOGIN, n);
                          }),
                          this._oglama.mainLoginWindow().addBrowserView(this.view),
                          v(this, uo).call(this),
                          !0)
                );
                b(this, "openExternal", r => {
                    typeof r == "string" && VO.openExternal(r);
                });
                this._register("main/login");
            }
        }),
        (uo = new WeakMap()),
        Tg);
});
var Ng = g((BR, Ig) => {
    var { app: JO, session: KO, shell: QO, ipcMain: ZO, BrowserView: co } = require("electron"),
        ex = require("path"),
        tx = Sr(),
        el = Or(),
        rx = Og(),
        Ir,
        xg;
    Ig.exports =
        ((xg = class extends tx {
            constructor(r) {
                super(r);
                b(this, "windowWidth");
                b(this, "windowHeight");
                b(this, "view", null);
                b(this, "onTop", !1);
                b(this, "darkMode", !0);
                b(this, "login", null);
                z(this, Ir, () =>
                    this.view instanceof co
                        ? (this.view.setBounds({ x: 0, y: 0, width: this.windowWidth, height: this.windowHeight }), !0)
                        : !1
                );
                b(this, "init", () =>
                    this.view instanceof co
                        ? !1
                        : ((this.windowWidth = this._oglama.config.getMainMinWidth()),
                          (this.windowHeight = this._oglama.config.getMainMinHeight()),
                          (this.view = new co({
                              width: this.windowWidth,
                              height: this.windowHeight,
                              resizable: !1,
                              backgroundColor: "#00000000",
                              transparent: !0,
                              webPreferences: {
                                  backgroundThrottling: !1,
                                  imageAnimationPolicy: "noAnimation",
                                  spellcheck: !1,
                                  preload: ex.join(this._oglama.rootPath, "lib/preloader/entry/main.js"),
                                  nodeIntegration: !0,
                                  devTools: this._oglama.devMode,
                                  session: KO.defaultSession,
                                  cache: !1,
                                  webSecurity: !1,
                                  allowRunningInsecureContent: !0
                              }
                          })),
                          this.view.webContents.on("ready-to-show", () => this.view.webContents.setZoomFactor(1)),
                          this.view.webContents.setZoomLevel(0),
                          this.view.webContents.setAudioMuted(!1),
                          this.view.webContents.loadURL("http://localhost:".concat(this._oglama.config.getPort(), "/")),
                          this.view.webContents.on("dom-ready", () => this.view.webContents.focus()),
                          this._oglama.devMode &&
                              this.view.webContents.on("context-menu", (r, n) => {
                                  r.preventDefault(), this.view.webContents.openDevTools({ mode: "detach" });
                              }),
                          ZO.on(el.WINDOW_MAIN, (r, ...n) => {
                              this._oglama.devMode && console.log("\u{1F3E0} ".concat(el.WINDOW_MAIN), JSON.stringify(n)),
                                  n.length >= 3 && this.view.webContents.send(el.WINDOW_MAIN, n);
                          }),
                          this._oglama.mainWindow().addBrowserView(this.view),
                          v(this, Ir).call(this),
                          !0)
                );
                b(this, "setWindowSize", (r, n) => {
                    (this.windowWidth = r), (this.windowHeight = n), v(this, Ir).call(this);
                });
                b(this, "setOnTop", r => {
                    let n = !1;
                    if (((r = !!r), this.getOnTop() !== r)) {
                        if (((this.onTop = r), this.onTop))
                            this._oglama.mainWindow().removeBrowserView(this.view),
                                this._oglama.mainWindow().addBrowserView(this.view),
                                this.view?.webContents?.focus();
                        else {
                            let i = this._oglama.target.getSelected();
                            if (typeof i == "string" && i.length) {
                                let o = this._oglama.target.getTargets()[i];
                                o instanceof co &&
                                    (this._oglama.mainWindow().removeBrowserView(o),
                                    this._oglama.mainWindow().removeBrowserView(this.view),
                                    this._oglama.mainWindow().addBrowserView(this.view),
                                    this._oglama.mainWindow().addBrowserView(o),
                                    o.webContents.focus());
                            }
                        }
                        v(this, Ir).call(this), (n = !0);
                    }
                    return n;
                });
                b(this, "getOnTop", () => this.onTop);
                b(this, "setDarkMode", r => {
                    let n = !1;
                    return (
                        (r = !!r),
                        this.getDarkMode() !== r &&
                            ((this.darkMode = r), this._oglama.mainWindow().setBackgroundColor(r ? "#333" : "#fff"), (n = !0)),
                        n
                    );
                });
                b(this, "quit", () => {
                    JO.quit();
                });
                b(this, "getDarkMode", () => this.darkMode);
                b(this, "openExternal", r => {
                    typeof r == "string" && QO.openExternal(r);
                });
                this._register("main"), (this.login = new rx(r));
            }
        }),
        (Ir = new WeakMap()),
        xg);
});
var Lg = g((WR, qg) => {
    var { app: tl, session: Rg, BrowserWindow: Pg } = require("electron"),
        Dg = require("path"),
        rl = so(),
        nx = Qm(),
        ix = eg(),
        ox = ng(),
        sx = og(),
        ax = ag(),
        lx = ug(),
        ux = dg(),
        cx = _g(),
        fx = Cg(),
        hx = Ng(),
        nl = Or(),
        ee,
        Cn,
        Tn,
        Me,
        Fg;
    qg.exports =
        ((Fg = class {
            constructor() {
                z(this, ee, null);
                z(this, Cn, null);
                z(this, Tn, !1);
                z(this, Me, null);
                b(this, "rootPath", tl.getAppPath());
                b(this, "devMode", !1);
                b(this, "log", new sx(this));
                b(this, "webserver", new lx(this));
                b(this, "activity", new nx(this));
                b(this, "device", new ux(this));
                b(this, "source", new cx(this));
                b(this, "target", new fx(this));
                b(this, "main", new hx(this));
                b(this, "config", new ix(this));
                b(this, "file", new ox(this));
                b(this, "utils", new ax(this));
            }
            mainWindow() {
                let t = this;
                if (v(t, ee) === null) {
                    re(
                        t,
                        ee,
                        new Pg({
                            show: !1,
                            minWidth: t.config.getMainMinWidth(),
                            minHeight: t.config.getMainMinHeight(),
                            width: t.config.getMainMinWidth(),
                            height: t.config.getMainMinHeight(),
                            icon: Dg.join(t.rootPath, "res/icons/icon.png"),
                            resizable: !0,
                            fullscreenable: !1,
                            titleBarStyle: "default",
                            title: "Oglama",
                            useContentSize: !0,
                            backgroundColor: "#000",
                            webPreferences: {
                                backgroundThrottling: !1,
                                spellcheck: !1,
                                nodeIntegration: !0,
                                session: Rg.defaultSession
                            }
                        })
                    ),
                        v(t, ee).setMenu(null),
                        v(t, ee).setMaxListeners(0),
                        v(t, ee).on("closed", () => {
                            re(t, ee, null), tl.quit();
                        });
                    let r = () => {
                        let n = v(t, ee).getSize(),
                            i = [rl.WINDOWS, rl.MACOS].includes(process.platform)
                                ? Math.abs(v(t, ee).getSize()[1] - v(t, ee).getContentSize()[1])
                                : 0,
                            o = [rl.WINDOWS].includes(process.platform)
                                ? Math.abs(v(t, ee).getSize()[0] - v(t, ee).getContentSize()[0])
                                : 0;
                        t.main.setWindowSize(n[0] - o, n[1] - i), t.target.setWindowSize(n[0] - o, n[1] - i);
                    };
                    v(t, ee).on("resize", () => r()),
                        v(t, ee).once("ready-to-show", () => r()),
                        t.main.init(),
                        t.main.view.webContents.on("did-finish-load", () => {
                            t.getPostAuth() && v(t, ee).show(), r();
                        }),
                        v(t, ee).setMenu(null),
                        re(
                            t,
                            Cn,
                            setInterval(() => {
                                if (v(t, ee) === null) {
                                    clearInterval(v(t, Cn));
                                    return;
                                }
                                let n = v(t, ee).getSize();
                                v(t, ee).setSize(n[0] + 1, n[1]), setTimeout(() => v(t, ee).setSize(n[0], n[1]), 250);
                            }, 9e4)
                        );
                }
                return v(t, ee);
            }
            mainLoginWindow() {
                let t = this;
                return (
                    v(t, Me) === null &&
                        (re(
                            t,
                            Me,
                            new Pg({
                                width: t.config.getMainLoginWidth(),
                                height: t.config.getMainLoginHeight(),
                                icon: Dg.join(t.rootPath, "res/icons/icon.png"),
                                resizable: !1,
                                fullscreenable: !1,
                                transparent: !0,
                                titleBarStyle: "hidden",
                                title: "Oglama",
                                backgroundColor: "#00000000",
                                webPreferences: {
                                    backgroundThrottling: !1,
                                    spellcheck: !1,
                                    nodeIntegration: !0,
                                    session: Rg.defaultSession
                                }
                            })
                        ),
                        v(t, Me).setMenu(null),
                        v(t, Me).setMaxListeners(0),
                        v(t, Me).on("closed", () => {
                            re(t, Me, null), tl.quit();
                        }),
                        t.main?.login?.init(),
                        t.main?.login?.view.webContents.on("did-finish-load", () => {
                            t.getPostAuth() || v(t, Me).show();
                        }),
                        v(t, Me).setMenu(null)),
                    v(t, Me)
                );
            }
            getPostAuth() {
                return v(this, Tn);
            }
            setPostAuth(t) {
                let r = !1;
                if (((t = !!t), t !== this.getPostAuth())) {
                    re(this, Tn, t);
                    let n = ["onPostAuth", [t], { type: "req", fromWin: nl.WINDOW_MAIN_LOGIN }];
                    this.main?.login?.view.webContents.send(nl.WINDOW_MAIN_LOGIN, n),
                        setTimeout(() => {
                            this.main?.view.webContents.send(nl.WINDOW_MAIN, n);
                        }, 750),
                        t
                            ? (this.mainWindow().show(), this.mainLoginWindow().hide())
                            : (this.mainWindow().hide(), this.mainLoginWindow().show()),
                        (r = !0);
                }
                return r;
            }
        }),
        (ee = new WeakMap()),
        (Cn = new WeakMap()),
        (Tn = new WeakMap()),
        (Me = new WeakMap()),
        Fg);
});
var { app: Fe, BrowserWindow: dx } = require("electron"),
    { autoUpdater: il } = jt(),
    px = Lg();
Fe.disableHardwareAcceleration();
Fe.commandLine.appendSwitch("disable-gpu");
Fe.commandLine.appendSwitch("allow-insecure-localhost");
Fe.commandLine.appendSwitch("disable-renderer-backgrounding");
Fe.commandLine.appendSwitch("disable-background-timer-throttling");
Fe.commandLine.appendSwitch("disable-backgrounding-occluded-windows");
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
process.on("uncaughtException", e => {
    process.env.NODE_ENV === "development" && console.debug(e);
});
var Be = null;
do {
    if (!Fe.requestSingleInstanceLock()) {
        Fe.quit();
        break;
    }
    Fe.on("second-instance", () => {
        Be !== null &&
            (Be.getPostAuth()
                ? (Be.mainWindow().isMinimized() && Be.mainWindow().restore(), Be.mainWindow().show())
                : (Be.mainLoginWindow().isMinimized() && Be.mainLoginWindow().restore(), Be.mainLoginWindow().show()));
    }),
        Fe.on("ready", async () => {
            (Be = new px()),
                Fe.on("activate", () => {
                    dx.getAllWindows().length === 0 && Be.activity.start();
                }),
                await Be.webserver.start(),
                await Be.activity.start(),
                il.checkForUpdatesAndNotify();
        }),
        il.on("update-downloaded", () => {
            dialog
                .showMessageBox({ type: "info", title: "Update ready", message: "Install now?", buttons: ["Yes", "Later"] })
                .then(e => {
                    e.response === 0 && il.quitAndInstall();
                });
        }),
        Fe.on("window-all-closed", () => {
            process.platform !== "darwin" && Fe.quit();
        });
} while (!1);
