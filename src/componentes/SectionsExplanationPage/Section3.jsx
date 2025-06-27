import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import god_of_war_bg from "../../assets/imagens/backgrounds_jogos/god_of_war.jpg";
import last_of_us_bg from "../../assets/imagens/backgrounds_jogos/last_of_us.jpg";
import detroit_bg from "../../assets/imagens/backgrounds_jogos/detroit_become_human.jpg";
import gradiente from "../../assets/imagens/gradiente_game_details.svg";

const games = [
  {
    title: "God of War",
    rating: "Overwhelmingly Positive",
    description:
      "After leaving his past behind, Kratos now lives among Norse gods and monsters, fighting to survive and teaching his son to do the same.",
    background: god_of_war_bg,
  },
  {
    title: "The Last of Us",
    rating: "Very Positive",
    description:
      "A post-apocalyptic journey of survival and emotional storytelling.",
    background: last_of_us_bg,
  },
  {
    title: "Detroit: Become Human",
    rating: "Mostly Positive",
    description:
      "A narrative-driven game where androids struggle for freedom and identity.",
    background: detroit_bg,
  },
];

function Section3() {
  const [index, setIndex] = useState(0);
  const [showRating, setShowRating] = useState(true);

  useEffect(() => {
    const toggle = setTimeout(() => {
      setShowRating((prev) => !prev);
    }, 2500);

    if (!showRating) {
      const nextGame = setTimeout(() => {
        setIndex((prev) => (prev + 1) % games.length);
        setShowRating(true);
      }, 2500);
      return () => clearTimeout(nextGame);
    }

    return () => clearTimeout(toggle);
  }, [showRating]);
  useEffect(() => {
    games.forEach((game) => {
      const img = new Image();
      img.src = game.background;
    });
  }, []);

  const currentGame = games[index];

  return (
    <section
      style={{
        backgroundImage: `url(${currentGame.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
        height: "100vh",
      }}
      className="relative text-white overflow-hidden"
    >
      {/* Parte superior com 40vh */}
      <div className="h-[40vh] flex items-center justify-center relative z-10">
        <div className="text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            key={currentGame.title + showRating}
          >
            <div className="text-5xl font-bold">{currentGame.title}</div>

            <AnimatePresence mode="wait">
              {showRating ? (
                <motion.div
                  key="rating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl mt-4"
                >
                  {currentGame.rating}
                </motion.div>
              ) : (
                <motion.div
                  key="description"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  className="text-xl mt-4 opacity-90"
                >
                  {currentGame.description}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Parte inferior com gradiente e texto estático */}
      <div className="relative flex justify-center items-center h-[60vh] text-white">
        <img
          src={gradiente}
          alt="gradiente"
          className="absolute bottom-0 left-0 w-full z-0 pointer-events-none"
        />
        <div className="relative z-10 text-center max-w-5xl px-6">
          <div className="font-bold text-6xl">2. Select your game</div>
          <div className="mt-8 text-2xl">
            Select the game you want to analyze. Each title has a dedicated page
            displaying its overall review rating, official description, a launch
            button for starting the analysis, and other key features. From
            there, you can dive deep into player feedback and performance
            insights.
          </div>
        </div>
      </div>
    </section>
  );
}
export default Section3;
