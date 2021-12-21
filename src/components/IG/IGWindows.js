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
      duration: 0.4,
      ease: Cubic.easeIn,
      onStart: () => { window.active = true },
    })
  }
  const disappearWindow = (window) => {
    gsap.to(window.element, {
      autoAlpha: 0,
      duration: 0.4,
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
        <iframe src="https://en.m.wikipedia.org/wiki/S%C3%A3o_Miguel_Island"></iframe>
      </div>
    </>
  )
}

export default IGWindows