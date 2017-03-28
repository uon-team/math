import { Vector3 } from './Vector3';
import { Matrix4 } from './Matrix4';
/**
 * @memberOf uon.math
 */
export declare class Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;
    private _cache;
    /**
     * @constructs
     */
    constructor(x?: any, y?: number, z?: number, w?: number);
    set(x: number, y: number, z: number, w: number): this;
    equals(v: Quaternion): boolean;
    negate(): this;
    toArray(): number[];
    copy(q: Quaternion): this;
    clone(): Quaternion;
    inverse(result?: Quaternion): this;
    normalize(): this;
    length(): number;
    lengthSq(): number;
    conjugate(): this;
    multiply(b: Quaternion): this;
    fromAxisAngle(axis: Vector3, angle: number): this;
    setFromUnitVectors(vFrom: Vector3, vTo: Vector3): this;
    setFromRotationMatrix(m: Matrix4): this;
    static Slerp(q1: Quaternion, q2: Quaternion, qr: Quaternion, lambda: number): void;
}
