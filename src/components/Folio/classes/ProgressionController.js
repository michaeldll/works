class ProgressionController {
    constructor() {
        if (!localStorage.getItem('progression'))
            localStorage.setItem('progression', '0')
        this.step = parseInt(localStorage.getItem('progression'))
        this.showText()
    }

    advance() {
        this.step += 1
        localStorage.setItem('progression', '' + this.step)
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
