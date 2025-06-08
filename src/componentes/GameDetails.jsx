import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout2 from "./Layout2";
import Gradiente from "../assets/imagens/gradiente_game_details.svg";
import add_library from "../assets/icones/add_library.png";
import LoadingDetails from "./LoadingDetails";

const GameDetails = () => {
  const { appId } = useParams();
  const [game, setGame] = useState(null);
  const [reviewSummary, setReviewSummary] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchGameData = async () => {
      try {
        const [detailsRes, reviewsRes] = await Promise.all([
          fetch(`http://localhost:5000/api/game-details/${appId}`, {
            signal: controller.signal,
          }),
          fetch(`http://localhost:5000/api/reviews/${appId}`, {
            signal: controller.signal,
          }),
        ]);

        if (!detailsRes.ok) throw new Error("Erro ao buscar detalhes do jogo.");
        if (!reviewsRes.ok) throw new Error("Erro ao buscar reviews.");

        const detailsData = await detailsRes.json();
        const reviewsData = await reviewsRes.json();
        console.log("Dados de reviews:", reviewsData);

        if (detailsData[appId] && detailsData[appId].success) {
          setGame(detailsData[appId].data);
        } else {
          throw new Error("Dados de jogo inválidos ou não disponíveis.");
        }

        setReviewSummary(reviewsData.review_summary || null);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Erro no fetch:", err);
          setError(err.message);
        }
      }
    };

    if (appId) {
      setError(null); // resetar erro ao mudar de jogo
      setGame(null); // resetar loading ao mudar de jogo
      fetchGameData();
    }

    return () => {
      controller.abort();
    };
  }, [appId]);

  if (error)
    return (
      <p className="text-red-500 text-center mt-10 text-lg font-bold">
        {error}
      </p>
    );

  if (!game) return <LoadingDetails />;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${game.background_raw || Gradiente})`,
      }}
    >
      {/* overlay para escurecer a imagem e melhorar contraste */}
      <div className="absolute inset-0 z-0 bg-black/30"></div>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${Gradiente})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      ></div>
      <AppLayout2>
        <div className="relative z-10 flex items-end game-details">
          <div className="p-6 text-white">
            <h1 className="text-6xl font-bold mb-6 font-sf">{game.name}</h1>

            {reviewSummary?.review_score_desc ? (
              <div className="mb-7 font-sf text-2xl font-medium">
                {reviewSummary.review_score_desc}
              </div>
            ) : (
              <div className="mb-7 font-sf text-2xl font-medium">
                No reviews available.
              </div>
            )}

            <div className="text-3xl mb-5 font-sf font-semibold">
              Description
            </div>
            <div className="text-lg text-white font-sf descricao-jogo">
              {game.short_description}
            </div>

            <div className="flex items-center space-x-4 mt-10">
              <button
                onClick={() => navigate(`/filters/${appId}`)}
                className="px-5 py-2 text-white text-lg font-bold rounded-full button2 font-sf"
              >
                Analyse game
              </button>
              <button className="expandable-button rounded-full mx-6">
                <img src={add_library} alt="Add to library" />
                <span className="text font-sf font-bold">Add to library</span>
              </button>
            </div>
          </div>
        </div>
      </AppLayout2>
    </div>
  );
};

export default GameDetails;
