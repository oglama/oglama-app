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
var kg = Object.defineProperty;
var ll = e => {
    throw TypeError(e);
};
var Mg = (e, t, r) => (t in e ? kg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r));
var g = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var b = (e, t, r) => Mg(e, typeof t != "symbol" ? t + "" : t, r),
    ul = (e, t, r) => t.has(e) || ll("Cannot " + r);
var v = (e, t, r) => (ul(e, t, "read from private field"), r ? r.call(e) : t.get(e)),
    z = (e, t, r) =>
        t.has(e) ? ll("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r),
    re = (e, t, r, n) => (ul(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
var bn = g(Vt => {
    "use strict";
    Object.defineProperty(Vt, "__esModule", { value: !0 });
    Vt.CancellationError = Vt.CancellationToken = void 0;
    var Bg = require("events"),
        ho = class extends Bg.EventEmitter {
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
    Vt.CancellationToken = ho;
    var Nr = class extends Error {
        constructor() {
            super("cancelled");
        }
    };
    Vt.CancellationError = Nr;
});
var fl = g((mx, cl) => {
    var Yt = 1e3,
        zt = Yt * 60,
        Xt = zt * 60,
        St = Xt * 24,
        Hg = St * 7,
        jg = St * 365.25;
    cl.exports = function (e, t) {
        t = t || {};
        var r = typeof e;
        if (r === "string" && e.length > 0) return Wg(e);
        if (r === "number" && isFinite(e)) return t.long ? Vg(e) : Gg(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
    };
    function Wg(e) {
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
                        return r * jg;
                    case "weeks":
                    case "week":
                    case "w":
                        return r * Hg;
                    case "days":
                    case "day":
                    case "d":
                        return r * St;
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
    function Gg(e) {
        var t = Math.abs(e);
        return t >= St
            ? Math.round(e / St) + "d"
            : t >= Xt
            ? Math.round(e / Xt) + "h"
            : t >= zt
            ? Math.round(e / zt) + "m"
            : t >= Yt
            ? Math.round(e / Yt) + "s"
            : e + "ms";
    }
    function Vg(e) {
        var t = Math.abs(e);
        return t >= St
            ? On(e, t, St, "day")
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
var po = g((gx, hl) => {
    function Yg(e) {
        (r.debug = r),
            (r.default = r),
            (r.coerce = l),
            (r.disable = s),
            (r.enable = i),
            (r.enabled = a),
            (r.humanize = fl()),
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
                    S = Number(new Date()),
                    N = S - (f || S);
                (T.diff = N),
                    (T.prev = f),
                    (T.curr = S),
                    (f = S),
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
    hl.exports = Yg;
});
var dl = g((De, xn) => {
    De.formatArgs = Xg;
    De.save = Jg;
    De.load = Kg;
    De.useColors = zg;
    De.storage = Qg();
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
    function zg() {
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
    function Xg(e) {
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
    function Jg(e) {
        try {
            e ? De.storage.setItem("debug", e) : De.storage.removeItem("debug");
        } catch {}
    }
    function Kg() {
        let e;
        try {
            e = De.storage.getItem("debug");
        } catch {}
        return !e && typeof process < "u" && "env" in process && (e = process.env.DEBUG), e;
    }
    function Qg() {
        try {
            return localStorage;
        } catch {}
    }
    xn.exports = po()(De);
    var { formatters: Zg } = xn.exports;
    Zg.j = function (e) {
        try {
            return JSON.stringify(e);
        } catch (t) {
            return "[UnexpectedJSONParseError]: " + t.message;
        }
    };
});
var ml = g((wx, pl) => {
    "use strict";
    pl.exports = (e, t = process.argv) => {
        let r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--",
            n = t.indexOf(r + e),
            i = t.indexOf("--");
        return n !== -1 && (i === -1 || n < i);
    };
});
var yl = g((yx, wl) => {
    "use strict";
    var e0 = require("os"),
        gl = require("tty"),
        qe = ml(),
        { env: ae } = process,
        ot;
    qe("no-color") || qe("no-colors") || qe("color=false") || qe("color=never")
        ? (ot = 0)
        : (qe("color") || qe("colors") || qe("color=true") || qe("color=always")) && (ot = 1);
    "FORCE_COLOR" in ae &&
        (ae.FORCE_COLOR === "true"
            ? (ot = 1)
            : ae.FORCE_COLOR === "false"
            ? (ot = 0)
            : (ot = ae.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(ae.FORCE_COLOR, 10), 3)));
    function mo(e) {
        return e === 0 ? !1 : { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 };
    }
    function go(e, t) {
        if (ot === 0) return 0;
        if (qe("color=16m") || qe("color=full") || qe("color=truecolor")) return 3;
        if (qe("color=256")) return 2;
        if (e && !t && ot === void 0) return 0;
        let r = ot || 0;
        if (ae.TERM === "dumb") return r;
        if (process.platform === "win32") {
            let n = e0.release().split(".");
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
    function t0(e) {
        let t = go(e, e && e.isTTY);
        return mo(t);
    }
    wl.exports = { supportsColor: t0, stdout: mo(go(!0, gl.isatty(1))), stderr: mo(go(!0, gl.isatty(2))) };
});
var _l = g((le, Nn) => {
    var r0 = require("tty"),
        In = require("util");
    le.init = u0;
    le.log = s0;
    le.formatArgs = i0;
    le.save = a0;
    le.load = l0;
    le.useColors = n0;
    le.destroy = In.deprecate(() => {},
    "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    le.colors = [6, 2, 3, 4, 5, 1];
    try {
        let e = yl();
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
    function n0() {
        return "colors" in le.inspectOpts ? !!le.inspectOpts.colors : r0.isatty(process.stderr.fd);
    }
    function i0(e) {
        let { namespace: t, useColors: r } = this;
        if (r) {
            let n = this.color,
                i = "\x1B[3" + (n < 8 ? n : "8;5;" + n),
                o = "  ".concat(i, ";1m").concat(t, " \x1B[0m");
            (e[0] = o + e[0].split("\n").join("\n" + o)), e.push(i + "m+" + Nn.exports.humanize(this.diff) + "\x1B[0m");
        } else e[0] = o0() + t + " " + e[0];
    }
    function o0() {
        return le.inspectOpts.hideDate ? "" : new Date().toISOString() + " ";
    }
    function s0(...e) {
        return process.stderr.write(In.formatWithOptions(le.inspectOpts, ...e) + "\n");
    }
    function a0(e) {
        e ? (process.env.DEBUG = e) : delete process.env.DEBUG;
    }
    function l0() {
        return process.env.DEBUG;
    }
    function u0(e) {
        e.inspectOpts = {};
        let t = Object.keys(le.inspectOpts);
        for (let r = 0; r < t.length; r++) e.inspectOpts[t[r]] = le.inspectOpts[t[r]];
    }
    Nn.exports = po()(le);
    var { formatters: El } = Nn.exports;
    El.o = function (e) {
        return (
            (this.inspectOpts.colors = this.useColors),
            In.inspect(e, this.inspectOpts)
                .split("\n")
                .map(t => t.trim())
                .join(" ")
        );
    };
    El.O = function (e) {
        return (this.inspectOpts.colors = this.useColors), In.inspect(e, this.inspectOpts);
    };
});
var vl = g((Ex, wo) => {
    typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs
        ? (wo.exports = dl())
        : (wo.exports = _l());
});
var Rr = g(yo => {
    "use strict";
    Object.defineProperty(yo, "__esModule", { value: !0 });
    yo.newError = c0;
    function c0(e, t) {
        let r = new Error(e);
        return (r.code = t), r;
    }
});
var _o = g(Rn => {
    "use strict";
    Object.defineProperty(Rn, "__esModule", { value: !0 });
    Rn.ProgressCallbackTransform = void 0;
    var f0 = require("stream"),
        Eo = class extends f0.Transform {
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
    Rn.ProgressCallbackTransform = Eo;
});
var Tl = g(Ee => {
    "use strict";
    Object.defineProperty(Ee, "__esModule", { value: !0 });
    Ee.DigestTransform = Ee.HttpExecutor = Ee.HttpError = void 0;
    Ee.createHttpError = vo;
    Ee.parseJson = E0;
    Ee.configureRequestOptionsFromUrl = Sl;
    Ee.configureRequestUrl = Co;
    Ee.safeGetHeader = Jt;
    Ee.configureRequestOptions = Pn;
    Ee.safeStringifyJson = Dn;
    var h0 = require("crypto"),
        d0 = vl(),
        p0 = require("fs"),
        m0 = require("stream"),
        Cl = require("url"),
        g0 = bn(),
        Al = Rr(),
        w0 = _o(),
        Pr = (0, d0.default)("electron-builder");
    function vo(e, t = null) {
        return new Dr(
            e.statusCode || -1,
            "".concat(e.statusCode, " ").concat(e.statusMessage) +
                (t == null ? "" : "\n" + JSON.stringify(t, null, "  ")) +
                "\nHeaders: " +
                Dn(e.headers),
            t
        );
    }
    var y0 = new Map([
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
            constructor(t, r = "HTTP error: ".concat(y0.get(t) || t), n = null) {
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
    function E0(e) {
        return e.then(t => (t == null || t.length === 0 ? null : JSON.parse(t)));
    }
    var Ao = class e {
        constructor() {
            this.maxRedirects = 10;
        }
        request(t, r = new g0.CancellationToken(), n) {
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
                    vo(
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
                                vo(
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
                r.responseHandler == null ? v0(r, o) : r.responseHandler(o, r.callback);
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
            let n = Sl(t, { ...r }),
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
    Ee.HttpExecutor = Ao;
    function Sl(e, t) {
        let r = Pn(t);
        return Co(new Cl.URL(e), r), r;
    }
    function Co(e, t) {
        (t.protocol = e.protocol),
            (t.hostname = e.hostname),
            e.port ? (t.port = e.port) : t.port && delete t.port,
            (t.path = e.pathname + e.search);
    }
    var Fr = class extends m0.Transform {
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
                (this.digester = (0, h0.createHash)(r));
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
            if (this._actual == null) throw (0, Al.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
            if (this._actual !== this.expected)
                throw (0, Al.newError)(
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
    function _0(e, t, r) {
        return e != null && t != null && e !== t
            ? (r(new Error("checksum mismatch: expected ".concat(t, " but got ").concat(e, " (X-Checksum-Sha2 header)"))), !1)
            : !0;
    }
    function Jt(e, t) {
        let r = e.headers[t];
        return r == null ? null : Array.isArray(r) ? (r.length === 0 ? null : r[r.length - 1]) : r;
    }
    function v0(e, t) {
        if (!_0(Jt(t, "X-Checksum-Sha2"), e.options.sha2, e.callback)) return;
        let r = [];
        if (e.options.onProgress != null) {
            let s = Jt(t, "content-length");
            s != null &&
                r.push(new w0.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
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
        let i = (0, p0.createWriteStream)(e.destination);
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
var Ol = g(Fn => {
    "use strict";
    Object.defineProperty(Fn, "__esModule", { value: !0 });
    Fn.githubUrl = A0;
    Fn.getS3LikeProviderBaseUrl = C0;
    function A0(e, t = "github.com") {
        return "".concat(e.protocol || "https", "://").concat(e.host || t);
    }
    function C0(e) {
        let t = e.provider;
        if (t === "s3") return S0(e);
        if (t === "spaces") return T0(e);
        throw new Error("Not supported provider: ".concat(t));
    }
    function S0(e) {
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
        return bl(t, e.path);
    }
    function bl(e, t) {
        return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), (e += t)), e;
    }
    function T0(e) {
        if (e.name == null) throw new Error("name is missing");
        if (e.region == null) throw new Error("region is missing");
        return bl("https://".concat(e.name, ".").concat(e.region, ".digitaloceanspaces.com"), e.path);
    }
});
var xl = g(So => {
    "use strict";
    Object.defineProperty(So, "__esModule", { value: !0 });
    So.parseDn = b0;
    function b0(e) {
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
var Dl = g(Kt => {
    "use strict";
    Object.defineProperty(Kt, "__esModule", { value: !0 });
    Kt.nil = Kt.UUID = void 0;
    var Rl = require("crypto"),
        Pl = Rr(),
        O0 = "options.name must be either a string or a Buffer",
        Il = (0, Rl.randomBytes)(16);
    Il[0] = Il[0] | 1;
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
            return x0(t, "sha1", 80, r);
        }
        toString() {
            return this.ascii == null && (this.ascii = I0(this.binary)), this.ascii;
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
                                  variant: Nl((qn[t[19] + t[20]] & 224) >> 5),
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
                    : { version: (t[r + 6] & 240) >> 4, variant: Nl((t[r + 8] & 224) >> 5), format: "binary" };
            }
            throw (0, Pl.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
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
    function Nl(e) {
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
    function x0(e, t, r, n, i = qr.ASCII) {
        let o = (0, Rl.createHash)(t);
        if (typeof e != "string" && !Buffer.isBuffer(e)) throw (0, Pl.newError)(O0, "ERR_INVALID_UUID_NAME");
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
    function I0(e) {
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
var Fl = g(Ln => {
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
            var C = this;
            i(C),
                (C.q = C.c = ""),
                (C.bufferCheckPosition = e.MAX_BUFFER_LENGTH),
                (C.opt = u || {}),
                (C.opt.lowercase = C.opt.lowercase || C.opt.lowercasetags),
                (C.looseCase = C.opt.lowercase ? "toLowerCase" : "toUpperCase"),
                (C.tags = []),
                (C.closed = C.closedRoot = C.sawRoot = !1),
                (C.tag = C.error = null),
                (C.strict = !!h),
                (C.noscript = !!(h || C.opt.noscript)),
                (C.state = y.BEGIN),
                (C.strictEntities = C.opt.strictEntities),
                (C.ENTITIES = C.strictEntities ? Object.create(e.XML_ENTITIES) : Object.create(e.ENTITIES)),
                (C.attribList = []),
                C.opt.xmlns && (C.ns = Object.create(E)),
                C.opt.unquotedAttributeValues === void 0 && (C.opt.unquotedAttributeValues = !h),
                (C.trackPosition = C.opt.position !== !1),
                C.trackPosition && (C.position = C.line = C.column = 0),
                U(C, "onready");
        }
        Object.create ||
            (Object.create = function (h) {
                function u() {}
                u.prototype = h;
                var C = new u();
                return C;
            }),
            Object.keys ||
                (Object.keys = function (h) {
                    var u = [];
                    for (var C in h) h.hasOwnProperty(C) && u.push(C);
                    return u;
                });
        function n(h) {
            for (var u = Math.max(e.MAX_BUFFER_LENGTH, 10), C = 0, w = 0, B = t.length; w < B; w++) {
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
                C = Math.max(C, oe);
            }
            var se = e.MAX_BUFFER_LENGTH - C;
            h.bufferCheckPosition = se + h.position;
        }
        function i(h) {
            for (var u = 0, C = t.length; u < C; u++) h[t[u]] = "";
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
            write: Ug,
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
            var C = this;
            (this._parser.onend = function () {
                C.emit("end");
            }),
                (this._parser.onerror = function (w) {
                    C.emit("error", w), (C._parser.error = null);
                }),
                (this._decoder = null),
                a.forEach(function (w) {
                    Object.defineProperty(C, "on" + w, {
                        get: function () {
                            return C._parser["on" + w];
                        },
                        set: function (B) {
                            if (!B) return C.removeAllListeners(w), (C._parser["on" + w] = B), B;
                            C.on(w, B);
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
                var C = this;
                return (
                    !C._parser["on" + h] &&
                        a.indexOf(h) !== -1 &&
                        (C._parser["on" + h] = function () {
                            var w = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
                            w.splice(0, 0, h), C.emit.apply(C, w);
                        }),
                    s.prototype.on.call(C, h, u)
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
            S =
                /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
        function N(h) {
            return h === " " || h === "\n" || h === "\r" || h === "	";
        }
        function L(h) {
            return h === '"' || h === "'";
        }
        function Fe(h) {
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
                    C = typeof u == "number" ? String.fromCharCode(u) : u;
                e.ENTITIES[h] = C;
            });
        for (var P in e.STATE) e.STATE[e.STATE[P]] = P;
        y = e.STATE;
        function U(h, u, C) {
            h[u] && h[u](C);
        }
        function R(h, u, C) {
            h.textNode && Q(h), U(h, u, C);
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
                C = (h.tag = { name: h.tagName, attributes: {} });
            h.opt.xmlns && (C.ns = u.ns), (h.attribList.length = 0), R(h, "onopentagstart", C);
        }
        function te(h, u) {
            var C = h.indexOf(":"),
                w = C < 0 ? ["", h] : h.split(":"),
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
                    C = u.prefix,
                    w = u.local;
                if (C === "xmlns")
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
                var C = h.tag,
                    w = te(h.tagName);
                (C.prefix = w.prefix),
                    (C.local = w.local),
                    (C.uri = C.ns[w.prefix] || ""),
                    C.prefix && !C.uri && (F(h, "Unbound namespace prefix: " + JSON.stringify(h.tagName)), (C.uri = w.prefix));
                var B = h.tags[h.tags.length - 1] || h;
                C.ns &&
                    B.ns !== C.ns &&
                    Object.keys(C.ns).forEach(function (al) {
                        R(h, "onopennamespace", { prefix: al, uri: C.ns[al] });
                    });
                for (var oe = 0, se = h.attribList.length; oe < se; oe++) {
                    var be = h.attribList[oe],
                        Oe = be[0],
                        Gt = be[1],
                        he = te(Oe, !0),
                        Je = he.prefix,
                        $g = he.local,
                        sl = Je === "" ? "" : C.ns[Je] || "",
                        fo = { name: Oe, value: Gt, prefix: Je, local: $g, uri: sl };
                    Je && Je !== "xmlns" && !sl && (F(h, "Unbound namespace prefix: " + JSON.stringify(Je)), (fo.uri = Je)),
                        (h.tag.attributes[Oe] = fo),
                        R(h, "onattribute", fo);
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
        function co(h) {
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
                C = h.tagName;
            h.strict || (C = C[h.looseCase]());
            for (var w = C; u--; ) {
                var B = h.tags[u];
                if (B.name !== w) F(h, "Unexpected close tag");
                else break;
            }
            if (u < 0) {
                F(h, "Unmatched closing tag: " + h.tagName), (h.textNode += "</" + h.tagName + ">"), (h.state = y.TEXT);
                return;
            }
            h.tagName = C;
            for (var oe = h.tags.length; oe-- > u; ) {
                var se = (h.tag = h.tags.pop());
                (h.tagName = h.tag.name), R(h, "onclosetag", h.tagName);
                var be = {};
                for (var Oe in se.ns) be[Oe] = se.ns[Oe];
                var Gt = h.tags[h.tags.length - 1] || h;
                h.opt.xmlns &&
                    se.ns !== Gt.ns &&
                    Object.keys(se.ns).forEach(function (he) {
                        var Je = se.ns[he];
                        R(h, "onclosenamespace", { prefix: he, uri: Je });
                    });
            }
            u === 0 && (h.closedRoot = !0),
                (h.tagName = h.attribValue = h.attribName = ""),
                (h.attribList.length = 0),
                (h.state = y.TEXT);
        }
        function Lg(h) {
            var u = h.entity,
                C = u.toLowerCase(),
                w,
                B = "";
            return h.ENTITIES[u]
                ? h.ENTITIES[u]
                : h.ENTITIES[C]
                ? h.ENTITIES[C]
                : ((u = C),
                  u.charAt(0) === "#" &&
                      (u.charAt(1) === "x"
                          ? ((u = u.slice(2)), (w = parseInt(u, 16)), (B = w.toString(16)))
                          : ((u = u.slice(1)), (w = parseInt(u, 10)), (B = w.toString(10)))),
                  (u = u.replace(/^0+/, "")),
                  isNaN(w) || B.toLowerCase() !== u
                      ? (F(h, "Invalid character entity"), "&" + h.entity + ";")
                      : String.fromCodePoint(w));
        }
        function il(h, u) {
            u === "<"
                ? ((h.state = y.OPEN_WAKA), (h.startTagPosition = h.position))
                : N(u) || (F(h, "Non-whitespace before first tag."), (h.textNode = u), (h.state = y.TEXT));
        }
        function ol(h, u) {
            var C = "";
            return u < h.length && (C = h.charAt(u)), C;
        }
        function Ug(h) {
            var u = this;
            if (this.error) throw this.error;
            if (u.closed) return K(u, "Cannot write after close. Assign an onready handler.");
            if (h === null) return G(u);
            typeof h == "object" && (h = h.toString());
            for (var C = 0, w = ""; (w = ol(h, C++)), (u.c = w), !!w; )
                switch ((u.trackPosition && (u.position++, w === "\n" ? (u.line++, (u.column = 0)) : u.column++), u.state)) {
                    case y.BEGIN:
                        if (((u.state = y.BEGIN_WHITESPACE), w === "\uFEFF")) continue;
                        il(u, w);
                        continue;
                    case y.BEGIN_WHITESPACE:
                        il(u, w);
                        continue;
                    case y.TEXT:
                        if (u.sawRoot && !u.closedRoot) {
                            for (var B = C - 1; w && w !== "<" && w !== "&"; )
                                (w = ol(h, C++)),
                                    w && u.trackPosition && (u.position++, w === "\n" ? (u.line++, (u.column = 0)) : u.column++);
                            u.textNode += h.substring(B, C - 1);
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
                            ? (it(u, !0), co(u))
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
                        if (!Fe(w)) {
                            w === "&" ? (u.state = y.ATTRIB_VALUE_ENTITY_U) : (u.attribValue += w);
                            continue;
                        }
                        j(u), w === ">" ? it(u) : (u.state = y.ATTRIB);
                        continue;
                    case y.CLOSE_TAG:
                        if (u.tagName)
                            w === ">"
                                ? co(u)
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
                        w === ">" ? co(u) : F(u, "Invalid characters in closing tag");
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
                            var Oe = Lg(u);
                            u.opt.unparsedEntities && !Object.values(e.XML_ENTITIES).includes(Oe)
                                ? ((u.entity = ""), (u.state = se), u.write(Oe))
                                : ((u[be] += Oe), (u.entity = ""), (u.state = se));
                        } else
                            Y(u.entity.length ? S : T, w)
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
                    C = function () {
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
                    ? Object.defineProperty(String, "fromCodePoint", { value: C, configurable: !0, writable: !0 })
                    : (String.fromCodePoint = C);
            })();
    })(typeof Ln > "u" ? (Ln.sax = {}) : Ln);
});
var Ll = g(Lr => {
    "use strict";
    Object.defineProperty(Lr, "__esModule", { value: !0 });
    Lr.XElement = void 0;
    Lr.parseXml = D0;
    var N0 = Fl(),
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
                if (!P0(t)) throw (0, Un.newError)("Invalid element name: ".concat(t), "ERR_XML_ELEMENT_INVALID_NAME");
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
                for (let n of this.elements) if (ql(n, t, r)) return n;
                return null;
            }
            getElements(t, r = !1) {
                return this.elements === null ? [] : this.elements.filter(n => ql(n, t, r));
            }
            elementValueOrEmpty(t, r = !1) {
                let n = this.elementOrNull(t, r);
                return n === null ? "" : n.value;
            }
        };
    Lr.XElement = $n;
    var R0 = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
    function P0(e) {
        return R0.test(e);
    }
    function ql(e, t, r) {
        let n = e.name;
        return n === t || (r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase());
    }
    function D0(e) {
        let t = null,
            r = N0.parser(!0, {}),
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
var $l = g(kn => {
    "use strict";
    Object.defineProperty(kn, "__esModule", { value: !0 });
    kn.MemoLazy = void 0;
    var To = class {
        constructor(t, r) {
            (this.selector = t), (this.creator = r), (this.selected = void 0), (this._value = void 0);
        }
        get hasValue() {
            return this._value !== void 0;
        }
        get value() {
            let t = this.selector();
            if (this._value !== void 0 && Ul(this.selected, t)) return this._value;
            this.selected = t;
            let r = this.creator(t);
            return (this.value = r), r;
        }
        set value(t) {
            this._value = t;
        }
    };
    kn.MemoLazy = To;
    function Ul(e, t) {
        if (typeof e == "object" && e !== null && typeof t == "object" && t !== null) {
            let i = Object.keys(e),
                o = Object.keys(t);
            return i.length === o.length && i.every(s => Ul(e[s], t[s]));
        }
        return e === t;
    }
});
var Ml = g(bo => {
    "use strict";
    Object.defineProperty(bo, "__esModule", { value: !0 });
    bo.retry = kl;
    var F0 = bn();
    async function kl(e, t, r, n = 0, i = 0, o) {
        var s;
        let a = new F0.CancellationToken();
        try {
            return await e();
        } catch (l) {
            if ((!((s = o?.(l)) !== null && s !== void 0) || s) && t > 0 && !a.cancelled)
                return await new Promise(d => setTimeout(d, r + n * i)), await kl(e, t - 1, r, n, i + 1, o);
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
    D.asArray = B0;
    var Bl = bn();
    Object.defineProperty(D, "CancellationToken", {
        enumerable: !0,
        get: function () {
            return Bl.CancellationToken;
        }
    });
    Object.defineProperty(D, "CancellationError", {
        enumerable: !0,
        get: function () {
            return Bl.CancellationError;
        }
    });
    var We = Tl();
    Object.defineProperty(D, "HttpError", {
        enumerable: !0,
        get: function () {
            return We.HttpError;
        }
    });
    Object.defineProperty(D, "createHttpError", {
        enumerable: !0,
        get: function () {
            return We.createHttpError;
        }
    });
    Object.defineProperty(D, "HttpExecutor", {
        enumerable: !0,
        get: function () {
            return We.HttpExecutor;
        }
    });
    Object.defineProperty(D, "DigestTransform", {
        enumerable: !0,
        get: function () {
            return We.DigestTransform;
        }
    });
    Object.defineProperty(D, "safeGetHeader", {
        enumerable: !0,
        get: function () {
            return We.safeGetHeader;
        }
    });
    Object.defineProperty(D, "configureRequestOptions", {
        enumerable: !0,
        get: function () {
            return We.configureRequestOptions;
        }
    });
    Object.defineProperty(D, "configureRequestOptionsFromUrl", {
        enumerable: !0,
        get: function () {
            return We.configureRequestOptionsFromUrl;
        }
    });
    Object.defineProperty(D, "safeStringifyJson", {
        enumerable: !0,
        get: function () {
            return We.safeStringifyJson;
        }
    });
    Object.defineProperty(D, "parseJson", {
        enumerable: !0,
        get: function () {
            return We.parseJson;
        }
    });
    Object.defineProperty(D, "configureRequestUrl", {
        enumerable: !0,
        get: function () {
            return We.configureRequestUrl;
        }
    });
    var Hl = Ol();
    Object.defineProperty(D, "getS3LikeProviderBaseUrl", {
        enumerable: !0,
        get: function () {
            return Hl.getS3LikeProviderBaseUrl;
        }
    });
    Object.defineProperty(D, "githubUrl", {
        enumerable: !0,
        get: function () {
            return Hl.githubUrl;
        }
    });
    var q0 = xl();
    Object.defineProperty(D, "parseDn", {
        enumerable: !0,
        get: function () {
            return q0.parseDn;
        }
    });
    var L0 = Dl();
    Object.defineProperty(D, "UUID", {
        enumerable: !0,
        get: function () {
            return L0.UUID;
        }
    });
    var U0 = _o();
    Object.defineProperty(D, "ProgressCallbackTransform", {
        enumerable: !0,
        get: function () {
            return U0.ProgressCallbackTransform;
        }
    });
    var jl = Ll();
    Object.defineProperty(D, "parseXml", {
        enumerable: !0,
        get: function () {
            return jl.parseXml;
        }
    });
    Object.defineProperty(D, "XElement", {
        enumerable: !0,
        get: function () {
            return jl.XElement;
        }
    });
    var $0 = Rr();
    Object.defineProperty(D, "newError", {
        enumerable: !0,
        get: function () {
            return $0.newError;
        }
    });
    var k0 = $l();
    Object.defineProperty(D, "MemoLazy", {
        enumerable: !0,
        get: function () {
            return k0.MemoLazy;
        }
    });
    var M0 = Ml();
    Object.defineProperty(D, "retry", {
        enumerable: !0,
        get: function () {
            return M0.retry;
        }
    });
    D.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe";
    D.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function B0(e) {
        return e == null ? [] : Array.isArray(e) ? e : [e];
    }
});
var xe = g(Oo => {
    "use strict";
    Oo.fromCallback = function (e) {
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
    Oo.fromPromise = function (e) {
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
var Gl = g((Px, Wl) => {
    var st = require("constants"),
        H0 = process.cwd,
        Mn = null,
        j0 = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function () {
        return Mn || (Mn = H0.call(process)), Mn;
    };
    try {
        process.cwd();
    } catch {}
    typeof process.chdir == "function" &&
        ((xo = process.chdir),
        (process.chdir = function (e) {
            (Mn = null), xo.call(process, e);
        }),
        Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, xo));
    var xo;
    Wl.exports = W0;
    function W0(e) {
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
            j0 === "win32" &&
                (e.rename =
                    typeof e.rename != "function"
                        ? e.rename
                        : (function (c) {
                              function f(m, p, E) {
                                  var _ = Date.now(),
                                      A = 0;
                                  c(m, p, function T(S) {
                                      if (
                                          S &&
                                          (S.code === "EACCES" || S.code === "EPERM" || S.code === "EBUSY") &&
                                          Date.now() - _ < 6e4
                                      ) {
                                          setTimeout(function () {
                                              e.stat(p, function (N, L) {
                                                  N && N.code === "ENOENT" ? c(m, p, T) : E(S);
                                              });
                                          }, A),
                                              A < 100 && (A += 10);
                                          return;
                                      }
                                      E && E(S);
                                  });
                              }
                              return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
                          })(e.rename)),
            (e.read =
                typeof e.read != "function"
                    ? e.read
                    : (function (c) {
                          function f(m, p, E, _, A, T) {
                              var S;
                              if (T && typeof T == "function") {
                                  var N = 0;
                                  S = function (L, Fe, Y) {
                                      if (L && L.code === "EAGAIN" && N < 10) return N++, c.call(e, m, p, E, _, A, S);
                                      T.apply(this, arguments);
                                  };
                              }
                              return c.call(e, m, p, E, _, A, S);
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
                              c.close(A, function (S) {
                                  E && E(T || S);
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
var zl = g((Dx, Yl) => {
    var Vl = require("stream").Stream;
    Yl.exports = G0;
    function G0(e) {
        return { ReadStream: t, WriteStream: r };
        function t(n, i) {
            if (!(this instanceof t)) return new t(n, i);
            Vl.call(this);
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
            Vl.call(this),
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
var Jl = g((Fx, Xl) => {
    "use strict";
    Xl.exports = Y0;
    var V0 =
        Object.getPrototypeOf ||
        function (e) {
            return e.__proto__;
        };
    function Y0(e) {
        if (e === null || typeof e != "object") return e;
        if (e instanceof Object) var t = { __proto__: V0(e) };
        else var t = Object.create(null);
        return (
            Object.getOwnPropertyNames(e).forEach(function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
            }),
            t
        );
    }
});
var _e = g((qx, Ro) => {
    var Z = require("fs"),
        z0 = Gl(),
        X0 = zl(),
        J0 = Jl(),
        Bn = require("util"),
        de,
        jn;
    typeof Symbol == "function" && typeof Symbol.for == "function"
        ? ((de = Symbol.for("graceful-fs.queue")), (jn = Symbol.for("graceful-fs.previous")))
        : ((de = "___graceful-fs.queue"), (jn = "___graceful-fs.previous"));
    function K0() {}
    function Zl(e, t) {
        Object.defineProperty(e, de, {
            get: function () {
                return t;
            }
        });
    }
    var bt = K0;
    Bn.debuglog
        ? (bt = Bn.debuglog("gfs4"))
        : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
          (bt = function () {
              var e = Bn.format.apply(Bn, arguments);
              (e = "GFS4: " + e.split(/\n/).join("\nGFS4: ")), console.error(e);
          });
    Z[de] ||
        ((Kl = global[de] || []),
        Zl(Z, Kl),
        (Z.close = (function (e) {
            function t(r, n) {
                return e.call(Z, r, function (i) {
                    i || Ql(), typeof n == "function" && n.apply(this, arguments);
                });
            }
            return Object.defineProperty(t, jn, { value: e }), t;
        })(Z.close)),
        (Z.closeSync = (function (e) {
            function t(r) {
                e.apply(Z, arguments), Ql();
            }
            return Object.defineProperty(t, jn, { value: e }), t;
        })(Z.closeSync)),
        /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
            process.on("exit", function () {
                bt(Z[de]), require("assert").equal(Z[de].length, 0);
            }));
    var Kl;
    global[de] || Zl(global, Z[de]);
    Ro.exports = Io(J0(Z));
    process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !Z.__patched && ((Ro.exports = Io(Z)), (Z.__patched = !0));
    function Io(e) {
        z0(e), (e.gracefulify = Io), (e.createReadStream = Fe), (e.createWriteStream = Y);
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
            var m = X0(e);
            (T = m.ReadStream), (N = m.WriteStream);
        }
        var p = e.ReadStream;
        p && ((T.prototype = Object.create(p.prototype)), (T.prototype.open = S));
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
        function S() {
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
        function Fe(P, U) {
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
        bt("ENQUEUE", e[0].name, e[1]), Z[de].push(e), No();
    }
    var Hn;
    function Ql() {
        for (var e = Date.now(), t = 0; t < Z[de].length; ++t) Z[de][t].length > 2 && ((Z[de][t][3] = e), (Z[de][t][4] = e));
        No();
    }
    function No() {
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
            Hn === void 0 && (Hn = setTimeout(No, 0));
        }
    }
});
var Ot = g(at => {
    "use strict";
    var eu = xe().fromCallback,
        Ie = _e(),
        Q0 = [
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
    Q0.forEach(e => {
        at[e] = eu(Ie[e]);
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
        ? (at.realpath.native = eu(Ie.realpath.native))
        : process.emitWarning(
              "fs.realpath.native is not a function. Is fs being monkey-patched?",
              "Warning",
              "fs-extra-WARN0003"
          );
});
var ru = g((Ux, tu) => {
    "use strict";
    var Z0 = require("path");
    tu.exports.checkPath = function (t) {
        if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(Z0.parse(t).root, ""))) {
            let n = new Error("Path contains invalid characters: ".concat(t));
            throw ((n.code = "EINVAL"), n);
        }
    };
});
var su = g(($x, Po) => {
    "use strict";
    var nu = Ot(),
        { checkPath: iu } = ru(),
        ou = e => {
            let t = { mode: 511 };
            return typeof e == "number" ? e : { ...t, ...e }.mode;
        };
    Po.exports.makeDir = async (e, t) => (iu(e), nu.mkdir(e, { mode: ou(t), recursive: !0 }));
    Po.exports.makeDirSync = (e, t) => (iu(e), nu.mkdirSync(e, { mode: ou(t), recursive: !0 }));
});
var Be = g((kx, au) => {
    "use strict";
    var ew = xe().fromPromise,
        { makeDir: tw, makeDirSync: Do } = su(),
        Fo = ew(tw);
    au.exports = { mkdirs: Fo, mkdirsSync: Do, mkdirp: Fo, mkdirpSync: Do, ensureDir: Fo, ensureDirSync: Do };
});
var lt = g((Mx, uu) => {
    "use strict";
    var rw = xe().fromPromise,
        lu = Ot();
    function nw(e) {
        return lu
            .access(e)
            .then(() => !0)
            .catch(() => !1);
    }
    uu.exports = { pathExists: rw(nw), pathExistsSync: lu.existsSync };
});
var qo = g((Bx, cu) => {
    "use strict";
    var Zt = _e();
    function iw(e, t, r, n) {
        Zt.open(e, "r+", (i, o) => {
            if (i) return n(i);
            Zt.futimes(o, t, r, s => {
                Zt.close(o, a => {
                    n && n(s || a);
                });
            });
        });
    }
    function ow(e, t, r) {
        let n = Zt.openSync(e, "r+");
        return Zt.futimesSync(n, t, r), Zt.closeSync(n);
    }
    cu.exports = { utimesMillis: iw, utimesMillisSync: ow };
});
var xt = g((Hx, du) => {
    "use strict";
    var er = Ot(),
        ce = require("path"),
        sw = require("util");
    function aw(e, t, r) {
        let n = r.dereference ? i => er.stat(i, { bigint: !0 }) : i => er.lstat(i, { bigint: !0 });
        return Promise.all([
            n(e),
            n(t).catch(i => {
                if (i.code === "ENOENT") return null;
                throw i;
            })
        ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
    }
    function lw(e, t, r) {
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
    function uw(e, t, r, n, i) {
        sw.callbackify(aw)(e, t, n, (o, s) => {
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
            return a.isDirectory() && Lo(e, t) ? i(new Error(Wn(e, t, r))) : i(null, { srcStat: a, destStat: l });
        });
    }
    function cw(e, t, r, n) {
        let { srcStat: i, destStat: o } = lw(e, t, n);
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
        if (i.isDirectory() && Lo(e, t)) throw new Error(Wn(e, t, r));
        return { srcStat: i, destStat: o };
    }
    function fu(e, t, r, n, i) {
        let o = ce.resolve(ce.dirname(e)),
            s = ce.resolve(ce.dirname(r));
        if (s === o || s === ce.parse(s).root) return i();
        er.stat(s, { bigint: !0 }, (a, l) =>
            a ? (a.code === "ENOENT" ? i() : i(a)) : Ur(t, l) ? i(new Error(Wn(e, r, n))) : fu(e, t, s, n, i)
        );
    }
    function hu(e, t, r, n) {
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
        return hu(e, t, o, n);
    }
    function Ur(e, t) {
        return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
    }
    function Lo(e, t) {
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
    du.exports = {
        checkPaths: uw,
        checkPathsSync: cw,
        checkParentPaths: fu,
        checkParentPathsSync: hu,
        isSrcSubdir: Lo,
        areIdentical: Ur
    };
});
var vu = g((jx, _u) => {
    "use strict";
    var Ne = _e(),
        $r = require("path"),
        fw = Be().mkdirs,
        hw = lt().pathExists,
        dw = qo().utimesMillis,
        kr = xt();
    function pw(e, t, r, n) {
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
                kr.checkParentPaths(e, s, t, "copy", l => (l ? n(l) : r.filter ? gu(pu, a, e, t, r, n) : pu(a, e, t, r, n)));
            });
    }
    function pu(e, t, r, n, i) {
        let o = $r.dirname(r);
        hw(o, (s, a) => {
            if (s) return i(s);
            if (a) return Gn(e, t, r, n, i);
            fw(o, l => (l ? i(l) : Gn(e, t, r, n, i)));
        });
    }
    function gu(e, t, r, n, i, o) {
        Promise.resolve(i.filter(r, n)).then(
            s => (s ? e(t, r, n, i, o) : o()),
            s => o(s)
        );
    }
    function mw(e, t, r, n, i) {
        return n.filter ? gu(Gn, e, t, r, n, i) : Gn(e, t, r, n, i);
    }
    function Gn(e, t, r, n, i) {
        (n.dereference ? Ne.stat : Ne.lstat)(t, (s, a) =>
            s
                ? i(s)
                : a.isDirectory()
                ? Aw(a, e, t, r, n, i)
                : a.isFile() || a.isCharacterDevice() || a.isBlockDevice()
                ? gw(a, e, t, r, n, i)
                : a.isSymbolicLink()
                ? Tw(e, t, r, n, i)
                : a.isSocket()
                ? i(new Error("Cannot copy a socket file: ".concat(t)))
                : a.isFIFO()
                ? i(new Error("Cannot copy a FIFO pipe: ".concat(t)))
                : i(new Error("Unknown file: ".concat(t)))
        );
    }
    function gw(e, t, r, n, i, o) {
        return t ? ww(e, r, n, i, o) : wu(e, r, n, i, o);
    }
    function ww(e, t, r, n, i) {
        if (n.overwrite) Ne.unlink(r, o => (o ? i(o) : wu(e, t, r, n, i)));
        else return n.errorOnExist ? i(new Error("'".concat(r, "' already exists"))) : i();
    }
    function wu(e, t, r, n, i) {
        Ne.copyFile(t, r, o => (o ? i(o) : n.preserveTimestamps ? yw(e.mode, t, r, i) : Vn(r, e.mode, i)));
    }
    function yw(e, t, r, n) {
        return Ew(e) ? _w(r, e, i => (i ? n(i) : mu(e, t, r, n))) : mu(e, t, r, n);
    }
    function Ew(e) {
        return (e & 128) === 0;
    }
    function _w(e, t, r) {
        return Vn(e, t | 128, r);
    }
    function mu(e, t, r, n) {
        vw(t, r, i => (i ? n(i) : Vn(r, e, n)));
    }
    function Vn(e, t, r) {
        return Ne.chmod(e, t, r);
    }
    function vw(e, t, r) {
        Ne.stat(e, (n, i) => (n ? r(n) : dw(t, i.atime, i.mtime, r)));
    }
    function Aw(e, t, r, n, i, o) {
        return t ? yu(r, n, i, o) : Cw(e.mode, r, n, i, o);
    }
    function Cw(e, t, r, n, i) {
        Ne.mkdir(r, o => {
            if (o) return i(o);
            yu(t, r, n, s => (s ? i(s) : Vn(r, e, i)));
        });
    }
    function yu(e, t, r, n) {
        Ne.readdir(e, (i, o) => (i ? n(i) : Eu(o, e, t, r, n)));
    }
    function Eu(e, t, r, n, i) {
        let o = e.pop();
        return o ? Sw(e, o, t, r, n, i) : i();
    }
    function Sw(e, t, r, n, i, o) {
        let s = $r.join(r, t),
            a = $r.join(n, t);
        kr.checkPaths(s, a, "copy", i, (l, d) => {
            if (l) return o(l);
            let { destStat: c } = d;
            mw(c, s, a, i, f => (f ? o(f) : Eu(e, r, n, i, o)));
        });
    }
    function Tw(e, t, r, n, i) {
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
                              : bw(s, r, i))
                );
            else return Ne.symlink(s, r, i);
        });
    }
    function bw(e, t, r) {
        Ne.unlink(t, n => (n ? r(n) : Ne.symlink(e, t, r)));
    }
    _u.exports = pw;
});
var bu = g((Wx, Tu) => {
    "use strict";
    var pe = _e(),
        Mr = require("path"),
        Ow = Be().mkdirsSync,
        xw = qo().utimesMillisSync,
        Br = xt();
    function Iw(e, t, r) {
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
        return Br.checkParentPathsSync(e, n, t, "copy"), Nw(i, e, t, r);
    }
    function Nw(e, t, r, n) {
        if (n.filter && !n.filter(t, r)) return;
        let i = Mr.dirname(r);
        return pe.existsSync(i) || Ow(i), Au(e, t, r, n);
    }
    function Rw(e, t, r, n) {
        if (!(n.filter && !n.filter(t, r))) return Au(e, t, r, n);
    }
    function Au(e, t, r, n) {
        let o = (n.dereference ? pe.statSync : pe.lstatSync)(t);
        if (o.isDirectory()) return $w(o, e, t, r, n);
        if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return Pw(o, e, t, r, n);
        if (o.isSymbolicLink()) return Bw(e, t, r, n);
        throw o.isSocket()
            ? new Error("Cannot copy a socket file: ".concat(t))
            : o.isFIFO()
            ? new Error("Cannot copy a FIFO pipe: ".concat(t))
            : new Error("Unknown file: ".concat(t));
    }
    function Pw(e, t, r, n, i) {
        return t ? Dw(e, r, n, i) : Cu(e, r, n, i);
    }
    function Dw(e, t, r, n) {
        if (n.overwrite) return pe.unlinkSync(r), Cu(e, t, r, n);
        if (n.errorOnExist) throw new Error("'".concat(r, "' already exists"));
    }
    function Cu(e, t, r, n) {
        return pe.copyFileSync(t, r), n.preserveTimestamps && Fw(e.mode, t, r), Uo(r, e.mode);
    }
    function Fw(e, t, r) {
        return qw(e) && Lw(r, e), Uw(t, r);
    }
    function qw(e) {
        return (e & 128) === 0;
    }
    function Lw(e, t) {
        return Uo(e, t | 128);
    }
    function Uo(e, t) {
        return pe.chmodSync(e, t);
    }
    function Uw(e, t) {
        let r = pe.statSync(e);
        return xw(t, r.atime, r.mtime);
    }
    function $w(e, t, r, n, i) {
        return t ? Su(r, n, i) : kw(e.mode, r, n, i);
    }
    function kw(e, t, r, n) {
        return pe.mkdirSync(r), Su(t, r, n), Uo(r, e);
    }
    function Su(e, t, r) {
        pe.readdirSync(e).forEach(n => Mw(n, e, t, r));
    }
    function Mw(e, t, r, n) {
        let i = Mr.join(t, e),
            o = Mr.join(r, e),
            { destStat: s } = Br.checkPathsSync(i, o, "copy", n);
        return Rw(s, i, o, n);
    }
    function Bw(e, t, r, n) {
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
            return Hw(i, r);
        } else return pe.symlinkSync(i, r);
    }
    function Hw(e, t) {
        return pe.unlinkSync(t), pe.symlinkSync(e, t);
    }
    Tu.exports = Iw;
});
var Yn = g((Gx, Ou) => {
    "use strict";
    var jw = xe().fromCallback;
    Ou.exports = { copy: jw(vu()), copySync: bu() };
});
var Lu = g((Vx, qu) => {
    "use strict";
    var xu = _e(),
        Pu = require("path"),
        W = require("assert"),
        Hr = process.platform === "win32";
    function Du(e) {
        ["unlink", "chmod", "stat", "lstat", "rmdir", "readdir"].forEach(r => {
            (e[r] = e[r] || xu[r]), (r = r + "Sync"), (e[r] = e[r] || xu[r]);
        }),
            (e.maxBusyTries = e.maxBusyTries || 3);
    }
    function $o(e, t, r) {
        let n = 0;
        typeof t == "function" && ((r = t), (t = {})),
            W(e, "rimraf: missing path"),
            W.strictEqual(typeof e, "string", "rimraf: path should be a string"),
            W.strictEqual(typeof r, "function", "rimraf: callback function required"),
            W(t, "rimraf: invalid options argument provided"),
            W.strictEqual(typeof t, "object", "rimraf: options should be object"),
            Du(t),
            Iu(e, t, function i(o) {
                if (o) {
                    if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && n < t.maxBusyTries) {
                        n++;
                        let s = n * 100;
                        return setTimeout(() => Iu(e, t, i), s);
                    }
                    o.code === "ENOENT" && (o = null);
                }
                r(o);
            });
    }
    function Iu(e, t, r) {
        W(e),
            W(t),
            W(typeof r == "function"),
            t.lstat(e, (n, i) => {
                if (n && n.code === "ENOENT") return r(null);
                if (n && n.code === "EPERM" && Hr) return Nu(e, t, n, r);
                if (i && i.isDirectory()) return zn(e, t, n, r);
                t.unlink(e, o => {
                    if (o) {
                        if (o.code === "ENOENT") return r(null);
                        if (o.code === "EPERM") return Hr ? Nu(e, t, o, r) : zn(e, t, o, r);
                        if (o.code === "EISDIR") return zn(e, t, o, r);
                    }
                    return r(o);
                });
            });
    }
    function Nu(e, t, r, n) {
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
    function Ru(e, t, r) {
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
                    ? Ww(e, t, n)
                    : i && i.code === "ENOTDIR"
                    ? n(r)
                    : n(i);
            });
    }
    function Ww(e, t, r) {
        W(e),
            W(t),
            W(typeof r == "function"),
            t.readdir(e, (n, i) => {
                if (n) return r(n);
                let o = i.length,
                    s;
                if (o === 0) return t.rmdir(e, r);
                i.forEach(a => {
                    $o(Pu.join(e, a), t, l => {
                        if (!s) {
                            if (l) return r((s = l));
                            --o === 0 && t.rmdir(e, r);
                        }
                    });
                });
            });
    }
    function Fu(e, t) {
        let r;
        (t = t || {}),
            Du(t),
            W(e, "rimraf: missing path"),
            W.strictEqual(typeof e, "string", "rimraf: path should be a string"),
            W(t, "rimraf: missing options"),
            W.strictEqual(typeof t, "object", "rimraf: options should be object");
        try {
            r = t.lstatSync(e);
        } catch (n) {
            if (n.code === "ENOENT") return;
            n.code === "EPERM" && Hr && Ru(e, t, n);
        }
        try {
            r && r.isDirectory() ? Xn(e, t, null) : t.unlinkSync(e);
        } catch (n) {
            if (n.code === "ENOENT") return;
            if (n.code === "EPERM") return Hr ? Ru(e, t, n) : Xn(e, t, n);
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
            if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM") Gw(e, t);
            else if (n.code !== "ENOENT") throw n;
        }
    }
    function Gw(e, t) {
        if ((W(e), W(t), t.readdirSync(e).forEach(r => Fu(Pu.join(e, r), t)), Hr)) {
            let r = Date.now();
            do
                try {
                    return t.rmdirSync(e, t);
                } catch {}
            while (Date.now() - r < 500);
        } else return t.rmdirSync(e, t);
    }
    qu.exports = $o;
    $o.sync = Fu;
});
var jr = g((Yx, $u) => {
    "use strict";
    var Jn = _e(),
        Vw = xe().fromCallback,
        Uu = Lu();
    function Yw(e, t) {
        if (Jn.rm) return Jn.rm(e, { recursive: !0, force: !0 }, t);
        Uu(e, t);
    }
    function zw(e) {
        if (Jn.rmSync) return Jn.rmSync(e, { recursive: !0, force: !0 });
        Uu.sync(e);
    }
    $u.exports = { remove: Vw(Yw), removeSync: zw };
});
var Vu = g((zx, Gu) => {
    "use strict";
    var Xw = xe().fromPromise,
        Bu = Ot(),
        Hu = require("path"),
        ju = Be(),
        Wu = jr(),
        ku = Xw(async function (t) {
            let r;
            try {
                r = await Bu.readdir(t);
            } catch {
                return ju.mkdirs(t);
            }
            return Promise.all(r.map(n => Wu.remove(Hu.join(t, n))));
        });
    function Mu(e) {
        let t;
        try {
            t = Bu.readdirSync(e);
        } catch {
            return ju.mkdirsSync(e);
        }
        t.forEach(r => {
            (r = Hu.join(e, r)), Wu.removeSync(r);
        });
    }
    Gu.exports = { emptyDirSync: Mu, emptydirSync: Mu, emptyDir: ku, emptydir: ku };
});
var Ju = g((Xx, Xu) => {
    "use strict";
    var Jw = xe().fromCallback,
        Yu = require("path"),
        ut = _e(),
        zu = Be();
    function Kw(e, t) {
        function r() {
            ut.writeFile(e, "", n => {
                if (n) return t(n);
                t();
            });
        }
        ut.stat(e, (n, i) => {
            if (!n && i.isFile()) return t();
            let o = Yu.dirname(e);
            ut.stat(o, (s, a) => {
                if (s)
                    return s.code === "ENOENT"
                        ? zu.mkdirs(o, l => {
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
    function Qw(e) {
        let t;
        try {
            t = ut.statSync(e);
        } catch {}
        if (t && t.isFile()) return;
        let r = Yu.dirname(e);
        try {
            ut.statSync(r).isDirectory() || ut.readdirSync(r);
        } catch (n) {
            if (n && n.code === "ENOENT") zu.mkdirsSync(r);
            else throw n;
        }
        ut.writeFileSync(e, "");
    }
    Xu.exports = { createFile: Jw(Kw), createFileSync: Qw };
});
var tc = g((Jx, ec) => {
    "use strict";
    var Zw = xe().fromCallback,
        Ku = require("path"),
        ct = _e(),
        Qu = Be(),
        ey = lt().pathExists,
        { areIdentical: Zu } = xt();
    function ty(e, t, r) {
        function n(i, o) {
            ct.link(i, o, s => {
                if (s) return r(s);
                r(null);
            });
        }
        ct.lstat(t, (i, o) => {
            ct.lstat(e, (s, a) => {
                if (s) return (s.message = s.message.replace("lstat", "ensureLink")), r(s);
                if (o && Zu(a, o)) return r(null);
                let l = Ku.dirname(t);
                ey(l, (d, c) => {
                    if (d) return r(d);
                    if (c) return n(e, t);
                    Qu.mkdirs(l, f => {
                        if (f) return r(f);
                        n(e, t);
                    });
                });
            });
        });
    }
    function ry(e, t) {
        let r;
        try {
            r = ct.lstatSync(t);
        } catch {}
        try {
            let o = ct.lstatSync(e);
            if (r && Zu(o, r)) return;
        } catch (o) {
            throw ((o.message = o.message.replace("lstat", "ensureLink")), o);
        }
        let n = Ku.dirname(t);
        return ct.existsSync(n) || Qu.mkdirsSync(n), ct.linkSync(e, t);
    }
    ec.exports = { createLink: Zw(ty), createLinkSync: ry };
});
var nc = g((Kx, rc) => {
    "use strict";
    var ft = require("path"),
        Wr = _e(),
        ny = lt().pathExists;
    function iy(e, t, r) {
        if (ft.isAbsolute(e))
            return Wr.lstat(e, n =>
                n ? ((n.message = n.message.replace("lstat", "ensureSymlink")), r(n)) : r(null, { toCwd: e, toDst: e })
            );
        {
            let n = ft.dirname(t),
                i = ft.join(n, e);
            return ny(i, (o, s) =>
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
    function oy(e, t) {
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
    rc.exports = { symlinkPaths: iy, symlinkPathsSync: oy };
});
var sc = g((Qx, oc) => {
    "use strict";
    var ic = _e();
    function sy(e, t, r) {
        if (((r = typeof t == "function" ? t : r), (t = typeof t == "function" ? !1 : t), t)) return r(null, t);
        ic.lstat(e, (n, i) => {
            if (n) return r(null, "file");
            (t = i && i.isDirectory() ? "dir" : "file"), r(null, t);
        });
    }
    function ay(e, t) {
        let r;
        if (t) return t;
        try {
            r = ic.lstatSync(e);
        } catch {
            return "file";
        }
        return r && r.isDirectory() ? "dir" : "file";
    }
    oc.exports = { symlinkType: sy, symlinkTypeSync: ay };
});
var pc = g((Zx, dc) => {
    "use strict";
    var ly = xe().fromCallback,
        lc = require("path"),
        He = Ot(),
        uc = Be(),
        uy = uc.mkdirs,
        cy = uc.mkdirsSync,
        cc = nc(),
        fy = cc.symlinkPaths,
        hy = cc.symlinkPathsSync,
        fc = sc(),
        dy = fc.symlinkType,
        py = fc.symlinkTypeSync,
        my = lt().pathExists,
        { areIdentical: hc } = xt();
    function gy(e, t, r, n) {
        (n = typeof r == "function" ? r : n),
            (r = typeof r == "function" ? !1 : r),
            He.lstat(t, (i, o) => {
                !i && o.isSymbolicLink()
                    ? Promise.all([He.stat(e), He.stat(t)]).then(([s, a]) => {
                          if (hc(s, a)) return n(null);
                          ac(e, t, r, n);
                      })
                    : ac(e, t, r, n);
            });
    }
    function ac(e, t, r, n) {
        fy(e, t, (i, o) => {
            if (i) return n(i);
            (e = o.toDst),
                dy(o.toCwd, r, (s, a) => {
                    if (s) return n(s);
                    let l = lc.dirname(t);
                    my(l, (d, c) => {
                        if (d) return n(d);
                        if (c) return He.symlink(e, t, a, n);
                        uy(l, f => {
                            if (f) return n(f);
                            He.symlink(e, t, a, n);
                        });
                    });
                });
        });
    }
    function wy(e, t, r) {
        let n;
        try {
            n = He.lstatSync(t);
        } catch {}
        if (n && n.isSymbolicLink()) {
            let a = He.statSync(e),
                l = He.statSync(t);
            if (hc(a, l)) return;
        }
        let i = hy(e, t);
        (e = i.toDst), (r = py(i.toCwd, r));
        let o = lc.dirname(t);
        return He.existsSync(o) || cy(o), He.symlinkSync(e, t, r);
    }
    dc.exports = { createSymlink: ly(gy), createSymlinkSync: wy };
});
var Ac = g((eI, vc) => {
    "use strict";
    var { createFile: mc, createFileSync: gc } = Ju(),
        { createLink: wc, createLinkSync: yc } = tc(),
        { createSymlink: Ec, createSymlinkSync: _c } = pc();
    vc.exports = {
        createFile: mc,
        createFileSync: gc,
        ensureFile: mc,
        ensureFileSync: gc,
        createLink: wc,
        createLinkSync: yc,
        ensureLink: wc,
        ensureLinkSync: yc,
        createSymlink: Ec,
        createSymlinkSync: _c,
        ensureSymlink: Ec,
        ensureSymlinkSync: _c
    };
});
var Kn = g((tI, Cc) => {
    function yy(e, { EOL: t = "\n", finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
        let o = r ? t : "";
        return JSON.stringify(e, n, i).replace(/\n/g, t) + o;
    }
    function Ey(e) {
        return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
    }
    Cc.exports = { stringify: yy, stripBom: Ey };
});
var Oc = g((rI, bc) => {
    var tr;
    try {
        tr = _e();
    } catch {
        tr = require("fs");
    }
    var Qn = xe(),
        { stringify: Sc, stripBom: Tc } = Kn();
    async function _y(e, t = {}) {
        typeof t == "string" && (t = { encoding: t });
        let r = t.fs || tr,
            n = "throws" in t ? t.throws : !0,
            i = await Qn.fromCallback(r.readFile)(e, t);
        i = Tc(i);
        let o;
        try {
            o = JSON.parse(i, t ? t.reviver : null);
        } catch (s) {
            if (n) throw ((s.message = "".concat(e, ": ").concat(s.message)), s);
            return null;
        }
        return o;
    }
    var vy = Qn.fromPromise(_y);
    function Ay(e, t = {}) {
        typeof t == "string" && (t = { encoding: t });
        let r = t.fs || tr,
            n = "throws" in t ? t.throws : !0;
        try {
            let i = r.readFileSync(e, t);
            return (i = Tc(i)), JSON.parse(i, t.reviver);
        } catch (i) {
            if (n) throw ((i.message = "".concat(e, ": ").concat(i.message)), i);
            return null;
        }
    }
    async function Cy(e, t, r = {}) {
        let n = r.fs || tr,
            i = Sc(t, r);
        await Qn.fromCallback(n.writeFile)(e, i, r);
    }
    var Sy = Qn.fromPromise(Cy);
    function Ty(e, t, r = {}) {
        let n = r.fs || tr,
            i = Sc(t, r);
        return n.writeFileSync(e, i, r);
    }
    var by = { readFile: vy, readFileSync: Ay, writeFile: Sy, writeFileSync: Ty };
    bc.exports = by;
});
var Ic = g((nI, xc) => {
    "use strict";
    var Zn = Oc();
    xc.exports = {
        readJson: Zn.readFile,
        readJsonSync: Zn.readFileSync,
        writeJson: Zn.writeFile,
        writeJsonSync: Zn.writeFileSync
    };
});
var ei = g((iI, Pc) => {
    "use strict";
    var Oy = xe().fromCallback,
        Gr = _e(),
        Nc = require("path"),
        Rc = Be(),
        xy = lt().pathExists;
    function Iy(e, t, r, n) {
        typeof r == "function" && ((n = r), (r = "utf8"));
        let i = Nc.dirname(e);
        xy(i, (o, s) => {
            if (o) return n(o);
            if (s) return Gr.writeFile(e, t, r, n);
            Rc.mkdirs(i, a => {
                if (a) return n(a);
                Gr.writeFile(e, t, r, n);
            });
        });
    }
    function Ny(e, ...t) {
        let r = Nc.dirname(e);
        if (Gr.existsSync(r)) return Gr.writeFileSync(e, ...t);
        Rc.mkdirsSync(r), Gr.writeFileSync(e, ...t);
    }
    Pc.exports = { outputFile: Oy(Iy), outputFileSync: Ny };
});
var Fc = g((oI, Dc) => {
    "use strict";
    var { stringify: Ry } = Kn(),
        { outputFile: Py } = ei();
    async function Dy(e, t, r = {}) {
        let n = Ry(t, r);
        await Py(e, n, r);
    }
    Dc.exports = Dy;
});
var Lc = g((sI, qc) => {
    "use strict";
    var { stringify: Fy } = Kn(),
        { outputFileSync: qy } = ei();
    function Ly(e, t, r) {
        let n = Fy(t, r);
        qy(e, n, r);
    }
    qc.exports = Ly;
});
var $c = g((aI, Uc) => {
    "use strict";
    var Uy = xe().fromPromise,
        ve = Ic();
    ve.outputJson = Uy(Fc());
    ve.outputJsonSync = Lc();
    ve.outputJSON = ve.outputJson;
    ve.outputJSONSync = ve.outputJsonSync;
    ve.writeJSON = ve.writeJson;
    ve.writeJSONSync = ve.writeJsonSync;
    ve.readJSON = ve.readJson;
    ve.readJSONSync = ve.readJsonSync;
    Uc.exports = ve;
});
var jc = g((lI, Hc) => {
    "use strict";
    var $y = _e(),
        Mo = require("path"),
        ky = Yn().copy,
        Bc = jr().remove,
        My = Be().mkdirp,
        By = lt().pathExists,
        kc = xt();
    function Hy(e, t, r, n) {
        typeof r == "function" && ((n = r), (r = {})), (r = r || {});
        let i = r.overwrite || r.clobber || !1;
        kc.checkPaths(e, t, "move", r, (o, s) => {
            if (o) return n(o);
            let { srcStat: a, isChangingCase: l = !1 } = s;
            kc.checkParentPaths(e, a, t, "move", d => {
                if (d) return n(d);
                if (jy(t)) return Mc(e, t, i, l, n);
                My(Mo.dirname(t), c => (c ? n(c) : Mc(e, t, i, l, n)));
            });
        });
    }
    function jy(e) {
        let t = Mo.dirname(e);
        return Mo.parse(t).root === t;
    }
    function Mc(e, t, r, n, i) {
        if (n) return ko(e, t, r, i);
        if (r) return Bc(t, o => (o ? i(o) : ko(e, t, r, i)));
        By(t, (o, s) => (o ? i(o) : s ? i(new Error("dest already exists.")) : ko(e, t, r, i)));
    }
    function ko(e, t, r, n) {
        $y.rename(e, t, i => (i ? (i.code !== "EXDEV" ? n(i) : Wy(e, t, r, n)) : n()));
    }
    function Wy(e, t, r, n) {
        ky(e, t, { overwrite: r, errorOnExist: !0 }, o => (o ? n(o) : Bc(e, n)));
    }
    Hc.exports = Hy;
});
var zc = g((uI, Yc) => {
    "use strict";
    var Gc = _e(),
        Ho = require("path"),
        Gy = Yn().copySync,
        Vc = jr().removeSync,
        Vy = Be().mkdirpSync,
        Wc = xt();
    function Yy(e, t, r) {
        r = r || {};
        let n = r.overwrite || r.clobber || !1,
            { srcStat: i, isChangingCase: o = !1 } = Wc.checkPathsSync(e, t, "move", r);
        return Wc.checkParentPathsSync(e, i, t, "move"), zy(t) || Vy(Ho.dirname(t)), Xy(e, t, n, o);
    }
    function zy(e) {
        let t = Ho.dirname(e);
        return Ho.parse(t).root === t;
    }
    function Xy(e, t, r, n) {
        if (n) return Bo(e, t, r);
        if (r) return Vc(t), Bo(e, t, r);
        if (Gc.existsSync(t)) throw new Error("dest already exists.");
        return Bo(e, t, r);
    }
    function Bo(e, t, r) {
        try {
            Gc.renameSync(e, t);
        } catch (n) {
            if (n.code !== "EXDEV") throw n;
            return Jy(e, t, r);
        }
    }
    function Jy(e, t, r) {
        return Gy(e, t, { overwrite: r, errorOnExist: !0 }), Vc(e);
    }
    Yc.exports = Yy;
});
var Jc = g((cI, Xc) => {
    "use strict";
    var Ky = xe().fromCallback;
    Xc.exports = { move: Ky(jc()), moveSync: zc() };
});
var Ke = g((fI, Kc) => {
    "use strict";
    Kc.exports = { ...Ot(), ...Yn(), ...Vu(), ...Ac(), ...$c(), ...Be(), ...Jc(), ...ei(), ...lt(), ...jr() };
});
var rr = g((hI, It) => {
    "use strict";
    function Qc(e) {
        return typeof e > "u" || e === null;
    }
    function Qy(e) {
        return typeof e == "object" && e !== null;
    }
    function Zy(e) {
        return Array.isArray(e) ? e : Qc(e) ? [] : [e];
    }
    function eE(e, t) {
        var r, n, i, o;
        if (t) for (o = Object.keys(t), r = 0, n = o.length; r < n; r += 1) (i = o[r]), (e[i] = t[i]);
        return e;
    }
    function tE(e, t) {
        var r = "",
            n;
        for (n = 0; n < t; n += 1) r += e;
        return r;
    }
    function rE(e) {
        return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
    }
    It.exports.isNothing = Qc;
    It.exports.isObject = Qy;
    It.exports.toArray = Zy;
    It.exports.repeat = tE;
    It.exports.isNegativeZero = rE;
    It.exports.extend = eE;
});
var nr = g((dI, ef) => {
    "use strict";
    function Zc(e, t) {
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
            (this.message = Zc(this, !1)),
            Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : (this.stack = new Error().stack || "");
    }
    Vr.prototype = Object.create(Error.prototype);
    Vr.prototype.constructor = Vr;
    Vr.prototype.toString = function (t) {
        return this.name + ": " + Zc(this, t);
    };
    ef.exports = Vr;
});
var rf = g((pI, tf) => {
    "use strict";
    var Yr = rr();
    function jo(e, t, r, n, i) {
        var o = "",
            s = "",
            a = Math.floor(i / 2) - 1;
        return (
            n - t > a && ((o = " ... "), (t = n - a + o.length)),
            r - n > a && ((s = " ..."), (r = n + a - s.length)),
            { str: o + e.slice(t, r).replace(/\t/g, "\u2192") + s, pos: n - t + o.length }
        );
    }
    function Wo(e, t) {
        return Yr.repeat(" ", t - e.length) + e;
    }
    function nE(e, t) {
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
            (d = jo(e.buffer, n[s - l], i[s - l], e.position - (n[s] - n[s - l]), f)),
                (a = Yr.repeat(" ", t.indent) + Wo((e.line - l + 1).toString(), c) + " | " + d.str + "\n" + a);
        for (
            d = jo(e.buffer, n[s], i[s], e.position, f),
                a += Yr.repeat(" ", t.indent) + Wo((e.line + 1).toString(), c) + " | " + d.str + "\n",
                a += Yr.repeat("-", t.indent + c + 3 + d.pos) + "^\n",
                l = 1;
            l <= t.linesAfter && !(s + l >= i.length);
            l++
        )
            (d = jo(e.buffer, n[s + l], i[s + l], e.position - (n[s] - n[s + l]), f)),
                (a += Yr.repeat(" ", t.indent) + Wo((e.line + l + 1).toString(), c) + " | " + d.str + "\n");
        return a.replace(/\n$/, "");
    }
    tf.exports = nE;
});
var me = g((mI, of) => {
    "use strict";
    var nf = nr(),
        iE = [
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
        oE = ["scalar", "sequence", "mapping"];
    function sE(e) {
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
    function aE(e, t) {
        if (
            ((t = t || {}),
            Object.keys(t).forEach(function (r) {
                if (iE.indexOf(r) === -1)
                    throw new nf('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
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
            (this.styleAliases = sE(t.styleAliases || null)),
            oE.indexOf(this.kind) === -1)
        )
            throw new nf('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
    }
    of.exports = aE;
});
var Yo = g((gI, af) => {
    "use strict";
    var zr = nr(),
        Go = me();
    function sf(e, t) {
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
    function lE() {
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
    function Vo(e) {
        return this.extend(e);
    }
    Vo.prototype.extend = function (t) {
        var r = [],
            n = [];
        if (t instanceof Go) n.push(t);
        else if (Array.isArray(t)) n = n.concat(t);
        else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
            t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
        else
            throw new zr(
                "Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })"
            );
        r.forEach(function (o) {
            if (!(o instanceof Go))
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
                if (!(o instanceof Go))
                    throw new zr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
            });
        var i = Object.create(Vo.prototype);
        return (
            (i.implicit = (this.implicit || []).concat(r)),
            (i.explicit = (this.explicit || []).concat(n)),
            (i.compiledImplicit = sf(i, "implicit")),
            (i.compiledExplicit = sf(i, "explicit")),
            (i.compiledTypeMap = lE(i.compiledImplicit, i.compiledExplicit)),
            i
        );
    };
    af.exports = Vo;
});
var zo = g((wI, lf) => {
    "use strict";
    var uE = me();
    lf.exports = new uE("tag:yaml.org,2002:str", {
        kind: "scalar",
        construct: function (e) {
            return e !== null ? e : "";
        }
    });
});
var Xo = g((yI, uf) => {
    "use strict";
    var cE = me();
    uf.exports = new cE("tag:yaml.org,2002:seq", {
        kind: "sequence",
        construct: function (e) {
            return e !== null ? e : [];
        }
    });
});
var Jo = g((EI, cf) => {
    "use strict";
    var fE = me();
    cf.exports = new fE("tag:yaml.org,2002:map", {
        kind: "mapping",
        construct: function (e) {
            return e !== null ? e : {};
        }
    });
});
var Ko = g((_I, ff) => {
    "use strict";
    var hE = Yo();
    ff.exports = new hE({ explicit: [zo(), Xo(), Jo()] });
});
var Qo = g((vI, hf) => {
    "use strict";
    var dE = me();
    function pE(e) {
        if (e === null) return !0;
        var t = e.length;
        return (t === 1 && e === "~") || (t === 4 && (e === "null" || e === "Null" || e === "NULL"));
    }
    function mE() {
        return null;
    }
    function gE(e) {
        return e === null;
    }
    hf.exports = new dE("tag:yaml.org,2002:null", {
        kind: "scalar",
        resolve: pE,
        construct: mE,
        predicate: gE,
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
var Zo = g((AI, df) => {
    "use strict";
    var wE = me();
    function yE(e) {
        if (e === null) return !1;
        var t = e.length;
        return (
            (t === 4 && (e === "true" || e === "True" || e === "TRUE")) ||
            (t === 5 && (e === "false" || e === "False" || e === "FALSE"))
        );
    }
    function EE(e) {
        return e === "true" || e === "True" || e === "TRUE";
    }
    function _E(e) {
        return Object.prototype.toString.call(e) === "[object Boolean]";
    }
    df.exports = new wE("tag:yaml.org,2002:bool", {
        kind: "scalar",
        resolve: yE,
        construct: EE,
        predicate: _E,
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
var es = g((CI, pf) => {
    "use strict";
    var vE = rr(),
        AE = me();
    function CE(e) {
        return (48 <= e && e <= 57) || (65 <= e && e <= 70) || (97 <= e && e <= 102);
    }
    function SE(e) {
        return 48 <= e && e <= 55;
    }
    function TE(e) {
        return 48 <= e && e <= 57;
    }
    function bE(e) {
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
                        if (!SE(e.charCodeAt(r))) return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
        }
        if (i === "_") return !1;
        for (; r < t; r++)
            if (((i = e[r]), i !== "_")) {
                if (!TE(e.charCodeAt(r))) return !1;
                n = !0;
            }
        return !(!n || i === "_");
    }
    function OE(e) {
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
    function xE(e) {
        return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !vE.isNegativeZero(e);
    }
    pf.exports = new AE("tag:yaml.org,2002:int", {
        kind: "scalar",
        resolve: bE,
        construct: OE,
        predicate: xE,
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
var ts = g((SI, gf) => {
    "use strict";
    var mf = rr(),
        IE = me(),
        NE = new RegExp(
            "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
        );
    function RE(e) {
        return !(e === null || !NE.test(e) || e[e.length - 1] === "_");
    }
    function PE(e) {
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
    var DE = /^[-+]?[0-9]+e/;
    function FE(e, t) {
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
        else if (mf.isNegativeZero(e)) return "-0.0";
        return (r = e.toString(10)), DE.test(r) ? r.replace("e", ".e") : r;
    }
    function qE(e) {
        return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || mf.isNegativeZero(e));
    }
    gf.exports = new IE("tag:yaml.org,2002:float", {
        kind: "scalar",
        resolve: RE,
        construct: PE,
        predicate: qE,
        represent: FE,
        defaultStyle: "lowercase"
    });
});
var rs = g((TI, wf) => {
    "use strict";
    wf.exports = Ko().extend({ implicit: [Qo(), Zo(), es(), ts()] });
});
var ns = g((bI, yf) => {
    "use strict";
    yf.exports = rs();
});
var is = g((OI, vf) => {
    "use strict";
    var LE = me(),
        Ef = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),
        _f = new RegExp(
            "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
        );
    function UE(e) {
        return e === null ? !1 : Ef.exec(e) !== null || _f.exec(e) !== null;
    }
    function $E(e) {
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
        if (((t = Ef.exec(e)), t === null && (t = _f.exec(e)), t === null)) throw new Error("Date resolve error");
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
    function kE(e) {
        return e.toISOString();
    }
    vf.exports = new LE("tag:yaml.org,2002:timestamp", {
        kind: "scalar",
        resolve: UE,
        construct: $E,
        instanceOf: Date,
        represent: kE
    });
});
var os = g((xI, Af) => {
    "use strict";
    var ME = me();
    function BE(e) {
        return e === "<<" || e === null;
    }
    Af.exports = new ME("tag:yaml.org,2002:merge", { kind: "scalar", resolve: BE });
});
var as = g((II, Cf) => {
    "use strict";
    var HE = me(),
        ss = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function jE(e) {
        if (e === null) return !1;
        var t,
            r,
            n = 0,
            i = e.length,
            o = ss;
        for (r = 0; r < i; r++)
            if (((t = o.indexOf(e.charAt(r))), !(t > 64))) {
                if (t < 0) return !1;
                n += 6;
            }
        return n % 8 === 0;
    }
    function WE(e) {
        var t,
            r,
            n = e.replace(/[\r\n=]/g, ""),
            i = n.length,
            o = ss,
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
    function GE(e) {
        var t = "",
            r = 0,
            n,
            i,
            o = e.length,
            s = ss;
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
    function VE(e) {
        return Object.prototype.toString.call(e) === "[object Uint8Array]";
    }
    Cf.exports = new HE("tag:yaml.org,2002:binary", { kind: "scalar", resolve: jE, construct: WE, predicate: VE, represent: GE });
});
var ls = g((NI, Sf) => {
    "use strict";
    var YE = me(),
        zE = Object.prototype.hasOwnProperty,
        XE = Object.prototype.toString;
    function JE(e) {
        if (e === null) return !0;
        var t = [],
            r,
            n,
            i,
            o,
            s,
            a = e;
        for (r = 0, n = a.length; r < n; r += 1) {
            if (((i = a[r]), (s = !1), XE.call(i) !== "[object Object]")) return !1;
            for (o in i)
                if (zE.call(i, o))
                    if (!s) s = !0;
                    else return !1;
            if (!s) return !1;
            if (t.indexOf(o) === -1) t.push(o);
            else return !1;
        }
        return !0;
    }
    function KE(e) {
        return e !== null ? e : [];
    }
    Sf.exports = new YE("tag:yaml.org,2002:omap", { kind: "sequence", resolve: JE, construct: KE });
});
var us = g((RI, Tf) => {
    "use strict";
    var QE = me(),
        ZE = Object.prototype.toString;
    function e_(e) {
        if (e === null) return !0;
        var t,
            r,
            n,
            i,
            o,
            s = e;
        for (o = new Array(s.length), t = 0, r = s.length; t < r; t += 1) {
            if (((n = s[t]), ZE.call(n) !== "[object Object]" || ((i = Object.keys(n)), i.length !== 1))) return !1;
            o[t] = [i[0], n[i[0]]];
        }
        return !0;
    }
    function t_(e) {
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
    Tf.exports = new QE("tag:yaml.org,2002:pairs", { kind: "sequence", resolve: e_, construct: t_ });
});
var cs = g((PI, bf) => {
    "use strict";
    var r_ = me(),
        n_ = Object.prototype.hasOwnProperty;
    function i_(e) {
        if (e === null) return !0;
        var t,
            r = e;
        for (t in r) if (n_.call(r, t) && r[t] !== null) return !1;
        return !0;
    }
    function o_(e) {
        return e !== null ? e : {};
    }
    bf.exports = new r_("tag:yaml.org,2002:set", { kind: "mapping", resolve: i_, construct: o_ });
});
var ti = g((DI, Of) => {
    "use strict";
    Of.exports = ns().extend({ implicit: [is(), os()], explicit: [as(), ls(), us(), cs()] });
});
var jf = g((FI, ps) => {
    "use strict";
    var Rt = rr(),
        Ff = nr(),
        s_ = rf(),
        a_ = ti(),
        dt = Object.prototype.hasOwnProperty,
        ri = 1,
        qf = 2,
        Lf = 3,
        ni = 4,
        fs = 1,
        l_ = 2,
        xf = 3,
        u_ =
            /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
        c_ = /[\x85\u2028\u2029]/,
        f_ = /[,\[\]\{\}]/,
        Uf = /^(?:!|!!|![a-z\-]+!)$/i,
        $f = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function If(e) {
        return Object.prototype.toString.call(e);
    }
    function Ge(e) {
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
    function h_(e) {
        var t;
        return 48 <= e && e <= 57 ? e - 48 : ((t = e | 32), 97 <= t && t <= 102 ? t - 97 + 10 : -1);
    }
    function d_(e) {
        return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
    }
    function p_(e) {
        return 48 <= e && e <= 57 ? e - 48 : -1;
    }
    function Nf(e) {
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
    function m_(e) {
        return e <= 65535
            ? String.fromCharCode(e)
            : String.fromCharCode(((e - 65536) >> 10) + 55296, ((e - 65536) & 1023) + 56320);
    }
    var kf = new Array(256),
        Mf = new Array(256);
    for (Nt = 0; Nt < 256; Nt++) (kf[Nt] = Nf(Nt) ? 1 : 0), (Mf[Nt] = Nf(Nt));
    var Nt;
    function g_(e, t) {
        (this.input = e),
            (this.filename = t.filename || null),
            (this.schema = t.schema || a_),
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
    function Bf(e, t) {
        var r = {
            name: e.filename,
            buffer: e.input.slice(0, -1),
            position: e.position,
            line: e.line,
            column: e.position - e.lineStart
        };
        return (r.snippet = s_(r)), new Ff(t, r);
    }
    function I(e, t) {
        throw Bf(e, t);
    }
    function ii(e, t) {
        e.onWarning && e.onWarning.call(null, Bf(e, t));
    }
    var Rf = {
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
                Uf.test(i) || I(t, "ill-formed tag handle (first argument) of the TAG directive"),
                dt.call(t.tagMap, i) && I(t, 'there is a previously declared suffix for "' + i + '" tag handle'),
                $f.test(o) || I(t, "ill-formed tag prefix (second argument) of the TAG directive");
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
            else u_.test(a) && I(e, "the stream contains non-printable characters");
            e.result += a;
        }
    }
    function Pf(e, t, r, n) {
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
                    typeof i == "object" && If(i[d]) === "[object Object]" && (i[d] = "[object Object]");
        if (
            (typeof i == "object" && If(i) === "[object Object]" && (i = "[object Object]"),
            (i = String(i)),
            t === null && (t = {}),
            n === "tag:yaml.org,2002:merge")
        )
            if (Array.isArray(o)) for (d = 0, c = o.length; d < c; d += 1) Pf(e, t, o[d], r);
            else Pf(e, t, o, r);
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
    function hs(e) {
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
            if (Ge(i))
                for (hs(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
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
    function ds(e, t) {
        t === 1 ? (e.result += " ") : t > 1 && (e.result += Rt.repeat("\n", t - 1));
    }
    function w_(e, t, r) {
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
                if (Ge(p))
                    if (((l = e.line), (d = e.lineStart), (c = e.lineIndent), ie(e, !1, -1), e.lineIndent >= t)) {
                        (a = !0), (p = e.input.charCodeAt(e.position));
                        continue;
                    } else {
                        (e.position = s), (e.line = l), (e.lineStart = d), (e.lineIndent = c);
                        break;
                    }
            }
            a && (ht(e, o, s, !1), ds(e, e.line - l), (o = s = e.position), (a = !1)),
                Pt(p) || (s = e.position + 1),
                (p = e.input.charCodeAt(++e.position));
        }
        return ht(e, o, s, !1), e.result ? !0 : ((e.kind = f), (e.result = m), !1);
    }
    function y_(e, t) {
        var r, n, i;
        if (((r = e.input.charCodeAt(e.position)), r !== 39)) return !1;
        for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
            if (r === 39)
                if ((ht(e, n, e.position, !0), (r = e.input.charCodeAt(++e.position)), r === 39))
                    (n = e.position), e.position++, (i = e.position);
                else return !0;
            else
                Ge(r)
                    ? (ht(e, n, i, !0), ds(e, ie(e, !1, t)), (n = i = e.position))
                    : e.position === e.lineStart && oi(e)
                    ? I(e, "unexpected end of the document within a single quoted scalar")
                    : (e.position++, (i = e.position));
        I(e, "unexpected end of the stream within a single quoted scalar");
    }
    function E_(e, t) {
        var r, n, i, o, s, a;
        if (((a = e.input.charCodeAt(e.position)), a !== 34)) return !1;
        for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (a = e.input.charCodeAt(e.position)) !== 0; ) {
            if (a === 34) return ht(e, r, e.position, !0), e.position++, !0;
            if (a === 92) {
                if ((ht(e, r, e.position, !0), (a = e.input.charCodeAt(++e.position)), Ge(a))) ie(e, !1, t);
                else if (a < 256 && kf[a]) (e.result += Mf[a]), e.position++;
                else if ((s = d_(a)) > 0) {
                    for (i = s, o = 0; i > 0; i--)
                        (a = e.input.charCodeAt(++e.position)),
                            (s = h_(a)) >= 0 ? (o = (o << 4) + s) : I(e, "expected hexadecimal character");
                    (e.result += m_(o)), e.position++;
                } else I(e, "unknown escape sequence");
                r = n = e.position;
            } else
                Ge(a)
                    ? (ht(e, r, n, !0), ds(e, ie(e, !1, t)), (r = n = e.position))
                    : e.position === e.lineStart && oi(e)
                    ? I(e, "unexpected end of the document within a double quoted scalar")
                    : (e.position++, (n = e.position));
        }
        I(e, "unexpected end of the stream within a double quoted scalar");
    }
    function __(e, t) {
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
            S;
        if (((S = e.input.charCodeAt(e.position)), S === 91)) (c = 93), (p = !1), (a = []);
        else if (S === 123) (c = 125), (p = !0), (a = {});
        else return !1;
        for (e.anchor !== null && (e.anchorMap[e.anchor] = a), S = e.input.charCodeAt(++e.position); S !== 0; ) {
            if ((ie(e, !0, t), (S = e.input.charCodeAt(e.position)), S === c))
                return e.position++, (e.tag = s), (e.anchor = l), (e.kind = p ? "mapping" : "sequence"), (e.result = a), !0;
            r
                ? S === 44 && I(e, "expected the node content, but found ','")
                : I(e, "missed comma between flow collection entries"),
                (A = _ = T = null),
                (f = m = !1),
                S === 63 && ((d = e.input.charCodeAt(e.position + 1)), Re(d) && ((f = m = !0), e.position++, ie(e, !0, t))),
                (n = e.line),
                (i = e.lineStart),
                (o = e.position),
                sr(e, t, ri, !1, !0),
                (A = e.tag),
                (_ = e.result),
                ie(e, !0, t),
                (S = e.input.charCodeAt(e.position)),
                (m || e.line === n) &&
                    S === 58 &&
                    ((f = !0), (S = e.input.charCodeAt(++e.position)), ie(e, !0, t), sr(e, t, ri, !1, !0), (T = e.result)),
                p ? or(e, a, E, A, _, T, n, i, o) : f ? a.push(or(e, null, E, A, _, T, n, i, o)) : a.push(_),
                ie(e, !0, t),
                (S = e.input.charCodeAt(e.position)),
                S === 44 ? ((r = !0), (S = e.input.charCodeAt(++e.position))) : (r = !1);
        }
        I(e, "unexpected end of the stream within a flow collection");
    }
    function v_(e, t) {
        var r,
            n,
            i = fs,
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
                fs === i ? (i = f === 43 ? xf : l_) : I(e, "repeat of a chomping mode identifier");
            else if ((c = p_(f)) >= 0)
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
                while (!Ge(f) && f !== 0);
        }
        for (; f !== 0; ) {
            for (hs(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!s || e.lineIndent < a) && f === 32; )
                e.lineIndent++, (f = e.input.charCodeAt(++e.position));
            if ((!s && e.lineIndent > a && (a = e.lineIndent), Ge(f))) {
                l++;
                continue;
            }
            if (e.lineIndent < a) {
                i === xf ? (e.result += Rt.repeat("\n", o ? 1 + l : l)) : i === fs && o && (e.result += "\n");
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
                !Ge(f) && f !== 0;

            )
                f = e.input.charCodeAt(++e.position);
            ht(e, r, e.position, !1);
        }
        return !0;
    }
    function Df(e, t) {
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
                sr(e, t, Lf, !1, !0),
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
    function A_(e, t, r) {
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
            S;
        if (e.firstTabInLine !== -1) return !1;
        for (e.anchor !== null && (e.anchorMap[e.anchor] = f), S = e.input.charCodeAt(e.position); S !== 0; ) {
            if (
                (!A &&
                    e.firstTabInLine !== -1 &&
                    ((e.position = e.firstTabInLine), I(e, "tab characters must not be used in indentation")),
                (n = e.input.charCodeAt(e.position + 1)),
                (o = e.line),
                (S === 63 || S === 58) && Re(n))
            )
                S === 63
                    ? (A && (or(e, f, m, p, E, null, s, a, l), (p = E = _ = null)), (T = !0), (A = !0), (i = !0))
                    : A
                    ? ((A = !1), (i = !0))
                    : I(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),
                    (e.position += 1),
                    (S = n);
            else {
                if (((s = e.line), (a = e.lineStart), (l = e.position), !sr(e, r, qf, !1, !0))) break;
                if (e.line === o) {
                    for (S = e.input.charCodeAt(e.position); Pt(S); ) S = e.input.charCodeAt(++e.position);
                    if (S === 58)
                        (S = e.input.charCodeAt(++e.position)),
                            Re(S) ||
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
                    (S = e.input.charCodeAt(e.position))),
                (e.line === o || e.lineIndent > t) && S !== 0)
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
                          Uf.test(i) || I(e, "named tag handle cannot contain such characters"),
                          (n = !0),
                          (t = e.position + 1))),
                    (s = e.input.charCodeAt(++e.position));
            (o = e.input.slice(t, e.position)), f_.test(o) && I(e, "tag suffix cannot contain flow indicator characters");
        }
        o && !$f.test(o) && I(e, "tag name cannot contain such characters: " + o);
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
    function S_(e) {
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
    function T_(e) {
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
            (o = s = a = ni === r || Lf === r),
            n &&
                ie(e, !0, -1) &&
                ((d = !0), e.lineIndent > t ? (l = 1) : e.lineIndent === t ? (l = 0) : e.lineIndent < t && (l = -1)),
            l === 1)
        )
            for (; C_(e) || S_(e); )
                ie(e, !0, -1)
                    ? ((d = !0),
                      (a = o),
                      e.lineIndent > t ? (l = 1) : e.lineIndent === t ? (l = 0) : e.lineIndent < t && (l = -1))
                    : (a = !1);
        if (
            (a && (a = d || i),
            (l === 1 || ni === r) &&
                (ri === r || qf === r ? (_ = t) : (_ = t + 1),
                (A = e.position - e.lineStart),
                l === 1
                    ? (a && (Df(e, A) || A_(e, A, _))) || __(e, _)
                        ? (c = !0)
                        : ((s && v_(e, _)) || y_(e, _) || E_(e, _)
                              ? (c = !0)
                              : T_(e)
                              ? ((c = !0),
                                (e.tag !== null || e.anchor !== null) && I(e, "alias node should not have any properties"))
                              : w_(e, _, ri === r) && ((c = !0), e.tag === null && (e.tag = "?")),
                          e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
                    : l === 0 && (c = a && Df(e, A))),
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
    function b_(e) {
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
                    while (s !== 0 && !Ge(s));
                    break;
                }
                if (Ge(s)) break;
                for (r = e.position; s !== 0 && !Re(s); ) s = e.input.charCodeAt(++e.position);
                i.push(e.input.slice(r, e.position));
            }
            s !== 0 && hs(e), dt.call(Rf, n) ? Rf[n](e, n, i) : ii(e, 'unknown document directive "' + n + '"');
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
                c_.test(e.input.slice(t, e.position)) &&
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
    function Hf(e, t) {
        (e = String(e)),
            (t = t || {}),
            e.length !== 0 &&
                (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += "\n"),
                e.charCodeAt(0) === 65279 && (e = e.slice(1)));
        var r = new g_(e, t),
            n = e.indexOf("\0");
        for (
            n !== -1 && ((r.position = n), I(r, "null byte is not allowed in input")), r.input += "\0";
            r.input.charCodeAt(r.position) === 32;

        )
            (r.lineIndent += 1), (r.position += 1);
        for (; r.position < r.length - 1; ) b_(r);
        return r.documents;
    }
    function O_(e, t, r) {
        t !== null && typeof t == "object" && typeof r > "u" && ((r = t), (t = null));
        var n = Hf(e, r);
        if (typeof t != "function") return n;
        for (var i = 0, o = n.length; i < o; i += 1) t(n[i]);
    }
    function x_(e, t) {
        var r = Hf(e, t);
        if (r.length !== 0) {
            if (r.length === 1) return r[0];
            throw new Ff("expected a single document in the stream, but found more");
        }
    }
    ps.exports.loadAll = O_;
    ps.exports.load = x_;
});
var ch = g((qI, uh) => {
    "use strict";
    var li = rr(),
        Zr = nr(),
        I_ = ti(),
        Qf = Object.prototype.toString,
        Zf = Object.prototype.hasOwnProperty,
        Es = 65279,
        N_ = 9,
        Jr = 10,
        R_ = 13,
        P_ = 32,
        D_ = 33,
        F_ = 34,
        ms = 35,
        q_ = 37,
        L_ = 38,
        U_ = 39,
        $_ = 42,
        eh = 44,
        k_ = 45,
        si = 58,
        M_ = 61,
        B_ = 62,
        H_ = 63,
        j_ = 64,
        th = 91,
        rh = 93,
        W_ = 96,
        nh = 123,
        G_ = 124,
        ih = 125,
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
    var V_ = ["y", "Y", "yes", "Yes", "YES", "on", "On", "ON", "n", "N", "no", "No", "NO", "off", "Off", "OFF"],
        Y_ = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
    function z_(e, t) {
        var r, n, i, o, s, a, l;
        if (t === null) return {};
        for (r = {}, n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
            (s = n[i]),
                (a = String(t[s])),
                s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2)),
                (l = e.compiledTypeMap.fallback[s]),
                l && Zf.call(l.styleAliases, a) && (a = l.styleAliases[a]),
                (r[s] = a);
        return r;
    }
    function X_(e) {
        var t, r, n;
        if (((t = e.toString(16).toUpperCase()), e <= 255)) (r = "x"), (n = 2);
        else if (e <= 65535) (r = "u"), (n = 4);
        else if (e <= 4294967295) (r = "U"), (n = 8);
        else throw new Zr("code point within a string may not be greater than 0xFFFFFFFF");
        return "\\" + r + li.repeat("0", n - t.length) + t;
    }
    var J_ = 1,
        Kr = 2;
    function K_(e) {
        (this.schema = e.schema || I_),
            (this.indent = Math.max(1, e.indent || 2)),
            (this.noArrayIndent = e.noArrayIndent || !1),
            (this.skipInvalid = e.skipInvalid || !1),
            (this.flowLevel = li.isNothing(e.flowLevel) ? -1 : e.flowLevel),
            (this.styleMap = z_(this.schema, e.styles || null)),
            (this.sortKeys = e.sortKeys || !1),
            (this.lineWidth = e.lineWidth || 80),
            (this.noRefs = e.noRefs || !1),
            (this.noCompatMode = e.noCompatMode || !1),
            (this.condenseFlow = e.condenseFlow || !1),
            (this.quotingType = e.quotingType === '"' ? Kr : J_),
            (this.forceQuotes = e.forceQuotes || !1),
            (this.replacer = typeof e.replacer == "function" ? e.replacer : null),
            (this.implicitTypes = this.schema.compiledImplicit),
            (this.explicitTypes = this.schema.compiledExplicit),
            (this.tag = null),
            (this.result = ""),
            (this.duplicates = []),
            (this.usedDuplicates = null);
    }
    function Wf(e, t) {
        for (var r = li.repeat(" ", t), n = 0, i = -1, o = "", s, a = e.length; n < a; )
            (i = e.indexOf("\n", n)),
                i === -1 ? ((s = e.slice(n)), (n = a)) : ((s = e.slice(n, i + 1)), (n = i + 1)),
                s.length && s !== "\n" && (o += r),
                (o += s);
        return o;
    }
    function gs(e, t) {
        return "\n" + li.repeat(" ", e.indent * t);
    }
    function Q_(e, t) {
        var r, n, i;
        for (r = 0, n = e.implicitTypes.length; r < n; r += 1) if (((i = e.implicitTypes[r]), i.resolve(t))) return !0;
        return !1;
    }
    function ai(e) {
        return e === P_ || e === N_;
    }
    function Qr(e) {
        return (
            (32 <= e && e <= 126) ||
            (161 <= e && e <= 55295 && e !== 8232 && e !== 8233) ||
            (57344 <= e && e <= 65533 && e !== Es) ||
            (65536 <= e && e <= 1114111)
        );
    }
    function Gf(e) {
        return Qr(e) && e !== Es && e !== R_ && e !== Jr;
    }
    function Vf(e, t, r) {
        var n = Gf(e),
            i = n && !ai(e);
        return (
            ((r ? n : n && e !== eh && e !== th && e !== rh && e !== nh && e !== ih) && e !== ms && !(t === si && !i)) ||
            (Gf(t) && !ai(t) && e === ms) ||
            (t === si && i)
        );
    }
    function Z_(e) {
        return (
            Qr(e) &&
            e !== Es &&
            !ai(e) &&
            e !== k_ &&
            e !== H_ &&
            e !== si &&
            e !== eh &&
            e !== th &&
            e !== rh &&
            e !== nh &&
            e !== ih &&
            e !== ms &&
            e !== L_ &&
            e !== $_ &&
            e !== D_ &&
            e !== G_ &&
            e !== M_ &&
            e !== B_ &&
            e !== U_ &&
            e !== F_ &&
            e !== q_ &&
            e !== j_ &&
            e !== W_
        );
    }
    function ev(e) {
        return !ai(e) && e !== si;
    }
    function Xr(e, t) {
        var r = e.charCodeAt(t),
            n;
        return r >= 55296 && r <= 56319 && t + 1 < e.length && ((n = e.charCodeAt(t + 1)), n >= 56320 && n <= 57343)
            ? (r - 55296) * 1024 + n - 56320 + 65536
            : r;
    }
    function oh(e) {
        var t = /^\n* /;
        return t.test(e);
    }
    var sh = 1,
        ws = 2,
        ah = 3,
        lh = 4,
        ar = 5;
    function tv(e, t, r, n, i, o, s, a) {
        var l,
            d = 0,
            c = null,
            f = !1,
            m = !1,
            p = n !== -1,
            E = -1,
            _ = Z_(Xr(e, 0)) && ev(Xr(e, e.length - 1));
        if (t || s)
            for (l = 0; l < e.length; d >= 65536 ? (l += 2) : l++) {
                if (((d = Xr(e, l)), !Qr(d))) return ar;
                (_ = _ && Vf(d, c, a)), (c = d);
            }
        else {
            for (l = 0; l < e.length; d >= 65536 ? (l += 2) : l++) {
                if (((d = Xr(e, l)), d === Jr)) (f = !0), p && ((m = m || (l - E - 1 > n && e[E + 1] !== " ")), (E = l));
                else if (!Qr(d)) return ar;
                (_ = _ && Vf(d, c, a)), (c = d);
            }
            m = m || (p && l - E - 1 > n && e[E + 1] !== " ");
        }
        return !f && !m
            ? _ && !s && !i(e)
                ? sh
                : o === Kr
                ? ar
                : ws
            : r > 9 && oh(e)
            ? ar
            : s
            ? o === Kr
                ? ar
                : ws
            : m
            ? lh
            : ah;
    }
    function rv(e, t, r, n, i) {
        e.dump = (function () {
            if (t.length === 0) return e.quotingType === Kr ? '""' : "''";
            if (!e.noCompatMode && (V_.indexOf(t) !== -1 || Y_.test(t)))
                return e.quotingType === Kr ? '"' + t + '"' : "'" + t + "'";
            var o = e.indent * Math.max(1, r),
                s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o),
                a = n || (e.flowLevel > -1 && r >= e.flowLevel);
            function l(d) {
                return Q_(e, d);
            }
            switch (tv(t, a, e.indent, s, l, e.quotingType, e.forceQuotes && !n, i)) {
                case sh:
                    return t;
                case ws:
                    return "'" + t.replace(/'/g, "''") + "'";
                case ah:
                    return "|" + Yf(t, e.indent) + zf(Wf(t, o));
                case lh:
                    return ">" + Yf(t, e.indent) + zf(Wf(nv(t, s), o));
                case ar:
                    return '"' + iv(t, s) + '"';
                default:
                    throw new Zr("impossible error: invalid scalar style");
            }
        })();
    }
    function Yf(e, t) {
        var r = oh(e) ? String(t) : "",
            n = e[e.length - 1] === "\n",
            i = n && (e[e.length - 2] === "\n" || e === "\n"),
            o = i ? "+" : n ? "" : "-";
        return r + o + "\n";
    }
    function zf(e) {
        return e[e.length - 1] === "\n" ? e.slice(0, -1) : e;
    }
    function nv(e, t) {
        for (
            var r = /(\n+)([^\n]*)/g,
                n = (function () {
                    var d = e.indexOf("\n");
                    return (d = d !== -1 ? d : e.length), (r.lastIndex = d), Xf(e.slice(0, d), t);
                })(),
                i = e[0] === "\n" || e[0] === " ",
                o,
                s;
            (s = r.exec(e));

        ) {
            var a = s[1],
                l = s[2];
            (o = l[0] === " "), (n += a + (!i && !o && l !== "" ? "\n" : "") + Xf(l, t)), (i = o);
        }
        return n;
    }
    function Xf(e, t) {
        if (e === "" || e[0] === " ") return e;
        for (var r = / [^ ]/g, n, i = 0, o, s = 0, a = 0, l = ""; (n = r.exec(e)); )
            (a = n.index), a - i > t && ((o = s > i ? s : a), (l += "\n" + e.slice(i, o)), (i = o + 1)), (s = a);
        return (
            (l += "\n"), e.length - i > t && s > i ? (l += e.slice(i, s) + "\n" + e.slice(s + 1)) : (l += e.slice(i)), l.slice(1)
        );
    }
    function iv(e) {
        for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? (i += 2) : i++)
            (r = Xr(e, i)), (n = ge[r]), !n && Qr(r) ? ((t += e[i]), r >= 65536 && (t += e[i + 1])) : (t += n || X_(r));
        return t;
    }
    function ov(e, t, r) {
        var n = "",
            i = e.tag,
            o,
            s,
            a;
        for (o = 0, s = r.length; o < s; o += 1)
            (a = r[o]),
                e.replacer && (a = e.replacer.call(r, String(o), a)),
                (Qe(e, t, a, !1, !1) || (typeof a > "u" && Qe(e, t, null, !1, !1))) &&
                    (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), (n += e.dump));
        (e.tag = i), (e.dump = "[" + n + "]");
    }
    function Jf(e, t, r, n) {
        var i = "",
            o = e.tag,
            s,
            a,
            l;
        for (s = 0, a = r.length; s < a; s += 1)
            (l = r[s]),
                e.replacer && (l = e.replacer.call(r, String(s), l)),
                (Qe(e, t + 1, l, !0, !0, !1, !0) || (typeof l > "u" && Qe(e, t + 1, null, !0, !0, !1, !0))) &&
                    ((!n || i !== "") && (i += gs(e, t)),
                    e.dump && Jr === e.dump.charCodeAt(0) ? (i += "-") : (i += "- "),
                    (i += e.dump));
        (e.tag = o), (e.dump = i || "[]");
    }
    function sv(e, t, r) {
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
                Qe(e, t, l, !1, !1) &&
                    (e.dump.length > 1024 && (c += "? "),
                    (c += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " ")),
                    Qe(e, t, d, !1, !1) && ((c += e.dump), (n += c)));
        (e.tag = i), (e.dump = "{" + n + "}");
    }
    function av(e, t, r, n) {
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
                (!n || i !== "") && (m += gs(e, t)),
                (d = s[a]),
                (c = r[d]),
                e.replacer && (c = e.replacer.call(r, d, c)),
                Qe(e, t + 1, d, !0, !0, !0) &&
                    ((f = (e.tag !== null && e.tag !== "?") || (e.dump && e.dump.length > 1024)),
                    f && (e.dump && Jr === e.dump.charCodeAt(0) ? (m += "?") : (m += "? ")),
                    (m += e.dump),
                    f && (m += gs(e, t)),
                    Qe(e, t + 1, c, !0, f) &&
                        (e.dump && Jr === e.dump.charCodeAt(0) ? (m += ":") : (m += ": "), (m += e.dump), (i += m)));
        (e.tag = o), (e.dump = i || "{}");
    }
    function Kf(e, t, r) {
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
                    if (((l = e.styleMap[a.tag] || a.defaultStyle), Qf.call(a.represent) === "[object Function]"))
                        n = a.represent(t, l);
                    else if (Zf.call(a.represent, l)) n = a.represent[l](t, l);
                    else throw new Zr("!<" + a.tag + '> tag resolver accepts not "' + l + '" style');
                    e.dump = n;
                }
                return !0;
            }
        return !1;
    }
    function Qe(e, t, r, n, i, o, s) {
        (e.tag = null), (e.dump = r), Kf(e, r, !1) || Kf(e, r, !0);
        var a = Qf.call(e.dump),
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
                    ? (av(e, t, e.dump, i), m && (e.dump = "&ref_" + f + e.dump))
                    : (sv(e, t, e.dump), m && (e.dump = "&ref_" + f + " " + e.dump));
            else if (a === "[object Array]")
                n && e.dump.length !== 0
                    ? (e.noArrayIndent && !s && t > 0 ? Jf(e, t - 1, e.dump, i) : Jf(e, t, e.dump, i),
                      m && (e.dump = "&ref_" + f + e.dump))
                    : (ov(e, t, e.dump), m && (e.dump = "&ref_" + f + " " + e.dump));
            else if (a === "[object String]") e.tag !== "?" && rv(e, e.dump, t, o, l);
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
    function lv(e, t) {
        var r = [],
            n = [],
            i,
            o;
        for (ys(e, r, n), i = 0, o = n.length; i < o; i += 1) t.duplicates.push(r[n[i]]);
        t.usedDuplicates = new Array(o);
    }
    function ys(e, t, r) {
        var n, i, o;
        if (e !== null && typeof e == "object")
            if (((i = t.indexOf(e)), i !== -1)) r.indexOf(i) === -1 && r.push(i);
            else if ((t.push(e), Array.isArray(e))) for (i = 0, o = e.length; i < o; i += 1) ys(e[i], t, r);
            else for (n = Object.keys(e), i = 0, o = n.length; i < o; i += 1) ys(e[n[i]], t, r);
    }
    function uv(e, t) {
        t = t || {};
        var r = new K_(t);
        r.noRefs || lv(e, r);
        var n = e;
        return r.replacer && (n = r.replacer.call({ "": n }, "", n)), Qe(r, 0, n, !0, !0) ? r.dump + "\n" : "";
    }
    uh.exports.dump = uv;
});
var ui = g((LI, Ae) => {
    "use strict";
    var fh = jf(),
        cv = ch();
    function _s(e, t) {
        return function () {
            throw new Error(
                "Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default."
            );
        };
    }
    Ae.exports.Type = me();
    Ae.exports.Schema = Yo();
    Ae.exports.FAILSAFE_SCHEMA = Ko();
    Ae.exports.JSON_SCHEMA = rs();
    Ae.exports.CORE_SCHEMA = ns();
    Ae.exports.DEFAULT_SCHEMA = ti();
    Ae.exports.load = fh.load;
    Ae.exports.loadAll = fh.loadAll;
    Ae.exports.dump = cv.dump;
    Ae.exports.YAMLException = nr();
    Ae.exports.types = {
        binary: as(),
        float: ts(),
        map: Jo(),
        null: Qo(),
        pairs: us(),
        set: cs(),
        timestamp: is(),
        bool: Zo(),
        int: es(),
        merge: os(),
        omap: ls(),
        seq: Xo(),
        str: zo()
    };
    Ae.exports.safeLoad = _s("safeLoad", "load");
    Ae.exports.safeLoadAll = _s("safeLoadAll", "loadAll");
    Ae.exports.safeDump = _s("safeDump", "dump");
});
var hh = g(ci => {
    "use strict";
    Object.defineProperty(ci, "__esModule", { value: !0 });
    ci.Lazy = void 0;
    var vs = class {
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
    ci.Lazy = vs;
});
var en = g(($I, dh) => {
    var fv = "2.0.0",
        hv = Number.MAX_SAFE_INTEGER || 9007199254740991,
        dv = 16,
        pv = 250,
        mv = ["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"];
    dh.exports = {
        MAX_LENGTH: 256,
        MAX_SAFE_COMPONENT_LENGTH: dv,
        MAX_SAFE_BUILD_LENGTH: pv,
        MAX_SAFE_INTEGER: hv,
        RELEASE_TYPES: mv,
        SEMVER_SPEC_VERSION: fv,
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2
    };
});
var tn = g((kI, ph) => {
    var gv =
        typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)
            ? (...e) => console.error("SEMVER", ...e)
            : () => {};
    ph.exports = gv;
});
var lr = g((Ze, mh) => {
    var { MAX_SAFE_COMPONENT_LENGTH: As, MAX_SAFE_BUILD_LENGTH: wv, MAX_LENGTH: yv } = en(),
        Ev = tn();
    Ze = mh.exports = {};
    var _v = (Ze.re = []),
        vv = (Ze.safeRe = []),
        O = (Ze.src = []),
        x = (Ze.t = {}),
        Av = 0,
        Cs = "[a-zA-Z0-9-]",
        Cv = [
            ["\\s", 1],
            ["\\d", yv],
            [Cs, wv]
        ],
        Sv = e => {
            for (let [t, r] of Cv)
                e = e
                    .split("".concat(t, "*"))
                    .join("".concat(t, "{0,").concat(r, "}"))
                    .split("".concat(t, "+"))
                    .join("".concat(t, "{1,").concat(r, "}"));
            return e;
        },
        q = (e, t, r) => {
            let n = Sv(t),
                i = Av++;
            Ev(e, i, t),
                (x[e] = i),
                (O[i] = t),
                (_v[i] = new RegExp(t, r ? "g" : void 0)),
                (vv[i] = new RegExp(n, r ? "g" : void 0));
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
        "(^|[^\\d])(\\d{1,".concat(As, "})") + "(?:\\.(\\d{1,".concat(As, "}))?") + "(?:\\.(\\d{1,".concat(As, "}))?")
    );
    q("COERCE", "".concat(O[x.COERCEPLAIN], "(?:$|[^\\d])"));
    q("COERCEFULL", O[x.COERCEPLAIN] + "(?:".concat(O[x.PRERELEASE], ")?") + "(?:".concat(O[x.BUILD], ")?") + "(?:$|[^\\d])");
    q("COERCERTL", O[x.COERCE], !0);
    q("COERCERTLFULL", O[x.COERCEFULL], !0);
    q("LONETILDE", "(?:~>?)");
    q("TILDETRIM", "(\\s*)".concat(O[x.LONETILDE], "\\s+"), !0);
    Ze.tildeTrimReplace = "$1~";
    q("TILDE", "^".concat(O[x.LONETILDE]).concat(O[x.XRANGEPLAIN], "$"));
    q("TILDELOOSE", "^".concat(O[x.LONETILDE]).concat(O[x.XRANGEPLAINLOOSE], "$"));
    q("LONECARET", "(?:\\^)");
    q("CARETTRIM", "(\\s*)".concat(O[x.LONECARET], "\\s+"), !0);
    Ze.caretTrimReplace = "$1^";
    q("CARET", "^".concat(O[x.LONECARET]).concat(O[x.XRANGEPLAIN], "$"));
    q("CARETLOOSE", "^".concat(O[x.LONECARET]).concat(O[x.XRANGEPLAINLOOSE], "$"));
    q("COMPARATORLOOSE", "^".concat(O[x.GTLT], "\\s*(").concat(O[x.LOOSEPLAIN], ")$|^$"));
    q("COMPARATOR", "^".concat(O[x.GTLT], "\\s*(").concat(O[x.FULLPLAIN], ")$|^$"));
    q("COMPARATORTRIM", "(\\s*)".concat(O[x.GTLT], "\\s*(").concat(O[x.LOOSEPLAIN], "|").concat(O[x.XRANGEPLAIN], ")"), !0);
    Ze.comparatorTrimReplace = "$1$2$3";
    q("HYPHENRANGE", "^\\s*(".concat(O[x.XRANGEPLAIN], ")") + "\\s+-\\s+" + "(".concat(O[x.XRANGEPLAIN], ")") + "\\s*$");
    q(
        "HYPHENRANGELOOSE",
        "^\\s*(".concat(O[x.XRANGEPLAINLOOSE], ")") + "\\s+-\\s+" + "(".concat(O[x.XRANGEPLAINLOOSE], ")") + "\\s*$"
    );
    q("STAR", "(<|>)?=?\\s*\\*");
    q("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    q("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
});
var fi = g((MI, gh) => {
    var Tv = Object.freeze({ loose: !0 }),
        bv = Object.freeze({}),
        Ov = e => (e ? (typeof e != "object" ? Tv : e) : bv);
    gh.exports = Ov;
});
var Ss = g((BI, Eh) => {
    var wh = /^[0-9]+$/,
        yh = (e, t) => {
            let r = wh.test(e),
                n = wh.test(t);
            return r && n && ((e = +e), (t = +t)), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
        },
        xv = (e, t) => yh(t, e);
    Eh.exports = { compareIdentifiers: yh, rcompareIdentifiers: xv };
});
var we = g((HI, Ch) => {
    var hi = tn(),
        { MAX_LENGTH: _h, MAX_SAFE_INTEGER: di } = en(),
        { safeRe: vh, t: Ah } = lr(),
        Iv = fi(),
        { compareIdentifiers: ur } = Ss(),
        Ts = class e {
            constructor(t, r) {
                if (((r = Iv(r)), t instanceof e)) {
                    if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease) return t;
                    t = t.version;
                } else if (typeof t != "string")
                    throw new TypeError('Invalid version. Must be a string. Got type "'.concat(typeof t, '".'));
                if (t.length > _h) throw new TypeError("version is longer than ".concat(_h, " characters"));
                hi("SemVer", t, r),
                    (this.options = r),
                    (this.loose = !!r.loose),
                    (this.includePrerelease = !!r.includePrerelease);
                let n = t.trim().match(r.loose ? vh[Ah.LOOSE] : vh[Ah.FULL]);
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
                        if (!r && n === !1) throw new Error("invalid increment argument: identifier is empty");
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
    Ch.exports = Ts;
});
var Dt = g((jI, Th) => {
    var Sh = we(),
        Nv = (e, t, r = !1) => {
            if (e instanceof Sh) return e;
            try {
                return new Sh(e, t);
            } catch (n) {
                if (!r) return null;
                throw n;
            }
        };
    Th.exports = Nv;
});
var Oh = g((WI, bh) => {
    var Rv = Dt(),
        Pv = (e, t) => {
            let r = Rv(e, t);
            return r ? r.version : null;
        };
    bh.exports = Pv;
});
var Ih = g((GI, xh) => {
    var Dv = Dt(),
        Fv = (e, t) => {
            let r = Dv(e.trim().replace(/^[=v]+/, ""), t);
            return r ? r.version : null;
        };
    xh.exports = Fv;
});
var Ph = g((VI, Rh) => {
    var Nh = we(),
        qv = (e, t, r, n, i) => {
            typeof r == "string" && ((i = n), (n = r), (r = void 0));
            try {
                return new Nh(e instanceof Nh ? e.version : e, r).inc(t, n, i).version;
            } catch {
                return null;
            }
        };
    Rh.exports = qv;
});
var qh = g((YI, Fh) => {
    var Dh = Dt(),
        Lv = (e, t) => {
            let r = Dh(e, null, !0),
                n = Dh(t, null, !0),
                i = r.compare(n);
            if (i === 0) return null;
            let o = i > 0,
                s = o ? r : n,
                a = o ? n : r,
                l = !!s.prerelease.length;
            if (!!a.prerelease.length && !l)
                return !a.patch && !a.minor ? "major" : s.patch ? "patch" : s.minor ? "minor" : "major";
            let c = l ? "pre" : "";
            return r.major !== n.major
                ? c + "major"
                : r.minor !== n.minor
                ? c + "minor"
                : r.patch !== n.patch
                ? c + "patch"
                : "prerelease";
        };
    Fh.exports = Lv;
});
var Uh = g((zI, Lh) => {
    var Uv = we(),
        $v = (e, t) => new Uv(e, t).major;
    Lh.exports = $v;
});
var kh = g((XI, $h) => {
    var kv = we(),
        Mv = (e, t) => new kv(e, t).minor;
    $h.exports = Mv;
});
var Bh = g((JI, Mh) => {
    var Bv = we(),
        Hv = (e, t) => new Bv(e, t).patch;
    Mh.exports = Hv;
});
var jh = g((KI, Hh) => {
    var jv = Dt(),
        Wv = (e, t) => {
            let r = jv(e, t);
            return r && r.prerelease.length ? r.prerelease : null;
        };
    Hh.exports = Wv;
});
var Le = g((QI, Gh) => {
    var Wh = we(),
        Gv = (e, t, r) => new Wh(e, r).compare(new Wh(t, r));
    Gh.exports = Gv;
});
var Yh = g((ZI, Vh) => {
    var Vv = Le(),
        Yv = (e, t, r) => Vv(t, e, r);
    Vh.exports = Yv;
});
var Xh = g((eN, zh) => {
    var zv = Le(),
        Xv = (e, t) => zv(e, t, !0);
    zh.exports = Xv;
});
var pi = g((tN, Kh) => {
    var Jh = we(),
        Jv = (e, t, r) => {
            let n = new Jh(e, r),
                i = new Jh(t, r);
            return n.compare(i) || n.compareBuild(i);
        };
    Kh.exports = Jv;
});
var Zh = g((rN, Qh) => {
    var Kv = pi(),
        Qv = (e, t) => e.sort((r, n) => Kv(r, n, t));
    Qh.exports = Qv;
});
var td = g((nN, ed) => {
    var Zv = pi(),
        eA = (e, t) => e.sort((r, n) => Zv(n, r, t));
    ed.exports = eA;
});
var rn = g((iN, rd) => {
    var tA = Le(),
        rA = (e, t, r) => tA(e, t, r) > 0;
    rd.exports = rA;
});
var mi = g((oN, nd) => {
    var nA = Le(),
        iA = (e, t, r) => nA(e, t, r) < 0;
    nd.exports = iA;
});
var bs = g((sN, id) => {
    var oA = Le(),
        sA = (e, t, r) => oA(e, t, r) === 0;
    id.exports = sA;
});
var Os = g((aN, od) => {
    var aA = Le(),
        lA = (e, t, r) => aA(e, t, r) !== 0;
    od.exports = lA;
});
var gi = g((lN, sd) => {
    var uA = Le(),
        cA = (e, t, r) => uA(e, t, r) >= 0;
    sd.exports = cA;
});
var wi = g((uN, ad) => {
    var fA = Le(),
        hA = (e, t, r) => fA(e, t, r) <= 0;
    ad.exports = hA;
});
var xs = g((cN, ld) => {
    var dA = bs(),
        pA = Os(),
        mA = rn(),
        gA = gi(),
        wA = mi(),
        yA = wi(),
        EA = (e, t, r, n) => {
            switch (t) {
                case "===":
                    return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
                case "!==":
                    return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
                case "":
                case "=":
                case "==":
                    return dA(e, r, n);
                case "!=":
                    return pA(e, r, n);
                case ">":
                    return mA(e, r, n);
                case ">=":
                    return gA(e, r, n);
                case "<":
                    return wA(e, r, n);
                case "<=":
                    return yA(e, r, n);
                default:
                    throw new TypeError("Invalid operator: ".concat(t));
            }
        };
    ld.exports = EA;
});
var cd = g((fN, ud) => {
    var _A = we(),
        vA = Dt(),
        { safeRe: yi, t: Ei } = lr(),
        AA = (e, t) => {
            if (e instanceof _A) return e;
            if ((typeof e == "number" && (e = String(e)), typeof e != "string")) return null;
            t = t || {};
            let r = null;
            if (!t.rtl) r = e.match(t.includePrerelease ? yi[Ei.COERCEFULL] : yi[Ei.COERCE]);
            else {
                let l = t.includePrerelease ? yi[Ei.COERCERTLFULL] : yi[Ei.COERCERTL],
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
            return vA("".concat(n, ".").concat(i, ".").concat(o).concat(s).concat(a), t);
        };
    ud.exports = AA;
});
var hd = g((hN, fd) => {
    var Is = class {
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
    fd.exports = Is;
});
var Ue = g((dN, gd) => {
    var CA = /\s+/g,
        Ns = class e {
            constructor(t, r) {
                if (((r = TA(r)), t instanceof e))
                    return t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease ? t : new e(t.raw, r);
                if (t instanceof Rs) return (this.raw = t.value), (this.set = [[t]]), (this.formatted = void 0), this;
                if (
                    ((this.options = r),
                    (this.loose = !!r.loose),
                    (this.includePrerelease = !!r.includePrerelease),
                    (this.raw = t.trim().replace(CA, " ")),
                    (this.set = this.raw
                        .split("||")
                        .map(n => this.parseRange(n.trim()))
                        .filter(n => n.length)),
                    !this.set.length)
                )
                    throw new TypeError("Invalid SemVer Range: ".concat(this.raw));
                if (this.set.length > 1) {
                    let n = this.set[0];
                    if (((this.set = this.set.filter(i => !pd(i[0]))), this.set.length === 0)) this.set = [n];
                    else if (this.set.length > 1) {
                        for (let i of this.set)
                            if (i.length === 1 && PA(i[0])) {
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
                let n = ((this.options.includePrerelease && NA) | (this.options.loose && RA)) + ":" + t,
                    i = dd.get(n);
                if (i) return i;
                let o = this.options.loose,
                    s = o ? Pe[Ce.HYPHENRANGELOOSE] : Pe[Ce.HYPHENRANGE];
                (t = t.replace(s, HA(this.options.includePrerelease))),
                    X("hyphen replace", t),
                    (t = t.replace(Pe[Ce.COMPARATORTRIM], OA)),
                    X("comparator trim", t),
                    (t = t.replace(Pe[Ce.TILDETRIM], xA)),
                    X("tilde trim", t),
                    (t = t.replace(Pe[Ce.CARETTRIM], IA)),
                    X("caret trim", t);
                let a = t
                    .split(" ")
                    .map(f => DA(f, this.options))
                    .join(" ")
                    .split(/\s+/)
                    .map(f => BA(f, this.options));
                o && (a = a.filter(f => (X("loose invalid filter", f, this.options), !!f.match(Pe[Ce.COMPARATORLOOSE])))),
                    X("range list", a);
                let l = new Map(),
                    d = a.map(f => new Rs(f, this.options));
                for (let f of d) {
                    if (pd(f)) return [f];
                    l.set(f.value, f);
                }
                l.size > 1 && l.has("") && l.delete("");
                let c = [...l.values()];
                return dd.set(n, c), c;
            }
            intersects(t, r) {
                if (!(t instanceof e)) throw new TypeError("a Range is required");
                return this.set.some(
                    n => md(n, r) && t.set.some(i => md(i, r) && n.every(o => i.every(s => o.intersects(s, r))))
                );
            }
            test(t) {
                if (!t) return !1;
                if (typeof t == "string")
                    try {
                        t = new bA(t, this.options);
                    } catch {
                        return !1;
                    }
                for (let r = 0; r < this.set.length; r++) if (jA(this.set[r], t, this.options)) return !0;
                return !1;
            }
        };
    gd.exports = Ns;
    var SA = hd(),
        dd = new SA(),
        TA = fi(),
        Rs = nn(),
        X = tn(),
        bA = we(),
        { safeRe: Pe, t: Ce, comparatorTrimReplace: OA, tildeTrimReplace: xA, caretTrimReplace: IA } = lr(),
        { FLAG_INCLUDE_PRERELEASE: NA, FLAG_LOOSE: RA } = en(),
        pd = e => e.value === "<0.0.0-0",
        PA = e => e.value === "",
        md = (e, t) => {
            let r = !0,
                n = e.slice(),
                i = n.pop();
            for (; r && n.length; ) (r = n.every(o => i.intersects(o, t))), (i = n.pop());
            return r;
        },
        DA = (e, t) => (
            X("comp", e, t),
            (e = LA(e, t)),
            X("caret", e),
            (e = FA(e, t)),
            X("tildes", e),
            (e = $A(e, t)),
            X("xrange", e),
            (e = MA(e, t)),
            X("stars", e),
            e
        ),
        Se = e => !e || e.toLowerCase() === "x" || e === "*",
        FA = (e, t) =>
            e
                .trim()
                .split(/\s+/)
                .map(r => qA(r, t))
                .join(" "),
        qA = (e, t) => {
            let r = t.loose ? Pe[Ce.TILDELOOSE] : Pe[Ce.TILDE];
            return e.replace(r, (n, i, o, s, a) => {
                X("tilde", e, n, i, o, s, a);
                let l;
                return (
                    Se(i)
                        ? (l = "")
                        : Se(o)
                        ? (l = ">=".concat(i, ".0.0 <").concat(+i + 1, ".0.0-0"))
                        : Se(s)
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
        LA = (e, t) =>
            e
                .trim()
                .split(/\s+/)
                .map(r => UA(r, t))
                .join(" "),
        UA = (e, t) => {
            X("caret", e, t);
            let r = t.loose ? Pe[Ce.CARETLOOSE] : Pe[Ce.CARET],
                n = t.includePrerelease ? "-0" : "";
            return e.replace(r, (i, o, s, a, l) => {
                X("caret", e, i, o, s, a, l);
                let d;
                return (
                    Se(o)
                        ? (d = "")
                        : Se(s)
                        ? (d = ">="
                              .concat(o, ".0.0")
                              .concat(n, " <")
                              .concat(+o + 1, ".0.0-0"))
                        : Se(a)
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
        $A = (e, t) => (
            X("replaceXRanges", e, t),
            e
                .split(/\s+/)
                .map(r => kA(r, t))
                .join(" ")
        ),
        kA = (e, t) => {
            e = e.trim();
            let r = t.loose ? Pe[Ce.XRANGELOOSE] : Pe[Ce.XRANGE];
            return e.replace(r, (n, i, o, s, a, l) => {
                X("xRange", e, n, i, o, s, a, l);
                let d = Se(o),
                    c = d || Se(s),
                    f = c || Se(a),
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
        MA = (e, t) => (X("replaceStars", e, t), e.trim().replace(Pe[Ce.STAR], "")),
        BA = (e, t) => (X("replaceGTE0", e, t), e.trim().replace(Pe[t.includePrerelease ? Ce.GTE0PRE : Ce.GTE0], "")),
        HA = e => (t, r, n, i, o, s, a, l, d, c, f, m) => (
            Se(n)
                ? (r = "")
                : Se(i)
                ? (r = ">=".concat(n, ".0.0").concat(e ? "-0" : ""))
                : Se(o)
                ? (r = ">="
                      .concat(n, ".")
                      .concat(i, ".0")
                      .concat(e ? "-0" : ""))
                : s
                ? (r = ">=".concat(r))
                : (r = ">=".concat(r).concat(e ? "-0" : "")),
            Se(d)
                ? (l = "")
                : Se(c)
                ? (l = "<".concat(+d + 1, ".0.0-0"))
                : Se(f)
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
        jA = (e, t, r) => {
            for (let n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
            if (t.prerelease.length && !r.includePrerelease) {
                for (let n = 0; n < e.length; n++)
                    if ((X(e[n].semver), e[n].semver !== Rs.ANY && e[n].semver.prerelease.length > 0)) {
                        let i = e[n].semver;
                        if (i.major === t.major && i.minor === t.minor && i.patch === t.patch) return !0;
                    }
                return !1;
            }
            return !0;
        };
});
var nn = g((pN, Ad) => {
    var on = Symbol("SemVer ANY"),
        Fs = class e {
            static get ANY() {
                return on;
            }
            constructor(t, r) {
                if (((r = wd(r)), t instanceof e)) {
                    if (t.loose === !!r.loose) return t;
                    t = t.value;
                }
                (t = t.trim().split(/\s+/).join(" ")),
                    Ds("comparator", t, r),
                    (this.options = r),
                    (this.loose = !!r.loose),
                    this.parse(t),
                    this.semver === on ? (this.value = "") : (this.value = this.operator + this.semver.version),
                    Ds("comp", this);
            }
            parse(t) {
                let r = this.options.loose ? yd[Ed.COMPARATORLOOSE] : yd[Ed.COMPARATOR],
                    n = t.match(r);
                if (!n) throw new TypeError("Invalid comparator: ".concat(t));
                (this.operator = n[1] !== void 0 ? n[1] : ""),
                    this.operator === "=" && (this.operator = ""),
                    n[2] ? (this.semver = new _d(n[2], this.options.loose)) : (this.semver = on);
            }
            toString() {
                return this.value;
            }
            test(t) {
                if ((Ds("Comparator.test", t, this.options.loose), this.semver === on || t === on)) return !0;
                if (typeof t == "string")
                    try {
                        t = new _d(t, this.options);
                    } catch {
                        return !1;
                    }
                return Ps(t, this.operator, this.semver, this.options);
            }
            intersects(t, r) {
                if (!(t instanceof e)) throw new TypeError("a Comparator is required");
                return this.operator === ""
                    ? this.value === ""
                        ? !0
                        : new vd(t.value, r).test(this.value)
                    : t.operator === ""
                    ? t.value === ""
                        ? !0
                        : new vd(this.value, r).test(t.semver)
                    : ((r = wd(r)),
                      (r.includePrerelease && (this.value === "<0.0.0-0" || t.value === "<0.0.0-0")) ||
                      (!r.includePrerelease && (this.value.startsWith("<0.0.0") || t.value.startsWith("<0.0.0")))
                          ? !1
                          : !!(
                                (this.operator.startsWith(">") && t.operator.startsWith(">")) ||
                                (this.operator.startsWith("<") && t.operator.startsWith("<")) ||
                                (this.semver.version === t.semver.version &&
                                    this.operator.includes("=") &&
                                    t.operator.includes("=")) ||
                                (Ps(this.semver, "<", t.semver, r) &&
                                    this.operator.startsWith(">") &&
                                    t.operator.startsWith("<")) ||
                                (Ps(this.semver, ">", t.semver, r) && this.operator.startsWith("<") && t.operator.startsWith(">"))
                            ));
            }
        };
    Ad.exports = Fs;
    var wd = fi(),
        { safeRe: yd, t: Ed } = lr(),
        Ps = xs(),
        Ds = tn(),
        _d = we(),
        vd = Ue();
});
var sn = g((mN, Cd) => {
    var WA = Ue(),
        GA = (e, t, r) => {
            try {
                t = new WA(t, r);
            } catch {
                return !1;
            }
            return t.test(e);
        };
    Cd.exports = GA;
});
var Td = g((gN, Sd) => {
    var VA = Ue(),
        YA = (e, t) =>
            new VA(e, t).set.map(r =>
                r
                    .map(n => n.value)
                    .join(" ")
                    .trim()
                    .split(" ")
            );
    Sd.exports = YA;
});
var Od = g((wN, bd) => {
    var zA = we(),
        XA = Ue(),
        JA = (e, t, r) => {
            let n = null,
                i = null,
                o = null;
            try {
                o = new XA(t, r);
            } catch {
                return null;
            }
            return (
                e.forEach(s => {
                    o.test(s) && (!n || i.compare(s) === -1) && ((n = s), (i = new zA(n, r)));
                }),
                n
            );
        };
    bd.exports = JA;
});
var Id = g((yN, xd) => {
    var KA = we(),
        QA = Ue(),
        ZA = (e, t, r) => {
            let n = null,
                i = null,
                o = null;
            try {
                o = new QA(t, r);
            } catch {
                return null;
            }
            return (
                e.forEach(s => {
                    o.test(s) && (!n || i.compare(s) === 1) && ((n = s), (i = new KA(n, r)));
                }),
                n
            );
        };
    xd.exports = ZA;
});
var Pd = g((EN, Rd) => {
    var qs = we(),
        eC = Ue(),
        Nd = rn(),
        tC = (e, t) => {
            e = new eC(e, t);
            let r = new qs("0.0.0");
            if (e.test(r) || ((r = new qs("0.0.0-0")), e.test(r))) return r;
            r = null;
            for (let n = 0; n < e.set.length; ++n) {
                let i = e.set[n],
                    o = null;
                i.forEach(s => {
                    let a = new qs(s.semver.version);
                    switch (s.operator) {
                        case ">":
                            a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), (a.raw = a.format());
                        case "":
                        case ">=":
                            (!o || Nd(a, o)) && (o = a);
                            break;
                        case "<":
                        case "<=":
                            break;
                        default:
                            throw new Error("Unexpected operation: ".concat(s.operator));
                    }
                }),
                    o && (!r || Nd(r, o)) && (r = o);
            }
            return r && e.test(r) ? r : null;
        };
    Rd.exports = tC;
});
var Fd = g((_N, Dd) => {
    var rC = Ue(),
        nC = (e, t) => {
            try {
                return new rC(e, t).range || "*";
            } catch {
                return null;
            }
        };
    Dd.exports = nC;
});
var _i = g((vN, $d) => {
    var iC = we(),
        Ud = nn(),
        { ANY: oC } = Ud,
        sC = Ue(),
        aC = sn(),
        qd = rn(),
        Ld = mi(),
        lC = wi(),
        uC = gi(),
        cC = (e, t, r, n) => {
            (e = new iC(e, n)), (t = new sC(t, n));
            let i, o, s, a, l;
            switch (r) {
                case ">":
                    (i = qd), (o = lC), (s = Ld), (a = ">"), (l = ">=");
                    break;
                case "<":
                    (i = Ld), (o = uC), (s = qd), (a = "<"), (l = "<=");
                    break;
                default:
                    throw new TypeError('Must provide a hilo val of "<" or ">"');
            }
            if (aC(e, t, n)) return !1;
            for (let d = 0; d < t.set.length; ++d) {
                let c = t.set[d],
                    f = null,
                    m = null;
                if (
                    (c.forEach(p => {
                        p.semver === oC && (p = new Ud(">=0.0.0")),
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
    $d.exports = cC;
});
var Md = g((AN, kd) => {
    var fC = _i(),
        hC = (e, t, r) => fC(e, t, ">", r);
    kd.exports = hC;
});
var Hd = g((CN, Bd) => {
    var dC = _i(),
        pC = (e, t, r) => dC(e, t, "<", r);
    Bd.exports = pC;
});
var Gd = g((SN, Wd) => {
    var jd = Ue(),
        mC = (e, t, r) => ((e = new jd(e, r)), (t = new jd(t, r)), e.intersects(t, r));
    Wd.exports = mC;
});
var Yd = g((TN, Vd) => {
    var gC = sn(),
        wC = Le();
    Vd.exports = (e, t, r) => {
        let n = [],
            i = null,
            o = null,
            s = e.sort((c, f) => wC(c, f, r));
        for (let c of s) gC(c, t, r) ? ((o = c), i || (i = c)) : (o && n.push([i, o]), (o = null), (i = null));
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
var Zd = g((bN, Qd) => {
    var zd = Ue(),
        Us = nn(),
        { ANY: Ls } = Us,
        an = sn(),
        $s = Le(),
        yC = (e, t, r = {}) => {
            if (e === t) return !0;
            (e = new zd(e, r)), (t = new zd(t, r));
            let n = !1;
            e: for (let i of e.set) {
                for (let o of t.set) {
                    let s = _C(i, o, r);
                    if (((n = n || s !== null), s)) continue e;
                }
                if (n) return !1;
            }
            return !0;
        },
        EC = [new Us(">=0.0.0-0")],
        Xd = [new Us(">=0.0.0")],
        _C = (e, t, r) => {
            if (e === t) return !0;
            if (e.length === 1 && e[0].semver === Ls) {
                if (t.length === 1 && t[0].semver === Ls) return !0;
                r.includePrerelease ? (e = EC) : (e = Xd);
            }
            if (t.length === 1 && t[0].semver === Ls) {
                if (r.includePrerelease) return !0;
                t = Xd;
            }
            let n = new Set(),
                i,
                o;
            for (let p of e)
                p.operator === ">" || p.operator === ">="
                    ? (i = Jd(i, p, r))
                    : p.operator === "<" || p.operator === "<="
                    ? (o = Kd(o, p, r))
                    : n.add(p.semver);
            if (n.size > 1) return null;
            let s;
            if (i && o) {
                if (((s = $s(i.semver, o.semver, r)), s > 0)) return null;
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
                        if (((a = Jd(i, p, r)), a === p && a !== i)) return !1;
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
                        if (((l = Kd(o, p, r)), l === p && l !== o)) return !1;
                    } else if (o.operator === "<=" && !an(o.semver, String(p), r)) return !1;
                }
                if (!p.operator && (o || i) && s !== 0) return !1;
            }
            return !((i && d && !o && s !== 0) || (o && c && !i && s !== 0) || m || f);
        },
        Jd = (e, t, r) => {
            if (!e) return t;
            let n = $s(e.semver, t.semver, r);
            return n > 0 ? e : n < 0 || (t.operator === ">" && e.operator === ">=") ? t : e;
        },
        Kd = (e, t, r) => {
            if (!e) return t;
            let n = $s(e.semver, t.semver, r);
            return n < 0 ? e : n > 0 || (t.operator === "<" && e.operator === "<=") ? t : e;
        };
    Qd.exports = yC;
});
var Ms = g((ON, rp) => {
    var ks = lr(),
        ep = en(),
        vC = we(),
        tp = Ss(),
        AC = Dt(),
        CC = Oh(),
        SC = Ih(),
        TC = Ph(),
        bC = qh(),
        OC = Uh(),
        xC = kh(),
        IC = Bh(),
        NC = jh(),
        RC = Le(),
        PC = Yh(),
        DC = Xh(),
        FC = pi(),
        qC = Zh(),
        LC = td(),
        UC = rn(),
        $C = mi(),
        kC = bs(),
        MC = Os(),
        BC = gi(),
        HC = wi(),
        jC = xs(),
        WC = cd(),
        GC = nn(),
        VC = Ue(),
        YC = sn(),
        zC = Td(),
        XC = Od(),
        JC = Id(),
        KC = Pd(),
        QC = Fd(),
        ZC = _i(),
        eS = Md(),
        tS = Hd(),
        rS = Gd(),
        nS = Yd(),
        iS = Zd();
    rp.exports = {
        parse: AC,
        valid: CC,
        clean: SC,
        inc: TC,
        diff: bC,
        major: OC,
        minor: xC,
        patch: IC,
        prerelease: NC,
        compare: RC,
        rcompare: PC,
        compareLoose: DC,
        compareBuild: FC,
        sort: qC,
        rsort: LC,
        gt: UC,
        lt: $C,
        eq: kC,
        neq: MC,
        gte: BC,
        lte: HC,
        cmp: jC,
        coerce: WC,
        Comparator: GC,
        Range: VC,
        satisfies: YC,
        toComparators: zC,
        maxSatisfying: XC,
        minSatisfying: JC,
        minVersion: KC,
        validRange: QC,
        outside: ZC,
        gtr: eS,
        ltr: tS,
        intersects: rS,
        simplifyRange: nS,
        subset: iS,
        SemVer: vC,
        re: ks.re,
        src: ks.src,
        tokens: ks.t,
        SEMVER_SPEC_VERSION: ep.SEMVER_SPEC_VERSION,
        RELEASE_TYPES: ep.RELEASE_TYPES,
        compareIdentifiers: tp.compareIdentifiers,
        rcompareIdentifiers: tp.rcompareIdentifiers
    };
});
var Up = g((ln, fr) => {
    var oS = 200,
        Ks = "__lodash_hash_undefined__",
        xi = 1,
        pp = 2,
        mp = 9007199254740991,
        vi = "[object Arguments]",
        Ws = "[object Array]",
        sS = "[object AsyncFunction]",
        gp = "[object Boolean]",
        wp = "[object Date]",
        yp = "[object Error]",
        Ep = "[object Function]",
        aS = "[object GeneratorFunction]",
        Ai = "[object Map]",
        _p = "[object Number]",
        lS = "[object Null]",
        cr = "[object Object]",
        np = "[object Promise]",
        uS = "[object Proxy]",
        vp = "[object RegExp]",
        Ci = "[object Set]",
        Ap = "[object String]",
        cS = "[object Symbol]",
        fS = "[object Undefined]",
        Gs = "[object WeakMap]",
        Cp = "[object ArrayBuffer]",
        Si = "[object DataView]",
        hS = "[object Float32Array]",
        dS = "[object Float64Array]",
        pS = "[object Int8Array]",
        mS = "[object Int16Array]",
        gS = "[object Int32Array]",
        wS = "[object Uint8Array]",
        yS = "[object Uint8ClampedArray]",
        ES = "[object Uint16Array]",
        _S = "[object Uint32Array]",
        vS = /[\\^$.*+?()[\]{}|]/g,
        AS = /^\[object .+?Constructor\]$/,
        CS = /^(?:0|[1-9]\d*)$/,
        J = {};
    J[hS] = J[dS] = J[pS] = J[mS] = J[gS] = J[wS] = J[yS] = J[ES] = J[_S] = !0;
    J[vi] = J[Ws] = J[Cp] = J[gp] = J[Si] = J[wp] = J[yp] = J[Ep] = J[Ai] = J[_p] = J[cr] = J[vp] = J[Ci] = J[Ap] = J[Gs] = !1;
    var Sp = typeof global == "object" && global && global.Object === Object && global,
        SS = typeof self == "object" && self && self.Object === Object && self,
        et = Sp || SS || Function("return this")(),
        Tp = typeof ln == "object" && ln && !ln.nodeType && ln,
        ip = Tp && typeof fr == "object" && fr && !fr.nodeType && fr,
        bp = ip && ip.exports === Tp,
        Bs = bp && Sp.process,
        op = (function () {
            try {
                return Bs && Bs.binding && Bs.binding("util");
            } catch {}
        })(),
        sp = op && op.isTypedArray;
    function TS(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
            var s = e[r];
            t(s, r, e) && (o[i++] = s);
        }
        return o;
    }
    function bS(e, t) {
        for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
        return e;
    }
    function OS(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length; ++r < n; ) if (t(e[r], r, e)) return !0;
        return !1;
    }
    function xS(e, t) {
        for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
        return n;
    }
    function IS(e) {
        return function (t) {
            return e(t);
        };
    }
    function NS(e, t) {
        return e.has(t);
    }
    function RS(e, t) {
        return e?.[t];
    }
    function PS(e) {
        var t = -1,
            r = Array(e.size);
        return (
            e.forEach(function (n, i) {
                r[++t] = [i, n];
            }),
            r
        );
    }
    function DS(e, t) {
        return function (r) {
            return e(t(r));
        };
    }
    function FS(e) {
        var t = -1,
            r = Array(e.size);
        return (
            e.forEach(function (n) {
                r[++t] = n;
            }),
            r
        );
    }
    var qS = Array.prototype,
        LS = Function.prototype,
        Ii = Object.prototype,
        Hs = et["__core-js_shared__"],
        Op = LS.toString,
        Ve = Ii.hasOwnProperty,
        ap = (function () {
            var e = /[^.]+$/.exec((Hs && Hs.keys && Hs.keys.IE_PROTO) || "");
            return e ? "Symbol(src)_1." + e : "";
        })(),
        xp = Ii.toString,
        US = RegExp(
            "^" +
                Op.call(Ve)
                    .replace(vS, "\\$&")
                    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") +
                "$"
        ),
        lp = bp ? et.Buffer : void 0,
        Ti = et.Symbol,
        up = et.Uint8Array,
        Ip = Ii.propertyIsEnumerable,
        $S = qS.splice,
        Ft = Ti ? Ti.toStringTag : void 0,
        cp = Object.getOwnPropertySymbols,
        kS = lp ? lp.isBuffer : void 0,
        MS = DS(Object.keys, Object),
        Vs = hr(et, "DataView"),
        un = hr(et, "Map"),
        Ys = hr(et, "Promise"),
        zs = hr(et, "Set"),
        Xs = hr(et, "WeakMap"),
        cn = hr(Object, "create"),
        BS = Ut(Vs),
        HS = Ut(un),
        jS = Ut(Ys),
        WS = Ut(zs),
        GS = Ut(Xs),
        fp = Ti ? Ti.prototype : void 0,
        js = fp ? fp.valueOf : void 0;
    function qt(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function VS() {
        (this.__data__ = cn ? cn(null) : {}), (this.size = 0);
    }
    function YS(e) {
        var t = this.has(e) && delete this.__data__[e];
        return (this.size -= t ? 1 : 0), t;
    }
    function zS(e) {
        var t = this.__data__;
        if (cn) {
            var r = t[e];
            return r === Ks ? void 0 : r;
        }
        return Ve.call(t, e) ? t[e] : void 0;
    }
    function XS(e) {
        var t = this.__data__;
        return cn ? t[e] !== void 0 : Ve.call(t, e);
    }
    function JS(e, t) {
        var r = this.__data__;
        return (this.size += this.has(e) ? 0 : 1), (r[e] = cn && t === void 0 ? Ks : t), this;
    }
    qt.prototype.clear = VS;
    qt.prototype.delete = YS;
    qt.prototype.get = zS;
    qt.prototype.has = XS;
    qt.prototype.set = JS;
    function tt(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function KS() {
        (this.__data__ = []), (this.size = 0);
    }
    function QS(e) {
        var t = this.__data__,
            r = Ni(t, e);
        if (r < 0) return !1;
        var n = t.length - 1;
        return r == n ? t.pop() : $S.call(t, r, 1), --this.size, !0;
    }
    function ZS(e) {
        var t = this.__data__,
            r = Ni(t, e);
        return r < 0 ? void 0 : t[r][1];
    }
    function eT(e) {
        return Ni(this.__data__, e) > -1;
    }
    function tT(e, t) {
        var r = this.__data__,
            n = Ni(r, e);
        return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    tt.prototype.clear = KS;
    tt.prototype.delete = QS;
    tt.prototype.get = ZS;
    tt.prototype.has = eT;
    tt.prototype.set = tT;
    function Lt(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function rT() {
        (this.size = 0), (this.__data__ = { hash: new qt(), map: new (un || tt)(), string: new qt() });
    }
    function nT(e) {
        var t = Ri(this, e).delete(e);
        return (this.size -= t ? 1 : 0), t;
    }
    function iT(e) {
        return Ri(this, e).get(e);
    }
    function oT(e) {
        return Ri(this, e).has(e);
    }
    function sT(e, t) {
        var r = Ri(this, e),
            n = r.size;
        return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    Lt.prototype.clear = rT;
    Lt.prototype.delete = nT;
    Lt.prototype.get = iT;
    Lt.prototype.has = oT;
    Lt.prototype.set = sT;
    function bi(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.__data__ = new Lt(); ++t < r; ) this.add(e[t]);
    }
    function aT(e) {
        return this.__data__.set(e, Ks), this;
    }
    function lT(e) {
        return this.__data__.has(e);
    }
    bi.prototype.add = bi.prototype.push = aT;
    bi.prototype.has = lT;
    function mt(e) {
        var t = (this.__data__ = new tt(e));
        this.size = t.size;
    }
    function uT() {
        (this.__data__ = new tt()), (this.size = 0);
    }
    function cT(e) {
        var t = this.__data__,
            r = t.delete(e);
        return (this.size = t.size), r;
    }
    function fT(e) {
        return this.__data__.get(e);
    }
    function hT(e) {
        return this.__data__.has(e);
    }
    function dT(e, t) {
        var r = this.__data__;
        if (r instanceof tt) {
            var n = r.__data__;
            if (!un || n.length < oS - 1) return n.push([e, t]), (this.size = ++r.size), this;
            r = this.__data__ = new Lt(n);
        }
        return r.set(e, t), (this.size = r.size), this;
    }
    mt.prototype.clear = uT;
    mt.prototype.delete = cT;
    mt.prototype.get = fT;
    mt.prototype.has = hT;
    mt.prototype.set = dT;
    function pT(e, t) {
        var r = Oi(e),
            n = !r && IT(e),
            i = !r && !n && Js(e),
            o = !r && !n && !i && Lp(e),
            s = r || n || i || o,
            a = s ? xS(e.length, String) : [],
            l = a.length;
        for (var d in e)
            (t || Ve.call(e, d)) &&
                !(
                    s &&
                    (d == "length" ||
                        (i && (d == "offset" || d == "parent")) ||
                        (o && (d == "buffer" || d == "byteLength" || d == "byteOffset")) ||
                        ST(d, l))
                ) &&
                a.push(d);
        return a;
    }
    function Ni(e, t) {
        for (var r = e.length; r--; ) if (Pp(e[r][0], t)) return r;
        return -1;
    }
    function mT(e, t, r) {
        var n = t(e);
        return Oi(e) ? n : bS(n, r(e));
    }
    function hn(e) {
        return e == null ? (e === void 0 ? fS : lS) : Ft && Ft in Object(e) ? AT(e) : xT(e);
    }
    function hp(e) {
        return fn(e) && hn(e) == vi;
    }
    function Np(e, t, r, n, i) {
        return e === t ? !0 : e == null || t == null || (!fn(e) && !fn(t)) ? e !== e && t !== t : gT(e, t, r, n, Np, i);
    }
    function gT(e, t, r, n, i, o) {
        var s = Oi(e),
            a = Oi(t),
            l = s ? Ws : pt(e),
            d = a ? Ws : pt(t);
        (l = l == vi ? cr : l), (d = d == vi ? cr : d);
        var c = l == cr,
            f = d == cr,
            m = l == d;
        if (m && Js(e)) {
            if (!Js(t)) return !1;
            (s = !0), (c = !1);
        }
        if (m && !c) return o || (o = new mt()), s || Lp(e) ? Rp(e, t, r, n, i, o) : _T(e, t, l, r, n, i, o);
        if (!(r & xi)) {
            var p = c && Ve.call(e, "__wrapped__"),
                E = f && Ve.call(t, "__wrapped__");
            if (p || E) {
                var _ = p ? e.value() : e,
                    A = E ? t.value() : t;
                return o || (o = new mt()), i(_, A, r, n, o);
            }
        }
        return m ? (o || (o = new mt()), vT(e, t, r, n, i, o)) : !1;
    }
    function wT(e) {
        if (!qp(e) || bT(e)) return !1;
        var t = Dp(e) ? US : AS;
        return t.test(Ut(e));
    }
    function yT(e) {
        return fn(e) && Fp(e.length) && !!J[hn(e)];
    }
    function ET(e) {
        if (!OT(e)) return MS(e);
        var t = [];
        for (var r in Object(e)) Ve.call(e, r) && r != "constructor" && t.push(r);
        return t;
    }
    function Rp(e, t, r, n, i, o) {
        var s = r & xi,
            a = e.length,
            l = t.length;
        if (a != l && !(s && l > a)) return !1;
        var d = o.get(e);
        if (d && o.get(t)) return d == t;
        var c = -1,
            f = !0,
            m = r & pp ? new bi() : void 0;
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
                    !OS(t, function (A, T) {
                        if (!NS(m, T) && (p === A || i(p, A, r, n, o))) return m.push(T);
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
    function _T(e, t, r, n, i, o, s) {
        switch (r) {
            case Si:
                if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
                (e = e.buffer), (t = t.buffer);
            case Cp:
                return !(e.byteLength != t.byteLength || !o(new up(e), new up(t)));
            case gp:
            case wp:
            case _p:
                return Pp(+e, +t);
            case yp:
                return e.name == t.name && e.message == t.message;
            case vp:
            case Ap:
                return e == t + "";
            case Ai:
                var a = PS;
            case Ci:
                var l = n & xi;
                if ((a || (a = FS), e.size != t.size && !l)) return !1;
                var d = s.get(e);
                if (d) return d == t;
                (n |= pp), s.set(e, t);
                var c = Rp(a(e), a(t), n, i, o, s);
                return s.delete(e), c;
            case cS:
                if (js) return js.call(e) == js.call(t);
        }
        return !1;
    }
    function vT(e, t, r, n, i, o) {
        var s = r & xi,
            a = dp(e),
            l = a.length,
            d = dp(t),
            c = d.length;
        if (l != c && !s) return !1;
        for (var f = l; f--; ) {
            var m = a[f];
            if (!(s ? m in t : Ve.call(t, m))) return !1;
        }
        var p = o.get(e);
        if (p && o.get(t)) return p == t;
        var E = !0;
        o.set(e, t), o.set(t, e);
        for (var _ = s; ++f < l; ) {
            m = a[f];
            var A = e[m],
                T = t[m];
            if (n) var S = s ? n(T, A, m, t, e, o) : n(A, T, m, e, t, o);
            if (!(S === void 0 ? A === T || i(A, T, r, n, o) : S)) {
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
    function dp(e) {
        return mT(e, PT, CT);
    }
    function Ri(e, t) {
        var r = e.__data__;
        return TT(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    function hr(e, t) {
        var r = RS(e, t);
        return wT(r) ? r : void 0;
    }
    function AT(e) {
        var t = Ve.call(e, Ft),
            r = e[Ft];
        try {
            e[Ft] = void 0;
            var n = !0;
        } catch {}
        var i = xp.call(e);
        return n && (t ? (e[Ft] = r) : delete e[Ft]), i;
    }
    var CT = cp
            ? function (e) {
                  return e == null
                      ? []
                      : ((e = Object(e)),
                        TS(cp(e), function (t) {
                            return Ip.call(e, t);
                        }));
              }
            : DT,
        pt = hn;
    ((Vs && pt(new Vs(new ArrayBuffer(1))) != Si) ||
        (un && pt(new un()) != Ai) ||
        (Ys && pt(Ys.resolve()) != np) ||
        (zs && pt(new zs()) != Ci) ||
        (Xs && pt(new Xs()) != Gs)) &&
        (pt = function (e) {
            var t = hn(e),
                r = t == cr ? e.constructor : void 0,
                n = r ? Ut(r) : "";
            if (n)
                switch (n) {
                    case BS:
                        return Si;
                    case HS:
                        return Ai;
                    case jS:
                        return np;
                    case WS:
                        return Ci;
                    case GS:
                        return Gs;
                }
            return t;
        });
    function ST(e, t) {
        return (t = t ?? mp), !!t && (typeof e == "number" || CS.test(e)) && e > -1 && e % 1 == 0 && e < t;
    }
    function TT(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
    }
    function bT(e) {
        return !!ap && ap in e;
    }
    function OT(e) {
        var t = e && e.constructor,
            r = (typeof t == "function" && t.prototype) || Ii;
        return e === r;
    }
    function xT(e) {
        return xp.call(e);
    }
    function Ut(e) {
        if (e != null) {
            try {
                return Op.call(e);
            } catch {}
            try {
                return e + "";
            } catch {}
        }
        return "";
    }
    function Pp(e, t) {
        return e === t || (e !== e && t !== t);
    }
    var IT = hp(
            (function () {
                return arguments;
            })()
        )
            ? hp
            : function (e) {
                  return fn(e) && Ve.call(e, "callee") && !Ip.call(e, "callee");
              },
        Oi = Array.isArray;
    function NT(e) {
        return e != null && Fp(e.length) && !Dp(e);
    }
    var Js = kS || FT;
    function RT(e, t) {
        return Np(e, t);
    }
    function Dp(e) {
        if (!qp(e)) return !1;
        var t = hn(e);
        return t == Ep || t == aS || t == sS || t == uS;
    }
    function Fp(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= mp;
    }
    function qp(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
    }
    function fn(e) {
        return e != null && typeof e == "object";
    }
    var Lp = sp ? IS(sp) : yT;
    function PT(e) {
        return NT(e) ? pT(e) : ET(e);
    }
    function DT() {
        return [];
    }
    function FT() {
        return !1;
    }
    fr.exports = RT;
});
var kp = g(pn => {
    "use strict";
    Object.defineProperty(pn, "__esModule", { value: !0 });
    pn.DownloadedUpdateHelper = void 0;
    pn.createTempUpdateFile = $T;
    var qT = require("crypto"),
        LT = require("fs"),
        $p = Up(),
        $t = Ke(),
        dn = require("path"),
        Qs = class {
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
                    return $p(this.versionInfo, r) && $p(this.fileInfo.info, n.info) && (await (0, $t.pathExists)(t)) ? t : null;
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
                let l = await UT(a);
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
    pn.DownloadedUpdateHelper = Qs;
    function UT(e, t = "sha512", r = "base64", n) {
        return new Promise((i, o) => {
            let s = (0, qT.createHash)(t);
            s.on("error", o).setEncoding(r),
                (0, LT.createReadStream)(e, { ...n, highWaterMark: 1024 * 1024 })
                    .on("error", o)
                    .on("end", () => {
                        s.end(), i(s.read());
                    })
                    .pipe(s, { end: !1 });
        });
    }
    async function $T(e, t, r) {
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
var Mp = g(ea => {
    "use strict";
    Object.defineProperty(ea, "__esModule", { value: !0 });
    ea.getAppCacheDir = MT;
    var Zs = require("path"),
        kT = require("os");
    function MT() {
        let e = (0, kT.homedir)(),
            t;
        return (
            process.platform === "win32"
                ? (t = process.env.LOCALAPPDATA || Zs.join(e, "AppData", "Local"))
                : process.platform === "darwin"
                ? (t = Zs.join(e, "Library", "Caches"))
                : (t = process.env.XDG_CACHE_HOME || Zs.join(e, ".cache")),
            t
        );
    }
});
var Hp = g(Pi => {
    "use strict";
    Object.defineProperty(Pi, "__esModule", { value: !0 });
    Pi.ElectronAppAdapter = void 0;
    var Bp = require("path"),
        BT = Mp(),
        ta = class {
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
                    ? Bp.join(process.resourcesPath, "app-update.yml")
                    : Bp.join(this.app.getAppPath(), "dev-app-update.yml");
            }
            get userDataPath() {
                return this.app.getPath("userData");
            }
            get baseCachePath() {
                return (0, BT.getAppCacheDir)();
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
    Pi.ElectronAppAdapter = ta;
});
var Wp = g(gt => {
    "use strict";
    Object.defineProperty(gt, "__esModule", { value: !0 });
    gt.ElectronHttpExecutor = gt.NET_SESSION_NAME = void 0;
    gt.getNetSession = jp;
    var Di = ue();
    gt.NET_SESSION_NAME = "electron-updater";
    function jp() {
        return require("electron").session.fromPartition(gt.NET_SESSION_NAME, { cache: !1 });
    }
    var ra = class extends Di.HttpExecutor {
        constructor(t) {
            super(), (this.proxyLoginCallback = t), (this.cachedSession = null);
        }
        async download(t, r, n) {
            return await n.cancellationToken.createPromise((i, o, s) => {
                let a = { headers: n.headers || void 0, redirect: "manual" };
                (0, Di.configureRequestUrl)(t, a),
                    (0, Di.configureRequestOptions)(a),
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
                this.cachedSession == null && (this.cachedSession = jp());
            let n = require("electron").net.request({ ...t, session: this.cachedSession });
            return n.on("response", r), this.proxyLoginCallback != null && n.on("login", this.proxyLoginCallback), n;
        }
        addRedirectHandlers(t, r, n, i, o) {
            t.on("redirect", (s, a, l) => {
                t.abort(),
                    i > this.maxRedirects ? n(this.createMaxRedirectError()) : o(Di.HttpExecutor.prepareRedirectUrlOptions(l, r));
            });
        }
    };
    gt.ElectronHttpExecutor = ra;
});
var Jp = g((PN, Xp) => {
    var HT = 1 / 0,
        jT = "[object Symbol]",
        zp = /[\\^$.*+?()[\]{}|]/g,
        WT = RegExp(zp.source),
        GT = typeof global == "object" && global && global.Object === Object && global,
        VT = typeof self == "object" && self && self.Object === Object && self,
        YT = GT || VT || Function("return this")(),
        zT = Object.prototype,
        XT = zT.toString,
        Gp = YT.Symbol,
        Vp = Gp ? Gp.prototype : void 0,
        Yp = Vp ? Vp.toString : void 0;
    function JT(e) {
        if (typeof e == "string") return e;
        if (QT(e)) return Yp ? Yp.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -HT ? "-0" : t;
    }
    function KT(e) {
        return !!e && typeof e == "object";
    }
    function QT(e) {
        return typeof e == "symbol" || (KT(e) && XT.call(e) == jT);
    }
    function ZT(e) {
        return e == null ? "" : JT(e);
    }
    function eb(e) {
        return (e = ZT(e)), e && WT.test(e) ? e.replace(zp, "\\$&") : e;
    }
    Xp.exports = eb;
});
var wt = g(dr => {
    "use strict";
    Object.defineProperty(dr, "__esModule", { value: !0 });
    dr.newBaseUrl = rb;
    dr.newUrlFromBase = na;
    dr.getChannelFilename = nb;
    dr.blockmapFiles = ib;
    var Kp = require("url"),
        tb = Jp();
    function rb(e) {
        let t = new Kp.URL(e);
        return t.pathname.endsWith("/") || (t.pathname += "/"), t;
    }
    function na(e, t, r = !1) {
        let n = new Kp.URL(e, t),
            i = t.search;
        return i != null && i.length !== 0 ? (n.search = i) : r && (n.search = "noCache=".concat(Date.now().toString(32))), n;
    }
    function nb(e) {
        return "".concat(e, ".yml");
    }
    function ib(e, t, r) {
        let n = na("".concat(e.pathname, ".blockmap"), e);
        return [na("".concat(e.pathname.replace(new RegExp(tb(r), "g"), t), ".blockmap"), e), n];
    }
});
var $e = g(Et => {
    "use strict";
    Object.defineProperty(Et, "__esModule", { value: !0 });
    Et.Provider = void 0;
    Et.findFile = sb;
    Et.parseUpdateInfo = ab;
    Et.getFileList = Zp;
    Et.resolveFiles = lb;
    var yt = ue(),
        ob = ui(),
        Qp = wt(),
        ia = class {
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
    Et.Provider = ia;
    function sb(e, t, r) {
        if (e.length === 0) throw (0, yt.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
        let n = e.find(i => i.url.pathname.toLowerCase().endsWith(".".concat(t)));
        return n ?? (r == null ? e[0] : e.find(i => !r.some(o => i.url.pathname.toLowerCase().endsWith(".".concat(o)))));
    }
    function ab(e, t, r) {
        if (e == null)
            throw (0, yt.newError)(
                "Cannot parse update info from ".concat(t, " in the latest release artifacts (").concat(r, "): rawData: null"),
                "ERR_UPDATER_INVALID_UPDATE_INFO"
            );
        let n;
        try {
            n = (0, ob.load)(e);
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
    function Zp(e) {
        let t = e.files;
        if (t != null && t.length > 0) return t;
        if (e.path != null) return [{ url: e.path, sha2: e.sha2, sha512: e.sha512 }];
        throw (0, yt.newError)("No files provided: ".concat((0, yt.safeStringifyJson)(e)), "ERR_UPDATER_NO_FILES_PROVIDED");
    }
    function lb(e, t, r = n => n) {
        let i = Zp(e).map(a => {
                if (a.sha2 == null && a.sha512 == null)
                    throw (0, yt.newError)(
                        "Update info doesn't contain nor sha256 neither sha512 checksum: ".concat((0, yt.safeStringifyJson)(a)),
                        "ERR_UPDATER_NO_CHECKSUM"
                    );
                return { url: (0, Qp.newUrlFromBase)(r(a.url), t), info: a };
            }),
            o = e.packages,
            s = o == null ? null : o[process.arch] || o.ia32;
        return s != null && (i[0].packageInfo = { ...s, path: (0, Qp.newUrlFromBase)(r(s.path), t).href }), i;
    }
});
var la = g(Fi => {
    "use strict";
    Object.defineProperty(Fi, "__esModule", { value: !0 });
    Fi.GenericProvider = void 0;
    var em = ue(),
        oa = wt(),
        sa = $e(),
        aa = class extends sa.Provider {
            constructor(t, r, n) {
                super(n),
                    (this.configuration = t),
                    (this.updater = r),
                    (this.baseUrl = (0, oa.newBaseUrl)(this.configuration.url));
            }
            get channel() {
                let t = this.updater.channel || this.configuration.channel;
                return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
            }
            async getLatestVersion() {
                let t = (0, oa.getChannelFilename)(this.channel),
                    r = (0, oa.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
                for (let n = 0; ; n++)
                    try {
                        return (0, sa.parseUpdateInfo)(await this.httpRequest(r), t, r);
                    } catch (i) {
                        if (i instanceof em.HttpError && i.statusCode === 404)
                            throw (0, em.newError)(
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
                return (0, sa.resolveFiles)(t, this.baseUrl);
            }
        };
    Fi.GenericProvider = aa;
});
var rm = g(qi => {
    "use strict";
    Object.defineProperty(qi, "__esModule", { value: !0 });
    qi.BitbucketProvider = void 0;
    var tm = ue(),
        ua = wt(),
        ca = $e(),
        fa = class extends ca.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }), (this.configuration = t), (this.updater = r);
                let { owner: i, slug: o } = t;
                this.baseUrl = (0, ua.newBaseUrl)(
                    "https://api.bitbucket.org/2.0/repositories/".concat(i, "/").concat(o, "/downloads")
                );
            }
            get channel() {
                return this.updater.channel || this.configuration.channel || "latest";
            }
            async getLatestVersion() {
                let t = new tm.CancellationToken(),
                    r = (0, ua.getChannelFilename)(this.getCustomChannelName(this.channel)),
                    n = (0, ua.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
                try {
                    let i = await this.httpRequest(n, void 0, t);
                    return (0, ca.parseUpdateInfo)(i, r, n);
                } catch (i) {
                    throw (0, tm.newError)(
                        "Unable to find latest version on "
                            .concat(this.toString(), ", please ensure release exists: ")
                            .concat(i.stack || i.message),
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            resolveFiles(t) {
                return (0, ca.resolveFiles)(t, this.baseUrl);
            }
            toString() {
                let { owner: t, slug: r } = this.configuration;
                return "Bitbucket (owner: ".concat(t, ", slug: ").concat(r, ", channel: ").concat(this.channel, ")");
            }
        };
    qi.BitbucketProvider = fa;
});
var ma = g(kt => {
    "use strict";
    Object.defineProperty(kt, "__esModule", { value: !0 });
    kt.GitHubProvider = kt.BaseGitHubProvider = void 0;
    kt.computeReleaseNotes = im;
    var rt = ue(),
        pr = Ms(),
        ub = require("url"),
        mr = wt(),
        da = $e(),
        ha = /\/tag\/([^/]+)$/,
        Li = class extends da.Provider {
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
    kt.BaseGitHubProvider = Li;
    var pa = class extends Li {
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
                    if (A === null) c = ha.exec(d.element("link").attribute("href"))[1];
                    else
                        for (let T of l.getElements("entry")) {
                            let S = ha.exec(T.element("link").attribute("href"));
                            if (S === null) continue;
                            let N = S[1],
                                L = ((n = pr.prerelease(N)) === null || n === void 0 ? void 0 : n[0]) || null,
                                Fe = !A || ["alpha", "beta"].includes(A),
                                Y = L !== null && !["alpha", "beta"].includes(String(L));
                            if (Fe && !Y && !(A === "beta" && L === "alpha")) {
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
                        if (ha.exec(A.element("link").attribute("href"))[1] === c) {
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
                    } catch (S) {
                        throw S instanceof rt.HttpError && S.statusCode === 404
                            ? (0, rt.newError)(
                                  "Cannot find "
                                      .concat(m, " in the latest release artifacts (")
                                      .concat(p, "): ")
                                      .concat(S.stack || S.message),
                                  "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                              )
                            : S;
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
            let _ = (0, da.parseUpdateInfo)(f, m, p);
            return (
                _.releaseName == null && (_.releaseName = d.elementValueOrEmpty("title")),
                _.releaseNotes == null && (_.releaseNotes = im(this.updater.currentVersion, this.updater.fullChangelog, l, d)),
                { tag: c, ..._ }
            );
        }
        async getLatestTagName(t) {
            let r = this.options,
                n =
                    r.host == null || r.host === "github.com"
                        ? (0, mr.newUrlFromBase)("".concat(this.basePath, "/latest"), this.baseUrl)
                        : new ub.URL(
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
            return (0, da.resolveFiles)(t, this.baseUrl, r => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
        }
        getBaseDownloadPath(t, r) {
            return "".concat(this.basePath, "/download/").concat(t, "/").concat(r);
        }
    };
    kt.GitHubProvider = pa;
    function nm(e) {
        let t = e.elementValueOrEmpty("content");
        return t === "No content." ? "" : t;
    }
    function im(e, t, r, n) {
        if (!t) return nm(n);
        let i = [];
        for (let o of r.getElements("entry")) {
            let s = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
            pr.lt(e, s) && i.push({ version: s, note: nm(o) });
        }
        return i.sort((o, s) => pr.rcompare(o.version, s.version));
    }
});
var sm = g(Ui => {
    "use strict";
    Object.defineProperty(Ui, "__esModule", { value: !0 });
    Ui.KeygenProvider = void 0;
    var om = ue(),
        ga = wt(),
        wa = $e(),
        ya = class extends wa.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }),
                    (this.configuration = t),
                    (this.updater = r),
                    (this.baseUrl = (0, ga.newBaseUrl)(
                        "https://api.keygen.sh/v1/accounts/"
                            .concat(this.configuration.account, "/artifacts?product=")
                            .concat(this.configuration.product)
                    ));
            }
            get channel() {
                return this.updater.channel || this.configuration.channel || "stable";
            }
            async getLatestVersion() {
                let t = new om.CancellationToken(),
                    r = (0, ga.getChannelFilename)(this.getCustomChannelName(this.channel)),
                    n = (0, ga.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
                try {
                    let i = await this.httpRequest(n, { "Accept": "application/vnd.api+json", "Keygen-Version": "1.1" }, t);
                    return (0, wa.parseUpdateInfo)(i, r, n);
                } catch (i) {
                    throw (0, om.newError)(
                        "Unable to find latest version on "
                            .concat(this.toString(), ", please ensure release exists: ")
                            .concat(i.stack || i.message),
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            resolveFiles(t) {
                return (0, wa.resolveFiles)(t, this.baseUrl);
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
    Ui.KeygenProvider = ya;
});
var um = g($i => {
    "use strict";
    Object.defineProperty($i, "__esModule", { value: !0 });
    $i.PrivateGitHubProvider = void 0;
    var gr = ue(),
        cb = ui(),
        fb = require("path"),
        am = require("url"),
        lm = wt(),
        hb = ma(),
        db = $e(),
        Ea = class extends hb.BaseGitHubProvider {
            constructor(t, r, n, i) {
                super(t, "api.github.com", i), (this.updater = r), (this.token = n);
            }
            createRequestOptions(t, r) {
                let n = super.createRequestOptions(t, r);
                return (n.redirect = "manual"), n;
            }
            async getLatestVersion() {
                let t = new gr.CancellationToken(),
                    r = (0, lm.getChannelFilename)(this.getDefaultChannelName()),
                    n = await this.getLatestVersionInfo(t),
                    i = n.assets.find(a => a.name === r);
                if (i == null)
                    throw (0, gr.newError)(
                        "Cannot find ".concat(r, " in the release ").concat(n.html_url || n.name),
                        "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                    );
                let o = new am.URL(i.url),
                    s;
                try {
                    s = (0, cb.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
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
                let i = (0, lm.newUrlFromBase)(n, this.baseUrl);
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
                return (0, db.getFileList)(t).map(r => {
                    let n = fb.posix.basename(r.url).replace(/ /g, "-"),
                        i = t.assets.find(o => o != null && o.name === n);
                    if (i == null)
                        throw (0, gr.newError)(
                            'Cannot find asset "'.concat(n, '" in: ').concat(JSON.stringify(t.assets, null, 2)),
                            "ERR_UPDATER_ASSET_NOT_FOUND"
                        );
                    return { url: new am.URL(i.url), info: r };
                });
            }
        };
    $i.PrivateGitHubProvider = Ea;
});
var hm = g(Mi => {
    "use strict";
    Object.defineProperty(Mi, "__esModule", { value: !0 });
    Mi.isUrlProbablySupportMultiRangeRequests = fm;
    Mi.createClient = yb;
    var ki = ue(),
        pb = rm(),
        cm = la(),
        mb = ma(),
        gb = sm(),
        wb = um();
    function fm(e) {
        return !e.includes("s3.amazonaws.com");
    }
    function yb(e, t, r) {
        if (typeof e == "string")
            throw (0, ki.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        let n = e.provider;
        switch (n) {
            case "github": {
                let i = e,
                    o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
                return o == null ? new mb.GitHubProvider(i, t, r) : new wb.PrivateGitHubProvider(i, t, o, r);
            }
            case "bitbucket":
                return new pb.BitbucketProvider(e, t, r);
            case "keygen":
                return new gb.KeygenProvider(e, t, r);
            case "s3":
            case "spaces":
                return new cm.GenericProvider(
                    { provider: "generic", url: (0, ki.getS3LikeProviderBaseUrl)(e), channel: e.channel || null },
                    t,
                    { ...r, isUseMultipleRangeRequest: !1 }
                );
            case "generic": {
                let i = e;
                return new cm.GenericProvider(i, t, {
                    ...r,
                    isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && fm(i.url)
                });
            }
            case "custom": {
                let i = e,
                    o = i.updateProvider;
                if (!o) throw (0, ki.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
                return new o(i, t, r);
            }
            default:
                throw (0, ki.newError)("Unsupported provider: ".concat(n), "ERR_UPDATER_UNSUPPORTED_PROVIDER");
        }
    }
});
var Bi = g(mn => {
    "use strict";
    Object.defineProperty(mn, "__esModule", { value: !0 });
    mn.OperationKind = void 0;
    mn.computeOperations = Eb;
    var Mt;
    (function (e) {
        (e[(e.COPY = 0)] = "COPY"), (e[(e.DOWNLOAD = 1)] = "DOWNLOAD");
    })(Mt || (mn.OperationKind = Mt = {}));
    function Eb(e, t, r) {
        let n = pm(e.files),
            i = pm(t.files),
            o = null,
            s = t.files[0],
            a = [],
            l = s.name,
            d = n.get(l);
        if (d == null) throw new Error("no file ".concat(l, " in old blockmap"));
        let c = i.get(l),
            f = 0,
            { checksumToOffset: m, checksumToOldSize: p } = vb(n.get(l), d.offset, r),
            E = s.offset;
        for (let _ = 0; _ < c.checksums.length; E += c.sizes[_], _++) {
            let A = c.sizes[_],
                T = c.checksums[_],
                S = m.get(T);
            S != null &&
                p.get(T) !== A &&
                (r.warn(
                    'Checksum ("'.concat(T, '") matches, but size differs (old: ').concat(p.get(T), ", new: ").concat(A, ")")
                ),
                (S = void 0)),
                S === void 0
                    ? (f++,
                      o != null && o.kind === Mt.DOWNLOAD && o.end === E
                          ? (o.end += A)
                          : ((o = { kind: Mt.DOWNLOAD, start: E, end: E + A }), dm(o, a, T, _)))
                    : o != null && o.kind === Mt.COPY && o.end === S
                    ? (o.end += A)
                    : ((o = { kind: Mt.COPY, start: S, end: S + A }), dm(o, a, T, _));
        }
        return f > 0 && r.info("File".concat(s.name === "file" ? "" : " " + s.name, " has ").concat(f, " changed blocks")), a;
    }
    var _b = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
    function dm(e, t, r, n) {
        if (_b && t.length !== 0) {
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
    function vb(e, t, r) {
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
    function pm(e) {
        let t = new Map();
        for (let r of e) t.set(r.name, r);
        return t;
    }
});
var va = g(gn => {
    "use strict";
    Object.defineProperty(gn, "__esModule", { value: !0 });
    gn.DataSplitter = void 0;
    gn.copyData = gm;
    var Hi = ue(),
        Ab = require("fs"),
        Cb = require("stream"),
        Sb = Bi(),
        mm = Buffer.from("\r\n\r\n"),
        _t;
    (function (e) {
        (e[(e.INIT = 0)] = "INIT"), (e[(e.HEADER = 1)] = "HEADER"), (e[(e.BODY = 2)] = "BODY");
    })(_t || (_t = {}));
    function gm(e, t, r, n, i) {
        let o = (0, Ab.createReadStream)("", { fd: r, autoClose: !1, start: e.start, end: e.end - 1 });
        o.on("error", n), o.once("end", i), o.pipe(t, { end: !1 });
    }
    var _a = class extends Cb.Writable {
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
                throw (0, Hi.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
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
                            else throw (0, Hi.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
                        let a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
                        if (a < s) await this.copyExistingData(a, s);
                        else if (a > s)
                            throw (0, Hi.newError)(
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
                    if (s.kind !== Sb.OperationKind.COPY) {
                        i(new Error("Task kind must be COPY"));
                        return;
                    }
                    gm(s, this.out, this.options.oldFileFd, i, () => {
                        t++, o();
                    });
                };
                o();
            });
        }
        searchHeaderListEnd(t, r) {
            let n = t.indexOf(mm, r);
            if (n !== -1) return n + mm.length;
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
                throw (0, Hi.newError)(
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
    gn.DataSplitter = _a;
});
var Em = g(ji => {
    "use strict";
    Object.defineProperty(ji, "__esModule", { value: !0 });
    ji.executeTasksUsingMultipleRangeRequests = Tb;
    ji.checkIsRangesSupported = Ca;
    var Aa = ue(),
        wm = va(),
        ym = Bi();
    function Tb(e, t, r, n, i) {
        let o = s => {
            if (s >= t.length) {
                e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
                return;
            }
            let a = s + 1e3;
            bb(e, { tasks: t, start: s, end: Math.min(t.length, a), oldFileFd: n }, r, () => o(a), i);
        };
        return o;
    }
    function bb(e, t, r, n, i) {
        let o = "bytes=",
            s = 0,
            a = new Map(),
            l = [];
        for (let f = t.start; f < t.end; f++) {
            let m = t.tasks[f];
            m.kind === ym.OperationKind.DOWNLOAD &&
                ((o += "".concat(m.start, "-").concat(m.end - 1, ", ")), a.set(s, f), s++, l.push(m.end - m.start));
        }
        if (s <= 1) {
            let f = m => {
                if (m >= t.end) {
                    n();
                    return;
                }
                let p = t.tasks[m++];
                if (p.kind === ym.OperationKind.COPY) (0, wm.copyData)(p, r, t.oldFileFd, i, () => f(m));
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
            let m = (0, Aa.safeGetHeader)(f, "content-type"),
                p = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(m);
            if (p == null) {
                i(new Error('Content-Type "multipart/byteranges" is expected, but got "'.concat(m, '"')));
                return;
            }
            let E = new wm.DataSplitter(r, t, a, p[1] || p[2], l, n);
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
        if (e.statusCode >= 400) return t((0, Aa.createHttpError)(e)), !1;
        if (e.statusCode !== 206) {
            let r = (0, Aa.safeGetHeader)(e, "accept-ranges");
            if (r == null || r === "none")
                return t(new Error("Server doesn't support Accept-Ranges (response code ".concat(e.statusCode, ")"))), !1;
        }
        return !0;
    }
});
var _m = g(Wi => {
    "use strict";
    Object.defineProperty(Wi, "__esModule", { value: !0 });
    Wi.ProgressDifferentialDownloadCallbackTransform = void 0;
    var Ob = require("stream"),
        wr;
    (function (e) {
        (e[(e.COPY = 0)] = "COPY"), (e[(e.DOWNLOAD = 1)] = "DOWNLOAD");
    })(wr || (wr = {}));
    var Sa = class extends Ob.Transform {
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
    Wi.ProgressDifferentialDownloadCallbackTransform = Sa;
});
var Oa = g(Vi => {
    "use strict";
    Object.defineProperty(Vi, "__esModule", { value: !0 });
    Vi.DifferentialDownloader = void 0;
    var wn = ue(),
        Ta = Ke(),
        xb = require("fs"),
        Ib = va(),
        Nb = require("url"),
        Gi = Bi(),
        vm = Em(),
        Rb = _m(),
        ba = class {
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
                    i = (0, Gi.computeOperations)(t, r, n);
                n.debug != null && n.debug(JSON.stringify(i, null, 2));
                let o = 0,
                    s = 0;
                for (let l of i) {
                    let d = l.end - l.start;
                    l.kind === Gi.OperationKind.DOWNLOAD ? (o += d) : (s += d);
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
                            .concat(Am(a), ", To download: ")
                            .concat(Am(o), " (")
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
                                (0, Ta.close)(i.descriptor).catch(o => {
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
                let n = await (0, Ta.open)(this.options.oldFile, "r");
                r.push({ descriptor: n, path: this.options.oldFile });
                let i = await (0, Ta.open)(this.options.newFile, "w");
                r.push({ descriptor: i, path: this.options.newFile });
                let o = (0, xb.createWriteStream)(this.options.newFile, { fd: i });
                await new Promise((s, a) => {
                    let l = [],
                        d;
                    if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
                        let T = [],
                            S = 0;
                        for (let L of t)
                            L.kind === Gi.OperationKind.DOWNLOAD && (T.push(L.end - L.start), (S += L.end - L.start));
                        let N = { expectedByteCounts: T, grandTotal: S };
                        (d = new Rb.ProgressDifferentialDownloadCallbackTransform(
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
                        (p = (0, vm.executeTasksUsingMultipleRangeRequests)(this, t, m, n, a)), p(0);
                        return;
                    }
                    let E = 0,
                        _ = null;
                    this.logger.info("Differential download: ".concat(this.options.newUrl));
                    let A = this.createRequestOptions();
                    (A.redirect = "manual"),
                        (p = T => {
                            var S, N;
                            if (T >= t.length) {
                                this.fileMetadataBuffer != null && m.write(this.fileMetadataBuffer), m.end();
                                return;
                            }
                            let L = t[T++];
                            if (L.kind === Gi.OperationKind.COPY) {
                                d && d.beginFileCopy(), (0, Ib.copyData)(L, m, n, a, () => p(T));
                                return;
                            }
                            let Fe = "bytes=".concat(L.start, "-").concat(L.end - 1);
                            (A.headers.range = Fe),
                                (N = (S = this.logger) === null || S === void 0 ? void 0 : S.debug) === null ||
                                    N === void 0 ||
                                    N.call(S, "download range: ".concat(Fe)),
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
                                this.logger.info("Redirect to ".concat(Pb(P))),
                                    (_ = P),
                                    (0, wn.configureRequestUrl)(new Nb.URL(_), A),
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
                        (0, vm.checkIsRangesSupported)(s, i) &&
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
    Vi.DifferentialDownloader = ba;
    function Am(e, t = " KB") {
        return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
    }
    function Pb(e) {
        let t = e.indexOf("?");
        return t < 0 ? e : e.substring(0, t);
    }
});
var Cm = g(Yi => {
    "use strict";
    Object.defineProperty(Yi, "__esModule", { value: !0 });
    Yi.GenericDifferentialDownloader = void 0;
    var Db = Oa(),
        xa = class extends Db.DifferentialDownloader {
            download(t, r) {
                return this.doDownload(t, r);
            }
        };
    Yi.GenericDifferentialDownloader = xa;
});
var Xi = g(_r => {
    "use strict";
    Object.defineProperty(_r, "__esModule", { value: !0 });
    _r.NoOpLogger = _r.AppUpdater = void 0;
    var Te = ue(),
        Fb = require("crypto"),
        qb = require("os"),
        Lb = require("events"),
        yr = Ke(),
        Ub = ui(),
        Ia = hh(),
        Bt = require("path"),
        Ht = Ms(),
        Sm = kp(),
        $b = Hp(),
        Tm = Wp(),
        kb = la(),
        Er = jt(),
        Na = hm(),
        Mb = require("zlib"),
        Bb = wt(),
        Hb = Cm(),
        Ra = class e extends Lb.EventEmitter {
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
                return (0, Tm.getNetSession)();
            }
            get logger() {
                return this._logger;
            }
            set logger(t) {
                this._logger = t ?? new zi();
            }
            set updateConfigPath(t) {
                (this.clientPromise = null),
                    (this._appUpdateConfigPath = t),
                    (this.configOnDisk = new Ia.Lazy(() => this.loadUpdateConfig()));
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
                    (this.stagingUserIdPromise = new Ia.Lazy(() => this.getOrCreateStagingUserId())),
                    (this.configOnDisk = new Ia.Lazy(() => this.loadUpdateConfig())),
                    (this.checkForUpdatesPromise = null),
                    (this.downloadPromise = null),
                    (this.updateInfoAndProvider = null),
                    (this._testOnlyOptions = null),
                    this.on("error", o => {
                        this._logger.error("Error: ".concat(o.stack || o.message));
                    }),
                    r == null
                        ? ((this.app = new $b.ElectronAppAdapter()),
                          (this.httpExecutor = new Tm.ElectronHttpExecutor((o, s) => this.emit("login", o, s))))
                        : ((this.app = r), (this.httpExecutor = null));
                let n = this.app.version,
                    i = (0, Ht.parse)(n);
                if (i == null)
                    throw (0, Te.newError)(
                        'App version is not a valid semver version: "'.concat(n, '"'),
                        "ERR_UPDATER_INVALID_VERSION"
                    );
                (this.currentVersion = i),
                    (this.allowPrerelease = jb(i)),
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
                    ? (n = new kb.GenericProvider({ provider: "generic", url: t }, this, {
                          ...r,
                          isUseMultipleRangeRequest: (0, Na.isUrlProbablySupportMultiRangeRequests)(t)
                      }))
                    : (n = (0, Na.createClient)(t, this, r)),
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
                    o = (0, qb.release)();
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
                            (0, Na.createClient)(n, this, this.createProviderRuntimeOptions())
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
                    (0, Ub.load)(await (0, yr.readFile)(this._appUpdateConfigPath, "utf-8"))
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
                let r = Te.UUID.v5((0, Fb.randomBytes)(4096), Te.UUID.OID);
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
                        (t = new Sm.DownloadedUpdateHelper(i)),
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
                this.listenerCount(Er.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = S => this.emit(Er.DOWNLOAD_PROGRESS, S));
                let i = t.downloadUpdateOptions.updateInfoAndProvider.info,
                    o = i.version,
                    s = r.packageInfo;
                function a() {
                    let S = decodeURIComponent(t.fileInfo.url.pathname);
                    return S.endsWith(".".concat(t.fileExtension)) ? Bt.basename(S) : t.fileInfo.info.url;
                }
                let l = await this.getOrCreateDownloadHelper(),
                    d = l.cacheDirForPendingUpdate;
                await (0, yr.mkdir)(d, { recursive: !0 });
                let c = a(),
                    f = Bt.join(d, c),
                    m = s == null ? null : Bt.join(d, "package-".concat(o).concat(Bt.extname(s.path) || ".7z")),
                    p = async S => (
                        await l.setDownloadedFile(f, m, i, r, c, S),
                        await t.done({ ...i, downloadedFile: f }),
                        m == null ? [f] : [f, m]
                    ),
                    E = this._logger,
                    _ = await l.validateDownloadedPath(f, i, r, E);
                if (_ != null) return (f = _), await p(!1);
                let A = async () => (await l.clear().catch(() => {}), await (0, yr.unlink)(f).catch(() => {})),
                    T = await (0, Sm.createTempUpdateFile)("temp-".concat(c), d, E);
                try {
                    await t.task(T, n, m, A),
                        await (0, Te.retry)(
                            () => (0, yr.rename)(T, f),
                            60,
                            500,
                            0,
                            0,
                            S => S instanceof Error && /^EBUSY:/.test(S.message)
                        );
                } catch (S) {
                    throw (
                        (await A(),
                        S instanceof Te.CancellationError && (E.info("cancelled"), this.emit("update-cancelled", i)),
                        S)
                    );
                }
                return E.info("New version ".concat(o, " has been downloaded to ").concat(f)), await p(!0);
            }
            async differentialDownloadInstaller(t, r, n, i, o) {
                try {
                    if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload) return !0;
                    let s = (0, Bb.blockmapFiles)(t.url, this.app.version, r.updateInfoAndProvider.info.version);
                    this._logger.info('Download block maps (old: "'.concat(s[0], '", new: ').concat(s[1], ")"));
                    let a = async c => {
                            let f = await this.httpExecutor.downloadToBuffer(c, {
                                headers: r.requestHeaders,
                                cancellationToken: r.cancellationToken
                            });
                            if (f == null || f.length === 0) throw new Error('Blockmap "'.concat(c.href, '" is empty'));
                            try {
                                return JSON.parse((0, Mb.gunzipSync)(f).toString());
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
                    return await new Hb.GenericDifferentialDownloader(t.info, this.httpExecutor, l).download(d[0], d[1]), !1;
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
    _r.AppUpdater = Ra;
    function jb(e) {
        let t = (0, Ht.prerelease)(e);
        return t != null && t.length > 0;
    }
    var zi = class {
        info(t) {}
        warn(t) {}
        error(t) {}
    };
    _r.NoOpLogger = zi;
});
var vr = g(Ji => {
    "use strict";
    Object.defineProperty(Ji, "__esModule", { value: !0 });
    Ji.BaseUpdater = void 0;
    var bm = require("child_process"),
        Wb = Xi(),
        Pa = class extends Wb.AppUpdater {
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
                    (0, bm.spawnSync)(t, r, { env: { ...process.env, ...n }, encoding: "utf-8", shell: !0 }).stdout.trim()
                );
            }
            async spawnLog(t, r = [], n = void 0, i = "ignore") {
                return (
                    this._logger.info("Executing: ".concat(t, " with args: ").concat(r)),
                    new Promise((o, s) => {
                        try {
                            let a = { stdio: i, env: n, detached: !0 },
                                l = (0, bm.spawn)(t, r, a);
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
    Ji.BaseUpdater = Pa;
});
var Fa = g(Ki => {
    "use strict";
    Object.defineProperty(Ki, "__esModule", { value: !0 });
    Ki.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
    var Ar = Ke(),
        Gb = Oa(),
        Vb = require("zlib"),
        Da = class extends Gb.DifferentialDownloader {
            async download() {
                let t = this.blockAwareFileInfo,
                    r = t.size,
                    n = r - (t.blockMapSize + 4);
                this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
                let i = Om(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
                await this.doDownload(await Yb(this.options.oldFile), i);
            }
        };
    Ki.FileWithEmbeddedBlockMapDifferentialDownloader = Da;
    function Om(e) {
        return JSON.parse((0, Vb.inflateRawSync)(e).toString());
    }
    async function Yb(e) {
        let t = await (0, Ar.open)(e, "r");
        try {
            let r = (await (0, Ar.fstat)(t)).size,
                n = Buffer.allocUnsafe(4);
            await (0, Ar.read)(t, n, 0, n.length, r - n.length);
            let i = Buffer.allocUnsafe(n.readUInt32BE(0));
            return await (0, Ar.read)(t, i, 0, i.length, r - n.length - i.length), await (0, Ar.close)(t), Om(i);
        } catch (r) {
            throw (await (0, Ar.close)(t), r);
        }
    }
});
var La = g(Qi => {
    "use strict";
    Object.defineProperty(Qi, "__esModule", { value: !0 });
    Qi.AppImageUpdater = void 0;
    var xm = ue(),
        Im = require("child_process"),
        zb = Ke(),
        Xb = require("fs"),
        yn = require("path"),
        Jb = vr(),
        Kb = Fa(),
        Nm = jt(),
        Qb = $e(),
        qa = class extends Jb.BaseUpdater {
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
                    n = (0, Qb.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
                return this.executeDownload({
                    fileExtension: "AppImage",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, o) => {
                        let s = process.env.APPIMAGE;
                        if (s == null) throw (0, xm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
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
                            this.listenerCount(Nm.DOWNLOAD_PROGRESS) > 0 &&
                                (l.onProgress = d => this.emit(Nm.DOWNLOAD_PROGRESS, d)),
                                await new Kb.FileWithEmbeddedBlockMapDifferentialDownloader(
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
                        a && (await this.httpExecutor.download(n.url, i, o)), await (0, zb.chmod)(i, 493);
                    }
                });
            }
            doInstall(t) {
                let r = process.env.APPIMAGE;
                if (r == null) throw (0, xm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
                (0, Xb.unlinkSync)(r);
                let n,
                    i = yn.basename(r);
                yn.basename(t.installerPath) === i || !/\d+\.\d+\.\d+/.test(i)
                    ? (n = r)
                    : (n = yn.join(yn.dirname(r), yn.basename(t.installerPath))),
                    (0, Im.execFileSync)("mv", ["-f", t.installerPath, n]),
                    n !== r && this.emit("appimage-filename-updated", n);
                let o = { ...process.env, APPIMAGE_SILENT_INSTALL: "true" };
                return (
                    t.isForceRunAfter
                        ? this.spawnLog(n, [], o)
                        : ((o.APPIMAGE_EXIT_AFTER_INSTALL = "true"), (0, Im.execFileSync)(n, [], { env: o })),
                    !0
                );
            }
        };
    Qi.AppImageUpdater = qa;
});
var $a = g(Zi => {
    "use strict";
    Object.defineProperty(Zi, "__esModule", { value: !0 });
    Zi.DebUpdater = void 0;
    var Zb = vr(),
        Rm = jt(),
        eO = $e(),
        Ua = class extends Zb.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, eO.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
                return this.executeDownload({
                    fileExtension: "deb",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, o) => {
                        this.listenerCount(Rm.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = s => this.emit(Rm.DOWNLOAD_PROGRESS, s)),
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
    Zi.DebUpdater = Ua;
});
var Ma = g(eo => {
    "use strict";
    Object.defineProperty(eo, "__esModule", { value: !0 });
    eo.RpmUpdater = void 0;
    var tO = vr(),
        Pm = jt(),
        rO = $e(),
        ka = class extends tO.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, rO.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
                return this.executeDownload({
                    fileExtension: "rpm",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, o) => {
                        this.listenerCount(Pm.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = s => this.emit(Pm.DOWNLOAD_PROGRESS, s)),
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
    eo.RpmUpdater = ka;
});
var Ha = g(to => {
    "use strict";
    Object.defineProperty(to, "__esModule", { value: !0 });
    to.MacUpdater = void 0;
    var Dm = ue(),
        Fm = Ke(),
        qm = require("fs"),
        Lm = require("path"),
        nO = require("http"),
        iO = Xi(),
        oO = $e(),
        Um = require("child_process"),
        $m = require("crypto"),
        Ba = class extends iO.AppUpdater {
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
                        (o = (0, Um.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes("".concat(i, ": 1"))),
                        n.info("Checked for macOS Rosetta environment (isRosetta=".concat(o, ")"));
                } catch (f) {
                    n.warn("sysctl shell command to check for macOS Rosetta environment failed: ".concat(f));
                }
                let s = !1;
                try {
                    this.debug("Checking for arm64 in uname");
                    let m = (0, Um.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
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
                let l = (0, oO.findFile)(r, "zip", ["pkg", "dmg"]);
                if (l == null)
                    throw (0, Dm.newError)(
                        "ZIP file not provided: ".concat((0, Dm.safeStringifyJson)(r)),
                        "ERR_UPDATER_ZIP_FILE_NOT_FOUND"
                    );
                let d = t.updateInfoAndProvider.provider,
                    c = "update.zip";
                return this.executeDownload({
                    fileExtension: "zip",
                    fileInfo: l,
                    downloadUpdateOptions: t,
                    task: async (f, m) => {
                        let p = Lm.join(this.downloadedUpdateHelper.cacheDir, c),
                            E = () =>
                                (0, Fm.pathExistsSync)(p)
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
                                let m = Lm.join(this.downloadedUpdateHelper.cacheDir, c);
                                (0, qm.copyFileSync)(f.downloadedFile, m);
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
                    o = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, Fm.stat)(i)).size,
                    s = this._logger,
                    a = "fileToProxy=".concat(t.url.href);
                this.closeServerIfExists(),
                    this.debug("Creating proxy server for native Squirrel.Mac (".concat(a, ")")),
                    (this.server = (0, nO.createServer)()),
                    this.debug("Proxy server for native Squirrel.Mac is created (".concat(a, ")")),
                    this.server.on("close", () => {
                        s.info("Proxy server for native Squirrel.Mac is closed (".concat(a, ")"));
                    });
                let l = d => {
                    let c = d.address();
                    return typeof c == "string" ? c : "http://127.0.0.1:".concat(c?.port);
                };
                return await new Promise((d, c) => {
                    let f = (0, $m.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"),
                        m = Buffer.from("autoupdater:".concat(f), "ascii"),
                        p = "/".concat((0, $m.randomBytes)(64).toString("hex"), ".zip");
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
                                [Fe, Y] = L.split(":");
                            if (Fe !== "autoupdater" || Y !== f) {
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
                        let S = (0, qm.createReadStream)(i);
                        S.on("error", N => {
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
                            S.pipe(_);
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
    to.MacUpdater = Ba;
});
var Hm = g(Wa => {
    "use strict";
    Object.defineProperty(Wa, "__esModule", { value: !0 });
    Wa.verifySignature = aO;
    var km = ue(),
        Bm = require("child_process"),
        sO = require("os"),
        Mm = require("path");
    function aO(e, t, r) {
        return new Promise((n, i) => {
            let o = t.replace(/'/g, "''");
            r.info("Verifying signature ".concat(o)),
                (0, Bm.execFile)(
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
                                ja(r, s, l, i), n(null);
                                return;
                            }
                            let c = lO(a);
                            if (c.Status === 0) {
                                try {
                                    let E = Mm.normalize(c.Path),
                                        _ = Mm.normalize(t);
                                    if ((r.info("LiteralPath: ".concat(E, ". Update Path: ").concat(_)), E !== _)) {
                                        ja(r, new Error("LiteralPath of ".concat(E, " is different than ").concat(_)), l, i),
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
                                let m = (0, km.parseDn)(c.SignerCertificate.Subject),
                                    p = !1;
                                for (let E of e) {
                                    let _ = (0, km.parseDn)(E);
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
                            ja(r, c, null, i), n(null);
                            return;
                        }
                    }
                );
        });
    }
    function lO(e) {
        let t = JSON.parse(e);
        delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
        let r = t.SignerCertificate;
        return (
            r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName),
            t
        );
    }
    function ja(e, t, r, n) {
        if (uO()) {
            e.warn(
                "Cannot execute Get-AuthenticodeSignature: ".concat(
                    t || r,
                    ". Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher."
                )
            );
            return;
        }
        try {
            (0, Bm.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], {
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
    function uO() {
        let e = sO.release();
        return e.startsWith("6.") && !e.startsWith("6.3");
    }
});
var Va = g(no => {
    "use strict";
    Object.defineProperty(no, "__esModule", { value: !0 });
    no.NsisUpdater = void 0;
    var ro = ue(),
        jm = require("path"),
        cO = vr(),
        fO = Fa(),
        Wm = jt(),
        hO = $e(),
        dO = Ke(),
        pO = Hm(),
        Gm = require("url"),
        Ga = class extends cO.BaseUpdater {
            constructor(t, r) {
                super(t, r), (this._verifyUpdateCodeSignature = (n, i) => (0, pO.verifySignature)(n, i, this._logger));
            }
            get verifyUpdateCodeSignature() {
                return this._verifyUpdateCodeSignature;
            }
            set verifyUpdateCodeSignature(t) {
                t && (this._verifyUpdateCodeSignature = t);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, hO.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
                return this.executeDownload({
                    fileExtension: "exe",
                    downloadUpdateOptions: t,
                    fileInfo: n,
                    task: async (i, o, s, a) => {
                        let l = n.packageInfo,
                            d = l != null && s != null;
                        if (d && t.disableWebInstaller)
                            throw (0, ro.newError)(
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
                                (await this.differentialDownloadInstaller(n, t, i, r, ro.CURRENT_APP_INSTALLER_FILE_NAME))) &&
                                (await this.httpExecutor.download(n.url, i, o));
                        let c = await this.verifySignature(i);
                        if (c != null)
                            throw (
                                (await a(),
                                (0, ro.newError)(
                                    "New version "
                                        .concat(t.updateInfoAndProvider.info.version, " is not signed by the application owner: ")
                                        .concat(c),
                                    "ERR_UPDATER_INVALID_SIGNATURE"
                                ))
                            );
                        if (d && (await this.differentialDownloadWebPackage(t, l, s, r)))
                            try {
                                await this.httpExecutor.download(new Gm.URL(l.path), s, {
                                    headers: t.requestHeaders,
                                    cancellationToken: t.cancellationToken,
                                    sha512: l.sha512
                                });
                            } catch (f) {
                                try {
                                    await (0, dO.unlink)(s);
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
                    this.spawnLog(jm.join(process.resourcesPath, "elevate.exe"), [t.installerPath].concat(r)).catch(o =>
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
                        newUrl: new Gm.URL(r.path),
                        oldFile: jm.join(this.downloadedUpdateHelper.cacheDir, ro.CURRENT_APP_PACKAGE_FILE_NAME),
                        logger: this._logger,
                        newFile: n,
                        requestHeaders: this.requestHeaders,
                        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
                        cancellationToken: t.cancellationToken
                    };
                    this.listenerCount(Wm.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = s => this.emit(Wm.DOWNLOAD_PROGRESS, s)),
                        await new fO.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, o).download();
                } catch (o) {
                    return (
                        this._logger.error("Cannot download differentially, fallback to full download: ".concat(o.stack || o)),
                        process.platform === "win32"
                    );
                }
                return !1;
            }
        };
    no.NsisUpdater = Ga;
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
    var mO = ue();
    Object.defineProperty(M, "CancellationToken", {
        enumerable: !0,
        get: function () {
            return mO.CancellationToken;
        }
    });
    var Vm = Ke(),
        gO = require("path"),
        wO = vr();
    Object.defineProperty(M, "BaseUpdater", {
        enumerable: !0,
        get: function () {
            return wO.BaseUpdater;
        }
    });
    var Ym = Xi();
    Object.defineProperty(M, "AppUpdater", {
        enumerable: !0,
        get: function () {
            return Ym.AppUpdater;
        }
    });
    Object.defineProperty(M, "NoOpLogger", {
        enumerable: !0,
        get: function () {
            return Ym.NoOpLogger;
        }
    });
    var yO = $e();
    Object.defineProperty(M, "Provider", {
        enumerable: !0,
        get: function () {
            return yO.Provider;
        }
    });
    var EO = La();
    Object.defineProperty(M, "AppImageUpdater", {
        enumerable: !0,
        get: function () {
            return EO.AppImageUpdater;
        }
    });
    var _O = $a();
    Object.defineProperty(M, "DebUpdater", {
        enumerable: !0,
        get: function () {
            return _O.DebUpdater;
        }
    });
    var vO = Ma();
    Object.defineProperty(M, "RpmUpdater", {
        enumerable: !0,
        get: function () {
            return vO.RpmUpdater;
        }
    });
    var AO = Ha();
    Object.defineProperty(M, "MacUpdater", {
        enumerable: !0,
        get: function () {
            return AO.MacUpdater;
        }
    });
    var CO = Va();
    Object.defineProperty(M, "NsisUpdater", {
        enumerable: !0,
        get: function () {
            return CO.NsisUpdater;
        }
    });
    var vt;
    function SO() {
        if (process.platform === "win32") vt = new (Va().NsisUpdater)();
        else if (process.platform === "darwin") vt = new (Ha().MacUpdater)();
        else {
            vt = new (La().AppImageUpdater)();
            try {
                let e = gO.join(process.resourcesPath, "package-type");
                if (!(0, Vm.existsSync)(e)) return vt;
                console.info("Checking for beta autoupdate feature for deb/rpm distributions");
                let t = (0, Vm.readFileSync)(e).toString().trim();
                switch ((console.info("Found package-type:", t), t)) {
                    case "deb":
                        vt = new ($a().DebUpdater)();
                        break;
                    case "rpm":
                        vt = new (Ma().RpmUpdater)();
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
    Object.defineProperty(M, "autoUpdater", { enumerable: !0, get: () => vt || SO() });
    M.DOWNLOAD_PROGRESS = "download-progress";
    M.UPDATE_DOWNLOADED = "update-downloaded";
    var Ya = class {
        constructor(t) {
            this.emitter = t;
        }
        login(t) {
            io(this.emitter, "login", t);
        }
        progress(t) {
            io(this.emitter, M.DOWNLOAD_PROGRESS, t);
        }
        updateDownloaded(t) {
            io(this.emitter, M.UPDATE_DOWNLOADED, t);
        }
        updateCancelled(t) {
            io(this.emitter, "update-cancelled", t);
        }
    };
    M.UpdaterSignal = Ya;
    var TO = !1;
    function io(e, t, r) {
        TO
            ? e.on(t, (...n) => {
                  console.log("%s %s", t, n), r(...n);
              })
            : e.on(t, r);
    }
});
var oo = g((iR, zm) => {
    var En;
    zm.exports = ((En = class {}), b(En, "WINDOWS", "win32"), b(En, "MACOS", "darwin"), b(En, "LINUX", "linux"), En);
});
var At = g((aR, Xm) => {
    Xm.exports = class {
        constructor(t) {
            b(this, "_oglama");
            this._oglama = t;
        }
    };
});
var Km = g((cR, Jm) => {
    var bO = require("path"),
        OO = At();
    Jm.exports = class extends OO {
        async start() {
            let t = bO.join(this._oglama.rootPath, "res", "index.html"),
                r = { extraHeaders: "pragma: no-cache" };
            this._oglama.mainWindow().loadFile(t, r),
                this._oglama.mainLoginWindow().loadFile(t, r),
                this._oglama.mainWindow().hide(),
                this._oglama.mainLoginWindow().show();
        }
    };
});
var Zm = g((hR, Qm) => {
    var xO = At();
    Qm.exports = class extends xO {
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
var rg = g((pR, tg) => {
    var IO = At(),
        eg = require("fs");
    tg.exports = class extends IO {
        isFile(t) {
            let r = !1;
            try {
                r = eg.statSync(t).isFile();
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
                let n = eg.readFileSync(t);
                r = Buffer.isBuffer(n) ? n.toString() : n;
            } catch (n) {
                this._oglama.log.error("file:readFile", t, n);
            }
            return r;
        }
    };
});
var ig = g((gR, ng) => {
    var NO = At();
    ng.exports = class extends NO {
        error() {
            console.error("%coglama-error", "color:red", ...arguments);
        }
        info() {
            console.info("%coglama-info", "color:lightblue", ...arguments);
        }
    };
});
var sg = g((yR, og) => {
    var RO = At(),
        PO = require("querystring");
    og.exports = class extends RO {
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
                r = t.query ? n + "?" + PO.stringify(t.query) : n;
            } while (!1);
            return r;
        }
    };
});
var lg = g((_R, ag) => {
    var DO = At(),
        so = require("fs"),
        ao = require("path"),
        FO = require("http"),
        za;
    ag.exports =
        ((za = class extends DO {
            start() {
                if (this.constructor._instance === null) {
                    let t = ao.join(this._oglama.rootPath, "ssg"),
                        r = this._oglama.config.getPort();
                    this.constructor._instance = new Promise((n, i) => {
                        if (this._oglama.devMode) {
                            n(null);
                            return;
                        }
                        try {
                            let o = FO.createServer((s, a) => {
                                let l = ".empty";
                                try {
                                    let c = new URL(s.url, "http://0.0.0.0");
                                    l = decodeURIComponent(c.pathname).replace(/^\/+|\/+$/g, "");
                                } catch {}
                                let d = ao.join(t, l);
                                so.statSync(d, { throwIfNoEntry: !1 })?.isDirectory() && (d = ao.join(d, "index.html")),
                                    so.access(d, so.constants.F_OK, c => {
                                        if (c) {
                                            a.writeHead(404, { "Content-Type": "text/plain" }), a.end("Not Found: ".concat(c));
                                            return;
                                        }
                                        so.readFile(d, (f, m) => {
                                            if (f) {
                                                a.writeHead(500, { "Content-Type": "text/plain" }),
                                                    a.end("Internal Server Error: ".concat(f));
                                                return;
                                            }
                                            let p = ao.extname(d),
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
        b(za, "_instance", null),
        za);
});
var Cr = g((CR, ug) => {
    var qO = At(),
        { ipcMain: LO } = require("electron");
    ug.exports = class extends qO {
        constructor(t) {
            super(t);
        }
        _register(t) {
            if (typeof t == "string")
                for (let r of Object.getOwnPropertyNames(this)) {
                    if (["_", "#"].includes(r[0] || typeof this[r] != "function")) continue;
                    let n = this[r];
                    LO.handle("ipc:".concat(t, ":").concat(r), async (i, ...o) => {
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
var hg = g((TR, fg) => {
    var { execSync: Xa } = require("child_process"),
        UO = Cr(),
        ye = oo(),
        Sr,
        Tr,
        br,
        Ct,
        cg;
    fg.exports =
        ((cg = class extends UO {
            constructor(r) {
                super(r);
                z(this, Sr, null);
                z(this, Tr, null);
                z(this, br, null);
                z(this, Ct, null);
                b(this, "getOS", () => {
                    if (typeof v(this, Ct) != "string")
                        switch (process.platform) {
                            case ye.MACOS:
                                re(this, Ct, "macos");
                                break;
                            case ye.WINDOWS:
                                re(this, Ct, "windows");
                                break;
                            case ye.LINUX:
                                re(this, Ct, "linux");
                                break;
                        }
                    return v(this, Ct);
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
                                let n = Xa(r).toString();
                                re(this, Tr, n.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (n) {
                                this._oglama.devMode && console.warn("Device Name", "".concat(n));
                            }
                    }
                    return v(this, Tr);
                });
                b(this, "getUUID", () => {
                    if (typeof v(this, Sr) != "string") {
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
                                let i = Xa(r).toString();
                                switch (process.platform) {
                                    case ye.MACOS:
                                        i = i.replace(/^.*?\bIOPlatformUUID"\s*=\s*"(.*?)".*$/gs, "$1");
                                        break;
                                    case ye.WINDOWS:
                                        i = i.split("REG_SZ")[1];
                                        break;
                                }
                                re(this, Sr, i.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (i) {
                                this._oglama.devMode && console.warn("Device UUID", "".concat(i));
                            }
                    }
                    return v(this, Sr);
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
                                let n = Xa(r).toString();
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
        (Sr = new WeakMap()),
        (Tr = new WeakMap()),
        (br = new WeakMap()),
        (Ct = new WeakMap()),
        cg);
});
var Or = g((OR, dg) => {
    var je;
    dg.exports =
        ((je = class {
            static getSourceChannelName(t) {
                return "".concat(je.WINDOW_SOURCE, "/").concat(t);
            }
            static getTargetChannelName(t) {
                return "".concat(je.WINDOW_TARGET, "/").concat(t);
            }
        }),
        b(je, "WINDOW_MAIN", "@main"),
        b(je, "WINDOW_MAIN_LOGIN", "@main/login"),
        b(je, "WINDOW_SOURCE", "@source"),
        b(je, "WINDOW_TARGET", "@target"),
        je);
});
var Eg = g((NR, yg) => {
    var { ipcMain: pg, session: $O, BrowserWindow: mg } = require("electron"),
        gg = require("path"),
        kO = Cr(),
        MO = Or(),
        V,
        nt,
        wg;
    yg.exports =
        ((wg = class extends kO {
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
                        v(this, V)[r] = new mg({
                            show: !1,
                            minWidth: 512,
                            minHeight: 512,
                            width: 800,
                            height: 600,
                            icon: gg.join(this._oglama.rootPath, "res/icons/icon.png"),
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
                                preload: gg.join(this._oglama.rootPath, "lib/preloader/entry/source.js"),
                                nodeIntegration: !0,
                                devTools: this._oglama.devMode,
                                session: $O.defaultSession,
                                cache: !1,
                                webSecurity: !1,
                                allowRunningInsecureContent: !0,
                                additionalArguments: ["--agent-id=".concat(r)]
                            }
                        });
                        let i = MO.getSourceChannelName(r);
                        (v(this, nt)[r] = {
                            channel: i,
                            listener: (o, ...s) => {
                                this._oglama.devMode && console.log("\u{1F3F9} ".concat(i), JSON.stringify(s)),
                                    s.length >= 3 && v(this, V)[r].webContents.send(i, s);
                            }
                        }),
                            pg.on(v(this, nt)[r].channel, v(this, nt)[r].listener),
                            this._oglama.devMode &&
                                v(this, V)[r].webContents.on("context-menu", (o, s) => {
                                    o.preventDefault(), v(this, V)[r].webContents.openDevTools({ mode: "right" });
                                }),
                            v(this, V)[r].setMenu(null),
                            v(this, V)[r].on("closed", () => {
                                pg.off(v(this, nt)[r].channel, v(this, nt)[r].listener),
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
                    if (!(v(this, V)[r] instanceof mg)) throw new Error("Invalid Agent ID");
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
        wg);
});
var Cg = g((DR, Ag) => {
    var { ipcMain: _g, BrowserView: xr } = require("electron"),
        vg = require("path"),
        Ja = oo(),
        BO = Cr(),
        HO = Or(),
        _n,
        vn,
        An,
        Cn,
        $,
        Ye,
        ze,
        Wt;
    Ag.exports =
        ((_n = class extends BO {
            constructor(r) {
                super(r);
                z(this, vn);
                z(this, An);
                z(this, Cn, "");
                z(this, $, {});
                z(this, Ye, {});
                z(this, ze, "");
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
                            preload: vg.join(this._oglama.rootPath, "lib/preloader/entry/target.js"),
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
                        o.webContents.setUserAgent(v(this, Cn)),
                        o.webContents.setZoomLevel(0),
                        o.webContents.setAudioMuted(!0),
                        o.webContents.loadFile(vg.join(this._oglama.rootPath, "res", "index.html"), {
                            extraHeaders: "pragma: no-cache"
                        }),
                        this._oglama.mainWindow().addBrowserView(o),
                        this._oglama.main.view instanceof xr &&
                            (this._oglama.mainWindow().removeBrowserView(this._oglama.main.view),
                            this._oglama.mainWindow().addBrowserView(this._oglama.main.view)),
                        (v(this, $)[r] = o);
                    let s = HO.getTargetChannelName(r);
                    return (
                        (v(this, Ye)[r] = {
                            channel: s,
                            listener: (a, ...l) => {
                                this._oglama.devMode && console.log("\u{1F3AF} ".concat(s), JSON.stringify(l)),
                                    l.length >= 3 && o.webContents.send(s, l);
                            }
                        }),
                        _g.on(v(this, Ye)[r].channel, v(this, Ye)[r].listener),
                        i ? this.select(r) : v(this, Wt).call(this),
                        !0
                    );
                });
                b(this, "remove", r => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid Agent ID");
                    if (!(v(this, $)[r] instanceof xr) || typeof v(this, Ye)[r] > "u") return !1;
                    _g.off(v(this, Ye)[r].channel, v(this, Ye)[r].listener), delete v(this, Ye)[r];
                    try {
                        this._oglama.mainWindow().removeBrowserView(v(this, $)[r]);
                    } catch {}
                    try {
                        v(this, $)[r].webContents.destroy();
                    } catch {}
                    return delete v(this, $)[r], r === v(this, ze) && re(this, ze, ""), v(this, Wt).call(this), !0;
                });
                b(this, "select", r => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid Agent ID");
                    if (v(this, $)[r] instanceof xr && v(this, ze) !== r) {
                        re(this, ze, r),
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
                b(this, "getSelected", () => v(this, ze));
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
                        let o = i === v(this, ze) ? this.constructor.MARGIN_LEFT : 100 - r,
                            s = i === v(this, ze) ? this.constructor.MARGIN_TOP : 50 - n;
                        v(this, $)[i].setBounds({ x: o, y: s, width: r, height: n });
                    }
                });
                let n = "";
                switch (process.platform) {
                    case Ja.MACOS:
                        n = "(Macintosh; Intel Mac OS X 13_3)";
                        break;
                    case Ja.WINDOWS:
                        n = "(Windows NT 10.0; Win64; x64)";
                        break;
                    case Ja.LINUX:
                        n = "(X11; Linux x86_64)";
                        break;
                }
                re(this, Cn, "Mozilla/5.0 ".concat(n, " AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")),
                    this._register("target");
            }
        }),
        (vn = new WeakMap()),
        (An = new WeakMap()),
        (Cn = new WeakMap()),
        ($ = new WeakMap()),
        (Ye = new WeakMap()),
        (ze = new WeakMap()),
        (Wt = new WeakMap()),
        b(_n, "MARGIN_LEFT", 250),
        b(_n, "MARGIN_TOP", 50),
        b(_n, "MARGIN_BOTTOM", 50),
        _n);
});
var bg = g((LR, Tg) => {
    var { session: jO, shell: WO, ipcMain: GO, BrowserView: Ka } = require("electron"),
        VO = require("path"),
        YO = Cr(),
        Qa = Or(),
        lo,
        Sg;
    Tg.exports =
        ((Sg = class extends YO {
            constructor(r) {
                super(r);
                b(this, "windowWidth");
                b(this, "windowHeight");
                b(this, "view", null);
                b(this, "darkMode", !0);
                z(this, lo, () =>
                    this.view instanceof Ka
                        ? (this.view.setBounds({ x: 0, y: 0, width: this.windowWidth, height: this.windowHeight }), !0)
                        : !1
                );
                b(this, "init", () =>
                    this.view instanceof Ka
                        ? !1
                        : ((this.windowWidth = this._oglama.config.getMainLoginWidth()),
                          (this.windowHeight = this._oglama.config.getMainLoginHeight()),
                          (this.view = new Ka({
                              width: this.windowWidth,
                              height: this.windowHeight,
                              resizable: !1,
                              backgroundColor: "#00000000",
                              transparent: !0,
                              webPreferences: {
                                  backgroundThrottling: !1,
                                  imageAnimationPolicy: "noAnimation",
                                  spellcheck: !1,
                                  preload: VO.join(this._oglama.rootPath, "lib/preloader/entry/main.js"),
                                  nodeIntegration: !0,
                                  devTools: this._oglama.devMode,
                                  session: jO.defaultSession,
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
                          GO.on(Qa.WINDOW_MAIN_LOGIN, (r, ...n) => {
                              this._oglama.devMode && console.log("\u{1F3E0} ".concat(Qa.WINDOW_MAIN_LOGIN), JSON.stringify(n)),
                                  n.length >= 3 && this.view.webContents.send(Qa.WINDOW_MAIN_LOGIN, n);
                          }),
                          this._oglama.mainLoginWindow().addBrowserView(this.view),
                          v(this, lo).call(this),
                          !0)
                );
                b(this, "openExternal", r => {
                    typeof r == "string" && WO.openExternal(r);
                });
                this._register("main/login");
            }
        }),
        (lo = new WeakMap()),
        Sg);
});
var Ig = g((kR, xg) => {
    var { app: zO, session: XO, shell: JO, ipcMain: KO, BrowserView: uo } = require("electron"),
        QO = require("path"),
        ZO = Cr(),
        Za = Or(),
        ex = bg(),
        Ir,
        Og;
    xg.exports =
        ((Og = class extends ZO {
            constructor(r) {
                super(r);
                b(this, "windowWidth");
                b(this, "windowHeight");
                b(this, "view", null);
                b(this, "onTop", !1);
                b(this, "darkMode", !0);
                b(this, "login", null);
                z(this, Ir, () =>
                    this.view instanceof uo
                        ? (this.view.setBounds({ x: 0, y: 0, width: this.windowWidth, height: this.windowHeight }), !0)
                        : !1
                );
                b(this, "init", () =>
                    this.view instanceof uo
                        ? !1
                        : ((this.windowWidth = this._oglama.config.getMainMinWidth()),
                          (this.windowHeight = this._oglama.config.getMainMinHeight()),
                          (this.view = new uo({
                              width: this.windowWidth,
                              height: this.windowHeight,
                              resizable: !1,
                              backgroundColor: "#00000000",
                              transparent: !0,
                              webPreferences: {
                                  backgroundThrottling: !1,
                                  imageAnimationPolicy: "noAnimation",
                                  spellcheck: !1,
                                  preload: QO.join(this._oglama.rootPath, "lib/preloader/entry/main.js"),
                                  nodeIntegration: !0,
                                  devTools: this._oglama.devMode,
                                  session: XO.defaultSession,
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
                          KO.on(Za.WINDOW_MAIN, (r, ...n) => {
                              this._oglama.devMode && console.log("\u{1F3E0} ".concat(Za.WINDOW_MAIN), JSON.stringify(n)),
                                  n.length >= 3 && this.view.webContents.send(Za.WINDOW_MAIN, n);
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
                                o instanceof uo &&
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
                    zO.quit();
                });
                b(this, "getDarkMode", () => this.darkMode);
                b(this, "openExternal", r => {
                    typeof r == "string" && JO.openExternal(r);
                });
                this._register("main"), (this.login = new ex(r));
            }
        }),
        (Ir = new WeakMap()),
        Og);
});
var qg = g((HR, Fg) => {
    var { app: el, session: Ng, BrowserWindow: Rg } = require("electron"),
        Pg = require("path"),
        tl = oo(),
        tx = Km(),
        rx = Zm(),
        nx = rg(),
        ix = ig(),
        ox = sg(),
        sx = lg(),
        ax = hg(),
        lx = Eg(),
        ux = Cg(),
        cx = Ig(),
        rl = Or(),
        ee,
        Sn,
        Tn,
        ke,
        Dg;
    Fg.exports =
        ((Dg = class {
            constructor() {
                z(this, ee, null);
                z(this, Sn, null);
                z(this, Tn, !1);
                z(this, ke, null);
                b(this, "rootPath", el.getAppPath());
                b(this, "devMode", !1);
                b(this, "log", new ix(this));
                b(this, "webserver", new sx(this));
                b(this, "activity", new tx(this));
                b(this, "device", new ax(this));
                b(this, "source", new lx(this));
                b(this, "target", new ux(this));
                b(this, "main", new cx(this));
                b(this, "config", new rx(this));
                b(this, "file", new nx(this));
                b(this, "utils", new ox(this));
            }
            mainWindow() {
                let t = this;
                if (v(t, ee) === null) {
                    re(
                        t,
                        ee,
                        new Rg({
                            show: !1,
                            minWidth: t.config.getMainMinWidth(),
                            minHeight: t.config.getMainMinHeight(),
                            width: t.config.getMainMinWidth(),
                            height: t.config.getMainMinHeight(),
                            icon: Pg.join(t.rootPath, "res/icons/icon.png"),
                            resizable: !0,
                            fullscreenable: !1,
                            titleBarStyle: "default",
                            title: "Oglama",
                            useContentSize: !0,
                            backgroundColor: "#000",
                            webPreferences: { spellcheck: !1, nodeIntegration: !0, session: Ng.defaultSession }
                        })
                    ),
                        v(t, ee).setMenu(null),
                        v(t, ee).setMaxListeners(0),
                        v(t, ee).on("closed", () => {
                            re(t, ee, null), el.quit();
                        });
                    let r = () => {
                        let n = v(t, ee).getSize(),
                            i = [tl.WINDOWS, tl.MACOS].includes(process.platform)
                                ? Math.abs(v(t, ee).getSize()[1] - v(t, ee).getContentSize()[1])
                                : 0,
                            o = [tl.WINDOWS].includes(process.platform)
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
                            Sn,
                            setInterval(() => {
                                if (v(t, ee) === null) {
                                    clearInterval(v(t, Sn));
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
                    v(t, ke) === null &&
                        (re(
                            t,
                            ke,
                            new Rg({
                                width: t.config.getMainLoginWidth(),
                                height: t.config.getMainLoginHeight(),
                                icon: Pg.join(t.rootPath, "res/icons/icon.png"),
                                resizable: !1,
                                fullscreenable: !1,
                                transparent: !0,
                                titleBarStyle: "hidden",
                                title: "Oglama",
                                backgroundColor: "#00000000",
                                webPreferences: { spellcheck: !1, nodeIntegration: !0, session: Ng.defaultSession }
                            })
                        ),
                        v(t, ke).setMenu(null),
                        v(t, ke).setMaxListeners(0),
                        v(t, ke).on("closed", () => {
                            re(t, ke, null), el.quit();
                        }),
                        t.main?.login?.init(),
                        t.main?.login?.view.webContents.on("did-finish-load", () => {
                            t.getPostAuth() || v(t, ke).show();
                        }),
                        v(t, ke).setMenu(null)),
                    v(t, ke)
                );
            }
            getPostAuth() {
                return v(this, Tn);
            }
            setPostAuth(t) {
                let r = !1;
                if (((t = !!t), t !== this.getPostAuth())) {
                    re(this, Tn, t);
                    let n = ["onPostAuth", [t], { type: "req", fromWin: rl.WINDOW_MAIN_LOGIN }];
                    this.main?.login?.view.webContents.send(rl.WINDOW_MAIN_LOGIN, n),
                        setTimeout(() => {
                            this.main?.view.webContents.send(rl.WINDOW_MAIN, n);
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
        (Sn = new WeakMap()),
        (Tn = new WeakMap()),
        (ke = new WeakMap()),
        Dg);
});
var { app: Xe, BrowserWindow: fx } = require("electron"),
    { autoUpdater: nl } = jt(),
    hx = qg();
Xe.disableHardwareAcceleration();
Xe.commandLine.appendSwitch("disable-gpu");
Xe.commandLine.appendSwitch("allow-insecure-localhost");
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
process.on("uncaughtException", e => {
    process.env.NODE_ENV === "development" && console.debug(e);
});
var Me = null;
do {
    if (!Xe.requestSingleInstanceLock()) {
        Xe.quit();
        break;
    }
    Xe.on("second-instance", () => {
        Me !== null &&
            (Me.getPostAuth()
                ? (Me.mainWindow().isMinimized() && Me.mainWindow().restore(), Me.mainWindow().show())
                : (Me.mainLoginWindow().isMinimized() && Me.mainLoginWindow().restore(), Me.mainLoginWindow().show()));
    }),
        Xe.on("ready", async () => {
            (Me = new hx()),
                Xe.on("activate", () => {
                    fx.getAllWindows().length === 0 && Me.activity.start();
                }),
                await Me.webserver.start(),
                await Me.activity.start(),
                nl.checkForUpdatesAndNotify();
        }),
        nl.on("update-downloaded", () => {
            dialog
                .showMessageBox({ type: "info", title: "Update ready", message: "Install now?", buttons: ["Yes", "Later"] })
                .then(e => {
                    e.response === 0 && nl.quitAndInstall();
                });
        }),
        Xe.on("window-all-closed", () => {
            process.platform !== "darwin" && Xe.quit();
        });
} while (!1);
