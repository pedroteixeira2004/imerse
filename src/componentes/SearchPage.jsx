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
              <div
                className="barra_pesquisa pl-6 pr-10 py-3 text-white text-lg rounded-full 
             bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-3xl 
             border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
             outline-none flex gap-2 items-center transition-all duration-500"
              >
                <img
                  src={search}
                  alt="Search Icon"
                  className="mr-2 w-6 h-6 opacity-80"
                />
                <input
                  type="text"
                  placeholder="Search games"
                  value={searchTerm}
                  className="bg-transparent placeholder-white/70 font-sf w-full focus:outline-none"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

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
