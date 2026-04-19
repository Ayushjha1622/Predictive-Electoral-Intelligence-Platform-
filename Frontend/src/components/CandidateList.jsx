import { motion } from "framer-motion";

export default function CandidateList({ candidates }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass p-6 h-full flex flex-col"
    >
      <div className="mb-6">
        <h2 className="text-lg font-black text-purple-400 uppercase tracking-widest">CANDIDATE PERFORMANCE MATRIX</h2>
        <div className="h-1 w-12 bg-gradient-to-r from-purple-400 to-transparent mt-1"></div>
      </div>

      <div className="space-y-4 overflow-y-auto flex-grow pr-2 custom-scrollbar">
        {candidates.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-white/5 rounded-2xl">
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">Awaiting_Field_Intel...</p>
          </div>
        ) : (
          candidates.map((c, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{c.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-md">
                      {c.party}
                    </span>
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                      c.incumbency === 'high' ? 'bg-red-400/10 text-red-400' : 'bg-emerald-400/10 text-emerald-400'
                    }`}>
                      {c.incumbency}_RISK
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-cyan-400 leading-none">{c.score?.toFixed(1)}</div>
                  <div className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Power_Index</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-3 border-t border-white/5">
                <div className="space-y-1">
                  <div className="flex justify-between text-[7px] font-black text-slate-600 uppercase tracking-widest">
                    <span>Org_Strength</span>
                    <span>{c.partyStrength * 10}%</span>
                  </div>
                  <div className="progress">
                    <div className="progress-inner" style={{ width: `${c.partyStrength * 10}%` }} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[7px] font-black text-slate-600 uppercase tracking-widest">
                    <span>Sentiment</span>
                    <span>{c.sentiment * 10}%</span>
                  </div>
                  <div className="progress">
                    <div className="progress-inner bg-cyan-400" style={{ width: `${c.sentiment * 10}%` }} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{candidates.length} Units_Analyzed</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
        </div>
      </div>
    </motion.div>
  );
}
