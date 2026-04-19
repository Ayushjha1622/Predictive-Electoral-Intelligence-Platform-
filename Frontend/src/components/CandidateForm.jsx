import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CandidateForm({ setCandidates }) {
  const [form, setForm] = useState({
    name: "",
    party: "",
    incumbency: "low",
    pastWork: 5,
    sentiment: 5,
    partyStrength: 5,
    personalBase: 5,
    casteBase: 5,
    religiousBase: 5
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/candidate`, form);
      setCandidates(prev => [...prev, res.data]);
      setForm({
        name: "",
        party: "",
        incumbency: "low",
        pastWork: 5,
        sentiment: 5,
        partyStrength: 5,
        personalBase: 5,
        casteBase: 5,
        religiousBase: 5
      });
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  const sliders = [
    { name: "pastWork", label: "Track Record" },
    { name: "sentiment", label: "Sentiment" },
    { name: "partyStrength", label: "Organization" },
    { name: "personalBase", label: "Personal Base" },
    { name: "casteBase", label: "Caste Demographic" },
    { name: "religiousBase", label: "Religious Demographic" }
  ];

  return (
    <motion.div whileHover={{ y: -5 }} className="glass p-6">
      <div className="mb-6">
        <h2 className="text-lg font-black text-cyan-400 uppercase tracking-widest">CANDIDATE DATA INGESTION</h2>
        <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-transparent mt-1"></div>
      </div>

      <div className="space-y-4">
        <input name="name" placeholder="SUBJECT_NAME" value={form.name} onChange={handleChange} className="input" />
        <input name="party" placeholder="STRATEGIC_ALIGNMENT" value={form.party} onChange={handleChange} className="input" />

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Anti-Incumbency Risk</label>
          <select name="incumbency" value={form.incumbency} onChange={handleChange} className="input cursor-pointer">
            <option value="low">Low (Favorable)</option>
            <option value="medium">Medium</option>
            <option value="high">High (Warning)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {sliders.map(s => (
            <div key={s.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none">{s.label}</label>
                <span className="text-[9px] font-black text-cyan-400">{form[s.name]}</span>
              </div>
              <input
                name={s.name}
                type="range"
                min="1"
                max="10"
                value={form[s.name]}
                onChange={handleChange}
                className="w-full accent-cyan-400 h-1 bg-white/5 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      <button onClick={submit} className="btn mt-8">
        Register_Subject
      </button>
    </motion.div>
  );
}
