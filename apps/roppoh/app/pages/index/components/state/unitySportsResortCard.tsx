import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const UnitySportsResortCard = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Unity Sports Resort</CardTitle>
        <CardDescription>
          Author:{" "}
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
        <Link to="/unity-sports-resort">
          <Button className="w-full">play</Button>
        </Link>
      </CardContent>
    </Card>
  );
};
