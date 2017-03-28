/**
 * @file Sphere
 * @see uon.math.Sphere
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
import { Vector3 } from './Vector3';
import { AABB } from './AABB';
import { Matrix4 } from './Matrix4';
/**
 * A sphere is defined by a point and a radius
 */
export declare class Sphere {
    center: Vector3;
    radius: number;
    /**
     * A sphere is defined by a point and a radius
     *
     * @constructs
     * @param {uon.math.Vector3}
     *            center The origin of the sphere to create
     * @param {Number}
     *            radius The radius of the sphere
     */
    constructor(center?: Vector3, radius?: number);
    /**
     * Assign values on this sphere object
     *
     * @param {uon.math.Vector3}
     *            center The origin of the sphere to create
     * @param {Number}
     *            radius The radius of the sphere
     * @returns {this}
     */
    set(center: Vector3, radius: number): this;
    /**
     * Reset the sphere values and encapsulate all the points
     *
     * @param {uon.math.Vector3[]}
     *            points A collection of Vector3
     * @param {uon.math.Vector3}
     *            [optionalCenter] If defined the origin of the sphere will be
     *            set with this value
     */
    setFromPoints(points: Vector3[], center?: Vector3): this;
    /**
     * Copy values from another Sphere
     *
     * @param {uon.math.Sphere}
     *            sphere The Sphere to copy values from
     */
    copy(sphere: Sphere): this;
    /**
     * Determines if this sphere is empty (ie. the radius is 0)
     *
     * @returns {Boolean}
     */
    empty(): boolean;
    /**
     * Test for containment
     *
     * @param {uon.math.Vector3}
     *            point The point to test for containment
     * @returns {Boolean} True if the point is inside the sphere, false
     *          otherwise
     */
    containsPoint(point: Vector3): boolean;
    /**
     * Computes the distance from a point to the outside of the sphere
     *
     * @param {uon.math.Vector3}
     *            point
     * @returns {Number}
     */
    distanceToPoint(point: Vector3): number;
    /**
     * Determines if a sphere intersects this one
     *
     * @param {Sphere} sphere The sphere to test against
     * @returns {Boolean} True if the spheres intersect, false otherwise
     */
    intersectsSphere(sphere: Sphere): boolean;
    /**
     * Clamp a point to the surface of the sphere
     */
    clampPoint(point: Vector3, output?: Vector3): Vector3;
    /**
     * Computes an axis-aligned bounding-box around this sphere
     */
    getBoundingBox(output: AABB): AABB;
    /**
     * Transforms the sphere with a Matrix4
     */
    applyMatrix4(matrix: Matrix4): this;
    /**
     * Translate this sphere by adding an position offset to the center
     *
     * @param {uon.math.Vector3}
     *            offset
     */
    translate(offset: Vector3): this;
    /**
     * Test for equality
     */
    equals(sphere: Sphere): boolean;
    /**
     * Make a copy of this sphere
     *
     * @returns {uon.math.Sphere} The copy
     */
    clone(): Sphere;
}
