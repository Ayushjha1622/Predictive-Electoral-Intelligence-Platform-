import { motion } from "framer-motion";

export default function MatrixTable({ data }) {
  const factors = [
    { key: "partyStrength", label: "Organization" },
    { key: "pastWork", label: "Track Record" },
    { key: "personalBase", label: "Personal Base" },
    { key: "casteBase", label: "Caste Demo" },
    { key: "religiousBase", label: "Religious Demo" },
    { key: "sentiment", label: "Sentiment" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass overflow-hidden mt-6"
    >
      <div className="p-5 border-b border-white/5 bg-white/5">
        <h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.2em]">MULTI-FACTOR COMPARISON GRID</h3>
        <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Cross-Subject Analytical Matrix</p>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-[10px] font-bold uppercase tracking-widest text-left">
          <thead>
            <tr className="bg-slate-900/50">
              <th className="py-3 md:py-4 px-3 md:px-6 text-slate-600 border-r border-white/5">Factor_ID</th>
              {data.map(c => (
                <th key={c.name} className="py-3 md:py-4 px-3 md:px-6 text-center text-white border-r border-white/5 last:border-0">{c.name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {factors.map((f, idx) => (
              <tr key={f.key} className={`${idx % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"} hover:bg-white/[0.05] transition-colors`}>
                <td className="py-2 md:py-3 px-3 md:px-6 text-slate-500 border-r border-white/5">{f.label}</td>
                {data.map(c => (
                  <td key={c.name} className="py-2 md:py-3 px-3 md:px-6 text-center border-r border-white/5 last:border-0">
                    <span className={`px-2 py-1 rounded-md ${
                      c[f.key] < 5 ? "bg-red-400/5 text-red-400" : "bg-emerald-400/5 text-emerald-400"
                    }`}>
                      {c[f.key]?.toFixed(1)}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-cyan-400/[0.05] border-t border-cyan-400/20">
              <td className="py-3 md:py-4 px-3 md:px-6 text-cyan-400 font-black">POWER_INDEX</td>
              {data.map(c => (
                <td key={c.name} className="py-3 md:py-4 px-3 md:px-6 text-center text-cyan-400 font-black text-xs border-r border-cyan-400/10 last:border-0">
                  {c.score?.toFixed(2)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
