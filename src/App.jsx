import { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import GameCard from './components/GameCard';
import GameViewer from './components/GameViewer';
import gamesData from './data/games.json';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, TrendingUp, Clock, History } from 'lucide-react';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const games = gamesData;

  const categories = useMemo(() => {
    const cats = new Set(games.map(g => g.category));
    return ['All', ...Array.from(cats)];
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, activeCategory]);

  return (
    <div className="min-h-screen pb-20">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onLogoClick={() => {
          setSelectedGame(null);
          setSearchQuery('');
          setActiveCategory('All');
        }}
      />

      <main className="max-w-7xl mx-auto px-6 pt-12">
        {/* Hero Section */}
        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-gaming-accent mb-4"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] font-mono">Top Pick of the Week</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            Play Hard.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gaming-accent to-blue-300">Unblocked.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl leading-relaxed"
          >
            Welcome to the Vault. No restrictions, no filters. Your favorite browser-based 
            classics, optimized for any device.
          </motion.p>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-2 bg-gaming-card p-1 rounded-xl border border-gaming-border w-fit overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-gaming-accent text-white shadow-[0_0_15px_rgba(59,130,246,0.25)]' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <span className="flex items-center gap-2"><LayoutGrid className="w-3 h-3" /> {filteredGames.length} Games</span>
            <div className="w-[1px] h-3 bg-gray-800" />
            <span className="flex items-center gap-2"><History className="w-3 h-3" /> Recently Updated</span>
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  onClick={setSelectedGame} 
                />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key="empty"
                className="col-span-full py-20 text-center"
              >
                <div className="inline-block p-4 bg-gaming-card rounded-full mb-4">
                  <Clock className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">No Games Found</h3>
                <p className="text-gray-500">Try adjusting your search or category filters.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {selectedGame && (
          <GameViewer 
            game={selectedGame} 
            onClose={() => setSelectedGame(null)} 
          />
        )}
      </AnimatePresence>

      <footer className="mt-40 border-t border-gaming-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
            <div className="p-2 bg-gaming-accent rounded-lg">
              <History className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-sm font-bold tracking-tight">
              GAMING<span className="text-gaming-accent">VAULT</span>
            </span>
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-gray-600 font-bold">
            <a href="#" className="hover:text-gaming-accent transition-colors">Discord</a>
            <a href="#" className="hover:text-gaming-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-gaming-accent transition-colors">Terms</a>
            <a href="#" className="hover:text-gaming-accent transition-colors">DMCA</a>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">
            © 2026 UNBLOCKED VAULT
          </p>
        </div>
      </footer>
    </div>
  );
}
