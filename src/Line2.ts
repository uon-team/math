

import { Vector2 } from './Vector2';
import { EPSILON } from './Utils';



/**
 * Represents an infinite crossing 2 points
 */
export class Line2 {

    p1: Vector2;
    p2: Vector2;

    constructor(p1: Vector2, p2: Vector2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    /**
     * Get the intersection point between this line and another
     * @param l2 
     * @returns a point if lines intersect, null otherwise
     */
    intersectLine(l2: Line2) {
        return Line2.IntersectLines(this.p1, this.p2, l2.p1, l2.p2);
    }



    static IntersectLines(p0: Vector2, p1: Vector2, p2: Vector2, p3: Vector2) {

        const a0 = p1.y - p0.y;
        const b0 = p0.x - p1.x;

        const a1 = p3.y - p2.y;
        const b1 = p2.x - p3.x;

        const det = a0 * b1 - a1 * b0;
        if (det > -EPSILON && det < EPSILON) {
            return null;
        } else {
            const c0 = a0 * p0.x + b0 * p0.y;
            const c1 = a1 * p2.x + b1 * p2.y;

            const x = (b1 * c0 - b0 * c1) / det;
            const y = (a0 * c1 - a1 * c0) / det;
            return new Vector2(x, y);
        }

    }


}