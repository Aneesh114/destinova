// import { useRouter } from "next/router";
// import Navbar from "../../components/Navbar";
// import { trendingPlaces } from "../../data/places";
// import { useEffect, useState } from "react";

// export default function DestinationPage() {
//   const router = useRouter();
//   const { slug } = router.query;
//   const [weather, setWeather] = useState<any>(null);

//   const place = trendingPlaces.find(
//     (p) => p.name.toLowerCase().replace(/\s+/g, "-") === (slug as string)
//   );
  

//   useEffect(() => {
//     if (!place || !slug) return; // <-- Important!
  

//     const fetchWeather = async () => {
//         if (!place) return;
      
//         try {
//           const response = await fetch(
//             `/api/weather?lat=${place.lat}&lon=${place.lon}`
//           );
//           const data = await response.json();
//           setWeather(data);
//           console.log("Weather API Data:", data);
//         } catch (error) {
//           console.error("Failed to fetch weather:", error);
//         }
//       };
      
      

//     fetchWeather();
//   }, [place]);

//   if (!place) {
//     return (
//       <>
//         <Navbar />
//         <div className="text-center mt-20">
//           <h2 className="text-2xl font-bold text-red-600">Destination not found</h2>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <main className="max-w-4xl mx-auto mt-12 px-4">
//         <h1 className="text-4xl font-bold text-blue-700 mb-4">{place.name}</h1>
//         <p className="text-gray-700 text-lg mb-8">{place.description}</p>

//         {/* Weather Section */}
// {weather && weather.current ? (
//   <div className="bg-blue-100 p-6 rounded shadow-md mt-8">
//     <h2 className="text-2xl font-semibold mb-2">Current Weather 🌦️</h2>
//     <p className="text-lg text-gray-700">
//       {weather.current.weather[0].description} — {weather.current.temp}°C
//     </p>
//     <p className="text-gray-600 text-sm">Humidity: {weather.current.humidity}%</p>
//     <p className="text-gray-600 text-sm">Wind Speed: {weather.current.wind_speed} m/s</p>
//   </div>
// ) : (
//   <p className="text-gray-500 mt-8">Loading weather information...</p>
// )}

//       </main>
//     </>
//   );
// }

// import { useRouter } from "next/router";
// import Navbar from "../../components/Navbar";
// import { trendingPlaces } from "../../data/places";
// import { useEffect, useState } from "react";

// export default function DestinationPage() {
//   const router = useRouter();
//   const { slug } = router.query;
//   const [weather, setWeather] = useState<any>(null);

//   const place = trendingPlaces.find(
//     (p) => p.name.toLowerCase().replace(/\s+/g, "-") === (slug as string)
//   );

//   useEffect(() => {
//     if (!place || !slug) return;

//     const fetchWeather = async () => {
//       try {
//         const response = await fetch(`/api/weather?lat=${place.lat}&lon=${place.lon}`);
//         const data = await response.json();
//         setWeather(data);
//         console.log("Weather API Data:", data);
//       } catch (error) {
//         console.error("Failed to fetch weather:", error);
//       }
//     };

//     fetchWeather();
//   }, [place]);

//   if (!place) {
//     return (
//       <>
//         <Navbar />
//         <div className="text-center mt-20">
//           <h2 className="text-2xl font-bold text-red-600">Destination not found</h2>
//         </div>
//       </>
//     );
//   }

//   const renderBlockSection = (title: string, items: string[], color: string) => (
//     <section className="mb-12">
//       <h2 className={`text-3xl font-semibold mb-6 ${color}`}>{title}</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {items.map((item, index) => (
//           <div
//             key={index}
//             className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition transform hover:scale-105"
//           >
//             <p className="text-gray-800 text-lg font-medium">{item}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );

//   return (
//     <>
//       <Navbar />
//       <main className="max-w-6xl mx-auto mt-12 px-6">
//         <h1 className="text-5xl font-extrabold text-blue-800 mb-8">{place.name}</h1>

//         {/* About Section */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-semibold text-green-700 mb-4">About {place.name}</h2>
//           <p className="text-gray-700 text-lg leading-relaxed">{place.about}</p>
//         </section>

//         {/* Weather Section */}
//         <section className="mb-12">
//           <h2 className="text-3xl font-semibold text-indigo-700 mb-4">Current Weather 🌦️</h2>
//           {weather && weather.current ? (
//             <div className="bg-blue-50 p-6 rounded-lg shadow-md">
//               <p className="text-xl text-gray-800 capitalize mb-2">
//                 {weather.current.weather[0].description} — {weather.current.temp}°C
//               </p>
//               <p className="text-gray-600">Humidity: {weather.current.humidity}%</p>
//               <p className="text-gray-600">Wind Speed: {weather.current.wind_speed} m/s</p>
//             </div>
//           ) : (
//             <p className="text-gray-500">Loading weather information...</p>
//           )}
//         </section>

//         {/* Local Attractions */}
//         {place.localAttractions && renderBlockSection("Local Attractions 🎡", place.localAttractions, "text-pink-600")}

//         {/* Adventures */}
//         {place.adventures && renderBlockSection("Adventures 🚀", place.adventures, "text-orange-600")}

//         {/* Local Cuisines */}
//         {place.localCuisines && renderBlockSection("Local Cuisines 🍴", place.localCuisines, "text-red-600")}

//         {/* Shopping */}
//         {place.shopping && renderBlockSection("Shopping 🛍️", place.shopping, "text-purple-600")}
//       </main>
//     </>
//   );
// }

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { trendingPlaces } from "../../data/places";
import { useEffect, useState } from "react";

export default function DestinationPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [weather, setWeather] = useState<any>(null);
  const [message, setMessage] = useState("");

  const place = trendingPlaces.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === (slug as string)
  );

  useEffect(() => {
    if (!place || !slug) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(`/api/weather?lat=${place.lat}&lon=${place.lon}`);
        const data = await response.json();
        setWeather(data);
        console.log("Weather API Data:", data);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      }
    };

    fetchWeather();
  }, [place]);

  const addToFavorites = async (place: any) => {
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ place }),
      });

      if (res.ok) {
        setMessage("✅ Added to Favorites!");
      } else {
        setMessage("❌ Please sign in to favorite places.");
      }
    } catch (error) {
      console.error("Failed to add to favorites:", error);
      setMessage("❌ An error occurred.");
    }
  };

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

  const renderBlockSection = (title: string, items: string[], color: string) => (
    <section className="mb-12">
      <h2 className={`text-3xl font-semibold mb-6 ${color}`}>{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition transform hover:scale-105"
          >
            <p className="text-gray-800 text-lg font-medium">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto mt-12 px-6">
        {/* Place Name and Favorite Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <h1 className="text-5xl font-extrabold text-blue-800">{place.name}</h1>
          <button
            onClick={() => addToFavorites(place)}
            className="mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition font-semibold"
          >
            ❤️ Add to Favorites
          </button>
        </div>

        {message && (
          <div className="mb-6 text-green-600 font-semibold">{message}</div>
        )}

        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-green-700 mb-4">About {place.name}</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{place.about}</p>
        </section>

        {/* Weather Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-indigo-700 mb-4">Current Weather 🌦️</h2>
          {weather && weather.current ? (
            <div className="bg-blue-50 p-6 rounded-lg shadow-md">
              <p className="text-xl text-gray-800 capitalize mb-2">
                {weather.current.weather[0].description} — {weather.current.temp}°C
              </p>
              <p className="text-gray-600">Humidity: {weather.current.humidity}%</p>
              <p className="text-gray-600">Wind Speed: {weather.current.wind_speed} m/s</p>
            </div>
          ) : (
            <p className="text-gray-500">Loading weather information...</p>
          )}
        </section>

        {/* Local Attractions */}
        {place.localAttractions && renderBlockSection("Local Attractions 🎡", place.localAttractions, "text-pink-600")}

        {/* Adventures */}
        {place.adventures && renderBlockSection("Adventures 🚀", place.adventures, "text-orange-600")}

        {/* Local Cuisines */}
        {place.localCuisines && renderBlockSection("Local Cuisines 🍴", place.localCuisines, "text-red-600")}

        {/* Shopping */}
        {place.shopping && renderBlockSection("Shopping 🛍️", place.shopping, "text-purple-600")}
      </main>
    </>
  );
}
