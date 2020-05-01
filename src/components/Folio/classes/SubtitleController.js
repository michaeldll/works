class SubtitleController {
    constructor(id, duration, timeouts) {
        this.id = id
        this.duration = duration
        this.timeouts = timeouts
        this.paragraphs = document.querySelectorAll(`#${this.id} p`)
    }

    init() {
        this.show()
        this.revealParagraphs()
        setTimeout(() => {
            this.hide()
        }, this.duration)
    }

    revealParagraphs() {
        this.timeouts.forEach((timeout, i) => {
            setTimeout(() => {
                this.paragraphs[i - 1] &&
                    this.paragraphs[i - 1].classList.remove('show')
                this.paragraphs[i] && this.paragraphs[i].classList.add('show')
            }, timeout)
        })
    }

    show() {
        document.getElementById(this.id).classList.add('show')
    }

    hide() {
        document.getElementById(this.id).classList.remove('show')
        this.paragraphs.forEach((p) => p.classList.remove('show'))
    }
}
export default SubtitleController
