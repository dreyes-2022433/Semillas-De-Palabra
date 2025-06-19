import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { LogIn, UserPlus, Menu, X, BookOpenCheck, Shield, Zap, Globe, Clock, ArrowRight, Play, Star, AlertTriangle, Heart, Users, Award, ChevronDown } from 'lucide-react'
import "./InitialPage.css"

const MotionBox = motion.div

export const InitialPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const features = [
    {
      icon: <BookOpenCheck className="feature-icon" />,
      title: "Educación Accesible",
      description: "Diseñada para alfabetizar de forma amigable y efectiva, adaptándose a diferentes niveles de aprendizaje"
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Plataforma Segura",
      description: "Protegemos los datos de cada usuario con responsabilidad y cumplimos con estándares internacionales"
    },
    {
      icon: <Zap className="feature-icon" />,
      title: "Uso Intuitivo",
      description: "Fácil de navegar incluso para quienes no están familiarizados con la tecnología digital"
    }
  ]

  const testimonials = [
    {
      name: "María González",
      location: "Quetzaltenango",
      text: "Gracias a Semilla de Palabras, ahora puedo leer las cartas de mis hijos.",
      avatar: "👩‍🦳"
    },
    {
      name: "Carlos Morales",
      location: "Huehuetenango", 
      text: "Una herramienta que realmente cambia vidas. Fácil de usar y muy efectiva.",
      avatar: "👨‍🌾"
    }
  ]

  return (
    <div className="initial-page">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="bg-shape shape-4"></div>
      </div>

      {/* Header */}
      <header className={`initial-header ${scrollY > 50 ? 'scrolled' : ''}`}>
        <div className="initial-header-content">
          <motion.div
            className="initial-logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="logo-container">
              <img
                src="https://res.cloudinary.com/dxvwrech8/image/upload/v1750044062/Logo_evrmiv.png"
                alt="Logo Semilla de Palabras"
                className="initial-logo-img"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
              <div className="logo-text-container">
                <span className="initial-logo-text">Semilla de Palabras</span>
                <span className="logo-subtitle">Alfabetización Digital</span>
              </div>
            </div>
          </motion.div>

          <button className={`initial-menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={`initial-nav-links ${isMenuOpen ? 'active' : ''}`}>
            <motion.button 
              className="initial-nav-button login-btn" 
              onClick={() => navigate('/login')} 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <LogIn size={18} />
              <span>Iniciar Sesión</span>
            </motion.button>
            <motion.button 
              className="initial-nav-button register-btn" 
              onClick={() => navigate('/register')} 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <UserPlus size={18} />
              <span>Registrarse</span>
            </motion.button>
          </nav>
        </div>
      </header>

      <main className="initial-main">
        {/* Hero Section */}
        <section className="initial-hero">
          <div className="hero-container">
            <div className="initial-hero-content">
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
              >
                <div className="hero-badge">
                  <Heart size={16} />
                  <span>Impacto Social</span>
                </div>
                <h1 className="hero-title">
                  Juntos sembramos el futuro con 
                  <span className="gradient-text"> Semilla de Palabras</span>
                </h1>
                <p className="hero-subtitle">
                  Una herramienta digital innovadora para alfabetizar a quienes más lo necesitan en Guatemala. 
                  Transformando vidas a través de la educación accesible.
                </p>
                <div className="hero-stats-mini">
                  <div className="mini-stat">
                    <strong>17.6%</strong>
                    <span>Analfabetismo</span>
                  </div>
                  <div className="mini-stat">
                    <strong>340+</strong>
                    <span>Municipios</span>
                  </div>
                  <div className="mini-stat">
                    <strong>100%</strong>
                    <span>Gratuito</span>
                  </div>
                </div>
                <div className="initial-hero-buttons">
                  <motion.button 
                    onClick={() => navigate('/register')} 
                    className="cta-primary" 
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(106, 153, 78, 0.4)" }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Comenzar Ahora</span>
                    <ArrowRight size={18} />
                  </motion.button>
                  <motion.button 
                    className="cta-secondary" 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play size={18} />
                    <span>Ver Demo</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="initial-hero-image" 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="hero-graphic">
                <div className="floating-card card-1">
                  <div className="card-content">
                    <Star className="card-icon" />
                    <span>Inclusiva</span>
                  </div>
                </div>
                <div className="floating-card card-2">
                  <div className="card-content">
                    <Shield className="card-icon" />
                    <span>Segura</span>
                  </div>
                </div>
                <div className="floating-card card-3">
                  <div className="card-content">
                    <Zap className="card-icon" />
                    <span>Fácil</span>
                  </div>
                </div>
                <div className="main-graphic">
                  <div className="book-animation">📖</div>
                </div>
                <div className="hero-decoration">
                  <div className="decoration-circle circle-1"></div>
                  <div className="decoration-circle circle-2"></div>
                  <div className="decoration-circle circle-3"></div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="initial-stats">
          <div className="stats-container">
            <motion.div 
              className="stats-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2>El Impacto de Nuestra Misión</h2>
              <p>Datos que reflejan la realidad guatemalteca</p>
            </motion.div>
            
            <div className="stats-grid">
              {[
                {
                  icon: <AlertTriangle size={24} />,
                  number: "17.6%",
                  label: "Tasa de Analfabetismo",
                  sublabel: "en Guatemala*",
                  color: "warning"
                },
                {
                  icon: <Heart size={24} />,
                  number: "100%",
                  label: "Acceso Gratuito",
                  sublabel: "para todos",
                  color: "success"
                },
                {
                  icon: <Clock size={24} />,
                  number: "24/7",
                  label: "Soporte Nacional",
                  sublabel: "disponible",
                  color: "info"
                },
                {
                  icon: <Globe size={24} />,
                  number: "340+",
                  label: "Municipios",
                  sublabel: "alcanzados",
                  color: "primary"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className={`initial-stat ${stat.color}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <strong className="stat-number">{stat.number}</strong>
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-sublabel">{stat.sublabel}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="features-container">
            <motion.div 
              className="features-header" 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
            >
              <h2>¿Por qué elegir Semilla de Palabras?</h2>
              <p>Una solución tecnológica diseñada para un problema real</p>
            </motion.div>
            
            <div className="features-grid">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="feature-card" 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6, delay: index * 0.2 }} 
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="feature-icon-container">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className="feature-arrow">
                    <ArrowRight size={16} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="testimonials-container">
            <motion.div 
              className="testimonials-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2>Historias que Inspiran</h2>
              <p>Testimonios reales de personas que han transformado sus vidas</p>
            </motion.div>
            
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="testimonial-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="testimonial-content">
                    <div className="quote-mark">"</div>
                    <p>{testimonial.text}</p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-avatar">{testimonial.avatar}</div>
                    <div className="author-info">
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-container">
            <motion.div
              className="cta-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2>¿Listo para comenzar tu viaje de aprendizaje?</h2>
              <p>Únete a miles de guatemaltecos que ya están transformando sus vidas</p>
              <motion.button
                onClick={() => navigate('/register')}
                className="cta-final"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users size={20} />
                <span>Comenzar Gratis Ahora</span>
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="initial-footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-logo">
              <img 
                src="https://res.cloudinary.com/dxvwrech8/image/upload/v1750044062/Logo_evrmiv.png" 
                alt="Logo Semilla" 
                className="footer-logo-img" 
              />
              <div className="footer-logo-text">
                <span>Semilla de Palabras</span>
                <small>IN6AM</small>
              </div>
            </div>
            <div className="footer-mission">
              <p>Comprometidos con la alfabetización y el desarrollo educativo de Guatemala</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Semilla De Palabras. Todos los derechos reservados.</p>
            <p className="footnote">* Fuente: INE Guatemala 2024</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
