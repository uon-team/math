/**
 * @file Frustum
 * @see uon.math.Frustum
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
import { Vector3 } from './Vector3';
import { Plane } from './Plane';
import { Sphere } from './Sphere';
import { AABB } from './AABB';
import { Matrix4 } from './Matrix4';
/**
 *
 * @memberOf uon.math
 */
export declare class Frustum {
    planes: Plane[];
    /**
     * A Frustum is defined by six planes
     *
     * @constructs
     */
    constructor();
    /**
     * Set the six planes of this frustum
     */
    set(p0: Plane, p1: Plane, p2: Plane, p3: Plane, p4: Plane, p5: Plane): this;
    /**
     * Copy values from another frustum
     */
    copy(frustum: Frustum): this;
    /**
     * Compute plane values from a view-projection matrix
     */
    setFromMatrix(m: Matrix4): this;
    /**
     * Test for intersection with a sphere
     *
     * @returns {Boolean}
     */
    intersectsSphere(sphere: Sphere): boolean;
    /**
     * Test for intersection with a box
     *
     * @returns {Boolean}
     */
    intersectsBox(box: AABB): boolean;
    /**
     * Test for containment of a point
     *
     * @returns {Boolean} True if the point is inside the frustum, false
     *          otherwise
     */
    containsPoint(point: Vector3): boolean;
    /**
     * Creates a copy of this frustum
     */
    clone(): Frustum;
}
