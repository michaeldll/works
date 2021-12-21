import { Clock, Color, Raycaster, TextureLoader, Vector2, WebGLRenderer } from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { clamp } from "three/src/math/MathUtils"
import { Pane } from 'tweakpane'
import { getProxyState } from "../utils"
import MainScene from "./scenes/MainScene"

export default class WebGLController {
    private pane = new Pane()
    private clock = new Clock()
    private mouse = new Vector2()
    private raycaster = new Raycaster()
    private textureLoader = new TextureLoader()
    private gltfLoader = new GLTFLoader()
    private canvas: HTMLCanvasElement
    private renderer: WebGLRenderer
    private mainScene: MainScene

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.setRenderer()
        this.mainScene = new MainScene(this.generateContext())
    }

    public setRenderer = () => {
        this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(clamp(window.devicePixelRatio, 1, 2))
    }

    public generateContext = () => ({
        renderer: this.renderer,
        pane: this.pane,
        clock: this.clock,
        textureLoader: this.textureLoader,
        gltfLoader: this.gltfLoader,
        mouse: this.mouse,
        raycaster: this.raycaster,
        state: getProxyState({
            render: true
        })
    })

    public update = () => {
        this.mainScene.update()
    }
}

export type MainContext = ReturnType<WebGLController["generateContext"]>
