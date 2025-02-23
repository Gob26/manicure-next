// src/components/guards/RouteGuard.tsx
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const RouteGuard = ({ children, allowedRoles }: RouteGuardProps) => {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (allowedRoles && role && !allowedRoles.includes(role)) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, role, router, allowedRoles]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
};