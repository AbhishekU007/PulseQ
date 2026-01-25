import { useEffect, useState } from "react";
import MetricsGrid from "../components/MetricsGrid";
import { connectMetrics } from "../socket/metricsSocket";

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    connectMetrics(setMetrics);
  }, []);

  return (
    <div className="min-h-screen bg-[#05060f] text-white px-10 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Pulse<span className="text-indigo-400">Q</span> Dashboard
      </h1>

      <MetricsGrid metrics={metrics} />
    </div>
  );
}
