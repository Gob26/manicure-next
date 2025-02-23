// src/hooks/auth/useUserRole.ts
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  role: "master" | "salon" | "admin";
}

export const useUserRole = () => {
  const [role, setRole] = useState<"master" | "salon" | "admin" | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      try {
        const decoded: TokenPayload = jwtDecode(token);
        setRole(decoded.role);
      } catch (error) {
        console.error("Ошибка при декодировании токена:", error);
      }
    }
  }, []);

  return role;
};
