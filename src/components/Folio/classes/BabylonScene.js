import * as CANNON from 'cannon'

import { Engine } from '@babylonjs/core/Engines/engine'
import { Scene } from '@babylonjs/core/scene'
import { Mesh, MeshBuilder } from '@babylonjs/core/Meshes'
import { Color3, Color4, Vector3 } from '@babylonjs/core/Maths/math'
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera'
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight'
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader'
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins/cannonJSPlugin'
import { StandardMaterial } from '@babylonjs/core/Materials'
import { VideoTexture } from '@babylonjs/core/Materials/Textures'
import { PointerEventTypes } from '@babylonjs/core/Events'

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import '@babylonjs/core/Meshes/meshBuilder'

// Required side effects to populate the SceneLoader class.
import '@babylonjs/loaders/glTF'
import '@babylonjs/core/Loading/loadingScreen'

// Inspector
import '@babylonjs/inspector'

//utils
import d2r from '../utils/d2r.js'
import config from '../utils/config'

class BabylonScene {
    constructor() {
        this.camera = null
        this.init()
    }

    init() {
        document
            .querySelector('#canvas-container')
            .insertAdjacentHTML(
                'afterbegin',
                '<canvas id="babylon-canvas"></canvas>'
            )

        // Get the canvas element from the DOM.
        const canvas = document.getElementById('babylon-canvas')

        // Associate a Babylon Engine to it.
        const engine = new Engine(canvas)
        engine.setHardwareScalingLevel(2)

        // Create a scene.
        let scene = new Scene(engine)

        SceneLoader.Load('models/', 'scene.glb', engine, (gltf) => {
            scene = gltf

            // console.log(
            // 	scene.meshes.forEach((mesh) => {
            // 		if (mesh && mesh.name) console.log(mesh.name);
            // 	})
            // );

            const enablePhysics = () => {
                const gravityVector = new Vector3(0, -9.81, 0)
                const physicsPlugin = new CannonJSPlugin(false, 10, CANNON)
                scene.enablePhysics(gravityVector, physicsPlugin)
                scene.getPhysicsEngine().setTimeStep(1 / 30)
                // scene.forceShowBoundingBoxes = true
            }

            const setCamera = () => {
                // This creates and positions a camera (non-mesh)
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
            }

            const setLights = () => {
                // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
                const light = new HemisphericLight(
                    'light1',
                    new Vector3(0, 1, 0),
                    scene
                )
                light.intensity = 0.7
            }

            const limitCamera = (camera, radians, angle) => {
                switch (angle) {
                    case 'x':
                        if (camera.rotation.x <= radians.lower) {
                            camera.rotation = new Vector3(
                                radians.lower,
                                camera.rotation.y,
                                camera.rotation.z
                            )
                        } else if (camera.rotation.x >= radians.upper) {
                            camera.rotation = new Vector3(
                                radians.upper,
                                camera.rotation.y,
                                camera.rotation.z
                            )
                        }
                        break
                    case 'y':
                        if (camera.rotation.y <= radians.lower) {
                            camera.rotation = new Vector3(
                                camera.rotation.x,
                                radians.lower,
                                camera.rotation.z
                            )
                        } else if (camera.rotation.y >= radians.upper) {
                            camera.rotation = new Vector3(
                                camera.rotation.x,
                                radians.upper,
                                camera.rotation.z
                            )
                        }
                        break
                    default:
                        break
                }
            }

            const addVideo = () => {
                // var screen = MeshBuilder.CreateBox(
                //     'screen',
                //     { width: 1, height: 1, depth: 0.1 },
                //     scene
                // )
                // screen.position = Vector3.Zero()
                // var mat = new StandardMaterial('screenMat', scene)
                // mat.diffuseColor = new Color4(0, 0, 0, 1)
                // screen.material = mat
                // var vidPos = new Vector3(0, 0, 0.1).addInPlace(screen.position)
                // screenVideo.position = vidPos
                var planeOpts = {
                    height: 0.2625,
                    width: 0.336,
                    sideOrientation: Mesh.BACKSIDE,
                }
                var screenVideo = MeshBuilder.CreatePlane(
                    'screen',
                    planeOpts,
                    scene
                )

                var screenVideoMat = new StandardMaterial('m', scene)
                var screenVideoVidTex = new VideoTexture(
                    'river',
                    document.getElementById('life-river'),
                    scene,
                    false,
                    true
                )
                screenVideoMat.diffuseTexture = screenVideoVidTex
                screenVideoMat.roughness = 1
                screenVideoMat.emissiveColor = new Color3(0.3, 0.3, 0.3)
                screenVideo.material = screenVideoMat
                screenVideo.rotation = new Vector3(Math.PI, d2r(359.5), 0)
                screenVideo.position = new Vector3(
                    config.screen.position.x,
                    config.screen.position.y,
                    config.screen.position.z
                )
                screenVideoVidTex.video.play()
                // scene.onPointerObservable.add(function (evt) {
                //     console.log('picked')
                //     if (screenVideoVidTex.video.paused)
                //         screenVideoVidTex.video.play()
                //     else screenVideoVidTex.video.pause()
                //     console.log(
                //         screenVideoVidTex.video.paused ? 'paused' : 'playing'
                //     )
                // }, PointerEventTypes.POINTERPICK)
            }

            enablePhysics()
            setCamera()
            setLights()
            addVideo()

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

            //When click event is raised
            window.addEventListener('click', function () {
                // var pickResult = scene.pick(scene.pointerX, scene.pointerY);
                // mesh.physicsImpostor.setLinearVelocity(new Vector3(0, 10, 0));
            })

            if (config.debug) scene.debugLayer.show()
        })
    }
}

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

export default BabylonScene
