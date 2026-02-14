import { useStudentUIStore } from "../store/StudentUIStore";
import CursosSection from "../components/StudentHome/CursosSection";
import MisInscripcionesSection from "../components/StudentHome/MisInscripcionesSection";
import { useAuthStore } from "../store/AuthStore";

const StudentHomeLayout = () => {
  const { section, setSection, mode, setMode } = useStudentUIStore();
  const { clearUser } = useAuthStore();
  const handleModeChange = (newMode) => setMode(newMode);

  return (
    <div className="student-container">
      {/* 🔹 Navbar superior */}
      <nav className="student-navbar">
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
            className={section === "misinscripciones" ? "active" : ""}
            onClick={() => setSection("misinscripciones")}
          >
            Inscripciones
          </li>
        </ul>
      </nav>

      {/* 🔸 Modo actual */}

      <div className="crud-modes">
        {["ver", "inscribir"].map((m) => (
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
      <main className={`student-body mode-${mode}`}>
        {section === "cursos" && <CursosSection />}
        {section === "misinscripciones" && <MisInscripcionesSection />}
      </main>
    </div>
  );
};

export default StudentHomeLayout;
