import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
// import Fox from './Fox.js'
import Grass from './Grass.js'
import Sheep from './Sheep.js'
import Wind from './Wind.js'
import Water from './Water.js'
import Sky from './Sky.js'
import Fog from './Fog.js'
import Cloud from './Cloud.js'
import Floor from './Floor.js'
import Sound from './Sound.js'

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
            // this.fox = new Fox()
            this.floor = new Floor()
            this.flock = []

            for(let i = 0; i < 5; i++)
            {
                const sheepId = i + 1
                // const sheepPosition = this.floor.getSheepPosition(sheepId)
                const sheepPath = this.floor.getSheepPath(sheepId)
                const sheep = new Sheep(sheepId, sheepPath)
                
                this.flock.push(sheep)
            }

            // this.sheep = new Sheep(5)
            this.grass = new Grass(this.wind)
            this.water = new Water()
            this.fog = new Fog()
            this.cloud = new Cloud()
            this.sound = new Sound()
            this.environment = new Environment()
            
        })
        // this.setAxes()
    }

    setAxes()
    {
        this.axes = new THREE.AxesHelper(5)
        this.scene.add(this.axes)
    }

    update()
    {
        // if(this.fox)
        //     this.fox.update()
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