import { useCallback, useEffect } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import type { Locales } from "@/i18n/i18n-types";

export const useHtmlTagLangAttribute = () => {
  const { locale } = useI18nContext();

  /**
   * Converts typesafe-i18n locale format (ja-JP) to HTML lang attribute format (ja)
   * @param localeValue - The locale value from typesafe-i18n
   * @returns Locale string for HTML lang attribute
   */
  const getLocaleString = useCallback((localeValue: Locales): string => {
    const [lang] = localeValue.split("-");
    return lang || localeValue;
  }, []);

  useEffect(() => {
    // Set HTML lang attribute with converted locale format (ja)
    const langAttribute = getLocaleString(locale);
    document.documentElement.setAttribute("lang", langAttribute);
  }, [locale, getLocaleString]);

  return {};
};
