/* eslint-disable array-callback-return */
//Howler for sound
import { Howl, Howler } from 'howler'

//Babylon for 3D
import { Engine } from '@babylonjs/core/Engines/engine'
import { Scene } from '@babylonjs/core/scene'

import { Vector3, Color4, Color3 } from '@babylonjs/core/Maths/math'
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera'
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader'

// Required side effects to populate the SceneLoader class
import '@babylonjs/loaders/glTF'

// Inspector
import '@babylonjs/inspector'

//Custom classes
import Screen from './Screen'
import LoadingScreen from './LoadingScreen'
import Skybox from './Skybox'
import PhysicsController from './PhysicsController'
import EventsController from './EventsController'
import SubtitleController from './SubtitleController'
// import GizmoController from './GizmoController'

// Utilities
import d2r from '../utils/d2r.js'
import config from '../utils/config'
import limitCamera from '../utils/limitCamera'
import showScreen from '../utils/showScreen'

//Assets
import birds from '../../../assets/audio/birds.mp3'
import pensa from '../../../assets/audio/pensa3.mp3'
import toca from '../../../assets/audio/toca2.mp3'
import horslesmurs from '../../../assets/audio/horslesmurs2.mp3'
import portfolio from '../../../assets/audio/portfolio.mp3'
import fleuve from '../../../assets/audio/river.mp3'
import sfx_phone_1 from '../../../assets/audio/sfx_phone_1.mp3'
import sfx_phone_2 from '../../../assets/audio/sfx_phone_2.mp3'
import sfx_phone_3 from '../../../assets/audio/sfx_phone_3.mp3'

class BabylonScene {
    constructor() {
        this.camera = null
        this.audio = {
            birds: new Howl({
                src: birds,
                loop: true,
                volume: 0.01,
            }),
            pensa: new Howl({
                src: pensa,
                loop: false,
                volume: 0.5,
            }),
            portfolio: new Howl({
                src: portfolio,
                loop: false,
                volume: 0.5,
            }),
            toca: new Howl({
                src: toca,
                loop: false,
                volume: 1.0,
            }),
            horslesmurs: new Howl({
                src: horslesmurs,
                loop: false,
                volume: 1.0,
            }),
            river: new Howl({
                src: fleuve,
                loop: false,
                volume: 2.0,
            }),
            phoneCollision1: new Howl({
                src: sfx_phone_1,
                loop: false,
                volume: 0.08,
            }),
            phoneCollision2: new Howl({
                src: sfx_phone_2,
                loop: false,
                volume: 0.08,
            }),
            phoneCollision3: new Howl({
                src: sfx_phone_3,
                loop: false,
                volume: 0.08,
            }),
        }
        this.subtitles = {
            pensa: new SubtitleController('pensa-sub', 10500, [0]),
            toca: new SubtitleController('toca-sub', 13300, [0]),
            horslesmurs: new SubtitleController('horslesmurs-sub', 39000, [
                0,
                11500,
                20000,
                27000,
            ]),
            river: new SubtitleController('river-sub', 34000, [
                0,
                13000,
                27500,
            ]),
            postit: new SubtitleController('postit-sub', 3500, [0]),
        }
        this.hasClickedMouse = false
        this.scene = null
        this.canvas = null
        new LoadingScreen()
        this.init()
    }

    init() {
        // Set the canvas element.
        document
            .querySelector('#canvas-container')
            .insertAdjacentHTML(
                'afterbegin',
                '<canvas id="babylon-canvas"></canvas>'
            )
        const canvas = document.getElementById('babylon-canvas')
        this.canvas = canvas

        // Associate a Babylon Engine to it.
        const engine = new Engine(canvas, false, null, true)
        engine.setHardwareScalingLevel(window.innerWidth / 480)
        engine.displayLoadingUI()

        // Create a scene.
        this.scene = new Scene(engine)

        SceneLoader.Load('models/', 'scene.glb', engine, (gltf) => {
            this.scene = gltf

            const init = () => {
                // this.scene.enableCollisions = true

                new Skybox(this.scene, 3)
                new Screen(
                    this.scene,
                    document.getElementById('life-river'),
                    'riverScreen'
                )
                new Screen(
                    this.scene,
                    document.getElementById('horslesmurs'),
                    'horsLesMursScreen'
                )
                new Screen(
                    this.scene,
                    document.getElementById('toca'),
                    'tocaScreen'
                )
                new Screen(
                    this.scene,
                    document.getElementById('pensa'),
                    'pensaScreen'
                )

                this.setPhone()
                this.setCamera()
                this.setArm()
                this.setEdgesAndOutlines()
                showScreen(this.scene, 'random')

                new EventsController(
                    canvas,
                    this.scene,
                    engine,
                    this.audio,
                    this.subtitles,
                    Howler
                )

                //ambient sound
                this.audio.birds.play()

                new PhysicsController(this.scene, this.audio).init()
            }

            init()

            if (config.debug) {
                document.getElementById('canvas-container').style.width = '100%'
                this.scene.debugLayer.show()
                // new GizmoController(
                //     this.scene,
                //     this.scene.meshes.find((mesh) => mesh.name === 'phone')
                // )
                // this.scene.forceShowBoundingBoxes = true
            }

            this.scene.beforeRender = () => {
                this.positionArm()
                limitCamera(this.camera, { lower: -0.21, upper: 0.62 }, 'x')
                limitCamera(this.camera, { lower: -0.55, upper: 0.62 }, 'y')
            }

            window.addEventListener('resize', (e) => {
                engine.resize()
            })

            // Render every frame
            engine.runRenderLoop(() => {
                this.scene.render()
            })
        })
    }

    setEdgesAndOutlines() {
        this.scene.meshes.forEach((mesh) => {
            mesh.edgesWidth = 0.9
            mesh.edgesColor = new Color4(249 / 255, 213 / 255, 134 / 255, 1)
            mesh.outlineColor = new Color3(249 / 255, 213 / 255, 134 / 255)
        })
    }

    setPhone() {
        const phone = this.scene.meshes.find((mesh) => mesh.name === 'phone')
        const phoneChild = this.scene.meshes.find(
            (mesh) => mesh.name === 'phone.child'
        )
        phoneChild.setEnabled(false)

        phone.scaling = new Vector3(0.5, 0.5, 0.5)
        phone.outlineWidth = 0.003
        phone.setParent(null)

        phone.position = new Vector3(
            config.phone.position.x,
            config.phone.position.y,
            config.phone.position.z
        )
        phone.rotation = new Vector3(
            config.phone.rotation.x,
            config.phone.rotation.y,
            config.phone.rotation.z
        )
    }

    positionArm() {
        const arm = this.scene.rootNodes[0]._children.find((child) => {
            if (child.name === 'main_enfant.004') return child
        })
        arm.rotation = new Vector3(
            this.camera.rotation.x,
            -this.camera.rotation.y,
            this.camera.rotation.z
        )
    }

    setCamera() {
        const cameraPos = new Vector3(
            config.camera.position.x,
            config.camera.position.y,
            config.camera.position.z
        )
        const cameraTarget = new Vector3(
            config.camera.target.x,
            config.camera.target.y,
            config.camera.target.z
        )
        this.camera = new UniversalCamera('camera1', cameraPos, this.scene)
        this.camera.minZ = config.camera.near
        this.camera.fov = d2r(config.camera.fov)
        this.camera.setTarget(cameraTarget)
        this.camera.attachControl(this.canvas, true)
        this.camera.speed = config.camera.speed
        this.camera.inertia = config.camera.inertia
    }

    setArm() {
        const arm = this.scene.rootNodes[0]._children.find((child) => {
            if (child.name === 'main_enfant.004') return child
        })
        arm.position.x = 0.413
        arm.position.y = 0.2 //when raised: 0,309
        arm.position.z = -1.23
        arm.scaling = new Vector3(0.5, 0.5, 0.5)
    }
}

export default BabylonScene
