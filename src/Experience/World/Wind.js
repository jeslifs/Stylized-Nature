import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Wind
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.perlinTexture = this.resources.items.perlinTexture
        this.perlinTexture.wrapS = THREE.RepeatWrapping
        this.perlinTexture.wrapT = THREE.RepeatWrapping
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.uniforms =
        {
            uTime: new THREE.Uniform(0),
            uPerlinTexture: new THREE.Uniform(this.perlinTexture),
            uWindDirection: new THREE.Uniform(
                new THREE.Vector2(-1, 1)
            ),
            uWindSpeed1: new THREE.Uniform(0.1),
            uWindSpeed2: new THREE.Uniform(0.03),
            uWindNoiseScale1: new THREE.Uniform(0.06),
            uWindNoiseScale2: new THREE.Uniform(0.043),
            uWindStrength: new THREE.Uniform(1.25)

        }

        // debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Wind')
            this.debugFolder.close()
            this.debugFolder
                .add(this.uniforms.uWindDirection.value, 'x')
                .min(-1)
                .max(1)
                .step(0.01)
                .name('Wind Direction X')

                this.debugFolder
                .add(this.uniforms.uWindDirection.value, 'y')
                .min(-1)
                .max(1)
                .step(0.01)
                .name('Wind Direction Y')

                this.debugFolder
                .add(this.uniforms.uWindSpeed1, 'value')
                .min(0)
                .max(1)
                .step(0.01)
                .name('Wind Speed 1')

                this.debugFolder
                .add(this.uniforms.uWindSpeed2, 'value')
                .min(0)
                .max(1)
                .step(0.01)
                .name('Wind Speed 2')

                this.debugFolder
                .add(this.uniforms.uWindNoiseScale1, 'value')
                .min(0)
                .max(1)
                .step(0.01)
                .name('Wind Noise Scale 1')

                this.debugFolder
                .add(this.uniforms.uWindNoiseScale2, 'value')
                .min(0)
                .max(1)
                .step(0.01)
                .name('Wind Noise Scale 2')


                this.debugFolder
                .add(this.uniforms.uWindStrength, 'value')
                .min(0)
                .max(5)
                .step(0.01)
                .name('Wind Strength')
        }

    }

    update()
    {
        this.uniforms.uTime.value = this.time.elapsed
    }
}