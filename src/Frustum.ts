/**
 * @file Frustum
 * @see uon.math.Frustum
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

import { Vector3 } from './Vector3'
import { Plane } from './Plane'
import { Sphere } from './Sphere'
import { Box3 } from './Box3'
import { Matrix4 } from './Matrix4'

/**
 * A Frustum is defined by six planes
 */
export class Frustum {


    readonly planes: Plane[];

	/**
	 * @constructs
	 */
    constructor() {

        this.planes = [];

        for (var i = 0; i < 6; i++) {

            this.planes.push(arguments[i] || new Plane());

        }

    }

	/**
	 * Set the six planes of this frustum
	 */
    set(p0: Plane, p1: Plane, p2: Plane, p3: Plane, p4: Plane, p5: Plane) {

        var planes = this.planes;

        planes[0].copy(p0);
        planes[1].copy(p1);
        planes[2].copy(p2);
        planes[3].copy(p3);
        planes[4].copy(p4);
        planes[5].copy(p5);

        return this;

    }

	/**
	 * Copy values from another frustum
	 */
    copy(frustum: Frustum) {

        var planes = this.planes;

        for (var i = 0; i < 6; i++) {

            planes[i].copy(frustum.planes[i]);

        }

        return this;

    }

	/**
	 * Compute plane values from a view-projection matrix
	 */
    setFromMatrix(m: Matrix4) {

        var planes = this.planes;
        var me = m.elements;
        var me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];
        var me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7];
        var me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11];
        var me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15];

        planes[0].setComponents(me3 - me0, me7 - me4, me11 - me8, me15 - me12).normalize();
        planes[1].setComponents(me3 + me0, me7 + me4, me11 + me8, me15 + me12).normalize();
        planes[2].setComponents(me3 + me1, me7 + me5, me11 + me9, me15 + me13).normalize();
        planes[3].setComponents(me3 - me1, me7 - me5, me11 - me9, me15 - me13).normalize();
        planes[4].setComponents(me3 - me2, me7 - me6, me11 - me10, me15 - me14).normalize();
        planes[5].setComponents(me3 + me2, me7 + me6, me11 + me10, me15 + me14).normalize();

        return this;

    }

	/**
	 * Test for intersection with a sphere
	 * 
	 * @returns {Boolean}
	 */
    intersectsSphere(sphere: Sphere) {

        var planes = this.planes;
        var center = sphere.center;
        var negRadius = - sphere.radius;

        for (var i = 0; i < 6; i++) {

            var distance = planes[i].distanceToPoint(center);

            if (distance < negRadius) {

                return false;

            }

        }

        return true;

    }

	/**
	 * Test for intersection with a box
	 * 
	 */
    intersectsBox(box: Box3) {

        var p1 = new Vector3(),
            p2 = new Vector3();

        var planes = this.planes;

        for (var i = 0; i < 6; i++) {

            var plane = planes[i];

            p1.x = plane.normal.x > 0 ? box.min.x : box.max.x;
            p2.x = plane.normal.x > 0 ? box.max.x : box.min.x;
            p1.y = plane.normal.y > 0 ? box.min.y : box.max.y;
            p2.y = plane.normal.y > 0 ? box.max.y : box.min.y;
            p1.z = plane.normal.z > 0 ? box.min.z : box.max.z;
            p2.z = plane.normal.z > 0 ? box.max.z : box.min.z;

            var d1 = plane.distanceToPoint(p1);
            var d2 = plane.distanceToPoint(p2);

            // if both outside plane, no intersection
            if (d1 < 0 && d2 < 0) {

                return false;

            }
        }

        return true;


    }


	/**
	 * Test for containment of a point
	 * 
	 * @returns True if the point is inside the frustum, false otherwise
	 */
    containsPoint(point: Vector3) {

        var planes = this.planes;

        for (var i = 0; i < 6; i++) {

            if (planes[i].distanceToPoint(point) < 0) {

                return false;

            }

        }

        return true;

    }

	/**
	 * Creates a copy of this frustum
	 */
    clone() {

        return new Frustum().copy(this);

    }


};