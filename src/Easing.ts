
const c = 1;
const b = 0;
const PI_OVER_2 = Math.PI / 2;
const PI = Math.PI;
const sin = Math.sin;
const cos = Math.cos;


export const Easing = {

    linear: function LinearEasing(time: number, duration: number) {
        return time / duration;
    },

    easeInSine: function SineInEasing(time: number, duration: number) {
        return -c * cos(time / duration * PI_OVER_2) + c + b;
    },

    easeOutSine: function SineOutEasing(time: number, duration: number) {
        return c * sin(time / duration * PI_OVER_2) + b;
    },

    easeInOutSine: function SineInOutEasing(time: number, duration: number) {
        return -c / 2 * (cos(PI * time / duration) - 1) + b;
    },


};