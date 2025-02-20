import axios from "axios";

// Создание экземпляра axios с базовым URL
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1", // Базовый URL для API
  headers: {
    "Content-Type": "application/json",
  },
});


export const axiosInstanceToken = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstanceToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token'); // Получаем токен из localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Добавляем токен в заголовок Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);