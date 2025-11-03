import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="w-8 h-8 text-blue-500" />
      </motion.div>
      <p className="mt-3 text-gray-500 text-sm">Loading more photos...</p>
    </motion.div>
  );
}
