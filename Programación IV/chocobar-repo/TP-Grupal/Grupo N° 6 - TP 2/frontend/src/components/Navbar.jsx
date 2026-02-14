import "../Styles/NavBar.css"

export default function NavBar({ setLogueado }) {

  // Función para cerrar sesión
  const handleCerrarSesion = () => {
    localStorage.removeItem('logueado');
    localStorage.removeItem('usuarioActual');
    if (setLogueado) setLogueado(false);
  };

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        
        
        <a href="/inicio" className="nav-links">
          Inicio
        </a>

        <a href="/pacientes" className="nav-links">
          Pacientes
        </a>

        <a href="/medicos" className="nav-links">
          Médicos
        </a>

        <a href="/turnos" className="nav-links">
          Turnos
        </a>
      </div>

      <button
        className='button-cerrar-sesion'
        onClick={handleCerrarSesion}
      >
        Cerrar Sesión
      </button>
    </nav>
  );
}
