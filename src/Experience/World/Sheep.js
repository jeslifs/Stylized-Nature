import * as THREE from 'three'
import Experience from '../Experience.js'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { Howl, Howler } from 'howler'

export default class Sheep
{
    constructor(id, sheepPath)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.raycaster = new THREE.Raycaster()
        this.id = id
        this.isRecording = false
        this.audio = null
        this.playbackTimer = null
        this.curve = sheepPath
        this.pathProgress = Math.random() 
        this.speed = 0.005 + (Math.random() * 0.005)

        // Debug
        // if(this.debug.active)
        // {
        //     this.debugFolder = this.debug.ui.addFolder('Fox').close()
        // }

        // Resource
        this.resource = this.resources.items.sheepModel

        this.setModel()
    }

    setModel()
    {
        let labelposition
        this.model = this.resource.scene.clone()

        const whiteSheep = this.model.getObjectByName('white')
        const blackSheep = this.model.getObjectByName('black')

        const variants = []
        variants.push(whiteSheep)
        variants.push(blackSheep)

        if(variants.length > 0)
        {
            variants.forEach(variant => variant.visible = false)

            const randomIndex = Math.floor(Math.random() * variants.length)
            variants[randomIndex].visible = true
            labelposition = variants[randomIndex].position
        }

        // this.model.position.copy(this.sheepPosition)
        // this.model.rotation.y = Math.PI / 2
        this.model.scale.set(.8, .8, .8)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
        this.setHTMLUI(labelposition)
    }


    setHTMLUI(position)
    {
        this.labelElement = document.createElement('div')
        this.labelElement.className = 'sheep-label'
        
        this.labelElement.innerHTML = `
        <div class="label-content">
            <div class="sheep-name" contenteditable="true" spellcheck="false" title="Click to edit name">Sheep #${this.id}</div>
            <button class="mic-btn" id="mic-${this.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="22"></line>
                </svg>
            </button>
        </div>
        `

        this.sheepLabel = new CSS2DObject(this.labelElement)
        this.sheepLabel.position.copy(position)
        this.sheepLabel.position.y = 1.5
        this.model.add(this.sheepLabel)

        // Mic Button
        const btn = this.labelElement.querySelector('.mic-btn')
        btn.addEventListener('click', () =>
        {
            this.recordAudio(btn)
        })

        // Editable Name
        const nameElement = this.labelElement.querySelector('.sheep-name')
        nameElement.addEventListener('keydown', (event) => {
            if(event.key === 'Enter')
            {
                event.preventDefault()
                nameElement.blur()
            }
        })
        nameElement.addEventListener('blur', () => {
            const newName = nameElement.innerText.trim()

            if(newName === '')
            {
                nameElement.innerText = 'Unnamed Sheep :('
            }
            // console.log('Sheep Name:', nameElement.innerText)
        })
    }

    recordAudio(btn)
    {

        if(this.isRecording)
            return

        this.isRecording = true
        btn.style.color = '#ff4757'

        if(this.sound)
        {
            this.sound.unload()
            clearTimeout(this.playbackTimer)
        }

        let chunks = []
        navigator.mediaDevices.getUserMedia( { audio: true }).then((stream) => {
            const mediaRecorder = new MediaRecorder(stream)

            mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data)
            }

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(chunks, { type: 'audio/webm' })
                const newUrl = URL.createObjectURL(audioBlob)

                this.sound = new Howl({
                    src: [newUrl],
                    format: ['webm'],
                    volume: 1.0,
                    panningModel: 'HRTF',
                    refDistance: 3,
                    maxDistance: 25,
                    rolloffFactor: 1
                })

                stream.getTracks().forEach(track => track.stop())
                this.isRecording = false
                btn.style.color = '#5cff5c'
                
                // random playback
                this.scheduleRandomPlay()
            }

            mediaRecorder.start()

            // 5 seconds
            setTimeout(() => {
                if(mediaRecorder.state === 'recording') {
                    mediaRecorder.stop()
                }
            }, 5000)

        }).catch((err) => {
            console.error("Microphone access denied:", err)
            this.isRecording = false
            btn.style.color = this.sound ? '#5cff5c' : 'white'
        })
    }

    scheduleRandomPlay()
    {
        if(!this.sound)
            return

        const randomDelay = 4000 + Math.random() * 8000

        this.playbackTimer = setTimeout(() => {
            if(this.sound) 
            {
                const soundId = this.sound.play()
                
                const position = this.model.position
                // console.log(position)
                
                this.sound.pos(position.x, position.y, position.z, soundId)

                this.sound.once('end', () => {
                    this.scheduleRandomPlay()
                }, soundId)
            }
        }, randomDelay)
    }

    update()
    {

        if(this.curve)
        {
            const delta = this.time.delta / 1000
 
            this.pathProgress += this.speed * delta
            this.pathProgress = this.pathProgress % 1

            const currentPosition = this.curve.getPointAt(this.pathProgress)
            this.model.position.copy(currentPosition)

            const tangent = this.curve.getTangentAt(this.pathProgress).normalize()
            this.model.lookAt(currentPosition.clone().add(tangent))
        }
        
        if(this.sheepLabel && this.camera.instance)
        {
            // Positions in the 3D world
            const cameraPosition = this.camera.instance.position

            Howler.pos(cameraPosition.x, cameraPosition.y, cameraPosition.z)
            const cameraDirection = new THREE.Vector3()
            this.camera.instance.getWorldDirection(cameraDirection)
            Howler.orientation(cameraDirection.x, cameraDirection.y, cameraDirection.z, 0, 1, 0)

            const labelPosition = new THREE.Vector3()
            this.sheepLabel.getWorldPosition(labelPosition)

            // Direction from Camera to the Label
            const direction = labelPosition.clone().sub(cameraPosition).normalize()

            // Shoot the Raycaster
            this.raycaster.set(cameraPosition, direction)

            // Distance to the label
            const distanceToLabel = cameraPosition.distanceTo(labelPosition)

            const intersects = this.raycaster.intersectObjects(this.scene.children, true)

            let occluded = false

            for(const hit of intersects)
            {
                if(hit.object.isMesh && hit.distance < distanceToLabel)
                {
                    occluded = true
                    break // hidden
                }
            }
            
            if(occluded)
            {
                this.labelElement.classList.remove('visible')
            }
            else
            {
                this.labelElement.classList.add('visible')
            }
        }
    }
}