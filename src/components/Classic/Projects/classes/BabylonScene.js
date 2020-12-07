//Howler for sound
// import { Howl, Howler } from 'howler'

//GSAP for interpolation
// import gsap from 'gsap'

//Babylon for 3D
import { Engine } from '@babylonjs/core/Engines/engine'
import { Scene } from '@babylonjs/core/scene'
// import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight'
import { Vector3, Color4, Color3 } from '@babylonjs/core/Maths/math'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera'
import { Mesh } from '@babylonjs/core/Meshes'
import { StandardMaterial, ShaderMaterial } from '@babylonjs/core/Materials'
import { Texture } from '@babylonjs/core'

// Inspector
import '@babylonjs/inspector'

// Custom classes
import GizmoController from './GizmoManager'
import CameraController from './CameraController'
import EventController from './EventController'

// Utilities
import d2r from '../utils/d2r.js'
import config from '../utils/config'
import findMesh from '../utils/findMesh'

export default class BabylonScene {
    constructor() {
        this.time = 0
    }

    init() {
        this.canvas = document.getElementById('babylon-canvas-projects')

        this.engine = new Engine(this.canvas, true, { alpha: true })

        this.scene = new Scene(this.engine)
        this.scene.clearColor = new Color4(0, 0, 0, 0)

        // Camera
        const camera = new ArcRotateCamera(
            'Camera',
            0,
            0,
            10,
            new Vector3(0, 0, 0),
            this.scene
        )
        camera.setPosition(new Vector3(0, 0, -10))
        camera.attachControl(this.canvas, true)
        camera.alpha = Math.PI
        camera.radius = 20

        //Light
        // new HemisphericLight('light', new Vector3(0, 1, 0), this.scene)

        //Textures
        const fleuveTexture = new Texture(
            './textures/la-vie-dun-fleuve.png',
            this.scene
        )
        fleuveTexture.wrapU = Texture.CLAMP_ADDRESSMODE
        fleuveTexture.wrapV = Texture.CLAMP_ADDRESSMODE

        //Materials
        const redMat = new StandardMaterial('red', this.scene)
        redMat.diffuseColor = new Color3(1, 0, 0)
        redMat.emissiveColor = new Color3(1, 0, 0)
        redMat.specularColor = new Color3(1, 0, 0)

        const shaderMat = new ShaderMaterial(
            'projects',
            this.scene,
            './shaders/projects',
            {
                attributes: ['position', 'normal', 'uv'],
                uniforms: [
                    'world',
                    'worldView',
                    'worldViewProjection',
                    'view',
                    'projection',
                    'time',
                    'direction',
                ],
            }
        )
        shaderMat.setTexture('textureSampler', fleuveTexture)
        shaderMat.setFloat('time', this.time)

        // Shapes
        const plane1 = new Mesh.CreateGround(
            'plane1',
            1.8,
            5.4,
            5,
            this.scene,
            true
        )
        plane1.scaling = new Vector3(2, 2, 2)
        plane1.rotation.x = d2r(270)
        plane1.rotation.y = Math.PI / 2
        plane1.material = shaderMat

        const cameraController = new CameraController(camera)
        cameraController.addListeners()

        const eventController = new EventController(this.engine, this.scene)
        eventController.addListeners()

        if (config.debug) {
            this.scene.debugLayer.show()
            new GizmoController(
                this.scene,
                findMesh('plane1', this.scene)
            ).init()
        }

        this.engine.runRenderLoop(() => {
            this.time += 0.01
            shaderMat.setFloat('time', this.time)
            this.scene.render()
            cameraController.update()
        })

        window.addEventListener('resize', () => {
            this.engine.resize()
        })
    }
}
