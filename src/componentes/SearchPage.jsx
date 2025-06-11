import React from "react";
import Background from "./background";
import AppLayout from "./Layout";
import SearchBar from "./SearchBar";

const SearchPage = () => {
  return (
    <div>
      <Background />
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h2 className="font-sf font-regular text-white font-bold text-5xl">
            <p className="mb-4">Decode the feedback.</p>
            <p>Dominate the game.</p>
          </h2>
          <SearchBar />
        </div>
      </AppLayout>
    </div>
  );
};

export default SearchPage;
