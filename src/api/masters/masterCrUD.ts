// src/api/masters/masterCrUD.ts
import { axiosInstance } from "../axiosInstance";
import { IMasterProfileRequest, ICreateMasterProfileResponse } from "../../types/masters/masterCrUD.interface";

export const createMasterProfileApi = async (
    data: IMasterProfileRequest
): Promise<ICreateMasterProfileResponse | null> => {
    try {
        // Отправляем запрос к API
        const response = await axiosInstance.post<ICreateMasterProfileResponse>("/master", data);
        console.log("response.data from axiosInstance.post:", response.data);

        return response.data; // Возвращаем ответ от API
    } catch (error) {
        console.error("Ошибка в createMasterProfile:", error);
        return null; // Возвращаем null в случае ошибки
    }
};

