import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BotaoTopo = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 text-white flex items-center
    rounded-full px-4 py-3 group transition-all duration-300 border border-white/30
    backdrop-blur-[15px] bg-gradient-to-br from-white/15 to-white/5
    hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]"
      >
        <FaArrowUp size={20} />
        <span
          className="ml-0 max-w-0 overflow-hidden opacity-0 
      group-hover:opacity-100 group-hover:ml-3 group-hover:max-w-[150px] 
      transition-all duration-300 whitespace-nowrap font-sf text-lg font-bold"
        >
          Scroll to top
        </span>
      </button>
    )
  );
};

export default BotaoTopo;
