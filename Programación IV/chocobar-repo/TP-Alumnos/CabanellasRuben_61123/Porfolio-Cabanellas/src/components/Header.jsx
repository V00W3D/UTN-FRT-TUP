import React from 'react'

function Header() {
  return (
    <header className="text-center mb-4">
      <img
        src="/Foto.jpg"
        alt="Foto personal"
        className="rounded-circle mb-3"
         width="180"
        height="180"  
      />
      <h1>Rubén Cabanellas</h1>
      <p className="text-muted">Desarrollador Frontend | React & JavaScript | Backend con C# y .Net</p>

      <nav className="nav justify-content-center mt-3">
        <a href="#estudios" className="nav-link">Estudios</a>
        <a href="#softskills" className="nav-link">Soft Skills</a>
        <a href="#proyectos" className="nav-link">Proyectos</a>
        <a href="#experiencia" className="nav-link">Experiencia</a>
        <a href="#idiomas" className="nav-link">Idiomas</a>
      </nav>
    </header>
  )
}

export default Header
