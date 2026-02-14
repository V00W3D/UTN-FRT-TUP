import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

const PrivateRoute = ({ children }) => {
  const { user, token } = useUserStore();

  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
