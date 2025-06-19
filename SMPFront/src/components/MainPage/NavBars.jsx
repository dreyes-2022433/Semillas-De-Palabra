import React from "react"
import { Search, Home, BookOpen, TrendingUp, Award, Bell, User } from "lucide-react"
import { useState } from "react"

export const NavBars = ({children}) => {
  const [activeSection, setActiveSection] = useState("inicio")
  const logoUrl = "https://res.cloudinary.com/dxvwrech8/image/upload/v1750044062/Logo_evrmiv.png" 

  const sidebarItems = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "mis-rutas", label: "Mis Rutas", icon: BookOpen },
    { id: "mi-progreso", label: "Mi Progreso", icon: TrendingUp },
    { id: "mis-certificados", label: "Mis Certificados", icon: Award },
    { id: "notificaciones", label: "Notificaciones", icon: Bell },
  ]

  return (
    <div className="main-page-container">
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
                      e.target.style.display = "none"
                      e.target.nextSibling.style.display = "block"
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
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}
