export const VRT_ENV = {
  VITE_ZUNPACHI_API_URL: "http://localhost:3002",
} as const;

export const textMatrix = [
  {
    device: "desktop",
    name: "desktop dark",
    theme: "dark",
  },
  {
    device: "desktop",
    name: "desktop light",
    theme: "light",
  },
  {
    device: "mobile",
    name: "mobile dark",
    theme: "dark",
  },
  {
    device: "mobile",
    name: "mobile light",
    theme: "light",
  },
] as const;
