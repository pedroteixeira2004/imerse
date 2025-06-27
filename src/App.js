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
import ReportsResults from "./componentes/Reports/ReportsResults";
import ReportDetails from "./componentes/Reports/ReportDetails";
import Checkout from "./componentes/Checkout";
import PaymentConfirmation from "./componentes/PaymentConfirmation";
import PublicOnlyRoute from "./componentes/PublicOnlyRoute";
import ExplanationPage from "./componentes/ExplanationPage";
import GamePage from "./componentes/Preview/GamePage";
import GameDetailsPreview from "./componentes/Preview/GameDetailsPreview";
import FiltersPreview from "./componentes/Preview/FiltersPreview";
import ReviewsPagePreview from "./componentes/Preview/ReviewsPagePreview";
function App() {
  return (
    <Router>
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              background: "transparent",
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
            path="/reports-results"
            element={
              <ProtectedRoute>
                <ReportsResults />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report-details/:id"
            element={
              <ProtectedRoute>
                <ReportDetails />
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
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-confirmation"
            element={
              <ProtectedRoute>
                <PaymentConfirmation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicOnlyRoute>
                <RegistrationForm />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <LoginForm />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicOnlyRoute>
                <ForgotPassword />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/preview-gamepage"
            element={
              <PublicOnlyRoute>
                <GamePage />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/preview-gamedetails/:appId"
            element={
              <PublicOnlyRoute>
                <GameDetailsPreview />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/preview-filters/:appId"
            element={
              <PublicOnlyRoute>
                <FiltersPreview />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/preview-reviews/:appId"
            element={
              <PublicOnlyRoute>
                <ReviewsPagePreview />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/"
            element={
              <PublicOnlyRoute>
                <ExplanationPage />
              </PublicOnlyRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
