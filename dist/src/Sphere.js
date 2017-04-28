/**
 * @file Sphere
 * @see uon.math.Sphere
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
import { Vector3 } from './Vector3';
import { AABB } from './AABB';
var f32 = Math.fround;
var TEMP_AABB = new AABB();
/**
 * A sphere is defined by a point and a radius
 */
var Sphere = (function () {
    /**
     * A sphere is defined by a point and a radius
     *
     * @constructs
     * @param {uon.math.Vector3}
     *            center The origin of the sphere to create
     * @param {Number}
     *            radius The radius of the sphere
     */
    function Sphere(center, radius) {
        this.center = (center !== undefined) ? center : new Vector3();
        this.radius = (radius !== undefined) ? f32(radius) : f32(0);
    }
    /**
     * Assign values on this sphere object
     *
     * @param {uon.math.Vector3}
     *            center The origin of the sphere to create
     * @param {Number}
     *            radius The radius of the sphere
     * @returns {this}
     */
    Sphere.prototype.set = function (center, radius) {
        this.center.copy(center);
        this.radius = f32(radius);
        return this;
    };
    /**
     * Reset the sphere values and encapsulate all the points
     *
     * @param {uon.math.Vector3[]}
     *            points A collection of Vector3
     * @param {uon.math.Vector3}
     *            [optionalCenter] If defined the origin of the sphere will be
     *            set with this value
     */
    Sphere.prototype.setFromPoints = function (points, center) {
        var box = TEMP_AABB;
        this.center;
        if (center !== undefined) {
            this.center.copy(center);
        }
        else {
            box.setFromPoints(points).getCenter(this.center);
        }
        var max_radius_sq = 0;
        for (var i = 0, il = points.length; i < il; i++) {
            max_radius_sq = Math.max(max_radius_sq, center.distanceToSquared(points[i]));
        }
        this.radius = Math.sqrt(max_radius_sq);
        return this;
    };
    /**
     * Copy values from another Sphere
     *
     * @param {uon.math.Sphere}
     *            sphere The Sphere to copy values from
     */
    Sphere.prototype.copy = function (sphere) {
        this.center.copy(sphere.center);
        this.radius = sphere.radius;
        return this;
    };
    /**
     * Determines if this sphere is empty (ie. the radius is 0)
     *
     * @returns {Boolean}
     */
    Sphere.prototype.empty = function () {
        return (this.radius <= 0);
    };
    /**
     * Test for containment
     *
     * @param {uon.math.Vector3}
     *            point The point to test for containment
     * @returns {Boolean} True if the point is inside the sphere, false
     *          otherwise
     */
    Sphere.prototype.containsPoint = function (point) {
        return (point.distanceToSquared(this.center) <= (this.radius * this.radius));
    };
    /**
     * Computes the distance from a point to the outside of the sphere
     *
     * @param {uon.math.Vector3}
     *            point
     * @returns {Number}
     */
    Sphere.prototype.distanceToPoint = function (point) {
        return (point.distanceTo(this.center) - this.radius);
    };
    /**
     * Determines if a sphere intersects this one
     *
     * @param {Sphere} sphere The sphere to test against
     * @returns {Boolean} True if the spheres intersect, false otherwise
     */
    Sphere.prototype.intersectsSphere = function (sphere) {
        var radius_sum = this.radius + sphere.radius;
        return sphere.center.distanceToSquared(this.center) <= (radius_sum * radius_sum);
    };
    /**
     * Clamp a point to the surface of the sphere
     */
    Sphere.prototype.clampPoint = function (point, output) {
        var radius = this.radius, center = this.center, delta_length_sq = this.center.distanceToSquared(point);
        var result = output || new Vector3();
        result.copy(point);
        if (delta_length_sq > (radius * radius)) {
            result.subtract(center).normalize();
            result.multiplyScalar(radius).add(center);
        }
        return result;
    };
    /**
     * Computes an axis-aligned bounding-box around this sphere
     */
    Sphere.prototype.getBoundingBox = function (output) {
        var box = output || new AABB();
        box.set(this.center, this.center);
        box.scale(this.radius);
        return box;
    };
    /**
     * Transforms the sphere with a Matrix4
     */
    Sphere.prototype.applyMatrix4 = function (matrix) {
        var scale = matrix.getScale();
        this.center.applyMatrix4(matrix);
        this.radius = this.radius * Math.max(scale.x, scale.y, scale.z);
        return this;
    };
    /**
     * Translate this sphere by adding an position offset to the center
     *
     * @param {uon.math.Vector3}
     *            offset
     */
    Sphere.prototype.translate = function (offset) {
        this.center.add(offset);
        return this;
    };
    /**
     * Test for equality
     */
    Sphere.prototype.equals = function (sphere) {
        return sphere.center.equals(this.center) && (sphere.radius === this.radius);
    };
    /**
     * Make a copy of this sphere
     *
     * @returns {uon.math.Sphere} The copy
     */
    Sphere.prototype.clone = function () {
        return new Sphere().copy(this);
    };
    return Sphere;
}());
export { Sphere };
;
//# sourceMappingURL=Sphere.js.map