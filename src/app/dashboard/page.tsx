// src/app/dashboard/page.tsx
import DashboardPage from "@/components/screens/dashboard/Dashboard";
import React from "react";

const Dashboard = () => {
  return (
    <div className="max-w-md mx-auto">
      <DashboardPage /> {/* Используем клиентский компонент */}
    </div>
  );
};

export default Dashboard;


