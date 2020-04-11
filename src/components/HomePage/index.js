import React, { useEffect } from 'react'
import BabylonScene from './classes/BabylonScene'

function HomePage() {
    useEffect(() => {
        new BabylonScene()
    }, [])

    return (
        <div
            id="canvas-container"
            className=" w-100 h-100 d-flex justify-content-center align-items-center"
        ></div>
    )
}

export default HomePage
