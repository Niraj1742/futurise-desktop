
import React, { useState, useEffect, useRef } from 'react';

const TerminalApp: React.FC = () => {
  const [commandHistory, setCommandHistory] = useState<string[]>([
    "Welcome to FuturOS Terminal",
    "Type 'help' for available commands",
    ">"
  ]);
  const [currentCommand, setCurrentCommand] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [commandHistory]);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const command = currentCommand.trim();
      let response = "";
      
      if (command === 'help') {
        response = "Available commands: help, clear, date, echo, ls, whoami, system";
      } else if (command === 'clear') {
        setCommandHistory([]);
        setCurrentCommand("");
        return;
      } else if (command === 'date') {
        response = new Date().toString();
      } else if (command.startsWith('echo ')) {
        response = command.substring(5);
      } else if (command === 'ls') {
        response = "Documents  Downloads  Pictures  Projects  config.sys  readme.txt";
      } else if (command === 'whoami') {
        response = "user@futuros";
      } else if (command === 'system') {
        response = `
OS: FuturOS 1.0.0
Host: WebDesktop
Kernel: 4.5.0-futuros
Uptime: ${Math.floor(Math.random() * 24)} hours, ${Math.floor(Math.random() * 60)} minutes
Resolution: ${window.innerWidth}x${window.innerHeight}
Shell: future-shell 2.1.0
CPU: Web Engine (${navigator.hardwareConcurrency || 4}) @ Max Speed
Memory: ${Math.floor(Math.random() * 8) + 2}GiB / 16.0GiB`;
      } else if (command !== '') {
        response = `Command not found: ${command}`;
      }
      
      setCommandHistory([
        ...commandHistory.slice(0, -1),
        `> ${command}`,
        response,
        ">"
      ]);
      setCurrentCommand("");
    }
  };
  
  return (
    <div className="h-full p-4 font-mono text-sm bg-black/80 text-neon-green overflow-auto">
      {commandHistory.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap mb-1">
          {line}
          {index === commandHistory.length - 1 && (
            <input
              type="text"
              className="bg-transparent border-none outline-none text-inherit w-full ml-1"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          )}
        </div>
      ))}
      <div ref={terminalEndRef} />
    </div>
  );
};

export default TerminalApp;
