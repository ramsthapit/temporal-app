export async function greet(name: string): Promise<string> {
  return `Hello, ${name}!`;
}

export async function get_container_details(container_no: string) {
  if (!container_no?.trim()) return "Please provide a valid container number.";

  const url = new URL("https://businquiry.portsamerica.com/api/track/GetContainers");
  url.search = new URLSearchParams({
    siteId: "PNCT_NJ",
    key: container_no.trim().toUpperCase(),
    _: Date.now().toString(),
  }).toString();

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  } catch (err) {
    return `Request failed: ${(err as Error).message}`;
  }
}

export async function pnct_empty_return() {
  const url = new URL("https://pnct.net/EmptyReturn");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.text();
  return data;
}