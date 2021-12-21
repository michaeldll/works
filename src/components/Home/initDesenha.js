import Desenhador from "desenha"
import OBJLoader from "desenha/dist/loaders/OBJLoader"
import Generic from "desenha/dist/meshes/generic"
import { fetchShaders } from "desenha/dist/utils/index"
import { lerp, map } from "../../utils"

const init = () => {
    const renderer = new Desenhador(document.querySelector('.logo-canvas'))
    const loader = new OBJLoader()
    const meshes = []

    fetchShaders('/shaders/texturedShaded/vertex.glsl', '/shaders/texturedShaded/fragment.glsl').then(({ vertex, fragment }) => {
        loader.load('/models/monitor.obj').then((geometry) => {
            const parameters = {
                position: { x: 0, y: 0, z: -1.5 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }
            }
            const monitor = new Generic({
                name: 'monitor',
                shaders: [vertex, fragment],
                locationNames: {
                    attributes: ['aPosition', 'aNormal', 'aUv'],
                    uniforms: [
                        'uProjectionMatrix',
                        'uModelMatrix',
                        'uLightColor',
                        'uLightDirection',
                        'uBaseColor',
                        'uAmbientLight',
                        'uTexture'
                    ]
                },
                parameters,
                geometry,
                gl: renderer.gl
            })

            const setShading = (mesh, deltaTime) => {
                // Base color
                renderer.gl.uniform3f(mesh.locations.uniforms.uBaseColor, 1, 1, 1);

                // Diffuse light color
                renderer.gl.uniform3f(mesh.locations.uniforms.uLightColor, 2.5, 2.5, 2.5);

                // Ambient light color
                renderer.gl.uniform3f(mesh.locations.uniforms.uAmbientLight, 0.1, 0.1, 0.1);

                // Light direction
                renderer.gl.uniform3f(mesh.locations.uniforms.uLightDirection, 0, -1, 1);
            }

            const move = (mesh, deltaTime) => {
                const zeroToOne = map(Math.sin(performance.now() * 0.0005), -1, 1, 0, 1)
                mesh.rotation[1] = zeroToOne * 2 * Math.PI
            }

            monitor.loadTexture(renderer.gl, '/textures/crt_layout.jpg').then(() => {
                monitor.addOnDrawCallback(setShading)
                monitor.addOnDrawCallback(move)
                meshes.push(monitor)
            })
        })
    })

    // Render loop
    let then = 0;
    const update = (now) => {
        now *= 0.001;  // Convert to seconds
        const deltaTime = now - then;
        then = now;

        renderer.draw(meshes, deltaTime);

        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

export default init