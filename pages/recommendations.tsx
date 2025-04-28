import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      const res = await fetch("/api/recommend");
      const data = await res.json();
      setRecommendations(data);
    };

    fetchRecommendations();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recommendations.length);
    setMessage("");
  };

  const handleFavorite = async (place: any) => {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ place }),
    });

    if (res.ok) {
      setMessage("✅ Added to Favorites!");
    } else {
      setMessage("❌ Failed to add. Try again.");
    }
  };

  const current = recommendations[currentIndex];

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto mt-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Your Recommended Destinations</h1>
        {current ? (
          <div className="bg-white shadow p-6 rounded mb-6">
            <h2 className="text-2xl font-semibold text-green-600 mb-2">{current.name}</h2>
            <p className="text-gray-700 mb-4">{current.description}</p>
            <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
              <div><b>Climate:</b> {current.climate}</div>
              <div><b>Landscape:</b> {current.landscape}</div>
              <div><b>Culture:</b> {current.culture}</div>
              <div><b>Budget:</b> {current.budget}</div>
              <div><b>Activities:</b> {current.activities.join(", ")}</div>
            </div>

            <div className="flex gap-4 justify-center">
              {recommendations.length > 1 && (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Next ➡️
                </button>
              )}
              <button
                onClick={() => handleFavorite(current)}
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                ❤️ Favorite
              </button>
            </div>

            {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
          </div>
        ) : (
          <p className="text-gray-600">Fetching your perfect match...</p>
        )}
      </main>
    </>
  );
}
