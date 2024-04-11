import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import LoginPage from "./LoginPage";

function Layout() {
  if (localStorage.length <= 0) return <LoginPage />;

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="py-5 mt-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
