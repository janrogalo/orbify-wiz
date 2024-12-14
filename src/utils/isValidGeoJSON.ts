export const isValidGeoJSON = (data): boolean => {
  if (typeof data !== "object" || data === null) return false;

  const validTypes = new Set(["Feature", "FeatureCollection", "Geometry"]);

  if (!data.type || !validTypes.has(data.type)) {
    return false;
  }
  if (data.type === "FeatureCollection" && !Array.isArray(data.features)) {
    return false;
  }
  if (data.type === "Feature" && !data.geometry) {
    return false;
  }
  if (data.type === "Geometry" && (!data.coordinates || !data.type)) {
    return false;
  }
  return true;
};
