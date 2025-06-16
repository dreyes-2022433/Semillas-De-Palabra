import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Edit, Trash2, Users, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  getAllUsersRequest,
  updateUserRequest,
  deleteUserRequest
} from '../../services/api.js'
import './Styles/Admin.css'

const MotionBox = motion.div

export const UserActionsDashboard = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const res = await getAllUsersRequest(100, 0)
    if (!res.error) {
      const activeUsers = (res.data.users || []).filter(u => u.status !== false)
      setUsers(activeUsers)
    }
  }

  const handleUpdate = async (user) => {
    const updatedName = prompt('Nuevo nombre:', user.name)
    if (!updatedName) return
    const res = await updateUserRequest({ idUser: user._id, name: updatedName })
    if (!res.error) {
      toast.success('Usuario actualizado')
      fetchUsers()
    } else {
      toast.error('Error al actualizar')
    }
  }

  const handleDelete = async (userToDelete) => {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    if (!currentUser) {
      toast.error("No hay sesión activa")
      return
    }

    const confirm = window.confirm(`¿Estás seguro de eliminar a ${userToDelete.name}?`)
    if (!confirm) return

    const res = await deleteUserRequest(userToDelete._id)

    if (res.error || res.data?.success === false) {
      toast.error(res?.data?.message || "Error al eliminar usuario.")
    } else {
      toast.success(res.data.message || "Usuario eliminado correctamente")
      fetchUsers()
    }
  }

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  )

  if (selectedUser) {
    return (
      <div className="main-page-container">
        <header className="main-header">
          <div className="header-content">
            <button
              onClick={() => setSelectedUser(null)}
              style={{
                backgroundColor: '#406640',
                color: 'white',
                padding: '0.6rem 1.2rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                margin: '1rem 2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem'
              }}
            >
              <ArrowLeft size={18} /> Volver al Panel
            </button>
          </div>
        </header>

        <div className="main-layout">
          <div className="main-content" style={{ padding: '2rem' }}>
            <div style={{
              backgroundColor: '#f2e8cf',
              padding: '2.5rem',
              borderRadius: '2.5rem',
              fontSize: '1.2rem',
              color: '#333',
              textAlign: 'center',
              fontFamily: 'Segoe UI, Roboto, sans-serif',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: '800', color: '#2f3e2d' }}>
                Detalles del Usuario
              </h2>

              <p><strong>👤 Nombre:</strong> {selectedUser.name}</p>
              <p><strong>📧 Correo:</strong> {selectedUser.email || 'No especificado'}</p>
              <p><strong>🧩 Rol:</strong> {selectedUser.role}</p>
              <p><strong>📱 CUI:</strong> {selectedUser.CUI}</p>
              <p><strong>📍 Estado:</strong> {selectedUser.status ? 'Activo' : 'Inactivo'}</p>
              <p><strong>🆔 ID:</strong> {selectedUser._id}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="main-page-container">
      <header className="main-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-section">
              <div className="logo-icon">
                <Users size={24} />
              </div>
              <span className="logo-text">Usuarios</span>
            </div>
            <div className="search-section">
              <div className="search-icon">
                <Search size={16} />
              </div>
              <input
                placeholder="Buscar usuario..."
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="main-layout">
        <div className="main-content">
          <div style={{ marginBottom: '1.5rem' }}>
            <button
              onClick={() => navigate('/admin')}
              style={{
                backgroundColor: '#406640',
                color: 'white',
                padding: '0.6rem 1.2rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem'
              }}
            >
              <ArrowLeft size={18} /> Volver al Panel
            </button>
          </div>
          <h1 className="dashboard-title" style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', fontWeight: '600' }}>
            Administrar Usuarios
          </h1>
          <div className="card-grid" style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr' }}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <MotionBox
                  key={user._id}
                  className="dashboard-card"
                  style={{
                    backgroundColor: '#A7D7A7',
                    fontFamily: 'Segoe UI, Roboto, sans-serif',
                    padding: '2rem',
                    fontSize: '1.3rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '1rem',
                    cursor: 'pointer'
                  }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedUser(user)}
                >
                  <div>
                    <strong>{user.name}</strong> <br />
                    <span style={{ fontSize: '0.9rem' }}>{user.email}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={(e) => { e.stopPropagation(); handleUpdate(user) }} title="Actualizar usuario">
                      <Edit size={20} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(user) }} title="Eliminar usuario">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </MotionBox>
              ))
            ) : (
              <p style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', fontSize: '1rem', color: '#444' }}>
                No se encontraron usuarios.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
