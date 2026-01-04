import { Effect } from "effect";

export const runEffectAndGetError = async <A, E>(
  effect: Effect.Effect<A, E, never>,
) => {
  const result = await Effect.runPromise(Effect.either(effect));

  if (result._tag === "Right")
    throw new Error("Expected Effect to fail, but it succeeded.");

  return result.left;
};
