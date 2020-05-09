/* eslint-disable array-callback-return */
//Howler for sound
import { Howl, Howler } from 'howler'

//Babylon for 3D
import { Engine } from '@babylonjs/core/Engines/engine'
import { Scene } from '@babylonjs/core/scene'
import { Vector3, Color4, Color3 } from '@babylonjs/core/Maths/math'
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera'
import { DeviceOrientationCamera } from '@babylonjs/core/Cameras/deviceOrientationCamera'
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
import ProgressionController from './ProgressionController'
// import GizmoController from './GizmoController'

// Utilities
import d2r from '../utils/d2r.js'
import config from '../utils/config'
import limitCamera from '../utils/limitCamera'
import showScreen from '../utils/showScreen'
import findMesh from '../utils/findMesh'

//Assets
import birds from '../../../assets/audio/birds4.mp3'
import pensa from '../../../assets/audio/voices/pensa.mp3'
import toca from '../../../assets/audio/voices/toca.mp3'
import horslesmurs from '../../../assets/audio/voices/horslesmurs.mp3'
import portfolio from '../../../assets/audio/voices/portfolio.mp3'
import fleuve from '../../../assets/audio/voices/river.mp3'
import sfx_click_in from '../../../assets/audio/click_in.mp3'
import sfx_click_out from '../../../assets/audio/click_out.mp3'
import sfx_phone_1 from '../../../assets/audio/sfx_phone_1.mp3'
import sfx_phone_2 from '../../../assets/audio/sfx_phone_2.mp3'
import sfx_phone_3 from '../../../assets/audio/sfx_phone_3.mp3'
import sfx_keyboard from '../../../assets/audio/kbclick.mp3'
import sfx_mouse from '../../../assets/audio/mouseclick.mp3'

class BabylonScene {
    constructor() {
        this.camera = null
        this.audio = {
            ambient: {
                birds: new Howl({
                    src: birds,
                    loop: true,
                    volume: 0.7,
                }),
            },
            sfx: {
                phoneCollision1: new Howl({
                    src: sfx_phone_1,
                    loop: false,
                    volume: 0.1,
                }),
                phoneCollision2: new Howl({
                    src: sfx_phone_2,
                    loop: false,
                    volume: 0.1,
                }),
                phoneCollision3: new Howl({
                    src: sfx_phone_3,
                    loop: false,
                    volume: 0.1,
                }),
                click_in: new Howl({
                    src: sfx_click_in,
                    loop: false,
                    volume: 0.6,
                    rate: 0.9,
                }),
                click_out: new Howl({
                    src: sfx_click_out,
                    loop: false,
                    volume: 0.6,
                    rate: 0.9,
                }),
                kb: new Howl({
                    src: sfx_keyboard,
                    loop: false,
                    volume: 0.1,
                    rate: 0.8,
                }),
                mouse: new Howl({
                    src: sfx_mouse,
                    loop: false,
                    volume: 0.1,
                }),
            },
            voices: {
                pensa: new Howl({
                    src: pensa,
                    loop: false,
                    volume: 2.2,
                }),
                portfolio: new Howl({
                    src: portfolio,
                    loop: false,
                    volume: 3.0,
                }),
                toca: new Howl({
                    src: toca,
                    loop: false,
                    volume: 2.8,
                }),
                horslesmurs: new Howl({
                    src: horslesmurs,
                    loop: false,
                    volume: 2.8,
                }),
                river: new Howl({
                    src: fleuve,
                    loop: false,
                    volume: 2.8,
                }),
            },
        }
        this.subtitles = {
            pensa: new SubtitleController('pensa-sub', 10500, [0, 3800]),
            toca: new SubtitleController('toca-sub', 13300, [0]),
            horslesmurs: new SubtitleController('horslesmurs-sub', 39000, [
                0,
                11500,
                20000,
                27000,
            ]),
            river: new SubtitleController('river-sub', 19000, [0, 11500]),
            postit: new SubtitleController('postit-sub', 3500, [0]),
        }
        this.hasClickedMouse = false
        this.canvas = null
        this.scene = null
        this.engine = null
        this.eventsController = null
        this.loadingScreen = new LoadingScreen().init()
        this.progression = new ProgressionController()
    }

    init() {
        // Set the canvas element.
        document
            .querySelector('#canvas-container')
            .insertAdjacentHTML(
                'afterbegin',
                '<canvas id="babylon-canvas"></canvas>'
            )
        this.canvas = document.getElementById('babylon-canvas')

        // Associate a Babylon Engine to it.
        this.engine = new Engine(this.canvas, false, null, true)
        window.innerWidth > 450
            ? this.engine.setHardwareScalingLevel(window.innerWidth / 480)
            : this.engine.setHardwareScalingLevel(2.5)
        this.engine.displayLoadingUI()

        // Create a scene.
        this.scene = new Scene(this.engine)

        SceneLoader.Load(
            'models/',
            'scene.glb',
            this.engine,
            (gltf) => {
                this.scene = gltf

                new Skybox(this.scene, 3).init()
                new Screen(
                    this.scene,
                    document.getElementById('life-river'),
                    'riverScreen'
                ).init()
                new Screen(
                    this.scene,
                    document.getElementById('horslesmurs'),
                    'horsLesMursScreen'
                ).init()
                new Screen(
                    this.scene,
                    document.getElementById('toca'),
                    'tocaScreen'
                ).init()
                new Screen(
                    this.scene,
                    document.getElementById('pensa'),
                    'pensaScreen'
                ).init()

                this.setPhone()
                this.setCamera()
                this.setArm()
                this.setEdgesAndOutlines()
                showScreen(this.scene, 'random')

                this.eventsController = new EventsController(
                    this.canvas,
                    this.scene,
                    this.engine,
                    this.audio,
                    this.subtitles,
                    this.progression
                )

                if (sessionStorage.getItem('volume')) {
                    Howler.volume(parseInt(sessionStorage.getItem('volume')))
                } else {
                    sessionStorage.setItem('volume', '1')
                }

                //ambient sound
                this.audio.ambient.birds.play()

                new PhysicsController(this.scene, this.audio).init()

                if (config.debug) {
                    document.getElementById('canvas-container').style.width =
                        '100%'
                    this.scene.debugLayer.show()
                    // new GizmoController(
                    //     this.scene,
                    //     findMesh('phone', this.scene)
                    // ).init()
                    // this.scene.forceShowBoundingBoxes = true
                }

                this.scene.beforeRender = () => {
                    this.positionArm()
                    if (this.eventsController)
                        this.eventsController.onCameraRotation()
                    limitCamera(this.camera, { lower: -0.22, upper: 0.52 }, 'x')
                    limitCamera(this.camera, { lower: -0.55, upper: 0.55 }, 'y')
                }

                // Render every frame
                this.engine.runRenderLoop(() => {
                    this.scene.render()
                })
            },
            (progressEvent) => {
                // onProgressEvent
                let loadedPercent = 0
                if (progressEvent.lengthComputable) {
                    loadedPercent = (
                        (progressEvent.loaded * 100) /
                        progressEvent.total
                    ).toFixed()
                } else {
                    const dlCount = progressEvent.loaded / (1024 * 1024)
                    loadedPercent = Math.floor(dlCount * 100.0) / 100.0
                }
                console.log(loadedPercent)
                document.getElementById('loading-bar').style.width =
                    loadedPercent * 38.9105058366 + '%'
            }
        )
    }

    setEdgesAndOutlines() {
        this.scene.meshes.forEach((mesh) => {
            mesh.edgesWidth = 0.9
            mesh.edgesColor = new Color4(249 / 255, 213 / 255, 134 / 255, 1)
            mesh.outlineColor = new Color3(249 / 255, 213 / 255, 134 / 255)
        })

        findMesh('MOUSE', this.scene).outlineWidth = 0.005
        findMesh('phone', this.scene).outlineWidth = 0.006

        this.scene.meshes
            .filter((mesh) => mesh.name.indexOf('Screen') > -1)
            .forEach((screen) => {
                screen.outlineWidth = 0.034
            })
    }

    setPhone() {
        const phone = findMesh('phone', this.scene)
        const phoneInHand = findMesh('phone.child', this.scene)

        phoneInHand.setEnabled(false)

        phone.scaling = new Vector3(0.5, 0.5, 0.5)
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
        if (window.innerWidth < 450) {
            this.camera = new DeviceOrientationCamera(
                'camera1',
                cameraPos,
                this.scene
            )
        } else {
            this.camera = new UniversalCamera('camera1', cameraPos, this.scene)
        }
        this.camera.minZ = config.camera.near
        this.camera.fov =
            window.innerWidth < 450
                ? d2r(config.camera.fovMobile)
                : d2r(config.camera.fov)
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
