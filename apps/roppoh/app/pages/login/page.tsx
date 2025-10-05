import { Theme, useTheme } from "remix-themes";
import PageTransition from "@/components/PageTransition";
import { ToggleThemeButton } from "@/components/ToggleThemeButton";
import { TsarOrganizationLink } from "@/components/TsarOrganizationLink";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/betterAuth/auth.client";
import discordMarkBlack from "./assets/discord-mark-black.svg";
import discordMarkWhite from "./assets/discord-mark-white.svg";

export default function TopPage() {
  const [theme] = useTheme();
  const signIn = async () => {
    await authClient.signIn.social({
      provider: "discord",
      scopes: ["identify", "guilds"],
    });
  };

  return (
    <PageTransition>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-between">
            <TsarOrganizationLink />
            <ToggleThemeButton />
          </div>

          <div className="mt-1 flex w-full flex-1 flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="font-bold text-4xl">Roppoh</h1>
              <p className="text-balance text-muted-foreground text-sm">
                Roppoh is discord activity hosting server
              </p>
            </div>
            <Button className="w-sm cursor-pointer" onClick={signIn}>
              {theme === Theme.LIGHT ? (
                <img
                  alt="discord-mark-white"
                  src={discordMarkWhite}
                  width={20}
                />
              ) : (
                <img
                  alt="discord-mark-white"
                  src={discordMarkBlack}
                  width={20}
                />
              )}
              Login with Discord
            </Button>
          </div>
        </div>

        <div className="relative hidden bg-muted lg:block">
          <img
            alt="tsar-org-icon"
            className="absolute inset-0 size-full dark:brightness-[0.2] dark:grayscale"
            src="/icons/tsar-icon.png"
          />
        </div>
      </div>
    </PageTransition>
  );
}
