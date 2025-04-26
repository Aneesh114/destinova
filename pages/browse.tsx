import Link from "next/link";
import Navbar from "../components/Navbar";
import { trendingPlaces } from "../data/places";
import { useSession } from "next-auth/react";



export default function Browse() {
  const { data: session } = useSession();

  const addToFavorites = async (place) => {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ place }),
    });

    if (res.ok) {
      alert(`${place.name} added to your favorites`);
    } else {
      alert("Please sign in to favorite places.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto mt-12 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Trending Tourist Places</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trendingPlaces.map((place) => (
            <div key={place.id} className="bg-white shadow-md p-6 rounded-lg relative">
              <h3 className="text-xl font-semibold text-blue-700">{place.name}</h3>
              <p className="text-gray-600 mt-2 mb-4">{place.description}</p>
              <button
                onClick={() => addToFavorites(place)}
                className="absolute top-3 right-3 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded"
              >
                ❤️ Favorite
              </button>
              <Link href={`/destination/${place.name.toLowerCase().replace(/\s+/g, "-")}`} key={place.id}>
  <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition cursor-pointer">
    <h3 className="text-xl font-semibold text-blue-700">{place.name}</h3>
    <p className="text-gray-600 mt-2">Click here to know more</p>
  </div>
</Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}