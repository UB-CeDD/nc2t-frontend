import React from "react";
// import GoogleMapReact from "google-map-react";
// import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
// import "leaflet/dist/leaflet.css";

interface MapComponentProps {
    service: "google" | "mapbox" | "openstreetmap";
    center: { lat: number; lng: number };
    zoom: number;
    className?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({service, center, zoom, className}) => {
    // const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const mapboxApiKey = process.env.REACT_APP_MAPBOX_API_KEY;

    // if (service === "google") {
    //     if (!googleApiKey) {
    //         console.error("Google Maps API key is missing in the .env file.");
    //         return <div>Error: Google Maps API key is missing.</div>;
    //     }
    //
    //     return (
    //         <div className={className ?? "w-full h-full"}>
    //             <GoogleMapReact
    //                 bootstrapURLKeys={{key: googleApiKey}}
    //                 defaultCenter={center}
    //                 defaultZoom={zoom}
    //             />
    //         </div>
    //     );
    // }

    if (service === "mapbox") {
        if (!mapboxApiKey) {
            console.error("Mapbox API key is missing in the .env file.");
            return <div>Error: Mapbox API key is missing.</div>;
        }

        return (
            <div className={className ?? "w-full h-full"}>
                <div
                    id="map"
                    style={{height: "100%", width: "100%"}}
                >
                    {/* Mapbox map initialization logic */}
                </div>
            </div>
        );
    }

    // if (service === "openstreetmap") {
    //     return (
    //         <MapContainer
    //             center={[center.lat, center.lng]}
    //             zoom={zoom}
    //             className={className ?? "w-full h-full"}
    //             style={{height: "100%", width: "100%"}}
    //         >
    //             <TileLayer
    //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //             />
    //             <Marker position={[center.lat, center.lng]}>
    //                 <Popup>
    //                     A pretty popup. <br/> Easily customizable.
    //                 </Popup>
    //             </Marker>
    //         </MapContainer>
    //     );
    // }

    return <div>Error: Unsupported map service.</div>;
};

export default MapComponent;