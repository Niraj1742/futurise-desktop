
import React, { useState, useEffect } from 'react';
import DesktopBackground from './DesktopBackground';
import Taskbar from './Taskbar';
import ClockWidget from './desktop/ClockWidget';
import SearchButton from './desktop/SearchButton';
import DesktopWidgets from './desktop/DesktopWidgets';
import SearchModal from './desktop/SearchModal';
import WindowManager from './desktop/WindowManager';
import AppGrid from './desktop/AppGrid';
import { useToast } from "@/hooks/use-toast";

const Desktop: React.FC = () => {
  // Window state management
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  
  // UI state management
  const [time, setTime] = useState(new Date());
  const [searchOpen, setSearchOpen] = useState(false);
  const { toast } = useToast();

  // Clock timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // App window management
  const handleAppClick = (appName: string) => {
    setActiveApp(appName);
    
    if (!openWindows.includes(appName)) {
      setOpenWindows([...openWindows, appName]);
      toast({
        title: `Opening ${appName}`,
        description: "Application is starting...",
        duration: 2000,
      });
    }
    
    if (minimizedWindows.includes(appName)) {
      setMinimizedWindows(minimizedWindows.filter(app => app !== appName));
    }
  };

  const handleCloseWindow = (appName: string) => {
    setOpenWindows(openWindows.filter(app => app !== appName));
    
    if (activeApp === appName) {
      setActiveApp(openWindows.length > 1 ? openWindows.filter(app => app !== appName)[0] : null);
    }
  };

  const handleMinimizeWindow = (appName: string) => {
    setMinimizedWindows([...minimizedWindows, appName]);
    
    if (activeApp === appName) {
      setActiveApp(openWindows.filter(app => app !== appName && !minimizedWindows.includes(app))[0] || null);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <DesktopBackground />
      
      {/* Desktop App Grid */}
      <AppGrid onAppClick={handleAppClick} />
      
      {/* Clock Widget */}
      <ClockWidget time={time} onClockClick={() => handleAppClick('Calendar')} />
      
      {/* Search Button */}
      <SearchButton onSearchClick={() => setSearchOpen(true)} />
      
      {/* Quick Widgets */}
      <DesktopWidgets />
      
      {/* Windows */}
      <WindowManager
        openWindows={openWindows}
        minimizedWindows={minimizedWindows}
        activeApp={activeApp}
        handleCloseWindow={handleCloseWindow}
        handleMinimizeWindow={handleMinimizeWindow}
      />
      
      {/* Search Modal */}
      {searchOpen && (
        <SearchModal 
          onClose={() => setSearchOpen(false)} 
          onAppOpen={handleAppClick}
        />
      )}
      
      {/* Taskbar */}
      <Taskbar
        activeApp={activeApp}
        onAppClick={handleAppClick}
      />
    </div>
  );
};

export default Desktop;
