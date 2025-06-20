import React from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/icones/imerse_icon.png";
import home from "../assets/icones/home.png";
import reports from "../assets/icones/reports.png";
import library from "../assets/icones/library.png";
import compare from "../assets/icones/compare.png";
import carrinho from "../assets/icones/carro_compra.png";
import profile from "../assets/icones/profile.png";
import "../navbar.css";
function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar flex flex-col justify-center">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <nav className="nav-list">
        <Link to="/home">
          <button className={`navButton ${isActive("/home") ? "active" : ""}`}>
            <img src={home} alt="Home" />
            <span className="font-sf">Home</span>
          </button>
        </Link>
        <Link to="/reports">
          <button
            className={`navButton ${isActive("/reports") ? "active" : ""}`}
          >
            <img src={reports} alt="Reports" />
            <span className="font-sf">Reports</span>
          </button>
        </Link>
        <Link to="/library">
          <button
            className={`navButton ${isActive("/library") ? "active" : ""}`}
          >
            <img src={library} alt="Library" />
            <span className="font-sf">Library</span>
          </button>
        </Link>
        <Link to="/compare">
          <button
            className={`navButton ${isActive("/compare") ? "active" : ""}`}
          >
            <img src={compare} alt="Compare" />
            <span className="font-sf">Compare</span>
          </button>
        </Link>
        <Link to="/cart">
          <button className={`navButton ${isActive("/cart") ? "active" : ""}`}>
            <img src={carrinho} alt="Cart" />
            <span className="font-sf">Cart</span>
          </button>
        </Link>
        <Link to="/profile">
          <button
            className={`navButton ${isActive("/profile") ? "active" : ""}`}
          >
            <img src={profile} alt="Profile" className="profile-img" />
            <span className="font-sf">Profile</span>
          </button>
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
