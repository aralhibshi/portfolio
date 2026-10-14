// Math mirrored from cobe's own marker projection (globe radius 0.8, scale 1, no offset) so HTML
// overlays line up exactly with the WebGL globe.

const { PI, sin, cos } = Math;
const GLOBE_RADIUS = 0.8;

export type LatLng = readonly [lat: number, lng: number];

function toCartesian([lat, lng]: LatLng): [number, number, number] {
  const latRad = (lat * PI) / 180;
  const lngRad = (lng * PI) / 180 - PI;
  const r = cos(latRad);
  return [-r * cos(lngRad), sin(latRad), r * sin(lngRad)];
}

/** Camera angles that put a location dead centre. */
export function anglesFor([lat, lng]: LatLng) {
  return { phi: PI - ((lng * PI) / 180 - PI / 2), theta: (lat * PI) / 180 };
}

/** Screen position as fractions of the canvas (0–1), and whether the point faces the viewer. */
export function project(location: LatLng, phi: number, theta: number, elevation = 0) {
  const [cx, cy, cz] = toCartesian(location);
  const radius = GLOBE_RADIUS + elevation;
  const [x, y, z] = [cx * radius, cy * radius, cz * radius];
  const cosT = cos(theta);
  const sinT = sin(theta);
  const cosP = cos(phi);
  const sinP = sin(phi);
  const screenX = cosP * x + sinP * z;
  const screenY = sinP * sinT * x + cosT * y - cosP * sinT * z;
  const depth = -sinP * cosT * x + sinT * y + cosP * cosT * z;
  return { x: (screenX + 1) / 2, y: (1 - screenY) / 2, visible: depth >= 0 };
}

/** Shortest signed distance between two angles, so the globe never spins the long way round. */
export function angleDelta(from: number, to: number) {
  return ((((to - from) % (2 * PI)) + 3 * PI) % (2 * PI)) - PI;
}
