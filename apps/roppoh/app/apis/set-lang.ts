import { data } from "react-router";
import { isLocale } from "@/i18n/i18n-util";
import { userLangCookie } from "@/utils/cookie.server";
import type { Route } from "./+types/set-lang";

export async function action({ params }: Route.ActionArgs) {
  const lang = params.lang.trim();

  if (!isLocale(lang)) return data({ message: "invalid lang" }, 400);

  const cookie = await userLangCookie.serialize({ lang });

  return data(
    {},
    {
      headers: { "Set-Cookie": cookie },
      status: 200,
    },
  );
}
