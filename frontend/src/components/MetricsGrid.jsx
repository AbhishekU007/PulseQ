import StatCard from "./StatCard";

export default function MetricsGrid({ metrics }) {
  if (!metrics) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Received" value={metrics.received} glow="shadow-indigo-500/30" />
      <StatCard title="Processed" value={metrics.processed} glow="shadow-emerald-500/30" />
      <StatCard title="Retried" value={metrics.retried} glow="shadow-yellow-500/30" />

      <StatCard title="Dead" value={metrics.dead} glow="shadow-red-500/30" />
      <StatCard title="Main Queue" value={metrics.mainQueueSize} glow="shadow-sky-500/30" />
      <StatCard title="Retry Queue" value={metrics.retryQueueSize} glow="shadow-orange-500/30" />
    </div>
  );
}
