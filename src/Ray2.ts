/**
 * @file Ray
 * @see uon.math.Ray
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

import { Vector2 } from './Vector2';
import { Segment2 } from './Segment2';
import { IsNearEqual } from './Utils';

const TEMP_VEC2 = new Vector2();


export interface Ray2IntersectionResult {
    x: number;
    y: number;
    param: number;
};



/**
 * @memberOf uon.math
 */
export class Ray2 {

    public origin: Vector2;
    public dir: Vector2;

	/**
	 * @constructs
	 */
    constructor(origin?: Vector2, dir?: Vector2) {
        this.origin = (origin !== undefined) ? origin : new Vector2();
        this.dir = (dir !== undefined) ? dir : new Vector2();

    }

	/**
	 * Assign new values to this Ray
	 */
    set(origin: Vector2, dir: Vector2) {

        this.origin.copy(origin);
        this.dir.copy(dir);

        return this;

    }

	/**
	 * Computes the position of a point along the Ray
	 */
    at(t: number, output?: Vector2) {

        var result = output || new Vector2();

        return result.copy(this.dir).multiplyScalar(t).add(this.origin);

    }

	/**
	 * Test for equaity
	 */
    equals(ray: Ray2) {

        return ray.origin.equals(this.origin) && ray.dir.equals(this.dir);

    }

	/**
	 * Make a copy of this ray
	 */
    clone() {

        return new Ray2().copy(this);

    }

	/**
	 * Copy values from another Ray
	 */
    copy(ray: Ray2) {

        this.origin.copy(ray.origin);
        this.dir.copy(ray.dir);

        return this;

    }

    /**
     * Intersect a segment with this ray
     * @param segment
     */
    intersectSegment(segment: Segment2): Ray2IntersectionResult {

        
        let x = this.origin.x;
        let y = this.origin.y;
        let dx = this.dir.x;
        let dy = this.dir.y;
        let x1 = segment.p1.x;
        let y1 = segment.p1.y;
        let x2 = segment.p2.x;
        let y2 = segment.p2.y;
       


        var r, s, d;

        if (dy / dx != (y2 - y1) / (x2 - x1)) {
            d = ((dx * (y2 - y1)) - dy * (x2 - x1));
            if (d != 0) {
                r = (((y - y1) * (x2 - x1)) - (x - x1) * (y2 - y1)) / d;
                s = (((y - y1) * dx) - (x - x1) * dy) / d;
                if (r >= 0 && s >= 0 && s <= 1) {
                    return { x: x + r * dx, y: y + r * dy, param: r };
                }
            }
        }
        return null;

        


    }


};
