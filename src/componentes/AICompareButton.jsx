import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import star from "../assets/icones/star.png";

const AICompareButton = ({ game1Id, game2Id }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchGameData = async (appId) => {
    const [detailsRes, reviewsRes] = await Promise.all([
      fetch(`http://localhost:5000/api/game-details/${appId}`),
      fetch(`http://localhost:5000/api/reviews/${appId}`),
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
        "http://localhost:5000/api/compare-games",
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

  return (
    <button
      onClick={handleAICompare}
      disabled={loading}
      className="text-white px-6 py-3 rounded-full font-sf text-lg transition-all duration-300 button-filters font-bold flex items-center"
    >
      {loading ? "Analyzing..." : "AI Comparison"}
      {!loading && <img src={star} alt="ai button" className="h-6 w-6 ml-3" />}
    </button>
  );
};

export default AICompareButton;
