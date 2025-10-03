// app/admin/layout.tsx
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4 fixed h-screen">
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
      <main className="ml-64 flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
