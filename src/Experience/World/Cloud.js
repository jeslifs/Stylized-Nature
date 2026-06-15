import * as THREE from 'three'
import Experience from '../Experience'
import Material from './Material'
import Vertex from '../Shaders/Cloud/vertex.glsl?raw'
import Fragment from '../Shaders/Cloud/fragment.glsl?raw'


export default class Cloud
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources
        this.perlinTexture = this.resources.items.perlinTexture
        this.perlinTexture.wrapS = THREE.RepeatWrapping
        this.perlinTexture.wrapT = THREE.RepeatWrapping
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Cloud')
            this.debugFolder.close()
        }

        this.parameters = {
            'cloud': '#ffffff',
            'shadow': '#cccccc',
            'soft': 0.3
        }

        // setup
        this.setGeometry()
        this.setMaterial()
        this.setCloud()
    }

    setGeometry()
    {
        this.geometry = new THREE.IcosahedronGeometry(2, 64)
    }

    setMaterial()
    {
        this.uniforms = {
            uCloudColor: new THREE.Uniform(new THREE.Color(this.parameters.cloud)),
            uCloudShadow:  new THREE.Uniform(new THREE.Color(this.parameters.shadow)),
            uSoft: new THREE.Uniform(this.parameters.soft),
            uPerlinTexture: new THREE.Uniform(this.perlinTexture),
            uTime: new THREE.Uniform(0)
        }
        this.customMaterial = new Material(Vertex, Fragment, this.uniforms)
        this.material = this.customMaterial.baseMaterial
        this.material.transparent = true
        
    }

    setCloud()
    {
        this.cloud = new THREE.Mesh(this.geometry, this.material)
        this.cloud.scale.x = 1.5
        this.cloud.position.y = 3.5
        this.cloud.customDepthMaterial = this.customMaterial.depthMaterial
        this.cloud.castShadow = true
        this.scene.add(this.cloud)
    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.elapsed
    }
}