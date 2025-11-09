import { useEffect, useState } from "react";
import { Outlet, redirect, useLoaderData } from "react-router";
import { Loading } from "@/components/loading";
import TypesafeI18n from "@/i18n/i18n-react";
import { isLocale } from "@/i18n/i18n-util";
import { loadLocaleAsync } from "@/i18n/i18n-util.async";
import type { Route } from "./+types/layout";

export async function loader({ params }: Route.LoaderArgs) {
  const lang = params.lang;

  if (!isLocale(lang)) return redirect("/404");

  return { locale: lang };
}

/**
 * Language handler layout
 *
 * Handles:
 * - Detecting and validating locale from URL params
 * - Redirecting to language path if missing
 * - Loading locale files
 *
 * Passes locale data down to client-side-root which wraps with TypesafeI18n context
 */
export default function () {
  const data = useLoaderData<typeof loader>();
  const [localesLoaded, setLocalesLoaded] = useState(false);

  useEffect(() => {
    loadLocaleAsync(data.locale).then(() => setLocalesLoaded(true));
  }, [data.locale]);

  if (!localesLoaded) return <Loading />;

  return (
    <TypesafeI18n locale={data.locale}>
      <Outlet />
    </TypesafeI18n>
  );
}
