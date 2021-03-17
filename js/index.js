import KongaScene from './js/KongaScene.js'

class MainController {
  
  constructor(container){
    this.container = container
    
    // Setup the scene:
    const scene = new KongaScene()
    scene.element.style.display = "none"
    
    container.appendChild(scene.element)
    
    window.addEventListener("resize", this.handleResize.bind(this))
    
    this.scene = scene
    this.handleResize()
    
    // Setup loading:    
    const loadingElement = document.createElement("span")
    loadingElement.textContent = "Preparing…"
    
    // Audio:
    const audioPlayer = document.getElementsByTagName("audio")[0]
    audioPlayer.addEventListener("play", () => {
      loadingElement.parentNode.removeChild(loadingElement)
      
      scene.element.classList.add("cue-in")
      scene.element.style.display = "block"
      
      document.title = "Conga!"
    })
    
    // Button:
    const button = document.createElement("button")
    button.textContent = "Trust me"
    button.addEventListener("click", (event) => {
      // Remove button:
      button.parentNode.removeChild(button)
      
      // Add loading:
      container.appendChild(loadingElement)
      
      // Trigger playback:
      audioPlayer.play()
    })
    
    container.appendChild(button)
  }
  
  handleResize(){
    this.scene.size = { width: Math.floor(window.innerWidth), height: Math.floor(window.innerHeight) }
  }
  
}

function awake(){
  window.controller = new MainController(document.body)
}

document.addEventListener("DOMContentLoaded", awake)
