import React from "react";
import { useLocation } from "react-router-dom";
import AppLayout from "./Layout";
import ReactMarkdown from "react-markdown";

const InsightPage = () => {
  const location = useLocation();
  const insight = location.state?.insight;

  if (!insight) {
    return (
      <AppLayout>
        <div className="p-6 text-white">
          <h1 className="text-2xl font-bold mb-4">AI Analysis</h1>
          <p>No insight provided.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
      <AppLayout>
        <div className="p-6 text-white">
          <h1 className="text-3xl font-bold mb-4 font-sf">AI Analysis</h1>
          <div className="bg-white bg-opacity-30 p-4 rounded-xl whitespace-pre-line font-sf backdrop-blur-md">
            <ReactMarkdown>{insight}</ReactMarkdown>
          </div>
        </div>
      </AppLayout>
    </div>
  );
};

export default InsightPage;
