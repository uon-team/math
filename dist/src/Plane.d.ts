/**
 * @file Plane
 * @see uon.math.Plane
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
import { Vector3 } from './Vector3';
import { Sphere } from './Sphere';
import { Matrix4 } from './Matrix4';
/**
 * @memberOf uon.math
 */
export declare class Plane {
    normal: Vector3;
    constant: number;
    /**
     * A plane is defined by a normal vector and a constant
     *
     * @constructs
     * @param {Vector3} normal
     * @param {Number} constant
     */
    constructor(normal?: Vector3, constant?: number);
    /**
     * Assign new values to this plane
     */
    set(normal: Vector3, constant: number): this;
    /**
     * Assign new values to the is plane
     */
    setComponents(x: number, y: number, z: number, w: number): this;
    /**
     * Not sure aboutn this one
     * TODO: Figure it out
     */
    setFromNormalAndCoplanarPoint(normal: Vector3, point: Vector3): this;
    /**
     * Computes a plane from 3 points
     */
    setFromCoplanarPoints(a: Vector3, b: Vector3, c: Vector3): this;
    /**
     * Copy values from another plane
     */
    copy(plane: Plane): this;
    /**
     * Normalize this plane
     */
    normalize(): this;
    /**
     * Inverse this plane along its normal axis
     */
    negate(): this;
    /**
     * Computes the distance from a point to this plane
     */
    distanceToPoint(point: Vector3): number;
    /**
     * Computes the distance from sphere to this plane
     */
    distanceToSphere(sphere: Sphere): number;
    /**
     * Project a point on this plane
     */
    projectPoint(point: Vector3, output?: Vector3): Vector3;
    /**
     * Computes a vector perpendicular(in axis of the normal vector) to this plane
     */
    orthoPoint(point: Vector3, output?: Vector3): Vector3;
    /**
     *
     */
    /**
     * Computes the center point of the plane
     */
    coplanarPoint(output?: Vector3): Vector3;
    /**
     * Transform this plane with a Matrix4
     */
    applyMatrix4(matrix: Matrix4): this;
    /**
     * Translate this plane
     */
    translate(offset: Vector3): this;
    /**
     * Test for equality
     */
    equals(plane: Plane): boolean;
    /**
     * Create a copy of this plane
     */
    clone(): Plane;
}
