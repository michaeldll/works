import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import logo from '../assets/logo_30_1.png'
import press from '../assets/PRESS.png'
import copyright from '../assets/COPY.png'
import start from '../assets/START.png'
import about from '../assets/ABOUT.png'
import overlay from '../assets/BG.png'

const Home = () => {
    const [isPressed, setPressed] = useState(false)
    window.addEventListener('keydown', (e) => {
        !isPressed
            ? setPressed(true)
            : (document.location.href = 'http://michaels.works/folio')
    })
    return (
        <div className="home-container w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            <img className="logo" src={logo} alt="logo" />
            {!isPressed ? (
                <>
                    <img className="press" src={press} alt="press" />
                    <img className="copy" src={copyright} alt="copy" />
                </>
            ) : (
                <>
                    <div className="menu-item d-flex justify-content-center align-items-center active">
                        <img className="start" src={start} alt="start" />
                        <img
                            className="menu-overlay"
                            src={overlay}
                            alt="overlay"
                        />
                    </div>
                    <div className="menu-item d-flex justify-content-center align-items-center">
                        <img className="about" src={about} alt="about" />
                        <img
                            className="menu-overlay"
                            src={overlay}
                            alt="overlay"
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default Home
