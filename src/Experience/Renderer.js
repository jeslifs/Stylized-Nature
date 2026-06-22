import * as THREE from 'three'
import Experience from './Experience.js'
import { CSS2DRenderer } from 'three/examples/jsm/Addons.js'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()
        this.setHtmlInstance()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFShadowMap
        this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    setHtmlInstance()
    {
        this.htmlInstance = new CSS2DRenderer()
        this.htmlInstance.setSize(this.sizes.width, this.sizes.height)
        this.htmlInstance.domElement.style.position = 'absolute'
        this.htmlInstance.domElement.style.top = '0px'
        this.htmlInstance.domElement.style.left = '0px'
        this.htmlInstance.domElement.style.pointerEvents = 'none'
        document.body.appendChild(this.htmlInstance.domElement)
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.htmlInstance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
        this.htmlInstance.render(this.scene, this.camera.instance)
    }
}