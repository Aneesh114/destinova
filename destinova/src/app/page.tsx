"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleProtectedRoute = (route: string) => {
    if (!session) {
      router.push("/signin");
    } else {
      router.push(route);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <div className="text-xl font-bold text-blue-600">CodeCanvas</div>
        <div className="space-x-6 text-gray-700 font-medium">
          <button onClick={() => handleProtectedRoute("/recommendations")} className="hover:text-blue-500">
            Recommendations
          </button>
          <a href="/browse" className="hover:text-blue-500">Browse</a>
          <button onClick={() => handleProtectedRoute("/favorites")} className="hover:text-blue-500">
            Favorites
          </button>
        </div>
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center mt-24 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Find Your Next Favorite Project</h1>
        <div className="w-full max-w-xl">
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
        </div>
      </main>
    </div>
  );
}
