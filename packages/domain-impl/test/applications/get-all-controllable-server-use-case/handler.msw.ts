import { ENV } from "@test/helpers/env";
import { HttpResponse, http } from "msw";

export const status200 = http.get(
  `${ENV.DOKPLOY_SERVER_URL}/api/project.all`,
  () =>
    HttpResponse.json([
      {
        createdAt: "2025-09-29T15:20:59.624Z",
        description: "project-description",
        environments: [
          {
            compose: [
              {
                composeId: "00Pz161IuEzaL0J6MPv2o",
                composeStatus: "idle",
                description: "compose-description",
                name: "compose-name",
              },
            ],
            createdAt: "2025-09-29T15:20:59.630Z",
            description: "environment-description",
            environmentId: "t1akKXS-nr00BLy616f7k",
            name: "environment-name",
          },
        ],
        name: "project-name",
        projectId: "5icxg9p9gvyuZFJUodWeE",
      },
    ]),
);

export const status500 = http.get(
  `${ENV.DOKPLOY_SERVER_URL}/api/project.all`,
  () =>
    HttpResponse.json({ message: "Internal Server Error" }, { status: 500 }),
);

export const invalidResponse = http.get(
  `${ENV.DOKPLOY_SERVER_URL}/api/project.all`,
  () => HttpResponse.json("invalid-response"),
);
