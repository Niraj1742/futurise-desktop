import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';
import { 
  X, 
  Minimize, 
  Maximize,
  Minus
} from 'lucide-react';

// Import app components
import FilesApp from './apps/FilesApp';
import BrowserApp from './apps/BrowserApp';
import TerminalApp from './apps/TerminalApp';
import SettingsApp from './apps/SettingsApp';
import CloudApp from './apps/CloudApp';
import CalendarApp from './apps/CalendarApp';
import MailApp from './apps/MailApp';
import MessagesApp from './apps/MessagesApp';
import GameApp from './apps/GameApp';

interface WindowProps {
  title: string;
  app: string;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
}

const Window: React.FC<WindowProps> = ({
  title,
  app,
  isActive,
  onClose,
  onMinimize,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 800, height: 600 }
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [maximized, setMaximized] = useState(false);

  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!windowRef.current) return;
    
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleResize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !maximized) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      } else if (isResizing && !maximized) {
        setSize({
          width: Math.max(400, e.clientX - position.x),
          height: Math.max(300, e.clientY - position.y)
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, position, maximized]);

  const toggleMaximize = () => {
    setMaximized(!maximized);
  };

  const renderContent = () => {
    switch (app) {
      case 'Files':
        return <FilesApp />;
      case 'Browser':
        return <BrowserApp />;
      case 'Terminal':
        return <TerminalApp />;
      case 'Settings':
        return <SettingsApp />;
      case 'Cloud':
        return <CloudApp />;
      case 'Calendar':
        return <CalendarApp />;
      case 'Mail':
        return <MailApp />;
      case 'Messages':
        return <MessagesApp />;
      case 'Games':
        return <GameApp />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-white/60 text-lg">Content for {app}</div>
          </div>
        );
    }
  };

  return (
    <div
      ref={windowRef}
      className={cn(
        "desktop-window absolute transform transition-shadow",
        isActive ? "shadow-neon-sm z-50" : "z-40",
        maximized ? "left-0 top-0 right-0 bottom-16 w-auto h-auto" : "animate-scale-in"
      )}
      style={
        maximized 
          ? undefined 
          : { 
              left: position.x, 
              top: position.y, 
              width: size.width, 
              height: size.height 
            }
      }
    >
      {/* Window Header */}
      <div 
        className={cn(
          "bg-desktop-window/90 backdrop-blur-xl border-b border-white/5 h-10 flex items-center justify-between px-3",
          isDragging && "cursor-grabbing"
        )}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-3">
          <div className="text-sm font-medium text-white/80">{title}</div>
        </div>
        
        <div className="flex items-center">
          <button 
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            onClick={onMinimize}
          >
            <Minus className="w-3.5 h-3.5 text-white/60" />
          </button>
          <button 
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors ml-1"
            onClick={toggleMaximize}
          >
            <Maximize className="w-3.5 h-3.5 text-white/60" />
          </button>
          <button 
            className="p-1.5 rounded-full hover:bg-red-500/30 transition-colors ml-1"
            onClick={onClose}
          >
            <X className="w-3.5 h-3.5 text-white/60 hover:text-white" />
          </button>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="w-full h-[calc(100%-40px)] relative overflow-auto">
        {renderContent()}
      </div>
      
      {/* Resize handle */}
      {!maximized && (
        <div
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize"
          onMouseDown={handleResize}
        >
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-white/30 rounded-full" />
          <div className="absolute bottom-4 right-2 w-2 h-2 bg-white/20 rounded-full" />
          <div className="absolute bottom-2 right-4 w-2 h-2 bg-white/20 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default Window;
