// api/masters/masterCrUD.ts
import { AxiosError } from 'axios';
import { axiosInstanceToken } from "../axiosInstance";
import { 
  IMasterProfileRequest, 
  ICreateMasterProfileResponse,
  IValidationErrorResponse,
  MasterProfileError 
} from "../../types/masters/masterCrUD.interface";

export const createMasterProfileApi = async (
  data: IMasterProfileRequest
): Promise<ICreateMasterProfileResponse> => {
  try {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "image" && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await axiosInstanceToken.post<ICreateMasterProfileResponse>(
      "/master",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при создании профиля мастера:", error);
    
    if (error instanceof AxiosError && error.response?.data) {
      // Обработка ошибок валидации
      if ((error.response.data as IValidationErrorResponse).detail) {
        throw new MasterProfileError(
          'Ошибка валидации данных',
          error.response.data as IValidationErrorResponse
        );
      }
    }
    
    throw new MasterProfileError('Не удалось создать профиль мастера');
  }
};