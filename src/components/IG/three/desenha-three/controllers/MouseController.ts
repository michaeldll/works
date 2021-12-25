import {
  Intersection,
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  Vector2,
  Vector3,
  Texture
} from "three";
import { isMobile, loadTexture } from "../../utils";
import Mouse from "../components/Mouse";
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
  public mouse: Mouse;
  public intersects: Intersection[];
  public raw = new Vector2();
  public event: MouseEvent
  private context: MainSceneContext;
  private target = new Vector3();
  private texture: Texture
  private alpha = 0.95

  constructor(context: MainSceneContext) {
    this.context = context;
    this.intersects = [];
    this.initObject();
  }

  private initObject = () => {
    loadTexture(this.context.textureLoader, '/textures/98crosshair.png').then((texture) => {
      this.texture = texture
      this.mouse = new Mouse(this.context, texture)
      this.updateScale()
      this.context.scene.add(this.mouse.object)
    })
  };

  private updateScale = () => {
    this.mouse.object.scale.set(this.texture.image.width * parameters.size, this.texture.image.height * parameters.size, 0);
  }

  private onPointerMove = (e) => {
    this.event = e
    const { clientX, clientY } = e.touches && e.touches.length ? e.touches[0] : e
    this.raw.x = (clientX / window.innerWidth) * 2 - 1;
    this.raw.y = -(clientY / window.innerHeight) * 2 + 1;
  };

  private onTouchStart = (e) => {
    if (this.alpha === 0.9) this.alpha = 0.3
  }

  public setEvents = () => {
    window.addEventListener("mousemove", this.onPointerMove);
    window.addEventListener("touchstart", this.onTouchStart)
    window.addEventListener("touchmove", this.onPointerMove);
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

    if (!this.mouse) return

    this.mouse.update(this.context.clock.getElapsedTime())

    this.target.set(
      (this.raw.x * viewport.width) / 2,
      (this.raw.y * viewport.height) / 2,
      0
    );
    this.mouse.object.position.lerp(this.target, this.alpha);

    // Because WebGL has centered axii, we have to add an offset to mimick the native cursor using the Windows 98 texture
    temporaryVectors.positionOffset.set(this.mouse.object.scale.x / 4, -this.mouse.object.scale.y / 4, 0)
    this.mouse.object.position.add(temporaryVectors.positionOffset)
  }
}