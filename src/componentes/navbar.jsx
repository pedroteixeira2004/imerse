import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/Inicializacao";

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
  const [cartCount, setCartCount] = useState(0);

  const isActive = (path) => location.pathname === path;

  async function fetchCartCount() {
    const user = auth.currentUser;
    if (!user) {
      setCartCount(0);
      return;
    }

    try {
      const cartDocRef = doc(db, "users", user.uid, "cart", "myCart");
      const cartDocSnap = await getDoc(cartDocRef);

      if (cartDocSnap.exists()) {
        const reports = cartDocSnap.data().reports || [];
        setCartCount(reports.length);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error("Erro ao buscar carrinho:", error);
      setCartCount(0);
    }
  }

  useEffect(() => {
    fetchCartCount();

    // Escuta evento global para atualizar contador do carrinho
    const handler = () => {
      fetchCartCount();
    };
    window.addEventListener("cart-updated", handler);

    return () => window.removeEventListener("cart-updated", handler);
  }, []);

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
        <Link to="/cart" className="relative">
          <button className={`navButton ${isActive("/cart") ? "active" : ""}`}>
            <img src={carrinho} alt="Cart" />
            <span className="font-sf">Cart</span>
            {cartCount > 0 && (
              <span
                className="absolute top-0 right-0 mt-4 mr-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 button2 rounded-full"
                style={{ minWidth: "20px", height: "20px" }}
              >
                {cartCount}
              </span>
            )}
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
