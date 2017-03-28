/**
 * @file Math utils are defined within this file
 * @see uon.math
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

const RAD_TO_DEG: number = 180 / Math.PI;
const DEG_TO_RAD: number = Math.PI / 180;

/**
* Converts a degree angle to radians
* @param {Number} deg
* @returns {Number}
*/
export function ToRadians(deg: number) {
    return deg * DEG_TO_RAD;
}

/**
* Converts a radian angle to degrees
* @param {Number} rad
* @returns {Number}
*/
export function ToDegrees(rad: number) {
    return rad * RAD_TO_DEG;
}

/**
* Checks if val is 2^x
* @param {Number} val
* @returns {boolean}
*/
export function IsPowerOfTwo(val: number) {
    return (val & (val - 1)) === 0 && val !== 0;
}
