import { Plane } from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Fox from './Fox.js'
import Grass from './Grass.js'
import Sheep from './Sheep.js'
import Wind from './Wind.js'
import Planee from './Planee.js'

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
            this.wind = new Wind()
            this.fox = new Fox()
            this.sheep = new Sheep()
            this.grass = new Grass(this.wind)
            // this.plane = new Planee()
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
    }
}