import { motion } from "framer-motion";

export default function Loading() {
  const displayText = "Loading.....".split("");

  return (
    <div className="flex size-full items-center justify-center font-bold text-4xl">
      {displayText.map((char, index) => {
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              repeatDelay: 1,
            }}
            key={`${char}-${index.toString()}`}
          >
            {char}
          </motion.div>
        );
      })}
    </div>
  );
}
