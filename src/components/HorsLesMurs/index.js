import React from 'react'
import { Link } from 'react-router-dom'
import horslesmurs from '../../assets/video/horslesmursfolio.mp4'
import pic from '../../assets/img/pic.png'
import './HorsLesMurs.scss'

const HorsLesMurs = () => {
    return (
        <div className="horslesmurs">
            <Link className="back window" to="/">
                {'<'} HOME
            </Link>

            <div className="container nopadtop">
                <img className="small" src={pic} alt="pic" />
            </div>
            <div className="container">
                <video loop muted controls src={horslesmurs} type="video/mp4" />
            </div>
        </div>
    )
}

export default HorsLesMurs
