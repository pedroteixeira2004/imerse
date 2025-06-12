import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AppLayout2 from "./Layout2";
import Gradiente from "../assets/imagens/gradiente_game_details.svg";
import add_library from "../assets/icones/add_library.png";
import LoadingDetails from "./LoadingDetails";
import imagem_default from "../assets/imagens/fundo_jogos2.png"; // Imagem padrão para o background

const GameDetails = () => {
  const { appId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const preloaded = location.state || {};

  const [game, setGame] = useState(
    preloaded.name
      ? {
          name: preloaded.name,
          short_description: preloaded.description || "",
          background_raw: preloaded.backgroundUrl || null,
        }
      : null
  );

  const [reviewSummary, setReviewSummary] = useState(
    preloaded.reviewSummary
      ? { review_score_desc: preloaded.reviewSummary }
      : null
  );

  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchGameData = async () => {
      // Se já recebemos os dados via location.state, não buscar novamente
      if (game && reviewSummary) return;

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

        if (detailsData[appId]?.success) {
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

    fetchGameData();

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
  console.log("Review summary:", reviewSummary);
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${game.background_raw || imagem_default})`,
      }}
    >
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
            {reviewSummary?.review_score_desc &&
              reviewSummary.review_score_desc !== "No user reviews" && (
                <div className="flex items-center space-x-4 mt-10">
                  <button
                    onClick={() => navigate(`/filters/${appId}`)}
                    className="px-5 py-2 text-white text-lg font-bold rounded-full button2 font-sf"
                  >
                    Analyse game
                  </button>
                  <button className="expandable-button rounded-full mx-6">
                    <img src={add_library} alt="Add to library" />
                    <span className="text font-sf font-bold">
                      Add to library
                    </span>
                  </button>
                </div>
              )}
          </div>
        </div>
      </AppLayout2>
    </div>
  );
};

export default GameDetails;
