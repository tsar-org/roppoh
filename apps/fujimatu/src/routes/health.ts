import { Hono } from "hono";
import type { Env } from "../middlewares/dependency-injection";

export const health = new Hono<Env>().get("", (c) =>
  c.json({ message: "OK" }, 200),
);
