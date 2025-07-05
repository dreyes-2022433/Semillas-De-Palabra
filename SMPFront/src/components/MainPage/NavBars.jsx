import React, { useEffect } from "react"
import { Search, Home, BookOpen, TrendingUp, Award, Bell, User ,LogOut    } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


import { useUserModules } from "../../pages/MainPages/userModuleContext"
export const NavBars = ({ children }) => {
  const [activeSection, setActiveSection] = useState("inicio")
  const navigate = useNavigate()
  
  const logoUrl = "https://res.cloudinary.com/dxvwrech8/image/upload/v1750044062/Logo_evrmiv.png" 
  const user = JSON.parse(localStorage.getItem('user'))
  const { userModules } = useUserModules();
 
  
 
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/") 
  }
 
  return (
    <div className="main-page-container">
      <header className="main-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-section">
              <div className="logo-icon">
                {logoUrl && (
                  <img
                    src={logoUrl}
                    alt="Semillas de Palabras Logo"
                    className="logo-image"
                    onError={(e) => {
                      e.target.style.display = "none"
                      e.target.nextSibling.style.display = "block"
                    }}
                  />
                )}
                <span className="logo-fallback"></span>
              </div>
              <span className="logo-text">Semillas de Palabras</span>
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
              <span>{user.name}</span>
            </div>
            <button className="header-button logout-btn" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <nav className="sidebar-nav">
           <ul className="sidebar-list">
            
    {userModules.length === 0 ? (
    <li>No tienes módulos asignados.</li>
      ) : (
    userModules.map((item) => (
      <li key={item._id}>
        <button
          onClick={() =>{
            navigate(`/main/content/${item.module._id}`),
           setActiveSection(item._id)}}
          className={`sidebar-item ${activeSection === item._id ? "active" : ""}`}
        >
          <BookOpen size={20} />
          <span>{item.module.name}</span>
        </button>
      </li>
    ))
  )}
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
