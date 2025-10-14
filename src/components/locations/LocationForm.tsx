import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CountrySelect from "@components/commons/CountrySelect.tsx";
import GPSInput from "@components/commons/GPSInput.tsx";
import {
  createLocationThunk,
  updateLocationThunk,
} from "@store/thunks/locationThunk";
import { useDispatch, useSelector } from "react-redux";
import { Location } from "@/helpers/types.ts";
import { useNotification } from "@/components/commons/NotificationContext.tsx";
import Spinner from "@/components/commons/Spinner.tsx";
import { RootState } from "@/store/store.ts";

interface LocationFormProps {
  location?: Location;
  onSave?: (location: Location) => void;
  onCancel?: () => void;
  onLocationCreated?: (location: Location) => void;
}

const LocationForm: React.FC<LocationFormProps> = ({
  location,
  onSave,
  onCancel,
  onLocationCreated,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { addNotification } = useNotification();
  const { loading } = useSelector((state: RootState) => state.getLocations);
  const [formData, setFormData] = useState<Location>({
    id: location?.id || undefined,
    name: location?.name || "",
    // place: location?.place || '',
    city_town: location?.city_town || "",
    // region_state: location?.region_state || '',
    country: location?.country || "",
    // zipCode: location?.zipCode || '',
    continent: location?.continent || "",
    gps_latitude: location?.gps_latitude || 0,
    gps_longitude: location?.gps_longitude || 0,
  });

  const handleCountryChange = (country: string) => {
    setFormData({ ...formData, country: country });
  };

  const handleGpsChange = (gps: string) => {
    const [latitude, longitude] = gps
      .split(",")
      .map((coord) => parseFloat(coord.trim()));
    if (!isNaN(latitude) && !isNaN(longitude)) {
      setFormData({
        ...formData,
        gps_latitude: latitude,
        gps_longitude: longitude,
      });
    }
  };

  const simulatePickFromMap = async (): Promise<string> => {
    // Simulate picking GPS coordinates from a map
    return "12.9716, 77.5946"; // Example coordinates
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (location?.id) {
        const updatedLocation = await dispatch(
          updateLocationThunk(location.id, formData),
        );
        onSave?.(updatedLocation);
        addNotification("Location updated successfully", "success");
      } else {
        const newLocation = await dispatch(createLocationThunk(formData));
        if (newLocation) {
          onLocationCreated?.(newLocation);
          setFormData({
            id: undefined,
            name: "",
            // place: '',
            city_town: "",
            // region_state: '',
            country: "",
            // zipCode: '',
            continent: "",
            gps_latitude: 0,
            gps_longitude: 0,
          });
        }
        addNotification("Location created successfully", "success");
      }
    } catch (error) {
      addNotification("Failed to save location", "error");
      console.error("Failed to save location:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full">
        <h1 className="text-2xl flex justify-center font-bold mb-8">
          {location?.id ? "Edit Location" : "Add Location"}
        </h1>
        <form onSubmit={handleSubmit}>
          {/* ... form fields ... */}
          <div className="grid gap-6 mb-4 md:grid-cols-1">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                {t("location.form_fields.name")}
              </label>
              <input
                type="text"
                id="location_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={t("location.form_fields.name")}
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            {/* <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('location.form_fields.address')}</label>
                            <input type="text" id="location_place"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={t('location.form_fields.address')}
                                name="place"
                                value={formData.place}
                                onChange={handleChange}
                                required />
                        </div> */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                {t("location.form_fields.city")}
              </label>
              <input
                type="text"
                id="location_city"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={t("location.form_fields.city")}
                name="city_town"
                value={formData.city_town}
                onChange={handleChange}
                required
              />
            </div>
            {/* <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('location.form_fields.state')}</label>
                            <input type="text" id="location_state"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={t('location.form_fields.state')} 
                                name="region_state"
                                value={formData.region_state}
                                onChange={handleChange}
                                required />
                        </div> */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                {t("location.form_fields.country")}
              </label>
              <CountrySelect
                selectClass="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formData.country}
                onChange={handleCountryChange}
                placeholder={t("location.form_fields.country")}
                placeholderClass="dark:placeholder-gray-400"
              />
            </div>
            {/* <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('location.form_fields.zip_code')}</label>
                            <input type="text" id="location_zip"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={t('location.form_fields.zip_code')} 
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                required />
                        </div> */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                {t("location.form_fields.gps")}
              </label>
              <GPSInput
                placeholder={t("location.form_fields.gps")}
                value={`${formData.gps_latitude}, ${formData.gps_longitude}`}
                onChange={handleGpsChange}
                onPickFromMap={simulatePickFromMap}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
            disabled={loading}
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={loading}
          >
            {loading ? <Spinner size={5} /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LocationForm;
