import React from 'react'
import logo from '../../assets/text/logo.png'
// import video_toca from '../../assets/video/logo/logo_toca.mp4'
// import video_hlm from '../../assets/video/logo/logo_hlm.mp4'
// import video_lvdf from '../../assets/video/logo/logo_lvdf.mp4'
// import video_pensa from '../../assets/video/logo/logo_pensa.mp4'
// import placeholder from '../../assets/img/cover_seo.jpg'
import crt from '../../assets/img/crt.png'
import './Logo.scss'

export const Logo = (props) => {
    // const videos = [video_toca, video_pensa, video_hlm, video_lvdf]

    return (
        <a
            href={window.location.origin}
            className="logo-container d-flex flex-column justify-content-center align-items-center"
        >
            <img className="text-logo" src={logo} alt="logo" />
            <img className="crt-logo" src={crt} alt="crt" />

            {/* <video
                autoPlay
                poster={props.isMobile ? placeholder : null}
                playsInline
                loop
                muted
                className={!props.entered ? 'logo-canvas' : 'logo-canvas entered'}
                src={videos[props.logoVideoIndex]}
                type="video/mp4"
            /> */}
        </a>
    )
}
