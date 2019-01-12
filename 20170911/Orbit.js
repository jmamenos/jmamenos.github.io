var Orbit = function(r, v) {
	this.r = r;
	this.v = v;
	this.h = math.cross(this.r, this.v);
	this.u = 1;
	this.p = math.pow(m(this.h), 2) / this.u;
	this.e = math.multiply(math.divide(1, this.u), math.subtract(math.multiply(math.subtract(math.pow(m(this.v), 2), math.divide(this.u, m(this.r))), this.r), math.multiply(math.dot(this.r, this.v), this.v)));
	this.a = this.p / (1 - math.pow(m(this.e), 2));
	this.i = math.acos(this.h.valueOf()[2] / m(this.h)) * 180 / Math.PI;
	this.n = math.cross([0, 0, 1], this.h);
	if (math.round(m(this.n), 4) === 0) {
		this.o = undefined;
	} else if (this.n.valueOf()[1] < 0) {
		this.o = 360 - math.acos((this.n.valueOf()[0] / m(this.n)).clamp(-1, 1)) * 180 / Math.PI;
	} else {
		this.o = math.acos((this.n.valueOf()[0] / m(this.n)).clamp(-1, 1)) * 180 / Math.PI;
	}
	if (math.round(m(this.n), 4) * math.round(m(this.e), 4) === 0) {
		this.w = undefined;
	} else if (this.e.valueOf()[2] < 0) {
		this.w = 360 - math.acos((math.dot(this.n, this.e) / (m(this.n) * m(this.e))).clamp(-1, 1)) * 180 / Math.PI;
	} else {
		this.w = math.acos((math.dot(this.n, this.e) / (m(this.n) * m(this.e))).clamp(-1, 1)) * 180 / Math.PI;
	}
	if (math.round(m(this.e), 4) * math.round(m(this.r), 4) === 0) {
		this.vo = undefined;
	} else if (math.dot(this.r, this.v) < 0) {
		this.vo = 360 - math.acos((math.dot(this.e, this.r) / (m(this.e) * m(this.r))).clamp(-1, 1)) * 180 / Math.PI;
	} else {
		this.vo = math.acos((math.dot(this.e, this.r) / (m(this.e) * m(this.r))).clamp(-1, 1)) * 180 / Math.PI;
	}
}
Number.prototype.clamp = function(min, max) {
	return Math.min(Math.max(this, min), max);
};
Orbit.prototype.r = this.r;
Orbit.prototype.v = this.v;
Orbit.prototype.h = this.h;
Orbit.prototype.u = this.u;
Orbit.prototype.p = this.p;
Orbit.prototype.e = this.e;
Orbit.prototype.a = this.a;
Orbit.prototype.i = this.i;
Orbit.prototype.n = this.n;
Orbit.prototype.o = this.o;
Orbit.prototype.w = this.w;
Orbit.prototype.vo = this.vo;