import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRole } from "../features/session/sessionSlice";

function Footer() {
  const role = useSelector(selectRole);
  return (
    <footer className="navbar mt-auto bg-primary navbar-dark">
      <div className="container">
        <div>
          <div className="navbar-text text-white">
            &copy; جميع الحقوق محفوظة
          </div>
          <div className="navbar-nav flex-row gap-2">
            <span className="navbar-text text-white">للتواصل على واتساب:</span>
            <Link to="tel:0999999999" className="nav-link">
              0999999999
            </Link>
          </div>
        </div>
        <div className="navbar-nav flex-row gap-4">
          <Link to="/about" className="nav-link">
            حولنا
          </Link>
          {role !== "Student" && (
            <Link to="/bundles" className="nav-link">
              باقات
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
