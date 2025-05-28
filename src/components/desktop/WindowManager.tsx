
import React from 'react';
import Window from '../Window';
import { getAppTitle, getInitialPosition, getInitialSize } from '../../utils/appUtils';

interface WindowManagerProps {
  openWindows: string[];
  minimizedWindows: string[];
  activeApp: string | null;
  handleCloseWindow: (appName: string) => void;
  handleMinimizeWindow: (appName: string) => void;
}

const WindowManager: React.FC<WindowManagerProps> = ({
  openWindows,
  minimizedWindows,
  activeApp,
  handleCloseWindow,
  handleMinimizeWindow
}) => {
  return (
    <>
      {openWindows.map(app => {
        if (minimizedWindows.includes(app)) return null;
        
        return (
          <Window
            key={app}
            app={app}
            title={getAppTitle(app)}
            isActive={activeApp === app}
            onClose={() => handleCloseWindow(app)}
            onMinimize={() => handleMinimizeWindow(app)}
            initialPosition={getInitialPosition(app, openWindows.indexOf(app))}
            initialSize={getInitialSize(app)}
          />
        );
      })}
    </>
  );
};

export default WindowManager;
