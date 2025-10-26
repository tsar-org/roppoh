import { ImageResponse, loadGoogleFont } from "workers-og";
import type { Route } from "./+types/route";
import { OG } from "./components/og";

export async function loader({ params }: Route.LoaderArgs) {
  // load font
  const notoSans = await loadGoogleFont({
    family: "Noto Sans JP",
    weight: 600,
  });

  return new ImageResponse(<OG title={params.title} />, {
    fonts: [
      {
        data: notoSans,
        name: "Noto Sans",
      },
    ],
    format: "png",
    height: 630,
    width: 1200,
  });
}
