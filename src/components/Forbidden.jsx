import React from "react";
import { Link } from "react-router-dom";

function Forbidden() {
  return (
    <main className="container my-4 py-4">
      <h1>ليس لديك صلاحية للوصول إلى العنوان المُدخل</h1>
      <Link to="/" className="h4 link-success">
        العودة للصفحة الرئيسية
      </Link>
    </main>
  );
}

export default Forbidden;
