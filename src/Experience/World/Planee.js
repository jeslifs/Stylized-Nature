import * as THREE from 'three'
import Experience from '../Experience'

export default class Planee
{
    constructor()
    {
            this.experience = new Experience()
            this.scene = this.experience.scene
            this.resources = this.experience.resources
            this.terrain = this.resources.items.terrainTexture

            this.setPlane()
    }

    setPlane()
    {
        this.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(),
            new THREE.MeshLambertMaterial({
                map: this.terrain
            })
        )
        this.scene.add(this.plane)
    }
}