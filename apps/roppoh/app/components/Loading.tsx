import { motion } from "framer-motion";

export default function Loading() {
  const displayText = "Loading.....".split("");

  return (
    <div className="flex size-full items-center justify-center font-bold text-4xl">
      {displayText.map((char, index) => {
        return (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            key={`${char}-${index.toString()}`}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
              repeatType: "reverse",
            }}
          >
            {char}
          </motion.div>
        );
      })}
    </div>
  );
}
