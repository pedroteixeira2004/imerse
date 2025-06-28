// src/components/PreviewOverlay.jsx
import React from "react";
import ReactDOM from "react-dom";

const PreviewOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black/40 z-[9999] flex justify-center items-center font-sf "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-8 max-w-md text-center text-white"
      >
        <h2 className="text-2xl font-bold mb-4">Preview Mode</h2>
        <p className="text-lg mb-6">
          This is a preview version of the platform. Some features may be
          limited.
        </p>
        <button
          onClick={onClose}
          className="button2 px-6 py-2 rounded-full font-semibold  transition"
        >
          Dismiss
        </button>
      </div>
    </div>,
    document.body
  );
};

export default PreviewOverlay;
