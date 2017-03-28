/**
 * An representation of a 4D vector
 */
export declare class Vector4 {
    x: number;
    y: number;
    z: number;
    w: number;
    private _cache;
    static UnitX: Vector4;
    static UnitY: Vector4;
    static UnitZ: Vector4;
    static UnitW: Vector4;
    static One: Vector4;
    static Zero: Vector4;
    /**
     * @constructs
     */
    constructor(x?: any, y?: number, z?: number, w?: number);
    set(x: number, y: number, z: number, w: number): this;
    equals(v: Vector4): boolean;
    negate(): this;
    add(v: Vector4): this;
    subtract(v: Vector4): this;
    multiply(v: Vector4): this;
    multiplyScalar(s: number): this;
    divide(v: Vector4): this;
    divideScalar(scalar: number): this;
    dot(v: Vector4): number;
    length(): number;
    lengthSq(): number;
    normalize(): this;
    lerp(v: Vector4, alpha: number): this;
    min(v: Vector4): this;
    max(v: Vector4): this;
    clone(): Vector4;
    copy(x: Vector4): this;
    fromArray(array: number[], offset?: number): this;
    toArray(array?: any[], offset?: number): any[];
    toFloatArray(): Float32Array;
}
