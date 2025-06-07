import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingList from "./LoadingList";
import Background from "./background";
import AppLayout2 from "./Layout2";

const GameListPage = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");

  useEffect(() => {
    const normalizeText = (text) => {
      return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, "")
        .trim();
    };

    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/game-list");
        const data = await response.json();
        const normalizedSearchTerm = normalizeText(searchTerm || "");

        const filteredGames = data.applist.apps.filter((game) => {
          const normalizedGameName = normalizeText(game.name);
          return normalizedGameName.includes(normalizedSearchTerm);
        });

        setGames(filteredGames);
      } catch (err) {
        setError("Erro ao buscar jogos.");
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) fetchGames();
  }, [searchTerm]);

  if (loading) {
    return <LoadingList />;
  }

  return (
    <div>
      <Background />
      <AppLayout2>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 font-sf text-white">
            Search Results
          </h2>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : games.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 font-sf">
              {games.map((game) => (
                <div
                  key={game.appid}
                  className="bg-white bg-opacity-30 backdrop-blur-lg shadow-lg rounded-3xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[0_0_40px_rgba(0,255,255,0.9)]"
                >
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {game.name}
                    </h3>
                    <button
                      onClick={() => navigate(`/details/${game.appid}`)}
                      className="px-5 py-2 text-white text-lg font-bold rounded-full 
                        bg-gradient-to-r from-blue-400 to-teal-400 text-sm
                        backdrop-blur-xl transition-all duration-500 
                        hover:shadow-[0_0_40px_rgba(0,255,255,0.9)]"
                    >
                      Explore game
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white font-sf">No results founded.</p>
          )}
        </div>
      </AppLayout2>
    </div>
  );
};

export default GameListPage;
