"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ContactUs from "./ContactUs"; // Assuming you have this component

export default function Hero() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="bg-white py-12 px-6 lg:px-20 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
            <span className="text-sm font-bold tracking-wide text-gray-800">
              Alumni Training and Placement Council
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Students&apos; Career Development Cell &quot;(CDC)&quot;
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            The Students&apos; Placement Office (SPO), SVNIT is maintained and
            managed by a dedicated team of office staff and students who are
            responsible for all areas of SVNIT placements. The SPO team assists
            recruiters to the best of its ability. We are grateful for the trust
            placed in us by various organisations, and we hope to continue
            working with them in the future.
          </p>

          <div className="flex flex-wrap gap-6">
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md shadow hover:bg-blue-700 transition"
            >
              Contact →
            </button>
            <a
              href="#"
              className="font-bold text-gray-800 hover:text-blue-600 transition"
            >
              Recruitment Portal →
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <Image
            src="/admin1.png"
            alt="SVNIT Campus"
            width={350}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>

      <AnimatePresence>
      </AnimatePresence>
    </section>
  );
}