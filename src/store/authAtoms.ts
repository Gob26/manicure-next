// src/atoms/authAtoms.ts
import { atom } from 'jotai';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '@/types/auth/token.interface';

// Атом для состояния аутентификации (залогинен ли пользователь)
export const isAuthenticatedAtom = atom<boolean>(false);

// Атом для роли пользователя
export const roleAtom = atom<TokenPayload['role'] | null>(null);

// Атом для функции логина
export const loginAtom = atom(
  null, // getter (не используется, поэтому null)
  (get, set, token: string) => { // setter
    localStorage.setItem('auth_token', token);
    const decoded = jwtDecode<TokenPayload>(token);
    set(roleAtom, decoded.role);
    set(isAuthenticatedAtom, true);
  }
);

// Атом для функции выхода из системы
export const logoutAtom = atom(
  null, // getter (не используется, поэтому null)
  (get, set) => { // setter
    localStorage.removeItem('auth_token');
    set(roleAtom, null);
    set(isAuthenticatedAtom, false);
  }
);

// Атом для инициализации состояния при загрузке приложения
export const initializeAuthAtom = atom(null, (get, set) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      set(roleAtom, decoded.role);
      set(isAuthenticatedAtom, true);
    } catch {
      set(logoutAtom); // Вызываем logout, чтобы очистить невалидный токен
    }
  }
});