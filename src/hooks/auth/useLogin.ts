// src/hooks/auth/useLogin.ts
// import { useAuth } from '@/providers/AuthProvider'; // Убираем useAuth
import { loginService } from '@/services/auth/authLoginService';
import { ILoginRequest } from '@/types/auth/authLogin.interface';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai'; // Импортируем useSetAtom
import { loginAtom } from '@/store/authAtoms';

export const useLogin = () => {
  // const { login } = useAuth(); // Убираем useAuth
  const login = useSetAtom(loginAtom); // Используем useSetAtom для функции login
  const router = useRouter();

  const handleLogin = async (data: ILoginRequest): Promise<void> => {
    try {
      const response = await loginService(data);
      if (response?.access_token) {
        login(response.access_token); // Вызываем функцию login из атома
        toast.success('Вы успешно авторизованы!');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Ошибка авторизации');
      throw error;
    }
  };

  return { handleLogin };
};