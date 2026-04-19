import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PoWChart({ data }) {
  if (!data || data.length === 0) return null;

  const chartData = {
    labels: data.map(c => c.name),
    datasets: [{
      label: 'Winning Probability (%)',
      data: data.map(c => c.pow),
      backgroundColor: 'rgba(34, 197, 94, 0.4)',
      borderColor: '#22c55e',
      borderWidth: 2,
      borderRadius: 12,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        titleFont: { size: 12, weight: 'bold' },
        bodyFont: { size: 11 },
        padding: 12,
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } },
        max: 100,
        beginAtZero: true
      },
      y: {
        grid: { display: false },
        ticks: { color: '#ffffff', font: { size: 10, weight: 'bold' } }
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-5 mt-6"
    >
      <div className="mb-4">
        <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">PROBABILITY OF WIN (PoW) DISTRIBUTION</h3>
        <div className="h-[1px] w-full bg-white/5 mt-2"></div>
      </div>
      <div className="h-[250px] w-full">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </motion.div>
  );
}
