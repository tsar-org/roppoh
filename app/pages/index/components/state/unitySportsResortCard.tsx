import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

export const UnitySportsResortCard = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Unity Sports Resort</CardTitle>
        <CardDescription>
          Author:{" "}
          <a
            href="https://github.com/s1gnsgrfu"
            target="_blank"
            className="underline underline-offset-4"
            rel="noreferrer"
          >
            @s1gnsgrfu
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link to="/unity-sports-resort">
          <Button className="w-full">play</Button>
        </Link>
      </CardContent>
    </Card>
  );
};
