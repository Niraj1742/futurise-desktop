
import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { 
  SearchIcon, 
  InboxIcon, 
  StarIcon, 
  SendIcon, 
  FileTextIcon, 
  TrashIcon, 
  UserIcon 
} from 'lucide-react';

const MailApp: React.FC = () => {
  const [selectedMail, setSelectedMail] = useState<number | null>(0);
  const [emails] = useState([
    { 
      id: 0,
      sender: 'Alex Chen',
      subject: 'Project Update',
      preview: 'I wanted to share the latest developments on our project...',
      date: '10:30 AM',
      read: true,
      starred: false,
      content: `
Hi there,

I wanted to share the latest developments on our project. We've made significant progress with the new interface design, and I think it's looking great.

The team has completed most of the front-end work ahead of schedule, and we're now focusing on optimizing performance for the next release.

Could we schedule a meeting to discuss the next steps?

Best regards,
Alex
      `
    },
    { 
      id: 1,
      sender: 'Sarah Kim',
      subject: 'Meeting Tomorrow',
      preview: 'Just a reminder about our scheduled meeting tomorrow at 2 PM...',
      date: 'Yesterday',
      read: false,
      starred: true,
      content: `
Hello,

Just a reminder about our scheduled meeting tomorrow at 2 PM in the main conference room. We'll be discussing the quarterly results and planning for the next quarter.

Please bring your reports and any questions you might have.

Thanks,
Sarah
      `
    },
    { 
      id: 2,
      sender: 'TechNews',
      subject: 'Weekly Tech Digest',
      preview: 'The latest technology news and updates from around the world...',
      date: 'Jun 12',
      read: true,
      starred: false,
      content: `
This Week in Tech:

1. New breakthrough in quantum computing announced by research team
2. Major software update released for popular design tools
3. Industry leaders announce partnership for sustainability initiatives
4. Latest smartphone releases compared - which one is worth buying?

Read more on our website.
      `
    }
  ]);
  
  return (
    <div className="h-full flex">
      <div className="w-64 border-r border-white/5 bg-desktop-window">
        <div className="p-3 border-b border-white/5">
          <button className="w-full bg-neon-blue/20 text-neon-blue py-2 px-4 rounded text-sm font-medium flex items-center justify-center">
            <PlusIcon className="w-4 h-4 mr-2" />
            Compose
          </button>
        </div>
        
        <div className="p-2">
          <div className="space-y-1">
            {[
              { name: 'Inbox', icon: InboxIcon, count: 2 },
              { name: 'Starred', icon: StarIcon },
              { name: 'Sent', icon: SendIcon },
              { name: 'Drafts', icon: FileTextIcon },
              { name: 'Trash', icon: TrashIcon }
            ].map((item) => (
              <div 
                key={item.name}
                className="flex items-center justify-between px-3 py-1.5 rounded text-sm text-white/80 hover:bg-white/10 cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.count && (
                  <div className="bg-neon-blue text-black px-1.5 py-0.5 text-xs rounded-full">
                    {item.count}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-80 border-r border-white/5 h-full overflow-auto">
        <div className="p-3 border-b border-white/5 flex items-center">
          <div className="flex-1 bg-white/5 rounded px-3 py-1.5 text-sm flex items-center">
            <SearchIcon className="w-4 h-4 text-white/50 mr-2" />
            <input 
              placeholder="Search mail"
              className="bg-transparent border-none outline-none text-white/70 w-full"
            />
          </div>
        </div>
        
        <div className="divide-y divide-white/5">
          {emails.map((email, index) => (
            <div 
              key={email.id}
              className={cn(
                "p-3 cursor-pointer",
                selectedMail === email.id ? "bg-white/10" : "hover:bg-white/5",
                !email.read && "border-l-4 border-neon-blue pl-2"
              )}
              onClick={() => setSelectedMail(email.id)}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="font-medium text-sm text-white/90">{email.sender}</div>
                <div className="text-xs text-white/60">{email.date}</div>
              </div>
              <div className="text-sm text-white/80 truncate">{email.subject}</div>
              <div className="text-xs text-white/60 truncate">{email.preview}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        {selectedMail !== null && (
          <>
            <div className="p-4 border-b border-white/5">
              <h2 className="text-lg font-medium text-white/90">{emails[selectedMail].subject}</h2>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-white/70" />
                  </div>
                  <div>
                    <div className="text-sm text-white/80">{emails[selectedMail].sender}</div>
                    <div className="text-xs text-white/60">to me</div>
                  </div>
                </div>
                <div className="text-xs text-white/60">{emails[selectedMail].date}</div>
              </div>
            </div>
            
            <div className="p-4 flex-1 overflow-auto">
              <div className="text-sm text-white/80 whitespace-pre-line">
                {emails[selectedMail].content}
              </div>
            </div>
            
            <div className="p-3 border-t border-white/5">
              <button className="bg-white/5 hover:bg-white/10 transition-colors text-white/80 py-2 px-4 rounded text-sm font-medium flex items-center">
                <SendIcon className="w-4 h-4 mr-2" />
                Reply
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Add missing icon
const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
};

export default MailApp;
