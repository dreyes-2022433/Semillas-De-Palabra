import React from "react"
import { Search, Home, BookOpen, TrendingUp, Award, Bell, MessageCircle, User, ChevronRight } from 'lucide-react'



export const ModuleCard = ({Modules,ModulosRecientes})=>{

return (
    <div className="main-layout"  > 
     
      <main className="main-content">
       
        <section className="welcome-section" >
          <h1 className="welcome-title">Descubre lo que puedes aprender</h1>
          <p className="welcome-subtitle">Cada palabra es una semilla que puede crecer en conocimiento</p>
        </section>

        <section className="courses-section">
          <div className="section-header">
            <h2 className="section-title">Cursos recomendados para ti</h2>
            <button className="view-all-button">
              Ver todos <ChevronRight size={16} />
            </button>
          </div>
          <div className="courses-grid">
            {Modules.map((course) => (
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

        <section className="courses-section">
          <div className="section-header">
            <h2 className="section-title">Últimos cursos lanzados</h2>
            <button className="view-all-button">
              Ver todos <ChevronRight size={16} />
            </button>
          </div>
          <div className="courses-grid">
            {ModulosRecientes.map((course) => (
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
 

)




}