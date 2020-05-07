import React, { useEffect } from 'react'
import Subtitle from './Subtitle/index'
import BabylonScene from './classes/BabylonScene'
import layout from '../../assets/img/overlay.png'
import crosshair from '../../assets/img/crosshair.png'
import discover0 from '../../assets/img/discover/0.png'
import discover1 from '../../assets/img/discover/1.png'
import discover2 from '../../assets/img/discover/2.png'
import discover3 from '../../assets/img/discover/3.png'
import discover4 from '../../assets/img/discover/4.png'
import life from '../../assets/video/life.mp4'
import horslesmurs from '../../assets/video/horslesmurs.mp4'
import pensa from '../../assets/video/pensa.mp4'
import toca from '../../assets/video/toca.mp4'
import './scss/Folio.scss'

const Folio = () => {
    const subtitles = [
        {
            pensa: `<p><b>"pensa"</b> is another small experiment which uses
                <b>React</b> and <b>Markov Chains</b> to generate new lyrics from previous ones. </p>`,
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
    ]

    useEffect(() => {
        new BabylonScene()
    }, [])

    //#f9d586
    //f9e9c5

    return (
        <div
            id="canvas-container"
            className="h-100 d-flex justify-content-center align-items-center"
        >
            <img className="crosshair" src={crosshair} alt="crosshair" />
            <img className="overlay" src={layout} alt="layout" />

            <div className="discover">
                <img
                    className="zero hide"
                    src={discover0}
                    alt="discover_project"
                />
                <img
                    className="one hide"
                    src={discover1}
                    alt="discover_project"
                />
                <img
                    className="two hide"
                    src={discover2}
                    alt="discover_project"
                />
                <img
                    className="three hide"
                    src={discover3}
                    alt="discover_project"
                />
                <img
                    className="four hide"
                    src={discover4}
                    alt="discover_project"
                />
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
        </div>
    )
}

export default Folio
