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
  VerifyAccountResponse,
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

    const response = await fetch(`${API_BASE_URL}/usuario/login`, {
      method: "POST",
      headers: {
        Authorization: AUTH_HEADER,
        Accept: "application/json",
      },
      body: formData,
      cache: "no-store",
    });

    let data: any = {};
    try {
      data = await response.json();
    } catch (e) {
      console.warn("⚠️ No se pudo parsear JSON de login");
    }

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

    // Si hay token, guardarlo en cookies; si no, usar el id de usuario como token temporal
    const cookieStore = await cookies();
    const tokenValue = data.token || String(data.usuario?.id || "");
    if (tokenValue) {
      cookieStore.set("auth-token", tokenValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 días
      });
    }

    // Guardar también el user-id explícito para llamadas que requieran el idUsuario
    if (data.usuario?.id) {
      cookieStore.set("user-id", String(data.usuario.id), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    // Guardar nombre y correo para mostrar en el avatar del dashboard
    const userName: string | undefined =
      data.usuario?.nombre ||
      data.usuario?.nombre_completo ||
      data.usuario?.name;
    const userEmail: string | undefined =
      data.usuario?.correo || data.usuario?.email;
    if (userName) {
      cookieStore.set("user-name", String(userName), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
    }
    if (userEmail) {
      cookieStore.set("user-email", String(userEmail), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

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
      const response = await fetch(attempt.url, {
        method: "POST",
        headers: {
          Authorization: AUTH_HEADER,
          Accept: "application/json",
        },
        body: buildFormData(attempt.accion),
        cache: "no-store",
      });

      let data: any = {};
      try {
        data = await response.json();
      } catch (e) {
        console.warn("⚠️ No se pudo parsear JSON de registro en", attempt.url);
      }

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
    cookieStore.delete("user-id");
    cookieStore.delete("user-name");
    cookieStore.delete("user-email");

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
 * Obtener el perfil básico del usuario desde cookies (nombre y correo)
 */
export async function getUserProfileFromCookies(): Promise<{
  name: string | null;
  email: string | null;
}> {
  const cookieStore = await cookies();
  const name = cookieStore.get("user-name")?.value || null;
  const email = cookieStore.get("user-email")?.value || null;
  return { name, email };
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
    const response = await fetch(`${API_BASE_URL}/usuario/recuperar`, {
      method: "POST",
      headers: {
        Authorization: AUTH_HEADER,
        Accept: "application/json",
      },
      body: formData,
      cache: "no-store",
    });

    let data: any = {};
    try {
      data = await response.json();
    } catch (e) {
      console.warn("⚠️ No se pudo parsear JSON de recuperación");
    }

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

/**
 * Server Action para verificar cuenta
 * @param id - ID del usuario
 * @param codigo - Código OTP de verificación
 */
export async function verifyAccountAction(
  id: number,
  codigo: number
): Promise<VerifyAccountResponse> {
  try {
    const formData = new FormData();
    formData.append("id", String(id));
    formData.append("codigo", String(codigo));

    const response = await fetch(`${API_BASE_URL}/usuario/verificar`, {
      method: "POST",
      headers: {
        Authorization: AUTH_HEADER,
        Accept: "application/json",
      },
      body: formData,
      cache: "no-store",
    });

    let data: any = {};
    try {
      data = await response.json();
    } catch (e) {
      console.warn("⚠️ No se pudo parsear JSON de verificación");
    }

    if (!response.ok || data.error) {
      const message =
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
                  : "Error al verificar cuenta");
      return { success: false, message };
    }

    return {
      success: true,
      message: data.mensaje || data.message || "Verificación exitosa",
    };
  } catch (error) {
    console.error("❌ Error en verifyAccountAction:", error);
    return {
      success: false,
      message: "Error de conexión. Por favor, intenta nuevamente.",
    };
  }
}
