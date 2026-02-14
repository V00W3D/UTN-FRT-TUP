import React from 'react'

function Estudios() {
  const estudios = [
    { id: 1, titulo: 'Tecnicatura Universitaria en Programación', institucion: 'Universidad  Tecnológica Nacional', año: '2023 - 2025' },
    { id: 2, titulo: 'Licenciatura en Administración de Empresas', institucion: 'Univarsidad Nacional Tres de Febrero', año: '2025- En curso' }
  ]

  return (
    <section id="estudios" className="card p-3 mb-4">
      <h3>Estudios</h3>
      <ul className="list-group list-group-flush">
        {estudios.map(e => (
          <li key={e.id} className="list-group-item">
            <strong>{e.titulo}</strong><br />
            <small>{e.institucion} — {e.año}</small>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Estudios
