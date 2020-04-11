export default {
    renderer: {
        antialias: true,
    },
    scene: {
        backgroundColor: '#e2cd76',
    },
    camera: {
        fov: 54.4,
        near: 0.1,
        far: 1000,
        position: {
            x: 0.545,
            y: 0.41,
            z: -1.36,
        },
        rotation: {
            x: 0,
            y: -3.13,
            z: 0,
        },
        aspect: 320 / 240,
    },
    controls: {
        enabled: true,
        maxDistance: 1500,
        minDistance: 0,
    },
    bloom: {
        strength: 0,
        radius: 0,
        threshold: 1,
    },
    bg: {
        position: {
            x: 0.45,
            y: 1.5,
            z: 3,
        },
        rotation: {
            y: Math.PI,
        },
        scale: {
            x: 1 * 6,
            y: 0.75 * 6,
        },
    },
    debug: false,
}
