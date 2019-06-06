
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
    constructor(...planes: Plane[]) {

        this.planes = [];

        for (let i = 0; i < 6; i++) {

            this.planes.push(planes[i] || new Plane());

        }

    }

	/**
	 * Set the six planes of this frustum
	 */
    set(p0: Plane, p1: Plane, p2: Plane, p3: Plane, p4: Plane, p5: Plane) {

        const planes = this.planes;

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

        const planes = this.planes;

        for (let i = 0; i < 6; i++) {

            planes[i].copy(frustum.planes[i]);

        }

        return this;

    }

	/**
	 * Compute plane values from a view-projection matrix
	 */
    setFromMatrix(m: Matrix4) {

        const planes = this.planes;
        const me = m.elements;
        const me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];
        const me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7];
        const me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11];
        const me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15];

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
	 */
    intersectsSphere(sphere: Sphere) {

        const planes = this.planes;
        const center = sphere.center;
        const neg_radius = - sphere.radius;

        for (let i = 0; i < 6; i++) {

            if (planes[i].distanceToPoint(center) < neg_radius) {
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

        const p1 = new Vector3(),
            p2 = new Vector3();

        const planes = this.planes;

        for (let i = 0; i < 6; i++) {

            const plane = planes[i];

            p1.x = plane.normal.x > 0 ? box.min.x : box.max.x;
            p2.x = plane.normal.x > 0 ? box.max.x : box.min.x;
            p1.y = plane.normal.y > 0 ? box.min.y : box.max.y;
            p2.y = plane.normal.y > 0 ? box.max.y : box.min.y;
            p1.z = plane.normal.z > 0 ? box.min.z : box.max.z;
            p2.z = plane.normal.z > 0 ? box.max.z : box.min.z;

            // if both outside plane, no intersection
            if (plane.distanceToPoint(p1) < 0 &&
                plane.distanceToPoint(p2) < 0) {

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

        const planes = this.planes;

        for (let i = 0; i < 6; i++) {

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