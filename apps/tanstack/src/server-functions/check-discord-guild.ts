import { env } from "cloudflare:workers";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createBetterAuthInstance } from "@/libs/better-auth/auth.server";
import { createDiscordApiClient } from "@/libs/discordjs/client.server";
import { createLogger } from "@/libs/pino/logger.server";

/**
 * Check users discord guild
 *
 * - if user dose not joined tsar guilds, then redirect /login
 */
export const checkDiscordGuild = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const request = getRequest();
      const headers = request.headers;
      const auth = createBetterAuthInstance({ env });

      const accessToken = await auth.api.getAccessToken({
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
      const logger = createLogger();
      logger.error(error, "failed to check auth: ");
      throw redirect({ to: "/login" });
    }
  },
);
