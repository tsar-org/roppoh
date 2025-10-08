import { BrowserRouter } from "react-router";
import { Theme, ThemeProvider } from "remix-themes";
import "@/tailwind.css";
import clsx from "clsx";

type Props = {
  theme: Theme;
  children: React.ReactNode;
};

/**
 * 各pageのVRTに必要な共通コンポーネントを定義
 *
 * @see apps/roppoh/app/root.tsx
 */
export const RootComponent = ({ theme, children }: Props) => {
  return (
    <BrowserRouter>
      <ThemeProvider specifiedTheme={theme} themeAction="/action/set-theme">
        <html className={clsx(theme)}>{children}</html>
      </ThemeProvider>
    </BrowserRouter>
  );
};
