// src/services/auth/authRegister.service.ts
import { registerUserApi } from "@/api/auth/authRegister";
import { IUserRegisterRequest, IUserRegisterResponse } from "../../types/auth/authRegister.interface";

export const registerUserService = async (
  data: IUserRegisterRequest
): Promise<IUserRegisterResponse> => {
  // Здесь можно добавить дополнительную бизнес-логику, например, валидацию данных или обработку ответа
  const response = await registerUserApi(data);
  // Если необходимо, можно выполнить преобразование response перед возвратом
  return response;
};
