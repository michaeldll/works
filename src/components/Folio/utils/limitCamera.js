import { Vector3 } from '@babylonjs/core/Maths/math'

const limitCamera = (camera, radians, angle) => {
    switch (angle) {
        case 'x':
            if (camera.rotation.x <= radians.lower) {
                camera.rotation = new Vector3(
                    radians.lower,
                    camera.rotation.y,
                    camera.rotation.z
                )
            } else if (camera.rotation.x >= radians.upper) {
                camera.rotation = new Vector3(
                    radians.upper,
                    camera.rotation.y,
                    camera.rotation.z
                )
            }
            break
        case 'y':
            if (camera.rotation.y <= radians.lower) {
                camera.rotation = new Vector3(
                    camera.rotation.x,
                    radians.lower,
                    camera.rotation.z
                )
            } else if (camera.rotation.y >= radians.upper) {
                camera.rotation = new Vector3(
                    camera.rotation.x,
                    radians.upper,
                    camera.rotation.z
                )
            }
            break
        default:
            break
    }
}

export default limitCamera