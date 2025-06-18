"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { LessonNavBars } from "../../components/LessonPage/LessonNavBars"
import { lessonService } from "../../services/lessonService"
import "./LessonPage.css"

export default function LessonPage() {
  const { moduleId } = useParams()

  // Estados para manejar datos del backend
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [backendData, setBackendData] = useState(null)

  // Datos completos de los 6 módulos con 5 lecciones cada uno
  const getLessonsByModule = (moduleId) => {
    const lessonsByModule = {
      1: [
        {
          id: 1,
          title: "Introducción a la vocal A",
          description:
            "Aprende el sonido de la vocal A, ve imágenes de objetos que empiezan con A y observa cómo se articula.",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 2,
          title: "Introducción a la vocal E",
          description:
            "Aprende el sonido de la vocal E, ve imágenes de objetos que empiezan con E y observa cómo se articula.",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 3,
          title: "Introducción a la vocal I",
          description:
            "Aprende el sonido de la vocal I, ve imágenes de objetos que empiezan con I y observa cómo se articula.",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 4,
          title: "Introducción a la vocal O",
          description:
            "Aprende el sonido de la vocal O, ve imágenes de objetos que empiezan con O y observa cómo se articula.",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 5,
          title: "Introducción a la vocal U",
          description:
            "Aprende el sonido de la vocal U, ve imágenes de objetos que empiezan con U y observa cómo se articula.",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
      ],
      2: [
        {
          id: 6,
          title: "Consonante M y sílabas MA, ME, MI, MO, MU",
          description: "Introducción a la consonante M y formación de sílabas",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 7,
          title: "Consonante P y sílabas PA, PE, PI, PO, PU",
          description: "Introducción a la consonante P y formación de sílabas",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 8,
          title: "Consonante S y sílabas SA, SE, SI, SO, SU",
          description: "Introducción a la consonante S y formación de sílabas",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 9,
          title: "Consonante L y sílabas LA, LE, LI, LO, LU",
          description: "Introducción a la consonante L y formación de sílabas",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 10,
          title: "Combinación de sílabas",
          description: "Combinación de sílabas de las consonantes anteriores",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
      ],
      3: [
        {
          id: 11,
          title: "Palabras con MA (mapa, mamá)",
          description: "Formación de palabras usando la sílaba MA",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 12,
          title: "Palabras con PA (pato, papá)",
          description: "Formación de palabras usando la sílaba PA",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 13,
          title: "Palabras con SA (sapo, sala)",
          description: "Formación de palabras usando la sílaba SA",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 14,
          title: "Palabras con LA (lata, loma)",
          description: "Formación de palabras usando la sílaba LA",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 15,
          title: "Combinación de sílabas (mesa, pala)",
          description: "Combinación de sílabas para formar palabras",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
      ],
      4: [
        {
          id: 16,
          title: "Familia (mamá, papá, hermano, hermana)",
          description: "Vocabulario básico sobre la familia",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 17,
          title: "Comida (pan, leche, fruta)",
          description: "Vocabulario básico sobre comida",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 18,
          title: "Animales (perro, gato, vaca)",
          description: "Vocabulario básico sobre animales",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 19,
          title: "Colores (rojo, azul, verde)",
          description: "Vocabulario básico sobre colores",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 20,
          title: "Objetos de la casa (mesa, silla, cama)",
          description: "Vocabulario básico sobre objetos del hogar",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
      ],
      5: [
        {
          id: 21,
          title: "Artículos 'el' y 'la' (el perro, la casa)",
          description: "Uso de artículos definidos singulares",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 22,
          title: "Artículos 'los' y 'las' (los perros, las casas)",
          description: "Uso de artículos definidos plurales",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 23,
          title: "Frases con 'el' y 'la' (El perro corre)",
          description: "Formación de frases con artículos singulares",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 24,
          title: "Frases con 'los' y 'las' (Los niños juegan)",
          description: "Formación de frases con artículos plurales",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 25,
          title: "Orden de las palabras en una frase",
          description: "Estructura correcta de las frases",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
      ],
      6: [
        {
          id: 26,
          title: "Frases sencillas (El gato juega)",
          description: "Comprensión de frases simples",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 27,
          title: "Frases sencillas (El gato duerme)",
          description: "Comprensión de frases simples",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 28,
          title: "Relato corto 1 (El gato juega con la pelota)",
          description: "Comprensión de relatos cortos",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 29,
          title: "Relato corto 2 (La niña come pan)",
          description: "Comprensión de relatos cortos",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 30,
          title: "Preguntas de comprensión sobre los relatos",
          description: "Evaluación de comprensión lectora",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
      ],
    }

    return lessonsByModule[moduleId] || lessonsByModule[1]
  }

  // Función para obtener ejercicios del backend o usar mock
  const getExercisesByModule = (moduleId, lessonId) => {
    // Si tenemos datos del backend, usarlos
    if (backendData && backendData.exercises && backendData.exercises.length > 0) {
      console.log("🎯 Usando ejercicios del backend")
      return backendData.exercises
    }

    // Si no, usar datos mock
    console.log("🎯 Usando ejercicios mock")
    const exercisesByModule = {
      // MÓDULO 1: Vocales
      1: [
        // Pregunta 1: Imagen → Audio
        {
          id: 1,
          type: "image-question-audio-answers",
          question: "Observa la imagen y selecciona el sonido correcto.",
          imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
          text: "¿Qué vocal representa esta imagen?",
          options: [
            { id: "a", text: "Sonido E", audioText: "E, E, E, vocal E" },
            { id: "b", text: "Sonido A", audioText: "A, A, A, vocal A" },
            { id: "c", text: "Sonido I", audioText: "I, I, I, vocal I" },
          ],
          correctAnswer: "b",
        },
        // Pregunta 2: Audio → Imagen
        {
          id: 2,
          type: "audio-question-image-answers",
          question: "Escucha el sonido y selecciona la imagen correcta.",
          audioText: "A, A, A, vocal A. Escucha bien el sonido de la vocal A",
          text: "¿Cuál imagen corresponde al sonido que escuchaste?",
          options: [
            {
              id: "a",
              text: "Elefante",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "b",
              text: "Avión",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "c",
              text: "Oso",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
          ],
          correctAnswer: "b",
        },
        // Pregunta 3: Imagen → Audio
        {
          id: 3,
          type: "image-question-audio-answers",
          question: "Mira la imagen y elige el sonido que corresponde.",
          imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
          text: "¿Qué sonido hace esta vocal?",
          options: [
            { id: "a", text: "Sonido A", audioText: "A, A, A, vocal A" },
            { id: "b", text: "Sonido E", audioText: "E, E, E, vocal E" },
            { id: "c", text: "Sonido I", audioText: "I, I, I, vocal I" },
          ],
          correctAnswer: "b",
        },
        // Pregunta 4: Audio → Imagen
        {
          id: 4,
          type: "audio-question-image-answers",
          question: "Escucha y selecciona la vocal correcta.",
          audioText: "I, I, I, vocal I. Escucha bien el sonido de la vocal I",
          text: "¿Qué vocal escuchaste?",
          options: [
            {
              id: "a",
              text: "Vocal A",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "b",
              text: "Vocal E",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "c",
              text: "Vocal I",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
          ],
          correctAnswer: "c",
        },
      ],
      // MÓDULO 2: Consonantes y Sílabas
      2: [
        {
          id: 1,
          type: "audio-question-image-answers",
          question: "Escucha la sílaba y selecciona la imagen correcta.",
          audioText: "MA, MA, MA, sílaba MA. Escucha bien la sílaba MA",
          text: "¿Cuál imagen representa la sílaba que escuchaste?",
          options: [
            {
              id: "a",
              text: "MA",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "b",
              text: "ME",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "c",
              text: "PA",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
          ],
          correctAnswer: "a",
        },
        {
          id: 2,
          type: "image-question-audio-answers",
          question: "Observa la sílaba y selecciona el sonido correcto.",
          imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
          text: "¿Cómo suena esta sílaba?",
          options: [
            { id: "a", text: "Sonido MA", audioText: "MA, MA, MA, sílaba MA" },
            { id: "b", text: "Sonido ME", audioText: "ME, ME, ME, sílaba ME" },
            { id: "c", text: "Sonido MI", audioText: "MI, MI, MI, sílaba MI" },
          ],
          correctAnswer: "b",
        },
        {
          id: 3,
          type: "audio-question-image-answers",
          question: "Escucha y selecciona la palabra correcta.",
          audioText: "MAMÁ, MAMÁ, MAMÁ. Escucha bien la palabra MAMÁ",
          text: "¿Qué palabra escuchaste?",
          options: [
            {
              id: "a",
              text: "MAMÁ",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "b",
              text: "PAPÁ",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "c",
              text: "SALA",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
          ],
          correctAnswer: "a",
        },
        {
          id: 4,
          type: "image-question-audio-answers",
          question: "Mira la palabra y elige cómo suena.",
          imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
          text: "¿Cómo se pronuncia esta palabra?",
          options: [
            { id: "a", text: "MAMÁ", audioText: "MAMÁ, MAMÁ, palabra MAMÁ" },
            { id: "b", text: "PAPÁ", audioText: "PAPÁ, PAPÁ, palabra PAPÁ" },
            { id: "c", text: "SALA", audioText: "SALA, SALA, palabra SALA" },
          ],
          correctAnswer: "b",
        },
      ],
      // MÓDULO 3: Palabras de dos sílabas
      3: [
        {
          id: 1,
          type: "image-question-audio-answers",
          question: "Observa la palabra y selecciona cómo suena.",
          imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
          text: "¿Cómo se pronuncia esta palabra?",
          options: [
            { id: "a", text: "MAPA", audioText: "MAPA, MAPA, palabra MAPA" },
            { id: "b", text: "MESA", audioText: "MESA, MESA, palabra MESA" },
            { id: "c", text: "MASA", audioText: "MASA, MASA, palabra MASA" },
          ],
          correctAnswer: "a",
        },
        {
          id: 2,
          type: "audio-question-image-answers",
          question: "Escucha la palabra y selecciona la imagen.",
          audioText: "PATO, PATO, PATO. Escucha bien la palabra PATO",
          text: "¿Qué palabra escuchaste?",
          options: [
            {
              id: "a",
              text: "PATO",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "b",
              text: "GATO",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "c",
              text: "RATO",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
          ],
          correctAnswer: "a",
        },
        {
          id: 3,
          type: "image-question-audio-answers",
          question: "Mira la imagen y elige el sonido correcto.",
          imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
          text: "¿Cómo suena esta palabra?",
          options: [
            { id: "a", text: "SAPO", audioText: "SAPO, SAPO, palabra SAPO" },
            { id: "b", text: "SOPA", audioText: "SOPA, SOPA, palabra SOPA" },
            { id: "c", text: "SALA", audioText: "SALA, SALA, palabra SALA" },
          ],
          correctAnswer: "a",
        },
        {
          id: 4,
          type: "audio-question-image-answers",
          question: "Escucha y selecciona la palabra correcta.",
          audioText: "LATA, LATA, LATA. Escucha bien la palabra LATA",
          text: "¿Qué palabra escuchaste?",
          options: [
            {
              id: "a",
              text: "LATA",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "b",
              text: "RATA",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "c",
              text: "MATA",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
          ],
          correctAnswer: "a",
        },
      ],
      // MÓDULO 4: Vocabulario básico
      4: [
        {
          id: 1,
          type: "audio-question-image-answers",
          question: "Escucha la palabra de familia y selecciona la imagen.",
          audioText: "MAMÁ, MAMÁ, MAMÁ. La palabra es MAMÁ",
          text: "¿Qué miembro de la familia escuchaste?",
          options: [
            {
              id: "a",
              text: "MAMÁ",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "b",
              text: "PAPÁ",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "c",
              text: "HERMANO",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
          ],
          correctAnswer: "a",
        },
        {
          id: 2,
          type: "image-question-audio-answers",
          question: "Observa la comida y selecciona cómo suena.",
          imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
          text: "¿Cómo se pronuncia esta comida?",
          options: [
            { id: "a", text: "PAN", audioText: "PAN, PAN, la palabra es PAN" },
            { id: "b", text: "LECHE", audioText: "LECHE, LECHE, la palabra es LECHE" },
            { id: "c", text: "FRUTA", audioText: "FRUTA, FRUTA, la palabra es FRUTA" },
          ],
          correctAnswer: "a",
        },
        {
          id: 3,
          type: "audio-question-image-answers",
          question: "Escucha el animal y selecciona la imagen.",
          audioText: "PERRO, PERRO, PERRO. El animal es PERRO",
          text: "¿Qué animal escuchaste?",
          options: [
            {
              id: "a",
              text: "PERRO",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "b",
              text: "GATO",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "c",
              text: "VACA",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
          ],
          correctAnswer: "a",
        },
        {
          id: 4,
          type: "image-question-audio-answers",
          question: "Mira el color y elige cómo suena.",
          imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
          text: "¿Cómo se pronuncia este color?",
          options: [
            { id: "a", text: "ROJO", audioText: "ROJO, ROJO, el color es ROJO" },
            { id: "b", text: "AZUL", audioText: "AZUL, AZUL, el color es AZUL" },
            { id: "c", text: "VERDE", audioText: "VERDE, VERDE, el color es VERDE" },
          ],
          correctAnswer: "a",
        },
      ],
      // MÓDULO 5: Artículos y frases
      5: [
        {
          id: 1,
          type: "image-question-audio-answers",
          question: "Observa la frase y selecciona cómo suena.",
          imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
          text: "¿Cómo se lee esta frase?",
          options: [
            { id: "a", text: "EL PERRO", audioText: "EL PERRO, EL PERRO, la frase es EL PERRO" },
            { id: "b", text: "LA CASA", audioText: "LA CASA, LA CASA, la frase es LA CASA" },
            { id: "c", text: "EL GATO", audioText: "EL GATO, EL GATO, la frase es EL GATO" },
          ],
          correctAnswer: "a",
        },
        {
          id: 2,
          type: "audio-question-image-answers",
          question: "Escucha la frase y selecciona la imagen.",
          audioText: "LA CASA, LA CASA, LA CASA. La frase es LA CASA",
          text: "¿Qué frase escuchaste?",
          options: [
            {
              id: "a",
              text: "LA CASA",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "b",
              text: "EL PERRO",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "c",
              text: "LA MESA",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
          ],
          correctAnswer: "a",
        },
        {
          id: 3,
          type: "image-question-audio-answers",
          question: "Mira la frase plural y elige cómo suena.",
          imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
          text: "¿Cómo se pronuncia esta frase?",
          options: [
            { id: "a", text: "LOS PERROS", audioText: "LOS PERROS, LOS PERROS, la frase es LOS PERROS" },
            { id: "b", text: "LAS CASAS", audioText: "LAS CASAS, LAS CASAS, la frase es LAS CASAS" },
            { id: "c", text: "LOS GATOS", audioText: "LOS GATOS, LOS GATOS, la frase es LOS GATOS" },
          ],
          correctAnswer: "a",
        },
        {
          id: 4,
          type: "audio-question-image-answers",
          question: "Escucha la frase completa y selecciona la imagen.",
          audioText: "EL PERRO CORRE, EL PERRO CORRE. La frase completa es EL PERRO CORRE",
          text: "¿Qué frase completa escuchaste?",
          options: [
            {
              id: "a",
              text: "EL PERRO CORRE",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "b",
              text: "LA NIÑA COME",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "c",
              text: "EL GATO DUERME",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
          ],
          correctAnswer: "a",
        },
      ],
      // MÓDULO 6: Comprensión de relatos
      6: [
        {
          id: 1,
          type: "audio-question-image-answers",
          question: "Escucha la frase y selecciona la imagen.",
          audioText: "EL GATO JUEGA, EL GATO JUEGA. La frase es EL GATO JUEGA",
          text: "¿Qué acción escuchaste?",
          options: [
            {
              id: "a",
              text: "EL GATO JUEGA",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "b",
              text: "EL GATO DUERME",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "c",
              text: "EL GATO COME",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
          ],
          correctAnswer: "a",
        },
        {
          id: 2,
          type: "image-question-audio-answers",
          question: "Observa la acción y selecciona cómo suena.",
          imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
          text: "¿Cómo se lee esta frase?",
          options: [
            { id: "a", text: "EL GATO JUEGA", audioText: "EL GATO JUEGA, EL GATO JUEGA" },
            { id: "b", text: "EL GATO DUERME", audioText: "EL GATO DUERME, EL GATO DUERME" },
            { id: "c", text: "EL GATO COME", audioText: "EL GATO COME, EL GATO COME" },
          ],
          correctAnswer: "b",
        },
        {
          id: 3,
          type: "audio-question-image-answers",
          question: "Escucha el relato corto y selecciona la imagen.",
          audioText: "EL GATO JUEGA CON LA PELOTA. EL GATO DUERME EN LA SILLA. Este es el relato completo",
          text: "¿Qué relato escuchaste?",
          options: [
            {
              id: "a",
              text: "GATO Y PELOTA",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "b",
              text: "NIÑA Y PAN",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
            {
              id: "c",
              text: "PERRO Y HUESO",
              imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
            },
          ],
          correctAnswer: "a",
        },
        {
          id: 4,
          type: "image-question-audio-answers",
          question: "Mira el relato y elige cómo suena.",
          imageUrl: "https://res.cloudinary.com/dxvwrech8/image/upload/v1747956080/cld-sample-4.jpg",
          text: "¿Cómo se lee este relato?",
          options: [
            { id: "a", text: "LA NIÑA COME PAN", audioText: "LA NIÑA COME PAN. LA NIÑA BEBE LECHE" },
            { id: "b", text: "EL NIÑO JUEGA", audioText: "EL NIÑO JUEGA. EL NIÑO CORRE" },
            { id: "c", text: "LA MAMÁ COCINA", audioText: "LA MAMÁ COCINA. LA MAMÁ LIMPIA" },
          ],
          correctAnswer: "a",
        },
      ],
    }

    return exercisesByModule[moduleId] || exercisesByModule[1]
  }

  // Cargar datos del backend al montar el componente
  useEffect(() => {
    const loadBackendData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Por ahora usamos un idUserModule mock - esto debería venir del contexto/estado global
        const mockIdUserModule = `user_module_${moduleId}_${Date.now()}`

        console.log("🔄 Intentando cargar datos del backend para módulo:", moduleId)
        console.log("🔄 ID UserModule mock:", mockIdUserModule)

        // Intentar cargar datos del backend
        const response = await lessonService.getQuestionsByUserModule(mockIdUserModule)
        console.log("✅ Respuesta del backend:", response)

        if (response.success && response.resources && response.resources.length > 0) {
          const processedResources = lessonService.processResources(response.resources)
          console.log("✅ Recursos procesados:", processedResources)

          // Crear ejercicios combinando preguntas de audio e imagen
          const combinedExercises = lessonService.createExercisesFromResources(
            processedResources.audioQuestions,
            processedResources.imageQuestions,
          )

          // Guardar datos del backend
          setBackendData({
            exercises: combinedExercises,
            lessons: processedResources.videoLessons,
          })

          console.log("✅ Datos del backend cargados exitosamente")
        } else {

        }
      } catch (backendError) {
        console.warn("⚠️ Error del backend, usando datos mock:", backendError.message)
        setError(`Backend no disponible: ${backendError.message}`)
      } finally {
        setLoading(false)
      }
    }

    loadBackendData()
  }, [moduleId])

  // Obtener lecciones (usar backend si está disponible, si no usar mock)
  const lessons =
    backendData && backendData.lessons && backendData.lessons.length > 0
      ? backendData.lessons
      : getLessonsByModule(Number.parseInt(moduleId))

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("leccion")
  const [currentExercise, setCurrentExercise] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [audio, setAudio] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set())

  const currentLesson = lessons[currentLessonIndex]

  // Funciones de audio igual que en MainPage
  const playAudio = (text) => {
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

  const playQuestionAudio = (questionText, additionalText = "") => {
    const fullText = `${questionText}. ${additionalText}`
    playAudio(fullText)
  }

  const exercises = getExercisesByModule(Number.parseInt(moduleId), currentLesson?.id)

  const handleLessonSelect = (lesson) => {
    const lessonIndex = lessons.findIndex((l) => l.id === lesson.id)
    if (lessonIndex !== -1) {
      setCurrentLessonIndex(lessonIndex)
      setActiveTab("leccion")
      setCurrentExercise(1)
      setSelectedAnswer(null)
      stopAudio() // Detener audio al cambiar lección
      setShowResult(false)
      setScore(0)
      setAnsweredQuestions(new Set())
    }
  }

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
      setActiveTab("leccion")
      setCurrentExercise(1)
      setSelectedAnswer(null)
      stopAudio() // Detener audio al cambiar lección
    }
  }

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId)
    setShowResult(false) // Reset result when selecting new answer
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return

    const currentQuestion = exercises[currentExercise - 1]
    const correct = selectedAnswer === currentQuestion.correctAnswer

    setIsCorrect(correct)
    setShowResult(true)

    // Update score if this question hasn't been answered correctly before
    const questionKey = `${moduleId}-${currentExercise}`
    if (correct && !answeredQuestions.has(questionKey)) {
      setScore(score + 1)
      setAnsweredQuestions((prev) => new Set([...prev, questionKey]))
    }

    // Play audio feedback
    if (correct) {
      playAudio("¡Excelente! Respuesta correcta. Muy bien hecho.")
    } else {
      const correctOption = currentQuestion.options.find((opt) => opt.id === currentQuestion.correctAnswer)
      playAudio(`Respuesta incorrecta. La respuesta correcta es: ${correctOption.text}`)
    }
  }

  const handleNextExercise = () => {
    if (currentExercise < exercises.length) {
      setCurrentExercise(currentExercise + 1)
      setSelectedAnswer(null)
      setShowResult(false) // Reset result state
      stopAudio() // Detener audio al cambiar ejercicio
    }
  }

  const handlePrevExercise = () => {
    if (currentExercise > 1) {
      setCurrentExercise(currentExercise - 1)
      setSelectedAnswer(null)
      setShowResult(false) // Reset result state
      stopAudio() // Detener audio al cambiar ejercicio
    }
  }

  // Mostrar loading si está cargando
  if (loading) {
    return (
      <div className="lesson-page-unique-wrapper">
        <div className="lesson-unique-loading">
          <h2>🔄 Cargando datos del módulo...</h2>
          <p>Conectando con el backend...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="lesson-page-unique-wrapper">
      <LessonNavBars
        currentLesson={currentLesson}
        onLessonSelect={handleLessonSelect}
        moduleId={Number.parseInt(moduleId)}
      />
      <main className="lesson-unique-main-content">
        <div className="lesson-unique-content-area">
          {/* Indicador de fuente de datos */}
          {backendData && <div className="lesson-unique-backend-indicator">✅ Datos cargados desde el backend</div>}
          {error && (
            <div className="lesson-unique-backend-indicator" style={{ backgroundColor: "#ffeb3b", color: "#f57c00" }}>
              ⚠️ Usando datos mock: {error}
            </div>
          )}

          <div className="lesson-unique-content-tabs">
            <button
              className={`lesson-unique-tab-button ${activeTab === "leccion" ? "active" : ""}`}
              onClick={() => setActiveTab("leccion")}
            >
              📖 Lección
            </button>
            <button
              className={`lesson-unique-tab-button ${activeTab === "ejercicio" ? "active" : ""}`}
              onClick={() => setActiveTab("ejercicio")}
            >
              ✏️ Ejercicio
            </button>
            <button
              className="lesson-unique-next-button-green lesson-unique-tab-style"
              onClick={handleNextLesson}
              disabled={currentLessonIndex >= lessons.length - 1}
            >
              {currentLessonIndex >= lessons.length - 1 ? "✅ Completado" : "➡️ Siguiente"}
            </button>
          </div>

          {activeTab === "leccion" && (
            <div className="lesson-unique-content">
              <div className="lesson-unique-video-container">
                {currentLesson?.videoUrl ? (
                  <iframe
                    src={currentLesson.videoUrl}
                    title="Video de la lección"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="lesson-unique-video-iframe"
                  />
                ) : (
                  <div className="lesson-unique-video-placeholder">
                    <h1>APRENDE</h1>
                    <h2 style={{ fontStyle: "italic" }}>español</h2>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "ejercicio" && exercises && exercises.length > 0 && (
            <div className="lesson-unique-exercise-content">
              <div className="lesson-unique-exercise-header">
                <div className="lesson-unique-exercise-navigation">
                  <button
                    onClick={handlePrevExercise}
                    disabled={currentExercise === 1}
                    className="lesson-unique-nav-button"
                  >
                    ←
                  </button>
                  {exercises.map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentExercise(index + 1)}
                      className={`lesson-unique-page-number ${currentExercise === index + 1 ? "active" : ""}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={handleNextExercise}
                    disabled={currentExercise === exercises.length}
                    className="lesson-unique-nav-button"
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="lesson-unique-exercise-question">
                <h3>Responde las siguientes preguntas.</h3>
                <div className="lesson-unique-question-content">
                  <p>
                    <strong>
                      {currentExercise}. {exercises[currentExercise - 1].question}
                    </strong>
                  </p>
                  <div className="lesson-unique-question-text-audio">
                    <button
                      className="lesson-unique-audio-button"
                      onClick={() =>
                        playQuestionAudio(exercises[currentExercise - 1].question, exercises[currentExercise - 1].text)
                      }
                    >
                      🔊 Escuchar instrucciones
                    </button>
                  </div>

                  {/* Mostrar imagen de la pregunta si existe - SIMPLIFICADO */}
                  {exercises[currentExercise - 1].imageUrl && (
                    <div className="lesson-unique-question-image">
                      <img
                        src={exercises[currentExercise - 1].imageUrl || "/placeholder.svg"}
                        alt="Imagen de la pregunta"
                        className="lesson-unique-question-img"
                        onLoad={() => console.log("✅ Imagen cargada:", exercises[currentExercise - 1].imageUrl)}
                        onError={(e) => {
                          console.log("❌ Error cargando imagen:", e.target.src)
                          // Mostrar un placeholder visible cuando falla
                          e.target.style.display = "block"
                          e.target.style.backgroundColor = "#f0f0f0"
                          e.target.style.border = "2px dashed #ccc"
                          e.target.style.width = "300px"
                          e.target.style.height = "200px"
                          e.target.alt = "❌ Imagen no disponible"
                        }}
                      />
                    </div>
                  )}

                  {/* Mostrar botón de audio de la pregunta si existe */}
                  {exercises[currentExercise - 1].audioText && (
                    <div className="lesson-unique-question-audio">
                      <button
                        className="lesson-unique-audio-button"
                        onClick={() => playAudio(exercises[currentExercise - 1].audioText)}
                      >
                        🔊 Escuchar pregunta
                      </button>
                    </div>
                  )}

                  <p>{exercises[currentExercise - 1].text}</p>

                  <div className="lesson-unique-answer-options">
                    {exercises[currentExercise - 1].options.map((option) => (
                      <label key={option.id} className="lesson-unique-answer-option">
                        <input
                          type="radio"
                          name="answer"
                          value={option.id}
                          checked={selectedAnswer === option.id}
                          onChange={() => handleAnswerSelect(option.id)}
                        />

                        {/* Respuesta con imagen - SIMPLIFICADO */}
                        {option.imageUrl && (
                          <div className="lesson-unique-option-image">
                            <img
                              src={option.imageUrl || "/placeholder.svg"}
                              alt={option.text}
                              className="lesson-unique-option-img"
                              onLoad={() => console.log("✅ Imagen opción cargada:", option.imageUrl)}
                              onError={(e) => {
                                console.log("❌ Error imagen opción:", e.target.src)
                                // Mostrar placeholder visible
                                e.target.style.display = "block"
                                e.target.style.backgroundColor = "#f0f0f0"
                                e.target.style.border = "2px dashed #ccc"
                                e.target.alt = "❌ No disponible"
                              }}
                            />
                            <span className="lesson-unique-option-text">{option.text}</span>
                          </div>
                        )}

                        {/* Respuesta con audio */}
                        {option.audioText && (
                          <div className="lesson-unique-option-audio">
                            <button
                              className="lesson-unique-option-audio-button"
                              onClick={() => playAudio(option.audioText)}
                            >
                              🔊 {option.text}
                            </button>
                          </div>
                        )}

                        {/* Respuesta solo texto (fallback) */}
                        {!option.imageUrl && !option.audioText && (
                          <span className="lesson-unique-option-text">{option.text}</span>
                        )}
                      </label>
                    ))}
                  </div>

                  <div className="lesson-unique-submit-section">
                    <button
                      className="lesson-unique-submit-button"
                      disabled={!selectedAnswer || showResult}
                      onClick={handleSubmitAnswer}
                    >
                      {showResult ? "Calificado" : "Calificar"}
                    </button>

                    {showResult && (
                      <div className={`lesson-unique-result ${isCorrect ? "correct" : "incorrect"}`}>
                        <div className="lesson-unique-result-icon">{isCorrect ? "✅" : "❌"}</div>
                        <div className="lesson-unique-result-text">
                          <strong>{isCorrect ? "¡Correcto!" : "Incorrecto"}</strong>
                          <p>
                            {isCorrect
                              ? "¡Excelente trabajo! Continúa así."
                              : `La respuesta correcta es: ${exercises[currentExercise - 1].options.find((opt) => opt.id === exercises[currentExercise - 1].correctAnswer)?.text}`}
                          </p>
                        </div>
                        {currentExercise < exercises.length && (
                          <button className="lesson-unique-next-question-button" onClick={handleNextExercise}>
                            Siguiente pregunta →
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Score display */}
                  <div className="lesson-unique-score-display">
                    <span>
                      📊 Puntuación: {score}/{exercises.length}
                    </span>
                    <span>📈 Progreso: {Math.round((score / exercises.length) * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
