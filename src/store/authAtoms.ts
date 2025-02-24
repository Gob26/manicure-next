// src/store/authAtoms.ts
import { atom } from 'jotai';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '@/types/auth/token.interface';

// Атом для состояния аутентификации
export const isAuthenticatedAtom = atom<boolean>(false);

// Атом для роли пользователя
export const roleAtom = atom<TokenPayload['role'] | null>(null);

// Атом для функции логина
export const loginAtom = atom(
  null,
  (get, set, token: string) => {
    console.log('🔐 loginAtom: начало процесса логина', { tokenLength: token.length });
    
    localStorage.setItem('auth_token', token);
    console.log('💾 loginAtom: токен сохранен в localStorage');
    
    const decoded = jwtDecode<TokenPayload>(token);
    console.log('🔑 loginAtom: токен декодирован', { role: decoded.role });
    
    set(roleAtom, decoded.role);
    console.log('👤 loginAtom: роль установлена');
    
    set(isAuthenticatedAtom, true);
    console.log('✅ loginAtom: пользователь помечен как аутентифицированный');
  }
);

// Атом для функции выхода
export const logoutAtom = atom(
  null,
  (get, set) => {
    console.log('🚪 logoutAtom: начало процесса выхода');
    
    localStorage.removeItem('auth_token');
    console.log('🗑️ logoutAtom: токен удален из localStorage');
    
    set(roleAtom, null);
    console.log('👤 logoutAtom: роль сброшена');
    
    set(isAuthenticatedAtom, false);
    console.log('❌ logoutAtom: пользователь помечен как неаутентифицированный');
  }
);

// Атом для инициализации
export const initializeAuthAtom = atom(
  null, 
  (get, set) => {
    console.log('🔄 initializeAuthAtom: начало инициализации');
    
    const token = localStorage.getItem('auth_token');
    console.log('🔍 initializeAuthAtom: проверка токена в localStorage', { hasToken: !!token });
    
    if (token) {
      try {
        console.log('🔑 initializeAuthAtom: попытка декодировать токен');
        const decoded = jwtDecode<TokenPayload>(token);
        
        set(roleAtom, decoded.role);
        console.log('👤 initializeAuthAtom: роль установлена', { role: decoded.role });
        
        set(isAuthenticatedAtom, true);
        console.log('✅ initializeAuthAtom: пользователь помечен как аутентифицированный');
      } catch (error) {
        console.error('❌ initializeAuthAtom: ошибка декодирования токена', error);
        console.log('🔄 initializeAuthAtom: запуск процедуры выхода из-за невалидного токена');
        set(logoutAtom);
      }
    } else {
      console.log('ℹ️ initializeAuthAtom: токен не найден, пользователь не аутентифицирован');
    }
  }
);
