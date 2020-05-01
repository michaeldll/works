import { Vector3 } from '@babylonjs/core/Maths/math'
import { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor'
import config from '../utils/config'
import getActiveScreen from '../utils/getActiveScreen'
import showScreen from '../utils/showScreen'
import gsap from 'gsap'
import d2r from '../utils/d2r.js'
import { Sphere } from 'cannon'

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
        this.init()
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
                if (audio !== 'birds' && this.audio[audio].playing())
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

                if (isPointerLocked() && this.throwingMode) {
                    console.log('throwing')
                    const phone = this.scene.meshes.find(
                        (mesh) => mesh.name === 'phone'
                    )
                    const phoneChild = this.scene.meshes.find(
                        (mesh) => mesh.name === 'phone.child'
                    )

                    phone.setEnabled(true)
                    phoneChild.setEnabled(false)

                    phone.position = new Vector3(-0.413, 0.335, -1.036)
                    phone.rotation = new Vector3(d2r(-3), d2r(21), d2r(180))

                    if (!phone.physicsImpostor)
                        phone.physicsImpostor = new PhysicsImpostor(
                            phone,
                            PhysicsImpostor.BoxImpostor,
                            { mass: 1, friction: 0.3, restitution: 0.4 },
                            this.scene
                        )

                    phone.physicsImpostor.applyImpulse(
                        new Vector3(0, 1, 3),
                        phone.getAbsolutePosition()
                    )

                    this.throwingMode = false
                }

                if (pickedMesh && isPointerLocked()) {
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
                            }
                            break
                        case 'speaker left':
                            this.volume === 1
                                ? (this.volume = 0)
                                : (this.volume = 1)
                            this.howler.volume(this.volume)
                            break
                        case 'Keyboard.001':
                            showScreen(this.scene, 'next')
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
                                        window.open()
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
                }
            })
        }
        const onCanvasMouseMove = () => {
            document.addEventListener('mousemove', (e) => {
                const pickedMesh = this.scene.pick(
                    this.canvas.clientWidth / 2,
                    this.canvas.clientHeight / 2
                ).pickedMesh

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
                        config.activeOutlineMeshes.includes(pickedMesh.name)
                    ) {
                        pickedMesh.renderOutline = true
                        const arm = this.scene.rootNodes[0]._children.find(
                            (child) => {
                                if (child.name === 'main_enfant.004')
                                    return child
                            }
                        )
                        gsap.to(arm.position, { y: 0.309, duration: 0.5 })
                    } else if (
                        !config.activeOutlineMeshes.includes(pickedMesh.name)
                    ) {
                        const arm = this.scene.rootNodes[0]._children.find(
                            (child) => {
                                if (child.name === 'main_enfant.004')
                                    return child
                            }
                        )
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

        // document.addEventListener('mousemove', function () {
        //     var pickResult = scene.pick(scene.pointerX, scene.pointerY)
        //     console.log(pickResult.pickedMesh.name)
        //     // mesh.physicsImpostor.setLinearVelocity(new Vector3(0, 10, 0));
        // })
    }
}
export default EventsController
