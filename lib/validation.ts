export function normalizeEmail(value: unknown) {
  return String(value ?? "").trim().toLowerCase();
}

export function normalizeUsername(value: unknown) {
  return String(value ?? "").trim();
}

export function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validUsername(username: string) {
  return /^[a-zA-Z0-9_-]{3,32}$/.test(username);
}
