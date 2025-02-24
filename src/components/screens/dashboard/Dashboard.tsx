// src/components/screens/dashboard/Dashboard.tsx
"use client";
import { useUserRole } from "@/hooks/auth/useUserRole";
import CreateMasterProfilePage from "@/components/screens/master/masterCreate";
import CreateSalonProfilePage from "@/components/screens/salon/salonCreate";
import { AuthMiddleware } from "@/hooks/auth/AuthMiddleware";

const DashboardContent = () => {
  const role = useUserRole();

  if (!role) return <p>Загрузка...</p>;

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Личный кабинет</h1>
      {role === "master" && <CreateMasterProfilePage />}
      {role === "salon" && <CreateSalonProfilePage />}
    </div>
  );
};

const DashboardPage = () => {
  return (
    <AuthMiddleware requireAuth={true}>
      <DashboardContent />
    </AuthMiddleware>
  );
};

export default DashboardPage;