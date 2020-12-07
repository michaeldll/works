import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './InterfaceIcon.scss'

const InterfaceIcon = (props) => {
    return (
        <CSSTransition
            appear
            in={props.in}
            timeout={1000}
            classNames="transition"
        >
            <props.icon className="interface-icon" />
        </CSSTransition>
    )
}

export default InterfaceIcon
