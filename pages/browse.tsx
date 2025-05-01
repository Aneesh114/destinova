// import Link from "next/link";
// import Navbar from "../components/Navbar";
// import { trendingPlaces } from "../data/places";
// import { useSession } from "next-auth/react";



// export default function Browse() {
//   const { data: session } = useSession();

//   const addToFavorites = async (place) => {
//     const res = await fetch("/api/favorites", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ place }),
//     });

//     if (res.ok) {
//       alert(`${place.name} added to your favorites`);
//     } else {
//       alert("Please sign in to favorite places.");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <main className="max-w-6xl mx-auto mt-12 px-4">
//         <h2 className="text-3xl font-bold text-gray-800 mb-8">Trending Tourist Places</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {trendingPlaces.map((place) => (
//             <div key={place.id} className="bg-white shadow-md p-6 rounded-lg relative">
//               <h3 className="text-xl mt-8 font-semibold text-blue-700">{place.name}</h3>
//               <p className="text-gray-600 mt-2 mb-4">{place.description}</p>
//               <button
//                 onClick={() => addToFavorites(place)}
//                 className="absolute top-3 right-3 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded"
//               >
//                 ❤️ Favorite
//               </button>
//               <Link href={`/destination/${place.name.toLowerCase().replace(/\s+/g, "-")}`} key={place.id}>
//                 <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition cursor-pointer">
//                   <h3 className="text-xl font-semibold text-blue-700">{place.name}</h3>
//                   <p className="text-gray-600 mt-2">Click here to know more</p>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </main>
//     </>
//   );
// }

// import Link from "next/link";
// import Navbar from "../components/Navbar";
// import { trendingPlaces } from "../data/places";
// import { useSession } from "next-auth/react";
// import { useMemo, useState } from "react";

// export default function Browse() {
//   const { data: session } = useSession();
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);

//   // Grouping logic simplified: Common Categories only
//   const broadClimateCategories = ["Desert", "Alpine", "Tropical", "Temperate", "Coastal"];
//   const broadActivityCategories = ["Adventure Sports", "Hiking & Camping", "Water Activities"];
//   const broadLandscapeCategories = ["Mountains", "Beaches", "Lakes", "Deserts"];

//   const addToFavorites = async (place: any) => {
//     const res = await fetch("/api/favorites", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ place }),
//     });

//     if (res.ok) {
//       alert(`${place.name} added to your favorites`);
//     } else {
//       alert("Please sign in to favorite places.");
//     }
//   };

//   const mapClimate = (place: any) => {
//     if (place.climate.includes("Desert")) return "Desert";
//     if (place.climate.includes("Alpine")) return "Alpine";
//     if (place.climate.includes("Tropical")) return "Tropical";
//     if (place.climate.includes("Temperate")) return "Temperate";
//     if (place.climate.includes("Coastal") || place.climate.includes("Mediterranean")) return "Coastal";
//     return null;
//   };

//   const mapActivity = (place: any) => {
//     if (place.activities.some((a: string) => ["Surfing", "Boating", "Snorkeling", "Kayaking"].includes(a)))
//       return "Water Activities";
//     if (place.activities.some((a: string) => ["Hiking", "Camping", "Wildlife Watching"].includes(a)))
//       return "Hiking & Camping";
//     if (place.activities.some((a: string) => ["Skiing", "Jeep Tours", "Scenic Drives", "Rafting"].includes(a)))
//       return "Adventure Sports";
//     return null;
//   };

//   const mapLandscape = (place: any) => {
//     if (place.landscape.includes("Mountains")) return "Mountains";
//     if (place.landscape.includes("Beach")) return "Beaches";
//     if (place.landscape.includes("Lake")) return "Lakes";
//     if (place.landscape.includes("Desert") || place.landscape.includes("Canyon")) return "Deserts";
//     return null;
//   };

//   const categoryMappings = useMemo(() => {
//     const categories = new Map<string, any[]>();
//     trendingPlaces.forEach((place) => {
//       const climate = mapClimate(place);
//       const activity = mapActivity(place);
//       const landscape = mapLandscape(place);

//       [climate, activity, landscape].forEach((cat) => {
//         if (cat) {
//           if (!categories.has(cat)) categories.set(cat, []);
//           categories.get(cat)?.push(place);
//         }
//       });
//     });
//     return categories;
//   }, []);

//   const renderCategorySlider = (title: string, categories: string[], color: string) => (
//     <section className="mb-20">
//       <h2 className={`text-4xl font-bold ${color} mb-8`}>{title}</h2>
//       <div className="flex overflow-x-auto space-x-6 pb-4 no-scrollbar">
//         {categories.map((category) => (
//           <div
//             key={category}
//             className="min-w-[130px] min-h-[130px] flex items-center justify-center rounded-full bg-gradient-to-tr from-white to-gray-50 border-2 border-gray-300 hover:border-blue-400 shadow-md text-center cursor-pointer transition hover:shadow-lg"
//             onClick={() => setActiveCategory(category === activeCategory ? null : category)}
//           >
//             <span className="text-md font-semibold text-gray-800 px-2">{category}</span>
//           </div>
//         ))}
//       </div>

//       {/* Expand selected category */}
//       {activeCategory && categories.includes(activeCategory) && categoryMappings.has(activeCategory) && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
//           {categoryMappings.get(activeCategory)?.map((place) => (
//             <div key={place.id} className="relative bg-white rounded-lg shadow-md hover:shadow-xl p-5 transition">
//               <button
//                 onClick={() => addToFavorites(place)}
//                 className="absolute top-3 right-3 bg-red-100 hover:bg-red-200 text-red-600 px-2 py-1 rounded text-xs"
//               >
//                 ❤️
//               </button>
//               <Link href={`/destination/${place.name.toLowerCase().replace(/\s+/g, "-")}`}>
//                 <div className="cursor-pointer">
//                   <h3 className="text-xl font-bold text-green-700">{place.name}</h3>
//                   <p className="text-gray-600 mt-2">{place.description.slice(0, 80)}...</p>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );

//   return (
//     <>
//       <Navbar />
//       <main className="max-w-7xl mx-auto mt-12 px-6">
//         {/* Trending */}
//         <section className="mb-20">
//           <h2 className="text-4xl font-bold text-blue-800 mb-8">Trending Tourist Places ⭐</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             {trendingPlaces.map((place) => (
//               <div key={place.id} className="bg-white shadow-md p-5 rounded-lg relative hover:shadow-lg transition">
//                 <button
//                   onClick={() => addToFavorites(place)}
//                   className="absolute top-3 right-3 bg-red-100 hover:bg-red-200 text-red-600 px-2 py-1 rounded text-xs"
//                 >
//                   ❤️
//                 </button>
//                 <Link href={`/destination/${place.name.toLowerCase().replace(/\s+/g, "-")}`}>
//                   <div className="cursor-pointer">
//                     <h3 className="text-2xl font-semibold text-green-700">{place.name}</h3>
//                     <p className="text-gray-600 mt-2">{place.description.slice(0, 80)}...</p>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Browse by Climate */}
//         {renderCategorySlider("Browse by Climate ☀️❄️🏝️", broadClimateCategories, "text-yellow-600")}

//         {/* Browse by Activities */}
//         {renderCategorySlider("Browse by Activities 🏕️🏄🚵", broadActivityCategories, "text-green-600")}

//         {/* Browse by Landscapes */}
//         {renderCategorySlider("Browse by Landscapes 🏔️🏖️🏜️", broadLandscapeCategories, "text-purple-600")}
//       </main>
//     </>
//   );
// }
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

import Link from "next/link";
import Navbar from "../components/Navbar";
import { trendingPlaces } from "../data/places";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

export default function Browse() {
  const { data: session } = useSession();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const TRENDING_LIMIT = 8; // Limit trending places to the latest 8

  // Take latest added trending places
  const latestTrendingPlaces = useMemo(() => {
    return trendingPlaces.slice(-TRENDING_LIMIT).reverse();
  }, []);

  // Broad categories
  const broadClimateCategories = ["Desert", "Alpine", "Tropical", "Temperate", "Coastal"];
  const broadActivityCategories = ["Adventure Sports", "Hiking & Camping", "Water Activities"];
  const broadLandscapeCategories = ["Mountains", "Beaches", "Lakes", "Deserts"];

  // Mapping function for multiple category matching
  const mapCategories = (place: any) => {
    const categories: string[] = [];

    // Climate
    if (place.climate.includes("Desert")) categories.push("Desert");
    if (place.climate.includes("Alpine")) categories.push("Alpine");
    if (place.climate.includes("Tropical")) categories.push("Tropical");
    if (place.climate.includes("Temperate")) categories.push("Temperate");
    if (place.climate.includes("Coastal") || place.climate.includes("Mediterranean")) categories.push("Coastal");

    // Landscape
    if (place.landscape.includes("Mountains")) categories.push("Mountains");
    if (place.landscape.includes("Beach")) categories.push("Beaches");
    if (place.landscape.includes("Lake")) categories.push("Lakes");
    if (place.landscape.includes("Desert") || place.landscape.includes("Canyon")) categories.push("Deserts");

    // Activities
    if (place.activities.some((a: string) => ["Surfing", "Boating", "Snorkeling", "Kayaking"].includes(a)))
      categories.push("Water Activities");
    if (place.activities.some((a: string) => ["Hiking", "Camping", "Wildlife Watching"].includes(a)))
      categories.push("Hiking & Camping");
    if (place.activities.some((a: string) => ["Skiing", "Jeep Tours", "Scenic Drives", "Rafting"].includes(a)))
      categories.push("Adventure Sports");

    return categories;
  };

  // Now allow a place to be part of multiple categories
  const categoryMappings = useMemo(() => {
    const map = new Map<string, any[]>();
    trendingPlaces.forEach((place) => {
      const placeCategories = mapCategories(place);
      placeCategories.forEach((category) => {
        if (!map.has(category)) map.set(category, []);
        map.get(category)?.push(place);
      });
    });
    return map;
  }, []);

  const addToFavorites = async (place: any) => {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ place }),
    });

    if (res.ok) {
      alert(`${place.name} added to your favorites`);
    } else {
      alert("Please sign in to favorite places.");
    }
  };

  const renderCategorySlider = (title: string, categories: string[], color: string) => (
    <section className="mb-20">
      <h2 className={`text-4xl font-bold ${color} mb-8`}>{title}</h2>
      <div className="flex overflow-x-auto space-x-6 pb-4 no-scrollbar">
        {categories.map((category) => (
          <div
            key={category}
            className="min-w-[130px] min-h-[130px] flex items-center justify-center rounded-full bg-gradient-to-tr from-white to-gray-50 border-2 border-gray-300 hover:border-blue-400 shadow-md text-center cursor-pointer transition hover:shadow-lg"
            onClick={() => setActiveCategory(category === activeCategory ? null : category)}
          >
            <span className="text-md font-semibold text-gray-800 px-2">{category}</span>
          </div>
        ))}
      </div>

      {/* Expand selected category */}
      {activeCategory && categories.includes(activeCategory) && categoryMappings.has(activeCategory) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {categoryMappings.get(activeCategory)?.map((place) => (
            <div key={`${place.id}-${activeCategory}`} className="relative bg-white rounded-lg shadow-md hover:shadow-xl p-5 transition">
              <button
                onClick={() => addToFavorites(place)}
                className="absolute top-3 right-3 bg-red-100 hover:bg-red-200 text-red-600 px-2 py-1 rounded text-xs"
              >
                ❤️
              </button>
              <Link href={`/destination/${place.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="cursor-pointer">
                  <h3 className="text-xl font-bold text-green-700">{place.name}</h3>
                  <p className="text-gray-600 mt-2">{place.description.slice(0, 80)}...</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto mt-12 px-6">
        {/* Trending Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-blue-800 mb-8">Trending Tourist Places ⭐</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {latestTrendingPlaces.map((place) => (
              <div key={place.id} className="bg-white shadow-md p-5 rounded-lg relative hover:shadow-lg transition">
                <button
                  onClick={() => addToFavorites(place)}
                  className="absolute top-3 right-3 bg-red-100 hover:bg-red-200 text-red-600 px-2 py-1 rounded text-xs"
                >
                  ❤️
                </button>
                <Link href={`/destination/${place.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  <div className="cursor-pointer">
                    <h3 className="text-2xl font-semibold text-green-700">{place.name}</h3>
                    <p className="text-gray-600 mt-2">{place.description.slice(0, 80)}...</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Browse Sections */}
        {renderCategorySlider("Browse by Climate ☀️❄️🏝️", broadClimateCategories, "text-yellow-600")}
        {renderCategorySlider("Browse by Activities 🏕️🏄🚵", broadActivityCategories, "text-green-600")}
        {renderCategorySlider("Browse by Landscapes 🏔️🏖️🏜️", broadLandscapeCategories, "text-purple-600")}
      </main>
    </>
  );
}
