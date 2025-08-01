import React from "react";

const TimestampConverter = ({ timestamp }) => {
  const formattedDate = new Date(timestamp * 1000).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="text-white">
      <p>{formattedDate}</p>
    </div>
  );
};

export default TimestampConverter;
