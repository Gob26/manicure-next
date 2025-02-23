// src/components/auth/AuthInitializer.tsx
'use client';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { initializeAuthAtom } from '@/store/authAtoms';

export const AuthInitializer = () => {
  const initializeAuth = useSetAtom(initializeAuthAtom);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return null; // Этот компонент ничего не рендерит, только инициализирует состояние
};