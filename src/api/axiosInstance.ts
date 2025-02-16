import axios from "axios";

// Создание экземпляра axios с базовым URL
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1", // Базовый URL для API
  headers: {
    "Content-Type": "application/json",
  },
});
