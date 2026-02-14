import React from 'react'

function Idiomas() {
  const idiomas = [
    { id: 'es', idioma: 'Español', nivel: 'Nativo' },
    { id: 'en', idioma: 'Inglés', nivel: 'Intermedio B1' }
  ]

  return (
    <section id="idiomas" className="card p-3 mb-4">
      <h3>Idiomas</h3>
      <ul>
        {idiomas.map(l => (
          <li key={l.id}>{l.idioma} — <span className="text-muted">{l.nivel}</span></li>
        ))}
      </ul>
    </section>
  )
}

export default Idiomas
