// src/componentes/ConfirmOverlay.js
import React from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";

const ConfirmPaymentOverlay = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[9999] font-sf"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-6 w-1/3 h-80 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full text-center">
          <h2 className="text-white text-4xl mb-4 font-bold">{title}</h2>
          <p className="text-white/80 text-lg mb-8">{message}</p>
          <div className="flex justify-center gap-4 text-xl">
            <button
              onClick={onCancel}
              className="px-6 py-2 rounded-full transition-all duration-300 button-filters font-bold"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="rounded-full button2 text-white px-6 font-bold"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmPaymentOverlay;
