// FYI: https://ui.shadcn.com/docs/dark-mode/remix

import { createThemeAction } from "remix-themes";
import { themeSessionResolver } from "../sessions.server";

export const action = createThemeAction(themeSessionResolver);
