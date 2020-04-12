import React, { useEffect } from 'react'
import BabylonScene from './classes/BabylonScene'
import layout from '../../assets/overlay.png'
import birds from '../../assets/birds_v2.mp3'
import life from '../../assets/video/life.mp4'

function HomePage() {
    useEffect(() => {
        new BabylonScene()
        const audio = new Audio(birds)
        // window.addEventListener('click', (e) => {
        //     audio.play()
        // })
    }, [])

    return (
        <div
            id="canvas-container"
            className="h-100 d-flex justify-content-center align-items-center"
        >
            <img className="overlay" src={layout} alt="layout" />
            <video
                autoPlay={true}
                loop={true}
                id="life-river"
                src={life}
                type="video/mp4"
            />
        </div>
    )
}

export default HomePage
