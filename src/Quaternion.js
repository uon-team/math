/**
 * @file Quaternion
 * @see uon.math.Quaternion
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

"use strict";

const Vector3 = require('./Vector3'), 
	Matrix4 = require('./Matrix4');


/**
 * @memberOf uon.math
 */
class Quaternion {

	/**
	 * @constructs
	 */
	constructor(x, y, z, w) {

		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.w = 1;

		var v = this;
        if (arguments.length >= 3) {
            v.x = x;
            v.y = y;
            v.z = z;
            v.w = w !== undefined ? w : 1;
        } else if (x instanceof Array) {
			v.x = x[0] || 0;
			v.y = x[1] || 0;
			v.z = x[2] || 0;
			v.w = x[3] || 0;
		} else if (x instanceof Quaternion) {
			v.x = x.x;
			v.y = x.y;
			v.z = x.z;
			v.z = x.w;
		}

	}

	set (x, y, z, w) {

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

		return this;

	}

	equals (v) {

		return ((v.x === this.x) && (v.y === this.y)
				&& (v.z === this.z) && (v.w === this.w));
	}

	negate () {

		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		this.w = -this.w;
		return this;

	}

	toArray () {

		return this.values;
	}

	clone () {

		return new Quaternion(this);
	}

	inverse (result) {

		var l = this.length();
		result = result || this;
		result.negate(result);
		result.x /= l;
		result.y /= l;
		result.z /= l;
		result.w /= l;
		return this.conjugate().normalize();
	}

	normalize () {

		var l = this.length();

		if (l === 0) {
			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.w = 1;

		} else {
			l = 1 / l;

			this.x = this.x * l;
			this.y = this.y * l;
			this.z = this.z * l;
			this.w = this.w * l;

		}

		return this;
	}

	length () {

		return Math.sqrt(this.x * this.x + this.y * this.y
				+ this.z * this.z + this.w * this.w);
	}

	lengthSq () {

		return this.x * this.x + this.y * this.y + this.z
				* this.z + this.w * this.w;
	}

	conjugate () {

		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;

		return this;
	}

	multiply (b) {

		var a = this;

		var qax = a.x, qay = a.y, qaz = a.z, qaw = a.w;
		var qbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;

		this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

		return this;
	}

	fromAxisAngle (axis, angle) {

		var half_angle = angle * 0.5, sinus = Math
				.sin(half_angle), cosinus = Math
				.cos(half_angle);

		this.x = axis.x * sinus;
		this.y = axis.y * sinus;
		this.z = axis.z * sinus;
		this.w = cosinus;

		return this;

	}

	setFromUnitVectors (vFrom, vTo) {

		// http://lolengine.net/blog/2014/02/24/quaternion-from-two-vectors-final

		// assumes direction vectors vFrom and vTo are
		// normalized

		var v1 = Quaternion.TempVec3, r;

		var EPS = 0.000001;

		r = vFrom.dot(vTo) + 1;

		if (r < EPS) {

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

	setFromRotationMatrix (m) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix
		// (i.e, unscaled)

		var te = m.elements,

		m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10],

		trace = m11 + m22 + m33, s;

		if (trace > 0) {

			s = 0.5 / Math.sqrt(trace + 1.0);

			this.w = 0.25 / s;
			this.x = (m32 - m23) * s;
			this.y = (m13 - m31) * s;
			this.z = (m21 - m12) * s;

		} else if (m11 > m22 && m11 > m33) {

			s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

			this.w = (m32 - m23) / s;
			this.x = 0.25 * s;
			this.y = (m12 + m21) / s;
			this.z = (m13 + m31) / s;

		} else if (m22 > m33) {

			s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

			this.w = (m13 - m31) / s;
			this.x = (m12 + m21) / s;
			this.y = 0.25 * s;
			this.z = (m23 + m32) / s;

		} else {

			s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

			this.w = (m21 - m12) / s;
			this.x = (m13 + m31) / s;
			this.y = (m23 + m32) / s;
			this.z = 0.25 * s;

		}

		return this;

	}
	
	static Slerp(q1, q2, qr, lambda) {

		var dotproduct = q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;
		var theta, st, sut, sout, coeff1, coeff2;

		// algorithm adapted from Shoemake's paper
		lambda = lambda / 2.0;

		theta = Math.acos(dotproduct);
		if (theta < 0.0)
			theta = -theta;

		st = Math.sin(theta);
		sut = Math.sin(lambda * theta);
		sout = Math.sin((1 - lambda) * theta);
		coeff1 = sout / st;
		coeff2 = sut / st;

		qr.x = coeff1 * q1.x + coeff2 * q2.x;
		qr.y = coeff1 * q1.y + coeff2 * q2.y;
		qr.z = coeff1 * q1.z + coeff2 * q2.z;
		qr.w = coeff1 * q1.w + coeff2 * q2.w;

		qr.normalize();
	}

};

Quaternion.TempVec3 = new Vector3();

module.exports = Quaternion;
