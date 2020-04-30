import React, { useState, useEffect, useCallback } from 'react'
import About from '../About'
import { Redirect } from 'react-router-dom'
import press from '../../assets/text/PRESS.png'
import copyright from '../../assets/text/COPY.png'
import start1 from '../../assets/text/START1.png'
import start2 from '../../assets/text/START2.png'
import about1 from '../../assets/text/ABOUT1.png'
import about2 from '../../assets/text/ABOUT2.png'
import video from '../../assets/video/logo_4.mp4'
import logo from '../../assets/text/logo.png'
// import overlay from '../../assets/BG.png'
import './Home.scss'

const Home = () => {
    const [entered, setEntered] = useState(false)
    const [presses, setPresses] = useState(0)
    const [optionNumber, setOptionNumber] = useState(0)
    const [optionSelected, setOptionSelected] = useState(false)
    const [aboutSelected, setAboutSelected] = useState(false)

    useEffect(() => {
        const onKeyDown = (e) => {
            setPresses(presses + 1)

            if (presses === 0 && !entered) setEntered(true)
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                optionNumber === 0
                    ? setOptionNumber(optionNumber + 1)
                    : setOptionNumber(optionNumber - 1)
            }
            if (
                presses > 0 &&
                (e.key === 'Enter' || e.keyCode === 32) &&
                !optionSelected
            ) {
                setOptionSelected(true)
                setTimeout(() => {
                    setOptionSelected(false)
                }, 10)
            }
            if (
                presses > 0 &&
                (e.key === 'Enter' || e.keyCode === 32) &&
                !optionSelected
            ) {
                setOptionSelected(true)
                setTimeout(() => {
                    setOptionSelected(false)
                }, 10)
            }

            if (
                presses > 0 &&
                (e.key === 'Enter' || e.keyCode === 32) &&
                !optionSelected &&
                optionNumber === 1
            ) {
                setAboutSelected(!aboutSelected)
            }
        }

        window.onkeydown = onKeyDown
    }, [entered, presses, optionNumber, optionSelected, aboutSelected])

    useEffect(() => {
        setInterval(() => {
            document.querySelector('.press img') &&
                document.querySelector('.press img').classList.toggle('d-none')
        }, 1000)
    }, [])

    return (
        <div
            className={
                !entered
                    ? 'home-container h-100 d-flex flex-column justify-content-center align-items-center'
                    : 'home-container h-100 d-flex flex-column justify-content-center align-items-center entered'
            }
            tabIndex="0"
        >
            <div className="menu w-100">
                <div className="logo-container d-flex flex-column justify-content-center align-items-center">
                    {entered ? (
                        <img className="text-logo" src={logo} alt="logo" />
                    ) : (
                        ''
                    )}
                    <video
                        autoPlay
                        loop
                        muted
                        className={
                            !entered ? 'logo-video' : 'logo-video entered'
                        }
                        src={video}
                        type="video/mp4"
                    />
                </div>
            </div>
            <div className="menu w-100">
                {!entered ? (
                    <>
                        <div className="press">
                            <img src={press} alt="press" />
                        </div>
                        <img className="copy" src={copyright} alt="copy" />
                    </>
                ) : (
                    <>
                        <div
                            className={
                                optionNumber === 0
                                    ? 'menu-item d-flex justify-content-center align-items-center active'
                                    : 'menu-item d-flex justify-content-center align-items-center '
                            }
                        >
                            <img
                                className="start"
                                src={optionNumber === 0 ? start2 : start1}
                                alt="start"
                            />
                        </div>
                        <div
                            className={
                                optionNumber === 1
                                    ? 'menu-item d-flex justify-content-center align-items-center active'
                                    : 'menu-item d-flex justify-content-center align-items-center '
                            }
                        >
                            <img
                                className="about"
                                src={optionNumber === 1 ? about2 : about1}
                                alt="about"
                            />
                        </div>
                    </>
                )}
            </div>
            {optionNumber === 0 && optionSelected ? (
                <Redirect to="/folio" />
            ) : null}

            {aboutSelected ? <About show={true} /> : <About show={false} />}
        </div>
    )
}

export default Home
