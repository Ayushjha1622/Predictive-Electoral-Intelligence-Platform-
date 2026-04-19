import CandidateForm from "../components/CandidateForm";
import CandidateList from "../components/CandidateList";
import ResultPanel from "../components/ResultPanel";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

axios.defaults.withCredentials = true;

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/candidates`);
        setCandidates(res.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        if (error.response?.status === 401) window.location.href = "/login";
      }
    };
    fetchCandidates();
  }, []);

  const runPrediction = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/compare`, { candidates });
      setTimeout(() => {
        setResult(res.data);
        setLoading(false);
      }, 800); // Artificial delay for "analyst" feel
    } catch (error) {
      console.error("Prediction failed:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617]">
      <Navbar />

      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-10 space-y-8">
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">
            PREDICTIVE <span className="text-cyan-400">ELECTORAL INTELLIGENCE</span> PLATFORM
          </h2>
          <p className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">Multi-Factor Candidate Analysis & Outcome Forecasting Engine</p>
        </motion.div>

        {/* TOP ROW: INPUT & ROSTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4"
          >
            <CandidateForm setCandidates={setCandidates} />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-8"
          >
            <CandidateList candidates={candidates} />
          </motion.div>
        </div>

        {/* BOTTOM SECTION: ANALYTICS ENGINE (FULL WIDTH) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full"
        >
          <ResultPanel 
            candidates={candidates} 
            result={result} 
            setResult={setResult}
            runPrediction={runPrediction} 
            loading={loading}
          />
        </motion.div>
      </main>
      
      <footer className="mt-20 p-10 border-t border-white/5 text-center">
        <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.4em]">
          Aegis Intelligence Network // Protocol_Secure // &copy; 2026
        </p>
      </footer>
    </div>
  );
}
