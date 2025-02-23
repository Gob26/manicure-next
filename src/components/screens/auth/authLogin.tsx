'use client';
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useLogin } from "@/hooks/auth/useLogin";
import { ILoginRequest } from "@/types/auth/authLogin.interface";
import { useRouter } from "next/navigation";
import { useAtom } from 'jotai';
import { isAuthenticatedAtom } from "@/store/authAtoms";

const LoginPage = () => {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [loading, setLoading] = React.useState<boolean>(false); //  <--  Добавлено состояние loading
  const [error, setError] = React.useState<string | null>(null); //  <--  Добавлено состояние error
  const router = useRouter();
  const { handleLogin } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ILoginRequest>();

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const onSubmit: SubmitHandler<ILoginRequest> = async (data) => {
    setLoading(true);
    setError(null); // Сбрасываем предыдущую ошибку
    try {
      await handleLogin(data);
      toast.success("Вы успешно авторизованы!");
    } catch (error: any) { //  <--  Указан тип error как any или Error
      console.error('Login error:', error);
      setError(error.message || "Произошла ошибка при авторизации."); //  <--  Устанавливаем состояние error
      toast.error("Произошла ошибка при авторизации.");
    } finally {
      setLoading(false);
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

        <button type="submit" disabled={loading}>
          {loading ? "Загрузка..." : "Войти"}
        </button>
      </form>

      {error && toast.error(error)}

      <Toaster />
    </div>
  );
};

export default LoginPage;