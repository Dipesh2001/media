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

const App = () => {
  const { data, isLoading, error } = useValidateAdminQuery();
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // useEffect(() => {
  //   setIsAuthenticated(data?.authToken ? true : false);
  // }, [data]);
  // ✅ Use useMemo to derive authentication state directly from query data

  // const isAuthenticated = useMemo(() => !!data?.authToken, [data]);
  const isAuthenticated = error ? false : !!data?.authToken;
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
