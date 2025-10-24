import type { MetaDescriptor } from "react-router";

export const baseMeta = ({ title }: { title: string }): MetaDescriptor[] => {
  const description =
    "Roppoh — The game server management web application. And Play WebGL games right in your browser";

  return [
    { title: `${title} | Roppoh` },
    { content: description, name: "description" },
    { content: "Roppoh", property: "og:site_name" },
    { content: process.env.VITE_BASE_URL, property: "og:url" },
    { content: "website", property: "og:type" },
    { content: title, property: "og:title" },
    { content: description, property: "og:description" },
    {
      content: `${process.env.VITE_BASE_URL}/api/og/${title}`,
      property: "og:image",
    },
    { content: "1200", property: "og:image:width" },
    { content: "630", property: "og:image:height" },
    { content: "image/png", property: "og:image:type" },
    { content: "summary_large_image", name: "twitter:card" },
  ];
};
