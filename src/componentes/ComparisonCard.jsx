import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/Inicializacao";
import { FaTrash } from "react-icons/fa";
import { getDoc } from "firebase/firestore";
import gradiente from "../assets/imagens/gradiente_cards.svg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import GlassToast from "./GlassToast";

const ComparisonCard = ({ game, user, onRemove }) => {
  const navigate = useNavigate();
  if (!game) return null;

  const handleRemove = async () => {
    if (!user) return;

    const docRef = doc(
      db,
      "users",
      user.uid,
      "comparisons",
      "currentComparison"
    );

    try {
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();

        if (data.game1?.appId === game.appId) {
          await updateDoc(docRef, { game1: null });
        } else if (data.game2?.appId === game.appId) {
          await updateDoc(docRef, { game2: null });
        }

        toast.custom(
          (t) => (
            <GlassToast
              t={t}
              message="Game removed from compare"
              type="error"
            />
          ),
          { duration: 3000, position: "top-center" }
        );

        console.log("Removed from Firebase:", game.name);
        onRemove(game.appId);
      }
    } catch (error) {
      console.error("Erro ao remover jogo:", error);
      toast.error("Erro ao remover o jogo.");
    }
  };

  return (
    <div className="relative w-80 group">
      {/* Card com fundo */}
      <div
        onClick={() =>
          navigate(`/details/${game.appId}`, {
            state: {
              backgroundUrl: game.background,
              reviewSummary: game.reviewSummary,
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
        {/* Backgrounds */}
        <div
          className={`absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-500 ${
            game.background ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${game.background})`,
          }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center z-10"
          style={{
            backgroundImage: `url(${gradiente})`,
          }}
        />

        {/* Conteúdo */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-4 font-sf">
          <h3 className="text-2xl font-semibold text-white">{game.name}</h3>
          <span className="text-xl text-white mt-6">{game.reviewSummary}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-between items-center m-1 font-sf">
          <div className="inset-0 z-20 flex flex-col p-4">
            <h3 className="text-lg font-regular text-white mr-3">
              {game.type}
            </h3>
          </div>
          <div className="inset-0 z-20 flex flex-col p-4 font-sf">
            <h3 className="text-lg font-regular text-white ml-3">
              {game.year}
            </h3>
          </div>
        </div>
      </div>

      {/* Botão Remover - só visível no hover */}
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 button2 text-white p-2 rounded-full z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        title="Remove from compare"
      >
        <FaTrash size={20} />
      </button>
    </div>
  );
};

export default ComparisonCard;
