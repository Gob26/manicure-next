// Типы для запроса авторизации
export interface ILoginRequest {
    username: string;  // Логин пользователя
    password: string;  // Пароль пользователя
  }
  

// Типы для ответа при успешной авторизации
export interface ILoginResponse {
    access_token: string;  // JWT токен для доступа
    token_type: string;  // Тип токена ( "bearer")
    username: string;  // Имя пользователя
    user_id: string;  // ID пользователя
    role: string;  // Роль пользователя ( 'admin', 'user', 'salon','master'.)
    city: string | null;  // Город пользователя
    city_id: string | null;  // ID города пользователя
    is_confirmed: boolean;  // Флаг подтверждения аккаунта
    expires_in: number;  // Время истечения токена в минутах
  }
  