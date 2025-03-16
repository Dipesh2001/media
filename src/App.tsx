import Layout from "./components/common/Layout";
import { protectedRoutes, publicRoutes } from "./app/routes";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useValidateAdminQuery } from "./features/adminApi";
import { useEffect, useMemo, useState } from "react";

const App = () => {
  const { data, isLoading } = useValidateAdminQuery();
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // useEffect(() => {
  //   setIsAuthenticated(data?.authToken ? true : false);
  // }, [data]);
  // ✅ Use useMemo to derive authentication state directly from query data
  const isAuthenticated = useMemo(() => !!data?.authToken, [data]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
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
