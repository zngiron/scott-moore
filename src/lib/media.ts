import { env } from '@/lib/env';

export function getMediaUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${env.STORAGE_URL}/${cleanPath}`;
}
