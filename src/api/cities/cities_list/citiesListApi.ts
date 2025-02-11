//Функция запроса к API
import { axiosInstance } from "@/api/axiosInstance";
import { ICity } from "@/types/cities/City.interface";

export const getCitiesList = async (): Promise<ICity[]> => {
  const response = await axiosInstance.get("/cities");
  return response.data;
};
