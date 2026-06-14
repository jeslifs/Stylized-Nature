import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Fog
{
    constructor()
    {

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Fog')
            this.debugFolder.close()            
        }

        // setup
        this.parameters = {
            'color': '#54b8c0', //00bdd6  4594b9
            'density': 0.01,
        }
        
        this.setFog()
    }

    setFog()
    {
        this.fog = new THREE.FogExp2(this.parameters.color, this.parameters.density)
        this.scene.fog = this.fog

        if(this.debug.active)
        {
            this.debugFolder
                .addColor(this.parameters, 'color')
                .name('color')
                .onChange(() =>
                {
                    this.fog.color.set(this.parameters.color)
                })

            this.debugFolder
                .add(this.parameters, 'density')
                .min(0)
                .max(0.1)
                .step(0.0001)
                .name('density')
                .onChange(() =>
                {
                    this.fog.density = this.parameters.density
                })
        }     
    }
}