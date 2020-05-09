/* eslint-disable array-callback-return */
import { Howler } from 'howler'

//Greensock for ""animation"""
import gsap from 'gsap'

import { Vector3 } from '@babylonjs/core/Maths/math'

import OrientationController from '../classes/OrientationController'
import AudioController from '../classes/AudioController'

import config from '../utils/config'
import getActiveScreen from '../utils/getActiveScreen'
import showScreen from '../utils/showScreen'
import findMesh from '../utils/findMesh'
import pointIsInside from '../utils/pointIsInside'

class EventsController {
    constructor(
        canvas,
        scene,
        engine,
        audio,
        subtitles,
        ProgressionController,
        PhysicsController
    ) {
        this.canvas = canvas
        this.scene = scene
        this.engine = engine
        this.audio = audio
        this.ProgressionController = ProgressionController
        this.volume = 1
        this.throwingMode = false
        this.manageResetPhoneInterval = null
        this.PhysicsController = PhysicsController
        this.OrientationController = new OrientationController()
        this.AudioController = new AudioController(audio, subtitles)
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
        const onClick = (e) => {
            const pickedMesh = this.scene.pick(
                this.canvas.clientWidth / 2,
                this.canvas.clientHeight / 2
            ).pickedMesh

            let interactCondition
            let throwCondition

            if (window.innerWidth < 450) {
                interactCondition = !this.throwingMode && pickedMesh
                throwCondition = this.throwingMode
            } else {
                interactCondition =
                    isPointerLocked() && !this.throwingMode && pickedMesh
                throwCondition = isPointerLocked() && this.throwingMode
            }

            if (interactCondition) {
                switch (pickedMesh.name) {
                    case 'phone':
                        const phone = findMesh('phone', this.scene)
                        const phoneInHand = findMesh('phone.child', this.scene)
                        if (phone.isEnabled) {
                            phoneInHand.setEnabled(true)
                            phone.setEnabled(false)
                            this.throwingMode = true
                            document
                                .querySelector('.crosshair')
                                .classList.add('throwing')
                        }
                        break
                    case 'speaker left':
                        Math.floor(Math.random() * 10) * 0.1 > 0.5
                            ? this.audio.sfx.click_out.play()
                            : this.audio.sfx.click_in.play()

                        sessionStorage.getItem('volume') === '1'
                            ? (this.volume = 0)
                            : (this.volume = 1)
                        sessionStorage.setItem('volume', '' + this.volume)
                        Howler.volume(
                            parseInt(sessionStorage.getItem('volume'))
                        )

                        this.PhysicsController.touch(
                            findMesh('speaker left', this.scene)
                        )
                        break

                    case 'Keyboard.001':
                        this.audio.sfx.kb.play()
                        this.PhysicsController.touch(
                            findMesh('Keyboard.001', this.scene),
                            new Vector3(3.5, 2, -1)
                        )
                        showScreen(this.scene, 'next')
                        break
                    case 'MOUSE':
                        if (!this.hasClickedMouse) {
                            this.audio.sfx.mouse.play()
                            this.PhysicsController.touch(
                                findMesh('MOUSE', this.scene),
                                new Vector3(3.5, 2, -0.8)
                            )
                            this.hasClickedMouse = true
                            setTimeout(() => {
                                const onMouseClick = (string, url) => {
                                    if (!sessionStorage.getItem(string)) {
                                        sessionStorage.setItem(string, '1')
                                        this.ProgressionController.advance()
                                    }

                                    window.open(url)
                                }
                                switch (getActiveScreen(this.scene)[1]) {
                                    case 0:
                                        onMouseClick(
                                            'project-river',
                                            'https://river.michaels.works/'
                                        )
                                        break
                                    case 1:
                                        onMouseClick(
                                            'project-horslesmurs',
                                            window.location.origin +
                                                '/horslesmurs'
                                        )
                                        break
                                    case 2:
                                        onMouseClick(
                                            'project-toca',
                                            'https://toca.michaels.works/'
                                        )
                                        break
                                    case 3:
                                        onMouseClick(
                                            'project-pensa',
                                            'https://pensa.michaels.works/'
                                        )
                                        break
                                    default:
                                        break
                                }
                            }, 200)
                        }
                        break
                    case 'horsLesMursScreen':
                        this.AudioController.speak('horslesmurs')
                        break
                    case 'postit':
                        this.AudioController.speak('portfolio')
                        break
                    case 'riverScreen':
                        this.AudioController.speak('river')
                        break
                    case 'tocaScreen':
                        this.AudioController.speak('toca')
                        break
                    case 'pensaScreen':
                        this.AudioController.speak('pensa')
                        break
                    default:
                        break
                }
                //interpolate screens outline width
                if (pickedMesh.name.indexOf('Screen') > -1) {
                    this.scene.meshes
                        .filter((mesh) => mesh.name.indexOf('Screen') > -1)
                        .forEach((screen) => {
                            gsap.to(screen, {
                                outlineWidth: 0.02,
                                duration: 0.1,
                            })
                            gsap.to(screen, {
                                outlineWidth: 0.034,
                                duration: 0.1,
                                delay: 0.1,
                            })
                        })
                }
            } else if (throwCondition) {
                this.PhysicsController.throwPhone()
                this.manageResetPhoneInterval = setInterval(() => {
                    this.manageResetPhone()
                }, 2800)
                this.manageResetPhone()
                this.throwingMode = false
                document
                    .querySelector('.crosshair')
                    .classList.remove('throwing')
            }
        }
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
        document.addEventListener('click', onClick)
        window.addEventListener('resize', (e) => {
            this.engine.resize()
        })
        window.onorientationchange = () => {
            if (window.orientation !== 0) this.OrientationController.show()
            else this.OrientationController.hide()
        }
        document.querySelectorAll('.subtitle').forEach((subtitle) => {
            subtitle.addEventListener('click', (e) => {
                this.AudioController.shutUp()
            })
        })
    }
    onCameraRotation() {
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
                config.activeOutlineMeshes.includes(pickedMesh.name)
            ) {
                pickedMesh.renderOutline = true
            }

            if (
                arm.position.y === 0.22 &&
                config.activeGrabMeshes.includes(pickedMesh.name)
            ) {
                gsap.to(arm.position, { y: 0.309, duration: 0.5 })
            } else if (!config.activeGrabMeshes.includes(pickedMesh.name)) {
                if (!this.throwingMode)
                    gsap.to(arm.position, { y: 0.22, duration: 0.2 })
            }

            if (pickedMesh.name !== 'MOUSE' && this.hasClickedMouse) {
                this.hasClickedMouse = false
            }
        }
    }
    manageResetPhone() {
        const phone = findMesh('phone', this.scene)

        if (
            !this.scene.activeCamera.isActiveMesh(phone) &&
            !this.throwingMode &&
            !pointIsInside(
                findMesh('phoneBoundingBox', this.scene),
                phone.getAbsolutePivotPoint()
            )
        ) {
            clearInterval(this.manageResetPhoneInterval)
            this.PhysicsController.resetPhone()
        }
    }
}
export default EventsController
