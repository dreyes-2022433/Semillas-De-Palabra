// Servicio para manejar las llamadas a la API de lecciones
const API_BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:3001/api"

export const lessonService = {
  // Función para obtener las preguntas/recursos de un módulo de usuario
  async getQuestionsByUserModule(idUserModule) {
    try {
      console.log("🔄 Intentando conectar con:", API_BASE_URL)

      const response = await fetch(`${API_BASE_URL}/questions/user-module`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Agregar token de autorización si es necesario
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ idUserModule }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error fetching questions")
      }

      return data
    } catch (error) {
      console.error("Error in getQuestionsByUserModule:", error)
      // En lugar de hacer throw, devolver un objeto que indique fallo
      return {
        success: false,
        error: error.message,
        resources: [],
      }
    }
  },

  // Función auxiliar para procesar los recursos del backend
  processResources(resources) {
    const processedResources = {
      audioQuestions: [],
      imageQuestions: [],
      videoLessons: [],
    }

    resources.forEach((resource) => {
      switch (resource.kind) {
        case "AudioQuestion":
          processedResources.audioQuestions.push({
            id: resource.data._id,
            type: "audio-question-image-answers",
            question: resource.data.question || "Escucha y selecciona la respuesta correcta",
            audioText: resource.data.audioText || resource.data.audioUrl,
            text: resource.data.description || "",
            options: resource.data.options || [],
            correctAnswer: resource.data.correctAnswer,
          })
          break

        case "ImageQuestion":
          processedResources.imageQuestions.push({
            id: resource.data._id,
            type: "image-question-audio-answers",
            question: resource.data.question || "Observa la imagen y selecciona la respuesta correcta",
            imageUrl: resource.data.imageUrl,
            text: resource.data.description || "",
            options: resource.data.options || [],
            correctAnswer: resource.data.correctAnswer,
          })
          break

        case "VideoLesson":
          processedResources.videoLessons.push({
            id: resource.data._id,
            title: resource.data.title || "Lección de video",
            description: resource.data.description || "",
            videoUrl: resource.data.videoUrl,
            completed: false,
          })
          break

        default:
          console.warn("Unknown resource type:", resource.kind)
      }
    })

    return processedResources
  },

  // Función para combinar preguntas de audio e imagen en ejercicios
  createExercisesFromResources(audioQuestions, imageQuestions) {
    const exercises = []

    // Intercalar preguntas de audio e imagen
    const maxLength = Math.max(audioQuestions.length, imageQuestions.length)

    for (let i = 0; i < maxLength; i++) {
      if (i < imageQuestions.length) {
        exercises.push({
          ...imageQuestions[i],
          id: exercises.length + 1,
        })
      }

      if (i < audioQuestions.length) {
        exercises.push({
          ...audioQuestions[i],
          id: exercises.length + 1,
        })
      }
    }

    return exercises
  },
}
