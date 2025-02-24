import { loginService } from '@/services/auth/authLoginService';
import { ILoginRequest } from '@/types/auth/authLogin.interface';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { loginAtom } from '@/store/authAtoms';

export const useLogin = () => {
  const login = useSetAtom(loginAtom); // Используем useSetAtom для функции login
  const router = useRouter();

  const handleLogin = async (data: ILoginRequest): Promise<void> => {
    try {
      const response = await loginService(data);
      if (response?.access_token) {
        await login(response.access_token);  // Обновляем состояние аутентификации
        // Убираем редирект после авторизации
        // Добавляем небольшую задержку перед редиректом
        // await new Promise(resolve => setTimeout(resolve, 200)); // Увеличил задержку
        // router.replace('/dashboard');  // Редирект после успешной аутентификации
      }
    } catch (error) {
      toast.error('Ошибка авторизации');
      throw error;  // Прокидываем ошибку дальше
    }
  };

  return { handleLogin };
};
