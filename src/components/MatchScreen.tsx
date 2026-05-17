import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Volume2, Info, Activity, MessageSquare } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const MatchScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [overs, setOvers] = useState(1.4);
  const [score, setScore] = useState(145);
  const [wickets, setWickets] = useState(3);
  const [commentary, setCommentary] = useState<string[]>(['Welcome to the finale!', 'Great delivery by the bowler!']);
  const [isAIThinking, setIsAIThinking] = useState(false);

  const statsData = [
    { ball: 1, rr: 6.2 },
    { ball: 2, rr: 7.5 },
    { ball: 3, rr: 7.8 },
    { ball: 4, rr: 8.2 },
    { ball: 5, rr: 8.5 },
    { ball: 6, rr: 8.4 },
  ];

  const generateAICommentary = async () => {
    setIsAIThinking(true);
    try {
      const res = await fetch('/api/commentary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchState: `${score}/${wickets} in ${overs} overs. Last ball was a boundary.` }),
      });
      const data = await res.json();
      setCommentary(prev => [data.text, ...prev.slice(0, 4)]);
    } catch (e) {
      console.error(e);
    }
    setIsAIThinking(false);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#050505] flex flex-col">
      {/* Dynamic Match Background */}
      <div className="absolute top-0 left-0 w-full h-[40%] overflow-hidden">
        <img src="/src/assets/images/stadium_bg_1779030577195.png" alt="Stadium" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/40" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 bg-gradient-to-b from-black/60 to-transparent">
        <button onClick={onBack} className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <div className="text-[10px] font-black tracking-[0.2em] text-[#CCFF00] uppercase">Grand Final</div>
          <div className="text-sm font-bold uppercase italic tracking-tighter">IND vs AUS</div>
        </div>
        <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/80">
          <Volume2 size={24} />
        </button>
      </header>

      {/* Main Stats Area */}
      <div className="relative z-10 flex-1 flex flex-col p-6 space-y-6 overflow-y-auto scrollbar-hide pt-10">
        {/* Scorecard Glass Card */}
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#CCFF00]/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex justify-between items-end">
            <div>
              <div className="text-6xl font-black italic tracking-tighter leading-none flex items-baseline">
                {score} <span className="text-3xl text-white/30 ml-2">/ {wickets}</span>
              </div>
              <div className="text-[10px] font-bold text-white/40 mt-2 uppercase tracking-widest">Overs: {overs} (20.0)</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-[#CCFF00] uppercase tracking-widest mb-1">Curr RR</div>
              <div className="text-2xl font-black italic tracking-tighter">{(score/overs).toFixed(2)}</div>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {[1, 4, 1, 0, 6, 'W'].map((b, i) => (
              <div key={i} className={`h-8 rounded-lg flex items-center justify-center text-[10px] font-black border ${b === 4 || b === 6 ? 'bg-[#CCFF00]/20 border-[#CCFF00]/40 text-[#CCFF00]' : b === 'W' ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-white/5 border-white/10 text-white/60'}`}>
                {b}
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Commentary Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center">
               <Activity size={12} className="mr-2 text-[#00D1FF]" />
               AI Strategy Coach
             </h3>
             <button
              onClick={generateAICommentary}
              disabled={isAIThinking}
              className="text-[10px] font-bold text-[#00D1FF] uppercase tracking-widest hover:underline disabled:opacity-50"
             >
               {isAIThinking ? 'Analyzing...' : 'Refresh Coach'}
             </button>
          </div>
          
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {commentary.map((text, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-4 rounded-2xl border transition-all ${i === 0 ? 'bg-[#00D1FF]/10 border-[#00D1FF]/20 shadow-lg' : 'bg-white/5 border-white/5 opacity-50'}`}
                >
                  <p className="text-sm leading-relaxed font-medium italic">
                    {i === 0 && <span className="font-black text-[#00D1FF] mr-2 uppercase tracking-tighter not-italic text-[10px]">COACH:</span>}
                    "{text}"
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Run Rate Graph */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4 h-48">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40">Performance Graph</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={statsData}>
              <XAxis dataKey="ball" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ background: '#111', border: '1px solid #333', fontSize: '10px', borderRadius: '8px' }}
                itemStyle={{ color: '#CCFF00' }}
              />
              <Line type="monotone" dataKey="rr" stroke="#CCFF00" strokeWidth={3} dot={{ fill: '#CCFF00', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Action Controls */}
      <div className="relative z-10 p-6 bg-black/40 backdrop-blur-xl border-t border-white/10 grid grid-cols-2 gap-4 pb-10">
         <button className="py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors">Strategy</button>
         <button className="py-4 bg-[#CCFF00] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(204,255,0,0.3)]">Jump Action</button>
      </div>
    </div>
  );
};

export default MatchScreen;
