import React from "react";

const TimestampConverter = ({ timestamp }) => {
  // Converter timestamp UNIX para data legível
  const formattedDate = new Date(timestamp * 1000).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="text-white">
      <p>Review date: {formattedDate}</p>
    </div>
  );
};

export default TimestampConverter;
