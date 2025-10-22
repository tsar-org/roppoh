// FYI: https://mswjs.io/docs/recipes/vitest-browser-mode/#example

import type { SetupWorker } from "msw/browser";
import { test as testBase } from "vitest";

export const testWithMswMock = (worker: SetupWorker) =>
  testBase.extend({
    worker: [
      async ({}, use) => {
        // Start the worker before the test.
        await worker.start();

        // Expose the worker object on the test's context.
        await use(worker);

        // Remove any request handlers added in individual test cases.
        // This prevents them from affecting unrelated tests.
        worker.resetHandlers();
      },
      {
        auto: true,
      },
    ],
  });
