import Experience from '../Experience.js'
import { Howl } from 'howler'

export default class Sound
{
    constructor()
    {
        this.experience = new Experience()
        this.unmutesvg = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
        `

        this.mutesvg = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
        `

        this.showMicsSvg = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="22"></line>
            </svg>
        `

        this.hideMicsSvg = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="1" y1="1" x2="23" y2="23"></line>
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V5a3 3 0 0 0-5.94-.6"></path>
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                <line x1="12" y1="19" x2="12" y2="22"></line>
            </svg>
        `
        
        this.ismuted = false
        
        this.setSound()
        this.setSoundSetting()
    }

    setSound()
    {
        this.backgroundSound = new Howl({
            src: ['sound/background.mp3'], 
            loop: true,
            volume: 0.5, 
            // html5: true
        })

        this.waterSound = new Howl({
            src: ['sound/water.mp3'], 
            loop: true,
            volume: 0.1,
            // html5: true
        })
        
        this.sounds = [this.backgroundSound, this.waterSound]

        this.sounds.forEach(sound => {
            sound.play()
        })
    }

    setSoundSetting()
    {
        const muteButton = document.getElementById('muteButton')
        const hideButton = document.getElementById('hideButton')
        const mics = document.getElementsByClassName('mic-btn')

        if(hideButton)
        {
            hideButton.innerHTML = this.showMicsSvg

            hideButton.addEventListener('click', () => {
                document.body.classList.toggle('hide-mics')
                
                if(document.body.classList.contains('hide-mics'))
                {
                    hideButton.innerHTML = this.hideMicsSvg
                    
                    // hide all mics
                    for(let i = 0; i < mics.length; i++)
                    {
                        mics[i].style.display = 'none'
                    }
                }
                else
                {
                    hideButton.innerHTML = this.showMicsSvg
                    
                    // show all mics
                    for(let i = 0; i < mics.length; i++)
                    {
                        mics[i].style.display = 'block' 
                    }
                }
            })
        }
        
        if(muteButton)
        {
            muteButton.innerHTML = this.unmutesvg
            
            muteButton.addEventListener('click', () => {
                this.ismuted = !this.ismuted

                if(this.ismuted)
                {
                    Howler.mute(true)
                    muteButton.innerHTML = this.mutesvg
                }
                else
                {
                    Howler.mute(false)
                    muteButton.innerHTML = this.unmutesvg
                }
            })
        }
    }
}