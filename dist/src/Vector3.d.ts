/**
 * @file Vector3
 * @see uon.math.Vector3
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
import { Matrix3 } from './Matrix3';
import { Matrix4 } from './Matrix4';
import { Quaternion } from './Quaternion';
/**
 * A representation of a 3D vector
 */
export declare class Vector3 {
    x: number;
    y: number;
    z: number;
    private _cache;
    static UnitX: Vector3;
    static UnitY: Vector3;
    static UnitZ: Vector3;
    static One: Vector3;
    static Zero: Vector3;
    /**
     * @constructs
     */
    constructor(x?: any, y?: number, z?: number);
    set(x: number, y: number, z: number): this;
    equals(v: Vector3): boolean;
    negate(): this;
    add(v: Vector3): this;
    subtract(v: Vector3): this;
    multiply(v: Vector3): this;
    multiplyScalar(s: number): this;
    divide(v: Vector3): this;
    divideScalar(scalar: number): this;
    dot(v: Vector3): number;
    cross(v: Vector3): this;
    applyMatrix3(m: Matrix3): this;
    applyMatrix4(m: Matrix4): this;
    applyMatrix4Proj(m: Matrix4): this;
    applyQuaternion(q: Quaternion): this;
    distanceTo(v: Vector3): number;
    distanceToSquared(v: Vector3): number;
    length(): number;
    lengthSq(): number;
    normalize(): this;
    lerp(v: Vector3, alpha: number): this;
    min(v: Vector3): this;
    max(v: Vector3): this;
    clone(): Vector3;
    copy(x: Vector3): this;
    fromArray(array: number[], offset?: number): this;
    toArray(array?: any[], offset?: number): any[];
    toFloatArray(): Float32Array;
}
