import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingList from "./LoadingList";
import Background from "./background";
import AppLayout2 from "./Layout2";
import SearchBar from "./SearchBar";
import GameCard from "./GameCard";

const GameListPage = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gamesLoaded, setGamesLoaded] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");

  useEffect(() => {
    const normalizeText = (text) => {
      return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[-_]/g, " ")
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    };

    const fetchGames = async () => {
      setLoading(true);
      setGamesLoaded(0);
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

  useEffect(() => {
    if (games.length > 0 && gamesLoaded === games.length) {
      setLoading(false);
    }
  }, [gamesLoaded, games.length]);

  if (loading) {
    return <LoadingList />;
  }

  return (
    <div>
      <Background />
      <AppLayout2>
        <div className="p-4 m-10 w-full">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : games.length > 0 ? (
            <div>
              {/* SearchBar centralizada, apenas quando há resultados */}
              <div className="flex justify-center mb-6 items-center">
                <SearchBar />
              </div>

              <h2 className="text-3xl font-bold mb-4 font-sf text-white">
                Search Results
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 font-sf mt-8">
                {games.map((game) => (
                  <GameCard
                    key={game.appid}
                    game={game}
                    onLoad={() => setGamesLoaded((prev) => prev + 1)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="items-center justify-center w-full h-screen">
              <div className="justify-center mb-6 items-center">
                <SearchBar />
              </div>

              <p className="text-white font-sf font-medium text-center text-3xl">
                No results found for "{searchTerm}".
              </p>
            </div>
          )}
        </div>
      </AppLayout2>
    </div>
  );
};

export default GameListPage;
