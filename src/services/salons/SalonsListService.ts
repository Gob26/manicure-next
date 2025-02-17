import { getSalonsByCity } from "@/api/salons/SalonsAPI";
import { ISalonsListResponse } from "@/types/salons/Salon.interface";

export const getSalonsList = async (citySlug: string): Promise<ISalonsListResponse> => {
    try {
        const salons = await getSalonsByCity(citySlug);
        if (salons === null) {
            throw new Error("Ошибка при получении салонов.");
        }
        console.log("Полученные данные от getSalonsByCity:", salons);
        return salons; // Убрано .data, так как данные уже извлечены
    } catch (error) {
        console.error("Ошибка при получении салонов:", error);
        return { salons: [] }; // Возвращаем пустой список, если произошла ошибка
    }
};
