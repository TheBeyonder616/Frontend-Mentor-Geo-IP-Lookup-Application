//?============================================
//?============================================
//?============================================
//!============================================[ICON MANAGER]
export const ICON = {
  DELETE: "icon-delete",
  SEARCH: "icon-search",
  ERROR: "icon-error",
  LOCATION: "icon-location",
  SPINNER: "icon-spinner",
} as const;

export type IconKeys = (typeof ICON)[keyof typeof ICON];

//?============================================
//?============================================
//?============================================
//!============================================[API - GEOLOCATION]
const API_KEY: string = import.meta.env.VITE_API_KEY;
export const API = {
  TIME_OUT: 10000,
  IP_URL: "https://api.ipify.org?format=json",
  URL(ipAddress: string): string {
    return `https://freeipapi.com/api/json/${ipAddress}`;
  },
  DOMAIN_URL(domain: string): string {
    return `https://dns.google/resolve?name=${domain}&format=json`;
  },
} as const;
//?============================================
//?============================================
//?============================================
//!============================================[Data]
export type ExtractedDataType = {
  ipAddress: string;
  cityName: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  timeZones: string[];
};

export const DEBOUNCED_SEARCH_TIMER = 500;
export type ErrorType = { error: string };

export type ListDataType = {
  "ip address": string;
  location: string;
  timeZone: string;
  isp: string;
};

//!===============================[Font End mentor]
export const FRONT_END_MENTOR_URL =
  "https://www.frontendmentor.io?ref=challenge";
export const MY_URL_Link = "https://github.com/TheBeyonder616";

//!============================[leaflet]
export const LAYER_TILE = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

// export const LAYER_TILES = [
//   {
//     name: "OpenStreetMap",
//     url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//   },
//   {
//     name: "Stamen Terrain",
//     url: "https://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.jpg",
//   },
//   {
//     name: "Stamen Toner",
//     url: "https://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png",
//   },
//   {
//     name: "CartoDB Positron",
//     url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
//   },
//   {
//     name: "CartoDB Dark Matter",
//     url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
//   },
//   {
//     name: "Esri WorldStreetMap",
//     url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
//   },
//   {
//     name: "OpenTopoMap",
//     url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
//   },
// ] as const;
