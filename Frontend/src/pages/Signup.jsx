import { useState } from "react";
import AuthCard from "../components/AuthCard";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const signup = async () => {
    if (form.password.length < 5) return alert("Password must be at least 5 chars");
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/signup`, form);
      if (res.status === 201) window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Create Account">
      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-black text-slate-500 mb-2 block uppercase tracking-[0.2em]">Full Name</label>
          <input
            name="name"
            placeholder="John Doe"
            onChange={handleChange}
            className="input"
          />
        </div>

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
            placeholder="Min. 5 characters"
            onChange={handleChange}
            className="input"
          />
        </div>

        <button 
          onClick={signup} 
          disabled={loading}
          className="btn mt-4"
        >
          {loading ? "Processing..." : "Create Account"}
        </button>

        <div className="pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Cleared operative? <a href="/login" className="text-cyan-400 hover:text-white transition-colors ml-1">Sign In</a>
          </p>
        </div>
      </div>
    </AuthCard>
  );
}
