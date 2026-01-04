/** biome-ignore-all lint/suspicious/noExplicitAny: Generic type utilities require any for type parameters */

import type { Effect } from "effect";

/**
 * Any function type that returns an Effect
 * Base type for uniformly handling methods and standalone functions
 */
type EffectFunction = (...args: any[]) => Effect.Effect<any, any, any>;

/**
 * Extract success type A from Effect.Effect<A, E, R>
 */
type ExtractSuccess<T> = T extends Effect.Effect<infer A, any, any> ? A : never;

/**
 * Extract error type E from Effect.Effect<A, E, R>
 */
type ExtractError<T> = T extends Effect.Effect<any, infer E, any> ? E : never;

/**
 * Extract environment type R from Effect.Effect<A, E, R>
 */
type ExtractRequirements<T> = T extends Effect.Effect<any, any, infer R>
  ? R
  : never;

/**
 * Get the return type of a function
 */
type ReturnEffect<F> = F extends (...args: any[]) => infer R ? R : never;

/**
 * Get the type of the last element in an array
 */
type Last<T extends readonly any[]> = T extends readonly [...any[], infer L]
  ? L
  : never;

/**
 * Extract Effect from each function in array and convert to tuple type
 * @internal
 */
type EffectsFromFunctions<Fns extends readonly EffectFunction[]> = {
  [K in keyof Fns]: ReturnEffect<Fns[K]>;
};

/**
 * Compose error types of all functions with union
 * @internal
 */
type AllErrors<Fns extends readonly EffectFunction[]> = ExtractError<
  EffectsFromFunctions<Fns>[number]
>;

/**
 * Compose environment types of all functions with union
 * @internal
 */
type AllRequirements<Fns extends readonly EffectFunction[]> =
  ExtractRequirements<EffectsFromFunctions<Fns>[number]>;

/**
 * Derive composed Effect type from array of functions that return Effect (success type is automatically derived)
 *
 * Composes UseCase steps at type level and auto-generates final Effect type.
 *
 * ### Composition Rules
 * - **A (success type)**: Use success type of the last function
 * - **E (error type)**: Compose error types of all functions with union
 * - **R (environment type)**: Compose environment types of all functions with union
 *
 * ### Usage Example
 *
 * ```typescript
 * import type { Server } from "../domain/server/server.entiry";
 * import type { ServerPolicy } from "../domain/server/server.policy";
 * import type { Compose } from "../types/compose";
 *
 * // Define steps
 * type StopServerByUserSteps = readonly [
 *   ServerPolicy["canStopByUser"],
 *   Server["stop"]
 * ];
 *
 * // Derive composed type (success type is automatically derived)
 * type StopServerByUser = Compose<StopServerByUserSteps>;
 * // => Effect.Effect<void, void | InvalidServerState, void>
 *
 * // Restart steps
 * type RestartByUserSteps = readonly [
 *   ServerPolicy["canStopByUser"],
 *   Server["stop"],
 *   Server["start"]
 * ];
 *
 * type RestartByUser = Compose<RestartByUserSteps>;
 * // => Effect.Effect<void, void | InvalidServerState, void>
 * ```
 *
 * ### Type Safety
 *
 * ```typescript
 * // ✅ OK: All functions return Effect
 * type Valid = Compose<[
 *   Server["start"],
 *   Server["stop"]
 * ]>;
 *
 * // ❌ Error: Contains function that doesn't return Effect
 * type Invalid = Compose<[
 *   () => string,  // Not an Effect
 *   Server["stop"]
 * ]>;
 * ```
 *
 * @template Fns - readonly array of functions that return Effect
 */
export type Compose<Fns extends readonly EffectFunction[]> =
  Fns extends readonly []
    ? never // Empty array not allowed
    : Effect.Effect<
        ExtractSuccess<ReturnEffect<Last<Fns>>>,
        AllErrors<Fns>,
        AllRequirements<Fns>
      >;
