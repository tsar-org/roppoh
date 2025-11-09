import { createCookie } from "react-router";

/**
 * i18n user lang
 * FYI: https://github.com/codingcommons/typesafe-i18n/blob/main/packages/detectors/README.md#cookies
 */
export const userLangCookie = createCookie("user-lang", {
  httpOnly: false,
  maxAge: 31_536_000, // one year
  path: "/",
  sameSite: "strict",
  secure: true,
});
