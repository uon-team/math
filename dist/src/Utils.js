/**
 * @file Math utils are defined within this file
 * @see uon.math
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
var RAD_TO_DEG = 180 / Math.PI;
var DEG_TO_RAD = Math.PI / 180;
var EPSILON = 10e-3;
/**
* Converts a degree angle to radians
* @param {Number} deg
* @returns {Number}
*/
export function ToRadians(deg) {
    return deg * DEG_TO_RAD;
}
/**
* Converts a radian angle to degrees
* @param {Number} rad
* @returns {Number}
*/
export function ToDegrees(rad) {
    return rad * RAD_TO_DEG;
}
/**
* Checks if val is 2^x
* @param {Number} val
* @returns {boolean}
*/
export function IsPowerOfTwo(val) {
    return (val & (val - 1)) === 0 && val !== 0;
}
/**
 * Test for equality of floating point numbers
 * @param a
 * @param b
 */
export function IsNearEqual(a, b, epsilon) {
    epsilon = epsilon || EPSILON;
    return a > b - epsilon && a < b + epsilon;
}
export function GetSign(val) {
    return val < 0 ? -1 : 1;
}
//# sourceMappingURL=Utils.js.map