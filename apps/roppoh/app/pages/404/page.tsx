import { ArrowUpRightIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/shadcn/components/ui/button";

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
