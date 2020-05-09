import { Ray, Axis } from '@babylonjs/core/'
import { Vector3 } from '@babylonjs/core/Maths/math'

//https://doc.babylonjs.com/snippets/isinside
export default function pointIsInside(mesh, point) {
    var boundInfo = mesh.getBoundingInfo()
    var max = boundInfo.boundingBox.maximumWorld
    var min = boundInfo.boundingBox.minimumWorld
    var diameter = 2 * boundInfo.boundingSphere.radius

    if (point.x < min.x || point.x > max.x) {
        return false
    }
    if (point.y < min.y || point.y > max.y) {
        return false
    }
    if (point.z < min.z || point.z > max.z) {
        return false
    }

    var pointFound = false
    var d = 0
    var hitCount = 0
    var ray = new Ray(Vector3.Zero(), Axis.X, diameter)
    var pickInfo
    var direction = Vector3.Zero()

    while (d < 2 && !pointFound) {
        hitCount = 0
        direction = Axis.X.scale(2 * (0.5 - d))
        ray.origin = point
        ray.direction = direction
        ray.distance = diameter
        pickInfo = ray.intersectsMesh(mesh)
        while (pickInfo.hit) {
            hitCount++
            pickInfo.pickedPoint.addToRef(direction.scale(0.00000001), point)
            ray.origin = point
            pickInfo = ray.intersectsMesh(mesh)
        }
        if (hitCount % 2 === 1) {
            pointFound = true
        } else if (hitCount % 2 === 0 && hitCount > 0) {
            pointFound = true
        }
        d++
    }

    return pointFound
}
