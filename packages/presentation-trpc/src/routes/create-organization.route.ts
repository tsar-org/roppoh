import * as v from "valibot";
import { procedure } from "../trpc";

const inputSchema = v.object({});

export const createOrganizationRoute = procedure
  .input(inputSchema)
  .query(({ ctx }) => {});
