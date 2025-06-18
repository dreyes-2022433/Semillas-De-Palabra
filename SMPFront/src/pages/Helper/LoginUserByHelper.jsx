import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../Admin/Styles/Admin.css'
import { Search, Bell, User } from 'lucide-react'
import { getAllUsersByRole, loginAsUser } from '../../services/api'

const MotionBox = motion.div

export const LoginUserByHelper = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isHelper, setIsHelper] = useState(false)
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const navigate = useNavigate()

  // Verificación inicial
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const impersonating = localStorage.getItem('impersonating')
    const token = localStorage.getItem('token')

    try {
      const user = storedUser ? JSON.parse(storedUser) : null

      if (!user || !token) {
        localStorage.clear()
        navigate('/', { replace: true })
      } else if (impersonating === 'true' && user.role?.toLowerCase() !== 'helper') {
        localStorage.clear()
        navigate('/', { replace: true })
      } else if (user.role?.toLowerCase() === 'helper') {
        setIsHelper(true)
      } else {
        localStorage.clear()
        navigate('/', { replace: true })
      }
    } catch {
      localStorage.clear()
      navigate('/', { replace: true })
    }
  }, [navigate])

  // Obtener usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getAllUsersByRole()
      if (result.error) {
        setErrorMessage(result.error.message || 'Error al obtener los usuarios.')
      } else {
        setUsers(result.users)
      }
    }
    fetchUsers()
  }, [])

  // Prevención de retroceso
  useEffect(() => {
    const handlePopState = () => {
      const storedUser = localStorage.getItem('user')
      const impersonating = localStorage.getItem('impersonating')
      const token = localStorage.getItem('token')
      const user = storedUser ? JSON.parse(storedUser) : null

      if (!token || (impersonating === 'true' && user?.role?.toLowerCase() !== 'helper')) {
        localStorage.clear()
        navigate('/', { replace: true })
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('impersonating')
    navigate('/', { replace: true })
  }

  const handleLoginAsUser = async () => {
    if (!selectedUser) return
    const result = await loginAsUser(selectedUser._id)
    if (result.error) {
      setErrorMessage(result.error.message || 'Error al intentar iniciar sesión como usuario.')
    } else {
      localStorage.setItem('token', result.token)
      localStorage.setItem('impersonating', 'true')
      localStorage.setItem('user', JSON.stringify(result.user))
      navigate('/main', { replace: true })
    }
  }

  const handleUserClick = (user) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const filteredUsers = users.filter(user =>
    `${user.name} ${user.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
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
              <div className="panel-search-icon"><Search size={16} /></div>
              <input
                placeholder="Buscar usuario..."
                className="panel-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="panel-header-right">
            <button className="panel-header-button"><Bell size={16} /><span>0</span></button>
            <button className="panel-header-button" onClick={handleLogout}>Cerrar sesión</button>
            <div className="panel-user"><div className="panel-avatar"><User size={16} /></div><span>Helper</span></div>
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
          <div className="panel-grid" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr' }}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <MotionBox
                  key={user._id}
                  className="panel-dashboard-card"
                  style={{
                    padding: '1.5rem',
                    fontSize: '1.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    borderRadius: '1rem',
                    backgroundColor: '#B4D59A',
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleUserClick(user)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <User size={30} />
                    <span>{user.name} {user.surname}</span>
                  </div>
                </MotionBox>
              ))
            ) : (
              <p style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', fontSize: '1.2rem', color: '#444' }}>
                No se encontraron usuarios.
              </p>
            )}
          </div>

          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
            <button onClick={() => navigate("/helper")} className="animated-back-button">
              Volver al panel del Helper
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>¿Estás seguro de que quieres iniciar sesión como {selectedUser?.name}?</h2>
            <button onClick={handleLoginAsUser}>Confirmar</button>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  )
}
