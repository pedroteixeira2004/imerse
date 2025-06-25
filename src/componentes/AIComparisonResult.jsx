import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Background from "./background";
import AppLayout2 from "./Layout2";
import BackButton from "./BackButton";

const AIComparisonResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.result) {
    return (
      <div className="text-white text-center p-10">
        No comparison result found.
        <button
          onClick={() => navigate("/compare")}
          className="block mt-4 underline text-blue-400"
        >
          Back to comparison
        </button>
      </div>
    );
  }

  const { result, game1Name, game2Name } = state;

  return (
    <div>
      <Background />
      <AppLayout2>
        <div className="font-sf text-white m-10">
          <div className="flex items-center gap-2 mb-3">
            <BackButton />
            <h1 className="text-5xl font-bold font-sf">AI Comparison</h1>
          </div>
          <div className=" text-4xl font-medium">
            {game1Name} vs {game2Name}
          </div>
          <div
            className="mt-10 grid grid-cols-2 auto-rows-min
            gap-10 w-full"
          >
            <div
              className="col-span-2
              p-6
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            >
              <div className="text-2xl font-semibold mb-4">Summary</div>
              <div className="text-lg">{result.summary}</div>
            </div>

            <div
              className="col-span-1
              p-6
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            >
              <div className="text-2xl font-semibold mb-4">
                {game1Name} - Strengths
              </div>
              <ul className="list-disc list-inside text-lg">
                {result.strengthsGame1?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div
              className="col-span-1
              p-6
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            >
              <div className="text-2xl font-semibold mb-4">
                {game2Name} - Strengths
              </div>
              <ul className="list-disc list-inside text-lg">
                {result.strengthsGame2?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div
              className="col-span-1
              p-6
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            >
              <div className="text-2xl font-semibold mb-4">
                {game1Name} - Weaknesses
              </div>
              <ul className="list-disc list-inside text-lg">
                {result.weaknessesGame1?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div
              className="col-span-1
              p-6
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            >
              <div className="text-2xl font-semibold mb-4">
                {game2Name} - Weaknesses
              </div>
              <ul className="list-disc list-inside text-lg">
                {result.weaknessesGame2?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div
              className="col-span-1
              p-6
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            >
              <div className="text-2xl font-semibold mb-4">Age Rating</div>
              <p className="text-lg">{result.ageRatingAnalysis}</p>
            </div>
            <div
              className="col-span-1
              p-6
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            >
              <div className="text-2xl font-semibold mb-4">
                System Requirements Comparison
              </div>
              <div>
                <div className="mb-2 font-medium text-xl">
                  Minimum Requirements:
                </div>
                <p className="text-lg">
                  {result.systemRequirementsComparison?.minimumRequirements}
                </p>
              </div>
              <div>
                <div className=" mt-2 mb-2 font-medium text-xl">
                  Recommended Requirements:
                </div>
                <p className="text-lg">
                  {result.systemRequirementsComparison?.recommendedRequirements}
                </p>
              </div>
            </div>

            <div
              className="col-span-1
              p-6
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            >
              <div className="text-2xl font-semibold mb-4">Key Differences</div>
              <ul className="list-disc list-inside text-lg">
                {result.keyDifferences?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div
              className="col-span-1
              p-6
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            >
              <div className="text-2xl font-semibold mb-4">Recommendation</div>
              <p className="text-lg">{result.recommendation}</p>
            </div>
          </div>
        </div>
      </AppLayout2>
    </div>
  );
};

export default AIComparisonResult;
