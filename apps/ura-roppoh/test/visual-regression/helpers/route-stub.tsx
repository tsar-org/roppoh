import { createRoutesStub } from "react-router";
import { Root } from "@/root";

// import css
import "@/global.css";

export type RouteChildren = Parameters<
  typeof createRoutesStub
>[0][0]["children"];

interface Args {
  routeChildren: RouteChildren;
}

export const createRootRouteStub = (args: Args) =>
  createRoutesStub([
    {
      Component: Root,
      children: args.routeChildren,
    },
  ]);
