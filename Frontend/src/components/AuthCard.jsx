import { motion } from "framer-motion";

export default function AuthCard({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-6 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[460px] relative z-10"
      >
        <div className="glass p-10 overflow-hidden relative">
          {/* Subtle line decoration */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
          
          <div className="text-center mb-10">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-cyan-500/20"
            >
              <svg className="w-9 h-9 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </motion.div>
            
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-tight">
              {title}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="h-[1px] w-4 bg-slate-700"></div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">
                Intelligence_Node_V4
              </p>
              <div className="h-[1px] w-4 bg-slate-700"></div>
            </div>
          </div>

          <div className="space-y-4">
            {children}
          </div>
        </div>
        
        <p className="text-center mt-10 text-[10px] text-slate-600 font-black uppercase tracking-[0.5em] opacity-50">
          &copy; 2026 Aegis Intelligence Network
        </p>
      </motion.div>
    </div>
  );
}
