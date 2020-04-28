import { GizmoManager } from '@babylonjs/core/Gizmos/gizmoManager'

class GizmoController {
    constructor(scene) {
        this.scene = scene
        this.gizmoManager = new GizmoManager(this.scene)
        this.init()
    }

    init() {
        this.gizmoManager.positionGizmoEnabled = true
        this.gizmoManager.rotationGizmoEnabled = true
        this.gizmoManager.scaleGizmoEnabled = false
        this.gizmoManager.boundingBoxGizmoEnabled = false
        this.gizmoManager.usePointerToAttachGizmos = false
        this.gizmoManager.attachToMesh(
            this.scene.rootNodes[0]._children.find((child) => {
                if (child.name === 'phone') return child
            })
        )
    }
}

export default GizmoController
