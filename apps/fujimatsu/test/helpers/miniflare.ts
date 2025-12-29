import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Miniflare } from "miniflare";

export class MiniFlareController {
  private miniflare: Miniflare | undefined;

  public getMiniflare() {
    if (this.miniflare === undefined) {
      throw new Error("miniflare must be started before accessing it");
    }

    return this.miniflare;
  }

  public async before() {
    this.miniflare = this.createMiniflare();
    await this.miniflare.ready;
  }

  public async after() {
    await this.miniflare?.dispose();
  }

  private createMiniflare() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const scriptPath = resolve(__dirname, "../../dist", "entry.js");

    return new Miniflare({
      bindings: {
        DISCORD_CLIENT_ID: "DISCORD_CLIENT_ID",
        DISCORD_REDIRECT_URL: "DISCORD_REDIRECT_URL",
      },
      compatibilityDate: "2025-10-08",
      compatibilityFlags: ["nodejs_compat"],
      durableObjects: {
        AUTH_CODE_STORE: "AuthorizationCodeStore",
      },
      kvNamespaces: ["KV"],
      modules: true,
      scriptPath: scriptPath,
    });
  }
}
