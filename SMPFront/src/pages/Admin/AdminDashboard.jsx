import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../../styles/Mainpage.css'
import {
  Search,
  Bell,
  User,
  PlusCircle,
  Users,
  List,
} from 'lucide-react'

const MotionBox = motion.div
const MotionButton = motion.button

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
    <div className="main-page-container">
      <header className="main-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-section">
              <div className="logo-icon">
                <img
                  src="/src/assets/LogoSolo.png"
                  alt="Logo"
                  className="logo-image"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'block'
                  }}
                />
                <span className="logo-fallback">AD</span>
              </div>
              <span className="logo-text">Administrador</span>
            </div>
            <div className="search-section">
              <div className="search-icon">
                <Search size={16} />
              </div>
              <input
                placeholder="Buscar acción..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="header-right">
            <button className="header-button">
              <Bell size={16} />
              <span>0</span>
            </button>
            <button className="header-button" onClick={handleLogout}>Cerrar sesión</button>
            <div className="user-section">
              <div className="user-avatar">
                <User size={16} />
              </div>
              <span>Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <ul className="sidebar-list">
              <li>
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className={`sidebar-item ${activeSection === 'dashboard' ? 'active' : ''}`}
                >
                  <User size={20} />
                  <span>Opciones de Administrador</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <div className="main-content">
          <h1 className="dashboard-title" style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', fontWeight: '1000' }}>
            Panel de Administración
          </h1>
          <div className="card-grid" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr' }}>
            {filteredCards.length > 0 ? (
              filteredCards.map(({ id, label, icon: Icon, path, color }) => (
                <MotionBox
                  key={id}
                  className="dashboard-card"
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
