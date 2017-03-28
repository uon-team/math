/**
 * @file Ray
 * @see uon.math.Ray
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
import { Vector2 } from './Vector2';
export class Rectangle {
    constructor(min, max) {
        this.min = (min !== undefined) ?
            min : new Vector2(Infinity, Infinity);
        this.max = (max !== undefined) ?
            max : new Vector2(-Infinity, -Infinity);
    }
    /**
     * Asign new values to this box
     */
    set(min, max) {
        this.min.copy(min);
        this.max.copy(max);
        return this;
    }
    /**
     * Compute a box around the given points
     */
    setFromPoints(points) {
        this.empty();
        for (var i = 0, il = points.length; i < il; i++) {
            this.expand(points[i]);
        }
        return this;
    }
    /**
     * Empty this box
     */
    empty() {
        this.min.x = this.min.y = Infinity;
        this.max.x = this.max.y = -Infinity;
        return this;
    }
    /**
     * Test for equality with another box
     */
    equals(box) {
        return box.min.equals(this.min) && box.max.equals(this.max);
    }
    /**
     * Computes the center of the box and return its value
     *
     * @returns {uon.math.Vector3}
     */
    getCenter(output) {
        var result = output || new Vector2();
        return result.copy(this.min).add(this.max).multiplyScalar(0.5);
    }
    /**
     * Computes the size of the box for each axis
     *
     * @returns {uon.math.Vector3}
     */
    getSize(output) {
        var result = output || new Vector2();
        return result.copy(this.max).subtract(this.min);
    }
    /**
     * Test for containment
     *
     * @param {uon.math.Vector3}
     *            point
     */
    containsPoint(point) {
        if (point.x < this.min.x || point.x > this.max.x
            || point.y < this.min.y || point.y > this.max.y) {
            return false;
        }
        return true;
    }
    /**
     * Test if a box is contained within this one
     *
     * @param {Rectangle} box
     * @returns {Boolean}
     */
    containsBox(box) {
        if ((this.min.x <= box.min.x) && (box.max.x <= this.max.x)
            && (this.min.y <= box.min.y) && (box.max.y <= this.max.y)) {
            return true;
        }
        return false;
    }
    /**
     * Test for intersection with another box
     *
     * @param {Rectangle} box
     */
    intersects(box) {
        if (box.max.x < this.min.x || box.min.x > this.max.x
            || box.max.y < this.min.y || box.min.y > this.max.y) {
            return false;
        }
        return true;
    }
    /**
     * Expand the box to contain a point
     */
    expand(point) {
        this.min.min(point);
        this.max.max(point);
        return this;
    }
    /**
     * Scale the box
     */
    scale(scalar) {
        this.min.multiplyScalar(scalar);
        this.max.multiplyScalar(scalar);
        return this;
    }
    /**
     * Expand this box to contain another box
     */
    merge(box) {
        this.min.min(box.min);
        this.max.max(box.max);
        return this;
    }
    /**
     * Creates a copy of this box
     */
    clone() {
        return new Rectangle().copy(this);
    }
    /**
     * Copy values form another box
     */
    copy(box) {
        this.min.copy(box.min);
        this.max.max(box.max);
        return this;
    }
}
//# sourceMappingURL=Rectangle.js.map