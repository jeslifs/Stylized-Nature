import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        // this.time = this.experience.time
        // this.debug = this.experience.debug

        // Debug
        // if(this.debug.active)
        // {
        //     this.debugFolder = this.debug.ui.addFolder('Floor').close()
        // }

        // Resource
        this.model = this.resources.items.GroundModel

        this.setFloor()
    }

    setFloor()
    {
        this.floor = this.model.scene
        this.scene.add(this.floor)

        this.floor.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                // console.log(child)
                child.castShadow = true
            }
        })
    }

    // getSheepPosition(id)
    // {
    //     const position = this.floor.getObjectByName(`sheep${id}`)
        
    //     if(position)
    //     {
    //         const sheepPosition = new THREE.Vector3()
    //         position.getWorldPosition(sheepPosition)
    //         return sheepPosition
    //     }
    //     return new THREE.Vector3(0, 0, 0)
    // }

    getSheepPath(id)
    {
        const pathPoints = {
            1: [
                new THREE.Vector3(-22.415678024291992, 0, -19.63092041015625),
                new THREE.Vector3(-18.95682716369629, 0, -25.64273452758789),
                new THREE.Vector3(-15.557269096374512, 0, -22.045528411865234),
                new THREE.Vector3(-7.453669548034668, 0, -12.400269508361816),
                new THREE.Vector3(-16.249038696289062, 0, -6.1743340492248535),
                new THREE.Vector3(-16.011859893798828, 0, 5.3999762535095215),
                new THREE.Vector3(-20.360132217407227, 0, 13.997697830200195),
                new THREE.Vector3(-28.200199127197266, 0, 14.129463195800781),
                new THREE.Vector3(-28.247634887695312, 0, -3.374309539794922),
                new THREE.Vector3(-22.415678024291992, 0, -19.63092041015625)
            ],
            2: [
                new THREE.Vector3(0.4014606475830078, 0, -23.668041229248047),
                new THREE.Vector3(11.27214241027832, 0, -24.0238094329834),
                new THREE.Vector3(16.331951141357422, 0, -14.536669731140137),
                new THREE.Vector3(5.345842361450195, 0, -6.396702766418457),
                new THREE.Vector3(-9.560168266296387, 0, -6.369251728057861),
                new THREE.Vector3(-9.639227867126465, 0, -17.239933013916016),
                new THREE.Vector3(-17.031291961669922, 0, -26.450363159179688),
                new THREE.Vector3(-7.6100358963012695, 0, -26.812719345092773),
                new THREE.Vector3(0.4014606475830078, 0, -23.668041229248047)
            ],
            3: [
                new THREE.Vector3(-19.810863494873047, 0, -0.27282142639160156),
                new THREE.Vector3(-13.549348831176758, 0, -5.870235443115234),
                new THREE.Vector3(4.096736907958984, 0, -6.059978485107422),
                new THREE.Vector3(15.988604545593262, 0, -3.128187894821167),
                new THREE.Vector3(20.352689743041992, 0, 9.869196891784668),
                new THREE.Vector3(14.660404205322266, 0, 19.214033126831055),
                new THREE.Vector3(1.520711898803711, 0, 19.30890464782715),
                new THREE.Vector3(-12.196114540100098, 0, 19.387964248657227),
                new THREE.Vector3(-19.810863494873047, 0, -0.27282142639160156)
            ],
            4: [
                new THREE.Vector3(23.809438705444336, 0, 1.8532042503356934),
                new THREE.Vector3(27.485706329345703, 0, 4.106400489807129),
                new THREE.Vector3(27.24852752685547, 0, 10.273043632507324),
                new THREE.Vector3(18.828689575195312, 0, 6.478186130523682),
                new THREE.Vector3(11.713333129882812, 0, -2.376481533050537),
                new THREE.Vector3(-1.188741683959961, 0, -5.039249897003174),
                new THREE.Vector3(-1.4193319082260132, 0, -12.516962051391602),
                new THREE.Vector3(0.7877460718154907, 0, -24.34294891357422),
                new THREE.Vector3(7.447719573974609, 0, -24.741409301757812),
                new THREE.Vector3(17.625526428222656, 0, -12.377766609191895),
                new THREE.Vector3(23.809438705444336, 0, 1.8532042503356934)
            ],
            5: [
                new THREE.Vector3(14.631624221801758, 0, 25.959007263183594),
                new THREE.Vector3(2.8485937118530273, 0, 20.323644638061523),
                new THREE.Vector3(3.0462424755096436, 0, 28.921367645263672),
                new THREE.Vector3(-21.240842819213867, 0, 28.20983123779297),
                new THREE.Vector3(-29.115171432495117, 0, 24.272666931152344),
                new THREE.Vector3(-29.3997859954834, 0, 17.157310485839844),
                new THREE.Vector3(-19.93769645690918, 0, 16.755617141723633),
                new THREE.Vector3(10.055341720581055, 0, 29.60977554321289),
                new THREE.Vector3(23.489723205566406, 0, 29.297348022460938),
                new THREE.Vector3(29.192764282226562, 0, 16.2795352935791),
                new THREE.Vector3(20.14228630065918, 0, 16.558488845825195),
                new THREE.Vector3(14.631624221801758, 0, 25.959007263183594)
            ],
        }

        if(pathPoints[id])
        {

            const curve = new THREE.CatmullRomCurve3(pathPoints[id], true)
            // console.log(curve)

            // const lineGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(100))
            // const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 })
            // const lineMesh = new THREE.Line(lineGeometry, lineMaterial)
            // this.scene.add(lineMesh)

            return curve
        }
        return null
        
    }
    
}