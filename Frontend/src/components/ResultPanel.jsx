import { motion, AnimatePresence } from "framer-motion";
import MatrixTable from "./MatrixTable";
import GapAnalysis from "./GapAnalysis";
import PoWChart from "./PoWChart";

export default function ResultPanel({ candidates, result, runPrediction, loading }) {
  return (
    <div className="space-y-6">
      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-cyan-400 uppercase tracking-[0.2em]">
            STRATEGIC INTELLIGENCE ENGINE
          </h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Operational Outcome Modeler</p>
        </div>

        <button 
          onClick={runPrediction} 
          disabled={candidates.length < 2 || loading}
          className="btn w-56 shadow-lg shadow-cyan-500/20 relative overflow-hidden"
        >
          <span className={loading ? "opacity-0" : "opacity-100"}>
            {result ? "Recalculate_Matrix" : "Run Prediction"}
          </span>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          )}
        </button>
      </div>

      {/* 🏆 RESULT STRIP */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass flex flex-col md:flex-row justify-between items-center px-10 py-6 gap-6"
          >
            <div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Projected Winner</p>
              <h2 className="text-3xl font-black text-emerald-400 uppercase tracking-tighter">
                {result.winner.name}
              </h2>
            </div>

            <div className="text-right">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Power Index</p>
              <h2 className="text-2xl font-black text-cyan-400">
                {result.winner.score.toFixed(2)}
              </h2>
            </div>

            <div className="text-right">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Win Probability</p>
              <h2 className="text-2xl font-black text-purple-400">
                {result.winner.pow}%
              </h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧠 MAIN GRID */}
      {result && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* ⚠️ GAP PANEL (LEFT SMALL) */}
          <div className="md:col-span-4 sticky top-28">
            <GapAnalysis gaps={result.gaps} />
          </div>

          {/* 📊 MATRIX (MAIN BIG) */}
          <div className="md:col-span-8">
            <MatrixTable data={result.matrix} />
          </div>
        </div>
      )}

      {/* 📉 CHART (FULL WIDTH) */}
      {result && !loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass mt-6"
        >
          <PoWChart data={result.matrix} />
        </motion.div>
      )}

      {(!result || loading) && (
        <div className="glass p-20 text-center opacity-20 border-dashed">
          <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.5em]">
            {loading ? "SYNTHESIZING_MATRIX_DATA..." : "SYSTEM_IDLE // AWAITING_COORDINATES"}
          </p>
        </div>
      )}
    </div>
  );
}
