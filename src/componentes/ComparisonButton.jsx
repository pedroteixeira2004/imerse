import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/Inicializacao";
import compare from "../assets/icones/compare.png";
import toast from "react-hot-toast";
import GlassToast from "./GlassToast";

const ComparisonButton = ({ appId, user, game, reviewSummary }) => {
  const [comparisonGames, setComparisonGames] = useState([]);

  useEffect(() => {
    const fetchComparison = async () => {
      if (!user) return;

      const docRef = doc(
        db,
        "users",
        user.uid,
        "comparisons",
        "currentComparison"
      );
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        const games = [data.game1?.appId, data.game2?.appId].filter(Boolean);
        setComparisonGames(games);
      }
    };

    fetchComparison();
  }, [user]);

  const handleToggleComparison = async () => {
    let updatedGames = [...comparisonGames];
    let newData = { game1: null, game2: null };

    const docRef = doc(
      db,
      "users",
      user.uid,
      "comparisons",
      "currentComparison"
    );

    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const existingData = snapshot.data();
      newData = {
        game1: existingData.game1 || null,
        game2: existingData.game2 || null,
      };
    }

    if (updatedGames.includes(appId)) {
      // Remove game
      updatedGames = updatedGames.filter((id) => id !== appId);

      if (newData.game1?.appId === appId) newData.game1 = null;
      if (newData.game2?.appId === appId) newData.game2 = null;

      toast.custom(
        (t) => (
          <GlassToast t={t} message="Game removed from compare" type="error" />
        ),
        { duration: 3000, position: "top-center" }
      );
    } else {
      if (updatedGames.length >= 2) {
        toast.custom(
          (t) => (
            <GlassToast
              t={t}
              message="You can only compare two games at a time. Please remove one to add another."
              type="warning"
            />
          ),
          { duration: 3000, position: "top-center" }
        );
        return;
      }

      const gameData = {
        appId,
        name: game.name,
        description: game.short_description,
        background: game.background_raw,
        year: game.year,
        type: game.typeGame,
        reviewSummary: reviewSummary?.review_score_desc || null,
      };

      if (!newData.game1) {
        newData.game1 = gameData;
      } else {
        newData.game2 = gameData;
      }

      updatedGames.push(appId);

      toast.custom(
        (t) => (
          <GlassToast t={t} message="Game added to compare" type="success" />
        ),
        { duration: 3000, position: "top-center" }
      );
    }

    setComparisonGames(updatedGames);

    await setDoc(docRef, {
      ...newData,
      updatedAt: new Date(),
    });
  };

  const isInComparison = comparisonGames.includes(appId);

  return (
    <button
      className={`expandable-button rounded-full mx-6 flex items-center`}
      onClick={handleToggleComparison}
    >
      <img src={compare} alt="Compare icon" />
      <span className="text font-sf font-bold">
        {isInComparison ? "Remove from compare" : "Add to compare"}
      </span>
    </button>
  );
};

export default ComparisonButton;
