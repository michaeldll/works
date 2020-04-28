const getActiveScreen = (scene) => {
    const screens = scene.rootNodes.filter((nodes) => {
        if (nodes.name.indexOf('Screen') > -1) return nodes
    })
    return screens
        .map((screen, i) => [screen.isEnabled(), i, screen])
        .find((screen) => screen[0] === true)
}

export default getActiveScreen
