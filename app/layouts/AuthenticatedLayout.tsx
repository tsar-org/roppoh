import { clientSideEnv } from "@/lib/clientSideEnv";
import { tokenCookie, tokenCookieSchema } from "@/lib/cookie";
import { useDiscordUser, useIsGuildMember } from "@/lib/swr/discrod";
import { localStorageProvider } from "@/lib/swr/localStorageProvider";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router";
import { SWRConfig } from "swr";
import * as v from "valibot";
import type { Route } from "./+types/AuthenticatedLayout";

export async function loader({ request }: Route.ClientLoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const token = await tokenCookie.parse(cookieHeader);

  const safeToken = v.safeParse(tokenCookieSchema, token);
  if (!safeToken.success) {
    console.log("Token cookie is invalid");
    return redirect("/login");
  }

  return safeToken.output;
}

export default function AuthenticatedLayout() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const discordUser = useDiscordUser(data.access_token);
  const isGuildMember = useIsGuildMember(
    data.access_token,
    clientSideEnv.TSAR_GUILD_ID,
  );

  // Loading state
  // TODO: More user-friendly loading message
  if (discordUser.isLoading || isGuildMember.isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  // TODO: More user-friendly error message
  if (discordUser.isError || isGuildMember.isError) {
    return (
      <div>
        Error loading user data. Please try again.
        <button type="button" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    );
  }

  // Not a guild member
  // TODO: More user-friendly error message
  if (!isGuildMember.isMember) {
    return <div>You are not tsar member</div>;
  }

  return (
    <>
      <SWRConfig
        value={{
          provider: localStorageProvider,
          refreshInterval: 10000,
          revalidateIfStale: false,
        }}
      >
        <Outlet />
      </SWRConfig>
    </>
  );
}
