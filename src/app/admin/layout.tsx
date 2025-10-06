"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "🏠 Radio Page" },
    { href: "/admin/songs", label: "🎵 Songs" },
    { href: "/admin/songs/upload", label: "⬆️ Upload Song" },
    { href: "/admin/songs/delete", label: "🗑️ Delete Song" },
    { href: "/admin/bumpers", label: "📻 Bumpers" },
    { href: "/admin/bumpers/upload", label: "⬆️ Upload Bumper" },
    { href: "/admin/bumpers/delete", label: "🗑️ Delete Bumper" },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--color-dark)] text-white">
      {/* Mobile hamburger button */}
      <button
        className="absolute top-4 left-4 md:hidden text-white text-2xl z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[var(--color-dark)] border-r border-gray-800 p-6
          flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <h1 className="text-2xl font-bold mb-8 tracking-wide text-gray-100">
          Admin Dashboard
        </h1>
        <nav className="flex flex-col gap-2">
          {links.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform
                  ${
                    isActive
                      ? "bg-[var(--color-accent)] text-white font-semibold shadow-lg translate-x-1"
                      : "text-gray-300 hover:text-white hover:bg-[var(--color-accent)] hover:translate-x-1"
                  }`}
                onClick={() => setIsOpen(false)} // close sidebar on mobile link click
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 md:ml-64">{children}</main>
    </div>
  );
}
