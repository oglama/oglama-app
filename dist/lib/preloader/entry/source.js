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
var b = i => {
    throw TypeError(i);
};
var se = (i, t, e) => (t in i ? re(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : (i[t] = e));
var u = (i, t) => () => (t || i((t = { exports: {} }).exports, t), t.exports);
var r = (i, t, e) => se(i, typeof t != "symbol" ? t + "" : t, e),
    C = (i, t, e) => t.has(i) || b("Cannot " + e);
var n = (i, t, e) => (C(i, t, "read from private field"), e ? e.call(i) : t.get(i)),
    h = (i, t, e) =>
        t.has(i) ? b("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e),
    P = (i, t, e, s) => (C(i, t, "write to private field"), s ? s.call(i, e) : t.set(i, e), e);
var I = u((Se, A) => {
    var { ipcRenderer: ie } = require("electron"),
        y,
        T;
    A.exports =
        ((T = class {
            constructor() {
                h(this, y, {});
            }
            _register(t) {
                if (typeof t == "string")
                    for (let e of Object.getOwnPropertyNames(this))
                        ["_", "#"].includes(e[0]) ||
                            typeof this[e] != "function" ||
                            (n(this, y)[e] = "ipc:".concat(t, ":").concat(e));
            }
            _runner(t, ...e) {
                let s = function (o, l, a) {
                    this.run = async function () {
                        let c = null;
                        if ((typeof n(o, y)[l] == "string" && (c = await ie.invoke(n(o, y)[l], ...a)), c instanceof Error))
                            throw new Error("IPC/".concat(n(o, y)[l], " ").concat(c));
                        return c;
                    };
                };
                return new s(this, t, e);
            }
            async _promise(t, ...e) {
                return await this._runner(t, ...e).run();
            }
        }),
        (y = new WeakMap()),
        T);
});
var M = u((xe, E) => {
    var oe = I();
    E.exports = class extends oe {
        constructor() {
            super();
            r(this, "purge", e => this._promise("purge", e));
            r(this, "sourceGet", e => this._promise("sourceGet", e));
            r(this, "sourceSet", (e, s) => this._promise("sourceSet", e, s));
            r(this, "runInit", (e, s = null, o = null, l = null) => this._promise("runInit", e, s, o, l));
            r(this, "fileInit", async (e, s, o) => this._promise("fileInit", e, s, o));
            r(this, "fileAppend", async (e, s, o) => this._promise("fileAppend", e, s, o));
            r(this, "fileDelete", async (e, s) => this._promise("fileDelete", e, s));
            this._register("diskStorage");
        }
    };
});
var R = u((Ne, W) => {
    var ne = I();
    W.exports = class extends ne {
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
var j = u((Te, U) => {
    var ce = I();
    U.exports = class extends ce {
        constructor() {
            super();
            r(this, "list", () => this._promise("list"));
            r(this, "closeAll", () => this._promise("closeAll"));
            r(this, "open", e => this._promise("open", e));
            r(this, "close", e => this._promise("close", e));
            r(this, "webContents", (e, s, o) => this._promise("webContents", e, s, o));
            this._register("source");
        }
    };
});
var L = u((Me, G) => {
    var ae = I();
    G.exports = class extends ae {
        constructor() {
            super();
            r(this, "list", () => this._promise("list"));
            r(this, "removeAll", () => this._promise("removeAll"));
            r(this, "add", (e, s, o = !1) => this._promise("add", e, s, o));
            r(this, "remove", e => this._promise("remove", e));
            r(this, "select", e => this._promise("select", e));
            r(this, "getSelected", () => this._promise("getSelected"));
            r(this, "openDevTools", e => this._promise("openDevTools", e));
            r(this, "webContents", (e, s, o) => this._promise("webContents", e, s, o));
            this._register("target");
        }
    };
});
var H = u((Ue, B) => {
    var le = I();
    B.exports = class extends le {
        constructor() {
            super();
            r(this, "openExternal", e => this._promise("openExternal", "".concat(e)));
            this._register("main/login");
        }
    };
});
var F = u((Le, z) => {
    var pe = I(),
        ue = H();
    z.exports = class extends pe {
        constructor() {
            super();
            r(this, "login", null);
            r(this, "setOnTop", e => this._promise("setOnTop", !!e));
            r(this, "getOnTop", () => this._promise("getOnTop"));
            r(this, "setDarkMode", e => this._promise("setDarkMode", !!e));
            r(this, "getDarkMode", () => this._promise("getDarkMode"));
            r(this, "quit", () => this._promise("quit"));
            r(this, "openExternal", e => this._promise("openExternal", "".concat(e)));
            this._register("main"), (this.login = new ue());
        }
    };
});
var N = u((He, J) => {
    var p;
    J.exports =
        ((p = class {
            static getSourceChannelName(t) {
                return "".concat(p.WINDOW_SOURCE, "/").concat(t);
            }
            static getTargetChannelName(t) {
                return "".concat(p.WINDOW_TARGET, "/").concat(t);
            }
        }),
        r(p, "WINDOW_MAIN", "@main"),
        r(p, "WINDOW_MAIN_LOGIN", "@main/login"),
        r(p, "WINDOW_SOURCE", "@source"),
        r(p, "WINDOW_TARGET", "@target"),
        p);
});
var V = u((Je, Q) => {
    var { ipcRenderer: q, contextBridge: he } = require("electron"),
        _e = require("crypto"),
        de = M(),
        ge = R(),
        me = j(),
        fe = L(),
        ye = F(),
        x = N(),
        _,
        v,
        g,
        w,
        K;
    Q.exports =
        ((K = class {
            constructor(t, e = !0) {
                h(this, _, "");
                h(this, v, {});
                h(this, g, {});
                h(this, w, {});
                r(this, "source", {
                    send: (t, e, s) => {
                        this.send(x.getSourceChannelName(t), e, s);
                    },
                    invoke: async (t, e, s, o = 0) => await this.invoke(x.getSourceChannelName(t), e, s, o)
                });
                r(this, "target", {
                    send: (t, e, s) => {
                        this.send(x.getTargetChannelName(t), e, s);
                    },
                    invoke: async (t, e, s, o = 0) => await this.invoke(x.getTargetChannelName(t), e, s, o)
                });
                let s = this;
                P(this, _, t),
                    P(this, w, {
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
                        ipc: { diskStorage: new de(), device: new ge(), source: new me(), target: new fe(), main: new ye() },
                        devMode: !1
                    }),
                    q.on(n(this, _), (o, l) => {
                        if (l.length < 3) return;
                        let [a, c, O] = l,
                            { type: d, fromWin: m, promiseId: $ } = O ?? {};
                        if (d === "req")
                            (async () => {
                                let f = null;
                                try {
                                    if (typeof a != "string" || typeof n(s, v)[a] != "function")
                                        throw new Error("Inter-browser communication handle not declared");
                                    Array.isArray(c) || (c = []), (f = await n(s, v)[a](...c));
                                } catch (k) {
                                    let te = "".concat(m, " >> ").concat(n(s, _), "/").concat(a, "()");
                                    (f = new Error("".concat(te, " ").concat(k))),
                                        n(this, w).devMode && console.warn("".concat(f));
                                }
                                typeof m == "string" && typeof $ == "string" && q.send(m, a, f, { type: "res", promiseId: $ });
                            })();
                        else {
                            let f = typeof $ == "string" ? "".concat(a, ":").concat($) : null;
                            if (f !== null) {
                                let k = n(s, g)[f] ?? null;
                                k !== null && (c instanceof Error ? k.reject(c) : k.resolve(c), delete n(s, g)[f]);
                            }
                        }
                    }),
                    e && he.exposeInMainWorld("sdk", n(this, w));
            }
            getSdk() {
                return n(this, w);
            }
            handle(t, e) {
                typeof t == "string" && typeof e == "function" && (n(this, v)[t] = e);
            }
            send(t, e, s) {
                do {
                    if (typeof t != "string" || typeof e != "string") break;
                    Array.isArray(s) || (s = []), q.send(t, e, s, { type: "req", fromWin: n(this, _) });
                } while (!1);
            }
            async invoke(t, e, s, o = 0) {
                let l = this;
                if (typeof t != "string" || typeof e != "string") return null;
                Array.isArray(s) || (s = []);
                let a = parseInt(o, 10);
                (isNaN(a) || a < 0) && (a = 0);
                let c = (() => {
                        let d = Date.now().toString(36),
                            m = _e.randomBytes(4).toString("hex");
                        return "".concat(d).concat(m);
                    })(),
                    O = new Promise((d, m) => {
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
                    q.send(t, e, s, { type: "req", fromWin: n(this, _), promiseId: c }),
                    O
                );
            }
        }),
        (_ = new WeakMap()),
        (v = new WeakMap()),
        (g = new WeakMap()),
        (w = new WeakMap()),
        K);
});
var Z = u((Ve, Y) => {
    var Ie = V(),
        we = N(),
        D,
        S,
        X;
    Y.exports =
        ((X = class {
            constructor(t) {
                h(this, D);
                h(this, S);
                P(this, D, t), P(this, S, new Ie(we.getSourceChannelName(t)).getSdk());
                for (let e of Object.getOwnPropertyNames(this)) typeof this[e] == "function" && n(this, S).ibc.handle(e, this[e]);
            }
        }),
        (D = new WeakMap()),
        (S = new WeakMap()),
        X);
});
var Pe = Z(),
    ee = process.argv.filter(i => i.indexOf("--agent-id=") >= 0).shift();
if (typeof ee == "string") {
    let i = ee.split("=")[1];
    i.length && new Pe(i);
}
