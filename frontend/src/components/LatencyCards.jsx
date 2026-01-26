export default function LatencyCards({ latency }) {
  if (!latency){
    return (
      <div className="grid grid-cols-3 gap-4">
        {["p50", "p95", "p99"].map(label => (
          <div
            key={label}
            className="bg-zinc-900/60 border border-white/5 rounded-xl p-4 text-center"
          >
            <div className="text-xs text-white/50">
              {label.toUpperCase()}
            </div>
            <div className="h-8 w-16 mx-auto mt-2 bg-white/10 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }

  const items = [
    { label: "p50", value: latency.p50 },
    { label: "p95", value: latency.p95 },
    { label: "p99", value: latency.p99 }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map(i => (
        <div
          key={i.label}
          className="bg-zinc-900/60 border border-white/5 rounded-xl p-4 text-center"
        >
          <div className="text-xs text-white/50">
            {i.label.toUpperCase()}
          </div>

          <div className="text-2xl font-bold mt-1">
            {i.value}
            <span className="text-sm text-white/40 ml-1">ms</span>
          </div>
        </div>
      ))}
    </div>
  );
}
