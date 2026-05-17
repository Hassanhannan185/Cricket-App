import { AuthProvider, useAuth } from './AuthContext';
import Layout from './components/Layout';
import HomeScreen from './components/HomeScreen';
import GameModes from './components/GameModes';
import ProfileScreen from './components/ProfileScreen';
import StoreScreen from './components/StoreScreen';
import MatchScreen from './components/MatchScreen';
import LoginScreen from './LoginScreen';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

function AppContent() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [inMatch, setInMatch] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
           className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'modes':
        return <GameModes />;
      case 'store':
        return <StoreScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'settings':
        return (
          <div className="flex-1 flex items-center justify-center p-6 text-center">
            <div className="space-y-4">
              <div className="text-3xl font-black uppercase italic tracking-tighter text-white/20">Under Construction</div>
              <p className="text-xs text-white/40 uppercase tracking-widest font-bold">New features arriving in the next season</p>
            </div>
          </div>
        );
      default:
        return <HomeScreen />;
    }
  };

  return (
    <>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col pt-12"
          >
             {/* Virtual Header */}
             <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-0" />
             
             {/* Floating Play Trigger (Only on Home) */}
             {activeTab === 'home' && (
                <div className="px-6 py-4">
                  <motion.div 
                    onClick={() => setInMatch(true)}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 border border-white/10 p-1 pr-6 rounded-full flex items-center space-x-3 cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                       <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-black ml-1" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-green-400">Quick Match: India vs Australia</span>
                  </motion.div>
                </div>
             )}

             {renderContent()}
          </motion.div>
        </AnimatePresence>
      </Layout>

      {/* Fullscreen Match Overlay */}
      <AnimatePresence>
        {inMatch && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100]"
          >
            <MatchScreen onBack={() => setInMatch(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
