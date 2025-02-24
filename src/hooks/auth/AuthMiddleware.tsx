'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { isAuthenticatedAtom } from '@/store/authAtoms';
import { useUserRole } from '@/hooks/auth/useUserRole';

interface AuthMiddlewareProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const AuthMiddleware = ({ children, requireAuth = false }: AuthMiddlewareProps) => {
  const router = useRouter();
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const role = useUserRole();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        if (requireAuth && !isAuthenticated) {
          // Отключаем редирект для временного решения
          // router.replace('/login');
          return;
        }

        if (!requireAuth && isAuthenticated) {
          // Отключаем редирект для временного решения
          // router.replace('/dashboard');
          return;
        }

        // Проверка роли только если требуется аутентификация
        if (requireAuth && isAuthenticated && !role) {
          // Если роль не определена, но пользователь аутентифицирован
          // возможно, токен неверный или истек
          localStorage.removeItem('auth_token');
          // Отключаем редирект для временного решения
          // router.replace('/login');
          return;
        }
      } finally {
        setIsLoading(false);
      }
    };

    handleAuth();
  }, [isAuthenticated, requireAuth, router, role]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return <>{children}</>;
};
