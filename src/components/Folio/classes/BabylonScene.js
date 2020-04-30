//Cannon for physics
// import * as CANNON from 'cannon'

//Howler for sound
import { Howl, Howler } from 'howler'

//Babylon for 3D
import { Engine } from '@babylonjs/core/Engines/engine'
import { Scene } from '@babylonjs/core/scene'

import { Vector3, Color4 } from '@babylonjs/core/Maths/math'
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera'
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader'
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins/cannonJSPlugin'
// import { PointerEventTypes } from '@babylonjs/core/Events'

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
import pensa from '../../../assets/audio/pensa2.mp3'
import toca from '../../../assets/audio/toca.mp3'
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
                volume: 1.0,
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
                volume: 1.0,
            }),
        }
        this.subtitles = {
            pensa: new SubtitleController('pensa-sub', 30600, [
                0,
                10500,
                17500,
                26300,
            ]),
            toca: new SubtitleController('toca-sub', 24000, [0, 13300, 17500]),
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
            postit: new SubtitleController('postit-sub', 5000, [0]),
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
        const engine = new Engine(canvas)
        engine.setHardwareScalingLevel(3)
        engine.displayLoadingUI()

        // Create a scene.
        let scene = new Scene(engine)

        SceneLoader.Load('models/', 'scene_new.glb', engine, (gltf) => {
            scene = gltf

            // const enablePhysics = () => {
            //     const gravityVector = new Vector3(0, -9.81, 0)
            //     const physicsPlugin = new CannonJSPlugin(false, 10, CANNON)
            //     scene.enablePhysics(gravityVector, physicsPlugin)
            //     scene.getPhysicsEngine().setTimeStep(1 / 30)
            //     // scene.forceShowBoundingBoxes = true
            // }

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
                const phone = scene.rootNodes[0]._children.find((child) => {
                    if (child.name === 'phone') return child
                })

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

                phone.scaling = new Vector3(
                    config.phone.scale.x,
                    config.phone.scale.y,
                    config.phone.scale.z
                )
            }

            const hideMeshes = () => {
                const phone = scene.rootNodes[0]._children.find((child) => {
                    if (child.name === 'phone') return child
                })
                const arm = scene.rootNodes[0]._children.find((child) => {
                    if (child.name === 'main_enfant.001') return child
                })
                phone.setEnabled(false)
                arm.setEnabled(false)
            }

            const init = () => {
                // enablePhysics()
                setCamera()
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
                setPhone()
                hideMeshes()
                new EventsController(
                    canvas,
                    scene,
                    engine,
                    this.audio,
                    this.subtitles,
                    Howler
                )

                //for edgeRenderer
                scene.meshes.forEach((mesh) => {
                    mesh.edgesWidth = 0.9
                    mesh.edgesColor = new Color4(
                        249 / 255,
                        213 / 255,
                        134 / 255,
                        1
                    )
                })

                //ambient sound
                this.audio.birds.play()
            }

            init()

            if (config.debug) {
                scene.debugLayer.show()
                // new GizmoController(scene);
            }

            //TODO
            // const mesh = scene.meshes[0];
            // mesh.scaling = new Vector3(20, 20, 20);
            // mesh.position.y = 30;
            // //mesh.rotation.x = Math.PI * 10/180;
            // //mesh.rotation.z = Math.PI * 10/180;s
            // mesh.physicsImpostor = new PhysicsImpostor(
            // 	mesh,
            // 	PhysicsImpostor.BoxImpostor,
            // 	{ mass: 1, friction: 0.0, restitution: 0.5 },
            // 	scene
            // );

            scene.beforeRender = () => {
                limitCamera(this.camera, { lower: -0.21, upper: 0.62 }, 'x')
                limitCamera(this.camera, { lower: -0.55, upper: 0.62 }, 'y')
            }

            // Render every frame
            engine.runRenderLoop(() => {
                scene.render()
            })
        })
    }
}

export default BabylonScene

// var createScene = function (engine) {
// 	var scene = new Scene(engine);
// 	var mesh;

// 	var loader = SceneLoader.Load(
// 		'https://rawcdn.githack.com/cx20/gltf-test/1f6515ce/sampleModels/Duck/glTF/',
// 		'Duck.gltf',
// 		engine,
// 		function (newScene) {
// 			var gl = engine._gl;

// 			scene = newScene;
// 			scene.enablePhysics(new Vector3(0, -9.8, 0), new CannonJSPlugin());
// 			scene.getPhysicsEngine().setTimeStep(1 / 30);

// 			scene.forceShowBoundingBoxes = true;

// 			var material = new StandardMaterial('material', scene);
// 			material.emissiveColor = new Color3(0.5, 0.5, 0.5);
// 			var ground = new Mesh.CreateBox('ground', 200.0, scene);
// 			ground.position.y = -20;
// 			ground.scaling.y = 0.01;
// 			ground.material = material;
// 			ground.physicsImpostor = new PhysicsImpostor(
// 				ground,
// 				PhysicsImpostor.BoxImpostor,
// 				{ mass: 0, friction: 0.1, restitution: 0.1 },
// 				scene
// 			);

// 			mesh = scene.meshes[0];
// 			mesh.scaling = new Vector3(20, 20, 20);
// 			mesh.position.y = 30;
// 			//mesh.rotation.x = Math.PI * 10/180;
// 			//mesh.rotation.z = Math.PI * 10/180;
// 			mesh.physicsImpostor = new PhysicsImpostor(
// 				mesh,
// 				PhysicsImpostor.BoxImpostor,
// 				{ mass: 1, friction: 0.0, restitution: 0.5 },
// 				scene
// 			);

// 			var camera = new ArcRotateCamera('Camera', 0, 0, 10, new Vector3(0, 0, 0), scene);
// 			camera.setPosition(new Vector3(0, 20, -100));
// 			camera.attachControl(canvas, true);

// 			var light1 = new DirectionalLight('dir01', new Vector3(0, 0, 1), scene);
// 			light1.groundColor = new Color3(1, 0, 0);
// 			light1.position = new Vector3(20, 40, 20);

// 			engine.runRenderLoop(function () {
// 				scene.render();

// 				// TODO: I do not know how to set correctly in js
// 				gl.disable(gl.CULL_FACE);

// 				scene.activeCamera.alpha += 0.005;
// 			});

// 			//When click event is raised
// 			window.addEventListener('click', function () {
// 				var pickResult = scene.pick(scene.pointerX, scene.pointerY);
// 				mesh.physicsImpostor.setLinearVelocity(new Vector3(0, 10, 0));
// 			});
// 		}
// 	);

// 	return scene;
// };

// var canvas = document.querySelector('#c');
// var engine = new Engine(canvas, true);
// var scene = createScene(engine);
