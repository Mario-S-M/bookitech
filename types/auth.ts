/**
 * Interfaces para autenticación
 */

export interface LoginCredentials {
  correo: string;
  contrasena: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  verificado?: boolean;
  needsVerification?: boolean;
  user?: {
    id: string;
    correo: string;
    nombre: string;
    telefono?: string;
  };
  token?: string;
}

export interface RegisterCredentials {
  nombre: string;
  telefono: number;
  codigoweb: string;
  correo: string;
  contrasena: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    correo: string;
    nombre: string;
  };
}

export interface ForgotPasswordRequest {
  correo: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface LogoutResponse {
  success: boolean;
}

// Verificación de cuenta
export interface VerifyAccountRequest {
  id: number;
  codigo: number;
}

export interface VerifyAccountResponse {
  success: boolean;
  message: string;
}
