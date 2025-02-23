'use client';
// import { useAuth } from "@/providers/AuthProvider"; // Убираем useAuth
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAtomValue } from 'jotai'; // Импортируем useAtomValue
import { isAuthenticatedAtom } from "@/store/authAtoms";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const { isAuthenticated } = useAuth(); // Убираем useAuth
  const isAuthenticated = useAtomValue(isAuthenticatedAtom); // Используем useAtomValue для isAuthenticated
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <p>Загрузка...</p>;
  }

  return <>{children}</>;
};