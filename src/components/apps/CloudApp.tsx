
import React, { useState } from 'react';
import { FileIcon, FolderIcon, MoreVerticalIcon, CloudIcon, CloudDownloadIcon, PlusIcon, SearchIcon, Trash2Icon } from 'lucide-react';
import { Button } from '../ui/button';

const CloudApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Dummy data for cloud files
  const cloudFiles = [
    { id: '1', name: 'Project Presentation.pptx', size: '4.2 MB', updated: '2 hours ago', type: 'file' },
    { id: '2', name: 'Financial Report Q2.xlsx', size: '1.8 MB', updated: 'Yesterday', type: 'file' },
    { id: '3', name: 'Design Assets.zip', size: '156 MB', updated: '3 days ago', type: 'file' },
    { id: '4', name: 'Meeting Notes.pdf', size: '0.5 MB', updated: '1 week ago', type: 'file' }
  ];

  // Dummy data for shared folders
  const sharedFolders = [
    { id: '5', name: 'Team Project', owner: 'Alex Chen', files: 24, type: 'folder' },
    { id: '6', name: 'Marketing Assets', owner: 'Sarah Kim', files: 17, type: 'folder' },
    { id: '7', name: 'Client Presentations', owner: 'Jordan Lee', files: 8, type: 'folder' }
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleItemSelection = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleDownload = () => {
    // Implement download functionality
    alert(`Downloading ${selectedItems.length} files`);
  };

  const filteredFiles = cloudFiles.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="bg-desktop-panel/50 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CloudIcon className="w-5 h-5 text-neon-blue" />
          <h2 className="text-white/90 font-medium">Cloud Storage</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={handleSearch}
              className="bg-white/5 border border-white/10 rounded-full pl-8 pr-4 py-1 text-sm text-white/80 focus:outline-none focus:ring-1 focus:ring-neon-blue/50"
            />
          </div>
          <Button variant="outline" size="sm" className="text-neon-blue border-neon-blue/30 hover:bg-neon-blue/10">
            <CloudDownloadIcon className="w-4 h-4 mr-1" />
            Download
          </Button>
          <Button className="bg-neon-blue hover:bg-neon-blue/90 text-white text-sm py-1 px-3 rounded-full flex items-center">
            <PlusIcon className="w-3.5 h-3.5 mr-1" />
            Upload
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-white/80">Storage Overview</h3>
            <span className="text-xs text-white/60">8.2 GB / 15 GB used</span>
          </div>
          
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full" style={{ width: '55%' }}></div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[
              { type: 'Documents', color: 'bg-blue-500', percentage: 25 },
              { type: 'Media', color: 'bg-purple-500', percentage: 40 },
              { type: 'Other', color: 'bg-green-500', percentage: 35 }
            ].map((item) => (
              <div key={item.type} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <div className="text-xs">
                  <div className="text-white/80">{item.type}</div>
                  <div className="text-white/60">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-white/80">Recent Files</h3>
            <div className="flex space-x-2">
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
          
          {viewMode === 'list' ? (
            <div className="space-y-1">
              {filteredFiles.map((file) => (
                <div 
                  key={file.id}
                  className={`flex items-center justify-between p-2 rounded transition-colors cursor-pointer ${
                    selectedItems.includes(file.id) ? 'bg-white/15' : 'hover:bg-white/5'
                  }`}
                  onClick={() => toggleItemSelection(file.id)}
                >
                  <div className="flex items-center space-x-3">
                    <FileIcon className="w-5 h-5 text-white/70" />
                    <div>
                      <div className="text-sm text-white/80">{file.name}</div>
                      <div className="text-xs text-white/50">{file.size} • {file.updated}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedItems.includes(file.id) && (
                      <div className="w-4 h-4 rounded-full bg-neon-blue flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <button className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                      <MoreVerticalIcon className="w-4 h-4 text-white/60" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredFiles.map((file) => (
                <div 
                  key={file.id}
                  className={`p-3 rounded transition-colors cursor-pointer ${
                    selectedItems.includes(file.id) ? 'bg-white/15' : 'bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => toggleItemSelection(file.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <FileIcon className="w-12 h-12 mb-2 text-white/70" />
                    <div className="text-sm text-white/80 truncate w-full">{file.name}</div>
                    <div className="text-xs text-white/50">{file.size}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-white/80 mb-3">Shared with me</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sharedFolders.map((folder) => (
              <div 
                key={folder.id}
                className="p-3 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <FolderIcon className="w-5 h-5 text-blue-400" />
                  <div className="text-sm text-white/90 truncate">{folder.name}</div>
                </div>
                <div className="text-xs text-white/50">
                  Shared by {folder.owner} • {folder.files} files
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudApp;
