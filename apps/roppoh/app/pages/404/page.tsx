import { ArrowUpRightIcon } from "lucide-react";
import { Link } from "react-router";
import { useI18nContext } from "@/i18n/i18n-react";
import { Button } from "@/shadcn/components/ui/button";
import { generateBaseMeta } from "@/utils/base-meta-function";
import { themeSessionResolver } from "@/utils/sessions.server";
import type { Route } from "./+types/page";

export async function loader({ request, context }: Route.LoaderArgs) {
  const { getTheme } = await themeSessionResolver(request);

  return {
    baseUrl: context.cf.env.VITE_BASE_URL,
    theme: getTheme(),
  };
}

export const meta = ({ loaderData }: Route.MetaArgs) => [
  ...generateBaseMeta({
    baseUrl: loaderData.baseUrl,
    theme: loaderData.theme,
    title: "404",
  }),
];

export default function NotFoundPage() {
  const { locale } = useI18nContext();

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        fontSize: "2rem",
        fontWeight: "bold",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      404 Page Not Found
      <br />
      <Link to={`/${locale}`}>
        <Button variant="link">
          back to top page <ArrowUpRightIcon />
        </Button>
      </Link>
    </div>
  );
}
