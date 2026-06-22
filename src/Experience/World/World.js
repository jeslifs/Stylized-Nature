import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Fox from './Fox.js'
import Grass from './Grass.js'
import Sheep from './Sheep.js'
import Wind from './Wind.js'
import Water from './Water.js'
import Sky from './Sky.js'
import Fog from './Fog.js'
import Cloud from './Cloud.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.sky = new Sky()
            this.wind = new Wind()
            this.fox = new Fox()
            this.flock = []

            for(let i = 0; i < 5; i++)
            {
                const randomX = (Math.random() - 0.5) * 20
                const randomZ = (Math.random() - 0.5) * 20
                const randomPosition = new THREE.Vector3(randomX, 0, randomZ)
            
                const sheep = new Sheep(i + 1, randomPosition)
                this.flock.push(sheep)
            }
            // this.sheep = new Sheep(5)
            this.grass = new Grass(this.wind)
            this.water = new Water()
            this.fog = new Fog()
            this.cloud = new Cloud()
            this.environment = new Environment()
        })
    }

    update()
    {
        if(this.fox)
            this.fox.update()
        if(this.grass)
            this.grass.update()
        if(this.wind)
            this.wind.update()
        if(this.water)
            this.water.update()
        if(this.cloud)
            this.cloud.update()
        // if(this.sheep)
        //     this.sheep.update()
        if(this.flock)
        {
            for(const sheep of this.flock)
            {
                sheep.update()
            }
        }

    }
}