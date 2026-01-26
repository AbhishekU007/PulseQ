import { useEffect, useRef, useState, useCallback } from "react";

export default function ThroughputChart({ metrics }) {
  const [points, setPoints] = useState([]);
  const lastProcessed = useRef(null);
  const lastTime = useRef(null);
  const pendingUpdate = useRef(null);

  const updatePoints = useCallback((newRate) => {
    setPoints(p => {
      const next = [...p, Math.max(0, newRate)];
      return next.slice(-30);
    });
  }, []);

  useEffect(() => {
    if (!metrics) return;

    const now = Date.now();

    // Initialize on first run
    if (lastTime.current === null) {
      lastTime.current = now;
      lastProcessed.current = metrics.processed;
      return;
    }

    const deltaEvents = metrics.processed - lastProcessed.current;
    const deltaTime = (now - lastTime.current) / 1000;
    const rate = deltaTime > 0 ? deltaEvents / deltaTime : 0;

    // Use requestAnimationFrame to defer the state update
    if (pendingUpdate.current) {
      cancelAnimationFrame(pendingUpdate.current);
    }
    
    pendingUpdate.current = requestAnimationFrame(() => {
      updatePoints(rate);
    });

    lastProcessed.current = metrics.processed;
    lastTime.current = now;

    return () => {
      if (pendingUpdate.current) {
        cancelAnimationFrame(pendingUpdate.current);
      }
    };
  }, [metrics, updatePoints]);

  return (
    <div className="bg-zinc-900/60 rounded-xl p-6 border border-white/5">
      <h3 className="text-sm text-white/60 mb-4">
        Throughput (events/sec)
      </h3>

      <div className="flex items-end h-40 gap-1">
        {points.length === 0 ? (
          <div className="text-white/30 text-sm m-auto">Waiting for data...</div>
        ) : (
          points.map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-md bg-indigo-500/80 transition-all duration-300"
              style={{
                height: `${Math.min(v * 6, 100)}%`,
                boxShadow: v > 10 ? "0 0 25px rgba(99,102,241,0.8)" : "none"
              }}
            />
          ))
        )}
      </div>

      <div className="mt-3 text-xs text-white/40">
        Live · auto-updating
      </div>
    </div>
  );
}