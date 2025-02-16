import { axiosInstance } from "@/api/axiosInstance";
import { IMastersListResponse } from "@/types/masters/Master.interface";

export const getMastersByCity = async (citySlug: string): Promise<IMastersListResponse | null> => {
  try {
    const response = await axiosInstance.get(`/${citySlug}/masters`); // Запрос к API для получения мастеров
    console.log("response.data from axiosInstance.get:", response.data);

    return response.data as IMastersListResponse;
  } catch (error) {
    console.error("Ошибка в getMastersByCity:", error);
    return null; // Возвращаем null, если произошла ошибка
  }
};
