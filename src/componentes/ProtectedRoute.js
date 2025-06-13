// src/componentes/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/Inicializacao";

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p className="text-black">Carregando...</p>;

  if (!user) return <Navigate to="/login" />;
  if (!user.emailVerified)
    return <Navigate to="/login" replace state={{ emailNotVerified: true }} />;

  return children;
}

export default ProtectedRoute;
