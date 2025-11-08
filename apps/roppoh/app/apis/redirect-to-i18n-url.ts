// FYI: https://www.better-auth.com/docs/integrations/remix#create-api-route

import { type } from "arktype";
import { redirect } from "react-router";
import { baseLocale, isLocale } from "@/i18n/i18n-util";
import { userLangCookie } from "@/utils/cookie.server";
import type { Route } from "./+types/redirect-to-i18n-url";

const UserLangCookieSchema = type({
  lang: "string",
});

/**
 * When the root path "/" is accessed,
 * reads the cookie and redirects based on the language setting stored in the cookie.
 */
export async function loader({ request }: Route.LoaderArgs) {
  const pathname = new URL(request.url).pathname;
  const cookieHeader = request.headers.get("Cookie") ?? "";

  const parsedCookie = await userLangCookie.parse(cookieHeader);

  const validated = UserLangCookieSchema(parsedCookie);

  if (validated instanceof type.errors || !isLocale(validated.lang))
    return redirect(`/${baseLocale}${pathname}`);

  return redirect(`/${validated.lang}${pathname}`);
}
