function Experiencia() {
  return (
    <section className="experiencia-section">
      <div className="experiencia-content">
        <div className="status-container">
          <div className="message-container">
            <h2 className="section-title">Estado Actual</h2>
            <p className="main-message">
              Actualmente me encuentro enfocado en mi formación académica y desarrollando proyectos personales
            </p>
            
            <div className="future-goals">
              <div className="goal">
                <span className="goal-icon">📚</span>
                <span>Formación Continua</span>
              </div>
              <div className="goal">
                <span className="goal-icon">💻</span>
                <span>Desarrollo de Proyectos</span>
              </div>
              <div className="goal">
                <span className="goal-icon">🎯</span>
                <span>Búsqueda Activa</span>
              </div>
            </div>

            <div className="ready-badge">
              <span className="badge-dot"></span>
              Listo para nuevas oportunidades
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experiencia
