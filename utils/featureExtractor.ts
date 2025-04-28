// utils/featureExtractor.ts

const cultureMap = {
    "Native American Heritage": [1, 0, 0, 0, 0, 0],
    "Native American Influence": [1, 0, 0, 0, 0, 0],
    "Outdoor Recreation Culture": [0, 1, 0, 0, 0, 0],
    "Tourist & Colonial History": [0, 0, 1, 0, 0, 0],
    "American History": [0, 0, 1, 0, 0, 0],
    "Hawaiian": [0, 0, 0, 1, 0, 0],
    "Ancient Native American": [1, 0, 0, 0, 0, 0],
    "Conservation History": [0, 0, 0, 0, 1, 0],
    "Miccosukee & Seminole": [0, 0, 0, 0, 1, 0],
    "Timbisha Shoshone Tribe": [0, 0, 0, 0, 1, 0],
  };
  
  const climateMap = {
    "Desert": [1, 0, 0, 0, 0],
    "Alpine": [0, 1, 0, 0, 0],
    "Temperate": [0, 0, 1, 0, 0],
    "Tropical": [0, 0, 0, 1, 0],
    "Cold Desert": [1, 0, 0, 0, 0],
    "Mediterranean": [0, 0, 0, 0, 1],
  };
  
  const landscapeMap = {
    "Canyon": [1, 0, 0, 0, 0, 0, 0],
    "Mountains": [0, 1, 0, 0, 0, 0, 0],
    "Beach": [0, 0, 1, 0, 0, 0, 0],
    "Lake": [0, 0, 0, 1, 0, 0, 0],
    "Desert": [0, 0, 0, 0, 1, 0, 0],
    "Waterfall": [0, 0, 0, 0, 0, 1, 0],
    "Wetlands": [0, 0, 0, 0, 0, 0, 1],
  };
  
  const activityList = [
    "Hiking",
    "Rafting",
    "Photography",
    "Climbing",
    "Camping",
    "Skiing",
    "Boating",
    "Surfing",
    "Sunbathing",
    "Shopping",
    "Sightseeing",
    "Wildlife Watching",
    "Jeep Tours",
    "Spiritual Retreats",
    "Stargazing",
    "Scenic Drives",
    "Airboat Tours",
  ];
  
  export function extractFeatures(place: any) {
    const culture = cultureMap[place.culture] || [0, 0, 0, 0, 0, 0];
    const climate = climateMap[place.climate] || [0, 0, 0, 0, 0];
    const landscape = landscapeMap[place.landscape] || [0, 0, 0, 0, 0, 0, 0];
  
    const budget = place.budget === "Low" ? [0] : place.budget === "Medium" ? [1] : [2];
  
    const activities = activityList.map((act) => (
        place.activities && place.activities.includes(act) ? 1 : 0
      ));
      
  
    return [...culture, ...climate, ...landscape, ...budget, ...activities];
  }
  
  export function averageVectors(vectors: number[][]) {
    const avg = vectors[0].map((_, idx) =>
      vectors.reduce((sum, vec) => sum + vec[idx], 0) / vectors.length
    );
    return avg;
  }
  
  export function cosineSimilarity(vec1: number[], vec2: number[]) {
    const dotProduct = vec1.reduce((acc, v, idx) => acc + v * vec2[idx], 0);
    const magnitude1 = Math.sqrt(vec1.reduce((acc, v) => acc + v * v, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((acc, v) => acc + v * v, 0));
    if (magnitude1 === 0 || magnitude2 === 0) return 0;
    return dotProduct / (magnitude1 * magnitude2);
  }
  