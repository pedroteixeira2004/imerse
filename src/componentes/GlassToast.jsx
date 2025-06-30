import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const GlassToast = ({ t, message, type = "success" }) => {
  const iconMap = {
    success: <CheckCircle className="text-green-400 w-6 h-6 mr-2" />,
    error: <XCircle className="text-red-400 w-6 h-6 mr-2" />,
    warning: <AlertTriangle className="text-yellow-400 w-6 h-6 mr-3" />,
  };

  return (
    <AnimatePresence>
      {t.visible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="max-w-sm w-1/3 px-4 py-3 rounded-xl shadow-xl ml-4 mr-4 bg-white/10 text-white backdrop-blur-lg border border-white/10 flex items-center"
        >
          {iconMap[type]}
          <span className="text-lg font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlassToast;
