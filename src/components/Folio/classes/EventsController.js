//Greensock for animation
import gsap from 'gsap'

import { Vector3 } from '@babylonjs/core/Maths/math'

import PhysicsController from './PhysicsController'

import config from '../utils/config'
import getActiveScreen from '../utils/getActiveScreen'
import showScreen from '../utils/showScreen'

class EventsController {
    constructor(canvas, scene, engine, audio, subtitles, howler) {
        this.canvas = canvas
        this.scene = scene
        this.engine = engine
        this.audio = audio
        this.subtitles = subtitles
        this.howler = howler
        this.volume = 1
        this.throwingMode = false
        this.physics = new PhysicsController(
            this.scene,
            this.scene.activeCamera
        )
        this.init()
        setInterval(() => {
            this.managePhone()
        }, 1000)
    }
    init() {
        const isPointerLocked = () => {
            if (
                document.pointerLockElement === this.canvas ||
                document.mozPointerLockElement === this.canvas
            ) {
                return true
            } else {
                return false
            }
        }
        const setPointerLock = () => {
            this.canvas.addEventListener(
                'click',
                (e) => {
                    this.canvas.requestPointerLock =
                        this.canvas.requestPointerLock ||
                        this.canvas.mozRequestPointerLock
                    if (this.canvas.requestPointerLock) {
                        this.canvas.requestPointerLock()
                    }
                },
                false
            )
        }
        const isVoicePlaying = () => {
            let isPlaying = false

            Object.keys(this.audio).forEach((audio) => {
                // console.log(this.audio[audio])
                if (
                    audio !== 'birds' &&
                    this.audio[audio] &&
                    this.audio[audio].playing()
                )
                    isPlaying = true
            })

            return isPlaying
        }
        const onCanvasClick = () => {
            document.addEventListener('click', (e) => {
                const pickedMesh = this.scene.pick(
                    this.canvas.clientWidth / 2,
                    this.canvas.clientHeight / 2
                ).pickedMesh

                if (isPointerLocked() && !this.throwingMode && pickedMesh) {
                    switch (pickedMesh.name) {
                        case 'phone':
                            const phone = this.scene.meshes.find(
                                (mesh) => mesh.name === 'phone'
                            )
                            const phoneChild = this.scene.meshes.find(
                                (mesh) => mesh.name === 'phone.child'
                            )
                            if (phone.isEnabled) {
                                phoneChild.setEnabled(true)
                                phone.setEnabled(false)
                                this.throwingMode = true
                                document
                                    .querySelector('.crosshair')
                                    .classList.add('throwing')
                            }
                            break
                        case 'speaker left':
                            this.volume === 1
                                ? (this.volume = 0)
                                : (this.volume = 1)
                            this.howler.volume(this.volume)

                            const speaker = this.scene.meshes.find(
                                (mesh) => mesh.name === 'speaker left'
                            )
                            this.physics.touch(speaker)

                            break
                        case 'Keyboard.001':
                            showScreen(this.scene, 'next')

                            const keyboard = this.scene.meshes.find(
                                (mesh) => mesh.name === 'Keyboard.001'
                            )
                            this.physics.touch(
                                keyboard,
                                new Vector3(3.5, 2, -1)
                            )
                            break
                        case 'MOUSE':
                            if (!this.hasClickedMouse) {
                                switch (getActiveScreen(this.scene)[1]) {
                                    case 0:
                                        window.open(
                                            'https://river.michaels.works/'
                                        )
                                        break
                                    case 1:
                                        window.open(
                                            window.location.origin +
                                                '/horslesmurs'
                                        )
                                        break
                                    case 2:
                                        window.open(
                                            'https://toca.michaels.works/'
                                        )
                                        break
                                    case 3:
                                        window.open(
                                            'https://pensa.michaels.works/'
                                        )
                                        break
                                    default:
                                        break
                                }
                                const mouse = this.scene.meshes.find(
                                    (mesh) => mesh.name === 'MOUSE'
                                )
                                this.physics.touch(
                                    mouse,
                                    new Vector3(3.5, 2, -0.8)
                                )
                                this.hasClickedMouse = true
                            }
                            break
                        default:
                            break
                    }

                    if (!isVoicePlaying()) {
                        if (pickedMesh.name === 'horsLesMursScreen') {
                            this.audio.horslesmurs.play()
                            this.subtitles.horslesmurs.init()
                        } else if (pickedMesh.name === 'postit') {
                            this.audio.portfolio.play()
                            this.subtitles.postit.init()
                        } else if (pickedMesh.name === 'riverScreen') {
                            this.audio.river.play()
                            this.subtitles.river.init()
                        } else if (pickedMesh.name === 'tocaScreen') {
                            this.audio.toca.play()
                            this.subtitles.toca.init()
                        } else if (pickedMesh.name === 'pensaScreen') {
                            this.audio.pensa.play()
                            this.subtitles.pensa.init()
                        }
                    }
                } else if (isPointerLocked() && this.throwingMode) {
                    this.physics.throwPhone()
                    this.throwingMode = false
                    document
                        .querySelector('.crosshair')
                        .classList.remove('throwing')
                }
            })
        }
        const onCanvasMouseMove = () => {
            document.addEventListener('mousemove', (e) => {
                const pickedMesh = this.scene.pick(
                    this.canvas.clientWidth / 2,
                    this.canvas.clientHeight / 2
                ).pickedMesh

                const arm = this.scene.rootNodes[0]._children.find((child) => {
                    if (child.name === 'main_enfant.004') return child
                })

                if (pickedMesh) {
                    this.scene.meshes.forEach((mesh) => {
                        if (mesh.id !== pickedMesh.id && mesh._edgesRenderer) {
                            mesh.disableEdgesRendering()
                        }
                    })

                    this.scene.meshes.forEach((mesh) => {
                        if (mesh.id !== pickedMesh.id && mesh.renderOutline) {
                            mesh.renderOutline = false
                        }
                    })

                    if (
                        !pickedMesh._edgesRenderer &&
                        config.activeEdgeMeshes.includes(pickedMesh.name)
                    ) {
                        pickedMesh.enableEdgesRendering(0.95, true)
                    }

                    if (
                        !pickedMesh.renderOutline &&
                        config.activeOutlineMeshes.includes(pickedMesh.name) &&
                        arm.position.y === 0.22
                    ) {
                        pickedMesh.renderOutline = true
                        gsap.to(arm.position, { y: 0.309, duration: 0.5 })
                    } else if (
                        !config.activeOutlineMeshes.includes(pickedMesh.name)
                    ) {
                        if (!this.throwingMode)
                            gsap.to(arm.position, { y: 0.22, duration: 0.2 })
                    }

                    if (pickedMesh.name !== 'MOUSE' && this.hasClickedMouse) {
                        this.hasClickedMouse = false
                    }
                }
            })
        }

        setPointerLock()
        onCanvasMouseMove()
        onCanvasClick()
    }
    managePhone() {
        const phone = this.scene.meshes.find((mesh) => mesh.name === 'phone')

        const isOutOfBounds = (phone) => {
            return phone
                ? phone.position.y < 0.32 ||
                      phone.position.z < config.camera.position.z + 0.5 ||
                      phone.position.z > -0.33
                : false
        }

        // console.log('isOutOfBounds : ' + isOutOfBounds())

        if (
            !this.scene.activeCamera.isActiveMesh(phone) &&
            !this.throwingMode &&
            isOutOfBounds(phone)
        ) {
            this.physics.resetPhone()
        }
    }
}
export default EventsController
