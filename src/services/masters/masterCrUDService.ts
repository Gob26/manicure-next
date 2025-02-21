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
    // Предварительная валидация
    const requiredFields = {
      name: 'Имя',
      title: 'Заголовок',
      specialty: 'Специальность',
      experience_years: 'Опыт работы',
      image: 'Фото профиля'
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!data[field as keyof IMasterProfileRequest]) {
        throw new MasterProfileError(`Поле "${label}" обязательно для заполнения`);
      }
    }

    // Валидация номера телефона
    if (data.phone && !/^\+?[0-9]{10,15}$/.test(data.phone)) {
      throw new MasterProfileError('Неверный формат номера телефона');
    }

    // Проверка размера файла
    if (data.image instanceof FileList && data.image[0]) {
      const fileSize = data.image[0].size / 1024 / 1024; // размер в МБ
      if (fileSize > 5) {
        throw new MasterProfileError('Размер файла не должен превышать 5МБ');
      }
    }

    const response = await createMasterProfileApi(data);
    return response;
  } catch (error) {
    console.error('Ошибка в сервисе:', error);
    
    if (error instanceof MasterProfileError) {
      throw error;
    }
    
    throw new MasterProfileError('Произошла ошибка при создании профиля мастера');
  }
};