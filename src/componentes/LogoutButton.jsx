// LogoutButton.jsx
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/Inicializacao";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import ConfirmLogoutOverlay from "./ConfirmLogoutOverlay";

function LogoutButton() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao terminar sessão:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="group flex items-center rounded-full px-6 py-3
        border border-white/30 backdrop-blur-[15px]
        bg-white/20 text-white font-bold text-xl
        hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]
        transition-all"
      >
        <FiLogOut size={22} />
        <span
          className="ml-0 max-w-0 overflow-hidden opacity-0 
          transition-all duration-300 whitespace-nowrap
          group-hover:opacity-100 group-hover:ml-3 group-hover:max-w-[150px]"
        >
          Log out
        </span>
      </button>

      <ConfirmLogoutOverlay
        isOpen={showConfirm}
        onConfirm={handleLogout}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}

export default LogoutButton;
