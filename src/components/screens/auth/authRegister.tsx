'use client';

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IUserRegisterRequest } from "@/types/auth/authRegister.interface";
import { Toaster } from "react-hot-toast";
import { registerUserService } from "@/services/auth/authRegistrService";

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
    console.log('Начало отправки формы', data);

    try {
      const response = await registerUserService(data);
      console.log('Успешный ответ:', response);
      alert('Регистрация успешна!');
      reset();
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Произошла ошибка при регистрации');
      }
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div>
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username">Имя пользователя</label>
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
              placeholder="Введите имя пользователя"
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>

          <div>
            <label htmlFor="email">Email</label>
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
              placeholder="example@domain.com"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password">Пароль</label>
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
              placeholder="Введите пароль"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="city_name">Город</label>
            <input
              {...register("city_name", {
                required: "Город обязателен"
              })}
              type="text"
              id="city_name"
              placeholder="Введите название города"
            />
            {errors.city_name && <p>{errors.city_name.message}</p>}
          </div>

          <div>
            <label htmlFor="role">Роль</label>
            <select {...register("role")} id="role">
              <option value="client">Клиент</option>
              <option value="master">Мастер</option>
              <option value="salon">Салон</option>
            </select>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
