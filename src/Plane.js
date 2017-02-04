/**
 * @file Plane
 * @see uon.math.Plane
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

"use strict";

const Vector3 = require('./Vector3'),
    Matrix3 = require('./Matrix3');

const f32 = Math.fround;
const TEMP_VEC30 = new Vector3();
const TEMP_VEC31 = new Vector3();
const TEMP_MAT30 = new Matrix3();

/**
 * @memberOf uon.math
 */
class Plane {

	/**
	 * A plane is defined by a normal vector and a constant
	 * 
	 * @constructs
	 * @param {uon.math.Vector3} normal
	 * @param {Number} constant
	 */
    constructor(normal, constant) {

        this.normal = (normal !== undefined) ? normal : new Vector3(1, 0, 0);
        this.constant = (constant !== undefined) ? f32(constant) : f32(0);

    }

	/**
	 * Assign new values to this plane
	 */
    set(normal, constant) {

        this.normal.copy(normal);
        this.constant = f32(constant);

        return this;

    }

	/**
	 * Assign new values to the is plane
	 */
    setComponents(x, y, z, w) {

        this.normal.set(x, y, z);
        this.constant = w;

        return this;

    }

	/**
	 * Not sure aboutn this one
	 * TODO: Figure it out
	 */
    setFromNormalAndCoplanarPoint(normal, point) {

        this.normal.copy(normal);
        this.constant = -point.dot(this.normal);

        return this;

    }

	/**
	 * Computes a plane from 3 points
	 */
    setFromCoplanarPoints(a, b, c) {

        var normal = TEMP_VEC30.copy(c).subtract(b).cross(TEMP_VEC31.copy(a).sutract(b))
            .normalize();

        // Q: should an error be thrown if normal is zero (e.g. degenerate
        // plane)?

        this.setFromNormalAndCoplanarPoint(normal, a);

        return this;

    }

	/**
	 * Copy values from another plane
	 */
    copy(plane) {

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
    distanceToPoint(point) {

        return this.normal.dot(point) + this.constant;

    }

	/**
	 * Computes the distance from sphere to this plane
	 */
    distanceToSphere(sphere) {

        return this.distanceToPoint(sphere.center) - sphere.radius;

    }

	/**
	 * Project a point on this plane
	 */
    projectPoint(point, output) {

        return this.orthoPoint(point, output).subtract(point).negate();

    }

	/**
	 * Computes a vector perpendicular(in axis of the normal vector) to this plane
	 */
    orthoPoint(point, output) {

        var perpendicularMagnitude = this.distanceToPoint(point);

        var result = output || new Vector3();
        return result.copy(this.normal).multiplyScalar(perpendicularMagnitude);

    }

	/**
	 * 
	 */
    intersectLine(line, output) {

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

    }

	/**
	 * Computes the center point of the plane
	 */
    coplanarPoint(output) {

        var result = output || new Vector3();
        return result.copy(this.normal).multiplyScalar(-this.constant);

    }

	/**
	 * Transform this plane with a Matrix4
	 */
    applyMatrix4(matrix) {



        // compute new normal based on theory here:
        // http://www.songho.ca/opengl/gl_normaltransform.html
        var normalMatrix = optionalNormalMatrix || TEMP_MAT30.getNormalMatrix(matrix);
        var newNormal = TEMP_VEC30.copy(this.normal).applyMatrix3(normalMatrix);

        var newCoplanarPoint = this.coplanarPoint(TEMP_VEC31);
        newCoplanarPoint.applyMatrix4(matrix);

        this.setFromNormalAndCoplanarPoint(newNormal, newCoplanarPoint);

        return this;

    }

	/**
	 * Translate this plane
	 */
    translate(offset) {

        this.constant = this.constant - offset.dot(this.normal);

        return this;

    }

	/**
	 * Test for equality
	 */
    equals(plane) {

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

module.exports = Plane;


