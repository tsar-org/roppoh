import { type AnyRouter, initTRPC } from "@trpc/server";
import {
  type FetchCreateContextFn,
  type FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import superjson from "superjson";
import { appRouter } from "./router";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create({ transformer: superjson });

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const procedure = t.procedure;

export const createFetchRequestHandler = (args: {
  endpoint: string;
  request: Request;
}) =>
  fetchRequestHandler({
    createContext: createContext,
    endpoint: args.endpoint,
    req: args.request,
    router: appRouter,
  });

type contextFn = FetchCreateContextFn<AnyRouter>;

export const createContext = async (_options: FetchCreateContextFnOptions) => {
  return {};
};

export type Context = Awaited<ReturnType<typeof createContext>>;
