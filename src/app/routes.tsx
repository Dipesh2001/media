import Albums from "../components/pages/Albums";
import Dashboard from "../components/pages/Dashboard";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import Users from "../components/pages/Users";

export const publicRoutes = [
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
];
export const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/users", element: <Users /> },
  { path: "/albums", element: <Albums /> },
];
