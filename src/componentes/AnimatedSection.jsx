import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const AnimatedSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className="
        col-span-3
        p-6
        bg-gradient-to-br from-white/15 to-white/5
        backdrop-blur-[15px]
        rounded-2xl
        border border-white/30
        shadow-[0_4px_30px_rgba(0,0,0,0.1)]
      "
    >
      <div
        className="flex justify-between items-center cursor-pointer mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-2xl">{isOpen ? "−" : "+"}</span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedSection;
