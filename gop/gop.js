var ActionType;
! function(t) {
    t[t.Idle = 0] = "Idle", t[t.Move = 1] = "Move", t[t.Attract = 2] = "Attract"
}(ActionType || (ActionType = {}));
var PathMode;
! function(t) {
    t[t.Sight = 0] = "Sight", t[t.Orb = 1] = "Orb", t[t.Player = 2] = "Player"
}(PathMode || (PathMode = {}));
var OrbControlState;
! function(t) {
    t[t.Free = 0] = "Free", t[t.Controlled = 1] = "Controlled", t[t.Wait1 = 2] = "Wait1", t[t.Wait2 = 3] = "Wait2"
}(OrbControlState || (OrbControlState = {}));
var Altar;
! function(t) {
    t[t.None = 0] = "None", t[t.Air = 1] = "Air", t[t.Mind = 2] = "Mind", t[t.Water = 3] = "Water", t[t.Earth = 4] = "Earth", t[t.Fire = 5] = "Fire", t[t.Body = 6] = "Body"
}(Altar || (Altar = {}));
var Tile;
! function(t) {
    t[t.Floor = 0] = "Floor", t[t.Barrier = 1] = "Barrier", t[t.Rock = 2] = "Rock", t[t.Water = 3] = "Water", t[t.WallW = 4] = "WallW", t[t.WallS = 5] = "WallS", t[t.WallSW = 6] = "WallSW", t[t.Minipillar1 = 7] = "Minipillar1", t[t.Minipillar2 = 8] = "Minipillar2"
}(Tile || (Tile = {}));
var Point = function() {
    function t(t, i) {
        this.x = t, this.y = i
    }
    return t.prototype.add = function(i) {
        return new t(this.x + i.x, this.y + i.y)
    }, t.prototype.subtract = function(i) {
        return new t(this.x - i.x, this.y - i.y)
    }, t.prototype.multiply = function(i) {
        return new t(i * this.x, i * this.y)
    }, t.prototype.negate = function() {
        return new t((-this.x), (-this.y))
    }, t.prototype.equals = function(t) {
        return this.x === t.x && this.y === t.y
    }, t.prototype.clone = function() {
        return new t(this.x, this.y)
    }, t.prototype.compare = function(t) {
        return this.y === t.y ? this.x === t.x ? 0 : this.x < t.x ? -1 : 1 : this.y < t.y ? -1 : 1
    }, t.prototype.toString = function() {
        return "(" + this.x + "," + this.y + ")"
    }, t.isNaN = function(t) {
        return void 0 === t || isNaN(t.x) || isNaN(t.y)
    }, t.distanceSquared = function(t, i) {
        var e = t.x - i.x,
            o = t.y - i.y;
        return e * e + o * o
    }, t.walkingDistance = function(t, i) {
        return Math.max(Math.abs(t.x - i.x), Math.abs(t.y - i.y))
    }, t.lerp = function(i, e, o) {
        return t.isNaN(i) ? e : t.isNaN(e) ? i : new t((1 - o) * i.x + o * e.x, (1 - o) * i.y + o * e.y)
    }, t.parse = function(i) {
        "(" !== i[0] && "[" !== i[0] || (i = i.substring(1, i.length - 1));
        var e = i.split(",", 2);
        return new t(parseInt(e[0], 10), parseInt(e[1], 10))
    }, t
}();
Point.zero = new Point(0, 0), Point.NaN = new Point(NaN, NaN), Point.gridOffsets = [new Point((-1), 0), new Point(1, 0), new Point(0, (-1)), new Point(0, 1), new Point((-1), (-1)), new Point((-1), 1), new Point(1, (-1)), new Point(1, 1)];
var MersenneTwister = function() {
        function t(t) {
            void 0 === t && (t = 5489), this.seed = t, this.N = 624, this.M = 397, this.MATRIX_A = 2567483615, this.UPPER_MASK = 2147483648, this.LOWER_MASK = 2147483647, this.mt = new Array(this.N), this.mti = this.N + 1, this.init_genrand(t)
        }
        return t.prototype.init_genrand = function(t) {
            for (this.mt[0] = t >>> 0, this.mti = 1; this.mti < this.N; this.mti++) t = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30, this.mt[this.mti] = (1812433253 * ((4294901760 & t) >>> 16) << 16) + 1812433253 * (65535 & t) + this.mti, this.mt[this.mti] >>>= 0
        }, t.prototype.init_by_array = function(t, i) {
            var e, o, n, s;
            for (this.init_genrand(19650218), e = 1, o = 0, n = this.N > i ? this.N : i; n; n--) s = this.mt[e - 1] ^ this.mt[e - 1] >>> 30, this.mt[e] = (this.mt[e] ^ (1664525 * ((4294901760 & s) >>> 16) << 16) + 1664525 * (65535 & s)) + t[o] + o, this.mt[e] >>>= 0, e++, o++, e >= this.N && (this.mt[0] = this.mt[this.N - 1], e = 1), o >= i && (o = 0);
            for (n = this.N - 1; n; n--) s = this.mt[e - 1] ^ this.mt[e - 1] >>> 30, this.mt[e] = (this.mt[e] ^ (1566083941 * ((4294901760 & s) >>> 16) << 16) + 1566083941 * (65535 & s)) - e, this.mt[e] >>>= 0, e++, e >= this.N && (this.mt[0] = this.mt[this.N - 1], e = 1);
            this.mt[0] = 2147483648
        }, t.prototype.genrand_int32 = function() {
            var t, i = new Array(0, this.MATRIX_A);
            if (this.mti >= this.N) {
                var e = void 0;
                for (this.mti === this.N + 1 && this.init_genrand(5489), e = 0; e < this.N - this.M; e++) t = this.mt[e] & this.UPPER_MASK | this.mt[e + 1] & this.LOWER_MASK, this.mt[e] = this.mt[e + this.M] ^ t >>> 1 ^ i[1 & t];
                for (; e < this.N - 1; e++) t = this.mt[e] & this.UPPER_MASK | this.mt[e + 1] & this.LOWER_MASK, this.mt[e] = this.mt[e + (this.M - this.N)] ^ t >>> 1 ^ i[1 & t];
                t = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK, this.mt[this.N - 1] = this.mt[this.M - 1] ^ t >>> 1 ^ i[1 & t], this.mti = 0
            }
            return t = this.mt[this.mti++], t ^= t >>> 11, t ^= t << 7 & 2636928640, t ^= t << 15 & 4022730752, t ^= t >>> 18, t >>> 0
        }, t.prototype.nextInt = function(t) {
            for (;;) {
                var i = this.genrand_int32();
                if (Math.floor(i / t) < Math.floor(4294967295 / t) || 4294967295 % t === t - 1) return i % t
            }
        }, t
    }(),
    AltarData = [{
        name: "None",
        grid: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        spawns: [new Point((-2), 4)],
        groundColor: "#555555"
    }],
    GopObject = function() {
        function t(t) {
            this.location = t, this.location = t
        }
        return Object.defineProperty(t.prototype, "isDead", {
            get: function() {
                return Point.isNaN(this.location)
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.getDrawLocation = function(t) {
            return Point.lerp(this.prevLocation, this.location, Math.min(1, t))
        }, t
    }(),
    GameAction = function() {
        function t(t, i, e, o, n, s) {
            void 0 === o && (o = !1), void 0 === n && (n = !1), void 0 === s && (s = !1), this.type = t, this.location = i, this.orbIndex = e, this.toggleRun = o, this.changeWand = n, this.isNewAttract = s
        }
        return t.prototype.copy = function(i) {
            return void 0 === i && (i = !1), new t(this.type, this.location, this.orbIndex, !i && this.toggleRun, !i && this.changeWand, !i && this.isNewAttract)
        }, t.prototype.toString = function() {
            var i = (this.toggleRun ? "{r}" : "") + (this.changeWand ? "{q}" : "") + (this.isNewAttract ? "*" : "");
            switch (this.type) {
                case ActionType.Idle:
                    i += "-";
                    break;
                case ActionType.Move:
                    i += this.location.toString();
                    break;
                case ActionType.Attract:
                    i += t.orbIndexToChar(this.orbIndex);
                    break;
                default:
                    throw new Error("Invalid action type.")
            }
            return i
        }, t.idle = function(i, e) {
            return void 0 === i && (i = !1), void 0 === e && (e = !1), new t(ActionType.Idle, Point.NaN, (-1), i, e, (!1))
        }, t.move = function(i, e, o) {
            return void 0 === e && (e = !1), void 0 === o && (o = !1), new t(ActionType.Move, i, (-1), e, o, (!1))
        }, t.attract = function(i, e, o, n) {
            return void 0 === e && (e = !1), void 0 === o && (o = !1), void 0 === n && (n = !1), new t(ActionType.Attract, Point.NaN, i, e, o, n)
        }, t.orbIndexToChar = function(t) {
            return t >= 26 ? String.fromCharCode(t + 71) : String.fromCharCode(t + 65)
        }, t.charToOrbIndex = function(t) {
            var i = t.charCodeAt(0);
            if (i >= 97 && i <= 122) return i - 71;
            if (i >= 65 && i <= 90) return i - 65;
            throw new Error("Invalid orb index char code.")
        }, t.parse = function(i) {
            for (var e = !1, o = !1, n = !1;
                "{" === i[0] || "*" === i[0];)
                if ("*" === i[0]) n = !0, i = i.substr(1);
                else {
                    var s = i.indexOf("}"),
                        r = i.substring(1, s);
                    "r" === r ? e = !0 : "q" === r ? o = !0 : console.warn("Unknown inter-tick action, expected {r} or {q}."), i = i.substr(s + 1)
                }
            return null == i || "-" === i ? t.idle(e, o) : 1 === i.length ? t.attract(t.charToOrbIndex(i), e, o, n) : t.move(Point.parse(i), e, o)
        }, t
    }(),
    GopBoard = function() {
        function t(i, e, o) {
            void 0 === o && (o = t.defaults.reachDistance), this.numRows = i, this.numColumns = e, this.reachDistance = o, this.grid = [], this.xmax = Math.floor(this.numRows / 2), this.ymax = Math.floor(this.numColumns / 2), this.clear()
        }
        return t.prototype.isInRange = function(t) {
            return t.x <= this.xmax && t.x >= -this.xmax && t.y <= this.ymax && t.y >= -this.ymax
        }, t.prototype.get = function(t) {
            return this.isInRange(t) ? this.grid[t.y + this.ymax][t.x + this.xmax] : Tile.Barrier
        }, t.prototype.set = function(t, i) {
            this.isInRange(t) ? this.grid[t.y + this.ymax][t.x + this.xmax] = i : console.error("Attempted to set GopBoard coordinate that is out of bounds: " + t)
        }, t.prototype.clear = function() {
            this.grid = [];
            for (var t = 0; t < this.numRows; t++) {
                this.grid[t] = [];
                for (var i = 0; i < this.numColumns; i++) this.grid[t][i] = Tile.Floor
            }
        }, t.prototype.loadAltar = function(t) {
            for (var i = 0; i < this.numRows; ++i) this.grid[i] = AltarData[t].grid[this.numRows - i - 1].slice()
        }, t.prototype.isPassable = function(t, i) {
            return !(this.get(t) === Tile.Barrier || i >= PathMode.Orb && this.get(t) === Tile.Rock || i === PathMode.Player && this.get(t) === Tile.Water)
        }, t.prototype.canMoveWest = function(t, i) {
            var e = new Point(t.x - 1, t.y);
            return this.isInRange(t) && this.isInRange(e) && this.get(t) !== Tile.WallW && this.get(t) !== Tile.WallSW && this.isPassable(t, i) && this.isPassable(e, i)
        }, t.prototype.canMoveEast = function(t, i) {
            return this.canMoveWest(new Point(t.x + 1, t.y), i)
        }, t.prototype.canMoveSouth = function(t, i) {
            var e = new Point(t.x, t.y - 1);
            return this.isInRange(t) && this.isInRange(e) && this.get(t) !== Tile.WallS && this.get(t) !== Tile.WallSW && this.isPassable(t, i) && this.isPassable(e, i)
        }, t.prototype.canMoveNorth = function(t, i) {
            return this.canMoveSouth(new Point(t.x, t.y + 1), i)
        }, t.prototype.canMove = function(t, i, e, o) {
            if (Math.abs(i) > 1 || Math.abs(e) > 1) return !1;
            var n = 1 === i ? 1 : 0,
                s = 1 === e ? 1 : 0,
                r = this.get(t);
            this.isPassable(t, o) || this.set(t, Tile.Floor);
            var a = !0;
            return a = 0 === e ? this.canMoveWest(new Point(t.x + n, t.y), o) : 0 === i ? this.canMoveSouth(new Point(t.x, t.y + s), o) : o === PathMode.Sight ? !(!this.canMoveWest(new Point(t.x + n, t.y + s), o) && !this.canMoveWest(new Point(t.x + n, t.y + s - 1), o) || !this.canMoveSouth(new Point(t.x + n, t.y + s), o) && !this.canMoveSouth(new Point(t.x + n - 1, t.y + s), o)) && (i === e ? !(!this.canMoveWest(new Point(t.x + n, t.y + s), o) && !this.canMoveSouth(new Point(t.x + n, t.y + s), o) || !this.canMoveWest(new Point(t.x + n, t.y + s - 1), o) && !this.canMoveSouth(new Point(t.x + n - 1, t.y + s), o)) : !(!this.canMoveWest(new Point(t.x + n, t.y + s), o) && !this.canMoveSouth(new Point(t.x + n - 1, t.y + s), o) || !this.canMoveWest(new Point(t.x + n, t.y + s - 1), o) && !this.canMoveSouth(new Point(t.x + n, t.y + s), o))) : !(i === -e && this.get(new Point(t.x + n, t.y + s)) === Tile.Minipillar1 || i === e && this.get(new Point(t.x + n, t.y + s)) === Tile.Minipillar2) && (this.canMoveWest(new Point(t.x + n, t.y + s), o) && this.canMoveWest(new Point(t.x + n, t.y + s - 1), o) && this.canMoveSouth(new Point(t.x + n, t.y + s), o) && this.canMoveSouth(new Point(t.x + n - 1, t.y + s), o)), this.set(t, r), a
        }, t.prototype.canReach = function(i, e, o) {
            return !i.equals(e) && Point.walkingDistance(i, e) <= (o ? this.reachDistance - 2 : this.reachDistance) && this.findObstacle(t.getLineOfSight(i, e)) === -1
        }, t.prototype.getPlayerPath = function(t, i, e) {
            if (t.equals(i)) {
                if (!e) return [];
                for (var o = 0; o < 4; ++o) {
                    var n = t.add(Point.gridOffsets[o]);
                    if (this.isInRange(n) && this.canMove(t, Point.gridOffsets[o].x, Point.gridOffsets[o].y, PathMode.Player)) return [n]
                }
            }
            for (var s = [t], r = [], a = -this.ymax; a <= this.ymax; ++a) r[a] = [];
            r[t.y][t.x] = Point.zero;
            for (var h = 1 / 0, l = Point.NaN; s.length > 0;) {
                var c = s.shift(),
                    g = Point.distanceSquared(c, i),
                    u = i.subtract(c);
                if ((e ? g : Point.walkingDistance(c, i)) <= 1 && this.canMove(c, u.x, u.y, PathMode.Player)) {
                    r[i.y][i.x] = c, l = i;
                    break
                }
                h > g && (h = g, l = c);
                for (var o = 0; o < Point.gridOffsets.length; ++o) {
                    var n = c.add(Point.gridOffsets[o]);
                    this.isInRange(n) && Point.isNaN(r[n.y][n.x]) && this.canMove(c, Point.gridOffsets[o].x, Point.gridOffsets[o].y, PathMode.Player) && (r[n.y][n.x] = c, s.push(n))
                }
            }
            for (var f = [], n = l; !n.equals(t); n = r[n.y][n.x]) f.push(n);
            return e && f.length > 0 && i.equals(f[0]) && f.shift(), f.reverse()
        }, t.prototype.nearestPoint = function(t, i, e) {
            function o(t) {
                return function(i) {
                    return i.equals(t)
                }
            }
            var n = [{
                    state: t,
                    dist: 0
                }],
                s = {};
            for (s[t.toString()] = !0; n.length > 0;)
                for (var r = n.shift(), a = 0; a < Point.gridOffsets.length; ++a) {
                    var h = r.state.add(Point.gridOffsets[a]);
                    if (this.isInRange(h) && !s[h.toString()] && this.canMove(r.state, Point.gridOffsets[a].x, Point.gridOffsets[a].y, e)) {
                        if (i.some(o(h))) return h;
                        s[h.toString()] = !0, n.push({
                            state: h,
                            dist: r.dist + 1
                        })
                    }
                }
            return Point.NaN
        }, t.prototype.nearestAltarPoint = function(t, i) {
            for (var e = [], o = -2; o <= 2; o++)
                for (var n = -2; n <= 2; n++) 2 === Math.abs(n) && 2 === Math.abs(o) || e.push(new Point(n, o));
            return this.nearestPoint(t, e, i)
        }, t.prototype.distanceToAltar = function(t, i) {
            if (Point.isNaN(t)) return NaN;
            var e = [{
                    state: t,
                    dist: 0
                }],
                o = {};
            for (o[t.toString()] = !0; e.length > 0;) {
                var n = e.shift();
                if (n.state.x >= -2 && n.state.x <= 2 && n.state.y >= -2 && n.state.y <= 2) return n.dist;
                for (var s = Point.gridOffsets, r = 0; r < s.length; ++r) {
                    var a = n.state.add(s[r]);
                    this.isInRange(a) && !o[a.toString()] && this.canMove(n.state, s[r].x, s[r].y, i) && (o[a.toString()] = !0, e.push({
                        state: a,
                        dist: n.dist + 1
                    }))
                }
            }
            return 1 / 0
        }, t.prototype.willMoveOrb = function(t, i) {
            var e = Math.abs((i.y - t.y) / (i.x - t.x)),
                o = Math.abs(i.x - t.x) <= 1 ? 0 : i.x > t.x ? -1 : 1,
                n = Math.abs(i.y - t.y) <= 1 ? 0 : i.y > t.y ? -1 : 1;
            return !(e > 2 && !this.canMove(i, 0, n, PathMode.Orb) || e < .5 && !this.canMove(i, o, 0, PathMode.Orb) || !this.canMove(i, o, 0, PathMode.Orb) && !this.canMove(i, 0, n, PathMode.Orb))
        }, t.prototype.toString = function() {
            for (var t = "", i = this.numRows - 1; i >= 0; i--) {
                for (var e = 0; e < this.numColumns; e++) t += this.grid[i][e];
                0 !== i && (t += "\n")
            }
            return t
        }, t.prototype.toJSON = function() {
            return JSON.stringify(this.grid.slice().reverse())
        }, t.prototype.findObstacle = function(t) {
            if (0 === t.length) return -1;
            if (this.get(t[0]) === Tile.Barrier) return 0;
            for (var i = 1; i < t.length; i++) {
                var e = t[i],
                    o = t[i - 1];
                if ((i !== t.length - 1 || this.isPassable(e, PathMode.Orb)) && !this.canMove(o, e.x - o.x, e.y - o.y, PathMode.Sight)) return i
            }
            return -1
        }, t.isAdjacentToAltar = function(t) {
            return Math.abs(t.x) <= 2 && Math.abs(t.y) <= 2
        }, t.isPlayerAdjacentToAltar = function(t) {
            return Math.abs(t.x) <= 2 && Math.abs(t.y) <= 2 && !(2 === Math.abs(t.x) && 2 === Math.abs(t.y))
        }, t.isInAltar = function(t) {
            return Math.abs(t.x) <= 1 && Math.abs(t.y) <= 1
        }, t.getOrbOffset = function(t, i) {
            function e(t) {
                return 0 === t ? 0 : t > 0 ? 1 : -1
            }

            function o(t, i) {
                return Math.abs(t) < Math.abs(i) ? t : i
            }
            void 0 === i && (i = !1);
            var n, s = Math.abs(t.y / t.x),
                r = e(t.x),
                a = e(t.y);
            return n = s > 2 ? new Point(0, 2 * a) : s > 1 ? new Point(r, 2 * a) : 1 === s ? new Point(2 * r, 2 * a) : s >= .5 ? new Point(2 * r, a) : new Point(2 * r, 0), i ? new Point(o(n.x, t.x - r), o(n.y, t.y - a)) : n
        }, t.getLineOfSight = function(i, e) {
            var o = e.x - i.x,
                n = e.y - i.y,
                s = [];
            if (0 === o && 0 === n) return s;
            if (i.x > e.x) return t.getLineOfSight(e, i).reverse();
            if (i.y > e.y) return t.getLineOfSight(new Point(i.x, (-i.y)), new Point(e.x, (-e.y))).map(function(t) {
                return new Point(t.x, (-t.y))
            });
            if (0 === o)
                for (var r = i.y; r <= e.y; r++) s.push(new Point(i.x, r));
            else if (0 === n)
                for (var a = i.x; a <= e.x; a++) s.push(new Point(a, i.y));
            else if (o === n)
                for (var a = i.x, r = i.y; a <= e.x, r <= e.y; a++, r++) s.push(new Point(a, r));
            else {
                if (Math.abs(n) > Math.abs(o)) return o * n > 0 ? t.getLineOfSight(new Point(i.y, i.x), new Point(e.y, e.x)).map(function(t) {
                    return new Point(t.y, t.x)
                }) : t.getLineOfSight(new Point((-i.y), (-i.x)), new Point((-e.y), (-e.x))).map(function(t) {
                    return new Point((-t.y), (-t.x))
                });
                s.push(i);
                for (var a = i.x + 1, r = i.y, h = o / 2; a <= e.x;) s.push(new Point(a, r)), 0 === h ? (a += 1, h += n) : (h += n, a += 1, h > o ? (r += 1, s.push(new Point(a - 1, r)), h -= o) : h === o && (r += 1, 6 === o && (1 === n || 5 === n) || 10 === o && (1 === n || 3 === n || 7 === n || 9 === n) ? s.push(new Point(a, r - 1)) : s.push(new Point(a - 1, r)), h = 0))
            }
            return s
        }, t
    }();
GopBoard.defaults = {
    reachDistance: 10
};
var __extends = this && this.__extends || function(t, i) {
        function e() {
            this.constructor = t
        }
        for (var o in i) i.hasOwnProperty(o) && (t[o] = i[o]);
        t.prototype = null === i ? Object.create(i) : (e.prototype = i.prototype, new e)
    },
    Orb = function(t) {
        function i(i, e) {
            var o = t.call(this, Point.NaN) || this;
            return o.gs = i, o.index = e, o.target = Point.NaN, o.deadTime = 0, o.controllingPlayer = null, o.controlState = OrbControlState.Free, o.wasTouchedThisTick = !1, o
        }
        return __extends(i, t), i.prototype.reset = function() {
            this.prevLocation = Point.NaN, this.target = Point.NaN, this.deadTime = 0, this.controllingPlayer = null, this.controlState = OrbControlState.Free, this.wasTouchedThisTick = !1
        }, i.prototype.spawn = function(t) {
            void 0 === t && (t = !1);
            var i = AltarData[this.gs.altar].spawns;
            this.prevLocation = Point.NaN, this.gs.presetSpawnStack && this.gs.presetSpawnStack.length > 0 ? this.location = this.gs.presetSpawnStack.shift() : t || this.gs.respawnOrbs ? this.location = i[this.gs.random.nextInt(i.length)] : this.location = Point.NaN, this.target = Point.NaN, this.deadTime = 0
        }, i.prototype.step = function() {
            function t(t, i, e) {
                return t < i ? i : t > e ? e : t
            }
            var i = this;
            if (this.prevLocation = this.location, this.target.equals(this.location) && (this.target = Point.NaN), GopBoard.isAdjacentToAltar(this.location)) this.target = Point.NaN, ++this.deadTime >= 1 && this.gs.players.forEach(function(t) {
                t.action && t.action.type === ActionType.Attract && t.action.orbIndex === i.index && (t.action = GameAction.idle(t.action.toggleRun), t.stopAttracting())
            }), this.deadTime >= 2 && (this.spawn(), this.gs.score++, this.gs.scoredTicks.push(this.gs.currentTick));
            else if (!Point.isNaN(this.target) && !this.location.equals(this.target)) {
                var e = this.target.subtract(this.location),
                    o = new Point(t(e.x, -1, 1), t(e.y, -1, 1));
                this.gs.board.canMove(this.location, o.x, o.y, PathMode.Orb) || (o = this.gs.board.canMove(this.location, o.x, 0, PathMode.Orb) ? new Point(o.x, 0) : this.gs.board.canMove(this.location, 0, o.y, PathMode.Orb) ? new Point(0, o.y) : Point.zero), o.equals(Point.zero) ? this.target = Point.NaN : this.location = this.location.add(o)
            }
            this.wasTouchedThisTick || this.controlState === OrbControlState.Free || (this.controlState = (this.controlState + 1) % 4)
        }, i
    }(GopObject),
    __extends = this && this.__extends || function(t, i) {
        function e() {
            this.constructor = t
        }
        for (var o in i) i.hasOwnProperty(o) && (t[o] = i[o]);
        t.prototype = null === i ? Object.create(i) : (e.prototype = i.prototype, new e)
    },
    Player = function(t) {
        function i(i, e, o) {
            var n = t.call(this, e) || this;
            return n.gs = i, n.index = o, n.action = GameAction.idle(), n.run = !0, n.repel = !1, n.currentOrb = null, n.delayAttractFromMoving = !1, n.delayAttractFromPrototick = !1, n.hasMovedThisTick = !1, n.lastMoveTarget = Point.NaN, n.lastAttractTarget = Point.NaN, n.movePath = [], n.lastOrbClickLocation = Point.NaN, n.isAttracting = !1, n.forceAttractOrb = null, n.holdLength = 0, n.previousAction = null, n.attractIneffective = !1, n
        }
        return __extends(i, t), i.prototype.stopAttracting = function() {
            this.currentOrb = null, this.isAttracting = !1, this.holdLength = 0, this.forceAttractOrb = null, this.attractIneffective = !1
        }, i.prototype.freeze = function() {
            this.stopAttracting(), this.lastOrbClickLocation = Point.NaN, this.lastMoveTarget = Point.NaN, this.movePath = [], this.prevLocation = Point.NaN, this.delayAttractFromMoving = !1, this.delayAttractFromPrototick = !1, this.hasMovedThisTick = !1, this.action = GameAction.idle()
        }, i.prototype.stepMove = function(t) {
            if (this.movePath.length > 0) {
                var i = this.movePath.shift();
                this.movePath.length > 0 && this.run && (i = this.movePath.shift()), void 0 !== i && (this.location = i, this.hasMovedThisTick = !0, t || (this.delayAttractFromMoving = !0))
            }
        }, i.prototype.step = function() {
            if (this.action || (this.action = GameAction.idle()), this.action.toggleRun && (this.run = !this.run), this.prevLocation = this.location, this.isAttracting = !1, this.hasMovedThisTick = !1, null !== this.forceAttractOrb) {
                var t = this.action.toggleRun,
                    i = this.action.changeWand;
                this.action = this.previousAction.copy(), this.action.toggleRun = t, this.action.changeWand = i
            }
            this.action.type === ActionType.Move && this.location.equals(this.action.location) && (this.action = GameAction.idle(this.action.toggleRun, this.action.changeWand));
            var e = !1;
            switch (this.action.type) {
                case ActionType.Idle:
                    this.stopAttracting(), this.delayAttractFromMoving = !1, this.delayAttractFromPrototick = !1, this.lastMoveTarget = Point.NaN, this.lastAttractTarget = Point.NaN;
                    break;
                case ActionType.Move:
                    this.stopAttracting(), this.lastAttractTarget = Point.NaN, this.delayAttractFromPrototick = !1, this.lastMoveTarget.equals(this.action.location) || (this.movePath = this.gs.board.getPlayerPath(this.location, this.action.location, !1), this.lastMoveTarget = this.action.location), 0 === this.movePath.length ? (this.lastMoveTarget = Point.NaN, this.action = GameAction.idle(this.action.toggleRun, this.action.changeWand), this.delayAttractFromMoving = !1) : this.stepMove(!1);
                    break;
                case ActionType.Attract:
                    this.lastMoveTarget = Point.NaN, this.previousAction && this.previousAction.type === ActionType.Attract && this.previousAction.orbIndex === this.action.orbIndex || (this.action.isNewAttract = !0);
                    var o = this.gs.orbs[this.action.orbIndex];
                    null === this.forceAttractOrb && (this.action.isNewAttract || this.gs.board.canReach(this.location, o.location, this.repel)) || (this.stepAttract(!1), e = !0), this.forceAttractOrb = null;
                    break;
                default:
                    console.warn("Deobfuscated is a noob!")
            }
            this.action.changeWand && (this.repel = !this.repel), this.action.type === ActionType.Attract && this.stepAttract(e), this.previousAction = this.action
        }, i.prototype.forceAttractNextTick = function(t) {
            this.delayAttractFromPrototick && this.currentOrb !== t || (this.forceAttractOrb = t)
        }, i.prototype.stepAttract = function(t) {
            var i = this.gs.board,
                e = this.gs.orbs[this.action.orbIndex],
                o = i.canReach(this.location, e.location, this.repel);
            if (!Point.isNaN(e.location)) {
                if (null !== this.forceAttractOrb) return void this.attractSuccess(e);
                this.action.isNewAttract && (this.holdLength = 0, this.currentOrb = null, this.attractIneffective = !1, this.lastOrbClickLocation = e.location), o ? this.delayAttractFromMoving || this.delayAttractFromPrototick ? this.delayAttractFromPrototick ? this.delayAttractFromPrototick = !1 : (this.delayAttractFromPrototick = !1, this.forceAttractNextTick(e)) : this.attractSuccess(e) : (Point.isNaN(this.lastOrbClickLocation) && (this.lastOrbClickLocation = e.location), this.lastOrbClickLocation.equals(this.lastAttractTarget) || (this.movePath = this.gs.board.getPlayerPath(this.location, this.lastOrbClickLocation, !0), this.lastAttractTarget = this.lastOrbClickLocation), 0 === this.movePath.length && (this.movePath = this.gs.board.getPlayerPath(this.location, e.location, !0)), this.hasMovedThisTick || this.stepMove(t), i.canReach(this.location, e.location, this.repel) && this.forceAttractNextTick(e), t || (this.delayAttractFromPrototick = !1)), i.canReach(this.location, e.location, this.repel) && this.currentOrb === e && this.attractSuccess(e), this.action.isNewAttract && (this.action = this.action.copy(), this.action.isNewAttract = !1), this.hasMovedThisTick ? t || (this.delayAttractFromMoving = !0) : this.delayAttractFromMoving = !1
            }
        }, i.prototype.attractSuccess = function(t) {
            this.forceAttractOrb = null;
            var i = !1,
                e = GopBoard.getOrbOffset(this.location.subtract(t.location), !this.repel);
            this.repel && (Point.walkingDistance(this.location, t.location) >= this.gs.board.reachDistance - 2 ? i = !0 : e = e.negate()), this.isAttractIneffective(t) && (this.attractIneffective = !0), this.attractIneffective || i || (t.wasTouchedThisTick = !0, t.controllingPlayer = this, t.controlState = OrbControlState.Controlled, t.target = t.location.add(e)), this.currentOrb = t, this.lastOrbClickLocation = t.location, this.action.isNewAttract ? this.holdLength = 1 : this.isAttracting || this.holdLength++, this.delayAttractFromPrototick = 1 === this.holdLength, this.isAttracting = !0
        }, i.prototype.isAttractIneffective = function(t) {
            return t.controllingPlayer !== this && null !== t.controllingPlayer && t.controlState !== OrbControlState.Free && (!Point.isNaN(t.target) || t.controlState !== OrbControlState.Wait2 && this.index < t.controllingPlayer.index)
        }, i
    }(GopObject),
    GameState = function() {
        function t(i, e, o, n, s, r, a) {
            void 0 === o && (o = []), void 0 === n && (n = t.defaults.numberOfOrbs), void 0 === s && (s = t.defaults.seed), void 0 === r && (r = t.defaults.altar), void 0 === a && (a = t.defaults.respawnOrbs), this.board = i, this.playerLocations = e, this.presetSpawns = o, this.numberOfOrbs = n, this.seed = s, this.altar = r, this.respawnOrbs = a, this.players = [], this.orbs = [], this.random = new MersenneTwister, this.scoredTicks = [], this.score = 0, this.currentTick = 0;
            for (var h = 0; h < this.numberOfOrbs; ++h) this.orbs[h] = new Orb(this, h);
            null != e && 0 !== e.length || (e = t.defaults.playerLocations);
            for (var h = 0; h < e.length; h++) this.players.push(new Player(this, e[h], h));
            this.reset(r)
        }
        return Object.defineProperty(t.prototype, "isFinished", {
            get: function() {
                return this.respawnOrbs ? this.currentTick >= t.ticksPerAltar : this.orbs.every(function(t) {
                    return t.isDead
                })
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.addPlayer = function(t) {
            this.players.push(new Player(this, t, this.players.length))
        }, t.prototype.reset = function(t) {
            void 0 !== t && (this.altar = t), this.board.loadAltar(this.altar), this.presetSpawnStack = this.presetSpawns.slice(0);
            for (var i = 0, e = this.players; i < e.length; i++) {
                var o = e[i];
                o.freeze()
            }
            for (var n = 0, s = this.orbs; n < s.length; n++) {
                var r = s[n];
                r.reset()
            }
            this.seed = this.seed >>> 0 & 2147483647, this.random && this.random.init_genrand(this.seed), this.scoredTicks = [], this.score = 0, this.currentTick = 0, this.orbs.forEach(function(t) {
                return t.spawn(!0)
            })
        }, t.prototype.step = function() {
            this.currentTick++, this.orbs.forEach(function(t) {
                t.wasTouchedThisTick = !1, t.step()
            }), this.players.forEach(function(t) {
                return t.step()
            })
        }, t.prototype.getEstimatedScore = function(i) {
            return void 0 === i && (i = 3), 0 === this.currentTick ? 0 : Math.round(this.score * (t.ticksPerAltar - i) / Math.max(1, this.currentTick - i))
        }, t
    }();
GameState.defaults = {
    ticksPerAltar: 199,
    numberOfOrbs: 3,
    seed: 5489,
    altar: Altar.Air,
    playerLocations: [new Point(0, (-2))],
    respawnOrbs: !0
}, GameState.ticksPerAltar = GameState.defaults.ticksPerAltar;

WebFontConfig = {
    google: { families: [ 'Open+Sans::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

var GopCanvas = function() {
    function t(t, i, e, o, n, s, r) {
        void 0 === n && (n = 2), void 0 === s && (s = 2), void 0 === r && (r = !0), this.fgCanvas = t, this.gameState = i, this.visibilityRadius = e, this.orbSize = n, this.timerRadius = s, this.showTimer = r, this.bgCanvas = document.createElement("canvas"), this.bgContext = this.bgCanvas.getContext("2d"), this.fgContext = this.fgCanvas.getContext("2d"), this.board = this.gameState.board, this.showHighlights = !1, this.showSpawnLocations = !1, this.tickProgress = 0, this.rotationAngle = 0, this.numImagesLoaded = 0, this.numImagesTotal = 7, this.orbImageSrc = "images/yellow-orb-32x32.png", this.alterOverlayImagePath = "images/altar-overlays/", this.altarImages = [], this.player = this.gameState.players[o], this.calculateDimensions(), this.loadImages()
    }
    return t.prototype.getGroundColor = function() {
        var i = AltarData[this.gameState.altar].groundColor;
        return null == i ? t.defaultGroundColor : i instanceof Array ? i[0] : i
    }, t.prototype.getWaterColor = function() {
        var i = AltarData[this.gameState.altar].waterColor;
        return null == i ? t.defaultWaterColor : i.substr(0, 7)
    }, t.prototype.tileColor = function(t, i) {
        var e = this.board.get(new Point(t, i));
        switch (e) {
            case Tile.Floor:
            case Tile.WallW:
            case Tile.WallS:
            case Tile.WallSW:
            case Tile.Minipillar1:
            case Tile.Minipillar2:
                var o = AltarData[this.gameState.altar].groundPattern;
                return void 0 !== o && null !== o ? AltarData[this.gameState.altar].groundColor[o[this.board.ymax - i][t + this.board.xmax]] : this.getGroundColor();
            case Tile.Barrier:
                return "black";
            case Tile.Rock:
                return "#333";
            case Tile.Water:
                return this.getWaterColor();
            default:
                return "#ff0000"
        }
    }, t.prototype.calculateDimensions = function() {
        this.gridSize = 2 * this.visibilityRadius + 1, this.cellWidth = this.fgCanvas.width / this.gridSize, this.cellHeight = this.fgCanvas.height / this.gridSize, this.bgCanvas.width = this.board.numRows * this.cellWidth, this.bgCanvas.height = this.board.numColumns * this.cellHeight
    }, t.prototype.getDrawLocation = function(t) {
        return t.getDrawLocation(this.tickProgress)
    }, t.prototype.toBgScreenCoords = function(t, i) {
        return new Point((t + Math.floor(this.board.numColumns / 2)) * this.cellWidth, (-i + Math.floor(this.board.numRows / 2)) * this.cellHeight)
    }, t.prototype.toScreenCoords = function(t, i, e) {
        if (void 0 === e && (e = !1), e) {
            var o = this.getDrawLocation(this.player);
            return new Point((t - o.x + this.visibilityRadius) * this.cellWidth, (-i + o.y + this.visibilityRadius) * this.cellHeight)
        }
        return new Point((t + this.visibilityRadius) * this.cellWidth, (-i + this.visibilityRadius) * this.cellHeight)
    }, t.prototype.fromScreenCoords = function(t, i, e) {
        void 0 === e && (e = !0);
        var o = this.getDrawLocation(this.player),
            n = new Point(t / this.cellWidth - this.visibilityRadius - .5, -i / this.cellHeight + this.visibilityRadius + .5),
            s = new Point(n.x * Math.cos(this.rotationAngle) - n.y * Math.sin(this.rotationAngle), n.x * Math.sin(this.rotationAngle) + n.y * Math.cos(this.rotationAngle)),
            r = new Point(s.x + o.x, s.y + o.y);
        return e ? new Point(Math.floor(r.x + .5), Math.ceil(r.y - .5)) : new Point(r.x, r.y)
    }, t.prototype.bgFillSquare = function(t, i, e, o, n) {
        void 0 === n && (n = 0);
        var s = this.toBgScreenCoords(e, o);
        t.fillStyle = i, t.fillRect(s.x, s.y, this.cellWidth + n, this.cellHeight + n)
    }, t.prototype.fillSquare = function(t, i, e, o, n) {
        void 0 === n && (n = 0);
        var s = this.toScreenCoords(e, o);
        t.fillStyle = i, t.fillRect(s.x, s.y, this.cellWidth + n, this.cellHeight + n);
    }, t.prototype.fillSquareWithImage = function(t, i, e, o) {
        var n = this.toScreenCoords(i, e, !0);
        this.fgContext.drawImage(this.orbImage, n.x - .5 * (o - 1) * this.cellWidth, n.y - .5 * (o - 1) * this.cellHeight, o * this.cellWidth, o * this.cellHeight)
    }, t.prototype.drawWalls = function(t) {
        var i = this.board.get(t);
        if (!(i < Tile.WallW)) {
            var e = this.toBgScreenCoords(t.x, t.y);
            i === Tile.WallS ? (this.bgContext.beginPath(), this.bgContext.moveTo(e.x, e.y + this.cellHeight), this.bgContext.lineTo(e.x + this.cellWidth, e.y + this.cellHeight), this.bgContext.stroke()) : i === Tile.WallW ? (this.bgContext.beginPath(), this.bgContext.moveTo(e.x, e.y), this.bgContext.lineTo(e.x, e.y + this.cellHeight), this.bgContext.stroke()) : i === Tile.WallSW ? (this.bgContext.beginPath(), this.bgContext.moveTo(e.x, e.y), this.bgContext.lineTo(e.x, e.y + this.cellHeight), this.bgContext.lineTo(e.x + this.cellWidth, e.y + this.cellHeight), this.bgContext.stroke()) : i >= Tile.Minipillar1 && (this.bgContext.fillStyle = "black", this.bgContext.fillRect(e.x - 3, e.y + this.cellHeight - 3, 5, 5))
        }
    }, t.prototype.paintBackground = function() {
        this.bgContext.fillStyle = this.getGroundColor(), this.bgContext.fillRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
        for (var i = -this.board.ymax; i <= this.board.ymax; i++)
            for (var e = -this.board.xmax; e <= this.board.xmax; e++) {
                var o = this.tileColor(e, i);
                o !== this.getGroundColor() && this.bgFillSquare(this.bgContext, o, e, i, 0)
            }
        this.bgContext.lineWidth = 1, this.bgContext.strokeStyle = t.gridlineColor, this.bgContext.beginPath();
        for (var e = 1; e <= this.board.numColumns; ++e) this.bgContext.moveTo(e * this.cellWidth - .5, 0), this.bgContext.lineTo(e * this.cellWidth - .5, this.bgCanvas.height);
        for (var i = 0; i < this.board.numRows; ++i) this.bgContext.moveTo(0, i * this.cellHeight - .5), this.bgContext.lineTo(this.bgCanvas.width, i * this.cellHeight - .5);
        this.bgContext.stroke(), this.bgContext.strokeStyle = "black", this.bgContext.lineWidth = 3;
        for (var e = -this.board.xmax; e <= this.board.xmax; ++e)
            for (var i = -this.board.ymax; i <= this.board.ymax; ++i) this.drawWalls(new Point(e, i));
        if (this.gameState.altar > 0 && this.gameState.altar <= this.altarImages.length) {
            var n = this.toBgScreenCoords(-1, 1),
                s = this.cellWidth / 3;
            this.bgContext.drawImage(this.altarImages[this.gameState.altar - 1], n.x + s, n.y + s, 3 * this.cellWidth - 2 * s, 3 * this.cellHeight - 2 * s)
        }
    }, t.prototype.drawHUD = function() {
        this.drawRunRepelIndicators(), this.drawTimerAndScore()
    }, t.prototype.drawRunRepelIndicators = function() {
        var t = this.fgCanvas.width - 20,
            i = 30;
        this.fgContext.textAlign = "right", this.fgContext.font = "24px Open Sans", this.fgContext.fillStyle = this.player.run ? "#ddeedd" : "#ccbbbb";
        var e = "Run " + (this.player.run ? "on" : "off");
        this.fgContext.fillText(e, t, i), this.fgContext.fillStyle = this.player.repel ? "#ddeedd" : "#ccbbbb";
        var o = "Repel " + (this.player.repel ? "on" : "off");
        this.fgContext.fillText(o, t, i + 30)
    }, t.prototype.drawTimerAndScore = function() {
        var t = GameState.ticksPerAltar - 3,
            i = this.timerRadius * this.cellWidth,
            e = this.fgCanvas.width - i - 30,
            o = this.fgCanvas.height - i - 75;
        this.fgContext.lineWidth = 2, this.fgContext.strokeStyle = "rgba(255, 255, 0, 0.1)", this.fgContext.beginPath(), this.fgContext.arc(e, o, i, 0, 2 * Math.PI), this.fgContext.stroke(), !this.isRunning && this.gameState.currentTick > 0 ? (this.fgContext.fillStyle = "rgba(0, 255, 0, 0.1)", this.fgContext.moveTo(e, o), this.fgContext.arc(e, o, i, 0, 2 * Math.PI), this.fgContext.fill()) : this.gameState.currentTick < t && (this.fgContext.fillStyle = this.gameState.currentTick >= .75 * t ? "rgba(255, 0, 0, 0.1)" : "rgba(255, 255, 0, 0.1)", this.fgContext.beginPath(), this.fgContext.moveTo(e, o), this.fgContext.arc(e, o, i, -Math.PI / 2, -Math.PI / 2 - 2 * Math.PI * (1 - this.gameState.currentTick / t), !0), this.fgContext.lineTo(e, o), this.fgContext.fill()), this.fgContext.textAlign = "center", this.fgContext.textBaseline = "middle", this.fgContext.font = "20px Open Sans", this.fgContext.fillStyle = "#ffff80", this.fgContext.fillText(this.gameState.currentTick.toString(), e, o), this.fgContext.font = "24px Open Sans", this.fgContext.fillStyle = "#eeeeee", this.fgContext.fillText(this.gameState.score.toString(), e, o + i + 24), this.fgContext.font = "16px Open Sans", this.fgContext.fillStyle = "#ccccdd", this.fgContext.fillText("Estimated: " + this.gameState.getEstimatedScore().toString(), e, o + i + 48)
    }, t.prototype.paint = function() {
        var i = this,
            e = null == this.player ? Point.zero : this.getDrawLocation(this.player);
        0 !== this.rotationAngle && (this.fgContext.save(), this.fgContext.translate(this.fgCanvas.width / 2, this.fgCanvas.height / 2), this.fgContext.rotate(this.rotationAngle), this.fgContext.translate(-this.fgCanvas.width / 2, -this.fgCanvas.height / 2)), this.fgContext.clearRect(0, 0, this.fgCanvas.width, this.fgCanvas.height), this.fgContext.save(), this.fgContext.translate((-e.x - (26 - this.visibilityRadius)) * this.cellWidth, (e.y - (26 - this.visibilityRadius)) * this.cellHeight), this.fgContext.drawImage(this.bgCanvas, 0, 0), this.fgContext.restore(), this.gameState.players.forEach(function(o, n) {
            var s = i.getDrawLocation(o);
            if (o.isAttracting && null !== o.currentOrb) {
                var r = i.getDrawLocation(o.currentOrb),
                    a = o.repel ? Point.lerp(s, r, i.tickProgress) : Point.lerp(r, s, i.tickProgress),
                    h = i.toScreenCoords(a.x + .5, a.y - .5, !0);
                i.fgContext.beginPath(), i.fgContext.arc(Math.floor(h.x), Math.floor(h.y), i.cellWidth / 8, 0, 2 * Math.PI), i.fgContext.fillStyle = "rgba(255, 255, 0, 0.5)", i.fgContext.fill()
            }
            i.fillSquare(i.fgContext, o.isAttracting ? t.playerAttractingColors[n] : t.playerIdleColors[n], s.x - e.x, s.y - e.y, -1)
        }, this);
        for (var o = 0; o < this.gameState.orbs.length; ++o)
            if (!Point.isNaN(this.gameState.orbs[o].location)) {
                var n = this.getDrawLocation(this.gameState.orbs[o]);
                this.fgContext.save();
                var s = this.toScreenCoords(n.x + .5, n.y - .5, !0);
                this.fgContext.translate(s.x, s.y), this.fgContext.rotate(-this.rotationAngle), this.fgContext.translate(-s.x, -s.y), this.fillSquareWithImage(this.orbImageSrc, n.x, n.y, this.orbSize), this.fgContext.restore()
            }
        this.fgContext.restore(), this.showTimer && this.drawHUD()
    }, t.prototype.loadImages = function() {
        var i = ["air", "mind", "water", "earth", "fire", "body"];
        this.orbImage = this.loadImage(this.orbImageSrc);
        for (var e = 0; e < t.numAltars; ++e) this.altarImages[e] = this.loadImage(this.alterOverlayImagePath + i[e] + ".png")
    }, t.prototype.loadImage = function(t) {
        var i = this,
            e = new Image;
        return e.src = t, e.onload = function() {
            ++i.numImagesLoaded, i.numImagesLoaded === i.numImagesTotal && i.onAllImagesLoaded()
        }, e
    }, t.prototype.onAllImagesLoaded = function() {
        this.paintBackground(), this.paint()
    }, t
}();
GopCanvas.numAltars = 6, GopCanvas.defaultGroundColor = "#848899", GopCanvas.defaultWaterColor = "#002244", GopCanvas.highlightColor = "rgba(0, 255, 0, 0.05)", GopCanvas.playerIdleColors = ["#109090", "#871450", "#148718", "#630D0D"], GopCanvas.playerAttractingColors = ["#20c0c0", "#a74470", "#4BD650", "#CC3B3B"], GopCanvas.gridlineColor = "rgba(0, 0, 0, 0.25)";
var PlayerStartInfo = function() {
        function t(t, i, e) {
            this.location = t, this.run = i, this.repel = e
        }
        return t.prototype.toString = function() {
            return this.location.toString() + (this.run ? "r" : "") + (this.repel ? "q" : "")
        }, t.parse = function(i) {
            var e = Point.parse(i.substring(0, i.indexOf(")") + 1)),
                o = i.indexOf("r") !== -1,
                n = i.indexOf("q") !== -1;
            return new t(e, o, n)
        }, t
    }(),
    GameStartInfo = function() {
        function t(t, i, e) {
            this.seed = t, this.altar = i, this.players = e
        }
        return t.prototype.toString = function() {
            var t = [this.seed, this.altar];
            return this.players.forEach(function(i) {
                t.push(i.toString())
            }), "{" + t.join(" ") + "}"
        }, t.parse = function(i) {
            for (var e = i.split(" "), o = +e[0], n = +e[1], s = [], r = 2; r < e.length; r++) s.push(PlayerStartInfo.parse(e[r]));
            return new t(o, n, s)
        }, t.default = function() {
            return new t(5489, Altar.Air, [new PlayerStartInfo(new Point(2, 0), (!0), (!1))])
        }, t
    }(),
    GameActionList = function() {
        function t(t) {
            this.rawActions = t
        }
        return t.prototype.getForPlayer = function(t) {
            return this.rawActions[t]
        }, t.prototype.numPlayers = function() {
            return this.rawActions.length
        }, t.prototype.push = function(t) {
            if (t.length !== this.numPlayers()) throw new Error("Action size mismatch.");
            for (var i = 0; i < this.rawActions.length; i++) this.rawActions[i].push(t[i])
        }, t.prototype.pushForPlayer = function(t, i) {
            this.rawActions[t].push(i)
        }, t.prototype.sliceForPlayer = function(t, i) {
            this.rawActions[t] = this.rawActions[t].slice(0, i)
        }, t.prototype.toString = function() {
            function t(t, i) {
                var e = new Array(i + 1).join(t),
                    o = t + "[" + i + "]";
                return e.length < o.length ? e : o
            }

            function i(i) {
                var e = "";
                if (i.length > 0) {
                    for (var o = 1, n = i[0].toString(), s = 1; s < i.length && i[s]; s++) {
                        var r = i[s].toString();
                        r !== n || i[s].toggleRun || i[s].changeWand || i[s].isNewAttract ? (e += t(n, o), o = 1) : ++o, n = r
                    }
                    e += t(n, o)
                }
                return e
            }
            return this.rawActions.length > 1 ? "[" + this.rawActions.map(function(t) {
                return i(t)
            }).join(";") + "]" : this.rawActions.length > 0 ? i(this.rawActions[0]) : ""
        }, t.parse = function(i) {
            function e(t) {
                var i = [],
                    e = /(\*|{r}|{q})*(-|[A-Za-z]|\(-?\d+,-?\d+\))(\[\d+\])?/g,
                    o = t.match(e);
                return null === o ? i : (t.match(e).forEach(function(t) {
                    var e = 1,
                        o = t;
                    if ("]" === t[t.length - 1]) {
                        var n = t.indexOf("["),
                            s = t.length - 1;
                        o = t.substring(0, n), e = parseInt(t.substring(n + 1, s), 10)
                    }
                    var r = GameAction.parse(o);
                    for (i.push(r); --e > 0;) i.push(r.copy(!0))
                }), i)
            }
            if ("[" === i[0]) {
                var o = i.substring(1, i.length - 1).split(";"),
                    n = o.map(e);
                return new t(n)
            }
            return new t([e(i)])
        }, t
    }(),
    GameplayData = function() {
        function t(t, i) {
            if (this.startInfo = t, this.actions = i, null == i) {
                for (var e = [], o = 0; o < t.players.length; o++) e.push([]);
                this.actions = new GameActionList(e)
            }
        }
        return t.prototype.pushActions = function(t) {
            this.actions.push(t)
        }, t.prototype.toString = function() {
            return this.startInfo.toString() + this.actions.toString()
        }, t.parse = function(i) {
            var e, o;
            if ("{" === i[0]) {
                var n = i.indexOf("}"),
                    s = i.substring(1, n);
                e = GameStartInfo.parse(s), i = i.substring(n + 1)
            } else e = GameStartInfo.default();
            return o = GameActionList.parse(i), new t(e, o)
        }, t.default = function() {
            return new t(GameStartInfo.default())
        }, t
    }();