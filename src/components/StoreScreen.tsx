import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Star, Zap, Shield, CreditCard, ChevronRight } from 'lucide-react';
import { useAuth } from '../AuthContext';

const StoreScreen: React.FC = () => {
  const items = [
    { name: 'Starter pack', price: '$4.99', desc: '5,000 Coins + 2 Premium Skills', type: 'BUNDLE', color: 'from-blue-500/20 to-blue-600/5' },
    { name: 'Elite Jersey', price: '2000', desc: 'Exclusive Neon Night Kit', type: 'SKIN', color: 'from-purple-500/20 to-purple-600/5', isCoins: true },
    { name: 'Titan Stadium', price: '5000', desc: 'Futuristic Arena Unlocked', type: 'STADIUM', color: 'from-green-500/20 to-green-600/5', isCoins: true },
    { name: 'Battle Pass', price: '$9.99', desc: 'Unlock Season 5 Rewards', type: 'PASS', color: 'from-yellow-500/20 to-yellow-600/5' }
  ];

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6">
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Elite <span className="text-[#CCFF00]">Store</span></h1>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Upgrade your Legend</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-1 flex items-center space-x-2">
           <Star size={14} className="text-[#00D1FF] fill-[#00D1FF]" />
           <span className="text-sm font-black italic">500</span>
        </div>
      </header>

      <div className="space-y-4 pb-10">
        {/* Featured Card */}
        <motion.div
           whileHover={{ scale: 1.01 }}
           className="relative h-44 rounded-3xl overflow-hidden border border-[#CCFF00]/20 bg-gradient-to-br from-[#CCFF00]/10 to-transparent p-6 flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 p-4 opacity-20">
             <Shield className="text-[#CCFF00]" size={60} strokeWidth={1} />
          </div>
          <div>
            <div className="text-[10px] font-black text-[#CCFF00] uppercase tracking-widest mb-1">Seasonal Exclusive</div>
            <div className="text-3xl font-black uppercase italic tracking-tighter leading-none">Season 5 <br/> Battle Pass</div>
          </div>
          <button className="w-fit px-8 py-2.5 bg-[#CCFF00] text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform">Get Access</button>
        </motion.div>

        {/* Categories */}
        <div className="grid grid-cols-1 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`group flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-gradient-to-r ${item.color} backdrop-blur-sm hover:border-white/20 transition-all cursor-pointer`}
            >
              <div className="flex items-center space-x-4">
                 <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center group-hover:bg-white/5 transition-colors">
                    <ShoppingBag size={20} className="text-white/40 group-hover:text-[#CCFF00] transition-colors" />
                 </div>
                 <div>
                   <div className="flex items-center space-x-2">
                     <span className="text-sm font-black uppercase italic tracking-tighter">{item.name}</span>
                     <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-white/5 text-white/40 font-black tracking-widest">{item.type}</span>
                   </div>
                   <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">{item.desc}</p>
                 </div>
              </div>
              <button className="flex items-center space-x-1 px-4 py-2 bg-white/5 rounded-xl border border-white/10 group-hover:border-white/30 transition-colors">
                {item.isCoins && <Star size={12} className="text-[#00D1FF] fill-[#00D1FF]" />}
                <span className="text-xs font-black italic">{item.price}</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreScreen;
