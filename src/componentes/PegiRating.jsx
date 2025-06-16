import React from "react";
import pegi3 from "../assets/pegi/pegi3.png";
import pegi7 from "../assets/pegi/pegi7.png";
import pegi12 from "../assets/pegi/pegi12.png";
import pegi16 from "../assets/pegi/pegi16.png";
import pegi18 from "../assets/pegi/pegi18.png";

const PEGI_IMAGES = {
  3: pegi3,
  7: pegi7,
  12: pegi12,
  16: pegi16,
  18: pegi18,
};

const PegiRating = ({ rating }) => {
  const imageSrc = PEGI_IMAGES[rating];

  if (!imageSrc) return null;

  return (
    <div className="w-14 h-14">
      <img
        src={imageSrc}
        alt={`PEGI ${rating}`}
        className="w-full h-full object-contain"
        title={`PEGI ${rating}`}
      />
    </div>
  );
};

export default PegiRating;
