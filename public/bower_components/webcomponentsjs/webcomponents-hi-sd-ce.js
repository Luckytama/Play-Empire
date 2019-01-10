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
        p.Symbol || (p.Symbol = da)
    }

    var da = function () {
        var a = 0;
        return function (b) {
            return "jscomp_symbol_" + (b || "") + a++
        }
    }();

    function ea() {
        ba();
        var a = p.Symbol.iterator;
        a || (a = p.Symbol.iterator = p.Symbol("iterator"));
        "function" != typeof Array.prototype[a] && aa(Array.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function () {
                return fa(this)
            }
        });
        ea = function () {
        }
    }

    function fa(a) {
        var b = 0;
        return ha(function () {
            return b < a.length ? {done: !1, value: a[b++]} : {done: !0}
        })
    }

    function ha(a) {
        ea();
        a = {next: a};
        a[p.Symbol.iterator] = function () {
            return this
        };
        return a
    }

    function ia(a) {
        ea();
        var b = a[Symbol.iterator];
        return b ? b.call(a) : fa(a)
    }

    function ja(a) {
        for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
        return c
    }

    (function (a) {
        function b(a, b) {
            if ("function" === typeof window.CustomEvent) return new CustomEvent(a, b);
            var c = document.createEvent("CustomEvent");
            c.initCustomEvent(a, !!b.bubbles, !!b.cancelable, b.detail);
            return c
        }

        function c(a) {
            if (m) return a.ownerDocument !== document ? a.ownerDocument : null;
            var b = a.__importDoc;
            if (!b && a.parentNode) {
                b = a.parentNode;
                if ("function" === typeof b.closest) b = b.closest("link[rel=import]"); else for (; !g(b) && (b = b.parentNode);) ;
                a.__importDoc = b
            }
            return b
        }

        function d(a) {
            var b = document.querySelectorAll("link[rel=import]:not([import-dependency])"),
                c = b.length;
            c ? l(b, function (b) {
                return h(b, function () {
                    0 === --c && a()
                })
            }) : a()
        }

        function e(a) {
            function b() {
                "loading" !== document.readyState && document.body && (document.removeEventListener("readystatechange", b), a())
            }

            document.addEventListener("readystatechange", b);
            b()
        }

        function f(a) {
            e(function () {
                return d(function () {
                    return a && a()
                })
            })
        }

        function h(a, b) {
            if (a.__loaded) b && b(); else if ("script" === a.localName && !a.src || "style" === a.localName && !a.firstChild) a.__loaded = !0, b && b(); else {
                var c = function (d) {
                    a.removeEventListener(d.type,
                        c);
                    a.__loaded = !0;
                    b && b()
                };
                a.addEventListener("load", c);
                Ja && "style" === a.localName || a.addEventListener("error", c)
            }
        }

        function g(a) {
            return a.nodeType === Node.ELEMENT_NODE && "link" === a.localName && "import" === a.rel
        }

        function k() {
            var a = this;
            this.a = {};
            this.b = 0;
            this.f = new MutationObserver(function (b) {
                return a.Ia(b)
            });
            this.f.observe(document.head, {childList: !0, subtree: !0});
            this.c(document)
        }

        function l(a, b, c) {
            var d = a ? a.length : 0, e = c ? -1 : 1;
            for (c = c ? d - 1 : 0; c < d && 0 <= c; c += e) b(a[c], c)
        }

        var m = "import" in document.createElement("link"),
            q = null;
        !1 === "currentScript" in document && Object.defineProperty(document, "currentScript", {
            get: function () {
                return q || ("complete" !== document.readyState ? document.scripts[document.scripts.length - 1] : null)
            }, configurable: !0
        });
        var E = /(url\()([^)]*)(\))/g, J = /(@import[\s]+(?!url\())([^;]*)(;)/g,
            Ld = /(<link[^>]*)(rel=['|"]?stylesheet['|"]?[^>]*>)/g, z = {
                Ca: function (a, b) {
                    a.href && a.setAttribute("href", z.R(a.getAttribute("href"), b));
                    a.src && a.setAttribute("src", z.R(a.getAttribute("src"), b));
                    if ("style" === a.localName) {
                        var c =
                            z.ma(a.textContent, b, E);
                        a.textContent = z.ma(c, b, J)
                    }
                }, ma: function (a, b, c) {
                    return a.replace(c, function (a, c, d, e) {
                        a = d.replace(/["']/g, "");
                        b && (a = z.R(a, b));
                        return c + "'" + a + "'" + e
                    })
                }, R: function (a, b) {
                    if (void 0 === z.W) {
                        z.W = !1;
                        try {
                            var c = new URL("b", "http://a");
                            c.pathname = "c%20d";
                            z.W = "http://a/c%20d" === c.href
                        } catch (Bf) {
                        }
                    }
                    if (z.W) return (new URL(a, b)).href;
                    c = z.va;
                    c || (c = document.implementation.createHTMLDocument("temp"), z.va = c, c.fa = c.createElement("base"), c.head.appendChild(c.fa), c.ea = c.createElement("a"));
                    c.fa.href =
                        b;
                    c.ea.href = a;
                    return c.ea.href || a
                }
            }, Kb = {
                async: !0, load: function (a, b, c) {
                    if (a) if (a.match(/^data:/)) {
                        a = a.split(",");
                        var d = a[1];
                        d = -1 < a[0].indexOf(";base64") ? atob(d) : decodeURIComponent(d);
                        b(d)
                    } else {
                        var e = new XMLHttpRequest;
                        e.open("GET", a, Kb.async);
                        e.onload = function () {
                            var a = e.responseURL || e.getResponseHeader("Location");
                            a && 0 === a.indexOf("/") && (a = (location.origin || location.protocol + "//" + location.host) + a);
                            var d = e.response || e.responseText;
                            304 === e.status || 0 === e.status || 200 <= e.status && 300 > e.status ? b(d, a) : c(d)
                        };
                        e.send()
                    } else c("error: href must be specified")
                }
            }, Ja = /Trident/.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent);
        k.prototype.c = function (a) {
            var b = this;
            a = a.querySelectorAll("link[rel=import]");
            l(a, function (a) {
                return b.F(a)
            })
        };
        k.prototype.F = function (a) {
            var b = this, c = a.href;
            if (void 0 !== this.a[c]) {
                var d = this.a[c];
                d && d.__loaded && (a.import = d, this.l(a))
            } else this.b++, this.a[c] = "pending", Kb.load(c, function (a, d) {
                a = b.Ja(a, d || c);
                b.a[c] = a;
                b.b--;
                b.c(a);
                b.ka()
            }, function () {
                b.a[c] = null;
                b.b--;
                b.ka()
            })
        };
        k.prototype.Ja = function (a, b) {
            if (!a) return document.createDocumentFragment();
            Ja && (a = a.replace(Ld, function (a, b, c) {
                return -1 === a.indexOf("type=") ? b + " type=import-disable " + c : a
            }));
            var c = document.createElement("template");
            c.innerHTML = a;
            if (c.content) a = c.content; else for (a = document.createDocumentFragment(); c.firstChild;) a.appendChild(c.firstChild);
            if (c = a.querySelector("base")) b = z.R(c.getAttribute("href"), b), c.removeAttribute("href");
            c = a.querySelectorAll('link[rel=import], link[rel=stylesheet][href][type=import-disable],\n    style:not([type]), link[rel=stylesheet][href]:not([type]),\n    script:not([type]), script[type="application/javascript"],\n    script[type="text/javascript"]');
            var d = 0;
            l(c, function (a) {
                h(a);
                z.Ca(a, b);
                a.setAttribute("import-dependency", "");
                "script" === a.localName && !a.src && a.textContent && (a.setAttribute("src", "data:text/javascript;charset=utf-8," + encodeURIComponent(a.textContent + ("\n//# sourceURL=" + b + (d ? "-" + d : "") + ".js\n"))), a.textContent = "", d++)
            });
            return a
        };
        k.prototype.ka = function () {
            var a = this;
            if (!this.b) {
                this.f.disconnect();
                this.flatten(document);
                var b = !1, c = !1, d = function () {
                    c && b && (a.c(document), a.b || (a.f.observe(document.head, {childList: !0, subtree: !0}), a.Ha()))
                };
                this.Oa(function () {
                    c = !0;
                    d()
                });
                this.Ka(function () {
                    b = !0;
                    d()
                })
            }
        };
        k.prototype.flatten = function (a) {
            var b = this;
            a = a.querySelectorAll("link[rel=import]");
            l(a, function (a) {
                var c = b.a[a.href];
                (a.import = c) && c.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (b.a[a.href] = a, a.readyState = "loading", a.import = a, b.flatten(c), a.appendChild(c))
            })
        };
        k.prototype.Ka = function (a) {
            function b(e) {
                if (e < d) {
                    var f = c[e], g = document.createElement("script");
                    f.removeAttribute("import-dependency");
                    l(f.attributes, function (a) {
                        return g.setAttribute(a.name,
                            a.value)
                    });
                    q = g;
                    f.parentNode.replaceChild(g, f);
                    h(g, function () {
                        q = null;
                        b(e + 1)
                    })
                } else a()
            }

            var c = document.querySelectorAll("script[import-dependency]"), d = c.length;
            b(0)
        };
        k.prototype.Oa = function (a) {
            var b = document.querySelectorAll("style[import-dependency],\n    link[rel=stylesheet][import-dependency]"),
                d = b.length;
            if (d) {
                var e = Ja && !!document.querySelector("link[rel=stylesheet][href][type=import-disable]");
                l(b, function (b) {
                    h(b, function () {
                        b.removeAttribute("import-dependency");
                        0 === --d && a()
                    });
                    if (e && b.parentNode !==
                        document.head) {
                        var f = document.createElement(b.localName);
                        f.__appliedElement = b;
                        f.setAttribute("type", "import-placeholder");
                        b.parentNode.insertBefore(f, b.nextSibling);
                        for (f = c(b); f && c(f);) f = c(f);
                        f.parentNode !== document.head && (f = null);
                        document.head.insertBefore(b, f);
                        b.removeAttribute("type")
                    }
                })
            } else a()
        };
        k.prototype.Ha = function () {
            var a = this, b = document.querySelectorAll("link[rel=import]");
            l(b, function (b) {
                return a.l(b)
            }, !0)
        };
        k.prototype.l = function (a) {
            a.__loaded || (a.__loaded = !0, a.import && (a.import.readyState =
                "complete"), a.dispatchEvent(b(a.import ? "load" : "error", {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            })))
        };
        k.prototype.Ia = function (a) {
            var b = this;
            l(a, function (a) {
                return l(a.addedNodes, function (a) {
                    a && a.nodeType === Node.ELEMENT_NODE && (g(a) ? b.F(a) : b.c(a))
                })
            })
        };
        if (m) {
            var la = document.querySelectorAll("link[rel=import]");
            l(la, function (a) {
                a.import && "loading" === a.import.readyState || (a.__loaded = !0)
            });
            la = function (a) {
                a = a.target;
                g(a) && (a.__loaded = !0)
            };
            document.addEventListener("load", la, !0);
            document.addEventListener("error",
                la, !0)
        } else {
            var ca = Object.getOwnPropertyDescriptor(Node.prototype, "baseURI");
            Object.defineProperty((!ca || ca.configurable ? Node : Element).prototype, "baseURI", {
                get: function () {
                    var a = g(this) ? this : c(this);
                    return a ? a.href : ca && ca.get ? ca.get.call(this) : (document.querySelector("base") || window.location).href
                }, configurable: !0, enumerable: !0
            });
            e(function () {
                return new k
            })
        }
        f(function () {
            return document.dispatchEvent(b("HTMLImportsLoaded", {cancelable: !0, bubbles: !0, detail: void 0}))
        });
        a.useNative = m;
        a.whenReady = f;
        a.importForElement =
            c
    })(window.HTMLImports = window.HTMLImports || {});
    /*

Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    var r = window.ShadyDOM || {};
    r.Ea = !(!Element.prototype.attachShadow || !Node.prototype.getRootNode);
    var ka = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild");
    r.G = !!(ka && ka.configurable && ka.get);
    r.la = r.force || !r.Ea;

    function t(a) {
        return a.__shady && void 0 !== a.__shady.firstChild
    }

    function u(a) {
        return "ShadyRoot" === a.sa
    }

    function ma(a) {
        a = a.getRootNode();
        if (u(a)) return a
    }

    var v = Element.prototype,
        na = v.matches || v.matchesSelector || v.mozMatchesSelector || v.msMatchesSelector || v.oMatchesSelector || v.webkitMatchesSelector;

    function oa(a, b) {
        if (a && b) for (var c = Object.getOwnPropertyNames(b), d = 0, e; d < c.length && (e = c[d]); d++) {
            var f = Object.getOwnPropertyDescriptor(b, e);
            f && Object.defineProperty(a, e, f)
        }
    }

    function pa(a, b) {
        for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
        for (d = 0; d < c.length; d++) oa(a, c[d]);
        return a
    }

    function qa(a, b) {
        for (var c in b) a[c] = b[c]
    }

    var ra = document.createTextNode(""), sa = 0, ta = [];
    (new MutationObserver(function () {
        for (; ta.length;) try {
            ta.shift()()
        } catch (a) {
            throw ra.textContent = sa++, a;
        }
    })).observe(ra, {characterData: !0});

    function ua(a) {
        ta.push(a);
        ra.textContent = sa++
    }

    var va = !!document.contains;

    function wa(a, b) {
        for (; b;) {
            if (b == a) return !0;
            b = b.parentNode
        }
        return !1
    };var xa = [], ya;

    function za(a) {
        ya || (ya = !0, ua(Aa));
        xa.push(a)
    }

    function Aa() {
        ya = !1;
        for (var a = !!xa.length; xa.length;) xa.shift()();
        return a
    }

    Aa.list = xa;

    function Ba() {
        this.a = !1;
        this.addedNodes = [];
        this.removedNodes = [];
        this.N = new Set
    }

    function Ca(a) {
        a.a || (a.a = !0, ua(function () {
            Da(a)
        }))
    }

    function Da(a) {
        if (a.a) {
            a.a = !1;
            var b = a.takeRecords();
            b.length && a.N.forEach(function (a) {
                a(b)
            })
        }
    }

    Ba.prototype.takeRecords = function () {
        if (this.addedNodes.length || this.removedNodes.length) {
            var a = [{addedNodes: this.addedNodes, removedNodes: this.removedNodes}];
            this.addedNodes = [];
            this.removedNodes = [];
            return a
        }
        return []
    };

    function Ea(a, b) {
        a.__shady = a.__shady || {};
        a.__shady.H || (a.__shady.H = new Ba);
        a.__shady.H.N.add(b);
        var c = a.__shady.H;
        return {
            wa: b, w: c, ya: a, takeRecords: function () {
                return c.takeRecords()
            }
        }
    }

    function Fa(a) {
        var b = a && a.w;
        b && (b.N.delete(a.wa), b.N.size || (a.ya.__shady.H = null))
    }

    function Ga(a, b) {
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
    };var w = {}, Ha = Element.prototype.insertBefore, Ia = Element.prototype.removeChild,
        Ka = Element.prototype.setAttribute, La = Element.prototype.removeAttribute, Ma = Element.prototype.cloneNode,
        Na = Document.prototype.importNode, Oa = Element.prototype.addEventListener,
        Pa = Element.prototype.removeEventListener, Qa = Window.prototype.addEventListener,
        Ra = Window.prototype.removeEventListener, Sa = Element.prototype.dispatchEvent,
        Ta = Element.prototype.querySelector, Ua = Element.prototype.querySelectorAll, Va = Node.prototype.contains ||
            HTMLElement.prototype.contains;
    w.appendChild = Element.prototype.appendChild;
    w.insertBefore = Ha;
    w.removeChild = Ia;
    w.setAttribute = Ka;
    w.removeAttribute = La;
    w.cloneNode = Ma;
    w.importNode = Na;
    w.addEventListener = Oa;
    w.removeEventListener = Pa;
    w.Ta = Qa;
    w.Ua = Ra;
    w.dispatchEvent = Sa;
    w.querySelector = Ta;
    w.querySelectorAll = Ua;
    w.contains = Va;
    var Wa = /[&\u00A0"]/g, Xa = /[&\u00A0<>]/g;

    function Ya(a) {
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

    function Za(a) {
        for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0;
        return b
    }

    var $a = Za("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),
        ab = Za("style script xmp iframe noembed noframes plaintext noscript".split(" "));

    function bb(a, b) {
        "template" === a.localName && (a = a.content);
        for (var c = "", d = b ? b(a) : a.childNodes, e = 0, f = d.length, h; e < f && (h = d[e]); e++) {
            a:{
                var g = h;
                var k = a;
                var l = b;
                switch (g.nodeType) {
                    case Node.ELEMENT_NODE:
                        for (var m = g.localName, q = "<" + m, E = g.attributes, J = 0; k = E[J]; J++) q += " " + k.name + '="' + k.value.replace(Wa, Ya) + '"';
                        q += ">";
                        g = $a[m] ? q : q + bb(g, l) + "</" + m + ">";
                        break a;
                    case Node.TEXT_NODE:
                        g = g.data;
                        g = k && ab[k.localName] ? g : g.replace(Xa, Ya);
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
        A = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, !1);

    function cb(a) {
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
    x.childNodes = cb;
    x.parentElement = function (a) {
        A.currentNode = a;
        return A.parentNode()
    };
    x.firstElementChild = function (a) {
        A.currentNode = a;
        return A.firstChild()
    };
    x.lastElementChild = function (a) {
        A.currentNode = a;
        return A.lastChild()
    };
    x.previousElementSibling = function (a) {
        A.currentNode = a;
        return A.previousSibling()
    };
    x.nextElementSibling = function (a) {
        A.currentNode = a;
        return A.nextSibling()
    };
    x.children = function (a) {
        var b = [];
        A.currentNode = a;
        for (a = A.firstChild(); a;) b.push(a), a = A.nextSibling();
        return b
    };
    x.innerHTML = function (a) {
        return bb(a, function (a) {
            return cb(a)
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
    var db = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML") || Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML"),
        eb = document.implementation.createHTMLDocument("inert"),
        fb = Object.getOwnPropertyDescriptor(Document.prototype, "activeElement"), gb = {
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
        }, hb = {
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
                    return t(this) ? bb(a) : x.innerHTML(a)
                }, set: function (a) {
                    for (var b = "template" === this.localName ? this.content : this; b.firstChild;) b.removeChild(b.firstChild);
                    var c = this.localName;
                    c && "template" !== c || (c = "div");
                    c = eb.createElement(c);
                    for (db && db.set ? db.set.call(c, a) : c.innerHTML = a; c.firstChild;) b.appendChild(c.firstChild)
                }, configurable: !0
            }
        },
        ib = {
            shadowRoot: {
                get: function () {
                    return this.__shady && this.__shady.Ma || null
                }, configurable: !0
            }
        }, jb = {
            activeElement: {
                get: function () {
                    var a = fb && fb.get ? fb.get.call(document) : r.G ? void 0 : document.activeElement;
                    if (a && a.nodeType) {
                        var b = !!u(this);
                        if (this === document || b && this.host !== a && w.contains.call(this.host, a)) {
                            for (b = ma(a); b && b !== this;) a = b.host, b = ma(a);
                            a = this === document ? b ? null : a : b === this ? a : null
                        } else a = null
                    } else a = null;
                    return a
                }, set: function () {
                }, configurable: !0
            }
        };

    function B(a, b, c) {
        for (var d in b) {
            var e = Object.getOwnPropertyDescriptor(a, d);
            e && e.configurable || !e && c ? Object.defineProperty(a, d, b[d]) : c && console.warn("Could not define", d, "on", a)
        }
    }

    function C(a) {
        B(a, gb);
        B(a, hb);
        B(a, jb)
    }

    var kb = r.G ? function () {
    } : function (a) {
        a.__shady && a.__shady.ta || (a.__shady = a.__shady || {}, a.__shady.ta = !0, B(a, gb, !0))
    }, lb = r.G ? function () {
    } : function (a) {
        a.__shady && a.__shady.ra || (a.__shady = a.__shady || {}, a.__shady.ra = !0, B(a, hb, !0), B(a, ib, !0))
    };

    function mb(a, b, c) {
        kb(a);
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

    function nb(a) {
        if (!a.__shady || void 0 === a.__shady.firstChild) {
            a.__shady = a.__shady || {};
            a.__shady.firstChild = x.firstChild(a);
            a.__shady.lastChild = x.lastChild(a);
            lb(a);
            for (var b = a.__shady.childNodes = x.childNodes(a), c = 0, d; c < b.length && (d = b[c]); c++) d.__shady = d.__shady || {}, d.__shady.parentNode = a, d.__shady.nextSibling = b[c + 1] || null, d.__shady.previousSibling = b[c - 1] || null, kb(d)
        }
    };

    function ob(a, b, c) {
        if (b === a) throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");
        if (c) {
            var d = c.__shady && c.__shady.parentNode;
            if (void 0 !== d && d !== a || void 0 === d && x.parentNode(c) !== a) throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");
        }
        if (c === b) return b;
        b.parentNode && pb(b.parentNode, b);
        d = ma(a);
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
        (f = e) && d.C.push.apply(d.C, [].concat(f instanceof Array ? f : ja(ia(f))));
        d && ("slot" === a.localName || f) && D(d);
        if (t(a)) {
            d = c;
            lb(a);
            a.__shady = a.__shady || {};
            void 0 !== a.__shady.firstChild && (a.__shady.childNodes = null);
            if (b.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                f = b.childNodes;
                for (e = 0; e < f.length; e++) mb(f[e], a, d);
                b.__shady = b.__shady || {};
                d = void 0 !== b.__shady.firstChild ? null : void 0;
                b.__shady.firstChild = b.__shady.lastChild = d;
                b.__shady.childNodes = d
            } else mb(b, a, d);
            if (qb(a)) {
                D(a.__shady.root);
                var h = !0
            } else a.__shady.root && (h = !0)
        }
        h || (h = u(a) ? a.host : a, c ? (c = rb(c), w.insertBefore.call(h, b, c)) : w.appendChild.call(h, b));
        sb(a, b);
        return b
    }

    function pb(a, b) {
        if (b.parentNode !== a) throw Error("The node to be removed is not a child of this node: " + b);
        var c = ma(b);
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
            if (qb(a)) {
                D(a.__shady.root);
                var f = !0
            }
        }
        tb(b);
        if (c) {
            (d = a && "slot" === a.localName) && (f = !0);
            ub(c);
            e = c.i;
            for (var h in e) for (var g = e[h], k = 0; k < g.length; k++) {
                var l = g[k];
                if (wa(b, l)) {
                    g.splice(k, 1);
                    var m = c.m.indexOf(l);
                    0 <= m && c.m.splice(m, 1);
                    k--;
                    if (m = l.__shady.D) for (l = 0; l < m.length; l++) {
                        var q = m[l], E = x.parentNode(q);
                        E && w.removeChild.call(E, q)
                    }
                    m = !0
                }
            }
            (m || d) && D(c)
        }
        f || (f = u(a) ? a.host : a, (!a.__shady.root && "slot" !==
            b.localName || f === x.parentNode(b)) && w.removeChild.call(f, b));
        sb(a, null, b);
        return b
    }

    function tb(a) {
        if (a.__shady && void 0 !== a.__shady.da) for (var b = a.childNodes, c = 0, d = b.length, e; c < d && (e = b[c]); c++) tb(e);
        a.__shady && (a.__shady.da = void 0)
    }

    function rb(a) {
        var b = a;
        a && "slot" === a.localName && (b = (b = a.__shady && a.__shady.D) && b.length ? b[0] : rb(a.nextSibling));
        return b
    }

    function qb(a) {
        return (a = a && a.__shady && a.__shady.root) && vb(a)
    }

    function wb(a, b) {
        if ("slot" === b) a = a.parentNode, qb(a) && D(a.__shady.root); else if ("slot" === a.localName && "name" === b && (b = ma(a))) {
            var c = a.ua, d = xb(a);
            if (d !== c) {
                c = b.i[c];
                var e = c.indexOf(a);
                0 <= e && c.splice(e, 1);
                c = b.i[d] || (b.i[d] = []);
                c.push(a);
                1 < c.length && (b.i[d] = yb(c))
            }
            D(b)
        }
    }

    function sb(a, b, c) {
        if (a = a.__shady && a.__shady.H) b && a.addedNodes.push(b), c && a.removedNodes.push(c), Ca(a)
    }

    function zb(a) {
        if (a && a.nodeType) {
            a.__shady = a.__shady || {};
            var b = a.__shady.da;
            void 0 === b && (u(a) ? b = a : b = (b = a.parentNode) ? zb(b) : a, w.contains.call(document.documentElement, a) && (a.__shady.da = b));
            return b
        }
    }

    function Ab(a, b, c) {
        var d = [];
        Bb(a.childNodes, b, c, d);
        return d
    }

    function Bb(a, b, c, d) {
        for (var e = 0, f = a.length, h; e < f && (h = a[e]); e++) {
            var g;
            if (g = h.nodeType === Node.ELEMENT_NODE) {
                g = h;
                var k = b, l = c, m = d, q = k(g);
                q && m.push(g);
                l && l(q) ? g = q : (Bb(g.childNodes, k, l, m), g = void 0)
            }
            if (g) break
        }
    }

    var Cb = null;

    function Db(a, b, c) {
        Cb || (Cb = window.ShadyCSS && window.ShadyCSS.ScopingShim);
        Cb && "class" === b ? Cb.setElementClass(a, c) : (w.setAttribute.call(a, b, c), wb(a, b))
    }

    function Eb(a, b) {
        if (a.ownerDocument !== document) return w.importNode.call(document, a, b);
        var c = w.importNode.call(document, a, !1);
        if (b) {
            a = a.childNodes;
            b = 0;
            for (var d; b < a.length; b++) d = Eb(a[b], !0), c.appendChild(d)
        }
        return c
    };var Fb = "__eventWrappers" + Date.now(), Gb = {
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

    function Hb(a, b) {
        var c = [], d = a;
        for (a = a === window ? window : a.getRootNode(); d;) c.push(d), d = d.assignedSlot ? d.assignedSlot : d.nodeType === Node.DOCUMENT_FRAGMENT_NODE && d.host && (b || d !== a) ? d.host : d.parentNode;
        c[c.length - 1] === document && c.push(window);
        return c
    }

    function Ib(a, b) {
        if (!u) return a;
        a = Hb(a, !0);
        for (var c = 0, d, e, f, h; c < b.length; c++) if (d = b[c], f = d === window ? window : d.getRootNode(), f !== e && (h = a.indexOf(f), e = f), !u(f) || -1 < h) return d
    }

    var Jb = {
        get composed() {
            !1 !== this.isTrusted && void 0 === this.S && (this.S = Gb[this.type]);
            return this.S || !1
        }, composedPath: function () {
            this.ga || (this.ga = Hb(this.__target, this.composed));
            return this.ga
        }, get target() {
            return Ib(this.currentTarget, this.composedPath())
        }, get relatedTarget() {
            if (!this.U) return null;
            this.ha || (this.ha = Hb(this.U, !0));
            return Ib(this.currentTarget, this.ha)
        }, stopPropagation: function () {
            Event.prototype.stopPropagation.call(this);
            this.T = !0
        }, stopImmediatePropagation: function () {
            Event.prototype.stopImmediatePropagation.call(this);
            this.T = this.qa = !0
        }
    };

    function Lb(a) {
        function b(b, d) {
            b = new a(b, d);
            b.S = d && !!d.composed;
            return b
        }

        qa(b, a);
        b.prototype = a.prototype;
        return b
    }

    var Mb = {focus: !0, blur: !0};

    function Nb(a) {
        return a.__target !== a.target || a.U !== a.relatedTarget
    }

    function Ob(a, b, c) {
        if (c = b.__handlers && b.__handlers[a.type] && b.__handlers[a.type][c]) for (var d = 0, e; (e = c[d]) && (!Nb(a) || a.target !== a.relatedTarget) && (e.call(b, a), !a.qa); d++) ;
    }

    function Pb(a) {
        var b = a.composedPath();
        Object.defineProperty(a, "currentTarget", {
            get: function () {
                return d
            }, configurable: !0
        });
        for (var c = b.length - 1; 0 <= c; c--) {
            var d = b[c];
            Ob(a, d, "capture");
            if (a.T) return
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
            if (0 === c || f && f === e) if (Ob(a, d, "bubble"), d !== window && (e = d.getRootNode()), a.T) break
        }
    }

    function Qb(a, b, c, d, e, f) {
        for (var h = 0; h < a.length; h++) {
            var g = a[h], k = g.type, l = g.capture, m = g.once, q = g.passive;
            if (b === g.node && c === k && d === l && e === m && f === q) return h
        }
        return -1
    }

    function Rb(a, b, c) {
        if (b) {
            if (c && "object" === typeof c) {
                var d = !!c.capture;
                var e = !!c.once;
                var f = !!c.passive
            } else d = !!c, f = e = !1;
            var h = c && c.V || this, g = b[Fb];
            if (g) {
                if (-1 < Qb(g, h, a, d, e, f)) return
            } else b[Fb] = [];
            g = function (d) {
                e && this.removeEventListener(a, b, c);
                d.__target || Sb(d);
                if (h !== this) {
                    var f = Object.getOwnPropertyDescriptor(d, "currentTarget");
                    Object.defineProperty(d, "currentTarget", {
                        get: function () {
                            return h
                        }, configurable: !0
                    })
                }
                if (d.composed || -1 < d.composedPath().indexOf(h)) if (Nb(d) && d.target === d.relatedTarget) d.eventPhase ===
                Event.BUBBLING_PHASE && d.stopImmediatePropagation(); else if (d.eventPhase === Event.CAPTURING_PHASE || d.bubbles || d.target === h || h instanceof Window) {
                    var g = "object" === typeof b && b.handleEvent ? b.handleEvent(d) : b.call(h, d);
                    h !== this && (f ? (Object.defineProperty(d, "currentTarget", f), f = null) : delete d.currentTarget);
                    return g
                }
            };
            b[Fb].push({node: this, type: a, capture: d, once: e, passive: f, Va: g});
            Mb[a] ? (this.__handlers = this.__handlers || {}, this.__handlers[a] = this.__handlers[a] || {
                capture: [],
                bubble: []
            }, this.__handlers[a][d ?
                "capture" : "bubble"].push(g)) : (this instanceof Window ? w.Ta : w.addEventListener).call(this, a, g, c)
        }
    }

    function Tb(a, b, c) {
        if (b) {
            if (c && "object" === typeof c) {
                var d = !!c.capture;
                var e = !!c.once;
                var f = !!c.passive
            } else d = !!c, f = e = !1;
            var h = c && c.V || this, g = void 0;
            var k = null;
            try {
                k = b[Fb]
            } catch (l) {
            }
            k && (e = Qb(k, h, a, d, e, f), -1 < e && (g = k.splice(e, 1)[0].Va, k.length || (b[Fb] = void 0)));
            (this instanceof Window ? w.Ua : w.removeEventListener).call(this, a, g || b, c);
            g && Mb[a] && this.__handlers && this.__handlers[a] && (a = this.__handlers[a][d ? "capture" : "bubble"], g = a.indexOf(g), -1 < g && a.splice(g, 1))
        }
    }

    function Ub() {
        for (var a in Mb) window.addEventListener(a, function (a) {
            a.__target || (Sb(a), Pb(a))
        }, !0)
    }

    function Sb(a) {
        a.__target = a.target;
        a.U = a.relatedTarget;
        if (r.G) {
            var b = Object.getPrototypeOf(a);
            if (!b.hasOwnProperty("__patchProto")) {
                var c = Object.create(b);
                c.Xa = b;
                oa(c, Jb);
                b.__patchProto = c
            }
            a.__proto__ = b.__patchProto
        } else oa(a, Jb)
    }

    var Vb = Lb(window.Event), Wb = Lb(window.CustomEvent), Xb = Lb(window.MouseEvent);

    function Yb(a, b) {
        return {index: a, I: [], M: b}
    }

    function Zb(a, b, c, d) {
        var e = 0, f = 0, h = 0, g = 0, k = Math.min(b - e, d - f);
        if (0 == e && 0 == f) a:{
            for (h = 0; h < k; h++) if (a[h] !== c[h]) break a;
            h = k
        }
        if (b == a.length && d == c.length) {
            g = a.length;
            for (var l = c.length, m = 0; m < k - h && $b(a[--g], c[--l]);) m++;
            g = m
        }
        e += h;
        f += h;
        b -= g;
        d -= g;
        if (0 == b - e && 0 == d - f) return [];
        if (e == b) {
            for (b = Yb(e, 0); f < d;) b.I.push(c[f++]);
            return [b]
        }
        if (f == d) return [Yb(e, b - e)];
        k = e;
        h = f;
        d = d - h + 1;
        g = b - k + 1;
        b = Array(d);
        for (l = 0; l < d; l++) b[l] = Array(g), b[l][0] = l;
        for (l = 0; l < g; l++) b[0][l] = l;
        for (l = 1; l < d; l++) for (m = 1; m < g; m++) if (a[k + m - 1] === c[h + l - 1]) b[l][m] =
            b[l - 1][m - 1]; else {
            var q = b[l - 1][m] + 1, E = b[l][m - 1] + 1;
            b[l][m] = q < E ? q : E
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
                b || (b = Yb(e, 0));
                b.M++;
                e++;
                b.I.push(c[f]);
                f++;
                break;
            case 2:
                b || (b = Yb(e, 0));
                b.M++;
                e++;
                break;
            case 3:
                b || (b = Yb(e, 0)), b.I.push(c[f]), f++
        }
        b && k.push(b);
        return k
    }

    function $b(a, b) {
        return a === b
    };var ac = {};

    function F(a, b, c) {
        if (a !== ac) throw new TypeError("Illegal constructor");
        a = document.createDocumentFragment();
        a.__proto__ = F.prototype;
        a.sa = "ShadyRoot";
        nb(b);
        nb(a);
        a.host = b;
        a.a = c && c.mode;
        b.__shady = b.__shady || {};
        b.__shady.root = a;
        b.__shady.Ma = "closed" !== a.a ? a : null;
        a.L = !1;
        a.m = [];
        a.i = {};
        a.C = [];
        c = x.childNodes(b);
        for (var d = 0, e = c.length; d < e; d++) w.removeChild.call(b, c[d]);
        return a
    }

    F.prototype = Object.create(DocumentFragment.prototype);

    function D(a) {
        a.L || (a.L = !0, za(function () {
            return bc(a)
        }))
    }

    function bc(a) {
        for (var b; a;) {
            a.L && (b = a);
            a:{
                var c = a;
                a = c.host.getRootNode();
                if (u(a)) for (var d = c.host.childNodes, e = 0; e < d.length; e++) if (c = d[e], "slot" == c.localName) break a;
                a = void 0
            }
        }
        b && b._renderRoot()
    }

    F.prototype._renderRoot = function () {
        this.L = !1;
        ub(this);
        for (var a = 0, b; a < this.m.length; a++) {
            b = this.m[a];
            var c = b.__shady.assignedNodes;
            b.__shady.assignedNodes = [];
            b.__shady.D = [];
            if (b.__shady.ia = c) for (var d = 0; d < c.length; d++) {
                var e = c[d];
                e.__shady.$ = e.__shady.assignedSlot;
                e.__shady.assignedSlot === b && (e.__shady.assignedSlot = null)
            }
        }
        for (b = this.host.firstChild; b; b = b.nextSibling) cc(this, b);
        for (a = 0; a < this.m.length; a++) {
            b = this.m[a];
            if (!b.__shady.assignedNodes.length) for (c = b.firstChild; c; c = c.nextSibling) cc(this,
                c, b);
            c = b.parentNode;
            (c = c.__shady && c.__shady.root) && vb(c) && c._renderRoot();
            dc(this, b.__shady.D, b.__shady.assignedNodes);
            if (c = b.__shady.ia) {
                for (d = 0; d < c.length; d++) c[d].__shady.$ = null;
                b.__shady.ia = null;
                c.length > b.__shady.assignedNodes.length && (b.__shady.ba = !0)
            }
            b.__shady.ba && (b.__shady.ba = !1, ec(this, b))
        }
        a = this.m;
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
            h = Zb(e, e.length, f, f.length);
            for (var k = g = 0; g < h.length && (c = h[g]); g++) {
                for (var l = 0, m; l < c.I.length && (m = c.I[l]); l++) x.parentNode(m) === d && w.removeChild.call(d, m), f.splice(c.index + k, 1);
                k -= c.M
            }
            for (k = 0; k < h.length && (c = h[k]); k++) for (g = f[c.index], l = c.index; l < c.index + c.M; l++) m = e[l], w.insertBefore.call(d, m, g), f.splice(l, 0, m)
        }
    };

    function cc(a, b, c) {
        b.__shady = b.__shady || {};
        var d = b.__shady.$;
        b.__shady.$ = null;
        c || (c = (a = a.i[b.slot || "__catchall"]) && a[0]);
        c ? (c.__shady.assignedNodes.push(b), b.__shady.assignedSlot = c) : b.__shady.assignedSlot = void 0;
        d !== b.__shady.assignedSlot && b.__shady.assignedSlot && (b.__shady.assignedSlot.__shady.ba = !0)
    }

    function dc(a, b, c) {
        for (var d = 0, e; d < c.length && (e = c[d]); d++) if ("slot" == e.localName) {
            var f = e.__shady.assignedNodes;
            f && f.length && dc(a, b, f)
        } else b.push(c[d])
    }

    function ec(a, b) {
        w.dispatchEvent.call(b, new Event("slotchange"));
        b.__shady.assignedSlot && ec(a, b.__shady.assignedSlot)
    }

    function ub(a) {
        if (a.C.length) {
            for (var b = a.C, c, d = 0; d < b.length; d++) {
                var e = b[d];
                e.__shady = e.__shady || {};
                nb(e);
                nb(e.parentNode);
                var f = xb(e);
                a.i[f] ? (c = c || {}, c[f] = !0, a.i[f].push(e)) : a.i[f] = [e];
                a.m.push(e)
            }
            if (c) for (var h in c) a.i[h] = yb(a.i[h]);
            a.C = []
        }
    }

    function xb(a) {
        var b = a.name || a.getAttribute("name") || "__catchall";
        return a.ua = b
    }

    function yb(a) {
        return a.sort(function (a, c) {
            a = fc(a);
            for (var b = fc(c), e = 0; e < a.length; e++) {
                c = a[e];
                var f = b[e];
                if (c !== f) return a = Array.from(c.parentNode.childNodes), a.indexOf(c) - a.indexOf(f)
            }
        })
    }

    function fc(a) {
        var b = [];
        do b.unshift(a); while (a = a.parentNode);
        return b
    }

    function vb(a) {
        ub(a);
        return !!a.m.length
    }

    F.prototype.addEventListener = function (a, b, c) {
        "object" !== typeof c && (c = {capture: !!c});
        c.V = this;
        this.host.addEventListener(a, b, c)
    };
    F.prototype.removeEventListener = function (a, b, c) {
        "object" !== typeof c && (c = {capture: !!c});
        c.V = this;
        this.host.removeEventListener(a, b, c)
    };
    F.prototype.getElementById = function (a) {
        return Ab(this, function (b) {
            return b.id == a
        }, function (a) {
            return !!a
        })[0] || null
    };
    var gc = F.prototype;
    B(gc, hb, !0);
    B(gc, jb, !0);

    function hc(a) {
        var b = a.getRootNode();
        u(b) && bc(b);
        return a.__shady && a.__shady.assignedSlot || null
    }

    var ic = {addEventListener: Rb.bind(window), removeEventListener: Tb.bind(window)}, jc = {
        addEventListener: Rb, removeEventListener: Tb, appendChild: function (a) {
            return ob(this, a)
        }, insertBefore: function (a, b) {
            return ob(this, a, b)
        }, removeChild: function (a) {
            return pb(this, a)
        }, replaceChild: function (a, b) {
            ob(this, a, b);
            pb(this, b);
            return a
        }, cloneNode: function (a) {
            if ("template" == this.localName) var b = w.cloneNode.call(this, a); else if (b = w.cloneNode.call(this, !1), a) {
                a = this.childNodes;
                for (var c = 0, d; c < a.length; c++) d = a[c].cloneNode(!0),
                    b.appendChild(d)
            }
            return b
        }, getRootNode: function () {
            return zb(this)
        }, contains: function (a) {
            return wa(this, a)
        }, get isConnected() {
            var a = this.ownerDocument;
            if (va && w.contains.call(a, this) || a.documentElement && w.contains.call(a.documentElement, this)) return !0;
            for (a = this; a && !(a instanceof Document);) a = a.parentNode || (a instanceof F ? a.host : void 0);
            return !!(a && a instanceof Document)
        }, dispatchEvent: function (a) {
            Aa();
            return w.dispatchEvent.call(this, a)
        }
    }, kc = {
        get assignedSlot() {
            return hc(this)
        }
    }, lc = {
        querySelector: function (a) {
            return Ab(this,
                function (b) {
                    return na.call(b, a)
                }, function (a) {
                    return !!a
                })[0] || null
        }, querySelectorAll: function (a) {
            return Ab(this, function (b) {
                return na.call(b, a)
            })
        }
    }, mc = {
        assignedNodes: function (a) {
            if ("slot" === this.localName) {
                var b = this.getRootNode();
                u(b) && bc(b);
                return this.__shady ? (a && a.flatten ? this.__shady.D : this.__shady.assignedNodes) || [] : []
            }
        }
    }, nc = pa({
        setAttribute: function (a, b) {
            Db(this, a, b)
        }, removeAttribute: function (a) {
            w.removeAttribute.call(this, a);
            wb(this, a)
        }, attachShadow: function (a) {
            if (!this) throw"Must provide a host.";
            if (!a) throw"Not enough arguments.";
            return new F(ac, this, a)
        }, get slot() {
            return this.getAttribute("slot")
        }, set slot(a) {
            Db(this, "slot", a)
        }, get assignedSlot() {
            return hc(this)
        }
    }, lc, mc);
    Object.defineProperties(nc, ib);
    var oc = pa({
        importNode: function (a, b) {
            return Eb(a, b)
        }, getElementById: function (a) {
            return Ab(this, function (b) {
                return b.id == a
            }, function (a) {
                return !!a
            })[0] || null
        }
    }, lc);
    Object.defineProperties(oc, {_activeElement: jb.activeElement});
    var pc = HTMLElement.prototype.blur, qc = pa({
        blur: function () {
            var a = this.__shady && this.__shady.root;
            (a = a && a.activeElement) ? a.blur() : pc.call(this)
        }
    });

    function G(a, b) {
        for (var c = Object.getOwnPropertyNames(b), d = 0; d < c.length; d++) {
            var e = c[d], f = Object.getOwnPropertyDescriptor(b, e);
            f.value ? a[e] = f.value : Object.defineProperty(a, e, f)
        }
    };
    if (r.la) {
        var ShadyDOM = {
            inUse: r.la,
            patch: function (a) {
                return a
            },
            isShadyRoot: u,
            enqueue: za,
            flush: Aa,
            settings: r,
            filterMutations: Ga,
            observeChildren: Ea,
            unobserveChildren: Fa,
            nativeMethods: w,
            nativeTree: x
        };
        window.ShadyDOM = ShadyDOM;
        window.Event = Vb;
        window.CustomEvent = Wb;
        window.MouseEvent = Xb;
        Ub();
        var rc = window.customElements && window.customElements.nativeHTMLElement || HTMLElement;
        G(window.Node.prototype, jc);
        G(window.Window.prototype, ic);
        G(window.Text.prototype, kc);
        G(window.DocumentFragment.prototype, lc);
        G(window.Element.prototype,
            nc);
        G(window.Document.prototype, oc);
        window.HTMLSlotElement && G(window.HTMLSlotElement.prototype, mc);
        G(rc.prototype, qc);
        r.G && (C(window.Node.prototype), C(window.Text.prototype), C(window.DocumentFragment.prototype), C(window.Element.prototype), C(rc.prototype), C(window.Document.prototype), window.HTMLSlotElement && C(window.HTMLSlotElement.prototype));
        window.ShadowRoot = F
    }
    ;var sc = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));

    function tc(a) {
        var b = sc.has(a);
        a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);
        return !b && a
    }

    function H(a) {
        var b = a.isConnected;
        if (void 0 !== b) return b;
        for (; a && !(a.__CE_isImportDocument || a instanceof Document);) a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
        return !(!a || !(a.__CE_isImportDocument || a instanceof Document))
    }

    function uc(a, b) {
        for (; b && b !== a && !b.nextSibling;) b = b.parentNode;
        return b && b !== a ? b.nextSibling : null
    }

    function I(a, b, c) {
        c = void 0 === c ? new Set : c;
        for (var d = a; d;) {
            if (d.nodeType === Node.ELEMENT_NODE) {
                var e = d;
                b(e);
                var f = e.localName;
                if ("link" === f && "import" === e.getAttribute("rel")) {
                    d = e.import;
                    if (d instanceof Node && !c.has(d)) for (c.add(d), d = d.firstChild; d; d = d.nextSibling) I(d, b, c);
                    d = uc(a, e);
                    continue
                } else if ("template" === f) {
                    d = uc(a, e);
                    continue
                }
                if (e = e.__CE_shadowRoot) for (e = e.firstChild; e; e = e.nextSibling) I(e, b, c)
            }
            d = d.firstChild ? d.firstChild : uc(a, d)
        }
    }

    function K(a, b, c) {
        a[b] = c
    };

    function vc() {
        this.a = new Map;
        this.l = new Map;
        this.f = [];
        this.c = !1
    }

    function wc(a, b, c) {
        a.a.set(b, c);
        a.l.set(c.constructor, c)
    }

    function xc(a, b) {
        a.c = !0;
        a.f.push(b)
    }

    function yc(a, b) {
        a.c && I(b, function (b) {
            return a.b(b)
        })
    }

    vc.prototype.b = function (a) {
        if (this.c && !a.__CE_patched) {
            a.__CE_patched = !0;
            for (var b = 0; b < this.f.length; b++) this.f[b](a)
        }
    };

    function L(a, b) {
        var c = [];
        I(b, function (a) {
            return c.push(a)
        });
        for (b = 0; b < c.length; b++) {
            var d = c[b];
            1 === d.__CE_state ? a.connectedCallback(d) : zc(a, d)
        }
    }

    function M(a, b) {
        var c = [];
        I(b, function (a) {
            return c.push(a)
        });
        for (b = 0; b < c.length; b++) {
            var d = c[b];
            1 === d.__CE_state && a.disconnectedCallback(d)
        }
    }

    function N(a, b, c) {
        c = void 0 === c ? {} : c;
        var d = c.Sa || new Set, e = c.oa || function (b) {
            return zc(a, b)
        }, f = [];
        I(b, function (b) {
            if ("link" === b.localName && "import" === b.getAttribute("rel")) {
                var c = b.import;
                c instanceof Node && (c.__CE_isImportDocument = !0, c.__CE_hasRegistry = !0);
                c && "complete" === c.readyState ? c.__CE_documentLoadHandled = !0 : b.addEventListener("load", function () {
                    var c = b.import;
                    if (!c.__CE_documentLoadHandled) {
                        c.__CE_documentLoadHandled = !0;
                        var f = new Set(d);
                        f.delete(c);
                        N(a, c, {Sa: f, oa: e})
                    }
                })
            } else f.push(b)
        }, d);
        if (a.c) for (b =
                          0; b < f.length; b++) a.b(f[b]);
        for (b = 0; b < f.length; b++) e(f[b])
    }

    function zc(a, b) {
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
                H(b) && a.connectedCallback(b)
            }
        }
    }

    vc.prototype.connectedCallback = function (a) {
        var b = a.__CE_definition;
        b.connectedCallback && b.connectedCallback.call(a)
    };
    vc.prototype.disconnectedCallback = function (a) {
        var b = a.__CE_definition;
        b.disconnectedCallback && b.disconnectedCallback.call(a)
    };
    vc.prototype.attributeChangedCallback = function (a, b, c, d, e) {
        var f = a.__CE_definition;
        f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(b) && f.attributeChangedCallback.call(a, b, c, d, e)
    };

    function Ac(a) {
        var b = document;
        this.h = a;
        this.a = b;
        this.w = void 0;
        N(this.h, this.a);
        "loading" === this.a.readyState && (this.w = new MutationObserver(this.b.bind(this)), this.w.observe(this.a, {
            childList: !0,
            subtree: !0
        }))
    }

    function Bc(a) {
        a.w && a.w.disconnect()
    }

    Ac.prototype.b = function (a) {
        var b = this.a.readyState;
        "interactive" !== b && "complete" !== b || Bc(this);
        for (b = 0; b < a.length; b++) for (var c = a[b].addedNodes, d = 0; d < c.length; d++) N(this.h, c[d])
    };

    function Cc() {
        var a = this;
        this.b = this.a = void 0;
        this.c = new Promise(function (b) {
            a.b = b;
            a.a && b(a.a)
        })
    }

    function Dc(a) {
        if (a.a) throw Error("Already resolved.");
        a.a = void 0;
        a.b && a.b(void 0)
    };

    function O(a) {
        this.X = !1;
        this.h = a;
        this.aa = new Map;
        this.Y = function (a) {
            return a()
        };
        this.K = !1;
        this.Z = [];
        this.xa = new Ac(a)
    }

    O.prototype.define = function (a, b) {
        var c = this;
        if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
        if (!tc(a)) throw new SyntaxError("The element name '" + a + "' is not valid.");
        if (this.h.a.get(a)) throw Error("A custom element with name '" + a + "' has already been defined.");
        if (this.X) throw Error("A custom element is already being defined.");
        this.X = !0;
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
            this.X = !1
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
        wc(this.h, a, b);
        this.Z.push(b);
        this.K || (this.K = !0, this.Y(function () {
            return Ec(c)
        }))
    };

    function Ec(a) {
        if (!1 !== a.K) {
            a.K = !1;
            for (var b = a.Z, c = [], d = new Map, e = 0; e < b.length; e++) d.set(b[e].localName, []);
            N(a.h, document, {
                oa: function (b) {
                    if (void 0 === b.__CE_state) {
                        var e = b.localName, f = d.get(e);
                        f ? f.push(b) : a.h.a.get(e) && c.push(b)
                    }
                }
            });
            for (e = 0; e < c.length; e++) zc(a.h, c[e]);
            for (; 0 < b.length;) {
                var f = b.shift();
                e = f.localName;
                f = d.get(f.localName);
                for (var h = 0; h < f.length; h++) zc(a.h, f[h]);
                (e = a.aa.get(e)) && Dc(e)
            }
        }
    }

    O.prototype.get = function (a) {
        if (a = this.h.a.get(a)) return a.constructor
    };
    O.prototype.whenDefined = function (a) {
        if (!tc(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));
        var b = this.aa.get(a);
        if (b) return b.c;
        b = new Cc;
        this.aa.set(a, b);
        this.h.a.get(a) && !this.Z.some(function (b) {
            return b.localName === a
        }) && Dc(b);
        return b.c
    };
    O.prototype.La = function (a) {
        Bc(this.xa);
        var b = this.Y;
        this.Y = function (c) {
            return a(function () {
                return b(c)
            })
        }
    };
    window.CustomElementRegistry = O;
    O.prototype.define = O.prototype.define;
    O.prototype.get = O.prototype.get;
    O.prototype.whenDefined = O.prototype.whenDefined;
    O.prototype.polyfillWrapFlushCallback = O.prototype.La;
    var Fc = window.Document.prototype.createElement, Gc = window.Document.prototype.createElementNS,
        Hc = window.Document.prototype.importNode, Ic = window.Document.prototype.prepend,
        Jc = window.Document.prototype.append, Kc = window.DocumentFragment.prototype.prepend,
        Lc = window.DocumentFragment.prototype.append, Mc = window.Node.prototype.cloneNode,
        Nc = window.Node.prototype.appendChild, Oc = window.Node.prototype.insertBefore,
        Pc = window.Node.prototype.removeChild, Qc = window.Node.prototype.replaceChild,
        Rc = Object.getOwnPropertyDescriptor(window.Node.prototype,
            "textContent"), Sc = window.Element.prototype.attachShadow,
        Tc = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
        Uc = window.Element.prototype.getAttribute, Vc = window.Element.prototype.setAttribute,
        Wc = window.Element.prototype.removeAttribute, Xc = window.Element.prototype.getAttributeNS,
        Yc = window.Element.prototype.setAttributeNS, Zc = window.Element.prototype.removeAttributeNS,
        $c = window.Element.prototype.insertAdjacentElement, ad = window.Element.prototype.prepend,
        bd = window.Element.prototype.append,
        cd = window.Element.prototype.before, dd = window.Element.prototype.after,
        ed = window.Element.prototype.replaceWith, fd = window.Element.prototype.remove, gd = window.HTMLElement,
        hd = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
        id = window.HTMLElement.prototype.insertAdjacentElement;
    var jd = new function () {
    };

    function kd() {
        var a = P;
        window.HTMLElement = function () {
            function b() {
                var b = this.constructor, d = a.l.get(b);
                if (!d) throw Error("The custom element being constructed was not registered with `customElements`.");
                var e = d.constructionStack;
                if (0 === e.length) return e = Fc.call(document, d.localName), Object.setPrototypeOf(e, b.prototype), e.__CE_state = 1, e.__CE_definition = d, a.b(e), e;
                d = e.length - 1;
                var f = e[d];
                if (f === jd) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
                e[d] = jd;
                Object.setPrototypeOf(f, b.prototype);
                a.b(f);
                return f
            }

            b.prototype = gd.prototype;
            return b
        }()
    };

    function ld(a, b, c) {
        function d(b) {
            return function (c) {
                for (var d = [], e = 0; e < arguments.length; ++e) d[e - 0] = arguments[e];
                e = [];
                for (var f = [], l = 0; l < d.length; l++) {
                    var m = d[l];
                    m instanceof Element && H(m) && f.push(m);
                    if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) e.push(m); else e.push(m)
                }
                b.apply(this, d);
                for (d = 0; d < f.length; d++) M(a, f[d]);
                if (H(this)) for (d = 0; d < e.length; d++) f = e[d], f instanceof Element && L(a, f)
            }
        }

        void 0 !== c.P && (b.prepend = d(c.P));
        void 0 !== c.append && (b.append = d(c.append))
    };

    function md() {
        var a = P;
        K(Document.prototype, "createElement", function (b) {
            if (this.__CE_hasRegistry) {
                var c = a.a.get(b);
                if (c) return new c.constructor
            }
            b = Fc.call(this, b);
            a.b(b);
            return b
        });
        K(Document.prototype, "importNode", function (b, c) {
            b = Hc.call(this, b, c);
            this.__CE_hasRegistry ? N(a, b) : yc(a, b);
            return b
        });
        K(Document.prototype, "createElementNS", function (b, c) {
            if (this.__CE_hasRegistry && (null === b || "http://www.w3.org/1999/xhtml" === b)) {
                var d = a.a.get(c);
                if (d) return new d.constructor
            }
            b = Gc.call(this, b, c);
            a.b(b);
            return b
        });
        ld(a, Document.prototype, {P: Ic, append: Jc})
    };

    function nd() {
        var a = P;

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
                            if (0 < g && H(this)) {
                                c = Array(g);
                                for (var k = 0; k < g; k++) c[k] = e[k]
                            }
                        }
                        d.set.call(this, b);
                        if (c) for (b = 0; b < c.length; b++) M(a, c[b])
                    }
                }
            })
        }

        K(Node.prototype, "insertBefore", function (b, d) {
            if (b instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(b.childNodes);
                b = Oc.call(this, b, d);
                if (H(this)) for (d = 0; d < c.length; d++) L(a, c[d]);
                return b
            }
            c = H(b);
            d = Oc.call(this, b, d);
            c && M(a, b);
            H(this) && L(a, b);
            return d
        });
        K(Node.prototype, "appendChild", function (b) {
            if (b instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(b.childNodes);
                b = Nc.call(this, b);
                if (H(this)) for (var e = 0; e < c.length; e++) L(a, c[e]);
                return b
            }
            c = H(b);
            e = Nc.call(this, b);
            c && M(a, b);
            H(this) && L(a, b);
            return e
        });
        K(Node.prototype, "cloneNode", function (b) {
            b = Mc.call(this, b);
            this.ownerDocument.__CE_hasRegistry ? N(a, b) :
                yc(a, b);
            return b
        });
        K(Node.prototype, "removeChild", function (b) {
            var c = H(b), e = Pc.call(this, b);
            c && M(a, b);
            return e
        });
        K(Node.prototype, "replaceChild", function (b, d) {
            if (b instanceof DocumentFragment) {
                var c = Array.prototype.slice.apply(b.childNodes);
                b = Qc.call(this, b, d);
                if (H(this)) for (M(a, d), d = 0; d < c.length; d++) L(a, c[d]);
                return b
            }
            c = H(b);
            var f = Qc.call(this, b, d), h = H(this);
            h && M(a, d);
            c && M(a, b);
            h && L(a, b);
            return f
        });
        Rc && Rc.get ? b(Node.prototype, Rc) : xc(a, function (a) {
            b(a, {
                enumerable: !0, configurable: !0, get: function () {
                    for (var a =
                        [], b = 0; b < this.childNodes.length; b++) a.push(this.childNodes[b].textContent);
                    return a.join("")
                }, set: function (a) {
                    for (; this.firstChild;) Pc.call(this, this.firstChild);
                    Nc.call(this, document.createTextNode(a))
                }
            })
        })
    };

    function od(a) {
        var b = Element.prototype;

        function c(b) {
            return function (c) {
                for (var d = [], e = 0; e < arguments.length; ++e) d[e - 0] = arguments[e];
                e = [];
                for (var g = [], k = 0; k < d.length; k++) {
                    var l = d[k];
                    l instanceof Element && H(l) && g.push(l);
                    if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) e.push(l); else e.push(l)
                }
                b.apply(this, d);
                for (d = 0; d < g.length; d++) M(a, g[d]);
                if (H(this)) for (d = 0; d < e.length; d++) g = e[d], g instanceof Element && L(a, g)
            }
        }

        void 0 !== cd && (b.before = c(cd));
        void 0 !== cd && (b.after = c(dd));
        void 0 !==
        ed && K(b, "replaceWith", function (b) {
            for (var c = [], d = 0; d < arguments.length; ++d) c[d - 0] = arguments[d];
            d = [];
            for (var h = [], g = 0; g < c.length; g++) {
                var k = c[g];
                k instanceof Element && H(k) && h.push(k);
                if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) d.push(k); else d.push(k)
            }
            g = H(this);
            ed.apply(this, c);
            for (c = 0; c < h.length; c++) M(a, h[c]);
            if (g) for (M(a, this), c = 0; c < d.length; c++) h = d[c], h instanceof Element && L(a, h)
        });
        void 0 !== fd && K(b, "remove", function () {
            var b = H(this);
            fd.call(this);
            b && M(a, this)
        })
    };

    function pd() {
        var a = P;

        function b(b, c) {
            Object.defineProperty(b, "innerHTML", {
                enumerable: c.enumerable,
                configurable: !0,
                get: c.get,
                set: function (b) {
                    var d = this, e = void 0;
                    H(this) && (e = [], I(this, function (a) {
                        a !== d && e.push(a)
                    }));
                    c.set.call(this, b);
                    if (e) for (var f = 0; f < e.length; f++) {
                        var l = e[f];
                        1 === l.__CE_state && a.disconnectedCallback(l)
                    }
                    this.ownerDocument.__CE_hasRegistry ? N(a, this) : yc(a, this);
                    return b
                }
            })
        }

        function c(b, c) {
            K(b, "insertAdjacentElement", function (b, d) {
                var e = H(d);
                b = c.call(this, b, d);
                e && M(a, d);
                H(b) && L(a, d);
                return b
            })
        }

        Sc && K(Element.prototype, "attachShadow", function (a) {
            return this.__CE_shadowRoot = a = Sc.call(this, a)
        });
        Tc && Tc.get ? b(Element.prototype, Tc) : hd && hd.get ? b(HTMLElement.prototype, hd) : xc(a, function (a) {
            b(a, {
                enumerable: !0, configurable: !0, get: function () {
                    return Mc.call(this, !0).innerHTML
                }, set: function (a) {
                    var b = "template" === this.localName, c = b ? this.content : this,
                        d = Fc.call(document, this.localName);
                    for (d.innerHTML = a; 0 < c.childNodes.length;) Pc.call(c, c.childNodes[0]);
                    for (a = b ? d.content : d; 0 < a.childNodes.length;) Nc.call(c,
                        a.childNodes[0])
                }
            })
        });
        K(Element.prototype, "setAttribute", function (b, c) {
            if (1 !== this.__CE_state) return Vc.call(this, b, c);
            var d = Uc.call(this, b);
            Vc.call(this, b, c);
            c = Uc.call(this, b);
            a.attributeChangedCallback(this, b, d, c, null)
        });
        K(Element.prototype, "setAttributeNS", function (b, c, f) {
            if (1 !== this.__CE_state) return Yc.call(this, b, c, f);
            var d = Xc.call(this, b, c);
            Yc.call(this, b, c, f);
            f = Xc.call(this, b, c);
            a.attributeChangedCallback(this, c, d, f, b)
        });
        K(Element.prototype, "removeAttribute", function (b) {
            if (1 !== this.__CE_state) return Wc.call(this,
                b);
            var c = Uc.call(this, b);
            Wc.call(this, b);
            null !== c && a.attributeChangedCallback(this, b, c, null, null)
        });
        K(Element.prototype, "removeAttributeNS", function (b, c) {
            if (1 !== this.__CE_state) return Zc.call(this, b, c);
            var d = Xc.call(this, b, c);
            Zc.call(this, b, c);
            var e = Xc.call(this, b, c);
            d !== e && a.attributeChangedCallback(this, c, d, e, b)
        });
        id ? c(HTMLElement.prototype, id) : $c ? c(Element.prototype, $c) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");
        ld(a, Element.prototype, {P: ad, append: bd});
        od(a)
    }
    ;var qd = window.customElements;
    if (!qd || qd.forcePolyfill || "function" != typeof qd.define || "function" != typeof qd.get) {
        var P = new vc;
        kd();
        md();
        ld(P, DocumentFragment.prototype, {P: Kc, append: Lc});
        nd();
        pd();
        document.__CE_hasRegistry = !0;
        var customElements = new O(P);
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
    function rd() {
        this.end = this.start = 0;
        this.rules = this.parent = this.previous = null;
        this.cssText = this.parsedCssText = "";
        this.atRule = !1;
        this.type = 0;
        this.parsedSelector = this.selector = this.keyframesName = ""
    }

    function sd(a) {
        a = a.replace(td, "").replace(ud, "");
        var b = vd, c = a, d = new rd;
        d.start = 0;
        d.end = c.length;
        for (var e = d, f = 0, h = c.length; f < h; f++) if ("{" === c[f]) {
            e.rules || (e.rules = []);
            var g = e, k = g.rules[g.rules.length - 1] || null;
            e = new rd;
            e.start = f + 1;
            e.parent = g;
            e.previous = k;
            g.rules.push(e)
        } else "}" === c[f] && (e.end = f + 1, e = e.parent || d);
        return b(d, a)
    }

    function vd(a, b) {
        var c = b.substring(a.start, a.end - 1);
        a.parsedCssText = a.cssText = c.trim();
        a.parent && (c = b.substring(a.previous ? a.previous.end : a.parent.start, a.start - 1), c = wd(c), c = c.replace(xd, " "), c = c.substring(c.lastIndexOf(";") + 1), c = a.parsedSelector = a.selector = c.trim(), a.atRule = 0 === c.indexOf("@"), a.atRule ? 0 === c.indexOf("@media") ? a.type = yd : c.match(zd) && (a.type = Ad, a.keyframesName = a.selector.split(xd).pop()) : a.type = 0 === c.indexOf("--") ? Bd : Cd);
        if (c = a.rules) for (var d = 0, e = c.length, f; d < e && (f = c[d]); d++) vd(f,
            b);
        return a
    }

    function wd(a) {
        return a.replace(/\\([0-9a-f]{1,6})\s/gi, function (a, c) {
            a = c;
            for (c = 6 - a.length; c--;) a = "0" + a;
            return "\\" + a
        })
    }

    function Dd(a, b, c) {
        c = void 0 === c ? "" : c;
        var d = "";
        if (a.cssText || a.rules) {
            var e = a.rules, f;
            if (f = e) f = e[0], f = !(f && f.selector && 0 === f.selector.indexOf("--"));
            if (f) {
                f = 0;
                for (var h = e.length, g; f < h && (g = e[f]); f++) d = Dd(g, b, d)
            } else b ? b = a.cssText : (b = a.cssText, b = b.replace(Ed, "").replace(Fd, ""), b = b.replace(Gd, "").replace(Hd, "")), (d = b.trim()) && (d = "  " + d + "\n")
        }
        d && (a.selector && (c += a.selector + " {\n"), c += d, a.selector && (c += "}\n\n"));
        return c
    }

    var Cd = 1, Ad = 7, yd = 4, Bd = 1E3, td = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim, ud = /@import[^;]*;/gim,
        Ed = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
        Fd = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
        Gd = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim, Hd = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
        zd = /^@[^\s]*keyframes/, xd = /\s+/g;
    var Q = !(window.ShadyDOM && window.ShadyDOM.inUse), Id;

    function Jd(a) {
        Id = a && a.shimcssproperties ? !1 : Q || !(navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) || !window.CSS || !CSS.supports || !CSS.supports("box-shadow", "0 0 0 var(--foo)"))
    }

    window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss ? Id = window.ShadyCSS.nativeCss : window.ShadyCSS ? (Jd(window.ShadyCSS), window.ShadyCSS = void 0) : Jd(window.WebComponents && window.WebComponents.flags);
    var R = Id;
    var Kd = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
        Md = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi, Nd = /(--[\w-]+)\s*([:,;)]|$)/gi,
        Od = /(animation\s*:)|(animation-name\s*:)/, Pd = /@media\s(.*)/, Qd = /\{[^}]*\}/g;
    var Rd = new Set;

    function S(a, b) {
        if (!a) return "";
        "string" === typeof a && (a = sd(a));
        b && T(a, b);
        return Dd(a, R)
    }

    function Sd(a) {
        !a.__cssRules && a.textContent && (a.__cssRules = sd(a.textContent));
        return a.__cssRules || null
    }

    function Td(a) {
        return !!a.parent && a.parent.type === Ad
    }

    function T(a, b, c, d) {
        if (a) {
            var e = !1, f = a.type;
            if (d && f === yd) {
                var h = a.selector.match(Pd);
                h && (window.matchMedia(h[1]).matches || (e = !0))
            }
            f === Cd ? b(a) : c && f === Ad ? c(a) : f === Bd && (e = !0);
            if ((a = a.rules) && !e) {
                e = 0;
                f = a.length;
                for (var g; e < f && (g = a[e]); e++) T(g, b, c, d)
            }
        }
    }

    function Ud(a, b, c, d) {
        var e = document.createElement("style");
        b && e.setAttribute("scope", b);
        e.textContent = a;
        Vd(e, c, d);
        return e
    }

    var U = null;

    function Vd(a, b, c) {
        b = b || document.head;
        b.insertBefore(a, c && c.nextSibling || b.firstChild);
        U ? a.compareDocumentPosition(U) === Node.DOCUMENT_POSITION_PRECEDING && (U = a) : U = a
    }

    function Wd(a, b) {
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
        a = Wd(a.substring(e + 1), b);
        e = d.indexOf(",");
        return -1 === e ? b(c, d.trim(), "", a) : b(c, d.substring(0, e).trim(), d.substring(e + 1).trim(), a)
    }

    function Xd(a, b) {
        Q ? a.setAttribute("class", b) : window.ShadyDOM.nativeMethods.setAttribute.call(a, "class", b)
    }

    function V(a) {
        var b = a.localName, c = "";
        b ? -1 < b.indexOf("-") || (c = b, b = a.getAttribute && a.getAttribute("is") || "") : (b = a.is, c = a.extends);
        return {is: b, J: c}
    };

    function Yd() {
    }

    function Zd(a, b, c) {
        var d = W;
        a.__styleScoped ? a.__styleScoped = null : $d(d, a, b || "", c)
    }

    function $d(a, b, c, d) {
        b.nodeType === Node.ELEMENT_NODE && ae(b, c, d);
        if (b = "template" === b.localName ? (b.content || b.Ya).childNodes : b.children || b.childNodes) for (var e = 0; e < b.length; e++) $d(a, b[e], c, d)
    }

    function ae(a, b, c) {
        if (b) if (a.classList) c ? (a.classList.remove("style-scope"), a.classList.remove(b)) : (a.classList.add("style-scope"), a.classList.add(b)); else if (a.getAttribute) {
            var d = a.getAttribute(be);
            c ? d && (b = d.replace("style-scope", "").replace(b, ""), Xd(a, b)) : Xd(a, (d ? d + " " : "") + "style-scope " + b)
        }
    }

    function ce(a, b, c) {
        var d = W, e = a.__cssBuild;
        Q || "shady" === e ? b = S(b, c) : (a = V(a), b = de(d, b, a.is, a.J, c) + "\n\n");
        return b.trim()
    }

    function de(a, b, c, d, e) {
        var f = ee(c, d);
        c = c ? fe + c : "";
        return S(b, function (b) {
            b.c || (b.selector = b.j = ge(a, b, a.b, c, f), b.c = !0);
            e && e(b, c, f)
        })
    }

    function ee(a, b) {
        return b ? "[is=" + a + "]" : a
    }

    function ge(a, b, c, d, e) {
        var f = b.selector.split(he);
        if (!Td(b)) {
            b = 0;
            for (var h = f.length, g; b < h && (g = f[b]); b++) f[b] = c.call(a, g, d, e)
        }
        return f.join(he)
    }

    function ie(a) {
        return a.replace(je, function (a, c, d) {
            -1 < d.indexOf("+") ? d = d.replace(/\+/g, "___") : -1 < d.indexOf("___") && (d = d.replace(/___/g, "+"));
            return ":" + c + "(" + d + ")"
        })
    }

    Yd.prototype.b = function (a, b, c) {
        var d = !1;
        a = a.trim();
        var e = je.test(a);
        e && (a = a.replace(je, function (a, b, c) {
            return ":" + b + "(" + c.replace(/\s/g, "") + ")"
        }), a = ie(a));
        a = a.replace(ke, le + " $1");
        a = a.replace(me, function (a, e, g) {
            d || (a = ne(g, e, b, c), d = d || a.stop, e = a.Ba, g = a.value);
            return e + g
        });
        e && (a = ie(a));
        return a
    };

    function ne(a, b, c, d) {
        var e = a.indexOf(oe);
        0 <= a.indexOf(le) ? a = pe(a, d) : 0 !== e && (a = c ? qe(a, c) : a);
        c = !1;
        0 <= e && (b = "", c = !0);
        if (c) {
            var f = !0;
            c && (a = a.replace(re, function (a, b) {
                return " > " + b
            }))
        }
        a = a.replace(se, function (a, b, c) {
            return '[dir="' + c + '"] ' + b + ", " + b + '[dir="' + c + '"]'
        });
        return {value: a, Ba: b, stop: f}
    }

    function qe(a, b) {
        a = a.split(te);
        a[0] += b;
        return a.join(te)
    }

    function pe(a, b) {
        var c = a.match(ue);
        return (c = c && c[2].trim() || "") ? c[0].match(ve) ? a.replace(ue, function (a, c, f) {
            return b + f
        }) : c.split(ve)[0] === b ? c : we : a.replace(le, b)
    }

    function xe(a) {
        a.selector === ye && (a.selector = "html")
    }

    Yd.prototype.c = function (a) {
        return a.match(oe) ? this.b(a, ze) : qe(a.trim(), ze)
    };
    p.Object.defineProperties(Yd.prototype, {
        a: {
            configurable: !0, enumerable: !0, get: function () {
                return "style-scope"
            }
        }
    });
    var je = /:(nth[-\w]+)\(([^)]+)\)/, ze = ":not(.style-scope)", he = ",",
        me = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g, ve = /[[.:#*]/, le = ":host", ye = ":root", oe = "::slotted",
        ke = new RegExp("^(" + oe + ")"), ue = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
        re = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/, se = /(.*):dir\((?:(ltr|rtl))\)/, fe = ".", te = ":",
        be = "class", we = "should_not_match", W = new Yd;

    function Ae(a, b, c, d) {
        this.u = a || null;
        this.b = b || null;
        this.ca = c || [];
        this.B = null;
        this.J = d || "";
        this.a = this.o = this.v = null
    }

    function X(a) {
        return a ? a.__styleInfo : null
    }

    function Be(a, b) {
        return a.__styleInfo = b
    }

    Ae.prototype.c = function () {
        return this.u
    };
    Ae.prototype._getStyleRules = Ae.prototype.c;
    var Ce, De = window.Element.prototype;
    Ce = De.matches || De.matchesSelector || De.mozMatchesSelector || De.msMatchesSelector || De.oMatchesSelector || De.webkitMatchesSelector;
    var Ee = navigator.userAgent.match("Trident");

    function Fe() {
    }

    function Ge(a) {
        var b = {}, c = [], d = 0;
        T(a, function (a) {
            He(a);
            a.index = d++;
            a = a.g.cssText;
            for (var c; c = Nd.exec(a);) {
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

    function He(a) {
        if (!a.g) {
            var b = {}, c = {};
            Ie(a, c) && (b.s = c, a.rules = null);
            b.cssText = a.parsedCssText.replace(Qd, "").replace(Kd, "");
            a.g = b
        }
    }

    function Ie(a, b) {
        var c = a.g;
        if (c) {
            if (c.s) return Object.assign(b, c.s), !0
        } else {
            c = a.parsedCssText;
            for (var d; a = Kd.exec(c);) {
                d = (a[2] || a[3]).trim();
                if ("inherit" !== d || "unset" !== d) b[a[1].trim()] = d;
                d = !0
            }
            return d
        }
    }

    function Je(a, b, c) {
        b && (b = 0 <= b.indexOf(";") ? Ke(a, b, c) : Wd(b, function (b, e, f, h) {
            if (!e) return b + h;
            (e = Je(a, c[e], c)) && "initial" !== e ? "apply-shim-inherit" === e && (e = "inherit") : e = Je(a, c[f] || f, c) || f;
            return b + (e || "") + h
        }));
        return b && b.trim() || ""
    }

    function Ke(a, b, c) {
        b = b.split(";");
        for (var d = 0, e, f; d < b.length; d++) if (e = b[d]) {
            Md.lastIndex = 0;
            if (f = Md.exec(e)) e = Je(a, c[f[1]], c); else if (f = e.indexOf(":"), -1 !== f) {
                var h = e.substring(f);
                h = h.trim();
                h = Je(a, h, c) || h;
                e = e.substring(0, f) + h
            }
            b[d] = e && e.lastIndexOf(";") === e.length - 1 ? e.slice(0, -1) : e || ""
        }
        return b.join(";")
    }

    function Le(a, b) {
        var c = {}, d = [];
        T(a, function (a) {
            a.g || He(a);
            var e = a.j || a.parsedSelector;
            b && a.g.s && e && Ce.call(b, e) && (Ie(a, c), a = a.index, e = parseInt(a / 32, 10), d[e] = (d[e] || 0) | 1 << a % 32)
        }, null, !0);
        return {s: c, key: d}
    }

    function Me(a, b, c, d) {
        b.g || He(b);
        if (b.g.s) {
            var e = V(a);
            a = e.is;
            e = e.J;
            e = a ? ee(a, e) : "html";
            var f = b.parsedSelector, h = ":host > *" === f || "html" === f, g = 0 === f.indexOf(":host") && !h;
            "shady" === c && (h = f === e + " > *." + e || -1 !== f.indexOf("html"), g = !h && 0 === f.indexOf(e));
            "shadow" === c && (h = ":host > *" === f || "html" === f, g = g && !h);
            if (h || g) c = e, g && (Q && !b.j && (b.j = ge(W, b, W.b, a ? fe + a : "", e)), c = b.j || e), d({
                Pa: c,
                Ga: g,
                $a: h
            })
        }
    }

    function Ne(a, b) {
        var c = {}, d = {}, e = b && b.__cssBuild;
        T(b, function (b) {
            Me(a, b, e, function (e) {
                Ce.call(a.Za || a, e.Pa) && (e.Ga ? Ie(b, c) : Ie(b, d))
            })
        }, null, !0);
        return {Na: d, Fa: c}
    }

    function Oe(a, b, c, d) {
        var e = V(b), f = ee(e.is, e.J),
            h = new RegExp("(?:^|[^.#[:])" + (b.extends ? "\\" + f.slice(0, -1) + "\\]" : f) + "($|[.:[\\s>+~])");
        e = X(b).u;
        var g = Pe(e, d);
        return ce(b, e, function (b) {
            var e = "";
            b.g || He(b);
            b.g.cssText && (e = Ke(a, b.g.cssText, c));
            b.cssText = e;
            if (!Q && !Td(b) && b.cssText) {
                var k = e = b.cssText;
                null == b.ja && (b.ja = Od.test(e));
                if (b.ja) if (null == b.O) {
                    b.O = [];
                    for (var q in g) k = g[q], k = k(e), e !== k && (e = k, b.O.push(q))
                } else {
                    for (q = 0; q < b.O.length; ++q) k = g[b.O[q]], e = k(e);
                    k = e
                }
                b.cssText = k;
                b.j = b.j || b.selector;
                e = "." + d;
                q = b.j.split(",");
                k = 0;
                for (var E = q.length, J; k < E && (J = q[k]); k++) q[k] = J.match(h) ? J.replace(f, e) : e + " " + J;
                b.selector = q.join(",")
            }
        })
    }

    function Pe(a, b) {
        a = a.b;
        var c = {};
        if (!Q && a) for (var d = 0, e = a[d]; d < a.length; e = a[++d]) {
            var f = e, h = b;
            f.f = new RegExp(f.keyframesName, "g");
            f.a = f.keyframesName + "-" + h;
            f.j = f.j || f.selector;
            f.selector = f.j.replace(f.keyframesName, f.a);
            c[e.keyframesName] = Qe(e)
        }
        return c
    }

    function Qe(a) {
        return function (b) {
            return b.replace(a.f, a.a)
        }
    }

    function Re(a, b) {
        var c = Se, d = Sd(a);
        a.textContent = S(d, function (a) {
            var d = a.cssText = a.parsedCssText;
            a.g && a.g.cssText && (d = d.replace(Ed, "").replace(Fd, ""), a.cssText = Ke(c, d, b))
        })
    }

    p.Object.defineProperties(Fe.prototype, {
        a: {
            configurable: !0, enumerable: !0, get: function () {
                return "x-scope"
            }
        }
    });
    var Se = new Fe;
    var Te = {}, Ue = window.customElements;
    if (Ue && !Q) {
        var Ve = Ue.define;
        Ue.define = function (a, b, c) {
            var d = document.createComment(" Shady DOM styles for " + a + " "), e = document.head;
            e.insertBefore(d, (U ? U.nextSibling : null) || e.firstChild);
            U = d;
            Te[a] = d;
            return Ve.call(Ue, a, b, c)
        }
    }
    ;

    function We() {
        this.cache = {}
    }

    We.prototype.store = function (a, b, c, d) {
        var e = this.cache[a] || [];
        e.push({s: b, styleElement: c, o: d});
        100 < e.length && e.shift();
        this.cache[a] = e
    };
    We.prototype.fetch = function (a, b, c) {
        if (a = this.cache[a]) for (var d = a.length - 1; 0 <= d; d--) {
            var e = a[d], f;
            a:{
                for (f = 0; f < c.length; f++) {
                    var h = c[f];
                    if (e.s[h] !== b[h]) {
                        f = !1;
                        break a
                    }
                }
                f = !0
            }
            if (f) return e
        }
    };

    function Xe() {
    }

    function Ye(a) {
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
                    g = h.indexOf(W.a);
                    if ((h = -1 < g ? h[g + 1] : "") && f === e.ownerDocument) Zd(e, h, !0); else if (f.nodeType === Node.DOCUMENT_FRAGMENT_NODE &&
                        (f = f.host)) if (f = V(f).is, h === f) for (e = window.ShadyDOM.nativeMethods.querySelectorAll.call(e, ":not(." + W.a + ")"), f = 0; f < e.length; f++) ae(e[f], h); else h && Zd(e, h, !0), Zd(e, f)
                }
            }
        }
    }

    if (!Q) {
        var Ze = new MutationObserver(Ye), $e = function (a) {
            Ze.observe(a, {childList: !0, subtree: !0})
        };
        if (window.customElements && !window.customElements.polyfillWrapFlushCallback) $e(document); else {
            var af = function () {
                $e(document.body)
            };
            window.HTMLImports ? window.HTMLImports.whenReady(af) : requestAnimationFrame(function () {
                if ("loading" === document.readyState) {
                    var a = function () {
                        af();
                        document.removeEventListener("readystatechange", a)
                    };
                    document.addEventListener("readystatechange", a)
                } else af()
            })
        }
        Xe = function () {
            Ye(Ze.takeRecords())
        }
    }
    var bf = Xe;
    var cf = {};
    var df = Promise.resolve();

    function ef(a) {
        if (a = cf[a]) a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0, a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0, a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1
    }

    function ff(a) {
        return a._applyShimCurrentVersion === a._applyShimNextVersion
    }

    function gf(a) {
        a._applyShimValidatingVersion = a._applyShimNextVersion;
        a.b || (a.b = !0, df.then(function () {
            a._applyShimCurrentVersion = a._applyShimNextVersion;
            a.b = !1
        }))
    };var hf = null, jf = window.HTMLImports && window.HTMLImports.whenReady || null, kf;

    function lf(a) {
        requestAnimationFrame(function () {
            jf ? jf(a) : (hf || (hf = new Promise(function (a) {
                kf = a
            }), "complete" === document.readyState ? kf() : document.addEventListener("readystatechange", function () {
                "complete" === document.readyState && kf()
            })), hf.then(function () {
                a && a()
            }))
        })
    };var mf = new We;

    function Y() {
        var a = this;
        this.F = {};
        this.c = document.documentElement;
        var b = new rd;
        b.rules = [];
        this.f = Be(this.c, new Ae(b));
        this.l = !1;
        this.b = this.a = null;
        lf(function () {
            nf(a)
        })
    }

    n = Y.prototype;
    n.pa = function () {
        bf()
    };
    n.Da = function (a) {
        return Sd(a)
    };
    n.Ra = function (a) {
        return S(a)
    };
    n.prepareTemplate = function (a, b, c) {
        if (!a.f) {
            a.f = !0;
            a.name = b;
            a.extends = c;
            cf[b] = a;
            var d = (d = a.content.querySelector("style")) ? d.getAttribute("css-build") || "" : "";
            var e = [];
            for (var f = a.content.querySelectorAll("style"), h = 0; h < f.length; h++) {
                var g = f[h];
                if (g.hasAttribute("shady-unscoped")) {
                    if (!Q) {
                        var k = g.textContent;
                        Rd.has(k) || (Rd.add(k), k = g.cloneNode(!0), document.head.appendChild(k));
                        g.parentNode.removeChild(g)
                    }
                } else e.push(g.textContent), g.parentNode.removeChild(g)
            }
            e = e.join("").trim();
            c = {is: b, extends: c, Wa: d};
            Q || Zd(a.content, b);
            nf(this);
            f = Md.test(e) || Kd.test(e);
            Md.lastIndex = 0;
            Kd.lastIndex = 0;
            e = sd(e);
            f && R && this.a && this.a.transformRules(e, b);
            a._styleAst = e;
            a.l = d;
            d = [];
            R || (d = Ge(a._styleAst));
            if (!d.length || R) e = Q ? a.content : null, b = Te[b], f = ce(c, a._styleAst), b = f.length ? Ud(f, c.is, e, b) : void 0, a.a = b;
            a.c = d
        }
    };

    function of(a) {
        !a.b && window.ShadyCSS && window.ShadyCSS.CustomStyleInterface && (a.b = window.ShadyCSS.CustomStyleInterface, a.b.transformCallback = function (b) {
            a.na(b)
        }, a.b.validateCallback = function () {
            requestAnimationFrame(function () {
                (a.b.enqueued || a.l) && a.A()
            })
        })
    }

    function nf(a) {
        !a.a && window.ShadyCSS && window.ShadyCSS.ApplyShim && (a.a = window.ShadyCSS.ApplyShim, a.a.invalidCallback = ef);
        of(a)
    }

    n.A = function () {
        nf(this);
        if (this.b) {
            var a = this.b.processStyles();
            if (this.b.enqueued) {
                if (R) for (var b = 0; b < a.length; b++) {
                    var c = this.b.getStyleForCustomStyle(a[b]);
                    if (c && R && this.a) {
                        var d = Sd(c);
                        nf(this);
                        this.a.transformRules(d);
                        c.textContent = S(d)
                    }
                } else for (pf(this, this.c, this.f), b = 0; b < a.length; b++) (c = this.b.getStyleForCustomStyle(a[b])) && Re(c, this.f.v);
                this.b.enqueued = !1;
                this.l && !R && this.styleDocument()
            }
        }
    };
    n.styleElement = function (a, b) {
        var c = V(a).is, d = X(a);
        if (!d) {
            var e = V(a);
            d = e.is;
            e = e.J;
            var f = Te[d];
            d = cf[d];
            if (d) {
                var h = d._styleAst;
                var g = d.c
            }
            d = Be(a, new Ae(h, f, g, e))
        }
        a !== this.c && (this.l = !0);
        b && (d.B = d.B || {}, Object.assign(d.B, b));
        if (R) {
            if (d.B) {
                b = d.B;
                for (var k in b) null === k ? a.style.removeProperty(k) : a.style.setProperty(k, b[k])
            }
            if (((k = cf[c]) || a === this.c) && k && k.a && !ff(k)) {
                if (ff(k) || k._applyShimValidatingVersion !== k._applyShimNextVersion) nf(this), this.a && this.a.transformRules(k._styleAst, c), k.a.textContent = ce(a,
                    d.u), gf(k);
                Q && (c = a.shadowRoot) && (c.querySelector("style").textContent = ce(a, d.u));
                d.u = k._styleAst
            }
        } else if (pf(this, a, d), d.ca && d.ca.length) {
            c = d;
            k = V(a).is;
            d = (b = mf.fetch(k, c.v, c.ca)) ? b.styleElement : null;
            h = c.o;
            (g = b && b.o) || (g = this.F[k] = (this.F[k] || 0) + 1, g = k + "-" + g);
            c.o = g;
            g = c.o;
            e = Se;
            e = d ? d.textContent || "" : Oe(e, a, c.v, g);
            f = X(a);
            var l = f.a;
            l && !Q && l !== d && (l._useCount--, 0 >= l._useCount && l.parentNode && l.parentNode.removeChild(l));
            Q ? f.a ? (f.a.textContent = e, d = f.a) : e && (d = Ud(e, g, a.shadowRoot, f.b)) : d ? d.parentNode || (Ee &&
            -1 < e.indexOf("@media") && (d.textContent = e), Vd(d, null, f.b)) : e && (d = Ud(e, g, null, f.b));
            d && (d._useCount = d._useCount || 0, f.a != d && d._useCount++, f.a = d);
            g = d;
            Q || (d = c.o, f = e = a.getAttribute("class") || "", h && (f = e.replace(new RegExp("\\s*x-scope\\s*" + h + "\\s*", "g"), " ")), f += (f ? " " : "") + "x-scope " + d, e !== f && Xd(a, f));
            b || mf.store(k, c.v, g, c.o)
        }
    };

    function qf(a, b) {
        return (b = b.getRootNode().host) ? X(b) ? b : qf(a, b) : a.c
    }

    function pf(a, b, c) {
        a = qf(a, b);
        var d = X(a);
        a = Object.create(d.v || null);
        var e = Ne(b, c.u);
        b = Le(d.u, b).s;
        Object.assign(a, e.Fa, b, e.Na);
        b = c.B;
        for (var f in b) if ((e = b[f]) || 0 === e) a[f] = e;
        f = Se;
        b = Object.getOwnPropertyNames(a);
        for (e = 0; e < b.length; e++) d = b[e], a[d] = Je(f, a[d], a);
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
    n.na = function (a) {
        var b = this, c = Sd(a);
        T(c, function (a) {
            if (Q) xe(a); else {
                var c = W;
                a.selector = a.parsedSelector;
                xe(a);
                a.selector = a.j = ge(c, a, c.c, void 0, void 0)
            }
            R && (nf(b), b.a && b.a.transformRule(a))
        });
        R ? a.textContent = S(c) : this.f.u.rules.push(c)
    };
    n.getComputedStyleValue = function (a, b) {
        var c;
        R || (c = (X(a) || X(qf(this, a))).v[b]);
        return (c = c || window.getComputedStyle(a).getPropertyValue(b)) ? c.trim() : ""
    };
    n.Qa = function (a, b) {
        var c = a.getRootNode();
        b = b ? b.split(/\s/) : [];
        c = c.host && c.host.localName;
        if (!c) {
            var d = a.getAttribute("class");
            if (d) {
                d = d.split(/\s/);
                for (var e = 0; e < d.length; e++) if (d[e] === W.a) {
                    c = d[e + 1];
                    break
                }
            }
        }
        c && b.push(W.a, c);
        R || (c = X(a)) && c.o && b.push(Se.a, c.o);
        Xd(a, b.join(" "))
    };
    n.za = function (a) {
        return X(a)
    };
    Y.prototype.flush = Y.prototype.pa;
    Y.prototype.prepareTemplate = Y.prototype.prepareTemplate;
    Y.prototype.styleElement = Y.prototype.styleElement;
    Y.prototype.styleDocument = Y.prototype.styleDocument;
    Y.prototype.styleSubtree = Y.prototype.styleSubtree;
    Y.prototype.getComputedStyleValue = Y.prototype.getComputedStyleValue;
    Y.prototype.setElementClass = Y.prototype.Qa;
    Y.prototype._styleInfoForNode = Y.prototype.za;
    Y.prototype.transformCustomStyleForDocument = Y.prototype.na;
    Y.prototype.getStyleAst = Y.prototype.Da;
    Y.prototype.styleAstToString = Y.prototype.Ra;
    Y.prototype.flushCustomStyles = Y.prototype.A;
    Object.defineProperties(Y.prototype, {
        nativeShadow: {
            get: function () {
                return Q
            }
        }, nativeCss: {
            get: function () {
                return R
            }
        }
    });
    var Z = new Y, rf, sf;
    window.ShadyCSS && (rf = window.ShadyCSS.ApplyShim, sf = window.ShadyCSS.CustomStyleInterface);
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
        }, nativeCss: R, nativeShadow: Q
    };
    rf && (window.ShadyCSS.ApplyShim = rf);
    sf && (window.ShadyCSS.CustomStyleInterface = sf);
    /*

 Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    var tf = window.customElements, uf = window.HTMLImports, vf = window.HTMLTemplateElement;
    window.WebComponents = window.WebComponents || {};
    if (tf && tf.polyfillWrapFlushCallback) {
        var wf, xf = function () {
            if (wf) {
                vf.Aa && vf.Aa(window.document);
                var a = wf;
                wf = null;
                a();
                return !0
            }
        }, yf = uf.whenReady;
        tf.polyfillWrapFlushCallback(function (a) {
            wf = a;
            yf(xf)
        });
        uf.whenReady = function (a) {
            yf(function () {
                xf() ? uf.whenReady(a) : a()
            })
        }
    }
    uf.whenReady(function () {
        requestAnimationFrame(function () {
            window.WebComponents.ready = !0;
            document.dispatchEvent(new CustomEvent("WebComponentsReady", {bubbles: !0}))
        })
    });
    var zf = document.createElement("style");
    zf.textContent = "body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";
    var Af = document.querySelector("head");
    Af.insertBefore(zf, Af.firstChild);
}).call(this);

//# sourceMappingURL=webcomponents-hi-sd-ce.js.map
