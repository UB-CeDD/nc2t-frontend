import api from "./api";
import { UserModel } from "@/helpers/types";

export type SpeciesUserRole = "author" | "curator" | "publisher";

export interface SpeciesUser {
  user: UserModel;
  role: SpeciesUserRole;
}

const API_URL = "/species";

export const addSpeciesUser = async (
  speciesId: string,
  userId: number,
  role: SpeciesUserRole,
) => {
  try {
    const response = await api.post(`${API_URL}/${speciesId}/users/`, {
      user: userId,
      role: role.toUpperCase(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to add user to species.",
    );
  }
};

export const updateSpeciesUserRole = async (
  speciesId: string,
  userId: number,
  role: SpeciesUserRole,
) => {
  try {
    const response = await api.put(`${API_URL}/${speciesId}/users/${userId}/`, {
      role,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to update user role for species.",
    );
  }
};

export const removeSpeciesUser = async (speciesId: string, userId: number) => {
  try {
    const response = await api.delete(
      `${API_URL}/${speciesId}/users/${userId}/`,
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to remove user from species.",
    );
  }
};

export const listSpeciesUsers = async (speciesId: string) => {
  try {
    const response = await api.get(`${API_URL}/${speciesId}/users/`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch species users.",
    );
  }
};
