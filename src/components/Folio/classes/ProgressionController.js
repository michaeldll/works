class ProgressionController {
    constructor(scene) {
        this.scene = scene
        if (!sessionStorage.getItem('progression'))
            sessionStorage.setItem('progression', '0')
        this.step = parseInt(sessionStorage.getItem('progression'))
        this.showText()
    }

    advance() {
        this.step += 1
        sessionStorage.setItem('progression', '' + this.step)
        this.showText()
    }

    showText() {
        document.querySelectorAll('.discover img').forEach((img, i) => {
            if (i === this.step) img.classList.remove('hide')
            else img.classList.add('hide')
        })

        if (this.step >= 4) {
            setTimeout(() => {
                document
                    .querySelector('.discover img:not(.hide)')
                    .classList.add('fadeout')
            }, 3000)
        }
    }
}

export default ProgressionController
