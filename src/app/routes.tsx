import Dashboard from "../components/pages/Dashboard";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";

export const publicRoutes = [
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
];
export const protectedRoutes = [{ path: "/dashboard", element: <Dashboard /> }];
