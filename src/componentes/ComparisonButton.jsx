import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/Inicializacao";
import compare from "../assets/icones/compare.png";
import toast from "react-hot-toast";
import GlassToast from "./GlassToast";

const ComparisonButton = ({ appId, user }) => {
  const [comparisonGames, setComparisonGames] = useState([]);

  // Carrega comparação atual do Firestore
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
        const games = [data.game1Id, data.game2Id].filter(Boolean);
        setComparisonGames(games);
      }
    };

    fetchComparison();
  }, [user]);

  const handleToggleComparison = async () => {
    let updatedGames = [...comparisonGames];

    if (updatedGames.includes(appId)) {
      // Remover jogo
      updatedGames = updatedGames.filter((id) => id !== appId);
      toast.custom(
        (t) => (
          <GlassToast
            t={t}
            message="Game removed from comparison"
            type="error"
          />
        ),
        {
          duration: 3000,
          position: "top-center",
        }
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
          {
            duration: 3000,
            position: "top-center",
          }
        );
        return;
      }
      updatedGames.push(appId);
      toast.custom(
        (t) => (
          <GlassToast t={t} message="Game added to comparison" type="success" />
        ),
        {
          duration: 3000,
          position: "top-center",
        }
      );
    }

    setComparisonGames(updatedGames);

    const docRef = doc(
      db,
      "users",
      user.uid,
      "comparisons",
      "currentComparison"
    );
    await setDoc(docRef, {
      game1Id: updatedGames[0] || null,
      game2Id: updatedGames[1] || null,
      updatedAt: new Date(),
    });
  };

  const isInComparison = comparisonGames.includes(appId);

  return (
    <button
      className={`expandable-button rounded-full mx-6 ${
        isInComparison ? "bg-green-600" : ""
      }`}
      onClick={handleToggleComparison}
    >
      <img src={compare} alt="Add to library" />
      <span className="text font-sf font-bold">
        {isInComparison ? "Remove from comparison" : "Add to comparison"}
      </span>
    </button>
  );
};

export default ComparisonButton;
