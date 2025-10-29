import { Unity, useUnityContext } from "react-unity-webgl";
import PageTransition from "@/components/page-transition";
import { Progress } from "@/shadcn/components/ui/progress";
import { generateBaseMeta } from "@/utils/base-meta-function";
import { themeSessionResolver } from "@/utils/sessions.server";
import type { Route } from "./+types/page";

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
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    codeUrl:
      "https://roppoh-assets.tsar-bmb.org/unity-sports-resort.wasm.unityweb",
    dataUrl:
      "https://roppoh-assets.tsar-bmb.org/unity-sports-resort.data.unityweb",
    frameworkUrl:
      "https://roppoh-assets.tsar-bmb.org/unity-sports-resort.framework.js.unityweb",
    loaderUrl:
      "https://roppoh-assets.tsar-bmb.org/unity-sports-resort.loader.js",
  });

  return (
    <PageTransition>
      {!isLoaded && (
        <Progress
          className="absolute top-0 right-0 bottom-0 left-0 m-auto w-[60%]"
          value={Math.round(loadingProgression * 100)}
        />
      )}
      <Unity
        style={{
          height: "100vh",
          visibility: isLoaded ? "visible" : "hidden",
          width: "100vw",
        }}
        unityProvider={unityProvider}
      />
    </PageTransition>
  );
}
