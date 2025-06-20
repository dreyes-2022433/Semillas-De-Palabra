import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  getModulesRequest,
  deleteModuleRequest,
  updateModuleRequest,
  createModuleRequest
} from '../../services/api'
import {Input} from "@chakra-ui/react"
import { ArrowLeft, BookOpen, Trash2, Edit2, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import './Styles/Admin.css'
import { ModuleContent } from '../../components/Modules/ModuleContent'
import { VideoContent } from '../../components/Modules/ModuleVideo'

const MotionBox = motion.div

export const AdminModulesDashboard = () => {
  const navigate = useNavigate()
  const [modules, setModules] = useState([])
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ name: '', description: '', image : null })
  const [isEditing, setIsEditing] = useState(false)
  

  useEffect(() => {
    fetchModules()
  }, [])

  const fetchModules = async () => {
    const res = await getModulesRequest()
    if (!res.error && res.data.success) {
      setModules(res.data.modules || [])
    }
  }
  

   const handleInputImage = (e) => {
    setForm({ ...form, image: e.target.files[0] })
  }

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('user'))
    if (!form.name || !form.description) {
      return toast.error('Rellena todos los campos')
    }

    if (isEditing) {
      const res = await updateModuleRequest({
        idModule: form.id,
        name: form.name,
        description: form.description
      })
      if (!res.error && res.data.success) {
        toast.success('Módulo actualizado')
      } else {
        toast.error('Error al actualizar')
      }
    } else {
      const formData = new FormData()
      formData.append('image',form.image)
      formData.append('name', form.name)
      formData.append('description', form.description)
      const res = await createModuleRequest(
        formData
    )
      if (!res.error && res.data.success) {
        toast.success('Módulo creado')
      } else {
        toast.error('Error al crear módulo')
      }
    }

    setForm({ name: '', description: ''})
    setIsEditing(false)
    fetchModules()
  }

  const handleEdit = (mod) => {
    setForm({ name: mod.name, description: mod.description})
    setIsEditing(true)
  }

  const handleDelete = async (idModule) => {
    if (window.confirm('¿Estás seguro de eliminar este módulo?')) {
      const res = await deleteModuleRequest(idModule)
      if (!res.error && res.data.success) {
        toast.success('Módulo eliminado')
        setModules(prev => prev.filter(m => m._id !== idModule)) 
      } else {
        toast.error('Error al eliminar módulo')
      }
    }
  }

  const filteredModules = modules.filter(mod =>
    mod.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="panel-page">
      <header className="panel-header">
        <div className="panel-header-content" style={{ justifyContent: 'space-between' }}>
          <button
            onClick={() => navigate('/admin')}
            style={{
              backgroundColor: '#386641',
              color: 'white',
              padding: '0.6rem 1.4rem',
              borderRadius: '0.8rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <ArrowLeft size={18} />
            Volver al Panel
          </button>
        </div>
      </header>

      <div className="panel-layout">
        <div className="panel-content">
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <form
              onSubmit={handleFormSubmit}
              style={{
                flex: '1 1 35%',
                minWidth: '300px',
                padding: '2.5rem',
                backgroundColor: '#e7f5dc',
                borderRadius: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '3rem',
                alignSelf: 'flex-start'
              }}
            >
              <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#406640', textAlign: 'center' }}>
                {isEditing ? 'Editar módulo' : 'Crear nuevo módulo'}
              </h2>
              <input
                type="text"
                name="name"
                placeholder="Nombre del módulo"
                value={form.name}
                onChange={handleInputChange}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #a0c49d',
                  backgroundColor: '#d8edcf',
                  fontSize: '1rem'
                }}
              />
              <textarea
                name="description"
                placeholder="Descripción del módulo"
                value={form.description}
                onChange={handleInputChange}
                rows={3}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #a0c49d',
                  backgroundColor: '#d8edcf',
                  fontSize: '1rem'
                }}
              />
               <Input
                                    type="file"
                                    onChange={handleInputImage}
                                   name="video"
                                    size="lg"
                                    p={3}
                                    borderColor="#a7c957"
                                    _hover={{ borderColor: "#6a994e" }}
                                    _focus={{
                                      borderColor: "#386641",
                                      boxShadow: "0 0 0 3px rgba(167, 201, 87, 0.1)",
                                    }}
                                  />
              <button
                type="submit"
                style={{
                  backgroundColor: isEditing ? '#ffa500' : '#4caf50',
                  color: 'white',
                  padding: '0.6rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1rem',
                  justifyContent: 'center'
                }}
              >
                <Save size={18} />
                {isEditing ? 'Actualizar' : 'Guardar'}
              </button>
            </form>

            <div style={{ flex: '1 1 60%' }}>
              <div className="panel-search-section" style={{ marginBottom: '1.5rem' }}>
                <input
                  placeholder="Buscar módulo..."
                  className="panel-search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="panel-grid" style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr' }}>
                {filteredModules.length > 0 ? (
                  filteredModules.map((mod) => (
                    <MotionBox
                      key={mod._id}
                      className="panel-dashboard-card"
                      style={{
                        backgroundColor: '#f6fddf',
                        fontFamily: 'Segoe UI, Roboto, sans-serif',
                        padding: '1.5rem',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: '1rem'
                      }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div>
                        <strong>{mod.name}</strong><br />
                        <span style={{ fontSize: '0.95rem' }}>{mod.description}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => handleEdit(mod)} title="Editar módulo">
                          <Edit2 size={20} />
                        </button>
                        <button onClick={() => handleDelete(mod._id)} title="Eliminar módulo">
                          <Trash2 size={20} />
                        </button  >
                        
                          <ModuleContent moduleId={mod._id}/>
                          <VideoContent moduleId={mod._id} />
                      </div>
                    </MotionBox >
                  ))
                ) : (
                  <p className="panel-no-results">No se encontraron módulos.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
