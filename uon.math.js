/**
 * @file uon.math
 * @see uon.math

 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */


var uon = require('uon.core');

/**
 * The Base namespace for UON Math framework
 * @namespace uon.math
 * 
 */
var math = {
		
		Vector2 : require('./src/Vector2'),
		Vector3 : require('./src/Vector3'),
		Vector4 : require('./src/Vector4'),
		AABB : require('./src/AABB'),
		Frustum : require('./src/Frustum'),
		Matrix3 : require('./src/Matrix3'),
		Matrix4 : require('./src/Matrix4'),
		Plane : require('./src/Plane'),
		Ray : require('./src/Ray'),
		Sphere : require('./src/Sphere'),
		Quaternion : require('./src/Quaternion'),
};

uon.object.extend(math, require('./src/Utils'));


module.exports = math;