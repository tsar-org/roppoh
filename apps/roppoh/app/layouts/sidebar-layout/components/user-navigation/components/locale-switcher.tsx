import { regex } from "arkregex";
import { Languages } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useI18nContext } from "@/i18n/i18n-react";
import type { Locales } from "@/i18n/i18n-types";
import { isLocale } from "@/i18n/i18n-util";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/shadcn/components/ui/dropdown-menu";

const LOCALE_LABELS: Record<Locales, string> = {
  ar: "العربية",
  en: "English",
  "ja-JP": "日本語",
};

// Type-safe path parsing regex with named capture groups
const pathRegex = regex("^/(?<locale>[^/]*)(?<path>.*)$");

export function LocaleSwitcher() {
  const { locale, setLocale } = useI18nContext();
  const navigate = useNavigate();
  const location = useLocation();

  const stripLocalePrefix = (pathname: string): string => {
    const match = pathRegex.exec(pathname);
    if (!match?.groups) return pathname;

    const potential = match.groups.locale;
    const rest = match.groups.path;
    // isLocale is a type guard function that verifies potential is a valid Locale
    return isLocale(potential) ? rest || "" : pathname;
  };

  const switchLocale = (newLocale: Locales) => {
    setLocale(newLocale);

    // Remove the current locale prefix from the path and add the new locale prefix
    const pathWithoutLocale = stripLocalePrefix(location.pathname);
    navigate(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="w-full">
        <Languages />
        <p>{LOCALE_LABELS[locale]}</p>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => switchLocale("ar")}>
            {LOCALE_LABELS.ar}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => switchLocale("en")}>
            {LOCALE_LABELS.en}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => switchLocale("ja-JP")}>
            {LOCALE_LABELS["ja-JP"]}
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
