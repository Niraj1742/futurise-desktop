
import React, { useState, useEffect } from 'react';
import Widget from '../Widget';
import { ChevronRightIcon, ChevronLeftIcon, ActivityIcon, WifiIcon, ThermometerIcon, CloudIcon, BatteryIcon } from 'lucide-react';

interface SystemMetrics {
  cpu: number;
  memory: number;
  network: string;
  battery: number;
  temperature: number;
}

const DesktopWidgets: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpu: 0,
    memory: 0,
    network: 'Connected',
    battery: 100,
    temperature: 0
  });
  const [weatherData, setWeatherData] = useState({
    temperature: 72,
    condition: 'Sunny',
    location: 'San Francisco',
    forecast: [
      { day: 'Mon', temp: 72, condition: 'sunny' },
      { day: 'Tue', temp: 75, condition: 'partly-cloudy' },
      { day: 'Wed', temp: 68, condition: 'cloudy' },
      { day: 'Thu', temp: 70, condition: 'rainy' },
      { day: 'Fri', temp: 74, condition: 'sunny' }
    ]
  });

  // Simulate metrics updating
  useEffect(() => {
    const updateMetrics = () => {
      setSystemMetrics({
        cpu: Math.floor(Math.random() * 60) + 10,
        memory: Math.floor(Math.random() * 40) + 30,
        network: Math.random() > 0.1 ? 'Connected' : 'Disconnected',
        battery: Math.floor(Math.min(100, systemMetrics.battery - (Math.random() * 0.2))),
        temperature: Math.floor(Math.random() * 20) + 50
      });
    };
    
    const interval = setInterval(updateMetrics, 5000);
    return () => clearInterval(interval);
  }, [systemMetrics.battery]);

  const handleWidgetClick = (widgetType: string) => {
    setActiveWidget(activeWidget === widgetType ? null : widgetType);
  };

  const renderUsageContent = () => {
    return (
      <div className="p-3">
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-white/70 text-xs">CPU Usage</span>
            <span className="text-white/90 text-xs">{systemMetrics.cpu}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div 
              className="h-full bg-green-400 rounded-full" 
              style={{ width: `${systemMetrics.cpu}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-white/70 text-xs">Memory</span>
            <span className="text-white/90 text-xs">{systemMetrics.memory}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div 
              className="h-full bg-blue-400 rounded-full" 
              style={{ width: `${systemMetrics.memory}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <span className="text-white/70 text-xs">Battery</span>
            <span className="text-white/90 text-xs">{systemMetrics.battery}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div 
              className={`h-full rounded-full ${
                systemMetrics.battery > 50 ? 'bg-green-400' : 
                systemMetrics.battery > 20 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${systemMetrics.battery}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const renderSystemContent = () => {
    return (
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <WifiIcon className="w-3.5 h-3.5 mr-2 text-white/60" />
            <span className="text-xs text-white/80">Wi-Fi</span>
          </div>
          <span className={`text-xs ${systemMetrics.network === 'Connected' ? 'text-green-400' : 'text-red-400'}`}>
            {systemMetrics.network}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ThermometerIcon className="w-3.5 h-3.5 mr-2 text-white/60" />
            <span className="text-xs text-white/80">Temperature</span>
          </div>
          <span className="text-xs text-white/90">{systemMetrics.temperature}°F</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ActivityIcon className="w-3.5 h-3.5 mr-2 text-white/60" />
            <span className="text-xs text-white/80">Activity</span>
          </div>
          <span className="text-xs text-white/90">Normal</span>
        </div>
      </div>
    );
  };

  const renderWeatherContent = () => {
    return (
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-lg font-medium text-white/90">{weatherData.temperature}°F</div>
            <div className="text-xs text-white/70">{weatherData.location}</div>
          </div>
          <div className="text-3xl">
            {weatherData.condition === 'Sunny' && '☀️'}
            {weatherData.condition === 'Cloudy' && '☁️'}
            {weatherData.condition === 'Rainy' && '🌧️'}
            {weatherData.condition === 'Snowy' && '❄️'}
          </div>
        </div>
        
        <div className="flex justify-between">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-xs text-white/60">{day.day}</div>
              <div className="text-sm my-1">
                {day.condition === 'sunny' && '☀️'}
                {day.condition === 'partly-cloudy' && '⛅'}
                {day.condition === 'cloudy' && '☁️'}
                {day.condition === 'rainy' && '🌧️'}
              </div>
              <div className="text-xs text-white/80">{day.temp}°</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`fixed top-1/2 transform -translate-y-1/2 z-10 transition-all duration-300 ${
        isCollapsed 
          ? 'right-0 w-12' 
          : 'right-10 w-72'
      }`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-6 h-10 bg-white/5 backdrop-blur-lg rounded-l-md flex items-center justify-center hover:bg-white/10 transition-colors"
      >
        {isCollapsed 
          ? <ChevronLeftIcon className="w-4 h-4 text-white/60" />
          : <ChevronRightIcon className="w-4 h-4 text-white/60" />
        }
      </button>

      <div className="space-y-4">
        <Widget 
          title="System Status" 
          type="usage" 
          isCollapsed={isCollapsed}
          isActive={activeWidget === 'usage'}
          onClick={() => handleWidgetClick('usage')}
        >
          {!isCollapsed && activeWidget === 'usage' && renderUsageContent()}
        </Widget>
        
        <Widget 
          title="Network" 
          type="system" 
          isCollapsed={isCollapsed} 
          isActive={activeWidget === 'system'}
          onClick={() => handleWidgetClick('system')}
        >
          {!isCollapsed && activeWidget === 'system' && renderSystemContent()}
        </Widget>
        
        <Widget 
          title="Weather" 
          type="weather" 
          isCollapsed={isCollapsed}
          isActive={activeWidget === 'weather'}
          onClick={() => handleWidgetClick('weather')}
        >
          {!isCollapsed && activeWidget === 'weather' && renderWeatherContent()}
        </Widget>
      </div>
    </div>
  );
};

export default DesktopWidgets;
