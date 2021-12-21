import BaseScene from '../abstract/BaseScene'
import { Group, PerspectiveCamera, Scene, Texture } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { getViewport } from '../../utils'
import { MainContext } from '..'
import BaseObject from '../abstract/BaseObject'
import { FolderApi } from 'tweakpane'
import { MouseController } from '../controllers/MouseController'

export default class MainScene extends BaseScene {
  private orbit: any
  private controls: OrbitControls
  private MouseController: MouseController
  private projectGroups: Group[] = []

  constructor(context: MainContext) {
    super(context)
    this.setControllers()
    this.setCamera()
    this.setEvents()
    this.tweaks()
    this.context = this.generateContext()
  }

  private generateContext = () => ({
    ...this.context,
    camera: this.camera,
    scene: this.scene,
    viewport: this.viewport,
    controls: this.controls,
  })

  private setCamera() {
    this.camera = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.z = 58
    this.onResize()
    this.orbit = new OrbitControls(this.camera, this.context.renderer.domElement)
    this.orbit.enabled = false
    this.viewport = getViewport(this.camera)
  }

  private setControllers = () => {
    this.MouseController = new MouseController(this.generateContext())
    window.mouseController = this.MouseController
  }

  private setEvents = () => {
    this.MouseController.setEvents()
    window.addEventListener("resize", this.onResize)
  };

  private tweaks() {
    const folder: FolderApi = this.context.pane.addFolder({ title: 'Main Scene' })
    folder.addInput(this.orbit, "enabled", { label: "Orbit" })
    this.MouseController.tweaks()
  }

  public update() {
    this.MouseController.update(this.camera, this.viewport, this.projectGroups)
    this.context.renderer.render(this.scene, this.camera)
  }

}

export type MainSceneContext = ReturnType<MainScene["generateContext"]>
