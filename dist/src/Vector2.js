/**
 * @file Vector2
 * @see uon.math.Vector2
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
const ZERO_F32 = Math.fround(0.0);
const ONE_F32 = Math.fround(1.0);
const f32 = Math.fround;
/**
 *  A representation of a 2D vector
 */
export class Vector2 {
    /**
     * @constructs
     */
    constructor(x, y) {
        // memeber
        this.x = ZERO_F32;
        this.y = ZERO_F32;
        var v = this;
        if (arguments.length == 2) {
            v.x = f32(x);
            v.y = f32(y);
        }
        else if (Array.isArray(x)) {
            v.x = f32(x[0]);
            v.y = f32(x[1]);
        }
        else if (x instanceof Vector2) {
            v.x = x.x;
            v.y = x.y;
        }
    }
    /**
     * Sets values
     * @param x
     * @param y
     */
    set(x, y) {
        this.x = f32(x);
        this.y = f32(y);
        return this;
    }
    /**
     * Equality test
     * @param v
     */
    equals(v) {
        return ((v.x === this.x) && (v.y === this.y));
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    /**
     * Adds a vector2 to this one
     * @param vec2
     */
    add(vec2) {
        this.x += vec2.x;
        this.y += vec2.y;
        return this;
    }
    /**
     * Substract a vector2 from this one
     * @param vec2
     */
    subtract(vec2) {
        this.x -= vec2.x;
        this.y -= vec2.y;
        return this;
    }
    /**
     * Multiply this vector with another
     * @param vec2
     */
    multiply(vec2) {
        this.x *= vec2.x;
        this.y *= vec2.y;
        return this;
    }
    /**
     * Multiply this vector by a scalar value
     * @param s
     */
    multiplyScalar(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }
    /**
     * Divide this vector by another
     * @param v
     */
    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }
    /**
     * Divide this vector by a scalar value
     * @param scalar
     */
    divideScalar(scalar) {
        if (scalar !== 0) {
            var inv = 1 / scalar;
            this.x *= inv;
            this.y *= inv;
        }
        else {
            this.x = 0;
            this.y = 0;
        }
        return this;
    }
    /**
     * Compute a dot product
     * @param vec2
     */
    dot(vec2) {
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
    lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        return this;
    }
    rotate(angle, origin) {
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
     * Get the minimum value between this vector and another
     * @param v
     */
    min(v) {
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
    max(v) {
        if (this.x < v.x) {
            this.x = v.x;
        }
        if (this.y < v.y) {
            this.y = v.y;
        }
        return this;
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
    copy(x) {
        this.x = x.x;
        this.y = x.y;
        return this;
    }
    /**
     * Assign values from an array
     * @param array
     * @param offset
     */
    fromArray(array, offset) {
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
    toArray(array, offset) {
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
    toFloatArray() {
        if (this._cache == null) {
            this._cache = new Float32Array(2);
        }
        this._cache[0] = this.x;
        this._cache[1] = this.y;
        return this._cache;
    }
    static ComputeCentroid(points) {
        let centroid = new Vector2(0, 0);
        let signedArea = 0.0;
        let x0 = 0.0; // Current vertex X
        let y0 = 0.0; // Current vertex Y
        let x1 = 0.0; // Next vertex X
        let y1 = 0.0; // Next vertex Y
        let a = 0.0; // Partial signed area
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
    static ComputeCenterOfMass(points) {
        // use doubles if appropriate
        let xsum = 0.0;
        let ysum = 0.0;
        let area = 0.0;
        for (let i = 0; i < points.length - 1; i++) {
            // I'm not a c++ guy... do you need to use pointers? You make the call here
            let p0 = points[i];
            let p1 = points[i + 1];
            let areaSum = (p0.x * p1.y) - (p1.x * p0.y);
            xsum += (p0.x + p1.x) * areaSum;
            ysum += (p0.y + p1.y) * areaSum;
            area += areaSum;
        }
        let centMassX = xsum / (area * 6);
        let centMassY = ysum / (area * 6);
        return new Vector2(centMassX, centMassY);
    }
    static ComputeArea(points) {
        let area = 0;
        // For all vertices except last
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
            let p1 = points[j];
            let p2 = points[i];
            area = area + (p2.x + p1.x) * (p2.y - p1.y);
        }
        return area * 0.5;
    }
}
// static 
Vector2.UnitX = new Vector2(1, 0);
Vector2.UnitY = new Vector2(0, 1);
Vector2.One = new Vector2(1, 1);
Vector2.Zero = new Vector2(0, 0);
;
//# sourceMappingURL=Vector2.js.map