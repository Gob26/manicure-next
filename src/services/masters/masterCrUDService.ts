// src/services/masters/masterCrUD.service.ts
import { createMasterProfileApi } from "@/api/masters/masterCrUD";
import { IMasterProfileRequest, ICreateMasterProfileResponse } from "@/types/masters/masterCrUD.interface";

export const createMasterProfileService = async (
    data: IMasterProfileRequest
): Promise<ICreateMasterProfileResponse | null> => {
    try {
        const response = await createMasterProfileApi(data); // Вызываем API слой
        return response;
    } catch (error) {
        console.error("Ошибка в сервисе при создании профиля:", error);
        return null; // Возвращаем null, если произошла ошибка
    }
};
