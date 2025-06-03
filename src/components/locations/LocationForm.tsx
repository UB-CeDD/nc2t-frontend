import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import CountrySelect from "@components/commons/CountrySelect.tsx";
import GPSInput from "@components/commons/GPSInput.tsx";

interface Location {
    id: number;
    name: string;
    address: string;
    gpsCoordinates: string;
}

interface LocationFormProps {
    location: Location;
    onSave: (location: Location) => void;
    onCancel: () => void;
}

const LocationForm: React.FC<LocationFormProps> = ({location, onSave, onCancel}) => {
    const {t} = useTranslation();

    const [loading, setLoading] = useState(false);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

    const handleCountryChange = (countries: string[]) => {
        setSelectedCountries(countries);
    };

    const handleGpsChange = (gps: string) => {
        console.log("GPS Coordinates:", gps);
    };

    const simulatePickFromMap = async (value): Promise<string> => {
        console.log(value)
        // Simulate picking GPS coordinates from a map
        return "12.9716, 77.5946"; // Example coordinates
    };

    const handleSaveLocation = (e) => {
        e.preventDefault();
        console.log(e.target);
        setLoading(true);
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full">
                <h1 className="text-2xl flex justify-center font-bold mb-8">{location.id === 0 ? "Add Location" : "Edit Location"}</h1>
                <form onSubmit={handleSaveLocation}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('location.form_fields.name')}</label>
                            <input type="text" id="location_name"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder={t('location.form_fields.name')} required/>
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('location.form_fields.address')}</label>
                            <input type="text" id="location_address"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder={t('location.form_fields.address')} required/>
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('location.form_fields.city')}</label>
                            <input type="text" id="location_city"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder={t('location.form_fields.city')} required/>
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('location.form_fields.state')}</label>
                            <input type="text" id="location_state"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder={t('location.form_fields.state')} required/>
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('location.form_fields.country')}</label>
                            <CountrySelect
                                selectClass="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={handleCountryChange} placeholder={t('location.form_fields.country')}
                                placeholderClass='dark:placeholder-gray-400 '/>
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('location.form_fields.zip_code')}</label>
                            <input type="text" id="location_zip"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder={t('location.form_fields.zip_code')} required/>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('location.form_fields.gps')}</label>
                        <GPSInput placeholder={t('location.form_fields.gps')}
                                  onChange={(value) => handleGpsChange(value)}
                                  onPickFromMap={(value) => simulatePickFromMap(value)}/>
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
