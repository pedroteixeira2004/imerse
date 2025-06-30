import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/Inicializacao";
import add_compare from "../assets/icones/add_compare.png";
import toast from "react-hot-toast";
import GlassToast from "./GlassToast";

const ComparisonButton = ({ appId, user, game, reviewSummary }) => {
  const [comparisonGames, setComparisonGames] = useState([]);

  useEffect(() => {
    if (!user) return;

    const docRef = doc(
      db,
      "users",
      user.uid,
      "comparisons",
      "currentComparison"
    );

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const games = [data.game1?.appId, data.game2?.appId].filter(Boolean);
        setComparisonGames(games);
      } else {
        setComparisonGames([]);
      }
    });

    return () => unsubscribe();
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

    await setDoc(
      docRef,
      {
        game1: newData.game1 || null,
        game2: newData.game2 || null,
        updatedAt: new Date(),
      },
      { merge: false }
    );
  };

  const isInComparison = comparisonGames.includes(appId);

  return (
    <button
      onClick={handleToggleComparison}
      className={`
    flex items-center rounded-full px-8 py-2 shadow-lg group overflow-hidden transition-all duration-300 
    backdrop-blur-[15px] border text-white
    ${
      isInComparison
        ? `
         button2
        `
        : "bg-gradient-to-br from-white/15 to-white/5 border-white/30 hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]"
    }
  `}
    >
      <img
        src={add_compare}
        alt="compare icon"
        className="h-8 w-8 flex-shrink-0 transition-all duration-300"
      />
      <span
        className="ml-0 max-w-0 overflow-hidden opacity-0 
      group-hover:opacity-100 group-hover:ml-3 group-hover:max-w-[200px] 
      transition-all duration-300 whitespace-nowrap font-sf text-lg font-bold"
      >
        {isInComparison ? "Remove from compare" : "Add to compare"}
      </span>
    </button>
  );
};

export default ComparisonButton;
