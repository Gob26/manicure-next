// src/pages/register.tsx (Страница регистрации)
import LoginPage from "@/components/screens/auth/authLogin";
import React from "react";

const Login = () => {
  return (
    <div className="max-w-md mx-auto">
      <LoginPage /> {/* Используем клиентский компонент */}
    </div>
  );
};

export default Login;