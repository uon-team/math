

import { f32, ZERO_F32, ONE_F32 } from './Utils';

/**
 * An representation of a 4D vector
 */
export class Vector4 {

    public x: number = ZERO_F32;
    public y: number = ZERO_F32;
    public z: number = ZERO_F32;
    public w: number = ONE_F32;

    private _cache: Float32Array;


    // static 
    public static readonly UnitX: Vector4 = new Vector4(1, 0, 0);
    public static readonly UnitY: Vector4 = new Vector4(0, 1, 0);
    public static readonly UnitZ: Vector4 = new Vector4(0, 0, 1);
    public static readonly UnitW: Vector4 = new Vector4(0, 0, 0, 1);
    public static readonly One: Vector4 = new Vector4(1, 1, 1);
    public static readonly Zero: Vector4 = new Vector4(0, 0, 0, 0);

	/**
	 * @constructs
	 */
    constructor(x?: any, y?: number, z?: number, w?: number) {

        const v = this;
        if (arguments.length >= 3) {
            v.x = f32(x);
            v.y = f32(y);
            v.z = f32(z);
            v.w = w !== undefined ? f32(w) : ONE_F32;

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

    set(x: number, y: number, z: number, w: number) {

        this.x = f32(x);
        this.y = f32(y);
        this.z = f32(z);
        this.w = f32(w);

        return this;

    }

    equals(v: Vector4) {
        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z) && (v.w === this.w));
    }

    negate() {

        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;
        return this;

    }

    add(v: Vector4) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;
        return this;
    }

    subtract(v: Vector4) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;
        return this;
    }

    multiply(v: Vector4) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        this.w *= v.w;
        return this;
    }

    multiplyScalar(s: number) {

        this.x *= s;
        this.y *= s;
        this.z *= s;
        this.w *= s;
        return this;

    }

    divide(v: Vector4) {

        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        this.w /= v.w;
        return this;

    }

    divideScalar(scalar: number) {
        if (scalar !== 0) {
            const inv = 1 / scalar;
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

    dot(v: Vector4) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }

    length() {
        return Math.sqrt(this.lengthSq());
    }

    lengthSq() {
        const a = this;
        return a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
    }

    normalize() {
        const len = this.length();
        return this.divideScalar(len);
    }

    lerp(v: Vector4, alpha: number) {

        const inv_a = 1 - alpha;

        this.x = inv_a * this.x + alpha * v.x;
        this.y = inv_a * this.y + alpha * v.y;
        this.z = inv_a * this.z + alpha * v.z;
        this.w = inv_a * this.w + alpha * v.w;

        return this;
    }

    min(v: Vector4) {
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

    max(v: Vector4) {

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

    copy(x: Vector4) {
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
        this.w = x.w;
        return this;
    }

    fromArray(array: number[], offset: number = 0) {

        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        this.w = array[offset + 3];
        return this;

    }

    toArray(array?: any[], offset: number = 0) {

        if (array === undefined)
            array = [];

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

        this._cache[0] = this.x;
        this._cache[1] = this.y;
        this._cache[2] = this.z;
        this._cache[3] = this.w;


        return this._cache;

    }

};

