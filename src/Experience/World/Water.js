import * as THREE from 'three'
import Experience from '../Experience'
import Material from './Material'
import Vertex from '../Shaders/Water/vertex.glsl?raw'
import Fragment from '../Shaders/Water/fragment.glsl?raw'

export default class Water
{
    constructor(wind)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources
        this.terrain = this.resources.items.terrainTexture
        this.perlinTexture = this.resources.items.perlinTexture
        this.perlinTexture.wrapS = THREE.RepeatWrapping
        this.perlinTexture.wrapT = THREE.RepeatWrapping
        this.wind = wind
        this.debug = this.experience.debug

        // setup
        this.subdivisions = 100
        this.size = 32.83342127986207 * 2

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Water')
            this.debugFolder.close()
        }

        this.parameters = {
            // 'deepColor': '#3544eab3', //94bf1d
            'deepColor': '#0b5daf', //
            // 'shallowColor': '#5cebf3', // fcff5c
            'shallowColor': '#00f2ff' // 
        }
        this.setGeometry()
        this.setMaterial()
        this.setWater()
    }

    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(this.size, this.size, this.subdivisions, this.subdivisions)
    }

    setMaterial()
    {
        this.uniforms = {
            uTerrain: new THREE.Uniform(this.terrain),
            uDeepColor: new THREE.Uniform(new THREE.Color(this.parameters.deepColor)),
            uShallowColor: new THREE.Uniform(new THREE.Color(this.parameters.shallowColor)),
            uTime: new THREE.Uniform(0),
            uPerlinTexture: new THREE.Uniform(this.perlinTexture),
            uWindDirection: new THREE.Uniform(
                new THREE.Vector2(-1, 1)
            ),
            uWindSpeed1: new THREE.Uniform(0.43),
            uWindSpeed2: new THREE.Uniform(0.84),
            uWindNoiseScale1: new THREE.Uniform(0.28),
            uWindNoiseScale2: new THREE.Uniform(0.043),
            uWindStrength: new THREE.Uniform(0.5),
            uSize: new THREE.Uniform(this.size)
        }
        this.customMaterial = new Material(Vertex, Fragment, this.uniforms)
        this.material = this.customMaterial.baseMaterial  
        this.material.transparent = true
        // this.material.wireframe = true
    }

    setWater()
    {
        this.water = new THREE.Mesh(
            this.geometry,
            this.material
        )
        this.water.rotation.x = - Math.PI / 2
        this.water.receiveShadow = true
        this.scene.add(this.water)

        if(this.debug.active)
        {
            this.debugFolder.addColor(this.parameters, 'deepColor').onChange(() => { this.material.uniforms.uDeepColor.value.set(this.parameters.deepColor) })
            this.debugFolder.addColor(this.parameters, 'shallowColor').onChange(() => { this.material.uniforms.uShallowColor.value.set(this.parameters.shallowColor) })
            // this.debugFolder.add(this.parameters, 'waterLevel').min(0).max(5).step(0.01).onChange(() => { this.water.position.y = this.parameters.waterLevel })
        }
    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.elapsed
    }
}