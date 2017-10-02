/**
 * @file Vector3
 * @see uon.math.Vector3
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
var ZERO_F32 = Math.fround(0);
var ONE_F32 = Math.fround(1);
var f32 = Math.fround;
/**
 * A representation of a 3D vector
 */
var Vector3 = (function () {
    /**
     * @constructs
     */
    function Vector3(x, y, z) {
        // members
        this.x = ZERO_F32;
        this.y = ZERO_F32;
        this.z = ZERO_F32;
        var v = this;
        if (arguments.length == 3) {
            v.x = f32(x);
            v.y = f32(y);
            v.z = f32(z);
        }
        else if (Array.isArray(x)) {
            v.x = f32(x[0]);
            v.y = f32(x[1]);
            v.z = f32(x[2]);
        }
        else if (x instanceof Vector3) {
            v.x = x.x;
            v.y = x.y;
            v.z = x.z;
        }
    }
    Vector3.prototype.set = function (x, y, z) {
        this.x = f32(x);
        this.y = f32(y);
        this.z = f32(z);
        return this;
    };
    Vector3.prototype.equals = function (v) {
        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));
    };
    Vector3.prototype.negate = function () {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    };
    Vector3.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    };
    Vector3.prototype.subtract = function (v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    };
    Vector3.prototype.multiply = function (v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    };
    Vector3.prototype.multiplyScalar = function (s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    };
    Vector3.prototype.divide = function (v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
    };
    Vector3.prototype.divideScalar = function (scalar) {
        if (scalar !== 0) {
            var inv = 1 / scalar;
            this.x *= inv;
            this.y *= inv;
            this.z *= inv;
        }
        else {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
        return this;
    };
    Vector3.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    };
    Vector3.prototype.cross = function (v) {
        var x = this.x, y = this.y, z = this.z;
        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;
        return this;
    };
    Vector3.prototype.applyMatrix3 = function (m) {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var e = m.elements;
        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.y = e[1] * x + e[4] * y + e[7] * z;
        this.z = e[2] * x + e[5] * y + e[8] * z;
        return this;
    };
    Vector3.prototype.applyMatrix4 = function (m) {
        var x = this.x, y = this.y, z = this.z;
        var e = m.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
        this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
        this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
        var w = e[3] * x + e[7] * y + e[11] * z + e[15];
        return this.divideScalar(w);
    };
    Vector3.prototype.applyMatrix4Proj = function (m) {
        var x = this.x, y = this.y, z = this.z;
        var e = m.elements;
        var d = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]); // perspective
        // divide
        this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * d;
        this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * d;
        this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * d;
        return this;
    };
    Vector3.prototype.applyQuaternion = function (q) {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var qx = q.x;
        var qy = q.y;
        var qz = q.z;
        var qw = q.w;
        var ix = qw * x + qy * z - qz * y;
        var iy = qw * y + qz * x - qx * z;
        var iz = qw * z + qx * y - qy * x;
        var iw = -qx * x - qy * y - qz * z;
        this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return this;
    };
    Vector3.prototype.distanceTo = function (v) {
        return Math.sqrt(this.distanceToSquared(v));
    };
    Vector3.prototype.distanceToSquared = function (v) {
        var dx = this.x - v.x;
        var dy = this.y - v.y;
        var dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz;
    };
    Vector3.prototype.length = function () {
        return Math.sqrt(this.lengthSq());
    };
    Vector3.prototype.lengthSq = function () {
        var a = this;
        return a.x * a.x + a.y * a.y + a.z * a.z;
    };
    Vector3.prototype.normalize = function () {
        var len = this.length();
        return this.divideScalar(len);
    };
    Vector3.prototype.lerp = function (v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        return this;
    };
    Vector3.prototype.min = function (v) {
        if (this.x > v.x)
            this.x = v.x;
        if (this.y > v.y)
            this.y = v.y;
        if (this.z > v.z)
            this.z = v.z;
        return this;
    };
    Vector3.prototype.max = function (v) {
        if (this.x < v.x)
            this.x = v.x;
        if (this.y < v.y)
            this.y = v.y;
        if (this.z < v.z)
            this.z = v.z;
        return this;
    };
    Vector3.prototype.clone = function () {
        return new Vector3(this);
    };
    Vector3.prototype.copy = function (x) {
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
        return this;
    };
    Vector3.prototype.fromArray = function (array, offset) {
        if (offset === undefined)
            offset = 0;
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        return this;
    };
    Vector3.prototype.toArray = function (array, offset) {
        if (array === undefined)
            array = [];
        if (offset === undefined)
            offset = 0;
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        return array;
    };
    Vector3.prototype.toFloatArray = function () {
        if (this._cache == null) {
            this._cache = new Float32Array(3);
        }
        this._cache[0] = this.x;
        this._cache[1] = this.y;
        this._cache[2] = this.z;
        return this._cache;
    };
    /**
     * Utility function for adding 2 vectors together, returns a new instance of Vector2
     * @param p1
     * @param p2
     */
    Vector3.Add = function (p1, p2) {
        return p1.clone().add(p2);
    };
    /**
     * Subtract a vector from another
     * @param p1
     * @param p2
     */
    Vector3.Sub = function (p1, p2) {
        return p1.clone().subtract(p2);
    };
    /**
     * Get the middle point between 2 vectors
     * @param p1
     * @param p2
     */
    Vector3.Middle = function (p1, p2) {
        return this.Add(p1, p2).multiplyScalar(0.5);
    };
    Vector3.Lerp = function (v0, v1, t, out) {
        var x = (1 - t) * v0.x + t * v1.x;
        var y = (1 - t) * v0.y + t * v1.y;
        var z = (1 - t) * v0.z + t * v1.z;
        out.set(x, y, z);
    };
    return Vector3;
}());
export { Vector3 };
Vector3.UnitX = new Vector3(1, 0, 0);
Vector3.UnitY = new Vector3(0, 1, 0);
Vector3.UnitZ = new Vector3(0, 0, 1);
Vector3.One = new Vector3(1, 1, 1);
Vector3.Zero = new Vector3(0, 0, 0);
;
//# sourceMappingURL=Vector3.js.map