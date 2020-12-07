/* eslint-disable array-callback-return */
import getActiveScreen from './getActiveScreen'

/**
 * @param {BABYLON.Scene} scene
 * @param {String} mode
 */
const showScreen = (scene, mode) => {
    const screens = scene.rootNodes.filter((nodes) => {
        if (nodes.name.indexOf('Screen') > -1) return nodes
    })

    if (mode === 'random') {
        const randScreen = screens[Math.floor(Math.random() * screens.length)]
        randScreen.setEnabled(true)
    }

    if (mode === 'next') {
        const activeScreen = getActiveScreen(scene) //[bool, int, Mesh{}]
        const activeIndex = activeScreen[1]
        activeScreen[2].setEnabled(false)
        const nextScreen = screens[activeIndex + 1]
        activeIndex + 1 < screens.length
            ? nextScreen.setEnabled(true)
            : screens[0].setEnabled(true)
    }

    if (mode === 'previous') {
        const activeScreen = getActiveScreen(scene) //[bool, int, Mesh{}]
        const activeIndex = activeScreen[1]
        activeScreen[2].setEnabled(false)
        const previousScreen = screens[activeIndex - 1]
        activeIndex - 1 < 0
            ? screens[screens.length-1].setEnabled(true)
            : previousScreen.setEnabled(true)
    }
}

export default showScreen
