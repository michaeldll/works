import { Color, DoubleSide, Mesh, PlaneBufferGeometry, ShaderMaterial, Texture } from "three";
import BaseObject from "../../abstract/BaseObject";
import { MainSceneContext } from "../../scenes/MainScene";

export default class Mouse extends BaseObject {
  private material: ShaderMaterial
  constructor(context: MainSceneContext, texture: Texture) {
    super(context)

    const geometry = new PlaneBufferGeometry(1, 1, 20, 20);
    this.material = new ShaderMaterial({
      vertexShader: /*glsl*/ `
        uniform float uTime;
        uniform float uProgression;
        varying vec2 vUv;
        varying float vImpulse;

        float cubicPulse( float c, float w, float x )
        {
            x = abs(x - c);
            if( x>w ) return 0.0;
            x /= w;
            return 1.0 - x*x*(3.0-2.0*x);
        }
        vec2 scale(vec2 _st, float scale) {
          return (_st - vec2(.5)) * (1. / scale) + vec2(.5);
        }
        vec2 scale(vec2 _st, float scale, vec2 center) {
          return (_st - center) * (1. / scale) + center;
        }
        float remap(float value, float start1, float stop1, float start2, float stop2) {
          return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
        }
        float cremap(float value, float start1, float stop1, float start2, float stop2) {
          return remap(clamp(value, start1, stop1), start1, stop1, start2, stop2);
        }

        void main(void) {
          vUv = uv;

          float ramp = uv.y;

          float prog = cremap(sin(uTime * 1.4), -1., 1., 0., 1.);
          float impulseWidth = 1.;
          float impulse = cubicPulse(prog, impulseWidth, ramp);
          
          vec3 offset = vec3(0.);
          // offset.y += impulse;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position + offset, 1.0);
          vImpulse = impulse;
        }
      `,
      fragmentShader: /*glsl*/ `
        varying vec2 vUv;
        varying float vImpulse;

        uniform vec3 uTint;
        uniform sampler2D uTexture;

        void main(void) {
          vec4 texel = texture2D(uTexture, vUv);
          // gl_FragColor = texel;
          vec3 color = mix(texel.rgb, texel.rgb * uTint, vImpulse);
          gl_FragColor = vec4(color, texel.a);
          // gl_FragColor = vec4(vec3(vImpulse), 1.);
        }
      `,
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uTint: { value: new Color("#ffd579") },
        uProgression: { value: 0 }
      },
      transparent: true,
      side: DoubleSide
    });
    this.object = new Mesh(geometry, this.material);
  }

  update = (elapsedTime: number) => {
    this.material.uniforms.uTime.value = elapsedTime
  }
}