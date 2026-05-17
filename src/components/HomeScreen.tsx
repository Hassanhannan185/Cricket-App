import React from 'react';
import { motion } from 'motion/react';
import { Play, Zap, Gift, User, Star } from 'lucide-react';
import { useAuth } from '../AuthContext';

const HomeScreen: React.FC = () => {
  const { userProfile } = useAuth();

  return (
    <div className="relative flex-1 flex flex-col p-6 space-y-6">
      {/* Header Profile */}
      <div className="flex justify-between items-center bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#CCFF00] to-[#00D1FF] p-[2px]">
            <div className="w-full h-full rounded-[6px] bg-black overflow-hidden relative">
              {userProfile?.profileImage && <img src={userProfile.profileImage} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-white/50 font-bold uppercase tracking-[0.1em]">Level {userProfile?.level || 48}</div>
            <div className="text-sm font-black italic tracking-tighter">{userProfile?.username || 'MAX_STRIKER'}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 bg-white/5 rounded-full px-3 py-1 border border-white/10">
            <span className="text-[#CCFF00] text-[10px] font-black tracking-tighter italic">⚡ 4,250</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-white/5 rounded-full px-3 py-1 border border-white/10">
            <span className="text-[#00D1FF] text-[10px] font-black tracking-tighter italic">💎 120</span>
          </div>
        </div>
      </div>

      {/* Live Match Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-56 rounded-3xl overflow-hidden border border-white/10 group shadow-2xl"
      >
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/src/assets/images/stadium_bg_1779030577195.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
          <div>
            <span className="bg-red-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">Live: World Series</span>
            <h2 className="text-4xl font-black mt-2 italic uppercase tracking-tighter leading-none">INDIA <span className="text-[#CCFF00]">VS</span> <br/> AUSTRALIA</h2>
            <p className="text-[#00D1FF] text-[10px] font-bold uppercase tracking-widest mt-2">Stadium: MCG • Over 14.2</p>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-[#CCFF00] text-black py-3 rounded-xl font-black uppercase tracking-wide text-[10px] italic hover:scale-[1.02] transition-transform">Jump In</button>
            <button className="flex-1 bg-white/10 backdrop-blur-md text-white border border-white/20 py-3 rounded-xl font-black uppercase tracking-wide text-[10px] italic hover:bg-white/20 transition-all">Spectate</button>
          </div>
        </div>
      </motion.div>

      {/* Play Button Shortcut */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative py-5 rounded-2xl bg-gradient-to-r from-[#CCFF00] to-[#99CC00] shadow-[0_10px_40px_rgba(204,255,0,0.3)] group overflow-hidden border-t border-white/40"
      >
        <div className="relative flex items-center justify-center space-x-3 text-black">
          <Play size={24} className="fill-black" />
          <span className="text-xl font-black uppercase tracking-widest italic">Play Now</span>
        </div>
      </motion.button>

      {/* Daily Rewards Grid */}
      <div className="flex gap-4">
        {[
          { label: 'D1', val: 'CLAIMED', color: 'bg-[#CCFF00] text-black shadow-[0_0_15px_rgba(204,255,0,0.3)]', active: true },
          { label: 'D2', val: '500₵', color: 'bg-white/5 border border-white/10 text-white/40' },
          { label: 'D3', val: 'GIFT', color: 'bg-white/5 border border-white/10 text-white/40' },
        ].map((item, i) => (
          <div key={i} className={`flex-1 aspect-square rounded-2xl flex flex-col items-center justify-center space-y-1 ${item.color}`}>
            <span className="text-sm font-black">{item.label}</span>
            <span className="text-[8px] font-black uppercase tracking-tighter">{item.val}</span>
          </div>
        ))}
      </div>

      {/* Trending Tournaments */}
      <div className="space-y-4 pt-2">
        <div className="flex justify-between items-center">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 pl-1">Arena Events</h3>
          <span className="text-[8px] font-bold text-[#00D1FF] uppercase tracking-widest">View All</span>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {['LEGENDS CUP', 'PRO MASTERS', 'ASHES AI'].map((t, i) => (
            <div key={i} className="min-w-[160px] aspect-[16/9] rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col justify-end group cursor-pointer hover:border-[#CCFF00]/40 transition-all">
              <div className="text-sm font-black uppercase italic tracking-tighter group-hover:text-[#CCFF00] transition-colors">{t}</div>
              <div className="text-xs text-white/30 font-bold uppercase tracking-widest mt-1">Tier: Diamond</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Trophy = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

export default HomeScreen;
