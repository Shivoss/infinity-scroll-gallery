import { motion } from "motion/react";
import { Badge } from "./ui/badge";

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div className="sticky top-[57px] z-40 bg-white/70 backdrop-blur-lg border-b border-gray-200/30">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 px-4 py-3 min-w-max">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <motion.button
                key={category}
                onClick={() => onCategoryChange(category)}
                className="relative"
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant={isActive ? "default" : "outline"}
                  className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-sm"
                      : "bg-white/80 text-gray-700 border-gray-300/50 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </Badge>
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
