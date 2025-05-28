
import React, { useState } from 'react';
import AppIcon from './AppIcon';
import { 
  FolderIcon, 
  TerminalIcon, 
  MessageSquare, 
  Settings, 
  Globe,
  Search,
  Bell,
  Wifi,
  Battery,
  Clock,
  MailIcon,
  CalendarIcon,
  CloudIcon,
  Gamepad2,
  VolumeIcon,
  Sun
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface TaskbarProps {
  activeApp: string | null;
  onAppClick: (appName: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ activeApp, onAppClick }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const { toast } = useToast();
  
  const apps = [
    { name: 'Files', icon: FolderIcon },
    { name: 'Browser', icon: Globe },
    { name: 'Terminal', icon: TerminalIcon },
    { name: 'Mail', icon: MailIcon },
    { name: 'Calendar', icon: CalendarIcon },
    { name: 'Cloud', icon: CloudIcon },
    { name: 'Messages', icon: MessageSquare },
    { name: 'Games', icon: Gamepad2 }
  ];

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString([], { month: 'short', day: 'numeric' });

  const handleSearchClick = () => {
    toast({
      title: "Keyboard Shortcut",
      description: "Press Ctrl+K (or Cmd+K) to search",
      duration: 3000,
    });
  };

  return (
    <div className="taskbar fixed bottom-0 left-0 w-full h-16 flex items-center justify-between px-6 z-50 animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center space-x-2">
        <button 
          className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
          onClick={handleSearchClick}
        >
          <Search className="w-5 h-5 text-white/80" />
        </button>
      </div>
      
      <div className="flex items-center justify-center space-x-2">
        {apps.map((app) => (
          <AppIcon
            key={app.name}
            icon={app.icon}
            name={app.name}
            active={activeApp === app.name}
            onClick={() => onAppClick(app.name)}
          />
        ))}
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <Wifi className="w-4 h-4 text-white/70" />
          <VolumeIcon className="w-4 h-4 text-white/70" />
          <Battery className="w-4 h-4 text-white/70" />
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-sm text-white/80 flex flex-col items-end">
            <div className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-white/60" />
              {currentTime}
            </div>
            <div className="text-xs text-white/50">{currentDate}</div>
          </div>
          
          <button 
            className={`p-1.5 rounded-full ${notificationsOpen ? 'bg-white/20' : 'hover:bg-white/10'} transition-colors`}
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <Bell className="w-4 h-4 text-white/70" />
          </button>
          
          <button 
            className={`p-1.5 rounded-full ${controlCenterOpen ? 'bg-white/20' : 'hover:bg-white/10'} transition-colors`}
            onClick={() => setControlCenterOpen(!controlCenterOpen)}
          >
            <Sun className="w-4 h-4 text-white/70" />
          </button>
          
          <button 
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => onAppClick('Settings')}
          >
            <Settings className="w-4 h-4 text-white/70" />
          </button>
        </div>
      </div>
      
      {/* Control Center */}
      {controlCenterOpen && (
        <div className="absolute right-4 bottom-16 bg-desktop-window/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl p-4 w-72 animate-fade-in">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-white/80 mb-2">Brightness</h3>
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 text-white/60" />
              <div className="flex-1 h-1 bg-white/20 rounded-full">
                <div className="h-full bg-white/80 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <Sun className="w-5 h-5 text-white/80" />
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-white/80 mb-2">Volume</h3>
            <div className="flex items-center space-x-2">
              <VolumeIcon className="w-4 h-4 text-white/60" />
              <div className="flex-1 h-1 bg-white/20 rounded-full">
                <div className="h-full bg-white/80 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <VolumeIcon className="w-5 h-5 text-white/80" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <button className={`p-3 rounded-lg flex flex-col items-center justify-center ${true ? 'bg-blue-500/30' : 'bg-white/10'}`}>
              <Wifi className="w-5 h-5 text-white/80 mb-1" />
              <span className="text-xs text-white/70">Wi-Fi</span>
            </button>
            <button className={`p-3 rounded-lg flex flex-col items-center justify-center ${false ? 'bg-blue-500/30' : 'bg-white/10'}`}>
              <Globe className="w-5 h-5 text-white/80 mb-1" />
              <span className="text-xs text-white/70">Bluetooth</span>
            </button>
            <button className={`p-3 rounded-lg flex flex-col items-center justify-center ${true ? 'bg-blue-500/30' : 'bg-white/10'}`}>
              <Sun className="w-5 h-5 text-white/80 mb-1" />
              <span className="text-xs text-white/70">Night Mode</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Notifications Panel */}
      {notificationsOpen && (
        <div className="absolute right-4 bottom-16 bg-desktop-window/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl p-4 w-80 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-white/80">Notifications</h3>
            <button className="text-xs text-blue-400 hover:text-blue-300">Clear All</button>
          </div>
          
          <div className="space-y-3 max-h-72 overflow-y-auto">
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="flex items-start">
                <div className="mr-3 mt-1 p-2 bg-blue-500/20 rounded-full">
                  <MailIcon className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/90">New Email</h4>
                  <p className="text-xs text-white/70 mt-1">You received a new email from Alex</p>
                  <p className="text-xs text-white/50 mt-2">5 minutes ago</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="flex items-start">
                <div className="mr-3 mt-1 p-2 bg-green-500/20 rounded-full">
                  <CalendarIcon className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/90">Meeting Reminder</h4>
                  <p className="text-xs text-white/70 mt-1">Team standup in 15 minutes</p>
                  <p className="text-xs text-white/50 mt-2">20 minutes ago</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="flex items-start">
                <div className="mr-3 mt-1 p-2 bg-purple-500/20 rounded-full">
                  <CloudIcon className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/90">Cloud Storage Full</h4>
                  <p className="text-xs text-white/70 mt-1">Your cloud storage is almost full</p>
                  <p className="text-xs text-white/50 mt-2">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-3 py-2 text-xs text-center text-white/60 hover:text-white/80 transition-colors">
            See All Notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default Taskbar;
