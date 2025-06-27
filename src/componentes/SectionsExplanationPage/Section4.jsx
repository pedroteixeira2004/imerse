import React, { useState, useEffect } from "react";
import gradiente from "../../assets/imagens/gradiente_game_details.svg";

// Lista de vídeos com títulos
const filters = [
  {
    title: "Number of reviews",
    video: "/videos/number_reviews.mp4",
  },
  {
    title: "Reviews language",
    video: "/videos/language_reviews.mp4",
  },
  {
    title: "Reviews period",
    video: "/videos/time_reviews.mp4",
  },
  {
    title: "Playtime",
    video: "/videos/playtime.mp4",
  },
  {
    title: "Reviews type",
    video: "/videos/type_reviews.mp4",
  },
  {
    title: "Reviews sorting",
    video: "/videos/sorting_reviews.mp4",
  },
];

function Section4() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % filters.length);
    }, 6000); // troca a cada 6 segundos
    return () => clearInterval(interval);
  }, []);

  const current = filters[index];

  return (
    <section className="relative text-white overflow-hidden h-[100vh] bg-[#0D1060]">
      {/* Parte superior com vídeo em background */}
      <div className="h-[60vh] relative z-10 overflow-hidden">
        {filters.map((filter, i) => (
          <video
            key={i}
            src={filter.video}
            autoPlay
            loop
            muted
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === i ? "opacity-100 z-0" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>
      {/* Parte inferior com gradiente e texto estático */}
      <div className="relative flex justify-center items-center h-[40vh] text-white z-20">
        <img
          src={gradiente}
          alt="gradiente"
          className="absolute bottom-0 left-0 w-full z-0 pointer-events-none"
        />
        <div className="relative z-10 text-center max-w-5xl px-6">
          <div className="font-bold text-6xl">3. Select your parameters</div>
          <div className="mt-8 text-2xl">
            Filter your results by language, review type (positive/negative),
            time period and playtime. This helps you target exactly the kind of
            feedback you’re looking for.
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section4;
