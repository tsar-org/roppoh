import { createTRPCClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "./router";

interface Args {
  url: string;
}

export const createTrpcClient = (args: Args) =>
  createTRPCClient<AppRouter>({
    links: [httpBatchLink({ transformer: superjson, url: args.url })],
  });
