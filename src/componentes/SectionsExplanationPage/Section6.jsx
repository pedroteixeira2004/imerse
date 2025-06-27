import { useState, useEffect } from "react";
import gradiente from "../../assets/imagens/gradiente_game_details.svg";
import excel from "../../assets/icones/excel.svg";

const totalReviews = 100;

function Section6() {
  const [progress, setProgress] = useState(0);
  const [excelAnimate, setExcelAnimate] = useState(false);

  useEffect(() => {
    if (progress < 100) {
      const timeout = setTimeout(() => {
        setProgress((prev) => Math.min(prev + 3, 100));
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  useEffect(() => {
    if (progress === 100) {
      setExcelAnimate(true);

      const animationTimeout = setTimeout(() => {
        setExcelAnimate(false);
      }, 2000);

      const resetTimeout = setTimeout(() => {
        setProgress(0);
      }, 2000);

      return () => {
        clearTimeout(animationTimeout);
        clearTimeout(resetTimeout);
      };
    }
  }, [progress]);

  return (
    <section className="relative text-white overflow-hidden h-[100vh] bg-[#0D1060]">
      <div className="h-[40vh] flex flex-col items-center justify-center relative px-4">
        <div className="text-center max-w-4xl w-full">
          <div className="mb-4 text-2xl font-semibold">
            Exporting reviews to Excel
          </div>

          <div className="mb-6 text-lg text-gray-300">
            {Math.round((progress / 100) * totalReviews)} / {totalReviews}{" "}
            reviews exported
          </div>

          <div
            className={`mb-10 mx-auto w-20 h-20 rounded-xl flex items-center justify-center text-white text-5xl font-bold ${
              excelAnimate ? "animate-excelPop" : ""
            }`}
          >
            <img src={excel} alt="excel icon" className="h-20 w-20" />
          </div>

          <div
            className="w-full h-6 bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-3xl 
              border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-full overflow-hidden"
          >
            <div
              className="h-full button2 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="relative flex justify-center items-center h-[60vh] text-white">
        <img
          src={gradiente}
          alt="gradiente"
          className="absolute bottom-0 left-0 w-full z-0 pointer-events-none"
        />
        <div className="relative z-10 text-center max-w-5xl px-6">
          <div className="font-bold text-6xl">5. Export to Excel</div>
          <div className="mt-8 text-2xl">
            Need to dive even deeper into the data? Download all your filtered
            results instantly in a clean, well-organized Excel file that's
            perfectly formatted and ready for comprehensive analysis, reporting,
            or sharing with your team.
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section6;
