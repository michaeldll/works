import throttle from '../utils/throttle'

export default class EventController {
    constructor(engine, scene) {
        this.engine = engine
        this.scene = scene
    }

    onMouseMove = (e) => {
        const pick = this.scene.pick(this.scene.pointerX, this.scene.pointerY)
        console.log(pick.pickedMesh)
        if (pick.pickedMesh) {
            document.querySelector('body').classList.add('')
        }
    }

    onClick = (e) => {
        const info = this.scene.pick(this.scene.pointerX, this.scene.pointerY)
    }

    onResize = (e) => {
        this.engine.resize()
    }

    addListeners = () => {
        window.addEventListener('mousemove', throttle(this.onMouseMove, 100))
        window.addEventListener('click', this.onClick)
        window.addEventListener('resize', this.onResize)
    }
}
