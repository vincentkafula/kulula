const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function get(path, fallback) {
  try {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`Falling back for ${path}:`, err.message);
    return fallback;
  }
}

export function getHeadlines(fallback) {
  return get("/api/headlines", fallback);
}
export function getHero(fallback) {
  return get("/api/hero", fallback);
}
export function getNews(fallback) {
  return get("/api/news", fallback);
}
export function getCategories(fallback) {
  return get("/api/categories", fallback);
}
export function getOnAir(fallback) {
  return get("/api/onair", fallback);
}
export function getTvHighlights(fallback) {
  return get("/api/tv-highlights", fallback);
}
export function getSchedule(fallback) {
  return get("/api/schedule", fallback);
}

export async function subscribeNewsletter(email) {
  const res = await fetch(`${API_BASE}/api/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
  if (!res.ok) throw new Error("Subscription failed");
  return res.json();
}
