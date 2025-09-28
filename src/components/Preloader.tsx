"use client";

import React, { useEffect, useState } from "react";// adjust path to your logo

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (replace with real loading logic if needed)
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null; // Hide preloader when loading is done

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center animate-pulse">
        <img src="/logo.png" alt="Logo" className="w-32 h-32 mb-4" />
        <p className="text-gray-500 text-lg">Your Placement Our Support...</p>
      </div>
    </div>
  );
};

export default Preloader;
