import { useState } from "react";
import { useRouter } from "next/router";
import { trendingPlaces } from "../data/places";
import Navbar from "../components/Navbar";

export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filteredPlaces = trendingPlaces.filter((place) =>
    place.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectPlace = (placeName: string) => {
    const slug = placeName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/destination/${slug}`);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center pt-12 bg-gray-50 px-4">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-6 text-center">
          Welcome to <span className="text-green-600">Destinova 🌍</span>
        </h1>

        <div className="w-full max-w-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations..."
            className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full max-w-md">
          {query && (
            <div className="bg-white rounded shadow-md">
              {filteredPlaces.length > 0 ? (
                filteredPlaces.map((place) => (
                  <div
                    key={place.id}
                    onClick={() => handleSelectPlace(place.name)}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-50 border-b border-gray-100"
                  >
                    {place.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No destinations found.</div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
