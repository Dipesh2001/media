import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

const Layout = ({ isAuthenticated }) => {
  return (
    <div className="container-scroller">
      <ToastContainer />
      {isAuthenticated ? (
        <>
          <Navbar />
          <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
              <Outlet />
              <Footer />
            </div>
          </div>
        </>
      ) : (
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Layout;
