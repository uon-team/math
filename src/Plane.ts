/**
 * @file Plane
 * @see uon.math.Plane
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

import { Vector3 } from './Vector3';
import { Sphere } from './Sphere';
import { Matrix3 } from './Matrix3';
import { Matrix4 } from './Matrix4';
import { f32 } from './Utils';


const TEMP_VEC30 = new Vector3();
const TEMP_VEC31 = new Vector3();
const TEMP_MAT30 = new Matrix3();

/**
 * @memberOf uon.math
 */
export class Plane {


    public normal: Vector3;
    public constant: number;


	/**
	 * A plane is defined by a normal vector and a constant
	 * 
	 * @constructs
	 * @param {Vector3} normal
	 * @param {Number} constant
	 */
    constructor(normal?: Vector3, constant?: number) {

        this.normal = (normal !== undefined) ? normal : new Vector3(1, 0, 0);
        this.constant = (constant !== undefined) ? f32(constant) : f32(0);

    }

	/**
	 * Assign new values to this plane
	 */
    set(normal: Vector3, constant: number) {

        this.normal.copy(normal);
        this.constant = f32(constant);

        return this;

    }

	/**
	 * Assign new values to the is plane
	 */
    setComponents(x: number, y: number, z: number, w: number) {

        this.normal.set(x, y, z);
        this.constant = w;

        return this;

    }

	/**
	 * Not sure aboutn this one
	 * TODO: Figure it out
	 */
    setFromNormalAndCoplanarPoint(normal: Vector3, point: Vector3) {

        this.normal.copy(normal);
        this.constant = -point.dot(this.normal);

        return this;

    }

	/**
	 * Computes a plane from 3 points
	 */
    setFromCoplanarPoints(a: Vector3, b: Vector3, c: Vector3) {

        var normal = TEMP_VEC30.copy(c)
            .subtract(b)
            .cross(TEMP_VEC31.copy(a).subtract(b))
            .normalize();

        // Q: should an error be thrown if normal is zero (e.g. degenerate
        // plane)?

        this.setFromNormalAndCoplanarPoint(normal, a);

        return this;

    }

	/**
	 * Copy values from another plane
	 */
    copy(plane: Plane) {

        this.normal.copy(plane.normal);
        this.constant = plane.constant;

        return this;

    }

	/**
	 * Normalize this plane
	 */
    normalize() {

        // Note: will lead to a divide by zero if the plane is invalid.

        var inverseNormalLength = 1.0 / this.normal.length();
        this.normal.multiplyScalar(inverseNormalLength);
        this.constant *= inverseNormalLength;

        return this;

    }

	/**
	 * Inverse this plane along its normal axis
	 */
    negate() {

        this.constant *= -1;
        this.normal.negate();

        return this;

    }

	/**
	 * Computes the distance from a point to this plane
	 */
    distanceToPoint(point: Vector3) {

        return this.normal.dot(point) + this.constant;

    }

	/**
	 * Computes the distance from sphere to this plane
	 */
    distanceToSphere(sphere: Sphere) {

        return this.distanceToPoint(sphere.center) - sphere.radius;

    }

	/**
	 * Project a point on this plane
	 */
    projectPoint(point: Vector3, output?: Vector3) {

        return this.orthoPoint(point, output).subtract(point).negate();

    }

	/**
	 * Computes a vector perpendicular(in axis of the normal vector) to this plane
	 */
    orthoPoint(point: Vector3, output?: Vector3) {

        var perpendicularMagnitude = this.distanceToPoint(point);

        var result = output || new Vector3();
        return result.copy(this.normal).multiplyScalar(perpendicularMagnitude);

    }

	/**
	 * 
	 */
    /* intersectLine(line, output) {
 
         var v1 = TEMP_VEC30;
 
         var result = output || new Vector3();
 
         var direction = line.delta(v1);
 
         var denominator = this.normal.dot(direction);
 
         if (denominator == 0) {
 
             // line is coplanar, return origin
             if (this.distanceToPoint(line.start) == 0) {
 
                 return result.copy(line.start);
 
             }
 
             // Unsure if this is the correct method to handle this case.
             return undefined;
 
         }
 
         var t = -(line.start.dot(this.normal) + this.constant) / denominator;
 
         if (t < 0 || t > 1) {
 
             return undefined;
 
         }
 
         return result.copy(direction).multiplyScalar(t).add(line.start);
 
     }*/

	/**
	 * Computes the center point of the plane
	 */
    coplanarPoint(output?: Vector3) {

        var result = output || new Vector3();
        return result.copy(this.normal).multiplyScalar(-this.constant);

    }

	/**
	 * Transform this plane with a Matrix4
	 */
    applyMatrix4(matrix: Matrix4) {



        // compute new normal based on theory here:
        // http://www.songho.ca/opengl/gl_normaltransform.html
        var normal_matrix = TEMP_MAT30.getNormalMatrix(matrix);
        var new_normal = TEMP_VEC30.copy(this.normal).applyMatrix3(normal_matrix);

        var new_coplanar_point = this.coplanarPoint(TEMP_VEC31);
        new_coplanar_point.applyMatrix4(matrix);

        this.setFromNormalAndCoplanarPoint(new_normal, new_coplanar_point);

        return this;

    }

	/**
	 * Translate this plane
	 */
    translate(offset: Vector3) {

        this.constant = this.constant - offset.dot(this.normal);

        return this;

    }

	/**
	 * Test for equality
	 */
    equals(plane: Plane) {

        return plane.normal.equals(this.normal)
            && (plane.constant == this.constant);

    }

	/**
	 * Create a copy of this plane
	 */
    clone() {

        return new Plane().copy(this);

    }

};
