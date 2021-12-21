import React, { useEffect, useRef } from 'react'
import initDesenhaThree from './three'

const IGCanvas = () => {
  const ref = (canvasElement) => {
    initDesenhaThree(canvasElement)
  };

  return (
    <canvas className='ig__canvas' ref={ref}></canvas>
  )
}

export default IGCanvas
