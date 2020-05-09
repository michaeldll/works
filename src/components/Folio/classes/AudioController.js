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
     * @param {string} voice
     */
    speak(voice) {
        const otherVoices = Object.keys(this.audio.voices).filter(
            (voiceName) => voiceName.indexOf(voice) === -1
        )

        otherVoices.forEach((voice) => {
            if (this.audio.voices[voice].playing()) {
                this.shutUp()
            }
        })

        if (!this.findAudio(voice).playing()) {
            this.play(voice)
            this.subtitles[voice].show()
        } else if (this.findAudio(voice).playing()) {
            this.stop(voice)
            this.subtitles[voice].hide()
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
