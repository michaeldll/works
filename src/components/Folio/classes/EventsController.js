/* eslint-disable array-callback-return */
import { Howler } from 'howler'
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
        PhysicsController,
        overlayTimeline
    ) {
        this.canvas = canvas
        this.scene = scene
        this.engine = engine
        this.audio = audio
        this.volume = 1
        this.throwingMode = false
        this.tutorialMode = false
        this.manageResetPhoneInterval = null
        this.ProgressionController = ProgressionController
        this.PhysicsController = PhysicsController
        this.OrientationController = new OrientationController()
        this.AudioController = new AudioController(audio, subtitles)
        this.overlayTimeline = overlayTimeline
        this.isMobile = sessionStorage.getItem('USER_HAS_TOUCHED')
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

            const phone = findMesh('phone', this.scene)
            const phoneInHand = findMesh('phone.child', this.scene)

            let interactCondition
            let throwCondition
            let tutorialCondition

            if (sessionStorage.getItem('USER_HAS_TOUCHED')) {
                interactCondition =
                    !this.throwingMode && !this.tutorialMode && pickedMesh
                throwCondition = this.throwingMode
                tutorialCondition = this.tutorialMode
            } else {
                interactCondition =
                    isPointerLocked() &&
                    !this.throwingMode &&
                    !this.tutorialMode &&
                    pickedMesh
                throwCondition = isPointerLocked() && this.throwingMode
                tutorialCondition = isPointerLocked() && this.tutorialMode
            }

            if (interactCondition) {
                switch (pickedMesh.name) {
                    case 'phone':
                        if (phone.isEnabled) {
                            phoneInHand.setEnabled(true)
                            phone.setEnabled(false)
                            this.throwingMode = true
                            document
                                .querySelector('.crosshair')
                                .classList.add('hide')
                            document
                                .querySelector('.crosshair-throw')
                                .classList.remove('hide')
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
                                        if (!this.isMobile) {
                                            onMouseClick(
                                                'project-river',
                                                'https://river.michaels.works/'
                                            )
                                        } else {
                                            onMouseClick(
                                                'project-horslesmurs',
                                                window.location.origin +
                                                    '/horslesmurs'
                                            )
                                        }

                                        break
                                    case 1:
                                        if (!this.isMobile) {
                                            onMouseClick(
                                                'project-horslesmurs',
                                                window.location.origin +
                                                    '/horslesmurs'
                                            )
                                        } else {
                                            onMouseClick(
                                                'project-pensa',
                                                'https://pensa.michaels.works/'
                                            )
                                        }

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
                    case 'postit.001':
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
                    case 'tuto.stack top':
                        this.overlayTimeline.seek(0)
                        this.overlayTimeline.kill()
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
                //init tutorial
                if (pickedMesh.name.indexOf('tuto') > -1 && config.tutorial) {
                    this.startTutorial()
                    sessionStorage.setItem('hasGrabbedPostitStack', '1')
                }
            } else if (throwCondition) {
                this.PhysicsController.throwPhone()
                this.manageResetPhoneInterval = setInterval(() => {
                    this.manageResetPhone()
                }, 2800)
                this.manageResetPhone()
                this.throwingMode = false
                document.querySelector('.crosshair').classList.remove('hide')
                document.querySelector('.crosshair-throw').classList.add('hide')
            } else if (tutorialCondition) {
                this.stopTutorial()
            }
        }
        //handle Pointer Lock
        if (!this.isMobile) {
            this.canvas.addEventListener(
                'click',
                (e) => {
                    this.canvas.requestPointerLock =
                        this.canvas.requestPointerLock ||
                        this.canvas.mozRequestPointerLock
                    if (this.canvas.requestPointerLock) {
                        this.canvas.requestPointerLock()
                        findMesh('blackTutorialFilter', this.scene).setEnabled(
                            false
                        )
                        document
                            .querySelector('.backtomenu')
                            .classList.remove('show')
                        document
                            .querySelector('#canvas-container .logo-container')
                            .classList.remove('show')
                        document.querySelector('.discover img:not(.hide)') &&
                            document
                                .querySelector('.discover img:not(.hide)')
                                .classList.add('fadeout')
                        this.stopTutorial()
                    }
                },
                false
            )
        }

        //handle clicks
        document.addEventListener('click', onClick)
        //handle resize
        window.addEventListener('resize', (e) => {
            this.engine.resize()
        })
        //force portait mode
        window.onorientationchange = () => {
            if (window.orientation !== 0) this.OrientationController.show()
            else this.OrientationController.hide()
        }
        //shut up when subtitle clicked
        document.querySelectorAll('.subtitle').forEach((subtitle) => {
            subtitle.addEventListener('click', (e) => {
                this.AudioController.shutUp()
            })
        })
        document
            .querySelector('.backtomenu img')
            .addEventListener('click', (e) => {
                document.location.href = document.location.origin
            })
    }
    startTutorial(mode) {
        const arm = this.scene.rootNodes[0]._children.find((child) => {
            if (child.name === 'main_enfant.004') return child
        })
        this.AudioController.shutUp()
        this.tutorialMode = true
        document.querySelector('.discover img:not(.hide)') &&
            document
                .querySelector('.discover img:not(.hide)')
                .classList.add('fadeout')
        document.querySelector('.backtomenu').classList.add('show')
        document
            .querySelector('#canvas-container .logo-container')
            .classList.add('show')
        findMesh('hand.postit.menu', this.scene).setEnabled(true)
        findMesh('blackTutorialFilter', this.scene).setEnabled(true)
        this.PhysicsController.touch(
            findMesh('tuto.stack top', this.scene),
            new Vector3(3.5, 3, -0.8)
        )
        if (mode === 'facingScreen') {
            if (!this.isMobile) {
                gsap.to(arm.position, {
                    x: config.arm.tutorial.facingScreen.desktop.position.x,
                    y: config.arm.tutorial.facingScreen.desktop.position.y,
                    z: config.arm.tutorial.facingScreen.desktop.position.z,
                    duration: 0.5,
                })
            } else {
                gsap.to(arm.position, {
                    x: config.arm.tutorial.facingScreen.mobile.position.x,
                    y: config.arm.tutorial.facingScreen.mobile.position.y,
                    z: config.arm.tutorial.facingScreen.mobile.position.z,
                    duration: 0.5,
                })
            }
        } else {
            if (!this.isMobile) {
                gsap.to(arm.position, {
                    x: config.arm.tutorial.facingPostitStack.desktop.position.x,
                    y: config.arm.tutorial.facingPostitStack.desktop.position.y,
                    z: config.arm.tutorial.facingPostitStack.desktop.position.z,
                    duration: 0.5,
                })
            } else {
                gsap.to(arm.position, {
                    x: config.arm.tutorial.facingPostitStack.mobile.position.x,
                    y: config.arm.tutorial.facingPostitStack.mobile.position.y,
                    z: config.arm.tutorial.facingPostitStack.mobile.position.z,
                    duration: 0.5,
                })
            }
        }
        document.exitPointerLock =
            document.exitPointerLock || document.mozExitPointerLock

        // Attempt to unlock
        document.exitPointerLock()
    }
    stopTutorial() {
        const arm = this.scene.rootNodes[0]._children.find((child) => {
            if (child.name === 'main_enfant.004') return child
        })
        this.tutorialMode = false
        document.querySelector('.backtomenu').classList.remove('show')
        document
            .querySelector('#canvas-container .logo-container')
            .classList.remove('show')
        document.querySelector('.discover img:not(.hide)') &&
            document
                .querySelector('.discover img:not(.hide)')
                .classList.remove('fadeout')
        gsap.to(arm.position, {
            x: config.arm.initial.position.x,
            y: config.arm.initial.position.y,
            z: config.arm.initial.position.z,
            duration: 0.25,
        })
        findMesh('hand.postit.menu', this.scene).setEnabled(false)
        findMesh('blackTutorialFilter', this.scene).setEnabled(false)
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
            //toggle edges and outline
            this.scene.meshes.forEach((mesh) => {
                if (mesh.id !== pickedMesh.id && mesh._edgesRenderer) {
                    mesh.disableEdgesRendering()
                } else if (mesh.id !== pickedMesh.id && mesh.renderOutline) {
                    mesh.renderOutline = false
                }
            })

            if (
                !pickedMesh._edgesRenderer &&
                config.activeEdgeMeshes.includes(pickedMesh.name)
            ) {
                pickedMesh.enableEdgesRendering(0.95, true)
            } else if (
                !pickedMesh.renderOutline &&
                config.activeOutlineMeshes.includes(pickedMesh.name)
            ) {
                pickedMesh.renderOutline = true
            }

            //raise arm on hover
            if (
                (arm.position.y === config.arm.lowered.position.y &&
                    config.activeGrabMeshes.includes(pickedMesh.name)) ||
                (arm.position.y === config.arm.lowered.position.y &&
                    config.activeTutorialMeshes.includes(pickedMesh.name))
            ) {
                gsap.to(arm.position, {
                    y: config.arm.raised.position.y,
                    duration: 0.5,
                })
            } else if (
                !config.activeGrabMeshes.includes(pickedMesh.name) &&
                !config.activeTutorialMeshes.includes(pickedMesh.name)
            ) {
                if (!this.throwingMode && !this.tutorialMode)
                    gsap.to(arm.position, {
                        x: config.arm.initial.position.x,
                        y: config.arm.initial.position.y,
                        z: config.arm.initial.position.z,
                        duration: 0.25,
                    })
            }

            //prevents bug when clicking mouse
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
