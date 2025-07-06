
export function useConstructUrl(key: string): string {
  return `https://${process.env.NEXT_PUBLIC_BACKET_NAME_STORAGE}.fly.storage.tigris.dev/${key}`;
}
