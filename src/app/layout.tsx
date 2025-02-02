import { ThemeProvider } from "next-themes";
import "./globals.css";
import { AnimatePresence } from "framer-motion";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <AnimatePresence mode="wait">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AnimatePresence>
      </body>
    </html>
  );
}
