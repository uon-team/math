
export const RAD_TO_DEG: number = 180 / Math.PI;
export const DEG_TO_RAD: number = Math.PI / 180;

/**
 * Approximated epsilon value for single precision float
 * For double it would be 2^-52
 */
export const EPSILON: number = Math.pow(2, -23); 

/**
 * Implementation of Math.fround()
 */
export const f32: (val: number) => number = (Math as any).fround ? (Math as any).fround : (val: number) => val;


/**
 * Zero as float32
 */
export const ZERO_F32 = f32(0.0);

/**
 * One as float32
 */
export const ONE_F32 = f32(1.0);

/**
 * 2 * PI
 */
export const TWO_PI = Math.PI * 2;

/**
 * PI / 2
 */
export const PI_OVER_TWO = Math.PI / 2;



/**
* Converts a degree angle to radians
* @param deg the angle in degrees
* @returns the angle in radians
*/
export function ToRadians(deg: number) {
    return deg * DEG_TO_RAD;
}

/**
* Converts a radian angle to degrees
* @param rad the angle in radians
* @returns the angle in degrees
*/
export function ToDegrees(rad: number) {
    return rad * RAD_TO_DEG;
}

/**
* Checks if val is 2^x
* @param val 
*/
export function IsPowerOfTwo(val: number) {
    return (val & (val - 1)) === 0 && val !== 0;
}

/**
 * Test for equality of floating point numbers
 * @param a
 * @param b
 */
export function IsNearEqual(a: number, b: number, epsilon: number = EPSILON) {
    return a > b - epsilon && a < b + epsilon;
}


/**
 * Get the sign of a number, 1 or -1
 * @param val 
 */
export function GetSign(val: number) {
    return val < 0 ? -1 : 1;

}
