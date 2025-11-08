/** biome-ignore-all assist/source/useSortedKeys: for readability */
import type { BaseTranslation } from "../i18n-types.js";

const ja = {
  login: {
    loginButton: "Discordでログイン",
    description:
      "ゲームサーバー管理 Web アプリケーション。ブラウザで直接 WebGL ゲームをプレイできます",
  },
  sidebar: {
    content: {
      items: "アイテム",
      playground: "プレイグラウンド",
      servers: "サーバー",
    },
    userNavigation: {
      logOut: "ログアウト",
      theme: {
        toggleTheme: "テーマを切り替え",
        dark: "ダーク",
        light: "ライト",
      },
    },
  },
  top: {
    title: "サーバー",
    tile: {
      unitySportsResortCard: {
        play: "プレイ",
        author: "著者: ",
      },
    },
    table: {
      customizeColumns: {
        long: "カラムをカスタマイズ",
        short: "カラム",
      },
      column: {
        composeName: "コンポーズ名",
        project: "プロジェクト",
        environment: "環境",
        status: "ステータス",
        type: "タイプ",
        description: "説明",
      },
      serverActionDropdown: {
        start: {
          start: "開始",
          error: "❌ サーバーの起動に失敗しました。もう一度お試しください。",
          loading: "🚀 サーバーを起動しています...",
          success: "✨ サーバーが起動しました！",
        },
        stop: {
          stop: "停止",
          error: "❌ サーバーの停止に失敗しました。もう一度お試しください。",
          loading: "⏹️ サーバーを停止しています...",
          success: "✅ サーバーが停止しました",
        },
        redeploy: {
          reDeploy: "再デプロイ",
          error:
            "❌ サーバーの再デプロイに失敗しました。もう一度お試しください。",
          loading: "🔄 サーバーを再デプロイしています...",
          success: "🎉 サーバーが再デプロイされました！",
        },
      },
      pagination: {
        rowsSelected: "{selected} / {total} 行が選択されています",
        pageInfo: "ページ {current} / {total}",
      },
    },
  },
  unitySportsResortCard: {
    play: "プレイ",
  },
} satisfies BaseTranslation;

export default ja;
