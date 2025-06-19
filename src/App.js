import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./componentes/SearchPage";
import GameListPage from "./componentes/GameListPage";
import ReviewsPage from "./componentes/ReviewsPage";
import GameDetails from "./componentes/GameDetails";
import InsightPage from "./componentes/InsightPage";
import Reports from "./componentes/Reports";
import Profile from "./componentes/Profile";
import Filters from "./componentes/FiltersPage";
import RegistrationForm from "./componentes/Registo";
import LoginForm from "./componentes/LoginForm";
import ForgotPassword from "./componentes/ForgotPassword";
import ProtectedRoute from "./componentes/ProtectedRoute";
import Compare from "./componentes/ComparePage";
import { Toaster } from "react-hot-toast";
import GameComparison from "./componentes/GameComparison";
import AIComparisonResult from "./componentes/AIComparisonResult";
import Library from "./componentes/Library";
import Cart from "./componentes/Cart";
import FolderContentPage from "./componentes/FolderContentPage";

function App() {
  return (
    <Router>
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              background: "transparent", // para glass funcionar
              boxShadow: "none",
            },
          }}
        />
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
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
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
            path="/compare"
            element={
              <ProtectedRoute>
                <Compare />
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
            path="/library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
          <Route
            path="/library/folder/:folderId"
            element={
              <ProtectedRoute>
                <FolderContentPage />
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
          <Route
            path="/game-comparison"
            element={
              <ProtectedRoute>
                <GameComparison />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-comparison-result"
            element={
              <ProtectedRoute>
                <AIComparisonResult />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
