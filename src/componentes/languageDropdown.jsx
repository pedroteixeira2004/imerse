import React, { useState } from "react";
import supportedLocales from "./SteamLocales";

const LanguageDropdown = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left w-30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 py-2 bg-white bg-opacity-30 backdrop-blur-lg rounded-full text-white text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 font-sf"
      >
        {supportedLocales[language].englishName}
        <span className="ml-2 text-blue-500">▾</span>
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white border border-blue-500 rounded-lg shadow-lg max-h-48 overflow-auto z-10 text-sm font-sf">
          {Object.keys(supportedLocales).map((key) => (
            <button
              key={key}
              onClick={() => {
                setLanguage(key);
                setIsOpen(false);
              }}
              className={`block px-4 py-2 w-full text-left text-black hover:bg-blue-100 ${
                language === key ? "bg-blue-200 font-bold" : ""
              }`}
            >
              {supportedLocales[key].englishName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
