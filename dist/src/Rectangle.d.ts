/**
 * @file Ray
 * @see uon.math.Ray
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
import { Vector2 } from './Vector2';
export declare class Rectangle {
    min: Vector2;
    max: Vector2;
    constructor(min?: Vector2, max?: Vector2);
    /**
     * Asign new values to this box
     */
    set(min: Vector2, max: Vector2): this;
    /**
     * Compute a box around the given points
     */
    setFromPoints(points: Vector2[]): this;
    /**
     * Empty this box
     */
    empty(): this;
    /**
     * Test for equality with another box
     */
    equals(box: Rectangle): boolean;
    /**
     * Computes the center of the box and return its value
     *
     * @returns {uon.math.Vector3}
     */
    getCenter(output?: Vector2): Vector2;
    /**
     * Computes the size of the box for each axis
     *
     * @returns {uon.math.Vector3}
     */
    getSize(output?: Vector2): Vector2;
    /**
     * Test for containment
     *
     * @param {uon.math.Vector3}
     *            point
     */
    containsPoint(point: Vector2): boolean;
    /**
     * Test if a box is contained within this one
     *
     * @param {Rectangle} box
     * @returns {Boolean}
     */
    containsBox(box: Rectangle): boolean;
    /**
     * Test for intersection with another box
     *
     * @param {Rectangle} box
     */
    intersects(box: Rectangle): boolean;
    /**
     * Expand the box to contain a point
     */
    expand(point: Vector2): this;
    /**
     * Scale the box
     */
    scale(scalar: number): this;
    /**
     * Expand this box to contain another box
     */
    merge(box: Rectangle): this;
    /**
     * Creates a copy of this box
     */
    clone(): Rectangle;
    /**
     * Copy values form another box
     */
    copy(box: Rectangle): this;
}
