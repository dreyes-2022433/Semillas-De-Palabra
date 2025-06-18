import { useRef } from "react"
import { NavBars } from "../components/MainPage/NavBars"
import './MainPages/MainPage.css'
import { getUserModulesRequest } from "../services/api"
import { useState } from "react"
import { useEffect } from "react"
export default function MainPage() {
  const audioRefs = useRef({})
  const [userModules, setUserModules] = useState([])
 
  const fetchUserModules = async () => {
    
  const res = await getUserModulesRequest()
    setUserModules(res.data.userModules || [])
  }
  useEffect(() => {
  fetchUserModules()
  }, [])
  console.log(userModules)

  const playAudio = (text, moduleId) => {
    // Detener cualquier audio que esté reproduciéndose
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio && !audio.paused) {
        audio.pause()
        audio.currentTime = 0
      }
    })

    // Usar Web Speech API para reproducir el texto
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "es-ES"
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 1

      speechSynthesis.speak(utterance)
    }
  }

  const stopAudio = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
    }
  }

  return (
    <>
      <NavBars />
      <main className="main-content-visual">
        <div className="modules-container-large">
          <div className="modules-grid-large">
            {userModules.map((module, index) => (
              <div
                key={module._id}
                className={`module-card-large ${index === 0 ? "module-featured" : ""}`}
                onMouseEnter={() => playAudio(module.module.name, module._id)}
                onMouseLeave={stopAudio}
              >
                <div className="module-image-large">
                  <img
                    src={module.module.img || "/placeholder.svg"}
                    alt={`Módulo ${module.id}`}
                    className="module-img-large"
                    onError={(e) => {
                      // Si la imagen no carga, usar placeholder con color
                      
                    }}
                  />

                  {/* Indicador de audio */}
                  <div className="audio-indicator-large">
                    <div className="audio-waves-large">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>

                  {/* Overlay con efecto hover */}
                  <div className="module-overlay"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
