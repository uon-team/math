/**
 * @file Matrix3
 * @see uon.math.Matrix3
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

"use strict";

const Vector3 = require('./Vector3');

var TEMP_VEC3 = new Vector3();


/**
 * @memberOf uon.math
 */
class Matrix3 {

	/**
	 * @constructs
	 */
	constructor () {

		this.elements = new Float32Array([ 1, 0, 0, 0, 1, 0, 0,
				0, 1 ]);
	}

	set (n11, n12, n13, n21, n22, n23, n31, n32, n33) {

		var te = this.elements;

		te[0] = n11;
		te[3] = n12;
		te[6] = n13;
		te[1] = n21;
		te[4] = n22;
		te[7] = n23;
		te[2] = n31;
		te[5] = n32;
		te[8] = n33;

		return this;

	}

	identity () {

		this.set(

		1, 0, 0, 0, 1, 0, 0, 0, 1

		);

		return this;

	}

	copy (m) {

		this.elements.set(m.elements);

		return this;

	}

	determinant () {

		var te = this.elements;

		var a = te[0], b = te[1], c = te[2], d = te[3], e = te[4], f = te[5], g = te[6], h = te[7], i = te[8];

		return a * e * i - a * f * h - b * d * i + b * f * g
				+ c * d * h - c * e * g;

	}

	inverse (matrix) {

		var me = matrix.elements;
		var te = this.elements;

		te[0] = me[10] * me[5] - me[6] * me[9];
		te[1] = -me[10] * me[1] + me[2] * me[9];
		te[2] = me[6] * me[1] - me[2] * me[5];
		te[3] = -me[10] * me[4] + me[6] * me[8];
		te[4] = me[10] * me[0] - me[2] * me[8];
		te[5] = -me[6] * me[0] + me[2] * me[4];
		te[6] = me[9] * me[4] - me[5] * me[8];
		te[7] = -me[9] * me[0] + me[1] * me[8];
		te[8] = me[5] * me[0] - me[1] * me[4];

		var det = me[0] * te[0] + me[1] * te[3] + me[2] * te[6];

		// no inverse

		if (det === 0) {

			var msg = "Matrix3.inverse(): can't invert matrix, determinant is 0";
			console.warn(msg);
			this.identity();
			return this;

		}

		this.multiplyScalar(1.0 / det);

		return this;
	}

	getNormalMatrix (m) {

		this.getInverse(m).transpose();

		return this;

	}

	transpose () {

		var tmp, m = this.elements;

		tmp = m[1];
		m[1] = m[3];
		m[3] = tmp;
		tmp = m[2];
		m[2] = m[6];
		m[6] = tmp;
		tmp = m[5];
		m[5] = m[7];
		m[7] = tmp;

		return this;
	}

	multiplyScalar (s) {

		var te = this.elements;

		te[0] *= s;
		te[3] *= s;
		te[6] *= s;
		te[1] *= s;
		te[4] *= s;
		te[7] *= s;
		te[2] *= s;
		te[5] *= s;
		te[8] *= s;

		return this;

	}

	fromArray (array) {

		this.elements.set(array);

		return this;

	}

	toArray () {

		var te = this.elements;

		return [ te[0], te[1], te[2], te[3], te[4], te[5],
				te[6], te[7], te[8] ];

	}

	clone () {

		return new Matrix3().fromArray(this.elements);

	}

};

module.exports = Matrix3;
