// src/pages/register.tsx
"use client";
import React from "react";
import LoginForm from '@/components/screens/auth/authLogin';
import { AuthMiddleware } from "@/hooks/auth/AuthMiddleware";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto">
      <AuthMiddleware requireAuth={false}>
        <LoginForm />
      </AuthMiddleware>
    </div>
  );
}