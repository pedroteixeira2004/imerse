import React from "react";
import { FiDownload } from "react-icons/fi";

const DownloadButton = ({ link, size = "default" }) => {
  if (!link) return null;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      download
      onClick={(e) => e.stopPropagation()}
      className={`
        flex items-center rounded-full shadow-lg group overflow-hidden transition-all duration-300 
        backdrop-blur-[15px] border text-white
        bg-gradient-to-br from-white/15 to-white/5 border-white/30 hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]
        ${size === "small" ? "px-4 py-2" : "px-8 py-2"}
        cursor-pointer
      `}
      title="Download"
    >
      <FiDownload className={`${size === "small" ? "h-5 w-5" : "h-8 w-8"}`} />
      <span
        className={`
          ml-0 max-w-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:ml-3 
          transition-all duration-300 whitespace-nowrap font-sf font-bold
          ${
            size === "small"
              ? "text-sm group-hover:max-w-[120px]"
              : "text-lg group-hover:max-w-[200px]"
          }
        `}
      >
        Download
      </span>
    </a>
  );
};
export default DownloadButton;
