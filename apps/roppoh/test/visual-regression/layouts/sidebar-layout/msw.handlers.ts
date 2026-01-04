import type {
  EnvironmentByProjectIdCompose,
  EnvironmentByProjectIdResponse,
  ProjectAllResponse,
} from "dokploy-sdk/models/operations";
import { HttpResponse, http } from "msw";
import { setupWorker } from "msw/browser";
import { VRT_ENV } from "../../constant";

const DOKPLOY_PROXY_API_PATH = "/api/dokploy" as const;
const ENVIRONMENT_ID = "environment-id" as const;

const project = {
  createdAt: "createdAt",
  description: "description",
  env: "env",
  name: "project-name",
  organizationId: "organization-id",
  projectId: "project-id",
};

const environment = {
  createdAt: "createdAt",
  description: "description",
  env: "env",
  environmentId: ENVIRONMENT_ID,
  name: "environment-name",
  projectId: project.projectId,
};

const composeBase = {
  appName: "appName",
  autoDeploy: null,
  bitbucketBranch: null,
  bitbucketId: null,
  bitbucketOwner: null,
  bitbucketRepository: null,
  branch: null,
  command: "command",
  composeFile: "composeFile",
  composeId: "composeId",
  composePath: "composePath",
  composeStatus: "idle" as const,
  composeType: "docker-compose" as const,
  createdAt: "createdAt",
  customGitBranch: null,
  customGitSSHKeyId: null,
  customGitUrl: null,
  description: null,
  enableSubmodules: false,
  env: null,
  environmentId: ENVIRONMENT_ID,
  giteaBranch: null,
  giteaId: null,
  giteaOwner: null,
  giteaRepository: null,
  githubId: null,
  gitlabBranch: null,
  gitlabId: null,
  gitlabOwner: null,
  gitlabPathNamespace: null,
  gitlabProjectId: null,
  gitlabRepository: null,
  isolatedDeployment: false,
  isolatedDeploymentsVolume: false,
  name: "compose-name",
  owner: null,
  randomize: false,
  refreshToken: null,
  repository: null,
  serverId: null,
  sourceType: "github" as const,
  suffix: "suffix",
  triggerType: null,
  watchPaths: null,
};

const composeList: EnvironmentByProjectIdCompose[] = [
  // default
  { ...composeBase },
  // long name
  { ...composeBase, name: "long-name ".repeat(3) },
];

const handlers = [
  http.get(
    `${VRT_ENV.VITE_BASE_URL + DOKPLOY_PROXY_API_PATH}/project.all`,
    () =>
      HttpResponse.json([
        {
          ...project,
          environments: [environment],
        },
      ] satisfies ProjectAllResponse),
  ),
  http.get(
    `${VRT_ENV.VITE_BASE_URL + DOKPLOY_PROXY_API_PATH}/environment.byProjectId`,
    () =>
      HttpResponse.json([
        {
          applications: [],
          compose: composeList,
          createdAt: "createdAt",
          description: "description",
          env: "env",
          environmentId: ENVIRONMENT_ID,
          mariadb: [],
          mongo: [],
          mysql: [],
          name: "environment-name",
          postgres: [],
          project: project,
          projectId: project.projectId,
          redis: [],
        },
      ] satisfies EnvironmentByProjectIdResponse),
  ),
];

export const worker = setupWorker(...handlers);
