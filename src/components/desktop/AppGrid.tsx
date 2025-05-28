
import React from 'react';
import AppLauncher from '../AppLauncher';
import { 
  FolderIcon, 
  TerminalIcon, 
  Settings, 
  Globe,
  MessageSquare,
  MailIcon,
  CalendarIcon,
  CloudIcon
} from 'lucide-react';

interface AppGridProps {
  onAppClick: (appName: string) => void;
}

const AppGrid: React.FC<AppGridProps> = ({ onAppClick }) => {
  // Define available apps
  const apps = [
    { name: 'Files', icon: FolderIcon },
    { name: 'Browser', icon: Globe },
    { name: 'Terminal', icon: TerminalIcon },
    { name: 'Mail', icon: MailIcon },
    { name: 'Calendar', icon: CalendarIcon },
    { name: 'Cloud', icon: CloudIcon },
    { name: 'Messages', icon: MessageSquare },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="absolute left-6 top-6 grid grid-cols-3 gap-4 z-10">
      {apps.map((app) => (
        <AppLauncher 
          key={app.name}
          icon={app.icon}
          name={app.name}
          onClick={() => onAppClick(app.name)}
        />
      ))}
    </div>
  );
};

export default AppGrid;
