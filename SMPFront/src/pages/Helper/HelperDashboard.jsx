import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../Admin/Styles/Admin.css'
import {
  Search,
  Bell,
  User,
  PlusCircle,
  List,
} from 'lucide-react'

const MotionBox = motion.div

const helperCards = [
  {
    id: 'view-tasks',
    label: 'Entrar a la cuenta de los usuarios',
    icon: List,
    path: '/loginHelper',
    color: '#4E944F',
  },
]

export const HelperDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isHelper, setIsHelper] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [userName, setUserName] = useState('') 
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      navigate('/Login')
      return
    }
    try {
      const user = JSON.parse(storedUser)
      if (user.role?.toLowerCase() === 'helper') {
        setIsHelper(true)
      } else {
        navigate('/')
      }
      setUserName(user.name || 'Usuario') 
    } catch (err) {
      console.error('Usuario malformado en localStorage')
      navigate('/Login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/Login')
  }

  const filteredCards = helperCards.filter(card =>
    card.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isHelper) return null

  return (
    <div className="panel-page">
      <header className="panel-header">
        <div className="panel-header-content">
          <div className="panel-header-left">
            <div className="panel-logo">
              <div className="panel-logo-icon">
                <img
                  src="https://res.cloudinary.com/dxvwrech8/image/upload/v1750044062/Logo_evrmiv.png"
                  alt="Logo"
                  className="panel-logo-image"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'block'
                  }}
                />
                <span className="panel-logo-fallback">HP</span>
              </div>
              <span className="panel-logo-text">Helper</span>
            </div>
            <div className="panel-search">
              <div className="panel-search-icon">
                <Search size={16} />
              </div>
              <input
                placeholder="Buscar tarea..."
                className="panel-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="panel-header-right">
            <button className="panel-header-button">
              <Bell size={16} />
              <span>0</span>
            </button>
            <button className="panel-header-button" onClick={handleLogout}>Cerrar sesión</button>
            <div className="panel-user">
              <div className="panel-avatar">
                <User size={16} />
              </div>
              <span>{userName}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="panel-layout">
        <aside className="panel-sidebar">
          <nav className="panel-sidebar-nav">
            <ul className="panel-sidebar-list">
              <li>
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className={`panel-sidebar-item ${activeSection === 'dashboard' ? 'active' : ''}`}
                >
                  <User size={20} />
                  <span>Opciones de Helper</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <div className="panel-content">
          <h1 className="panel-welcome-title" style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', fontWeight: '1000' }}>
            Panel de Helper
          </h1>
          <div className="panel-grid" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr' }}>
            {filteredCards.length > 0 ? (
              filteredCards.map(({ id, label, icon: Icon, path, color }) => (
                <MotionBox
                  key={id}
                  className="panel-dashboard-card"
                  style={{
                    backgroundColor: color,
                    fontFamily: 'Segoe UI, Roboto, sans-serif',
                    padding: '1.5rem',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '1rem',
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate(path)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Icon size={30} />
                    <span>{label}</span>
                  </div>
                </MotionBox>
              ))
            ) : (
              <p style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', fontSize: '1.2rem', color: '#444' }}>
                No se encuentra la tarea.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
