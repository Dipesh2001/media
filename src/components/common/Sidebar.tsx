import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const sidebarLinks = [
    {
      name: "Dashboard",
      path: "/",
      iconClass: "icon-grid menu-icon",
    },
    {
      name: "Albums",
      path: "/albums",
      iconClass: "icon-grid menu-icon fa fa-folder-open",
    },
    {
      name: "Artists",
      path: "/artists",
      iconClass: "icon-grid menu-icon fa fa-microphone",
    },
  ];

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        {sidebarLinks.map((link) => (
          <li
            key={link.path}
            className={`nav-item ${
              location.pathname === link.path ? "active" : ""
            }`}
          >
            <Link className="nav-link" to={link.path}>
              <i className={link.iconClass}></i>
              <span className="menu-title">{link.name}</span>
            </Link>
          </li>
        ))}
        {/* <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="collapse"
            href="#ui-basic"
            aria-expanded="false"
            aria-controls="ui-basic"
          >
            <i className="icon-layout menu-icon"></i>
            <span className="menu-title">UI Elements</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/ui-features/buttons.html">
                  Buttons
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/ui-features/dropdowns.html">
                  Dropdowns
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a
                  className="nav-link"
                  href="pages/ui-features/typography.html"
                >
                  Typography
                </a>
              </li>
            </ul>
          </div>
        </li> */}
      </ul>
    </nav>
  );
};

export default Sidebar;
