/**
 * @file Ray
 * @see uon.math.Ray
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
import { Vector3 } from './Vector3';
import { AABB } from './AABB';
import { Plane } from './Plane';
import { Sphere } from './Sphere';
import { Matrix4 } from './Matrix4';
/**
 * @memberOf uon.math
 */
export declare class Ray {
    origin: Vector3;
    dir: Vector3;
    /**
     * @constructs
     */
    constructor(origin?: Vector3, dir?: Vector3);
    /**
     * Assign new values to this Ray
     */
    set(origin: Vector3, dir: Vector3): this;
    /**
     * Computes the position of a point along the Ray
     */
    at(t: number, output?: Vector3): Vector3;
    /**
     * Test for equaity
     */
    equals(ray: Ray): boolean;
    /**
     * Make a copy of this ray
     */
    clone(): Ray;
    /**
     * Copy values from another Ray
     */
    copy(ray: Ray): this;
    /**
     * Test for intersection with an aabb
     */
    intersectBox(box: AABB, output?: Vector3): Vector3;
    /**
     * Test for intersection with a sphere
     */
    intersectSphere(sphere: Sphere, output?: Vector3): Vector3;
    /**
     * Compute the distance from a plane
     */
    distanceToPlane(plane: Plane): number;
    /**
     * Test for plane intersection
     */
    intersectPlane(plane: Plane, output?: Vector3): Vector3;
    /**
     * Transforms the ray with a Matrix4
     */
    applyMatrix4(matrix4: Matrix4): this;
}
