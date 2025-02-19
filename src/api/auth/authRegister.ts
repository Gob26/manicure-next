// src/api/auth/authRegister.ts
import { axiosInstance } from "../axiosInstance"; 
import { IUserRegisterRequest, IUserRegisterResponse } from "../../types/auth/authRegister.interface"; 

// Функция для регистрации нового пользователя
export const registerUser = async (
  data: IUserRegisterRequest
): Promise<IUserRegisterResponse> => {
  try {
    // Отправляем запрос на сервер с данными в качестве query-параметров
    const response = await axiosInstance.post<IUserRegisterResponse>(
      '/auth/register',
      null, // тело запроса оставляем пустым
      { params: data } // данные отправляем как query-параметры
    );

    // Возвращаем данные пользователя из ответа сервера
    return response.data;
  } catch (error: any) {
    // Обработка ошибок
    if (error.response && error.response.data) {
      throw new Error(error.response.data.detail[0].msg); 
    } else {
      throw new Error('Ошибка при регистрации. Попробуйте позже.');
    }
  }
};

