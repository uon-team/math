

import { Vector3 } from './Vector3';
import { EPSILON } from './Utils';



/**
 * Represents an infinite crossing 2 points
 */
export class Line3 {

    p1: Vector3;
    p2: Vector3;

    constructor(p1: Vector3, p2: Vector3) {
        this.p1 = p1;
        this.p2 = p2;
    }


}