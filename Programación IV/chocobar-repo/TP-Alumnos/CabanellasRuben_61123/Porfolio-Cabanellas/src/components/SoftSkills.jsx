import React from 'react'

function SoftSkills() {
  const skills = ['Trabajo en equipo', 'Comunicación', 'Resolución de problemas', 'Adaptabilidad']

  return (
    <section id="softskills" className="card p-3 mb-4">
      <h3>Soft Skills</h3>
      <ul className="list-group list-group-horizontal flex-wrap">
        {skills.map((s, i) => (
          <li key={i} className="list-group-item m-1">{s}</li>
        ))}
      </ul>
    </section>
  )
}

export default SoftSkills
