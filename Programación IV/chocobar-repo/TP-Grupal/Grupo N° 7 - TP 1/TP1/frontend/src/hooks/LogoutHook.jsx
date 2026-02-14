// src/hooks/useLogout.js
import { useAuthStore } from "../store/AuthStore";
import { usePageStore } from "../store/PageStore";

const useLogout = () => {
  const { clearUser } = useAuthStore();
  const { setPage } = usePageStore();

  const logout = () => {
    clearUser();
    setPage("login");
  };

  return { logout };
};

export default useLogout;
