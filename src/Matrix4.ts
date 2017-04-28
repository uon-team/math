/**
 * @file Matrix4
 * @see uon.math.Matrix4
 * @author Gabriel Roy <gab@uon.io>
 * @ignore
 */

import {Vector3} from './Vector3';
import {Quaternion} from './Quaternion';

import {ToRadians} from './Utils';

var TEMP_VEC30 = new Vector3();
var TEMP_VEC31 = new Vector3();
var TEMP_VEC32 = new Vector3();
var TEMP_VEC33 = new Vector3();


/**
 * @memberOf uon.math
 */
export class Matrix4 {


    public elements: Float32Array;

    private static TEMP = new Matrix4();

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

    set(n11: number, n12: number, n13: number, n14: number,
        n21: number, n22: number, n23: number, n24: number,
        n31: number, n32: number, n33: number, n34: number,
        n41: number, n42: number, n43: number, n44: number) {

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

    copy(m: Matrix4) {

        this.elements.set(m.elements);

        return this;

    }

    /**
     * Compute determinant
     */
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

    /**
     * Copy the inverse of m into this
     * @param m
     */
    inverse(m: Matrix4) {

        // based on
        // http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
        let te = this.elements;
        let me = m.elements;

        let n11 = me[0], n12 = me[4], n13 = me[8], n14 = me[12];
        let n21 = me[1], n22 = me[5], n23 = me[9], n24 = me[13];
        let n31 = me[2], n32 = me[6], n33 = me[10], n34 = me[14];
        let n41 = me[3], n42 = me[7], n43 = me[11], n44 = me[15];

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

    /**
     * Transpose this matrix in place
     */
    transpose() {

        let te = this.elements;
        let tmp: number;

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

    /**
     * Multiply this matrix by another
     * @param mat
     */
    multiply(mat: Matrix4) {

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

    /**
     * Scale the matrix uniformly by value s
     * @param s
     */
    multiplyScalar(s: number) {

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

    /**
     * Scale the matrix with Vector3
     * @param v
     */
    scale(v: Vector3) {

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

    /**
     * Apply a look at transformation
     * @param eye
     * @param target
     * @param up
     */
    lookAt(eye: Vector3, target: Vector3, up: Vector3) {

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

    makeFrustum(left: number, right: number,
        bottom: number, top: number,
        near: number, far: number) {

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

    makePerspective(fov: number, aspect: number, near: number, far: number) {

        var ymax = near * Math.tan(ToRadians(fov * 0.5));
        var ymin = -ymax;
        var xmin = ymin * aspect;
        var xmax = ymax * aspect;

        return this.makeFrustum(xmin, xmax, ymin, ymax, near, far);

    }

    makeOrthographic(left: number, right: number,
        top: number, bottom: number,
        near: number, far: number) {

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

    makeRotationFromQuaternion(q: Quaternion) {

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

    makeRotationAxis(axis: Vector3, angle: number) {

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

    makeTranslation(x: number, y: number, z: number) {

        this.set(

            1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1

        );

        return this;

    }

    makeScale(x: number, y: number, z: number) {

        this.set(

            x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1

        );

        return this;

    }

    getScale() {

        let vector = TEMP_VEC30;
        let te = this.elements;

        let sx = vector.set(te[0], te[1], te[2]).length();
        let sy = vector.set(te[4], te[5], te[6]).length();
        let sz = vector.set(te[8], te[9], te[10]).length();

        return new Vector3(sx, sy, sz);
    }

    setTranslation(v: Vector3) {

        var te = this.elements;

        te[12] = v.x;
        te[13] = v.y;
        te[14] = v.z;

        return this;

    }

    getTranslation(v?: Vector3) {

        var te = this.elements;
        v = v || new Vector3();

        v.x = te[12];
        v.y = te[13];
        v.z = te[14];

        return v;

    }

    compose(translation: Vector3, quaternion: Quaternion, scale: Vector3) {

        this.makeRotationFromQuaternion(quaternion);
        this.scale(scale);
        this.setTranslation(translation);

        return this;

    }

    decompose(translation: Vector3, quaternion: Quaternion, scale: Vector3) {

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

    fromArray(array: ArrayLike<number>) {

        this.elements.set(array);

        return this;

    }

    toArray() {

        return Array.from(this.elements);

    }

    clone() {

        return new Matrix4().fromArray(this.elements);

    }

    static Multiply(a: Matrix4, b: Matrix4) {

        let result = new Matrix4();

        var ae = a.elements;
        var be = b.elements;
        var te = result.elements;

        var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
        var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
        var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
        var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];

        var b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
        var b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
        var b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
        var b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];

        te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

        te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

        te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

        te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

        return result;
    }

};
