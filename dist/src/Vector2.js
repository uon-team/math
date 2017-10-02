/**
 * @file Vector2
 * @see uon.math.Vector2
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
import { IsNearEqual } from './Utils';
var ZERO_F32 = Math.fround(0.0);
var ONE_F32 = Math.fround(1.0);
var f32 = Math.fround;
var TWO_PI = Math.PI * 2;
/**
 *  A representation of a 2D vector
 */
var Vector2 = (function () {
    /**
     * @constructs
     */
    function Vector2(x, y) {
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
    Vector2.prototype.set = function (x, y) {
        this.x = f32(x);
        this.y = f32(y);
        return this;
    };
    /**
     * Equality test
     * @param v
     */
    Vector2.prototype.equals = function (v) {
        return ((v.x === this.x) && (v.y === this.y));
    };
    /**
     * Test for near equality given an espsilon
     * @param v
     * @param epsilon
     */
    Vector2.prototype.nearEquals = function (v, epsilon) {
        return (IsNearEqual(v.x, this.x, epsilon) && IsNearEqual(v.y, this.y, epsilon));
    };
    /**
     * Negate x and y
     */
    Vector2.prototype.negate = function () {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    };
    /**
     * Adds a vector2 to this one
     * @param vec2
     */
    Vector2.prototype.add = function (vec2) {
        this.x += vec2.x;
        this.y += vec2.y;
        return this;
    };
    /**
     * Substract a vector2 from this one
     * @param vec2
     */
    Vector2.prototype.subtract = function (vec2) {
        this.x -= vec2.x;
        this.y -= vec2.y;
        return this;
    };
    /**
     * Multiply this vector with another
     * @param vec2
     */
    Vector2.prototype.multiply = function (vec2) {
        this.x *= vec2.x;
        this.y *= vec2.y;
        return this;
    };
    /**
     * Multiply this vector by a scalar value
     * @param s
     */
    Vector2.prototype.multiplyScalar = function (s) {
        this.x *= s;
        this.y *= s;
        return this;
    };
    /**
     * Divide this vector by another
     * @param v
     */
    Vector2.prototype.divide = function (v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    };
    /**
     * Divide this vector by a scalar value
     * @param scalar
     */
    Vector2.prototype.divideScalar = function (scalar) {
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
    };
    /**
     * Compute a dot product
     * @param vec2
     */
    Vector2.prototype.dot = function (vec2) {
        return this.x * vec2.x + this.y * vec2.y;
    };
    /**
     * Computes the vector length
     */
    Vector2.prototype.length = function () {
        return Math.sqrt(this.lengthSq());
    };
    /**
     * Computes the vector squared length
     */
    Vector2.prototype.lengthSq = function () {
        var a = this;
        return a.x * a.x + a.y * a.y;
    };
    /**
     * Computes the distance between this point and another
     * @param v
     */
    Vector2.prototype.distance = function (v) {
        return Math.sqrt(this.distanceSq(v));
    };
    /**
     * Computes the distance between this point and another
     * @param v
     */
    Vector2.prototype.distanceSq = function (v) {
        return TEMP_VEC.copy(v).subtract(this).lengthSq();
    };
    /**
     * Normalizes this vector
     */
    Vector2.prototype.normalize = function () {
        var len = this.length();
        return this.divideScalar(len);
    };
    /**
     * Linear interpolation between this vector an another
     * @param v
     * @param alpha
     */
    Vector2.prototype.lerp = function (v, alpha) {
        //this.x += (v.x - this.x) * alpha;
        //this.y += (v.y - this.y) * alpha;
        this.x = (1 - alpha) * this.x + alpha * v.x;
        this.y = (1 - alpha) * this.y + alpha * v.y;
        return this;
    };
    /**
     * Rotate this vector around an origin
     * @param angle
     * @param origin
     */
    Vector2.prototype.rotate = function (angle, origin) {
        var rot_sin = Math.sin(angle);
        var rot_cos = Math.cos(angle);
        this.subtract(origin);
        var new_x = rot_cos * this.x - rot_sin * this.y;
        var new_y = rot_sin * this.x + rot_cos * this.y;
        this.set(new_x, new_y);
        this.add(origin);
        return this;
    };
    /**
     * Compute the absolute angle [0-2PI]
     * @param vec
     */
    Vector2.prototype.getAngle = function (vec) {
        var angle = this.getSignedAngle(vec);
        if (angle < 0) {
            angle += TWO_PI;
        }
        return angle;
    };
    /**
     * Compute the signed angle between this vector and another
     * @param vec
     */
    Vector2.prototype.getSignedAngle = function (vec) {
        var dot = this.x * vec.x + this.y * vec.y;
        var det = this.x * vec.y - this.y * vec.x;
        var angle = Math.atan2(det, dot);
        return angle;
    };
    /**
     * Get the minimum value between this vector and another
     * @param v
     */
    Vector2.prototype.min = function (v) {
        if (this.x > v.x) {
            this.x = v.x;
        }
        if (this.y > v.y) {
            this.y = v.y;
        }
        return this;
    };
    /**
    * Get the maximum value between this vector and another
    * @param v
    */
    Vector2.prototype.max = function (v) {
        if (this.x < v.x) {
            this.x = v.x;
        }
        if (this.y < v.y) {
            this.y = v.y;
        }
        return this;
    };
    /**
     * Transform this vector into it's perpendicular
     */
    Vector2.prototype.perpendicular = function () {
        var x = this.x;
        this.x = -this.y;
        this.y = x;
        return this;
    };
    /**
     * Project a vector on this one, vec is modified
     * @param vec
     */
    Vector2.prototype.project = function (vec) {
        var dot = this.dot(vec); // a.u
        var mod = vec.length(); // |u|
        mod *= mod; // |u|^2
        return vec.multiplyScalar(dot / mod);
    };
    /**
     * Clone this vector
     */
    Vector2.prototype.clone = function () {
        return new Vector2(this);
    };
    /**
     * Copy values from another vector
     * @param x
     */
    Vector2.prototype.copy = function (x) {
        this.x = x.x;
        this.y = x.y;
        return this;
    };
    /**
     * Assign values from an array
     * @param array
     * @param offset
     */
    Vector2.prototype.fromArray = function (array, offset) {
        if (offset === undefined)
            offset = 0;
        this.x = array[offset];
        this.y = array[offset + 1];
        return this;
    };
    /**
     * Write values to an array
     * @param array
     * @param offset
     */
    Vector2.prototype.toArray = function (array, offset) {
        if (array === undefined)
            array = [];
        if (offset === undefined)
            offset = 0;
        array[offset] = this.x;
        array[offset + 1] = this.y;
        return array;
    };
    /**
     * Return values in a Float32Array
     */
    Vector2.prototype.toFloatArray = function () {
        if (this._cache == null) {
            this._cache = new Float32Array(2);
        }
        this._cache[0] = this.x;
        this._cache[1] = this.y;
        return this._cache;
    };
    Vector2.prototype.toString = function () {
        return this.x + ', ' + this.y;
    };
    /**
     * Utility function for adding 2 vectors together, returns a new instance of Vector2
     * @param p1
     * @param p2
     */
    Vector2.Add = function (p1, p2) {
        return p1.clone().add(p2);
    };
    /**
     * Subtract a vector from another
     * @param p1
     * @param p2
     */
    Vector2.Sub = function (p1, p2) {
        return p1.clone().subtract(p2);
    };
    /**
     * Get the middle point between 2 vectors
     * @param p1
     * @param p2
     */
    Vector2.Middle = function (p1, p2) {
        return this.Add(p1, p2).multiplyScalar(0.5);
    };
    /**
     * Compute the angle between 2 vectors
     * @param p1
     * @param p2
     */
    Vector2.Angle = function (p1, p2) {
        return Math.atan2(p2.x - p1.x, p2.y - p1.y);
    };
    Vector2.GetTriangleArea = function (p, q, r) {
        return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    };
    Vector2.ComputeCentroid = function (points) {
        var centroid = new Vector2(0, 0);
        var signedArea = 0.0;
        var x0 = 0.0; // Current vertex X
        var y0 = 0.0; // Current vertex Y
        var x1 = 0.0; // Next vertex X
        var y1 = 0.0; // Next vertex Y
        var a = 0.0; // Partial signed area
        // For all vertices except last
        var i = 0;
        var l = 0;
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
    };
    Vector2.ComputeCenterOfMass = function (points) {
        var xsum = 0.0;
        var ysum = 0.0;
        var area = 0.0;
        for (var i = 0; i < points.length - 1; i++) {
            var p0 = points[i];
            var p1 = points[i + 1];
            var areaSum = (p0.x * p1.y) - (p1.x * p0.y);
            xsum += (p0.x + p1.x) * areaSum;
            ysum += (p0.y + p1.y) * areaSum;
            area += areaSum;
        }
        var centMassX = xsum / (area * 6);
        var centMassY = ysum / (area * 6);
        return new Vector2(centMassX, centMassY);
    };
    Vector2.ComputeArea = function (points) {
        var area = 0;
        // For all vertices except last
        for (var i = 0, j = points.length - 1; i < points.length; j = i++) {
            var p1 = points[j];
            var p2 = points[i];
            area = area + (p2.x + p1.x) * (p2.y - p1.y);
        }
        return area * 0.5;
    };
    Vector2.ComputeSignedArea = function (points) {
        var total_area = 0;
        //let points = this.points;
        var j;
        for (var i = 0; i < points.length - 1; ++i) {
            j = i + 1;
            total_area += ((points[i].x - points[j].x) * (points[j].y + (points[i].y - points[j].y) / 2));
        }
        // need to do points[point.length-1] and points[0].
        j = points.length - 1;
        total_area += ((points[j].x - points[0].x) * (points[0].y + (points[j].y - points[0].y) / 2));
        return total_area;
    };
    return Vector2;
}());
export { Vector2 };
// static 
Vector2.UnitX = new Vector2(1, 0);
Vector2.UnitY = new Vector2(0, 1);
Vector2.One = new Vector2(1, 1);
Vector2.Zero = new Vector2(0, 0);
;
var TEMP_VEC = new Vector2();
//# sourceMappingURL=Vector2.js.map