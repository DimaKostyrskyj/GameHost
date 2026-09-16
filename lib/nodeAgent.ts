export async function nodeRequest(path: string, body?: unknown) {
  const base = process.env.NODE_AGENT_URL;
  const token = process.env.NODE_AGENT_TOKEN;
  if (!base || !token) return { connected: false, data: null };
  const response = await fetch(`${base.replace(/\/$/, "")}${path}`, {
    method: body === undefined ? "GET" : "POST",
    headers: { Authorization: `Bearer ${token}`, ...(body === undefined ? {} : { "Content-Type": "application/json" }) },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Node error ${response.status}`);
  return { connected: true, data };
}
