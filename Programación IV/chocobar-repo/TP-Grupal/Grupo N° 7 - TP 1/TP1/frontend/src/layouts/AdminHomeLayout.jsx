import { useAdminUIStore } from "../store/AdminUIStore";
import CursosAdminSection from "../components/AdminHome/CursosAdminSection";
import AlumnosAdminSection from "../components/AdminHome/AlumnosAdminSection";
import InscripcionesAdminSection from "../components/AdminHome/InscripcionesAdminSection";
import { useAuthStore } from "../store/AuthStore";
const AdminHomeLayout = () => {
  const { section, setSection, mode, setMode } = useAdminUIStore();
  const { clearUser } = useAuthStore();

  const handleModeChange = (newMode) => setMode(newMode);

  return (
    <div className="admin-container">
      {/* 🔹 Navbar superior */}
      <nav className="admin-navbar">
        <ul>
          <li
            className={section === "logout" ? "active" : ""}
            onClick={() => clearUser()}
          >
            <img src="/logout.png" alt="cerrar sesion" />
          </li>

          <li
            className={section === "cursos" ? "active" : ""}
            onClick={() => setSection("cursos")}
          >
            Cursos
          </li>
          <li
            className={section === "alumnos" ? "active" : ""}
            onClick={() => setSection("alumnos")}
          >
            Alumnos
          </li>
          <li
            className={section === "inscripciones" ? "active" : ""}
            onClick={() => setSection("inscripciones")}
          >
            Inscripciones
          </li>
        </ul>
      </nav>

      {/* 🔸 Modo actual */}
      <div className="crud-modes">
        {["ver", "crear", "editar", "eliminar"].map((m) => (
          <button
            key={m}
            className={`crud-btn ${mode === m ? "active" : ""}`}
            onClick={() => handleModeChange(m)}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 🔻 Contenido dinámico */}
      <main className={`admin-body mode-${mode}`}>
        {section === "cursos" && <CursosAdminSection mode={mode} />}
        {section === "alumnos" && <AlumnosAdminSection mode={mode} />}
        {section === "inscripciones" && (
          <InscripcionesAdminSection mode={mode} />
        )}
      </main>
    </div>
  );
};

export default AdminHomeLayout;
