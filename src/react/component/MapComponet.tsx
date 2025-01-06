import { FC, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LAYER_TILE, ICON } from "../config/config";
import Svg from "./Svg";
import { renderToStaticMarkup } from "react-dom/server";

interface MapComponentProps {
  lat: number;
  lng: number;
}

const MapComponent: FC<MapComponentProps> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([lat, lng], 13);
      L.tileLayer(LAYER_TILE).addTo(mapInstanceRef.current);

      const customMarkerIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="transform:translate(-50%, -50%;)">
        ${renderToStaticMarkup(
          <Svg
            id={ICON.LOCATION}
            alt={"Icon Location Marker"}
            className={"marker"}
          />
        )}
        </div>`,
      });

      markerRef.current = L.marker([lat, lng], { icon: customMarkerIcon })
        .addTo(mapInstanceRef.current)
        .openPopup();
      return;
    }

    mapInstanceRef.current.setView([lat, lng], 13);
    if (markerRef.current) markerRef.current.setLatLng([lat, lng]).openPopup();

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, [lat, lng]);

  return (
    <section className="map-address">
      <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
    </section>
  );
};

export default MapComponent;
