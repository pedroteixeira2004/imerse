import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/Inicializacao";
import ComparisonCard from "./ComparisonCard";
import Background from "./background";
import AppLayout2 from "./Layout2";
import SearchBar from "./SearchBar";
import LoadingCompare from "./LoadingCompare";
import LoadingAIComparison from "./LoadingAIComparison";
import { useNavigate } from "react-router-dom";
import AICompareButton from "./AICompareButton";

const Compare = () => {
  const [games, setGames] = useState({ game1: null, game2: null });
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleCompare = () => {
    if (games.game1 && games.game2) {
      navigate("/game-comparison", {
        state: {
          game1Id: games.game1.appId,
          game2Id: games.game2.appId,
        },
      });
    }
  };

  if (loading) return <LoadingCompare />;

  if (aiLoading) return <LoadingAIComparison />;

  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <AppLayout2>
        <div className="m-10 w-full flex flex-col flex-grow">
          <div className="text-5xl text-white flex justify-center font-bold font-sf">
            Compare games
          </div>

          <div className="text-2xl text-white font-sf flex justify-center mt-2 mb-4">
            {bothEmpty || onlyOne
              ? "Search for two games to compare."
              : "Everything is ready. Choose the way you want to compare."}
          </div>

          {(bothEmpty || onlyOne) && (
            <div className="flex justify-center items-center mt-6 mb-10">
              <SearchBar />
            </div>
          )}

          <div className="flex-grow flex justify-center items-center">
            {bothEmpty ? (
              <p className="text-3xl text-white font-sf font-medium text-center">
                No games added to compare. Please search for a game.
              </p>
            ) : (
              <>
                {games.game1 && games.game2 && (
                  <div className="flex flex-col items-center justify-center gap-10">
                    <div className="flex items-center justify-center gap-6 flex-wrap">
                      <ComparisonCard
                        game={games.game1}
                        user={user}
                        onRemove={handleRemove}
                      />

                      <div className="text-white font-sf font-bold text-4xl mx-4 drop-shadow-lg">
                        VS
                      </div>

                      <ComparisonCard
                        game={games.game2}
                        user={user}
                        onRemove={handleRemove}
                      />
                    </div>

                    <div className="flex gap-6 flex-col sm:flex-row justify-center">
                      <button
                        onClick={handleCompare}
                        className="text-white px-8 py-2 rounded-full font-sf text-lg button2 font-bold"
                      >
                        Compare games
                      </button>

                      <AICompareButton
                        game1Id={games.game1.appId}
                        game2Id={games.game2.appId}
                        setLoading={setAiLoading}
                      />
                    </div>
                  </div>
                )}

                {onlyOne && (
                  <div className="flex items-center justify-center gap-6 flex-wrap">
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

                    <div className="flex items-center justify-center text-white font-sf text-2xl font-medium h-80 w-80 text-center border border-dashed border-white/30 rounded-3xl p-6">
                      Add another game to compare
                    </div>
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
