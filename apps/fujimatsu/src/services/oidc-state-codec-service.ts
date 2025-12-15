import * as v from "valibot";

/**
 * Valibot Schema
 * - 外部入力なので optional / strict を明示
 */
const OidcStateSchema = v.object({
  clientId: v.string(),
  redirectUri: v.string(),
  scope: v.string(),
  state: v.optional(v.string()),
});

type OidcState = v.InferOutput<typeof OidcStateSchema>;

/**
 * Codec
 * - encode: Object -> base64 string
 * - decode: base64 string -> validated object
 */
export class OidcStateCodecService {
  /**
   * encode
   * - JSON stringify → base64
   */
  public encode(payload: OidcState): string | false {
    const validated = v.safeParse(OidcStateSchema, payload);

    if (!validated.success) return false;

    return btoa(JSON.stringify(validated.output));
  }

  /**
   * decode
   * - base64 → JSON.parse → schema validation
   */
  public decode(encodedState: string): OidcState | false {
    const json = atob(encodedState);
    const parsed: unknown = JSON.parse(json);
    const validated = v.safeParse(OidcStateSchema, parsed);

    if (!validated.success) return false;

    return validated.output;
  }
}
