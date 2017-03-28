import { Matrix4 } from './Matrix4';
/**
 * @memberOf uon.math
 */
export declare class Matrix3 {
    elements: Float32Array;
    /**
     * @constructs
     */
    constructor();
    set(n11: number, n12: number, n13: number, n21: number, n22: number, n23: number, n31: number, n32: number, n33: number): this;
    identity(): this;
    copy(m: Matrix3): this;
    determinant(): number;
    /**
     * Copy the inverse of a Matrix4 into this one
     * @param matrix
     */
    inverse(matrix: Matrix4): this;
    /**
     * Get a Normal matrix from a matrix 4
     * @param m
     */
    getNormalMatrix(m: Matrix4): this;
    transpose(): this;
    multiplyScalar(s: number): this;
    fromArray(array: ArrayLike<number>): this;
    toArray(): number[];
    clone(): Matrix3;
}
