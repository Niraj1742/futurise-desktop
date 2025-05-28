
import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Calendar } from '../ui/calendar';
import { PlusIcon, ClockIcon } from 'lucide-react';

const CalendarApp: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState([
    { date: new Date(2023, 5, 10), title: 'Project Meeting', time: '10:00 AM' },
    { date: new Date(2023, 5, 15), title: 'Team Lunch', time: '12:30 PM' },
    { date: new Date(2023, 5, 22), title: 'Product Launch', time: '3:00 PM' }
  ]);
  
  return (
    <div className="h-full flex">
      <div className="w-64 border-r border-white/5 p-4 bg-desktop-window">
        <h2 className="text-lg font-medium text-white/90 mb-4">Calendar</h2>
        
        <div className="space-y-1">
          {['My Calendar', 'Work', 'Personal', 'Reminders'].map((item) => (
            <div 
              key={item}
              className="flex items-center space-x-2 px-3 py-1.5 rounded text-sm hover:bg-white/10 cursor-pointer"
            >
              <div className={cn(
                "w-3 h-3 rounded-full",
                item === 'My Calendar' ? "bg-neon-blue" :
                item === 'Work' ? "bg-neon-purple" :
                item === 'Personal' ? "bg-neon-green" :
                "bg-neon-pink"
              )} />
              <span className="text-white/80">{item}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium text-white/70 mb-2">Upcoming Events</h3>
          <div className="space-y-2">
            {events.map((event, idx) => (
              <div 
                key={idx}
                className="p-2 bg-desktop-panel/50 rounded text-sm"
              >
                <div className="font-medium text-white/90">{event.title}</div>
                <div className="text-xs text-white/60">{event.date.toLocaleDateString()} • {event.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-white/90">
            {selectedDate?.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex space-x-2">
            <button className="p-1.5 rounded bg-white/5 hover:bg-white/10 transition-colors">
              <ClockIcon className="w-4 h-4 text-white/70" />
            </button>
            <button className="p-1.5 rounded bg-white/5 hover:bg-white/10 transition-colors">
              <PlusIcon className="w-4 h-4 text-white/70" />
            </button>
          </div>
        </div>
        
        <div className="bg-desktop-panel/30 rounded-lg p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="text-white"
          />
        </div>
        
        {selectedDate && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-white/80 mb-2">
              Events for {selectedDate.toLocaleDateString()}
            </h3>
            <div className="space-y-2">
              {events
                .filter(event => 
                  event.date.getDate() === selectedDate.getDate() &&
                  event.date.getMonth() === selectedDate.getMonth() &&
                  event.date.getFullYear() === selectedDate.getFullYear()
                )
                .map((event, idx) => (
                  <div 
                    key={idx}
                    className="p-3 bg-desktop-panel/50 rounded border-l-4 border-neon-blue"
                  >
                    <div className="font-medium text-white/90">{event.title}</div>
                    <div className="text-sm text-white/60">{event.time}</div>
                  </div>
                ))}
              {events.filter(event => 
                event.date.getDate() === selectedDate.getDate() &&
                event.date.getMonth() === selectedDate.getMonth() &&
                event.date.getFullYear() === selectedDate.getFullYear()
              ).length === 0 && (
                <div className="text-white/50 text-sm">No events scheduled for this day</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarApp;
