import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveSingleSpeciesThunk,
  updateSpeciesThunk,
} from "@/store/thunks/speciesThunk";
import { RootState } from "@/store/store";
import { Compound, Reference, Species, Location } from "@/helpers/types";
import Modal from "@components/commons/Modal";
import AdminLayout from "@components/layouts/AdminLayout";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "@/store/store";

const SpeciesDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const { currentSpecies, loading, error } = useSelector(
    (state: RootState) => state.getSpecies,
  );
  // Add notification handler
  const addNotification = useCallback(
    (message: string, type: "success" | "warning" | "error") => {
      // You can implement your notification logic here, e.g. using a toast library
      // For now, just log to console
      console.log(`[${type}] ${message}`);
    },
    [],
  );

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Species>>({});
  useEffect(() => {
    if (id) {
      dispatch(retrieveSingleSpeciesThunk(id, addNotification));
    }
  }, [dispatch, id, addNotification]);

  useEffect(() => {
    if (currentSpecies) {
      setFormData(currentSpecies);
    }
  }, [currentSpecies]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (id && formData) {
      dispatch(updateSpeciesThunk(id, formData, addNotification));
      setIsEditing(false);
    }
  };

  if (!currentSpecies) {
    return <div>Species not found.</div>;
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{currentSpecies.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-8 rounded shadow-md w-full block items-center">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {isEditing ? "Cancel" : "Edit"}
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="bg-blue-500">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0l-9.192 9.192a2 2 0 00-.497.879l-1.414 5.657a1 1 0 001.212 1.212l5.657-1.414a2 2 0 00.879-.497l9.192-9.192a2 2 0 000-2.828l-3.01-3.01zm-2.828 1.414l3.01 3.01-9.192 9.192-3.01-3.01 9.192-9.192z" />
                            </svg> */}
            </button>
          </div>
          <div className="grid grid-cols-5 gap-2 items-center">
            <label className="text-sm font-medium text-gray-700 min-w-fit col-span-1">
              Recent Name:
            </label>
            <div className="col-span-4">
              {isEditing ? (
                <input
                  type="text"
                  name="recent_name"
                  value={formData.recent_name || ""}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              ) : (
                <b className="flex-1">{currentSpecies.recent_name}</b>
              )}
            </div>
          </div>
          <div className="grid grid-cols-5 mt-2 gap-2 items-center">
            <label className="text-sm font-medium text-gray-700 min-w-fit col-span-1">
              Kingdom:
            </label>
            <div className="col-span-4">
              {isEditing ? (
                <input
                  type="text"
                  name="kingdom"
                  value={formData.kingdom || ""}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              ) : (
                <b className="flex-1">{currentSpecies.kingdom}</b>
              )}
            </div>
          </div>
          <div className="grid grid-cols-5 mt-2 gap-2 items-center">
            <label className="text-sm font-medium text-gray-700 min-w-fit col-span-1">
              Family:
            </label>
            <div className="col-span-4">
              {isEditing ? (
                <input
                  type="text"
                  name="family"
                  value={formData.family || ""}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              ) : (
                <b className="flex-1">{currentSpecies.family}</b>
              )}
            </div>
          </div>
          <div className="grid grid-cols-5 mt-2 gap-2 items-center">
            <label className="text-sm font-medium text-gray-700 min-w-fit col-span-1">
              Traditional Uses:
            </label>
            <div className="col-span-4">
              {isEditing ? (
                <textarea
                  name="trad_uses"
                  value={formData.trad_uses || ""}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              ) : (
                <b>{currentSpecies.trad_uses}</b>
              )}
            </div>
          </div>
          <div className="grid grid-cols-5 mt-2 gap-2 items-center">
            <label className="text-sm font-medium text-gray-700 min-w-fit col-span-1">
              Part Used:
            </label>
            <div className="col-span-4">
              {isEditing ? (
                <input
                  type="text"
                  name="part_used"
                  value={formData.part_used || ""}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              ) : (
                <b className="flex-1">{currentSpecies.part_used}</b>
              )}
            </div>
          </div>
          <div className="grid grid-cols-5 mt-2 gap-2 items-center">
            <label className="text-sm font-medium text-gray-700 min-w-fit col-span-1">
              Administration:
            </label>
            <div className="col-span-4">
              {isEditing ? (
                <textarea
                  name="administration"
                  value={formData.administration || ""}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              ) : (
                <b>{currentSpecies.administration}</b>
              )}
            </div>
          </div>
          <div className="grid grid-cols-5 mt-2 gap-2 items-center">
            <label className="text-sm font-medium text-gray-700 min-w-fit col-span-1">
              Effects:
            </label>
            <div className="col-span-4">
              {isEditing ? (
                <textarea
                  name="effects"
                  value={formData.effects || ""}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              ) : (
                <b>{currentSpecies.effects}</b>
              )}
            </div>
          </div>
          <div className="grid grid-cols-5 mt-2 gap-2 items-center">
            <label className="text-sm font-medium text-gray-700 min-w-fit col-span-1">
              Notes:
            </label>
            <div className="col-span-4">
              {isEditing ? (
                <textarea
                  name="notes"
                  value={formData.notes || ""}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              ) : (
                <b>{currentSpecies.notes}</b>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded shadow-md w-full items-center gap-2">
          <div className="flex justify-between items-center mb-6 w-full">
            <h2 className="text-xl font-bold">Compounds</h2>

            <b>{currentSpecies?.compounds?.length}</b>
          </div>
          {currentSpecies?.compounds && currentSpecies.compounds.length > 0 ? (
            <ul className="">
              {currentSpecies.compounds.map((compound) => (
                <li
                  key={compound.id}
                  className="rounded text-left hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedCompound(compound)}
                >
                  <span className="font-normal">{compound.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No compounds associated with this species.</p>
          )}

          {/* Compound details modal */}
          {selectedCompound && (
            <Modal show={true} onClose={() => setSelectedCompound(null)}>
              <div className="p-8 text-left bg-white rounded shadow-md">
                <h2 className="text-xl font-bold mb-2">
                  {selectedCompound.name}
                </h2>
                <p>
                  <b>Class:</b> {selectedCompound.compound_class}
                </p>
                <p>
                  <b>Subclass:</b> {selectedCompound.subclass}
                </p>
                <p>
                  <b>SMILES:</b> {selectedCompound.smiles}
                </p>
                <p>
                  <b>Other Names:</b> {selectedCompound.other_names}
                </p>
                <p>
                  <b>Pubchem ID:</b> {selectedCompound.pubchem_id}
                </p>
                <p>
                  <b>Bio Activity:</b> {selectedCompound.bio_activity}
                </p>
                {/* Add more fields as needed */}
              </div>
            </Modal>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="mt-4">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Save Changes
          </button>
        </div>
      )}

      <div className="bg-white p-8 rounded shadow-md w-full items-center gap-2 mt-3">
        <div className="flex justify-between items-center mb-6 w-full">
          <h2 className="text-xl font-bold">References</h2>

          <b>{currentSpecies?.references?.length}</b>
        </div>
        {currentSpecies?.references && currentSpecies.references.length > 0 ? (
          <ol className="">
            {currentSpecies.references.map((reference) => (
              <li
                key={reference.id}
                className="rounded text-left hover:bg-gray-100 cursor-pointer"
                onClick={() => setSelectedReference(reference)}
              >
                <span className="font-normal">{reference.title}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p>No references associated with this species.</p>
        )}

        {/* Compound details modal */}
        {selectedReference && (
          <Modal show={true} onClose={() => setSelectedReference(null)}>
            <div className="p-8 text-left bg-white rounded shadow-md">
              <h2 className="text-xl font-bold mb-2">
                {selectedReference.title}
              </h2>
              <p>
                <b>Type:</b> {selectedReference.type}
              </p>
              <p>
                <b>Author:</b> {selectedReference.author}
              </p>
              <p>
                <b>DOI:</b> {selectedReference.doi}
              </p>
              <p>
                <b>Thesis Level:</b> {selectedReference.thesis_level}
              </p>
              {/* Add more fields as needed */}
            </div>
          </Modal>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-8 rounded shadow-md w-full items-center gap-2 mt-3">
          <div className="flex justify-between items-center mb-6 w-full">
            <h2 className="text-xl font-bold">Harvest Sites</h2>

            <b>{currentSpecies?.harvest_sites?.length}</b>
          </div>
          {currentSpecies?.harvest_sites &&
          currentSpecies.harvest_sites.length > 0 ? (
            <ol className="">
              {currentSpecies.harvest_sites.map((site) => (
                <li
                  key={site.id}
                  className="rounded text-left hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedSite(site)}
                >
                  <span className="font-normal">
                    {site.name}, {site.country}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p>No harvest sites associated with this species.</p>
          )}

          {/* Compound details modal */}
          {selectedSite && (
            <Modal show={true} onClose={() => setSelectedSite(null)}>
              <div className="p-8 text-left bg-white rounded shadow-md">
                <h2 className="text-xl font-bold mb-2">{selectedSite.name}</h2>
                <p>
                  <b>Country:</b> {selectedSite.country}
                </p>
                <p>
                  <b>City/Town:</b> {selectedSite.city_town}
                </p>
                <p>
                  <b>GPS Latitude:</b> {selectedSite.gps_latitude}
                </p>
                <p>
                  <b>GPS Longitude:</b> {selectedSite.gps_longitude}
                </p>
                {/* Add more fields as needed */}
              </div>
            </Modal>
          )}
        </div>
        <div className="bg-white p-8 rounded shadow-md w-full items-center gap-2 mt-3">
          <div className="flex justify-between items-center mb-6 w-full">
            <h2 className="text-xl font-bold">Herbariums</h2>

            <b>{currentSpecies?.storage_locations?.length}</b>
          </div>
          {currentSpecies?.storage_locations &&
          currentSpecies.storage_locations.length > 0 ? (
            <ol className="">
              {currentSpecies.storage_locations.map((herbarium) => (
                <li
                  key={herbarium.id}
                  className="rounded text-left hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedHerbarium(herbarium)}
                >
                  <span className="font-normal">
                    {herbarium.name}, {herbarium.country}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p>No herbariums associated with this species.</p>
          )}

          {/* Compound details modal */}
          {selectedHerbarium && (
            <Modal show={true} onClose={() => setSelectedHerbarium(null)}>
              <div className="p-8 text-left bg-white rounded shadow-md">
                <h2 className="text-xl font-bold mb-2">
                  {selectedHerbarium.name}
                </h2>
                <p>
                  <b>Country:</b> {selectedHerbarium.country}
                </p>
                <p>
                  <b>City/Town:</b> {selectedHerbarium.city_town}
                </p>
                <p>
                  <b>GPS Latitude:</b> {selectedHerbarium.gps_latitude}
                </p>
                <p>
                  <b>GPS Longitude:</b> {selectedHerbarium.gps_longitude}
                </p>
                {/* Add more fields as needed */}
              </div>
            </Modal>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default SpeciesDetailsPage;
