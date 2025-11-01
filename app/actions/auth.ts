"use server";

import { cookies } from "next/headers";
import type {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LogoutResponse,
} from "@/types/auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://libmich.com/bookit/api";
const API_AUTH_KEY = process.env.API_AUTHORIZATION_KEY || "1a?+Y|F2B6kqzS8";
const AUTH_HEADER = API_AUTH_KEY.startsWith("Bearer ")
  ? API_AUTH_KEY
  : `Bearer ${API_AUTH_KEY}`;

/**
 * Server Action para login
 * @param credentials - Correo y contraseña del usuario
 * @returns Respuesta con el estado del login
 */
export async function loginAction(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  try {
    // Crear FormData para enviar los datos
    const formData = new FormData();
    formData.append("correo", credentials.correo);
    formData.append("contrasena", credentials.contrasena);

    console.log("🔄 Enviando login a:", `${API_BASE_URL}/usuario/login`);

    const response = await fetch(`${API_BASE_URL}/usuario/login`, {
      method: "POST",
      headers: {
        Authorization: AUTH_HEADER,
        Accept: "application/json",
      },
      body: formData,
      cache: "no-store",
    });

    console.log("📡 Response status:", response.status);
    console.log("📡 Response ok:", response.ok);

    let data: any = {};
    try {
      data = await response.json();
    } catch (e) {
      console.warn("⚠️ No se pudo parsear JSON de login");
    }
    console.log("📦 Data recibida:", JSON.stringify(data, null, 2));

    // La API puede retornar 200 aunque haya error, verificar el contenido
    // Si la respuesta tiene un campo de error o no tiene usuario, es un error
    if (!response.ok || data.error || !data.usuario) {
      return {
        success: false,
        message:
          data.mensaje ||
          data.message ||
          data.error ||
          (response.status === 401
            ? "El token de acceso es inválido"
            : response.status === 405
              ? "Método no permitido"
              : response.status === 404
                ? "Endpoint no encontrado"
                : response.status === 400
                  ? "Error en la petición"
                  : response.status === 409
                    ? "Fallo en la conexión con la base de datos"
                    : "Error al iniciar sesión"),
      };
    }

    // Verificar si el usuario está verificado
    if (data.verificado === "No") {
      return {
        success: false,
        needsVerification: true,
        verificado: false,
        message:
          "Usuario sin verificar. Por favor, revise su correo electrónico para validar su cuenta antes de continuar.",
        user: data.usuario,
      };
    }

    // Si hay token, guardarlo en cookies
    if (data.token) {
      const cookieStore = await cookies();
      cookieStore.set("auth-token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 días
      });
    }

    console.log("✅ Login exitoso");

    return {
      success: true,
      verificado: true,
      message: data.mensaje || "Inicio de sesión exitoso",
      user: data.usuario,
      token: data.token,
    };
  } catch (error) {
    console.error("❌ Error en loginAction:", error);
    return {
      success: false,
      message: "Error de conexión. Por favor, intenta nuevamente.",
    };
  }
}

/**
 * Server Action para registro
 * @param credentials - Datos del nuevo usuario
 * @returns Respuesta con el estado del registro
 */
export async function registerAction(
  credentials: RegisterCredentials
): Promise<RegisterResponse> {
  try {
    // Helper para construir el FormData en cada intento
    const buildFormData = (accion?: string) => {
      const fd = new FormData();
      fd.append("nombre", credentials.nombre);
      const telefonoValue =
        typeof credentials.telefono === "number"
          ? credentials.telefono
          : parseInt(String(credentials.telefono), 10) || 0;
      fd.append("telefono", String(telefonoValue));
      fd.append("codigoweb", credentials.codigoweb);
      fd.append("correo", credentials.correo);
      fd.append("contrasena", credentials.contrasena);
      if (accion) fd.append("accion", accion);
      return fd;
    };

    type Attempt = { url: string; accion?: string };
    const attempts: Attempt[] = [
      { url: `${API_BASE_URL}/usuario/register`, accion: "registrar" },
      { url: `${API_BASE_URL}/usuario/register`, accion: "register" },
      { url: `${API_BASE_URL}/usuario/registrar`, accion: "registrar" },
      { url: `${API_BASE_URL}/usuario/registro`, accion: "registrar" },
    ];

    let lastErrorMessage = "";
    for (const attempt of attempts) {
      console.log(
        `🔄 Intento registro -> URL: ${attempt.url} | accion: ${attempt.accion ?? "(sin accion)"}`
      );
      const response = await fetch(attempt.url, {
        method: "POST",
        headers: {
          Authorization: AUTH_HEADER,
          Accept: "application/json",
        },
        body: buildFormData(attempt.accion),
        cache: "no-store",
      });

      console.log("📡 Response status:", response.status, "para", attempt.url);
      console.log("📡 Response ok:", response.ok);

      let data: any = {};
      try {
        data = await response.json();
      } catch (e) {
        console.warn("⚠️ No se pudo parsear JSON de registro en", attempt.url);
      }
      console.log("📦 Data recibida:", JSON.stringify(data, null, 2));

      if (response.ok && !data.error) {
        // Éxito
        return {
          success: true,
          message: data.mensaje || data.message || "Registro exitoso",
          user: data.usuario || data.user,
        };
      }

      // Capturar mensaje de error para diagnóstico y decidir si probamos siguiente intento
      const mapped =
        data.mensaje ||
        data.message ||
        data.error ||
        (response.status === 401
          ? "El token de acceso es inválido"
          : response.status === 405
            ? "Método no permitido"
            : response.status === 404
              ? "Endpoint no encontrado"
              : response.status === 400
                ? "Error en la petición"
                : response.status === 409
                  ? "Fallo en la conexión con la base de datos"
                  : "Error al registrar usuario");

      lastErrorMessage = mapped;

      // Heurística: si la API indica "Accion no valida" o 405/404, probamos el siguiente intento/URL
      const msgLower = String(data.error || data.mensaje || "").toLowerCase();
      const shouldRetry =
        response.status === 405 ||
        response.status === 404 ||
        msgLower.includes("accion no valida");
      if (!shouldRetry) {
        break; // errores tipo 400/401/409, devolvemos directamente
      }
    }

    return {
      success: false,
      message: lastErrorMessage || "Error al registrar usuario",
    };
  } catch (error) {
    console.error("❌ Error en registerAction:", error);
    return {
      success: false,
      message: "Error de conexión. Por favor, intenta nuevamente.",
    };
  }
}

/**
 * Server Action para logout
 * @returns Respuesta con el estado del logout
 */
export async function logoutAction(): Promise<LogoutResponse> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("auth-token");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error en logoutAction:", error);
    return {
      success: false,
    };
  }
}

/**
 * Server Action para recuperar contraseña
 * @param correo - Correo del usuario
 * @returns Respuesta con el estado de la solicitud
 */
export async function forgotPasswordAction(
  correo: string
): Promise<ForgotPasswordResponse> {
  try {
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return {
        success: false,
        message: "Por favor, ingresa un correo electrónico válido",
      };
    }

    // Crear FormData para enviar los datos
    const formData = new FormData();
    formData.append("correo", correo);

    console.log(
      "🔄 Enviando recuperación de contraseña a:",
      `${API_BASE_URL}/usuario/recuperar`
    );

    const response = await fetch(`${API_BASE_URL}/usuario/recuperar`, {
      method: "POST",
      headers: {
        Authorization: AUTH_HEADER,
        Accept: "application/json",
      },
      body: formData,
      cache: "no-store",
    });

    console.log("📡 Response status:", response.status);
    console.log("📡 Response ok:", response.ok);

    let data: any = {};
    try {
      data = await response.json();
    } catch (e) {
      console.warn("⚠️ No se pudo parsear JSON de recuperación");
    }
    console.log("📦 Data recibida:", JSON.stringify(data, null, 2));

    if (!response.ok || data.error) {
      return {
        success: false,
        message:
          data.mensaje ||
          data.message ||
          data.error ||
          (response.status === 401
            ? "El token de acceso es inválido"
            : response.status === 405
              ? "Método no permitido"
              : response.status === 404
                ? "Endpoint no encontrado"
                : response.status === 400
                  ? "Error en la petición"
                  : response.status === 409
                    ? "Fallo en la conexión con la base de datos"
                    : "Error al solicitar recuperación de contraseña"),
      };
    }

    return {
      success: true,
      message:
        data.mensaje ||
        data.message ||
        "Se ha enviado un enlace de recuperación a tu correo electrónico",
    };
  } catch (error) {
    console.error("❌ Error en forgotPasswordAction:", error);
    return {
      success: false,
      message: "Error de conexión. Por favor, intenta nuevamente.",
    };
  }
}
