"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function Hero() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="py-8 px-6 lg:px-20 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        {/* IMPROVEMENT: Added responsive text alignment. It's centered on mobile and left-aligned on desktop. */}
        <div className="text-center md:text-left">
          {/* IMPROVEMENT: This container is also centered on mobile. */}
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
            <span className="text-sm font-bold tracking-wide text-slate-600 dark:text-slate-400">
              Alumni Training and Placement Affairs Council
            </span>
          </div>

          <h1 className="text-3xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
           Career Development Cell (CDC)
          </h1>

          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
          Welcome to the Career Development Cell (CDC) at SVNIT – where careers take off! Our energetic team of students and mentors is here to guide, inspire, and connect you with amazing opportunities. We work hand-in-hand with companies and the student community to ensure every talent finds their spotlight.
          </p>

          {/* IMPROVEMENT: Buttons are centered on mobile and left-aligned on desktop. */}
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-md shadow-lg hover:bg-blue-700 transition-colors"
            >
              Contact →
            </button>
            <a
              href="#"
              className="px-8 py-3 font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 rounded-md shadow-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Recruitment Portal →
            </a>
          </div>
        </div>

        {/* Right Image */}
        {/* IMPROVEMENT: Added responsive ordering. Image is first on mobile. */}
        <div className="flex justify-center order-first md:order-last">
          <Image
            src="/admin1.png"
            alt="SVNIT Campus"
            width={400}
            height={450}
            className="rounded-lg shadow-2xl object-cover w-full h-auto max-w-sm"
          />
        </div>
      </div>

      <AnimatePresence>
        {/* Your contact modal can be rendered here when isContactOpen is true */}
      </AnimatePresence>
    </section>
  );
}