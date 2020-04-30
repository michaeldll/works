import React from 'react'
import './Subtitle.scss'

const Subtitle = (props) => {
    const setMarkup = (text) => ({ __html: text })
    return (
        <div id={props.id} className="subtitle">
            <div dangerouslySetInnerHTML={setMarkup(props.text)}></div>
        </div>
    )
}

export default Subtitle
