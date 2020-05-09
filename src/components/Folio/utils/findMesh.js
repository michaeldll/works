const findMesh = (meshName, scene) =>
    scene.meshes.find((mesh) => mesh.name === meshName)

export default findMesh
