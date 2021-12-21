import { Color, Matrix4, OrthographicCamera, PerspectiveCamera, Texture, TextureLoader, Vector3 } from "three";
import { Viewport } from "../desenha-three/types";

export function ready(cb: Function) {
  if (document.readyState != 'loading') {
    cb();
  } else {
    document.addEventListener('DOMContentLoaded', (e) => cb());
  }
}

export function map(
  value: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
) {
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

export function lerp(start: number, end: number, alpha: number) {
  return (1 - alpha) * start + alpha * end;
}

/**
 * @returns Average of an array
 * @type {Number}
 */
export function getAverage(arr: Array<number>) {
  let sum = 0;

  for (let index = 0; index < arr.length; index++) {
    sum = sum + arr[index];
  }

  const avg = sum / arr.length;

  return avg !== Infinity ? avg : 0;
}

/**
 * @returns A number in the range [min, max]
 * @type {Number}
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * @returns Max FPS tied to Screen refresh rate
 * getMaxFPS().then(fps => ...);
 */
export const getMaxFPS = () =>
  new Promise((resolve) =>
    requestAnimationFrame((t1) =>
      requestAnimationFrame((t2) => resolve(1000 / (t2 - t1)))
    )
  );

export const getViewport = (camera: PerspectiveCamera) => {
  const fov = camera.fov * (Math.PI / 180);
  const height = 2 * Math.tan(fov / 2) * camera.position.z;
  const width = height * camera.aspect;

  return {
    height,
    width,
  };
};

export const rectToThree = (
  viewport: { width: number; height: number },
  rect: DOMRect
) => ({
  x: -viewport.width / 2 + (rect.left / window.innerWidth) * viewport.width,
  y: viewport.height / 2 - (rect.top / window.innerHeight) * viewport.height,
  w: viewport.width * (rect.width / window.innerWidth),
  h: viewport.height * (rect.height / window.innerHeight),
});

export function round(value: number, significantNumbers: number) {
  return Number.parseFloat(value.toFixed(significantNumbers));
}

/**
 * @returns Normalized value
 * @type {Number}
 */
export function normalize(val: number, max: number, min: number) {
  return (val - min) / (max - min);
}

export async function fetchShaders(vertexPath: string, fragmentPath: string) {
  const vertex = await fetch(vertexPath)
    .then(result => result.text());
  const fragment = await fetch(fragmentPath)
    .then(result => result.text());
  return { vertex, fragment }
}

export const setMatrixScale = (matrix: Matrix4, scale: Vector3) => {
  const arrayed = matrix.toArray()
  arrayed[0] = scale.x
  arrayed[5] = scale.y
  arrayed[10] = scale.z

  return matrix.fromArray(arrayed)
}


export function isTouchDevice() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

export function getProxyState(fromState) {
  const callbacks = new Map();

  const handler = {
    set(obj: Object, propName: string, value: any) {
      const previousValue = obj[propName];
      obj[propName] = value;
      for (const callback of callbacks.get(propName) || [])
        callback(value, previousValue);
      return true;
    },
  };

  const target: typeof fromState & {
    onChange: (propName: string, callback: Function) => Function;
  } = {
    onChange: (propName: string, callback: Function) => {
      if (!callbacks.has(propName)) callbacks.set(propName, []);
      callbacks.get(propName).push(callback);

      return () => {
        const arr = callbacks.get(propName);
        const index = arr.indexOf(callback);
        arr.splice(index, 1);
        if (arr.length === 0) callbacks.delete(propName);
      };
    },
    ...fromState,
  };

  const proxied: typeof fromState & {
    onChange: (propName: string, callback: Function) => Function;
  } = new Proxy(target, handler);
  return proxied;
}

export const getOOB = (
  position: Vector3,
  scale: Vector3,
  viewport: Viewport,
  padding = [0, 0]
) => ({
  top: position.y - scale.y / 2 > viewport.height / 2 + padding[1],
  right: position.x - scale.x / 2 > viewport.width / 2 + padding[0],
  bottom: position.y + scale.y / 2 < -viewport.height / 2 - padding[1],
  left: position.x + scale.x / 2 < -viewport.width / 2 - padding[0],
});

export const getNthCharacter = (number: number, digit: number) => {
  const character = ("" + Math.abs(number)).charAt(digit);
  if (character.length === 0) return;

  return parseInt(character);
};

export function roundedRect(ctx, x, y, width, height, radius) {
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
  ctx.lineTo(x + width - radius, y + height);
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  ctx.lineTo(x + width, y + radius);
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
  ctx.lineTo(x + radius, y);
  ctx.quadraticCurveTo(x, y, x, y + radius);
}

/**
 * @param {Function} func
 * @param {Number} limit
 */
export function throttle(func: Function, limit: number) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function isMobile() {
  // return window.innerWidth <= 810
  return isTouchDevice();
}

export const createRetinaCanvas = function (w, h, ratio) {
  if (!ratio) {
    ratio = window.devicePixelRatio;
  }
  const canvas = document.createElement("canvas");
  canvas.width = w * ratio;
  canvas.height = h * ratio;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
  return canvas;
};

export function createMSDFShader(opt) {
  opt = opt || {};
  var opacity = typeof opt.opacity === 'number' ? opt.opacity : 1;
  var alphaTest = typeof opt.alphaTest === 'number' ? opt.alphaTest : 0.0001;
  var precision = opt.precision || 'highp';
  var color = opt.color;
  var map = opt.map;
  var negate = typeof opt.negate === 'boolean' ? opt.negate : true;

  // remove to satisfy r73
  delete opt.map;
  delete opt.color;
  delete opt.precision;
  delete opt.opacity;
  delete opt.negate;

  return Object.assign({
    uniforms: {
      opacity: { type: 'f', value: opacity },
      map: { type: 't', value: map || new Texture() },
      color: { type: 'c', value: new Color(color) }
    },
    vertexShader: [
      'attribute vec2 uv;',
      'attribute vec4 position;',
      'uniform mat4 projectionMatrix;',
      'uniform mat4 modelViewMatrix;',
      'varying vec2 vUv;',
      'void main() {',
      'vUv = uv;',
      'gl_Position = projectionMatrix * modelViewMatrix * position;',
      '}'
    ].join('\n'),
    fragmentShader: [
      '#ifdef GL_OES_standard_derivatives',
      '#extension GL_OES_standard_derivatives : enable',
      '#endif',
      'precision ' + precision + ' float;',
      'uniform float opacity;',
      'uniform vec3 color;',
      'uniform sampler2D map;',
      'varying vec2 vUv;',

      'float median(float r, float g, float b) {',
      '  return max(min(r, g), min(max(r, g), b));',
      '}',

      'void main() {',
      '  vec3 sample = ' + (negate ? '1.0 - ' : '') + 'texture2D(map, vUv).rgb;',
      '  float sigDist = median(sample.r, sample.g, sample.b) - 0.5;',
      '  float alpha = clamp(sigDist/fwidth(sigDist) + 0.5, 0.0, 1.0);',
      '  gl_FragColor = vec4(color.xyz, alpha * opacity);',
      alphaTest === 0
        ? ''
        : '  if (gl_FragColor.a < ' + alphaTest + ') discard;',
      '}'
    ].join('\n')
  }, opt);
};

export function loadTexture(loader: TextureLoader, url: string) {
  return new Promise<Texture>((resolve, reject) => {
    loader.load(url, (texture) => resolve(texture), () => { }, (event) => reject(event))
  })
}