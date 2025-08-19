import React, {useState} from "react";
import LocationIcon from "@components/commons/icons/LocationIcon.tsx";
import MapComponent from "@components/commons/MapComponent.tsx";

interface GPSInputProps {
    value?: string;
    inputClass?: string;
    placeholder?: string;
    placeholderClass?: string;
    onChange: (gps: string) => void;
}

const GPSInput: React.FC<GPSInputProps> = ({value = "", inputClass, placeholder = "Enter GPS coordinates", onChange}) => {

    const [gps, setGps] = useState(value);
    const [showMap, setShowMap] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setGps(newValue);
        onChange(newValue);
    };

    const handlePickFromMap = async () => {
        setShowMap(true); // Show the map
    };

    const handleMapClose = () => {
        setShowMap(false); // Hide the map
    };

    return (
        <div className="relative flex items-center">
            <input
                type="text"
                value={gps}
                onChange={handleInputChange}
                placeholder={placeholder}
                className={inputClass ?? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-s-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
            />

            <button type="button" id="gps-button" onClick={handlePickFromMap}
                    className="inline-flex items-center bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 text-sm dark:text-white focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                <LocationIcon/>
            </button>
            {showMap && (
                <div className="absolute top-0 left-0 w-full h-full bg-white z-50">
                    <MapComponent
                        service="openstreetmap"
                        center={{lat: 37.7749, lng: -122.4194}}
                        zoom={10}
                        className="w-full h-full"
                    />
                    <button
                        onClick={handleMapClose}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded"
                    >
                        Close Map
                    </button>
                </div>
            )}
        </div>
    );
};

export default GPSInput;