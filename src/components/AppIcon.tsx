
import React from 'react';
import { cn } from '../lib/utils';
import { LucideIcon } from 'lucide-react';

interface AppIconProps {
  icon: LucideIcon;
  name: string;
  active?: boolean;
  onClick?: () => void;
}

const AppIcon: React.FC<AppIconProps> = ({
  icon: Icon,
  name,
  active = false,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "dock-icon group relative",
        active && "bg-white/10"
      )}
      title={name}
    >
      <Icon 
        className={cn(
          "w-6 h-6 transition-colors",
          active ? "text-neon-blue" : "text-white/80 group-hover:text-white"
        )}
      />
      {active && <div className="dock-indicator animate-pulse-glow" />}
      
      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/80 backdrop-blur-md px-3 py-1 rounded-md text-xs text-white whitespace-nowrap">
        {name}
      </div>
    </button>
  );
};

export default AppIcon;
