import { getMastersByCity } from "@/api/masters/MastersAPi";
import { IMastersListResponse } from "@/types/masters/Master.interface";

export const getMastersList = async (citySlug: string): Promise<IMastersListResponse> => {
  try {
    const masters = await getMastersByCity(citySlug);
    if (masters === null) {
      throw new Error("Ошибка при получении мастеров.");
    }
    console.log("Полученные данные от getMastersByCity:", masters);
    return masters; // Убрано .data, так как данные уже извлечены
  } catch (error) {
    console.error("Ошибка при получении мастеров:", error);
    return { masters: [] }; // Возвращаем пустой список, если произошла ошибка
  }
};
