import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./componentes/SearchPage";
import GameListPage from "./componentes/GameListPage";
import ReviewsPage from "./componentes/ReviewsPage";
import GameDetails from "./componentes/GameDetails";
import InsightPage from "./componentes/InsightPage";
import Reports from "./componentes/Reports";
import Filters from "./componentes/FiltersPage";
import RegistrationForm from "./componentes/Registo";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/games" element={<GameListPage />} />
          <Route path="/reviews/:appId" element={<ReviewsPage />} />
          <Route path="/details/:appId" element={<GameDetails />} />
          <Route path="/insight" element={<InsightPage />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/filters/:appId" element={<Filters />} />
          <Route path="/registration" element={<RegistrationForm />} />
          {/* Adicione outras rotas conforme necessário */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
