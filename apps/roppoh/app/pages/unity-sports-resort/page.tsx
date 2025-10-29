import PageTransition from "@/components/page-transition";
import { generateBaseMeta } from "@/utils/base-meta-function";
import { themeSessionResolver } from "@/utils/sessions.server";
import type { Route } from "./+types/page";
import UnitySportsResort from "./components/unity-sports-resort";

export const meta = ({ loaderData }: Route.MetaArgs) => [
  ...generateBaseMeta({
    baseUrl: loaderData.baseUrl,
    theme: loaderData.theme,
    title: "Unity Sports Resort",
  }),
];

export async function loader({ request, context }: Route.LoaderArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    baseUrl: context.cf.env.VITE_BASE_URL,
    theme: getTheme(),
  };
}

export default function () {
  return (
    <PageTransition>
      <UnitySportsResort />
    </PageTransition>
  );
}
