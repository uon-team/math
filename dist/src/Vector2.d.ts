/**
 *  A representation of a 2D vector
 */
export declare class Vector2 {
    x: number;
    y: number;
    private _cache;
    static UnitX: Vector2;
    static UnitY: Vector2;
    static One: Vector2;
    static Zero: Vector2;
    /**
     * @constructs
     */
    constructor(x?: any, y?: number);
    /**
     * Sets values
     * @param x
     * @param y
     */
    set(x: number, y: number): this;
    /**
     * Equality test
     * @param v
     */
    equals(v: Vector2): boolean;
    negate(): this;
    /**
     * Adds a vector2 to this one
     * @param vec2
     */
    add(vec2: Vector2): this;
    /**
     * Substract a vector2 from this one
     * @param vec2
     */
    subtract(vec2: Vector2): this;
    /**
     * Multiply this vector with another
     * @param vec2
     */
    multiply(vec2: Vector2): this;
    /**
     * Multiply this vector by a scalar value
     * @param s
     */
    multiplyScalar(s: number): this;
    /**
     * Divide this vector by another
     * @param v
     */
    divide(v: Vector2): this;
    /**
     * Divide this vector by a scalar value
     * @param scalar
     */
    divideScalar(scalar: number): this;
    /**
     * Compute a dot product
     * @param vec2
     */
    dot(vec2: Vector2): number;
    /**
     * Computes the vector length
     */
    length(): number;
    /**
     * Computes the vector squared length
     */
    lengthSq(): number;
    /**
     * Normalizes this vector
     */
    normalize(): this;
    /**
     * Linear interpolation between this vector an another
     * @param v
     * @param alpha
     */
    lerp(v: Vector2, alpha: number): this;
    rotate(angle: number, origin: Vector2): this;
    /**
     * Get the minimum value between this vector and another
     * @param v
     */
    min(v: Vector2): this;
    /**
    * Get the maximum value between this vector and another
    * @param v
    */
    max(v: Vector2): this;
    /**
     * Transform this vector into it's perpendicular
     */
    perpendicular(): this;
    /**
     * Clone this vector
     */
    clone(): Vector2;
    /**
     * Copy values from another vector
     * @param x
     */
    copy(x: Vector2): this;
    /**
     * Assign values from an array
     * @param array
     * @param offset
     */
    fromArray(array: number[], offset?: number): this;
    /**
     * Write values to an array
     * @param array
     * @param offset
     */
    toArray(array?: Array<number> | Float32Array, offset?: number): Float32Array | number[];
    /**
     * Return values in a Float32Array
     */
    toFloatArray(): Float32Array;
    static Add(p1: Vector2, p2: Vector2): Vector2;
    static Sub(p1: Vector2, p2: Vector2): Vector2;
    static Middle(p1: Vector2, p2: Vector2): Vector2;
    static Angle(p1: Vector2, p2: Vector2): number;
    static ComputeCentroid(points: Vector2[]): Vector2;
    static ComputeCenterOfMass(points: Vector2[]): Vector2;
    static ComputeArea(points: Vector2[]): number;
}
