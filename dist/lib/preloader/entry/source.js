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
var ee = Object.defineProperty;
var C = s => {
    throw TypeError(s);
};
var te = (s, t, e) => (t in s ? ee(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : (s[t] = e));
var _ = (s, t) => () => (t || s((t = { exports: {} }).exports, t), t.exports);
var r = (s, t, e) => te(s, typeof t != "symbol" ? t + "" : t, e),
    T = (s, t, e) => t.has(s) || C("Cannot " + e);
var n = (s, t, e) => (T(s, t, "read from private field"), e ? e.call(s) : t.get(s)),
    h = (s, t, e) =>
        t.has(s) ? C("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e),
    w = (s, t, e, i) => (T(s, t, "write to private field"), i ? i.call(s, e) : t.set(s, e), e);
var P = _((we, E) => {
    var { ipcRenderer: re } = require("electron"),
        y,
        D;
    E.exports =
        ((D = class {
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
                let i = function (o, l, a) {
                    this.run = async function () {
                        let c = null;
                        if ((typeof n(o, y)[l] == "string" && (c = await re.invoke(n(o, y)[l], ...a)), c instanceof Error))
                            throw new Error("IPC/".concat(n(o, y)[l], " ").concat(c));
                        return c;
                    };
                };
                return new i(this, t, e);
            }
            async _promise(t, ...e) {
                return await this._runner(t, ...e).run();
            }
        }),
        (y = new WeakMap()),
        D);
});
var M = _(($e, A) => {
    var se = P();
    A.exports = class extends se {
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
var R = _((xe, W) => {
    var ie = P();
    W.exports = class extends ie {
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
var j = _((Ne, U) => {
    var oe = P();
    U.exports = class extends oe {
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
var L = _((Te, G) => {
    var ne = P();
    G.exports = class extends ne {
        constructor() {
            super();
            r(this, "openExternal", e => this._promise("openExternal", "".concat(e)));
            this._register("main/login");
        }
    };
});
var H = _((Ae, B) => {
    var ce = P(),
        ae = L();
    B.exports = class extends ce {
        constructor() {
            super();
            r(this, "login", null);
            r(this, "setOnTop", e => this._promise("setOnTop", !!e));
            r(this, "getOnTop", () => this._promise("getOnTop"));
            r(this, "setDarkMode", e => this._promise("setDarkMode", !!e));
            r(this, "getDarkMode", () => this._promise("getDarkMode"));
            r(this, "quit", () => this._promise("quit"));
            r(this, "openExternal", e => this._promise("openExternal", "".concat(e)));
            this._register("main"), (this.login = new ae());
        }
    };
});
var b = _((We, z) => {
    var p;
    z.exports =
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
var K = _((je, J) => {
    var { ipcRenderer: x, contextBridge: le } = require("electron"),
        pe = require("crypto"),
        he = M(),
        ue = R(),
        de = j(),
        _e = H(),
        O = b(),
        u,
        v,
        g,
        I,
        F;
    J.exports =
        ((F = class {
            constructor(t, e = !0) {
                h(this, u, "");
                h(this, v, {});
                h(this, g, {});
                h(this, I, {});
                r(this, "source", {
                    send: (t, e, i) => {
                        this.send(O.getSourceChannelName(t), e, i);
                    },
                    invoke: async (t, e, i, o = 0) => await this.invoke(O.getSourceChannelName(t), e, i, o)
                });
                r(this, "target", {
                    send: (t, e, i) => {
                        this.send(O.getTargetChannelName(t), e, i);
                    },
                    invoke: async (t, e, i, o = 0) => await this.invoke(O.getTargetChannelName(t), e, i, o)
                });
                let i = this;
                w(this, u, t),
                    w(this, I, {
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
                        ipc: { device: new he(), source: new ue(), target: new de(), main: new _e() },
                        devMode: !1
                    }),
                    x.on(n(this, u), (o, l) => {
                        if (l.length < 3) return;
                        let [a, c, N] = l,
                            { type: d, fromWin: m, promiseId: q } = N ?? {};
                        if (d === "req")
                            (async () => {
                                let f = null;
                                try {
                                    if (typeof a != "string" || typeof n(i, v)[a] != "function")
                                        throw new Error("Inter-browser communication handle not declared");
                                    Array.isArray(c) || (c = []), (f = await n(i, v)[a](...c));
                                } catch ($) {
                                    let Z = "".concat(m, " >> ").concat(n(i, u), "/").concat(a, "()");
                                    (f = new Error("".concat(Z, " ").concat($))),
                                        n(this, I).devMode && console.warn("".concat(f));
                                }
                                typeof m == "string" && typeof q == "string" && x.send(m, a, f, { type: "res", promiseId: q });
                            })();
                        else {
                            let f = typeof q == "string" ? "".concat(a, ":").concat(q) : null;
                            if (f !== null) {
                                let $ = n(i, g)[f] ?? null;
                                $ !== null && (c instanceof Error ? $.reject(c) : $.resolve(c), delete n(i, g)[f]);
                            }
                        }
                    }),
                    e && le.exposeInMainWorld("sdk", n(this, I));
            }
            getSdk() {
                return n(this, I);
            }
            handle(t, e) {
                typeof t == "string" && typeof e == "function" && (n(this, v)[t] = e);
            }
            send(t, e, i) {
                do {
                    if (typeof t != "string" || typeof e != "string") break;
                    Array.isArray(i) || (i = []), x.send(t, e, i, { type: "req", fromWin: n(this, u) });
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
                            m = pe.randomBytes(4).toString("hex");
                        return "".concat(d).concat(m);
                    })(),
                    N = new Promise((d, m) => {
                        n(this, g)["".concat(e, ":").concat(c)] = { resolve: d, reject: m };
                    });
                return (
                    a > 0 &&
                        setTimeout(() => {
                            let d = typeof c == "string" ? "".concat(e, ":").concat(c) : null;
                            if (typeof n(l, g)[d] < "u") {
                                try {
                                    n(l, g)[d].reject(
                                        new Error("".concat(n(l, u), " >> ").concat(t, "/").concat(e, "() Timed out"))
                                    );
                                } catch {}
                                delete n(l, g)[d];
                            }
                        }, a),
                    x.send(t, e, i, { type: "req", fromWin: n(this, u), promiseId: c }),
                    N
                );
            }
        }),
        (u = new WeakMap()),
        (v = new WeakMap()),
        (g = new WeakMap()),
        (I = new WeakMap()),
        F);
});
var X = _((Be, V) => {
    var ge = K(),
        me = b(),
        S,
        k,
        Q;
    V.exports =
        ((Q = class {
            constructor(t) {
                h(this, S);
                h(this, k);
                w(this, S, t), w(this, k, new ge(me.getSourceChannelName(t)).getSdk());
                for (let e of Object.getOwnPropertyNames(this)) typeof this[e] == "function" && n(this, k).ibc.handle(e, this[e]);
            }
        }),
        (S = new WeakMap()),
        (k = new WeakMap()),
        Q);
});
var fe = X(),
    Y = process.argv.filter(s => s.indexOf("--agent-id=") >= 0).shift();
if (typeof Y == "string") {
    let s = Y.split("=")[1];
    s.length && new fe(s);
}
