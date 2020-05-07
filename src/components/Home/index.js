import React, { useState, useEffect, useCallback } from 'react'
import { AppContext } from '../../reducer/'
import About from '../About'
import { Redirect } from 'react-router-dom'
import press from '../../assets/text/PRESS.png'
import touch from '../../assets/text/TOUCH.png'
import copyright from '../../assets/text/COPY.png'
import start1 from '../../assets/text/START1.png'
import start2 from '../../assets/text/START2.png'
import about1 from '../../assets/text/ABOUT1.png'
import about2 from '../../assets/text/ABOUT2.png'
import video_toca from '../../assets/video/logo/logo_toca.mp4'
import video_hlm from '../../assets/video/logo/logo_hlm.mp4'
import video_lvdf from '../../assets/video/logo/logo_lvdf.mp4'
import video_pensa from '../../assets/video/logo/logo_pensa.mp4'
import logo from '../../assets/text/logo.png'
// import overlay from '../../assets/BG.png'
import './Home.scss'

const Home = () => {
    const [entered, setEntered] = useState(false)
    const [presses, setPresses] = useState(0)
    const [optionNumber, setOptionNumber] = useState(0)
    const [optionSelected, setOptionSelected] = useState(false)
    const [aboutSelected, setAboutSelected] = useState(false)
    const [logoVideoIndex, setLogoVideoIndex] = useState(0)

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
                !optionSelected &&
                optionNumber === 1
            ) {
                setAboutSelected(!aboutSelected)
            }
        }
        const onTouchEnd = (e) => {
            if (presses === 0 && !entered) setEntered(true)

            if (e.target.classList.contains('about')) {
                setPresses(presses + 1)
                setAboutSelected(!aboutSelected)
                setOptionNumber(1)
            } else if (e.target.classList.contains('start')) {
                setOptionNumber(0)
                setOptionSelected(true)
                setTimeout(() => {
                    setOptionSelected(false)
                }, 10)
            }
            // else if (
            //     (!aboutSelected && e.target.classList.contains('menu')) ||
            //     e.target.classList.contains('logo-video') ||
            //     e.target.classList.contains('home-container') ||
            //     e.target.classList.contains('menu-item') ||
            //     e.target.classList.contains('text-logo')
            // ) {
            //     optionNumber === 0
            //         ? setOptionNumber(optionNumber + 1)
            //         : setOptionNumber(optionNumber - 1)
            // }
        }

        window.onkeydown = onKeyDown
        window.ontouchend = onTouchEnd
    }, [entered, presses, optionNumber, optionSelected, aboutSelected])

    useEffect(() => {
        setInterval(() => {
            document.querySelector('.press img') &&
                document.querySelector('.press img').classList.toggle('d-none')
        }, 1000)

        const randomNumber = Math.floor(Math.random() * 100)

        if (randomNumber >= 25 && randomNumber < 50) {
            setLogoVideoIndex(1)
        } else if (randomNumber >= 50 && randomNumber < 75) {
            setLogoVideoIndex(2)
        } else if (randomNumber >= 75 && randomNumber <= 100) {
            setLogoVideoIndex(3)
        }
    }, [])

    // useCallback(() => {
    //     const randomNumber = Math.floor(Math.random() * 100)

    //     if (randomNumber >= 25 && randomNumber < 50) {
    //         setLogoVideoIndex(1)
    //     } else if (randomNumber >= 50 && randomNumber < 75) {
    //         setLogoVideoIndex(2)
    //     } else if (randomNumber >= 75 && randomNumber <= 100) {
    //         setLogoVideoIndex(3)
    //     }
    // }, [])

    const videos = [video_toca, video_pensa, video_hlm, video_lvdf]

    if (aboutSelected)
        document
            .querySelectorAll('#root, .home-container')
            .forEach((node) => node.classList.add('about-open'))
    else
        document
            .querySelectorAll('#root, .home-container')
            .forEach((node) => node.classList.remove('about-open'))

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
                        playsInline
                        loop
                        muted
                        className={
                            !entered ? 'logo-video' : 'logo-video entered'
                        }
                        src={videos[logoVideoIndex]}
                        type="video/mp4"
                    />
                </div>
            </div>
            <div className="menu w-100">
                {!entered ? (
                    <>
                        <div className="press">
                            {window.innerWidth < 450 ? (
                                <img src={touch} alt="touch" />
                            ) : (
                                <img src={press} alt="press" />
                            )}
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
