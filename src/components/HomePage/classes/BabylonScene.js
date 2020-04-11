import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
// import '@babylonjs/core/Meshes/meshBuilder';
// Required side effects to populate the SceneLoader class.
import '@babylonjs/loaders/glTF';
import '@babylonjs/core/Loading/loadingScreen';

class BabylonScene {
	constructor() {
		this.init();
	}

	init() {
		document
			.querySelector('#canvas-container')
			.insertAdjacentHTML('afterbegin', '<canvas id="babylon-canvas"></canvas>');

		// Get the canvas element from the DOM.
		const canvas = document.getElementById('babylon-canvas');

		// Associate a Babylon Engine to it.
		const engine = new Engine(canvas);

		// Create our first scene.
		var scene = new Scene(engine);

		// This creates and positions a free camera (non-mesh)
		var camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);

		// This targets the camera to scene origin
		camera.setTarget(Vector3.Zero());

		// This attaches the camera to the canvas
		camera.attachControl(canvas, true);

		// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
		var light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);

		// Default intensity is 1. Let's dim the light a small amount
		light.intensity = 0.7;

		SceneLoader.Append('models/', 'scene.glb', scene, (scene) => {
			console.log(scene);
		});

		// Render every frame
		engine.runRenderLoop(() => {
			scene.render();
		});
	}
}

export default BabylonScene;
