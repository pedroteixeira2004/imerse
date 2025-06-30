import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/Inicializacao";
import Loading from "./Loading";

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  if (!user) return <Navigate to="/login" />;
  if (!user.emailVerified)
    return <Navigate to="/login" replace state={{ emailNotVerified: true }} />;

  return children;
}

export default ProtectedRoute;
