import { Theme } from "remix-themes";

export function themeColorToHexColor(theme: Theme): string {
  switch (theme) {
    case Theme.DARK:
      return "#0a0a0a";
    case Theme.LIGHT:
      return "#ffffff";
  }
}
