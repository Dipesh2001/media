import Layout from "./components/common/Layout";
import { protectedRoutes, publicRoutes } from "./app/routes";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const isAuthenticated = false;

  return (
    <Router>
      <Routes>
        <Route element={<Layout isAuthenticated={isAuthenticated} />}>
          {(isAuthenticated ? protectedRoutes : publicRoutes).map(
            ({ path, element }, ind) => {
              return (
                <Route
                  key={path}
                  path={path}
                  index={ind == 0}
                  element={element}
                />
              );
            }
          )}
        </Route>
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to={"/dashboard"} />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
