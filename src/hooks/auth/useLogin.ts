'use client';

import { useState, useEffect } from "react";
import { ILoginRequest, ILoginResponse } from "@/types/auth/authLogin.interface";
import { useRouter } from "next/navigation";  // Используем useRouter из next/navigation для клиентских компонентов
import { loginService } from "@/services/auth/authLoginService";  // Сервис для авторизации
import { toast } from "react-hot-toast";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);  // Состояние для проверки на клиенте

  // Используем useRouter прямо в компоненте
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);  // Устанавливаем, что мы на клиенте
  }, []);

  const login = async (data: ILoginRequest): Promise<ILoginResponse | null> => {
    if (!isClient) return null;  // Если на сервере, возвращаем null

    setError(null); // Сброс ошибки перед новым запросом

    try {
      const response = await loginService(data);  // Получаем ответ от сервиса

      if (response) {
        // Если ответ существует, то успешная авторизация
        toast.success("Вы успешно авторизованы!");

        // Сохраняем токен в localStorage
        localStorage.setItem("auth_token", response.access_token);

        // Редиректим пользователя
        router.push("/master");
      } else {
        // Если ответа нет, показываем ошибку
        toast.error("Неверные учетные данные");
      }

      return response;  // Вернуть ответ из сервиса
    } catch (err) {
      // Обработка ошибки в случае неудачи
      toast.error("Произошла ошибка при авторизации");
      return null;
    }
  };

  return { login, error };
};


