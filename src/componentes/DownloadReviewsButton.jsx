import React from "react";
import * as XLSX from "xlsx";
import { FaDownload } from "react-icons/fa";

const DownloadReviewsButton = ({ reviews, gameName = "game" }) => {
  const exportToExcel = () => {
    const dataToExport = reviews.map((review) => ({
      Author: review.author?.steamid || "N/A",
      PlaytimeAtReview:
        (review.author?.playtime_at_review / 60).toFixed(1) + " hrs",
      PostedDate: review.timestamp_created
        ? new Date(review.timestamp_created * 1000).toLocaleDateString()
        : "N/A",
      ReviewText: review.review,
      Recommended: review.voted_up ? "Yes" : "No",
      FunnyVotes: review.votes_funny || 0,
      HelpfulVotes: review.votes_up || 0,
      Language: review.language,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "FilteredReviews");

    XLSX.writeFile(workbook, `filtered_reviews_${gameName}.xlsx`);
  };

  return (
    <button
      onClick={exportToExcel}
      className="fixed bottom-6 right-6 z-50 text-white flex items-center
    rounded-full px-4 py-3 group transition-all duration-300 border border-white/30
    backdrop-blur-[15px] bg-gradient-to-br from-white/15 to-white/5
    hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]"
    >
      <FaDownload size={20} />
      <span
        className="ml-0 max-w-0 overflow-hidden opacity-0 
      group-hover:opacity-100 group-hover:ml-3 group-hover:max-w-[150px] 
      transition-all duration-300 whitespace-nowrap font-sf text-lg font-bold"
      >
        Download reviews
      </span>
    </button>
  );
};

export default DownloadReviewsButton;
