import { MouseController } from "../controllers/MouseController";

export type Viewport = {
  height: number
  width: number
}

declare global {
  interface Window { mouseController: MouseController; }
}

window.mouseController = window.mouseController;