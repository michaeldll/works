import React, { useState, useRef } from 'react'
import './About.scss'

const About = (props) => {
    const containerEl = useRef(null)
    const emailEl = useRef(null)
    const emailBtnEl = useRef(null)
    const [show, setShow] = useState(true)

    const onClose = (e) => {
        setShow(false)
    }
    const onMinimize = (e) => {
        if (containerEl.current.classList.contains('maximized')) {
            containerEl.current.classList.remove('maximized')
            containerEl.current.classList.add('minimized')
        }
    }
    const onMaximize = (e) => {
        containerEl.current.classList.add('maximized')
        containerEl.current.classList.remove('minimized')
    }
    const onEmail = (e) => {
        emailEl.current.innerHTML = `<a href="mailto:delabordemichael@gmail.com">delabordemichael${sessionStorage.getItem('USER_HAS_TOUCHED') ? '<br />' : ''
            }@gmail.com</a>`
        emailBtnEl.current.disabled = true
    }

    return (
        <div
            ref={containerEl}
            className={
                props.show && show
                    ? 'about-container window'
                    : 'about-container window hide'
            }
        >
            <div className="title-bar">
                <div className="title-bar-text">About</div>
                <div className="title-bar-controls">
                    <button onClick={onMinimize} aria-label="Minimize" />
                    <button onClick={onMaximize} aria-label="Maximize" />
                    <button onClick={onClose} aria-label="Close" />
                </div>
            </div>

            <div className="window-body">
                <p>
                    Hi. My name's Michael and I'm{' '}
                    <span>
                        <select>
                            <option>an interactive developer.</option>
                            <option>a terrible musician.</option>
                        </select>
                    </span>
                </p>
                <p>This is a showcase of my recent work.</p>
                <p>
                    Currently <strong>available for freelance</strong>.
                </p>
                <div className="contact">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div ref={emailEl} className="email"></div>
                        <button ref={emailBtnEl} onClick={onEmail}>
                            Show Email
                        </button>
                    </div>
                    <div>
                        <ul className="tree-view">
                            <li>
                                Socials:
                                <ul>
                                    <li>
                                        <a
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            href="https://www.linkedin.com/in/michael-de-laborde-31b873129/"
                                        >
                                            LinkedIn
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            href="https://twitter.com/michael_dlb/"
                                        >
                                            Twitter
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            href="https://github.com/michaeldll/"
                                        >
                                            Github
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <p>
                    {' '}
                    <span aria-label="sparkle" role="img">
                        ✨
                    </span>{' '}
                    Thanks for stopping by !{' '}
                    <span aria-label="sparkle" role="img">
                        ✨
                    </span>{' '}
                </p>
            </div>
        </div>
    )
}

export default About
