
import React, { useState } from 'react';
import { 
  RefreshCwIcon, 
  SearchIcon, 
  HomeIcon, 
  ExternalLinkIcon,
  MessageSquareIcon,
  Settings,
  FolderIcon,
  FileIcon
} from 'lucide-react';

const BrowserApp: React.FC = () => {
  const [url, setUrl] = useState("https://futuros.io/home");
  const [page, setPage] = useState("home");
  
  const handleNavigate = (newPage: string) => {
    setPage(newPage);
    setUrl(`https://futuros.io/${newPage}`);
  };
  
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Extract page from URL
    const urlParts = url.split('/');
    const newPage = urlParts[urlParts.length - 1] || 'home';
    setPage(newPage);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="bg-desktop-panel/50 p-2 flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <button 
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
            onClick={() => handleNavigate('home')}
          >
            <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
            <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
            <RefreshCwIcon className="w-4 h-4 text-white/70" />
          </button>
          <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
            <HomeIcon className="w-4 h-4 text-white/70" onClick={() => handleNavigate('home')} />
          </button>
        </div>
        
        <form className="flex-1" onSubmit={handleUrlSubmit}>
          <div className="flex bg-white/5 rounded px-3 py-1.5 text-sm items-center">
            <span className="text-neon-green mr-2">https://</span>
            <input
              type="text"
              value={url.replace('https://', '')}
              onChange={handleUrlChange}
              className="flex-1 bg-transparent border-none outline-none text-white/70 w-full"
            />
          </div>
        </form>
        
        <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
          <SearchIcon className="w-4 h-4 text-white/70" />
        </button>
      </div>
      
      <div className="flex-1 bg-gray-100 overflow-auto">
        {page === 'home' && (
          <div className="bg-desktop-panel flex flex-col items-center justify-center h-full text-white p-6">
            <div className="max-w-xl text-center">
              <h1 className="text-4xl font-bold mb-4 text-gradient bg-gradient-to-r from-neon-blue to-neon-purple">FuturOS Browser</h1>
              <p className="text-white/70 mb-6">
                Welcome to your futuristic browsing experience
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { name: 'Dashboard', icon: HomeIcon },
                  { name: 'Storage', icon: FolderIcon },
                  { name: 'Mail', icon: MessageSquareIcon },
                  { name: 'Calendar', icon: CalendarIcon },
                  { name: 'Messages', icon: MessageSquareIcon },
                  { name: 'Files', icon: FileIcon },
                  { name: 'Settings', icon: Settings },
                  { name: 'Cloud', icon: CloudIcon },
                ].map((item) => (
                  <div 
                    key={item.name}
                    className="p-4 bg-desktop-window/80 rounded-lg hover:bg-white/10 transition-all cursor-pointer flex flex-col items-center"
                    onClick={() => handleNavigate(item.name.toLowerCase())}
                  >
                    <item.icon className="w-8 h-8 mb-2 text-neon-blue" />
                    <div className="text-sm font-medium">{item.name}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center space-x-4">
                <button 
                  className="px-4 py-2 bg-desktop-panel/80 border border-neon-blue text-neon-blue rounded-lg hover:bg-neon-blue/20 transition-colors"
                  onClick={() => window.open('https://github.com', '_blank')}
                >
                  <div className="flex items-center">
                    <span>External Sites</span>
                    <ExternalLinkIcon className="ml-2 w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {page === 'dashboard' && (
          <div className="bg-desktop-panel flex flex-col items-center justify-center h-full text-white p-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p>Your personal dashboard</p>
          </div>
        )}
        
        {page !== 'home' && page !== 'dashboard' && (
          <div className="bg-desktop-panel flex flex-col items-center justify-center h-full text-white p-6">
            <h1 className="text-3xl font-bold">{page.charAt(0).toUpperCase() + page.slice(1)}</h1>
            <p>This is the {page} page</p>
            <button 
              className="mt-4 px-4 py-2 bg-desktop-window/80 border border-neon-blue text-neon-blue rounded-lg hover:bg-neon-blue/20 transition-colors"
              onClick={() => handleNavigate('home')}
            >
              Return Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Define missing icon component
const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
};

// Define Cloud icon component
const CloudIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
};

export default BrowserApp;
