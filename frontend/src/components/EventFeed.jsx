export default function EventFeed({ events = [] }) {
  const statusColors = {
    RECEIVED: "text-blue-400",
    PROCESSING: "text-yellow-400",
    SUCCESS: "text-green-400",
    RETRY: "text-orange-400",
    DEAD: "text-red-400"
  };

  const statusIcons = {
    RECEIVED: "📥",
    PROCESSING: "⚙️",
    SUCCESS: "✅",
    RETRY: "🔁",
    DEAD: "💀"
  };

  return (
    <div className="bg-zinc-900/60 border border-white/5 rounded-xl p-6">

      <h2 className="text-lg font-semibold mb-4">
        Live Event Feed
      </h2>

      <div className="space-y-2 max-h-[420px] overflow-y-auto text-sm">
        {events.length === 0 ? (
          <div className="text-white/30 text-center py-8">
            Waiting for events...
          </div>
        ) : (
          events.map((e, i) => (
            <div
              key={i}
              className="flex items-center gap-3 border-b border-white/5 pb-1"
            >
              <span>{statusIcons[e.status] || "•"}</span>
              <span className={`font-medium ${statusColors[e.status] || "text-white/70"}`}>
                {e.status}
              </span>
              <span className="text-white/70">{e.type}</span>
              {e.retry > 0 && (
                <span className="text-xs text-white/40">
                  (retry #{e.retry})
                </span>
              )}
              <span className="ml-auto text-white/30 text-xs">
                {new Date(e.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}