//React
import React, { useState, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom'
//Components
import About from '../About'
//Assets
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
import placeholder from '../../assets/img/cover_seo.jpg'
//CSS
import './Home.scss'

const Home = () => {
    const [entered, setEntered] = useState(false)
    const [presses, setPresses] = useState(0)
    const [optionNumber, setOptionNumber] = useState(0)
    const [optionSelected, setOptionSelected] = useState(false)
    const [aboutSelected, setAboutSelected] = useState(false)
    const [logoVideoIndex, setLogoVideoIndex] = useState(0)
    const [isIntervalCleared, setIsIntervalCleared] = useState(false)
    const about = useRef(null)
    const videos = [video_toca, video_pensa, video_hlm, video_lvdf]
    const isMobile =
        window.innerWidth <= 1024 || sessionStorage.getItem('USER_HAS_TOUCHED')

    const onStartTouch = (e) => {
        // detect iOS 13+ and add permissions
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then((permissionState) => {
                    console.log('permission state: ', permissionState)
                })
                .catch(console.error)
        }

        // detect iOS 12
        function iOSversion() {
            if (/iP(hone|od|ad)/.test(navigator.platform)) {
                var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
                return [
                    parseInt(v[1], 10),
                    parseInt(v[2], 10),
                    parseInt(v[3] || 0, 10),
                ]
            }
        }
        if (iOSversion()[0] <= 12) {
            alert(
                "Looks like you're running an outdated iOS version. Please explore on another device or update your software."
            )

            window.location.href = window.location.origin
        }
    }

    useEffect(() => {
        const onKeyDown = (e) => {
            setPresses(presses + 1)

            if (presses === 0 && !entered) {
                setEntered(true)
            }

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
        }

        window.onkeydown = onKeyDown
        window.ontouchend = onTouchEnd
    }, [entered, presses, optionNumber, optionSelected, aboutSelected])

    useEffect(() => {
        if (!isIntervalCleared) {
            setIsIntervalCleared(true)
        }
    }, [isIntervalCleared])

    useEffect(() => {
        setInterval(() => {
            document.querySelector('.press img') &&
                document.querySelector('.press img').classList.toggle('d-none')
        }, 1000)

        localStorage.setItem('shouldRefresh', '0')

        const randomNumber = Math.floor(Math.random() * 100)

        if (randomNumber >= 25 && randomNumber < 50) {
            setLogoVideoIndex(1)
        } else if (randomNumber >= 50 && randomNumber < 75) {
            setLogoVideoIndex(2)
        } else if (randomNumber >= 75 && randomNumber <= 100) {
            setLogoVideoIndex(3)
        }

        window.addEventListener(
            'touchend',
            function onFirstTouch(e) {
                sessionStorage.setItem('USER_HAS_TOUCHED', '1')
                window.removeEventListener('touchend', onFirstTouch, false)
            },
            false
        )
    }, [])

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
                        poster={isMobile ? placeholder : null}
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
                            {isMobile ? (
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
                                onTouchEnd={onStartTouch}
                            />
                        </div>
                        <div
                            className={
                                optionNumber === 1
                                    ? 'menu-item d-flex justify-content-center align-items-center active'
                                    : 'menu-item d-flex justify-content-center align-items-center '
                            }
                            ref={about}
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
