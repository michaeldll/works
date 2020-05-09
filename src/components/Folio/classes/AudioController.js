class AudioController {
    constructor(audio) {
        this.audio = audio
        console.log(this.audio)
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
        this.audio[name].stop()
    }
    /**
     * @param {string} name
     */
    speak(name) {
        if (!this.findAudio(name).playing()) this.play(name)
    }
}

export default AudioController
