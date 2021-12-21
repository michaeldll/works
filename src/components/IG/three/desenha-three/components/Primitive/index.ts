import { BufferGeometry, Material, Mesh, MeshNormalMaterial, Quaternion, Vector3 } from "three";
import { FolderApi } from "tweakpane";
import { MainContext } from "../..";
import BaseObject from '../../abstract/BaseObject'

type PrimitiveParameters = {
  position: Vector3,
  rotation: Quaternion,
  scale: Vector3
}

export default class Primitive extends BaseObject {
  parameters: PrimitiveParameters

  constructor(context: MainContext, options: { geometry: BufferGeometry, parameters: PrimitiveParameters, material?: Material }) {
    super(context)

    const { geometry, parameters, material } = options

    material ? this.object = new Mesh(geometry, material) : this.object = new Mesh(geometry, new MeshNormalMaterial())
    this.parameters = parameters

    this.object.position.copy(parameters.position)
    this.object.rotation.setFromQuaternion(parameters.rotation)
    this.object.scale.copy(parameters.scale)
  }

  public tweaks() {
    const folder: FolderApi = this.context.pane.addFolder({
      title: 'Primitive',
      expanded: false,
    });

    {
      const input = folder.addInput(this.parameters, 'position');
      input.on('change', (e) => {
        this.object.position.copy(e.value)
      })
    }

    {
      const input = folder.addInput(this.parameters, 'rotation');
      input.on('change', (e) => {
        this.object.rotation.setFromQuaternion(e.value)
      })
    }

    {
      const input = folder.addInput(this.parameters, 'scale');
      input.on('change', (e) => {
        this.object.scale.copy(e.value)
      })
    }
  }
}