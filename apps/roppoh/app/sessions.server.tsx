import { createCookieSessionStorage } from "react-router";
import { createThemeSessionResolver } from "remix-themes";

const themeSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secrets: ["s3cr3t"],
    secure: true,
  },
});

export const themeSessionResolver = createThemeSessionResolver(themeSessionStorage);
