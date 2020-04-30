import React, { useEffect } from 'react'
import Subtitle from './Subtitle/index'
import BabylonScene from './classes/BabylonScene'
import layout from '../../assets/img/overlay.png'
import crosshair from '../../assets/img/crosshair.png'
import life from '../../assets/video/life.mp4'
import horslesmurs from '../../assets/video/horslesmurs.mp4'
import pensa from '../../assets/video/pensa.mp4'
import toca from '../../assets/video/toca.mp4'
import './scss/Folio.scss'

const Folio = () => {
    const subtitles = [
        {
            pensa: `<p><b>"pensa"</b> is another small experiment which uses
                React and Markov Chains to generate new lyrics from previous ones. </p>
                <p>It has a tendency to output some interesting results, so hopefully you'll get em too.</p>
                <p>You'll also find a small sprinkle of microphone and WebGL shader fun in there, just because.</p>
                <p>Hopefully you'll like it :)</p>`,
        },
        {
            toca: `<p><b>"toca"</b> is a small musical experiment, which is meant to blend four separate audio tracks of a song I did with a bit of HTML5 Canvas and audio API trickery.</p>
                <p>how successful is that blend, I hear you ask ?</p>
                <p>well, I don't know. I guess I'll leave it up to you to decide :)</p>`,
        },
        {
            river: `
                <p><b>La vie d'un fleuve</b> is a WebGL experience meant to relive the lifecycle of a river, from its inception in the source to its eventual demise in the ocean.</p>
                <p>it was built as part of a Data Visualization workshop at Gobelins, and therefore it also seeks to imparts the viewer with a few key figures along the way.</p>
                <p>I couldn't have done it without the precious help of talented designer Roxane Peuvrier :)</p>`,
        },
        {
            horslesmurs: `
                <p><b>Hors les Murs</b> follows a boy's physical and spiritual journey through the Figure d'Artiste exposition at the Petite Galerie, which is located in the Louvre museum.</p>  
                <p>In it, you'll get to use novel technologies such as Augmented Reality to prop up a virtual gallery and find out what it means to be an artist.</p>
                <p>This was a group project, built in Unity as part of a workshop with the Louvre at Gobelins.</p> 
                <p>I'd like to profusely thank Marius Ballot, Rachel Duvauchelle and Ouri Levin, who worked with me to bring this fairly ambitious project to life in just a few short weeks :)</p>`,
        },
        {
            postit: '<p>I really should finish my portfolio.</p>',
        },
    ]

    useEffect(() => {
        new BabylonScene()
    }, [])

    return (
        <div
            id="canvas-container"
            className="h-100 d-flex justify-content-center align-items-center"
        >
            <img className="crosshair" src={crosshair} alt="crosshair" />
            <img className="overlay" src={layout} alt="layout" />
            <video
                autoPlay={true}
                loop={true}
                id="life-river"
                src={life}
                type="video/mp4"
            />
            <video
                autoPlay={true}
                loop={true}
                id="horslesmurs"
                src={horslesmurs}
                type="video/mp4"
            />
            <video
                autoPlay={true}
                loop={true}
                id="pensa"
                src={pensa}
                type="video/mp4"
            />
            <video
                autoPlay={true}
                loop={true}
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
