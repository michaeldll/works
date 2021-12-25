import React from 'react'
import IGCanvas from './IGCanvas'
import '98.css'
import './IG.scss'
import IGWindows from './IGWindows'

const IG = () => {
  return (
    <>
      <div className="ig">
        <div className='window'>
          <div className="window-body">
            <h2>Who am I ?</h2>
            <p>I'm 26 years young and I come from <strong data-window-id='casa'>São Miguel, Açores</strong> (it's a fairly remote place).</p>
            <p>I came to France about 10 years ago and somehow ended up at Gobelins doing front end / creative development - same class as Léo.</p>
            <p>I'd describe myself as: curious, naive, workaholic.</p>

            <h2>What are my interests ?</h2>
            <p>When I'm not obsessing over some project, I enjoy <strong data-window-id='musica'>making crappy songs</strong>, shooting film and screwing around with my bike[video] - which are just side projects of their own, in a way.</p>
            <p>I'm passionate about making stuff from unique and stimulating ideas and therefore enjoy contributing to the vision of a project if needed.</p>

            <h2>What are my skills ?</h2>
            <p>I'm mostly self-taught, although I'm very grateful for having worked with talented people who've also taught me a lot.</p>
            <p>I've still got a long way to go, but I love what I do.</p>
            <br />
            <p>On the technical side, I do front-end and WebGL, focusing on interaction, motion and real-time 3D.</p>
            <p>I've found that having a solid mental map of the code helps with scope, side effects and maintaining code quality.</p>
            <p>Therefore, I've recently come to enjoy working with as little dependencies as realistically possible and fully understanding what's happening in the code before adding new features - when the time constraints allow it.</p>
            <p>With WebGL, I've tried everything from building my own native WebGL framework to a full-on BabylonJS setup.</p>
            <p>On the front-end, I've worked with Vue, Nuxt, React, Next and Webflow.</p>
            <p>I've also done simple deployment and headless CMS when needed, through Vercel, Netlify, Contentful and DatoCMS.</p>

            <h2>3 most "interesting" projects :</h2>
            <a href="/">https://michaels.works</a>
            <p>This is my fairly experimental folio, made in two months during the first French lockdown. The idea comes from my very earliest memories of playing around with my dad's huge CRT monitor.</p>
            <p>The biggest challenge came from trying to accomplish a precise and fairly ambitious concept[render] while learning the skills to do so.</p>
            <p>An example of this comes from the textures[textures screenshots] and UVs, which I had to carefully learn to unfold and paint to get the PSX look I wanted. I've found that, when rendered on a pixelated 320x480px canvas, they came out... great (?).</p>
            <p>I had to learn Blender from scratch (here's my donut) as well as finding a way to integrate physics [dev tools screenshot] to the WebGL world (this was around Bruno Simon's folio...).</p>
            <a href="https://is-ai-stealing-your-job.com">https://is-ai-stealing-your-job.com</a>
            <p>data structures, WebGL to DOM interaction</p>
            <a href="https://belleepoque.co">https://belleepoque.co</a>
            <p>Projects page debug infinite bounding box instanced mesh texture atlas</p>

            <h2>What am I looking for in an internship ?</h2>
            <p>I'm looking to learn. I learned more in your antho_parle_web interview than in six months of grasping at obscure Stack Overflow threads.</p>
            <p>As a huge bonus, i would get to work with Léo, which I deeply appreciate and respect.</p>
            <p>Let's be clear : I expect tons of work, sometimes outside of "normal" schedules and I'm fine with that. The reward would be worth it.</p>
          </div>
          <IGWindows />
        </div>
      </div >
      <IGCanvas />
    </>
  )
}

export default IG
