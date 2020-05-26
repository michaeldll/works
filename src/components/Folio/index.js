import React, { useEffect } from 'react'
import { Logo } from '../Logo/index'
import Subtitle from './Subtitle/index'
import BabylonScene from './classes/BabylonScene'
import layout from '../../assets/img/overlay.png'
import crosshair_tr from '../../assets/img/crosshair/top_right_white.png'
import crosshair_br from '../../assets/img/crosshair/bot_right_white.png'
import crosshair_bl from '../../assets/img/crosshair/bot_left_white.png'
import crosshair_tl from '../../assets/img/crosshair/top_left_white.png'
import discover0 from '../../assets/img/discover/0.png'
import discover1 from '../../assets/img/discover/1.png'
import discover2 from '../../assets/img/discover/2.png'
import discover3 from '../../assets/img/discover/3.png'
import discover4 from '../../assets/img/discover/4.png'
import discover0Mobile from '../../assets/img/discover/mobile/0.png'
import discover1Mobile from '../../assets/img/discover/mobile/1.png'
import discover2Mobile from '../../assets/img/discover/mobile/2.png'
import backToMenu from '../../assets/img/back-to-menu.png'
import life from '../../assets/video/life.mp4'
import horslesmurs from '../../assets/video/horslesmurs.mp4'
import pensa from '../../assets/video/pensa.mp4'
import toca from '../../assets/video/toca.mp4'
import './scss/Folio.scss'

const Folio = () => {
    const subtitles = [
        {
            pensa: `
            <p>
                <b>"pensa"</b> is another small experiment which uses
            </p>
            <p>
                <b>React</b> and <b>Markov Chains</b> to generate new lyrics from previous ones. 
            </p>`,
        },
        {
            toca: `<p><b>"toca"</b> is a small musical experiment, which is meant to blend four separate audio tracks of a song I did with a bit of HTML5 <b>Canvas</b> and <b>Web Audio API</b> trickery.</p>`,
        },
        {
            river: `
                <p><b>La Vie d'un Fleuve</b> is a <b>WebGL</b> experience meant to relive the lifecycle of a river, from its inception in the source to its eventual demise in the ocean.</p>
                <p>I couldn't have done it without the precious help of talented designer <a href="https://www.instagram.com/roxanep_n.bis/">Roxane Peuvrier.</a></p>`,
        },
        {
            horslesmurs: `
                <p><b>Hors les Murs</b> follows a boy's physical and spiritual journey through the Figure d'Artiste exposition at the Petite Galerie, which is located in the Louvre museum.</p>  
                <p>In it, you'll get to use novel technologies such as Augmented Reality to prop up a virtual gallery and find out what it means to be an artist.</p>
                <p>This was a group project, built in <b>Unity</b> as part of a workshop with the Louvre at Gobelins.</p> 
                <p>I'd like to profusely thank <a href="https://www.instagram.com/marius.ballot">Marius Ballot</a>, <a href="https://rachelduvauchelle.myportfolio.com">Rachel Duvauchelle</a> and <a href="https://www.instagram.com/ouri.levin">Ouri Levin</a>, who worked with me to bring this fairly ambitious project to life in just a few short weeks.</p>`,
        },
        {
            postit: '<p>I really should finish my portfolio.</p>',
        },
        {
            keepforgetting: '<p>I keep forgetting this!</p>',
        },
        {
            howdoesmouse: '<p>How does a mouse work again?</p>',
        },
    ]

    const isMobile = sessionStorage.getItem('USER_HAS_TOUCHED')
    const randomNumber = Math.floor(Math.random() * 100)
    let randomIndex = 0

    if (randomNumber >= 25 && randomNumber < 50) {
        randomIndex = 1
    } else if (randomNumber >= 50 && randomNumber < 75) {
        randomIndex = 2
    } else if (randomNumber >= 75 && randomNumber <= 100) {
        randomIndex = 3
    }
    useEffect(() => {
        new BabylonScene().init()
    }, [])

    return (
        <div
            id="canvas-container"
            className="h-100 d-flex justify-content-center align-items-center"
        >
            <div className="crosshair">
                <img className="tl" src={crosshair_tl} alt="top left" />
                <img className="tr" src={crosshair_tr} alt="top right" />
                <img className="bl" src={crosshair_bl} alt="bot left" />
                <img className="br" src={crosshair_br} alt="bot right" />
            </div>

            <img className="overlay" src={layout} alt="layout" />

            <div className="discover">
                <img
                    className="zero hide"
                    src={!isMobile ? discover0 : discover0Mobile}
                    alt="discover_project"
                />

                <img
                    className="one hide"
                    src={!isMobile ? discover1 : discover1Mobile}
                    alt="discover_project"
                />

                <img
                    className="two hide"
                    src={!isMobile ? discover2 : discover2Mobile}
                    alt="discover_project"
                />

                {!isMobile ? (
                    <img
                        className="three hide"
                        src={discover3}
                        alt="discover_project"
                    />
                ) : (
                    ''
                )}

                {!isMobile ? (
                    <img
                        className="four hide"
                        src={discover4}
                        alt="discover_project"
                    />
                ) : (
                    ''
                )}
            </div>

            <Logo
                entered={true}
                isMobile={isMobile}
                logoVideoIndex={randomIndex}
            />

            <div className="backtomenu">
                <img src={backToMenu} alt="backtomenu" />
            </div>

            <video
                autoPlay
                playsInline
                loop
                id="life-river"
                src={life}
                type="video/mp4"
            />

            <video
                autoPlay
                playsInline
                loop
                id="horslesmurs"
                src={horslesmurs}
                type="video/mp4"
            />
            <video
                autoPlay
                playsInline
                loop
                id="pensa"
                src={pensa}
                type="video/mp4"
            />

            <video
                autoPlay
                playsInline
                loop
                id="toca"
                src={toca}
                type="video/mp4"
            />

            {subtitles.map((sub, i) => (
                <Subtitle
                    key={i}
                    id={Object.keys(sub)[0] + '-sub'}
                    text={Object.values(sub)[0]}
                />
            ))}

            <div id="orientationScreen" className="hide">
                <div className="window orientationText">
                    Please rotate your screen
                </div>
            </div>
        </div>
    )
}

export default Folio
