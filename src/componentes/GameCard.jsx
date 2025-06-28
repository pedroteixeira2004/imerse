import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gradiente from "../assets/imagens/gradiente_cards.svg";
import fallbackImage from "../assets/imagens/fundo_jogos2.png";

const GameCard = ({ game, onLoad }) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [backgroundUrl, setBackgroundUrl] = useState(null);
  const [typeGame, setTypeGame] = useState("");
  const [dateGame, setDateGame] = useState("");
  const [reviewSummary, setReviewSummary] = useState("");
  const [description, setDescription] = useState("");

  const extractYear = (rawDate) => {
    if (!rawDate || typeof rawDate !== "string") return "";
    const normalized = rawDate.toLowerCase().trim();
    if (normalized.includes("coming soon")) return "Coming Soon";
    const match = normalized.match(/\b(19|20)\d{2}\b/);
    return match ? match[0] : "";
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [detailsRes, reviewsRes] = await Promise.all([
          fetch(`${baseUrl}/api/game-details/${game.appid}`),
          fetch(`${baseUrl}/api/reviews/${game.appid}`),
        ]);

        const detailsData = await detailsRes.json();
        const reviewsData = await reviewsRes.json();
        const details = detailsData[game.appid]?.data;

        if (details?.background_raw) {
          setBackgroundUrl(details.background_raw);
        } else if (details?.background) {
          setBackgroundUrl(details.background);
        }
        setTypeGame(details?.type || "");
        setDateGame(details?.release_date?.date || "");
        setDescription(details?.short_description || "");

        if (reviewsData.review_summary?.review_score_desc) {
          setReviewSummary(reviewsData.review_summary.review_score_desc);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        if (typeof onLoad === "function") {
          onLoad();
        }
      }
    };

    fetchAll();
  }, [game.appid]);
  const year = extractYear(dateGame);
  return (
    <div
      onClick={() =>
        navigate(`/details/${game.appid}`, {
          state: {
            backgroundUrl,
            reviewSummary,
            description,
            year,
            typeGame,
            name: game.name,
          },
        })
      }
      className="h-80 w-80 rounded-3xl overflow-hidden transform transition duration-300 hover:scale-105 relative border border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:border-white/50 
      hover:shadow-[0_6px_40px_rgba(255,255,255,0.2)] cursor-pointer"
    >
      <div
        className={`absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-500 ${
          backgroundUrl ? "opacity-100" : "opacity-0"
        }`}
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
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-4">
        <h3 className="text-2xl font-semibold text-white">{game.name}</h3>
        {reviewSummary && (
          <span className="text-xl text-white mt-6">{reviewSummary}</span>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-between items-center m-1">
        <div className="inset-0 z-20 flex flex-col p-4">
          <h3 className="text-lg font-regular text-white mr-3">{typeGame}</h3>
        </div>
        <div className=" inset-0 z-20 flex flex-col p-4">
          <h3 className="text-lg font-regular text-white ml-3">{year}</h3>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
