
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';

interface SearchButtonProps {
  onSearchClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onSearchClick }) => (
  <div className="fixed top-8 left-1/2 -translate-x-1/2 z-10">
    <Button 
      onClick={onSearchClick}
      className="desktop-panel animate-fade-in px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center space-x-2 bg-white/5 backdrop-blur-md"
    >
      <Search className="w-4 h-4 text-white/80" />
      <span className="text-white/70 text-sm">Search apps and files...</span>
      <span className="text-white/40 text-xs border border-white/20 px-1.5 rounded ml-2">⌘K</span>
    </Button>
  </div>
);

export default SearchButton;
