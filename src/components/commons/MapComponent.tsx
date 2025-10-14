import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default icon issue with webpack
// @ts-ignore
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface Location {
  latitude: number;
  longitude: number;
  popupText: string;
}

interface MapComponentProps {
  locations: Location[];
  className?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  locations,
  className,
}) => {
  const africaCenter: [number, number] = [5.65, 26.17]; // Center of Africa

  return (
    <MapContainer
      center={africaCenter}
      zoom={4} // Zoom level to show Africa
      className={className ?? "w-full h-full"}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((loc, index) => (
        <Marker key={index} position={[loc.latitude, loc.longitude]}>
          <Popup>{loc.popupText}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
