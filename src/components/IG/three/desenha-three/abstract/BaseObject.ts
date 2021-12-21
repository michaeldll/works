import { Object3D } from "three";

export default abstract class BaseObject {
  public object: Object3D
  protected context: any

  constructor(context: any) {
    this.context = context
  }
}