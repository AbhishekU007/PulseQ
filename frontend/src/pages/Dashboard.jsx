import { useEffect, useState } from "react";
import { connectMetrics } from "../components/socket";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    received: 0,
    processed: 0,
    retried: 0,
    dead: 0
  });

  useEffect(() => {
    connectMetrics(setMetrics);
  }, []);

  return (
    <div className="p-10 space-y-10">

      <h1 className="text-3xl font-semibold">
        PulseQ Dashboard
        <span className="ml-3 text-green-400 text-sm">● LIVE</span>
      </h1>

      <div className="grid grid-cols-4 gap-6">
        <Metric title="Received" value={metrics.received} />
        <Metric title="Processed" value={metrics.processed} />
        <Metric title="Retried" value={metrics.retried} />
        <Metric title="Dead" value={metrics.dead} />
      </div>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:scale-[1.02] transition">
      <p className="text-white/60 text-sm">{title}</p>
      <h2 className="text-4xl font-bold mt-2">{value}</h2>
    </div>
  );
}
