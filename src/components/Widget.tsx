
import React from 'react';
import { cn } from '../lib/utils';
import { ChevronRightIcon } from 'lucide-react';

interface WidgetProps {
  title: string;
  type: 'usage' | 'weather' | 'system';
  isCollapsed?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

const Widget: React.FC<WidgetProps> = ({ 
  title, 
  type,
  isCollapsed = false,
  isActive = false,
  onClick
}) => {
  // Dummy widget data
  const renderContent = () => {
    switch (type) {
      case 'usage':
        return (
          <div>
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-white/70">CPU</span>
              <span className="text-white/90">35%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full mb-3">
              <div className="h-full bg-neon-blue rounded-full" style={{ width: '35%' }}></div>
            </div>
            
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-white/70">Memory</span>
              <span className="text-white/90">68%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full mb-3">
              <div className="h-full bg-neon-pink rounded-full" style={{ width: '68%' }}></div>
            </div>
            
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-white/70">Disk</span>
              <span className="text-white/90">42%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full">
              <div className="h-full bg-neon-green rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>
        );
      
      case 'system':
        return (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/70">Wi-Fi</span>
              <span className="text-white/90">Connected</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Bluetooth</span>
              <span className="text-white/90">On</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Battery</span>
              <span className="text-white/90">85%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">VPN</span>
              <span className="text-white/90">Off</span>
            </div>
          </div>
        );
        
      case 'weather':
        return (
          <div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-light text-white mb-1">72°</div>
                <div className="text-white/70">San Francisco</div>
              </div>
              <div className="text-5xl">☀️</div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 text-center">
              {['Mon', 'Tue', 'Wed', 'Thu'].map(day => (
                <div key={day} className="text-white/80">
                  <div className="text-xs mb-1">{day}</div>
                  <div className="text-lg mb-1">
                    {day === 'Mon' ? '☀️' : day === 'Tue' ? '🌤️' : day === 'Wed' ? '☁️' : '🌧️'}
                  </div>
                  <div className="text-xs">
                    {day === 'Mon' ? '72°' : day === 'Tue' ? '68°' : day === 'Wed' ? '65°' : '61°'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return <div>No content</div>;
    }
  };
  
  if (isCollapsed) {
    return (
      <div 
        className={cn(
          "desktop-panel rounded-l-lg border-r-0 p-3 cursor-pointer transition-all hover:bg-white/5",
          isActive && "bg-white/10"
        )}
        onClick={onClick}
      >
        <div className="flex flex-col items-center h-24 justify-center">
          {type === 'usage' && (
            <div className="space-y-2">
              <div className="h-1.5 w-6 bg-white/10 rounded-full">
                <div className="h-full bg-neon-blue rounded-full" style={{ width: '35%' }}></div>
              </div>
              <div className="h-1.5 w-6 bg-white/10 rounded-full">
                <div className="h-full bg-neon-pink rounded-full" style={{ width: '68%' }}></div>
              </div>
              <div className="h-1.5 w-6 bg-white/10 rounded-full">
                <div className="h-full bg-neon-green rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
          )}
          
          {type === 'system' && (
            <div className="text-white/70 text-xl">📶</div>
          )}
          
          {type === 'weather' && (
            <div className="text-2xl">☀️</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "desktop-panel rounded-lg p-6 cursor-pointer hover:bg-white/5 transition-all",
        isActive && "bg-white/10"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white/80 font-medium">{title}</h3>
        <ChevronRightIcon className="w-4 h-4 text-white/60" />
      </div>
      
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Widget;
