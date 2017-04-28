/**
 * @file Vector4
 * @see uon.math.Vector4
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
//const Matrix4 = require('./Matrix4');
var ZERO_F32 = Math.fround(0);
var ONE_F32 = Math.fround(1);
var f32 = Math.fround;
/**
 * An representation of a 4D vector
 */
var Vector4 = (function () {
    /**
     * @constructs
     */
    function Vector4(x, y, z, w) {
        this.x = ZERO_F32;
        this.y = ZERO_F32;
        this.z = ZERO_F32;
        this.w = ONE_F32;
        if (arguments.length >= 3) {
            this.x = f32(x);
            this.y = f32(y);
            this.z = f32(z);
            this.w = w !== undefined ? f32(w) : ONE_F32;
        }
        else if (Array.isArray(x)) {
            this.x = f32(x[0]);
            this.y = f32(x[1]);
            this.z = f32(x[2]);
            this.w = f32(x[3]);
        }
        else if (x instanceof Vector4) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
            this.z = x.w;
        }
    }
    Vector4.prototype.set = function (x, y, z, w) {
        this.x = f32(x);
        this.y = f32(y);
        this.z = f32(z);
        this.w = f32(w);
        return this;
    };
    Vector4.prototype.equals = function (v) {
        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z) && (v.w === this.w));
    };
    Vector4.prototype.negate = function () {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;
        return this;
    };
    Vector4.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;
        return this;
    };
    Vector4.prototype.subtract = function (v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;
        return this;
    };
    Vector4.prototype.multiply = function (v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        this.w *= v.w;
        return this;
    };
    Vector4.prototype.multiplyScalar = function (s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        this.w *= s;
        return this;
    };
    Vector4.prototype.divide = function (v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        this.w /= v.w;
        return this;
    };
    Vector4.prototype.divideScalar = function (scalar) {
        if (scalar !== 0) {
            var inv = 1 / scalar;
            this.x *= inv;
            this.y *= inv;
            this.z *= inv;
            this.w *= inv;
        }
        else {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 1;
        }
        return this;
    };
    Vector4.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    };
    Vector4.prototype.length = function () {
        return Math.sqrt(this.lengthSq());
    };
    Vector4.prototype.lengthSq = function () {
        var a = this;
        return a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
    };
    Vector4.prototype.normalize = function () {
        var len = this.length();
        return this.divideScalar(len);
    };
    Vector4.prototype.lerp = function (v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        this.w += (v.w - this.w) * alpha;
        return this;
    };
    Vector4.prototype.min = function (v) {
        if (this.x > v.x)
            this.x = v.x;
        if (this.y > v.y)
            this.y = v.y;
        if (this.z > v.z)
            this.z = v.z;
        if (this.w > v.w)
            this.w = v.w;
        return this;
    };
    Vector4.prototype.max = function (v) {
        if (this.x < v.x)
            this.x = v.x;
        if (this.y < v.y)
            this.y = v.y;
        if (this.z < v.z)
            this.z = v.z;
        if (this.w < v.w)
            this.w = v.w;
        return this;
    };
    Vector4.prototype.clone = function () {
        return new Vector4(this);
    };
    Vector4.prototype.copy = function (x) {
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
        this.w = x.w;
        return this;
    };
    Vector4.prototype.fromArray = function (array, offset) {
        if (offset === undefined)
            offset = 0;
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        this.w = array[offset + 3];
        return this;
    };
    Vector4.prototype.toArray = function (array, offset) {
        if (array === undefined)
            array = [];
        if (offset === undefined)
            offset = 0;
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.w;
        return array;
    };
    Vector4.prototype.toFloatArray = function () {
        if (this._cache == null) {
            this._cache = new Float32Array(4);
        }
        this._cache[0] = this.x;
        this._cache[1] = this.y;
        this._cache[2] = this.z;
        this._cache[3] = this.w;
        return this._cache;
    };
    return Vector4;
}());
export { Vector4 };
// static 
Vector4.UnitX = new Vector4(1, 0, 0);
Vector4.UnitY = new Vector4(0, 1, 0);
Vector4.UnitZ = new Vector4(0, 0, 1);
Vector4.UnitW = new Vector4(0, 0, 0, 1);
Vector4.One = new Vector4(1, 1, 1);
Vector4.Zero = new Vector4(0, 0, 0, 0);
;
//# sourceMappingURL=Vector4.js.map