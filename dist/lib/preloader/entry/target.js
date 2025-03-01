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
var se = Object.defineProperty;
var E = n => {
    throw TypeError(n);
};
var ie = (n, t, e) => (t in n ? se(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : (n[t] = e));
var _ = (n, t) => () => (t || n((t = { exports: {} }).exports, t), t.exports);
var s = (n, t, e) => ie(n, typeof t != "symbol" ? t + "" : t, e),
    A = (n, t, e) => t.has(n) || E("Cannot " + e);
var o = (n, t, e) => (A(n, t, "read from private field"), e ? e.call(n) : t.get(n)),
    g = (n, t, e) =>
        t.has(n) ? E("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e),
    b = (n, t, e, r) => (A(n, t, "write to private field"), r ? r.call(n, e) : t.set(n, e), e);
var S = _((be, O) => {
    var { ipcRenderer: oe } = require("electron"),
        $,
        N;
    O.exports =
        ((N = class {
            constructor() {
                g(this, $, {});
            }
            _register(t) {
                if (typeof t == "string")
                    for (let e of Object.getOwnPropertyNames(this))
                        ["_", "#"].includes(e[0]) ||
                            typeof this[e] != "function" ||
                            (o(this, $)[e] = "ipc:".concat(t, ":").concat(e));
            }
            _runner(t, ...e) {
                let r = function (i, l, c) {
                    this.run = async function () {
                        let a = null;
                        if ((typeof o(i, $)[l] == "string" && (a = await oe.invoke(o(i, $)[l], ...c)), a instanceof Error))
                            throw new Error("IPC/".concat(o(i, $)[l], " ").concat(a));
                        return a;
                    };
                };
                return new r(this, t, e);
            }
            async _promise(t, ...e) {
                return await this._runner(t, ...e).run();
            }
        }),
        ($ = new WeakMap()),
        N);
});
var W = _((qe, M) => {
    var ne = S();
    M.exports = class extends ne {
        constructor() {
            super();
            s(this, "purge", e => this._promise("purge", e));
            s(this, "sourceGet", e => this._promise("sourceGet", e));
            s(this, "sourceSet", (e, r) => this._promise("sourceSet", e, r));
            s(this, "runInit", (e, r = null, i = null, l = null) => this._promise("runInit", e, r, i, l));
            s(this, "fileInit", async (e, r, i) => this._promise("fileInit", e, r, i));
            s(this, "fileAppend", async (e, r, i) => this._promise("fileAppend", e, r, i));
            s(this, "fileDelete", async (e, r) => this._promise("fileDelete", e, r));
            this._register("diskStorage");
        }
    };
});
var U = _((De, R) => {
    var ae = S();
    R.exports = class extends ae {
        constructor() {
            super();
            s(this, "getOS", () => this._promise("getOS"));
            s(this, "getName", () => this._promise("getName"));
            s(this, "getUUID", () => this._promise("getUUID"));
            s(this, "getSerialNumber", () => this._promise("getSerialNumber"));
            s(this, "setPostAuth", e => this._promise("setPostAuth", !!e));
            s(this, "getPostAuth", () => this._promise("getPostAuth"));
            this._register("device");
        }
    };
});
var B = _((Ne, j) => {
    var le = S();
    j.exports = class extends le {
        constructor() {
            super();
            s(this, "list", () => this._promise("list"));
            s(this, "closeAll", () => this._promise("closeAll"));
            s(this, "open", e => this._promise("open", e));
            s(this, "close", e => this._promise("close", e));
            s(this, "webContents", (e, r, i) => this._promise("webContents", e, r, i));
            this._register("source");
        }
    };
});
var L = _((We, G) => {
    var ce = S();
    G.exports = class extends ce {
        constructor() {
            super();
            s(this, "list", () => this._promise("list"));
            s(this, "removeAll", () => this._promise("removeAll"));
            s(this, "add", (e, r, i = !1) => this._promise("add", e, r, i));
            s(this, "remove", e => this._promise("remove", e));
            s(this, "select", e => this._promise("select", e));
            s(this, "getSelected", () => this._promise("getSelected"));
            s(this, "openDevTools", e => this._promise("openDevTools", e));
            s(this, "webContents", (e, r, i) => this._promise("webContents", e, r, i));
            this._register("target");
        }
    };
});
var F = _((je, H) => {
    var pe = S();
    H.exports = class extends pe {
        constructor() {
            super();
            s(this, "openExternal", e => this._promise("openExternal", "".concat(e)));
            this._register("main/login");
        }
    };
});
var Q = _((Le, X) => {
    var he = S(),
        ue = F();
    X.exports = class extends he {
        constructor() {
            super();
            s(this, "login", null);
            s(this, "setOnTop", e => this._promise("setOnTop", !!e));
            s(this, "getOnTop", () => this._promise("getOnTop"));
            s(this, "setDarkMode", e => this._promise("setDarkMode", !!e));
            s(this, "getDarkMode", () => this._promise("getDarkMode"));
            s(this, "quit", () => this._promise("quit"));
            s(this, "openExternal", e => this._promise("openExternal", "".concat(e)));
            this._register("main"), (this.login = new ue());
        }
    };
});
var D = _((Fe, V) => {
    var f;
    V.exports =
        ((f = class {
            static getSourceChannelName(t) {
                return "".concat(f.WINDOW_SOURCE, "/").concat(t);
            }
            static getTargetChannelName(t) {
                return "".concat(f.WINDOW_TARGET, "/").concat(t);
            }
        }),
        s(f, "WINDOW_MAIN", "@main"),
        s(f, "WINDOW_MAIN_LOGIN", "@main/login"),
        s(f, "WINDOW_SOURCE", "@source"),
        s(f, "WINDOW_TARGET", "@target"),
        f);
});
var J = _((Ve, z) => {
    var { ipcRenderer: q, contextBridge: de } = require("electron"),
        ge = require("crypto"),
        fe = W(),
        _e = U(),
        me = B(),
        ye = L(),
        we = Q(),
        x = D(),
        m,
        k,
        I,
        P,
        Y;
    z.exports =
        ((Y = class {
            constructor(t, e = !0) {
                g(this, m, "");
                g(this, k, {});
                g(this, I, {});
                g(this, P, {});
                s(this, "source", {
                    send: (t, e, r) => {
                        this.send(x.getSourceChannelName(t), e, r);
                    },
                    invoke: async (t, e, r, i = 0) => await this.invoke(x.getSourceChannelName(t), e, r, i)
                });
                s(this, "target", {
                    send: (t, e, r) => {
                        this.send(x.getTargetChannelName(t), e, r);
                    },
                    invoke: async (t, e, r, i = 0) => await this.invoke(x.getTargetChannelName(t), e, r, i)
                });
                let r = this;
                b(this, m, t),
                    b(this, P, {
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
                            winName: o(this, m)
                        },
                        ipc: { diskStorage: new fe(), device: new _e(), source: new me(), target: new ye(), main: new we() },
                        devMode: !1
                    }),
                    q.on(o(this, m), (i, l) => {
                        if (l.length < 3) return;
                        let [c, a, u] = l,
                            { type: h, fromWin: d, promiseId: v } = u ?? {};
                        if (h === "req")
                            (async () => {
                                let w = null;
                                try {
                                    if (typeof c != "string" || typeof o(r, k)[c] != "function")
                                        throw new Error("Inter-browser communication handle not declared");
                                    Array.isArray(a) || (a = []), (w = await o(r, k)[c](...a));
                                } catch (T) {
                                    let re = "".concat(d, " >> ").concat(o(r, m), "/").concat(c, "()");
                                    (w = new Error("".concat(re, " ").concat(T))),
                                        o(this, P).devMode && console.warn("".concat(w));
                                }
                                typeof d == "string" && typeof v == "string" && q.send(d, c, w, { type: "res", promiseId: v });
                            })();
                        else {
                            let w = typeof v == "string" ? "".concat(c, ":").concat(v) : null;
                            if (w !== null) {
                                let T = o(r, I)[w] ?? null;
                                T !== null && (a instanceof Error ? T.reject(a) : T.resolve(a), delete o(r, I)[w]);
                            }
                        }
                    }),
                    e && de.exposeInMainWorld("sdk", o(this, P));
            }
            getSdk() {
                return o(this, P);
            }
            handle(t, e) {
                typeof t == "string" && typeof e == "function" && (o(this, k)[t] = e);
            }
            send(t, e, r) {
                do {
                    if (typeof t != "string" || typeof e != "string") break;
                    Array.isArray(r) || (r = []), q.send(t, e, r, { type: "req", fromWin: o(this, m) });
                } while (!1);
            }
            async invoke(t, e, r, i = 0) {
                let l = this;
                if (typeof t != "string" || typeof e != "string") return null;
                Array.isArray(r) || (r = []);
                let c = parseInt(i, 10);
                (isNaN(c) || c < 0) && (c = 0);
                let a = (() => {
                        let h = Date.now().toString(36),
                            d = ge.randomBytes(4).toString("hex");
                        return "".concat(h).concat(d);
                    })(),
                    u = new Promise((h, d) => {
                        o(this, I)["".concat(e, ":").concat(a)] = { resolve: h, reject: d };
                    });
                return (
                    c > 0 &&
                        setTimeout(() => {
                            let h = typeof a == "string" ? "".concat(e, ":").concat(a) : null;
                            if (typeof o(l, I)[h] < "u") {
                                try {
                                    o(l, I)[h].reject(
                                        new Error("".concat(o(l, m), " >> ").concat(t, "/").concat(e, "() Timed out"))
                                    );
                                } catch {}
                                delete o(l, I)[h];
                            }
                        }, c),
                    q.send(t, e, r, { type: "req", fromWin: o(this, m), promiseId: a }),
                    u
                );
            }
        }),
        (m = new WeakMap()),
        (k = new WeakMap()),
        (I = new WeakMap()),
        (P = new WeakMap()),
        Y);
});
var ee = _((Je, Z) => {
    var Ie = J(),
        ve = D(),
        y,
        p,
        C,
        K;
    Z.exports =
        ((K = class {
            constructor(t) {
                g(this, y);
                g(this, p);
                g(this, C, (t, e = 0, r = []) => {
                    if (!(t instanceof Element)) return null;
                    if (t.id) return "#".concat(t.id);
                    let i = [];
                    for (; t; ) {
                        let l = t.nodeName.toLowerCase();
                        if (i.length === 0 && Array.isArray(r) && r.length)
                            for (let u of r) {
                                let h = t.getAttribute(u);
                                h && (l += "[".concat(u, '="').concat(h, '"]'));
                            }
                        t.className && (l += "." + t.className.trim().split(/\s+/).join("."));
                        let c = t,
                            a = 1;
                        for (; c.previousElementSibling; ) (c = c.previousElementSibling), a++;
                        (l += ":nth-child(".concat(a, ")")),
                            i.unshift(l),
                            e > 0 && t.className && i.length >= e ? (t = null) : (t = t.parentElement);
                    }
                    return i.join(" > ");
                });
                s(this, "navigate", t => {
                    o(this, p).ipc.target.webContents(o(this, y), "loadURL", [t]);
                });
                s(this, "query", async (t, e = 0, r = [], i = !1) => {
                    o(this, p).devMode &&
                        console.log(
                            "%c \u{1F50D} Query Selector (classDepth: "
                                .concat(e, ", fromScreenView: ")
                                .concat(i ? "true" : "false", ")  css=")
                                .concat(t),
                            "color:lightblue"
                        );
                    let l = [...document.querySelectorAll(t)]
                        .map(c => {
                            let { top: a, left: u, width: h, height: d } = c.getBoundingClientRect();
                            return {
                                selector: o(this, C).call(this, c, e, r),
                                top: a,
                                left: u,
                                width: h,
                                height: d,
                                visible: a < 0 ? a + d > 0 : a < window.innerHeight
                            };
                        })
                        .filter(c => (i ? c.top + c.height >= 0 : !0));
                    return o(this, p).devMode && console.log(l), l;
                });
                s(this, "scrollTo", async (t, e = 0) => {
                    o(this, p).devMode &&
                        console.log("%c \u{1F5B1}\uFE0F Scrolling to +".concat(e, "px of css=").concat(t), "color:lightblue");
                    let r = document.querySelector(t);
                    if ((o(this, p).devMode && console.log(r), r)) {
                        let i = e - parseInt(r.getBoundingClientRect().top, 10);
                        await o(this, p).ipc.target.webContents(o(this, y), "sendInputEvent", [
                            { type: "mouseWheel", x: 10, y: 15, deltaX: 0, deltaY: i }
                        ]);
                    }
                });
                s(this, "chooseFiles", async (t, e) => {
                    o(this, p).devMode && console.log("%c \u{1F4C4} Setting input files to css=".concat(t), "color:lightblue");
                    let r = document.querySelector(t);
                    if ((o(this, p).devMode && console.log(r), r && Array.isArray(e))) {
                        let i = new DataTransfer();
                        for (let l of e)
                            i.items.add(
                                new File(["file://".concat(l)], l.replace(/^.*[\\\/]([^\\\/]+)$/gi, "$1"), {
                                    type: "application/octet-stream"
                                })
                            );
                        r.files = i.files;
                    }
                });
                s(this, "saveUrl", async (t, e, r, i = 600, l = 5) => {
                    let c = new Date().getTime();
                    o(this, p).devMode &&
                        console.log(
                            "%c \u{1F4E5} Saving file for runId=".concat(t, ", key=").concat(e, ", url=").concat(r),
                            "color:lightblue"
                        );
                    let a = await o(this, p).ipc.diskStorage.fileInit(o(this, y), t, e);
                    try {
                        let u = await fetch(r, { signal: AbortSignal.any([AbortSignal.timeout(l * 1e3)]) });
                        if (!u.ok) throw new Error('HTTP status for "'.concat(r, '": ').concat(u.status));
                        let h = u.body.getReader();
                        for (;;) {
                            let { done: d, value: v } = await h.read();
                            if (typeof v < "u") {
                                if (!(await o(this, p).ipc.diskStorage.fileAppend(o(this, y), a, Buffer.from(v))))
                                    throw new Error('Could not save "'.concat(r, '"'));
                                if ((new Date().getTime() - c) / 1e3 > i)
                                    throw new Error('Download operation taking too long for "'.concat(r, '"'));
                            }
                            if (d) break;
                        }
                    } catch (u) {
                        throw (await o(this, p).ipc.diskStorage.fileDelete(o(this, y), a), u);
                    }
                    return a;
                });
                s(
                    this,
                    "wheels",
                    async t => (
                        await o(this, p).ipc.target.webContents(o(this, y), "sendInputEvent", [
                            { type: "mouseWheel", x: 10, y: 15, deltaX: 0, deltaY: t }
                        ]),
                        "Wheels up!"
                    )
                );
                b(this, y, t), b(this, p, new Ie(ve.getTargetChannelName(t), !1).getSdk());
                for (let e of Object.getOwnPropertyNames(this)) typeof this[e] == "function" && o(this, p).ibc.handle(e, this[e]);
            }
        }),
        (y = new WeakMap()),
        (p = new WeakMap()),
        (C = new WeakMap()),
        K);
});
var $e = ee(),
    te = process.argv.filter(n => n.indexOf("--agent-id=") >= 0).shift();
if (typeof te == "string") {
    let n = te.split("=")[1];
    n.length && new $e(n);
}
