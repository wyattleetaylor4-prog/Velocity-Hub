import { Gamepad2, Search } from 'lucide-react';
import { motion } from 'motion/react';

export default function Navbar({ searchQuery, setSearchQuery, onLogoClick }) {
  return (
    <nav className="sticky top-0 z-50 glass-morphism px-6 py-4 flex items-center justify-between">
      <motion.div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={onLogoClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="p-2 bg-gaming-accent rounded-lg group-hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-shadow">
          <Gamepad2 className="w-6 h-6 text-white" />
        </div>
        <span className="font-display text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          GAMING<span className="text-gaming-accent">VAULT</span>
        </span>
      </motion.div>

      <div className="relative w-full max-w-md ml-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text"
          placeholder="Search for a game..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-black/40 border border-gaming-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-gaming-accent transition-colors placeholder:text-gray-600"
        />
      </div>

      <div className="hidden sm:flex items-center gap-6">
        <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Browse</a>
        <a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Categories</a>
        <div className="h-4 w-[1px] bg-gaming-border mx-2" />
        <button className="px-4 py-2 bg-white text-black rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors">
          Random
        </button>
      </div>
    </nav>
  );
}
