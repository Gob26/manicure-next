// src/services/auth/authService.ts

import { loginApi } from "@/api/auth/authLogin";
import { ILoginRequest, ILoginResponse } from "@/types/auth/authLogin.interface";

// Сервис для авторизации пользователя
export const loginService = async (data: ILoginRequest): Promise<ILoginResponse | null> => {
  try {
    // Получаем ответ от API
    const response = await loginApi(data);

    if (!response) {
      throw new Error("Ошибка авторизации");
    }

    return response;  // Возвращаем ответ из API
  } catch (error) {
    console.error("Ошибка в сервисе авторизации:", error);
    return null;  // Возвращаем null в случае ошибки
  }
};
