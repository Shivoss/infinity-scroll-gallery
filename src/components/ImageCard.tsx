import { useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ImageShimmer } from "./ImageShimmer";

interface ImageCardProps {
  image: {
    id: string;
    url: string;
    title: string;
    photographer: string;
    likes: number;
  };
  onClick: () => void;
  index: number;
}

export function ImageCard({ image, onClick, index }: ImageCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative cursor-pointer group"
    >
      {!isLoaded && <ImageShimmer />}
      <div
        className={`relative aspect-square rounded-2xl overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-lg ${
          isLoaded ? "opacity-100" : "opacity-0 absolute"
        }`}
      >
        <ImageWithFallback
          src={image.url}
          alt={image.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}
