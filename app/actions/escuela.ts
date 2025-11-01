"use server";

import { cookies } from "next/headers";
import type { EscuelaInfo } from "@/types/escuela";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://libmich.com/bookit/api";
const API_AUTH_KEY = process.env.API_AUTHORIZATION_KEY || "1a?+Y|F2B6kqzS8";
const AUTH_HEADER = API_AUTH_KEY.startsWith("Bearer ")
  ? API_AUTH_KEY
  : `Bearer ${API_AUTH_KEY}`;

export type EscuelaInfoResponse =
  | { success: true; data: EscuelaInfo }
  | { success: false; message: string; status?: number };

export type EscuelasResponse =
  | {
      success: true;
      escuelas: EscuelaInfo[];
    }
  | {
      success: false;
      message: string;
      status?: number;
    };

export async function getEscuelaInfo(
  codigoWeb: string
): Promise<EscuelaInfoResponse> {
  try {
    const url = `${API_BASE_URL}/escuela/consulta/${encodeURIComponent(codigoWeb)}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: AUTH_HEADER,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch {}

    if (!res.ok) {
      const message =
        data?.error ||
        (res.status === 401
          ? "El token de acceso es inválido"
          : res.status === 405
            ? "Método no permitido"
            : res.status === 404
              ? "Endpoint no encontrado"
              : res.status === 400
                ? "Error en la petición"
                : res.status === 409
                  ? "Fallo en la conexión con la base de datos"
                  : "Error al obtener información de la escuela");
      return { success: false, message, status: res.status };
    }

    // Normalizar objetos con índices numéricos a arrays
    if (data && typeof data === "object") {
      // Convertir Listas de objeto a array
      if (
        data.Listas &&
        typeof data.Listas === "object" &&
        !Array.isArray(data.Listas)
      ) {
        data.Listas = Object.values(data.Listas);
      }

      // Convertir Libros dentro de cada Lista de objeto a array
      if (Array.isArray(data.Listas)) {
        data.Listas = data.Listas.map((lista: any) => {
          if (
            lista.Libros &&
            typeof lista.Libros === "object" &&
            !Array.isArray(lista.Libros)
          ) {
            return { ...lista, Libros: Object.values(lista.Libros) };
          }
          return lista;
        });
      }
    }

    return { success: true, data };
  } catch (e) {
    return {
      success: false,
      message: "Error de conexión. Por favor, intenta nuevamente.",
    };
  }
}

export async function getEscuelasVinculadas(
  idUsuario: string
): Promise<EscuelasResponse> {
  try {
    const url = `${API_BASE_URL}/escuela/vinculados/${encodeURIComponent(idUsuario)}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: AUTH_HEADER,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch {}

    if (!res.ok) {
      const message =
        data?.error ||
        (res.status === 401
          ? "El token de acceso es inválido"
          : res.status === 405
            ? "Método no permitido"
            : res.status === 404
              ? "Endpoint no encontrado"
              : res.status === 400
                ? "Error en la petición"
                : res.status === 409
                  ? "Fallo en la conexión con la base de datos"
                  : "Error al obtener escuelas vinculadas");
      return { success: false, message, status: res.status };
    }

    // La API puede retornar un objeto con índices numéricos o un array
    let codes: string[] = [];
    if (Array.isArray(data)) {
      codes = data;
    } else if (data && typeof data === "object") {
      // Convertir objeto con índices numéricos a array
      codes = Object.values(data).filter(
        (v): v is string => typeof v === "string"
      );
    }
    if (codes.length === 0) {
      return { success: true, escuelas: [] };
    }

    // Consultar info completa de cada escuela
    const escuelasPromises = codes.map((code) => getEscuelaInfo(code));
    const escuelasResults = await Promise.all(escuelasPromises);

    const escuelas: EscuelaInfo[] = [];
    for (let i = 0; i < escuelasResults.length; i++) {
      const result = escuelasResults[i];
      if (result.success) {
        escuelas.push(result.data);
      }
    }
    return { success: true, escuelas };
  } catch (e) {
    return {
      success: false,
      message: "Error de conexión. Por favor, intenta nuevamente.",
    };
  }
}

export async function getUserIdFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const id = cookieStore.get("user-id")?.value;
  if (id && /^\d+$/.test(id)) return id;
  // Como fallback, si auth-token es numérico, úsalo como id
  const token = cookieStore.get("auth-token")?.value;
  if (token && /^\d+$/.test(token)) return token;
  return null;
}

export type VincularEscuelaResponse =
  | { success: true; message: string }
  | { success: false; message: string; status?: number };

export async function vincularEscuela(
  idUsuario: number | string,
  codigoweb: string
): Promise<VincularEscuelaResponse> {
  try {
    const formData = new FormData();
    formData.append("id", String(idUsuario));
    formData.append("codigoweb", String(codigoweb));

    const res = await fetch(`${API_BASE_URL}/escuela/vincular`, {
      method: "POST",
      headers: {
        Authorization: AUTH_HEADER,
        Accept: "application/json",
      },
      body: formData,
      cache: "no-store",
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch {}

    if (!res.ok || data?.error) {
      const message =
        data?.error ||
        (res.status === 401
          ? "El token de acceso es inválido"
          : res.status === 405
            ? "Método no permitido"
            : res.status === 404
              ? "Endpoint no encontrado"
              : res.status === 400
                ? "Error en la petición"
                : res.status === 409
                  ? "Fallo en la conexión con la base de datos"
                  : "No se pudo vincular la escuela");
      return { success: false, message, status: res.status };
    }

    return {
      success: true,
      message:
        data?.mensaje || data?.message || "Escuela vinculada correctamente",
    };
  } catch (e) {
    return {
      success: false,
      message: "Error de conexión. Por favor, intenta nuevamente.",
    };
  }
}
