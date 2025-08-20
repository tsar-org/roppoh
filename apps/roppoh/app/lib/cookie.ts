import { createCookie } from "react-router";
import * as v from "valibot";

export const tokenCookieSchema = v.object({
  access_token: v.string(),
  token_type: v.string(),
  expires_in: v.number(),
  refresh_token: v.string(),
  scope: v.string(),
  webhook: v.optional(v.any()),
});

export const tokenCookie = createCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  secrets: ["aamsgjbjxm"],
});
