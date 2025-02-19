// src/pages/register.tsx (Страница регистрации)
import RegisterPage from "@/components/screens/auth/authRegister";
import React from "react";

const Register = () => {
  return (
    <div className="max-w-md mx-auto">
      <RegisterPage /> {/* Используем клиентский компонент */}
    </div>
  );
};

export default Register;