// app/admin/layout.tsx
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--color-dark)]">
      {/* Sidebar */}
      <aside className="w-64 text-white bg-[var(--color-dark)] shadow-lg p-4 fixed h-screen">
        <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
        <nav className="flex flex-col gap-3">
          <Link href="/admin">🏠 Home</Link>
          <Link href="/admin/songs">🎵 Songs</Link>
          <Link href="/admin/songs/upload">⬆️ Upload Song</Link>
          <Link href="/admin/songs/delete">🗑️ Delete Song</Link>
          <Link href="/admin/bumpers">📻 Bumpers</Link>
          <Link href="/admin/bumpers/upload">⬆️ Upload Bumper</Link>
          <Link href="/admin/bumpers/delete">🗑️ Delete Bumper</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-6 bg-[var(--color-dark)]">
        {children}
      </main>
    </div>
  );
}
