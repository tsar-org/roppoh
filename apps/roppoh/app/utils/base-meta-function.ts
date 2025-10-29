import type { MetaDescriptor } from "react-router";
import { Theme } from "remix-themes";
import { themeColorToHexColor } from "./theme-color-to-hex-color";

interface Argument {
  baseUrl: string;
  title: string;
  theme: Theme | null;
}

export const generateBaseMeta = ({
  baseUrl,
  title,
  theme,
}: Argument): MetaDescriptor[] => {
  const description =
    "Roppoh — The game server management web application. And Play WebGL games right in your browser";

  return [
    { title: `${title} | Roppoh` },
    { content: description, name: "description" },

    // theme
    { content: themeColorToHexColor(theme ?? Theme.DARK), name: "theme-color" },

    // OG
    { content: "Roppoh", property: "og:site_name" },
    { content: baseUrl, property: "og:url" },
    { content: "website", property: "og:type" },
    { content: title, property: "og:title" },
    { content: description, property: "og:description" },
    {
      content: `${baseUrl}/api/og/${title}`,
      property: "og:image",
    },
    { content: "1200", property: "og:image:width" },
    { content: "630", property: "og:image:height" },
    { content: "image/png", property: "og:image:type" },
    { content: "summary_large_image", name: "twitter:card" },
  ];
};
