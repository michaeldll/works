import React from 'react'
import { Link } from 'react-router-dom'
import horslesmurs from '../../assets/video/horslesmursfolio.mp4'
import pic from '../../assets/img/pic.png'
import './HorsLesMurs.scss'

const HorsLesMurs = () => {
    const isMobile = sessionStorage.getItem('USER_HAS_TOUCHED')
    return (
        <div className="horslesmurs">
            {/* this is an ugly bugfix */}
            {!isMobile ? (
                <Link className="back window" to="/">
                    {'<'} HOME
                </Link>
            ) : (
                <a className="back window" href={window.location.origin}>
                    {'<'} HOME
                </a>
            )}
            <div className="container">
                <img src={pic} alt="bg" />
            </div>
            <div className="container">
                <video loop muted controls src={horslesmurs} type="video/mp4" />
            </div>
        </div>
    )
}

export default HorsLesMurs
