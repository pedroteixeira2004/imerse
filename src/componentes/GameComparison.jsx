import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Background from "./background";
import AppLayout2 from "./Layout2";
import CompareInfo from "./CompareInfo";
import LoadingCompareInfo from "./LoadingCompareInfo";
import LoadingAIComparison from "./LoadingAIComparison";
import AICompareButton from "./AICompareButton";
import BackButton from "./BackButton";
const GameComparison = () => {
  const location = useLocation();
  const { game1Id, game2Id } = location.state || {};

  const [game1Details, setGame1Details] = useState(null);
  const [game2Details, setGame2Details] = useState(null);
  const [game1Summary, setGame1Summary] = useState(null);
  const [game2Summary, setGame2Summary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  useEffect(() => {
    const fetchDetailsAndSummary = async () => {
      try {
        const [res1, res2, rev1, rev2] = await Promise.all([
          fetch(`http://localhost:5000/api/game-details/${game1Id}`),
          fetch(`http://localhost:5000/api/game-details/${game2Id}`),
          fetch(`http://localhost:5000/api/reviews/${game1Id}`),
          fetch(`http://localhost:5000/api/reviews/${game2Id}`),
        ]);

        const [data1, data2, summary1, summary2] = await Promise.all([
          res1.json(),
          res2.json(),
          rev1.json(),
          rev2.json(),
        ]);

        setGame1Details(data1[game1Id].data);
        setGame2Details(data2[game2Id].data);

        // Ajuste conforme o formato exato do seu retorno da API
        setGame1Summary(summary1);
        setGame2Summary(summary2);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching game details or reviews:", err);
      }
    };

    if (game1Id && game2Id) {
      fetchDetailsAndSummary();
    }
  }, [game1Id, game2Id]);

  if (!game1Id || !game2Id) {
    return <div className="text-white p-10 text-2xl">No games selected.</div>;
  }
  console.log(game1Summary);
  if (loading) {
    return <LoadingCompareInfo />;
  }
  if (aiLoading) {
    return <LoadingAIComparison />;
  }

  return (
    <div>
      <Background />
      <AppLayout2>
        <div className="m-10 w-full ">
          <div className="flex items-center justify-center gap-4 mb-10">
            <BackButton />
            <h1 className="text-5xl text-white font-bold font-sf">
              Game Comparison
            </h1>
          </div>

          <div className="flex flex-wrap justify-center gap-10 items-stretch">
            <CompareInfo game={game1Details} summary={game1Summary} />
            <CompareInfo game={game2Details} summary={game2Summary} />
          </div>
          <AICompareButton
            game1Id={game1Id}
            game2Id={game2Id}
            setLoading={setAiLoading}
          />
        </div>
      </AppLayout2>
    </div>
  );
};

export default GameComparison;
