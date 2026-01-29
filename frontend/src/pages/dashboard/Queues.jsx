import { useEffect, useState, useCallback } from "react";
import QueuePanel from "../../components/QueuePanel";
import axios from "axios";

export default function Queues() {
  const [main, setMain] = useState([]);
  const [retry, setRetry] = useState([]);
  const [dead, setDead] = useState([]);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchQueues = useCallback(async () => {
    try {
      const [m, r, d] = await Promise.all([
        axios.get(`${BASE_URL}/queues/main`),
        axios.get(`${BASE_URL}/queues/retry`),
        axios.get(`${BASE_URL}/queues/dead`)
      ]);

      setMain(m.data);
      setRetry(r.data);
      setDead(d.data);
    } catch (err) {
      console.error("Failed to fetch queues:", err);
    }
  }, []);

  useEffect(() => {
    // Defer initial fetch to next tick
    const timeoutId = setTimeout(fetchQueues, 0);
    
    // Set up polling interval
    const intervalId = setInterval(fetchQueues, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [fetchQueues]);

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Queue Inspector</h1>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <QueuePanel title="Main Queue" items={main} />
        <QueuePanel title="Retry Queue" items={retry} />
        <QueuePanel title="Dead Letter Queue" items={dead} />
      </div>
    </div>
  );
}