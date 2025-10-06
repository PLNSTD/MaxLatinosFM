"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const API = process.env.NEXT_PUBLIC_API_URL;

interface LoadingContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextType>({
  loading: true,
  setLoading: () => {},
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Client-side auth check
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${API}/auth/login/check`, {
          method: "GET",
          credentials: "include", // include cookies if API uses sessions
        });
        if (!res.ok) {
          router.push("/admin/login");
        } else {
          setLoading(false);
        }
      } catch (err) {
        router.push("/admin/login");
      }
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setLoading(true);
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const links = [
    { href: "/", label: "🏠 Radio Page" },
    { href: "/admin/songs", label: "🎵 Songs" },
    { href: "/admin/songs/upload", label: "⬆️ Upload Song" },
    { href: "/admin/songs/delete", label: "🗑️ Delete Song" },
    { href: "/admin/bumpers", label: "📻 Bumpers" },
    { href: "/admin/bumpers/upload", label: "⬆️ Upload Bumper" },
    { href: "/admin/bumpers/delete", label: "🗑️ Delete Bumper" },
  ];

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen text-white bg-[var(--color-dark)]">
  //       Checking authentication...
  //     </div>
  //   );
  // }

  return (
    <div className="flex min-h-screen bg-[var(--color-dark)] text-white">
      <button
        className="absolute top-4 left-4 md:hidden text-white text-2xl z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX /> : <HiMenu />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[var(--color-dark)] border-r border-gray-800 p-6
          flex flex-col justify-between transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div>
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
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform ${
                    isActive
                      ? "bg-[var(--color-accent)] text-white font-semibold shadow-lg translate-x-1"
                      : "text-gray-300 hover:text-white hover:bg-[var(--color-accent)] hover:translate-x-1"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 bg-red-500 hover:bg-red-600 py-2 rounded text-white font-semibold"
        >
          {loading ? "Login" : "Logout"}
        </button>
      </aside>

      <main className="flex-1 p-8 md:ml-64">
        <LoadingContext.Provider value={{ loading, setLoading }}>
          {children}
        </LoadingContext.Provider>
      </main>
    </div>
  );
}
