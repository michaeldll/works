import d2r from './d2r.js'

export default {
    camera: {
        fov: 43.6,
        fovMobile: 56.6,
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
    arm: {
        initial: {
            position: {
                x: 0.413,
                y: 0.22,
                z: -1.23,
            },
        },
        lowered: {
            position: {
                y: 0.22,
            },
        },
        raised: {
            position: {
                y: 0.32,
            },
        },
        tutorial: {
            facingPostitStack: {
                desktop: {
                    position: {
                        x: 0.486,
                        y: 0.35,
                        z: -1.346,
                    },
                },
                mobile: {
                    position: {
                        x: 0.425,
                        y: 0.31,
                        z: -1.315,
                    },
                },
            },
            facingScreen: {
                desktop: {
                    position: {
                        x: 0.458,
                        y: 0.336,
                        z: -1.312,
                    },
                },
                mobile: {
                    position: {
                        x: 0.457,
                        y: 0.336,
                        z: -1.312,
                    },
                },
            },
        },
    },
    physicsGround: {
        position: {
            y: -0.33,
        },
    },
    activeEdgeMeshes: [
        'Keyboard.001',
        'postit.001',
        'speaker left',
        'tuto.stack top',
        'tuto.postit.speaker',
        'tuto.postit.keyboard',
        'tuto.postit.open',
    ],
    activeOutlineMeshes: [
        'phone',
        'horsLesMursScreen',
        'pensaScreen',
        'riverScreen',
        'tocaScreen',
        'MOUSE',
    ],
    activeGrabMeshes: ['phone'],
    activeTutorialMeshes: [
        'tuto.stack top',
        'tuto.postit.speaker',
        'tuto.postit.keyboard',
        'tuto.postit.open',
    ],
    tutorial: true,
    debug: false,
}
