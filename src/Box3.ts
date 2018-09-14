/**
 * @file Box3
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */


import { Vector3 } from "./Vector3";

/**
 * 3D axis aligned bounding box
 */
export class Box3 {


    public min: Vector3;
    public max: Vector3;

	/**
	 * An axis-aligned bounding-box
	 */
    constructor(min?: Vector3, max?: Vector3) {

        this.min = (min !== undefined) ?
            min : new Vector3(Infinity, Infinity, Infinity);

        this.max = (max !== undefined) ?
            max : new Vector3(-Infinity, -Infinity, -Infinity);
    }

	/**
	 * Asign new values to this box
	 */
    set(min: Vector3, max: Vector3) {

        this.min.copy(min);
        this.max.copy(max);

        return this;

    }

	/**
	 * Compute a box around the given points
	 */
    setFromPoints(points: Vector3[]) {

        this.empty();

        for (var i = 0, il = points.length; i < il; i++) {

            this.expand(points[i]);

        }

        return this;

    }

	/**
	 * Empty this box
	 */
    empty() {

        this.min.x = this.min.y = this.min.z = Infinity;
        this.max.x = this.max.y = this.max.z = -Infinity;

        return this;

    }

	/**
	 * Test for equality with another box
	 */
    equals(box: Box3) {

        return box.min.equals(this.min) && box.max.equals(this.max);

    }

	/**
	 * Computes the center of the box and return its value
	 */
    getCenter(output?: Vector3) {

        var result = output || new Vector3();
        return result.copy(this.min).add(this.max).multiplyScalar(0.5);

    }

	/**
	 * Computes the size of the box for each axis
	 * 
	 */
    getSize(output?: Vector3) {

        var result = output || new Vector3();
        return result.copy(this.max).subtract(this.min);

    }

	/**
	 * Test for containment
	 * 
	 * @param point
	 */
    containsPoint(point: Vector3) {

        if (point.x < this.min.x || point.x > this.max.x
            || point.y < this.min.y || point.y > this.max.y
            || point.z < this.min.z || point.z > this.max.z) {

            return false;

        }

        return true;

    }

	/**
	 * Test if a box is contained within this one
	 * 
	 * @param box
	 */
    containsBox(box: Box3) {

        if ((this.min.x <= box.min.x) && (box.max.x <= this.max.x)
            && (this.min.y <= box.min.y) && (box.max.y <= this.max.y)
            && (this.min.z <= box.min.z) && (box.max.z <= this.max.z)) {

            return true;

        }

        return false;

    }

	/**
	 * Test for intersection with another box
	 * 
	 * @param  box
	 */
    intersects(box: Box3) {
        if (box.max.x < this.min.x || box.min.x > this.max.x
            || box.max.y < this.min.y || box.min.y > this.max.y
            || box.max.z < this.min.z || box.min.z > this.max.z) {

            return false;

        }

        return true;
    }

	/**
	 * Expand the box to contain a point
	 */
    expand(point: Vector3) {

        this.min.min(point);
        this.max.max(point);

        return this;

    }

	/**
	 * Scale the box
	 */
    scale(scalar: number) {
        this.min.multiplyScalar(scalar);
        this.max.multiplyScalar(scalar);

        return this;
    }

	/**
	 * Expand this box to contain another box
	 */
    merge(box: Box3) {

        this.min.min(box.min);
        this.max.max(box.max);

        return this;

    }

	/**
	 * Creates a copy of this box
	 */
    clone() {

        return new Box3().copy(this);

    }

	/**
	 * Copy values form another box
	 */
    copy(box: Box3) {

        this.min.copy(box.min);
        this.max.max(box.max);

        return this;

    }

};
