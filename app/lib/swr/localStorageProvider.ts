// https://swr.vercel.app/ja/docs/advanced/cache#localstorage-based-persistent-cache
import type { Cache } from "swr";

export const localStorageProvider = (): Cache => {
  // 初期化時に、 `localStorage` から Map にデータを復元します。
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const map = new Map<string, any>(
    JSON.parse(window.localStorage.getItem("app-cache") || "[]"),
  );

  // アプリが終了する前に、すべてのデータを [localStorage](http://_vscodecontentref_/2) に保存します。
  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("app-cache", appCache);
  });

  // パフォーマンスのために、書き込みと読み取りには引き続き Map を使用します。
  return map;
};
