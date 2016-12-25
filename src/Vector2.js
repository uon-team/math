/**
 * @file Vector2
 * @see uon.math.Vector2
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

"use strict";

/**
 * @memberOf uon.math
 */
class Vector2 {
	
	/**
	 * @constructs
	 */
	constructor(x, y) {
		
		this.x = 0;
		this.y = 0;
		
		var v = this;
        if (arguments.length == 2) {
            v.x = x;
            v.y = y;
        } else if (x instanceof Array) {
			v.x = x[0];
			v.y = x[1];
		} else if (x instanceof Vector2) {
			v.x = x.x;
			v.y = x.y;
		}

	}
	
	set ( x, y ) {

		this.x = x;
		this.y = y;
		
		return this;

	}

	equals (v) {

		return ((v.x === this.x) && (v.y === this.y));

	}

	negate () {

		this.x = -this.x;
		this.y = -this.y;

		return this;

	}

	add (vec2) {
		this.x += vec2.x;
		this.y += vec2.y;
		return this;
	}

	subtract (vec2) {
		this.x -= vec2.x;
		this.y -= vec2.y;
		return this;
	}

	multiply (vec2) {
		this.x *= vec2.x;
		this.y *= vec2.y;
		return this;
	}

	multiplyScalar (s) {

		this.x *= s;
		this.y *= s;

		return this;

	}

	divide (v) {

		this.x /= v.x;
		this.y /= v.y;

		return this;

	}

	divideScalar (scalar) {

		if (scalar !== 0) {

			var inv = 1 / scalar;

			this.x *= inv;
			this.y *= inv;

		} else {

			this.x = 0;
			this.y = 0;

		}

		return this;

	}

	dot (vec2) {
		return this.x * vec2.x + this.y * vec2.y;
	}

	length () {
		return Math.sqrt(this.lengthSq());
	}

	lengthSq () {
		var a = this;
		return a.x * a.x + a.y * a.y;
	}

	normalize () {
		var len = this.length();
		return this.divideScalar(len);
	}

	lerp (v, alpha) {
		this.x += (v.x - this.x) * alpha;
		this.y += (v.y - this.y) * alpha;

		return this;
	}

	min (v) {

		if (this.x > v.x) {

			this.x = v.x;

		}

		if (this.y > v.y) {

			this.y = v.y;

		}

		return this;

	}

	max (v) {

		if (this.x < v.x) {
			this.x = v.x;
		}

		if (this.y < v.y) {
			this.y = v.y;
		}

		return this;

	}

	clone () {
		return new Vector2(this);
	}
	
	copy (x) {
		this.x = x.x;
		this.y = x.y;
		
		return this;
	}

	fromArray (array, offset) {

		if (offset === undefined)
			offset = 0;

		this.x = array[offset];
		this.y = array[offset + 1];

		return this;

	}

	toArray (array, offset) {

		if (array === undefined)
			array = [];
		if (offset === undefined)
			offset = 0;

		array[offset] = this.x;
		array[offset + 1] = this.y;

		return array;

	}
	
	toFloatArray () {
		if(this._cache == null) {
			this._cache = new Float32Array(2);
		}
		
		this.toArray(this._cache);
		
		return this._cache;
		
	}

};


module.exports = Vector2;
