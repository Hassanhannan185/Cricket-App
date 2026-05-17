import React from 'react';
import { motion } from 'motion/react';
import { User, Settings, LogOut, Award, Target, Flame } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { auth } from '../firebase';

const ProfileScreen: React.FC = () => {
  const { userProfile } = useAuth();

  const handleLogout = () => {
    auth.signOut();
  };

  const statCards = [
    { icon: <Target size={20} className="text-green-400" />, label: 'Matches', value: userProfile?.stats?.matchesPlayed || 0 },
    { icon: <Flame size={20} className="text-orange-400" />, label: 'Wins', value: userProfile?.stats?.wins || 0 },
    { icon: <Award size={20} className="text-purple-400" />, label: 'Century', value: '4' },
    { icon: <Flame size={20} className="text-blue-400" />, label: 'Max FR', value: '185' },
  ];

  return (
    <div className="flex-1 flex flex-col p-6 space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-green-400 to-blue-500 p-1">
            <div className="w-full h-full rounded-[20px] bg-black overflow-hidden relative border border-white/20">
               {userProfile?.profileImage ? (
                 <img src={userProfile.profileImage} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center bg-white/5">
                   <User className="text-white/20" size={40} />
                 </div>
               )}
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-lg px-2 py-1 text-[10px] font-black border-2 border-black">
            LVL {userProfile?.level || 1}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">{userProfile?.username || 'Legend'}</h2>
          <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">Professional League Tier 2</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
              {stat.icon}
            </div>
            <div className="text-[10px] text-white/30 uppercase font-black tracking-widest">{stat.label}</div>
            <div className="text-lg font-black italic tracking-tighter">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Action List */}
      <div className="space-y-2 pb-10">
         <button className="w-full flex justify-between items-center p-5 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-colors">
            <div className="flex items-center space-x-4">
              <Settings size={20} className="text-white/40 group-hover:text-white transition-colors" />
              <span className="text-sm font-bold uppercase italic tracking-tighter">Account Settings</span>
            </div>
            <div className="text-white/20 group-hover:text-white">→</div>
         </button>
         
         <button 
           onClick={handleLogout}
           className="w-full flex justify-between items-center p-5 bg-red-500/10 border border-red-500/20 rounded-2xl group hover:bg-red-500/20 transition-colors"
         >
            <div className="flex items-center space-x-4">
              <LogOut size={20} className="text-red-400" />
              <span className="text-sm font-bold uppercase italic tracking-tighter text-red-400">Sign Out</span>
            </div>
         </button>
      </div>

      {/* Achievement Footer */}
      <div className="pt-4 border-t border-white/5">
         <div className="text-[10px] text-white/20 uppercase font-black tracking-widest mb-4">Last Match Performance</div>
         <div className="bg-gradient-to-r from-blue-500/10 to-transparent p-4 rounded-xl border-l-2 border-blue-500">
            <div className="text-[10px] font-medium text-white/60">Versus <span className="text-white font-bold">Australia (U-19)</span></div>
            <div className="text-sm font-bold mt-1 text-blue-400 uppercase italic tracking-tighter">M.O.M Award - 82 (54)</div>
         </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
