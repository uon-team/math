/**
 * @file Ray
 * @see uon.math.Ray
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
import { Vector2 } from './Vector2';
var Rectangle = (function () {
    function Rectangle(min, max) {
        this.min = (min !== undefined) ?
            min : new Vector2(Infinity, Infinity);
        this.max = (max !== undefined) ?
            max : new Vector2(-Infinity, -Infinity);
    }
    /**
     * Asign new values to this box
     */
    Rectangle.prototype.set = function (min, max) {
        this.min.copy(min);
        this.max.copy(max);
        return this;
    };
    /**
     * Compute a box around the given points
     */
    Rectangle.prototype.setFromPoints = function (points) {
        this.empty();
        for (var i = 0, il = points.length; i < il; i++) {
            this.expand(points[i]);
        }
        return this;
    };
    /**
     * Empty this box
     */
    Rectangle.prototype.empty = function () {
        this.min.x = this.min.y = Infinity;
        this.max.x = this.max.y = -Infinity;
        return this;
    };
    /**
     * Test for equality with another box
     */
    Rectangle.prototype.equals = function (box) {
        return box.min.equals(this.min) && box.max.equals(this.max);
    };
    /**
     * Computes the center of the box and return its value
     *
     * @returns {uon.math.Vector3}
     */
    Rectangle.prototype.getCenter = function (output) {
        var result = output || new Vector2();
        return result.copy(this.min).add(this.max).multiplyScalar(0.5);
    };
    /**
     * Computes the size of the box for each axis
     *
     * @returns {uon.math.Vector3}
     */
    Rectangle.prototype.getSize = function (output) {
        var result = output || new Vector2();
        return result.copy(this.max).subtract(this.min);
    };
    /**
     * Test for containment
     *
     * @param {uon.math.Vector3}
     *            point
     */
    Rectangle.prototype.containsPoint = function (point) {
        if (point.x < this.min.x || point.x > this.max.x
            || point.y < this.min.y || point.y > this.max.y) {
            return false;
        }
        return true;
    };
    /**
     * Test if a box is contained within this one
     *
     * @param {Rectangle} box
     * @returns {Boolean}
     */
    Rectangle.prototype.containsBox = function (box) {
        if ((this.min.x <= box.min.x) && (box.max.x <= this.max.x)
            && (this.min.y <= box.min.y) && (box.max.y <= this.max.y)) {
            return true;
        }
        return false;
    };
    /**
     * Test for intersection with another box
     *
     * @param {Rectangle} box
     */
    Rectangle.prototype.intersects = function (box) {
        if (box.max.x < this.min.x || box.min.x > this.max.x
            || box.max.y < this.min.y || box.min.y > this.max.y) {
            return false;
        }
        return true;
    };
    /**
     * Expand the box to contain a point
     */
    Rectangle.prototype.expand = function (point) {
        this.min.min(point);
        this.max.max(point);
        return this;
    };
    /**
     * Scale the box
     */
    Rectangle.prototype.scale = function (scalar) {
        this.min.multiplyScalar(scalar);
        this.max.multiplyScalar(scalar);
        return this;
    };
    /**
     * Expand this box to contain another box
     */
    Rectangle.prototype.merge = function (box) {
        this.min.min(box.min);
        this.max.max(box.max);
        return this;
    };
    /**
     * Creates a copy of this box
     */
    Rectangle.prototype.clone = function () {
        return new Rectangle().copy(this);
    };
    /**
     * Copy values form another box
     */
    Rectangle.prototype.copy = function (box) {
        this.min.copy(box.min);
        this.max.max(box.max);
        return this;
    };
    return Rectangle;
}());
export { Rectangle };
//# sourceMappingURL=Rectangle.js.map