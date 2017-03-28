/**
 * @file AABB
 * @see uon.math.AABB
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
import { Vector3 } from "./Vector3";
/**
 * 3D axis aligned bounding box
 * @memberOf uon.math
 */
export declare class AABB {
    min: Vector3;
    max: Vector3;
    /**
     * An axis-aligned bounding-box
     *
     *
     */
    constructor(min?: Vector3, max?: Vector3);
    /**
     * Asign new values to this box
     */
    set(min: Vector3, max: Vector3): this;
    /**
     * Compute a box around the given points
     */
    setFromPoints(points: Vector3[]): this;
    /**
     * Empty this box
     */
    empty(): this;
    /**
     * Test for equality with another box
     */
    equals(box: AABB): boolean;
    /**
     * Computes the center of the box and return its value
     *
     * @returns {uon.math.Vector3}
     */
    getCenter(output?: Vector3): Vector3;
    /**
     * Computes the size of the box for each axis
     *
     * @returns {uon.math.Vector3}
     */
    getSize(output?: Vector3): Vector3;
    /**
     * Test for containment
     *
     * @param {uon.math.Vector3}
     *            point
     */
    containsPoint(point: Vector3): boolean;
    /**
     * Test if a box is contained within this one
     *
     * @param {uon.math.AABB}
     *            box
     * @returns {Boolean}
     */
    containsBox(box: AABB): boolean;
    /**
     * Test for intersection with another box
     *
     * @param {uon.math.AABB}
     *            box
     */
    intersects(box: AABB): boolean;
    /**
     * Expand the box to contain a point
     */
    expand(point: Vector3): this;
    /**
     * Scale the box
     */
    scale(scalar: number): this;
    /**
     * Expand this box to contain another box
     */
    merge(box: AABB): this;
    /**
     * Creates a copy of this box
     */
    clone(): AABB;
    /**
     * Copy values form another box
     */
    copy(box: AABB): this;
}
