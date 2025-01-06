export function getFullPath(path: string): string {
  console.log('path:', import.meta.env.VITE_API_URL + path)
  return import.meta.env.VITE_API_URL + path;
}
