// services/masters/masterCrUD.service.ts
import { createMasterProfileApi } from "@/api/masters/masterCrUD";
import { 
  IMasterProfileRequest, 
  ICreateMasterProfileResponse,
  MasterProfileError 
} from "@/types/masters/masterCrUD.interface";

export const createMasterProfileService = async (
  data: IMasterProfileRequest
): Promise<ICreateMasterProfileResponse> => {
  try {
    const response = await createMasterProfileApi(data);
    if (!response) {
      throw new MasterProfileError('Не удалось создать профиль мастера');
    }
    return response;
  } catch (error) {
    if (error instanceof MasterProfileError) {
      throw error;
    }
    console.error("Ошибка в сервисе при создании профиля:", error);
    throw new MasterProfileError('Произошла ошибка при создании профиля мастера');
  }
};