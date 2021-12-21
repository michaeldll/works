export function lerp(start, end, alpha) {
    return (1 - alpha) * start + alpha * end
}

export function map(
    value,
    in_min,
    in_max,
    out_min,
    out_max
) {
    return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}