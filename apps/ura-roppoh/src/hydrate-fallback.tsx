import { motion } from "framer-motion";
import { Loading } from "./components/loading";
import { ThemeProvider } from "./contexts/theme";

export function HydrateFallback() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <ThemeProvider>
        <Loading />
      </ThemeProvider>
    </motion.div>
  );
}
