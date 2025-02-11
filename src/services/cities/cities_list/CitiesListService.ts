// src/services/cities/cities_list/CitiesList.service.ts

import { axiosInstance } from "@/api/axiosInstance";
import { ICity, ICityResponse } from "@/types/cities/City.interface";

// Получение списка городов
export const getCitiesList = async (): Promise<ICity[]> => {
  try {
    const response = await axiosInstance.get<ICity[]>('/cities_list');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cities');
  }
};

// Получение конкретного города по slug
export const getCityDetails = async (slug: string): Promise<ICityResponse | null> => {
  try {
    const response = await axiosInstance.get<ICityResponse>(`/cities/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch city', error);
    return null;
  }
};
