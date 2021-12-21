import { Object3D } from "three";

export default abstract class BaseObject {
  protected context: any
  protected object: Object3D

  constructor(context: any) {
    this.context = context
  }
}