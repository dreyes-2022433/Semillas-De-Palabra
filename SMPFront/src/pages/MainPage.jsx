import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { NavBars } from "../components/MainPage/NavBars"
import "./MainPages/MainPage.css"

export default function MainPage() {
  const [modules, setModules] = useState([])
  const [audio, setAudio] = useState(null)
  const audioRefs = useRef({})
  const navigate = useNavigate()

  useEffect(() => {
    // Definición de los módulos
    const mockModules = [
      {
        id: 1,
        title: "Lectura Básica",
        description: "Aprende a leer palabras y frases básicas",
        image: "src/assets/voca.png",
        audioText: "En este módulo aprenderás el sonido y como se ven las vocales",
        color: "#6A994E",
      },
      {
        id: 2,
        title: "Escritura Inicial",
        description: "Aprende a escribir letras y palabras",
        image: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
        audioText: "Aprende a escribir letras y palabras",
        color: "#A7C957",
      },
      {
        id: 3,
        title: "Matemáticas Básicas",
        description: "Aprende números y matemáticas básicas",
        image: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
        audioText: "Aprende números y matemáticas básicas",
        color: "#386641",
      },
      {
        id: 4,
        title: "Comprensión Lectora",
        description: "Mejora tu comprensión de lo que lees",
        image: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
        audioText: "Mejora tu comprensión de lo que lees",
        color: "#BC4749",
      },
      {
        id: 5,
        title: "Comunicación Efectiva",
        description: "Aprende a comunicarte mejor",
        image: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
        audioText: "Aprende a comunicarte mejor",
        color: "#6A994E",
      },
      {
        id: 6,
        title: "Vocabulario Avanzado",
        description: "Amplía tu vocabulario",
        image: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
        audioText: "Amplía tu vocabulario",
        color: "#D4A017",
      },
    ]
    setModules(mockModules)
  }, [])

  const playAudio = (text, moduleId) => {
    // Detener cualquier audio que esté reproduciéndose
    stopAudio()

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "es-ES"
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 1
      utterance.onend = () => {
        setAudio(null)
      }
      window.speechSynthesis.speak(utterance)
      setAudio(utterance)
    } else {
      console.log("Text-to-speech no soportado")
    }
  }

  const stopAudio = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setAudio(null)
    }
  }

  return (
    <>
      <NavBars />
      <main className="main-content-visual">
        <header className="main-header">
        </header>
        <section className="module-section">
          <div className="modules-container-large">
            <div className="modules-grid-large">
              {modules.map((module, index) => (
                <div
                  key={module.id}
                  className={`module-card-large ${index === 0 ? "module-featured" : ""}`}
                  onMouseEnter={() => playAudio(module.audioText, module.id)}
                  onMouseLeave={stopAudio}
                  onClick={() => navigate(`/lesson/${module.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="module-image-large">
                    <img
                      src={module.image || "/placeholder.svg"}
                      alt={module.title}
                      className="module-img-large"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/600x400/${module.color.replace("#", "")}/ffffff?text=Módulo+${module.id}`
                      }}
                    />
                    <div className="audio-indicator-large">
                      <div className="audio-waves-large">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                    <div className="module-overlay"></div>
                  </div>
                  <div className="module-details">
                    <h3>{module.title}</h3>
                    <p>{module.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}