
declare var console: any;

class V2a {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = Math.fround(x);
        this.y = Math.fround(y);
    }

}

class V2b {
    d = new Float32Array(2);
    constructor(x: number, y: number) {
        this.d[0] = x;
        this.d[1] = y;
    }

    get x() {
        return this.d[0];
    }

    get y() {
        return this.d[1];
    }

    set x(v: number) {
        this.d[0] = v;
    }

    set y(v: number) {
        this.d[1] = v;
    }
}

const COUNT = 1000000;

const a_vecs = new Array<V2a>(COUNT);
const b_vecs = new Array<V2b>(COUNT);

console.time('member vec init')
for(let i = 0; i < COUNT; ++i) {
    a_vecs[i] = new V2a(1, 1);
}
console.timeEnd('member vec init')

console.time('array vec init')
for(let i = 0; i < COUNT; ++i) {
    b_vecs[i] = new V2b(1, 1);
}
console.timeEnd('array vec init');


console.time('member vec read')
for(let i = 0; i < COUNT; ++i) {
    let v = a_vecs[i];
    let x = v.x;
    let y = v.y;
}
console.timeEnd('member vec read')

console.time('array vec read')
for(let i = 0; i < COUNT; ++i) {
    let v = b_vecs[i];
    let x = v.x;
    let y = v.y;
}
console.timeEnd('array vec read')

console.time('member vec write')
for(let i = 0; i < COUNT; ++i) {
    let v = a_vecs[i];
    v.x = 2;
    v.y = 2;
}
console.timeEnd('member vec write')

console.time('array vec write')
for(let i = 0; i < COUNT; ++i) {
    let v = b_vecs[i];
    v.x = 2;
    v.y = 2;
}
console.timeEnd('array vec write')