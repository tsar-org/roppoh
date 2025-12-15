import * as jose from "jose";

/**
 * KeyPair
 * - Cloudflare Workers環境ではjose.importJWK()はCryptoKeyを返す
 */
interface KeyPair {
  publicKey: CryptoKey;
  privateKey: CryptoKey;
}

/**
 * KV Storage format
 * - JWK format で保存（RFC 7517）
 */
interface StoredKeyPair {
  publicKey: jose.JWK;
  privateKey: jose.JWK;
}

/**
 * KeyPairService
 * - OIDC JWT署名用のRSA鍵ペア管理
 * - Stateless service: メソッドパラメータで KV 依存性を受け取る
 */
export class KeyPairService {
  private static readonly KV_KEY = "keys";

  /**
   * KV から鍵ペアを読み込むか、なければ生成
   *
   * - 既存鍵がある場合: jose.importJWK() で CryptoKey に変換して返却
   * - 新規生成の場合: jose.generateKeyPair("RS256") で生成し、JWK形式で KV に保存
   *
   * @param kv - Cloudflare KV namespace
   * @returns KeyPair | false
   */
  public async loadOrGenerate(kv: KVNamespace): Promise<KeyPair> {
    // 既存鍵を読み込み
    const stored = await kv.get(KeyPairService.KV_KEY, { type: "json" });

    if (stored) {
      const { publicKey: pubJwk, privateKey: privJwk } =
        stored as StoredKeyPair;

      // JWK から CryptoKey に変換
      const publicKey = (await jose.importJWK(pubJwk, "RS256")) as CryptoKey;
      const privateKey = (await jose.importJWK(privJwk, "RS256")) as CryptoKey;

      return { privateKey, publicKey };
    }

    // 新しい鍵ペアを生成
    const { publicKey, privateKey } = (await jose.generateKeyPair("RS256", {
      extractable: true, // KV保存用
    })) as CryptoKeyPair;

    // JWK形式でエクスポート
    const publicKeyJwk = await jose.exportJWK(publicKey);
    const privateKeyJwk = await jose.exportJWK(privateKey);

    // KV に保存
    await kv.put(
      KeyPairService.KV_KEY,
      JSON.stringify({
        privateKey: privateKeyJwk,
        publicKey: publicKeyJwk,
      } as StoredKeyPair),
    );

    return { privateKey, publicKey };
  }

  /**
   * 公開鍵を JWK フォーマットでエクスポート
   *
   * @param publicKey - CryptoKey
   * @returns JWK | false
   */
  public async exportPublicKeyAsJWK(publicKey: CryptoKey): Promise<jose.JWK> {
    return await jose.exportJWK(publicKey);
  }
}
