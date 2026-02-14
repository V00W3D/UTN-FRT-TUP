import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/usersService";
import { useUserStore } from "../store/userStore";

export const useUser = () => {
  const navigate = useNavigate();
  const { user, token, setAuth, clearAuth } = useUserStore();

  const login = async ({ nombre, password }) => {
    try {
      const { user: loggedUser, token: authToken } = await loginUser({ nombre, password });
      setAuth({ user: loggedUser, token: authToken });
      navigate("/dashboard");
      return true;
    } catch (error) {
      console.error("Error en login:", error);
      return false;
    }
  };

  const register = async ({ nombre, password, email, rol }) => {
    try {
      await registerUser({ nombre, password, email, rol });
      login({nombre,password})
      return true;
    } catch (error) {
      console.error("Error en registro:", error);
      return false;
    }
  };

  const logout = () => {
    clearAuth();
    navigate("/");
  };

  return { user, token, login, register, logout };
};
