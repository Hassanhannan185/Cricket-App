import React from 'react';
import { motion } from 'motion/react';
import { LogIn } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';

const LoginScreen: React.FC = () => {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login Failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070A] flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#CCFF00]/10 blur-[150px] rounded-full" />
      </div>

      {/* Animated Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 mb-12"
      >
        <img src="/src/assets/images/neon_cricket_ball_1779030598743.png" alt="Cricket Ball" className="w-48 h-48 drop-shadow-[0_0_50px_rgba(204,255,0,0.3)]" />
      </motion.div>

      <div className="relative z-10 text-center space-y-4 max-w-sm">
        <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
          Cricket <span className="text-[#CCFF00]">Legends</span> AI
        </h1>
        <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em] leading-relaxed">
          The next generation of <br/> esports cricket simulation
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogin}
        className="relative z-10 mt-12 bg-[#CCFF00] text-black px-10 py-5 rounded-2xl flex items-center space-x-4 font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(204,255,0,0.2)] hover:shadow-[0_0_40px_rgba(204,255,0,0.4)] italic"
      >
        <LogIn size={20} />
        <span>Join the Arena</span>
      </motion.button>

      <div className="absolute bottom-12 text-[10px] text-white/20 uppercase tracking-[0.5em] font-black">
        Powered by Google Gemini
      </div>
    </div>
  );
};

export default LoginScreen;
