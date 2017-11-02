/**
 * @file Sphere
 * @see uon.math.Sphere
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

import { Vector3 } from './Vector3';
import { AABB } from './AABB';
import { Matrix4 } from './Matrix4';

const f32 = Math.fround;
const TEMP_AABB = new AABB();

/**
 * A sphere is defined by a point and a radius
 */
export class Sphere {


	public center: Vector3;
	public radius: number;

	/**
	 * A sphere is defined by a point and a radius
	 * 
	 * @constructs
	 * @param center The origin of the sphere to create
	 * @param radius The radius of the sphere
	 */
	constructor(center?: Vector3, radius?: number) {

		this.center = (center !== undefined) ? center : new Vector3();
		this.radius = (radius !== undefined) ? f32(radius) : f32(0);
	}


	/**
	 * Assign values on this sphere object
	 * 
	 * @param center The origin of the sphere to create
	 * @param radius The radius of the sphere
	 * @returns {this}
	 */
	set(center: Vector3, radius: number) {

		this.center.copy(center);
		this.radius = f32(radius);

		return this;

	}

	/**
	 * Reset the sphere values and encapsulate all the points
	 * 
	 * @param points A collection of Vector3
	 * @param [center] If defined the origin of the sphere will be
	 *            set with this value
	 */
	setFromPoints(points: Vector3[], center?: Vector3) {

		var box = TEMP_AABB;



		this.center;

		if (center !== undefined) {

			this.center.copy(center);

		} else {

			box.setFromPoints(points).getCenter(this.center);

		}

		var max_radius_sq = 0;

		for (var i = 0, il = points.length; i < il; i++) {

			max_radius_sq = Math.max(max_radius_sq, center.distanceToSquared(points[i]));

		}

		this.radius = Math.sqrt(max_radius_sq);

		return this;



	}

	/**
	 * Copy values from another Sphere
	 * 
	 * @param sphere The Sphere to copy values from
	 */
	copy(sphere: Sphere) {

		this.center.copy(sphere.center);
		this.radius = sphere.radius;

		return this;

	}

	/**
	 * Determines if this sphere is empty (ie. the radius is 0)
	 * 
	 */
	empty() {

		return (this.radius <= 0);

	}

	/**
	 * Test for containment
	 * 
	 * @param point The point to test for containment
	 * @returns True if the point is inside the sphere, false
	 *          otherwise
	 */
	containsPoint(point: Vector3) {

		return (point.distanceToSquared(this.center) <= (this.radius * this.radius));

	}

	/**
	 * Computes the distance from a point to the outside of the sphere
	 * 
	 * @param point
	 */
	distanceToPoint(point: Vector3) {

		return (point.distanceTo(this.center) - this.radius);

	}

	/**
	 * Determines if a sphere intersects this one
	 * 
	 * @param sphere The sphere to test against
	 * @returns True if the spheres intersect, false otherwise
	 */
	intersectsSphere(sphere: Sphere): boolean {

		var radius_sum = this.radius + sphere.radius;

		return sphere.center.distanceToSquared(this.center) <= (radius_sum * radius_sum);

	}

	/**
	 * Clamp a point to the surface of the sphere
	 */
	clampPoint(point: Vector3, output?: Vector3) {

		var radius = this.radius,
			center = this.center,
			delta_length_sq = this.center.distanceToSquared(point);

		var result = output || new Vector3();
		result.copy(point);

		if (delta_length_sq > (radius * radius)) {

			result.subtract(center).normalize();
			result.multiplyScalar(radius).add(center);

		}

		return result;

	}

	/**
	 * Computes an axis-aligned bounding-box around this sphere
	 */
	getBoundingBox(output: AABB) {

		var box = output || new AABB();

		box.set(this.center, this.center);
		box.scale(this.radius);

		return box;

	}

	/**
	 * Transforms the sphere with a Matrix4
	 */
	applyMatrix4(matrix: Matrix4) {


		let scale = matrix.getScale();

		this.center.applyMatrix4(matrix);
		this.radius = this.radius * Math.max(scale.x, scale.y, scale.z);

		return this;

	}

	/**
	 * Translate this sphere by adding an position offset to the center
	 * 
	 * @param offset
	 */
	translate(offset: Vector3) {

		this.center.add(offset);

		return this;

	}

	/**
	 * Test for equality
	 */
	equals(sphere: Sphere) {

		return sphere.center.equals(this.center) && (sphere.radius === this.radius);

	}

	/**
	 * Make a copy of this sphere
	 * 
	 * @returns The copy
	 */
	clone() {

		return new Sphere().copy(this);

	}

};



