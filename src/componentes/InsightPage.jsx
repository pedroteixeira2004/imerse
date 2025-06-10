import React from "react";
import { useLocation } from "react-router-dom";
import AppLayout from "./Layout";
import Background from "./background";

const InsightPage = () => {
  const location = useLocation();
  const insight = location.state?.insight;

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
          <li key={index}>{safeString(item)}</li>
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
            {safeString(item.term)} (frequency: {safeString(item.frequency)})
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
          <div
            className="
    mb-4 p-6
    bg-gradient-to-br from-white/15 to-white/5
    backdrop-blur-[15px]
    rounded-2xl
    border border-white/30
    shadow-[0_4px_30px_rgba(0,0,0,0.1)]
    w-full
    transition-all duration-300
    hover:shadow-[0_6px_40px_rgba(255,255,255,0.2)]
  "
          >
            <div className="m-5">
              {insight.summary && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Summary</h2>
                  <p>{insight.summary}</p>
                </div>
              )}

              {insight.overallTone && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Overall Tone</h2>
                  <p className="capitalize">
                    {safeString(insight.overallTone)}
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
