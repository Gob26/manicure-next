// src/types/auth/token.interface.ts
import { JwtPayload } from 'jwt-decode';

export interface TokenPayload extends JwtPayload {
  role: 'master' | 'salon' | 'admin';
  userId: string;
}