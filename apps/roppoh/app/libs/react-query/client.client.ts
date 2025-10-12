import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import type { QueryClientConfig } from "@tanstack/react-query";

export const clientSideQueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10, // 10sec
    },
  },
};

export const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});
