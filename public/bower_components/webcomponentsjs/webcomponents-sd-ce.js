(function () {/*

Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    'use strict';
    var n,
        p = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this,
        aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value)
        };

    function ba() {
        ba = function () {
        };
        p.Symbol || (p.Symbol = ca)
    }

    var ca = function () {
        var a = 0;
        return function (b) {
            return "jscomp_symbol_" + (b || "") + a++
        }
    }();

    function da() {
        ba();
        var a = p.Symbol.iterator;
        a || (a = p.Symbol.iterator = p.Symbol("iterator"));
        "function" != typeof Array.prototype[a] && aa(Array.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function () {
                return ea(this)
            }
        });
        da = function () {
        }
    }

    function ea(a) {
        var b = 0;
        return fa(function () {
            return b < a.length ? {done: !1, value: a[b++]} : {done: !0}
        })
    }

    function fa(a) {
        da();
        a = {next: a};
        a[p.Symbol.iterator] = function () {
            return this
        };
        return a
    }

    function ha(a) {
        da();
        var b = a[Symbol.iterator];
        return b ? b.call(a) : ea(a)
    }

    function ia(a) {
        for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
        return c
    }

    var r = window.ShadyDOM || {};
    r.va = !(!Element.prototype.attachShadow || !Node.prototype.getRootNode);
    var ja = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild");
    r.F = !!(ja && ja.configurable && ja.get);
    r.ga = r.force || !r.va;

    function t(a) {
        return a.__shady && void 0 !== a.__shady.firstChild
    }

    function u(a) {
        return "ShadyRoot" === a.ma
    }

    function ka(a) {
        a = a.getRootNode();
        if (u(a)) return a
    }

    var v = Element.prototype,
        la = v.matches || v.matchesSelector || v.mozMatchesSelector || v.msMatchesSelector || v.oMatchesSelector || v.webkitMatchesSelector;

    function ma(a, b) {
        if (a && b) for (var c = Object.getOwnPropertyNames(b), d = 0, e; d < c.length && (e = c[d]); d++) {
            var f = Object.getOwnPropertyDescriptor(b, e);
            f && Object.defineProperty(a, e, f)
        }
    }

    function na(a, b) {
        for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
        for (d = 0; d < c.length; d++) ma(a, c[d]);
        return a
    }

    function oa(a, b) {
        for (var c in b) a[c] = b[c]
    }

    var pa = document.createTextNode(""), qa = 0, ra = [];
    (new MutationObserver(function () {
        for (; ra.length;) try {
            ra.shift()()
        } catch (a) {
            throw pa.textContent = qa++, a;
        }
    })).observe(pa, {characterData: !0});

    function sa(a) {
        ra.push(a);
        pa.textContent = qa++
    }

    var ta = !!document.contains;

    function ua(a, b) {
        for (; b;) {
            if (b == a) return !0;
            b = b.parentNode
        }
        return !1
    };var va = [], wa;

    function xa(a) {
        wa || (wa = !0, sa(ya));
        va.push(a)
    }

    function ya() {
        wa = !1;
        for (var a = !!va.length; va.length;) va.shift()();
        return a
    }

    ya.list = va;

    function za() {
        this.a = !1;
        this.addedNodes = [];
        this.removedNodes = [];
        this.M = new Set
    }

    function Aa(a) {
        a.a || (a.a = !0, sa(function () {
            Ba(a)
        }))
    }

    function Ba(a) {
        if (a.a) {
            a.a = !1;
            var b = a.takeRecords();
            b.length && a.M.forEach(function (a) {
                a(b)
            })
        }
    }

    za.prototype.takeRecords = function () {
        if (this.addedNodes.length || this.removedNodes.length) {
            var a = [{addedNodes: this.addedNodes, removedNodes: this.removedNodes}];
            this.addedNodes = [];
            this.removedNodes = [];
            return a
        }
        return []
    };

    function Ca(a, b) {
        a.__shady = a.__shady || {};
        a.__shady.G || (a.__shady.G = new za);
        a.__shady.G.M.add(b);
        var c = a.__shady.G;
        return {
            pa: b, w: c, ra: a, takeRecords: function () {
                return c.takeRecords()
            }
        }
    }

    function Da(a) {
        var b = a && a.w;
        b && (b.M.delete(a.pa), b.M.size || (a.ra.__shady.G = null))
    }

    function Ea(a, b) {
        var c = b.getRootNode();
        return a.map(function (a) {
            var b = c === a.target.getRootNode();
            if (b && a.addedNodes) {
                if (b = Array.from(a.addedNodes).filter(function (a) {
                    return c === a.getRootNode()
                }), b.length) return a = Object.create(a), Object.defineProperty(a, "addedNodes", {
                    value: b,
                    configurable: !0
                }), a
            } else if (b) return a
        }).filter(function (a) {
            return a
        })
    };var w = {}, Fa = Element.prototype.insertBefore, Ga = Element.prototype.removeChild,
        Ha = Element.prototype.setAttribute, Ia = Element.prototype.removeAttribute, Ja = Element.prototype.cloneNode,
        Ka = Document.prototype.importNode, La = Element.prototype.addEventListener,
        Ma = Element.prototype.removeEventListener, Na = Window.prototype.addEventListener,
        Oa = Window.prototype.removeEventListener, Pa = Element.prototype.dispatchEvent,
        Qa = Element.prototype.querySelector, Ra = Element.prototype.querySelectorAll, Sa = Node.prototype.contains ||
            HTMLElement.prototype.contains;
    w.appendChild = Element.prototype.appendChild;
    w.insertBefore = Fa;
    w.removeChild = Ga;
    w.setAttribute = Ha;
    w.removeAttribute = Ia;
    w.cloneNode = Ja;
    w.importNode = Ka;
    w.addEventListener = La;
    w.removeEventListener = Ma;
    w.Fa = Na;
    w.Ga = Oa;
    w.dispatchEvent = Pa;
    w.querySelector = Qa;
    w.querySelectorAll = Ra;
    w.contains = Sa;
    var Ta = /[&\u00A0"]/g, Ua = /[&\u00A0<>]/g;

    function Va(a) {
        switch (a) {
            case "&":
                return "&amp;";
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case '"':
                return "&quot;";
            case "\u00a0":
                return "&nbsp;"
        }
    }

    function Wa(a) {
        for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0;
        return b
    }

    var Xa = Wa("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),
        Ya = Wa("style script xmp iframe noembed noframes plaintext noscript".split(" "));

    function Za(a, b) {
        "template" === a.localName && (a = a.content);
        for (var c = "", d = b ? b(a) : a.childNodes, e = 0, f = d.length, h; e < f && (h = d[e]); e++) {
            a:{
                var g = h;
                var k = a;
                var l = b;
                switch (g.nodeType) {
                    case Node.ELEMENT_NODE:
                        for (var m = g.localName, q = "<" + m, H = g.attributes, N = 0; k = H[N]; N++) q += " " + k.name + '="' + k.value.replace(Ta, Va) + '"';
                        q += ">";
                        g = Xa[m] ? q : q + Za(g, l) + "</" + m + ">";
                        break a;
                    case Node.TEXT_NODE:
                        g = g.data;
                        g = k && Ya[k.localName] ? g : g.replace(Ua, Va);
                        break a;
                    case Node.COMMENT_NODE:
                        g = "\x3c!--" + g.data + "--\x3e";
                        break a;
                    default:
                        throw window.console.error(g),
                            Error("not implemented");
                }
            }
            c += g
        }
        return c
    };var x = {}, y = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, !1),
        z = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, !1);

    function $a(a) {
        var b = [];
        y.currentNode = a;
        for (a = y.firstChild(); a;) b.push(a), a = y.nextSibling();
        return b
    }

    x.parentNode = function (a) {
        y.currentNode = a;
        return y.parentNode()
    };
    x.firstChild = function (a) {
        y.currentNode = a;
        return y.firstChild()
    };
    x.lastChild = function (a) {
        y.currentNode = a;
        return y.lastChild()
    };
    x.previousSibling = function (a) {
        y.currentNode = a;
        return y.previousSibling()
    };
    x.nextSibling = function (a) {
        y.currentNode = a;
        return y.nextSibling()
    };
    x.childNodes = $a;
    x.parentElement = function (a) {
        z.currentNode = a;
        return z.parentNode()
    };
    x.firstElementChild = function (a) {
        z.currentNode = a;
        return z.firstChild()
    };
    x.lastElementChild = function (a) {
        z.currentNode = a;
        return z.lastChild()
    };
    x.previousElementSibling = function (a) {
        z.currentNode = a;
        return z.previousSibling()
    };
    x.nextElementSibling = function (a) {
        z.currentNode = a;
        return z.nextSibling()
    };
    x.children = function (a) {
        var b = [];
        z.currentNode = a;
        for (a = z.firstChild(); a;) b.push(a), a = z.nextSibling();
        return b
    };
    x.innerHTML = function (a) {
        return Za(a, function (a) {
            return $a(a)
        })
    };
    x.textContent = function (a) {
        switch (a.nodeType) {
            case Node.ELEMENT_NODE:
            case Node.DOCUMENT_FRAGMENT_NODE:
                a = document.createTreeWalker(a, NodeFilter.SHOW_TEXT, null, !1);
                for (var b = "", c; c = a.nextNode();) b += c.nodeValue;
                return b;
            default:
                return a.nodeValue
        }
    };
    var ab = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML") || Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML"),
        bb = document.implementation.createHTMLDocument("inert"),
        cb = Object.getOwnPropertyDescriptor(Document.prototype, "activeElement"), db = {
            parentElement: {
                get: function () {
                    var a = this.__shady && this.__shady.parentNode;
                    a && a.nodeType !== Node.ELEMENT_NODE && (a = null);
                    return void 0 !== a ? a : x.parentElement(this)
                }, configurable: !0
            }, parentNode: {
                get: function () {
                    var a = this.__shady && this.__shady.parentNode;
                    return void 0 !== a ? a : x.parentNode(this)
                }, configurable: !0
            }, nextSibling: {
                get: function () {
                    var a = this.__shady && this.__shady.nextSibling;
                    return void 0 !== a ? a : x.nextSibling(this)
                }, configurable: !0
            }, previousSibling: {
                get: function () {
                    var a = this.__shady && this.__shady.previousSibling;
                    return void 0 !== a ? a : x.previousSibling(this)
                }, configurable: !0
            }, className: {
                get: function () {
                    return this.getAttribute("class") || ""
                }, set: function (a) {
                    this.setAttribute("class", a)
                }, configurable: !0
            }, nextElementSibling: {
                get: function () {
                    if (this.__shady &&
                        void 0 !== this.__shady.nextSibling) {
                        for (var a = this.nextSibling; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.nextSibling;
                        return a
                    }
                    return x.nextElementSibling(this)
                }, configurable: !0
            }, previousElementSibling: {
                get: function () {
                    if (this.__shady && void 0 !== this.__shady.previousSibling) {
                        for (var a = this.previousSibling; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.previousSibling;
                        return a
                    }
                    return x.previousElementSibling(this)
                }, configurable: !0
            }
        }, eb = {
            childNodes: {
                get: function () {
                    if (t(this)) {
                        if (!this.__shady.childNodes) {
                            this.__shady.childNodes =
                                [];
                            for (var a = this.firstChild; a; a = a.nextSibling) this.__shady.childNodes.push(a)
                        }
                        var b = this.__shady.childNodes
                    } else b = x.childNodes(this);
                    b.item = function (a) {
                        return b[a]
                    };
                    return b
                }, configurable: !0
            }, childElementCount: {
                get: function () {
                    return this.children.length
                }, configurable: !0
            }, firstChild: {
                get: function () {
                    var a = this.__shady && this.__shady.firstChild;
                    return void 0 !== a ? a : x.firstChild(this)
                }, configurable: !0
            }, lastChild: {
                get: function () {
                    var a = this.__shady && this.__shady.lastChild;
                    return void 0 !== a ? a : x.lastChild(this)
                },
                configurable: !0
            }, textContent: {
                get: function () {
                    if (t(this)) {
                        for (var a = [], b = 0, c = this.childNodes, d; d = c[b]; b++) d.nodeType !== Node.COMMENT_NODE && a.push(d.textContent);
                        return a.join("")
                    }
                    return x.textContent(this)
                }, set: function (a) {
                    switch (this.nodeType) {
                        case Node.ELEMENT_NODE:
                        case Node.DOCUMENT_FRAGMENT_NODE:
                            for (; this.firstChild;) this.removeChild(this.firstChild);
                            (0 < a.length || this.nodeType === Node.ELEMENT_NODE) && this.appendChild(document.createTextNode(a));
                            break;
                        default:
                            this.nodeValue = a
                    }
                }, configurable: !0
            }, firstElementChild: {
                get: function () {
                    if (this.__shady &&
                        void 0 !== this.__shady.firstChild) {
                        for (var a = this.firstChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.nextSibling;
                        return a
                    }
                    return x.firstElementChild(this)
                }, configurable: !0
            }, lastElementChild: {
                get: function () {
                    if (this.__shady && void 0 !== this.__shady.lastChild) {
                        for (var a = this.lastChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.previousSibling;
                        return a
                    }
                    return x.lastElementChild(this)
                }, configurable: !0
            }, children: {
                get: function () {
                    var a;
                    t(this) ? a = Array.prototype.filter.call(this.childNodes, function (a) {
                        return a.nodeType ===
                            Node.ELEMENT_NODE
                    }) : a = x.children(this);
                    a.item = function (b) {
                        return a[b]
                    };
                    return a
                }, configurable: !0
            }, innerHTML: {
                get: function () {
                    var a = "template" === this.localName ? this.content : this;
                    return t(this) ? Za(a) : x.innerHTML(a)
                }, set: function (a) {
                    for (var b = "template" === this.localName ? this.content : this; b.firstChild;) b.removeChild(b.firstChild);
                    var c = this.localName;
                    c && "template" !== c || (c = "div");
                    c = bb.createElement(c);
                    for (ab && ab.set ? ab.set.call(c, a) : c.innerHTML = a; c.firstChild;) b.appendChild(c.firstChild)
                }, configurable: !0
            }
        },
        fb = {
            shadowRoot: {
                get: function () {
                    return this.__shady && this.__shady.za || null
                }, configurable: !0
            }
        }, gb = {
            activeElement: {
                get: function () {
                    var a = cb && cb.get ? cb.get.call(document) : r.F ? void 0 : document.activeElement;
                    if (a && a.nodeType) {
                        var b = !!u(this);
                        if (this === document || b && this.host !== a && w.contains.call(this.host, a)) {
                            for (b = ka(a); b && b !== this;) a = b.host, b = ka(a);
                            a = this === document ? b ? null : a : b === this ? a : null
                        } else a = null
                    } else a = null;
                    return a
                }, set: function () {
                }, configurable: !0
            }
        };

    function A(a, b, c) {
        for (var d in b) {
            var e = Object.getOwnPropertyDescriptor(a, d);
            e && e.configurable || !e && c ? Object.defineProperty(a, d, b[d]) : c && console.warn("Could not define", d, "on", a)
        }
    }

    function B(a) {
        A(a, db);
        A(a, eb);
        A(a, gb)
    }

    var hb = r.F ? function () {
    } : function (a) {
        a.__shady && a.__shady.na || (a.__shady = a.__shady || {}, a.__shady.na = !0, A(a, db, !0))
    }, ib = r.F ? function () {
    } : function (a) {
        a.__shady && a.__shady.la || (a.__shady = a.__shady || {}, a.__shady.la = !0, A(a, eb, !0), A(a, fb, !0))
    };

    function jb(a, b, c) {
        hb(a);
        c = c || null;
        a.__shady = a.__shady || {};
        b.__shady = b.__shady || {};
        c && (c.__shady = c.__shady || {});
        a.__shady.previousSibling = c ? c.__shady.previousSibling : b.lastChild;
        var d = a.__shady.previousSibling;
        d && d.__shady && (d.__shady.nextSibling = a);
        (d = a.__shady.nextSibling = c) && d.__shady && (d.__shady.previousSibling = a);
        a.__shady.parentNode = b;
        c ? c === b.__shady.firstChild && (b.__shady.firstChild = a) : (b.__shady.lastChild = a, b.__shady.firstChild || (b.__shady.firstChild = a));
        b.__shady.childNodes = null
    }

    function kb(a) {
        if (!a.__shady || void 0 === a.__shady.firstChild) {
            a.__shady = a.__shady || {};
            a.__shady.firstChild = x.firstChild(a);
            a.__shady.lastChild = x.lastChild(a);
            ib(a);
            for (var b = a.__shady.childNodes = x.childNodes(a), c = 0, d; c < b.length && (d = b[c]); c++) d.__shady = d.__shady || {}, d.__shady.parentNode = a, d.__shady.nextSibling = b[c + 1] || null, d.__shady.previousSibling = b[c - 1] || null, hb(d)
        }
    };

    function lb(a, b, c) {
        if (b === a) throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");
        if (c) {
            var d = c.__shady && c.__shady.parentNode;
            if (void 0 !== d && d !== a || void 0 === d && x.parentNode(c) !== a) throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");
        }
        if (c === b) return b;
        b.parentNode && mb(b.parentNode, b);
        d = ka(a);
        var e;
        if (e = d) a:{
            if (!b.__noInsertionPoint) {
                var f;
                "slot" === b.localName ? f = [b] :
                    b.querySelectorAll && (f = b.querySelectorAll("slot"));
                if (f && f.length) {
                    e = f;
                    break a
                }
            }
            e = void 0
        }
        (f = e) && d.C.push.apply(d.C, [].concat(f instanceof Array ? f : ia(ha(f))));
        d && ("slot" === a.localName || f) && C(d);
        if (t(a)) {
            d = c;
            ib(a);
            a.__shady = a.__shady || {};
            void 0 !== a.__shady.firstChild && (a.__shady.childNodes = null);
            if (b.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                f = b.childNodes;
                for (e = 0; e < f.length; e++) jb(f[e], a, d);
                b.__shady = b.__shady || {};
                d = void 0 !== b.__shady.firstChild ? null : void 0;
                b.__shady.firstChild = b.__shady.lastChild = d;
                b.__shady.childNodes = d
            } else jb(b, a, d);
            if (nb(a)) {
                C(a.__shady.root);
                var h = !0
            } else a.__shady.root && (h = !0)
        }
        h || (h = u(a) ? a.host : a, c ? (c = ob(c), w.insertBefore.call(h, b, c)) : w.appendChild.call(h, b));
        pb(a, b);
        return b
    }

    function mb(a, b) {
        if (b.parentNode !== a) throw Error("The node to be removed is not a child of this node: " + b);
        var c = ka(b);
        if (t(a)) {
            b.__shady = b.__shady || {};
            a.__shady = a.__shady || {};
            b === a.__shady.firstChild && (a.__shady.firstChild = b.__shady.nextSibling);
            b === a.__shady.lastChild && (a.__shady.lastChild = b.__shady.previousSibling);
            var d = b.__shady.previousSibling, e = b.__shady.nextSibling;
            d && (d.__shady = d.__shady || {}, d.__shady.nextSibling = e);
            e && (e.__shady = e.__shady || {}, e.__shady.previousSibling = d);
            b.__shady.parentNode =
                b.__shady.previousSibling = b.__shady.nextSibling = void 0;
            void 0 !== a.__shady.childNodes && (a.__shady.childNodes = null);
            if (nb(a)) {
                C(a.__shady.root);
                var f = !0
            }
        }
        qb(b);
        if (c) {
            (d = a && "slot" === a.localName) && (f = !0);
            rb(c);
            e = c.h;
            for (var h in e) for (var g = e[h], k = 0; k < g.length; k++) {
                var l = g[k];
                if (ua(b, l)) {
                    g.splice(k, 1);
                    var m = c.l.indexOf(l);
                    0 <= m && c.l.splice(m, 1);
                    k--;
                    if (m = l.__shady.D) for (l = 0; l < m.length; l++) {
                        var q = m[l], H = x.parentNode(q);
                        H && w.removeChild.call(H, q)
                    }
                    m = !0
                }
            }
            (m || d) && C(c)
        }
        f || (f = u(a) ? a.host : a, (!a.__shady.root && "slot" !==
            b.localName || f === x.parentNode(b)) && w.removeChild.call(f, b));
        pb(a, null, b);
        return b
    }

    function qb(a) {
        if (a.__shady && void 0 !== a.__shady.aa) for (var b = a.childNodes, c = 0, d = b.length, e; c < d && (e = b[c]); c++) qb(e);
        a.__shady && (a.__shady.aa = void 0)
    }

    function ob(a) {
        var b = a;
        a && "slot" === a.localName && (b = (b = a.__shady && a.__shady.D) && b.length ? b[0] : ob(a.nextSibling));
        return b
    }

    function nb(a) {
        return (a = a && a.__shady && a.__shady.root) && sb(a)
    }

    function tb(a, b) {
        if ("slot" === b) a = a.parentNode, nb(a) && C(a.__shady.root); else if ("slot" === a.localName && "name" === b && (b = ka(a))) {
            var c = a.oa, d = ub(a);
            if (d !== c) {
                c = b.h[c];
                var e = c.indexOf(a);
                0 <= e && c.splice(e, 1);
                c = b.h[d] || (b.h[d] = []);
                c.push(a);
                1 < c.length && (b.h[d] = vb(c))
            }
            C(b)
        }
    }

    function pb(a, b, c) {
        if (a = a.__shady && a.__shady.G) b && a.addedNodes.push(b), c && a.removedNodes.push(c), Aa(a)
    }

    function wb(a) {
        if (a && a.nodeType) {
            a.__shady = a.__shady || {};
            var b = a.__shady.aa;
            void 0 === b && (u(a) ? b = a : b = (b = a.parentNode) ? wb(b) : a, w.contains.call(document.documentElement, a) && (a.__shady.aa = b));
            return b
        }
    }

    function xb(a, b, c) {
        var d = [];
        yb(a.childNodes, b, c, d);
        return d
    }

    function yb(a, b, c, d) {
        for (var e = 0, f = a.length, h; e < f && (h = a[e]); e++) {
            var g;
            if (g = h.nodeType === Node.ELEMENT_NODE) {
                g = h;
                var k = b, l = c, m = d, q = k(g);
                q && m.push(g);
                l && l(q) ? g = q : (yb(g.childNodes, k, l, m), g = void 0)
            }
            if (g) break
        }
    }

    var zb = null;

    function Ab(a, b, c) {
        zb || (zb = window.ShadyCSS && window.ShadyCSS.ScopingShim);
        zb && "class" === b ? zb.setElementClass(a, c) : (w.setAttribute.call(a, b, c), tb(a, b))
    }

    function Bb(a, b) {
        if (a.ownerDocument !== document) return w.importNode.call(document, a, b);
        var c = w.importNode.call(document, a, !1);
        if (b) {
            a = a.childNodes;
            b = 0;
            for (var d; b < a.length; b++) d = Bb(a[b], !0), c.appendChild(d)
        }
        return c
    };var Cb = "__eventWrappers" + Date.now(), Db = {
        blur: !0,
        focus: !0,
        focusin: !0,
        focusout: !0,
        click: !0,
        dblclick: !0,
        mousedown: !0,
        mouseenter: !0,
        mouseleave: !0,
        mousemove: !0,
        mouseout: !0,
        mouseover: !0,
        mouseup: !0,
        wheel: !0,
        beforeinput: !0,
        input: !0,
        keydown: !0,
        keyup: !0,
        compositionstart: !0,
        compositionupdate: !0,
        compositionend: !0,
        touchstart: !0,
        touchend: !0,
        touchmove: !0,
        touchcancel: !0,
        pointerover: !0,
        pointerenter: !0,
        pointerdown: !0,
        pointermove: !0,
        pointerup: !0,
        pointercancel: !0,
        pointerout: !0,
        pointerleave: !0,
        gotpointercapture: !0,
        lostpointercapture: !0,
        dragstart: !0,
        drag: !0,
        dragenter: !0,
        dragleave: !0,
        dragover: !0,
        drop: !0,
        dragend: !0,
        DOMActivate: !0,
        DOMFocusIn: !0,
        DOMFocusOut: !0,
        keypress: !0
    };

    function Eb(a, b) {
        var c = [], d = a;
        for (a = a === window ? window : a.getRootNode(); d;) c.push(d), d = d.assignedSlot ? d.assignedSlot : d.nodeType === Node.DOCUMENT_FRAGMENT_NODE && d.host && (b || d !== a) ? d.host : d.parentNode;
        c[c.length - 1] === document && c.push(window);
        return c
    }

    function Fb(a, b) {
        if (!u) return a;
        a = Eb(a, !0);
        for (var c = 0, d, e, f, h; c < b.length; c++) if (d = b[c], f = d === window ? window : d.getRootNode(), f !== e && (h = a.indexOf(f), e = f), !u(f) || -1 < h) return d
    }

    var Gb = {
        get composed() {
            !1 !== this.isTrusted && void 0 === this.P && (this.P = Db[this.type]);
            return this.P || !1
        }, composedPath: function () {
            this.ba || (this.ba = Eb(this.__target, this.composed));
            return this.ba
        }, get target() {
            return Fb(this.currentTarget, this.composedPath())
        }, get relatedTarget() {
            if (!this.S) return null;
            this.ca || (this.ca = Eb(this.S, !0));
            return Fb(this.currentTarget, this.ca)
        }, stopPropagation: function () {
            Event.prototype.stopPropagation.call(this);
            this.R = !0
        }, stopImmediatePropagation: function () {
            Event.prototype.stopImmediatePropagation.call(this);
            this.R = this.ka = !0
        }
    };

    function Hb(a) {
        function b(b, d) {
            b = new a(b, d);
            b.P = d && !!d.composed;
            return b
        }

        oa(b, a);
        b.prototype = a.prototype;
        return b
    }

    var Ib = {focus: !0, blur: !0};

    function Jb(a) {
        return a.__target !== a.target || a.S !== a.relatedTarget
    }

    function Kb(a, b, c) {
        if (c = b.__handlers && b.__handlers[a.type] && b.__handlers[a.type][c]) for (var d = 0, e; (e = c[d]) && (!Jb(a) || a.target !== a.relatedTarget) && (e.call(b, a), !a.ka); d++) ;
    }

    function Lb(a) {
        var b = a.composedPath();
        Object.defineProperty(a, "currentTarget", {
            get: function () {
                return d
            }, configurable: !0
        });
        for (var c = b.length - 1; 0 <= c; c--) {
            var d = b[c];
            Kb(a, d, "capture");
            if (a.R) return
        }
        Object.defineProperty(a, "eventPhase", {
            get: function () {
                return Event.AT_TARGET
            }
        });
        var e;
        for (c = 0; c < b.length; c++) {
            d = b[c];
            var f = d.__shady && d.__shady.root;
            if (0 === c || f && f === e) if (Kb(a, d, "bubble"), d !== window && (e = d.getRootNode()), a.R) break
        }
    }

    function Mb(a, b, c, d, e, f) {
        for (var h = 0; h < a.length; h++) {
            var g = a[h], k = g.type, l = g.capture, m = g.once, q = g.passive;
            if (b === g.node && c === k && d === l && e === m && f === q) return h
        }
        return -1
    }

    function Nb(a, b, c) {
        if (b) {
            if (c && "object" === typeof c) {
                var d = !!c.capture;
                var e = !!c.once;
                var f = !!c.passive
            } else d = !!c, f = e = !1;
            var h = c && c.T || this, g = b[Cb];
            if (g) {
                if (-1 < Mb(g, h, a, d, e, f)) return
            } else b[Cb] = [];
            g = function (d) {
                e && this.removeEventListener(a, b, c);
                d.__target || Ob(d);
                if (h !== this) {
                    var f = Object.getOwnPropertyDescriptor(d, "currentTarget");
                    Object.defineProperty(d, "currentTarget", {
                        get: function () {
                            return h
                        }, configurable: !0
                    })
                }
                if (d.composed || -1 < d.composedPath().indexOf(h)) if (Jb(d) && d.target === d.relatedTarget) d.eventPhase ===
                Event.BUBBLING_PHASE && d.stopImmediatePropagation(); else if (d.eventPhase === Event.CAPTURING_PHASE || d.bubbles || d.target === h || h instanceof Window) {
                    var g = "object" === typeof b && b.handleEvent ? b.handleEvent(d) : b.call(h, d);
                    h !== this && (f ? (Object.defineProperty(d, "currentTarget", f), f = null) : delete d.currentTarget);
                    return g
                }
            };
            b[Cb].push({node: this, type: a, capture: d, once: e, passive: f, Ha: g});
            Ib[a] ? (this.__handlers = this.__handlers || {}, this.__handlers[a] = this.__handlers[a] || {
                capture: [],
                bubble: []
            }, this.__handlers[a][d ?
                "capture" : "bubble"].push(g)) : (this instanceof Window ? w.Fa : w.addEventListener).call(this, a, g, c)
        }
    }

    function Pb(a, b, c) {
        if (b) {
            if (c && "object" === typeof c) {
                var d = !!c.capture;
                var e = !!c.once;
                var f = !!c.passive
            } else d = !!c, f = e = !1;
            var h = c && c.T || this, g = void 0;
            var k = null;
            try {
                k = b[Cb]
            } catch (l) {
            }
            k && (e = Mb(k, h, a, d, e, f), -1 < e && (g = k.splice(e, 1)[0].Ha, k.length || (b[Cb] = void 0)));
            (this instanceof Window ? w.Ga : w.removeEventListener).call(this, a, g || b, c);
            g && Ib[a] && this.__handlers && this.__handlers[a] && (a = this.__handlers[a][d ? "capture" : "bubble"], g = a.indexOf(g), -1 < g && a.splice(g, 1))
        }
    }

    function Qb() {
        for (var a in Ib) window.addEventListener(a, function (a) {
            a.__target || (Ob(a), Lb(a))
        }, !0)
    }

    function Ob(a) {
        a.__target = a.target;
        a.S = a.relatedTarget;
        if (r.F) {
            var b = Object.getPrototypeOf(a);
            if (!b.hasOwnProperty("__patchProto")) {
                var c = Object.create(b);
                c.Ja = b;
                ma(c, Gb);
                b.__patchProto = c
            }
            a.__proto__ = b.__patchProto
        } else ma(a, Gb)
    }

    var Rb = Hb(window.Event), Sb = Hb(window.CustomEvent), Tb = Hb(window.MouseEvent);

    function Ub(a, b) {
        return {index: a, H: [], L: b}
    }

    function Vb(a, b, c, d) {
        var e = 0, f = 0, h = 0, g = 0, k = Math.min(b - e, d - f);
        if (0 == e && 0 == f) a:{
            for (h = 0; h < k; h++) if (a[h] !== c[h]) break a;
            h = k
        }
        if (b == a.length && d == c.length) {
            g = a.length;
            for (var l = c.length, m = 0; m < k - h && Wb(a[--g], c[--l]);) m++;
            g = m
        }
        e += h;
        f += h;
        b -= g;
        d -= g;
        if (0 == b - e && 0 == d - f) return [];
        if (e == b) {
            for (b = Ub(e, 0); f < d;) b.H.push(c[f++]);
            return [b]
        }
        if (f == d) return [Ub(e, b - e)];
        k = e;
        h = f;
        d = d - h + 1;
        g = b - k + 1;
        b = Array(d);
        for (l = 0; l < d; l++) b[l] = Array(g), b[l][0] = l;
        for (l = 0; l < g; l++) b[0][l] = l;
        for (l = 1; l < d; l++) for (m = 1; m < g; m++) if (a[k + m - 1] === c[h + l - 1]) b[l][m] =
            b[l - 1][m - 1]; else {
            var q = b[l - 1][m] + 1, H = b[l][m - 1] + 1;
            b[l][m] = q < H ? q : H
        }
        k = b.length - 1;
        h = b[0].length - 1;
        d = b[k][h];
        for (a = []; 0 < k || 0 < h;) 0 == k ? (a.push(2), h--) : 0 == h ? (a.push(3), k--) : (g = b[k - 1][h - 1], l = b[k - 1][h], m = b[k][h - 1], q = l < m ? l < g ? l : g : m < g ? m : g, q == g ? (g == d ? a.push(0) : (a.push(1), d = g), k--, h--) : q == l ? (a.push(3), k--, d = l) : (a.push(2), h--, d = m));
        a.reverse();
        b = void 0;
        k = [];
        for (h = 0; h < a.length; h++) switch (a[h]) {
            case 0:
                b && (k.push(b), b = void 0);
                e++;
                f++;
                break;
            case 1:
                b || (b = Ub(e, 0));
                b.L++;
                e++;
                b.H.push(c[f]);
                f++;
                break;
            case 2:
                b || (b = Ub(e, 0));
                b.L++;
                e++;
                break;
            case 3:
                b || (b = Ub(e, 0)), b.H.push(c[f]), f++
        }
        b && k.push(b);
        return k
    }

    function Wb(a, b) {
        return a === b
    };var Xb = {};

    function D(a, b, c) {
        if (a !== Xb) throw new TypeError("Illegal constructor");
        a = document.createDocumentFragment();
        a.__proto__ = D.prototype;
        a.ma = "ShadyRoot";
        kb(b);
        kb(a);
        a.host = b;
        a.a = c && c.mode;
        b.__shady = b.__shady || {};
        b.__shady.root = a;
        b.__shady.za = "closed" !== a.a ? a : null;
        a.K = !1;
        a.l = [];
        a.h = {};
        a.C = [];
        c = x.childNodes(b);
        for (var d = 0, e = c.length; d < e; d++) w.removeChild.call(b, c[d]);
        return a
    }

    D.prototype = Object.create(DocumentFragment.prototype);

    function C(a) {
        a.K || (a.K = !0, xa(function () {
            return Yb(a)
        }))
    }

    function Yb(a) {
        for (var b; a;) {
            a.K && (b = a);
            a:{
                var c = a;
                a = c.host.getRootNode();
                if (u(a)) for (var d = c.host.childNodes, e = 0; e < d.length; e++) if (c = d[e], "slot" == c.localName) break a;
                a = void 0
            }
        }
        b && b._renderRoot()
    }

    D.prototype._renderRoot = function () {
        this.K = !1;
        rb(this);
        for (var a = 0, b; a < this.l.length; a++) {
            b = this.l[a];
            var c = b.__shady.assignedNodes;
            b.__shady.assignedNodes = [];
            b.__shady.D = [];
            if (b.__shady.da = c) for (var d = 0; d < c.length; d++) {
                var e = c[d];
                e.__shady.X = e.__shady.assignedSlot;
                e.__shady.assignedSlot === b && (e.__shady.assignedSlot = null)
            }
        }
        for (b = this.host.firstChild; b; b = b.nextSibling) Zb(this, b);
        for (a = 0; a < this.l.length; a++) {
            b = this.l[a];
            if (!b.__shady.assignedNodes.length) for (c = b.firstChild; c; c = c.nextSibling) Zb(this,
                c, b);
            c = b.parentNode;
            (c = c.__shady && c.__shady.root) && sb(c) && c._renderRoot();
            $b(this, b.__shady.D, b.__shady.assignedNodes);
            if (c = b.__shady.da) {
                for (d = 0; d < c.length; d++) c[d].__shady.X = null;
                b.__shady.da = null;
                c.length > b.__shady.assignedNodes.length && (b.__shady.Z = !0)
            }
            b.__shady.Z && (b.__shady.Z = !1, ac(this, b))
        }
        a = this.l;
        b = [];
        for (c = 0; c < a.length; c++) d = a[c].parentNode, d.__shady && d.__shady.root || !(0 > b.indexOf(d)) || b.push(d);
        for (a = 0; a < b.length; a++) {
            c = b[a];
            d = c === this ? this.host : c;
            e = [];
            c = c.childNodes;
            for (var f = 0; f < c.length; f++) {
                var h =
                    c[f];
                if ("slot" == h.localName) {
                    h = h.__shady.D;
                    for (var g = 0; g < h.length; g++) e.push(h[g])
                } else e.push(h)
            }
            c = void 0;
            f = x.childNodes(d);
            h = Vb(e, e.length, f, f.length);
            for (var k = g = 0; g < h.length && (c = h[g]); g++) {
                for (var l = 0, m; l < c.H.length && (m = c.H[l]); l++) x.parentNode(m) === d && w.removeChild.call(d, m), f.splice(c.index + k, 1);
                k -= c.L
            }
            for (k = 0; k < h.length && (c = h[k]); k++) for (g = f[c.index], l = c.index; l < c.index + c.L; l++) m = e[l], w.insertBefore.call(d, m, g), f.splice(l, 0, m)
        }
    };

    function Zb(a, b, c) {
        b.__shady = b.__shady || {};
        var d = b.__shady.X;
        b.__shady.X = null;
        c || (c = (a = a.h[b.slot || "__catchall"]) && a[0]);
        c ? (c.__shady.assignedNodes.push(b), b.__shady.assignedSlot = c) : b.__shady.assignedSlot = void 0;
        d !== b.__shady.assignedSlot && b.__shady.assignedSlot && (b.__shady.assignedSlot.__shady.Z = !0)
    }

    function $b(a, b, c) {
        for (var d = 0, e; d < c.length && (e = c[d]); d++) if ("slot" == e.localName) {
            var f = e.__shady.assignedNodes;
            f && f.length && $b(a, b, f)
        } else b.push(c[d])
    }

    function ac(a, b) {
        w.dispatchEvent.call(b, new Event("slotchange"));
        b.__shady.assignedSlot && ac(a, b.__shady.assignedSlot)
    }

    function rb(a) {
        if (a.C.length) {
            for (var b = a.C, c, d = 0; d < b.length; d++) {
                var e = b[d];
                e.__shady = e.__shady || {};
                kb(e);
                kb(e.parentNode);
                var f = ub(e);
                a.h[f] ? (c = c || {}, c[f] = !0, a.h[f].push(e)) : a.h[f] = [e];
                a.l.push(e)
            }
            if (c) for (var h in c) a.h[h] = vb(a.h[h]);
            a.C = []
        }
    }

    function ub(a) {
        var b = a.name || a.getAttribute("name") || "__catchall";
        return a.oa = b
    }

    function vb(a) {
        return a.sort(function (a, c) {
            a = bc(a);
            for (var b = bc(c), e = 0; e < a.length; e++) {
                c = a[e];
                var f = b[e];
                if (c !== f) return a = Array.from(c.parentNode.childNodes), a.indexOf(c) - a.indexOf(f)
            }
        })
    }

    function bc(a) {
        var b = [];
        do b.unshift(a); while (a = a.parentNode);
        return b
    }

    function sb(a) {
        rb(a);
        return !!a.l.length
    }

    D.prototype.addEventListener = function (a, b, c) {
        "object" !== typeof c && (c = {capture: !!c});
        c.T = this;
        this.host.addEventListener(a, b, c)
    };
    D.prototype.removeEventListener = function (a, b, c) {
        "object" !== typeof c && (c = {capture: !!c});
        c.T = this;
        this.host.removeEventListener(a, b, c)
    };
    D.prototype.getElementById = function (a) {
        return xb(this, function (b) {
            return b.id == a
        }, function (a) {
            return !!a
        })[0] || null
    };
    var cc = D.prototype;
    A(cc, eb, !0);
    A(cc, gb, !0);

    function dc(a) {
        var b = a.getRootNode();
        u(b) && Yb(b);
        return a.__shady && a.__shady.assignedSlot || null
    }

    var ec = {addEventListener: Nb.bind(window), removeEventListener: Pb.bind(window)}, fc = {
        addEventListener: Nb, removeEventListener: Pb, appendChild: function (a) {
            return lb(this, a)
        }, insertBefore: function (a, b) {
            return lb(this, a, b)
        }, removeChild: function (a) {
            return mb(this, a)
        }, replaceChild: function (a, b) {
            lb(this, a, b);
            mb(this, b);
            return a
        }, cloneNode: function (a) {
            if ("template" == this.localName) var b = w.cloneNode.call(this, a); else if (b = w.cloneNode.call(this, !1), a) {
                a = this.childNodes;
                for (var c = 0, d; c < a.length; c++) d = a[c].cloneNode(!0),
                    b.appendChild(d)
            }
            return b
        }, getRootNode: function () {
            return wb(this)
        }, contains: function (a) {
            return ua(this, a)
        }, get isConnected() {
            var a = this.ownerDocument;
            if (ta && w.contains.call(a, this) || a.documentElement && w.contains.call(a.documentElement, this)) return !0;
            for (a = this; a && !(a instanceof Document);) a = a.parentNode || (a instanceof D ? a.host : void 0);
            return !!(a && a instanceof Document)
        }, dispatchEvent: function (a) {
            ya();
            return w.dispatchEvent.call(this, a)
        }
    }, gc = {
        get assignedSlot() {
            return dc(this)
        }
    }, hc = {
        querySelector: function (a) {
            return xb(this,
                function (b) {
                    return la.call(b, a)
                }, function (a) {
                    return !!a
                })[0] || null
        }, querySelectorAll: function (a) {
            return xb(this, function (b) {
                return la.call(b, a)
            })
        }
    }, ic = {
        assignedNodes: function (a) {
            if ("slot" === this.localName) {
                var b = this.getRootNode();
                u(b) && Yb(b);
                return this.__shady ? (a && a.flatten ? this.__shady.D : this.__shady.assignedNodes) || [] : []
            }
        }
    }, jc = na({
        setAttribute: function (a, b) {
            Ab(this, a, b)
        }, removeAttribute: function (a) {
            w.removeAttribute.call(this, a);
            tb(this, a)
        }, attachShadow: function (a) {
            if (!this) throw"Must provide a host.";
            if (!a) throw"Not enough arguments.";
            return new D(Xb, this, a)
        }, get slot() {
            return this.getAttribute("slot")
        }, set slot(a) {
            Ab(this, "slot", a)
        }, get assignedSlot() {
            return dc(this)
        }
    }, hc, ic);
    Object.defineProperties(jc, fb);
    var kc = na({
        importNode: function (a, b) {
            return Bb(a, b)
        }, getElementById: function (a) {
            return xb(this, function (b) {
                return b.id == a
            }, function (a) {
                return !!a
            })[0] || null
        }
    }, hc);
    Object.defineProperties(kc, {_activeElement: gb.activeElement});
    var lc = HTMLElement.prototype.blur, mc = na({
        blur: function () {
            var a = this.__shady && this.__shady.root;
            (a = a && a.activeElement) ? a.blur() : lc.call(this)
        }
    });

    function E(a, b) {
        for (var c = Object.getOwnPropertyNames(b), d = 0; d < c.length; d++) {
            var e = c[d], f = Object.getOwnPropertyDescriptor(b, e);
            f.value ? a[e] = f.value : Object.defineProperty(a, e, f)
        }
    };
    if (r.ga) {
        var ShadyDOM = {
            inUse: r.ga,
            patch: function (a) {
                return a
            },
            isShadyRoot: u,
            enqueue: xa,
            flush: ya,
            settings: r,
            filterMutations: Ea,
            observeChildren: Ca,
            unobserveChildren: Da,
            nativeMethods: w,
            nativeTree: x
        };
        window.ShadyDOM = ShadyDOM;
        window.Event = Rb;
        window.CustomEvent = Sb;
        window.MouseEvent = Tb;
        Qb();
        var nc = window.customElements && window.customElements.nativeHTMLElement || HTMLElement;
        E(window.Node.prototype, fc);
        E(window.Window.prototype, ec);
        E(window.Text.prototype, gc);
        E(window.DocumentFragment.prototype, hc);
        E(window.Element.prototype,
            jc);
        E(window.Document.prototype, kc);
        window.HTMLSlotElement && E(window.HTMLSlotElement.prototype, ic);
        E(nc.prototype, mc);
        r.F && (B(window.Node.prototype), B(window.Text.prototype), B(window.DocumentFragment.prototype), B(window.Element.prototype), B(nc.prototype), B(window.Document.prototype), window.HTMLSlotElement && B(window.HTMLSlotElement.prototype));
        window.ShadowRoot = D
    }
    ;var oc = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));

    function pc(a) {
        var b = oc.has(a);
        a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);
        return !b && a
    }

    function F(a) {
        var b = a.isConnected;
        if (void 0 !== b) return b;
        for (; a && !(a.__CE_isImportDocument || a instanceof Document);) a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
        return !(!a || !(a.__CE_isImportDocument || a instanceof Document))
    }

    function qc(a, b) {
        for (; b && b !== a && !b.nextSibling;) b = b.parentNode;
        return b && b !== a ? b.nextSibling : null
    }

    function G(a, b, c) {
        c = void 0 === c ? new Set : c;
        for (var d = a; d;) {
            if (d.nodeType === Node.ELEMENT_NODE) {
                var e = d;
                b(e);
                var f = e.localName;
                if ("link" === f && "import" === e.getAttribute("rel")) {
                    d = e.import;
                    if (d instanceof Node && !c.has(d)) for (c.add(d), d = d.firstChild; d; d = d.nextSibling) G(d, b, c);
                    d = qc(a, e);
                    continue
                } else if ("template" === f) {
                    d = qc(a, e);
                    continue
                }
                if (e = e.__CE_shadowRoot) for (e = e.firstChild; e; e = e.nextSibling) G(e, b, c)
            }
            d = d.firstChild ? d.firstChild : qc(a, d)
        }
    }

    function I(a, b, c) {
        a[b] = c
    };

    function rc() {
        this.a = new Map;
        this.u = new Map;
        this.i = [];
        this.c = !1
    }

    function sc(a, b, c) {
        a.a.set(b, c);
        a.u.set(c.constructor, c)
    }

    function tc(a, b) {
        a.c = !0;
        a.i.push(b)
    }

    function uc(a, b) {
        a.c && G(b, function (b) {
            return a.b(b)
        })
    }

    rc.prototype.b = function (a) {
        if (this.c && !a.__CE_patched) {
            a.__CE_patched = !0;
            for (var b = 0; b < this.i.length; b++) this.i[b](a)
        }
    };

    function J(a, b) {
        var c = [];
        G(b, function (a) {
            return c.push(a)
        });
        for (b = 0; b < c.length; b++) {
            var d = c[b];
            1 === d.__CE_state ? a.connectedCallback(d) : vc(a, d)
        }
    }

    function K(a, b) {
        var c = [];
        G(b, function (a) {
            return c.push(a)
        });
        for (b = 0; b < c.length; b++) {
            var d = c[b];
            1 === d.__CE_state && a.disconnectedCallback(d)
        }
    }

    function L(a, b, c) {
        c = void 0 === c ? {} : c;
        var d = c.Ea || new Set, e = c.ia || function (b) {
            return vc(a, b)
        }, f = [];
        G(b, function (b) {
            if ("link" === b.localName && "import" === b.getAttribute("rel")) {
                var c = b.import;
                c instanceof Node && (c.__CE_isImportDocument = !0, c.__CE_hasRegistry = !0);
                c && "complete" === c.readyState ? c.__CE_documentLoadHandled = !0 : b.addEventListener("load", function () {
                    var c = b.import;
                    if (!c.__CE_documentLoadHandled) {
                        c.__CE_documentLoadHandled = !0;
                        var f = new Set(d);
                        f.delete(c);
                        L(a, c, {Ea: f, ia: e})
                    }
                })
            } else f.push(b)
        }, d);
        if (a.c) for (b =
                          0; b < f.length; b++) a.b(f[b]);
        for (b = 0; b < f.length; b++) e(f[b])
    }

    function vc(a, b) {
        if (void 0 === b.__CE_state) {
            var c = b.ownerDocument;
            if (c.defaultView || c.__CE_isImportDocument && c.__CE_hasRegistry) if (c = a.a.get(b.localName)) {
                c.constructionStack.push(b);
                var d = c.constructor;
                try {
                    try {
                        if (new d !== b) throw Error("The custom element constructor did not produce the element being upgraded.");
                    } finally {
                        c.constructionStack.pop()
                    }
                } catch (h) {
                    throw b.__CE_state = 2, h;
                }
                b.__CE_state = 1;
                b.__CE_definition = c;
                if (c.attributeChangedCallback) for (c = c.observedAttributes, d = 0; d < c.length; d++) {
                    var e = c[d],
                        f = b.getAttribute(e);
                    null !== f && a.attributeChangedCallback(b, e, null, f, null)
                }
                F(b) && a.connectedCallback(b)
            }
        }
    }

    rc.prototype.connectedCallback = function (a) {
        var b = a.__CE_definition;
        b.connectedCallback && b.connectedCallback.call(a)
    };
    rc.prototype.disconnectedCallback = function (a) {
        var b = a.__CE_definition;
        b.disconnectedCallback && b.disconnectedCallback.call(a)
    };
    rc.prototype.attributeChangedCallback = function (a, b, c, d, e) {
        var f = a.__CE_definition;
        f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(b) && f.attributeChangedCallback.call(a, b, c, d, e)
    };

    function wc(a) {
        var b = document;
        this.g = a;
        this.a = b;
        this.w = void 0;
        L(this.g, this.a);
        "loading" === this.a.readyState && (this.w = new MutationObserver(this.b.bind(this)), this.w.observe(this.a, {
            childList: !0,
            subtree: !0
        }))
    }

    function xc(a) {
        a.w && a.w.disconnect()
    }

    wc.prototype.b = function (a) {
        var b = this.a.readyState;
        "interactive" !== b && "complete" !== b || xc(this);
        for (b = 0; b < a.length; b++) for (var c = a[b].addedNodes, d = 0; d < c.length; d++) L(this.g, c[d])
    };

    function yc() {
        var a = this;
        this.b = this.a = void 0;
        this.c = new Promise(function (b) {
            a.b = b;
            a.a && b(a.a)
        })
    }

    function zc(a) {
        if (a.a) throw Error("Already resolved.");
        a.a = void 0;
        a.b && a.b(void 0)
    };

    function M(a) {
        this.U = !1;
        this.g = a;
        this.Y = new Map;
        this.V = function (a) {
            return a()
        };
        this.J = !1;
        this.W = [];
        this.qa = new wc(a)
    }

    M.prototype.define = function (a, b) {
        var c = this;
        if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
        if (!pc(a)) throw new SyntaxError("The element name '" + a + "' is not valid.");
        if (this.g.a.get(a)) throw Error("A custom element with name '" + a + "' has already been defined.");
        if (this.U) throw Error("A custom element is already being defined.");
        this.U = !0;
        try {
            var d = function (a) {
                var b = e[a];
                if (void 0 !== b && !(b instanceof Function)) throw Error("The '" + a + "' callback must be a function.");
                return b
            }, e = b.prototype;
            if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");
            var f = d("connectedCallback");
            var h = d("disconnectedCallback");
            var g = d("adoptedCallback");
            var k = d("attributeChangedCallback");
            var l = b.observedAttributes || []
        } catch (m) {
            return
        } finally {
            this.U = !1
        }
        b = {
            localName: a,
            constructor: b,
            connectedCallback: f,
            disconnectedCallback: h,
            adoptedCallback: g,
            attributeChangedCallback: k,
            observedAttributes: l,
            constructionStack: []
        };
        sc(this.g, a, b);
        this.W.push(b);
        this.J || (this.J = !0, this.V(function () {
            return Ac(c)
        }))
    };

    function Ac(a) {
        if (!1 !== a.J) {
            a.J = !1;
            for (var b = a.W, c = [], d = new Map, e = 0; e < b.length; e++) d.set(b[e].localName, []);
            L(a.g, document, {
                ia: function (b) {
                    if (void 0 === b.__CE_state) {
                        var e = b.localName, f = d.get(e);
                        f ? f.push(b) : a.g.a.get(e) && c.push(b)
                    }
                }
            });
            for (e = 0; e < c.length; e++) vc(a.g, c[e]);
            for (; 0 < b.length;) {
                var f = b.shift();
                e = f.localName;
                f = d.get(f.localName);
                for (var h = 0; h < f.length; h++) vc(a.g, f[h]);
                (e = a.Y.get(e)) && zc(e)
            }
        }
    }

    M.prototype.get = function (a) {
        if (a = this.g.a.get(a)) return a.constructor
    };
    M.prototype.whenDefined = function (a) {
        if (!pc(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));
        var b = this.Y.get(a);
        if (b) return b.c;
        b = new yc;
        this.Y.set(a, b);
        this.g.a.get(a) && !this.W.some(function (b) {
            return b.localName === a
        }) && zc(b);
        return b.c
    };
    M.prototype.ya = function (a) {
        xc(this.qa);
        var b = this.V;
        this.V = function (c) {
            return a(function () {
                return b(c)
            })
        }
    };
    window.CustomElementRegistry = M;
    M.prototype.define = M.prototype.define;
    M.prototype.get = M.prototype.get;
    M.prototype.whenDefined = M.prototype.whenDefined;
    M.prototype.polyfillWrapFlushCallback = M.prototype.ya;
    var Bc = window.Document.prototype.createElement, Cc = window.Document.prototype.createElementNS,
        Dc = window.Document.prototype.importNode, Ec = window.Document.prototype.prepend,
        Fc = window.Document.prototype.append, Gc = window.DocumentFragment.prototype.prepend,
        Hc = window.DocumentFragment.prototype.append, Ic = window.Node.prototype.cloneNode,
        Jc = window.Node.prototype.appendChild, Kc = window.Node.prototype.insertBefore,
        Lc = window.Node.prototype.removeChild, Mc = window.Node.prototype.replaceChild,
        Nc = Object.getOwnPropertyDescriptor(window.Node.prototype,
            "textContent"), Oc = window.Element.prototype.attachShadow,
        Pc = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
        Qc = window.Element.prototype.getAttribute, Rc = window.Element.prototype.setAttribute,
        Sc = window.Element.prototype.removeAttribute, Tc = window.Element.prototype.getAttributeNS,
        Uc = window.Element.prototype.setAttributeNS, Vc = window.Element.prototype.removeAttributeNS,
        Wc = window.Element.prototype.insertAdjacentElement, Xc = window.Element.prototype.prepend,
        Yc = window.Element.prototype.append,
        Zc = window.Element.prototype.before, $c = window.Element.prototype.after,
        ad = window.Element.prototype.replaceWith, bd = window.Element.prototype.remove, cd = window.HTMLElement,
        dd = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
        ed = window.HTMLElement.prototype.insertAdjacentElement;
    var fd = new function () {
    };

    function gd() {
        var a = O;
        window.HTMLElement = function () {
            function b() {
                var b = this.constructor, d = a.u.get(b);
                if (!d) throw Error("The custom element being constructed was not registered with `customElements`.");
                var e = d.constructionStack;
                if (0 === e.length) return e = Bc.call(document, d.localName), Object.setPrototypeOf(e, b.prototype), e.__CE_state = 1, e.__CE_definition = d, a.b(e), e;
                d = e.length - 1;
                var f = e[d];
                if (f === fd) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
                e[d] = fd;
                Object.setPrototypeOf(f, b.prototype);
                a.b(f);
                return f
            }

            b.prototype = cd.prototype;
            return b
        }()
    };

    function hd(a, b, c) {
        function d(b) {
            return function (c) {
                for (var d = [], e = 0; e < arguments.length; ++e) d[e - 0] = arguments[e];
                e = [];
                for (var f = [], l = 0; l < d.length; l++) {
                    var m = d[l];
                    m instanceof Element && F(m) && f.push(m);
                    if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) e.push(m); else e.push(m)
                }
                b.apply(this, d);
                for (d = 0; d < f.length; d++) K(a, f[d]);
                if (F(this)) for (d = 0; d < e.length; d++) f = e[d], f instanceof Element && J(a, f)
            }
        }

        void 0 !== c.O && (b.prepend = d(c.O));
        void 0 !== c.append && (b.append = d(c.append))
    };

    function id() {
        var a = O;
        I(Document.prototype, "createElement", function (b) {
            if (this.__CE_hasRegistry) {
                var c = a.a.get(b);
                if (c) return new c.constructor
            }
            b = Bc.call(this, b);
            a.b(b);
            return b
        });
        I(Document.prototype, "importNode", function (b, c) {
            b = Dc.call(this, b, c);
            this.__CE_hasRegistry ? L(a, b) : uc(a, b);
            return b
        });
        I(Document.prototype, "createElementNS", function (b, c) {
            if (this.__CE_hasRegistry && (null === b || "http://www.w3.org/1999/xhtml" === b)) {
                var d = a.a.get(c);
                if (d) return new d.constructor
            }
            b = Cc.call(this, b, c);
            a.b(b);
            return b
        });
        hd(a, Document.prototype, {O: Ec, append: Fc})
    };

    function jd() {
        var a = O;

        function b(b, d) {
            Object.defineProperty(b, "textContent", {
                enumerable: d.enumerable,
                configurable: !0,
                get: d.get,
                set: function (b) {
                    if (this.nodeType === Node.TEXT_NODE) d.set.call(this, b); else {
                        var c = void 0;
                        if (this.firstChild) {
                            var e = this.childNodes, g = e.length;
                            if (0 < g && F(this)) {
                                c = Array(g);
                                for (var k = 0; k < g; k++) c[k] = e[k]
                            }
                        }
                        d.set.call(this, b);
                        if (c) for (b = 0; b < c.length; b++) K(a, c[b])
                    }
                }
            })
        }

        I(Node.prototype, "insertBefore", function (b, d) {
            if (b instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(b.childNodes);
                b = Kc.call(this, b, d);
                if (F(this)) for (d = 0; d < c.length; d++) J(a, c[d]);
                return b
            }
            c = F(b);
            d = Kc.call(this, b, d);
            c && K(a, b);
            F(this) && J(a, b);
            return d
        });
        I(Node.prototype, "appendChild", function (b) {
            if (b instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(b.childNodes);
                b = Jc.call(this, b);
                if (F(this)) for (var e = 0; e < c.length; e++) J(a, c[e]);
                return b
            }
            c = F(b);
            e = Jc.call(this, b);
            c && K(a, b);
            F(this) && J(a, b);
            return e
        });
        I(Node.prototype, "cloneNode", function (b) {
            b = Ic.call(this, b);
            this.ownerDocument.__CE_hasRegistry ? L(a, b) :
                uc(a, b);
            return b
        });
        I(Node.prototype, "removeChild", function (b) {
            var c = F(b), e = Lc.call(this, b);
            c && K(a, b);
            return e
        });
        I(Node.prototype, "replaceChild", function (b, d) {
            if (b instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(b.childNodes);
                b = Mc.call(this, b, d);
                if (F(this)) for (K(a, d), d = 0; d < c.length; d++) J(a, c[d]);
                return b
            }
            c = F(b);
            var f = Mc.call(this, b, d), h = F(this);
            h && K(a, d);
            c && K(a, b);
            h && J(a, b);
            return f
        });
        Nc && Nc.get ? b(Node.prototype, Nc) : tc(a, function (a) {
            b(a, {
                enumerable: !0, configurable: !0, get: function () {
                    for (var a =
                        [], b = 0; b < this.childNodes.length; b++) a.push(this.childNodes[b].textContent);
                    return a.join("")
                }, set: function (a) {
                    for (; this.firstChild;) Lc.call(this, this.firstChild);
                    Jc.call(this, document.createTextNode(a))
                }
            })
        })
    };

    function kd(a) {
        var b = Element.prototype;

        function c(b) {
            return function (c) {
                for (var d = [], e = 0; e < arguments.length; ++e) d[e - 0] = arguments[e];
                e = [];
                for (var g = [], k = 0; k < d.length; k++) {
                    var l = d[k];
                    l instanceof Element && F(l) && g.push(l);
                    if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) e.push(l); else e.push(l)
                }
                b.apply(this, d);
                for (d = 0; d < g.length; d++) K(a, g[d]);
                if (F(this)) for (d = 0; d < e.length; d++) g = e[d], g instanceof Element && J(a, g)
            }
        }

        void 0 !== Zc && (b.before = c(Zc));
        void 0 !== Zc && (b.after = c($c));
        void 0 !==
        ad && I(b, "replaceWith", function (b) {
            for (var c = [], d = 0; d < arguments.length; ++d) c[d - 0] = arguments[d];
            d = [];
            for (var h = [], g = 0; g < c.length; g++) {
                var k = c[g];
                k instanceof Element && F(k) && h.push(k);
                if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) d.push(k); else d.push(k)
            }
            g = F(this);
            ad.apply(this, c);
            for (c = 0; c < h.length; c++) K(a, h[c]);
            if (g) for (K(a, this), c = 0; c < d.length; c++) h = d[c], h instanceof Element && J(a, h)
        });
        void 0 !== bd && I(b, "remove", function () {
            var b = F(this);
            bd.call(this);
            b && K(a, this)
        })
    };

    function ld() {
        var a = O;

        function b(b, c) {
            Object.defineProperty(b, "innerHTML", {
                enumerable: c.enumerable,
                configurable: !0,
                get: c.get,
                set: function (b) {
                    var d = this, e = void 0;
                    F(this) && (e = [], G(this, function (a) {
                        a !== d && e.push(a)
                    }));
                    c.set.call(this, b);
                    if (e) for (var f = 0; f < e.length; f++) {
                        var l = e[f];
                        1 === l.__CE_state && a.disconnectedCallback(l)
                    }
                    this.ownerDocument.__CE_hasRegistry ? L(a, this) : uc(a, this);
                    return b
                }
            })
        }

        function c(b, c) {
            I(b, "insertAdjacentElement", function (b, d) {
                var e = F(d);
                b = c.call(this, b, d);
                e && K(a, d);
                F(b) && J(a, d);
                return b
            })
        }

        Oc && I(Element.prototype, "attachShadow", function (a) {
            return this.__CE_shadowRoot = a = Oc.call(this, a)
        });
        Pc && Pc.get ? b(Element.prototype, Pc) : dd && dd.get ? b(HTMLElement.prototype, dd) : tc(a, function (a) {
            b(a, {
                enumerable: !0, configurable: !0, get: function () {
                    return Ic.call(this, !0).innerHTML
                }, set: function (a) {
                    var b = "template" === this.localName, c = b ? this.content : this,
                        d = Bc.call(document, this.localName);
                    for (d.innerHTML = a; 0 < c.childNodes.length;) Lc.call(c, c.childNodes[0]);
                    for (a = b ? d.content : d; 0 < a.childNodes.length;) Jc.call(c,
                        a.childNodes[0])
                }
            })
        });
        I(Element.prototype, "setAttribute", function (b, c) {
            if (1 !== this.__CE_state) return Rc.call(this, b, c);
            var d = Qc.call(this, b);
            Rc.call(this, b, c);
            c = Qc.call(this, b);
            a.attributeChangedCallback(this, b, d, c, null)
        });
        I(Element.prototype, "setAttributeNS", function (b, c, f) {
            if (1 !== this.__CE_state) return Uc.call(this, b, c, f);
            var d = Tc.call(this, b, c);
            Uc.call(this, b, c, f);
            f = Tc.call(this, b, c);
            a.attributeChangedCallback(this, c, d, f, b)
        });
        I(Element.prototype, "removeAttribute", function (b) {
            if (1 !== this.__CE_state) return Sc.call(this,
                b);
            var c = Qc.call(this, b);
            Sc.call(this, b);
            null !== c && a.attributeChangedCallback(this, b, c, null, null)
        });
        I(Element.prototype, "removeAttributeNS", function (b, c) {
            if (1 !== this.__CE_state) return Vc.call(this, b, c);
            var d = Tc.call(this, b, c);
            Vc.call(this, b, c);
            var e = Tc.call(this, b, c);
            d !== e && a.attributeChangedCallback(this, c, d, e, b)
        });
        ed ? c(HTMLElement.prototype, ed) : Wc ? c(Element.prototype, Wc) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");
        hd(a, Element.prototype, {O: Xc, append: Yc});
        kd(a)
    }
    ;
    /*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    var md = window.customElements;
    if (!md || md.forcePolyfill || "function" != typeof md.define || "function" != typeof md.get) {
        var O = new rc;
        gd();
        id();
        hd(O, DocumentFragment.prototype, {O: Gc, append: Hc});
        jd();
        ld();
        document.__CE_hasRegistry = !0;
        var customElements = new M(O);
        Object.defineProperty(window, "customElements", {configurable: !0, enumerable: !0, value: customElements})
    }
    ;

    /*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    function nd() {
        this.end = this.start = 0;
        this.rules = this.parent = this.previous = null;
        this.cssText = this.parsedCssText = "";
        this.atRule = !1;
        this.type = 0;
        this.parsedSelector = this.selector = this.keyframesName = ""
    }

    function od(a) {
        a = a.replace(pd, "").replace(qd, "");
        var b = rd, c = a, d = new nd;
        d.start = 0;
        d.end = c.length;
        for (var e = d, f = 0, h = c.length; f < h; f++) if ("{" === c[f]) {
            e.rules || (e.rules = []);
            var g = e, k = g.rules[g.rules.length - 1] || null;
            e = new nd;
            e.start = f + 1;
            e.parent = g;
            e.previous = k;
            g.rules.push(e)
        } else "}" === c[f] && (e.end = f + 1, e = e.parent || d);
        return b(d, a)
    }

    function rd(a, b) {
        var c = b.substring(a.start, a.end - 1);
        a.parsedCssText = a.cssText = c.trim();
        a.parent && (c = b.substring(a.previous ? a.previous.end : a.parent.start, a.start - 1), c = sd(c), c = c.replace(td, " "), c = c.substring(c.lastIndexOf(";") + 1), c = a.parsedSelector = a.selector = c.trim(), a.atRule = 0 === c.indexOf("@"), a.atRule ? 0 === c.indexOf("@media") ? a.type = ud : c.match(vd) && (a.type = wd, a.keyframesName = a.selector.split(td).pop()) : a.type = 0 === c.indexOf("--") ? xd : yd);
        if (c = a.rules) for (var d = 0, e = c.length, f; d < e && (f = c[d]); d++) rd(f,
            b);
        return a
    }

    function sd(a) {
        return a.replace(/\\([0-9a-f]{1,6})\s/gi, function (a, c) {
            a = c;
            for (c = 6 - a.length; c--;) a = "0" + a;
            return "\\" + a
        })
    }

    function zd(a, b, c) {
        c = void 0 === c ? "" : c;
        var d = "";
        if (a.cssText || a.rules) {
            var e = a.rules, f;
            if (f = e) f = e[0], f = !(f && f.selector && 0 === f.selector.indexOf("--"));
            if (f) {
                f = 0;
                for (var h = e.length, g; f < h && (g = e[f]); f++) d = zd(g, b, d)
            } else b ? b = a.cssText : (b = a.cssText, b = b.replace(Ad, "").replace(Bd, ""), b = b.replace(Cd, "").replace(Dd, "")), (d = b.trim()) && (d = "  " + d + "\n")
        }
        d && (a.selector && (c += a.selector + " {\n"), c += d, a.selector && (c += "}\n\n"));
        return c
    }

    var yd = 1, wd = 7, ud = 4, xd = 1E3, pd = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim, qd = /@import[^;]*;/gim,
        Ad = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
        Bd = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
        Cd = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim, Dd = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
        vd = /^@[^\s]*keyframes/, td = /\s+/g;
    var P = !(window.ShadyDOM && window.ShadyDOM.inUse), Ed;

    function Fd(a) {
        Ed = a && a.shimcssproperties ? !1 : P || !(navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) || !window.CSS || !CSS.supports || !CSS.supports("box-shadow", "0 0 0 var(--foo)"))
    }

    window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss ? Ed = window.ShadyCSS.nativeCss : window.ShadyCSS ? (Fd(window.ShadyCSS), window.ShadyCSS = void 0) : Fd(window.WebComponents && window.WebComponents.flags);
    var Q = Ed;
    var Gd = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
        Hd = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi, Id = /(--[\w-]+)\s*([:,;)]|$)/gi,
        Jd = /(animation\s*:)|(animation-name\s*:)/, Kd = /@media\s(.*)/, Ld = /\{[^}]*\}/g;
    var Md = new Set;

    function R(a, b) {
        if (!a) return "";
        "string" === typeof a && (a = od(a));
        b && S(a, b);
        return zd(a, Q)
    }

    function Nd(a) {
        !a.__cssRules && a.textContent && (a.__cssRules = od(a.textContent));
        return a.__cssRules || null
    }

    function Od(a) {
        return !!a.parent && a.parent.type === wd
    }

    function S(a, b, c, d) {
        if (a) {
            var e = !1, f = a.type;
            if (d && f === ud) {
                var h = a.selector.match(Kd);
                h && (window.matchMedia(h[1]).matches || (e = !0))
            }
            f === yd ? b(a) : c && f === wd ? c(a) : f === xd && (e = !0);
            if ((a = a.rules) && !e) {
                e = 0;
                f = a.length;
                for (var g; e < f && (g = a[e]); e++) S(g, b, c, d)
            }
        }
    }

    function Pd(a, b, c, d) {
        var e = document.createElement("style");
        b && e.setAttribute("scope", b);
        e.textContent = a;
        Qd(e, c, d);
        return e
    }

    var T = null;

    function Qd(a, b, c) {
        b = b || document.head;
        b.insertBefore(a, c && c.nextSibling || b.firstChild);
        T ? a.compareDocumentPosition(T) === Node.DOCUMENT_POSITION_PRECEDING && (T = a) : T = a
    }

    function Rd(a, b) {
        var c = a.indexOf("var(");
        if (-1 === c) return b(a, "", "", "");
        a:{
            var d = 0;
            var e = c + 3;
            for (var f = a.length; e < f; e++) if ("(" === a[e]) d++; else if (")" === a[e] && 0 === --d) break a;
            e = -1
        }
        d = a.substring(c + 4, e);
        c = a.substring(0, c);
        a = Rd(a.substring(e + 1), b);
        e = d.indexOf(",");
        return -1 === e ? b(c, d.trim(), "", a) : b(c, d.substring(0, e).trim(), d.substring(e + 1).trim(), a)
    }

    function Sd(a, b) {
        P ? a.setAttribute("class", b) : window.ShadyDOM.nativeMethods.setAttribute.call(a, "class", b)
    }

    function U(a) {
        var b = a.localName, c = "";
        b ? -1 < b.indexOf("-") || (c = b, b = a.getAttribute && a.getAttribute("is") || "") : (b = a.is, c = a.extends);
        return {is: b, I: c}
    };

    function Td() {
    }

    function Ud(a, b, c) {
        var d = V;
        a.__styleScoped ? a.__styleScoped = null : Vd(d, a, b || "", c)
    }

    function Vd(a, b, c, d) {
        b.nodeType === Node.ELEMENT_NODE && Wd(b, c, d);
        if (b = "template" === b.localName ? (b.content || b.Ka).childNodes : b.children || b.childNodes) for (var e = 0; e < b.length; e++) Vd(a, b[e], c, d)
    }

    function Wd(a, b, c) {
        if (b) if (a.classList) c ? (a.classList.remove("style-scope"), a.classList.remove(b)) : (a.classList.add("style-scope"), a.classList.add(b)); else if (a.getAttribute) {
            var d = a.getAttribute(Xd);
            c ? d && (b = d.replace("style-scope", "").replace(b, ""), Sd(a, b)) : Sd(a, (d ? d + " " : "") + "style-scope " + b)
        }
    }

    function Yd(a, b, c) {
        var d = V, e = a.__cssBuild;
        P || "shady" === e ? b = R(b, c) : (a = U(a), b = Zd(d, b, a.is, a.I, c) + "\n\n");
        return b.trim()
    }

    function Zd(a, b, c, d, e) {
        var f = $d(c, d);
        c = c ? ae + c : "";
        return R(b, function (b) {
            b.c || (b.selector = b.j = be(a, b, a.b, c, f), b.c = !0);
            e && e(b, c, f)
        })
    }

    function $d(a, b) {
        return b ? "[is=" + a + "]" : a
    }

    function be(a, b, c, d, e) {
        var f = b.selector.split(ce);
        if (!Od(b)) {
            b = 0;
            for (var h = f.length, g; b < h && (g = f[b]); b++) f[b] = c.call(a, g, d, e)
        }
        return f.join(ce)
    }

    function de(a) {
        return a.replace(ee, function (a, c, d) {
            -1 < d.indexOf("+") ? d = d.replace(/\+/g, "___") : -1 < d.indexOf("___") && (d = d.replace(/___/g, "+"));
            return ":" + c + "(" + d + ")"
        })
    }

    Td.prototype.b = function (a, b, c) {
        var d = !1;
        a = a.trim();
        var e = ee.test(a);
        e && (a = a.replace(ee, function (a, b, c) {
            return ":" + b + "(" + c.replace(/\s/g, "") + ")"
        }), a = de(a));
        a = a.replace(fe, ge + " $1");
        a = a.replace(he, function (a, e, g) {
            d || (a = ie(g, e, b, c), d = d || a.stop, e = a.ta, g = a.value);
            return e + g
        });
        e && (a = de(a));
        return a
    };

    function ie(a, b, c, d) {
        var e = a.indexOf(je);
        0 <= a.indexOf(ge) ? a = ke(a, d) : 0 !== e && (a = c ? le(a, c) : a);
        c = !1;
        0 <= e && (b = "", c = !0);
        if (c) {
            var f = !0;
            c && (a = a.replace(me, function (a, b) {
                return " > " + b
            }))
        }
        a = a.replace(ne, function (a, b, c) {
            return '[dir="' + c + '"] ' + b + ", " + b + '[dir="' + c + '"]'
        });
        return {value: a, ta: b, stop: f}
    }

    function le(a, b) {
        a = a.split(oe);
        a[0] += b;
        return a.join(oe)
    }

    function ke(a, b) {
        var c = a.match(pe);
        return (c = c && c[2].trim() || "") ? c[0].match(qe) ? a.replace(pe, function (a, c, f) {
            return b + f
        }) : c.split(qe)[0] === b ? c : re : a.replace(ge, b)
    }

    function se(a) {
        a.selector === te && (a.selector = "html")
    }

    Td.prototype.c = function (a) {
        return a.match(je) ? this.b(a, ue) : le(a.trim(), ue)
    };
    p.Object.defineProperties(Td.prototype, {
        a: {
            configurable: !0, enumerable: !0, get: function () {
                return "style-scope"
            }
        }
    });
    var ee = /:(nth[-\w]+)\(([^)]+)\)/, ue = ":not(.style-scope)", ce = ",",
        he = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g, qe = /[[.:#*]/, ge = ":host", te = ":root", je = "::slotted",
        fe = new RegExp("^(" + je + ")"), pe = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
        me = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/, ne = /(.*):dir\((?:(ltr|rtl))\)/, ae = ".", oe = ":",
        Xd = "class", re = "should_not_match", V = new Td;

    function ve(a, b, c, d) {
        this.s = a || null;
        this.b = b || null;
        this.$ = c || [];
        this.B = null;
        this.I = d || "";
        this.a = this.m = this.v = null
    }

    function W(a) {
        return a ? a.__styleInfo : null
    }

    function we(a, b) {
        return a.__styleInfo = b
    }

    ve.prototype.c = function () {
        return this.s
    };
    ve.prototype._getStyleRules = ve.prototype.c;
    var xe, X = window.Element.prototype;
    xe = X.matches || X.matchesSelector || X.mozMatchesSelector || X.msMatchesSelector || X.oMatchesSelector || X.webkitMatchesSelector;
    var ye = navigator.userAgent.match("Trident");

    function ze() {
    }

    function Ae(a) {
        var b = {}, c = [], d = 0;
        S(a, function (a) {
            Be(a);
            a.index = d++;
            a = a.f.cssText;
            for (var c; c = Id.exec(a);) {
                var e = c[1];
                ":" !== c[2] && (b[e] = !0)
            }
        }, function (a) {
            c.push(a)
        });
        a.b = c;
        a = [];
        for (var e in b) a.push(e);
        return a
    }

    function Be(a) {
        if (!a.f) {
            var b = {}, c = {};
            Ce(a, c) && (b.o = c, a.rules = null);
            b.cssText = a.parsedCssText.replace(Ld, "").replace(Gd, "");
            a.f = b
        }
    }

    function Ce(a, b) {
        var c = a.f;
        if (c) {
            if (c.o) return Object.assign(b, c.o), !0
        } else {
            c = a.parsedCssText;
            for (var d; a = Gd.exec(c);) {
                d = (a[2] || a[3]).trim();
                if ("inherit" !== d || "unset" !== d) b[a[1].trim()] = d;
                d = !0
            }
            return d
        }
    }

    function De(a, b, c) {
        b && (b = 0 <= b.indexOf(";") ? Ee(a, b, c) : Rd(b, function (b, e, f, h) {
            if (!e) return b + h;
            (e = De(a, c[e], c)) && "initial" !== e ? "apply-shim-inherit" === e && (e = "inherit") : e = De(a, c[f] || f, c) || f;
            return b + (e || "") + h
        }));
        return b && b.trim() || ""
    }

    function Ee(a, b, c) {
        b = b.split(";");
        for (var d = 0, e, f; d < b.length; d++) if (e = b[d]) {
            Hd.lastIndex = 0;
            if (f = Hd.exec(e)) e = De(a, c[f[1]], c); else if (f = e.indexOf(":"), -1 !== f) {
                var h = e.substring(f);
                h = h.trim();
                h = De(a, h, c) || h;
                e = e.substring(0, f) + h
            }
            b[d] = e && e.lastIndexOf(";") === e.length - 1 ? e.slice(0, -1) : e || ""
        }
        return b.join(";")
    }

    function Fe(a, b) {
        var c = {}, d = [];
        S(a, function (a) {
            a.f || Be(a);
            var e = a.j || a.parsedSelector;
            b && a.f.o && e && xe.call(b, e) && (Ce(a, c), a = a.index, e = parseInt(a / 32, 10), d[e] = (d[e] || 0) | 1 << a % 32)
        }, null, !0);
        return {o: c, key: d}
    }

    function Ge(a, b, c, d) {
        b.f || Be(b);
        if (b.f.o) {
            var e = U(a);
            a = e.is;
            e = e.I;
            e = a ? $d(a, e) : "html";
            var f = b.parsedSelector, h = ":host > *" === f || "html" === f, g = 0 === f.indexOf(":host") && !h;
            "shady" === c && (h = f === e + " > *." + e || -1 !== f.indexOf("html"), g = !h && 0 === f.indexOf(e));
            "shadow" === c && (h = ":host > *" === f || "html" === f, g = g && !h);
            if (h || g) c = e, g && (P && !b.j && (b.j = be(V, b, V.b, a ? ae + a : "", e)), c = b.j || e), d({
                Ba: c,
                xa: g,
                Ma: h
            })
        }
    }

    function He(a, b) {
        var c = {}, d = {}, e = b && b.__cssBuild;
        S(b, function (b) {
            Ge(a, b, e, function (e) {
                xe.call(a.La || a, e.Ba) && (e.xa ? Ce(b, c) : Ce(b, d))
            })
        }, null, !0);
        return {Aa: d, wa: c}
    }

    function Ie(a, b, c, d) {
        var e = U(b), f = $d(e.is, e.I),
            h = new RegExp("(?:^|[^.#[:])" + (b.extends ? "\\" + f.slice(0, -1) + "\\]" : f) + "($|[.:[\\s>+~])");
        e = W(b).s;
        var g = Je(e, d);
        return Yd(b, e, function (b) {
            var e = "";
            b.f || Be(b);
            b.f.cssText && (e = Ee(a, b.f.cssText, c));
            b.cssText = e;
            if (!P && !Od(b) && b.cssText) {
                var k = e = b.cssText;
                null == b.fa && (b.fa = Jd.test(e));
                if (b.fa) if (null == b.N) {
                    b.N = [];
                    for (var q in g) k = g[q], k = k(e), e !== k && (e = k, b.N.push(q))
                } else {
                    for (q = 0; q < b.N.length; ++q) k = g[b.N[q]], e = k(e);
                    k = e
                }
                b.cssText = k;
                b.j = b.j || b.selector;
                e = "." + d;
                q = b.j.split(",");
                k = 0;
                for (var H = q.length, N; k < H && (N = q[k]); k++) q[k] = N.match(h) ? N.replace(f, e) : e + " " + N;
                b.selector = q.join(",")
            }
        })
    }

    function Je(a, b) {
        a = a.b;
        var c = {};
        if (!P && a) for (var d = 0, e = a[d]; d < a.length; e = a[++d]) {
            var f = e, h = b;
            f.i = new RegExp(f.keyframesName, "g");
            f.a = f.keyframesName + "-" + h;
            f.j = f.j || f.selector;
            f.selector = f.j.replace(f.keyframesName, f.a);
            c[e.keyframesName] = Ke(e)
        }
        return c
    }

    function Ke(a) {
        return function (b) {
            return b.replace(a.i, a.a)
        }
    }

    function Le(a, b) {
        var c = Me, d = Nd(a);
        a.textContent = R(d, function (a) {
            var d = a.cssText = a.parsedCssText;
            a.f && a.f.cssText && (d = d.replace(Ad, "").replace(Bd, ""), a.cssText = Ee(c, d, b))
        })
    }

    p.Object.defineProperties(ze.prototype, {
        a: {
            configurable: !0, enumerable: !0, get: function () {
                return "x-scope"
            }
        }
    });
    var Me = new ze;
    var Ne = {}, Oe = window.customElements;
    if (Oe && !P) {
        var Pe = Oe.define;
        Oe.define = function (a, b, c) {
            var d = document.createComment(" Shady DOM styles for " + a + " "), e = document.head;
            e.insertBefore(d, (T ? T.nextSibling : null) || e.firstChild);
            T = d;
            Ne[a] = d;
            return Pe.call(Oe, a, b, c)
        }
    }
    ;

    function Qe() {
        this.cache = {}
    }

    Qe.prototype.store = function (a, b, c, d) {
        var e = this.cache[a] || [];
        e.push({o: b, styleElement: c, m: d});
        100 < e.length && e.shift();
        this.cache[a] = e
    };
    Qe.prototype.fetch = function (a, b, c) {
        if (a = this.cache[a]) for (var d = a.length - 1; 0 <= d; d--) {
            var e = a[d], f;
            a:{
                for (f = 0; f < c.length; f++) {
                    var h = c[f];
                    if (e.o[h] !== b[h]) {
                        f = !1;
                        break a
                    }
                }
                f = !0
            }
            if (f) return e
        }
    };

    function Re() {
    }

    function Se(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            if (c.target !== document.documentElement && c.target !== document.head) for (var d = 0; d < c.addedNodes.length; d++) {
                var e = c.addedNodes[d];
                if (e.nodeType === Node.ELEMENT_NODE) {
                    var f = e.getRootNode();
                    var h = e;
                    var g = [];
                    h.classList ? g = Array.from(h.classList) : h instanceof window.SVGElement && h.hasAttribute("class") && (g = h.getAttribute("class").split(/\s+/));
                    h = g;
                    g = h.indexOf(V.a);
                    if ((h = -1 < g ? h[g + 1] : "") && f === e.ownerDocument) Ud(e, h, !0); else if (f.nodeType === Node.DOCUMENT_FRAGMENT_NODE &&
                        (f = f.host)) if (f = U(f).is, h === f) for (e = window.ShadyDOM.nativeMethods.querySelectorAll.call(e, ":not(." + V.a + ")"), f = 0; f < e.length; f++) Wd(e[f], h); else h && Ud(e, h, !0), Ud(e, f)
                }
            }
        }
    }

    if (!P) {
        var Te = new MutationObserver(Se), Ue = function (a) {
            Te.observe(a, {childList: !0, subtree: !0})
        };
        if (window.customElements && !window.customElements.polyfillWrapFlushCallback) Ue(document); else {
            var Ve = function () {
                Ue(document.body)
            };
            window.HTMLImports ? window.HTMLImports.whenReady(Ve) : requestAnimationFrame(function () {
                if ("loading" === document.readyState) {
                    var a = function () {
                        Ve();
                        document.removeEventListener("readystatechange", a)
                    };
                    document.addEventListener("readystatechange", a)
                } else Ve()
            })
        }
        Re = function () {
            Se(Te.takeRecords())
        }
    }
    var We = Re;
    var Xe = {};
    var Ye = Promise.resolve();

    function Ze(a) {
        if (a = Xe[a]) a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0, a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0, a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1
    }

    function $e(a) {
        return a._applyShimCurrentVersion === a._applyShimNextVersion
    }

    function af(a) {
        a._applyShimValidatingVersion = a._applyShimNextVersion;
        a.b || (a.b = !0, Ye.then(function () {
            a._applyShimCurrentVersion = a._applyShimNextVersion;
            a.b = !1
        }))
    };var bf = null, cf = window.HTMLImports && window.HTMLImports.whenReady || null, df;

    function ef(a) {
        requestAnimationFrame(function () {
            cf ? cf(a) : (bf || (bf = new Promise(function (a) {
                df = a
            }), "complete" === document.readyState ? df() : document.addEventListener("readystatechange", function () {
                "complete" === document.readyState && df()
            })), bf.then(function () {
                a && a()
            }))
        })
    };var ff = new Qe;

    function Y() {
        var a = this;
        this.ea = {};
        this.c = document.documentElement;
        var b = new nd;
        b.rules = [];
        this.i = we(this.c, new ve(b));
        this.u = !1;
        this.b = this.a = null;
        ef(function () {
            gf(a)
        })
    }

    n = Y.prototype;
    n.ja = function () {
        We()
    };
    n.ua = function (a) {
        return Nd(a)
    };
    n.Da = function (a) {
        return R(a)
    };
    n.prepareTemplate = function (a, b, c) {
        if (!a.i) {
            a.i = !0;
            a.name = b;
            a.extends = c;
            Xe[b] = a;
            var d = (d = a.content.querySelector("style")) ? d.getAttribute("css-build") || "" : "";
            var e = [];
            for (var f = a.content.querySelectorAll("style"), h = 0; h < f.length; h++) {
                var g = f[h];
                if (g.hasAttribute("shady-unscoped")) {
                    if (!P) {
                        var k = g.textContent;
                        Md.has(k) || (Md.add(k), k = g.cloneNode(!0), document.head.appendChild(k));
                        g.parentNode.removeChild(g)
                    }
                } else e.push(g.textContent), g.parentNode.removeChild(g)
            }
            e = e.join("").trim();
            c = {is: b, extends: c, Ia: d};
            P || Ud(a.content, b);
            gf(this);
            f = Hd.test(e) || Gd.test(e);
            Hd.lastIndex = 0;
            Gd.lastIndex = 0;
            e = od(e);
            f && Q && this.a && this.a.transformRules(e, b);
            a._styleAst = e;
            a.u = d;
            d = [];
            Q || (d = Ae(a._styleAst));
            if (!d.length || Q) e = P ? a.content : null, b = Ne[b], f = Yd(c, a._styleAst), b = f.length ? Pd(f, c.is, e, b) : void 0, a.a = b;
            a.c = d
        }
    };

    function hf(a) {
        !a.b && window.ShadyCSS && window.ShadyCSS.CustomStyleInterface && (a.b = window.ShadyCSS.CustomStyleInterface, a.b.transformCallback = function (b) {
            a.ha(b)
        }, a.b.validateCallback = function () {
            requestAnimationFrame(function () {
                (a.b.enqueued || a.u) && a.A()
            })
        })
    }

    function gf(a) {
        !a.a && window.ShadyCSS && window.ShadyCSS.ApplyShim && (a.a = window.ShadyCSS.ApplyShim, a.a.invalidCallback = Ze);
        hf(a)
    }

    n.A = function () {
        gf(this);
        if (this.b) {
            var a = this.b.processStyles();
            if (this.b.enqueued) {
                if (Q) for (var b = 0; b < a.length; b++) {
                    var c = this.b.getStyleForCustomStyle(a[b]);
                    if (c && Q && this.a) {
                        var d = Nd(c);
                        gf(this);
                        this.a.transformRules(d);
                        c.textContent = R(d)
                    }
                } else for (jf(this, this.c, this.i), b = 0; b < a.length; b++) (c = this.b.getStyleForCustomStyle(a[b])) && Le(c, this.i.v);
                this.b.enqueued = !1;
                this.u && !Q && this.styleDocument()
            }
        }
    };
    n.styleElement = function (a, b) {
        var c = U(a).is, d = W(a);
        if (!d) {
            var e = U(a);
            d = e.is;
            e = e.I;
            var f = Ne[d];
            d = Xe[d];
            if (d) {
                var h = d._styleAst;
                var g = d.c
            }
            d = we(a, new ve(h, f, g, e))
        }
        a !== this.c && (this.u = !0);
        b && (d.B = d.B || {}, Object.assign(d.B, b));
        if (Q) {
            if (d.B) {
                b = d.B;
                for (var k in b) null === k ? a.style.removeProperty(k) : a.style.setProperty(k, b[k])
            }
            if (((k = Xe[c]) || a === this.c) && k && k.a && !$e(k)) {
                if ($e(k) || k._applyShimValidatingVersion !== k._applyShimNextVersion) gf(this), this.a && this.a.transformRules(k._styleAst, c), k.a.textContent = Yd(a,
                    d.s), af(k);
                P && (c = a.shadowRoot) && (c.querySelector("style").textContent = Yd(a, d.s));
                d.s = k._styleAst
            }
        } else if (jf(this, a, d), d.$ && d.$.length) {
            c = d;
            k = U(a).is;
            d = (b = ff.fetch(k, c.v, c.$)) ? b.styleElement : null;
            h = c.m;
            (g = b && b.m) || (g = this.ea[k] = (this.ea[k] || 0) + 1, g = k + "-" + g);
            c.m = g;
            g = c.m;
            e = Me;
            e = d ? d.textContent || "" : Ie(e, a, c.v, g);
            f = W(a);
            var l = f.a;
            l && !P && l !== d && (l._useCount--, 0 >= l._useCount && l.parentNode && l.parentNode.removeChild(l));
            P ? f.a ? (f.a.textContent = e, d = f.a) : e && (d = Pd(e, g, a.shadowRoot, f.b)) : d ? d.parentNode || (ye && -1 <
            e.indexOf("@media") && (d.textContent = e), Qd(d, null, f.b)) : e && (d = Pd(e, g, null, f.b));
            d && (d._useCount = d._useCount || 0, f.a != d && d._useCount++, f.a = d);
            g = d;
            P || (d = c.m, f = e = a.getAttribute("class") || "", h && (f = e.replace(new RegExp("\\s*x-scope\\s*" + h + "\\s*", "g"), " ")), f += (f ? " " : "") + "x-scope " + d, e !== f && Sd(a, f));
            b || ff.store(k, c.v, g, c.m)
        }
    };

    function kf(a, b) {
        return (b = b.getRootNode().host) ? W(b) ? b : kf(a, b) : a.c
    }

    function jf(a, b, c) {
        a = kf(a, b);
        var d = W(a);
        a = Object.create(d.v || null);
        var e = He(b, c.s);
        b = Fe(d.s, b).o;
        Object.assign(a, e.wa, b, e.Aa);
        b = c.B;
        for (var f in b) if ((e = b[f]) || 0 === e) a[f] = e;
        f = Me;
        b = Object.getOwnPropertyNames(a);
        for (e = 0; e < b.length; e++) d = b[e], a[d] = De(f, a[d], a);
        c.v = a
    }

    n.styleDocument = function (a) {
        this.styleSubtree(this.c, a)
    };
    n.styleSubtree = function (a, b) {
        var c = a.shadowRoot;
        (c || a === this.c) && this.styleElement(a, b);
        if (b = c && (c.children || c.childNodes)) for (a = 0; a < b.length; a++) this.styleSubtree(b[a]); else if (a = a.children || a.childNodes) for (b = 0; b < a.length; b++) this.styleSubtree(a[b])
    };
    n.ha = function (a) {
        var b = this, c = Nd(a);
        S(c, function (a) {
            if (P) se(a); else {
                var c = V;
                a.selector = a.parsedSelector;
                se(a);
                a.selector = a.j = be(c, a, c.c, void 0, void 0)
            }
            Q && (gf(b), b.a && b.a.transformRule(a))
        });
        Q ? a.textContent = R(c) : this.i.s.rules.push(c)
    };
    n.getComputedStyleValue = function (a, b) {
        var c;
        Q || (c = (W(a) || W(kf(this, a))).v[b]);
        return (c = c || window.getComputedStyle(a).getPropertyValue(b)) ? c.trim() : ""
    };
    n.Ca = function (a, b) {
        var c = a.getRootNode();
        b = b ? b.split(/\s/) : [];
        c = c.host && c.host.localName;
        if (!c) {
            var d = a.getAttribute("class");
            if (d) {
                d = d.split(/\s/);
                for (var e = 0; e < d.length; e++) if (d[e] === V.a) {
                    c = d[e + 1];
                    break
                }
            }
        }
        c && b.push(V.a, c);
        Q || (c = W(a)) && c.m && b.push(Me.a, c.m);
        Sd(a, b.join(" "))
    };
    n.sa = function (a) {
        return W(a)
    };
    Y.prototype.flush = Y.prototype.ja;
    Y.prototype.prepareTemplate = Y.prototype.prepareTemplate;
    Y.prototype.styleElement = Y.prototype.styleElement;
    Y.prototype.styleDocument = Y.prototype.styleDocument;
    Y.prototype.styleSubtree = Y.prototype.styleSubtree;
    Y.prototype.getComputedStyleValue = Y.prototype.getComputedStyleValue;
    Y.prototype.setElementClass = Y.prototype.Ca;
    Y.prototype._styleInfoForNode = Y.prototype.sa;
    Y.prototype.transformCustomStyleForDocument = Y.prototype.ha;
    Y.prototype.getStyleAst = Y.prototype.ua;
    Y.prototype.styleAstToString = Y.prototype.Da;
    Y.prototype.flushCustomStyles = Y.prototype.A;
    Object.defineProperties(Y.prototype, {
        nativeShadow: {
            get: function () {
                return P
            }
        }, nativeCss: {
            get: function () {
                return Q
            }
        }
    });
    var Z = new Y, lf, mf;
    window.ShadyCSS && (lf = window.ShadyCSS.ApplyShim, mf = window.ShadyCSS.CustomStyleInterface);
    window.ShadyCSS = {
        ScopingShim: Z, prepareTemplate: function (a, b, c) {
            Z.A();
            Z.prepareTemplate(a, b, c)
        }, styleSubtree: function (a, b) {
            Z.A();
            Z.styleSubtree(a, b)
        }, styleElement: function (a) {
            Z.A();
            Z.styleElement(a)
        }, styleDocument: function (a) {
            Z.A();
            Z.styleDocument(a)
        }, getComputedStyleValue: function (a, b) {
            return Z.getComputedStyleValue(a, b)
        }, nativeCss: Q, nativeShadow: P
    };
    lf && (window.ShadyCSS.ApplyShim = lf);
    mf && (window.ShadyCSS.CustomStyleInterface = mf);
    var nf = window.document;
    window.WebComponents = window.WebComponents || {};

    function of() {
        requestAnimationFrame(function () {
            window.WebComponents.ready = !0;
            window.document.dispatchEvent(new CustomEvent("WebComponentsReady", {bubbles: !0}))
        })
    }

    function pf() {
        of();
        nf.removeEventListener("readystatechange", pf)
    }

    "loading" !== nf.readyState ? of() : nf.addEventListener("readystatechange", pf);
}).call(this);

//# sourceMappingURL=webcomponents-sd-ce.js.map
