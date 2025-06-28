import { useState } from "react";
import { useNavigate } from "react-router-dom";
import gradiente from "../../assets/imagens/gradiente_cards.svg";
import fallbackImage from "../../assets/imagens/fundo_jogos2.png";
import PreviewOverlay from "./OverlayPreview";
import god_of_war from "../../assets/imagens/backgrounds_jogos/god_of_war.jpg";
import last_of_us from "../../assets/imagens/backgrounds_jogos/last_of_us.jpg";
import detroit_become_human from "../../assets/imagens/backgrounds_jogos/detroit_become_human.jpg";
import Background from "../background";

const games = [
  {
    appId: 1593500,
    name: "God of War",
    year: 2022,
    description:
      "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive… and teach his son to do the same.",
    type: "game",
    rating: "Overwhelmingly Positive",
    image: god_of_war,
  },
  {
    appId: 1888930,
    name: "The Last of Us",
    year: 2023,
    description:
      "Discover the award-winning game that inspired the critically acclaimed TV series. Explore post-apocalyptic America with Joel and Ellie, and meet unforgettable allies and enemies in The Last of Us™.",
    type: "game",
    rating: "Very Positive",
    image: last_of_us,
  },
  {
    appId: 1222140,
    name: "Detroit: Become Human",
    year: 2023,
    description:
      "Detroit: Become Human puts the fate of humanity and androids in your hands. All your choices affect the outcome of the game, with one of the most intricately branched narratives ever created.",
    type: "game",
    rating: "Very Positive",
    image: detroit_become_human,
  },
];

const GamePage = () => {
  const navigate = useNavigate();
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  return (
    <div>
      <Background />
      <div className="font-sf text-white p-10">
        <div className="text-4xl font-bold mb-3">Choose a game</div>
        <div className="text-2xl font-medium mb-8">
          Click on the game you want to analyze
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          {games.map((game) => (
            <div
              key={game.appId}
              onClick={() =>
                navigate(`/preview-gamedetails/${game.appId}`, {
                  state: {
                    appId: game.appId,
                    backgroundUrl: game.image || fallbackImage,
                    reviewSummary: game.rating,
                    description: game.description,
                    year: game.year,
                    typeGame: game.type,
                    name: game.name,
                  },
                })
              }
              className="h-80 w-80 rounded-3xl overflow-hidden transform transition duration-300 hover:scale-105 relative border border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:border-white/50 hover:shadow-[0_6px_40px_rgba(255,255,255,0.2)] cursor-pointer"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-500 opacity-100"
                style={{
                  backgroundImage: `url(${game.image || fallbackImage})`,
                }}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center z-10"
                style={{ backgroundImage: `url(${gradiente})` }}
              />

              {/* Text content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-4">
                <h3 className="text-2xl font-semibold text-white">
                  {game.name}
                </h3>
                {game.rating && (
                  <span className="text-xl text-white mt-6">{game.rating}</span>
                )}
              </div>

              {/* Bottom bar with type and year */}
              <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-between items-center m-1 mb-3 px-4">
                <h3 className="text-lg font-regular text-white">{game.type}</h3>
                <h3 className="text-lg font-regular text-white">{game.year}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PreviewOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      />
    </div>
  );
};

export default GamePage;
