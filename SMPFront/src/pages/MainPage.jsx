"use client"

// src/pages/MainPage.jsx
import { useState } from "react"
import { Search, Home, BookOpen, TrendingUp, Award, Bell, MessageCircle, User, ChevronRight } from 'lucide-react'
import "../styles/MainPage.css"

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

  const sidebarItems = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "mis-rutas", label: "Mis Rutas", icon: BookOpen },
    { id: "mi-progreso", label: "Mi Progreso", icon: TrendingUp },
    { id: "mis-certificados", label: "Mis Certificados", icon: Award },
    { id: "notificaciones", label: "Notificaciones", icon: Bell },
  ]

  return (
    <div className="main-page-container">
      {/* Header */}
      <header className="main-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-section">
              <div className="logo-icon">
                {logoUrl ? (
                  <img 
                    src={logoUrl || "/placeholder.svg"} 
                    alt="Semillas de Palabras Logo" 
                    className="logo-image"
                    onError={(e) => {
                      // Si la imagen no carga, muestra el texto SP
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'block'
                    }}
                  />
                ) : null}
                <span className="logo-fallback">SP</span>
              </div>
              <span className="logo-text">Semillas de Palabras</span>
            </div>
            <div className="search-section">
              <div className="search-icon">
                <Search size={16} />
              </div>
              <input placeholder="¿Qué quieres aprender?" className="search-input" />
            </div>
          </div>
          <div className="header-right">
            <button className="header-button">
              <Bell size={16} />
              <span>0</span>
            </button>
            <button className="header-button">Planes</button>
            <div className="user-section">
              <div className="user-avatar">
                <User size={16} />
              </div>
              <span>500 pts</span>
            </div>
          </div>
        </div>
      </header>

      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <ul className="sidebar-list">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`sidebar-item ${activeSection === item.id ? "active" : ""}`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Welcome Section */}
          <section className="welcome-section">
            <h1 className="welcome-title">Descubre lo que puedes aprender</h1>
            <p className="welcome-subtitle">Cada palabra es una semilla que puede crecer en conocimiento</p>
          </section>

          {/* Recommended Courses */}
          <section className="courses-section">
            <div className="section-header">
              <h2 className="section-title">Cursos recomendados para ti</h2>
              <button className="view-all-button">
                Ver todos <ChevronRight size={16} />
              </button>
            </div>
            <div className="courses-grid">
              {recommendedCourses.map((course) => (
                <div key={course.id} className="course-card">
                  <div className="course-image-container">
                    <img src={course.image || "/placeholder.svg"} alt={course.title} className="course-image" />
                    {course.isNew && <span className="new-badge">NUEVO</span>}
                  </div>
                  <div className="course-content">
                    <div className="course-category">
                      <div className="category-icon">
                        <BookOpen size={12} />
                      </div>
                      <span>{course.category}</span>
                    </div>
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-instructor">Por {course.instructor}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Latest Courses */}
          <section className="courses-section">
            <div className="section-header">
              <h2 className="section-title">Últimos cursos lanzados</h2>
              <button className="view-all-button">
                Ver todos <ChevronRight size={16} />
              </button>
            </div>
            <div className="courses-grid">
              {latestCourses.map((course) => (
                <div key={course.id} className="course-card">
                  <div className="course-image-container">
                    <img src={course.image || "/placeholder.svg"} alt={course.title} className="course-image" />
                    {course.isNew && <span className="new-badge">NUEVO</span>}
                  </div>
                  <div className="course-content">
                    <div className="course-category">
                      <div className="category-icon category-icon-alt">
                        <BookOpen size={12} />
                      </div>
                      <span>{course.category}</span>
                    </div>
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-instructor">Por {course.instructor}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
