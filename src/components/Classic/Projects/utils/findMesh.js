/**
 * @param {String} meshName
 * @param {BABYLON.Scene} scene
 */
const findMesh = (meshName, scene) =>
    scene.meshes.find((mesh) => mesh.name === meshName)

export default findMesh
