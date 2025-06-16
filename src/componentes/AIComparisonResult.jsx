import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Background from "./background";
import AppLayout2 from "./Layout2";

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
          <h1 className="text-5xl font-bold mb-3 font-sf">AI Comparison</h1>
          <div className=" text-3xl font-medium">
            {game1Name} vs {game2Name}
          </div>

          <div className="space-y-6 text-lg font-sf">
            <div>
              <strong>Summary:</strong> {result.summary}
            </div>

            <div>
              <strong>{game1Name} - Strengths:</strong>
              <ul className="list-disc list-inside">
                {result.strengthsGame1?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>{game1Name} - Weaknesses:</strong>
              <ul className="list-disc list-inside">
                {result.weaknessesGame1?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>{game2Name} - Strengths:</strong>
              <ul className="list-disc list-inside">
                {result.strengthsGame2?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>{game2Name} - Weaknesses:</strong>
              <ul className="list-disc list-inside">
                {result.weaknessesGame2?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Age Rating:</strong>
              <p>{result.ageRatingAnalysis}</p>
            </div>
            <div>
              <strong>System Requirements Comparison:</strong>
              <div>
                <strong>Minimum Requirements:</strong>
                <p>
                  {result.systemRequirementsComparison?.minimumRequirements}
                </p>
              </div>
              <div>
                <strong>Recommended Requirements:</strong>
                <p>
                  {result.systemRequirementsComparison?.recommendedRequirements}
                </p>
              </div>
            </div>

            <div>
              <strong>Key Differences:</strong>
              <ul className="list-disc list-inside">
                {result.keyDifferences?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>Recommendation:</strong>
              <p>{result.recommendation}</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/compare")}
            className="mt-10 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-bold text-white"
          >
            Back to Comparison
          </button>
        </div>
      </AppLayout2>
    </div>
  );
};

export default AIComparisonResult;
