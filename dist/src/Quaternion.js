/**
 * @file Quaternion
 * @see uon.math.Quaternion
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
"use strict";
import { Vector3 } from './Vector3';
import { Euler } from './Euler';
var TEMP_VEC3 = new Vector3();
var ZERO_F32 = Math.fround(0);
var ONE_F32 = Math.fround(0);
var f32 = Math.fround;
/**
 * @memberOf uon.math
 */
var Quaternion = (function () {
    /**
     * @constructs
     */
    function Quaternion(x, y, z, w) {
        this.x = ZERO_F32;
        this.y = ZERO_F32;
        this.z = ZERO_F32;
        this.w = ONE_F32;
        var v = this;
        if (arguments.length >= 3) {
            this.x = f32(x);
            this.y = f32(y);
            this.z = f32(z);
            this.w = w !== undefined ? f32(w) : ONE_F32;
        }
        else if (Array.isArray(x)) {
            this.x = f32(x[0]) || ZERO_F32;
            this.y = f32(x[1]) || ZERO_F32;
            this.z = f32(x[2]) || ZERO_F32;
            this.w = f32(x[3]) || ZERO_F32;
        }
        else if (x instanceof Quaternion) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
            this.z = x.w;
        }
    }
    Quaternion.prototype.set = function (x, y, z, w) {
        this.x = f32(x);
        this.y = f32(y);
        this.z = f32(z);
        this.w = f32(w);
        return this;
    };
    Quaternion.prototype.equals = function (v) {
        return ((v.x === this.x) && (v.y === this.y)
            && (v.z === this.z) && (v.w === this.w));
    };
    Quaternion.prototype.negate = function () {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;
        return this;
    };
    Quaternion.prototype.toArray = function () {
        return [this.x, this.y, this.z, this.w];
    };
    Quaternion.prototype.copy = function (q) {
        this.set(q.x, q.y, q.z, q.w);
        return this;
    };
    Quaternion.prototype.clone = function () {
        return new Quaternion(this);
    };
    Quaternion.prototype.inverse = function (result) {
        var l = this.length();
        result = result || this;
        //result.negate(result);
        result.x /= l;
        result.y /= l;
        result.z /= l;
        result.w /= l;
        return this.conjugate().normalize();
    };
    Quaternion.prototype.normalize = function () {
        var l = this.length();
        if (l === 0) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 1;
        }
        else {
            l = 1 / l;
            this.x = this.x * l;
            this.y = this.y * l;
            this.z = this.z * l;
            this.w = this.w * l;
        }
        return this;
    };
    Quaternion.prototype.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y
            + this.z * this.z + this.w * this.w);
    };
    Quaternion.prototype.lengthSq = function () {
        return this.x * this.x + this.y * this.y + this.z
            * this.z + this.w * this.w;
    };
    Quaternion.prototype.conjugate = function () {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    };
    Quaternion.prototype.multiply = function (b) {
        var a = this;
        var qax = a.x, qay = a.y, qaz = a.z, qaw = a.w;
        var qbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;
        this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
        return this;
    };
    Quaternion.prototype.fromAxisAngle = function (axis, angle) {
        var half_angle = angle * 0.5, sinus = Math
            .sin(half_angle), cosinus = Math
            .cos(half_angle);
        this.x = axis.x * sinus;
        this.y = axis.y * sinus;
        this.z = axis.z * sinus;
        this.w = cosinus;
        return this;
    };
    Quaternion.prototype.setFromUnitVectors = function (vFrom, vTo) {
        // http://lolengine.net/blog/2014/02/24/quaternion-from-two-vectors-final
        // assumes direction vectors vFrom and vTo are
        // normalized
        var v1 = TEMP_VEC3;
        var EPS = 0.000001;
        var r = vFrom.dot(vTo) + 1;
        if (r < EPS) {
            r = 0;
            if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
                v1.set(-vFrom.y, vFrom.x, 0);
            }
            else {
                v1.set(0, -vFrom.z, vFrom.y);
            }
        }
        else {
            v1.copy(vFrom).cross(vTo);
        }
        this.x = v1.x;
        this.y = v1.y;
        this.z = v1.z;
        this.w = r;
        this.normalize();
        return this;
    };
    Quaternion.prototype.setFromRotationMatrix = function (m) {
        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
        // assumes the upper 3x3 of m is a pure rotation matrix
        // (i.e, unscaled)
        var s;
        var te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33;
        if (trace > 0) {
            s = 0.5 / Math.sqrt(trace + 1.0);
            this.w = 0.25 / s;
            this.x = (m32 - m23) * s;
            this.y = (m13 - m31) * s;
            this.z = (m21 - m12) * s;
        }
        else if (m11 > m22 && m11 > m33) {
            s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
            this.w = (m32 - m23) / s;
            this.x = 0.25 * s;
            this.y = (m12 + m21) / s;
            this.z = (m13 + m31) / s;
        }
        else if (m22 > m33) {
            s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
            this.w = (m13 - m31) / s;
            this.x = (m12 + m21) / s;
            this.y = 0.25 * s;
            this.z = (m23 + m32) / s;
        }
        else {
            s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
            this.w = (m21 - m12) / s;
            this.x = (m13 + m31) / s;
            this.y = (m23 + m32) / s;
            this.z = 0.25 * s;
        }
        return this;
    };
    Quaternion.prototype.toEuler = function (out) {
        out = out || new Euler();
        var ysqr = this.y * this.y;
        // roll (x-axis rotation)
        var t0 = 2.0 * (this.w * this.x + this.y * this.z);
        var t1 = 1.0 - 2.0 * (this.x * this.x + ysqr);
        out.roll = Math.atan2(t0, t1);
        // pitch (y-axis rotation)
        var t2 = 2.0 * (this.w * this.y - this.z * this.x);
        t2 = t2 > 1.0 ? 1.0 : t2;
        t2 = t2 < -1.0 ? -1.0 : t2;
        out.pitch = Math.asin(t2);
        // yaw (z-axis rotation)
        var t3 = 2.0 * (this.w * this.z + this.x * this.y);
        var t4 = 1.0 - 2.0 * (ysqr + this.z * this.z);
        out.yaw = Math.atan2(t3, t4);
        return out;
    };
    Quaternion.Slerp = function (qa, qb, qm, lambda) {
        // Calculate angle between them.
        var cosHalfTheta = qa.w * qb.w + qa.x * qb.x + qa.y * qb.y + qa.z * qb.z;
        // if qa=qb or qa=-qb then theta = 0 and we can return qa
        if (Math.abs(cosHalfTheta) >= 1.0) {
            qm.w = qa.w;
            qm.x = qa.x;
            qm.y = qa.y;
            qm.z = qa.z;
            return qm;
        }
        // Calculate temporary values.
        var halfTheta = Math.acos(cosHalfTheta);
        var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
        // if theta = 180 degrees then result is not fully defined
        // we could rotate around any axis normal to qa or qb
        if (Math.abs(sinHalfTheta) < 0.001) {
            qm.w = (qa.w * 0.5 + qb.w * 0.5);
            qm.x = (qa.x * 0.5 + qb.x * 0.5);
            qm.y = (qa.y * 0.5 + qb.y * 0.5);
            qm.z = (qa.z * 0.5 + qb.z * 0.5);
            return qm;
        }
        var ratioA = Math.sin((1 - lambda) * halfTheta) / sinHalfTheta;
        var ratioB = Math.sin(lambda * halfTheta) / sinHalfTheta;
        //calculate Quaternion.
        qm.w = (qa.w * ratioA + qb.w * ratioB);
        qm.x = (qa.x * ratioA + qb.x * ratioB);
        qm.y = (qa.y * ratioA + qb.y * ratioB);
        qm.z = (qa.z * ratioA + qb.z * ratioB);
        return qm;
    };
    return Quaternion;
}());
export { Quaternion };
;
//# sourceMappingURL=Quaternion.js.map