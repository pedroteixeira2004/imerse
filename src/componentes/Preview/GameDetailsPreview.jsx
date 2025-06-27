import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Gradiente from "../../assets/imagens/gradiente_game_details.svg";
import imagem_default from "../../assets/imagens/fundo_jogos2.png";
import BackButton from "../BackButton";

const GameDetailsPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Pega os dados enviados via navigate state
  const {
    appId,
    backgroundUrl,
    reviewSummary,
    description,
    year,
    typeGame,
    name,
  } = location.state || {};

  // Se não tiver dados, pode redirecionar pra lista ou mostrar mensagem
  if (!name) {
    return (
      <div className="text-center p-10 text-white">
        <h2>Game data not found.</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-5 px-5 py-2 bg-blue-600 rounded"
        >
          Go back to games list
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${backgroundUrl || imagem_default})`,
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

      <div className="relative z-10 flex justify-start items-center min-h-screen ml-4">
        <div className="p-6 text-white">
          <div className="flex items-center gap-2">
            <BackButton />
            <h1 className="text-6xl font-bold font-sf">{name}</h1>
          </div>
          <div className="mt-5">
            {reviewSummary ? (
              <div className="mb-7 font-sf text-2xl font-medium">
                {reviewSummary}
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
              {description || "No description available."}
            </div>

            <div className="mt-10">
              <button
                onClick={() => navigate(`/preview-filters/${appId}`)}
                className="px-5 py-2 text-white text-lg font-bold rounded-full button2 font-sf"
              >
                Analyse game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsPreview;
