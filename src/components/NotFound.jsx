import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="container my-4 py-4">
      <h1>لم يتم العثور على الصفحة المُراد الحصول عليها</h1>
      <Link to="/" className="h4 link-success">
        العودة للصفحة الرئيسية
      </Link>
    </main>
  );
}

export default NotFound;
