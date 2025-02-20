// src/api/auth/authApi.ts

import { ILoginRequest, ILoginResponse } from "@/types/auth/authLogin.interface";
import { axiosInstanceToken } from "../axiosInstance";

export const loginApi = async (
  data: ILoginRequest
): Promise<ILoginResponse | null> => {
    try {
      console.log("Отправляем login data:", data);  // Логируем данные перед отправкой
  
      // Создаем форму с данными для отправки как form-data
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('password', data.password);
  
      const response = await axiosInstanceToken.post<ILoginResponse>("auth/login", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Устанавливаем тип контента
        },
      });
  
      return response.data;  // Возвращаем данные из ответа
    } catch (error) {
      console.error("Ошибка при авторизации:", error);
      return null;  // Возвращаем null в случае ошибки
    }
  };
  
