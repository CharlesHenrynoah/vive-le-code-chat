
import React, { useState } from 'react';
import { ChatPanel } from './ChatPanel';
import { PreviewPanel } from './PreviewPanel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const IDE = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant' as const,
      content: "I'll help modify the code to make certificate switching more flexible. The main changes will be to enhance the TlsAccept trait and modify how certificates are handled in the TlsSettings.",
      timestamp: new Date()
    }
  ]);

  const addMessage = (content: string, type: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: messages.length + 1,
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="h-screen bg-[#1e1e1e] text-white flex flex-col">
      {/* Top Bar */}
      <div className="h-12 bg-[#2d2d30] border-b border-[#3e3e42] flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <span className="ml-4 text-sm text-gray-300">mod.rs</span>
        </div>
      </div>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={45} minSize={30}>
          <ChatPanel messages={messages} onAddMessage={addMessage} />
        </ResizablePanel>
        
        <ResizableHandle className="w-1 bg-[#3e3e42] hover:bg-[#505050] transition-colors" />
        
        <ResizablePanel defaultSize={55} minSize={30}>
          <PreviewPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default IDE;
