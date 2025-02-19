'use client';

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IUserRegisterRequest } from "@/types/auth/authRegister.interface";
import { Toaster, toast } from "react-hot-toast"; // Добавляем Toaster
import { registerUser } from "@/api/auth/authRegister";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IUserRegisterRequest>({
    defaultValues: {
      role: 'client'
    }
  });

  const onSubmit: SubmitHandler<IUserRegisterRequest> = async (data) => {
    // Добавляем логи для отладки
    console.log('Начало отправки формы', data);

    try {
      const response = await registerUser(data);
      console.log('Успешный ответ:', response);
      
      alert('Регистрация успешна!'); // Временно используем alert вместо toast
      reset();
      
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      
      if (error instanceof Error) {
        alert(error.message); // Временно используем alert вместо toast
      } else {
        alert('Произошла ошибка при регистрации');
      }
    }
  };

  return (
    <>
      <Toaster position="top-center" /> {/* Добавляем компонент уведомлений */}
      
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="block font-medium text-gray-700">
              Имя пользователя
            </label>
            <input
              {...register("username", {
                required: "Имя пользователя обязательно",
                minLength: {
                  value: 2,
                  message: "Имя должно содержать минимум 2 символа"
                }
              })}
              type="text"
              id="username"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Введите имя пользователя"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email обязателен",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Некорректный email адрес"
                }
              })}
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="example@domain.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block font-medium text-gray-700">
              Пароль
            </label>
            <input
              {...register("password", {
                required: "Пароль обязателен",
                minLength: {
                  value: 8,
                  message: "Пароль должен содержать минимум 8 символов"
                }
              })}
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Введите пароль"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="city_name" className="block font-medium text-gray-700">
              Город
            </label>
            <input
              {...register("city_name", {
                required: "Город обязателен"
              })}
              type="text"
              id="city_name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Введите название города"
            />
            {errors.city_name && (
              <p className="text-red-500 text-sm">{errors.city_name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="block font-medium text-gray-700">
              Роль
            </label>
            <select
              {...register("role")}
              id="role"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="client">Клиент</option>
              <option value="master">Мастер</option>
              <option value="salon">Салон</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;