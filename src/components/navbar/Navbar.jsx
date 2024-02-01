import React from "react";
import "./Navbar.css";
import { CgNotes } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/auth/authActions";

function Navbar({ isLoggedIn, logoutUser }) {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <b className="brand-name">
            {" "}
            <CgNotes /> TaskMaster
          </b>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item m-1">
              <Link className={`nav-link ${window.location.pathname === "/" ? "active":""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item m-1">
              <Link className={`nav-link ${window.location.pathname === "/aboutus" ? "active":""}`} aria-current="page" to="/aboutus">
                About Us
              </Link>
            </li>
            <li className="nav-item m-1">
              <Link className={`nav-link ${window.location.pathname === "/todo" ? "active":""}`} aria-current="page" to="/todo">
                Todo
              </Link>
            </li>
            {isLoggedIn ? (
              <li className="nav-item m-1">
                <button
                  className="btn btn-outline-danger"
                  aria-current="page"
                  onClick={() => {
                    localStorage.removeItem("user")
                    logoutUser();
                    navigate("/")
                  }}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item m-1">
                  <Link
                    className="btn btn-outline-success"
                    aria-current="page"
                    to="/signin"
                  >
                    SignIn
                  </Link>
                </li>
                <li className="nav-item m-1">
                  <Link
                    className="btn btn-outline-success"
                    aria-current="page"
                    to="/signup"
                  >
                    SignUp
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
