'use client';
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useLogin } from "@/hooks/auth/useLogin";
import { ILoginRequest } from "@/types/auth/authLogin.interface";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const { handleLogin } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ILoginRequest>();

  React.useEffect(() => {
    if (error) {
      const toastId = toast.error(error);  // Оповещаем об ошибке
      return () => toast.dismiss(toastId);  // Убираем старые тосты
    }
  }, [error]);

  const onSubmit: SubmitHandler<ILoginRequest> = async (data) => {
    setLoading(true);
    setError(null);  // Сбрасываем ошибки при новом запросе
    try {
      await handleLogin(data);  // Обработка логина
      toast.success("Вы успешно авторизованы!");  // Успешный логин
    } catch (error: unknown) {
      console.error('Login error:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : "Произошла ошибка при авторизации.";  // Формируем сообщение об ошибке

      setError(errorMessage);  // Устанавливаем ошибку в состояние
    } finally {
      setLoading(false);  // Завершаем процесс загрузки
    }
  };

  return (
    <div className="login-form-container">
      <h2>Вход в систему</h2>

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

        <button type="submit" disabled={loading || isSubmitting}>
          {loading ? "Загрузка..." : "Войти"}
        </button>
      </form>

      <Toaster />
    </div>
  );
};

export default LoginPage;
