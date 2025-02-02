import { motion } from "framer-motion";

export default function PageTransition({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
