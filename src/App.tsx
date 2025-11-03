import { useState, useEffect, useRef, useCallback } from "react";
import { GalleryHeader } from "./components/GalleryHeader";
import { FilterBar } from "./components/FilterBar";
import { ImageCard } from "./components/ImageCard";
import { ImagePreview } from "./components/ImagePreview";
import { LoadingSpinner } from "./components/LoadingSpinner";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  photographer: string;
  likes: number;
  resolution: string;
  category: string;
}

// Mock data generator
const generateMockImages = (count: number, startId: number, category?: string): GalleryImage[] => {
  const categories = ["Nature", "People", "Abstract", "Architecture", "Urban"];
  const imageUrls = [
    "https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzYyMDQxMTAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1653691040409-793d2c22ed69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlb3BsZXxlbnwxfHx8fDE3NjIwOTc1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydHxlbnwxfHx8fDE3NjIwNjQwODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1519662978799-2f05096d3636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzYyMDU0MzI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1617121346253-43ef95179ac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc3RyZWV0fGVufDF8fHx8MTc2MjA4MTkwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1532980400857-e8d9d275d858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzYyMDcwODUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGJlYWNofGVufDF8fHx8MTc2MjA5MDk1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1519414442781-fbd745c5b497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHN1bnNldHxlbnwxfHx8fDE3NjIwNjA2MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1617326021886-53d6be1d7154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYyMTQzNjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1707141774413-5e6e3dac3db3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkbGlmZSUyMGFuaW1hbHxlbnwxfHx8fDE3NjIwNjA2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1686317506872-c921a6ead82e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NjIwNDg0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1602938016996-a03a287ca891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXJzJTIwZ2FyZGVufGVufDF8fHx8MTc2MjEzNzk1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
  ];

  const photographers = ["Alex Johnson", "Maria Garcia", "Chen Wei", "Emma Davis", "Lucas Brown"];
  const titles = [
    "Golden Hour",
    "Urban Exploration",
    "Natural Beauty",
    "Minimalist View",
    "Vibrant Life",
    "Peaceful Moment",
    "Dynamic Perspective",
    "Serene Landscape",
  ];

  return Array.from({ length: count }, (_, i) => {
    const id = startId + i;
    const imageCategory = category !== "All" && category ? category : categories[id % categories.length];
    
    return {
      id: `image-${id}`,
      url: imageUrls[id % imageUrls.length],
      title: `${titles[id % titles.length]} #${id + 1}`,
      photographer: photographers[id % photographers.length],
      likes: Math.floor(Math.random() * 10000) + 100,
      resolution: "4096 × 2731",
      category: imageCategory,
    };
  });
};

export default function App() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const observerTarget = useRef<HTMLDivElement>(null);
  const pageRef = useRef(0);

  const categories = ["All", "Nature", "People", "Abstract", "Architecture", "Urban"];

  // Initial load
  useEffect(() => {
    const initialImages = generateMockImages(18, 0);
    setImages(initialImages);
    setFilteredImages(initialImages);
    pageRef.current = 1;
  }, []);

  // Filter images by category and search
  useEffect(() => {
    let filtered = images;
    
    if (activeCategory !== "All") {
      filtered = filtered.filter((img) => img.category === activeCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(
        (img) =>
          img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          img.photographer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredImages(filtered);
  }, [activeCategory, searchQuery, images]);

  // Load more images
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newImages = generateMockImages(12, pageRef.current * 18);
      setImages((prev) => [...prev, ...newImages]);
      pageRef.current += 1;
      
      // Stop loading after 5 pages for demo
      if (pageRef.current >= 5) {
        setHasMore(false);
      }
      
      setIsLoading(false);
    }, 1000);
  }, [isLoading, hasMore]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMore, hasMore, isLoading]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Header */}
      <GalleryHeader onSearchChange={handleSearchChange} />

      {/* Filter Bar */}
      <FilterBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Gallery Grid */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-3 gap-2">
          {filteredImages.map((image, index) => (
            <ImageCard
              key={image.id}
              image={image}
              onClick={() => setSelectedImage(image)}
              index={index}
            />
          ))}
        </div>

        {/* Loading Spinner */}
        {isLoading && <LoadingSpinner />}

        {/* Infinite Scroll Trigger */}
        {hasMore && <div ref={observerTarget} className="h-4" />}

        {/* End Message */}
        {!hasMore && (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">You've reached the end</p>
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <ImagePreview image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
}
