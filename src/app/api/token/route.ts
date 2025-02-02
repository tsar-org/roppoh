import { getRequestContext } from "@cloudflare/next-on-pages";
import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import * as v from "valibot";

export const runtime = "edge";

const tokenApi = new Hono().basePath("/api");

export const POST = handle(tokenApi);

const requestBodySchema = v.object({
  code: v.string(),
});

const discordTokenResponseSchema = v.object({
  access_token: v.string(),
  expires_in: v.number(),
  refresh_token: v.string(),
  scope: v.string(),
  token_type: v.string(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const postTokenApiRoute = tokenApi.post(
  "/token",
  vValidator("json", requestBodySchema, (result, c) => {
    if (!result.success) {
      return c.json({ message: "Bad Request" }, 400);
    }
  }),
  async (c) => {
    const code = c.req.valid("json").code;

    const env = getRequestContext().env;

    const response = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: env.DISCORD_ID,
        client_secret: env.DISCORD_SECRET,
        grant_type: "authorization_code",
        code: code,
      }),
    });

    if (400 <= response.status && response.status < 500) {
      return c.json(
        {
          message: "Bad Request",
          error: "catch status code over 400 and under 500",
        },
        400,
      );
    }

    if (500 <= response.status || !response.ok) {
      return c.json(
        {
          message: "Internal Server Error",
          error: "catch status code over 500 or not 200",
        },
        500,
      );
    }

    // discord response validation
    const safeDiscordTokenResponseBody = v.safeParse(
      discordTokenResponseSchema,
      await response.json(),
    );

    if (!safeDiscordTokenResponseBody.success) {
      return c.json(
        {
          message: "Internal Server Error",
          error: "discord response validation failed",
        },
        500,
      );
    }

    return c.json(
      {
        access_token: safeDiscordTokenResponseBody.output.access_token,
      },
      200,
    );
  },
);

export type postTokenApiRouteType = typeof postTokenApiRoute;
