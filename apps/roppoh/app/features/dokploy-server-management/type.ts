import type {
  EnvironmentByProjectIdCompose,
  EnvironmentByProjectIdProject,
  EnvironmentByProjectIdResponseBody,
} from "dokploy-sdk/models/operations";

export type Server =
  | {
      status: "fetched";
      project: EnvironmentByProjectIdProject;
      compose: EnvironmentByProjectIdCompose;
      environment: Pick<
        EnvironmentByProjectIdResponseBody,
        "name" | "description" | "environmentId" | "projectId"
      >;
    }
  | {
      status: "fetching";
    };
