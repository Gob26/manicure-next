// src/api/auth/authRegister.api.ts
import { axiosInstance } from "../axiosInstance";
import { IUserRegisterRequest, IUserRegisterResponse } from "../../types/auth/authRegister.interface";

export const registerUserApi = async (
  data: IUserRegisterRequest
): Promise<IUserRegisterResponse> => {
  try {
    // Отправляем запрос, передавая данные как query-параметры
    const response = await axiosInstance.post<IUserRegisterResponse>(
      '/auth/register',
      null, // тело запроса оставляем пустым
      { params: data } // данные передаются в query-параметрах
    );

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.detail[0].msg);
    } else {
      throw new Error('Ошибка при регистрации. Попробуйте позже.');
    }
  }
};
