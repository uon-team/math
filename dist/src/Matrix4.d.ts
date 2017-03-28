/**
 * @file Matrix4
 * @see uon.math.Matrix4
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
import { Vector3 } from './Vector3';
import { Quaternion } from './Quaternion';
/**
 * @memberOf uon.math
 */
export declare class Matrix4 {
    elements: Float32Array;
    private static TEMP;
    /**
     * @constructs
     */
    constructor();
    set(n11: number, n12: number, n13: number, n14: number, n21: number, n22: number, n23: number, n24: number, n31: number, n32: number, n33: number, n34: number, n41: number, n42: number, n43: number, n44: number): this;
    identity(): this;
    copy(m: Matrix4): this;
    /**
     * Compute determinant
     */
    determinant(): number;
    /**
     * Copy the inverse of m into this
     * @param m
     */
    inverse(m: Matrix4): this;
    /**
     * Transpose this matrix in place
     */
    transpose(): this;
    /**
     * Multiply this matrix by another
     * @param mat
     */
    multiply(mat: Matrix4): this;
    /**
     * Scale the matrix uniformly by value s
     * @param s
     */
    multiplyScalar(s: number): this;
    /**
     * Scale the matrix with Vector3
     * @param v
     */
    scale(v: Vector3): this;
    /**
     * Apply a look at transformation
     * @param eye
     * @param target
     * @param up
     */
    lookAt(eye: Vector3, target: Vector3, up: Vector3): this;
    makeFrustum(left: number, right: number, bottom: number, top: number, near: number, far: number): this;
    makePerspective(fov: number, aspect: number, near: number, far: number): this;
    makeOrthographic(left: number, right: number, top: number, bottom: number, near: number, far: number): this;
    makeRotationFromQuaternion(q: Quaternion): this;
    makeRotationAxis(axis: Vector3, angle: number): this;
    makeTranslation(x: number, y: number, z: number): this;
    makeScale(x: number, y: number, z: number): this;
    getScale(): Vector3;
    setTranslation(v: Vector3): this;
    getTranslation(v?: Vector3): Vector3;
    compose(translation: Vector3, quaternion: Quaternion, scale: Vector3): this;
    decompose(translation: Vector3, quaternion: Quaternion, scale: Vector3): this;
    fromArray(array: ArrayLike<number>): this;
    toArray(): number[];
    clone(): Matrix4;
}
