/**
 * @file Math utils are defined within this file
 * @see uon.math
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

/**
 * The uon.math namespace will be extended with this object
 * 
 * @lends uon.math
 */ 
var utils = {
	
		/** 
		 * Radians to degrees factor : 180 / Math.PI
		 * @const 
		 */
		RAD_TO_DEG : 180 / Math.PI,
		
		/** 
		 * Degrees to radians factor : Math.PI / 180
		 * @const 
		 */
		DEG_TO_RAD : Math.PI / 180,
		

		/**
		 * Clamps val between the range min-max
		 * @param {Number} val
		 * @param {Number} min
		 * @param {Number} max
		 * @returns {Number}
		 */
		clamp : function(val, min, max) {
			
			return Math.min(Math.max(val, min), max);
		},
		

		/**
		 * Converts a degree angle to radians
		 * @param {Number} deg
		 * @returns {Number}
		 */
		toRadians : function(deg) {
			return deg * utils.DEG_TO_RAD;
		},
		
		/**
		 * Converts a radian angle to degrees
		 * @param {Number} rad
		 * @returns {Number}
		 */
		toDegrees : function(rad) {
			return rad * utils.RAD_TO_DEG;
		},
		
		/**
		 * Converts a decimal to its hex representation
		 * @param num
		 * @param padding
		 * @returns {String}
		 */
		toHexString : function(num, padding) {
			var hex = Number(num).toString(16);
		    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

		    while (hex.length < padding) {
		        hex = "0" + hex;
		    }

		    return hex;
		},
		
		/**
		 * Checks is val is n^2
		 * @param val
		 * @returns {boolean}
		 */
		isPowerOfTwo : function(val) {
			return ( val & ( val - 1 ) ) === 0 && val !== 0;
		},
		
		/**
		 * Linear interpolation of A and B by alpha
		 * @param {Number} a - Input A
		 * @param {Number} b - Input B
		 * @param {Number} x - The alpha, between 0-1
		 * @returns {Number}
		 */
		lerp : function(a, b, x) {
			//return a + x * (b - a);
			
			return (a * (1.0 - x)) + (b * x);
		},
		
		
		/**
		 * TODO implement
		 */
		interpolate : function(a, b, x, easing) {
			
			
		},
		
		/**
		 * Tests if an object has at least 1 vector attribute (x,y,z,w)
		 * @param obj
		 * @returns {Boolean}
		 */
		isVectorLike : function(obj) {
			
			if(obj && (obj.x !== undefined || obj.y !== undefined || obj.z !== undefined || obj.w !== undefined)) {
				return true;
			}
			
			return false;
		}
		
		
};

module.exports = utils;