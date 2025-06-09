import React from "react";
import { useLocation } from "react-router-dom";
import AppLayout from "./Layout";
import Background from "./background";

const InsightPage = () => {
  const location = useLocation();
  const insight = location.state?.insight;

  const capitalizeFirstLetter = (string) => {
    if (typeof string !== "string") return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const safeString = (value) => {
    if (typeof value === "string") return value;
    if (typeof value === "number") return value.toString();
    if (typeof value === "object" && value !== null)
      return JSON.stringify(value);
    return "";
  };

  const renderStringList = (title, items) => (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <ul className="list-disc list-inside space-y-1">
        {items.map((item, index) => (
          <li key={index}>{capitalizeFirstLetter(safeString(item))}</li>
        ))}
      </ul>
    </div>
  );

  const renderKeywordsList = (keywords) => (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Keywords</h2>
      <ul className="list-disc list-inside space-y-1">
        {keywords.map((item, index) => (
          <li key={index}>
            {safeString(item.term)} (frequency:{" "}
            {capitalizeFirstLetter(safeString(item.frequency))})
          </li>
        ))}
      </ul>
    </div>
  );

  if (!insight) {
    return (
      <div>
        <Background />
        <AppLayout>
          <div className="p-6 text-white">
            <h1 className="text-2xl font-bold mb-4">AI Analysis</h1>
            <p>No insight provided.</p>
          </div>
        </AppLayout>
      </div>
    );
  }

  return (
    <div>
      <Background />
      <AppLayout>
        <div className="p-6 text-white m-10">
          <h1 className="text-3xl font-bold mb-4 font-sf">AI Analysis</h1>
          <div className="mb-4 p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 w-50 w-full">
            <div className="m-5 space-y-4 w-full">
              {insight.summary && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Summary</h2>
                  <p>{safeString(insight.summary)}</p>
                </div>
              )}

              {insight.overallTone && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Overall Tone</h2>
                  <p className="capitalize">
                    {capitalizeFirstLetter(safeString(insight.overallTone))}
                  </p>
                </div>
              )}

              {/* Emotional Expressions */}
              {(insight.emotionalExpressions || insight.emotionExpressions) &&
                renderStringList(
                  "Emotional Expressions",
                  insight.emotionalExpressions || insight.emotionExpressions
                )}

              {/* Positive Aspects */}
              {insight.positiveAspects &&
                renderStringList("Positive Aspects", insight.positiveAspects)}

              {/* Negative Aspects */}
              {insight.negativeAspects &&
                renderStringList("Negative Aspects", insight.negativeAspects)}

              {/* Recurring Trends */}
              {insight.recurringTrends &&
                renderStringList("Recurring Trends", insight.recurringTrends)}

              {/* Themes */}
              {insight.themes && renderStringList("Themes", insight.themes)}

              {/* Suggestions */}
              {insight.suggestions &&
                renderStringList("Suggestions", insight.suggestions)}

              {/* Keywords */}
              {insight.keywords && renderKeywordsList(insight.keywords)}
            </div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
};

export default InsightPage;
