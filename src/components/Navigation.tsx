// components/Navbar.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

// Define the structure for our navigation links
interface SubLink {
  title: string;
  href: string;
}

interface NavLink {
  title: string;
  href?: string;
  external?: boolean; // To handle links like "About SVNIT"
  subLinks?: SubLink[];
}

// Data-driven navigation: Single source of truth for all links
const navLinks: NavLink[] = [
  {
    title: "About SVNIT",
    href: "https://www.svnit.ac.in",
    external: true,
  },
  {
    title: "For Students",
    subLinks: [
      { title: "Placement Process", href: "/placement-process" },
      { title: "Internships", href: "/internships" },
      { title: "Placed Students", href: "/student" },
      { title: "Members", href: "/members" },
    ],
  },
  {
    title: "Placement",
    subLinks: [
      { title: "Company Data", href: "/placementData" },
      { title: "Placement Stats", href: "/placementStats" },
    ],
  },
  // {
  //   title: "Alumni",
  //   subLinks: [
  //     { title: "Alumni Network", href: "#" },
  //     { title: "Success Stories", href: "#" },
  //     { title: "Give Back", href: "#" },
  //   ],
  // },
];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const navRef = useRef<HTMLElement>(null);

  // Effect to ensure component is mounted on the client before rendering theme-specific UI
  useEffect(() => setMounted(true), []);

  // Effect to close dropdowns when clicking outside the navbar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Effect to lock body scroll when mobile menu is open for better UX
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [mobileOpen]);

  if (!mounted) return null; // Avoids hydration mismatch

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenMenu(null);
  };

  // Helper function to render a single link, handling internal and external links
  const renderLink = (link: NavLink | SubLink) => {
    const isExternal = "external" in link && link.external;
    const props = {
      href: link.href || "#",
      target: isExternal ? "_blank" : undefined,
      rel: isExternal ? "noopener noreferrer" : undefined,
      className: "text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors font-medium",
    };

    return isExternal ? <a {...props}>{link.title}</a> : <Link {...props}>{link.title}</Link>;
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3" onClick={closeMobileMenu}>
          <img src="/logo.png" alt="ATPC Logo" width={50} height={40} className="rounded-md hover:scale-105 transition-transform duration-200" />
          <div className="hidden sm:flex flex-col">
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100">Alumni Training & Placement Council</span>
            <span className="text-sm text-slate-600 dark:text-slate-400">SVNIT, Surat</span>
          </div>
        </Link>

        {/* Desktop Links (Generated from navLinks array) */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div key={link.title} className="relative">
              {link.subLinks ? (
                <>
                  <button
                    onClick={() => toggleMenu(link.title)}
                    aria-haspopup="true"
                    aria-expanded={openMenu === link.title}
                    // CORRECTED: Added curly braces and quotes for the attribute
                    aria-controls={`desktop-menu-${link.title.replace(/\s+/g, '-')}`}
                    className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors font-medium"
                  >
                    {link.title}
                    {/* CORRECTED: Added backticks for the template literal */}
                    <ChevronDown size={18} className={`transition-transform duration-200 ${openMenu === link.title ? "rotate-180" : ""}`} />
                  </button>
                  {openMenu === link.title && (
                    // CORRECTED: Added curly braces and quotes for the attribute
                    <div id={`desktop-menu-${link.title.replace(/\s+/g, '-')}`} className="absolute top-10 -left-4 bg-white dark:bg-slate-800 rounded-md shadow-lg w-48 ring-1 ring-black/5 py-1">
                      {link.subLinks.map((subLink) => (
                        <Link key={subLink.title} href={subLink.href} onClick={() => setOpenMenu(null)} className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-sky-500 dark:hover:text-sky-400">
                          {subLink.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                renderLink(link)
              )}
            </div>
          ))}
        </div>

        {/* Right Section: Theme Toggle + Mobile Menu Button */}
        <div className="flex items-center">
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden ml-4 text-slate-800 dark:text-slate-200" aria-label="Toggle menu" aria-expanded={mobileOpen}>
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Generated from navLinks array) */}
      {/* CORRECTED: Added backticks for the template literal */}
      <div className={`transition-all duration-300 ease-in-out lg:hidden overflow-hidden ${mobileOpen ? "max-h-screen" : "max-h-0"}`}>
        <div className="bg-white/95 dark:bg-slate-900/95 px-4 pt-2 pb-4 space-y-1 border-t border-slate-200 dark:border-slate-800">
          {navLinks.map((link) => (
            <div key={link.title}>
              {link.subLinks ? (
                <>
                  <button
                    onClick={() => toggleMenu(link.title)}
                    aria-expanded={openMenu === link.title}
                    // CORRECTED: Added curly braces and quotes for the attribute
                    aria-controls={`mobile-menu-${link.title.replace(/\s+/g, '-')}`}
                    className="flex justify-between items-center w-full py-2 font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400"
                  >
                    <span>{link.title}</span>
                    {/* CORRECTED: Added backticks for the template literal */}
                    <ChevronDown size={18} className={`transition-transform duration-200 ${openMenu === link.title ? "rotate-180" : ""}`} />
                  </button>
                  {/* CORRECTED: Added backticks and quotes for attributes */}
                  <div id={`mobile-menu-${link.title.replace(/\s+/g, '-')}`} className={`transition-all duration-300 ease-in-out overflow-hidden ${openMenu === link.title ? "max-h-96" : "max-h-0"}`}>
                    <div className="pt-2 pb-1 pl-4 space-y-2 text-slate-600 dark:text-slate-400">
                      {link.subLinks.map((subLink) => (
                        <Link key={subLink.title} href={subLink.href} onClick={closeMobileMenu} className="block hover:text-sky-500 dark:hover:text-sky-400 py-1">
                          {subLink.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div onClick={closeMobileMenu} className="block py-2">
                  {renderLink(link)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;