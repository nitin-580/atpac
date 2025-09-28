"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Welcome to our platform! We are committed to excellence.",
  "Our students' success is our top priority.",
  "We believe in fostering innovation and creativity.",
  "Join us in making a difference in your academic journey.",
];

const ChairpersonHero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 4000); // change message every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-100 p-8 md:p-16">
      {/* Left side: Chairperson photo and messages */}
      <div className="md:w-1/2 flex flex-col items-center md:items-start">
        <img
          src="/logo.png"
          alt="Chairperson"
          className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-gray-300 mb-6"
        />
        <div className="w-full max-w-md relative">
          <AnimatePresence mode="wait">
          </AnimatePresence>
        </div>
      </div>

      {/* Right side: optional hero content */}
      <div className="md:w-1/2 mt-10 md:mt-0 md:pl-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Messages from our Chairperson
        </h1>
        <p className="text-gray-700 text-lg">
          Here you can read the latest messages and updates from our leadership.
        </p>
      </div>
    </div>
  );
};

export default ChairpersonHero;
