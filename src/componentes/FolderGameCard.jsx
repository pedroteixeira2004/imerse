import React from "react";
import { useNavigate } from "react-router-dom";
import gradiente from "../assets/imagens/gradiente_cards.svg";
import fallbackImage from "../assets/imagens/fundo_jogos2.png";

const FolderGameCard = ({ game }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/details/${game.id}`, {
          state: {
            backgroundUrl: game.background,
            reviewSummary: game.reviewScore,
            description: game.description,
            year: game.year,
            typeGame: game.type,
            name: game.name,
          },
        })
      }
      className="h-80 w-80 rounded-3xl overflow-hidden transform transition duration-300 hover:scale-105 relative border border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:border-white/50 
      hover:shadow-[0_6px_40px_rgba(255,255,255,0.2)] cursor-pointer"
    >
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-500"
        style={{
          backgroundImage: `url(${game.background || fallbackImage})`,
        }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center z-10"
        style={{
          backgroundImage: `url(${gradiente})`,
        }}
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-4">
        <h3 className="text-2xl font-semibold text-white">{game.name}</h3>
        {game.reviewScore && (
          <span className="text-xl text-white mt-6">{game.reviewScore}</span>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-between items-center m-1">
        <div className="inset-0 z-20 flex flex-col p-4">
          <h3 className="text-lg font-regular text-white mr-3">{game.type}</h3>
        </div>
        <div className="inset-0 z-20 flex flex-col p-4">
          <h3 className="text-lg font-regular text-white ml-3">{game.year}</h3>
        </div>
      </div>
    </div>
  );
};

export default FolderGameCard;
