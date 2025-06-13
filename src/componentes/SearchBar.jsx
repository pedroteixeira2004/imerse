import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import search from "../assets/icones/search.png";

const SearchBar = ({ initialSearch = "", onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setError(
        <div className="font-sf text-white text-lg mt-6">
          Insert a game title!
        </div>
      );
      return;
    }
    setError(null);

    if (onSearch) {
      onSearch(searchTerm);
    } else {
      navigate(`/games?search=${searchTerm}`);
    }
  };

  return (
    <div className="text-center">
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
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
        </div>

        <div className="mt-7">
          <button
            onClick={handleSearch}
            className="px-10 py-2 text-white font-bold rounded-full 
            button2 text-xl font-sf"
          >
            Discover
          </button>
        </div>

        {error && <p className="text-white font-sf mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default SearchBar;
