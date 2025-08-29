export function parseJSON(value: string | null) {
  try {
    if (value) {
        return JSON.parse(value);
    }
  } catch {}
  return []
}