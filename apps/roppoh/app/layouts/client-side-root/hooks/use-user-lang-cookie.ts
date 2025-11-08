import Cookies from "js-cookie";
import { useCallback, useEffect } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import type { Locales } from "@/i18n/i18n-types";

export const useUserLangCookie = () => {
  const { locale } = useI18nContext();

  const getCookieLang = () => {
    const raw = Cookies.get("user-lang");
    if (!raw) return undefined;
    try {
      return JSON.parse(atob(raw)).lang;
    } catch {
      return undefined;
    }
  };

  const cookieLang = getCookieLang();

  const syncUserLangCookie = useCallback(
    async (locale: Locales) => {
      if (cookieLang === locale) return;

      await fetch(`/api/set-lang/${locale}`, { method: "POST" });
    },
    [cookieLang],
  );

  useEffect(() => {
    const effect = async () => {
      await syncUserLangCookie(locale);
    };
    effect();
  }, [locale, syncUserLangCookie]);

  return {};
};
