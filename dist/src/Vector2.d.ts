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
    /**
     * Test for near equality given an espsilon
     * @param v
     * @param epsilon
     */
    nearEquals(v: Vector2, epsilon?: number): boolean;
    /**
     * Negate x and y
     */
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
     * Computes the distance between this point and another
     * @param v
     */
    distance(v: Vector2): number;
    /**
     * Computes the distance between this point and another
     * @param v
     */
    distanceSq(v: Vector2): number;
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
    /**
     * Rotate this vector around an origin
     * @param angle
     * @param origin
     */
    rotate(angle: number, origin: Vector2): this;
    /**
     * Compute the absolute angle [0-2PI]
     * @param vec
     */
    getAngle(vec: Vector2): number;
    /**
     * Compute the signed angle between this vector and another
     * @param vec
     */
    getSignedAngle(vec: Vector2): number;
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
     * Project a vector on this one, vec is modified
     * @param vec
     */
    project(vec: Vector2): Vector2;
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
    toArray(array?: Array<number> | Float32Array, offset?: number): number[] | Float32Array;
    /**
     * Return values in a Float32Array
     */
    toFloatArray(): Float32Array;
    toString(): string;
    /**
     * Utility function for adding 2 vectors together, returns a new instance of Vector2
     * @param p1
     * @param p2
     */
    static Add(p1: Vector2, p2: Vector2): Vector2;
    /**
     * Subtract a vector from another
     * @param p1
     * @param p2
     */
    static Sub(p1: Vector2, p2: Vector2): Vector2;
    /**
     * Get the middle point between 2 vectors
     * @param p1
     * @param p2
     */
    static Middle(p1: Vector2, p2: Vector2): Vector2;
    /**
     * Compute the angle between 2 vectors
     * @param p1
     * @param p2
     */
    static Angle(p1: Vector2, p2: Vector2): number;
    static GetTriangleArea(p: Vector2, q: Vector2, r: Vector2): number;
    static ComputeCentroid(points: Vector2[]): Vector2;
    static ComputeCenterOfMass(points: Vector2[]): Vector2;
    static ComputeArea(points: Vector2[]): number;
    static ComputeSignedArea(points: Vector2[]): number;
}
