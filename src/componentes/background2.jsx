import React from "react";

const GradientBackground = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 animated-gradient">
      {children}
      <style>
        {`
                    @keyframes gradientMove {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .animated-gradient {
                        background-size: 200% 200%;
                        animation: gradientMove 6s infinite linear;
                    }
                `}
      </style>
    </div>
  );
};

export default GradientBackground;
