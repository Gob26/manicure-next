// src/app/(dashboard)/master/page.tsx
import CreateMasterProfilePage from "@/components/screens/master/masterCreate";
import React from "react";

const CreateMaster = () => {
  return (
    <div className="max-w-md mx-auto">
      <h1>Создание профиля мастера</h1>
      <CreateMasterProfilePage /> {/* Используем клиентский компонент */}
    </div>
  );
};

export default CreateMaster;
