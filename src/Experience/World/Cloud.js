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
            'soft': 0.3,
            'count': 15,
            'size': 32.83342127986207 * 2
        }

        // setup
        this.setGeometry()
        this.setMaterial()
        this.setCloud()
    }

    setGeometry()
    {
        this.geometry = new THREE.IcosahedronGeometry(2, 6)
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
        this.clouds = new THREE.InstancedMesh(
            this.geometry,
            this.material,
            this.parameters.count
        )
        const dummy = new THREE.Object3D()

        for(let i = 0; i < this.parameters.count; i++)
        {
            const x = (Math.random() - 0.5) * this.parameters.size
            const z = (Math.random() - 0.5) * this.parameters.size

            const y = 11.5 + (Math.random() - 0.5) * 1.5

            const scale = 0.5 + Math.random() * 1.25

            dummy.position.set(x, y, z)

            dummy.scale.set(
                scale * 1.5,
                scale,
                scale
            )

            dummy.rotation.y = Math.random() * Math.PI * 2

            dummy.updateMatrix()

            this.clouds.setMatrixAt(i, dummy.matrix)
        }

        this.clouds.instanceMatrix.needsUpdate = true
        this.clouds.customDepthMaterial = this.customMaterial.depthMaterial
        this.clouds.castShadow = true
        this.scene.add(this.clouds)
    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.elapsed
    }
}