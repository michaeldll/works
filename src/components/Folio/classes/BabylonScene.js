/* eslint-disable array-callback-return */
//Cannon for physics
import * as CANNON from 'cannon'

//Howler for sound
import { Howl, Howler } from 'howler'

//Babylon for 3D
import { Engine } from '@babylonjs/core/Engines/engine'
import { Scene } from '@babylonjs/core/scene'

import { Vector3, Color4, Color3 } from '@babylonjs/core/Maths/math'
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera'
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader'
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins/cannonJSPlugin'
// import { PointerEventTypes } from '@babylonjs/core/Events'
import { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor'
import { Mesh, MeshBuilder } from '@babylonjs/core/Meshes'
import { StandardMaterial } from '@babylonjs/core/Materials'

// Required side effects to populate the SceneLoader class.
import '@babylonjs/loaders/glTF'

// Inspector
import '@babylonjs/inspector'

//Custom classes
import Screen from './Screen'
import LoadingScreen from './LoadingScreen'
import Skybox from './Skybox'
import GizmoController from './GizmoController'
import EventsController from './EventsController'
import SubtitleController from './SubtitleController'

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
                volume: 1.0,
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

        // Associate a Babylon Engine to it.
        const engine = new Engine(canvas, false, null, true)
        engine.setHardwareScalingLevel(window.innerWidth / 480)
        engine.displayLoadingUI()

        // Create a scene.
        let scene = new Scene(engine)

        SceneLoader.Load('models/', 'scene.glb', engine, (gltf) => {
            scene = gltf

            const setCamera = () => {
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
                this.camera = new UniversalCamera('camera1', cameraPos, scene)
                this.camera.minZ = config.camera.near
                this.camera.fov = d2r(config.camera.fov)
                this.camera.setTarget(cameraTarget)
                this.camera.attachControl(canvas, true)
                this.camera.speed = config.camera.speed
                this.camera.inertia = config.camera.inertia
            }

            const setPhone = () => {
                const phone = scene.meshes.find((mesh) => mesh.name === 'phone')
                const phoneChild = scene.meshes.find(
                    (mesh) => mesh.name === 'phone.child'
                )
                phoneChild.setEnabled(false)
                phone.scaling = new Vector3(0.5, 0.5, 0.5)
                phone.outlineWidth = 0.003
                phone.setParent(null)
            }

            const setArm = () => {
                const arm = scene.rootNodes[0]._children.find((child) => {
                    if (child.name === 'main_enfant.004') return child
                })
                arm.position.x = 0.413
                arm.position.y = 0.2 //when raised: 0,309
                arm.position.z = -1.23
                arm.scaling = new Vector3(0.5, 0.5, 0.5)
            }

            const positionArm = () => {
                const arm = scene.rootNodes[0]._children.find((child) => {
                    if (child.name === 'main_enfant.004') return child
                })
                arm.rotation = new Vector3(
                    this.camera.rotation.x,
                    -this.camera.rotation.y,
                    this.camera.rotation.z
                )
            }

            const enablePhysics = () => {
                const gravityVector = new Vector3(0, -4.81, 0)
                const physicsPlugin = new CannonJSPlugin(false, 10, CANNON)
                scene.enablePhysics(gravityVector, physicsPlugin)
                scene.getPhysicsEngine().setTimeStep(1 / 60)

                const crt = Mesh.CreateBox('transparentCRT', 1, scene)
                crt.isPickable = false
                crt.position = new Vector3(-0.557, 0.433, -0.304)
                crt.scaling = new Vector3(0.5, 0.428, 0.407)
                crt.physicsImpostor = new PhysicsImpostor(
                    crt,
                    PhysicsImpostor.BoxImpostor,
                    { mass: 0, restitution: 0.1 },
                    scene
                )

                const ps1Controller = scene.meshes.find(
                    (mesh) => mesh.name === 'playstation-analog-controller'
                )
                ps1Controller.setParent(null)
                ps1Controller.physicsImpostor = new PhysicsImpostor(
                    ps1Controller,
                    PhysicsImpostor.BoxImpostor,
                    { mass: 5, restitution: 0.1 },
                    scene
                )

                const drawer = scene.meshes.find(
                    (mesh) => mesh.name === 'drawer_primitive1'
                )
                drawer.setParent(null)
                drawer.physicsImpostor = new PhysicsImpostor(
                    drawer,
                    PhysicsImpostor.BoxImpostor,
                    { mass: 0, restitution: 0.2 },
                    scene
                )

                const leftSpeaker = scene.meshes.find(
                    (mesh) => mesh.name === 'speaker left'
                )
                leftSpeaker.setParent(null)
                leftSpeaker.physicsImpostor = new PhysicsImpostor(
                    leftSpeaker,
                    PhysicsImpostor.BoxImpostor,
                    { mass: 10, restitution: 0.2 },
                    scene
                )

                const deskTop = scene.meshes.find(
                    (mesh) => mesh.name === 'Desk Top'
                )
                deskTop.setParent(null)
                deskTop.physicsImpostor = new PhysicsImpostor(
                    deskTop,
                    PhysicsImpostor.BoxImpostor,
                    { mass: 0, restitution: 0 },
                    scene
                )

                const ground = Mesh.CreateGround(
                    'transparentGround',
                    100,
                    100,
                    100,
                    scene
                )
                ground.position.y = -0.392 //-0.392
                ground.physicsImpostor = new PhysicsImpostor(
                    ground,
                    PhysicsImpostor.BoxImpostor,
                    { mass: 0, restitution: 0.2 },
                    scene
                )

                const transMat = new StandardMaterial('transparent', scene)
                transMat.alpha = 0
                ground.material = transMat
                crt.material = transMat

                const phone = scene.meshes.find((mesh) => mesh.name === 'phone')
                phone.position = new Vector3(-0.554, 0.211, -0.569)
                phone.rotation = new Vector3(d2r(90), d2r(11), d2r(124))

                const keyboard = scene.meshes.find(
                    (mesh) => mesh.name === 'Keyboard.001'
                )
                keyboard.setParent(null)
                keyboard.physicsImpostor = new PhysicsImpostor(
                    keyboard,
                    PhysicsImpostor.BoxImpostor,
                    { mass: 10, restitution: 0.2 },
                    scene
                )

                const mouse = scene.meshes.find((mesh) => mesh.name === 'MOUSE')
                mouse.setParent(null)
                mouse.physicsImpostor = new PhysicsImpostor(
                    mouse,
                    PhysicsImpostor.BoxImpostor,
                    { mass: 10, restitution: 0.2 },
                    scene
                )
            }

            const init = () => {
                setPhone()
                setCamera()
                setArm()

                new Skybox(scene, 2)
                new Screen(
                    scene,
                    document.getElementById('life-river'),
                    'riverScreen'
                )
                new Screen(
                    scene,
                    document.getElementById('horslesmurs'),
                    'horsLesMursScreen'
                )
                new Screen(scene, document.getElementById('toca'), 'tocaScreen')
                new Screen(
                    scene,
                    document.getElementById('pensa'),
                    'pensaScreen'
                )
                showScreen(scene, 'random')

                new EventsController(
                    canvas,
                    scene,
                    engine,
                    this.audio,
                    this.subtitles,
                    Howler
                )

                //for edges and outlines
                scene.meshes.forEach((mesh) => {
                    mesh.edgesWidth = 0.9
                    mesh.edgesColor = new Color4(
                        249 / 255,
                        213 / 255,
                        134 / 255,
                        1
                    )
                    mesh.outlineColor = new Color3(
                        249 / 255,
                        213 / 255,
                        134 / 255
                    )
                })

                //ambient sound
                this.audio.birds.play()
                // scene.forceShowBoundingBoxes = true
                enablePhysics()
            }

            init()

            if (config.debug) {
                scene.debugLayer.show()
                // new GizmoController(
                //     scene,
                //     scene.meshes.find((mesh) => mesh.name === 'phone')
                // )
            }

            scene.beforeRender = () => {
                positionArm()
                limitCamera(this.camera, { lower: -0.21, upper: 0.62 }, 'x')
                limitCamera(this.camera, { lower: -0.55, upper: 0.62 }, 'y')
            }

            window.addEventListener('resize', (e) => {
                engine.resize()
            })

            // Render every frame
            engine.runRenderLoop(() => {
                scene.render()
            })
        })
    }
}

export default BabylonScene
