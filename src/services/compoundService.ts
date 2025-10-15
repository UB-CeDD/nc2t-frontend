import { Compound } from "@/helpers/types";
import api from "./api";

const API_URL = "/compounds";

export const createCompound = async (compoundData: Compound) => {
  try {
    if (!compoundData || !compoundData.smiles) {
      throw new Error("Compound data is incomplete. SMILES is required.");
    }
    if (!compoundData.compound_class) {
      throw new Error("Compound class is required.");
    }
    // Make the API call to create the compound
    const response = await api.post(`${API_URL}/`, compoundData);
    console.log("Compound created successfully:", response.data);

    return response.data;
  } catch (error) {
    console.error("Failed to create compound:", error);
    throw new Error("Failed to create compound.");
  }
};

export const listCompounds = async (
  queryParams: Record<string, string> = {},
) => {
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await api.get(`${API_URL}?${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch compounds:", error);
    throw new Error("Failed to fetch compounds.");
  }
};

export const searchCompounds = async (query: string) => {
  try {
    const response = await api.get(`${API_URL}?search=${query}`);
    return response.data;
  } catch (error) {
    console.error("Failed to search compounds:", error);
    throw new Error("Failed to search compounds.");
  }
};

export const retrieveCompound = async (id: string) => {
  try {
    const response = await api.get(`${API_URL}/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Failed to retrieve compound ${id}:`, error);
    throw new Error("Failed to retrieve compound.");
  }
};

export const updateCompound = async (
  id: string,
  compoundData: { compound_class?: string; smiles?: string },
) => {
  try {
    const response = await api.put(`${API_URL}/${id}/`, compoundData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update compound ${id}:`, error);
    throw new Error("Failed to update compound.");
  }
};

export const deleteCompound = async (id: string) => {
  try {
    const response = await api.delete(`${API_URL}/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete compound ${id}:`, error);
    throw new Error("Failed to delete compound.");
  }
};
