'use client';

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { useLogin } from "@/hooks/auth/useLogin";  // Хук для логина
import { ILoginRequest } from "@/types/auth/authLogin.interface"; // Тип для запроса

const LoginPage = () => {
  const { login, error } = useLogin();  // Используем хук для авторизации
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginRequest>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<ILoginRequest> = async (data) => {
    setLoading(true);  // Включаем загрузку
    try {
      const response = await login(data);  // Вызов сервиса логина с переданными данными

      if (response) {
        toast.success("Вы успешно авторизованы!");  // Показать успех
      } else {
        toast.error("Неверные учетные данные!");  // Показать ошибку
      }
    } catch (err) {
      // Логируем ошибку в случае исключения
      toast.error("Произошла ошибка при авторизации.");
    } finally {
      setLoading(false);  // Выключаем загрузку
    }
  };

  return (
    <div className="login-form-container">
      <h2>Вход в систему</h2>
      
      {/* Форма авторизации */}
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Логин</label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "Логин обязателен" })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Пароль обязателен" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Загрузка..." : "Войти"}
        </button>
      </form>

      {/* Показываем ошибку, если она есть */}
      {error && toast.error(error)}

      <Toaster /> {/* Для отображения сообщений о состоянии */}
    </div>
  );
};

export default LoginPage;
