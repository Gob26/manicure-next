export interface IMasterProfileRequest {
    title: string;        // Название (макс. 255 символов)
    description?: string; // Описание (опционально)
    experience_years: number; // Количество лет опыта
    specialty: string;    // Специальность (макс. 255 символов)
    slug: string;         // Slug (макс. 255 символов)
    name: string;         // Имя (макс. 255 символов)
    address?: string;     // Адрес (макс. 256 символов, опционально)
    phone?: string;       // Телефон (макс. 20 символов, опционально)
    telegram?: string;    // Телеграм (URI, опционально)
    whatsapp?: string;    // WhatsApp (URI, опционально)
    website?: string;     // Вебсайт (URI, опционально)
    vk?: string;          // VK (URI, опционально)
    instagram?: string;   // Instagram (URI, опционально)
    accepts_at_home: boolean; // Принимает на дому
    accepts_in_salon: boolean; // Принимает в салоне
    accepts_offsite: boolean;  // Принимает выездные
    image: string;        // Изображение (бинарный файл)
  }
  
  export interface ICreateMasterProfileResponse {
    message: string;   // Сообщение об успешном создании
    data: {
      id: string;      // ID нового профиля
      title: string;   // Название профиля
      name: string;    // Имя мастера
      // Другие поля, которые возвращает сервер (например, image, phone и т.д.)
    };
  }

  export interface IValidationErrorResponse {
    detail: {
      loc: [string, number]; // Местоположение ошибки (например, в теле запроса)
      msg: string;            // Сообщение об ошибке
      type: string;           // Тип ошибки
    }[];
  }
  