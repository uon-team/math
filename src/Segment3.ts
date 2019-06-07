import { Vector3 } from "./Vector3";
import { IsNearEqual, EPSILON } from "./Utils";



/**
 * Represents a 3d line segment
 */
export class Segment3 {

    p1: Vector3;
    p2: Vector3;

    constructor(p1?: Vector3, p2?: Vector3) {

        this.p1 = p1 ? p1.clone() : new Vector3();
        this.p2 = p2 ? p2.clone() : new Vector3();

    }

    /**
     * Set both points of this segment
     * @param p1 
     * @param p2 
     */
    set(p1: Vector3, p2: Vector3) {
        this.p1.copy(p1);
        this.p2.copy(p2);
    }


    /**
     * Reverse the direction of this segment
     */
    inverse() {

        let temp = this.p2;
        this.p2 = this.p1;
        this.p1 = temp;
    }

    /**
     * Test if this segment is perpendicular to another
     * @param segment the segement to test against
     * @param tolerance the angle difference that is tolerated, defaults to 2^-23
     */
    isPerpendicular(segment: Segment3, tolerance: number = EPSILON) {

        let vec1 = Vector3.Sub(this.p2, this.p1);
        let vec2 = Vector3.Sub(segment.p2, segment.p1);
        return IsNearEqual(vec1.dot(vec2), 0.0, tolerance);

    }

    /**
     * Test if this segment is parallel to another
     * @param segment 
     * @param tolerance 
     */
    isParallel(segment: Segment3, tolerance: number = EPSILON) {

        let vec1 = Vector3.Sub(this.p2, this.p1).normalize();
        let vec2 = Vector3.Sub(segment.p2, segment.p1).normalize();

        return IsNearEqual(Math.abs(vec1.dot(vec2)), 1.0, tolerance);

    }

    /**
     * Check if this segement is colinear with another.
     * To be colinear the 2 segments must be parallel and have the same direction
     * @param segment 
     * @param tolerance 
     */
    isColinear(segment: Segment3, tolerance: number = EPSILON) {
        let vec1 = Vector3.Sub(this.p2, this.p1).normalize();
        let vec2 = Vector3.Sub(segment.p2, segment.p1).normalize();

        return IsNearEqual(vec1.dot(vec2), 1.0, tolerance);

    }


    /**
     * Get a point along this segment
     * @param t a normalized value between 0 and 1
     * @param out 
     */
    getPointAt(t: number, out?: Vector3) {

        out = out || new Vector3(this.p1.x, this.p1.y, this.p1.z);
        return out.lerp(this.p2, t);

    }

    /**
     * Returns the length of the line segment
     */
    length() {
        return Vector3.Sub(this.p2, this.p1).length();
    }

    /**
    * Returns the length of the line segment
    */
    lengthSq() {
        return Vector3.Sub(this.p2, this.p1).lengthSq();
    }

    /**
     * Translates the line segment
     * @param vec2
     */
    translate(vec3: Vector3) {
        this.p1.add(vec3);
        this.p2.add(vec3);

        return this;
    }

    /**
     * Expand this segment along it's vector in both direction
     * @param scalar
     */
    grow(scalar: number) {

        let dir = this.getDirection().multiplyScalar(scalar);

        this.p1.subtract(dir);
        this.p2.add(dir);

        return this;

    }

    /**
     * Get the direction vector of this segment
     */
    getDirection() {
        return this.p2.clone().subtract(this.p1).normalize();
    }

    /**
     * Get the tangent vector of this segment (perpendicular of direction) right hand rule
     */
    getTangent() {
        return this.getDirection().cross(Vector3.UnitY).normalize()
    }

    /**
     * Compute the squared distance from this segment to a point
     * @param point
     */
    getDistanceSq(point: Vector3) {

        return Segment3.ComputeDistanceSq(this.p1, this.p2, point);
    }

    /**
     * Get the shortest distance square between this segment and another
     * @param segment 
     */
    getSegmentDistanceSq(segment: Segment3) {

        let p1_dist = this.getDistanceSq(segment.p1);
        let p2_dist = this.getDistanceSq(segment.p2);

        return Math.min(p1_dist, p2_dist);
    }

    /**
     * Compute the closest point on this segment
     * @param point
     */
    getClosestPoint(point: Vector3, ignoreEnds?: boolean) {

        let result = new Vector3();

        let diff = Vector3.Sub(this.p2, this.p1);
        let len_sq = diff.lengthSq();
        let r = ((point.x - this.p1.x) * diff.x + (point.y - this.p1.y) * diff.y + (point.z - this.p1.z) * diff.z) / len_sq;


        if (ignoreEnds) {
            return result.set(this.p1.x + r * diff.x, this.p1.y + r * diff.y, this.p1.z + r * diff.z);
        }

        if (r <= 0) {
            result.copy(this.p1);
        }
        else if (r >= 1) {
            result.copy(this.p2);
        }
        else {
            result.set(this.p1.x + r * diff.x, this.p1.y + r * diff.y,  this.p1.z + r * diff.z);
        }

        return result;
    }

    /**
     * Clone this segment
     */
    clone() {
        return new Segment3(this.p1, this.p2);
    }


    /**
     * Compute the squared distance of segment[p1,p2] to p
     * @param p1
     * @param p2
     * @param p
     */
    static ComputeDistanceSq(p1: Vector3, p2: Vector3, p: Vector3) {

        let x1 = p1.x,
            y1 = p1.y,
            z1 = p1.z,
            x2 = p2.x,
            y2 = p2.y,
            z2 = p2.z,
            px = p.x,
            py = p.y,
            pz = p.z;


        // Adjust vectors relative to x1,y1
        x2 -= x1;
        y2 -= y1;
        z2 -= z1;

        // px,py becomes relative vector from x1,y1 to test point
        px -= x1;
        py -= y1;
        pz -= z1;

        let dotprod = px * x2 + py * y2 + pz * z2;
        let proj_len_sq;

        if (dotprod <= 0.0) {
            proj_len_sq = 0.0;
        }
        else {
            px = x2 - px;
            py = y2 - py;
            pz = z2 - pz;
            dotprod = px * x2 + py * y2 + pz * z2;

            if (dotprod <= 0.0) {
                proj_len_sq = 0.0;
            } else {
                proj_len_sq = dotprod * dotprod / (x2 * x2 + y2 * y2 + z2 * z2);
            }
        }

        let len_sq = px * px + py * py + pz * pz - proj_len_sq;
        if (len_sq < 0) {
            len_sq = 0;
        }
        return len_sq;

    }

}