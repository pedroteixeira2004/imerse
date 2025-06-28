import React from "react";

const FeatureOverlay = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-[15px] rounded-2xl border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-8 max-w-lg text-center text-white font-sf"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Unlock More Features</h2>
        <p className="text-lg mb-6">
          Sign up or log in to access AI-powered summaries, advanced filters,
          game comparison, reports and more tools.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => (window.top.location.href = "/login")}
            className=" px-6 py-2 rounded-full font-bold transition-all duration-300 border border-white/30
    backdrop-blur-[15px] bg-gradient-to-br from-white/15 to-white/5
    hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]"
          >
            Login
          </button>
          <button
            onClick={() => (window.top.location.href = "/signup")}
            className="px-6 py-2 rounded-full font-bold transition-all duration-300 border border-white/30
    backdrop-blur-[15px] bg-gradient-to-br from-white/15 to-white/5
    hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]"
          >
            Signup
          </button>
        </div>
        <button
          className="mt-6 text-sm text-white/70 hover:underline"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FeatureOverlay;
