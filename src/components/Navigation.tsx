"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenMenu(null); // Also close any open dropdowns
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3"
          onClick={closeMobileMenu}
        >
          <img
            src="/logo.png"
            alt="ATPC Logo"
            width={50}
            height={40}
            className="rounded-md hover:scale-105 transition-transform duration-200"
          />
          <div className="hidden sm:flex flex-col">
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Alumni Training & Placement Council
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-400">SVNIT, Surat</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div ref={dropdownRef} className="hidden md:flex items-center space-x-8">
          <a
            href="https://www.svnit.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors font-medium"
          >
            About SVNIT
          </a>

          {/* For Students Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("students")}
              aria-haspopup="true"
              aria-expanded={openMenu === "students"}
              className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors font-medium"
            >
              For Students <ChevronDown size={18} />
            </button>
            {openMenu === "students" && (
              <div className="absolute top-10 -left-4 bg-white dark:bg-slate-800 rounded-md shadow-lg w-48 ring-1 ring-black/5">
                <Link href="/placement-process" onClick={() => setOpenMenu(null)} className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-sky-500 dark:hover:text-sky-400">Placement Process</Link>
                <Link href="/internships" onClick={() => setOpenMenu(null)} className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-sky-500 dark:hover:text-sky-400">Internships</Link>
                <Link href="/student" onClick={() => setOpenMenu(null)} className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-sky-500 dark:hover:text-sky-400">Placed Students</Link>
                <Link href="/members" onClick={() => setOpenMenu(null)} className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-sky-500 dark:hover:text-sky-400">Members</Link>
              </div>
            )}
          </div>

          {/* Placement Data */}
          <Link
            href="/placementStats"
            className="text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors font-medium"
          >
            Placement Data
          </Link>

          {/* Alumni Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("alumni")}
              aria-haspopup="true"
              aria-expanded={openMenu === "alumni"}
              className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors font-medium"
            >
              Alumni <ChevronDown size={18} />
            </button>
            {openMenu === "alumni" && (
              <div className="absolute top-10 right-0 bg-white dark:bg-slate-800 rounded-md shadow-lg w-48 ring-1 ring-black/5">
                <a href="#" onClick={() => setOpenMenu(null)} className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-sky-500 dark:hover:text-sky-400">Alumni Network</a>
                <a href="#" onClick={() => setOpenMenu(null)} className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-sky-500 dark:hover:text-sky-400">Success Stories</a>
                <a href="#" onClick={() => setOpenMenu(null)} className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-sky-500 dark:hover:text-sky-400">Give Back</a>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Theme + Mobile Menu */}
        <div className="flex items-center">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden ml-4 text-slate-800 dark:text-slate-200"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`transition-all duration-300 ease-in-out md:hidden overflow-hidden ${mobileOpen ? "max-h-screen" : "max-h-0"}`}>
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 pt-2 pb-4 space-y-2 border-t border-slate-200 dark:border-slate-800">
          <a href="https://www.svnit.ac.in" target="_blank" rel="noopener noreferrer" className="block py-2 font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400">About SVNIT</a>

          {/* Students Accordion */}
          <div>
            <button
              onClick={() => toggleMenu("studentsMobile")}
              className="flex justify-between items-center w-full py-2 font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400"
            >
              <span>For Students</span>
              <ChevronDown size={18} className={`transition-transform duration-200 ${openMenu === "studentsMobile" ? "rotate-180" : ""}`} />
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openMenu === "studentsMobile" ? "max-h-96" : "max-h-0"}`}>
              <div className="pt-2 pl-4 space-y-2 text-slate-600 dark:text-slate-400">
                <Link href="/placement-process" onClick={closeMobileMenu} className="block hover:text-sky-500 dark:hover:text-sky-400">Placement Process</Link>
                <Link href="/internships" onClick={closeMobileMenu} className="block hover:text-sky-500 dark:hover:text-sky-400">Internships</Link>
                <Link href="/student" onClick={closeMobileMenu} className="block hover:text-sky-500 dark:hover:text-sky-400">Placed Students</Link>
                <Link href="/members" onClick={closeMobileMenu} className="block hover:text-sky-500 dark:hover:text-sky-400">Members</Link>
              </div>
            </div>
          </div>

          <Link href="/placementStats" onClick={closeMobileMenu} className="block py-2 font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400">Placement Data</Link>

          {/* Alumni Accordion */}
          <div>
            <button
              onClick={() => toggleMenu("alumniMobile")}
              className="flex justify-between items-center w-full py-2 font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400"
            >
              <span>Alumni</span>
              <ChevronDown size={18} className={`transition-transform duration-200 ${openMenu === "alumniMobile" ? "rotate-180" : ""}`} />
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openMenu === "alumniMobile" ? "max-h-96" : "max-h-0"}`}>
              <div className="pt-2 pl-4 space-y-2 text-slate-600 dark:text-slate-400">
                <a href="#" onClick={closeMobileMenu} className="block hover:text-sky-500 dark:hover:text-sky-400">Alumni Network</a>
                <a href="#" onClick={closeMobileMenu} className="block hover:text-sky-500 dark:hover:text-sky-400">Success Stories</a>
                <a href="#" onClick={closeMobileMenu} className="block hover:text-sky-500 dark:hover:text-sky-400">Give Back</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;