import { motion, AnimatePresence } from "motion/react";
import { X, Heart, Download, Share2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { useState } from "react";

interface ImagePreviewProps {
  image: {
    id: string;
    url: string;
    title: string;
    photographer: string;
    likes: number;
    resolution: string;
  } | null;
  onClose: () => void;
}

export function ImagePreview({ image, onClose }: ImagePreviewProps) {
  const [isLiked, setIsLiked] = useState(false);

  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black"
        onClick={onClose}
      >
        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </motion.button>

        {/* Image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center h-full px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <ImageWithFallback
            src={image.url}
            alt={image.title}
            className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
          />
        </motion.div>

        {/* Info Panel */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-t border-white/20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-6 py-4">
            <h3 className="text-white mb-1">{image.title}</h3>
            <p className="text-white/70 text-sm mb-4">
              by {image.photographer} • {image.likes.toLocaleString()} likes • {image.resolution}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={`flex-1 rounded-full border-white/30 backdrop-blur-sm transition-all ${
                  isLiked
                    ? "bg-red-500 text-white border-red-500 hover:bg-red-600"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 rounded-full bg-white/10 text-white border-white/30 backdrop-blur-sm hover:bg-white/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 rounded-full bg-white/10 text-white border-white/30 backdrop-blur-sm hover:bg-white/20"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
