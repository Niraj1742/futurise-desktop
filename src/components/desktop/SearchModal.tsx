import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  FileIcon, 
  FolderIcon, 
  Command, 
  Settings, 
  CalendarIcon, 
  ImageIcon,
  User,
  Clock,
  Globe,
  Terminal,
  MessageSquare,
  Mail,
  Cloud,
  Gamepad2,
  Bell
} from 'lucide-react';
import { 
  Command as CommandPrimitive,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from "@/components/ui/command";
import { useToast } from "@/hooks/use-toast";

interface SearchModalProps {
  onClose: () => void;
  onAppOpen?: (appName: string) => void;
}

interface SearchResult {
  id: string;
  name: string;
  type: 'app' | 'file' | 'setting' | 'command' | 'web';
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  path?: string;
  app?: string;
  url?: string;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose, onAppOpen }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchCategory, setSearchCategory] = useState<'all' | 'apps' | 'files' | 'settings' | 'web'>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Apps available in the system
  const systemApps: SearchResult[] = [
    { id: 'app-1', name: 'Files', type: 'app', icon: FolderIcon },
    { id: 'app-2', name: 'Settings', type: 'app', icon: Settings },
    { id: 'app-3', name: 'Browser', type: 'app', icon: Globe },
    { id: 'app-4', name: 'Terminal', type: 'app', icon: Terminal },
    { id: 'app-5', name: 'Messages', type: 'app', icon: MessageSquare },
    { id: 'app-6', name: 'Mail', type: 'app', icon: Mail },
    { id: 'app-7', name: 'Calendar', type: 'app', icon: CalendarIcon },
    { id: 'app-8', name: 'Cloud', type: 'app', icon: Cloud },
    { id: 'app-9', name: 'Games', type: 'app', icon: Gamepad2 }
  ];

  // Files in the system
  const systemFiles: SearchResult[] = [
    { id: 'file-1', name: 'Project Presentation.pptx', type: 'file', icon: FileIcon, path: '~/Documents' },
    { id: 'file-2', name: 'Budget Report.xlsx', type: 'file', icon: FileIcon, path: '~/Downloads' },
    { id: 'file-3', name: 'Vacation Photo.jpg', type: 'file', icon: ImageIcon, path: '~/Pictures' },
    { id: 'file-4', name: 'Resume.pdf', type: 'file', icon: FileIcon, path: '~/Documents' },
    { id: 'file-5', name: 'Meeting Notes.txt', type: 'file', icon: FileIcon, path: '~/Documents/Work' },
    { id: 'file-6', name: 'Playlist.mp3', type: 'file', icon: FileIcon, path: '~/Music' }
  ];

  // System settings
  const systemSettings: SearchResult[] = [
    { id: 'setting-1', name: 'Display Settings', type: 'setting', icon: Settings, app: 'Settings' },
    { id: 'setting-2', name: 'User Accounts', type: 'setting', icon: User, app: 'Settings' },
    { id: 'setting-3', name: 'Date & Time', type: 'setting', icon: Clock, app: 'Settings' },
    { id: 'setting-4', name: 'Network Settings', type: 'setting', icon: Globe, app: 'Settings' },
    { id: 'setting-5', name: 'Privacy & Security', type: 'setting', icon: User, app: 'Settings' },
    { id: 'setting-6', name: 'Notifications', type: 'setting', icon: Bell, app: 'Settings' }
  ];

  // System commands
  const systemCommands: SearchResult[] = [
    { id: 'command-1', name: 'Create New File', type: 'command', icon: Command },
    { id: 'command-2', name: 'Take Screenshot', type: 'command', icon: Command },
    { id: 'command-3', name: 'Lock Screen', type: 'command', icon: Command },
    { id: 'command-4', name: 'Open Terminal', type: 'command', icon: Command }
  ];

  // Web search function
  const searchWeb = (query: string): SearchResult[] => {
    if (!query) return [];
    return [
      {
        id: `web-${Date.now()}`,
        name: `Search for "${query}" on the web`,
        type: 'web',
        icon: Globe,
        url: `https://www.google.com/search?q=${encodeURIComponent(query)}`
      }
    ];
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1));
      }
      if (e.key === 'ArrowUp') {
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      }
      if (e.key === 'Enter' && filteredResults.length > 0) {
        handleSelect(filteredResults[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, results, query]);

  // Set focus to input when modal opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, searchCategory]);

  // Update results when query changes
  useEffect(() => {
    const search = async () => {
      // Don't search on empty query except for showing all apps
      if (!query && searchCategory !== 'apps') {
        setResults([]);
        return;
      }

      let searchResults: SearchResult[] = [];
      
      // Filter apps
      if (searchCategory === 'apps' || searchCategory === 'all') {
        const filteredApps = systemApps.filter(app => 
          app.name.toLowerCase().includes(query.toLowerCase())
        );
        searchResults = [...searchResults, ...filteredApps];
      }
      
      // Filter files
      if (searchCategory === 'files' || searchCategory === 'all') {
        const filteredFiles = systemFiles.filter(file => 
          file.name.toLowerCase().includes(query.toLowerCase())
        );
        searchResults = [...searchResults, ...filteredFiles];
      }
      
      // Filter settings
      if (searchCategory === 'settings' || searchCategory === 'all') {
        const filteredSettings = systemSettings.filter(setting => 
          setting.name.toLowerCase().includes(query.toLowerCase())
        );
        searchResults = [...searchResults, ...filteredSettings];
      }
      
      // Add commands that match the query
      if (searchCategory === 'all') {
        const filteredCommands = systemCommands.filter(command => 
          command.name.toLowerCase().includes(query.toLowerCase())
        );
        searchResults = [...searchResults, ...filteredCommands];
      }
      
      // Add web search option if there's a query
      if (query && (searchCategory === 'web' || searchCategory === 'all')) {
        searchResults = [...searchResults, ...searchWeb(query)];
      }
      
      setResults(searchResults);
    };
    
    // Debounce search for better performance
    const timer = setTimeout(() => {
      search();
    }, 150);
    
    return () => clearTimeout(timer);
  }, [query, searchCategory]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelect = (result: SearchResult) => {
    switch (result.type) {
      case 'app':
        if (onAppOpen) {
          onAppOpen(result.name);
          toast({
            title: `Opening ${result.name}`,
            description: "Application is starting...",
            duration: 2000,
          });
        }
        break;
      case 'file':
        toast({
          title: `Opening ${result.name}`,
          description: `From ${result.path}`,
          duration: 2000,
        });
        if (result.name.endsWith('.jpg') || result.name.endsWith('.png')) {
          // Open image viewer
          if (onAppOpen) onAppOpen('Files');
        } else {
          // Open default app for this file type
          if (onAppOpen) onAppOpen('Files');
        }
        break;
      case 'setting':
        if (onAppOpen) {
          onAppOpen('Settings');
          toast({
            title: `Opening Settings`,
            description: `Navigating to ${result.name}`,
            duration: 2000,
          });
        }
        break;
      case 'command':
        toast({
          title: `Executing command`,
          description: result.name,
          duration: 2000,
        });
        if (result.name === 'Open Terminal' && onAppOpen) {
          onAppOpen('Terminal');
        }
        break;
      case 'web':
        toast({
          title: 'Searching the web',
          description: `Opening "${query}" in browser`,
          duration: 2000,
        });
        if (onAppOpen) onAppOpen('Browser');
        break;
    }
    onClose();
  };

  const filteredResults = results;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-desktop-window border border-white/10 rounded-lg shadow-xl overflow-hidden animate-scale-in">
        <div className="p-4 relative">
          <div className="flex items-center mb-4">
            <Search className="w-5 h-5 text-white/60 mr-2" />
            <input
              ref={inputRef}
              type="text"
              autoFocus
              placeholder="Search for apps, files, settings, or web..."
              className="flex-1 bg-transparent text-white border-none outline-none text-lg"
              value={query}
              onChange={handleSearch}
            />
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>
          
          <div className="flex space-x-2 mb-4 overflow-x-auto scrollbar-hide pb-2">
            {['all', 'apps', 'files', 'settings', 'web'].map((category) => (
              <button
                key={category}
                className={`px-3 py-1 rounded-full text-sm ${
                  searchCategory === category 
                    ? 'bg-neon-blue text-white' 
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
                onClick={() => setSearchCategory(category as any)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {filteredResults.length === 0 ? (
              <div className="text-center py-6">
                <div className="text-white/40 text-lg">No results found</div>
                <div className="text-white/30 text-sm mt-1">
                  {query ? 'Try a different search term' : 'Start typing to search'}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredResults.map((result, index) => (
                  <div
                    key={result.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer ${
                      selectedIndex === index ? 'bg-white/15' : 'hover:bg-white/5'
                    }`}
                    onClick={() => handleSelect(result)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                      result.type === 'app' ? 'bg-neon-blue/20' : 
                      result.type === 'file' ? 'bg-purple-500/20' :
                      result.type === 'setting' ? 'bg-green-500/20' :
                      result.type === 'web' ? 'bg-blue-500/20' :
                      'bg-orange-500/20'
                    }`}>
                      <result.icon className={`w-5 h-5 ${
                        result.type === 'app' ? 'text-neon-blue' : 
                        result.type === 'file' ? 'text-purple-400' :
                        result.type === 'setting' ? 'text-green-400' :
                        result.type === 'web' ? 'text-blue-400' :
                        'text-orange-400'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-white/90">{result.name}</div>
                      <div className="text-white/50 text-sm">
                        {result.type === 'app' && 'Application'}
                        {result.type === 'file' && result.path}
                        {result.type === 'setting' && `${result.app} > Settings`}
                        {result.type === 'command' && 'Command'}
                        {result.type === 'web' && 'Web Search'}
                      </div>
                    </div>
                    
                    {selectedIndex === index && (
                      <div className="text-white/40 text-xs bg-white/10 px-2 py-1 rounded">
                        Enter
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white/5 p-3 text-white/40 text-xs flex justify-between">
          <div>Press ↑↓ to navigate</div>
          <div>Press Enter to select</div>
          <div>Press Esc to close</div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
