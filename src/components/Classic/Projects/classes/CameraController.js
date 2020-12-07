import gsap from 'gsap'
import map from '../utils/map'

export default class CameraController {
    constructor(camera) {
        this.camera = camera
        this.cursor = { x: 0.5, y: 0.5 }
        this.sensitivity = 0.02
        this.enabled = true
    }

    mouseMove = (e) => {
        const mappedX = -(
            (e.clientX - window.innerWidth / 2) /
            (window.innerWidth / 2)
        ) //-1, 1

        const mappedY = -(
            (e.clientY - window.innerHeight / 2) /
            (window.innerHeight / 2)
        ) //-1, 1

        const normalizedX = (mappedX + 1) / 2 //0, 1
        const normalizedY = (mappedY + 1) / 2 //0, 1

        this.cursor.x = map(
            normalizedX,
            0,
            1,
            0.5 - this.sensitivity,
            0.5 + this.sensitivity
        ) //0.475, 0.525

        this.cursor.y = map(
            normalizedY,
            0,
            1,
            0.5 - this.sensitivity,
            0.5 + this.sensitivity
        ) //0.475, 0.525
    }

    update() {
        if (!this.enabled) return

        gsap.to(this.camera, {
            alpha: this.cursor.x * 2 * Math.PI,
            beta: this.cursor.y * Math.PI,
            duration: 0.5,
        })
    }

    addListeners() {
        window.addEventListener('mousemove', this.mouseMove)
    }
}
