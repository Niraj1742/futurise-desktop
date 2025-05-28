
import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { 
  FolderIcon, 
  FileIcon, 
  FileTextIcon,
  ImageIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  MoreVerticalIcon,
  RefreshCwIcon,
  FolderPlusIcon,
} from 'lucide-react';
import { Button } from '../ui/button';

interface FileItem {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  type: 'file' | 'folder';
  size?: string;
  modified?: string;
}

const FilesApp: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const locations = ['Home', 'Documents', 'Downloads', 'Pictures', 'Cloud Storage'];

  // Simulated file system data
  const fileSystem: Record<string, FileItem[]> = {
    '/home/user': [
      { name: 'Documents', icon: FolderIcon, type: 'folder' },
      { name: 'Downloads', icon: FolderIcon, type: 'folder' },
      { name: 'Pictures', icon: FolderIcon, type: 'folder' },
      { name: 'Music', icon: FolderIcon, type: 'folder' },
      { name: 'Videos', icon: FolderIcon, type: 'folder' },
      { name: 'Projects', icon: FolderIcon, type: 'folder' },
      { name: 'ReadMe.txt', icon: FileTextIcon, type: 'file', size: '4 KB', modified: '2 days ago' },
      { name: 'Setup.exe', icon: FileIcon, type: 'file', size: '45 MB', modified: '1 week ago' }
    ],
    '/home/user/Documents': [
      { name: 'Work', icon: FolderIcon, type: 'folder' },
      { name: 'Personal', icon: FolderIcon, type: 'folder' },
      { name: 'Report.pdf', icon: FileIcon, type: 'file', size: '2.4 MB', modified: 'Yesterday' },
      { name: 'Resume.docx', icon: FileTextIcon, type: 'file', size: '528 KB', modified: '3 weeks ago' },
      { name: 'Budget.xlsx', icon: FileIcon, type: 'file', size: '1.2 MB', modified: '5 days ago' }
    ],
    '/home/user/Pictures': [
      { name: 'Vacation', icon: FolderIcon, type: 'folder' },
      { name: 'Family', icon: FolderIcon, type: 'folder' },
      { name: 'Screenshot.png', icon: ImageIcon, type: 'file', size: '1.5 MB', modified: '4 hours ago' },
      { name: 'Profile.jpg', icon: ImageIcon, type: 'file', size: '3.2 MB', modified: '2 months ago' },
      { name: 'Wallpaper.jpg', icon: ImageIcon, type: 'file', size: '4.8 MB', modified: '1 month ago' }
    ]
  };

  const getCurrentFiles = () => {
    return fileSystem[currentPath] || [];
  };

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    setSelectedItems([]);
  };

  const navigateUp = () => {
    if (currentPath === '/home/user') return;
    const pathParts = currentPath.split('/');
    pathParts.pop();
    navigateTo(pathParts.join('/'));
  };

  const handleItemClick = (item: FileItem) => {
    if (item.type === 'folder') {
      const newPath = `${currentPath}/${item.name}`;
      if (fileSystem[newPath]) {
        navigateTo(newPath);
      }
    } else {
      // Handle file click (open file)
      console.log(`Opening file: ${item.name}`);
    }
  };

  const handleItemSelect = (e: React.MouseEvent, item: FileItem) => {
    e.stopPropagation();
    if (selectedItems.includes(item.name)) {
      setSelectedItems(selectedItems.filter(name => name !== item.name));
    } else {
      setSelectedItems([...selectedItems, item.name]);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredFiles = getCurrentFiles().filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="bg-desktop-panel/50 p-2 flex items-center space-x-2">
        <div className="flex space-x-1">
          <button 
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
            onClick={navigateUp}
          >
            <ChevronLeftIcon className="w-4 h-4 text-white/70" />
          </button>
          <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
            <ChevronRightIcon className="w-4 h-4 text-white/70" />
          </button>
          <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
            <RefreshCwIcon className="w-4 h-4 text-white/70" />
          </button>
        </div>
        
        <div className="flex-1 bg-white/5 rounded px-3 py-1.5 text-sm text-white/70 border border-white/10">
          {currentPath}
        </div>
        
        <div className="relative">
          <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          <input 
            type="text" 
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="bg-white/5 border border-white/10 rounded pl-8 pr-3 py-1.5 text-sm text-white/70 w-36 focus:outline-none focus:ring-1 focus:ring-neon-blue/50 focus:w-48 transition-all" 
          />
        </div>
      </div>
      
      <div className="flex-1 flex">
        <div className="w-48 border-r border-white/5 p-2">
          <div className="text-xs font-medium text-white/50 px-3 pt-2 pb-1">
            LOCATIONS
          </div>
          <div className="space-y-1">
            {locations.map((item) => (
              <div 
                key={item}
                className={cn(
                  "flex items-center space-x-2 px-3 py-1.5 rounded text-sm cursor-pointer",
                  currentPath.includes(item.toLowerCase()) 
                    ? "bg-white/10 text-white" 
                    : "text-white/70 hover:bg-white/10"
                )}
                onClick={() => navigateTo(`/home/user${item === 'Home' ? '' : `/${item}`}`)}
              >
                <FolderIcon className="w-4 h-4" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-xs font-medium text-white/50 px-3 pt-2 pb-1">
            RECENT
          </div>
          <div className="space-y-1">
            {['Downloads', 'Projects', 'Vacation Photos'].map((item) => (
              <div 
                key={item}
                className="flex items-center space-x-2 px-3 py-1.5 rounded text-sm text-white/70 hover:bg-white/10 cursor-pointer"
              >
                <div className="w-4 h-4 text-white/50">
                  {item === 'Vacation Photos' ? 
                    <ImageIcon className="w-4 h-4" /> : 
                    <FolderIcon className="w-4 h-4" />
                  }
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="p-2 border-b border-white/5 flex justify-between items-center">
            <div className="text-sm text-white/70">
              {filteredFiles.length} items
              {selectedItems.length > 0 && ` • ${selectedItems.length} selected`}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white/70"
              >
                <FolderPlusIcon className="w-4 h-4 mr-1" />
                New Folder
              </Button>
              
              <div className="flex space-x-1">
                <button 
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                  onClick={() => setViewMode('list')}
                >
                  <svg className="w-4 h-4 text-white/70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button 
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <svg className="w-4 h-4 text-white/70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        
          <div className="flex-1 p-2 overflow-auto">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {filteredFiles.map((item) => (
                  <div 
                    key={item.name}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded cursor-pointer transition-colors",
                      selectedItems.includes(item.name) ? "bg-white/15" : "hover:bg-white/5"
                    )}
                    onClick={() => handleItemClick(item)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      handleItemSelect(e, item);
                    }}
                  >
                    <div className="relative">
                      <item.icon className={cn(
                        "w-12 h-12 mb-2",
                        item.type === 'folder' ? "text-blue-400" : "text-white/70"
                      )} />
                      
                      {selectedItems.includes(item.name) && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neon-blue flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-white/80 text-center truncate w-full">{item.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/50 border-b border-white/5">
                    <th className="text-left font-medium py-2 px-3">Name</th>
                    <th className="text-left font-medium py-2 pr-3 w-24">Size</th>
                    <th className="text-left font-medium py-2 pr-3 w-32">Modified</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map((item) => (
                    <tr 
                      key={item.name} 
                      className={cn(
                        "border-b border-white/5 cursor-pointer",
                        selectedItems.includes(item.name) ? "bg-white/15" : "hover:bg-white/5"
                      )}
                      onClick={() => handleItemClick(item)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        handleItemSelect(e, item);
                      }}
                    >
                      <td className="py-2 px-3">
                        <div className="flex items-center">
                          <item.icon className={cn(
                            "w-5 h-5 mr-2",
                            item.type === 'folder' ? "text-blue-400" : "text-white/70"
                          )} />
                          <span className="text-white/80">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-2 pr-3 text-white/60">{item.size || '--'}</td>
                      <td className="py-2 pr-3 text-white/60">{item.modified || '--'}</td>
                      <td className="py-2 px-2 text-right">
                        <button className="p-1 rounded hover:bg-white/10">
                          <MoreVerticalIcon className="w-4 h-4 text-white/60" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesApp;
