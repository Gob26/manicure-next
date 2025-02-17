import { axiosInstance } from "@/api/axiosInstance";
import { ISalonsListResponse } from "@/types/salons/Salon.interface";

export const getSalonsByCity = async (citySlug: string): Promise<ISalonsListResponse | null> => {
    try {
        const response = await axiosInstance.get(`/${citySlug}/salons`); // Запрос к API для получения салонов
        console.log("response.data from axiosInstance.get:", response.data);

        return response.data as ISalonsListResponse;
    } catch (error) {
        console.error("Ошибка в getMastersByCity:", error);
        return null; // Возвращаем null, если произошла ошибка
    }
};