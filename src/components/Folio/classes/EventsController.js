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
        this.init()
    }
    init() {
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

        const onCanvasClick = () => {
            document.addEventListener('click', (e) => {
                const pickedMesh = this.scene.pick(
                    this.canvas.clientWidth / 2,
                    this.canvas.clientHeight / 2
                ).pickedMesh

                if (pickedMesh) {
                    if (pickedMesh.name === 'speaker left') {
                        console.log('1')
                        this.volume === 1
                            ? (this.volume = 0)
                            : (this.volume = 1)
                        this.howler.volume(this.volume)
                    }
                    if (pickedMesh.name === 'Keyboard.001') {
                        showScreen(this.scene, 'next')
                    } else if (pickedMesh.name === 'horsLesMursScreen') {
                        if (!this.audio.horslesmurs.playing()) {
                            this.audio.horslesmurs.play()
                            this.subtitles.horslesmurs.init()
                        }
                    } else if (pickedMesh.name === 'postit') {
                        if (!this.audio.portfolio.playing()) {
                            this.audio.portfolio.play()
                            this.subtitles.postit.init()
                        }
                    } else if (pickedMesh.name === 'riverScreen') {
                        if (!this.audio.river.playing()) {
                            this.audio.river.play()
                            this.subtitles.river.init()
                        }
                    } else if (pickedMesh.name === 'tocaScreen') {
                        if (!this.audio.toca.playing()) {
                            this.audio.toca.play()
                            this.subtitles.toca.init()
                        }
                    } else if (pickedMesh.name === 'pensaScreen') {
                        if (!this.audio.pensa.playing()) {
                            this.audio.pensa.play()
                            this.subtitles.pensa.init()
                        }
                    } else if (
                        pickedMesh.name === 'MOUSE' &&
                        !this.hasClickedMouse
                    ) {
                        switch (getActiveScreen(this.scene)[1]) {
                            case 0:
                                window.open('https://river.michaels.works/')
                                break
                            case 1:
                                window.open()
                                break
                            case 2:
                                window.open('https://toca.michaels.works/')

                                break
                            case 3:
                                window.open('https://pensa.michaels.works/')
                                break
                            default:
                                break
                        }
                        this.hasClickedMouse = true
                    }
                }

                this.engine.hideLoadingUI()
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

                    if (
                        !pickedMesh._edgesRenderer &&
                        config.activeEdgeMeshes.includes(pickedMesh.name)
                    ) {
                        pickedMesh.enableEdgesRendering()
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
