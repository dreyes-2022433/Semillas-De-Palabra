import { useRef } from "react"
import { NavBars } from "../components/MainPage/NavBars"

export default function MainPage() {
  const audioRefs = useRef({})

  // Módulos con rutas a tus propias imágenes
  const modules = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
      audioText: "Aprende a leer palabras y frases básicas",
      color: "#6A994E",
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
      audioText: "Aprende a escribir letras y palabras",
      color: "#A7C957",
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
      audioText: "Aprende números y matemáticas básicas",
      color: "#386641",
    },
    {
      id: 4,
      image: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
      audioText: "Mejora tu comprensión de lo que lees",
      color: "#BC4749",
    },
    {
      id: 5,
      image: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
      audioText: "Aprende a comunicarte mejor",
      color: "#6A994E",
    },
    {
      id: 6,
      image: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
      audioText: "Amplía tu vocabulario",
      color: "#D4A017",
    },
  ]

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
            {modules.map((module, index) => (
              <div
                key={module.id}
                className={`module-card-large ${index === 0 ? "module-featured" : ""}`}
                onMouseEnter={() => playAudio(module.audioText, module.id)}
                onMouseLeave={stopAudio}
              >
                <div className="module-image-large">
                  <img
                    src={module.image || "/placeholder.svg"}
                    alt={`Módulo ${module.id}`}
                    className="module-img-large"
                    onError={(e) => {
                      // Si la imagen no carga, usar placeholder con color
                      e.target.src = `https://via.placeholder.com/600x400/${module.color.replace("#", "")}/ffffff?text=Módulo+${module.id}`
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
