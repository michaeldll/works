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
    this.setObjects()
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

  private setObjects() {
    // fetch('/assets/msdf/poppins/Poppins_Regular.json').then(result => result.json()).then(value => {
    //   console.log(value);

    //   const geometry = new TextGeometry({ font: value, text: "TEST" })

    //   fetchShaders('/assets/shaders/three/msdf/vertex.glsl', '/assets/shaders/three/msdf/fragment.glsl').then(({ vertex, fragment }) => {
    //     const texture = this.context.textureLoader.load('/assets/msdf/poppins/Poppins-Regular.png')

    //     let material = new ShaderMaterial({
    //       vertexShader: vertex,
    //       fragmentShader: fragment,
    //       uniforms: {
    //         map: { value: texture },
    //         color: { value: new Color(0xffffff) }
    //       },
    //     })

    //     const object = new Mesh(geometry, material)
    //     object.scale.setScalar(25)
    //     this.scene.add(object)
    //   })
    // })


    // this.loadTextures().then(({ projectOne, projectTwo, projectThree, one, two, three }) => {
    //   fetchShaders('/assets/shaders/three/textured/vertex.glsl', '/assets/shaders/three/textured/fragment.glsl')
    //     .then(({ vertex, fragment }) => {
    //       const offset = 13
    //       const numberSize = 5
    //       const numberOffset = new Vector3(3, -5, 0)

    //       for (let index = 0; index < 3; index++) {
    //         switch (index) {
    //           case 0:
    //             this.setProjectMesh(index, { numberSize, numberOffset, vertex, fragment, offset, numberTexture: one, projectTexture: projectOne, text: 'Contact' })
    //             break;

    //           case 1:
    //             this.setProjectMesh(index, { numberSize, numberOffset, vertex, fragment, offset, numberTexture: two, projectTexture: projectTwo, text: 'Contact' })
    //             break;

    //           case 2:
    //             this.setProjectMesh(index, { numberSize: numberSize * 2, numberOffset: numberOffset.add(new Vector3(-0.6, -2.8, 0)), vertex, fragment, offset, numberTexture: three, projectTexture: projectThree, text: 'Contact' })
    //             break;

    //           default:
    //             break;
    //         }
    //       }
    //     })
    // })
  }

  // setProjectMesh = (index: number, { numberSize, numberOffset, vertex, fragment, offset, numberTexture, projectTexture, text }: ProjectMesh) => {

  //   const group = new Group()

  //   const number = new Primitive(this.generateContext(), {
  //     geometry: new PlaneBufferGeometry(),
  //     material: new ShaderMaterial({
  //       vertexShader: vertex, fragmentShader: fragment, transparent: true, uniforms: {
  //         uTexture: { value: numberTexture }
  //       }
  //     }),
  //     parameters: {
  //       position: new Vector3(index * offset - offset, 0, 2).add(numberOffset),
  //       rotation: new Quaternion(),
  //       scale: new Vector3(numberSize * (numberTexture.image.width / numberTexture.image.height), numberSize, 1)
  //     }
  //   })
  //   group.add(number.object)

  //   const project = new Primitive(this.generateContext(), {
  //     geometry: new PlaneBufferGeometry(),
  //     material: new ShaderMaterial({
  //       vertexShader: vertex, fragmentShader: fragment, transparent: true, uniforms: {
  //         uTexture: { value: projectTexture }
  //       }
  //     }),
  //     parameters: {
  //       position: new Vector3(index * offset - offset, 0, 1),
  //       rotation: new Quaternion(),
  //       scale: new Vector3(5, 18, 1)
  //     }
  //   })
  //   group.add(project.object)

  //   const troika = new Text() as any
  //   troika.font = '/assets/fonts/poppins/Poppins-Regular.woff'
  //   troika.letterSpacing = 0.55
  //   troika.position.set(index * offset - offset, 0, 2)
  //   troika.position.x -= 3 + troika.letterSpacing
  //   troika.position.y -= 10
  //   troika.text = text
  //   troika.fontSize = 1
  //   troika.color = 0xffffff
  //   troika.sync()

  //   group.add(troika)

  //   this.scene.add(group)
  //   this.projectGroups.push(group)
  // }

  // loadTextures = () => new Promise<Textures>((resolve) => {

  //   const promises = [
  //     this.loadTexture('/assets/textures/project1.png'),
  //     this.loadTexture('/assets/textures/project1.png'),
  //     this.loadTexture('/assets/textures/project1.png'),
  //     this.loadTexture('/assets/textures/1.png'),
  //     this.loadTexture('/assets/textures/2.png'),
  //     this.loadTexture('/assets/textures/3.png')
  //   ]
  //   Promise.all(promises).then((value) => {
  //     resolve({
  //       projectOne: value[0],
  //       projectTwo: value[1],
  //       projectThree: value[2],
  //       one: value[3],
  //       two: value[4],
  //       three: value[5]
  //     })
  //   })

  // })

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
