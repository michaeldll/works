import {
  Intersection,
  Mesh,
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  PlaneBufferGeometry,
  ShaderMaterial,
  Vector2,
  Vector3,
  Texture
} from "three";
import { loadTexture } from "../../utils";
import { MainSceneContext } from "../scenes/MainScene";
import { Viewport } from "../types";

const parameters = {
  size: 0.04
}

// To avoid too many expensive instantiations
const temporaryVectors = {
  positionOffset: new Vector3()
}

export class MouseController {
  public object: Mesh;
  public intersects: Intersection[];
  public raw = new Vector2();
  public event: MouseEvent
  private context: MainSceneContext;
  private target = new Vector3();
  private texture: Texture

  constructor(context: MainSceneContext) {
    this.context = context;
    this.intersects = [];
    this.initObject();
  }

  private initObject = () => {
    loadTexture(this.context.textureLoader, '/textures/98crosshair.png').then((texture) => {
      this.texture = texture

      const geometry = new PlaneBufferGeometry();
      const material = new ShaderMaterial({
        vertexShader: /*glsl*/ `
          varying vec2 vUv;
  
          void main(void) {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /*glsl*/ `
          varying vec2 vUv;
  
          uniform sampler2D uTexture;
  
          void main(void) {
            vec4 texel = texture2D(uTexture, vUv);
            gl_FragColor = texel;
          }
        `,
        uniforms: {
          uWave: { value: false },
          uTexture: { value: texture }
        },
        transparent: true,
      });
      this.object = new Mesh(geometry, material);
      this.updateScale()
      this.context.scene.add(this.object)
    })
  };

  private updateScale = () => {
    this.object.scale.set(this.texture.image.width * parameters.size, this.texture.image.height * parameters.size, 0);
  }

  private onMouseMove = (e: MouseEvent) => {
    this.event = e
    this.raw.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.raw.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  public setEvents = () => {
    window.addEventListener("mousemove", this.onMouseMove);
  };

  public tweaks = () => {
    const input = this.context.pane.addInput(parameters, 'size', { min: 0.01, max: 0.1, label: 'Cursor Size' })
    input.on('change', () => {
      this.updateScale()
    })
  }

  public update(
    camera: PerspectiveCamera | OrthographicCamera,
    viewport: Viewport,
    raycastedObjects?: Object3D[]
  ) {
    if (!!raycastedObjects.length) {
      this.context.raycaster.setFromCamera(this.raw, camera);
      this.intersects = this.context.raycaster.intersectObjects(raycastedObjects, true);
    }

    if (!this.object) return

    this.target.set(
      (this.raw.x * viewport.width) / 2,
      (this.raw.y * viewport.height) / 2,
      0
    );
    this.object.position.lerp(this.target, 0.9);

    // Because WebGL has centered axii, we have to add an offset to mimick the native cursor using the Windows 98 texture
    temporaryVectors.positionOffset.set(this.object.scale.x / 4, -this.object.scale.y / 4, 0)
    this.object.position.add(temporaryVectors.positionOffset)
  }
}