import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function System() {

  const [sys, setSys] = useState(null);

  const load = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8080/system");
      setSys(res.data);
    } catch (err) {
      console.error("Failed to load system status:", err);
    }
  }, []);

  useEffect(() => {
    // Defer initial load to avoid synchronous setState in effect
    const timeoutId = setTimeout(load, 0);
    const intervalId = setInterval(load, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [load]);

  if (!sys) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">System Status</h1>
        <div className="grid grid-cols-4 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-zinc-900 border border-white/10 rounded-xl p-5">
              <div className="h-4 w-16 bg-white/10 rounded animate-pulse"></div>
              <div className="h-8 w-24 bg-white/10 rounded animate-pulse mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">System Status</h1>

      <div className="grid grid-cols-4 gap-6">

        <Stat title="Uptime" value={(sys.uptimeMs / 1000).toFixed(0) + "s"} />
        <Stat title="Threads" value={sys.threadCount} />

        <Stat
          title="Memory Used"
          value={`${sys.usedMemoryMb} / ${sys.maxMemoryMb} MB`}
        />

        <Stat
          title="Redis"
          value={sys.redisUp ? "UP" : "DOWN"}
          color={sys.redisUp ? "text-green-400" : "text-red-500"}
        />

        <Stat
          title="Postgres"
          value={sys.postgresUp ? "UP" : "DOWN"}
          color={sys.postgresUp ? "text-green-400" : "text-red-500"}
        />

        <Stat title="Received" value={sys.received} />
        <Stat title="Processed" value={sys.processed} />
        <Stat title="Retried" value={sys.retried} />
        <Stat title="Dead" value={sys.dead} />

      </div>
    </div>
  );
}

function Stat({ title, value, color = "text-white" }) {
  return (
    <div className="bg-zinc-900 border border-white/10 rounded-xl p-5">
      <div className="text-sm text-white/50">{title}</div>
      <div className={`text-2xl font-bold mt-2 ${color}`}>
        {value}
      </div>
    </div>
  );
}