import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/Inicializacao";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Sessão terminada com sucesso.");
      navigate("/login"); // Redireciona para a tela de login
    } catch (error) {
      console.error("Erro ao terminar sessão:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
