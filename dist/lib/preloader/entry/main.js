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
var re = Object.defineProperty;
var M = s => {
    throw TypeError(s);
};
var se = (s, e, t) => (e in s ? re(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (s[e] = t));
var _ = (s, e) => () => (e || s((e = { exports: {} }).exports, e), e.exports);
var r = (s, e, t) => se(s, typeof e != "symbol" ? e + "" : e, t),
    S = (s, e, t) => e.has(s) || M("Cannot " + t);
var n = (s, e, t) => (S(s, e, "read from private field"), t ? t.call(s) : e.get(s)),
    p = (s, e, t) =>
        e.has(s) ? M("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(s) : e.set(s, t),
    y = (s, e, t, i) => (S(s, e, "write to private field"), i ? i.call(s, t) : e.set(s, t), t);
var v = _((Te, E) => {
    var { ipcRenderer: ie } = require("electron"),
        I,
        C;
    E.exports =
        ((C = class {
            constructor() {
                p(this, I, {});
            }
            _register(e) {
                if (typeof e == "string")
                    for (let t of Object.getOwnPropertyNames(this))
                        ["_", "#"].includes(t[0]) ||
                            typeof this[t] != "function" ||
                            (n(this, I)[t] = "ipc:".concat(e, ":").concat(t));
            }
            _runner(e, ...t) {
                let i = function (o, l, c) {
                    this.run = async function () {
                        let a = null;
                        if ((typeof n(o, I)[l] == "string" && (a = await ie.invoke(n(o, I)[l], ...c)), a instanceof Error))
                            throw new Error("IPC/".concat(n(o, I)[l], " ").concat(a));
                        return a;
                    };
                };
                return new i(this, e, t);
            }
            async _promise(e, ...t) {
                return await this._runner(e, ...t).run();
            }
        }),
        (I = new WeakMap()),
        C);
});
var W = _((be, A) => {
    var ne = v();
    A.exports = class extends ne {
        constructor() {
            super();
            r(this, "getOS", () => this._promise("getOS"));
            r(this, "getName", () => this._promise("getName"));
            r(this, "getUUID", () => this._promise("getUUID"));
            r(this, "getSerialNumber", () => this._promise("getSerialNumber"));
            r(this, "setPostAuth", t => this._promise("setPostAuth", !!t));
            r(this, "getPostAuth", () => this._promise("getPostAuth"));
            this._register("device");
        }
    };
});
var j = _((Me, R) => {
    var oe = v();
    R.exports = class extends oe {
        constructor() {
            super();
            r(this, "list", () => this._promise("list"));
            r(this, "closeAll", () => this._promise("closeAll"));
            r(this, "open", t => this._promise("open", t));
            r(this, "close", t => this._promise("close", t));
            r(this, "webContents", (t, i, o) => this._promise("webContents", t, i, o));
            this._register("source");
        }
    };
});
var U = _((Ee, L) => {
    var ae = v();
    L.exports = class extends ae {
        constructor() {
            super();
            r(this, "list", () => this._promise("list"));
            r(this, "removeAll", () => this._promise("removeAll"));
            r(this, "add", (t, i, o = !1) => this._promise("add", t, i, o));
            r(this, "remove", t => this._promise("remove", t));
            r(this, "select", t => this._promise("select", t));
            r(this, "getSelected", () => this._promise("getSelected"));
            r(this, "openDevTools", t => this._promise("openDevTools", t));
            r(this, "webContents", (t, i, o) => this._promise("webContents", t, i, o));
            this._register("target");
        }
    };
});
var H = _((Re, G) => {
    var ce = v();
    G.exports = class extends ce {
        constructor() {
            super();
            r(this, "openExternal", t => this._promise("openExternal", "".concat(t)));
            this._register("main/login");
        }
    };
});
var z = _((Ue, B) => {
    var le = v(),
        pe = H();
    B.exports = class extends le {
        constructor() {
            super();
            r(this, "login", null);
            r(this, "setOnTop", t => this._promise("setOnTop", !!t));
            r(this, "getOnTop", () => this._promise("getOnTop"));
            r(this, "setDarkMode", t => this._promise("setDarkMode", !!t));
            r(this, "getDarkMode", () => this._promise("getDarkMode"));
            r(this, "quit", () => this._promise("quit"));
            r(this, "openExternal", t => this._promise("openExternal", "".concat(t)));
            this._register("main"), (this.login = new pe());
        }
    };
});
var q = _((He, F) => {
    var h;
    F.exports =
        ((h = class {
            static getSourceChannelName(e) {
                return "".concat(h.WINDOW_SOURCE, "/").concat(e);
            }
            static getTargetChannelName(e) {
                return "".concat(h.WINDOW_TARGET, "/").concat(e);
            }
        }),
        r(h, "WINDOW_MAIN", "@main"),
        r(h, "WINDOW_MAIN_LOGIN", "@main/login"),
        r(h, "WINDOW_SOURCE", "@source"),
        r(h, "WINDOW_TARGET", "@target"),
        h);
});
var D = _((Fe, K) => {
    var { ipcRenderer: N, contextBridge: he } = require("electron"),
        _e = require("crypto"),
        ue = W(),
        de = j(),
        me = U(),
        ge = z(),
        b = q(),
        u,
        $,
        m,
        w,
        J;
    K.exports =
        ((J = class {
            constructor(e, t = !0) {
                p(this, u, "");
                p(this, $, {});
                p(this, m, {});
                p(this, w, {});
                r(this, "source", {
                    send: (e, t, i) => {
                        this.send(b.getSourceChannelName(e), t, i);
                    },
                    invoke: async (e, t, i, o = 0) => await this.invoke(b.getSourceChannelName(e), t, i, o)
                });
                r(this, "target", {
                    send: (e, t, i) => {
                        this.send(b.getTargetChannelName(e), t, i);
                    },
                    invoke: async (e, t, i, o = 0) => await this.invoke(b.getTargetChannelName(e), t, i, o)
                });
                let i = this;
                y(this, u, e),
                    y(this, w, {
                        ibc: {
                            handle: (...o) => this.handle.call(this, ...o),
                            send: (...o) => this.send.call(this, ...o),
                            invoke: async (...o) => await this.invoke.call(this, ...o),
                            source: {
                                send: (...o) => this.source.send.call(this, ...o),
                                invoke: async (...o) => await this.source.invoke.call(this, ...o)
                            },
                            target: {
                                send: (...o) => this.target.send.call(this, ...o),
                                invoke: async (...o) => await this.target.invoke.call(this, ...o)
                            },
                            winName: n(this, u)
                        },
                        ipc: { device: new ue(), source: new de(), target: new me(), main: new ge() },
                        devMode: !1
                    }),
                    N.on(n(this, u), (o, l) => {
                        if (l.length < 3) return;
                        let [c, a, x] = l,
                            { type: d, fromWin: g, promiseId: T } = x ?? {};
                        if (d === "req")
                            (async () => {
                                let f = null;
                                try {
                                    if (typeof c != "string" || typeof n(i, $)[c] != "function")
                                        throw new Error("Inter-browser communication handle not declared");
                                    Array.isArray(a) || (a = []), (f = await n(i, $)[c](...a));
                                } catch (k) {
                                    let te = "".concat(g, " >> ").concat(n(i, u), "/").concat(c, "()");
                                    (f = new Error("".concat(te, " ").concat(k))),
                                        n(this, w).devMode && console.warn("".concat(f));
                                }
                                typeof g == "string" && typeof T == "string" && N.send(g, c, f, { type: "res", promiseId: T });
                            })();
                        else {
                            let f = typeof T == "string" ? "".concat(c, ":").concat(T) : null;
                            if (f !== null) {
                                let k = n(i, m)[f] ?? null;
                                k !== null && (a instanceof Error ? k.reject(a) : k.resolve(a), delete n(i, m)[f]);
                            }
                        }
                    }),
                    t && he.exposeInMainWorld("sdk", n(this, w));
            }
            getSdk() {
                return n(this, w);
            }
            handle(e, t) {
                typeof e == "string" && typeof t == "function" && (n(this, $)[e] = t);
            }
            send(e, t, i) {
                do {
                    if (typeof e != "string" || typeof t != "string") break;
                    Array.isArray(i) || (i = []), N.send(e, t, i, { type: "req", fromWin: n(this, u) });
                } while (!1);
            }
            async invoke(e, t, i, o = 0) {
                let l = this;
                if (typeof e != "string" || typeof t != "string") return null;
                Array.isArray(i) || (i = []);
                let c = parseInt(o, 10);
                (isNaN(c) || c < 0) && (c = 0);
                let a = (() => {
                        let d = Date.now().toString(36),
                            g = _e.randomBytes(4).toString("hex");
                        return "".concat(d).concat(g);
                    })(),
                    x = new Promise((d, g) => {
                        n(this, m)["".concat(t, ":").concat(a)] = { resolve: d, reject: g };
                    });
                return (
                    c > 0 &&
                        setTimeout(() => {
                            let d = typeof a == "string" ? "".concat(t, ":").concat(a) : null;
                            if (typeof n(l, m)[d] < "u") {
                                try {
                                    n(l, m)[d].reject(
                                        new Error("".concat(n(l, u), " >> ").concat(e, "/").concat(t, "() Timed out"))
                                    );
                                } catch {}
                                delete n(l, m)[d];
                            }
                        }, c),
                    N.send(e, t, i, { type: "req", fromWin: n(this, u), promiseId: a }),
                    x
                );
            }
        }),
        (u = new WeakMap()),
        ($ = new WeakMap()),
        (m = new WeakMap()),
        (w = new WeakMap()),
        J);
});
var X = _((Qe, V) => {
    var fe = D(),
        ye = q(),
        P,
        Q;
    V.exports =
        ((Q = class {
            constructor() {
                p(this, P);
                r(this, "getOnTop", async () => await n(this, P).ipc.main.getOnTop());
                r(this, "setOnTop", async e => await n(this, P).ipc.main.setOnTop(e));
                y(this, P, new fe(ye.WINDOW_MAIN).getSdk());
                for (let e of Object.getOwnPropertyNames(this)) typeof this[e] == "function" && n(this, P).ibc.handle(e, this[e]);
            }
        }),
        (P = new WeakMap()),
        Q);
});
var ee = _((Ye, Z) => {
    var Ie = D(),
        we = q(),
        O,
        Y;
    Z.exports =
        ((Y = class {
            constructor() {
                p(this, O);
                r(this, "getOnTop", async () => await n(this, O).ipc.main.login.getOnTop());
                r(this, "setOnTop", async e => await n(this, O).ipc.main.login.setOnTop(e));
                y(this, O, new Ie(we.WINDOW_MAIN_LOGIN).getSdk());
                for (let e of Object.getOwnPropertyNames(this)) typeof this[e] == "function" && n(this, O).ibc.handle(e, this[e]);
            }
        }),
        (O = new WeakMap()),
        Y);
});
var Pe = X(),
    Oe = ee(),
    ve = process.argv.filter(s => s.indexOf("--win-type=") >= 0).shift();
switch ("".concat(ve).split("=")[1]) {
    case "main/login":
        new Oe();
        break;
    default:
        new Pe();
}
