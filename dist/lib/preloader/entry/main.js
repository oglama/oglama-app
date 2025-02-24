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
var D = s => {
    throw TypeError(s);
};
var oe = (s, t, e) => (t in s ? ie(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : (s[t] = e));
var p = (s, t) => () => (t || s((t = { exports: {} }).exports, t), t.exports);
var r = (s, t, e) => oe(s, typeof t != "symbol" ? t + "" : t, e),
    M = (s, t, e) => t.has(s) || D("Cannot " + e);
var n = (s, t, e) => (M(s, t, "read from private field"), e ? e.call(s) : t.get(s)),
    h = (s, t, e) =>
        t.has(s) ? D("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e),
    y = (s, t, e, i) => (M(s, t, "write to private field"), i ? i.call(s, e) : t.set(s, e), e);
var w = p((be, E) => {
    var { ipcRenderer: ne } = require("electron"),
        I,
        C;
    E.exports =
        ((C = class {
            constructor() {
                h(this, I, {});
            }
            _register(t) {
                if (typeof t == "string")
                    for (let e of Object.getOwnPropertyNames(this))
                        ["_", "#"].includes(e[0]) ||
                            typeof this[e] != "function" ||
                            (n(this, I)[e] = "ipc:".concat(t, ":").concat(e));
            }
            _runner(t, ...e) {
                let i = function (o, l, a) {
                    this.run = async function () {
                        let c = null;
                        if ((typeof n(o, I)[l] == "string" && (c = await ne.invoke(n(o, I)[l], ...a)), c instanceof Error))
                            throw new Error("IPC/".concat(n(o, I)[l], " ").concat(c));
                        return c;
                    };
                };
                return new i(this, t, e);
            }
            async _promise(t, ...e) {
                return await this._runner(t, ...e).run();
            }
        }),
        (I = new WeakMap()),
        C);
});
var W = p((Me, A) => {
    var ce = w();
    A.exports = class extends ce {
        constructor() {
            super();
            r(this, "purge", e => this._promise("purge", e));
            r(this, "sourceGet", e => this._promise("sourceGet", e));
            r(this, "sourceSet", (e, i) => this._promise("sourceSet", e, i));
            this._register("diskStorage");
        }
    };
});
var j = p((Ae, R) => {
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
            r(this, "webContents", (e, i, o) => this._promise("webContents", e, i, o));
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
            r(this, "add", (e, i, o = !1) => this._promise("add", e, i, o));
            r(this, "remove", e => this._promise("remove", e));
            r(this, "select", e => this._promise("select", e));
            r(this, "getSelected", () => this._promise("getSelected"));
            r(this, "openDevTools", e => this._promise("openDevTools", e));
            r(this, "webContents", (e, i, o) => this._promise("webContents", e, i, o));
            this._register("target");
        }
    };
});
var z = p((ze, B) => {
    var he = w();
    B.exports = class extends he {
        constructor() {
            super();
            r(this, "openExternal", e => this._promise("openExternal", "".concat(e)));
            this._register("main/login");
        }
    };
});
var J = p((Ke, F) => {
    var ue = w(),
        _e = z();
    F.exports = class extends ue {
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
    var u;
    K.exports =
        ((u = class {
            static getSourceChannelName(t) {
                return "".concat(u.WINDOW_SOURCE, "/").concat(t);
            }
            static getTargetChannelName(t) {
                return "".concat(u.WINDOW_TARGET, "/").concat(t);
            }
        }),
        r(u, "WINDOW_MAIN", "@main"),
        r(u, "WINDOW_MAIN_LOGIN", "@main/login"),
        r(u, "WINDOW_SOURCE", "@source"),
        r(u, "WINDOW_TARGET", "@target"),
        u);
});
var T = p((Ze, V) => {
    var { ipcRenderer: x, contextBridge: de } = require("electron"),
        ge = require("crypto"),
        me = W(),
        fe = j(),
        ye = L(),
        Ie = H(),
        we = J(),
        N = S(),
        _,
        O,
        g,
        P,
        Q;
    V.exports =
        ((Q = class {
            constructor(t, e = !0) {
                h(this, _, "");
                h(this, O, {});
                h(this, g, {});
                h(this, P, {});
                r(this, "source", {
                    send: (t, e, i) => {
                        this.send(N.getSourceChannelName(t), e, i);
                    },
                    invoke: async (t, e, i, o = 0) => await this.invoke(N.getSourceChannelName(t), e, i, o)
                });
                r(this, "target", {
                    send: (t, e, i) => {
                        this.send(N.getTargetChannelName(t), e, i);
                    },
                    invoke: async (t, e, i, o = 0) => await this.invoke(N.getTargetChannelName(t), e, i, o)
                });
                let i = this;
                y(this, _, t),
                    y(this, P, {
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
                            winName: n(this, _)
                        },
                        ipc: { diskStorage: new me(), device: new fe(), source: new ye(), target: new Ie(), main: new we() },
                        devMode: !1
                    }),
                    x.on(n(this, _), (o, l) => {
                        if (l.length < 3) return;
                        let [a, c, b] = l,
                            { type: d, fromWin: m, promiseId: q } = b ?? {};
                        if (d === "req")
                            (async () => {
                                let f = null;
                                try {
                                    if (typeof a != "string" || typeof n(i, O)[a] != "function")
                                        throw new Error("Inter-browser communication handle not declared");
                                    Array.isArray(c) || (c = []), (f = await n(i, O)[a](...c));
                                } catch (v) {
                                    let se = "".concat(m, " >> ").concat(n(i, _), "/").concat(a, "()");
                                    (f = new Error("".concat(se, " ").concat(v))),
                                        n(this, P).devMode && console.warn("".concat(f));
                                }
                                typeof m == "string" && typeof q == "string" && x.send(m, a, f, { type: "res", promiseId: q });
                            })();
                        else {
                            let f = typeof q == "string" ? "".concat(a, ":").concat(q) : null;
                            if (f !== null) {
                                let v = n(i, g)[f] ?? null;
                                v !== null && (c instanceof Error ? v.reject(c) : v.resolve(c), delete n(i, g)[f]);
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
            send(t, e, i) {
                do {
                    if (typeof t != "string" || typeof e != "string") break;
                    Array.isArray(i) || (i = []), x.send(t, e, i, { type: "req", fromWin: n(this, _) });
                } while (!1);
            }
            async invoke(t, e, i, o = 0) {
                let l = this;
                if (typeof t != "string" || typeof e != "string") return null;
                Array.isArray(i) || (i = []);
                let a = parseInt(o, 10);
                (isNaN(a) || a < 0) && (a = 0);
                let c = (() => {
                        let d = Date.now().toString(36),
                            m = ge.randomBytes(4).toString("hex");
                        return "".concat(d).concat(m);
                    })(),
                    b = new Promise((d, m) => {
                        n(this, g)["".concat(e, ":").concat(c)] = { resolve: d, reject: m };
                    });
                return (
                    a > 0 &&
                        setTimeout(() => {
                            let d = typeof c == "string" ? "".concat(e, ":").concat(c) : null;
                            if (typeof n(l, g)[d] < "u") {
                                try {
                                    n(l, g)[d].reject(
                                        new Error("".concat(n(l, _), " >> ").concat(t, "/").concat(e, "() Timed out"))
                                    );
                                } catch {}
                                delete n(l, g)[d];
                            }
                        }, a),
                    x.send(t, e, i, { type: "req", fromWin: n(this, _), promiseId: c }),
                    b
                );
            }
        }),
        (_ = new WeakMap()),
        (O = new WeakMap()),
        (g = new WeakMap()),
        (P = new WeakMap()),
        Q);
});
var Z = p((rt, Y) => {
    var Pe = T(),
        ke = S(),
        k,
        X;
    Y.exports =
        ((X = class {
            constructor() {
                h(this, k);
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
    var Oe = T(),
        ve = S(),
        $,
        ee;
    te.exports =
        ((ee = class {
            constructor() {
                h(this, $);
                y(this, $, new Oe(ve.WINDOW_MAIN_LOGIN).getSdk());
                for (let t of Object.getOwnPropertyNames(this)) typeof this[t] == "function" && n(this, $).ibc.handle(t, this[t]);
            }
        }),
        ($ = new WeakMap()),
        ee);
});
var $e = Z(),
    qe = re(),
    Se = process.argv.filter(s => s.indexOf("--win-type=") >= 0).shift();
switch ("".concat(Se).split("=")[1]) {
    case "main/login":
        new qe();
        break;
    default:
        new $e();
}
