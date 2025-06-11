import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gradiente from "../assets/imagens/gradiente_cards.svg";
import fallbackImage from "../assets/imagens/fundo_jogos.png";

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const [backgroundUrl, setBackgroundUrl] = useState(null);
  const [typeGame, setTypeGame] = useState(null);
  const [dateGame, setDateGame] = useState(null);
  const extractYear = (rawDate) => {
    if (!rawDate || typeof rawDate !== "string") return "";

    const normalized = rawDate.toLowerCase().trim();

    if (normalized.includes("coming soon")) return "Em breve";

    // Tenta extrair um ano com 4 dígitos (ex: 2022)
    const match = normalized.match(/\b(19|20)\d{2}\b/);
    return match ? match[0] : "";
  };
  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/game-details/${game.appid}`
        );
        const data = await response.json();
        const details = data[game.appid]?.data;
        if (details?.background_raw) {
          setBackgroundUrl(details.background_raw);
        } else if (details?.background) {
          setBackgroundUrl(details.background);
        }
        if (details?.type) {
          setTypeGame(details.type);
        } else {
          setTypeGame("");
        }
        if (details?.release_date.date) {
          setDateGame(details.release_date.date);
        } else {
          setDateGame("");
        }
      } catch (error) {
        console.error("Erro ao buscar background do jogo:", error);
      }
    };

    fetchBackground();
    const getYearFromSteamDate = (rawDate) => {
      if (!rawDate) return "Data desconhecida";
      const parts = rawDate.split("/");
      return parts.length === 3 ? parts[2] : "Data desconhecida";
    };
  }, [game.appid]);

  return (
    <div
      onClick={() => navigate(`/details/${game.appid}`)}
      className="h-80 w-80 rounded-3xl overflow-hidden transform transition duration-300 hover:scale-105 relative border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:border-white/50 
    hover:shadow-[0_6px_40px_rgba(255,255,255,0.2)] "
    >
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${backgroundUrl || fallbackImage})`,
        }}
      />

      <div
        className="absolute inset-0 bg-cover bg-center z-10"
        style={{
          backgroundImage: `url(${gradiente})`,
        }}
      />
      <div>
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-4">
          <h3 className="text-2xl font-semibold text-white">{game.name}</h3>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-between items-center ">
          <div className=" inset-0 z-20 flex flex-col p-4">
            <h3 className="text-lg font-regular text-white ml-3">
              {extractYear(dateGame)}
            </h3>
          </div>
          <div className="inset-0 z-20 flex flex-col p-4">
            <h3 className="text-lg font-regular text-white mr-3">{typeGame}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
