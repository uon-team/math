/**
 * @file Matrix4
 * @see uon.math.Matrix4
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */
const Utils = require('./Utils'),
    Vector3 = require('./Vector3');

var TEMP_VEC30 = new Vector3();
var TEMP_VEC31 = new Vector3();
var TEMP_VEC32 = new Vector3();
var TEMP_VEC33 = new Vector3();


/**
 * @memberOf uon.math
 */
class Matrix4 {

	/**
	 * @constructs
	 */
    constructor() {

        this.elements = new Float32Array([

            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1

        ]);
    }

    set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32,
        n33, n34, n41, n42, n43, n44) {

        var te = this.elements;

        te[0] = n11;
        te[4] = n12;
        te[8] = n13;
        te[12] = n14;
        te[1] = n21;
        te[5] = n22;
        te[9] = n23;
        te[13] = n24;
        te[2] = n31;
        te[6] = n32;
        te[10] = n33;
        te[14] = n34;
        te[3] = n41;
        te[7] = n42;
        te[11] = n43;
        te[15] = n44;

        return this;

    }

    identity() {

        this.set(

            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1

        );

        return this;

    }

    copy(m) {

        this.elements.set(m.elements);

        return this;

    }

    determinant() {

        var te = this.elements;

        var n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
        var n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
        var n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
        var n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];

        // TODO: make this more efficient
        // ( based on
        // http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
        // )

        return (n41
            * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33
                + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23
                * n34)
            + n42
            * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33
                - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23
                * n31)
            + n43
            * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32
                + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24
                * n31) + n44
            * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33
                + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23
                * n31)

        );
    }

    inverse(m) {

        // based on
        // http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
        var te = this.elements;
        var me = m.elements;

        var n11 = me[0], n12 = me[4], n13 = me[8], n14 = me[12];
        var n21 = me[1], n22 = me[5], n23 = me[9], n24 = me[13];
        var n31 = me[2], n32 = me[6], n33 = me[10], n34 = me[14];
        var n41 = me[3], n42 = me[7], n43 = me[11], n44 = me[15];

        te[0] = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43
            - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
        te[4] = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43
            + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
        te[8] = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43
            - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
        te[12] = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33
            + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
        te[1] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43
            + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
        te[5] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43
            - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
        te[9] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43
            + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
        te[13] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33
            - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
        te[2] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42
            - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
        te[6] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42
            + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
        te[10] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42
            - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
        te[14] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32
            + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
        te[3] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42
            + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
        te[7] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42
            - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
        te[11] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42
            + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
        te[15] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32
            - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;

        var det = n11 * te[0] + n21 * te[4] + n31 * te[8] + n41
            * te[12];

        if (det == 0) {

            var msg = "Matrix4.inverse(): can't invert matrix, determinant is 0";
            console.warn(msg);
            this.identity();
            return this;
        }

        this.multiplyScalar(1 / det);

        return this;
    }

    transpose() {

        var te = this.elements;
        var tmp;

        tmp = te[1];
        te[1] = te[4];
        te[4] = tmp;
        tmp = te[2];
        te[2] = te[8];
        te[8] = tmp;
        tmp = te[6];
        te[6] = te[9];
        te[9] = tmp;

        tmp = te[3];
        te[3] = te[12];
        te[12] = tmp;
        tmp = te[7];
        te[7] = te[13];
        te[13] = tmp;
        tmp = te[11];
        te[11] = te[14];
        te[14] = tmp;

        return this;
    }

    multiply(mat) {

        var mat2 = this.elements;
        var mat1 = mat.elements;

        var a00 = mat1[0], a01 = mat1[1], a02 = mat1[2], a03 = mat1[3];
        var a10 = mat1[4], a11 = mat1[5], a12 = mat1[6], a13 = mat1[7];
        var a20 = mat1[8], a21 = mat1[9], a22 = mat1[10], a23 = mat1[11];
        var a30 = mat1[12], a31 = mat1[13], a32 = mat1[14], a33 = mat1[15];

        var b00 = mat2[0], b01 = mat2[1], b02 = mat2[2], b03 = mat2[3];
        var b10 = mat2[4], b11 = mat2[5], b12 = mat2[6], b13 = mat2[7];
        var b20 = mat2[8], b21 = mat2[9], b22 = mat2[10], b23 = mat2[11];
        var b30 = mat2[12], b31 = mat2[13], b32 = mat2[14], b33 = mat2[15];

        mat2[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
            mat2[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
            mat2[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
            mat2[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,

            mat2[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
            mat2[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
            mat2[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
            mat2[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,

            mat2[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
            mat2[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
            mat2[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23
            * a32, mat2[11] = b20 * a03 + b21 * a13 + b22
            * a23 + b23 * a33,

            mat2[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33
            * a30, mat2[13] = b30 * a01 + b31 * a11 + b32
            * a21 + b33 * a31, mat2[14] = b30 * a02 + b31
            * a12 + b32 * a22 + b33 * a32, mat2[15] = b30
            * a03 + b31 * a13 + b32 * a23 + b33 * a33;

        return this;

    }

    multiplyScalar(s) {

        var te = this.elements;

        te[0] *= s;
        te[4] *= s;
        te[8] *= s;
        te[12] *= s;
        te[1] *= s;
        te[5] *= s;
        te[9] *= s;
        te[13] *= s;
        te[2] *= s;
        te[6] *= s;
        te[10] *= s;
        te[14] *= s;
        te[3] *= s;
        te[7] *= s;
        te[11] *= s;
        te[15] *= s;

        return this;

    }

    scale(v) {

        var te = this.elements;
        var x = v.x, y = v.y, z = v.z;

        te[0] *= x;
        te[4] *= y;
        te[8] *= z;
        te[1] *= x;
        te[5] *= y;
        te[9] *= z;
        te[2] *= x;
        te[6] *= y;
        te[10] *= z;
        te[3] *= x;
        te[7] *= y;
        te[11] *= z;

        return this;

    }

    lookAt(eye, target, up) {

        var x = TEMP_VEC31.copy(up);
        var y = TEMP_VEC32.set(0, 0, 0);
        var z = TEMP_VEC33.copy(eye);

        var te = this.elements;

        z.subtract(target).normalize();

        if (z.length() === 0) {

            z.z = 1;

        }

        x.cross(z).normalize();

        if (x.length() === 0) {

            z.x += 0.0001;
            x.copy(up).cross(z).normalize();

        }

        y.copy(z).cross(x);

        te[0] = x.x;
        te[4] = y.x;
        te[8] = z.x;
        te[1] = x.y;
        te[5] = y.y;
        te[9] = z.y;
        te[2] = x.z;
        te[6] = y.z;
        te[10] = z.z;

        return this;

    }

    makeFrustum(left, right, bottom, top, near, far) {

        var te = this.elements;
        var x = 2 * near / (right - left);
        var y = 2 * near / (top - bottom);

        var a = (right + left) / (right - left);
        var b = (top + bottom) / (top - bottom);
        var c = -(far + near) / (far - near);
        var d = -2 * far * near / (far - near);

        te[0] = x;
        te[4] = 0;
        te[8] = a;
        te[12] = 0;
        te[1] = 0;
        te[5] = y;
        te[9] = b;
        te[13] = 0;
        te[2] = 0;
        te[6] = 0;
        te[10] = c;
        te[14] = d;
        te[3] = 0;
        te[7] = 0;
        te[11] = -1;
        te[15] = 0;

        return this;

    }

    makePerspective(fov, aspect, near, far) {

        var ymax = near * Math.tan(Utils.toRadians(fov * 0.5));
        var ymin = -ymax;
        var xmin = ymin * aspect;
        var xmax = ymax * aspect;

        return this.makeFrustum(xmin, xmax, ymin, ymax, near, far);

    }

    makeOrthographic(left, right, top, bottom, near, far) {

        var te = this.elements;
        var w = right - left;
        var h = top - bottom;
        var p = far - near;

        var x = (right + left) / w;
        var y = (top + bottom) / h;
        var z = (far + near) / p;

        te[0] = 2 / w;
        te[4] = 0;
        te[8] = 0;
        te[12] = -x;
        te[1] = 0;
        te[5] = 2 / h;
        te[9] = 0;
        te[13] = -y;
        te[2] = 0;
        te[6] = 0;
        te[10] = -2 / p;
        te[14] = -z;
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;
        te[15] = 1;

        return this;

    }

    makeRotationFromQuaternion(q) {

        var te = this.elements;

        var x = q.x, y = q.y, z = q.z, w = q.w;
        var x2 = x + x, y2 = y + y, z2 = z + z;
        var xx = x * x2, xy = x * y2, xz = x * z2;
        var yy = y * y2, yz = y * z2, zz = z * z2;
        var wx = w * x2, wy = w * y2, wz = w * z2;

        te[0] = 1 - (yy + zz);
        te[4] = xy - wz;
        te[8] = xz + wy;

        te[1] = xy + wz;
        te[5] = 1 - (xx + zz);
        te[9] = yz - wx;

        te[2] = xz - wy;
        te[6] = yz + wx;
        te[10] = 1 - (xx + yy);

        // last column
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;

        // bottom row
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;

        return this;

    }

    makeRotationAxis(axis, angle) {

        // Based on
        // http://www.gamedev.net/reference/articles/article1199.asp

        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var t = 1 - c;
        var x = axis.x, y = axis.y, z = axis.z;
        var tx = t * x, ty = t * y;

        this.set(

            tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z,
            ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z
            + s * x, t * z * z + c, 0, 0, 0, 0, 1

        );

        return this;

    }

    makeTranslation(x, y, z) {

        this.set(

            1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1

        );

        return this;

    }

    makeScale(x, y, z) {

        this.set(

            x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1

        );

        return this;

    }

    setTranslation(v) {

        var te = this.elements;

        te[12] = v.x;
        te[13] = v.y;
        te[14] = v.z;

        return this;

    }

    getTranslation(v) {

        var te = this.elements;
        v = v || new Vector4();

        v.x = te[12];
        v.y = te[13];
        v.z = te[14];

        return v;

    }

    compose(translation, quaternion, scale) {

        this.makeRotationFromQuaternion(quaternion);
        this.scale(scale);
        this.setTranslation(translation);

        return this;

    }

    decompose(translation, quaternion, scale) {

        var vector = TEMP_VEC30;
        var matrix = Matrix4.TEMP;

        var te = this.elements;

        var sx = vector.set(te[0], te[1], te[2]).length();
        var sy = vector.set(te[4], te[5], te[6]).length();
        var sz = vector.set(te[8], te[9], te[10]).length();

        // if determine is negative, we need to invert one scale
        var det = this.determinant();
        if (det < 0) {
            sx = -sx;
        }

        translation.x = te[12];
        translation.y = te[13];
        translation.z = te[14];

        // scale the rotation part

        matrix.elements.set(this.elements); // at this point
        // matrix is
        // incomplete so we
        // can't use .copy()

        var invSX = 1 / sx;
        var invSY = 1 / sy;
        var invSZ = 1 / sz;

        matrix.elements[0] *= invSX;
        matrix.elements[1] *= invSX;
        matrix.elements[2] *= invSX;

        matrix.elements[4] *= invSY;
        matrix.elements[5] *= invSY;
        matrix.elements[6] *= invSY;

        matrix.elements[8] *= invSZ;
        matrix.elements[9] *= invSZ;
        matrix.elements[10] *= invSZ;

        quaternion.setFromRotationMatrix(matrix);

        scale.x = sx;
        scale.y = sy;
        scale.z = sz;

        return this;

    }

    fromArray(array) {

        this.elements.set(array);

        return this;

    }

    toArray() {

        var te = this.elements;

        return [te[0], te[1], te[2], te[3], te[4], te[5], te[6],
            te[7], te[8], te[9], te[10], te[11], te[12], te[13],
            te[14], te[15]];

    }

    clone() {

        return new Matrix4().fromArray(this.elements);

    }

};

Matrix4.TEMP = new Matrix4();

module.exports = Matrix4;
