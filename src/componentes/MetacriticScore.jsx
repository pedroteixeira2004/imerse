import React from "react";

const getColor = (score) => {
  if (score >= 75) return "bg-green-600";
  if (score >= 50) return "bg-yellow-500";
  return "bg-red-600";
};

const MetacriticScore = ({ score }) => {
  if (score === null || score === undefined) return null;

  const colorClass = getColor(score);

  return (
    <div
      className={`w-12 h-12 rounded-md flex items-center justify-center text-white font-bold ${colorClass}`}
      title={`Metacritic: ${score}/100`}
    >
      {score}
    </div>
  );
};

export default MetacriticScore;
