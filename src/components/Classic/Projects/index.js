import React, { useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import BabylonScene from './classes/BabylonScene'
import './Project.scss'

const Projects = (props) => {
    useEffect(() => {
        new BabylonScene().init()
    }, [])
    return (
        <CSSTransition
            appear
            in={props.in}
            timeout={1000}
            classNames="transition"
        >
            <canvas id="babylon-canvas-projects"></canvas>
        </CSSTransition>
    )
}

export default Projects
