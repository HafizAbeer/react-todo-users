import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Header = () => {
  const { isAuthenticate, setIsAuthenticate } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    setIsAuthenticate(false);
    localStorage.setItem("isAuthenticate", "false");
    navigate("/login");
  };

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#c21807" }}
      >
        <div className="container">
          <Link to={"/home"} className="navbar-brand text-white">
            Todo Web
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to={"/about"}
                  className="nav-link active text-white"
                  aria-current="page"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/contact"} className="nav-link text-white">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                {isAuthenticate ? (
                  <button
                    className="btn btn-outline-danger text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-success"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
