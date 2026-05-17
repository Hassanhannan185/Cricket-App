import React from 'react';
import { motion } from 'motion/react';
import { Home, Trophy, User, ShoppingCart, Settings } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen bg-[#05070A] text-white font-sans overflow-hidden relative">
      {/* Background Stadium Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#CCFF00] rounded-full blur-[120px] opacity-10" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-[#00D1FF] rounded-full blur-[150px] opacity-10" />
      </div>

      <main className="relative z-10 pb-20 max-w-md mx-auto h-screen flex flex-col overflow-y-auto scrollbar-hide">
        {children}
      </main>

      {/* Futuristic Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-black/40 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex justify-between items-center z-50">
        <NavButton active={activeTab === 'home'} icon={<Home size={20} />} onClick={() => setActiveTab('home')} />
        <NavButton active={activeTab === 'modes'} icon={<Trophy size={20} />} onClick={() => setActiveTab('modes')} />
        <NavButton active={activeTab === 'store'} icon={<ShoppingCart size={20} />} onClick={() => setActiveTab('store')} />
        <NavButton active={activeTab === 'profile'} icon={<User size={20} />} onClick={() => setActiveTab('profile')} />
        <NavButton active={activeTab === 'settings'} icon={<Settings size={20} />} onClick={() => setActiveTab('settings')} />
      </nav>
    </div>
  );
};

const NavButton = ({ active, icon, onClick }: { active: boolean; icon: React.ReactNode; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "relative p-2 rounded-xl transition-all duration-300",
      active ? "text-[#CCFF00] bg-[#CCFF00]/10 shadow-[0_0_15px_rgba(204,255,0,0.2)]" : "text-white/40 hover:text-white/60"
    )}
  >
    {icon}
    {active && (
      <motion.div
        layoutId="activeTab"
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#CCFF00] rounded-full shadow-[0_0_10px_#CCFF00]"
      />
    )}
  </button>
);

export default Layout;
