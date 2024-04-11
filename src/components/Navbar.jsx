import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRole } from "../features/session/sessionSlice";

function Navbar() {
  const { pathname } = useLocation();
  useEffect(() => {
    const navbarLinks = document.getElementsByTagName("a");
    Object.entries(navbarLinks).map(([key, value]) => {
      value.attributes.href.value === pathname
        ? value.classList.add("active")
        : value.classList.remove("active");
    });
  }, [pathname]);

  const role = useSelector(selectRole);

  function logout() {
    localStorage.clear();
  }
  return (
    <nav className="navbar navbar-expand-md bg-primary navbar-dark fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand mb-0 h1 d-flex align-items-end ">
          uizia
          <img src="final_white.png" width="30px" />
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
          <div className="navbar-nav navbar-collapse justify-content-end">
            <Link to="/" className="nav-link" aria-current="page">
              الصفحة الرئيسية
            </Link>
            {role !== "" && (
              <Link to="/profile" className="nav-link">
                الملف الشخصي
              </Link>
            )}
            {(role === "Teacher" || role === "Student") && (
              <Link to="/requests" className="nav-link">
                قائمة الطلبات
              </Link>
            )}
            <Link to="/login" onClick={logout} className="nav-link">
              تسجيل خروج
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
