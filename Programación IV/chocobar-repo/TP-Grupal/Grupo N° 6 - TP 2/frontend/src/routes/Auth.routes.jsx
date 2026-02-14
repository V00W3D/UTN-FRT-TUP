import AuthPage from "../pages/AuthPage";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

export const authRoutes = {
  path: "/auth",
  element: <AuthPage />,
  children: [
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
  ],
};
