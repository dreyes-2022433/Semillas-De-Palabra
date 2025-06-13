"use client"

// src/pages/MainPage.jsx
import { useState } from "react"
import { Search, Home, BookOpen, TrendingUp, Award, Bell, MessageCircle, User, ChevronRight } from 'lucide-react'
import "../styles/MainPage.css"
import { ModuleCard } from "../components/Modules/Modulecard"

export default function MainPage() {
  const [activeSection, setActiveSection] = useState("inicio")
  

  const logoUrl = "/src/assets/LogoSolo.png" 


  const recommendedCourses = [
    {
      id: 1,
      title: "Fundamentos de Lectura para Adultos",
      instructor: "María González",
      image: "https://via.placeholder.com/300x200/6A994E/ffffff?text=Lectura",
      isNew: true,
      category: "Lectura Básica",
    },
    {
      id: 2,
      title: "Escritura Creativa: Primeros Pasos",
      instructor: "Carlos Mendoza",
      image: "https://via.placeholder.com/300x200/A7C957/ffffff?text=Escritura",
      isNew: true,
      category: "Escritura",
    },
    {
      id: 3,
      title: "Matemáticas Básicas para la Vida Diaria",
      instructor: "Ana Rodríguez",
      image: "https://via.placeholder.com/300x200/386641/ffffff?text=Matemáticas",
      isNew: true,
      category: "Matemáticas",
    },
    {
      id: 4,
      title: "Comprensión Lectora Nivel 1",
      instructor: "Luis Herrera",
      image: "https://via.placeholder.com/300x200/BC4749/ffffff?text=Comprensión",
      isNew: true,
      category: "Comprensión",
    },
    {
      id: 5,
      title: "Comunicación Efectiva",
      instructor: "Patricia Silva",
      image: "https://via.placeholder.com/300x200/6A994E/ffffff?text=Comunicación",
      isNew: true,
      category: "Comunicación",
    },
  ]

  const latestCourses = [
    {
      id: 6,
      title: "Alfabetización Digital Básica",
      instructor: "Roberto Vega",
      image: "https://via.placeholder.com/300x200/A7C957/ffffff?text=Digital",
      isNew: true,
      category: "Tecnología",
    },
    {
      id: 7,
      title: "Redacción de Documentos Personales",
      instructor: "Elena Morales",
      image: "https://via.placeholder.com/300x200/386641/ffffff?text=Redacción",
      isNew: true,
      category: "Escritura Práctica",
    },
    {
      id: 8,
      title: "Lectura de Noticias y Medios",
      instructor: "Diego Ramírez",
      image: "https://via.placeholder.com/300x200/BC4749/ffffff?text=Noticias",
      isNew: true,
      category: "Comprensión",
    },
    {
      id: 9,
      title: "Cálculo Mental y Operaciones",
      instructor: "Carmen López",
      image: "https://via.placeholder.com/300x200/6A994E/ffffff?text=Cálculo",
      isNew: true,
      category: "Matemáticas",
    },
    {
      id: 10,
      title: "Historia Personal: Mi Biografía",
      instructor: "Andrés Castillo",
      image: "https://via.placeholder.com/300x200/A7C957/ffffff?text=Historia",
      isNew: true,
      category: "Escritura Creativa",
    },
  ]

  return (
   <>
   
   <ModuleCard Modules={recommendedCourses} ModulosRecientes={latestCourses}/>
   
   </>
  )
}
