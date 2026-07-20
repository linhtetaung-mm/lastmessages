const encoder = new TextEncoder();
const tokenPayload = "lastmessages-access-v1";

function encode(value: ArrayBuffer) {
  const bytes = new Uint8Array(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decode(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  return Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
}

async function signingKey() {
  const secret = process.env.ACCESS_SESSION_SECRET;
  if (!secret) throw new Error("ACCESS_SESSION_SECRET is not configured.");
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function createAccessToken() {
  const signature = await crypto.subtle.sign("HMAC", await signingKey(), encoder.encode(tokenPayload));
  return `${tokenPayload}.${encode(signature)}`;
}

export async function verifyAccessToken(token?: string) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (payload !== tokenPayload || !signature) return false;
  try {
    return crypto.subtle.verify("HMAC", await signingKey(), decode(signature), encoder.encode(payload));
  } catch {
    return false;
  }
}

export const ACCESS_COOKIE = "lastmessages_access";
