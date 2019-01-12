var Utils;
! function(r) {
    function e(r, e) {
        return Math.floor(Math.random() * (e - r)) + r
    }

    function n(r) {
        var e = r.toLowerCase();
        return "true" === e || "1" === e
    }

    function t(r, e) {
        try {
            return a(JSON.parse(r))
        } catch (r) {
            return e
        }
    }

    function a(r) {
        if (r instanceof Array) return 0 === r.length ? [] : "number" == typeof r[0] ? [new Point(r[0], r[1])] : r.map(function(r) {
            return new Point(r[0], r[1])
        })
    }

    function o(r) {
        return JSON.stringify(r.map(function(r) {
            return [r.x, r.y]
        }))
    }

    function u(r, e) {
        r = r.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var n = new RegExp("[\\?&]" + r + "=([^&#]*)"),
            t = n.exec(location.search);
        return null === t ? e : decodeURIComponent(t[1].replace(/\+/g, " "))
    }

    function i(r, e) {
        var n = u(r);
        return void 0 === n ? e : +n
    }

    function l(r, e) {
        var n = u(r);
        return void 0 === n ? e : parseInt(n, 10)
    }

    function s(r, e) {
        var t = u(r);
        return void 0 === t ? e : n(t)
    }

    function c(r, e) {
        var n = u(r);
        return void 0 === n ? e : t(n, e)
    }

    function f(r, e) {
        for (var n = 0; n < r.length; n++)
            if (e(r[n], n, r)) return n;
        return -1
    }

    function p(r, e) {
        r.addEventListener("keydown", function(r) {
            "Enter" === r.key && e.click()
        })
    }

    function d(r, e, n) {
        $.ajax({
            url: "/Home/Upload",
            type: "POST",
            data: r,
            cache: !1,
            contentType: !1,
            processData: !1,
            success: e,
            error: n
        })
    }

    function g(r) {
        if (r in AltarData && null != AltarData[r].name && null != AltarData[r].grid && null != AltarData[r].spawns) return $.Deferred().resolve().promise();
        var e = performance.now();
        return $.getJSON("api/altars/" + r).done(function(n) {
            var a = performance.now();
            console.debug("Fetched altar " + r + " in " + (a - e) + " ms"), AltarData[r] = {
                name: n.name,
                grid: JSON.parse(n.grid),
                spawns: t(n.spawns),
                groundColor: JSON.parse(n.groundColor),
                waterColor: JSON.parse(n.waterColor),
                groundPattern: JSON.parse(n.groundPattern)
            }
        })
    }

    function m(r, e) {
        var n = performance.now();
        return $.getJSON("/api/altars?min=" + r + "&max=" + e).done(function(a) {
            var o = performance.now();
            console.debug("Fetched altars " + r + " to " + e + " in " + (o - n) + " ms");
            for (var u = 0, i = a; u < i.length; u++) {
                var l = i[u];
                AltarData[l.id] = {
                    name: l.name,
                    grid: JSON.parse(l.grid),
                    spawns: t(l.spawns),
                    groundColor: JSON.parse(l.groundColor),
                    waterColor: JSON.parse(l.waterColor),
                    groundPattern: JSON.parse(l.groundPattern)
                }
            }
        })
    }

    function v() {
        var r = performance.now();
        return $.getJSON("api/altars/names").done(function(e) {
            var n = performance.now();
            console.debug("Fetched all altar names in " + (n - r) + " ms");
            for (var t = 0, a = e; t < a.length; t++) {
                var o = a[t];
                void 0 !== AltarData[o.id] ? AltarData[o.id].name = o.name : AltarData[o.id] = {
                    name: o.name
                }
            }
        })
    }

    function w(r) {
        var e = $.Deferred(),
            n = r.match(h);
        if (null == n) e.resolve(null);
        else {
            var t = n[1];
            $.ajax({
                url: "https://www.googleapis.com/youtube/v3/videos?id=" + t + "&key=AIzaSyBSyv4ZxBcMN7o2nvFc5XCZ6hzxq3ANeRU&fields=items(snippet(title))&part=snippet",
                success: function(n) {
                    n.items.length > 0 ? e.resolve('<a target="_blank" class="youtube" href="../s/' + r + '">' + n.items[0].snippet.title + " - YouTube</a>") : e.resolve(null)
                },
                error: function() {
                    e.resolve(null)
                }
            })
        }
        return e.promise()
    }

    function y(r) {
        var e = r.match(S);
        if (null != e) {
            var n = {},
                t = e.map(function(r) {
                    return w(r).done(function(e) {
                        n[r] = null != e ? e : '<a href="../s/' + r + '" target="_blank">' + r + "</a>"
                    })
                });
            return $.when.apply($, t).then(function() {
                return r.replace(S, function(r) {
                    return n[r]
                })
            })
        }
        return $.Deferred().resolve(r).promise()
    }

    function A() {
        return /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent)
    }
    var h = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
        S = /\b(?:https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;*(){}\[\]]*[-A-Z0-9+&@#\/%=~_|;*(){}\[\]]/gim;
    r.getRandomInt = e, r.parseBoolean = n, r.parsePointArray = t, r.toPointArray = a, r.pointArrayToJSON = o, r.getQueryAsString = u, r.getQueryAsNumber = i, r.getQueryAsInteger = l, r.getQueryAsBoolean = s, r.getQueryAsPointArray = c, r.findIndex = f, r.bindEnterKeyToButton = p, r.uploadToSite = d, r.loadAltar = g, r.loadAltars = m, r.loadAltarNames = v, r.transformYouTubeVideoLink = w, r.formatMessageText = y, r.isSearchCrawler = A
}(Utils || (Utils = {}));