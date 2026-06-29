import * as THREE from 'three'
import Experience from '../Experience.js'
import Vertex from '../Shaders/Loading/vertex.glsl?raw'
import Fragment from '../Shaders/Loading/fragment.glsl?raw'
import gsap from 'gsap'

export default class Loading
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setCurtain()
        this.setHTML()
    }

    setCurtain()
    {
        this.geometry = new THREE.PlaneGeometry(2, 2)
        
        this.material = new THREE.ShaderMaterial({
            transparent: true,
            depthTest: false,
            uniforms: {
                uProgress: { value: 0.0 }
            },
            vertexShader: Vertex,
            fragmentShader: Fragment
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.renderOrder = 1
        
        this.scene.add(this.mesh)
    }

    setHTML()
    {
        document.body.classList.add('loading-active')
        
        const style = document.createElement('style')
        style.innerHTML = `
            body.loading-active .sheep-label {
                display: none !important;
                opacity: 0 !important;
            }
        `
        document.head.appendChild(style)

        this.overlay = document.createElement('div')
        this.overlay.style.position = 'absolute'
        this.overlay.style.top = '0'
        this.overlay.style.left = '0'
        this.overlay.style.width = '100%'
        this.overlay.style.height = '100%'
        this.overlay.style.display = 'flex'
        this.overlay.style.flexDirection = 'column'
        this.overlay.style.justifyContent = 'center'
        this.overlay.style.alignItems = 'center'
        this.overlay.style.zIndex = '1000'
        this.overlay.style.pointerEvents = 'none'
        this.overlay.style.fontFamily = 'sans-serif'
        this.overlay.style.color = '#ffffff'
        this.overlay.style.backgroundColor = 'transparent'

        // 0%
        this.percentText = document.createElement('h1')
        this.percentText.innerText = '0%'
        this.percentText.style.fontSize = '4rem'
        this.overlay.appendChild(this.percentText)

        // Start Button
        this.startButton = document.createElement('button')
        this.startButton.innerText = 'ENTER EXPERIENCE'
        this.startButton.style.padding = '15px 40px'
        this.startButton.style.fontSize = '1.5rem'
        this.startButton.style.cursor = 'pointer'
        this.startButton.style.display = 'none'
        this.startButton.style.pointerEvents = 'auto'
        this.startButton.style.border = 'none'
        this.startButton.style.borderRadius = '8px'
        this.startButton.style.backgroundColor = '#ffffff'
        this.startButton.style.color = '#000000'
        this.startButton.style.fontWeight = 'bold'
        
        this.startButton.addEventListener('click', () => {
            this.startAnimation()
        })

        this.overlay.appendChild(this.startButton)
        document.body.appendChild(this.overlay)
    }

    updateProgress(percentage)
    {
        this.percentText.innerText = `${percentage}%`
        
        if(percentage >= 100)
        {
            this.setReady()
        }
    }

    setReady()
    {
        this.percentText.style.display = 'none'
        this.startButton.style.display = 'block'
        this.overlay.style.pointerEvents = 'auto'
    }

    startAnimation()
    {
        this.overlay.style.display = 'none'
        document.body.classList.remove('loading-active')
        
        gsap.to(this.material.uniforms.uProgress, {
            value: 1.5,
            duration: 2,
            ease: 'power2.inOut',
            onComplete: () =>
            {
                this.scene.remove(this.mesh)
                this.geometry.dispose()
                this.material.dispose()
            }
        })
    }
}