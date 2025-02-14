// src/services/cities/masters/MastersList.service.ts
import { IMastersListResponse } from "@/types/masters/Master.interface";
import { getMastersByCity } from "@/api/masters/MastersAPi";


export const getMastersList = async (citySlug: string): Promise<IMastersListResponse> => {
    try {
      return await getMastersByCity(citySlug);
    } catch (error) {
      console.error("Ошибка при получении мастеров:", error);
      return { masters: [] };
    }
  };
