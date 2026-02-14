import "../CSS/AuthLayout.css";
import "../CSS/AuthForms.css";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import { useAuthUIStore } from "../store/AuthUIStore";

const AuthLayout = () => {
  const { formMode, setFormMode } = useAuthUIStore();

  return (
    <div className="auth-container">
      {/* Navbar superior */}
      <nav className="auth-navbar">
        <ul>
          <li
            className={formMode === "login" ? "active" : ""}
            onClick={() => setFormMode("login")}
          >
            <span>Iniciar Sesión</span>
          </li>
          <li
            className={formMode === "register" ? "active" : ""}
            onClick={() => setFormMode("register")}
          >
            <span>Registrarse</span>
          </li>
        </ul>
      </nav>

      {/* Cuerpo del formulario */}
      <main className="auth-body">
        {formMode === "login" && <LoginForm />}
        {formMode === "register" && <RegisterForm />}
      </main>
    </div>
  );
};

export default AuthLayout;
