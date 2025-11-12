import { Link } from "react-router";
import { useI18nContext } from "@/i18n/i18n-react";
import { Button } from "@/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";

export const UnitySportsResortCard = () => {
  const { LL, locale } = useI18nContext();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Unity Sports Resort</CardTitle>
        <CardDescription>
          {LL.top.tile.unitySportsResortCard.author()}
          <a
            className="underline underline-offset-4"
            href="https://github.com/s1gnsgrfu"
            rel="noreferrer"
            target="_blank"
          >
            @s1gnsgrfu
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link to={`/${locale}/unity-sports-resort`}>
          <Button className="w-full cursor-pointer">
            {LL.unitySportsResortCard.play()}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
