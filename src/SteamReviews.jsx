import React, { useState } from "react";

const SteamReviews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [appId, setAppId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [info, setInfo] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar jogos pela Steam API
  const fetchGames = async (gameName) => {
    try {
      const response = await fetch("http://localhost:5000/api/game-list");
      const data = await response.json();

      // Filtra jogos que contem a palavra do nome
      const filteredGames = data.applist.apps.filter((game) =>
        game.name.toLowerCase().includes(gameName.toLowerCase())
      );

      if (filteredGames.length > 0) {
        setGames(filteredGames);
      } else {
        setError("Nenhum jogo encontrado com esse nome.");
      }
    } catch (err) {
      setError("Erro ao buscar jogos.");
    }
  };

  // Função para buscar as reviews do jogo
  const fetchReviews = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${id}`);
      const data = await response.json();

      if (data.success) {
        setReviews(data.reviews);
        setInfo(data.query_summary);
      } else {
        throw new Error("Falha ao carregar as reviews");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      setError("Digite um nome de jogo!");
      return;
    }

    // Limpar jogos e reviews anteriores antes de buscar novos resultados
    setGames([]); // Limpar jogos encontrados
    setReviews([]); // Limpar reviews anteriores
    setInfo([]);
    setError(null); // Limpar qualquer erro anterior

    try {
      // Primeiramente, busca os jogos
      await fetchGames(searchTerm);
    } catch (err) {
      setError(err.message);
      setReviews([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Digite o nome do jogo"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {error && <p style={{ color: "red" }}>Erro: {error}</p>}

      {games.length > 0 && !loading && !error && (
        <div>
          <h3>Jogos encontrados:</h3>
          <ul>
            {games.map((game) => (
              <li key={game.appid}>
                <button onClick={() => fetchReviews(game.appid)}>
                  {game.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading && <p>A carregar reviews...</p>}

      {reviews.length === 0 && !loading && !error ? (
        <p>Digite um jogo para ver os comentários.</p>
      ) : (
        <ul>
          <p>{info.review_score_desc}</p>
          {reviews.map((review) => (
            <li key={review.recommendationid}>
              <div>{review.review_score_desc}</div>
              <p>{review.review}</p>
              <p>
                <strong>Autor:</strong> {review.author.steamid}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SteamReviews;
