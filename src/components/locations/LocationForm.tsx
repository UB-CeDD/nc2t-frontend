import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CountrySelect from "@components/commons/CountrySelect.tsx";
import GPSInput from "@components/commons/GPSInput.tsx";
import { createLocationThunk, updateLocationThunk } from "@store/thunks/locationThunk";
import { useDispatch } from "react-redux";
import { Location } from "helpers/types.ts";

interface LocationFormProps {
    location?: Location;
    onSave?: (location: Location) => void;
    onCancel?: () => void;
}

const LocationForm: React.FC<LocationFormProps> = ({ location}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: location?.name || '',
        place: location?.place || '',
        city_town: location?.city_town || '',
        region_state: location?.region_state || '',
        country: location?.country || '',
        zipCode: location?.zipCode || '',
        continent: location?.continent || '',
    });

    const [loading, setLoading] = useState(false);
    const [selectedCountry,  setSelectedCountry] = useState<string>(location?.country || '');
    const [gpsCoordinates,  setGpsCoordinates] = useState<string>(
        location?.id ? `${location?.gps_latitude || ''}, ${location?.gps_longitude || ''}`.trim() : '');

    const handleCountryChange = (country: string[]) => {
        console.log(country);
        setSelectedCountry(country[0]);
    };

    const handleGpsChange = (gps: string) => {
        console.log("GPS Coordinates:", gps);
        // Assuming gps is a string in the format "latitude,longitude"
        const [latitude, longitude] = gps.split(',').map(coord => parseFloat(coord.trim()));
        if (isNaN(latitude) || isNaN(longitude)) {
            console.error("Invalid GPS coordinates:", gps);
            return;
        }
        // Update the form data with the GPS coordinates
        setFormData({
            ...formData,
            gps_latitude: latitude,
            gps_longitude: longitude,
        });
        // Set the GPS coordinates state
        setGpsCoordinates(gps);
    };

    const simulatePickFromMap = async (value): Promise<string> => {
        console.log(value)
        // Simulate picking GPS coordinates from a map
        return "12.9716, 77.5946"; // Example coordinates
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, country: selectedCountry, continent: "Africa" }); // Assuming continent is fixed for now
        console.log("Form Data:", { ...formData, [name]: value });
        
    };

    const handleSubmit = (e: React.FormEvent) => {        
        e.preventDefault();
        if (location?.id) {
            // Update existing compound
            dispatch(updateLocationThunk(formData.id, formData));
        } else {           
            // Create new compound
            dispatch(createLocationThunk(formData));
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full">
                <h1 className="text-2xl flex justify-center font-bold mb-8">{location?.id === undefined ? "Add Location" : "Edit Location"}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('location.form_fields.name')}</label>
                            <input type="text" id="location_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={t('location.form_fields.name')}
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required />
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('location.form_fields.address')}</label>
                            <input type="text" id="location_place"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={t('location.form_fields.address')}
                                name="place"
                                value={formData.place}
                                onChange={handleChange}
                                required />
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('location.form_fields.city')}</label>
                            <input type="text" id="location_city"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={t('location.form_fields.city')} 
                                name="city_town"
                                value={formData.city_town}
                                onChange={handleChange}
                                required />
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('location.form_fields.state')}</label>
                            <input type="text" id="location_state"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={t('location.form_fields.state')} 
                                name="region_state"
                                value={formData.region_state}
                                onChange={handleChange}
                                required />
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('location.form_fields.country')}</label>
                            <CountrySelect
                                selectClass="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={handleCountryChange} placeholder={t('location.form_fields.country')}
                                placeholderClass='dark:placeholder-gray-400' 
                                />
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('location.form_fields.zip_code')}</label>
                            <input type="text" id="location_zip"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={t('location.form_fields.zip_code')} 
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                required />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('location.form_fields.gps')}</label>
                        <GPSInput placeholder={t('location.form_fields.gps')}
                            value={gpsCoordinates}
                            onChange={(value) => handleGpsChange(value)}
                            onPickFromMap={(value) => simulatePickFromMap(value)} />
                    </div>
                    <button type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LocationForm;
