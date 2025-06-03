import React, { useState } from "react";
import LocationForm from "@components/locations/LocationForm.tsx";
import AdminLayout from "@components/layouts/AdminLayout.tsx";

interface Location {
    id: number;
    name: string;
    address: string;
    gpsCoordinates: string;
}

const LocationManager: React.FC = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

    const handleAddLocation = () => {
        setCurrentLocation({ id: 0, name: "", address: "", gpsCoordinates: "" });
        setIsEditing(true);
    };

    const handleEditLocation = (location: Location) => {
        setCurrentLocation(location);
        setIsEditing(true);
    };

    const handleSaveLocation = (location: Location) => {
        if (location.id === 0) {
            location.id = locations.length + 1;
            setLocations([...locations, location]);
        } else {
            setLocations(
                locations.map((loc) => (loc.id === location.id ? location : loc))
            );
        }
        setIsEditing(false);
        setCurrentLocation(null);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentLocation(null);
    };

    return (
        <AdminLayout>
            <div>
                {!isEditing ? (
                    <>
                        <h1>Locations</h1>
                        <table>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>GPS Coordinates</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {locations.map((location) => (
                                <tr key={location.id}>
                                    <td>{location.name}</td>
                                    <td>{location.address}</td>
                                    <td>{location.gpsCoordinates}</td>
                                    <td>
                                        <button onClick={() => handleEditLocation(location)}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <button onClick={handleAddLocation}>Add Location</button>
                    </>
                ) : (
                    <LocationForm
                        location={currentLocation!}
                        onSave={handleSaveLocation}
                        onCancel={handleCancel}
                    />
                )}
            </div>
        </AdminLayout>
    );
};

export default LocationManager;
