import React from "react";
import { Link } from "react-router-dom";

function AdminUi() {
  return (
    <Link to="/admin" className="btn btn-outline-secondary">
      Admin Dashboard
    </Link>
  );
}

export default AdminUi;
