import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import logo from '../assets/logo_30_1.png'
import press from '../assets/PRESS.png'
import copyright from '../assets/COPY.png'
import start from '../assets/START.png'
import about from '../assets/ABOUT.png'
import overlay from '../assets/BG.png'

const Home = () => {
    const [entered, setEntered] = useState(false)
    const [presses, setPresses] = useState(0)
    const [optionNumber, setOptionNumber] = useState(0)
    const [optionSelected, setOptionSelected] = useState(false)

    useEffect(() => {
        setInterval(() => {
            document.querySelector('.press img') &&
                document.querySelector('.press img').classList.toggle('d-none')
        }, 1000)

        // setInterval(() => {
        //     if (optionSelected) setOptionSelected(false)
        // }, 100)
    }, [])

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
            (e.key === 'Enter' || e.key === 'Space') &&
            !optionSelected
        ) {
            setOptionSelected(true)
            setTimeout(() => {
                setOptionSelected(false)
            }, 10)
        }
    }

    return (
        <div
            className="home-container h-100 d-flex flex-column justify-content-center align-items-center"
            onKeyDown={onKeyDown}
            tabIndex="0"
        >
            <img className="logo" src={logo} alt="logo" />
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
                            <img className="start" src={start} alt="start" />
                            <img
                                className="menu-overlay"
                                src={overlay}
                                alt="overlay"
                            />
                        </div>
                        <div
                            className={
                                optionNumber === 1
                                    ? 'menu-item d-flex justify-content-center align-items-center active'
                                    : 'menu-item d-flex justify-content-center align-items-center '
                            }
                        >
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
            {console.log(optionNumber)}
            {optionNumber === 0 && optionSelected ? (
                <Redirect to="/folio" />
            ) : null}
        </div>
    )
}

export default Home
