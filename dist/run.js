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
var t0 = Object.defineProperty;
var yl = e => {
    throw TypeError(e);
};
var r0 = (e, t, r) => (t in e ? t0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r));
var g = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var b = (e, t, r) => r0(e, typeof t != "symbol" ? t + "" : t, r),
    El = (e, t, r) => t.has(e) || yl("Cannot " + r);
var E = (e, t, r) => (El(e, t, "read from private field"), r ? r.call(e) : t.get(e)),
    M = (e, t, r) =>
        t.has(e) ? yl("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r),
    Z = (e, t, r, n) => (El(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
var Fn = g(Zt => {
    "use strict";
    Object.defineProperty(Zt, "__esModule", { value: !0 });
    Zt.CancellationError = Zt.CancellationToken = void 0;
    var n0 = require("events"),
        vs = class extends n0.EventEmitter {
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
                if (this.cancelled) return Promise.reject(new Lr());
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
                                s(new Lr());
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
    Zt.CancellationToken = vs;
    var Lr = class extends Error {
        constructor() {
            super("cancelled");
        }
    };
    Zt.CancellationError = Lr;
});
var vl = g(($x, _l) => {
    var er = 1e3,
        tr = er * 60,
        rr = tr * 60,
        Ot = rr * 24,
        i0 = Ot * 7,
        s0 = Ot * 365.25;
    _l.exports = function (e, t) {
        t = t || {};
        var r = typeof e;
        if (r === "string" && e.length > 0) return o0(e);
        if (r === "number" && isFinite(e)) return t.long ? l0(e) : a0(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
    };
    function o0(e) {
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
                        return r * s0;
                    case "weeks":
                    case "week":
                    case "w":
                        return r * i0;
                    case "days":
                    case "day":
                    case "d":
                        return r * Ot;
                    case "hours":
                    case "hour":
                    case "hrs":
                    case "hr":
                    case "h":
                        return r * rr;
                    case "minutes":
                    case "minute":
                    case "mins":
                    case "min":
                    case "m":
                        return r * tr;
                    case "seconds":
                    case "second":
                    case "secs":
                    case "sec":
                    case "s":
                        return r * er;
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
    function a0(e) {
        var t = Math.abs(e);
        return t >= Ot
            ? Math.round(e / Ot) + "d"
            : t >= rr
            ? Math.round(e / rr) + "h"
            : t >= tr
            ? Math.round(e / tr) + "m"
            : t >= er
            ? Math.round(e / er) + "s"
            : e + "ms";
    }
    function l0(e) {
        var t = Math.abs(e);
        return t >= Ot
            ? qn(e, t, Ot, "day")
            : t >= rr
            ? qn(e, t, rr, "hour")
            : t >= tr
            ? qn(e, t, tr, "minute")
            : t >= er
            ? qn(e, t, er, "second")
            : e + " ms";
    }
    function qn(e, t, r, n) {
        var i = t >= r * 1.5;
        return Math.round(e / r) + " " + n + (i ? "s" : "");
    }
});
var Ss = g((kx, Sl) => {
    function u0(e) {
        (r.debug = r),
            (r.default = r),
            (r.coerce = l),
            (r.disable = o),
            (r.enable = i),
            (r.enabled = a),
            (r.humanize = vl()),
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
                (S[0] = S[0].replace(/%([a-zA-Z%])/g, (z, fe) => {
                    if (z === "%%") return "%";
                    L++;
                    let y = r.formatters[fe];
                    if (typeof y == "function") {
                        let P = S[L];
                        (z = y.call(T, P)), S.splice(L, 1), L--;
                    }
                    return z;
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
    Sl.exports = u0;
});
var Al = g((Fe, Ln) => {
    Fe.formatArgs = f0;
    Fe.save = h0;
    Fe.load = d0;
    Fe.useColors = c0;
    Fe.storage = p0();
    Fe.destroy = (() => {
        let e = !1;
        return () => {
            e ||
                ((e = !0),
                console.warn(
                    "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
                ));
        };
    })();
    Fe.colors = [
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
    function c0() {
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
    function f0(e) {
        if (
            ((e[0] =
                (this.useColors ? "%c" : "") +
                this.namespace +
                (this.useColors ? " %c" : " ") +
                e[0] +
                (this.useColors ? "%c " : " ") +
                "+" +
                Ln.exports.humanize(this.diff)),
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
    Fe.log = console.debug || console.log || (() => {});
    function h0(e) {
        try {
            e ? Fe.storage.setItem("debug", e) : Fe.storage.removeItem("debug");
        } catch {}
    }
    function d0() {
        let e;
        try {
            e = Fe.storage.getItem("debug");
        } catch {}
        return !e && typeof process < "u" && "env" in process && (e = process.env.DEBUG), e;
    }
    function p0() {
        try {
            return localStorage;
        } catch {}
    }
    Ln.exports = Ss()(Fe);
    var { formatters: m0 } = Ln.exports;
    m0.j = function (e) {
        try {
            return JSON.stringify(e);
        } catch (t) {
            return "[UnexpectedJSONParseError]: " + t.message;
        }
    };
});
var Tl = g((Mx, Cl) => {
    "use strict";
    Cl.exports = (e, t = process.argv) => {
        let r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--",
            n = t.indexOf(r + e),
            i = t.indexOf("--");
        return n !== -1 && (i === -1 || n < i);
    };
});
var xl = g((Bx, Ol) => {
    "use strict";
    var g0 = require("os"),
        bl = require("tty"),
        Ue = Tl(),
        { env: ae } = process,
        at;
    Ue("no-color") || Ue("no-colors") || Ue("color=false") || Ue("color=never")
        ? (at = 0)
        : (Ue("color") || Ue("colors") || Ue("color=true") || Ue("color=always")) && (at = 1);
    "FORCE_COLOR" in ae &&
        (ae.FORCE_COLOR === "true"
            ? (at = 1)
            : ae.FORCE_COLOR === "false"
            ? (at = 0)
            : (at = ae.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(ae.FORCE_COLOR, 10), 3)));
    function As(e) {
        return e === 0 ? !1 : { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 };
    }
    function Cs(e, t) {
        if (at === 0) return 0;
        if (Ue("color=16m") || Ue("color=full") || Ue("color=truecolor")) return 3;
        if (Ue("color=256")) return 2;
        if (e && !t && at === void 0) return 0;
        let r = at || 0;
        if (ae.TERM === "dumb") return r;
        if (process.platform === "win32") {
            let n = g0.release().split(".");
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
    function w0(e) {
        let t = Cs(e, e && e.isTTY);
        return As(t);
    }
    Ol.exports = { supportsColor: w0, stdout: As(Cs(!0, bl.isatty(1))), stderr: As(Cs(!0, bl.isatty(2))) };
});
var Il = g((le, $n) => {
    var y0 = require("tty"),
        Un = require("util");
    le.init = T0;
    le.log = S0;
    le.formatArgs = _0;
    le.save = A0;
    le.load = C0;
    le.useColors = E0;
    le.destroy = Un.deprecate(() => {},
    "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    le.colors = [6, 2, 3, 4, 5, 1];
    try {
        let e = xl();
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
    function E0() {
        return "colors" in le.inspectOpts ? !!le.inspectOpts.colors : y0.isatty(process.stderr.fd);
    }
    function _0(e) {
        let { namespace: t, useColors: r } = this;
        if (r) {
            let n = this.color,
                i = "\x1B[3" + (n < 8 ? n : "8;5;" + n),
                s = "  ".concat(i, ";1m").concat(t, " \x1B[0m");
            (e[0] = s + e[0].split("\n").join("\n" + s)), e.push(i + "m+" + $n.exports.humanize(this.diff) + "\x1B[0m");
        } else e[0] = v0() + t + " " + e[0];
    }
    function v0() {
        return le.inspectOpts.hideDate ? "" : new Date().toISOString() + " ";
    }
    function S0(...e) {
        return process.stderr.write(Un.formatWithOptions(le.inspectOpts, ...e) + "\n");
    }
    function A0(e) {
        e ? (process.env.DEBUG = e) : delete process.env.DEBUG;
    }
    function C0() {
        return process.env.DEBUG;
    }
    function T0(e) {
        e.inspectOpts = {};
        let t = Object.keys(le.inspectOpts);
        for (let r = 0; r < t.length; r++) e.inspectOpts[t[r]] = le.inspectOpts[t[r]];
    }
    $n.exports = Ss()(le);
    var { formatters: Nl } = $n.exports;
    Nl.o = function (e) {
        return (
            (this.inspectOpts.colors = this.useColors),
            Un.inspect(e, this.inspectOpts)
                .split("\n")
                .map(t => t.trim())
                .join(" ")
        );
    };
    Nl.O = function (e) {
        return (this.inspectOpts.colors = this.useColors), Un.inspect(e, this.inspectOpts);
    };
});
var Rl = g((Hx, Ts) => {
    typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs
        ? (Ts.exports = Al())
        : (Ts.exports = Il());
});
var Ur = g(bs => {
    "use strict";
    Object.defineProperty(bs, "__esModule", { value: !0 });
    bs.newError = b0;
    function b0(e, t) {
        let r = new Error(e);
        return (r.code = t), r;
    }
});
var xs = g(kn => {
    "use strict";
    Object.defineProperty(kn, "__esModule", { value: !0 });
    kn.ProgressCallbackTransform = void 0;
    var O0 = require("stream"),
        Os = class extends O0.Transform {
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
    kn.ProgressCallbackTransform = Os;
});
var ql = g(Ee => {
    "use strict";
    Object.defineProperty(Ee, "__esModule", { value: !0 });
    Ee.DigestTransform = Ee.HttpExecutor = Ee.HttpError = void 0;
    Ee.createHttpError = Ns;
    Ee.parseJson = q0;
    Ee.configureRequestOptionsFromUrl = Fl;
    Ee.configureRequestUrl = Rs;
    Ee.safeGetHeader = nr;
    Ee.configureRequestOptions = Mn;
    Ee.safeStringifyJson = Bn;
    var x0 = require("crypto"),
        N0 = Rl(),
        I0 = require("fs"),
        R0 = require("stream"),
        Dl = require("url"),
        P0 = Fn(),
        Pl = Ur(),
        D0 = xs(),
        $r = (0, N0.default)("electron-builder");
    function Ns(e, t = null) {
        return new kr(
            e.statusCode || -1,
            "".concat(e.statusCode, " ").concat(e.statusMessage) +
                (t == null ? "" : "\n" + JSON.stringify(t, null, "  ")) +
                "\nHeaders: " +
                Bn(e.headers),
            t
        );
    }
    var F0 = new Map([
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
        kr = class extends Error {
            constructor(t, r = "HTTP error: ".concat(F0.get(t) || t), n = null) {
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
    Ee.HttpError = kr;
    function q0(e) {
        return e.then(t => (t == null || t.length === 0 ? null : JSON.parse(t)));
    }
    var Is = class e {
        constructor() {
            this.maxRedirects = 10;
        }
        request(t, r = new P0.CancellationToken(), n) {
            Mn(t);
            let i = n == null ? void 0 : JSON.stringify(n),
                s = i ? Buffer.from(i) : void 0;
            if (s != null) {
                $r(i);
                let { headers: o, ...a } = t;
                t = { method: "post", headers: { "Content-Type": "application/json", "Content-Length": s.length, ...o }, ...a };
            }
            return this.doApiRequest(t, r, o => o.end(s));
        }
        doApiRequest(t, r, n, i = 0) {
            return (
                $r.enabled && $r("Request: ".concat(Bn(t))),
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
                ($r.enabled &&
                    $r("Response: ".concat(t.statusCode, " ").concat(t.statusMessage, ", request options: ").concat(Bn(r))),
                t.statusCode === 404)
            ) {
                s(
                    Ns(
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
                f = nr(t, "location");
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
                            let p = nr(t, "content-type"),
                                _ =
                                    p != null &&
                                    (Array.isArray(p) ? p.find(v => v.includes("json")) != null : p.includes("json"));
                            s(
                                Ns(
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
                Rs(t, a),
                    Mn(a),
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
                let o = nr(s, "location");
                if (o != null) {
                    n < this.maxRedirects
                        ? this.doDownload(e.prepareRedirectUrlOptions(o, t), r, n++)
                        : r.callback(this.createMaxRedirectError());
                    return;
                }
                r.responseHandler == null ? U0(r, s) : r.responseHandler(s, r.callback);
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
            let n = Fl(t, { ...r }),
                i = n.headers;
            if (i?.authorization) {
                let s = new Dl.URL(t);
                (s.hostname.endsWith(".amazonaws.com") || s.searchParams.has("X-Amz-Credential")) && delete i.authorization;
            }
            return n;
        }
        static retryOnServerError(t, r = 3) {
            for (let n = 0; ; n++)
                try {
                    return t();
                } catch (i) {
                    if (n < r && ((i instanceof kr && i.isServerError()) || i.code === "EPIPE")) continue;
                    throw i;
                }
        }
    };
    Ee.HttpExecutor = Is;
    function Fl(e, t) {
        let r = Mn(t);
        return Rs(new Dl.URL(e), r), r;
    }
    function Rs(e, t) {
        (t.protocol = e.protocol),
            (t.hostname = e.hostname),
            e.port ? (t.port = e.port) : t.port && delete t.port,
            (t.path = e.pathname + e.search);
    }
    var Mr = class extends R0.Transform {
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
                (this.digester = (0, x0.createHash)(r));
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
            if (this._actual == null) throw (0, Pl.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
            if (this._actual !== this.expected)
                throw (0, Pl.newError)(
                    ""
                        .concat(this.algorithm, " checksum mismatch, expected ")
                        .concat(this.expected, ", got ")
                        .concat(this._actual),
                    "ERR_CHECKSUM_MISMATCH"
                );
            return null;
        }
    };
    Ee.DigestTransform = Mr;
    function L0(e, t, r) {
        return e != null && t != null && e !== t
            ? (r(new Error("checksum mismatch: expected ".concat(t, " but got ").concat(e, " (X-Checksum-Sha2 header)"))), !1)
            : !0;
    }
    function nr(e, t) {
        let r = e.headers[t];
        return r == null ? null : Array.isArray(r) ? (r.length === 0 ? null : r[r.length - 1]) : r;
    }
    function U0(e, t) {
        if (!L0(nr(t, "X-Checksum-Sha2"), e.options.sha2, e.callback)) return;
        let r = [];
        if (e.options.onProgress != null) {
            let o = nr(t, "content-length");
            o != null &&
                r.push(new D0.ProgressCallbackTransform(parseInt(o, 10), e.options.cancellationToken, e.options.onProgress));
        }
        let n = e.options.sha512;
        n != null
            ? r.push(
                  new Mr(
                      n,
                      "sha512",
                      n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64"
                  )
              )
            : e.options.sha2 != null && r.push(new Mr(e.options.sha2, "sha256", "hex"));
        let i = (0, I0.createWriteStream)(e.destination);
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
    function Mn(e, t, r) {
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
    function Bn(e, t) {
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
var Ul = g(Hn => {
    "use strict";
    Object.defineProperty(Hn, "__esModule", { value: !0 });
    Hn.githubUrl = $0;
    Hn.getS3LikeProviderBaseUrl = k0;
    function $0(e, t = "github.com") {
        return "".concat(e.protocol || "https", "://").concat(e.host || t);
    }
    function k0(e) {
        let t = e.provider;
        if (t === "s3") return M0(e);
        if (t === "spaces") return B0(e);
        throw new Error("Not supported provider: ".concat(t));
    }
    function M0(e) {
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
        return Ll(t, e.path);
    }
    function Ll(e, t) {
        return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), (e += t)), e;
    }
    function B0(e) {
        if (e.name == null) throw new Error("name is missing");
        if (e.region == null) throw new Error("region is missing");
        return Ll("https://".concat(e.name, ".").concat(e.region, ".digitaloceanspaces.com"), e.path);
    }
});
var $l = g(Ps => {
    "use strict";
    Object.defineProperty(Ps, "__esModule", { value: !0 });
    Ps.parseDn = H0;
    function H0(e) {
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
var jl = g(ir => {
    "use strict";
    Object.defineProperty(ir, "__esModule", { value: !0 });
    ir.nil = ir.UUID = void 0;
    var Bl = require("crypto"),
        Hl = Ur(),
        j0 = "options.name must be either a string or a Buffer",
        kl = (0, Bl.randomBytes)(16);
    kl[0] = kl[0] | 1;
    var jn = {},
        k = [];
    for (let e = 0; e < 256; e++) {
        let t = (e + 256).toString(16).substr(1);
        (jn[t] = e), (k[e] = t);
    }
    var xt = class e {
        constructor(t) {
            (this.ascii = null), (this.binary = null);
            let r = e.check(t);
            if (!r) throw new Error("not a UUID");
            (this.version = r.version), r.format === "ascii" ? (this.ascii = t) : (this.binary = t);
        }
        static v5(t, r) {
            return W0(t, "sha1", 80, r);
        }
        toString() {
            return this.ascii == null && (this.ascii = G0(this.binary)), this.ascii;
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
                                  version: (jn[t[14] + t[15]] & 240) >> 4,
                                  variant: Ml((jn[t[19] + t[20]] & 224) >> 5),
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
                    : { version: (t[r + 6] & 240) >> 4, variant: Ml((t[r + 8] & 224) >> 5), format: "binary" };
            }
            throw (0, Hl.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
        }
        static parse(t) {
            let r = Buffer.allocUnsafe(16),
                n = 0;
            for (let i = 0; i < 16; i++) (r[i] = jn[t[n++] + t[n++]]), (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
            return r;
        }
    };
    ir.UUID = xt;
    xt.OID = xt.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
    function Ml(e) {
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
    var Br;
    (function (e) {
        (e[(e.ASCII = 0)] = "ASCII"), (e[(e.BINARY = 1)] = "BINARY"), (e[(e.OBJECT = 2)] = "OBJECT");
    })(Br || (Br = {}));
    function W0(e, t, r, n, i = Br.ASCII) {
        let s = (0, Bl.createHash)(t);
        if (typeof e != "string" && !Buffer.isBuffer(e)) throw (0, Hl.newError)(j0, "ERR_INVALID_UUID_NAME");
        s.update(n), s.update(e);
        let a = s.digest(),
            l;
        switch (i) {
            case Br.BINARY:
                (a[6] = (a[6] & 15) | r), (a[8] = (a[8] & 63) | 128), (l = a);
                break;
            case Br.OBJECT:
                (a[6] = (a[6] & 15) | r), (a[8] = (a[8] & 63) | 128), (l = new xt(a));
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
    function G0(e) {
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
    ir.nil = new xt("00000000-0000-0000-0000-000000000000");
});
var Wl = g(Wn => {
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
                U(A, "onready");
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
            for (var u = Math.max(e.MAX_BUFFER_LENGTH, 10), A = 0, w = 0, H = t.length; w < H; w++) {
                var se = h[t[w]].length;
                if (se > u)
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
                            J(h, "Max buffer length exceeded: " + t[w]);
                    }
                A = Math.max(A, se);
            }
            var oe = e.MAX_BUFFER_LENGTH - A;
            h.bufferCheckPosition = oe + h.position;
        }
        function i(h) {
            for (var u = 0, A = t.length; u < A; u++) h[t[u]] = "";
        }
        function s(h) {
            Q(h),
                h.cdata !== "" && (R(h, "oncdata", h.cdata), (h.cdata = "")),
                h.script !== "" && (R(h, "onscript", h.script), (h.script = ""));
        }
        r.prototype = {
            end: function () {
                V(this);
            },
            write: Zg,
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
                        set: function (H) {
                            if (!H) return A.removeAllListeners(w), (A._parser["on" + w] = H), H;
                            A.on(w, H);
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
        function Le(h) {
            return h === ">" || I(h);
        }
        function z(h, u) {
            return h.test(u);
        }
        function fe(h, u) {
            return !z(h, u);
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
        for (var P in e.STATE) e.STATE[e.STATE[P]] = P;
        y = e.STATE;
        function U(h, u, A) {
            h[u] && h[u](A);
        }
        function R(h, u, A) {
            h.textNode && Q(h), U(h, u, A);
        }
        function Q(h) {
            (h.textNode = ne(h.opt, h.textNode)), h.textNode && U(h, "ontext", h.textNode), (h.textNode = "");
        }
        function ne(h, u) {
            return h.trim && (u = u.trim()), h.normalize && (u = u.replace(/\s+/g, " ")), u;
        }
        function J(h, u) {
            return (
                Q(h),
                h.trackPosition && (u += "\nLine: " + h.line + "\nColumn: " + h.column + "\nChar: " + h.c),
                (u = new Error(u)),
                (h.error = u),
                U(h, "onerror", u),
                h
            );
        }
        function V(h) {
            return (
                h.sawRoot && !h.closedRoot && F(h, "Unclosed root tag"),
                h.state !== y.BEGIN && h.state !== y.BEGIN_WHITESPACE && h.state !== y.TEXT && J(h, "Unexpected end"),
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
            h.strict && J(h, u);
        }
        function j(h) {
            h.strict || (h.tagName = h.tagName[h.looseCase]());
            var u = h.tags[h.tags.length - 1] || h,
                A = (h.tag = { name: h.tagName, attributes: {} });
            h.opt.xmlns && (A.ns = u.ns), (h.attribList.length = 0), R(h, "onopentagstart", A);
        }
        function re(h, u) {
            var A = h.indexOf(":"),
                w = A < 0 ? ["", h] : h.split(":"),
                H = w[0],
                se = w[1];
            return u && h === "xmlns" && ((H = "xmlns"), (se = "")), { prefix: H, local: se };
        }
        function W(h) {
            if (
                (h.strict || (h.attribName = h.attribName[h.looseCase]()),
                h.attribList.indexOf(h.attribName) !== -1 || h.tag.attributes.hasOwnProperty(h.attribName))
            ) {
                h.attribName = h.attribValue = "";
                return;
            }
            if (h.opt.xmlns) {
                var u = re(h.attribName, !0),
                    A = u.prefix,
                    w = u.local;
                if (A === "xmlns")
                    if (w === "xml" && h.attribValue !== m)
                        F(h, "xml: prefix must be bound to " + m + "\nActual: " + h.attribValue);
                    else if (w === "xmlns" && h.attribValue !== p)
                        F(h, "xmlns: prefix must be bound to " + p + "\nActual: " + h.attribValue);
                    else {
                        var H = h.tag,
                            se = h.tags[h.tags.length - 1] || h;
                        H.ns === se.ns && (H.ns = Object.create(se.ns)), (H.ns[w] = h.attribValue);
                    }
                h.attribList.push([h.attribName, h.attribValue]);
            } else
                (h.tag.attributes[h.attribName] = h.attribValue),
                    R(h, "onattribute", { name: h.attribName, value: h.attribValue });
            h.attribName = h.attribValue = "";
        }
        function ot(h, u) {
            if (h.opt.xmlns) {
                var A = h.tag,
                    w = re(h.tagName);
                (A.prefix = w.prefix),
                    (A.local = w.local),
                    (A.uri = A.ns[w.prefix] || ""),
                    A.prefix && !A.uri && (F(h, "Unbound namespace prefix: " + JSON.stringify(h.tagName)), (A.uri = w.prefix));
                var H = h.tags[h.tags.length - 1] || h;
                A.ns &&
                    H.ns !== A.ns &&
                    Object.keys(A.ns).forEach(function (wl) {
                        R(h, "onopennamespace", { prefix: wl, uri: A.ns[wl] });
                    });
                for (var se = 0, oe = h.attribList.length; se < oe; se++) {
                    var be = h.attribList[se],
                        Oe = be[0],
                        Qt = be[1],
                        he = re(Oe, !0),
                        Ze = he.prefix,
                        e0 = he.local,
                        gl = Ze === "" ? "" : A.ns[Ze] || "",
                        _s = { name: Oe, value: Qt, prefix: Ze, local: e0, uri: gl };
                    Ze && Ze !== "xmlns" && !gl && (F(h, "Unbound namespace prefix: " + JSON.stringify(Ze)), (_s.uri = Ze)),
                        (h.tag.attributes[Oe] = _s),
                        R(h, "onattribute", _s);
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
        function Es(h) {
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
                var H = h.tags[u];
                if (H.name !== w) F(h, "Unexpected close tag");
                else break;
            }
            if (u < 0) {
                F(h, "Unmatched closing tag: " + h.tagName), (h.textNode += "</" + h.tagName + ">"), (h.state = y.TEXT);
                return;
            }
            h.tagName = A;
            for (var se = h.tags.length; se-- > u; ) {
                var oe = (h.tag = h.tags.pop());
                (h.tagName = h.tag.name), R(h, "onclosetag", h.tagName);
                var be = {};
                for (var Oe in oe.ns) be[Oe] = oe.ns[Oe];
                var Qt = h.tags[h.tags.length - 1] || h;
                h.opt.xmlns &&
                    oe.ns !== Qt.ns &&
                    Object.keys(oe.ns).forEach(function (he) {
                        var Ze = oe.ns[he];
                        R(h, "onclosenamespace", { prefix: he, uri: Ze });
                    });
            }
            u === 0 && (h.closedRoot = !0),
                (h.tagName = h.attribValue = h.attribName = ""),
                (h.attribList.length = 0),
                (h.state = y.TEXT);
        }
        function Qg(h) {
            var u = h.entity,
                A = u.toLowerCase(),
                w,
                H = "";
            return h.ENTITIES[u]
                ? h.ENTITIES[u]
                : h.ENTITIES[A]
                ? h.ENTITIES[A]
                : ((u = A),
                  u.charAt(0) === "#" &&
                      (u.charAt(1) === "x"
                          ? ((u = u.slice(2)), (w = parseInt(u, 16)), (H = w.toString(16)))
                          : ((u = u.slice(1)), (w = parseInt(u, 10)), (H = w.toString(10)))),
                  (u = u.replace(/^0+/, "")),
                  isNaN(w) || H.toLowerCase() !== u
                      ? (F(h, "Invalid character entity"), "&" + h.entity + ";")
                      : String.fromCodePoint(w));
        }
        function pl(h, u) {
            u === "<"
                ? ((h.state = y.OPEN_WAKA), (h.startTagPosition = h.position))
                : I(u) || (F(h, "Non-whitespace before first tag."), (h.textNode = u), (h.state = y.TEXT));
        }
        function ml(h, u) {
            var A = "";
            return u < h.length && (A = h.charAt(u)), A;
        }
        function Zg(h) {
            var u = this;
            if (this.error) throw this.error;
            if (u.closed) return J(u, "Cannot write after close. Assign an onready handler.");
            if (h === null) return V(u);
            typeof h == "object" && (h = h.toString());
            for (var A = 0, w = ""; (w = ml(h, A++)), (u.c = w), !!w; )
                switch ((u.trackPosition && (u.position++, w === "\n" ? (u.line++, (u.column = 0)) : u.column++), u.state)) {
                    case y.BEGIN:
                        if (((u.state = y.BEGIN_WHITESPACE), w === "\uFEFF")) continue;
                        pl(u, w);
                        continue;
                    case y.BEGIN_WHITESPACE:
                        pl(u, w);
                        continue;
                    case y.TEXT:
                        if (u.sawRoot && !u.closedRoot) {
                            for (var H = A - 1; w && w !== "<" && w !== "&"; )
                                (w = ml(h, A++)),
                                    w && u.trackPosition && (u.position++, w === "\n" ? (u.line++, (u.column = 0)) : u.column++);
                            u.textNode += h.substring(H, A - 1);
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
                            if (z(v, w)) (u.state = y.OPEN_TAG), (u.tagName = w);
                            else if (w === "/") (u.state = y.CLOSE_TAG), (u.tagName = "");
                            else if (w === "?") (u.state = y.PROC_INST), (u.procInstName = u.procInstBody = "");
                            else {
                                if ((F(u, "Unencoded <"), u.startTagPosition + 1 < u.position)) {
                                    var se = u.position - u.startTagPosition;
                                    w = new Array(se).join(" ") + w;
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
                        z(S, w)
                            ? (u.tagName += w)
                            : (j(u),
                              w === ">"
                                  ? ot(u)
                                  : w === "/"
                                  ? (u.state = y.OPEN_TAG_SLASH)
                                  : (I(w) || F(u, "Invalid character in tag name"), (u.state = y.ATTRIB)));
                        continue;
                    case y.OPEN_TAG_SLASH:
                        w === ">"
                            ? (ot(u, !0), Es(u))
                            : (F(u, "Forward-slash in opening tag not followed by >"), (u.state = y.ATTRIB));
                        continue;
                    case y.ATTRIB:
                        if (I(w)) continue;
                        w === ">"
                            ? ot(u)
                            : w === "/"
                            ? (u.state = y.OPEN_TAG_SLASH)
                            : z(v, w)
                            ? ((u.attribName = w), (u.attribValue = ""), (u.state = y.ATTRIB_NAME))
                            : F(u, "Invalid attribute name");
                        continue;
                    case y.ATTRIB_NAME:
                        w === "="
                            ? (u.state = y.ATTRIB_VALUE)
                            : w === ">"
                            ? (F(u, "Attribute without value"), (u.attribValue = u.attribName), W(u), ot(u))
                            : I(w)
                            ? (u.state = y.ATTRIB_NAME_SAW_WHITE)
                            : z(S, w)
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
                                    ? ot(u)
                                    : z(v, w)
                                    ? ((u.attribName = w), (u.state = y.ATTRIB_NAME))
                                    : (F(u, "Invalid attribute name"), (u.state = y.ATTRIB));
                        }
                        continue;
                    case y.ATTRIB_VALUE:
                        if (I(w)) continue;
                        L(w)
                            ? ((u.q = w), (u.state = y.ATTRIB_VALUE_QUOTED))
                            : (u.opt.unquotedAttributeValues || J(u, "Unquoted attribute value"),
                              (u.state = y.ATTRIB_VALUE_UNQUOTED),
                              (u.attribValue = w));
                        continue;
                    case y.ATTRIB_VALUE_QUOTED:
                        if (w !== u.q) {
                            w === "&" ? (u.state = y.ATTRIB_VALUE_ENTITY_Q) : (u.attribValue += w);
                            continue;
                        }
                        W(u), (u.q = ""), (u.state = y.ATTRIB_VALUE_CLOSED);
                        continue;
                    case y.ATTRIB_VALUE_CLOSED:
                        I(w)
                            ? (u.state = y.ATTRIB)
                            : w === ">"
                            ? ot(u)
                            : w === "/"
                            ? (u.state = y.OPEN_TAG_SLASH)
                            : z(v, w)
                            ? (F(u, "No whitespace between attributes"),
                              (u.attribName = w),
                              (u.attribValue = ""),
                              (u.state = y.ATTRIB_NAME))
                            : F(u, "Invalid attribute name");
                        continue;
                    case y.ATTRIB_VALUE_UNQUOTED:
                        if (!Le(w)) {
                            w === "&" ? (u.state = y.ATTRIB_VALUE_ENTITY_U) : (u.attribValue += w);
                            continue;
                        }
                        W(u), w === ">" ? ot(u) : (u.state = y.ATTRIB);
                        continue;
                    case y.CLOSE_TAG:
                        if (u.tagName)
                            w === ">"
                                ? Es(u)
                                : z(S, w)
                                ? (u.tagName += w)
                                : u.script
                                ? ((u.script += "</" + u.tagName), (u.tagName = ""), (u.state = y.SCRIPT))
                                : (I(w) || F(u, "Invalid tagname in closing tag"), (u.state = y.CLOSE_TAG_SAW_WHITE));
                        else {
                            if (I(w)) continue;
                            fe(v, w)
                                ? u.script
                                    ? ((u.script += "</" + w), (u.state = y.SCRIPT))
                                    : F(u, "Invalid tagname in closing tag.")
                                : (u.tagName = w);
                        }
                        continue;
                    case y.CLOSE_TAG_SAW_WHITE:
                        if (I(w)) continue;
                        w === ">" ? Es(u) : F(u, "Invalid characters in closing tag");
                        continue;
                    case y.TEXT_ENTITY:
                    case y.ATTRIB_VALUE_ENTITY_Q:
                    case y.ATTRIB_VALUE_ENTITY_U:
                        var oe, be;
                        switch (u.state) {
                            case y.TEXT_ENTITY:
                                (oe = y.TEXT), (be = "textNode");
                                break;
                            case y.ATTRIB_VALUE_ENTITY_Q:
                                (oe = y.ATTRIB_VALUE_QUOTED), (be = "attribValue");
                                break;
                            case y.ATTRIB_VALUE_ENTITY_U:
                                (oe = y.ATTRIB_VALUE_UNQUOTED), (be = "attribValue");
                                break;
                        }
                        if (w === ";") {
                            var Oe = Qg(u);
                            u.opt.unparsedEntities && !Object.values(e.XML_ENTITIES).includes(Oe)
                                ? ((u.entity = ""), (u.state = oe), u.write(Oe))
                                : ((u[be] += Oe), (u.entity = ""), (u.state = oe));
                        } else
                            z(u.entity.length ? C : T, w)
                                ? (u.entity += w)
                                : (F(u, "Invalid character in entity name"),
                                  (u[be] += "&" + u.entity + w),
                                  (u.entity = ""),
                                  (u.state = oe));
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
                            H = [],
                            se,
                            oe,
                            be = -1,
                            Oe = arguments.length;
                        if (!Oe) return "";
                        for (var Qt = ""; ++be < Oe; ) {
                            var he = Number(arguments[be]);
                            if (!isFinite(he) || he < 0 || he > 1114111 || u(he) !== he)
                                throw RangeError("Invalid code point: " + he);
                            he <= 65535
                                ? H.push(he)
                                : ((he -= 65536), (se = (he >> 10) + 55296), (oe = (he % 1024) + 56320), H.push(se, oe)),
                                (be + 1 === Oe || H.length > w) && ((Qt += h.apply(null, H)), (H.length = 0));
                        }
                        return Qt;
                    };
                Object.defineProperty
                    ? Object.defineProperty(String, "fromCodePoint", { value: A, configurable: !0, writable: !0 })
                    : (String.fromCodePoint = A);
            })();
    })(typeof Wn > "u" ? (Wn.sax = {}) : Wn);
});
var Vl = g(Hr => {
    "use strict";
    Object.defineProperty(Hr, "__esModule", { value: !0 });
    Hr.XElement = void 0;
    Hr.parseXml = X0;
    var V0 = Wl(),
        Gn = Ur(),
        Vn = class {
            constructor(t) {
                if (
                    ((this.name = t),
                    (this.value = ""),
                    (this.attributes = null),
                    (this.isCData = !1),
                    (this.elements = null),
                    !t)
                )
                    throw (0, Gn.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
                if (!z0(t)) throw (0, Gn.newError)("Invalid element name: ".concat(t), "ERR_XML_ELEMENT_INVALID_NAME");
            }
            attribute(t) {
                let r = this.attributes === null ? null : this.attributes[t];
                if (r == null) throw (0, Gn.newError)('No attribute "'.concat(t, '"'), "ERR_XML_MISSED_ATTRIBUTE");
                return r;
            }
            removeAttribute(t) {
                this.attributes !== null && delete this.attributes[t];
            }
            element(t, r = !1, n = null) {
                let i = this.elementOrNull(t, r);
                if (i === null) throw (0, Gn.newError)(n || 'No element "'.concat(t, '"'), "ERR_XML_MISSED_ELEMENT");
                return i;
            }
            elementOrNull(t, r = !1) {
                if (this.elements === null) return null;
                for (let n of this.elements) if (Gl(n, t, r)) return n;
                return null;
            }
            getElements(t, r = !1) {
                return this.elements === null ? [] : this.elements.filter(n => Gl(n, t, r));
            }
            elementValueOrEmpty(t, r = !1) {
                let n = this.elementOrNull(t, r);
                return n === null ? "" : n.value;
            }
        };
    Hr.XElement = Vn;
    var Y0 = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
    function z0(e) {
        return Y0.test(e);
    }
    function Gl(e, t, r) {
        let n = e.name;
        return n === t || (r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase());
    }
    function X0(e) {
        let t = null,
            r = V0.parser(!0, {}),
            n = [];
        return (
            (r.onopentag = i => {
                let s = new Vn(i.name);
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
var zl = g(Yn => {
    "use strict";
    Object.defineProperty(Yn, "__esModule", { value: !0 });
    Yn.MemoLazy = void 0;
    var Ds = class {
        constructor(t, r) {
            (this.selector = t), (this.creator = r), (this.selected = void 0), (this._value = void 0);
        }
        get hasValue() {
            return this._value !== void 0;
        }
        get value() {
            let t = this.selector();
            if (this._value !== void 0 && Yl(this.selected, t)) return this._value;
            this.selected = t;
            let r = this.creator(t);
            return (this.value = r), r;
        }
        set value(t) {
            this._value = t;
        }
    };
    Yn.MemoLazy = Ds;
    function Yl(e, t) {
        if (typeof e == "object" && e !== null && typeof t == "object" && t !== null) {
            let i = Object.keys(e),
                s = Object.keys(t);
            return i.length === s.length && i.every(o => Yl(e[o], t[o]));
        }
        return e === t;
    }
});
var Kl = g(Fs => {
    "use strict";
    Object.defineProperty(Fs, "__esModule", { value: !0 });
    Fs.retry = Xl;
    var K0 = Fn();
    async function Xl(e, t, r, n = 0, i = 0, s) {
        var o;
        let a = new K0.CancellationToken();
        try {
            return await e();
        } catch (l) {
            if ((!((o = s?.(l)) !== null && o !== void 0) || o) && t > 0 && !a.cancelled)
                return await new Promise(d => setTimeout(d, r + n * i)), await Xl(e, t - 1, r, n, i + 1, s);
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
    D.asArray = nw;
    var Jl = Fn();
    Object.defineProperty(D, "CancellationToken", {
        enumerable: !0,
        get: function () {
            return Jl.CancellationToken;
        }
    });
    Object.defineProperty(D, "CancellationError", {
        enumerable: !0,
        get: function () {
            return Jl.CancellationError;
        }
    });
    var Ve = ql();
    Object.defineProperty(D, "HttpError", {
        enumerable: !0,
        get: function () {
            return Ve.HttpError;
        }
    });
    Object.defineProperty(D, "createHttpError", {
        enumerable: !0,
        get: function () {
            return Ve.createHttpError;
        }
    });
    Object.defineProperty(D, "HttpExecutor", {
        enumerable: !0,
        get: function () {
            return Ve.HttpExecutor;
        }
    });
    Object.defineProperty(D, "DigestTransform", {
        enumerable: !0,
        get: function () {
            return Ve.DigestTransform;
        }
    });
    Object.defineProperty(D, "safeGetHeader", {
        enumerable: !0,
        get: function () {
            return Ve.safeGetHeader;
        }
    });
    Object.defineProperty(D, "configureRequestOptions", {
        enumerable: !0,
        get: function () {
            return Ve.configureRequestOptions;
        }
    });
    Object.defineProperty(D, "configureRequestOptionsFromUrl", {
        enumerable: !0,
        get: function () {
            return Ve.configureRequestOptionsFromUrl;
        }
    });
    Object.defineProperty(D, "safeStringifyJson", {
        enumerable: !0,
        get: function () {
            return Ve.safeStringifyJson;
        }
    });
    Object.defineProperty(D, "parseJson", {
        enumerable: !0,
        get: function () {
            return Ve.parseJson;
        }
    });
    Object.defineProperty(D, "configureRequestUrl", {
        enumerable: !0,
        get: function () {
            return Ve.configureRequestUrl;
        }
    });
    var Ql = Ul();
    Object.defineProperty(D, "getS3LikeProviderBaseUrl", {
        enumerable: !0,
        get: function () {
            return Ql.getS3LikeProviderBaseUrl;
        }
    });
    Object.defineProperty(D, "githubUrl", {
        enumerable: !0,
        get: function () {
            return Ql.githubUrl;
        }
    });
    var J0 = $l();
    Object.defineProperty(D, "parseDn", {
        enumerable: !0,
        get: function () {
            return J0.parseDn;
        }
    });
    var Q0 = jl();
    Object.defineProperty(D, "UUID", {
        enumerable: !0,
        get: function () {
            return Q0.UUID;
        }
    });
    var Z0 = xs();
    Object.defineProperty(D, "ProgressCallbackTransform", {
        enumerable: !0,
        get: function () {
            return Z0.ProgressCallbackTransform;
        }
    });
    var Zl = Vl();
    Object.defineProperty(D, "parseXml", {
        enumerable: !0,
        get: function () {
            return Zl.parseXml;
        }
    });
    Object.defineProperty(D, "XElement", {
        enumerable: !0,
        get: function () {
            return Zl.XElement;
        }
    });
    var ew = Ur();
    Object.defineProperty(D, "newError", {
        enumerable: !0,
        get: function () {
            return ew.newError;
        }
    });
    var tw = zl();
    Object.defineProperty(D, "MemoLazy", {
        enumerable: !0,
        get: function () {
            return tw.MemoLazy;
        }
    });
    var rw = Kl();
    Object.defineProperty(D, "retry", {
        enumerable: !0,
        get: function () {
            return rw.retry;
        }
    });
    D.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe";
    D.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function nw(e) {
        return e == null ? [] : Array.isArray(e) ? e : [e];
    }
});
var xe = g(qs => {
    "use strict";
    qs.fromCallback = function (e) {
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
    qs.fromPromise = function (e) {
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
var tu = g((tN, eu) => {
    var lt = require("constants"),
        iw = process.cwd,
        zn = null,
        sw = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function () {
        return zn || (zn = iw.call(process)), zn;
    };
    try {
        process.cwd();
    } catch {}
    typeof process.chdir == "function" &&
        ((Ls = process.chdir),
        (process.chdir = function (e) {
            (zn = null), Ls.call(process, e);
        }),
        Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Ls));
    var Ls;
    eu.exports = ow;
    function ow(e) {
        lt.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e),
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
            sw === "win32" &&
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
                                  C = function (L, Le, z) {
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
                c.open(f, lt.O_WRONLY | lt.O_SYMLINK, m, function (_, v) {
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
                    var p = c.openSync(f, lt.O_WRONLY | lt.O_SYMLINK, m),
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
            lt.hasOwnProperty("O_SYMLINK") && c.futimes
                ? ((c.lutimes = function (f, m, p, _) {
                      c.open(f, lt.O_SYMLINK, function (v, S) {
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
                      var _ = c.openSync(f, lt.O_SYMLINK),
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
var iu = g((rN, nu) => {
    var ru = require("stream").Stream;
    nu.exports = aw;
    function aw(e) {
        return { ReadStream: t, WriteStream: r };
        function t(n, i) {
            if (!(this instanceof t)) return new t(n, i);
            ru.call(this);
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
            ru.call(this),
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
var ou = g((nN, su) => {
    "use strict";
    su.exports = uw;
    var lw =
        Object.getPrototypeOf ||
        function (e) {
            return e.__proto__;
        };
    function uw(e) {
        if (e === null || typeof e != "object") return e;
        if (e instanceof Object) var t = { __proto__: lw(e) };
        else var t = Object.create(null);
        return (
            Object.getOwnPropertyNames(e).forEach(function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
            }),
            t
        );
    }
});
var _e = g((iN, ks) => {
    var ee = require("fs"),
        cw = tu(),
        fw = iu(),
        hw = ou(),
        Xn = require("util"),
        de,
        Jn;
    typeof Symbol == "function" && typeof Symbol.for == "function"
        ? ((de = Symbol.for("graceful-fs.queue")), (Jn = Symbol.for("graceful-fs.previous")))
        : ((de = "___graceful-fs.queue"), (Jn = "___graceful-fs.previous"));
    function dw() {}
    function uu(e, t) {
        Object.defineProperty(e, de, {
            get: function () {
                return t;
            }
        });
    }
    var Nt = dw;
    Xn.debuglog
        ? (Nt = Xn.debuglog("gfs4"))
        : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
          (Nt = function () {
              var e = Xn.format.apply(Xn, arguments);
              (e = "GFS4: " + e.split(/\n/).join("\nGFS4: ")), console.error(e);
          });
    ee[de] ||
        ((au = global[de] || []),
        uu(ee, au),
        (ee.close = (function (e) {
            function t(r, n) {
                return e.call(ee, r, function (i) {
                    i || lu(), typeof n == "function" && n.apply(this, arguments);
                });
            }
            return Object.defineProperty(t, Jn, { value: e }), t;
        })(ee.close)),
        (ee.closeSync = (function (e) {
            function t(r) {
                e.apply(ee, arguments), lu();
            }
            return Object.defineProperty(t, Jn, { value: e }), t;
        })(ee.closeSync)),
        /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
            process.on("exit", function () {
                Nt(ee[de]), require("assert").equal(ee[de].length, 0);
            }));
    var au;
    global[de] || uu(global, ee[de]);
    ks.exports = Us(hw(ee));
    process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !ee.__patched && ((ks.exports = Us(ee)), (ee.__patched = !0));
    function Us(e) {
        cw(e), (e.gracefulify = Us), (e.createReadStream = Le), (e.createWriteStream = z);
        var t = e.readFile;
        e.readFile = r;
        function r(P, U, R) {
            return typeof U == "function" && ((R = U), (U = null)), Q(P, U, R);
            function Q(ne, J, V, F) {
                return t(ne, J, function (j) {
                    j && (j.code === "EMFILE" || j.code === "ENFILE")
                        ? sr([Q, [ne, J, V], j, F || Date.now(), Date.now()])
                        : typeof V == "function" && V.apply(this, arguments);
                });
            }
        }
        var n = e.writeFile;
        e.writeFile = i;
        function i(P, U, R, Q) {
            return typeof R == "function" && ((Q = R), (R = null)), ne(P, U, R, Q);
            function ne(J, V, F, j, re) {
                return n(J, V, F, function (W) {
                    W && (W.code === "EMFILE" || W.code === "ENFILE")
                        ? sr([ne, [J, V, F, j], W, re || Date.now(), Date.now()])
                        : typeof j == "function" && j.apply(this, arguments);
                });
            }
        }
        var s = e.appendFile;
        s && (e.appendFile = o);
        function o(P, U, R, Q) {
            return typeof R == "function" && ((Q = R), (R = null)), ne(P, U, R, Q);
            function ne(J, V, F, j, re) {
                return s(J, V, F, function (W) {
                    W && (W.code === "EMFILE" || W.code === "ENFILE")
                        ? sr([ne, [J, V, F, j], W, re || Date.now(), Date.now()])
                        : typeof j == "function" && j.apply(this, arguments);
                });
            }
        }
        var a = e.copyFile;
        a && (e.copyFile = l);
        function l(P, U, R, Q) {
            return typeof R == "function" && ((Q = R), (R = 0)), ne(P, U, R, Q);
            function ne(J, V, F, j, re) {
                return a(J, V, F, function (W) {
                    W && (W.code === "EMFILE" || W.code === "ENFILE")
                        ? sr([ne, [J, V, F, j], W, re || Date.now(), Date.now()])
                        : typeof j == "function" && j.apply(this, arguments);
                });
            }
        }
        var d = e.readdir;
        e.readdir = f;
        var c = /^v[0-5]\./;
        function f(P, U, R) {
            typeof U == "function" && ((R = U), (U = null));
            var Q = c.test(process.version)
                ? function (V, F, j, re) {
                      return d(V, ne(V, F, j, re));
                  }
                : function (V, F, j, re) {
                      return d(V, F, ne(V, F, j, re));
                  };
            return Q(P, U, R);
            function ne(J, V, F, j) {
                return function (re, W) {
                    re && (re.code === "EMFILE" || re.code === "ENFILE")
                        ? sr([Q, [J, V, F], re, j || Date.now(), Date.now()])
                        : (W && W.sort && W.sort(), typeof F == "function" && F.call(this, re, W));
                };
            }
        }
        if (process.version.substr(0, 4) === "v0.8") {
            var m = fw(e);
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
                set: function (P) {
                    T = P;
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e, "WriteStream", {
                get: function () {
                    return I;
                },
                set: function (P) {
                    I = P;
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
        var S = I;
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
            y(P.path, P.flags, P.mode, function (U, R) {
                U ? (P.autoClose && P.destroy(), P.emit("error", U)) : ((P.fd = R), P.emit("open", R), P.read());
            });
        }
        function I(P, U) {
            return this instanceof I ? (_.apply(this, arguments), this) : I.apply(Object.create(I.prototype), arguments);
        }
        function L() {
            var P = this;
            y(P.path, P.flags, P.mode, function (U, R) {
                U ? (P.destroy(), P.emit("error", U)) : ((P.fd = R), P.emit("open", R));
            });
        }
        function Le(P, U) {
            return new e.ReadStream(P, U);
        }
        function z(P, U) {
            return new e.WriteStream(P, U);
        }
        var fe = e.open;
        e.open = y;
        function y(P, U, R, Q) {
            return typeof R == "function" && ((Q = R), (R = null)), ne(P, U, R, Q);
            function ne(J, V, F, j, re) {
                return fe(J, V, F, function (W, ot) {
                    W && (W.code === "EMFILE" || W.code === "ENFILE")
                        ? sr([ne, [J, V, F, j], W, re || Date.now(), Date.now()])
                        : typeof j == "function" && j.apply(this, arguments);
                });
            }
        }
        return e;
    }
    function sr(e) {
        Nt("ENQUEUE", e[0].name, e[1]), ee[de].push(e), $s();
    }
    var Kn;
    function lu() {
        for (var e = Date.now(), t = 0; t < ee[de].length; ++t) ee[de][t].length > 2 && ((ee[de][t][3] = e), (ee[de][t][4] = e));
        $s();
    }
    function $s() {
        if ((clearTimeout(Kn), (Kn = void 0), ee[de].length !== 0)) {
            var e = ee[de].shift(),
                t = e[0],
                r = e[1],
                n = e[2],
                i = e[3],
                s = e[4];
            if (i === void 0) Nt("RETRY", t.name, r), t.apply(null, r);
            else if (Date.now() - i >= 6e4) {
                Nt("TIMEOUT", t.name, r);
                var o = r.pop();
                typeof o == "function" && o.call(null, n);
            } else {
                var a = Date.now() - s,
                    l = Math.max(s - i, 1),
                    d = Math.min(l * 1.2, 100);
                a >= d ? (Nt("RETRY", t.name, r), t.apply(null, r.concat([i]))) : ee[de].push(e);
            }
            Kn === void 0 && (Kn = setTimeout($s, 0));
        }
    }
});
var It = g(ut => {
    "use strict";
    var cu = xe().fromCallback,
        Ne = _e(),
        pw = [
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
        ].filter(e => typeof Ne[e] == "function");
    Object.assign(ut, Ne);
    pw.forEach(e => {
        ut[e] = cu(Ne[e]);
    });
    ut.exists = function (e, t) {
        return typeof t == "function" ? Ne.exists(e, t) : new Promise(r => Ne.exists(e, r));
    };
    ut.read = function (e, t, r, n, i, s) {
        return typeof s == "function"
            ? Ne.read(e, t, r, n, i, s)
            : new Promise((o, a) => {
                  Ne.read(e, t, r, n, i, (l, d, c) => {
                      if (l) return a(l);
                      o({ bytesRead: d, buffer: c });
                  });
              });
    };
    ut.write = function (e, t, ...r) {
        return typeof r[r.length - 1] == "function"
            ? Ne.write(e, t, ...r)
            : new Promise((n, i) => {
                  Ne.write(e, t, ...r, (s, o, a) => {
                      if (s) return i(s);
                      n({ bytesWritten: o, buffer: a });
                  });
              });
    };
    typeof Ne.writev == "function" &&
        (ut.writev = function (e, t, ...r) {
            return typeof r[r.length - 1] == "function"
                ? Ne.writev(e, t, ...r)
                : new Promise((n, i) => {
                      Ne.writev(e, t, ...r, (s, o, a) => {
                          if (s) return i(s);
                          n({ bytesWritten: o, buffers: a });
                      });
                  });
        });
    typeof Ne.realpath.native == "function"
        ? (ut.realpath.native = cu(Ne.realpath.native))
        : process.emitWarning(
              "fs.realpath.native is not a function. Is fs being monkey-patched?",
              "Warning",
              "fs-extra-WARN0003"
          );
});
var hu = g((oN, fu) => {
    "use strict";
    var mw = require("path");
    fu.exports.checkPath = function (t) {
        if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(mw.parse(t).root, ""))) {
            let n = new Error("Path contains invalid characters: ".concat(t));
            throw ((n.code = "EINVAL"), n);
        }
    };
});
var gu = g((aN, Ms) => {
    "use strict";
    var du = It(),
        { checkPath: pu } = hu(),
        mu = e => {
            let t = { mode: 511 };
            return typeof e == "number" ? e : { ...t, ...e }.mode;
        };
    Ms.exports.makeDir = async (e, t) => (pu(e), du.mkdir(e, { mode: mu(t), recursive: !0 }));
    Ms.exports.makeDirSync = (e, t) => (pu(e), du.mkdirSync(e, { mode: mu(t), recursive: !0 }));
});
var je = g((lN, wu) => {
    "use strict";
    var gw = xe().fromPromise,
        { makeDir: ww, makeDirSync: Bs } = gu(),
        Hs = gw(ww);
    wu.exports = { mkdirs: Hs, mkdirsSync: Bs, mkdirp: Hs, mkdirpSync: Bs, ensureDir: Hs, ensureDirSync: Bs };
});
var ct = g((uN, Eu) => {
    "use strict";
    var yw = xe().fromPromise,
        yu = It();
    function Ew(e) {
        return yu
            .access(e)
            .then(() => !0)
            .catch(() => !1);
    }
    Eu.exports = { pathExists: yw(Ew), pathExistsSync: yu.existsSync };
});
var js = g((cN, _u) => {
    "use strict";
    var or = _e();
    function _w(e, t, r, n) {
        or.open(e, "r+", (i, s) => {
            if (i) return n(i);
            or.futimes(s, t, r, o => {
                or.close(s, a => {
                    n && n(o || a);
                });
            });
        });
    }
    function vw(e, t, r) {
        let n = or.openSync(e, "r+");
        return or.futimesSync(n, t, r), or.closeSync(n);
    }
    _u.exports = { utimesMillis: _w, utimesMillisSync: vw };
});
var Rt = g((fN, Au) => {
    "use strict";
    var ar = It(),
        ce = require("path"),
        Sw = require("util");
    function Aw(e, t, r) {
        let n = r.dereference ? i => ar.stat(i, { bigint: !0 }) : i => ar.lstat(i, { bigint: !0 });
        return Promise.all([
            n(e),
            n(t).catch(i => {
                if (i.code === "ENOENT") return null;
                throw i;
            })
        ]).then(([i, s]) => ({ srcStat: i, destStat: s }));
    }
    function Cw(e, t, r) {
        let n,
            i = r.dereference ? o => ar.statSync(o, { bigint: !0 }) : o => ar.lstatSync(o, { bigint: !0 }),
            s = i(e);
        try {
            n = i(t);
        } catch (o) {
            if (o.code === "ENOENT") return { srcStat: s, destStat: null };
            throw o;
        }
        return { srcStat: s, destStat: n };
    }
    function Tw(e, t, r, n, i) {
        Sw.callbackify(Aw)(e, t, n, (s, o) => {
            if (s) return i(s);
            let { srcStat: a, destStat: l } = o;
            if (l) {
                if (jr(a, l)) {
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
            return a.isDirectory() && Ws(e, t) ? i(new Error(Qn(e, t, r))) : i(null, { srcStat: a, destStat: l });
        });
    }
    function bw(e, t, r, n) {
        let { srcStat: i, destStat: s } = Cw(e, t, n);
        if (s) {
            if (jr(i, s)) {
                let o = ce.basename(e),
                    a = ce.basename(t);
                if (r === "move" && o !== a && o.toLowerCase() === a.toLowerCase())
                    return { srcStat: i, destStat: s, isChangingCase: !0 };
                throw new Error("Source and destination must not be the same.");
            }
            if (i.isDirectory() && !s.isDirectory())
                throw new Error("Cannot overwrite non-directory '".concat(t, "' with directory '").concat(e, "'."));
            if (!i.isDirectory() && s.isDirectory())
                throw new Error("Cannot overwrite directory '".concat(t, "' with non-directory '").concat(e, "'."));
        }
        if (i.isDirectory() && Ws(e, t)) throw new Error(Qn(e, t, r));
        return { srcStat: i, destStat: s };
    }
    function vu(e, t, r, n, i) {
        let s = ce.resolve(ce.dirname(e)),
            o = ce.resolve(ce.dirname(r));
        if (o === s || o === ce.parse(o).root) return i();
        ar.stat(o, { bigint: !0 }, (a, l) =>
            a ? (a.code === "ENOENT" ? i() : i(a)) : jr(t, l) ? i(new Error(Qn(e, r, n))) : vu(e, t, o, n, i)
        );
    }
    function Su(e, t, r, n) {
        let i = ce.resolve(ce.dirname(e)),
            s = ce.resolve(ce.dirname(r));
        if (s === i || s === ce.parse(s).root) return;
        let o;
        try {
            o = ar.statSync(s, { bigint: !0 });
        } catch (a) {
            if (a.code === "ENOENT") return;
            throw a;
        }
        if (jr(t, o)) throw new Error(Qn(e, r, n));
        return Su(e, t, s, n);
    }
    function jr(e, t) {
        return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
    }
    function Ws(e, t) {
        let r = ce
                .resolve(e)
                .split(ce.sep)
                .filter(i => i),
            n = ce
                .resolve(t)
                .split(ce.sep)
                .filter(i => i);
        return r.reduce((i, s, o) => i && n[o] === s, !0);
    }
    function Qn(e, t, r) {
        return "Cannot ".concat(r, " '").concat(e, "' to a subdirectory of itself, '").concat(t, "'.");
    }
    Au.exports = {
        checkPaths: Tw,
        checkPathsSync: bw,
        checkParentPaths: vu,
        checkParentPathsSync: Su,
        isSrcSubdir: Ws,
        areIdentical: jr
    };
});
var Ru = g((hN, Iu) => {
    "use strict";
    var Ie = _e(),
        Wr = require("path"),
        Ow = je().mkdirs,
        xw = ct().pathExists,
        Nw = js().utimesMillis,
        Gr = Rt();
    function Iw(e, t, r, n) {
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
            Gr.checkPaths(e, t, "copy", r, (i, s) => {
                if (i) return n(i);
                let { srcStat: o, destStat: a } = s;
                Gr.checkParentPaths(e, o, t, "copy", l => (l ? n(l) : r.filter ? bu(Cu, a, e, t, r, n) : Cu(a, e, t, r, n)));
            });
    }
    function Cu(e, t, r, n, i) {
        let s = Wr.dirname(r);
        xw(s, (o, a) => {
            if (o) return i(o);
            if (a) return Zn(e, t, r, n, i);
            Ow(s, l => (l ? i(l) : Zn(e, t, r, n, i)));
        });
    }
    function bu(e, t, r, n, i, s) {
        Promise.resolve(i.filter(r, n)).then(
            o => (o ? e(t, r, n, i, s) : s()),
            o => s(o)
        );
    }
    function Rw(e, t, r, n, i) {
        return n.filter ? bu(Zn, e, t, r, n, i) : Zn(e, t, r, n, i);
    }
    function Zn(e, t, r, n, i) {
        (n.dereference ? Ie.stat : Ie.lstat)(t, (o, a) =>
            o
                ? i(o)
                : a.isDirectory()
                ? $w(a, e, t, r, n, i)
                : a.isFile() || a.isCharacterDevice() || a.isBlockDevice()
                ? Pw(a, e, t, r, n, i)
                : a.isSymbolicLink()
                ? Bw(e, t, r, n, i)
                : a.isSocket()
                ? i(new Error("Cannot copy a socket file: ".concat(t)))
                : a.isFIFO()
                ? i(new Error("Cannot copy a FIFO pipe: ".concat(t)))
                : i(new Error("Unknown file: ".concat(t)))
        );
    }
    function Pw(e, t, r, n, i, s) {
        return t ? Dw(e, r, n, i, s) : Ou(e, r, n, i, s);
    }
    function Dw(e, t, r, n, i) {
        if (n.overwrite) Ie.unlink(r, s => (s ? i(s) : Ou(e, t, r, n, i)));
        else return n.errorOnExist ? i(new Error("'".concat(r, "' already exists"))) : i();
    }
    function Ou(e, t, r, n, i) {
        Ie.copyFile(t, r, s => (s ? i(s) : n.preserveTimestamps ? Fw(e.mode, t, r, i) : ei(r, e.mode, i)));
    }
    function Fw(e, t, r, n) {
        return qw(e) ? Lw(r, e, i => (i ? n(i) : Tu(e, t, r, n))) : Tu(e, t, r, n);
    }
    function qw(e) {
        return (e & 128) === 0;
    }
    function Lw(e, t, r) {
        return ei(e, t | 128, r);
    }
    function Tu(e, t, r, n) {
        Uw(t, r, i => (i ? n(i) : ei(r, e, n)));
    }
    function ei(e, t, r) {
        return Ie.chmod(e, t, r);
    }
    function Uw(e, t, r) {
        Ie.stat(e, (n, i) => (n ? r(n) : Nw(t, i.atime, i.mtime, r)));
    }
    function $w(e, t, r, n, i, s) {
        return t ? xu(r, n, i, s) : kw(e.mode, r, n, i, s);
    }
    function kw(e, t, r, n, i) {
        Ie.mkdir(r, s => {
            if (s) return i(s);
            xu(t, r, n, o => (o ? i(o) : ei(r, e, i)));
        });
    }
    function xu(e, t, r, n) {
        Ie.readdir(e, (i, s) => (i ? n(i) : Nu(s, e, t, r, n)));
    }
    function Nu(e, t, r, n, i) {
        let s = e.pop();
        return s ? Mw(e, s, t, r, n, i) : i();
    }
    function Mw(e, t, r, n, i, s) {
        let o = Wr.join(r, t),
            a = Wr.join(n, t);
        Gr.checkPaths(o, a, "copy", i, (l, d) => {
            if (l) return s(l);
            let { destStat: c } = d;
            Rw(c, o, a, i, f => (f ? s(f) : Nu(e, r, n, i, s)));
        });
    }
    function Bw(e, t, r, n, i) {
        Ie.readlink(t, (s, o) => {
            if (s) return i(s);
            if ((n.dereference && (o = Wr.resolve(process.cwd(), o)), e))
                Ie.readlink(r, (a, l) =>
                    a
                        ? a.code === "EINVAL" || a.code === "UNKNOWN"
                            ? Ie.symlink(o, r, i)
                            : i(a)
                        : (n.dereference && (l = Wr.resolve(process.cwd(), l)),
                          Gr.isSrcSubdir(o, l)
                              ? i(new Error("Cannot copy '".concat(o, "' to a subdirectory of itself, '").concat(l, "'.")))
                              : e.isDirectory() && Gr.isSrcSubdir(l, o)
                              ? i(new Error("Cannot overwrite '".concat(l, "' with '").concat(o, "'.")))
                              : Hw(o, r, i))
                );
            else return Ie.symlink(o, r, i);
        });
    }
    function Hw(e, t, r) {
        Ie.unlink(t, n => (n ? r(n) : Ie.symlink(e, t, r)));
    }
    Iu.exports = Iw;
});
var Lu = g((dN, qu) => {
    "use strict";
    var pe = _e(),
        Vr = require("path"),
        jw = je().mkdirsSync,
        Ww = js().utimesMillisSync,
        Yr = Rt();
    function Gw(e, t, r) {
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
        let { srcStat: n, destStat: i } = Yr.checkPathsSync(e, t, "copy", r);
        return Yr.checkParentPathsSync(e, n, t, "copy"), Vw(i, e, t, r);
    }
    function Vw(e, t, r, n) {
        if (n.filter && !n.filter(t, r)) return;
        let i = Vr.dirname(r);
        return pe.existsSync(i) || jw(i), Pu(e, t, r, n);
    }
    function Yw(e, t, r, n) {
        if (!(n.filter && !n.filter(t, r))) return Pu(e, t, r, n);
    }
    function Pu(e, t, r, n) {
        let s = (n.dereference ? pe.statSync : pe.lstatSync)(t);
        if (s.isDirectory()) return ey(s, e, t, r, n);
        if (s.isFile() || s.isCharacterDevice() || s.isBlockDevice()) return zw(s, e, t, r, n);
        if (s.isSymbolicLink()) return ny(e, t, r, n);
        throw s.isSocket()
            ? new Error("Cannot copy a socket file: ".concat(t))
            : s.isFIFO()
            ? new Error("Cannot copy a FIFO pipe: ".concat(t))
            : new Error("Unknown file: ".concat(t));
    }
    function zw(e, t, r, n, i) {
        return t ? Xw(e, r, n, i) : Du(e, r, n, i);
    }
    function Xw(e, t, r, n) {
        if (n.overwrite) return pe.unlinkSync(r), Du(e, t, r, n);
        if (n.errorOnExist) throw new Error("'".concat(r, "' already exists"));
    }
    function Du(e, t, r, n) {
        return pe.copyFileSync(t, r), n.preserveTimestamps && Kw(e.mode, t, r), Gs(r, e.mode);
    }
    function Kw(e, t, r) {
        return Jw(e) && Qw(r, e), Zw(t, r);
    }
    function Jw(e) {
        return (e & 128) === 0;
    }
    function Qw(e, t) {
        return Gs(e, t | 128);
    }
    function Gs(e, t) {
        return pe.chmodSync(e, t);
    }
    function Zw(e, t) {
        let r = pe.statSync(e);
        return Ww(t, r.atime, r.mtime);
    }
    function ey(e, t, r, n, i) {
        return t ? Fu(r, n, i) : ty(e.mode, r, n, i);
    }
    function ty(e, t, r, n) {
        return pe.mkdirSync(r), Fu(t, r, n), Gs(r, e);
    }
    function Fu(e, t, r) {
        pe.readdirSync(e).forEach(n => ry(n, e, t, r));
    }
    function ry(e, t, r, n) {
        let i = Vr.join(t, e),
            s = Vr.join(r, e),
            { destStat: o } = Yr.checkPathsSync(i, s, "copy", n);
        return Yw(o, i, s, n);
    }
    function ny(e, t, r, n) {
        let i = pe.readlinkSync(t);
        if ((n.dereference && (i = Vr.resolve(process.cwd(), i)), e)) {
            let s;
            try {
                s = pe.readlinkSync(r);
            } catch (o) {
                if (o.code === "EINVAL" || o.code === "UNKNOWN") return pe.symlinkSync(i, r);
                throw o;
            }
            if ((n.dereference && (s = Vr.resolve(process.cwd(), s)), Yr.isSrcSubdir(i, s)))
                throw new Error("Cannot copy '".concat(i, "' to a subdirectory of itself, '").concat(s, "'."));
            if (pe.statSync(r).isDirectory() && Yr.isSrcSubdir(s, i))
                throw new Error("Cannot overwrite '".concat(s, "' with '").concat(i, "'."));
            return iy(i, r);
        } else return pe.symlinkSync(i, r);
    }
    function iy(e, t) {
        return pe.unlinkSync(t), pe.symlinkSync(e, t);
    }
    qu.exports = Gw;
});
var ti = g((pN, Uu) => {
    "use strict";
    var sy = xe().fromCallback;
    Uu.exports = { copy: sy(Ru()), copySync: Lu() };
});
var Vu = g((mN, Gu) => {
    "use strict";
    var $u = _e(),
        Hu = require("path"),
        G = require("assert"),
        zr = process.platform === "win32";
    function ju(e) {
        ["unlink", "chmod", "stat", "lstat", "rmdir", "readdir"].forEach(r => {
            (e[r] = e[r] || $u[r]), (r = r + "Sync"), (e[r] = e[r] || $u[r]);
        }),
            (e.maxBusyTries = e.maxBusyTries || 3);
    }
    function Vs(e, t, r) {
        let n = 0;
        typeof t == "function" && ((r = t), (t = {})),
            G(e, "rimraf: missing path"),
            G.strictEqual(typeof e, "string", "rimraf: path should be a string"),
            G.strictEqual(typeof r, "function", "rimraf: callback function required"),
            G(t, "rimraf: invalid options argument provided"),
            G.strictEqual(typeof t, "object", "rimraf: options should be object"),
            ju(t),
            ku(e, t, function i(s) {
                if (s) {
                    if ((s.code === "EBUSY" || s.code === "ENOTEMPTY" || s.code === "EPERM") && n < t.maxBusyTries) {
                        n++;
                        let o = n * 100;
                        return setTimeout(() => ku(e, t, i), o);
                    }
                    s.code === "ENOENT" && (s = null);
                }
                r(s);
            });
    }
    function ku(e, t, r) {
        G(e),
            G(t),
            G(typeof r == "function"),
            t.lstat(e, (n, i) => {
                if (n && n.code === "ENOENT") return r(null);
                if (n && n.code === "EPERM" && zr) return Mu(e, t, n, r);
                if (i && i.isDirectory()) return ri(e, t, n, r);
                t.unlink(e, s => {
                    if (s) {
                        if (s.code === "ENOENT") return r(null);
                        if (s.code === "EPERM") return zr ? Mu(e, t, s, r) : ri(e, t, s, r);
                        if (s.code === "EISDIR") return ri(e, t, s, r);
                    }
                    return r(s);
                });
            });
    }
    function Mu(e, t, r, n) {
        G(e),
            G(t),
            G(typeof n == "function"),
            t.chmod(e, 438, i => {
                i
                    ? n(i.code === "ENOENT" ? null : r)
                    : t.stat(e, (s, o) => {
                          s ? n(s.code === "ENOENT" ? null : r) : o.isDirectory() ? ri(e, t, r, n) : t.unlink(e, n);
                      });
            });
    }
    function Bu(e, t, r) {
        let n;
        G(e), G(t);
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
        n.isDirectory() ? ni(e, t, r) : t.unlinkSync(e);
    }
    function ri(e, t, r, n) {
        G(e),
            G(t),
            G(typeof n == "function"),
            t.rmdir(e, i => {
                i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM")
                    ? oy(e, t, n)
                    : i && i.code === "ENOTDIR"
                    ? n(r)
                    : n(i);
            });
    }
    function oy(e, t, r) {
        G(e),
            G(t),
            G(typeof r == "function"),
            t.readdir(e, (n, i) => {
                if (n) return r(n);
                let s = i.length,
                    o;
                if (s === 0) return t.rmdir(e, r);
                i.forEach(a => {
                    Vs(Hu.join(e, a), t, l => {
                        if (!o) {
                            if (l) return r((o = l));
                            --s === 0 && t.rmdir(e, r);
                        }
                    });
                });
            });
    }
    function Wu(e, t) {
        let r;
        (t = t || {}),
            ju(t),
            G(e, "rimraf: missing path"),
            G.strictEqual(typeof e, "string", "rimraf: path should be a string"),
            G(t, "rimraf: missing options"),
            G.strictEqual(typeof t, "object", "rimraf: options should be object");
        try {
            r = t.lstatSync(e);
        } catch (n) {
            if (n.code === "ENOENT") return;
            n.code === "EPERM" && zr && Bu(e, t, n);
        }
        try {
            r && r.isDirectory() ? ni(e, t, null) : t.unlinkSync(e);
        } catch (n) {
            if (n.code === "ENOENT") return;
            if (n.code === "EPERM") return zr ? Bu(e, t, n) : ni(e, t, n);
            if (n.code !== "EISDIR") throw n;
            ni(e, t, n);
        }
    }
    function ni(e, t, r) {
        G(e), G(t);
        try {
            t.rmdirSync(e);
        } catch (n) {
            if (n.code === "ENOTDIR") throw r;
            if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM") ay(e, t);
            else if (n.code !== "ENOENT") throw n;
        }
    }
    function ay(e, t) {
        if ((G(e), G(t), t.readdirSync(e).forEach(r => Wu(Hu.join(e, r), t)), zr)) {
            let r = Date.now();
            do
                try {
                    return t.rmdirSync(e, t);
                } catch {}
            while (Date.now() - r < 500);
        } else return t.rmdirSync(e, t);
    }
    Gu.exports = Vs;
    Vs.sync = Wu;
});
var Xr = g((gN, zu) => {
    "use strict";
    var ii = _e(),
        ly = xe().fromCallback,
        Yu = Vu();
    function uy(e, t) {
        if (ii.rm) return ii.rm(e, { recursive: !0, force: !0 }, t);
        Yu(e, t);
    }
    function cy(e) {
        if (ii.rmSync) return ii.rmSync(e, { recursive: !0, force: !0 });
        Yu.sync(e);
    }
    zu.exports = { remove: ly(uy), removeSync: cy };
});
var rc = g((wN, tc) => {
    "use strict";
    var fy = xe().fromPromise,
        Ju = It(),
        Qu = require("path"),
        Zu = je(),
        ec = Xr(),
        Xu = fy(async function (t) {
            let r;
            try {
                r = await Ju.readdir(t);
            } catch {
                return Zu.mkdirs(t);
            }
            return Promise.all(r.map(n => ec.remove(Qu.join(t, n))));
        });
    function Ku(e) {
        let t;
        try {
            t = Ju.readdirSync(e);
        } catch {
            return Zu.mkdirsSync(e);
        }
        t.forEach(r => {
            (r = Qu.join(e, r)), ec.removeSync(r);
        });
    }
    tc.exports = { emptyDirSync: Ku, emptydirSync: Ku, emptyDir: Xu, emptydir: Xu };
});
var oc = g((yN, sc) => {
    "use strict";
    var hy = xe().fromCallback,
        nc = require("path"),
        ft = _e(),
        ic = je();
    function dy(e, t) {
        function r() {
            ft.writeFile(e, "", n => {
                if (n) return t(n);
                t();
            });
        }
        ft.stat(e, (n, i) => {
            if (!n && i.isFile()) return t();
            let s = nc.dirname(e);
            ft.stat(s, (o, a) => {
                if (o)
                    return o.code === "ENOENT"
                        ? ic.mkdirs(s, l => {
                              if (l) return t(l);
                              r();
                          })
                        : t(o);
                a.isDirectory()
                    ? r()
                    : ft.readdir(s, l => {
                          if (l) return t(l);
                      });
            });
        });
    }
    function py(e) {
        let t;
        try {
            t = ft.statSync(e);
        } catch {}
        if (t && t.isFile()) return;
        let r = nc.dirname(e);
        try {
            ft.statSync(r).isDirectory() || ft.readdirSync(r);
        } catch (n) {
            if (n && n.code === "ENOENT") ic.mkdirsSync(r);
            else throw n;
        }
        ft.writeFileSync(e, "");
    }
    sc.exports = { createFile: hy(dy), createFileSync: py };
});
var fc = g((EN, cc) => {
    "use strict";
    var my = xe().fromCallback,
        ac = require("path"),
        ht = _e(),
        lc = je(),
        gy = ct().pathExists,
        { areIdentical: uc } = Rt();
    function wy(e, t, r) {
        function n(i, s) {
            ht.link(i, s, o => {
                if (o) return r(o);
                r(null);
            });
        }
        ht.lstat(t, (i, s) => {
            ht.lstat(e, (o, a) => {
                if (o) return (o.message = o.message.replace("lstat", "ensureLink")), r(o);
                if (s && uc(a, s)) return r(null);
                let l = ac.dirname(t);
                gy(l, (d, c) => {
                    if (d) return r(d);
                    if (c) return n(e, t);
                    lc.mkdirs(l, f => {
                        if (f) return r(f);
                        n(e, t);
                    });
                });
            });
        });
    }
    function yy(e, t) {
        let r;
        try {
            r = ht.lstatSync(t);
        } catch {}
        try {
            let s = ht.lstatSync(e);
            if (r && uc(s, r)) return;
        } catch (s) {
            throw ((s.message = s.message.replace("lstat", "ensureLink")), s);
        }
        let n = ac.dirname(t);
        return ht.existsSync(n) || lc.mkdirsSync(n), ht.linkSync(e, t);
    }
    cc.exports = { createLink: my(wy), createLinkSync: yy };
});
var dc = g((_N, hc) => {
    "use strict";
    var dt = require("path"),
        Kr = _e(),
        Ey = ct().pathExists;
    function _y(e, t, r) {
        if (dt.isAbsolute(e))
            return Kr.lstat(e, n =>
                n ? ((n.message = n.message.replace("lstat", "ensureSymlink")), r(n)) : r(null, { toCwd: e, toDst: e })
            );
        {
            let n = dt.dirname(t),
                i = dt.join(n, e);
            return Ey(i, (s, o) =>
                s
                    ? r(s)
                    : o
                    ? r(null, { toCwd: i, toDst: e })
                    : Kr.lstat(e, a =>
                          a
                              ? ((a.message = a.message.replace("lstat", "ensureSymlink")), r(a))
                              : r(null, { toCwd: e, toDst: dt.relative(n, e) })
                      )
            );
        }
    }
    function vy(e, t) {
        let r;
        if (dt.isAbsolute(e)) {
            if (((r = Kr.existsSync(e)), !r)) throw new Error("absolute srcpath does not exist");
            return { toCwd: e, toDst: e };
        } else {
            let n = dt.dirname(t),
                i = dt.join(n, e);
            if (((r = Kr.existsSync(i)), r)) return { toCwd: i, toDst: e };
            if (((r = Kr.existsSync(e)), !r)) throw new Error("relative srcpath does not exist");
            return { toCwd: e, toDst: dt.relative(n, e) };
        }
    }
    hc.exports = { symlinkPaths: _y, symlinkPathsSync: vy };
});
var gc = g((vN, mc) => {
    "use strict";
    var pc = _e();
    function Sy(e, t, r) {
        if (((r = typeof t == "function" ? t : r), (t = typeof t == "function" ? !1 : t), t)) return r(null, t);
        pc.lstat(e, (n, i) => {
            if (n) return r(null, "file");
            (t = i && i.isDirectory() ? "dir" : "file"), r(null, t);
        });
    }
    function Ay(e, t) {
        let r;
        if (t) return t;
        try {
            r = pc.lstatSync(e);
        } catch {
            return "file";
        }
        return r && r.isDirectory() ? "dir" : "file";
    }
    mc.exports = { symlinkType: Sy, symlinkTypeSync: Ay };
});
var Cc = g((SN, Ac) => {
    "use strict";
    var Cy = xe().fromCallback,
        yc = require("path"),
        We = It(),
        Ec = je(),
        Ty = Ec.mkdirs,
        by = Ec.mkdirsSync,
        _c = dc(),
        Oy = _c.symlinkPaths,
        xy = _c.symlinkPathsSync,
        vc = gc(),
        Ny = vc.symlinkType,
        Iy = vc.symlinkTypeSync,
        Ry = ct().pathExists,
        { areIdentical: Sc } = Rt();
    function Py(e, t, r, n) {
        (n = typeof r == "function" ? r : n),
            (r = typeof r == "function" ? !1 : r),
            We.lstat(t, (i, s) => {
                !i && s.isSymbolicLink()
                    ? Promise.all([We.stat(e), We.stat(t)]).then(([o, a]) => {
                          if (Sc(o, a)) return n(null);
                          wc(e, t, r, n);
                      })
                    : wc(e, t, r, n);
            });
    }
    function wc(e, t, r, n) {
        Oy(e, t, (i, s) => {
            if (i) return n(i);
            (e = s.toDst),
                Ny(s.toCwd, r, (o, a) => {
                    if (o) return n(o);
                    let l = yc.dirname(t);
                    Ry(l, (d, c) => {
                        if (d) return n(d);
                        if (c) return We.symlink(e, t, a, n);
                        Ty(l, f => {
                            if (f) return n(f);
                            We.symlink(e, t, a, n);
                        });
                    });
                });
        });
    }
    function Dy(e, t, r) {
        let n;
        try {
            n = We.lstatSync(t);
        } catch {}
        if (n && n.isSymbolicLink()) {
            let a = We.statSync(e),
                l = We.statSync(t);
            if (Sc(a, l)) return;
        }
        let i = xy(e, t);
        (e = i.toDst), (r = Iy(i.toCwd, r));
        let s = yc.dirname(t);
        return We.existsSync(s) || by(s), We.symlinkSync(e, t, r);
    }
    Ac.exports = { createSymlink: Cy(Py), createSymlinkSync: Dy };
});
var Pc = g((AN, Rc) => {
    "use strict";
    var { createFile: Tc, createFileSync: bc } = oc(),
        { createLink: Oc, createLinkSync: xc } = fc(),
        { createSymlink: Nc, createSymlinkSync: Ic } = Cc();
    Rc.exports = {
        createFile: Tc,
        createFileSync: bc,
        ensureFile: Tc,
        ensureFileSync: bc,
        createLink: Oc,
        createLinkSync: xc,
        ensureLink: Oc,
        ensureLinkSync: xc,
        createSymlink: Nc,
        createSymlinkSync: Ic,
        ensureSymlink: Nc,
        ensureSymlinkSync: Ic
    };
});
var si = g((CN, Dc) => {
    function Fy(e, { EOL: t = "\n", finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
        let s = r ? t : "";
        return JSON.stringify(e, n, i).replace(/\n/g, t) + s;
    }
    function qy(e) {
        return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
    }
    Dc.exports = { stringify: Fy, stripBom: qy };
});
var Uc = g((TN, Lc) => {
    var lr;
    try {
        lr = _e();
    } catch {
        lr = require("fs");
    }
    var oi = xe(),
        { stringify: Fc, stripBom: qc } = si();
    async function Ly(e, t = {}) {
        typeof t == "string" && (t = { encoding: t });
        let r = t.fs || lr,
            n = "throws" in t ? t.throws : !0,
            i = await oi.fromCallback(r.readFile)(e, t);
        i = qc(i);
        let s;
        try {
            s = JSON.parse(i, t ? t.reviver : null);
        } catch (o) {
            if (n) throw ((o.message = "".concat(e, ": ").concat(o.message)), o);
            return null;
        }
        return s;
    }
    var Uy = oi.fromPromise(Ly);
    function $y(e, t = {}) {
        typeof t == "string" && (t = { encoding: t });
        let r = t.fs || lr,
            n = "throws" in t ? t.throws : !0;
        try {
            let i = r.readFileSync(e, t);
            return (i = qc(i)), JSON.parse(i, t.reviver);
        } catch (i) {
            if (n) throw ((i.message = "".concat(e, ": ").concat(i.message)), i);
            return null;
        }
    }
    async function ky(e, t, r = {}) {
        let n = r.fs || lr,
            i = Fc(t, r);
        await oi.fromCallback(n.writeFile)(e, i, r);
    }
    var My = oi.fromPromise(ky);
    function By(e, t, r = {}) {
        let n = r.fs || lr,
            i = Fc(t, r);
        return n.writeFileSync(e, i, r);
    }
    var Hy = { readFile: Uy, readFileSync: $y, writeFile: My, writeFileSync: By };
    Lc.exports = Hy;
});
var kc = g((bN, $c) => {
    "use strict";
    var ai = Uc();
    $c.exports = {
        readJson: ai.readFile,
        readJsonSync: ai.readFileSync,
        writeJson: ai.writeFile,
        writeJsonSync: ai.writeFileSync
    };
});
var li = g((ON, Hc) => {
    "use strict";
    var jy = xe().fromCallback,
        Jr = _e(),
        Mc = require("path"),
        Bc = je(),
        Wy = ct().pathExists;
    function Gy(e, t, r, n) {
        typeof r == "function" && ((n = r), (r = "utf8"));
        let i = Mc.dirname(e);
        Wy(i, (s, o) => {
            if (s) return n(s);
            if (o) return Jr.writeFile(e, t, r, n);
            Bc.mkdirs(i, a => {
                if (a) return n(a);
                Jr.writeFile(e, t, r, n);
            });
        });
    }
    function Vy(e, ...t) {
        let r = Mc.dirname(e);
        if (Jr.existsSync(r)) return Jr.writeFileSync(e, ...t);
        Bc.mkdirsSync(r), Jr.writeFileSync(e, ...t);
    }
    Hc.exports = { outputFile: jy(Gy), outputFileSync: Vy };
});
var Wc = g((xN, jc) => {
    "use strict";
    var { stringify: Yy } = si(),
        { outputFile: zy } = li();
    async function Xy(e, t, r = {}) {
        let n = Yy(t, r);
        await zy(e, n, r);
    }
    jc.exports = Xy;
});
var Vc = g((NN, Gc) => {
    "use strict";
    var { stringify: Ky } = si(),
        { outputFileSync: Jy } = li();
    function Qy(e, t, r) {
        let n = Ky(t, r);
        Jy(e, n, r);
    }
    Gc.exports = Qy;
});
var zc = g((IN, Yc) => {
    "use strict";
    var Zy = xe().fromPromise,
        ve = kc();
    ve.outputJson = Zy(Wc());
    ve.outputJsonSync = Vc();
    ve.outputJSON = ve.outputJson;
    ve.outputJSONSync = ve.outputJsonSync;
    ve.writeJSON = ve.writeJson;
    ve.writeJSONSync = ve.writeJsonSync;
    ve.readJSON = ve.readJson;
    ve.readJSONSync = ve.readJsonSync;
    Yc.exports = ve;
});
var Zc = g((RN, Qc) => {
    "use strict";
    var eE = _e(),
        zs = require("path"),
        tE = ti().copy,
        Jc = Xr().remove,
        rE = je().mkdirp,
        nE = ct().pathExists,
        Xc = Rt();
    function iE(e, t, r, n) {
        typeof r == "function" && ((n = r), (r = {})), (r = r || {});
        let i = r.overwrite || r.clobber || !1;
        Xc.checkPaths(e, t, "move", r, (s, o) => {
            if (s) return n(s);
            let { srcStat: a, isChangingCase: l = !1 } = o;
            Xc.checkParentPaths(e, a, t, "move", d => {
                if (d) return n(d);
                if (sE(t)) return Kc(e, t, i, l, n);
                rE(zs.dirname(t), c => (c ? n(c) : Kc(e, t, i, l, n)));
            });
        });
    }
    function sE(e) {
        let t = zs.dirname(e);
        return zs.parse(t).root === t;
    }
    function Kc(e, t, r, n, i) {
        if (n) return Ys(e, t, r, i);
        if (r) return Jc(t, s => (s ? i(s) : Ys(e, t, r, i)));
        nE(t, (s, o) => (s ? i(s) : o ? i(new Error("dest already exists.")) : Ys(e, t, r, i)));
    }
    function Ys(e, t, r, n) {
        eE.rename(e, t, i => (i ? (i.code !== "EXDEV" ? n(i) : oE(e, t, r, n)) : n()));
    }
    function oE(e, t, r, n) {
        tE(e, t, { overwrite: r, errorOnExist: !0 }, s => (s ? n(s) : Jc(e, n)));
    }
    Qc.exports = iE;
});
var sf = g((PN, nf) => {
    "use strict";
    var tf = _e(),
        Ks = require("path"),
        aE = ti().copySync,
        rf = Xr().removeSync,
        lE = je().mkdirpSync,
        ef = Rt();
    function uE(e, t, r) {
        r = r || {};
        let n = r.overwrite || r.clobber || !1,
            { srcStat: i, isChangingCase: s = !1 } = ef.checkPathsSync(e, t, "move", r);
        return ef.checkParentPathsSync(e, i, t, "move"), cE(t) || lE(Ks.dirname(t)), fE(e, t, n, s);
    }
    function cE(e) {
        let t = Ks.dirname(e);
        return Ks.parse(t).root === t;
    }
    function fE(e, t, r, n) {
        if (n) return Xs(e, t, r);
        if (r) return rf(t), Xs(e, t, r);
        if (tf.existsSync(t)) throw new Error("dest already exists.");
        return Xs(e, t, r);
    }
    function Xs(e, t, r) {
        try {
            tf.renameSync(e, t);
        } catch (n) {
            if (n.code !== "EXDEV") throw n;
            return hE(e, t, r);
        }
    }
    function hE(e, t, r) {
        return aE(e, t, { overwrite: r, errorOnExist: !0 }), rf(e);
    }
    nf.exports = uE;
});
var af = g((DN, of) => {
    "use strict";
    var dE = xe().fromCallback;
    of.exports = { move: dE(Zc()), moveSync: sf() };
});
var et = g((FN, lf) => {
    "use strict";
    lf.exports = { ...It(), ...ti(), ...rc(), ...Pc(), ...zc(), ...je(), ...af(), ...li(), ...ct(), ...Xr() };
});
var ur = g((qN, Pt) => {
    "use strict";
    function uf(e) {
        return typeof e > "u" || e === null;
    }
    function pE(e) {
        return typeof e == "object" && e !== null;
    }
    function mE(e) {
        return Array.isArray(e) ? e : uf(e) ? [] : [e];
    }
    function gE(e, t) {
        var r, n, i, s;
        if (t) for (s = Object.keys(t), r = 0, n = s.length; r < n; r += 1) (i = s[r]), (e[i] = t[i]);
        return e;
    }
    function wE(e, t) {
        var r = "",
            n;
        for (n = 0; n < t; n += 1) r += e;
        return r;
    }
    function yE(e) {
        return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
    }
    Pt.exports.isNothing = uf;
    Pt.exports.isObject = pE;
    Pt.exports.toArray = mE;
    Pt.exports.repeat = wE;
    Pt.exports.isNegativeZero = yE;
    Pt.exports.extend = gE;
});
var cr = g((LN, ff) => {
    "use strict";
    function cf(e, t) {
        var r = "",
            n = e.reason || "(unknown reason)";
        return e.mark
            ? (e.mark.name && (r += 'in "' + e.mark.name + '" '),
              (r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")"),
              !t && e.mark.snippet && (r += "\n\n" + e.mark.snippet),
              n + " " + r)
            : n;
    }
    function Qr(e, t) {
        Error.call(this),
            (this.name = "YAMLException"),
            (this.reason = e),
            (this.mark = t),
            (this.message = cf(this, !1)),
            Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : (this.stack = new Error().stack || "");
    }
    Qr.prototype = Object.create(Error.prototype);
    Qr.prototype.constructor = Qr;
    Qr.prototype.toString = function (t) {
        return this.name + ": " + cf(this, t);
    };
    ff.exports = Qr;
});
var df = g((UN, hf) => {
    "use strict";
    var Zr = ur();
    function Js(e, t, r, n, i) {
        var s = "",
            o = "",
            a = Math.floor(i / 2) - 1;
        return (
            n - t > a && ((s = " ... "), (t = n - a + s.length)),
            r - n > a && ((o = " ..."), (r = n + a - o.length)),
            { str: s + e.slice(t, r).replace(/\t/g, "\u2192") + o, pos: n - t + s.length }
        );
    }
    function Qs(e, t) {
        return Zr.repeat(" ", t - e.length) + e;
    }
    function EE(e, t) {
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
            (d = Js(e.buffer, n[o - l], i[o - l], e.position - (n[o] - n[o - l]), f)),
                (a = Zr.repeat(" ", t.indent) + Qs((e.line - l + 1).toString(), c) + " | " + d.str + "\n" + a);
        for (
            d = Js(e.buffer, n[o], i[o], e.position, f),
                a += Zr.repeat(" ", t.indent) + Qs((e.line + 1).toString(), c) + " | " + d.str + "\n",
                a += Zr.repeat("-", t.indent + c + 3 + d.pos) + "^\n",
                l = 1;
            l <= t.linesAfter && !(o + l >= i.length);
            l++
        )
            (d = Js(e.buffer, n[o + l], i[o + l], e.position - (n[o] - n[o + l]), f)),
                (a += Zr.repeat(" ", t.indent) + Qs((e.line + l + 1).toString(), c) + " | " + d.str + "\n");
        return a.replace(/\n$/, "");
    }
    hf.exports = EE;
});
var me = g(($N, mf) => {
    "use strict";
    var pf = cr(),
        _E = [
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
        vE = ["scalar", "sequence", "mapping"];
    function SE(e) {
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
    function AE(e, t) {
        if (
            ((t = t || {}),
            Object.keys(t).forEach(function (r) {
                if (_E.indexOf(r) === -1)
                    throw new pf('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
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
            (this.styleAliases = SE(t.styleAliases || null)),
            vE.indexOf(this.kind) === -1)
        )
            throw new pf('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
    }
    mf.exports = AE;
});
var to = g((kN, wf) => {
    "use strict";
    var en = cr(),
        Zs = me();
    function gf(e, t) {
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
    function CE() {
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
    function eo(e) {
        return this.extend(e);
    }
    eo.prototype.extend = function (t) {
        var r = [],
            n = [];
        if (t instanceof Zs) n.push(t);
        else if (Array.isArray(t)) n = n.concat(t);
        else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
            t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
        else
            throw new en(
                "Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })"
            );
        r.forEach(function (s) {
            if (!(s instanceof Zs))
                throw new en("Specified list of YAML types (or a single Type object) contains a non-Type object.");
            if (s.loadKind && s.loadKind !== "scalar")
                throw new en(
                    "There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported."
                );
            if (s.multi)
                throw new en(
                    "There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit."
                );
        }),
            n.forEach(function (s) {
                if (!(s instanceof Zs))
                    throw new en("Specified list of YAML types (or a single Type object) contains a non-Type object.");
            });
        var i = Object.create(eo.prototype);
        return (
            (i.implicit = (this.implicit || []).concat(r)),
            (i.explicit = (this.explicit || []).concat(n)),
            (i.compiledImplicit = gf(i, "implicit")),
            (i.compiledExplicit = gf(i, "explicit")),
            (i.compiledTypeMap = CE(i.compiledImplicit, i.compiledExplicit)),
            i
        );
    };
    wf.exports = eo;
});
var ro = g((MN, yf) => {
    "use strict";
    var TE = me();
    yf.exports = new TE("tag:yaml.org,2002:str", {
        kind: "scalar",
        construct: function (e) {
            return e !== null ? e : "";
        }
    });
});
var no = g((BN, Ef) => {
    "use strict";
    var bE = me();
    Ef.exports = new bE("tag:yaml.org,2002:seq", {
        kind: "sequence",
        construct: function (e) {
            return e !== null ? e : [];
        }
    });
});
var io = g((HN, _f) => {
    "use strict";
    var OE = me();
    _f.exports = new OE("tag:yaml.org,2002:map", {
        kind: "mapping",
        construct: function (e) {
            return e !== null ? e : {};
        }
    });
});
var so = g((jN, vf) => {
    "use strict";
    var xE = to();
    vf.exports = new xE({ explicit: [ro(), no(), io()] });
});
var oo = g((WN, Sf) => {
    "use strict";
    var NE = me();
    function IE(e) {
        if (e === null) return !0;
        var t = e.length;
        return (t === 1 && e === "~") || (t === 4 && (e === "null" || e === "Null" || e === "NULL"));
    }
    function RE() {
        return null;
    }
    function PE(e) {
        return e === null;
    }
    Sf.exports = new NE("tag:yaml.org,2002:null", {
        kind: "scalar",
        resolve: IE,
        construct: RE,
        predicate: PE,
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
var ao = g((GN, Af) => {
    "use strict";
    var DE = me();
    function FE(e) {
        if (e === null) return !1;
        var t = e.length;
        return (
            (t === 4 && (e === "true" || e === "True" || e === "TRUE")) ||
            (t === 5 && (e === "false" || e === "False" || e === "FALSE"))
        );
    }
    function qE(e) {
        return e === "true" || e === "True" || e === "TRUE";
    }
    function LE(e) {
        return Object.prototype.toString.call(e) === "[object Boolean]";
    }
    Af.exports = new DE("tag:yaml.org,2002:bool", {
        kind: "scalar",
        resolve: FE,
        construct: qE,
        predicate: LE,
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
var lo = g((VN, Cf) => {
    "use strict";
    var UE = ur(),
        $E = me();
    function kE(e) {
        return (48 <= e && e <= 57) || (65 <= e && e <= 70) || (97 <= e && e <= 102);
    }
    function ME(e) {
        return 48 <= e && e <= 55;
    }
    function BE(e) {
        return 48 <= e && e <= 57;
    }
    function HE(e) {
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
                        if (!kE(e.charCodeAt(r))) return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
            if (i === "o") {
                for (r++; r < t; r++)
                    if (((i = e[r]), i !== "_")) {
                        if (!ME(e.charCodeAt(r))) return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
        }
        if (i === "_") return !1;
        for (; r < t; r++)
            if (((i = e[r]), i !== "_")) {
                if (!BE(e.charCodeAt(r))) return !1;
                n = !0;
            }
        return !(!n || i === "_");
    }
    function jE(e) {
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
    function WE(e) {
        return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !UE.isNegativeZero(e);
    }
    Cf.exports = new $E("tag:yaml.org,2002:int", {
        kind: "scalar",
        resolve: HE,
        construct: jE,
        predicate: WE,
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
var uo = g((YN, bf) => {
    "use strict";
    var Tf = ur(),
        GE = me(),
        VE = new RegExp(
            "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
        );
    function YE(e) {
        return !(e === null || !VE.test(e) || e[e.length - 1] === "_");
    }
    function zE(e) {
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
    var XE = /^[-+]?[0-9]+e/;
    function KE(e, t) {
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
        else if (Tf.isNegativeZero(e)) return "-0.0";
        return (r = e.toString(10)), XE.test(r) ? r.replace("e", ".e") : r;
    }
    function JE(e) {
        return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || Tf.isNegativeZero(e));
    }
    bf.exports = new GE("tag:yaml.org,2002:float", {
        kind: "scalar",
        resolve: YE,
        construct: zE,
        predicate: JE,
        represent: KE,
        defaultStyle: "lowercase"
    });
});
var co = g((zN, Of) => {
    "use strict";
    Of.exports = so().extend({ implicit: [oo(), ao(), lo(), uo()] });
});
var fo = g((XN, xf) => {
    "use strict";
    xf.exports = co();
});
var ho = g((KN, Rf) => {
    "use strict";
    var QE = me(),
        Nf = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),
        If = new RegExp(
            "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
        );
    function ZE(e) {
        return e === null ? !1 : Nf.exec(e) !== null || If.exec(e) !== null;
    }
    function e_(e) {
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
        if (((t = Nf.exec(e)), t === null && (t = If.exec(e)), t === null)) throw new Error("Date resolve error");
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
    function t_(e) {
        return e.toISOString();
    }
    Rf.exports = new QE("tag:yaml.org,2002:timestamp", {
        kind: "scalar",
        resolve: ZE,
        construct: e_,
        instanceOf: Date,
        represent: t_
    });
});
var po = g((JN, Pf) => {
    "use strict";
    var r_ = me();
    function n_(e) {
        return e === "<<" || e === null;
    }
    Pf.exports = new r_("tag:yaml.org,2002:merge", { kind: "scalar", resolve: n_ });
});
var go = g((QN, Df) => {
    "use strict";
    var i_ = me(),
        mo = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function s_(e) {
        if (e === null) return !1;
        var t,
            r,
            n = 0,
            i = e.length,
            s = mo;
        for (r = 0; r < i; r++)
            if (((t = s.indexOf(e.charAt(r))), !(t > 64))) {
                if (t < 0) return !1;
                n += 6;
            }
        return n % 8 === 0;
    }
    function o_(e) {
        var t,
            r,
            n = e.replace(/[\r\n=]/g, ""),
            i = n.length,
            s = mo,
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
    function a_(e) {
        var t = "",
            r = 0,
            n,
            i,
            s = e.length,
            o = mo;
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
    function l_(e) {
        return Object.prototype.toString.call(e) === "[object Uint8Array]";
    }
    Df.exports = new i_("tag:yaml.org,2002:binary", { kind: "scalar", resolve: s_, construct: o_, predicate: l_, represent: a_ });
});
var wo = g((ZN, Ff) => {
    "use strict";
    var u_ = me(),
        c_ = Object.prototype.hasOwnProperty,
        f_ = Object.prototype.toString;
    function h_(e) {
        if (e === null) return !0;
        var t = [],
            r,
            n,
            i,
            s,
            o,
            a = e;
        for (r = 0, n = a.length; r < n; r += 1) {
            if (((i = a[r]), (o = !1), f_.call(i) !== "[object Object]")) return !1;
            for (s in i)
                if (c_.call(i, s))
                    if (!o) o = !0;
                    else return !1;
            if (!o) return !1;
            if (t.indexOf(s) === -1) t.push(s);
            else return !1;
        }
        return !0;
    }
    function d_(e) {
        return e !== null ? e : [];
    }
    Ff.exports = new u_("tag:yaml.org,2002:omap", { kind: "sequence", resolve: h_, construct: d_ });
});
var yo = g((eI, qf) => {
    "use strict";
    var p_ = me(),
        m_ = Object.prototype.toString;
    function g_(e) {
        if (e === null) return !0;
        var t,
            r,
            n,
            i,
            s,
            o = e;
        for (s = new Array(o.length), t = 0, r = o.length; t < r; t += 1) {
            if (((n = o[t]), m_.call(n) !== "[object Object]" || ((i = Object.keys(n)), i.length !== 1))) return !1;
            s[t] = [i[0], n[i[0]]];
        }
        return !0;
    }
    function w_(e) {
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
    qf.exports = new p_("tag:yaml.org,2002:pairs", { kind: "sequence", resolve: g_, construct: w_ });
});
var Eo = g((tI, Lf) => {
    "use strict";
    var y_ = me(),
        E_ = Object.prototype.hasOwnProperty;
    function __(e) {
        if (e === null) return !0;
        var t,
            r = e;
        for (t in r) if (E_.call(r, t) && r[t] !== null) return !1;
        return !0;
    }
    function v_(e) {
        return e !== null ? e : {};
    }
    Lf.exports = new y_("tag:yaml.org,2002:set", { kind: "mapping", resolve: __, construct: v_ });
});
var ui = g((rI, Uf) => {
    "use strict";
    Uf.exports = fo().extend({ implicit: [ho(), po()], explicit: [go(), wo(), yo(), Eo()] });
});
var Zf = g((nI, Ao) => {
    "use strict";
    var Ft = ur(),
        Wf = cr(),
        S_ = df(),
        A_ = ui(),
        mt = Object.prototype.hasOwnProperty,
        ci = 1,
        Gf = 2,
        Vf = 3,
        fi = 4,
        _o = 1,
        C_ = 2,
        $f = 3,
        T_ =
            /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
        b_ = /[\x85\u2028\u2029]/,
        O_ = /[,\[\]\{\}]/,
        Yf = /^(?:!|!!|![a-z\-]+!)$/i,
        zf = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function kf(e) {
        return Object.prototype.toString.call(e);
    }
    function Ye(e) {
        return e === 10 || e === 13;
    }
    function qt(e) {
        return e === 9 || e === 32;
    }
    function Re(e) {
        return e === 9 || e === 32 || e === 10 || e === 13;
    }
    function fr(e) {
        return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
    }
    function x_(e) {
        var t;
        return 48 <= e && e <= 57 ? e - 48 : ((t = e | 32), 97 <= t && t <= 102 ? t - 97 + 10 : -1);
    }
    function N_(e) {
        return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
    }
    function I_(e) {
        return 48 <= e && e <= 57 ? e - 48 : -1;
    }
    function Mf(e) {
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
    function R_(e) {
        return e <= 65535
            ? String.fromCharCode(e)
            : String.fromCharCode(((e - 65536) >> 10) + 55296, ((e - 65536) & 1023) + 56320);
    }
    var Xf = new Array(256),
        Kf = new Array(256);
    for (Dt = 0; Dt < 256; Dt++) (Xf[Dt] = Mf(Dt) ? 1 : 0), (Kf[Dt] = Mf(Dt));
    var Dt;
    function P_(e, t) {
        (this.input = e),
            (this.filename = t.filename || null),
            (this.schema = t.schema || A_),
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
    function Jf(e, t) {
        var r = {
            name: e.filename,
            buffer: e.input.slice(0, -1),
            position: e.position,
            line: e.line,
            column: e.position - e.lineStart
        };
        return (r.snippet = S_(r)), new Wf(t, r);
    }
    function N(e, t) {
        throw Jf(e, t);
    }
    function hi(e, t) {
        e.onWarning && e.onWarning.call(null, Jf(e, t));
    }
    var Bf = {
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
                o !== 1 && o !== 2 && hi(t, "unsupported YAML version of the document");
        },
        TAG: function (t, r, n) {
            var i, s;
            n.length !== 2 && N(t, "TAG directive accepts exactly two arguments"),
                (i = n[0]),
                (s = n[1]),
                Yf.test(i) || N(t, "ill-formed tag handle (first argument) of the TAG directive"),
                mt.call(t.tagMap, i) && N(t, 'there is a previously declared suffix for "' + i + '" tag handle'),
                zf.test(s) || N(t, "ill-formed tag prefix (second argument) of the TAG directive");
            try {
                s = decodeURIComponent(s);
            } catch {
                N(t, "tag prefix is malformed: " + s);
            }
            t.tagMap[i] = s;
        }
    };
    function pt(e, t, r, n) {
        var i, s, o, a;
        if (t < r) {
            if (((a = e.input.slice(t, r)), n))
                for (i = 0, s = a.length; i < s; i += 1)
                    (o = a.charCodeAt(i)), o === 9 || (32 <= o && o <= 1114111) || N(e, "expected valid JSON character");
            else T_.test(a) && N(e, "the stream contains non-printable characters");
            e.result += a;
        }
    }
    function Hf(e, t, r, n) {
        var i, s, o, a;
        for (
            Ft.isObject(r) || N(e, "cannot merge mappings; the provided source object is unacceptable"),
                i = Object.keys(r),
                o = 0,
                a = i.length;
            o < a;
            o += 1
        )
            (s = i[o]), mt.call(t, s) || ((t[s] = r[s]), (n[s] = !0));
    }
    function hr(e, t, r, n, i, s, o, a, l) {
        var d, c;
        if (Array.isArray(i))
            for (i = Array.prototype.slice.call(i), d = 0, c = i.length; d < c; d += 1)
                Array.isArray(i[d]) && N(e, "nested arrays are not supported inside keys"),
                    typeof i == "object" && kf(i[d]) === "[object Object]" && (i[d] = "[object Object]");
        if (
            (typeof i == "object" && kf(i) === "[object Object]" && (i = "[object Object]"),
            (i = String(i)),
            t === null && (t = {}),
            n === "tag:yaml.org,2002:merge")
        )
            if (Array.isArray(s)) for (d = 0, c = s.length; d < c; d += 1) Hf(e, t, s[d], r);
            else Hf(e, t, s, r);
        else
            !e.json &&
                !mt.call(r, i) &&
                mt.call(t, i) &&
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
    function vo(e) {
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
    function ie(e, t, r) {
        for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
            for (; qt(i); )
                i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), (i = e.input.charCodeAt(++e.position));
            if (t && i === 35)
                do i = e.input.charCodeAt(++e.position);
                while (i !== 10 && i !== 13 && i !== 0);
            if (Ye(i))
                for (vo(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
                    e.lineIndent++, (i = e.input.charCodeAt(++e.position));
            else break;
        }
        return r !== -1 && n !== 0 && e.lineIndent < r && hi(e, "deficient indentation"), n;
    }
    function di(e) {
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
    function So(e, t) {
        t === 1 ? (e.result += " ") : t > 1 && (e.result += Ft.repeat("\n", t - 1));
    }
    function D_(e, t, r) {
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
            Re(p) ||
                fr(p) ||
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
                ((p === 63 || p === 45) && ((i = e.input.charCodeAt(e.position + 1)), Re(i) || (r && fr(i)))))
        )
            return !1;
        for (e.kind = "scalar", e.result = "", s = o = e.position, a = !1; p !== 0; ) {
            if (p === 58) {
                if (((i = e.input.charCodeAt(e.position + 1)), Re(i) || (r && fr(i)))) break;
            } else if (p === 35) {
                if (((n = e.input.charCodeAt(e.position - 1)), Re(n))) break;
            } else {
                if ((e.position === e.lineStart && di(e)) || (r && fr(p))) break;
                if (Ye(p))
                    if (((l = e.line), (d = e.lineStart), (c = e.lineIndent), ie(e, !1, -1), e.lineIndent >= t)) {
                        (a = !0), (p = e.input.charCodeAt(e.position));
                        continue;
                    } else {
                        (e.position = o), (e.line = l), (e.lineStart = d), (e.lineIndent = c);
                        break;
                    }
            }
            a && (pt(e, s, o, !1), So(e, e.line - l), (s = o = e.position), (a = !1)),
                qt(p) || (o = e.position + 1),
                (p = e.input.charCodeAt(++e.position));
        }
        return pt(e, s, o, !1), e.result ? !0 : ((e.kind = f), (e.result = m), !1);
    }
    function F_(e, t) {
        var r, n, i;
        if (((r = e.input.charCodeAt(e.position)), r !== 39)) return !1;
        for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
            if (r === 39)
                if ((pt(e, n, e.position, !0), (r = e.input.charCodeAt(++e.position)), r === 39))
                    (n = e.position), e.position++, (i = e.position);
                else return !0;
            else
                Ye(r)
                    ? (pt(e, n, i, !0), So(e, ie(e, !1, t)), (n = i = e.position))
                    : e.position === e.lineStart && di(e)
                    ? N(e, "unexpected end of the document within a single quoted scalar")
                    : (e.position++, (i = e.position));
        N(e, "unexpected end of the stream within a single quoted scalar");
    }
    function q_(e, t) {
        var r, n, i, s, o, a;
        if (((a = e.input.charCodeAt(e.position)), a !== 34)) return !1;
        for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (a = e.input.charCodeAt(e.position)) !== 0; ) {
            if (a === 34) return pt(e, r, e.position, !0), e.position++, !0;
            if (a === 92) {
                if ((pt(e, r, e.position, !0), (a = e.input.charCodeAt(++e.position)), Ye(a))) ie(e, !1, t);
                else if (a < 256 && Xf[a]) (e.result += Kf[a]), e.position++;
                else if ((o = N_(a)) > 0) {
                    for (i = o, s = 0; i > 0; i--)
                        (a = e.input.charCodeAt(++e.position)),
                            (o = x_(a)) >= 0 ? (s = (s << 4) + o) : N(e, "expected hexadecimal character");
                    (e.result += R_(s)), e.position++;
                } else N(e, "unknown escape sequence");
                r = n = e.position;
            } else
                Ye(a)
                    ? (pt(e, r, n, !0), So(e, ie(e, !1, t)), (r = n = e.position))
                    : e.position === e.lineStart && di(e)
                    ? N(e, "unexpected end of the document within a double quoted scalar")
                    : (e.position++, (n = e.position));
        }
        N(e, "unexpected end of the stream within a double quoted scalar");
    }
    function L_(e, t) {
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
            if ((ie(e, !0, t), (C = e.input.charCodeAt(e.position)), C === c))
                return e.position++, (e.tag = o), (e.anchor = l), (e.kind = p ? "mapping" : "sequence"), (e.result = a), !0;
            r
                ? C === 44 && N(e, "expected the node content, but found ','")
                : N(e, "missed comma between flow collection entries"),
                (S = v = T = null),
                (f = m = !1),
                C === 63 && ((d = e.input.charCodeAt(e.position + 1)), Re(d) && ((f = m = !0), e.position++, ie(e, !0, t))),
                (n = e.line),
                (i = e.lineStart),
                (s = e.position),
                dr(e, t, ci, !1, !0),
                (S = e.tag),
                (v = e.result),
                ie(e, !0, t),
                (C = e.input.charCodeAt(e.position)),
                (m || e.line === n) &&
                    C === 58 &&
                    ((f = !0), (C = e.input.charCodeAt(++e.position)), ie(e, !0, t), dr(e, t, ci, !1, !0), (T = e.result)),
                p ? hr(e, a, _, S, v, T, n, i, s) : f ? a.push(hr(e, null, _, S, v, T, n, i, s)) : a.push(v),
                ie(e, !0, t),
                (C = e.input.charCodeAt(e.position)),
                C === 44 ? ((r = !0), (C = e.input.charCodeAt(++e.position))) : (r = !1);
        }
        N(e, "unexpected end of the stream within a flow collection");
    }
    function U_(e, t) {
        var r,
            n,
            i = _o,
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
                _o === i ? (i = f === 43 ? $f : C_) : N(e, "repeat of a chomping mode identifier");
            else if ((c = I_(f)) >= 0)
                c === 0
                    ? N(e, "bad explicit indentation width of a block scalar; it cannot be less than one")
                    : o
                    ? N(e, "repeat of an indentation width identifier")
                    : ((a = t + c - 1), (o = !0));
            else break;
        if (qt(f)) {
            do f = e.input.charCodeAt(++e.position);
            while (qt(f));
            if (f === 35)
                do f = e.input.charCodeAt(++e.position);
                while (!Ye(f) && f !== 0);
        }
        for (; f !== 0; ) {
            for (vo(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!o || e.lineIndent < a) && f === 32; )
                e.lineIndent++, (f = e.input.charCodeAt(++e.position));
            if ((!o && e.lineIndent > a && (a = e.lineIndent), Ye(f))) {
                l++;
                continue;
            }
            if (e.lineIndent < a) {
                i === $f ? (e.result += Ft.repeat("\n", s ? 1 + l : l)) : i === _o && s && (e.result += "\n");
                break;
            }
            for (
                n
                    ? qt(f)
                        ? ((d = !0), (e.result += Ft.repeat("\n", s ? 1 + l : l)))
                        : d
                        ? ((d = !1), (e.result += Ft.repeat("\n", l + 1)))
                        : l === 0
                        ? s && (e.result += " ")
                        : (e.result += Ft.repeat("\n", l))
                    : (e.result += Ft.repeat("\n", s ? 1 + l : l)),
                    s = !0,
                    o = !0,
                    l = 0,
                    r = e.position;
                !Ye(f) && f !== 0;

            )
                f = e.input.charCodeAt(++e.position);
            pt(e, r, e.position, !1);
        }
        return !0;
    }
    function jf(e, t) {
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
            !(l !== 45 || ((o = e.input.charCodeAt(e.position + 1)), !Re(o))));

        ) {
            if (((a = !0), e.position++, ie(e, !0, -1) && e.lineIndent <= t)) {
                s.push(null), (l = e.input.charCodeAt(e.position));
                continue;
            }
            if (
                ((r = e.line),
                dr(e, t, Vf, !1, !0),
                s.push(e.result),
                ie(e, !0, -1),
                (l = e.input.charCodeAt(e.position)),
                (e.line === r || e.lineIndent > t) && l !== 0)
            )
                N(e, "bad indentation of a sequence entry");
            else if (e.lineIndent < t) break;
        }
        return a ? ((e.tag = n), (e.anchor = i), (e.kind = "sequence"), (e.result = s), !0) : !1;
    }
    function $_(e, t, r) {
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
                (C === 63 || C === 58) && Re(n))
            )
                C === 63
                    ? (S && (hr(e, f, m, p, _, null, o, a, l), (p = _ = v = null)), (T = !0), (S = !0), (i = !0))
                    : S
                    ? ((S = !1), (i = !0))
                    : N(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),
                    (e.position += 1),
                    (C = n);
            else {
                if (((o = e.line), (a = e.lineStart), (l = e.position), !dr(e, r, Gf, !1, !0))) break;
                if (e.line === s) {
                    for (C = e.input.charCodeAt(e.position); qt(C); ) C = e.input.charCodeAt(++e.position);
                    if (C === 58)
                        (C = e.input.charCodeAt(++e.position)),
                            Re(C) ||
                                N(e, "a whitespace character is expected after the key-value separator within a block mapping"),
                            S && (hr(e, f, m, p, _, null, o, a, l), (p = _ = v = null)),
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
                    dr(e, t, fi, !0, i) && (S ? (_ = e.result) : (v = e.result)),
                    S || (hr(e, f, m, p, _, v, o, a, l), (p = _ = v = null)),
                    ie(e, !0, -1),
                    (C = e.input.charCodeAt(e.position))),
                (e.line === s || e.lineIndent > t) && C !== 0)
            )
                N(e, "bad indentation of a mapping entry");
            else if (e.lineIndent < t) break;
        }
        return S && hr(e, f, m, p, _, null, o, a, l), T && ((e.tag = d), (e.anchor = c), (e.kind = "mapping"), (e.result = f)), T;
    }
    function k_(e) {
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
            for (; o !== 0 && !Re(o); )
                o === 33 &&
                    (n
                        ? N(e, "tag suffix cannot contain exclamation marks")
                        : ((i = e.input.slice(t - 1, e.position + 1)),
                          Yf.test(i) || N(e, "named tag handle cannot contain such characters"),
                          (n = !0),
                          (t = e.position + 1))),
                    (o = e.input.charCodeAt(++e.position));
            (s = e.input.slice(t, e.position)), O_.test(s) && N(e, "tag suffix cannot contain flow indicator characters");
        }
        s && !zf.test(s) && N(e, "tag name cannot contain such characters: " + s);
        try {
            s = decodeURIComponent(s);
        } catch {
            N(e, "tag name is malformed: " + s);
        }
        return (
            r
                ? (e.tag = s)
                : mt.call(e.tagMap, i)
                ? (e.tag = e.tagMap[i] + s)
                : i === "!"
                ? (e.tag = "!" + s)
                : i === "!!"
                ? (e.tag = "tag:yaml.org,2002:" + s)
                : N(e, 'undeclared tag handle "' + i + '"'),
            !0
        );
    }
    function M_(e) {
        var t, r;
        if (((r = e.input.charCodeAt(e.position)), r !== 38)) return !1;
        for (
            e.anchor !== null && N(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position;
            r !== 0 && !Re(r) && !fr(r);

        )
            r = e.input.charCodeAt(++e.position);
        return (
            e.position === t && N(e, "name of an anchor node must contain at least one character"),
            (e.anchor = e.input.slice(t, e.position)),
            !0
        );
    }
    function B_(e) {
        var t, r, n;
        if (((n = e.input.charCodeAt(e.position)), n !== 42)) return !1;
        for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !Re(n) && !fr(n); )
            n = e.input.charCodeAt(++e.position);
        return (
            e.position === t && N(e, "name of an alias node must contain at least one character"),
            (r = e.input.slice(t, e.position)),
            mt.call(e.anchorMap, r) || N(e, 'unidentified alias "' + r + '"'),
            (e.result = e.anchorMap[r]),
            ie(e, !0, -1),
            !0
        );
    }
    function dr(e, t, r, n, i) {
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
            (s = o = a = fi === r || Vf === r),
            n &&
                ie(e, !0, -1) &&
                ((d = !0), e.lineIndent > t ? (l = 1) : e.lineIndent === t ? (l = 0) : e.lineIndent < t && (l = -1)),
            l === 1)
        )
            for (; k_(e) || M_(e); )
                ie(e, !0, -1)
                    ? ((d = !0),
                      (a = s),
                      e.lineIndent > t ? (l = 1) : e.lineIndent === t ? (l = 0) : e.lineIndent < t && (l = -1))
                    : (a = !1);
        if (
            (a && (a = d || i),
            (l === 1 || fi === r) &&
                (ci === r || Gf === r ? (v = t) : (v = t + 1),
                (S = e.position - e.lineStart),
                l === 1
                    ? (a && (jf(e, S) || $_(e, S, v))) || L_(e, v)
                        ? (c = !0)
                        : ((o && U_(e, v)) || F_(e, v) || q_(e, v)
                              ? (c = !0)
                              : B_(e)
                              ? ((c = !0),
                                (e.tag !== null || e.anchor !== null) && N(e, "alias node should not have any properties"))
                              : D_(e, v, ci === r) && ((c = !0), e.tag === null && (e.tag = "?")),
                          e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
                    : l === 0 && (c = a && jf(e, S))),
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
            if (mt.call(e.typeMap[e.kind || "fallback"], e.tag)) _ = e.typeMap[e.kind || "fallback"][e.tag];
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
    function H_(e) {
        var t = e.position,
            r,
            n,
            i,
            s = !1,
            o;
        for (
            e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = Object.create(null), e.anchorMap = Object.create(null);
            (o = e.input.charCodeAt(e.position)) !== 0 &&
            (ie(e, !0, -1), (o = e.input.charCodeAt(e.position)), !(e.lineIndent > 0 || o !== 37));

        ) {
            for (s = !0, o = e.input.charCodeAt(++e.position), r = e.position; o !== 0 && !Re(o); )
                o = e.input.charCodeAt(++e.position);
            for (
                n = e.input.slice(r, e.position),
                    i = [],
                    n.length < 1 && N(e, "directive name must not be less than one character in length");
                o !== 0;

            ) {
                for (; qt(o); ) o = e.input.charCodeAt(++e.position);
                if (o === 35) {
                    do o = e.input.charCodeAt(++e.position);
                    while (o !== 0 && !Ye(o));
                    break;
                }
                if (Ye(o)) break;
                for (r = e.position; o !== 0 && !Re(o); ) o = e.input.charCodeAt(++e.position);
                i.push(e.input.slice(r, e.position));
            }
            o !== 0 && vo(e), mt.call(Bf, n) ? Bf[n](e, n, i) : hi(e, 'unknown document directive "' + n + '"');
        }
        if (
            (ie(e, !0, -1),
            e.lineIndent === 0 &&
            e.input.charCodeAt(e.position) === 45 &&
            e.input.charCodeAt(e.position + 1) === 45 &&
            e.input.charCodeAt(e.position + 2) === 45
                ? ((e.position += 3), ie(e, !0, -1))
                : s && N(e, "directives end mark is expected"),
            dr(e, e.lineIndent - 1, fi, !1, !0),
            ie(e, !0, -1),
            e.checkLineBreaks &&
                b_.test(e.input.slice(t, e.position)) &&
                hi(e, "non-ASCII line breaks are interpreted as content"),
            e.documents.push(e.result),
            e.position === e.lineStart && di(e))
        ) {
            e.input.charCodeAt(e.position) === 46 && ((e.position += 3), ie(e, !0, -1));
            return;
        }
        if (e.position < e.length - 1) N(e, "end of the stream or a document separator is expected");
        else return;
    }
    function Qf(e, t) {
        (e = String(e)),
            (t = t || {}),
            e.length !== 0 &&
                (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += "\n"),
                e.charCodeAt(0) === 65279 && (e = e.slice(1)));
        var r = new P_(e, t),
            n = e.indexOf("\0");
        for (
            n !== -1 && ((r.position = n), N(r, "null byte is not allowed in input")), r.input += "\0";
            r.input.charCodeAt(r.position) === 32;

        )
            (r.lineIndent += 1), (r.position += 1);
        for (; r.position < r.length - 1; ) H_(r);
        return r.documents;
    }
    function j_(e, t, r) {
        t !== null && typeof t == "object" && typeof r > "u" && ((r = t), (t = null));
        var n = Qf(e, r);
        if (typeof t != "function") return n;
        for (var i = 0, s = n.length; i < s; i += 1) t(n[i]);
    }
    function W_(e, t) {
        var r = Qf(e, t);
        if (r.length !== 0) {
            if (r.length === 1) return r[0];
            throw new Wf("expected a single document in the stream, but found more");
        }
    }
    Ao.exports.loadAll = j_;
    Ao.exports.load = W_;
});
var _h = g((iI, Eh) => {
    "use strict";
    var gi = ur(),
        on = cr(),
        G_ = ui(),
        lh = Object.prototype.toString,
        uh = Object.prototype.hasOwnProperty,
        xo = 65279,
        V_ = 9,
        rn = 10,
        Y_ = 13,
        z_ = 32,
        X_ = 33,
        K_ = 34,
        Co = 35,
        J_ = 37,
        Q_ = 38,
        Z_ = 39,
        ev = 42,
        ch = 44,
        tv = 45,
        pi = 58,
        rv = 61,
        nv = 62,
        iv = 63,
        sv = 64,
        fh = 91,
        hh = 93,
        ov = 96,
        dh = 123,
        av = 124,
        ph = 125,
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
    var lv = ["y", "Y", "yes", "Yes", "YES", "on", "On", "ON", "n", "N", "no", "No", "NO", "off", "Off", "OFF"],
        uv = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
    function cv(e, t) {
        var r, n, i, s, o, a, l;
        if (t === null) return {};
        for (r = {}, n = Object.keys(t), i = 0, s = n.length; i < s; i += 1)
            (o = n[i]),
                (a = String(t[o])),
                o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2)),
                (l = e.compiledTypeMap.fallback[o]),
                l && uh.call(l.styleAliases, a) && (a = l.styleAliases[a]),
                (r[o] = a);
        return r;
    }
    function fv(e) {
        var t, r, n;
        if (((t = e.toString(16).toUpperCase()), e <= 255)) (r = "x"), (n = 2);
        else if (e <= 65535) (r = "u"), (n = 4);
        else if (e <= 4294967295) (r = "U"), (n = 8);
        else throw new on("code point within a string may not be greater than 0xFFFFFFFF");
        return "\\" + r + gi.repeat("0", n - t.length) + t;
    }
    var hv = 1,
        nn = 2;
    function dv(e) {
        (this.schema = e.schema || G_),
            (this.indent = Math.max(1, e.indent || 2)),
            (this.noArrayIndent = e.noArrayIndent || !1),
            (this.skipInvalid = e.skipInvalid || !1),
            (this.flowLevel = gi.isNothing(e.flowLevel) ? -1 : e.flowLevel),
            (this.styleMap = cv(this.schema, e.styles || null)),
            (this.sortKeys = e.sortKeys || !1),
            (this.lineWidth = e.lineWidth || 80),
            (this.noRefs = e.noRefs || !1),
            (this.noCompatMode = e.noCompatMode || !1),
            (this.condenseFlow = e.condenseFlow || !1),
            (this.quotingType = e.quotingType === '"' ? nn : hv),
            (this.forceQuotes = e.forceQuotes || !1),
            (this.replacer = typeof e.replacer == "function" ? e.replacer : null),
            (this.implicitTypes = this.schema.compiledImplicit),
            (this.explicitTypes = this.schema.compiledExplicit),
            (this.tag = null),
            (this.result = ""),
            (this.duplicates = []),
            (this.usedDuplicates = null);
    }
    function eh(e, t) {
        for (var r = gi.repeat(" ", t), n = 0, i = -1, s = "", o, a = e.length; n < a; )
            (i = e.indexOf("\n", n)),
                i === -1 ? ((o = e.slice(n)), (n = a)) : ((o = e.slice(n, i + 1)), (n = i + 1)),
                o.length && o !== "\n" && (s += r),
                (s += o);
        return s;
    }
    function To(e, t) {
        return "\n" + gi.repeat(" ", e.indent * t);
    }
    function pv(e, t) {
        var r, n, i;
        for (r = 0, n = e.implicitTypes.length; r < n; r += 1) if (((i = e.implicitTypes[r]), i.resolve(t))) return !0;
        return !1;
    }
    function mi(e) {
        return e === z_ || e === V_;
    }
    function sn(e) {
        return (
            (32 <= e && e <= 126) ||
            (161 <= e && e <= 55295 && e !== 8232 && e !== 8233) ||
            (57344 <= e && e <= 65533 && e !== xo) ||
            (65536 <= e && e <= 1114111)
        );
    }
    function th(e) {
        return sn(e) && e !== xo && e !== Y_ && e !== rn;
    }
    function rh(e, t, r) {
        var n = th(e),
            i = n && !mi(e);
        return (
            ((r ? n : n && e !== ch && e !== fh && e !== hh && e !== dh && e !== ph) && e !== Co && !(t === pi && !i)) ||
            (th(t) && !mi(t) && e === Co) ||
            (t === pi && i)
        );
    }
    function mv(e) {
        return (
            sn(e) &&
            e !== xo &&
            !mi(e) &&
            e !== tv &&
            e !== iv &&
            e !== pi &&
            e !== ch &&
            e !== fh &&
            e !== hh &&
            e !== dh &&
            e !== ph &&
            e !== Co &&
            e !== Q_ &&
            e !== ev &&
            e !== X_ &&
            e !== av &&
            e !== rv &&
            e !== nv &&
            e !== Z_ &&
            e !== K_ &&
            e !== J_ &&
            e !== sv &&
            e !== ov
        );
    }
    function gv(e) {
        return !mi(e) && e !== pi;
    }
    function tn(e, t) {
        var r = e.charCodeAt(t),
            n;
        return r >= 55296 && r <= 56319 && t + 1 < e.length && ((n = e.charCodeAt(t + 1)), n >= 56320 && n <= 57343)
            ? (r - 55296) * 1024 + n - 56320 + 65536
            : r;
    }
    function mh(e) {
        var t = /^\n* /;
        return t.test(e);
    }
    var gh = 1,
        bo = 2,
        wh = 3,
        yh = 4,
        pr = 5;
    function wv(e, t, r, n, i, s, o, a) {
        var l,
            d = 0,
            c = null,
            f = !1,
            m = !1,
            p = n !== -1,
            _ = -1,
            v = mv(tn(e, 0)) && gv(tn(e, e.length - 1));
        if (t || o)
            for (l = 0; l < e.length; d >= 65536 ? (l += 2) : l++) {
                if (((d = tn(e, l)), !sn(d))) return pr;
                (v = v && rh(d, c, a)), (c = d);
            }
        else {
            for (l = 0; l < e.length; d >= 65536 ? (l += 2) : l++) {
                if (((d = tn(e, l)), d === rn)) (f = !0), p && ((m = m || (l - _ - 1 > n && e[_ + 1] !== " ")), (_ = l));
                else if (!sn(d)) return pr;
                (v = v && rh(d, c, a)), (c = d);
            }
            m = m || (p && l - _ - 1 > n && e[_ + 1] !== " ");
        }
        return !f && !m
            ? v && !o && !i(e)
                ? gh
                : s === nn
                ? pr
                : bo
            : r > 9 && mh(e)
            ? pr
            : o
            ? s === nn
                ? pr
                : bo
            : m
            ? yh
            : wh;
    }
    function yv(e, t, r, n, i) {
        e.dump = (function () {
            if (t.length === 0) return e.quotingType === nn ? '""' : "''";
            if (!e.noCompatMode && (lv.indexOf(t) !== -1 || uv.test(t)))
                return e.quotingType === nn ? '"' + t + '"' : "'" + t + "'";
            var s = e.indent * Math.max(1, r),
                o = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - s),
                a = n || (e.flowLevel > -1 && r >= e.flowLevel);
            function l(d) {
                return pv(e, d);
            }
            switch (wv(t, a, e.indent, o, l, e.quotingType, e.forceQuotes && !n, i)) {
                case gh:
                    return t;
                case bo:
                    return "'" + t.replace(/'/g, "''") + "'";
                case wh:
                    return "|" + nh(t, e.indent) + ih(eh(t, s));
                case yh:
                    return ">" + nh(t, e.indent) + ih(eh(Ev(t, o), s));
                case pr:
                    return '"' + _v(t, o) + '"';
                default:
                    throw new on("impossible error: invalid scalar style");
            }
        })();
    }
    function nh(e, t) {
        var r = mh(e) ? String(t) : "",
            n = e[e.length - 1] === "\n",
            i = n && (e[e.length - 2] === "\n" || e === "\n"),
            s = i ? "+" : n ? "" : "-";
        return r + s + "\n";
    }
    function ih(e) {
        return e[e.length - 1] === "\n" ? e.slice(0, -1) : e;
    }
    function Ev(e, t) {
        for (
            var r = /(\n+)([^\n]*)/g,
                n = (function () {
                    var d = e.indexOf("\n");
                    return (d = d !== -1 ? d : e.length), (r.lastIndex = d), sh(e.slice(0, d), t);
                })(),
                i = e[0] === "\n" || e[0] === " ",
                s,
                o;
            (o = r.exec(e));

        ) {
            var a = o[1],
                l = o[2];
            (s = l[0] === " "), (n += a + (!i && !s && l !== "" ? "\n" : "") + sh(l, t)), (i = s);
        }
        return n;
    }
    function sh(e, t) {
        if (e === "" || e[0] === " ") return e;
        for (var r = / [^ ]/g, n, i = 0, s, o = 0, a = 0, l = ""; (n = r.exec(e)); )
            (a = n.index), a - i > t && ((s = o > i ? o : a), (l += "\n" + e.slice(i, s)), (i = s + 1)), (o = a);
        return (
            (l += "\n"), e.length - i > t && o > i ? (l += e.slice(i, o) + "\n" + e.slice(o + 1)) : (l += e.slice(i)), l.slice(1)
        );
    }
    function _v(e) {
        for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? (i += 2) : i++)
            (r = tn(e, i)), (n = ge[r]), !n && sn(r) ? ((t += e[i]), r >= 65536 && (t += e[i + 1])) : (t += n || fv(r));
        return t;
    }
    function vv(e, t, r) {
        var n = "",
            i = e.tag,
            s,
            o,
            a;
        for (s = 0, o = r.length; s < o; s += 1)
            (a = r[s]),
                e.replacer && (a = e.replacer.call(r, String(s), a)),
                (tt(e, t, a, !1, !1) || (typeof a > "u" && tt(e, t, null, !1, !1))) &&
                    (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), (n += e.dump));
        (e.tag = i), (e.dump = "[" + n + "]");
    }
    function oh(e, t, r, n) {
        var i = "",
            s = e.tag,
            o,
            a,
            l;
        for (o = 0, a = r.length; o < a; o += 1)
            (l = r[o]),
                e.replacer && (l = e.replacer.call(r, String(o), l)),
                (tt(e, t + 1, l, !0, !0, !1, !0) || (typeof l > "u" && tt(e, t + 1, null, !0, !0, !1, !0))) &&
                    ((!n || i !== "") && (i += To(e, t)),
                    e.dump && rn === e.dump.charCodeAt(0) ? (i += "-") : (i += "- "),
                    (i += e.dump));
        (e.tag = s), (e.dump = i || "[]");
    }
    function Sv(e, t, r) {
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
                tt(e, t, l, !1, !1) &&
                    (e.dump.length > 1024 && (c += "? "),
                    (c += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " ")),
                    tt(e, t, d, !1, !1) && ((c += e.dump), (n += c)));
        (e.tag = i), (e.dump = "{" + n + "}");
    }
    function Av(e, t, r, n) {
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
        else if (e.sortKeys) throw new on("sortKeys must be a boolean or a function");
        for (a = 0, l = o.length; a < l; a += 1)
            (m = ""),
                (!n || i !== "") && (m += To(e, t)),
                (d = o[a]),
                (c = r[d]),
                e.replacer && (c = e.replacer.call(r, d, c)),
                tt(e, t + 1, d, !0, !0, !0) &&
                    ((f = (e.tag !== null && e.tag !== "?") || (e.dump && e.dump.length > 1024)),
                    f && (e.dump && rn === e.dump.charCodeAt(0) ? (m += "?") : (m += "? ")),
                    (m += e.dump),
                    f && (m += To(e, t)),
                    tt(e, t + 1, c, !0, f) &&
                        (e.dump && rn === e.dump.charCodeAt(0) ? (m += ":") : (m += ": "), (m += e.dump), (i += m)));
        (e.tag = s), (e.dump = i || "{}");
    }
    function ah(e, t, r) {
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
                    if (((l = e.styleMap[a.tag] || a.defaultStyle), lh.call(a.represent) === "[object Function]"))
                        n = a.represent(t, l);
                    else if (uh.call(a.represent, l)) n = a.represent[l](t, l);
                    else throw new on("!<" + a.tag + '> tag resolver accepts not "' + l + '" style');
                    e.dump = n;
                }
                return !0;
            }
        return !1;
    }
    function tt(e, t, r, n, i, s, o) {
        (e.tag = null), (e.dump = r), ah(e, r, !1) || ah(e, r, !0);
        var a = lh.call(e.dump),
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
                    ? (Av(e, t, e.dump, i), m && (e.dump = "&ref_" + f + e.dump))
                    : (Sv(e, t, e.dump), m && (e.dump = "&ref_" + f + " " + e.dump));
            else if (a === "[object Array]")
                n && e.dump.length !== 0
                    ? (e.noArrayIndent && !o && t > 0 ? oh(e, t - 1, e.dump, i) : oh(e, t, e.dump, i),
                      m && (e.dump = "&ref_" + f + e.dump))
                    : (vv(e, t, e.dump), m && (e.dump = "&ref_" + f + " " + e.dump));
            else if (a === "[object String]") e.tag !== "?" && yv(e, e.dump, t, s, l);
            else {
                if (a === "[object Undefined]") return !1;
                if (e.skipInvalid) return !1;
                throw new on("unacceptable kind of an object to dump " + a);
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
    function Cv(e, t) {
        var r = [],
            n = [],
            i,
            s;
        for (Oo(e, r, n), i = 0, s = n.length; i < s; i += 1) t.duplicates.push(r[n[i]]);
        t.usedDuplicates = new Array(s);
    }
    function Oo(e, t, r) {
        var n, i, s;
        if (e !== null && typeof e == "object")
            if (((i = t.indexOf(e)), i !== -1)) r.indexOf(i) === -1 && r.push(i);
            else if ((t.push(e), Array.isArray(e))) for (i = 0, s = e.length; i < s; i += 1) Oo(e[i], t, r);
            else for (n = Object.keys(e), i = 0, s = n.length; i < s; i += 1) Oo(e[n[i]], t, r);
    }
    function Tv(e, t) {
        t = t || {};
        var r = new dv(t);
        r.noRefs || Cv(e, r);
        var n = e;
        return r.replacer && (n = r.replacer.call({ "": n }, "", n)), tt(r, 0, n, !0, !0) ? r.dump + "\n" : "";
    }
    Eh.exports.dump = Tv;
});
var wi = g((sI, Se) => {
    "use strict";
    var vh = Zf(),
        bv = _h();
    function No(e, t) {
        return function () {
            throw new Error(
                "Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default."
            );
        };
    }
    Se.exports.Type = me();
    Se.exports.Schema = to();
    Se.exports.FAILSAFE_SCHEMA = so();
    Se.exports.JSON_SCHEMA = co();
    Se.exports.CORE_SCHEMA = fo();
    Se.exports.DEFAULT_SCHEMA = ui();
    Se.exports.load = vh.load;
    Se.exports.loadAll = vh.loadAll;
    Se.exports.dump = bv.dump;
    Se.exports.YAMLException = cr();
    Se.exports.types = {
        binary: go(),
        float: uo(),
        map: io(),
        null: oo(),
        pairs: yo(),
        set: Eo(),
        timestamp: ho(),
        bool: ao(),
        int: lo(),
        merge: po(),
        omap: wo(),
        seq: no(),
        str: ro()
    };
    Se.exports.safeLoad = No("safeLoad", "load");
    Se.exports.safeLoadAll = No("safeLoadAll", "loadAll");
    Se.exports.safeDump = No("safeDump", "dump");
});
var Sh = g(yi => {
    "use strict";
    Object.defineProperty(yi, "__esModule", { value: !0 });
    yi.Lazy = void 0;
    var Io = class {
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
    yi.Lazy = Io;
});
var an = g((aI, Ah) => {
    var Ov = "2.0.0",
        xv = Number.MAX_SAFE_INTEGER || 9007199254740991,
        Nv = 16,
        Iv = 250,
        Rv = ["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"];
    Ah.exports = {
        MAX_LENGTH: 256,
        MAX_SAFE_COMPONENT_LENGTH: Nv,
        MAX_SAFE_BUILD_LENGTH: Iv,
        MAX_SAFE_INTEGER: xv,
        RELEASE_TYPES: Rv,
        SEMVER_SPEC_VERSION: Ov,
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2
    };
});
var ln = g((lI, Ch) => {
    var Pv =
        typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)
            ? (...e) => console.error("SEMVER", ...e)
            : () => {};
    Ch.exports = Pv;
});
var mr = g((ze, Th) => {
    var { MAX_SAFE_COMPONENT_LENGTH: Ro, MAX_SAFE_BUILD_LENGTH: Dv, MAX_LENGTH: Fv } = an(),
        qv = ln();
    ze = Th.exports = {};
    var Lv = (ze.re = []),
        Uv = (ze.safeRe = []),
        O = (ze.src = []),
        $v = (ze.safeSrc = []),
        x = (ze.t = {}),
        kv = 0,
        Po = "[a-zA-Z0-9-]",
        Mv = [
            ["\\s", 1],
            ["\\d", Fv],
            [Po, Dv]
        ],
        Bv = e => {
            for (let [t, r] of Mv)
                e = e
                    .split("".concat(t, "*"))
                    .join("".concat(t, "{0,").concat(r, "}"))
                    .split("".concat(t, "+"))
                    .join("".concat(t, "{1,").concat(r, "}"));
            return e;
        },
        q = (e, t, r) => {
            let n = Bv(t),
                i = kv++;
            qv(e, i, t),
                (x[e] = i),
                (O[i] = t),
                ($v[i] = n),
                (Lv[i] = new RegExp(t, r ? "g" : void 0)),
                (Uv[i] = new RegExp(n, r ? "g" : void 0));
        };
    q("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    q("NUMERICIDENTIFIERLOOSE", "\\d+");
    q("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-]".concat(Po, "*"));
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
    q("BUILDIDENTIFIER", "".concat(Po, "+"));
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
        "(^|[^\\d])(\\d{1,".concat(Ro, "})") + "(?:\\.(\\d{1,".concat(Ro, "}))?") + "(?:\\.(\\d{1,".concat(Ro, "}))?")
    );
    q("COERCE", "".concat(O[x.COERCEPLAIN], "(?:$|[^\\d])"));
    q("COERCEFULL", O[x.COERCEPLAIN] + "(?:".concat(O[x.PRERELEASE], ")?") + "(?:".concat(O[x.BUILD], ")?") + "(?:$|[^\\d])");
    q("COERCERTL", O[x.COERCE], !0);
    q("COERCERTLFULL", O[x.COERCEFULL], !0);
    q("LONETILDE", "(?:~>?)");
    q("TILDETRIM", "(\\s*)".concat(O[x.LONETILDE], "\\s+"), !0);
    ze.tildeTrimReplace = "$1~";
    q("TILDE", "^".concat(O[x.LONETILDE]).concat(O[x.XRANGEPLAIN], "$"));
    q("TILDELOOSE", "^".concat(O[x.LONETILDE]).concat(O[x.XRANGEPLAINLOOSE], "$"));
    q("LONECARET", "(?:\\^)");
    q("CARETTRIM", "(\\s*)".concat(O[x.LONECARET], "\\s+"), !0);
    ze.caretTrimReplace = "$1^";
    q("CARET", "^".concat(O[x.LONECARET]).concat(O[x.XRANGEPLAIN], "$"));
    q("CARETLOOSE", "^".concat(O[x.LONECARET]).concat(O[x.XRANGEPLAINLOOSE], "$"));
    q("COMPARATORLOOSE", "^".concat(O[x.GTLT], "\\s*(").concat(O[x.LOOSEPLAIN], ")$|^$"));
    q("COMPARATOR", "^".concat(O[x.GTLT], "\\s*(").concat(O[x.FULLPLAIN], ")$|^$"));
    q("COMPARATORTRIM", "(\\s*)".concat(O[x.GTLT], "\\s*(").concat(O[x.LOOSEPLAIN], "|").concat(O[x.XRANGEPLAIN], ")"), !0);
    ze.comparatorTrimReplace = "$1$2$3";
    q("HYPHENRANGE", "^\\s*(".concat(O[x.XRANGEPLAIN], ")") + "\\s+-\\s+" + "(".concat(O[x.XRANGEPLAIN], ")") + "\\s*$");
    q(
        "HYPHENRANGELOOSE",
        "^\\s*(".concat(O[x.XRANGEPLAINLOOSE], ")") + "\\s+-\\s+" + "(".concat(O[x.XRANGEPLAINLOOSE], ")") + "\\s*$"
    );
    q("STAR", "(<|>)?=?\\s*\\*");
    q("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    q("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
});
var Ei = g((uI, bh) => {
    var Hv = Object.freeze({ loose: !0 }),
        jv = Object.freeze({}),
        Wv = e => (e ? (typeof e != "object" ? Hv : e) : jv);
    bh.exports = Wv;
});
var Do = g((cI, Nh) => {
    var Oh = /^[0-9]+$/,
        xh = (e, t) => {
            let r = Oh.test(e),
                n = Oh.test(t);
            return r && n && ((e = +e), (t = +t)), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
        },
        Gv = (e, t) => xh(t, e);
    Nh.exports = { compareIdentifiers: xh, rcompareIdentifiers: Gv };
});
var we = g((fI, Dh) => {
    var _i = ln(),
        { MAX_LENGTH: Ih, MAX_SAFE_INTEGER: vi } = an(),
        { safeRe: Rh, safeSrc: Ph, t: Si } = mr(),
        Vv = Ei(),
        { compareIdentifiers: gr } = Do(),
        Fo = class e {
            constructor(t, r) {
                if (((r = Vv(r)), t instanceof e)) {
                    if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease) return t;
                    t = t.version;
                } else if (typeof t != "string")
                    throw new TypeError('Invalid version. Must be a string. Got type "'.concat(typeof t, '".'));
                if (t.length > Ih) throw new TypeError("version is longer than ".concat(Ih, " characters"));
                _i("SemVer", t, r),
                    (this.options = r),
                    (this.loose = !!r.loose),
                    (this.includePrerelease = !!r.includePrerelease);
                let n = t.trim().match(r.loose ? Rh[Si.LOOSE] : Rh[Si.FULL]);
                if (!n) throw new TypeError("Invalid Version: ".concat(t));
                if (
                    ((this.raw = t),
                    (this.major = +n[1]),
                    (this.minor = +n[2]),
                    (this.patch = +n[3]),
                    this.major > vi || this.major < 0)
                )
                    throw new TypeError("Invalid major version");
                if (this.minor > vi || this.minor < 0) throw new TypeError("Invalid minor version");
                if (this.patch > vi || this.patch < 0) throw new TypeError("Invalid patch version");
                n[4]
                    ? (this.prerelease = n[4].split(".").map(i => {
                          if (/^[0-9]+$/.test(i)) {
                              let s = +i;
                              if (s >= 0 && s < vi) return s;
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
                if ((_i("SemVer.compare", this.version, this.options, t), !(t instanceof e))) {
                    if (typeof t == "string" && t === this.version) return 0;
                    t = new e(t, this.options);
                }
                return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
            }
            compareMain(t) {
                return (
                    t instanceof e || (t = new e(t, this.options)),
                    gr(this.major, t.major) || gr(this.minor, t.minor) || gr(this.patch, t.patch)
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
                    if ((_i("prerelease compare", r, n, i), n === void 0 && i === void 0)) return 0;
                    if (i === void 0) return 1;
                    if (n === void 0) return -1;
                    if (n === i) continue;
                    return gr(n, i);
                } while (++r);
            }
            compareBuild(t) {
                t instanceof e || (t = new e(t, this.options));
                let r = 0;
                do {
                    let n = this.build[r],
                        i = t.build[r];
                    if ((_i("build compare", r, n, i), n === void 0 && i === void 0)) return 0;
                    if (i === void 0) return 1;
                    if (n === void 0) return -1;
                    if (n === i) continue;
                    return gr(n, i);
                } while (++r);
            }
            inc(t, r, n) {
                if (t.startsWith("pre")) {
                    if (!r && n === !1) throw new Error("invalid increment argument: identifier is empty");
                    if (r) {
                        let i = new RegExp("^".concat(this.options.loose ? Ph[Si.PRERELEASELOOSE] : Ph[Si.PRERELEASE], "$")),
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
                                gr(this.prerelease[0], r) === 0
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
    Dh.exports = Fo;
});
var Lt = g((hI, qh) => {
    var Fh = we(),
        Yv = (e, t, r = !1) => {
            if (e instanceof Fh) return e;
            try {
                return new Fh(e, t);
            } catch (n) {
                if (!r) return null;
                throw n;
            }
        };
    qh.exports = Yv;
});
var Uh = g((dI, Lh) => {
    var zv = Lt(),
        Xv = (e, t) => {
            let r = zv(e, t);
            return r ? r.version : null;
        };
    Lh.exports = Xv;
});
var kh = g((pI, $h) => {
    var Kv = Lt(),
        Jv = (e, t) => {
            let r = Kv(e.trim().replace(/^[=v]+/, ""), t);
            return r ? r.version : null;
        };
    $h.exports = Jv;
});
var Hh = g((mI, Bh) => {
    var Mh = we(),
        Qv = (e, t, r, n, i) => {
            typeof r == "string" && ((i = n), (n = r), (r = void 0));
            try {
                return new Mh(e instanceof Mh ? e.version : e, r).inc(t, n, i).version;
            } catch {
                return null;
            }
        };
    Bh.exports = Qv;
});
var Gh = g((gI, Wh) => {
    var jh = Lt(),
        Zv = (e, t) => {
            let r = jh(e, null, !0),
                n = jh(t, null, !0),
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
    Wh.exports = Zv;
});
var Yh = g((wI, Vh) => {
    var eS = we(),
        tS = (e, t) => new eS(e, t).major;
    Vh.exports = tS;
});
var Xh = g((yI, zh) => {
    var rS = we(),
        nS = (e, t) => new rS(e, t).minor;
    zh.exports = nS;
});
var Jh = g((EI, Kh) => {
    var iS = we(),
        sS = (e, t) => new iS(e, t).patch;
    Kh.exports = sS;
});
var Zh = g((_I, Qh) => {
    var oS = Lt(),
        aS = (e, t) => {
            let r = oS(e, t);
            return r && r.prerelease.length ? r.prerelease : null;
        };
    Qh.exports = aS;
});
var $e = g((vI, td) => {
    var ed = we(),
        lS = (e, t, r) => new ed(e, r).compare(new ed(t, r));
    td.exports = lS;
});
var nd = g((SI, rd) => {
    var uS = $e(),
        cS = (e, t, r) => uS(t, e, r);
    rd.exports = cS;
});
var sd = g((AI, id) => {
    var fS = $e(),
        hS = (e, t) => fS(e, t, !0);
    id.exports = hS;
});
var Ai = g((CI, ad) => {
    var od = we(),
        dS = (e, t, r) => {
            let n = new od(e, r),
                i = new od(t, r);
            return n.compare(i) || n.compareBuild(i);
        };
    ad.exports = dS;
});
var ud = g((TI, ld) => {
    var pS = Ai(),
        mS = (e, t) => e.sort((r, n) => pS(r, n, t));
    ld.exports = mS;
});
var fd = g((bI, cd) => {
    var gS = Ai(),
        wS = (e, t) => e.sort((r, n) => gS(n, r, t));
    cd.exports = wS;
});
var un = g((OI, hd) => {
    var yS = $e(),
        ES = (e, t, r) => yS(e, t, r) > 0;
    hd.exports = ES;
});
var Ci = g((xI, dd) => {
    var _S = $e(),
        vS = (e, t, r) => _S(e, t, r) < 0;
    dd.exports = vS;
});
var qo = g((NI, pd) => {
    var SS = $e(),
        AS = (e, t, r) => SS(e, t, r) === 0;
    pd.exports = AS;
});
var Lo = g((II, md) => {
    var CS = $e(),
        TS = (e, t, r) => CS(e, t, r) !== 0;
    md.exports = TS;
});
var Ti = g((RI, gd) => {
    var bS = $e(),
        OS = (e, t, r) => bS(e, t, r) >= 0;
    gd.exports = OS;
});
var bi = g((PI, wd) => {
    var xS = $e(),
        NS = (e, t, r) => xS(e, t, r) <= 0;
    wd.exports = NS;
});
var Uo = g((DI, yd) => {
    var IS = qo(),
        RS = Lo(),
        PS = un(),
        DS = Ti(),
        FS = Ci(),
        qS = bi(),
        LS = (e, t, r, n) => {
            switch (t) {
                case "===":
                    return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
                case "!==":
                    return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
                case "":
                case "=":
                case "==":
                    return IS(e, r, n);
                case "!=":
                    return RS(e, r, n);
                case ">":
                    return PS(e, r, n);
                case ">=":
                    return DS(e, r, n);
                case "<":
                    return FS(e, r, n);
                case "<=":
                    return qS(e, r, n);
                default:
                    throw new TypeError("Invalid operator: ".concat(t));
            }
        };
    yd.exports = LS;
});
var _d = g((FI, Ed) => {
    var US = we(),
        $S = Lt(),
        { safeRe: Oi, t: xi } = mr(),
        kS = (e, t) => {
            if (e instanceof US) return e;
            if ((typeof e == "number" && (e = String(e)), typeof e != "string")) return null;
            t = t || {};
            let r = null;
            if (!t.rtl) r = e.match(t.includePrerelease ? Oi[xi.COERCEFULL] : Oi[xi.COERCE]);
            else {
                let l = t.includePrerelease ? Oi[xi.COERCERTLFULL] : Oi[xi.COERCERTL],
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
            return $S("".concat(n, ".").concat(i, ".").concat(s).concat(o).concat(a), t);
        };
    Ed.exports = kS;
});
var Sd = g((qI, vd) => {
    var $o = class {
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
    vd.exports = $o;
});
var ke = g((LI, bd) => {
    var MS = /\s+/g,
        ko = class e {
            constructor(t, r) {
                if (((r = HS(r)), t instanceof e))
                    return t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease ? t : new e(t.raw, r);
                if (t instanceof Mo) return (this.raw = t.value), (this.set = [[t]]), (this.formatted = void 0), this;
                if (
                    ((this.options = r),
                    (this.loose = !!r.loose),
                    (this.includePrerelease = !!r.includePrerelease),
                    (this.raw = t.trim().replace(MS, " ")),
                    (this.set = this.raw
                        .split("||")
                        .map(n => this.parseRange(n.trim()))
                        .filter(n => n.length)),
                    !this.set.length)
                )
                    throw new TypeError("Invalid SemVer Range: ".concat(this.raw));
                if (this.set.length > 1) {
                    let n = this.set[0];
                    if (((this.set = this.set.filter(i => !Cd(i[0]))), this.set.length === 0)) this.set = [n];
                    else if (this.set.length > 1) {
                        for (let i of this.set)
                            if (i.length === 1 && XS(i[0])) {
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
                let n = ((this.options.includePrerelease && YS) | (this.options.loose && zS)) + ":" + t,
                    i = Ad.get(n);
                if (i) return i;
                let s = this.options.loose,
                    o = s ? Pe[Ae.HYPHENRANGELOOSE] : Pe[Ae.HYPHENRANGE];
                (t = t.replace(o, sA(this.options.includePrerelease))),
                    X("hyphen replace", t),
                    (t = t.replace(Pe[Ae.COMPARATORTRIM], WS)),
                    X("comparator trim", t),
                    (t = t.replace(Pe[Ae.TILDETRIM], GS)),
                    X("tilde trim", t),
                    (t = t.replace(Pe[Ae.CARETTRIM], VS)),
                    X("caret trim", t);
                let a = t
                    .split(" ")
                    .map(f => KS(f, this.options))
                    .join(" ")
                    .split(/\s+/)
                    .map(f => iA(f, this.options));
                s && (a = a.filter(f => (X("loose invalid filter", f, this.options), !!f.match(Pe[Ae.COMPARATORLOOSE])))),
                    X("range list", a);
                let l = new Map(),
                    d = a.map(f => new Mo(f, this.options));
                for (let f of d) {
                    if (Cd(f)) return [f];
                    l.set(f.value, f);
                }
                l.size > 1 && l.has("") && l.delete("");
                let c = [...l.values()];
                return Ad.set(n, c), c;
            }
            intersects(t, r) {
                if (!(t instanceof e)) throw new TypeError("a Range is required");
                return this.set.some(
                    n => Td(n, r) && t.set.some(i => Td(i, r) && n.every(s => i.every(o => s.intersects(o, r))))
                );
            }
            test(t) {
                if (!t) return !1;
                if (typeof t == "string")
                    try {
                        t = new jS(t, this.options);
                    } catch {
                        return !1;
                    }
                for (let r = 0; r < this.set.length; r++) if (oA(this.set[r], t, this.options)) return !0;
                return !1;
            }
        };
    bd.exports = ko;
    var BS = Sd(),
        Ad = new BS(),
        HS = Ei(),
        Mo = cn(),
        X = ln(),
        jS = we(),
        { safeRe: Pe, t: Ae, comparatorTrimReplace: WS, tildeTrimReplace: GS, caretTrimReplace: VS } = mr(),
        { FLAG_INCLUDE_PRERELEASE: YS, FLAG_LOOSE: zS } = an(),
        Cd = e => e.value === "<0.0.0-0",
        XS = e => e.value === "",
        Td = (e, t) => {
            let r = !0,
                n = e.slice(),
                i = n.pop();
            for (; r && n.length; ) (r = n.every(s => i.intersects(s, t))), (i = n.pop());
            return r;
        },
        KS = (e, t) => (
            X("comp", e, t),
            (e = ZS(e, t)),
            X("caret", e),
            (e = JS(e, t)),
            X("tildes", e),
            (e = tA(e, t)),
            X("xrange", e),
            (e = nA(e, t)),
            X("stars", e),
            e
        ),
        Ce = e => !e || e.toLowerCase() === "x" || e === "*",
        JS = (e, t) =>
            e
                .trim()
                .split(/\s+/)
                .map(r => QS(r, t))
                .join(" "),
        QS = (e, t) => {
            let r = t.loose ? Pe[Ae.TILDELOOSE] : Pe[Ae.TILDE];
            return e.replace(r, (n, i, s, o, a) => {
                X("tilde", e, n, i, s, o, a);
                let l;
                return (
                    Ce(i)
                        ? (l = "")
                        : Ce(s)
                        ? (l = ">=".concat(i, ".0.0 <").concat(+i + 1, ".0.0-0"))
                        : Ce(o)
                        ? (l = ">="
                              .concat(i, ".")
                              .concat(s, ".0 <")
                              .concat(i, ".")
                              .concat(+s + 1, ".0-0"))
                        : a
                        ? (X("replaceTilde pr", a),
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
                    X("tilde return", l),
                    l
                );
            });
        },
        ZS = (e, t) =>
            e
                .trim()
                .split(/\s+/)
                .map(r => eA(r, t))
                .join(" "),
        eA = (e, t) => {
            X("caret", e, t);
            let r = t.loose ? Pe[Ae.CARETLOOSE] : Pe[Ae.CARET],
                n = t.includePrerelease ? "-0" : "";
            return e.replace(r, (i, s, o, a, l) => {
                X("caret", e, i, s, o, a, l);
                let d;
                return (
                    Ce(s)
                        ? (d = "")
                        : Ce(o)
                        ? (d = ">="
                              .concat(s, ".0.0")
                              .concat(n, " <")
                              .concat(+s + 1, ".0.0-0"))
                        : Ce(a)
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
                        ? (X("replaceCaret pr", l),
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
                        : (X("no pr"),
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
                    X("caret return", d),
                    d
                );
            });
        },
        tA = (e, t) => (
            X("replaceXRanges", e, t),
            e
                .split(/\s+/)
                .map(r => rA(r, t))
                .join(" ")
        ),
        rA = (e, t) => {
            e = e.trim();
            let r = t.loose ? Pe[Ae.XRANGELOOSE] : Pe[Ae.XRANGE];
            return e.replace(r, (n, i, s, o, a, l) => {
                X("xRange", e, n, i, s, o, a, l);
                let d = Ce(s),
                    c = d || Ce(o),
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
                    X("xRange return", n),
                    n
                );
            });
        },
        nA = (e, t) => (X("replaceStars", e, t), e.trim().replace(Pe[Ae.STAR], "")),
        iA = (e, t) => (X("replaceGTE0", e, t), e.trim().replace(Pe[t.includePrerelease ? Ae.GTE0PRE : Ae.GTE0], "")),
        sA = e => (t, r, n, i, s, o, a, l, d, c, f, m) => (
            Ce(n)
                ? (r = "")
                : Ce(i)
                ? (r = ">=".concat(n, ".0.0").concat(e ? "-0" : ""))
                : Ce(s)
                ? (r = ">="
                      .concat(n, ".")
                      .concat(i, ".0")
                      .concat(e ? "-0" : ""))
                : o
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
        oA = (e, t, r) => {
            for (let n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
            if (t.prerelease.length && !r.includePrerelease) {
                for (let n = 0; n < e.length; n++)
                    if ((X(e[n].semver), e[n].semver !== Mo.ANY && e[n].semver.prerelease.length > 0)) {
                        let i = e[n].semver;
                        if (i.major === t.major && i.minor === t.minor && i.patch === t.patch) return !0;
                    }
                return !1;
            }
            return !0;
        };
});
var cn = g((UI, Pd) => {
    var fn = Symbol("SemVer ANY"),
        jo = class e {
            static get ANY() {
                return fn;
            }
            constructor(t, r) {
                if (((r = Od(r)), t instanceof e)) {
                    if (t.loose === !!r.loose) return t;
                    t = t.value;
                }
                (t = t.trim().split(/\s+/).join(" ")),
                    Ho("comparator", t, r),
                    (this.options = r),
                    (this.loose = !!r.loose),
                    this.parse(t),
                    this.semver === fn ? (this.value = "") : (this.value = this.operator + this.semver.version),
                    Ho("comp", this);
            }
            parse(t) {
                let r = this.options.loose ? xd[Nd.COMPARATORLOOSE] : xd[Nd.COMPARATOR],
                    n = t.match(r);
                if (!n) throw new TypeError("Invalid comparator: ".concat(t));
                (this.operator = n[1] !== void 0 ? n[1] : ""),
                    this.operator === "=" && (this.operator = ""),
                    n[2] ? (this.semver = new Id(n[2], this.options.loose)) : (this.semver = fn);
            }
            toString() {
                return this.value;
            }
            test(t) {
                if ((Ho("Comparator.test", t, this.options.loose), this.semver === fn || t === fn)) return !0;
                if (typeof t == "string")
                    try {
                        t = new Id(t, this.options);
                    } catch {
                        return !1;
                    }
                return Bo(t, this.operator, this.semver, this.options);
            }
            intersects(t, r) {
                if (!(t instanceof e)) throw new TypeError("a Comparator is required");
                return this.operator === ""
                    ? this.value === ""
                        ? !0
                        : new Rd(t.value, r).test(this.value)
                    : t.operator === ""
                    ? t.value === ""
                        ? !0
                        : new Rd(this.value, r).test(t.semver)
                    : ((r = Od(r)),
                      (r.includePrerelease && (this.value === "<0.0.0-0" || t.value === "<0.0.0-0")) ||
                      (!r.includePrerelease && (this.value.startsWith("<0.0.0") || t.value.startsWith("<0.0.0")))
                          ? !1
                          : !!(
                                (this.operator.startsWith(">") && t.operator.startsWith(">")) ||
                                (this.operator.startsWith("<") && t.operator.startsWith("<")) ||
                                (this.semver.version === t.semver.version &&
                                    this.operator.includes("=") &&
                                    t.operator.includes("=")) ||
                                (Bo(this.semver, "<", t.semver, r) &&
                                    this.operator.startsWith(">") &&
                                    t.operator.startsWith("<")) ||
                                (Bo(this.semver, ">", t.semver, r) && this.operator.startsWith("<") && t.operator.startsWith(">"))
                            ));
            }
        };
    Pd.exports = jo;
    var Od = Ei(),
        { safeRe: xd, t: Nd } = mr(),
        Bo = Uo(),
        Ho = ln(),
        Id = we(),
        Rd = ke();
});
var hn = g(($I, Dd) => {
    var aA = ke(),
        lA = (e, t, r) => {
            try {
                t = new aA(t, r);
            } catch {
                return !1;
            }
            return t.test(e);
        };
    Dd.exports = lA;
});
var qd = g((kI, Fd) => {
    var uA = ke(),
        cA = (e, t) =>
            new uA(e, t).set.map(r =>
                r
                    .map(n => n.value)
                    .join(" ")
                    .trim()
                    .split(" ")
            );
    Fd.exports = cA;
});
var Ud = g((MI, Ld) => {
    var fA = we(),
        hA = ke(),
        dA = (e, t, r) => {
            let n = null,
                i = null,
                s = null;
            try {
                s = new hA(t, r);
            } catch {
                return null;
            }
            return (
                e.forEach(o => {
                    s.test(o) && (!n || i.compare(o) === -1) && ((n = o), (i = new fA(n, r)));
                }),
                n
            );
        };
    Ld.exports = dA;
});
var kd = g((BI, $d) => {
    var pA = we(),
        mA = ke(),
        gA = (e, t, r) => {
            let n = null,
                i = null,
                s = null;
            try {
                s = new mA(t, r);
            } catch {
                return null;
            }
            return (
                e.forEach(o => {
                    s.test(o) && (!n || i.compare(o) === 1) && ((n = o), (i = new pA(n, r)));
                }),
                n
            );
        };
    $d.exports = gA;
});
var Hd = g((HI, Bd) => {
    var Wo = we(),
        wA = ke(),
        Md = un(),
        yA = (e, t) => {
            e = new wA(e, t);
            let r = new Wo("0.0.0");
            if (e.test(r) || ((r = new Wo("0.0.0-0")), e.test(r))) return r;
            r = null;
            for (let n = 0; n < e.set.length; ++n) {
                let i = e.set[n],
                    s = null;
                i.forEach(o => {
                    let a = new Wo(o.semver.version);
                    switch (o.operator) {
                        case ">":
                            a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), (a.raw = a.format());
                        case "":
                        case ">=":
                            (!s || Md(a, s)) && (s = a);
                            break;
                        case "<":
                        case "<=":
                            break;
                        default:
                            throw new Error("Unexpected operation: ".concat(o.operator));
                    }
                }),
                    s && (!r || Md(r, s)) && (r = s);
            }
            return r && e.test(r) ? r : null;
        };
    Bd.exports = yA;
});
var Wd = g((jI, jd) => {
    var EA = ke(),
        _A = (e, t) => {
            try {
                return new EA(e, t).range || "*";
            } catch {
                return null;
            }
        };
    jd.exports = _A;
});
var Ni = g((WI, zd) => {
    var vA = we(),
        Yd = cn(),
        { ANY: SA } = Yd,
        AA = ke(),
        CA = hn(),
        Gd = un(),
        Vd = Ci(),
        TA = bi(),
        bA = Ti(),
        OA = (e, t, r, n) => {
            (e = new vA(e, n)), (t = new AA(t, n));
            let i, s, o, a, l;
            switch (r) {
                case ">":
                    (i = Gd), (s = TA), (o = Vd), (a = ">"), (l = ">=");
                    break;
                case "<":
                    (i = Vd), (s = bA), (o = Gd), (a = "<"), (l = "<=");
                    break;
                default:
                    throw new TypeError('Must provide a hilo val of "<" or ">"');
            }
            if (CA(e, t, n)) return !1;
            for (let d = 0; d < t.set.length; ++d) {
                let c = t.set[d],
                    f = null,
                    m = null;
                if (
                    (c.forEach(p => {
                        p.semver === SA && (p = new Yd(">=0.0.0")),
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
    zd.exports = OA;
});
var Kd = g((GI, Xd) => {
    var xA = Ni(),
        NA = (e, t, r) => xA(e, t, ">", r);
    Xd.exports = NA;
});
var Qd = g((VI, Jd) => {
    var IA = Ni(),
        RA = (e, t, r) => IA(e, t, "<", r);
    Jd.exports = RA;
});
var tp = g((YI, ep) => {
    var Zd = ke(),
        PA = (e, t, r) => ((e = new Zd(e, r)), (t = new Zd(t, r)), e.intersects(t, r));
    ep.exports = PA;
});
var np = g((zI, rp) => {
    var DA = hn(),
        FA = $e();
    rp.exports = (e, t, r) => {
        let n = [],
            i = null,
            s = null,
            o = e.sort((c, f) => FA(c, f, r));
        for (let c of o) DA(c, t, r) ? ((s = c), i || (i = c)) : (s && n.push([i, s]), (s = null), (i = null));
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
var up = g((XI, lp) => {
    var ip = ke(),
        Vo = cn(),
        { ANY: Go } = Vo,
        dn = hn(),
        Yo = $e(),
        qA = (e, t, r = {}) => {
            if (e === t) return !0;
            (e = new ip(e, r)), (t = new ip(t, r));
            let n = !1;
            e: for (let i of e.set) {
                for (let s of t.set) {
                    let o = UA(i, s, r);
                    if (((n = n || o !== null), o)) continue e;
                }
                if (n) return !1;
            }
            return !0;
        },
        LA = [new Vo(">=0.0.0-0")],
        sp = [new Vo(">=0.0.0")],
        UA = (e, t, r) => {
            if (e === t) return !0;
            if (e.length === 1 && e[0].semver === Go) {
                if (t.length === 1 && t[0].semver === Go) return !0;
                r.includePrerelease ? (e = LA) : (e = sp);
            }
            if (t.length === 1 && t[0].semver === Go) {
                if (r.includePrerelease) return !0;
                t = sp;
            }
            let n = new Set(),
                i,
                s;
            for (let p of e)
                p.operator === ">" || p.operator === ">="
                    ? (i = op(i, p, r))
                    : p.operator === "<" || p.operator === "<="
                    ? (s = ap(s, p, r))
                    : n.add(p.semver);
            if (n.size > 1) return null;
            let o;
            if (i && s) {
                if (((o = Yo(i.semver, s.semver, r)), o > 0)) return null;
                if (o === 0 && (i.operator !== ">=" || s.operator !== "<=")) return null;
            }
            for (let p of n) {
                if ((i && !dn(p, String(i), r)) || (s && !dn(p, String(s), r))) return null;
                for (let _ of t) if (!dn(p, String(_), r)) return !1;
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
                        if (((a = op(i, p, r)), a === p && a !== i)) return !1;
                    } else if (i.operator === ">=" && !dn(i.semver, String(p), r)) return !1;
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
                        if (((l = ap(s, p, r)), l === p && l !== s)) return !1;
                    } else if (s.operator === "<=" && !dn(s.semver, String(p), r)) return !1;
                }
                if (!p.operator && (s || i) && o !== 0) return !1;
            }
            return !((i && d && !s && o !== 0) || (s && c && !i && o !== 0) || m || f);
        },
        op = (e, t, r) => {
            if (!e) return t;
            let n = Yo(e.semver, t.semver, r);
            return n > 0 ? e : n < 0 || (t.operator === ">" && e.operator === ">=") ? t : e;
        },
        ap = (e, t, r) => {
            if (!e) return t;
            let n = Yo(e.semver, t.semver, r);
            return n < 0 ? e : n > 0 || (t.operator === "<" && e.operator === "<=") ? t : e;
        };
    lp.exports = qA;
});
var Xo = g((KI, hp) => {
    var zo = mr(),
        cp = an(),
        $A = we(),
        fp = Do(),
        kA = Lt(),
        MA = Uh(),
        BA = kh(),
        HA = Hh(),
        jA = Gh(),
        WA = Yh(),
        GA = Xh(),
        VA = Jh(),
        YA = Zh(),
        zA = $e(),
        XA = nd(),
        KA = sd(),
        JA = Ai(),
        QA = ud(),
        ZA = fd(),
        eC = un(),
        tC = Ci(),
        rC = qo(),
        nC = Lo(),
        iC = Ti(),
        sC = bi(),
        oC = Uo(),
        aC = _d(),
        lC = cn(),
        uC = ke(),
        cC = hn(),
        fC = qd(),
        hC = Ud(),
        dC = kd(),
        pC = Hd(),
        mC = Wd(),
        gC = Ni(),
        wC = Kd(),
        yC = Qd(),
        EC = tp(),
        _C = np(),
        vC = up();
    hp.exports = {
        parse: kA,
        valid: MA,
        clean: BA,
        inc: HA,
        diff: jA,
        major: WA,
        minor: GA,
        patch: VA,
        prerelease: YA,
        compare: zA,
        rcompare: XA,
        compareLoose: KA,
        compareBuild: JA,
        sort: QA,
        rsort: ZA,
        gt: eC,
        lt: tC,
        eq: rC,
        neq: nC,
        gte: iC,
        lte: sC,
        cmp: oC,
        coerce: aC,
        Comparator: lC,
        Range: uC,
        satisfies: cC,
        toComparators: fC,
        maxSatisfying: hC,
        minSatisfying: dC,
        minVersion: pC,
        validRange: mC,
        outside: gC,
        gtr: wC,
        ltr: yC,
        intersects: EC,
        simplifyRange: _C,
        subset: vC,
        SemVer: $A,
        re: zo.re,
        src: zo.src,
        tokens: zo.t,
        SEMVER_SPEC_VERSION: cp.SEMVER_SPEC_VERSION,
        RELEASE_TYPES: cp.RELEASE_TYPES,
        compareIdentifiers: fp.compareIdentifiers,
        rcompareIdentifiers: fp.rcompareIdentifiers
    };
});
var Yp = g((pn, yr) => {
    var SC = 200,
        oa = "__lodash_hash_undefined__",
        Ui = 1,
        Cp = 2,
        Tp = 9007199254740991,
        Ii = "[object Arguments]",
        Zo = "[object Array]",
        AC = "[object AsyncFunction]",
        bp = "[object Boolean]",
        Op = "[object Date]",
        xp = "[object Error]",
        Np = "[object Function]",
        CC = "[object GeneratorFunction]",
        Ri = "[object Map]",
        Ip = "[object Number]",
        TC = "[object Null]",
        wr = "[object Object]",
        dp = "[object Promise]",
        bC = "[object Proxy]",
        Rp = "[object RegExp]",
        Pi = "[object Set]",
        Pp = "[object String]",
        OC = "[object Symbol]",
        xC = "[object Undefined]",
        ea = "[object WeakMap]",
        Dp = "[object ArrayBuffer]",
        Di = "[object DataView]",
        NC = "[object Float32Array]",
        IC = "[object Float64Array]",
        RC = "[object Int8Array]",
        PC = "[object Int16Array]",
        DC = "[object Int32Array]",
        FC = "[object Uint8Array]",
        qC = "[object Uint8ClampedArray]",
        LC = "[object Uint16Array]",
        UC = "[object Uint32Array]",
        $C = /[\\^$.*+?()[\]{}|]/g,
        kC = /^\[object .+?Constructor\]$/,
        MC = /^(?:0|[1-9]\d*)$/,
        K = {};
    K[NC] = K[IC] = K[RC] = K[PC] = K[DC] = K[FC] = K[qC] = K[LC] = K[UC] = !0;
    K[Ii] = K[Zo] = K[Dp] = K[bp] = K[Di] = K[Op] = K[xp] = K[Np] = K[Ri] = K[Ip] = K[wr] = K[Rp] = K[Pi] = K[Pp] = K[ea] = !1;
    var Fp = typeof global == "object" && global && global.Object === Object && global,
        BC = typeof self == "object" && self && self.Object === Object && self,
        rt = Fp || BC || Function("return this")(),
        qp = typeof pn == "object" && pn && !pn.nodeType && pn,
        pp = qp && typeof yr == "object" && yr && !yr.nodeType && yr,
        Lp = pp && pp.exports === qp,
        Ko = Lp && Fp.process,
        mp = (function () {
            try {
                return Ko && Ko.binding && Ko.binding("util");
            } catch {}
        })(),
        gp = mp && mp.isTypedArray;
    function HC(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length, i = 0, s = []; ++r < n; ) {
            var o = e[r];
            t(o, r, e) && (s[i++] = o);
        }
        return s;
    }
    function jC(e, t) {
        for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
        return e;
    }
    function WC(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length; ++r < n; ) if (t(e[r], r, e)) return !0;
        return !1;
    }
    function GC(e, t) {
        for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
        return n;
    }
    function VC(e) {
        return function (t) {
            return e(t);
        };
    }
    function YC(e, t) {
        return e.has(t);
    }
    function zC(e, t) {
        return e?.[t];
    }
    function XC(e) {
        var t = -1,
            r = Array(e.size);
        return (
            e.forEach(function (n, i) {
                r[++t] = [i, n];
            }),
            r
        );
    }
    function KC(e, t) {
        return function (r) {
            return e(t(r));
        };
    }
    function JC(e) {
        var t = -1,
            r = Array(e.size);
        return (
            e.forEach(function (n) {
                r[++t] = n;
            }),
            r
        );
    }
    var QC = Array.prototype,
        ZC = Function.prototype,
        $i = Object.prototype,
        Jo = rt["__core-js_shared__"],
        Up = ZC.toString,
        Xe = $i.hasOwnProperty,
        wp = (function () {
            var e = /[^.]+$/.exec((Jo && Jo.keys && Jo.keys.IE_PROTO) || "");
            return e ? "Symbol(src)_1." + e : "";
        })(),
        $p = $i.toString,
        eT = RegExp(
            "^" +
                Up.call(Xe)
                    .replace($C, "\\$&")
                    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") +
                "$"
        ),
        yp = Lp ? rt.Buffer : void 0,
        Fi = rt.Symbol,
        Ep = rt.Uint8Array,
        kp = $i.propertyIsEnumerable,
        tT = QC.splice,
        Ut = Fi ? Fi.toStringTag : void 0,
        _p = Object.getOwnPropertySymbols,
        rT = yp ? yp.isBuffer : void 0,
        nT = KC(Object.keys, Object),
        ta = Er(rt, "DataView"),
        mn = Er(rt, "Map"),
        ra = Er(rt, "Promise"),
        na = Er(rt, "Set"),
        ia = Er(rt, "WeakMap"),
        gn = Er(Object, "create"),
        iT = Mt(ta),
        sT = Mt(mn),
        oT = Mt(ra),
        aT = Mt(na),
        lT = Mt(ia),
        vp = Fi ? Fi.prototype : void 0,
        Qo = vp ? vp.valueOf : void 0;
    function $t(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function uT() {
        (this.__data__ = gn ? gn(null) : {}), (this.size = 0);
    }
    function cT(e) {
        var t = this.has(e) && delete this.__data__[e];
        return (this.size -= t ? 1 : 0), t;
    }
    function fT(e) {
        var t = this.__data__;
        if (gn) {
            var r = t[e];
            return r === oa ? void 0 : r;
        }
        return Xe.call(t, e) ? t[e] : void 0;
    }
    function hT(e) {
        var t = this.__data__;
        return gn ? t[e] !== void 0 : Xe.call(t, e);
    }
    function dT(e, t) {
        var r = this.__data__;
        return (this.size += this.has(e) ? 0 : 1), (r[e] = gn && t === void 0 ? oa : t), this;
    }
    $t.prototype.clear = uT;
    $t.prototype.delete = cT;
    $t.prototype.get = fT;
    $t.prototype.has = hT;
    $t.prototype.set = dT;
    function nt(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function pT() {
        (this.__data__ = []), (this.size = 0);
    }
    function mT(e) {
        var t = this.__data__,
            r = ki(t, e);
        if (r < 0) return !1;
        var n = t.length - 1;
        return r == n ? t.pop() : tT.call(t, r, 1), --this.size, !0;
    }
    function gT(e) {
        var t = this.__data__,
            r = ki(t, e);
        return r < 0 ? void 0 : t[r][1];
    }
    function wT(e) {
        return ki(this.__data__, e) > -1;
    }
    function yT(e, t) {
        var r = this.__data__,
            n = ki(r, e);
        return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    nt.prototype.clear = pT;
    nt.prototype.delete = mT;
    nt.prototype.get = gT;
    nt.prototype.has = wT;
    nt.prototype.set = yT;
    function kt(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function ET() {
        (this.size = 0), (this.__data__ = { hash: new $t(), map: new (mn || nt)(), string: new $t() });
    }
    function _T(e) {
        var t = Mi(this, e).delete(e);
        return (this.size -= t ? 1 : 0), t;
    }
    function vT(e) {
        return Mi(this, e).get(e);
    }
    function ST(e) {
        return Mi(this, e).has(e);
    }
    function AT(e, t) {
        var r = Mi(this, e),
            n = r.size;
        return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    kt.prototype.clear = ET;
    kt.prototype.delete = _T;
    kt.prototype.get = vT;
    kt.prototype.has = ST;
    kt.prototype.set = AT;
    function qi(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.__data__ = new kt(); ++t < r; ) this.add(e[t]);
    }
    function CT(e) {
        return this.__data__.set(e, oa), this;
    }
    function TT(e) {
        return this.__data__.has(e);
    }
    qi.prototype.add = qi.prototype.push = CT;
    qi.prototype.has = TT;
    function wt(e) {
        var t = (this.__data__ = new nt(e));
        this.size = t.size;
    }
    function bT() {
        (this.__data__ = new nt()), (this.size = 0);
    }
    function OT(e) {
        var t = this.__data__,
            r = t.delete(e);
        return (this.size = t.size), r;
    }
    function xT(e) {
        return this.__data__.get(e);
    }
    function NT(e) {
        return this.__data__.has(e);
    }
    function IT(e, t) {
        var r = this.__data__;
        if (r instanceof nt) {
            var n = r.__data__;
            if (!mn || n.length < SC - 1) return n.push([e, t]), (this.size = ++r.size), this;
            r = this.__data__ = new kt(n);
        }
        return r.set(e, t), (this.size = r.size), this;
    }
    wt.prototype.clear = bT;
    wt.prototype.delete = OT;
    wt.prototype.get = xT;
    wt.prototype.has = NT;
    wt.prototype.set = IT;
    function RT(e, t) {
        var r = Li(e),
            n = !r && VT(e),
            i = !r && !n && sa(e),
            s = !r && !n && !i && Vp(e),
            o = r || n || i || s,
            a = o ? GC(e.length, String) : [],
            l = a.length;
        for (var d in e)
            (t || Xe.call(e, d)) &&
                !(
                    o &&
                    (d == "length" ||
                        (i && (d == "offset" || d == "parent")) ||
                        (s && (d == "buffer" || d == "byteLength" || d == "byteOffset")) ||
                        BT(d, l))
                ) &&
                a.push(d);
        return a;
    }
    function ki(e, t) {
        for (var r = e.length; r--; ) if (Hp(e[r][0], t)) return r;
        return -1;
    }
    function PT(e, t, r) {
        var n = t(e);
        return Li(e) ? n : jC(n, r(e));
    }
    function yn(e) {
        return e == null ? (e === void 0 ? xC : TC) : Ut && Ut in Object(e) ? kT(e) : GT(e);
    }
    function Sp(e) {
        return wn(e) && yn(e) == Ii;
    }
    function Mp(e, t, r, n, i) {
        return e === t ? !0 : e == null || t == null || (!wn(e) && !wn(t)) ? e !== e && t !== t : DT(e, t, r, n, Mp, i);
    }
    function DT(e, t, r, n, i, s) {
        var o = Li(e),
            a = Li(t),
            l = o ? Zo : gt(e),
            d = a ? Zo : gt(t);
        (l = l == Ii ? wr : l), (d = d == Ii ? wr : d);
        var c = l == wr,
            f = d == wr,
            m = l == d;
        if (m && sa(e)) {
            if (!sa(t)) return !1;
            (o = !0), (c = !1);
        }
        if (m && !c) return s || (s = new wt()), o || Vp(e) ? Bp(e, t, r, n, i, s) : UT(e, t, l, r, n, i, s);
        if (!(r & Ui)) {
            var p = c && Xe.call(e, "__wrapped__"),
                _ = f && Xe.call(t, "__wrapped__");
            if (p || _) {
                var v = p ? e.value() : e,
                    S = _ ? t.value() : t;
                return s || (s = new wt()), i(v, S, r, n, s);
            }
        }
        return m ? (s || (s = new wt()), $T(e, t, r, n, i, s)) : !1;
    }
    function FT(e) {
        if (!Gp(e) || jT(e)) return !1;
        var t = jp(e) ? eT : kC;
        return t.test(Mt(e));
    }
    function qT(e) {
        return wn(e) && Wp(e.length) && !!K[yn(e)];
    }
    function LT(e) {
        if (!WT(e)) return nT(e);
        var t = [];
        for (var r in Object(e)) Xe.call(e, r) && r != "constructor" && t.push(r);
        return t;
    }
    function Bp(e, t, r, n, i, s) {
        var o = r & Ui,
            a = e.length,
            l = t.length;
        if (a != l && !(o && l > a)) return !1;
        var d = s.get(e);
        if (d && s.get(t)) return d == t;
        var c = -1,
            f = !0,
            m = r & Cp ? new qi() : void 0;
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
                    !WC(t, function (S, T) {
                        if (!YC(m, T) && (p === S || i(p, S, r, n, s))) return m.push(T);
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
    function UT(e, t, r, n, i, s, o) {
        switch (r) {
            case Di:
                if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
                (e = e.buffer), (t = t.buffer);
            case Dp:
                return !(e.byteLength != t.byteLength || !s(new Ep(e), new Ep(t)));
            case bp:
            case Op:
            case Ip:
                return Hp(+e, +t);
            case xp:
                return e.name == t.name && e.message == t.message;
            case Rp:
            case Pp:
                return e == t + "";
            case Ri:
                var a = XC;
            case Pi:
                var l = n & Ui;
                if ((a || (a = JC), e.size != t.size && !l)) return !1;
                var d = o.get(e);
                if (d) return d == t;
                (n |= Cp), o.set(e, t);
                var c = Bp(a(e), a(t), n, i, s, o);
                return o.delete(e), c;
            case OC:
                if (Qo) return Qo.call(e) == Qo.call(t);
        }
        return !1;
    }
    function $T(e, t, r, n, i, s) {
        var o = r & Ui,
            a = Ap(e),
            l = a.length,
            d = Ap(t),
            c = d.length;
        if (l != c && !o) return !1;
        for (var f = l; f--; ) {
            var m = a[f];
            if (!(o ? m in t : Xe.call(t, m))) return !1;
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
    function Ap(e) {
        return PT(e, XT, MT);
    }
    function Mi(e, t) {
        var r = e.__data__;
        return HT(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    function Er(e, t) {
        var r = zC(e, t);
        return FT(r) ? r : void 0;
    }
    function kT(e) {
        var t = Xe.call(e, Ut),
            r = e[Ut];
        try {
            e[Ut] = void 0;
            var n = !0;
        } catch {}
        var i = $p.call(e);
        return n && (t ? (e[Ut] = r) : delete e[Ut]), i;
    }
    var MT = _p
            ? function (e) {
                  return e == null
                      ? []
                      : ((e = Object(e)),
                        HC(_p(e), function (t) {
                            return kp.call(e, t);
                        }));
              }
            : KT,
        gt = yn;
    ((ta && gt(new ta(new ArrayBuffer(1))) != Di) ||
        (mn && gt(new mn()) != Ri) ||
        (ra && gt(ra.resolve()) != dp) ||
        (na && gt(new na()) != Pi) ||
        (ia && gt(new ia()) != ea)) &&
        (gt = function (e) {
            var t = yn(e),
                r = t == wr ? e.constructor : void 0,
                n = r ? Mt(r) : "";
            if (n)
                switch (n) {
                    case iT:
                        return Di;
                    case sT:
                        return Ri;
                    case oT:
                        return dp;
                    case aT:
                        return Pi;
                    case lT:
                        return ea;
                }
            return t;
        });
    function BT(e, t) {
        return (t = t ?? Tp), !!t && (typeof e == "number" || MC.test(e)) && e > -1 && e % 1 == 0 && e < t;
    }
    function HT(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
    }
    function jT(e) {
        return !!wp && wp in e;
    }
    function WT(e) {
        var t = e && e.constructor,
            r = (typeof t == "function" && t.prototype) || $i;
        return e === r;
    }
    function GT(e) {
        return $p.call(e);
    }
    function Mt(e) {
        if (e != null) {
            try {
                return Up.call(e);
            } catch {}
            try {
                return e + "";
            } catch {}
        }
        return "";
    }
    function Hp(e, t) {
        return e === t || (e !== e && t !== t);
    }
    var VT = Sp(
            (function () {
                return arguments;
            })()
        )
            ? Sp
            : function (e) {
                  return wn(e) && Xe.call(e, "callee") && !kp.call(e, "callee");
              },
        Li = Array.isArray;
    function YT(e) {
        return e != null && Wp(e.length) && !jp(e);
    }
    var sa = rT || JT;
    function zT(e, t) {
        return Mp(e, t);
    }
    function jp(e) {
        if (!Gp(e)) return !1;
        var t = yn(e);
        return t == Np || t == CC || t == AC || t == bC;
    }
    function Wp(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Tp;
    }
    function Gp(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
    }
    function wn(e) {
        return e != null && typeof e == "object";
    }
    var Vp = gp ? VC(gp) : qT;
    function XT(e) {
        return YT(e) ? RT(e) : LT(e);
    }
    function KT() {
        return [];
    }
    function JT() {
        return !1;
    }
    yr.exports = zT;
});
var Xp = g(_n => {
    "use strict";
    Object.defineProperty(_n, "__esModule", { value: !0 });
    _n.DownloadedUpdateHelper = void 0;
    _n.createTempUpdateFile = tb;
    var QT = require("crypto"),
        ZT = require("fs"),
        zp = Yp(),
        Bt = et(),
        En = require("path"),
        aa = class {
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
                return En.join(this.cacheDir, "pending");
            }
            async validateDownloadedPath(t, r, n, i) {
                if (this.versionInfo != null && this.file === t && this.fileInfo != null)
                    return zp(this.versionInfo, r) && zp(this.fileInfo.info, n.info) && (await (0, Bt.pathExists)(t)) ? t : null;
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
                    o && (await (0, Bt.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo));
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
                    await (0, Bt.emptyDir)(this.cacheDirForPendingUpdate);
                } catch {}
            }
            async getValidCachedUpdateFile(t, r) {
                let n = this.getUpdateInfoFile();
                if (!(await (0, Bt.pathExists)(n))) return null;
                let s;
                try {
                    s = await (0, Bt.readJson)(n);
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
                let a = En.join(this.cacheDirForPendingUpdate, s.fileName);
                if (!(await (0, Bt.pathExists)(a))) return r.info("Cached update file doesn't exist"), null;
                let l = await eb(a);
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
                return En.join(this.cacheDirForPendingUpdate, "update-info.json");
            }
        };
    _n.DownloadedUpdateHelper = aa;
    function eb(e, t = "sha512", r = "base64", n) {
        return new Promise((i, s) => {
            let o = (0, QT.createHash)(t);
            o.on("error", s).setEncoding(r),
                (0, ZT.createReadStream)(e, { ...n, highWaterMark: 1024 * 1024 })
                    .on("error", s)
                    .on("end", () => {
                        o.end(), i(o.read());
                    })
                    .pipe(o, { end: !1 });
        });
    }
    async function tb(e, t, r) {
        let n = 0,
            i = En.join(t, e);
        for (let s = 0; s < 3; s++)
            try {
                return await (0, Bt.unlink)(i), i;
            } catch (o) {
                if (o.code === "ENOENT") return i;
                r.warn("Error on remove temp update file: ".concat(o)), (i = En.join(t, "".concat(n++, "-").concat(e)));
            }
        return i;
    }
});
var Kp = g(ua => {
    "use strict";
    Object.defineProperty(ua, "__esModule", { value: !0 });
    ua.getAppCacheDir = nb;
    var la = require("path"),
        rb = require("os");
    function nb() {
        let e = (0, rb.homedir)(),
            t;
        return (
            process.platform === "win32"
                ? (t = process.env.LOCALAPPDATA || la.join(e, "AppData", "Local"))
                : process.platform === "darwin"
                ? (t = la.join(e, "Library", "Caches"))
                : (t = process.env.XDG_CACHE_HOME || la.join(e, ".cache")),
            t
        );
    }
});
var Qp = g(Bi => {
    "use strict";
    Object.defineProperty(Bi, "__esModule", { value: !0 });
    Bi.ElectronAppAdapter = void 0;
    var Jp = require("path"),
        ib = Kp(),
        ca = class {
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
                    ? Jp.join(process.resourcesPath, "app-update.yml")
                    : Jp.join(this.app.getAppPath(), "dev-app-update.yml");
            }
            get userDataPath() {
                return this.app.getPath("userData");
            }
            get baseCachePath() {
                return (0, ib.getAppCacheDir)();
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
    Bi.ElectronAppAdapter = ca;
});
var em = g(yt => {
    "use strict";
    Object.defineProperty(yt, "__esModule", { value: !0 });
    yt.ElectronHttpExecutor = yt.NET_SESSION_NAME = void 0;
    yt.getNetSession = Zp;
    var Hi = ue();
    yt.NET_SESSION_NAME = "electron-updater";
    function Zp() {
        return require("electron").session.fromPartition(yt.NET_SESSION_NAME, { cache: !1 });
    }
    var fa = class extends Hi.HttpExecutor {
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
                this.cachedSession == null && (this.cachedSession = Zp());
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
    yt.ElectronHttpExecutor = fa;
});
var om = g((tR, sm) => {
    var sb = 1 / 0,
        ob = "[object Symbol]",
        im = /[\\^$.*+?()[\]{}|]/g,
        ab = RegExp(im.source),
        lb = typeof global == "object" && global && global.Object === Object && global,
        ub = typeof self == "object" && self && self.Object === Object && self,
        cb = lb || ub || Function("return this")(),
        fb = Object.prototype,
        hb = fb.toString,
        tm = cb.Symbol,
        rm = tm ? tm.prototype : void 0,
        nm = rm ? rm.toString : void 0;
    function db(e) {
        if (typeof e == "string") return e;
        if (mb(e)) return nm ? nm.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -sb ? "-0" : t;
    }
    function pb(e) {
        return !!e && typeof e == "object";
    }
    function mb(e) {
        return typeof e == "symbol" || (pb(e) && hb.call(e) == ob);
    }
    function gb(e) {
        return e == null ? "" : db(e);
    }
    function wb(e) {
        return (e = gb(e)), e && ab.test(e) ? e.replace(im, "\\$&") : e;
    }
    sm.exports = wb;
});
var Et = g(_r => {
    "use strict";
    Object.defineProperty(_r, "__esModule", { value: !0 });
    _r.newBaseUrl = Eb;
    _r.newUrlFromBase = ha;
    _r.getChannelFilename = _b;
    _r.blockmapFiles = vb;
    var am = require("url"),
        yb = om();
    function Eb(e) {
        let t = new am.URL(e);
        return t.pathname.endsWith("/") || (t.pathname += "/"), t;
    }
    function ha(e, t, r = !1) {
        let n = new am.URL(e, t),
            i = t.search;
        return i != null && i.length !== 0 ? (n.search = i) : r && (n.search = "noCache=".concat(Date.now().toString(32))), n;
    }
    function _b(e) {
        return "".concat(e, ".yml");
    }
    function vb(e, t, r) {
        let n = ha("".concat(e.pathname, ".blockmap"), e);
        return [ha("".concat(e.pathname.replace(new RegExp(yb(r), "g"), t), ".blockmap"), e), n];
    }
});
var Me = g(vt => {
    "use strict";
    Object.defineProperty(vt, "__esModule", { value: !0 });
    vt.Provider = void 0;
    vt.findFile = Ab;
    vt.parseUpdateInfo = Cb;
    vt.getFileList = um;
    vt.resolveFiles = Tb;
    var _t = ue(),
        Sb = wi(),
        lm = Et(),
        da = class {
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
                    (0, _t.configureRequestUrl)(t, n),
                    n
                );
            }
        };
    vt.Provider = da;
    function Ab(e, t, r) {
        if (e.length === 0) throw (0, _t.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
        let n = e.find(i => i.url.pathname.toLowerCase().endsWith(".".concat(t)));
        return n ?? (r == null ? e[0] : e.find(i => !r.some(s => i.url.pathname.toLowerCase().endsWith(".".concat(s)))));
    }
    function Cb(e, t, r) {
        if (e == null)
            throw (0, _t.newError)(
                "Cannot parse update info from ".concat(t, " in the latest release artifacts (").concat(r, "): rawData: null"),
                "ERR_UPDATER_INVALID_UPDATE_INFO"
            );
        let n;
        try {
            n = (0, Sb.load)(e);
        } catch (i) {
            throw (0, _t.newError)(
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
    function um(e) {
        let t = e.files;
        if (t != null && t.length > 0) return t;
        if (e.path != null) return [{ url: e.path, sha2: e.sha2, sha512: e.sha512 }];
        throw (0, _t.newError)("No files provided: ".concat((0, _t.safeStringifyJson)(e)), "ERR_UPDATER_NO_FILES_PROVIDED");
    }
    function Tb(e, t, r = n => n) {
        let i = um(e).map(a => {
                if (a.sha2 == null && a.sha512 == null)
                    throw (0, _t.newError)(
                        "Update info doesn't contain nor sha256 neither sha512 checksum: ".concat((0, _t.safeStringifyJson)(a)),
                        "ERR_UPDATER_NO_CHECKSUM"
                    );
                return { url: (0, lm.newUrlFromBase)(r(a.url), t), info: a };
            }),
            s = e.packages,
            o = s == null ? null : s[process.arch] || s.ia32;
        return o != null && (i[0].packageInfo = { ...o, path: (0, lm.newUrlFromBase)(r(o.path), t).href }), i;
    }
});
var wa = g(ji => {
    "use strict";
    Object.defineProperty(ji, "__esModule", { value: !0 });
    ji.GenericProvider = void 0;
    var cm = ue(),
        pa = Et(),
        ma = Me(),
        ga = class extends ma.Provider {
            constructor(t, r, n) {
                super(n),
                    (this.configuration = t),
                    (this.updater = r),
                    (this.baseUrl = (0, pa.newBaseUrl)(this.configuration.url));
            }
            get channel() {
                let t = this.updater.channel || this.configuration.channel;
                return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
            }
            async getLatestVersion() {
                let t = (0, pa.getChannelFilename)(this.channel),
                    r = (0, pa.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
                for (let n = 0; ; n++)
                    try {
                        return (0, ma.parseUpdateInfo)(await this.httpRequest(r), t, r);
                    } catch (i) {
                        if (i instanceof cm.HttpError && i.statusCode === 404)
                            throw (0, cm.newError)(
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
                return (0, ma.resolveFiles)(t, this.baseUrl);
            }
        };
    ji.GenericProvider = ga;
});
var hm = g(Wi => {
    "use strict";
    Object.defineProperty(Wi, "__esModule", { value: !0 });
    Wi.BitbucketProvider = void 0;
    var fm = ue(),
        ya = Et(),
        Ea = Me(),
        _a = class extends Ea.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }), (this.configuration = t), (this.updater = r);
                let { owner: i, slug: s } = t;
                this.baseUrl = (0, ya.newBaseUrl)(
                    "https://api.bitbucket.org/2.0/repositories/".concat(i, "/").concat(s, "/downloads")
                );
            }
            get channel() {
                return this.updater.channel || this.configuration.channel || "latest";
            }
            async getLatestVersion() {
                let t = new fm.CancellationToken(),
                    r = (0, ya.getChannelFilename)(this.getCustomChannelName(this.channel)),
                    n = (0, ya.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
                try {
                    let i = await this.httpRequest(n, void 0, t);
                    return (0, Ea.parseUpdateInfo)(i, r, n);
                } catch (i) {
                    throw (0, fm.newError)(
                        "Unable to find latest version on "
                            .concat(this.toString(), ", please ensure release exists: ")
                            .concat(i.stack || i.message),
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            resolveFiles(t) {
                return (0, Ea.resolveFiles)(t, this.baseUrl);
            }
            toString() {
                let { owner: t, slug: r } = this.configuration;
                return "Bitbucket (owner: ".concat(t, ", slug: ").concat(r, ", channel: ").concat(this.channel, ")");
            }
        };
    Wi.BitbucketProvider = _a;
});
var Ca = g(Ht => {
    "use strict";
    Object.defineProperty(Ht, "__esModule", { value: !0 });
    Ht.GitHubProvider = Ht.BaseGitHubProvider = void 0;
    Ht.computeReleaseNotes = pm;
    var it = ue(),
        vr = Xo(),
        bb = require("url"),
        Sr = Et(),
        Sa = Me(),
        va = /\/tag\/([^/]+)$/,
        Gi = class extends Sa.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }),
                    (this.options = t),
                    (this.baseUrl = (0, Sr.newBaseUrl)((0, it.githubUrl)(t, r)));
                let i = r === "github.com" ? "api.github.com" : r;
                this.baseApiUrl = (0, Sr.newBaseUrl)((0, it.githubUrl)(t, i));
            }
            computeGithubBasePath(t) {
                let r = this.options.host;
                return r && !["github.com", "api.github.com"].includes(r) ? "/api/v3".concat(t) : t;
            }
        };
    Ht.BaseGitHubProvider = Gi;
    var Aa = class extends Gi {
        constructor(t, r, n) {
            super(t, "github.com", n), (this.options = t), (this.updater = r);
        }
        get channel() {
            let t = this.updater.channel || this.options.channel;
            return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
        }
        async getLatestVersion() {
            var t, r, n, i, s;
            let o = new it.CancellationToken(),
                a = await this.httpRequest(
                    (0, Sr.newUrlFromBase)("".concat(this.basePath, ".atom"), this.baseUrl),
                    { accept: "application/xml, application/atom+xml, text/xml, */*" },
                    o
                ),
                l = (0, it.parseXml)(a),
                d = l.element("entry", !1, "No published versions on GitHub"),
                c = null;
            try {
                if (this.updater.allowPrerelease) {
                    let S =
                        ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) ||
                        ((r = vr.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) ||
                        null;
                    if (S === null) c = va.exec(d.element("link").attribute("href"))[1];
                    else
                        for (let T of l.getElements("entry")) {
                            let C = va.exec(T.element("link").attribute("href"));
                            if (C === null) continue;
                            let I = C[1],
                                L = ((n = vr.prerelease(I)) === null || n === void 0 ? void 0 : n[0]) || null,
                                Le = !S || ["alpha", "beta"].includes(S),
                                z = L !== null && !["alpha", "beta"].includes(String(L));
                            if (Le && !z && !(S === "beta" && L === "alpha")) {
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
                        if (va.exec(S.element("link").attribute("href"))[1] === c) {
                            d = S;
                            break;
                        }
                }
            } catch (S) {
                throw (0, it.newError)(
                    "Cannot parse releases feed: ".concat(S.stack || S.message, ",\nXML:\n").concat(a),
                    "ERR_UPDATER_INVALID_RELEASE_FEED"
                );
            }
            if (c == null) throw (0, it.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
            let f,
                m = "",
                p = "",
                _ = async S => {
                    (m = (0, Sr.getChannelFilename)(S)),
                        (p = (0, Sr.newUrlFromBase)(this.getBaseDownloadPath(String(c), m), this.baseUrl));
                    let T = this.createRequestOptions(p);
                    try {
                        return await this.executor.request(T, o);
                    } catch (C) {
                        throw C instanceof it.HttpError && C.statusCode === 404
                            ? (0, it.newError)(
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
                    !((i = vr.prerelease(c)) === null || i === void 0) &&
                    i[0] &&
                    (S = this.getCustomChannelName(String((s = vr.prerelease(c)) === null || s === void 0 ? void 0 : s[0]))),
                    (f = await _(S));
            } catch (S) {
                if (this.updater.allowPrerelease) f = await _(this.getDefaultChannelName());
                else throw S;
            }
            let v = (0, Sa.parseUpdateInfo)(f, m, p);
            return (
                v.releaseName == null && (v.releaseName = d.elementValueOrEmpty("title")),
                v.releaseNotes == null && (v.releaseNotes = pm(this.updater.currentVersion, this.updater.fullChangelog, l, d)),
                { tag: c, ...v }
            );
        }
        async getLatestTagName(t) {
            let r = this.options,
                n =
                    r.host == null || r.host === "github.com"
                        ? (0, Sr.newUrlFromBase)("".concat(this.basePath, "/latest"), this.baseUrl)
                        : new bb.URL(
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
                throw (0, it.newError)(
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
            return (0, Sa.resolveFiles)(t, this.baseUrl, r => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
        }
        getBaseDownloadPath(t, r) {
            return "".concat(this.basePath, "/download/").concat(t, "/").concat(r);
        }
    };
    Ht.GitHubProvider = Aa;
    function dm(e) {
        let t = e.elementValueOrEmpty("content");
        return t === "No content." ? "" : t;
    }
    function pm(e, t, r, n) {
        if (!t) return dm(n);
        let i = [];
        for (let s of r.getElements("entry")) {
            let o = /\/tag\/v?([^/]+)$/.exec(s.element("link").attribute("href"))[1];
            vr.lt(e, o) && i.push({ version: o, note: dm(s) });
        }
        return i.sort((s, o) => vr.rcompare(s.version, o.version));
    }
});
var gm = g(Vi => {
    "use strict";
    Object.defineProperty(Vi, "__esModule", { value: !0 });
    Vi.KeygenProvider = void 0;
    var mm = ue(),
        Ta = Et(),
        ba = Me(),
        Oa = class extends ba.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }),
                    (this.configuration = t),
                    (this.updater = r),
                    (this.baseUrl = (0, Ta.newBaseUrl)(
                        "https://api.keygen.sh/v1/accounts/"
                            .concat(this.configuration.account, "/artifacts?product=")
                            .concat(this.configuration.product)
                    ));
            }
            get channel() {
                return this.updater.channel || this.configuration.channel || "stable";
            }
            async getLatestVersion() {
                let t = new mm.CancellationToken(),
                    r = (0, Ta.getChannelFilename)(this.getCustomChannelName(this.channel)),
                    n = (0, Ta.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
                try {
                    let i = await this.httpRequest(n, { "Accept": "application/vnd.api+json", "Keygen-Version": "1.1" }, t);
                    return (0, ba.parseUpdateInfo)(i, r, n);
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
                return (0, ba.resolveFiles)(t, this.baseUrl);
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
    Vi.KeygenProvider = Oa;
});
var Em = g(Yi => {
    "use strict";
    Object.defineProperty(Yi, "__esModule", { value: !0 });
    Yi.PrivateGitHubProvider = void 0;
    var Ar = ue(),
        Ob = wi(),
        xb = require("path"),
        wm = require("url"),
        ym = Et(),
        Nb = Ca(),
        Ib = Me(),
        xa = class extends Nb.BaseGitHubProvider {
            constructor(t, r, n, i) {
                super(t, "api.github.com", i), (this.updater = r), (this.token = n);
            }
            createRequestOptions(t, r) {
                let n = super.createRequestOptions(t, r);
                return (n.redirect = "manual"), n;
            }
            async getLatestVersion() {
                let t = new Ar.CancellationToken(),
                    r = (0, ym.getChannelFilename)(this.getDefaultChannelName()),
                    n = await this.getLatestVersionInfo(t),
                    i = n.assets.find(a => a.name === r);
                if (i == null)
                    throw (0, Ar.newError)(
                        "Cannot find ".concat(r, " in the release ").concat(n.html_url || n.name),
                        "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                    );
                let s = new wm.URL(i.url),
                    o;
                try {
                    o = (0, Ob.load)(await this.httpRequest(s, this.configureHeaders("application/octet-stream"), t));
                } catch (a) {
                    throw a instanceof Ar.HttpError && a.statusCode === 404
                        ? (0, Ar.newError)(
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
                let i = (0, ym.newUrlFromBase)(n, this.baseUrl);
                try {
                    let s = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
                    return r ? s.find(o => o.prerelease) || s[0] : s;
                } catch (s) {
                    throw (0, Ar.newError)(
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
                return (0, Ib.getFileList)(t).map(r => {
                    let n = xb.posix.basename(r.url).replace(/ /g, "-"),
                        i = t.assets.find(s => s != null && s.name === n);
                    if (i == null)
                        throw (0, Ar.newError)(
                            'Cannot find asset "'.concat(n, '" in: ').concat(JSON.stringify(t.assets, null, 2)),
                            "ERR_UPDATER_ASSET_NOT_FOUND"
                        );
                    return { url: new wm.URL(i.url), info: r };
                });
            }
        };
    Yi.PrivateGitHubProvider = xa;
});
var Sm = g(Xi => {
    "use strict";
    Object.defineProperty(Xi, "__esModule", { value: !0 });
    Xi.isUrlProbablySupportMultiRangeRequests = vm;
    Xi.createClient = qb;
    var zi = ue(),
        Rb = hm(),
        _m = wa(),
        Pb = Ca(),
        Db = gm(),
        Fb = Em();
    function vm(e) {
        return !e.includes("s3.amazonaws.com");
    }
    function qb(e, t, r) {
        if (typeof e == "string")
            throw (0, zi.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        let n = e.provider;
        switch (n) {
            case "github": {
                let i = e,
                    s = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
                return s == null ? new Pb.GitHubProvider(i, t, r) : new Fb.PrivateGitHubProvider(i, t, s, r);
            }
            case "bitbucket":
                return new Rb.BitbucketProvider(e, t, r);
            case "keygen":
                return new Db.KeygenProvider(e, t, r);
            case "s3":
            case "spaces":
                return new _m.GenericProvider(
                    { provider: "generic", url: (0, zi.getS3LikeProviderBaseUrl)(e), channel: e.channel || null },
                    t,
                    { ...r, isUseMultipleRangeRequest: !1 }
                );
            case "generic": {
                let i = e;
                return new _m.GenericProvider(i, t, {
                    ...r,
                    isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && vm(i.url)
                });
            }
            case "custom": {
                let i = e,
                    s = i.updateProvider;
                if (!s) throw (0, zi.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
                return new s(i, t, r);
            }
            default:
                throw (0, zi.newError)("Unsupported provider: ".concat(n), "ERR_UPDATER_UNSUPPORTED_PROVIDER");
        }
    }
});
var Ki = g(vn => {
    "use strict";
    Object.defineProperty(vn, "__esModule", { value: !0 });
    vn.OperationKind = void 0;
    vn.computeOperations = Lb;
    var jt;
    (function (e) {
        (e[(e.COPY = 0)] = "COPY"), (e[(e.DOWNLOAD = 1)] = "DOWNLOAD");
    })(jt || (vn.OperationKind = jt = {}));
    function Lb(e, t, r) {
        let n = Cm(e.files),
            i = Cm(t.files),
            s = null,
            o = t.files[0],
            a = [],
            l = o.name,
            d = n.get(l);
        if (d == null) throw new Error("no file ".concat(l, " in old blockmap"));
        let c = i.get(l),
            f = 0,
            { checksumToOffset: m, checksumToOldSize: p } = $b(n.get(l), d.offset, r),
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
                      s != null && s.kind === jt.DOWNLOAD && s.end === _
                          ? (s.end += S)
                          : ((s = { kind: jt.DOWNLOAD, start: _, end: _ + S }), Am(s, a, T, v)))
                    : s != null && s.kind === jt.COPY && s.end === C
                    ? (s.end += S)
                    : ((s = { kind: jt.COPY, start: C, end: C + S }), Am(s, a, T, v));
        }
        return f > 0 && r.info("File".concat(o.name === "file" ? "" : " " + o.name, " has ").concat(f, " changed blocks")), a;
    }
    var Ub = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
    function Am(e, t, r, n) {
        if (Ub && t.length !== 0) {
            let i = t[t.length - 1];
            if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
                let s = [i.start, i.end, e.start, e.end].reduce((o, a) => (o < a ? o : a));
                throw new Error(
                    "operation (block index: "
                        .concat(n, ", checksum: ")
                        .concat(r, ", kind: ")
                        .concat(jt[e.kind], ") overlaps previous operation (checksum: ")
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
    function $b(e, t, r) {
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
    function Cm(e) {
        let t = new Map();
        for (let r of e) t.set(r.name, r);
        return t;
    }
});
var Ia = g(Sn => {
    "use strict";
    Object.defineProperty(Sn, "__esModule", { value: !0 });
    Sn.DataSplitter = void 0;
    Sn.copyData = bm;
    var Ji = ue(),
        kb = require("fs"),
        Mb = require("stream"),
        Bb = Ki(),
        Tm = Buffer.from("\r\n\r\n"),
        St;
    (function (e) {
        (e[(e.INIT = 0)] = "INIT"), (e[(e.HEADER = 1)] = "HEADER"), (e[(e.BODY = 2)] = "BODY");
    })(St || (St = {}));
    function bm(e, t, r, n, i) {
        let s = (0, kb.createReadStream)("", { fd: r, autoClose: !1, start: e.start, end: e.end - 1 });
        s.on("error", n), s.once("end", i), s.pipe(t, { end: !1 });
    }
    var Na = class extends Mb.Writable {
        constructor(t, r, n, i, s, o) {
            super(),
                (this.out = t),
                (this.options = r),
                (this.partIndexToTaskIndex = n),
                (this.partIndexToLength = s),
                (this.finishHandler = o),
                (this.partIndex = -1),
                (this.headerListBuffer = null),
                (this.readState = St.INIT),
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
                throw (0, Ji.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
            if (this.ignoreByteCount > 0) {
                let n = Math.min(this.ignoreByteCount, t.length);
                (this.ignoreByteCount -= n), (r = n);
            } else if (this.remainingPartDataCount > 0) {
                let n = Math.min(this.remainingPartDataCount, t.length);
                (this.remainingPartDataCount -= n), await this.processPartData(t, 0, n), (r = n);
            }
            if (r !== t.length) {
                if (this.readState === St.HEADER) {
                    let n = this.searchHeaderListEnd(t, r);
                    if (n === -1) return;
                    (r = n), (this.readState = St.BODY), (this.headerListBuffer = null);
                }
                for (;;) {
                    if (this.readState === St.BODY) this.readState = St.INIT;
                    else {
                        this.partIndex++;
                        let o = this.partIndexToTaskIndex.get(this.partIndex);
                        if (o == null)
                            if (this.isFinished) o = this.options.end;
                            else throw (0, Ji.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
                        let a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
                        if (a < o) await this.copyExistingData(a, o);
                        else if (a > o)
                            throw (0, Ji.newError)(
                                "prevTaskIndex must be < taskIndex",
                                "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED"
                            );
                        if (this.isFinished) {
                            this.onPartEnd(), this.finishHandler();
                            return;
                        }
                        if (((r = this.searchHeaderListEnd(t, r)), r === -1)) {
                            this.readState = St.HEADER;
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
                    if (o.kind !== Bb.OperationKind.COPY) {
                        i(new Error("Task kind must be COPY"));
                        return;
                    }
                    bm(o, this.out, this.options.oldFileFd, i, () => {
                        t++, s();
                    });
                };
                s();
            });
        }
        searchHeaderListEnd(t, r) {
            let n = t.indexOf(Tm, r);
            if (n !== -1) return n + Tm.length;
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
                throw (0, Ji.newError)(
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
    Sn.DataSplitter = Na;
});
var Nm = g(Qi => {
    "use strict";
    Object.defineProperty(Qi, "__esModule", { value: !0 });
    Qi.executeTasksUsingMultipleRangeRequests = Hb;
    Qi.checkIsRangesSupported = Pa;
    var Ra = ue(),
        Om = Ia(),
        xm = Ki();
    function Hb(e, t, r, n, i) {
        let s = o => {
            if (o >= t.length) {
                e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
                return;
            }
            let a = o + 1e3;
            jb(e, { tasks: t, start: o, end: Math.min(t.length, a), oldFileFd: n }, r, () => s(a), i);
        };
        return s;
    }
    function jb(e, t, r, n, i) {
        let s = "bytes=",
            o = 0,
            a = new Map(),
            l = [];
        for (let f = t.start; f < t.end; f++) {
            let m = t.tasks[f];
            m.kind === xm.OperationKind.DOWNLOAD &&
                ((s += "".concat(m.start, "-").concat(m.end - 1, ", ")), a.set(o, f), o++, l.push(m.end - m.start));
        }
        if (o <= 1) {
            let f = m => {
                if (m >= t.end) {
                    n();
                    return;
                }
                let p = t.tasks[m++];
                if (p.kind === xm.OperationKind.COPY) (0, Om.copyData)(p, r, t.oldFileFd, i, () => f(m));
                else {
                    let _ = e.createRequestOptions();
                    _.headers.Range = "bytes=".concat(p.start, "-").concat(p.end - 1);
                    let v = e.httpExecutor.createRequest(_, S => {
                        Pa(S, i) && (S.pipe(r, { end: !1 }), S.once("end", () => f(m)));
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
            if (!Pa(f, i)) return;
            let m = (0, Ra.safeGetHeader)(f, "content-type"),
                p = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(m);
            if (p == null) {
                i(new Error('Content-Type "multipart/byteranges" is expected, but got "'.concat(m, '"')));
                return;
            }
            let _ = new Om.DataSplitter(r, t, a, p[1] || p[2], l, n);
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
    function Pa(e, t) {
        if (e.statusCode >= 400) return t((0, Ra.createHttpError)(e)), !1;
        if (e.statusCode !== 206) {
            let r = (0, Ra.safeGetHeader)(e, "accept-ranges");
            if (r == null || r === "none")
                return t(new Error("Server doesn't support Accept-Ranges (response code ".concat(e.statusCode, ")"))), !1;
        }
        return !0;
    }
});
var Im = g(Zi => {
    "use strict";
    Object.defineProperty(Zi, "__esModule", { value: !0 });
    Zi.ProgressDifferentialDownloadCallbackTransform = void 0;
    var Wb = require("stream"),
        Cr;
    (function (e) {
        (e[(e.COPY = 0)] = "COPY"), (e[(e.DOWNLOAD = 1)] = "DOWNLOAD");
    })(Cr || (Cr = {}));
    var Da = class extends Wb.Transform {
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
                (this.operationType = Cr.COPY),
                (this.nextUpdate = this.start + 1e3);
        }
        _transform(t, r, n) {
            if (this.cancellationToken.cancelled) {
                n(new Error("cancelled"), null);
                return;
            }
            if (this.operationType == Cr.COPY) {
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
            this.operationType = Cr.COPY;
        }
        beginRangeDownload() {
            (this.operationType = Cr.DOWNLOAD),
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
    Zi.ProgressDifferentialDownloadCallbackTransform = Da;
});
var La = g(ts => {
    "use strict";
    Object.defineProperty(ts, "__esModule", { value: !0 });
    ts.DifferentialDownloader = void 0;
    var An = ue(),
        Fa = et(),
        Gb = require("fs"),
        Vb = Ia(),
        Yb = require("url"),
        es = Ki(),
        Rm = Nm(),
        zb = Im(),
        qa = class {
            constructor(t, r, n) {
                (this.blockAwareFileInfo = t),
                    (this.httpExecutor = r),
                    (this.options = n),
                    (this.fileMetadataBuffer = null),
                    (this.logger = n.logger);
            }
            createRequestOptions() {
                let t = { headers: { ...this.options.requestHeaders, accept: "*/*" } };
                return (0, An.configureRequestUrl)(this.options.newUrl, t), (0, An.configureRequestOptions)(t), t;
            }
            doDownload(t, r) {
                if (t.version !== r.version)
                    throw new Error(
                        "version is different (".concat(t.version, " - ").concat(r.version, "), full download is required")
                    );
                let n = this.logger,
                    i = (0, es.computeOperations)(t, r, n);
                n.debug != null && n.debug(JSON.stringify(i, null, 2));
                let s = 0,
                    o = 0;
                for (let l of i) {
                    let d = l.end - l.start;
                    l.kind === es.OperationKind.DOWNLOAD ? (s += d) : (o += d);
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
                            .concat(Pm(a), ", To download: ")
                            .concat(Pm(s), " (")
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
                                (0, Fa.close)(i.descriptor).catch(s => {
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
                let n = await (0, Fa.open)(this.options.oldFile, "r");
                r.push({ descriptor: n, path: this.options.oldFile });
                let i = await (0, Fa.open)(this.options.newFile, "w");
                r.push({ descriptor: i, path: this.options.newFile });
                let s = (0, Gb.createWriteStream)(this.options.newFile, { fd: i });
                await new Promise((o, a) => {
                    let l = [],
                        d;
                    if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
                        let T = [],
                            C = 0;
                        for (let L of t)
                            L.kind === es.OperationKind.DOWNLOAD && (T.push(L.end - L.start), (C += L.end - L.start));
                        let I = { expectedByteCounts: T, grandTotal: C };
                        (d = new zb.ProgressDifferentialDownloadCallbackTransform(
                            I,
                            this.options.cancellationToken,
                            this.options.onProgress
                        )),
                            l.push(d);
                    }
                    let c = new An.DigestTransform(this.blockAwareFileInfo.sha512);
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
                        (p = (0, Rm.executeTasksUsingMultipleRangeRequests)(this, t, m, n, a)), p(0);
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
                            if (L.kind === es.OperationKind.COPY) {
                                d && d.beginFileCopy(), (0, Vb.copyData)(L, m, n, a, () => p(T));
                                return;
                            }
                            let Le = "bytes=".concat(L.start, "-").concat(L.end - 1);
                            (S.headers.range = Le),
                                (I = (C = this.logger) === null || C === void 0 ? void 0 : C.debug) === null ||
                                    I === void 0 ||
                                    I.call(C, "download range: ".concat(Le)),
                                d && d.beginRangeDownload();
                            let z = this.httpExecutor.createRequest(S, fe => {
                                fe.on("error", a),
                                    fe.on("aborted", () => {
                                        a(new Error("response has been aborted by the server"));
                                    }),
                                    fe.statusCode >= 400 && a((0, An.createHttpError)(fe)),
                                    fe.pipe(m, { end: !1 }),
                                    fe.once("end", () => {
                                        d && d.endRangeDownload(), ++_ === 100 ? ((_ = 0), setTimeout(() => p(T), 1e3)) : p(T);
                                    });
                            });
                            z.on("redirect", (fe, y, P) => {
                                this.logger.info("Redirect to ".concat(Xb(P))),
                                    (v = P),
                                    (0, An.configureRequestUrl)(new Yb.URL(v), S),
                                    z.followRedirect();
                            }),
                                this.httpExecutor.addErrorAndTimeoutHandlers(z, a),
                                z.end();
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
                        (0, Rm.checkIsRangesSupported)(o, i) &&
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
    ts.DifferentialDownloader = qa;
    function Pm(e, t = " KB") {
        return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
    }
    function Xb(e) {
        let t = e.indexOf("?");
        return t < 0 ? e : e.substring(0, t);
    }
});
var Dm = g(rs => {
    "use strict";
    Object.defineProperty(rs, "__esModule", { value: !0 });
    rs.GenericDifferentialDownloader = void 0;
    var Kb = La(),
        Ua = class extends Kb.DifferentialDownloader {
            download(t, r) {
                return this.doDownload(t, r);
            }
        };
    rs.GenericDifferentialDownloader = Ua;
});
var is = g(Or => {
    "use strict";
    Object.defineProperty(Or, "__esModule", { value: !0 });
    Or.NoOpLogger = Or.AppUpdater = void 0;
    var Te = ue(),
        Jb = require("crypto"),
        Qb = require("os"),
        Zb = require("events"),
        Tr = et(),
        eO = wi(),
        $a = Sh(),
        Wt = require("path"),
        Gt = Xo(),
        Fm = Xp(),
        tO = Qp(),
        qm = em(),
        rO = wa(),
        br = Vt(),
        ka = Sm(),
        nO = require("zlib"),
        iO = Et(),
        sO = Dm(),
        Ma = class e extends Zb.EventEmitter {
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
                return (0, qm.getNetSession)();
            }
            get logger() {
                return this._logger;
            }
            set logger(t) {
                this._logger = t ?? new ns();
            }
            set updateConfigPath(t) {
                (this.clientPromise = null),
                    (this._appUpdateConfigPath = t),
                    (this.configOnDisk = new $a.Lazy(() => this.loadUpdateConfig()));
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
                    (this.signals = new br.UpdaterSignal(this)),
                    (this._appUpdateConfigPath = null),
                    (this.clientPromise = null),
                    (this.stagingUserIdPromise = new $a.Lazy(() => this.getOrCreateStagingUserId())),
                    (this.configOnDisk = new $a.Lazy(() => this.loadUpdateConfig())),
                    (this.checkForUpdatesPromise = null),
                    (this.downloadPromise = null),
                    (this.updateInfoAndProvider = null),
                    (this._testOnlyOptions = null),
                    this.on("error", s => {
                        this._logger.error("Error: ".concat(s.stack || s.message));
                    }),
                    r == null
                        ? ((this.app = new tO.ElectronAppAdapter()),
                          (this.httpExecutor = new qm.ElectronHttpExecutor((s, o) => this.emit("login", s, o))))
                        : ((this.app = r), (this.httpExecutor = null));
                let n = this.app.version,
                    i = (0, Gt.parse)(n);
                if (i == null)
                    throw (0, Te.newError)(
                        'App version is not a valid semver version: "'.concat(n, '"'),
                        "ERR_UPDATER_INVALID_VERSION"
                    );
                (this.currentVersion = i),
                    (this.allowPrerelease = oO(i)),
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
                    ? (n = new rO.GenericProvider({ provider: "generic", url: t }, this, {
                          ...r,
                          isUseMultipleRangeRequest: (0, ka.isUrlProbablySupportMultiRangeRequests)(t)
                      }))
                    : (n = (0, ka.createClient)(t, this, r)),
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
                    o = Te.UUID.parse(i).readUInt32BE(12) / 4294967295;
                return (
                    this._logger.info("Staging percentage: ".concat(n, ", percentage: ").concat(o, ", user id: ").concat(i)),
                    o < n
                );
            }
            computeFinalHeaders(t) {
                return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
            }
            async isUpdateAvailable(t) {
                let r = (0, Gt.parse)(t.version);
                if (r == null)
                    throw (0, Te.newError)(
                        'This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "'.concat(
                            t.version,
                            '"'
                        ),
                        "ERR_UPDATER_INVALID_VERSION"
                    );
                let n = this.currentVersion;
                if ((0, Gt.eq)(r, n)) return !1;
                let i = t?.minimumSystemVersion,
                    s = (0, Qb.release)();
                if (i)
                    try {
                        if ((0, Gt.lt)(s, i))
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
                let a = (0, Gt.gt)(r, n),
                    l = (0, Gt.lt)(r, n);
                return a ? !0 : this.allowDowngrade && l;
            }
            async getUpdateInfoAndProvider() {
                await this.app.whenReady(),
                    this.clientPromise == null &&
                        (this.clientPromise = this.configOnDisk.value.then(n =>
                            (0, ka.createClient)(n, this, this.createProviderRuntimeOptions())
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
                this.emit(br.UPDATE_DOWNLOADED, t);
            }
            async loadUpdateConfig() {
                return (
                    this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath),
                    (0, eO.load)(await (0, Tr.readFile)(this._appUpdateConfigPath, "utf-8"))
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
                let t = Wt.join(this.app.userDataPath, ".updaterId");
                try {
                    let n = await (0, Tr.readFile)(t, "utf-8");
                    if (Te.UUID.check(n)) return n;
                    this._logger.warn("Staging user id file exists, but content was invalid: ".concat(n));
                } catch (n) {
                    n.code !== "ENOENT" && this._logger.warn("Couldn't read staging user ID, creating a blank one: ".concat(n));
                }
                let r = Te.UUID.v5((0, Jb.randomBytes)(4096), Te.UUID.OID);
                this._logger.info("Generated new staging user ID: ".concat(r));
                try {
                    await (0, Tr.outputFile)(t, r);
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
                    let i = Wt.join(this.app.baseCachePath, r || this.app.name);
                    n.debug != null && n.debug("updater cache dir: ".concat(i)),
                        (t = new Fm.DownloadedUpdateHelper(i)),
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
                this.listenerCount(br.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = C => this.emit(br.DOWNLOAD_PROGRESS, C));
                let i = t.downloadUpdateOptions.updateInfoAndProvider.info,
                    s = i.version,
                    o = r.packageInfo;
                function a() {
                    let C = decodeURIComponent(t.fileInfo.url.pathname);
                    return C.endsWith(".".concat(t.fileExtension)) ? Wt.basename(C) : t.fileInfo.info.url;
                }
                let l = await this.getOrCreateDownloadHelper(),
                    d = l.cacheDirForPendingUpdate;
                await (0, Tr.mkdir)(d, { recursive: !0 });
                let c = a(),
                    f = Wt.join(d, c),
                    m = o == null ? null : Wt.join(d, "package-".concat(s).concat(Wt.extname(o.path) || ".7z")),
                    p = async C => (
                        await l.setDownloadedFile(f, m, i, r, c, C),
                        await t.done({ ...i, downloadedFile: f }),
                        m == null ? [f] : [f, m]
                    ),
                    _ = this._logger,
                    v = await l.validateDownloadedPath(f, i, r, _);
                if (v != null) return (f = v), await p(!1);
                let S = async () => (await l.clear().catch(() => {}), await (0, Tr.unlink)(f).catch(() => {})),
                    T = await (0, Fm.createTempUpdateFile)("temp-".concat(c), d, _);
                try {
                    await t.task(T, n, m, S),
                        await (0, Te.retry)(
                            () => (0, Tr.rename)(T, f),
                            60,
                            500,
                            0,
                            0,
                            C => C instanceof Error && /^EBUSY:/.test(C.message)
                        );
                } catch (C) {
                    throw (
                        (await S(),
                        C instanceof Te.CancellationError && (_.info("cancelled"), this.emit("update-cancelled", i)),
                        C)
                    );
                }
                return _.info("New version ".concat(s, " has been downloaded to ").concat(f)), await p(!0);
            }
            async differentialDownloadInstaller(t, r, n, i, s) {
                try {
                    if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload) return !0;
                    let o = (0, iO.blockmapFiles)(t.url, this.app.version, r.updateInfoAndProvider.info.version);
                    this._logger.info('Download block maps (old: "'.concat(o[0], '", new: ').concat(o[1], ")"));
                    let a = async c => {
                            let f = await this.httpExecutor.downloadToBuffer(c, {
                                headers: r.requestHeaders,
                                cancellationToken: r.cancellationToken
                            });
                            if (f == null || f.length === 0) throw new Error('Blockmap "'.concat(c.href, '" is empty'));
                            try {
                                return JSON.parse((0, nO.gunzipSync)(f).toString());
                            } catch (m) {
                                throw new Error('Cannot parse blockmap "'.concat(c.href, '", error: ').concat(m));
                            }
                        },
                        l = {
                            newUrl: t.url,
                            oldFile: Wt.join(this.downloadedUpdateHelper.cacheDir, s),
                            logger: this._logger,
                            newFile: n,
                            isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
                            requestHeaders: r.requestHeaders,
                            cancellationToken: r.cancellationToken
                        };
                    this.listenerCount(br.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = c => this.emit(br.DOWNLOAD_PROGRESS, c));
                    let d = await Promise.all(o.map(c => a(c)));
                    return await new sO.GenericDifferentialDownloader(t.info, this.httpExecutor, l).download(d[0], d[1]), !1;
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
    Or.AppUpdater = Ma;
    function oO(e) {
        let t = (0, Gt.prerelease)(e);
        return t != null && t.length > 0;
    }
    var ns = class {
        info(t) {}
        warn(t) {}
        error(t) {}
    };
    Or.NoOpLogger = ns;
});
var xr = g(ss => {
    "use strict";
    Object.defineProperty(ss, "__esModule", { value: !0 });
    ss.BaseUpdater = void 0;
    var Lm = require("child_process"),
        aO = is(),
        Ba = class extends aO.AppUpdater {
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
                    (0, Lm.spawnSync)(t, r, { env: { ...process.env, ...n }, encoding: "utf-8", shell: !0 }).stdout.trim()
                );
            }
            async spawnLog(t, r = [], n = void 0, i = "ignore") {
                return (
                    this._logger.info("Executing: ".concat(t, " with args: ").concat(r)),
                    new Promise((s, o) => {
                        try {
                            let a = { stdio: i, env: n, detached: !0 },
                                l = (0, Lm.spawn)(t, r, a);
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
    ss.BaseUpdater = Ba;
});
var ja = g(os => {
    "use strict";
    Object.defineProperty(os, "__esModule", { value: !0 });
    os.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
    var Nr = et(),
        lO = La(),
        uO = require("zlib"),
        Ha = class extends lO.DifferentialDownloader {
            async download() {
                let t = this.blockAwareFileInfo,
                    r = t.size,
                    n = r - (t.blockMapSize + 4);
                this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
                let i = Um(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
                await this.doDownload(await cO(this.options.oldFile), i);
            }
        };
    os.FileWithEmbeddedBlockMapDifferentialDownloader = Ha;
    function Um(e) {
        return JSON.parse((0, uO.inflateRawSync)(e).toString());
    }
    async function cO(e) {
        let t = await (0, Nr.open)(e, "r");
        try {
            let r = (await (0, Nr.fstat)(t)).size,
                n = Buffer.allocUnsafe(4);
            await (0, Nr.read)(t, n, 0, n.length, r - n.length);
            let i = Buffer.allocUnsafe(n.readUInt32BE(0));
            return await (0, Nr.read)(t, i, 0, i.length, r - n.length - i.length), await (0, Nr.close)(t), Um(i);
        } catch (r) {
            throw (await (0, Nr.close)(t), r);
        }
    }
});
var Ga = g(as => {
    "use strict";
    Object.defineProperty(as, "__esModule", { value: !0 });
    as.AppImageUpdater = void 0;
    var $m = ue(),
        km = require("child_process"),
        fO = et(),
        hO = require("fs"),
        Cn = require("path"),
        dO = xr(),
        pO = ja(),
        Mm = Vt(),
        mO = Me(),
        Wa = class extends dO.BaseUpdater {
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
                    n = (0, mO.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
                return this.executeDownload({
                    fileExtension: "AppImage",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, s) => {
                        let o = process.env.APPIMAGE;
                        if (o == null) throw (0, $m.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
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
                            this.listenerCount(Mm.DOWNLOAD_PROGRESS) > 0 &&
                                (l.onProgress = d => this.emit(Mm.DOWNLOAD_PROGRESS, d)),
                                await new pO.FileWithEmbeddedBlockMapDifferentialDownloader(
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
                        a && (await this.httpExecutor.download(n.url, i, s)), await (0, fO.chmod)(i, 493);
                    }
                });
            }
            doInstall(t) {
                let r = process.env.APPIMAGE;
                if (r == null) throw (0, $m.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
                (0, hO.unlinkSync)(r);
                let n,
                    i = Cn.basename(r);
                Cn.basename(t.installerPath) === i || !/\d+\.\d+\.\d+/.test(i)
                    ? (n = r)
                    : (n = Cn.join(Cn.dirname(r), Cn.basename(t.installerPath))),
                    (0, km.execFileSync)("mv", ["-f", t.installerPath, n]),
                    n !== r && this.emit("appimage-filename-updated", n);
                let s = { ...process.env, APPIMAGE_SILENT_INSTALL: "true" };
                return (
                    t.isForceRunAfter
                        ? this.spawnLog(n, [], s)
                        : ((s.APPIMAGE_EXIT_AFTER_INSTALL = "true"), (0, km.execFileSync)(n, [], { env: s })),
                    !0
                );
            }
        };
    as.AppImageUpdater = Wa;
});
var Ya = g(ls => {
    "use strict";
    Object.defineProperty(ls, "__esModule", { value: !0 });
    ls.DebUpdater = void 0;
    var gO = xr(),
        Bm = Vt(),
        wO = Me(),
        Va = class extends gO.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, wO.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
                return this.executeDownload({
                    fileExtension: "deb",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, s) => {
                        this.listenerCount(Bm.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = o => this.emit(Bm.DOWNLOAD_PROGRESS, o)),
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
    ls.DebUpdater = Va;
});
var Xa = g(us => {
    "use strict";
    Object.defineProperty(us, "__esModule", { value: !0 });
    us.RpmUpdater = void 0;
    var yO = xr(),
        Hm = Vt(),
        EO = Me(),
        za = class extends yO.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, EO.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
                return this.executeDownload({
                    fileExtension: "rpm",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, s) => {
                        this.listenerCount(Hm.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = o => this.emit(Hm.DOWNLOAD_PROGRESS, o)),
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
    us.RpmUpdater = za;
});
var Ja = g(cs => {
    "use strict";
    Object.defineProperty(cs, "__esModule", { value: !0 });
    cs.MacUpdater = void 0;
    var jm = ue(),
        Wm = et(),
        Gm = require("fs"),
        Vm = require("path"),
        _O = require("http"),
        vO = is(),
        SO = Me(),
        Ym = require("child_process"),
        zm = require("crypto"),
        Ka = class extends vO.AppUpdater {
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
                        (s = (0, Ym.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes("".concat(i, ": 1"))),
                        n.info("Checked for macOS Rosetta environment (isRosetta=".concat(s, ")"));
                } catch (f) {
                    n.warn("sysctl shell command to check for macOS Rosetta environment failed: ".concat(f));
                }
                let o = !1;
                try {
                    this.debug("Checking for arm64 in uname");
                    let m = (0, Ym.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
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
                let l = (0, SO.findFile)(r, "zip", ["pkg", "dmg"]);
                if (l == null)
                    throw (0, jm.newError)(
                        "ZIP file not provided: ".concat((0, jm.safeStringifyJson)(r)),
                        "ERR_UPDATER_ZIP_FILE_NOT_FOUND"
                    );
                let d = t.updateInfoAndProvider.provider,
                    c = "update.zip";
                return this.executeDownload({
                    fileExtension: "zip",
                    fileInfo: l,
                    downloadUpdateOptions: t,
                    task: async (f, m) => {
                        let p = Vm.join(this.downloadedUpdateHelper.cacheDir, c),
                            _ = () =>
                                (0, Wm.pathExistsSync)(p)
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
                                let m = Vm.join(this.downloadedUpdateHelper.cacheDir, c);
                                (0, Gm.copyFileSync)(f.downloadedFile, m);
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
                    s = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, Wm.stat)(i)).size,
                    o = this._logger,
                    a = "fileToProxy=".concat(t.url.href);
                this.closeServerIfExists(),
                    this.debug("Creating proxy server for native Squirrel.Mac (".concat(a, ")")),
                    (this.server = (0, _O.createServer)()),
                    this.debug("Proxy server for native Squirrel.Mac is created (".concat(a, ")")),
                    this.server.on("close", () => {
                        o.info("Proxy server for native Squirrel.Mac is closed (".concat(a, ")"));
                    });
                let l = d => {
                    let c = d.address();
                    return typeof c == "string" ? c : "http://127.0.0.1:".concat(c?.port);
                };
                return await new Promise((d, c) => {
                    let f = (0, zm.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"),
                        m = Buffer.from("autoupdater:".concat(f), "ascii"),
                        p = "/".concat((0, zm.randomBytes)(64).toString("hex"), ".zip");
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
                                [Le, z] = L.split(":");
                            if (Le !== "autoupdater" || z !== f) {
                                (v.statusCode = 401),
                                    (v.statusMessage = "Invalid Authentication Credentials"),
                                    v.end(),
                                    o.warn("Invalid authenthication credentials");
                                return;
                            }
                            let fe = Buffer.from('{ "url": "'.concat(l(this.server)).concat(p, '" }'));
                            v.writeHead(200, { "Content-Type": "application/json", "Content-Length": fe.length }), v.end(fe);
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
                        let C = (0, Gm.createReadStream)(i);
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
    cs.MacUpdater = Ka;
});
var Qm = g(Za => {
    "use strict";
    Object.defineProperty(Za, "__esModule", { value: !0 });
    Za.verifySignature = CO;
    var Xm = ue(),
        Jm = require("child_process"),
        AO = require("os"),
        Km = require("path");
    function CO(e, t, r) {
        return new Promise((n, i) => {
            let s = t.replace(/'/g, "''");
            r.info("Verifying signature ".concat(s)),
                (0, Jm.execFile)(
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
                                Qa(r, o, l, i), n(null);
                                return;
                            }
                            let c = TO(a);
                            if (c.Status === 0) {
                                try {
                                    let _ = Km.normalize(c.Path),
                                        v = Km.normalize(t);
                                    if ((r.info("LiteralPath: ".concat(_, ". Update Path: ").concat(v)), _ !== v)) {
                                        Qa(r, new Error("LiteralPath of ".concat(_, " is different than ").concat(v)), l, i),
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
                                let m = (0, Xm.parseDn)(c.SignerCertificate.Subject),
                                    p = !1;
                                for (let _ of e) {
                                    let v = (0, Xm.parseDn)(_);
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
                            Qa(r, c, null, i), n(null);
                            return;
                        }
                    }
                );
        });
    }
    function TO(e) {
        let t = JSON.parse(e);
        delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
        let r = t.SignerCertificate;
        return (
            r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName),
            t
        );
    }
    function Qa(e, t, r, n) {
        if (bO()) {
            e.warn(
                "Cannot execute Get-AuthenticodeSignature: ".concat(
                    t || r,
                    ". Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher."
                )
            );
            return;
        }
        try {
            (0, Jm.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], {
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
    function bO() {
        let e = AO.release();
        return e.startsWith("6.") && !e.startsWith("6.3");
    }
});
var tl = g(hs => {
    "use strict";
    Object.defineProperty(hs, "__esModule", { value: !0 });
    hs.NsisUpdater = void 0;
    var fs = ue(),
        Zm = require("path"),
        OO = xr(),
        xO = ja(),
        eg = Vt(),
        NO = Me(),
        IO = et(),
        RO = Qm(),
        tg = require("url"),
        el = class extends OO.BaseUpdater {
            constructor(t, r) {
                super(t, r), (this._verifyUpdateCodeSignature = (n, i) => (0, RO.verifySignature)(n, i, this._logger));
            }
            get verifyUpdateCodeSignature() {
                return this._verifyUpdateCodeSignature;
            }
            set verifyUpdateCodeSignature(t) {
                t && (this._verifyUpdateCodeSignature = t);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, NO.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
                return this.executeDownload({
                    fileExtension: "exe",
                    downloadUpdateOptions: t,
                    fileInfo: n,
                    task: async (i, s, o, a) => {
                        let l = n.packageInfo,
                            d = l != null && o != null;
                        if (d && t.disableWebInstaller)
                            throw (0, fs.newError)(
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
                                (await this.differentialDownloadInstaller(n, t, i, r, fs.CURRENT_APP_INSTALLER_FILE_NAME))) &&
                                (await this.httpExecutor.download(n.url, i, s));
                        let c = await this.verifySignature(i);
                        if (c != null)
                            throw (
                                (await a(),
                                (0, fs.newError)(
                                    "New version "
                                        .concat(t.updateInfoAndProvider.info.version, " is not signed by the application owner: ")
                                        .concat(c),
                                    "ERR_UPDATER_INVALID_SIGNATURE"
                                ))
                            );
                        if (d && (await this.differentialDownloadWebPackage(t, l, o, r)))
                            try {
                                await this.httpExecutor.download(new tg.URL(l.path), o, {
                                    headers: t.requestHeaders,
                                    cancellationToken: t.cancellationToken,
                                    sha512: l.sha512
                                });
                            } catch (f) {
                                try {
                                    await (0, IO.unlink)(o);
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
                    this.spawnLog(Zm.join(process.resourcesPath, "elevate.exe"), [t.installerPath].concat(r)).catch(s =>
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
                        newUrl: new tg.URL(r.path),
                        oldFile: Zm.join(this.downloadedUpdateHelper.cacheDir, fs.CURRENT_APP_PACKAGE_FILE_NAME),
                        logger: this._logger,
                        newFile: n,
                        requestHeaders: this.requestHeaders,
                        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
                        cancellationToken: t.cancellationToken
                    };
                    this.listenerCount(eg.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = o => this.emit(eg.DOWNLOAD_PROGRESS, o)),
                        await new xO.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, s).download();
                } catch (s) {
                    return (
                        this._logger.error("Cannot download differentially, fallback to full download: ".concat(s.stack || s)),
                        process.platform === "win32"
                    );
                }
                return !1;
            }
        };
    hs.NsisUpdater = el;
});
var Vt = g(B => {
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
    var PO = ue();
    Object.defineProperty(B, "CancellationToken", {
        enumerable: !0,
        get: function () {
            return PO.CancellationToken;
        }
    });
    var rg = et(),
        DO = require("path"),
        FO = xr();
    Object.defineProperty(B, "BaseUpdater", {
        enumerable: !0,
        get: function () {
            return FO.BaseUpdater;
        }
    });
    var ng = is();
    Object.defineProperty(B, "AppUpdater", {
        enumerable: !0,
        get: function () {
            return ng.AppUpdater;
        }
    });
    Object.defineProperty(B, "NoOpLogger", {
        enumerable: !0,
        get: function () {
            return ng.NoOpLogger;
        }
    });
    var qO = Me();
    Object.defineProperty(B, "Provider", {
        enumerable: !0,
        get: function () {
            return qO.Provider;
        }
    });
    var LO = Ga();
    Object.defineProperty(B, "AppImageUpdater", {
        enumerable: !0,
        get: function () {
            return LO.AppImageUpdater;
        }
    });
    var UO = Ya();
    Object.defineProperty(B, "DebUpdater", {
        enumerable: !0,
        get: function () {
            return UO.DebUpdater;
        }
    });
    var $O = Xa();
    Object.defineProperty(B, "RpmUpdater", {
        enumerable: !0,
        get: function () {
            return $O.RpmUpdater;
        }
    });
    var kO = Ja();
    Object.defineProperty(B, "MacUpdater", {
        enumerable: !0,
        get: function () {
            return kO.MacUpdater;
        }
    });
    var MO = tl();
    Object.defineProperty(B, "NsisUpdater", {
        enumerable: !0,
        get: function () {
            return MO.NsisUpdater;
        }
    });
    var At;
    function BO() {
        if (process.platform === "win32") At = new (tl().NsisUpdater)();
        else if (process.platform === "darwin") At = new (Ja().MacUpdater)();
        else {
            At = new (Ga().AppImageUpdater)();
            try {
                let e = DO.join(process.resourcesPath, "package-type");
                if (!(0, rg.existsSync)(e)) return At;
                console.info("Checking for beta autoupdate feature for deb/rpm distributions");
                let t = (0, rg.readFileSync)(e).toString().trim();
                switch ((console.info("Found package-type:", t), t)) {
                    case "deb":
                        At = new (Ya().DebUpdater)();
                        break;
                    case "rpm":
                        At = new (Xa().RpmUpdater)();
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
        return At;
    }
    Object.defineProperty(B, "autoUpdater", { enumerable: !0, get: () => At || BO() });
    B.DOWNLOAD_PROGRESS = "download-progress";
    B.UPDATE_DOWNLOADED = "update-downloaded";
    var rl = class {
        constructor(t) {
            this.emitter = t;
        }
        login(t) {
            ds(this.emitter, "login", t);
        }
        progress(t) {
            ds(this.emitter, B.DOWNLOAD_PROGRESS, t);
        }
        updateDownloaded(t) {
            ds(this.emitter, B.UPDATE_DOWNLOADED, t);
        }
        updateCancelled(t) {
            ds(this.emitter, "update-cancelled", t);
        }
    };
    B.UpdaterSignal = rl;
    var HO = !1;
    function ds(e, t, r) {
        HO
            ? e.on(t, (...n) => {
                  console.log("%s %s", t, n), r(...n);
              })
            : e.on(t, r);
    }
});
var Yt = g((bR, ig) => {
    var Ge;
    ig.exports =
        ((Ge = class {
            static getSourceChannelName(t) {
                return "".concat(Ge.WINDOW_SOURCE, "/").concat(t);
            }
            static getTargetChannelName(t) {
                return "".concat(Ge.WINDOW_TARGET, "/").concat(t);
            }
        }),
        b(Ge, "WINDOW_MAIN", "@main"),
        b(Ge, "WINDOW_MAIN_LOGIN", "@main/login"),
        b(Ge, "WINDOW_SOURCE", "@source"),
        b(Ge, "WINDOW_TARGET", "@target"),
        Ge);
});
var ps = g((NR, sg) => {
    var Tn;
    sg.exports = ((Tn = class {}), b(Tn, "WINDOWS", "win32"), b(Tn, "MACOS", "darwin"), b(Tn, "LINUX", "linux"), Tn);
});
var Ct = g((PR, og) => {
    og.exports = class {
        constructor(t) {
            b(this, "_oglama");
            this._oglama = t;
        }
    };
});
var lg = g((qR, ag) => {
    var jO = Ct(),
        ms = require("fs"),
        gs = require("path"),
        WO = require("http"),
        nl;
    ag.exports =
        ((nl = class extends jO {
            start() {
                if (this.constructor._instance === null) {
                    let t = gs.join(this._oglama.rootPath, "ssg"),
                        r = this._oglama.config.getPort();
                    this.constructor._instance = new Promise((n, i) => {
                        if (this._oglama.devMode) {
                            n(null);
                            return;
                        }
                        try {
                            let s = WO.createServer((o, a) => {
                                let l = ".empty";
                                try {
                                    let c = new URL(o.url, "http://0.0.0.0");
                                    l = decodeURIComponent(c.pathname).replace(/^\/+|\/+$/g, "");
                                } catch {}
                                let d = gs.join(t, l);
                                ms.statSync(d, { throwIfNoEntry: !1 })?.isDirectory() && (d = gs.join(d, "index.html")),
                                    ms.access(d, ms.constants.F_OK, c => {
                                        if (c) {
                                            a.writeHead(404, { "Content-Type": "text/plain" }), a.end("Not Found: ".concat(c));
                                            return;
                                        }
                                        ms.readFile(d, (f, m) => {
                                            if (f) {
                                                a.writeHead(500, { "Content-Type": "text/plain" }),
                                                    a.end("Internal Server Error: ".concat(f));
                                                return;
                                            }
                                            let p = gs.extname(d),
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
        b(nl, "_instance", null),
        nl);
});
var cg = g(($R, ug) => {
    var GO = require("path"),
        VO = Ct();
    ug.exports = class extends VO {
        async start() {
            let t = GO.join(this._oglama.rootPath, "res", "index.html"),
                r = { extraHeaders: "pragma: no-cache" };
            this._oglama.mainWindow().loadFile(t, r),
                this._oglama.mainLoginWindow().loadFile(t, r),
                this._oglama.mainWindow().hide(),
                this._oglama.mainLoginWindow().show();
        }
    };
});
var hg = g((MR, fg) => {
    var YO = Ct();
    fg.exports = class extends YO {
        error() {
            console.error("%coglama-error", "color:red", ...arguments);
        }
        info() {
            console.info("%coglama-info", "color:lightblue", ...arguments);
        }
    };
});
var pg = g((HR, dg) => {
    var zO = Ct();
    dg.exports = class extends zO {
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
var gg = g((WR, mg) => {
    var XO = Ct(),
        KO = require("querystring");
    mg.exports = class extends XO {
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
                r = t.query ? n + "?" + KO.stringify(t.query) : n;
            } while (!1);
            return r;
        }
    };
});
var Eg = g((VR, yg) => {
    var JO = Ct(),
        wg = require("fs");
    yg.exports = class extends JO {
        isFile(t) {
            let r = !1;
            try {
                r = wg.statSync(t).isFile();
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
                let n = wg.readFileSync(t);
                r = Buffer.isBuffer(n) ? n.toString() : n;
            } catch (n) {
                this._oglama.log.error("file:readFile", t, n);
            }
            return r;
        }
    };
});
var vg = g((zR, _g) => {
    var il;
    _g.exports =
        ((il = class {}),
        b(il, "AppSrc", {
            K_SRC_WEBSITES: "srcWebsites",
            K_SRC_CONFIG: "srcConfig",
            K_SRC_INPUTS: "srcInputs",
            K_SRC_OUTPUTS: "srcOutputs",
            K_SRC_STATE_MACHINE: "srcStateMachine"
        }),
        il);
});
var zt = g((JR, Sg) => {
    var QO = Ct(),
        { ipcMain: ZO } = require("electron");
    Sg.exports = class extends QO {
        constructor(t) {
            super(t);
        }
        _register(t) {
            if (typeof t == "string")
                for (let r of Object.getOwnPropertyNames(this)) {
                    if (["_", "#"].includes(r[0] || typeof this[r] != "function")) continue;
                    let n = this[r];
                    ZO.handle("ipc:".concat(t, ":").concat(r), async (i, ...s) => {
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
var bg = g((ZR, Tg) => {
    var ex = Yt(),
        tx = vg(),
        rx = zt(),
        { app: nx } = require("electron"),
        bn = require("path"),
        De = require("fs"),
        Ag = 180,
        ix = 2,
        Ke,
        Xt,
        Tt,
        Kt,
        On,
        Ir,
        Cg;
    Tg.exports =
        ((Cg = class extends rx {
            constructor(r) {
                super(r);
                M(this, Ke, {});
                M(this, Xt, {});
                M(this, Tt, null);
                M(this, Kt, r => bn.join(E(this, Tt), "agents", r.replace(/\W+/g, ""), "source.json"));
                M(this, On, r => {
                    let n = null;
                    if (typeof r == "object" && r !== null) {
                        n = {};
                        for (let i of Object.values(tx.AppSrc)) n[i] = Array.isArray(r[i]) ? r[i] : [];
                    }
                    return n;
                });
                M(this, Ir, r => "".concat(r).replace(/\W+/g, ""));
                b(this, "purge", async r => {
                    let n = !1;
                    if (((r = E(this, Ir).call(this, r)), r.length)) {
                        let i = bn.dirname(E(this, Kt).call(this, r));
                        De.existsSync(i) && (De.rmSync(i, { recursive: !0, force: !0 }), (n = !0));
                    }
                    this._oglama.devMode && console.log("\u{1F5D1}\uFE0F  purge(".concat(r, "): ").concat(n));
                });
                b(this, "sourceGet", (r, n = !0) => {
                    let i = null;
                    r = E(this, Ir).call(this, r);
                    do {
                        if (!r.length) break;
                        let s = E(this, Kt).call(this, r);
                        if (!De.existsSync(s) || !De.statSync(s).isFile()) break;
                        try {
                            (i = De.readFileSync(s).toString()), n && (i = E(this, On).call(this, JSON.parse(i)));
                        } catch {}
                    } while (!1);
                    return (
                        this._oglama.devMode &&
                            console.log("\u{1F4BE} \u25B6 sourceGet(".concat(r, ") => {").concat(typeof i, "}")),
                        i
                    );
                });
                b(this, "sourceSet", (r, n) => {
                    r = E(this, Ir).call(this, r);
                    do {
                        if (!r.length) break;
                        typeof E(this, Ke)[r] > "u" && (E(this, Ke)[r] = this.sourceGet(r, !1));
                        let i = JSON.stringify(E(this, On).call(this, n));
                        if (E(this, Ke)[r] === i) break;
                        (E(this, Ke)[r] = i),
                            typeof E(this, Xt)[r] < "u" && clearTimeout(E(this, Xt)[r]),
                            (E(this, Xt)[r] = setTimeout(() => {
                                delete E(this, Xt)[r];
                                let s = E(this, Kt).call(this, r);
                                De.existsSync(s) || De.mkdirSync(bn.dirname(s), { recursive: !0 }),
                                    E(this, Ke)[r] !== "null" ? De.writeFileSync(s, E(this, Ke)[r]) : De.rmSync(s),
                                    this._oglama.devMode &&
                                        console.log(
                                            "\u{1F4BE} \u25C0 sourceSet("
                                                .concat(r, "): ")
                                                .concat(E(this, Ke)[r] !== "null" ? "updated file" : "deleted file")
                                        );
                            }, ix * 1e3));
                    } while (!1);
                });
                this._register("diskStorage"),
                    Z(this, Tt, bn.join(nx.getPath("appData"), "oglama")),
                    De.existsSync(E(this, Tt)) || De.mkdirSync(E(this, Tt), { recursive: !0 }),
                    setInterval(() => {
                        let n = Math.floor(new Date().getTime() / 1e3),
                            i = [];
                        De.readdirSync(bn.join(E(this, Tt), "agents"), { withFileTypes: !0 })
                            .filter(s => s.isDirectory())
                            .map(s => {
                                let o = E(this, Kt).call(this, s.name);
                                if (De.existsSync(o)) {
                                    let a = Math.floor(De.statSync(o).mtime.getTime() / 1e3);
                                    n - a <= Ag && i.push(s.name);
                                }
                            }),
                            i.length &&
                                this._oglama.main?.view.webContents.send(ex.WINDOW_MAIN, [
                                    "ipc:disk-storage:agents:commit",
                                    [i],
                                    { type: "req" }
                                ]);
                    }, Ag * 1e3);
            }
        }),
        (Ke = new WeakMap()),
        (Xt = new WeakMap()),
        (Tt = new WeakMap()),
        (Kt = new WeakMap()),
        (On = new WeakMap()),
        (Ir = new WeakMap()),
        Cg);
});
var Ng = g((rP, xg) => {
    var { execSync: sl } = require("child_process"),
        sx = zt(),
        ye = ps(),
        Rr,
        Pr,
        Dr,
        bt,
        Og;
    xg.exports =
        ((Og = class extends sx {
            constructor(r) {
                super(r);
                M(this, Rr, null);
                M(this, Pr, null);
                M(this, Dr, null);
                M(this, bt, null);
                b(this, "getOS", () => {
                    if (typeof E(this, bt) != "string")
                        switch (process.platform) {
                            case ye.MACOS:
                                Z(this, bt, "macos");
                                break;
                            case ye.WINDOWS:
                                Z(this, bt, "windows");
                                break;
                            case ye.LINUX:
                                Z(this, bt, "linux");
                                break;
                        }
                    return E(this, bt);
                });
                b(this, "getName", () => {
                    if (typeof E(this, Pr) != "string") {
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
                                let n = sl(r).toString();
                                Z(this, Pr, n.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (n) {
                                this._oglama.devMode && console.warn("Device Name", "".concat(n));
                            }
                    }
                    return E(this, Pr);
                });
                b(this, "getUUID", () => {
                    if (typeof E(this, Rr) != "string") {
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
                                let i = sl(r).toString();
                                switch (process.platform) {
                                    case ye.MACOS:
                                        i = i.replace(/^.*?\bIOPlatformUUID"\s*=\s*"(.*?)".*$/gs, "$1");
                                        break;
                                    case ye.WINDOWS:
                                        i = i.split("REG_SZ")[1];
                                        break;
                                }
                                Z(this, Rr, i.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (i) {
                                this._oglama.devMode && console.warn("Device UUID", "".concat(i));
                            }
                    }
                    return E(this, Rr);
                });
                b(this, "getSerialNumber", () => {
                    if (typeof E(this, Dr) != "string") {
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
                                let n = sl(r).toString();
                                switch (process.platform) {
                                    case ye.MACOS:
                                        n = n.replace(/^.*?\bIOPlatformSerialNumber"\s*=\s*"(.*?)".*$/gs, "$1");
                                        break;
                                    case ye.WINDOWS:
                                        n = n.split("SerialNumber")[1];
                                        break;
                                }
                                Z(this, Dr, n.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (n) {
                                this._oglama.devMode && console.warn("Device Serial Number", "".concat(n));
                            }
                    }
                    return E(this, Dr);
                });
                b(this, "setPostAuth", r => this._oglama.setPostAuth(!!r));
                b(this, "getPostAuth", () => this._oglama.getPostAuth());
                this._register("device");
            }
        }),
        (Rr = new WeakMap()),
        (Pr = new WeakMap()),
        (Dr = new WeakMap()),
        (bt = new WeakMap()),
        Og);
});
var qg = g((sP, Fg) => {
    var { ipcMain: Ig, session: ox, BrowserWindow: Rg } = require("electron"),
        Pg = require("path"),
        ax = Yt(),
        lx = zt(),
        Y,
        st,
        Dg;
    Fg.exports =
        ((Dg = class extends lx {
            constructor(r) {
                super(r);
                M(this, Y, {});
                M(this, st, {});
                b(this, "list", () => Object.keys(E(this, Y)));
                b(this, "closeAll", () => {
                    let r = Object.keys(E(this, Y)).length > 0;
                    for (let n of Object.keys(E(this, Y))) this.close(n);
                    return r;
                });
                b(this, "open", r => {
                    let n = !1;
                    do {
                        if (typeof r != "string" || !r.length) break;
                        if (typeof E(this, Y)[r] < "u") {
                            typeof E(this, Y)[r]?.webContents?.focus == "function" && E(this, Y)[r].webContents.focus();
                            break;
                        }
                        E(this, Y)[r] = new Rg({
                            show: !1,
                            minWidth: this._oglama.config.getSourceMinWidth(),
                            minHeight: this._oglama.config.getSourceMinHeight(),
                            width: this._oglama.config.getSourceMinWidth(),
                            height: this._oglama.config.getSourceMinHeight(),
                            icon: Pg.join(this._oglama.rootPath, "res/icons/icon.png"),
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
                                preload: Pg.join(this._oglama.rootPath, "lib/preloader/entry/source.js"),
                                nodeIntegration: !0,
                                devTools: this._oglama.devMode,
                                session: ox.defaultSession,
                                cache: !1,
                                webSecurity: !1,
                                allowRunningInsecureContent: !0,
                                additionalArguments: ["--agent-id=".concat(r)]
                            }
                        });
                        let i = ax.getSourceChannelName(r);
                        (E(this, st)[r] = {
                            channel: i,
                            listener: (s, ...o) => {
                                this._oglama.devMode &&
                                    console.log(
                                        "\u{1F3F9} ".concat(i),
                                        o[0] ?? "(tag not specified)",
                                        Array.isArray(o[1]) ? "[...]{".concat(o[1].length, "}") : "(no args)",
                                        o[2] ?? "(info not specified)"
                                    ),
                                    o.length >= 3 && E(this, Y)[r].webContents.send(i, o);
                            }
                        }),
                            Ig.on(E(this, st)[r].channel, E(this, st)[r].listener),
                            this._oglama.devMode &&
                                E(this, Y)[r].webContents.on("context-menu", (s, o) => {
                                    s.preventDefault(), E(this, Y)[r].webContents.openDevTools({ mode: "right" });
                                }),
                            E(this, Y)[r].setMenu(null),
                            E(this, Y)[r].on("closed", () => {
                                Ig.off(E(this, st)[r].channel, E(this, st)[r].listener),
                                    delete E(this, st)[r],
                                    delete E(this, Y)[r];
                            }),
                            E(this, Y)[r].webContents.on("did-finish-load", () => {
                                E(this, Y)[r].show(), E(this, Y)[r].webContents.focus();
                            }),
                            E(this, Y)[r].loadURL("http://localhost:".concat(this._oglama.config.getPort(), "/source-code/")),
                            (n = !0);
                    } while (!1);
                    return n;
                });
                b(this, "close", r => {
                    let n = !1;
                    return typeof E(this, Y)[r]?.destroy == "function" && (E(this, Y)[r].destroy(), (n = !0)), n;
                });
                b(this, "webContents", async (r, n, i) => {
                    if (
                        (this._oglama.devMode &&
                            console.log("ipc.source.webContents", JSON.stringify({ agentId: r, methodName: n, methodArgs: i })),
                        typeof r != "string" || !r.length)
                    )
                        throw new Error("Invalid Agent ID");
                    if (!(E(this, Y)[r] instanceof Rg)) throw new Error("Invalid Agent ID");
                    if (typeof n != "string" || typeof E(this, Y)[r].webContents[n] != "function")
                        throw new Error("Invalid source webContents method: ".concat(n));
                    return (
                        n === "loadURL" && (E(this, Y)[r].metadata.loaded = !0),
                        Array.isArray(i) || (i = []),
                        await E(this, Y)[r].webContents[n](...i)
                    );
                });
                this._register("source");
            }
        }),
        (Y = new WeakMap()),
        (st = new WeakMap()),
        Dg);
});
var kg = g((lP, $g) => {
    var { ipcMain: Lg, BrowserView: Fr } = require("electron"),
        Ug = require("path"),
        ux = Yt(),
        ol = ps(),
        cx = zt(),
        xn,
        Nn,
        In,
        Rn,
        $,
        Je,
        Qe,
        Jt;
    $g.exports =
        ((xn = class extends cx {
            constructor(r) {
                super(r);
                M(this, Nn);
                M(this, In);
                M(this, Rn, "");
                M(this, $, {});
                M(this, Je, {});
                M(this, Qe, "");
                b(this, "setWindowSize", (r, n) => {
                    Z(this, Nn, r), Z(this, In, n), E(this, Jt).call(this);
                });
                b(this, "list", () => Object.keys(E(this, $)));
                b(this, "removeAll", () => {
                    let r = Object.keys(E(this, $)).length > 0;
                    for (let n of Object.keys(E(this, $))) this.remove(n);
                    return r;
                });
                b(this, "add", (r, n, i = !1) => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid Agent ID");
                    if (typeof n != "string" || !n.match(/^https?:\/\//gi)) throw new Error("Invalid target URL");
                    if (E(this, $)[r] instanceof Fr) return !1;
                    let s = new Fr({
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
                            preload: Ug.join(this._oglama.rootPath, "lib/preloader/entry/target.js"),
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
                        s.webContents.setUserAgent(E(this, Rn)),
                        s.webContents.setZoomLevel(0),
                        s.webContents.setAudioMuted(!0),
                        s.webContents.loadFile(Ug.join(this._oglama.rootPath, "res", "index.html"), {
                            extraHeaders: "pragma: no-cache"
                        }),
                        this._oglama.mainWindow().addBrowserView(s),
                        this._oglama.main.view instanceof Fr &&
                            (this._oglama.mainWindow().removeBrowserView(this._oglama.main.view),
                            this._oglama.mainWindow().addBrowserView(this._oglama.main.view)),
                        (E(this, $)[r] = s);
                    let o = ux.getTargetChannelName(r);
                    return (
                        (E(this, Je)[r] = {
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
                        Lg.on(E(this, Je)[r].channel, E(this, Je)[r].listener),
                        i ? this.select(r) : E(this, Jt).call(this),
                        !0
                    );
                });
                b(this, "remove", r => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid Agent ID");
                    if (!(E(this, $)[r] instanceof Fr) || typeof E(this, Je)[r] > "u") return !1;
                    Lg.off(E(this, Je)[r].channel, E(this, Je)[r].listener), delete E(this, Je)[r];
                    try {
                        this._oglama.mainWindow().removeBrowserView(E(this, $)[r]);
                    } catch {}
                    try {
                        E(this, $)[r].webContents.destroy();
                    } catch {}
                    return delete E(this, $)[r], r === E(this, Qe) && Z(this, Qe, ""), E(this, Jt).call(this), !0;
                });
                b(this, "select", r => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid Agent ID");
                    if (E(this, $)[r] instanceof Fr && E(this, Qe) !== r) {
                        Z(this, Qe, r),
                            E(this, $)[r].metadata.loaded ||
                                ((E(this, $)[r].metadata.loaded = !0),
                                E(this, $)[r].webContents.loadURL(E(this, $)[r].metadata.targetUrl));
                        let n = {};
                        for (let i of Object.keys(E(this, $)).filter(s => s !== r)) n[i] = E(this, $)[i];
                        return (
                            (n[r] = E(this, $)[r]),
                            Z(this, $, n),
                            this._oglama.mainWindow().removeBrowserView(E(this, $)[r]),
                            this._oglama.mainWindow().removeBrowserView(this._oglama.main.view),
                            this._oglama.main.onTop
                                ? (this._oglama.mainWindow().addBrowserView(E(this, $)[r]),
                                  this._oglama.mainWindow().addBrowserView(this._oglama.main.view),
                                  this._oglama.main.view.webContents.focus())
                                : (this._oglama.mainWindow().addBrowserView(this._oglama.main.view),
                                  this._oglama.mainWindow().addBrowserView(E(this, $)[r]),
                                  E(this, $)[r].webContents.focus()),
                            E(this, Jt).call(this),
                            !0
                        );
                    }
                    return !1;
                });
                b(this, "getSelected", () => E(this, Qe));
                b(this, "openDevTools", r => {
                    let n = !1;
                    do {
                        if (typeof r != "string" || !r.length || typeof E(this, $)[r]?.webContents?.openDevTools != "function")
                            break;
                        E(this, $)[r].webContents.openDevTools({ mode: "detach" }), (n = !0);
                    } while (!1);
                    return n;
                });
                b(this, "getTargets", () => E(this, $));
                b(this, "webContents", async (r, n, i) => {
                    if (
                        (this._oglama.devMode &&
                            console.log("ipc.target.webContents", JSON.stringify({ agentId: r, methodName: n, methodArgs: i })),
                        typeof r != "string" || !r.length)
                    )
                        throw new Error("Invalid Agent ID");
                    if (!(E(this, $)[r] instanceof Fr)) throw new Error("Invalid Agent ID");
                    if (typeof n != "string" || typeof E(this, $)[r].webContents[n] != "function")
                        throw new Error("Invalid target webContents method: ".concat(n));
                    return (
                        n === "loadURL" && (E(this, $)[r].metadata.loaded = !0),
                        Array.isArray(i) || (i = []),
                        await E(this, $)[r].webContents[n](...i)
                    );
                });
                M(this, Jt, () => {
                    if (!Object.keys(E(this, $)).length) return;
                    let r = E(this, Nn) - this.constructor.MARGIN_LEFT,
                        n = E(this, In) - (this.constructor.MARGIN_TOP + this.constructor.MARGIN_BOTTOM);
                    for (let i of Object.keys(E(this, $))) {
                        let s = i === E(this, Qe) ? this.constructor.MARGIN_LEFT : 100 - r,
                            o = i === E(this, Qe) ? this.constructor.MARGIN_TOP : 50 - n;
                        E(this, $)[i].setBounds({ x: s, y: o, width: r, height: n });
                    }
                });
                let n = "";
                switch (process.platform) {
                    case ol.MACOS:
                        n = "(Macintosh; Intel Mac OS X 13_3)";
                        break;
                    case ol.WINDOWS:
                        n = "(Windows NT 10.0; Win64; x64)";
                        break;
                    case ol.LINUX:
                        n = "(X11; Linux x86_64)";
                        break;
                }
                Z(this, Rn, "Mozilla/5.0 ".concat(n, " AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")),
                    this._register("target");
            }
        }),
        (Nn = new WeakMap()),
        (In = new WeakMap()),
        (Rn = new WeakMap()),
        ($ = new WeakMap()),
        (Je = new WeakMap()),
        (Qe = new WeakMap()),
        (Jt = new WeakMap()),
        b(xn, "MARGIN_LEFT", 250),
        b(xn, "MARGIN_TOP", 50),
        b(xn, "MARGIN_BOTTOM", 50),
        xn);
});
var Hg = g((fP, Bg) => {
    var { session: fx, shell: hx, ipcMain: dx, BrowserView: al } = require("electron"),
        px = require("path"),
        ll = Yt(),
        mx = zt(),
        ws,
        Mg;
    Bg.exports =
        ((Mg = class extends mx {
            constructor(r) {
                super(r);
                b(this, "windowWidth");
                b(this, "windowHeight");
                b(this, "view", null);
                b(this, "darkMode", !0);
                M(this, ws, () =>
                    this.view instanceof al
                        ? (this.view.setBounds({ x: 0, y: 0, width: this.windowWidth, height: this.windowHeight }), !0)
                        : !1
                );
                b(this, "init", () =>
                    this.view instanceof al
                        ? !1
                        : ((this.windowWidth = this._oglama.config.getMainLoginWidth()),
                          (this.windowHeight = this._oglama.config.getMainLoginHeight()),
                          (this.view = new al({
                              width: this.windowWidth,
                              height: this.windowHeight,
                              resizable: !1,
                              backgroundColor: "#00000000",
                              transparent: !0,
                              webPreferences: {
                                  backgroundThrottling: !1,
                                  imageAnimationPolicy: "noAnimation",
                                  spellcheck: !1,
                                  preload: px.join(this._oglama.rootPath, "lib/preloader/entry/main.js"),
                                  nodeIntegration: !0,
                                  devTools: this._oglama.devMode,
                                  session: fx.defaultSession,
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
                          dx.on(ll.WINDOW_MAIN_LOGIN, (r, ...n) => {
                              this._oglama.devMode &&
                                  console.log(
                                      "\u{1F3E0} ".concat(ll.WINDOW_MAIN_LOGIN),
                                      n[0] ?? "(tag not specified)",
                                      Array.isArray(n[1]) ? "[...]{".concat(n[1].length, "}") : "(no args)",
                                      n[2] ?? "(info not specified)"
                                  ),
                                  n.length >= 3 && this.view.webContents.send(ll.WINDOW_MAIN_LOGIN, n);
                          }),
                          this._oglama.mainLoginWindow().addBrowserView(this.view),
                          E(this, ws).call(this),
                          !0)
                );
                b(this, "openExternal", r => {
                    typeof r == "string" && hx.openExternal(r);
                });
                this._register("main/login");
            }
        }),
        (ws = new WeakMap()),
        Mg);
});
var Gg = g((pP, Wg) => {
    var { app: gx, session: wx, shell: yx, ipcMain: Ex, BrowserView: ys } = require("electron"),
        _x = require("path"),
        ul = Yt(),
        vx = Hg(),
        Sx = zt(),
        qr,
        jg;
    Wg.exports =
        ((jg = class extends Sx {
            constructor(r) {
                super(r);
                b(this, "windowWidth");
                b(this, "windowHeight");
                b(this, "view", null);
                b(this, "onTop", !1);
                b(this, "darkMode", !0);
                b(this, "login", null);
                M(this, qr, () =>
                    this.view instanceof ys
                        ? (this.view.setBounds({ x: 0, y: 0, width: this.windowWidth, height: this.windowHeight }), !0)
                        : !1
                );
                b(this, "init", () =>
                    this.view instanceof ys
                        ? !1
                        : ((this.windowWidth = this._oglama.config.getMainMinWidth()),
                          (this.windowHeight = this._oglama.config.getMainMinHeight()),
                          (this.view = new ys({
                              width: this.windowWidth,
                              height: this.windowHeight,
                              resizable: !1,
                              backgroundColor: "#00000000",
                              transparent: !0,
                              webPreferences: {
                                  backgroundThrottling: !1,
                                  imageAnimationPolicy: "noAnimation",
                                  spellcheck: !1,
                                  preload: _x.join(this._oglama.rootPath, "lib/preloader/entry/main.js"),
                                  nodeIntegration: !0,
                                  devTools: this._oglama.devMode,
                                  session: wx.defaultSession,
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
                          Ex.on(ul.WINDOW_MAIN, (r, ...n) => {
                              this._oglama.devMode &&
                                  console.log(
                                      "\u{1F3E0} ".concat(ul.WINDOW_MAIN),
                                      n[0] ?? "(tag not specified)",
                                      Array.isArray(n[1]) ? "[...]{".concat(n[1].length, "}") : "(no args)",
                                      n[2] ?? "(info not specified)"
                                  ),
                                  n.length >= 3 && this.view.webContents.send(ul.WINDOW_MAIN, n);
                          }),
                          this._oglama.mainWindow().addBrowserView(this.view),
                          E(this, qr).call(this),
                          !0)
                );
                b(this, "setWindowSize", (r, n) => {
                    (this.windowWidth = r), (this.windowHeight = n), E(this, qr).call(this);
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
                                s instanceof ys &&
                                    (this._oglama.mainWindow().removeBrowserView(s),
                                    this._oglama.mainWindow().removeBrowserView(this.view),
                                    this._oglama.mainWindow().addBrowserView(this.view),
                                    this._oglama.mainWindow().addBrowserView(s),
                                    s.webContents.focus());
                            }
                        }
                        E(this, qr).call(this), (n = !0);
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
                    gx.quit();
                });
                b(this, "getDarkMode", () => this.darkMode);
                b(this, "openExternal", r => {
                    typeof r == "string" && yx.openExternal(r);
                });
                this._register("main"), (this.login = new vx(r));
            }
        }),
        (qr = new WeakMap()),
        jg);
});
var Jg = g((wP, Kg) => {
    var cl = Yt(),
        { app: fl, session: Vg, BrowserWindow: Yg } = require("electron"),
        zg = require("path"),
        hl = ps(),
        Ax = lg(),
        Cx = cg(),
        Tx = hg(),
        bx = pg(),
        Ox = gg(),
        xx = Eg(),
        Nx = bg(),
        Ix = Ng(),
        Rx = qg(),
        Px = kg(),
        Dx = Gg(),
        te,
        Pn,
        Dn,
        Be,
        Xg;
    Kg.exports =
        ((Xg = class {
            constructor() {
                M(this, te, null);
                M(this, Pn, null);
                M(this, Dn, !1);
                M(this, Be, null);
                b(this, "rootPath", fl.getAppPath());
                b(this, "devMode", !1);
                b(this, "log", new Tx(this));
                b(this, "webserver", new Ax(this));
                b(this, "activity", new Cx(this));
                b(this, "diskStorage", new Nx(this));
                b(this, "device", new Ix(this));
                b(this, "source", new Rx(this));
                b(this, "target", new Px(this));
                b(this, "main", new Dx(this));
                b(this, "config", new bx(this));
                b(this, "file", new xx(this));
                b(this, "utils", new Ox(this));
            }
            mainWindow() {
                let t = this;
                if (E(t, te) === null) {
                    Z(
                        t,
                        te,
                        new Yg({
                            show: !1,
                            minWidth: t.config.getMainMinWidth(),
                            minHeight: t.config.getMainMinHeight(),
                            width: t.config.getMainMinWidth(),
                            height: t.config.getMainMinHeight(),
                            icon: zg.join(t.rootPath, "res/icons/icon.png"),
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
                                session: Vg.defaultSession
                            }
                        })
                    ),
                        E(t, te).setMenu(null),
                        E(t, te).setMaxListeners(0),
                        E(t, te).on("closed", () => {
                            Z(t, te, null), fl.quit();
                        });
                    let r = () => {
                        let n = E(t, te).getSize(),
                            i = [hl.WINDOWS, hl.MACOS].includes(process.platform)
                                ? Math.abs(E(t, te).getSize()[1] - E(t, te).getContentSize()[1])
                                : 0,
                            s = [hl.WINDOWS].includes(process.platform)
                                ? Math.abs(E(t, te).getSize()[0] - E(t, te).getContentSize()[0])
                                : 0;
                        t.main.setWindowSize(n[0] - s, n[1] - i), t.target.setWindowSize(n[0] - s, n[1] - i);
                    };
                    E(t, te).on("resize", () => r()),
                        E(t, te).once("ready-to-show", () => r()),
                        t.main.init(),
                        t.main.view.webContents.on("did-finish-load", () => {
                            t.getPostAuth() && E(t, te).show(), r();
                        }),
                        E(t, te).setMenu(null),
                        Z(
                            t,
                            Pn,
                            setInterval(() => {
                                if (E(t, te) === null) {
                                    clearInterval(E(t, Pn));
                                    return;
                                }
                                let n = E(t, te).getSize();
                                E(t, te).setSize(n[0] + 1, n[1]), setTimeout(() => E(t, te).setSize(n[0], n[1]), 250);
                            }, 9e4)
                        );
                }
                return E(t, te);
            }
            mainLoginWindow() {
                let t = this;
                return (
                    E(t, Be) === null &&
                        (Z(
                            t,
                            Be,
                            new Yg({
                                width: t.config.getMainLoginWidth(),
                                height: t.config.getMainLoginHeight(),
                                icon: zg.join(t.rootPath, "res/icons/icon.png"),
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
                                    session: Vg.defaultSession
                                }
                            })
                        ),
                        E(t, Be).setMenu(null),
                        E(t, Be).setMaxListeners(0),
                        E(t, Be).on("closed", () => {
                            Z(t, Be, null), fl.quit();
                        }),
                        t.main?.login?.init(),
                        t.main?.login?.view.webContents.on("did-finish-load", () => {
                            t.getPostAuth() || E(t, Be).show();
                        }),
                        E(t, Be).setMenu(null)),
                    E(t, Be)
                );
            }
            getPostAuth() {
                return E(this, Dn);
            }
            setPostAuth(t) {
                let r = !1;
                if (((t = !!t), t !== this.getPostAuth())) {
                    Z(this, Dn, t);
                    let n = ["ipc:oglama:auth", [t], { type: "req", fromWin: cl.WINDOW_MAIN_LOGIN }];
                    this.main?.login?.view.webContents.send(cl.WINDOW_MAIN_LOGIN, n),
                        setTimeout(() => {
                            this.main?.view.webContents.send(cl.WINDOW_MAIN, n);
                        }, 750),
                        t
                            ? (this.mainWindow().show(), this.mainLoginWindow().hide())
                            : (this.mainWindow().hide(), this.mainLoginWindow().show()),
                        (r = !0);
                }
                return r;
            }
        }),
        (te = new WeakMap()),
        (Pn = new WeakMap()),
        (Dn = new WeakMap()),
        (Be = new WeakMap()),
        Xg);
});
var { app: qe, BrowserWindow: Fx } = require("electron"),
    { autoUpdater: dl } = Vt(),
    qx = Jg();
qe.disableHardwareAcceleration();
qe.commandLine.appendSwitch("disable-gpu");
qe.commandLine.appendSwitch("allow-insecure-localhost");
qe.commandLine.appendSwitch("disable-renderer-backgrounding");
qe.commandLine.appendSwitch("disable-background-timer-throttling");
qe.commandLine.appendSwitch("disable-backgrounding-occluded-windows");
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
process.on("uncaughtException", e => {
    process.env.NODE_ENV === "development" && console.debug(e);
});
var He = null;
do {
    if (!qe.requestSingleInstanceLock()) {
        qe.quit();
        break;
    }
    qe.on("second-instance", () => {
        He !== null &&
            (He.getPostAuth()
                ? (He.mainWindow().isMinimized() && He.mainWindow().restore(), He.mainWindow().show())
                : (He.mainLoginWindow().isMinimized() && He.mainLoginWindow().restore(), He.mainLoginWindow().show()));
    }),
        qe.on("ready", async () => {
            (He = new qx()),
                qe.on("activate", () => {
                    Fx.getAllWindows().length === 0 && He.activity.start();
                }),
                await He.webserver.start(),
                await He.activity.start(),
                dl.checkForUpdatesAndNotify();
        }),
        dl.on("update-downloaded", () => {
            dialog
                .showMessageBox({ type: "info", title: "Update ready", message: "Install now?", buttons: ["Yes", "Later"] })
                .then(e => {
                    e.response === 0 && dl.quitAndInstall();
                });
        }),
        qe.on("window-all-closed", () => {
            process.platform !== "darwin" && qe.quit();
        });
} while (!1);
