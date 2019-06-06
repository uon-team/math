
import { Vector3 } from './Vector3';
import { Vector4 } from './Vector4';
import { f32, ZERO_F32, EPSILON } from './Utils';

const TEMP_VEC3 = new Vector3();


/**
 * Euler representation of a rotation
 */
export class Euler {

    public pitch: number = ZERO_F32;
    public roll: number = ZERO_F32;
    public yaw: number = ZERO_F32;

	/**
	 * Create a new euler object
	 * @param pitch
	 * @param roll
	 * @param yaw
	 */
    constructor(pitch?: any, roll?: number, yaw?: number) {


        const v = this;
        if (arguments.length == 3) {
            v.pitch = f32(pitch);
            v.roll = f32(roll);
            v.yaw = f32(yaw);

        } else if (Array.isArray(pitch)) {

            v.pitch = f32(pitch[0]) || ZERO_F32;
            v.roll = f32(pitch[1]) || ZERO_F32;
            v.yaw = f32(pitch[2]) || ZERO_F32;

        } else if (pitch instanceof Euler) {
            v.pitch = pitch.pitch;
            v.roll = pitch.roll;
            v.yaw = pitch.yaw;
        }

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
        let s1s2 = s1 * s2;
        let w = c1c2 * c3 - s1s2 * s3;
        let x = c1c2 * s3 + s1s2 * c3;
        let y = s1 * c2 * c3 + c1 * s2 * s3;
        let z = c1 * s2 * c3 - s1 * c2 * s3;
        // let angle = 2 * Math.acos(w);
        let norm = x * x + y * y + z * z;
        if (norm < EPSILON) { // when all euler angles are zero angle =0 so
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