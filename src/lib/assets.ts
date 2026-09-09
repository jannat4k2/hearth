/**
 * Resolve a file from Vite's public directory against the configured base path.
 * With `base: "./"` this stays portable on any GitHub Pages repository URL.
 */
export function assetUrl(path: string): string {
  const cleanPath = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
