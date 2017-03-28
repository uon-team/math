/**
 * @file Vector3
 * @see uon.math.Vector3
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
const ZERO_F32 = Math.fround(0);
const ONE_F32 = Math.fround(0);
const f32 = Math.fround;
/**
 * A representation of a 3D vector
 */
export class Vector3 {
    /**
     * @constructs
     */
    constructor(x, y, z) {
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
    set(x, y, z) {
        this.x = f32(x);
        this.y = f32(y);
        this.z = f32(z);
        return this;
    }
    equals(v) {
        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }
    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }
    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    }
    multiplyScalar(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    }
    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
    }
    divideScalar(scalar) {
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
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    cross(v) {
        var x = this.x, y = this.y, z = this.z;
        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;
        return this;
    }
    applyMatrix3(m) {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var e = m.elements;
        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.y = e[1] * x + e[4] * y + e[7] * z;
        this.z = e[2] * x + e[5] * y + e[8] * z;
        return this;
    }
    applyMatrix4(m) {
        var x = this.x, y = this.y, z = this.z;
        var e = m.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
        this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
        this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
        return this;
    }
    applyMatrix4Proj(m) {
        var x = this.x, y = this.y, z = this.z;
        var e = m.elements;
        var d = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]); // perspective
        // divide
        this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * d;
        this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * d;
        this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * d;
        return this;
    }
    applyQuaternion(q) {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var qx = q.x;
        var qy = q.y;
        var qz = q.z;
        var qw = q.w;
        // calculate quat * vector
        var ix = qw * x + qy * z - qz * y;
        var iy = qw * y + qz * x - qx * z;
        var iz = qw * z + qx * y - qy * x;
        var iw = -qx * x - qy * y - qz * z;
        // calculate result * inverse quat
        this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return this;
    }
    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }
    distanceToSquared(v) {
        var dx = this.x - v.x;
        var dy = this.y - v.y;
        var dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz;
    }
    length() {
        return Math.sqrt(this.lengthSq());
    }
    lengthSq() {
        var a = this;
        return a.x * a.x + a.y * a.y + a.z * a.z;
    }
    normalize() {
        var len = this.length();
        return this.divideScalar(len);
    }
    lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        return this;
    }
    min(v) {
        if (this.x > v.x)
            this.x = v.x;
        if (this.y > v.y)
            this.y = v.y;
        if (this.z > v.z)
            this.z = v.z;
        return this;
    }
    max(v) {
        if (this.x < v.x)
            this.x = v.x;
        if (this.y < v.y)
            this.y = v.y;
        if (this.z < v.z)
            this.z = v.z;
        return this;
    }
    clone() {
        return new Vector3(this);
    }
    copy(x) {
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
        return this;
    }
    fromArray(array, offset) {
        if (offset === undefined)
            offset = 0;
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        return this;
    }
    toArray(array, offset) {
        if (array === undefined)
            array = [];
        if (offset === undefined)
            offset = 0;
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        return array;
    }
    toFloatArray() {
        if (this._cache == null) {
            this._cache = new Float32Array(3);
        }
        this._cache[0] = this.x;
        this._cache[1] = this.y;
        this._cache[2] = this.z;
        return this._cache;
    }
}
Vector3.UnitX = new Vector3(1, 0, 0);
Vector3.UnitY = new Vector3(0, 1, 0);
Vector3.UnitZ = new Vector3(0, 0, 1);
Vector3.One = new Vector3(1, 1, 1);
Vector3.Zero = new Vector3(0, 0, 0);
;
//# sourceMappingURL=Vector3.js.map