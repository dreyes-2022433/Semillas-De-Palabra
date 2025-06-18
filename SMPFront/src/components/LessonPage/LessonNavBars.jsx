"use client"

import { Search, Bell, User, ChevronDown, ChevronRight, Play } from "lucide-react"
import { useState } from "react"

export const LessonNavBars = ({ currentLesson, onLessonSelect, moduleId }) => {
  const [activeSection, setActiveSection] = useState(`modulo-${moduleId || 1}`)
  const [expandedSections, setExpandedSections] = useState([`modulo-${moduleId || 1}`])

  const logoUrl = "https://res.cloudinary.com/dxvwrech8/image/upload/v1750044062/Logo_evrmiv.png"

  // Estructura educativa completa para "Semillas de Palabras" - TODOS LOS 6 MÓDULOS
  const moduleData = {
    1: {
      title: "Descubriendo los Sonidos (Las Vocales)",
      color: "#6A994E",
      lessons: [
        {
          id: 1,
          title: "Introducción a la vocal A",
          description: "Sonido, imagen de objeto que empieza con A, video de la articulación",
          completed: false,
        },
        {
          id: 2,
          title: "Introducción a la vocal E",
          description: "Sonido, imagen de objeto que empieza con E, video de la articulación",
          completed: false,
        },
        {
          id: 3,
          title: "Introducción a la vocal I",
          description: "Sonido, imagen de objeto que empieza con I, video de la articulación",
          completed: false,
        },
        {
          id: 4,
          title: "Introducción a la vocal O",
          description: "Sonido, imagen de objeto que empieza con O, video de la articulación",
          completed: false,
        },
        {
          id: 5,
          title: "Introducción a la vocal U",
          description: "Sonido, imagen de objeto que empieza con U, video de la articulación",
          completed: false,
        },
      ],
    },
    2: {
      title: "Primeras Uniones (Consonantes y Sílabas)",
      color: "#A7C957",
      lessons: [
        {
          id: 6,
          title: "Consonante M y sílabas MA, ME, MI, MO, MU",
          description: "Introducción a la consonante M y formación de sílabas",
          completed: false,
        },
        {
          id: 7,
          title: "Consonante P y sílabas PA, PE, PI, PO, PU",
          description: "Introducción a la consonante P y formación de sílabas",
          completed: false,
        },
        {
          id: 8,
          title: "Consonante S y sílabas SA, SE, SI, SO, SU",
          description: "Introducción a la consonante S y formación de sílabas",
          completed: false,
        },
        {
          id: 9,
          title: "Consonante L y sílabas LA, LE, LI, LO, LU",
          description: "Introducción a la consonante L y formación de sílabas",
          completed: false,
        },
        {
          id: 10,
          title: "Combinación de sílabas",
          description: "Combinación de sílabas de las consonantes anteriores",
          completed: false,
        },
      ],
    },
    3: {
      title: "Formando Palabras (Palabras de dos Sílabas)",
      color: "#386641",
      lessons: [
        {
          id: 11,
          title: "Palabras con MA (mapa, mamá)",
          description: "Formación de palabras usando la sílaba MA",
          completed: false,
        },
        {
          id: 12,
          title: "Palabras con PA (pato, papá)",
          description: "Formación de palabras usando la sílaba PA",
          completed: false,
        },
        {
          id: 13,
          title: "Palabras con SA (sapo, sala)",
          description: "Formación de palabras usando la sílaba SA",
          completed: false,
        },
        {
          id: 14,
          title: "Palabras con LA (lata, loma)",
          description: "Formación de palabras usando la sílaba LA",
          completed: false,
        },
        {
          id: 15,
          title: "Combinación de sílabas (mesa, pala)",
          description: "Combinación de sílabas para formar palabras",
          completed: false,
        },
      ],
    },
    4: {
      title: "Mi Pequeño Diccionario (Vocabulario Básico)",
      color: "#BC4749",
      lessons: [
        {
          id: 16,
          title: "Familia (mamá, papá, hermano, hermana)",
          description: "Vocabulario básico sobre la familia",
          completed: false,
        },
        {
          id: 17,
          title: "Comida (pan, leche, fruta)",
          description: "Vocabulario básico sobre comida",
          completed: false,
        },
        {
          id: 18,
          title: "Animales (perro, gato, vaca)",
          description: "Vocabulario básico sobre animales",
          completed: false,
        },
        {
          id: 19,
          title: "Colores (rojo, azul, verde)",
          description: "Vocabulario básico sobre colores",
          completed: false,
        },
        {
          id: 20,
          title: "Objetos de la casa (mesa, silla, cama)",
          description: "Vocabulario básico sobre objetos del hogar",
          completed: false,
        },
      ],
    },
    5: {
      title: "Uniendo Ideas (Artículos y Frases)",
      color: "#6A994E",
      lessons: [
        {
          id: 21,
          title: "Artículos 'el' y 'la' (el perro, la casa)",
          description: "Uso de artículos definidos singulares",
          completed: false,
        },
        {
          id: 22,
          title: "Artículos 'los' y 'las' (los perros, las casas)",
          description: "Uso de artículos definidos plurales",
          completed: false,
        },
        {
          id: 23,
          title: "Frases con 'el' y 'la' (El perro corre)",
          description: "Formación de frases con artículos singulares",
          completed: false,
        },
        {
          id: 24,
          title: "Frases con 'los' y 'las' (Los niños juegan)",
          description: "Formación de frases con artículos plurales",
          completed: false,
        },
        {
          id: 25,
          title: "Orden de las palabras en una frase",
          description: "Estructura correcta de las frases",
          completed: false,
        },
      ],
    },
    6: {
      title: "Historias con Sentido (Comprensión)",
      color: "#D4A017",
      lessons: [
        {
          id: 26,
          title: "Frases sencillas (El gato juega)",
          description: "Comprensión de frases simples",
          completed: false,
        },
        {
          id: 27,
          title: "Frases sencillas (El gato duerme)",
          description: "Comprensión de frases simples",
          completed: false,
        },
        {
          id: 28,
          title: "Relato corto 1 (El gato juega con la pelota)",
          description: "Comprensión de relatos cortos",
          completed: false,
        },
        {
          id: 29,
          title: "Relato corto 2 (La niña come pan)",
          description: "Comprensión de relatos cortos",
          completed: false,
        },
        {
          id: 30,
          title: "Preguntas de comprensión sobre los relatos",
          description: "Evaluación de comprensión lectora",
          completed: false,
        },
      ],
    },
  }

  const currentModuleData = moduleData[moduleId || 1]
  const lessonSections = [
    {
      id: `modulo-${moduleId || 1}`,
      title: currentModuleData.title,
      color: currentModuleData.color,
      lessons: currentModuleData.lessons,
    },
  ]

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  return (
    <>
      <header className="lesson-unique-header">
        <div className="lesson-unique-header-content">
          <div className="lesson-unique-header-left">
            <div className="lesson-unique-logo-section">
              <div className="lesson-unique-logo-icon">
                {logoUrl ? (
                  <img
                    src={logoUrl || "/placeholder.svg"}
                    alt="Semillas de Palabras Logo"
                    className="lesson-unique-logo-image"
                    onError={(e) => {
                      e.target.style.display = "none"
                      e.target.nextSibling.style.display = "block"
                    }}
                  />
                ) : null}
                <span className="lesson-unique-logo-fallback">SP</span>
              </div>
              <span className="lesson-unique-logo-text">Semillas de Palabras</span>
            </div>

          </div>
          <div className="lesson-unique-header-right">
            <button className="lesson-unique-header-button">
              <Bell size={16} />
              <span>0</span>
            </button>
            <button className="lesson-unique-header-button">Planes</button>
            <div className="lesson-unique-user-section">
              <div className="lesson-unique-user-avatar">
                <User size={16} />
              </div>
              <span>500 pts</span>
            </div>
          </div>
        </div>
      </header>

      <aside className="lesson-unique-sidebar">
        <div className="lesson-unique-sidebar-header">
          <h3>← Más habilidades</h3>
        </div>
        <nav className="lesson-unique-nav">
          {lessonSections.map((section) => (
            <div key={section.id} className="lesson-unique-section">
              <button
                onClick={() => toggleSection(section.id)}
                className={`lesson-unique-section-header ${activeSection === section.id ? "active" : ""}`}
                style={{ backgroundColor: section.color }}
              >
                <span>{section.title}</span>
                {expandedSections.includes(section.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {expandedSections.includes(section.id) && (
                <ul className="lesson-unique-list">
                  {section.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <button
                        onClick={() => onLessonSelect(lesson)}
                        className={`lesson-unique-item ${currentLesson?.id === lesson.id ? "current" : ""}`}
                      >
                        <div className="lesson-unique-icon">
                          <Play size={16} className="lesson-unique-play-icon" />
                        </div>
                        <span className="lesson-unique-title">{lesson.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
