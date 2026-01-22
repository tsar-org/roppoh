import { motion } from "framer-motion";
import { Loading } from "@/components/loading";
import { useThemeProvider } from "./components/theme-provider";

export function HydrateFallback() {
  const {} = useThemeProvider();

  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <Loading />
    </motion.div>
  );
}
