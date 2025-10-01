"use client";

import React, { useEffect, useState } from "react";

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="preloader">
      <div className="preloader-content">
        <img src="/logo.png" alt="Logo" className="preloader-logo dark:text-white" />
        <p className="preloader-text">Your Placement Our Support...</p>
      </div>
    </div>
  );
};

export default Preloader;