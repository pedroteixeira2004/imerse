import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import star from "../assets/icones/star.png";

const AICompareButton = ({ game1Id, game2Id, setLoading }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isComparisonPage = location.pathname === "/game-comparison";

  const fetchGameData = async (appId) => {
    const [detailsRes, reviewsRes] = await Promise.all([
      fetch(`http://localhost:3001/api/game-details/${appId}?num_per_page=50`),
      fetch(`http://localhost:3001/api/reviews/${appId}`),
    ]);

    if (!detailsRes.ok || !reviewsRes.ok) {
      throw new Error("Failed to fetch game data.");
    }

    const detailsData = await detailsRes.json();
    const reviewsData = await reviewsRes.json();

    const details = detailsData?.[appId]?.data || {};
    const reviews = reviewsData.reviews?.map((r) => r.review) || [];

    return { details, reviews };
  };

  const handleAICompare = async () => {
    if (!game1Id || !game2Id) return;
    setLoading(true);

    try {
      const [game1, game2] = await Promise.all([
        fetchGameData(game1Id),
        fetchGameData(game2Id),
      ]);

      const compareRes = await fetch(
        "http://localhost:3001/api/compare-games",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comments1: game1.reviews,
            comments2: game2.reviews,
            details1: game1.details,
            details2: game2.details,
            game1Name: game1.details.name,
            game2Name: game2.details.name,
          }),
        }
      );

      if (!compareRes.ok) {
        const errorText = await compareRes.text();
        console.error("CompareGames API error:", errorText);
        throw new Error(`Comparison failed: ${compareRes.status}`);
      }

      const compareData = await compareRes.json();
      const insight = compareData.insight;

      navigate("/ai-comparison-result", {
        state: {
          result: insight,
          game1Name: game1.details.name,
          game2Name: game2.details.name,
        },
      });
    } catch (err) {
      console.error("AI comparison failed:", err);
      alert("Error during AI comparison.");
    } finally {
      setLoading(false);
    }
  };

  if (isComparisonPage) {
    return (
      <button
        onClick={handleAICompare}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-white/15 to-white/5
    backdrop-blur-[15px] border border-white/30 text-white flex items-center 
    overflow-hidden transition-all duration-300 rounded-full px-4 py-3 shadow-lg group
     hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]"
      >
        <img
          src={star}
          alt="ai button"
          className="h-8 w-8 transition-all duration-300"
        />
        <span
          className="ml-0 max-w-0 overflow-hidden opacity-0 
    group-hover:opacity-100 group-hover:ml-3 group-hover:max-w-[150px] 
    transition-all duration-300 whitespace-nowrap font-sf text-lg font-bold"
        >
          AI Comparison
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={handleAICompare}
      className="text-white px-6 py-3 rounded-full font-sf text-lg transition-all duration-300 button-filters font-bold flex items-center"
    >
      <div>AI Comparison</div>
      <img src={star} alt="ai button" className="h-6 w-6 ml-3" />
    </button>
  );
};

export default AICompareButton;
