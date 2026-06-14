import * as THREE from 'three'
import Experience from '../Experience'
import Vertex from '../Shaders/Sky/vertex.glsl?raw'
import Fragment from '../Shaders/Sky/fragment.glsl?raw'

export default class Sky
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Sky')
            this.debugFolder.close()
        }

        // setup
        this.parameters = {
            'topColor': '#b5eaf7', //00bdd6
            'bottomColor':'#4195b9', // 0b5daf 4195b9
            'offset': -5000,
            'multiplier': 10000,
            'minClamp': -1,
            'maxClamp': 1
        }
        this.setGeometry()
        this.setMaterial()
        this.setSky()
    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(10000, 32, 16)
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                topColor: new THREE.Uniform(new THREE.Color(this.parameters.topColor)),
                bottomColor: new THREE.Uniform(new THREE.Color(this.parameters.bottomColor)),
                offset: new THREE.Uniform(this.parameters.offset),
                multiplier: new THREE.Uniform(this.parameters.multiplier),
                minClamp: new THREE.Uniform(this.parameters.minClamp),
                maxClamp: new THREE.Uniform(this.parameters.maxClamp)
            },
            vertexShader: Vertex,
            fragmentShader: Fragment,
            side: THREE.BackSide,
        })
    }

    setSky()
    {
        this.sky = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.sky)
        if(this.debug.active)
        {
            this.debugFolder
                .addColor(this.parameters, 'topColor')
                .onChange(() => { 
                    this.material.uniforms.topColor.value.set(
                        this.parameters.topColor   
                    )})
            this.debugFolder
                .addColor(this.parameters, 'bottomColor')
                .onChange(() => { 
                    this.material.uniforms.bottomColor.value.set(
                        this.parameters.bottomColor
                    )})
            this.debugFolder
                .add(this.material.uniforms.offset, 'value')
                .min(-5000)
                .max(5)
                .step(1)
                .name('offset')
            this.debugFolder
                .add(this.material.uniforms.multiplier, 'value')
                .min(0)
                .max(50000)
                .step(1)
                .name('multiplier')
            this.debugFolder
                .add(this.material.uniforms.minClamp, 'value')
                .min(-1)
                .max(1)
                .step(0.1)
                .name('minClamp')
            this.debugFolder
                .add(this.material.uniforms.maxClamp, 'value')
                .min(-1)
                .max(1)
                .step(0.1)
                .name('maxClamp')
        }
    }
}