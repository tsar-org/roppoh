import { Loader } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader className="animate-spin" size={32} />
    </div>
  );
};
