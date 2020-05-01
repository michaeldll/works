import React from 'react'
import { Link } from 'react-router-dom'
import horslesmurs from '../../assets/video/horslesmursfolio.mp4'
import pic from '../../assets/img/pic.png'
import './HorsLesMurs.scss'

const HorsLesMurs = () => {
    return (
        <div className={'horslesmurs'} tabIndex="0">
            <div className="back">
                <Link to="/" style={{ color: 'white', fontSize: '20px' }}>
                    BACK
                </Link>
            </div>
            <div style={{ padding: '0 0 50px 0' }}>
                <img className="small" src={pic} alt="pic" />
            </div>
            <div style={{ padding: '50px 0' }}>
                <video loop muted controls src={horslesmurs} type="video/mp4" />
            </div>
        </div>
    )
}

export default HorsLesMurs
