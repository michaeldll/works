import { PerspectiveCamera, Scene } from "three"
import { clamp } from "three/src/math/MathUtils"
import { MainContext } from ".."
import { getViewport } from "../../utils"
import { Viewport } from "../types"

export default abstract class BaseScene {
  protected context: MainContext
  protected scene = new Scene()
  protected camera: PerspectiveCamera
  protected viewport: Viewport

  constructor(context: MainContext) {
    this.context = context
  }

  protected onResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const pixelRatio = clamp(window.devicePixelRatio, 1, 2);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.context.renderer.setSize(width, height);
    this.context.renderer.setPixelRatio(pixelRatio);

    this.viewport = getViewport(this.camera);
  }
}