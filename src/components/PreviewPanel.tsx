
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, ExternalLink, Smartphone, Tablet, Monitor, Globe } from 'lucide-react';

export const PreviewPanel: React.FC = () => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const getDeviceClass = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'w-[375px] h-[667px]';
      case 'tablet':
        return 'w-[768px] h-[1024px]';
      default:
        return 'w-full h-full';
    }
  };

  return (
    <div className="h-full bg-[#1e1e1e] flex flex-col">
      {/* Preview Header */}
      <div className="p-4 border-b border-[#3e3e42]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Live Preview</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeviceMode('desktop')}
              className={`p-2 ${deviceMode === 'desktop' ? 'bg-[#0e639c] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeviceMode('tablet')}
              className={`p-2 ${deviceMode === 'tablet' ? 'bg-[#0e639c] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeviceMode('mobile')}
              className={`p-2 ${deviceMode === 'mobile' ? 'bg-[#0e639c] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Browser Window */}
      <div className="flex-1 p-4 flex justify-center items-start overflow-auto">
        <div className={`${getDeviceClass()} ${deviceMode !== 'desktop' ? 'border border-[#3e3e42] rounded-lg overflow-hidden' : ''}`}>
          {/* Browser Chrome */}
          <div className="bg-[#2d2d30] h-8 flex items-center px-3 border-b border-[#3e3e42]">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-[#ff5f57] rounded-full"></div>
              <div className="w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
              <div className="w-3 h-3 bg-[#28ca42] rounded-full"></div>
            </div>
          </div>
          
          {/* Preview Content */}
          <div className="bg-white h-full flex items-center justify-center relative">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 mx-auto flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Your App Preview</h3>
              <p className="text-gray-600 mb-4">Your application will appear here</p>
              <div className="flex space-x-2 justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
            
            {/* Status indicator */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#3e3e42] text-center">
        <p className="text-xs text-gray-500">
          Preview updates automatically as you make changes
        </p>
      </div>
    </div>
  );
};
