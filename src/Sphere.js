/**
 * @file Sphere
 * @see uon.math.Sphere
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

"use strict";

const Vector3 = require('./Vector3'),
	AABB = require('./AABB');

var TEMP_AABB = new AABB();

/**
 * @memberOf uon.math
 */
class Sphere {
	
	/**
	 * A sphere is defined by a point and a radius
	 * 
	 * @constructs
	 * @param {uon.math.Vector3}
	 *            center The origin of the sphere to create
	 * @param {Number}
	 *            radius The radius of the sphere
	 */
	constructor(center, radius) {
		
		this.center = ( center !== undefined ) ? center : new Vector3();
		this.radius = ( radius !== undefined ) ? radius : 0;
	}
	
	
	/**
	 * Assign values on this sphere object
	 * 
	 * @param {uon.math.Vector3}
	 *            center The origin of the sphere to create
	 * @param {Number}
	 *            radius The radius of the sphere
	 * @returns {this}
	 */
	set ( center, radius ) {

		this.center.copy( center );
		this.radius = radius;

		return this;

	}
	
	/**
	 * Reset the sphere values and encapsulate all the points
	 * 
	 * @param {uon.math.Vector3[]}
	 *            points A collection of Vector3
	 * @param {uon.math.Vector3}
	 *            [optionalCenter] If defined the origin of the sphere will be
	 *            set with this value
	 */
	setFromPoints (points, optionalCenter) {

		var box = TEMP_AABB;



		var center = this.center;

		if ( optionalCenter !== undefined ) {

			center.copy( optionalCenter );

		} else {

			box.setFromPoints( points ).center( center );

		}

		var max_radius_sq = 0;

		for ( var i = 0, il = points.length; i < il; i ++ ) {

			max_radius_sq = Math.max( max_radius_sq, center.distanceToSquared( points[ i ] ) );

		}

		this.radius = Math.sqrt( max_radius_sq );

		return this;

 		

	}

	/**
	 * Copy values from another Sphere
	 * 
	 * @param {uon.math.Sphere}
	 *            sphere The Sphere to copy values from
	 */
	copy ( sphere ) {

		this.center.copy( sphere.center );
		this.radius = sphere.radius;

		return this;

	}

	/**
	 * Determines if this sphere is empty (ie. the radius is 0)
	 * 
	 * @returns {Boolean}
	 */
	empty () {

		return ( this.radius <= 0 );

	}

	/**
	 * Test for containment
	 * 
	 * @param {uon.math.Vector3}
	 *            point The point to test for containment
	 * @returns {Boolean} True if the point is inside the sphere, false
	 *          otherwise
	 */
	containsPoint ( point ) {

		return ( point.distanceToSquared( this.center ) <= ( this.radius * this.radius ) );

	}

	/**
	 * Computes the distance from a point to the outside of the sphere
	 * 
	 * @param {uon.math.Vector3}
	 *            point
	 * @returns {Number}
	 */
	distanceToPoint ( point ) {

		return ( point.distanceTo( this.center ) - this.radius );

	}

	/**
	 * Determines if a sphere intersects this one
	 * 
	 * @param {uon.math.Sphere}
	 *            sphere The sphere to test against
	 * @returns {Boolean} True if the spheres intersect, false otherwise
	 */
	intersectsSphere ( sphere ) {

		var radius_sum = this.radius + sphere.radius;

		return sphere.center.distanceToSquared( this.center ) <= ( radius_sum * radius_sum );

	}

	/**
	 * Clamp a point to the surface of the sphere
	 */
	clampPoint ( point, output ) {

        var radius = this.radius,
            center = this.center,
		    delta_length_sq = this.center.distanceToSquared( point );

		var result = output || new Vector3();
		result.copy( point );

		if ( delta_length_sq > ( radius * radius ) ) {

			result.subtract( center ).normalize();
			result.multiplyScalar( radius ).add( center );

		}

		return result;

	}

	/**
	 * Computes an axis-aligned bounding-box around this sphere
	 */
	getBoundingBox ( output ) {

		var box = output || new AABB();

		box.set( this.center, this.center );
		box.expandByScalar( this.radius );

		return box;

	}

	/**
	 * Transforms the sphere with a Matrix4
	 */
	applyMatrix4 ( matrix ) {

		this.center.applyMatrix4( matrix );
		this.radius = this.radius * matrix.getMaxScaleOnAxis();

		return this;

	}

	/**
	 * Translate this sphere by adding an position offset to the center
	 * 
	 * @param {uon.math.Vector3}
	 *            offset
	 */
	translate ( offset ) {

		this.center.add( offset );

		return this;

	}

	/**
	 * Test for equality
	 */
	equals ( sphere ) {

		return sphere.center.equals( this.center ) && ( sphere.radius === this.radius );

	}

	/**
	 * Make a copy of this sphere
	 * 
	 * @returns {uon.math.Sphere} The copy
	 */
	clone () {

		return new Sphere().copy( this );

	}
	
};

module.exports = Sphere;




