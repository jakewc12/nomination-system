export function getFullPath(path: string): string {
  console.log('getFullPath', path);
  return import.meta.env.VITE_API_URL + path;
}
