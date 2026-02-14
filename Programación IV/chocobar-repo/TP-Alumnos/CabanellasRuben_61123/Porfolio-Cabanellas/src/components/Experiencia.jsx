import React from 'react'

function Experiencia() {
  const experiencia = [
    {
      id: 1,
      cargo: 'Desarrollador Full Stack',
      empresa: 'Cabanellas Soluciones Informáticas',
      periodo: '2024 - Presente',
      tareas: ['Soporte Técnico', 'Frontend con React', 'Gestión de base de datos', 'Desarrollo de Aplicaciones a Medida']
    }
  ]

  return (
    <section id="experiencia" className="card p-3 mb-4">
      <h3>Experiencia Laboral</h3>
      {experiencia.map(ex => (
        <div key={ex.id} className="mb-3">
          <h5>{ex.cargo} — {ex.empresa}</h5>
          <small>{ex.periodo}</small>
          <ul className="mt-2">
            {ex.tareas.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default Experiencia
