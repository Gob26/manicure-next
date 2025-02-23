// api/salons/salonCrUD.ts
import { AxiosError } from 'axios';
import { axiosInstanceToken } from "../axiosInstance";
import {
  ISalonProfileRequest,
  ICreateSalonProfileResponse,
  IValidationErrorResponse,
  SalonProfileError
} from "../../types/salons/salonCrUD.interface";
// api/masters/masterCrUD.ts

export const createSalonProfileApi = async (
  data: ISalonProfileRequest
): Promise<ICreateSalonProfileResponse> => {
  try {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      // Пропускаем пустые строки
      if (value === "") return;
      
      if (value !== undefined && value !== null) {
        if (key === "image") {
          if (value instanceof FileList && value.length > 0) {
            formData.append(key, value[0]);
          } else if (value instanceof File) {
            formData.append(key, value);
          }
        } else if (typeof value === 'number') {
          formData.append(key, value.toString());
        } else {
          const strValue = String(value).trim();
          if (strValue) {
            formData.append(key, strValue);
          }
        }
      }
    });

    console.log('Отправляемые данные:', Object.fromEntries(formData.entries()));

    const response = await axiosInstanceToken.post<ICreateSalonProfileResponse>(
      "/salon/", // Исправленный URL
      formData,
      {
        headers: { 
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('Детали ошибки:', error.response?.data);
      
      if (error.response?.status === 422) {
        const validationErrors = error.response.data as IValidationErrorResponse;
        // Выводим все детали ошибок
        console.log('Ошибки валидации:', validationErrors.detail);
        throw new SalonProfileError(
          'Ошибка валидации данных',
          validationErrors
        );
      }
    }
    throw new SalonProfileError('Не удалось создать профиль мастера');
  }
};