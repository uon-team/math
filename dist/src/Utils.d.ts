/**
* Converts a degree angle to radians
* @param {Number} deg
* @returns {Number}
*/
export declare function ToRadians(deg: number): number;
/**
* Converts a radian angle to degrees
* @param {Number} rad
* @returns {Number}
*/
export declare function ToDegrees(rad: number): number;
/**
* Checks if val is 2^x
* @param {Number} val
* @returns {boolean}
*/
export declare function IsPowerOfTwo(val: number): boolean;
/**
 * Test for equality of floating point numbers
 * @param a
 * @param b
 */
export declare function IsNearEqual(a: number, b: number, epsilon?: number): boolean;
export declare function GetSign(val: number): 1 | -1;
