import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await fetch("/api/favorites");
      const data = await res.json();
  
      if (Array.isArray(data)) {
        setFavorites(data.map((item) => item.place));
      } else {
        console.warn("Favorites API did not return an array:", data);
        setFavorites([]);
      }
    };
  
    fetchFavorites();
  }, []);
  const handleRemove = async (placeName: string) => {
    const res = await fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placeId: placeName }),
    });
  
    if (res.ok) {
      setFavorites((prev) => prev.filter((p) => p.name !== placeName));
    } else {
      alert("Failed to remove favorite.");
    }
  };
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto mt-12 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Favorite Places</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500">No favorites yet. Browse and add some!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((place, idx) => (
  <div key={idx} className="bg-white shadow p-6 rounded relative">
    <h3 className="text-lg font-semibold text-blue-700">{place.name}</h3>
    <p className="text-gray-600 mt-2">{place.description}</p>
    <button
      onClick={() => handleRemove(place.name)}
      className="absolute top-3 right-3 text-sm text-red-500 hover:text-red-700"
    >
      ✖ Remove
    </button>
  </div>
))}
          </div>
        )}
      </main>
    </>
  );
}
