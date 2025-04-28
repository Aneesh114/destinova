import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { trendingPlaces } from "../../data/places";
import { useEffect, useState } from "react";

export default function DestinationPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [weather, setWeather] = useState<any>(null);

  const place = trendingPlaces.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === (slug as string)
  );
  

  useEffect(() => {
    if (!place || !slug) return; // <-- Important!
  

    const fetchWeather = async () => {
        if (!place) return;
      
        try {
          const response = await fetch(
            `/api/weather?lat=${place.lat}&lon=${place.lon}`
          );
          const data = await response.json();
          setWeather(data);
          console.log("Weather API Data:", data);
        } catch (error) {
          console.error("Failed to fetch weather:", error);
        }
      };
      
      

    fetchWeather();
  }, [place]);

  if (!place) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold text-red-600">Destination not found</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto mt-12 px-4">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">{place.name}</h1>
        <p className="text-gray-700 text-lg mb-8">{place.description}</p>

        {/* Weather Section */}
{weather && weather.current ? (
  <div className="bg-blue-100 p-6 rounded shadow-md mt-8">
    <h2 className="text-2xl font-semibold mb-2">Current Weather 🌦️</h2>
    <p className="text-lg text-gray-700">
      {weather.current.weather[0].description} — {weather.current.temp}°C
    </p>
    <p className="text-gray-600 text-sm">Humidity: {weather.current.humidity}%</p>
    <p className="text-gray-600 text-sm">Wind Speed: {weather.current.wind_speed} m/s</p>
  </div>
) : (
  <p className="text-gray-500 mt-8">Loading weather information...</p>
)}

      </main>
    </>
  );
}
