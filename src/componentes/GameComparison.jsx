import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Background from "./background";
import AppLayout2 from "./Layout2";
import CompareInfo from "./CompareInfo";
import LoadingCompareInfo from "./LoadingCompareInfo";

const GameComparison = () => {
  const location = useLocation();
  const { game1Id, game2Id } = location.state || {};

  const [game1Details, setGame1Details] = useState(null);
  const [game2Details, setGame2Details] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch(`http://localhost:5000/api/game-details/${game1Id}`),
          fetch(`http://localhost:5000/api/game-details/${game2Id}`),
        ]);
        const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

        setGame1Details(data1[game1Id].data);
        setGame2Details(data2[game2Id].data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching game details:", err);
      }
    };

    if (game1Id && game2Id) {
      fetchDetails();
    }
  }, [game1Id, game2Id]);

  if (!game1Id || !game2Id) {
    return <div className="text-white p-10 text-2xl">No games selected.</div>;
  }

  if (loading) {
    return <LoadingCompareInfo />;
  }

  return (
    <div>
      <Background />
      <AppLayout2>
        <div className="m-10 w-full">
          <h1 className="text-5xl text-white font-bold font-sf text-center mb-10">
            Game Comparison
          </h1>
          <div className="flex flex-wrap justify-center items-start gap-10">
            <CompareInfo game={game1Details} />
            <CompareInfo game={game2Details} />
          </div>
        </div>
      </AppLayout2>
    </div>
  );
};

export default GameComparison;
