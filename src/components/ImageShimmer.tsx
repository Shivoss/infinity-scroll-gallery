import { motion } from "motion/react";

export function ImageShimmer() {
  return (
    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-200">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
