import React, { useEffect } from 'react'
import BabylonScene from './classes/BabylonScene'
import layout from '../../assets/overlay.png'
import birds from '../../assets/birds_v2.mp3'

function HomePage() {
    useEffect(() => {
        new BabylonScene()
        const audio = new Audio(birds)
        window.addEventListener('click', (e) => {
            audio.play()
        })
    }, [])

    return (
        <div
            id="canvas-container"
            className="h-100 d-flex justify-content-center align-items-center"
        >
            <img className="overlay" src={layout} alt="layout" />
        </div>
    )
}

export default HomePage
