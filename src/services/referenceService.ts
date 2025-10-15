import { Reference } from "@/helpers/types";
import api from "./api";

const API_URL = "/references";

export const createReference = async (referenceData: Reference) => {
  try {
    const response = await api.post(`${API_URL}/`, { ...referenceData });
    return response.data;
  } catch {
    throw new Error("Failed to create reference.");
  }
};

export const listReferences = async (
  queryParams: Record<string, string> = {},
) => {
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await api.get(`${API_URL}?${queryString}`);
    return response.data;
  } catch {
    throw new Error("Failed to fetch references.");
  }
};

export const retrieveReference = async (id: string) => {
  try {
    const response = await api.get(`${API_URL}/${id}/`);
    return response.data;
  } catch {
    throw new Error("Failed to retrieve reference.");
  }
};

export const updateReference = async (
  id: string,
  referenceData: { title?: string; author?: string; year?: number },
) => {
  try {
    const response = await api.put(`${API_URL}/${id}/`, referenceData);
    return response.data;
  } catch {
    throw new Error("Failed to update reference.");
  }
};

export const deleteReference = async (id: string) => {
  try {
    const response = await api.delete(`${API_URL}/${id}/`);
    return response.data;
  } catch {
    throw new Error("Failed to delete reference.");
  }
};

export const searchReferences = async (query: string) => {
  try {
    const response = await api.get(`${API_URL}/search/?q=${query}`);
    return response.data;
  } catch {
    throw new Error("Failed to search references.");
  }
};
