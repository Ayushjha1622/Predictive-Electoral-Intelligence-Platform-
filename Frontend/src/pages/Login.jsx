import { useState } from "react";
import AuthCard from "../components/AuthCard";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const login = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, form);
      if (res.status === 200) window.location.href = "/";
    } catch (err) {
      const data = err.response?.data || {};
      alert(data.details || data.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Welcome Back">
      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-black text-slate-500 mb-2 block uppercase tracking-[0.2em]">Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="name@company.com"
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="text-[10px] font-black text-slate-500 mb-2 block uppercase tracking-[0.2em]">Password</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            onChange={handleChange}
            className="input"
          />
        </div>

        <button 
          onClick={login} 
          disabled={loading}
          className="btn mt-4"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
              Verifying...
            </span>
          ) : "Sign In"}
        </button>

        <div className="pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            New operative? <a href="/signup" className="text-cyan-400 hover:text-white transition-colors ml-1">Create Account</a>
          </p>
        </div>
      </div>
    </AuthCard>
  );
}
