

import { Vector3 } from './Vector3';
import { Matrix4 } from './Matrix4';

const TEMP_VEC3 = new Vector3();


/**
 * @memberOf uon.math
 */
export class Matrix3 {


    readonly elements: Float32Array;


	/**
	 * @constructs
	 */
    constructor() {

        this.elements = new Float32Array([
            1, 0, 0,
            0, 1, 0,
            0, 0, 1]);
    }

    set(n11: number, n12: number, n13: number,
        n21: number, n22: number, n23: number,
        n31: number, n32: number, n33: number) {

        const te = this.elements;

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

    identity() {

        this.set(

            1, 0, 0, 0, 1, 0, 0, 0, 1

        );

        return this;

    }

    copy(m: Matrix3) {

        this.elements.set(m.elements);

        return this;

    }

    determinant() {

        const te = this.elements;

        const a = te[0], b = te[1], c = te[2], d = te[3], e = te[4], f = te[5], g = te[6], h = te[7], i = te[8];

        return a * e * i - a * f * h - b * d * i + b * f * g
            + c * d * h - c * e * g;

    }

    /**
     * Copy the inverse of a Matrix4 into this one
     * @param matrix
     */
    inverse(matrix: Matrix4) {

        const me = matrix.elements;
        const te = this.elements;

        te[0] = me[10] * me[5] - me[6] * me[9];
        te[1] = -me[10] * me[1] + me[2] * me[9];
        te[2] = me[6] * me[1] - me[2] * me[5];
        te[3] = -me[10] * me[4] + me[6] * me[8];
        te[4] = me[10] * me[0] - me[2] * me[8];
        te[5] = -me[6] * me[0] + me[2] * me[4];
        te[6] = me[9] * me[4] - me[5] * me[8];
        te[7] = -me[9] * me[0] + me[1] * me[8];
        te[8] = me[5] * me[0] - me[1] * me[4];

        const det = me[0] * te[0] + me[1] * te[3] + me[2] * te[6];

        // no inverse

        if (det === 0) {
            throw new Error('cannot inverse, determinant is zero');
        }

        this.multiplyScalar(1.0 / det);

        return this;
    }

    /**
     * Get a Normal matrix from a matrix 4
     * @param m
     */
    getNormalMatrix(m: Matrix4) {

        this.inverse(m).transpose();

        return this;

    }

    transpose() {

        let tmp: number,
            m = this.elements;

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

    multiplyScalar(s: number) {

        const te = this.elements;

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

    fromArray(array: ArrayLike<number>) {

        this.elements.set(array);

        return this;

    }

    toArray() {

        let result: number[] = new Array(9);
        for (let i = 0; i < 9; ++i) {
            result.push(this.elements[i]);
        }

        return result;

    }

    toFloatArray() {

        return this.elements;

    }

    clone() {

        return new Matrix3().fromArray(this.elements);

    }

};
