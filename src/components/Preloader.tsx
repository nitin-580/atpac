"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] flex justify-center items-center bg-white dark:bg-slate-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Larger circular spinner without the logo */}
          <div className="w-32 h-32 border-8 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;