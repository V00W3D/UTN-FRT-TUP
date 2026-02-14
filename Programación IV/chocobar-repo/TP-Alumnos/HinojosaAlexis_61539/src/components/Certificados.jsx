function Certificados() {
  return (
    <section className="certificados-section">
      <div className="certificados-content">
        <div className="certificado-status">
          <div className="certificate-header">
            <div className="icon-container">
              <span className="certificate-icon">🎓</span>
              <div className="icon-pulse"></div>
            </div>
            <h3>Certificación en Proceso</h3>
          </div>

          <div className="certificate-card">
            <div className="certificate-info">
              <div className="certificate-title">
                <span className="institution-icon">🏛️</span>
                <h4>Tecnicatura Universitaria en Programación</h4>
              </div>
              <div className="certificate-details">
                <span className="detail-item">
                  <span className="detail-icon">📍</span>
                  UTN - FRT
                </span>
                <span className="detail-item">
                  <span className="detail-icon">📅</span>
                  2024 - 2025
                </span>
              </div>
            </div>

            <div className="progress-section">
              <div className="progress-stats">
                <div className="stat-item">
                  <span className="stat-label">Materias Aprobadas</span>
                  <span className="stat-value">12/18</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Promedio</span>
                  <span className="stat-value">8.5</span>
                </div>
              </div>

              <div className="progress-indicator">
                <div className="progress-label">
                  <span>Progreso General</span>
                  <span>80%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{width: '80%'}}>
                    <div className="progress-glow"></div>
                  </div>
                </div>
              </div>

              <div className="status-badge">
                <span className="status-dot"></span>
                En curso
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certificados
