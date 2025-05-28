
import React from 'react';

interface ClockWidgetProps {
  time: Date;
  onClockClick: () => void;
}

const ClockWidget: React.FC<ClockWidgetProps> = ({ time, onClockClick }) => (
  <div className="fixed top-10 right-10 z-10">
    <div 
      className="desktop-panel animate-fade-in font-display backdrop-blur-xl bg-desktop-panel/30 p-4 rounded-2xl text-center cursor-pointer"
      onClick={onClockClick}
    >
      <div className="text-4xl text-white tracking-widest">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="text-white/60 mt-1 text-sm">
        {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
      </div>
    </div>
  </div>
);

export default ClockWidget;
