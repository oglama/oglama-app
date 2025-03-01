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
var ie = Object.defineProperty;
var T = o => {
    throw TypeError(o);
};
var oe = (o, t, e) => (t in o ? ie(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : (o[t] = e));
var p = (o, t) => () => (t || o((t = { exports: {} }).exports, t), t.exports);
var r = (o, t, e) => oe(o, typeof t != "symbol" ? t + "" : t, e),
    A = (o, t, e) => t.has(o) || T("Cannot " + e);
var n = (o, t, e) => (A(o, t, "read from private field"), e ? e.call(o) : t.get(o)),
    u = (o, t, e) =>
        t.has(o) ? T("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(o) : t.set(o, e),
    y = (o, t, e, s) => (A(o, t, "write to private field"), s ? s.call(o, e) : t.set(o, e), e);
var w = p((be, C) => {
    var { ipcRenderer: ne } = require("electron"),
        I,
        M;
    C.exports =
        ((M = class {
            constructor() {
                u(this, I, {});
            }
            _register(t) {
                if (typeof t == "string")
                    for (let e of Object.getOwnPropertyNames(this))
                        ["_", "#"].includes(e[0]) ||
                            typeof this[e] != "function" ||
                            (n(this, I)[e] = "ipc:".concat(t, ":").concat(e));
            }
            _runner(t, ...e) {
                let s = function (i, l, a) {
                    this.run = async function () {
                        let c = null;
                        if ((typeof n(i, I)[l] == "string" && (c = await ne.invoke(n(i, I)[l], ...a)), c instanceof Error))
                            throw new Error("IPC/".concat(n(i, I)[l], " ").concat(c));
                        return c;
                    };
                };
                return new s(this, t, e);
            }
            async _promise(t, ...e) {
                return await this._runner(t, ...e).run();
            }
        }),
        (I = new WeakMap()),
        M);
});
var W = p((Ae, E) => {
    var ce = w();
    E.exports = class extends ce {
        constructor() {
            super();
            r(this, "purge", e => this._promise("purge", e));
            r(this, "sourceGet", e => this._promise("sourceGet", e));
            r(this, "sourceSet", (e, s) => this._promise("sourceSet", e, s));
            r(this, "runInit", (e, s = null, i = null, l = null) => this._promise("runInit", e, s, i, l));
            r(this, "fileInit", async (e, s, i) => this._promise("fileInit", e, s, i));
            r(this, "fileAppend", async (e, s, i) => this._promise("fileAppend", e, s, i));
            r(this, "fileDelete", async (e, s) => this._promise("fileDelete", e, s));
            this._register("diskStorage");
        }
    };
});
var j = p((Ee, R) => {
    var ae = w();
    R.exports = class extends ae {
        constructor() {
            super();
            r(this, "getOS", () => this._promise("getOS"));
            r(this, "getName", () => this._promise("getName"));
            r(this, "getUUID", () => this._promise("getUUID"));
            r(this, "getSerialNumber", () => this._promise("getSerialNumber"));
            r(this, "setPostAuth", e => this._promise("setPostAuth", !!e));
            r(this, "getPostAuth", () => this._promise("getPostAuth"));
            this._register("device");
        }
    };
});
var L = p((je, G) => {
    var le = w();
    G.exports = class extends le {
        constructor() {
            super();
            r(this, "list", () => this._promise("list"));
            r(this, "closeAll", () => this._promise("closeAll"));
            r(this, "open", e => this._promise("open", e));
            r(this, "close", e => this._promise("close", e));
            r(this, "webContents", (e, s, i) => this._promise("webContents", e, s, i));
            this._register("source");
        }
    };
});
var H = p((Ue, U) => {
    var pe = w();
    U.exports = class extends pe {
        constructor() {
            super();
            r(this, "list", () => this._promise("list"));
            r(this, "removeAll", () => this._promise("removeAll"));
            r(this, "add", (e, s, i = !1) => this._promise("add", e, s, i));
            r(this, "remove", e => this._promise("remove", e));
            r(this, "select", e => this._promise("select", e));
            r(this, "getSelected", () => this._promise("getSelected"));
            r(this, "openDevTools", e => this._promise("openDevTools", e));
            r(this, "webContents", (e, s, i) => this._promise("webContents", e, s, i));
            this._register("target");
        }
    };
});
var z = p((ze, B) => {
    var ue = w();
    B.exports = class extends ue {
        constructor() {
            super();
            r(this, "openExternal", e => this._promise("openExternal", "".concat(e)));
            this._register("main/login");
        }
    };
});
var J = p((Ke, F) => {
    var he = w(),
        _e = z();
    F.exports = class extends he {
        constructor() {
            super();
            r(this, "login", null);
            r(this, "setOnTop", e => this._promise("setOnTop", !!e));
            r(this, "getOnTop", () => this._promise("getOnTop"));
            r(this, "setDarkMode", e => this._promise("setDarkMode", !!e));
            r(this, "getDarkMode", () => this._promise("getDarkMode"));
            r(this, "quit", () => this._promise("quit"));
            r(this, "openExternal", e => this._promise("openExternal", "".concat(e)));
            this._register("main"), (this.login = new _e());
        }
    };
});
var S = p((Ve, K) => {
    var h;
    K.exports =
        ((h = class {
            static getSourceChannelName(t) {
                return "".concat(h.WINDOW_SOURCE, "/").concat(t);
            }
            static getTargetChannelName(t) {
                return "".concat(h.WINDOW_TARGET, "/").concat(t);
            }
        }),
        r(h, "WINDOW_MAIN", "@main"),
        r(h, "WINDOW_MAIN_LOGIN", "@main/login"),
        r(h, "WINDOW_SOURCE", "@source"),
        r(h, "WINDOW_TARGET", "@target"),
        h);
});
var D = p((Ze, V) => {
    var { ipcRenderer: x, contextBridge: de } = require("electron"),
        me = require("crypto"),
        ge = W(),
        fe = j(),
        ye = L(),
        Ie = H(),
        we = J(),
        N = S(),
        _,
        O,
        m,
        P,
        Q;
    V.exports =
        ((Q = class {
            constructor(t, e = !0) {
                u(this, _, "");
                u(this, O, {});
                u(this, m, {});
                u(this, P, {});
                r(this, "source", {
                    send: (t, e, s) => {
                        this.send(N.getSourceChannelName(t), e, s);
                    },
                    invoke: async (t, e, s, i = 0) => await this.invoke(N.getSourceChannelName(t), e, s, i)
                });
                r(this, "target", {
                    send: (t, e, s) => {
                        this.send(N.getTargetChannelName(t), e, s);
                    },
                    invoke: async (t, e, s, i = 0) => await this.invoke(N.getTargetChannelName(t), e, s, i)
                });
                let s = this;
                y(this, _, t),
                    y(this, P, {
                        ibc: {
                            handle: (...i) => this.handle.call(this, ...i),
                            send: (...i) => this.send.call(this, ...i),
                            invoke: async (...i) => await this.invoke.call(this, ...i),
                            source: {
                                send: (...i) => this.source.send.call(this, ...i),
                                invoke: async (...i) => await this.source.invoke.call(this, ...i)
                            },
                            target: {
                                send: (...i) => this.target.send.call(this, ...i),
                                invoke: async (...i) => await this.target.invoke.call(this, ...i)
                            },
                            winName: n(this, _)
                        },
                        ipc: { diskStorage: new ge(), device: new fe(), source: new ye(), target: new Ie(), main: new we() },
                        devMode: !1
                    }),
                    x.on(n(this, _), (i, l) => {
                        if (l.length < 3) return;
                        let [a, c, b] = l,
                            { type: d, fromWin: g, promiseId: q } = b ?? {};
                        if (d === "req")
                            (async () => {
                                let f = null;
                                try {
                                    if (typeof a != "string" || typeof n(s, O)[a] != "function")
                                        throw new Error("Inter-browser communication handle not declared");
                                    Array.isArray(c) || (c = []), (f = await n(s, O)[a](...c));
                                } catch (v) {
                                    let se = "".concat(g, " >> ").concat(n(s, _), "/").concat(a, "()");
                                    (f = new Error("".concat(se, " ").concat(v))),
                                        n(this, P).devMode && console.warn("".concat(f));
                                }
                                typeof g == "string" && typeof q == "string" && x.send(g, a, f, { type: "res", promiseId: q });
                            })();
                        else {
                            let f = typeof q == "string" ? "".concat(a, ":").concat(q) : null;
                            if (f !== null) {
                                let v = n(s, m)[f] ?? null;
                                v !== null && (c instanceof Error ? v.reject(c) : v.resolve(c), delete n(s, m)[f]);
                            }
                        }
                    }),
                    e && de.exposeInMainWorld("sdk", n(this, P));
            }
            getSdk() {
                return n(this, P);
            }
            handle(t, e) {
                typeof t == "string" && typeof e == "function" && (n(this, O)[t] = e);
            }
            send(t, e, s) {
                do {
                    if (typeof t != "string" || typeof e != "string") break;
                    Array.isArray(s) || (s = []), x.send(t, e, s, { type: "req", fromWin: n(this, _) });
                } while (!1);
            }
            async invoke(t, e, s, i = 0) {
                let l = this;
                if (typeof t != "string" || typeof e != "string") return null;
                Array.isArray(s) || (s = []);
                let a = parseInt(i, 10);
                (isNaN(a) || a < 0) && (a = 0);
                let c = (() => {
                        let d = Date.now().toString(36),
                            g = me.randomBytes(4).toString("hex");
                        return "".concat(d).concat(g);
                    })(),
                    b = new Promise((d, g) => {
                        n(this, m)["".concat(e, ":").concat(c)] = { resolve: d, reject: g };
                    });
                return (
                    a > 0 &&
                        setTimeout(() => {
                            let d = typeof c == "string" ? "".concat(e, ":").concat(c) : null;
                            if (typeof n(l, m)[d] < "u") {
                                try {
                                    n(l, m)[d].reject(
                                        new Error("".concat(n(l, _), " >> ").concat(t, "/").concat(e, "() Timed out"))
                                    );
                                } catch {}
                                delete n(l, m)[d];
                            }
                        }, a),
                    x.send(t, e, s, { type: "req", fromWin: n(this, _), promiseId: c }),
                    b
                );
            }
        }),
        (_ = new WeakMap()),
        (O = new WeakMap()),
        (m = new WeakMap()),
        (P = new WeakMap()),
        Q);
});
var Z = p((rt, Y) => {
    var Pe = D(),
        ke = S(),
        k,
        X;
    Y.exports =
        ((X = class {
            constructor() {
                u(this, k);
                r(this, "getOnTop", async () => await n(this, k).ipc.main.getOnTop());
                r(this, "setOnTop", async t => await n(this, k).ipc.main.setOnTop(t));
                y(this, k, new Pe(ke.WINDOW_MAIN).getSdk());
                for (let t of Object.getOwnPropertyNames(this)) typeof this[t] == "function" && n(this, k).ibc.handle(t, this[t]);
            }
        }),
        (k = new WeakMap()),
        X);
});
var re = p((ot, te) => {
    var Oe = D(),
        ve = S(),
        $,
        ee;
    te.exports =
        ((ee = class {
            constructor() {
                u(this, $);
                y(this, $, new Oe(ve.WINDOW_MAIN_LOGIN).getSdk());
                for (let t of Object.getOwnPropertyNames(this)) typeof this[t] == "function" && n(this, $).ibc.handle(t, this[t]);
            }
        }),
        ($ = new WeakMap()),
        ee);
});
var $e = Z(),
    qe = re(),
    Se = process.argv.filter(o => o.indexOf("--win-type=") >= 0).shift();
switch ("".concat(Se).split("=")[1]) {
    case "main/login":
        new qe();
        break;
    default:
        new $e();
}
