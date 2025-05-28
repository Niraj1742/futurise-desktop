
export const getAppTitle = (app: string): string => {
  switch (app) {
    case 'Files':
      return 'File Explorer';
    case 'Settings':
      return 'System Settings';
    case 'Mail':
      return 'Mail Client';
    case 'Calendar':
      return 'Calendar';
    case 'Cloud':
      return 'Cloud Storage';
    case 'Messages':
      return 'Messaging';
    case 'Browser':
      return 'Web Browser';
    case 'Terminal':
      return 'Terminal';
    case 'Games':
      return 'Game Center';
    default:
      return app;
  }
};

export const getInitialPosition = (app: string, index: number) => {
  // Stagger windows for better visibility
  const baseX = 100 + (index * 30);
  const baseY = 80 + (index * 20);
  
  return { x: baseX, y: baseY };
};

export const getInitialSize = (app: string) => {
  switch (app) {
    case 'Terminal':
      return { width: 700, height: 500 };
    case 'Settings':
      return { width: 900, height: 600 };
    case 'Calendar':
      return { width: 850, height: 650 };
    case 'Mail':
      return { width: 950, height: 600 };
    case 'Messages':
      return { width: 800, height: 550 };
    case 'Browser':
      return { width: 900, height: 650 };
    case 'Files':
      return { width: 850, height: 600 };
    case 'Cloud':
      return { width: 850, height: 600 };
    case 'Games':
      return { width: 900, height: 650 };
    default:
      return { width: 800, height: 600 };
  }
};
