import { Search, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface GalleryHeaderProps {
  onSearchChange: (value: string) => void;
}

export function GalleryHeader({ onSearchChange }: GalleryHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
      <div className="px-4 py-3 flex items-center gap-3">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm">G</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search photos..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-9 pl-10 pr-4 rounded-full bg-gray-100/80 backdrop-blur-sm border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white transition-all"
          />
        </div>

        {/* Profile Avatar */}
        <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
