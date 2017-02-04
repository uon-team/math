/**
 * @file Vector4
 * @see uon.math.Vector4
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

"use strict";

const Matrix4 = require('./Matrix4');


const ZERO_F32 = Math.fround(0);
const ONE_F32 = Math.fround(0);
const f32 = Math.fround;


/**
 * @memberOf uon.math
 */
class Vector4 {

	/**
	 * @constructs
	 */
    constructor(x, y, z, w) {

        this.x = ZERO_F32;
        this.y = ZERO_F32;
        this.z = ZERO_F32;
        this.w = ZERO_F32;

        var v = this;
        if (arguments.length >= 3) {
            v.x = f32(x);
            v.y = f32(y);
            v.z = f32(z);
            v.w = w !== undefined ? Math.fround(w) : ONE_F32;

        } else if (Array.isArray(x)) {
            v.x = f32(x[0]);
            v.y = f32(x[1]);
            v.z = f32(x[2]);
            v.w = f32(x[3]);

        } else if (x instanceof Vector4) {
            v.x = x.x;
            v.y = x.y;
            v.z = x.z;
            v.z = x.w;
        }

    }

    set(x, y, z, w) {

        this.x = f32(x);
        this.y = f32(y);
        this.z = f32(z);
        this.w = f32(w);

        return this;

    }

    equals(v) {
        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z) && (v.w === this.w));
    }

    negate() {

        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;
        return this;

    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;
        return this;
    }

    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;
        return this;
    }

    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        this.w *= v.w;
        return this;
    }

    multiplyScalar(s) {

        this.x *= s;
        this.y *= s;
        this.z *= s;
        this.w *= s;
        return this;

    }

    divide(v) {

        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        this.w /= v.w;
        return this;

    }

    divideScalar(scalar) {
        if (scalar !== 0) {
            var inv = 1 / scalar;
            this.x *= inv;
            this.y *= inv;
            this.z *= inv;
            this.w *= inv;
        } else {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 1;
        }

        return this;

    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }

    length() {
        return Math.sqrt(this.lengthSq());
    }

    lengthSq() {
        var a = this;
        return a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
    }

    normalize() {
        var len = this.length();
        return this.divideScalar(len);
    }

    lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        this.w += (v.w - this.w) * alpha;
        return this;
    }

    min(v) {
        if (this.x > v.x)
            this.x = v.x;
        if (this.y > v.y)
            this.y = v.y;
        if (this.z > v.z)
            this.z = v.z;
        if (this.w > v.w)
            this.w = v.w;

        return this;
    }

    max(v) {

        if (this.x < v.x)
            this.x = v.x;
        if (this.y < v.y)
            this.y = v.y;
        if (this.z < v.z)
            this.z = v.z;
        if (this.w < v.w)
            this.w = v.w;

        return this;

    }

    clone() {
        return new Vector4(this);
    }

    copy(x) {
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
        this.w = x.w;
        return this;
    }

    fromArray(array, offset) {

        if (offset === undefined)
            offset = 0;

        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        this.w = array[offset + 3];
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
        array[offset + 3] = this.w;
        return array;

    }

    toFloatArray() {
        if (this._cache == null) {
            this._cache = new Float32Array(4);
        }

        this.toArray(this._cache);

        return this._cache;

    }

};

Vector4.UnitX = new Vector4(1, 0, 0);
Vector4.UnitY = new Vector4(0, 1, 0);
Vector4.UnitZ = new Vector4(0, 0, 1);
Vector4.UnitW = new Vector4(0, 0, 1);
Vector4.One = new Vector4(1, 1, 1, 1);

module.exports = Vector4;
