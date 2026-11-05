import { authClient } from "./auth-client";

const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const { data } = await authClient.token();
    if (data?.token) headers.Authorization = `Bearer ${data.token}`;
  }

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || "Something went wrong. Please try again.");
  return json;
}

export function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
