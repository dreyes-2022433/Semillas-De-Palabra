import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Styles/Admin.css'
import {
  Search,
  Bell,
  User,
  PlusCircle,
  Users,
  List,
} from 'lucide-react'

const MotionBox = motion.div

const adminCards = [
  {
    id: 'add-modules',
    label: 'Agregar Módulos',
    icon: PlusCircle,
    path: '/modulesPage',
    color: '#4E944F',
  },
  {
    id: 'manage-users',
    label: 'Administrar Usuarios',
    icon: Users,
    path: '/usersPage',
    color: '#82CD47',
  },
  {
    id: 'get-users',
    label: 'Obtener Todos los Usuarios',
    icon: List,
    path: '/users/all',
    color: '#B4D59A',
  },
]

export const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isAdmin, setIsAdmin] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      navigate('/')
      return
    }
    try {
      const user = JSON.parse(storedUser)
      if (user.role?.toLowerCase() === 'admin') {
        setIsAdmin(true)
      } else {
        navigate('/')
      }
    } catch (err) {
      console.error('Usuario malformado en localStorage')
      navigate('/')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const filteredCards = adminCards.filter(card =>
    card.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isAdmin) return null

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
                <span className="panel-logo-fallback">AD</span>
              </div>
              <span className="panel-logo-text">Administrador</span>
            </div>
            <div className="panel-search">
              <div className="panel-search-icon">
                <Search size={16} />
              </div>
              <input
                placeholder="Buscar acción..."
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
              <span>Admin</span>
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
                  <span>Opciones de Administrador</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <div className="panel-content">
          <h1 className="panel-welcome-title" style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', fontWeight: '1000' }}>
            Panel de Administración
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
                No se encuentra la opción.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
