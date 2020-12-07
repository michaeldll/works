/**
 * @param {Number} in_min
 * @param {Number} in_max
 * @param {Number} out_min
 * @param {Number} out_max
 */
export default function map(value, in_min, in_max, out_min, out_max) {
    return (
        ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    )
}
