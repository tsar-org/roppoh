import { env } from "cloudflare:workers";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createDiscordApiClient } from "@/libs/discordjs/client.server";

/**
 * Check users discord guild
 *
 * - if user dose not joined tsar guilds, then redirect /login
 */
export const checkDiscordGuild = createServerFn({ method: "GET" }).handler(
  async ({ context }) => {
    try {
      const headers = getRequest().headers;

      const accessToken = await context.deps.betterAuth.api.getAccessToken({
        body: { providerId: "discord" },
        headers: headers,
      });

      // get user guilds
      const client = createDiscordApiClient({ token: accessToken.accessToken });
      const guilds = await client.users.getGuilds();

      // check if user is in the specified guild
      const isMember = guilds.some((guild) => guild.id === env.TSAR_GUILD_ID);
      if (!isMember) throw redirect({ to: "/login" });
    } catch (error) {
      context.deps.logger.error(error, "failed to check users discord guilds");
      throw redirect({ to: "/login" });
    }
  },
);
