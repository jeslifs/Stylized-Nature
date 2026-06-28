import Experience from '../Experience.js'
import { Howl } from 'howler'

export default class Sound
{
    constructor()
    {
        this.experience = new Experience()
        
        this.setSound()
        this.setSoundSetting()
    }

    setSound()
    {

    }

    setSoundSetting()
    {
        const hideButton = document.getElementById('hideButton')
        const mics = document.getElementsByClassName('mic-btn')

        hideButton.addEventListener('click', () => {
            document.body.classList.toggle('hide-mics')
            
            if(document.body.classList.contains('hide-mics'))
            {
                hideButton.innerText = 'Show Mics'
                for(let i = 0; i < mics.length; i++)
                {
                    mics[i].style.display = 'none'
                }
            }
            else
            {
                hideButton.innerText = 'Hide Mics'
                for(let i = 0; i < mics.length; i++)
                {
                    mics[i].style.display = 'block' 
                }
            }
        })
    }
}