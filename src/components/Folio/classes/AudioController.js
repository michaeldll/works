class AudioController {
    constructor(audio, subtitles) {
        this.audio = audio
        this.subtitles = subtitles
    }
    /**
     * @param {string} name
     */
    findAudio(name) {
        return Object.values(this.audio).find((audio) => audio[name])[name]
    }
    /**
     * @param {string} name
     */
    play(name) {
        this.findAudio(name).play()
    }
    /**
     * @param {string} name
     */
    stop(name) {
        this.findAudio(name).stop()
    }
    /**
     * @param {string} name
     */
    speak(name) {
        if (!this.findAudio(name).playing()) {
            this.play(name)
            this.subtitles[name].show()
        } else if (this.findAudio(name).playing()) {
            this.stop(name)
            this.subtitles[name].hide()
        }
    }
    shutUp() {
        Object.values(this.audio.voices).forEach((voice) => {
            voice.stop()
        })
        Object.values(this.subtitles).forEach((subtitle) => {
            subtitle.hide()
        })
    }
}

export default AudioController
