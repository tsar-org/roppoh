// import { QueryClient } from "@tanstack/react-query";
// import { createStart } from "@tanstack/react-start";

// export const startInstance = createStart(() => {
//   return {
//     defaultSsr: true,
//   };
// });

// startInstance.createMiddleware().server(({ next, context }) => {
//   const queryClient = new QueryClient()
//   console.error("start instance context: ", context)
//   return next({
//     context: {
//       deps: { queryClient: queryClient }
//     },
//   })
// })
