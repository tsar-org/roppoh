import { GalleryVerticalEnd } from "lucide-react";

export const TsarOrganizationLink = () => {
  return (
    <a
      href="https://github.com/tsar-org"
      target="_blank"
      className="flex items-center gap-2 font-medium"
      rel="noreferrer"
    >
      <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <GalleryVerticalEnd className="size-4" />
      </div>
      tsar-org
    </a>
  );
};
