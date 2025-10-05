import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { Unity, useUnityContext } from "react-unity-webgl";
import { PageTransition } from "@/components/page-transition";
import { checkAuth } from "@/server-functions/check-auth";
import { checkDiscordGuild } from "@/server-functions/check-discord-guild";
import { UNITY_SPORTS_RESORT } from "./-constant";

export const Route = createFileRoute("/unity-sports-resort/")({
  beforeLoad: async () => {
    await checkAuth();
    await checkDiscordGuild();
  },
  component: RouteComponent,
  head: () => ({
    links: [
      { href: UNITY_SPORTS_RESORT.codeUrl, rel: "prefetch" },
      { href: UNITY_SPORTS_RESORT.dataUrl, rel: "prefetch" },
      { href: UNITY_SPORTS_RESORT.frameworkUrl, rel: "prefetch" },
      { href: UNITY_SPORTS_RESORT.loaderUrl, rel: "prefetch" },
    ],
  }),
});

function RouteComponent() {
  const { unityProvider } = useUnityContext({
    codeUrl: UNITY_SPORTS_RESORT.codeUrl,
    dataUrl: UNITY_SPORTS_RESORT.dataUrl,
    frameworkUrl: UNITY_SPORTS_RESORT.frameworkUrl,
    loaderUrl: UNITY_SPORTS_RESORT.loaderUrl,
  });

  return (
    <PageTransition>
      <ClientOnly>
        <Unity
          style={{ height: "100vh", width: "100vw" }}
          unityProvider={unityProvider}
        />
      </ClientOnly>
    </PageTransition>
  );
}
