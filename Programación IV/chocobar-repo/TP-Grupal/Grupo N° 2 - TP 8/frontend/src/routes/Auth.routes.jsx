import AuthLayout from "../layouts/AuthLayout";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

export const authRoutes = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
  ],
};
