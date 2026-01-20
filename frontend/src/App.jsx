import { useEffect, useState } from "react";
import { connectMetrics } from "./components/socket";
import { sendEvent } from "./components/api";

export default function App() {
  const [metrics, setMetrics] = useState({
    received: 0,
    processed: 0,
    retried: 0,
    dead: 0,
    mainQueueSize: 0,
    retryQueueSize: 0,
    deadQueueSize: 0
  });

  useEffect(() => {
    connectMetrics(setMetrics);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>PulseQ ⚡</h1>

      <button onClick={() => sendEvent("LOGIN")}>
        Send Event
      </button>

      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  );
}
