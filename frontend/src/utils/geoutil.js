/**
 * Calculate distance between 2 points as the crow flies (in km)
 * @param  {GeoPoint} point1
 * @param  {GeoPoint} point2
 * @return {Number}  distance in Km
 */

export const calcDistance = (point1, point2) => {
  const R = 6371; // km
  const dLat = toRad(point2.lat - point1.lat);
  const dLng = toRad(point2.lng - point1.lng);
  const lat1InRad = toRad(point1.lat);
  const lat2InRad = toRad(point2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) *
      Math.sin(dLng / 2) *
      Math.cos(lat1InRad) *
      Math.cos(lat2InRad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

// Converts numeric degrees to radians
const toRad = value => {
  return (value * Math.PI) / 180;
};
