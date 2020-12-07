import React, { useState, useEffect } from 'react'
import InterfaceIcon from './InterfaceIcon'
import Projects from './Projects'
import { ReactComponent as BackToHomeIcon } from '../../assets/img/svg/back-to-home.svg'
import { ReactComponent as VolumeIcon } from '../../assets/img/svg/volume.svg'
import { ReactComponent as MenuIcon } from '../../assets/img/svg/menu.svg'
import './Classic.scss'

const Classic = (props) => {
    const initialState = {
        show: {
            backToHome: false,
            volume: false,
            menu: false,
            projects: false,
        },
        in: {
            backToHome: true,
            volume: true,
            menu: true,
            projects: true,
        },
    }

    const [state, setState] = useState(initialState)

    useEffect(() => {
        setTimeout(() => {
            setState((state) => ({
                ...state,
                show: {
                    backToHome: true,
                    volume: true,
                    menu: true,
                    projects: true,
                },
            }))

            document.querySelector('body').classList.add('orange')
        }, 500)
    }, [])

    return (
        <div className="classic">
            {state.show.backToHome ? (
                <div className="back-to-home">
                    <InterfaceIcon
                        className="test"
                        icon={BackToHomeIcon}
                        in={state.in.backToHome}
                    />
                </div>
            ) : (
                ''
            )}

            {state.show.volume ? (
                <div className="volume">
                    <InterfaceIcon icon={VolumeIcon} in={state.in.volume} />
                </div>
            ) : (
                ''
            )}

            {state.show.menu ? (
                <div className="menu">
                    <InterfaceIcon icon={MenuIcon} in={state.in.menu} />
                </div>
            ) : (
                ''
            )}

            {state.show.projects ? (
                <div className="projects">
                    <Projects in={state.in.projects} />
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export default Classic
