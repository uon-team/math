
import { Vector3 } from './Vector3';

import { Matrix4 } from './Matrix4';
import { Euler } from './Euler';
import { f32, ZERO_F32, ONE_F32, EPSILON, IsNearEqual } from './Utils';

const TEMP_VEC3 = new Vector3();

/**
 * Quaternion object
 */
export class Quaternion {

    public x: number = ZERO_F32;
    public y: number = ZERO_F32;
    public z: number = ZERO_F32;
    public w: number = ONE_F32;

    private _cache: Float32Array;

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
            v.x = f32(x[0]) || ZERO_F32;
            v.y = f32(x[1]) || ZERO_F32;
            v.z = f32(x[2]) || ZERO_F32;
            v.w = f32(x[3]) || ZERO_F32;
        } else if (x instanceof Quaternion) {
            v.x = x.x;
            v.y = x.y;
            v.z = x.z;
            v.z = x.w;
        }

    }

    /**
     * Set all values of this quaternion
     * @param x 
     * @param y 
     * @param z 
     * @param w 
     */
    set(x: number, y: number, z: number, w: number) {

        this.x = f32(x);
        this.y = f32(y);
        this.z = f32(z);
        this.w = f32(w);

        return this;

    }


    /**
     * Test for equality
     * @param v 
     */
    equals(v: Quaternion) {

        return ((v.x === this.x) && (v.y === this.y)
            && (v.z === this.z) && (v.w === this.w));
    }

    /**
     * Test for near equality
     * @param v 
     */
    nearEquals(v: Quaternion, espilon: number = EPSILON) {

        return (IsNearEqual(v.x, this.x, espilon) &&
            IsNearEqual(v.y, this.y, espilon) &&
            IsNearEqual(v.z, this.z, espilon) &&
            IsNearEqual(v.w, this.w, espilon));
    }

    /**
     * Negate all values of this quaternion
     */
    negate() {
        const t = this;
        t.x = -t.x;
        t.y = -t.y;
        t.z = -t.z;
        t.w = -t.w;
        return this;

    }

    toArray() {

        return [this.x, this.y, this.z, this.w];
    }


    /**
     * Copy values from {q} into this one
     * @param q 
     */
    copy(q: Quaternion) {

        this.set(q.x, q.y, q.z, q.w);

        return this;
    }

    /**
     * Creates a copy of this quaternion
     */
    clone() {

        return new Quaternion(this);
    }

    /**
     * Compute the inverse of this quaternion
     * @param result If defined, the result will be stored on it, on this otherwise 
     */
    inverse(result?: Quaternion) {

        const l = this.length();
        result = result || this;
        //result.negate(result);
        result.x /= l;
        result.y /= l;
        result.z /= l;
        result.w /= l;
        return this.conjugate().normalize();
    }

    /**
     * Normalize this quaternion
     */
    normalize() {

        const t = this;
        let l = t.length();

        if (l === 0) {
            t.x = 0;
            t.y = 0;
            t.z = 0;
            t.w = 1;

        }
        else {
            l = 1 / l;

            t.x = t.x * l;
            t.y = t.y * l;
            t.z = t.z * l;
            t.w = t.w * l;

        }

        return this;
    }

    /**
     * Compute the length of this quaternion
     */
    length() {

        const t = this;
        return Math.sqrt(t.x * t.x + t.y * t.y + t.z * t.z + t.w * t.w);
    }

    /**
     * Compute the squared length of this quaternion
     */
    lengthSq() {

        const t = this;
        return t.x * t.x + t.y * t.y + t.z * t.z + t.w * t.w;
    }


    conjugate() {

        const t = this;
        t.x = -t.x;
        t.y = -t.y;
        t.z = -t.z;

        return this;
    }

    /**
     * Multiply this quaternion with another
     * @param b 
     */
    multiply(b: Quaternion) {

        const a = this;

        const qax = a.x, qay = a.y, qaz = a.z, qaw = a.w;
        const qbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;

        a.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        a.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        a.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        a.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

        return this;
    }


    /**
     * Sets this quaternion's value with axis and angle
     * @param axis 
     * @param angle 
     */
    fromAxisAngle(axis: Vector3, angle: number) {

        var half_angle = angle * 0.5, sinus = Math
            .sin(half_angle), cosinus = Math
                .cos(half_angle);

        this.x = axis.x * sinus;
        this.y = axis.y * sinus;
        this.z = axis.z * sinus;
        this.w = cosinus;

        return this;

    }


    /**
     * Sets the quaternion from 2 normalized axis vectors
     * @param vFrom normalized vector
     * @param vTo normalized vector
     */
    fromUnitVectors(vFrom: Vector3, vTo: Vector3) {

        const v1 = TEMP_VEC3;
        let r = vFrom.dot(vTo) + 1;

        if (r < EPSILON) {

            r = 0;

            if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {

                v1.set(-vFrom.y, vFrom.x, 0);

            } else {

                v1.set(0, -vFrom.z, vFrom.y);

            }

        } else {

            v1.copy(vFrom).cross(vTo);

        }

        this.x = v1.x;
        this.y = v1.y;
        this.z = v1.z;
        this.w = r;

        this.normalize();

        return this;

    }


    /**
     * Sets the quaternion from a rotation matrix
     * @param m 
     */
    fromRotationMatrix(m: Matrix4) {

        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

        // assumes the upper 3x3 of m is a pure rotation matrix
        // (i.e, unscaled)
        const t = this;
        let s: number;
        let te = m.elements,
            m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10],
            trace = m11 + m22 + m33;


        if (trace > 0) {

            s = 0.5 / Math.sqrt(trace + 1.0);

            t.w = 0.25 / s;
            t.x = (m32 - m23) * s;
            t.y = (m13 - m31) * s;
            t.z = (m21 - m12) * s;

        } else if (m11 > m22 && m11 > m33) {

            s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

            t.w = (m32 - m23) / s;
            t.x = 0.25 * s;
            t.y = (m12 + m21) / s;
            t.z = (m13 + m31) / s;

        } else if (m22 > m33) {

            s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

            t.w = (m13 - m31) / s;
            t.x = (m12 + m21) / s;
            t.y = 0.25 * s;
            t.z = (m23 + m32) / s;

        } else {

            s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

            t.w = (m21 - m12) / s;
            t.x = (m13 + m31) / s;
            t.y = (m23 + m32) / s;
            t.z = 0.25 * s;

        }

        return this;

    }

    /**
     * Sets this quaternion with euler angles
     * @param euler 
     */
    fromEuler(euler: Euler) {

        let t0 = Math.cos(euler.yaw * 0.5);
        let t1 = Math.sin(euler.yaw * 0.5);
        let t2 = Math.cos(euler.roll * 0.5);
        let t3 = Math.sin(euler.roll * 0.5);
        let t4 = Math.cos(euler.pitch * 0.5);
        let t5 = Math.sin(euler.pitch * 0.5);

        this.w = t0 * t2 * t4 + t1 * t3 * t5;
        this.x = t0 * t3 * t4 - t1 * t2 * t5;
        this.y = t0 * t2 * t5 + t1 * t3 * t4;
        this.z = t1 * t2 * t4 - t0 * t3 * t5;

        return this;
    }

    /**
     * Get the euler representation of this quaternion
     * @param out 
     */
    toEuler(out?: Euler) {

        out = out || new Euler();

        let ysqr = this.y * this.y;

        // roll (x-axis rotation)
        let t0 = 2.0 * (this.w * this.x + this.y * this.z);
        let t1 = 1.0 - 2.0 * (this.x * this.x + ysqr);
        out.roll = Math.atan2(t0, t1);

        // pitch (y-axis rotation)
        let t2 = 2.0 * (this.w * this.y - this.z * this.x);
        t2 = t2 > 1.0 ? 1.0 : t2;
        t2 = t2 < -1.0 ? -1.0 : t2;
        out.pitch = Math.asin(t2);

        // yaw (z-axis rotation)
        let t3 = 2.0 * (this.w * this.z + this.x * this.y);
        let t4 = 1.0 - 2.0 * (ysqr + this.z * this.z);
        out.yaw = Math.atan2(t3, t4);

        return out;

    }


    /**
     * Compute a spherical interpolation
     * @param qa 
     * @param qb 
     * @param qm the resulting quaternion
     * @param lambda 
     */
    static Slerp(qa: Quaternion, qb: Quaternion, qm: Quaternion, lambda: number) {

        // Calculate angle between them.
        let cos_half_theta = qa.w * qb.w + qa.x * qb.x + qa.y * qb.y + qa.z * qb.z;
        // if qa=qb or qa=-qb then theta = 0 and we can return qa
        if (Math.abs(cos_half_theta) >= 1.0) {
            qm.w = qa.w; qm.x = qa.x; qm.y = qa.y; qm.z = qa.z;
            return qm;
        }
        // Calculate temporary values.
        const half_theta = Math.acos(cos_half_theta);
        const sin_half_theta = Math.sqrt(1.0 - cos_half_theta * cos_half_theta);

        // if theta = PI then result is not fully defined
        // we could rotate around any axis normal to qa or qb
        if (Math.abs(sin_half_theta) < EPSILON) {
            qm.w = (qa.w * 0.5 + qb.w * 0.5);
            qm.x = (qa.x * 0.5 + qb.x * 0.5);
            qm.y = (qa.y * 0.5 + qb.y * 0.5);
            qm.z = (qa.z * 0.5 + qb.z * 0.5);
            return qm;
        }

        const ratio_a = Math.sin((1 - lambda) * half_theta) / sin_half_theta;
        const ratio_b = Math.sin(lambda * half_theta) / sin_half_theta;

        // calculate Quaternion.
        qm.w = (qa.w * ratio_a + qb.w * ratio_b);
        qm.x = (qa.x * ratio_a + qb.x * ratio_b);
        qm.y = (qa.y * ratio_a + qb.y * ratio_b);
        qm.z = (qa.z * ratio_a + qb.z * ratio_b);
        return qm;

    }

};



