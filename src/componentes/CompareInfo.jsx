import React from "react";

const CompareInfo = ({ game }) => {
  if (!game) return null;

  return (
    <div className="bg-white/10 text-white p-6 rounded-xl shadow-md w-[40rem]">
      <img
        src={game.header_image}
        alt={game.name}
        className="rounded-lg mb-4 w-full object-cover h-44"
      />
      <h2 className="text-2xl font-bold mb-2">{game.name}</h2>
      <p className="text-sm text-white/80 line-clamp-4">
        {game.short_description || "Sem descrição disponível."}
      </p>
      {/* Adicione mais informações se quiser */}
    </div>
  );
};

export default CompareInfo;
