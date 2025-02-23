// services/salons/salonCrUD.service.ts
import { createSalonProfileApi } from "@/api/salons/salonCrUD";
import {
  ISalonProfileRequest,
  ICreateSalonProfileResponse,
  SalonProfileError
} from "@/types/salons/salonCrUD.interface";

export const createSalonProfileService = async (
  data: ISalonProfileRequest
): Promise<ICreateSalonProfileResponse> => {
  try {
    // Предварительная валидация
    const requiredFields = {
      name: 'Имя',
      title: 'Заголовок',
      address: 'Адрес',
      phone: 'Номер телефона',
      image: 'Фото профиля'
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!data[field as keyof ISalonProfileRequest]) {
        throw new SalonProfileError(`Поле "${label}" обязательно для заполнения`);
      }
    }

    // Валидация номера телефона
    if (data.phone && !/^\+?[0-9]{10,15}$/.test(data.phone)) {
      throw new SalonProfileError('Неверный формат номера телефона');
    }

    // Проверка размера файла
    if (data.image instanceof FileList && data.image[0]) {
      const fileSize = data.image[0].size / 1024 / 1024; // размер в МБ
      if (fileSize > 5) {
        throw new SalonProfileError('Размер файла не должен превышать 5МБ');
      }
    }

    const response = await createSalonProfileApi(data);
    return response;
  } catch (error) {
    console.error('Ошибка в сервисе:', error);
    
    if (error instanceof SalonProfileError) {
      throw error;
    }
    
    throw new SalonProfileError('Произошла ошибка при создании профиля мастера');
  }
};