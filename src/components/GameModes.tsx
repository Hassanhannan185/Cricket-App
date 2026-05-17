import React from 'react';
import { motion } from 'motion/react';
import { Users, Globe, Trophy, Play, Target, Briefcase } from 'lucide-react';

const GameModes: React.FC = () => {
  const modes = [
    { id: 'quick', name: 'Quick Match', icon: <Play className="text-[#CCFF00]" />, desc: '3 Overs - Instant Action', bg: 'bg-[#CCFF00]/5 border-[#CCFF00]/10', hover: 'hover:border-[#CCFF00]/40' },
    { id: 'multi', name: 'Online Battle', icon: <Users className="text-[#00D1FF]" />, desc: 'Real Players - Real Tension', bg: 'bg-[#00D1FF]/5 border-[#00D1FF]/10', hover: 'hover:border-[#00D1FF]/40' },
    { id: 'tournament', name: 'Tournament', icon: <Trophy className="text-[#CCFF00]" />, desc: 'Climb the Ranks', bg: 'bg-[#CCFF00]/5 border-[#CCFF00]/10', hover: 'hover:border-[#CCFF00]/40' },
    { id: 'world-cup', name: 'World Cup', icon: <Globe className="text-purple-400" />, desc: 'Greatness Awaits', bg: 'bg-purple-500/5 border-purple-500/10', hover: 'hover:border-purple-400/40' },
    { id: 'practice', name: 'Practice Nets', icon: <Target className="text-red-400" />, desc: 'Sharpen your Skills', bg: 'bg-red-500/5 border-red-500/10', hover: 'hover:border-red-400/40' },
    { id: 'career', name: 'Career Mode', icon: <Briefcase className="text-orange-400" />, desc: 'Become a Legend', bg: 'bg-orange-500/5 border-orange-500/10', hover: 'hover:border-orange-400/40' },
  ];

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Choose <span className="text-[#CCFF00]">Mode</span></h1>
        <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Select your battlefield</p>
      </header>

      <div className="grid grid-cols-1 gap-4 overflow-y-auto pr-1 scrollbar-hide pb-10">
        {modes.map((mode, i) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative p-5 rounded-2xl border ${mode.bg} ${mode.hover} backdrop-blur-md cursor-pointer overflow-hidden transition-all duration-300`}
          >
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  {mode.icon}
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase italic tracking-tighter leading-none group-hover:text-white transition-colors">{mode.name}</h3>
                  <p className="text-[10px] text-white/40 font-bold mt-1 uppercase tracking-wider">{mode.desc}</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play size={14} className="fill-white" />
              </div>
            </div>
            {/* Background Accent Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[2px] h-12 bg-current opacity-40 blur-[2px] transition-all group-hover:h-full" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GameModes;
