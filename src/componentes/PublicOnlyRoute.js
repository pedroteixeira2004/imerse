import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/Inicializacao";
import Loading from "./Loading";

function PublicOnlyRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  if (user && user.emailVerified) {
    return <Navigate to="/home" />;
  }

  return children;
}

export default PublicOnlyRoute;
