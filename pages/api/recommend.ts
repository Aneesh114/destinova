// pages/api/recommend.ts
import { trendingPlaces } from "../../data/places";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import clientPromise from "../../lib/mongodb";
import { extractFeatures, averageVectors, cosineSimilarity } from "../../utils/featureExtractor";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const client = await clientPromise;
  const db = client.db("auth-demo");

  const favorites = await db.collection("favorites").find({ userEmail: session.user.email }).toArray();
  const favoritePlaces = favorites.map(fav => fav.place);

  if (favoritePlaces.length === 0) {
    return res.status(400).json({ message: "No favorites yet" });
  }

  const favoriteVectors = favoritePlaces.map(extractFeatures);
  const userProfileVector = averageVectors(favoriteVectors);

  const nonFavoritePlaces = trendingPlaces.filter(
    place => !favoritePlaces.some(fav => fav.name === place.name)
  );

  const scoredPlaces = nonFavoritePlaces.map((place) => {
    const vector = extractFeatures(place);
    const similarity = cosineSimilarity(userProfileVector, vector);
    return { place, similarity };
  });

  const sortedPlaces = scoredPlaces.sort((a, b) => b.similarity - a.similarity);

  const topPlaces = sortedPlaces.slice(0, 5).map(item => item.place);

  return res.status(200).json(topPlaces);
}
