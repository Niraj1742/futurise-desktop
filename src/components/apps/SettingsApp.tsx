
import React from 'react';
import { cn } from '../../lib/utils';

const SettingsApp: React.FC = () => {
  return (
    <div className="h-full flex bg-desktop-panel/20">
      <div className="w-48 border-r border-white/5 p-2">
        <div className="text-xs font-medium text-white/50 px-3 pt-2 pb-1">
          SETTINGS
        </div>
        <div className="space-y-1">
          {[
            'System', 
            'Appearance', 
            'Privacy & Security', 
            'Accounts', 
            'Notifications', 
            'Storage', 
            'Network', 
            'Applications', 
            'About'
          ].map((item, index) => (
            <div 
              key={item}
              className={cn(
                "flex items-center space-x-2 px-3 py-1.5 rounded text-sm hover:bg-white/10 cursor-pointer",
                index === 0 ? "bg-white/10 text-white" : "text-white/70"
              )}
            >
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 p-6 overflow-auto">
        <h2 className="text-xl font-medium text-white/90 mb-6">System Settings</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-white/80 mb-3">System Information</h3>
            <div className="bg-desktop-window/50 rounded-lg p-4 space-y-2">
              {[
                { label: 'OS Version', value: 'FuturOS 1.0.0' },
                { label: 'Build Number', value: '20240601-ALPHA' },
                { label: 'Last Updated', value: 'June 1, 2024' },
                { label: 'Device Name', value: 'Web Desktop' }
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-sm text-white/60">{item.label}</span>
                  <span className="text-sm text-white/90">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-white/80 mb-3">Performance</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-desktop-window/50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-white/60">Animation Speed</span>
                  <span className="text-xs bg-neon-blue/20 text-neon-blue px-2 py-0.5 rounded">Fast</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  defaultValue="75"
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neon-blue"
                />
              </div>
              
              <div className="bg-desktop-window/50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-white/60">Visual Effects</span>
                  <span className="text-xs bg-neon-purple/20 text-neon-purple px-2 py-0.5 rounded">High</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  defaultValue="90"
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neon-purple"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-white/80 mb-3">System Preferences</h3>
            <div className="space-y-3">
              {[
                { label: 'Enable AI Assistant', defaultChecked: true },
                { label: 'Auto-update System', defaultChecked: true },
                { label: 'Allow Anonymous Usage Data', defaultChecked: false },
                { label: 'Enable Developer Mode', defaultChecked: false },
                { label: 'Auto-start on System Boot', defaultChecked: true }
              ].map((item) => (
                <div 
                  key={item.label}
                  className="flex items-center justify-between p-3 bg-desktop-window/50 rounded-lg"
                >
                  <span className="text-sm text-white/80">{item.label}</span>
                  <div className="relative">
                    <input 
                      type="checkbox"
                      defaultChecked={item.defaultChecked}
                      className="sr-only peer"
                      id={`toggle-${item.label}`}
                    />
                    <label 
                      htmlFor={`toggle-${item.label}`}
                      className="flex h-6 w-11 cursor-pointer items-center rounded-full bg-white/10 p-1 peer-checked:bg-neon-blue/70 peer-checked:after:translate-x-5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all"
                    ></label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
