/**
 * @file Vector3
 * @see uon.math.Vector3
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

import {Matrix3} from './Matrix3';
import {Matrix4} from './Matrix4';
import {Quaternion} from './Quaternion';

const ZERO_F32 = Math.fround(0);
const ONE_F32 = Math.fround(1);
const f32 = Math.fround;



/**
 * A representation of a 3D vector
 */
export class Vector3 {

    // members
    public x: number = ZERO_F32;
    public y: number = ZERO_F32;
    public z: number = ZERO_F32;

    private _cache: Float32Array;


    public static UnitX: Vector3 = new Vector3(1, 0, 0);
    public static UnitY: Vector3 = new Vector3(0, 1, 0);
    public static UnitZ: Vector3 = new Vector3(0, 0, 1);
    public static One: Vector3 = new Vector3(1, 1, 1);
    public static Zero: Vector3 = new Vector3(0, 0, 0);


	/**
	 * @constructs
	 */
    constructor(x?: any, y?: number, z?: number) {


        var v = this;
        if (arguments.length == 3) {
            v.x = f32(x);
            v.y = f32(y);
            v.z = f32(z);
        } else if (Array.isArray(x)) {
            v.x = f32(x[0]);
            v.y = f32(x[1]);
            v.z = f32(x[2]);
        } else if (x instanceof Vector3) {
            v.x = x.x;
            v.y = x.y;
            v.z = x.z;
        }

    }

    set(x: number, y: number, z: number) {

        this.x = f32(x);
        this.y = f32(y);
        this.z = f32(z);

        return this;

    }

    equals(v: Vector3) {

        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));
    }

    negate() {

        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;

    }

    add(v: Vector3) {

        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    subtract(v: Vector3) {

        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    multiply(v: Vector3) {

        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    }

    multiplyScalar(s: number) {

        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;

    }

    divide(v: Vector3) {

        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;

    }

    divideScalar(scalar: number) {

        if (scalar !== 0) {
            var inv = 1 / scalar;
            this.x *= inv;
            this.y *= inv;
            this.z *= inv;
        } else {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }

        return this;

    }

    dot(v: Vector3) {

        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    cross(v: Vector3) {

        var x = this.x, y = this.y, z = this.z;

        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;

        return this;

    }

    applyMatrix3(m: Matrix3) {

        var x = this.x;
        var y = this.y;
        var z = this.z;

        var e = m.elements;

        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.y = e[1] * x + e[4] * y + e[7] * z;
        this.z = e[2] * x + e[5] * y + e[8] * z;

        return this;

    }

    applyMatrix4(m: Matrix4) {

        var x = this.x, y = this.y, z = this.z;

        var e = m.elements;

        this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
        this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
        this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
        var w = e[3] * x + e[7] * y + e[11] * z + e[15];

        return this.divideScalar(w);

    }

    applyMatrix4Proj(m: Matrix4) {

        var x = this.x, y = this.y, z = this.z;

        var e = m.elements;
        var d = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]); // perspective
        // divide

        this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * d;
        this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * d;
        this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * d;

        return this;

    }

    applyQuaternion(q: Quaternion) {

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

    }

    distanceTo(v: Vector3) {

        return Math.sqrt(this.distanceToSquared(v));

    }

    distanceToSquared(v: Vector3) {

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

    lerp(v: Vector3, alpha: number) {

        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;



        return this;
    }

    min(v: Vector3) {

        if (this.x > v.x)
            this.x = v.x;
        if (this.y > v.y)
            this.y = v.y;
        if (this.z > v.z)
            this.z = v.z;
        return this;

    }

    max(v: Vector3) {

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

    copy(x: Vector3) {

        this.x = x.x;
        this.y = x.y;
        this.z = x.z;

        return this;
    }

    fromArray(array: number[], offset?: number) {

        if (offset === undefined)
            offset = 0;

        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        return this;

    }

    toArray(array?: Array<number> | Float32Array, offset?: number) {

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

    static Lerp(v0: Vector3, v1: Vector3, t: number, out: Vector3) {

        let x = (1 - t) * v0.x + t * v1.x;
        let y = (1 - t) * v0.y + t * v1.y;
        let z = (1 - t) * v0.z + t * v1.z;

        out.set(x, y, z);


    }

};