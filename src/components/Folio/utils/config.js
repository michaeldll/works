import d2r from '../utils/d2r.js'

export default {
    camera: {
        fov: 43.6,
        near: 0.01,
        far: 1000,
        position: {
            x: -0.55,
            y: 0.42,
            z: -1.25,
        },
        target: {
            x: -0.556,
            y: 0.36,
            z: -0.431,
        },
        speed: 1.3,
        inertia: 0.6,
    },
    screen: {
        position: {
            x: -0.556,
            y: 0.435,
            z: -0.496,
        },
    },
    phone: {
        position: {
            x: -0.554,
            y: 0.211,
            z: -0.569,
        },
        rotation: {
            x: d2r(90),
            y: d2r(11),
            z: d2r(124),
        },
    },
    physicsGround: {
        position: {
            y: -0.33,
        },
    },
    activeEdgeMeshes: [
        'MOUSE',
        'Keyboard.001',
        'postit',
        'horsLesMursScreen',
        'pensaScreen',
        'riverScreen',
        'tocaScreen',
        'speaker left',
    ],
    activeOutlineMeshes: ['phone'],
    debug: false,
}
