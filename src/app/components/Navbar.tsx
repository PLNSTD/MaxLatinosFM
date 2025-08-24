"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-3 left-3 text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Mobile Hamburger */}
        <button
          id="dropdownBtn"
          onClick={() => setIsOpen((c) => !c)}
          className={`p-1 md-hidden flex flex-col space-y-1 cursor-pointer rounded-lg
          transition-transform duration-150
          active:scale-120
          hover:scale-140
          ${
            isOpen ? "bg-gray-600" : pathname === "/" ? "bg-bg" : "bg-primary"
          }`}
        >
          <span className="w-6 h-0.5 bg-white rounded-lg"></span>
          <span className="w-6 h-0.5 bg-white rounded-lg"></span>
          <span className="w-6 h-0.5 bg-white rounded-lg"></span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        id="dropdownMenu"
        className={`
          ${
            !isOpen
              ? "scale-y-0 opacity-0 p-0"
              : "scale-y-100 opacity-100 pl-4 pr-4 pb-4 pt-2"
          }
          transform
        transition-all duration-300
        
        mt-2 flex flex-col space-y-2 bg-gray-600 rounded-md`}
      >
        {pathname === "/" ? (
          <Link
            href="/about"
            className="hover:text-gray-300 transition underline underline-offset-2"
          >
            Nosotros
          </Link>
        ) : (
          <Link
            href="/"
            className="hover:text-gray-300 transition underline underline-offset-2"
          >
            Player
          </Link>
        )}
      </div>
    </nav>
  );
}
