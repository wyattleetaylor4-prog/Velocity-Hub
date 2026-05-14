import { motion } from 'motion/react';
import { X, Maximize2, RotateCcw, Share2 } from 'lucide-react';
import { useState } from 'react';

export default function GameViewer({ game, onClose }) {
  const [key, setKey] = useState(0);

  const handleReload = () => {
    setKey(prev => prev + 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-gaming-bg flex flex-col"
    >
      <div className="flex items-center justify-between px-6 py-4 glass-morphism">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div>
            <h2 className="font-display text-xl font-bold">{game.title}</h2>
            <span className="text-[10px] uppercase tracking-widest text-gaming-accent font-mono">Playing Now</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleReload}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2 text-sm text-gray-400 hover:text-white"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reload</span>
          </button>
          <button 
            className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2 text-sm text-gray-400 hover:text-white"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <div className="w-[1px] h-6 bg-gaming-border mx-2" />
          <button 
            className="bg-gaming-accent hover:bg-gaming-accent/80 p-2 rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            <Maximize2 className="w-5 h-5 text-white" />
            <span className="hidden sm:inline text-white font-bold text-sm">Full Screen</span>
          </button>
        </div>
      </div>

      <div className="flex-grow bg-black relative">
        <iframe 
          key={key}
          src={game.iframeUrl} 
          className="w-full h-full border-none"
          title={game.title}
          allowFullScreen
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>

      <div className="px-6 py-4 bg-gaming-card border-t border-gaming-border text-center">
        <p className="text-xs text-gray-500 max-w-2xl mx-auto italic">
          If the game doesn't load, it might be blocked by your network or browser settings. 
          Some games may take a moment to initialize.
        </p>
      </div>
    </motion.div>
  );
}
