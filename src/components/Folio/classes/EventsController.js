import config from '../utils/config'
import getActiveScreen from '../utils/getActiveScreen'
import showScreen from '../utils/showScreen'
import birds from '../../../assets/audio/birds_v2.mp3'

class EventsController {
    constructor(canvas, scene, engine) {
        this.canvas = canvas
        this.scene = scene
        this.engine = engine
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

        const setSound = () => {
            this.audio = new Audio(birds)
            this.audio.loop = true
            this.audio.volume = 0.1
        }

        const onCanvasClick = () => {
            document.addEventListener('click', (e) => {
                this.audio.play()

                const pickedMesh = this.scene.pick(
                    this.canvas.clientWidth / 2,
                    this.canvas.clientHeight / 2
                ).pickedMesh

                if (pickedMesh) {
                    if (pickedMesh.name === 'Keyboard.001') {
                        showScreen(this.scene, 'next')
                    } else if (
                        pickedMesh.name === 'MOUSE' &&
                        !this.hasClickedMouse
                    ) {
                        switch (getActiveScreen(this.scene)[1]) {
                            case 0:
                                window.open('https://river.michaels.works/')
                                break
                            case 1:
                                // window.open(
                                //     'https://river.michaels.works/'
                                // )
                                console.log('hey')
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
        setSound()
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
