import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AppLayout2 from "./Layout2";
import Gradiente from "../assets/imagens/gradiente_game_details.svg";
import LoadingDetails from "./LoadingDetails";
import imagem_default from "../assets/imagens/fundo_jogos2.png";
import ComparisonButton from "./ComparisonButton";
import { auth } from "../firebase/Inicializacao";
import AddToPastas from "./AddToPastas";
import BackButton from "./BackButton";
const GameDetails = () => {
  const { appId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const preloaded = location.state || {};

  const [game, setGame] = useState(
    preloaded.name
      ? {
          name: preloaded.name,
          short_description: preloaded.description || "",
          background_raw: preloaded.backgroundUrl || null,
          year: preloaded.year,
          typeGame: preloaded.typeGame,
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
      if (game && reviewSummary) return;

      try {
        const [detailsRes, reviewsRes] = await Promise.all([
          fetch(`${baseUrl}/api/game-details/${appId}`, {
            signal: controller.signal,
          }),
          fetch(`${baseUrl}/api/reviews/${appId}`, {
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
          throw new Error("Game data not available");
        }

        setReviewSummary(reviewsData.review_summary || null);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error on fetch:", err);
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
  console.log("game:", game);
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
            <div className="flex items-center gap-2">
              <BackButton />
              <h1 className="text-6xl font-bold font-sf">{game.name}</h1>
            </div>
            <div className="mt-5">
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
                    <AddToPastas
                      game={{
                        id: appId,
                        name: game.name,
                        background_raw: game.background_raw,
                        year: game.year,
                        typeGame: game.typeGame,
                        reviewSummary: reviewSummary,
                        description: game.short_description,
                      }}
                    />
                    <ComparisonButton
                      appId={appId}
                      user={auth.currentUser}
                      game={game}
                      reviewSummary={reviewSummary}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
      </AppLayout2>
    </div>
  );
};

export default GameDetails;
