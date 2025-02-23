// src/app/(dashboard)/salon/page.tsx
import CreateSalonProfilePage from "@/components/screens/salon/salonCreate";
import React from "react";

const CreateSalon = () => {
  return (
    <div className="max-w-md mx-auto">
      <CreateSalonProfilePage /> {/* Используем клиентский компонент */}
    </div>
  );
};

export default CreateSalon;