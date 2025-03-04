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
var u0 = Object.defineProperty;
var Al = e => {
    throw TypeError(e);
};
var c0 = (e, t, r) => (t in e ? u0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r));
var w = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var b = (e, t, r) => c0(e, typeof t != "symbol" ? t + "" : t, r),
    Cl = (e, t, r) => t.has(e) || Al("Cannot " + r);
var g = (e, t, r) => (Cl(e, t, "read from private field"), r ? r.call(e) : t.get(e)),
    k = (e, t, r) =>
        t.has(e) ? Al("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r),
    te = (e, t, r, n) => (Cl(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
var kn = w(rr => {
    "use strict";
    Object.defineProperty(rr, "__esModule", { value: !0 });
    rr.CancellationError = rr.CancellationToken = void 0;
    var f0 = require("events"),
        Ts = class extends f0.EventEmitter {
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
                if (this.cancelled) return Promise.reject(new Mr());
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
                                s(new Mr());
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
    rr.CancellationToken = Ts;
    var Mr = class extends Error {
        constructor() {
            super("cancelled");
        }
    };
    rr.CancellationError = Mr;
});
var Tl = w((Gx, bl) => {
    var nr = 1e3,
        ir = nr * 60,
        sr = ir * 60,
        It = sr * 24,
        h0 = It * 7,
        d0 = It * 365.25;
    bl.exports = function (e, t) {
        t = t || {};
        var r = typeof e;
        if (r === "string" && e.length > 0) return p0(e);
        if (r === "number" && isFinite(e)) return t.long ? g0(e) : m0(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
    };
    function p0(e) {
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
                        return r * d0;
                    case "weeks":
                    case "week":
                    case "w":
                        return r * h0;
                    case "days":
                    case "day":
                    case "d":
                        return r * It;
                    case "hours":
                    case "hour":
                    case "hrs":
                    case "hr":
                    case "h":
                        return r * sr;
                    case "minutes":
                    case "minute":
                    case "mins":
                    case "min":
                    case "m":
                        return r * ir;
                    case "seconds":
                    case "second":
                    case "secs":
                    case "sec":
                    case "s":
                        return r * nr;
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
    function m0(e) {
        var t = Math.abs(e);
        return t >= It
            ? Math.round(e / It) + "d"
            : t >= sr
            ? Math.round(e / sr) + "h"
            : t >= ir
            ? Math.round(e / ir) + "m"
            : t >= nr
            ? Math.round(e / nr) + "s"
            : e + "ms";
    }
    function g0(e) {
        var t = Math.abs(e);
        return t >= It
            ? Un(e, t, It, "day")
            : t >= sr
            ? Un(e, t, sr, "hour")
            : t >= ir
            ? Un(e, t, ir, "minute")
            : t >= nr
            ? Un(e, t, nr, "second")
            : e + " ms";
    }
    function Un(e, t, r, n) {
        var i = t >= r * 1.5;
        return Math.round(e / r) + " " + n + (i ? "s" : "");
    }
});
var Os = w((Vx, Ol) => {
    function w0(e) {
        (r.debug = r),
            (r.default = r),
            (r.coerce = l),
            (r.disable = o),
            (r.enable = i),
            (r.enabled = a),
            (r.humanize = Tl()),
            (r.destroy = h),
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
                    N = C - (f || C);
                (T.diff = N),
                    (T.prev = f),
                    (T.curr = C),
                    (f = C),
                    (S[0] = r.coerce(S[0])),
                    typeof S[0] != "string" && S.unshift("%O");
                let $ = 0;
                (S[0] = S[0].replace(/%([a-zA-Z%])/g, (X, de) => {
                    if (X === "%%") return "%";
                    $++;
                    let E = r.formatters[de];
                    if (typeof E == "function") {
                        let P = S[$];
                        (X = E.call(T, P)), S.splice($, 1), $--;
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
        function h() {
            console.warn(
                "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
            );
        }
        return r.enable(r.load()), r;
    }
    Ol.exports = w0;
});
var xl = w(($e, Mn) => {
    $e.formatArgs = E0;
    $e.save = _0;
    $e.load = v0;
    $e.useColors = y0;
    $e.storage = S0();
    $e.destroy = (() => {
        let e = !1;
        return () => {
            e ||
                ((e = !0),
                console.warn(
                    "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
                ));
        };
    })();
    $e.colors = [
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
    function y0() {
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
    function E0(e) {
        if (
            ((e[0] =
                (this.useColors ? "%c" : "") +
                this.namespace +
                (this.useColors ? " %c" : " ") +
                e[0] +
                (this.useColors ? "%c " : " ") +
                "+" +
                Mn.exports.humanize(this.diff)),
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
    $e.log = console.debug || console.log || (() => {});
    function _0(e) {
        try {
            e ? $e.storage.setItem("debug", e) : $e.storage.removeItem("debug");
        } catch {}
    }
    function v0() {
        let e;
        try {
            e = $e.storage.getItem("debug");
        } catch {}
        return !e && typeof process < "u" && "env" in process && (e = process.env.DEBUG), e;
    }
    function S0() {
        try {
            return localStorage;
        } catch {}
    }
    Mn.exports = Os()($e);
    var { formatters: A0 } = Mn.exports;
    A0.j = function (e) {
        try {
            return JSON.stringify(e);
        } catch (t) {
            return "[UnexpectedJSONParseError]: " + t.message;
        }
    };
});
var Nl = w((Yx, Il) => {
    "use strict";
    Il.exports = (e, t = process.argv) => {
        let r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--",
            n = t.indexOf(r + e),
            i = t.indexOf("--");
        return n !== -1 && (i === -1 || n < i);
    };
});
var Dl = w((zx, Pl) => {
    "use strict";
    var C0 = require("os"),
        Rl = require("tty"),
        Me = Nl(),
        { env: ue } = process,
        ct;
    Me("no-color") || Me("no-colors") || Me("color=false") || Me("color=never")
        ? (ct = 0)
        : (Me("color") || Me("colors") || Me("color=true") || Me("color=always")) && (ct = 1);
    "FORCE_COLOR" in ue &&
        (ue.FORCE_COLOR === "true"
            ? (ct = 1)
            : ue.FORCE_COLOR === "false"
            ? (ct = 0)
            : (ct = ue.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(ue.FORCE_COLOR, 10), 3)));
    function xs(e) {
        return e === 0 ? !1 : { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 };
    }
    function Is(e, t) {
        if (ct === 0) return 0;
        if (Me("color=16m") || Me("color=full") || Me("color=truecolor")) return 3;
        if (Me("color=256")) return 2;
        if (e && !t && ct === void 0) return 0;
        let r = ct || 0;
        if (ue.TERM === "dumb") return r;
        if (process.platform === "win32") {
            let n = C0.release().split(".");
            return Number(n[0]) >= 10 && Number(n[2]) >= 10586 ? (Number(n[2]) >= 14931 ? 3 : 2) : 1;
        }
        if ("CI" in ue)
            return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some(n => n in ue) ||
                ue.CI_NAME === "codeship"
                ? 1
                : r;
        if ("TEAMCITY_VERSION" in ue) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(ue.TEAMCITY_VERSION) ? 1 : 0;
        if (ue.COLORTERM === "truecolor") return 3;
        if ("TERM_PROGRAM" in ue) {
            let n = parseInt((ue.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
            switch (ue.TERM_PROGRAM) {
                case "iTerm.app":
                    return n >= 3 ? 3 : 2;
                case "Apple_Terminal":
                    return 2;
            }
        }
        return /-256(color)?$/i.test(ue.TERM)
            ? 2
            : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(ue.TERM) || "COLORTERM" in ue
            ? 1
            : r;
    }
    function b0(e) {
        let t = Is(e, e && e.isTTY);
        return xs(t);
    }
    Pl.exports = { supportsColor: b0, stdout: xs(Is(!0, Rl.isatty(1))), stderr: xs(Is(!0, Rl.isatty(2))) };
});
var ql = w((ce, jn) => {
    var T0 = require("tty"),
        Bn = require("util");
    ce.init = D0;
    ce.log = N0;
    ce.formatArgs = x0;
    ce.save = R0;
    ce.load = P0;
    ce.useColors = O0;
    ce.destroy = Bn.deprecate(() => {},
    "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    ce.colors = [6, 2, 3, 4, 5, 1];
    try {
        let e = Dl();
        e &&
            (e.stderr || e).level >= 2 &&
            (ce.colors = [
                20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81,
                92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170,
                171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215,
                220, 221
            ]);
    } catch {}
    ce.inspectOpts = Object.keys(process.env)
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
    function O0() {
        return "colors" in ce.inspectOpts ? !!ce.inspectOpts.colors : T0.isatty(process.stderr.fd);
    }
    function x0(e) {
        let { namespace: t, useColors: r } = this;
        if (r) {
            let n = this.color,
                i = "\x1B[3" + (n < 8 ? n : "8;5;" + n),
                s = "  ".concat(i, ";1m").concat(t, " \x1B[0m");
            (e[0] = s + e[0].split("\n").join("\n" + s)), e.push(i + "m+" + jn.exports.humanize(this.diff) + "\x1B[0m");
        } else e[0] = I0() + t + " " + e[0];
    }
    function I0() {
        return ce.inspectOpts.hideDate ? "" : new Date().toISOString() + " ";
    }
    function N0(...e) {
        return process.stderr.write(Bn.formatWithOptions(ce.inspectOpts, ...e) + "\n");
    }
    function R0(e) {
        e ? (process.env.DEBUG = e) : delete process.env.DEBUG;
    }
    function P0() {
        return process.env.DEBUG;
    }
    function D0(e) {
        e.inspectOpts = {};
        let t = Object.keys(ce.inspectOpts);
        for (let r = 0; r < t.length; r++) e.inspectOpts[t[r]] = ce.inspectOpts[t[r]];
    }
    jn.exports = Os()(ce);
    var { formatters: Fl } = jn.exports;
    Fl.o = function (e) {
        return (
            (this.inspectOpts.colors = this.useColors),
            Bn.inspect(e, this.inspectOpts)
                .split("\n")
                .map(t => t.trim())
                .join(" ")
        );
    };
    Fl.O = function (e) {
        return (this.inspectOpts.colors = this.useColors), Bn.inspect(e, this.inspectOpts);
    };
});
var Ll = w((Xx, Ns) => {
    typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs
        ? (Ns.exports = xl())
        : (Ns.exports = ql());
});
var Br = w(Rs => {
    "use strict";
    Object.defineProperty(Rs, "__esModule", { value: !0 });
    Rs.newError = F0;
    function F0(e, t) {
        let r = new Error(e);
        return (r.code = t), r;
    }
});
var Ds = w(Hn => {
    "use strict";
    Object.defineProperty(Hn, "__esModule", { value: !0 });
    Hn.ProgressCallbackTransform = void 0;
    var q0 = require("stream"),
        Ps = class extends q0.Transform {
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
    Hn.ProgressCallbackTransform = Ps;
});
var Ml = w(ve => {
    "use strict";
    Object.defineProperty(ve, "__esModule", { value: !0 });
    ve.DigestTransform = ve.HttpExecutor = ve.HttpError = void 0;
    ve.createHttpError = Fs;
    ve.parseJson = H0;
    ve.configureRequestOptionsFromUrl = Ul;
    ve.configureRequestUrl = Ls;
    ve.safeGetHeader = or;
    ve.configureRequestOptions = Wn;
    ve.safeStringifyJson = Gn;
    var L0 = require("crypto"),
        $0 = Ll(),
        k0 = require("fs"),
        U0 = require("stream"),
        kl = require("url"),
        M0 = kn(),
        $l = Br(),
        B0 = Ds(),
        jr = (0, $0.default)("electron-builder");
    function Fs(e, t = null) {
        return new Hr(
            e.statusCode || -1,
            "".concat(e.statusCode, " ").concat(e.statusMessage) +
                (t == null ? "" : "\n" + JSON.stringify(t, null, "  ")) +
                "\nHeaders: " +
                Gn(e.headers),
            t
        );
    }
    var j0 = new Map([
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
        Hr = class extends Error {
            constructor(t, r = "HTTP error: ".concat(j0.get(t) || t), n = null) {
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
    ve.HttpError = Hr;
    function H0(e) {
        return e.then(t => (t == null || t.length === 0 ? null : JSON.parse(t)));
    }
    var qs = class e {
        constructor() {
            this.maxRedirects = 10;
        }
        request(t, r = new M0.CancellationToken(), n) {
            Wn(t);
            let i = n == null ? void 0 : JSON.stringify(n),
                s = i ? Buffer.from(i) : void 0;
            if (s != null) {
                jr(i);
                let { headers: o, ...a } = t;
                t = { method: "post", headers: { "Content-Type": "application/json", "Content-Length": s.length, ...o }, ...a };
            }
            return this.doApiRequest(t, r, o => o.end(s));
        }
        doApiRequest(t, r, n, i = 0) {
            return (
                jr.enabled && jr("Request: ".concat(Gn(t))),
                r.createPromise((s, o, a) => {
                    let l = this.createRequest(t, h => {
                        try {
                            this.handleResponse(h, t, r, s, o, i, n);
                        } catch (c) {
                            o(c);
                        }
                    });
                    this.addErrorAndTimeoutHandlers(l, o, t.timeout),
                        this.addRedirectHandlers(l, t, o, i, h => {
                            this.doApiRequest(h, r, n, i).then(s).catch(o);
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
                (jr.enabled &&
                    jr("Response: ".concat(t.statusCode, " ").concat(t.statusMessage, ", request options: ").concat(Gn(r))),
                t.statusCode === 404)
            ) {
                s(
                    Fs(
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
            let h = (l = t.statusCode) !== null && l !== void 0 ? l : 0,
                c = h >= 300 && h < 400,
                f = or(t, "location");
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
                            let p = or(t, "content-type"),
                                _ =
                                    p != null &&
                                    (Array.isArray(p) ? p.find(v => v.includes("json")) != null : p.includes("json"));
                            s(
                                Fs(
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
                Ls(t, a),
                    Wn(a),
                    this.doDownload(
                        a,
                        {
                            destination: null,
                            options: r,
                            onCancel: s,
                            callback: l => {
                                l == null ? n(Buffer.concat(o)) : i(l);
                            },
                            responseHandler: (l, h) => {
                                let c = 0;
                                l.on("data", f => {
                                    if (((c += f.length), c > 524288e3)) {
                                        h(new Error("Maximum allowed size is 500 MB"));
                                        return;
                                    }
                                    o.push(f);
                                }),
                                    l.on("end", () => {
                                        h(null);
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
                let o = or(s, "location");
                if (o != null) {
                    n < this.maxRedirects
                        ? this.doDownload(e.prepareRedirectUrlOptions(o, t), r, n++)
                        : r.callback(this.createMaxRedirectError());
                    return;
                }
                r.responseHandler == null ? G0(r, s) : r.responseHandler(s, r.callback);
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
                let s = new kl.URL(t);
                (s.hostname.endsWith(".amazonaws.com") || s.searchParams.has("X-Amz-Credential")) && delete i.authorization;
            }
            return n;
        }
        static retryOnServerError(t, r = 3) {
            for (let n = 0; ; n++)
                try {
                    return t();
                } catch (i) {
                    if (n < r && ((i instanceof Hr && i.isServerError()) || i.code === "EPIPE")) continue;
                    throw i;
                }
        }
    };
    ve.HttpExecutor = qs;
    function Ul(e, t) {
        let r = Wn(t);
        return Ls(new kl.URL(e), r), r;
    }
    function Ls(e, t) {
        (t.protocol = e.protocol),
            (t.hostname = e.hostname),
            e.port ? (t.port = e.port) : t.port && delete t.port,
            (t.path = e.pathname + e.search);
    }
    var Wr = class extends U0.Transform {
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
                (this.digester = (0, L0.createHash)(r));
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
            if (this._actual == null) throw (0, $l.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
            if (this._actual !== this.expected)
                throw (0, $l.newError)(
                    ""
                        .concat(this.algorithm, " checksum mismatch, expected ")
                        .concat(this.expected, ", got ")
                        .concat(this._actual),
                    "ERR_CHECKSUM_MISMATCH"
                );
            return null;
        }
    };
    ve.DigestTransform = Wr;
    function W0(e, t, r) {
        return e != null && t != null && e !== t
            ? (r(new Error("checksum mismatch: expected ".concat(t, " but got ").concat(e, " (X-Checksum-Sha2 header)"))), !1)
            : !0;
    }
    function or(e, t) {
        let r = e.headers[t];
        return r == null ? null : Array.isArray(r) ? (r.length === 0 ? null : r[r.length - 1]) : r;
    }
    function G0(e, t) {
        if (!W0(or(t, "X-Checksum-Sha2"), e.options.sha2, e.callback)) return;
        let r = [];
        if (e.options.onProgress != null) {
            let o = or(t, "content-length");
            o != null &&
                r.push(new B0.ProgressCallbackTransform(parseInt(o, 10), e.options.cancellationToken, e.options.onProgress));
        }
        let n = e.options.sha512;
        n != null
            ? r.push(
                  new Wr(
                      n,
                      "sha512",
                      n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64"
                  )
              )
            : e.options.sha2 != null && r.push(new Wr(e.options.sha2, "sha256", "hex"));
        let i = (0, k0.createWriteStream)(e.destination);
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
    function Wn(e, t, r) {
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
    function Gn(e, t) {
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
var jl = w(Vn => {
    "use strict";
    Object.defineProperty(Vn, "__esModule", { value: !0 });
    Vn.githubUrl = V0;
    Vn.getS3LikeProviderBaseUrl = Y0;
    function V0(e, t = "github.com") {
        return "".concat(e.protocol || "https", "://").concat(e.host || t);
    }
    function Y0(e) {
        let t = e.provider;
        if (t === "s3") return z0(e);
        if (t === "spaces") return X0(e);
        throw new Error("Not supported provider: ".concat(t));
    }
    function z0(e) {
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
        return Bl(t, e.path);
    }
    function Bl(e, t) {
        return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), (e += t)), e;
    }
    function X0(e) {
        if (e.name == null) throw new Error("name is missing");
        if (e.region == null) throw new Error("region is missing");
        return Bl("https://".concat(e.name, ".").concat(e.region, ".digitaloceanspaces.com"), e.path);
    }
});
var Hl = w($s => {
    "use strict";
    Object.defineProperty($s, "__esModule", { value: !0 });
    $s.parseDn = K0;
    function K0(e) {
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
var zl = w(ar => {
    "use strict";
    Object.defineProperty(ar, "__esModule", { value: !0 });
    ar.nil = ar.UUID = void 0;
    var Vl = require("crypto"),
        Yl = Br(),
        J0 = "options.name must be either a string or a Buffer",
        Wl = (0, Vl.randomBytes)(16);
    Wl[0] = Wl[0] | 1;
    var Yn = {},
        B = [];
    for (let e = 0; e < 256; e++) {
        let t = (e + 256).toString(16).substr(1);
        (Yn[t] = e), (B[e] = t);
    }
    var Nt = class e {
        constructor(t) {
            (this.ascii = null), (this.binary = null);
            let r = e.check(t);
            if (!r) throw new Error("not a UUID");
            (this.version = r.version), r.format === "ascii" ? (this.ascii = t) : (this.binary = t);
        }
        static v5(t, r) {
            return Q0(t, "sha1", 80, r);
        }
        toString() {
            return this.ascii == null && (this.ascii = Z0(this.binary)), this.ascii;
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
                                  version: (Yn[t[14] + t[15]] & 240) >> 4,
                                  variant: Gl((Yn[t[19] + t[20]] & 224) >> 5),
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
                    : { version: (t[r + 6] & 240) >> 4, variant: Gl((t[r + 8] & 224) >> 5), format: "binary" };
            }
            throw (0, Yl.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
        }
        static parse(t) {
            let r = Buffer.allocUnsafe(16),
                n = 0;
            for (let i = 0; i < 16; i++) (r[i] = Yn[t[n++] + t[n++]]), (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
            return r;
        }
    };
    ar.UUID = Nt;
    Nt.OID = Nt.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
    function Gl(e) {
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
    var Gr;
    (function (e) {
        (e[(e.ASCII = 0)] = "ASCII"), (e[(e.BINARY = 1)] = "BINARY"), (e[(e.OBJECT = 2)] = "OBJECT");
    })(Gr || (Gr = {}));
    function Q0(e, t, r, n, i = Gr.ASCII) {
        let s = (0, Vl.createHash)(t);
        if (typeof e != "string" && !Buffer.isBuffer(e)) throw (0, Yl.newError)(J0, "ERR_INVALID_UUID_NAME");
        s.update(n), s.update(e);
        let a = s.digest(),
            l;
        switch (i) {
            case Gr.BINARY:
                (a[6] = (a[6] & 15) | r), (a[8] = (a[8] & 63) | 128), (l = a);
                break;
            case Gr.OBJECT:
                (a[6] = (a[6] & 15) | r), (a[8] = (a[8] & 63) | 128), (l = new Nt(a));
                break;
            default:
                l =
                    B[a[0]] +
                    B[a[1]] +
                    B[a[2]] +
                    B[a[3]] +
                    "-" +
                    B[a[4]] +
                    B[a[5]] +
                    "-" +
                    B[(a[6] & 15) | r] +
                    B[a[7]] +
                    "-" +
                    B[(a[8] & 63) | 128] +
                    B[a[9]] +
                    "-" +
                    B[a[10]] +
                    B[a[11]] +
                    B[a[12]] +
                    B[a[13]] +
                    B[a[14]] +
                    B[a[15]];
                break;
        }
        return l;
    }
    function Z0(e) {
        return (
            B[e[0]] +
            B[e[1]] +
            B[e[2]] +
            B[e[3]] +
            "-" +
            B[e[4]] +
            B[e[5]] +
            "-" +
            B[e[6]] +
            B[e[7]] +
            "-" +
            B[e[8]] +
            B[e[9]] +
            "-" +
            B[e[10]] +
            B[e[11]] +
            B[e[12]] +
            B[e[13]] +
            B[e[14]] +
            B[e[15]]
        );
    }
    ar.nil = new Nt("00000000-0000-0000-0000-000000000000");
});
var Xl = w(zn => {
    (function (e) {
        (e.parser = function (d, u) {
            return new r(d, u);
        }),
            (e.SAXParser = r),
            (e.SAXStream = h),
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
        function r(d, u) {
            if (!(this instanceof r)) return new r(d, u);
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
                (A.strict = !!d),
                (A.noscript = !!(d || A.opt.noscript)),
                (A.state = E.BEGIN),
                (A.strictEntities = A.opt.strictEntities),
                (A.ENTITIES = A.strictEntities ? Object.create(e.XML_ENTITIES) : Object.create(e.ENTITIES)),
                (A.attribList = []),
                A.opt.xmlns && (A.ns = Object.create(_)),
                A.opt.unquotedAttributeValues === void 0 && (A.opt.unquotedAttributeValues = !d),
                (A.trackPosition = A.opt.position !== !1),
                A.trackPosition && (A.position = A.line = A.column = 0),
                U(A, "onready");
        }
        Object.create ||
            (Object.create = function (d) {
                function u() {}
                u.prototype = d;
                var A = new u();
                return A;
            }),
            Object.keys ||
                (Object.keys = function (d) {
                    var u = [];
                    for (var A in d) d.hasOwnProperty(A) && u.push(A);
                    return u;
                });
        function n(d) {
            for (var u = Math.max(e.MAX_BUFFER_LENGTH, 10), A = 0, y = 0, H = t.length; y < H; y++) {
                var ae = d[t[y]].length;
                if (ae > u)
                    switch (t[y]) {
                        case "textNode":
                            ee(d);
                            break;
                        case "cdata":
                            R(d, "oncdata", d.cdata), (d.cdata = "");
                            break;
                        case "script":
                            R(d, "onscript", d.script), (d.script = "");
                            break;
                        default:
                            Q(d, "Max buffer length exceeded: " + t[y]);
                    }
                A = Math.max(A, ae);
            }
            var le = e.MAX_BUFFER_LENGTH - A;
            d.bufferCheckPosition = le + d.position;
        }
        function i(d) {
            for (var u = 0, A = t.length; u < A; u++) d[t[u]] = "";
        }
        function s(d) {
            ee(d),
                d.cdata !== "" && (R(d, "oncdata", d.cdata), (d.cdata = "")),
                d.script !== "" && (R(d, "onscript", d.script), (d.script = ""));
        }
        r.prototype = {
            end: function () {
                z(this);
            },
            write: a0,
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
        var a = e.EVENTS.filter(function (d) {
            return d !== "error" && d !== "end";
        });
        function l(d, u) {
            return new h(d, u);
        }
        function h(d, u) {
            if (!(this instanceof h)) return new h(d, u);
            o.apply(this), (this._parser = new r(d, u)), (this.writable = !0), (this.readable = !0);
            var A = this;
            (this._parser.onend = function () {
                A.emit("end");
            }),
                (this._parser.onerror = function (y) {
                    A.emit("error", y), (A._parser.error = null);
                }),
                (this._decoder = null),
                a.forEach(function (y) {
                    Object.defineProperty(A, "on" + y, {
                        get: function () {
                            return A._parser["on" + y];
                        },
                        set: function (H) {
                            if (!H) return A.removeAllListeners(y), (A._parser["on" + y] = H), H;
                            A.on(y, H);
                        },
                        enumerable: !0,
                        configurable: !1
                    });
                });
        }
        (h.prototype = Object.create(o.prototype, { constructor: { value: h } })),
            (h.prototype.write = function (d) {
                if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(d)) {
                    if (!this._decoder) {
                        var u = require("string_decoder").StringDecoder;
                        this._decoder = new u("utf8");
                    }
                    d = this._decoder.write(d);
                }
                return this._parser.write(d.toString()), this.emit("data", d), !0;
            }),
            (h.prototype.end = function (d) {
                return d && d.length && this.write(d), this._parser.end(), !0;
            }),
            (h.prototype.on = function (d, u) {
                var A = this;
                return (
                    !A._parser["on" + d] &&
                        a.indexOf(d) !== -1 &&
                        (A._parser["on" + d] = function () {
                            var y = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
                            y.splice(0, 0, d), A.emit.apply(A, y);
                        }),
                    o.prototype.on.call(A, d, u)
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
        function N(d) {
            return d === " " || d === "\n" || d === "\r" || d === "	";
        }
        function $(d) {
            return d === '"' || d === "'";
        }
        function Ue(d) {
            return d === ">" || N(d);
        }
        function X(d, u) {
            return d.test(u);
        }
        function de(d, u) {
            return !X(d, u);
        }
        var E = 0;
        (e.STATE = {
            BEGIN: E++,
            BEGIN_WHITESPACE: E++,
            TEXT: E++,
            TEXT_ENTITY: E++,
            OPEN_WAKA: E++,
            SGML_DECL: E++,
            SGML_DECL_QUOTED: E++,
            DOCTYPE: E++,
            DOCTYPE_QUOTED: E++,
            DOCTYPE_DTD: E++,
            DOCTYPE_DTD_QUOTED: E++,
            COMMENT_STARTING: E++,
            COMMENT: E++,
            COMMENT_ENDING: E++,
            COMMENT_ENDED: E++,
            CDATA: E++,
            CDATA_ENDING: E++,
            CDATA_ENDING_2: E++,
            PROC_INST: E++,
            PROC_INST_BODY: E++,
            PROC_INST_ENDING: E++,
            OPEN_TAG: E++,
            OPEN_TAG_SLASH: E++,
            ATTRIB: E++,
            ATTRIB_NAME: E++,
            ATTRIB_NAME_SAW_WHITE: E++,
            ATTRIB_VALUE: E++,
            ATTRIB_VALUE_QUOTED: E++,
            ATTRIB_VALUE_CLOSED: E++,
            ATTRIB_VALUE_UNQUOTED: E++,
            ATTRIB_VALUE_ENTITY_Q: E++,
            ATTRIB_VALUE_ENTITY_U: E++,
            CLOSE_TAG: E++,
            CLOSE_TAG_SAW_WHITE: E++,
            SCRIPT: E++,
            SCRIPT_ENDING: E++
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
            Object.keys(e.ENTITIES).forEach(function (d) {
                var u = e.ENTITIES[d],
                    A = typeof u == "number" ? String.fromCharCode(u) : u;
                e.ENTITIES[d] = A;
            });
        for (var P in e.STATE) e.STATE[e.STATE[P]] = P;
        E = e.STATE;
        function U(d, u, A) {
            d[u] && d[u](A);
        }
        function R(d, u, A) {
            d.textNode && ee(d), U(d, u, A);
        }
        function ee(d) {
            (d.textNode = se(d.opt, d.textNode)), d.textNode && U(d, "ontext", d.textNode), (d.textNode = "");
        }
        function se(d, u) {
            return d.trim && (u = u.trim()), d.normalize && (u = u.replace(/\s+/g, " ")), u;
        }
        function Q(d, u) {
            return (
                ee(d),
                d.trackPosition && (u += "\nLine: " + d.line + "\nColumn: " + d.column + "\nChar: " + d.c),
                (u = new Error(u)),
                (d.error = u),
                U(d, "onerror", u),
                d
            );
        }
        function z(d) {
            return (
                d.sawRoot && !d.closedRoot && F(d, "Unclosed root tag"),
                d.state !== E.BEGIN && d.state !== E.BEGIN_WHITESPACE && d.state !== E.TEXT && Q(d, "Unexpected end"),
                ee(d),
                (d.c = ""),
                (d.closed = !0),
                U(d, "onend"),
                r.call(d, d.strict, d.opt),
                d
            );
        }
        function F(d, u) {
            if (typeof d != "object" || !(d instanceof r)) throw new Error("bad call to strictFail");
            d.strict && Q(d, u);
        }
        function W(d) {
            d.strict || (d.tagName = d.tagName[d.looseCase]());
            var u = d.tags[d.tags.length - 1] || d,
                A = (d.tag = { name: d.tagName, attributes: {} });
            d.opt.xmlns && (A.ns = u.ns), (d.attribList.length = 0), R(d, "onopentagstart", A);
        }
        function ie(d, u) {
            var A = d.indexOf(":"),
                y = A < 0 ? ["", d] : d.split(":"),
                H = y[0],
                ae = y[1];
            return u && d === "xmlns" && ((H = "xmlns"), (ae = "")), { prefix: H, local: ae };
        }
        function G(d) {
            if (
                (d.strict || (d.attribName = d.attribName[d.looseCase]()),
                d.attribList.indexOf(d.attribName) !== -1 || d.tag.attributes.hasOwnProperty(d.attribName))
            ) {
                d.attribName = d.attribValue = "";
                return;
            }
            if (d.opt.xmlns) {
                var u = ie(d.attribName, !0),
                    A = u.prefix,
                    y = u.local;
                if (A === "xmlns")
                    if (y === "xml" && d.attribValue !== m)
                        F(d, "xml: prefix must be bound to " + m + "\nActual: " + d.attribValue);
                    else if (y === "xmlns" && d.attribValue !== p)
                        F(d, "xmlns: prefix must be bound to " + p + "\nActual: " + d.attribValue);
                    else {
                        var H = d.tag,
                            ae = d.tags[d.tags.length - 1] || d;
                        H.ns === ae.ns && (H.ns = Object.create(ae.ns)), (H.ns[y] = d.attribValue);
                    }
                d.attribList.push([d.attribName, d.attribValue]);
            } else
                (d.tag.attributes[d.attribName] = d.attribValue),
                    R(d, "onattribute", { name: d.attribName, value: d.attribValue });
            d.attribName = d.attribValue = "";
        }
        function ut(d, u) {
            if (d.opt.xmlns) {
                var A = d.tag,
                    y = ie(d.tagName);
                (A.prefix = y.prefix),
                    (A.local = y.local),
                    (A.uri = A.ns[y.prefix] || ""),
                    A.prefix && !A.uri && (F(d, "Unbound namespace prefix: " + JSON.stringify(d.tagName)), (A.uri = y.prefix));
                var H = d.tags[d.tags.length - 1] || d;
                A.ns &&
                    H.ns !== A.ns &&
                    Object.keys(A.ns).forEach(function (Sl) {
                        R(d, "onopennamespace", { prefix: Sl, uri: A.ns[Sl] });
                    });
                for (var ae = 0, le = d.attribList.length; ae < le; ae++) {
                    var Ne = d.attribList[ae],
                        Re = Ne[0],
                        tr = Ne[1],
                        pe = ie(Re, !0),
                        tt = pe.prefix,
                        l0 = pe.local,
                        vl = tt === "" ? "" : A.ns[tt] || "",
                        bs = { name: Re, value: tr, prefix: tt, local: l0, uri: vl };
                    tt && tt !== "xmlns" && !vl && (F(d, "Unbound namespace prefix: " + JSON.stringify(tt)), (bs.uri = tt)),
                        (d.tag.attributes[Re] = bs),
                        R(d, "onattribute", bs);
                }
                d.attribList.length = 0;
            }
            (d.tag.isSelfClosing = !!u),
                (d.sawRoot = !0),
                d.tags.push(d.tag),
                R(d, "onopentag", d.tag),
                u ||
                    (!d.noscript && d.tagName.toLowerCase() === "script" ? (d.state = E.SCRIPT) : (d.state = E.TEXT),
                    (d.tag = null),
                    (d.tagName = "")),
                (d.attribName = d.attribValue = ""),
                (d.attribList.length = 0);
        }
        function Cs(d) {
            if (!d.tagName) {
                F(d, "Weird empty close tag."), (d.textNode += "</>"), (d.state = E.TEXT);
                return;
            }
            if (d.script) {
                if (d.tagName !== "script") {
                    (d.script += "</" + d.tagName + ">"), (d.tagName = ""), (d.state = E.SCRIPT);
                    return;
                }
                R(d, "onscript", d.script), (d.script = "");
            }
            var u = d.tags.length,
                A = d.tagName;
            d.strict || (A = A[d.looseCase]());
            for (var y = A; u--; ) {
                var H = d.tags[u];
                if (H.name !== y) F(d, "Unexpected close tag");
                else break;
            }
            if (u < 0) {
                F(d, "Unmatched closing tag: " + d.tagName), (d.textNode += "</" + d.tagName + ">"), (d.state = E.TEXT);
                return;
            }
            d.tagName = A;
            for (var ae = d.tags.length; ae-- > u; ) {
                var le = (d.tag = d.tags.pop());
                (d.tagName = d.tag.name), R(d, "onclosetag", d.tagName);
                var Ne = {};
                for (var Re in le.ns) Ne[Re] = le.ns[Re];
                var tr = d.tags[d.tags.length - 1] || d;
                d.opt.xmlns &&
                    le.ns !== tr.ns &&
                    Object.keys(le.ns).forEach(function (pe) {
                        var tt = le.ns[pe];
                        R(d, "onclosenamespace", { prefix: pe, uri: tt });
                    });
            }
            u === 0 && (d.closedRoot = !0),
                (d.tagName = d.attribValue = d.attribName = ""),
                (d.attribList.length = 0),
                (d.state = E.TEXT);
        }
        function o0(d) {
            var u = d.entity,
                A = u.toLowerCase(),
                y,
                H = "";
            return d.ENTITIES[u]
                ? d.ENTITIES[u]
                : d.ENTITIES[A]
                ? d.ENTITIES[A]
                : ((u = A),
                  u.charAt(0) === "#" &&
                      (u.charAt(1) === "x"
                          ? ((u = u.slice(2)), (y = parseInt(u, 16)), (H = y.toString(16)))
                          : ((u = u.slice(1)), (y = parseInt(u, 10)), (H = y.toString(10)))),
                  (u = u.replace(/^0+/, "")),
                  isNaN(y) || H.toLowerCase() !== u
                      ? (F(d, "Invalid character entity"), "&" + d.entity + ";")
                      : String.fromCodePoint(y));
        }
        function El(d, u) {
            u === "<"
                ? ((d.state = E.OPEN_WAKA), (d.startTagPosition = d.position))
                : N(u) || (F(d, "Non-whitespace before first tag."), (d.textNode = u), (d.state = E.TEXT));
        }
        function _l(d, u) {
            var A = "";
            return u < d.length && (A = d.charAt(u)), A;
        }
        function a0(d) {
            var u = this;
            if (this.error) throw this.error;
            if (u.closed) return Q(u, "Cannot write after close. Assign an onready handler.");
            if (d === null) return z(u);
            typeof d == "object" && (d = d.toString());
            for (var A = 0, y = ""; (y = _l(d, A++)), (u.c = y), !!y; )
                switch ((u.trackPosition && (u.position++, y === "\n" ? (u.line++, (u.column = 0)) : u.column++), u.state)) {
                    case E.BEGIN:
                        if (((u.state = E.BEGIN_WHITESPACE), y === "\uFEFF")) continue;
                        El(u, y);
                        continue;
                    case E.BEGIN_WHITESPACE:
                        El(u, y);
                        continue;
                    case E.TEXT:
                        if (u.sawRoot && !u.closedRoot) {
                            for (var H = A - 1; y && y !== "<" && y !== "&"; )
                                (y = _l(d, A++)),
                                    y && u.trackPosition && (u.position++, y === "\n" ? (u.line++, (u.column = 0)) : u.column++);
                            u.textNode += d.substring(H, A - 1);
                        }
                        y === "<" && !(u.sawRoot && u.closedRoot && !u.strict)
                            ? ((u.state = E.OPEN_WAKA), (u.startTagPosition = u.position))
                            : (!N(y) && (!u.sawRoot || u.closedRoot) && F(u, "Text data outside of root node."),
                              y === "&" ? (u.state = E.TEXT_ENTITY) : (u.textNode += y));
                        continue;
                    case E.SCRIPT:
                        y === "<" ? (u.state = E.SCRIPT_ENDING) : (u.script += y);
                        continue;
                    case E.SCRIPT_ENDING:
                        y === "/" ? (u.state = E.CLOSE_TAG) : ((u.script += "<" + y), (u.state = E.SCRIPT));
                        continue;
                    case E.OPEN_WAKA:
                        if (y === "!") (u.state = E.SGML_DECL), (u.sgmlDecl = "");
                        else if (!N(y))
                            if (X(v, y)) (u.state = E.OPEN_TAG), (u.tagName = y);
                            else if (y === "/") (u.state = E.CLOSE_TAG), (u.tagName = "");
                            else if (y === "?") (u.state = E.PROC_INST), (u.procInstName = u.procInstBody = "");
                            else {
                                if ((F(u, "Unencoded <"), u.startTagPosition + 1 < u.position)) {
                                    var ae = u.position - u.startTagPosition;
                                    y = new Array(ae).join(" ") + y;
                                }
                                (u.textNode += "<" + y), (u.state = E.TEXT);
                            }
                        continue;
                    case E.SGML_DECL:
                        if (u.sgmlDecl + y === "--") {
                            (u.state = E.COMMENT), (u.comment = ""), (u.sgmlDecl = "");
                            continue;
                        }
                        u.doctype && u.doctype !== !0 && u.sgmlDecl
                            ? ((u.state = E.DOCTYPE_DTD), (u.doctype += "<!" + u.sgmlDecl + y), (u.sgmlDecl = ""))
                            : (u.sgmlDecl + y).toUpperCase() === c
                            ? (R(u, "onopencdata"), (u.state = E.CDATA), (u.sgmlDecl = ""), (u.cdata = ""))
                            : (u.sgmlDecl + y).toUpperCase() === f
                            ? ((u.state = E.DOCTYPE),
                              (u.doctype || u.sawRoot) && F(u, "Inappropriately located doctype declaration"),
                              (u.doctype = ""),
                              (u.sgmlDecl = ""))
                            : y === ">"
                            ? (R(u, "onsgmldeclaration", u.sgmlDecl), (u.sgmlDecl = ""), (u.state = E.TEXT))
                            : ($(y) && (u.state = E.SGML_DECL_QUOTED), (u.sgmlDecl += y));
                        continue;
                    case E.SGML_DECL_QUOTED:
                        y === u.q && ((u.state = E.SGML_DECL), (u.q = "")), (u.sgmlDecl += y);
                        continue;
                    case E.DOCTYPE:
                        y === ">"
                            ? ((u.state = E.TEXT), R(u, "ondoctype", u.doctype), (u.doctype = !0))
                            : ((u.doctype += y),
                              y === "[" ? (u.state = E.DOCTYPE_DTD) : $(y) && ((u.state = E.DOCTYPE_QUOTED), (u.q = y)));
                        continue;
                    case E.DOCTYPE_QUOTED:
                        (u.doctype += y), y === u.q && ((u.q = ""), (u.state = E.DOCTYPE));
                        continue;
                    case E.DOCTYPE_DTD:
                        y === "]"
                            ? ((u.doctype += y), (u.state = E.DOCTYPE))
                            : y === "<"
                            ? ((u.state = E.OPEN_WAKA), (u.startTagPosition = u.position))
                            : $(y)
                            ? ((u.doctype += y), (u.state = E.DOCTYPE_DTD_QUOTED), (u.q = y))
                            : (u.doctype += y);
                        continue;
                    case E.DOCTYPE_DTD_QUOTED:
                        (u.doctype += y), y === u.q && ((u.state = E.DOCTYPE_DTD), (u.q = ""));
                        continue;
                    case E.COMMENT:
                        y === "-" ? (u.state = E.COMMENT_ENDING) : (u.comment += y);
                        continue;
                    case E.COMMENT_ENDING:
                        y === "-"
                            ? ((u.state = E.COMMENT_ENDED),
                              (u.comment = se(u.opt, u.comment)),
                              u.comment && R(u, "oncomment", u.comment),
                              (u.comment = ""))
                            : ((u.comment += "-" + y), (u.state = E.COMMENT));
                        continue;
                    case E.COMMENT_ENDED:
                        y !== ">"
                            ? (F(u, "Malformed comment"), (u.comment += "--" + y), (u.state = E.COMMENT))
                            : u.doctype && u.doctype !== !0
                            ? (u.state = E.DOCTYPE_DTD)
                            : (u.state = E.TEXT);
                        continue;
                    case E.CDATA:
                        y === "]" ? (u.state = E.CDATA_ENDING) : (u.cdata += y);
                        continue;
                    case E.CDATA_ENDING:
                        y === "]" ? (u.state = E.CDATA_ENDING_2) : ((u.cdata += "]" + y), (u.state = E.CDATA));
                        continue;
                    case E.CDATA_ENDING_2:
                        y === ">"
                            ? (u.cdata && R(u, "oncdata", u.cdata), R(u, "onclosecdata"), (u.cdata = ""), (u.state = E.TEXT))
                            : y === "]"
                            ? (u.cdata += "]")
                            : ((u.cdata += "]]" + y), (u.state = E.CDATA));
                        continue;
                    case E.PROC_INST:
                        y === "?" ? (u.state = E.PROC_INST_ENDING) : N(y) ? (u.state = E.PROC_INST_BODY) : (u.procInstName += y);
                        continue;
                    case E.PROC_INST_BODY:
                        if (!u.procInstBody && N(y)) continue;
                        y === "?" ? (u.state = E.PROC_INST_ENDING) : (u.procInstBody += y);
                        continue;
                    case E.PROC_INST_ENDING:
                        y === ">"
                            ? (R(u, "onprocessinginstruction", { name: u.procInstName, body: u.procInstBody }),
                              (u.procInstName = u.procInstBody = ""),
                              (u.state = E.TEXT))
                            : ((u.procInstBody += "?" + y), (u.state = E.PROC_INST_BODY));
                        continue;
                    case E.OPEN_TAG:
                        X(S, y)
                            ? (u.tagName += y)
                            : (W(u),
                              y === ">"
                                  ? ut(u)
                                  : y === "/"
                                  ? (u.state = E.OPEN_TAG_SLASH)
                                  : (N(y) || F(u, "Invalid character in tag name"), (u.state = E.ATTRIB)));
                        continue;
                    case E.OPEN_TAG_SLASH:
                        y === ">"
                            ? (ut(u, !0), Cs(u))
                            : (F(u, "Forward-slash in opening tag not followed by >"), (u.state = E.ATTRIB));
                        continue;
                    case E.ATTRIB:
                        if (N(y)) continue;
                        y === ">"
                            ? ut(u)
                            : y === "/"
                            ? (u.state = E.OPEN_TAG_SLASH)
                            : X(v, y)
                            ? ((u.attribName = y), (u.attribValue = ""), (u.state = E.ATTRIB_NAME))
                            : F(u, "Invalid attribute name");
                        continue;
                    case E.ATTRIB_NAME:
                        y === "="
                            ? (u.state = E.ATTRIB_VALUE)
                            : y === ">"
                            ? (F(u, "Attribute without value"), (u.attribValue = u.attribName), G(u), ut(u))
                            : N(y)
                            ? (u.state = E.ATTRIB_NAME_SAW_WHITE)
                            : X(S, y)
                            ? (u.attribName += y)
                            : F(u, "Invalid attribute name");
                        continue;
                    case E.ATTRIB_NAME_SAW_WHITE:
                        if (y === "=") u.state = E.ATTRIB_VALUE;
                        else {
                            if (N(y)) continue;
                            F(u, "Attribute without value"),
                                (u.tag.attributes[u.attribName] = ""),
                                (u.attribValue = ""),
                                R(u, "onattribute", { name: u.attribName, value: "" }),
                                (u.attribName = ""),
                                y === ">"
                                    ? ut(u)
                                    : X(v, y)
                                    ? ((u.attribName = y), (u.state = E.ATTRIB_NAME))
                                    : (F(u, "Invalid attribute name"), (u.state = E.ATTRIB));
                        }
                        continue;
                    case E.ATTRIB_VALUE:
                        if (N(y)) continue;
                        $(y)
                            ? ((u.q = y), (u.state = E.ATTRIB_VALUE_QUOTED))
                            : (u.opt.unquotedAttributeValues || Q(u, "Unquoted attribute value"),
                              (u.state = E.ATTRIB_VALUE_UNQUOTED),
                              (u.attribValue = y));
                        continue;
                    case E.ATTRIB_VALUE_QUOTED:
                        if (y !== u.q) {
                            y === "&" ? (u.state = E.ATTRIB_VALUE_ENTITY_Q) : (u.attribValue += y);
                            continue;
                        }
                        G(u), (u.q = ""), (u.state = E.ATTRIB_VALUE_CLOSED);
                        continue;
                    case E.ATTRIB_VALUE_CLOSED:
                        N(y)
                            ? (u.state = E.ATTRIB)
                            : y === ">"
                            ? ut(u)
                            : y === "/"
                            ? (u.state = E.OPEN_TAG_SLASH)
                            : X(v, y)
                            ? (F(u, "No whitespace between attributes"),
                              (u.attribName = y),
                              (u.attribValue = ""),
                              (u.state = E.ATTRIB_NAME))
                            : F(u, "Invalid attribute name");
                        continue;
                    case E.ATTRIB_VALUE_UNQUOTED:
                        if (!Ue(y)) {
                            y === "&" ? (u.state = E.ATTRIB_VALUE_ENTITY_U) : (u.attribValue += y);
                            continue;
                        }
                        G(u), y === ">" ? ut(u) : (u.state = E.ATTRIB);
                        continue;
                    case E.CLOSE_TAG:
                        if (u.tagName)
                            y === ">"
                                ? Cs(u)
                                : X(S, y)
                                ? (u.tagName += y)
                                : u.script
                                ? ((u.script += "</" + u.tagName), (u.tagName = ""), (u.state = E.SCRIPT))
                                : (N(y) || F(u, "Invalid tagname in closing tag"), (u.state = E.CLOSE_TAG_SAW_WHITE));
                        else {
                            if (N(y)) continue;
                            de(v, y)
                                ? u.script
                                    ? ((u.script += "</" + y), (u.state = E.SCRIPT))
                                    : F(u, "Invalid tagname in closing tag.")
                                : (u.tagName = y);
                        }
                        continue;
                    case E.CLOSE_TAG_SAW_WHITE:
                        if (N(y)) continue;
                        y === ">" ? Cs(u) : F(u, "Invalid characters in closing tag");
                        continue;
                    case E.TEXT_ENTITY:
                    case E.ATTRIB_VALUE_ENTITY_Q:
                    case E.ATTRIB_VALUE_ENTITY_U:
                        var le, Ne;
                        switch (u.state) {
                            case E.TEXT_ENTITY:
                                (le = E.TEXT), (Ne = "textNode");
                                break;
                            case E.ATTRIB_VALUE_ENTITY_Q:
                                (le = E.ATTRIB_VALUE_QUOTED), (Ne = "attribValue");
                                break;
                            case E.ATTRIB_VALUE_ENTITY_U:
                                (le = E.ATTRIB_VALUE_UNQUOTED), (Ne = "attribValue");
                                break;
                        }
                        if (y === ";") {
                            var Re = o0(u);
                            u.opt.unparsedEntities && !Object.values(e.XML_ENTITIES).includes(Re)
                                ? ((u.entity = ""), (u.state = le), u.write(Re))
                                : ((u[Ne] += Re), (u.entity = ""), (u.state = le));
                        } else
                            X(u.entity.length ? C : T, y)
                                ? (u.entity += y)
                                : (F(u, "Invalid character in entity name"),
                                  (u[Ne] += "&" + u.entity + y),
                                  (u.entity = ""),
                                  (u.state = le));
                        continue;
                    default:
                        throw new Error(u, "Unknown state: " + u.state);
                }
            return u.position >= u.bufferCheckPosition && n(u), u;
        }
        String.fromCodePoint ||
            (function () {
                var d = String.fromCharCode,
                    u = Math.floor,
                    A = function () {
                        var y = 16384,
                            H = [],
                            ae,
                            le,
                            Ne = -1,
                            Re = arguments.length;
                        if (!Re) return "";
                        for (var tr = ""; ++Ne < Re; ) {
                            var pe = Number(arguments[Ne]);
                            if (!isFinite(pe) || pe < 0 || pe > 1114111 || u(pe) !== pe)
                                throw RangeError("Invalid code point: " + pe);
                            pe <= 65535
                                ? H.push(pe)
                                : ((pe -= 65536), (ae = (pe >> 10) + 55296), (le = (pe % 1024) + 56320), H.push(ae, le)),
                                (Ne + 1 === Re || H.length > y) && ((tr += d.apply(null, H)), (H.length = 0));
                        }
                        return tr;
                    };
                Object.defineProperty
                    ? Object.defineProperty(String, "fromCodePoint", { value: A, configurable: !0, writable: !0 })
                    : (String.fromCodePoint = A);
            })();
    })(typeof zn > "u" ? (zn.sax = {}) : zn);
});
var Jl = w(Vr => {
    "use strict";
    Object.defineProperty(Vr, "__esModule", { value: !0 });
    Vr.XElement = void 0;
    Vr.parseXml = nw;
    var ew = Xl(),
        Xn = Br(),
        Kn = class {
            constructor(t) {
                if (
                    ((this.name = t),
                    (this.value = ""),
                    (this.attributes = null),
                    (this.isCData = !1),
                    (this.elements = null),
                    !t)
                )
                    throw (0, Xn.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
                if (!rw(t)) throw (0, Xn.newError)("Invalid element name: ".concat(t), "ERR_XML_ELEMENT_INVALID_NAME");
            }
            attribute(t) {
                let r = this.attributes === null ? null : this.attributes[t];
                if (r == null) throw (0, Xn.newError)('No attribute "'.concat(t, '"'), "ERR_XML_MISSED_ATTRIBUTE");
                return r;
            }
            removeAttribute(t) {
                this.attributes !== null && delete this.attributes[t];
            }
            element(t, r = !1, n = null) {
                let i = this.elementOrNull(t, r);
                if (i === null) throw (0, Xn.newError)(n || 'No element "'.concat(t, '"'), "ERR_XML_MISSED_ELEMENT");
                return i;
            }
            elementOrNull(t, r = !1) {
                if (this.elements === null) return null;
                for (let n of this.elements) if (Kl(n, t, r)) return n;
                return null;
            }
            getElements(t, r = !1) {
                return this.elements === null ? [] : this.elements.filter(n => Kl(n, t, r));
            }
            elementValueOrEmpty(t, r = !1) {
                let n = this.elementOrNull(t, r);
                return n === null ? "" : n.value;
            }
        };
    Vr.XElement = Kn;
    var tw = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
    function rw(e) {
        return tw.test(e);
    }
    function Kl(e, t, r) {
        let n = e.name;
        return n === t || (r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase());
    }
    function nw(e) {
        let t = null,
            r = ew.parser(!0, {}),
            n = [];
        return (
            (r.onopentag = i => {
                let s = new Kn(i.name);
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
var Zl = w(Jn => {
    "use strict";
    Object.defineProperty(Jn, "__esModule", { value: !0 });
    Jn.MemoLazy = void 0;
    var ks = class {
        constructor(t, r) {
            (this.selector = t), (this.creator = r), (this.selected = void 0), (this._value = void 0);
        }
        get hasValue() {
            return this._value !== void 0;
        }
        get value() {
            let t = this.selector();
            if (this._value !== void 0 && Ql(this.selected, t)) return this._value;
            this.selected = t;
            let r = this.creator(t);
            return (this.value = r), r;
        }
        set value(t) {
            this._value = t;
        }
    };
    Jn.MemoLazy = ks;
    function Ql(e, t) {
        if (typeof e == "object" && e !== null && typeof t == "object" && t !== null) {
            let i = Object.keys(e),
                s = Object.keys(t);
            return i.length === s.length && i.every(o => Ql(e[o], t[o]));
        }
        return e === t;
    }
});
var tu = w(Us => {
    "use strict";
    Object.defineProperty(Us, "__esModule", { value: !0 });
    Us.retry = eu;
    var iw = kn();
    async function eu(e, t, r, n = 0, i = 0, s) {
        var o;
        let a = new iw.CancellationToken();
        try {
            return await e();
        } catch (l) {
            if ((!((o = s?.(l)) !== null && o !== void 0) || o) && t > 0 && !a.cancelled)
                return await new Promise(h => setTimeout(h, r + n * i)), await eu(e, t - 1, r, n, i + 1, s);
            throw l;
        }
    }
});
var fe = w(D => {
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
    D.asArray = fw;
    var ru = kn();
    Object.defineProperty(D, "CancellationToken", {
        enumerable: !0,
        get: function () {
            return ru.CancellationToken;
        }
    });
    Object.defineProperty(D, "CancellationError", {
        enumerable: !0,
        get: function () {
            return ru.CancellationError;
        }
    });
    var Xe = Ml();
    Object.defineProperty(D, "HttpError", {
        enumerable: !0,
        get: function () {
            return Xe.HttpError;
        }
    });
    Object.defineProperty(D, "createHttpError", {
        enumerable: !0,
        get: function () {
            return Xe.createHttpError;
        }
    });
    Object.defineProperty(D, "HttpExecutor", {
        enumerable: !0,
        get: function () {
            return Xe.HttpExecutor;
        }
    });
    Object.defineProperty(D, "DigestTransform", {
        enumerable: !0,
        get: function () {
            return Xe.DigestTransform;
        }
    });
    Object.defineProperty(D, "safeGetHeader", {
        enumerable: !0,
        get: function () {
            return Xe.safeGetHeader;
        }
    });
    Object.defineProperty(D, "configureRequestOptions", {
        enumerable: !0,
        get: function () {
            return Xe.configureRequestOptions;
        }
    });
    Object.defineProperty(D, "configureRequestOptionsFromUrl", {
        enumerable: !0,
        get: function () {
            return Xe.configureRequestOptionsFromUrl;
        }
    });
    Object.defineProperty(D, "safeStringifyJson", {
        enumerable: !0,
        get: function () {
            return Xe.safeStringifyJson;
        }
    });
    Object.defineProperty(D, "parseJson", {
        enumerable: !0,
        get: function () {
            return Xe.parseJson;
        }
    });
    Object.defineProperty(D, "configureRequestUrl", {
        enumerable: !0,
        get: function () {
            return Xe.configureRequestUrl;
        }
    });
    var nu = jl();
    Object.defineProperty(D, "getS3LikeProviderBaseUrl", {
        enumerable: !0,
        get: function () {
            return nu.getS3LikeProviderBaseUrl;
        }
    });
    Object.defineProperty(D, "githubUrl", {
        enumerable: !0,
        get: function () {
            return nu.githubUrl;
        }
    });
    var sw = Hl();
    Object.defineProperty(D, "parseDn", {
        enumerable: !0,
        get: function () {
            return sw.parseDn;
        }
    });
    var ow = zl();
    Object.defineProperty(D, "UUID", {
        enumerable: !0,
        get: function () {
            return ow.UUID;
        }
    });
    var aw = Ds();
    Object.defineProperty(D, "ProgressCallbackTransform", {
        enumerable: !0,
        get: function () {
            return aw.ProgressCallbackTransform;
        }
    });
    var iu = Jl();
    Object.defineProperty(D, "parseXml", {
        enumerable: !0,
        get: function () {
            return iu.parseXml;
        }
    });
    Object.defineProperty(D, "XElement", {
        enumerable: !0,
        get: function () {
            return iu.XElement;
        }
    });
    var lw = Br();
    Object.defineProperty(D, "newError", {
        enumerable: !0,
        get: function () {
            return lw.newError;
        }
    });
    var uw = Zl();
    Object.defineProperty(D, "MemoLazy", {
        enumerable: !0,
        get: function () {
            return uw.MemoLazy;
        }
    });
    var cw = tu();
    Object.defineProperty(D, "retry", {
        enumerable: !0,
        get: function () {
            return cw.retry;
        }
    });
    D.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe";
    D.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function fw(e) {
        return e == null ? [] : Array.isArray(e) ? e : [e];
    }
});
var Pe = w(Ms => {
    "use strict";
    Ms.fromCallback = function (e) {
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
    Ms.fromPromise = function (e) {
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
var ou = w((lI, su) => {
    var ft = require("constants"),
        hw = process.cwd,
        Qn = null,
        dw = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function () {
        return Qn || (Qn = hw.call(process)), Qn;
    };
    try {
        process.cwd();
    } catch {}
    typeof process.chdir == "function" &&
        ((Bs = process.chdir),
        (process.chdir = function (e) {
            (Qn = null), Bs.call(process, e);
        }),
        Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Bs));
    var Bs;
    su.exports = pw;
    function pw(e) {
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
            dw === "win32" &&
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
                                              e.stat(p, function (N, $) {
                                                  N && N.code === "ENOENT" ? c(m, p, T) : _(C);
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
                                  var N = 0;
                                  C = function ($, Ue, X) {
                                      if ($ && $.code === "EAGAIN" && N < 10) return N++, c.call(e, m, p, _, v, S, C);
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
                        h(_) && (_ = null), p && p.apply(this, arguments);
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
                        if (!h(p)) throw p;
                    }
                }
            );
        }
        function s(c) {
            return (
                c &&
                function (f, m, p, _) {
                    return c.call(e, f, m, p, function (v) {
                        h(v) && (v = null), _ && _.apply(this, arguments);
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
                        if (!h(_)) throw _;
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
        function h(c) {
            if (!c || c.code === "ENOSYS") return !0;
            var f = !process.getuid || process.getuid() !== 0;
            return !!(f && (c.code === "EINVAL" || c.code === "EPERM"));
        }
    }
});
var uu = w((uI, lu) => {
    var au = require("stream").Stream;
    lu.exports = mw;
    function mw(e) {
        return { ReadStream: t, WriteStream: r };
        function t(n, i) {
            if (!(this instanceof t)) return new t(n, i);
            au.call(this);
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
                var h = o[a];
                this[h] = i[h];
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
            au.call(this),
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
var fu = w((cI, cu) => {
    "use strict";
    cu.exports = ww;
    var gw =
        Object.getPrototypeOf ||
        function (e) {
            return e.__proto__;
        };
    function ww(e) {
        if (e === null || typeof e != "object") return e;
        if (e instanceof Object) var t = { __proto__: gw(e) };
        else var t = Object.create(null);
        return (
            Object.getOwnPropertyNames(e).forEach(function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
            }),
            t
        );
    }
});
var Se = w((fI, Ws) => {
    var re = require("fs"),
        yw = ou(),
        Ew = uu(),
        _w = fu(),
        Zn = require("util"),
        me,
        ti;
    typeof Symbol == "function" && typeof Symbol.for == "function"
        ? ((me = Symbol.for("graceful-fs.queue")), (ti = Symbol.for("graceful-fs.previous")))
        : ((me = "___graceful-fs.queue"), (ti = "___graceful-fs.previous"));
    function vw() {}
    function pu(e, t) {
        Object.defineProperty(e, me, {
            get: function () {
                return t;
            }
        });
    }
    var Rt = vw;
    Zn.debuglog
        ? (Rt = Zn.debuglog("gfs4"))
        : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
          (Rt = function () {
              var e = Zn.format.apply(Zn, arguments);
              (e = "GFS4: " + e.split(/\n/).join("\nGFS4: ")), console.error(e);
          });
    re[me] ||
        ((hu = global[me] || []),
        pu(re, hu),
        (re.close = (function (e) {
            function t(r, n) {
                return e.call(re, r, function (i) {
                    i || du(), typeof n == "function" && n.apply(this, arguments);
                });
            }
            return Object.defineProperty(t, ti, { value: e }), t;
        })(re.close)),
        (re.closeSync = (function (e) {
            function t(r) {
                e.apply(re, arguments), du();
            }
            return Object.defineProperty(t, ti, { value: e }), t;
        })(re.closeSync)),
        /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
            process.on("exit", function () {
                Rt(re[me]), require("assert").equal(re[me].length, 0);
            }));
    var hu;
    global[me] || pu(global, re[me]);
    Ws.exports = js(_w(re));
    process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !re.__patched && ((Ws.exports = js(re)), (re.__patched = !0));
    function js(e) {
        yw(e), (e.gracefulify = js), (e.createReadStream = Ue), (e.createWriteStream = X);
        var t = e.readFile;
        e.readFile = r;
        function r(P, U, R) {
            return typeof U == "function" && ((R = U), (U = null)), ee(P, U, R);
            function ee(se, Q, z, F) {
                return t(se, Q, function (W) {
                    W && (W.code === "EMFILE" || W.code === "ENFILE")
                        ? lr([ee, [se, Q, z], W, F || Date.now(), Date.now()])
                        : typeof z == "function" && z.apply(this, arguments);
                });
            }
        }
        var n = e.writeFile;
        e.writeFile = i;
        function i(P, U, R, ee) {
            return typeof R == "function" && ((ee = R), (R = null)), se(P, U, R, ee);
            function se(Q, z, F, W, ie) {
                return n(Q, z, F, function (G) {
                    G && (G.code === "EMFILE" || G.code === "ENFILE")
                        ? lr([se, [Q, z, F, W], G, ie || Date.now(), Date.now()])
                        : typeof W == "function" && W.apply(this, arguments);
                });
            }
        }
        var s = e.appendFile;
        s && (e.appendFile = o);
        function o(P, U, R, ee) {
            return typeof R == "function" && ((ee = R), (R = null)), se(P, U, R, ee);
            function se(Q, z, F, W, ie) {
                return s(Q, z, F, function (G) {
                    G && (G.code === "EMFILE" || G.code === "ENFILE")
                        ? lr([se, [Q, z, F, W], G, ie || Date.now(), Date.now()])
                        : typeof W == "function" && W.apply(this, arguments);
                });
            }
        }
        var a = e.copyFile;
        a && (e.copyFile = l);
        function l(P, U, R, ee) {
            return typeof R == "function" && ((ee = R), (R = 0)), se(P, U, R, ee);
            function se(Q, z, F, W, ie) {
                return a(Q, z, F, function (G) {
                    G && (G.code === "EMFILE" || G.code === "ENFILE")
                        ? lr([se, [Q, z, F, W], G, ie || Date.now(), Date.now()])
                        : typeof W == "function" && W.apply(this, arguments);
                });
            }
        }
        var h = e.readdir;
        e.readdir = f;
        var c = /^v[0-5]\./;
        function f(P, U, R) {
            typeof U == "function" && ((R = U), (U = null));
            var ee = c.test(process.version)
                ? function (z, F, W, ie) {
                      return h(z, se(z, F, W, ie));
                  }
                : function (z, F, W, ie) {
                      return h(z, F, se(z, F, W, ie));
                  };
            return ee(P, U, R);
            function se(Q, z, F, W) {
                return function (ie, G) {
                    ie && (ie.code === "EMFILE" || ie.code === "ENFILE")
                        ? lr([ee, [Q, z, F], ie, W || Date.now(), Date.now()])
                        : (G && G.sort && G.sort(), typeof F == "function" && F.call(this, ie, G));
                };
            }
        }
        if (process.version.substr(0, 4) === "v0.8") {
            var m = Ew(e);
            (T = m.ReadStream), (N = m.WriteStream);
        }
        var p = e.ReadStream;
        p && ((T.prototype = Object.create(p.prototype)), (T.prototype.open = C));
        var _ = e.WriteStream;
        _ && ((N.prototype = Object.create(_.prototype)), (N.prototype.open = $)),
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
        var v = T;
        Object.defineProperty(e, "FileReadStream", {
            get: function () {
                return v;
            },
            set: function (P) {
                v = P;
            },
            enumerable: !0,
            configurable: !0
        });
        var S = N;
        Object.defineProperty(e, "FileWriteStream", {
            get: function () {
                return S;
            },
            set: function (P) {
                S = P;
            },
            enumerable: !0,
            configurable: !0
        });
        function T(P, U) {
            return this instanceof T ? (p.apply(this, arguments), this) : T.apply(Object.create(T.prototype), arguments);
        }
        function C() {
            var P = this;
            E(P.path, P.flags, P.mode, function (U, R) {
                U ? (P.autoClose && P.destroy(), P.emit("error", U)) : ((P.fd = R), P.emit("open", R), P.read());
            });
        }
        function N(P, U) {
            return this instanceof N ? (_.apply(this, arguments), this) : N.apply(Object.create(N.prototype), arguments);
        }
        function $() {
            var P = this;
            E(P.path, P.flags, P.mode, function (U, R) {
                U ? (P.destroy(), P.emit("error", U)) : ((P.fd = R), P.emit("open", R));
            });
        }
        function Ue(P, U) {
            return new e.ReadStream(P, U);
        }
        function X(P, U) {
            return new e.WriteStream(P, U);
        }
        var de = e.open;
        e.open = E;
        function E(P, U, R, ee) {
            return typeof R == "function" && ((ee = R), (R = null)), se(P, U, R, ee);
            function se(Q, z, F, W, ie) {
                return de(Q, z, F, function (G, ut) {
                    G && (G.code === "EMFILE" || G.code === "ENFILE")
                        ? lr([se, [Q, z, F, W], G, ie || Date.now(), Date.now()])
                        : typeof W == "function" && W.apply(this, arguments);
                });
            }
        }
        return e;
    }
    function lr(e) {
        Rt("ENQUEUE", e[0].name, e[1]), re[me].push(e), Hs();
    }
    var ei;
    function du() {
        for (var e = Date.now(), t = 0; t < re[me].length; ++t) re[me][t].length > 2 && ((re[me][t][3] = e), (re[me][t][4] = e));
        Hs();
    }
    function Hs() {
        if ((clearTimeout(ei), (ei = void 0), re[me].length !== 0)) {
            var e = re[me].shift(),
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
                    h = Math.min(l * 1.2, 100);
                a >= h ? (Rt("RETRY", t.name, r), t.apply(null, r.concat([i]))) : re[me].push(e);
            }
            ei === void 0 && (ei = setTimeout(Hs, 0));
        }
    }
});
var Pt = w(ht => {
    "use strict";
    var mu = Pe().fromCallback,
        De = Se(),
        Sw = [
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
        ].filter(e => typeof De[e] == "function");
    Object.assign(ht, De);
    Sw.forEach(e => {
        ht[e] = mu(De[e]);
    });
    ht.exists = function (e, t) {
        return typeof t == "function" ? De.exists(e, t) : new Promise(r => De.exists(e, r));
    };
    ht.read = function (e, t, r, n, i, s) {
        return typeof s == "function"
            ? De.read(e, t, r, n, i, s)
            : new Promise((o, a) => {
                  De.read(e, t, r, n, i, (l, h, c) => {
                      if (l) return a(l);
                      o({ bytesRead: h, buffer: c });
                  });
              });
    };
    ht.write = function (e, t, ...r) {
        return typeof r[r.length - 1] == "function"
            ? De.write(e, t, ...r)
            : new Promise((n, i) => {
                  De.write(e, t, ...r, (s, o, a) => {
                      if (s) return i(s);
                      n({ bytesWritten: o, buffer: a });
                  });
              });
    };
    typeof De.writev == "function" &&
        (ht.writev = function (e, t, ...r) {
            return typeof r[r.length - 1] == "function"
                ? De.writev(e, t, ...r)
                : new Promise((n, i) => {
                      De.writev(e, t, ...r, (s, o, a) => {
                          if (s) return i(s);
                          n({ bytesWritten: o, buffers: a });
                      });
                  });
        });
    typeof De.realpath.native == "function"
        ? (ht.realpath.native = mu(De.realpath.native))
        : process.emitWarning(
              "fs.realpath.native is not a function. Is fs being monkey-patched?",
              "Warning",
              "fs-extra-WARN0003"
          );
});
var wu = w((dI, gu) => {
    "use strict";
    var Aw = require("path");
    gu.exports.checkPath = function (t) {
        if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(Aw.parse(t).root, ""))) {
            let n = new Error("Path contains invalid characters: ".concat(t));
            throw ((n.code = "EINVAL"), n);
        }
    };
});
var vu = w((pI, Gs) => {
    "use strict";
    var yu = Pt(),
        { checkPath: Eu } = wu(),
        _u = e => {
            let t = { mode: 511 };
            return typeof e == "number" ? e : { ...t, ...e }.mode;
        };
    Gs.exports.makeDir = async (e, t) => (Eu(e), yu.mkdir(e, { mode: _u(t), recursive: !0 }));
    Gs.exports.makeDirSync = (e, t) => (Eu(e), yu.mkdirSync(e, { mode: _u(t), recursive: !0 }));
});
var Ve = w((mI, Su) => {
    "use strict";
    var Cw = Pe().fromPromise,
        { makeDir: bw, makeDirSync: Vs } = vu(),
        Ys = Cw(bw);
    Su.exports = { mkdirs: Ys, mkdirsSync: Vs, mkdirp: Ys, mkdirpSync: Vs, ensureDir: Ys, ensureDirSync: Vs };
});
var dt = w((gI, Cu) => {
    "use strict";
    var Tw = Pe().fromPromise,
        Au = Pt();
    function Ow(e) {
        return Au.access(e)
            .then(() => !0)
            .catch(() => !1);
    }
    Cu.exports = { pathExists: Tw(Ow), pathExistsSync: Au.existsSync };
});
var zs = w((wI, bu) => {
    "use strict";
    var ur = Se();
    function xw(e, t, r, n) {
        ur.open(e, "r+", (i, s) => {
            if (i) return n(i);
            ur.futimes(s, t, r, o => {
                ur.close(s, a => {
                    n && n(o || a);
                });
            });
        });
    }
    function Iw(e, t, r) {
        let n = ur.openSync(e, "r+");
        return ur.futimesSync(n, t, r), ur.closeSync(n);
    }
    bu.exports = { utimesMillis: xw, utimesMillisSync: Iw };
});
var Dt = w((yI, xu) => {
    "use strict";
    var cr = Pt(),
        he = require("path"),
        Nw = require("util");
    function Rw(e, t, r) {
        let n = r.dereference ? i => cr.stat(i, { bigint: !0 }) : i => cr.lstat(i, { bigint: !0 });
        return Promise.all([
            n(e),
            n(t).catch(i => {
                if (i.code === "ENOENT") return null;
                throw i;
            })
        ]).then(([i, s]) => ({ srcStat: i, destStat: s }));
    }
    function Pw(e, t, r) {
        let n,
            i = r.dereference ? o => cr.statSync(o, { bigint: !0 }) : o => cr.lstatSync(o, { bigint: !0 }),
            s = i(e);
        try {
            n = i(t);
        } catch (o) {
            if (o.code === "ENOENT") return { srcStat: s, destStat: null };
            throw o;
        }
        return { srcStat: s, destStat: n };
    }
    function Dw(e, t, r, n, i) {
        Nw.callbackify(Rw)(e, t, n, (s, o) => {
            if (s) return i(s);
            let { srcStat: a, destStat: l } = o;
            if (l) {
                if (Yr(a, l)) {
                    let h = he.basename(e),
                        c = he.basename(t);
                    return r === "move" && h !== c && h.toLowerCase() === c.toLowerCase()
                        ? i(null, { srcStat: a, destStat: l, isChangingCase: !0 })
                        : i(new Error("Source and destination must not be the same."));
                }
                if (a.isDirectory() && !l.isDirectory())
                    return i(new Error("Cannot overwrite non-directory '".concat(t, "' with directory '").concat(e, "'.")));
                if (!a.isDirectory() && l.isDirectory())
                    return i(new Error("Cannot overwrite directory '".concat(t, "' with non-directory '").concat(e, "'.")));
            }
            return a.isDirectory() && Xs(e, t) ? i(new Error(ri(e, t, r))) : i(null, { srcStat: a, destStat: l });
        });
    }
    function Fw(e, t, r, n) {
        let { srcStat: i, destStat: s } = Pw(e, t, n);
        if (s) {
            if (Yr(i, s)) {
                let o = he.basename(e),
                    a = he.basename(t);
                if (r === "move" && o !== a && o.toLowerCase() === a.toLowerCase())
                    return { srcStat: i, destStat: s, isChangingCase: !0 };
                throw new Error("Source and destination must not be the same.");
            }
            if (i.isDirectory() && !s.isDirectory())
                throw new Error("Cannot overwrite non-directory '".concat(t, "' with directory '").concat(e, "'."));
            if (!i.isDirectory() && s.isDirectory())
                throw new Error("Cannot overwrite directory '".concat(t, "' with non-directory '").concat(e, "'."));
        }
        if (i.isDirectory() && Xs(e, t)) throw new Error(ri(e, t, r));
        return { srcStat: i, destStat: s };
    }
    function Tu(e, t, r, n, i) {
        let s = he.resolve(he.dirname(e)),
            o = he.resolve(he.dirname(r));
        if (o === s || o === he.parse(o).root) return i();
        cr.stat(o, { bigint: !0 }, (a, l) =>
            a ? (a.code === "ENOENT" ? i() : i(a)) : Yr(t, l) ? i(new Error(ri(e, r, n))) : Tu(e, t, o, n, i)
        );
    }
    function Ou(e, t, r, n) {
        let i = he.resolve(he.dirname(e)),
            s = he.resolve(he.dirname(r));
        if (s === i || s === he.parse(s).root) return;
        let o;
        try {
            o = cr.statSync(s, { bigint: !0 });
        } catch (a) {
            if (a.code === "ENOENT") return;
            throw a;
        }
        if (Yr(t, o)) throw new Error(ri(e, r, n));
        return Ou(e, t, s, n);
    }
    function Yr(e, t) {
        return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
    }
    function Xs(e, t) {
        let r = he
                .resolve(e)
                .split(he.sep)
                .filter(i => i),
            n = he
                .resolve(t)
                .split(he.sep)
                .filter(i => i);
        return r.reduce((i, s, o) => i && n[o] === s, !0);
    }
    function ri(e, t, r) {
        return "Cannot ".concat(r, " '").concat(e, "' to a subdirectory of itself, '").concat(t, "'.");
    }
    xu.exports = {
        checkPaths: Dw,
        checkPathsSync: Fw,
        checkParentPaths: Tu,
        checkParentPathsSync: Ou,
        isSrcSubdir: Xs,
        areIdentical: Yr
    };
});
var Lu = w((EI, qu) => {
    "use strict";
    var Fe = Se(),
        zr = require("path"),
        qw = Ve().mkdirs,
        Lw = dt().pathExists,
        $w = zs().utimesMillis,
        Xr = Dt();
    function kw(e, t, r, n) {
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
            Xr.checkPaths(e, t, "copy", r, (i, s) => {
                if (i) return n(i);
                let { srcStat: o, destStat: a } = s;
                Xr.checkParentPaths(e, o, t, "copy", l => (l ? n(l) : r.filter ? Ru(Iu, a, e, t, r, n) : Iu(a, e, t, r, n)));
            });
    }
    function Iu(e, t, r, n, i) {
        let s = zr.dirname(r);
        Lw(s, (o, a) => {
            if (o) return i(o);
            if (a) return ni(e, t, r, n, i);
            qw(s, l => (l ? i(l) : ni(e, t, r, n, i)));
        });
    }
    function Ru(e, t, r, n, i, s) {
        Promise.resolve(i.filter(r, n)).then(
            o => (o ? e(t, r, n, i, s) : s()),
            o => s(o)
        );
    }
    function Uw(e, t, r, n, i) {
        return n.filter ? Ru(ni, e, t, r, n, i) : ni(e, t, r, n, i);
    }
    function ni(e, t, r, n, i) {
        (n.dereference ? Fe.stat : Fe.lstat)(t, (o, a) =>
            o
                ? i(o)
                : a.isDirectory()
                ? Vw(a, e, t, r, n, i)
                : a.isFile() || a.isCharacterDevice() || a.isBlockDevice()
                ? Mw(a, e, t, r, n, i)
                : a.isSymbolicLink()
                ? Xw(e, t, r, n, i)
                : a.isSocket()
                ? i(new Error("Cannot copy a socket file: ".concat(t)))
                : a.isFIFO()
                ? i(new Error("Cannot copy a FIFO pipe: ".concat(t)))
                : i(new Error("Unknown file: ".concat(t)))
        );
    }
    function Mw(e, t, r, n, i, s) {
        return t ? Bw(e, r, n, i, s) : Pu(e, r, n, i, s);
    }
    function Bw(e, t, r, n, i) {
        if (n.overwrite) Fe.unlink(r, s => (s ? i(s) : Pu(e, t, r, n, i)));
        else return n.errorOnExist ? i(new Error("'".concat(r, "' already exists"))) : i();
    }
    function Pu(e, t, r, n, i) {
        Fe.copyFile(t, r, s => (s ? i(s) : n.preserveTimestamps ? jw(e.mode, t, r, i) : ii(r, e.mode, i)));
    }
    function jw(e, t, r, n) {
        return Hw(e) ? Ww(r, e, i => (i ? n(i) : Nu(e, t, r, n))) : Nu(e, t, r, n);
    }
    function Hw(e) {
        return (e & 128) === 0;
    }
    function Ww(e, t, r) {
        return ii(e, t | 128, r);
    }
    function Nu(e, t, r, n) {
        Gw(t, r, i => (i ? n(i) : ii(r, e, n)));
    }
    function ii(e, t, r) {
        return Fe.chmod(e, t, r);
    }
    function Gw(e, t, r) {
        Fe.stat(e, (n, i) => (n ? r(n) : $w(t, i.atime, i.mtime, r)));
    }
    function Vw(e, t, r, n, i, s) {
        return t ? Du(r, n, i, s) : Yw(e.mode, r, n, i, s);
    }
    function Yw(e, t, r, n, i) {
        Fe.mkdir(r, s => {
            if (s) return i(s);
            Du(t, r, n, o => (o ? i(o) : ii(r, e, i)));
        });
    }
    function Du(e, t, r, n) {
        Fe.readdir(e, (i, s) => (i ? n(i) : Fu(s, e, t, r, n)));
    }
    function Fu(e, t, r, n, i) {
        let s = e.pop();
        return s ? zw(e, s, t, r, n, i) : i();
    }
    function zw(e, t, r, n, i, s) {
        let o = zr.join(r, t),
            a = zr.join(n, t);
        Xr.checkPaths(o, a, "copy", i, (l, h) => {
            if (l) return s(l);
            let { destStat: c } = h;
            Uw(c, o, a, i, f => (f ? s(f) : Fu(e, r, n, i, s)));
        });
    }
    function Xw(e, t, r, n, i) {
        Fe.readlink(t, (s, o) => {
            if (s) return i(s);
            if ((n.dereference && (o = zr.resolve(process.cwd(), o)), e))
                Fe.readlink(r, (a, l) =>
                    a
                        ? a.code === "EINVAL" || a.code === "UNKNOWN"
                            ? Fe.symlink(o, r, i)
                            : i(a)
                        : (n.dereference && (l = zr.resolve(process.cwd(), l)),
                          Xr.isSrcSubdir(o, l)
                              ? i(new Error("Cannot copy '".concat(o, "' to a subdirectory of itself, '").concat(l, "'.")))
                              : e.isDirectory() && Xr.isSrcSubdir(l, o)
                              ? i(new Error("Cannot overwrite '".concat(l, "' with '").concat(o, "'.")))
                              : Kw(o, r, i))
                );
            else return Fe.symlink(o, r, i);
        });
    }
    function Kw(e, t, r) {
        Fe.unlink(t, n => (n ? r(n) : Fe.symlink(e, t, r)));
    }
    qu.exports = kw;
});
var Bu = w((_I, Mu) => {
    "use strict";
    var ge = Se(),
        Kr = require("path"),
        Jw = Ve().mkdirsSync,
        Qw = zs().utimesMillisSync,
        Jr = Dt();
    function Zw(e, t, r) {
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
        let { srcStat: n, destStat: i } = Jr.checkPathsSync(e, t, "copy", r);
        return Jr.checkParentPathsSync(e, n, t, "copy"), ey(i, e, t, r);
    }
    function ey(e, t, r, n) {
        if (n.filter && !n.filter(t, r)) return;
        let i = Kr.dirname(r);
        return ge.existsSync(i) || Jw(i), $u(e, t, r, n);
    }
    function ty(e, t, r, n) {
        if (!(n.filter && !n.filter(t, r))) return $u(e, t, r, n);
    }
    function $u(e, t, r, n) {
        let s = (n.dereference ? ge.statSync : ge.lstatSync)(t);
        if (s.isDirectory()) return ly(s, e, t, r, n);
        if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice()) return ry(s, e, t, r, n);
        if (s.isSymbolicLink()) return fy(e, t, r, n);
        throw s.isSocket()
            ? new Error("Cannot copy a socket file: ".concat(t))
            : s.isFIFO()
            ? new Error("Cannot copy a FIFO pipe: ".concat(t))
            : new Error("Unknown file: ".concat(t));
    }
    function ry(e, t, r, n, i) {
        return t ? ny(e, r, n, i) : ku(e, r, n, i);
    }
    function ny(e, t, r, n) {
        if (n.overwrite) return ge.unlinkSync(r), ku(e, t, r, n);
        if (n.errorOnExist) throw new Error("'".concat(r, "' already exists"));
    }
    function ku(e, t, r, n) {
        return ge.copyFileSync(t, r), n.preserveTimestamps && iy(e.mode, t, r), Ks(r, e.mode);
    }
    function iy(e, t, r) {
        return sy(e) && oy(r, e), ay(t, r);
    }
    function sy(e) {
        return (e & 128) === 0;
    }
    function oy(e, t) {
        return Ks(e, t | 128);
    }
    function Ks(e, t) {
        return ge.chmodSync(e, t);
    }
    function ay(e, t) {
        let r = ge.statSync(e);
        return Qw(t, r.atime, r.mtime);
    }
    function ly(e, t, r, n, i) {
        return t ? Uu(r, n, i) : uy(e.mode, r, n, i);
    }
    function uy(e, t, r, n) {
        return ge.mkdirSync(r), Uu(t, r, n), Ks(r, e);
    }
    function Uu(e, t, r) {
        ge.readdirSync(e).forEach(n => cy(n, e, t, r));
    }
    function cy(e, t, r, n) {
        let i = Kr.join(t, e),
            s = Kr.join(r, e),
            { destStat: o } = Jr.checkPathsSync(i, s, "copy", n);
        return ty(o, i, s, n);
    }
    function fy(e, t, r, n) {
        let i = ge.readlinkSync(t);
        if ((n.dereference && (i = Kr.resolve(process.cwd(), i)), e)) {
            let s;
            try {
                s = ge.readlinkSync(r);
            } catch (o) {
                if (o.code === "EINVAL" || o.code === "UNKNOWN") return ge.symlinkSync(i, r);
                throw o;
            }
            if ((n.dereference && (s = Kr.resolve(process.cwd(), s)), Jr.isSrcSubdir(i, s)))
                throw new Error("Cannot copy '".concat(i, "' to a subdirectory of itself, '").concat(s, "'."));
            if (ge.statSync(r).isDirectory() && Jr.isSrcSubdir(s, i))
                throw new Error("Cannot overwrite '".concat(s, "' with '").concat(i, "'."));
            return hy(i, r);
        } else return ge.symlinkSync(i, r);
    }
    function hy(e, t) {
        return ge.unlinkSync(t), ge.symlinkSync(e, t);
    }
    Mu.exports = Zw;
});
var si = w((vI, ju) => {
    "use strict";
    var dy = Pe().fromCallback;
    ju.exports = { copy: dy(Lu()), copySync: Bu() };
});
var Ju = w((SI, Ku) => {
    "use strict";
    var Hu = Se(),
        Yu = require("path"),
        Y = require("assert"),
        Qr = process.platform === "win32";
    function zu(e) {
        ["unlink", "chmod", "stat", "lstat", "rmdir", "readdir"].forEach(r => {
            (e[r] = e[r] || Hu[r]), (r = r + "Sync"), (e[r] = e[r] || Hu[r]);
        }),
            (e.maxBusyTries = e.maxBusyTries || 3);
    }
    function Js(e, t, r) {
        let n = 0;
        typeof t == "function" && ((r = t), (t = {})),
            Y(e, "rimraf: missing path"),
            Y.strictEqual(typeof e, "string", "rimraf: path should be a string"),
            Y.strictEqual(typeof r, "function", "rimraf: callback function required"),
            Y(t, "rimraf: invalid options argument provided"),
            Y.strictEqual(typeof t, "object", "rimraf: options should be object"),
            zu(t),
            Wu(e, t, function i(s) {
                if (s) {
                    if ((s.code === "EBUSY" || s.code === "ENOTEMPTY" || s.code === "EPERM") && n < t.maxBusyTries) {
                        n++;
                        let o = n * 100;
                        return setTimeout(() => Wu(e, t, i), o);
                    }
                    s.code === "ENOENT" && (s = null);
                }
                r(s);
            });
    }
    function Wu(e, t, r) {
        Y(e),
            Y(t),
            Y(typeof r == "function"),
            t.lstat(e, (n, i) => {
                if (n && n.code === "ENOENT") return r(null);
                if (n && n.code === "EPERM" && Qr) return Gu(e, t, n, r);
                if (i && i.isDirectory()) return oi(e, t, n, r);
                t.unlink(e, s => {
                    if (s) {
                        if (s.code === "ENOENT") return r(null);
                        if (s.code === "EPERM") return Qr ? Gu(e, t, s, r) : oi(e, t, s, r);
                        if (s.code === "EISDIR") return oi(e, t, s, r);
                    }
                    return r(s);
                });
            });
    }
    function Gu(e, t, r, n) {
        Y(e),
            Y(t),
            Y(typeof n == "function"),
            t.chmod(e, 438, i => {
                i
                    ? n(i.code === "ENOENT" ? null : r)
                    : t.stat(e, (s, o) => {
                          s ? n(s.code === "ENOENT" ? null : r) : o.isDirectory() ? oi(e, t, r, n) : t.unlink(e, n);
                      });
            });
    }
    function Vu(e, t, r) {
        let n;
        Y(e), Y(t);
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
        n.isDirectory() ? ai(e, t, r) : t.unlinkSync(e);
    }
    function oi(e, t, r, n) {
        Y(e),
            Y(t),
            Y(typeof n == "function"),
            t.rmdir(e, i => {
                i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM")
                    ? py(e, t, n)
                    : i && i.code === "ENOTDIR"
                    ? n(r)
                    : n(i);
            });
    }
    function py(e, t, r) {
        Y(e),
            Y(t),
            Y(typeof r == "function"),
            t.readdir(e, (n, i) => {
                if (n) return r(n);
                let s = i.length,
                    o;
                if (s === 0) return t.rmdir(e, r);
                i.forEach(a => {
                    Js(Yu.join(e, a), t, l => {
                        if (!o) {
                            if (l) return r((o = l));
                            --s === 0 && t.rmdir(e, r);
                        }
                    });
                });
            });
    }
    function Xu(e, t) {
        let r;
        (t = t || {}),
            zu(t),
            Y(e, "rimraf: missing path"),
            Y.strictEqual(typeof e, "string", "rimraf: path should be a string"),
            Y(t, "rimraf: missing options"),
            Y.strictEqual(typeof t, "object", "rimraf: options should be object");
        try {
            r = t.lstatSync(e);
        } catch (n) {
            if (n.code === "ENOENT") return;
            n.code === "EPERM" && Qr && Vu(e, t, n);
        }
        try {
            r && r.isDirectory() ? ai(e, t, null) : t.unlinkSync(e);
        } catch (n) {
            if (n.code === "ENOENT") return;
            if (n.code === "EPERM") return Qr ? Vu(e, t, n) : ai(e, t, n);
            if (n.code !== "EISDIR") throw n;
            ai(e, t, n);
        }
    }
    function ai(e, t, r) {
        Y(e), Y(t);
        try {
            t.rmdirSync(e);
        } catch (n) {
            if (n.code === "ENOTDIR") throw r;
            if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM") my(e, t);
            else if (n.code !== "ENOENT") throw n;
        }
    }
    function my(e, t) {
        if ((Y(e), Y(t), t.readdirSync(e).forEach(r => Xu(Yu.join(e, r), t)), Qr)) {
            let r = Date.now();
            do
                try {
                    return t.rmdirSync(e, t);
                } catch {}
            while (Date.now() - r < 500);
        } else return t.rmdirSync(e, t);
    }
    Ku.exports = Js;
    Js.sync = Xu;
});
var Zr = w((AI, Zu) => {
    "use strict";
    var li = Se(),
        gy = Pe().fromCallback,
        Qu = Ju();
    function wy(e, t) {
        if (li.rm) return li.rm(e, { recursive: !0, force: !0 }, t);
        Qu(e, t);
    }
    function yy(e) {
        if (li.rmSync) return li.rmSync(e, { recursive: !0, force: !0 });
        Qu.sync(e);
    }
    Zu.exports = { remove: gy(wy), removeSync: yy };
});
var ac = w((CI, oc) => {
    "use strict";
    var Ey = Pe().fromPromise,
        rc = Pt(),
        nc = require("path"),
        ic = Ve(),
        sc = Zr(),
        ec = Ey(async function (t) {
            let r;
            try {
                r = await rc.readdir(t);
            } catch {
                return ic.mkdirs(t);
            }
            return Promise.all(r.map(n => sc.remove(nc.join(t, n))));
        });
    function tc(e) {
        let t;
        try {
            t = rc.readdirSync(e);
        } catch {
            return ic.mkdirsSync(e);
        }
        t.forEach(r => {
            (r = nc.join(e, r)), sc.removeSync(r);
        });
    }
    oc.exports = { emptyDirSync: tc, emptydirSync: tc, emptyDir: ec, emptydir: ec };
});
var fc = w((bI, cc) => {
    "use strict";
    var _y = Pe().fromCallback,
        lc = require("path"),
        pt = Se(),
        uc = Ve();
    function vy(e, t) {
        function r() {
            pt.writeFile(e, "", n => {
                if (n) return t(n);
                t();
            });
        }
        pt.stat(e, (n, i) => {
            if (!n && i.isFile()) return t();
            let s = lc.dirname(e);
            pt.stat(s, (o, a) => {
                if (o)
                    return o.code === "ENOENT"
                        ? uc.mkdirs(s, l => {
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
    function Sy(e) {
        let t;
        try {
            t = pt.statSync(e);
        } catch {}
        if (t && t.isFile()) return;
        let r = lc.dirname(e);
        try {
            pt.statSync(r).isDirectory() || pt.readdirSync(r);
        } catch (n) {
            if (n && n.code === "ENOENT") uc.mkdirsSync(r);
            else throw n;
        }
        pt.writeFileSync(e, "");
    }
    cc.exports = { createFile: _y(vy), createFileSync: Sy };
});
var gc = w((TI, mc) => {
    "use strict";
    var Ay = Pe().fromCallback,
        hc = require("path"),
        mt = Se(),
        dc = Ve(),
        Cy = dt().pathExists,
        { areIdentical: pc } = Dt();
    function by(e, t, r) {
        function n(i, s) {
            mt.link(i, s, o => {
                if (o) return r(o);
                r(null);
            });
        }
        mt.lstat(t, (i, s) => {
            mt.lstat(e, (o, a) => {
                if (o) return (o.message = o.message.replace("lstat", "ensureLink")), r(o);
                if (s && pc(a, s)) return r(null);
                let l = hc.dirname(t);
                Cy(l, (h, c) => {
                    if (h) return r(h);
                    if (c) return n(e, t);
                    dc.mkdirs(l, f => {
                        if (f) return r(f);
                        n(e, t);
                    });
                });
            });
        });
    }
    function Ty(e, t) {
        let r;
        try {
            r = mt.lstatSync(t);
        } catch {}
        try {
            let s = mt.lstatSync(e);
            if (r && pc(s, r)) return;
        } catch (s) {
            throw ((s.message = s.message.replace("lstat", "ensureLink")), s);
        }
        let n = hc.dirname(t);
        return mt.existsSync(n) || dc.mkdirsSync(n), mt.linkSync(e, t);
    }
    mc.exports = { createLink: Ay(by), createLinkSync: Ty };
});
var yc = w((OI, wc) => {
    "use strict";
    var gt = require("path"),
        en = Se(),
        Oy = dt().pathExists;
    function xy(e, t, r) {
        if (gt.isAbsolute(e))
            return en.lstat(e, n =>
                n ? ((n.message = n.message.replace("lstat", "ensureSymlink")), r(n)) : r(null, { toCwd: e, toDst: e })
            );
        {
            let n = gt.dirname(t),
                i = gt.join(n, e);
            return Oy(i, (s, o) =>
                s
                    ? r(s)
                    : o
                    ? r(null, { toCwd: i, toDst: e })
                    : en.lstat(e, a =>
                          a
                              ? ((a.message = a.message.replace("lstat", "ensureSymlink")), r(a))
                              : r(null, { toCwd: e, toDst: gt.relative(n, e) })
                      )
            );
        }
    }
    function Iy(e, t) {
        let r;
        if (gt.isAbsolute(e)) {
            if (((r = en.existsSync(e)), !r)) throw new Error("absolute srcpath does not exist");
            return { toCwd: e, toDst: e };
        } else {
            let n = gt.dirname(t),
                i = gt.join(n, e);
            if (((r = en.existsSync(i)), r)) return { toCwd: i, toDst: e };
            if (((r = en.existsSync(e)), !r)) throw new Error("relative srcpath does not exist");
            return { toCwd: e, toDst: gt.relative(n, e) };
        }
    }
    wc.exports = { symlinkPaths: xy, symlinkPathsSync: Iy };
});
var vc = w((xI, _c) => {
    "use strict";
    var Ec = Se();
    function Ny(e, t, r) {
        if (((r = typeof t == "function" ? t : r), (t = typeof t == "function" ? !1 : t), t)) return r(null, t);
        Ec.lstat(e, (n, i) => {
            if (n) return r(null, "file");
            (t = i && i.isDirectory() ? "dir" : "file"), r(null, t);
        });
    }
    function Ry(e, t) {
        let r;
        if (t) return t;
        try {
            r = Ec.lstatSync(e);
        } catch {
            return "file";
        }
        return r && r.isDirectory() ? "dir" : "file";
    }
    _c.exports = { symlinkType: Ny, symlinkTypeSync: Ry };
});
var Ic = w((II, xc) => {
    "use strict";
    var Py = Pe().fromCallback,
        Ac = require("path"),
        Ye = Pt(),
        Cc = Ve(),
        Dy = Cc.mkdirs,
        Fy = Cc.mkdirsSync,
        bc = yc(),
        qy = bc.symlinkPaths,
        Ly = bc.symlinkPathsSync,
        Tc = vc(),
        $y = Tc.symlinkType,
        ky = Tc.symlinkTypeSync,
        Uy = dt().pathExists,
        { areIdentical: Oc } = Dt();
    function My(e, t, r, n) {
        (n = typeof r == "function" ? r : n),
            (r = typeof r == "function" ? !1 : r),
            Ye.lstat(t, (i, s) => {
                !i && s.isSymbolicLink()
                    ? Promise.all([Ye.stat(e), Ye.stat(t)]).then(([o, a]) => {
                          if (Oc(o, a)) return n(null);
                          Sc(e, t, r, n);
                      })
                    : Sc(e, t, r, n);
            });
    }
    function Sc(e, t, r, n) {
        qy(e, t, (i, s) => {
            if (i) return n(i);
            (e = s.toDst),
                $y(s.toCwd, r, (o, a) => {
                    if (o) return n(o);
                    let l = Ac.dirname(t);
                    Uy(l, (h, c) => {
                        if (h) return n(h);
                        if (c) return Ye.symlink(e, t, a, n);
                        Dy(l, f => {
                            if (f) return n(f);
                            Ye.symlink(e, t, a, n);
                        });
                    });
                });
        });
    }
    function By(e, t, r) {
        let n;
        try {
            n = Ye.lstatSync(t);
        } catch {}
        if (n && n.isSymbolicLink()) {
            let a = Ye.statSync(e),
                l = Ye.statSync(t);
            if (Oc(a, l)) return;
        }
        let i = Ly(e, t);
        (e = i.toDst), (r = ky(i.toCwd, r));
        let s = Ac.dirname(t);
        return Ye.existsSync(s) || Fy(s), Ye.symlinkSync(e, t, r);
    }
    xc.exports = { createSymlink: Py(My), createSymlinkSync: By };
});
var $c = w((NI, Lc) => {
    "use strict";
    var { createFile: Nc, createFileSync: Rc } = fc(),
        { createLink: Pc, createLinkSync: Dc } = gc(),
        { createSymlink: Fc, createSymlinkSync: qc } = Ic();
    Lc.exports = {
        createFile: Nc,
        createFileSync: Rc,
        ensureFile: Nc,
        ensureFileSync: Rc,
        createLink: Pc,
        createLinkSync: Dc,
        ensureLink: Pc,
        ensureLinkSync: Dc,
        createSymlink: Fc,
        createSymlinkSync: qc,
        ensureSymlink: Fc,
        ensureSymlinkSync: qc
    };
});
var ui = w((RI, kc) => {
    function jy(e, { EOL: t = "\n", finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
        let s = r ? t : "";
        return JSON.stringify(e, n, i).replace(/\n/g, t) + s;
    }
    function Hy(e) {
        return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
    }
    kc.exports = { stringify: jy, stripBom: Hy };
});
var jc = w((PI, Bc) => {
    var fr;
    try {
        fr = Se();
    } catch {
        fr = require("fs");
    }
    var ci = Pe(),
        { stringify: Uc, stripBom: Mc } = ui();
    async function Wy(e, t = {}) {
        typeof t == "string" && (t = { encoding: t });
        let r = t.fs || fr,
            n = "throws" in t ? t.throws : !0,
            i = await ci.fromCallback(r.readFile)(e, t);
        i = Mc(i);
        let s;
        try {
            s = JSON.parse(i, t ? t.reviver : null);
        } catch (o) {
            if (n) throw ((o.message = "".concat(e, ": ").concat(o.message)), o);
            return null;
        }
        return s;
    }
    var Gy = ci.fromPromise(Wy);
    function Vy(e, t = {}) {
        typeof t == "string" && (t = { encoding: t });
        let r = t.fs || fr,
            n = "throws" in t ? t.throws : !0;
        try {
            let i = r.readFileSync(e, t);
            return (i = Mc(i)), JSON.parse(i, t.reviver);
        } catch (i) {
            if (n) throw ((i.message = "".concat(e, ": ").concat(i.message)), i);
            return null;
        }
    }
    async function Yy(e, t, r = {}) {
        let n = r.fs || fr,
            i = Uc(t, r);
        await ci.fromCallback(n.writeFile)(e, i, r);
    }
    var zy = ci.fromPromise(Yy);
    function Xy(e, t, r = {}) {
        let n = r.fs || fr,
            i = Uc(t, r);
        return n.writeFileSync(e, i, r);
    }
    var Ky = { readFile: Gy, readFileSync: Vy, writeFile: zy, writeFileSync: Xy };
    Bc.exports = Ky;
});
var Wc = w((DI, Hc) => {
    "use strict";
    var fi = jc();
    Hc.exports = {
        readJson: fi.readFile,
        readJsonSync: fi.readFileSync,
        writeJson: fi.writeFile,
        writeJsonSync: fi.writeFileSync
    };
});
var hi = w((FI, Yc) => {
    "use strict";
    var Jy = Pe().fromCallback,
        tn = Se(),
        Gc = require("path"),
        Vc = Ve(),
        Qy = dt().pathExists;
    function Zy(e, t, r, n) {
        typeof r == "function" && ((n = r), (r = "utf8"));
        let i = Gc.dirname(e);
        Qy(i, (s, o) => {
            if (s) return n(s);
            if (o) return tn.writeFile(e, t, r, n);
            Vc.mkdirs(i, a => {
                if (a) return n(a);
                tn.writeFile(e, t, r, n);
            });
        });
    }
    function eE(e, ...t) {
        let r = Gc.dirname(e);
        if (tn.existsSync(r)) return tn.writeFileSync(e, ...t);
        Vc.mkdirsSync(r), tn.writeFileSync(e, ...t);
    }
    Yc.exports = { outputFile: Jy(Zy), outputFileSync: eE };
});
var Xc = w((qI, zc) => {
    "use strict";
    var { stringify: tE } = ui(),
        { outputFile: rE } = hi();
    async function nE(e, t, r = {}) {
        let n = tE(t, r);
        await rE(e, n, r);
    }
    zc.exports = nE;
});
var Jc = w((LI, Kc) => {
    "use strict";
    var { stringify: iE } = ui(),
        { outputFileSync: sE } = hi();
    function oE(e, t, r) {
        let n = iE(t, r);
        sE(e, n, r);
    }
    Kc.exports = oE;
});
var Zc = w(($I, Qc) => {
    "use strict";
    var aE = Pe().fromPromise,
        Ae = Wc();
    Ae.outputJson = aE(Xc());
    Ae.outputJsonSync = Jc();
    Ae.outputJSON = Ae.outputJson;
    Ae.outputJSONSync = Ae.outputJsonSync;
    Ae.writeJSON = Ae.writeJson;
    Ae.writeJSONSync = Ae.writeJsonSync;
    Ae.readJSON = Ae.readJson;
    Ae.readJSONSync = Ae.readJsonSync;
    Qc.exports = Ae;
});
var sf = w((kI, nf) => {
    "use strict";
    var lE = Se(),
        Zs = require("path"),
        uE = si().copy,
        rf = Zr().remove,
        cE = Ve().mkdirp,
        fE = dt().pathExists,
        ef = Dt();
    function hE(e, t, r, n) {
        typeof r == "function" && ((n = r), (r = {})), (r = r || {});
        let i = r.overwrite || r.clobber || !1;
        ef.checkPaths(e, t, "move", r, (s, o) => {
            if (s) return n(s);
            let { srcStat: a, isChangingCase: l = !1 } = o;
            ef.checkParentPaths(e, a, t, "move", h => {
                if (h) return n(h);
                if (dE(t)) return tf(e, t, i, l, n);
                cE(Zs.dirname(t), c => (c ? n(c) : tf(e, t, i, l, n)));
            });
        });
    }
    function dE(e) {
        let t = Zs.dirname(e);
        return Zs.parse(t).root === t;
    }
    function tf(e, t, r, n, i) {
        if (n) return Qs(e, t, r, i);
        if (r) return rf(t, s => (s ? i(s) : Qs(e, t, r, i)));
        fE(t, (s, o) => (s ? i(s) : o ? i(new Error("dest already exists.")) : Qs(e, t, r, i)));
    }
    function Qs(e, t, r, n) {
        lE.rename(e, t, i => (i ? (i.code !== "EXDEV" ? n(i) : pE(e, t, r, n)) : n()));
    }
    function pE(e, t, r, n) {
        uE(e, t, { overwrite: r, errorOnExist: !0 }, s => (s ? n(s) : rf(e, n)));
    }
    nf.exports = hE;
});
var cf = w((UI, uf) => {
    "use strict";
    var af = Se(),
        to = require("path"),
        mE = si().copySync,
        lf = Zr().removeSync,
        gE = Ve().mkdirpSync,
        of = Dt();
    function wE(e, t, r) {
        r = r || {};
        let n = r.overwrite || r.clobber || !1,
            { srcStat: i, isChangingCase: s = !1 } = of.checkPathsSync(e, t, "move", r);
        return of.checkParentPathsSync(e, i, t, "move"), yE(t) || gE(to.dirname(t)), EE(e, t, n, s);
    }
    function yE(e) {
        let t = to.dirname(e);
        return to.parse(t).root === t;
    }
    function EE(e, t, r, n) {
        if (n) return eo(e, t, r);
        if (r) return lf(t), eo(e, t, r);
        if (af.existsSync(t)) throw new Error("dest already exists.");
        return eo(e, t, r);
    }
    function eo(e, t, r) {
        try {
            af.renameSync(e, t);
        } catch (n) {
            if (n.code !== "EXDEV") throw n;
            return _E(e, t, r);
        }
    }
    function _E(e, t, r) {
        return mE(e, t, { overwrite: r, errorOnExist: !0 }), lf(e);
    }
    uf.exports = wE;
});
var hf = w((MI, ff) => {
    "use strict";
    var vE = Pe().fromCallback;
    ff.exports = { move: vE(sf()), moveSync: cf() };
});
var rt = w((BI, df) => {
    "use strict";
    df.exports = { ...Pt(), ...si(), ...ac(), ...$c(), ...Zc(), ...Ve(), ...hf(), ...hi(), ...dt(), ...Zr() };
});
var hr = w((jI, Ft) => {
    "use strict";
    function pf(e) {
        return typeof e > "u" || e === null;
    }
    function SE(e) {
        return typeof e == "object" && e !== null;
    }
    function AE(e) {
        return Array.isArray(e) ? e : pf(e) ? [] : [e];
    }
    function CE(e, t) {
        var r, n, i, s;
        if (t) for (s = Object.keys(t), r = 0, n = s.length; r < n; r += 1) (i = s[r]), (e[i] = t[i]);
        return e;
    }
    function bE(e, t) {
        var r = "",
            n;
        for (n = 0; n < t; n += 1) r += e;
        return r;
    }
    function TE(e) {
        return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
    }
    Ft.exports.isNothing = pf;
    Ft.exports.isObject = SE;
    Ft.exports.toArray = AE;
    Ft.exports.repeat = bE;
    Ft.exports.isNegativeZero = TE;
    Ft.exports.extend = CE;
});
var dr = w((HI, gf) => {
    "use strict";
    function mf(e, t) {
        var r = "",
            n = e.reason || "(unknown reason)";
        return e.mark
            ? (e.mark.name && (r += 'in "' + e.mark.name + '" '),
              (r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")"),
              !t && e.mark.snippet && (r += "\n\n" + e.mark.snippet),
              n + " " + r)
            : n;
    }
    function rn(e, t) {
        Error.call(this),
            (this.name = "YAMLException"),
            (this.reason = e),
            (this.mark = t),
            (this.message = mf(this, !1)),
            Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : (this.stack = new Error().stack || "");
    }
    rn.prototype = Object.create(Error.prototype);
    rn.prototype.constructor = rn;
    rn.prototype.toString = function (t) {
        return this.name + ": " + mf(this, t);
    };
    gf.exports = rn;
});
var yf = w((WI, wf) => {
    "use strict";
    var nn = hr();
    function ro(e, t, r, n, i) {
        var s = "",
            o = "",
            a = Math.floor(i / 2) - 1;
        return (
            n - t > a && ((s = " ... "), (t = n - a + s.length)),
            r - n > a && ((o = " ..."), (r = n + a - o.length)),
            { str: s + e.slice(t, r).replace(/\t/g, "\u2192") + o, pos: n - t + s.length }
        );
    }
    function no(e, t) {
        return nn.repeat(" ", t - e.length) + e;
    }
    function OE(e, t) {
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
            h,
            c = Math.min(e.line + t.linesAfter, i.length).toString().length,
            f = t.maxLength - (t.indent + c + 3);
        for (l = 1; l <= t.linesBefore && !(o - l < 0); l++)
            (h = ro(e.buffer, n[o - l], i[o - l], e.position - (n[o] - n[o - l]), f)),
                (a = nn.repeat(" ", t.indent) + no((e.line - l + 1).toString(), c) + " | " + h.str + "\n" + a);
        for (
            h = ro(e.buffer, n[o], i[o], e.position, f),
                a += nn.repeat(" ", t.indent) + no((e.line + 1).toString(), c) + " | " + h.str + "\n",
                a += nn.repeat("-", t.indent + c + 3 + h.pos) + "^\n",
                l = 1;
            l <= t.linesAfter && !(o + l >= i.length);
            l++
        )
            (h = ro(e.buffer, n[o + l], i[o + l], e.position - (n[o] - n[o + l]), f)),
                (a += nn.repeat(" ", t.indent) + no((e.line + l + 1).toString(), c) + " | " + h.str + "\n");
        return a.replace(/\n$/, "");
    }
    wf.exports = OE;
});
var we = w((GI, _f) => {
    "use strict";
    var Ef = dr(),
        xE = [
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
        IE = ["scalar", "sequence", "mapping"];
    function NE(e) {
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
    function RE(e, t) {
        if (
            ((t = t || {}),
            Object.keys(t).forEach(function (r) {
                if (xE.indexOf(r) === -1)
                    throw new Ef('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
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
            (this.styleAliases = NE(t.styleAliases || null)),
            IE.indexOf(this.kind) === -1)
        )
            throw new Ef('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
    }
    _f.exports = RE;
});
var oo = w((VI, Sf) => {
    "use strict";
    var sn = dr(),
        io = we();
    function vf(e, t) {
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
    function PE() {
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
    function so(e) {
        return this.extend(e);
    }
    so.prototype.extend = function (t) {
        var r = [],
            n = [];
        if (t instanceof io) n.push(t);
        else if (Array.isArray(t)) n = n.concat(t);
        else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
            t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
        else
            throw new sn(
                "Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })"
            );
        r.forEach(function (s) {
            if (!(s instanceof io))
                throw new sn("Specified list of YAML types (or a single Type object) contains a non-Type object.");
            if (s.loadKind && s.loadKind !== "scalar")
                throw new sn(
                    "There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported."
                );
            if (s.multi)
                throw new sn(
                    "There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit."
                );
        }),
            n.forEach(function (s) {
                if (!(s instanceof io))
                    throw new sn("Specified list of YAML types (or a single Type object) contains a non-Type object.");
            });
        var i = Object.create(so.prototype);
        return (
            (i.implicit = (this.implicit || []).concat(r)),
            (i.explicit = (this.explicit || []).concat(n)),
            (i.compiledImplicit = vf(i, "implicit")),
            (i.compiledExplicit = vf(i, "explicit")),
            (i.compiledTypeMap = PE(i.compiledImplicit, i.compiledExplicit)),
            i
        );
    };
    Sf.exports = so;
});
var ao = w((YI, Af) => {
    "use strict";
    var DE = we();
    Af.exports = new DE("tag:yaml.org,2002:str", {
        kind: "scalar",
        construct: function (e) {
            return e !== null ? e : "";
        }
    });
});
var lo = w((zI, Cf) => {
    "use strict";
    var FE = we();
    Cf.exports = new FE("tag:yaml.org,2002:seq", {
        kind: "sequence",
        construct: function (e) {
            return e !== null ? e : [];
        }
    });
});
var uo = w((XI, bf) => {
    "use strict";
    var qE = we();
    bf.exports = new qE("tag:yaml.org,2002:map", {
        kind: "mapping",
        construct: function (e) {
            return e !== null ? e : {};
        }
    });
});
var co = w((KI, Tf) => {
    "use strict";
    var LE = oo();
    Tf.exports = new LE({ explicit: [ao(), lo(), uo()] });
});
var fo = w((JI, Of) => {
    "use strict";
    var $E = we();
    function kE(e) {
        if (e === null) return !0;
        var t = e.length;
        return (t === 1 && e === "~") || (t === 4 && (e === "null" || e === "Null" || e === "NULL"));
    }
    function UE() {
        return null;
    }
    function ME(e) {
        return e === null;
    }
    Of.exports = new $E("tag:yaml.org,2002:null", {
        kind: "scalar",
        resolve: kE,
        construct: UE,
        predicate: ME,
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
var ho = w((QI, xf) => {
    "use strict";
    var BE = we();
    function jE(e) {
        if (e === null) return !1;
        var t = e.length;
        return (
            (t === 4 && (e === "true" || e === "True" || e === "TRUE")) ||
            (t === 5 && (e === "false" || e === "False" || e === "FALSE"))
        );
    }
    function HE(e) {
        return e === "true" || e === "True" || e === "TRUE";
    }
    function WE(e) {
        return Object.prototype.toString.call(e) === "[object Boolean]";
    }
    xf.exports = new BE("tag:yaml.org,2002:bool", {
        kind: "scalar",
        resolve: jE,
        construct: HE,
        predicate: WE,
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
var po = w((ZI, If) => {
    "use strict";
    var GE = hr(),
        VE = we();
    function YE(e) {
        return (48 <= e && e <= 57) || (65 <= e && e <= 70) || (97 <= e && e <= 102);
    }
    function zE(e) {
        return 48 <= e && e <= 55;
    }
    function XE(e) {
        return 48 <= e && e <= 57;
    }
    function KE(e) {
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
                        if (!YE(e.charCodeAt(r))) return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
            if (i === "o") {
                for (r++; r < t; r++)
                    if (((i = e[r]), i !== "_")) {
                        if (!zE(e.charCodeAt(r))) return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
        }
        if (i === "_") return !1;
        for (; r < t; r++)
            if (((i = e[r]), i !== "_")) {
                if (!XE(e.charCodeAt(r))) return !1;
                n = !0;
            }
        return !(!n || i === "_");
    }
    function JE(e) {
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
    function QE(e) {
        return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !GE.isNegativeZero(e);
    }
    If.exports = new VE("tag:yaml.org,2002:int", {
        kind: "scalar",
        resolve: KE,
        construct: JE,
        predicate: QE,
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
var mo = w((eN, Rf) => {
    "use strict";
    var Nf = hr(),
        ZE = we(),
        e_ = new RegExp(
            "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
        );
    function t_(e) {
        return !(e === null || !e_.test(e) || e[e.length - 1] === "_");
    }
    function r_(e) {
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
    var n_ = /^[-+]?[0-9]+e/;
    function i_(e, t) {
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
        return (r = e.toString(10)), n_.test(r) ? r.replace("e", ".e") : r;
    }
    function s_(e) {
        return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || Nf.isNegativeZero(e));
    }
    Rf.exports = new ZE("tag:yaml.org,2002:float", {
        kind: "scalar",
        resolve: t_,
        construct: r_,
        predicate: s_,
        represent: i_,
        defaultStyle: "lowercase"
    });
});
var go = w((tN, Pf) => {
    "use strict";
    Pf.exports = co().extend({ implicit: [fo(), ho(), po(), mo()] });
});
var wo = w((rN, Df) => {
    "use strict";
    Df.exports = go();
});
var yo = w((nN, Lf) => {
    "use strict";
    var o_ = we(),
        Ff = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),
        qf = new RegExp(
            "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
        );
    function a_(e) {
        return e === null ? !1 : Ff.exec(e) !== null || qf.exec(e) !== null;
    }
    function l_(e) {
        var t,
            r,
            n,
            i,
            s,
            o,
            a,
            l = 0,
            h = null,
            c,
            f,
            m;
        if (((t = Ff.exec(e)), t === null && (t = qf.exec(e)), t === null)) throw new Error("Date resolve error");
        if (((r = +t[1]), (n = +t[2] - 1), (i = +t[3]), !t[4])) return new Date(Date.UTC(r, n, i));
        if (((s = +t[4]), (o = +t[5]), (a = +t[6]), t[7])) {
            for (l = t[7].slice(0, 3); l.length < 3; ) l += "0";
            l = +l;
        }
        return (
            t[9] && ((c = +t[10]), (f = +(t[11] || 0)), (h = (c * 60 + f) * 6e4), t[9] === "-" && (h = -h)),
            (m = new Date(Date.UTC(r, n, i, s, o, a, l))),
            h && m.setTime(m.getTime() - h),
            m
        );
    }
    function u_(e) {
        return e.toISOString();
    }
    Lf.exports = new o_("tag:yaml.org,2002:timestamp", {
        kind: "scalar",
        resolve: a_,
        construct: l_,
        instanceOf: Date,
        represent: u_
    });
});
var Eo = w((iN, $f) => {
    "use strict";
    var c_ = we();
    function f_(e) {
        return e === "<<" || e === null;
    }
    $f.exports = new c_("tag:yaml.org,2002:merge", { kind: "scalar", resolve: f_ });
});
var vo = w((sN, kf) => {
    "use strict";
    var h_ = we(),
        _o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function d_(e) {
        if (e === null) return !1;
        var t,
            r,
            n = 0,
            i = e.length,
            s = _o;
        for (r = 0; r < i; r++)
            if (((t = s.indexOf(e.charAt(r))), !(t > 64))) {
                if (t < 0) return !1;
                n += 6;
            }
        return n % 8 === 0;
    }
    function p_(e) {
        var t,
            r,
            n = e.replace(/[\r\n=]/g, ""),
            i = n.length,
            s = _o,
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
    function m_(e) {
        var t = "",
            r = 0,
            n,
            i,
            s = e.length,
            o = _o;
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
    function g_(e) {
        return Object.prototype.toString.call(e) === "[object Uint8Array]";
    }
    kf.exports = new h_("tag:yaml.org,2002:binary", { kind: "scalar", resolve: d_, construct: p_, predicate: g_, represent: m_ });
});
var So = w((oN, Uf) => {
    "use strict";
    var w_ = we(),
        y_ = Object.prototype.hasOwnProperty,
        E_ = Object.prototype.toString;
    function __(e) {
        if (e === null) return !0;
        var t = [],
            r,
            n,
            i,
            s,
            o,
            a = e;
        for (r = 0, n = a.length; r < n; r += 1) {
            if (((i = a[r]), (o = !1), E_.call(i) !== "[object Object]")) return !1;
            for (s in i)
                if (y_.call(i, s))
                    if (!o) o = !0;
                    else return !1;
            if (!o) return !1;
            if (t.indexOf(s) === -1) t.push(s);
            else return !1;
        }
        return !0;
    }
    function v_(e) {
        return e !== null ? e : [];
    }
    Uf.exports = new w_("tag:yaml.org,2002:omap", { kind: "sequence", resolve: __, construct: v_ });
});
var Ao = w((aN, Mf) => {
    "use strict";
    var S_ = we(),
        A_ = Object.prototype.toString;
    function C_(e) {
        if (e === null) return !0;
        var t,
            r,
            n,
            i,
            s,
            o = e;
        for (s = new Array(o.length), t = 0, r = o.length; t < r; t += 1) {
            if (((n = o[t]), A_.call(n) !== "[object Object]" || ((i = Object.keys(n)), i.length !== 1))) return !1;
            s[t] = [i[0], n[i[0]]];
        }
        return !0;
    }
    function b_(e) {
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
    Mf.exports = new S_("tag:yaml.org,2002:pairs", { kind: "sequence", resolve: C_, construct: b_ });
});
var Co = w((lN, Bf) => {
    "use strict";
    var T_ = we(),
        O_ = Object.prototype.hasOwnProperty;
    function x_(e) {
        if (e === null) return !0;
        var t,
            r = e;
        for (t in r) if (O_.call(r, t) && r[t] !== null) return !1;
        return !0;
    }
    function I_(e) {
        return e !== null ? e : {};
    }
    Bf.exports = new T_("tag:yaml.org,2002:set", { kind: "mapping", resolve: x_, construct: I_ });
});
var di = w((uN, jf) => {
    "use strict";
    jf.exports = wo().extend({ implicit: [yo(), Eo()], explicit: [vo(), So(), Ao(), Co()] });
});
var ih = w((cN, xo) => {
    "use strict";
    var Lt = hr(),
        Xf = dr(),
        N_ = yf(),
        R_ = di(),
        yt = Object.prototype.hasOwnProperty,
        pi = 1,
        Kf = 2,
        Jf = 3,
        mi = 4,
        bo = 1,
        P_ = 2,
        Hf = 3,
        D_ =
            /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
        F_ = /[\x85\u2028\u2029]/,
        q_ = /[,\[\]\{\}]/,
        Qf = /^(?:!|!!|![a-z\-]+!)$/i,
        Zf = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function Wf(e) {
        return Object.prototype.toString.call(e);
    }
    function Ke(e) {
        return e === 10 || e === 13;
    }
    function $t(e) {
        return e === 9 || e === 32;
    }
    function qe(e) {
        return e === 9 || e === 32 || e === 10 || e === 13;
    }
    function pr(e) {
        return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
    }
    function L_(e) {
        var t;
        return 48 <= e && e <= 57 ? e - 48 : ((t = e | 32), 97 <= t && t <= 102 ? t - 97 + 10 : -1);
    }
    function $_(e) {
        return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
    }
    function k_(e) {
        return 48 <= e && e <= 57 ? e - 48 : -1;
    }
    function Gf(e) {
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
    function U_(e) {
        return e <= 65535
            ? String.fromCharCode(e)
            : String.fromCharCode(((e - 65536) >> 10) + 55296, ((e - 65536) & 1023) + 56320);
    }
    var eh = new Array(256),
        th = new Array(256);
    for (qt = 0; qt < 256; qt++) (eh[qt] = Gf(qt) ? 1 : 0), (th[qt] = Gf(qt));
    var qt;
    function M_(e, t) {
        (this.input = e),
            (this.filename = t.filename || null),
            (this.schema = t.schema || R_),
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
    function rh(e, t) {
        var r = {
            name: e.filename,
            buffer: e.input.slice(0, -1),
            position: e.position,
            line: e.line,
            column: e.position - e.lineStart
        };
        return (r.snippet = N_(r)), new Xf(t, r);
    }
    function I(e, t) {
        throw rh(e, t);
    }
    function gi(e, t) {
        e.onWarning && e.onWarning.call(null, rh(e, t));
    }
    var Vf = {
        YAML: function (t, r, n) {
            var i, s, o;
            t.version !== null && I(t, "duplication of %YAML directive"),
                n.length !== 1 && I(t, "YAML directive accepts exactly one argument"),
                (i = /^([0-9]+)\.([0-9]+)$/.exec(n[0])),
                i === null && I(t, "ill-formed argument of the YAML directive"),
                (s = parseInt(i[1], 10)),
                (o = parseInt(i[2], 10)),
                s !== 1 && I(t, "unacceptable YAML version of the document"),
                (t.version = n[0]),
                (t.checkLineBreaks = o < 2),
                o !== 1 && o !== 2 && gi(t, "unsupported YAML version of the document");
        },
        TAG: function (t, r, n) {
            var i, s;
            n.length !== 2 && I(t, "TAG directive accepts exactly two arguments"),
                (i = n[0]),
                (s = n[1]),
                Qf.test(i) || I(t, "ill-formed tag handle (first argument) of the TAG directive"),
                yt.call(t.tagMap, i) && I(t, 'there is a previously declared suffix for "' + i + '" tag handle'),
                Zf.test(s) || I(t, "ill-formed tag prefix (second argument) of the TAG directive");
            try {
                s = decodeURIComponent(s);
            } catch {
                I(t, "tag prefix is malformed: " + s);
            }
            t.tagMap[i] = s;
        }
    };
    function wt(e, t, r, n) {
        var i, s, o, a;
        if (t < r) {
            if (((a = e.input.slice(t, r)), n))
                for (i = 0, s = a.length; i < s; i += 1)
                    (o = a.charCodeAt(i)), o === 9 || (32 <= o && o <= 1114111) || I(e, "expected valid JSON character");
            else D_.test(a) && I(e, "the stream contains non-printable characters");
            e.result += a;
        }
    }
    function Yf(e, t, r, n) {
        var i, s, o, a;
        for (
            Lt.isObject(r) || I(e, "cannot merge mappings; the provided source object is unacceptable"),
                i = Object.keys(r),
                o = 0,
                a = i.length;
            o < a;
            o += 1
        )
            (s = i[o]), yt.call(t, s) || ((t[s] = r[s]), (n[s] = !0));
    }
    function mr(e, t, r, n, i, s, o, a, l) {
        var h, c;
        if (Array.isArray(i))
            for (i = Array.prototype.slice.call(i), h = 0, c = i.length; h < c; h += 1)
                Array.isArray(i[h]) && I(e, "nested arrays are not supported inside keys"),
                    typeof i == "object" && Wf(i[h]) === "[object Object]" && (i[h] = "[object Object]");
        if (
            (typeof i == "object" && Wf(i) === "[object Object]" && (i = "[object Object]"),
            (i = String(i)),
            t === null && (t = {}),
            n === "tag:yaml.org,2002:merge")
        )
            if (Array.isArray(s)) for (h = 0, c = s.length; h < c; h += 1) Yf(e, t, s[h], r);
            else Yf(e, t, s, r);
        else
            !e.json &&
                !yt.call(r, i) &&
                yt.call(t, i) &&
                ((e.line = o || e.line),
                (e.lineStart = a || e.lineStart),
                (e.position = l || e.position),
                I(e, "duplicated mapping key")),
                i === "__proto__"
                    ? Object.defineProperty(t, i, { configurable: !0, enumerable: !0, writable: !0, value: s })
                    : (t[i] = s),
                delete r[i];
        return t;
    }
    function To(e) {
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
    function oe(e, t, r) {
        for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
            for (; $t(i); )
                i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), (i = e.input.charCodeAt(++e.position));
            if (t && i === 35)
                do i = e.input.charCodeAt(++e.position);
                while (i !== 10 && i !== 13 && i !== 0);
            if (Ke(i))
                for (To(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
                    e.lineIndent++, (i = e.input.charCodeAt(++e.position));
            else break;
        }
        return r !== -1 && n !== 0 && e.lineIndent < r && gi(e, "deficient indentation"), n;
    }
    function wi(e) {
        var t = e.position,
            r;
        return (
            (r = e.input.charCodeAt(t)),
            !!(
                (r === 45 || r === 46) &&
                r === e.input.charCodeAt(t + 1) &&
                r === e.input.charCodeAt(t + 2) &&
                ((t += 3), (r = e.input.charCodeAt(t)), r === 0 || qe(r))
            )
        );
    }
    function Oo(e, t) {
        t === 1 ? (e.result += " ") : t > 1 && (e.result += Lt.repeat("\n", t - 1));
    }
    function B_(e, t, r) {
        var n,
            i,
            s,
            o,
            a,
            l,
            h,
            c,
            f = e.kind,
            m = e.result,
            p;
        if (
            ((p = e.input.charCodeAt(e.position)),
            qe(p) ||
                pr(p) ||
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
                ((p === 63 || p === 45) && ((i = e.input.charCodeAt(e.position + 1)), qe(i) || (r && pr(i)))))
        )
            return !1;
        for (e.kind = "scalar", e.result = "", s = o = e.position, a = !1; p !== 0; ) {
            if (p === 58) {
                if (((i = e.input.charCodeAt(e.position + 1)), qe(i) || (r && pr(i)))) break;
            } else if (p === 35) {
                if (((n = e.input.charCodeAt(e.position - 1)), qe(n))) break;
            } else {
                if ((e.position === e.lineStart && wi(e)) || (r && pr(p))) break;
                if (Ke(p))
                    if (((l = e.line), (h = e.lineStart), (c = e.lineIndent), oe(e, !1, -1), e.lineIndent >= t)) {
                        (a = !0), (p = e.input.charCodeAt(e.position));
                        continue;
                    } else {
                        (e.position = o), (e.line = l), (e.lineStart = h), (e.lineIndent = c);
                        break;
                    }
            }
            a && (wt(e, s, o, !1), Oo(e, e.line - l), (s = o = e.position), (a = !1)),
                $t(p) || (o = e.position + 1),
                (p = e.input.charCodeAt(++e.position));
        }
        return wt(e, s, o, !1), e.result ? !0 : ((e.kind = f), (e.result = m), !1);
    }
    function j_(e, t) {
        var r, n, i;
        if (((r = e.input.charCodeAt(e.position)), r !== 39)) return !1;
        for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
            if (r === 39)
                if ((wt(e, n, e.position, !0), (r = e.input.charCodeAt(++e.position)), r === 39))
                    (n = e.position), e.position++, (i = e.position);
                else return !0;
            else
                Ke(r)
                    ? (wt(e, n, i, !0), Oo(e, oe(e, !1, t)), (n = i = e.position))
                    : e.position === e.lineStart && wi(e)
                    ? I(e, "unexpected end of the document within a single quoted scalar")
                    : (e.position++, (i = e.position));
        I(e, "unexpected end of the stream within a single quoted scalar");
    }
    function H_(e, t) {
        var r, n, i, s, o, a;
        if (((a = e.input.charCodeAt(e.position)), a !== 34)) return !1;
        for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (a = e.input.charCodeAt(e.position)) !== 0; ) {
            if (a === 34) return wt(e, r, e.position, !0), e.position++, !0;
            if (a === 92) {
                if ((wt(e, r, e.position, !0), (a = e.input.charCodeAt(++e.position)), Ke(a))) oe(e, !1, t);
                else if (a < 256 && eh[a]) (e.result += th[a]), e.position++;
                else if ((o = $_(a)) > 0) {
                    for (i = o, s = 0; i > 0; i--)
                        (a = e.input.charCodeAt(++e.position)),
                            (o = L_(a)) >= 0 ? (s = (s << 4) + o) : I(e, "expected hexadecimal character");
                    (e.result += U_(s)), e.position++;
                } else I(e, "unknown escape sequence");
                r = n = e.position;
            } else
                Ke(a)
                    ? (wt(e, r, n, !0), Oo(e, oe(e, !1, t)), (r = n = e.position))
                    : e.position === e.lineStart && wi(e)
                    ? I(e, "unexpected end of the document within a double quoted scalar")
                    : (e.position++, (n = e.position));
        }
        I(e, "unexpected end of the stream within a double quoted scalar");
    }
    function W_(e, t) {
        var r = !0,
            n,
            i,
            s,
            o = e.tag,
            a,
            l = e.anchor,
            h,
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
            if ((oe(e, !0, t), (C = e.input.charCodeAt(e.position)), C === c))
                return e.position++, (e.tag = o), (e.anchor = l), (e.kind = p ? "mapping" : "sequence"), (e.result = a), !0;
            r
                ? C === 44 && I(e, "expected the node content, but found ','")
                : I(e, "missed comma between flow collection entries"),
                (S = v = T = null),
                (f = m = !1),
                C === 63 && ((h = e.input.charCodeAt(e.position + 1)), qe(h) && ((f = m = !0), e.position++, oe(e, !0, t))),
                (n = e.line),
                (i = e.lineStart),
                (s = e.position),
                gr(e, t, pi, !1, !0),
                (S = e.tag),
                (v = e.result),
                oe(e, !0, t),
                (C = e.input.charCodeAt(e.position)),
                (m || e.line === n) &&
                    C === 58 &&
                    ((f = !0), (C = e.input.charCodeAt(++e.position)), oe(e, !0, t), gr(e, t, pi, !1, !0), (T = e.result)),
                p ? mr(e, a, _, S, v, T, n, i, s) : f ? a.push(mr(e, null, _, S, v, T, n, i, s)) : a.push(v),
                oe(e, !0, t),
                (C = e.input.charCodeAt(e.position)),
                C === 44 ? ((r = !0), (C = e.input.charCodeAt(++e.position))) : (r = !1);
        }
        I(e, "unexpected end of the stream within a flow collection");
    }
    function G_(e, t) {
        var r,
            n,
            i = bo,
            s = !1,
            o = !1,
            a = t,
            l = 0,
            h = !1,
            c,
            f;
        if (((f = e.input.charCodeAt(e.position)), f === 124)) n = !1;
        else if (f === 62) n = !0;
        else return !1;
        for (e.kind = "scalar", e.result = ""; f !== 0; )
            if (((f = e.input.charCodeAt(++e.position)), f === 43 || f === 45))
                bo === i ? (i = f === 43 ? Hf : P_) : I(e, "repeat of a chomping mode identifier");
            else if ((c = k_(f)) >= 0)
                c === 0
                    ? I(e, "bad explicit indentation width of a block scalar; it cannot be less than one")
                    : o
                    ? I(e, "repeat of an indentation width identifier")
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
            for (To(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!o || e.lineIndent < a) && f === 32; )
                e.lineIndent++, (f = e.input.charCodeAt(++e.position));
            if ((!o && e.lineIndent > a && (a = e.lineIndent), Ke(f))) {
                l++;
                continue;
            }
            if (e.lineIndent < a) {
                i === Hf ? (e.result += Lt.repeat("\n", s ? 1 + l : l)) : i === bo && s && (e.result += "\n");
                break;
            }
            for (
                n
                    ? $t(f)
                        ? ((h = !0), (e.result += Lt.repeat("\n", s ? 1 + l : l)))
                        : h
                        ? ((h = !1), (e.result += Lt.repeat("\n", l + 1)))
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
    function zf(e, t) {
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
            (e.firstTabInLine !== -1 && ((e.position = e.firstTabInLine), I(e, "tab characters must not be used in indentation")),
            !(l !== 45 || ((o = e.input.charCodeAt(e.position + 1)), !qe(o))));

        ) {
            if (((a = !0), e.position++, oe(e, !0, -1) && e.lineIndent <= t)) {
                s.push(null), (l = e.input.charCodeAt(e.position));
                continue;
            }
            if (
                ((r = e.line),
                gr(e, t, Jf, !1, !0),
                s.push(e.result),
                oe(e, !0, -1),
                (l = e.input.charCodeAt(e.position)),
                (e.line === r || e.lineIndent > t) && l !== 0)
            )
                I(e, "bad indentation of a sequence entry");
            else if (e.lineIndent < t) break;
        }
        return a ? ((e.tag = n), (e.anchor = i), (e.kind = "sequence"), (e.result = s), !0) : !1;
    }
    function V_(e, t, r) {
        var n,
            i,
            s,
            o,
            a,
            l,
            h = e.tag,
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
                    ((e.position = e.firstTabInLine), I(e, "tab characters must not be used in indentation")),
                (n = e.input.charCodeAt(e.position + 1)),
                (s = e.line),
                (C === 63 || C === 58) && qe(n))
            )
                C === 63
                    ? (S && (mr(e, f, m, p, _, null, o, a, l), (p = _ = v = null)), (T = !0), (S = !0), (i = !0))
                    : S
                    ? ((S = !1), (i = !0))
                    : I(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),
                    (e.position += 1),
                    (C = n);
            else {
                if (((o = e.line), (a = e.lineStart), (l = e.position), !gr(e, r, Kf, !1, !0))) break;
                if (e.line === s) {
                    for (C = e.input.charCodeAt(e.position); $t(C); ) C = e.input.charCodeAt(++e.position);
                    if (C === 58)
                        (C = e.input.charCodeAt(++e.position)),
                            qe(C) ||
                                I(e, "a whitespace character is expected after the key-value separator within a block mapping"),
                            S && (mr(e, f, m, p, _, null, o, a, l), (p = _ = v = null)),
                            (T = !0),
                            (S = !1),
                            (i = !1),
                            (p = e.tag),
                            (_ = e.result);
                    else if (T) I(e, "can not read an implicit mapping pair; a colon is missed");
                    else return (e.tag = h), (e.anchor = c), !0;
                } else if (T) I(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
                else return (e.tag = h), (e.anchor = c), !0;
            }
            if (
                ((e.line === s || e.lineIndent > t) &&
                    (S && ((o = e.line), (a = e.lineStart), (l = e.position)),
                    gr(e, t, mi, !0, i) && (S ? (_ = e.result) : (v = e.result)),
                    S || (mr(e, f, m, p, _, v, o, a, l), (p = _ = v = null)),
                    oe(e, !0, -1),
                    (C = e.input.charCodeAt(e.position))),
                (e.line === s || e.lineIndent > t) && C !== 0)
            )
                I(e, "bad indentation of a mapping entry");
            else if (e.lineIndent < t) break;
        }
        return S && mr(e, f, m, p, _, null, o, a, l), T && ((e.tag = h), (e.anchor = c), (e.kind = "mapping"), (e.result = f)), T;
    }
    function Y_(e) {
        var t,
            r = !1,
            n = !1,
            i,
            s,
            o;
        if (((o = e.input.charCodeAt(e.position)), o !== 33)) return !1;
        if (
            (e.tag !== null && I(e, "duplication of a tag property"),
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
                : I(e, "unexpected end of the stream within a verbatim tag");
        } else {
            for (; o !== 0 && !qe(o); )
                o === 33 &&
                    (n
                        ? I(e, "tag suffix cannot contain exclamation marks")
                        : ((i = e.input.slice(t - 1, e.position + 1)),
                          Qf.test(i) || I(e, "named tag handle cannot contain such characters"),
                          (n = !0),
                          (t = e.position + 1))),
                    (o = e.input.charCodeAt(++e.position));
            (s = e.input.slice(t, e.position)), q_.test(s) && I(e, "tag suffix cannot contain flow indicator characters");
        }
        s && !Zf.test(s) && I(e, "tag name cannot contain such characters: " + s);
        try {
            s = decodeURIComponent(s);
        } catch {
            I(e, "tag name is malformed: " + s);
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
                : I(e, 'undeclared tag handle "' + i + '"'),
            !0
        );
    }
    function z_(e) {
        var t, r;
        if (((r = e.input.charCodeAt(e.position)), r !== 38)) return !1;
        for (
            e.anchor !== null && I(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position;
            r !== 0 && !qe(r) && !pr(r);

        )
            r = e.input.charCodeAt(++e.position);
        return (
            e.position === t && I(e, "name of an anchor node must contain at least one character"),
            (e.anchor = e.input.slice(t, e.position)),
            !0
        );
    }
    function X_(e) {
        var t, r, n;
        if (((n = e.input.charCodeAt(e.position)), n !== 42)) return !1;
        for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !qe(n) && !pr(n); )
            n = e.input.charCodeAt(++e.position);
        return (
            e.position === t && I(e, "name of an alias node must contain at least one character"),
            (r = e.input.slice(t, e.position)),
            yt.call(e.anchorMap, r) || I(e, 'unidentified alias "' + r + '"'),
            (e.result = e.anchorMap[r]),
            oe(e, !0, -1),
            !0
        );
    }
    function gr(e, t, r, n, i) {
        var s,
            o,
            a,
            l = 1,
            h = !1,
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
            (s = o = a = mi === r || Jf === r),
            n &&
                oe(e, !0, -1) &&
                ((h = !0), e.lineIndent > t ? (l = 1) : e.lineIndent === t ? (l = 0) : e.lineIndent < t && (l = -1)),
            l === 1)
        )
            for (; Y_(e) || z_(e); )
                oe(e, !0, -1)
                    ? ((h = !0),
                      (a = s),
                      e.lineIndent > t ? (l = 1) : e.lineIndent === t ? (l = 0) : e.lineIndent < t && (l = -1))
                    : (a = !1);
        if (
            (a && (a = h || i),
            (l === 1 || mi === r) &&
                (pi === r || Kf === r ? (v = t) : (v = t + 1),
                (S = e.position - e.lineStart),
                l === 1
                    ? (a && (zf(e, S) || V_(e, S, v))) || W_(e, v)
                        ? (c = !0)
                        : ((o && G_(e, v)) || j_(e, v) || H_(e, v)
                              ? (c = !0)
                              : X_(e)
                              ? ((c = !0),
                                (e.tag !== null || e.anchor !== null) && I(e, "alias node should not have any properties"))
                              : B_(e, v, pi === r) && ((c = !0), e.tag === null && (e.tag = "?")),
                          e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
                    : l === 0 && (c = a && zf(e, S))),
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
            _ || I(e, "unknown tag !<" + e.tag + ">"),
                e.result !== null &&
                    _.kind !== e.kind &&
                    I(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + _.kind + '", not "' + e.kind + '"'),
                _.resolve(e.result, e.tag)
                    ? ((e.result = _.construct(e.result, e.tag)), e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
                    : I(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
        }
        return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || c;
    }
    function K_(e) {
        var t = e.position,
            r,
            n,
            i,
            s = !1,
            o;
        for (
            e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = Object.create(null), e.anchorMap = Object.create(null);
            (o = e.input.charCodeAt(e.position)) !== 0 &&
            (oe(e, !0, -1), (o = e.input.charCodeAt(e.position)), !(e.lineIndent > 0 || o !== 37));

        ) {
            for (s = !0, o = e.input.charCodeAt(++e.position), r = e.position; o !== 0 && !qe(o); )
                o = e.input.charCodeAt(++e.position);
            for (
                n = e.input.slice(r, e.position),
                    i = [],
                    n.length < 1 && I(e, "directive name must not be less than one character in length");
                o !== 0;

            ) {
                for (; $t(o); ) o = e.input.charCodeAt(++e.position);
                if (o === 35) {
                    do o = e.input.charCodeAt(++e.position);
                    while (o !== 0 && !Ke(o));
                    break;
                }
                if (Ke(o)) break;
                for (r = e.position; o !== 0 && !qe(o); ) o = e.input.charCodeAt(++e.position);
                i.push(e.input.slice(r, e.position));
            }
            o !== 0 && To(e), yt.call(Vf, n) ? Vf[n](e, n, i) : gi(e, 'unknown document directive "' + n + '"');
        }
        if (
            (oe(e, !0, -1),
            e.lineIndent === 0 &&
            e.input.charCodeAt(e.position) === 45 &&
            e.input.charCodeAt(e.position + 1) === 45 &&
            e.input.charCodeAt(e.position + 2) === 45
                ? ((e.position += 3), oe(e, !0, -1))
                : s && I(e, "directives end mark is expected"),
            gr(e, e.lineIndent - 1, mi, !1, !0),
            oe(e, !0, -1),
            e.checkLineBreaks &&
                F_.test(e.input.slice(t, e.position)) &&
                gi(e, "non-ASCII line breaks are interpreted as content"),
            e.documents.push(e.result),
            e.position === e.lineStart && wi(e))
        ) {
            e.input.charCodeAt(e.position) === 46 && ((e.position += 3), oe(e, !0, -1));
            return;
        }
        if (e.position < e.length - 1) I(e, "end of the stream or a document separator is expected");
        else return;
    }
    function nh(e, t) {
        (e = String(e)),
            (t = t || {}),
            e.length !== 0 &&
                (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += "\n"),
                e.charCodeAt(0) === 65279 && (e = e.slice(1)));
        var r = new M_(e, t),
            n = e.indexOf("\0");
        for (
            n !== -1 && ((r.position = n), I(r, "null byte is not allowed in input")), r.input += "\0";
            r.input.charCodeAt(r.position) === 32;

        )
            (r.lineIndent += 1), (r.position += 1);
        for (; r.position < r.length - 1; ) K_(r);
        return r.documents;
    }
    function J_(e, t, r) {
        t !== null && typeof t == "object" && typeof r > "u" && ((r = t), (t = null));
        var n = nh(e, r);
        if (typeof t != "function") return n;
        for (var i = 0, s = n.length; i < s; i += 1) t(n[i]);
    }
    function Q_(e, t) {
        var r = nh(e, t);
        if (r.length !== 0) {
            if (r.length === 1) return r[0];
            throw new Xf("expected a single document in the stream, but found more");
        }
    }
    xo.exports.loadAll = J_;
    xo.exports.load = Q_;
});
var bh = w((fN, Ch) => {
    "use strict";
    var _i = hr(),
        cn = dr(),
        Z_ = di(),
        dh = Object.prototype.toString,
        ph = Object.prototype.hasOwnProperty,
        Do = 65279,
        ev = 9,
        an = 10,
        tv = 13,
        rv = 32,
        nv = 33,
        iv = 34,
        Io = 35,
        sv = 37,
        ov = 38,
        av = 39,
        lv = 42,
        mh = 44,
        uv = 45,
        yi = 58,
        cv = 61,
        fv = 62,
        hv = 63,
        dv = 64,
        gh = 91,
        wh = 93,
        pv = 96,
        yh = 123,
        mv = 124,
        Eh = 125,
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
    var gv = ["y", "Y", "yes", "Yes", "YES", "on", "On", "ON", "n", "N", "no", "No", "NO", "off", "Off", "OFF"],
        wv = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
    function yv(e, t) {
        var r, n, i, s, o, a, l;
        if (t === null) return {};
        for (r = {}, n = Object.keys(t), i = 0, s = n.length; i < s; i += 1)
            (o = n[i]),
                (a = String(t[o])),
                o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2)),
                (l = e.compiledTypeMap.fallback[o]),
                l && ph.call(l.styleAliases, a) && (a = l.styleAliases[a]),
                (r[o] = a);
        return r;
    }
    function Ev(e) {
        var t, r, n;
        if (((t = e.toString(16).toUpperCase()), e <= 255)) (r = "x"), (n = 2);
        else if (e <= 65535) (r = "u"), (n = 4);
        else if (e <= 4294967295) (r = "U"), (n = 8);
        else throw new cn("code point within a string may not be greater than 0xFFFFFFFF");
        return "\\" + r + _i.repeat("0", n - t.length) + t;
    }
    var _v = 1,
        ln = 2;
    function vv(e) {
        (this.schema = e.schema || Z_),
            (this.indent = Math.max(1, e.indent || 2)),
            (this.noArrayIndent = e.noArrayIndent || !1),
            (this.skipInvalid = e.skipInvalid || !1),
            (this.flowLevel = _i.isNothing(e.flowLevel) ? -1 : e.flowLevel),
            (this.styleMap = yv(this.schema, e.styles || null)),
            (this.sortKeys = e.sortKeys || !1),
            (this.lineWidth = e.lineWidth || 80),
            (this.noRefs = e.noRefs || !1),
            (this.noCompatMode = e.noCompatMode || !1),
            (this.condenseFlow = e.condenseFlow || !1),
            (this.quotingType = e.quotingType === '"' ? ln : _v),
            (this.forceQuotes = e.forceQuotes || !1),
            (this.replacer = typeof e.replacer == "function" ? e.replacer : null),
            (this.implicitTypes = this.schema.compiledImplicit),
            (this.explicitTypes = this.schema.compiledExplicit),
            (this.tag = null),
            (this.result = ""),
            (this.duplicates = []),
            (this.usedDuplicates = null);
    }
    function sh(e, t) {
        for (var r = _i.repeat(" ", t), n = 0, i = -1, s = "", o, a = e.length; n < a; )
            (i = e.indexOf("\n", n)),
                i === -1 ? ((o = e.slice(n)), (n = a)) : ((o = e.slice(n, i + 1)), (n = i + 1)),
                o.length && o !== "\n" && (s += r),
                (s += o);
        return s;
    }
    function No(e, t) {
        return "\n" + _i.repeat(" ", e.indent * t);
    }
    function Sv(e, t) {
        var r, n, i;
        for (r = 0, n = e.implicitTypes.length; r < n; r += 1) if (((i = e.implicitTypes[r]), i.resolve(t))) return !0;
        return !1;
    }
    function Ei(e) {
        return e === rv || e === ev;
    }
    function un(e) {
        return (
            (32 <= e && e <= 126) ||
            (161 <= e && e <= 55295 && e !== 8232 && e !== 8233) ||
            (57344 <= e && e <= 65533 && e !== Do) ||
            (65536 <= e && e <= 1114111)
        );
    }
    function oh(e) {
        return un(e) && e !== Do && e !== tv && e !== an;
    }
    function ah(e, t, r) {
        var n = oh(e),
            i = n && !Ei(e);
        return (
            ((r ? n : n && e !== mh && e !== gh && e !== wh && e !== yh && e !== Eh) && e !== Io && !(t === yi && !i)) ||
            (oh(t) && !Ei(t) && e === Io) ||
            (t === yi && i)
        );
    }
    function Av(e) {
        return (
            un(e) &&
            e !== Do &&
            !Ei(e) &&
            e !== uv &&
            e !== hv &&
            e !== yi &&
            e !== mh &&
            e !== gh &&
            e !== wh &&
            e !== yh &&
            e !== Eh &&
            e !== Io &&
            e !== ov &&
            e !== lv &&
            e !== nv &&
            e !== mv &&
            e !== cv &&
            e !== fv &&
            e !== av &&
            e !== iv &&
            e !== sv &&
            e !== dv &&
            e !== pv
        );
    }
    function Cv(e) {
        return !Ei(e) && e !== yi;
    }
    function on(e, t) {
        var r = e.charCodeAt(t),
            n;
        return r >= 55296 && r <= 56319 && t + 1 < e.length && ((n = e.charCodeAt(t + 1)), n >= 56320 && n <= 57343)
            ? (r - 55296) * 1024 + n - 56320 + 65536
            : r;
    }
    function _h(e) {
        var t = /^\n* /;
        return t.test(e);
    }
    var vh = 1,
        Ro = 2,
        Sh = 3,
        Ah = 4,
        wr = 5;
    function bv(e, t, r, n, i, s, o, a) {
        var l,
            h = 0,
            c = null,
            f = !1,
            m = !1,
            p = n !== -1,
            _ = -1,
            v = Av(on(e, 0)) && Cv(on(e, e.length - 1));
        if (t || o)
            for (l = 0; l < e.length; h >= 65536 ? (l += 2) : l++) {
                if (((h = on(e, l)), !un(h))) return wr;
                (v = v && ah(h, c, a)), (c = h);
            }
        else {
            for (l = 0; l < e.length; h >= 65536 ? (l += 2) : l++) {
                if (((h = on(e, l)), h === an)) (f = !0), p && ((m = m || (l - _ - 1 > n && e[_ + 1] !== " ")), (_ = l));
                else if (!un(h)) return wr;
                (v = v && ah(h, c, a)), (c = h);
            }
            m = m || (p && l - _ - 1 > n && e[_ + 1] !== " ");
        }
        return !f && !m
            ? v && !o && !i(e)
                ? vh
                : s === ln
                ? wr
                : Ro
            : r > 9 && _h(e)
            ? wr
            : o
            ? s === ln
                ? wr
                : Ro
            : m
            ? Ah
            : Sh;
    }
    function Tv(e, t, r, n, i) {
        e.dump = (function () {
            if (t.length === 0) return e.quotingType === ln ? '""' : "''";
            if (!e.noCompatMode && (gv.indexOf(t) !== -1 || wv.test(t)))
                return e.quotingType === ln ? '"' + t + '"' : "'" + t + "'";
            var s = e.indent * Math.max(1, r),
                o = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - s),
                a = n || (e.flowLevel > -1 && r >= e.flowLevel);
            function l(h) {
                return Sv(e, h);
            }
            switch (bv(t, a, e.indent, o, l, e.quotingType, e.forceQuotes && !n, i)) {
                case vh:
                    return t;
                case Ro:
                    return "'" + t.replace(/'/g, "''") + "'";
                case Sh:
                    return "|" + lh(t, e.indent) + uh(sh(t, s));
                case Ah:
                    return ">" + lh(t, e.indent) + uh(sh(Ov(t, o), s));
                case wr:
                    return '"' + xv(t, o) + '"';
                default:
                    throw new cn("impossible error: invalid scalar style");
            }
        })();
    }
    function lh(e, t) {
        var r = _h(e) ? String(t) : "",
            n = e[e.length - 1] === "\n",
            i = n && (e[e.length - 2] === "\n" || e === "\n"),
            s = i ? "+" : n ? "" : "-";
        return r + s + "\n";
    }
    function uh(e) {
        return e[e.length - 1] === "\n" ? e.slice(0, -1) : e;
    }
    function Ov(e, t) {
        for (
            var r = /(\n+)([^\n]*)/g,
                n = (function () {
                    var h = e.indexOf("\n");
                    return (h = h !== -1 ? h : e.length), (r.lastIndex = h), ch(e.slice(0, h), t);
                })(),
                i = e[0] === "\n" || e[0] === " ",
                s,
                o;
            (o = r.exec(e));

        ) {
            var a = o[1],
                l = o[2];
            (s = l[0] === " "), (n += a + (!i && !s && l !== "" ? "\n" : "") + ch(l, t)), (i = s);
        }
        return n;
    }
    function ch(e, t) {
        if (e === "" || e[0] === " ") return e;
        for (var r = / [^ ]/g, n, i = 0, s, o = 0, a = 0, l = ""; (n = r.exec(e)); )
            (a = n.index), a - i > t && ((s = o > i ? o : a), (l += "\n" + e.slice(i, s)), (i = s + 1)), (o = a);
        return (
            (l += "\n"), e.length - i > t && o > i ? (l += e.slice(i, o) + "\n" + e.slice(o + 1)) : (l += e.slice(i)), l.slice(1)
        );
    }
    function xv(e) {
        for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? (i += 2) : i++)
            (r = on(e, i)), (n = ye[r]), !n && un(r) ? ((t += e[i]), r >= 65536 && (t += e[i + 1])) : (t += n || Ev(r));
        return t;
    }
    function Iv(e, t, r) {
        var n = "",
            i = e.tag,
            s,
            o,
            a;
        for (s = 0, o = r.length; s < o; s += 1)
            (a = r[s]),
                e.replacer && (a = e.replacer.call(r, String(s), a)),
                (nt(e, t, a, !1, !1) || (typeof a > "u" && nt(e, t, null, !1, !1))) &&
                    (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), (n += e.dump));
        (e.tag = i), (e.dump = "[" + n + "]");
    }
    function fh(e, t, r, n) {
        var i = "",
            s = e.tag,
            o,
            a,
            l;
        for (o = 0, a = r.length; o < a; o += 1)
            (l = r[o]),
                e.replacer && (l = e.replacer.call(r, String(o), l)),
                (nt(e, t + 1, l, !0, !0, !1, !0) || (typeof l > "u" && nt(e, t + 1, null, !0, !0, !1, !0))) &&
                    ((!n || i !== "") && (i += No(e, t)),
                    e.dump && an === e.dump.charCodeAt(0) ? (i += "-") : (i += "- "),
                    (i += e.dump));
        (e.tag = s), (e.dump = i || "[]");
    }
    function Nv(e, t, r) {
        var n = "",
            i = e.tag,
            s = Object.keys(r),
            o,
            a,
            l,
            h,
            c;
        for (o = 0, a = s.length; o < a; o += 1)
            (c = ""),
                n !== "" && (c += ", "),
                e.condenseFlow && (c += '"'),
                (l = s[o]),
                (h = r[l]),
                e.replacer && (h = e.replacer.call(r, l, h)),
                nt(e, t, l, !1, !1) &&
                    (e.dump.length > 1024 && (c += "? "),
                    (c += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " ")),
                    nt(e, t, h, !1, !1) && ((c += e.dump), (n += c)));
        (e.tag = i), (e.dump = "{" + n + "}");
    }
    function Rv(e, t, r, n) {
        var i = "",
            s = e.tag,
            o = Object.keys(r),
            a,
            l,
            h,
            c,
            f,
            m;
        if (e.sortKeys === !0) o.sort();
        else if (typeof e.sortKeys == "function") o.sort(e.sortKeys);
        else if (e.sortKeys) throw new cn("sortKeys must be a boolean or a function");
        for (a = 0, l = o.length; a < l; a += 1)
            (m = ""),
                (!n || i !== "") && (m += No(e, t)),
                (h = o[a]),
                (c = r[h]),
                e.replacer && (c = e.replacer.call(r, h, c)),
                nt(e, t + 1, h, !0, !0, !0) &&
                    ((f = (e.tag !== null && e.tag !== "?") || (e.dump && e.dump.length > 1024)),
                    f && (e.dump && an === e.dump.charCodeAt(0) ? (m += "?") : (m += "? ")),
                    (m += e.dump),
                    f && (m += No(e, t)),
                    nt(e, t + 1, c, !0, f) &&
                        (e.dump && an === e.dump.charCodeAt(0) ? (m += ":") : (m += ": "), (m += e.dump), (i += m)));
        (e.tag = s), (e.dump = i || "{}");
    }
    function hh(e, t, r) {
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
                    if (((l = e.styleMap[a.tag] || a.defaultStyle), dh.call(a.represent) === "[object Function]"))
                        n = a.represent(t, l);
                    else if (ph.call(a.represent, l)) n = a.represent[l](t, l);
                    else throw new cn("!<" + a.tag + '> tag resolver accepts not "' + l + '" style');
                    e.dump = n;
                }
                return !0;
            }
        return !1;
    }
    function nt(e, t, r, n, i, s, o) {
        (e.tag = null), (e.dump = r), hh(e, r, !1) || hh(e, r, !0);
        var a = dh.call(e.dump),
            l = n,
            h;
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
                    ? (Rv(e, t, e.dump, i), m && (e.dump = "&ref_" + f + e.dump))
                    : (Nv(e, t, e.dump), m && (e.dump = "&ref_" + f + " " + e.dump));
            else if (a === "[object Array]")
                n && e.dump.length !== 0
                    ? (e.noArrayIndent && !o && t > 0 ? fh(e, t - 1, e.dump, i) : fh(e, t, e.dump, i),
                      m && (e.dump = "&ref_" + f + e.dump))
                    : (Iv(e, t, e.dump), m && (e.dump = "&ref_" + f + " " + e.dump));
            else if (a === "[object String]") e.tag !== "?" && Tv(e, e.dump, t, s, l);
            else {
                if (a === "[object Undefined]") return !1;
                if (e.skipInvalid) return !1;
                throw new cn("unacceptable kind of an object to dump " + a);
            }
            e.tag !== null &&
                e.tag !== "?" &&
                ((h = encodeURI(e.tag[0] === "!" ? e.tag.slice(1) : e.tag).replace(/!/g, "%21")),
                e.tag[0] === "!"
                    ? (h = "!" + h)
                    : h.slice(0, 18) === "tag:yaml.org,2002:"
                    ? (h = "!!" + h.slice(18))
                    : (h = "!<" + h + ">"),
                (e.dump = h + " " + e.dump));
        }
        return !0;
    }
    function Pv(e, t) {
        var r = [],
            n = [],
            i,
            s;
        for (Po(e, r, n), i = 0, s = n.length; i < s; i += 1) t.duplicates.push(r[n[i]]);
        t.usedDuplicates = new Array(s);
    }
    function Po(e, t, r) {
        var n, i, s;
        if (e !== null && typeof e == "object")
            if (((i = t.indexOf(e)), i !== -1)) r.indexOf(i) === -1 && r.push(i);
            else if ((t.push(e), Array.isArray(e))) for (i = 0, s = e.length; i < s; i += 1) Po(e[i], t, r);
            else for (n = Object.keys(e), i = 0, s = n.length; i < s; i += 1) Po(e[n[i]], t, r);
    }
    function Dv(e, t) {
        t = t || {};
        var r = new vv(t);
        r.noRefs || Pv(e, r);
        var n = e;
        return r.replacer && (n = r.replacer.call({ "": n }, "", n)), nt(r, 0, n, !0, !0) ? r.dump + "\n" : "";
    }
    Ch.exports.dump = Dv;
});
var vi = w((hN, Ce) => {
    "use strict";
    var Th = ih(),
        Fv = bh();
    function Fo(e, t) {
        return function () {
            throw new Error(
                "Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default."
            );
        };
    }
    Ce.exports.Type = we();
    Ce.exports.Schema = oo();
    Ce.exports.FAILSAFE_SCHEMA = co();
    Ce.exports.JSON_SCHEMA = go();
    Ce.exports.CORE_SCHEMA = wo();
    Ce.exports.DEFAULT_SCHEMA = di();
    Ce.exports.load = Th.load;
    Ce.exports.loadAll = Th.loadAll;
    Ce.exports.dump = Fv.dump;
    Ce.exports.YAMLException = dr();
    Ce.exports.types = {
        binary: vo(),
        float: mo(),
        map: uo(),
        null: fo(),
        pairs: Ao(),
        set: Co(),
        timestamp: yo(),
        bool: ho(),
        int: po(),
        merge: Eo(),
        omap: So(),
        seq: lo(),
        str: ao()
    };
    Ce.exports.safeLoad = Fo("safeLoad", "load");
    Ce.exports.safeLoadAll = Fo("safeLoadAll", "loadAll");
    Ce.exports.safeDump = Fo("safeDump", "dump");
});
var Oh = w(Si => {
    "use strict";
    Object.defineProperty(Si, "__esModule", { value: !0 });
    Si.Lazy = void 0;
    var qo = class {
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
    Si.Lazy = qo;
});
var fn = w((pN, xh) => {
    var qv = "2.0.0",
        Lv = Number.MAX_SAFE_INTEGER || 9007199254740991,
        $v = 16,
        kv = 250,
        Uv = ["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"];
    xh.exports = {
        MAX_LENGTH: 256,
        MAX_SAFE_COMPONENT_LENGTH: $v,
        MAX_SAFE_BUILD_LENGTH: kv,
        MAX_SAFE_INTEGER: Lv,
        RELEASE_TYPES: Uv,
        SEMVER_SPEC_VERSION: qv,
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2
    };
});
var hn = w((mN, Ih) => {
    var Mv =
        typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)
            ? (...e) => console.error("SEMVER", ...e)
            : () => {};
    Ih.exports = Mv;
});
var yr = w((Je, Nh) => {
    var { MAX_SAFE_COMPONENT_LENGTH: Lo, MAX_SAFE_BUILD_LENGTH: Bv, MAX_LENGTH: jv } = fn(),
        Hv = hn();
    Je = Nh.exports = {};
    var Wv = (Je.re = []),
        Gv = (Je.safeRe = []),
        O = (Je.src = []),
        Vv = (Je.safeSrc = []),
        x = (Je.t = {}),
        Yv = 0,
        $o = "[a-zA-Z0-9-]",
        zv = [
            ["\\s", 1],
            ["\\d", jv],
            [$o, Bv]
        ],
        Xv = e => {
            for (let [t, r] of zv)
                e = e
                    .split("".concat(t, "*"))
                    .join("".concat(t, "{0,").concat(r, "}"))
                    .split("".concat(t, "+"))
                    .join("".concat(t, "{1,").concat(r, "}"));
            return e;
        },
        q = (e, t, r) => {
            let n = Xv(t),
                i = Yv++;
            Hv(e, i, t),
                (x[e] = i),
                (O[i] = t),
                (Vv[i] = n),
                (Wv[i] = new RegExp(t, r ? "g" : void 0)),
                (Gv[i] = new RegExp(n, r ? "g" : void 0));
        };
    q("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    q("NUMERICIDENTIFIERLOOSE", "\\d+");
    q("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-]".concat($o, "*"));
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
    q("BUILDIDENTIFIER", "".concat($o, "+"));
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
        "(^|[^\\d])(\\d{1,".concat(Lo, "})") + "(?:\\.(\\d{1,".concat(Lo, "}))?") + "(?:\\.(\\d{1,".concat(Lo, "}))?")
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
var Ai = w((gN, Rh) => {
    var Kv = Object.freeze({ loose: !0 }),
        Jv = Object.freeze({}),
        Qv = e => (e ? (typeof e != "object" ? Kv : e) : Jv);
    Rh.exports = Qv;
});
var ko = w((wN, Fh) => {
    var Ph = /^[0-9]+$/,
        Dh = (e, t) => {
            let r = Ph.test(e),
                n = Ph.test(t);
            return r && n && ((e = +e), (t = +t)), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
        },
        Zv = (e, t) => Dh(t, e);
    Fh.exports = { compareIdentifiers: Dh, rcompareIdentifiers: Zv };
});
var Ee = w((yN, kh) => {
    var Ci = hn(),
        { MAX_LENGTH: qh, MAX_SAFE_INTEGER: bi } = fn(),
        { safeRe: Lh, safeSrc: $h, t: Ti } = yr(),
        eS = Ai(),
        { compareIdentifiers: Er } = ko(),
        Uo = class e {
            constructor(t, r) {
                if (((r = eS(r)), t instanceof e)) {
                    if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease) return t;
                    t = t.version;
                } else if (typeof t != "string")
                    throw new TypeError('Invalid version. Must be a string. Got type "'.concat(typeof t, '".'));
                if (t.length > qh) throw new TypeError("version is longer than ".concat(qh, " characters"));
                Ci("SemVer", t, r),
                    (this.options = r),
                    (this.loose = !!r.loose),
                    (this.includePrerelease = !!r.includePrerelease);
                let n = t.trim().match(r.loose ? Lh[Ti.LOOSE] : Lh[Ti.FULL]);
                if (!n) throw new TypeError("Invalid Version: ".concat(t));
                if (
                    ((this.raw = t),
                    (this.major = +n[1]),
                    (this.minor = +n[2]),
                    (this.patch = +n[3]),
                    this.major > bi || this.major < 0)
                )
                    throw new TypeError("Invalid major version");
                if (this.minor > bi || this.minor < 0) throw new TypeError("Invalid minor version");
                if (this.patch > bi || this.patch < 0) throw new TypeError("Invalid patch version");
                n[4]
                    ? (this.prerelease = n[4].split(".").map(i => {
                          if (/^[0-9]+$/.test(i)) {
                              let s = +i;
                              if (s >= 0 && s < bi) return s;
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
                if ((Ci("SemVer.compare", this.version, this.options, t), !(t instanceof e))) {
                    if (typeof t == "string" && t === this.version) return 0;
                    t = new e(t, this.options);
                }
                return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
            }
            compareMain(t) {
                return (
                    t instanceof e || (t = new e(t, this.options)),
                    Er(this.major, t.major) || Er(this.minor, t.minor) || Er(this.patch, t.patch)
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
                    if ((Ci("prerelease compare", r, n, i), n === void 0 && i === void 0)) return 0;
                    if (i === void 0) return 1;
                    if (n === void 0) return -1;
                    if (n === i) continue;
                    return Er(n, i);
                } while (++r);
            }
            compareBuild(t) {
                t instanceof e || (t = new e(t, this.options));
                let r = 0;
                do {
                    let n = this.build[r],
                        i = t.build[r];
                    if ((Ci("build compare", r, n, i), n === void 0 && i === void 0)) return 0;
                    if (i === void 0) return 1;
                    if (n === void 0) return -1;
                    if (n === i) continue;
                    return Er(n, i);
                } while (++r);
            }
            inc(t, r, n) {
                if (t.startsWith("pre")) {
                    if (!r && n === !1) throw new Error("invalid increment argument: identifier is empty");
                    if (r) {
                        let i = new RegExp("^".concat(this.options.loose ? $h[Ti.PRERELEASELOOSE] : $h[Ti.PRERELEASE], "$")),
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
                                Er(this.prerelease[0], r) === 0
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
    kh.exports = Uo;
});
var kt = w((EN, Mh) => {
    var Uh = Ee(),
        tS = (e, t, r = !1) => {
            if (e instanceof Uh) return e;
            try {
                return new Uh(e, t);
            } catch (n) {
                if (!r) return null;
                throw n;
            }
        };
    Mh.exports = tS;
});
var jh = w((_N, Bh) => {
    var rS = kt(),
        nS = (e, t) => {
            let r = rS(e, t);
            return r ? r.version : null;
        };
    Bh.exports = nS;
});
var Wh = w((vN, Hh) => {
    var iS = kt(),
        sS = (e, t) => {
            let r = iS(e.trim().replace(/^[=v]+/, ""), t);
            return r ? r.version : null;
        };
    Hh.exports = sS;
});
var Yh = w((SN, Vh) => {
    var Gh = Ee(),
        oS = (e, t, r, n, i) => {
            typeof r == "string" && ((i = n), (n = r), (r = void 0));
            try {
                return new Gh(e instanceof Gh ? e.version : e, r).inc(t, n, i).version;
            } catch {
                return null;
            }
        };
    Vh.exports = oS;
});
var Kh = w((AN, Xh) => {
    var zh = kt(),
        aS = (e, t) => {
            let r = zh(e, null, !0),
                n = zh(t, null, !0),
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
    Xh.exports = aS;
});
var Qh = w((CN, Jh) => {
    var lS = Ee(),
        uS = (e, t) => new lS(e, t).major;
    Jh.exports = uS;
});
var ed = w((bN, Zh) => {
    var cS = Ee(),
        fS = (e, t) => new cS(e, t).minor;
    Zh.exports = fS;
});
var rd = w((TN, td) => {
    var hS = Ee(),
        dS = (e, t) => new hS(e, t).patch;
    td.exports = dS;
});
var id = w((ON, nd) => {
    var pS = kt(),
        mS = (e, t) => {
            let r = pS(e, t);
            return r && r.prerelease.length ? r.prerelease : null;
        };
    nd.exports = mS;
});
var Be = w((xN, od) => {
    var sd = Ee(),
        gS = (e, t, r) => new sd(e, r).compare(new sd(t, r));
    od.exports = gS;
});
var ld = w((IN, ad) => {
    var wS = Be(),
        yS = (e, t, r) => wS(t, e, r);
    ad.exports = yS;
});
var cd = w((NN, ud) => {
    var ES = Be(),
        _S = (e, t) => ES(e, t, !0);
    ud.exports = _S;
});
var Oi = w((RN, hd) => {
    var fd = Ee(),
        vS = (e, t, r) => {
            let n = new fd(e, r),
                i = new fd(t, r);
            return n.compare(i) || n.compareBuild(i);
        };
    hd.exports = vS;
});
var pd = w((PN, dd) => {
    var SS = Oi(),
        AS = (e, t) => e.sort((r, n) => SS(r, n, t));
    dd.exports = AS;
});
var gd = w((DN, md) => {
    var CS = Oi(),
        bS = (e, t) => e.sort((r, n) => CS(n, r, t));
    md.exports = bS;
});
var dn = w((FN, wd) => {
    var TS = Be(),
        OS = (e, t, r) => TS(e, t, r) > 0;
    wd.exports = OS;
});
var xi = w((qN, yd) => {
    var xS = Be(),
        IS = (e, t, r) => xS(e, t, r) < 0;
    yd.exports = IS;
});
var Mo = w((LN, Ed) => {
    var NS = Be(),
        RS = (e, t, r) => NS(e, t, r) === 0;
    Ed.exports = RS;
});
var Bo = w(($N, _d) => {
    var PS = Be(),
        DS = (e, t, r) => PS(e, t, r) !== 0;
    _d.exports = DS;
});
var Ii = w((kN, vd) => {
    var FS = Be(),
        qS = (e, t, r) => FS(e, t, r) >= 0;
    vd.exports = qS;
});
var Ni = w((UN, Sd) => {
    var LS = Be(),
        $S = (e, t, r) => LS(e, t, r) <= 0;
    Sd.exports = $S;
});
var jo = w((MN, Ad) => {
    var kS = Mo(),
        US = Bo(),
        MS = dn(),
        BS = Ii(),
        jS = xi(),
        HS = Ni(),
        WS = (e, t, r, n) => {
            switch (t) {
                case "===":
                    return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
                case "!==":
                    return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
                case "":
                case "=":
                case "==":
                    return kS(e, r, n);
                case "!=":
                    return US(e, r, n);
                case ">":
                    return MS(e, r, n);
                case ">=":
                    return BS(e, r, n);
                case "<":
                    return jS(e, r, n);
                case "<=":
                    return HS(e, r, n);
                default:
                    throw new TypeError("Invalid operator: ".concat(t));
            }
        };
    Ad.exports = WS;
});
var bd = w((BN, Cd) => {
    var GS = Ee(),
        VS = kt(),
        { safeRe: Ri, t: Pi } = yr(),
        YS = (e, t) => {
            if (e instanceof GS) return e;
            if ((typeof e == "number" && (e = String(e)), typeof e != "string")) return null;
            t = t || {};
            let r = null;
            if (!t.rtl) r = e.match(t.includePrerelease ? Ri[Pi.COERCEFULL] : Ri[Pi.COERCE]);
            else {
                let l = t.includePrerelease ? Ri[Pi.COERCERTLFULL] : Ri[Pi.COERCERTL],
                    h;
                for (; (h = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
                    (!r || h.index + h[0].length !== r.index + r[0].length) && (r = h),
                        (l.lastIndex = h.index + h[1].length + h[2].length);
                l.lastIndex = -1;
            }
            if (r === null) return null;
            let n = r[2],
                i = r[3] || "0",
                s = r[4] || "0",
                o = t.includePrerelease && r[5] ? "-".concat(r[5]) : "",
                a = t.includePrerelease && r[6] ? "+".concat(r[6]) : "";
            return VS("".concat(n, ".").concat(i, ".").concat(s).concat(o).concat(a), t);
        };
    Cd.exports = YS;
});
var Od = w((jN, Td) => {
    var Ho = class {
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
    Td.exports = Ho;
});
var je = w((HN, Rd) => {
    var zS = /\s+/g,
        Wo = class e {
            constructor(t, r) {
                if (((r = KS(r)), t instanceof e))
                    return t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease ? t : new e(t.raw, r);
                if (t instanceof Go) return (this.raw = t.value), (this.set = [[t]]), (this.formatted = void 0), this;
                if (
                    ((this.options = r),
                    (this.loose = !!r.loose),
                    (this.includePrerelease = !!r.includePrerelease),
                    (this.raw = t.trim().replace(zS, " ")),
                    (this.set = this.raw
                        .split("||")
                        .map(n => this.parseRange(n.trim()))
                        .filter(n => n.length)),
                    !this.set.length)
                )
                    throw new TypeError("Invalid SemVer Range: ".concat(this.raw));
                if (this.set.length > 1) {
                    let n = this.set[0];
                    if (((this.set = this.set.filter(i => !Id(i[0]))), this.set.length === 0)) this.set = [n];
                    else if (this.set.length > 1) {
                        for (let i of this.set)
                            if (i.length === 1 && nA(i[0])) {
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
                let n = ((this.options.includePrerelease && tA) | (this.options.loose && rA)) + ":" + t,
                    i = xd.get(n);
                if (i) return i;
                let s = this.options.loose,
                    o = s ? Le[be.HYPHENRANGELOOSE] : Le[be.HYPHENRANGE];
                (t = t.replace(o, dA(this.options.includePrerelease))),
                    K("hyphen replace", t),
                    (t = t.replace(Le[be.COMPARATORTRIM], QS)),
                    K("comparator trim", t),
                    (t = t.replace(Le[be.TILDETRIM], ZS)),
                    K("tilde trim", t),
                    (t = t.replace(Le[be.CARETTRIM], eA)),
                    K("caret trim", t);
                let a = t
                    .split(" ")
                    .map(f => iA(f, this.options))
                    .join(" ")
                    .split(/\s+/)
                    .map(f => hA(f, this.options));
                s && (a = a.filter(f => (K("loose invalid filter", f, this.options), !!f.match(Le[be.COMPARATORLOOSE])))),
                    K("range list", a);
                let l = new Map(),
                    h = a.map(f => new Go(f, this.options));
                for (let f of h) {
                    if (Id(f)) return [f];
                    l.set(f.value, f);
                }
                l.size > 1 && l.has("") && l.delete("");
                let c = [...l.values()];
                return xd.set(n, c), c;
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
                        t = new JS(t, this.options);
                    } catch {
                        return !1;
                    }
                for (let r = 0; r < this.set.length; r++) if (pA(this.set[r], t, this.options)) return !0;
                return !1;
            }
        };
    Rd.exports = Wo;
    var XS = Od(),
        xd = new XS(),
        KS = Ai(),
        Go = pn(),
        K = hn(),
        JS = Ee(),
        { safeRe: Le, t: be, comparatorTrimReplace: QS, tildeTrimReplace: ZS, caretTrimReplace: eA } = yr(),
        { FLAG_INCLUDE_PRERELEASE: tA, FLAG_LOOSE: rA } = fn(),
        Id = e => e.value === "<0.0.0-0",
        nA = e => e.value === "",
        Nd = (e, t) => {
            let r = !0,
                n = e.slice(),
                i = n.pop();
            for (; r && n.length; ) (r = n.every(s => i.intersects(s, t))), (i = n.pop());
            return r;
        },
        iA = (e, t) => (
            K("comp", e, t),
            (e = aA(e, t)),
            K("caret", e),
            (e = sA(e, t)),
            K("tildes", e),
            (e = uA(e, t)),
            K("xrange", e),
            (e = fA(e, t)),
            K("stars", e),
            e
        ),
        Te = e => !e || e.toLowerCase() === "x" || e === "*",
        sA = (e, t) =>
            e
                .trim()
                .split(/\s+/)
                .map(r => oA(r, t))
                .join(" "),
        oA = (e, t) => {
            let r = t.loose ? Le[be.TILDELOOSE] : Le[be.TILDE];
            return e.replace(r, (n, i, s, o, a) => {
                K("tilde", e, n, i, s, o, a);
                let l;
                return (
                    Te(i)
                        ? (l = "")
                        : Te(s)
                        ? (l = ">=".concat(i, ".0.0 <").concat(+i + 1, ".0.0-0"))
                        : Te(o)
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
        aA = (e, t) =>
            e
                .trim()
                .split(/\s+/)
                .map(r => lA(r, t))
                .join(" "),
        lA = (e, t) => {
            K("caret", e, t);
            let r = t.loose ? Le[be.CARETLOOSE] : Le[be.CARET],
                n = t.includePrerelease ? "-0" : "";
            return e.replace(r, (i, s, o, a, l) => {
                K("caret", e, i, s, o, a, l);
                let h;
                return (
                    Te(s)
                        ? (h = "")
                        : Te(o)
                        ? (h = ">="
                              .concat(s, ".0.0")
                              .concat(n, " <")
                              .concat(+s + 1, ".0.0-0"))
                        : Te(a)
                        ? s === "0"
                            ? (h = ">="
                                  .concat(s, ".")
                                  .concat(o, ".0")
                                  .concat(n, " <")
                                  .concat(s, ".")
                                  .concat(+o + 1, ".0-0"))
                            : (h = ">="
                                  .concat(s, ".")
                                  .concat(o, ".0")
                                  .concat(n, " <")
                                  .concat(+s + 1, ".0.0-0"))
                        : l
                        ? (K("replaceCaret pr", l),
                          s === "0"
                              ? o === "0"
                                  ? (h = ">="
                                        .concat(s, ".")
                                        .concat(o, ".")
                                        .concat(a, "-")
                                        .concat(l, " <")
                                        .concat(s, ".")
                                        .concat(o, ".")
                                        .concat(+a + 1, "-0"))
                                  : (h = ">="
                                        .concat(s, ".")
                                        .concat(o, ".")
                                        .concat(a, "-")
                                        .concat(l, " <")
                                        .concat(s, ".")
                                        .concat(+o + 1, ".0-0"))
                              : (h = ">="
                                    .concat(s, ".")
                                    .concat(o, ".")
                                    .concat(a, "-")
                                    .concat(l, " <")
                                    .concat(+s + 1, ".0.0-0")))
                        : (K("no pr"),
                          s === "0"
                              ? o === "0"
                                  ? (h = ">="
                                        .concat(s, ".")
                                        .concat(o, ".")
                                        .concat(a)
                                        .concat(n, " <")
                                        .concat(s, ".")
                                        .concat(o, ".")
                                        .concat(+a + 1, "-0"))
                                  : (h = ">="
                                        .concat(s, ".")
                                        .concat(o, ".")
                                        .concat(a)
                                        .concat(n, " <")
                                        .concat(s, ".")
                                        .concat(+o + 1, ".0-0"))
                              : (h = ">="
                                    .concat(s, ".")
                                    .concat(o, ".")
                                    .concat(a, " <")
                                    .concat(+s + 1, ".0.0-0"))),
                    K("caret return", h),
                    h
                );
            });
        },
        uA = (e, t) => (
            K("replaceXRanges", e, t),
            e
                .split(/\s+/)
                .map(r => cA(r, t))
                .join(" ")
        ),
        cA = (e, t) => {
            e = e.trim();
            let r = t.loose ? Le[be.XRANGELOOSE] : Le[be.XRANGE];
            return e.replace(r, (n, i, s, o, a, l) => {
                K("xRange", e, n, i, s, o, a, l);
                let h = Te(s),
                    c = h || Te(o),
                    f = c || Te(a),
                    m = f;
                return (
                    i === "=" && m && (i = ""),
                    (l = t.includePrerelease ? "-0" : ""),
                    h
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
        fA = (e, t) => (K("replaceStars", e, t), e.trim().replace(Le[be.STAR], "")),
        hA = (e, t) => (K("replaceGTE0", e, t), e.trim().replace(Le[t.includePrerelease ? be.GTE0PRE : be.GTE0], "")),
        dA = e => (t, r, n, i, s, o, a, l, h, c, f, m) => (
            Te(n)
                ? (r = "")
                : Te(i)
                ? (r = ">=".concat(n, ".0.0").concat(e ? "-0" : ""))
                : Te(s)
                ? (r = ">="
                      .concat(n, ".")
                      .concat(i, ".0")
                      .concat(e ? "-0" : ""))
                : o
                ? (r = ">=".concat(r))
                : (r = ">=".concat(r).concat(e ? "-0" : "")),
            Te(h)
                ? (l = "")
                : Te(c)
                ? (l = "<".concat(+h + 1, ".0.0-0"))
                : Te(f)
                ? (l = "<".concat(h, ".").concat(+c + 1, ".0-0"))
                : m
                ? (l = "<=".concat(h, ".").concat(c, ".").concat(f, "-").concat(m))
                : e
                ? (l = "<"
                      .concat(h, ".")
                      .concat(c, ".")
                      .concat(+f + 1, "-0"))
                : (l = "<=".concat(l)),
            "".concat(r, " ").concat(l).trim()
        ),
        pA = (e, t, r) => {
            for (let n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
            if (t.prerelease.length && !r.includePrerelease) {
                for (let n = 0; n < e.length; n++)
                    if ((K(e[n].semver), e[n].semver !== Go.ANY && e[n].semver.prerelease.length > 0)) {
                        let i = e[n].semver;
                        if (i.major === t.major && i.minor === t.minor && i.patch === t.patch) return !0;
                    }
                return !1;
            }
            return !0;
        };
});
var pn = w((WN, $d) => {
    var mn = Symbol("SemVer ANY"),
        zo = class e {
            static get ANY() {
                return mn;
            }
            constructor(t, r) {
                if (((r = Pd(r)), t instanceof e)) {
                    if (t.loose === !!r.loose) return t;
                    t = t.value;
                }
                (t = t.trim().split(/\s+/).join(" ")),
                    Yo("comparator", t, r),
                    (this.options = r),
                    (this.loose = !!r.loose),
                    this.parse(t),
                    this.semver === mn ? (this.value = "") : (this.value = this.operator + this.semver.version),
                    Yo("comp", this);
            }
            parse(t) {
                let r = this.options.loose ? Dd[Fd.COMPARATORLOOSE] : Dd[Fd.COMPARATOR],
                    n = t.match(r);
                if (!n) throw new TypeError("Invalid comparator: ".concat(t));
                (this.operator = n[1] !== void 0 ? n[1] : ""),
                    this.operator === "=" && (this.operator = ""),
                    n[2] ? (this.semver = new qd(n[2], this.options.loose)) : (this.semver = mn);
            }
            toString() {
                return this.value;
            }
            test(t) {
                if ((Yo("Comparator.test", t, this.options.loose), this.semver === mn || t === mn)) return !0;
                if (typeof t == "string")
                    try {
                        t = new qd(t, this.options);
                    } catch {
                        return !1;
                    }
                return Vo(t, this.operator, this.semver, this.options);
            }
            intersects(t, r) {
                if (!(t instanceof e)) throw new TypeError("a Comparator is required");
                return this.operator === ""
                    ? this.value === ""
                        ? !0
                        : new Ld(t.value, r).test(this.value)
                    : t.operator === ""
                    ? t.value === ""
                        ? !0
                        : new Ld(this.value, r).test(t.semver)
                    : ((r = Pd(r)),
                      (r.includePrerelease && (this.value === "<0.0.0-0" || t.value === "<0.0.0-0")) ||
                      (!r.includePrerelease && (this.value.startsWith("<0.0.0") || t.value.startsWith("<0.0.0")))
                          ? !1
                          : !!(
                                (this.operator.startsWith(">") && t.operator.startsWith(">")) ||
                                (this.operator.startsWith("<") && t.operator.startsWith("<")) ||
                                (this.semver.version === t.semver.version &&
                                    this.operator.includes("=") &&
                                    t.operator.includes("=")) ||
                                (Vo(this.semver, "<", t.semver, r) &&
                                    this.operator.startsWith(">") &&
                                    t.operator.startsWith("<")) ||
                                (Vo(this.semver, ">", t.semver, r) && this.operator.startsWith("<") && t.operator.startsWith(">"))
                            ));
            }
        };
    $d.exports = zo;
    var Pd = Ai(),
        { safeRe: Dd, t: Fd } = yr(),
        Vo = jo(),
        Yo = hn(),
        qd = Ee(),
        Ld = je();
});
var gn = w((GN, kd) => {
    var mA = je(),
        gA = (e, t, r) => {
            try {
                t = new mA(t, r);
            } catch {
                return !1;
            }
            return t.test(e);
        };
    kd.exports = gA;
});
var Md = w((VN, Ud) => {
    var wA = je(),
        yA = (e, t) =>
            new wA(e, t).set.map(r =>
                r
                    .map(n => n.value)
                    .join(" ")
                    .trim()
                    .split(" ")
            );
    Ud.exports = yA;
});
var jd = w((YN, Bd) => {
    var EA = Ee(),
        _A = je(),
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
                    s.test(o) && (!n || i.compare(o) === -1) && ((n = o), (i = new EA(n, r)));
                }),
                n
            );
        };
    Bd.exports = vA;
});
var Wd = w((zN, Hd) => {
    var SA = Ee(),
        AA = je(),
        CA = (e, t, r) => {
            let n = null,
                i = null,
                s = null;
            try {
                s = new AA(t, r);
            } catch {
                return null;
            }
            return (
                e.forEach(o => {
                    s.test(o) && (!n || i.compare(o) === 1) && ((n = o), (i = new SA(n, r)));
                }),
                n
            );
        };
    Hd.exports = CA;
});
var Yd = w((XN, Vd) => {
    var Xo = Ee(),
        bA = je(),
        Gd = dn(),
        TA = (e, t) => {
            e = new bA(e, t);
            let r = new Xo("0.0.0");
            if (e.test(r) || ((r = new Xo("0.0.0-0")), e.test(r))) return r;
            r = null;
            for (let n = 0; n < e.set.length; ++n) {
                let i = e.set[n],
                    s = null;
                i.forEach(o => {
                    let a = new Xo(o.semver.version);
                    switch (o.operator) {
                        case ">":
                            a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), (a.raw = a.format());
                        case "":
                        case ">=":
                            (!s || Gd(a, s)) && (s = a);
                            break;
                        case "<":
                        case "<=":
                            break;
                        default:
                            throw new Error("Unexpected operation: ".concat(o.operator));
                    }
                }),
                    s && (!r || Gd(r, s)) && (r = s);
            }
            return r && e.test(r) ? r : null;
        };
    Vd.exports = TA;
});
var Xd = w((KN, zd) => {
    var OA = je(),
        xA = (e, t) => {
            try {
                return new OA(e, t).range || "*";
            } catch {
                return null;
            }
        };
    zd.exports = xA;
});
var Di = w((JN, Zd) => {
    var IA = Ee(),
        Qd = pn(),
        { ANY: NA } = Qd,
        RA = je(),
        PA = gn(),
        Kd = dn(),
        Jd = xi(),
        DA = Ni(),
        FA = Ii(),
        qA = (e, t, r, n) => {
            (e = new IA(e, n)), (t = new RA(t, n));
            let i, s, o, a, l;
            switch (r) {
                case ">":
                    (i = Kd), (s = DA), (o = Jd), (a = ">"), (l = ">=");
                    break;
                case "<":
                    (i = Jd), (s = FA), (o = Kd), (a = "<"), (l = "<=");
                    break;
                default:
                    throw new TypeError('Must provide a hilo val of "<" or ">"');
            }
            if (PA(e, t, n)) return !1;
            for (let h = 0; h < t.set.length; ++h) {
                let c = t.set[h],
                    f = null,
                    m = null;
                if (
                    (c.forEach(p => {
                        p.semver === NA && (p = new Qd(">=0.0.0")),
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
    Zd.exports = qA;
});
var tp = w((QN, ep) => {
    var LA = Di(),
        $A = (e, t, r) => LA(e, t, ">", r);
    ep.exports = $A;
});
var np = w((ZN, rp) => {
    var kA = Di(),
        UA = (e, t, r) => kA(e, t, "<", r);
    rp.exports = UA;
});
var op = w((eR, sp) => {
    var ip = je(),
        MA = (e, t, r) => ((e = new ip(e, r)), (t = new ip(t, r)), e.intersects(t, r));
    sp.exports = MA;
});
var lp = w((tR, ap) => {
    var BA = gn(),
        jA = Be();
    ap.exports = (e, t, r) => {
        let n = [],
            i = null,
            s = null,
            o = e.sort((c, f) => jA(c, f, r));
        for (let c of o) BA(c, t, r) ? ((s = c), i || (i = c)) : (s && n.push([i, s]), (s = null), (i = null));
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
            h = typeof t.raw == "string" ? t.raw : String(t);
        return l.length < h.length ? l : t;
    };
});
var pp = w((rR, dp) => {
    var up = je(),
        Jo = pn(),
        { ANY: Ko } = Jo,
        wn = gn(),
        Qo = Be(),
        HA = (e, t, r = {}) => {
            if (e === t) return !0;
            (e = new up(e, r)), (t = new up(t, r));
            let n = !1;
            e: for (let i of e.set) {
                for (let s of t.set) {
                    let o = GA(i, s, r);
                    if (((n = n || o !== null), o)) continue e;
                }
                if (n) return !1;
            }
            return !0;
        },
        WA = [new Jo(">=0.0.0-0")],
        cp = [new Jo(">=0.0.0")],
        GA = (e, t, r) => {
            if (e === t) return !0;
            if (e.length === 1 && e[0].semver === Ko) {
                if (t.length === 1 && t[0].semver === Ko) return !0;
                r.includePrerelease ? (e = WA) : (e = cp);
            }
            if (t.length === 1 && t[0].semver === Ko) {
                if (r.includePrerelease) return !0;
                t = cp;
            }
            let n = new Set(),
                i,
                s;
            for (let p of e)
                p.operator === ">" || p.operator === ">="
                    ? (i = fp(i, p, r))
                    : p.operator === "<" || p.operator === "<="
                    ? (s = hp(s, p, r))
                    : n.add(p.semver);
            if (n.size > 1) return null;
            let o;
            if (i && s) {
                if (((o = Qo(i.semver, s.semver, r)), o > 0)) return null;
                if (o === 0 && (i.operator !== ">=" || s.operator !== "<=")) return null;
            }
            for (let p of n) {
                if ((i && !wn(p, String(i), r)) || (s && !wn(p, String(s), r))) return null;
                for (let _ of t) if (!wn(p, String(_), r)) return !1;
                return !0;
            }
            let a,
                l,
                h,
                c,
                f = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1,
                m = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
            f && f.prerelease.length === 1 && s.operator === "<" && f.prerelease[0] === 0 && (f = !1);
            for (let p of t) {
                if (
                    ((c = c || p.operator === ">" || p.operator === ">="),
                    (h = h || p.operator === "<" || p.operator === "<="),
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
                        if (((a = fp(i, p, r)), a === p && a !== i)) return !1;
                    } else if (i.operator === ">=" && !wn(i.semver, String(p), r)) return !1;
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
                        if (((l = hp(s, p, r)), l === p && l !== s)) return !1;
                    } else if (s.operator === "<=" && !wn(s.semver, String(p), r)) return !1;
                }
                if (!p.operator && (s || i) && o !== 0) return !1;
            }
            return !((i && h && !s && o !== 0) || (s && c && !i && o !== 0) || m || f);
        },
        fp = (e, t, r) => {
            if (!e) return t;
            let n = Qo(e.semver, t.semver, r);
            return n > 0 ? e : n < 0 || (t.operator === ">" && e.operator === ">=") ? t : e;
        },
        hp = (e, t, r) => {
            if (!e) return t;
            let n = Qo(e.semver, t.semver, r);
            return n < 0 ? e : n > 0 || (t.operator === "<" && e.operator === "<=") ? t : e;
        };
    dp.exports = HA;
});
var ea = w((nR, wp) => {
    var Zo = yr(),
        mp = fn(),
        VA = Ee(),
        gp = ko(),
        YA = kt(),
        zA = jh(),
        XA = Wh(),
        KA = Yh(),
        JA = Kh(),
        QA = Qh(),
        ZA = ed(),
        eC = rd(),
        tC = id(),
        rC = Be(),
        nC = ld(),
        iC = cd(),
        sC = Oi(),
        oC = pd(),
        aC = gd(),
        lC = dn(),
        uC = xi(),
        cC = Mo(),
        fC = Bo(),
        hC = Ii(),
        dC = Ni(),
        pC = jo(),
        mC = bd(),
        gC = pn(),
        wC = je(),
        yC = gn(),
        EC = Md(),
        _C = jd(),
        vC = Wd(),
        SC = Yd(),
        AC = Xd(),
        CC = Di(),
        bC = tp(),
        TC = np(),
        OC = op(),
        xC = lp(),
        IC = pp();
    wp.exports = {
        parse: YA,
        valid: zA,
        clean: XA,
        inc: KA,
        diff: JA,
        major: QA,
        minor: ZA,
        patch: eC,
        prerelease: tC,
        compare: rC,
        rcompare: nC,
        compareLoose: iC,
        compareBuild: sC,
        sort: oC,
        rsort: aC,
        gt: lC,
        lt: uC,
        eq: cC,
        neq: fC,
        gte: hC,
        lte: dC,
        cmp: pC,
        coerce: mC,
        Comparator: gC,
        Range: wC,
        satisfies: yC,
        toComparators: EC,
        maxSatisfying: _C,
        minSatisfying: vC,
        minVersion: SC,
        validRange: AC,
        outside: CC,
        gtr: bC,
        ltr: TC,
        intersects: OC,
        simplifyRange: xC,
        subset: IC,
        SemVer: VA,
        re: Zo.re,
        src: Zo.src,
        tokens: Zo.t,
        SEMVER_SPEC_VERSION: mp.SEMVER_SPEC_VERSION,
        RELEASE_TYPES: mp.RELEASE_TYPES,
        compareIdentifiers: gp.compareIdentifiers,
        rcompareIdentifiers: gp.rcompareIdentifiers
    };
});
var Qp = w((yn, vr) => {
    var NC = 200,
        fa = "__lodash_hash_undefined__",
        Bi = 1,
        Ip = 2,
        Np = 9007199254740991,
        Fi = "[object Arguments]",
        ia = "[object Array]",
        RC = "[object AsyncFunction]",
        Rp = "[object Boolean]",
        Pp = "[object Date]",
        Dp = "[object Error]",
        Fp = "[object Function]",
        PC = "[object GeneratorFunction]",
        qi = "[object Map]",
        qp = "[object Number]",
        DC = "[object Null]",
        _r = "[object Object]",
        yp = "[object Promise]",
        FC = "[object Proxy]",
        Lp = "[object RegExp]",
        Li = "[object Set]",
        $p = "[object String]",
        qC = "[object Symbol]",
        LC = "[object Undefined]",
        sa = "[object WeakMap]",
        kp = "[object ArrayBuffer]",
        $i = "[object DataView]",
        $C = "[object Float32Array]",
        kC = "[object Float64Array]",
        UC = "[object Int8Array]",
        MC = "[object Int16Array]",
        BC = "[object Int32Array]",
        jC = "[object Uint8Array]",
        HC = "[object Uint8ClampedArray]",
        WC = "[object Uint16Array]",
        GC = "[object Uint32Array]",
        VC = /[\\^$.*+?()[\]{}|]/g,
        YC = /^\[object .+?Constructor\]$/,
        zC = /^(?:0|[1-9]\d*)$/,
        J = {};
    J[$C] = J[kC] = J[UC] = J[MC] = J[BC] = J[jC] = J[HC] = J[WC] = J[GC] = !0;
    J[Fi] = J[ia] = J[kp] = J[Rp] = J[$i] = J[Pp] = J[Dp] = J[Fp] = J[qi] = J[qp] = J[_r] = J[Lp] = J[Li] = J[$p] = J[sa] = !1;
    var Up = typeof global == "object" && global && global.Object === Object && global,
        XC = typeof self == "object" && self && self.Object === Object && self,
        it = Up || XC || Function("return this")(),
        Mp = typeof yn == "object" && yn && !yn.nodeType && yn,
        Ep = Mp && typeof vr == "object" && vr && !vr.nodeType && vr,
        Bp = Ep && Ep.exports === Mp,
        ta = Bp && Up.process,
        _p = (function () {
            try {
                return ta && ta.binding && ta.binding("util");
            } catch {}
        })(),
        vp = _p && _p.isTypedArray;
    function KC(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length, i = 0, s = []; ++r < n; ) {
            var o = e[r];
            t(o, r, e) && (s[i++] = o);
        }
        return s;
    }
    function JC(e, t) {
        for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
        return e;
    }
    function QC(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length; ++r < n; ) if (t(e[r], r, e)) return !0;
        return !1;
    }
    function ZC(e, t) {
        for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
        return n;
    }
    function eb(e) {
        return function (t) {
            return e(t);
        };
    }
    function tb(e, t) {
        return e.has(t);
    }
    function rb(e, t) {
        return e?.[t];
    }
    function nb(e) {
        var t = -1,
            r = Array(e.size);
        return (
            e.forEach(function (n, i) {
                r[++t] = [i, n];
            }),
            r
        );
    }
    function ib(e, t) {
        return function (r) {
            return e(t(r));
        };
    }
    function sb(e) {
        var t = -1,
            r = Array(e.size);
        return (
            e.forEach(function (n) {
                r[++t] = n;
            }),
            r
        );
    }
    var ob = Array.prototype,
        ab = Function.prototype,
        ji = Object.prototype,
        ra = it["__core-js_shared__"],
        jp = ab.toString,
        Qe = ji.hasOwnProperty,
        Sp = (function () {
            var e = /[^.]+$/.exec((ra && ra.keys && ra.keys.IE_PROTO) || "");
            return e ? "Symbol(src)_1." + e : "";
        })(),
        Hp = ji.toString,
        lb = RegExp(
            "^" +
                jp
                    .call(Qe)
                    .replace(VC, "\\$&")
                    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") +
                "$"
        ),
        Ap = Bp ? it.Buffer : void 0,
        ki = it.Symbol,
        Cp = it.Uint8Array,
        Wp = ji.propertyIsEnumerable,
        ub = ob.splice,
        Ut = ki ? ki.toStringTag : void 0,
        bp = Object.getOwnPropertySymbols,
        cb = Ap ? Ap.isBuffer : void 0,
        fb = ib(Object.keys, Object),
        oa = Sr(it, "DataView"),
        En = Sr(it, "Map"),
        aa = Sr(it, "Promise"),
        la = Sr(it, "Set"),
        ua = Sr(it, "WeakMap"),
        _n = Sr(Object, "create"),
        hb = jt(oa),
        db = jt(En),
        pb = jt(aa),
        mb = jt(la),
        gb = jt(ua),
        Tp = ki ? ki.prototype : void 0,
        na = Tp ? Tp.valueOf : void 0;
    function Mt(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function wb() {
        (this.__data__ = _n ? _n(null) : {}), (this.size = 0);
    }
    function yb(e) {
        var t = this.has(e) && delete this.__data__[e];
        return (this.size -= t ? 1 : 0), t;
    }
    function Eb(e) {
        var t = this.__data__;
        if (_n) {
            var r = t[e];
            return r === fa ? void 0 : r;
        }
        return Qe.call(t, e) ? t[e] : void 0;
    }
    function _b(e) {
        var t = this.__data__;
        return _n ? t[e] !== void 0 : Qe.call(t, e);
    }
    function vb(e, t) {
        var r = this.__data__;
        return (this.size += this.has(e) ? 0 : 1), (r[e] = _n && t === void 0 ? fa : t), this;
    }
    Mt.prototype.clear = wb;
    Mt.prototype.delete = yb;
    Mt.prototype.get = Eb;
    Mt.prototype.has = _b;
    Mt.prototype.set = vb;
    function st(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function Sb() {
        (this.__data__ = []), (this.size = 0);
    }
    function Ab(e) {
        var t = this.__data__,
            r = Hi(t, e);
        if (r < 0) return !1;
        var n = t.length - 1;
        return r == n ? t.pop() : ub.call(t, r, 1), --this.size, !0;
    }
    function Cb(e) {
        var t = this.__data__,
            r = Hi(t, e);
        return r < 0 ? void 0 : t[r][1];
    }
    function bb(e) {
        return Hi(this.__data__, e) > -1;
    }
    function Tb(e, t) {
        var r = this.__data__,
            n = Hi(r, e);
        return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    st.prototype.clear = Sb;
    st.prototype.delete = Ab;
    st.prototype.get = Cb;
    st.prototype.has = bb;
    st.prototype.set = Tb;
    function Bt(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function Ob() {
        (this.size = 0), (this.__data__ = { hash: new Mt(), map: new (En || st)(), string: new Mt() });
    }
    function xb(e) {
        var t = Wi(this, e).delete(e);
        return (this.size -= t ? 1 : 0), t;
    }
    function Ib(e) {
        return Wi(this, e).get(e);
    }
    function Nb(e) {
        return Wi(this, e).has(e);
    }
    function Rb(e, t) {
        var r = Wi(this, e),
            n = r.size;
        return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    Bt.prototype.clear = Ob;
    Bt.prototype.delete = xb;
    Bt.prototype.get = Ib;
    Bt.prototype.has = Nb;
    Bt.prototype.set = Rb;
    function Ui(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.__data__ = new Bt(); ++t < r; ) this.add(e[t]);
    }
    function Pb(e) {
        return this.__data__.set(e, fa), this;
    }
    function Db(e) {
        return this.__data__.has(e);
    }
    Ui.prototype.add = Ui.prototype.push = Pb;
    Ui.prototype.has = Db;
    function _t(e) {
        var t = (this.__data__ = new st(e));
        this.size = t.size;
    }
    function Fb() {
        (this.__data__ = new st()), (this.size = 0);
    }
    function qb(e) {
        var t = this.__data__,
            r = t.delete(e);
        return (this.size = t.size), r;
    }
    function Lb(e) {
        return this.__data__.get(e);
    }
    function $b(e) {
        return this.__data__.has(e);
    }
    function kb(e, t) {
        var r = this.__data__;
        if (r instanceof st) {
            var n = r.__data__;
            if (!En || n.length < NC - 1) return n.push([e, t]), (this.size = ++r.size), this;
            r = this.__data__ = new Bt(n);
        }
        return r.set(e, t), (this.size = r.size), this;
    }
    _t.prototype.clear = Fb;
    _t.prototype.delete = qb;
    _t.prototype.get = Lb;
    _t.prototype.has = $b;
    _t.prototype.set = kb;
    function Ub(e, t) {
        var r = Mi(e),
            n = !r && eT(e),
            i = !r && !n && ca(e),
            s = !r && !n && !i && Jp(e),
            o = r || n || i || s,
            a = o ? ZC(e.length, String) : [],
            l = a.length;
        for (var h in e)
            (t || Qe.call(e, h)) &&
                !(
                    o &&
                    (h == "length" ||
                        (i && (h == "offset" || h == "parent")) ||
                        (s && (h == "buffer" || h == "byteLength" || h == "byteOffset")) ||
                        Xb(h, l))
                ) &&
                a.push(h);
        return a;
    }
    function Hi(e, t) {
        for (var r = e.length; r--; ) if (Yp(e[r][0], t)) return r;
        return -1;
    }
    function Mb(e, t, r) {
        var n = t(e);
        return Mi(e) ? n : JC(n, r(e));
    }
    function Sn(e) {
        return e == null ? (e === void 0 ? LC : DC) : Ut && Ut in Object(e) ? Yb(e) : Zb(e);
    }
    function Op(e) {
        return vn(e) && Sn(e) == Fi;
    }
    function Gp(e, t, r, n, i) {
        return e === t ? !0 : e == null || t == null || (!vn(e) && !vn(t)) ? e !== e && t !== t : Bb(e, t, r, n, Gp, i);
    }
    function Bb(e, t, r, n, i, s) {
        var o = Mi(e),
            a = Mi(t),
            l = o ? ia : Et(e),
            h = a ? ia : Et(t);
        (l = l == Fi ? _r : l), (h = h == Fi ? _r : h);
        var c = l == _r,
            f = h == _r,
            m = l == h;
        if (m && ca(e)) {
            if (!ca(t)) return !1;
            (o = !0), (c = !1);
        }
        if (m && !c) return s || (s = new _t()), o || Jp(e) ? Vp(e, t, r, n, i, s) : Gb(e, t, l, r, n, i, s);
        if (!(r & Bi)) {
            var p = c && Qe.call(e, "__wrapped__"),
                _ = f && Qe.call(t, "__wrapped__");
            if (p || _) {
                var v = p ? e.value() : e,
                    S = _ ? t.value() : t;
                return s || (s = new _t()), i(v, S, r, n, s);
            }
        }
        return m ? (s || (s = new _t()), Vb(e, t, r, n, i, s)) : !1;
    }
    function jb(e) {
        if (!Kp(e) || Jb(e)) return !1;
        var t = zp(e) ? lb : YC;
        return t.test(jt(e));
    }
    function Hb(e) {
        return vn(e) && Xp(e.length) && !!J[Sn(e)];
    }
    function Wb(e) {
        if (!Qb(e)) return fb(e);
        var t = [];
        for (var r in Object(e)) Qe.call(e, r) && r != "constructor" && t.push(r);
        return t;
    }
    function Vp(e, t, r, n, i, s) {
        var o = r & Bi,
            a = e.length,
            l = t.length;
        if (a != l && !(o && l > a)) return !1;
        var h = s.get(e);
        if (h && s.get(t)) return h == t;
        var c = -1,
            f = !0,
            m = r & Ip ? new Ui() : void 0;
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
                    !QC(t, function (S, T) {
                        if (!tb(m, T) && (p === S || i(p, S, r, n, s))) return m.push(T);
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
    function Gb(e, t, r, n, i, s, o) {
        switch (r) {
            case $i:
                if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
                (e = e.buffer), (t = t.buffer);
            case kp:
                return !(e.byteLength != t.byteLength || !s(new Cp(e), new Cp(t)));
            case Rp:
            case Pp:
            case qp:
                return Yp(+e, +t);
            case Dp:
                return e.name == t.name && e.message == t.message;
            case Lp:
            case $p:
                return e == t + "";
            case qi:
                var a = nb;
            case Li:
                var l = n & Bi;
                if ((a || (a = sb), e.size != t.size && !l)) return !1;
                var h = o.get(e);
                if (h) return h == t;
                (n |= Ip), o.set(e, t);
                var c = Vp(a(e), a(t), n, i, s, o);
                return o.delete(e), c;
            case qC:
                if (na) return na.call(e) == na.call(t);
        }
        return !1;
    }
    function Vb(e, t, r, n, i, s) {
        var o = r & Bi,
            a = xp(e),
            l = a.length,
            h = xp(t),
            c = h.length;
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
            var N = e.constructor,
                $ = t.constructor;
            N != $ &&
                "constructor" in e &&
                "constructor" in t &&
                !(typeof N == "function" && N instanceof N && typeof $ == "function" && $ instanceof $) &&
                (_ = !1);
        }
        return s.delete(e), s.delete(t), _;
    }
    function xp(e) {
        return Mb(e, nT, zb);
    }
    function Wi(e, t) {
        var r = e.__data__;
        return Kb(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    function Sr(e, t) {
        var r = rb(e, t);
        return jb(r) ? r : void 0;
    }
    function Yb(e) {
        var t = Qe.call(e, Ut),
            r = e[Ut];
        try {
            e[Ut] = void 0;
            var n = !0;
        } catch {}
        var i = Hp.call(e);
        return n && (t ? (e[Ut] = r) : delete e[Ut]), i;
    }
    var zb = bp
            ? function (e) {
                  return e == null
                      ? []
                      : ((e = Object(e)),
                        KC(bp(e), function (t) {
                            return Wp.call(e, t);
                        }));
              }
            : iT,
        Et = Sn;
    ((oa && Et(new oa(new ArrayBuffer(1))) != $i) ||
        (En && Et(new En()) != qi) ||
        (aa && Et(aa.resolve()) != yp) ||
        (la && Et(new la()) != Li) ||
        (ua && Et(new ua()) != sa)) &&
        (Et = function (e) {
            var t = Sn(e),
                r = t == _r ? e.constructor : void 0,
                n = r ? jt(r) : "";
            if (n)
                switch (n) {
                    case hb:
                        return $i;
                    case db:
                        return qi;
                    case pb:
                        return yp;
                    case mb:
                        return Li;
                    case gb:
                        return sa;
                }
            return t;
        });
    function Xb(e, t) {
        return (t = t ?? Np), !!t && (typeof e == "number" || zC.test(e)) && e > -1 && e % 1 == 0 && e < t;
    }
    function Kb(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
    }
    function Jb(e) {
        return !!Sp && Sp in e;
    }
    function Qb(e) {
        var t = e && e.constructor,
            r = (typeof t == "function" && t.prototype) || ji;
        return e === r;
    }
    function Zb(e) {
        return Hp.call(e);
    }
    function jt(e) {
        if (e != null) {
            try {
                return jp.call(e);
            } catch {}
            try {
                return e + "";
            } catch {}
        }
        return "";
    }
    function Yp(e, t) {
        return e === t || (e !== e && t !== t);
    }
    var eT = Op(
            (function () {
                return arguments;
            })()
        )
            ? Op
            : function (e) {
                  return vn(e) && Qe.call(e, "callee") && !Wp.call(e, "callee");
              },
        Mi = Array.isArray;
    function tT(e) {
        return e != null && Xp(e.length) && !zp(e);
    }
    var ca = cb || sT;
    function rT(e, t) {
        return Gp(e, t);
    }
    function zp(e) {
        if (!Kp(e)) return !1;
        var t = Sn(e);
        return t == Fp || t == PC || t == RC || t == FC;
    }
    function Xp(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Np;
    }
    function Kp(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
    }
    function vn(e) {
        return e != null && typeof e == "object";
    }
    var Jp = vp ? eb(vp) : Hb;
    function nT(e) {
        return tT(e) ? Ub(e) : Wb(e);
    }
    function iT() {
        return [];
    }
    function sT() {
        return !1;
    }
    vr.exports = rT;
});
var em = w(Cn => {
    "use strict";
    Object.defineProperty(Cn, "__esModule", { value: !0 });
    Cn.DownloadedUpdateHelper = void 0;
    Cn.createTempUpdateFile = uT;
    var oT = require("crypto"),
        aT = require("fs"),
        Zp = Qp(),
        Ht = rt(),
        An = require("path"),
        ha = class {
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
                return An.join(this.cacheDir, "pending");
            }
            async validateDownloadedPath(t, r, n, i) {
                if (this.versionInfo != null && this.file === t && this.fileInfo != null)
                    return Zp(this.versionInfo, r) && Zp(this.fileInfo.info, n.info) && (await (0, Ht.pathExists)(t)) ? t : null;
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
                } catch (h) {
                    let c = "No cached update info available";
                    return (
                        h.code !== "ENOENT" &&
                            (await this.cleanCacheDirForPendingUpdate(), (c += " (error on read: ".concat(h.message, ")"))),
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
                let a = An.join(this.cacheDirForPendingUpdate, s.fileName);
                if (!(await (0, Ht.pathExists)(a))) return r.info("Cached update file doesn't exist"), null;
                let l = await lT(a);
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
                return An.join(this.cacheDirForPendingUpdate, "update-info.json");
            }
        };
    Cn.DownloadedUpdateHelper = ha;
    function lT(e, t = "sha512", r = "base64", n) {
        return new Promise((i, s) => {
            let o = (0, oT.createHash)(t);
            o.on("error", s).setEncoding(r),
                (0, aT.createReadStream)(e, { ...n, highWaterMark: 1024 * 1024 })
                    .on("error", s)
                    .on("end", () => {
                        o.end(), i(o.read());
                    })
                    .pipe(o, { end: !1 });
        });
    }
    async function uT(e, t, r) {
        let n = 0,
            i = An.join(t, e);
        for (let s = 0; s < 3; s++)
            try {
                return await (0, Ht.unlink)(i), i;
            } catch (o) {
                if (o.code === "ENOENT") return i;
                r.warn("Error on remove temp update file: ".concat(o)), (i = An.join(t, "".concat(n++, "-").concat(e)));
            }
        return i;
    }
});
var tm = w(pa => {
    "use strict";
    Object.defineProperty(pa, "__esModule", { value: !0 });
    pa.getAppCacheDir = fT;
    var da = require("path"),
        cT = require("os");
    function fT() {
        let e = (0, cT.homedir)(),
            t;
        return (
            process.platform === "win32"
                ? (t = process.env.LOCALAPPDATA || da.join(e, "AppData", "Local"))
                : process.platform === "darwin"
                ? (t = da.join(e, "Library", "Caches"))
                : (t = process.env.XDG_CACHE_HOME || da.join(e, ".cache")),
            t
        );
    }
});
var nm = w(Gi => {
    "use strict";
    Object.defineProperty(Gi, "__esModule", { value: !0 });
    Gi.ElectronAppAdapter = void 0;
    var rm = require("path"),
        hT = tm(),
        ma = class {
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
                    ? rm.join(process.resourcesPath, "app-update.yml")
                    : rm.join(this.app.getAppPath(), "dev-app-update.yml");
            }
            get userDataPath() {
                return this.app.getPath("userData");
            }
            get baseCachePath() {
                return (0, hT.getAppCacheDir)();
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
    Gi.ElectronAppAdapter = ma;
});
var sm = w(vt => {
    "use strict";
    Object.defineProperty(vt, "__esModule", { value: !0 });
    vt.ElectronHttpExecutor = vt.NET_SESSION_NAME = void 0;
    vt.getNetSession = im;
    var Vi = fe();
    vt.NET_SESSION_NAME = "electron-updater";
    function im() {
        return require("electron").session.fromPartition(vt.NET_SESSION_NAME, { cache: !1 });
    }
    var ga = class extends Vi.HttpExecutor {
        constructor(t) {
            super(), (this.proxyLoginCallback = t), (this.cachedSession = null);
        }
        async download(t, r, n) {
            return await n.cancellationToken.createPromise((i, s, o) => {
                let a = { headers: n.headers || void 0, redirect: "manual" };
                (0, Vi.configureRequestUrl)(t, a),
                    (0, Vi.configureRequestOptions)(a),
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
                this.cachedSession == null && (this.cachedSession = im());
            let n = require("electron").net.request({ ...t, session: this.cachedSession });
            return n.on("response", r), this.proxyLoginCallback != null && n.on("login", this.proxyLoginCallback), n;
        }
        addRedirectHandlers(t, r, n, i, s) {
            t.on("redirect", (o, a, l) => {
                t.abort(),
                    i > this.maxRedirects ? n(this.createMaxRedirectError()) : s(Vi.HttpExecutor.prepareRedirectUrlOptions(l, r));
            });
        }
    };
    vt.ElectronHttpExecutor = ga;
});
var fm = w((lR, cm) => {
    var dT = 1 / 0,
        pT = "[object Symbol]",
        um = /[\\^$.*+?()[\]{}|]/g,
        mT = RegExp(um.source),
        gT = typeof global == "object" && global && global.Object === Object && global,
        wT = typeof self == "object" && self && self.Object === Object && self,
        yT = gT || wT || Function("return this")(),
        ET = Object.prototype,
        _T = ET.toString,
        om = yT.Symbol,
        am = om ? om.prototype : void 0,
        lm = am ? am.toString : void 0;
    function vT(e) {
        if (typeof e == "string") return e;
        if (AT(e)) return lm ? lm.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -dT ? "-0" : t;
    }
    function ST(e) {
        return !!e && typeof e == "object";
    }
    function AT(e) {
        return typeof e == "symbol" || (ST(e) && _T.call(e) == pT);
    }
    function CT(e) {
        return e == null ? "" : vT(e);
    }
    function bT(e) {
        return (e = CT(e)), e && mT.test(e) ? e.replace(um, "\\$&") : e;
    }
    cm.exports = bT;
});
var St = w(Ar => {
    "use strict";
    Object.defineProperty(Ar, "__esModule", { value: !0 });
    Ar.newBaseUrl = OT;
    Ar.newUrlFromBase = wa;
    Ar.getChannelFilename = xT;
    Ar.blockmapFiles = IT;
    var hm = require("url"),
        TT = fm();
    function OT(e) {
        let t = new hm.URL(e);
        return t.pathname.endsWith("/") || (t.pathname += "/"), t;
    }
    function wa(e, t, r = !1) {
        let n = new hm.URL(e, t),
            i = t.search;
        return i != null && i.length !== 0 ? (n.search = i) : r && (n.search = "noCache=".concat(Date.now().toString(32))), n;
    }
    function xT(e) {
        return "".concat(e, ".yml");
    }
    function IT(e, t, r) {
        let n = wa("".concat(e.pathname, ".blockmap"), e);
        return [wa("".concat(e.pathname.replace(new RegExp(TT(r), "g"), t), ".blockmap"), e), n];
    }
});
var He = w(Ct => {
    "use strict";
    Object.defineProperty(Ct, "__esModule", { value: !0 });
    Ct.Provider = void 0;
    Ct.findFile = RT;
    Ct.parseUpdateInfo = PT;
    Ct.getFileList = pm;
    Ct.resolveFiles = DT;
    var At = fe(),
        NT = vi(),
        dm = St(),
        ya = class {
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
    Ct.Provider = ya;
    function RT(e, t, r) {
        if (e.length === 0) throw (0, At.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
        let n = e.find(i => i.url.pathname.toLowerCase().endsWith(".".concat(t)));
        return n ?? (r == null ? e[0] : e.find(i => !r.some(s => i.url.pathname.toLowerCase().endsWith(".".concat(s)))));
    }
    function PT(e, t, r) {
        if (e == null)
            throw (0, At.newError)(
                "Cannot parse update info from ".concat(t, " in the latest release artifacts (").concat(r, "): rawData: null"),
                "ERR_UPDATER_INVALID_UPDATE_INFO"
            );
        let n;
        try {
            n = (0, NT.load)(e);
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
    function pm(e) {
        let t = e.files;
        if (t != null && t.length > 0) return t;
        if (e.path != null) return [{ url: e.path, sha2: e.sha2, sha512: e.sha512 }];
        throw (0, At.newError)("No files provided: ".concat((0, At.safeStringifyJson)(e)), "ERR_UPDATER_NO_FILES_PROVIDED");
    }
    function DT(e, t, r = n => n) {
        let i = pm(e).map(a => {
                if (a.sha2 == null && a.sha512 == null)
                    throw (0, At.newError)(
                        "Update info doesn't contain nor sha256 neither sha512 checksum: ".concat((0, At.safeStringifyJson)(a)),
                        "ERR_UPDATER_NO_CHECKSUM"
                    );
                return { url: (0, dm.newUrlFromBase)(r(a.url), t), info: a };
            }),
            s = e.packages,
            o = s == null ? null : s[process.arch] || s.ia32;
        return o != null && (i[0].packageInfo = { ...o, path: (0, dm.newUrlFromBase)(r(o.path), t).href }), i;
    }
});
var Sa = w(Yi => {
    "use strict";
    Object.defineProperty(Yi, "__esModule", { value: !0 });
    Yi.GenericProvider = void 0;
    var mm = fe(),
        Ea = St(),
        _a = He(),
        va = class extends _a.Provider {
            constructor(t, r, n) {
                super(n),
                    (this.configuration = t),
                    (this.updater = r),
                    (this.baseUrl = (0, Ea.newBaseUrl)(this.configuration.url));
            }
            get channel() {
                let t = this.updater.channel || this.configuration.channel;
                return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
            }
            async getLatestVersion() {
                let t = (0, Ea.getChannelFilename)(this.channel),
                    r = (0, Ea.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
                for (let n = 0; ; n++)
                    try {
                        return (0, _a.parseUpdateInfo)(await this.httpRequest(r), t, r);
                    } catch (i) {
                        if (i instanceof mm.HttpError && i.statusCode === 404)
                            throw (0, mm.newError)(
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
                return (0, _a.resolveFiles)(t, this.baseUrl);
            }
        };
    Yi.GenericProvider = va;
});
var wm = w(zi => {
    "use strict";
    Object.defineProperty(zi, "__esModule", { value: !0 });
    zi.BitbucketProvider = void 0;
    var gm = fe(),
        Aa = St(),
        Ca = He(),
        ba = class extends Ca.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }), (this.configuration = t), (this.updater = r);
                let { owner: i, slug: s } = t;
                this.baseUrl = (0, Aa.newBaseUrl)(
                    "https://api.bitbucket.org/2.0/repositories/".concat(i, "/").concat(s, "/downloads")
                );
            }
            get channel() {
                return this.updater.channel || this.configuration.channel || "latest";
            }
            async getLatestVersion() {
                let t = new gm.CancellationToken(),
                    r = (0, Aa.getChannelFilename)(this.getCustomChannelName(this.channel)),
                    n = (0, Aa.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
                try {
                    let i = await this.httpRequest(n, void 0, t);
                    return (0, Ca.parseUpdateInfo)(i, r, n);
                } catch (i) {
                    throw (0, gm.newError)(
                        "Unable to find latest version on "
                            .concat(this.toString(), ", please ensure release exists: ")
                            .concat(i.stack || i.message),
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            resolveFiles(t) {
                return (0, Ca.resolveFiles)(t, this.baseUrl);
            }
            toString() {
                let { owner: t, slug: r } = this.configuration;
                return "Bitbucket (owner: ".concat(t, ", slug: ").concat(r, ", channel: ").concat(this.channel, ")");
            }
        };
    zi.BitbucketProvider = ba;
});
var Ia = w(Wt => {
    "use strict";
    Object.defineProperty(Wt, "__esModule", { value: !0 });
    Wt.GitHubProvider = Wt.BaseGitHubProvider = void 0;
    Wt.computeReleaseNotes = Em;
    var ot = fe(),
        Cr = ea(),
        FT = require("url"),
        br = St(),
        Oa = He(),
        Ta = /\/tag\/([^/]+)$/,
        Xi = class extends Oa.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }),
                    (this.options = t),
                    (this.baseUrl = (0, br.newBaseUrl)((0, ot.githubUrl)(t, r)));
                let i = r === "github.com" ? "api.github.com" : r;
                this.baseApiUrl = (0, br.newBaseUrl)((0, ot.githubUrl)(t, i));
            }
            computeGithubBasePath(t) {
                let r = this.options.host;
                return r && !["github.com", "api.github.com"].includes(r) ? "/api/v3".concat(t) : t;
            }
        };
    Wt.BaseGitHubProvider = Xi;
    var xa = class extends Xi {
        constructor(t, r, n) {
            super(t, "github.com", n), (this.options = t), (this.updater = r);
        }
        get channel() {
            let t = this.updater.channel || this.options.channel;
            return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
        }
        async getLatestVersion() {
            var t, r, n, i, s;
            let o = new ot.CancellationToken(),
                a = await this.httpRequest(
                    (0, br.newUrlFromBase)("".concat(this.basePath, ".atom"), this.baseUrl),
                    { accept: "application/xml, application/atom+xml, text/xml, */*" },
                    o
                ),
                l = (0, ot.parseXml)(a),
                h = l.element("entry", !1, "No published versions on GitHub"),
                c = null;
            try {
                if (this.updater.allowPrerelease) {
                    let S =
                        ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) ||
                        ((r = Cr.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) ||
                        null;
                    if (S === null) c = Ta.exec(h.element("link").attribute("href"))[1];
                    else
                        for (let T of l.getElements("entry")) {
                            let C = Ta.exec(T.element("link").attribute("href"));
                            if (C === null) continue;
                            let N = C[1],
                                $ = ((n = Cr.prerelease(N)) === null || n === void 0 ? void 0 : n[0]) || null,
                                Ue = !S || ["alpha", "beta"].includes(S),
                                X = $ !== null && !["alpha", "beta"].includes(String($));
                            if (Ue && !X && !(S === "beta" && $ === "alpha")) {
                                c = N;
                                break;
                            }
                            if ($ && $ === S) {
                                c = N;
                                break;
                            }
                        }
                } else {
                    c = await this.getLatestTagName(o);
                    for (let S of l.getElements("entry"))
                        if (Ta.exec(S.element("link").attribute("href"))[1] === c) {
                            h = S;
                            break;
                        }
                }
            } catch (S) {
                throw (0, ot.newError)(
                    "Cannot parse releases feed: ".concat(S.stack || S.message, ",\nXML:\n").concat(a),
                    "ERR_UPDATER_INVALID_RELEASE_FEED"
                );
            }
            if (c == null) throw (0, ot.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
            let f,
                m = "",
                p = "",
                _ = async S => {
                    (m = (0, br.getChannelFilename)(S)),
                        (p = (0, br.newUrlFromBase)(this.getBaseDownloadPath(String(c), m), this.baseUrl));
                    let T = this.createRequestOptions(p);
                    try {
                        return await this.executor.request(T, o);
                    } catch (C) {
                        throw C instanceof ot.HttpError && C.statusCode === 404
                            ? (0, ot.newError)(
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
                    !((i = Cr.prerelease(c)) === null || i === void 0) &&
                    i[0] &&
                    (S = this.getCustomChannelName(String((s = Cr.prerelease(c)) === null || s === void 0 ? void 0 : s[0]))),
                    (f = await _(S));
            } catch (S) {
                if (this.updater.allowPrerelease) f = await _(this.getDefaultChannelName());
                else throw S;
            }
            let v = (0, Oa.parseUpdateInfo)(f, m, p);
            return (
                v.releaseName == null && (v.releaseName = h.elementValueOrEmpty("title")),
                v.releaseNotes == null && (v.releaseNotes = Em(this.updater.currentVersion, this.updater.fullChangelog, l, h)),
                { tag: c, ...v }
            );
        }
        async getLatestTagName(t) {
            let r = this.options,
                n =
                    r.host == null || r.host === "github.com"
                        ? (0, br.newUrlFromBase)("".concat(this.basePath, "/latest"), this.baseUrl)
                        : new FT.URL(
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
                throw (0, ot.newError)(
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
            return (0, Oa.resolveFiles)(t, this.baseUrl, r => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
        }
        getBaseDownloadPath(t, r) {
            return "".concat(this.basePath, "/download/").concat(t, "/").concat(r);
        }
    };
    Wt.GitHubProvider = xa;
    function ym(e) {
        let t = e.elementValueOrEmpty("content");
        return t === "No content." ? "" : t;
    }
    function Em(e, t, r, n) {
        if (!t) return ym(n);
        let i = [];
        for (let s of r.getElements("entry")) {
            let o = /\/tag\/v?([^/]+)$/.exec(s.element("link").attribute("href"))[1];
            Cr.lt(e, o) && i.push({ version: o, note: ym(s) });
        }
        return i.sort((s, o) => Cr.rcompare(s.version, o.version));
    }
});
var vm = w(Ki => {
    "use strict";
    Object.defineProperty(Ki, "__esModule", { value: !0 });
    Ki.KeygenProvider = void 0;
    var _m = fe(),
        Na = St(),
        Ra = He(),
        Pa = class extends Ra.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }),
                    (this.configuration = t),
                    (this.updater = r),
                    (this.baseUrl = (0, Na.newBaseUrl)(
                        "https://api.keygen.sh/v1/accounts/"
                            .concat(this.configuration.account, "/artifacts?product=")
                            .concat(this.configuration.product)
                    ));
            }
            get channel() {
                return this.updater.channel || this.configuration.channel || "stable";
            }
            async getLatestVersion() {
                let t = new _m.CancellationToken(),
                    r = (0, Na.getChannelFilename)(this.getCustomChannelName(this.channel)),
                    n = (0, Na.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
                try {
                    let i = await this.httpRequest(n, { "Accept": "application/vnd.api+json", "Keygen-Version": "1.1" }, t);
                    return (0, Ra.parseUpdateInfo)(i, r, n);
                } catch (i) {
                    throw (0, _m.newError)(
                        "Unable to find latest version on "
                            .concat(this.toString(), ", please ensure release exists: ")
                            .concat(i.stack || i.message),
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            resolveFiles(t) {
                return (0, Ra.resolveFiles)(t, this.baseUrl);
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
    Ki.KeygenProvider = Pa;
});
var Cm = w(Ji => {
    "use strict";
    Object.defineProperty(Ji, "__esModule", { value: !0 });
    Ji.PrivateGitHubProvider = void 0;
    var Tr = fe(),
        qT = vi(),
        LT = require("path"),
        Sm = require("url"),
        Am = St(),
        $T = Ia(),
        kT = He(),
        Da = class extends $T.BaseGitHubProvider {
            constructor(t, r, n, i) {
                super(t, "api.github.com", i), (this.updater = r), (this.token = n);
            }
            createRequestOptions(t, r) {
                let n = super.createRequestOptions(t, r);
                return (n.redirect = "manual"), n;
            }
            async getLatestVersion() {
                let t = new Tr.CancellationToken(),
                    r = (0, Am.getChannelFilename)(this.getDefaultChannelName()),
                    n = await this.getLatestVersionInfo(t),
                    i = n.assets.find(a => a.name === r);
                if (i == null)
                    throw (0, Tr.newError)(
                        "Cannot find ".concat(r, " in the release ").concat(n.html_url || n.name),
                        "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                    );
                let s = new Sm.URL(i.url),
                    o;
                try {
                    o = (0, qT.load)(await this.httpRequest(s, this.configureHeaders("application/octet-stream"), t));
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
                let i = (0, Am.newUrlFromBase)(n, this.baseUrl);
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
                return (0, kT.getFileList)(t).map(r => {
                    let n = LT.posix.basename(r.url).replace(/ /g, "-"),
                        i = t.assets.find(s => s != null && s.name === n);
                    if (i == null)
                        throw (0, Tr.newError)(
                            'Cannot find asset "'.concat(n, '" in: ').concat(JSON.stringify(t.assets, null, 2)),
                            "ERR_UPDATER_ASSET_NOT_FOUND"
                        );
                    return { url: new Sm.URL(i.url), info: r };
                });
            }
        };
    Ji.PrivateGitHubProvider = Da;
});
var Om = w(Zi => {
    "use strict";
    Object.defineProperty(Zi, "__esModule", { value: !0 });
    Zi.isUrlProbablySupportMultiRangeRequests = Tm;
    Zi.createClient = HT;
    var Qi = fe(),
        UT = wm(),
        bm = Sa(),
        MT = Ia(),
        BT = vm(),
        jT = Cm();
    function Tm(e) {
        return !e.includes("s3.amazonaws.com");
    }
    function HT(e, t, r) {
        if (typeof e == "string")
            throw (0, Qi.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        let n = e.provider;
        switch (n) {
            case "github": {
                let i = e,
                    s = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
                return s == null ? new MT.GitHubProvider(i, t, r) : new jT.PrivateGitHubProvider(i, t, s, r);
            }
            case "bitbucket":
                return new UT.BitbucketProvider(e, t, r);
            case "keygen":
                return new BT.KeygenProvider(e, t, r);
            case "s3":
            case "spaces":
                return new bm.GenericProvider(
                    { provider: "generic", url: (0, Qi.getS3LikeProviderBaseUrl)(e), channel: e.channel || null },
                    t,
                    { ...r, isUseMultipleRangeRequest: !1 }
                );
            case "generic": {
                let i = e;
                return new bm.GenericProvider(i, t, {
                    ...r,
                    isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && Tm(i.url)
                });
            }
            case "custom": {
                let i = e,
                    s = i.updateProvider;
                if (!s) throw (0, Qi.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
                return new s(i, t, r);
            }
            default:
                throw (0, Qi.newError)("Unsupported provider: ".concat(n), "ERR_UPDATER_UNSUPPORTED_PROVIDER");
        }
    }
});
var es = w(bn => {
    "use strict";
    Object.defineProperty(bn, "__esModule", { value: !0 });
    bn.OperationKind = void 0;
    bn.computeOperations = WT;
    var Gt;
    (function (e) {
        (e[(e.COPY = 0)] = "COPY"), (e[(e.DOWNLOAD = 1)] = "DOWNLOAD");
    })(Gt || (bn.OperationKind = Gt = {}));
    function WT(e, t, r) {
        let n = Im(e.files),
            i = Im(t.files),
            s = null,
            o = t.files[0],
            a = [],
            l = o.name,
            h = n.get(l);
        if (h == null) throw new Error("no file ".concat(l, " in old blockmap"));
        let c = i.get(l),
            f = 0,
            { checksumToOffset: m, checksumToOldSize: p } = VT(n.get(l), h.offset, r),
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
                          : ((s = { kind: Gt.DOWNLOAD, start: _, end: _ + S }), xm(s, a, T, v)))
                    : s != null && s.kind === Gt.COPY && s.end === C
                    ? (s.end += S)
                    : ((s = { kind: Gt.COPY, start: C, end: C + S }), xm(s, a, T, v));
        }
        return f > 0 && r.info("File".concat(o.name === "file" ? "" : " " + o.name, " has ").concat(f, " changed blocks")), a;
    }
    var GT = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
    function xm(e, t, r, n) {
        if (GT && t.length !== 0) {
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
    function VT(e, t, r) {
        let n = new Map(),
            i = new Map(),
            s = t;
        for (let o = 0; o < e.checksums.length; o++) {
            let a = e.checksums[o],
                l = e.sizes[o],
                h = i.get(a);
            if (h === void 0) n.set(a, s), i.set(a, l);
            else if (r.debug != null) {
                let c = h === l ? "(same size)" : "(size: ".concat(h, ", this size: ").concat(l, ")");
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
    function Im(e) {
        let t = new Map();
        for (let r of e) t.set(r.name, r);
        return t;
    }
});
var qa = w(Tn => {
    "use strict";
    Object.defineProperty(Tn, "__esModule", { value: !0 });
    Tn.DataSplitter = void 0;
    Tn.copyData = Rm;
    var ts = fe(),
        YT = require("fs"),
        zT = require("stream"),
        XT = es(),
        Nm = Buffer.from("\r\n\r\n"),
        bt;
    (function (e) {
        (e[(e.INIT = 0)] = "INIT"), (e[(e.HEADER = 1)] = "HEADER"), (e[(e.BODY = 2)] = "BODY");
    })(bt || (bt = {}));
    function Rm(e, t, r, n, i) {
        let s = (0, YT.createReadStream)("", { fd: r, autoClose: !1, start: e.start, end: e.end - 1 });
        s.on("error", n), s.once("end", i), s.pipe(t, { end: !1 });
    }
    var Fa = class extends zT.Writable {
        constructor(t, r, n, i, s, o) {
            super(),
                (this.out = t),
                (this.options = r),
                (this.partIndexToTaskIndex = n),
                (this.partIndexToLength = s),
                (this.finishHandler = o),
                (this.partIndex = -1),
                (this.headerListBuffer = null),
                (this.readState = bt.INIT),
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
                throw (0, ts.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
            if (this.ignoreByteCount > 0) {
                let n = Math.min(this.ignoreByteCount, t.length);
                (this.ignoreByteCount -= n), (r = n);
            } else if (this.remainingPartDataCount > 0) {
                let n = Math.min(this.remainingPartDataCount, t.length);
                (this.remainingPartDataCount -= n), await this.processPartData(t, 0, n), (r = n);
            }
            if (r !== t.length) {
                if (this.readState === bt.HEADER) {
                    let n = this.searchHeaderListEnd(t, r);
                    if (n === -1) return;
                    (r = n), (this.readState = bt.BODY), (this.headerListBuffer = null);
                }
                for (;;) {
                    if (this.readState === bt.BODY) this.readState = bt.INIT;
                    else {
                        this.partIndex++;
                        let o = this.partIndexToTaskIndex.get(this.partIndex);
                        if (o == null)
                            if (this.isFinished) o = this.options.end;
                            else throw (0, ts.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
                        let a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
                        if (a < o) await this.copyExistingData(a, o);
                        else if (a > o)
                            throw (0, ts.newError)(
                                "prevTaskIndex must be < taskIndex",
                                "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED"
                            );
                        if (this.isFinished) {
                            this.onPartEnd(), this.finishHandler();
                            return;
                        }
                        if (((r = this.searchHeaderListEnd(t, r)), r === -1)) {
                            this.readState = bt.HEADER;
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
                    if (o.kind !== XT.OperationKind.COPY) {
                        i(new Error("Task kind must be COPY"));
                        return;
                    }
                    Rm(o, this.out, this.options.oldFileFd, i, () => {
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
                throw (0, ts.newError)(
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
    Tn.DataSplitter = Fa;
});
var Fm = w(rs => {
    "use strict";
    Object.defineProperty(rs, "__esModule", { value: !0 });
    rs.executeTasksUsingMultipleRangeRequests = KT;
    rs.checkIsRangesSupported = $a;
    var La = fe(),
        Pm = qa(),
        Dm = es();
    function KT(e, t, r, n, i) {
        let s = o => {
            if (o >= t.length) {
                e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
                return;
            }
            let a = o + 1e3;
            JT(e, { tasks: t, start: o, end: Math.min(t.length, a), oldFileFd: n }, r, () => s(a), i);
        };
        return s;
    }
    function JT(e, t, r, n, i) {
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
                if (p.kind === Dm.OperationKind.COPY) (0, Pm.copyData)(p, r, t.oldFileFd, i, () => f(m));
                else {
                    let _ = e.createRequestOptions();
                    _.headers.Range = "bytes=".concat(p.start, "-").concat(p.end - 1);
                    let v = e.httpExecutor.createRequest(_, S => {
                        $a(S, i) && (S.pipe(r, { end: !1 }), S.once("end", () => f(m)));
                    });
                    e.httpExecutor.addErrorAndTimeoutHandlers(v, i), v.end();
                }
            };
            f(t.start);
            return;
        }
        let h = e.createRequestOptions();
        h.headers.Range = s.substring(0, s.length - 2);
        let c = e.httpExecutor.createRequest(h, f => {
            if (!$a(f, i)) return;
            let m = (0, La.safeGetHeader)(f, "content-type"),
                p = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(m);
            if (p == null) {
                i(new Error('Content-Type "multipart/byteranges" is expected, but got "'.concat(m, '"')));
                return;
            }
            let _ = new Pm.DataSplitter(r, t, a, p[1] || p[2], l, n);
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
    function $a(e, t) {
        if (e.statusCode >= 400) return t((0, La.createHttpError)(e)), !1;
        if (e.statusCode !== 206) {
            let r = (0, La.safeGetHeader)(e, "accept-ranges");
            if (r == null || r === "none")
                return t(new Error("Server doesn't support Accept-Ranges (response code ".concat(e.statusCode, ")"))), !1;
        }
        return !0;
    }
});
var qm = w(ns => {
    "use strict";
    Object.defineProperty(ns, "__esModule", { value: !0 });
    ns.ProgressDifferentialDownloadCallbackTransform = void 0;
    var QT = require("stream"),
        Or;
    (function (e) {
        (e[(e.COPY = 0)] = "COPY"), (e[(e.DOWNLOAD = 1)] = "DOWNLOAD");
    })(Or || (Or = {}));
    var ka = class extends QT.Transform {
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
                (this.operationType = Or.COPY),
                (this.nextUpdate = this.start + 1e3);
        }
        _transform(t, r, n) {
            if (this.cancellationToken.cancelled) {
                n(new Error("cancelled"), null);
                return;
            }
            if (this.operationType == Or.COPY) {
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
            this.operationType = Or.COPY;
        }
        beginRangeDownload() {
            (this.operationType = Or.DOWNLOAD),
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
    ns.ProgressDifferentialDownloadCallbackTransform = ka;
});
var Ba = w(ss => {
    "use strict";
    Object.defineProperty(ss, "__esModule", { value: !0 });
    ss.DifferentialDownloader = void 0;
    var On = fe(),
        Ua = rt(),
        ZT = require("fs"),
        eO = qa(),
        tO = require("url"),
        is = es(),
        Lm = Fm(),
        rO = qm(),
        Ma = class {
            constructor(t, r, n) {
                (this.blockAwareFileInfo = t),
                    (this.httpExecutor = r),
                    (this.options = n),
                    (this.fileMetadataBuffer = null),
                    (this.logger = n.logger);
            }
            createRequestOptions() {
                let t = { headers: { ...this.options.requestHeaders, accept: "*/*" } };
                return (0, On.configureRequestUrl)(this.options.newUrl, t), (0, On.configureRequestOptions)(t), t;
            }
            doDownload(t, r) {
                if (t.version !== r.version)
                    throw new Error(
                        "version is different (".concat(t.version, " - ").concat(r.version, "), full download is required")
                    );
                let n = this.logger,
                    i = (0, is.computeOperations)(t, r, n);
                n.debug != null && n.debug(JSON.stringify(i, null, 2));
                let s = 0,
                    o = 0;
                for (let l of i) {
                    let h = l.end - l.start;
                    l.kind === is.OperationKind.DOWNLOAD ? (s += h) : (o += h);
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
                            .concat($m(a), ", To download: ")
                            .concat($m(s), " (")
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
                                (0, Ua.close)(i.descriptor).catch(s => {
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
                let n = await (0, Ua.open)(this.options.oldFile, "r");
                r.push({ descriptor: n, path: this.options.oldFile });
                let i = await (0, Ua.open)(this.options.newFile, "w");
                r.push({ descriptor: i, path: this.options.newFile });
                let s = (0, ZT.createWriteStream)(this.options.newFile, { fd: i });
                await new Promise((o, a) => {
                    let l = [],
                        h;
                    if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
                        let T = [],
                            C = 0;
                        for (let $ of t)
                            $.kind === is.OperationKind.DOWNLOAD && (T.push($.end - $.start), (C += $.end - $.start));
                        let N = { expectedByteCounts: T, grandTotal: C };
                        (h = new rO.ProgressDifferentialDownloadCallbackTransform(
                            N,
                            this.options.cancellationToken,
                            this.options.onProgress
                        )),
                            l.push(h);
                    }
                    let c = new On.DigestTransform(this.blockAwareFileInfo.sha512);
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
                        (p = (0, Lm.executeTasksUsingMultipleRangeRequests)(this, t, m, n, a)), p(0);
                        return;
                    }
                    let _ = 0,
                        v = null;
                    this.logger.info("Differential download: ".concat(this.options.newUrl));
                    let S = this.createRequestOptions();
                    (S.redirect = "manual"),
                        (p = T => {
                            var C, N;
                            if (T >= t.length) {
                                this.fileMetadataBuffer != null && m.write(this.fileMetadataBuffer), m.end();
                                return;
                            }
                            let $ = t[T++];
                            if ($.kind === is.OperationKind.COPY) {
                                h && h.beginFileCopy(), (0, eO.copyData)($, m, n, a, () => p(T));
                                return;
                            }
                            let Ue = "bytes=".concat($.start, "-").concat($.end - 1);
                            (S.headers.range = Ue),
                                (N = (C = this.logger) === null || C === void 0 ? void 0 : C.debug) === null ||
                                    N === void 0 ||
                                    N.call(C, "download range: ".concat(Ue)),
                                h && h.beginRangeDownload();
                            let X = this.httpExecutor.createRequest(S, de => {
                                de.on("error", a),
                                    de.on("aborted", () => {
                                        a(new Error("response has been aborted by the server"));
                                    }),
                                    de.statusCode >= 400 && a((0, On.createHttpError)(de)),
                                    de.pipe(m, { end: !1 }),
                                    de.once("end", () => {
                                        h && h.endRangeDownload(), ++_ === 100 ? ((_ = 0), setTimeout(() => p(T), 1e3)) : p(T);
                                    });
                            });
                            X.on("redirect", (de, E, P) => {
                                this.logger.info("Redirect to ".concat(nO(P))),
                                    (v = P),
                                    (0, On.configureRequestUrl)(new tO.URL(v), S),
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
                        (0, Lm.checkIsRangesSupported)(o, i) &&
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
    ss.DifferentialDownloader = Ma;
    function $m(e, t = " KB") {
        return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
    }
    function nO(e) {
        let t = e.indexOf("?");
        return t < 0 ? e : e.substring(0, t);
    }
});
var km = w(os => {
    "use strict";
    Object.defineProperty(os, "__esModule", { value: !0 });
    os.GenericDifferentialDownloader = void 0;
    var iO = Ba(),
        ja = class extends iO.DifferentialDownloader {
            download(t, r) {
                return this.doDownload(t, r);
            }
        };
    os.GenericDifferentialDownloader = ja;
});
var ls = w(Nr => {
    "use strict";
    Object.defineProperty(Nr, "__esModule", { value: !0 });
    Nr.NoOpLogger = Nr.AppUpdater = void 0;
    var Oe = fe(),
        sO = require("crypto"),
        oO = require("os"),
        aO = require("events"),
        xr = rt(),
        lO = vi(),
        Ha = Oh(),
        Vt = require("path"),
        Yt = ea(),
        Um = em(),
        uO = nm(),
        Mm = sm(),
        cO = Sa(),
        Ir = zt(),
        Wa = Om(),
        fO = require("zlib"),
        hO = St(),
        dO = km(),
        Ga = class e extends aO.EventEmitter {
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
                return (0, Mm.getNetSession)();
            }
            get logger() {
                return this._logger;
            }
            set logger(t) {
                this._logger = t ?? new as();
            }
            set updateConfigPath(t) {
                (this.clientPromise = null),
                    (this._appUpdateConfigPath = t),
                    (this.configOnDisk = new Ha.Lazy(() => this.loadUpdateConfig()));
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
                    (this.signals = new Ir.UpdaterSignal(this)),
                    (this._appUpdateConfigPath = null),
                    (this.clientPromise = null),
                    (this.stagingUserIdPromise = new Ha.Lazy(() => this.getOrCreateStagingUserId())),
                    (this.configOnDisk = new Ha.Lazy(() => this.loadUpdateConfig())),
                    (this.checkForUpdatesPromise = null),
                    (this.downloadPromise = null),
                    (this.updateInfoAndProvider = null),
                    (this._testOnlyOptions = null),
                    this.on("error", s => {
                        this._logger.error("Error: ".concat(s.stack || s.message));
                    }),
                    r == null
                        ? ((this.app = new uO.ElectronAppAdapter()),
                          (this.httpExecutor = new Mm.ElectronHttpExecutor((s, o) => this.emit("login", s, o))))
                        : ((this.app = r), (this.httpExecutor = null));
                let n = this.app.version,
                    i = (0, Yt.parse)(n);
                if (i == null)
                    throw (0, Oe.newError)(
                        'App version is not a valid semver version: "'.concat(n, '"'),
                        "ERR_UPDATER_INVALID_VERSION"
                    );
                (this.currentVersion = i),
                    (this.allowPrerelease = pO(i)),
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
                    ? (n = new cO.GenericProvider({ provider: "generic", url: t }, this, {
                          ...r,
                          isUseMultipleRangeRequest: (0, Wa.isUrlProbablySupportMultiRangeRequests)(t)
                      }))
                    : (n = (0, Wa.createClient)(t, this, r)),
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
                    s = (0, oO.release)();
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
                    } catch (h) {
                        this._logger.warn(
                            "Failed to compare current OS version("
                                .concat(s, ") with minimum OS version(")
                                .concat(i, "): ")
                                .concat((h.message || h).toString())
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
                            (0, Wa.createClient)(n, this, this.createProviderRuntimeOptions())
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
                this.emit(Ir.UPDATE_DOWNLOADED, t);
            }
            async loadUpdateConfig() {
                return (
                    this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath),
                    (0, lO.load)(await (0, xr.readFile)(this._appUpdateConfigPath, "utf-8"))
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
                    let n = await (0, xr.readFile)(t, "utf-8");
                    if (Oe.UUID.check(n)) return n;
                    this._logger.warn("Staging user id file exists, but content was invalid: ".concat(n));
                } catch (n) {
                    n.code !== "ENOENT" && this._logger.warn("Couldn't read staging user ID, creating a blank one: ".concat(n));
                }
                let r = Oe.UUID.v5((0, sO.randomBytes)(4096), Oe.UUID.OID);
                this._logger.info("Generated new staging user ID: ".concat(r));
                try {
                    await (0, xr.outputFile)(t, r);
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
                this.listenerCount(Ir.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = C => this.emit(Ir.DOWNLOAD_PROGRESS, C));
                let i = t.downloadUpdateOptions.updateInfoAndProvider.info,
                    s = i.version,
                    o = r.packageInfo;
                function a() {
                    let C = decodeURIComponent(t.fileInfo.url.pathname);
                    return C.endsWith(".".concat(t.fileExtension)) ? Vt.basename(C) : t.fileInfo.info.url;
                }
                let l = await this.getOrCreateDownloadHelper(),
                    h = l.cacheDirForPendingUpdate;
                await (0, xr.mkdir)(h, { recursive: !0 });
                let c = a(),
                    f = Vt.join(h, c),
                    m = o == null ? null : Vt.join(h, "package-".concat(s).concat(Vt.extname(o.path) || ".7z")),
                    p = async C => (
                        await l.setDownloadedFile(f, m, i, r, c, C),
                        await t.done({ ...i, downloadedFile: f }),
                        m == null ? [f] : [f, m]
                    ),
                    _ = this._logger,
                    v = await l.validateDownloadedPath(f, i, r, _);
                if (v != null) return (f = v), await p(!1);
                let S = async () => (await l.clear().catch(() => {}), await (0, xr.unlink)(f).catch(() => {})),
                    T = await (0, Um.createTempUpdateFile)("temp-".concat(c), h, _);
                try {
                    await t.task(T, n, m, S),
                        await (0, Oe.retry)(
                            () => (0, xr.rename)(T, f),
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
                    let o = (0, hO.blockmapFiles)(t.url, this.app.version, r.updateInfoAndProvider.info.version);
                    this._logger.info('Download block maps (old: "'.concat(o[0], '", new: ').concat(o[1], ")"));
                    let a = async c => {
                            let f = await this.httpExecutor.downloadToBuffer(c, {
                                headers: r.requestHeaders,
                                cancellationToken: r.cancellationToken
                            });
                            if (f == null || f.length === 0) throw new Error('Blockmap "'.concat(c.href, '" is empty'));
                            try {
                                return JSON.parse((0, fO.gunzipSync)(f).toString());
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
                    this.listenerCount(Ir.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = c => this.emit(Ir.DOWNLOAD_PROGRESS, c));
                    let h = await Promise.all(o.map(c => a(c)));
                    return await new dO.GenericDifferentialDownloader(t.info, this.httpExecutor, l).download(h[0], h[1]), !1;
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
    Nr.AppUpdater = Ga;
    function pO(e) {
        let t = (0, Yt.prerelease)(e);
        return t != null && t.length > 0;
    }
    var as = class {
        info(t) {}
        warn(t) {}
        error(t) {}
    };
    Nr.NoOpLogger = as;
});
var Rr = w(us => {
    "use strict";
    Object.defineProperty(us, "__esModule", { value: !0 });
    us.BaseUpdater = void 0;
    var Bm = require("child_process"),
        mO = ls(),
        Va = class extends mO.AppUpdater {
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
                    (0, Bm.spawnSync)(t, r, { env: { ...process.env, ...n }, encoding: "utf-8", shell: !0 }).stdout.trim()
                );
            }
            async spawnLog(t, r = [], n = void 0, i = "ignore") {
                return (
                    this._logger.info("Executing: ".concat(t, " with args: ").concat(r)),
                    new Promise((s, o) => {
                        try {
                            let a = { stdio: i, env: n, detached: !0 },
                                l = (0, Bm.spawn)(t, r, a);
                            l.on("error", h => {
                                o(h);
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
    us.BaseUpdater = Va;
});
var za = w(cs => {
    "use strict";
    Object.defineProperty(cs, "__esModule", { value: !0 });
    cs.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
    var Pr = rt(),
        gO = Ba(),
        wO = require("zlib"),
        Ya = class extends gO.DifferentialDownloader {
            async download() {
                let t = this.blockAwareFileInfo,
                    r = t.size,
                    n = r - (t.blockMapSize + 4);
                this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
                let i = jm(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
                await this.doDownload(await yO(this.options.oldFile), i);
            }
        };
    cs.FileWithEmbeddedBlockMapDifferentialDownloader = Ya;
    function jm(e) {
        return JSON.parse((0, wO.inflateRawSync)(e).toString());
    }
    async function yO(e) {
        let t = await (0, Pr.open)(e, "r");
        try {
            let r = (await (0, Pr.fstat)(t)).size,
                n = Buffer.allocUnsafe(4);
            await (0, Pr.read)(t, n, 0, n.length, r - n.length);
            let i = Buffer.allocUnsafe(n.readUInt32BE(0));
            return await (0, Pr.read)(t, i, 0, i.length, r - n.length - i.length), await (0, Pr.close)(t), jm(i);
        } catch (r) {
            throw (await (0, Pr.close)(t), r);
        }
    }
});
var Ka = w(fs => {
    "use strict";
    Object.defineProperty(fs, "__esModule", { value: !0 });
    fs.AppImageUpdater = void 0;
    var Hm = fe(),
        Wm = require("child_process"),
        EO = rt(),
        _O = require("fs"),
        xn = require("path"),
        vO = Rr(),
        SO = za(),
        Gm = zt(),
        AO = He(),
        Xa = class extends vO.BaseUpdater {
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
                    n = (0, AO.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
                return this.executeDownload({
                    fileExtension: "AppImage",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, s) => {
                        let o = process.env.APPIMAGE;
                        if (o == null) throw (0, Hm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
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
                            this.listenerCount(Gm.DOWNLOAD_PROGRESS) > 0 &&
                                (l.onProgress = h => this.emit(Gm.DOWNLOAD_PROGRESS, h)),
                                await new SO.FileWithEmbeddedBlockMapDifferentialDownloader(
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
                        a && (await this.httpExecutor.download(n.url, i, s)), await (0, EO.chmod)(i, 493);
                    }
                });
            }
            doInstall(t) {
                let r = process.env.APPIMAGE;
                if (r == null) throw (0, Hm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
                (0, _O.unlinkSync)(r);
                let n,
                    i = xn.basename(r);
                xn.basename(t.installerPath) === i || !/\d+\.\d+\.\d+/.test(i)
                    ? (n = r)
                    : (n = xn.join(xn.dirname(r), xn.basename(t.installerPath))),
                    (0, Wm.execFileSync)("mv", ["-f", t.installerPath, n]),
                    n !== r && this.emit("appimage-filename-updated", n);
                let s = { ...process.env, APPIMAGE_SILENT_INSTALL: "true" };
                return (
                    t.isForceRunAfter
                        ? this.spawnLog(n, [], s)
                        : ((s.APPIMAGE_EXIT_AFTER_INSTALL = "true"), (0, Wm.execFileSync)(n, [], { env: s })),
                    !0
                );
            }
        };
    fs.AppImageUpdater = Xa;
});
var Qa = w(hs => {
    "use strict";
    Object.defineProperty(hs, "__esModule", { value: !0 });
    hs.DebUpdater = void 0;
    var CO = Rr(),
        Vm = zt(),
        bO = He(),
        Ja = class extends CO.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, bO.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
                return this.executeDownload({
                    fileExtension: "deb",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, s) => {
                        this.listenerCount(Vm.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = o => this.emit(Vm.DOWNLOAD_PROGRESS, o)),
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
    hs.DebUpdater = Ja;
});
var el = w(ds => {
    "use strict";
    Object.defineProperty(ds, "__esModule", { value: !0 });
    ds.RpmUpdater = void 0;
    var TO = Rr(),
        Ym = zt(),
        OO = He(),
        Za = class extends TO.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, OO.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
                return this.executeDownload({
                    fileExtension: "rpm",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, s) => {
                        this.listenerCount(Ym.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = o => this.emit(Ym.DOWNLOAD_PROGRESS, o)),
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
    ds.RpmUpdater = Za;
});
var rl = w(ps => {
    "use strict";
    Object.defineProperty(ps, "__esModule", { value: !0 });
    ps.MacUpdater = void 0;
    var zm = fe(),
        Xm = rt(),
        Km = require("fs"),
        Jm = require("path"),
        xO = require("http"),
        IO = ls(),
        NO = He(),
        Qm = require("child_process"),
        Zm = require("crypto"),
        tl = class extends IO.AppUpdater {
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
                        (s = (0, Qm.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes("".concat(i, ": 1"))),
                        n.info("Checked for macOS Rosetta environment (isRosetta=".concat(s, ")"));
                } catch (f) {
                    n.warn("sysctl shell command to check for macOS Rosetta environment failed: ".concat(f));
                }
                let o = !1;
                try {
                    this.debug("Checking for arm64 in uname");
                    let m = (0, Qm.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
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
                let l = (0, NO.findFile)(r, "zip", ["pkg", "dmg"]);
                if (l == null)
                    throw (0, zm.newError)(
                        "ZIP file not provided: ".concat((0, zm.safeStringifyJson)(r)),
                        "ERR_UPDATER_ZIP_FILE_NOT_FOUND"
                    );
                let h = t.updateInfoAndProvider.provider,
                    c = "update.zip";
                return this.executeDownload({
                    fileExtension: "zip",
                    fileInfo: l,
                    downloadUpdateOptions: t,
                    task: async (f, m) => {
                        let p = Jm.join(this.downloadedUpdateHelper.cacheDir, c),
                            _ = () =>
                                (0, Xm.pathExistsSync)(p)
                                    ? !t.disableDifferentialDownload
                                    : (n.info(
                                          "Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"
                                      ),
                                      !1),
                            v = !0;
                        _() && (v = await this.differentialDownloadInstaller(l, t, f, h, c)),
                            v && (await this.httpExecutor.download(l.url, f, m));
                    },
                    done: f => {
                        if (!t.disableDifferentialDownload)
                            try {
                                let m = Jm.join(this.downloadedUpdateHelper.cacheDir, c);
                                (0, Km.copyFileSync)(f.downloadedFile, m);
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
                    s = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, Xm.stat)(i)).size,
                    o = this._logger,
                    a = "fileToProxy=".concat(t.url.href);
                this.closeServerIfExists(),
                    this.debug("Creating proxy server for native Squirrel.Mac (".concat(a, ")")),
                    (this.server = (0, xO.createServer)()),
                    this.debug("Proxy server for native Squirrel.Mac is created (".concat(a, ")")),
                    this.server.on("close", () => {
                        o.info("Proxy server for native Squirrel.Mac is closed (".concat(a, ")"));
                    });
                let l = h => {
                    let c = h.address();
                    return typeof c == "string" ? c : "http://127.0.0.1:".concat(c?.port);
                };
                return await new Promise((h, c) => {
                    let f = (0, Zm.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"),
                        m = Buffer.from("autoupdater:".concat(f), "ascii"),
                        p = "/".concat((0, Zm.randomBytes)(64).toString("hex"), ".zip");
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
                            let N = _.headers.authorization.split(" ")[1],
                                $ = Buffer.from(N, "base64").toString("ascii"),
                                [Ue, X] = $.split(":");
                            if (Ue !== "autoupdater" || X !== f) {
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
                            T || (this.nativeUpdater.removeListener("error", c), h([]));
                        });
                        let C = (0, Km.createReadStream)(i);
                        C.on("error", N => {
                            try {
                                v.end();
                            } catch ($) {
                                o.warn("cannot end response: ".concat($));
                            }
                            (T = !0),
                                this.nativeUpdater.removeListener("error", c),
                                c(new Error('Cannot pipe "'.concat(i, '": ').concat(N)));
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
                                    : h([]);
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
    ps.MacUpdater = tl;
});
var ng = w(il => {
    "use strict";
    Object.defineProperty(il, "__esModule", { value: !0 });
    il.verifySignature = PO;
    var eg = fe(),
        rg = require("child_process"),
        RO = require("os"),
        tg = require("path");
    function PO(e, t, r) {
        return new Promise((n, i) => {
            let s = t.replace(/'/g, "''");
            r.info("Verifying signature ".concat(s)),
                (0, rg.execFile)(
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
                        var h;
                        try {
                            if (o != null || l) {
                                nl(r, o, l, i), n(null);
                                return;
                            }
                            let c = DO(a);
                            if (c.Status === 0) {
                                try {
                                    let _ = tg.normalize(c.Path),
                                        v = tg.normalize(t);
                                    if ((r.info("LiteralPath: ".concat(_, ". Update Path: ").concat(v)), _ !== v)) {
                                        nl(r, new Error("LiteralPath of ".concat(_, " is different than ").concat(v)), l, i),
                                            n(null);
                                        return;
                                    }
                                } catch (_) {
                                    r.warn(
                                        "Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ".concat(
                                            (h = _.message) !== null && h !== void 0 ? h : _.stack
                                        )
                                    );
                                }
                                let m = (0, eg.parseDn)(c.SignerCertificate.Subject),
                                    p = !1;
                                for (let _ of e) {
                                    let v = (0, eg.parseDn)(_);
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
                            nl(r, c, null, i), n(null);
                            return;
                        }
                    }
                );
        });
    }
    function DO(e) {
        let t = JSON.parse(e);
        delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
        let r = t.SignerCertificate;
        return (
            r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName),
            t
        );
    }
    function nl(e, t, r, n) {
        if (FO()) {
            e.warn(
                "Cannot execute Get-AuthenticodeSignature: ".concat(
                    t || r,
                    ". Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher."
                )
            );
            return;
        }
        try {
            (0, rg.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], {
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
    function FO() {
        let e = RO.release();
        return e.startsWith("6.") && !e.startsWith("6.3");
    }
});
var ol = w(gs => {
    "use strict";
    Object.defineProperty(gs, "__esModule", { value: !0 });
    gs.NsisUpdater = void 0;
    var ms = fe(),
        ig = require("path"),
        qO = Rr(),
        LO = za(),
        sg = zt(),
        $O = He(),
        kO = rt(),
        UO = ng(),
        og = require("url"),
        sl = class extends qO.BaseUpdater {
            constructor(t, r) {
                super(t, r), (this._verifyUpdateCodeSignature = (n, i) => (0, UO.verifySignature)(n, i, this._logger));
            }
            get verifyUpdateCodeSignature() {
                return this._verifyUpdateCodeSignature;
            }
            set verifyUpdateCodeSignature(t) {
                t && (this._verifyUpdateCodeSignature = t);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, $O.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
                return this.executeDownload({
                    fileExtension: "exe",
                    downloadUpdateOptions: t,
                    fileInfo: n,
                    task: async (i, s, o, a) => {
                        let l = n.packageInfo,
                            h = l != null && o != null;
                        if (h && t.disableWebInstaller)
                            throw (0, ms.newError)(
                                "Unable to download new version ".concat(
                                    t.updateInfoAndProvider.info.version,
                                    ". Web Installers are disabled"
                                ),
                                "ERR_UPDATER_WEB_INSTALLER_DISABLED"
                            );
                        !h &&
                            !t.disableWebInstaller &&
                            this._logger.warn(
                                "disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."
                            ),
                            (h ||
                                t.disableDifferentialDownload ||
                                (await this.differentialDownloadInstaller(n, t, i, r, ms.CURRENT_APP_INSTALLER_FILE_NAME))) &&
                                (await this.httpExecutor.download(n.url, i, s));
                        let c = await this.verifySignature(i);
                        if (c != null)
                            throw (
                                (await a(),
                                (0, ms.newError)(
                                    "New version "
                                        .concat(t.updateInfoAndProvider.info.version, " is not signed by the application owner: ")
                                        .concat(c),
                                    "ERR_UPDATER_INVALID_SIGNATURE"
                                ))
                            );
                        if (h && (await this.differentialDownloadWebPackage(t, l, o, r)))
                            try {
                                await this.httpExecutor.download(new og.URL(l.path), o, {
                                    headers: t.requestHeaders,
                                    cancellationToken: t.cancellationToken,
                                    sha512: l.sha512
                                });
                            } catch (f) {
                                try {
                                    await (0, kO.unlink)(o);
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
                    this.spawnLog(ig.join(process.resourcesPath, "elevate.exe"), [t.installerPath].concat(r)).catch(s =>
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
                        newUrl: new og.URL(r.path),
                        oldFile: ig.join(this.downloadedUpdateHelper.cacheDir, ms.CURRENT_APP_PACKAGE_FILE_NAME),
                        logger: this._logger,
                        newFile: n,
                        requestHeaders: this.requestHeaders,
                        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
                        cancellationToken: t.cancellationToken
                    };
                    this.listenerCount(sg.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = o => this.emit(sg.DOWNLOAD_PROGRESS, o)),
                        await new LO.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, s).download();
                } catch (s) {
                    return (
                        this._logger.error("Cannot download differentially, fallback to full download: ".concat(s.stack || s)),
                        process.platform === "win32"
                    );
                }
                return !1;
            }
        };
    gs.NsisUpdater = sl;
});
var zt = w(j => {
    "use strict";
    Object.defineProperty(j, "__esModule", { value: !0 });
    j.UpdaterSignal =
        j.UPDATE_DOWNLOADED =
        j.DOWNLOAD_PROGRESS =
        j.NsisUpdater =
        j.MacUpdater =
        j.RpmUpdater =
        j.DebUpdater =
        j.AppImageUpdater =
        j.Provider =
        j.CancellationToken =
        j.NoOpLogger =
        j.AppUpdater =
        j.BaseUpdater =
            void 0;
    var MO = fe();
    Object.defineProperty(j, "CancellationToken", {
        enumerable: !0,
        get: function () {
            return MO.CancellationToken;
        }
    });
    var ag = rt(),
        BO = require("path"),
        jO = Rr();
    Object.defineProperty(j, "BaseUpdater", {
        enumerable: !0,
        get: function () {
            return jO.BaseUpdater;
        }
    });
    var lg = ls();
    Object.defineProperty(j, "AppUpdater", {
        enumerable: !0,
        get: function () {
            return lg.AppUpdater;
        }
    });
    Object.defineProperty(j, "NoOpLogger", {
        enumerable: !0,
        get: function () {
            return lg.NoOpLogger;
        }
    });
    var HO = He();
    Object.defineProperty(j, "Provider", {
        enumerable: !0,
        get: function () {
            return HO.Provider;
        }
    });
    var WO = Ka();
    Object.defineProperty(j, "AppImageUpdater", {
        enumerable: !0,
        get: function () {
            return WO.AppImageUpdater;
        }
    });
    var GO = Qa();
    Object.defineProperty(j, "DebUpdater", {
        enumerable: !0,
        get: function () {
            return GO.DebUpdater;
        }
    });
    var VO = el();
    Object.defineProperty(j, "RpmUpdater", {
        enumerable: !0,
        get: function () {
            return VO.RpmUpdater;
        }
    });
    var YO = rl();
    Object.defineProperty(j, "MacUpdater", {
        enumerable: !0,
        get: function () {
            return YO.MacUpdater;
        }
    });
    var zO = ol();
    Object.defineProperty(j, "NsisUpdater", {
        enumerable: !0,
        get: function () {
            return zO.NsisUpdater;
        }
    });
    var Tt;
    function XO() {
        if (process.platform === "win32") Tt = new (ol().NsisUpdater)();
        else if (process.platform === "darwin") Tt = new (rl().MacUpdater)();
        else {
            Tt = new (Ka().AppImageUpdater)();
            try {
                let e = BO.join(process.resourcesPath, "package-type");
                if (!(0, ag.existsSync)(e)) return Tt;
                console.info("Checking for beta autoupdate feature for deb/rpm distributions");
                let t = (0, ag.readFileSync)(e).toString().trim();
                switch ((console.info("Found package-type:", t), t)) {
                    case "deb":
                        Tt = new (Qa().DebUpdater)();
                        break;
                    case "rpm":
                        Tt = new (el().RpmUpdater)();
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
        return Tt;
    }
    Object.defineProperty(j, "autoUpdater", { enumerable: !0, get: () => Tt || XO() });
    j.DOWNLOAD_PROGRESS = "download-progress";
    j.UPDATE_DOWNLOADED = "update-downloaded";
    var al = class {
        constructor(t) {
            this.emitter = t;
        }
        login(t) {
            ws(this.emitter, "login", t);
        }
        progress(t) {
            ws(this.emitter, j.DOWNLOAD_PROGRESS, t);
        }
        updateDownloaded(t) {
            ws(this.emitter, j.UPDATE_DOWNLOADED, t);
        }
        updateCancelled(t) {
            ws(this.emitter, "update-cancelled", t);
        }
    };
    j.UpdaterSignal = al;
    var KO = !1;
    function ws(e, t, r) {
        KO
            ? e.on(t, (...n) => {
                  console.log("%s %s", t, n), r(...n);
              })
            : e.on(t, r);
    }
});
var Xt = w((DR, ug) => {
    var ze;
    ug.exports =
        ((ze = class {
            static getSourceChannelName(t) {
                return "".concat(ze.WINDOW_SOURCE, "/").concat(t);
            }
            static getTargetChannelName(t) {
                return "".concat(ze.WINDOW_TARGET, "/").concat(t);
            }
        }),
        b(ze, "WINDOW_MAIN", "@main"),
        b(ze, "WINDOW_MAIN_LOGIN", "@main/login"),
        b(ze, "WINDOW_SOURCE", "@source"),
        b(ze, "WINDOW_TARGET", "@target"),
        ze);
});
var ys = w((LR, cg) => {
    var In;
    cg.exports = ((In = class {}), b(In, "WINDOWS", "win32"), b(In, "MACOS", "darwin"), b(In, "LINUX", "linux"), In);
});
var Ot = w((UR, fg) => {
    fg.exports = class {
        constructor(t) {
            b(this, "_oglama");
            this._oglama = t;
        }
    };
});
var dg = w((jR, hg) => {
    var JO = Ot(),
        Es = require("fs"),
        _s = require("path"),
        QO = require("http"),
        ll;
    hg.exports =
        ((ll = class extends JO {
            start() {
                if (this.constructor._instance === null) {
                    let t = _s.join(this._oglama.rootPath, "ssg"),
                        r = this._oglama.config.getPort();
                    this.constructor._instance = new Promise((n, i) => {
                        try {
                            let s = QO.createServer((o, a) => {
                                let l = ".empty";
                                try {
                                    let c = new URL(o.url, "http://0.0.0.0");
                                    l = decodeURIComponent(c.pathname).replace(/^\/+|\/+$/g, "");
                                } catch {}
                                let h = _s.join(t, l);
                                Es.statSync(h, { throwIfNoEntry: !1 })?.isDirectory() && (h = _s.join(h, "index.html")),
                                    Es.access(h, Es.constants.F_OK, c => {
                                        if (c) {
                                            a.writeHead(404, { "Content-Type": "text/plain" }), a.end("Not Found: ".concat(c));
                                            return;
                                        }
                                        Es.readFile(h, (f, m) => {
                                            if (f) {
                                                a.writeHead(500, { "Content-Type": "text/plain" }),
                                                    a.end("Internal Server Error: ".concat(f));
                                                return;
                                            }
                                            let p = _s.extname(h),
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
        b(ll, "_instance", null),
        ll);
});
var mg = w((GR, pg) => {
    var ZO = require("path"),
        ex = Ot();
    pg.exports = class extends ex {
        async start() {
            let t = ZO.join(this._oglama.rootPath, "res", "index.html"),
                r = { extraHeaders: "pragma: no-cache" };
            this._oglama.mainWindow().loadFile(t, r),
                this._oglama.mainLoginWindow().loadFile(t, r),
                this._oglama.mainWindow().hide(),
                this._oglama.mainLoginWindow().show();
        }
    };
});
var wg = w((YR, gg) => {
    var tx = Ot();
    gg.exports = class extends tx {
        error() {
            console.error("%coglama-error", "color:red", ...arguments);
        }
        info() {
            console.info("%coglama-info", "color:lightblue", ...arguments);
        }
    };
});
var Eg = w((XR, yg) => {
    var rx = Ot();
    yg.exports = class extends rx {
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
var vg = w((JR, _g) => {
    var nx = Ot(),
        ix = require("querystring");
    _g.exports = class extends nx {
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
                r = t.query ? n + "?" + ix.stringify(t.query) : n;
            } while (!1);
            return r;
        }
    };
});
var Cg = w((ZR, Ag) => {
    var sx = Ot(),
        Sg = require("fs");
    Ag.exports = class extends sx {
        isFile(t) {
            let r = !1;
            try {
                r = Sg.statSync(t).isFile();
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
                let n = Sg.readFileSync(t);
                r = Buffer.isBuffer(n) ? n.toString() : n;
            } catch (n) {
                this._oglama.log.error("file:readFile", t, n);
            }
            return r;
        }
    };
});
var Kt = w((tP, bg) => {
    var ox = Ot(),
        { ipcMain: ax } = require("electron");
    bg.exports = class extends ox {
        constructor(t) {
            super(t);
        }
        _register(t) {
            if (typeof t == "string")
                for (let r of Object.getOwnPropertyNames(this)) {
                    if (["_", "#"].includes(r[0] || typeof this[r] != "function")) continue;
                    let n = this[r];
                    ax.handle("ipc:".concat(t, ":").concat(r), async (i, ...s) => {
                        let o = null;
                        try {
                            o = typeof n == "function" ? await n(...s) : null;
                        } catch (a) {
                            o = a;
                        }
                        return o;
                    });
                }
        }
    };
});
var Og = w((nP, Tg) => {
    var ul;
    Tg.exports =
        ((ul = class {}),
        b(ul, "AppSrc", {
            K_SRC_INPUTS: "srcInputs",
            K_SRC_OUTPUTS: "srcOutputs",
            K_SRC_WEBSITES: "srcWebsites",
            K_SRC_STATE_MACHINE: "srcStateMachine"
        }),
        ul);
});
var Pg = w((oP, Rg) => {
    var lx = Xt(),
        ux = Kt(),
        { AppSrc: cl } = Og(),
        { app: cx } = require("electron"),
        V = require("path"),
        L = require("fs"),
        xg = 180,
        fx = 1e3,
        fl = "default",
        Ig = "local",
        at,
        Jt,
        xe,
        Qt,
        Zt,
        Nn,
        Ie,
        Dr,
        Rn,
        Fr,
        vs,
        Ng;
    Rg.exports =
        ((Ng = class extends ux {
            constructor(r) {
                super(r);
                k(this, at, {});
                k(this, Jt, {});
                k(this, xe, null);
                k(this, Qt, r => V.join(g(this, xe), "agents", r, "source.json"));
                k(this, Zt, r => V.join(g(this, xe), "agents", r, "settings", "inputs.json"));
                k(this, Nn, r => {
                    let n = null;
                    if (typeof r == "object" && r !== null) {
                        n = {};
                        for (let i of Object.values(cl)) n[i] = Array.isArray(r[i]) ? r[i] : [];
                    }
                    return n;
                });
                k(this, Ie, r => "".concat(r).replace(/\W+/g, ""));
                k(this, Dr, r => "".concat(r).replace(/[^\w\-]+/gi, ""));
                k(this, Rn, r =>
                    ""
                        .concat(r)
                        .replace(/[^\w\-\.]+/gi, "")
                        .replace(/\.{2,}/g, ".")
                );
                k(this, Fr, (r, n = 32) =>
                    ""
                        .concat(r)
                        .trim()
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/\.{2,}/g, ".")
                        .replace(/\-{2,}/g, "-")
                        .replace(/\_{2,}/g, "_")
                        .replace(/[^\w\.\-]+|^[\-\._]+|[\-\._]+$/gi, "")
                        .substring(0, n)
                );
                k(this, vs, (r, n) => {
                    let i = V.resolve(V.join(g(this, xe), "agents", r));
                    return V.resolve(n).startsWith(i);
                });
                b(this, "purge", async r => {
                    let n = !1;
                    if (((r = g(this, Ie).call(this, r)), r.length)) {
                        let i = V.dirname(g(this, Qt).call(this, r));
                        L.existsSync(i) && (L.rmSync(i, { recursive: !0, force: !0 }), (n = !0));
                    }
                    return n;
                });
                b(this, "runSetup", (r, n, i, s = []) => {
                    if (((r = g(this, Ie).call(this, r)), !r.length)) throw new Error("Invalid Agent ID");
                    if (!L.existsSync(n) || !L.statSync(n).isDirectory()) throw new Error("Invalid input path");
                    if (!L.existsSync(i) || !L.statSync(i).isDirectory() || !g(this, vs).call(this, r, i))
                        throw new Error("Invalid run path");
                    for (let o of L.readdirSync(n, { withFileTypes: !0 }))
                        o.isFile() &&
                            (o.name === "inputs.json" || o.name.indexOf("input-") === 0) &&
                            L.copyFileSync(V.join(n, o.name), V.join(i, o.name));
                    return Array.isArray(s) && s.length, !0;
                });
                b(this, "runInit", (r, n = null, i = null, s = null) => {
                    if (((r = g(this, Ie).call(this, r)), !r.length)) throw new Error("Invalid Agent ID");
                    (n = ""
                        .concat(n ?? Ig)
                        .toLowerCase()
                        .replace(/\W+/gi, "")),
                        n.length || (n = Ig),
                        (i = ""
                            .concat(i ?? fl)
                            .toLowerCase()
                            .replace(/\W+/gi, "")),
                        i.length || (i = fl),
                        (!Number.isInteger(s) || s <= 0) && (s = Math.floor(new Date().getTime() / 1e3));
                    let o = "".concat(n, "-").concat(i, "-").concat(s),
                        a = V.join(g(this, xe), "agents", r, "runs", o);
                    return (
                        L.existsSync(a) ||
                            (L.mkdirSync(a, { recursive: !0 }),
                            fl === i && this.runSetup(r, V.join(g(this, xe), "agents", r, "settings"), a)),
                        { runId: o, runPath: a }
                    );
                });
                b(this, "sourceGet", (r, n = !0) => {
                    let i = null;
                    r = g(this, Ie).call(this, r);
                    do {
                        if (!r.length) break;
                        let s = g(this, Qt).call(this, r);
                        if (!L.existsSync(s) || !L.statSync(s).isFile()) break;
                        try {
                            (i = L.readFileSync(s).toString()), n && (i = g(this, Nn).call(this, JSON.parse(i)));
                        } catch {}
                    } while (!1);
                    return i;
                });
                b(this, "sourceSet", (r, n) => {
                    r = g(this, Ie).call(this, r);
                    do {
                        if (!r.length) break;
                        typeof g(this, at)[r] > "u" && (g(this, at)[r] = this.sourceGet(r, !1));
                        let i = JSON.stringify(g(this, Nn).call(this, n), null, 2);
                        if (g(this, at)[r] === i) break;
                        (g(this, at)[r] = i),
                            typeof g(this, Jt)[r] < "u" && clearTimeout(g(this, Jt)[r]),
                            (g(this, Jt)[r] = setTimeout(() => {
                                delete g(this, Jt)[r];
                                let s = g(this, Qt).call(this, r);
                                L.existsSync(s) || L.mkdirSync(V.dirname(s), { recursive: !0 }),
                                    g(this, at)[r] !== "null" ? L.writeFileSync(s, g(this, at)[r]) : L.rmSync(s);
                            }, fx));
                    } while (!1);
                });
                b(this, "inputScalarsGet", r => {
                    let n = {};
                    r = g(this, Ie).call(this, r);
                    do {
                        if (!r.length) break;
                        let i = g(this, Zt).call(this, r);
                        if (!L.existsSync(i) || !L.statSync(i).isFile()) break;
                        try {
                            let s = JSON.parse(L.readFileSync(i).toString());
                            typeof s == "object" && s !== null && (n = s);
                        } catch {}
                    } while (!1);
                    return n;
                });
                b(this, "inputScalarsSet", (r, n) => {
                    r = g(this, Ie).call(this, r);
                    do {
                        if (!r.length) break;
                        let i = g(this, Zt).call(this, r);
                        L.existsSync(i) || L.mkdirSync(V.dirname(i), { recursive: !0 }),
                            L.writeFileSync(i, JSON.stringify(n, null, 2));
                    } while (!1);
                });
                b(this, "inputFilesAdd", (r, n, i) => {
                    let s = [];
                    (r = g(this, Ie).call(this, r)), (n = g(this, Fr).call(this, n));
                    do {
                        if (!r.length || !n.length || !Array.isArray(i) || ((i = i.filter(f => L.existsSync(f))), !i.length))
                            break;
                        let o = this.sourceGet(r);
                        if (typeof o != "object" || o === null) break;
                        let a = o[cl.K_SRC_INPUTS];
                        if (!Array.isArray(a)) break;
                        let l = a.reduce((f, m) => (m.key === n ? m : f), null);
                        if (l?.type !== "files" || !Array.isArray(l.extensions) || !l.extensions.length) break;
                        (i = i.filter(f => {
                            if (!l.extensions.includes(f.replace(/^.*\./g, "").toLowerCase())) return !1;
                            let m = L.statSync(f).size;
                            return Number.isInteger(l.min) && m < l.min * 1048576
                                ? !1
                                : Number.isInteger(l.max) && m > l.max * 1048576
                                ? (console.log(
                                      "\u{1F4E5} \u25C0 inputFilesAdd("
                                          .concat(r, ", ")
                                          .concat(n, ", []): ")
                                          .concat(V.basename(f), " larger than ")
                                          .concat(l.max, "B")
                                  ),
                                  !1)
                                : !0;
                        })),
                            i.length;
                        let h = V.dirname(g(this, Zt).call(this, r));
                        L.existsSync(h) || L.mkdirSync(h, { recursive: !0 });
                        let c = 0;
                        for (let f of L.readdirSync(h, { withFileTypes: !0 }))
                            if (f.isFile() && f.name.indexOf("input-".concat(n, "-")) === 0) {
                                let m = parseInt(f.name.substring("input-".concat(n, "-").length).replace(/^(\d+).*/, "$1"), 10);
                                Number.isInteger(m) && m > 0 && m > c && (c = m);
                            }
                        for (let f of i) {
                            let m = f.replace(/^.*\./g, "").toLowerCase(),
                                p = "input-".concat(n, "-").concat(++c, ".").concat(m);
                            s.push(p), L.copyFileSync(f, V.join(h, p));
                        }
                    } while (!1);
                    return s.length > 0;
                });
                b(this, "inputFilesList", (r, n = null) => {
                    let i = n !== null ? [] : {};
                    do {
                        if (
                            ((r = g(this, Ie).call(this, r)),
                            !r.length || (n !== null && ((n = g(this, Fr).call(this, n)), !n.length)))
                        )
                            break;
                        let s = this.sourceGet(r);
                        if (typeof s != "object" || s === null) break;
                        let o = s[cl.K_SRC_INPUTS];
                        if (
                            !Array.isArray(o) ||
                            (n !== null && o.reduce((h, c) => (c.key === n ? c : h), null)?.type !== "files")
                        )
                            break;
                        let a = V.dirname(g(this, Zt).call(this, r));
                        if (!L.existsSync(a)) break;
                        for (let l of L.readdirSync(a, { withFileTypes: !0 }))
                            if (l.isFile() && l.name.indexOf("input-".concat(n !== null ? "".concat(n, "-") : "")) === 0) {
                                if (n !== null) {
                                    i.push(V.join(a, l.name));
                                    continue;
                                }
                                let h = l.name.replace(/^input-(.*?)\-\d+\..*$/gi, "$1");
                                typeof i[h] > "u" && (i[h] = []), i[h].push(V.join(a, l.name));
                            }
                    } while (!1);
                    return i;
                });
                b(this, "inputFilesDelete", (r, n) => {});
                b(this, "outputFilesInit", (r, n, i) => {
                    if (
                        ((r = g(this, Ie).call(this, r)),
                        (n = g(this, Dr).call(this, n)),
                        (i = g(this, Fr).call(this, i)),
                        !r.length)
                    )
                        throw new Error("Invalid Agent ID");
                    if (!n.length) throw new Error("Invalid Run ID");
                    let s = V.join(g(this, xe), "agents", r, "runs", n);
                    if (!L.existsSync(s)) throw new Error("Run not initialized");
                    if (!i.length) throw new Error("Invalid option key");
                    let o = "png",
                        a = 0,
                        [l, h] = n.split("-");
                    for (let f of L.readdirSync(V.dirname(s), { withFileTypes: !0 })) {
                        if (!f.isDirectory()) continue;
                        let [m, p] = f.name.split("-");
                        if (!(m !== l || p !== h)) {
                            for (let _ of L.readdirSync(V.join(V.dirname(s), f.name), { withFileTypes: !0 }))
                                if (_.isFile() && _.name.indexOf("output-".concat(i, "-")) === 0) {
                                    let v = parseInt(
                                        _.name.substring("output-".concat(i, "-").length).replace(/^(\d+).*/, "$1"),
                                        10
                                    );
                                    Number.isInteger(v) && v > 0 && v > a && (a = v);
                                }
                        }
                    }
                    let c = "output-"
                        .concat(i, "-")
                        .concat(a + 1, ".")
                        .concat(o);
                    return { fileName: c, filePath: V.join(s, c) };
                });
                b(this, "outputFilesAppend", async (r, n, i, s) => {
                    let o = !1;
                    if (
                        ((r = g(this, Ie).call(this, r)),
                        (n = g(this, Dr).call(this, n)),
                        (i = g(this, Rn).call(this, i)),
                        r.length && n.length && i.length)
                    ) {
                        let a = V.join(g(this, xe), "agents", r, "runs", n, i);
                        L.existsSync(V.dirname(a)) && (L.writeFileSync(a, s, { flag: "a" }), (o = !0));
                    }
                    return o;
                });
                b(this, "outputFilesList", (r, n, i = null) => {});
                b(this, "outputFilesDelete", async (r, n, i) => {
                    let s = !1;
                    if (
                        ((r = g(this, Ie).call(this, r)),
                        (n = g(this, Dr).call(this, n)),
                        (i = g(this, Rn).call(this, i)),
                        r.length && n.length && i.length)
                    ) {
                        let o = V.join(g(this, xe), "agents", r, "runs", n, i);
                        L.existsSync(o) && (L.rmSync(o, { force: !0 }), (s = !0));
                    }
                    return s;
                });
                this._register("diskStorage"),
                    te(this, xe, V.join(cx.getPath("appData"), "oglama")),
                    L.existsSync(g(this, xe)) || L.mkdirSync(g(this, xe), { recursive: !0 }),
                    setInterval(() => {
                        let n = Math.floor(new Date().getTime() / 1e3),
                            i = [];
                        L.readdirSync(V.join(g(this, xe), "agents"), { withFileTypes: !0 })
                            .filter(s => s.isDirectory())
                            .map(s => {
                                let o = g(this, Qt).call(this, s.name);
                                if (L.existsSync(o)) {
                                    let a = Math.floor(L.statSync(o).mtime.getTime() / 1e3);
                                    n - a <= xg && i.push(s.name);
                                }
                            }),
                            i.length &&
                                this._oglama.main?.view.webContents.send(lx.WINDOW_MAIN, [
                                    "ipc:disk-storage:agents:commit",
                                    [i],
                                    { type: "req" }
                                ]);
                    }, xg * 1e3);
            }
        }),
        (at = new WeakMap()),
        (Jt = new WeakMap()),
        (xe = new WeakMap()),
        (Qt = new WeakMap()),
        (Zt = new WeakMap()),
        (Nn = new WeakMap()),
        (Ie = new WeakMap()),
        (Dr = new WeakMap()),
        (Rn = new WeakMap()),
        (Fr = new WeakMap()),
        (vs = new WeakMap()),
        Ng);
});
var qg = w((uP, Fg) => {
    var { execSync: hl } = require("child_process"),
        hx = Kt(),
        _e = ys(),
        qr,
        Lr,
        $r,
        xt,
        Dg;
    Fg.exports =
        ((Dg = class extends hx {
            constructor(r) {
                super(r);
                k(this, qr, null);
                k(this, Lr, null);
                k(this, $r, null);
                k(this, xt, null);
                b(this, "getOS", () => {
                    if (typeof g(this, xt) != "string")
                        switch (process.platform) {
                            case _e.MACOS:
                                te(this, xt, "macos");
                                break;
                            case _e.WINDOWS:
                                te(this, xt, "windows");
                                break;
                            case _e.LINUX:
                                te(this, xt, "linux");
                                break;
                        }
                    return g(this, xt);
                });
                b(this, "getName", () => {
                    if (typeof g(this, Lr) != "string") {
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
                                let n = hl(r).toString();
                                te(this, Lr, n.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch {}
                    }
                    return g(this, Lr);
                });
                b(this, "getUUID", () => {
                    if (typeof g(this, qr) != "string") {
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
                                let i = hl(r).toString();
                                switch (process.platform) {
                                    case _e.MACOS:
                                        i = i.replace(/^.*?\bIOPlatformUUID"\s*=\s*"(.*?)".*$/gs, "$1");
                                        break;
                                    case _e.WINDOWS:
                                        i = i.split("REG_SZ")[1];
                                        break;
                                }
                                te(this, qr, i.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch {}
                    }
                    return g(this, qr);
                });
                b(this, "getSerialNumber", () => {
                    if (typeof g(this, $r) != "string") {
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
                                let n = hl(r).toString();
                                switch (process.platform) {
                                    case _e.MACOS:
                                        n = n.replace(/^.*?\bIOPlatformSerialNumber"\s*=\s*"(.*?)".*$/gs, "$1");
                                        break;
                                    case _e.WINDOWS:
                                        n = n.split("SerialNumber")[1];
                                        break;
                                }
                                te(this, $r, n.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch {}
                    }
                    return g(this, $r);
                });
                b(this, "setPostAuth", r => this._oglama.setPostAuth(!!r));
                b(this, "getPostAuth", () => this._oglama.getPostAuth());
                this._register("device");
            }
        }),
        (qr = new WeakMap()),
        (Lr = new WeakMap()),
        ($r = new WeakMap()),
        (xt = new WeakMap()),
        Dg);
});
var Bg = w((hP, Mg) => {
    var { ipcMain: Lg, session: dx, BrowserWindow: $g } = require("electron"),
        kg = require("path"),
        px = Xt(),
        mx = Kt(),
        Z,
        lt,
        Ug;
    Mg.exports =
        ((Ug = class extends mx {
            constructor(r) {
                super(r);
                k(this, Z, {});
                k(this, lt, {});
                b(this, "list", () => Object.keys(g(this, Z)));
                b(this, "closeAll", () => {
                    let r = Object.keys(g(this, Z)).length > 0;
                    for (let n of Object.keys(g(this, Z))) this.close(n);
                    return r;
                });
                b(this, "open", r => {
                    let n = !1;
                    do {
                        if (typeof r != "string" || !r.length) break;
                        if (typeof g(this, Z)[r] < "u") {
                            typeof g(this, Z)[r]?.webContents?.focus == "function" && g(this, Z)[r].webContents.focus();
                            break;
                        }
                        g(this, Z)[r] = new $g({
                            show: !1,
                            minWidth: this._oglama.config.getSourceMinWidth(),
                            minHeight: this._oglama.config.getSourceMinHeight(),
                            width: this._oglama.config.getSourceMinWidth(),
                            height: this._oglama.config.getSourceMinHeight(),
                            icon: kg.join(this._oglama.rootPath, "res/icons/icon.png"),
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
                                preload: kg.join(this._oglama.rootPath, "lib/preloader/entry/source.js"),
                                nodeIntegration: !0,
                                devTools: !1,
                                session: dx.defaultSession,
                                cache: !1,
                                webSecurity: !1,
                                allowRunningInsecureContent: !0,
                                additionalArguments: ["--agent-id=".concat(r)]
                            }
                        });
                        let i = px.getSourceChannelName(r);
                        (g(this, lt)[r] = {
                            channel: i,
                            listener: (s, ...o) => {
                                o.length >= 3 && g(this, Z)[r].webContents.send(i, o);
                            }
                        }),
                            Lg.on(g(this, lt)[r].channel, g(this, lt)[r].listener),
                            g(this, Z)[r].setMenu(null),
                            g(this, Z)[r].on("closed", () => {
                                Lg.off(g(this, lt)[r].channel, g(this, lt)[r].listener),
                                    delete g(this, lt)[r],
                                    delete g(this, Z)[r];
                            }),
                            g(this, Z)[r].webContents.on("did-finish-load", () => {
                                g(this, Z)[r].show(), g(this, Z)[r].webContents.focus();
                            }),
                            g(this, Z)[r].loadURL("http://localhost:".concat(this._oglama.config.getPort(), "/source-code/")),
                            (n = !0);
                    } while (!1);
                    return n;
                });
                b(this, "close", r => {
                    let n = !1;
                    return typeof g(this, Z)[r]?.destroy == "function" && (g(this, Z)[r].destroy(), (n = !0)), n;
                });
                b(this, "webContents", async (r, n, i) => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid Agent ID");
                    if (!(g(this, Z)[r] instanceof $g)) throw new Error("Invalid Agent ID");
                    if (typeof n != "string" || typeof g(this, Z)[r].webContents[n] != "function")
                        throw new Error("Invalid source webContents method: ".concat(n));
                    return (
                        n === "loadURL" && (g(this, Z)[r].metadata.loaded = !0),
                        Array.isArray(i) || (i = []),
                        await g(this, Z)[r].webContents[n](...i)
                    );
                });
                this._register("source");
            }
        }),
        (Z = new WeakMap()),
        (lt = new WeakMap()),
        Ug);
});
var Gg = w((mP, Wg) => {
    var { ipcMain: jg, BrowserView: kr } = require("electron"),
        Hg = require("path"),
        gx = Xt(),
        dl = ys(),
        wx = Kt(),
        Pn,
        Dn,
        Fn,
        qn,
        M,
        Ze,
        et,
        er;
    Wg.exports =
        ((Pn = class extends wx {
            constructor(r) {
                super(r);
                k(this, Dn);
                k(this, Fn);
                k(this, qn, "");
                k(this, M, {});
                k(this, Ze, {});
                k(this, et, "");
                b(this, "setWindowSize", (r, n) => {
                    te(this, Dn, r), te(this, Fn, n), g(this, er).call(this);
                });
                b(this, "list", () => Object.keys(g(this, M)));
                b(this, "removeAll", () => {
                    let r = Object.keys(g(this, M)).length > 0;
                    for (let n of Object.keys(g(this, M))) this.remove(n);
                    return r;
                });
                b(this, "add", (r, n, i = !1) => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid Agent ID");
                    if (typeof n != "string" || !n.match(/^https?:\/\//gi)) throw new Error("Invalid target URL");
                    if (g(this, M)[r] instanceof kr) return !1;
                    let s = new kr({
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
                            preload: Hg.join(this._oglama.rootPath, "lib/preloader/entry/target.js"),
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
                        s.webContents.setUserAgent(g(this, qn)),
                        s.webContents.setZoomLevel(0),
                        s.webContents.setAudioMuted(!0),
                        s.webContents.loadFile(Hg.join(this._oglama.rootPath, "res", "index.html"), {
                            extraHeaders: "pragma: no-cache"
                        }),
                        this._oglama.mainWindow().addBrowserView(s),
                        this._oglama.main.view instanceof kr &&
                            (this._oglama.mainWindow().removeBrowserView(this._oglama.main.view),
                            this._oglama.mainWindow().addBrowserView(this._oglama.main.view)),
                        (g(this, M)[r] = s);
                    let o = gx.getTargetChannelName(r);
                    return (
                        (g(this, Ze)[r] = {
                            channel: o,
                            listener: (a, ...l) => {
                                l.length >= 3 && s.webContents.send(o, l);
                            }
                        }),
                        jg.on(g(this, Ze)[r].channel, g(this, Ze)[r].listener),
                        i ? this.select(r) : g(this, er).call(this),
                        !0
                    );
                });
                b(this, "remove", r => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid Agent ID");
                    if (!(g(this, M)[r] instanceof kr) || typeof g(this, Ze)[r] > "u") return !1;
                    jg.off(g(this, Ze)[r].channel, g(this, Ze)[r].listener), delete g(this, Ze)[r];
                    try {
                        this._oglama.mainWindow().removeBrowserView(g(this, M)[r]);
                    } catch {}
                    try {
                        g(this, M)[r].webContents.destroy();
                    } catch {}
                    return delete g(this, M)[r], r === g(this, et) && te(this, et, ""), g(this, er).call(this), !0;
                });
                b(this, "select", r => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid Agent ID");
                    if (g(this, M)[r] instanceof kr && g(this, et) !== r) {
                        te(this, et, r),
                            g(this, M)[r].metadata.loaded ||
                                ((g(this, M)[r].metadata.loaded = !0),
                                g(this, M)[r].webContents.loadURL(g(this, M)[r].metadata.targetUrl));
                        let n = {};
                        for (let i of Object.keys(g(this, M)).filter(s => s !== r)) n[i] = g(this, M)[i];
                        return (
                            (n[r] = g(this, M)[r]),
                            te(this, M, n),
                            this._oglama.mainWindow().removeBrowserView(g(this, M)[r]),
                            this._oglama.mainWindow().removeBrowserView(this._oglama.main.view),
                            this._oglama.main.onTop
                                ? (this._oglama.mainWindow().addBrowserView(g(this, M)[r]),
                                  this._oglama.mainWindow().addBrowserView(this._oglama.main.view),
                                  this._oglama.main.view.webContents.focus())
                                : (this._oglama.mainWindow().addBrowserView(this._oglama.main.view),
                                  this._oglama.mainWindow().addBrowserView(g(this, M)[r]),
                                  g(this, M)[r].webContents.focus()),
                            g(this, er).call(this),
                            !0
                        );
                    }
                    return !1;
                });
                b(this, "getSelected", () => g(this, et));
                b(this, "openDevTools", r => {
                    let n = !1;
                    do {
                        if (typeof r != "string" || !r.length || typeof g(this, M)[r]?.webContents?.openDevTools != "function")
                            break;
                        g(this, M)[r].webContents.openDevTools({ mode: "detach" }), (n = !0);
                    } while (!1);
                    return n;
                });
                b(this, "getTargets", () => g(this, M));
                b(this, "webContents", async (r, n, i) => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid Agent ID");
                    if (!(g(this, M)[r] instanceof kr)) throw new Error("Invalid Agent ID");
                    if (typeof n != "string" || typeof g(this, M)[r].webContents[n] != "function")
                        throw new Error("Invalid target webContents method: ".concat(n));
                    return (
                        n === "loadURL" && (g(this, M)[r].metadata.loaded = !0),
                        Array.isArray(i) || (i = []),
                        await g(this, M)[r].webContents[n](...i)
                    );
                });
                k(this, er, () => {
                    if (!Object.keys(g(this, M)).length) return;
                    let r = g(this, Dn) - this.constructor.MARGIN_LEFT,
                        n = g(this, Fn) - (this.constructor.MARGIN_TOP + this.constructor.MARGIN_BOTTOM);
                    for (let i of Object.keys(g(this, M))) {
                        let s = i === g(this, et) ? this.constructor.MARGIN_LEFT : 100 - r,
                            o = i === g(this, et) ? this.constructor.MARGIN_TOP : 50 - n;
                        g(this, M)[i].setBounds({ x: s, y: o, width: r, height: n });
                    }
                });
                let n = "";
                switch (process.platform) {
                    case dl.MACOS:
                        n = "(Macintosh; Intel Mac OS X 13_3)";
                        break;
                    case dl.WINDOWS:
                        n = "(Windows NT 10.0; Win64; x64)";
                        break;
                    case dl.LINUX:
                        n = "(X11; Linux x86_64)";
                        break;
                }
                te(this, qn, "Mozilla/5.0 ".concat(n, " AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")),
                    this._register("target");
            }
        }),
        (Dn = new WeakMap()),
        (Fn = new WeakMap()),
        (qn = new WeakMap()),
        (M = new WeakMap()),
        (Ze = new WeakMap()),
        (et = new WeakMap()),
        (er = new WeakMap()),
        b(Pn, "MARGIN_LEFT", 250),
        b(Pn, "MARGIN_TOP", 50),
        b(Pn, "MARGIN_BOTTOM", 50),
        Pn);
});
var Xg = w((yP, zg) => {
    var { session: yx, shell: Ex, ipcMain: _x, BrowserView: pl } = require("electron"),
        vx = require("path"),
        Vg = Xt(),
        Sx = Kt(),
        Ss,
        Yg;
    zg.exports =
        ((Yg = class extends Sx {
            constructor(r) {
                super(r);
                b(this, "windowWidth");
                b(this, "windowHeight");
                b(this, "view", null);
                b(this, "darkMode", !0);
                k(this, Ss, () =>
                    this.view instanceof pl
                        ? (this.view.setBounds({ x: 0, y: 0, width: this.windowWidth, height: this.windowHeight }), !0)
                        : !1
                );
                b(this, "init", () =>
                    this.view instanceof pl
                        ? !1
                        : ((this.windowWidth = this._oglama.config.getMainLoginWidth()),
                          (this.windowHeight = this._oglama.config.getMainLoginHeight()),
                          (this.view = new pl({
                              width: this.windowWidth,
                              height: this.windowHeight,
                              resizable: !1,
                              backgroundColor: "#00000000",
                              transparent: !0,
                              webPreferences: {
                                  backgroundThrottling: !1,
                                  imageAnimationPolicy: "noAnimation",
                                  spellcheck: !1,
                                  preload: vx.join(this._oglama.rootPath, "lib/preloader/entry/main.js"),
                                  nodeIntegration: !0,
                                  devTools: !1,
                                  session: yx.defaultSession,
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
                          _x.on(Vg.WINDOW_MAIN_LOGIN, (r, ...n) => {
                              n.length >= 3 && this.view.webContents.send(Vg.WINDOW_MAIN_LOGIN, n);
                          }),
                          this._oglama.mainLoginWindow().addBrowserView(this.view),
                          g(this, Ss).call(this),
                          !0)
                );
                b(this, "openExternal", r => {
                    typeof r == "string" && Ex.openExternal(r);
                });
                this._register("main/login");
            }
        }),
        (Ss = new WeakMap()),
        Yg);
});
var Zg = w((vP, Qg) => {
    var { app: Ax, session: Cx, shell: bx, ipcMain: Tx, BrowserView: As } = require("electron"),
        Ox = require("path"),
        Kg = Xt(),
        xx = Xg(),
        Ix = Kt(),
        Ur,
        Jg;
    Qg.exports =
        ((Jg = class extends Ix {
            constructor(r) {
                super(r);
                b(this, "windowWidth");
                b(this, "windowHeight");
                b(this, "view", null);
                b(this, "onTop", !1);
                b(this, "darkMode", !0);
                b(this, "login", null);
                k(this, Ur, () =>
                    this.view instanceof As
                        ? (this.view.setBounds({ x: 0, y: 0, width: this.windowWidth, height: this.windowHeight }), !0)
                        : !1
                );
                b(this, "init", () =>
                    this.view instanceof As
                        ? !1
                        : ((this.windowWidth = this._oglama.config.getMainMinWidth()),
                          (this.windowHeight = this._oglama.config.getMainMinHeight()),
                          (this.view = new As({
                              width: this.windowWidth,
                              height: this.windowHeight,
                              resizable: !1,
                              backgroundColor: "#00000000",
                              transparent: !0,
                              webPreferences: {
                                  backgroundThrottling: !1,
                                  imageAnimationPolicy: "noAnimation",
                                  spellcheck: !1,
                                  preload: Ox.join(this._oglama.rootPath, "lib/preloader/entry/main.js"),
                                  nodeIntegration: !0,
                                  devTools: !1,
                                  session: Cx.defaultSession,
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
                          Tx.on(Kg.WINDOW_MAIN, (r, ...n) => {
                              n.length >= 3 && this.view.webContents.send(Kg.WINDOW_MAIN, n);
                          }),
                          this._oglama.mainWindow().addBrowserView(this.view),
                          g(this, Ur).call(this),
                          !0)
                );
                b(this, "setWindowSize", (r, n) => {
                    (this.windowWidth = r), (this.windowHeight = n), g(this, Ur).call(this);
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
                                s instanceof As &&
                                    (this._oglama.mainWindow().removeBrowserView(s),
                                    this._oglama.mainWindow().removeBrowserView(this.view),
                                    this._oglama.mainWindow().addBrowserView(this.view),
                                    this._oglama.mainWindow().addBrowserView(s),
                                    s.webContents.focus());
                            }
                        }
                        g(this, Ur).call(this), (n = !0);
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
                    Ax.quit();
                });
                b(this, "getDarkMode", () => this.darkMode);
                b(this, "openExternal", r => {
                    typeof r == "string" && bx.openExternal(r);
                });
                this._register("main"), (this.login = new xx(r));
            }
        }),
        (Ur = new WeakMap()),
        Jg);
});
var s0 = w((CP, i0) => {
    var ml = Xt(),
        { app: gl, session: e0, BrowserWindow: t0 } = require("electron"),
        r0 = require("path"),
        wl = ys(),
        Nx = dg(),
        Rx = mg(),
        Px = wg(),
        Dx = Eg(),
        Fx = vg(),
        qx = Cg(),
        Lx = Pg(),
        $x = qg(),
        kx = Bg(),
        Ux = Gg(),
        Mx = Zg(),
        ne,
        Ln,
        $n,
        We,
        n0;
    i0.exports =
        ((n0 = class {
            constructor() {
                k(this, ne, null);
                k(this, Ln, null);
                k(this, $n, !1);
                k(this, We, null);
                b(this, "rootPath", gl.getAppPath());
                b(this, "devMode", !1);
                b(this, "log", new Px(this));
                b(this, "webserver", new Nx(this));
                b(this, "activity", new Rx(this));
                b(this, "diskStorage", new Lx(this));
                b(this, "device", new $x(this));
                b(this, "source", new kx(this));
                b(this, "target", new Ux(this));
                b(this, "main", new Mx(this));
                b(this, "config", new Dx(this));
                b(this, "file", new qx(this));
                b(this, "utils", new Fx(this));
            }
            mainWindow() {
                let t = this;
                if (g(t, ne) === null) {
                    te(
                        t,
                        ne,
                        new t0({
                            show: !1,
                            minWidth: t.config.getMainMinWidth(),
                            minHeight: t.config.getMainMinHeight(),
                            width: t.config.getMainMinWidth(),
                            height: t.config.getMainMinHeight(),
                            icon: r0.join(t.rootPath, "res/icons/icon.png"),
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
                                session: e0.defaultSession
                            }
                        })
                    ),
                        g(t, ne).setMenu(null),
                        g(t, ne).setMaxListeners(0),
                        g(t, ne).on("closed", () => {
                            te(t, ne, null), gl.quit();
                        });
                    let r = () => {
                        let n = g(t, ne).getSize(),
                            i = [wl.WINDOWS, wl.MACOS].includes(process.platform)
                                ? Math.abs(g(t, ne).getSize()[1] - g(t, ne).getContentSize()[1])
                                : 0,
                            s = [wl.WINDOWS].includes(process.platform)
                                ? Math.abs(g(t, ne).getSize()[0] - g(t, ne).getContentSize()[0])
                                : 0;
                        t.main.setWindowSize(n[0] - s, n[1] - i), t.target.setWindowSize(n[0] - s, n[1] - i);
                    };
                    g(t, ne).on("resize", () => r()),
                        g(t, ne).once("ready-to-show", () => r()),
                        t.main.init(),
                        t.main.view.webContents.on("did-finish-load", () => {
                            t.getPostAuth() && g(t, ne).show(), r();
                        }),
                        g(t, ne).setMenu(null),
                        te(
                            t,
                            Ln,
                            setInterval(() => {
                                if (g(t, ne) === null) {
                                    clearInterval(g(t, Ln));
                                    return;
                                }
                                let n = g(t, ne).getSize();
                                g(t, ne).setSize(n[0] + 1, n[1]), setTimeout(() => g(t, ne).setSize(n[0], n[1]), 250);
                            }, 9e4)
                        );
                }
                return g(t, ne);
            }
            mainLoginWindow() {
                let t = this;
                return (
                    g(t, We) === null &&
                        (te(
                            t,
                            We,
                            new t0({
                                width: t.config.getMainLoginWidth(),
                                height: t.config.getMainLoginHeight(),
                                icon: r0.join(t.rootPath, "res/icons/icon.png"),
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
                                    session: e0.defaultSession
                                }
                            })
                        ),
                        g(t, We).setMenu(null),
                        g(t, We).setMaxListeners(0),
                        g(t, We).on("closed", () => {
                            te(t, We, null), gl.quit();
                        }),
                        t.main?.login?.init(),
                        t.main?.login?.view.webContents.on("did-finish-load", () => {
                            t.getPostAuth() || g(t, We).show();
                        }),
                        g(t, We).setMenu(null)),
                    g(t, We)
                );
            }
            getPostAuth() {
                return g(this, $n);
            }
            setPostAuth(t) {
                let r = !1;
                if (((t = !!t), t !== this.getPostAuth())) {
                    te(this, $n, t);
                    let n = ["ipc:oglama:auth", [t], { type: "req", fromWin: ml.WINDOW_MAIN_LOGIN }];
                    this.main?.login?.view.webContents.send(ml.WINDOW_MAIN_LOGIN, n),
                        setTimeout(() => {
                            this.main?.view.webContents.send(ml.WINDOW_MAIN, n);
                        }, 750),
                        t
                            ? (this.mainWindow().show(), this.mainLoginWindow().hide())
                            : (this.mainWindow().hide(), this.mainLoginWindow().show()),
                        (r = !0);
                }
                return r;
            }
        }),
        (ne = new WeakMap()),
        (Ln = new WeakMap()),
        ($n = new WeakMap()),
        (We = new WeakMap()),
        n0);
});
var { app: ke, BrowserWindow: Bx } = require("electron"),
    { autoUpdater: yl } = zt(),
    jx = s0();
ke.disableHardwareAcceleration();
ke.commandLine.appendSwitch("disable-gpu");
ke.commandLine.appendSwitch("allow-insecure-localhost");
ke.commandLine.appendSwitch("disable-renderer-backgrounding");
ke.commandLine.appendSwitch("disable-background-timer-throttling");
ke.commandLine.appendSwitch("disable-backgrounding-occluded-windows");
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
process.on("uncaughtException", e => {});
var Ge = null;
do {
    if (!ke.requestSingleInstanceLock()) {
        ke.quit();
        break;
    }
    ke.on("second-instance", () => {
        Ge !== null &&
            (Ge.getPostAuth()
                ? (Ge.mainWindow().isMinimized() && Ge.mainWindow().restore(), Ge.mainWindow().show())
                : (Ge.mainLoginWindow().isMinimized() && Ge.mainLoginWindow().restore(), Ge.mainLoginWindow().show()));
    }),
        ke.on("ready", async () => {
            (Ge = new jx()),
                ke.on("activate", () => {
                    Bx.getAllWindows().length === 0 && Ge.activity.start();
                }),
                await Ge.webserver.start(),
                await Ge.activity.start(),
                yl.checkForUpdatesAndNotify();
        }),
        yl.on("update-downloaded", () => {
            dialog
                .showMessageBox({ type: "info", title: "Update ready", message: "Install now?", buttons: ["Yes", "Later"] })
                .then(e => {
                    e.response === 0 && yl.quitAndInstall();
                });
        }),
        ke.on("window-all-closed", () => {
            process.platform !== "darwin" && ke.quit();
        });
} while (!1);
