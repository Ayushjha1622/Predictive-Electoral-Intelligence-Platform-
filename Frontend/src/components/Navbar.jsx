import axios from "axios";
import { motion } from "framer-motion";

export default function Navbar() {
  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`);
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="border-b border-white/10 px-8 py-5 flex justify-between items-center sticky top-0 z-50 bg-[#020617]/40 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <motion.div 
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20"
        >
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </motion.div>
        <div>
          <h1 className="text-sm font-black text-white uppercase tracking-tighter leading-none">
            ELECTORAL <span className="text-cyan-400">INTELLIGENCE</span>
          </h1>
          <p className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Operational Analytics System</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
          <span className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">Live_Intel_Stream</span>
        </div>
        
        <button 
          onClick={logout}
          className="text-xs font-black text-slate-400 hover:text-white transition-all uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-white/5"
        >
          Terminate_Session
        </button>
      </div>
    </nav>
  );
}
