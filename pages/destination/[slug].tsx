import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { trendingPlaces } from "../../data/places";

export default function DestinationPage() {
  const router = useRouter();
  const { slug } = router.query;

  // Find the place by slug
  const place = trendingPlaces.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === slug
  );

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
        <p className="text-gray-700 text-lg">{place.description}</p>
      </main>
    </>
  );
}
