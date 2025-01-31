import { NextResponse, NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const requestBody = (await req.json()) as { code: string };
    const code = requestBody.code;
    if (!code) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

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

    const accessToken = (
      (await response.json()) as {
        access_token: string;
      }
    ).access_token;

    return NextResponse.json({
      access_token: accessToken,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
