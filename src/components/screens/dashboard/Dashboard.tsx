// src/components/screens/dashboard/Dashboard.tsx
"use client";

import { useUserRole } from "@/hooks/auth/useUserRole";
import CreateMasterProfilePage from "@/components/screens/master/masterCreate";
import CreateSalonProfilePage from "@/components/screens/salon/salonCreate";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const DashboardPage = () => {
  const role = useUserRole();
  const router = useRouter();

  useEffect(() => {
    if (role === undefined) return; // Ждём, пока состояние обновится
    if (!role) {
      router.replace("/login"); // Используем `replace`, чтобы убрать возможность вернуться назад
    }
  }, [role, router]);
  
  

  if (!role) return <p>Загрузка...</p>;

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Личный кабинет</h1>
      {role === "master" && <CreateMasterProfilePage />}
      {role === "salon" && <CreateSalonProfilePage />}
    </div>
  );
};

export default DashboardPage;
