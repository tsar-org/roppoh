/** biome-ignore-all assist/source/useSortedKeys: for readability */
import type { BaseTranslation } from "../i18n-types.js";

const en = {
  login: {
    loginButton: "Login with Discord",
    description:
      "The game server management web application. And Play WebGL games right in your browser",
  },
  sidebar: {
    content: {
      items: "Items",
      playground: "Playground",
      servers: "Servers",
    },
    userNavigation: {
      logOut: "Log out",
      theme: {
        toggleTheme: "Toggle theme",
        dark: "Dark",
        light: "Light",
      },
    },
  },
  top: {
    title: "Servers",
    tile: {
      unitySportsResortCard: {
        play: "Play",
        author: "Author: ",
      },
    },
    table: {
      customizeColumns: {
        long: "Customize Columns",
        short: "Columns",
      },
      column: {
        composeName: "Compose Name",
        project: "Project",
        environment: "Environment",
        status: "Status",
        type: "Type",
        description: "Description",
      },
      serverActionDropdown: {
        start: {
          start: "Start",
          error: "❌ Failed to start server. Please try again.",
          loading: "🚀 Launching server...",
          success: "✨ Server is up and running!",
        },
        stop: {
          stop: "Stop",
          error: "❌ Failed to stop server. Please try again.",
          loading: "⏹️ Stopping server...",
          success: "✅ Server stopped successfully",
        },
        redeploy: {
          reDeploy: "ReDeploy",
          error: "❌ Failed to redeploy server. Please try again.",
          loading: "🔄 Redeploying server...",
          success: "🎉 Server redeployed successfully!",
        },
      },
      pagination: {
        rowsSelected: "{selected} of {total} row(s) selected",
        pageInfo: "Page {current} of {total}",
      },
    },
  },
  unitySportsResortCard: {
    play: "Play",
  },
} satisfies BaseTranslation;

export default en;
