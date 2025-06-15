import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/Inicializacao";
import ComparisonCard from "./ComparisonCard";
import Background from "./background";
import AppLayout2 from "./Layout2";
import SearchBar from "./SearchBar";
import LoadingCompare from "./LoadingCompare";
const Compare = () => {
  const [games, setGames] = useState({ game1: null, game2: null });
  const [loading, setLoading] = useState(true);

  const fetchComparison = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(
      db,
      "users",
      user.uid,
      "comparisons",
      "currentComparison"
    );
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      setGames({ game1: data.game1 || null, game2: data.game2 || null });
    } else {
      setGames({ game1: null, game2: null });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComparison();
  }, []);

  const handleRemove = (appIdToRemove) => {
    const updatedGames = {
      game1: games.game1?.appId === appIdToRemove ? null : games.game1,
      game2: games.game2?.appId === appIdToRemove ? null : games.game2,
    };
    setGames(updatedGames);
  };

  const user = auth.currentUser;
  const bothEmpty = !games.game1 && !games.game2;
  const onlyOne =
    (!!games.game1 && !games.game2) || (!games.game1 && !!games.game2);

  return loading ? (
    <div>
      <LoadingCompare />
    </div>
  ) : (
    <div>
      <Background />
      <AppLayout2>
        <div className="m-10 w-full">
          {/* Título */}
          <div className="text-5xl text-white flex justify-center font-bold font-sf">
            Compare games
          </div>
          <div className="text-2xl text-white font-sf flex justify-center mt-2">
            Select two titles to compare their statistics
          </div>

          {/* Barra de pesquisa */}
          {(bothEmpty || onlyOne) && (
            <div className="flex justify-center items-center mt-6 mb-10">
              <SearchBar />
            </div>
          )}

          {/* Área de comparação */}
          <div className="flex justify-center items-start gap-10 flex-wrap min-h-[300px]">
            {bothEmpty ? (
              <p className="text-2xl text-white font-sf font-medium flex items-center justify-center mt-28">
                No games added to compare. Please search for a game.
              </p>
            ) : (
              <>
                {games.game1 && (
                  <ComparisonCard
                    game={games.game1}
                    user={user}
                    onRemove={handleRemove}
                  />
                )}

                {games.game2 && (
                  <ComparisonCard
                    game={games.game2}
                    user={user}
                    onRemove={handleRemove}
                  />
                )}

                {onlyOne && (
                  <div className="flex items-center justify-center text-white font-sf text-2xl font-medium h-80 w-80 text-center border border-dashed border-white/30 rounded-3xl p-6">
                    Add another game to compare
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </AppLayout2>
    </div>
  );
};
export default Compare;
