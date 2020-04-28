import React, { useEffect } from 'react'
import BabylonScene from './classes/BabylonScene'
import layout from '../../assets/img/overlay.png'
import crosshair from '../../assets/img/crosshair.png'
import life from '../../assets/video/life.mp4'
import horslesmurs from '../../assets/video/horslesmurs.mp4'
import pensa from '../../assets/video/pensa.mp4'
import toca from '../../assets/video/toca.mp4'
import './scss/Folio.scss'

function HomePage() {
    useEffect(() => {
        new BabylonScene()
    }, [])

    return (
        <div
            id="canvas-container"
            className="h-100 d-flex justify-content-center align-items-center"
        >
            <img className="crosshair" src={crosshair} alt="crosshair" />
            <img className="overlay" src={layout} alt="layout" />
            <video
                autoPlay={true}
                loop={true}
                id="life-river"
                src={life}
                type="video/mp4"
            />
            <video
                autoPlay={true}
                loop={true}
                id="horslesmurs"
                src={horslesmurs}
                type="video/mp4"
            />
            <video
                autoPlay={true}
                loop={true}
                id="pensa"
                src={pensa}
                type="video/mp4"
            />
            <video
                autoPlay={true}
                loop={true}
                id="toca"
                src={toca}
                type="video/mp4"
            />
        </div>
    )
}

export default HomePage
