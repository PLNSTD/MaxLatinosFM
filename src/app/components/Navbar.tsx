"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const navBtn = document.getElementById("dropdownBtn");
    const dropMenu = document.getElementById("dropdownMenu")!;

    navBtn?.addEventListener("click", () => {
      dropMenu.classList.toggle("scale-y-0");
      dropMenu.classList.toggle("scale-y-100");
      dropMenu.classList.toggle("p-0");
      dropMenu.classList.toggle("pl-4");
      dropMenu.classList.toggle("pr-4");
      dropMenu.classList.toggle("pb-4");
      dropMenu.classList.toggle("pt-2");
      dropMenu.classList.toggle("opacity-0");
      dropMenu.classList.toggle("opacity-100");
      setIsOpen((c) => !c);
    });
  }, []);

  return (
    <nav className="fixed top-3 left-3 text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Mobile Hamburger */}
        <button
          id="dropdownBtn"
          className={`p-1 md-hidden flex flex-col space-y-1 cursor-pointer rounded-lg
          transition-transform duration-150
          active:scale-120
          hover:scale-140
          ${isOpen ? "bg-gray-600" : "bg-bg"}`}
        >
          <span className="w-6 h-0.5 bg-white rounded-lg"></span>
          <span className="w-6 h-0.5 bg-white rounded-lg"></span>
          <span className="w-6 h-0.5 bg-white rounded-lg"></span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        id="dropdownMenu"
        className="
          scale-y-0 opacity-0 p-0
          transform
        transition-all duration-300
        
        mt-2 flex flex-col space-y-2 bg-gray-600 rounded-md"
      >
        <Link
          href="/about"
          className="hover:text-gray-300 transition underline underline-offset-2"
        >
          Vision
        </Link>
        <Link
          href="/about"
          className="hover:text-gray-300 transition underline underline-offset-2"
        >
          Contactos
        </Link>
      </div>
    </nav>
  );
}
