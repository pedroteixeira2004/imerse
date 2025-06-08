import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "./background";
import AppLayout from "./Layout";
import search from "../assets/icones/search.png";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchTerm) {
      setError("Insert a game title!");
      return;
    }
    setError(null);
    navigate(`/games?search=${searchTerm}`);
  };

  return (
    <div>
      <Background />
      <AppLayout>
        <div className="text-center">
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="font-sf font-regular text-white font-bold text-5xl">
              <p className="mb-4">Decode the feedback. </p>
              <p>Dominate the game. </p>
            </h2>
            <div className="mt-8">
              <input
                type="text"
                placeholder="Search games"
                value={searchTerm}
                className=" barra_pesquisa px-10 py-3 text-white text-lg rounded-full bg-white/10 backdrop-blur-lg border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)] outline-none placeholder-white/70 font-sf"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="mt-10">
                <button
                  onClick={handleSearch}
                  className="px-10 py-2 text-white font-bold rounded-full 
        button2 text-xl font-sf"
                >
                  Discover
                </button>
              </div>
              {error && <p className="text-white font-sf">{error}</p>}
            </div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
};

export default SearchPage;
