import AlbumForm from "../components/forms/AlbumForm";
import ArtistForm from "../components/forms/ArtistForm";
import Albums from "../components/pages/Albums";
import Artists from "../components/pages/Artists";
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
  { path: "/albums/add", element: <AlbumForm /> },
  { path: "/albums/edit/:id", element: <AlbumForm /> },
  { path: "/artists", element: <Artists /> },
  { path: "/artists/add", element: <ArtistForm /> },
  { path: "/artists/edit/:id", element: <ArtistForm /> },
];
