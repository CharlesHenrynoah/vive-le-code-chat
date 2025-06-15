
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatPanelProps {
  messages: Message[];
  onAddMessage: (content: string, type: 'user' | 'assistant') => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onAddMessage }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    onAddMessage(userMessage, 'user');
    
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand what you're looking for. Let me help you implement this feature.",
        "That's a great idea! I'll modify the code to add this functionality.",
        "I can see the issue. Let me provide a solution for this.",
        "Here's how we can implement that change in your codebase."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      onAddMessage(randomResponse, 'assistant');
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full bg-[#252526] flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-[#3e3e42]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Chat Assistant</h2>
            <p className="text-sm text-gray-400">Ask me anything about your code</p>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${
              message.type === 'user' 
                ? 'bg-[#0e639c] text-white' 
                : 'bg-[#2d2d30] text-gray-200 border border-[#3e3e42]'
            } rounded-lg p-3`}>
              <p className="text-sm leading-relaxed">{message.content}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs opacity-60">
                  {message.timestamp.toLocaleTimeString()}
                </span>
                {message.type === 'assistant' && (
                  <div className="flex space-x-1">
                    <button className="p-1 hover:bg-[#404040] rounded">
                      <Copy className="w-3 h-3" />
                    </button>
                    <button className="p-1 hover:bg-[#404040] rounded">
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button className="p-1 hover:bg-[#404040] rounded">
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#2d2d30] border border-[#3e3e42] rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[#3e3e42]">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about your code..."
            className="flex-1 min-h-[80px] bg-[#1e1e1e] border-[#3e3e42] text-white resize-none focus:border-[#0e639c]"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="self-end bg-[#0e639c] hover:bg-[#1177bb] text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
      </div>
    </div>
  );
};
