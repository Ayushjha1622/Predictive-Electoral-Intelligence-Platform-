import { motion } from "framer-motion";

export default function GapAnalysis({ gaps }) {
  return (
    <div className="glass">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-red-400 text-xs font-black uppercase tracking-widest">
          STRATEGIC VULNERABILITY ANALYSIS
        </h3>
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
      </div>

      <div className="space-y-4">
        {gaps.map((g, i) => (
          <motion.div
            key={i}
            className="p-4 rounded-xl border border-white/5 bg-white/[0.02]"
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-white font-bold text-[10px] uppercase tracking-wider">
                {g.name}
              </h4>

              {g.gaps.length === 0 ? (
                <span className="text-emerald-400 text-[8px] font-black uppercase tracking-widest">
                  Secure
                </span>
              ) : (
                <span className="text-red-400 text-[8px] font-black uppercase tracking-widest">
                  {g.gaps.length} Gaps
                </span>
              )}
            </div>

            {/* BODY */}
            {g.gaps.length === 0 ? (
              <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">
                No issues
              </p>
            ) : (
              <ul className="space-y-2">
                {g.gaps.map((gap, idx) => (
                  <li
                    key={idx}
                    className={`text-[9px] font-bold uppercase tracking-wide flex items-center gap-2 transition-all hover:translate-x-1 ${
                      gap.includes("critical") ? "text-red-400" : "text-yellow-400"
                    }`}
                  >
                    <div className={`w-1 h-1 rounded-full ${
                      gap.includes("critical") ? "bg-red-400" : "bg-yellow-400"
                    }`}></div>
                    {formatGap(gap)}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 🔧 FORMAT TEXT (IMPORTANT UX)
function formatGap(gap) {
  return gap
    .replace(/([A-Z])/g, " $1")
    .replace("is weak", "Weak")
    .replace("is critical", "Critical")
    .split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    .replace(/^./, str => str.toUpperCase());
}
