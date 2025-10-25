import { ArrowUpRightIcon } from "lucide-react";
import { Link, type MetaFunction } from "react-router";
import { baseMeta } from "@/libs/react-router/base-meta-function";
import { Button } from "@/shadcn/components/ui/button";

export const meta: MetaFunction = () => [...baseMeta({ title: "404" })];

export default function NotFoundPage() {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        fontSize: "2rem",
        fontWeight: "bold",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      404 Page Not Found
      <br />
      <Link to={"/"}>
        <Button variant="link">
          back to top page <ArrowUpRightIcon />
        </Button>
      </Link>
    </div>
  );
}
