import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export default function GameCard({ game, onClick }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      onClick={() => onClick(game)}
      className="group cursor-pointer bg-gaming-card border border-gaming-border rounded-2xl overflow-hidden gaming-card-hover flex flex-col h-full"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="p-4 bg-gaming-accent rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <Play className="w-8 h-8 fill-current text-white" />
          </div>
        </div>
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-bold uppercase tracking-widest border border-white/10">
          {game.category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-gaming-accent transition-colors">
          {game.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed flex-grow">
          {game.description}
        </p>
      </div>
    </motion.div>
  );
}
