import React from 'react'
import './Subtitle.scss'

const Subtitle = (props) => {
    const setMarkup = (text) => ({ __html: text })
    return (
        <div id={props.id} className="subtitle">
            <button className="close-subtitle">x</button>
            <div
                dangerouslySetInnerHTML={setMarkup(props.text)}
                className="window"
            ></div>
        </div>
    )
}

export default Subtitle
