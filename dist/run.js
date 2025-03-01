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
var o0 = Object.defineProperty;
var Sl = e => {
    throw TypeError(e);
};
var a0 = (e, t, r) => (t in e ? o0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r));
var g = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var b = (e, t, r) => a0(e, typeof t != "symbol" ? t + "" : t, r),
    Al = (e, t, r) => t.has(e) || Sl("Cannot " + r);
var E = (e, t, r) => (Al(e, t, "read from private field"), r ? r.call(e) : t.get(e)),
    U = (e, t, r) =>
        t.has(e) ? Sl("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r),
    ee = (e, t, r, n) => (Al(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
var qn = g(tr => {
    "use strict";
    Object.defineProperty(tr, "__esModule", { value: !0 });
    tr.CancellationError = tr.CancellationToken = void 0;
    var l0 = require("events"),
        Cs = class extends l0.EventEmitter {
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
                if (this.cancelled) return Promise.reject(new Ur());
                let r = () => {
                        if (n != null)
                            try {
                                this.removeListener("cancel", n), (n = null);
                            } catch {}
                    },
                    n = null;
                return new Promise((i, s) => {
                    let o = null;
                    if (
                        ((n = () => {
                            try {
                                o != null && (o(), (o = null));
                            } finally {
                                s(new Ur());
                            }
                        }),
                        this.cancelled)
                    ) {
                        n();
                        return;
                    }
                    this.onCancel(n),
                        t(i, s, a => {
                            o = a;
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
    tr.CancellationToken = Cs;
    var Ur = class extends Error {
        constructor() {
            super("cancelled");
        }
    };
    tr.CancellationError = Ur;
});
var Tl = g((Hx, Cl) => {
    var rr = 1e3,
        nr = rr * 60,
        ir = nr * 60,
        Nt = ir * 24,
        u0 = Nt * 7,
        c0 = Nt * 365.25;
    Cl.exports = function (e, t) {
        t = t || {};
        var r = typeof e;
        if (r === "string" && e.length > 0) return f0(e);
        if (r === "number" && isFinite(e)) return t.long ? d0(e) : h0(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
    };
    function f0(e) {
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
                        return r * c0;
                    case "weeks":
                    case "week":
                    case "w":
                        return r * u0;
                    case "days":
                    case "day":
                    case "d":
                        return r * Nt;
                    case "hours":
                    case "hour":
                    case "hrs":
                    case "hr":
                    case "h":
                        return r * ir;
                    case "minutes":
                    case "minute":
                    case "mins":
                    case "min":
                    case "m":
                        return r * nr;
                    case "seconds":
                    case "second":
                    case "secs":
                    case "sec":
                    case "s":
                        return r * rr;
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
    function h0(e) {
        var t = Math.abs(e);
        return t >= Nt
            ? Math.round(e / Nt) + "d"
            : t >= ir
            ? Math.round(e / ir) + "h"
            : t >= nr
            ? Math.round(e / nr) + "m"
            : t >= rr
            ? Math.round(e / rr) + "s"
            : e + "ms";
    }
    function d0(e) {
        var t = Math.abs(e);
        return t >= Nt
            ? Ln(e, t, Nt, "day")
            : t >= ir
            ? Ln(e, t, ir, "hour")
            : t >= nr
            ? Ln(e, t, nr, "minute")
            : t >= rr
            ? Ln(e, t, rr, "second")
            : e + " ms";
    }
    function Ln(e, t, r, n) {
        var i = t >= r * 1.5;
        return Math.round(e / r) + " " + n + (i ? "s" : "");
    }
});
var Ts = g((Wx, bl) => {
    function p0(e) {
        (r.debug = r),
            (r.default = r),
            (r.coerce = l),
            (r.disable = o),
            (r.enable = i),
            (r.enabled = a),
            (r.humanize = Tl()),
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
                _;
            function v(...S) {
                if (!v.enabled) return;
                let T = v,
                    C = Number(new Date()),
                    I = C - (f || C);
                (T.diff = I),
                    (T.prev = f),
                    (T.curr = C),
                    (f = C),
                    (S[0] = r.coerce(S[0])),
                    typeof S[0] != "string" && S.unshift("%O");
                let L = 0;
                (S[0] = S[0].replace(/%([a-zA-Z%])/g, (X, de) => {
                    if (X === "%%") return "%";
                    L++;
                    let y = r.formatters[de];
                    if (typeof y == "function") {
                        let D = S[L];
                        (X = y.call(T, D)), S.splice(L, 1), L--;
                    }
                    return X;
                })),
                    r.formatArgs.call(T, S),
                    (T.log || r.log).apply(T, S);
            }
            return (
                (v.namespace = c),
                (v.useColors = r.useColors()),
                (v.color = r.selectColor(c)),
                (v.extend = n),
                (v.destroy = r.destroy),
                Object.defineProperty(v, "enabled", {
                    enumerable: !0,
                    configurable: !1,
                    get: () => (m !== null ? m : (p !== r.namespaces && ((p = r.namespaces), (_ = r.enabled(c))), _)),
                    set: S => {
                        m = S;
                    }
                }),
                typeof r.init == "function" && r.init(v),
                v
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
        function s(c, f) {
            let m = 0,
                p = 0,
                _ = -1,
                v = 0;
            for (; m < c.length; )
                if (p < f.length && (f[p] === c[m] || f[p] === "*")) f[p] === "*" ? ((_ = p), (v = m), p++) : (m++, p++);
                else if (_ !== -1) (p = _ + 1), v++, (m = v);
                else return !1;
            for (; p < f.length && f[p] === "*"; ) p++;
            return p === f.length;
        }
        function o() {
            let c = [...r.names, ...r.skips.map(f => "-" + f)].join(",");
            return r.enable(""), c;
        }
        function a(c) {
            for (let f of r.skips) if (s(c, f)) return !1;
            for (let f of r.names) if (s(c, f)) return !0;
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
    bl.exports = p0;
});
var Ol = g((qe, $n) => {
    qe.formatArgs = g0;
    qe.save = w0;
    qe.load = y0;
    qe.useColors = m0;
    qe.storage = E0();
    qe.destroy = (() => {
        let e = !1;
        return () => {
            e ||
                ((e = !0),
                console.warn(
                    "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
                ));
        };
    })();
    qe.colors = [
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
    function m0() {
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
    function g0(e) {
        if (
            ((e[0] =
                (this.useColors ? "%c" : "") +
                this.namespace +
                (this.useColors ? " %c" : " ") +
                e[0] +
                (this.useColors ? "%c " : " ") +
                "+" +
                $n.exports.humanize(this.diff)),
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
    qe.log = console.debug || console.log || (() => {});
    function w0(e) {
        try {
            e ? qe.storage.setItem("debug", e) : qe.storage.removeItem("debug");
        } catch {}
    }
    function y0() {
        let e;
        try {
            e = qe.storage.getItem("debug");
        } catch {}
        return !e && typeof process < "u" && "env" in process && (e = process.env.DEBUG), e;
    }
    function E0() {
        try {
            return localStorage;
        } catch {}
    }
    $n.exports = Ts()(qe);
    var { formatters: _0 } = $n.exports;
    _0.j = function (e) {
        try {
            return JSON.stringify(e);
        } catch (t) {
            return "[UnexpectedJSONParseError]: " + t.message;
        }
    };
});
var Nl = g((Gx, xl) => {
    "use strict";
    xl.exports = (e, t = process.argv) => {
        let r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--",
            n = t.indexOf(r + e),
            i = t.indexOf("--");
        return n !== -1 && (i === -1 || n < i);
    };
});
var Dl = g((Vx, Rl) => {
    "use strict";
    var v0 = require("os"),
        Il = require("tty"),
        Ue = Nl(),
        { env: le } = process,
        ct;
    Ue("no-color") || Ue("no-colors") || Ue("color=false") || Ue("color=never")
        ? (ct = 0)
        : (Ue("color") || Ue("colors") || Ue("color=true") || Ue("color=always")) && (ct = 1);
    "FORCE_COLOR" in le &&
        (le.FORCE_COLOR === "true"
            ? (ct = 1)
            : le.FORCE_COLOR === "false"
            ? (ct = 0)
            : (ct = le.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(le.FORCE_COLOR, 10), 3)));
    function bs(e) {
        return e === 0 ? !1 : { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 };
    }
    function Os(e, t) {
        if (ct === 0) return 0;
        if (Ue("color=16m") || Ue("color=full") || Ue("color=truecolor")) return 3;
        if (Ue("color=256")) return 2;
        if (e && !t && ct === void 0) return 0;
        let r = ct || 0;
        if (le.TERM === "dumb") return r;
        if (process.platform === "win32") {
            let n = v0.release().split(".");
            return Number(n[0]) >= 10 && Number(n[2]) >= 10586 ? (Number(n[2]) >= 14931 ? 3 : 2) : 1;
        }
        if ("CI" in le)
            return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some(n => n in le) ||
                le.CI_NAME === "codeship"
                ? 1
                : r;
        if ("TEAMCITY_VERSION" in le) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(le.TEAMCITY_VERSION) ? 1 : 0;
        if (le.COLORTERM === "truecolor") return 3;
        if ("TERM_PROGRAM" in le) {
            let n = parseInt((le.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
            switch (le.TERM_PROGRAM) {
                case "iTerm.app":
                    return n >= 3 ? 3 : 2;
                case "Apple_Terminal":
                    return 2;
            }
        }
        return /-256(color)?$/i.test(le.TERM)
            ? 2
            : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(le.TERM) || "COLORTERM" in le
            ? 1
            : r;
    }
    function S0(e) {
        let t = Os(e, e && e.isTTY);
        return bs(t);
    }
    Rl.exports = { supportsColor: S0, stdout: bs(Os(!0, Il.isatty(1))), stderr: bs(Os(!0, Il.isatty(2))) };
});
var Fl = g((ue, kn) => {
    var A0 = require("tty"),
        Un = require("util");
    ue.init = I0;
    ue.log = O0;
    ue.formatArgs = T0;
    ue.save = x0;
    ue.load = N0;
    ue.useColors = C0;
    ue.destroy = Un.deprecate(() => {},
    "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    ue.colors = [6, 2, 3, 4, 5, 1];
    try {
        let e = Dl();
        e &&
            (e.stderr || e).level >= 2 &&
            (ue.colors = [
                20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81,
                92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170,
                171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215,
                220, 221
            ]);
    } catch {}
    ue.inspectOpts = Object.keys(process.env)
        .filter(e => /^debug_/i.test(e))
        .reduce((e, t) => {
            let r = t
                    .substring(6)
                    .toLowerCase()
                    .replace(/_([a-z])/g, (i, s) => s.toUpperCase()),
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
    function C0() {
        return "colors" in ue.inspectOpts ? !!ue.inspectOpts.colors : A0.isatty(process.stderr.fd);
    }
    function T0(e) {
        let { namespace: t, useColors: r } = this;
        if (r) {
            let n = this.color,
                i = "\x1B[3" + (n < 8 ? n : "8;5;" + n),
                s = "  ".concat(i, ";1m").concat(t, " \x1B[0m");
            (e[0] = s + e[0].split("\n").join("\n" + s)), e.push(i + "m+" + kn.exports.humanize(this.diff) + "\x1B[0m");
        } else e[0] = b0() + t + " " + e[0];
    }
    function b0() {
        return ue.inspectOpts.hideDate ? "" : new Date().toISOString() + " ";
    }
    function O0(...e) {
        return process.stderr.write(Un.formatWithOptions(ue.inspectOpts, ...e) + "\n");
    }
    function x0(e) {
        e ? (process.env.DEBUG = e) : delete process.env.DEBUG;
    }
    function N0() {
        return process.env.DEBUG;
    }
    function I0(e) {
        e.inspectOpts = {};
        let t = Object.keys(ue.inspectOpts);
        for (let r = 0; r < t.length; r++) e.inspectOpts[t[r]] = ue.inspectOpts[t[r]];
    }
    kn.exports = Ts()(ue);
    var { formatters: Pl } = kn.exports;
    Pl.o = function (e) {
        return (
            (this.inspectOpts.colors = this.useColors),
            Un.inspect(e, this.inspectOpts)
                .split("\n")
                .map(t => t.trim())
                .join(" ")
        );
    };
    Pl.O = function (e) {
        return (this.inspectOpts.colors = this.useColors), Un.inspect(e, this.inspectOpts);
    };
});
var ql = g((Yx, xs) => {
    typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs
        ? (xs.exports = Ol())
        : (xs.exports = Fl());
});
var kr = g(Ns => {
    "use strict";
    Object.defineProperty(Ns, "__esModule", { value: !0 });
    Ns.newError = R0;
    function R0(e, t) {
        let r = new Error(e);
        return (r.code = t), r;
    }
});
var Rs = g(Mn => {
    "use strict";
    Object.defineProperty(Mn, "__esModule", { value: !0 });
    Mn.ProgressCallbackTransform = void 0;
    var D0 = require("stream"),
        Is = class extends D0.Transform {
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
    Mn.ProgressCallbackTransform = Is;
});
var kl = g(ve => {
    "use strict";
    Object.defineProperty(ve, "__esModule", { value: !0 });
    ve.DigestTransform = ve.HttpExecutor = ve.HttpError = void 0;
    ve.createHttpError = Ds;
    ve.parseJson = M0;
    ve.configureRequestOptionsFromUrl = Ul;
    ve.configureRequestUrl = Fs;
    ve.safeGetHeader = sr;
    ve.configureRequestOptions = Bn;
    ve.safeStringifyJson = jn;
    var P0 = require("crypto"),
        F0 = ql(),
        q0 = require("fs"),
        L0 = require("stream"),
        $l = require("url"),
        $0 = qn(),
        Ll = kr(),
        U0 = Rs(),
        Mr = (0, F0.default)("electron-builder");
    function Ds(e, t = null) {
        return new Br(
            e.statusCode || -1,
            "".concat(e.statusCode, " ").concat(e.statusMessage) +
                (t == null ? "" : "\n" + JSON.stringify(t, null, "  ")) +
                "\nHeaders: " +
                jn(e.headers),
            t
        );
    }
    var k0 = new Map([
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
        Br = class extends Error {
            constructor(t, r = "HTTP error: ".concat(k0.get(t) || t), n = null) {
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
    ve.HttpError = Br;
    function M0(e) {
        return e.then(t => (t == null || t.length === 0 ? null : JSON.parse(t)));
    }
    var Ps = class e {
        constructor() {
            this.maxRedirects = 10;
        }
        request(t, r = new $0.CancellationToken(), n) {
            Bn(t);
            let i = n == null ? void 0 : JSON.stringify(n),
                s = i ? Buffer.from(i) : void 0;
            if (s != null) {
                Mr(i);
                let { headers: o, ...a } = t;
                t = { method: "post", headers: { "Content-Type": "application/json", "Content-Length": s.length, ...o }, ...a };
            }
            return this.doApiRequest(t, r, o => o.end(s));
        }
        doApiRequest(t, r, n, i = 0) {
            return (
                Mr.enabled && Mr("Request: ".concat(jn(t))),
                r.createPromise((s, o, a) => {
                    let l = this.createRequest(t, d => {
                        try {
                            this.handleResponse(d, t, r, s, o, i, n);
                        } catch (c) {
                            o(c);
                        }
                    });
                    this.addErrorAndTimeoutHandlers(l, o, t.timeout),
                        this.addRedirectHandlers(l, t, o, i, d => {
                            this.doApiRequest(d, r, n, i).then(s).catch(o);
                        }),
                        n(l, o),
                        a(() => l.abort());
                })
            );
        }
        addRedirectHandlers(t, r, n, i, s) {}
        addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
            this.addTimeOutHandler(t, r, n),
                t.on("error", r),
                t.on("aborted", () => {
                    r(new Error("Request has been aborted by the server"));
                });
        }
        handleResponse(t, r, n, i, s, o, a) {
            var l;
            if (
                (Mr.enabled &&
                    Mr("Response: ".concat(t.statusCode, " ").concat(t.statusMessage, ", request options: ").concat(jn(r))),
                t.statusCode === 404)
            ) {
                s(
                    Ds(
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
                f = sr(t, "location");
            if (c && f != null) {
                if (o > this.maxRedirects) {
                    s(this.createMaxRedirectError());
                    return;
                }
                this.doApiRequest(e.prepareRedirectUrlOptions(f, r), n, a, o).then(i).catch(s);
                return;
            }
            t.setEncoding("utf8");
            let m = "";
            t.on("error", s),
                t.on("data", p => (m += p)),
                t.on("end", () => {
                    try {
                        if (t.statusCode != null && t.statusCode >= 400) {
                            let p = sr(t, "content-type"),
                                _ =
                                    p != null &&
                                    (Array.isArray(p) ? p.find(v => v.includes("json")) != null : p.includes("json"));
                            s(
                                Ds(
                                    t,
                                    "method: "
                                        .concat(r.method || "GET", " url: ")
                                        .concat(r.protocol || "https:", "//")
                                        .concat(r.hostname)
                                        .concat(r.port ? ":".concat(r.port) : "")
                                        .concat(r.path, "\n\n          Data:\n          ")
                                        .concat(_ ? JSON.stringify(JSON.parse(m)) : m, "\n          ")
                                )
                            );
                        } else i(m.length === 0 ? null : m);
                    } catch (p) {
                        s(p);
                    }
                });
        }
        async downloadToBuffer(t, r) {
            return await r.cancellationToken.createPromise((n, i, s) => {
                let o = [],
                    a = { headers: r.headers || void 0, redirect: "manual" };
                Fs(t, a),
                    Bn(a),
                    this.doDownload(
                        a,
                        {
                            destination: null,
                            options: r,
                            onCancel: s,
                            callback: l => {
                                l == null ? n(Buffer.concat(o)) : i(l);
                            },
                            responseHandler: (l, d) => {
                                let c = 0;
                                l.on("data", f => {
                                    if (((c += f.length), c > 524288e3)) {
                                        d(new Error("Maximum allowed size is 500 MB"));
                                        return;
                                    }
                                    o.push(f);
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
            let i = this.createRequest(t, s => {
                if (s.statusCode >= 400) {
                    r.callback(
                        new Error(
                            'Cannot download "'
                                .concat(t.protocol || "https:", "//")
                                .concat(t.hostname)
                                .concat(t.path, '", status ')
                                .concat(s.statusCode, ": ")
                                .concat(s.statusMessage)
                        )
                    );
                    return;
                }
                s.on("error", r.callback);
                let o = sr(s, "location");
                if (o != null) {
                    n < this.maxRedirects
                        ? this.doDownload(e.prepareRedirectUrlOptions(o, t), r, n++)
                        : r.callback(this.createMaxRedirectError());
                    return;
                }
                r.responseHandler == null ? j0(r, s) : r.responseHandler(s, r.callback);
            });
            this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout),
                this.addRedirectHandlers(i, t, r.callback, n, s => {
                    this.doDownload(s, r, n++);
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
            let n = Ul(t, { ...r }),
                i = n.headers;
            if (i?.authorization) {
                let s = new $l.URL(t);
                (s.hostname.endsWith(".amazonaws.com") || s.searchParams.has("X-Amz-Credential")) && delete i.authorization;
            }
            return n;
        }
        static retryOnServerError(t, r = 3) {
            for (let n = 0; ; n++)
                try {
                    return t();
                } catch (i) {
                    if (n < r && ((i instanceof Br && i.isServerError()) || i.code === "EPIPE")) continue;
                    throw i;
                }
        }
    };
    ve.HttpExecutor = Ps;
    function Ul(e, t) {
        let r = Bn(t);
        return Fs(new $l.URL(e), r), r;
    }
    function Fs(e, t) {
        (t.protocol = e.protocol),
            (t.hostname = e.hostname),
            e.port ? (t.port = e.port) : t.port && delete t.port,
            (t.path = e.pathname + e.search);
    }
    var jr = class extends L0.Transform {
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
                (this.digester = (0, P0.createHash)(r));
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
            if (this._actual == null) throw (0, Ll.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
            if (this._actual !== this.expected)
                throw (0, Ll.newError)(
                    ""
                        .concat(this.algorithm, " checksum mismatch, expected ")
                        .concat(this.expected, ", got ")
                        .concat(this._actual),
                    "ERR_CHECKSUM_MISMATCH"
                );
            return null;
        }
    };
    ve.DigestTransform = jr;
    function B0(e, t, r) {
        return e != null && t != null && e !== t
            ? (r(new Error("checksum mismatch: expected ".concat(t, " but got ").concat(e, " (X-Checksum-Sha2 header)"))), !1)
            : !0;
    }
    function sr(e, t) {
        let r = e.headers[t];
        return r == null ? null : Array.isArray(r) ? (r.length === 0 ? null : r[r.length - 1]) : r;
    }
    function j0(e, t) {
        if (!B0(sr(t, "X-Checksum-Sha2"), e.options.sha2, e.callback)) return;
        let r = [];
        if (e.options.onProgress != null) {
            let o = sr(t, "content-length");
            o != null &&
                r.push(new U0.ProgressCallbackTransform(parseInt(o, 10), e.options.cancellationToken, e.options.onProgress));
        }
        let n = e.options.sha512;
        n != null
            ? r.push(
                  new jr(
                      n,
                      "sha512",
                      n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64"
                  )
              )
            : e.options.sha2 != null && r.push(new jr(e.options.sha2, "sha256", "hex"));
        let i = (0, q0.createWriteStream)(e.destination);
        r.push(i);
        let s = t;
        for (let o of r)
            o.on("error", a => {
                i.close(), e.options.cancellationToken.cancelled || e.callback(a);
            }),
                (s = s.pipe(o));
        i.on("finish", () => {
            i.close(e.callback);
        });
    }
    function Bn(e, t, r) {
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
    function jn(e, t) {
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
var Bl = g(Hn => {
    "use strict";
    Object.defineProperty(Hn, "__esModule", { value: !0 });
    Hn.githubUrl = H0;
    Hn.getS3LikeProviderBaseUrl = W0;
    function H0(e, t = "github.com") {
        return "".concat(e.protocol || "https", "://").concat(e.host || t);
    }
    function W0(e) {
        let t = e.provider;
        if (t === "s3") return G0(e);
        if (t === "spaces") return V0(e);
        throw new Error("Not supported provider: ".concat(t));
    }
    function G0(e) {
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
        return Ml(t, e.path);
    }
    function Ml(e, t) {
        return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), (e += t)), e;
    }
    function V0(e) {
        if (e.name == null) throw new Error("name is missing");
        if (e.region == null) throw new Error("region is missing");
        return Ml("https://".concat(e.name, ".").concat(e.region, ".digitaloceanspaces.com"), e.path);
    }
});
var jl = g(qs => {
    "use strict";
    Object.defineProperty(qs, "__esModule", { value: !0 });
    qs.parseDn = Y0;
    function Y0(e) {
        let t = !1,
            r = null,
            n = "",
            i = 0;
        e = e.trim();
        let s = new Map();
        for (let o = 0; o <= e.length; o++) {
            if (o === e.length) {
                r !== null && s.set(r, n);
                break;
            }
            let a = e[o];
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
                    o++;
                    let l = parseInt(e.slice(o, o + 2), 16);
                    Number.isNaN(l) ? (n += e[o]) : (o++, (n += String.fromCharCode(l)));
                    continue;
                }
                if (r === null && a === "=") {
                    (r = n), (n = "");
                    continue;
                }
                if (a === "," || a === ";" || a === "+") {
                    r !== null && s.set(r, n), (r = null), (n = "");
                    continue;
                }
            }
            if (a === " " && !t) {
                if (n.length === 0) continue;
                if (o > i) {
                    let l = o;
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
                    o = i - 1;
                    continue;
                }
            }
            n += a;
        }
        return s;
    }
});
var Yl = g(or => {
    "use strict";
    Object.defineProperty(or, "__esModule", { value: !0 });
    or.nil = or.UUID = void 0;
    var Gl = require("crypto"),
        Vl = kr(),
        z0 = "options.name must be either a string or a Buffer",
        Hl = (0, Gl.randomBytes)(16);
    Hl[0] = Hl[0] | 1;
    var Wn = {},
        M = [];
    for (let e = 0; e < 256; e++) {
        let t = (e + 256).toString(16).substr(1);
        (Wn[t] = e), (M[e] = t);
    }
    var It = class e {
        constructor(t) {
            (this.ascii = null), (this.binary = null);
            let r = e.check(t);
            if (!r) throw new Error("not a UUID");
            (this.version = r.version), r.format === "ascii" ? (this.ascii = t) : (this.binary = t);
        }
        static v5(t, r) {
            return X0(t, "sha1", 80, r);
        }
        toString() {
            return this.ascii == null && (this.ascii = K0(this.binary)), this.ascii;
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
                                  version: (Wn[t[14] + t[15]] & 240) >> 4,
                                  variant: Wl((Wn[t[19] + t[20]] & 224) >> 5),
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
                    : { version: (t[r + 6] & 240) >> 4, variant: Wl((t[r + 8] & 224) >> 5), format: "binary" };
            }
            throw (0, Vl.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
        }
        static parse(t) {
            let r = Buffer.allocUnsafe(16),
                n = 0;
            for (let i = 0; i < 16; i++) (r[i] = Wn[t[n++] + t[n++]]), (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
            return r;
        }
    };
    or.UUID = It;
    It.OID = It.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
    function Wl(e) {
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
    var Hr;
    (function (e) {
        (e[(e.ASCII = 0)] = "ASCII"), (e[(e.BINARY = 1)] = "BINARY"), (e[(e.OBJECT = 2)] = "OBJECT");
    })(Hr || (Hr = {}));
    function X0(e, t, r, n, i = Hr.ASCII) {
        let s = (0, Gl.createHash)(t);
        if (typeof e != "string" && !Buffer.isBuffer(e)) throw (0, Vl.newError)(z0, "ERR_INVALID_UUID_NAME");
        s.update(n), s.update(e);
        let a = s.digest(),
            l;
        switch (i) {
            case Hr.BINARY:
                (a[6] = (a[6] & 15) | r), (a[8] = (a[8] & 63) | 128), (l = a);
                break;
            case Hr.OBJECT:
                (a[6] = (a[6] & 15) | r), (a[8] = (a[8] & 63) | 128), (l = new It(a));
                break;
            default:
                l =
                    M[a[0]] +
                    M[a[1]] +
                    M[a[2]] +
                    M[a[3]] +
                    "-" +
                    M[a[4]] +
                    M[a[5]] +
                    "-" +
                    M[(a[6] & 15) | r] +
                    M[a[7]] +
                    "-" +
                    M[(a[8] & 63) | 128] +
                    M[a[9]] +
                    "-" +
                    M[a[10]] +
                    M[a[11]] +
                    M[a[12]] +
                    M[a[13]] +
                    M[a[14]] +
                    M[a[15]];
                break;
        }
        return l;
    }
    function K0(e) {
        return (
            M[e[0]] +
            M[e[1]] +
            M[e[2]] +
            M[e[3]] +
            "-" +
            M[e[4]] +
            M[e[5]] +
            "-" +
            M[e[6]] +
            M[e[7]] +
            "-" +
            M[e[8]] +
            M[e[9]] +
            "-" +
            M[e[10]] +
            M[e[11]] +
            M[e[12]] +
            M[e[13]] +
            M[e[14]] +
            M[e[15]]
        );
    }
    or.nil = new It("00000000-0000-0000-0000-000000000000");
});
var zl = g(Gn => {
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
            var A = this;
            i(A),
                (A.q = A.c = ""),
                (A.bufferCheckPosition = e.MAX_BUFFER_LENGTH),
                (A.opt = u || {}),
                (A.opt.lowercase = A.opt.lowercase || A.opt.lowercasetags),
                (A.looseCase = A.opt.lowercase ? "toLowerCase" : "toUpperCase"),
                (A.tags = []),
                (A.closed = A.closedRoot = A.sawRoot = !1),
                (A.tag = A.error = null),
                (A.strict = !!h),
                (A.noscript = !!(h || A.opt.noscript)),
                (A.state = y.BEGIN),
                (A.strictEntities = A.opt.strictEntities),
                (A.ENTITIES = A.strictEntities ? Object.create(e.XML_ENTITIES) : Object.create(e.ENTITIES)),
                (A.attribList = []),
                A.opt.xmlns && (A.ns = Object.create(_)),
                A.opt.unquotedAttributeValues === void 0 && (A.opt.unquotedAttributeValues = !h),
                (A.trackPosition = A.opt.position !== !1),
                A.trackPosition && (A.position = A.line = A.column = 0),
                $(A, "onready");
        }
        Object.create ||
            (Object.create = function (h) {
                function u() {}
                u.prototype = h;
                var A = new u();
                return A;
            }),
            Object.keys ||
                (Object.keys = function (h) {
                    var u = [];
                    for (var A in h) h.hasOwnProperty(A) && u.push(A);
                    return u;
                });
        function n(h) {
            for (var u = Math.max(e.MAX_BUFFER_LENGTH, 10), A = 0, w = 0, j = t.length; w < j; w++) {
                var oe = h[t[w]].length;
                if (oe > u)
                    switch (t[w]) {
                        case "textNode":
                            Z(h);
                            break;
                        case "cdata":
                            R(h, "oncdata", h.cdata), (h.cdata = "");
                            break;
                        case "script":
                            R(h, "onscript", h.script), (h.script = "");
                            break;
                        default:
                            Q(h, "Max buffer length exceeded: " + t[w]);
                    }
                A = Math.max(A, oe);
            }
            var ae = e.MAX_BUFFER_LENGTH - A;
            h.bufferCheckPosition = ae + h.position;
        }
        function i(h) {
            for (var u = 0, A = t.length; u < A; u++) h[t[u]] = "";
        }
        function s(h) {
            Z(h),
                h.cdata !== "" && (R(h, "oncdata", h.cdata), (h.cdata = "")),
                h.script !== "" && (R(h, "onscript", h.script), (h.script = ""));
        }
        r.prototype = {
            end: function () {
                Y(this);
            },
            write: i0,
            resume: function () {
                return (this.error = null), this;
            },
            close: function () {
                return this.write(null);
            },
            flush: function () {
                s(this);
            }
        };
        var o;
        try {
            o = require("stream").Stream;
        } catch {
            o = function () {};
        }
        o || (o = function () {});
        var a = e.EVENTS.filter(function (h) {
            return h !== "error" && h !== "end";
        });
        function l(h, u) {
            return new d(h, u);
        }
        function d(h, u) {
            if (!(this instanceof d)) return new d(h, u);
            o.apply(this), (this._parser = new r(h, u)), (this.writable = !0), (this.readable = !0);
            var A = this;
            (this._parser.onend = function () {
                A.emit("end");
            }),
                (this._parser.onerror = function (w) {
                    A.emit("error", w), (A._parser.error = null);
                }),
                (this._decoder = null),
                a.forEach(function (w) {
                    Object.defineProperty(A, "on" + w, {
                        get: function () {
                            return A._parser["on" + w];
                        },
                        set: function (j) {
                            if (!j) return A.removeAllListeners(w), (A._parser["on" + w] = j), j;
                            A.on(w, j);
                        },
                        enumerable: !0,
                        configurable: !1
                    });
                });
        }
        (d.prototype = Object.create(o.prototype, { constructor: { value: d } })),
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
                var A = this;
                return (
                    !A._parser["on" + h] &&
                        a.indexOf(h) !== -1 &&
                        (A._parser["on" + h] = function () {
                            var w = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
                            w.splice(0, 0, h), A.emit.apply(A, w);
                        }),
                    o.prototype.on.call(A, h, u)
                );
            });
        var c = "[CDATA[",
            f = "DOCTYPE",
            m = "http://www.w3.org/XML/1998/namespace",
            p = "http://www.w3.org/2000/xmlns/",
            _ = { xml: m, xmlns: p },
            v =
                /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
            S =
                /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/,
            T =
                /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
            C =
                /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
        function I(h) {
            return h === " " || h === "\n" || h === "\r" || h === "	";
        }
        function L(h) {
            return h === '"' || h === "'";
        }
        function $e(h) {
            return h === ">" || I(h);
        }
        function X(h, u) {
            return h.test(u);
        }
        function de(h, u) {
            return !X(h, u);
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
                    A = typeof u == "number" ? String.fromCharCode(u) : u;
                e.ENTITIES[h] = A;
            });
        for (var D in e.STATE) e.STATE[e.STATE[D]] = D;
        y = e.STATE;
        function $(h, u, A) {
            h[u] && h[u](A);
        }
        function R(h, u, A) {
            h.textNode && Z(h), $(h, u, A);
        }
        function Z(h) {
            (h.textNode = ie(h.opt, h.textNode)), h.textNode && $(h, "ontext", h.textNode), (h.textNode = "");
        }
        function ie(h, u) {
            return h.trim && (u = u.trim()), h.normalize && (u = u.replace(/\s+/g, " ")), u;
        }
        function Q(h, u) {
            return (
                Z(h),
                h.trackPosition && (u += "\nLine: " + h.line + "\nColumn: " + h.column + "\nChar: " + h.c),
                (u = new Error(u)),
                (h.error = u),
                $(h, "onerror", u),
                h
            );
        }
        function Y(h) {
            return (
                h.sawRoot && !h.closedRoot && F(h, "Unclosed root tag"),
                h.state !== y.BEGIN && h.state !== y.BEGIN_WHITESPACE && h.state !== y.TEXT && Q(h, "Unexpected end"),
                Z(h),
                (h.c = ""),
                (h.closed = !0),
                $(h, "onend"),
                r.call(h, h.strict, h.opt),
                h
            );
        }
        function F(h, u) {
            if (typeof h != "object" || !(h instanceof r)) throw new Error("bad call to strictFail");
            h.strict && Q(h, u);
        }
        function W(h) {
            h.strict || (h.tagName = h.tagName[h.looseCase]());
            var u = h.tags[h.tags.length - 1] || h,
                A = (h.tag = { name: h.tagName, attributes: {} });
            h.opt.xmlns && (A.ns = u.ns), (h.attribList.length = 0), R(h, "onopentagstart", A);
        }
        function ne(h, u) {
            var A = h.indexOf(":"),
                w = A < 0 ? ["", h] : h.split(":"),
                j = w[0],
                oe = w[1];
            return u && h === "xmlns" && ((j = "xmlns"), (oe = "")), { prefix: j, local: oe };
        }
        function G(h) {
            if (
                (h.strict || (h.attribName = h.attribName[h.looseCase]()),
                h.attribList.indexOf(h.attribName) !== -1 || h.tag.attributes.hasOwnProperty(h.attribName))
            ) {
                h.attribName = h.attribValue = "";
                return;
            }
            if (h.opt.xmlns) {
                var u = ne(h.attribName, !0),
                    A = u.prefix,
                    w = u.local;
                if (A === "xmlns")
                    if (w === "xml" && h.attribValue !== m)
                        F(h, "xml: prefix must be bound to " + m + "\nActual: " + h.attribValue);
                    else if (w === "xmlns" && h.attribValue !== p)
                        F(h, "xmlns: prefix must be bound to " + p + "\nActual: " + h.attribValue);
                    else {
                        var j = h.tag,
                            oe = h.tags[h.tags.length - 1] || h;
                        j.ns === oe.ns && (j.ns = Object.create(oe.ns)), (j.ns[w] = h.attribValue);
                    }
                h.attribList.push([h.attribName, h.attribValue]);
            } else
                (h.tag.attributes[h.attribName] = h.attribValue),
                    R(h, "onattribute", { name: h.attribName, value: h.attribValue });
            h.attribName = h.attribValue = "";
        }
        function ut(h, u) {
            if (h.opt.xmlns) {
                var A = h.tag,
                    w = ne(h.tagName);
                (A.prefix = w.prefix),
                    (A.local = w.local),
                    (A.uri = A.ns[w.prefix] || ""),
                    A.prefix && !A.uri && (F(h, "Unbound namespace prefix: " + JSON.stringify(h.tagName)), (A.uri = w.prefix));
                var j = h.tags[h.tags.length - 1] || h;
                A.ns &&
                    j.ns !== A.ns &&
                    Object.keys(A.ns).forEach(function (vl) {
                        R(h, "onopennamespace", { prefix: vl, uri: A.ns[vl] });
                    });
                for (var oe = 0, ae = h.attribList.length; oe < ae; oe++) {
                    var xe = h.attribList[oe],
                        Ne = xe[0],
                        er = xe[1],
                        pe = ne(Ne, !0),
                        rt = pe.prefix,
                        s0 = pe.local,
                        _l = rt === "" ? "" : A.ns[rt] || "",
                        As = { name: Ne, value: er, prefix: rt, local: s0, uri: _l };
                    rt && rt !== "xmlns" && !_l && (F(h, "Unbound namespace prefix: " + JSON.stringify(rt)), (As.uri = rt)),
                        (h.tag.attributes[Ne] = As),
                        R(h, "onattribute", As);
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
        function Ss(h) {
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
                A = h.tagName;
            h.strict || (A = A[h.looseCase]());
            for (var w = A; u--; ) {
                var j = h.tags[u];
                if (j.name !== w) F(h, "Unexpected close tag");
                else break;
            }
            if (u < 0) {
                F(h, "Unmatched closing tag: " + h.tagName), (h.textNode += "</" + h.tagName + ">"), (h.state = y.TEXT);
                return;
            }
            h.tagName = A;
            for (var oe = h.tags.length; oe-- > u; ) {
                var ae = (h.tag = h.tags.pop());
                (h.tagName = h.tag.name), R(h, "onclosetag", h.tagName);
                var xe = {};
                for (var Ne in ae.ns) xe[Ne] = ae.ns[Ne];
                var er = h.tags[h.tags.length - 1] || h;
                h.opt.xmlns &&
                    ae.ns !== er.ns &&
                    Object.keys(ae.ns).forEach(function (pe) {
                        var rt = ae.ns[pe];
                        R(h, "onclosenamespace", { prefix: pe, uri: rt });
                    });
            }
            u === 0 && (h.closedRoot = !0),
                (h.tagName = h.attribValue = h.attribName = ""),
                (h.attribList.length = 0),
                (h.state = y.TEXT);
        }
        function n0(h) {
            var u = h.entity,
                A = u.toLowerCase(),
                w,
                j = "";
            return h.ENTITIES[u]
                ? h.ENTITIES[u]
                : h.ENTITIES[A]
                ? h.ENTITIES[A]
                : ((u = A),
                  u.charAt(0) === "#" &&
                      (u.charAt(1) === "x"
                          ? ((u = u.slice(2)), (w = parseInt(u, 16)), (j = w.toString(16)))
                          : ((u = u.slice(1)), (w = parseInt(u, 10)), (j = w.toString(10)))),
                  (u = u.replace(/^0+/, "")),
                  isNaN(w) || j.toLowerCase() !== u
                      ? (F(h, "Invalid character entity"), "&" + h.entity + ";")
                      : String.fromCodePoint(w));
        }
        function yl(h, u) {
            u === "<"
                ? ((h.state = y.OPEN_WAKA), (h.startTagPosition = h.position))
                : I(u) || (F(h, "Non-whitespace before first tag."), (h.textNode = u), (h.state = y.TEXT));
        }
        function El(h, u) {
            var A = "";
            return u < h.length && (A = h.charAt(u)), A;
        }
        function i0(h) {
            var u = this;
            if (this.error) throw this.error;
            if (u.closed) return Q(u, "Cannot write after close. Assign an onready handler.");
            if (h === null) return Y(u);
            typeof h == "object" && (h = h.toString());
            for (var A = 0, w = ""; (w = El(h, A++)), (u.c = w), !!w; )
                switch ((u.trackPosition && (u.position++, w === "\n" ? (u.line++, (u.column = 0)) : u.column++), u.state)) {
                    case y.BEGIN:
                        if (((u.state = y.BEGIN_WHITESPACE), w === "\uFEFF")) continue;
                        yl(u, w);
                        continue;
                    case y.BEGIN_WHITESPACE:
                        yl(u, w);
                        continue;
                    case y.TEXT:
                        if (u.sawRoot && !u.closedRoot) {
                            for (var j = A - 1; w && w !== "<" && w !== "&"; )
                                (w = El(h, A++)),
                                    w && u.trackPosition && (u.position++, w === "\n" ? (u.line++, (u.column = 0)) : u.column++);
                            u.textNode += h.substring(j, A - 1);
                        }
                        w === "<" && !(u.sawRoot && u.closedRoot && !u.strict)
                            ? ((u.state = y.OPEN_WAKA), (u.startTagPosition = u.position))
                            : (!I(w) && (!u.sawRoot || u.closedRoot) && F(u, "Text data outside of root node."),
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
                        else if (!I(w))
                            if (X(v, w)) (u.state = y.OPEN_TAG), (u.tagName = w);
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
                              (u.comment = ie(u.opt, u.comment)),
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
                        w === "?" ? (u.state = y.PROC_INST_ENDING) : I(w) ? (u.state = y.PROC_INST_BODY) : (u.procInstName += w);
                        continue;
                    case y.PROC_INST_BODY:
                        if (!u.procInstBody && I(w)) continue;
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
                        X(S, w)
                            ? (u.tagName += w)
                            : (W(u),
                              w === ">"
                                  ? ut(u)
                                  : w === "/"
                                  ? (u.state = y.OPEN_TAG_SLASH)
                                  : (I(w) || F(u, "Invalid character in tag name"), (u.state = y.ATTRIB)));
                        continue;
                    case y.OPEN_TAG_SLASH:
                        w === ">"
                            ? (ut(u, !0), Ss(u))
                            : (F(u, "Forward-slash in opening tag not followed by >"), (u.state = y.ATTRIB));
                        continue;
                    case y.ATTRIB:
                        if (I(w)) continue;
                        w === ">"
                            ? ut(u)
                            : w === "/"
                            ? (u.state = y.OPEN_TAG_SLASH)
                            : X(v, w)
                            ? ((u.attribName = w), (u.attribValue = ""), (u.state = y.ATTRIB_NAME))
                            : F(u, "Invalid attribute name");
                        continue;
                    case y.ATTRIB_NAME:
                        w === "="
                            ? (u.state = y.ATTRIB_VALUE)
                            : w === ">"
                            ? (F(u, "Attribute without value"), (u.attribValue = u.attribName), G(u), ut(u))
                            : I(w)
                            ? (u.state = y.ATTRIB_NAME_SAW_WHITE)
                            : X(S, w)
                            ? (u.attribName += w)
                            : F(u, "Invalid attribute name");
                        continue;
                    case y.ATTRIB_NAME_SAW_WHITE:
                        if (w === "=") u.state = y.ATTRIB_VALUE;
                        else {
                            if (I(w)) continue;
                            F(u, "Attribute without value"),
                                (u.tag.attributes[u.attribName] = ""),
                                (u.attribValue = ""),
                                R(u, "onattribute", { name: u.attribName, value: "" }),
                                (u.attribName = ""),
                                w === ">"
                                    ? ut(u)
                                    : X(v, w)
                                    ? ((u.attribName = w), (u.state = y.ATTRIB_NAME))
                                    : (F(u, "Invalid attribute name"), (u.state = y.ATTRIB));
                        }
                        continue;
                    case y.ATTRIB_VALUE:
                        if (I(w)) continue;
                        L(w)
                            ? ((u.q = w), (u.state = y.ATTRIB_VALUE_QUOTED))
                            : (u.opt.unquotedAttributeValues || Q(u, "Unquoted attribute value"),
                              (u.state = y.ATTRIB_VALUE_UNQUOTED),
                              (u.attribValue = w));
                        continue;
                    case y.ATTRIB_VALUE_QUOTED:
                        if (w !== u.q) {
                            w === "&" ? (u.state = y.ATTRIB_VALUE_ENTITY_Q) : (u.attribValue += w);
                            continue;
                        }
                        G(u), (u.q = ""), (u.state = y.ATTRIB_VALUE_CLOSED);
                        continue;
                    case y.ATTRIB_VALUE_CLOSED:
                        I(w)
                            ? (u.state = y.ATTRIB)
                            : w === ">"
                            ? ut(u)
                            : w === "/"
                            ? (u.state = y.OPEN_TAG_SLASH)
                            : X(v, w)
                            ? (F(u, "No whitespace between attributes"),
                              (u.attribName = w),
                              (u.attribValue = ""),
                              (u.state = y.ATTRIB_NAME))
                            : F(u, "Invalid attribute name");
                        continue;
                    case y.ATTRIB_VALUE_UNQUOTED:
                        if (!$e(w)) {
                            w === "&" ? (u.state = y.ATTRIB_VALUE_ENTITY_U) : (u.attribValue += w);
                            continue;
                        }
                        G(u), w === ">" ? ut(u) : (u.state = y.ATTRIB);
                        continue;
                    case y.CLOSE_TAG:
                        if (u.tagName)
                            w === ">"
                                ? Ss(u)
                                : X(S, w)
                                ? (u.tagName += w)
                                : u.script
                                ? ((u.script += "</" + u.tagName), (u.tagName = ""), (u.state = y.SCRIPT))
                                : (I(w) || F(u, "Invalid tagname in closing tag"), (u.state = y.CLOSE_TAG_SAW_WHITE));
                        else {
                            if (I(w)) continue;
                            de(v, w)
                                ? u.script
                                    ? ((u.script += "</" + w), (u.state = y.SCRIPT))
                                    : F(u, "Invalid tagname in closing tag.")
                                : (u.tagName = w);
                        }
                        continue;
                    case y.CLOSE_TAG_SAW_WHITE:
                        if (I(w)) continue;
                        w === ">" ? Ss(u) : F(u, "Invalid characters in closing tag");
                        continue;
                    case y.TEXT_ENTITY:
                    case y.ATTRIB_VALUE_ENTITY_Q:
                    case y.ATTRIB_VALUE_ENTITY_U:
                        var ae, xe;
                        switch (u.state) {
                            case y.TEXT_ENTITY:
                                (ae = y.TEXT), (xe = "textNode");
                                break;
                            case y.ATTRIB_VALUE_ENTITY_Q:
                                (ae = y.ATTRIB_VALUE_QUOTED), (xe = "attribValue");
                                break;
                            case y.ATTRIB_VALUE_ENTITY_U:
                                (ae = y.ATTRIB_VALUE_UNQUOTED), (xe = "attribValue");
                                break;
                        }
                        if (w === ";") {
                            var Ne = n0(u);
                            u.opt.unparsedEntities && !Object.values(e.XML_ENTITIES).includes(Ne)
                                ? ((u.entity = ""), (u.state = ae), u.write(Ne))
                                : ((u[xe] += Ne), (u.entity = ""), (u.state = ae));
                        } else
                            X(u.entity.length ? C : T, w)
                                ? (u.entity += w)
                                : (F(u, "Invalid character in entity name"),
                                  (u[xe] += "&" + u.entity + w),
                                  (u.entity = ""),
                                  (u.state = ae));
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
                    A = function () {
                        var w = 16384,
                            j = [],
                            oe,
                            ae,
                            xe = -1,
                            Ne = arguments.length;
                        if (!Ne) return "";
                        for (var er = ""; ++xe < Ne; ) {
                            var pe = Number(arguments[xe]);
                            if (!isFinite(pe) || pe < 0 || pe > 1114111 || u(pe) !== pe)
                                throw RangeError("Invalid code point: " + pe);
                            pe <= 65535
                                ? j.push(pe)
                                : ((pe -= 65536), (oe = (pe >> 10) + 55296), (ae = (pe % 1024) + 56320), j.push(oe, ae)),
                                (xe + 1 === Ne || j.length > w) && ((er += h.apply(null, j)), (j.length = 0));
                        }
                        return er;
                    };
                Object.defineProperty
                    ? Object.defineProperty(String, "fromCodePoint", { value: A, configurable: !0, writable: !0 })
                    : (String.fromCodePoint = A);
            })();
    })(typeof Gn > "u" ? (Gn.sax = {}) : Gn);
});
var Kl = g(Wr => {
    "use strict";
    Object.defineProperty(Wr, "__esModule", { value: !0 });
    Wr.XElement = void 0;
    Wr.parseXml = ew;
    var J0 = zl(),
        Vn = kr(),
        Yn = class {
            constructor(t) {
                if (
                    ((this.name = t),
                    (this.value = ""),
                    (this.attributes = null),
                    (this.isCData = !1),
                    (this.elements = null),
                    !t)
                )
                    throw (0, Vn.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
                if (!Z0(t)) throw (0, Vn.newError)("Invalid element name: ".concat(t), "ERR_XML_ELEMENT_INVALID_NAME");
            }
            attribute(t) {
                let r = this.attributes === null ? null : this.attributes[t];
                if (r == null) throw (0, Vn.newError)('No attribute "'.concat(t, '"'), "ERR_XML_MISSED_ATTRIBUTE");
                return r;
            }
            removeAttribute(t) {
                this.attributes !== null && delete this.attributes[t];
            }
            element(t, r = !1, n = null) {
                let i = this.elementOrNull(t, r);
                if (i === null) throw (0, Vn.newError)(n || 'No element "'.concat(t, '"'), "ERR_XML_MISSED_ELEMENT");
                return i;
            }
            elementOrNull(t, r = !1) {
                if (this.elements === null) return null;
                for (let n of this.elements) if (Xl(n, t, r)) return n;
                return null;
            }
            getElements(t, r = !1) {
                return this.elements === null ? [] : this.elements.filter(n => Xl(n, t, r));
            }
            elementValueOrEmpty(t, r = !1) {
                let n = this.elementOrNull(t, r);
                return n === null ? "" : n.value;
            }
        };
    Wr.XElement = Yn;
    var Q0 = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
    function Z0(e) {
        return Q0.test(e);
    }
    function Xl(e, t, r) {
        let n = e.name;
        return n === t || (r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase());
    }
    function ew(e) {
        let t = null,
            r = J0.parser(!0, {}),
            n = [];
        return (
            (r.onopentag = i => {
                let s = new Yn(i.name);
                if (((s.attributes = i.attributes), t === null)) t = s;
                else {
                    let o = n[n.length - 1];
                    o.elements == null && (o.elements = []), o.elements.push(s);
                }
                n.push(s);
            }),
            (r.onclosetag = () => {
                n.pop();
            }),
            (r.ontext = i => {
                n.length > 0 && (n[n.length - 1].value = i);
            }),
            (r.oncdata = i => {
                let s = n[n.length - 1];
                (s.value = i), (s.isCData = !0);
            }),
            (r.onerror = i => {
                throw i;
            }),
            r.write(e),
            t
        );
    }
});
var Ql = g(zn => {
    "use strict";
    Object.defineProperty(zn, "__esModule", { value: !0 });
    zn.MemoLazy = void 0;
    var Ls = class {
        constructor(t, r) {
            (this.selector = t), (this.creator = r), (this.selected = void 0), (this._value = void 0);
        }
        get hasValue() {
            return this._value !== void 0;
        }
        get value() {
            let t = this.selector();
            if (this._value !== void 0 && Jl(this.selected, t)) return this._value;
            this.selected = t;
            let r = this.creator(t);
            return (this.value = r), r;
        }
        set value(t) {
            this._value = t;
        }
    };
    zn.MemoLazy = Ls;
    function Jl(e, t) {
        if (typeof e == "object" && e !== null && typeof t == "object" && t !== null) {
            let i = Object.keys(e),
                s = Object.keys(t);
            return i.length === s.length && i.every(o => Jl(e[o], t[o]));
        }
        return e === t;
    }
});
var eu = g($s => {
    "use strict";
    Object.defineProperty($s, "__esModule", { value: !0 });
    $s.retry = Zl;
    var tw = qn();
    async function Zl(e, t, r, n = 0, i = 0, s) {
        var o;
        let a = new tw.CancellationToken();
        try {
            return await e();
        } catch (l) {
            if ((!((o = s?.(l)) !== null && o !== void 0) || o) && t > 0 && !a.cancelled)
                return await new Promise(d => setTimeout(d, r + n * i)), await Zl(e, t - 1, r, n, i + 1, s);
            throw l;
        }
    }
});
var ce = g(P => {
    "use strict";
    Object.defineProperty(P, "__esModule", { value: !0 });
    P.CURRENT_APP_PACKAGE_FILE_NAME =
        P.CURRENT_APP_INSTALLER_FILE_NAME =
        P.retry =
        P.MemoLazy =
        P.newError =
        P.XElement =
        P.parseXml =
        P.ProgressCallbackTransform =
        P.UUID =
        P.parseDn =
        P.githubUrl =
        P.getS3LikeProviderBaseUrl =
        P.configureRequestUrl =
        P.parseJson =
        P.safeStringifyJson =
        P.configureRequestOptionsFromUrl =
        P.configureRequestOptions =
        P.safeGetHeader =
        P.DigestTransform =
        P.HttpExecutor =
        P.createHttpError =
        P.HttpError =
        P.CancellationError =
        P.CancellationToken =
            void 0;
    P.asArray = lw;
    var tu = qn();
    Object.defineProperty(P, "CancellationToken", {
        enumerable: !0,
        get: function () {
            return tu.CancellationToken;
        }
    });
    Object.defineProperty(P, "CancellationError", {
        enumerable: !0,
        get: function () {
            return tu.CancellationError;
        }
    });
    var Xe = kl();
    Object.defineProperty(P, "HttpError", {
        enumerable: !0,
        get: function () {
            return Xe.HttpError;
        }
    });
    Object.defineProperty(P, "createHttpError", {
        enumerable: !0,
        get: function () {
            return Xe.createHttpError;
        }
    });
    Object.defineProperty(P, "HttpExecutor", {
        enumerable: !0,
        get: function () {
            return Xe.HttpExecutor;
        }
    });
    Object.defineProperty(P, "DigestTransform", {
        enumerable: !0,
        get: function () {
            return Xe.DigestTransform;
        }
    });
    Object.defineProperty(P, "safeGetHeader", {
        enumerable: !0,
        get: function () {
            return Xe.safeGetHeader;
        }
    });
    Object.defineProperty(P, "configureRequestOptions", {
        enumerable: !0,
        get: function () {
            return Xe.configureRequestOptions;
        }
    });
    Object.defineProperty(P, "configureRequestOptionsFromUrl", {
        enumerable: !0,
        get: function () {
            return Xe.configureRequestOptionsFromUrl;
        }
    });
    Object.defineProperty(P, "safeStringifyJson", {
        enumerable: !0,
        get: function () {
            return Xe.safeStringifyJson;
        }
    });
    Object.defineProperty(P, "parseJson", {
        enumerable: !0,
        get: function () {
            return Xe.parseJson;
        }
    });
    Object.defineProperty(P, "configureRequestUrl", {
        enumerable: !0,
        get: function () {
            return Xe.configureRequestUrl;
        }
    });
    var ru = Bl();
    Object.defineProperty(P, "getS3LikeProviderBaseUrl", {
        enumerable: !0,
        get: function () {
            return ru.getS3LikeProviderBaseUrl;
        }
    });
    Object.defineProperty(P, "githubUrl", {
        enumerable: !0,
        get: function () {
            return ru.githubUrl;
        }
    });
    var rw = jl();
    Object.defineProperty(P, "parseDn", {
        enumerable: !0,
        get: function () {
            return rw.parseDn;
        }
    });
    var nw = Yl();
    Object.defineProperty(P, "UUID", {
        enumerable: !0,
        get: function () {
            return nw.UUID;
        }
    });
    var iw = Rs();
    Object.defineProperty(P, "ProgressCallbackTransform", {
        enumerable: !0,
        get: function () {
            return iw.ProgressCallbackTransform;
        }
    });
    var nu = Kl();
    Object.defineProperty(P, "parseXml", {
        enumerable: !0,
        get: function () {
            return nu.parseXml;
        }
    });
    Object.defineProperty(P, "XElement", {
        enumerable: !0,
        get: function () {
            return nu.XElement;
        }
    });
    var sw = kr();
    Object.defineProperty(P, "newError", {
        enumerable: !0,
        get: function () {
            return sw.newError;
        }
    });
    var ow = Ql();
    Object.defineProperty(P, "MemoLazy", {
        enumerable: !0,
        get: function () {
            return ow.MemoLazy;
        }
    });
    var aw = eu();
    Object.defineProperty(P, "retry", {
        enumerable: !0,
        get: function () {
            return aw.retry;
        }
    });
    P.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe";
    P.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function lw(e) {
        return e == null ? [] : Array.isArray(e) ? e : [e];
    }
});
var Ie = g(Us => {
    "use strict";
    Us.fromCallback = function (e) {
        return Object.defineProperty(
            function (...t) {
                if (typeof t[t.length - 1] == "function") e.apply(this, t);
                else
                    return new Promise((r, n) => {
                        t.push((i, s) => (i != null ? n(i) : r(s))), e.apply(this, t);
                    });
            },
            "name",
            { value: e.name }
        );
    };
    Us.fromPromise = function (e) {
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
var su = g((oN, iu) => {
    var ft = require("constants"),
        uw = process.cwd,
        Xn = null,
        cw = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function () {
        return Xn || (Xn = uw.call(process)), Xn;
    };
    try {
        process.cwd();
    } catch {}
    typeof process.chdir == "function" &&
        ((ks = process.chdir),
        (process.chdir = function (e) {
            (Xn = null), ks.call(process, e);
        }),
        Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, ks));
    var ks;
    iu.exports = fw;
    function fw(e) {
        ft.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e),
            e.lutimes || r(e),
            (e.chown = s(e.chown)),
            (e.fchown = s(e.fchown)),
            (e.lchown = s(e.lchown)),
            (e.chmod = n(e.chmod)),
            (e.fchmod = n(e.fchmod)),
            (e.lchmod = n(e.lchmod)),
            (e.chownSync = o(e.chownSync)),
            (e.fchownSync = o(e.fchownSync)),
            (e.lchownSync = o(e.lchownSync)),
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
            cw === "win32" &&
                (e.rename =
                    typeof e.rename != "function"
                        ? e.rename
                        : (function (c) {
                              function f(m, p, _) {
                                  var v = Date.now(),
                                      S = 0;
                                  c(m, p, function T(C) {
                                      if (
                                          C &&
                                          (C.code === "EACCES" || C.code === "EPERM" || C.code === "EBUSY") &&
                                          Date.now() - v < 6e4
                                      ) {
                                          setTimeout(function () {
                                              e.stat(p, function (I, L) {
                                                  I && I.code === "ENOENT" ? c(m, p, T) : _(C);
                                              });
                                          }, S),
                                              S < 100 && (S += 10);
                                          return;
                                      }
                                      _ && _(C);
                                  });
                              }
                              return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
                          })(e.rename)),
            (e.read =
                typeof e.read != "function"
                    ? e.read
                    : (function (c) {
                          function f(m, p, _, v, S, T) {
                              var C;
                              if (T && typeof T == "function") {
                                  var I = 0;
                                  C = function (L, $e, X) {
                                      if (L && L.code === "EAGAIN" && I < 10) return I++, c.call(e, m, p, _, v, S, C);
                                      T.apply(this, arguments);
                                  };
                              }
                              return c.call(e, m, p, _, v, S, C);
                          }
                          return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
                      })(e.read)),
            (e.readSync =
                typeof e.readSync != "function"
                    ? e.readSync
                    : (function (c) {
                          return function (f, m, p, _, v) {
                              for (var S = 0; ; )
                                  try {
                                      return c.call(e, f, m, p, _, v);
                                  } catch (T) {
                                      if (T.code === "EAGAIN" && S < 10) {
                                          S++;
                                          continue;
                                      }
                                      throw T;
                                  }
                          };
                      })(e.readSync));
        function t(c) {
            (c.lchmod = function (f, m, p) {
                c.open(f, ft.O_WRONLY | ft.O_SYMLINK, m, function (_, v) {
                    if (_) {
                        p && p(_);
                        return;
                    }
                    c.fchmod(v, m, function (S) {
                        c.close(v, function (T) {
                            p && p(S || T);
                        });
                    });
                });
            }),
                (c.lchmodSync = function (f, m) {
                    var p = c.openSync(f, ft.O_WRONLY | ft.O_SYMLINK, m),
                        _ = !0,
                        v;
                    try {
                        (v = c.fchmodSync(p, m)), (_ = !1);
                    } finally {
                        if (_)
                            try {
                                c.closeSync(p);
                            } catch {}
                        else c.closeSync(p);
                    }
                    return v;
                });
        }
        function r(c) {
            ft.hasOwnProperty("O_SYMLINK") && c.futimes
                ? ((c.lutimes = function (f, m, p, _) {
                      c.open(f, ft.O_SYMLINK, function (v, S) {
                          if (v) {
                              _ && _(v);
                              return;
                          }
                          c.futimes(S, m, p, function (T) {
                              c.close(S, function (C) {
                                  _ && _(T || C);
                              });
                          });
                      });
                  }),
                  (c.lutimesSync = function (f, m, p) {
                      var _ = c.openSync(f, ft.O_SYMLINK),
                          v,
                          S = !0;
                      try {
                          (v = c.futimesSync(_, m, p)), (S = !1);
                      } finally {
                          if (S)
                              try {
                                  c.closeSync(_);
                              } catch {}
                          else c.closeSync(_);
                      }
                      return v;
                  }))
                : c.futimes &&
                  ((c.lutimes = function (f, m, p, _) {
                      _ && process.nextTick(_);
                  }),
                  (c.lutimesSync = function () {}));
        }
        function n(c) {
            return (
                c &&
                function (f, m, p) {
                    return c.call(e, f, m, function (_) {
                        d(_) && (_ = null), p && p.apply(this, arguments);
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
        function s(c) {
            return (
                c &&
                function (f, m, p, _) {
                    return c.call(e, f, m, p, function (v) {
                        d(v) && (v = null), _ && _.apply(this, arguments);
                    });
                }
            );
        }
        function o(c) {
            return (
                c &&
                function (f, m, p) {
                    try {
                        return c.call(e, f, m, p);
                    } catch (_) {
                        if (!d(_)) throw _;
                    }
                }
            );
        }
        function a(c) {
            return (
                c &&
                function (f, m, p) {
                    typeof m == "function" && ((p = m), (m = null));
                    function _(v, S) {
                        S && (S.uid < 0 && (S.uid += 4294967296), S.gid < 0 && (S.gid += 4294967296)),
                            p && p.apply(this, arguments);
                    }
                    return m ? c.call(e, f, m, _) : c.call(e, f, _);
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
var lu = g((aN, au) => {
    var ou = require("stream").Stream;
    au.exports = hw;
    function hw(e) {
        return { ReadStream: t, WriteStream: r };
        function t(n, i) {
            if (!(this instanceof t)) return new t(n, i);
            ou.call(this);
            var s = this;
            (this.path = n),
                (this.fd = null),
                (this.readable = !0),
                (this.paused = !1),
                (this.flags = "r"),
                (this.mode = 438),
                (this.bufferSize = 64 * 1024),
                (i = i || {});
            for (var o = Object.keys(i), a = 0, l = o.length; a < l; a++) {
                var d = o[a];
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
                    s._read();
                });
                return;
            }
            e.open(this.path, this.flags, this.mode, function (c, f) {
                if (c) {
                    s.emit("error", c), (s.readable = !1);
                    return;
                }
                (s.fd = f), s.emit("open", f), s._read();
            });
        }
        function r(n, i) {
            if (!(this instanceof r)) return new r(n, i);
            ou.call(this),
                (this.path = n),
                (this.fd = null),
                (this.writable = !0),
                (this.flags = "w"),
                (this.encoding = "binary"),
                (this.mode = 438),
                (this.bytesWritten = 0),
                (i = i || {});
            for (var s = Object.keys(i), o = 0, a = s.length; o < a; o++) {
                var l = s[o];
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
var cu = g((lN, uu) => {
    "use strict";
    uu.exports = pw;
    var dw =
        Object.getPrototypeOf ||
        function (e) {
            return e.__proto__;
        };
    function pw(e) {
        if (e === null || typeof e != "object") return e;
        if (e instanceof Object) var t = { __proto__: dw(e) };
        else var t = Object.create(null);
        return (
            Object.getOwnPropertyNames(e).forEach(function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
            }),
            t
        );
    }
});
var Se = g((uN, js) => {
    var te = require("fs"),
        mw = su(),
        gw = lu(),
        ww = cu(),
        Kn = require("util"),
        me,
        Qn;
    typeof Symbol == "function" && typeof Symbol.for == "function"
        ? ((me = Symbol.for("graceful-fs.queue")), (Qn = Symbol.for("graceful-fs.previous")))
        : ((me = "___graceful-fs.queue"), (Qn = "___graceful-fs.previous"));
    function yw() {}
    function du(e, t) {
        Object.defineProperty(e, me, {
            get: function () {
                return t;
            }
        });
    }
    var Rt = yw;
    Kn.debuglog
        ? (Rt = Kn.debuglog("gfs4"))
        : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
          (Rt = function () {
              var e = Kn.format.apply(Kn, arguments);
              (e = "GFS4: " + e.split(/\n/).join("\nGFS4: ")), console.error(e);
          });
    te[me] ||
        ((fu = global[me] || []),
        du(te, fu),
        (te.close = (function (e) {
            function t(r, n) {
                return e.call(te, r, function (i) {
                    i || hu(), typeof n == "function" && n.apply(this, arguments);
                });
            }
            return Object.defineProperty(t, Qn, { value: e }), t;
        })(te.close)),
        (te.closeSync = (function (e) {
            function t(r) {
                e.apply(te, arguments), hu();
            }
            return Object.defineProperty(t, Qn, { value: e }), t;
        })(te.closeSync)),
        /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
            process.on("exit", function () {
                Rt(te[me]), require("assert").equal(te[me].length, 0);
            }));
    var fu;
    global[me] || du(global, te[me]);
    js.exports = Ms(ww(te));
    process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !te.__patched && ((js.exports = Ms(te)), (te.__patched = !0));
    function Ms(e) {
        mw(e), (e.gracefulify = Ms), (e.createReadStream = $e), (e.createWriteStream = X);
        var t = e.readFile;
        e.readFile = r;
        function r(D, $, R) {
            return typeof $ == "function" && ((R = $), ($ = null)), Z(D, $, R);
            function Z(ie, Q, Y, F) {
                return t(ie, Q, function (W) {
                    W && (W.code === "EMFILE" || W.code === "ENFILE")
                        ? ar([Z, [ie, Q, Y], W, F || Date.now(), Date.now()])
                        : typeof Y == "function" && Y.apply(this, arguments);
                });
            }
        }
        var n = e.writeFile;
        e.writeFile = i;
        function i(D, $, R, Z) {
            return typeof R == "function" && ((Z = R), (R = null)), ie(D, $, R, Z);
            function ie(Q, Y, F, W, ne) {
                return n(Q, Y, F, function (G) {
                    G && (G.code === "EMFILE" || G.code === "ENFILE")
                        ? ar([ie, [Q, Y, F, W], G, ne || Date.now(), Date.now()])
                        : typeof W == "function" && W.apply(this, arguments);
                });
            }
        }
        var s = e.appendFile;
        s && (e.appendFile = o);
        function o(D, $, R, Z) {
            return typeof R == "function" && ((Z = R), (R = null)), ie(D, $, R, Z);
            function ie(Q, Y, F, W, ne) {
                return s(Q, Y, F, function (G) {
                    G && (G.code === "EMFILE" || G.code === "ENFILE")
                        ? ar([ie, [Q, Y, F, W], G, ne || Date.now(), Date.now()])
                        : typeof W == "function" && W.apply(this, arguments);
                });
            }
        }
        var a = e.copyFile;
        a && (e.copyFile = l);
        function l(D, $, R, Z) {
            return typeof R == "function" && ((Z = R), (R = 0)), ie(D, $, R, Z);
            function ie(Q, Y, F, W, ne) {
                return a(Q, Y, F, function (G) {
                    G && (G.code === "EMFILE" || G.code === "ENFILE")
                        ? ar([ie, [Q, Y, F, W], G, ne || Date.now(), Date.now()])
                        : typeof W == "function" && W.apply(this, arguments);
                });
            }
        }
        var d = e.readdir;
        e.readdir = f;
        var c = /^v[0-5]\./;
        function f(D, $, R) {
            typeof $ == "function" && ((R = $), ($ = null));
            var Z = c.test(process.version)
                ? function (Y, F, W, ne) {
                      return d(Y, ie(Y, F, W, ne));
                  }
                : function (Y, F, W, ne) {
                      return d(Y, F, ie(Y, F, W, ne));
                  };
            return Z(D, $, R);
            function ie(Q, Y, F, W) {
                return function (ne, G) {
                    ne && (ne.code === "EMFILE" || ne.code === "ENFILE")
                        ? ar([Z, [Q, Y, F], ne, W || Date.now(), Date.now()])
                        : (G && G.sort && G.sort(), typeof F == "function" && F.call(this, ne, G));
                };
            }
        }
        if (process.version.substr(0, 4) === "v0.8") {
            var m = gw(e);
            (T = m.ReadStream), (I = m.WriteStream);
        }
        var p = e.ReadStream;
        p && ((T.prototype = Object.create(p.prototype)), (T.prototype.open = C));
        var _ = e.WriteStream;
        _ && ((I.prototype = Object.create(_.prototype)), (I.prototype.open = L)),
            Object.defineProperty(e, "ReadStream", {
                get: function () {
                    return T;
                },
                set: function (D) {
                    T = D;
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e, "WriteStream", {
                get: function () {
                    return I;
                },
                set: function (D) {
                    I = D;
                },
                enumerable: !0,
                configurable: !0
            });
        var v = T;
        Object.defineProperty(e, "FileReadStream", {
            get: function () {
                return v;
            },
            set: function (D) {
                v = D;
            },
            enumerable: !0,
            configurable: !0
        });
        var S = I;
        Object.defineProperty(e, "FileWriteStream", {
            get: function () {
                return S;
            },
            set: function (D) {
                S = D;
            },
            enumerable: !0,
            configurable: !0
        });
        function T(D, $) {
            return this instanceof T ? (p.apply(this, arguments), this) : T.apply(Object.create(T.prototype), arguments);
        }
        function C() {
            var D = this;
            y(D.path, D.flags, D.mode, function ($, R) {
                $ ? (D.autoClose && D.destroy(), D.emit("error", $)) : ((D.fd = R), D.emit("open", R), D.read());
            });
        }
        function I(D, $) {
            return this instanceof I ? (_.apply(this, arguments), this) : I.apply(Object.create(I.prototype), arguments);
        }
        function L() {
            var D = this;
            y(D.path, D.flags, D.mode, function ($, R) {
                $ ? (D.destroy(), D.emit("error", $)) : ((D.fd = R), D.emit("open", R));
            });
        }
        function $e(D, $) {
            return new e.ReadStream(D, $);
        }
        function X(D, $) {
            return new e.WriteStream(D, $);
        }
        var de = e.open;
        e.open = y;
        function y(D, $, R, Z) {
            return typeof R == "function" && ((Z = R), (R = null)), ie(D, $, R, Z);
            function ie(Q, Y, F, W, ne) {
                return de(Q, Y, F, function (G, ut) {
                    G && (G.code === "EMFILE" || G.code === "ENFILE")
                        ? ar([ie, [Q, Y, F, W], G, ne || Date.now(), Date.now()])
                        : typeof W == "function" && W.apply(this, arguments);
                });
            }
        }
        return e;
    }
    function ar(e) {
        Rt("ENQUEUE", e[0].name, e[1]), te[me].push(e), Bs();
    }
    var Jn;
    function hu() {
        for (var e = Date.now(), t = 0; t < te[me].length; ++t) te[me][t].length > 2 && ((te[me][t][3] = e), (te[me][t][4] = e));
        Bs();
    }
    function Bs() {
        if ((clearTimeout(Jn), (Jn = void 0), te[me].length !== 0)) {
            var e = te[me].shift(),
                t = e[0],
                r = e[1],
                n = e[2],
                i = e[3],
                s = e[4];
            if (i === void 0) Rt("RETRY", t.name, r), t.apply(null, r);
            else if (Date.now() - i >= 6e4) {
                Rt("TIMEOUT", t.name, r);
                var o = r.pop();
                typeof o == "function" && o.call(null, n);
            } else {
                var a = Date.now() - s,
                    l = Math.max(s - i, 1),
                    d = Math.min(l * 1.2, 100);
                a >= d ? (Rt("RETRY", t.name, r), t.apply(null, r.concat([i]))) : te[me].push(e);
            }
            Jn === void 0 && (Jn = setTimeout(Bs, 0));
        }
    }
});
var Dt = g(ht => {
    "use strict";
    var pu = Ie().fromCallback,
        Re = Se(),
        Ew = [
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
        ].filter(e => typeof Re[e] == "function");
    Object.assign(ht, Re);
    Ew.forEach(e => {
        ht[e] = pu(Re[e]);
    });
    ht.exists = function (e, t) {
        return typeof t == "function" ? Re.exists(e, t) : new Promise(r => Re.exists(e, r));
    };
    ht.read = function (e, t, r, n, i, s) {
        return typeof s == "function"
            ? Re.read(e, t, r, n, i, s)
            : new Promise((o, a) => {
                  Re.read(e, t, r, n, i, (l, d, c) => {
                      if (l) return a(l);
                      o({ bytesRead: d, buffer: c });
                  });
              });
    };
    ht.write = function (e, t, ...r) {
        return typeof r[r.length - 1] == "function"
            ? Re.write(e, t, ...r)
            : new Promise((n, i) => {
                  Re.write(e, t, ...r, (s, o, a) => {
                      if (s) return i(s);
                      n({ bytesWritten: o, buffer: a });
                  });
              });
    };
    typeof Re.writev == "function" &&
        (ht.writev = function (e, t, ...r) {
            return typeof r[r.length - 1] == "function"
                ? Re.writev(e, t, ...r)
                : new Promise((n, i) => {
                      Re.writev(e, t, ...r, (s, o, a) => {
                          if (s) return i(s);
                          n({ bytesWritten: o, buffers: a });
                      });
                  });
        });
    typeof Re.realpath.native == "function"
        ? (ht.realpath.native = pu(Re.realpath.native))
        : process.emitWarning(
              "fs.realpath.native is not a function. Is fs being monkey-patched?",
              "Warning",
              "fs-extra-WARN0003"
          );
});
var gu = g((fN, mu) => {
    "use strict";
    var _w = require("path");
    mu.exports.checkPath = function (t) {
        if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(_w.parse(t).root, ""))) {
            let n = new Error("Path contains invalid characters: ".concat(t));
            throw ((n.code = "EINVAL"), n);
        }
    };
});
var _u = g((hN, Hs) => {
    "use strict";
    var wu = Dt(),
        { checkPath: yu } = gu(),
        Eu = e => {
            let t = { mode: 511 };
            return typeof e == "number" ? e : { ...t, ...e }.mode;
        };
    Hs.exports.makeDir = async (e, t) => (yu(e), wu.mkdir(e, { mode: Eu(t), recursive: !0 }));
    Hs.exports.makeDirSync = (e, t) => (yu(e), wu.mkdirSync(e, { mode: Eu(t), recursive: !0 }));
});
var Ge = g((dN, vu) => {
    "use strict";
    var vw = Ie().fromPromise,
        { makeDir: Sw, makeDirSync: Ws } = _u(),
        Gs = vw(Sw);
    vu.exports = { mkdirs: Gs, mkdirsSync: Ws, mkdirp: Gs, mkdirpSync: Ws, ensureDir: Gs, ensureDirSync: Ws };
});
var dt = g((pN, Au) => {
    "use strict";
    var Aw = Ie().fromPromise,
        Su = Dt();
    function Cw(e) {
        return Su.access(e)
            .then(() => !0)
            .catch(() => !1);
    }
    Au.exports = { pathExists: Aw(Cw), pathExistsSync: Su.existsSync };
});
var Vs = g((mN, Cu) => {
    "use strict";
    var lr = Se();
    function Tw(e, t, r, n) {
        lr.open(e, "r+", (i, s) => {
            if (i) return n(i);
            lr.futimes(s, t, r, o => {
                lr.close(s, a => {
                    n && n(o || a);
                });
            });
        });
    }
    function bw(e, t, r) {
        let n = lr.openSync(e, "r+");
        return lr.futimesSync(n, t, r), lr.closeSync(n);
    }
    Cu.exports = { utimesMillis: Tw, utimesMillisSync: bw };
});
var Pt = g((gN, Ou) => {
    "use strict";
    var ur = Dt(),
        fe = require("path"),
        Ow = require("util");
    function xw(e, t, r) {
        let n = r.dereference ? i => ur.stat(i, { bigint: !0 }) : i => ur.lstat(i, { bigint: !0 });
        return Promise.all([
            n(e),
            n(t).catch(i => {
                if (i.code === "ENOENT") return null;
                throw i;
            })
        ]).then(([i, s]) => ({ srcStat: i, destStat: s }));
    }
    function Nw(e, t, r) {
        let n,
            i = r.dereference ? o => ur.statSync(o, { bigint: !0 }) : o => ur.lstatSync(o, { bigint: !0 }),
            s = i(e);
        try {
            n = i(t);
        } catch (o) {
            if (o.code === "ENOENT") return { srcStat: s, destStat: null };
            throw o;
        }
        return { srcStat: s, destStat: n };
    }
    function Iw(e, t, r, n, i) {
        Ow.callbackify(xw)(e, t, n, (s, o) => {
            if (s) return i(s);
            let { srcStat: a, destStat: l } = o;
            if (l) {
                if (Gr(a, l)) {
                    let d = fe.basename(e),
                        c = fe.basename(t);
                    return r === "move" && d !== c && d.toLowerCase() === c.toLowerCase()
                        ? i(null, { srcStat: a, destStat: l, isChangingCase: !0 })
                        : i(new Error("Source and destination must not be the same."));
                }
                if (a.isDirectory() && !l.isDirectory())
                    return i(new Error("Cannot overwrite non-directory '".concat(t, "' with directory '").concat(e, "'.")));
                if (!a.isDirectory() && l.isDirectory())
                    return i(new Error("Cannot overwrite directory '".concat(t, "' with non-directory '").concat(e, "'.")));
            }
            return a.isDirectory() && Ys(e, t) ? i(new Error(Zn(e, t, r))) : i(null, { srcStat: a, destStat: l });
        });
    }
    function Rw(e, t, r, n) {
        let { srcStat: i, destStat: s } = Nw(e, t, n);
        if (s) {
            if (Gr(i, s)) {
                let o = fe.basename(e),
                    a = fe.basename(t);
                if (r === "move" && o !== a && o.toLowerCase() === a.toLowerCase())
                    return { srcStat: i, destStat: s, isChangingCase: !0 };
                throw new Error("Source and destination must not be the same.");
            }
            if (i.isDirectory() && !s.isDirectory())
                throw new Error("Cannot overwrite non-directory '".concat(t, "' with directory '").concat(e, "'."));
            if (!i.isDirectory() && s.isDirectory())
                throw new Error("Cannot overwrite directory '".concat(t, "' with non-directory '").concat(e, "'."));
        }
        if (i.isDirectory() && Ys(e, t)) throw new Error(Zn(e, t, r));
        return { srcStat: i, destStat: s };
    }
    function Tu(e, t, r, n, i) {
        let s = fe.resolve(fe.dirname(e)),
            o = fe.resolve(fe.dirname(r));
        if (o === s || o === fe.parse(o).root) return i();
        ur.stat(o, { bigint: !0 }, (a, l) =>
            a ? (a.code === "ENOENT" ? i() : i(a)) : Gr(t, l) ? i(new Error(Zn(e, r, n))) : Tu(e, t, o, n, i)
        );
    }
    function bu(e, t, r, n) {
        let i = fe.resolve(fe.dirname(e)),
            s = fe.resolve(fe.dirname(r));
        if (s === i || s === fe.parse(s).root) return;
        let o;
        try {
            o = ur.statSync(s, { bigint: !0 });
        } catch (a) {
            if (a.code === "ENOENT") return;
            throw a;
        }
        if (Gr(t, o)) throw new Error(Zn(e, r, n));
        return bu(e, t, s, n);
    }
    function Gr(e, t) {
        return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
    }
    function Ys(e, t) {
        let r = fe
                .resolve(e)
                .split(fe.sep)
                .filter(i => i),
            n = fe
                .resolve(t)
                .split(fe.sep)
                .filter(i => i);
        return r.reduce((i, s, o) => i && n[o] === s, !0);
    }
    function Zn(e, t, r) {
        return "Cannot ".concat(r, " '").concat(e, "' to a subdirectory of itself, '").concat(t, "'.");
    }
    Ou.exports = {
        checkPaths: Iw,
        checkPathsSync: Rw,
        checkParentPaths: Tu,
        checkParentPathsSync: bu,
        isSrcSubdir: Ys,
        areIdentical: Gr
    };
});
var qu = g((wN, Fu) => {
    "use strict";
    var De = Se(),
        Vr = require("path"),
        Dw = Ge().mkdirs,
        Pw = dt().pathExists,
        Fw = Vs().utimesMillis,
        Yr = Pt();
    function qw(e, t, r, n) {
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
            Yr.checkPaths(e, t, "copy", r, (i, s) => {
                if (i) return n(i);
                let { srcStat: o, destStat: a } = s;
                Yr.checkParentPaths(e, o, t, "copy", l => (l ? n(l) : r.filter ? Iu(xu, a, e, t, r, n) : xu(a, e, t, r, n)));
            });
    }
    function xu(e, t, r, n, i) {
        let s = Vr.dirname(r);
        Pw(s, (o, a) => {
            if (o) return i(o);
            if (a) return ei(e, t, r, n, i);
            Dw(s, l => (l ? i(l) : ei(e, t, r, n, i)));
        });
    }
    function Iu(e, t, r, n, i, s) {
        Promise.resolve(i.filter(r, n)).then(
            o => (o ? e(t, r, n, i, s) : s()),
            o => s(o)
        );
    }
    function Lw(e, t, r, n, i) {
        return n.filter ? Iu(ei, e, t, r, n, i) : ei(e, t, r, n, i);
    }
    function ei(e, t, r, n, i) {
        (n.dereference ? De.stat : De.lstat)(t, (o, a) =>
            o
                ? i(o)
                : a.isDirectory()
                ? Hw(a, e, t, r, n, i)
                : a.isFile() || a.isCharacterDevice() || a.isBlockDevice()
                ? $w(a, e, t, r, n, i)
                : a.isSymbolicLink()
                ? Vw(e, t, r, n, i)
                : a.isSocket()
                ? i(new Error("Cannot copy a socket file: ".concat(t)))
                : a.isFIFO()
                ? i(new Error("Cannot copy a FIFO pipe: ".concat(t)))
                : i(new Error("Unknown file: ".concat(t)))
        );
    }
    function $w(e, t, r, n, i, s) {
        return t ? Uw(e, r, n, i, s) : Ru(e, r, n, i, s);
    }
    function Uw(e, t, r, n, i) {
        if (n.overwrite) De.unlink(r, s => (s ? i(s) : Ru(e, t, r, n, i)));
        else return n.errorOnExist ? i(new Error("'".concat(r, "' already exists"))) : i();
    }
    function Ru(e, t, r, n, i) {
        De.copyFile(t, r, s => (s ? i(s) : n.preserveTimestamps ? kw(e.mode, t, r, i) : ti(r, e.mode, i)));
    }
    function kw(e, t, r, n) {
        return Mw(e) ? Bw(r, e, i => (i ? n(i) : Nu(e, t, r, n))) : Nu(e, t, r, n);
    }
    function Mw(e) {
        return (e & 128) === 0;
    }
    function Bw(e, t, r) {
        return ti(e, t | 128, r);
    }
    function Nu(e, t, r, n) {
        jw(t, r, i => (i ? n(i) : ti(r, e, n)));
    }
    function ti(e, t, r) {
        return De.chmod(e, t, r);
    }
    function jw(e, t, r) {
        De.stat(e, (n, i) => (n ? r(n) : Fw(t, i.atime, i.mtime, r)));
    }
    function Hw(e, t, r, n, i, s) {
        return t ? Du(r, n, i, s) : Ww(e.mode, r, n, i, s);
    }
    function Ww(e, t, r, n, i) {
        De.mkdir(r, s => {
            if (s) return i(s);
            Du(t, r, n, o => (o ? i(o) : ti(r, e, i)));
        });
    }
    function Du(e, t, r, n) {
        De.readdir(e, (i, s) => (i ? n(i) : Pu(s, e, t, r, n)));
    }
    function Pu(e, t, r, n, i) {
        let s = e.pop();
        return s ? Gw(e, s, t, r, n, i) : i();
    }
    function Gw(e, t, r, n, i, s) {
        let o = Vr.join(r, t),
            a = Vr.join(n, t);
        Yr.checkPaths(o, a, "copy", i, (l, d) => {
            if (l) return s(l);
            let { destStat: c } = d;
            Lw(c, o, a, i, f => (f ? s(f) : Pu(e, r, n, i, s)));
        });
    }
    function Vw(e, t, r, n, i) {
        De.readlink(t, (s, o) => {
            if (s) return i(s);
            if ((n.dereference && (o = Vr.resolve(process.cwd(), o)), e))
                De.readlink(r, (a, l) =>
                    a
                        ? a.code === "EINVAL" || a.code === "UNKNOWN"
                            ? De.symlink(o, r, i)
                            : i(a)
                        : (n.dereference && (l = Vr.resolve(process.cwd(), l)),
                          Yr.isSrcSubdir(o, l)
                              ? i(new Error("Cannot copy '".concat(o, "' to a subdirectory of itself, '").concat(l, "'.")))
                              : e.isDirectory() && Yr.isSrcSubdir(l, o)
                              ? i(new Error("Cannot overwrite '".concat(l, "' with '").concat(o, "'.")))
                              : Yw(o, r, i))
                );
            else return De.symlink(o, r, i);
        });
    }
    function Yw(e, t, r) {
        De.unlink(t, n => (n ? r(n) : De.symlink(e, t, r)));
    }
    Fu.exports = qw;
});
var Mu = g((yN, ku) => {
    "use strict";
    var ge = Se(),
        zr = require("path"),
        zw = Ge().mkdirsSync,
        Xw = Vs().utimesMillisSync,
        Xr = Pt();
    function Kw(e, t, r) {
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
        let { srcStat: n, destStat: i } = Xr.checkPathsSync(e, t, "copy", r);
        return Xr.checkParentPathsSync(e, n, t, "copy"), Jw(i, e, t, r);
    }
    function Jw(e, t, r, n) {
        if (n.filter && !n.filter(t, r)) return;
        let i = zr.dirname(r);
        return ge.existsSync(i) || zw(i), Lu(e, t, r, n);
    }
    function Qw(e, t, r, n) {
        if (!(n.filter && !n.filter(t, r))) return Lu(e, t, r, n);
    }
    function Lu(e, t, r, n) {
        let s = (n.dereference ? ge.statSync : ge.lstatSync)(t);
        if (s.isDirectory()) return sy(s, e, t, r, n);
        if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice()) return Zw(s, e, t, r, n);
        if (s.isSymbolicLink()) return ly(e, t, r, n);
        throw s.isSocket()
            ? new Error("Cannot copy a socket file: ".concat(t))
            : s.isFIFO()
            ? new Error("Cannot copy a FIFO pipe: ".concat(t))
            : new Error("Unknown file: ".concat(t));
    }
    function Zw(e, t, r, n, i) {
        return t ? ey(e, r, n, i) : $u(e, r, n, i);
    }
    function ey(e, t, r, n) {
        if (n.overwrite) return ge.unlinkSync(r), $u(e, t, r, n);
        if (n.errorOnExist) throw new Error("'".concat(r, "' already exists"));
    }
    function $u(e, t, r, n) {
        return ge.copyFileSync(t, r), n.preserveTimestamps && ty(e.mode, t, r), zs(r, e.mode);
    }
    function ty(e, t, r) {
        return ry(e) && ny(r, e), iy(t, r);
    }
    function ry(e) {
        return (e & 128) === 0;
    }
    function ny(e, t) {
        return zs(e, t | 128);
    }
    function zs(e, t) {
        return ge.chmodSync(e, t);
    }
    function iy(e, t) {
        let r = ge.statSync(e);
        return Xw(t, r.atime, r.mtime);
    }
    function sy(e, t, r, n, i) {
        return t ? Uu(r, n, i) : oy(e.mode, r, n, i);
    }
    function oy(e, t, r, n) {
        return ge.mkdirSync(r), Uu(t, r, n), zs(r, e);
    }
    function Uu(e, t, r) {
        ge.readdirSync(e).forEach(n => ay(n, e, t, r));
    }
    function ay(e, t, r, n) {
        let i = zr.join(t, e),
            s = zr.join(r, e),
            { destStat: o } = Xr.checkPathsSync(i, s, "copy", n);
        return Qw(o, i, s, n);
    }
    function ly(e, t, r, n) {
        let i = ge.readlinkSync(t);
        if ((n.dereference && (i = zr.resolve(process.cwd(), i)), e)) {
            let s;
            try {
                s = ge.readlinkSync(r);
            } catch (o) {
                if (o.code === "EINVAL" || o.code === "UNKNOWN") return ge.symlinkSync(i, r);
                throw o;
            }
            if ((n.dereference && (s = zr.resolve(process.cwd(), s)), Xr.isSrcSubdir(i, s)))
                throw new Error("Cannot copy '".concat(i, "' to a subdirectory of itself, '").concat(s, "'."));
            if (ge.statSync(r).isDirectory() && Xr.isSrcSubdir(s, i))
                throw new Error("Cannot overwrite '".concat(s, "' with '").concat(i, "'."));
            return uy(i, r);
        } else return ge.symlinkSync(i, r);
    }
    function uy(e, t) {
        return ge.unlinkSync(t), ge.symlinkSync(e, t);
    }
    ku.exports = Kw;
});
var ri = g((EN, Bu) => {
    "use strict";
    var cy = Ie().fromCallback;
    Bu.exports = { copy: cy(qu()), copySync: Mu() };
});
var Ku = g((_N, Xu) => {
    "use strict";
    var ju = Se(),
        Vu = require("path"),
        V = require("assert"),
        Kr = process.platform === "win32";
    function Yu(e) {
        ["unlink", "chmod", "stat", "lstat", "rmdir", "readdir"].forEach(r => {
            (e[r] = e[r] || ju[r]), (r = r + "Sync"), (e[r] = e[r] || ju[r]);
        }),
            (e.maxBusyTries = e.maxBusyTries || 3);
    }
    function Xs(e, t, r) {
        let n = 0;
        typeof t == "function" && ((r = t), (t = {})),
            V(e, "rimraf: missing path"),
            V.strictEqual(typeof e, "string", "rimraf: path should be a string"),
            V.strictEqual(typeof r, "function", "rimraf: callback function required"),
            V(t, "rimraf: invalid options argument provided"),
            V.strictEqual(typeof t, "object", "rimraf: options should be object"),
            Yu(t),
            Hu(e, t, function i(s) {
                if (s) {
                    if ((s.code === "EBUSY" || s.code === "ENOTEMPTY" || s.code === "EPERM") && n < t.maxBusyTries) {
                        n++;
                        let o = n * 100;
                        return setTimeout(() => Hu(e, t, i), o);
                    }
                    s.code === "ENOENT" && (s = null);
                }
                r(s);
            });
    }
    function Hu(e, t, r) {
        V(e),
            V(t),
            V(typeof r == "function"),
            t.lstat(e, (n, i) => {
                if (n && n.code === "ENOENT") return r(null);
                if (n && n.code === "EPERM" && Kr) return Wu(e, t, n, r);
                if (i && i.isDirectory()) return ni(e, t, n, r);
                t.unlink(e, s => {
                    if (s) {
                        if (s.code === "ENOENT") return r(null);
                        if (s.code === "EPERM") return Kr ? Wu(e, t, s, r) : ni(e, t, s, r);
                        if (s.code === "EISDIR") return ni(e, t, s, r);
                    }
                    return r(s);
                });
            });
    }
    function Wu(e, t, r, n) {
        V(e),
            V(t),
            V(typeof n == "function"),
            t.chmod(e, 438, i => {
                i
                    ? n(i.code === "ENOENT" ? null : r)
                    : t.stat(e, (s, o) => {
                          s ? n(s.code === "ENOENT" ? null : r) : o.isDirectory() ? ni(e, t, r, n) : t.unlink(e, n);
                      });
            });
    }
    function Gu(e, t, r) {
        let n;
        V(e), V(t);
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
        n.isDirectory() ? ii(e, t, r) : t.unlinkSync(e);
    }
    function ni(e, t, r, n) {
        V(e),
            V(t),
            V(typeof n == "function"),
            t.rmdir(e, i => {
                i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM")
                    ? fy(e, t, n)
                    : i && i.code === "ENOTDIR"
                    ? n(r)
                    : n(i);
            });
    }
    function fy(e, t, r) {
        V(e),
            V(t),
            V(typeof r == "function"),
            t.readdir(e, (n, i) => {
                if (n) return r(n);
                let s = i.length,
                    o;
                if (s === 0) return t.rmdir(e, r);
                i.forEach(a => {
                    Xs(Vu.join(e, a), t, l => {
                        if (!o) {
                            if (l) return r((o = l));
                            --s === 0 && t.rmdir(e, r);
                        }
                    });
                });
            });
    }
    function zu(e, t) {
        let r;
        (t = t || {}),
            Yu(t),
            V(e, "rimraf: missing path"),
            V.strictEqual(typeof e, "string", "rimraf: path should be a string"),
            V(t, "rimraf: missing options"),
            V.strictEqual(typeof t, "object", "rimraf: options should be object");
        try {
            r = t.lstatSync(e);
        } catch (n) {
            if (n.code === "ENOENT") return;
            n.code === "EPERM" && Kr && Gu(e, t, n);
        }
        try {
            r && r.isDirectory() ? ii(e, t, null) : t.unlinkSync(e);
        } catch (n) {
            if (n.code === "ENOENT") return;
            if (n.code === "EPERM") return Kr ? Gu(e, t, n) : ii(e, t, n);
            if (n.code !== "EISDIR") throw n;
            ii(e, t, n);
        }
    }
    function ii(e, t, r) {
        V(e), V(t);
        try {
            t.rmdirSync(e);
        } catch (n) {
            if (n.code === "ENOTDIR") throw r;
            if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM") hy(e, t);
            else if (n.code !== "ENOENT") throw n;
        }
    }
    function hy(e, t) {
        if ((V(e), V(t), t.readdirSync(e).forEach(r => zu(Vu.join(e, r), t)), Kr)) {
            let r = Date.now();
            do
                try {
                    return t.rmdirSync(e, t);
                } catch {}
            while (Date.now() - r < 500);
        } else return t.rmdirSync(e, t);
    }
    Xu.exports = Xs;
    Xs.sync = zu;
});
var Jr = g((vN, Qu) => {
    "use strict";
    var si = Se(),
        dy = Ie().fromCallback,
        Ju = Ku();
    function py(e, t) {
        if (si.rm) return si.rm(e, { recursive: !0, force: !0 }, t);
        Ju(e, t);
    }
    function my(e) {
        if (si.rmSync) return si.rmSync(e, { recursive: !0, force: !0 });
        Ju.sync(e);
    }
    Qu.exports = { remove: dy(py), removeSync: my };
});
var oc = g((SN, sc) => {
    "use strict";
    var gy = Ie().fromPromise,
        tc = Dt(),
        rc = require("path"),
        nc = Ge(),
        ic = Jr(),
        Zu = gy(async function (t) {
            let r;
            try {
                r = await tc.readdir(t);
            } catch {
                return nc.mkdirs(t);
            }
            return Promise.all(r.map(n => ic.remove(rc.join(t, n))));
        });
    function ec(e) {
        let t;
        try {
            t = tc.readdirSync(e);
        } catch {
            return nc.mkdirsSync(e);
        }
        t.forEach(r => {
            (r = rc.join(e, r)), ic.removeSync(r);
        });
    }
    sc.exports = { emptyDirSync: ec, emptydirSync: ec, emptyDir: Zu, emptydir: Zu };
});
var cc = g((AN, uc) => {
    "use strict";
    var wy = Ie().fromCallback,
        ac = require("path"),
        pt = Se(),
        lc = Ge();
    function yy(e, t) {
        function r() {
            pt.writeFile(e, "", n => {
                if (n) return t(n);
                t();
            });
        }
        pt.stat(e, (n, i) => {
            if (!n && i.isFile()) return t();
            let s = ac.dirname(e);
            pt.stat(s, (o, a) => {
                if (o)
                    return o.code === "ENOENT"
                        ? lc.mkdirs(s, l => {
                              if (l) return t(l);
                              r();
                          })
                        : t(o);
                a.isDirectory()
                    ? r()
                    : pt.readdir(s, l => {
                          if (l) return t(l);
                      });
            });
        });
    }
    function Ey(e) {
        let t;
        try {
            t = pt.statSync(e);
        } catch {}
        if (t && t.isFile()) return;
        let r = ac.dirname(e);
        try {
            pt.statSync(r).isDirectory() || pt.readdirSync(r);
        } catch (n) {
            if (n && n.code === "ENOENT") lc.mkdirsSync(r);
            else throw n;
        }
        pt.writeFileSync(e, "");
    }
    uc.exports = { createFile: wy(yy), createFileSync: Ey };
});
var mc = g((CN, pc) => {
    "use strict";
    var _y = Ie().fromCallback,
        fc = require("path"),
        mt = Se(),
        hc = Ge(),
        vy = dt().pathExists,
        { areIdentical: dc } = Pt();
    function Sy(e, t, r) {
        function n(i, s) {
            mt.link(i, s, o => {
                if (o) return r(o);
                r(null);
            });
        }
        mt.lstat(t, (i, s) => {
            mt.lstat(e, (o, a) => {
                if (o) return (o.message = o.message.replace("lstat", "ensureLink")), r(o);
                if (s && dc(a, s)) return r(null);
                let l = fc.dirname(t);
                vy(l, (d, c) => {
                    if (d) return r(d);
                    if (c) return n(e, t);
                    hc.mkdirs(l, f => {
                        if (f) return r(f);
                        n(e, t);
                    });
                });
            });
        });
    }
    function Ay(e, t) {
        let r;
        try {
            r = mt.lstatSync(t);
        } catch {}
        try {
            let s = mt.lstatSync(e);
            if (r && dc(s, r)) return;
        } catch (s) {
            throw ((s.message = s.message.replace("lstat", "ensureLink")), s);
        }
        let n = fc.dirname(t);
        return mt.existsSync(n) || hc.mkdirsSync(n), mt.linkSync(e, t);
    }
    pc.exports = { createLink: _y(Sy), createLinkSync: Ay };
});
var wc = g((TN, gc) => {
    "use strict";
    var gt = require("path"),
        Qr = Se(),
        Cy = dt().pathExists;
    function Ty(e, t, r) {
        if (gt.isAbsolute(e))
            return Qr.lstat(e, n =>
                n ? ((n.message = n.message.replace("lstat", "ensureSymlink")), r(n)) : r(null, { toCwd: e, toDst: e })
            );
        {
            let n = gt.dirname(t),
                i = gt.join(n, e);
            return Cy(i, (s, o) =>
                s
                    ? r(s)
                    : o
                    ? r(null, { toCwd: i, toDst: e })
                    : Qr.lstat(e, a =>
                          a
                              ? ((a.message = a.message.replace("lstat", "ensureSymlink")), r(a))
                              : r(null, { toCwd: e, toDst: gt.relative(n, e) })
                      )
            );
        }
    }
    function by(e, t) {
        let r;
        if (gt.isAbsolute(e)) {
            if (((r = Qr.existsSync(e)), !r)) throw new Error("absolute srcpath does not exist");
            return { toCwd: e, toDst: e };
        } else {
            let n = gt.dirname(t),
                i = gt.join(n, e);
            if (((r = Qr.existsSync(i)), r)) return { toCwd: i, toDst: e };
            if (((r = Qr.existsSync(e)), !r)) throw new Error("relative srcpath does not exist");
            return { toCwd: e, toDst: gt.relative(n, e) };
        }
    }
    gc.exports = { symlinkPaths: Ty, symlinkPathsSync: by };
});
var _c = g((bN, Ec) => {
    "use strict";
    var yc = Se();
    function Oy(e, t, r) {
        if (((r = typeof t == "function" ? t : r), (t = typeof t == "function" ? !1 : t), t)) return r(null, t);
        yc.lstat(e, (n, i) => {
            if (n) return r(null, "file");
            (t = i && i.isDirectory() ? "dir" : "file"), r(null, t);
        });
    }
    function xy(e, t) {
        let r;
        if (t) return t;
        try {
            r = yc.lstatSync(e);
        } catch {
            return "file";
        }
        return r && r.isDirectory() ? "dir" : "file";
    }
    Ec.exports = { symlinkType: Oy, symlinkTypeSync: xy };
});
var xc = g((ON, Oc) => {
    "use strict";
    var Ny = Ie().fromCallback,
        Sc = require("path"),
        Ve = Dt(),
        Ac = Ge(),
        Iy = Ac.mkdirs,
        Ry = Ac.mkdirsSync,
        Cc = wc(),
        Dy = Cc.symlinkPaths,
        Py = Cc.symlinkPathsSync,
        Tc = _c(),
        Fy = Tc.symlinkType,
        qy = Tc.symlinkTypeSync,
        Ly = dt().pathExists,
        { areIdentical: bc } = Pt();
    function $y(e, t, r, n) {
        (n = typeof r == "function" ? r : n),
            (r = typeof r == "function" ? !1 : r),
            Ve.lstat(t, (i, s) => {
                !i && s.isSymbolicLink()
                    ? Promise.all([Ve.stat(e), Ve.stat(t)]).then(([o, a]) => {
                          if (bc(o, a)) return n(null);
                          vc(e, t, r, n);
                      })
                    : vc(e, t, r, n);
            });
    }
    function vc(e, t, r, n) {
        Dy(e, t, (i, s) => {
            if (i) return n(i);
            (e = s.toDst),
                Fy(s.toCwd, r, (o, a) => {
                    if (o) return n(o);
                    let l = Sc.dirname(t);
                    Ly(l, (d, c) => {
                        if (d) return n(d);
                        if (c) return Ve.symlink(e, t, a, n);
                        Iy(l, f => {
                            if (f) return n(f);
                            Ve.symlink(e, t, a, n);
                        });
                    });
                });
        });
    }
    function Uy(e, t, r) {
        let n;
        try {
            n = Ve.lstatSync(t);
        } catch {}
        if (n && n.isSymbolicLink()) {
            let a = Ve.statSync(e),
                l = Ve.statSync(t);
            if (bc(a, l)) return;
        }
        let i = Py(e, t);
        (e = i.toDst), (r = qy(i.toCwd, r));
        let s = Sc.dirname(t);
        return Ve.existsSync(s) || Ry(s), Ve.symlinkSync(e, t, r);
    }
    Oc.exports = { createSymlink: Ny($y), createSymlinkSync: Uy };
});
var Lc = g((xN, qc) => {
    "use strict";
    var { createFile: Nc, createFileSync: Ic } = cc(),
        { createLink: Rc, createLinkSync: Dc } = mc(),
        { createSymlink: Pc, createSymlinkSync: Fc } = xc();
    qc.exports = {
        createFile: Nc,
        createFileSync: Ic,
        ensureFile: Nc,
        ensureFileSync: Ic,
        createLink: Rc,
        createLinkSync: Dc,
        ensureLink: Rc,
        ensureLinkSync: Dc,
        createSymlink: Pc,
        createSymlinkSync: Fc,
        ensureSymlink: Pc,
        ensureSymlinkSync: Fc
    };
});
var oi = g((NN, $c) => {
    function ky(e, { EOL: t = "\n", finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
        let s = r ? t : "";
        return JSON.stringify(e, n, i).replace(/\n/g, t) + s;
    }
    function My(e) {
        return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
    }
    $c.exports = { stringify: ky, stripBom: My };
});
var Bc = g((IN, Mc) => {
    var cr;
    try {
        cr = Se();
    } catch {
        cr = require("fs");
    }
    var ai = Ie(),
        { stringify: Uc, stripBom: kc } = oi();
    async function By(e, t = {}) {
        typeof t == "string" && (t = { encoding: t });
        let r = t.fs || cr,
            n = "throws" in t ? t.throws : !0,
            i = await ai.fromCallback(r.readFile)(e, t);
        i = kc(i);
        let s;
        try {
            s = JSON.parse(i, t ? t.reviver : null);
        } catch (o) {
            if (n) throw ((o.message = "".concat(e, ": ").concat(o.message)), o);
            return null;
        }
        return s;
    }
    var jy = ai.fromPromise(By);
    function Hy(e, t = {}) {
        typeof t == "string" && (t = { encoding: t });
        let r = t.fs || cr,
            n = "throws" in t ? t.throws : !0;
        try {
            let i = r.readFileSync(e, t);
            return (i = kc(i)), JSON.parse(i, t.reviver);
        } catch (i) {
            if (n) throw ((i.message = "".concat(e, ": ").concat(i.message)), i);
            return null;
        }
    }
    async function Wy(e, t, r = {}) {
        let n = r.fs || cr,
            i = Uc(t, r);
        await ai.fromCallback(n.writeFile)(e, i, r);
    }
    var Gy = ai.fromPromise(Wy);
    function Vy(e, t, r = {}) {
        let n = r.fs || cr,
            i = Uc(t, r);
        return n.writeFileSync(e, i, r);
    }
    var Yy = { readFile: jy, readFileSync: Hy, writeFile: Gy, writeFileSync: Vy };
    Mc.exports = Yy;
});
var Hc = g((RN, jc) => {
    "use strict";
    var li = Bc();
    jc.exports = {
        readJson: li.readFile,
        readJsonSync: li.readFileSync,
        writeJson: li.writeFile,
        writeJsonSync: li.writeFileSync
    };
});
var ui = g((DN, Vc) => {
    "use strict";
    var zy = Ie().fromCallback,
        Zr = Se(),
        Wc = require("path"),
        Gc = Ge(),
        Xy = dt().pathExists;
    function Ky(e, t, r, n) {
        typeof r == "function" && ((n = r), (r = "utf8"));
        let i = Wc.dirname(e);
        Xy(i, (s, o) => {
            if (s) return n(s);
            if (o) return Zr.writeFile(e, t, r, n);
            Gc.mkdirs(i, a => {
                if (a) return n(a);
                Zr.writeFile(e, t, r, n);
            });
        });
    }
    function Jy(e, ...t) {
        let r = Wc.dirname(e);
        if (Zr.existsSync(r)) return Zr.writeFileSync(e, ...t);
        Gc.mkdirsSync(r), Zr.writeFileSync(e, ...t);
    }
    Vc.exports = { outputFile: zy(Ky), outputFileSync: Jy };
});
var zc = g((PN, Yc) => {
    "use strict";
    var { stringify: Qy } = oi(),
        { outputFile: Zy } = ui();
    async function eE(e, t, r = {}) {
        let n = Qy(t, r);
        await Zy(e, n, r);
    }
    Yc.exports = eE;
});
var Kc = g((FN, Xc) => {
    "use strict";
    var { stringify: tE } = oi(),
        { outputFileSync: rE } = ui();
    function nE(e, t, r) {
        let n = tE(t, r);
        rE(e, n, r);
    }
    Xc.exports = nE;
});
var Qc = g((qN, Jc) => {
    "use strict";
    var iE = Ie().fromPromise,
        Ae = Hc();
    Ae.outputJson = iE(zc());
    Ae.outputJsonSync = Kc();
    Ae.outputJSON = Ae.outputJson;
    Ae.outputJSONSync = Ae.outputJsonSync;
    Ae.writeJSON = Ae.writeJson;
    Ae.writeJSONSync = Ae.writeJsonSync;
    Ae.readJSON = Ae.readJson;
    Ae.readJSONSync = Ae.readJsonSync;
    Jc.exports = Ae;
});
var nf = g((LN, rf) => {
    "use strict";
    var sE = Se(),
        Js = require("path"),
        oE = ri().copy,
        tf = Jr().remove,
        aE = Ge().mkdirp,
        lE = dt().pathExists,
        Zc = Pt();
    function uE(e, t, r, n) {
        typeof r == "function" && ((n = r), (r = {})), (r = r || {});
        let i = r.overwrite || r.clobber || !1;
        Zc.checkPaths(e, t, "move", r, (s, o) => {
            if (s) return n(s);
            let { srcStat: a, isChangingCase: l = !1 } = o;
            Zc.checkParentPaths(e, a, t, "move", d => {
                if (d) return n(d);
                if (cE(t)) return ef(e, t, i, l, n);
                aE(Js.dirname(t), c => (c ? n(c) : ef(e, t, i, l, n)));
            });
        });
    }
    function cE(e) {
        let t = Js.dirname(e);
        return Js.parse(t).root === t;
    }
    function ef(e, t, r, n, i) {
        if (n) return Ks(e, t, r, i);
        if (r) return tf(t, s => (s ? i(s) : Ks(e, t, r, i)));
        lE(t, (s, o) => (s ? i(s) : o ? i(new Error("dest already exists.")) : Ks(e, t, r, i)));
    }
    function Ks(e, t, r, n) {
        sE.rename(e, t, i => (i ? (i.code !== "EXDEV" ? n(i) : fE(e, t, r, n)) : n()));
    }
    function fE(e, t, r, n) {
        oE(e, t, { overwrite: r, errorOnExist: !0 }, s => (s ? n(s) : tf(e, n)));
    }
    rf.exports = uE;
});
var uf = g(($N, lf) => {
    "use strict";
    var of = Se(),
        Zs = require("path"),
        hE = ri().copySync,
        af = Jr().removeSync,
        dE = Ge().mkdirpSync,
        sf = Pt();
    function pE(e, t, r) {
        r = r || {};
        let n = r.overwrite || r.clobber || !1,
            { srcStat: i, isChangingCase: s = !1 } = sf.checkPathsSync(e, t, "move", r);
        return sf.checkParentPathsSync(e, i, t, "move"), mE(t) || dE(Zs.dirname(t)), gE(e, t, n, s);
    }
    function mE(e) {
        let t = Zs.dirname(e);
        return Zs.parse(t).root === t;
    }
    function gE(e, t, r, n) {
        if (n) return Qs(e, t, r);
        if (r) return af(t), Qs(e, t, r);
        if (of.existsSync(t)) throw new Error("dest already exists.");
        return Qs(e, t, r);
    }
    function Qs(e, t, r) {
        try {
            of.renameSync(e, t);
        } catch (n) {
            if (n.code !== "EXDEV") throw n;
            return wE(e, t, r);
        }
    }
    function wE(e, t, r) {
        return hE(e, t, { overwrite: r, errorOnExist: !0 }), af(e);
    }
    lf.exports = pE;
});
var ff = g((UN, cf) => {
    "use strict";
    var yE = Ie().fromCallback;
    cf.exports = { move: yE(nf()), moveSync: uf() };
});
var nt = g((kN, hf) => {
    "use strict";
    hf.exports = { ...Dt(), ...ri(), ...oc(), ...Lc(), ...Qc(), ...Ge(), ...ff(), ...ui(), ...dt(), ...Jr() };
});
var fr = g((MN, Ft) => {
    "use strict";
    function df(e) {
        return typeof e > "u" || e === null;
    }
    function EE(e) {
        return typeof e == "object" && e !== null;
    }
    function _E(e) {
        return Array.isArray(e) ? e : df(e) ? [] : [e];
    }
    function vE(e, t) {
        var r, n, i, s;
        if (t) for (s = Object.keys(t), r = 0, n = s.length; r < n; r += 1) (i = s[r]), (e[i] = t[i]);
        return e;
    }
    function SE(e, t) {
        var r = "",
            n;
        for (n = 0; n < t; n += 1) r += e;
        return r;
    }
    function AE(e) {
        return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
    }
    Ft.exports.isNothing = df;
    Ft.exports.isObject = EE;
    Ft.exports.toArray = _E;
    Ft.exports.repeat = SE;
    Ft.exports.isNegativeZero = AE;
    Ft.exports.extend = vE;
});
var hr = g((BN, mf) => {
    "use strict";
    function pf(e, t) {
        var r = "",
            n = e.reason || "(unknown reason)";
        return e.mark
            ? (e.mark.name && (r += 'in "' + e.mark.name + '" '),
              (r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")"),
              !t && e.mark.snippet && (r += "\n\n" + e.mark.snippet),
              n + " " + r)
            : n;
    }
    function en(e, t) {
        Error.call(this),
            (this.name = "YAMLException"),
            (this.reason = e),
            (this.mark = t),
            (this.message = pf(this, !1)),
            Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : (this.stack = new Error().stack || "");
    }
    en.prototype = Object.create(Error.prototype);
    en.prototype.constructor = en;
    en.prototype.toString = function (t) {
        return this.name + ": " + pf(this, t);
    };
    mf.exports = en;
});
var wf = g((jN, gf) => {
    "use strict";
    var tn = fr();
    function eo(e, t, r, n, i) {
        var s = "",
            o = "",
            a = Math.floor(i / 2) - 1;
        return (
            n - t > a && ((s = " ... "), (t = n - a + s.length)),
            r - n > a && ((o = " ..."), (r = n + a - o.length)),
            { str: s + e.slice(t, r).replace(/\t/g, "\u2192") + o, pos: n - t + s.length }
        );
    }
    function to(e, t) {
        return tn.repeat(" ", t - e.length) + e;
    }
    function CE(e, t) {
        if (((t = Object.create(t || null)), !e.buffer)) return null;
        t.maxLength || (t.maxLength = 79),
            typeof t.indent != "number" && (t.indent = 1),
            typeof t.linesBefore != "number" && (t.linesBefore = 3),
            typeof t.linesAfter != "number" && (t.linesAfter = 2);
        for (var r = /\r?\n|\r|\0/g, n = [0], i = [], s, o = -1; (s = r.exec(e.buffer)); )
            i.push(s.index), n.push(s.index + s[0].length), e.position <= s.index && o < 0 && (o = n.length - 2);
        o < 0 && (o = n.length - 1);
        var a = "",
            l,
            d,
            c = Math.min(e.line + t.linesAfter, i.length).toString().length,
            f = t.maxLength - (t.indent + c + 3);
        for (l = 1; l <= t.linesBefore && !(o - l < 0); l++)
            (d = eo(e.buffer, n[o - l], i[o - l], e.position - (n[o] - n[o - l]), f)),
                (a = tn.repeat(" ", t.indent) + to((e.line - l + 1).toString(), c) + " | " + d.str + "\n" + a);
        for (
            d = eo(e.buffer, n[o], i[o], e.position, f),
                a += tn.repeat(" ", t.indent) + to((e.line + 1).toString(), c) + " | " + d.str + "\n",
                a += tn.repeat("-", t.indent + c + 3 + d.pos) + "^\n",
                l = 1;
            l <= t.linesAfter && !(o + l >= i.length);
            l++
        )
            (d = eo(e.buffer, n[o + l], i[o + l], e.position - (n[o] - n[o + l]), f)),
                (a += tn.repeat(" ", t.indent) + to((e.line + l + 1).toString(), c) + " | " + d.str + "\n");
        return a.replace(/\n$/, "");
    }
    gf.exports = CE;
});
var we = g((HN, Ef) => {
    "use strict";
    var yf = hr(),
        TE = [
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
        bE = ["scalar", "sequence", "mapping"];
    function OE(e) {
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
    function xE(e, t) {
        if (
            ((t = t || {}),
            Object.keys(t).forEach(function (r) {
                if (TE.indexOf(r) === -1)
                    throw new yf('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
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
            (this.styleAliases = OE(t.styleAliases || null)),
            bE.indexOf(this.kind) === -1)
        )
            throw new yf('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
    }
    Ef.exports = xE;
});
var io = g((WN, vf) => {
    "use strict";
    var rn = hr(),
        ro = we();
    function _f(e, t) {
        var r = [];
        return (
            e[t].forEach(function (n) {
                var i = r.length;
                r.forEach(function (s, o) {
                    s.tag === n.tag && s.kind === n.kind && s.multi === n.multi && (i = o);
                }),
                    (r[i] = n);
            }),
            r
        );
    }
    function NE() {
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
    function no(e) {
        return this.extend(e);
    }
    no.prototype.extend = function (t) {
        var r = [],
            n = [];
        if (t instanceof ro) n.push(t);
        else if (Array.isArray(t)) n = n.concat(t);
        else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
            t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
        else
            throw new rn(
                "Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })"
            );
        r.forEach(function (s) {
            if (!(s instanceof ro))
                throw new rn("Specified list of YAML types (or a single Type object) contains a non-Type object.");
            if (s.loadKind && s.loadKind !== "scalar")
                throw new rn(
                    "There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported."
                );
            if (s.multi)
                throw new rn(
                    "There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit."
                );
        }),
            n.forEach(function (s) {
                if (!(s instanceof ro))
                    throw new rn("Specified list of YAML types (or a single Type object) contains a non-Type object.");
            });
        var i = Object.create(no.prototype);
        return (
            (i.implicit = (this.implicit || []).concat(r)),
            (i.explicit = (this.explicit || []).concat(n)),
            (i.compiledImplicit = _f(i, "implicit")),
            (i.compiledExplicit = _f(i, "explicit")),
            (i.compiledTypeMap = NE(i.compiledImplicit, i.compiledExplicit)),
            i
        );
    };
    vf.exports = no;
});
var so = g((GN, Sf) => {
    "use strict";
    var IE = we();
    Sf.exports = new IE("tag:yaml.org,2002:str", {
        kind: "scalar",
        construct: function (e) {
            return e !== null ? e : "";
        }
    });
});
var oo = g((VN, Af) => {
    "use strict";
    var RE = we();
    Af.exports = new RE("tag:yaml.org,2002:seq", {
        kind: "sequence",
        construct: function (e) {
            return e !== null ? e : [];
        }
    });
});
var ao = g((YN, Cf) => {
    "use strict";
    var DE = we();
    Cf.exports = new DE("tag:yaml.org,2002:map", {
        kind: "mapping",
        construct: function (e) {
            return e !== null ? e : {};
        }
    });
});
var lo = g((zN, Tf) => {
    "use strict";
    var PE = io();
    Tf.exports = new PE({ explicit: [so(), oo(), ao()] });
});
var uo = g((XN, bf) => {
    "use strict";
    var FE = we();
    function qE(e) {
        if (e === null) return !0;
        var t = e.length;
        return (t === 1 && e === "~") || (t === 4 && (e === "null" || e === "Null" || e === "NULL"));
    }
    function LE() {
        return null;
    }
    function $E(e) {
        return e === null;
    }
    bf.exports = new FE("tag:yaml.org,2002:null", {
        kind: "scalar",
        resolve: qE,
        construct: LE,
        predicate: $E,
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
var co = g((KN, Of) => {
    "use strict";
    var UE = we();
    function kE(e) {
        if (e === null) return !1;
        var t = e.length;
        return (
            (t === 4 && (e === "true" || e === "True" || e === "TRUE")) ||
            (t === 5 && (e === "false" || e === "False" || e === "FALSE"))
        );
    }
    function ME(e) {
        return e === "true" || e === "True" || e === "TRUE";
    }
    function BE(e) {
        return Object.prototype.toString.call(e) === "[object Boolean]";
    }
    Of.exports = new UE("tag:yaml.org,2002:bool", {
        kind: "scalar",
        resolve: kE,
        construct: ME,
        predicate: BE,
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
var fo = g((JN, xf) => {
    "use strict";
    var jE = fr(),
        HE = we();
    function WE(e) {
        return (48 <= e && e <= 57) || (65 <= e && e <= 70) || (97 <= e && e <= 102);
    }
    function GE(e) {
        return 48 <= e && e <= 55;
    }
    function VE(e) {
        return 48 <= e && e <= 57;
    }
    function YE(e) {
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
                        if (!WE(e.charCodeAt(r))) return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
            if (i === "o") {
                for (r++; r < t; r++)
                    if (((i = e[r]), i !== "_")) {
                        if (!GE(e.charCodeAt(r))) return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
        }
        if (i === "_") return !1;
        for (; r < t; r++)
            if (((i = e[r]), i !== "_")) {
                if (!VE(e.charCodeAt(r))) return !1;
                n = !0;
            }
        return !(!n || i === "_");
    }
    function zE(e) {
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
    function XE(e) {
        return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !jE.isNegativeZero(e);
    }
    xf.exports = new HE("tag:yaml.org,2002:int", {
        kind: "scalar",
        resolve: YE,
        construct: zE,
        predicate: XE,
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
var ho = g((QN, If) => {
    "use strict";
    var Nf = fr(),
        KE = we(),
        JE = new RegExp(
            "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
        );
    function QE(e) {
        return !(e === null || !JE.test(e) || e[e.length - 1] === "_");
    }
    function ZE(e) {
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
    var e_ = /^[-+]?[0-9]+e/;
    function t_(e, t) {
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
        else if (Nf.isNegativeZero(e)) return "-0.0";
        return (r = e.toString(10)), e_.test(r) ? r.replace("e", ".e") : r;
    }
    function r_(e) {
        return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || Nf.isNegativeZero(e));
    }
    If.exports = new KE("tag:yaml.org,2002:float", {
        kind: "scalar",
        resolve: QE,
        construct: ZE,
        predicate: r_,
        represent: t_,
        defaultStyle: "lowercase"
    });
});
var po = g((ZN, Rf) => {
    "use strict";
    Rf.exports = lo().extend({ implicit: [uo(), co(), fo(), ho()] });
});
var mo = g((eI, Df) => {
    "use strict";
    Df.exports = po();
});
var go = g((tI, qf) => {
    "use strict";
    var n_ = we(),
        Pf = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),
        Ff = new RegExp(
            "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
        );
    function i_(e) {
        return e === null ? !1 : Pf.exec(e) !== null || Ff.exec(e) !== null;
    }
    function s_(e) {
        var t,
            r,
            n,
            i,
            s,
            o,
            a,
            l = 0,
            d = null,
            c,
            f,
            m;
        if (((t = Pf.exec(e)), t === null && (t = Ff.exec(e)), t === null)) throw new Error("Date resolve error");
        if (((r = +t[1]), (n = +t[2] - 1), (i = +t[3]), !t[4])) return new Date(Date.UTC(r, n, i));
        if (((s = +t[4]), (o = +t[5]), (a = +t[6]), t[7])) {
            for (l = t[7].slice(0, 3); l.length < 3; ) l += "0";
            l = +l;
        }
        return (
            t[9] && ((c = +t[10]), (f = +(t[11] || 0)), (d = (c * 60 + f) * 6e4), t[9] === "-" && (d = -d)),
            (m = new Date(Date.UTC(r, n, i, s, o, a, l))),
            d && m.setTime(m.getTime() - d),
            m
        );
    }
    function o_(e) {
        return e.toISOString();
    }
    qf.exports = new n_("tag:yaml.org,2002:timestamp", {
        kind: "scalar",
        resolve: i_,
        construct: s_,
        instanceOf: Date,
        represent: o_
    });
});
var wo = g((rI, Lf) => {
    "use strict";
    var a_ = we();
    function l_(e) {
        return e === "<<" || e === null;
    }
    Lf.exports = new a_("tag:yaml.org,2002:merge", { kind: "scalar", resolve: l_ });
});
var Eo = g((nI, $f) => {
    "use strict";
    var u_ = we(),
        yo = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function c_(e) {
        if (e === null) return !1;
        var t,
            r,
            n = 0,
            i = e.length,
            s = yo;
        for (r = 0; r < i; r++)
            if (((t = s.indexOf(e.charAt(r))), !(t > 64))) {
                if (t < 0) return !1;
                n += 6;
            }
        return n % 8 === 0;
    }
    function f_(e) {
        var t,
            r,
            n = e.replace(/[\r\n=]/g, ""),
            i = n.length,
            s = yo,
            o = 0,
            a = [];
        for (t = 0; t < i; t++)
            t % 4 === 0 && t && (a.push((o >> 16) & 255), a.push((o >> 8) & 255), a.push(o & 255)),
                (o = (o << 6) | s.indexOf(n.charAt(t)));
        return (
            (r = (i % 4) * 6),
            r === 0
                ? (a.push((o >> 16) & 255), a.push((o >> 8) & 255), a.push(o & 255))
                : r === 18
                ? (a.push((o >> 10) & 255), a.push((o >> 2) & 255))
                : r === 12 && a.push((o >> 4) & 255),
            new Uint8Array(a)
        );
    }
    function h_(e) {
        var t = "",
            r = 0,
            n,
            i,
            s = e.length,
            o = yo;
        for (n = 0; n < s; n++)
            n % 3 === 0 && n && ((t += o[(r >> 18) & 63]), (t += o[(r >> 12) & 63]), (t += o[(r >> 6) & 63]), (t += o[r & 63])),
                (r = (r << 8) + e[n]);
        return (
            (i = s % 3),
            i === 0
                ? ((t += o[(r >> 18) & 63]), (t += o[(r >> 12) & 63]), (t += o[(r >> 6) & 63]), (t += o[r & 63]))
                : i === 2
                ? ((t += o[(r >> 10) & 63]), (t += o[(r >> 4) & 63]), (t += o[(r << 2) & 63]), (t += o[64]))
                : i === 1 && ((t += o[(r >> 2) & 63]), (t += o[(r << 4) & 63]), (t += o[64]), (t += o[64])),
            t
        );
    }
    function d_(e) {
        return Object.prototype.toString.call(e) === "[object Uint8Array]";
    }
    $f.exports = new u_("tag:yaml.org,2002:binary", { kind: "scalar", resolve: c_, construct: f_, predicate: d_, represent: h_ });
});
var _o = g((iI, Uf) => {
    "use strict";
    var p_ = we(),
        m_ = Object.prototype.hasOwnProperty,
        g_ = Object.prototype.toString;
    function w_(e) {
        if (e === null) return !0;
        var t = [],
            r,
            n,
            i,
            s,
            o,
            a = e;
        for (r = 0, n = a.length; r < n; r += 1) {
            if (((i = a[r]), (o = !1), g_.call(i) !== "[object Object]")) return !1;
            for (s in i)
                if (m_.call(i, s))
                    if (!o) o = !0;
                    else return !1;
            if (!o) return !1;
            if (t.indexOf(s) === -1) t.push(s);
            else return !1;
        }
        return !0;
    }
    function y_(e) {
        return e !== null ? e : [];
    }
    Uf.exports = new p_("tag:yaml.org,2002:omap", { kind: "sequence", resolve: w_, construct: y_ });
});
var vo = g((sI, kf) => {
    "use strict";
    var E_ = we(),
        __ = Object.prototype.toString;
    function v_(e) {
        if (e === null) return !0;
        var t,
            r,
            n,
            i,
            s,
            o = e;
        for (s = new Array(o.length), t = 0, r = o.length; t < r; t += 1) {
            if (((n = o[t]), __.call(n) !== "[object Object]" || ((i = Object.keys(n)), i.length !== 1))) return !1;
            s[t] = [i[0], n[i[0]]];
        }
        return !0;
    }
    function S_(e) {
        if (e === null) return [];
        var t,
            r,
            n,
            i,
            s,
            o = e;
        for (s = new Array(o.length), t = 0, r = o.length; t < r; t += 1)
            (n = o[t]), (i = Object.keys(n)), (s[t] = [i[0], n[i[0]]]);
        return s;
    }
    kf.exports = new E_("tag:yaml.org,2002:pairs", { kind: "sequence", resolve: v_, construct: S_ });
});
var So = g((oI, Mf) => {
    "use strict";
    var A_ = we(),
        C_ = Object.prototype.hasOwnProperty;
    function T_(e) {
        if (e === null) return !0;
        var t,
            r = e;
        for (t in r) if (C_.call(r, t) && r[t] !== null) return !1;
        return !0;
    }
    function b_(e) {
        return e !== null ? e : {};
    }
    Mf.exports = new A_("tag:yaml.org,2002:set", { kind: "mapping", resolve: T_, construct: b_ });
});
var ci = g((aI, Bf) => {
    "use strict";
    Bf.exports = mo().extend({ implicit: [go(), wo()], explicit: [Eo(), _o(), vo(), So()] });
});
var nh = g((lI, bo) => {
    "use strict";
    var Lt = fr(),
        zf = hr(),
        O_ = wf(),
        x_ = ci(),
        yt = Object.prototype.hasOwnProperty,
        fi = 1,
        Xf = 2,
        Kf = 3,
        hi = 4,
        Ao = 1,
        N_ = 2,
        jf = 3,
        I_ =
            /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
        R_ = /[\x85\u2028\u2029]/,
        D_ = /[,\[\]\{\}]/,
        Jf = /^(?:!|!!|![a-z\-]+!)$/i,
        Qf = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function Hf(e) {
        return Object.prototype.toString.call(e);
    }
    function Ke(e) {
        return e === 10 || e === 13;
    }
    function $t(e) {
        return e === 9 || e === 32;
    }
    function Pe(e) {
        return e === 9 || e === 32 || e === 10 || e === 13;
    }
    function dr(e) {
        return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
    }
    function P_(e) {
        var t;
        return 48 <= e && e <= 57 ? e - 48 : ((t = e | 32), 97 <= t && t <= 102 ? t - 97 + 10 : -1);
    }
    function F_(e) {
        return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
    }
    function q_(e) {
        return 48 <= e && e <= 57 ? e - 48 : -1;
    }
    function Wf(e) {
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
    function L_(e) {
        return e <= 65535
            ? String.fromCharCode(e)
            : String.fromCharCode(((e - 65536) >> 10) + 55296, ((e - 65536) & 1023) + 56320);
    }
    var Zf = new Array(256),
        eh = new Array(256);
    for (qt = 0; qt < 256; qt++) (Zf[qt] = Wf(qt) ? 1 : 0), (eh[qt] = Wf(qt));
    var qt;
    function $_(e, t) {
        (this.input = e),
            (this.filename = t.filename || null),
            (this.schema = t.schema || x_),
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
    function th(e, t) {
        var r = {
            name: e.filename,
            buffer: e.input.slice(0, -1),
            position: e.position,
            line: e.line,
            column: e.position - e.lineStart
        };
        return (r.snippet = O_(r)), new zf(t, r);
    }
    function N(e, t) {
        throw th(e, t);
    }
    function di(e, t) {
        e.onWarning && e.onWarning.call(null, th(e, t));
    }
    var Gf = {
        YAML: function (t, r, n) {
            var i, s, o;
            t.version !== null && N(t, "duplication of %YAML directive"),
                n.length !== 1 && N(t, "YAML directive accepts exactly one argument"),
                (i = /^([0-9]+)\.([0-9]+)$/.exec(n[0])),
                i === null && N(t, "ill-formed argument of the YAML directive"),
                (s = parseInt(i[1], 10)),
                (o = parseInt(i[2], 10)),
                s !== 1 && N(t, "unacceptable YAML version of the document"),
                (t.version = n[0]),
                (t.checkLineBreaks = o < 2),
                o !== 1 && o !== 2 && di(t, "unsupported YAML version of the document");
        },
        TAG: function (t, r, n) {
            var i, s;
            n.length !== 2 && N(t, "TAG directive accepts exactly two arguments"),
                (i = n[0]),
                (s = n[1]),
                Jf.test(i) || N(t, "ill-formed tag handle (first argument) of the TAG directive"),
                yt.call(t.tagMap, i) && N(t, 'there is a previously declared suffix for "' + i + '" tag handle'),
                Qf.test(s) || N(t, "ill-formed tag prefix (second argument) of the TAG directive");
            try {
                s = decodeURIComponent(s);
            } catch {
                N(t, "tag prefix is malformed: " + s);
            }
            t.tagMap[i] = s;
        }
    };
    function wt(e, t, r, n) {
        var i, s, o, a;
        if (t < r) {
            if (((a = e.input.slice(t, r)), n))
                for (i = 0, s = a.length; i < s; i += 1)
                    (o = a.charCodeAt(i)), o === 9 || (32 <= o && o <= 1114111) || N(e, "expected valid JSON character");
            else I_.test(a) && N(e, "the stream contains non-printable characters");
            e.result += a;
        }
    }
    function Vf(e, t, r, n) {
        var i, s, o, a;
        for (
            Lt.isObject(r) || N(e, "cannot merge mappings; the provided source object is unacceptable"),
                i = Object.keys(r),
                o = 0,
                a = i.length;
            o < a;
            o += 1
        )
            (s = i[o]), yt.call(t, s) || ((t[s] = r[s]), (n[s] = !0));
    }
    function pr(e, t, r, n, i, s, o, a, l) {
        var d, c;
        if (Array.isArray(i))
            for (i = Array.prototype.slice.call(i), d = 0, c = i.length; d < c; d += 1)
                Array.isArray(i[d]) && N(e, "nested arrays are not supported inside keys"),
                    typeof i == "object" && Hf(i[d]) === "[object Object]" && (i[d] = "[object Object]");
        if (
            (typeof i == "object" && Hf(i) === "[object Object]" && (i = "[object Object]"),
            (i = String(i)),
            t === null && (t = {}),
            n === "tag:yaml.org,2002:merge")
        )
            if (Array.isArray(s)) for (d = 0, c = s.length; d < c; d += 1) Vf(e, t, s[d], r);
            else Vf(e, t, s, r);
        else
            !e.json &&
                !yt.call(r, i) &&
                yt.call(t, i) &&
                ((e.line = o || e.line),
                (e.lineStart = a || e.lineStart),
                (e.position = l || e.position),
                N(e, "duplicated mapping key")),
                i === "__proto__"
                    ? Object.defineProperty(t, i, { configurable: !0, enumerable: !0, writable: !0, value: s })
                    : (t[i] = s),
                delete r[i];
        return t;
    }
    function Co(e) {
        var t;
        (t = e.input.charCodeAt(e.position)),
            t === 10
                ? e.position++
                : t === 13
                ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++)
                : N(e, "a line break is expected"),
            (e.line += 1),
            (e.lineStart = e.position),
            (e.firstTabInLine = -1);
    }
    function se(e, t, r) {
        for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
            for (; $t(i); )
                i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), (i = e.input.charCodeAt(++e.position));
            if (t && i === 35)
                do i = e.input.charCodeAt(++e.position);
                while (i !== 10 && i !== 13 && i !== 0);
            if (Ke(i))
                for (Co(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
                    e.lineIndent++, (i = e.input.charCodeAt(++e.position));
            else break;
        }
        return r !== -1 && n !== 0 && e.lineIndent < r && di(e, "deficient indentation"), n;
    }
    function pi(e) {
        var t = e.position,
            r;
        return (
            (r = e.input.charCodeAt(t)),
            !!(
                (r === 45 || r === 46) &&
                r === e.input.charCodeAt(t + 1) &&
                r === e.input.charCodeAt(t + 2) &&
                ((t += 3), (r = e.input.charCodeAt(t)), r === 0 || Pe(r))
            )
        );
    }
    function To(e, t) {
        t === 1 ? (e.result += " ") : t > 1 && (e.result += Lt.repeat("\n", t - 1));
    }
    function U_(e, t, r) {
        var n,
            i,
            s,
            o,
            a,
            l,
            d,
            c,
            f = e.kind,
            m = e.result,
            p;
        if (
            ((p = e.input.charCodeAt(e.position)),
            Pe(p) ||
                dr(p) ||
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
                ((p === 63 || p === 45) && ((i = e.input.charCodeAt(e.position + 1)), Pe(i) || (r && dr(i)))))
        )
            return !1;
        for (e.kind = "scalar", e.result = "", s = o = e.position, a = !1; p !== 0; ) {
            if (p === 58) {
                if (((i = e.input.charCodeAt(e.position + 1)), Pe(i) || (r && dr(i)))) break;
            } else if (p === 35) {
                if (((n = e.input.charCodeAt(e.position - 1)), Pe(n))) break;
            } else {
                if ((e.position === e.lineStart && pi(e)) || (r && dr(p))) break;
                if (Ke(p))
                    if (((l = e.line), (d = e.lineStart), (c = e.lineIndent), se(e, !1, -1), e.lineIndent >= t)) {
                        (a = !0), (p = e.input.charCodeAt(e.position));
                        continue;
                    } else {
                        (e.position = o), (e.line = l), (e.lineStart = d), (e.lineIndent = c);
                        break;
                    }
            }
            a && (wt(e, s, o, !1), To(e, e.line - l), (s = o = e.position), (a = !1)),
                $t(p) || (o = e.position + 1),
                (p = e.input.charCodeAt(++e.position));
        }
        return wt(e, s, o, !1), e.result ? !0 : ((e.kind = f), (e.result = m), !1);
    }
    function k_(e, t) {
        var r, n, i;
        if (((r = e.input.charCodeAt(e.position)), r !== 39)) return !1;
        for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
            if (r === 39)
                if ((wt(e, n, e.position, !0), (r = e.input.charCodeAt(++e.position)), r === 39))
                    (n = e.position), e.position++, (i = e.position);
                else return !0;
            else
                Ke(r)
                    ? (wt(e, n, i, !0), To(e, se(e, !1, t)), (n = i = e.position))
                    : e.position === e.lineStart && pi(e)
                    ? N(e, "unexpected end of the document within a single quoted scalar")
                    : (e.position++, (i = e.position));
        N(e, "unexpected end of the stream within a single quoted scalar");
    }
    function M_(e, t) {
        var r, n, i, s, o, a;
        if (((a = e.input.charCodeAt(e.position)), a !== 34)) return !1;
        for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (a = e.input.charCodeAt(e.position)) !== 0; ) {
            if (a === 34) return wt(e, r, e.position, !0), e.position++, !0;
            if (a === 92) {
                if ((wt(e, r, e.position, !0), (a = e.input.charCodeAt(++e.position)), Ke(a))) se(e, !1, t);
                else if (a < 256 && Zf[a]) (e.result += eh[a]), e.position++;
                else if ((o = F_(a)) > 0) {
                    for (i = o, s = 0; i > 0; i--)
                        (a = e.input.charCodeAt(++e.position)),
                            (o = P_(a)) >= 0 ? (s = (s << 4) + o) : N(e, "expected hexadecimal character");
                    (e.result += L_(s)), e.position++;
                } else N(e, "unknown escape sequence");
                r = n = e.position;
            } else
                Ke(a)
                    ? (wt(e, r, n, !0), To(e, se(e, !1, t)), (r = n = e.position))
                    : e.position === e.lineStart && pi(e)
                    ? N(e, "unexpected end of the document within a double quoted scalar")
                    : (e.position++, (n = e.position));
        }
        N(e, "unexpected end of the stream within a double quoted scalar");
    }
    function B_(e, t) {
        var r = !0,
            n,
            i,
            s,
            o = e.tag,
            a,
            l = e.anchor,
            d,
            c,
            f,
            m,
            p,
            _ = Object.create(null),
            v,
            S,
            T,
            C;
        if (((C = e.input.charCodeAt(e.position)), C === 91)) (c = 93), (p = !1), (a = []);
        else if (C === 123) (c = 125), (p = !0), (a = {});
        else return !1;
        for (e.anchor !== null && (e.anchorMap[e.anchor] = a), C = e.input.charCodeAt(++e.position); C !== 0; ) {
            if ((se(e, !0, t), (C = e.input.charCodeAt(e.position)), C === c))
                return e.position++, (e.tag = o), (e.anchor = l), (e.kind = p ? "mapping" : "sequence"), (e.result = a), !0;
            r
                ? C === 44 && N(e, "expected the node content, but found ','")
                : N(e, "missed comma between flow collection entries"),
                (S = v = T = null),
                (f = m = !1),
                C === 63 && ((d = e.input.charCodeAt(e.position + 1)), Pe(d) && ((f = m = !0), e.position++, se(e, !0, t))),
                (n = e.line),
                (i = e.lineStart),
                (s = e.position),
                mr(e, t, fi, !1, !0),
                (S = e.tag),
                (v = e.result),
                se(e, !0, t),
                (C = e.input.charCodeAt(e.position)),
                (m || e.line === n) &&
                    C === 58 &&
                    ((f = !0), (C = e.input.charCodeAt(++e.position)), se(e, !0, t), mr(e, t, fi, !1, !0), (T = e.result)),
                p ? pr(e, a, _, S, v, T, n, i, s) : f ? a.push(pr(e, null, _, S, v, T, n, i, s)) : a.push(v),
                se(e, !0, t),
                (C = e.input.charCodeAt(e.position)),
                C === 44 ? ((r = !0), (C = e.input.charCodeAt(++e.position))) : (r = !1);
        }
        N(e, "unexpected end of the stream within a flow collection");
    }
    function j_(e, t) {
        var r,
            n,
            i = Ao,
            s = !1,
            o = !1,
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
                Ao === i ? (i = f === 43 ? jf : N_) : N(e, "repeat of a chomping mode identifier");
            else if ((c = q_(f)) >= 0)
                c === 0
                    ? N(e, "bad explicit indentation width of a block scalar; it cannot be less than one")
                    : o
                    ? N(e, "repeat of an indentation width identifier")
                    : ((a = t + c - 1), (o = !0));
            else break;
        if ($t(f)) {
            do f = e.input.charCodeAt(++e.position);
            while ($t(f));
            if (f === 35)
                do f = e.input.charCodeAt(++e.position);
                while (!Ke(f) && f !== 0);
        }
        for (; f !== 0; ) {
            for (Co(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!o || e.lineIndent < a) && f === 32; )
                e.lineIndent++, (f = e.input.charCodeAt(++e.position));
            if ((!o && e.lineIndent > a && (a = e.lineIndent), Ke(f))) {
                l++;
                continue;
            }
            if (e.lineIndent < a) {
                i === jf ? (e.result += Lt.repeat("\n", s ? 1 + l : l)) : i === Ao && s && (e.result += "\n");
                break;
            }
            for (
                n
                    ? $t(f)
                        ? ((d = !0), (e.result += Lt.repeat("\n", s ? 1 + l : l)))
                        : d
                        ? ((d = !1), (e.result += Lt.repeat("\n", l + 1)))
                        : l === 0
                        ? s && (e.result += " ")
                        : (e.result += Lt.repeat("\n", l))
                    : (e.result += Lt.repeat("\n", s ? 1 + l : l)),
                    s = !0,
                    o = !0,
                    l = 0,
                    r = e.position;
                !Ke(f) && f !== 0;

            )
                f = e.input.charCodeAt(++e.position);
            wt(e, r, e.position, !1);
        }
        return !0;
    }
    function Yf(e, t) {
        var r,
            n = e.tag,
            i = e.anchor,
            s = [],
            o,
            a = !1,
            l;
        if (e.firstTabInLine !== -1) return !1;
        for (
            e.anchor !== null && (e.anchorMap[e.anchor] = s), l = e.input.charCodeAt(e.position);
            l !== 0 &&
            (e.firstTabInLine !== -1 && ((e.position = e.firstTabInLine), N(e, "tab characters must not be used in indentation")),
            !(l !== 45 || ((o = e.input.charCodeAt(e.position + 1)), !Pe(o))));

        ) {
            if (((a = !0), e.position++, se(e, !0, -1) && e.lineIndent <= t)) {
                s.push(null), (l = e.input.charCodeAt(e.position));
                continue;
            }
            if (
                ((r = e.line),
                mr(e, t, Kf, !1, !0),
                s.push(e.result),
                se(e, !0, -1),
                (l = e.input.charCodeAt(e.position)),
                (e.line === r || e.lineIndent > t) && l !== 0)
            )
                N(e, "bad indentation of a sequence entry");
            else if (e.lineIndent < t) break;
        }
        return a ? ((e.tag = n), (e.anchor = i), (e.kind = "sequence"), (e.result = s), !0) : !1;
    }
    function H_(e, t, r) {
        var n,
            i,
            s,
            o,
            a,
            l,
            d = e.tag,
            c = e.anchor,
            f = {},
            m = Object.create(null),
            p = null,
            _ = null,
            v = null,
            S = !1,
            T = !1,
            C;
        if (e.firstTabInLine !== -1) return !1;
        for (e.anchor !== null && (e.anchorMap[e.anchor] = f), C = e.input.charCodeAt(e.position); C !== 0; ) {
            if (
                (!S &&
                    e.firstTabInLine !== -1 &&
                    ((e.position = e.firstTabInLine), N(e, "tab characters must not be used in indentation")),
                (n = e.input.charCodeAt(e.position + 1)),
                (s = e.line),
                (C === 63 || C === 58) && Pe(n))
            )
                C === 63
                    ? (S && (pr(e, f, m, p, _, null, o, a, l), (p = _ = v = null)), (T = !0), (S = !0), (i = !0))
                    : S
                    ? ((S = !1), (i = !0))
                    : N(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),
                    (e.position += 1),
                    (C = n);
            else {
                if (((o = e.line), (a = e.lineStart), (l = e.position), !mr(e, r, Xf, !1, !0))) break;
                if (e.line === s) {
                    for (C = e.input.charCodeAt(e.position); $t(C); ) C = e.input.charCodeAt(++e.position);
                    if (C === 58)
                        (C = e.input.charCodeAt(++e.position)),
                            Pe(C) ||
                                N(e, "a whitespace character is expected after the key-value separator within a block mapping"),
                            S && (pr(e, f, m, p, _, null, o, a, l), (p = _ = v = null)),
                            (T = !0),
                            (S = !1),
                            (i = !1),
                            (p = e.tag),
                            (_ = e.result);
                    else if (T) N(e, "can not read an implicit mapping pair; a colon is missed");
                    else return (e.tag = d), (e.anchor = c), !0;
                } else if (T) N(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
                else return (e.tag = d), (e.anchor = c), !0;
            }
            if (
                ((e.line === s || e.lineIndent > t) &&
                    (S && ((o = e.line), (a = e.lineStart), (l = e.position)),
                    mr(e, t, hi, !0, i) && (S ? (_ = e.result) : (v = e.result)),
                    S || (pr(e, f, m, p, _, v, o, a, l), (p = _ = v = null)),
                    se(e, !0, -1),
                    (C = e.input.charCodeAt(e.position))),
                (e.line === s || e.lineIndent > t) && C !== 0)
            )
                N(e, "bad indentation of a mapping entry");
            else if (e.lineIndent < t) break;
        }
        return S && pr(e, f, m, p, _, null, o, a, l), T && ((e.tag = d), (e.anchor = c), (e.kind = "mapping"), (e.result = f)), T;
    }
    function W_(e) {
        var t,
            r = !1,
            n = !1,
            i,
            s,
            o;
        if (((o = e.input.charCodeAt(e.position)), o !== 33)) return !1;
        if (
            (e.tag !== null && N(e, "duplication of a tag property"),
            (o = e.input.charCodeAt(++e.position)),
            o === 60
                ? ((r = !0), (o = e.input.charCodeAt(++e.position)))
                : o === 33
                ? ((n = !0), (i = "!!"), (o = e.input.charCodeAt(++e.position)))
                : (i = "!"),
            (t = e.position),
            r)
        ) {
            do o = e.input.charCodeAt(++e.position);
            while (o !== 0 && o !== 62);
            e.position < e.length
                ? ((s = e.input.slice(t, e.position)), (o = e.input.charCodeAt(++e.position)))
                : N(e, "unexpected end of the stream within a verbatim tag");
        } else {
            for (; o !== 0 && !Pe(o); )
                o === 33 &&
                    (n
                        ? N(e, "tag suffix cannot contain exclamation marks")
                        : ((i = e.input.slice(t - 1, e.position + 1)),
                          Jf.test(i) || N(e, "named tag handle cannot contain such characters"),
                          (n = !0),
                          (t = e.position + 1))),
                    (o = e.input.charCodeAt(++e.position));
            (s = e.input.slice(t, e.position)), D_.test(s) && N(e, "tag suffix cannot contain flow indicator characters");
        }
        s && !Qf.test(s) && N(e, "tag name cannot contain such characters: " + s);
        try {
            s = decodeURIComponent(s);
        } catch {
            N(e, "tag name is malformed: " + s);
        }
        return (
            r
                ? (e.tag = s)
                : yt.call(e.tagMap, i)
                ? (e.tag = e.tagMap[i] + s)
                : i === "!"
                ? (e.tag = "!" + s)
                : i === "!!"
                ? (e.tag = "tag:yaml.org,2002:" + s)
                : N(e, 'undeclared tag handle "' + i + '"'),
            !0
        );
    }
    function G_(e) {
        var t, r;
        if (((r = e.input.charCodeAt(e.position)), r !== 38)) return !1;
        for (
            e.anchor !== null && N(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position;
            r !== 0 && !Pe(r) && !dr(r);

        )
            r = e.input.charCodeAt(++e.position);
        return (
            e.position === t && N(e, "name of an anchor node must contain at least one character"),
            (e.anchor = e.input.slice(t, e.position)),
            !0
        );
    }
    function V_(e) {
        var t, r, n;
        if (((n = e.input.charCodeAt(e.position)), n !== 42)) return !1;
        for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !Pe(n) && !dr(n); )
            n = e.input.charCodeAt(++e.position);
        return (
            e.position === t && N(e, "name of an alias node must contain at least one character"),
            (r = e.input.slice(t, e.position)),
            yt.call(e.anchorMap, r) || N(e, 'unidentified alias "' + r + '"'),
            (e.result = e.anchorMap[r]),
            se(e, !0, -1),
            !0
        );
    }
    function mr(e, t, r, n, i) {
        var s,
            o,
            a,
            l = 1,
            d = !1,
            c = !1,
            f,
            m,
            p,
            _,
            v,
            S;
        if (
            (e.listener !== null && e.listener("open", e),
            (e.tag = null),
            (e.anchor = null),
            (e.kind = null),
            (e.result = null),
            (s = o = a = hi === r || Kf === r),
            n &&
                se(e, !0, -1) &&
                ((d = !0), e.lineIndent > t ? (l = 1) : e.lineIndent === t ? (l = 0) : e.lineIndent < t && (l = -1)),
            l === 1)
        )
            for (; W_(e) || G_(e); )
                se(e, !0, -1)
                    ? ((d = !0),
                      (a = s),
                      e.lineIndent > t ? (l = 1) : e.lineIndent === t ? (l = 0) : e.lineIndent < t && (l = -1))
                    : (a = !1);
        if (
            (a && (a = d || i),
            (l === 1 || hi === r) &&
                (fi === r || Xf === r ? (v = t) : (v = t + 1),
                (S = e.position - e.lineStart),
                l === 1
                    ? (a && (Yf(e, S) || H_(e, S, v))) || B_(e, v)
                        ? (c = !0)
                        : ((o && j_(e, v)) || k_(e, v) || M_(e, v)
                              ? (c = !0)
                              : V_(e)
                              ? ((c = !0),
                                (e.tag !== null || e.anchor !== null) && N(e, "alias node should not have any properties"))
                              : U_(e, v, fi === r) && ((c = !0), e.tag === null && (e.tag = "?")),
                          e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
                    : l === 0 && (c = a && Yf(e, S))),
            e.tag === null)
        )
            e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        else if (e.tag === "?") {
            for (
                e.result !== null &&
                    e.kind !== "scalar" &&
                    N(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'),
                    f = 0,
                    m = e.implicitTypes.length;
                f < m;
                f += 1
            )
                if (((_ = e.implicitTypes[f]), _.resolve(e.result))) {
                    (e.result = _.construct(e.result)), (e.tag = _.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
                    break;
                }
        } else if (e.tag !== "!") {
            if (yt.call(e.typeMap[e.kind || "fallback"], e.tag)) _ = e.typeMap[e.kind || "fallback"][e.tag];
            else
                for (_ = null, p = e.typeMap.multi[e.kind || "fallback"], f = 0, m = p.length; f < m; f += 1)
                    if (e.tag.slice(0, p[f].tag.length) === p[f].tag) {
                        _ = p[f];
                        break;
                    }
            _ || N(e, "unknown tag !<" + e.tag + ">"),
                e.result !== null &&
                    _.kind !== e.kind &&
                    N(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + _.kind + '", not "' + e.kind + '"'),
                _.resolve(e.result, e.tag)
                    ? ((e.result = _.construct(e.result, e.tag)), e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
                    : N(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
        }
        return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || c;
    }
    function Y_(e) {
        var t = e.position,
            r,
            n,
            i,
            s = !1,
            o;
        for (
            e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = Object.create(null), e.anchorMap = Object.create(null);
            (o = e.input.charCodeAt(e.position)) !== 0 &&
            (se(e, !0, -1), (o = e.input.charCodeAt(e.position)), !(e.lineIndent > 0 || o !== 37));

        ) {
            for (s = !0, o = e.input.charCodeAt(++e.position), r = e.position; o !== 0 && !Pe(o); )
                o = e.input.charCodeAt(++e.position);
            for (
                n = e.input.slice(r, e.position),
                    i = [],
                    n.length < 1 && N(e, "directive name must not be less than one character in length");
                o !== 0;

            ) {
                for (; $t(o); ) o = e.input.charCodeAt(++e.position);
                if (o === 35) {
                    do o = e.input.charCodeAt(++e.position);
                    while (o !== 0 && !Ke(o));
                    break;
                }
                if (Ke(o)) break;
                for (r = e.position; o !== 0 && !Pe(o); ) o = e.input.charCodeAt(++e.position);
                i.push(e.input.slice(r, e.position));
            }
            o !== 0 && Co(e), yt.call(Gf, n) ? Gf[n](e, n, i) : di(e, 'unknown document directive "' + n + '"');
        }
        if (
            (se(e, !0, -1),
            e.lineIndent === 0 &&
            e.input.charCodeAt(e.position) === 45 &&
            e.input.charCodeAt(e.position + 1) === 45 &&
            e.input.charCodeAt(e.position + 2) === 45
                ? ((e.position += 3), se(e, !0, -1))
                : s && N(e, "directives end mark is expected"),
            mr(e, e.lineIndent - 1, hi, !1, !0),
            se(e, !0, -1),
            e.checkLineBreaks &&
                R_.test(e.input.slice(t, e.position)) &&
                di(e, "non-ASCII line breaks are interpreted as content"),
            e.documents.push(e.result),
            e.position === e.lineStart && pi(e))
        ) {
            e.input.charCodeAt(e.position) === 46 && ((e.position += 3), se(e, !0, -1));
            return;
        }
        if (e.position < e.length - 1) N(e, "end of the stream or a document separator is expected");
        else return;
    }
    function rh(e, t) {
        (e = String(e)),
            (t = t || {}),
            e.length !== 0 &&
                (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += "\n"),
                e.charCodeAt(0) === 65279 && (e = e.slice(1)));
        var r = new $_(e, t),
            n = e.indexOf("\0");
        for (
            n !== -1 && ((r.position = n), N(r, "null byte is not allowed in input")), r.input += "\0";
            r.input.charCodeAt(r.position) === 32;

        )
            (r.lineIndent += 1), (r.position += 1);
        for (; r.position < r.length - 1; ) Y_(r);
        return r.documents;
    }
    function z_(e, t, r) {
        t !== null && typeof t == "object" && typeof r > "u" && ((r = t), (t = null));
        var n = rh(e, r);
        if (typeof t != "function") return n;
        for (var i = 0, s = n.length; i < s; i += 1) t(n[i]);
    }
    function X_(e, t) {
        var r = rh(e, t);
        if (r.length !== 0) {
            if (r.length === 1) return r[0];
            throw new zf("expected a single document in the stream, but found more");
        }
    }
    bo.exports.loadAll = z_;
    bo.exports.load = X_;
});
var Ch = g((uI, Ah) => {
    "use strict";
    var wi = fr(),
        ln = hr(),
        K_ = ci(),
        hh = Object.prototype.toString,
        dh = Object.prototype.hasOwnProperty,
        Ro = 65279,
        J_ = 9,
        sn = 10,
        Q_ = 13,
        Z_ = 32,
        ev = 33,
        tv = 34,
        Oo = 35,
        rv = 37,
        nv = 38,
        iv = 39,
        sv = 42,
        ph = 44,
        ov = 45,
        mi = 58,
        av = 61,
        lv = 62,
        uv = 63,
        cv = 64,
        mh = 91,
        gh = 93,
        fv = 96,
        wh = 123,
        hv = 124,
        yh = 125,
        ye = {};
    ye[0] = "\\0";
    ye[7] = "\\a";
    ye[8] = "\\b";
    ye[9] = "\\t";
    ye[10] = "\\n";
    ye[11] = "\\v";
    ye[12] = "\\f";
    ye[13] = "\\r";
    ye[27] = "\\e";
    ye[34] = '\\"';
    ye[92] = "\\\\";
    ye[133] = "\\N";
    ye[160] = "\\_";
    ye[8232] = "\\L";
    ye[8233] = "\\P";
    var dv = ["y", "Y", "yes", "Yes", "YES", "on", "On", "ON", "n", "N", "no", "No", "NO", "off", "Off", "OFF"],
        pv = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
    function mv(e, t) {
        var r, n, i, s, o, a, l;
        if (t === null) return {};
        for (r = {}, n = Object.keys(t), i = 0, s = n.length; i < s; i += 1)
            (o = n[i]),
                (a = String(t[o])),
                o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2)),
                (l = e.compiledTypeMap.fallback[o]),
                l && dh.call(l.styleAliases, a) && (a = l.styleAliases[a]),
                (r[o] = a);
        return r;
    }
    function gv(e) {
        var t, r, n;
        if (((t = e.toString(16).toUpperCase()), e <= 255)) (r = "x"), (n = 2);
        else if (e <= 65535) (r = "u"), (n = 4);
        else if (e <= 4294967295) (r = "U"), (n = 8);
        else throw new ln("code point within a string may not be greater than 0xFFFFFFFF");
        return "\\" + r + wi.repeat("0", n - t.length) + t;
    }
    var wv = 1,
        on = 2;
    function yv(e) {
        (this.schema = e.schema || K_),
            (this.indent = Math.max(1, e.indent || 2)),
            (this.noArrayIndent = e.noArrayIndent || !1),
            (this.skipInvalid = e.skipInvalid || !1),
            (this.flowLevel = wi.isNothing(e.flowLevel) ? -1 : e.flowLevel),
            (this.styleMap = mv(this.schema, e.styles || null)),
            (this.sortKeys = e.sortKeys || !1),
            (this.lineWidth = e.lineWidth || 80),
            (this.noRefs = e.noRefs || !1),
            (this.noCompatMode = e.noCompatMode || !1),
            (this.condenseFlow = e.condenseFlow || !1),
            (this.quotingType = e.quotingType === '"' ? on : wv),
            (this.forceQuotes = e.forceQuotes || !1),
            (this.replacer = typeof e.replacer == "function" ? e.replacer : null),
            (this.implicitTypes = this.schema.compiledImplicit),
            (this.explicitTypes = this.schema.compiledExplicit),
            (this.tag = null),
            (this.result = ""),
            (this.duplicates = []),
            (this.usedDuplicates = null);
    }
    function ih(e, t) {
        for (var r = wi.repeat(" ", t), n = 0, i = -1, s = "", o, a = e.length; n < a; )
            (i = e.indexOf("\n", n)),
                i === -1 ? ((o = e.slice(n)), (n = a)) : ((o = e.slice(n, i + 1)), (n = i + 1)),
                o.length && o !== "\n" && (s += r),
                (s += o);
        return s;
    }
    function xo(e, t) {
        return "\n" + wi.repeat(" ", e.indent * t);
    }
    function Ev(e, t) {
        var r, n, i;
        for (r = 0, n = e.implicitTypes.length; r < n; r += 1) if (((i = e.implicitTypes[r]), i.resolve(t))) return !0;
        return !1;
    }
    function gi(e) {
        return e === Z_ || e === J_;
    }
    function an(e) {
        return (
            (32 <= e && e <= 126) ||
            (161 <= e && e <= 55295 && e !== 8232 && e !== 8233) ||
            (57344 <= e && e <= 65533 && e !== Ro) ||
            (65536 <= e && e <= 1114111)
        );
    }
    function sh(e) {
        return an(e) && e !== Ro && e !== Q_ && e !== sn;
    }
    function oh(e, t, r) {
        var n = sh(e),
            i = n && !gi(e);
        return (
            ((r ? n : n && e !== ph && e !== mh && e !== gh && e !== wh && e !== yh) && e !== Oo && !(t === mi && !i)) ||
            (sh(t) && !gi(t) && e === Oo) ||
            (t === mi && i)
        );
    }
    function _v(e) {
        return (
            an(e) &&
            e !== Ro &&
            !gi(e) &&
            e !== ov &&
            e !== uv &&
            e !== mi &&
            e !== ph &&
            e !== mh &&
            e !== gh &&
            e !== wh &&
            e !== yh &&
            e !== Oo &&
            e !== nv &&
            e !== sv &&
            e !== ev &&
            e !== hv &&
            e !== av &&
            e !== lv &&
            e !== iv &&
            e !== tv &&
            e !== rv &&
            e !== cv &&
            e !== fv
        );
    }
    function vv(e) {
        return !gi(e) && e !== mi;
    }
    function nn(e, t) {
        var r = e.charCodeAt(t),
            n;
        return r >= 55296 && r <= 56319 && t + 1 < e.length && ((n = e.charCodeAt(t + 1)), n >= 56320 && n <= 57343)
            ? (r - 55296) * 1024 + n - 56320 + 65536
            : r;
    }
    function Eh(e) {
        var t = /^\n* /;
        return t.test(e);
    }
    var _h = 1,
        No = 2,
        vh = 3,
        Sh = 4,
        gr = 5;
    function Sv(e, t, r, n, i, s, o, a) {
        var l,
            d = 0,
            c = null,
            f = !1,
            m = !1,
            p = n !== -1,
            _ = -1,
            v = _v(nn(e, 0)) && vv(nn(e, e.length - 1));
        if (t || o)
            for (l = 0; l < e.length; d >= 65536 ? (l += 2) : l++) {
                if (((d = nn(e, l)), !an(d))) return gr;
                (v = v && oh(d, c, a)), (c = d);
            }
        else {
            for (l = 0; l < e.length; d >= 65536 ? (l += 2) : l++) {
                if (((d = nn(e, l)), d === sn)) (f = !0), p && ((m = m || (l - _ - 1 > n && e[_ + 1] !== " ")), (_ = l));
                else if (!an(d)) return gr;
                (v = v && oh(d, c, a)), (c = d);
            }
            m = m || (p && l - _ - 1 > n && e[_ + 1] !== " ");
        }
        return !f && !m
            ? v && !o && !i(e)
                ? _h
                : s === on
                ? gr
                : No
            : r > 9 && Eh(e)
            ? gr
            : o
            ? s === on
                ? gr
                : No
            : m
            ? Sh
            : vh;
    }
    function Av(e, t, r, n, i) {
        e.dump = (function () {
            if (t.length === 0) return e.quotingType === on ? '""' : "''";
            if (!e.noCompatMode && (dv.indexOf(t) !== -1 || pv.test(t)))
                return e.quotingType === on ? '"' + t + '"' : "'" + t + "'";
            var s = e.indent * Math.max(1, r),
                o = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - s),
                a = n || (e.flowLevel > -1 && r >= e.flowLevel);
            function l(d) {
                return Ev(e, d);
            }
            switch (Sv(t, a, e.indent, o, l, e.quotingType, e.forceQuotes && !n, i)) {
                case _h:
                    return t;
                case No:
                    return "'" + t.replace(/'/g, "''") + "'";
                case vh:
                    return "|" + ah(t, e.indent) + lh(ih(t, s));
                case Sh:
                    return ">" + ah(t, e.indent) + lh(ih(Cv(t, o), s));
                case gr:
                    return '"' + Tv(t, o) + '"';
                default:
                    throw new ln("impossible error: invalid scalar style");
            }
        })();
    }
    function ah(e, t) {
        var r = Eh(e) ? String(t) : "",
            n = e[e.length - 1] === "\n",
            i = n && (e[e.length - 2] === "\n" || e === "\n"),
            s = i ? "+" : n ? "" : "-";
        return r + s + "\n";
    }
    function lh(e) {
        return e[e.length - 1] === "\n" ? e.slice(0, -1) : e;
    }
    function Cv(e, t) {
        for (
            var r = /(\n+)([^\n]*)/g,
                n = (function () {
                    var d = e.indexOf("\n");
                    return (d = d !== -1 ? d : e.length), (r.lastIndex = d), uh(e.slice(0, d), t);
                })(),
                i = e[0] === "\n" || e[0] === " ",
                s,
                o;
            (o = r.exec(e));

        ) {
            var a = o[1],
                l = o[2];
            (s = l[0] === " "), (n += a + (!i && !s && l !== "" ? "\n" : "") + uh(l, t)), (i = s);
        }
        return n;
    }
    function uh(e, t) {
        if (e === "" || e[0] === " ") return e;
        for (var r = / [^ ]/g, n, i = 0, s, o = 0, a = 0, l = ""; (n = r.exec(e)); )
            (a = n.index), a - i > t && ((s = o > i ? o : a), (l += "\n" + e.slice(i, s)), (i = s + 1)), (o = a);
        return (
            (l += "\n"), e.length - i > t && o > i ? (l += e.slice(i, o) + "\n" + e.slice(o + 1)) : (l += e.slice(i)), l.slice(1)
        );
    }
    function Tv(e) {
        for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? (i += 2) : i++)
            (r = nn(e, i)), (n = ye[r]), !n && an(r) ? ((t += e[i]), r >= 65536 && (t += e[i + 1])) : (t += n || gv(r));
        return t;
    }
    function bv(e, t, r) {
        var n = "",
            i = e.tag,
            s,
            o,
            a;
        for (s = 0, o = r.length; s < o; s += 1)
            (a = r[s]),
                e.replacer && (a = e.replacer.call(r, String(s), a)),
                (it(e, t, a, !1, !1) || (typeof a > "u" && it(e, t, null, !1, !1))) &&
                    (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), (n += e.dump));
        (e.tag = i), (e.dump = "[" + n + "]");
    }
    function ch(e, t, r, n) {
        var i = "",
            s = e.tag,
            o,
            a,
            l;
        for (o = 0, a = r.length; o < a; o += 1)
            (l = r[o]),
                e.replacer && (l = e.replacer.call(r, String(o), l)),
                (it(e, t + 1, l, !0, !0, !1, !0) || (typeof l > "u" && it(e, t + 1, null, !0, !0, !1, !0))) &&
                    ((!n || i !== "") && (i += xo(e, t)),
                    e.dump && sn === e.dump.charCodeAt(0) ? (i += "-") : (i += "- "),
                    (i += e.dump));
        (e.tag = s), (e.dump = i || "[]");
    }
    function Ov(e, t, r) {
        var n = "",
            i = e.tag,
            s = Object.keys(r),
            o,
            a,
            l,
            d,
            c;
        for (o = 0, a = s.length; o < a; o += 1)
            (c = ""),
                n !== "" && (c += ", "),
                e.condenseFlow && (c += '"'),
                (l = s[o]),
                (d = r[l]),
                e.replacer && (d = e.replacer.call(r, l, d)),
                it(e, t, l, !1, !1) &&
                    (e.dump.length > 1024 && (c += "? "),
                    (c += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " ")),
                    it(e, t, d, !1, !1) && ((c += e.dump), (n += c)));
        (e.tag = i), (e.dump = "{" + n + "}");
    }
    function xv(e, t, r, n) {
        var i = "",
            s = e.tag,
            o = Object.keys(r),
            a,
            l,
            d,
            c,
            f,
            m;
        if (e.sortKeys === !0) o.sort();
        else if (typeof e.sortKeys == "function") o.sort(e.sortKeys);
        else if (e.sortKeys) throw new ln("sortKeys must be a boolean or a function");
        for (a = 0, l = o.length; a < l; a += 1)
            (m = ""),
                (!n || i !== "") && (m += xo(e, t)),
                (d = o[a]),
                (c = r[d]),
                e.replacer && (c = e.replacer.call(r, d, c)),
                it(e, t + 1, d, !0, !0, !0) &&
                    ((f = (e.tag !== null && e.tag !== "?") || (e.dump && e.dump.length > 1024)),
                    f && (e.dump && sn === e.dump.charCodeAt(0) ? (m += "?") : (m += "? ")),
                    (m += e.dump),
                    f && (m += xo(e, t)),
                    it(e, t + 1, c, !0, f) &&
                        (e.dump && sn === e.dump.charCodeAt(0) ? (m += ":") : (m += ": "), (m += e.dump), (i += m)));
        (e.tag = s), (e.dump = i || "{}");
    }
    function fh(e, t, r) {
        var n, i, s, o, a, l;
        for (i = r ? e.explicitTypes : e.implicitTypes, s = 0, o = i.length; s < o; s += 1)
            if (
                ((a = i[s]),
                (a.instanceOf || a.predicate) &&
                    (!a.instanceOf || (typeof t == "object" && t instanceof a.instanceOf)) &&
                    (!a.predicate || a.predicate(t)))
            ) {
                if (
                    (r ? (a.multi && a.representName ? (e.tag = a.representName(t)) : (e.tag = a.tag)) : (e.tag = "?"),
                    a.represent)
                ) {
                    if (((l = e.styleMap[a.tag] || a.defaultStyle), hh.call(a.represent) === "[object Function]"))
                        n = a.represent(t, l);
                    else if (dh.call(a.represent, l)) n = a.represent[l](t, l);
                    else throw new ln("!<" + a.tag + '> tag resolver accepts not "' + l + '" style');
                    e.dump = n;
                }
                return !0;
            }
        return !1;
    }
    function it(e, t, r, n, i, s, o) {
        (e.tag = null), (e.dump = r), fh(e, r, !1) || fh(e, r, !0);
        var a = hh.call(e.dump),
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
                    ? (xv(e, t, e.dump, i), m && (e.dump = "&ref_" + f + e.dump))
                    : (Ov(e, t, e.dump), m && (e.dump = "&ref_" + f + " " + e.dump));
            else if (a === "[object Array]")
                n && e.dump.length !== 0
                    ? (e.noArrayIndent && !o && t > 0 ? ch(e, t - 1, e.dump, i) : ch(e, t, e.dump, i),
                      m && (e.dump = "&ref_" + f + e.dump))
                    : (bv(e, t, e.dump), m && (e.dump = "&ref_" + f + " " + e.dump));
            else if (a === "[object String]") e.tag !== "?" && Av(e, e.dump, t, s, l);
            else {
                if (a === "[object Undefined]") return !1;
                if (e.skipInvalid) return !1;
                throw new ln("unacceptable kind of an object to dump " + a);
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
    function Nv(e, t) {
        var r = [],
            n = [],
            i,
            s;
        for (Io(e, r, n), i = 0, s = n.length; i < s; i += 1) t.duplicates.push(r[n[i]]);
        t.usedDuplicates = new Array(s);
    }
    function Io(e, t, r) {
        var n, i, s;
        if (e !== null && typeof e == "object")
            if (((i = t.indexOf(e)), i !== -1)) r.indexOf(i) === -1 && r.push(i);
            else if ((t.push(e), Array.isArray(e))) for (i = 0, s = e.length; i < s; i += 1) Io(e[i], t, r);
            else for (n = Object.keys(e), i = 0, s = n.length; i < s; i += 1) Io(e[n[i]], t, r);
    }
    function Iv(e, t) {
        t = t || {};
        var r = new yv(t);
        r.noRefs || Nv(e, r);
        var n = e;
        return r.replacer && (n = r.replacer.call({ "": n }, "", n)), it(r, 0, n, !0, !0) ? r.dump + "\n" : "";
    }
    Ah.exports.dump = Iv;
});
var yi = g((cI, Ce) => {
    "use strict";
    var Th = nh(),
        Rv = Ch();
    function Do(e, t) {
        return function () {
            throw new Error(
                "Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default."
            );
        };
    }
    Ce.exports.Type = we();
    Ce.exports.Schema = io();
    Ce.exports.FAILSAFE_SCHEMA = lo();
    Ce.exports.JSON_SCHEMA = po();
    Ce.exports.CORE_SCHEMA = mo();
    Ce.exports.DEFAULT_SCHEMA = ci();
    Ce.exports.load = Th.load;
    Ce.exports.loadAll = Th.loadAll;
    Ce.exports.dump = Rv.dump;
    Ce.exports.YAMLException = hr();
    Ce.exports.types = {
        binary: Eo(),
        float: ho(),
        map: ao(),
        null: uo(),
        pairs: vo(),
        set: So(),
        timestamp: go(),
        bool: co(),
        int: fo(),
        merge: wo(),
        omap: _o(),
        seq: oo(),
        str: so()
    };
    Ce.exports.safeLoad = Do("safeLoad", "load");
    Ce.exports.safeLoadAll = Do("safeLoadAll", "loadAll");
    Ce.exports.safeDump = Do("safeDump", "dump");
});
var bh = g(Ei => {
    "use strict";
    Object.defineProperty(Ei, "__esModule", { value: !0 });
    Ei.Lazy = void 0;
    var Po = class {
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
    Ei.Lazy = Po;
});
var un = g((hI, Oh) => {
    var Dv = "2.0.0",
        Pv = Number.MAX_SAFE_INTEGER || 9007199254740991,
        Fv = 16,
        qv = 250,
        Lv = ["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"];
    Oh.exports = {
        MAX_LENGTH: 256,
        MAX_SAFE_COMPONENT_LENGTH: Fv,
        MAX_SAFE_BUILD_LENGTH: qv,
        MAX_SAFE_INTEGER: Pv,
        RELEASE_TYPES: Lv,
        SEMVER_SPEC_VERSION: Dv,
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2
    };
});
var cn = g((dI, xh) => {
    var $v =
        typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)
            ? (...e) => console.error("SEMVER", ...e)
            : () => {};
    xh.exports = $v;
});
var wr = g((Je, Nh) => {
    var { MAX_SAFE_COMPONENT_LENGTH: Fo, MAX_SAFE_BUILD_LENGTH: Uv, MAX_LENGTH: kv } = un(),
        Mv = cn();
    Je = Nh.exports = {};
    var Bv = (Je.re = []),
        jv = (Je.safeRe = []),
        O = (Je.src = []),
        Hv = (Je.safeSrc = []),
        x = (Je.t = {}),
        Wv = 0,
        qo = "[a-zA-Z0-9-]",
        Gv = [
            ["\\s", 1],
            ["\\d", kv],
            [qo, Uv]
        ],
        Vv = e => {
            for (let [t, r] of Gv)
                e = e
                    .split("".concat(t, "*"))
                    .join("".concat(t, "{0,").concat(r, "}"))
                    .split("".concat(t, "+"))
                    .join("".concat(t, "{1,").concat(r, "}"));
            return e;
        },
        q = (e, t, r) => {
            let n = Vv(t),
                i = Wv++;
            Mv(e, i, t),
                (x[e] = i),
                (O[i] = t),
                (Hv[i] = n),
                (Bv[i] = new RegExp(t, r ? "g" : void 0)),
                (jv[i] = new RegExp(n, r ? "g" : void 0));
        };
    q("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    q("NUMERICIDENTIFIERLOOSE", "\\d+");
    q("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-]".concat(qo, "*"));
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
    q("BUILDIDENTIFIER", "".concat(qo, "+"));
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
        "(^|[^\\d])(\\d{1,".concat(Fo, "})") + "(?:\\.(\\d{1,".concat(Fo, "}))?") + "(?:\\.(\\d{1,".concat(Fo, "}))?")
    );
    q("COERCE", "".concat(O[x.COERCEPLAIN], "(?:$|[^\\d])"));
    q("COERCEFULL", O[x.COERCEPLAIN] + "(?:".concat(O[x.PRERELEASE], ")?") + "(?:".concat(O[x.BUILD], ")?") + "(?:$|[^\\d])");
    q("COERCERTL", O[x.COERCE], !0);
    q("COERCERTLFULL", O[x.COERCEFULL], !0);
    q("LONETILDE", "(?:~>?)");
    q("TILDETRIM", "(\\s*)".concat(O[x.LONETILDE], "\\s+"), !0);
    Je.tildeTrimReplace = "$1~";
    q("TILDE", "^".concat(O[x.LONETILDE]).concat(O[x.XRANGEPLAIN], "$"));
    q("TILDELOOSE", "^".concat(O[x.LONETILDE]).concat(O[x.XRANGEPLAINLOOSE], "$"));
    q("LONECARET", "(?:\\^)");
    q("CARETTRIM", "(\\s*)".concat(O[x.LONECARET], "\\s+"), !0);
    Je.caretTrimReplace = "$1^";
    q("CARET", "^".concat(O[x.LONECARET]).concat(O[x.XRANGEPLAIN], "$"));
    q("CARETLOOSE", "^".concat(O[x.LONECARET]).concat(O[x.XRANGEPLAINLOOSE], "$"));
    q("COMPARATORLOOSE", "^".concat(O[x.GTLT], "\\s*(").concat(O[x.LOOSEPLAIN], ")$|^$"));
    q("COMPARATOR", "^".concat(O[x.GTLT], "\\s*(").concat(O[x.FULLPLAIN], ")$|^$"));
    q("COMPARATORTRIM", "(\\s*)".concat(O[x.GTLT], "\\s*(").concat(O[x.LOOSEPLAIN], "|").concat(O[x.XRANGEPLAIN], ")"), !0);
    Je.comparatorTrimReplace = "$1$2$3";
    q("HYPHENRANGE", "^\\s*(".concat(O[x.XRANGEPLAIN], ")") + "\\s+-\\s+" + "(".concat(O[x.XRANGEPLAIN], ")") + "\\s*$");
    q(
        "HYPHENRANGELOOSE",
        "^\\s*(".concat(O[x.XRANGEPLAINLOOSE], ")") + "\\s+-\\s+" + "(".concat(O[x.XRANGEPLAINLOOSE], ")") + "\\s*$"
    );
    q("STAR", "(<|>)?=?\\s*\\*");
    q("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    q("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
});
var _i = g((pI, Ih) => {
    var Yv = Object.freeze({ loose: !0 }),
        zv = Object.freeze({}),
        Xv = e => (e ? (typeof e != "object" ? Yv : e) : zv);
    Ih.exports = Xv;
});
var Lo = g((mI, Ph) => {
    var Rh = /^[0-9]+$/,
        Dh = (e, t) => {
            let r = Rh.test(e),
                n = Rh.test(t);
            return r && n && ((e = +e), (t = +t)), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
        },
        Kv = (e, t) => Dh(t, e);
    Ph.exports = { compareIdentifiers: Dh, rcompareIdentifiers: Kv };
});
var Ee = g((gI, $h) => {
    var vi = cn(),
        { MAX_LENGTH: Fh, MAX_SAFE_INTEGER: Si } = un(),
        { safeRe: qh, safeSrc: Lh, t: Ai } = wr(),
        Jv = _i(),
        { compareIdentifiers: yr } = Lo(),
        $o = class e {
            constructor(t, r) {
                if (((r = Jv(r)), t instanceof e)) {
                    if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease) return t;
                    t = t.version;
                } else if (typeof t != "string")
                    throw new TypeError('Invalid version. Must be a string. Got type "'.concat(typeof t, '".'));
                if (t.length > Fh) throw new TypeError("version is longer than ".concat(Fh, " characters"));
                vi("SemVer", t, r),
                    (this.options = r),
                    (this.loose = !!r.loose),
                    (this.includePrerelease = !!r.includePrerelease);
                let n = t.trim().match(r.loose ? qh[Ai.LOOSE] : qh[Ai.FULL]);
                if (!n) throw new TypeError("Invalid Version: ".concat(t));
                if (
                    ((this.raw = t),
                    (this.major = +n[1]),
                    (this.minor = +n[2]),
                    (this.patch = +n[3]),
                    this.major > Si || this.major < 0)
                )
                    throw new TypeError("Invalid major version");
                if (this.minor > Si || this.minor < 0) throw new TypeError("Invalid minor version");
                if (this.patch > Si || this.patch < 0) throw new TypeError("Invalid patch version");
                n[4]
                    ? (this.prerelease = n[4].split(".").map(i => {
                          if (/^[0-9]+$/.test(i)) {
                              let s = +i;
                              if (s >= 0 && s < Si) return s;
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
                if ((vi("SemVer.compare", this.version, this.options, t), !(t instanceof e))) {
                    if (typeof t == "string" && t === this.version) return 0;
                    t = new e(t, this.options);
                }
                return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
            }
            compareMain(t) {
                return (
                    t instanceof e || (t = new e(t, this.options)),
                    yr(this.major, t.major) || yr(this.minor, t.minor) || yr(this.patch, t.patch)
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
                    if ((vi("prerelease compare", r, n, i), n === void 0 && i === void 0)) return 0;
                    if (i === void 0) return 1;
                    if (n === void 0) return -1;
                    if (n === i) continue;
                    return yr(n, i);
                } while (++r);
            }
            compareBuild(t) {
                t instanceof e || (t = new e(t, this.options));
                let r = 0;
                do {
                    let n = this.build[r],
                        i = t.build[r];
                    if ((vi("build compare", r, n, i), n === void 0 && i === void 0)) return 0;
                    if (i === void 0) return 1;
                    if (n === void 0) return -1;
                    if (n === i) continue;
                    return yr(n, i);
                } while (++r);
            }
            inc(t, r, n) {
                if (t.startsWith("pre")) {
                    if (!r && n === !1) throw new Error("invalid increment argument: identifier is empty");
                    if (r) {
                        let i = new RegExp("^".concat(this.options.loose ? Lh[Ai.PRERELEASELOOSE] : Lh[Ai.PRERELEASE], "$")),
                            s = "-".concat(r).match(i);
                        if (!s || s[1] !== r) throw new Error("invalid identifier: ".concat(r));
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
                            let s = this.prerelease.length;
                            for (; --s >= 0; ) typeof this.prerelease[s] == "number" && (this.prerelease[s]++, (s = -2));
                            if (s === -1) {
                                if (r === this.prerelease.join(".") && n === !1)
                                    throw new Error("invalid increment argument: identifier already exists");
                                this.prerelease.push(i);
                            }
                        }
                        if (r) {
                            let s = [r, i];
                            n === !1 && (s = [r]),
                                yr(this.prerelease[0], r) === 0
                                    ? isNaN(this.prerelease[1]) && (this.prerelease = s)
                                    : (this.prerelease = s);
                        }
                        break;
                    }
                    default:
                        throw new Error("invalid increment argument: ".concat(t));
                }
                return (this.raw = this.format()), this.build.length && (this.raw += "+".concat(this.build.join("."))), this;
            }
        };
    $h.exports = $o;
});
var Ut = g((wI, kh) => {
    var Uh = Ee(),
        Qv = (e, t, r = !1) => {
            if (e instanceof Uh) return e;
            try {
                return new Uh(e, t);
            } catch (n) {
                if (!r) return null;
                throw n;
            }
        };
    kh.exports = Qv;
});
var Bh = g((yI, Mh) => {
    var Zv = Ut(),
        eS = (e, t) => {
            let r = Zv(e, t);
            return r ? r.version : null;
        };
    Mh.exports = eS;
});
var Hh = g((EI, jh) => {
    var tS = Ut(),
        rS = (e, t) => {
            let r = tS(e.trim().replace(/^[=v]+/, ""), t);
            return r ? r.version : null;
        };
    jh.exports = rS;
});
var Vh = g((_I, Gh) => {
    var Wh = Ee(),
        nS = (e, t, r, n, i) => {
            typeof r == "string" && ((i = n), (n = r), (r = void 0));
            try {
                return new Wh(e instanceof Wh ? e.version : e, r).inc(t, n, i).version;
            } catch {
                return null;
            }
        };
    Gh.exports = nS;
});
var Xh = g((vI, zh) => {
    var Yh = Ut(),
        iS = (e, t) => {
            let r = Yh(e, null, !0),
                n = Yh(t, null, !0),
                i = r.compare(n);
            if (i === 0) return null;
            let s = i > 0,
                o = s ? r : n,
                a = s ? n : r,
                l = !!o.prerelease.length;
            if (!!a.prerelease.length && !l) {
                if (!a.patch && !a.minor) return "major";
                if (a.compareMain(o) === 0) return a.minor && !a.patch ? "minor" : "patch";
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
    zh.exports = iS;
});
var Jh = g((SI, Kh) => {
    var sS = Ee(),
        oS = (e, t) => new sS(e, t).major;
    Kh.exports = oS;
});
var Zh = g((AI, Qh) => {
    var aS = Ee(),
        lS = (e, t) => new aS(e, t).minor;
    Qh.exports = lS;
});
var td = g((CI, ed) => {
    var uS = Ee(),
        cS = (e, t) => new uS(e, t).patch;
    ed.exports = cS;
});
var nd = g((TI, rd) => {
    var fS = Ut(),
        hS = (e, t) => {
            let r = fS(e, t);
            return r && r.prerelease.length ? r.prerelease : null;
        };
    rd.exports = hS;
});
var ke = g((bI, sd) => {
    var id = Ee(),
        dS = (e, t, r) => new id(e, r).compare(new id(t, r));
    sd.exports = dS;
});
var ad = g((OI, od) => {
    var pS = ke(),
        mS = (e, t, r) => pS(t, e, r);
    od.exports = mS;
});
var ud = g((xI, ld) => {
    var gS = ke(),
        wS = (e, t) => gS(e, t, !0);
    ld.exports = wS;
});
var Ci = g((NI, fd) => {
    var cd = Ee(),
        yS = (e, t, r) => {
            let n = new cd(e, r),
                i = new cd(t, r);
            return n.compare(i) || n.compareBuild(i);
        };
    fd.exports = yS;
});
var dd = g((II, hd) => {
    var ES = Ci(),
        _S = (e, t) => e.sort((r, n) => ES(r, n, t));
    hd.exports = _S;
});
var md = g((RI, pd) => {
    var vS = Ci(),
        SS = (e, t) => e.sort((r, n) => vS(n, r, t));
    pd.exports = SS;
});
var fn = g((DI, gd) => {
    var AS = ke(),
        CS = (e, t, r) => AS(e, t, r) > 0;
    gd.exports = CS;
});
var Ti = g((PI, wd) => {
    var TS = ke(),
        bS = (e, t, r) => TS(e, t, r) < 0;
    wd.exports = bS;
});
var Uo = g((FI, yd) => {
    var OS = ke(),
        xS = (e, t, r) => OS(e, t, r) === 0;
    yd.exports = xS;
});
var ko = g((qI, Ed) => {
    var NS = ke(),
        IS = (e, t, r) => NS(e, t, r) !== 0;
    Ed.exports = IS;
});
var bi = g((LI, _d) => {
    var RS = ke(),
        DS = (e, t, r) => RS(e, t, r) >= 0;
    _d.exports = DS;
});
var Oi = g(($I, vd) => {
    var PS = ke(),
        FS = (e, t, r) => PS(e, t, r) <= 0;
    vd.exports = FS;
});
var Mo = g((UI, Sd) => {
    var qS = Uo(),
        LS = ko(),
        $S = fn(),
        US = bi(),
        kS = Ti(),
        MS = Oi(),
        BS = (e, t, r, n) => {
            switch (t) {
                case "===":
                    return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
                case "!==":
                    return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
                case "":
                case "=":
                case "==":
                    return qS(e, r, n);
                case "!=":
                    return LS(e, r, n);
                case ">":
                    return $S(e, r, n);
                case ">=":
                    return US(e, r, n);
                case "<":
                    return kS(e, r, n);
                case "<=":
                    return MS(e, r, n);
                default:
                    throw new TypeError("Invalid operator: ".concat(t));
            }
        };
    Sd.exports = BS;
});
var Cd = g((kI, Ad) => {
    var jS = Ee(),
        HS = Ut(),
        { safeRe: xi, t: Ni } = wr(),
        WS = (e, t) => {
            if (e instanceof jS) return e;
            if ((typeof e == "number" && (e = String(e)), typeof e != "string")) return null;
            t = t || {};
            let r = null;
            if (!t.rtl) r = e.match(t.includePrerelease ? xi[Ni.COERCEFULL] : xi[Ni.COERCE]);
            else {
                let l = t.includePrerelease ? xi[Ni.COERCERTLFULL] : xi[Ni.COERCERTL],
                    d;
                for (; (d = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
                    (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d),
                        (l.lastIndex = d.index + d[1].length + d[2].length);
                l.lastIndex = -1;
            }
            if (r === null) return null;
            let n = r[2],
                i = r[3] || "0",
                s = r[4] || "0",
                o = t.includePrerelease && r[5] ? "-".concat(r[5]) : "",
                a = t.includePrerelease && r[6] ? "+".concat(r[6]) : "";
            return HS("".concat(n, ".").concat(i, ".").concat(s).concat(o).concat(a), t);
        };
    Ad.exports = WS;
});
var bd = g((MI, Td) => {
    var Bo = class {
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
    Td.exports = Bo;
});
var Me = g((BI, Id) => {
    var GS = /\s+/g,
        jo = class e {
            constructor(t, r) {
                if (((r = YS(r)), t instanceof e))
                    return t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease ? t : new e(t.raw, r);
                if (t instanceof Ho) return (this.raw = t.value), (this.set = [[t]]), (this.formatted = void 0), this;
                if (
                    ((this.options = r),
                    (this.loose = !!r.loose),
                    (this.includePrerelease = !!r.includePrerelease),
                    (this.raw = t.trim().replace(GS, " ")),
                    (this.set = this.raw
                        .split("||")
                        .map(n => this.parseRange(n.trim()))
                        .filter(n => n.length)),
                    !this.set.length)
                )
                    throw new TypeError("Invalid SemVer Range: ".concat(this.raw));
                if (this.set.length > 1) {
                    let n = this.set[0];
                    if (((this.set = this.set.filter(i => !xd(i[0]))), this.set.length === 0)) this.set = [n];
                    else if (this.set.length > 1) {
                        for (let i of this.set)
                            if (i.length === 1 && eA(i[0])) {
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
                let n = ((this.options.includePrerelease && QS) | (this.options.loose && ZS)) + ":" + t,
                    i = Od.get(n);
                if (i) return i;
                let s = this.options.loose,
                    o = s ? Fe[Te.HYPHENRANGELOOSE] : Fe[Te.HYPHENRANGE];
                (t = t.replace(o, cA(this.options.includePrerelease))),
                    K("hyphen replace", t),
                    (t = t.replace(Fe[Te.COMPARATORTRIM], XS)),
                    K("comparator trim", t),
                    (t = t.replace(Fe[Te.TILDETRIM], KS)),
                    K("tilde trim", t),
                    (t = t.replace(Fe[Te.CARETTRIM], JS)),
                    K("caret trim", t);
                let a = t
                    .split(" ")
                    .map(f => tA(f, this.options))
                    .join(" ")
                    .split(/\s+/)
                    .map(f => uA(f, this.options));
                s && (a = a.filter(f => (K("loose invalid filter", f, this.options), !!f.match(Fe[Te.COMPARATORLOOSE])))),
                    K("range list", a);
                let l = new Map(),
                    d = a.map(f => new Ho(f, this.options));
                for (let f of d) {
                    if (xd(f)) return [f];
                    l.set(f.value, f);
                }
                l.size > 1 && l.has("") && l.delete("");
                let c = [...l.values()];
                return Od.set(n, c), c;
            }
            intersects(t, r) {
                if (!(t instanceof e)) throw new TypeError("a Range is required");
                return this.set.some(
                    n => Nd(n, r) && t.set.some(i => Nd(i, r) && n.every(s => i.every(o => s.intersects(o, r))))
                );
            }
            test(t) {
                if (!t) return !1;
                if (typeof t == "string")
                    try {
                        t = new zS(t, this.options);
                    } catch {
                        return !1;
                    }
                for (let r = 0; r < this.set.length; r++) if (fA(this.set[r], t, this.options)) return !0;
                return !1;
            }
        };
    Id.exports = jo;
    var VS = bd(),
        Od = new VS(),
        YS = _i(),
        Ho = hn(),
        K = cn(),
        zS = Ee(),
        { safeRe: Fe, t: Te, comparatorTrimReplace: XS, tildeTrimReplace: KS, caretTrimReplace: JS } = wr(),
        { FLAG_INCLUDE_PRERELEASE: QS, FLAG_LOOSE: ZS } = un(),
        xd = e => e.value === "<0.0.0-0",
        eA = e => e.value === "",
        Nd = (e, t) => {
            let r = !0,
                n = e.slice(),
                i = n.pop();
            for (; r && n.length; ) (r = n.every(s => i.intersects(s, t))), (i = n.pop());
            return r;
        },
        tA = (e, t) => (
            K("comp", e, t),
            (e = iA(e, t)),
            K("caret", e),
            (e = rA(e, t)),
            K("tildes", e),
            (e = oA(e, t)),
            K("xrange", e),
            (e = lA(e, t)),
            K("stars", e),
            e
        ),
        be = e => !e || e.toLowerCase() === "x" || e === "*",
        rA = (e, t) =>
            e
                .trim()
                .split(/\s+/)
                .map(r => nA(r, t))
                .join(" "),
        nA = (e, t) => {
            let r = t.loose ? Fe[Te.TILDELOOSE] : Fe[Te.TILDE];
            return e.replace(r, (n, i, s, o, a) => {
                K("tilde", e, n, i, s, o, a);
                let l;
                return (
                    be(i)
                        ? (l = "")
                        : be(s)
                        ? (l = ">=".concat(i, ".0.0 <").concat(+i + 1, ".0.0-0"))
                        : be(o)
                        ? (l = ">="
                              .concat(i, ".")
                              .concat(s, ".0 <")
                              .concat(i, ".")
                              .concat(+s + 1, ".0-0"))
                        : a
                        ? (K("replaceTilde pr", a),
                          (l = ">="
                              .concat(i, ".")
                              .concat(s, ".")
                              .concat(o, "-")
                              .concat(a, " <")
                              .concat(i, ".")
                              .concat(+s + 1, ".0-0")))
                        : (l = ">="
                              .concat(i, ".")
                              .concat(s, ".")
                              .concat(o, " <")
                              .concat(i, ".")
                              .concat(+s + 1, ".0-0")),
                    K("tilde return", l),
                    l
                );
            });
        },
        iA = (e, t) =>
            e
                .trim()
                .split(/\s+/)
                .map(r => sA(r, t))
                .join(" "),
        sA = (e, t) => {
            K("caret", e, t);
            let r = t.loose ? Fe[Te.CARETLOOSE] : Fe[Te.CARET],
                n = t.includePrerelease ? "-0" : "";
            return e.replace(r, (i, s, o, a, l) => {
                K("caret", e, i, s, o, a, l);
                let d;
                return (
                    be(s)
                        ? (d = "")
                        : be(o)
                        ? (d = ">="
                              .concat(s, ".0.0")
                              .concat(n, " <")
                              .concat(+s + 1, ".0.0-0"))
                        : be(a)
                        ? s === "0"
                            ? (d = ">="
                                  .concat(s, ".")
                                  .concat(o, ".0")
                                  .concat(n, " <")
                                  .concat(s, ".")
                                  .concat(+o + 1, ".0-0"))
                            : (d = ">="
                                  .concat(s, ".")
                                  .concat(o, ".0")
                                  .concat(n, " <")
                                  .concat(+s + 1, ".0.0-0"))
                        : l
                        ? (K("replaceCaret pr", l),
                          s === "0"
                              ? o === "0"
                                  ? (d = ">="
                                        .concat(s, ".")
                                        .concat(o, ".")
                                        .concat(a, "-")
                                        .concat(l, " <")
                                        .concat(s, ".")
                                        .concat(o, ".")
                                        .concat(+a + 1, "-0"))
                                  : (d = ">="
                                        .concat(s, ".")
                                        .concat(o, ".")
                                        .concat(a, "-")
                                        .concat(l, " <")
                                        .concat(s, ".")
                                        .concat(+o + 1, ".0-0"))
                              : (d = ">="
                                    .concat(s, ".")
                                    .concat(o, ".")
                                    .concat(a, "-")
                                    .concat(l, " <")
                                    .concat(+s + 1, ".0.0-0")))
                        : (K("no pr"),
                          s === "0"
                              ? o === "0"
                                  ? (d = ">="
                                        .concat(s, ".")
                                        .concat(o, ".")
                                        .concat(a)
                                        .concat(n, " <")
                                        .concat(s, ".")
                                        .concat(o, ".")
                                        .concat(+a + 1, "-0"))
                                  : (d = ">="
                                        .concat(s, ".")
                                        .concat(o, ".")
                                        .concat(a)
                                        .concat(n, " <")
                                        .concat(s, ".")
                                        .concat(+o + 1, ".0-0"))
                              : (d = ">="
                                    .concat(s, ".")
                                    .concat(o, ".")
                                    .concat(a, " <")
                                    .concat(+s + 1, ".0.0-0"))),
                    K("caret return", d),
                    d
                );
            });
        },
        oA = (e, t) => (
            K("replaceXRanges", e, t),
            e
                .split(/\s+/)
                .map(r => aA(r, t))
                .join(" ")
        ),
        aA = (e, t) => {
            e = e.trim();
            let r = t.loose ? Fe[Te.XRANGELOOSE] : Fe[Te.XRANGE];
            return e.replace(r, (n, i, s, o, a, l) => {
                K("xRange", e, n, i, s, o, a, l);
                let d = be(s),
                    c = d || be(o),
                    f = c || be(a),
                    m = f;
                return (
                    i === "=" && m && (i = ""),
                    (l = t.includePrerelease ? "-0" : ""),
                    d
                        ? i === ">" || i === "<"
                            ? (n = "<0.0.0-0")
                            : (n = "*")
                        : i && m
                        ? (c && (o = 0),
                          (a = 0),
                          i === ">"
                              ? ((i = ">="), c ? ((s = +s + 1), (o = 0), (a = 0)) : ((o = +o + 1), (a = 0)))
                              : i === "<=" && ((i = "<"), c ? (s = +s + 1) : (o = +o + 1)),
                          i === "<" && (l = "-0"),
                          (n = ""
                              .concat(i + s, ".")
                              .concat(o, ".")
                              .concat(a)
                              .concat(l)))
                        : c
                        ? (n = ">="
                              .concat(s, ".0.0")
                              .concat(l, " <")
                              .concat(+s + 1, ".0.0-0"))
                        : f &&
                          (n = ">="
                              .concat(s, ".")
                              .concat(o, ".0")
                              .concat(l, " <")
                              .concat(s, ".")
                              .concat(+o + 1, ".0-0")),
                    K("xRange return", n),
                    n
                );
            });
        },
        lA = (e, t) => (K("replaceStars", e, t), e.trim().replace(Fe[Te.STAR], "")),
        uA = (e, t) => (K("replaceGTE0", e, t), e.trim().replace(Fe[t.includePrerelease ? Te.GTE0PRE : Te.GTE0], "")),
        cA = e => (t, r, n, i, s, o, a, l, d, c, f, m) => (
            be(n)
                ? (r = "")
                : be(i)
                ? (r = ">=".concat(n, ".0.0").concat(e ? "-0" : ""))
                : be(s)
                ? (r = ">="
                      .concat(n, ".")
                      .concat(i, ".0")
                      .concat(e ? "-0" : ""))
                : o
                ? (r = ">=".concat(r))
                : (r = ">=".concat(r).concat(e ? "-0" : "")),
            be(d)
                ? (l = "")
                : be(c)
                ? (l = "<".concat(+d + 1, ".0.0-0"))
                : be(f)
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
        fA = (e, t, r) => {
            for (let n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
            if (t.prerelease.length && !r.includePrerelease) {
                for (let n = 0; n < e.length; n++)
                    if ((K(e[n].semver), e[n].semver !== Ho.ANY && e[n].semver.prerelease.length > 0)) {
                        let i = e[n].semver;
                        if (i.major === t.major && i.minor === t.minor && i.patch === t.patch) return !0;
                    }
                return !1;
            }
            return !0;
        };
});
var hn = g((jI, Ld) => {
    var dn = Symbol("SemVer ANY"),
        Vo = class e {
            static get ANY() {
                return dn;
            }
            constructor(t, r) {
                if (((r = Rd(r)), t instanceof e)) {
                    if (t.loose === !!r.loose) return t;
                    t = t.value;
                }
                (t = t.trim().split(/\s+/).join(" ")),
                    Go("comparator", t, r),
                    (this.options = r),
                    (this.loose = !!r.loose),
                    this.parse(t),
                    this.semver === dn ? (this.value = "") : (this.value = this.operator + this.semver.version),
                    Go("comp", this);
            }
            parse(t) {
                let r = this.options.loose ? Dd[Pd.COMPARATORLOOSE] : Dd[Pd.COMPARATOR],
                    n = t.match(r);
                if (!n) throw new TypeError("Invalid comparator: ".concat(t));
                (this.operator = n[1] !== void 0 ? n[1] : ""),
                    this.operator === "=" && (this.operator = ""),
                    n[2] ? (this.semver = new Fd(n[2], this.options.loose)) : (this.semver = dn);
            }
            toString() {
                return this.value;
            }
            test(t) {
                if ((Go("Comparator.test", t, this.options.loose), this.semver === dn || t === dn)) return !0;
                if (typeof t == "string")
                    try {
                        t = new Fd(t, this.options);
                    } catch {
                        return !1;
                    }
                return Wo(t, this.operator, this.semver, this.options);
            }
            intersects(t, r) {
                if (!(t instanceof e)) throw new TypeError("a Comparator is required");
                return this.operator === ""
                    ? this.value === ""
                        ? !0
                        : new qd(t.value, r).test(this.value)
                    : t.operator === ""
                    ? t.value === ""
                        ? !0
                        : new qd(this.value, r).test(t.semver)
                    : ((r = Rd(r)),
                      (r.includePrerelease && (this.value === "<0.0.0-0" || t.value === "<0.0.0-0")) ||
                      (!r.includePrerelease && (this.value.startsWith("<0.0.0") || t.value.startsWith("<0.0.0")))
                          ? !1
                          : !!(
                                (this.operator.startsWith(">") && t.operator.startsWith(">")) ||
                                (this.operator.startsWith("<") && t.operator.startsWith("<")) ||
                                (this.semver.version === t.semver.version &&
                                    this.operator.includes("=") &&
                                    t.operator.includes("=")) ||
                                (Wo(this.semver, "<", t.semver, r) &&
                                    this.operator.startsWith(">") &&
                                    t.operator.startsWith("<")) ||
                                (Wo(this.semver, ">", t.semver, r) && this.operator.startsWith("<") && t.operator.startsWith(">"))
                            ));
            }
        };
    Ld.exports = Vo;
    var Rd = _i(),
        { safeRe: Dd, t: Pd } = wr(),
        Wo = Mo(),
        Go = cn(),
        Fd = Ee(),
        qd = Me();
});
var pn = g((HI, $d) => {
    var hA = Me(),
        dA = (e, t, r) => {
            try {
                t = new hA(t, r);
            } catch {
                return !1;
            }
            return t.test(e);
        };
    $d.exports = dA;
});
var kd = g((WI, Ud) => {
    var pA = Me(),
        mA = (e, t) =>
            new pA(e, t).set.map(r =>
                r
                    .map(n => n.value)
                    .join(" ")
                    .trim()
                    .split(" ")
            );
    Ud.exports = mA;
});
var Bd = g((GI, Md) => {
    var gA = Ee(),
        wA = Me(),
        yA = (e, t, r) => {
            let n = null,
                i = null,
                s = null;
            try {
                s = new wA(t, r);
            } catch {
                return null;
            }
            return (
                e.forEach(o => {
                    s.test(o) && (!n || i.compare(o) === -1) && ((n = o), (i = new gA(n, r)));
                }),
                n
            );
        };
    Md.exports = yA;
});
var Hd = g((VI, jd) => {
    var EA = Ee(),
        _A = Me(),
        vA = (e, t, r) => {
            let n = null,
                i = null,
                s = null;
            try {
                s = new _A(t, r);
            } catch {
                return null;
            }
            return (
                e.forEach(o => {
                    s.test(o) && (!n || i.compare(o) === 1) && ((n = o), (i = new EA(n, r)));
                }),
                n
            );
        };
    jd.exports = vA;
});
var Vd = g((YI, Gd) => {
    var Yo = Ee(),
        SA = Me(),
        Wd = fn(),
        AA = (e, t) => {
            e = new SA(e, t);
            let r = new Yo("0.0.0");
            if (e.test(r) || ((r = new Yo("0.0.0-0")), e.test(r))) return r;
            r = null;
            for (let n = 0; n < e.set.length; ++n) {
                let i = e.set[n],
                    s = null;
                i.forEach(o => {
                    let a = new Yo(o.semver.version);
                    switch (o.operator) {
                        case ">":
                            a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), (a.raw = a.format());
                        case "":
                        case ">=":
                            (!s || Wd(a, s)) && (s = a);
                            break;
                        case "<":
                        case "<=":
                            break;
                        default:
                            throw new Error("Unexpected operation: ".concat(o.operator));
                    }
                }),
                    s && (!r || Wd(r, s)) && (r = s);
            }
            return r && e.test(r) ? r : null;
        };
    Gd.exports = AA;
});
var zd = g((zI, Yd) => {
    var CA = Me(),
        TA = (e, t) => {
            try {
                return new CA(e, t).range || "*";
            } catch {
                return null;
            }
        };
    Yd.exports = TA;
});
var Ii = g((XI, Qd) => {
    var bA = Ee(),
        Jd = hn(),
        { ANY: OA } = Jd,
        xA = Me(),
        NA = pn(),
        Xd = fn(),
        Kd = Ti(),
        IA = Oi(),
        RA = bi(),
        DA = (e, t, r, n) => {
            (e = new bA(e, n)), (t = new xA(t, n));
            let i, s, o, a, l;
            switch (r) {
                case ">":
                    (i = Xd), (s = IA), (o = Kd), (a = ">"), (l = ">=");
                    break;
                case "<":
                    (i = Kd), (s = RA), (o = Xd), (a = "<"), (l = "<=");
                    break;
                default:
                    throw new TypeError('Must provide a hilo val of "<" or ">"');
            }
            if (NA(e, t, n)) return !1;
            for (let d = 0; d < t.set.length; ++d) {
                let c = t.set[d],
                    f = null,
                    m = null;
                if (
                    (c.forEach(p => {
                        p.semver === OA && (p = new Jd(">=0.0.0")),
                            (f = f || p),
                            (m = m || p),
                            i(p.semver, f.semver, n) ? (f = p) : o(p.semver, m.semver, n) && (m = p);
                    }),
                    f.operator === a || f.operator === l || ((!m.operator || m.operator === a) && s(e, m.semver)))
                )
                    return !1;
                if (m.operator === l && o(e, m.semver)) return !1;
            }
            return !0;
        };
    Qd.exports = DA;
});
var ep = g((KI, Zd) => {
    var PA = Ii(),
        FA = (e, t, r) => PA(e, t, ">", r);
    Zd.exports = FA;
});
var rp = g((JI, tp) => {
    var qA = Ii(),
        LA = (e, t, r) => qA(e, t, "<", r);
    tp.exports = LA;
});
var sp = g((QI, ip) => {
    var np = Me(),
        $A = (e, t, r) => ((e = new np(e, r)), (t = new np(t, r)), e.intersects(t, r));
    ip.exports = $A;
});
var ap = g((ZI, op) => {
    var UA = pn(),
        kA = ke();
    op.exports = (e, t, r) => {
        let n = [],
            i = null,
            s = null,
            o = e.sort((c, f) => kA(c, f, r));
        for (let c of o) UA(c, t, r) ? ((s = c), i || (i = c)) : (s && n.push([i, s]), (s = null), (i = null));
        i && n.push([i, null]);
        let a = [];
        for (let [c, f] of n)
            c === f
                ? a.push(c)
                : !f && c === o[0]
                ? a.push("*")
                : f
                ? c === o[0]
                    ? a.push("<=".concat(f))
                    : a.push("".concat(c, " - ").concat(f))
                : a.push(">=".concat(c));
        let l = a.join(" || "),
            d = typeof t.raw == "string" ? t.raw : String(t);
        return l.length < d.length ? l : t;
    };
});
var dp = g((eR, hp) => {
    var lp = Me(),
        Xo = hn(),
        { ANY: zo } = Xo,
        mn = pn(),
        Ko = ke(),
        MA = (e, t, r = {}) => {
            if (e === t) return !0;
            (e = new lp(e, r)), (t = new lp(t, r));
            let n = !1;
            e: for (let i of e.set) {
                for (let s of t.set) {
                    let o = jA(i, s, r);
                    if (((n = n || o !== null), o)) continue e;
                }
                if (n) return !1;
            }
            return !0;
        },
        BA = [new Xo(">=0.0.0-0")],
        up = [new Xo(">=0.0.0")],
        jA = (e, t, r) => {
            if (e === t) return !0;
            if (e.length === 1 && e[0].semver === zo) {
                if (t.length === 1 && t[0].semver === zo) return !0;
                r.includePrerelease ? (e = BA) : (e = up);
            }
            if (t.length === 1 && t[0].semver === zo) {
                if (r.includePrerelease) return !0;
                t = up;
            }
            let n = new Set(),
                i,
                s;
            for (let p of e)
                p.operator === ">" || p.operator === ">="
                    ? (i = cp(i, p, r))
                    : p.operator === "<" || p.operator === "<="
                    ? (s = fp(s, p, r))
                    : n.add(p.semver);
            if (n.size > 1) return null;
            let o;
            if (i && s) {
                if (((o = Ko(i.semver, s.semver, r)), o > 0)) return null;
                if (o === 0 && (i.operator !== ">=" || s.operator !== "<=")) return null;
            }
            for (let p of n) {
                if ((i && !mn(p, String(i), r)) || (s && !mn(p, String(s), r))) return null;
                for (let _ of t) if (!mn(p, String(_), r)) return !1;
                return !0;
            }
            let a,
                l,
                d,
                c,
                f = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1,
                m = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
            f && f.prerelease.length === 1 && s.operator === "<" && f.prerelease[0] === 0 && (f = !1);
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
                        if (((a = cp(i, p, r)), a === p && a !== i)) return !1;
                    } else if (i.operator === ">=" && !mn(i.semver, String(p), r)) return !1;
                }
                if (s) {
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
                        if (((l = fp(s, p, r)), l === p && l !== s)) return !1;
                    } else if (s.operator === "<=" && !mn(s.semver, String(p), r)) return !1;
                }
                if (!p.operator && (s || i) && o !== 0) return !1;
            }
            return !((i && d && !s && o !== 0) || (s && c && !i && o !== 0) || m || f);
        },
        cp = (e, t, r) => {
            if (!e) return t;
            let n = Ko(e.semver, t.semver, r);
            return n > 0 ? e : n < 0 || (t.operator === ">" && e.operator === ">=") ? t : e;
        },
        fp = (e, t, r) => {
            if (!e) return t;
            let n = Ko(e.semver, t.semver, r);
            return n < 0 ? e : n > 0 || (t.operator === "<" && e.operator === "<=") ? t : e;
        };
    hp.exports = MA;
});
var Qo = g((tR, gp) => {
    var Jo = wr(),
        pp = un(),
        HA = Ee(),
        mp = Lo(),
        WA = Ut(),
        GA = Bh(),
        VA = Hh(),
        YA = Vh(),
        zA = Xh(),
        XA = Jh(),
        KA = Zh(),
        JA = td(),
        QA = nd(),
        ZA = ke(),
        eC = ad(),
        tC = ud(),
        rC = Ci(),
        nC = dd(),
        iC = md(),
        sC = fn(),
        oC = Ti(),
        aC = Uo(),
        lC = ko(),
        uC = bi(),
        cC = Oi(),
        fC = Mo(),
        hC = Cd(),
        dC = hn(),
        pC = Me(),
        mC = pn(),
        gC = kd(),
        wC = Bd(),
        yC = Hd(),
        EC = Vd(),
        _C = zd(),
        vC = Ii(),
        SC = ep(),
        AC = rp(),
        CC = sp(),
        TC = ap(),
        bC = dp();
    gp.exports = {
        parse: WA,
        valid: GA,
        clean: VA,
        inc: YA,
        diff: zA,
        major: XA,
        minor: KA,
        patch: JA,
        prerelease: QA,
        compare: ZA,
        rcompare: eC,
        compareLoose: tC,
        compareBuild: rC,
        sort: nC,
        rsort: iC,
        gt: sC,
        lt: oC,
        eq: aC,
        neq: lC,
        gte: uC,
        lte: cC,
        cmp: fC,
        coerce: hC,
        Comparator: dC,
        Range: pC,
        satisfies: mC,
        toComparators: gC,
        maxSatisfying: wC,
        minSatisfying: yC,
        minVersion: EC,
        validRange: _C,
        outside: vC,
        gtr: SC,
        ltr: AC,
        intersects: CC,
        simplifyRange: TC,
        subset: bC,
        SemVer: HA,
        re: Jo.re,
        src: Jo.src,
        tokens: Jo.t,
        SEMVER_SPEC_VERSION: pp.SEMVER_SPEC_VERSION,
        RELEASE_TYPES: pp.RELEASE_TYPES,
        compareIdentifiers: mp.compareIdentifiers,
        rcompareIdentifiers: mp.rcompareIdentifiers
    };
});
var Jp = g((gn, _r) => {
    var OC = 200,
        ua = "__lodash_hash_undefined__",
        Ui = 1,
        xp = 2,
        Np = 9007199254740991,
        Ri = "[object Arguments]",
        ra = "[object Array]",
        xC = "[object AsyncFunction]",
        Ip = "[object Boolean]",
        Rp = "[object Date]",
        Dp = "[object Error]",
        Pp = "[object Function]",
        NC = "[object GeneratorFunction]",
        Di = "[object Map]",
        Fp = "[object Number]",
        IC = "[object Null]",
        Er = "[object Object]",
        wp = "[object Promise]",
        RC = "[object Proxy]",
        qp = "[object RegExp]",
        Pi = "[object Set]",
        Lp = "[object String]",
        DC = "[object Symbol]",
        PC = "[object Undefined]",
        na = "[object WeakMap]",
        $p = "[object ArrayBuffer]",
        Fi = "[object DataView]",
        FC = "[object Float32Array]",
        qC = "[object Float64Array]",
        LC = "[object Int8Array]",
        $C = "[object Int16Array]",
        UC = "[object Int32Array]",
        kC = "[object Uint8Array]",
        MC = "[object Uint8ClampedArray]",
        BC = "[object Uint16Array]",
        jC = "[object Uint32Array]",
        HC = /[\\^$.*+?()[\]{}|]/g,
        WC = /^\[object .+?Constructor\]$/,
        GC = /^(?:0|[1-9]\d*)$/,
        J = {};
    J[FC] = J[qC] = J[LC] = J[$C] = J[UC] = J[kC] = J[MC] = J[BC] = J[jC] = !0;
    J[Ri] = J[ra] = J[$p] = J[Ip] = J[Fi] = J[Rp] = J[Dp] = J[Pp] = J[Di] = J[Fp] = J[Er] = J[qp] = J[Pi] = J[Lp] = J[na] = !1;
    var Up = typeof global == "object" && global && global.Object === Object && global,
        VC = typeof self == "object" && self && self.Object === Object && self,
        st = Up || VC || Function("return this")(),
        kp = typeof gn == "object" && gn && !gn.nodeType && gn,
        yp = kp && typeof _r == "object" && _r && !_r.nodeType && _r,
        Mp = yp && yp.exports === kp,
        Zo = Mp && Up.process,
        Ep = (function () {
            try {
                return Zo && Zo.binding && Zo.binding("util");
            } catch {}
        })(),
        _p = Ep && Ep.isTypedArray;
    function YC(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length, i = 0, s = []; ++r < n; ) {
            var o = e[r];
            t(o, r, e) && (s[i++] = o);
        }
        return s;
    }
    function zC(e, t) {
        for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
        return e;
    }
    function XC(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length; ++r < n; ) if (t(e[r], r, e)) return !0;
        return !1;
    }
    function KC(e, t) {
        for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
        return n;
    }
    function JC(e) {
        return function (t) {
            return e(t);
        };
    }
    function QC(e, t) {
        return e.has(t);
    }
    function ZC(e, t) {
        return e?.[t];
    }
    function eT(e) {
        var t = -1,
            r = Array(e.size);
        return (
            e.forEach(function (n, i) {
                r[++t] = [i, n];
            }),
            r
        );
    }
    function tT(e, t) {
        return function (r) {
            return e(t(r));
        };
    }
    function rT(e) {
        var t = -1,
            r = Array(e.size);
        return (
            e.forEach(function (n) {
                r[++t] = n;
            }),
            r
        );
    }
    var nT = Array.prototype,
        iT = Function.prototype,
        ki = Object.prototype,
        ea = st["__core-js_shared__"],
        Bp = iT.toString,
        Qe = ki.hasOwnProperty,
        vp = (function () {
            var e = /[^.]+$/.exec((ea && ea.keys && ea.keys.IE_PROTO) || "");
            return e ? "Symbol(src)_1." + e : "";
        })(),
        jp = ki.toString,
        sT = RegExp(
            "^" +
                Bp.call(Qe)
                    .replace(HC, "\\$&")
                    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") +
                "$"
        ),
        Sp = Mp ? st.Buffer : void 0,
        qi = st.Symbol,
        Ap = st.Uint8Array,
        Hp = ki.propertyIsEnumerable,
        oT = nT.splice,
        kt = qi ? qi.toStringTag : void 0,
        Cp = Object.getOwnPropertySymbols,
        aT = Sp ? Sp.isBuffer : void 0,
        lT = tT(Object.keys, Object),
        ia = vr(st, "DataView"),
        wn = vr(st, "Map"),
        sa = vr(st, "Promise"),
        oa = vr(st, "Set"),
        aa = vr(st, "WeakMap"),
        yn = vr(Object, "create"),
        uT = jt(ia),
        cT = jt(wn),
        fT = jt(sa),
        hT = jt(oa),
        dT = jt(aa),
        Tp = qi ? qi.prototype : void 0,
        ta = Tp ? Tp.valueOf : void 0;
    function Mt(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function pT() {
        (this.__data__ = yn ? yn(null) : {}), (this.size = 0);
    }
    function mT(e) {
        var t = this.has(e) && delete this.__data__[e];
        return (this.size -= t ? 1 : 0), t;
    }
    function gT(e) {
        var t = this.__data__;
        if (yn) {
            var r = t[e];
            return r === ua ? void 0 : r;
        }
        return Qe.call(t, e) ? t[e] : void 0;
    }
    function wT(e) {
        var t = this.__data__;
        return yn ? t[e] !== void 0 : Qe.call(t, e);
    }
    function yT(e, t) {
        var r = this.__data__;
        return (this.size += this.has(e) ? 0 : 1), (r[e] = yn && t === void 0 ? ua : t), this;
    }
    Mt.prototype.clear = pT;
    Mt.prototype.delete = mT;
    Mt.prototype.get = gT;
    Mt.prototype.has = wT;
    Mt.prototype.set = yT;
    function ot(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function ET() {
        (this.__data__ = []), (this.size = 0);
    }
    function _T(e) {
        var t = this.__data__,
            r = Mi(t, e);
        if (r < 0) return !1;
        var n = t.length - 1;
        return r == n ? t.pop() : oT.call(t, r, 1), --this.size, !0;
    }
    function vT(e) {
        var t = this.__data__,
            r = Mi(t, e);
        return r < 0 ? void 0 : t[r][1];
    }
    function ST(e) {
        return Mi(this.__data__, e) > -1;
    }
    function AT(e, t) {
        var r = this.__data__,
            n = Mi(r, e);
        return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    ot.prototype.clear = ET;
    ot.prototype.delete = _T;
    ot.prototype.get = vT;
    ot.prototype.has = ST;
    ot.prototype.set = AT;
    function Bt(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function CT() {
        (this.size = 0), (this.__data__ = { hash: new Mt(), map: new (wn || ot)(), string: new Mt() });
    }
    function TT(e) {
        var t = Bi(this, e).delete(e);
        return (this.size -= t ? 1 : 0), t;
    }
    function bT(e) {
        return Bi(this, e).get(e);
    }
    function OT(e) {
        return Bi(this, e).has(e);
    }
    function xT(e, t) {
        var r = Bi(this, e),
            n = r.size;
        return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    Bt.prototype.clear = CT;
    Bt.prototype.delete = TT;
    Bt.prototype.get = bT;
    Bt.prototype.has = OT;
    Bt.prototype.set = xT;
    function Li(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.__data__ = new Bt(); ++t < r; ) this.add(e[t]);
    }
    function NT(e) {
        return this.__data__.set(e, ua), this;
    }
    function IT(e) {
        return this.__data__.has(e);
    }
    Li.prototype.add = Li.prototype.push = NT;
    Li.prototype.has = IT;
    function _t(e) {
        var t = (this.__data__ = new ot(e));
        this.size = t.size;
    }
    function RT() {
        (this.__data__ = new ot()), (this.size = 0);
    }
    function DT(e) {
        var t = this.__data__,
            r = t.delete(e);
        return (this.size = t.size), r;
    }
    function PT(e) {
        return this.__data__.get(e);
    }
    function FT(e) {
        return this.__data__.has(e);
    }
    function qT(e, t) {
        var r = this.__data__;
        if (r instanceof ot) {
            var n = r.__data__;
            if (!wn || n.length < OC - 1) return n.push([e, t]), (this.size = ++r.size), this;
            r = this.__data__ = new Bt(n);
        }
        return r.set(e, t), (this.size = r.size), this;
    }
    _t.prototype.clear = RT;
    _t.prototype.delete = DT;
    _t.prototype.get = PT;
    _t.prototype.has = FT;
    _t.prototype.set = qT;
    function LT(e, t) {
        var r = $i(e),
            n = !r && JT(e),
            i = !r && !n && la(e),
            s = !r && !n && !i && Kp(e),
            o = r || n || i || s,
            a = o ? KC(e.length, String) : [],
            l = a.length;
        for (var d in e)
            (t || Qe.call(e, d)) &&
                !(
                    o &&
                    (d == "length" ||
                        (i && (d == "offset" || d == "parent")) ||
                        (s && (d == "buffer" || d == "byteLength" || d == "byteOffset")) ||
                        VT(d, l))
                ) &&
                a.push(d);
        return a;
    }
    function Mi(e, t) {
        for (var r = e.length; r--; ) if (Vp(e[r][0], t)) return r;
        return -1;
    }
    function $T(e, t, r) {
        var n = t(e);
        return $i(e) ? n : zC(n, r(e));
    }
    function _n(e) {
        return e == null ? (e === void 0 ? PC : IC) : kt && kt in Object(e) ? WT(e) : KT(e);
    }
    function bp(e) {
        return En(e) && _n(e) == Ri;
    }
    function Wp(e, t, r, n, i) {
        return e === t ? !0 : e == null || t == null || (!En(e) && !En(t)) ? e !== e && t !== t : UT(e, t, r, n, Wp, i);
    }
    function UT(e, t, r, n, i, s) {
        var o = $i(e),
            a = $i(t),
            l = o ? ra : Et(e),
            d = a ? ra : Et(t);
        (l = l == Ri ? Er : l), (d = d == Ri ? Er : d);
        var c = l == Er,
            f = d == Er,
            m = l == d;
        if (m && la(e)) {
            if (!la(t)) return !1;
            (o = !0), (c = !1);
        }
        if (m && !c) return s || (s = new _t()), o || Kp(e) ? Gp(e, t, r, n, i, s) : jT(e, t, l, r, n, i, s);
        if (!(r & Ui)) {
            var p = c && Qe.call(e, "__wrapped__"),
                _ = f && Qe.call(t, "__wrapped__");
            if (p || _) {
                var v = p ? e.value() : e,
                    S = _ ? t.value() : t;
                return s || (s = new _t()), i(v, S, r, n, s);
            }
        }
        return m ? (s || (s = new _t()), HT(e, t, r, n, i, s)) : !1;
    }
    function kT(e) {
        if (!Xp(e) || zT(e)) return !1;
        var t = Yp(e) ? sT : WC;
        return t.test(jt(e));
    }
    function MT(e) {
        return En(e) && zp(e.length) && !!J[_n(e)];
    }
    function BT(e) {
        if (!XT(e)) return lT(e);
        var t = [];
        for (var r in Object(e)) Qe.call(e, r) && r != "constructor" && t.push(r);
        return t;
    }
    function Gp(e, t, r, n, i, s) {
        var o = r & Ui,
            a = e.length,
            l = t.length;
        if (a != l && !(o && l > a)) return !1;
        var d = s.get(e);
        if (d && s.get(t)) return d == t;
        var c = -1,
            f = !0,
            m = r & xp ? new Li() : void 0;
        for (s.set(e, t), s.set(t, e); ++c < a; ) {
            var p = e[c],
                _ = t[c];
            if (n) var v = o ? n(_, p, c, t, e, s) : n(p, _, c, e, t, s);
            if (v !== void 0) {
                if (v) continue;
                f = !1;
                break;
            }
            if (m) {
                if (
                    !XC(t, function (S, T) {
                        if (!QC(m, T) && (p === S || i(p, S, r, n, s))) return m.push(T);
                    })
                ) {
                    f = !1;
                    break;
                }
            } else if (!(p === _ || i(p, _, r, n, s))) {
                f = !1;
                break;
            }
        }
        return s.delete(e), s.delete(t), f;
    }
    function jT(e, t, r, n, i, s, o) {
        switch (r) {
            case Fi:
                if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
                (e = e.buffer), (t = t.buffer);
            case $p:
                return !(e.byteLength != t.byteLength || !s(new Ap(e), new Ap(t)));
            case Ip:
            case Rp:
            case Fp:
                return Vp(+e, +t);
            case Dp:
                return e.name == t.name && e.message == t.message;
            case qp:
            case Lp:
                return e == t + "";
            case Di:
                var a = eT;
            case Pi:
                var l = n & Ui;
                if ((a || (a = rT), e.size != t.size && !l)) return !1;
                var d = o.get(e);
                if (d) return d == t;
                (n |= xp), o.set(e, t);
                var c = Gp(a(e), a(t), n, i, s, o);
                return o.delete(e), c;
            case DC:
                if (ta) return ta.call(e) == ta.call(t);
        }
        return !1;
    }
    function HT(e, t, r, n, i, s) {
        var o = r & Ui,
            a = Op(e),
            l = a.length,
            d = Op(t),
            c = d.length;
        if (l != c && !o) return !1;
        for (var f = l; f--; ) {
            var m = a[f];
            if (!(o ? m in t : Qe.call(t, m))) return !1;
        }
        var p = s.get(e);
        if (p && s.get(t)) return p == t;
        var _ = !0;
        s.set(e, t), s.set(t, e);
        for (var v = o; ++f < l; ) {
            m = a[f];
            var S = e[m],
                T = t[m];
            if (n) var C = o ? n(T, S, m, t, e, s) : n(S, T, m, e, t, s);
            if (!(C === void 0 ? S === T || i(S, T, r, n, s) : C)) {
                _ = !1;
                break;
            }
            v || (v = m == "constructor");
        }
        if (_ && !v) {
            var I = e.constructor,
                L = t.constructor;
            I != L &&
                "constructor" in e &&
                "constructor" in t &&
                !(typeof I == "function" && I instanceof I && typeof L == "function" && L instanceof L) &&
                (_ = !1);
        }
        return s.delete(e), s.delete(t), _;
    }
    function Op(e) {
        return $T(e, eb, GT);
    }
    function Bi(e, t) {
        var r = e.__data__;
        return YT(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    function vr(e, t) {
        var r = ZC(e, t);
        return kT(r) ? r : void 0;
    }
    function WT(e) {
        var t = Qe.call(e, kt),
            r = e[kt];
        try {
            e[kt] = void 0;
            var n = !0;
        } catch {}
        var i = jp.call(e);
        return n && (t ? (e[kt] = r) : delete e[kt]), i;
    }
    var GT = Cp
            ? function (e) {
                  return e == null
                      ? []
                      : ((e = Object(e)),
                        YC(Cp(e), function (t) {
                            return Hp.call(e, t);
                        }));
              }
            : tb,
        Et = _n;
    ((ia && Et(new ia(new ArrayBuffer(1))) != Fi) ||
        (wn && Et(new wn()) != Di) ||
        (sa && Et(sa.resolve()) != wp) ||
        (oa && Et(new oa()) != Pi) ||
        (aa && Et(new aa()) != na)) &&
        (Et = function (e) {
            var t = _n(e),
                r = t == Er ? e.constructor : void 0,
                n = r ? jt(r) : "";
            if (n)
                switch (n) {
                    case uT:
                        return Fi;
                    case cT:
                        return Di;
                    case fT:
                        return wp;
                    case hT:
                        return Pi;
                    case dT:
                        return na;
                }
            return t;
        });
    function VT(e, t) {
        return (t = t ?? Np), !!t && (typeof e == "number" || GC.test(e)) && e > -1 && e % 1 == 0 && e < t;
    }
    function YT(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
    }
    function zT(e) {
        return !!vp && vp in e;
    }
    function XT(e) {
        var t = e && e.constructor,
            r = (typeof t == "function" && t.prototype) || ki;
        return e === r;
    }
    function KT(e) {
        return jp.call(e);
    }
    function jt(e) {
        if (e != null) {
            try {
                return Bp.call(e);
            } catch {}
            try {
                return e + "";
            } catch {}
        }
        return "";
    }
    function Vp(e, t) {
        return e === t || (e !== e && t !== t);
    }
    var JT = bp(
            (function () {
                return arguments;
            })()
        )
            ? bp
            : function (e) {
                  return En(e) && Qe.call(e, "callee") && !Hp.call(e, "callee");
              },
        $i = Array.isArray;
    function QT(e) {
        return e != null && zp(e.length) && !Yp(e);
    }
    var la = aT || rb;
    function ZT(e, t) {
        return Wp(e, t);
    }
    function Yp(e) {
        if (!Xp(e)) return !1;
        var t = _n(e);
        return t == Pp || t == NC || t == xC || t == RC;
    }
    function zp(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Np;
    }
    function Xp(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
    }
    function En(e) {
        return e != null && typeof e == "object";
    }
    var Kp = _p ? JC(_p) : MT;
    function eb(e) {
        return QT(e) ? LT(e) : BT(e);
    }
    function tb() {
        return [];
    }
    function rb() {
        return !1;
    }
    _r.exports = ZT;
});
var Zp = g(Sn => {
    "use strict";
    Object.defineProperty(Sn, "__esModule", { value: !0 });
    Sn.DownloadedUpdateHelper = void 0;
    Sn.createTempUpdateFile = ob;
    var nb = require("crypto"),
        ib = require("fs"),
        Qp = Jp(),
        Ht = nt(),
        vn = require("path"),
        ca = class {
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
                return vn.join(this.cacheDir, "pending");
            }
            async validateDownloadedPath(t, r, n, i) {
                if (this.versionInfo != null && this.file === t && this.fileInfo != null)
                    return Qp(this.versionInfo, r) && Qp(this.fileInfo.info, n.info) && (await (0, Ht.pathExists)(t)) ? t : null;
                let s = await this.getValidCachedUpdateFile(n, i);
                return s === null
                    ? null
                    : (i.info("Update has already been downloaded to ".concat(t, ").")), (this._file = s), s);
            }
            async setDownloadedFile(t, r, n, i, s, o) {
                (this._file = t),
                    (this._packageFile = r),
                    (this.versionInfo = n),
                    (this.fileInfo = i),
                    (this._downloadedFileInfo = {
                        fileName: s,
                        sha512: i.info.sha512,
                        isAdminRightsRequired: i.info.isAdminRightsRequired === !0
                    }),
                    o && (await (0, Ht.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo));
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
                    await (0, Ht.emptyDir)(this.cacheDirForPendingUpdate);
                } catch {}
            }
            async getValidCachedUpdateFile(t, r) {
                let n = this.getUpdateInfoFile();
                if (!(await (0, Ht.pathExists)(n))) return null;
                let s;
                try {
                    s = await (0, Ht.readJson)(n);
                } catch (d) {
                    let c = "No cached update info available";
                    return (
                        d.code !== "ENOENT" &&
                            (await this.cleanCacheDirForPendingUpdate(), (c += " (error on read: ".concat(d.message, ")"))),
                        r.info(c),
                        null
                    );
                }
                if (!(s?.fileName !== null))
                    return (
                        r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"),
                        await this.cleanCacheDirForPendingUpdate(),
                        null
                    );
                if (t.info.sha512 !== s.sha512)
                    return (
                        r.info(
                            "Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: "
                                .concat(s.sha512, ", expected: ")
                                .concat(t.info.sha512, ". Directory for cached update will be cleaned")
                        ),
                        await this.cleanCacheDirForPendingUpdate(),
                        null
                    );
                let a = vn.join(this.cacheDirForPendingUpdate, s.fileName);
                if (!(await (0, Ht.pathExists)(a))) return r.info("Cached update file doesn't exist"), null;
                let l = await sb(a);
                return t.info.sha512 !== l
                    ? (r.warn(
                          "Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: "
                              .concat(l, ", expected: ")
                              .concat(t.info.sha512)
                      ),
                      await this.cleanCacheDirForPendingUpdate(),
                      null)
                    : ((this._downloadedFileInfo = s), a);
            }
            getUpdateInfoFile() {
                return vn.join(this.cacheDirForPendingUpdate, "update-info.json");
            }
        };
    Sn.DownloadedUpdateHelper = ca;
    function sb(e, t = "sha512", r = "base64", n) {
        return new Promise((i, s) => {
            let o = (0, nb.createHash)(t);
            o.on("error", s).setEncoding(r),
                (0, ib.createReadStream)(e, { ...n, highWaterMark: 1024 * 1024 })
                    .on("error", s)
                    .on("end", () => {
                        o.end(), i(o.read());
                    })
                    .pipe(o, { end: !1 });
        });
    }
    async function ob(e, t, r) {
        let n = 0,
            i = vn.join(t, e);
        for (let s = 0; s < 3; s++)
            try {
                return await (0, Ht.unlink)(i), i;
            } catch (o) {
                if (o.code === "ENOENT") return i;
                r.warn("Error on remove temp update file: ".concat(o)), (i = vn.join(t, "".concat(n++, "-").concat(e)));
            }
        return i;
    }
});
var em = g(ha => {
    "use strict";
    Object.defineProperty(ha, "__esModule", { value: !0 });
    ha.getAppCacheDir = lb;
    var fa = require("path"),
        ab = require("os");
    function lb() {
        let e = (0, ab.homedir)(),
            t;
        return (
            process.platform === "win32"
                ? (t = process.env.LOCALAPPDATA || fa.join(e, "AppData", "Local"))
                : process.platform === "darwin"
                ? (t = fa.join(e, "Library", "Caches"))
                : (t = process.env.XDG_CACHE_HOME || fa.join(e, ".cache")),
            t
        );
    }
});
var rm = g(ji => {
    "use strict";
    Object.defineProperty(ji, "__esModule", { value: !0 });
    ji.ElectronAppAdapter = void 0;
    var tm = require("path"),
        ub = em(),
        da = class {
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
                    ? tm.join(process.resourcesPath, "app-update.yml")
                    : tm.join(this.app.getAppPath(), "dev-app-update.yml");
            }
            get userDataPath() {
                return this.app.getPath("userData");
            }
            get baseCachePath() {
                return (0, ub.getAppCacheDir)();
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
    ji.ElectronAppAdapter = da;
});
var im = g(vt => {
    "use strict";
    Object.defineProperty(vt, "__esModule", { value: !0 });
    vt.ElectronHttpExecutor = vt.NET_SESSION_NAME = void 0;
    vt.getNetSession = nm;
    var Hi = ce();
    vt.NET_SESSION_NAME = "electron-updater";
    function nm() {
        return require("electron").session.fromPartition(vt.NET_SESSION_NAME, { cache: !1 });
    }
    var pa = class extends Hi.HttpExecutor {
        constructor(t) {
            super(), (this.proxyLoginCallback = t), (this.cachedSession = null);
        }
        async download(t, r, n) {
            return await n.cancellationToken.createPromise((i, s, o) => {
                let a = { headers: n.headers || void 0, redirect: "manual" };
                (0, Hi.configureRequestUrl)(t, a),
                    (0, Hi.configureRequestOptions)(a),
                    this.doDownload(
                        a,
                        {
                            destination: r,
                            options: n,
                            onCancel: o,
                            callback: l => {
                                l == null ? i(r) : s(l);
                            },
                            responseHandler: null
                        },
                        0
                    );
            });
        }
        createRequest(t, r) {
            t.headers && t.headers.Host && ((t.host = t.headers.Host), delete t.headers.Host),
                this.cachedSession == null && (this.cachedSession = nm());
            let n = require("electron").net.request({ ...t, session: this.cachedSession });
            return n.on("response", r), this.proxyLoginCallback != null && n.on("login", this.proxyLoginCallback), n;
        }
        addRedirectHandlers(t, r, n, i, s) {
            t.on("redirect", (o, a, l) => {
                t.abort(),
                    i > this.maxRedirects ? n(this.createMaxRedirectError()) : s(Hi.HttpExecutor.prepareRedirectUrlOptions(l, r));
            });
        }
    };
    vt.ElectronHttpExecutor = pa;
});
var cm = g((oR, um) => {
    var cb = 1 / 0,
        fb = "[object Symbol]",
        lm = /[\\^$.*+?()[\]{}|]/g,
        hb = RegExp(lm.source),
        db = typeof global == "object" && global && global.Object === Object && global,
        pb = typeof self == "object" && self && self.Object === Object && self,
        mb = db || pb || Function("return this")(),
        gb = Object.prototype,
        wb = gb.toString,
        sm = mb.Symbol,
        om = sm ? sm.prototype : void 0,
        am = om ? om.toString : void 0;
    function yb(e) {
        if (typeof e == "string") return e;
        if (_b(e)) return am ? am.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -cb ? "-0" : t;
    }
    function Eb(e) {
        return !!e && typeof e == "object";
    }
    function _b(e) {
        return typeof e == "symbol" || (Eb(e) && wb.call(e) == fb);
    }
    function vb(e) {
        return e == null ? "" : yb(e);
    }
    function Sb(e) {
        return (e = vb(e)), e && hb.test(e) ? e.replace(lm, "\\$&") : e;
    }
    um.exports = Sb;
});
var St = g(Sr => {
    "use strict";
    Object.defineProperty(Sr, "__esModule", { value: !0 });
    Sr.newBaseUrl = Cb;
    Sr.newUrlFromBase = ma;
    Sr.getChannelFilename = Tb;
    Sr.blockmapFiles = bb;
    var fm = require("url"),
        Ab = cm();
    function Cb(e) {
        let t = new fm.URL(e);
        return t.pathname.endsWith("/") || (t.pathname += "/"), t;
    }
    function ma(e, t, r = !1) {
        let n = new fm.URL(e, t),
            i = t.search;
        return i != null && i.length !== 0 ? (n.search = i) : r && (n.search = "noCache=".concat(Date.now().toString(32))), n;
    }
    function Tb(e) {
        return "".concat(e, ".yml");
    }
    function bb(e, t, r) {
        let n = ma("".concat(e.pathname, ".blockmap"), e);
        return [ma("".concat(e.pathname.replace(new RegExp(Ab(r), "g"), t), ".blockmap"), e), n];
    }
});
var Be = g(Ct => {
    "use strict";
    Object.defineProperty(Ct, "__esModule", { value: !0 });
    Ct.Provider = void 0;
    Ct.findFile = xb;
    Ct.parseUpdateInfo = Nb;
    Ct.getFileList = dm;
    Ct.resolveFiles = Ib;
    var At = ce(),
        Ob = yi(),
        hm = St(),
        ga = class {
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
                    (0, At.configureRequestUrl)(t, n),
                    n
                );
            }
        };
    Ct.Provider = ga;
    function xb(e, t, r) {
        if (e.length === 0) throw (0, At.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
        let n = e.find(i => i.url.pathname.toLowerCase().endsWith(".".concat(t)));
        return n ?? (r == null ? e[0] : e.find(i => !r.some(s => i.url.pathname.toLowerCase().endsWith(".".concat(s)))));
    }
    function Nb(e, t, r) {
        if (e == null)
            throw (0, At.newError)(
                "Cannot parse update info from ".concat(t, " in the latest release artifacts (").concat(r, "): rawData: null"),
                "ERR_UPDATER_INVALID_UPDATE_INFO"
            );
        let n;
        try {
            n = (0, Ob.load)(e);
        } catch (i) {
            throw (0, At.newError)(
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
    function dm(e) {
        let t = e.files;
        if (t != null && t.length > 0) return t;
        if (e.path != null) return [{ url: e.path, sha2: e.sha2, sha512: e.sha512 }];
        throw (0, At.newError)("No files provided: ".concat((0, At.safeStringifyJson)(e)), "ERR_UPDATER_NO_FILES_PROVIDED");
    }
    function Ib(e, t, r = n => n) {
        let i = dm(e).map(a => {
                if (a.sha2 == null && a.sha512 == null)
                    throw (0, At.newError)(
                        "Update info doesn't contain nor sha256 neither sha512 checksum: ".concat((0, At.safeStringifyJson)(a)),
                        "ERR_UPDATER_NO_CHECKSUM"
                    );
                return { url: (0, hm.newUrlFromBase)(r(a.url), t), info: a };
            }),
            s = e.packages,
            o = s == null ? null : s[process.arch] || s.ia32;
        return o != null && (i[0].packageInfo = { ...o, path: (0, hm.newUrlFromBase)(r(o.path), t).href }), i;
    }
});
var _a = g(Wi => {
    "use strict";
    Object.defineProperty(Wi, "__esModule", { value: !0 });
    Wi.GenericProvider = void 0;
    var pm = ce(),
        wa = St(),
        ya = Be(),
        Ea = class extends ya.Provider {
            constructor(t, r, n) {
                super(n),
                    (this.configuration = t),
                    (this.updater = r),
                    (this.baseUrl = (0, wa.newBaseUrl)(this.configuration.url));
            }
            get channel() {
                let t = this.updater.channel || this.configuration.channel;
                return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
            }
            async getLatestVersion() {
                let t = (0, wa.getChannelFilename)(this.channel),
                    r = (0, wa.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
                for (let n = 0; ; n++)
                    try {
                        return (0, ya.parseUpdateInfo)(await this.httpRequest(r), t, r);
                    } catch (i) {
                        if (i instanceof pm.HttpError && i.statusCode === 404)
                            throw (0, pm.newError)(
                                'Cannot find channel "'.concat(t, '" update info: ').concat(i.stack || i.message),
                                "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                            );
                        if (i.code === "ECONNREFUSED" && n < 3) {
                            await new Promise((s, o) => {
                                try {
                                    setTimeout(s, 1e3 * n);
                                } catch (a) {
                                    o(a);
                                }
                            });
                            continue;
                        }
                        throw i;
                    }
            }
            resolveFiles(t) {
                return (0, ya.resolveFiles)(t, this.baseUrl);
            }
        };
    Wi.GenericProvider = Ea;
});
var gm = g(Gi => {
    "use strict";
    Object.defineProperty(Gi, "__esModule", { value: !0 });
    Gi.BitbucketProvider = void 0;
    var mm = ce(),
        va = St(),
        Sa = Be(),
        Aa = class extends Sa.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }), (this.configuration = t), (this.updater = r);
                let { owner: i, slug: s } = t;
                this.baseUrl = (0, va.newBaseUrl)(
                    "https://api.bitbucket.org/2.0/repositories/".concat(i, "/").concat(s, "/downloads")
                );
            }
            get channel() {
                return this.updater.channel || this.configuration.channel || "latest";
            }
            async getLatestVersion() {
                let t = new mm.CancellationToken(),
                    r = (0, va.getChannelFilename)(this.getCustomChannelName(this.channel)),
                    n = (0, va.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
                try {
                    let i = await this.httpRequest(n, void 0, t);
                    return (0, Sa.parseUpdateInfo)(i, r, n);
                } catch (i) {
                    throw (0, mm.newError)(
                        "Unable to find latest version on "
                            .concat(this.toString(), ", please ensure release exists: ")
                            .concat(i.stack || i.message),
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            resolveFiles(t) {
                return (0, Sa.resolveFiles)(t, this.baseUrl);
            }
            toString() {
                let { owner: t, slug: r } = this.configuration;
                return "Bitbucket (owner: ".concat(t, ", slug: ").concat(r, ", channel: ").concat(this.channel, ")");
            }
        };
    Gi.BitbucketProvider = Aa;
});
var Oa = g(Wt => {
    "use strict";
    Object.defineProperty(Wt, "__esModule", { value: !0 });
    Wt.GitHubProvider = Wt.BaseGitHubProvider = void 0;
    Wt.computeReleaseNotes = ym;
    var at = ce(),
        Ar = Qo(),
        Rb = require("url"),
        Cr = St(),
        Ta = Be(),
        Ca = /\/tag\/([^/]+)$/,
        Vi = class extends Ta.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }),
                    (this.options = t),
                    (this.baseUrl = (0, Cr.newBaseUrl)((0, at.githubUrl)(t, r)));
                let i = r === "github.com" ? "api.github.com" : r;
                this.baseApiUrl = (0, Cr.newBaseUrl)((0, at.githubUrl)(t, i));
            }
            computeGithubBasePath(t) {
                let r = this.options.host;
                return r && !["github.com", "api.github.com"].includes(r) ? "/api/v3".concat(t) : t;
            }
        };
    Wt.BaseGitHubProvider = Vi;
    var ba = class extends Vi {
        constructor(t, r, n) {
            super(t, "github.com", n), (this.options = t), (this.updater = r);
        }
        get channel() {
            let t = this.updater.channel || this.options.channel;
            return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
        }
        async getLatestVersion() {
            var t, r, n, i, s;
            let o = new at.CancellationToken(),
                a = await this.httpRequest(
                    (0, Cr.newUrlFromBase)("".concat(this.basePath, ".atom"), this.baseUrl),
                    { accept: "application/xml, application/atom+xml, text/xml, */*" },
                    o
                ),
                l = (0, at.parseXml)(a),
                d = l.element("entry", !1, "No published versions on GitHub"),
                c = null;
            try {
                if (this.updater.allowPrerelease) {
                    let S =
                        ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) ||
                        ((r = Ar.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) ||
                        null;
                    if (S === null) c = Ca.exec(d.element("link").attribute("href"))[1];
                    else
                        for (let T of l.getElements("entry")) {
                            let C = Ca.exec(T.element("link").attribute("href"));
                            if (C === null) continue;
                            let I = C[1],
                                L = ((n = Ar.prerelease(I)) === null || n === void 0 ? void 0 : n[0]) || null,
                                $e = !S || ["alpha", "beta"].includes(S),
                                X = L !== null && !["alpha", "beta"].includes(String(L));
                            if ($e && !X && !(S === "beta" && L === "alpha")) {
                                c = I;
                                break;
                            }
                            if (L && L === S) {
                                c = I;
                                break;
                            }
                        }
                } else {
                    c = await this.getLatestTagName(o);
                    for (let S of l.getElements("entry"))
                        if (Ca.exec(S.element("link").attribute("href"))[1] === c) {
                            d = S;
                            break;
                        }
                }
            } catch (S) {
                throw (0, at.newError)(
                    "Cannot parse releases feed: ".concat(S.stack || S.message, ",\nXML:\n").concat(a),
                    "ERR_UPDATER_INVALID_RELEASE_FEED"
                );
            }
            if (c == null) throw (0, at.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
            let f,
                m = "",
                p = "",
                _ = async S => {
                    (m = (0, Cr.getChannelFilename)(S)),
                        (p = (0, Cr.newUrlFromBase)(this.getBaseDownloadPath(String(c), m), this.baseUrl));
                    let T = this.createRequestOptions(p);
                    try {
                        return await this.executor.request(T, o);
                    } catch (C) {
                        throw C instanceof at.HttpError && C.statusCode === 404
                            ? (0, at.newError)(
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
                let S = this.channel;
                this.updater.allowPrerelease &&
                    !((i = Ar.prerelease(c)) === null || i === void 0) &&
                    i[0] &&
                    (S = this.getCustomChannelName(String((s = Ar.prerelease(c)) === null || s === void 0 ? void 0 : s[0]))),
                    (f = await _(S));
            } catch (S) {
                if (this.updater.allowPrerelease) f = await _(this.getDefaultChannelName());
                else throw S;
            }
            let v = (0, Ta.parseUpdateInfo)(f, m, p);
            return (
                v.releaseName == null && (v.releaseName = d.elementValueOrEmpty("title")),
                v.releaseNotes == null && (v.releaseNotes = ym(this.updater.currentVersion, this.updater.fullChangelog, l, d)),
                { tag: c, ...v }
            );
        }
        async getLatestTagName(t) {
            let r = this.options,
                n =
                    r.host == null || r.host === "github.com"
                        ? (0, Cr.newUrlFromBase)("".concat(this.basePath, "/latest"), this.baseUrl)
                        : new Rb.URL(
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
                throw (0, at.newError)(
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
            return (0, Ta.resolveFiles)(t, this.baseUrl, r => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
        }
        getBaseDownloadPath(t, r) {
            return "".concat(this.basePath, "/download/").concat(t, "/").concat(r);
        }
    };
    Wt.GitHubProvider = ba;
    function wm(e) {
        let t = e.elementValueOrEmpty("content");
        return t === "No content." ? "" : t;
    }
    function ym(e, t, r, n) {
        if (!t) return wm(n);
        let i = [];
        for (let s of r.getElements("entry")) {
            let o = /\/tag\/v?([^/]+)$/.exec(s.element("link").attribute("href"))[1];
            Ar.lt(e, o) && i.push({ version: o, note: wm(s) });
        }
        return i.sort((s, o) => Ar.rcompare(s.version, o.version));
    }
});
var _m = g(Yi => {
    "use strict";
    Object.defineProperty(Yi, "__esModule", { value: !0 });
    Yi.KeygenProvider = void 0;
    var Em = ce(),
        xa = St(),
        Na = Be(),
        Ia = class extends Na.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }),
                    (this.configuration = t),
                    (this.updater = r),
                    (this.baseUrl = (0, xa.newBaseUrl)(
                        "https://api.keygen.sh/v1/accounts/"
                            .concat(this.configuration.account, "/artifacts?product=")
                            .concat(this.configuration.product)
                    ));
            }
            get channel() {
                return this.updater.channel || this.configuration.channel || "stable";
            }
            async getLatestVersion() {
                let t = new Em.CancellationToken(),
                    r = (0, xa.getChannelFilename)(this.getCustomChannelName(this.channel)),
                    n = (0, xa.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
                try {
                    let i = await this.httpRequest(n, { "Accept": "application/vnd.api+json", "Keygen-Version": "1.1" }, t);
                    return (0, Na.parseUpdateInfo)(i, r, n);
                } catch (i) {
                    throw (0, Em.newError)(
                        "Unable to find latest version on "
                            .concat(this.toString(), ", please ensure release exists: ")
                            .concat(i.stack || i.message),
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            resolveFiles(t) {
                return (0, Na.resolveFiles)(t, this.baseUrl);
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
    Yi.KeygenProvider = Ia;
});
var Am = g(zi => {
    "use strict";
    Object.defineProperty(zi, "__esModule", { value: !0 });
    zi.PrivateGitHubProvider = void 0;
    var Tr = ce(),
        Db = yi(),
        Pb = require("path"),
        vm = require("url"),
        Sm = St(),
        Fb = Oa(),
        qb = Be(),
        Ra = class extends Fb.BaseGitHubProvider {
            constructor(t, r, n, i) {
                super(t, "api.github.com", i), (this.updater = r), (this.token = n);
            }
            createRequestOptions(t, r) {
                let n = super.createRequestOptions(t, r);
                return (n.redirect = "manual"), n;
            }
            async getLatestVersion() {
                let t = new Tr.CancellationToken(),
                    r = (0, Sm.getChannelFilename)(this.getDefaultChannelName()),
                    n = await this.getLatestVersionInfo(t),
                    i = n.assets.find(a => a.name === r);
                if (i == null)
                    throw (0, Tr.newError)(
                        "Cannot find ".concat(r, " in the release ").concat(n.html_url || n.name),
                        "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                    );
                let s = new vm.URL(i.url),
                    o;
                try {
                    o = (0, Db.load)(await this.httpRequest(s, this.configureHeaders("application/octet-stream"), t));
                } catch (a) {
                    throw a instanceof Tr.HttpError && a.statusCode === 404
                        ? (0, Tr.newError)(
                              "Cannot find "
                                  .concat(r, " in the latest release artifacts (")
                                  .concat(s, "): ")
                                  .concat(a.stack || a.message),
                              "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                          )
                        : a;
                }
                return (o.assets = n.assets), o;
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
                let i = (0, Sm.newUrlFromBase)(n, this.baseUrl);
                try {
                    let s = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
                    return r ? s.find(o => o.prerelease) || s[0] : s;
                } catch (s) {
                    throw (0, Tr.newError)(
                        "Unable to find latest version on GitHub ("
                            .concat(i, "), please ensure a production release exists: ")
                            .concat(s.stack || s.message),
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
                return (0, qb.getFileList)(t).map(r => {
                    let n = Pb.posix.basename(r.url).replace(/ /g, "-"),
                        i = t.assets.find(s => s != null && s.name === n);
                    if (i == null)
                        throw (0, Tr.newError)(
                            'Cannot find asset "'.concat(n, '" in: ').concat(JSON.stringify(t.assets, null, 2)),
                            "ERR_UPDATER_ASSET_NOT_FOUND"
                        );
                    return { url: new vm.URL(i.url), info: r };
                });
            }
        };
    zi.PrivateGitHubProvider = Ra;
});
var bm = g(Ki => {
    "use strict";
    Object.defineProperty(Ki, "__esModule", { value: !0 });
    Ki.isUrlProbablySupportMultiRangeRequests = Tm;
    Ki.createClient = Mb;
    var Xi = ce(),
        Lb = gm(),
        Cm = _a(),
        $b = Oa(),
        Ub = _m(),
        kb = Am();
    function Tm(e) {
        return !e.includes("s3.amazonaws.com");
    }
    function Mb(e, t, r) {
        if (typeof e == "string")
            throw (0, Xi.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        let n = e.provider;
        switch (n) {
            case "github": {
                let i = e,
                    s = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
                return s == null ? new $b.GitHubProvider(i, t, r) : new kb.PrivateGitHubProvider(i, t, s, r);
            }
            case "bitbucket":
                return new Lb.BitbucketProvider(e, t, r);
            case "keygen":
                return new Ub.KeygenProvider(e, t, r);
            case "s3":
            case "spaces":
                return new Cm.GenericProvider(
                    { provider: "generic", url: (0, Xi.getS3LikeProviderBaseUrl)(e), channel: e.channel || null },
                    t,
                    { ...r, isUseMultipleRangeRequest: !1 }
                );
            case "generic": {
                let i = e;
                return new Cm.GenericProvider(i, t, {
                    ...r,
                    isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && Tm(i.url)
                });
            }
            case "custom": {
                let i = e,
                    s = i.updateProvider;
                if (!s) throw (0, Xi.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
                return new s(i, t, r);
            }
            default:
                throw (0, Xi.newError)("Unsupported provider: ".concat(n), "ERR_UPDATER_UNSUPPORTED_PROVIDER");
        }
    }
});
var Ji = g(An => {
    "use strict";
    Object.defineProperty(An, "__esModule", { value: !0 });
    An.OperationKind = void 0;
    An.computeOperations = Bb;
    var Gt;
    (function (e) {
        (e[(e.COPY = 0)] = "COPY"), (e[(e.DOWNLOAD = 1)] = "DOWNLOAD");
    })(Gt || (An.OperationKind = Gt = {}));
    function Bb(e, t, r) {
        let n = xm(e.files),
            i = xm(t.files),
            s = null,
            o = t.files[0],
            a = [],
            l = o.name,
            d = n.get(l);
        if (d == null) throw new Error("no file ".concat(l, " in old blockmap"));
        let c = i.get(l),
            f = 0,
            { checksumToOffset: m, checksumToOldSize: p } = Hb(n.get(l), d.offset, r),
            _ = o.offset;
        for (let v = 0; v < c.checksums.length; _ += c.sizes[v], v++) {
            let S = c.sizes[v],
                T = c.checksums[v],
                C = m.get(T);
            C != null &&
                p.get(T) !== S &&
                (r.warn(
                    'Checksum ("'.concat(T, '") matches, but size differs (old: ').concat(p.get(T), ", new: ").concat(S, ")")
                ),
                (C = void 0)),
                C === void 0
                    ? (f++,
                      s != null && s.kind === Gt.DOWNLOAD && s.end === _
                          ? (s.end += S)
                          : ((s = { kind: Gt.DOWNLOAD, start: _, end: _ + S }), Om(s, a, T, v)))
                    : s != null && s.kind === Gt.COPY && s.end === C
                    ? (s.end += S)
                    : ((s = { kind: Gt.COPY, start: C, end: C + S }), Om(s, a, T, v));
        }
        return f > 0 && r.info("File".concat(o.name === "file" ? "" : " " + o.name, " has ").concat(f, " changed blocks")), a;
    }
    var jb = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
    function Om(e, t, r, n) {
        if (jb && t.length !== 0) {
            let i = t[t.length - 1];
            if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
                let s = [i.start, i.end, e.start, e.end].reduce((o, a) => (o < a ? o : a));
                throw new Error(
                    "operation (block index: "
                        .concat(n, ", checksum: ")
                        .concat(r, ", kind: ")
                        .concat(Gt[e.kind], ") overlaps previous operation (checksum: ")
                        .concat(r, "):\n") +
                        "abs: ".concat(i.start, " until ").concat(i.end, " and ").concat(e.start, " until ").concat(e.end, "\n") +
                        "rel: "
                            .concat(i.start - s, " until ")
                            .concat(i.end - s, " and ")
                            .concat(e.start - s, " until ")
                            .concat(e.end - s)
                );
            }
        }
        t.push(e);
    }
    function Hb(e, t, r) {
        let n = new Map(),
            i = new Map(),
            s = t;
        for (let o = 0; o < e.checksums.length; o++) {
            let a = e.checksums[o],
                l = e.sizes[o],
                d = i.get(a);
            if (d === void 0) n.set(a, s), i.set(a, l);
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
            s += l;
        }
        return { checksumToOffset: n, checksumToOldSize: i };
    }
    function xm(e) {
        let t = new Map();
        for (let r of e) t.set(r.name, r);
        return t;
    }
});
var Pa = g(Cn => {
    "use strict";
    Object.defineProperty(Cn, "__esModule", { value: !0 });
    Cn.DataSplitter = void 0;
    Cn.copyData = Im;
    var Qi = ce(),
        Wb = require("fs"),
        Gb = require("stream"),
        Vb = Ji(),
        Nm = Buffer.from("\r\n\r\n"),
        Tt;
    (function (e) {
        (e[(e.INIT = 0)] = "INIT"), (e[(e.HEADER = 1)] = "HEADER"), (e[(e.BODY = 2)] = "BODY");
    })(Tt || (Tt = {}));
    function Im(e, t, r, n, i) {
        let s = (0, Wb.createReadStream)("", { fd: r, autoClose: !1, start: e.start, end: e.end - 1 });
        s.on("error", n), s.once("end", i), s.pipe(t, { end: !1 });
    }
    var Da = class extends Gb.Writable {
        constructor(t, r, n, i, s, o) {
            super(),
                (this.out = t),
                (this.options = r),
                (this.partIndexToTaskIndex = n),
                (this.partIndexToLength = s),
                (this.finishHandler = o),
                (this.partIndex = -1),
                (this.headerListBuffer = null),
                (this.readState = Tt.INIT),
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
                throw (0, Qi.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
            if (this.ignoreByteCount > 0) {
                let n = Math.min(this.ignoreByteCount, t.length);
                (this.ignoreByteCount -= n), (r = n);
            } else if (this.remainingPartDataCount > 0) {
                let n = Math.min(this.remainingPartDataCount, t.length);
                (this.remainingPartDataCount -= n), await this.processPartData(t, 0, n), (r = n);
            }
            if (r !== t.length) {
                if (this.readState === Tt.HEADER) {
                    let n = this.searchHeaderListEnd(t, r);
                    if (n === -1) return;
                    (r = n), (this.readState = Tt.BODY), (this.headerListBuffer = null);
                }
                for (;;) {
                    if (this.readState === Tt.BODY) this.readState = Tt.INIT;
                    else {
                        this.partIndex++;
                        let o = this.partIndexToTaskIndex.get(this.partIndex);
                        if (o == null)
                            if (this.isFinished) o = this.options.end;
                            else throw (0, Qi.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
                        let a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
                        if (a < o) await this.copyExistingData(a, o);
                        else if (a > o)
                            throw (0, Qi.newError)(
                                "prevTaskIndex must be < taskIndex",
                                "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED"
                            );
                        if (this.isFinished) {
                            this.onPartEnd(), this.finishHandler();
                            return;
                        }
                        if (((r = this.searchHeaderListEnd(t, r)), r === -1)) {
                            this.readState = Tt.HEADER;
                            return;
                        }
                    }
                    let n = this.partIndexToLength[this.partIndex],
                        i = r + n,
                        s = Math.min(i, t.length);
                    if (
                        (await this.processPartStarted(t, r, s),
                        (this.remainingPartDataCount = n - (s - r)),
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
                let s = () => {
                    if (t === r) {
                        n();
                        return;
                    }
                    let o = this.options.tasks[t];
                    if (o.kind !== Vb.OperationKind.COPY) {
                        i(new Error("Task kind must be COPY"));
                        return;
                    }
                    Im(o, this.out, this.options.oldFileFd, i, () => {
                        t++, s();
                    });
                };
                s();
            });
        }
        searchHeaderListEnd(t, r) {
            let n = t.indexOf(Nm, r);
            if (n !== -1) return n + Nm.length;
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
                throw (0, Qi.newError)(
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
                : new Promise((s, o) => {
                      i.on("error", o),
                          i.once("drain", () => {
                              i.removeListener("error", o), s();
                          });
                  });
        }
    };
    Cn.DataSplitter = Da;
});
var Pm = g(Zi => {
    "use strict";
    Object.defineProperty(Zi, "__esModule", { value: !0 });
    Zi.executeTasksUsingMultipleRangeRequests = Yb;
    Zi.checkIsRangesSupported = qa;
    var Fa = ce(),
        Rm = Pa(),
        Dm = Ji();
    function Yb(e, t, r, n, i) {
        let s = o => {
            if (o >= t.length) {
                e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
                return;
            }
            let a = o + 1e3;
            zb(e, { tasks: t, start: o, end: Math.min(t.length, a), oldFileFd: n }, r, () => s(a), i);
        };
        return s;
    }
    function zb(e, t, r, n, i) {
        let s = "bytes=",
            o = 0,
            a = new Map(),
            l = [];
        for (let f = t.start; f < t.end; f++) {
            let m = t.tasks[f];
            m.kind === Dm.OperationKind.DOWNLOAD &&
                ((s += "".concat(m.start, "-").concat(m.end - 1, ", ")), a.set(o, f), o++, l.push(m.end - m.start));
        }
        if (o <= 1) {
            let f = m => {
                if (m >= t.end) {
                    n();
                    return;
                }
                let p = t.tasks[m++];
                if (p.kind === Dm.OperationKind.COPY) (0, Rm.copyData)(p, r, t.oldFileFd, i, () => f(m));
                else {
                    let _ = e.createRequestOptions();
                    _.headers.Range = "bytes=".concat(p.start, "-").concat(p.end - 1);
                    let v = e.httpExecutor.createRequest(_, S => {
                        qa(S, i) && (S.pipe(r, { end: !1 }), S.once("end", () => f(m)));
                    });
                    e.httpExecutor.addErrorAndTimeoutHandlers(v, i), v.end();
                }
            };
            f(t.start);
            return;
        }
        let d = e.createRequestOptions();
        d.headers.Range = s.substring(0, s.length - 2);
        let c = e.httpExecutor.createRequest(d, f => {
            if (!qa(f, i)) return;
            let m = (0, Fa.safeGetHeader)(f, "content-type"),
                p = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(m);
            if (p == null) {
                i(new Error('Content-Type "multipart/byteranges" is expected, but got "'.concat(m, '"')));
                return;
            }
            let _ = new Rm.DataSplitter(r, t, a, p[1] || p[2], l, n);
            _.on("error", i),
                f.pipe(_),
                f.on("end", () => {
                    setTimeout(() => {
                        c.abort(), i(new Error("Response ends without calling any handlers"));
                    }, 1e4);
                });
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(c, i), c.end();
    }
    function qa(e, t) {
        if (e.statusCode >= 400) return t((0, Fa.createHttpError)(e)), !1;
        if (e.statusCode !== 206) {
            let r = (0, Fa.safeGetHeader)(e, "accept-ranges");
            if (r == null || r === "none")
                return t(new Error("Server doesn't support Accept-Ranges (response code ".concat(e.statusCode, ")"))), !1;
        }
        return !0;
    }
});
var Fm = g(es => {
    "use strict";
    Object.defineProperty(es, "__esModule", { value: !0 });
    es.ProgressDifferentialDownloadCallbackTransform = void 0;
    var Xb = require("stream"),
        br;
    (function (e) {
        (e[(e.COPY = 0)] = "COPY"), (e[(e.DOWNLOAD = 1)] = "DOWNLOAD");
    })(br || (br = {}));
    var La = class extends Xb.Transform {
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
                (this.operationType = br.COPY),
                (this.nextUpdate = this.start + 1e3);
        }
        _transform(t, r, n) {
            if (this.cancellationToken.cancelled) {
                n(new Error("cancelled"), null);
                return;
            }
            if (this.operationType == br.COPY) {
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
            this.operationType = br.COPY;
        }
        beginRangeDownload() {
            (this.operationType = br.DOWNLOAD),
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
    es.ProgressDifferentialDownloadCallbackTransform = La;
});
var ka = g(rs => {
    "use strict";
    Object.defineProperty(rs, "__esModule", { value: !0 });
    rs.DifferentialDownloader = void 0;
    var Tn = ce(),
        $a = nt(),
        Kb = require("fs"),
        Jb = Pa(),
        Qb = require("url"),
        ts = Ji(),
        qm = Pm(),
        Zb = Fm(),
        Ua = class {
            constructor(t, r, n) {
                (this.blockAwareFileInfo = t),
                    (this.httpExecutor = r),
                    (this.options = n),
                    (this.fileMetadataBuffer = null),
                    (this.logger = n.logger);
            }
            createRequestOptions() {
                let t = { headers: { ...this.options.requestHeaders, accept: "*/*" } };
                return (0, Tn.configureRequestUrl)(this.options.newUrl, t), (0, Tn.configureRequestOptions)(t), t;
            }
            doDownload(t, r) {
                if (t.version !== r.version)
                    throw new Error(
                        "version is different (".concat(t.version, " - ").concat(r.version, "), full download is required")
                    );
                let n = this.logger,
                    i = (0, ts.computeOperations)(t, r, n);
                n.debug != null && n.debug(JSON.stringify(i, null, 2));
                let s = 0,
                    o = 0;
                for (let l of i) {
                    let d = l.end - l.start;
                    l.kind === ts.OperationKind.DOWNLOAD ? (s += d) : (o += d);
                }
                let a = this.blockAwareFileInfo.size;
                if (s + o + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== a)
                    throw new Error(
                        "Internal error, size mismatch: downloadSize: "
                            .concat(s, ", copySize: ")
                            .concat(o, ", newSize: ")
                            .concat(a)
                    );
                return (
                    n.info(
                        "Full: "
                            .concat(Lm(a), ", To download: ")
                            .concat(Lm(s), " (")
                            .concat(Math.round(s / (a / 100)), "%)")
                    ),
                    this.downloadFile(i)
                );
            }
            downloadFile(t) {
                let r = [],
                    n = () =>
                        Promise.all(
                            r.map(i =>
                                (0, $a.close)(i.descriptor).catch(s => {
                                    this.logger.error('cannot close file "'.concat(i.path, '": ').concat(s));
                                })
                            )
                        );
                return this.doDownloadFile(t, r)
                    .then(n)
                    .catch(i =>
                        n()
                            .catch(s => {
                                try {
                                    this.logger.error("cannot close files: ".concat(s));
                                } catch (o) {
                                    try {
                                        console.error(o);
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
                let n = await (0, $a.open)(this.options.oldFile, "r");
                r.push({ descriptor: n, path: this.options.oldFile });
                let i = await (0, $a.open)(this.options.newFile, "w");
                r.push({ descriptor: i, path: this.options.newFile });
                let s = (0, Kb.createWriteStream)(this.options.newFile, { fd: i });
                await new Promise((o, a) => {
                    let l = [],
                        d;
                    if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
                        let T = [],
                            C = 0;
                        for (let L of t)
                            L.kind === ts.OperationKind.DOWNLOAD && (T.push(L.end - L.start), (C += L.end - L.start));
                        let I = { expectedByteCounts: T, grandTotal: C };
                        (d = new Zb.ProgressDifferentialDownloadCallbackTransform(
                            I,
                            this.options.cancellationToken,
                            this.options.onProgress
                        )),
                            l.push(d);
                    }
                    let c = new Tn.DigestTransform(this.blockAwareFileInfo.sha512);
                    (c.isValidateOnEnd = !1),
                        l.push(c),
                        s.on("finish", () => {
                            s.close(() => {
                                r.splice(1, 1);
                                try {
                                    c.validate();
                                } catch (T) {
                                    a(T);
                                    return;
                                }
                                o(void 0);
                            });
                        }),
                        l.push(s);
                    let f = null;
                    for (let T of l) T.on("error", a), f == null ? (f = T) : (f = f.pipe(T));
                    let m = l[0],
                        p;
                    if (this.options.isUseMultipleRangeRequest) {
                        (p = (0, qm.executeTasksUsingMultipleRangeRequests)(this, t, m, n, a)), p(0);
                        return;
                    }
                    let _ = 0,
                        v = null;
                    this.logger.info("Differential download: ".concat(this.options.newUrl));
                    let S = this.createRequestOptions();
                    (S.redirect = "manual"),
                        (p = T => {
                            var C, I;
                            if (T >= t.length) {
                                this.fileMetadataBuffer != null && m.write(this.fileMetadataBuffer), m.end();
                                return;
                            }
                            let L = t[T++];
                            if (L.kind === ts.OperationKind.COPY) {
                                d && d.beginFileCopy(), (0, Jb.copyData)(L, m, n, a, () => p(T));
                                return;
                            }
                            let $e = "bytes=".concat(L.start, "-").concat(L.end - 1);
                            (S.headers.range = $e),
                                (I = (C = this.logger) === null || C === void 0 ? void 0 : C.debug) === null ||
                                    I === void 0 ||
                                    I.call(C, "download range: ".concat($e)),
                                d && d.beginRangeDownload();
                            let X = this.httpExecutor.createRequest(S, de => {
                                de.on("error", a),
                                    de.on("aborted", () => {
                                        a(new Error("response has been aborted by the server"));
                                    }),
                                    de.statusCode >= 400 && a((0, Tn.createHttpError)(de)),
                                    de.pipe(m, { end: !1 }),
                                    de.once("end", () => {
                                        d && d.endRangeDownload(), ++_ === 100 ? ((_ = 0), setTimeout(() => p(T), 1e3)) : p(T);
                                    });
                            });
                            X.on("redirect", (de, y, D) => {
                                this.logger.info("Redirect to ".concat(eO(D))),
                                    (v = D),
                                    (0, Tn.configureRequestUrl)(new Qb.URL(v), S),
                                    X.followRedirect();
                            }),
                                this.httpExecutor.addErrorAndTimeoutHandlers(X, a),
                                X.end();
                        }),
                        p(0);
                });
            }
            async readRemoteBytes(t, r) {
                let n = Buffer.allocUnsafe(r + 1 - t),
                    i = this.createRequestOptions();
                i.headers.range = "bytes=".concat(t, "-").concat(r);
                let s = 0;
                if (
                    (await this.request(i, o => {
                        o.copy(n, s), (s += o.length);
                    }),
                    s !== n.length)
                )
                    throw new Error("Received data length ".concat(s, " is not equal to expected ").concat(n.length));
                return n;
            }
            request(t, r) {
                return new Promise((n, i) => {
                    let s = this.httpExecutor.createRequest(t, o => {
                        (0, qm.checkIsRangesSupported)(o, i) &&
                            (o.on("error", i),
                            o.on("aborted", () => {
                                i(new Error("response has been aborted by the server"));
                            }),
                            o.on("data", r),
                            o.on("end", () => n()));
                    });
                    this.httpExecutor.addErrorAndTimeoutHandlers(s, i), s.end();
                });
            }
        };
    rs.DifferentialDownloader = Ua;
    function Lm(e, t = " KB") {
        return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
    }
    function eO(e) {
        let t = e.indexOf("?");
        return t < 0 ? e : e.substring(0, t);
    }
});
var $m = g(ns => {
    "use strict";
    Object.defineProperty(ns, "__esModule", { value: !0 });
    ns.GenericDifferentialDownloader = void 0;
    var tO = ka(),
        Ma = class extends tO.DifferentialDownloader {
            download(t, r) {
                return this.doDownload(t, r);
            }
        };
    ns.GenericDifferentialDownloader = Ma;
});
var ss = g(Nr => {
    "use strict";
    Object.defineProperty(Nr, "__esModule", { value: !0 });
    Nr.NoOpLogger = Nr.AppUpdater = void 0;
    var Oe = ce(),
        rO = require("crypto"),
        nO = require("os"),
        iO = require("events"),
        Or = nt(),
        sO = yi(),
        Ba = bh(),
        Vt = require("path"),
        Yt = Qo(),
        Um = Zp(),
        oO = rm(),
        km = im(),
        aO = _a(),
        xr = zt(),
        ja = bm(),
        lO = require("zlib"),
        uO = St(),
        cO = $m(),
        Ha = class e extends iO.EventEmitter {
            get channel() {
                return this._channel;
            }
            set channel(t) {
                if (this._channel != null) {
                    if (typeof t != "string")
                        throw (0, Oe.newError)("Channel must be a string, but got: ".concat(t), "ERR_UPDATER_INVALID_CHANNEL");
                    if (t.length === 0)
                        throw (0, Oe.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
                }
                (this._channel = t), (this.allowDowngrade = !0);
            }
            addAuthHeader(t) {
                this.requestHeaders = Object.assign({}, this.requestHeaders, { authorization: t });
            }
            get netSession() {
                return (0, km.getNetSession)();
            }
            get logger() {
                return this._logger;
            }
            set logger(t) {
                this._logger = t ?? new is();
            }
            set updateConfigPath(t) {
                (this.clientPromise = null),
                    (this._appUpdateConfigPath = t),
                    (this.configOnDisk = new Ba.Lazy(() => this.loadUpdateConfig()));
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
                    (this.signals = new xr.UpdaterSignal(this)),
                    (this._appUpdateConfigPath = null),
                    (this.clientPromise = null),
                    (this.stagingUserIdPromise = new Ba.Lazy(() => this.getOrCreateStagingUserId())),
                    (this.configOnDisk = new Ba.Lazy(() => this.loadUpdateConfig())),
                    (this.checkForUpdatesPromise = null),
                    (this.downloadPromise = null),
                    (this.updateInfoAndProvider = null),
                    (this._testOnlyOptions = null),
                    this.on("error", s => {
                        this._logger.error("Error: ".concat(s.stack || s.message));
                    }),
                    r == null
                        ? ((this.app = new oO.ElectronAppAdapter()),
                          (this.httpExecutor = new km.ElectronHttpExecutor((s, o) => this.emit("login", s, o))))
                        : ((this.app = r), (this.httpExecutor = null));
                let n = this.app.version,
                    i = (0, Yt.parse)(n);
                if (i == null)
                    throw (0, Oe.newError)(
                        'App version is not a valid semver version: "'.concat(n, '"'),
                        "ERR_UPDATER_INVALID_VERSION"
                    );
                (this.currentVersion = i),
                    (this.allowPrerelease = fO(i)),
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
                    ? (n = new aO.GenericProvider({ provider: "generic", url: t }, this, {
                          ...r,
                          isUseMultipleRangeRequest: (0, ja.isUrlProbablySupportMultiRangeRequests)(t)
                      }))
                    : (n = (0, ja.createClient)(t, this, r)),
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
                    o = Oe.UUID.parse(i).readUInt32BE(12) / 4294967295;
                return (
                    this._logger.info("Staging percentage: ".concat(n, ", percentage: ").concat(o, ", user id: ").concat(i)),
                    o < n
                );
            }
            computeFinalHeaders(t) {
                return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
            }
            async isUpdateAvailable(t) {
                let r = (0, Yt.parse)(t.version);
                if (r == null)
                    throw (0, Oe.newError)(
                        'This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "'.concat(
                            t.version,
                            '"'
                        ),
                        "ERR_UPDATER_INVALID_VERSION"
                    );
                let n = this.currentVersion;
                if ((0, Yt.eq)(r, n)) return !1;
                let i = t?.minimumSystemVersion,
                    s = (0, nO.release)();
                if (i)
                    try {
                        if ((0, Yt.lt)(s, i))
                            return (
                                this._logger.info(
                                    "Current OS version "
                                        .concat(s, " is less than the minimum OS version required ")
                                        .concat(i, " for version ")
                                        .concat(s)
                                ),
                                !1
                            );
                    } catch (d) {
                        this._logger.warn(
                            "Failed to compare current OS version("
                                .concat(s, ") with minimum OS version(")
                                .concat(i, "): ")
                                .concat((d.message || d).toString())
                        );
                    }
                if (!(await this.isStagingMatch(t))) return !1;
                let a = (0, Yt.gt)(r, n),
                    l = (0, Yt.lt)(r, n);
                return a ? !0 : this.allowDowngrade && l;
            }
            async getUpdateInfoAndProvider() {
                await this.app.whenReady(),
                    this.clientPromise == null &&
                        (this.clientPromise = this.configOnDisk.value.then(n =>
                            (0, ja.createClient)(n, this, this.createProviderRuntimeOptions())
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
                let n = new Oe.CancellationToken();
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
                        (0, Oe.asArray)(t.files)
                            .map(r => r.url)
                            .join(", "),
                        ")"
                    )
                ),
                    this.emit("update-available", t);
            }
            downloadUpdate(t = new Oe.CancellationToken()) {
                let r = this.updateInfoAndProvider;
                if (r == null) {
                    let i = new Error("Please check update first");
                    return this.dispatchError(i), Promise.reject(i);
                }
                if (this.downloadPromise != null)
                    return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
                this._logger.info(
                    "Downloading update from ".concat(
                        (0, Oe.asArray)(r.info.files)
                            .map(i => i.url)
                            .join(", ")
                    )
                );
                let n = i => {
                    if (!(i instanceof Oe.CancellationError))
                        try {
                            this.dispatchError(i);
                        } catch (s) {
                            this._logger.warn("Cannot dispatch error event: ".concat(s.stack || s));
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
                this.emit(xr.UPDATE_DOWNLOADED, t);
            }
            async loadUpdateConfig() {
                return (
                    this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath),
                    (0, sO.load)(await (0, Or.readFile)(this._appUpdateConfigPath, "utf-8"))
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
                let t = Vt.join(this.app.userDataPath, ".updaterId");
                try {
                    let n = await (0, Or.readFile)(t, "utf-8");
                    if (Oe.UUID.check(n)) return n;
                    this._logger.warn("Staging user id file exists, but content was invalid: ".concat(n));
                } catch (n) {
                    n.code !== "ENOENT" && this._logger.warn("Couldn't read staging user ID, creating a blank one: ".concat(n));
                }
                let r = Oe.UUID.v5((0, rO.randomBytes)(4096), Oe.UUID.OID);
                this._logger.info("Generated new staging user ID: ".concat(r));
                try {
                    await (0, Or.outputFile)(t, r);
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
                    let i = Vt.join(this.app.baseCachePath, r || this.app.name);
                    n.debug != null && n.debug("updater cache dir: ".concat(i)),
                        (t = new Um.DownloadedUpdateHelper(i)),
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
                this.listenerCount(xr.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = C => this.emit(xr.DOWNLOAD_PROGRESS, C));
                let i = t.downloadUpdateOptions.updateInfoAndProvider.info,
                    s = i.version,
                    o = r.packageInfo;
                function a() {
                    let C = decodeURIComponent(t.fileInfo.url.pathname);
                    return C.endsWith(".".concat(t.fileExtension)) ? Vt.basename(C) : t.fileInfo.info.url;
                }
                let l = await this.getOrCreateDownloadHelper(),
                    d = l.cacheDirForPendingUpdate;
                await (0, Or.mkdir)(d, { recursive: !0 });
                let c = a(),
                    f = Vt.join(d, c),
                    m = o == null ? null : Vt.join(d, "package-".concat(s).concat(Vt.extname(o.path) || ".7z")),
                    p = async C => (
                        await l.setDownloadedFile(f, m, i, r, c, C),
                        await t.done({ ...i, downloadedFile: f }),
                        m == null ? [f] : [f, m]
                    ),
                    _ = this._logger,
                    v = await l.validateDownloadedPath(f, i, r, _);
                if (v != null) return (f = v), await p(!1);
                let S = async () => (await l.clear().catch(() => {}), await (0, Or.unlink)(f).catch(() => {})),
                    T = await (0, Um.createTempUpdateFile)("temp-".concat(c), d, _);
                try {
                    await t.task(T, n, m, S),
                        await (0, Oe.retry)(
                            () => (0, Or.rename)(T, f),
                            60,
                            500,
                            0,
                            0,
                            C => C instanceof Error && /^EBUSY:/.test(C.message)
                        );
                } catch (C) {
                    throw (
                        (await S(),
                        C instanceof Oe.CancellationError && (_.info("cancelled"), this.emit("update-cancelled", i)),
                        C)
                    );
                }
                return _.info("New version ".concat(s, " has been downloaded to ").concat(f)), await p(!0);
            }
            async differentialDownloadInstaller(t, r, n, i, s) {
                try {
                    if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload) return !0;
                    let o = (0, uO.blockmapFiles)(t.url, this.app.version, r.updateInfoAndProvider.info.version);
                    this._logger.info('Download block maps (old: "'.concat(o[0], '", new: ').concat(o[1], ")"));
                    let a = async c => {
                            let f = await this.httpExecutor.downloadToBuffer(c, {
                                headers: r.requestHeaders,
                                cancellationToken: r.cancellationToken
                            });
                            if (f == null || f.length === 0) throw new Error('Blockmap "'.concat(c.href, '" is empty'));
                            try {
                                return JSON.parse((0, lO.gunzipSync)(f).toString());
                            } catch (m) {
                                throw new Error('Cannot parse blockmap "'.concat(c.href, '", error: ').concat(m));
                            }
                        },
                        l = {
                            newUrl: t.url,
                            oldFile: Vt.join(this.downloadedUpdateHelper.cacheDir, s),
                            logger: this._logger,
                            newFile: n,
                            isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
                            requestHeaders: r.requestHeaders,
                            cancellationToken: r.cancellationToken
                        };
                    this.listenerCount(xr.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = c => this.emit(xr.DOWNLOAD_PROGRESS, c));
                    let d = await Promise.all(o.map(c => a(c)));
                    return await new cO.GenericDifferentialDownloader(t.info, this.httpExecutor, l).download(d[0], d[1]), !1;
                } catch (o) {
                    if (
                        (this._logger.error("Cannot download differentially, fallback to full download: ".concat(o.stack || o)),
                        this._testOnlyOptions != null)
                    )
                        throw o;
                    return !0;
                }
            }
        };
    Nr.AppUpdater = Ha;
    function fO(e) {
        let t = (0, Yt.prerelease)(e);
        return t != null && t.length > 0;
    }
    var is = class {
        info(t) {}
        warn(t) {}
        error(t) {}
    };
    Nr.NoOpLogger = is;
});
var Ir = g(os => {
    "use strict";
    Object.defineProperty(os, "__esModule", { value: !0 });
    os.BaseUpdater = void 0;
    var Mm = require("child_process"),
        hO = ss(),
        Wa = class extends hO.AppUpdater {
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
                    s = n == null ? null : n.downloadedFileInfo;
                if (i == null || s == null)
                    return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
                this.quitAndInstallCalled = !0;
                try {
                    return (
                        this._logger.info("Install: isSilent: ".concat(t, ", isForceRunAfter: ").concat(r)),
                        this.doInstall({
                            installerPath: i,
                            isSilent: t,
                            isForceRunAfter: r,
                            isAdminRightsRequired: s.isAdminRightsRequired
                        })
                    );
                } catch (o) {
                    return this.dispatchError(o), !1;
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
                    (0, Mm.spawnSync)(t, r, { env: { ...process.env, ...n }, encoding: "utf-8", shell: !0 }).stdout.trim()
                );
            }
            async spawnLog(t, r = [], n = void 0, i = "ignore") {
                return (
                    this._logger.info("Executing: ".concat(t, " with args: ").concat(r)),
                    new Promise((s, o) => {
                        try {
                            let a = { stdio: i, env: n, detached: !0 },
                                l = (0, Mm.spawn)(t, r, a);
                            l.on("error", d => {
                                o(d);
                            }),
                                l.unref(),
                                l.pid !== void 0 && s(!0);
                        } catch (a) {
                            o(a);
                        }
                    })
                );
            }
        };
    os.BaseUpdater = Wa;
});
var Va = g(as => {
    "use strict";
    Object.defineProperty(as, "__esModule", { value: !0 });
    as.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
    var Rr = nt(),
        dO = ka(),
        pO = require("zlib"),
        Ga = class extends dO.DifferentialDownloader {
            async download() {
                let t = this.blockAwareFileInfo,
                    r = t.size,
                    n = r - (t.blockMapSize + 4);
                this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
                let i = Bm(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
                await this.doDownload(await mO(this.options.oldFile), i);
            }
        };
    as.FileWithEmbeddedBlockMapDifferentialDownloader = Ga;
    function Bm(e) {
        return JSON.parse((0, pO.inflateRawSync)(e).toString());
    }
    async function mO(e) {
        let t = await (0, Rr.open)(e, "r");
        try {
            let r = (await (0, Rr.fstat)(t)).size,
                n = Buffer.allocUnsafe(4);
            await (0, Rr.read)(t, n, 0, n.length, r - n.length);
            let i = Buffer.allocUnsafe(n.readUInt32BE(0));
            return await (0, Rr.read)(t, i, 0, i.length, r - n.length - i.length), await (0, Rr.close)(t), Bm(i);
        } catch (r) {
            throw (await (0, Rr.close)(t), r);
        }
    }
});
var za = g(ls => {
    "use strict";
    Object.defineProperty(ls, "__esModule", { value: !0 });
    ls.AppImageUpdater = void 0;
    var jm = ce(),
        Hm = require("child_process"),
        gO = nt(),
        wO = require("fs"),
        bn = require("path"),
        yO = Ir(),
        EO = Va(),
        Wm = zt(),
        _O = Be(),
        Ya = class extends yO.BaseUpdater {
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
                    n = (0, _O.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
                return this.executeDownload({
                    fileExtension: "AppImage",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, s) => {
                        let o = process.env.APPIMAGE;
                        if (o == null) throw (0, jm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
                        let a = !1;
                        try {
                            let l = {
                                newUrl: n.url,
                                oldFile: o,
                                logger: this._logger,
                                newFile: i,
                                isUseMultipleRangeRequest: r.isUseMultipleRangeRequest,
                                requestHeaders: t.requestHeaders,
                                cancellationToken: t.cancellationToken
                            };
                            this.listenerCount(Wm.DOWNLOAD_PROGRESS) > 0 &&
                                (l.onProgress = d => this.emit(Wm.DOWNLOAD_PROGRESS, d)),
                                await new EO.FileWithEmbeddedBlockMapDifferentialDownloader(
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
                        a && (await this.httpExecutor.download(n.url, i, s)), await (0, gO.chmod)(i, 493);
                    }
                });
            }
            doInstall(t) {
                let r = process.env.APPIMAGE;
                if (r == null) throw (0, jm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
                (0, wO.unlinkSync)(r);
                let n,
                    i = bn.basename(r);
                bn.basename(t.installerPath) === i || !/\d+\.\d+\.\d+/.test(i)
                    ? (n = r)
                    : (n = bn.join(bn.dirname(r), bn.basename(t.installerPath))),
                    (0, Hm.execFileSync)("mv", ["-f", t.installerPath, n]),
                    n !== r && this.emit("appimage-filename-updated", n);
                let s = { ...process.env, APPIMAGE_SILENT_INSTALL: "true" };
                return (
                    t.isForceRunAfter
                        ? this.spawnLog(n, [], s)
                        : ((s.APPIMAGE_EXIT_AFTER_INSTALL = "true"), (0, Hm.execFileSync)(n, [], { env: s })),
                    !0
                );
            }
        };
    ls.AppImageUpdater = Ya;
});
var Ka = g(us => {
    "use strict";
    Object.defineProperty(us, "__esModule", { value: !0 });
    us.DebUpdater = void 0;
    var vO = Ir(),
        Gm = zt(),
        SO = Be(),
        Xa = class extends vO.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, SO.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
                return this.executeDownload({
                    fileExtension: "deb",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, s) => {
                        this.listenerCount(Gm.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = o => this.emit(Gm.DOWNLOAD_PROGRESS, o)),
                            await this.httpExecutor.download(n.url, i, s);
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
    us.DebUpdater = Xa;
});
var Qa = g(cs => {
    "use strict";
    Object.defineProperty(cs, "__esModule", { value: !0 });
    cs.RpmUpdater = void 0;
    var AO = Ir(),
        Vm = zt(),
        CO = Be(),
        Ja = class extends AO.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, CO.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
                return this.executeDownload({
                    fileExtension: "rpm",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, s) => {
                        this.listenerCount(Vm.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = o => this.emit(Vm.DOWNLOAD_PROGRESS, o)),
                            await this.httpExecutor.download(n.url, i, s);
                    }
                });
            }
            doInstall(t) {
                let r = t.installerPath,
                    n = this.wrapSudo(),
                    i = /pkexec/i.test(n) ? "" : '"',
                    s = this.spawnSyncLog("which zypper"),
                    o;
                return (
                    s
                        ? (o = [s, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", r])
                        : (o = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", r]),
                    this.spawnSyncLog(n, ["".concat(i, "/bin/bash"), "-c", "'".concat(o.join(" "), "'").concat(i)]),
                    t.isForceRunAfter && this.app.relaunch(),
                    !0
                );
            }
        };
    cs.RpmUpdater = Ja;
});
var el = g(fs => {
    "use strict";
    Object.defineProperty(fs, "__esModule", { value: !0 });
    fs.MacUpdater = void 0;
    var Ym = ce(),
        zm = nt(),
        Xm = require("fs"),
        Km = require("path"),
        TO = require("http"),
        bO = ss(),
        OO = Be(),
        Jm = require("child_process"),
        Qm = require("crypto"),
        Za = class extends bO.AppUpdater {
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
                    s = !1;
                try {
                    this.debug("Checking for macOS Rosetta environment"),
                        (s = (0, Jm.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes("".concat(i, ": 1"))),
                        n.info("Checked for macOS Rosetta environment (isRosetta=".concat(s, ")"));
                } catch (f) {
                    n.warn("sysctl shell command to check for macOS Rosetta environment failed: ".concat(f));
                }
                let o = !1;
                try {
                    this.debug("Checking for arm64 in uname");
                    let m = (0, Jm.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
                    n.info("Checked 'uname -a': arm64=".concat(m)), (o = o || m);
                } catch (f) {
                    n.warn("uname shell command to check for arm64 failed: ".concat(f));
                }
                o = o || process.arch === "arm64" || s;
                let a = f => {
                    var m;
                    return (
                        f.url.pathname.includes("arm64") ||
                        ((m = f.info.url) === null || m === void 0 ? void 0 : m.includes("arm64"))
                    );
                };
                o && r.some(a) ? (r = r.filter(f => o === a(f))) : (r = r.filter(f => !a(f)));
                let l = (0, OO.findFile)(r, "zip", ["pkg", "dmg"]);
                if (l == null)
                    throw (0, Ym.newError)(
                        "ZIP file not provided: ".concat((0, Ym.safeStringifyJson)(r)),
                        "ERR_UPDATER_ZIP_FILE_NOT_FOUND"
                    );
                let d = t.updateInfoAndProvider.provider,
                    c = "update.zip";
                return this.executeDownload({
                    fileExtension: "zip",
                    fileInfo: l,
                    downloadUpdateOptions: t,
                    task: async (f, m) => {
                        let p = Km.join(this.downloadedUpdateHelper.cacheDir, c),
                            _ = () =>
                                (0, zm.pathExistsSync)(p)
                                    ? !t.disableDifferentialDownload
                                    : (n.info(
                                          "Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"
                                      ),
                                      !1),
                            v = !0;
                        _() && (v = await this.differentialDownloadInstaller(l, t, f, d, c)),
                            v && (await this.httpExecutor.download(l.url, f, m));
                    },
                    done: f => {
                        if (!t.disableDifferentialDownload)
                            try {
                                let m = Km.join(this.downloadedUpdateHelper.cacheDir, c);
                                (0, Xm.copyFileSync)(f.downloadedFile, m);
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
                    s = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, zm.stat)(i)).size,
                    o = this._logger,
                    a = "fileToProxy=".concat(t.url.href);
                this.closeServerIfExists(),
                    this.debug("Creating proxy server for native Squirrel.Mac (".concat(a, ")")),
                    (this.server = (0, TO.createServer)()),
                    this.debug("Proxy server for native Squirrel.Mac is created (".concat(a, ")")),
                    this.server.on("close", () => {
                        o.info("Proxy server for native Squirrel.Mac is closed (".concat(a, ")"));
                    });
                let l = d => {
                    let c = d.address();
                    return typeof c == "string" ? c : "http://127.0.0.1:".concat(c?.port);
                };
                return await new Promise((d, c) => {
                    let f = (0, Qm.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"),
                        m = Buffer.from("autoupdater:".concat(f), "ascii"),
                        p = "/".concat((0, Qm.randomBytes)(64).toString("hex"), ".zip");
                    this.server.on("request", (_, v) => {
                        let S = _.url;
                        if ((o.info("".concat(S, " requested")), S === "/")) {
                            if (!_.headers.authorization || _.headers.authorization.indexOf("Basic ") === -1) {
                                (v.statusCode = 401),
                                    (v.statusMessage = "Invalid Authentication Credentials"),
                                    v.end(),
                                    o.warn("No authenthication info");
                                return;
                            }
                            let I = _.headers.authorization.split(" ")[1],
                                L = Buffer.from(I, "base64").toString("ascii"),
                                [$e, X] = L.split(":");
                            if ($e !== "autoupdater" || X !== f) {
                                (v.statusCode = 401),
                                    (v.statusMessage = "Invalid Authentication Credentials"),
                                    v.end(),
                                    o.warn("Invalid authenthication credentials");
                                return;
                            }
                            let de = Buffer.from('{ "url": "'.concat(l(this.server)).concat(p, '" }'));
                            v.writeHead(200, { "Content-Type": "application/json", "Content-Length": de.length }), v.end(de);
                            return;
                        }
                        if (!S.startsWith(p)) {
                            o.warn("".concat(S, " requested, but not supported")), v.writeHead(404), v.end();
                            return;
                        }
                        o.info("".concat(p, " requested by Squirrel.Mac, pipe ").concat(i));
                        let T = !1;
                        v.on("finish", () => {
                            T || (this.nativeUpdater.removeListener("error", c), d([]));
                        });
                        let C = (0, Xm.createReadStream)(i);
                        C.on("error", I => {
                            try {
                                v.end();
                            } catch (L) {
                                o.warn("cannot end response: ".concat(L));
                            }
                            (T = !0),
                                this.nativeUpdater.removeListener("error", c),
                                c(new Error('Cannot pipe "'.concat(i, '": ').concat(I)));
                        }),
                            v.writeHead(200, { "Content-Type": "application/zip", "Content-Length": s }),
                            C.pipe(v);
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
    fs.MacUpdater = Za;
});
var rg = g(rl => {
    "use strict";
    Object.defineProperty(rl, "__esModule", { value: !0 });
    rl.verifySignature = NO;
    var Zm = ce(),
        tg = require("child_process"),
        xO = require("os"),
        eg = require("path");
    function NO(e, t, r) {
        return new Promise((n, i) => {
            let s = t.replace(/'/g, "''");
            r.info("Verifying signature ".concat(s)),
                (0, tg.execFile)(
                    'set "PSModulePath=" & chcp 65001 >NUL & powershell.exe',
                    [
                        "-NoProfile",
                        "-NonInteractive",
                        "-InputFormat",
                        "None",
                        "-Command",
                        "\"Get-AuthenticodeSignature -LiteralPath '".concat(s, "' | ConvertTo-Json -Compress\"")
                    ],
                    { shell: !0, timeout: 20 * 1e3 },
                    (o, a, l) => {
                        var d;
                        try {
                            if (o != null || l) {
                                tl(r, o, l, i), n(null);
                                return;
                            }
                            let c = IO(a);
                            if (c.Status === 0) {
                                try {
                                    let _ = eg.normalize(c.Path),
                                        v = eg.normalize(t);
                                    if ((r.info("LiteralPath: ".concat(_, ". Update Path: ").concat(v)), _ !== v)) {
                                        tl(r, new Error("LiteralPath of ".concat(_, " is different than ").concat(v)), l, i),
                                            n(null);
                                        return;
                                    }
                                } catch (_) {
                                    r.warn(
                                        "Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ".concat(
                                            (d = _.message) !== null && d !== void 0 ? d : _.stack
                                        )
                                    );
                                }
                                let m = (0, Zm.parseDn)(c.SignerCertificate.Subject),
                                    p = !1;
                                for (let _ of e) {
                                    let v = (0, Zm.parseDn)(_);
                                    if (
                                        (v.size
                                            ? (p = Array.from(v.keys()).every(T => v.get(T) === m.get(T)))
                                            : _ === m.get("CN") &&
                                              (r.warn(
                                                  "Signature validated using only CN ".concat(
                                                      _,
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
                            tl(r, c, null, i), n(null);
                            return;
                        }
                    }
                );
        });
    }
    function IO(e) {
        let t = JSON.parse(e);
        delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
        let r = t.SignerCertificate;
        return (
            r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName),
            t
        );
    }
    function tl(e, t, r, n) {
        if (RO()) {
            e.warn(
                "Cannot execute Get-AuthenticodeSignature: ".concat(
                    t || r,
                    ". Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher."
                )
            );
            return;
        }
        try {
            (0, tg.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], {
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
    function RO() {
        let e = xO.release();
        return e.startsWith("6.") && !e.startsWith("6.3");
    }
});
var il = g(ds => {
    "use strict";
    Object.defineProperty(ds, "__esModule", { value: !0 });
    ds.NsisUpdater = void 0;
    var hs = ce(),
        ng = require("path"),
        DO = Ir(),
        PO = Va(),
        ig = zt(),
        FO = Be(),
        qO = nt(),
        LO = rg(),
        sg = require("url"),
        nl = class extends DO.BaseUpdater {
            constructor(t, r) {
                super(t, r), (this._verifyUpdateCodeSignature = (n, i) => (0, LO.verifySignature)(n, i, this._logger));
            }
            get verifyUpdateCodeSignature() {
                return this._verifyUpdateCodeSignature;
            }
            set verifyUpdateCodeSignature(t) {
                t && (this._verifyUpdateCodeSignature = t);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, FO.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
                return this.executeDownload({
                    fileExtension: "exe",
                    downloadUpdateOptions: t,
                    fileInfo: n,
                    task: async (i, s, o, a) => {
                        let l = n.packageInfo,
                            d = l != null && o != null;
                        if (d && t.disableWebInstaller)
                            throw (0, hs.newError)(
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
                                (await this.differentialDownloadInstaller(n, t, i, r, hs.CURRENT_APP_INSTALLER_FILE_NAME))) &&
                                (await this.httpExecutor.download(n.url, i, s));
                        let c = await this.verifySignature(i);
                        if (c != null)
                            throw (
                                (await a(),
                                (0, hs.newError)(
                                    "New version "
                                        .concat(t.updateInfoAndProvider.info.version, " is not signed by the application owner: ")
                                        .concat(c),
                                    "ERR_UPDATER_INVALID_SIGNATURE"
                                ))
                            );
                        if (d && (await this.differentialDownloadWebPackage(t, l, o, r)))
                            try {
                                await this.httpExecutor.download(new sg.URL(l.path), o, {
                                    headers: t.requestHeaders,
                                    cancellationToken: t.cancellationToken,
                                    sha512: l.sha512
                                });
                            } catch (f) {
                                try {
                                    await (0, qO.unlink)(o);
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
                    this.spawnLog(ng.join(process.resourcesPath, "elevate.exe"), [t.installerPath].concat(r)).catch(s =>
                        this.dispatchError(s)
                    );
                };
                return t.isAdminRightsRequired
                    ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), i(), !0)
                    : (this.spawnLog(t.installerPath, r).catch(s => {
                          let o = s.code;
                          this._logger.info(
                              "Cannot run installer: error code: "
                                  .concat(o, ', error message: "')
                                  .concat(
                                      s.message,
                                      '", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT'
                                  )
                          ),
                              o === "UNKNOWN" || o === "EACCES"
                                  ? i()
                                  : o === "ENOENT"
                                  ? require("electron")
                                        .shell.openPath(t.installerPath)
                                        .catch(a => this.dispatchError(a))
                                  : this.dispatchError(s);
                      }),
                      !0);
            }
            async differentialDownloadWebPackage(t, r, n, i) {
                if (r.blockMapSize == null) return !0;
                try {
                    let s = {
                        newUrl: new sg.URL(r.path),
                        oldFile: ng.join(this.downloadedUpdateHelper.cacheDir, hs.CURRENT_APP_PACKAGE_FILE_NAME),
                        logger: this._logger,
                        newFile: n,
                        requestHeaders: this.requestHeaders,
                        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
                        cancellationToken: t.cancellationToken
                    };
                    this.listenerCount(ig.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = o => this.emit(ig.DOWNLOAD_PROGRESS, o)),
                        await new PO.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, s).download();
                } catch (s) {
                    return (
                        this._logger.error("Cannot download differentially, fallback to full download: ".concat(s.stack || s)),
                        process.platform === "win32"
                    );
                }
                return !1;
            }
        };
    ds.NsisUpdater = nl;
});
var zt = g(B => {
    "use strict";
    Object.defineProperty(B, "__esModule", { value: !0 });
    B.UpdaterSignal =
        B.UPDATE_DOWNLOADED =
        B.DOWNLOAD_PROGRESS =
        B.NsisUpdater =
        B.MacUpdater =
        B.RpmUpdater =
        B.DebUpdater =
        B.AppImageUpdater =
        B.Provider =
        B.CancellationToken =
        B.NoOpLogger =
        B.AppUpdater =
        B.BaseUpdater =
            void 0;
    var $O = ce();
    Object.defineProperty(B, "CancellationToken", {
        enumerable: !0,
        get: function () {
            return $O.CancellationToken;
        }
    });
    var og = nt(),
        UO = require("path"),
        kO = Ir();
    Object.defineProperty(B, "BaseUpdater", {
        enumerable: !0,
        get: function () {
            return kO.BaseUpdater;
        }
    });
    var ag = ss();
    Object.defineProperty(B, "AppUpdater", {
        enumerable: !0,
        get: function () {
            return ag.AppUpdater;
        }
    });
    Object.defineProperty(B, "NoOpLogger", {
        enumerable: !0,
        get: function () {
            return ag.NoOpLogger;
        }
    });
    var MO = Be();
    Object.defineProperty(B, "Provider", {
        enumerable: !0,
        get: function () {
            return MO.Provider;
        }
    });
    var BO = za();
    Object.defineProperty(B, "AppImageUpdater", {
        enumerable: !0,
        get: function () {
            return BO.AppImageUpdater;
        }
    });
    var jO = Ka();
    Object.defineProperty(B, "DebUpdater", {
        enumerable: !0,
        get: function () {
            return jO.DebUpdater;
        }
    });
    var HO = Qa();
    Object.defineProperty(B, "RpmUpdater", {
        enumerable: !0,
        get: function () {
            return HO.RpmUpdater;
        }
    });
    var WO = el();
    Object.defineProperty(B, "MacUpdater", {
        enumerable: !0,
        get: function () {
            return WO.MacUpdater;
        }
    });
    var GO = il();
    Object.defineProperty(B, "NsisUpdater", {
        enumerable: !0,
        get: function () {
            return GO.NsisUpdater;
        }
    });
    var bt;
    function VO() {
        if (process.platform === "win32") bt = new (il().NsisUpdater)();
        else if (process.platform === "darwin") bt = new (el().MacUpdater)();
        else {
            bt = new (za().AppImageUpdater)();
            try {
                let e = UO.join(process.resourcesPath, "package-type");
                if (!(0, og.existsSync)(e)) return bt;
                console.info("Checking for beta autoupdate feature for deb/rpm distributions");
                let t = (0, og.readFileSync)(e).toString().trim();
                switch ((console.info("Found package-type:", t), t)) {
                    case "deb":
                        bt = new (Ka().DebUpdater)();
                        break;
                    case "rpm":
                        bt = new (Qa().RpmUpdater)();
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
        return bt;
    }
    Object.defineProperty(B, "autoUpdater", { enumerable: !0, get: () => bt || VO() });
    B.DOWNLOAD_PROGRESS = "download-progress";
    B.UPDATE_DOWNLOADED = "update-downloaded";
    var sl = class {
        constructor(t) {
            this.emitter = t;
        }
        login(t) {
            ps(this.emitter, "login", t);
        }
        progress(t) {
            ps(this.emitter, B.DOWNLOAD_PROGRESS, t);
        }
        updateDownloaded(t) {
            ps(this.emitter, B.UPDATE_DOWNLOADED, t);
        }
        updateCancelled(t) {
            ps(this.emitter, "update-cancelled", t);
        }
    };
    B.UpdaterSignal = sl;
    var YO = !1;
    function ps(e, t, r) {
        YO
            ? e.on(t, (...n) => {
                  console.log("%s %s", t, n), r(...n);
              })
            : e.on(t, r);
    }
});
var Xt = g((RR, lg) => {
    var Ye;
    lg.exports =
        ((Ye = class {
            static getSourceChannelName(t) {
                return "".concat(Ye.WINDOW_SOURCE, "/").concat(t);
            }
            static getTargetChannelName(t) {
                return "".concat(Ye.WINDOW_TARGET, "/").concat(t);
            }
        }),
        b(Ye, "WINDOW_MAIN", "@main"),
        b(Ye, "WINDOW_MAIN_LOGIN", "@main/login"),
        b(Ye, "WINDOW_SOURCE", "@source"),
        b(Ye, "WINDOW_TARGET", "@target"),
        Ye);
});
var ms = g((FR, ug) => {
    var On;
    ug.exports = ((On = class {}), b(On, "WINDOWS", "win32"), b(On, "MACOS", "darwin"), b(On, "LINUX", "linux"), On);
});
var Ot = g(($R, cg) => {
    cg.exports = class {
        constructor(t) {
            b(this, "_oglama");
            this._oglama = t;
        }
    };
});
var hg = g((MR, fg) => {
    var zO = Ot(),
        gs = require("fs"),
        ws = require("path"),
        XO = require("http"),
        ol;
    fg.exports =
        ((ol = class extends zO {
            start() {
                if (this.constructor._instance === null) {
                    let t = ws.join(this._oglama.rootPath, "ssg"),
                        r = this._oglama.config.getPort();
                    this.constructor._instance = new Promise((n, i) => {
                        if (this._oglama.devMode) {
                            n(null);
                            return;
                        }
                        try {
                            let s = XO.createServer((o, a) => {
                                let l = ".empty";
                                try {
                                    let c = new URL(o.url, "http://0.0.0.0");
                                    l = decodeURIComponent(c.pathname).replace(/^\/+|\/+$/g, "");
                                } catch {}
                                let d = ws.join(t, l);
                                gs.statSync(d, { throwIfNoEntry: !1 })?.isDirectory() && (d = ws.join(d, "index.html")),
                                    gs.access(d, gs.constants.F_OK, c => {
                                        if (c) {
                                            a.writeHead(404, { "Content-Type": "text/plain" }), a.end("Not Found: ".concat(c));
                                            return;
                                        }
                                        gs.readFile(d, (f, m) => {
                                            if (f) {
                                                a.writeHead(500, { "Content-Type": "text/plain" }),
                                                    a.end("Internal Server Error: ".concat(f));
                                                return;
                                            }
                                            let p = ws.extname(d),
                                                _ =
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
                                            a.writeHead(200, { "Content-Type": _ }), a.end(m);
                                        });
                                    });
                            });
                            s.listen(r, () => {
                                this._oglama.log.info("webserver:start", "Listening on port ".concat(r)), n(s);
                            });
                        } catch (s) {
                            this._oglama.log.error("webserver:start", s), i(s);
                        }
                    });
                }
                return this.constructor._instance;
            }
        }),
        b(ol, "_instance", null),
        ol);
});
var pg = g((HR, dg) => {
    var KO = require("path"),
        JO = Ot();
    dg.exports = class extends JO {
        async start() {
            let t = KO.join(this._oglama.rootPath, "res", "index.html"),
                r = { extraHeaders: "pragma: no-cache" };
            this._oglama.mainWindow().loadFile(t, r),
                this._oglama.mainLoginWindow().loadFile(t, r),
                this._oglama.mainWindow().hide(),
                this._oglama.mainLoginWindow().show();
        }
    };
});
var gg = g((GR, mg) => {
    var QO = Ot();
    mg.exports = class extends QO {
        error() {
            console.error("%coglama-error", "color:red", ...arguments);
        }
        info() {
            console.info("%coglama-info", "color:lightblue", ...arguments);
        }
    };
});
var yg = g((YR, wg) => {
    var ZO = Ot();
    wg.exports = class extends ZO {
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
        getSourceMinWidth() {
            return 950;
        }
        getSourceMinHeight() {
            return 650;
        }
        getPort() {
            return 7199;
        }
    };
});
var _g = g((XR, Eg) => {
    var ex = Ot(),
        tx = require("querystring");
    Eg.exports = class extends ex {
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
                (i, s) => (
                    Object.keys(s).forEach(o => {
                        let a = i[o],
                            l = s[o];
                        do {
                            if (Array.isArray(a) && Array.isArray(l)) {
                                i[o] = a.concat(...l);
                                break;
                            }
                            if (r(a) && r(l)) {
                                i[o] = n(a, l);
                                break;
                            }
                        } while (!1);
                        i[o] = l;
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
                r = t.query ? n + "?" + tx.stringify(t.query) : n;
            } while (!1);
            return r;
        }
    };
});
var Ag = g((JR, Sg) => {
    var rx = Ot(),
        vg = require("fs");
    Sg.exports = class extends rx {
        isFile(t) {
            let r = !1;
            try {
                r = vg.statSync(t).isFile();
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
                let n = vg.readFileSync(t);
                r = Buffer.isBuffer(n) ? n.toString() : n;
            } catch (n) {
                this._oglama.log.error("file:readFile", t, n);
            }
            return r;
        }
    };
});
var Tg = g((ZR, Cg) => {
    var al;
    Cg.exports =
        ((al = class {}),
        b(al, "AppSrc", {
            K_SRC_WEBSITES: "srcWebsites",
            K_SRC_INPUTS: "srcInputs",
            K_SRC_OUTPUTS: "srcOutputs",
            K_SRC_STATE_MACHINE: "srcStateMachine"
        }),
        al);
});
var Kt = g((rD, bg) => {
    var nx = Ot(),
        { ipcMain: ix } = require("electron");
    bg.exports = class extends nx {
        constructor(t) {
            super(t);
        }
        _register(t) {
            if (typeof t == "string")
                for (let r of Object.getOwnPropertyNames(this)) {
                    if (["_", "#"].includes(r[0] || typeof this[r] != "function")) continue;
                    let n = this[r];
                    ix.handle("ipc:".concat(t, ":").concat(r), async (i, ...s) => {
                        let o = null;
                        try {
                            o = typeof n == "function" ? await n(...s) : null;
                        } catch (a) {
                            this._oglama.devMode && console.debug(a), (o = a);
                        }
                        return o;
                    });
                }
        }
    };
});
var Rg = g((iD, Ig) => {
    var sx = Xt(),
        ox = Tg(),
        ax = Kt(),
        { app: lx } = require("electron"),
        he = require("path"),
        H = require("fs"),
        Og = 180,
        ux = 1e3,
        ll = "default",
        xg = "local",
        Ze,
        Jt,
        je,
        Qt,
        xn,
        ze,
        ys,
        Es,
        Dr,
        Ng;
    Ig.exports =
        ((Ng = class extends ax {
            constructor(r) {
                super(r);
                U(this, Ze, {});
                U(this, Jt, {});
                U(this, je, null);
                U(this, Qt, r => he.join(E(this, je), "agents", r, "source.json"));
                U(this, xn, r => {
                    let n = null;
                    if (typeof r == "object" && r !== null) {
                        n = {};
                        for (let i of Object.values(ox.AppSrc)) n[i] = Array.isArray(r[i]) ? r[i] : [];
                    }
                    return n;
                });
                U(this, ze, r => "".concat(r).replace(/\W+/g, ""));
                U(this, ys, r => "".concat(r).replace(/[^\w\-]+/gi, ""));
                U(this, Es, (r, n = 32) =>
                    ""
                        .concat(r)
                        .trim()
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/\.{2,}/g, ".")
                        .replace(/\-{2,}/g, "-")
                        .replace(/\_{2,}/g, "_")
                        .replace(/[^\w\.\-]|^[\-\._]+|[\-\._]+$/gi, "")
                        .substring(0, n)
                );
                U(this, Dr, (r, n) => {
                    let i = he.resolve(he.join(E(this, je), "agents", r));
                    return he.resolve(n).startsWith(i);
                });
                b(this, "purge", async r => {
                    let n = !1;
                    if (((r = E(this, ze).call(this, r)), r.length)) {
                        let i = he.dirname(E(this, Qt).call(this, r));
                        H.existsSync(i) && (H.rmSync(i, { recursive: !0, force: !0 }), (n = !0));
                    }
                    this._oglama.devMode && console.log("\u{1F5D1}\uFE0F  purge(".concat(r, "): ").concat(n));
                });
                b(this, "runSetup", (r, n, i, s = []) => {
                    if (((r = E(this, ze).call(this, r)), !r.length)) throw new Error("Invalid Agent ID");
                    if (!H.existsSync(n) || !H.statSync(n).isDirectory()) throw new Error("Invalid input path");
                    if (!H.existsSync(i) || !H.statSync(i).isDirectory() || !E(this, Dr).call(this, r, i))
                        throw new Error("Invalid run path");
                    for (let o of H.readdirSync(n, { withFileTypes: !0 }))
                        o.isFile() &&
                            (o.name === "inputs.json" || o.name.indexOf("input-") === 0) &&
                            H.copyFileSync(he.join(n, o.name), he.join(i, o.name));
                    Array.isArray(s) && s.length;
                });
                b(this, "runInit", (r, n = null, i = null, s = null) => {
                    if (((r = E(this, ze).call(this, r)), !r.length)) throw new Error("Invalid Agent ID");
                    (n = ""
                        .concat(n ?? xg)
                        .toLowerCase()
                        .replace(/\W+/gi, "")),
                        n.length || (n = xg),
                        (i = ""
                            .concat(i ?? ll)
                            .toLowerCase()
                            .replace(/\W+/gi, "")),
                        i.length || (i = ll),
                        (!Number.isInteger(s) || s <= 0) && (s = Math.floor(new Date().getTime() / 1e3));
                    let o = "".concat(n, "-").concat(i, "-").concat(s),
                        a = he.join(E(this, je), "agents", r, "runs", o);
                    return (
                        H.existsSync(a) ||
                            (H.mkdirSync(a, { recursive: !0 }),
                            ll === i && this.runSetup(r, he.join(E(this, je), "agents", r, "settings"), a)),
                        { runId: o, runPath: a }
                    );
                });
                b(this, "sourceGet", (r, n = !0) => {
                    let i = null;
                    r = E(this, ze).call(this, r);
                    do {
                        if (!r.length) break;
                        let s = E(this, Qt).call(this, r);
                        if (!H.existsSync(s) || !H.statSync(s).isFile()) break;
                        try {
                            (i = H.readFileSync(s).toString()), n && (i = E(this, xn).call(this, JSON.parse(i)));
                        } catch {}
                    } while (!1);
                    return (
                        this._oglama.devMode &&
                            console.log("\u{1F4BE} \u25B6 sourceGet(".concat(r, ") => {").concat(typeof i, "}")),
                        i
                    );
                });
                b(this, "sourceSet", (r, n) => {
                    r = E(this, ze).call(this, r);
                    do {
                        if (!r.length) break;
                        typeof E(this, Ze)[r] > "u" && (E(this, Ze)[r] = this.sourceGet(r, !1));
                        let i = JSON.stringify(E(this, xn).call(this, n), null, 2);
                        if (E(this, Ze)[r] === i) break;
                        (E(this, Ze)[r] = i),
                            typeof E(this, Jt)[r] < "u" && clearTimeout(E(this, Jt)[r]),
                            (E(this, Jt)[r] = setTimeout(() => {
                                delete E(this, Jt)[r];
                                let s = E(this, Qt).call(this, r);
                                H.existsSync(s) || H.mkdirSync(he.dirname(s), { recursive: !0 }),
                                    E(this, Ze)[r] !== "null" ? H.writeFileSync(s, E(this, Ze)[r]) : H.rmSync(s),
                                    this._oglama.devMode &&
                                        console.log(
                                            "\u{1F4BE} \u25C0 sourceSet("
                                                .concat(r, "): ")
                                                .concat(E(this, Ze)[r] !== "null" ? "updated file" : "deleted file")
                                        );
                            }, ux));
                    } while (!1);
                });
                b(this, "fileInit", (r, n, i) => {
                    if (
                        (this._oglama.devMode &&
                            console.log("\u{1F4DD}\u2728 fileInit(".concat(r, ", ").concat(n, ", ").concat(i, ")")),
                        (r = E(this, ze).call(this, r)),
                        (n = E(this, ys).call(this, n)),
                        (i = E(this, Es).call(this, i)),
                        !r.length)
                    )
                        throw new Error("Invalid Agent ID");
                    if (!n.length) throw new Error("Invalid Run ID");
                    let s = he.join(E(this, je), "agents", r, "runs", n);
                    if (!H.existsSync(s)) throw new Error("Run not initialized");
                    if (!i.length) throw new Error("Invalid option key");
                    let o = "png",
                        a = 0,
                        [l, d] = n.split("-");
                    for (let c of H.readdirSync(he.dirname(s), { withFileTypes: !0 })) {
                        if (!c.isDirectory()) continue;
                        let [f, m] = c.name.split("-");
                        if (!(f !== l || m !== d)) {
                            for (let p of H.readdirSync(he.join(he.dirname(s), c.name), { withFileTypes: !0 }))
                                if (p.isFile() && p.name.indexOf("output-".concat(i, "-")) === 0) {
                                    let _ = parseInt(
                                        p.name.substring("output-".concat(i, "-").length).replace(/^(\d+).*/, "$1"),
                                        10
                                    );
                                    Number.isInteger(_) && _ > 0 && _ > a && (a = _);
                                }
                        }
                    }
                    return he.join(
                        s,
                        "output-"
                            .concat(i, "-")
                            .concat(a + 1, ".")
                            .concat(o)
                    );
                });
                b(this, "fileAppend", async (r, n, i) => {
                    this._oglama.devMode && console.log("\u{1F4DD}\u{1F4A6} fileAppend(".concat(r, ", ").concat(n, ")"));
                    let s = !1;
                    return (
                        (r = E(this, ze).call(this, r)),
                        r.length &&
                            E(this, Dr).call(this, r, n) &&
                            H.existsSync(he.dirname(n)) &&
                            (H.writeFileSync(n, i, { flag: "a" }), (s = !0)),
                        s
                    );
                });
                b(this, "fileDelete", async (r, n) => {
                    this._oglama.devMode && console.log("\u{1F4DD}\u{1F5D1}\uFE0F fileDelete(".concat(r, ", ").concat(n, ")"));
                    let i = !1;
                    return (
                        (r = E(this, ze).call(this, r)),
                        r.length && E(this, Dr).call(this, r, n) && H.existsSync(n) && (H.rmSync(n, { force: !0 }), (i = !0)),
                        i
                    );
                });
                this._register("diskStorage"),
                    ee(this, je, he.join(lx.getPath("appData"), "oglama")),
                    H.existsSync(E(this, je)) || H.mkdirSync(E(this, je), { recursive: !0 }),
                    setInterval(() => {
                        let n = Math.floor(new Date().getTime() / 1e3),
                            i = [];
                        H.readdirSync(he.join(E(this, je), "agents"), { withFileTypes: !0 })
                            .filter(s => s.isDirectory())
                            .map(s => {
                                let o = E(this, Qt).call(this, s.name);
                                if (H.existsSync(o)) {
                                    let a = Math.floor(H.statSync(o).mtime.getTime() / 1e3);
                                    n - a <= Og && i.push(s.name);
                                }
                            }),
                            i.length &&
                                this._oglama.main?.view.webContents.send(sx.WINDOW_MAIN, [
                                    "ipc:disk-storage:agents:commit",
                                    [i],
                                    { type: "req" }
                                ]);
                    }, Og * 1e3);
            }
        }),
        (Ze = new WeakMap()),
        (Jt = new WeakMap()),
        (je = new WeakMap()),
        (Qt = new WeakMap()),
        (xn = new WeakMap()),
        (ze = new WeakMap()),
        (ys = new WeakMap()),
        (Es = new WeakMap()),
        (Dr = new WeakMap()),
        Ng);
});
var Fg = g((aD, Pg) => {
    var { execSync: ul } = require("child_process"),
        cx = Kt(),
        _e = ms(),
        Pr,
        Fr,
        qr,
        xt,
        Dg;
    Pg.exports =
        ((Dg = class extends cx {
            constructor(r) {
                super(r);
                U(this, Pr, null);
                U(this, Fr, null);
                U(this, qr, null);
                U(this, xt, null);
                b(this, "getOS", () => {
                    if (typeof E(this, xt) != "string")
                        switch (process.platform) {
                            case _e.MACOS:
                                ee(this, xt, "macos");
                                break;
                            case _e.WINDOWS:
                                ee(this, xt, "windows");
                                break;
                            case _e.LINUX:
                                ee(this, xt, "linux");
                                break;
                        }
                    return E(this, xt);
                });
                b(this, "getName", () => {
                    if (typeof E(this, Fr) != "string") {
                        let r = null;
                        switch (process.platform) {
                            case _e.MACOS:
                                r = "echo $(scutil --get LocalHostName).local";
                                break;
                            case _e.WINDOWS:
                            case _e.LINUX:
                                r = "hostname";
                                break;
                        }
                        if (r !== null)
                            try {
                                let n = ul(r).toString();
                                ee(this, Fr, n.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (n) {
                                this._oglama.devMode && console.warn("Device Name", "".concat(n));
                            }
                    }
                    return E(this, Fr);
                });
                b(this, "getUUID", () => {
                    if (typeof E(this, Pr) != "string") {
                        let r = null,
                            n =
                                process.arch === "ia32" && process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432")
                                    ? "%windir%\\sysnative\\cmd.exe /c %windir%\\System32"
                                    : "%windir%\\System32";
                        switch (process.platform) {
                            case _e.MACOS:
                                r = "ioreg -rd1 -c IOPlatformExpertDevice";
                                break;
                            case _e.WINDOWS:
                                r =
                                    "".concat(n, "\\REG.exe") +
                                    " QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid";
                                break;
                            case _e.LINUX:
                                r = "( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :";
                                break;
                        }
                        if (r !== null)
                            try {
                                let i = ul(r).toString();
                                switch (process.platform) {
                                    case _e.MACOS:
                                        i = i.replace(/^.*?\bIOPlatformUUID"\s*=\s*"(.*?)".*$/gs, "$1");
                                        break;
                                    case _e.WINDOWS:
                                        i = i.split("REG_SZ")[1];
                                        break;
                                }
                                ee(this, Pr, i.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (i) {
                                this._oglama.devMode && console.warn("Device UUID", "".concat(i));
                            }
                    }
                    return E(this, Pr);
                });
                b(this, "getSerialNumber", () => {
                    if (typeof E(this, qr) != "string") {
                        let r = null;
                        switch (process.platform) {
                            case _e.MACOS:
                                r = "ioreg -l | grep IOPlatformSerialNumber";
                                break;
                            case _e.WINDOWS:
                                r = "wmic bios get SerialNumber";
                                break;
                            case _e.LINUX:
                                r = 'lsblk -o UUID -n /dev/sda* | grep -v "^$" | grep -vE "^.{,20}$" | sed -n 1p';
                                break;
                        }
                        if (r !== null)
                            try {
                                let n = ul(r).toString();
                                switch (process.platform) {
                                    case _e.MACOS:
                                        n = n.replace(/^.*?\bIOPlatformSerialNumber"\s*=\s*"(.*?)".*$/gs, "$1");
                                        break;
                                    case _e.WINDOWS:
                                        n = n.split("SerialNumber")[1];
                                        break;
                                }
                                ee(this, qr, n.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (n) {
                                this._oglama.devMode && console.warn("Device Serial Number", "".concat(n));
                            }
                    }
                    return E(this, qr);
                });
                b(this, "setPostAuth", r => this._oglama.setPostAuth(!!r));
                b(this, "getPostAuth", () => this._oglama.getPostAuth());
                this._register("device");
            }
        }),
        (Pr = new WeakMap()),
        (Fr = new WeakMap()),
        (qr = new WeakMap()),
        (xt = new WeakMap()),
        Dg);
});
var Mg = g((cD, kg) => {
    var { ipcMain: qg, session: fx, BrowserWindow: Lg } = require("electron"),
        $g = require("path"),
        hx = Xt(),
        dx = Kt(),
        z,
        lt,
        Ug;
    kg.exports =
        ((Ug = class extends dx {
            constructor(r) {
                super(r);
                U(this, z, {});
                U(this, lt, {});
                b(this, "list", () => Object.keys(E(this, z)));
                b(this, "closeAll", () => {
                    let r = Object.keys(E(this, z)).length > 0;
                    for (let n of Object.keys(E(this, z))) this.close(n);
                    return r;
                });
                b(this, "open", r => {
                    let n = !1;
                    do {
                        if (typeof r != "string" || !r.length) break;
                        if (typeof E(this, z)[r] < "u") {
                            typeof E(this, z)[r]?.webContents?.focus == "function" && E(this, z)[r].webContents.focus();
                            break;
                        }
                        E(this, z)[r] = new Lg({
                            show: !1,
                            minWidth: this._oglama.config.getSourceMinWidth(),
                            minHeight: this._oglama.config.getSourceMinHeight(),
                            width: this._oglama.config.getSourceMinWidth(),
                            height: this._oglama.config.getSourceMinHeight(),
                            icon: $g.join(this._oglama.rootPath, "res/icons/icon.png"),
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
                                preload: $g.join(this._oglama.rootPath, "lib/preloader/entry/source.js"),
                                nodeIntegration: !0,
                                devTools: this._oglama.devMode,
                                session: fx.defaultSession,
                                cache: !1,
                                webSecurity: !1,
                                allowRunningInsecureContent: !0,
                                additionalArguments: ["--agent-id=".concat(r)]
                            }
                        });
                        let i = hx.getSourceChannelName(r);
                        (E(this, lt)[r] = {
                            channel: i,
                            listener: (s, ...o) => {
                                this._oglama.devMode &&
                                    console.log(
                                        "\u{1F3F9} ".concat(i),
                                        o[0] ?? "(tag not specified)",
                                        Array.isArray(o[1]) ? "[...]{".concat(o[1].length, "}") : "(no args)",
                                        o[2] ?? "(info not specified)"
                                    ),
                                    o.length >= 3 && E(this, z)[r].webContents.send(i, o);
                            }
                        }),
                            qg.on(E(this, lt)[r].channel, E(this, lt)[r].listener),
                            this._oglama.devMode &&
                                E(this, z)[r].webContents.on("context-menu", (s, o) => {
                                    s.preventDefault(), E(this, z)[r].webContents.openDevTools({ mode: "right" });
                                }),
                            E(this, z)[r].setMenu(null),
                            E(this, z)[r].on("closed", () => {
                                qg.off(E(this, lt)[r].channel, E(this, lt)[r].listener),
                                    delete E(this, lt)[r],
                                    delete E(this, z)[r];
                            }),
                            E(this, z)[r].webContents.on("did-finish-load", () => {
                                E(this, z)[r].show(), E(this, z)[r].webContents.focus();
                            }),
                            E(this, z)[r].loadURL("http://localhost:".concat(this._oglama.config.getPort(), "/source-code/")),
                            (n = !0);
                    } while (!1);
                    return n;
                });
                b(this, "close", r => {
                    let n = !1;
                    return typeof E(this, z)[r]?.destroy == "function" && (E(this, z)[r].destroy(), (n = !0)), n;
                });
                b(this, "webContents", async (r, n, i) => {
                    if (
                        (this._oglama.devMode &&
                            console.log("ipc.source.webContents", JSON.stringify({ agentId: r, methodName: n, methodArgs: i })),
                        typeof r != "string" || !r.length)
                    )
                        throw new Error("Invalid Agent ID");
                    if (!(E(this, z)[r] instanceof Lg)) throw new Error("Invalid Agent ID");
                    if (typeof n != "string" || typeof E(this, z)[r].webContents[n] != "function")
                        throw new Error("Invalid source webContents method: ".concat(n));
                    return (
                        n === "loadURL" && (E(this, z)[r].metadata.loaded = !0),
                        Array.isArray(i) || (i = []),
                        await E(this, z)[r].webContents[n](...i)
                    );
                });
                this._register("source");
            }
        }),
        (z = new WeakMap()),
        (lt = new WeakMap()),
        Ug);
});
var Wg = g((dD, Hg) => {
    var { ipcMain: Bg, BrowserView: Lr } = require("electron"),
        jg = require("path"),
        px = Xt(),
        cl = ms(),
        mx = Kt(),
        Nn,
        In,
        Rn,
        Dn,
        k,
        et,
        tt,
        Zt;
    Hg.exports =
        ((Nn = class extends mx {
            constructor(r) {
                super(r);
                U(this, In);
                U(this, Rn);
                U(this, Dn, "");
                U(this, k, {});
                U(this, et, {});
                U(this, tt, "");
                b(this, "setWindowSize", (r, n) => {
                    ee(this, In, r), ee(this, Rn, n), E(this, Zt).call(this);
                });
                b(this, "list", () => Object.keys(E(this, k)));
                b(this, "removeAll", () => {
                    let r = Object.keys(E(this, k)).length > 0;
                    for (let n of Object.keys(E(this, k))) this.remove(n);
                    return r;
                });
                b(this, "add", (r, n, i = !1) => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid Agent ID");
                    if (typeof n != "string" || !n.match(/^https?:\/\//gi)) throw new Error("Invalid target URL");
                    if (E(this, k)[r] instanceof Lr) return !1;
                    let s = new Lr({
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
                            preload: jg.join(this._oglama.rootPath, "lib/preloader/entry/target.js"),
                            nodeIntegration: !0,
                            devTools: !0,
                            partition: "persist:target-".concat(r),
                            cache: !1,
                            additionalArguments: ["--agent-id=".concat(r)]
                        }
                    });
                    (s.metadata = { targetUrl: n, loaded: !1 }),
                        s.webContents.once("ready-to-show", () => s.webContents.setZoomFactor(1)),
                        s.webContents.on("dom-ready", () => s.webContents.focus()),
                        s.webContents.setUserAgent(E(this, Dn)),
                        s.webContents.setZoomLevel(0),
                        s.webContents.setAudioMuted(!0),
                        s.webContents.loadFile(jg.join(this._oglama.rootPath, "res", "index.html"), {
                            extraHeaders: "pragma: no-cache"
                        }),
                        this._oglama.mainWindow().addBrowserView(s),
                        this._oglama.main.view instanceof Lr &&
                            (this._oglama.mainWindow().removeBrowserView(this._oglama.main.view),
                            this._oglama.mainWindow().addBrowserView(this._oglama.main.view)),
                        (E(this, k)[r] = s);
                    let o = px.getTargetChannelName(r);
                    return (
                        (E(this, et)[r] = {
                            channel: o,
                            listener: (a, ...l) => {
                                this._oglama.devMode &&
                                    console.log(
                                        "\u{1F3AF} ".concat(o),
                                        l[0] ?? "(tag not specified)",
                                        Array.isArray(l[1]) ? "[...]{".concat(l[1].length, "}") : "(no args)",
                                        l[2] ?? "(info not specified)"
                                    ),
                                    l.length >= 3 && s.webContents.send(o, l);
                            }
                        }),
                        Bg.on(E(this, et)[r].channel, E(this, et)[r].listener),
                        i ? this.select(r) : E(this, Zt).call(this),
                        !0
                    );
                });
                b(this, "remove", r => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid Agent ID");
                    if (!(E(this, k)[r] instanceof Lr) || typeof E(this, et)[r] > "u") return !1;
                    Bg.off(E(this, et)[r].channel, E(this, et)[r].listener), delete E(this, et)[r];
                    try {
                        this._oglama.mainWindow().removeBrowserView(E(this, k)[r]);
                    } catch {}
                    try {
                        E(this, k)[r].webContents.destroy();
                    } catch {}
                    return delete E(this, k)[r], r === E(this, tt) && ee(this, tt, ""), E(this, Zt).call(this), !0;
                });
                b(this, "select", r => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid Agent ID");
                    if (E(this, k)[r] instanceof Lr && E(this, tt) !== r) {
                        ee(this, tt, r),
                            E(this, k)[r].metadata.loaded ||
                                ((E(this, k)[r].metadata.loaded = !0),
                                E(this, k)[r].webContents.loadURL(E(this, k)[r].metadata.targetUrl));
                        let n = {};
                        for (let i of Object.keys(E(this, k)).filter(s => s !== r)) n[i] = E(this, k)[i];
                        return (
                            (n[r] = E(this, k)[r]),
                            ee(this, k, n),
                            this._oglama.mainWindow().removeBrowserView(E(this, k)[r]),
                            this._oglama.mainWindow().removeBrowserView(this._oglama.main.view),
                            this._oglama.main.onTop
                                ? (this._oglama.mainWindow().addBrowserView(E(this, k)[r]),
                                  this._oglama.mainWindow().addBrowserView(this._oglama.main.view),
                                  this._oglama.main.view.webContents.focus())
                                : (this._oglama.mainWindow().addBrowserView(this._oglama.main.view),
                                  this._oglama.mainWindow().addBrowserView(E(this, k)[r]),
                                  E(this, k)[r].webContents.focus()),
                            E(this, Zt).call(this),
                            !0
                        );
                    }
                    return !1;
                });
                b(this, "getSelected", () => E(this, tt));
                b(this, "openDevTools", r => {
                    let n = !1;
                    do {
                        if (typeof r != "string" || !r.length || typeof E(this, k)[r]?.webContents?.openDevTools != "function")
                            break;
                        E(this, k)[r].webContents.openDevTools({ mode: "detach" }), (n = !0);
                    } while (!1);
                    return n;
                });
                b(this, "getTargets", () => E(this, k));
                b(this, "webContents", async (r, n, i) => {
                    if (
                        (this._oglama.devMode &&
                            console.log("ipc.target.webContents", JSON.stringify({ agentId: r, methodName: n, methodArgs: i })),
                        typeof r != "string" || !r.length)
                    )
                        throw new Error("Invalid Agent ID");
                    if (!(E(this, k)[r] instanceof Lr)) throw new Error("Invalid Agent ID");
                    if (typeof n != "string" || typeof E(this, k)[r].webContents[n] != "function")
                        throw new Error("Invalid target webContents method: ".concat(n));
                    return (
                        n === "loadURL" && (E(this, k)[r].metadata.loaded = !0),
                        Array.isArray(i) || (i = []),
                        await E(this, k)[r].webContents[n](...i)
                    );
                });
                U(this, Zt, () => {
                    if (!Object.keys(E(this, k)).length) return;
                    let r = E(this, In) - this.constructor.MARGIN_LEFT,
                        n = E(this, Rn) - (this.constructor.MARGIN_TOP + this.constructor.MARGIN_BOTTOM);
                    for (let i of Object.keys(E(this, k))) {
                        let s = i === E(this, tt) ? this.constructor.MARGIN_LEFT : 100 - r,
                            o = i === E(this, tt) ? this.constructor.MARGIN_TOP : 50 - n;
                        E(this, k)[i].setBounds({ x: s, y: o, width: r, height: n });
                    }
                });
                let n = "";
                switch (process.platform) {
                    case cl.MACOS:
                        n = "(Macintosh; Intel Mac OS X 13_3)";
                        break;
                    case cl.WINDOWS:
                        n = "(Windows NT 10.0; Win64; x64)";
                        break;
                    case cl.LINUX:
                        n = "(X11; Linux x86_64)";
                        break;
                }
                ee(this, Dn, "Mozilla/5.0 ".concat(n, " AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")),
                    this._register("target");
            }
        }),
        (In = new WeakMap()),
        (Rn = new WeakMap()),
        (Dn = new WeakMap()),
        (k = new WeakMap()),
        (et = new WeakMap()),
        (tt = new WeakMap()),
        (Zt = new WeakMap()),
        b(Nn, "MARGIN_LEFT", 250),
        b(Nn, "MARGIN_TOP", 50),
        b(Nn, "MARGIN_BOTTOM", 50),
        Nn);
});
var Yg = g((gD, Vg) => {
    var { session: gx, shell: wx, ipcMain: yx, BrowserView: fl } = require("electron"),
        Ex = require("path"),
        hl = Xt(),
        _x = Kt(),
        _s,
        Gg;
    Vg.exports =
        ((Gg = class extends _x {
            constructor(r) {
                super(r);
                b(this, "windowWidth");
                b(this, "windowHeight");
                b(this, "view", null);
                b(this, "darkMode", !0);
                U(this, _s, () =>
                    this.view instanceof fl
                        ? (this.view.setBounds({ x: 0, y: 0, width: this.windowWidth, height: this.windowHeight }), !0)
                        : !1
                );
                b(this, "init", () =>
                    this.view instanceof fl
                        ? !1
                        : ((this.windowWidth = this._oglama.config.getMainLoginWidth()),
                          (this.windowHeight = this._oglama.config.getMainLoginHeight()),
                          (this.view = new fl({
                              width: this.windowWidth,
                              height: this.windowHeight,
                              resizable: !1,
                              backgroundColor: "#00000000",
                              transparent: !0,
                              webPreferences: {
                                  backgroundThrottling: !1,
                                  imageAnimationPolicy: "noAnimation",
                                  spellcheck: !1,
                                  preload: Ex.join(this._oglama.rootPath, "lib/preloader/entry/main.js"),
                                  nodeIntegration: !0,
                                  devTools: this._oglama.devMode,
                                  session: gx.defaultSession,
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
                          yx.on(hl.WINDOW_MAIN_LOGIN, (r, ...n) => {
                              this._oglama.devMode &&
                                  console.log(
                                      "\u{1F3E0} ".concat(hl.WINDOW_MAIN_LOGIN),
                                      n[0] ?? "(tag not specified)",
                                      Array.isArray(n[1]) ? "[...]{".concat(n[1].length, "}") : "(no args)",
                                      n[2] ?? "(info not specified)"
                                  ),
                                  n.length >= 3 && this.view.webContents.send(hl.WINDOW_MAIN_LOGIN, n);
                          }),
                          this._oglama.mainLoginWindow().addBrowserView(this.view),
                          E(this, _s).call(this),
                          !0)
                );
                b(this, "openExternal", r => {
                    typeof r == "string" && wx.openExternal(r);
                });
                this._register("main/login");
            }
        }),
        (_s = new WeakMap()),
        Gg);
});
var Kg = g((ED, Xg) => {
    var { app: vx, session: Sx, shell: Ax, ipcMain: Cx, BrowserView: vs } = require("electron"),
        Tx = require("path"),
        dl = Xt(),
        bx = Yg(),
        Ox = Kt(),
        $r,
        zg;
    Xg.exports =
        ((zg = class extends Ox {
            constructor(r) {
                super(r);
                b(this, "windowWidth");
                b(this, "windowHeight");
                b(this, "view", null);
                b(this, "onTop", !1);
                b(this, "darkMode", !0);
                b(this, "login", null);
                U(this, $r, () =>
                    this.view instanceof vs
                        ? (this.view.setBounds({ x: 0, y: 0, width: this.windowWidth, height: this.windowHeight }), !0)
                        : !1
                );
                b(this, "init", () =>
                    this.view instanceof vs
                        ? !1
                        : ((this.windowWidth = this._oglama.config.getMainMinWidth()),
                          (this.windowHeight = this._oglama.config.getMainMinHeight()),
                          (this.view = new vs({
                              width: this.windowWidth,
                              height: this.windowHeight,
                              resizable: !1,
                              backgroundColor: "#00000000",
                              transparent: !0,
                              webPreferences: {
                                  backgroundThrottling: !1,
                                  imageAnimationPolicy: "noAnimation",
                                  spellcheck: !1,
                                  preload: Tx.join(this._oglama.rootPath, "lib/preloader/entry/main.js"),
                                  nodeIntegration: !0,
                                  devTools: this._oglama.devMode,
                                  session: Sx.defaultSession,
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
                          this.view.webContents.on("page-title-updated", (r, n) => {
                              this._oglama.mainWindow().setTitle(n);
                          }),
                          this._oglama.devMode &&
                              this.view.webContents.on("context-menu", (r, n) => {
                                  r.preventDefault(), this.view.webContents.openDevTools({ mode: "detach" });
                              }),
                          Cx.on(dl.WINDOW_MAIN, (r, ...n) => {
                              this._oglama.devMode &&
                                  console.log(
                                      "\u{1F3E0} ".concat(dl.WINDOW_MAIN),
                                      n[0] ?? "(tag not specified)",
                                      Array.isArray(n[1]) ? "[...]{".concat(n[1].length, "}") : "(no args)",
                                      n[2] ?? "(info not specified)"
                                  ),
                                  n.length >= 3 && this.view.webContents.send(dl.WINDOW_MAIN, n);
                          }),
                          this._oglama.mainWindow().addBrowserView(this.view),
                          E(this, $r).call(this),
                          !0)
                );
                b(this, "setWindowSize", (r, n) => {
                    (this.windowWidth = r), (this.windowHeight = n), E(this, $r).call(this);
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
                                let s = this._oglama.target.getTargets()[i];
                                s instanceof vs &&
                                    (this._oglama.mainWindow().removeBrowserView(s),
                                    this._oglama.mainWindow().removeBrowserView(this.view),
                                    this._oglama.mainWindow().addBrowserView(this.view),
                                    this._oglama.mainWindow().addBrowserView(s),
                                    s.webContents.focus());
                            }
                        }
                        E(this, $r).call(this), (n = !0);
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
                    vx.quit();
                });
                b(this, "getDarkMode", () => this.darkMode);
                b(this, "openExternal", r => {
                    typeof r == "string" && Ax.openExternal(r);
                });
                this._register("main"), (this.login = new bx(r));
            }
        }),
        ($r = new WeakMap()),
        zg);
});
var r0 = g((SD, t0) => {
    var pl = Xt(),
        { app: ml, session: Jg, BrowserWindow: Qg } = require("electron"),
        Zg = require("path"),
        gl = ms(),
        xx = hg(),
        Nx = pg(),
        Ix = gg(),
        Rx = yg(),
        Dx = _g(),
        Px = Ag(),
        Fx = Rg(),
        qx = Fg(),
        Lx = Mg(),
        $x = Wg(),
        Ux = Kg(),
        re,
        Pn,
        Fn,
        He,
        e0;
    t0.exports =
        ((e0 = class {
            constructor() {
                U(this, re, null);
                U(this, Pn, null);
                U(this, Fn, !1);
                U(this, He, null);
                b(this, "rootPath", ml.getAppPath());
                b(this, "devMode", !1);
                b(this, "log", new Ix(this));
                b(this, "webserver", new xx(this));
                b(this, "activity", new Nx(this));
                b(this, "diskStorage", new Fx(this));
                b(this, "device", new qx(this));
                b(this, "source", new Lx(this));
                b(this, "target", new $x(this));
                b(this, "main", new Ux(this));
                b(this, "config", new Rx(this));
                b(this, "file", new Px(this));
                b(this, "utils", new Dx(this));
            }
            mainWindow() {
                let t = this;
                if (E(t, re) === null) {
                    ee(
                        t,
                        re,
                        new Qg({
                            show: !1,
                            minWidth: t.config.getMainMinWidth(),
                            minHeight: t.config.getMainMinHeight(),
                            width: t.config.getMainMinWidth(),
                            height: t.config.getMainMinHeight(),
                            icon: Zg.join(t.rootPath, "res/icons/icon.png"),
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
                                session: Jg.defaultSession
                            }
                        })
                    ),
                        E(t, re).setMenu(null),
                        E(t, re).setMaxListeners(0),
                        E(t, re).on("closed", () => {
                            ee(t, re, null), ml.quit();
                        });
                    let r = () => {
                        let n = E(t, re).getSize(),
                            i = [gl.WINDOWS, gl.MACOS].includes(process.platform)
                                ? Math.abs(E(t, re).getSize()[1] - E(t, re).getContentSize()[1])
                                : 0,
                            s = [gl.WINDOWS].includes(process.platform)
                                ? Math.abs(E(t, re).getSize()[0] - E(t, re).getContentSize()[0])
                                : 0;
                        t.main.setWindowSize(n[0] - s, n[1] - i), t.target.setWindowSize(n[0] - s, n[1] - i);
                    };
                    E(t, re).on("resize", () => r()),
                        E(t, re).once("ready-to-show", () => r()),
                        t.main.init(),
                        t.main.view.webContents.on("did-finish-load", () => {
                            t.getPostAuth() && E(t, re).show(), r();
                        }),
                        E(t, re).setMenu(null),
                        ee(
                            t,
                            Pn,
                            setInterval(() => {
                                if (E(t, re) === null) {
                                    clearInterval(E(t, Pn));
                                    return;
                                }
                                let n = E(t, re).getSize();
                                E(t, re).setSize(n[0] + 1, n[1]), setTimeout(() => E(t, re).setSize(n[0], n[1]), 250);
                            }, 9e4)
                        );
                }
                return E(t, re);
            }
            mainLoginWindow() {
                let t = this;
                return (
                    E(t, He) === null &&
                        (ee(
                            t,
                            He,
                            new Qg({
                                width: t.config.getMainLoginWidth(),
                                height: t.config.getMainLoginHeight(),
                                icon: Zg.join(t.rootPath, "res/icons/icon.png"),
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
                                    session: Jg.defaultSession
                                }
                            })
                        ),
                        E(t, He).setMenu(null),
                        E(t, He).setMaxListeners(0),
                        E(t, He).on("closed", () => {
                            ee(t, He, null), ml.quit();
                        }),
                        t.main?.login?.init(),
                        t.main?.login?.view.webContents.on("did-finish-load", () => {
                            t.getPostAuth() || E(t, He).show();
                        }),
                        E(t, He).setMenu(null)),
                    E(t, He)
                );
            }
            getPostAuth() {
                return E(this, Fn);
            }
            setPostAuth(t) {
                let r = !1;
                if (((t = !!t), t !== this.getPostAuth())) {
                    ee(this, Fn, t);
                    let n = ["ipc:oglama:auth", [t], { type: "req", fromWin: pl.WINDOW_MAIN_LOGIN }];
                    this.main?.login?.view.webContents.send(pl.WINDOW_MAIN_LOGIN, n),
                        setTimeout(() => {
                            this.main?.view.webContents.send(pl.WINDOW_MAIN, n);
                        }, 750),
                        t
                            ? (this.mainWindow().show(), this.mainLoginWindow().hide())
                            : (this.mainWindow().hide(), this.mainLoginWindow().show()),
                        (r = !0);
                }
                return r;
            }
        }),
        (re = new WeakMap()),
        (Pn = new WeakMap()),
        (Fn = new WeakMap()),
        (He = new WeakMap()),
        e0);
});
var { app: Le, BrowserWindow: kx } = require("electron"),
    { autoUpdater: wl } = zt(),
    Mx = r0();
Le.disableHardwareAcceleration();
Le.commandLine.appendSwitch("disable-gpu");
Le.commandLine.appendSwitch("allow-insecure-localhost");
Le.commandLine.appendSwitch("disable-renderer-backgrounding");
Le.commandLine.appendSwitch("disable-background-timer-throttling");
Le.commandLine.appendSwitch("disable-backgrounding-occluded-windows");
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
process.on("uncaughtException", e => {
    process.env.NODE_ENV === "development" && console.debug(e);
});
var We = null;
do {
    if (!Le.requestSingleInstanceLock()) {
        Le.quit();
        break;
    }
    Le.on("second-instance", () => {
        We !== null &&
            (We.getPostAuth()
                ? (We.mainWindow().isMinimized() && We.mainWindow().restore(), We.mainWindow().show())
                : (We.mainLoginWindow().isMinimized() && We.mainLoginWindow().restore(), We.mainLoginWindow().show()));
    }),
        Le.on("ready", async () => {
            (We = new Mx()),
                Le.on("activate", () => {
                    kx.getAllWindows().length === 0 && We.activity.start();
                }),
                await We.webserver.start(),
                await We.activity.start(),
                wl.checkForUpdatesAndNotify();
        }),
        wl.on("update-downloaded", () => {
            dialog
                .showMessageBox({ type: "info", title: "Update ready", message: "Install now?", buttons: ["Yes", "Later"] })
                .then(e => {
                    e.response === 0 && wl.quitAndInstall();
                });
        }),
        Le.on("window-all-closed", () => {
            process.platform !== "darwin" && Le.quit();
        });
} while (!1);
