

import { Vector3 } from './Vector3';
import { Box3 } from './Box3';
import { Plane } from './Plane';
import { Sphere } from './Sphere';
import { Matrix4 } from './Matrix4';

const TEMP_VEC3 = new Vector3();


/**
 * Represents a ray in 3D 
 */
export class Ray3 {

    public origin: Vector3;
    public dir: Vector3;

	/**
	 * @constructs
	 */
    constructor(origin?: Vector3, dir?: Vector3) {
        this.origin = (origin !== undefined) ? origin.clone() : new Vector3();
        this.dir = (dir !== undefined) ? dir.clone() : new Vector3();

    }

	/**
	 * Assign new values to this Ray
	 */
    set(origin: Vector3, dir: Vector3) {

        this.origin.copy(origin);
        this.dir.copy(dir);

        return this;

    }

	/**
	 * Computes the position of a point along the Ray
     * @param t the distance along the ray from the origin
	 */
    at(t: number, output?: Vector3) {

        const result = output || new Vector3();

        return result.copy(this.dir).multiplyScalar(t).add(this.origin);

    }

	/**
	 * Test for equaity
	 */
    equals(ray: Ray3) {

        return ray.origin.equals(this.origin) && ray.dir.equals(this.dir);

    }

	/**
	 * Make a copy of this ray
	 */
    clone() {

        return new Ray3().copy(this);

    }

	/**
	 * Copy values from another Ray
	 */
    copy(ray: Ray3) {

        this.origin.copy(ray.origin);
        this.dir.copy(ray.dir);

        return this;

    }

	/**
	 * Test for intersection with an aabb
	 */
    intersectBox(box: Box3, output?: Vector3) {

        // http://www.scratchapixel.com/lessons/3d-basic-lessons/lesson-7-intersecting-simple-shapes/ray-box-intersection/

        let tmin: number, tmax: number, tymin: number, tymax: number, tzmin: number, tzmax: number;

        const invdirx = 1 / this.dir.x,
            invdiry = 1 / this.dir.y,
            invdirz = 1 / this.dir.z;

        const origin = this.origin;

        if (invdirx >= 0) {

            tmin = (box.min.x - origin.x) * invdirx;
            tmax = (box.max.x - origin.x) * invdirx;

        } else {

            tmin = (box.max.x - origin.x) * invdirx;
            tmax = (box.min.x - origin.x) * invdirx;
        }

        if (invdiry >= 0) {

            tymin = (box.min.y - origin.y) * invdiry;
            tymax = (box.max.y - origin.y) * invdiry;

        } else {

            tymin = (box.max.y - origin.y) * invdiry;
            tymax = (box.min.y - origin.y) * invdiry;
        }

        if ((tmin > tymax) || (tymin > tmax)) return null;

        // These lines also handle the case where tmin or tmax is NaN
        // (result of 0 * Infinity). x !== x returns true if x is NaN

        if (tymin > tmin || tmin !== tmin) tmin = tymin;

        if (tymax < tmax || tmax !== tmax) tmax = tymax;

        if (invdirz >= 0) {

            tzmin = (box.min.z - origin.z) * invdirz;
            tzmax = (box.max.z - origin.z) * invdirz;

        } else {

            tzmin = (box.max.z - origin.z) * invdirz;
            tzmax = (box.min.z - origin.z) * invdirz;
        }

        if ((tmin > tzmax) || (tzmin > tmax)) return null;

        if (tzmin > tmin || tmin !== tmin) tmin = tzmin;

        if (tzmax < tmax || tmax !== tmax) tmax = tzmax;

        //return point closest to the ray (positive side)

        if (tmax < 0) return null;

        return this.at(tmin >= 0 ? tmin : tmax, output);

    }

	/**
	 * Test for intersection with a sphere
	 */
    intersectSphere(sphere: Sphere, output?: Vector3) {

        const v1 = TEMP_VEC3;


        v1.copy(sphere.center).subtract(this.origin);

        const tca = v1.dot(this.dir);
        const d2 = v1.dot(v1) - tca * tca;
        const radius2 = sphere.radius * sphere.radius;

        if (d2 > radius2) return null;

        const thc = Math.sqrt(radius2 - d2);

        // t0 = first intersect point - entrance on front of sphere
        const t0 = tca - thc;

        // t1 = second intersect point - exit point on back of sphere
        const t1 = tca + thc;

        // test to see if both t0 and t1 are behind the ray - if so, return null
        if (t0 < 0 && t1 < 0) return null;

        // test to see if t0 is behind the ray:
        // if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
        // in order to always return an intersect point that is in front of the ray.
        if (t0 < 0) return this.at(t1, output);

        // else t0 is in front of the ray, so return the first collision point scaled by t0 
        return this.at(t0, output);

    }

	/**
	 * Compute the distance from a plane
	 */
    distanceToPlane(plane: Plane) {

        const denominator = plane.normal.dot(this.dir);
        if (denominator == 0) {

            // line is coplanar, return origin
            if (plane.distanceToPoint(this.origin) == 0) {

                return 0;

            }

            // Null is preferable to undefined since undefined means.... it is undefined

            return null;

        }

        const t = - (this.origin.dot(plane.normal) + plane.constant) / denominator;

        // Return if the ray never intersects the plane

        return t >= 0 ? t : null;

    }

	/**
	 * Test for plane intersection
	 */
    intersectPlane(plane: Plane, output?: Vector3) {

        const t = this.distanceToPlane(plane);

        if (t === null) {

            return null;
        }

        return this.at(t, output);

    }

	/**
	 * Transforms the ray with a Matrix4
	 */
    applyMatrix4(matrix4: Matrix4) {

        this.dir.add(this.origin).applyMatrix4(matrix4);
        this.origin.applyMatrix4(matrix4);
        this.dir.subtract(this.origin);
        this.dir.normalize();

        return this;
    }

};
