
// src/types/auth/authRegister.interface.ts
export interface IUserRegisterRequest {
  username: string;
  email: string;
  password: string;
  city_name: string;
  role: 'client' | 'master' | 'salon';
}

export interface IUserRegisterResponse {
  username: string;
  email: string;
  city_id: number;
  role: string;
  token?: string; // Добавляем поле для JWT токена, если сервер его возвращает
}

export interface IUserValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}