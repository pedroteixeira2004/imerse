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
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <ul className="list-disc list-inside space-y-1 text-lg">
        {items.map((item, index) => (
          <li key={index}>{safeString(item)}</li>
        ))}
      </ul>
    </div>
  );

  const renderKeywordsList = (keywords) => (
    <div className="mb-4">
      <h2 className="text-2xl font-semibold mb-4">Keywords</h2>
      <ul className="list-disc list-inside space-y-1 text-lg">
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
            <h1 className="text-5xl font-bold mb-4">AI Analysis</h1>
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
          <h1 className="text-5xl font-bold mb-10 font-sf">AI Analysis</h1>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 auto-rows-min
            gap-10 font-sf"
          >
            {insight.summary && (
              <div
                className="
                col-span-full
              p-6
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)]
            "
              >
                <h2 className="text-2xl font-semibold mb-4">Summary</h2>
                <p className="text-lg">{insight.summary}</p>
              </div>
            )}

            {insight.overallTone && (
              <div
                className="
                col-span-2
                row-span-1
              p-6
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)]
            "
              >
                <h2 className="text-2xl font-semibold mb-4">Overall Tone</h2>
                <p className="text-lg">{safeString(insight.overallTone)}</p>
              </div>
            )}

            {insight.emotionalExpressions && (
              <div
                className="
                col-span-2
              p-6
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)]
              font-sf
            "
              >
                {renderStringList(
                  "Emotional Expressions",
                  insight.emotionalExpressions
                )}
              </div>
            )}

            {insight.positiveAspects && (
              <div
                className="
                col-span-2
              p-6
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)]
            "
              >
                {renderStringList("Positive Aspects", insight.positiveAspects)}
              </div>
            )}

            {insight.negativeAspects && (
              <div
                className="
              col-span-2
              p-6
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)]
            "
              >
                {renderStringList("Negative Aspects", insight.negativeAspects)}
              </div>
            )}

            {insight.recurringTrends && (
              <div
                className="
              col-span-2
              p-6
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)]
            "
              >
                {renderStringList("Recurring Trends", insight.recurringTrends)}
              </div>
            )}

            {insight.themes && (
              <div
                className="
              col-span-2
              p-6
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)]
            "
              >
                {renderStringList("Themes", insight.themes)}
              </div>
            )}

            {insight.suggestions && (
              <div
                className="
              col-span-2
              p-6
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)]
            "
              >
                {renderStringList("Suggestions", insight.suggestions)}
              </div>
            )}

            {insight.keywords && (
              <div
                className="
              col-span-2
              p-6
              bg-gradient-to-br from-white/15 to-white/5
              backdrop-blur-[15px]
              rounded-2xl
              border border-white/30
              shadow-[0_4px_30px_rgba(0,0,0,0.1)]
            "
              >
                {renderKeywordsList(insight.keywords)}
              </div>
            )}
          </div>
        </div>
      </AppLayout>
    </div>
  );
};

export default InsightPage;
