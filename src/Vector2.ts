/**
 * @file Vector2
 * @see uon.math.Vector2
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

import { IsNearEqual, f32, ZERO_F32, TWO_PI } from './Utils';



/**
 *  A representation of a 2D vector
 */
export class Vector2 {

    // memeber
    public x: number = ZERO_F32;
    public y: number = ZERO_F32;
    private _cache: Float32Array;

    // static 
    public static UnitX: Vector2 = new Vector2(1, 0);
    public static UnitY: Vector2 = new Vector2(0, 1);
    public static One: Vector2 = new Vector2(1, 1);
    public static Zero: Vector2 = new Vector2(0, 0);

	/**
	 * @constructs
	 */
    constructor(x?: any, y?: number) {

        var v = this;
        if (arguments.length == 2) {
            v.x = f32(x);
            v.y = f32(y);
        } else if (Array.isArray(x)) {
            v.x = f32(x[0]);
            v.y = f32(x[1]);
        } else if (x instanceof Vector2) {
            v.x = x.x;
            v.y = x.y;
        }

    }

    /**
     * Sets values
     * @param x
     * @param y
     */
    set(x: number, y: number) {

        this.x = f32(x);
        this.y = f32(y);

        return this;

    }

    /**
     * Equality test
     * @param v
     */
    equals(v: Vector2) {

        return ((v.x === this.x) && (v.y === this.y));

    }

    /**
     * Test for near equality given an espsilon
     * @param v
     * @param epsilon
     */
    nearEquals(v: Vector2, epsilon?: number) {
        return (IsNearEqual(v.x, this.x, epsilon) && IsNearEqual(v.y, this.y, epsilon));
    }


    /**
     * Negate x and y
     */
    negate() {

        this.x = -this.x;
        this.y = -this.y;

        return this;

    }

    /**
     * Adds a vector2 to this one
     * @param vec2
     */
    add(vec2: Vector2) {
        this.x += vec2.x;
        this.y += vec2.y;
        return this;
    }

    /**
     * Substract a vector2 from this one
     * @param vec2
     */
    subtract(vec2: Vector2) {
        this.x -= vec2.x;
        this.y -= vec2.y;
        return this;
    }

    /**
     * Multiply this vector with another
     * @param vec2
     */
    multiply(vec2: Vector2) {
        this.x *= vec2.x;
        this.y *= vec2.y;
        return this;
    }

    /**
     * Multiply this vector by a scalar value
     * @param s
     */
    multiplyScalar(s: number) {

        this.x *= s;
        this.y *= s;

        return this;

    }

    /**
     * Divide this vector by another
     * @param v
     */
    divide(v: Vector2) {

        this.x /= v.x;
        this.y /= v.y;

        return this;

    }

    /**
     * Divide this vector by a scalar value
     * @param scalar
     */
    divideScalar(scalar: number) {

        if (scalar !== 0) {

            var inv = 1 / scalar;

            this.x *= inv;
            this.y *= inv;

        } else {

            this.x = 0;
            this.y = 0;

        }

        return this;

    }

    /**
     * Compute a dot product
     * @param vec2
     */
    dot(vec2: Vector2) {
        return this.x * vec2.x + this.y * vec2.y;
    }

    /**
     * Computes the vector length
     */
    length() {
        return Math.sqrt(this.lengthSq());
    }

    /**
     * Computes the vector squared length 
     */
    lengthSq() {
        var a = this;
        return a.x * a.x + a.y * a.y;
    }

    /**
     * Computes the distance between this point and another
     * @param v
     */
    distance(v: Vector2) {
        return Math.sqrt(this.distanceSq(v));
    }

    /**
     * Computes the distance between this point and another
     * @param v
     */
    distanceSq(v: Vector2) {
        return TEMP_VEC.copy(v).subtract(this).lengthSq();
    }

    /**
     * Normalizes this vector
     */
    normalize() {
        var len = this.length();
        return this.divideScalar(len);
    }

    /**
     * Linear interpolation between this vector an another
     * @param v
     * @param alpha
     */
    lerp(v: Vector2, alpha: number) {
        //this.x += (v.x - this.x) * alpha;
        //this.y += (v.y - this.y) * alpha;

        this.x = (1 - alpha) * this.x + alpha * v.x;
        this.y = (1 - alpha) * this.y + alpha * v.y;

        return this;
    }


    /**
     * Rotate this vector around an origin
     * @param angle
     * @param origin
     */
    rotate(angle: number, origin: Vector2) {

        let rot_sin = Math.sin(angle);
        let rot_cos = Math.cos(angle);


        this.subtract(origin);

        let new_x = rot_cos * this.x - rot_sin * this.y;
        let new_y = rot_sin * this.x + rot_cos * this.y;

        this.set(new_x, new_y);

        this.add(origin);

        return this;

    }

    /**
     * Compute the absolute angle [0-2PI]
     * @param vec
     */
    getAngle(vec: Vector2) {
        let angle = this.getSignedAngle(vec);

        if (angle < 0) {
            angle += TWO_PI;
        }

        return angle;
    }

    /**
     * Compute the signed angle between this vector and another
     * @param vec
     */
    getSignedAngle(vec: Vector2) {

        let dot = this.x * vec.x + this.y * vec.y;
        let det = this.x * vec.y - this.y * vec.x;
        let angle = Math.atan2(det, dot);

        return angle;

    }

    /**
     * Get the minimum value between this vector and another
     * @param v
     */
    min(v: Vector2) {

        if (this.x > v.x) {

            this.x = v.x;

        }

        if (this.y > v.y) {

            this.y = v.y;

        }

        return this;

    }

    /**
    * Get the maximum value between this vector and another
    * @param v
    */
    max(v: Vector2) {

        if (this.x < v.x) {
            this.x = v.x;
        }

        if (this.y < v.y) {
            this.y = v.y;
        }

        return this;

    }

    /**
     * Transform this vector into it's perpendicular
     */
    perpendicular() {

        var x = this.x;
        this.x = -this.y;
        this.y = x;

        return this;

    }


    /**
     * Project a vector on this one, vec is modified
     * @param vec
     */
    project(vec: Vector2) {
        let dot = this.dot(vec); // a.u
        let mod = vec.length(); // |u|
        mod *= mod; // |u|^2
        return vec.multiplyScalar(dot / mod);
    }

    /**
     * Clone this vector
     */
    clone() {
        return new Vector2(this);
    }

    /**
     * Copy values from another vector
     * @param x
     */
    copy(x: Vector2) {
        this.x = x.x;
        this.y = x.y;

        return this;
    }

    /**
     * Assign values from an array
     * @param array
     * @param offset
     */
    fromArray(array: number[], offset?: number) {

        if (offset === undefined)
            offset = 0;

        this.x = array[offset];
        this.y = array[offset + 1];

        return this;

    }

    /**
     * Write values to an array
     * @param array
     * @param offset
     */
    toArray(array?: Array<number> | Float32Array, offset?: number) {

        if (array === undefined)
            array = [];
        if (offset === undefined)
            offset = 0;

        array[offset] = this.x;
        array[offset + 1] = this.y;

        return array;

    }

    /**
     * Return values in a Float32Array
     */
    toFloatArray(): Float32Array {

        if (this._cache == null) {
            this._cache = new Float32Array(2);
        }

        this._cache[0] = this.x;
        this._cache[1] = this.y;

        return this._cache;

    }

    toString() {
        return this.x + ', ' + this.y;
    }

    /**
     * Utility function for adding 2 vectors together, returns a new instance of Vector2
     * @param p1
     * @param p2
     */
    static Add(p1: Vector2, p2: Vector2) {
        return p1.clone().add(p2);
    }

    /**
     * Subtract a vector from another
     * @param p1
     * @param p2
     */
    static Sub(p1: Vector2, p2: Vector2) {
        return p1.clone().subtract(p2);
    }

    /**
     * Get the middle point between 2 vectors
     * @param p1
     * @param p2
     */
    static Middle(p1: Vector2, p2: Vector2) {
        return this.Add(p1, p2).multiplyScalar(0.5);
    }

    /**
     * Compute the angle between 2 vectors
     * @param p1
     * @param p2
     */
    static Angle(p1: Vector2, p2: Vector2) {
        return Math.atan2(p2.x - p1.x, p2.y - p1.y);
    }


	/**
	 * Compute the signed area of a triangle
	 * @param p
	 * @param q
	 * @param r
	 */
    static GetTriangleArea(p: Vector2, q: Vector2, r: Vector2) {

        return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    }


	/**
	 * Compute the centroid of a set of points
	 * @param points
	 */
    static ComputeCentroid(points: Vector2[]) {


        let centroid = new Vector2(0, 0);
        let signedArea = 0.0;
        let x0 = 0.0; // Current vertex X
        let y0 = 0.0; // Current vertex Y
        let x1 = 0.0; // Next vertex X
        let y1 = 0.0; // Next vertex Y
        let a = 0.0;  // Partial signed area

        // For all vertices except last
        let i = 0;
        let l = 0;
        for (i = 0, l = points.length - 1; i < l; ++i) {
            x0 = points[i].x;
            y0 = points[i].y;
            x1 = points[i + 1].x;
            y1 = points[i + 1].y;
            a = x0 * y1 - x1 * y0;
            signedArea += a;
            centroid.x += (x0 + x1) * a;
            centroid.y += (y0 + y1) * a;
        }

        // Do last vertex separately to avoid performing an expensive
        // modulus operation in each iteration.
        x0 = points[i].x;
        y0 = points[i].y;
        x1 = points[0].x;
        y1 = points[0].y;
        a = x0 * y1 - x1 * y0;
        signedArea += a;
        centroid.x += (x0 + x1) * a;
        centroid.y += (y0 + y1) * a;

        signedArea *= 0.5;
        centroid.x /= (6.0 * signedArea);
        centroid.y /= (6.0 * signedArea);

        return centroid;

    }

    static ComputeCenterOfMass(points: Vector2[]): Vector2 {

        let xsum = 0.0;
        let ysum = 0.0;
        let area = 0.0;
        for (let i = 0; i < points.length - 1; i++) {

            let p0 = points[i];
            let p1 = points[i + 1];

            let areaSum = (p0.x * p1.y) - (p1.x * p0.y)

            xsum += (p0.x + p1.x) * areaSum;
            ysum += (p0.y + p1.y) * areaSum;
            area += areaSum;
        }

        let centMassX = xsum / (area * 6);
        let centMassY = ysum / (area * 6);

        return new Vector2(centMassX, centMassY);
    }


	/**
	 * Compute the signed area of a set of points
	 * @param points
	 */
    static ComputeArea(points: Vector2[]) {


        let area = 0;

        // For all vertices except last
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {

            let p1 = points[j];
            let p2 = points[i];
            area = area + (p2.x + p1.x) * (p2.y - p1.y);
        }

        return area * 0.5;
    }

    static ComputeSignedArea(points: Vector2[]) {

        let total_area = 0;
        //let points = this.points;
        let j;

        for (let i = 0; i < points.length - 1; ++i) {
            j = i + 1;
            total_area += ((points[i].x - points[j].x) * (points[j].y + (points[i].y - points[j].y) / 2));
        }

        // need to do points[point.length-1] and points[0].
        j = points.length - 1;
        total_area += ((points[j].x - points[0].x) * (points[0].y + (points[j].y - points[0].y) / 2));

        return total_area;
    }

};


var TEMP_VEC = new Vector2();
