// ------------------------------------------------------------------
// utils/auth.js
// • Manejo del JWT (localStorage)
// • Función isAdmin() acepta "ROLE_ADMIN" o simplemente "ADMIN"
// ------------------------------------------------------------------
import { jwtDecode } from "jwt-decode";   // v4: import { jwtDecode } from …

let cache = null;                        // evita decodificar muchas veces

/* ───── token crudo ─────────────────────────────────────────────── */
export function getToken() {
  return localStorage.getItem("token");
}

/* ───── payload decodificado ────────────────────────────────────── */
export function getTokenData() {
  if (cache) return cache;

  const t = getToken();
  if (!t) return null;

  try {
    cache = jwtDecode(t);                // decodifica Base64-URL
    return cache;
  } catch {
    return null;
  }
}

/* ───── ¿tiene rol de administrador? ────────────────────────────── */
export function isAdmin() {
  const d = getTokenData();
  if (!d) return false;

  // Spring puede mandarlo en varias formas:
  //  A) authorities:[{authority:"ROLE_ADMIN"}]
  //  B) role:[{authority:"ADMIN"}]
  //  C) roles:["ROLE_ADMIN"]  (o "ADMIN")
  const raw = d.authorities || d.roles || d.role || [];

  if (Array.isArray(raw)) {
    return raw.some((r) => {
      const val = typeof r === "string" ? r : r.authority;
      return val === "ROLE_ADMIN" || val === "ADMIN";
    });
  }
  // si viene como string
  return raw === "ROLE_ADMIN" || raw === "ADMIN";
}

/* ───── cabecera Authorization para fetch() ─────────────────────── */
export function authHeader() {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

/* ───── helper visible sólo en modo dev (para consola) ──────────── */
if (import.meta.env.DEV) {
  window.getTokenData = getTokenData;
}
