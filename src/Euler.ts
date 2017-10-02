/**
 * @file Euler
 * @see uon.math.Euler
 * @author Gabriel Roy <gab@uon.io>
 * 
 */

import { Quaternion } from './Quaternion';
import { Vector4 } from './Vector4';

const ZERO_F32 = Math.fround(0);
const ONE_F32 = Math.fround(0);
const f32 = Math.fround;

export class Euler {

    public pitch: number = ZERO_F32;
    public roll: number = ZERO_F32;
    public yaw: number = ZERO_F32;

    constructor(pitch?: any, roll?: number, yaw?: number) {


        var v = this;
        if (arguments.length == 3) {
            this.pitch = f32(pitch);
            this.roll = f32(roll);
            this.yaw = f32(yaw);

        } else if (Array.isArray(pitch)) {

            this.pitch = f32(pitch[0]) || ZERO_F32;
            this.roll = f32(pitch[1]) || ZERO_F32;
            this.yaw = f32(pitch[2]) || ZERO_F32;

        } else if (pitch instanceof Euler) {
            this.pitch = pitch.pitch;
            this.roll = pitch.roll;
            this.yaw = pitch.yaw;
        }

    }

    toQuaternion(out?: Quaternion) {

        out = out || new Quaternion();


        let t0 = Math.cos(this.yaw * 0.5);
        let t1 = Math.sin(this.yaw * 0.5);
        let t2 = Math.cos(this.roll * 0.5);
        let t3 = Math.sin(this.roll * 0.5);
        let t4 = Math.cos(this.pitch * 0.5);
        let t5 = Math.sin(this.pitch * 0.5);

        out.w = t0 * t2 * t4 + t1 * t3 * t5;
        out.x = t0 * t3 * t4 - t1 * t2 * t5;
        out.y = t0 * t2 * t5 + t1 * t3 * t4;
        out.z = t1 * t2 * t4 - t0 * t3 * t5;

        return out;

    }

    toAxisAngle(out?: Vector4) { 

        out = out || new Vector4();


        let c1 = Math.cos(this.pitch / 2);
        let s1 = Math.sin(this.pitch / 2);
        let c2 = Math.cos(this.yaw / 2);
        let s2 = Math.sin(this.yaw / 2);
        let c3 = Math.cos(this.roll / 2);
        let s3 = Math.sin(this.roll / 2);
        let c1c2 = c1 * c2;
        let  s1s2 = s1 * s2;
        let w = c1c2 * c3 - s1s2 * s3;
        let x = c1c2 * s3 + s1s2 * c3;
        let y = s1 * c2 * c3 + c1 * s2 * s3;
        let z = c1 * s2 * c3 - s1 * c2 * s3;
        let angle = 2 * Math.acos(w);
        let norm = x * x + y * y + z * z;
        if (norm < 0.001) { // when all euler angles are zero angle =0 so
            // we can set axis to anything to avoid divide by zero
            x = 1;
            y = z = 0;
        } else {
            norm = Math.sqrt(norm);
            x /= norm;
            y /= norm;
            z /= norm;
        }

        return out.set(x, y, z, w);
    }

}

