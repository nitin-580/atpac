"use client";

import React, { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="ATPC Logo"
            width={50}
            height={40}
            className="rounded-md hover:scale-105 transition-transform duration-200"
          />
          <div className="hidden sm:flex flex-col">
            <span className="text-lg sm:text-xl text-gray-700 font-bold">
              Alumni Training & Placement Council
            </span>
            <span className="text-xs sm:text-sm text-gray-500 font-normal">
              SVNIT, Surat
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 relative">
          <a
            href="https://www.svnit.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-yellow-300"
          >
            About SVNIT
          </a>

          {/* For Students */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("students")}
              className="flex items-center gap-1 text-gray-700 hover:text-yellow-300"
            >
              For Students <ChevronDown size={18} />
            </button>
            {openMenu === "students" && (
              <div className="absolute top-10 left-0 bg-white text-black rounded-md shadow-lg w-48">
                <Link href="/placement-process" className="block px-4 py-2 hover:bg-gray-100">
                  Placement Process
                </Link>
                <Link href="/internships" className="block px-4 py-2 hover:bg-gray-100">
                  Internships
                </Link>
                <Link href="/student" className="block px-4 py-2 hover:bg-gray-100">
                  Placed Students
                </Link>
                <Link href="/members" className="block px-4 py-2 hover:bg-gray-100">
                  Members
                </Link>
              </div>
            )}
          </div>

          {/* Placement Data */}
          <Link
            href="/placementStats"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-yellow-300"
          >
            Placement Data
          </Link>

          {/* Alumni */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("alumni")}
              className="flex items-center gap-1 text-gray-700 hover:text-yellow-300"
            >
              Alumni <ChevronDown size={18} />
            </button>
            {openMenu === "alumni" && (
              <div className="absolute top-10 left-0 bg-white text-black rounded-md shadow-lg w-48">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Alumni Network
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Success Stories
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Give Back
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-700"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          <a
            href="https://www.svnit.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gray-700 hover:text-yellow-300"
          >
            About SVNIT
          </a>

          {/* Students Accordion */}
          <div>
            <button
              onClick={() => toggleMenu("students")}
              className="flex justify-between items-center w-full text-gray-700 hover:text-yellow-300"
            >
              For Students <ChevronDown size={18} />
            </button>
            {openMenu === "students" && (
              <div className="mt-2 pl-4 space-y-2">
                <Link href="/placement-process" className="block hover:text-blue-600">
                  Placement Process
                </Link>
                <Link href="/internships" className="block hover:text-blue-600">
                  Internships
                </Link>
                <Link href="/student" className="block hover:text-blue-600">
                  Placed Students
                </Link>
                <Link href="/members" className="block hover:text-blue-600">
                  Members
                </Link>
              </div>
            )}
          </div>

          {/* Placement Data */}
          <Link
            href="/placementStats"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gray-700 hover:text-yellow-300"
          >
            Placement Data
          </Link>

          {/* Alumni Accordion */}
          <div>
            <button
              onClick={() => toggleMenu("alumni")}
              className="flex justify-between items-center w-full text-gray-700 hover:text-yellow-300"
            >
              Alumni <ChevronDown size={18} />
            </button>
            {openMenu === "alumni" && (
              <div className="mt-2 pl-4 space-y-2">
                <a href="#" className="block hover:text-blue-600">
                  Alumni Network
                </a>
                <a href="#" className="block hover:text-blue-600">
                  Success Stories
                </a>
                <a href="#" className="block hover:text-blue-600">
                  Give Back
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
