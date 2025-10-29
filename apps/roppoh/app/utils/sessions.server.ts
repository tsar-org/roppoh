import { createCookieSessionStorage } from "react-router";
import { createThemeSessionResolver } from "remix-themes";

const themeSessionStorage = createCookieSessionStorage({
  cookie: {
    httpOnly: true,
    name: "theme",
    path: "/",
    sameSite: "strict",
    secrets: ["s3cr3t"],
    secure: true,
  },
});

export const themeSessionResolver =
  createThemeSessionResolver(themeSessionStorage);
