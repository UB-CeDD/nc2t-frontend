import api from "./api";
import { Herbarium } from "@/helpers/types";

const API_URL = "/herbariums";

export const createHerbarium = async (herbariumData: Herbarium) => {
  try {
    const response = await api.post(`${API_URL}/`, herbariumData);
    return response.data;
  } catch {
    throw new Error("Failed to create herbarium.");
  }
};

export const listHerbariums = async (
  queryParams: Record<string, string> = {},
) => {
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await api.get(`${API_URL}?${queryString}`);
    return response.data;
  } catch {
    throw new Error("Failed to fetch herbariums.");
  }
};

export const retrieveHerbarium = async (id: string) => {
  try {
    const response = await api.get(`${API_URL}/${id}/`);
    return response.data;
  } catch {
    throw new Error("Failed to retrieve herbarium.");
  }
};

export const updateHerbarium = async (
  id: string,
  herbariumData: Partial<Herbarium>,
) => {
  try {
    const response = await api.put(`${API_URL}/${id}/`, herbariumData);
    return response.data;
  } catch {
    throw new Error("Failed to update herbarium.");
  }
};

export const deleteHerbarium = async (id: string) => {
  try {
    const response = await api.delete(`${API_URL}/${id}/`);
    return response.data;
  } catch {
    throw new Error("Failed to delete herbarium.");
  }
};
