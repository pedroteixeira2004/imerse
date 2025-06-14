import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./componentes/SearchPage";
import GameListPage from "./componentes/GameListPage";
import ReviewsPage from "./componentes/ReviewsPage";
import GameDetails from "./componentes/GameDetails";
import InsightPage from "./componentes/InsightPage";
import Reports from "./componentes/Reports";
import Profile from "./componentes/Profile"; // Importando o componente de perfil
import Filters from "./componentes/FiltersPage";
import RegistrationForm from "./componentes/Registo";
import LoginForm from "./componentes/LoginForm"; // Importando o componente de login
import ForgotPassword from "./componentes/ForgotPassword";
import ProtectedRoute from "./componentes/ProtectedRoute"; // Importando a rota protegida
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games"
            element={
              <ProtectedRoute>
                <GameListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews/:appId"
            element={
              <ProtectedRoute>
                <ReviewsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/details/:appId"
            element={
              <ProtectedRoute>
                <GameDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/insight"
            element={
              <ProtectedRoute>
                <InsightPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/filters/:appId"
            element={
              <ProtectedRoute>
                <Filters />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />{" "}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Rota para o login */}
          {/* Adicione outras rotas conforme necessário */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
