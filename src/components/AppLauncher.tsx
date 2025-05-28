
import React from 'react';
import { cn } from '../lib/utils';
import { LucideIcon } from 'lucide-react';

interface AppLauncherProps {
  icon: LucideIcon;
  name: string;
  onClick?: () => void;
}

const AppLauncher: React.FC<AppLauncherProps> = ({
  icon: Icon,
  name,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="desktop-launcher group flex flex-col items-center justify-center p-4 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
      title={name}
    >
      <div className="bg-white/10 rounded-xl p-3 mb-2">
        <Icon 
          className="w-10 h-10 text-white group-hover:text-neon-blue transition-colors"
        />
      </div>
      <div className="text-xs font-medium text-white/80 group-hover:text-white transition-colors">
        {name}
      </div>
    </div>
  );
};

export default AppLauncher;
