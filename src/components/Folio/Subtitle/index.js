import React from 'react'
import './Subtitle.scss'
import '98.css'

const Subtitle = (props) => {
    const setMarkup = (text) => ({ __html: text })
    return (
        <div id={props.id} className="subtitle">
            <div
                dangerouslySetInnerHTML={setMarkup(props.text)}
                className="window"
            ></div>
        </div>
    )
}

export default Subtitle
