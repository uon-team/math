/**
 * @file uon.math
 * @see uon.math

 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

/**
 * The Base namespace for UON Math framework
 * @namespace uon.math
 * 
 */
const math = require('./src/Utils');

math.Vector2 = require('./src/Vector2');
math.Vector3 = require('./src/Vector3');
math.Vector4 = require('./src/Vector4');
math.AABB = require('./src/AABB');
math.Frustum = require('./src/Frustum');
math.Matrix3 = require('./src/Matrix3');
math.Matrix4 = require('./src/Matrix4');
math.Plane = require('./src/Plane');
math.Ray = require('./src/Ray');
math.Sphere = require('./src/Sphere');
math.Quaternion = require('./src/Quaternion');


module.exports = math;