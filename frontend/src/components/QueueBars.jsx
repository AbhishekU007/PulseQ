export default function QueueBars({ metrics }) {
  if (!metrics) {
    return (
      <div className="bg-zinc-900/60 rounded-xl p-6 border border-white/5">
        <h3 className="text-sm text-white/60 mb-6">
          Queue Pressure
        </h3>
        <div className="space-y-5">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <div className="h-3 w-12 bg-white/10 rounded animate-pulse"></div>
                <div className="h-3 w-6 bg-white/10 rounded animate-pulse"></div>
              </div>
              <div className="h-3 rounded bg-white/5 overflow-hidden">
                <div className="h-full w-1/3 bg-white/10 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const queues = [
    {
      name: "MAIN",
      value: metrics.mainQueueSize,
      color: "bg-emerald-500"
    },
    {
      name: "RETRY",
      value: metrics.retryQueueSize,
      color: "bg-amber-500"
    },
    {
      name: "DEAD",
      value: metrics.deadQueueSize,
      color: "bg-rose-500"
    }
  ];

  return (
    <div className="bg-zinc-900/60 rounded-xl p-6 border border-white/5">

      <h3 className="text-sm text-white/60 mb-6">
        Queue Pressure
      </h3>

      <div className="space-y-5">
        {queues.map(q => (
          <div key={q.name}>
            <div className="flex justify-between mb-1 text-xs text-white/70">
              <span>{q.name}</span>
              <span>{q.value}</span>
            </div>

            <div className="h-3 rounded bg-white/5 overflow-hidden">
              <div
                className={`${q.color} h-full transition-all duration-500`}
                style={{
                  width: `${Math.min(q.value * 10, 100)}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {(metrics.retryQueueSize > 5 ||
        metrics.deadQueueSize > 0) && (
        <div className="mt-5 text-xs text-rose-400">
          ⚠ System under pressure
        </div>
      )}
    </div>
  );
}
