import React, { useEffect } from 'react'
import { lerp } from 'three/src/math/MathUtils'
import gsap, { Cubic } from 'gsap'

const IGWindows = () => {
  const windows = []
  const windowRef = (element) => {
    element.style.visibility = "hidden"
    windows.push({
      id: element.dataset.windowId,
      element,
      offset: [0, 0],
      active: false
    })
  }
  const getWindow = (id) => {
    return windows.find(window => window.id === id)
  }
  const appearWindow = (window) => {
    gsap.to(window.element, {
      autoAlpha: 1,
      duration: 0.3,
      ease: Cubic.easeIn,
      onStart: () => { window.active = true },
    })
  }
  const disappearWindow = (window) => {
    gsap.to(window.element, {
      autoAlpha: 0,
      duration: 0.3,
      ease: Cubic.easeOut,
      onComplete: () => { window.active = false },
    })
  }
  const updateWindows = () => {
    requestAnimationFrame(updateWindows)
    if (!window.mouseController || !window.mouseController.event) return
    const offset = [window.mouseController.event.x, window.mouseController.event.y]

    const hoveredElement = window.mouseController.event.target
    const targetWindow = getWindow(hoveredElement.dataset.windowId)

    if (targetWindow) {
      if (!targetWindow.active) appearWindow(targetWindow)
      const lerpedX = lerp(targetWindow.offset[0], offset[0], 0.2)
      const lerpedY = lerp(targetWindow.offset[1], offset[1], 0.2)
      targetWindow.offset = [lerpedX, lerpedY]
      targetWindow.element.style.transform = `translate3d(${targetWindow.offset[0]}px, ${targetWindow.offset[1]}px, 0)`
    } else {
      for (const window of windows) {
        if (window.active) {
          disappearWindow(window)
        }
      }
    }
  }

  useEffect(() => {
    updateWindows()
  }, [])

  return (
    <>
      <div data-window-id="casa" className='ig__window window' ref={windowRef}>
        <div className="title-bar">
          <div className="title-bar-text">São Miguel</div>
        </div>
        <iframe title="casa" src="https://en.m.wikipedia.org/wiki/S%C3%A3o_Miguel_Island"></iframe>
      </div>
      <div data-window-id="musica" className='ig__window ig__window--smoll window' ref={windowRef}>
        <div className="title-bar">
          <div className="title-bar-text">My crappy songs</div>
        </div>
        <iframe title="musica" width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/660791777&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div><a href="https://soundcloud.com/ael-dll" title="ael" target="_blank" >ael</a> · <a href="https://soundcloud.com/ael-dll/sim-senhor" title="Sim Senhor" target="_blank" >Sim Senhor</a></div>
      </div>

    </>
  )
}

export default IGWindows