
import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { SearchIcon, MoreVerticalIcon, SendIcon } from 'lucide-react';

const MessagesApp: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<number>(0);
  const [newMessage, setNewMessage] = useState("");
  const [chats] = useState([
    {
      id: 0,
      name: 'Alex Chen',
      status: 'online',
      avatar: '👨‍💻',
      messages: [
        { text: 'Hey, how are you?', sent: false, time: '10:30 AM' },
        { text: 'I\'m good, thanks! Working on that project.', sent: true, time: '10:32 AM' },
        { text: 'How\'s it going?', sent: false, time: '10:33 AM' },
        { text: 'Almost finished, just need to fix some bugs.', sent: true, time: '10:35 AM' },
      ]
    },
    {
      id: 1,
      name: 'Team Chat',
      status: 'active',
      avatar: '👥',
      messages: [
        { text: 'Good morning everyone!', sent: false, time: '9:00 AM' },
        { text: 'Morning! What\'s on the agenda today?', sent: false, time: '9:05 AM' },
        { text: 'We need to finish the UI updates.', sent: true, time: '9:10 AM' },
        { text: 'I can help with the backend integration.', sent: false, time: '9:12 AM' },
      ]
    },
    {
      id: 2,
      name: 'Sarah Kim',
      status: 'offline',
      avatar: '👩‍💼',
      messages: [
        { text: 'Did you send that report?', sent: false, time: 'Yesterday' },
        { text: 'Yes, I emailed it to you.', sent: true, time: 'Yesterday' },
        { text: 'Thanks, got it!', sent: false, time: 'Yesterday' },
      ]
    }
  ]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    // In a real app, you would update the state with the new message
    console.log(`Sending message: ${newMessage}`);
    setNewMessage('');
  };
  
  return (
    <div className="h-full flex">
      <div className="w-64 border-r border-white/5 bg-desktop-window">
        <div className="p-3 border-b border-white/5">
          <div className="flex-1 bg-white/5 rounded px-3 py-1.5 text-sm flex items-center">
            <SearchIcon className="w-4 h-4 text-white/50 mr-2" />
            <input 
              placeholder="Search messages"
              className="bg-transparent border-none outline-none text-white/70 w-full"
            />
          </div>
        </div>
        
        <div className="p-1">
          {chats.map((chat) => (
            <div 
              key={chat.id}
              className={cn(
                "flex items-center space-x-3 p-2 rounded cursor-pointer",
                selectedChat === chat.id ? "bg-white/10" : "hover:bg-white/5"
              )}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-desktop-panel flex items-center justify-center text-xl">
                  {chat.avatar}
                </div>
                {chat.status === 'online' && (
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-neon-green rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-white/90 truncate">{chat.name}</div>
                <div className="text-xs text-white/60 truncate">
                  {chat.messages[chat.messages.length - 1].text}
                </div>
              </div>
              <div className="text-xs text-white/50">
                {chat.messages[chat.messages.length - 1].time}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="p-3 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-desktop-panel flex items-center justify-center text-lg">
              {chats[selectedChat].avatar}
            </div>
            <div>
              <div className="text-sm font-medium text-white/90">{chats[selectedChat].name}</div>
              <div className="text-xs text-white/60">
                {chats[selectedChat].status === 'online' ? 'Online' : 
                 chats[selectedChat].status === 'active' ? 'Active now' : 'Last seen recently'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
              <SearchIcon className="w-4 h-4 text-white/70" />
            </button>
            <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
              <MoreVerticalIcon className="w-4 h-4 text-white/70" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 p-3 overflow-auto">
          <div className="space-y-3">
            {chats[selectedChat].messages.map((message, idx) => (
              <div 
                key={idx}
                className={cn(
                  "max-w-[70%] p-3 rounded-lg",
                  message.sent ? 
                    "bg-neon-blue/20 text-white ml-auto rounded-br-none" : 
                    "bg-desktop-panel text-white/90 rounded-bl-none"
                )}
              >
                <div className="text-sm">{message.text}</div>
                <div className="text-xs text-white/50 text-right mt-1">{message.time}</div>
              </div>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSendMessage} className="p-3 border-t border-white/5 flex items-center space-x-2">
          <div className="flex-1 bg-white/5 rounded-full px-4 py-2 flex items-center">
            <input 
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-transparent border-none outline-none text-white/80 w-full text-sm"
            />
          </div>
          <button 
            type="submit"
            className="p-2 bg-neon-blue/80 hover:bg-neon-blue text-white rounded-full"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessagesApp;
