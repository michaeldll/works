import WebGLController from "./desenha-three";

export default function init(canvas: HTMLCanvasElement) {
  const controller = new WebGLController(canvas)

  const update = () => {
    controller.update()
    requestAnimationFrame(update)
  }

  requestAnimationFrame(update)
}