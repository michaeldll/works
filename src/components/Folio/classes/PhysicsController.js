//Cannon for physics
import * as CANNON from 'cannon'
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins/cannonJSPlugin'

//Greensock for animation
import gsap from 'gsap'

import { Vector3 } from '@babylonjs/core/Maths/math'
import { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor'
import { Mesh } from '@babylonjs/core/Meshes'
import { StandardMaterial } from '@babylonjs/core/Materials'

import config from '../utils/config'
import d2r from '../utils/d2r.js'

class PhysicsController {
    constructor(scene, audio) {
        this.scene = scene
        this.audio = audio
        this.gravityVector = new Vector3(0, -4.81, 0)
        this.physicsPlugin = new CannonJSPlugin(false, 10, CANNON)
        this.transMat = new StandardMaterial('transparent', this.scene)
        this.meshesWithCollisionSounds = []
    }
    init() {
        this.scene.enablePhysics(this.gravityVector, this.physicsPlugin)
        this.scene.getPhysicsEngine().setTimeStep(1 / 60)

        //CRT
        const crt = Mesh.CreateBox('transparentCRT', 1, this.scene)
        crt.isPickable = false
        crt.position = new Vector3(-0.557, 0.433, -0.293)
        crt.scaling = new Vector3(0.5, 0.489, 0.451)
        crt.physicsImpostor = new PhysicsImpostor(
            crt,
            PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0 },
            this.scene
        )
        this.meshesWithCollisionSounds.push(crt)

        //PS1 Controller
        const ps1Controller = this.scene.meshes.find(
            (mesh) => mesh.name === 'playstation-analog-controller'
        )
        ps1Controller.setParent(null)
        ps1Controller.physicsImpostor = new PhysicsImpostor(
            ps1Controller,
            PhysicsImpostor.BoxImpostor,
            { mass: 5, restitution: 0.1 },
            this.scene
        )

        //Drawer
        const drawer = this.scene.meshes.find(
            (mesh) => mesh.name === 'drawer_primitive1'
        )
        drawer.setParent(null)
        drawer.physicsImpostor = new PhysicsImpostor(
            drawer,
            PhysicsImpostor.BoxImpostor,
            { mass: 0, friction: 1, restitution: 0 },
            this.scene
        )
        this.meshesWithCollisionSounds.push(drawer)
        drawer.isPickable = false

        //Speakers
        const rightSpeaker = this.scene.meshes.find(
            (mesh) => mesh.name === 'speaker right'
        )
        rightSpeaker.setParent(null)
        rightSpeaker.physicsImpostor = new PhysicsImpostor(
            rightSpeaker,
            PhysicsImpostor.BoxImpostor,
            { mass: 10, restitution: 0.2 },
            this.scene
        )
        this.meshesWithCollisionSounds.push(rightSpeaker)

        const leftSpeaker = this.scene.meshes.find(
            (mesh) => mesh.name === 'speaker left'
        )
        leftSpeaker.setParent(null)
        leftSpeaker.physicsImpostor = new PhysicsImpostor(
            leftSpeaker,
            PhysicsImpostor.BoxImpostor,
            { mass: 10, restitution: 0.2 },
            this.scene
        )
        this.meshesWithCollisionSounds.push(leftSpeaker)

        //desktop
        const deskTop = this.scene.meshes.find(
            (mesh) => mesh.name === 'Desk Top'
        )
        deskTop.setParent(null)
        deskTop.physicsImpostor = new PhysicsImpostor(
            deskTop,
            PhysicsImpostor.BoxImpostor,
            { mass: 0, friction: 1, restitution: 0 },
            this.scene
        )
        this.meshesWithCollisionSounds.push(deskTop)

        //ground
        const ground = Mesh.CreateGround(
            'transparentGround',
            100,
            100,
            100,
            this.scene
        )
        ground.position.y = config.physicsGround.position.y //-0.392
        ground.physicsImpostor = new PhysicsImpostor(
            ground,
            PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0 },
            this.scene
        )
        this.meshesWithCollisionSounds.push(ground)
        ground.isPickable = false

        //keyboard
        const keyboard = this.scene.meshes.find(
            (mesh) => mesh.name === 'Keyboard.001'
        )
        keyboard.setParent(null)
        keyboard.physicsImpostor = new PhysicsImpostor(
            keyboard,
            PhysicsImpostor.BoxImpostor,
            { mass: 10, restitution: 0.2 },
            this.scene
        )

        //mouse
        const mouse = this.scene.meshes.find((mesh) => mesh.name === 'MOUSE')
        mouse.position.y += 0.01
        mouse.setParent(null)
        mouse.physicsImpostor = new PhysicsImpostor(
            mouse,
            PhysicsImpostor.BoxImpostor,
            { mass: 10, restitution: 0.2 },
            this.scene
        )

        //right wall
        const rightWall = Mesh.CreateBox('rightWall', 1, this.scene)

        rightWall.position = new Vector3(0.316, 0, -0)
        rightWall.rotation.x = d2r(1)
        rightWall.rotation.y = d2r(172)
        rightWall.rotation.z = d2r(1)
        rightWall.scaling = new Vector3(0.166, 0.637, 1.169)

        rightWall.physicsImpostor = new PhysicsImpostor(
            rightWall,
            PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0 },
            this.scene
        )

        rightWall.isPickable = false

        //left wall
        const leftWall = Mesh.CreateBox('leftWall', 1, this.scene)

        leftWall.position = new Vector3(-1.415, -0.011, 0)
        leftWall.rotation.x = d2r(1)
        leftWall.rotation.y = d2r(187)
        leftWall.rotation.z = d2r(1)
        leftWall.scaling = new Vector3(0.17, 0.655, 1.324)

        leftWall.physicsImpostor = new PhysicsImpostor(
            leftWall,
            PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0 },
            this.scene
        )

        leftWall.isPickable = false

        //front wall
        const frontWall = Mesh.CreateBox('frontWall', 1, this.scene)

        frontWall.position = new Vector3(-0.508, 0, 0)
        frontWall.rotation.x = d2r(1)
        frontWall.rotation.y = d2r(90)
        frontWall.rotation.z = d2r(1)
        frontWall.scaling = new Vector3(0.366, 0.637, 1.469)

        frontWall.physicsImpostor = new PhysicsImpostor(
            rightWall,
            PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0 },
            this.scene
        )

        frontWall.isPickable = false

        //phone
        const phone = this.scene.meshes.find((mesh) => mesh.name === 'phone')
        phone.physicsImpostor = new PhysicsImpostor(
            phone,
            PhysicsImpostor.BoxImpostor,
            { mass: 1, friction: 0.3, restitution: 0.1 },
            this.scene
        )

        //phone reset bounding box
        const phoneBoundingBox = Mesh.CreateBox(
            'phoneBoundingBox',
            1,
            this.scene
        )
        phoneBoundingBox.position = new Vector3(-0.55, 0.237, -0.55)
        phoneBoundingBox.scaling = new Vector3(0.9, 0.232, 0.264)

        phoneBoundingBox.isPickable = false

        //phone collision
        const collisionsSounds = [
            this.audio.phoneCollision1,
            this.audio.phoneCollision2,
            this.audio.phoneCollision3,
        ]

        //collisions
        let previousCollidedAgainst

        const onPhoneCollide = (collider, collidedAgainst) => {
            if (
                !collisionsSounds.find((collisionSound) =>
                    collisionSound.playing()
                )
            ) {
                // console.log(previousCollidedAgainst)

                if (
                    !previousCollidedAgainst ||
                    previousCollidedAgainst !== collidedAgainst
                ) {
                    //play random sound
                    const randSound =
                        collisionsSounds[
                            Math.floor(Math.random() * collisionsSounds.length)
                        ]
                    randSound.rate(1.5 - Math.floor(Math.random() * 10) * 0.1)
                    randSound.play()
                    previousCollidedAgainst = collidedAgainst
                }
            }
        }
        phone.physicsImpostor.registerOnPhysicsCollide(
            this.meshesWithCollisionSounds.map((mesh) => mesh.physicsImpostor),
            onPhoneCollide
        )

        //transparent material
        this.transMat.alpha = 0
        ground.material = this.transMat
        crt.material = this.transMat
        frontWall.material = this.transMat
        rightWall.material = this.transMat
        leftWall.material = this.transMat
        phoneBoundingBox.material = this.transMat
    }
    push(mesh, direction, power) {
        mesh.physicsImpostor.setLinearVelocity(
            mesh.physicsImpostor.getLinearVelocity().add(direction.scale(power))
        )
    }
    throwPhone() {
        const phone = this.scene.meshes.find((mesh) => mesh.name === 'phone')
        const phoneChild = this.scene.meshes.find(
            (mesh) => mesh.name === 'phone.child'
        )
        const arm = this.scene.rootNodes[0]._children.find((child) => {
            if (child.name === 'main_enfant.004') return child
        })
        const initial = -1.23
        gsap.to(arm.position, { z: initial + 0.008, duration: 0.1 })
        gsap.to(arm.position, {
            z: initial - 0.008,
            duration: 0.1,
            delay: 0.1,
        })

        phone.setEnabled(true)
        phoneChild.setEnabled(false)

        phone.physicsImpostor.setLinearVelocity(Vector3.Zero())
        phone.physicsImpostor.setAngularVelocity(Vector3.Zero())
        phone.rotationQuaternion.copyFromFloats(0, 0, 0, 1)

        phone.position = new Vector3(
            this.scene.activeCamera.position.x - 0.01,
            this.scene.activeCamera.position.y - 0.01,
            this.scene.activeCamera.position.z + 0.01
        )

        this.push(phone, this.scene.activeCamera.getForwardRay().direction, 6)
    }
    resetPhone() {
        const phone = this.scene.meshes.find((mesh) => mesh.name === 'phone')

        phone.position = new Vector3(
            config.phone.position.x,
            config.phone.position.y + 0.2,
            config.phone.position.z + 0
        )

        phone.rotationQuaternion.copyFromFloats(
            config.phone.rotation.x,
            config.phone.rotation.y,
            config.phone.rotation.z,
            1
        )

        phone.physicsImpostor.setLinearVelocity(Vector3.Zero())
        phone.physicsImpostor.setAngularVelocity(Vector3.Zero())
    }
    touch(mesh, vector = new Vector3(1.5, 0, 0.8)) {
        mesh.physicsImpostor.applyImpulse(vector, mesh.getAbsolutePosition())
    }
}

export default PhysicsController
